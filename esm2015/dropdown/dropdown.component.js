import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Inject, Input, NgZone, Output, TemplateRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@ptsecurity/cdk/keycodes';
import { merge, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, take } from 'rxjs/operators';
import { mcDropdownAnimations } from './dropdown-animations';
import { McDropdownContent } from './dropdown-content.directive';
import { throwMcDropdownInvalidPositionX, throwMcDropdownInvalidPositionY } from './dropdown-errors';
import { McDropdownItem } from './dropdown-item.component';
import { MC_DROPDOWN_DEFAULT_OPTIONS, MC_DROPDOWN_PANEL } from './dropdown.types';
export class McDropdown {
    constructor(elementRef, ngZone, defaultOptions) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.defaultOptions = defaultOptions;
        this.navigationWithWrap = false;
        this._xPosition = this.defaultOptions.xPosition;
        this._yPosition = this.defaultOptions.yPosition;
        this._overlapTriggerX = this.defaultOptions.overlapTriggerX;
        this._overlapTriggerY = this.defaultOptions.overlapTriggerY;
        this._hasBackdrop = this.defaultOptions.hasBackdrop;
        this.triggerWidth = '';
        /** Config object to be passed into the dropdown's ngClass */
        this.classList = {};
        /** Current state of the panel animation. */
        this.panelAnimationState = 'void';
        /** Emits whenever an animation on the dropdown completes. */
        this.animationDone = new Subject();
        /** Class to be added to the backdrop element. */
        this.backdropClass = this.defaultOptions.backdropClass;
        /** Event emitted when the dropdown is closed. */
        this.closed = new EventEmitter();
        /** Only the direct descendant menu items. */
        this.directDescendantItems = new QueryList();
        /** Subscription to tab events on the dropdown panel */
        this.tabSubscription = Subscription.EMPTY;
    }
    /** Position of the dropdown in the X axis. */
    get xPosition() {
        return this._xPosition;
    }
    set xPosition(value) {
        if (value !== 'before' && value !== 'after') {
            throwMcDropdownInvalidPositionX();
        }
        this._xPosition = value;
        this.setPositionClasses();
    }
    /** Position of the dropdown in the Y axis. */
    get yPosition() {
        return this._yPosition;
    }
    set yPosition(value) {
        if (value !== 'above' && value !== 'below') {
            throwMcDropdownInvalidPositionY();
        }
        this._yPosition = value;
        this.setPositionClasses();
    }
    /** Whether the dropdown should overlap its trigger vertically. */
    get overlapTriggerY() {
        return this._overlapTriggerY;
    }
    set overlapTriggerY(value) {
        this._overlapTriggerY = coerceBooleanProperty(value);
    }
    /** Whether the dropdown should overlap its trigger horizontally. */
    get overlapTriggerX() {
        return this._overlapTriggerX;
    }
    set overlapTriggerX(value) {
        this._overlapTriggerX = coerceBooleanProperty(value);
    }
    /** Whether the dropdown has a backdrop. */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * This method takes classes set on the host mc-dropdown element and applies them on the
     * dropdown template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing dropdown from outside the component.
     * @param classes list of class names
     */
    set panelClass(classes) {
        const previousPanelClass = this.previousPanelClass;
        if (previousPanelClass && previousPanelClass.length) {
            previousPanelClass
                .split(' ')
                .forEach((className) => this.classList[className] = false);
        }
        this.previousPanelClass = classes;
        if (classes === null || classes === void 0 ? void 0 : classes.length) {
            classes
                .split(' ')
                .forEach((className) => this.classList[className] = true);
            this.elementRef.nativeElement.className = '';
        }
    }
    ngOnInit() {
        this.setPositionClasses();
    }
    ngAfterContentInit() {
        this.updateDirectDescendants();
        this.keyManager = new FocusKeyManager(this.directDescendantItems)
            .withTypeAhead();
        if (this.navigationWithWrap) {
            this.keyManager.withWrap();
        }
        this.tabSubscription = this.keyManager.tabOut
            .subscribe(() => this.closed.emit('tab'));
        // If a user manually (programmatically) focuses a menu item, we need to reflect that focus
        // change back to the key manager. Note that we don't need to unsubscribe here because focused
        // is internal and we know that it gets completed on destroy.
        this.directDescendantItems.changes
            .pipe(startWith(this.directDescendantItems), switchMap((items) => merge(...items.map((item) => item.focused))))
            .subscribe((focusedItem) => this.keyManager.updateActiveItem(focusedItem));
    }
    ngOnDestroy() {
        this.directDescendantItems.destroy();
        this.tabSubscription.unsubscribe();
        this.closed.complete();
    }
    /** Stream that emits whenever the hovered dropdown item changes. */
    hovered() {
        const itemChanges = this.directDescendantItems.changes;
        return itemChanges.pipe(startWith(this.directDescendantItems), switchMap((items) => merge(...items.map((item) => item.hovered))));
    }
    /** Handle a keyboard event from the dropdown, delegating to the appropriate action. */
    handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        const keyCode = event.keyCode;
        switch (keyCode) {
            case ESCAPE:
                this.closed.emit('keydown');
                break;
            case LEFT_ARROW:
                if (this.parent && this.direction === 'ltr') {
                    this.closed.emit('keydown');
                }
                break;
            case RIGHT_ARROW:
                if (this.parent && this.direction === 'rtl') {
                    this.closed.emit('keydown');
                }
                break;
            default:
                if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
                    this.keyManager.setFocusOrigin('keyboard');
                }
                this.keyManager.onKeydown(event);
                return;
        }
        // Don't allow the event to propagate if we've already handled it, or it may
        // end up reaching other overlays that were opened earlier.
        event.stopPropagation();
    }
    /**
     * Focus the first item in the dropdown.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    focusFirstItem(origin = 'program') {
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this.ngZone.onStable
                .pipe(take(1))
                .subscribe(() => this.keyManager.setFocusOrigin(origin).setFirstItemActive());
        }
        else {
            this.keyManager.setFocusOrigin(origin).setFirstItemActive();
        }
    }
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    resetActiveItem() {
        var _a;
        (_a = this.keyManager.activeItem) === null || _a === void 0 ? void 0 : _a.resetStyles();
        this.keyManager.setActiveItem(-1);
    }
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * @param posX Position of the dropdown along the x axis.
     * @param posY Position of the dropdown along the y axis.
     * @docs-private
     */
    setPositionClasses(posX = this.xPosition, posY = this.yPosition) {
        const classes = this.classList;
        classes['mc-dropdown-before'] = posX === 'before';
        classes['mc-dropdown-after'] = posX === 'after';
        classes['mc-dropdown-above'] = posY === 'above';
        classes['mc-dropdown-below'] = posY === 'below';
    }
    /** Starts the enter animation. */
    startAnimation() {
        this.panelAnimationState = 'enter';
    }
    /** Resets the panel animation to its initial state. */
    resetAnimation() {
        this.panelAnimationState = 'void';
    }
    /** Callback that is invoked when the panel animation completes. */
    onAnimationDone(event) {
        this.animationDone.next(event);
        this.isAnimating = false;
    }
    onAnimationStart(event) {
        this.isAnimating = true;
        // Scroll the content element to the top as soon as the animation starts. This is necessary,
        // because we move focus to the first item while it's still being animated, which can throw
        // the browser off when it determines the scroll position. Alternatively we can move focus
        // when the animation is done, however moving focus asynchronously will interrupt screen
        // readers which are in the process of reading out the dropdown already. We take the `element`
        // from the `event` since we can't use a `ViewChild` to access the pane.
        if (event.toState === 'enter' && this.keyManager.activeItemIndex === 0) {
            event.element.scrollTop = 0;
        }
    }
    /**
     * Sets up a stream that will keep track of any newly-added menu items and will update the list
     * of direct descendants. We collect the descendants this way, because `_allItems` can include
     * items that are part of child menus, and using a custom way of registering items is unreliable
     * when it comes to maintaining the item order.
     */
    updateDirectDescendants() {
        this.items.changes
            .pipe(startWith(this.items))
            .subscribe((items) => {
            this.directDescendantItems.reset(items.filter((item) => item.parentDropdownPanel === this));
            this.directDescendantItems.notifyOnChanges();
        });
    }
}
McDropdown.decorators = [
    { type: Component, args: [{
                selector: 'mc-dropdown',
                exportAs: 'mcDropdown',
                template: "<ng-template>\n    <div class=\"mc-dropdown__panel\"\n         [ngClass]=\"classList\"\n         [class.mc-dropdown__panel_nested]=\"parent\"\n         [style.min-width]=\"triggerWidth\"\n         (keydown)=\"handleKeydown($event)\"\n         (click)=\"closed.emit('click')\"\n         [@transformDropdown]=\"panelAnimationState\"\n         (@transformDropdown.start)=\"onAnimationStart($event)\"\n         (@transformDropdown.done)=\"onAnimationDone($event)\"\n         tabindex=\"-1\">\n\n        <div class=\"mc-dropdown__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                animations: [
                    mcDropdownAnimations.transformDropdown,
                    mcDropdownAnimations.fadeInItems
                ],
                providers: [
                    { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
                ],
                styles: [".mc-dropdown__panel{margin-top:-1px;max-width:var(--mc-dropdown-panel-size-max-width,640px);border-width:var(--mc-dropdown-panel-size-border-width,1px);border-style:solid;border-bottom-left-radius:var(--mc-dropdown-panel-size-border-radius,3px);border-bottom-right-radius:var(--mc-dropdown-panel-size-border-radius,3px);padding:var(--mc-dropdown-panel-size-padding,4px 0)}.mc-dropdown__panel.mc-dropdown__panel_nested{border-top-left-radius:var(--mc-dropdown-panel-size-border-radius,3px);border-top-right-radius:var(--mc-dropdown-panel-size-border-radius,3px)}.mc-dropdown__panel.ng-animating{pointer-events:none}.mc-dropdown__content{display:flex;flex-direction:column}"]
            },] }
];
/** @nocollapse */
McDropdown.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [MC_DROPDOWN_DEFAULT_OPTIONS,] }] }
];
McDropdown.propDecorators = {
    navigationWithWrap: [{ type: Input }],
    xPosition: [{ type: Input }],
    yPosition: [{ type: Input }],
    overlapTriggerY: [{ type: Input }],
    overlapTriggerX: [{ type: Input }],
    hasBackdrop: [{ type: Input }],
    panelClass: [{ type: Input, args: ['class',] }],
    backdropClass: [{ type: Input }],
    templateRef: [{ type: ViewChild, args: [TemplateRef, { static: false },] }],
    items: [{ type: ContentChildren, args: [McDropdownItem, { descendants: true },] }],
    lazyContent: [{ type: ContentChild, args: [McDropdownContent, { static: false },] }],
    closed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBRXBCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLCtCQUErQixFQUFFLCtCQUErQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFHSCwyQkFBMkIsRUFDM0IsaUJBQWlCLEVBR3BCLE1BQU0sa0JB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Sjs7OztZQTlDRyxVQUFVO1lBSVYsTUFBTTs0Q0E4TEQsTUFBTSxTQUFDLDJCQUEyQjs7O2lDQWpKdEMsS0FBSzt3QkFHTCxLQUFLO3dCQWNMLEtBQUs7OEJBY0wsS0FBSzs4QkFVTCxLQUFLOzBCQVVMLEtBQUs7eUJBZUwsS0FBSyxTQUFDLE9BQU87NEJBK0NiLEtBQUs7MEJBR0wsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7b0JBS3hDLGVBQWUsU0FBQyxjQUFjLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOzBCQU1yRCxZQUFZLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3FCQUdqRCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERPV05fQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBFU0NBUEUsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBtY0Ryb3Bkb3duQW5pbWF0aW9ucyB9IGZyb20gJy4vZHJvcGRvd24tYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duQ29udGVudCB9IGZyb20gJy4vZHJvcGRvd24tY29udGVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCwgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tZXJyb3JzJztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIERyb3Bkb3duUG9zaXRpb25YLFxuICAgIERyb3Bkb3duUG9zaXRpb25ZLFxuICAgIE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OUyxcbiAgICBNQ19EUk9QRE9XTl9QQU5FTCxcbiAgICBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMsXG4gICAgTWNEcm9wZG93blBhbmVsXG59IGZyb20gJy4vZHJvcGRvd24udHlwZXMnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZHJvcGRvd24nLFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93bicsXG4gICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHJvcGRvd24uc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBtY0Ryb3Bkb3duQW5pbWF0aW9ucy50cmFuc2Zvcm1Ecm9wZG93bixcbiAgICAgICAgbWNEcm9wZG93bkFuaW1hdGlvbnMuZmFkZUluSXRlbXNcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1DX0RST1BET1dOX1BBTkVMLCB1c2VFeGlzdGluZzogTWNEcm9wZG93biB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgTWNEcm9wZG93blBhbmVsLCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBuYXZpZ2F0aW9uV2l0aFdyYXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24gaW4gdGhlIFggYXhpcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB4UG9zaXRpb24oKTogRHJvcGRvd25Qb3NpdGlvblgge1xuICAgICAgICByZXR1cm4gdGhpcy5feFBvc2l0aW9uO1xuICAgIH1cblxuICAgIHNldCB4UG9zaXRpb24odmFsdWU6IERyb3Bkb3duUG9zaXRpb25YKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJ2JlZm9yZScgJiYgdmFsdWUgIT09ICdhZnRlcicpIHtcbiAgICAgICAgICAgIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblgoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl94UG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGluIHRoZSBZIGF4aXMuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgeVBvc2l0aW9uKCk6IERyb3Bkb3duUG9zaXRpb25ZIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3lQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgeVBvc2l0aW9uKHZhbHVlOiBEcm9wZG93blBvc2l0aW9uWSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICdhYm92ZScgJiYgdmFsdWUgIT09ICdiZWxvdycpIHtcbiAgICAgICAgICAgIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl95UG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgaXRzIHRyaWdnZXIgdmVydGljYWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBvdmVybGFwVHJpZ2dlclkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdmVybGFwVHJpZ2dlclk7XG4gICAgfVxuXG4gICAgc2V0IG92ZXJsYXBUcmlnZ2VyWSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9vdmVybGFwVHJpZ2dlclkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCBpdHMgdHJpZ2dlciBob3Jpem9udGFsbHkuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgb3ZlcmxhcFRyaWdnZXJYKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3ZlcmxhcFRyaWdnZXJYO1xuICAgIH1cblxuICAgIHNldCBvdmVybGFwVHJpZ2dlclgodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fb3ZlcmxhcFRyaWdnZXJYID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaGFzIGEgYmFja2Ryb3AuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgaGFzQmFja2Ryb3AoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNCYWNrZHJvcDtcbiAgICB9XG5cbiAgICBzZXQgaGFzQmFja2Ryb3AodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGFzQmFja2Ryb3AgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHRha2VzIGNsYXNzZXMgc2V0IG9uIHRoZSBob3N0IG1jLWRyb3Bkb3duIGVsZW1lbnQgYW5kIGFwcGxpZXMgdGhlbSBvbiB0aGVcbiAgICAgKiBkcm9wZG93biB0ZW1wbGF0ZSB0aGF0IGRpc3BsYXlzIGluIHRoZSBvdmVybGF5IGNvbnRhaW5lci4gIE90aGVyd2lzZSwgaXQncyBkaWZmaWN1bHRcbiAgICAgKiB0byBzdHlsZSB0aGUgY29udGFpbmluZyBkcm9wZG93biBmcm9tIG91dHNpZGUgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0gY2xhc3NlcyBsaXN0IG9mIGNsYXNzIG5hbWVzXG4gICAgICovXG4gICAgQElucHV0KCdjbGFzcycpXG4gICAgc2V0IHBhbmVsQ2xhc3MoY2xhc3Nlczogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzUGFuZWxDbGFzcyA9IHRoaXMucHJldmlvdXNQYW5lbENsYXNzO1xuXG4gICAgICAgIGlmIChwcmV2aW91c1BhbmVsQ2xhc3MgJiYgcHJldmlvdXNQYW5lbENsYXNzLmxlbmd0aCkge1xuICAgICAgICAgICAgcHJldmlvdXNQYW5lbENsYXNzXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuY2xhc3NMaXN0W2NsYXNzTmFtZV0gPSBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZpb3VzUGFuZWxDbGFzcyA9IGNsYXNzZXM7XG5cbiAgICAgICAgaWYgKGNsYXNzZXM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2xhc3Nlc1xuICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB0aGlzLmNsYXNzTGlzdFtjbGFzc05hbWVdID0gdHJ1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfeFBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWCA9IHRoaXMuZGVmYXVsdE9wdGlvbnMueFBvc2l0aW9uO1xuICAgIHByaXZhdGUgX3lQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblkgPSB0aGlzLmRlZmF1bHRPcHRpb25zLnlQb3NpdGlvbjtcbiAgICBwcml2YXRlIF9vdmVybGFwVHJpZ2dlclg6IGJvb2xlYW4gPSB0aGlzLmRlZmF1bHRPcHRpb25zLm92ZXJsYXBUcmlnZ2VyWDtcbiAgICBwcml2YXRlIF9vdmVybGFwVHJpZ2dlclk6IGJvb2xlYW4gPSB0aGlzLmRlZmF1bHRPcHRpb25zLm92ZXJsYXBUcmlnZ2VyWTtcbiAgICBwcml2YXRlIF9oYXNCYWNrZHJvcDogYm9vbGVhbiA9IHRoaXMuZGVmYXVsdE9wdGlvbnMuaGFzQmFja2Ryb3A7XG5cbiAgICB0cmlnZ2VyV2lkdGg6IHN0cmluZyA9ICcnO1xuICAgIC8qKiBDb25maWcgb2JqZWN0IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBkcm9wZG93bidzIG5nQ2xhc3MgKi9cbiAgICBjbGFzc0xpc3Q6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbiAgICAvKiogQ3VycmVudCBzdGF0ZSBvZiB0aGUgcGFuZWwgYW5pbWF0aW9uLiAqL1xuICAgIHBhbmVsQW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgPSAndm9pZCc7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgYW4gYW5pbWF0aW9uIG9uIHRoZSBkcm9wZG93biBjb21wbGV0ZXMuICovXG4gICAgYW5pbWF0aW9uRG9uZSA9IG5ldyBTdWJqZWN0PEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIGFuaW1hdGluZy4gKi9cbiAgICBpc0FuaW1hdGluZzogYm9vbGVhbjtcblxuICAgIC8qKiBQYXJlbnQgZHJvcGRvd24gb2YgdGhlIGN1cnJlbnQgZHJvcGRvd24gcGFuZWwuICovXG4gICAgcGFyZW50OiBNY0Ryb3Bkb3duUGFuZWwgfCB1bmRlZmluZWQ7XG5cbiAgICAvKiogTGF5b3V0IGRpcmVjdGlvbiBvZiB0aGUgZHJvcGRvd24uICovXG4gICAgZGlyZWN0aW9uOiBEaXJlY3Rpb247XG5cbiAgICAvKiogQ2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIGJhY2tkcm9wIGVsZW1lbnQuICovXG4gICAgQElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nID0gdGhpcy5kZWZhdWx0T3B0aW9ucy5iYWNrZHJvcENsYXNzO1xuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogZmFsc2UgfSkgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHRoZSBpdGVtcyBpbnNpZGUgb2YgYSBkcm9wZG93bi5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1jRHJvcGRvd25JdGVtLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGl0ZW1zOiBRdWVyeUxpc3Q8TWNEcm9wZG93bkl0ZW0+O1xuXG4gICAgLyoqXG4gICAgICogRHJvcGRvd24gY29udGVudCB0aGF0IHdpbGwgYmUgcmVuZGVyZWQgbGF6aWx5LlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKE1jRHJvcGRvd25Db250ZW50LCB7IHN0YXRpYzogZmFsc2UgfSkgbGF6eUNvbnRlbnQ6IE1jRHJvcGRvd25Db250ZW50O1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+KCk7XG5cbiAgICBwcml2YXRlIHByZXZpb3VzUGFuZWxDbGFzczogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBrZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8TWNEcm9wZG93bkl0ZW0+O1xuXG4gICAgLyoqIE9ubHkgdGhlIGRpcmVjdCBkZXNjZW5kYW50IG1lbnUgaXRlbXMuICovXG4gICAgcHJpdmF0ZSBkaXJlY3REZXNjZW5kYW50SXRlbXMgPSBuZXcgUXVlcnlMaXN0PE1jRHJvcGRvd25JdGVtPigpO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0YWIgZXZlbnRzIG9uIHRoZSBkcm9wZG93biBwYW5lbCAqL1xuICAgIHByaXZhdGUgdGFiU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TKSBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdERlc2NlbmRhbnRzKCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxNY0Ryb3Bkb3duSXRlbT4odGhpcy5kaXJlY3REZXNjZW5kYW50SXRlbXMpXG4gICAgICAgICAgICAud2l0aFR5cGVBaGVhZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25XaXRoV3JhcCkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhXcmFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYlN1YnNjcmlwdGlvbiA9IHRoaXMua2V5TWFuYWdlci50YWJPdXRcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZWQuZW1pdCgndGFiJykpO1xuXG4gICAgICAgIC8vIElmIGEgdXNlciBtYW51YWxseSAocHJvZ3JhbW1hdGljYWxseSkgZm9jdXNlcyBhIG1lbnUgaXRlbSwgd2UgbmVlZCB0byByZWZsZWN0IHRoYXQgZm9jdXNcbiAgICAgICAgLy8gY2hhbmdlIGJhY2sgdG8gdGhlIGtleSBtYW5hZ2VyLiBOb3RlIHRoYXQgd2UgZG9uJ3QgbmVlZCB0byB1bnN1YnNjcmliZSBoZXJlIGJlY2F1c2UgZm9jdXNlZFxuICAgICAgICAvLyBpcyBpbnRlcm5hbCBhbmQgd2Uga25vdyB0aGF0IGl0IGdldHMgY29tcGxldGVkIG9uIGRlc3Ryb3kuXG4gICAgICAgIHRoaXMuZGlyZWN0RGVzY2VuZGFudEl0ZW1zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh0aGlzLmRpcmVjdERlc2NlbmRhbnRJdGVtcyksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKChpdGVtcykgPT4gbWVyZ2UoLi4uaXRlbXMubWFwKChpdGVtOiBNY0Ryb3Bkb3duSXRlbSkgPT4gaXRlbS5mb2N1c2VkKSkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChmb2N1c2VkSXRlbSkgPT4gdGhpcy5rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oZm9jdXNlZEl0ZW0gYXMgTWNEcm9wZG93bkl0ZW0pKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXJlY3REZXNjZW5kYW50SXRlbXMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnRhYlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmNsb3NlZC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgaG92ZXJlZCBkcm9wZG93biBpdGVtIGNoYW5nZXMuICovXG4gICAgaG92ZXJlZCgpOiBPYnNlcnZhYmxlPE1jRHJvcGRvd25JdGVtPiB7XG4gICAgICAgIGNvbnN0IGl0ZW1DaGFuZ2VzID0gdGhpcy5kaXJlY3REZXNjZW5kYW50SXRlbXMuY2hhbmdlcyBhcyBPYnNlcnZhYmxlPFF1ZXJ5TGlzdDxNY0Ryb3Bkb3duSXRlbT4+O1xuXG4gICAgICAgIHJldHVybiBpdGVtQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKHRoaXMuZGlyZWN0RGVzY2VuZGFudEl0ZW1zKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoaXRlbXMpID0+IG1lcmdlKC4uLml0ZW1zLm1hcCgoaXRlbTogTWNEcm9wZG93bkl0ZW0pID0+IGl0ZW0uaG92ZXJlZCkpKVxuICAgICAgICApIGFzIE9ic2VydmFibGU8TWNEcm9wZG93bkl0ZW0+O1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGUgYSBrZXlib2FyZCBldmVudCBmcm9tIHRoZSBkcm9wZG93biwgZGVsZWdhdGluZyB0byB0aGUgYXBwcm9wcmlhdGUgYWN0aW9uLiAqL1xuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG5cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KCdrZXlkb3duJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMuZGlyZWN0aW9uID09PSAnbHRyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KCdrZXlkb3duJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBVUF9BUlJPVyB8fCBrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbigna2V5Ym9hcmQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvbid0IGFsbG93IHRoZSBldmVudCB0byBwcm9wYWdhdGUgaWYgd2UndmUgYWxyZWFkeSBoYW5kbGVkIGl0LCBvciBpdCBtYXlcbiAgICAgICAgLy8gZW5kIHVwIHJlYWNoaW5nIG90aGVyIG92ZXJsYXlzIHRoYXQgd2VyZSBvcGVuZWQgZWFybGllci5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGRyb3Bkb3duLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gQWN0aW9uIGZyb20gd2hpY2ggdGhlIGZvY3VzIG9yaWdpbmF0ZWQuIFVzZWQgdG8gc2V0IHRoZSBjb3JyZWN0IHN0eWxpbmcuXG4gICAgICovXG4gICAgZm9jdXNGaXJzdEl0ZW0ob3JpZ2luOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJyk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIHRoZSBjb250ZW50IGlzIHJlbmRlcmVkIGxhemlseSwgaXQgdGFrZXMgYSBiaXQgYmVmb3JlIHRoZSBpdGVtcyBhcmUgaW5zaWRlIHRoZSBET00uXG4gICAgICAgIGlmICh0aGlzLmxhenlDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4ob3JpZ2luKS5zZXRGaXJzdEl0ZW1BY3RpdmUoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4ob3JpZ2luKS5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgYWN0aXZlIGl0ZW0gaW4gdGhlIGRyb3Bkb3duLiBUaGlzIGlzIHVzZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkLCBhbGxvd2luZ1xuICAgICAqIHRoZSB1c2VyIHRvIHN0YXJ0IGZyb20gdGhlIGZpcnN0IG9wdGlvbiB3aGVuIHByZXNzaW5nIHRoZSBkb3duIGFycm93LlxuICAgICAqL1xuICAgIHJlc2V0QWN0aXZlSXRlbSgpIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0/LnJlc2V0U3R5bGVzKCk7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGNsYXNzZXMgdG8gdGhlIGRyb3Bkb3duIHBhbmVsIGJhc2VkIG9uIGl0cyBwb3NpdGlvbi4gQ2FuIGJlIHVzZWQgYnlcbiAgICAgKiBjb25zdW1lcnMgdG8gYWRkIHNwZWNpZmljIHN0eWxpbmcgYmFzZWQgb24gdGhlIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSBwb3NYIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBhbG9uZyB0aGUgeCBheGlzLlxuICAgICAqIEBwYXJhbSBwb3NZIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBhbG9uZyB0aGUgeSBheGlzLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbkNsYXNzZXMocG9zWDogRHJvcGRvd25Qb3NpdGlvblggPSB0aGlzLnhQb3NpdGlvbiwgcG9zWTogRHJvcGRvd25Qb3NpdGlvblkgPSB0aGlzLnlQb3NpdGlvbikge1xuICAgICAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5jbGFzc0xpc3Q7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWJlZm9yZSddID0gcG9zWCA9PT0gJ2JlZm9yZSc7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWFmdGVyJ10gPSBwb3NYID09PSAnYWZ0ZXInO1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1hYm92ZSddID0gcG9zWSA9PT0gJ2Fib3ZlJztcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYmVsb3cnXSA9IHBvc1kgPT09ICdiZWxvdyc7XG4gICAgfVxuXG4gICAgLyoqIFN0YXJ0cyB0aGUgZW50ZXIgYW5pbWF0aW9uLiAqL1xuICAgIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBhbmVsQW5pbWF0aW9uU3RhdGUgPSAnZW50ZXInO1xuICAgIH1cblxuICAgIC8qKiBSZXNldHMgdGhlIHBhbmVsIGFuaW1hdGlvbiB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gKi9cbiAgICByZXNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5wYW5lbEFuaW1hdGlvblN0YXRlID0gJ3ZvaWQnO1xuICAgIH1cblxuICAgIC8qKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgcGFuZWwgYW5pbWF0aW9uIGNvbXBsZXRlcy4gKi9cbiAgICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRG9uZS5uZXh0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0aGUgY29udGVudCBlbGVtZW50IHRvIHRoZSB0b3AgYXMgc29vbiBhcyB0aGUgYW5pbWF0aW9uIHN0YXJ0cy4gVGhpcyBpcyBuZWNlc3NhcnksXG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3QgaXRlbSB3aGlsZSBpdCdzIHN0aWxsIGJlaW5nIGFuaW1hdGVkLCB3aGljaCBjYW4gdGhyb3dcbiAgICAgICAgLy8gdGhlIGJyb3dzZXIgb2ZmIHdoZW4gaXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIHBvc2l0aW9uLiBBbHRlcm5hdGl2ZWx5IHdlIGNhbiBtb3ZlIGZvY3VzXG4gICAgICAgIC8vIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBkb25lLCBob3dldmVyIG1vdmluZyBmb2N1cyBhc3luY2hyb25vdXNseSB3aWxsIGludGVycnVwdCBzY3JlZW5cbiAgICAgICAgLy8gcmVhZGVycyB3aGljaCBhcmUgaW4gdGhlIHByb2Nlc3Mgb2YgcmVhZGluZyBvdXQgdGhlIGRyb3Bkb3duIGFscmVhZHkuIFdlIHRha2UgdGhlIGBlbGVtZW50YFxuICAgICAgICAvLyBmcm9tIHRoZSBgZXZlbnRgIHNpbmNlIHdlIGNhbid0IHVzZSBhIGBWaWV3Q2hpbGRgIHRvIGFjY2VzcyB0aGUgcGFuZS5cbiAgICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicgJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgZXZlbnQuZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHN0cmVhbSB0aGF0IHdpbGwga2VlcCB0cmFjayBvZiBhbnkgbmV3bHktYWRkZWQgbWVudSBpdGVtcyBhbmQgd2lsbCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgKiBvZiBkaXJlY3QgZGVzY2VuZGFudHMuIFdlIGNvbGxlY3QgdGhlIGRlc2NlbmRhbnRzIHRoaXMgd2F5LCBiZWNhdXNlIGBfYWxsSXRlbXNgIGNhbiBpbmNsdWRlXG4gICAgICogaXRlbXMgdGhhdCBhcmUgcGFydCBvZiBjaGlsZCBtZW51cywgYW5kIHVzaW5nIGEgY3VzdG9tIHdheSBvZiByZWdpc3RlcmluZyBpdGVtcyBpcyB1bnJlbGlhYmxlXG4gICAgICogd2hlbiBpdCBjb21lcyB0byBtYWludGFpbmluZyB0aGUgaXRlbSBvcmRlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZURpcmVjdERlc2NlbmRhbnRzKCkge1xuICAgICAgICB0aGlzLml0ZW1zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLml0ZW1zKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGl0ZW1zOiBRdWVyeUxpc3Q8TWNEcm9wZG93bkl0ZW0+KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3REZXNjZW5kYW50SXRlbXMucmVzZXQoaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnBhcmVudERyb3Bkb3duUGFuZWwgPT09IHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdERlc2NlbmRhbnRJdGVtcy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
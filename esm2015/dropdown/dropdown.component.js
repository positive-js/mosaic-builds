import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Output, TemplateRef, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { ESCAPE, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { merge, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, take } from 'rxjs/operators';
import { mcDropdownAnimations } from './dropdown-animations';
import { McDropdownContent } from './dropdown-content';
import { throwMcDropdownInvalidPositionX, throwMcDropdownInvalidPositionY } from './dropdown-errors';
import { McDropdownItem } from './dropdown-item';
import { MC_DROPDOWN_PANEL } from './dropdown-panel';
/** Injection token to be used to override the default options for `mc-dropdown`. */
export const MC_DROPDOWN_DEFAULT_OPTIONS = new InjectionToken('mc-dropdown-default-options', {
    providedIn: 'root',
    factory: MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
// tslint:disable-next-line:naming-convention
export function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY() {
    return {
        overlapTriggerX: true,
        overlapTriggerY: false,
        xPosition: 'after',
        yPosition: 'below',
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: false
    };
}
export class McDropdown {
    constructor(_elementRef, _ngZone, _defaultOptions) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._defaultOptions = _defaultOptions;
        this._xPosition = this._defaultOptions.xPosition;
        this._yPosition = this._defaultOptions.yPosition;
        this._overlapTriggerX = this._defaultOptions.overlapTriggerX;
        this._overlapTriggerY = this._defaultOptions.overlapTriggerY;
        this._hasBackdrop = this._defaultOptions.hasBackdrop;
        /** Config object to be passed into the dropdown's ngClass */
        this.classList = {};
        /** Current state of the panel animation. */
        this.panelAnimationState = 'void';
        /** Emits whenever an animation on the dropdown completes. */
        this.animationDone = new Subject();
        /** Class to be added to the backdrop element. */
        this.backdropClass = this._defaultOptions.backdropClass;
        /** Event emitted when the dropdown is closed. */
        this.closed = new EventEmitter();
        /** Dropdown items inside the current dropdown. */
        this.itemsArray = [];
        /** Emits whenever the amount of dropdown items changes. */
        this.itemChanges = new Subject();
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
            previousPanelClass.split(' ').forEach((className) => {
                this.classList[className] = false;
            });
        }
        this.previousPanelClass = classes;
        if (classes && classes.length) {
            classes.split(' ').forEach((className) => {
                this.classList[className] = true;
            });
            this._elementRef.nativeElement.className = '';
        }
    }
    ngOnInit() {
        this.setPositionClasses();
    }
    ngAfterContentInit() {
        this.keyManager = new FocusKeyManager(this.items)
            .withWrap()
            .withTypeAhead();
        this.tabSubscription = this.keyManager.tabOut.subscribe(() => this.closed.emit('tab'));
    }
    ngOnDestroy() {
        this.tabSubscription.unsubscribe();
        this.closed.complete();
    }
    /** Stream that emits whenever the hovered dropdown item changes. */
    hovered() {
        return this.itemChanges.pipe(startWith(this.itemsArray), switchMap((items) => merge(...items.map((item) => item.hovered))));
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
        }
    }
    handleClick() {
        this.closed.emit('click');
    }
    /**
     * Focus the first item in the dropdown.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    focusFirstItem(origin = 'program') {
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this._ngZone.onStable.asObservable()
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
        this.keyManager.setActiveItem(-1);
    }
    /**
     * Registers a dropdown item with the dropdown.
     * @docs-private
     */
    addItem(item) {
        // We register the items through this method, rather than picking them up through
        // `ContentChildren`, because we need the items to be picked up by their closest
        // `mc-dropdown` ancestor. If we used `@ContentChildren(McDropdownItem, {descendants: true})`,
        // all descendant items will bleed into the top-level dropdown in the case where the consumer
        // has `mc-dropdown` instances nested inside each other.
        if (this.itemsArray.indexOf(item) === -1) {
            this.itemsArray.push(item);
            this.itemChanges.next(this.itemsArray);
        }
    }
    /**
     * Removes an item from the dropdown.
     * @docs-private
     */
    removeItem(item) {
        const index = this.itemsArray.indexOf(item);
        if (this.itemsArray.indexOf(item) > -1) {
            this.itemsArray.splice(index, 1);
            this.itemChanges.next(this.itemsArray);
        }
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
}
McDropdown.decorators = [
    { type: Component, args: [{
                selector: 'mc-dropdown',
                exportAs: 'mcDropdown',
                template: "<ng-template>\n    <div\n        class=\"mc-dropdown__panel\"\n        [ngClass]=\"classList\"\n        (keydown)=\"handleKeydown($event)\"\n        (click)=\"handleClick()\"\n        [@transformDropdown]=\"panelAnimationState\"\n        (@transformDropdown.start)=\"onAnimationStart($event)\"\n        (@transformDropdown.done)=\"onAnimationDone($event)\"\n        role=\"dropdown\">\n        <div class=\"mc-dropdown__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                animations: [
                    mcDropdownAnimations.transformDropdown,
                    mcDropdownAnimations.fadeInItems
                ],
                providers: [
                    { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
                ],
                styles: [".mc-dropdown__item{display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:none;padding:var(--mc-dropdown-item-size-padding,5px 15px);text-align:left;white-space:nowrap}.mc-dropdown__item:not([disabled]):not(.mc-disabled){cursor:pointer}.mc-dropdown__item .mc-dropdown__item-caption{margin-top:4px}.mc-dropdown__trigger{margin-left:auto;padding-left:var(--mc-dropdown-trigger-size-padding-left,16px)}.mc-dropdown__panel{min-width:100%;overflow:auto;margin-top:-1px;border-width:var(--mc-dropdown-panel-size-border-width,1px);border-style:solid;border-bottom-left-radius:var(--mc-dropdown-panel-size-border-radius,3px);border-bottom-right-radius:var(--mc-dropdown-panel-size-border-radius,3px);padding:var(--mc-dropdown-panel-size-padding,4px 0)}.mc-dropdown__content h1,.mc-dropdown__content h2,.mc-dropdown__content h3,.mc-dropdown__content h4,.mc-dropdown__content h5{padding:8px 16px 4px;margin:0}"]
            },] }
];
/** @nocollapse */
McDropdown.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [MC_DROPDOWN_DEFAULT_OPTIONS,] }] }
];
McDropdown.propDecorators = {
    xPosition: [{ type: Input }],
    yPosition: [{ type: Input }],
    overlapTriggerY: [{ type: Input }],
    overlapTriggerX: [{ type: Input }],
    hasBackdrop: [{ type: Input }],
    panelClass: [{ type: Input, args: ['class',] }],
    backdropClass: [{ type: Input }],
    templateRef: [{ type: ViewChild, args: [TemplateRef, { static: false },] }],
    items: [{ type: ContentChildren, args: [McDropdownItem,] }],
    lazyContent: [{ type: ContentChild, args: [McDropdownContent, { static: false },] }],
    closed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFFcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakcsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7QUEwQnRFLG9GQUFvRjtBQUNwRixNQUFNLENB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O1lBbkZHLFVBQVU7WUFLVixNQUFNOzRDQW1PRCxNQUFNLFNBQUMsMkJBQTJCOzs7d0JBakp0QyxLQUFLO3dCQWNMLEtBQUs7OEJBY0wsS0FBSzs4QkFVTCxLQUFLOzBCQVVMLEtBQUs7eUJBZUwsS0FBSyxTQUFDLE9BQU87NEJBOENiLEtBQUs7MEJBR0wsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7b0JBS3hDLGVBQWUsU0FBQyxjQUFjOzBCQU05QixZQUFZLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3FCQUdqRCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBFU0NBUEUsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBET1dOX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWNEcm9wZG93bkFuaW1hdGlvbnMgfSBmcm9tICcuL2Ryb3Bkb3duLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkNvbnRlbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbnRlbnQnO1xuaW1wb3J0IHsgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCwgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tZXJyb3JzJztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtJztcbmltcG9ydCB7IE1DX0RST1BET1dOX1BBTkVMLCBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLXBhbmVsJztcbmltcG9ydCB7IERyb3Bkb3duUG9zaXRpb25YLCBEcm9wZG93blBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tcG9zaXRpb25zJztcblxuXG4vKiogRGVmYXVsdCBgbWMtZHJvcGRvd25gIG9wdGlvbnMgdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbi4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMge1xuICAgIC8qKiBUaGUgeC1heGlzIHBvc2l0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICB4UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YO1xuXG4gICAgLyoqIFRoZSB5LWF4aXMgcG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duLiAqL1xuICAgIHlQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgdGhlIGRyb3Bkb3duIHRyaWdnZXIgaG9yaXpvbnRhbGx5LiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCB0aGUgZHJvcGRvd24gdHJpZ2dlciB2ZXJ0aWNhbGx5LiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbjtcblxuICAgIC8qKiBDbGFzcyB0byBiZSBhcHBsaWVkIHRvIHRoZSBkcm9wZG93bidzIGJhY2tkcm9wLiAqL1xuICAgIGJhY2tkcm9wQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBoYXNCYWNrZHJvcDogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIGBtYy1kcm9wZG93bmAuICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48TWNEcm9wZG93bkRlZmF1bHRPcHRpb25zPignbWMtZHJvcGRvd24tZGVmYXVsdC1vcHRpb25zJywge1xuICAgICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICAgIGZhY3Rvcnk6IE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZXG4gICAgfSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlNfRkFDVE9SWSgpOiBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICAgIG92ZXJsYXBUcmlnZ2VyWDogdHJ1ZSxcbiAgICAgICAgb3ZlcmxhcFRyaWdnZXJZOiBmYWxzZSxcbiAgICAgICAgeFBvc2l0aW9uOiAnYWZ0ZXInLFxuICAgICAgICB5UG9zaXRpb246ICdiZWxvdycsXG4gICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZVxuICAgIH07XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZHJvcGRvd24nLFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93bicsXG4gICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHJvcGRvd24uc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBtY0Ryb3Bkb3duQW5pbWF0aW9ucy50cmFuc2Zvcm1Ecm9wZG93bixcbiAgICAgICAgbWNEcm9wZG93bkFuaW1hdGlvbnMuZmFkZUluSXRlbXNcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1DX0RST1BET1dOX1BBTkVMLCB1c2VFeGlzdGluZzogTWNEcm9wZG93biB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgTWNEcm9wZG93blBhbmVsPE1jRHJvcGRvd25JdGVtPiwgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBpbiB0aGUgWCBheGlzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHhQb3NpdGlvbigpOiBEcm9wZG93blBvc2l0aW9uWCB7XG4gICAgICAgIHJldHVybiB0aGlzLl94UG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0IHhQb3NpdGlvbih2YWx1ZTogRHJvcGRvd25Qb3NpdGlvblgpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnYmVmb3JlJyAmJiB2YWx1ZSAhPT0gJ2FmdGVyJykge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3hQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24gaW4gdGhlIFkgYXhpcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB5UG9zaXRpb24oKTogRHJvcGRvd25Qb3NpdGlvblkge1xuICAgICAgICByZXR1cm4gdGhpcy5feVBvc2l0aW9uO1xuICAgIH1cblxuICAgIHNldCB5UG9zaXRpb24odmFsdWU6IERyb3Bkb3duUG9zaXRpb25ZKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJ2Fib3ZlJyAmJiB2YWx1ZSAhPT0gJ2JlbG93Jykge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3lQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCBpdHMgdHJpZ2dlciB2ZXJ0aWNhbGx5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG92ZXJsYXBUcmlnZ2VyWSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJsYXBUcmlnZ2VyWTtcbiAgICB9XG5cbiAgICBzZXQgb3ZlcmxhcFRyaWdnZXJZKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXBUcmlnZ2VyWSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBvdmVybGFwIGl0cyB0cmlnZ2VyIGhvcml6b250YWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBvdmVybGFwVHJpZ2dlclgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdmVybGFwVHJpZ2dlclg7XG4gICAgfVxuXG4gICAgc2V0IG92ZXJsYXBUcmlnZ2VyWCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9vdmVybGFwVHJpZ2dlclggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICAgIH1cblxuICAgIHNldCBoYXNCYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgdGFrZXMgY2xhc3NlcyBzZXQgb24gdGhlIGhvc3QgbWMtZHJvcGRvd24gZWxlbWVudCBhbmQgYXBwbGllcyB0aGVtIG9uIHRoZVxuICAgICAqIGRyb3Bkb3duIHRlbXBsYXRlIHRoYXQgZGlzcGxheXMgaW4gdGhlIG92ZXJsYXkgY29udGFpbmVyLiAgT3RoZXJ3aXNlLCBpdCdzIGRpZmZpY3VsdFxuICAgICAqIHRvIHN0eWxlIHRoZSBjb250YWluaW5nIGRyb3Bkb3duIGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSBjbGFzc2VzIGxpc3Qgb2YgY2xhc3MgbmFtZXNcbiAgICAgKi9cbiAgICBASW5wdXQoJ2NsYXNzJylcbiAgICBzZXQgcGFuZWxDbGFzcyhjbGFzc2VzOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNQYW5lbENsYXNzID0gdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3M7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzUGFuZWxDbGFzcyAmJiBwcmV2aW91c1BhbmVsQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91c1BhbmVsQ2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0W2NsYXNzTmFtZV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3MgPSBjbGFzc2VzO1xuXG4gICAgICAgIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdFtjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF94UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMueFBvc2l0aW9uO1xuICAgIHByaXZhdGUgX3lQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblkgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy55UG9zaXRpb247XG4gICAgcHJpdmF0ZSBfb3ZlcmxhcFRyaWdnZXJYOiBib29sZWFuID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMub3ZlcmxhcFRyaWdnZXJYO1xuICAgIHByaXZhdGUgX292ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbiA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLm92ZXJsYXBUcmlnZ2VyWTtcbiAgICBwcml2YXRlIF9oYXNCYWNrZHJvcDogYm9vbGVhbiA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLmhhc0JhY2tkcm9wO1xuXG4gICAgLyoqIENvbmZpZyBvYmplY3QgdG8gYmUgcGFzc2VkIGludG8gdGhlIGRyb3Bkb3duJ3MgbmdDbGFzcyAqL1xuICAgIGNsYXNzTGlzdDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuICAgIC8qKiBDdXJyZW50IHN0YXRlIG9mIHRoZSBwYW5lbCBhbmltYXRpb24uICovXG4gICAgcGFuZWxBbmltYXRpb25TdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyA9ICd2b2lkJztcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciBhbiBhbmltYXRpb24gb24gdGhlIGRyb3Bkb3duIGNvbXBsZXRlcy4gKi9cbiAgICBhbmltYXRpb25Eb25lID0gbmV3IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXMgYW5pbWF0aW5nLiAqL1xuICAgIGlzQW5pbWF0aW5nOiBib29sZWFuO1xuXG4gICAgLyoqIFBhcmVudCBkcm9wZG93biBvZiB0aGUgY3VycmVudCBkcm9wZG93biBwYW5lbC4gKi9cbiAgICBwYXJlbnQ6IE1jRHJvcGRvd25QYW5lbCB8IHVuZGVmaW5lZDtcblxuICAgIC8qKiBMYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcblxuICAgIC8qKiBDbGFzcyB0byBiZSBhZGRlZCB0byB0aGUgYmFja2Ryb3AgZWxlbWVudC4gKi9cbiAgICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5iYWNrZHJvcENsYXNzO1xuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogZmFsc2UgfSkgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHRoZSBpdGVtcyBpbnNpZGUgb2YgYSBkcm9wZG93bi5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1jRHJvcGRvd25JdGVtKSBpdGVtczogUXVlcnlMaXN0PE1jRHJvcGRvd25JdGVtPjtcblxuICAgIC8qKlxuICAgICAqIERyb3Bkb3duIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHJlbmRlcmVkIGxhemlseS5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChNY0Ryb3Bkb3duQ29udGVudCwgeyBzdGF0aWM6IGZhbHNlIH0pIGxhenlDb250ZW50OiBNY0Ryb3Bkb3duQ29udGVudDtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIGNsb3NlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZCB8ICdjbGljaycgfCAna2V5ZG93bicgfCAndGFiJz4gPVxuICAgICAgICBuZXcgRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+KCk7XG5cbiAgICBwcml2YXRlIHByZXZpb3VzUGFuZWxDbGFzczogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBrZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8TWNEcm9wZG93bkl0ZW0+O1xuXG4gICAgLyoqIERyb3Bkb3duIGl0ZW1zIGluc2lkZSB0aGUgY3VycmVudCBkcm9wZG93bi4gKi9cbiAgICBwcml2YXRlIGl0ZW1zQXJyYXk6IE1jRHJvcGRvd25JdGVtW10gPSBbXTtcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgYW1vdW50IG9mIGRyb3Bkb3duIGl0ZW1zIGNoYW5nZXMuICovXG4gICAgcHJpdmF0ZSBpdGVtQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PE1jRHJvcGRvd25JdGVtW10+KCk7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHRhYiBldmVudHMgb24gdGhlIGRyb3Bkb3duIHBhbmVsICovXG4gICAgcHJpdmF0ZSB0YWJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICBASW5qZWN0KE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM6IE1jRHJvcGRvd25EZWZhdWx0T3B0aW9ucykgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8TWNEcm9wZG93bkl0ZW0+KHRoaXMuaXRlbXMpXG4gICAgICAgICAgICAud2l0aFdyYXAoKVxuICAgICAgICAgICAgLndpdGhUeXBlQWhlYWQoKTtcblxuICAgICAgICB0aGlzLnRhYlN1YnNjcmlwdGlvbiA9IHRoaXMua2V5TWFuYWdlci50YWJPdXQuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VkLmVtaXQoJ3RhYicpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50YWJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jbG9zZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGhvdmVyZWQgZHJvcGRvd24gaXRlbSBjaGFuZ2VzLiAqL1xuICAgIGhvdmVyZWQoKTogT2JzZXJ2YWJsZTxNY0Ryb3Bkb3duSXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKHRoaXMuaXRlbXNBcnJheSksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGl0ZW1zKSA9PiBtZXJnZSguLi5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uaG92ZXJlZCkpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGUgYSBrZXlib2FyZCBldmVudCBmcm9tIHRoZSBkcm9wZG93biwgZGVsZWdhdGluZyB0byB0aGUgYXBwcm9wcmlhdGUgYWN0aW9uLiAqL1xuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBFU0NBUEU6XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgna2V5ZG93bicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ2x0cicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgna2V5ZG93bicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMuZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KCdrZXlkb3duJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cgfHwga2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4oJ2tleWJvYXJkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgnY2xpY2snKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1cyB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgZHJvcGRvd24uXG4gICAgICogQHBhcmFtIG9yaWdpbiBBY3Rpb24gZnJvbSB3aGljaCB0aGUgZm9jdXMgb3JpZ2luYXRlZC4gVXNlZCB0byBzZXQgdGhlIGNvcnJlY3Qgc3R5bGluZy5cbiAgICAgKi9cbiAgICBmb2N1c0ZpcnN0SXRlbShvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nKTogdm9pZCB7XG4gICAgICAgIC8vIFdoZW4gdGhlIGNvbnRlbnQgaXMgcmVuZGVyZWQgbGF6aWx5LCBpdCB0YWtlcyBhIGJpdCBiZWZvcmUgdGhlIGl0ZW1zIGFyZSBpbnNpZGUgdGhlIERPTS5cbiAgICAgICAgaWYgKHRoaXMubGF6eUNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4ob3JpZ2luKS5zZXRGaXJzdEl0ZW1BY3RpdmUoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4ob3JpZ2luKS5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgYWN0aXZlIGl0ZW0gaW4gdGhlIGRyb3Bkb3duLiBUaGlzIGlzIHVzZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkLCBhbGxvd2luZ1xuICAgICAqIHRoZSB1c2VyIHRvIHN0YXJ0IGZyb20gdGhlIGZpcnN0IG9wdGlvbiB3aGVuIHByZXNzaW5nIHRoZSBkb3duIGFycm93LlxuICAgICAqL1xuICAgIHJlc2V0QWN0aXZlSXRlbSgpIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGRyb3Bkb3duIGl0ZW0gd2l0aCB0aGUgZHJvcGRvd24uXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGFkZEl0ZW0oaXRlbTogTWNEcm9wZG93bkl0ZW0pIHtcbiAgICAgICAgLy8gV2UgcmVnaXN0ZXIgdGhlIGl0ZW1zIHRocm91Z2ggdGhpcyBtZXRob2QsIHJhdGhlciB0aGFuIHBpY2tpbmcgdGhlbSB1cCB0aHJvdWdoXG4gICAgICAgIC8vIGBDb250ZW50Q2hpbGRyZW5gLCBiZWNhdXNlIHdlIG5lZWQgdGhlIGl0ZW1zIHRvIGJlIHBpY2tlZCB1cCBieSB0aGVpciBjbG9zZXN0XG4gICAgICAgIC8vIGBtYy1kcm9wZG93bmAgYW5jZXN0b3IuIElmIHdlIHVzZWQgYEBDb250ZW50Q2hpbGRyZW4oTWNEcm9wZG93bkl0ZW0sIHtkZXNjZW5kYW50czogdHJ1ZX0pYCxcbiAgICAgICAgLy8gYWxsIGRlc2NlbmRhbnQgaXRlbXMgd2lsbCBibGVlZCBpbnRvIHRoZSB0b3AtbGV2ZWwgZHJvcGRvd24gaW4gdGhlIGNhc2Ugd2hlcmUgdGhlIGNvbnN1bWVyXG4gICAgICAgIC8vIGhhcyBgbWMtZHJvcGRvd25gIGluc3RhbmNlcyBuZXN0ZWQgaW5zaWRlIGVhY2ggb3RoZXIuXG4gICAgICAgIGlmICh0aGlzLml0ZW1zQXJyYXkuaW5kZXhPZihpdGVtKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNBcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2hhbmdlcy5uZXh0KHRoaXMuaXRlbXNBcnJheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgZHJvcGRvd24uXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlbW92ZUl0ZW0oaXRlbTogTWNEcm9wZG93bkl0ZW0pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zQXJyYXkuaW5kZXhPZihpdGVtKTtcblxuICAgICAgICBpZiAodGhpcy5pdGVtc0FycmF5LmluZGV4T2YoaXRlbSkgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0FycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1DaGFuZ2VzLm5leHQodGhpcy5pdGVtc0FycmF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgY2xhc3NlcyB0byB0aGUgZHJvcGRvd24gcGFuZWwgYmFzZWQgb24gaXRzIHBvc2l0aW9uLiBDYW4gYmUgdXNlZCBieVxuICAgICAqIGNvbnN1bWVycyB0byBhZGQgc3BlY2lmaWMgc3R5bGluZyBiYXNlZCBvbiB0aGUgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHBvc1ggUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGFsb25nIHRoZSB4IGF4aXMuXG4gICAgICogQHBhcmFtIHBvc1kgUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGFsb25nIHRoZSB5IGF4aXMuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFBvc2l0aW9uQ2xhc3Nlcyhwb3NYOiBEcm9wZG93blBvc2l0aW9uWCA9IHRoaXMueFBvc2l0aW9uLCBwb3NZOiBEcm9wZG93blBvc2l0aW9uWSA9IHRoaXMueVBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLmNsYXNzTGlzdDtcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYmVmb3JlJ10gPSBwb3NYID09PSAnYmVmb3JlJztcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYWZ0ZXInXSA9IHBvc1ggPT09ICdhZnRlcic7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWFib3ZlJ10gPSBwb3NZID09PSAnYWJvdmUnO1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1iZWxvdyddID0gcG9zWSA9PT0gJ2JlbG93JztcbiAgICB9XG5cbiAgICAvKiogU3RhcnRzIHRoZSBlbnRlciBhbmltYXRpb24uICovXG4gICAgc3RhcnRBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMucGFuZWxBbmltYXRpb25TdGF0ZSA9ICdlbnRlcic7XG4gICAgfVxuXG4gICAgLyoqIFJlc2V0cyB0aGUgcGFuZWwgYW5pbWF0aW9uIHRvIGl0cyBpbml0aWFsIHN0YXRlLiAqL1xuICAgIHJlc2V0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBhbmVsQW5pbWF0aW9uU3RhdGUgPSAndm9pZCc7XG4gICAgfVxuXG4gICAgLyoqIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSBwYW5lbCBhbmltYXRpb24gY29tcGxldGVzLiAqL1xuICAgIG9uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25Eb25lLm5leHQoZXZlbnQpO1xuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRoZSBjb250ZW50IGVsZW1lbnQgdG8gdGhlIHRvcCBhcyBzb29uIGFzIHRoZSBhbmltYXRpb24gc3RhcnRzLiBUaGlzIGlzIG5lY2Vzc2FyeSxcbiAgICAgICAgLy8gYmVjYXVzZSB3ZSBtb3ZlIGZvY3VzIHRvIHRoZSBmaXJzdCBpdGVtIHdoaWxlIGl0J3Mgc3RpbGwgYmVpbmcgYW5pbWF0ZWQsIHdoaWNoIGNhbiB0aHJvd1xuICAgICAgICAvLyB0aGUgYnJvd3NlciBvZmYgd2hlbiBpdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgcG9zaXRpb24uIEFsdGVybmF0aXZlbHkgd2UgY2FuIG1vdmUgZm9jdXNcbiAgICAgICAgLy8gd2hlbiB0aGUgYW5pbWF0aW9uIGlzIGRvbmUsIGhvd2V2ZXIgbW92aW5nIGZvY3VzIGFzeW5jaHJvbm91c2x5IHdpbGwgaW50ZXJydXB0IHNjcmVlblxuICAgICAgICAvLyByZWFkZXJzIHdoaWNoIGFyZSBpbiB0aGUgcHJvY2VzcyBvZiByZWFkaW5nIG91dCB0aGUgZHJvcGRvd24gYWxyZWFkeS4gV2UgdGFrZSB0aGUgYGVsZW1lbnRgXG4gICAgICAgIC8vIGZyb20gdGhlIGBldmVudGAgc2luY2Ugd2UgY2FuJ3QgdXNlIGEgYFZpZXdDaGlsZGAgdG8gYWNjZXNzIHRoZSBwYW5lLlxuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJyAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBldmVudC5lbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
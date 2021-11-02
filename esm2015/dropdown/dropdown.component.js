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
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
    close() {
        const focusOrigin = this.keyManager.getFocusOrigin() === 'keyboard' ? 'keydown' : 'click';
        this.closed.emit(focusOrigin);
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
/** @nocollapse */ McDropdown.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdown, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: MC_DROPDOWN_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McDropdown.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McDropdown, selector: "mc-dropdown", inputs: { navigationWithWrap: "navigationWithWrap", xPosition: "xPosition", yPosition: "yPosition", overlapTriggerY: "overlapTriggerY", overlapTriggerX: "overlapTriggerX", hasBackdrop: "hasBackdrop", panelClass: ["class", "panelClass"], backdropClass: "backdropClass" }, outputs: { closed: "closed" }, providers: [
        { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
    ], queries: [{ propertyName: "lazyContent", first: true, predicate: McDropdownContent, descendants: true }, { propertyName: "items", predicate: McDropdownItem, descendants: true }], viewQueries: [{ propertyName: "templateRef", first: true, predicate: TemplateRef, descendants: true }], exportAs: ["mcDropdown"], ngImport: i0, template: "<ng-template>\n    <div class=\"mc-dropdown__panel\"\n         [ngClass]=\"classList\"\n         [class.mc-dropdown__panel_nested]=\"parent\"\n         [style.min-width]=\"triggerWidth\"\n         (keydown)=\"handleKeydown($event)\"\n         (click)=\"close()\"\n         [@transformDropdown]=\"panelAnimationState\"\n         (@transformDropdown.start)=\"onAnimationStart($event)\"\n         (@transformDropdown.done)=\"onAnimationDone($event)\"\n         tabindex=\"-1\">\n\n        <div class=\"mc-dropdown__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n", styles: [".mc-dropdown__panel{margin-top:-1px;max-width:640px;max-width:var(--mc-dropdown-panel-size-max-width, 640px);border-width:1px;border-width:var(--mc-dropdown-panel-size-border-width, 1px);border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-dropdown-panel-size-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-dropdown-panel-size-border-radius, 3px);padding:4px 0;padding:var(--mc-dropdown-panel-size-padding, 4px 0)}.mc-dropdown__panel.mc-dropdown__panel_nested{border-top-left-radius:3px;border-top-left-radius:var(--mc-dropdown-panel-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-dropdown-panel-size-border-radius, 3px)}.mc-dropdown__panel.ng-animating{pointer-events:none}.mc-dropdown__content{display:flex;flex-direction:column}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [
        mcDropdownAnimations.transformDropdown,
        mcDropdownAnimations.fadeInItems
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdown, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-dropdown',
                    exportAs: 'mcDropdown',
                    templateUrl: 'dropdown.html',
                    styleUrls: ['dropdown.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [
                        mcDropdownAnimations.transformDropdown,
                        mcDropdownAnimations.fadeInItems
                    ],
                    providers: [
                        { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DROPDOWN_DEFAULT_OPTIONS]
                }] }]; }, propDecorators: { navigationWithWrap: [{
                type: Input
            }], xPosition: [{
                type: Input
            }], yPosition: [{
                type: Input
            }], overlapTriggerY: [{
                type: Input
            }], overlapTriggerX: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], panelClass: [{
                type: Input,
                args: ['class']
            }], backdropClass: [{
                type: Input
            }], templateRef: [{
                type: ViewChild,
                args: [TemplateRef, { static: false }]
            }], items: [{
                type: ContentChildren,
                args: [McDropdownItem, { descendants: true }]
            }], lazyContent: [{
                type: ContentChild,
                args: [McDropdownContent, { static: false }]
            }], closed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9kcm9wZG93bi9kcm9wZG93bi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFFcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENB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LE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRy9CLE1BQU07c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvY3VzS2V5TWFuYWdlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IEVTQ0FQRSwgTEVGVF9BUlJPVywgUklHSFRfQVJST1cgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jRHJvcGRvd25BbmltYXRpb25zIH0gZnJvbSAnLi9kcm9wZG93bi1hbmltYXRpb25zJztcbmltcG9ydCB7IE1jRHJvcGRvd25Db250ZW50IH0gZnJvbSAnLi9kcm9wZG93bi1jb250ZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25YLCB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25ZIH0gZnJvbSAnLi9kcm9wZG93bi1lcnJvcnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkl0ZW0gfSBmcm9tICcuL2Ryb3Bkb3duLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgRHJvcGRvd25Qb3NpdGlvblgsXG4gICAgRHJvcGRvd25Qb3NpdGlvblksXG4gICAgTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TLFxuICAgIE1DX0RST1BET1dOX1BBTkVMLFxuICAgIE1jRHJvcGRvd25EZWZhdWx0T3B0aW9ucyxcbiAgICBNY0Ryb3Bkb3duUGFuZWxcbn0gZnJvbSAnLi9kcm9wZG93bi50eXBlcyc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kcm9wZG93bicsXG4gICAgZXhwb3J0QXM6ICdtY0Ryb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkcm9wZG93bi5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIG1jRHJvcGRvd25BbmltYXRpb25zLnRyYW5zZm9ybURyb3Bkb3duLFxuICAgICAgICBtY0Ryb3Bkb3duQW5pbWF0aW9ucy5mYWRlSW5JdGVtc1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTUNfRFJPUERPV05fUEFORUwsIHVzZUV4aXN0aW5nOiBNY0Ryb3Bkb3duIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBNY0Ryb3Bkb3duUGFuZWwsIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG5hdmlnYXRpb25XaXRoV3JhcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBpbiB0aGUgWCBheGlzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHhQb3NpdGlvbigpOiBEcm9wZG93blBvc2l0aW9uWCB7XG4gICAgICAgIHJldHVybiB0aGlzLl94UG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0IHhQb3NpdGlvbih2YWx1ZTogRHJvcGRvd25Qb3NpdGlvblgpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnYmVmb3JlJyAmJiB2YWx1ZSAhPT0gJ2FmdGVyJykge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3hQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24gaW4gdGhlIFkgYXhpcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB5UG9zaXRpb24oKTogRHJvcGRvd25Qb3NpdGlvblkge1xuICAgICAgICByZXR1cm4gdGhpcy5feVBvc2l0aW9uO1xuICAgIH1cblxuICAgIHNldCB5UG9zaXRpb24odmFsdWU6IERyb3Bkb3duUG9zaXRpb25ZKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJ2Fib3ZlJyAmJiB2YWx1ZSAhPT0gJ2JlbG93Jykge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3lQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCBpdHMgdHJpZ2dlciB2ZXJ0aWNhbGx5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG92ZXJsYXBUcmlnZ2VyWSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJsYXBUcmlnZ2VyWTtcbiAgICB9XG5cbiAgICBzZXQgb3ZlcmxhcFRyaWdnZXJZKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXBUcmlnZ2VyWSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBvdmVybGFwIGl0cyB0cmlnZ2VyIGhvcml6b250YWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBvdmVybGFwVHJpZ2dlclgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdmVybGFwVHJpZ2dlclg7XG4gICAgfVxuXG4gICAgc2V0IG92ZXJsYXBUcmlnZ2VyWCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9vdmVybGFwVHJpZ2dlclggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICAgIH1cblxuICAgIHNldCBoYXNCYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgdGFrZXMgY2xhc3NlcyBzZXQgb24gdGhlIGhvc3QgbWMtZHJvcGRvd24gZWxlbWVudCBhbmQgYXBwbGllcyB0aGVtIG9uIHRoZVxuICAgICAqIGRyb3Bkb3duIHRlbXBsYXRlIHRoYXQgZGlzcGxheXMgaW4gdGhlIG92ZXJsYXkgY29udGFpbmVyLiAgT3RoZXJ3aXNlLCBpdCdzIGRpZmZpY3VsdFxuICAgICAqIHRvIHN0eWxlIHRoZSBjb250YWluaW5nIGRyb3Bkb3duIGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSBjbGFzc2VzIGxpc3Qgb2YgY2xhc3MgbmFtZXNcbiAgICAgKi9cbiAgICBASW5wdXQoJ2NsYXNzJylcbiAgICBzZXQgcGFuZWxDbGFzcyhjbGFzc2VzOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNQYW5lbENsYXNzID0gdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3M7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzUGFuZWxDbGFzcyAmJiBwcmV2aW91c1BhbmVsQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91c1BhbmVsQ2xhc3NcbiAgICAgICAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5jbGFzc0xpc3RbY2xhc3NOYW1lXSA9IGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldmlvdXNQYW5lbENsYXNzID0gY2xhc3NlcztcblxuICAgICAgICBpZiAoY2xhc3Nlcz8ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGFzc2VzXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHRoaXMuY2xhc3NMaXN0W2NsYXNzTmFtZV0gPSB0cnVlKTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF94UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YID0gdGhpcy5kZWZhdWx0T3B0aW9ucy54UG9zaXRpb247XG4gICAgcHJpdmF0ZSBfeVBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWSA9IHRoaXMuZGVmYXVsdE9wdGlvbnMueVBvc2l0aW9uO1xuICAgIHByaXZhdGUgX292ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbiA9IHRoaXMuZGVmYXVsdE9wdGlvbnMub3ZlcmxhcFRyaWdnZXJYO1xuICAgIHByaXZhdGUgX292ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbiA9IHRoaXMuZGVmYXVsdE9wdGlvbnMub3ZlcmxhcFRyaWdnZXJZO1xuICAgIHByaXZhdGUgX2hhc0JhY2tkcm9wOiBib29sZWFuID0gdGhpcy5kZWZhdWx0T3B0aW9ucy5oYXNCYWNrZHJvcDtcblxuICAgIHRyaWdnZXJXaWR0aDogc3RyaW5nID0gJyc7XG4gICAgLyoqIENvbmZpZyBvYmplY3QgdG8gYmUgcGFzc2VkIGludG8gdGhlIGRyb3Bkb3duJ3MgbmdDbGFzcyAqL1xuICAgIGNsYXNzTGlzdDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuICAgIC8qKiBDdXJyZW50IHN0YXRlIG9mIHRoZSBwYW5lbCBhbmltYXRpb24uICovXG4gICAgcGFuZWxBbmltYXRpb25TdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyA9ICd2b2lkJztcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciBhbiBhbmltYXRpb24gb24gdGhlIGRyb3Bkb3duIGNvbXBsZXRlcy4gKi9cbiAgICBhbmltYXRpb25Eb25lID0gbmV3IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXMgYW5pbWF0aW5nLiAqL1xuICAgIGlzQW5pbWF0aW5nOiBib29sZWFuO1xuXG4gICAgLyoqIFBhcmVudCBkcm9wZG93biBvZiB0aGUgY3VycmVudCBkcm9wZG93biBwYW5lbC4gKi9cbiAgICBwYXJlbnQ6IE1jRHJvcGRvd25QYW5lbCB8IHVuZGVmaW5lZDtcblxuICAgIC8qKiBMYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcblxuICAgIC8qKiBDbGFzcyB0byBiZSBhZGRlZCB0byB0aGUgYmFja2Ryb3AgZWxlbWVudC4gKi9cbiAgICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSB0aGlzLmRlZmF1bHRPcHRpb25zLmJhY2tkcm9wQ2xhc3M7XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgdGhlIGl0ZW1zIGluc2lkZSBvZiBhIGRyb3Bkb3duLlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNEcm9wZG93bkl0ZW0sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgaXRlbXM6IFF1ZXJ5TGlzdDxNY0Ryb3Bkb3duSXRlbT47XG5cbiAgICAvKipcbiAgICAgKiBEcm9wZG93biBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93bkNvbnRlbnQsIHsgc3RhdGljOiBmYWxzZSB9KSBsYXp5Q29udGVudDogTWNEcm9wZG93bkNvbnRlbnQ7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBjbG9zZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZCB8ICdjbGljaycgfCAna2V5ZG93bicgfCAndGFiJz4oKTtcblxuICAgIHByaXZhdGUgcHJldmlvdXNQYW5lbENsYXNzOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGtleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNY0Ryb3Bkb3duSXRlbT47XG5cbiAgICAvKiogT25seSB0aGUgZGlyZWN0IGRlc2NlbmRhbnQgbWVudSBpdGVtcy4gKi9cbiAgICBwcml2YXRlIGRpcmVjdERlc2NlbmRhbnRJdGVtcyA9IG5ldyBRdWVyeUxpc3Q8TWNEcm9wZG93bkl0ZW0+KCk7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHRhYiBldmVudHMgb24gdGhlIGRyb3Bkb3duIHBhbmVsICovXG4gICAgcHJpdmF0ZSB0YWJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IE1jRHJvcGRvd25EZWZhdWx0T3B0aW9ucykgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0RGVzY2VuZGFudHMoKTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyPE1jRHJvcGRvd25JdGVtPih0aGlzLmRpcmVjdERlc2NlbmRhbnRJdGVtcylcbiAgICAgICAgICAgIC53aXRoVHlwZUFoZWFkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvbldpdGhXcmFwKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aFdyYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFiU3Vic2NyaXB0aW9uID0gdGhpcy5rZXlNYW5hZ2VyLnRhYk91dFxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlZC5lbWl0KCd0YWInKSk7XG5cbiAgICAgICAgLy8gSWYgYSB1c2VyIG1hbnVhbGx5IChwcm9ncmFtbWF0aWNhbGx5KSBmb2N1c2VzIGEgbWVudSBpdGVtLCB3ZSBuZWVkIHRvIHJlZmxlY3QgdGhhdCBmb2N1c1xuICAgICAgICAvLyBjaGFuZ2UgYmFjayB0byB0aGUga2V5IG1hbmFnZXIuIE5vdGUgdGhhdCB3ZSBkb24ndCBuZWVkIHRvIHVuc3Vic2NyaWJlIGhlcmUgYmVjYXVzZSBmb2N1c2VkXG4gICAgICAgIC8vIGlzIGludGVybmFsIGFuZCB3ZSBrbm93IHRoYXQgaXQgZ2V0cyBjb21wbGV0ZWQgb24gZGVzdHJveS5cbiAgICAgICAgdGhpcy5kaXJlY3REZXNjZW5kYW50SXRlbXMuY2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHRoaXMuZGlyZWN0RGVzY2VuZGFudEl0ZW1zKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKGl0ZW1zKSA9PiBtZXJnZSguLi5pdGVtcy5tYXAoKGl0ZW06IE1jRHJvcGRvd25JdGVtKSA9PiBpdGVtLmZvY3VzZWQpKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGZvY3VzZWRJdGVtKSA9PiB0aGlzLmtleU1hbmFnZXIudXBkYXRlQWN0aXZlSXRlbShmb2N1c2VkSXRlbSBhcyBNY0Ryb3Bkb3duSXRlbSkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpcmVjdERlc2NlbmRhbnRJdGVtcy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudGFiU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBob3ZlcmVkIGRyb3Bkb3duIGl0ZW0gY2hhbmdlcy4gKi9cbiAgICBob3ZlcmVkKCk6IE9ic2VydmFibGU8TWNEcm9wZG93bkl0ZW0+IHtcbiAgICAgICAgY29uc3QgaXRlbUNoYW5nZXMgPSB0aGlzLmRpcmVjdERlc2NlbmRhbnRJdGVtcy5jaGFuZ2VzIGFzIE9ic2VydmFibGU8UXVlcnlMaXN0PE1jRHJvcGRvd25JdGVtPj47XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1DaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgodGhpcy5kaXJlY3REZXNjZW5kYW50SXRlbXMpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKChpdGVtcykgPT4gbWVyZ2UoLi4uaXRlbXMubWFwKChpdGVtOiBNY0Ryb3Bkb3duSXRlbSkgPT4gaXRlbS5ob3ZlcmVkKSkpXG4gICAgICAgICkgYXMgT2JzZXJ2YWJsZTxNY0Ryb3Bkb3duSXRlbT47XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSBhIGtleWJvYXJkIGV2ZW50IGZyb20gdGhlIGRyb3Bkb3duLCBkZWxlZ2F0aW5nIHRvIHRoZSBhcHByb3ByaWF0ZSBhY3Rpb24uICovXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5kaXJlY3Rpb24gPT09ICdsdHInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgna2V5ZG93bicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XIHx8IGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdrZXlib2FyZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG9uJ3QgYWxsb3cgdGhlIGV2ZW50IHRvIHByb3BhZ2F0ZSBpZiB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQgaXQsIG9yIGl0IG1heVxuICAgICAgICAvLyBlbmQgdXAgcmVhY2hpbmcgb3RoZXIgb3ZlcmxheXMgdGhhdCB3ZXJlIG9wZW5lZCBlYXJsaWVyLlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1cyB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgZHJvcGRvd24uXG4gICAgICogQHBhcmFtIG9yaWdpbiBBY3Rpb24gZnJvbSB3aGljaCB0aGUgZm9jdXMgb3JpZ2luYXRlZC4gVXNlZCB0byBzZXQgdGhlIGNvcnJlY3Qgc3R5bGluZy5cbiAgICAgKi9cbiAgICBmb2N1c0ZpcnN0SXRlbShvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nKTogdm9pZCB7XG4gICAgICAgIC8vIFdoZW4gdGhlIGNvbnRlbnQgaXMgcmVuZGVyZWQgbGF6aWx5LCBpdCB0YWtlcyBhIGJpdCBiZWZvcmUgdGhlIGl0ZW1zIGFyZSBpbnNpZGUgdGhlIERPTS5cbiAgICAgICAgaWYgKHRoaXMubGF6eUNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbihvcmlnaW4pLnNldEZpcnN0SXRlbUFjdGl2ZSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbihvcmlnaW4pLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBhY3RpdmUgaXRlbSBpbiB0aGUgZHJvcGRvd24uIFRoaXMgaXMgdXNlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQsIGFsbG93aW5nXG4gICAgICogdGhlIHVzZXIgdG8gc3RhcnQgZnJvbSB0aGUgZmlyc3Qgb3B0aW9uIHdoZW4gcHJlc3NpbmcgdGhlIGRvd24gYXJyb3cuXG4gICAgICovXG4gICAgcmVzZXRBY3RpdmVJdGVtKCkge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbT8ucmVzZXRTdHlsZXMoKTtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgY2xhc3NlcyB0byB0aGUgZHJvcGRvd24gcGFuZWwgYmFzZWQgb24gaXRzIHBvc2l0aW9uLiBDYW4gYmUgdXNlZCBieVxuICAgICAqIGNvbnN1bWVycyB0byBhZGQgc3BlY2lmaWMgc3R5bGluZyBiYXNlZCBvbiB0aGUgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHBvc1ggUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGFsb25nIHRoZSB4IGF4aXMuXG4gICAgICogQHBhcmFtIHBvc1kgUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGFsb25nIHRoZSB5IGF4aXMuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFBvc2l0aW9uQ2xhc3Nlcyhwb3NYOiBEcm9wZG93blBvc2l0aW9uWCA9IHRoaXMueFBvc2l0aW9uLCBwb3NZOiBEcm9wZG93blBvc2l0aW9uWSA9IHRoaXMueVBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLmNsYXNzTGlzdDtcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYmVmb3JlJ10gPSBwb3NYID09PSAnYmVmb3JlJztcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYWZ0ZXInXSA9IHBvc1ggPT09ICdhZnRlcic7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWFib3ZlJ10gPSBwb3NZID09PSAnYWJvdmUnO1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1iZWxvdyddID0gcG9zWSA9PT0gJ2JlbG93JztcbiAgICB9XG5cbiAgICAvKiogU3RhcnRzIHRoZSBlbnRlciBhbmltYXRpb24uICovXG4gICAgc3RhcnRBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMucGFuZWxBbmltYXRpb25TdGF0ZSA9ICdlbnRlcic7XG4gICAgfVxuXG4gICAgLyoqIFJlc2V0cyB0aGUgcGFuZWwgYW5pbWF0aW9uIHRvIGl0cyBpbml0aWFsIHN0YXRlLiAqL1xuICAgIHJlc2V0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBhbmVsQW5pbWF0aW9uU3RhdGUgPSAndm9pZCc7XG4gICAgfVxuXG4gICAgLyoqIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSBwYW5lbCBhbmltYXRpb24gY29tcGxldGVzLiAqL1xuICAgIG9uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25Eb25lLm5leHQoZXZlbnQpO1xuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRoZSBjb250ZW50IGVsZW1lbnQgdG8gdGhlIHRvcCBhcyBzb29uIGFzIHRoZSBhbmltYXRpb24gc3RhcnRzLiBUaGlzIGlzIG5lY2Vzc2FyeSxcbiAgICAgICAgLy8gYmVjYXVzZSB3ZSBtb3ZlIGZvY3VzIHRvIHRoZSBmaXJzdCBpdGVtIHdoaWxlIGl0J3Mgc3RpbGwgYmVpbmcgYW5pbWF0ZWQsIHdoaWNoIGNhbiB0aHJvd1xuICAgICAgICAvLyB0aGUgYnJvd3NlciBvZmYgd2hlbiBpdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgcG9zaXRpb24uIEFsdGVybmF0aXZlbHkgd2UgY2FuIG1vdmUgZm9jdXNcbiAgICAgICAgLy8gd2hlbiB0aGUgYW5pbWF0aW9uIGlzIGRvbmUsIGhvd2V2ZXIgbW92aW5nIGZvY3VzIGFzeW5jaHJvbm91c2x5IHdpbGwgaW50ZXJydXB0IHNjcmVlblxuICAgICAgICAvLyByZWFkZXJzIHdoaWNoIGFyZSBpbiB0aGUgcHJvY2VzcyBvZiByZWFkaW5nIG91dCB0aGUgZHJvcGRvd24gYWxyZWFkeS4gV2UgdGFrZSB0aGUgYGVsZW1lbnRgXG4gICAgICAgIC8vIGZyb20gdGhlIGBldmVudGAgc2luY2Ugd2UgY2FuJ3QgdXNlIGEgYFZpZXdDaGlsZGAgdG8gYWNjZXNzIHRoZSBwYW5lLlxuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJyAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBldmVudC5lbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgY29uc3QgZm9jdXNPcmlnaW4gPSB0aGlzLmtleU1hbmFnZXIuZ2V0Rm9jdXNPcmlnaW4oKSA9PT0gJ2tleWJvYXJkJyA/ICdrZXlkb3duJyA6ICdjbGljayc7XG5cbiAgICAgICAgdGhpcy5jbG9zZWQuZW1pdChmb2N1c09yaWdpbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHN0cmVhbSB0aGF0IHdpbGwga2VlcCB0cmFjayBvZiBhbnkgbmV3bHktYWRkZWQgbWVudSBpdGVtcyBhbmQgd2lsbCB1cGRhdGUgdGhlIGxpc3RcbiAgICAgKiBvZiBkaXJlY3QgZGVzY2VuZGFudHMuIFdlIGNvbGxlY3QgdGhlIGRlc2NlbmRhbnRzIHRoaXMgd2F5LCBiZWNhdXNlIGBfYWxsSXRlbXNgIGNhbiBpbmNsdWRlXG4gICAgICogaXRlbXMgdGhhdCBhcmUgcGFydCBvZiBjaGlsZCBtZW51cywgYW5kIHVzaW5nIGEgY3VzdG9tIHdheSBvZiByZWdpc3RlcmluZyBpdGVtcyBpcyB1bnJlbGlhYmxlXG4gICAgICogd2hlbiBpdCBjb21lcyB0byBtYWludGFpbmluZyB0aGUgaXRlbSBvcmRlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZURpcmVjdERlc2NlbmRhbnRzKCkge1xuICAgICAgICB0aGlzLml0ZW1zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aCh0aGlzLml0ZW1zKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGl0ZW1zOiBRdWVyeUxpc3Q8TWNEcm9wZG93bkl0ZW0+KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3REZXNjZW5kYW50SXRlbXMucmVzZXQoaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnBhcmVudERyb3Bkb3duUGFuZWwgPT09IHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdERlc2NlbmRhbnRJdGVtcy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwibWMtZHJvcGRvd25fX3BhbmVsXCJcbiAgICAgICAgIFtuZ0NsYXNzXT1cImNsYXNzTGlzdFwiXG4gICAgICAgICBbY2xhc3MubWMtZHJvcGRvd25fX3BhbmVsX25lc3RlZF09XCJwYXJlbnRcIlxuICAgICAgICAgW3N0eWxlLm1pbi13aWR0aF09XCJ0cmlnZ2VyV2lkdGhcIlxuICAgICAgICAgKGtleWRvd24pPVwiaGFuZGxlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgIChjbGljayk9XCJjbG9zZSgpXCJcbiAgICAgICAgIFtAdHJhbnNmb3JtRHJvcGRvd25dPVwicGFuZWxBbmltYXRpb25TdGF0ZVwiXG4gICAgICAgICAoQHRyYW5zZm9ybURyb3Bkb3duLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAoQHRyYW5zZm9ybURyb3Bkb3duLmRvbmUpPVwib25BbmltYXRpb25Eb25lKCRldmVudClcIlxuICAgICAgICAgdGFiaW5kZXg9XCItMVwiPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy1kcm9wZG93bl9fY29udGVudFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=
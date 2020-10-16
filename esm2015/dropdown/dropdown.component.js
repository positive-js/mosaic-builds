/**
 * @fileoverview added by tsickle
 * Generated from: dropdown.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * Default `mc-dropdown` options that can be overridden.
 * @record
 */
export function McDropdownDefaultOptions() { }
if (false) {
    /**
     * The x-axis position of the dropdown.
     * @type {?}
     */
    McDropdownDefaultOptions.prototype.xPosition;
    /**
     * The y-axis position of the dropdown.
     * @type {?}
     */
    McDropdownDefaultOptions.prototype.yPosition;
    /**
     * Whether the dropdown should overlap the dropdown trigger horizontally.
     * @type {?}
     */
    McDropdownDefaultOptions.prototype.overlapTriggerX;
    /**
     * Whether the dropdown should overlap the dropdown trigger vertically.
     * @type {?}
     */
    McDropdownDefaultOptions.prototype.overlapTriggerY;
    /**
     * Class to be applied to the dropdown's backdrop.
     * @type {?}
     */
    McDropdownDefaultOptions.prototype.backdropClass;
    /**
     * Whether the dropdown has a backdrop.
     * @type {?|undefined}
     */
    McDropdownDefaultOptions.prototype.hasBackdrop;
    /** @type {?|undefined} */
    McDropdownDefaultOptions.prototype.closeOnOutsideClick;
}
/**
 * Injection token to be used to override the default options for `mc-dropdown`.
 * @type {?}
 */
export const MC_DROPDOWN_DEFAULT_OPTIONS = new InjectionToken('mc-dropdown-default-options', {
    providedIn: 'root',
    factory: MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
// tslint:disable-next-line:naming-convention
export function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY() {
    return {
        overlapTriggerX: true,
        overlapTriggerY: false,
        xPosition: 'after',
        yPosition: 'below',
        backdropClass: 'cdk-overlay-transparent-backdrop'
    };
}
export class McDropdown {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _defaultOptions
     */
    constructor(_elementRef, _ngZone, _defaultOptions) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._defaultOptions = _defaultOptions;
        this._closeOnOutsideClick = this._defaultOptions.closeOnOutsideClick;
        this._xPosition = this._defaultOptions.xPosition;
        this._yPosition = this._defaultOptions.yPosition;
        this._overlapTriggerX = this._defaultOptions.overlapTriggerX;
        this._overlapTriggerY = this._defaultOptions.overlapTriggerY;
        this._hasBackdrop = this._defaultOptions.hasBackdrop;
        /**
         * Config object to be passed into the dropdown's ngClass
         */
        this.classList = {};
        /**
         * Current state of the panel animation.
         */
        this.panelAnimationState = 'void';
        /**
         * Emits whenever an animation on the dropdown completes.
         */
        this.animationDone = new Subject();
        /**
         * Class to be added to the backdrop element.
         */
        this.backdropClass = this._defaultOptions.backdropClass;
        /**
         * Event emitted when the dropdown is closed.
         */
        this.closed = new EventEmitter();
        /**
         * Dropdown items inside the current dropdown.
         */
        this.itemsArray = [];
        /**
         * Emits whenever the amount of dropdown items changes.
         */
        this.itemChanges = new Subject();
        /**
         * Subscription to tab events on the dropdown panel
         */
        this.tabSubscription = Subscription.EMPTY;
    }
    /**
     * Position of the dropdown in the X axis.
     * @return {?}
     */
    get xPosition() {
        return this._xPosition;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set xPosition(value) {
        if (value !== 'before' && value !== 'after') {
            throwMcDropdownInvalidPositionX();
        }
        this._xPosition = value;
        this.setPositionClasses();
    }
    /**
     * Position of the dropdown in the Y axis.
     * @return {?}
     */
    get yPosition() {
        return this._yPosition;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set yPosition(value) {
        if (value !== 'above' && value !== 'below') {
            throwMcDropdownInvalidPositionY();
        }
        this._yPosition = value;
        this.setPositionClasses();
    }
    /**
     * Whether the dropdown should overlap its trigger vertically.
     * @return {?}
     */
    get overlapTriggerY() {
        return this._overlapTriggerY;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set overlapTriggerY(value) {
        this._overlapTriggerY = coerceBooleanProperty(value);
    }
    /**
     * Whether the dropdown should overlap its trigger horizontally.
     * @return {?}
     */
    get overlapTriggerX() {
        return this._overlapTriggerX;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set overlapTriggerX(value) {
        this._overlapTriggerX = coerceBooleanProperty(value);
    }
    /**
     * Whether the dropdown has a backdrop.
     * @return {?}
     */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * Close menu when an outside click is detected
     * @return {?}
     */
    get closeOnOutsideClick() { return this._closeOnOutsideClick; }
    /**
     * @param {?} value
     * @return {?}
     */
    set closeOnOutsideClick(value) {
        this._closeOnOutsideClick = coerceBooleanProperty(value);
    }
    /**
     * This method takes classes set on the host mc-dropdown element and applies them on the
     * dropdown template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing dropdown from outside the component.
     * @param {?} classes list of class names
     * @return {?}
     */
    set panelClass(classes) {
        /** @type {?} */
        const previousPanelClass = this.previousPanelClass;
        if (previousPanelClass && previousPanelClass.length) {
            previousPanelClass.split(' ').forEach((/**
             * @param {?} className
             * @return {?}
             */
            (className) => {
                this.classList[className] = false;
            }));
        }
        this.previousPanelClass = classes;
        if (classes && classes.length) {
            classes.split(' ').forEach((/**
             * @param {?} className
             * @return {?}
             */
            (className) => {
                this.classList[className] = true;
            }));
            this._elementRef.nativeElement.className = '';
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setPositionClasses();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.keyManager = new FocusKeyManager(this.items)
            .withWrap()
            .withTypeAhead();
        this.tabSubscription = this.keyManager.tabOut.subscribe((/**
         * @return {?}
         */
        () => this.closed.emit('tab')));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.tabSubscription.unsubscribe();
        this.closed.complete();
    }
    /**
     * Stream that emits whenever the hovered dropdown item changes.
     * @return {?}
     */
    hovered() {
        return this.itemChanges.pipe(startWith(this.itemsArray), switchMap((/**
         * @param {?} items
         * @return {?}
         */
        (items) => merge(...items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.hovered))))));
    }
    /**
     * Handle a keyboard event from the dropdown, delegating to the appropriate action.
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
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
    /**
     * @return {?}
     */
    handleClick() {
        this.closed.emit('click');
    }
    /**
     * Focus the first item in the dropdown.
     * @param {?=} origin Action from which the focus originated. Used to set the correct styling.
     * @return {?}
     */
    focusFirstItem(origin = 'program') {
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this._ngZone.onStable.asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => this.keyManager.setFocusOrigin(origin).setFirstItemActive()));
        }
        else {
            this.keyManager.setFocusOrigin(origin).setFirstItemActive();
        }
    }
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     * @return {?}
     */
    resetActiveItem() {
        this.keyManager.setActiveItem(-1);
    }
    /**
     * Registers a dropdown item with the dropdown.
     * \@docs-private
     * @param {?} item
     * @return {?}
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
     * \@docs-private
     * @param {?} item
     * @return {?}
     */
    removeItem(item) {
        /** @type {?} */
        const index = this.itemsArray.indexOf(item);
        if (this.itemsArray.indexOf(item) > -1) {
            this.itemsArray.splice(index, 1);
            this.itemChanges.next(this.itemsArray);
        }
    }
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * \@docs-private
     * @param {?=} posX Position of the dropdown along the x axis.
     * @param {?=} posY Position of the dropdown along the y axis.
     * @return {?}
     */
    setPositionClasses(posX = this.xPosition, posY = this.yPosition) {
        /** @type {?} */
        const classes = this.classList;
        classes['mc-dropdown-before'] = posX === 'before';
        classes['mc-dropdown-after'] = posX === 'after';
        classes['mc-dropdown-above'] = posY === 'above';
        classes['mc-dropdown-below'] = posY === 'below';
    }
    /**
     * Starts the enter animation.
     * @return {?}
     */
    startAnimation() {
        this.panelAnimationState = 'enter';
    }
    /**
     * Resets the panel animation to its initial state.
     * @return {?}
     */
    resetAnimation() {
        this.panelAnimationState = 'void';
    }
    /**
     * Callback that is invoked when the panel animation completes.
     * @param {?} event
     * @return {?}
     */
    onAnimationDone(event) {
        this.animationDone.next(event);
        this.isAnimating = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
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
                styles: [".mc-dropdown__item{align-items:center;border:1px solid transparent;box-sizing:border-box;display:flex;outline:none;padding:5px 15px;position:relative;text-align:left;white-space:nowrap;width:100%}.mc-dropdown__item:not([disabled]):not(.mc-disabled){cursor:pointer}.mc-dropdown__item .mc-dropdown__item-caption{margin-top:4px}.mc-dropdown__trigger{margin-left:auto;padding-left:16px}.mc-dropdown__panel{border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-style:solid;border-width:1px;margin-top:-1px;min-width:100%;overflow:auto;padding:4px 0}.mc-dropdown__content h1,.mc-dropdown__content h2,.mc-dropdown__content h3,.mc-dropdown__content h4,.mc-dropdown__content h5{margin:0;padding:8px 16px 4px}"]
            }] }
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
    closeOnOutsideClick: [{ type: Input }],
    panelClass: [{ type: Input, args: ['class',] }],
    backdropClass: [{ type: Input }],
    templateRef: [{ type: ViewChild, args: [TemplateRef, { static: false },] }],
    items: [{ type: ContentChildren, args: [McDropdownItem,] }],
    lazyContent: [{ type: ContentChild, args: [McDropdownContent, { static: false },] }],
    closed: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._closeOnOutsideClick;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._xPosition;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._yPosition;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._overlapTriggerX;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._overlapTriggerY;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._hasBackdrop;
    /**
     * Config object to be passed into the dropdown's ngClass
     * @type {?}
     */
    McDropdown.prototype.classList;
    /**
     * Current state of the panel animation.
     * @type {?}
     */
    McDropdown.prototype.panelAnimationState;
    /**
     * Emits whenever an animation on the dropdown completes.
     * @type {?}
     */
    McDropdown.prototype.animationDone;
    /**
     * Whether the dropdown is animating.
     * @type {?}
     */
    McDropdown.prototype.isAnimating;
    /**
     * Parent dropdown of the current dropdown panel.
     * @type {?}
     */
    McDropdown.prototype.parent;
    /**
     * Layout direction of the dropdown.
     * @type {?}
     */
    McDropdown.prototype.direction;
    /**
     * Class to be added to the backdrop element.
     * @type {?}
     */
    McDropdown.prototype.backdropClass;
    /**
     * \@docs-private
     * @type {?}
     */
    McDropdown.prototype.templateRef;
    /**
     * List of the items inside of a dropdown.
     * @type {?}
     */
    McDropdown.prototype.items;
    /**
     * Dropdown content that will be rendered lazily.
     * \@docs-private
     * @type {?}
     */
    McDropdown.prototype.lazyContent;
    /**
     * Event emitted when the dropdown is closed.
     * @type {?}
     */
    McDropdown.prototype.closed;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype.previousPanelClass;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype.keyManager;
    /**
     * Dropdown items inside the current dropdown.
     * @type {?}
     * @private
     */
    McDropdown.prototype.itemsArray;
    /**
     * Emits whenever the amount of dropdown items changes.
     * @type {?}
     * @private
     */
    McDropdown.prototype.itemChanges;
    /**
     * Subscription to tab events on the dropdown panel
     * @type {?}
     * @private
     */
    McDropdown.prototype.tabSubscription;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    McDropdown.prototype._defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vIiwic291cmNlcyI6WyJkcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFFcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakcsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBTXRFLDhD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QUFvQixDQUFDLFdBQVc7aUJBQ25DO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO2lCQUMxRDs7YUFDSjs7OztZQXBGRyxVQUFVO1lBS1YsTUFBTTs0Q0EyT0QsTUFBTSxTQUFDLDJCQUEyQjs7O3dCQXhKdEMsS0FBSzt3QkFjTCxLQUFLOzhCQWNMLEtBQUs7OEJBVUwsS0FBSzswQkFVTCxLQUFLO2tDQVVMLEtBQUs7eUJBYUwsS0FBSyxTQUFDLE9BQU87NEJBNkNiLEtBQUs7MEJBR0wsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7b0JBS3hDLGVBQWUsU0FBQyxjQUFjOzBCQU05QixZQUFZLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3FCQUdqRCxNQUFNOzs7Ozs7O0lBdEVQLDBDQUE2Rjs7Ozs7SUE0QjdGLGdDQUF1RTs7Ozs7SUFDdkUsZ0NBQXVFOzs7OztJQUN2RSxzQ0FBeUU7Ozs7O0lBQ3pFLHNDQUF5RTs7Ozs7SUFDekUsa0NBQTZFOzs7OztJQUc3RSwrQkFBMkM7Ozs7O0lBRzNDLHlDQUErQzs7Ozs7SUFHL0MsbUNBQThDOzs7OztJQUc5QyxpQ0FBcUI7Ozs7O0lBR3JCLDRCQUFvQzs7Ozs7SUFHcEMsK0JBQXFCOzs7OztJQUdyQixtQ0FBb0U7Ozs7O0lBR3BFLGlDQUF5RTs7Ozs7SUFLekUsMkJBQWtFOzs7Ozs7SUFNbEUsaUNBQW1GOzs7OztJQUduRiw0QkFDMkQ7Ozs7O0lBRTNELHdDQUFtQzs7Ozs7SUFFbkMsZ0NBQW9EOzs7Ozs7SUFHcEQsZ0NBQTBDOzs7Ozs7SUFHMUMsaUNBQXNEOzs7Ozs7SUFHdEQscUNBQTZDOzs7OztJQUd6QyxpQ0FBNEM7Ozs7O0lBQzVDLDZCQUF1Qjs7Ozs7SUFDdkIscUNBQXNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBFU0NBUEUsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBET1dOX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWNEcm9wZG93bkFuaW1hdGlvbnMgfSBmcm9tICcuL2Ryb3Bkb3duLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkNvbnRlbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbnRlbnQnO1xuaW1wb3J0IHsgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCwgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tZXJyb3JzJztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtJztcbmltcG9ydCB7IE1DX0RST1BET1dOX1BBTkVMLCBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLXBhbmVsJztcbmltcG9ydCB7IERyb3Bkb3duUG9zaXRpb25YLCBEcm9wZG93blBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tcG9zaXRpb25zJztcblxuXG4vKiogRGVmYXVsdCBgbWMtZHJvcGRvd25gIG9wdGlvbnMgdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbi4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMge1xuICAgIC8qKiBUaGUgeC1heGlzIHBvc2l0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICB4UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YO1xuXG4gICAgLyoqIFRoZSB5LWF4aXMgcG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duLiAqL1xuICAgIHlQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgdGhlIGRyb3Bkb3duIHRyaWdnZXIgaG9yaXpvbnRhbGx5LiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCB0aGUgZHJvcGRvd24gdHJpZ2dlciB2ZXJ0aWNhbGx5LiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbjtcblxuICAgIC8qKiBDbGFzcyB0byBiZSBhcHBsaWVkIHRvIHRoZSBkcm9wZG93bidzIGJhY2tkcm9wLiAqL1xuICAgIGJhY2tkcm9wQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBoYXNCYWNrZHJvcD86IGJvb2xlYW47XG5cbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrPzogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIGBtYy1kcm9wZG93bmAuICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48TWNEcm9wZG93bkRlZmF1bHRPcHRpb25zPignbWMtZHJvcGRvd24tZGVmYXVsdC1vcHRpb25zJywge1xuICAgICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICAgIGZhY3Rvcnk6IE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZXG4gICAgfSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlNfRkFDVE9SWSgpOiBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICAgIG92ZXJsYXBUcmlnZ2VyWDogdHJ1ZSxcbiAgICAgICAgb3ZlcmxhcFRyaWdnZXJZOiBmYWxzZSxcbiAgICAgICAgeFBvc2l0aW9uOiAnYWZ0ZXInLFxuICAgICAgICB5UG9zaXRpb246ICdiZWxvdycsXG4gICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCdcbiAgICB9O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWRyb3Bkb3duJyxcbiAgICBleHBvcnRBczogJ21jRHJvcGRvd24nLFxuICAgIHRlbXBsYXRlVXJsOiAnZHJvcGRvd24uaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2Ryb3Bkb3duLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgbWNEcm9wZG93bkFuaW1hdGlvbnMudHJhbnNmb3JtRHJvcGRvd24sXG4gICAgICAgIG1jRHJvcGRvd25BbmltYXRpb25zLmZhZGVJbkl0ZW1zXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNQ19EUk9QRE9XTl9QQU5FTCwgdXNlRXhpc3Rpbmc6IE1jRHJvcGRvd24gfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNEcm9wZG93biBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE1jRHJvcGRvd25QYW5lbDxNY0Ryb3Bkb3duSXRlbT4sIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24gaW4gdGhlIFggYXhpcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB4UG9zaXRpb24oKTogRHJvcGRvd25Qb3NpdGlvblgge1xuICAgICAgICByZXR1cm4gdGhpcy5feFBvc2l0aW9uO1xuICAgIH1cblxuICAgIHNldCB4UG9zaXRpb24odmFsdWU6IERyb3Bkb3duUG9zaXRpb25YKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJ2JlZm9yZScgJiYgdmFsdWUgIT09ICdhZnRlcicpIHtcbiAgICAgICAgICAgIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblgoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl94UG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGluIHRoZSBZIGF4aXMuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgeVBvc2l0aW9uKCk6IERyb3Bkb3duUG9zaXRpb25ZIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3lQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgeVBvc2l0aW9uKHZhbHVlOiBEcm9wZG93blBvc2l0aW9uWSkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICdhYm92ZScgJiYgdmFsdWUgIT09ICdiZWxvdycpIHtcbiAgICAgICAgICAgIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl95UG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgaXRzIHRyaWdnZXIgdmVydGljYWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBvdmVybGFwVHJpZ2dlclkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdmVybGFwVHJpZ2dlclk7XG4gICAgfVxuXG4gICAgc2V0IG92ZXJsYXBUcmlnZ2VyWSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9vdmVybGFwVHJpZ2dlclkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCBpdHMgdHJpZ2dlciBob3Jpem9udGFsbHkuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgb3ZlcmxhcFRyaWdnZXJYKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3ZlcmxhcFRyaWdnZXJYO1xuICAgIH1cblxuICAgIHNldCBvdmVybGFwVHJpZ2dlclgodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fb3ZlcmxhcFRyaWdnZXJYID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaGFzIGEgYmFja2Ryb3AuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgaGFzQmFja2Ryb3AoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNCYWNrZHJvcDtcbiAgICB9XG5cbiAgICBzZXQgaGFzQmFja2Ryb3AodmFsdWU6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5faGFzQmFja2Ryb3AgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBDbG9zZSBtZW51IHdoZW4gYW4gb3V0c2lkZSBjbGljayBpcyBkZXRlY3RlZCAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNsb3NlT25PdXRzaWRlQ2xpY2soKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl9jbG9zZU9uT3V0c2lkZUNsaWNrOyB9XG4gICAgc2V0IGNsb3NlT25PdXRzaWRlQ2xpY2sodmFsdWU6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fY2xvc2VPbk91dHNpZGVDbGljayA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgX2Nsb3NlT25PdXRzaWRlQ2xpY2s6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5jbG9zZU9uT3V0c2lkZUNsaWNrO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgdGFrZXMgY2xhc3NlcyBzZXQgb24gdGhlIGhvc3QgbWMtZHJvcGRvd24gZWxlbWVudCBhbmQgYXBwbGllcyB0aGVtIG9uIHRoZVxuICAgICAqIGRyb3Bkb3duIHRlbXBsYXRlIHRoYXQgZGlzcGxheXMgaW4gdGhlIG92ZXJsYXkgY29udGFpbmVyLiAgT3RoZXJ3aXNlLCBpdCdzIGRpZmZpY3VsdFxuICAgICAqIHRvIHN0eWxlIHRoZSBjb250YWluaW5nIGRyb3Bkb3duIGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSBjbGFzc2VzIGxpc3Qgb2YgY2xhc3MgbmFtZXNcbiAgICAgKi9cbiAgICBASW5wdXQoJ2NsYXNzJylcbiAgICBzZXQgcGFuZWxDbGFzcyhjbGFzc2VzOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNQYW5lbENsYXNzID0gdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3M7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzUGFuZWxDbGFzcyAmJiBwcmV2aW91c1BhbmVsQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91c1BhbmVsQ2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0W2NsYXNzTmFtZV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3MgPSBjbGFzc2VzO1xuXG4gICAgICAgIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdFtjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfeFBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWCA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLnhQb3NpdGlvbjtcbiAgICBwcml2YXRlIF95UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25ZID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMueVBvc2l0aW9uO1xuICAgIHByaXZhdGUgX292ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbiA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLm92ZXJsYXBUcmlnZ2VyWDtcbiAgICBwcml2YXRlIF9vdmVybGFwVHJpZ2dlclk6IGJvb2xlYW4gPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5vdmVybGFwVHJpZ2dlclk7XG4gICAgcHJpdmF0ZSBfaGFzQmFja2Ryb3A6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5oYXNCYWNrZHJvcDtcblxuICAgIC8qKiBDb25maWcgb2JqZWN0IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBkcm9wZG93bidzIG5nQ2xhc3MgKi9cbiAgICBjbGFzc0xpc3Q6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbiAgICAvKiogQ3VycmVudCBzdGF0ZSBvZiB0aGUgcGFuZWwgYW5pbWF0aW9uLiAqL1xuICAgIHBhbmVsQW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgPSAndm9pZCc7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgYW4gYW5pbWF0aW9uIG9uIHRoZSBkcm9wZG93biBjb21wbGV0ZXMuICovXG4gICAgYW5pbWF0aW9uRG9uZSA9IG5ldyBTdWJqZWN0PEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIGFuaW1hdGluZy4gKi9cbiAgICBpc0FuaW1hdGluZzogYm9vbGVhbjtcblxuICAgIC8qKiBQYXJlbnQgZHJvcGRvd24gb2YgdGhlIGN1cnJlbnQgZHJvcGRvd24gcGFuZWwuICovXG4gICAgcGFyZW50OiBNY0Ryb3Bkb3duUGFuZWwgfCB1bmRlZmluZWQ7XG5cbiAgICAvKiogTGF5b3V0IGRpcmVjdGlvbiBvZiB0aGUgZHJvcGRvd24uICovXG4gICAgZGlyZWN0aW9uOiBEaXJlY3Rpb247XG5cbiAgICAvKiogQ2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIGJhY2tkcm9wIGVsZW1lbnQuICovXG4gICAgQElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMuYmFja2Ryb3BDbGFzcztcblxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IGZhbHNlIH0pIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiB0aGUgaXRlbXMgaW5zaWRlIG9mIGEgZHJvcGRvd24uXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0Ryb3Bkb3duSXRlbSkgaXRlbXM6IFF1ZXJ5TGlzdDxNY0Ryb3Bkb3duSXRlbT47XG5cbiAgICAvKipcbiAgICAgKiBEcm9wZG93biBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93bkNvbnRlbnQsIHsgc3RhdGljOiBmYWxzZSB9KSBsYXp5Q29udGVudDogTWNEcm9wZG93bkNvbnRlbnQ7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBjbG9zZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjx2b2lkIHwgJ2NsaWNrJyB8ICdrZXlkb3duJyB8ICd0YWInPigpO1xuXG4gICAgcHJpdmF0ZSBwcmV2aW91c1BhbmVsQ2xhc3M6IHN0cmluZztcblxuICAgIHByaXZhdGUga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE1jRHJvcGRvd25JdGVtPjtcblxuICAgIC8qKiBEcm9wZG93biBpdGVtcyBpbnNpZGUgdGhlIGN1cnJlbnQgZHJvcGRvd24uICovXG4gICAgcHJpdmF0ZSBpdGVtc0FycmF5OiBNY0Ryb3Bkb3duSXRlbVtdID0gW107XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGFtb3VudCBvZiBkcm9wZG93biBpdGVtcyBjaGFuZ2VzLiAqL1xuICAgIHByaXZhdGUgaXRlbUNoYW5nZXMgPSBuZXcgU3ViamVjdDxNY0Ryb3Bkb3duSXRlbVtdPigpO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0YWIgZXZlbnRzIG9uIHRoZSBkcm9wZG93biBwYW5lbCAqL1xuICAgIHByaXZhdGUgdGFiU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyPE1jRHJvcGRvd25JdGVtPih0aGlzLml0ZW1zKVxuICAgICAgICAgICAgLndpdGhXcmFwKClcbiAgICAgICAgICAgIC53aXRoVHlwZUFoZWFkKCk7XG5cbiAgICAgICAgdGhpcy50YWJTdWJzY3JpcHRpb24gPSB0aGlzLmtleU1hbmFnZXIudGFiT3V0LnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlZC5lbWl0KCd0YWInKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGFiU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBob3ZlcmVkIGRyb3Bkb3duIGl0ZW0gY2hhbmdlcy4gKi9cbiAgICBob3ZlcmVkKCk6IE9ic2VydmFibGU8TWNEcm9wZG93bkl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCh0aGlzLml0ZW1zQXJyYXkpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKChpdGVtcykgPT4gbWVyZ2UoLi4uaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmhvdmVyZWQpKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIGEga2V5Ym9hcmQgZXZlbnQgZnJvbSB0aGUgZHJvcGRvd24sIGRlbGVnYXRpbmcgdG8gdGhlIGFwcHJvcHJpYXRlIGFjdGlvbi4gKi9cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5kaXJlY3Rpb24gPT09ICdsdHInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgna2V5ZG93bicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XIHx8IGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdrZXlib2FyZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2NsaWNrJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGRyb3Bkb3duLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gQWN0aW9uIGZyb20gd2hpY2ggdGhlIGZvY3VzIG9yaWdpbmF0ZWQuIFVzZWQgdG8gc2V0IHRoZSBjb3JyZWN0IHN0eWxpbmcuXG4gICAgICovXG4gICAgZm9jdXNGaXJzdEl0ZW0ob3JpZ2luOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJyk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIHRoZSBjb250ZW50IGlzIHJlbmRlcmVkIGxhemlseSwgaXQgdGFrZXMgYSBiaXQgYmVmb3JlIHRoZSBpdGVtcyBhcmUgaW5zaWRlIHRoZSBET00uXG4gICAgICAgIGlmICh0aGlzLmxhenlDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKG9yaWdpbikuc2V0Rmlyc3RJdGVtQWN0aXZlKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKG9yaWdpbikuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGFjdGl2ZSBpdGVtIGluIHRoZSBkcm9wZG93bi4gVGhpcyBpcyB1c2VkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCwgYWxsb3dpbmdcbiAgICAgKiB0aGUgdXNlciB0byBzdGFydCBmcm9tIHRoZSBmaXJzdCBvcHRpb24gd2hlbiBwcmVzc2luZyB0aGUgZG93biBhcnJvdy5cbiAgICAgKi9cbiAgICByZXNldEFjdGl2ZUl0ZW0oKSB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBkcm9wZG93biBpdGVtIHdpdGggdGhlIGRyb3Bkb3duLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW06IE1jRHJvcGRvd25JdGVtKSB7XG4gICAgICAgIC8vIFdlIHJlZ2lzdGVyIHRoZSBpdGVtcyB0aHJvdWdoIHRoaXMgbWV0aG9kLCByYXRoZXIgdGhhbiBwaWNraW5nIHRoZW0gdXAgdGhyb3VnaFxuICAgICAgICAvLyBgQ29udGVudENoaWxkcmVuYCwgYmVjYXVzZSB3ZSBuZWVkIHRoZSBpdGVtcyB0byBiZSBwaWNrZWQgdXAgYnkgdGhlaXIgY2xvc2VzdFxuICAgICAgICAvLyBgbWMtZHJvcGRvd25gIGFuY2VzdG9yLiBJZiB3ZSB1c2VkIGBAQ29udGVudENoaWxkcmVuKE1jRHJvcGRvd25JdGVtLCB7ZGVzY2VuZGFudHM6IHRydWV9KWAsXG4gICAgICAgIC8vIGFsbCBkZXNjZW5kYW50IGl0ZW1zIHdpbGwgYmxlZWQgaW50byB0aGUgdG9wLWxldmVsIGRyb3Bkb3duIGluIHRoZSBjYXNlIHdoZXJlIHRoZSBjb25zdW1lclxuICAgICAgICAvLyBoYXMgYG1jLWRyb3Bkb3duYCBpbnN0YW5jZXMgbmVzdGVkIGluc2lkZSBlYWNoIG90aGVyLlxuICAgICAgICBpZiAodGhpcy5pdGVtc0FycmF5LmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNoYW5nZXMubmV4dCh0aGlzLml0ZW1zQXJyYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGRyb3Bkb3duLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZW1vdmVJdGVtKGl0ZW06IE1jRHJvcGRvd25JdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtc0FycmF5LmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbXNBcnJheS5pbmRleE9mKGl0ZW0pID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2hhbmdlcy5uZXh0KHRoaXMuaXRlbXNBcnJheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGNsYXNzZXMgdG8gdGhlIGRyb3Bkb3duIHBhbmVsIGJhc2VkIG9uIGl0cyBwb3NpdGlvbi4gQ2FuIGJlIHVzZWQgYnlcbiAgICAgKiBjb25zdW1lcnMgdG8gYWRkIHNwZWNpZmljIHN0eWxpbmcgYmFzZWQgb24gdGhlIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSBwb3NYIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBhbG9uZyB0aGUgeCBheGlzLlxuICAgICAqIEBwYXJhbSBwb3NZIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBhbG9uZyB0aGUgeSBheGlzLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbkNsYXNzZXMocG9zWDogRHJvcGRvd25Qb3NpdGlvblggPSB0aGlzLnhQb3NpdGlvbiwgcG9zWTogRHJvcGRvd25Qb3NpdGlvblkgPSB0aGlzLnlQb3NpdGlvbikge1xuICAgICAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5jbGFzc0xpc3Q7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWJlZm9yZSddID0gcG9zWCA9PT0gJ2JlZm9yZSc7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWFmdGVyJ10gPSBwb3NYID09PSAnYWZ0ZXInO1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1hYm92ZSddID0gcG9zWSA9PT0gJ2Fib3ZlJztcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYmVsb3cnXSA9IHBvc1kgPT09ICdiZWxvdyc7XG4gICAgfVxuXG4gICAgLyoqIFN0YXJ0cyB0aGUgZW50ZXIgYW5pbWF0aW9uLiAqL1xuICAgIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBhbmVsQW5pbWF0aW9uU3RhdGUgPSAnZW50ZXInO1xuICAgIH1cblxuICAgIC8qKiBSZXNldHMgdGhlIHBhbmVsIGFuaW1hdGlvbiB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gKi9cbiAgICByZXNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5wYW5lbEFuaW1hdGlvblN0YXRlID0gJ3ZvaWQnO1xuICAgIH1cblxuICAgIC8qKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgcGFuZWwgYW5pbWF0aW9uIGNvbXBsZXRlcy4gKi9cbiAgICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRG9uZS5uZXh0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0aGUgY29udGVudCBlbGVtZW50IHRvIHRoZSB0b3AgYXMgc29vbiBhcyB0aGUgYW5pbWF0aW9uIHN0YXJ0cy4gVGhpcyBpcyBuZWNlc3NhcnksXG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3QgaXRlbSB3aGlsZSBpdCdzIHN0aWxsIGJlaW5nIGFuaW1hdGVkLCB3aGljaCBjYW4gdGhyb3dcbiAgICAgICAgLy8gdGhlIGJyb3dzZXIgb2ZmIHdoZW4gaXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIHBvc2l0aW9uLiBBbHRlcm5hdGl2ZWx5IHdlIGNhbiBtb3ZlIGZvY3VzXG4gICAgICAgIC8vIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBkb25lLCBob3dldmVyIG1vdmluZyBmb2N1cyBhc3luY2hyb25vdXNseSB3aWxsIGludGVycnVwdCBzY3JlZW5cbiAgICAgICAgLy8gcmVhZGVycyB3aGljaCBhcmUgaW4gdGhlIHByb2Nlc3Mgb2YgcmVhZGluZyBvdXQgdGhlIGRyb3Bkb3duIGFscmVhZHkuIFdlIHRha2UgdGhlIGBlbGVtZW50YFxuICAgICAgICAvLyBmcm9tIHRoZSBgZXZlbnRgIHNpbmNlIHdlIGNhbid0IHVzZSBhIGBWaWV3Q2hpbGRgIHRvIGFjY2VzcyB0aGUgcGFuZS5cbiAgICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicgJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgZXZlbnQuZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
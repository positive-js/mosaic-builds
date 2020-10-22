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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vIiwic291cmNlcyI6WyJkcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFFcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakcsT0FBTyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBTXRFLDhD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QU87NEJBNkNiLEtBQUs7MEJBR0wsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7b0JBS3hDLGVBQWUsU0FBQyxjQUFjOzBCQU05QixZQUFZLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3FCQUdqRCxNQUFNOzs7Ozs7O0lBMUNQLGdDQUF1RTs7Ozs7SUFDdkUsZ0NBQXVFOzs7OztJQUN2RSxzQ0FBeUU7Ozs7O0lBQ3pFLHNDQUF5RTs7Ozs7SUFDekUsa0NBQTZFOzs7OztJQUc3RSwrQkFBMkM7Ozs7O0lBRzNDLHlDQUErQzs7Ozs7SUFHL0MsbUNBQThDOzs7OztJQUc5QyxpQ0FBcUI7Ozs7O0lBR3JCLDRCQUFvQzs7Ozs7SUFHcEMsK0JBQXFCOzs7OztJQUdyQixtQ0FBb0U7Ozs7O0lBR3BFLGlDQUF5RTs7Ozs7SUFLekUsMkJBQWtFOzs7Ozs7SUFNbEUsaUNBQW1GOzs7OztJQUduRiw0QkFDMkQ7Ozs7O0lBRTNELHdDQUFtQzs7Ozs7SUFFbkMsZ0NBQW9EOzs7Ozs7SUFHcEQsZ0NBQTBDOzs7Ozs7SUFHMUMsaUNBQXNEOzs7Ozs7SUFHdEQscUNBQTZDOzs7OztJQUd6QyxpQ0FBNEM7Ozs7O0lBQzVDLDZCQUF1Qjs7Ozs7SUFDdkIscUNBQXNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBFU0NBUEUsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBET1dOX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWNEcm9wZG93bkFuaW1hdGlvbnMgfSBmcm9tICcuL2Ryb3Bkb3duLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkNvbnRlbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbnRlbnQnO1xuaW1wb3J0IHsgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCwgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tZXJyb3JzJztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtJztcbmltcG9ydCB7IE1DX0RST1BET1dOX1BBTkVMLCBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLXBhbmVsJztcbmltcG9ydCB7IERyb3Bkb3duUG9zaXRpb25YLCBEcm9wZG93blBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tcG9zaXRpb25zJztcblxuXG4vKiogRGVmYXVsdCBgbWMtZHJvcGRvd25gIG9wdGlvbnMgdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbi4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMge1xuICAgIC8qKiBUaGUgeC1heGlzIHBvc2l0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICB4UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YO1xuXG4gICAgLyoqIFRoZSB5LWF4aXMgcG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duLiAqL1xuICAgIHlQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgdGhlIGRyb3Bkb3duIHRyaWdnZXIgaG9yaXpvbnRhbGx5LiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCB0aGUgZHJvcGRvd24gdHJpZ2dlciB2ZXJ0aWNhbGx5LiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbjtcblxuICAgIC8qKiBDbGFzcyB0byBiZSBhcHBsaWVkIHRvIHRoZSBkcm9wZG93bidzIGJhY2tkcm9wLiAqL1xuICAgIGJhY2tkcm9wQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBoYXNCYWNrZHJvcD86IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBgbWMtZHJvcGRvd25gLiAqL1xuZXhwb3J0IGNvbnN0IE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OUyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPE1jRHJvcGRvd25EZWZhdWx0T3B0aW9ucz4oJ21jLWRyb3Bkb3duLWRlZmF1bHQtb3B0aW9ucycsIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlNfRkFDVE9SWVxuICAgIH0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TX0ZBQ1RPUlkoKTogTWNEcm9wZG93bkRlZmF1bHRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvdmVybGFwVHJpZ2dlclg6IHRydWUsXG4gICAgICAgIG92ZXJsYXBUcmlnZ2VyWTogZmFsc2UsXG4gICAgICAgIHhQb3NpdGlvbjogJ2FmdGVyJyxcbiAgICAgICAgeVBvc2l0aW9uOiAnYmVsb3cnLFxuICAgICAgICBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnXG4gICAgfTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kcm9wZG93bicsXG4gICAgZXhwb3J0QXM6ICdtY0Ryb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkcm9wZG93bi5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIG1jRHJvcGRvd25BbmltYXRpb25zLnRyYW5zZm9ybURyb3Bkb3duLFxuICAgICAgICBtY0Ryb3Bkb3duQW5pbWF0aW9ucy5mYWRlSW5JdGVtc1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTUNfRFJPUERPV05fUEFORUwsIHVzZUV4aXN0aW5nOiBNY0Ryb3Bkb3duIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBNY0Ryb3Bkb3duUGFuZWw8TWNEcm9wZG93bkl0ZW0+LCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGluIHRoZSBYIGF4aXMuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgeFBvc2l0aW9uKCk6IERyb3Bkb3duUG9zaXRpb25YIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3hQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgeFBvc2l0aW9uKHZhbHVlOiBEcm9wZG93blBvc2l0aW9uWCkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICdiZWZvcmUnICYmIHZhbHVlICE9PSAnYWZ0ZXInKSB7XG4gICAgICAgICAgICB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25YKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBpbiB0aGUgWSBheGlzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHlQb3NpdGlvbigpOiBEcm9wZG93blBvc2l0aW9uWSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95UG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0IHlQb3NpdGlvbih2YWx1ZTogRHJvcGRvd25Qb3NpdGlvblkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnYWJvdmUnICYmIHZhbHVlICE9PSAnYmVsb3cnKSB7XG4gICAgICAgICAgICB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25ZKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5feVBvc2l0aW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBvdmVybGFwIGl0cyB0cmlnZ2VyIHZlcnRpY2FsbHkuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgb3ZlcmxhcFRyaWdnZXJZKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3ZlcmxhcFRyaWdnZXJZO1xuICAgIH1cblxuICAgIHNldCBvdmVybGFwVHJpZ2dlclkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fb3ZlcmxhcFRyaWdnZXJZID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgaXRzIHRyaWdnZXIgaG9yaXpvbnRhbGx5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG92ZXJsYXBUcmlnZ2VyWCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJsYXBUcmlnZ2VyWDtcbiAgICB9XG5cbiAgICBzZXQgb3ZlcmxhcFRyaWdnZXJYKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXBUcmlnZ2VyWCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGhhcyBhIGJhY2tkcm9wLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhhc0JhY2tkcm9wKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzQmFja2Ryb3A7XG4gICAgfVxuXG4gICAgc2V0IGhhc0JhY2tkcm9wKHZhbHVlOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2hhc0JhY2tkcm9wID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCB0YWtlcyBjbGFzc2VzIHNldCBvbiB0aGUgaG9zdCBtYy1kcm9wZG93biBlbGVtZW50IGFuZCBhcHBsaWVzIHRoZW0gb24gdGhlXG4gICAgICogZHJvcGRvd24gdGVtcGxhdGUgdGhhdCBkaXNwbGF5cyBpbiB0aGUgb3ZlcmxheSBjb250YWluZXIuICBPdGhlcndpc2UsIGl0J3MgZGlmZmljdWx0XG4gICAgICogdG8gc3R5bGUgdGhlIGNvbnRhaW5pbmcgZHJvcGRvd24gZnJvbSBvdXRzaWRlIHRoZSBjb21wb25lbnQuXG4gICAgICogQHBhcmFtIGNsYXNzZXMgbGlzdCBvZiBjbGFzcyBuYW1lc1xuICAgICAqL1xuICAgIEBJbnB1dCgnY2xhc3MnKVxuICAgIHNldCBwYW5lbENsYXNzKGNsYXNzZXM6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1BhbmVsQ2xhc3MgPSB0aGlzLnByZXZpb3VzUGFuZWxDbGFzcztcblxuICAgICAgICBpZiAocHJldmlvdXNQYW5lbENsYXNzICYmIHByZXZpb3VzUGFuZWxDbGFzcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzUGFuZWxDbGFzcy5zcGxpdCgnICcpLmZvckVhY2goKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3RbY2xhc3NOYW1lXSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZpb3VzUGFuZWxDbGFzcyA9IGNsYXNzZXM7XG5cbiAgICAgICAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuc3BsaXQoJyAnKS5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0W2NsYXNzTmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF94UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMueFBvc2l0aW9uO1xuICAgIHByaXZhdGUgX3lQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblkgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy55UG9zaXRpb247XG4gICAgcHJpdmF0ZSBfb3ZlcmxhcFRyaWdnZXJYOiBib29sZWFuID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMub3ZlcmxhcFRyaWdnZXJYO1xuICAgIHByaXZhdGUgX292ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbiA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLm92ZXJsYXBUcmlnZ2VyWTtcbiAgICBwcml2YXRlIF9oYXNCYWNrZHJvcDogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLmhhc0JhY2tkcm9wO1xuXG4gICAgLyoqIENvbmZpZyBvYmplY3QgdG8gYmUgcGFzc2VkIGludG8gdGhlIGRyb3Bkb3duJ3MgbmdDbGFzcyAqL1xuICAgIGNsYXNzTGlzdDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuICAgIC8qKiBDdXJyZW50IHN0YXRlIG9mIHRoZSBwYW5lbCBhbmltYXRpb24uICovXG4gICAgcGFuZWxBbmltYXRpb25TdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyA9ICd2b2lkJztcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciBhbiBhbmltYXRpb24gb24gdGhlIGRyb3Bkb3duIGNvbXBsZXRlcy4gKi9cbiAgICBhbmltYXRpb25Eb25lID0gbmV3IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXMgYW5pbWF0aW5nLiAqL1xuICAgIGlzQW5pbWF0aW5nOiBib29sZWFuO1xuXG4gICAgLyoqIFBhcmVudCBkcm9wZG93biBvZiB0aGUgY3VycmVudCBkcm9wZG93biBwYW5lbC4gKi9cbiAgICBwYXJlbnQ6IE1jRHJvcGRvd25QYW5lbCB8IHVuZGVmaW5lZDtcblxuICAgIC8qKiBMYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcblxuICAgIC8qKiBDbGFzcyB0byBiZSBhZGRlZCB0byB0aGUgYmFja2Ryb3AgZWxlbWVudC4gKi9cbiAgICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5iYWNrZHJvcENsYXNzO1xuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogZmFsc2UgfSkgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHRoZSBpdGVtcyBpbnNpZGUgb2YgYSBkcm9wZG93bi5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE1jRHJvcGRvd25JdGVtKSBpdGVtczogUXVlcnlMaXN0PE1jRHJvcGRvd25JdGVtPjtcblxuICAgIC8qKlxuICAgICAqIERyb3Bkb3duIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHJlbmRlcmVkIGxhemlseS5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChNY0Ryb3Bkb3duQ29udGVudCwgeyBzdGF0aWM6IGZhbHNlIH0pIGxhenlDb250ZW50OiBNY0Ryb3Bkb3duQ29udGVudDtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIGNsb3NlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZCB8ICdjbGljaycgfCAna2V5ZG93bicgfCAndGFiJz4gPVxuICAgICAgICBuZXcgRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+KCk7XG5cbiAgICBwcml2YXRlIHByZXZpb3VzUGFuZWxDbGFzczogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBrZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8TWNEcm9wZG93bkl0ZW0+O1xuXG4gICAgLyoqIERyb3Bkb3duIGl0ZW1zIGluc2lkZSB0aGUgY3VycmVudCBkcm9wZG93bi4gKi9cbiAgICBwcml2YXRlIGl0ZW1zQXJyYXk6IE1jRHJvcGRvd25JdGVtW10gPSBbXTtcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgYW1vdW50IG9mIGRyb3Bkb3duIGl0ZW1zIGNoYW5nZXMuICovXG4gICAgcHJpdmF0ZSBpdGVtQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PE1jRHJvcGRvd25JdGVtW10+KCk7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIHRvIHRhYiBldmVudHMgb24gdGhlIGRyb3Bkb3duIHBhbmVsICovXG4gICAgcHJpdmF0ZSB0YWJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICBASW5qZWN0KE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbnM6IE1jRHJvcGRvd25EZWZhdWx0T3B0aW9ucykgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbkNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8TWNEcm9wZG93bkl0ZW0+KHRoaXMuaXRlbXMpXG4gICAgICAgICAgICAud2l0aFdyYXAoKVxuICAgICAgICAgICAgLndpdGhUeXBlQWhlYWQoKTtcblxuICAgICAgICB0aGlzLnRhYlN1YnNjcmlwdGlvbiA9IHRoaXMua2V5TWFuYWdlci50YWJPdXQuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VkLmVtaXQoJ3RhYicpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50YWJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jbG9zZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGhvdmVyZWQgZHJvcGRvd24gaXRlbSBjaGFuZ2VzLiAqL1xuICAgIGhvdmVyZWQoKTogT2JzZXJ2YWJsZTxNY0Ryb3Bkb3duSXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKHRoaXMuaXRlbXNBcnJheSksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGl0ZW1zKSA9PiBtZXJnZSguLi5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uaG92ZXJlZCkpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGUgYSBrZXlib2FyZCBldmVudCBmcm9tIHRoZSBkcm9wZG93biwgZGVsZWdhdGluZyB0byB0aGUgYXBwcm9wcmlhdGUgYWN0aW9uLiAqL1xuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBFU0NBUEU6XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgna2V5ZG93bicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ2x0cicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgna2V5ZG93bicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMuZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KCdrZXlkb3duJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cgfHwga2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4oJ2tleWJvYXJkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgnY2xpY2snKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1cyB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgZHJvcGRvd24uXG4gICAgICogQHBhcmFtIG9yaWdpbiBBY3Rpb24gZnJvbSB3aGljaCB0aGUgZm9jdXMgb3JpZ2luYXRlZC4gVXNlZCB0byBzZXQgdGhlIGNvcnJlY3Qgc3R5bGluZy5cbiAgICAgKi9cbiAgICBmb2N1c0ZpcnN0SXRlbShvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nKTogdm9pZCB7XG4gICAgICAgIC8vIFdoZW4gdGhlIGNvbnRlbnQgaXMgcmVuZGVyZWQgbGF6aWx5LCBpdCB0YWtlcyBhIGJpdCBiZWZvcmUgdGhlIGl0ZW1zIGFyZSBpbnNpZGUgdGhlIERPTS5cbiAgICAgICAgaWYgKHRoaXMubGF6eUNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4ob3JpZ2luKS5zZXRGaXJzdEl0ZW1BY3RpdmUoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rm9jdXNPcmlnaW4ob3JpZ2luKS5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgYWN0aXZlIGl0ZW0gaW4gdGhlIGRyb3Bkb3duLiBUaGlzIGlzIHVzZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkLCBhbGxvd2luZ1xuICAgICAqIHRoZSB1c2VyIHRvIHN0YXJ0IGZyb20gdGhlIGZpcnN0IG9wdGlvbiB3aGVuIHByZXNzaW5nIHRoZSBkb3duIGFycm93LlxuICAgICAqL1xuICAgIHJlc2V0QWN0aXZlSXRlbSgpIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGRyb3Bkb3duIGl0ZW0gd2l0aCB0aGUgZHJvcGRvd24uXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIGFkZEl0ZW0oaXRlbTogTWNEcm9wZG93bkl0ZW0pIHtcbiAgICAgICAgLy8gV2UgcmVnaXN0ZXIgdGhlIGl0ZW1zIHRocm91Z2ggdGhpcyBtZXRob2QsIHJhdGhlciB0aGFuIHBpY2tpbmcgdGhlbSB1cCB0aHJvdWdoXG4gICAgICAgIC8vIGBDb250ZW50Q2hpbGRyZW5gLCBiZWNhdXNlIHdlIG5lZWQgdGhlIGl0ZW1zIHRvIGJlIHBpY2tlZCB1cCBieSB0aGVpciBjbG9zZXN0XG4gICAgICAgIC8vIGBtYy1kcm9wZG93bmAgYW5jZXN0b3IuIElmIHdlIHVzZWQgYEBDb250ZW50Q2hpbGRyZW4oTWNEcm9wZG93bkl0ZW0sIHtkZXNjZW5kYW50czogdHJ1ZX0pYCxcbiAgICAgICAgLy8gYWxsIGRlc2NlbmRhbnQgaXRlbXMgd2lsbCBibGVlZCBpbnRvIHRoZSB0b3AtbGV2ZWwgZHJvcGRvd24gaW4gdGhlIGNhc2Ugd2hlcmUgdGhlIGNvbnN1bWVyXG4gICAgICAgIC8vIGhhcyBgbWMtZHJvcGRvd25gIGluc3RhbmNlcyBuZXN0ZWQgaW5zaWRlIGVhY2ggb3RoZXIuXG4gICAgICAgIGlmICh0aGlzLml0ZW1zQXJyYXkuaW5kZXhPZihpdGVtKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNBcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2hhbmdlcy5uZXh0KHRoaXMuaXRlbXNBcnJheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgZHJvcGRvd24uXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlbW92ZUl0ZW0oaXRlbTogTWNEcm9wZG93bkl0ZW0pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zQXJyYXkuaW5kZXhPZihpdGVtKTtcblxuICAgICAgICBpZiAodGhpcy5pdGVtc0FycmF5LmluZGV4T2YoaXRlbSkgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0FycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1DaGFuZ2VzLm5leHQodGhpcy5pdGVtc0FycmF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgY2xhc3NlcyB0byB0aGUgZHJvcGRvd24gcGFuZWwgYmFzZWQgb24gaXRzIHBvc2l0aW9uLiBDYW4gYmUgdXNlZCBieVxuICAgICAqIGNvbnN1bWVycyB0byBhZGQgc3BlY2lmaWMgc3R5bGluZyBiYXNlZCBvbiB0aGUgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHBvc1ggUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGFsb25nIHRoZSB4IGF4aXMuXG4gICAgICogQHBhcmFtIHBvc1kgUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGFsb25nIHRoZSB5IGF4aXMuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFBvc2l0aW9uQ2xhc3Nlcyhwb3NYOiBEcm9wZG93blBvc2l0aW9uWCA9IHRoaXMueFBvc2l0aW9uLCBwb3NZOiBEcm9wZG93blBvc2l0aW9uWSA9IHRoaXMueVBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB0aGlzLmNsYXNzTGlzdDtcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYmVmb3JlJ10gPSBwb3NYID09PSAnYmVmb3JlJztcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYWZ0ZXInXSA9IHBvc1ggPT09ICdhZnRlcic7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWFib3ZlJ10gPSBwb3NZID09PSAnYWJvdmUnO1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1iZWxvdyddID0gcG9zWSA9PT0gJ2JlbG93JztcbiAgICB9XG5cbiAgICAvKiogU3RhcnRzIHRoZSBlbnRlciBhbmltYXRpb24uICovXG4gICAgc3RhcnRBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMucGFuZWxBbmltYXRpb25TdGF0ZSA9ICdlbnRlcic7XG4gICAgfVxuXG4gICAgLyoqIFJlc2V0cyB0aGUgcGFuZWwgYW5pbWF0aW9uIHRvIGl0cyBpbml0aWFsIHN0YXRlLiAqL1xuICAgIHJlc2V0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBhbmVsQW5pbWF0aW9uU3RhdGUgPSAndm9pZCc7XG4gICAgfVxuXG4gICAgLyoqIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSBwYW5lbCBhbmltYXRpb24gY29tcGxldGVzLiAqL1xuICAgIG9uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25Eb25lLm5leHQoZXZlbnQpO1xuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gU2Nyb2xsIHRoZSBjb250ZW50IGVsZW1lbnQgdG8gdGhlIHRvcCBhcyBzb29uIGFzIHRoZSBhbmltYXRpb24gc3RhcnRzLiBUaGlzIGlzIG5lY2Vzc2FyeSxcbiAgICAgICAgLy8gYmVjYXVzZSB3ZSBtb3ZlIGZvY3VzIHRvIHRoZSBmaXJzdCBpdGVtIHdoaWxlIGl0J3Mgc3RpbGwgYmVpbmcgYW5pbWF0ZWQsIHdoaWNoIGNhbiB0aHJvd1xuICAgICAgICAvLyB0aGUgYnJvd3NlciBvZmYgd2hlbiBpdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgcG9zaXRpb24uIEFsdGVybmF0aXZlbHkgd2UgY2FuIG1vdmUgZm9jdXNcbiAgICAgICAgLy8gd2hlbiB0aGUgYW5pbWF0aW9uIGlzIGRvbmUsIGhvd2V2ZXIgbW92aW5nIGZvY3VzIGFzeW5jaHJvbm91c2x5IHdpbGwgaW50ZXJydXB0IHNjcmVlblxuICAgICAgICAvLyByZWFkZXJzIHdoaWNoIGFyZSBpbiB0aGUgcHJvY2VzcyBvZiByZWFkaW5nIG91dCB0aGUgZHJvcGRvd24gYWxyZWFkeS4gV2UgdGFrZSB0aGUgYGVsZW1lbnRgXG4gICAgICAgIC8vIGZyb20gdGhlIGBldmVudGAgc2luY2Ugd2UgY2FuJ3QgdXNlIGEgYFZpZXdDaGlsZGAgdG8gYWNjZXNzIHRoZSBwYW5lLlxuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJyAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBldmVudC5lbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
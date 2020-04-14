/**
 * @fileoverview added by tsickle
 * Generated from: dropdown.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-dropdown__item{display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:0;padding:5px 15px;text-align:left;white-space:nowrap}.mc-dropdown__item:not([disabled]):not(.mc-disabled){cursor:pointer}.mc-dropdown__item .mc-dropdown__item-caption{margin-top:4px}.mc-dropdown__trigger{margin-left:auto;padding-left:16px}.mc-dropdown__panel{min-width:100%;overflow:auto;margin-top:-1px;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-dropdown__content h1,.mc-dropdown__content h2,.mc-dropdown__content h3,.mc-dropdown__content h4,.mc-dropdown__content h5{padding:8px 16px 4px;margin:0}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBRXBCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLGtCQUFrQixDQUFDOzs7OztBQU10RSw4Q0FrQkM7Ozs7OztJQWhC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OzBCQUdMLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO29CQUt4QyxlQUFlLFNBQUMsY0FBYzswQkFNOUIsWUFBWSxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtxQkFHakQsTUFBTTs7Ozs7OztJQTFDUCxnQ0FBdUU7Ozs7O0lBQ3ZFLGdDQUF1RTs7Ozs7SUFDdkUsc0NBQXlFOzs7OztJQUN6RSxzQ0FBeUU7Ozs7O0lBQ3pFLGtDQUE2RTs7Ozs7SUFHN0UsK0JBQTJDOzs7OztJQUczQyx5Q0FBK0M7Ozs7O0lBRy9DLG1DQUE4Qzs7Ozs7SUFHOUMsaUNBQXFCOzs7OztJQUdyQiw0QkFBb0M7Ozs7O0lBR3BDLCtCQUFxQjs7Ozs7SUFHckIsbUNBQW9FOzs7OztJQUdwRSxpQ0FBeUU7Ozs7O0lBS3pFLDJCQUFrRTs7Ozs7O0lBTWxFLGlDQUFtRjs7Ozs7SUFHbkYsNEJBQzJEOzs7OztJQUUzRCx3Q0FBbUM7Ozs7O0lBRW5DLGdDQUFvRDs7Ozs7O0lBR3BELGdDQUEwQzs7Ozs7O0lBRzFDLGlDQUFzRDs7Ozs7O0lBR3RELHFDQUE2Qzs7Ozs7SUFHekMsaUNBQTRDOzs7OztJQUM1Qyw2QkFBdUI7Ozs7O0lBQ3ZCLHFDQUFzRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgRVNDQVBFLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgRE9XTl9BUlJPVywgVVBfQVJST1cgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jRHJvcGRvd25BbmltYXRpb25zIH0gZnJvbSAnLi9kcm9wZG93bi1hbmltYXRpb25zJztcbmltcG9ydCB7IE1jRHJvcGRvd25Db250ZW50IH0gZnJvbSAnLi9kcm9wZG93bi1jb250ZW50JztcbmltcG9ydCB7IHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblgsIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblkgfSBmcm9tICcuL2Ryb3Bkb3duLWVycm9ycyc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duSXRlbSB9IGZyb20gJy4vZHJvcGRvd24taXRlbSc7XG5pbXBvcnQgeyBNQ19EUk9QRE9XTl9QQU5FTCwgTWNEcm9wZG93blBhbmVsIH0gZnJvbSAnLi9kcm9wZG93bi1wYW5lbCc7XG5pbXBvcnQgeyBEcm9wZG93blBvc2l0aW9uWCwgRHJvcGRvd25Qb3NpdGlvblkgfSBmcm9tICcuL2Ryb3Bkb3duLXBvc2l0aW9ucyc7XG5cblxuLyoqIERlZmF1bHQgYG1jLWRyb3Bkb3duYCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNEcm9wZG93bkRlZmF1bHRPcHRpb25zIHtcbiAgICAvKiogVGhlIHgtYXhpcyBwb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24uICovXG4gICAgeFBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWDtcblxuICAgIC8qKiBUaGUgeS1heGlzIHBvc2l0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICB5UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25ZO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBvdmVybGFwIHRoZSBkcm9wZG93biB0cmlnZ2VyIGhvcml6b250YWxseS4gKi9cbiAgICBvdmVybGFwVHJpZ2dlclg6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgdGhlIGRyb3Bkb3duIHRyaWdnZXIgdmVydGljYWxseS4gKi9cbiAgICBvdmVybGFwVHJpZ2dlclk6IGJvb2xlYW47XG5cbiAgICAvKiogQ2xhc3MgdG8gYmUgYXBwbGllZCB0byB0aGUgZHJvcGRvd24ncyBiYWNrZHJvcC4gKi9cbiAgICBiYWNrZHJvcENsYXNzOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaGFzIGEgYmFja2Ryb3AuICovXG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgYG1jLWRyb3Bkb3duYC4gKi9cbmV4cG9ydCBjb25zdCBNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnM+KCdtYy1kcm9wZG93bi1kZWZhdWx0LW9wdGlvbnMnLCB7XG4gICAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICAgICAgZmFjdG9yeTogTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TX0ZBQ1RPUllcbiAgICB9KTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1jRHJvcGRvd25EZWZhdWx0T3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3ZlcmxhcFRyaWdnZXJYOiB0cnVlLFxuICAgICAgICBvdmVybGFwVHJpZ2dlclk6IGZhbHNlLFxuICAgICAgICB4UG9zaXRpb246ICdhZnRlcicsXG4gICAgICAgIHlQb3NpdGlvbjogJ2JlbG93JyxcbiAgICAgICAgYmFja2Ryb3BDbGFzczogJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJ1xuICAgIH07XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZHJvcGRvd24nLFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93bicsXG4gICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHJvcGRvd24uc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBtY0Ryb3Bkb3duQW5pbWF0aW9ucy50cmFuc2Zvcm1Ecm9wZG93bixcbiAgICAgICAgbWNEcm9wZG93bkFuaW1hdGlvbnMuZmFkZUluSXRlbXNcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1DX0RST1BET1dOX1BBTkVMLCB1c2VFeGlzdGluZzogTWNEcm9wZG93biB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgTWNEcm9wZG93blBhbmVsPE1jRHJvcGRvd25JdGVtPiwgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBpbiB0aGUgWCBheGlzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHhQb3NpdGlvbigpOiBEcm9wZG93blBvc2l0aW9uWCB7XG4gICAgICAgIHJldHVybiB0aGlzLl94UG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0IHhQb3NpdGlvbih2YWx1ZTogRHJvcGRvd25Qb3NpdGlvblgpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnYmVmb3JlJyAmJiB2YWx1ZSAhPT0gJ2FmdGVyJykge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3hQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24gaW4gdGhlIFkgYXhpcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB5UG9zaXRpb24oKTogRHJvcGRvd25Qb3NpdGlvblkge1xuICAgICAgICByZXR1cm4gdGhpcy5feVBvc2l0aW9uO1xuICAgIH1cblxuICAgIHNldCB5UG9zaXRpb24odmFsdWU6IERyb3Bkb3duUG9zaXRpb25ZKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJ2Fib3ZlJyAmJiB2YWx1ZSAhPT0gJ2JlbG93Jykge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3lQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCBpdHMgdHJpZ2dlciB2ZXJ0aWNhbGx5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG92ZXJsYXBUcmlnZ2VyWSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJsYXBUcmlnZ2VyWTtcbiAgICB9XG5cbiAgICBzZXQgb3ZlcmxhcFRyaWdnZXJZKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXBUcmlnZ2VyWSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBvdmVybGFwIGl0cyB0cmlnZ2VyIGhvcml6b250YWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBvdmVybGFwVHJpZ2dlclgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdmVybGFwVHJpZ2dlclg7XG4gICAgfVxuXG4gICAgc2V0IG92ZXJsYXBUcmlnZ2VyWCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9vdmVybGFwVHJpZ2dlclggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICAgIH1cblxuICAgIHNldCBoYXNCYWNrZHJvcCh2YWx1ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgdGFrZXMgY2xhc3NlcyBzZXQgb24gdGhlIGhvc3QgbWMtZHJvcGRvd24gZWxlbWVudCBhbmQgYXBwbGllcyB0aGVtIG9uIHRoZVxuICAgICAqIGRyb3Bkb3duIHRlbXBsYXRlIHRoYXQgZGlzcGxheXMgaW4gdGhlIG92ZXJsYXkgY29udGFpbmVyLiAgT3RoZXJ3aXNlLCBpdCdzIGRpZmZpY3VsdFxuICAgICAqIHRvIHN0eWxlIHRoZSBjb250YWluaW5nIGRyb3Bkb3duIGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSBjbGFzc2VzIGxpc3Qgb2YgY2xhc3MgbmFtZXNcbiAgICAgKi9cbiAgICBASW5wdXQoJ2NsYXNzJylcbiAgICBzZXQgcGFuZWxDbGFzcyhjbGFzc2VzOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNQYW5lbENsYXNzID0gdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3M7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzUGFuZWxDbGFzcyAmJiBwcmV2aW91c1BhbmVsQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91c1BhbmVsQ2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0W2NsYXNzTmFtZV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3MgPSBjbGFzc2VzO1xuXG4gICAgICAgIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdFtjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfeFBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWCA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLnhQb3NpdGlvbjtcbiAgICBwcml2YXRlIF95UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25ZID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMueVBvc2l0aW9uO1xuICAgIHByaXZhdGUgX292ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbiA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLm92ZXJsYXBUcmlnZ2VyWDtcbiAgICBwcml2YXRlIF9vdmVybGFwVHJpZ2dlclk6IGJvb2xlYW4gPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5vdmVybGFwVHJpZ2dlclk7XG4gICAgcHJpdmF0ZSBfaGFzQmFja2Ryb3A6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5oYXNCYWNrZHJvcDtcblxuICAgIC8qKiBDb25maWcgb2JqZWN0IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBkcm9wZG93bidzIG5nQ2xhc3MgKi9cbiAgICBjbGFzc0xpc3Q6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbiAgICAvKiogQ3VycmVudCBzdGF0ZSBvZiB0aGUgcGFuZWwgYW5pbWF0aW9uLiAqL1xuICAgIHBhbmVsQW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgPSAndm9pZCc7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgYW4gYW5pbWF0aW9uIG9uIHRoZSBkcm9wZG93biBjb21wbGV0ZXMuICovXG4gICAgYW5pbWF0aW9uRG9uZSA9IG5ldyBTdWJqZWN0PEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIGFuaW1hdGluZy4gKi9cbiAgICBpc0FuaW1hdGluZzogYm9vbGVhbjtcblxuICAgIC8qKiBQYXJlbnQgZHJvcGRvd24gb2YgdGhlIGN1cnJlbnQgZHJvcGRvd24gcGFuZWwuICovXG4gICAgcGFyZW50OiBNY0Ryb3Bkb3duUGFuZWwgfCB1bmRlZmluZWQ7XG5cbiAgICAvKiogTGF5b3V0IGRpcmVjdGlvbiBvZiB0aGUgZHJvcGRvd24uICovXG4gICAgZGlyZWN0aW9uOiBEaXJlY3Rpb247XG5cbiAgICAvKiogQ2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIGJhY2tkcm9wIGVsZW1lbnQuICovXG4gICAgQElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMuYmFja2Ryb3BDbGFzcztcblxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IGZhbHNlIH0pIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiB0aGUgaXRlbXMgaW5zaWRlIG9mIGEgZHJvcGRvd24uXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0Ryb3Bkb3duSXRlbSkgaXRlbXM6IFF1ZXJ5TGlzdDxNY0Ryb3Bkb3duSXRlbT47XG5cbiAgICAvKipcbiAgICAgKiBEcm9wZG93biBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93bkNvbnRlbnQsIHsgc3RhdGljOiBmYWxzZSB9KSBsYXp5Q29udGVudDogTWNEcm9wZG93bkNvbnRlbnQ7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBjbG9zZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjx2b2lkIHwgJ2NsaWNrJyB8ICdrZXlkb3duJyB8ICd0YWInPigpO1xuXG4gICAgcHJpdmF0ZSBwcmV2aW91c1BhbmVsQ2xhc3M6IHN0cmluZztcblxuICAgIHByaXZhdGUga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE1jRHJvcGRvd25JdGVtPjtcblxuICAgIC8qKiBEcm9wZG93biBpdGVtcyBpbnNpZGUgdGhlIGN1cnJlbnQgZHJvcGRvd24uICovXG4gICAgcHJpdmF0ZSBpdGVtc0FycmF5OiBNY0Ryb3Bkb3duSXRlbVtdID0gW107XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGFtb3VudCBvZiBkcm9wZG93biBpdGVtcyBjaGFuZ2VzLiAqL1xuICAgIHByaXZhdGUgaXRlbUNoYW5nZXMgPSBuZXcgU3ViamVjdDxNY0Ryb3Bkb3duSXRlbVtdPigpO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0YWIgZXZlbnRzIG9uIHRoZSBkcm9wZG93biBwYW5lbCAqL1xuICAgIHByaXZhdGUgdGFiU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyPE1jRHJvcGRvd25JdGVtPih0aGlzLml0ZW1zKVxuICAgICAgICAgICAgLndpdGhXcmFwKClcbiAgICAgICAgICAgIC53aXRoVHlwZUFoZWFkKCk7XG5cbiAgICAgICAgdGhpcy50YWJTdWJzY3JpcHRpb24gPSB0aGlzLmtleU1hbmFnZXIudGFiT3V0LnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlZC5lbWl0KCd0YWInKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGFiU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBob3ZlcmVkIGRyb3Bkb3duIGl0ZW0gY2hhbmdlcy4gKi9cbiAgICBob3ZlcmVkKCk6IE9ic2VydmFibGU8TWNEcm9wZG93bkl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCh0aGlzLml0ZW1zQXJyYXkpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKChpdGVtcykgPT4gbWVyZ2UoLi4uaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmhvdmVyZWQpKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIGEga2V5Ym9hcmQgZXZlbnQgZnJvbSB0aGUgZHJvcGRvd24sIGRlbGVnYXRpbmcgdG8gdGhlIGFwcHJvcHJpYXRlIGFjdGlvbi4gKi9cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5kaXJlY3Rpb24gPT09ICdsdHInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgna2V5ZG93bicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XIHx8IGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdrZXlib2FyZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2NsaWNrJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGRyb3Bkb3duLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gQWN0aW9uIGZyb20gd2hpY2ggdGhlIGZvY3VzIG9yaWdpbmF0ZWQuIFVzZWQgdG8gc2V0IHRoZSBjb3JyZWN0IHN0eWxpbmcuXG4gICAgICovXG4gICAgZm9jdXNGaXJzdEl0ZW0ob3JpZ2luOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJyk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIHRoZSBjb250ZW50IGlzIHJlbmRlcmVkIGxhemlseSwgaXQgdGFrZXMgYSBiaXQgYmVmb3JlIHRoZSBpdGVtcyBhcmUgaW5zaWRlIHRoZSBET00uXG4gICAgICAgIGlmICh0aGlzLmxhenlDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKG9yaWdpbikuc2V0Rmlyc3RJdGVtQWN0aXZlKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKG9yaWdpbikuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGFjdGl2ZSBpdGVtIGluIHRoZSBkcm9wZG93bi4gVGhpcyBpcyB1c2VkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCwgYWxsb3dpbmdcbiAgICAgKiB0aGUgdXNlciB0byBzdGFydCBmcm9tIHRoZSBmaXJzdCBvcHRpb24gd2hlbiBwcmVzc2luZyB0aGUgZG93biBhcnJvdy5cbiAgICAgKi9cbiAgICByZXNldEFjdGl2ZUl0ZW0oKSB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBkcm9wZG93biBpdGVtIHdpdGggdGhlIGRyb3Bkb3duLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW06IE1jRHJvcGRvd25JdGVtKSB7XG4gICAgICAgIC8vIFdlIHJlZ2lzdGVyIHRoZSBpdGVtcyB0aHJvdWdoIHRoaXMgbWV0aG9kLCByYXRoZXIgdGhhbiBwaWNraW5nIHRoZW0gdXAgdGhyb3VnaFxuICAgICAgICAvLyBgQ29udGVudENoaWxkcmVuYCwgYmVjYXVzZSB3ZSBuZWVkIHRoZSBpdGVtcyB0byBiZSBwaWNrZWQgdXAgYnkgdGhlaXIgY2xvc2VzdFxuICAgICAgICAvLyBgbWMtZHJvcGRvd25gIGFuY2VzdG9yLiBJZiB3ZSB1c2VkIGBAQ29udGVudENoaWxkcmVuKE1jRHJvcGRvd25JdGVtLCB7ZGVzY2VuZGFudHM6IHRydWV9KWAsXG4gICAgICAgIC8vIGFsbCBkZXNjZW5kYW50IGl0ZW1zIHdpbGwgYmxlZWQgaW50byB0aGUgdG9wLWxldmVsIGRyb3Bkb3duIGluIHRoZSBjYXNlIHdoZXJlIHRoZSBjb25zdW1lclxuICAgICAgICAvLyBoYXMgYG1jLWRyb3Bkb3duYCBpbnN0YW5jZXMgbmVzdGVkIGluc2lkZSBlYWNoIG90aGVyLlxuICAgICAgICBpZiAodGhpcy5pdGVtc0FycmF5LmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNoYW5nZXMubmV4dCh0aGlzLml0ZW1zQXJyYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGRyb3Bkb3duLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZW1vdmVJdGVtKGl0ZW06IE1jRHJvcGRvd25JdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtc0FycmF5LmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbXNBcnJheS5pbmRleE9mKGl0ZW0pID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2hhbmdlcy5uZXh0KHRoaXMuaXRlbXNBcnJheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGNsYXNzZXMgdG8gdGhlIGRyb3Bkb3duIHBhbmVsIGJhc2VkIG9uIGl0cyBwb3NpdGlvbi4gQ2FuIGJlIHVzZWQgYnlcbiAgICAgKiBjb25zdW1lcnMgdG8gYWRkIHNwZWNpZmljIHN0eWxpbmcgYmFzZWQgb24gdGhlIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSBwb3NYIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBhbG9uZyB0aGUgeCBheGlzLlxuICAgICAqIEBwYXJhbSBwb3NZIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBhbG9uZyB0aGUgeSBheGlzLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbkNsYXNzZXMocG9zWDogRHJvcGRvd25Qb3NpdGlvblggPSB0aGlzLnhQb3NpdGlvbiwgcG9zWTogRHJvcGRvd25Qb3NpdGlvblkgPSB0aGlzLnlQb3NpdGlvbikge1xuICAgICAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5jbGFzc0xpc3Q7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWJlZm9yZSddID0gcG9zWCA9PT0gJ2JlZm9yZSc7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWFmdGVyJ10gPSBwb3NYID09PSAnYWZ0ZXInO1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1hYm92ZSddID0gcG9zWSA9PT0gJ2Fib3ZlJztcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYmVsb3cnXSA9IHBvc1kgPT09ICdiZWxvdyc7XG4gICAgfVxuXG4gICAgLyoqIFN0YXJ0cyB0aGUgZW50ZXIgYW5pbWF0aW9uLiAqL1xuICAgIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBhbmVsQW5pbWF0aW9uU3RhdGUgPSAnZW50ZXInO1xuICAgIH1cblxuICAgIC8qKiBSZXNldHMgdGhlIHBhbmVsIGFuaW1hdGlvbiB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gKi9cbiAgICByZXNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5wYW5lbEFuaW1hdGlvblN0YXRlID0gJ3ZvaWQnO1xuICAgIH1cblxuICAgIC8qKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgcGFuZWwgYW5pbWF0aW9uIGNvbXBsZXRlcy4gKi9cbiAgICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRG9uZS5uZXh0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0aGUgY29udGVudCBlbGVtZW50IHRvIHRoZSB0b3AgYXMgc29vbiBhcyB0aGUgYW5pbWF0aW9uIHN0YXJ0cy4gVGhpcyBpcyBuZWNlc3NhcnksXG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3QgaXRlbSB3aGlsZSBpdCdzIHN0aWxsIGJlaW5nIGFuaW1hdGVkLCB3aGljaCBjYW4gdGhyb3dcbiAgICAgICAgLy8gdGhlIGJyb3dzZXIgb2ZmIHdoZW4gaXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIHBvc2l0aW9uLiBBbHRlcm5hdGl2ZWx5IHdlIGNhbiBtb3ZlIGZvY3VzXG4gICAgICAgIC8vIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBkb25lLCBob3dldmVyIG1vdmluZyBmb2N1cyBhc3luY2hyb25vdXNseSB3aWxsIGludGVycnVwdCBzY3JlZW5cbiAgICAgICAgLy8gcmVhZGVycyB3aGljaCBhcmUgaW4gdGhlIHByb2Nlc3Mgb2YgcmVhZGluZyBvdXQgdGhlIGRyb3Bkb3duIGFscmVhZHkuIFdlIHRha2UgdGhlIGBlbGVtZW50YFxuICAgICAgICAvLyBmcm9tIHRoZSBgZXZlbnRgIHNpbmNlIHdlIGNhbid0IHVzZSBhIGBWaWV3Q2hpbGRgIHRvIGFjY2VzcyB0aGUgcGFuZS5cbiAgICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicgJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgZXZlbnQuZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: dropdown.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
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
export var MC_DROPDOWN_DEFAULT_OPTIONS = new InjectionToken('mc-dropdown-default-options', {
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
var McDropdown = /** @class */ (function () {
    function McDropdown(_elementRef, _ngZone, _defaultOptions) {
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
    Object.defineProperty(McDropdown.prototype, "xPosition", {
        /** Position of the dropdown in the X axis. */
        get: /**
         * Position of the dropdown in the X axis.
         * @return {?}
         */
        function () {
            return this._xPosition;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== 'before' && value !== 'after') {
                throwMcDropdownInvalidPositionX();
            }
            this._xPosition = value;
            this.setPositionClasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "yPosition", {
        /** Position of the dropdown in the Y axis. */
        get: /**
         * Position of the dropdown in the Y axis.
         * @return {?}
         */
        function () {
            return this._yPosition;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== 'above' && value !== 'below') {
                throwMcDropdownInvalidPositionY();
            }
            this._yPosition = value;
            this.setPositionClasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "overlapTriggerY", {
        /** Whether the dropdown should overlap its trigger vertically. */
        get: /**
         * Whether the dropdown should overlap its trigger vertically.
         * @return {?}
         */
        function () {
            return this._overlapTriggerY;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._overlapTriggerY = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "overlapTriggerX", {
        /** Whether the dropdown should overlap its trigger horizontally. */
        get: /**
         * Whether the dropdown should overlap its trigger horizontally.
         * @return {?}
         */
        function () {
            return this._overlapTriggerX;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._overlapTriggerX = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "hasBackdrop", {
        /** Whether the dropdown has a backdrop. */
        get: /**
         * Whether the dropdown has a backdrop.
         * @return {?}
         */
        function () {
            return this._hasBackdrop;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasBackdrop = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "panelClass", {
        /**
         * This method takes classes set on the host mc-dropdown element and applies them on the
         * dropdown template that displays in the overlay container.  Otherwise, it's difficult
         * to style the containing dropdown from outside the component.
         * @param classes list of class names
         */
        set: /**
         * This method takes classes set on the host mc-dropdown element and applies them on the
         * dropdown template that displays in the overlay container.  Otherwise, it's difficult
         * to style the containing dropdown from outside the component.
         * @param {?} classes list of class names
         * @return {?}
         */
        function (classes) {
            var _this = this;
            /** @type {?} */
            var previousPanelClass = this.previousPanelClass;
            if (previousPanelClass && previousPanelClass.length) {
                previousPanelClass.split(' ').forEach((/**
                 * @param {?} className
                 * @return {?}
                 */
                function (className) {
                    _this.classList[className] = false;
                }));
            }
            this.previousPanelClass = classes;
            if (classes && classes.length) {
                classes.split(' ').forEach((/**
                 * @param {?} className
                 * @return {?}
                 */
                function (className) {
                    _this.classList[className] = true;
                }));
                this._elementRef.nativeElement.className = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McDropdown.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setPositionClasses();
    };
    /**
     * @return {?}
     */
    McDropdown.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.keyManager = new FocusKeyManager(this.items).withWrap().withTypeAhead();
        this.tabSubscription = this.keyManager.tabOut.subscribe((/**
         * @return {?}
         */
        function () { return _this.closed.emit('tab'); }));
    };
    /**
     * @return {?}
     */
    McDropdown.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.tabSubscription.unsubscribe();
        this.closed.complete();
    };
    /** Stream that emits whenever the hovered dropdown item changes. */
    /**
     * Stream that emits whenever the hovered dropdown item changes.
     * @return {?}
     */
    McDropdown.prototype.hovered = /**
     * Stream that emits whenever the hovered dropdown item changes.
     * @return {?}
     */
    function () {
        return this.itemChanges.pipe(startWith(this.itemsArray), switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return merge.apply(void 0, __spread(items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.hovered; })))); })));
    };
    /** Handle a keyboard event from the dropdown, delegating to the appropriate action. */
    /**
     * Handle a keyboard event from the dropdown, delegating to the appropriate action.
     * @param {?} event
     * @return {?}
     */
    McDropdown.prototype.handleKeydown = /**
     * Handle a keyboard event from the dropdown, delegating to the appropriate action.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
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
    };
    /**
     * @return {?}
     */
    McDropdown.prototype.handleClick = /**
     * @return {?}
     */
    function () {
        this.closed.emit('click');
    };
    /**
     * Focus the first item in the dropdown.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    /**
     * Focus the first item in the dropdown.
     * @param {?=} origin Action from which the focus originated. Used to set the correct styling.
     * @return {?}
     */
    McDropdown.prototype.focusFirstItem = /**
     * Focus the first item in the dropdown.
     * @param {?=} origin Action from which the focus originated. Used to set the correct styling.
     * @return {?}
     */
    function (origin) {
        var _this = this;
        if (origin === void 0) { origin = 'program'; }
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this._ngZone.onStable.asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.keyManager.setFocusOrigin(origin).setFirstItemActive(); }));
        }
        else {
            this.keyManager.setFocusOrigin(origin).setFirstItemActive();
        }
    };
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     * @return {?}
     */
    McDropdown.prototype.resetActiveItem = /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     * @return {?}
     */
    function () {
        this.keyManager.setActiveItem(-1);
    };
    /**
     * Registers a dropdown item with the dropdown.
     * @docs-private
     */
    /**
     * Registers a dropdown item with the dropdown.
     * \@docs-private
     * @param {?} item
     * @return {?}
     */
    McDropdown.prototype.addItem = /**
     * Registers a dropdown item with the dropdown.
     * \@docs-private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // We register the items through this method, rather than picking them up through
        // `ContentChildren`, because we need the items to be picked up by their closest
        // `mc-dropdown` ancestor. If we used `@ContentChildren(McDropdownItem, {descendants: true})`,
        // all descendant items will bleed into the top-level dropdown in the case where the consumer
        // has `mc-dropdown` instances nested inside each other.
        if (this.itemsArray.indexOf(item) === -1) {
            this.itemsArray.push(item);
            this.itemChanges.next(this.itemsArray);
        }
    };
    /**
     * Removes an item from the dropdown.
     * @docs-private
     */
    /**
     * Removes an item from the dropdown.
     * \@docs-private
     * @param {?} item
     * @return {?}
     */
    McDropdown.prototype.removeItem = /**
     * Removes an item from the dropdown.
     * \@docs-private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var index = this.itemsArray.indexOf(item);
        if (this.itemsArray.indexOf(item) > -1) {
            this.itemsArray.splice(index, 1);
            this.itemChanges.next(this.itemsArray);
        }
    };
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * @param posX Position of the dropdown along the x axis.
     * @param posY Position of the dropdown along the y axis.
     * @docs-private
     */
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * \@docs-private
     * @param {?=} posX Position of the dropdown along the x axis.
     * @param {?=} posY Position of the dropdown along the y axis.
     * @return {?}
     */
    McDropdown.prototype.setPositionClasses = /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * \@docs-private
     * @param {?=} posX Position of the dropdown along the x axis.
     * @param {?=} posY Position of the dropdown along the y axis.
     * @return {?}
     */
    function (posX, posY) {
        if (posX === void 0) { posX = this.xPosition; }
        if (posY === void 0) { posY = this.yPosition; }
        /** @type {?} */
        var classes = this.classList;
        classes['mc-dropdown-before'] = posX === 'before';
        classes['mc-dropdown-after'] = posX === 'after';
        classes['mc-dropdown-above'] = posY === 'above';
        classes['mc-dropdown-below'] = posY === 'below';
    };
    /** Starts the enter animation. */
    /**
     * Starts the enter animation.
     * @return {?}
     */
    McDropdown.prototype.startAnimation = /**
     * Starts the enter animation.
     * @return {?}
     */
    function () {
        this.panelAnimationState = 'enter';
    };
    /** Resets the panel animation to its initial state. */
    /**
     * Resets the panel animation to its initial state.
     * @return {?}
     */
    McDropdown.prototype.resetAnimation = /**
     * Resets the panel animation to its initial state.
     * @return {?}
     */
    function () {
        this.panelAnimationState = 'void';
    };
    /** Callback that is invoked when the panel animation completes. */
    /**
     * Callback that is invoked when the panel animation completes.
     * @param {?} event
     * @return {?}
     */
    McDropdown.prototype.onAnimationDone = /**
     * Callback that is invoked when the panel animation completes.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.animationDone.next(event);
        this.isAnimating = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McDropdown.prototype.onAnimationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
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
    McDropdown.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [MC_DROPDOWN_DEFAULT_OPTIONS,] }] }
    ]; };
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
    return McDropdown;
}());
export { McDropdown };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUVwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLCtCQUErQixFQUFFLCtCQUErQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFNdEUsOENBa0JDOzs7Ozs7SUFo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Ozs7Ozs7SUFNbEUsaUNBQWlGOzs7OztJQUdqRiw0QkFDMkQ7Ozs7O0lBRTNELHdDQUFtQzs7Ozs7SUFFbkMsZ0NBQW9EOzs7Ozs7SUFHcEQsZ0NBQTBDOzs7Ozs7SUFHMUMsaUNBQXNEOzs7Ozs7SUFHdEQscUNBQTZDOzs7OztJQUd6QyxpQ0FBNEM7Ozs7O0lBQzVDLDZCQUF1Qjs7Ozs7SUFDdkIscUNBQXNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBFU0NBUEUsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBET1dOX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWNEcm9wZG93bkFuaW1hdGlvbnMgfSBmcm9tICcuL2Ryb3Bkb3duLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkNvbnRlbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbnRlbnQnO1xuaW1wb3J0IHsgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCwgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tZXJyb3JzJztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtJztcbmltcG9ydCB7IE1DX0RST1BET1dOX1BBTkVMLCBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLXBhbmVsJztcbmltcG9ydCB7IERyb3Bkb3duUG9zaXRpb25YLCBEcm9wZG93blBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tcG9zaXRpb25zJztcblxuXG4vKiogRGVmYXVsdCBgbWMtZHJvcGRvd25gIG9wdGlvbnMgdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbi4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMge1xuICAgIC8qKiBUaGUgeC1heGlzIHBvc2l0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICB4UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YO1xuXG4gICAgLyoqIFRoZSB5LWF4aXMgcG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duLiAqL1xuICAgIHlQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgdGhlIGRyb3Bkb3duIHRyaWdnZXIgaG9yaXpvbnRhbGx5LiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCB0aGUgZHJvcGRvd24gdHJpZ2dlciB2ZXJ0aWNhbGx5LiAqL1xuICAgIG92ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbjtcblxuICAgIC8qKiBDbGFzcyB0byBiZSBhcHBsaWVkIHRvIHRoZSBkcm9wZG93bidzIGJhY2tkcm9wLiAqL1xuICAgIGJhY2tkcm9wQ2xhc3M6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBoYXNCYWNrZHJvcD86IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBgbWMtZHJvcGRvd25gLiAqL1xuZXhwb3J0IGNvbnN0IE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OUyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPE1jRHJvcGRvd25EZWZhdWx0T3B0aW9ucz4oJ21jLWRyb3Bkb3duLWRlZmF1bHQtb3B0aW9ucycsIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlNfRkFDVE9SWVxuICAgIH0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TX0ZBQ1RPUlkoKTogTWNEcm9wZG93bkRlZmF1bHRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvdmVybGFwVHJpZ2dlclg6IHRydWUsXG4gICAgICAgIG92ZXJsYXBUcmlnZ2VyWTogZmFsc2UsXG4gICAgICAgIHhQb3NpdGlvbjogJ2FmdGVyJyxcbiAgICAgICAgeVBvc2l0aW9uOiAnYmVsb3cnLFxuICAgICAgICBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnXG4gICAgfTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kcm9wZG93bicsXG4gICAgZXhwb3J0QXM6ICdtY0Ryb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkcm9wZG93bi5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIG1jRHJvcGRvd25BbmltYXRpb25zLnRyYW5zZm9ybURyb3Bkb3duLFxuICAgICAgICBtY0Ryb3Bkb3duQW5pbWF0aW9ucy5mYWRlSW5JdGVtc1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTUNfRFJPUERPV05fUEFORUwsIHVzZUV4aXN0aW5nOiBNY0Ryb3Bkb3duIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBNY0Ryb3Bkb3duUGFuZWw8TWNEcm9wZG93bkl0ZW0+LCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogUG9zaXRpb24gb2YgdGhlIGRyb3Bkb3duIGluIHRoZSBYIGF4aXMuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgeFBvc2l0aW9uKCk6IERyb3Bkb3duUG9zaXRpb25YIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3hQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgeFBvc2l0aW9uKHZhbHVlOiBEcm9wZG93blBvc2l0aW9uWCkge1xuICAgICAgICBpZiAodmFsdWUgIT09ICdiZWZvcmUnICYmIHZhbHVlICE9PSAnYWZ0ZXInKSB7XG4gICAgICAgICAgICB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25YKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBpbiB0aGUgWSBheGlzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHlQb3NpdGlvbigpOiBEcm9wZG93blBvc2l0aW9uWSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95UG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0IHlQb3NpdGlvbih2YWx1ZTogRHJvcGRvd25Qb3NpdGlvblkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnYWJvdmUnICYmIHZhbHVlICE9PSAnYmVsb3cnKSB7XG4gICAgICAgICAgICB0aHJvd01jRHJvcGRvd25JbnZhbGlkUG9zaXRpb25ZKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5feVBvc2l0aW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBvdmVybGFwIGl0cyB0cmlnZ2VyIHZlcnRpY2FsbHkuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgb3ZlcmxhcFRyaWdnZXJZKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3ZlcmxhcFRyaWdnZXJZO1xuICAgIH1cblxuICAgIHNldCBvdmVybGFwVHJpZ2dlclkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fb3ZlcmxhcFRyaWdnZXJZID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgaXRzIHRyaWdnZXIgaG9yaXpvbnRhbGx5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG92ZXJsYXBUcmlnZ2VyWCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJsYXBUcmlnZ2VyWDtcbiAgICB9XG5cbiAgICBzZXQgb3ZlcmxhcFRyaWdnZXJYKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXBUcmlnZ2VyWCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGhhcyBhIGJhY2tkcm9wLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhhc0JhY2tkcm9wKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzQmFja2Ryb3A7XG4gICAgfVxuXG4gICAgc2V0IGhhc0JhY2tkcm9wKHZhbHVlOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2hhc0JhY2tkcm9wID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCB0YWtlcyBjbGFzc2VzIHNldCBvbiB0aGUgaG9zdCBtYy1kcm9wZG93biBlbGVtZW50IGFuZCBhcHBsaWVzIHRoZW0gb24gdGhlXG4gICAgICogZHJvcGRvd24gdGVtcGxhdGUgdGhhdCBkaXNwbGF5cyBpbiB0aGUgb3ZlcmxheSBjb250YWluZXIuICBPdGhlcndpc2UsIGl0J3MgZGlmZmljdWx0XG4gICAgICogdG8gc3R5bGUgdGhlIGNvbnRhaW5pbmcgZHJvcGRvd24gZnJvbSBvdXRzaWRlIHRoZSBjb21wb25lbnQuXG4gICAgICogQHBhcmFtIGNsYXNzZXMgbGlzdCBvZiBjbGFzcyBuYW1lc1xuICAgICAqL1xuICAgIEBJbnB1dCgnY2xhc3MnKVxuICAgIHNldCBwYW5lbENsYXNzKGNsYXNzZXM6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwcmV2aW91c1BhbmVsQ2xhc3MgPSB0aGlzLnByZXZpb3VzUGFuZWxDbGFzcztcblxuICAgICAgICBpZiAocHJldmlvdXNQYW5lbENsYXNzICYmIHByZXZpb3VzUGFuZWxDbGFzcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzUGFuZWxDbGFzcy5zcGxpdCgnICcpLmZvckVhY2goKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3RbY2xhc3NOYW1lXSA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZpb3VzUGFuZWxDbGFzcyA9IGNsYXNzZXM7XG5cbiAgICAgICAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuc3BsaXQoJyAnKS5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0W2NsYXNzTmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF94UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25YID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMueFBvc2l0aW9uO1xuICAgIHByaXZhdGUgX3lQb3NpdGlvbjogRHJvcGRvd25Qb3NpdGlvblkgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy55UG9zaXRpb247XG4gICAgcHJpdmF0ZSBfb3ZlcmxhcFRyaWdnZXJYOiBib29sZWFuID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMub3ZlcmxhcFRyaWdnZXJYO1xuICAgIHByaXZhdGUgX292ZXJsYXBUcmlnZ2VyWTogYm9vbGVhbiA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLm92ZXJsYXBUcmlnZ2VyWTtcbiAgICBwcml2YXRlIF9oYXNCYWNrZHJvcDogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLmhhc0JhY2tkcm9wO1xuXG4gICAgLyoqIENvbmZpZyBvYmplY3QgdG8gYmUgcGFzc2VkIGludG8gdGhlIGRyb3Bkb3duJ3MgbmdDbGFzcyAqL1xuICAgIGNsYXNzTGlzdDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuICAgIC8qKiBDdXJyZW50IHN0YXRlIG9mIHRoZSBwYW5lbCBhbmltYXRpb24uICovXG4gICAgcGFuZWxBbmltYXRpb25TdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyA9ICd2b2lkJztcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciBhbiBhbmltYXRpb24gb24gdGhlIGRyb3Bkb3duIGNvbXBsZXRlcy4gKi9cbiAgICBhbmltYXRpb25Eb25lID0gbmV3IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXMgYW5pbWF0aW5nLiAqL1xuICAgIGlzQW5pbWF0aW5nOiBib29sZWFuO1xuXG4gICAgLyoqIFBhcmVudCBkcm9wZG93biBvZiB0aGUgY3VycmVudCBkcm9wZG93biBwYW5lbC4gKi9cbiAgICBwYXJlbnQ6IE1jRHJvcGRvd25QYW5lbCB8IHVuZGVmaW5lZDtcblxuICAgIC8qKiBMYXlvdXQgZGlyZWN0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcblxuICAgIC8qKiBDbGFzcyB0byBiZSBhZGRlZCB0byB0aGUgYmFja2Ryb3AgZWxlbWVudC4gKi9cbiAgICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5iYWNrZHJvcENsYXNzO1xuXG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiBmYWxzZX0pIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiB0aGUgaXRlbXMgaW5zaWRlIG9mIGEgZHJvcGRvd24uXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0Ryb3Bkb3duSXRlbSkgaXRlbXM6IFF1ZXJ5TGlzdDxNY0Ryb3Bkb3duSXRlbT47XG5cbiAgICAvKipcbiAgICAgKiBEcm9wZG93biBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93bkNvbnRlbnQsIHtzdGF0aWM6IGZhbHNlfSkgbGF6eUNvbnRlbnQ6IE1jRHJvcGRvd25Db250ZW50O1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkIHwgJ2NsaWNrJyB8ICdrZXlkb3duJyB8ICd0YWInPiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8dm9pZCB8ICdjbGljaycgfCAna2V5ZG93bicgfCAndGFiJz4oKTtcblxuICAgIHByaXZhdGUgcHJldmlvdXNQYW5lbENsYXNzOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGtleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNY0Ryb3Bkb3duSXRlbT47XG5cbiAgICAvKiogRHJvcGRvd24gaXRlbXMgaW5zaWRlIHRoZSBjdXJyZW50IGRyb3Bkb3duLiAqL1xuICAgIHByaXZhdGUgaXRlbXNBcnJheTogTWNEcm9wZG93bkl0ZW1bXSA9IFtdO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBhbW91bnQgb2YgZHJvcGRvd24gaXRlbXMgY2hhbmdlcy4gKi9cbiAgICBwcml2YXRlIGl0ZW1DaGFuZ2VzID0gbmV3IFN1YmplY3Q8TWNEcm9wZG93bkl0ZW1bXT4oKTtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gdGFiIGV2ZW50cyBvbiB0aGUgZHJvcGRvd24gcGFuZWwgKi9cbiAgICBwcml2YXRlIHRhYlN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TKSBwcml2YXRlIF9kZWZhdWx0T3B0aW9uczogTWNEcm9wZG93bkRlZmF1bHRPcHRpb25zKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxNY0Ryb3Bkb3duSXRlbT4odGhpcy5pdGVtcykud2l0aFdyYXAoKS53aXRoVHlwZUFoZWFkKCk7XG4gICAgICAgIHRoaXMudGFiU3Vic2NyaXB0aW9uID0gdGhpcy5rZXlNYW5hZ2VyLnRhYk91dC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZWQuZW1pdCgndGFiJykpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRhYlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmNsb3NlZC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgaG92ZXJlZCBkcm9wZG93biBpdGVtIGNoYW5nZXMuICovXG4gICAgaG92ZXJlZCgpOiBPYnNlcnZhYmxlPE1jRHJvcGRvd25JdGVtPiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1DaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgodGhpcy5pdGVtc0FycmF5KSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoaXRlbXMpID0+IG1lcmdlKC4uLml0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5ob3ZlcmVkKSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZSBhIGtleWJvYXJkIGV2ZW50IGZyb20gdGhlIGRyb3Bkb3duLCBkZWxlZ2F0aW5nIHRvIHRoZSBhcHByb3ByaWF0ZSBhY3Rpb24uICovXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KCdrZXlkb3duJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50ICYmIHRoaXMuZGlyZWN0aW9uID09PSAnbHRyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KCdrZXlkb3duJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBVUF9BUlJPVyB8fCBrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbigna2V5Ym9hcmQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KCdjbGljaycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvY3VzIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBkcm9wZG93bi5cbiAgICAgKiBAcGFyYW0gb3JpZ2luIEFjdGlvbiBmcm9tIHdoaWNoIHRoZSBmb2N1cyBvcmlnaW5hdGVkLiBVc2VkIHRvIHNldCB0aGUgY29ycmVjdCBzdHlsaW5nLlxuICAgICAqL1xuICAgIGZvY3VzRmlyc3RJdGVtKG9yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiB0aGUgY29udGVudCBpcyByZW5kZXJlZCBsYXppbHksIGl0IHRha2VzIGEgYml0IGJlZm9yZSB0aGUgaXRlbXMgYXJlIGluc2lkZSB0aGUgRE9NLlxuICAgICAgICBpZiAodGhpcy5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbihvcmlnaW4pLnNldEZpcnN0SXRlbUFjdGl2ZSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbihvcmlnaW4pLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBhY3RpdmUgaXRlbSBpbiB0aGUgZHJvcGRvd24uIFRoaXMgaXMgdXNlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQsIGFsbG93aW5nXG4gICAgICogdGhlIHVzZXIgdG8gc3RhcnQgZnJvbSB0aGUgZmlyc3Qgb3B0aW9uIHdoZW4gcHJlc3NpbmcgdGhlIGRvd24gYXJyb3cuXG4gICAgICovXG4gICAgcmVzZXRBY3RpdmVJdGVtKCkge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSgtMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgZHJvcGRvd24gaXRlbSB3aXRoIHRoZSBkcm9wZG93bi5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgYWRkSXRlbShpdGVtOiBNY0Ryb3Bkb3duSXRlbSkge1xuICAgICAgICAvLyBXZSByZWdpc3RlciB0aGUgaXRlbXMgdGhyb3VnaCB0aGlzIG1ldGhvZCwgcmF0aGVyIHRoYW4gcGlja2luZyB0aGVtIHVwIHRocm91Z2hcbiAgICAgICAgLy8gYENvbnRlbnRDaGlsZHJlbmAsIGJlY2F1c2Ugd2UgbmVlZCB0aGUgaXRlbXMgdG8gYmUgcGlja2VkIHVwIGJ5IHRoZWlyIGNsb3Nlc3RcbiAgICAgICAgLy8gYG1jLWRyb3Bkb3duYCBhbmNlc3Rvci4gSWYgd2UgdXNlZCBgQENvbnRlbnRDaGlsZHJlbihNY0Ryb3Bkb3duSXRlbSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlgLFxuICAgICAgICAvLyBhbGwgZGVzY2VuZGFudCBpdGVtcyB3aWxsIGJsZWVkIGludG8gdGhlIHRvcC1sZXZlbCBkcm9wZG93biBpbiB0aGUgY2FzZSB3aGVyZSB0aGUgY29uc3VtZXJcbiAgICAgICAgLy8gaGFzIGBtYy1kcm9wZG93bmAgaW5zdGFuY2VzIG5lc3RlZCBpbnNpZGUgZWFjaCBvdGhlci5cbiAgICAgICAgaWYgKHRoaXMuaXRlbXNBcnJheS5pbmRleE9mKGl0ZW0pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0FycmF5LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1DaGFuZ2VzLm5leHQodGhpcy5pdGVtc0FycmF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBkcm9wZG93bi5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcmVtb3ZlSXRlbShpdGVtOiBNY0Ryb3Bkb3duSXRlbSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXNBcnJheS5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICAgIGlmICh0aGlzLml0ZW1zQXJyYXkuaW5kZXhPZihpdGVtKSA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNoYW5nZXMubmV4dCh0aGlzLml0ZW1zQXJyYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBjbGFzc2VzIHRvIHRoZSBkcm9wZG93biBwYW5lbCBiYXNlZCBvbiBpdHMgcG9zaXRpb24uIENhbiBiZSB1c2VkIGJ5XG4gICAgICogY29uc3VtZXJzIHRvIGFkZCBzcGVjaWZpYyBzdHlsaW5nIGJhc2VkIG9uIHRoZSBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0gcG9zWCBQb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24gYWxvbmcgdGhlIHggYXhpcy5cbiAgICAgKiBAcGFyYW0gcG9zWSBQb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24gYWxvbmcgdGhlIHkgYXhpcy5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgc2V0UG9zaXRpb25DbGFzc2VzKHBvc1g6IERyb3Bkb3duUG9zaXRpb25YID0gdGhpcy54UG9zaXRpb24sIHBvc1k6IERyb3Bkb3duUG9zaXRpb25ZID0gdGhpcy55UG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IHRoaXMuY2xhc3NMaXN0O1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1iZWZvcmUnXSA9IHBvc1ggPT09ICdiZWZvcmUnO1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1hZnRlciddID0gcG9zWCA9PT0gJ2FmdGVyJztcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYWJvdmUnXSA9IHBvc1kgPT09ICdhYm92ZSc7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWJlbG93J10gPSBwb3NZID09PSAnYmVsb3cnO1xuICAgIH1cblxuICAgIC8qKiBTdGFydHMgdGhlIGVudGVyIGFuaW1hdGlvbi4gKi9cbiAgICBzdGFydEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5wYW5lbEFuaW1hdGlvblN0YXRlID0gJ2VudGVyJztcbiAgICB9XG5cbiAgICAvKiogUmVzZXRzIHRoZSBwYW5lbCBhbmltYXRpb24gdG8gaXRzIGluaXRpYWwgc3RhdGUuICovXG4gICAgcmVzZXRBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMucGFuZWxBbmltYXRpb25TdGF0ZSA9ICd2b2lkJztcbiAgICB9XG5cbiAgICAvKiogQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIHBhbmVsIGFuaW1hdGlvbiBjb21wbGV0ZXMuICovXG4gICAgb25BbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkRvbmUubmV4dChldmVudCk7XG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBTY3JvbGwgdGhlIGNvbnRlbnQgZWxlbWVudCB0byB0aGUgdG9wIGFzIHNvb24gYXMgdGhlIGFuaW1hdGlvbiBzdGFydHMuIFRoaXMgaXMgbmVjZXNzYXJ5LFxuICAgICAgICAvLyBiZWNhdXNlIHdlIG1vdmUgZm9jdXMgdG8gdGhlIGZpcnN0IGl0ZW0gd2hpbGUgaXQncyBzdGlsbCBiZWluZyBhbmltYXRlZCwgd2hpY2ggY2FuIHRocm93XG4gICAgICAgIC8vIHRoZSBicm93c2VyIG9mZiB3aGVuIGl0IGRldGVybWluZXMgdGhlIHNjcm9sbCBwb3NpdGlvbi4gQWx0ZXJuYXRpdmVseSB3ZSBjYW4gbW92ZSBmb2N1c1xuICAgICAgICAvLyB3aGVuIHRoZSBhbmltYXRpb24gaXMgZG9uZSwgaG93ZXZlciBtb3ZpbmcgZm9jdXMgYXN5bmNocm9ub3VzbHkgd2lsbCBpbnRlcnJ1cHQgc2NyZWVuXG4gICAgICAgIC8vIHJlYWRlcnMgd2hpY2ggYXJlIGluIHRoZSBwcm9jZXNzIG9mIHJlYWRpbmcgb3V0IHRoZSBkcm9wZG93biBhbHJlYWR5LiBXZSB0YWtlIHRoZSBgZWxlbWVudGBcbiAgICAgICAgLy8gZnJvbSB0aGUgYGV2ZW50YCBzaW5jZSB3ZSBjYW4ndCB1c2UgYSBgVmlld0NoaWxkYCB0byBhY2Nlc3MgdGhlIHBhbmUuXG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnZW50ZXInICYmIHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIGV2ZW50LmVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
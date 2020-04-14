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
        this.keyManager = new FocusKeyManager(this.items)
            .withWrap()
            .withTypeAhead();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUVwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLCtCQUErQixFQUFFLCtCQUErQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFNdEUsOENBa0JDOzs7Ozs7SUFo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RTs7Ozs7O0lBTWxFLGlDQUFtRjs7Ozs7SUFHbkYsNEJBQzJEOzs7OztJQUUzRCx3Q0FBbUM7Ozs7O0lBRW5DLGdDQUFvRDs7Ozs7O0lBR3BELGdDQUEwQzs7Ozs7O0lBRzFDLGlDQUFzRDs7Ozs7O0lBR3RELHFDQUE2Qzs7Ozs7SUFHekMsaUNBQTRDOzs7OztJQUM1Qyw2QkFBdUI7Ozs7O0lBQ3ZCLHFDQUFzRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgRVNDQVBFLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgRE9XTl9BUlJPVywgVVBfQVJST1cgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jRHJvcGRvd25BbmltYXRpb25zIH0gZnJvbSAnLi9kcm9wZG93bi1hbmltYXRpb25zJztcbmltcG9ydCB7IE1jRHJvcGRvd25Db250ZW50IH0gZnJvbSAnLi9kcm9wZG93bi1jb250ZW50JztcbmltcG9ydCB7IHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblgsIHRocm93TWNEcm9wZG93bkludmFsaWRQb3NpdGlvblkgfSBmcm9tICcuL2Ryb3Bkb3duLWVycm9ycyc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duSXRlbSB9IGZyb20gJy4vZHJvcGRvd24taXRlbSc7XG5pbXBvcnQgeyBNQ19EUk9QRE9XTl9QQU5FTCwgTWNEcm9wZG93blBhbmVsIH0gZnJvbSAnLi9kcm9wZG93bi1wYW5lbCc7XG5pbXBvcnQgeyBEcm9wZG93blBvc2l0aW9uWCwgRHJvcGRvd25Qb3NpdGlvblkgfSBmcm9tICcuL2Ryb3Bkb3duLXBvc2l0aW9ucyc7XG5cblxuLyoqIERlZmF1bHQgYG1jLWRyb3Bkb3duYCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNEcm9wZG93bkRlZmF1bHRPcHRpb25zIHtcbiAgICAvKiogVGhlIHgtYXhpcyBwb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24uICovXG4gICAgeFBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWDtcblxuICAgIC8qKiBUaGUgeS1heGlzIHBvc2l0aW9uIG9mIHRoZSBkcm9wZG93bi4gKi9cbiAgICB5UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25ZO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBvdmVybGFwIHRoZSBkcm9wZG93biB0cmlnZ2VyIGhvcml6b250YWxseS4gKi9cbiAgICBvdmVybGFwVHJpZ2dlclg6IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gc2hvdWxkIG92ZXJsYXAgdGhlIGRyb3Bkb3duIHRyaWdnZXIgdmVydGljYWxseS4gKi9cbiAgICBvdmVybGFwVHJpZ2dlclk6IGJvb2xlYW47XG5cbiAgICAvKiogQ2xhc3MgdG8gYmUgYXBwbGllZCB0byB0aGUgZHJvcGRvd24ncyBiYWNrZHJvcC4gKi9cbiAgICBiYWNrZHJvcENsYXNzOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaGFzIGEgYmFja2Ryb3AuICovXG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgYG1jLWRyb3Bkb3duYC4gKi9cbmV4cG9ydCBjb25zdCBNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnM+KCdtYy1kcm9wZG93bi1kZWZhdWx0LW9wdGlvbnMnLCB7XG4gICAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICAgICAgZmFjdG9yeTogTUNfRFJPUERPV05fREVGQVVMVF9PUFRJT05TX0ZBQ1RPUllcbiAgICB9KTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0RST1BET1dOX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1jRHJvcGRvd25EZWZhdWx0T3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3ZlcmxhcFRyaWdnZXJYOiB0cnVlLFxuICAgICAgICBvdmVybGFwVHJpZ2dlclk6IGZhbHNlLFxuICAgICAgICB4UG9zaXRpb246ICdhZnRlcicsXG4gICAgICAgIHlQb3NpdGlvbjogJ2JlbG93JyxcbiAgICAgICAgYmFja2Ryb3BDbGFzczogJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJ1xuICAgIH07XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZHJvcGRvd24nLFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93bicsXG4gICAgdGVtcGxhdGVVcmw6ICdkcm9wZG93bi5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHJvcGRvd24uc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBtY0Ryb3Bkb3duQW5pbWF0aW9ucy50cmFuc2Zvcm1Ecm9wZG93bixcbiAgICAgICAgbWNEcm9wZG93bkFuaW1hdGlvbnMuZmFkZUluSXRlbXNcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1DX0RST1BET1dOX1BBTkVMLCB1c2VFeGlzdGluZzogTWNEcm9wZG93biB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgTWNEcm9wZG93blBhbmVsPE1jRHJvcGRvd25JdGVtPiwgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBpbiB0aGUgWCBheGlzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHhQb3NpdGlvbigpOiBEcm9wZG93blBvc2l0aW9uWCB7XG4gICAgICAgIHJldHVybiB0aGlzLl94UG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0IHhQb3NpdGlvbih2YWx1ZTogRHJvcGRvd25Qb3NpdGlvblgpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnYmVmb3JlJyAmJiB2YWx1ZSAhPT0gJ2FmdGVyJykge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3hQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8qKiBQb3NpdGlvbiBvZiB0aGUgZHJvcGRvd24gaW4gdGhlIFkgYXhpcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCB5UG9zaXRpb24oKTogRHJvcGRvd25Qb3NpdGlvblkge1xuICAgICAgICByZXR1cm4gdGhpcy5feVBvc2l0aW9uO1xuICAgIH1cblxuICAgIHNldCB5UG9zaXRpb24odmFsdWU6IERyb3Bkb3duUG9zaXRpb25ZKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJ2Fib3ZlJyAmJiB2YWx1ZSAhPT0gJ2JlbG93Jykge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duSW52YWxpZFBvc2l0aW9uWSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3lQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBzaG91bGQgb3ZlcmxhcCBpdHMgdHJpZ2dlciB2ZXJ0aWNhbGx5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG92ZXJsYXBUcmlnZ2VyWSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJsYXBUcmlnZ2VyWTtcbiAgICB9XG5cbiAgICBzZXQgb3ZlcmxhcFRyaWdnZXJZKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXBUcmlnZ2VyWSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHNob3VsZCBvdmVybGFwIGl0cyB0cmlnZ2VyIGhvcml6b250YWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBvdmVybGFwVHJpZ2dlclgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdmVybGFwVHJpZ2dlclg7XG4gICAgfVxuXG4gICAgc2V0IG92ZXJsYXBUcmlnZ2VyWCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9vdmVybGFwVHJpZ2dlclggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICAgIH1cblxuICAgIHNldCBoYXNCYWNrZHJvcCh2YWx1ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgdGFrZXMgY2xhc3NlcyBzZXQgb24gdGhlIGhvc3QgbWMtZHJvcGRvd24gZWxlbWVudCBhbmQgYXBwbGllcyB0aGVtIG9uIHRoZVxuICAgICAqIGRyb3Bkb3duIHRlbXBsYXRlIHRoYXQgZGlzcGxheXMgaW4gdGhlIG92ZXJsYXkgY29udGFpbmVyLiAgT3RoZXJ3aXNlLCBpdCdzIGRpZmZpY3VsdFxuICAgICAqIHRvIHN0eWxlIHRoZSBjb250YWluaW5nIGRyb3Bkb3duIGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSBjbGFzc2VzIGxpc3Qgb2YgY2xhc3MgbmFtZXNcbiAgICAgKi9cbiAgICBASW5wdXQoJ2NsYXNzJylcbiAgICBzZXQgcGFuZWxDbGFzcyhjbGFzc2VzOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNQYW5lbENsYXNzID0gdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3M7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzUGFuZWxDbGFzcyAmJiBwcmV2aW91c1BhbmVsQ2xhc3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91c1BhbmVsQ2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0W2NsYXNzTmFtZV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c1BhbmVsQ2xhc3MgPSBjbGFzc2VzO1xuXG4gICAgICAgIGlmIChjbGFzc2VzICYmIGNsYXNzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGl0KCcgJykuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdFtjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfeFBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uWCA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLnhQb3NpdGlvbjtcbiAgICBwcml2YXRlIF95UG9zaXRpb246IERyb3Bkb3duUG9zaXRpb25ZID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMueVBvc2l0aW9uO1xuICAgIHByaXZhdGUgX292ZXJsYXBUcmlnZ2VyWDogYm9vbGVhbiA9IHRoaXMuX2RlZmF1bHRPcHRpb25zLm92ZXJsYXBUcmlnZ2VyWDtcbiAgICBwcml2YXRlIF9vdmVybGFwVHJpZ2dlclk6IGJvb2xlYW4gPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5vdmVybGFwVHJpZ2dlclk7XG4gICAgcHJpdmF0ZSBfaGFzQmFja2Ryb3A6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0aGlzLl9kZWZhdWx0T3B0aW9ucy5oYXNCYWNrZHJvcDtcblxuICAgIC8qKiBDb25maWcgb2JqZWN0IHRvIGJlIHBhc3NlZCBpbnRvIHRoZSBkcm9wZG93bidzIG5nQ2xhc3MgKi9cbiAgICBjbGFzc0xpc3Q6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbiAgICAvKiogQ3VycmVudCBzdGF0ZSBvZiB0aGUgcGFuZWwgYW5pbWF0aW9uLiAqL1xuICAgIHBhbmVsQW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgPSAndm9pZCc7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgYW4gYW5pbWF0aW9uIG9uIHRoZSBkcm9wZG93biBjb21wbGV0ZXMuICovXG4gICAgYW5pbWF0aW9uRG9uZSA9IG5ldyBTdWJqZWN0PEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIGFuaW1hdGluZy4gKi9cbiAgICBpc0FuaW1hdGluZzogYm9vbGVhbjtcblxuICAgIC8qKiBQYXJlbnQgZHJvcGRvd24gb2YgdGhlIGN1cnJlbnQgZHJvcGRvd24gcGFuZWwuICovXG4gICAgcGFyZW50OiBNY0Ryb3Bkb3duUGFuZWwgfCB1bmRlZmluZWQ7XG5cbiAgICAvKiogTGF5b3V0IGRpcmVjdGlvbiBvZiB0aGUgZHJvcGRvd24uICovXG4gICAgZGlyZWN0aW9uOiBEaXJlY3Rpb247XG5cbiAgICAvKiogQ2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIGJhY2tkcm9wIGVsZW1lbnQuICovXG4gICAgQElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nID0gdGhpcy5fZGVmYXVsdE9wdGlvbnMuYmFja2Ryb3BDbGFzcztcblxuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IGZhbHNlIH0pIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiB0aGUgaXRlbXMgaW5zaWRlIG9mIGEgZHJvcGRvd24uXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0Ryb3Bkb3duSXRlbSkgaXRlbXM6IFF1ZXJ5TGlzdDxNY0Ryb3Bkb3duSXRlbT47XG5cbiAgICAvKipcbiAgICAgKiBEcm9wZG93biBjb250ZW50IHRoYXQgd2lsbCBiZSByZW5kZXJlZCBsYXppbHkuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93bkNvbnRlbnQsIHsgc3RhdGljOiBmYWxzZSB9KSBsYXp5Q29udGVudDogTWNEcm9wZG93bkNvbnRlbnQ7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBjbG9zZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjx2b2lkIHwgJ2NsaWNrJyB8ICdrZXlkb3duJyB8ICd0YWInPigpO1xuXG4gICAgcHJpdmF0ZSBwcmV2aW91c1BhbmVsQ2xhc3M6IHN0cmluZztcblxuICAgIHByaXZhdGUga2V5TWFuYWdlcjogRm9jdXNLZXlNYW5hZ2VyPE1jRHJvcGRvd25JdGVtPjtcblxuICAgIC8qKiBEcm9wZG93biBpdGVtcyBpbnNpZGUgdGhlIGN1cnJlbnQgZHJvcGRvd24uICovXG4gICAgcHJpdmF0ZSBpdGVtc0FycmF5OiBNY0Ryb3Bkb3duSXRlbVtdID0gW107XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGFtb3VudCBvZiBkcm9wZG93biBpdGVtcyBjaGFuZ2VzLiAqL1xuICAgIHByaXZhdGUgaXRlbUNoYW5nZXMgPSBuZXcgU3ViamVjdDxNY0Ryb3Bkb3duSXRlbVtdPigpO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB0YWIgZXZlbnRzIG9uIHRoZSBkcm9wZG93biBwYW5lbCAqL1xuICAgIHByaXZhdGUgdGFiU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChNQ19EUk9QRE9XTl9ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zOiBNY0Ryb3Bkb3duRGVmYXVsdE9wdGlvbnMpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb25DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgRm9jdXNLZXlNYW5hZ2VyPE1jRHJvcGRvd25JdGVtPih0aGlzLml0ZW1zKVxuICAgICAgICAgICAgLndpdGhXcmFwKClcbiAgICAgICAgICAgIC53aXRoVHlwZUFoZWFkKCk7XG5cbiAgICAgICAgdGhpcy50YWJTdWJzY3JpcHRpb24gPSB0aGlzLmtleU1hbmFnZXIudGFiT3V0LnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlZC5lbWl0KCd0YWInKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGFiU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBob3ZlcmVkIGRyb3Bkb3duIGl0ZW0gY2hhbmdlcy4gKi9cbiAgICBob3ZlcmVkKCk6IE9ic2VydmFibGU8TWNEcm9wZG93bkl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCh0aGlzLml0ZW1zQXJyYXkpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKChpdGVtcykgPT4gbWVyZ2UoLi4uaXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmhvdmVyZWQpKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlIGEga2V5Ym9hcmQgZXZlbnQgZnJvbSB0aGUgZHJvcGRvd24sIGRlbGVnYXRpbmcgdG8gdGhlIGFwcHJvcHJpYXRlIGFjdGlvbi4gKi9cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5kaXJlY3Rpb24gPT09ICdsdHInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2tleWRvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZWQuZW1pdCgna2V5ZG93bicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XIHx8IGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdrZXlib2FyZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkLmVtaXQoJ2NsaWNrJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGRyb3Bkb3duLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gQWN0aW9uIGZyb20gd2hpY2ggdGhlIGZvY3VzIG9yaWdpbmF0ZWQuIFVzZWQgdG8gc2V0IHRoZSBjb3JyZWN0IHN0eWxpbmcuXG4gICAgICovXG4gICAgZm9jdXNGaXJzdEl0ZW0ob3JpZ2luOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJyk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIHRoZSBjb250ZW50IGlzIHJlbmRlcmVkIGxhemlseSwgaXQgdGFrZXMgYSBiaXQgYmVmb3JlIHRoZSBpdGVtcyBhcmUgaW5zaWRlIHRoZSBET00uXG4gICAgICAgIGlmICh0aGlzLmxhenlDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKG9yaWdpbikuc2V0Rmlyc3RJdGVtQWN0aXZlKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKG9yaWdpbikuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGFjdGl2ZSBpdGVtIGluIHRoZSBkcm9wZG93bi4gVGhpcyBpcyB1c2VkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCwgYWxsb3dpbmdcbiAgICAgKiB0aGUgdXNlciB0byBzdGFydCBmcm9tIHRoZSBmaXJzdCBvcHRpb24gd2hlbiBwcmVzc2luZyB0aGUgZG93biBhcnJvdy5cbiAgICAgKi9cbiAgICByZXNldEFjdGl2ZUl0ZW0oKSB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBkcm9wZG93biBpdGVtIHdpdGggdGhlIGRyb3Bkb3duLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBhZGRJdGVtKGl0ZW06IE1jRHJvcGRvd25JdGVtKSB7XG4gICAgICAgIC8vIFdlIHJlZ2lzdGVyIHRoZSBpdGVtcyB0aHJvdWdoIHRoaXMgbWV0aG9kLCByYXRoZXIgdGhhbiBwaWNraW5nIHRoZW0gdXAgdGhyb3VnaFxuICAgICAgICAvLyBgQ29udGVudENoaWxkcmVuYCwgYmVjYXVzZSB3ZSBuZWVkIHRoZSBpdGVtcyB0byBiZSBwaWNrZWQgdXAgYnkgdGhlaXIgY2xvc2VzdFxuICAgICAgICAvLyBgbWMtZHJvcGRvd25gIGFuY2VzdG9yLiBJZiB3ZSB1c2VkIGBAQ29udGVudENoaWxkcmVuKE1jRHJvcGRvd25JdGVtLCB7ZGVzY2VuZGFudHM6IHRydWV9KWAsXG4gICAgICAgIC8vIGFsbCBkZXNjZW5kYW50IGl0ZW1zIHdpbGwgYmxlZWQgaW50byB0aGUgdG9wLWxldmVsIGRyb3Bkb3duIGluIHRoZSBjYXNlIHdoZXJlIHRoZSBjb25zdW1lclxuICAgICAgICAvLyBoYXMgYG1jLWRyb3Bkb3duYCBpbnN0YW5jZXMgbmVzdGVkIGluc2lkZSBlYWNoIG90aGVyLlxuICAgICAgICBpZiAodGhpcy5pdGVtc0FycmF5LmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNoYW5nZXMubmV4dCh0aGlzLml0ZW1zQXJyYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGRyb3Bkb3duLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICByZW1vdmVJdGVtKGl0ZW06IE1jRHJvcGRvd25JdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtc0FycmF5LmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbXNBcnJheS5pbmRleE9mKGl0ZW0pID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2hhbmdlcy5uZXh0KHRoaXMuaXRlbXNBcnJheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGNsYXNzZXMgdG8gdGhlIGRyb3Bkb3duIHBhbmVsIGJhc2VkIG9uIGl0cyBwb3NpdGlvbi4gQ2FuIGJlIHVzZWQgYnlcbiAgICAgKiBjb25zdW1lcnMgdG8gYWRkIHNwZWNpZmljIHN0eWxpbmcgYmFzZWQgb24gdGhlIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSBwb3NYIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBhbG9uZyB0aGUgeCBheGlzLlxuICAgICAqIEBwYXJhbSBwb3NZIFBvc2l0aW9uIG9mIHRoZSBkcm9wZG93biBhbG9uZyB0aGUgeSBheGlzLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbkNsYXNzZXMocG9zWDogRHJvcGRvd25Qb3NpdGlvblggPSB0aGlzLnhQb3NpdGlvbiwgcG9zWTogRHJvcGRvd25Qb3NpdGlvblkgPSB0aGlzLnlQb3NpdGlvbikge1xuICAgICAgICBjb25zdCBjbGFzc2VzID0gdGhpcy5jbGFzc0xpc3Q7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWJlZm9yZSddID0gcG9zWCA9PT0gJ2JlZm9yZSc7XG4gICAgICAgIGNsYXNzZXNbJ21jLWRyb3Bkb3duLWFmdGVyJ10gPSBwb3NYID09PSAnYWZ0ZXInO1xuICAgICAgICBjbGFzc2VzWydtYy1kcm9wZG93bi1hYm92ZSddID0gcG9zWSA9PT0gJ2Fib3ZlJztcbiAgICAgICAgY2xhc3Nlc1snbWMtZHJvcGRvd24tYmVsb3cnXSA9IHBvc1kgPT09ICdiZWxvdyc7XG4gICAgfVxuXG4gICAgLyoqIFN0YXJ0cyB0aGUgZW50ZXIgYW5pbWF0aW9uLiAqL1xuICAgIHN0YXJ0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBhbmVsQW5pbWF0aW9uU3RhdGUgPSAnZW50ZXInO1xuICAgIH1cblxuICAgIC8qKiBSZXNldHMgdGhlIHBhbmVsIGFuaW1hdGlvbiB0byBpdHMgaW5pdGlhbCBzdGF0ZS4gKi9cbiAgICByZXNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5wYW5lbEFuaW1hdGlvblN0YXRlID0gJ3ZvaWQnO1xuICAgIH1cblxuICAgIC8qKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgcGFuZWwgYW5pbWF0aW9uIGNvbXBsZXRlcy4gKi9cbiAgICBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRG9uZS5uZXh0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0aGUgY29udGVudCBlbGVtZW50IHRvIHRoZSB0b3AgYXMgc29vbiBhcyB0aGUgYW5pbWF0aW9uIHN0YXJ0cy4gVGhpcyBpcyBuZWNlc3NhcnksXG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3QgaXRlbSB3aGlsZSBpdCdzIHN0aWxsIGJlaW5nIGFuaW1hdGVkLCB3aGljaCBjYW4gdGhyb3dcbiAgICAgICAgLy8gdGhlIGJyb3dzZXIgb2ZmIHdoZW4gaXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIHBvc2l0aW9uLiBBbHRlcm5hdGl2ZWx5IHdlIGNhbiBtb3ZlIGZvY3VzXG4gICAgICAgIC8vIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBkb25lLCBob3dldmVyIG1vdmluZyBmb2N1cyBhc3luY2hyb25vdXNseSB3aWxsIGludGVycnVwdCBzY3JlZW5cbiAgICAgICAgLy8gcmVhZGVycyB3aGljaCBhcmUgaW4gdGhlIHByb2Nlc3Mgb2YgcmVhZGluZyBvdXQgdGhlIGRyb3Bkb3duIGFscmVhZHkuIFdlIHRha2UgdGhlIGBlbGVtZW50YFxuICAgICAgICAvLyBmcm9tIHRoZSBgZXZlbnRgIHNpbmNlIHdlIGNhbid0IHVzZSBhIGBWaWV3Q2hpbGRgIHRvIGFjY2VzcyB0aGUgcGFuZS5cbiAgICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicgJiYgdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgZXZlbnQuZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
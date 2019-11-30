/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Directive, TemplateRef, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, Inject, InjectionToken, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Optional, Input, ViewChild, NgZone, ContentChildren, ContentChild, Output, EventEmitter, Self, NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { TemplatePortal, DomPortalOutlet } from '@angular/cdk/portal';
import { Subject, merge, Subscription, of, asapScheduler } from 'rxjs';
import { __extends } from 'tslib';
import { FocusMonitor, FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { Directionality } from '@angular/cdk/bidi';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, ESCAPE, SPACE, ENTER } from '@ptsecurity/cdk/keycodes';
import { startWith, switchMap, take, filter, takeUntil, delay } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { trigger, state, style, transition, group, query, animate } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Dropdown content that will be rendered lazily once the dropdown is opened.
 */
var McDropdownContent = /** @class */ (function () {
    function McDropdownContent(_template, _componentFactoryResolver, _appRef, _injector, _viewContainerRef, _document) {
        this._template = _template;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._document = _document;
        /**
         * Emits when the dropdown content has been attached.
         */
        this.attached = new Subject();
    }
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    /**
     * Attaches the content with a particular context.
     * \@docs-private
     * @param {?=} context
     * @return {?}
     */
    McDropdownContent.prototype.attach = /**
     * Attaches the content with a particular context.
     * \@docs-private
     * @param {?=} context
     * @return {?}
     */
    function (context) {
        if (context === void 0) { context = {}; }
        if (!this.portal) {
            this.portal = new TemplatePortal(this._template, this._viewContainerRef);
        }
        this.detach();
        if (!this.outlet) {
            this.outlet = new DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
        }
        /** @type {?} */
        var element = this._template.elementRef.nativeElement;
        // Because we support opening the same dropdown from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        (/** @type {?} */ (element.parentNode)).insertBefore(this.outlet.outletElement, element);
        this.portal.attach(this.outlet, context);
        this.attached.next();
    };
    /**
     * Detaches the content.
     * @docs-private
     */
    /**
     * Detaches the content.
     * \@docs-private
     * @return {?}
     */
    McDropdownContent.prototype.detach = /**
     * Detaches the content.
     * \@docs-private
     * @return {?}
     */
    function () {
        if (this.portal.isAttached) {
            this.portal.detach();
        }
    };
    /**
     * @return {?}
     */
    McDropdownContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.outlet) {
            this.outlet.dispose();
        }
    };
    McDropdownContent.decorators = [
        { type: Directive, args: [{
                    selector: 'ng-template[mcDropdownContent]'
                },] },
    ];
    /** @nocollapse */
    McDropdownContent.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return McDropdownContent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * \@docs-private
 * @type {?}
 */
var MC_DROPDOWN_PANEL = new InjectionToken('MC_DROPDOWN_PANEL');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Boilerplate for applying mixins to McDropdownItem.
/**
 * \@docs-private
 */
var  
// Boilerplate for applying mixins to McDropdownItem.
/**
 * \@docs-private
 */
McDropdownItemBase = /** @class */ (function () {
    function McDropdownItemBase() {
    }
    return McDropdownItemBase;
}());
// tslint:disable-next-line:naming-convention
/** @type {?} */
var McDropdownItemMixinBase = mixinDisabled(McDropdownItemBase);
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
var McDropdownItem = /** @class */ (function (_super) {
    __extends(McDropdownItem, _super);
    function McDropdownItem(_elementRef, document, _focusMonitor, _parentDropdownPanel) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._parentDropdownPanel = _parentDropdownPanel;
        /**
         * ARIA role for the dropdown item.
         */
        _this.role = 'menuitem';
        /**
         * Stream that emits when the dropdown item is hovered.
         */
        _this.hovered = new Subject();
        /**
         * Whether the dropdown item is highlighted.
         */
        _this.highlighted = false;
        /**
         * Whether the dropdown item acts as a trigger for a nested dropdown.
         */
        _this.triggersNestedDropdown = false;
        if (_focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for dropdown items only when the focus was not caused by a
            // mouse or touch interaction.
            _focusMonitor.monitor(_this._elementRef.nativeElement, false);
        }
        if (_parentDropdownPanel && _parentDropdownPanel.addItem) {
            _parentDropdownPanel.addItem(_this);
        }
        _this.document = document;
        return _this;
    }
    /** Focuses the dropdown item. */
    /**
     * Focuses the dropdown item.
     * @param {?=} origin
     * @return {?}
     */
    McDropdownItem.prototype.focus = /**
     * Focuses the dropdown item.
     * @param {?=} origin
     * @return {?}
     */
    function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this.getHostElement(), origin);
        }
        else {
            this.getHostElement().focus();
        }
    };
    /**
     * @return {?}
     */
    McDropdownItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
        if (this._parentDropdownPanel && this._parentDropdownPanel.removeItem) {
            this._parentDropdownPanel.removeItem(this);
        }
        this.hovered.complete();
    };
    /** Used to set the `tabindex`. */
    /**
     * Used to set the `tabindex`.
     * @return {?}
     */
    McDropdownItem.prototype.getTabIndex = /**
     * Used to set the `tabindex`.
     * @return {?}
     */
    function () {
        return this.disabled ? '-1' : '0';
    };
    /** Returns the host DOM element. */
    /**
     * Returns the host DOM element.
     * @return {?}
     */
    McDropdownItem.prototype.getHostElement = /**
     * Returns the host DOM element.
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    /** Prevents the default element actions if it is disabled. */
    /**
     * Prevents the default element actions if it is disabled.
     * @param {?} event
     * @return {?}
     */
    McDropdownItem.prototype.checkDisabled = /**
     * Prevents the default element actions if it is disabled.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /** Emits to the hover stream. */
    /**
     * Emits to the hover stream.
     * @return {?}
     */
    McDropdownItem.prototype.handleMouseEnter = /**
     * Emits to the hover stream.
     * @return {?}
     */
    function () {
        this.hovered.next(this);
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    McDropdownItem.prototype.getLabel = /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.content.nativeElement;
        // tslint:disable-next-line:no-magic-numbers
        /** @type {?} */
        var textNodeType = this.document ? this.document.TEXT_NODE : 3;
        /** @type {?} */
        var output = '';
        if (element.childNodes) {
            /** @type {?} */
            var length_1 = element.childNodes.length;
            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (var i = 0; i < length_1; i++) {
                if (element.childNodes[i].nodeType === textNodeType) {
                    output += element.childNodes[i].textContent;
                }
            }
        }
        return output.trim();
    };
    McDropdownItem.decorators = [
        { type: Component, args: [{
                    selector: 'mc-dropdown-item, [mc-dropdown-item]',
                    exportAs: 'mcDropdownItem',
                    inputs: ['disabled'],
                    host: {
                        '[attr.role]': 'role',
                        class: 'mc-dropdown__item',
                        '[class.mc-dropdown__item_highlighted]': 'highlighted',
                        '[attr.tabindex]': 'getTabIndex()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'checkDisabled($event)',
                        '(mouseenter)': 'handleMouseEnter()'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n        <div #content>\n            <ng-content></ng-content>\n        </div>\n        <i *ngIf=\"triggersNestedDropdown\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown__trigger\"></i>\n    "
                },] },
    ];
    /** @nocollapse */
    McDropdownItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: FocusMonitor },
        { type: undefined, decorators: [{ type: Inject, args: [MC_DROPDOWN_PANEL,] }, { type: Optional }] }
    ]; };
    McDropdownItem.propDecorators = {
        role: [{ type: Input }],
        content: [{ type: ViewChild, args: ['content', { static: false },] }]
    };
    return McDropdownItem;
}(McDropdownItemMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Throws an exception for the case when dropdown trigger doesn't have a valid mc-dropdown instance
 * \@docs-private
 * @return {?}
 */
function throwMcDropdownMissingError() {
    throw Error("mcDropdownTriggerFor: must pass in an mc-dropdown instance.\n    Example:\n      <mc-dropdown #dropdown=\"mcDropdown\"></mc-dropdown>\n      <button [mcDropdownTriggerFor]=\"dropdown\"></button>");
}
/**
 * Throws an exception for the case when dropdown's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * \@docs-private
 * @return {?}
 */
function throwMcDropdownInvalidPositionX() {
    throw Error("xPosition value must be either 'before' or after'.\n      Example: <mc-dropdown xPosition=\"before\" #dropdown=\"mcDropdown\"></mc-dropdown>");
}
/**
 * Throws an exception for the case when dropdown's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * \@docs-private
 * @return {?}
 */
function throwMcDropdownInvalidPositionY() {
    throw Error("yPosition value must be either 'above' or below'.\n      Example: <mc-dropdown yPosition=\"above\" #dropdown=\"mcDropdown\"></mc-dropdown>");
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Animations used by the mc-dropdown component.
 * \@docs-private
 * @type {?}
 */
var mcDropdownAnimations = {
    /**
     * This animation controls the dropdown panel's entry and exit from the page.
     *
     * When the dropdown panel is added to the DOM, it scales in and fades in its border.
     *
     * When the dropdown panel is removed from the DOM, it simply fades out after a brief
     * delay to display the ripple.
     */
    transformDropdown: trigger('transformDropdown', [
        state('void', style({
            opacity: 0,
            transform: 'scale(0.8)'
        })),
        transition('void => enter', group([
            query('.mc-dropdown__content', animate('50ms linear', style({ opacity: 1 }))),
            animate('50ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scale(1)' }))
        ])),
        transition('* => void', animate('50ms 25ms linear', style({ opacity: 0 })))
    ]),
    /**
     * This animation fades in the background color and content of the dropdown panel
     * after its containing element is scaled in.
     */
    fadeInItems: trigger('fadeInItems', [
        // now. Remove next time we do breaking changes.
        state('showing', style({ opacity: 1 })),
        transition('void => *', [
            style({ opacity: 0 }),
            animate('200ms 60ms cubic-bezier(0.55, 0, 0.55, 0.2)')
        ])
    ])
};
/** @type {?} */
var fadeInItems = mcDropdownAnimations.fadeInItems;
/** @type {?} */
var transformDropdown = mcDropdownAnimations.transformDropdown;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token to be used to override the default options for `mc-dropdown`.
 * @type {?}
 */
var MC_DROPDOWN_DEFAULT_OPTIONS = new InjectionToken('mc-dropdown-default-options', {
    providedIn: 'root',
    factory: MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
// tslint:disable-next-line:naming-convention
function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY() {
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
        function (items) { return merge.apply(void 0, items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.hovered; }))); })));
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
        var keyCode = event.key || event.keyCode;
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
                    template: "<ng-template><div class=\"mc-dropdown__panel\" [ngClass]=\"classList\" (keydown)=\"handleKeydown($event)\" (click)=\"closed.emit('click')\" [@transformDropdown]=\"panelAnimationState\" (@transformDropdown.start)=\"onAnimationStart($event)\" (@transformDropdown.done)=\"onAnimationDone($event)\" tabindex=\"-1\" role=\"dropdown\"><div class=\"mc-dropdown__content\"><ng-content></ng-content></div></div></ng-template>",
                    styles: [".mc-dropdown__item{display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:0;padding:5px 15px;text-align:left;white-space:nowrap}.mc-dropdown__item:not([disabled]){cursor:pointer}.mc-dropdown__item .mc-dropdown__item-caption{margin-top:4px}.mc-dropdown__trigger{margin-left:auto;padding-left:16px}.mc-dropdown__panel{min-width:100%;overflow:auto;margin-top:-1px;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-dropdown__content h1,.mc-dropdown__content h2,.mc-dropdown__content h3,.mc-dropdown__content h4,.mc-dropdown__content h5{padding:8px 16px 4px 16px;margin:0}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'mcDropdown',
                    animations: [
                        mcDropdownAnimations.transformDropdown,
                        mcDropdownAnimations.fadeInItems
                    ],
                    providers: [
                        { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
                    ]
                },] },
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token that determines the scroll handling while the dropdown is open.
 * @type {?}
 */
var MC_DROPDOWN_SCROLL_STRATEGY = new InjectionToken('mc-dropdown-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
// tslint:disable-next-line:naming-convention
function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition(); });
}
/**
 * \@docs-private
 * @type {?}
 */
var MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DROPDOWN_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
};
/**
 * Default top padding of the nested dropdown panel.
 * @type {?}
 */
var NESTED_PANEL_TOP_PADDING = 2;
/**
 * Options for binding a passive event listener.
 * @type {?}
 */
var passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
var McDropdownTrigger = /** @class */ (function () {
    function McDropdownTrigger(_overlay, _element, _viewContainerRef, _scrollStrategy, _parent, _dropdownItemInstance, _dir, _focusMonitor) {
        var _this = this;
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._parent = _parent;
        this._dropdownItemInstance = _dropdownItemInstance;
        this._dir = _dir;
        this._focusMonitor = _focusMonitor;
        // Tracking input type is necessary so it's possible to only auto-focus
        // the first item of the list when the dropdown is opened via the keyboard
        this.openedBy = null;
        /**
         * Event emitted when the associated dropdown is opened.
         */
        this.dropdownOpened = new EventEmitter();
        /**
         * Event emitted when the associated dropdown is closed.
         */
        this.dropdownClosed = new EventEmitter();
        this._opened = false;
        this.overlayRef = null;
        this.closeSubscription = Subscription.EMPTY;
        this.hoverSubscription = Subscription.EMPTY;
        /**
         * Handles touch start events on the trigger.
         * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
         */
        this.handleTouchStart = (/**
         * @return {?}
         */
        function () { return _this.openedBy = 'touch'; });
        _element.nativeElement.addEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
        if (_dropdownItemInstance) {
            _dropdownItemInstance.triggersNestedDropdown = this.triggersNestedDropdown();
        }
    }
    Object.defineProperty(McDropdownTrigger.prototype, "dir", {
        /** The text direction of the containing app. */
        get: /**
         * The text direction of the containing app.
         * @return {?}
         */
        function () {
            return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdownTrigger.prototype, "dropdown", {
        /** References the dropdown instance that the trigger is associated with. */
        get: /**
         * References the dropdown instance that the trigger is associated with.
         * @return {?}
         */
        function () {
            return this._dropdown;
        },
        set: /**
         * @param {?} dropdown
         * @return {?}
         */
        function (dropdown) {
            var _this = this;
            if (dropdown === this._dropdown) {
                return;
            }
            this._dropdown = dropdown;
            this.closeSubscription.unsubscribe();
            if (dropdown) {
                this.closeSubscription = dropdown.closed.asObservable().subscribe((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) {
                    _this.destroy();
                    // If a click closed the dropdown, we should close the entire chain of nested dropdowns.
                    if ((reason === 'click' || reason === 'tab') && _this._parent) {
                        _this._parent.closed.emit(reason);
                    }
                }));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdownTrigger.prototype, "opened", {
        /** Whether the dropdown is open. */
        get: /**
         * Whether the dropdown is open.
         * @return {?}
         */
        function () {
            return this._opened;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McDropdownTrigger.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.check();
        this.handleHover();
    };
    /**
     * @return {?}
     */
    McDropdownTrigger.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
        this._element.nativeElement.removeEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
        this.cleanUpSubscriptions();
        this.closeSubscription.unsubscribe();
    };
    /** Whether the dropdown triggers a nested dropdown or a top-level one. */
    /**
     * Whether the dropdown triggers a nested dropdown or a top-level one.
     * @return {?}
     */
    McDropdownTrigger.prototype.triggersNestedDropdown = /**
     * Whether the dropdown triggers a nested dropdown or a top-level one.
     * @return {?}
     */
    function () {
        return !!(this._dropdownItemInstance && this._parent);
    };
    /** Toggles the dropdown between the open and closed states. */
    /**
     * Toggles the dropdown between the open and closed states.
     * @return {?}
     */
    McDropdownTrigger.prototype.toggle = /**
     * Toggles the dropdown between the open and closed states.
     * @return {?}
     */
    function () {
        // tslint:disable-next-line:no-void-expression
        return this._opened ? this.close() : this.open();
    };
    /** Opens the dropdown. */
    /**
     * Opens the dropdown.
     * @return {?}
     */
    McDropdownTrigger.prototype.open = /**
     * Opens the dropdown.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._opened) {
            return;
        }
        this.check();
        /** @type {?} */
        var overlayRef = this.createOverlay();
        /** @type {?} */
        var overlayConfig = overlayRef.getConfig();
        this.setPosition((/** @type {?} */ (overlayConfig.positionStrategy)));
        overlayConfig.hasBackdrop = this.dropdown.hasBackdrop == null ? !this.triggersNestedDropdown() :
            this.dropdown.hasBackdrop;
        overlayRef.attach(this.getPortal());
        if (this.dropdown.lazyContent) {
            this.dropdown.lazyContent.attach(this.data);
        }
        this.closeSubscription = this.closingActions().subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
        this.init();
        if (this.dropdown instanceof McDropdown) {
            this.dropdown.startAnimation();
        }
    };
    /** Closes the dropdown. */
    /**
     * Closes the dropdown.
     * @return {?}
     */
    McDropdownTrigger.prototype.close = /**
     * Closes the dropdown.
     * @return {?}
     */
    function () {
        this.dropdown.closed.emit();
    };
    /**
     * Focuses the dropdown trigger.
     * @param origin Source of the dropdown trigger's focus.
     */
    /**
     * Focuses the dropdown trigger.
     * @param {?=} origin Source of the dropdown trigger's focus.
     * @return {?}
     */
    McDropdownTrigger.prototype.focus = /**
     * Focuses the dropdown trigger.
     * @param {?=} origin Source of the dropdown trigger's focus.
     * @return {?}
     */
    function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._element.nativeElement, origin);
        }
        else {
            this._element.nativeElement.focus();
        }
    };
    /** Handles mouse presses on the trigger. */
    /**
     * Handles mouse presses on the trigger.
     * @param {?} event
     * @return {?}
     */
    McDropdownTrigger.prototype.handleMousedown = /**
     * Handles mouse presses on the trigger.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Since right or middle button clicks won't trigger the `click` event,
        // we shouldn't consider the dropdown as opened by mouse in those cases.
        this.openedBy = event.button === 0 ? 'mouse' : null;
        // Since clicking on the trigger won't close the dropdown if it opens a nested dropdown,
        // we should prevent focus from moving onto it via click to avoid the
        // highlight from lingering on the dropdown item.
        if (this.triggersNestedDropdown()) {
            event.preventDefault();
        }
    };
    /** Handles key presses on the trigger. */
    /**
     * Handles key presses on the trigger.
     * @param {?} event
     * @return {?}
     */
    McDropdownTrigger.prototype.handleKeydown = /**
     * Handles key presses on the trigger.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        var keyCode = event.key || event.keyCode;
        if (keyCode === SPACE || keyCode === ENTER) {
            this.open();
        }
        if (this.triggersNestedDropdown() && ((keyCode === RIGHT_ARROW && this.dir === 'ltr') ||
            (keyCode === LEFT_ARROW && this.dir === 'rtl'))) {
            this.open();
        }
    };
    /** Handles click events on the trigger. */
    /**
     * Handles click events on the trigger.
     * @param {?} event
     * @return {?}
     */
    McDropdownTrigger.prototype.handleClick = /**
     * Handles click events on the trigger.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.triggersNestedDropdown()) {
            // Stop event propagation to avoid closing the parent dropdown.
            event.stopPropagation();
            this.open();
        }
        else {
            this.toggle();
        }
    };
    /** Closes the dropdown and does the necessary cleanup. */
    /**
     * Closes the dropdown and does the necessary cleanup.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.destroy = /**
     * Closes the dropdown and does the necessary cleanup.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.overlayRef || !this.opened) {
            return;
        }
        /** @type {?} */
        var dropdown = this.dropdown;
        this.closeSubscription.unsubscribe();
        this.overlayRef.detach();
        if (dropdown instanceof McDropdown) {
            dropdown.resetAnimation();
            if (dropdown.lazyContent) {
                // Wait for the exit animation to finish before detaching the content.
                dropdown.animationDone
                    .pipe(filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return event.toState === 'void'; })), take(1), 
                // Interrupt if the content got re-attached.
                takeUntil(dropdown.lazyContent.attached))
                    .subscribe({ next: (/**
                     * @return {?}
                     */
                    function () { return dropdown.lazyContent.detach(); }), error: undefined, complete: (/**
                     * @return {?}
                     */
                    function () {
                        // No matter whether the content got re-attached, reset the dropdown.
                        _this.reset();
                    }) });
            }
            else {
                this.reset();
            }
        }
        else {
            this.reset();
            if (dropdown.lazyContent) {
                dropdown.lazyContent.detach();
            }
        }
    };
    /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     */
    /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.init = /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     * @private
     * @return {?}
     */
    function () {
        this.dropdown.parent = this.triggersNestedDropdown() ? this._parent : undefined;
        this.dropdown.direction = this.dir;
        this.setIsOpened(true);
        this.dropdown.focusFirstItem(this.openedBy || 'program');
    };
    /**
     * This method resets the dropdown when it's closed, most importantly restoring
     * focus to the dropdown trigger if the dropdown was opened via the keyboard.
     */
    /**
     * This method resets the dropdown when it's closed, most importantly restoring
     * focus to the dropdown trigger if the dropdown was opened via the keyboard.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.reset = /**
     * This method resets the dropdown when it's closed, most importantly restoring
     * focus to the dropdown trigger if the dropdown was opened via the keyboard.
     * @private
     * @return {?}
     */
    function () {
        this.setIsOpened(false);
        // We should reset focus if the user is navigating using a keyboard or
        // if we have a top-level trigger which might cause focus to be lost
        // when clicking on the backdrop.
        if (!this.openedBy) {
            // Note that the focus style will show up both for `program` and
            // `keyboard` so we don't have to specify which one it is.
            this.focus();
        }
        else if (!this.triggersNestedDropdown()) {
            this.focus(this.openedBy);
        }
        this.openedBy = null;
    };
    // set state rather than toggle to support triggers sharing a dropdown
    // set state rather than toggle to support triggers sharing a dropdown
    /**
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    McDropdownTrigger.prototype.setIsOpened = 
    // set state rather than toggle to support triggers sharing a dropdown
    /**
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        this._opened = isOpen;
        // tslint:disable-next-line:no-void-expression
        this._opened ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
        if (this.triggersNestedDropdown()) {
            this._dropdownItemInstance.highlighted = isOpen;
        }
    };
    /**
     * This method checks that a valid instance of McDropdown has been passed into
     * mcDropdownTriggerFor. If not, an exception is thrown.
     */
    /**
     * This method checks that a valid instance of McDropdown has been passed into
     * mcDropdownTriggerFor. If not, an exception is thrown.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.check = /**
     * This method checks that a valid instance of McDropdown has been passed into
     * mcDropdownTriggerFor. If not, an exception is thrown.
     * @private
     * @return {?}
     */
    function () {
        if (!this.dropdown) {
            throwMcDropdownMissingError();
        }
    };
    /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     */
    /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.createOverlay = /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     * @private
     * @return {?}
     */
    function () {
        if (!this.overlayRef) {
            /** @type {?} */
            var config = this.getOverlayConfig();
            this.subscribeToPositions((/** @type {?} */ (config.positionStrategy)));
            this.overlayRef = this._overlay.create(config);
            // Consume the `keydownEvents` in order to prevent them from going to another overlay.
            // Ideally we'd also have our keyboard event logic in here, however doing so will
            // break anybody that may have implemented the `McDropdownPanel` themselves.
            this.overlayRef.keydownEvents().subscribe();
        }
        return this.overlayRef;
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @private
     * @return {?} OverlayConfig
     */
    McDropdownTrigger.prototype.getOverlayConfig = /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @private
     * @return {?} OverlayConfig
     */
    function () {
        return new OverlayConfig({
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._element)
                .withLockedPosition()
                .withTransformOriginOn('.mc-dropdown__panel'),
            backdropClass: this.dropdown.backdropClass || 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this._scrollStrategy(),
            direction: this._dir
        });
    };
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the dropdown based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the dropdown based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     * @private
     * @param {?} position
     * @return {?}
     */
    McDropdownTrigger.prototype.subscribeToPositions = /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the dropdown based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     * @private
     * @param {?} position
     * @return {?}
     */
    function (position) {
        var _this = this;
        if (this.dropdown.setPositionClasses) {
            position.positionChanges.subscribe((/**
             * @param {?} change
             * @return {?}
             */
            function (change) {
                /** @type {?} */
                var posX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
                /** @type {?} */
                var posY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';
                (/** @type {?} */ (_this.dropdown.setPositionClasses))(posX, posY);
            }));
        }
    };
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @private
     * @param {?} positionStrategy Strategy whose position to update.
     * @return {?}
     */
    McDropdownTrigger.prototype.setPosition = /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @private
     * @param {?} positionStrategy Strategy whose position to update.
     * @return {?}
     */
    function (positionStrategy) {
        var _a = this.dropdown.xPosition === 'before' ?
            ['end', 'start', 'end', 'start'] :
            ['start', 'end', 'start', 'end'], originX = _a[0], originFallbackX = _a[1], overlayX = _a[2], overlayFallbackX = _a[3];
        // tslint:disable-next-line:prefer-const
        var _b = this.dropdown.yPosition === 'above' ?
            ['bottom', 'top', 'bottom', 'top'] :
            ['top', 'bottom', 'top', 'bottom'], overlayY = _b[0], overlayFallbackY = _b[1], originY = _b[2], originFallbackY = _b[3];
        /** @type {?} */
        var offsetY = 0;
        if (this.triggersNestedDropdown()) {
            // When the dropdown is nested, it should always align itself
            // to the edges of the trigger, instead of overlapping it.
            overlayFallbackX = originX = this.dropdown.xPosition === 'before' ? 'start' : 'end';
            originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
            offsetY = overlayY === 'bottom' ? NESTED_PANEL_TOP_PADDING : -NESTED_PANEL_TOP_PADDING;
        }
        else {
            if (!this.dropdown.overlapTriggerY) {
                originY = overlayY === 'top' ? 'bottom' : 'top';
                originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
            }
            if (!this.dropdown.overlapTriggerX) {
                overlayFallbackX = originX = this.dropdown.xPosition === 'before' ? 'start' : 'end';
                originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
            }
        }
        positionStrategy.withPositions([
            { originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY, offsetY: offsetY },
            { originX: originFallbackX, originY: originY, overlayX: overlayFallbackX, overlayY: overlayY, offsetY: offsetY },
            {
                originX: originX,
                originY: originFallbackY,
                overlayX: overlayX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            },
            {
                originX: originFallbackX,
                originY: originFallbackY,
                overlayX: overlayFallbackX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            }
        ]);
    };
    /** Cleans up the active subscriptions. */
    /**
     * Cleans up the active subscriptions.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.cleanUpSubscriptions = /**
     * Cleans up the active subscriptions.
     * @private
     * @return {?}
     */
    function () {
        this.closeSubscription.unsubscribe();
        this.hoverSubscription.unsubscribe();
    };
    /** Returns a stream that emits whenever an action that should close the dropdown occurs. */
    /**
     * Returns a stream that emits whenever an action that should close the dropdown occurs.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.closingActions = /**
     * Returns a stream that emits whenever an action that should close the dropdown occurs.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var backdrop = (/** @type {?} */ (this.overlayRef)).backdropClick();
        /** @type {?} */
        var detachments = (/** @type {?} */ (this.overlayRef)).detachments();
        /** @type {?} */
        var parentClose = this._parent ? this._parent.closed : of();
        /** @type {?} */
        var hover = this._parent ? this._parent.hovered().pipe(filter((/**
         * @param {?} active
         * @return {?}
         */
        function (active) { return active !== _this._dropdownItemInstance; })), filter((/**
         * @return {?}
         */
        function () { return _this._opened; }))) : of();
        return merge(backdrop, parentClose, hover, detachments);
    };
    /** Handles the cases where the user hovers over the trigger. */
    /**
     * Handles the cases where the user hovers over the trigger.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.handleHover = /**
     * Handles the cases where the user hovers over the trigger.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Subscribe to changes in the hovered item in order to toggle the panel.
        if (!this.triggersNestedDropdown()) {
            return;
        }
        this.hoverSubscription = this._parent.hovered()
            // Since we might have multiple competing triggers for the same dropdown (e.g. a nested dropdown
            // with different data and triggers), we have to delay it by a tick to ensure that
            // it won't be closed immediately after it is opened.
            .pipe(filter((/**
         * @param {?} active
         * @return {?}
         */
        function (active) { return active === _this._dropdownItemInstance && !active.disabled; })), delay(0, asapScheduler))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.openedBy = 'mouse';
            // If the same dropdown is used between multiple triggers, it might still be animating
            // while the new trigger tries to re-open it. Wait for the animation to finish
            // before doing so. Also interrupt if the user moves to another item.
            if (_this.dropdown instanceof McDropdown && _this.dropdown.isAnimating) {
                // We need the `delay(0)` here in order to avoid
                // 'changed after checked' errors in some cases. See #12194.
                _this.dropdown.animationDone
                    .pipe(take(1), delay(0, asapScheduler), takeUntil(_this._parent.hovered()))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.open(); }));
            }
            else {
                _this.open();
            }
        }));
    };
    /** Gets the portal that should be attached to the overlay. */
    /**
     * Gets the portal that should be attached to the overlay.
     * @private
     * @return {?}
     */
    McDropdownTrigger.prototype.getPortal = /**
     * Gets the portal that should be attached to the overlay.
     * @private
     * @return {?}
     */
    function () {
        // Note that we can avoid this check by keeping the portal on the dropdown panel.
        // While it would be cleaner, we'd have to introduce another required method on
        // `McDropdownPanel`, making it harder to consume.
        if (!this.portal || this.portal.templateRef !== this.dropdown.templateRef) {
            this.portal = new TemplatePortal(this.dropdown.templateRef, this._viewContainerRef);
        }
        return this.portal;
    };
    McDropdownTrigger.decorators = [
        { type: Directive, args: [{
                    selector: "[mcDropdownTriggerFor]",
                    host: {
                        'aria-haspopup': 'true',
                        '[attr.aria-expanded]': 'opened || null',
                        '(mousedown)': 'handleMousedown($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(click)': 'handleClick($event)'
                    },
                    exportAs: 'mcDropdownTrigger'
                },] },
    ];
    /** @nocollapse */
    McDropdownTrigger.ctorParameters = function () { return [
        { type: Overlay },
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [MC_DROPDOWN_SCROLL_STRATEGY,] }] },
        { type: McDropdown, decorators: [{ type: Optional }] },
        { type: McDropdownItem, decorators: [{ type: Optional }, { type: Self }] },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: FocusMonitor }
    ]; };
    McDropdownTrigger.propDecorators = {
        dropdown: [{ type: Input, args: ['mcDropdownTriggerFor',] }],
        data: [{ type: Input, args: ['mcDropdownTriggerData',] }],
        dropdownOpened: [{ type: Output }],
        dropdownClosed: [{ type: Output }]
    };
    return McDropdownTrigger;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McDropdownModule = /** @class */ (function () {
    function McDropdownModule() {
    }
    McDropdownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McIconModule
                    ],
                    exports: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
                    declarations: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
                    providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] },
    ];
    return McDropdownModule;
}());

export { MC_DROPDOWN_DEFAULT_OPTIONS, MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY, MC_DROPDOWN_PANEL, MC_DROPDOWN_SCROLL_STRATEGY, MC_DROPDOWN_SCROLL_STRATEGY_FACTORY, MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER, McDropdown, McDropdownContent, McDropdownItem, McDropdownItemBase, McDropdownItemMixinBase, McDropdownModule, McDropdownTrigger, NESTED_PANEL_TOP_PADDING, fadeInItems, mcDropdownAnimations, throwMcDropdownInvalidPositionX, throwMcDropdownInvalidPositionY, throwMcDropdownMissingError, transformDropdown };
//# sourceMappingURL=dropdown.es5.js.map

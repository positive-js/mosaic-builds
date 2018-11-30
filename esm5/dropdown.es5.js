/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __param, __metadata, __extends } from 'tslib';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Directive, TemplateRef, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, Inject, InjectionToken, ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, Optional, ContentChild, ContentChildren, EventEmitter, Input, NgZone, Output, QueryList, ViewChild, NgModule } from '@angular/core';
import { TemplatePortal, DomPortalOutlet } from '@ptsecurity/cdk/portal';
import { Subject, Subscription, merge } from 'rxjs';
import { FocusMonitor, FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { trigger, state, style, animate, transition, query, group } from '@angular/animations';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { ESCAPE, DOWN_ARROW, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { take, filter, takeUntil } from 'rxjs/operators';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { Overlay, OverlayConfig, OverlayModule } from '@ptsecurity/cdk/overlay';

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
        /** Emits when the dropdown content has been attached. */
        this._attached = new Subject();
    }
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    McDropdownContent.prototype.attach = function (context) {
        if (context === void 0) { context = {}; }
        if (!this._portal) {
            this._portal = new TemplatePortal(this._template, this._viewContainerRef);
        }
        this.detach();
        if (!this._outlet) {
            this._outlet = new DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
        }
        var element = this._template.elementRef.nativeElement;
        // Because we support opening the same dropdown from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        element.parentNode.insertBefore(this._outlet.outletElement, element);
        this._portal.attach(this._outlet, context);
        this._attached.next();
    };
    /**
     * Detaches the content.
     * @docs-private
     */
    McDropdownContent.prototype.detach = function () {
        if (this._portal.isAttached) {
            this._portal.detach();
        }
    };
    McDropdownContent.prototype.ngOnDestroy = function () {
        if (this._outlet) {
            this._outlet.dispose();
        }
    };
    McDropdownContent = __decorate([
        Directive({
            selector: 'ng-template[mcDropdownContent]'
        }),
        __param(5, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [TemplateRef,
            ComponentFactoryResolver,
            ApplicationRef,
            Injector,
            ViewContainerRef, Object])
    ], McDropdownContent);
    return McDropdownContent;
}());

/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * @docs-private
 */
var MC_DROPDOWN_PANEL = new InjectionToken('MC_DROPDOWN_PANEL');

// Boilerplate for applying mixins to McDropdownItem.
/** @docs-private */
var McDropdownItemBase = /** @class */ (function () {
    function McDropdownItemBase() {
    }
    return McDropdownItemBase;
}());
var _McDropdownItemMixinBase = mixinDisabled(McDropdownItemBase);
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
        if (_focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for dropdown items only when the focus was not caused by a
            // mouse or touch interaction.
            _focusMonitor.monitor(_this._elementRef.nativeElement, false);
        }
        if (_parentDropdownPanel && _parentDropdownPanel.addItem) {
            _parentDropdownPanel.addItem(_this);
        }
        _this._document = document;
        return _this;
    }
    /** Focuses the dropdown item. */
    McDropdownItem.prototype.focus = function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._getHostElement(), origin);
        }
        else {
            this._getHostElement().focus();
        }
    };
    McDropdownItem.prototype.ngOnDestroy = function () {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
        if (this._parentDropdownPanel && this._parentDropdownPanel.removeItem) {
            this._parentDropdownPanel.removeItem(this);
        }
    };
    /** Used to set the `tabindex`. */
    McDropdownItem.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /** Returns the host DOM element. */
    McDropdownItem.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    /** Prevents the default element actions if it is disabled. */
    McDropdownItem.prototype._checkDisabled = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    McDropdownItem.prototype.getLabel = function () {
        var element = this._elementRef.nativeElement;
        // tslint:disable-next-line:no-magic-numbers
        var textNodeType = this._document ? this._document.TEXT_NODE : 3;
        var output = '';
        if (element.childNodes) {
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
    McDropdownItem = __decorate([
        Component({
            selector: 'mc-dropdown-item, [mc-dropdown-item]',
            exportAs: 'mcDropdownItem',
            inputs: ['disabled'],
            host: {
                role: 'dropdown-item',
                class: 'mc-dropdown__item',
                '[attr.tabindex]': '_getTabIndex()',
                '[attr.disabled]': 'disabled || null',
                '(click)': '_checkDisabled($event)'
            },
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            template: "<ng-content></ng-content>"
        }),
        __param(1, Inject(DOCUMENT)),
        __param(3, Inject(MC_DROPDOWN_PANEL)), __param(3, Optional()),
        __metadata("design:paramtypes", [ElementRef, Object, FocusMonitor, Object])
    ], McDropdownItem);
    return McDropdownItem;
}(_McDropdownItemMixinBase));

function throwMcDropdownMissingError() {
    throw Error("mcDropdownTriggerFor: must pass in an mc-dropdown instance.\n    Example:\n      <mc-dropdown #dropdown=\"mcDropdown\"></mc-dropdown>\n      <button [mcDropdownTriggerFor]=\"dropdown\"></button>");
}
/**
 * Throws an exception for the case when dropdown's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
function throwMcDropdownInvalidPositionX() {
    throw Error("xPosition value must be either 'before' or after'.\n      Example: <mc-dropdown xPosition=\"before\" #dropdown=\"mcDropdown\"></mc-dropdown>");
}
/**
 * Throws an exception for the case when dropdown's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
function throwMcDropdownInvalidPositionY() {
    throw Error("yPosition value must be either 'above' or below'.\n      Example: <mc-dropdown yPosition=\"above\" #dropdown=\"mcDropdown\"></mc-dropdown>");
}

/**
 * Animations used by the mc-dropdown component.
 * Animation duration and timing values are based on:
 * https://material.io/guidelines/components/menus.html#menus-usage
 * @docs-private
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
var fadeInItems = mcDropdownAnimations.fadeInItems;
var transformDropdown = mcDropdownAnimations.transformDropdown;

/** Injection token to be used to override the default options for `mc-dropdown`. */
var MC_DROPDOWN_DEFAULT_OPTIONS = new InjectionToken('mc-dropdown-default-options', {
    providedIn: 'root',
    factory: MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY() {
    return {
        overlapTrigger: false,
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
        /** Config object to be passed into the dropdown's ngClass */
        this._classList = {};
        /** Current state of the panel animation. */
        this._panelAnimationState = 'void';
        /** Emits whenever an animation on the dropdown completes. */
        this._animationDone = new Subject();
        /** Class to be added to the backdrop element. */
        this.backdropClass = this._defaultOptions.backdropClass;
        /** Event emitted when the dropdown is closed. */
        this.closed = new EventEmitter();
        this._xPosition = this._defaultOptions.xPosition;
        this._yPosition = this._defaultOptions.yPosition;
        /** Dropdown items inside the current dropdown. */
        this._items = [];
        /** Emits whenever the amount of dropdown items changes. */
        this._itemChanges = new Subject();
        /** Subscription to tab events on the dropdown panel */
        this._tabSubscription = Subscription.EMPTY;
        this._overlapTrigger = this._defaultOptions.overlapTrigger;
        this._hasBackdrop = this._defaultOptions.hasBackdrop;
    }
    McDropdown_1 = McDropdown;
    Object.defineProperty(McDropdown.prototype, "xPosition", {
        /** Position of the dropdown in the X axis. */
        get: function () { return this._xPosition; },
        set: function (value) {
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
        get: function () { return this._yPosition; },
        set: function (value) {
            if (value !== 'above' && value !== 'below') {
                throwMcDropdownInvalidPositionY();
            }
            this._yPosition = value;
            this.setPositionClasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "overlapTrigger", {
        /** Whether the dropdown should overlap its trigger. */
        get: function () { return this._overlapTrigger; },
        set: function (value) {
            this._overlapTrigger = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "hasBackdrop", {
        /** Whether the dropdown has a backdrop. */
        get: function () { return this._hasBackdrop; },
        set: function (value) {
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
        set: function (classes) {
            if (classes && classes.length) {
                this._classList = classes.split(' ').reduce(function (obj, className) {
                    obj[className] = true;
                    return obj;
                }, {});
                this._elementRef.nativeElement.className = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    McDropdown.prototype.ngOnInit = function () {
        this.setPositionClasses();
    };
    McDropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._keyManager = new FocusKeyManager(this.items).withWrap().withTypeAhead();
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () { return _this.closed.emit('tab'); });
    };
    McDropdown.prototype.ngOnDestroy = function () {
        this._tabSubscription.unsubscribe();
        this.closed.complete();
    };
    /** Handle a keyboard event from the dropdown, delegating to the appropriate action. */
    McDropdown.prototype._handleKeydown = function (event) {
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case ESCAPE:
                this.closed.emit('keydown');
                break;
            case UP_ARROW:
            case DOWN_ARROW:
                this._keyManager.setFocusOrigin('keyboard');
                this._keyManager.onKeydown(event);
                break;
            default:
                // todo зачем обрабатывать лишние события ?
                this._keyManager.onKeydown(event);
        }
    };
    /**
     * Focus the first item in the dropdown.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    McDropdown.prototype.focusFirstItem = function (origin) {
        var _this = this;
        if (origin === void 0) { origin = 'program'; }
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this._ngZone.onStable.asObservable()
                .pipe(take(1))
                .subscribe(function () { return _this._keyManager.setFocusOrigin(origin).setFirstItemActive(); });
        }
        else {
            this._keyManager.setFocusOrigin(origin).setFirstItemActive();
        }
    };
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    McDropdown.prototype.resetActiveItem = function () {
        this._keyManager.setActiveItem(-1);
    };
    /**
     * Registers a dropdown item with the dropdown.
     * @docs-private
     */
    McDropdown.prototype.addItem = function (item) {
        // We register the items through this method, rather than picking them up through
        // `ContentChildren`, because we need the items to be picked up by their closest
        // `mc-dropdown` ancestor. If we used `@ContentChildren(McDropdownItem, {descendants: true})`,
        // all descendant items will bleed into the top-level dropdown in the case where the consumer
        // has `mc-dropdown` instances nested inside each other.
        if (this._items.indexOf(item) === -1) {
            this._items.push(item);
            this._itemChanges.next(this._items);
        }
    };
    /**
     * Removes an item from the dropdown.
     * @docs-private
     */
    McDropdown.prototype.removeItem = function (item) {
        var index = this._items.indexOf(item);
        if (this._items.indexOf(item) > -1) {
            this._items.splice(index, 1);
            this._itemChanges.next(this._items);
        }
    };
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * @param posX Position of the dropdown along the x axis.
     * @param posY Position of the dropdown along the y axis.
     * @docs-private
     */
    McDropdown.prototype.setPositionClasses = function (posX, posY) {
        if (posX === void 0) { posX = this.xPosition; }
        if (posY === void 0) { posY = this.yPosition; }
        var classes = this._classList;
        classes['mc-dropdown-before'] = posX === 'before';
        classes['mc-dropdown-after'] = posX === 'after';
        classes['mc-dropdown-above'] = posY === 'above';
        classes['mc-dropdown-below'] = posY === 'below';
    };
    /** Starts the enter animation. */
    McDropdown.prototype._startAnimation = function () {
        this._panelAnimationState = 'enter';
    };
    /** Resets the panel animation to its initial state. */
    McDropdown.prototype._resetAnimation = function () {
        this._panelAnimationState = 'void';
    };
    /** Callback that is invoked when the panel animation completes. */
    McDropdown.prototype._onAnimationDone = function (event) {
        this._animationDone.next(event);
        this._isAnimating = false;
        // Scroll the content element to the top once the animation is done. This is necessary, because
        // we move focus to the first item while it's still being animated, which can throw the browser
        // off when it determines the scroll position. Alternatively we can move focus when the
        // animation is done, however moving focus asynchronously will interrupt screen readers
        // which are in the process of reading out the dropdown already. We take the `element` from
        // the `event` since we can't use a `ViewChild` to access the pane.
        if (event.toState === 'enter' && this._keyManager.activeItemIndex === 0) {
            event.element.scrollTop = 0;
        }
    };
    var McDropdown_1;
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McDropdown.prototype, "xPosition", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McDropdown.prototype, "yPosition", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDropdown.prototype, "overlapTrigger", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDropdown.prototype, "hasBackdrop", null);
    __decorate([
        Input('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McDropdown.prototype, "panelClass", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McDropdown.prototype, "backdropClass", void 0);
    __decorate([
        ViewChild(TemplateRef),
        __metadata("design:type", TemplateRef)
    ], McDropdown.prototype, "templateRef", void 0);
    __decorate([
        ContentChildren(McDropdownItem),
        __metadata("design:type", QueryList)
    ], McDropdown.prototype, "items", void 0);
    __decorate([
        ContentChild(McDropdownContent),
        __metadata("design:type", McDropdownContent)
    ], McDropdown.prototype, "lazyContent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McDropdown.prototype, "closed", void 0);
    McDropdown = McDropdown_1 = __decorate([
        Component({
            selector: 'mc-dropdown',
            template: "<ng-template><div class=\"mc-dropdown__panel\" [ngClass]=\"_classList\" (keydown)=\"_handleKeydown($event)\" (click)=\"closed.emit('click')\" [@transformDropdown]=\"_panelAnimationState\" (@transformDropdown.start)=\"_isAnimating = true\" (@transformDropdown.done)=\"_onAnimationDone($event)\" tabindex=\"-1\"><div class=\"mc-dropdown__content\"><ng-content></ng-content></div></div></ng-template>",
            styles: [".mc-dropdown__item{display:block;box-sizing:border-box;width:100%;border:1px solid transparent;outline:0;padding:5px 15px;text-align:left}.mc-dropdown__item:not([disabled]){cursor:pointer}.mc-dropdown__item .mc-dropdown__item-caption{margin-top:4px}.mc-dropdown__panel{min-width:100%;overflow:auto;margin-top:-1px;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-dropdown__content{height:100%}.mc-dropdown__content h1,.mc-dropdown__content h2,.mc-dropdown__content h3,.mc-dropdown__content h4,.mc-dropdown__content h5{padding:8px 16px 4px 16px;margin:0}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            exportAs: 'mcDropdown',
            animations: [
                mcDropdownAnimations.transformDropdown,
                mcDropdownAnimations.fadeInItems
            ],
            providers: [
                { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown_1 }
            ]
        }),
        __param(2, Inject(MC_DROPDOWN_DEFAULT_OPTIONS)),
        __metadata("design:paramtypes", [ElementRef,
            NgZone, Object])
    ], McDropdown);
    return McDropdown;
}());

/** Injection token that determines the scroll handling while the dropdown is open. */
var MC_DROPDOWN_SCROLL_STRATEGY = new InjectionToken('mc-dropdown-scroll-strategy');
/** @docs-private */
function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
/** @docs-private */
var MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DROPDOWN_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
};
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
var McDropdownTrigger = /** @class */ (function () {
    function McDropdownTrigger(_overlay, _element, _viewContainerRef, _scrollStrategy, _dir, _focusMonitor) {
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this._focusMonitor = _focusMonitor;
        // Tracking input type is necessary so it's possible to only auto-focus
        // the first item of the list when the dropdown is opened via the keyboard
        this._openedBy = null;
        /** Event emitted when the associated dropdown is opened. */
        this.dropdownOpened = new EventEmitter();
        /** Event emitted when the associated dropdown is closed. */
        this.dropdownClosed = new EventEmitter();
        this._overlayRef = null;
        this._opened = false;
        this._closeSubscription = Subscription.EMPTY;
        this._hoverSubscription = Subscription.EMPTY;
    }
    Object.defineProperty(McDropdownTrigger.prototype, "opened", {
        /** Whether the dropdown is open. */
        get: function () {
            return this._opened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdownTrigger.prototype, "dir", {
        /** The text direction of the containing app. */
        get: function () {
            return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    McDropdownTrigger.prototype.ngOnInit = function () {
        this.dropdown.closed = this.dropdown.closed || new EventEmitter();
    };
    McDropdownTrigger.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._check();
        this.dropdown.closed.asObservable().subscribe(function () {
            _this._destroy();
        });
    };
    McDropdownTrigger.prototype.ngOnDestroy = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this._cleanUpSubscriptions();
    };
    /** Toggles the dropdown between the open and closed states. */
    McDropdownTrigger.prototype.toggle = function () {
        // tslint:disable-next-line:no-void-expression
        return this._opened ? this.close() : this.open();
    };
    /** Opens the dropdown. */
    McDropdownTrigger.prototype.open = function () {
        var _this = this;
        if (this._opened) {
            return;
        }
        this._check();
        var overlayRef = this._createOverlay();
        this._setPosition(overlayRef.getConfig().positionStrategy);
        overlayRef.attach(this._portal);
        if (this.dropdown.lazyContent) {
            this.dropdown.lazyContent.attach(this.data);
        }
        this._closeSubscription = this._closingActions().subscribe(function () { return _this.close(); });
        this._init();
        if (this.dropdown instanceof McDropdown) {
            this.dropdown._startAnimation();
        }
    };
    /** Closes the dropdown. */
    McDropdownTrigger.prototype.close = function () {
        this.dropdown.closed.emit();
    };
    /**
     * Focuses the dropdown trigger.
     * @param origin Source of the dropdown trigger's focus.
     */
    McDropdownTrigger.prototype.focus = function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._element.nativeElement, origin);
        }
        else {
            this._element.nativeElement.focus();
        }
    };
    /** Closes the dropdown and does the necessary cleanup. */
    McDropdownTrigger.prototype._destroy = function () {
        var _this = this;
        if (!this._overlayRef || !this.opened) {
            return;
        }
        var dropdown = this.dropdown;
        this._closeSubscription.unsubscribe();
        this._overlayRef.detach();
        if (dropdown instanceof McDropdown) {
            dropdown._resetAnimation();
            if (dropdown.lazyContent) {
                // Wait for the exit animation to finish before detaching the content.
                dropdown._animationDone
                    .pipe(filter(function (event) { return event.toState === 'void'; }), take(1), 
                // Interrupt if the content got re-attached.
                takeUntil(dropdown.lazyContent._attached))
                    .subscribe(function () { return dropdown.lazyContent.detach(); }, undefined, function () {
                    // No matter whether the content got re-attached, reset the dropdown.
                    _this._reset();
                });
            }
            else {
                this._reset();
            }
        }
        else {
            this._reset();
            if (dropdown.lazyContent) {
                dropdown.lazyContent.detach();
            }
        }
    };
    /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     */
    McDropdownTrigger.prototype._init = function () {
        this.dropdown.direction = this.dir;
        this._setIsOpened(true);
        this.dropdown.focusFirstItem(this._openedBy || 'program');
    };
    /**
     * This method resets the dropdown when it's closed, most importantly restoring
     * focus to the dropdown trigger if the dropdown was opened via the keyboard.
     */
    McDropdownTrigger.prototype._reset = function () {
        this._setIsOpened(false);
        // We should reset focus if the user is navigating using a keyboard or
        // if we have a top-level trigger which might cause focus to be lost
        // when clicking on the backdrop.
        if (!this._openedBy) {
            // Note that the focus style will show up both for `program` and
            // `keyboard` so we don't have to specify which one it is.
            this.focus();
        }
        else {
            this.focus(this._openedBy);
        }
        this._openedBy = null;
    };
    // set state rather than toggle to support triggers sharing a dropdown
    McDropdownTrigger.prototype._setIsOpened = function (isOpen) {
        this._opened = isOpen;
        // tslint:disable-next-line:no-void-expression
        this._opened ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
    };
    /**
     * This method checks that a valid instance of Dropdown has been passed into
     * mcDropdownTriggerFor. If not, an exception is thrown.
     */
    McDropdownTrigger.prototype._check = function () {
        if (!this.dropdown) {
            throwMcDropdownMissingError();
        }
    };
    /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     */
    McDropdownTrigger.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            this._portal = new TemplatePortal(this.dropdown.templateRef, this._viewContainerRef);
            var config = this._getOverlayConfig();
            this._subscribeToPositions(config.positionStrategy);
            this._overlayRef = this._overlay.create(config);
            // Consume the `keydownEvents` in order to prevent them from going to another overlay.
            // Ideally we'd also have our keyboard event logic in here, however doing so will
            // break anybody that may have implemented the `McDropdownPanel` themselves.
            this._overlayRef.keydownEvents().subscribe();
        }
        return this._overlayRef;
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    McDropdownTrigger.prototype._getOverlayConfig = function () {
        return new OverlayConfig({
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._element)
                .withLockedPosition()
                .withTransformOriginOn('.mc-dropdown__panel'),
            hasBackdrop: this.dropdown.hasBackdrop === null || this.dropdown.hasBackdrop === undefined
                ? true
                : this.dropdown.hasBackdrop,
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
    McDropdownTrigger.prototype._subscribeToPositions = function (position) {
        var _this = this;
        if (this.dropdown.setPositionClasses) {
            // todo possibly we should not recompute positions there
            /*position.positionChanges.subscribe((change) => {
                const posX: DropdownPositionX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
                const posY: DropdownPositionY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';

                this.dropdown.setPositionClasses!(posX, posY);
            });*/
            position.positionChanges.subscribe(function () {
                _this.dropdown.setPositionClasses(_this.dropdown.xPosition, _this.dropdown.yPosition);
            });
        }
    };
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    McDropdownTrigger.prototype._setPosition = function (positionStrategy) {
        var _a = this.dropdown.xPosition === 'before' ? ['end', 'start'] : ['start', 'end'], originX = _a[0], originFallbackX = _a[1];
        var _b = this.dropdown.yPosition === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], overlayFallbackY = _b[1];
        var _c = [overlayY, overlayFallbackY], originY = _c[0], originFallbackY = _c[1];
        var _d = [originX, originFallbackX], overlayX = _d[0], overlayFallbackX = _d[1];
        var offsetY = 0;
        if (!this.dropdown.overlapTrigger) {
            originY = overlayY === 'top' ? 'bottom' : 'top';
            originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
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
    McDropdownTrigger.prototype._cleanUpSubscriptions = function () {
        this._closeSubscription.unsubscribe();
        this._hoverSubscription.unsubscribe();
    };
    /** Returns a stream that emits whenever an action that should close the dropdown occurs. */
    McDropdownTrigger.prototype._closingActions = function () {
        var backdrop = this._overlayRef.backdropClick();
        var detachments = this._overlayRef.detachments();
        return merge(backdrop, detachments);
    };
    __decorate([
        Input('mcDropdownTriggerFor'),
        __metadata("design:type", Object)
    ], McDropdownTrigger.prototype, "dropdown", void 0);
    __decorate([
        Input('mcDropdownTriggerData'),
        __metadata("design:type", Object)
    ], McDropdownTrigger.prototype, "data", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McDropdownTrigger.prototype, "dropdownOpened", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], McDropdownTrigger.prototype, "dropdownClosed", void 0);
    McDropdownTrigger = __decorate([
        Directive({
            selector: "[mcDropdownTriggerFor]",
            host: {
                '(touchstart)': '_openedBy = "touch"',
                '(click)': 'toggle()'
            },
            exportAs: 'mcDropdownTrigger'
        }),
        __param(3, Inject(MC_DROPDOWN_SCROLL_STRATEGY)),
        __param(4, Optional()),
        __metadata("design:paramtypes", [Overlay,
            ElementRef,
            ViewContainerRef, Object, Directionality,
            FocusMonitor])
    ], McDropdownTrigger);
    return McDropdownTrigger;
}());

var McDropdownModule = /** @class */ (function () {
    function McDropdownModule() {
    }
    McDropdownModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                OverlayModule
            ],
            exports: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
            declarations: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
            providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
        })
    ], McDropdownModule);
    return McDropdownModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McDropdownModule, MC_DROPDOWN_DEFAULT_OPTIONS, MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY, McDropdown, McDropdownItemBase, _McDropdownItemMixinBase, McDropdownItem, MC_DROPDOWN_PANEL, throwMcDropdownMissingError, throwMcDropdownInvalidPositionX, throwMcDropdownInvalidPositionY, mcDropdownAnimations, fadeInItems, transformDropdown, McDropdownContent, MC_DROPDOWN_SCROLL_STRATEGY, MC_DROPDOWN_SCROLL_STRATEGY_FACTORY, MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER, McDropdownTrigger };
//# sourceMappingURL=dropdown.es5.js.map

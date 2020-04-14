/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-trigger.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, Optional, Output, Self, ViewContainerRef } from '@angular/core';
import { LEFT_ARROW, RIGHT_ARROW, SPACE, ENTER } from '@ptsecurity/cdk/keycodes';
import { asapScheduler, merge, of as observableOf, Subscription } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { throwMcDropdownMissingError } from './dropdown-errors';
import { McDropdownItem } from './dropdown-item';
import { McDropdown } from './dropdown.component';
/**
 * Injection token that determines the scroll handling while the dropdown is open.
 * @type {?}
 */
export var MC_DROPDOWN_SCROLL_STRATEGY = new InjectionToken('mc-dropdown-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
// tslint:disable-next-line:naming-convention
export function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition(); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DROPDOWN_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
};
/**
 * Default top padding of the nested dropdown panel.
 * @type {?}
 */
export var NESTED_PANEL_TOP_PADDING = 2;
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
        var _a = __read(this.dropdown.xPosition === 'before' ?
            ['end', 'start', 'end', 'start'] :
            ['start', 'end', 'start', 'end'], 4), originX = _a[0], originFallbackX = _a[1], overlayX = _a[2], overlayFallbackX = _a[3];
        // tslint:disable-next-line:prefer-const
        var _b = __read(this.dropdown.yPosition === 'above' ?
            ['bottom', 'top', 'bottom', 'top'] :
            ['top', 'bottom', 'top', 'bottom'], 4), overlayY = _b[0], overlayFallbackY = _b[1], originY = _b[2], originFallbackY = _b[3];
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
        var parentClose = this._parent ? this._parent.closed : observableOf();
        /** @type {?} */
        var hover = this._parent ? this._parent.hovered().pipe(filter((/**
         * @param {?} active
         * @return {?}
         */
        function (active) { return active !== _this._dropdownItemInstance; })), filter((/**
         * @return {?}
         */
        function () { return _this._opened; }))) : observableOf();
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
                },] }
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
export { McDropdownTrigger };
if (false) {
    /** @type {?} */
    McDropdownTrigger.prototype.openedBy;
    /**
     * Data to be passed along to any lazily-rendered content.
     * @type {?}
     */
    McDropdownTrigger.prototype.data;
    /**
     * Event emitted when the associated dropdown is opened.
     * @type {?}
     */
    McDropdownTrigger.prototype.dropdownOpened;
    /**
     * Event emitted when the associated dropdown is closed.
     * @type {?}
     */
    McDropdownTrigger.prototype.dropdownClosed;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._dropdown;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._opened;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype.portal;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype.overlayRef;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype.closeSubscription;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype.hoverSubscription;
    /**
     * Handles touch start events on the trigger.
     * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype.handleTouchStart;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._overlay;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._element;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._parent;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._dropdownItemInstance;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype._focusMonitor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLXRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBR0gsT0FBTyxFQUNQLGFBQWEsRUFJaEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sSUFBSSxFQUNKLGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBSWxELE1BQU0sS0FBTywyQkFBMkIs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QyxXQUFXLEVBQUUsdUJBQXVCO3dCQUNwQyxTQUFTLEVBQUUscUJBQXFCO3FCQUNuQztvQkFDRCxRQUFRLEVBQUUsbUJBQW1CO2lCQUNoQzs7OztnQkF0RUcsT0FBTztnQkFXUCxVQUFVO2dCQVNWLGdCQUFnQjtnREFxSFgsTUFBTSxTQUFDLDJCQUEyQjtnQkEzR2xDLFVBQVUsdUJBNEdWLFFBQVE7Z0JBL0dSLGNBQWMsdUJBZ0hkLFFBQVEsWUFBSSxJQUFJO2dCQS9JTCxjQUFjLHVCQWdKekIsUUFBUTtnQkFqSlIsWUFBWTs7OzJCQXFGaEIsS0FBSyxTQUFDLHNCQUFzQjt1QkE0QjVCLEtBQUssU0FBQyx1QkFBdUI7aUNBRzdCLE1BQU07aUNBR04sTUFBTTs7SUFvYVgsd0JBQUM7Q0FBQSxBQTFkRCxJQTBkQztTQS9jWSxpQkFBaUI7OztJQWtDMUIscUNBQTBDOzs7OztJQUcxQyxpQ0FBMEM7Ozs7O0lBRzFDLDJDQUFpRjs7Ozs7SUFHakYsMkNBQWlGOzs7OztJQUVqRixzQ0FBbUM7Ozs7O0lBT25DLG9DQUFpQzs7Ozs7SUFFakMsbUNBQStCOzs7OztJQUUvQix1Q0FBNkM7Ozs7O0lBRTdDLDhDQUErQzs7Ozs7SUFFL0MsOENBQStDOzs7Ozs7O0lBeUkvQyw2Q0FBeUQ7Ozs7O0lBdElyRCxxQ0FBeUI7Ozs7O0lBQ3pCLHFDQUF5Qzs7Ozs7SUFDekMsOENBQTJDOzs7OztJQUMzQyw0Q0FBaUU7Ozs7O0lBQ2pFLG9DQUF1Qzs7Ozs7SUFDdkMsa0RBQWlFOzs7OztJQUNqRSxpQ0FBd0M7Ozs7O0lBQ3hDLDBDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5Q29uZmlnLFxuICAgIE92ZXJsYXlSZWYsXG4gICAgVmVydGljYWxDb25uZWN0aW9uUG9zLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2VsZixcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFLCBFTlRFUiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBhc2FwU2NoZWR1bGVyLCBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBmaWx0ZXIsIHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgdGhyb3dNY0Ryb3Bkb3duTWlzc2luZ0Vycm9yIH0gZnJvbSAnLi9kcm9wZG93bi1lcnJvcnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkl0ZW0gfSBmcm9tICcuL2Ryb3Bkb3duLWl0ZW0nO1xuaW1wb3J0IHsgTWNEcm9wZG93blBhbmVsIH0gZnJvbSAnLi9kcm9wZG93bi1wYW5lbCc7XG5pbXBvcnQgeyBEcm9wZG93blBvc2l0aW9uWCwgRHJvcGRvd25Qb3NpdGlvblkgfSBmcm9tICcuL2Ryb3Bkb3duLXBvc2l0aW9ucyc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bi5jb21wb25lbnQnO1xuXG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGRyb3Bkb3duIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1kcm9wZG93bi1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWVxufTtcblxuLyoqIERlZmF1bHQgdG9wIHBhZGRpbmcgb2YgdGhlIG5lc3RlZCBkcm9wZG93biBwYW5lbC4gKi9cbmV4cG9ydCBjb25zdCBORVNURURfUEFORUxfVE9QX1BBRERJTkcgPSAyO1xuXG4vKiogT3B0aW9ucyBmb3IgYmluZGluZyBhIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIuICovXG5jb25zdCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiB0cnVlfSk7XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGFuIG1jLWRyb3Bkb3duIHRhZy4gIEl0IGlzXG4gKiByZXNwb25zaWJsZSBmb3IgdG9nZ2xpbmcgdGhlIGRpc3BsYXkgb2YgdGhlIHByb3ZpZGVkIGRyb3Bkb3duIGluc3RhbmNlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYFttY0Ryb3Bkb3duVHJpZ2dlckZvcl1gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXG4gICAgICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdvcGVuZWQgfHwgbnVsbCcsXG4gICAgICAgICcobW91c2Vkb3duKSc6ICdoYW5kbGVNb3VzZWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KSdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93blRyaWdnZXInXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25UcmlnZ2VyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBUaGUgdGV4dCBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5pbmcgYXBwLiAqL1xuICAgIGdldCBkaXIoKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgICB9XG5cblxuICAgIC8qKiBSZWZlcmVuY2VzIHRoZSBkcm9wZG93biBpbnN0YW5jZSB0aGF0IHRoZSB0cmlnZ2VyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgICBASW5wdXQoJ21jRHJvcGRvd25UcmlnZ2VyRm9yJylcbiAgICBnZXQgZHJvcGRvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kcm9wZG93bjtcbiAgICB9XG5cbiAgICBzZXQgZHJvcGRvd24oZHJvcGRvd246IE1jRHJvcGRvd25QYW5lbCkge1xuICAgICAgICBpZiAoZHJvcGRvd24gPT09IHRoaXMuX2Ryb3Bkb3duKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX2Ryb3Bkb3duID0gZHJvcGRvd247XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICBpZiAoZHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSBkcm9wZG93bi5jbG9zZWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIGEgY2xpY2sgY2xvc2VkIHRoZSBkcm9wZG93biwgd2Ugc2hvdWxkIGNsb3NlIHRoZSBlbnRpcmUgY2hhaW4gb2YgbmVzdGVkIGRyb3Bkb3ducy5cbiAgICAgICAgICAgICAgICBpZiAoKHJlYXNvbiA9PT0gJ2NsaWNrJyB8fCByZWFzb24gPT09ICd0YWInKSAmJiB0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50LmNsb3NlZC5lbWl0KHJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUcmFja2luZyBpbnB1dCB0eXBlIGlzIG5lY2Vzc2FyeSBzbyBpdCdzIHBvc3NpYmxlIHRvIG9ubHkgYXV0by1mb2N1c1xuICAgIC8vIHRoZSBmaXJzdCBpdGVtIG9mIHRoZSBsaXN0IHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCB2aWEgdGhlIGtleWJvYXJkXG4gICAgb3BlbmVkQnk6ICdtb3VzZScgfCAndG91Y2gnIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKiogRGF0YSB0byBiZSBwYXNzZWQgYWxvbmcgdG8gYW55IGxhemlseS1yZW5kZXJlZCBjb250ZW50LiAqL1xuICAgIEBJbnB1dCgnbWNEcm9wZG93blRyaWdnZXJEYXRhJykgZGF0YTogYW55O1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYXNzb2NpYXRlZCBkcm9wZG93biBpcyBvcGVuZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRyb3Bkb3duT3BlbmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhc3NvY2lhdGVkIGRyb3Bkb3duIGlzIGNsb3NlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZHJvcGRvd25DbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgX2Ryb3Bkb3duOiBNY0Ryb3Bkb3duUGFuZWw7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXMgb3Blbi4gKi9cbiAgICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBwb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuXG4gICAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGNsb3NlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBob3ZlclN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX3BhcmVudDogTWNEcm9wZG93bixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcml2YXRlIF9kcm9wZG93bkl0ZW1JbnN0YW5jZTogTWNEcm9wZG93bkl0ZW0sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcj86IEZvY3VzTW9uaXRvclxuICAgICkge1xuICAgICAgICBfZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG4gICAgICAgICAgICBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChfZHJvcGRvd25JdGVtSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIF9kcm9wZG93bkl0ZW1JbnN0YW5jZS50cmlnZ2Vyc05lc3RlZERyb3Bkb3duID0gdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2soKTtcbiAgICAgICAgdGhpcy5oYW5kbGVIb3ZlcigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuICAgICAgICAgICAgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcblxuICAgICAgICB0aGlzLmNsZWFuVXBTdWJzY3JpcHRpb25zKCk7XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gdHJpZ2dlcnMgYSBuZXN0ZWQgZHJvcGRvd24gb3IgYSB0b3AtbGV2ZWwgb25lLiAqL1xuICAgIHRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhISh0aGlzLl9kcm9wZG93bkl0ZW1JbnN0YW5jZSAmJiB0aGlzLl9wYXJlbnQpO1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBkcm9wZG93biBiZXR3ZWVuIHRoZSBvcGVuIGFuZCBjbG9zZWQgc3RhdGVzLiAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZvaWQtZXhwcmVzc2lvblxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBkcm9wZG93bi4gKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuY2hlY2soKTtcblxuICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBvdmVybGF5UmVmLmdldENvbmZpZygpO1xuXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ob3ZlcmxheUNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk7XG4gICAgICAgIG92ZXJsYXlDb25maWcuaGFzQmFja2Ryb3AgPSB0aGlzLmRyb3Bkb3duLmhhc0JhY2tkcm9wID09IG51bGwgPyAhdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkgOlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5oYXNCYWNrZHJvcDtcbiAgICAgICAgb3ZlcmxheVJlZi5hdHRhY2godGhpcy5nZXRQb3J0YWwoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24ubGF6eUNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubGF6eUNvbnRlbnQuYXR0YWNoKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uID0gdGhpcy5jbG9zaW5nQWN0aW9ucygpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93biBpbnN0YW5jZW9mIE1jRHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uc3RhcnRBbmltYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIGRyb3Bkb3duLiAqL1xuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXNlcyB0aGUgZHJvcGRvd24gdHJpZ2dlci5cbiAgICAgKiBAcGFyYW0gb3JpZ2luIFNvdXJjZSBvZiB0aGUgZHJvcGRvd24gdHJpZ2dlcidzIGZvY3VzLlxuICAgICAqL1xuICAgIGZvY3VzKG9yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgb3JpZ2luKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgbW91c2UgcHJlc3NlcyBvbiB0aGUgdHJpZ2dlci4gKi9cbiAgICBoYW5kbGVNb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gU2luY2UgcmlnaHQgb3IgbWlkZGxlIGJ1dHRvbiBjbGlja3Mgd29uJ3QgdHJpZ2dlciB0aGUgYGNsaWNrYCBldmVudCxcbiAgICAgICAgLy8gd2Ugc2hvdWxkbid0IGNvbnNpZGVyIHRoZSBkcm9wZG93biBhcyBvcGVuZWQgYnkgbW91c2UgaW4gdGhvc2UgY2FzZXMuXG4gICAgICAgIHRoaXMub3BlbmVkQnkgPSBldmVudC5idXR0b24gPT09IDAgPyAnbW91c2UnIDogbnVsbDtcblxuICAgICAgICAvLyBTaW5jZSBjbGlja2luZyBvbiB0aGUgdHJpZ2dlciB3b24ndCBjbG9zZSB0aGUgZHJvcGRvd24gaWYgaXQgb3BlbnMgYSBuZXN0ZWQgZHJvcGRvd24sXG4gICAgICAgIC8vIHdlIHNob3VsZCBwcmV2ZW50IGZvY3VzIGZyb20gbW92aW5nIG9udG8gaXQgdmlhIGNsaWNrIHRvIGF2b2lkIHRoZVxuICAgICAgICAvLyBoaWdobGlnaHQgZnJvbSBsaW5nZXJpbmcgb24gdGhlIGRyb3Bkb3duIGl0ZW0uXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGtleSBwcmVzc2VzIG9uIHRoZSB0cmlnZ2VyLiAqL1xuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXkgfHwgZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gU1BBQ0UgfHwga2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpICYmIChcbiAgICAgICAgICAgIChrZXlDb2RlID09PSBSSUdIVF9BUlJPVyAmJiB0aGlzLmRpciA9PT0gJ2x0cicpIHx8XG4gICAgICAgICAgICAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVyAmJiB0aGlzLmRpciA9PT0gJ3J0bCcpKSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBjbGljayBldmVudHMgb24gdGhlIHRyaWdnZXIuICovXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICAvLyBTdG9wIGV2ZW50IHByb3BhZ2F0aW9uIHRvIGF2b2lkIGNsb3NpbmcgdGhlIHBhcmVudCBkcm9wZG93bi5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0b3VjaCBzdGFydCBldmVudHMgb24gdGhlIHRyaWdnZXIuXG4gICAgICogTmVlZHMgdG8gYmUgYW4gYXJyb3cgZnVuY3Rpb24gc28gd2UgY2FuIGVhc2lseSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBhbmQgcmVtb3ZlRXZlbnRMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhhbmRsZVRvdWNoU3RhcnQgPSAoKSA9PiB0aGlzLm9wZW5lZEJ5ID0gJ3RvdWNoJztcblxuICAgIC8qKiBDbG9zZXMgdGhlIGRyb3Bkb3duIGFuZCBkb2VzIHRoZSBuZWNlc3NhcnkgY2xlYW51cC4gKi9cbiAgICBwcml2YXRlIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmIHx8ICF0aGlzLm9wZW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJvcGRvd24gPSB0aGlzLmRyb3Bkb3duO1xuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuXG4gICAgICAgIGlmIChkcm9wZG93biBpbnN0YW5jZW9mIE1jRHJvcGRvd24pIHtcbiAgICAgICAgICAgIGRyb3Bkb3duLnJlc2V0QW5pbWF0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIHRoZSBleGl0IGFuaW1hdGlvbiB0byBmaW5pc2ggYmVmb3JlIGRldGFjaGluZyB0aGUgY29udGVudC5cbiAgICAgICAgICAgICAgICBkcm9wZG93bi5hbmltYXRpb25Eb25lXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQudG9TdGF0ZSA9PT0gJ3ZvaWQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnRlcnJ1cHQgaWYgdGhlIGNvbnRlbnQgZ290IHJlLWF0dGFjaGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZVVudGlsKGRyb3Bkb3duLmxhenlDb250ZW50LmF0dGFjaGVkKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoe25leHQ6ICgpID0+IGRyb3Bkb3duLmxhenlDb250ZW50LmRldGFjaCgpLCBlcnJvcjogdW5kZWZpbmVkLCBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gbWF0dGVyIHdoZXRoZXIgdGhlIGNvbnRlbnQgZ290IHJlLWF0dGFjaGVkLCByZXNldCB0aGUgZHJvcGRvd24uXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgICAgICBpZiAoZHJvcGRvd24ubGF6eUNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5sYXp5Q29udGVudC5kZXRhY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHNldHMgdGhlIGRyb3Bkb3duIHN0YXRlIHRvIG9wZW4gYW5kIGZvY3VzZXMgdGhlIGZpcnN0IGl0ZW0gaWZcbiAgICAgKiB0aGUgZHJvcGRvd24gd2FzIG9wZW5lZCB2aWEgdGhlIGtleWJvYXJkLlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5wYXJlbnQgPSB0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSA/IHRoaXMuX3BhcmVudCA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5kaXJlY3Rpb24gPSB0aGlzLmRpcjtcbiAgICAgICAgdGhpcy5zZXRJc09wZW5lZCh0cnVlKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5mb2N1c0ZpcnN0SXRlbSh0aGlzLm9wZW5lZEJ5IHx8ICdwcm9ncmFtJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgcmVzZXRzIHRoZSBkcm9wZG93biB3aGVuIGl0J3MgY2xvc2VkLCBtb3N0IGltcG9ydGFudGx5IHJlc3RvcmluZ1xuICAgICAqIGZvY3VzIHRvIHRoZSBkcm9wZG93biB0cmlnZ2VyIGlmIHRoZSBkcm9wZG93biB3YXMgb3BlbmVkIHZpYSB0aGUga2V5Ym9hcmQuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRJc09wZW5lZChmYWxzZSk7XG5cbiAgICAgICAgLy8gV2Ugc2hvdWxkIHJlc2V0IGZvY3VzIGlmIHRoZSB1c2VyIGlzIG5hdmlnYXRpbmcgdXNpbmcgYSBrZXlib2FyZCBvclxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgdG9wLWxldmVsIHRyaWdnZXIgd2hpY2ggbWlnaHQgY2F1c2UgZm9jdXMgdG8gYmUgbG9zdFxuICAgICAgICAvLyB3aGVuIGNsaWNraW5nIG9uIHRoZSBiYWNrZHJvcC5cbiAgICAgICAgaWYgKCF0aGlzLm9wZW5lZEJ5KSB7XG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgdGhlIGZvY3VzIHN0eWxlIHdpbGwgc2hvdyB1cCBib3RoIGZvciBgcHJvZ3JhbWAgYW5kXG4gICAgICAgICAgICAvLyBga2V5Ym9hcmRgIHNvIHdlIGRvbid0IGhhdmUgdG8gc3BlY2lmeSB3aGljaCBvbmUgaXQgaXMuXG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKHRoaXMub3BlbmVkQnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuZWRCeSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2V0IHN0YXRlIHJhdGhlciB0aGFuIHRvZ2dsZSB0byBzdXBwb3J0IHRyaWdnZXJzIHNoYXJpbmcgYSBkcm9wZG93blxuICAgIHByaXZhdGUgc2V0SXNPcGVuZWQoaXNPcGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29wZW5lZCA9IGlzT3BlbjtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZvaWQtZXhwcmVzc2lvblxuICAgICAgICB0aGlzLl9vcGVuZWQgPyB0aGlzLmRyb3Bkb3duT3BlbmVkLmVtaXQoKSA6IHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgdGhpcy5fZHJvcGRvd25JdGVtSW5zdGFuY2UuaGlnaGxpZ2h0ZWQgPSBpc09wZW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBjaGVja3MgdGhhdCBhIHZhbGlkIGluc3RhbmNlIG9mIE1jRHJvcGRvd24gaGFzIGJlZW4gcGFzc2VkIGludG9cbiAgICAgKiBtY0Ryb3Bkb3duVHJpZ2dlckZvci4gSWYgbm90LCBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5kcm9wZG93bikge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIHRoZSBvdmVybGF5IGZyb20gdGhlIHByb3ZpZGVkIGRyb3Bkb3duJ3MgdGVtcGxhdGUgYW5kIHNhdmVzIGl0c1xuICAgICAqIE92ZXJsYXlSZWYgc28gdGhhdCBpdCBjYW4gYmUgYXR0YWNoZWQgdG8gdGhlIERPTSB3aGVuIG9wZW4gaXMgY2FsbGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlT3ZlcmxheSgpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0T3ZlcmxheUNvbmZpZygpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1Bvc2l0aW9ucyhjb25maWcucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoY29uZmlnKTtcblxuICAgICAgICAgICAgLy8gQ29uc3VtZSB0aGUgYGtleWRvd25FdmVudHNgIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlbSBmcm9tIGdvaW5nIHRvIGFub3RoZXIgb3ZlcmxheS5cbiAgICAgICAgICAgIC8vIElkZWFsbHkgd2UnZCBhbHNvIGhhdmUgb3VyIGtleWJvYXJkIGV2ZW50IGxvZ2ljIGluIGhlcmUsIGhvd2V2ZXIgZG9pbmcgc28gd2lsbFxuICAgICAgICAgICAgLy8gYnJlYWsgYW55Ym9keSB0aGF0IG1heSBoYXZlIGltcGxlbWVudGVkIHRoZSBgTWNEcm9wZG93blBhbmVsYCB0aGVtc2VsdmVzLlxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgYnVpbGRzIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBuZWVkZWQgdG8gY3JlYXRlIHRoZSBvdmVybGF5LCB0aGUgT3ZlcmxheVN0YXRlLlxuICAgICAqIEByZXR1cm5zIE92ZXJsYXlDb25maWdcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgICAgIHJldHVybiBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50KVxuICAgICAgICAgICAgICAgIC53aXRoTG9ja2VkUG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5tYy1kcm9wZG93bl9fcGFuZWwnKSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuZHJvcGRvd24uYmFja2Ryb3BDbGFzcyB8fCAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX3Njcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuX2RpclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW5zIHRvIGNoYW5nZXMgaW4gdGhlIHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5IGFuZCBzZXRzIHRoZSBjb3JyZWN0IGNsYXNzZXNcbiAgICAgKiBvbiB0aGUgZHJvcGRvd24gYmFzZWQgb24gdGhlIG5ldyBwb3NpdGlvbi4gVGhpcyBlbnN1cmVzIHRoZSBhbmltYXRpb24gb3JpZ2luIGlzIGFsd2F5c1xuICAgICAqIGNvcnJlY3QsIGV2ZW4gaWYgYSBmYWxsYmFjayBwb3NpdGlvbiBpcyB1c2VkIGZvciB0aGUgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvUG9zaXRpb25zKHBvc2l0aW9uOiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24uc2V0UG9zaXRpb25DbGFzc2VzKSB7XG4gICAgICAgICAgICBwb3NpdGlvbi5wb3NpdGlvbkNoYW5nZXMuc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NYOiBEcm9wZG93blBvc2l0aW9uWCA9IGNoYW5nZS5jb25uZWN0aW9uUGFpci5vdmVybGF5WCA9PT0gJ3N0YXJ0JyA/ICdhZnRlcicgOiAnYmVmb3JlJztcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NZOiBEcm9wZG93blBvc2l0aW9uWSA9IGNoYW5nZS5jb25uZWN0aW9uUGFpci5vdmVybGF5WSA9PT0gJ3RvcCcgPyAnYmVsb3cnIDogJ2Fib3ZlJztcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uc2V0UG9zaXRpb25DbGFzc2VzIShwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYXBwcm9wcmlhdGUgcG9zaXRpb25zIG9uIGEgcG9zaXRpb24gc3RyYXRlZ3lcbiAgICAgKiBzbyB0aGUgb3ZlcmxheSBjb25uZWN0cyB3aXRoIHRoZSB0cmlnZ2VyIGNvcnJlY3RseS5cbiAgICAgKiBAcGFyYW0gcG9zaXRpb25TdHJhdGVneSBTdHJhdGVneSB3aG9zZSBwb3NpdGlvbiB0byB1cGRhdGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRQb3NpdGlvbihwb3NpdGlvblN0cmF0ZWd5OiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpIHtcbiAgICAgICAgbGV0IFtvcmlnaW5YLCBvcmlnaW5GYWxsYmFja1gsIG92ZXJsYXlYLCBvdmVybGF5RmFsbGJhY2tYXTogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3NbXSA9XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnhQb3NpdGlvbiA9PT0gJ2JlZm9yZScgP1xuICAgICAgICAgICAgICAgIFsnZW5kJywgJ3N0YXJ0JywgJ2VuZCcsICdzdGFydCddIDpcbiAgICAgICAgICAgICAgICBbJ3N0YXJ0JywgJ2VuZCcsICdzdGFydCcsICdlbmQnXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgICAgIGxldCBbb3ZlcmxheVksIG92ZXJsYXlGYWxsYmFja1ksIG9yaWdpblksIG9yaWdpbkZhbGxiYWNrWV06IFZlcnRpY2FsQ29ubmVjdGlvblBvc1tdID1cbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ueVBvc2l0aW9uID09PSAnYWJvdmUnID9cbiAgICAgICAgICAgICAgICBbJ2JvdHRvbScsICd0b3AnLCAnYm90dG9tJywgJ3RvcCddIDpcbiAgICAgICAgICAgICAgICBbJ3RvcCcsICdib3R0b20nLCAndG9wJywgJ2JvdHRvbSddO1xuXG4gICAgICAgIGxldCBvZmZzZXRZID0gMDtcblxuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gdGhlIGRyb3Bkb3duIGlzIG5lc3RlZCwgaXQgc2hvdWxkIGFsd2F5cyBhbGlnbiBpdHNlbGZcbiAgICAgICAgICAgIC8vIHRvIHRoZSBlZGdlcyBvZiB0aGUgdHJpZ2dlciwgaW5zdGVhZCBvZiBvdmVybGFwcGluZyBpdC5cbiAgICAgICAgICAgIG92ZXJsYXlGYWxsYmFja1ggPSBvcmlnaW5YID0gdGhpcy5kcm9wZG93bi54UG9zaXRpb24gPT09ICdiZWZvcmUnID8gJ3N0YXJ0JyA6ICdlbmQnO1xuICAgICAgICAgICAgb3JpZ2luRmFsbGJhY2tYID0gb3ZlcmxheVggPSBvcmlnaW5YID09PSAnZW5kJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgIG9mZnNldFkgPSBvdmVybGF5WSA9PT0gJ2JvdHRvbScgPyBORVNURURfUEFORUxfVE9QX1BBRERJTkcgOiAtTkVTVEVEX1BBTkVMX1RPUF9QQURESU5HO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duLm92ZXJsYXBUcmlnZ2VyWSkge1xuICAgICAgICAgICAgICAgIG9yaWdpblkgPSBvdmVybGF5WSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICAgICAgICAgICAgICAgIG9yaWdpbkZhbGxiYWNrWSA9IG92ZXJsYXlGYWxsYmFja1kgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duLm92ZXJsYXBUcmlnZ2VyWCkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlGYWxsYmFja1ggPSBvcmlnaW5YID0gdGhpcy5kcm9wZG93bi54UG9zaXRpb24gPT09ICdiZWZvcmUnID8gJ3N0YXJ0JyA6ICdlbmQnO1xuICAgICAgICAgICAgICAgIG9yaWdpbkZhbGxiYWNrWCA9IG92ZXJsYXlYID0gb3JpZ2luWCA9PT0gJ2VuZCcgPyAnc3RhcnQnIDogJ2VuZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwb3NpdGlvblN0cmF0ZWd5LndpdGhQb3NpdGlvbnMoW1xuICAgICAgICAgICAgeyBvcmlnaW5YLCBvcmlnaW5ZLCBvdmVybGF5WCwgb3ZlcmxheVksIG9mZnNldFkgfSxcbiAgICAgICAgICAgIHsgb3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLCBvcmlnaW5ZLCBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCwgb3ZlcmxheVksIG9mZnNldFkgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6IG9yaWdpbkZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvdmVybGF5WCxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiAtb2Zmc2V0WVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YOiBvcmlnaW5GYWxsYmFja1gsXG4gICAgICAgICAgICAgICAgb3JpZ2luWTogb3JpZ2luRmFsbGJhY2tZLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiBvdmVybGF5RmFsbGJhY2tYLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiBvdmVybGF5RmFsbGJhY2tZLFxuICAgICAgICAgICAgICAgIG9mZnNldFk6IC1vZmZzZXRZXG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKiBDbGVhbnMgdXAgdGhlIGFjdGl2ZSBzdWJzY3JpcHRpb25zLiAqL1xuICAgIHByaXZhdGUgY2xlYW5VcFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5ob3ZlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGEgc3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgYW4gYWN0aW9uIHRoYXQgc2hvdWxkIGNsb3NlIHRoZSBkcm9wZG93biBvY2N1cnMuICovXG4gICAgcHJpdmF0ZSBjbG9zaW5nQWN0aW9ucygpIHtcbiAgICAgICAgY29uc3QgYmFja2Ryb3AgPSB0aGlzLm92ZXJsYXlSZWYhLmJhY2tkcm9wQ2xpY2soKTtcbiAgICAgICAgY29uc3QgZGV0YWNobWVudHMgPSB0aGlzLm92ZXJsYXlSZWYhLmRldGFjaG1lbnRzKCk7XG4gICAgICAgIGNvbnN0IHBhcmVudENsb3NlID0gdGhpcy5fcGFyZW50ID8gdGhpcy5fcGFyZW50LmNsb3NlZCA6IG9ic2VydmFibGVPZigpO1xuICAgICAgICBjb25zdCBob3ZlciA9IHRoaXMuX3BhcmVudCA/IHRoaXMuX3BhcmVudC5ob3ZlcmVkKCkucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoYWN0aXZlKSA9PiBhY3RpdmUgIT09IHRoaXMuX2Ryb3Bkb3duSXRlbUluc3RhbmNlKSxcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLl9vcGVuZWQpXG4gICAgICAgICkgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICByZXR1cm4gbWVyZ2UoYmFja2Ryb3AsIHBhcmVudENsb3NlLCBob3ZlciwgZGV0YWNobWVudHMpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHRoZSBjYXNlcyB3aGVyZSB0aGUgdXNlciBob3ZlcnMgb3ZlciB0aGUgdHJpZ2dlci4gKi9cbiAgICBwcml2YXRlIGhhbmRsZUhvdmVyKCkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgaG92ZXJlZCBpdGVtIGluIG9yZGVyIHRvIHRvZ2dsZSB0aGUgcGFuZWwuXG4gICAgICAgIGlmICghdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaG92ZXJTdWJzY3JpcHRpb24gPSB0aGlzLl9wYXJlbnQuaG92ZXJlZCgpXG4gICAgICAgIC8vIFNpbmNlIHdlIG1pZ2h0IGhhdmUgbXVsdGlwbGUgY29tcGV0aW5nIHRyaWdnZXJzIGZvciB0aGUgc2FtZSBkcm9wZG93biAoZS5nLiBhIG5lc3RlZCBkcm9wZG93blxuICAgICAgICAvLyB3aXRoIGRpZmZlcmVudCBkYXRhIGFuZCB0cmlnZ2VycyksIHdlIGhhdmUgdG8gZGVsYXkgaXQgYnkgYSB0aWNrIHRvIGVuc3VyZSB0aGF0XG4gICAgICAgIC8vIGl0IHdvbid0IGJlIGNsb3NlZCBpbW1lZGlhdGVseSBhZnRlciBpdCBpcyBvcGVuZWQuXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKGFjdGl2ZSkgPT4gYWN0aXZlID09PSB0aGlzLl9kcm9wZG93bkl0ZW1JbnN0YW5jZSAmJiAhYWN0aXZlLmRpc2FibGVkKSxcbiAgICAgICAgICAgICAgICBkZWxheSgwLCBhc2FwU2NoZWR1bGVyKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRCeSA9ICdtb3VzZSc7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2FtZSBkcm9wZG93biBpcyB1c2VkIGJldHdlZW4gbXVsdGlwbGUgdHJpZ2dlcnMsIGl0IG1pZ2h0IHN0aWxsIGJlIGFuaW1hdGluZ1xuICAgICAgICAgICAgICAgIC8vIHdoaWxlIHRoZSBuZXcgdHJpZ2dlciB0cmllcyB0byByZS1vcGVuIGl0LiBXYWl0IGZvciB0aGUgYW5pbWF0aW9uIHRvIGZpbmlzaFxuICAgICAgICAgICAgICAgIC8vIGJlZm9yZSBkb2luZyBzby4gQWxzbyBpbnRlcnJ1cHQgaWYgdGhlIHVzZXIgbW92ZXMgdG8gYW5vdGhlciBpdGVtLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb3Bkb3duIGluc3RhbmNlb2YgTWNEcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLmlzQW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdGhlIGBkZWxheSgwKWAgaGVyZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgICAgICAgICAgICAvLyAnY2hhbmdlZCBhZnRlciBjaGVja2VkJyBlcnJvcnMgaW4gc29tZSBjYXNlcy4gU2VlICMxMjE5NC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5hbmltYXRpb25Eb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpLCBkZWxheSgwLCBhc2FwU2NoZWR1bGVyKSwgdGFrZVVudGlsKHRoaXMuX3BhcmVudC5ob3ZlcmVkKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9wZW4oKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEdldHMgdGhlIHBvcnRhbCB0aGF0IHNob3VsZCBiZSBhdHRhY2hlZCB0byB0aGUgb3ZlcmxheS4gKi9cbiAgICBwcml2YXRlIGdldFBvcnRhbCgpOiBUZW1wbGF0ZVBvcnRhbCB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4gYXZvaWQgdGhpcyBjaGVjayBieSBrZWVwaW5nIHRoZSBwb3J0YWwgb24gdGhlIGRyb3Bkb3duIHBhbmVsLlxuICAgICAgICAvLyBXaGlsZSBpdCB3b3VsZCBiZSBjbGVhbmVyLCB3ZSdkIGhhdmUgdG8gaW50cm9kdWNlIGFub3RoZXIgcmVxdWlyZWQgbWV0aG9kIG9uXG4gICAgICAgIC8vIGBNY0Ryb3Bkb3duUGFuZWxgLCBtYWtpbmcgaXQgaGFyZGVyIHRvIGNvbnN1bWUuXG4gICAgICAgIGlmICghdGhpcy5wb3J0YWwgfHwgdGhpcy5wb3J0YWwudGVtcGxhdGVSZWYgIT09IHRoaXMuZHJvcGRvd24udGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuZHJvcGRvd24udGVtcGxhdGVSZWYsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9ydGFsO1xuICAgIH1cblxufVxuIl19
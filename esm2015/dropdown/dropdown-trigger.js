/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-trigger.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export const MC_DROPDOWN_SCROLL_STRATEGY = new InjectionToken('mc-dropdown-scroll-strategy');
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
    () => overlay.scrollStrategies.reposition());
}
/**
 * \@docs-private
 * @type {?}
 */
export const MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DROPDOWN_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
};
/**
 * Default top padding of the nested dropdown panel.
 * @type {?}
 */
export const NESTED_PANEL_TOP_PADDING = 2;
/**
 * Options for binding a passive event listener.
 * @type {?}
 */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
export class McDropdownTrigger {
    /**
     * @param {?} _overlay
     * @param {?} _element
     * @param {?} _viewContainerRef
     * @param {?} _scrollStrategy
     * @param {?} _parent
     * @param {?} _dropdownItemInstance
     * @param {?} _dir
     * @param {?=} _focusMonitor
     */
    constructor(_overlay, _element, _viewContainerRef, _scrollStrategy, _parent, _dropdownItemInstance, _dir, _focusMonitor) {
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
        this.outsidePointerEventsSubscription = Subscription.EMPTY;
        /**
         * Handles touch start events on the trigger.
         * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
         */
        this.handleTouchStart = (/**
         * @return {?}
         */
        () => this.openedBy = 'touch');
        _element.nativeElement.addEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
        if (_dropdownItemInstance) {
            _dropdownItemInstance.triggersNestedDropdown = this.triggersNestedDropdown();
        }
    }
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    get dir() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * References the dropdown instance that the trigger is associated with.
     * @return {?}
     */
    get dropdown() {
        return this._dropdown;
    }
    /**
     * @param {?} dropdown
     * @return {?}
     */
    set dropdown(dropdown) {
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
            (reason) => {
                this.destroy();
                // If a click closed the dropdown, we should close the entire chain of nested dropdowns.
                if ((reason === 'click' || reason === 'tab') && this._parent) {
                    this._parent.closed.emit(reason);
                }
            }));
        }
    }
    /**
     * Whether the dropdown is open.
     * @return {?}
     */
    get opened() {
        return this._opened;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.check();
        this.handleHover();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
        this._element.nativeElement.removeEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
        this.cleanUpSubscriptions();
        this.closeSubscription.unsubscribe();
    }
    /**
     * Whether the dropdown triggers a nested dropdown or a top-level one.
     * @return {?}
     */
    triggersNestedDropdown() {
        return !!(this._dropdownItemInstance && this._parent);
    }
    /**
     * Toggles the dropdown between the open and closed states.
     * @return {?}
     */
    toggle() {
        // tslint:disable-next-line:no-void-expression
        return this._opened ? this.close() : this.open();
    }
    /**
     * Opens the dropdown.
     * @return {?}
     */
    open() {
        if (this._opened) {
            return;
        }
        this.check();
        /** @type {?} */
        const overlayRef = this.createOverlay();
        /** @type {?} */
        const overlayConfig = overlayRef.getConfig();
        // Listen for outside click and close the menu when it occurs
        if (this.dropdown.closeOnOutsideClick) {
            this.outsidePointerEventsSubscription = overlayRef.outsidePointerEvents().subscribe((/**
             * @return {?}
             */
            () => {
                if (this.dropdownOpened) {
                    this.close();
                }
            }));
        }
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
        () => this.close()));
        this.init();
        if (this.dropdown instanceof McDropdown) {
            this.dropdown.startAnimation();
        }
    }
    /**
     * Closes the dropdown.
     * @return {?}
     */
    close() {
        this.dropdown.closed.emit();
    }
    /**
     * Focuses the dropdown trigger.
     * @param {?=} origin Source of the dropdown trigger's focus.
     * @return {?}
     */
    focus(origin = 'program') {
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._element.nativeElement, origin);
        }
        else {
            this._element.nativeElement.focus();
        }
    }
    /**
     * Handles mouse presses on the trigger.
     * @param {?} event
     * @return {?}
     */
    handleMousedown(event) {
        // Since right or middle button clicks won't trigger the `click` event,
        // we shouldn't consider the dropdown as opened by mouse in those cases.
        this.openedBy = event.button === 0 ? 'mouse' : null;
        // Since clicking on the trigger won't close the dropdown if it opens a nested dropdown,
        // we should prevent focus from moving onto it via click to avoid the
        // highlight from lingering on the dropdown item.
        if (this.triggersNestedDropdown()) {
            event.preventDefault();
        }
    }
    /**
     * Handles key presses on the trigger.
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        const keyCode = event.key || event.keyCode;
        if (keyCode === SPACE || keyCode === ENTER) {
            this.open();
        }
        if (this.triggersNestedDropdown() && ((keyCode === RIGHT_ARROW && this.dir === 'ltr') ||
            (keyCode === LEFT_ARROW && this.dir === 'rtl'))) {
            this.open();
        }
    }
    /**
     * Handles click events on the trigger.
     * @param {?} event
     * @return {?}
     */
    handleClick(event) {
        if (this.triggersNestedDropdown()) {
            // Stop event propagation to avoid closing the parent dropdown.
            event.stopPropagation();
            this.open();
        }
        else {
            this.toggle();
        }
    }
    /**
     * Closes the dropdown and does the necessary cleanup.
     * @private
     * @return {?}
     */
    destroy() {
        if (!this.overlayRef || !this.opened) {
            return;
        }
        /** @type {?} */
        const dropdown = this.dropdown;
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
                (event) => event.toState === 'void')), take(1), 
                // Interrupt if the content got re-attached.
                takeUntil(dropdown.lazyContent.attached))
                    .subscribe({ next: (/**
                     * @return {?}
                     */
                    () => dropdown.lazyContent.detach()), error: undefined, complete: (/**
                     * @return {?}
                     */
                    () => {
                        // No matter whether the content got re-attached, reset the dropdown.
                        this.reset();
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
    }
    /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     * @private
     * @return {?}
     */
    init() {
        this.dropdown.parent = this.triggersNestedDropdown() ? this._parent : undefined;
        this.dropdown.direction = this.dir;
        this.setIsOpened(true);
        this.dropdown.focusFirstItem(this.openedBy || 'program');
    }
    /**
     * This method resets the dropdown when it's closed, most importantly restoring
     * focus to the dropdown trigger if the dropdown was opened via the keyboard.
     * @private
     * @return {?}
     */
    reset() {
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
    }
    // set state rather than toggle to support triggers sharing a dropdown
    /**
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    setIsOpened(isOpen) {
        this._opened = isOpen;
        // tslint:disable-next-line:no-void-expression
        this._opened ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
        if (this.triggersNestedDropdown()) {
            this._dropdownItemInstance.highlighted = isOpen;
        }
    }
    /**
     * This method checks that a valid instance of McDropdown has been passed into
     * mcDropdownTriggerFor. If not, an exception is thrown.
     * @private
     * @return {?}
     */
    check() {
        if (!this.dropdown) {
            throwMcDropdownMissingError();
        }
    }
    /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     * @private
     * @return {?}
     */
    createOverlay() {
        if (!this.overlayRef) {
            /** @type {?} */
            const config = this.getOverlayConfig();
            this.subscribeToPositions((/** @type {?} */ (config.positionStrategy)));
            this.overlayRef = this._overlay.create(config);
            // Consume the `keydownEvents` in order to prevent them from going to another overlay.
            // Ideally we'd also have our keyboard event logic in here, however doing so will
            // break anybody that may have implemented the `McDropdownPanel` themselves.
            this.overlayRef.keydownEvents().subscribe();
        }
        return this.overlayRef;
    }
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @private
     * @return {?} OverlayConfig
     */
    getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._element)
                .withLockedPosition()
                .withTransformOriginOn('.mc-dropdown__panel'),
            backdropClass: this.dropdown.backdropClass || 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this._scrollStrategy(),
            direction: this._dir
        });
    }
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the dropdown based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     * @private
     * @param {?} position
     * @return {?}
     */
    subscribeToPositions(position) {
        if (this.dropdown.setPositionClasses) {
            position.positionChanges.subscribe((/**
             * @param {?} change
             * @return {?}
             */
            (change) => {
                /** @type {?} */
                const posX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
                /** @type {?} */
                const posY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';
                (/** @type {?} */ (this.dropdown.setPositionClasses))(posX, posY);
            }));
        }
    }
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @private
     * @param {?} positionStrategy Strategy whose position to update.
     * @return {?}
     */
    setPosition(positionStrategy) {
        let [originX, originFallbackX, overlayX, overlayFallbackX] = this.dropdown.xPosition === 'before' ?
            ['end', 'start', 'end', 'start'] :
            ['start', 'end', 'start', 'end'];
        // tslint:disable-next-line:prefer-const
        let [overlayY, overlayFallbackY, originY, originFallbackY] = this.dropdown.yPosition === 'above' ?
            ['bottom', 'top', 'bottom', 'top'] :
            ['top', 'bottom', 'top', 'bottom'];
        /** @type {?} */
        let offsetY = 0;
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
            { originX, originY, overlayX, overlayY, offsetY },
            { originX: originFallbackX, originY, overlayX: overlayFallbackX, overlayY, offsetY },
            {
                originX,
                originY: originFallbackY,
                overlayX,
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
    }
    /**
     * Cleans up the active subscriptions.
     * @private
     * @return {?}
     */
    cleanUpSubscriptions() {
        this.closeSubscription.unsubscribe();
        this.hoverSubscription.unsubscribe();
        this.outsidePointerEventsSubscription.unsubscribe();
    }
    /**
     * Returns a stream that emits whenever an action that should close the dropdown occurs.
     * @private
     * @return {?}
     */
    closingActions() {
        /** @type {?} */
        const backdrop = (/** @type {?} */ (this.overlayRef)).backdropClick();
        /** @type {?} */
        const detachments = (/** @type {?} */ (this.overlayRef)).detachments();
        /** @type {?} */
        const parentClose = this._parent ? this._parent.closed : observableOf();
        /** @type {?} */
        const hover = this._parent ? this._parent.hovered().pipe(filter((/**
         * @param {?} active
         * @return {?}
         */
        (active) => active !== this._dropdownItemInstance)), filter((/**
         * @return {?}
         */
        () => this._opened))) : observableOf();
        return merge(backdrop, parentClose, hover, detachments);
    }
    /**
     * Handles the cases where the user hovers over the trigger.
     * @private
     * @return {?}
     */
    handleHover() {
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
        (active) => active === this._dropdownItemInstance && !active.disabled)), delay(0, asapScheduler))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.openedBy = 'mouse';
            // If the same dropdown is used between multiple triggers, it might still be animating
            // while the new trigger tries to re-open it. Wait for the animation to finish
            // before doing so. Also interrupt if the user moves to another item.
            if (this.dropdown instanceof McDropdown && this.dropdown.isAnimating) {
                // We need the `delay(0)` here in order to avoid
                // 'changed after checked' errors in some cases. See #12194.
                this.dropdown.animationDone
                    .pipe(take(1), delay(0, asapScheduler), takeUntil(this._parent.hovered()))
                    .subscribe((/**
                 * @return {?}
                 */
                () => this.open()));
            }
            else {
                this.open();
            }
        }));
    }
    /**
     * Gets the portal that should be attached to the overlay.
     * @private
     * @return {?}
     */
    getPortal() {
        // Note that we can avoid this check by keeping the portal on the dropdown panel.
        // While it would be cleaner, we'd have to introduce another required method on
        // `McDropdownPanel`, making it harder to consume.
        if (!this.portal || this.portal.templateRef !== this.dropdown.templateRef) {
            this.portal = new TemplatePortal(this.dropdown.templateRef, this._viewContainerRef);
        }
        return this.portal;
    }
}
McDropdownTrigger.decorators = [
    { type: Directive, args: [{
                selector: `[mcDropdownTriggerFor]`,
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
McDropdownTrigger.ctorParameters = () => [
    { type: Overlay },
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [MC_DROPDOWN_SCROLL_STRATEGY,] }] },
    { type: McDropdown, decorators: [{ type: Optional }] },
    { type: McDropdownItem, decorators: [{ type: Optional }, { type: Self }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: FocusMonitor }
];
McDropdownTrigger.propDecorators = {
    dropdown: [{ type: Input, args: ['mcDropdownTriggerFor',] }],
    data: [{ type: Input, args: ['mcDropdownTriggerData',] }],
    dropdownOpened: [{ type: Output }],
    dropdownClosed: [{ type: Output }]
};
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
     * @type {?}
     * @private
     */
    McDropdownTrigger.prototype.outsidePointerEventsSubscription;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24tdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUdILE9BQU8sRUFDUCxhQUFhLEVBSWhCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLElBQUksRUFDSixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztBQUlsRCxNQUFN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VUFBVTtZQVNWLGdCQUFnQjs0Q0F1SFgsTUFBTSxTQUFDLDJCQUEyQjtZQTdHbEMsVUFBVSx1QkE4R1YsUUFBUTtZQWpIUixjQUFjLHVCQWtIZCxRQUFRLFlBQUksSUFBSTtZQWpKTCxjQUFjLHVCQWtKekIsUUFBUTtZQW5KUixZQUFZOzs7dUJBcUZoQixLQUFLLFNBQUMsc0JBQXNCO21CQTRCNUIsS0FBSyxTQUFDLHVCQUF1Qjs2QkFHN0IsTUFBTTs2QkFHTixNQUFNOzs7O0lBVFAscUNBQTBDOzs7OztJQUcxQyxpQ0FBMEM7Ozs7O0lBRzFDLDJDQUFpRjs7Ozs7SUFHakYsMkNBQWlGOzs7OztJQUVqRixzQ0FBbUM7Ozs7O0lBT25DLG9DQUFpQzs7Ozs7SUFFakMsbUNBQStCOzs7OztJQUUvQix1Q0FBNkM7Ozs7O0lBRTdDLDhDQUErQzs7Ozs7SUFFL0MsOENBQStDOzs7OztJQUUvQyw2REFBOEQ7Ozs7Ozs7SUFrSjlELDZDQUF5RDs7Ozs7SUEvSXJELHFDQUF5Qjs7Ozs7SUFDekIscUNBQXlDOzs7OztJQUN6Qyw4Q0FBMkM7Ozs7O0lBQzNDLDRDQUFpRTs7Ozs7SUFDakUsb0NBQXVDOzs7OztJQUN2QyxrREFBaUU7Ozs7O0lBQ2pFLGlDQUF3Qzs7Ozs7SUFDeEMsMENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyxcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlDb25maWcsXG4gICAgT3ZlcmxheVJlZixcbiAgICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MsXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTZWxmLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgU1BBQ0UsIEVOVEVSIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IGFzYXBTY2hlZHVsZXIsIG1lcmdlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIGZpbHRlciwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyB0aHJvd01jRHJvcGRvd25NaXNzaW5nRXJyb3IgfSBmcm9tICcuL2Ryb3Bkb3duLWVycm9ycyc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duSXRlbSB9IGZyb20gJy4vZHJvcGRvd24taXRlbSc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLXBhbmVsJztcbmltcG9ydCB7IERyb3Bkb3duUG9zaXRpb25YLCBEcm9wZG93blBvc2l0aW9uWSB9IGZyb20gJy4vZHJvcGRvd24tcG9zaXRpb25zJztcbmltcG9ydCB7IE1jRHJvcGRvd24gfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSB0aGUgZHJvcGRvd24gaXMgb3Blbi4gKi9cbmV4cG9ydCBjb25zdCBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1kgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLWRyb3Bkb3duLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUlkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1ksXG4gICAgZGVwczogW092ZXJsYXldLFxuICAgIHVzZUZhY3Rvcnk6IE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZXG59O1xuXG4vKiogRGVmYXVsdCB0b3AgcGFkZGluZyBvZiB0aGUgbmVzdGVkIGRyb3Bkb3duIHBhbmVsLiAqL1xuZXhwb3J0IGNvbnN0IE5FU1RFRF9QQU5FTF9UT1BfUEFERElORyA9IDI7XG5cbi8qKiBPcHRpb25zIGZvciBiaW5kaW5nIGEgcGFzc2l2ZSBldmVudCBsaXN0ZW5lci4gKi9cbmNvbnN0IHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IHRydWV9KTtcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYW4gbWMtZHJvcGRvd24gdGFnLiAgSXQgaXNcbiAqIHJlc3BvbnNpYmxlIGZvciB0b2dnbGluZyB0aGUgZGlzcGxheSBvZiB0aGUgcHJvdmlkZWQgZHJvcGRvd24gaW5zdGFuY2UuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBgW21jRHJvcGRvd25UcmlnZ2VyRm9yXWAsXG4gICAgaG9zdDoge1xuICAgICAgICAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ29wZW5lZCB8fCBudWxsJyxcbiAgICAgICAgJyhtb3VzZWRvd24pJzogJ2hhbmRsZU1vdXNlZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKGNsaWNrKSc6ICdoYW5kbGVDbGljaygkZXZlbnQpJ1xuICAgIH0sXG4gICAgZXhwb3J0QXM6ICdtY0Ryb3Bkb3duVHJpZ2dlcidcbn0pXG5leHBvcnQgY2xhc3MgTWNEcm9wZG93blRyaWdnZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFRoZSB0ZXh0IGRpcmVjdGlvbiBvZiB0aGUgY29udGFpbmluZyBhcHAuICovXG4gICAgZ2V0IGRpcigpOiBEaXJlY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcgPyAncnRsJyA6ICdsdHInO1xuICAgIH1cblxuXG4gICAgLyoqIFJlZmVyZW5jZXMgdGhlIGRyb3Bkb3duIGluc3RhbmNlIHRoYXQgdGhlIHRyaWdnZXIgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICAgIEBJbnB1dCgnbWNEcm9wZG93blRyaWdnZXJGb3InKVxuICAgIGdldCBkcm9wZG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Ryb3Bkb3duO1xuICAgIH1cblxuICAgIHNldCBkcm9wZG93bihkcm9wZG93bjogTWNEcm9wZG93blBhbmVsKSB7XG4gICAgICAgIGlmIChkcm9wZG93biA9PT0gdGhpcy5fZHJvcGRvd24pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fZHJvcGRvd24gPSBkcm9wZG93bjtcbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIGlmIChkcm9wZG93bikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbiA9IGRyb3Bkb3duLmNsb3NlZC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgYSBjbGljayBjbG9zZWQgdGhlIGRyb3Bkb3duLCB3ZSBzaG91bGQgY2xvc2UgdGhlIGVudGlyZSBjaGFpbiBvZiBuZXN0ZWQgZHJvcGRvd25zLlxuICAgICAgICAgICAgICAgIGlmICgocmVhc29uID09PSAnY2xpY2snIHx8IHJlYXNvbiA9PT0gJ3RhYicpICYmIHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQuY2xvc2VkLmVtaXQocmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyYWNraW5nIGlucHV0IHR5cGUgaXMgbmVjZXNzYXJ5IHNvIGl0J3MgcG9zc2libGUgdG8gb25seSBhdXRvLWZvY3VzXG4gICAgLy8gdGhlIGZpcnN0IGl0ZW0gb2YgdGhlIGxpc3Qgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkIHZpYSB0aGUga2V5Ym9hcmRcbiAgICBvcGVuZWRCeTogJ21vdXNlJyB8ICd0b3VjaCcgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBEYXRhIHRvIGJlIHBhc3NlZCBhbG9uZyB0byBhbnkgbGF6aWx5LXJlbmRlcmVkIGNvbnRlbnQuICovXG4gICAgQElucHV0KCdtY0Ryb3Bkb3duVHJpZ2dlckRhdGEnKSBkYXRhOiBhbnk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhc3NvY2lhdGVkIGRyb3Bkb3duIGlzIG9wZW5lZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZHJvcGRvd25PcGVuZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFzc29jaWF0ZWQgZHJvcGRvd24gaXMgY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkcm9wZG93bkNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgcHJpdmF0ZSBfZHJvcGRvd246IE1jRHJvcGRvd25QYW5lbDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBpcyBvcGVuLiAqL1xuICAgIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHBvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgY2xvc2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBwcml2YXRlIGhvdmVyU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBvdXRzaWRlUG9pbnRlckV2ZW50c1N1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX3BhcmVudDogTWNEcm9wZG93bixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcml2YXRlIF9kcm9wZG93bkl0ZW1JbnN0YW5jZTogTWNEcm9wZG93bkl0ZW0sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcj86IEZvY3VzTW9uaXRvclxuICAgICkge1xuICAgICAgICBfZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG4gICAgICAgICAgICBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChfZHJvcGRvd25JdGVtSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIF9kcm9wZG93bkl0ZW1JbnN0YW5jZS50cmlnZ2Vyc05lc3RlZERyb3Bkb3duID0gdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2soKTtcbiAgICAgICAgdGhpcy5oYW5kbGVIb3ZlcigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuICAgICAgICAgICAgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcblxuICAgICAgICB0aGlzLmNsZWFuVXBTdWJzY3JpcHRpb25zKCk7XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gdHJpZ2dlcnMgYSBuZXN0ZWQgZHJvcGRvd24gb3IgYSB0b3AtbGV2ZWwgb25lLiAqL1xuICAgIHRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhISh0aGlzLl9kcm9wZG93bkl0ZW1JbnN0YW5jZSAmJiB0aGlzLl9wYXJlbnQpO1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBkcm9wZG93biBiZXR3ZWVuIHRoZSBvcGVuIGFuZCBjbG9zZWQgc3RhdGVzLiAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZvaWQtZXhwcmVzc2lvblxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBkcm9wZG93bi4gKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuY2hlY2soKTtcblxuICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBvdmVybGF5UmVmLmdldENvbmZpZygpO1xuXG4gICAgICAgIC8vIExpc3RlbiBmb3Igb3V0c2lkZSBjbGljayBhbmQgY2xvc2UgdGhlIG1lbnUgd2hlbiBpdCBvY2N1cnNcbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24uY2xvc2VPbk91dHNpZGVDbGljaykge1xuICAgICAgICAgICAgdGhpcy5vdXRzaWRlUG9pbnRlckV2ZW50c1N1YnNjcmlwdGlvbiA9IG92ZXJsYXlSZWYub3V0c2lkZVBvaW50ZXJFdmVudHMoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb3Bkb3duT3BlbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ob3ZlcmxheUNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk7XG4gICAgICAgIG92ZXJsYXlDb25maWcuaGFzQmFja2Ryb3AgPSB0aGlzLmRyb3Bkb3duLmhhc0JhY2tkcm9wID09IG51bGwgPyAhdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkgOlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5oYXNCYWNrZHJvcDtcbiAgICAgICAgb3ZlcmxheVJlZi5hdHRhY2godGhpcy5nZXRQb3J0YWwoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24ubGF6eUNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubGF6eUNvbnRlbnQuYXR0YWNoKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uID0gdGhpcy5jbG9zaW5nQWN0aW9ucygpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93biBpbnN0YW5jZW9mIE1jRHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uc3RhcnRBbmltYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIGRyb3Bkb3duLiAqL1xuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXNlcyB0aGUgZHJvcGRvd24gdHJpZ2dlci5cbiAgICAgKiBAcGFyYW0gb3JpZ2luIFNvdXJjZSBvZiB0aGUgZHJvcGRvd24gdHJpZ2dlcidzIGZvY3VzLlxuICAgICAqL1xuICAgIGZvY3VzKG9yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgb3JpZ2luKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgbW91c2UgcHJlc3NlcyBvbiB0aGUgdHJpZ2dlci4gKi9cbiAgICBoYW5kbGVNb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gU2luY2UgcmlnaHQgb3IgbWlkZGxlIGJ1dHRvbiBjbGlja3Mgd29uJ3QgdHJpZ2dlciB0aGUgYGNsaWNrYCBldmVudCxcbiAgICAgICAgLy8gd2Ugc2hvdWxkbid0IGNvbnNpZGVyIHRoZSBkcm9wZG93biBhcyBvcGVuZWQgYnkgbW91c2UgaW4gdGhvc2UgY2FzZXMuXG4gICAgICAgIHRoaXMub3BlbmVkQnkgPSBldmVudC5idXR0b24gPT09IDAgPyAnbW91c2UnIDogbnVsbDtcblxuICAgICAgICAvLyBTaW5jZSBjbGlja2luZyBvbiB0aGUgdHJpZ2dlciB3b24ndCBjbG9zZSB0aGUgZHJvcGRvd24gaWYgaXQgb3BlbnMgYSBuZXN0ZWQgZHJvcGRvd24sXG4gICAgICAgIC8vIHdlIHNob3VsZCBwcmV2ZW50IGZvY3VzIGZyb20gbW92aW5nIG9udG8gaXQgdmlhIGNsaWNrIHRvIGF2b2lkIHRoZVxuICAgICAgICAvLyBoaWdobGlnaHQgZnJvbSBsaW5nZXJpbmcgb24gdGhlIGRyb3Bkb3duIGl0ZW0uXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGtleSBwcmVzc2VzIG9uIHRoZSB0cmlnZ2VyLiAqL1xuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXkgfHwgZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gU1BBQ0UgfHwga2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpICYmIChcbiAgICAgICAgICAgIChrZXlDb2RlID09PSBSSUdIVF9BUlJPVyAmJiB0aGlzLmRpciA9PT0gJ2x0cicpIHx8XG4gICAgICAgICAgICAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVyAmJiB0aGlzLmRpciA9PT0gJ3J0bCcpKSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBjbGljayBldmVudHMgb24gdGhlIHRyaWdnZXIuICovXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICAvLyBTdG9wIGV2ZW50IHByb3BhZ2F0aW9uIHRvIGF2b2lkIGNsb3NpbmcgdGhlIHBhcmVudCBkcm9wZG93bi5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0b3VjaCBzdGFydCBldmVudHMgb24gdGhlIHRyaWdnZXIuXG4gICAgICogTmVlZHMgdG8gYmUgYW4gYXJyb3cgZnVuY3Rpb24gc28gd2UgY2FuIGVhc2lseSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBhbmQgcmVtb3ZlRXZlbnRMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhhbmRsZVRvdWNoU3RhcnQgPSAoKSA9PiB0aGlzLm9wZW5lZEJ5ID0gJ3RvdWNoJztcblxuICAgIC8qKiBDbG9zZXMgdGhlIGRyb3Bkb3duIGFuZCBkb2VzIHRoZSBuZWNlc3NhcnkgY2xlYW51cC4gKi9cbiAgICBwcml2YXRlIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmIHx8ICF0aGlzLm9wZW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJvcGRvd24gPSB0aGlzLmRyb3Bkb3duO1xuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuXG4gICAgICAgIGlmIChkcm9wZG93biBpbnN0YW5jZW9mIE1jRHJvcGRvd24pIHtcbiAgICAgICAgICAgIGRyb3Bkb3duLnJlc2V0QW5pbWF0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIHRoZSBleGl0IGFuaW1hdGlvbiB0byBmaW5pc2ggYmVmb3JlIGRldGFjaGluZyB0aGUgY29udGVudC5cbiAgICAgICAgICAgICAgICBkcm9wZG93bi5hbmltYXRpb25Eb25lXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQudG9TdGF0ZSA9PT0gJ3ZvaWQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnRlcnJ1cHQgaWYgdGhlIGNvbnRlbnQgZ290IHJlLWF0dGFjaGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZVVudGlsKGRyb3Bkb3duLmxhenlDb250ZW50LmF0dGFjaGVkKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoe25leHQ6ICgpID0+IGRyb3Bkb3duLmxhenlDb250ZW50LmRldGFjaCgpLCBlcnJvcjogdW5kZWZpbmVkLCBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gbWF0dGVyIHdoZXRoZXIgdGhlIGNvbnRlbnQgZ290IHJlLWF0dGFjaGVkLCByZXNldCB0aGUgZHJvcGRvd24uXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgICAgICBpZiAoZHJvcGRvd24ubGF6eUNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5sYXp5Q29udGVudC5kZXRhY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHNldHMgdGhlIGRyb3Bkb3duIHN0YXRlIHRvIG9wZW4gYW5kIGZvY3VzZXMgdGhlIGZpcnN0IGl0ZW0gaWZcbiAgICAgKiB0aGUgZHJvcGRvd24gd2FzIG9wZW5lZCB2aWEgdGhlIGtleWJvYXJkLlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5wYXJlbnQgPSB0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSA/IHRoaXMuX3BhcmVudCA6IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5kaXJlY3Rpb24gPSB0aGlzLmRpcjtcbiAgICAgICAgdGhpcy5zZXRJc09wZW5lZCh0cnVlKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5mb2N1c0ZpcnN0SXRlbSh0aGlzLm9wZW5lZEJ5IHx8ICdwcm9ncmFtJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgcmVzZXRzIHRoZSBkcm9wZG93biB3aGVuIGl0J3MgY2xvc2VkLCBtb3N0IGltcG9ydGFudGx5IHJlc3RvcmluZ1xuICAgICAqIGZvY3VzIHRvIHRoZSBkcm9wZG93biB0cmlnZ2VyIGlmIHRoZSBkcm9wZG93biB3YXMgb3BlbmVkIHZpYSB0aGUga2V5Ym9hcmQuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRJc09wZW5lZChmYWxzZSk7XG5cbiAgICAgICAgLy8gV2Ugc2hvdWxkIHJlc2V0IGZvY3VzIGlmIHRoZSB1c2VyIGlzIG5hdmlnYXRpbmcgdXNpbmcgYSBrZXlib2FyZCBvclxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgdG9wLWxldmVsIHRyaWdnZXIgd2hpY2ggbWlnaHQgY2F1c2UgZm9jdXMgdG8gYmUgbG9zdFxuICAgICAgICAvLyB3aGVuIGNsaWNraW5nIG9uIHRoZSBiYWNrZHJvcC5cbiAgICAgICAgaWYgKCF0aGlzLm9wZW5lZEJ5KSB7XG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgdGhlIGZvY3VzIHN0eWxlIHdpbGwgc2hvdyB1cCBib3RoIGZvciBgcHJvZ3JhbWAgYW5kXG4gICAgICAgICAgICAvLyBga2V5Ym9hcmRgIHNvIHdlIGRvbid0IGhhdmUgdG8gc3BlY2lmeSB3aGljaCBvbmUgaXQgaXMuXG4gICAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKHRoaXMub3BlbmVkQnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuZWRCeSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2V0IHN0YXRlIHJhdGhlciB0aGFuIHRvZ2dsZSB0byBzdXBwb3J0IHRyaWdnZXJzIHNoYXJpbmcgYSBkcm9wZG93blxuICAgIHByaXZhdGUgc2V0SXNPcGVuZWQoaXNPcGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29wZW5lZCA9IGlzT3BlbjtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZvaWQtZXhwcmVzc2lvblxuICAgICAgICB0aGlzLl9vcGVuZWQgPyB0aGlzLmRyb3Bkb3duT3BlbmVkLmVtaXQoKSA6IHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgdGhpcy5fZHJvcGRvd25JdGVtSW5zdGFuY2UuaGlnaGxpZ2h0ZWQgPSBpc09wZW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBjaGVja3MgdGhhdCBhIHZhbGlkIGluc3RhbmNlIG9mIE1jRHJvcGRvd24gaGFzIGJlZW4gcGFzc2VkIGludG9cbiAgICAgKiBtY0Ryb3Bkb3duVHJpZ2dlckZvci4gSWYgbm90LCBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5kcm9wZG93bikge1xuICAgICAgICAgICAgdGhyb3dNY0Ryb3Bkb3duTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIHRoZSBvdmVybGF5IGZyb20gdGhlIHByb3ZpZGVkIGRyb3Bkb3duJ3MgdGVtcGxhdGUgYW5kIHNhdmVzIGl0c1xuICAgICAqIE92ZXJsYXlSZWYgc28gdGhhdCBpdCBjYW4gYmUgYXR0YWNoZWQgdG8gdGhlIERPTSB3aGVuIG9wZW4gaXMgY2FsbGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlT3ZlcmxheSgpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0T3ZlcmxheUNvbmZpZygpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1Bvc2l0aW9ucyhjb25maWcucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoY29uZmlnKTtcblxuICAgICAgICAgICAgLy8gQ29uc3VtZSB0aGUgYGtleWRvd25FdmVudHNgIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlbSBmcm9tIGdvaW5nIHRvIGFub3RoZXIgb3ZlcmxheS5cbiAgICAgICAgICAgIC8vIElkZWFsbHkgd2UnZCBhbHNvIGhhdmUgb3VyIGtleWJvYXJkIGV2ZW50IGxvZ2ljIGluIGhlcmUsIGhvd2V2ZXIgZG9pbmcgc28gd2lsbFxuICAgICAgICAgICAgLy8gYnJlYWsgYW55Ym9keSB0aGF0IG1heSBoYXZlIGltcGxlbWVudGVkIHRoZSBgTWNEcm9wZG93blBhbmVsYCB0aGVtc2VsdmVzLlxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgYnVpbGRzIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBuZWVkZWQgdG8gY3JlYXRlIHRoZSBvdmVybGF5LCB0aGUgT3ZlcmxheVN0YXRlLlxuICAgICAqIEByZXR1cm5zIE92ZXJsYXlDb25maWdcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgICAgIHJldHVybiBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50KVxuICAgICAgICAgICAgICAgIC53aXRoTG9ja2VkUG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5tYy1kcm9wZG93bl9fcGFuZWwnKSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuZHJvcGRvd24uYmFja2Ryb3BDbGFzcyB8fCAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX3Njcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuX2RpclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW5zIHRvIGNoYW5nZXMgaW4gdGhlIHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5IGFuZCBzZXRzIHRoZSBjb3JyZWN0IGNsYXNzZXNcbiAgICAgKiBvbiB0aGUgZHJvcGRvd24gYmFzZWQgb24gdGhlIG5ldyBwb3NpdGlvbi4gVGhpcyBlbnN1cmVzIHRoZSBhbmltYXRpb24gb3JpZ2luIGlzIGFsd2F5c1xuICAgICAqIGNvcnJlY3QsIGV2ZW4gaWYgYSBmYWxsYmFjayBwb3NpdGlvbiBpcyB1c2VkIGZvciB0aGUgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvUG9zaXRpb25zKHBvc2l0aW9uOiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24uc2V0UG9zaXRpb25DbGFzc2VzKSB7XG4gICAgICAgICAgICBwb3NpdGlvbi5wb3NpdGlvbkNoYW5nZXMuc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NYOiBEcm9wZG93blBvc2l0aW9uWCA9IGNoYW5nZS5jb25uZWN0aW9uUGFpci5vdmVybGF5WCA9PT0gJ3N0YXJ0JyA/ICdhZnRlcicgOiAnYmVmb3JlJztcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NZOiBEcm9wZG93blBvc2l0aW9uWSA9IGNoYW5nZS5jb25uZWN0aW9uUGFpci5vdmVybGF5WSA9PT0gJ3RvcCcgPyAnYmVsb3cnIDogJ2Fib3ZlJztcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uc2V0UG9zaXRpb25DbGFzc2VzIShwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYXBwcm9wcmlhdGUgcG9zaXRpb25zIG9uIGEgcG9zaXRpb24gc3RyYXRlZ3lcbiAgICAgKiBzbyB0aGUgb3ZlcmxheSBjb25uZWN0cyB3aXRoIHRoZSB0cmlnZ2VyIGNvcnJlY3RseS5cbiAgICAgKiBAcGFyYW0gcG9zaXRpb25TdHJhdGVneSBTdHJhdGVneSB3aG9zZSBwb3NpdGlvbiB0byB1cGRhdGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRQb3NpdGlvbihwb3NpdGlvblN0cmF0ZWd5OiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpIHtcbiAgICAgICAgbGV0IFtvcmlnaW5YLCBvcmlnaW5GYWxsYmFja1gsIG92ZXJsYXlYLCBvdmVybGF5RmFsbGJhY2tYXTogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3NbXSA9XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnhQb3NpdGlvbiA9PT0gJ2JlZm9yZScgP1xuICAgICAgICAgICAgICAgIFsnZW5kJywgJ3N0YXJ0JywgJ2VuZCcsICdzdGFydCddIDpcbiAgICAgICAgICAgICAgICBbJ3N0YXJ0JywgJ2VuZCcsICdzdGFydCcsICdlbmQnXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgICAgIGxldCBbb3ZlcmxheVksIG92ZXJsYXlGYWxsYmFja1ksIG9yaWdpblksIG9yaWdpbkZhbGxiYWNrWV06IFZlcnRpY2FsQ29ubmVjdGlvblBvc1tdID1cbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ueVBvc2l0aW9uID09PSAnYWJvdmUnID9cbiAgICAgICAgICAgICAgICBbJ2JvdHRvbScsICd0b3AnLCAnYm90dG9tJywgJ3RvcCddIDpcbiAgICAgICAgICAgICAgICBbJ3RvcCcsICdib3R0b20nLCAndG9wJywgJ2JvdHRvbSddO1xuXG4gICAgICAgIGxldCBvZmZzZXRZID0gMDtcblxuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gdGhlIGRyb3Bkb3duIGlzIG5lc3RlZCwgaXQgc2hvdWxkIGFsd2F5cyBhbGlnbiBpdHNlbGZcbiAgICAgICAgICAgIC8vIHRvIHRoZSBlZGdlcyBvZiB0aGUgdHJpZ2dlciwgaW5zdGVhZCBvZiBvdmVybGFwcGluZyBpdC5cbiAgICAgICAgICAgIG92ZXJsYXlGYWxsYmFja1ggPSBvcmlnaW5YID0gdGhpcy5kcm9wZG93bi54UG9zaXRpb24gPT09ICdiZWZvcmUnID8gJ3N0YXJ0JyA6ICdlbmQnO1xuICAgICAgICAgICAgb3JpZ2luRmFsbGJhY2tYID0gb3ZlcmxheVggPSBvcmlnaW5YID09PSAnZW5kJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgIG9mZnNldFkgPSBvdmVybGF5WSA9PT0gJ2JvdHRvbScgPyBORVNURURfUEFORUxfVE9QX1BBRERJTkcgOiAtTkVTVEVEX1BBTkVMX1RPUF9QQURESU5HO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duLm92ZXJsYXBUcmlnZ2VyWSkge1xuICAgICAgICAgICAgICAgIG9yaWdpblkgPSBvdmVybGF5WSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICAgICAgICAgICAgICAgIG9yaWdpbkZhbGxiYWNrWSA9IG92ZXJsYXlGYWxsYmFja1kgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duLm92ZXJsYXBUcmlnZ2VyWCkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlGYWxsYmFja1ggPSBvcmlnaW5YID0gdGhpcy5kcm9wZG93bi54UG9zaXRpb24gPT09ICdiZWZvcmUnID8gJ3N0YXJ0JyA6ICdlbmQnO1xuICAgICAgICAgICAgICAgIG9yaWdpbkZhbGxiYWNrWCA9IG92ZXJsYXlYID0gb3JpZ2luWCA9PT0gJ2VuZCcgPyAnc3RhcnQnIDogJ2VuZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwb3NpdGlvblN0cmF0ZWd5LndpdGhQb3NpdGlvbnMoW1xuICAgICAgICAgICAgeyBvcmlnaW5YLCBvcmlnaW5ZLCBvdmVybGF5WCwgb3ZlcmxheVksIG9mZnNldFkgfSxcbiAgICAgICAgICAgIHsgb3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLCBvcmlnaW5ZLCBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCwgb3ZlcmxheVksIG9mZnNldFkgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6IG9yaWdpbkZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvdmVybGF5WCxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiAtb2Zmc2V0WVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YOiBvcmlnaW5GYWxsYmFja1gsXG4gICAgICAgICAgICAgICAgb3JpZ2luWTogb3JpZ2luRmFsbGJhY2tZLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiBvdmVybGF5RmFsbGJhY2tYLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiBvdmVybGF5RmFsbGJhY2tZLFxuICAgICAgICAgICAgICAgIG9mZnNldFk6IC1vZmZzZXRZXG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKiBDbGVhbnMgdXAgdGhlIGFjdGl2ZSBzdWJzY3JpcHRpb25zLiAqL1xuICAgIHByaXZhdGUgY2xlYW5VcFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5ob3ZlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm91dHNpZGVQb2ludGVyRXZlbnRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciBhbiBhY3Rpb24gdGhhdCBzaG91bGQgY2xvc2UgdGhlIGRyb3Bkb3duIG9jY3Vycy4gKi9cbiAgICBwcml2YXRlIGNsb3NpbmdBY3Rpb25zKCkge1xuICAgICAgICBjb25zdCBiYWNrZHJvcCA9IHRoaXMub3ZlcmxheVJlZiEuYmFja2Ryb3BDbGljaygpO1xuICAgICAgICBjb25zdCBkZXRhY2htZW50cyA9IHRoaXMub3ZlcmxheVJlZiEuZGV0YWNobWVudHMoKTtcbiAgICAgICAgY29uc3QgcGFyZW50Q2xvc2UgPSB0aGlzLl9wYXJlbnQgPyB0aGlzLl9wYXJlbnQuY2xvc2VkIDogb2JzZXJ2YWJsZU9mKCk7XG4gICAgICAgIGNvbnN0IGhvdmVyID0gdGhpcy5fcGFyZW50ID8gdGhpcy5fcGFyZW50LmhvdmVyZWQoKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKChhY3RpdmUpID0+IGFjdGl2ZSAhPT0gdGhpcy5fZHJvcGRvd25JdGVtSW5zdGFuY2UpLFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuX29wZW5lZClcbiAgICAgICAgKSA6IG9ic2VydmFibGVPZigpO1xuXG4gICAgICAgIHJldHVybiBtZXJnZShiYWNrZHJvcCwgcGFyZW50Q2xvc2UsIGhvdmVyLCBkZXRhY2htZW50cyk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgdGhlIGNhc2VzIHdoZXJlIHRoZSB1c2VyIGhvdmVycyBvdmVyIHRoZSB0cmlnZ2VyLiAqL1xuICAgIHByaXZhdGUgaGFuZGxlSG92ZXIoKSB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBob3ZlcmVkIGl0ZW0gaW4gb3JkZXIgdG8gdG9nZ2xlIHRoZSBwYW5lbC5cbiAgICAgICAgaWYgKCF0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ob3ZlclN1YnNjcmlwdGlvbiA9IHRoaXMuX3BhcmVudC5ob3ZlcmVkKClcbiAgICAgICAgLy8gU2luY2Ugd2UgbWlnaHQgaGF2ZSBtdWx0aXBsZSBjb21wZXRpbmcgdHJpZ2dlcnMgZm9yIHRoZSBzYW1lIGRyb3Bkb3duIChlLmcuIGEgbmVzdGVkIGRyb3Bkb3duXG4gICAgICAgIC8vIHdpdGggZGlmZmVyZW50IGRhdGEgYW5kIHRyaWdnZXJzKSwgd2UgaGF2ZSB0byBkZWxheSBpdCBieSBhIHRpY2sgdG8gZW5zdXJlIHRoYXRcbiAgICAgICAgLy8gaXQgd29uJ3QgYmUgY2xvc2VkIGltbWVkaWF0ZWx5IGFmdGVyIGl0IGlzIG9wZW5lZC5cbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigoYWN0aXZlKSA9PiBhY3RpdmUgPT09IHRoaXMuX2Ryb3Bkb3duSXRlbUluc3RhbmNlICYmICFhY3RpdmUuZGlzYWJsZWQpLFxuICAgICAgICAgICAgICAgIGRlbGF5KDAsIGFzYXBTY2hlZHVsZXIpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZEJ5ID0gJ21vdXNlJztcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzYW1lIGRyb3Bkb3duIGlzIHVzZWQgYmV0d2VlbiBtdWx0aXBsZSB0cmlnZ2VycywgaXQgbWlnaHQgc3RpbGwgYmUgYW5pbWF0aW5nXG4gICAgICAgICAgICAgICAgLy8gd2hpbGUgdGhlIG5ldyB0cmlnZ2VyIHRyaWVzIHRvIHJlLW9wZW4gaXQuIFdhaXQgZm9yIHRoZSBhbmltYXRpb24gdG8gZmluaXNoXG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlIGRvaW5nIHNvLiBBbHNvIGludGVycnVwdCBpZiB0aGUgdXNlciBtb3ZlcyB0byBhbm90aGVyIGl0ZW0uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24gaW5zdGFuY2VvZiBNY0Ryb3Bkb3duICYmIHRoaXMuZHJvcGRvd24uaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgbmVlZCB0aGUgYGRlbGF5KDApYCBoZXJlIGluIG9yZGVyIHRvIGF2b2lkXG4gICAgICAgICAgICAgICAgICAgIC8vICdjaGFuZ2VkIGFmdGVyIGNoZWNrZWQnIGVycm9ycyBpbiBzb21lIGNhc2VzLiBTZWUgIzEyMTk0LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmFuaW1hdGlvbkRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSksIGRlbGF5KDAsIGFzYXBTY2hlZHVsZXIpLCB0YWtlVW50aWwodGhpcy5fcGFyZW50LmhvdmVyZWQoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMub3BlbigpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogR2V0cyB0aGUgcG9ydGFsIHRoYXQgc2hvdWxkIGJlIGF0dGFjaGVkIHRvIHRoZSBvdmVybGF5LiAqL1xuICAgIHByaXZhdGUgZ2V0UG9ydGFsKCk6IFRlbXBsYXRlUG9ydGFsIHtcbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGNhbiBhdm9pZCB0aGlzIGNoZWNrIGJ5IGtlZXBpbmcgdGhlIHBvcnRhbCBvbiB0aGUgZHJvcGRvd24gcGFuZWwuXG4gICAgICAgIC8vIFdoaWxlIGl0IHdvdWxkIGJlIGNsZWFuZXIsIHdlJ2QgaGF2ZSB0byBpbnRyb2R1Y2UgYW5vdGhlciByZXF1aXJlZCBtZXRob2Qgb25cbiAgICAgICAgLy8gYE1jRHJvcGRvd25QYW5lbGAsIG1ha2luZyBpdCBoYXJkZXIgdG8gY29uc3VtZS5cbiAgICAgICAgaWYgKCF0aGlzLnBvcnRhbCB8fCB0aGlzLnBvcnRhbC50ZW1wbGF0ZVJlZiAhPT0gdGhpcy5kcm9wZG93bi50ZW1wbGF0ZVJlZikge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5kcm9wZG93bi50ZW1wbGF0ZVJlZiwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWw7XG4gICAgfVxuXG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-trigger.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLXRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFhLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFHSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixJQUFJLEVBQ0osZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRixPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFJbEQsTUFBTSxPQUFPLDJCQUEyQixH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Qjs7Ozs7SUFFL0IsdUNBQTZDOzs7OztJQUU3Qyw4Q0FBK0M7Ozs7O0lBRS9DLDhDQUErQzs7Ozs7OztJQXlJL0MsNkNBQXlEOzs7OztJQXRJckQscUNBQXlCOzs7OztJQUN6QixxQ0FBeUM7Ozs7O0lBQ3pDLDhDQUEyQzs7Ozs7SUFDM0MsNENBQWlFOzs7OztJQUNqRSxvQ0FBdUM7Ozs7O0lBQ3ZDLGtEQUFpRTs7Ozs7SUFDakUsaUNBQXdDOzs7OztJQUN4QywwQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheUNvbmZpZyxcbiAgICBPdmVybGF5UmVmLFxuICAgIFZlcnRpY2FsQ29ubmVjdGlvblBvcyxcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNlbGYsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBTUEFDRSwgRU5URVIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgYXNhcFNjaGVkdWxlciwgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgZmlsdGVyLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IHRocm93TWNEcm9wZG93bk1pc3NpbmdFcnJvciB9IGZyb20gJy4vZHJvcGRvd24tZXJyb3JzJztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtJztcbmltcG9ydCB7IE1jRHJvcGRvd25QYW5lbCB9IGZyb20gJy4vZHJvcGRvd24tcGFuZWwnO1xuaW1wb3J0IHsgRHJvcGRvd25Qb3NpdGlvblgsIERyb3Bkb3duUG9zaXRpb25ZIH0gZnJvbSAnLi9kcm9wZG93bi1wb3NpdGlvbnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93biB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcblxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkcm9wZG93biBpcyBvcGVuLiAqL1xuZXhwb3J0IGNvbnN0IE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtZHJvcGRvd24tc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllcbn07XG5cbi8qKiBEZWZhdWx0IHRvcCBwYWRkaW5nIG9mIHRoZSBuZXN0ZWQgZHJvcGRvd24gcGFuZWwuICovXG5leHBvcnQgY29uc3QgTkVTVEVEX1BBTkVMX1RPUF9QQURESU5HID0gMjtcblxuLyoqIE9wdGlvbnMgZm9yIGJpbmRpbmcgYSBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyLiAqL1xuY29uc3QgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBhbiBtYy1kcm9wZG93biB0YWcuICBJdCBpc1xuICogcmVzcG9uc2libGUgZm9yIHRvZ2dsaW5nIHRoZSBkaXNwbGF5IG9mIHRoZSBwcm92aWRlZCBkcm9wZG93biBpbnN0YW5jZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBbbWNEcm9wZG93blRyaWdnZXJGb3JdYCxcbiAgICBob3N0OiB7XG4gICAgICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLFxuICAgICAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnb3BlbmVkIHx8IG51bGwnLFxuICAgICAgICAnKG1vdXNlZG93biknOiAnaGFuZGxlTW91c2Vkb3duKCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknXG4gICAgfSxcbiAgICBleHBvcnRBczogJ21jRHJvcGRvd25UcmlnZ2VyJ1xufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duVHJpZ2dlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogVGhlIHRleHQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgICBnZXQgZGlyKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA/ICdydGwnIDogJ2x0cic7XG4gICAgfVxuXG5cbiAgICAvKiogUmVmZXJlbmNlcyB0aGUgZHJvcGRvd24gaW5zdGFuY2UgdGhhdCB0aGUgdHJpZ2dlciBpcyBhc3NvY2lhdGVkIHdpdGguICovXG4gICAgQElucHV0KCdtY0Ryb3Bkb3duVHJpZ2dlckZvcicpXG4gICAgZ2V0IGRyb3Bkb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHJvcGRvd247XG4gICAgfVxuXG4gICAgc2V0IGRyb3Bkb3duKGRyb3Bkb3duOiBNY0Ryb3Bkb3duUGFuZWwpIHtcbiAgICAgICAgaWYgKGRyb3Bkb3duID09PSB0aGlzLl9kcm9wZG93bikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9kcm9wZG93biA9IGRyb3Bkb3duO1xuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgaWYgKGRyb3Bkb3duKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uID0gZHJvcGRvd24uY2xvc2VkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiBhIGNsaWNrIGNsb3NlZCB0aGUgZHJvcGRvd24sIHdlIHNob3VsZCBjbG9zZSB0aGUgZW50aXJlIGNoYWluIG9mIG5lc3RlZCBkcm9wZG93bnMuXG4gICAgICAgICAgICAgICAgaWYgKChyZWFzb24gPT09ICdjbGljaycgfHwgcmVhc29uID09PSAndGFiJykgJiYgdGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jbG9zZWQuZW1pdChyZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJhY2tpbmcgaW5wdXQgdHlwZSBpcyBuZWNlc3Nhcnkgc28gaXQncyBwb3NzaWJsZSB0byBvbmx5IGF1dG8tZm9jdXNcbiAgICAvLyB0aGUgZmlyc3QgaXRlbSBvZiB0aGUgbGlzdCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQgdmlhIHRoZSBrZXlib2FyZFxuICAgIG9wZW5lZEJ5OiAnbW91c2UnIHwgJ3RvdWNoJyB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIERhdGEgdG8gYmUgcGFzc2VkIGFsb25nIHRvIGFueSBsYXppbHktcmVuZGVyZWQgY29udGVudC4gKi9cbiAgICBASW5wdXQoJ21jRHJvcGRvd25UcmlnZ2VyRGF0YScpIGRhdGE6IGFueTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFzc29jaWF0ZWQgZHJvcGRvd24gaXMgb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkcm9wZG93bk9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYXNzb2NpYXRlZCBkcm9wZG93biBpcyBjbG9zZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRyb3Bkb3duQ2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIF9kcm9wZG93bjogTWNEcm9wZG93blBhbmVsO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIG9wZW4uICovXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjbG9zZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgaG92ZXJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIF9zY3JvbGxTdHJhdGVneTogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9wYXJlbnQ6IE1jRHJvcGRvd24sXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHJpdmF0ZSBfZHJvcGRvd25JdGVtSW5zdGFuY2U6IE1jRHJvcGRvd25JdGVtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I/OiBGb2N1c01vbml0b3JcbiAgICApIHtcbiAgICAgICAgX2VsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuICAgICAgICAgICAgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcblxuICAgICAgICBpZiAoX2Ryb3Bkb3duSXRlbUluc3RhbmNlKSB7XG4gICAgICAgICAgICBfZHJvcGRvd25JdGVtSW5zdGFuY2UudHJpZ2dlcnNOZXN0ZWREcm9wZG93biA9IHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmNoZWNrKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlSG92ZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcbiAgICAgICAgICAgIHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5jbGVhblVwU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHRyaWdnZXJzIGEgbmVzdGVkIGRyb3Bkb3duIG9yIGEgdG9wLWxldmVsIG9uZS4gKi9cbiAgICB0cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISEodGhpcy5fZHJvcGRvd25JdGVtSW5zdGFuY2UgJiYgdGhpcy5fcGFyZW50KTtcbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlcyB0aGUgZHJvcGRvd24gYmV0d2VlbiB0aGUgb3BlbiBhbmQgY2xvc2VkIHN0YXRlcy4gKi9cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12b2lkLWV4cHJlc3Npb25cbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZCA/IHRoaXMuY2xvc2UoKSA6IHRoaXMub3BlbigpO1xuICAgIH1cblxuICAgIC8qKiBPcGVucyB0aGUgZHJvcGRvd24uICovXG4gICAgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wZW5lZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmNoZWNrKCk7XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gb3ZlcmxheVJlZi5nZXRDb25maWcoKTtcblxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKG92ZXJsYXlDb25maWcucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpO1xuICAgICAgICBvdmVybGF5Q29uZmlnLmhhc0JhY2tkcm9wID0gdGhpcy5kcm9wZG93bi5oYXNCYWNrZHJvcCA9PSBudWxsID8gIXRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpIDpcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uaGFzQmFja2Ryb3A7XG4gICAgICAgIG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMuZ2V0UG9ydGFsKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duLmxhenlDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLmxhenlDb250ZW50LmF0dGFjaCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbiA9IHRoaXMuY2xvc2luZ0FjdGlvbnMoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd24gaW5zdGFuY2VvZiBNY0Ryb3Bkb3duKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnN0YXJ0QW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ2xvc2VzIHRoZSBkcm9wZG93bi4gKi9cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZWQuZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvY3VzZXMgdGhlIGRyb3Bkb3duIHRyaWdnZXIuXG4gICAgICogQHBhcmFtIG9yaWdpbiBTb3VyY2Ugb2YgdGhlIGRyb3Bkb3duIHRyaWdnZXIncyBmb2N1cy5cbiAgICAgKi9cbiAgICBmb2N1cyhvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb2N1c01vbml0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIG9yaWdpbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIG1vdXNlIHByZXNzZXMgb24gdGhlIHRyaWdnZXIuICovXG4gICAgaGFuZGxlTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIFNpbmNlIHJpZ2h0IG9yIG1pZGRsZSBidXR0b24gY2xpY2tzIHdvbid0IHRyaWdnZXIgdGhlIGBjbGlja2AgZXZlbnQsXG4gICAgICAgIC8vIHdlIHNob3VsZG4ndCBjb25zaWRlciB0aGUgZHJvcGRvd24gYXMgb3BlbmVkIGJ5IG1vdXNlIGluIHRob3NlIGNhc2VzLlxuICAgICAgICB0aGlzLm9wZW5lZEJ5ID0gZXZlbnQuYnV0dG9uID09PSAwID8gJ21vdXNlJyA6IG51bGw7XG5cbiAgICAgICAgLy8gU2luY2UgY2xpY2tpbmcgb24gdGhlIHRyaWdnZXIgd29uJ3QgY2xvc2UgdGhlIGRyb3Bkb3duIGlmIGl0IG9wZW5zIGEgbmVzdGVkIGRyb3Bkb3duLFxuICAgICAgICAvLyB3ZSBzaG91bGQgcHJldmVudCBmb2N1cyBmcm9tIG1vdmluZyBvbnRvIGl0IHZpYSBjbGljayB0byBhdm9pZCB0aGVcbiAgICAgICAgLy8gaGlnaGxpZ2h0IGZyb20gbGluZ2VyaW5nIG9uIHRoZSBkcm9wZG93biBpdGVtLlxuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBrZXkgcHJlc3NlcyBvbiB0aGUgdHJpZ2dlci4gKi9cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5IHx8IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IFNQQUNFIHx8IGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSAmJiAoXG4gICAgICAgICAgICAoa2V5Q29kZSA9PT0gUklHSFRfQVJST1cgJiYgdGhpcy5kaXIgPT09ICdsdHInKSB8fFxuICAgICAgICAgICAgKGtleUNvZGUgPT09IExFRlRfQVJST1cgJiYgdGhpcy5kaXIgPT09ICdydGwnKSkpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgY2xpY2sgZXZlbnRzIG9uIHRoZSB0cmlnZ2VyLiAqL1xuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgLy8gU3RvcCBldmVudCBwcm9wYWdhdGlvbiB0byBhdm9pZCBjbG9zaW5nIHRoZSBwYXJlbnQgZHJvcGRvd24uXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdG91Y2ggc3RhcnQgZXZlbnRzIG9uIHRoZSB0cmlnZ2VyLlxuICAgICAqIE5lZWRzIHRvIGJlIGFuIGFycm93IGZ1bmN0aW9uIHNvIHdlIGNhbiBlYXNpbHkgdXNlIGFkZEV2ZW50TGlzdGVuZXIgYW5kIHJlbW92ZUV2ZW50TGlzdGVuZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVUb3VjaFN0YXJ0ID0gKCkgPT4gdGhpcy5vcGVuZWRCeSA9ICd0b3VjaCc7XG5cbiAgICAvKiogQ2xvc2VzIHRoZSBkcm9wZG93biBhbmQgZG9lcyB0aGUgbmVjZXNzYXJ5IGNsZWFudXAuICovXG4gICAgcHJpdmF0ZSBkZXN0cm95KCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZiB8fCAhdGhpcy5vcGVuZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gdGhpcy5kcm9wZG93bjtcblxuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcblxuICAgICAgICBpZiAoZHJvcGRvd24gaW5zdGFuY2VvZiBNY0Ryb3Bkb3duKSB7XG4gICAgICAgICAgICBkcm9wZG93bi5yZXNldEFuaW1hdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoZHJvcGRvd24ubGF6eUNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBXYWl0IGZvciB0aGUgZXhpdCBhbmltYXRpb24gdG8gZmluaXNoIGJlZm9yZSBkZXRhY2hpbmcgdGhlIGNvbnRlbnQuXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uYW5pbWF0aW9uRG9uZVxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LnRvU3RhdGUgPT09ICd2b2lkJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW50ZXJydXB0IGlmIHRoZSBjb250ZW50IGdvdCByZS1hdHRhY2hlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2VVbnRpbChkcm9wZG93bi5sYXp5Q29udGVudC5hdHRhY2hlZClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHtuZXh0OiAoKSA9PiBkcm9wZG93bi5sYXp5Q29udGVudC5kZXRhY2goKSwgZXJyb3I6IHVuZGVmaW5lZCwgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIG1hdHRlciB3aGV0aGVyIHRoZSBjb250ZW50IGdvdCByZS1hdHRhY2hlZCwgcmVzZXQgdGhlIGRyb3Bkb3duLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB9fSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICAgICAgaWYgKGRyb3Bkb3duLmxhenlDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgZHJvcGRvd24ubGF6eUNvbnRlbnQuZGV0YWNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBzZXRzIHRoZSBkcm9wZG93biBzdGF0ZSB0byBvcGVuIGFuZCBmb2N1c2VzIHRoZSBmaXJzdCBpdGVtIGlmXG4gICAgICogdGhlIGRyb3Bkb3duIHdhcyBvcGVuZWQgdmlhIHRoZSBrZXlib2FyZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24ucGFyZW50ID0gdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkgPyB0aGlzLl9wYXJlbnQgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uZGlyZWN0aW9uID0gdGhpcy5kaXI7XG4gICAgICAgIHRoaXMuc2V0SXNPcGVuZWQodHJ1ZSk7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uZm9jdXNGaXJzdEl0ZW0odGhpcy5vcGVuZWRCeSB8fCAncHJvZ3JhbScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJlc2V0cyB0aGUgZHJvcGRvd24gd2hlbiBpdCdzIGNsb3NlZCwgbW9zdCBpbXBvcnRhbnRseSByZXN0b3JpbmdcbiAgICAgKiBmb2N1cyB0byB0aGUgZHJvcGRvd24gdHJpZ2dlciBpZiB0aGUgZHJvcGRvd24gd2FzIG9wZW5lZCB2aWEgdGhlIGtleWJvYXJkLlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXNPcGVuZWQoZmFsc2UpO1xuXG4gICAgICAgIC8vIFdlIHNob3VsZCByZXNldCBmb2N1cyBpZiB0aGUgdXNlciBpcyBuYXZpZ2F0aW5nIHVzaW5nIGEga2V5Ym9hcmQgb3JcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIHRvcC1sZXZlbCB0cmlnZ2VyIHdoaWNoIG1pZ2h0IGNhdXNlIGZvY3VzIHRvIGJlIGxvc3RcbiAgICAgICAgLy8gd2hlbiBjbGlja2luZyBvbiB0aGUgYmFja2Ryb3AuXG4gICAgICAgIGlmICghdGhpcy5vcGVuZWRCeSkge1xuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IHRoZSBmb2N1cyBzdHlsZSB3aWxsIHNob3cgdXAgYm90aCBmb3IgYHByb2dyYW1gIGFuZFxuICAgICAgICAgICAgLy8gYGtleWJvYXJkYCBzbyB3ZSBkb24ndCBoYXZlIHRvIHNwZWNpZnkgd2hpY2ggb25lIGl0IGlzLlxuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1cyh0aGlzLm9wZW5lZEJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3BlbmVkQnkgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIHNldCBzdGF0ZSByYXRoZXIgdGhhbiB0b2dnbGUgdG8gc3VwcG9ydCB0cmlnZ2VycyBzaGFyaW5nIGEgZHJvcGRvd25cbiAgICBwcml2YXRlIHNldElzT3BlbmVkKGlzT3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9vcGVuZWQgPSBpc09wZW47XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12b2lkLWV4cHJlc3Npb25cbiAgICAgICAgdGhpcy5fb3BlbmVkID8gdGhpcy5kcm9wZG93bk9wZW5lZC5lbWl0KCkgOiB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcblxuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2Ryb3Bkb3duSXRlbUluc3RhbmNlLmhpZ2hsaWdodGVkID0gaXNPcGVuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgY2hlY2tzIHRoYXQgYSB2YWxpZCBpbnN0YW5jZSBvZiBNY0Ryb3Bkb3duIGhhcyBiZWVuIHBhc3NlZCBpbnRvXG4gICAgICogbWNEcm9wZG93blRyaWdnZXJGb3IuIElmIG5vdCwgYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRocm93TWNEcm9wZG93bk1pc3NpbmdFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgY3JlYXRlcyB0aGUgb3ZlcmxheSBmcm9tIHRoZSBwcm92aWRlZCBkcm9wZG93bidzIHRlbXBsYXRlIGFuZCBzYXZlcyBpdHNcbiAgICAgKiBPdmVybGF5UmVmIHNvIHRoYXQgaXQgY2FuIGJlIGF0dGFjaGVkIHRvIHRoZSBET00gd2hlbiBvcGVuIGlzIGNhbGxlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldE92ZXJsYXlDb25maWcoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9Qb3NpdGlvbnMoY29uZmlnLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG5cbiAgICAgICAgICAgIC8vIENvbnN1bWUgdGhlIGBrZXlkb3duRXZlbnRzYCBpbiBvcmRlciB0byBwcmV2ZW50IHRoZW0gZnJvbSBnb2luZyB0byBhbm90aGVyIG92ZXJsYXkuXG4gICAgICAgICAgICAvLyBJZGVhbGx5IHdlJ2QgYWxzbyBoYXZlIG91ciBrZXlib2FyZCBldmVudCBsb2dpYyBpbiBoZXJlLCBob3dldmVyIGRvaW5nIHNvIHdpbGxcbiAgICAgICAgICAgIC8vIGJyZWFrIGFueWJvZHkgdGhhdCBtYXkgaGF2ZSBpbXBsZW1lbnRlZCB0aGUgYE1jRHJvcGRvd25QYW5lbGAgdGhlbXNlbHZlcy5cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGJ1aWxkcyB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgb3ZlcmxheSwgdGhlIE92ZXJsYXlTdGF0ZS5cbiAgICAgKiBAcmV0dXJucyBPdmVybGF5Q29uZmlnXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xuICAgICAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZWxlbWVudClcbiAgICAgICAgICAgICAgICAud2l0aExvY2tlZFBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcubWMtZHJvcGRvd25fX3BhbmVsJyksXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmRyb3Bkb3duLmJhY2tkcm9wQ2xhc3MgfHwgJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVucyB0byBjaGFuZ2VzIGluIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBhbmQgc2V0cyB0aGUgY29ycmVjdCBjbGFzc2VzXG4gICAgICogb24gdGhlIGRyb3Bkb3duIGJhc2VkIG9uIHRoZSBuZXcgcG9zaXRpb24uIFRoaXMgZW5zdXJlcyB0aGUgYW5pbWF0aW9uIG9yaWdpbiBpcyBhbHdheXNcbiAgICAgKiBjb3JyZWN0LCBldmVuIGlmIGEgZmFsbGJhY2sgcG9zaXRpb24gaXMgdXNlZCBmb3IgdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Bvc2l0aW9ucyhwb3NpdGlvbjogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duLnNldFBvc2l0aW9uQ2xhc3Nlcykge1xuICAgICAgICAgICAgcG9zaXRpb24ucG9zaXRpb25DaGFuZ2VzLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zWDogRHJvcGRvd25Qb3NpdGlvblggPSBjaGFuZ2UuY29ubmVjdGlvblBhaXIub3ZlcmxheVggPT09ICdzdGFydCcgPyAnYWZ0ZXInIDogJ2JlZm9yZSc7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zWTogRHJvcGRvd25Qb3NpdGlvblkgPSBjaGFuZ2UuY29ubmVjdGlvblBhaXIub3ZlcmxheVkgPT09ICd0b3AnID8gJ2JlbG93JyA6ICdhYm92ZSc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnNldFBvc2l0aW9uQ2xhc3NlcyEocG9zWCwgcG9zWSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFwcHJvcHJpYXRlIHBvc2l0aW9ucyBvbiBhIHBvc2l0aW9uIHN0cmF0ZWd5XG4gICAgICogc28gdGhlIG92ZXJsYXkgY29ubmVjdHMgd2l0aCB0aGUgdHJpZ2dlciBjb3JyZWN0bHkuXG4gICAgICogQHBhcmFtIHBvc2l0aW9uU3RyYXRlZ3kgU3RyYXRlZ3kgd2hvc2UgcG9zaXRpb24gdG8gdXBkYXRlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0UG9zaXRpb24ocG9zaXRpb25TdHJhdGVneTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KSB7XG4gICAgICAgIGxldCBbb3JpZ2luWCwgb3JpZ2luRmFsbGJhY2tYLCBvdmVybGF5WCwgb3ZlcmxheUZhbGxiYWNrWF06IEhvcml6b250YWxDb25uZWN0aW9uUG9zW10gPVxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi54UG9zaXRpb24gPT09ICdiZWZvcmUnID9cbiAgICAgICAgICAgICAgICBbJ2VuZCcsICdzdGFydCcsICdlbmQnLCAnc3RhcnQnXSA6XG4gICAgICAgICAgICAgICAgWydzdGFydCcsICdlbmQnLCAnc3RhcnQnLCAnZW5kJ107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgICAgICBsZXQgW292ZXJsYXlZLCBvdmVybGF5RmFsbGJhY2tZLCBvcmlnaW5ZLCBvcmlnaW5GYWxsYmFja1ldOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3NbXSA9XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnlQb3NpdGlvbiA9PT0gJ2Fib3ZlJyA/XG4gICAgICAgICAgICAgICAgWydib3R0b20nLCAndG9wJywgJ2JvdHRvbScsICd0b3AnXSA6XG4gICAgICAgICAgICAgICAgWyd0b3AnLCAnYm90dG9tJywgJ3RvcCcsICdib3R0b20nXTtcblxuICAgICAgICBsZXQgb2Zmc2V0WSA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICAvLyBXaGVuIHRoZSBkcm9wZG93biBpcyBuZXN0ZWQsIGl0IHNob3VsZCBhbHdheXMgYWxpZ24gaXRzZWxmXG4gICAgICAgICAgICAvLyB0byB0aGUgZWRnZXMgb2YgdGhlIHRyaWdnZXIsIGluc3RlYWQgb2Ygb3ZlcmxhcHBpbmcgaXQuXG4gICAgICAgICAgICBvdmVybGF5RmFsbGJhY2tYID0gb3JpZ2luWCA9IHRoaXMuZHJvcGRvd24ueFBvc2l0aW9uID09PSAnYmVmb3JlJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgIG9yaWdpbkZhbGxiYWNrWCA9IG92ZXJsYXlYID0gb3JpZ2luWCA9PT0gJ2VuZCcgPyAnc3RhcnQnIDogJ2VuZCc7XG4gICAgICAgICAgICBvZmZzZXRZID0gb3ZlcmxheVkgPT09ICdib3R0b20nID8gTkVTVEVEX1BBTkVMX1RPUF9QQURESU5HIDogLU5FU1RFRF9QQU5FTF9UT1BfUEFERElORztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wZG93bi5vdmVybGFwVHJpZ2dlclkpIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5ZID0gb3ZlcmxheVkgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgICAgICAgICAgICBvcmlnaW5GYWxsYmFja1kgPSBvdmVybGF5RmFsbGJhY2tZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wZG93bi5vdmVybGFwVHJpZ2dlclgpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5RmFsbGJhY2tYID0gb3JpZ2luWCA9IHRoaXMuZHJvcGRvd24ueFBvc2l0aW9uID09PSAnYmVmb3JlJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgICAgICBvcmlnaW5GYWxsYmFja1ggPSBvdmVybGF5WCA9IG9yaWdpblggPT09ICdlbmQnID8gJ3N0YXJ0JyA6ICdlbmQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcG9zaXRpb25TdHJhdGVneS53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICAgIHsgb3JpZ2luWCwgb3JpZ2luWSwgb3ZlcmxheVgsIG92ZXJsYXlZLCBvZmZzZXRZIH0sXG4gICAgICAgICAgICB7IG9yaWdpblg6IG9yaWdpbkZhbGxiYWNrWCwgb3JpZ2luWSwgb3ZlcmxheVg6IG92ZXJsYXlGYWxsYmFja1gsIG92ZXJsYXlZLCBvZmZzZXRZIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWCxcbiAgICAgICAgICAgICAgICBvcmlnaW5ZOiBvcmlnaW5GYWxsYmFja1ksXG4gICAgICAgICAgICAgICAgb3ZlcmxheVgsXG4gICAgICAgICAgICAgICAgb3ZlcmxheVk6IG92ZXJsYXlGYWxsYmFja1ksXG4gICAgICAgICAgICAgICAgb2Zmc2V0WTogLW9mZnNldFlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6IG9yaWdpbkZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiAtb2Zmc2V0WVxuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKiogQ2xlYW5zIHVwIHRoZSBhY3RpdmUgc3Vic2NyaXB0aW9ucy4gKi9cbiAgICBwcml2YXRlIGNsZWFuVXBTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuaG92ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIGFuIGFjdGlvbiB0aGF0IHNob3VsZCBjbG9zZSB0aGUgZHJvcGRvd24gb2NjdXJzLiAqL1xuICAgIHByaXZhdGUgY2xvc2luZ0FjdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IGJhY2tkcm9wID0gdGhpcy5vdmVybGF5UmVmIS5iYWNrZHJvcENsaWNrKCk7XG4gICAgICAgIGNvbnN0IGRldGFjaG1lbnRzID0gdGhpcy5vdmVybGF5UmVmIS5kZXRhY2htZW50cygpO1xuICAgICAgICBjb25zdCBwYXJlbnRDbG9zZSA9IHRoaXMuX3BhcmVudCA/IHRoaXMuX3BhcmVudC5jbG9zZWQgOiBvYnNlcnZhYmxlT2YoKTtcbiAgICAgICAgY29uc3QgaG92ZXIgPSB0aGlzLl9wYXJlbnQgPyB0aGlzLl9wYXJlbnQuaG92ZXJlZCgpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKGFjdGl2ZSkgPT4gYWN0aXZlICE9PSB0aGlzLl9kcm9wZG93bkl0ZW1JbnN0YW5jZSksXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5fb3BlbmVkKVxuICAgICAgICApIDogb2JzZXJ2YWJsZU9mKCk7XG5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGJhY2tkcm9wLCBwYXJlbnRDbG9zZSwgaG92ZXIsIGRldGFjaG1lbnRzKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB0aGUgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaG92ZXJzIG92ZXIgdGhlIHRyaWdnZXIuICovXG4gICAgcHJpdmF0ZSBoYW5kbGVIb3ZlcigpIHtcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIGhvdmVyZWQgaXRlbSBpbiBvcmRlciB0byB0b2dnbGUgdGhlIHBhbmVsLlxuICAgICAgICBpZiAoIXRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhvdmVyU3Vic2NyaXB0aW9uID0gdGhpcy5fcGFyZW50LmhvdmVyZWQoKVxuICAgICAgICAvLyBTaW5jZSB3ZSBtaWdodCBoYXZlIG11bHRpcGxlIGNvbXBldGluZyB0cmlnZ2VycyBmb3IgdGhlIHNhbWUgZHJvcGRvd24gKGUuZy4gYSBuZXN0ZWQgZHJvcGRvd25cbiAgICAgICAgLy8gd2l0aCBkaWZmZXJlbnQgZGF0YSBhbmQgdHJpZ2dlcnMpLCB3ZSBoYXZlIHRvIGRlbGF5IGl0IGJ5IGEgdGljayB0byBlbnN1cmUgdGhhdFxuICAgICAgICAvLyBpdCB3b24ndCBiZSBjbG9zZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaXQgaXMgb3BlbmVkLlxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKChhY3RpdmUpID0+IGFjdGl2ZSA9PT0gdGhpcy5fZHJvcGRvd25JdGVtSW5zdGFuY2UgJiYgIWFjdGl2ZS5kaXNhYmxlZCksXG4gICAgICAgICAgICAgICAgZGVsYXkoMCwgYXNhcFNjaGVkdWxlcilcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQnkgPSAnbW91c2UnO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNhbWUgZHJvcGRvd24gaXMgdXNlZCBiZXR3ZWVuIG11bHRpcGxlIHRyaWdnZXJzLCBpdCBtaWdodCBzdGlsbCBiZSBhbmltYXRpbmdcbiAgICAgICAgICAgICAgICAvLyB3aGlsZSB0aGUgbmV3IHRyaWdnZXIgdHJpZXMgdG8gcmUtb3BlbiBpdC4gV2FpdCBmb3IgdGhlIGFuaW1hdGlvbiB0byBmaW5pc2hcbiAgICAgICAgICAgICAgICAvLyBiZWZvcmUgZG9pbmcgc28uIEFsc28gaW50ZXJydXB0IGlmIHRoZSB1c2VyIG1vdmVzIHRvIGFub3RoZXIgaXRlbS5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcm9wZG93biBpbnN0YW5jZW9mIE1jRHJvcGRvd24gJiYgdGhpcy5kcm9wZG93bi5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBuZWVkIHRoZSBgZGVsYXkoMClgIGhlcmUgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAgICAgICAgICAgICAgICAgLy8gJ2NoYW5nZWQgYWZ0ZXIgY2hlY2tlZCcgZXJyb3JzIGluIHNvbWUgY2FzZXMuIFNlZSAjMTIxOTQuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uYW5pbWF0aW9uRG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSwgZGVsYXkoMCwgYXNhcFNjaGVkdWxlciksIHRha2VVbnRpbCh0aGlzLl9wYXJlbnQuaG92ZXJlZCgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vcGVuKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBHZXRzIHRoZSBwb3J0YWwgdGhhdCBzaG91bGQgYmUgYXR0YWNoZWQgdG8gdGhlIG92ZXJsYXkuICovXG4gICAgcHJpdmF0ZSBnZXRQb3J0YWwoKTogVGVtcGxhdGVQb3J0YWwge1xuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgY2FuIGF2b2lkIHRoaXMgY2hlY2sgYnkga2VlcGluZyB0aGUgcG9ydGFsIG9uIHRoZSBkcm9wZG93biBwYW5lbC5cbiAgICAgICAgLy8gV2hpbGUgaXQgd291bGQgYmUgY2xlYW5lciwgd2UnZCBoYXZlIHRvIGludHJvZHVjZSBhbm90aGVyIHJlcXVpcmVkIG1ldGhvZCBvblxuICAgICAgICAvLyBgTWNEcm9wZG93blBhbmVsYCwgbWFraW5nIGl0IGhhcmRlciB0byBjb25zdW1lLlxuICAgICAgICBpZiAoIXRoaXMucG9ydGFsIHx8IHRoaXMucG9ydGFsLnRlbXBsYXRlUmVmICE9PSB0aGlzLmRyb3Bkb3duLnRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLmRyb3Bkb3duLnRlbXBsYXRlUmVmLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbDtcbiAgICB9XG5cbn1cbiJdfQ==
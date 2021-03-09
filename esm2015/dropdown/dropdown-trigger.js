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
/** Injection token that determines the scroll handling while the dropdown is open. */
export const MC_DROPDOWN_SCROLL_STRATEGY = new InjectionToken('mc-dropdown-scroll-strategy');
/** @docs-private */
// tslint:disable-next-line:naming-convention
export function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
export const MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DROPDOWN_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
};
/** Default top padding of the nested dropdown panel. */
export const NESTED_PANEL_TOP_PADDING = 2;
/** Options for binding a passive event listener. */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
export class McDropdownTrigger {
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
        /** Event emitted when the associated dropdown is opened. */
        this.dropdownOpened = new EventEmitter();
        /** Event emitted when the associated dropdown is closed. */
        this.dropdownClosed = new EventEmitter();
        this._opened = false;
        this.overlayRef = null;
        this.closeSubscription = Subscription.EMPTY;
        this.hoverSubscription = Subscription.EMPTY;
        /**
         * Handles touch start events on the trigger.
         * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
         */
        this.handleTouchStart = () => this.openedBy = 'touch';
        _element.nativeElement.addEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
        if (_dropdownItemInstance) {
            _dropdownItemInstance.triggersNestedDropdown = this.triggersNestedDropdown();
        }
    }
    /** The text direction of the containing app. */
    get dir() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /** References the dropdown instance that the trigger is associated with. */
    get dropdown() {
        return this._dropdown;
    }
    set dropdown(dropdown) {
        if (dropdown === this._dropdown) {
            return;
        }
        this._dropdown = dropdown;
        this.closeSubscription.unsubscribe();
        if (dropdown) {
            this.closeSubscription = dropdown.closed.asObservable().subscribe((reason) => {
                this.destroy();
                // If a click closed the dropdown, we should close the entire chain of nested dropdowns.
                if ((reason === 'click' || reason === 'tab') && this._parent) {
                    this._parent.closed.emit(reason);
                }
            });
        }
    }
    /** Whether the dropdown is open. */
    get opened() {
        return this._opened;
    }
    ngAfterContentInit() {
        this.check();
        this.handleHover();
    }
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
        this._element.nativeElement.removeEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
        this.cleanUpSubscriptions();
        this.closeSubscription.unsubscribe();
    }
    /** Whether the dropdown triggers a nested dropdown or a top-level one. */
    triggersNestedDropdown() {
        return !!(this._dropdownItemInstance && this._parent);
    }
    /** Toggles the dropdown between the open and closed states. */
    toggle() {
        // tslint:disable-next-line:no-void-expression
        return this._opened ? this.close() : this.open();
    }
    /** Opens the dropdown. */
    open() {
        if (this._opened) {
            return;
        }
        this.check();
        const overlayRef = this.createOverlay();
        const overlayConfig = overlayRef.getConfig();
        this.setPosition(overlayConfig.positionStrategy);
        overlayConfig.hasBackdrop = this.dropdown.hasBackdrop ? !this.triggersNestedDropdown() :
            this.dropdown.hasBackdrop;
        overlayRef.attach(this.getPortal());
        if (this.dropdown.lazyContent) {
            this.dropdown.lazyContent.attach(this.data);
        }
        this.closeSubscription = this.closingActions().subscribe(() => this.close());
        this.init();
        if (this.dropdown instanceof McDropdown) {
            this.dropdown.startAnimation();
        }
    }
    /** Closes the dropdown. */
    close() {
        this.dropdown.closed.emit();
    }
    /**
     * Focuses the dropdown trigger.
     * @param origin Source of the dropdown trigger's focus.
     */
    focus(origin = 'program') {
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._element.nativeElement, origin);
        }
        else {
            this._element.nativeElement.focus();
        }
    }
    /** Handles mouse presses on the trigger. */
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
    /** Handles key presses on the trigger. */
    handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        const keyCode = event.key || event.keyCode;
        if (keyCode === SPACE || keyCode === ENTER) {
            this.open();
        }
        if (this.triggersNestedDropdown() && ((keyCode === RIGHT_ARROW && this.dir === 'ltr') ||
            (keyCode === LEFT_ARROW && this.dir === 'rtl'))) {
            this.open();
        }
    }
    /** Handles click events on the trigger. */
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
    /** Closes the dropdown and does the necessary cleanup. */
    destroy() {
        if (!this.overlayRef || !this.opened) {
            return;
        }
        const dropdown = this.dropdown;
        this.closeSubscription.unsubscribe();
        this.overlayRef.detach();
        if (dropdown instanceof McDropdown) {
            dropdown.resetAnimation();
            if (dropdown.lazyContent) {
                // Wait for the exit animation to finish before detaching the content.
                dropdown.animationDone
                    .pipe(filter((event) => event.toState === 'void'), take(1), 
                // Interrupt if the content got re-attached.
                takeUntil(dropdown.lazyContent.attached))
                    .subscribe({ next: () => dropdown.lazyContent.detach(), error: undefined, complete: () => {
                        // No matter whether the content got re-attached, reset the dropdown.
                        this.reset();
                    } });
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
     */
    check() {
        if (!this.dropdown) {
            throwMcDropdownMissingError();
        }
    }
    /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     */
    createOverlay() {
        if (!this.overlayRef) {
            const config = this.getOverlayConfig();
            this.subscribeToPositions(config.positionStrategy);
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
     * @returns OverlayConfig
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
     */
    subscribeToPositions(position) {
        if (this.dropdown.setPositionClasses) {
            position.positionChanges.subscribe((change) => {
                const posX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
                const posY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';
                this.dropdown.setPositionClasses(posX, posY);
            });
        }
    }
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    setPosition(positionStrategy) {
        let [originX, originFallbackX, overlayX, overlayFallbackX] = this.dropdown.xPosition === 'before' ?
            ['end', 'start', 'end', 'start'] :
            ['start', 'end', 'start', 'end'];
        // tslint:disable-next-line:prefer-const
        let [overlayY, overlayFallbackY, originY, originFallbackY] = this.dropdown.yPosition === 'above' ?
            ['bottom', 'top', 'bottom', 'top'] :
            ['top', 'bottom', 'top', 'bottom'];
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
    /** Cleans up the active subscriptions. */
    cleanUpSubscriptions() {
        this.closeSubscription.unsubscribe();
        this.hoverSubscription.unsubscribe();
    }
    /** Returns a stream that emits whenever an action that should close the dropdown occurs. */
    closingActions() {
        const backdrop = this.overlayRef.backdropClick();
        const outsidePointerEvents = this.overlayRef.outsidePointerEvents();
        const detachments = this.overlayRef.detachments();
        const parentClose = this._parent ? this._parent.closed : observableOf();
        const hover = this._parent ? this._parent.hovered().pipe(filter((active) => active !== this._dropdownItemInstance), filter(() => this._opened)) : observableOf();
        return merge(backdrop, outsidePointerEvents, parentClose, hover, detachments);
    }
    /** Handles the cases where the user hovers over the trigger. */
    handleHover() {
        // Subscribe to changes in the hovered item in order to toggle the panel.
        if (!this.triggersNestedDropdown()) {
            return;
        }
        this.hoverSubscription = this._parent.hovered()
            // Since we might have multiple competing triggers for the same dropdown (e.g. a nested dropdown
            // with different data and triggers), we have to delay it by a tick to ensure that
            // it won't be closed immediately after it is opened.
            .pipe(filter((active) => active === this._dropdownItemInstance && !active.disabled), delay(0, asapScheduler))
            .subscribe(() => {
            this.openedBy = 'mouse';
            // If the same dropdown is used between multiple triggers, it might still be animating
            // while the new trigger tries to re-open it. Wait for the animation to finish
            // before doing so. Also interrupt if the user moves to another item.
            if (this.dropdown instanceof McDropdown && this.dropdown.isAnimating) {
                // We need the `delay(0)` here in order to avoid
                // 'changed after checked' errors in some cases. See #12194.
                this.dropdown.animationDone
                    .pipe(take(1), delay(0, asapScheduler), takeUntil(this._parent.hovered()))
                    .subscribe(() => this.open());
            }
            else {
                this.open();
            }
        });
    }
    /** Gets the portal that should be attached to the overlay. */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9kcm9wZG93bi9kcm9wZG93bi10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUdILE9BQU8sRUFDUCxhQUFhLEVBSWhCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLElBQUksRUFDSixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2xELHNGQUFzRjtBQUN0RixNQUFNLENBQUMs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eUJBQXlCO29CQUN4QyxXQUFXLEVBQUUsdUJBQXVCO29CQUNwQyxTQUFTLEVBQUUscUJBQXFCO2lCQUNuQztnQkFDRCxRQUFRLEVBQUUsbUJBQW1CO2FBQ2hDOzs7O1lBdEVHLE9BQU87WUFXUCxVQUFVO1lBU1YsZ0JBQWdCOzRDQXFIWCxNQUFNLFNBQUMsMkJBQTJCO1lBM0dsQyxVQUFVLHVCQTRHVixRQUFRO1lBL0dSLGNBQWMsdUJBZ0hkLFFBQVEsWUFBSSxJQUFJO1lBL0lMLGNBQWMsdUJBZ0p6QixRQUFRO1lBakpSLFlBQVk7Ozt1QkFxRmhCLEtBQUssU0FBQyxzQkFBc0I7bUJBNEI1QixLQUFLLFNBQUMsdUJBQXVCOzZCQUc3QixNQUFNOzZCQUdOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheUNvbmZpZyxcbiAgICBPdmVybGF5UmVmLFxuICAgIFZlcnRpY2FsQ29ubmVjdGlvblBvcyxcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNlbGYsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBTUEFDRSwgRU5URVIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgYXNhcFNjaGVkdWxlciwgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgZmlsdGVyLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IHRocm93TWNEcm9wZG93bk1pc3NpbmdFcnJvciB9IGZyb20gJy4vZHJvcGRvd24tZXJyb3JzJztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtJztcbmltcG9ydCB7IE1jRHJvcGRvd25QYW5lbCB9IGZyb20gJy4vZHJvcGRvd24tcGFuZWwnO1xuaW1wb3J0IHsgRHJvcGRvd25Qb3NpdGlvblgsIERyb3Bkb3duUG9zaXRpb25ZIH0gZnJvbSAnLi9kcm9wZG93bi1wb3NpdGlvbnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93biB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcblxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkcm9wZG93biBpcyBvcGVuLiAqL1xuZXhwb3J0IGNvbnN0IE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtZHJvcGRvd24tc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllcbn07XG5cbi8qKiBEZWZhdWx0IHRvcCBwYWRkaW5nIG9mIHRoZSBuZXN0ZWQgZHJvcGRvd24gcGFuZWwuICovXG5leHBvcnQgY29uc3QgTkVTVEVEX1BBTkVMX1RPUF9QQURESU5HID0gMjtcblxuLyoqIE9wdGlvbnMgZm9yIGJpbmRpbmcgYSBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyLiAqL1xuY29uc3QgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBhbiBtYy1kcm9wZG93biB0YWcuICBJdCBpc1xuICogcmVzcG9uc2libGUgZm9yIHRvZ2dsaW5nIHRoZSBkaXNwbGF5IG9mIHRoZSBwcm92aWRlZCBkcm9wZG93biBpbnN0YW5jZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBbbWNEcm9wZG93blRyaWdnZXJGb3JdYCxcbiAgICBob3N0OiB7XG4gICAgICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLFxuICAgICAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnb3BlbmVkIHx8IG51bGwnLFxuICAgICAgICAnKG1vdXNlZG93biknOiAnaGFuZGxlTW91c2Vkb3duKCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknXG4gICAgfSxcbiAgICBleHBvcnRBczogJ21jRHJvcGRvd25UcmlnZ2VyJ1xufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duVHJpZ2dlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogVGhlIHRleHQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgICBnZXQgZGlyKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA/ICdydGwnIDogJ2x0cic7XG4gICAgfVxuXG5cbiAgICAvKiogUmVmZXJlbmNlcyB0aGUgZHJvcGRvd24gaW5zdGFuY2UgdGhhdCB0aGUgdHJpZ2dlciBpcyBhc3NvY2lhdGVkIHdpdGguICovXG4gICAgQElucHV0KCdtY0Ryb3Bkb3duVHJpZ2dlckZvcicpXG4gICAgZ2V0IGRyb3Bkb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHJvcGRvd247XG4gICAgfVxuXG4gICAgc2V0IGRyb3Bkb3duKGRyb3Bkb3duOiBNY0Ryb3Bkb3duUGFuZWwpIHtcbiAgICAgICAgaWYgKGRyb3Bkb3duID09PSB0aGlzLl9kcm9wZG93bikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9kcm9wZG93biA9IGRyb3Bkb3duO1xuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgaWYgKGRyb3Bkb3duKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uID0gZHJvcGRvd24uY2xvc2VkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiBhIGNsaWNrIGNsb3NlZCB0aGUgZHJvcGRvd24sIHdlIHNob3VsZCBjbG9zZSB0aGUgZW50aXJlIGNoYWluIG9mIG5lc3RlZCBkcm9wZG93bnMuXG4gICAgICAgICAgICAgICAgaWYgKChyZWFzb24gPT09ICdjbGljaycgfHwgcmVhc29uID09PSAndGFiJykgJiYgdGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jbG9zZWQuZW1pdChyZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJhY2tpbmcgaW5wdXQgdHlwZSBpcyBuZWNlc3Nhcnkgc28gaXQncyBwb3NzaWJsZSB0byBvbmx5IGF1dG8tZm9jdXNcbiAgICAvLyB0aGUgZmlyc3QgaXRlbSBvZiB0aGUgbGlzdCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQgdmlhIHRoZSBrZXlib2FyZFxuICAgIG9wZW5lZEJ5OiAnbW91c2UnIHwgJ3RvdWNoJyB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIERhdGEgdG8gYmUgcGFzc2VkIGFsb25nIHRvIGFueSBsYXppbHktcmVuZGVyZWQgY29udGVudC4gKi9cbiAgICBASW5wdXQoJ21jRHJvcGRvd25UcmlnZ2VyRGF0YScpIGRhdGE6IGFueTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFzc29jaWF0ZWQgZHJvcGRvd24gaXMgb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkcm9wZG93bk9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYXNzb2NpYXRlZCBkcm9wZG93biBpcyBjbG9zZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRyb3Bkb3duQ2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIF9kcm9wZG93bjogTWNEcm9wZG93blBhbmVsO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIG9wZW4uICovXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjbG9zZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgaG92ZXJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIF9zY3JvbGxTdHJhdGVneTogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9wYXJlbnQ6IE1jRHJvcGRvd24sXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHJpdmF0ZSBfZHJvcGRvd25JdGVtSW5zdGFuY2U6IE1jRHJvcGRvd25JdGVtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I/OiBGb2N1c01vbml0b3JcbiAgICApIHtcbiAgICAgICAgX2VsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuICAgICAgICAgICAgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKF9kcm9wZG93bkl0ZW1JbnN0YW5jZSkge1xuICAgICAgICAgICAgX2Ryb3Bkb3duSXRlbUluc3RhbmNlLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24gPSB0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVjaygpO1xuICAgICAgICB0aGlzLmhhbmRsZUhvdmVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG4gICAgICAgICAgICBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNsZWFuVXBTdWJzY3JpcHRpb25zKCk7XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gdHJpZ2dlcnMgYSBuZXN0ZWQgZHJvcGRvd24gb3IgYSB0b3AtbGV2ZWwgb25lLiAqL1xuICAgIHRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhISh0aGlzLl9kcm9wZG93bkl0ZW1JbnN0YW5jZSAmJiB0aGlzLl9wYXJlbnQpO1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBkcm9wZG93biBiZXR3ZWVuIHRoZSBvcGVuIGFuZCBjbG9zZWQgc3RhdGVzLiAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZvaWQtZXhwcmVzc2lvblxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBkcm9wZG93bi4gKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuY2hlY2soKTtcblxuICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBvdmVybGF5UmVmLmdldENvbmZpZygpO1xuXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ob3ZlcmxheUNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk7XG5cbiAgICAgICAgb3ZlcmxheUNvbmZpZy5oYXNCYWNrZHJvcCA9IHRoaXMuZHJvcGRvd24uaGFzQmFja2Ryb3AgPyAhdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkgOlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5oYXNCYWNrZHJvcDtcblxuICAgICAgICBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLmdldFBvcnRhbCgpKTtcblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5sYXp5Q29udGVudC5hdHRhY2godGhpcy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLmNsb3NpbmdBY3Rpb25zKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duIGluc3RhbmNlb2YgTWNEcm9wZG93bikge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5zdGFydEFuaW1hdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsb3NlcyB0aGUgZHJvcGRvd24uICovXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uY2xvc2VkLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1c2VzIHRoZSBkcm9wZG93biB0cmlnZ2VyLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gU291cmNlIG9mIHRoZSBkcm9wZG93biB0cmlnZ2VyJ3MgZm9jdXMuXG4gICAgICovXG4gICAgZm9jdXMob3JpZ2luOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJykge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBvcmlnaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBtb3VzZSBwcmVzc2VzIG9uIHRoZSB0cmlnZ2VyLiAqL1xuICAgIGhhbmRsZU1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBTaW5jZSByaWdodCBvciBtaWRkbGUgYnV0dG9uIGNsaWNrcyB3b24ndCB0cmlnZ2VyIHRoZSBgY2xpY2tgIGV2ZW50LFxuICAgICAgICAvLyB3ZSBzaG91bGRuJ3QgY29uc2lkZXIgdGhlIGRyb3Bkb3duIGFzIG9wZW5lZCBieSBtb3VzZSBpbiB0aG9zZSBjYXNlcy5cbiAgICAgICAgdGhpcy5vcGVuZWRCeSA9IGV2ZW50LmJ1dHRvbiA9PT0gMCA/ICdtb3VzZScgOiBudWxsO1xuXG4gICAgICAgIC8vIFNpbmNlIGNsaWNraW5nIG9uIHRoZSB0cmlnZ2VyIHdvbid0IGNsb3NlIHRoZSBkcm9wZG93biBpZiBpdCBvcGVucyBhIG5lc3RlZCBkcm9wZG93bixcbiAgICAgICAgLy8gd2Ugc2hvdWxkIHByZXZlbnQgZm9jdXMgZnJvbSBtb3Zpbmcgb250byBpdCB2aWEgY2xpY2sgdG8gYXZvaWQgdGhlXG4gICAgICAgIC8vIGhpZ2hsaWdodCBmcm9tIGxpbmdlcmluZyBvbiB0aGUgZHJvcGRvd24gaXRlbS5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5IHByZXNzZXMgb24gdGhlIHRyaWdnZXIuICovXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleSB8fCBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBTUEFDRSB8fCBrZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkgJiYgKFxuICAgICAgICAgICAgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XICYmIHRoaXMuZGlyID09PSAnbHRyJykgfHxcbiAgICAgICAgICAgIChrZXlDb2RlID09PSBMRUZUX0FSUk9XICYmIHRoaXMuZGlyID09PSAncnRsJykpKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGNsaWNrIGV2ZW50cyBvbiB0aGUgdHJpZ2dlci4gKi9cbiAgICBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIC8vIFN0b3AgZXZlbnQgcHJvcGFnYXRpb24gdG8gYXZvaWQgY2xvc2luZyB0aGUgcGFyZW50IGRyb3Bkb3duLlxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRvdWNoIHN0YXJ0IGV2ZW50cyBvbiB0aGUgdHJpZ2dlci5cbiAgICAgKiBOZWVkcyB0byBiZSBhbiBhcnJvdyBmdW5jdGlvbiBzbyB3ZSBjYW4gZWFzaWx5IHVzZSBhZGRFdmVudExpc3RlbmVyIGFuZCByZW1vdmVFdmVudExpc3RlbmVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hTdGFydCA9ICgpID0+IHRoaXMub3BlbmVkQnkgPSAndG91Y2gnO1xuXG4gICAgLyoqIENsb3NlcyB0aGUgZHJvcGRvd24gYW5kIGRvZXMgdGhlIG5lY2Vzc2FyeSBjbGVhbnVwLiAqL1xuICAgIHByaXZhdGUgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYgfHwgIXRoaXMub3BlbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcm9wZG93biA9IHRoaXMuZHJvcGRvd247XG5cbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKGRyb3Bkb3duIGluc3RhbmNlb2YgTWNEcm9wZG93bikge1xuICAgICAgICAgICAgZHJvcGRvd24ucmVzZXRBbmltYXRpb24oKTtcblxuICAgICAgICAgICAgaWYgKGRyb3Bkb3duLmxhenlDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gV2FpdCBmb3IgdGhlIGV4aXQgYW5pbWF0aW9uIHRvIGZpbmlzaCBiZWZvcmUgZGV0YWNoaW5nIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLmFuaW1hdGlvbkRvbmVcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKGV2ZW50KSA9PiBldmVudC50b1N0YXRlID09PSAndm9pZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludGVycnVwdCBpZiB0aGUgY29udGVudCBnb3QgcmUtYXR0YWNoZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwoZHJvcGRvd24ubGF6eUNvbnRlbnQuYXR0YWNoZWQpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh7bmV4dDogKCkgPT4gZHJvcGRvd24ubGF6eUNvbnRlbnQuZGV0YWNoKCksIGVycm9yOiB1bmRlZmluZWQsIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBtYXR0ZXIgd2hldGhlciB0aGUgY29udGVudCBnb3QgcmUtYXR0YWNoZWQsIHJlc2V0IHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duLmxhenlDb250ZW50LmRldGFjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgZHJvcGRvd24gc3RhdGUgdG8gb3BlbiBhbmQgZm9jdXNlcyB0aGUgZmlyc3QgaXRlbSBpZlxuICAgICAqIHRoZSBkcm9wZG93biB3YXMgb3BlbmVkIHZpYSB0aGUga2V5Ym9hcmQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLnBhcmVudCA9IHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpID8gdGhpcy5fcGFyZW50IDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmRpcmVjdGlvbiA9IHRoaXMuZGlyO1xuICAgICAgICB0aGlzLnNldElzT3BlbmVkKHRydWUpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmZvY3VzRmlyc3RJdGVtKHRoaXMub3BlbmVkQnkgfHwgJ3Byb2dyYW0nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCByZXNldHMgdGhlIGRyb3Bkb3duIHdoZW4gaXQncyBjbG9zZWQsIG1vc3QgaW1wb3J0YW50bHkgcmVzdG9yaW5nXG4gICAgICogZm9jdXMgdG8gdGhlIGRyb3Bkb3duIHRyaWdnZXIgaWYgdGhlIGRyb3Bkb3duIHdhcyBvcGVuZWQgdmlhIHRoZSBrZXlib2FyZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldElzT3BlbmVkKGZhbHNlKTtcblxuICAgICAgICAvLyBXZSBzaG91bGQgcmVzZXQgZm9jdXMgaWYgdGhlIHVzZXIgaXMgbmF2aWdhdGluZyB1c2luZyBhIGtleWJvYXJkIG9yXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSB0b3AtbGV2ZWwgdHJpZ2dlciB3aGljaCBtaWdodCBjYXVzZSBmb2N1cyB0byBiZSBsb3N0XG4gICAgICAgIC8vIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhY2tkcm9wLlxuICAgICAgICBpZiAoIXRoaXMub3BlbmVkQnkpIHtcbiAgICAgICAgICAgIC8vIE5vdGUgdGhhdCB0aGUgZm9jdXMgc3R5bGUgd2lsbCBzaG93IHVwIGJvdGggZm9yIGBwcm9ncmFtYCBhbmRcbiAgICAgICAgICAgIC8vIGBrZXlib2FyZGAgc28gd2UgZG9uJ3QgaGF2ZSB0byBzcGVjaWZ5IHdoaWNoIG9uZSBpdCBpcy5cbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXModGhpcy5vcGVuZWRCeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5lZEJ5ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzZXQgc3RhdGUgcmF0aGVyIHRoYW4gdG9nZ2xlIHRvIHN1cHBvcnQgdHJpZ2dlcnMgc2hhcmluZyBhIGRyb3Bkb3duXG4gICAgcHJpdmF0ZSBzZXRJc09wZW5lZChpc09wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb3BlbmVkID0gaXNPcGVuO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdm9pZC1leHByZXNzaW9uXG4gICAgICAgIHRoaXMuX29wZW5lZCA/IHRoaXMuZHJvcGRvd25PcGVuZWQuZW1pdCgpIDogdGhpcy5kcm9wZG93bkNsb3NlZC5lbWl0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICB0aGlzLl9kcm9wZG93bkl0ZW1JbnN0YW5jZS5oaWdobGlnaHRlZCA9IGlzT3BlbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGNoZWNrcyB0aGF0IGEgdmFsaWQgaW5zdGFuY2Ugb2YgTWNEcm9wZG93biBoYXMgYmVlbiBwYXNzZWQgaW50b1xuICAgICAqIG1jRHJvcGRvd25UcmlnZ2VyRm9yLiBJZiBub3QsIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVjaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duKSB7XG4gICAgICAgICAgICB0aHJvd01jRHJvcGRvd25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgdGhlIG92ZXJsYXkgZnJvbSB0aGUgcHJvdmlkZWQgZHJvcGRvd24ncyB0ZW1wbGF0ZSBhbmQgc2F2ZXMgaXRzXG4gICAgICogT3ZlcmxheVJlZiBzbyB0aGF0IGl0IGNhbiBiZSBhdHRhY2hlZCB0byB0aGUgRE9NIHdoZW4gb3BlbiBpcyBjYWxsZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KCk6IE92ZXJsYXlSZWYge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRPdmVybGF5Q29uZmlnKCk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvUG9zaXRpb25zKGNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShjb25maWcpO1xuXG4gICAgICAgICAgICAvLyBDb25zdW1lIHRoZSBga2V5ZG93bkV2ZW50c2AgaW4gb3JkZXIgdG8gcHJldmVudCB0aGVtIGZyb20gZ29pbmcgdG8gYW5vdGhlciBvdmVybGF5LlxuICAgICAgICAgICAgLy8gSWRlYWxseSB3ZSdkIGFsc28gaGF2ZSBvdXIga2V5Ym9hcmQgZXZlbnQgbG9naWMgaW4gaGVyZSwgaG93ZXZlciBkb2luZyBzbyB3aWxsXG4gICAgICAgICAgICAvLyBicmVhayBhbnlib2R5IHRoYXQgbWF5IGhhdmUgaW1wbGVtZW50ZWQgdGhlIGBNY0Ryb3Bkb3duUGFuZWxgIHRoZW1zZWx2ZXMuXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBidWlsZHMgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG5lZWRlZCB0byBjcmVhdGUgdGhlIG92ZXJsYXksIHRoZSBPdmVybGF5U3RhdGUuXG4gICAgICogQHJldHVybnMgT3ZlcmxheUNvbmZpZ1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgICAgICAgICAgLndpdGhMb2NrZWRQb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1jLWRyb3Bkb3duX19wYW5lbCcpLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5kcm9wZG93bi5iYWNrZHJvcENsYXNzIHx8ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5fZGlyXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbnMgdG8gY2hhbmdlcyBpbiB0aGUgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgYW5kIHNldHMgdGhlIGNvcnJlY3QgY2xhc3Nlc1xuICAgICAqIG9uIHRoZSBkcm9wZG93biBiYXNlZCBvbiB0aGUgbmV3IHBvc2l0aW9uLiBUaGlzIGVuc3VyZXMgdGhlIGFuaW1hdGlvbiBvcmlnaW4gaXMgYWx3YXlzXG4gICAgICogY29ycmVjdCwgZXZlbiBpZiBhIGZhbGxiYWNrIHBvc2l0aW9uIGlzIHVzZWQgZm9yIHRoZSBvdmVybGF5LlxuICAgICAqL1xuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9Qb3NpdGlvbnMocG9zaXRpb246IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5zZXRQb3NpdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLnBvc2l0aW9uQ2hhbmdlcy5zdWJzY3JpYmUoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc1g6IERyb3Bkb3duUG9zaXRpb25YID0gY2hhbmdlLmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlYID09PSAnc3RhcnQnID8gJ2FmdGVyJyA6ICdiZWZvcmUnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc1k6IERyb3Bkb3duUG9zaXRpb25ZID0gY2hhbmdlLmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlZID09PSAndG9wJyA/ICdiZWxvdycgOiAnYWJvdmUnO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5zZXRQb3NpdGlvbkNsYXNzZXMhKHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhcHByb3ByaWF0ZSBwb3NpdGlvbnMgb24gYSBwb3NpdGlvbiBzdHJhdGVneVxuICAgICAqIHNvIHRoZSBvdmVybGF5IGNvbm5lY3RzIHdpdGggdGhlIHRyaWdnZXIgY29ycmVjdGx5LlxuICAgICAqIEBwYXJhbSBwb3NpdGlvblN0cmF0ZWd5IFN0cmF0ZWd5IHdob3NlIHBvc2l0aW9uIHRvIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFBvc2l0aW9uKHBvc2l0aW9uU3RyYXRlZ3k6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSkge1xuICAgICAgICBsZXQgW29yaWdpblgsIG9yaWdpbkZhbGxiYWNrWCwgb3ZlcmxheVgsIG92ZXJsYXlGYWxsYmFja1hdOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvc1tdID1cbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ueFBvc2l0aW9uID09PSAnYmVmb3JlJyA/XG4gICAgICAgICAgICAgICAgWydlbmQnLCAnc3RhcnQnLCAnZW5kJywgJ3N0YXJ0J10gOlxuICAgICAgICAgICAgICAgIFsnc3RhcnQnLCAnZW5kJywgJ3N0YXJ0JywgJ2VuZCddO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICAgICAgbGV0IFtvdmVybGF5WSwgb3ZlcmxheUZhbGxiYWNrWSwgb3JpZ2luWSwgb3JpZ2luRmFsbGJhY2tZXTogVmVydGljYWxDb25uZWN0aW9uUG9zW10gPVxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi55UG9zaXRpb24gPT09ICdhYm92ZScgP1xuICAgICAgICAgICAgICAgIFsnYm90dG9tJywgJ3RvcCcsICdib3R0b20nLCAndG9wJ10gOlxuICAgICAgICAgICAgICAgIFsndG9wJywgJ2JvdHRvbScsICd0b3AnLCAnYm90dG9tJ107XG5cbiAgICAgICAgbGV0IG9mZnNldFkgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgLy8gV2hlbiB0aGUgZHJvcGRvd24gaXMgbmVzdGVkLCBpdCBzaG91bGQgYWx3YXlzIGFsaWduIGl0c2VsZlxuICAgICAgICAgICAgLy8gdG8gdGhlIGVkZ2VzIG9mIHRoZSB0cmlnZ2VyLCBpbnN0ZWFkIG9mIG92ZXJsYXBwaW5nIGl0LlxuICAgICAgICAgICAgb3ZlcmxheUZhbGxiYWNrWCA9IG9yaWdpblggPSB0aGlzLmRyb3Bkb3duLnhQb3NpdGlvbiA9PT0gJ2JlZm9yZScgPyAnc3RhcnQnIDogJ2VuZCc7XG4gICAgICAgICAgICBvcmlnaW5GYWxsYmFja1ggPSBvdmVybGF5WCA9IG9yaWdpblggPT09ICdlbmQnID8gJ3N0YXJ0JyA6ICdlbmQnO1xuICAgICAgICAgICAgb2Zmc2V0WSA9IG92ZXJsYXlZID09PSAnYm90dG9tJyA/IE5FU1RFRF9QQU5FTF9UT1BfUEFERElORyA6IC1ORVNURURfUEFORUxfVE9QX1BBRERJTkc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24ub3ZlcmxhcFRyaWdnZXJZKSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWSA9IG92ZXJsYXlZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgICAgICAgICAgICAgb3JpZ2luRmFsbGJhY2tZID0gb3ZlcmxheUZhbGxiYWNrWSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24ub3ZlcmxhcFRyaWdnZXJYKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheUZhbGxiYWNrWCA9IG9yaWdpblggPSB0aGlzLmRyb3Bkb3duLnhQb3NpdGlvbiA9PT0gJ2JlZm9yZScgPyAnc3RhcnQnIDogJ2VuZCc7XG4gICAgICAgICAgICAgICAgb3JpZ2luRmFsbGJhY2tYID0gb3ZlcmxheVggPSBvcmlnaW5YID09PSAnZW5kJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBvc2l0aW9uU3RyYXRlZ3kud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICB7IG9yaWdpblgsIG9yaWdpblksIG92ZXJsYXlYLCBvdmVybGF5WSwgb2Zmc2V0WSB9LFxuICAgICAgICAgICAgeyBvcmlnaW5YOiBvcmlnaW5GYWxsYmFja1gsIG9yaWdpblksIG92ZXJsYXlYOiBvdmVybGF5RmFsbGJhY2tYLCBvdmVybGF5WSwgb2Zmc2V0WSB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9yaWdpblgsXG4gICAgICAgICAgICAgICAgb3JpZ2luWTogb3JpZ2luRmFsbGJhY2tZLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiBvdmVybGF5RmFsbGJhY2tZLFxuICAgICAgICAgICAgICAgIG9mZnNldFk6IC1vZmZzZXRZXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9yaWdpblg6IG9yaWdpbkZhbGxiYWNrWCxcbiAgICAgICAgICAgICAgICBvcmlnaW5ZOiBvcmlnaW5GYWxsYmFja1ksXG4gICAgICAgICAgICAgICAgb3ZlcmxheVg6IG92ZXJsYXlGYWxsYmFja1gsXG4gICAgICAgICAgICAgICAgb3ZlcmxheVk6IG92ZXJsYXlGYWxsYmFja1ksXG4gICAgICAgICAgICAgICAgb2Zmc2V0WTogLW9mZnNldFlcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqIENsZWFucyB1cCB0aGUgYWN0aXZlIHN1YnNjcmlwdGlvbnMuICovXG4gICAgcHJpdmF0ZSBjbGVhblVwU3Vic2NyaXB0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmhvdmVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciBhbiBhY3Rpb24gdGhhdCBzaG91bGQgY2xvc2UgdGhlIGRyb3Bkb3duIG9jY3Vycy4gKi9cbiAgICBwcml2YXRlIGNsb3NpbmdBY3Rpb25zKCkge1xuICAgICAgICBjb25zdCBiYWNrZHJvcCA9IHRoaXMub3ZlcmxheVJlZiEuYmFja2Ryb3BDbGljaygpO1xuICAgICAgICBjb25zdCBvdXRzaWRlUG9pbnRlckV2ZW50cyA9IHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKTtcbiAgICAgICAgY29uc3QgZGV0YWNobWVudHMgPSB0aGlzLm92ZXJsYXlSZWYhLmRldGFjaG1lbnRzKCk7XG4gICAgICAgIGNvbnN0IHBhcmVudENsb3NlID0gdGhpcy5fcGFyZW50ID8gdGhpcy5fcGFyZW50LmNsb3NlZCA6IG9ic2VydmFibGVPZigpO1xuICAgICAgICBjb25zdCBob3ZlciA9IHRoaXMuX3BhcmVudCA/IHRoaXMuX3BhcmVudC5ob3ZlcmVkKCkucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoYWN0aXZlKSA9PiBhY3RpdmUgIT09IHRoaXMuX2Ryb3Bkb3duSXRlbUluc3RhbmNlKSxcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLl9vcGVuZWQpXG4gICAgICAgICkgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICByZXR1cm4gbWVyZ2UoYmFja2Ryb3AsIG91dHNpZGVQb2ludGVyRXZlbnRzLCBwYXJlbnRDbG9zZSwgaG92ZXIsIGRldGFjaG1lbnRzKTtcbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyB0aGUgY2FzZXMgd2hlcmUgdGhlIHVzZXIgaG92ZXJzIG92ZXIgdGhlIHRyaWdnZXIuICovXG4gICAgcHJpdmF0ZSBoYW5kbGVIb3ZlcigpIHtcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIGhvdmVyZWQgaXRlbSBpbiBvcmRlciB0byB0b2dnbGUgdGhlIHBhbmVsLlxuICAgICAgICBpZiAoIXRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhvdmVyU3Vic2NyaXB0aW9uID0gdGhpcy5fcGFyZW50LmhvdmVyZWQoKVxuICAgICAgICAvLyBTaW5jZSB3ZSBtaWdodCBoYXZlIG11bHRpcGxlIGNvbXBldGluZyB0cmlnZ2VycyBmb3IgdGhlIHNhbWUgZHJvcGRvd24gKGUuZy4gYSBuZXN0ZWQgZHJvcGRvd25cbiAgICAgICAgLy8gd2l0aCBkaWZmZXJlbnQgZGF0YSBhbmQgdHJpZ2dlcnMpLCB3ZSBoYXZlIHRvIGRlbGF5IGl0IGJ5IGEgdGljayB0byBlbnN1cmUgdGhhdFxuICAgICAgICAvLyBpdCB3b24ndCBiZSBjbG9zZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaXQgaXMgb3BlbmVkLlxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKChhY3RpdmUpID0+IGFjdGl2ZSA9PT0gdGhpcy5fZHJvcGRvd25JdGVtSW5zdGFuY2UgJiYgIWFjdGl2ZS5kaXNhYmxlZCksXG4gICAgICAgICAgICAgICAgZGVsYXkoMCwgYXNhcFNjaGVkdWxlcilcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQnkgPSAnbW91c2UnO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNhbWUgZHJvcGRvd24gaXMgdXNlZCBiZXR3ZWVuIG11bHRpcGxlIHRyaWdnZXJzLCBpdCBtaWdodCBzdGlsbCBiZSBhbmltYXRpbmdcbiAgICAgICAgICAgICAgICAvLyB3aGlsZSB0aGUgbmV3IHRyaWdnZXIgdHJpZXMgdG8gcmUtb3BlbiBpdC4gV2FpdCBmb3IgdGhlIGFuaW1hdGlvbiB0byBmaW5pc2hcbiAgICAgICAgICAgICAgICAvLyBiZWZvcmUgZG9pbmcgc28uIEFsc28gaW50ZXJydXB0IGlmIHRoZSB1c2VyIG1vdmVzIHRvIGFub3RoZXIgaXRlbS5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcm9wZG93biBpbnN0YW5jZW9mIE1jRHJvcGRvd24gJiYgdGhpcy5kcm9wZG93bi5pc0FuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBuZWVkIHRoZSBgZGVsYXkoMClgIGhlcmUgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAgICAgICAgICAgICAgICAgLy8gJ2NoYW5nZWQgYWZ0ZXIgY2hlY2tlZCcgZXJyb3JzIGluIHNvbWUgY2FzZXMuIFNlZSAjMTIxOTQuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uYW5pbWF0aW9uRG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSwgZGVsYXkoMCwgYXNhcFNjaGVkdWxlciksIHRha2VVbnRpbCh0aGlzLl9wYXJlbnQuaG92ZXJlZCgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vcGVuKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBHZXRzIHRoZSBwb3J0YWwgdGhhdCBzaG91bGQgYmUgYXR0YWNoZWQgdG8gdGhlIG92ZXJsYXkuICovXG4gICAgcHJpdmF0ZSBnZXRQb3J0YWwoKTogVGVtcGxhdGVQb3J0YWwge1xuICAgICAgICAvLyBOb3RlIHRoYXQgd2UgY2FuIGF2b2lkIHRoaXMgY2hlY2sgYnkga2VlcGluZyB0aGUgcG9ydGFsIG9uIHRoZSBkcm9wZG93biBwYW5lbC5cbiAgICAgICAgLy8gV2hpbGUgaXQgd291bGQgYmUgY2xlYW5lciwgd2UnZCBoYXZlIHRvIGludHJvZHVjZSBhbm90aGVyIHJlcXVpcmVkIG1ldGhvZCBvblxuICAgICAgICAvLyBgTWNEcm9wZG93blBhbmVsYCwgbWFraW5nIGl0IGhhcmRlciB0byBjb25zdW1lLlxuICAgICAgICBpZiAoIXRoaXMucG9ydGFsIHx8IHRoaXMucG9ydGFsLnRlbXBsYXRlUmVmICE9PSB0aGlzLmRyb3Bkb3duLnRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLmRyb3Bkb3duLnRlbXBsYXRlUmVmLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbDtcbiAgICB9XG5cbn1cbiJdfQ==
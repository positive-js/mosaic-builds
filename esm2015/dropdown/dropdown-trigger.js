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
        this.openedBy = 'keyboard';
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
        this.dropdown.focusFirstItem(this.openedBy);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9kcm9wZG93bi9kcm9wZG93bi10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQWEsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUdILE9BQU8sRUFDUCxhQUFhLEVBSWhCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLElBQUksRUFDSixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2xELHNGQUFzRjtBQUN0RixNQUFNLENBQUMs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RSxnQkFBZ0I7b0JBQ3hDLGFBQWEsRUFBRSx5QkFBeUI7b0JBQ3hDLFdBQVcsRUFBRSx1QkFBdUI7b0JBQ3BDLFNBQVMsRUFBRSxxQkFBcUI7aUJBQ25DO2dCQUNELFFBQVEsRUFBRSxtQkFBbUI7YUFDaEM7Ozs7WUF0RUcsT0FBTztZQVdQLFVBQVU7WUFTVixnQkFBZ0I7NENBcUhYLE1BQU0sU0FBQywyQkFBMkI7WUEzR2xDLFVBQVUsdUJBNEdWLFFBQVE7WUEvR1IsY0FBYyx1QkFnSGQsUUFBUSxZQUFJLElBQUk7WUEvSUwsY0FBYyx1QkFnSnpCLFFBQVE7WUFqSlIsWUFBWTs7O3VCQXFGaEIsS0FBSyxTQUFDLHNCQUFzQjttQkE0QjVCLEtBQUssU0FBQyx1QkFBdUI7NkJBRzdCLE1BQU07NkJBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5Q29uZmlnLFxuICAgIE92ZXJsYXlSZWYsXG4gICAgVmVydGljYWxDb25uZWN0aW9uUG9zLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2VsZixcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFLCBFTlRFUiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBhc2FwU2NoZWR1bGVyLCBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBmaWx0ZXIsIHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgdGhyb3dNY0Ryb3Bkb3duTWlzc2luZ0Vycm9yIH0gZnJvbSAnLi9kcm9wZG93bi1lcnJvcnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkl0ZW0gfSBmcm9tICcuL2Ryb3Bkb3duLWl0ZW0nO1xuaW1wb3J0IHsgTWNEcm9wZG93blBhbmVsIH0gZnJvbSAnLi9kcm9wZG93bi1wYW5lbCc7XG5pbXBvcnQgeyBEcm9wZG93blBvc2l0aW9uWCwgRHJvcGRvd25Qb3NpdGlvblkgfSBmcm9tICcuL2Ryb3Bkb3duLXBvc2l0aW9ucyc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bi5jb21wb25lbnQnO1xuXG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGRyb3Bkb3duIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1kcm9wZG93bi1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWVxufTtcblxuLyoqIERlZmF1bHQgdG9wIHBhZGRpbmcgb2YgdGhlIG5lc3RlZCBkcm9wZG93biBwYW5lbC4gKi9cbmV4cG9ydCBjb25zdCBORVNURURfUEFORUxfVE9QX1BBRERJTkcgPSAyO1xuXG4vKiogT3B0aW9ucyBmb3IgYmluZGluZyBhIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIuICovXG5jb25zdCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiB0cnVlfSk7XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGFuIG1jLWRyb3Bkb3duIHRhZy4gIEl0IGlzXG4gKiByZXNwb25zaWJsZSBmb3IgdG9nZ2xpbmcgdGhlIGRpc3BsYXkgb2YgdGhlIHByb3ZpZGVkIGRyb3Bkb3duIGluc3RhbmNlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYFttY0Ryb3Bkb3duVHJpZ2dlckZvcl1gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXG4gICAgICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdvcGVuZWQgfHwgbnVsbCcsXG4gICAgICAgICcobW91c2Vkb3duKSc6ICdoYW5kbGVNb3VzZWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2soJGV2ZW50KSdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93blRyaWdnZXInXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25UcmlnZ2VyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBUaGUgdGV4dCBkaXJlY3Rpb24gb2YgdGhlIGNvbnRhaW5pbmcgYXBwLiAqL1xuICAgIGdldCBkaXIoKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpciAmJiB0aGlzLl9kaXIudmFsdWUgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgICB9XG5cblxuICAgIC8qKiBSZWZlcmVuY2VzIHRoZSBkcm9wZG93biBpbnN0YW5jZSB0aGF0IHRoZSB0cmlnZ2VyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgICBASW5wdXQoJ21jRHJvcGRvd25UcmlnZ2VyRm9yJylcbiAgICBnZXQgZHJvcGRvd24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kcm9wZG93bjtcbiAgICB9XG5cbiAgICBzZXQgZHJvcGRvd24oZHJvcGRvd246IE1jRHJvcGRvd25QYW5lbCkge1xuICAgICAgICBpZiAoZHJvcGRvd24gPT09IHRoaXMuX2Ryb3Bkb3duKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX2Ryb3Bkb3duID0gZHJvcGRvd247XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgICAgICBpZiAoZHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSBkcm9wZG93bi5jbG9zZWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIGEgY2xpY2sgY2xvc2VkIHRoZSBkcm9wZG93biwgd2Ugc2hvdWxkIGNsb3NlIHRoZSBlbnRpcmUgY2hhaW4gb2YgbmVzdGVkIGRyb3Bkb3ducy5cbiAgICAgICAgICAgICAgICBpZiAoKHJlYXNvbiA9PT0gJ2NsaWNrJyB8fCByZWFzb24gPT09ICd0YWInKSAmJiB0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50LmNsb3NlZC5lbWl0KHJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUcmFja2luZyBpbnB1dCB0eXBlIGlzIG5lY2Vzc2FyeSBzbyBpdCdzIHBvc3NpYmxlIHRvIG9ubHkgYXV0by1mb2N1c1xuICAgIC8vIHRoZSBmaXJzdCBpdGVtIG9mIHRoZSBsaXN0IHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCB2aWEgdGhlIGtleWJvYXJkXG4gICAgb3BlbmVkQnk6ICdtb3VzZScgfCAndG91Y2gnIHwgJ2tleWJvYXJkJyB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIERhdGEgdG8gYmUgcGFzc2VkIGFsb25nIHRvIGFueSBsYXppbHktcmVuZGVyZWQgY29udGVudC4gKi9cbiAgICBASW5wdXQoJ21jRHJvcGRvd25UcmlnZ2VyRGF0YScpIGRhdGE6IGFueTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFzc29jaWF0ZWQgZHJvcGRvd24gaXMgb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBkcm9wZG93bk9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYXNzb2NpYXRlZCBkcm9wZG93biBpcyBjbG9zZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRyb3Bkb3duQ2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIF9kcm9wZG93bjogTWNEcm9wZG93blBhbmVsO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIG9wZW4uICovXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjbG9zZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgaG92ZXJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIF9zY3JvbGxTdHJhdGVneTogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9wYXJlbnQ6IE1jRHJvcGRvd24sXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHJpdmF0ZSBfZHJvcGRvd25JdGVtSW5zdGFuY2U6IE1jRHJvcGRvd25JdGVtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I/OiBGb2N1c01vbml0b3JcbiAgICApIHtcbiAgICAgICAgX2VsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuICAgICAgICAgICAgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKF9kcm9wZG93bkl0ZW1JbnN0YW5jZSkge1xuICAgICAgICAgICAgX2Ryb3Bkb3duSXRlbUluc3RhbmNlLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24gPSB0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVjaygpO1xuICAgICAgICB0aGlzLmhhbmRsZUhvdmVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG4gICAgICAgICAgICBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNsZWFuVXBTdWJzY3JpcHRpb25zKCk7XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gdHJpZ2dlcnMgYSBuZXN0ZWQgZHJvcGRvd24gb3IgYSB0b3AtbGV2ZWwgb25lLiAqL1xuICAgIHRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhISh0aGlzLl9kcm9wZG93bkl0ZW1JbnN0YW5jZSAmJiB0aGlzLl9wYXJlbnQpO1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBkcm9wZG93biBiZXR3ZWVuIHRoZSBvcGVuIGFuZCBjbG9zZWQgc3RhdGVzLiAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZvaWQtZXhwcmVzc2lvblxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBkcm9wZG93bi4gKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuY2hlY2soKTtcblxuICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBvdmVybGF5UmVmLmdldENvbmZpZygpO1xuXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ob3ZlcmxheUNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk7XG5cbiAgICAgICAgb3ZlcmxheUNvbmZpZy5oYXNCYWNrZHJvcCA9IHRoaXMuZHJvcGRvd24uaGFzQmFja2Ryb3AgPyAhdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkgOlxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5oYXNCYWNrZHJvcDtcblxuICAgICAgICBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLmdldFBvcnRhbCgpKTtcblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5sYXp5Q29udGVudC5hdHRhY2godGhpcy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLmNsb3NpbmdBY3Rpb25zKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duIGluc3RhbmNlb2YgTWNEcm9wZG93bikge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5zdGFydEFuaW1hdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsb3NlcyB0aGUgZHJvcGRvd24uICovXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uY2xvc2VkLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1c2VzIHRoZSBkcm9wZG93biB0cmlnZ2VyLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gU291cmNlIG9mIHRoZSBkcm9wZG93biB0cmlnZ2VyJ3MgZm9jdXMuXG4gICAgICovXG4gICAgZm9jdXMob3JpZ2luOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJykge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBvcmlnaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBtb3VzZSBwcmVzc2VzIG9uIHRoZSB0cmlnZ2VyLiAqL1xuICAgIGhhbmRsZU1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBTaW5jZSByaWdodCBvciBtaWRkbGUgYnV0dG9uIGNsaWNrcyB3b24ndCB0cmlnZ2VyIHRoZSBgY2xpY2tgIGV2ZW50LFxuICAgICAgICAvLyB3ZSBzaG91bGRuJ3QgY29uc2lkZXIgdGhlIGRyb3Bkb3duIGFzIG9wZW5lZCBieSBtb3VzZSBpbiB0aG9zZSBjYXNlcy5cbiAgICAgICAgdGhpcy5vcGVuZWRCeSA9IGV2ZW50LmJ1dHRvbiA9PT0gMCA/ICdtb3VzZScgOiBudWxsO1xuXG4gICAgICAgIC8vIFNpbmNlIGNsaWNraW5nIG9uIHRoZSB0cmlnZ2VyIHdvbid0IGNsb3NlIHRoZSBkcm9wZG93biBpZiBpdCBvcGVucyBhIG5lc3RlZCBkcm9wZG93bixcbiAgICAgICAgLy8gd2Ugc2hvdWxkIHByZXZlbnQgZm9jdXMgZnJvbSBtb3Zpbmcgb250byBpdCB2aWEgY2xpY2sgdG8gYXZvaWQgdGhlXG4gICAgICAgIC8vIGhpZ2hsaWdodCBmcm9tIGxpbmdlcmluZyBvbiB0aGUgZHJvcGRvd24gaXRlbS5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5IHByZXNzZXMgb24gdGhlIHRyaWdnZXIuICovXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleSB8fCBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIHRoaXMub3BlbmVkQnkgPSAna2V5Ym9hcmQnO1xuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBTUEFDRSB8fCBrZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkgJiYgKFxuICAgICAgICAgICAgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XICYmIHRoaXMuZGlyID09PSAnbHRyJykgfHxcbiAgICAgICAgICAgIChrZXlDb2RlID09PSBMRUZUX0FSUk9XICYmIHRoaXMuZGlyID09PSAncnRsJykpKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGNsaWNrIGV2ZW50cyBvbiB0aGUgdHJpZ2dlci4gKi9cbiAgICBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIC8vIFN0b3AgZXZlbnQgcHJvcGFnYXRpb24gdG8gYXZvaWQgY2xvc2luZyB0aGUgcGFyZW50IGRyb3Bkb3duLlxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRvdWNoIHN0YXJ0IGV2ZW50cyBvbiB0aGUgdHJpZ2dlci5cbiAgICAgKiBOZWVkcyB0byBiZSBhbiBhcnJvdyBmdW5jdGlvbiBzbyB3ZSBjYW4gZWFzaWx5IHVzZSBhZGRFdmVudExpc3RlbmVyIGFuZCByZW1vdmVFdmVudExpc3RlbmVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hTdGFydCA9ICgpID0+IHRoaXMub3BlbmVkQnkgPSAndG91Y2gnO1xuXG4gICAgLyoqIENsb3NlcyB0aGUgZHJvcGRvd24gYW5kIGRvZXMgdGhlIG5lY2Vzc2FyeSBjbGVhbnVwLiAqL1xuICAgIHByaXZhdGUgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYgfHwgIXRoaXMub3BlbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcm9wZG93biA9IHRoaXMuZHJvcGRvd247XG5cbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKGRyb3Bkb3duIGluc3RhbmNlb2YgTWNEcm9wZG93bikge1xuICAgICAgICAgICAgZHJvcGRvd24ucmVzZXRBbmltYXRpb24oKTtcblxuICAgICAgICAgICAgaWYgKGRyb3Bkb3duLmxhenlDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gV2FpdCBmb3IgdGhlIGV4aXQgYW5pbWF0aW9uIHRvIGZpbmlzaCBiZWZvcmUgZGV0YWNoaW5nIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLmFuaW1hdGlvbkRvbmVcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKGV2ZW50KSA9PiBldmVudC50b1N0YXRlID09PSAndm9pZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludGVycnVwdCBpZiB0aGUgY29udGVudCBnb3QgcmUtYXR0YWNoZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwoZHJvcGRvd24ubGF6eUNvbnRlbnQuYXR0YWNoZWQpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh7bmV4dDogKCkgPT4gZHJvcGRvd24ubGF6eUNvbnRlbnQuZGV0YWNoKCksIGVycm9yOiB1bmRlZmluZWQsIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBtYXR0ZXIgd2hldGhlciB0aGUgY29udGVudCBnb3QgcmUtYXR0YWNoZWQsIHJlc2V0IHRoZSBkcm9wZG93bi5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duLmxhenlDb250ZW50LmRldGFjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgZHJvcGRvd24gc3RhdGUgdG8gb3BlbiBhbmQgZm9jdXNlcyB0aGUgZmlyc3QgaXRlbSBpZlxuICAgICAqIHRoZSBkcm9wZG93biB3YXMgb3BlbmVkIHZpYSB0aGUga2V5Ym9hcmQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLnBhcmVudCA9IHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpID8gdGhpcy5fcGFyZW50IDogdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmRpcmVjdGlvbiA9IHRoaXMuZGlyO1xuICAgICAgICB0aGlzLnNldElzT3BlbmVkKHRydWUpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmZvY3VzRmlyc3RJdGVtKHRoaXMub3BlbmVkQnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJlc2V0cyB0aGUgZHJvcGRvd24gd2hlbiBpdCdzIGNsb3NlZCwgbW9zdCBpbXBvcnRhbnRseSByZXN0b3JpbmdcbiAgICAgKiBmb2N1cyB0byB0aGUgZHJvcGRvd24gdHJpZ2dlciBpZiB0aGUgZHJvcGRvd24gd2FzIG9wZW5lZCB2aWEgdGhlIGtleWJvYXJkLlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXNPcGVuZWQoZmFsc2UpO1xuXG4gICAgICAgIC8vIFdlIHNob3VsZCByZXNldCBmb2N1cyBpZiB0aGUgdXNlciBpcyBuYXZpZ2F0aW5nIHVzaW5nIGEga2V5Ym9hcmQgb3JcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIHRvcC1sZXZlbCB0cmlnZ2VyIHdoaWNoIG1pZ2h0IGNhdXNlIGZvY3VzIHRvIGJlIGxvc3RcbiAgICAgICAgLy8gd2hlbiBjbGlja2luZyBvbiB0aGUgYmFja2Ryb3AuXG4gICAgICAgIGlmICghdGhpcy5vcGVuZWRCeSkge1xuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IHRoZSBmb2N1cyBzdHlsZSB3aWxsIHNob3cgdXAgYm90aCBmb3IgYHByb2dyYW1gIGFuZFxuICAgICAgICAgICAgLy8gYGtleWJvYXJkYCBzbyB3ZSBkb24ndCBoYXZlIHRvIHNwZWNpZnkgd2hpY2ggb25lIGl0IGlzLlxuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnRyaWdnZXJzTmVzdGVkRHJvcGRvd24oKSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1cyh0aGlzLm9wZW5lZEJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3BlbmVkQnkgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIHNldCBzdGF0ZSByYXRoZXIgdGhhbiB0b2dnbGUgdG8gc3VwcG9ydCB0cmlnZ2VycyBzaGFyaW5nIGEgZHJvcGRvd25cbiAgICBwcml2YXRlIHNldElzT3BlbmVkKGlzT3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9vcGVuZWQgPSBpc09wZW47XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12b2lkLWV4cHJlc3Npb25cbiAgICAgICAgdGhpcy5fb3BlbmVkID8gdGhpcy5kcm9wZG93bk9wZW5lZC5lbWl0KCkgOiB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcblxuICAgICAgICBpZiAodGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2Ryb3Bkb3duSXRlbUluc3RhbmNlLmhpZ2hsaWdodGVkID0gaXNPcGVuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgY2hlY2tzIHRoYXQgYSB2YWxpZCBpbnN0YW5jZSBvZiBNY0Ryb3Bkb3duIGhhcyBiZWVuIHBhc3NlZCBpbnRvXG4gICAgICogbWNEcm9wZG93blRyaWdnZXJGb3IuIElmIG5vdCwgYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRocm93TWNEcm9wZG93bk1pc3NpbmdFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgY3JlYXRlcyB0aGUgb3ZlcmxheSBmcm9tIHRoZSBwcm92aWRlZCBkcm9wZG93bidzIHRlbXBsYXRlIGFuZCBzYXZlcyBpdHNcbiAgICAgKiBPdmVybGF5UmVmIHNvIHRoYXQgaXQgY2FuIGJlIGF0dGFjaGVkIHRvIHRoZSBET00gd2hlbiBvcGVuIGlzIGNhbGxlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldE92ZXJsYXlDb25maWcoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9Qb3NpdGlvbnMoY29uZmlnLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG5cbiAgICAgICAgICAgIC8vIENvbnN1bWUgdGhlIGBrZXlkb3duRXZlbnRzYCBpbiBvcmRlciB0byBwcmV2ZW50IHRoZW0gZnJvbSBnb2luZyB0byBhbm90aGVyIG92ZXJsYXkuXG4gICAgICAgICAgICAvLyBJZGVhbGx5IHdlJ2QgYWxzbyBoYXZlIG91ciBrZXlib2FyZCBldmVudCBsb2dpYyBpbiBoZXJlLCBob3dldmVyIGRvaW5nIHNvIHdpbGxcbiAgICAgICAgICAgIC8vIGJyZWFrIGFueWJvZHkgdGhhdCBtYXkgaGF2ZSBpbXBsZW1lbnRlZCB0aGUgYE1jRHJvcGRvd25QYW5lbGAgdGhlbXNlbHZlcy5cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGJ1aWxkcyB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgb3ZlcmxheSwgdGhlIE92ZXJsYXlTdGF0ZS5cbiAgICAgKiBAcmV0dXJucyBPdmVybGF5Q29uZmlnXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xuICAgICAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZWxlbWVudClcbiAgICAgICAgICAgICAgICAud2l0aExvY2tlZFBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcubWMtZHJvcGRvd25fX3BhbmVsJyksXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmRyb3Bkb3duLmJhY2tkcm9wQ2xhc3MgfHwgJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVucyB0byBjaGFuZ2VzIGluIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBhbmQgc2V0cyB0aGUgY29ycmVjdCBjbGFzc2VzXG4gICAgICogb24gdGhlIGRyb3Bkb3duIGJhc2VkIG9uIHRoZSBuZXcgcG9zaXRpb24uIFRoaXMgZW5zdXJlcyB0aGUgYW5pbWF0aW9uIG9yaWdpbiBpcyBhbHdheXNcbiAgICAgKiBjb3JyZWN0LCBldmVuIGlmIGEgZmFsbGJhY2sgcG9zaXRpb24gaXMgdXNlZCBmb3IgdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Bvc2l0aW9ucyhwb3NpdGlvbjogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duLnNldFBvc2l0aW9uQ2xhc3Nlcykge1xuICAgICAgICAgICAgcG9zaXRpb24ucG9zaXRpb25DaGFuZ2VzLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zWDogRHJvcGRvd25Qb3NpdGlvblggPSBjaGFuZ2UuY29ubmVjdGlvblBhaXIub3ZlcmxheVggPT09ICdzdGFydCcgPyAnYWZ0ZXInIDogJ2JlZm9yZSc7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zWTogRHJvcGRvd25Qb3NpdGlvblkgPSBjaGFuZ2UuY29ubmVjdGlvblBhaXIub3ZlcmxheVkgPT09ICd0b3AnID8gJ2JlbG93JyA6ICdhYm92ZSc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnNldFBvc2l0aW9uQ2xhc3NlcyEocG9zWCwgcG9zWSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFwcHJvcHJpYXRlIHBvc2l0aW9ucyBvbiBhIHBvc2l0aW9uIHN0cmF0ZWd5XG4gICAgICogc28gdGhlIG92ZXJsYXkgY29ubmVjdHMgd2l0aCB0aGUgdHJpZ2dlciBjb3JyZWN0bHkuXG4gICAgICogQHBhcmFtIHBvc2l0aW9uU3RyYXRlZ3kgU3RyYXRlZ3kgd2hvc2UgcG9zaXRpb24gdG8gdXBkYXRlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0UG9zaXRpb24ocG9zaXRpb25TdHJhdGVneTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KSB7XG4gICAgICAgIGxldCBbb3JpZ2luWCwgb3JpZ2luRmFsbGJhY2tYLCBvdmVybGF5WCwgb3ZlcmxheUZhbGxiYWNrWF06IEhvcml6b250YWxDb25uZWN0aW9uUG9zW10gPVxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi54UG9zaXRpb24gPT09ICdiZWZvcmUnID9cbiAgICAgICAgICAgICAgICBbJ2VuZCcsICdzdGFydCcsICdlbmQnLCAnc3RhcnQnXSA6XG4gICAgICAgICAgICAgICAgWydzdGFydCcsICdlbmQnLCAnc3RhcnQnLCAnZW5kJ107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgICAgICBsZXQgW292ZXJsYXlZLCBvdmVybGF5RmFsbGJhY2tZLCBvcmlnaW5ZLCBvcmlnaW5GYWxsYmFja1ldOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3NbXSA9XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnlQb3NpdGlvbiA9PT0gJ2Fib3ZlJyA/XG4gICAgICAgICAgICAgICAgWydib3R0b20nLCAndG9wJywgJ2JvdHRvbScsICd0b3AnXSA6XG4gICAgICAgICAgICAgICAgWyd0b3AnLCAnYm90dG9tJywgJ3RvcCcsICdib3R0b20nXTtcblxuICAgICAgICBsZXQgb2Zmc2V0WSA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnNOZXN0ZWREcm9wZG93bigpKSB7XG4gICAgICAgICAgICAvLyBXaGVuIHRoZSBkcm9wZG93biBpcyBuZXN0ZWQsIGl0IHNob3VsZCBhbHdheXMgYWxpZ24gaXRzZWxmXG4gICAgICAgICAgICAvLyB0byB0aGUgZWRnZXMgb2YgdGhlIHRyaWdnZXIsIGluc3RlYWQgb2Ygb3ZlcmxhcHBpbmcgaXQuXG4gICAgICAgICAgICBvdmVybGF5RmFsbGJhY2tYID0gb3JpZ2luWCA9IHRoaXMuZHJvcGRvd24ueFBvc2l0aW9uID09PSAnYmVmb3JlJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgIG9yaWdpbkZhbGxiYWNrWCA9IG92ZXJsYXlYID0gb3JpZ2luWCA9PT0gJ2VuZCcgPyAnc3RhcnQnIDogJ2VuZCc7XG4gICAgICAgICAgICBvZmZzZXRZID0gb3ZlcmxheVkgPT09ICdib3R0b20nID8gTkVTVEVEX1BBTkVMX1RPUF9QQURESU5HIDogLU5FU1RFRF9QQU5FTF9UT1BfUEFERElORztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wZG93bi5vdmVybGFwVHJpZ2dlclkpIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5ZID0gb3ZlcmxheVkgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgICAgICAgICAgICBvcmlnaW5GYWxsYmFja1kgPSBvdmVybGF5RmFsbGJhY2tZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5kcm9wZG93bi5vdmVybGFwVHJpZ2dlclgpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5RmFsbGJhY2tYID0gb3JpZ2luWCA9IHRoaXMuZHJvcGRvd24ueFBvc2l0aW9uID09PSAnYmVmb3JlJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgICAgICBvcmlnaW5GYWxsYmFja1ggPSBvdmVybGF5WCA9IG9yaWdpblggPT09ICdlbmQnID8gJ3N0YXJ0JyA6ICdlbmQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcG9zaXRpb25TdHJhdGVneS53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICAgIHsgb3JpZ2luWCwgb3JpZ2luWSwgb3ZlcmxheVgsIG92ZXJsYXlZLCBvZmZzZXRZIH0sXG4gICAgICAgICAgICB7IG9yaWdpblg6IG9yaWdpbkZhbGxiYWNrWCwgb3JpZ2luWSwgb3ZlcmxheVg6IG92ZXJsYXlGYWxsYmFja1gsIG92ZXJsYXlZLCBvZmZzZXRZIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWCxcbiAgICAgICAgICAgICAgICBvcmlnaW5ZOiBvcmlnaW5GYWxsYmFja1ksXG4gICAgICAgICAgICAgICAgb3ZlcmxheVgsXG4gICAgICAgICAgICAgICAgb3ZlcmxheVk6IG92ZXJsYXlGYWxsYmFja1ksXG4gICAgICAgICAgICAgICAgb2Zmc2V0WTogLW9mZnNldFlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6IG9yaWdpbkZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiAtb2Zmc2V0WVxuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKiogQ2xlYW5zIHVwIHRoZSBhY3RpdmUgc3Vic2NyaXB0aW9ucy4gKi9cbiAgICBwcml2YXRlIGNsZWFuVXBTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuaG92ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIGFuIGFjdGlvbiB0aGF0IHNob3VsZCBjbG9zZSB0aGUgZHJvcGRvd24gb2NjdXJzLiAqL1xuICAgIHByaXZhdGUgY2xvc2luZ0FjdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IGJhY2tkcm9wID0gdGhpcy5vdmVybGF5UmVmIS5iYWNrZHJvcENsaWNrKCk7XG4gICAgICAgIGNvbnN0IG91dHNpZGVQb2ludGVyRXZlbnRzID0gdGhpcy5vdmVybGF5UmVmIS5vdXRzaWRlUG9pbnRlckV2ZW50cygpO1xuICAgICAgICBjb25zdCBkZXRhY2htZW50cyA9IHRoaXMub3ZlcmxheVJlZiEuZGV0YWNobWVudHMoKTtcbiAgICAgICAgY29uc3QgcGFyZW50Q2xvc2UgPSB0aGlzLl9wYXJlbnQgPyB0aGlzLl9wYXJlbnQuY2xvc2VkIDogb2JzZXJ2YWJsZU9mKCk7XG4gICAgICAgIGNvbnN0IGhvdmVyID0gdGhpcy5fcGFyZW50ID8gdGhpcy5fcGFyZW50LmhvdmVyZWQoKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKChhY3RpdmUpID0+IGFjdGl2ZSAhPT0gdGhpcy5fZHJvcGRvd25JdGVtSW5zdGFuY2UpLFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuX29wZW5lZClcbiAgICAgICAgKSA6IG9ic2VydmFibGVPZigpO1xuXG4gICAgICAgIHJldHVybiBtZXJnZShiYWNrZHJvcCwgb3V0c2lkZVBvaW50ZXJFdmVudHMsIHBhcmVudENsb3NlLCBob3ZlciwgZGV0YWNobWVudHMpO1xuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIHRoZSBjYXNlcyB3aGVyZSB0aGUgdXNlciBob3ZlcnMgb3ZlciB0aGUgdHJpZ2dlci4gKi9cbiAgICBwcml2YXRlIGhhbmRsZUhvdmVyKCkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgaG92ZXJlZCBpdGVtIGluIG9yZGVyIHRvIHRvZ2dsZSB0aGUgcGFuZWwuXG4gICAgICAgIGlmICghdGhpcy50cmlnZ2Vyc05lc3RlZERyb3Bkb3duKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaG92ZXJTdWJzY3JpcHRpb24gPSB0aGlzLl9wYXJlbnQuaG92ZXJlZCgpXG4gICAgICAgIC8vIFNpbmNlIHdlIG1pZ2h0IGhhdmUgbXVsdGlwbGUgY29tcGV0aW5nIHRyaWdnZXJzIGZvciB0aGUgc2FtZSBkcm9wZG93biAoZS5nLiBhIG5lc3RlZCBkcm9wZG93blxuICAgICAgICAvLyB3aXRoIGRpZmZlcmVudCBkYXRhIGFuZCB0cmlnZ2VycyksIHdlIGhhdmUgdG8gZGVsYXkgaXQgYnkgYSB0aWNrIHRvIGVuc3VyZSB0aGF0XG4gICAgICAgIC8vIGl0IHdvbid0IGJlIGNsb3NlZCBpbW1lZGlhdGVseSBhZnRlciBpdCBpcyBvcGVuZWQuXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKGFjdGl2ZSkgPT4gYWN0aXZlID09PSB0aGlzLl9kcm9wZG93bkl0ZW1JbnN0YW5jZSAmJiAhYWN0aXZlLmRpc2FibGVkKSxcbiAgICAgICAgICAgICAgICBkZWxheSgwLCBhc2FwU2NoZWR1bGVyKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRCeSA9ICdtb3VzZSc7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2FtZSBkcm9wZG93biBpcyB1c2VkIGJldHdlZW4gbXVsdGlwbGUgdHJpZ2dlcnMsIGl0IG1pZ2h0IHN0aWxsIGJlIGFuaW1hdGluZ1xuICAgICAgICAgICAgICAgIC8vIHdoaWxlIHRoZSBuZXcgdHJpZ2dlciB0cmllcyB0byByZS1vcGVuIGl0LiBXYWl0IGZvciB0aGUgYW5pbWF0aW9uIHRvIGZpbmlzaFxuICAgICAgICAgICAgICAgIC8vIGJlZm9yZSBkb2luZyBzby4gQWxzbyBpbnRlcnJ1cHQgaWYgdGhlIHVzZXIgbW92ZXMgdG8gYW5vdGhlciBpdGVtLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb3Bkb3duIGluc3RhbmNlb2YgTWNEcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLmlzQW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdGhlIGBkZWxheSgwKWAgaGVyZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgICAgICAgICAgICAvLyAnY2hhbmdlZCBhZnRlciBjaGVja2VkJyBlcnJvcnMgaW4gc29tZSBjYXNlcy4gU2VlICMxMjE5NC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5hbmltYXRpb25Eb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpLCBkZWxheSgwLCBhc2FwU2NoZWR1bGVyKSwgdGFrZVVudGlsKHRoaXMuX3BhcmVudC5ob3ZlcmVkKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9wZW4oKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEdldHMgdGhlIHBvcnRhbCB0aGF0IHNob3VsZCBiZSBhdHRhY2hlZCB0byB0aGUgb3ZlcmxheS4gKi9cbiAgICBwcml2YXRlIGdldFBvcnRhbCgpOiBUZW1wbGF0ZVBvcnRhbCB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4gYXZvaWQgdGhpcyBjaGVjayBieSBrZWVwaW5nIHRoZSBwb3J0YWwgb24gdGhlIGRyb3Bkb3duIHBhbmVsLlxuICAgICAgICAvLyBXaGlsZSBpdCB3b3VsZCBiZSBjbGVhbmVyLCB3ZSdkIGhhdmUgdG8gaW50cm9kdWNlIGFub3RoZXIgcmVxdWlyZWQgbWV0aG9kIG9uXG4gICAgICAgIC8vIGBNY0Ryb3Bkb3duUGFuZWxgLCBtYWtpbmcgaXQgaGFyZGVyIHRvIGNvbnN1bWUuXG4gICAgICAgIGlmICghdGhpcy5wb3J0YWwgfHwgdGhpcy5wb3J0YWwudGVtcGxhdGVSZWYgIT09IHRoaXMuZHJvcGRvd24udGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuZHJvcGRvd24udGVtcGxhdGVSZWYsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9ydGFsO1xuICAgIH1cblxufVxuIl19
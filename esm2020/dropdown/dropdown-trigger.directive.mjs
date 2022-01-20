import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, Optional, Output, Self, ViewContainerRef } from '@angular/core';
import { LEFT_ARROW, RIGHT_ARROW, SPACE, ENTER, DOWN_ARROW } from '@ptsecurity/cdk/keycodes';
import { asapScheduler, merge, of as observableOf, Subscription } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { throwMcDropdownMissingError } from './dropdown-errors';
import { McDropdownItem } from './dropdown-item.component';
import { McDropdown } from './dropdown.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./dropdown.component";
import * as i3 from "./dropdown-item.component";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@angular/cdk/a11y";
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
export const NESTED_PANEL_TOP_PADDING = 4;
export const NESTED_PANEL_LEFT_PADDING = 8;
/** Options for binding a passive event listener. */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
export class McDropdownTrigger {
    constructor(overlay, elementRef, viewContainerRef, scrollStrategy, parent, dropdownItemInstance, _dir, focusMonitor) {
        this.overlay = overlay;
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.scrollStrategy = scrollStrategy;
        this.parent = parent;
        this.dropdownItemInstance = dropdownItemInstance;
        this._dir = _dir;
        this.focusMonitor = focusMonitor;
        this.openByArrowDown = true;
        /**
         * Whether focus should be restored when the menu is closed.
         * Note that disabling this option can have accessibility implications
         * and it's up to you to manage focus, if you decide to turn it off.
         */
        this.restoreFocus = true;
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
        elementRef.nativeElement.addEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
        if (dropdownItemInstance) {
            dropdownItemInstance.isNested = this.isNested();
        }
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
            this.closeSubscription = dropdown.closed
                .asObservable()
                .subscribe((reason) => {
                this.destroy(reason);
                // If a click closed the dropdown, we should close the entire chain of nested dropdowns.
                if (['click', 'tab'].includes(reason) && this.parent) {
                    this.parent.closed.emit(reason);
                }
            });
        }
    }
    /** The text direction of the containing app. */
    get dir() {
        return this._dir?.value === 'rtl' ? 'rtl' : 'ltr';
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
        this.elementRef.nativeElement.removeEventListener('touchstart', this.handleTouchStart, passiveEventListenerOptions);
        this.cleanUpSubscriptions();
    }
    /** Whether the dropdown triggers a nested dropdown or a top-level one. */
    isNested() {
        return !!(this.dropdownItemInstance && this.parent);
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
        overlayConfig.hasBackdrop = this.dropdown.hasBackdrop ? !this.isNested() : this.dropdown.hasBackdrop;
        overlayRef.attach(this.getPortal());
        if (this.dropdown.lazyContent) {
            this.dropdown.lazyContent.detach();
            this.dropdown.lazyContent.attach(this.data);
        }
        this.closeSubscription = this.closingActions()
            .subscribe(() => this.close());
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
     */
    focus(origin, options) {
        if (this.focusMonitor && origin) {
            this.focusMonitor.focusVia(this.elementRef.nativeElement, origin, options);
        }
        else {
            this.elementRef.nativeElement.focus();
        }
    }
    /** Handles mouse presses on the trigger. */
    handleMousedown(event) {
        // Since right or middle button clicks won't trigger the `click` event,
        // we shouldn't consider the dropdown as opened by mouse in those cases.
        this.openedBy = event.button === 0 ? 'mouse' : undefined;
        // Since clicking on the trigger won't close the dropdown if it opens a nested dropdown,
        // we should prevent focus from moving onto it via click to avoid the
        // highlight from lingering on the dropdown item.
        if (this.isNested()) {
            event.preventDefault();
        }
    }
    /** Handles key presses on the trigger. */
    handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        const keyCode = event.keyCode;
        if (keyCode === ENTER || keyCode === SPACE) {
            this.openedBy = 'keyboard';
            event.preventDefault();
            if (this.isNested()) {
                // Stop event propagation to avoid closing the parent dropdown.
                event.stopPropagation();
                this.open();
            }
            else {
                this.toggle();
            }
        }
        if ((this.isNested() &&
            ((keyCode === RIGHT_ARROW && this.dir === 'ltr') || (keyCode === LEFT_ARROW && this.dir === 'rtl'))) ||
            (!this.isNested() && (keyCode === DOWN_ARROW && this.openByArrowDown))) {
            event.preventDefault();
            this.openedBy = 'keyboard';
            this.open();
        }
    }
    /** Handles click events on the trigger. */
    handleClick(event) {
        if (this.isNested()) {
            // Stop event propagation to avoid closing the parent dropdown.
            event.stopPropagation();
            this.open();
        }
        else {
            this.toggle();
        }
    }
    /** Closes the dropdown and does the necessary cleanup. */
    destroy(reason) {
        if (!this.overlayRef || !this.opened) {
            return;
        }
        this.lastDestroyReason = reason;
        this.dropdown.resetActiveItem();
        this.closeSubscription.unsubscribe();
        this.overlayRef.detach();
        if (this.restoreFocus && (reason === 'keydown' || !this.openedBy || !this.isNested())) {
            this.focus(this.openedBy);
        }
        this.openedBy = undefined;
        if (this.dropdown instanceof McDropdown) {
            this.dropdown.resetAnimation();
            const animationSubscription = this.dropdown.animationDone
                .pipe(filter((event) => event.toState === 'void'), take(1));
            if (this.dropdown.lazyContent) {
                // Wait for the exit animation to finish before detaching the content.
                animationSubscription
                    .pipe(
                // Interrupt if the content got re-attached.
                takeUntil(this.dropdown.lazyContent.attached))
                    .subscribe({
                    next: () => this.dropdown.lazyContent.detach(),
                    // No matter whether the content got re-attached, reset the this.dropdown.
                    complete: () => this.setIsOpened(false)
                });
            }
            else {
                animationSubscription
                    .subscribe(() => this.setIsOpened(false));
            }
        }
        else {
            this.setIsOpened(false);
            if (this.dropdown.lazyContent) {
                this.dropdown.lazyContent.detach();
            }
        }
    }
    /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     */
    init() {
        this.dropdown.parent = this.isNested() ? this.parent : undefined;
        this.dropdown.direction = this.dir;
        if (!this.dropdown.parent) {
            this.dropdown.triggerWidth = this.getWidth();
        }
        this.dropdown.focusFirstItem(this.openedBy || 'program');
        this.setIsOpened(true);
    }
    // set state rather than toggle to support triggers sharing a dropdown
    setIsOpened(isOpen) {
        this._opened = isOpen;
        // tslint:disable-next-line:no-void-expression
        this._opened ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
        if (this.isNested()) {
            this.dropdownItemInstance.highlighted = isOpen;
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
            this.overlayRef = this.overlay.create(config);
            // Consume the `keydownEvents` in order to prevent them from going to another overlay.
            // Ideally we'd also have our keyboard event logic in here, however doing so will
            // break anybody that may have implemented the `McDropdownPanel` themselves.
            this.overlayRef.keydownEvents()
                .subscribe();
        }
        return this.overlayRef;
    }
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this.overlay.position()
                .flexibleConnectedTo(this.elementRef)
                .withLockedPosition()
                .withTransformOriginOn('.mc-dropdown__panel'),
            backdropClass: this.dropdown.backdropClass || 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this.scrollStrategy(),
            direction: this.dir
        });
    }
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the dropdown based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    subscribeToPositions(position) {
        if (this.dropdown.setPositionClasses) {
            position.positionChanges
                .subscribe((change) => {
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
        let offsetX = 0;
        if (this.isNested()) {
            // When the dropdown is nested, it should always align itself
            // to the edges of the trigger, instead of overlapping it.
            overlayFallbackX = originX = this.dropdown.xPosition === 'before' ? 'start' : 'end';
            originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
            offsetY = overlayY === 'bottom' ? NESTED_PANEL_TOP_PADDING : -NESTED_PANEL_TOP_PADDING;
            offsetX = NESTED_PANEL_LEFT_PADDING;
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
            { originX, originY, overlayX, overlayY, offsetY, offsetX: -offsetX },
            { originX: originFallbackX, originY, overlayX: overlayFallbackX, overlayY, offsetY, offsetX },
            {
                originX,
                originY: originFallbackY,
                overlayX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY,
                offsetX: -offsetX
            },
            {
                originX: originFallbackX,
                originY: originFallbackY,
                overlayX: overlayFallbackX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY,
                offsetX: -offsetX
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
        const parentClose = this.parent ? this.parent.closed : observableOf();
        const hover = this.parent ? this.parent.hovered()
            .pipe(filter((active) => active !== this.dropdownItemInstance), filter(() => this._opened)) : observableOf();
        return merge(backdrop, outsidePointerEvents, parentClose, hover, detachments);
    }
    /** Handles the cases where the user hovers over the trigger. */
    handleHover() {
        // Subscribe to changes in the hovered item in order to toggle the panel.
        if (!this.isNested()) {
            return;
        }
        this.hoverSubscription = this.parent.hovered()
            // Since we might have multiple competing triggers for the same dropdown (e.g. a nested dropdown
            // with different data and triggers), we have to delay it by a tick to ensure that
            // it won't be closed immediately after it is opened.
            .pipe(filter((active) => active === this.dropdownItemInstance && !active.disabled), delay(0, asapScheduler))
            .subscribe(() => {
            this.openedBy = 'mouse';
            // If the same dropdown is used between multiple triggers, it might still be animating
            // while the new trigger tries to re-open it. Wait for the animation to finish
            // before doing so. Also interrupt if the user moves to another item.
            if (this.dropdown instanceof McDropdown && this.dropdown.isAnimating) {
                // We need the `delay(0)` here in order to avoid
                // 'changed after checked' errors in some cases. See #12194.
                this.dropdown.animationDone
                    .pipe(take(1), delay(0, asapScheduler), takeUntil(this.parent.hovered()))
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
            this.portal = new TemplatePortal(this.dropdown.templateRef, this.viewContainerRef);
        }
        return this.portal;
    }
    getWidth() {
        const nativeElement = this.elementRef.nativeElement;
        const { width, borderRightWidth, borderLeftWidth } = window.getComputedStyle(nativeElement);
        return `${parseInt(width) - parseInt(borderRightWidth) - parseInt(borderLeftWidth)}px`;
    }
}
/** @nocollapse */ /** @nocollapse */ McDropdownTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McDropdownTrigger, deps: [{ token: i1.Overlay }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: MC_DROPDOWN_SCROLL_STRATEGY }, { token: i2.McDropdown, optional: true }, { token: i3.McDropdownItem, optional: true, self: true }, { token: i4.Directionality, optional: true }, { token: i5.FocusMonitor }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McDropdownTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McDropdownTrigger, selector: "[mcDropdownTriggerFor]", inputs: { data: ["mcDropdownTriggerData", "data"], openByArrowDown: "openByArrowDown", restoreFocus: ["mcDropdownTriggerRestoreFocus", "restoreFocus"], dropdown: ["mcDropdownTriggerFor", "dropdown"] }, outputs: { dropdownOpened: "dropdownOpened", dropdownClosed: "dropdownClosed" }, host: { listeners: { "mousedown": "handleMousedown($event)", "keydown": "handleKeydown($event)", "click": "handleClick($event)" }, properties: { "class.mc-pressed": "opened" }, classAttribute: "mc-dropdown-trigger" }, exportAs: ["mcDropdownTrigger"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McDropdownTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: `[mcDropdownTriggerFor]`,
                    exportAs: 'mcDropdownTrigger',
                    host: {
                        class: 'mc-dropdown-trigger',
                        '[class.mc-pressed]': 'opened',
                        '(mousedown)': 'handleMousedown($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(click)': 'handleClick($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DROPDOWN_SCROLL_STRATEGY]
                }] }, { type: i2.McDropdown, decorators: [{
                    type: Optional
                }] }, { type: i3.McDropdownItem, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i5.FocusMonitor }]; }, propDecorators: { data: [{
                type: Input,
                args: ['mcDropdownTriggerData']
            }], openByArrowDown: [{
                type: Input
            }], restoreFocus: [{
                type: Input,
                args: ['mcDropdownTriggerRestoreFocus']
            }], dropdown: [{
                type: Input,
                args: ['mcDropdownTriggerFor']
            }], dropdownOpened: [{
                type: Output
            }], dropdownClosed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdHJpZ2dlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vZHJvcGRvd24tdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBYSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBR0gsT0FBTyxFQUNQLGFBQWEsRUFJaEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sSUFBSSxFQUNKLGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFD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USxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7SUFDM0YsQ0FBQzs7b0pBeGdCUSxpQkFBaUIsbUdBNkVkLDJCQUEyQjt3SUE3RTlCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQVg3QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUscUJBQXFCO3dCQUM1QixvQkFBb0IsRUFBRSxRQUFRO3dCQUM5QixhQUFhLEVBQUUseUJBQXlCO3dCQUN4QyxXQUFXLEVBQUUsdUJBQXVCO3dCQUNwQyxTQUFTLEVBQUUscUJBQXFCO3FCQUNuQztpQkFDSjs7MEJBOEVRLE1BQU07MkJBQUMsMkJBQTJCOzswQkFDbEMsUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQUksSUFBSTs7MEJBQ2hCLFFBQVE7dUVBNUVtQixJQUFJO3NCQUFuQyxLQUFLO3VCQUFDLHVCQUF1QjtnQkFFckIsZUFBZTtzQkFBdkIsS0FBSztnQkFPa0MsWUFBWTtzQkFBbkQsS0FBSzt1QkFBQywrQkFBK0I7Z0JBSWxDLFFBQVE7c0JBRFgsS0FBSzt1QkFBQyxzQkFBc0I7Z0JBNEJWLGNBQWM7c0JBQWhDLE1BQU07Z0JBR1ksY0FBYztzQkFBaEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5Q29uZmlnLFxuICAgIE92ZXJsYXlSZWYsXG4gICAgVmVydGljYWxDb25uZWN0aW9uUG9zLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2VsZixcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFLCBFTlRFUiwgRE9XTl9BUlJPVyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBhc2FwU2NoZWR1bGVyLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBmaWx0ZXIsIHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgdGhyb3dNY0Ryb3Bkb3duTWlzc2luZ0Vycm9yIH0gZnJvbSAnLi9kcm9wZG93bi1lcnJvcnMnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkl0ZW0gfSBmcm9tICcuL2Ryb3Bkb3duLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE1jRHJvcGRvd24gfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcm9wZG93bkNsb3NlUmVhc29uLCBEcm9wZG93blBvc2l0aW9uWCwgRHJvcGRvd25Qb3NpdGlvblksIE1jRHJvcGRvd25QYW5lbCB9IGZyb20gJy4vZHJvcGRvd24udHlwZXMnO1xuXG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGRyb3Bkb3duIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1kcm9wZG93bi1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWVxufTtcblxuLyoqIERlZmF1bHQgdG9wIHBhZGRpbmcgb2YgdGhlIG5lc3RlZCBkcm9wZG93biBwYW5lbC4gKi9cbmV4cG9ydCBjb25zdCBORVNURURfUEFORUxfVE9QX1BBRERJTkcgPSA0O1xuZXhwb3J0IGNvbnN0IE5FU1RFRF9QQU5FTF9MRUZUX1BBRERJTkcgPSA4O1xuXG4vKiogT3B0aW9ucyBmb3IgYmluZGluZyBhIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIuICovXG5jb25zdCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiB0cnVlfSk7XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGFuIG1jLWRyb3Bkb3duIHRhZy4gIEl0IGlzXG4gKiByZXNwb25zaWJsZSBmb3IgdG9nZ2xpbmcgdGhlIGRpc3BsYXkgb2YgdGhlIHByb3ZpZGVkIGRyb3Bkb3duIGluc3RhbmNlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYFttY0Ryb3Bkb3duVHJpZ2dlckZvcl1gLFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93blRyaWdnZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1kcm9wZG93bi10cmlnZ2VyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1wcmVzc2VkXSc6ICdvcGVuZWQnLFxuICAgICAgICAnKG1vdXNlZG93biknOiAnaGFuZGxlTW91c2Vkb3duKCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duVHJpZ2dlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgbGFzdERlc3Ryb3lSZWFzb246IERyb3Bkb3duQ2xvc2VSZWFzb247XG5cbiAgICAvKiogRGF0YSB0byBiZSBwYXNzZWQgYWxvbmcgdG8gYW55IGxhemlseS1yZW5kZXJlZCBjb250ZW50LiAqL1xuICAgIEBJbnB1dCgnbWNEcm9wZG93blRyaWdnZXJEYXRhJykgZGF0YTogYW55O1xuXG4gICAgQElucHV0KCkgb3BlbkJ5QXJyb3dEb3duOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZm9jdXMgc2hvdWxkIGJlIHJlc3RvcmVkIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkLlxuICAgICAqIE5vdGUgdGhhdCBkaXNhYmxpbmcgdGhpcyBvcHRpb24gY2FuIGhhdmUgYWNjZXNzaWJpbGl0eSBpbXBsaWNhdGlvbnNcbiAgICAgKiBhbmQgaXQncyB1cCB0byB5b3UgdG8gbWFuYWdlIGZvY3VzLCBpZiB5b3UgZGVjaWRlIHRvIHR1cm4gaXQgb2ZmLlxuICAgICAqL1xuICAgIEBJbnB1dCgnbWNEcm9wZG93blRyaWdnZXJSZXN0b3JlRm9jdXMnKSByZXN0b3JlRm9jdXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFJlZmVyZW5jZXMgdGhlIGRyb3Bkb3duIGluc3RhbmNlIHRoYXQgdGhlIHRyaWdnZXIgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICAgIEBJbnB1dCgnbWNEcm9wZG93blRyaWdnZXJGb3InKVxuICAgIGdldCBkcm9wZG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Ryb3Bkb3duO1xuICAgIH1cblxuICAgIHNldCBkcm9wZG93bihkcm9wZG93bjogTWNEcm9wZG93blBhbmVsKSB7XG4gICAgICAgIGlmIChkcm9wZG93biA9PT0gdGhpcy5fZHJvcGRvd24pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fZHJvcGRvd24gPSBkcm9wZG93bjtcbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIGlmIChkcm9wZG93bikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbiA9IGRyb3Bkb3duLmNsb3NlZFxuICAgICAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3kocmVhc29uKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhIGNsaWNrIGNsb3NlZCB0aGUgZHJvcGRvd24sIHdlIHNob3VsZCBjbG9zZSB0aGUgZW50aXJlIGNoYWluIG9mIG5lc3RlZCBkcm9wZG93bnMuXG4gICAgICAgICAgICAgICAgICAgIGlmIChbJ2NsaWNrJywgJ3RhYiddLmluY2x1ZGVzKHJlYXNvbiBhcyBzdHJpbmcpICYmIHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jbG9zZWQuZW1pdChyZWFzb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kcm9wZG93bjogTWNEcm9wZG93blBhbmVsO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYXNzb2NpYXRlZCBkcm9wZG93biBpcyBvcGVuZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGRyb3Bkb3duT3BlbmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhc3NvY2lhdGVkIGRyb3Bkb3duIGlzIGNsb3NlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgZHJvcGRvd25DbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8vIFRyYWNraW5nIGlucHV0IHR5cGUgaXMgbmVjZXNzYXJ5IHNvIGl0J3MgcG9zc2libGUgdG8gb25seSBhdXRvLWZvY3VzXG4gICAgLy8gdGhlIGZpcnN0IGl0ZW0gb2YgdGhlIGxpc3Qgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkIHZpYSB0aGUga2V5Ym9hcmRcbiAgICBvcGVuZWRCeTogRXhjbHVkZTxGb2N1c09yaWdpbiwgJ3Byb2dyYW0nIHwgbnVsbD4gfCB1bmRlZmluZWQ7XG5cbiAgICAvKiogVGhlIHRleHQgZGlyZWN0aW9uIG9mIHRoZSBjb250YWluaW5nIGFwcC4gKi9cbiAgICBnZXQgZGlyKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXI/LnZhbHVlID09PSAncnRsJyA/ICdydGwnIDogJ2x0cic7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIG9wZW4uICovXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcblxuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjbG9zZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgaG92ZXJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcGFyZW50OiBNY0Ryb3Bkb3duLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHByaXZhdGUgZHJvcGRvd25JdGVtSW5zdGFuY2U6IE1jRHJvcGRvd25JdGVtLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcj86IEZvY3VzTW9uaXRvclxuICAgICkge1xuICAgICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcbiAgICAgICAgICAgIHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIGlmIChkcm9wZG93bkl0ZW1JbnN0YW5jZSkge1xuICAgICAgICAgICAgZHJvcGRvd25JdGVtSW5zdGFuY2UuaXNOZXN0ZWQgPSB0aGlzLmlzTmVzdGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2soKTtcbiAgICAgICAgdGhpcy5oYW5kbGVIb3ZlcigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG4gICAgICAgICAgICBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNsZWFuVXBTdWJzY3JpcHRpb25zKCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIHRyaWdnZXJzIGEgbmVzdGVkIGRyb3Bkb3duIG9yIGEgdG9wLWxldmVsIG9uZS4gKi9cbiAgICBpc05lc3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuZHJvcGRvd25JdGVtSW5zdGFuY2UgJiYgdGhpcy5wYXJlbnQpO1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBkcm9wZG93biBiZXR3ZWVuIHRoZSBvcGVuIGFuZCBjbG9zZWQgc3RhdGVzLiAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZvaWQtZXhwcmVzc2lvblxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBkcm9wZG93bi4gKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuY2hlY2soKTtcblxuICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBvdmVybGF5UmVmLmdldENvbmZpZygpO1xuXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ob3ZlcmxheUNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk7XG5cbiAgICAgICAgb3ZlcmxheUNvbmZpZy5oYXNCYWNrZHJvcCA9IHRoaXMuZHJvcGRvd24uaGFzQmFja2Ryb3AgPyAhdGhpcy5pc05lc3RlZCgpIDogdGhpcy5kcm9wZG93bi5oYXNCYWNrZHJvcDtcblxuICAgICAgICBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLmdldFBvcnRhbCgpKTtcblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5sYXp5Q29udGVudC5kZXRhY2goKTtcblxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5sYXp5Q29udGVudC5hdHRhY2godGhpcy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLmNsb3NpbmdBY3Rpb25zKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcblxuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93biBpbnN0YW5jZW9mIE1jRHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24uc3RhcnRBbmltYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIGRyb3Bkb3duLiAqL1xuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlZC5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXNlcyB0aGUgZHJvcGRvd24gdHJpZ2dlci5cbiAgICAgKi9cbiAgICBmb2N1cyhvcmlnaW4/OiBGb2N1c09yaWdpbiwgb3B0aW9ucz86IEZvY3VzT3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5mb2N1c01vbml0b3IgJiYgb3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgb3JpZ2luLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogSGFuZGxlcyBtb3VzZSBwcmVzc2VzIG9uIHRoZSB0cmlnZ2VyLiAqL1xuICAgIGhhbmRsZU1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBTaW5jZSByaWdodCBvciBtaWRkbGUgYnV0dG9uIGNsaWNrcyB3b24ndCB0cmlnZ2VyIHRoZSBgY2xpY2tgIGV2ZW50LFxuICAgICAgICAvLyB3ZSBzaG91bGRuJ3QgY29uc2lkZXIgdGhlIGRyb3Bkb3duIGFzIG9wZW5lZCBieSBtb3VzZSBpbiB0aG9zZSBjYXNlcy5cbiAgICAgICAgdGhpcy5vcGVuZWRCeSA9IGV2ZW50LmJ1dHRvbiA9PT0gMCA/ICdtb3VzZScgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gU2luY2UgY2xpY2tpbmcgb24gdGhlIHRyaWdnZXIgd29uJ3QgY2xvc2UgdGhlIGRyb3Bkb3duIGlmIGl0IG9wZW5zIGEgbmVzdGVkIGRyb3Bkb3duLFxuICAgICAgICAvLyB3ZSBzaG91bGQgcHJldmVudCBmb2N1cyBmcm9tIG1vdmluZyBvbnRvIGl0IHZpYSBjbGljayB0byBhdm9pZCB0aGVcbiAgICAgICAgLy8gaGlnaGxpZ2h0IGZyb20gbGluZ2VyaW5nIG9uIHRoZSBkcm9wZG93biBpdGVtLlxuICAgICAgICBpZiAodGhpcy5pc05lc3RlZCgpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMga2V5IHByZXNzZXMgb24gdGhlIHRyaWdnZXIuICovXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IEVOVEVSIHx8IGtleUNvZGUgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZEJ5ID0gJ2tleWJvYXJkJztcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNOZXN0ZWQoKSkge1xuICAgICAgICAgICAgICAgIC8vIFN0b3AgZXZlbnQgcHJvcGFnYXRpb24gdG8gYXZvaWQgY2xvc2luZyB0aGUgcGFyZW50IGRyb3Bkb3duLlxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAodGhpcy5pc05lc3RlZCgpICYmXG4gICAgICAgICAgICAgICAgKChrZXlDb2RlID09PSBSSUdIVF9BUlJPVyAmJiB0aGlzLmRpciA9PT0gJ2x0cicpIHx8IChrZXlDb2RlID09PSBMRUZUX0FSUk9XICYmIHRoaXMuZGlyID09PSAncnRsJykpXG4gICAgICAgICAgICApIHx8XG4gICAgICAgICAgICAoIXRoaXMuaXNOZXN0ZWQoKSAmJiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVyAmJiB0aGlzLm9wZW5CeUFycm93RG93bikpXG4gICAgICAgICkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5vcGVuZWRCeSA9ICdrZXlib2FyZCc7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBIYW5kbGVzIGNsaWNrIGV2ZW50cyBvbiB0aGUgdHJpZ2dlci4gKi9cbiAgICBoYW5kbGVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc05lc3RlZCgpKSB7XG4gICAgICAgICAgICAvLyBTdG9wIGV2ZW50IHByb3BhZ2F0aW9uIHRvIGF2b2lkIGNsb3NpbmcgdGhlIHBhcmVudCBkcm9wZG93bi5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHRvdWNoIHN0YXJ0IGV2ZW50cyBvbiB0aGUgdHJpZ2dlci5cbiAgICAgKiBOZWVkcyB0byBiZSBhbiBhcnJvdyBmdW5jdGlvbiBzbyB3ZSBjYW4gZWFzaWx5IHVzZSBhZGRFdmVudExpc3RlbmVyIGFuZCByZW1vdmVFdmVudExpc3RlbmVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hTdGFydCA9ICgpID0+IHRoaXMub3BlbmVkQnkgPSAndG91Y2gnO1xuXG4gICAgLyoqIENsb3NlcyB0aGUgZHJvcGRvd24gYW5kIGRvZXMgdGhlIG5lY2Vzc2FyeSBjbGVhbnVwLiAqL1xuICAgIHByaXZhdGUgZGVzdHJveShyZWFzb246IERyb3Bkb3duQ2xvc2VSZWFzb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYgfHwgIXRoaXMub3BlbmVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMubGFzdERlc3Ryb3lSZWFzb24gPSByZWFzb247XG5cbiAgICAgICAgdGhpcy5kcm9wZG93bi5yZXNldEFjdGl2ZUl0ZW0oKTtcblxuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcblxuICAgICAgICBpZiAodGhpcy5yZXN0b3JlRm9jdXMgJiYgKHJlYXNvbiA9PT0gJ2tleWRvd24nIHx8ICF0aGlzLm9wZW5lZEJ5IHx8ICF0aGlzLmlzTmVzdGVkKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzKHRoaXMub3BlbmVkQnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuZWRCeSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93biBpbnN0YW5jZW9mIE1jRHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ucmVzZXRBbmltYXRpb24oKTtcblxuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5kcm9wZG93bi5hbmltYXRpb25Eb25lXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LnRvU3RhdGUgPT09ICd2b2lkJyksXG4gICAgICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIHRoZSBleGl0IGFuaW1hdGlvbiB0byBmaW5pc2ggYmVmb3JlIGRldGFjaGluZyB0aGUgY29udGVudC5cbiAgICAgICAgICAgICAgICBhbmltYXRpb25TdWJzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnRlcnJ1cHQgaWYgdGhlIGNvbnRlbnQgZ290IHJlLWF0dGFjaGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuZHJvcGRvd24ubGF6eUNvbnRlbnQuYXR0YWNoZWQpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiB0aGlzLmRyb3Bkb3duLmxhenlDb250ZW50IS5kZXRhY2goKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIG1hdHRlciB3aGV0aGVyIHRoZSBjb250ZW50IGdvdCByZS1hdHRhY2hlZCwgcmVzZXQgdGhlIHRoaXMuZHJvcGRvd24uXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4gdGhpcy5zZXRJc09wZW5lZChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvblN1YnNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0SXNPcGVuZWQoZmFsc2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SXNPcGVuZWQoZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5sYXp5Q29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubGF6eUNvbnRlbnQuZGV0YWNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBzZXRzIHRoZSBkcm9wZG93biBzdGF0ZSB0byBvcGVuIGFuZCBmb2N1c2VzIHRoZSBmaXJzdCBpdGVtIGlmXG4gICAgICogdGhlIGRyb3Bkb3duIHdhcyBvcGVuZWQgdmlhIHRoZSBrZXlib2FyZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24ucGFyZW50ID0gdGhpcy5pc05lc3RlZCgpID8gdGhpcy5wYXJlbnQgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uZGlyZWN0aW9uID0gdGhpcy5kaXI7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duLnBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi50cmlnZ2VyV2lkdGggPSB0aGlzLmdldFdpZHRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyb3Bkb3duLmZvY3VzRmlyc3RJdGVtKHRoaXMub3BlbmVkQnkgfHwgJ3Byb2dyYW0nKTtcblxuICAgICAgICB0aGlzLnNldElzT3BlbmVkKHRydWUpO1xuICAgIH1cblxuICAgIC8vIHNldCBzdGF0ZSByYXRoZXIgdGhhbiB0b2dnbGUgdG8gc3VwcG9ydCB0cmlnZ2VycyBzaGFyaW5nIGEgZHJvcGRvd25cbiAgICBwcml2YXRlIHNldElzT3BlbmVkKGlzT3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9vcGVuZWQgPSBpc09wZW47XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby12b2lkLWV4cHJlc3Npb25cbiAgICAgICAgdGhpcy5fb3BlbmVkID8gdGhpcy5kcm9wZG93bk9wZW5lZC5lbWl0KCkgOiB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcblxuICAgICAgICBpZiAodGhpcy5pc05lc3RlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duSXRlbUluc3RhbmNlLmhpZ2hsaWdodGVkID0gaXNPcGVuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgY2hlY2tzIHRoYXQgYSB2YWxpZCBpbnN0YW5jZSBvZiBNY0Ryb3Bkb3duIGhhcyBiZWVuIHBhc3NlZCBpbnRvXG4gICAgICogbWNEcm9wZG93blRyaWdnZXJGb3IuIElmIG5vdCwgYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24pIHtcbiAgICAgICAgICAgIHRocm93TWNEcm9wZG93bk1pc3NpbmdFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgY3JlYXRlcyB0aGUgb3ZlcmxheSBmcm9tIHRoZSBwcm92aWRlZCBkcm9wZG93bidzIHRlbXBsYXRlIGFuZCBzYXZlcyBpdHNcbiAgICAgKiBPdmVybGF5UmVmIHNvIHRoYXQgaXQgY2FuIGJlIGF0dGFjaGVkIHRvIHRoZSBET00gd2hlbiBvcGVuIGlzIGNhbGxlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldE92ZXJsYXlDb25maWcoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9Qb3NpdGlvbnMoY29uZmlnLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoY29uZmlnKTtcblxuICAgICAgICAgICAgLy8gQ29uc3VtZSB0aGUgYGtleWRvd25FdmVudHNgIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlbSBmcm9tIGdvaW5nIHRvIGFub3RoZXIgb3ZlcmxheS5cbiAgICAgICAgICAgIC8vIElkZWFsbHkgd2UnZCBhbHNvIGhhdmUgb3VyIGtleWJvYXJkIGV2ZW50IGxvZ2ljIGluIGhlcmUsIGhvd2V2ZXIgZG9pbmcgc28gd2lsbFxuICAgICAgICAgICAgLy8gYnJlYWsgYW55Ym9keSB0aGF0IG1heSBoYXZlIGltcGxlbWVudGVkIHRoZSBgTWNEcm9wZG93blBhbmVsYCB0aGVtc2VsdmVzLlxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgYnVpbGRzIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBuZWVkZWQgdG8gY3JlYXRlIHRoZSBvdmVybGF5LCB0aGUgT3ZlcmxheVN0YXRlLlxuICAgICAqIEByZXR1cm5zIE92ZXJsYXlDb25maWdcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgICAgIHJldHVybiBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgICAgICAgICAgICAud2l0aExvY2tlZFBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcubWMtZHJvcGRvd25fX3BhbmVsJyksXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmRyb3Bkb3duLmJhY2tkcm9wQ2xhc3MgfHwgJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbnMgdG8gY2hhbmdlcyBpbiB0aGUgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgYW5kIHNldHMgdGhlIGNvcnJlY3QgY2xhc3Nlc1xuICAgICAqIG9uIHRoZSBkcm9wZG93biBiYXNlZCBvbiB0aGUgbmV3IHBvc2l0aW9uLiBUaGlzIGVuc3VyZXMgdGhlIGFuaW1hdGlvbiBvcmlnaW4gaXMgYWx3YXlzXG4gICAgICogY29ycmVjdCwgZXZlbiBpZiBhIGZhbGxiYWNrIHBvc2l0aW9uIGlzIHVzZWQgZm9yIHRoZSBvdmVybGF5LlxuICAgICAqL1xuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9Qb3NpdGlvbnMocG9zaXRpb246IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5zZXRQb3NpdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLnBvc2l0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NYOiBEcm9wZG93blBvc2l0aW9uWCA9IGNoYW5nZS5jb25uZWN0aW9uUGFpci5vdmVybGF5WCA9PT0gJ3N0YXJ0JyA/ICdhZnRlcicgOiAnYmVmb3JlJztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zWTogRHJvcGRvd25Qb3NpdGlvblkgPSBjaGFuZ2UuY29ubmVjdGlvblBhaXIub3ZlcmxheVkgPT09ICd0b3AnID8gJ2JlbG93JyA6ICdhYm92ZSc7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5zZXRQb3NpdGlvbkNsYXNzZXMhKHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYXBwcm9wcmlhdGUgcG9zaXRpb25zIG9uIGEgcG9zaXRpb24gc3RyYXRlZ3lcbiAgICAgKiBzbyB0aGUgb3ZlcmxheSBjb25uZWN0cyB3aXRoIHRoZSB0cmlnZ2VyIGNvcnJlY3RseS5cbiAgICAgKiBAcGFyYW0gcG9zaXRpb25TdHJhdGVneSBTdHJhdGVneSB3aG9zZSBwb3NpdGlvbiB0byB1cGRhdGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRQb3NpdGlvbihwb3NpdGlvblN0cmF0ZWd5OiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kpIHtcbiAgICAgICAgbGV0IFtvcmlnaW5YLCBvcmlnaW5GYWxsYmFja1gsIG92ZXJsYXlYLCBvdmVybGF5RmFsbGJhY2tYXTogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3NbXSA9XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnhQb3NpdGlvbiA9PT0gJ2JlZm9yZScgP1xuICAgICAgICAgICAgICAgIFsnZW5kJywgJ3N0YXJ0JywgJ2VuZCcsICdzdGFydCddIDpcbiAgICAgICAgICAgICAgICBbJ3N0YXJ0JywgJ2VuZCcsICdzdGFydCcsICdlbmQnXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgICAgIGxldCBbb3ZlcmxheVksIG92ZXJsYXlGYWxsYmFja1ksIG9yaWdpblksIG9yaWdpbkZhbGxiYWNrWV06IFZlcnRpY2FsQ29ubmVjdGlvblBvc1tdID1cbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ueVBvc2l0aW9uID09PSAnYWJvdmUnID9cbiAgICAgICAgICAgICAgICBbJ2JvdHRvbScsICd0b3AnLCAnYm90dG9tJywgJ3RvcCddIDpcbiAgICAgICAgICAgICAgICBbJ3RvcCcsICdib3R0b20nLCAndG9wJywgJ2JvdHRvbSddO1xuXG4gICAgICAgIGxldCBvZmZzZXRZID0gMDtcbiAgICAgICAgbGV0IG9mZnNldFggPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTmVzdGVkKCkpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gdGhlIGRyb3Bkb3duIGlzIG5lc3RlZCwgaXQgc2hvdWxkIGFsd2F5cyBhbGlnbiBpdHNlbGZcbiAgICAgICAgICAgIC8vIHRvIHRoZSBlZGdlcyBvZiB0aGUgdHJpZ2dlciwgaW5zdGVhZCBvZiBvdmVybGFwcGluZyBpdC5cbiAgICAgICAgICAgIG92ZXJsYXlGYWxsYmFja1ggPSBvcmlnaW5YID0gdGhpcy5kcm9wZG93bi54UG9zaXRpb24gPT09ICdiZWZvcmUnID8gJ3N0YXJ0JyA6ICdlbmQnO1xuICAgICAgICAgICAgb3JpZ2luRmFsbGJhY2tYID0gb3ZlcmxheVggPSBvcmlnaW5YID09PSAnZW5kJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgIG9mZnNldFkgPSBvdmVybGF5WSA9PT0gJ2JvdHRvbScgPyBORVNURURfUEFORUxfVE9QX1BBRERJTkcgOiAtTkVTVEVEX1BBTkVMX1RPUF9QQURESU5HO1xuICAgICAgICAgICAgb2Zmc2V0WCA9IE5FU1RFRF9QQU5FTF9MRUZUX1BBRERJTkc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24ub3ZlcmxhcFRyaWdnZXJZKSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWSA9IG92ZXJsYXlZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgICAgICAgICAgICAgb3JpZ2luRmFsbGJhY2tZID0gb3ZlcmxheUZhbGxiYWNrWSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJvcGRvd24ub3ZlcmxhcFRyaWdnZXJYKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheUZhbGxiYWNrWCA9IG9yaWdpblggPSB0aGlzLmRyb3Bkb3duLnhQb3NpdGlvbiA9PT0gJ2JlZm9yZScgPyAnc3RhcnQnIDogJ2VuZCc7XG4gICAgICAgICAgICAgICAgb3JpZ2luRmFsbGJhY2tYID0gb3ZlcmxheVggPSBvcmlnaW5YID09PSAnZW5kJyA/ICdzdGFydCcgOiAnZW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBvc2l0aW9uU3RyYXRlZ3kud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICB7IG9yaWdpblgsIG9yaWdpblksIG92ZXJsYXlYLCBvdmVybGF5WSwgb2Zmc2V0WSwgb2Zmc2V0WDogLW9mZnNldFggfSxcbiAgICAgICAgICAgIHsgb3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLCBvcmlnaW5ZLCBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCwgb3ZlcmxheVksIG9mZnNldFksIG9mZnNldFggfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6IG9yaWdpbkZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvdmVybGF5WCxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiAtb2Zmc2V0WSxcbiAgICAgICAgICAgICAgICBvZmZzZXRYOiAtb2Zmc2V0WFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5YOiBvcmlnaW5GYWxsYmFja1gsXG4gICAgICAgICAgICAgICAgb3JpZ2luWTogb3JpZ2luRmFsbGJhY2tZLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiBvdmVybGF5RmFsbGJhY2tYLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlZOiBvdmVybGF5RmFsbGJhY2tZLFxuICAgICAgICAgICAgICAgIG9mZnNldFk6IC1vZmZzZXRZLFxuICAgICAgICAgICAgICAgIG9mZnNldFg6IC1vZmZzZXRYXG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKiBDbGVhbnMgdXAgdGhlIGFjdGl2ZSBzdWJzY3JpcHRpb25zLiAqL1xuICAgIHByaXZhdGUgY2xlYW5VcFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5ob3ZlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGEgc3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgYW4gYWN0aW9uIHRoYXQgc2hvdWxkIGNsb3NlIHRoZSBkcm9wZG93biBvY2N1cnMuICovXG4gICAgcHJpdmF0ZSBjbG9zaW5nQWN0aW9ucygpIHtcbiAgICAgICAgY29uc3QgYmFja2Ryb3AgPSB0aGlzLm92ZXJsYXlSZWYhLmJhY2tkcm9wQ2xpY2soKTtcbiAgICAgICAgY29uc3Qgb3V0c2lkZVBvaW50ZXJFdmVudHMgPSB0aGlzLm92ZXJsYXlSZWYhLm91dHNpZGVQb2ludGVyRXZlbnRzKCk7XG4gICAgICAgIGNvbnN0IGRldGFjaG1lbnRzID0gdGhpcy5vdmVybGF5UmVmIS5kZXRhY2htZW50cygpO1xuICAgICAgICBjb25zdCBwYXJlbnRDbG9zZSA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuY2xvc2VkIDogb2JzZXJ2YWJsZU9mKCk7XG4gICAgICAgIGNvbnN0IGhvdmVyID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5ob3ZlcmVkKClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigoYWN0aXZlKSA9PiBhY3RpdmUgIT09IHRoaXMuZHJvcGRvd25JdGVtSW5zdGFuY2UpLFxuICAgICAgICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLl9vcGVuZWQpXG4gICAgICAgICAgICApIDogb2JzZXJ2YWJsZU9mKCk7XG5cbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgYmFja2Ryb3AsXG4gICAgICAgICAgICBvdXRzaWRlUG9pbnRlckV2ZW50cyxcbiAgICAgICAgICAgIHBhcmVudENsb3NlIGFzIE9ic2VydmFibGU8RHJvcGRvd25DbG9zZVJlYXNvbj4sXG4gICAgICAgICAgICBob3ZlcixcbiAgICAgICAgICAgIGRldGFjaG1lbnRzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXMgdGhlIGNhc2VzIHdoZXJlIHRoZSB1c2VyIGhvdmVycyBvdmVyIHRoZSB0cmlnZ2VyLiAqL1xuICAgIHByaXZhdGUgaGFuZGxlSG92ZXIoKSB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZSBob3ZlcmVkIGl0ZW0gaW4gb3JkZXIgdG8gdG9nZ2xlIHRoZSBwYW5lbC5cbiAgICAgICAgaWYgKCF0aGlzLmlzTmVzdGVkKCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5ob3ZlclN1YnNjcmlwdGlvbiA9IHRoaXMucGFyZW50LmhvdmVyZWQoKVxuICAgICAgICAvLyBTaW5jZSB3ZSBtaWdodCBoYXZlIG11bHRpcGxlIGNvbXBldGluZyB0cmlnZ2VycyBmb3IgdGhlIHNhbWUgZHJvcGRvd24gKGUuZy4gYSBuZXN0ZWQgZHJvcGRvd25cbiAgICAgICAgLy8gd2l0aCBkaWZmZXJlbnQgZGF0YSBhbmQgdHJpZ2dlcnMpLCB3ZSBoYXZlIHRvIGRlbGF5IGl0IGJ5IGEgdGljayB0byBlbnN1cmUgdGhhdFxuICAgICAgICAvLyBpdCB3b24ndCBiZSBjbG9zZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaXQgaXMgb3BlbmVkLlxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKChhY3RpdmUpID0+IGFjdGl2ZSA9PT0gdGhpcy5kcm9wZG93bkl0ZW1JbnN0YW5jZSAmJiAhYWN0aXZlLmRpc2FibGVkKSxcbiAgICAgICAgICAgICAgICBkZWxheSgwLCBhc2FwU2NoZWR1bGVyKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRCeSA9ICdtb3VzZSc7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2FtZSBkcm9wZG93biBpcyB1c2VkIGJldHdlZW4gbXVsdGlwbGUgdHJpZ2dlcnMsIGl0IG1pZ2h0IHN0aWxsIGJlIGFuaW1hdGluZ1xuICAgICAgICAgICAgICAgIC8vIHdoaWxlIHRoZSBuZXcgdHJpZ2dlciB0cmllcyB0byByZS1vcGVuIGl0LiBXYWl0IGZvciB0aGUgYW5pbWF0aW9uIHRvIGZpbmlzaFxuICAgICAgICAgICAgICAgIC8vIGJlZm9yZSBkb2luZyBzby4gQWxzbyBpbnRlcnJ1cHQgaWYgdGhlIHVzZXIgbW92ZXMgdG8gYW5vdGhlciBpdGVtLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyb3Bkb3duIGluc3RhbmNlb2YgTWNEcm9wZG93biAmJiB0aGlzLmRyb3Bkb3duLmlzQW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdGhlIGBkZWxheSgwKWAgaGVyZSBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgICAgICAgICAgICAgICAvLyAnY2hhbmdlZCBhZnRlciBjaGVja2VkJyBlcnJvcnMgaW4gc29tZSBjYXNlcy4gU2VlICMxMjE5NC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5hbmltYXRpb25Eb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5KDAsIGFzYXBTY2hlZHVsZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLnBhcmVudC5ob3ZlcmVkKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMub3BlbigpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogR2V0cyB0aGUgcG9ydGFsIHRoYXQgc2hvdWxkIGJlIGF0dGFjaGVkIHRvIHRoZSBvdmVybGF5LiAqL1xuICAgIHByaXZhdGUgZ2V0UG9ydGFsKCk6IFRlbXBsYXRlUG9ydGFsIHtcbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGNhbiBhdm9pZCB0aGlzIGNoZWNrIGJ5IGtlZXBpbmcgdGhlIHBvcnRhbCBvbiB0aGUgZHJvcGRvd24gcGFuZWwuXG4gICAgICAgIC8vIFdoaWxlIGl0IHdvdWxkIGJlIGNsZWFuZXIsIHdlJ2QgaGF2ZSB0byBpbnRyb2R1Y2UgYW5vdGhlciByZXF1aXJlZCBtZXRob2Qgb25cbiAgICAgICAgLy8gYE1jRHJvcGRvd25QYW5lbGAsIG1ha2luZyBpdCBoYXJkZXIgdG8gY29uc3VtZS5cbiAgICAgICAgaWYgKCF0aGlzLnBvcnRhbCB8fCB0aGlzLnBvcnRhbC50ZW1wbGF0ZVJlZiAhPT0gdGhpcy5kcm9wZG93bi50ZW1wbGF0ZVJlZikge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5kcm9wZG93bi50ZW1wbGF0ZVJlZiwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFdpZHRoKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBjb25zdCB7IHdpZHRoLCBib3JkZXJSaWdodFdpZHRoLCBib3JkZXJMZWZ0V2lkdGggfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBgJHtwYXJzZUludCh3aWR0aCkgLSBwYXJzZUludChib3JkZXJSaWdodFdpZHRoKSAtIHBhcnNlSW50KGJvcmRlckxlZnRXaWR0aCl9cHhgO1xuICAgIH1cbn1cbiJdfQ==
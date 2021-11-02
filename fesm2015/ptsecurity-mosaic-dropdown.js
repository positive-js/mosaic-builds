import * as i0 from '@angular/core';
import { InjectionToken, Directive, Inject, Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, ContentChild, HostListener, EventEmitter, QueryList, TemplateRef, Input, ViewChild, ContentChildren, Output, Self, NgModule } from '@angular/core';
import * as i1$1 from '@angular/cdk/overlay';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import * as i3 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i2 from '@ptsecurity/mosaic/icon';
import { McIcon, McIconModule } from '@ptsecurity/mosaic/icon';
import { TemplatePortal, DomPortalOutlet } from '@angular/cdk/portal';
import { Subject, Subscription, merge, of, asapScheduler } from 'rxjs';
import * as i1 from '@angular/cdk/a11y';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import * as i4 from '@angular/cdk/bidi';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { RIGHT_ARROW, LEFT_ARROW, ESCAPE, ENTER, SPACE, DOWN_ARROW as DOWN_ARROW$1 } from '@ptsecurity/cdk/keycodes';
import { startWith, switchMap, take, filter, takeUntil, delay } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { trigger, state, style, transition, group, query, animate } from '@angular/animations';

/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * @docs-private
 */
const MC_DROPDOWN_PANEL = new InjectionToken('MC_DROPDOWN_PANEL');
/** Injection token to be used to override the default options for `mc-dropdown`. */
const MC_DROPDOWN_DEFAULT_OPTIONS = new InjectionToken('mc-dropdown-default-options', {
    providedIn: 'root',
    factory: MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
// tslint:disable-next-line:naming-convention
function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY() {
    return {
        overlapTriggerX: true,
        overlapTriggerY: false,
        xPosition: 'after',
        yPosition: 'below',
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: false
    };
}

/**
 * Dropdown content that will be rendered lazily once the dropdown is opened.
 */
class McDropdownContent {
    constructor(template, componentFactoryResolver, appRef, injector, viewContainerRef, document) {
        this.template = template;
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        /** Emits when the dropdown content has been attached. */
        this.attached = new Subject();
    }
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    attach(context = {}) {
        if (!this.portal) {
            this.portal = new TemplatePortal(this.template, this.viewContainerRef);
        }
        this.detach();
        if (!this.outlet) {
            this.outlet = new DomPortalOutlet(this.document.createElement('div'), this.componentFactoryResolver, this.appRef, this.injector);
        }
        const element = this.template.elementRef.nativeElement;
        // Because we support opening the same dropdown from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        element.parentNode.insertBefore(this.outlet.outletElement, element);
        this.portal.attach(this.outlet, context);
        this.attached.next();
    }
    /**
     * Detaches the content.
     * @docs-private
     */
    detach() {
        var _a;
        if ((_a = this.portal) === null || _a === void 0 ? void 0 : _a.isAttached) {
            this.portal.detach();
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.outlet) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}
/** @nocollapse */ McDropdownContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownContent, deps: [{ token: i0.TemplateRef }, { token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }, { token: i0.ViewContainerRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McDropdownContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McDropdownContent, selector: "ng-template[mcDropdownContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[mcDropdownContent]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });

// Boilerplate for applying mixins to McDropdownItem.
/** @docs-private */
class McDropdownItemBase {
}
// tslint:disable-next-line:naming-convention
const McDropdownItemMixinBase = mixinDisabled(McDropdownItemBase);
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
class McDropdownItem extends McDropdownItemMixinBase {
    constructor(elementRef, focusMonitor, parentDropdownPanel) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.parentDropdownPanel = parentDropdownPanel;
        /** Stream that emits when the dropdown item is hovered. */
        this.hovered = new Subject();
        /** Stream that emits when the menu item is focused. */
        this.focused = new Subject();
        /** Whether the dropdown item is highlighted. */
        this.highlighted = false;
        /** Whether the dropdown item acts as a trigger for a nested dropdown. */
        this.isNested = false;
    }
    ngAfterViewInit() {
        if (this.focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for menu items only when the focus was not caused by a
            // mouse or touch interaction.
            this.focusMonitor.monitor(this.elementRef, false);
        }
    }
    ngOnDestroy() {
        if (this.focusMonitor) {
            this.focusMonitor.stopMonitoring(this.elementRef);
        }
        this.hovered.complete();
        this.focused.complete();
    }
    resetStyles() {
        this.getHostElement().classList.remove('cdk-keyboard-focused');
    }
    /** Focuses the dropdown item. */
    focus(origin, options) {
        if (this.focusMonitor && origin) {
            this.focusMonitor.focusVia(this.getHostElement(), origin, options);
        }
        else {
            this.getHostElement().focus(options);
        }
        this.focused.next(this);
    }
    /** Returns the host DOM element. */
    getHostElement() {
        return this.elementRef.nativeElement;
    }
    /** Used to set the `tabindex`. */
    getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /** Prevents the default element actions if it is disabled. */
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    checkDisabled(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /** Emits to the hover stream. */
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    handleMouseEnter() {
        this.hovered.next(this);
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
        var _a, _b;
        const clone = this.getHostElement().cloneNode(true);
        const icons = clone.querySelectorAll('[mc-icon], .mc-icon');
        // Strip away icons so they don't show up in the text.
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < icons.length; i++) {
            const icon = icons[i];
            (_a = icon.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(icon);
        }
        return ((_b = clone.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '';
    }
}
/** @nocollapse */ McDropdownItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownItem, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }, { token: MC_DROPDOWN_PANEL, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McDropdownItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McDropdownItem, selector: "mc-dropdown-item, [mc-dropdown-item]", inputs: { disabled: "disabled" }, host: { listeners: { "click": "checkDisabled($event)", "mouseenter": "handleMouseEnter()" }, properties: { "class.mc-dropdown-item_with-icon": "icon", "class.mc-dropdown-item_highlighted": "highlighted", "attr.disabled": "disabled || null", "attr.tabindex": "getTabIndex()" }, classAttribute: "mc-dropdown-item" }, queries: [{ propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcDropdownItem"], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-dropdown-item-wrapper\">\n    <ng-content></ng-content>\n</div>\n<i *ngIf=\"isNested\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown-trigger__icon\"></i>\n", styles: [".mc-dropdown-item{-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:none;padding:0;text-align:left;white-space:nowrap}.mc-dropdown-item:not([disabled]){cursor:pointer}.mc-dropdown-item .mc-dropdown-item__caption{margin-top:4px}.mc-dropdown-item.mc-dropdown-item_with-icon .mc-dropdown-item__caption{margin-left:24px}.mc-dropdown-item .docs-navbar-version__num{margin-right:4px}.mc-dropdown-item-wrapper{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:5px 15px;padding:var(--mc-dropdown-item-size-padding, 5px 15px)}.mc-dropdown-item-wrapper [mc-icon]{padding:0 8px 2px 0;padding:var(--mc-dropdown-item-size-icon-padding, 0 8px 2px 0)}.mc-dropdown-trigger__icon{margin-left:auto;padding-right:8px;padding-right:var(--dropdown-trigger-size-icon-padding-right, 8px)}.mc-dropdown__group-header{-webkit-user-select:none;user-select:none;padding:6px 15px;padding:var(--mc-dropdown-item-size-padding, 6px 15px)}.mc-dropdown__group-header.mc-dropdown__group-header_small{padding:8px 15px;padding:var(--mc-dropdown-item-size-padding, 8px 15px)}.mc-dropdown__divider{height:1px;height:var(--mc-dropdown-divider-size-height, 1px);margin:4px 0;margin:var(--mc-dropdown-divider-size-margin, 4px 0)}\n"], components: [{ type: i2.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-dropdown-item, [mc-dropdown-item]',
                    exportAs: 'mcDropdownItem',
                    templateUrl: 'dropdown-item.html',
                    styleUrls: ['dropdown-item.scss'],
                    inputs: ['disabled'],
                    host: {
                        class: 'mc-dropdown-item',
                        '[class.mc-dropdown-item_with-icon]': 'icon',
                        '[class.mc-dropdown-item_highlighted]': 'highlighted',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'getTabIndex()'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DROPDOWN_PANEL]
                }, {
                    type: Optional
                }] }]; }, propDecorators: { icon: [{
                type: ContentChild,
                args: [McIcon]
            }], checkDisabled: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], handleMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }] } });

/**
 * Throws an exception for the case when dropdown trigger doesn't have a valid mc-dropdown instance
 * @docs-private
 */
function throwMcDropdownMissingError() {
    throw Error(`mcDropdownTriggerFor: must pass in an mc-dropdown instance.
    Example:
      <mc-dropdown #dropdown="mcDropdown"></mc-dropdown>
      <button [mcDropdownTriggerFor]="dropdown"></button>`);
}
/**
 * Throws an exception for the case when dropdown's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
function throwMcDropdownInvalidPositionX() {
    throw Error(`xPosition value must be either 'before' or after'.
      Example: <mc-dropdown [xPosition]="'before'" #dropdown="mcDropdown"></mc-dropdown>`);
}
/**
 * Throws an exception for the case when dropdown's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
function throwMcDropdownInvalidPositionY() {
    throw Error(`yPosition value must be either 'above' or below'.
      Example: <mc-dropdown [yPosition]="'above'" #dropdown="mcDropdown"></mc-dropdown>`);
}

/**
 * Animations used by the mc-dropdown component.
 * @docs-private
 */
const mcDropdownAnimations = {
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
const fadeInItems = mcDropdownAnimations.fadeInItems;
const transformDropdown = mcDropdownAnimations.transformDropdown;

class McDropdown {
    constructor(elementRef, ngZone, defaultOptions) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.defaultOptions = defaultOptions;
        this.navigationWithWrap = false;
        this._xPosition = this.defaultOptions.xPosition;
        this._yPosition = this.defaultOptions.yPosition;
        this._overlapTriggerX = this.defaultOptions.overlapTriggerX;
        this._overlapTriggerY = this.defaultOptions.overlapTriggerY;
        this._hasBackdrop = this.defaultOptions.hasBackdrop;
        this.triggerWidth = '';
        /** Config object to be passed into the dropdown's ngClass */
        this.classList = {};
        /** Current state of the panel animation. */
        this.panelAnimationState = 'void';
        /** Emits whenever an animation on the dropdown completes. */
        this.animationDone = new Subject();
        /** Class to be added to the backdrop element. */
        this.backdropClass = this.defaultOptions.backdropClass;
        /** Event emitted when the dropdown is closed. */
        this.closed = new EventEmitter();
        /** Only the direct descendant menu items. */
        this.directDescendantItems = new QueryList();
        /** Subscription to tab events on the dropdown panel */
        this.tabSubscription = Subscription.EMPTY;
    }
    /** Position of the dropdown in the X axis. */
    get xPosition() {
        return this._xPosition;
    }
    set xPosition(value) {
        if (value !== 'before' && value !== 'after') {
            throwMcDropdownInvalidPositionX();
        }
        this._xPosition = value;
        this.setPositionClasses();
    }
    /** Position of the dropdown in the Y axis. */
    get yPosition() {
        return this._yPosition;
    }
    set yPosition(value) {
        if (value !== 'above' && value !== 'below') {
            throwMcDropdownInvalidPositionY();
        }
        this._yPosition = value;
        this.setPositionClasses();
    }
    /** Whether the dropdown should overlap its trigger vertically. */
    get overlapTriggerY() {
        return this._overlapTriggerY;
    }
    set overlapTriggerY(value) {
        this._overlapTriggerY = coerceBooleanProperty(value);
    }
    /** Whether the dropdown should overlap its trigger horizontally. */
    get overlapTriggerX() {
        return this._overlapTriggerX;
    }
    set overlapTriggerX(value) {
        this._overlapTriggerX = coerceBooleanProperty(value);
    }
    /** Whether the dropdown has a backdrop. */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * This method takes classes set on the host mc-dropdown element and applies them on the
     * dropdown template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing dropdown from outside the component.
     * @param classes list of class names
     */
    set panelClass(classes) {
        const previousPanelClass = this.previousPanelClass;
        if (previousPanelClass && previousPanelClass.length) {
            previousPanelClass
                .split(' ')
                .forEach((className) => this.classList[className] = false);
        }
        this.previousPanelClass = classes;
        if (classes === null || classes === void 0 ? void 0 : classes.length) {
            classes
                .split(' ')
                .forEach((className) => this.classList[className] = true);
            this.elementRef.nativeElement.className = '';
        }
    }
    ngOnInit() {
        this.setPositionClasses();
    }
    ngAfterContentInit() {
        this.updateDirectDescendants();
        this.keyManager = new FocusKeyManager(this.directDescendantItems)
            .withTypeAhead();
        if (this.navigationWithWrap) {
            this.keyManager.withWrap();
        }
        this.tabSubscription = this.keyManager.tabOut
            .subscribe(() => this.closed.emit('tab'));
        // If a user manually (programmatically) focuses a menu item, we need to reflect that focus
        // change back to the key manager. Note that we don't need to unsubscribe here because focused
        // is internal and we know that it gets completed on destroy.
        this.directDescendantItems.changes
            .pipe(startWith(this.directDescendantItems), switchMap((items) => merge(...items.map((item) => item.focused))))
            .subscribe((focusedItem) => this.keyManager.updateActiveItem(focusedItem));
    }
    ngOnDestroy() {
        this.directDescendantItems.destroy();
        this.tabSubscription.unsubscribe();
        this.closed.complete();
    }
    /** Stream that emits whenever the hovered dropdown item changes. */
    hovered() {
        const itemChanges = this.directDescendantItems.changes;
        return itemChanges.pipe(startWith(this.directDescendantItems), switchMap((items) => merge(...items.map((item) => item.hovered))));
    }
    /** Handle a keyboard event from the dropdown, delegating to the appropriate action. */
    handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        const keyCode = event.keyCode;
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
                return;
        }
        // Don't allow the event to propagate if we've already handled it, or it may
        // end up reaching other overlays that were opened earlier.
        event.stopPropagation();
    }
    /**
     * Focus the first item in the dropdown.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    focusFirstItem(origin = 'program') {
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this.ngZone.onStable
                .pipe(take(1))
                .subscribe(() => this.keyManager.setFocusOrigin(origin).setFirstItemActive());
        }
        else {
            this.keyManager.setFocusOrigin(origin).setFirstItemActive();
        }
    }
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    resetActiveItem() {
        var _a;
        (_a = this.keyManager.activeItem) === null || _a === void 0 ? void 0 : _a.resetStyles();
        this.keyManager.setActiveItem(-1);
    }
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * @param posX Position of the dropdown along the x axis.
     * @param posY Position of the dropdown along the y axis.
     * @docs-private
     */
    setPositionClasses(posX = this.xPosition, posY = this.yPosition) {
        const classes = this.classList;
        classes['mc-dropdown-before'] = posX === 'before';
        classes['mc-dropdown-after'] = posX === 'after';
        classes['mc-dropdown-above'] = posY === 'above';
        classes['mc-dropdown-below'] = posY === 'below';
    }
    /** Starts the enter animation. */
    startAnimation() {
        this.panelAnimationState = 'enter';
    }
    /** Resets the panel animation to its initial state. */
    resetAnimation() {
        this.panelAnimationState = 'void';
    }
    /** Callback that is invoked when the panel animation completes. */
    onAnimationDone(event) {
        this.animationDone.next(event);
        this.isAnimating = false;
    }
    onAnimationStart(event) {
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
    }
    close() {
        const focusOrigin = this.keyManager.getFocusOrigin() === 'keyboard' ? 'keydown' : 'click';
        this.closed.emit(focusOrigin);
    }
    /**
     * Sets up a stream that will keep track of any newly-added menu items and will update the list
     * of direct descendants. We collect the descendants this way, because `_allItems` can include
     * items that are part of child menus, and using a custom way of registering items is unreliable
     * when it comes to maintaining the item order.
     */
    updateDirectDescendants() {
        this.items.changes
            .pipe(startWith(this.items))
            .subscribe((items) => {
            this.directDescendantItems.reset(items.filter((item) => item.parentDropdownPanel === this));
            this.directDescendantItems.notifyOnChanges();
        });
    }
}
/** @nocollapse */ McDropdown.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdown, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: MC_DROPDOWN_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McDropdown.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McDropdown, selector: "mc-dropdown", inputs: { navigationWithWrap: "navigationWithWrap", xPosition: "xPosition", yPosition: "yPosition", overlapTriggerY: "overlapTriggerY", overlapTriggerX: "overlapTriggerX", hasBackdrop: "hasBackdrop", panelClass: ["class", "panelClass"], backdropClass: "backdropClass" }, outputs: { closed: "closed" }, providers: [
        { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
    ], queries: [{ propertyName: "lazyContent", first: true, predicate: McDropdownContent, descendants: true }, { propertyName: "items", predicate: McDropdownItem, descendants: true }], viewQueries: [{ propertyName: "templateRef", first: true, predicate: TemplateRef, descendants: true }], exportAs: ["mcDropdown"], ngImport: i0, template: "<ng-template>\n    <div class=\"mc-dropdown__panel\"\n         [ngClass]=\"classList\"\n         [class.mc-dropdown__panel_nested]=\"parent\"\n         [style.min-width]=\"triggerWidth\"\n         (keydown)=\"handleKeydown($event)\"\n         (click)=\"close()\"\n         [@transformDropdown]=\"panelAnimationState\"\n         (@transformDropdown.start)=\"onAnimationStart($event)\"\n         (@transformDropdown.done)=\"onAnimationDone($event)\"\n         tabindex=\"-1\">\n\n        <div class=\"mc-dropdown__content\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</ng-template>\n", styles: [".mc-dropdown__panel{margin-top:-1px;max-width:640px;max-width:var(--mc-dropdown-panel-size-max-width, 640px);border-width:1px;border-width:var(--mc-dropdown-panel-size-border-width, 1px);border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-dropdown-panel-size-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-dropdown-panel-size-border-radius, 3px);padding:4px 0;padding:var(--mc-dropdown-panel-size-padding, 4px 0)}.mc-dropdown__panel.mc-dropdown__panel_nested{border-top-left-radius:3px;border-top-left-radius:var(--mc-dropdown-panel-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-dropdown-panel-size-border-radius, 3px)}.mc-dropdown__panel.ng-animating{pointer-events:none}.mc-dropdown__content{display:flex;flex-direction:column}\n"], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [
        mcDropdownAnimations.transformDropdown,
        mcDropdownAnimations.fadeInItems
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdown, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-dropdown',
                    exportAs: 'mcDropdown',
                    templateUrl: 'dropdown.html',
                    styleUrls: ['dropdown.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [
                        mcDropdownAnimations.transformDropdown,
                        mcDropdownAnimations.fadeInItems
                    ],
                    providers: [
                        { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DROPDOWN_DEFAULT_OPTIONS]
                }] }]; }, propDecorators: { navigationWithWrap: [{
                type: Input
            }], xPosition: [{
                type: Input
            }], yPosition: [{
                type: Input
            }], overlapTriggerY: [{
                type: Input
            }], overlapTriggerX: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], panelClass: [{
                type: Input,
                args: ['class']
            }], backdropClass: [{
                type: Input
            }], templateRef: [{
                type: ViewChild,
                args: [TemplateRef, { static: false }]
            }], items: [{
                type: ContentChildren,
                args: [McDropdownItem, { descendants: true }]
            }], lazyContent: [{
                type: ContentChild,
                args: [McDropdownContent, { static: false }]
            }], closed: [{
                type: Output
            }] } });

/** Injection token that determines the scroll handling while the dropdown is open. */
const MC_DROPDOWN_SCROLL_STRATEGY = new InjectionToken('mc-dropdown-scroll-strategy');
/** @docs-private */
// tslint:disable-next-line:naming-convention
function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
const MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DROPDOWN_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
};
/** Default top padding of the nested dropdown panel. */
const NESTED_PANEL_TOP_PADDING = 4;
const NESTED_PANEL_LEFT_PADDING = 8;
/** Options for binding a passive event listener. */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
class McDropdownTrigger {
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
        var _a;
        return ((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl' ? 'rtl' : 'ltr';
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
        // Pressing enter on the trigger will trigger the click handler later.
        if (keyCode === ENTER || keyCode === SPACE) {
            this.openedBy = 'keyboard';
        }
        if ((this.isNested() &&
            ((keyCode === RIGHT_ARROW && this.dir === 'ltr') || (keyCode === LEFT_ARROW && this.dir === 'rtl'))) ||
            (!this.isNested() && (keyCode === DOWN_ARROW$1 && this.openByArrowDown))) {
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
        const parentClose = this.parent ? this.parent.closed : of();
        const hover = this.parent ? this.parent.hovered()
            .pipe(filter((active) => active !== this.dropdownItemInstance), filter(() => this._opened)) : of();
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
/** @nocollapse */ McDropdownTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownTrigger, deps: [{ token: i1$1.Overlay }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: MC_DROPDOWN_SCROLL_STRATEGY }, { token: McDropdown, optional: true }, { token: McDropdownItem, optional: true, self: true }, { token: i4.Directionality, optional: true }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McDropdownTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McDropdownTrigger, selector: "[mcDropdownTriggerFor]", inputs: { data: ["mcDropdownTriggerData", "data"], openByArrowDown: "openByArrowDown", restoreFocus: ["mcDropdownTriggerRestoreFocus", "restoreFocus"], dropdown: ["mcDropdownTriggerFor", "dropdown"] }, outputs: { dropdownOpened: "dropdownOpened", dropdownClosed: "dropdownClosed" }, host: { listeners: { "mousedown": "handleMousedown($event)", "keydown": "handleKeydown($event)", "click": "handleClick($event)" }, properties: { "class.mc-pressed": "opened" }, classAttribute: "mc-dropdown-trigger" }, exportAs: ["mcDropdownTrigger"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownTrigger, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i1$1.Overlay }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DROPDOWN_SCROLL_STRATEGY]
                }] }, { type: McDropdown, decorators: [{
                    type: Optional
                }] }, { type: McDropdownItem, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i1.FocusMonitor }]; }, propDecorators: { data: [{
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

class McDropdownModule {
}
/** @nocollapse */ McDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownModule, declarations: [McDropdown,
        McDropdownItem,
        McDropdownTrigger,
        McDropdownContent], imports: [CommonModule,
        OverlayModule,
        McIconModule], exports: [McDropdown,
        McDropdownItem,
        McDropdownTrigger,
        McDropdownContent] });
/** @nocollapse */ McDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownModule, providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[
            CommonModule,
            OverlayModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McIconModule
                    ],
                    exports: [
                        McDropdown,
                        McDropdownItem,
                        McDropdownTrigger,
                        McDropdownContent
                    ],
                    declarations: [
                        McDropdown,
                        McDropdownItem,
                        McDropdownTrigger,
                        McDropdownContent
                    ],
                    providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MC_DROPDOWN_DEFAULT_OPTIONS, MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY, MC_DROPDOWN_PANEL, MC_DROPDOWN_SCROLL_STRATEGY, MC_DROPDOWN_SCROLL_STRATEGY_FACTORY, MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER, McDropdown, McDropdownContent, McDropdownItem, McDropdownModule, McDropdownTrigger, NESTED_PANEL_LEFT_PADDING, NESTED_PANEL_TOP_PADDING, fadeInItems, mcDropdownAnimations, throwMcDropdownInvalidPositionX, throwMcDropdownInvalidPositionY, throwMcDropdownMissingError, transformDropdown };
//# sourceMappingURL=ptsecurity-mosaic-dropdown.js.map

import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Directive, TemplateRef, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, Inject, InjectionToken, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Optional, Input, ViewChild, EventEmitter, NgZone, ContentChildren, ContentChild, Output, Self, NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { TemplatePortal, DomPortalOutlet } from '@angular/cdk/portal';
import { Subject, Subscription, merge, of, asapScheduler } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { mixinTabIndex, mixinDisabled } from '@ptsecurity/mosaic/core';
import { Directionality } from '@angular/cdk/bidi';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, ESCAPE, SPACE, ENTER } from '@ptsecurity/cdk/keycodes';
import { startWith, switchMap, take, filter, takeUntil, delay } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { trigger, state, style, transition, group, query, animate } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-content.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Dropdown content that will be rendered lazily once the dropdown is opened.
 */
class McDropdownContent {
    /**
     * @param {?} _template
     * @param {?} _componentFactoryResolver
     * @param {?} _appRef
     * @param {?} _injector
     * @param {?} _viewContainerRef
     * @param {?} _document
     */
    constructor(_template, _componentFactoryResolver, _appRef, _injector, _viewContainerRef, _document) {
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
     * \@docs-private
     * @param {?=} context
     * @return {?}
     */
    attach(context = {}) {
        if (!this.portal) {
            this.portal = new TemplatePortal(this._template, this._viewContainerRef);
        }
        this.detach();
        if (!this.outlet) {
            this.outlet = new DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
        }
        /** @type {?} */
        const element = this._template.elementRef.nativeElement;
        // Because we support opening the same dropdown from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        (/** @type {?} */ (element.parentNode)).insertBefore(this.outlet.outletElement, element);
        this.portal.attach(this.outlet, context);
        this.attached.next();
    }
    /**
     * Detaches the content.
     * \@docs-private
     * @return {?}
     */
    detach() {
        if (this.portal.isAttached) {
            this.portal.detach();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.outlet) {
            this.outlet.dispose();
        }
    }
}
McDropdownContent.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[mcDropdownContent]'
            },] }
];
/** @nocollapse */
McDropdownContent.ctorParameters = () => [
    { type: TemplateRef },
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /**
     * Emits when the dropdown content has been attached.
     * @type {?}
     */
    McDropdownContent.prototype.attached;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype.portal;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype.outlet;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._template;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._appRef;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    McDropdownContent.prototype._document;
}

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-panel.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * \@docs-private
 * @type {?}
 */
const MC_DROPDOWN_PANEL = new InjectionToken('MC_DROPDOWN_PANEL');
/**
 * Interface for a custom dropdown panel that can be used with `mcDropdownTriggerFor`.
 * \@docs-private
 * @record
 * @template T
 */
function McDropdownPanel() { }
if (false) {
    /** @type {?} */
    McDropdownPanel.prototype.xPosition;
    /** @type {?} */
    McDropdownPanel.prototype.yPosition;
    /** @type {?} */
    McDropdownPanel.prototype.overlapTriggerX;
    /** @type {?} */
    McDropdownPanel.prototype.overlapTriggerY;
    /** @type {?} */
    McDropdownPanel.prototype.templateRef;
    /** @type {?} */
    McDropdownPanel.prototype.closed;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.parent;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.direction;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.lazyContent;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.backdropClass;
    /** @type {?|undefined} */
    McDropdownPanel.prototype.hasBackdrop;
    /**
     * @param {?=} origin
     * @return {?}
     */
    McDropdownPanel.prototype.focusFirstItem = function (origin) { };
    /**
     * @return {?}
     */
    McDropdownPanel.prototype.resetActiveItem = function () { };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    McDropdownPanel.prototype.setPositionClasses = function (x, y) { };
    /**
     * @param {?} item
     * @return {?}
     */
    McDropdownPanel.prototype.addItem = function (item) { };
    /**
     * @param {?} item
     * @return {?}
     */
    McDropdownPanel.prototype.removeItem = function (item) { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-item.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Boilerplate for applying mixins to McDropdownItem.
/**
 * \@docs-private
 */
class McDropdownItemBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McDropdownItemMixinBase = mixinTabIndex(mixinDisabled(McDropdownItemBase));
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
class McDropdownItem extends McDropdownItemMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _focusMonitor
     * @param {?} document
     * @param {?=} _parentDropdownPanel
     */
    constructor(_elementRef, _focusMonitor, document, _parentDropdownPanel) {
        super();
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.document = document;
        this._parentDropdownPanel = _parentDropdownPanel;
        /**
         * ARIA role for the dropdown item.
         */
        this.role = 'menuitem';
        /**
         * Stream that emits when the dropdown item is hovered.
         */
        this.hovered = new Subject();
        /**
         * Whether the dropdown item is highlighted.
         */
        this.highlighted = false;
        /**
         * Whether the dropdown item acts as a trigger for a nested dropdown.
         */
        this.triggersNestedDropdown = false;
        if (_focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for dropdown items only when the focus was not caused by a
            // mouse or touch interaction.
            _focusMonitor.monitor(this._elementRef.nativeElement, false);
        }
        if (_parentDropdownPanel && _parentDropdownPanel.addItem) {
            _parentDropdownPanel.addItem(this);
        }
    }
    /**
     * Focuses the dropdown item.
     * @param {?=} origin
     * @return {?}
     */
    focus(origin = 'program') {
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this.getHostElement(), origin);
        }
        else {
            this.getHostElement().focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
        if (this._parentDropdownPanel && this._parentDropdownPanel.removeItem) {
            this._parentDropdownPanel.removeItem(this);
        }
        this.hovered.complete();
    }
    /**
     * Returns the host DOM element.
     * @return {?}
     */
    getHostElement() {
        return this._elementRef.nativeElement;
    }
    /**
     * Prevents the default element actions if it is disabled.
     * @param {?} event
     * @return {?}
     */
    haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * Emits to the hover stream.
     * @return {?}
     */
    handleMouseEnter() {
        this.hovered.next(this);
    }
    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    getLabel() {
        /** @type {?} */
        const element = this.content.nativeElement;
        // tslint:disable-next-line:no-magic-numbers
        /** @type {?} */
        const textNodeType = this.document ? this.document.TEXT_NODE : 3;
        /** @type {?} */
        let output = '';
        if (element.childNodes) {
            /** @type {?} */
            const length = element.childNodes.length;
            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (let i = 0; i < length; i++) {
                if (element.childNodes[i].nodeType === textNodeType) {
                    output += element.childNodes[i].textContent;
                }
            }
        }
        return output.trim();
    }
}
McDropdownItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-dropdown-item, [mc-dropdown-item]',
                exportAs: 'mcDropdownItem',
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-dropdown__item',
                    '[class.mc-dropdown__item_highlighted]': 'highlighted',
                    '[class.mc-disabled]': 'disabled',
                    '[attr.role]': 'role',
                    '[attr.tabindex]': 'tabIndex',
                    '(click)': 'haltDisabledEvents($event)',
                    '(mouseenter)': 'handleMouseEnter()'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
        <div #content>
            <ng-content></ng-content>
        </div>
        <i *ngIf="triggersNestedDropdown" mc-icon="mc-angle-right-M_16" class="mc-dropdown__trigger"></i>
    `
            }] }
];
/** @nocollapse */
McDropdownItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DROPDOWN_PANEL,] }] }
];
McDropdownItem.propDecorators = {
    role: [{ type: Input }],
    content: [{ type: ViewChild, args: ['content', { static: false },] }]
};
if (false) {
    /**
     * ARIA role for the dropdown item.
     * @type {?}
     */
    McDropdownItem.prototype.role;
    /** @type {?} */
    McDropdownItem.prototype.content;
    /**
     * Stream that emits when the dropdown item is hovered.
     * @type {?}
     */
    McDropdownItem.prototype.hovered;
    /**
     * Whether the dropdown item is highlighted.
     * @type {?}
     */
    McDropdownItem.prototype.highlighted;
    /**
     * Whether the dropdown item acts as a trigger for a nested dropdown.
     * @type {?}
     */
    McDropdownItem.prototype.triggersNestedDropdown;
    /**
     * @type {?}
     * @private
     */
    McDropdownItem.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    McDropdownItem.prototype._focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McDropdownItem.prototype.document;
    /**
     * @type {?}
     * @private
     */
    McDropdownItem.prototype._parentDropdownPanel;
}

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-errors.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Throws an exception for the case when dropdown trigger doesn't have a valid mc-dropdown instance
 * \@docs-private
 * @return {?}
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
 * \@docs-private
 * @return {?}
 */
function throwMcDropdownInvalidPositionX() {
    throw Error(`xPosition value must be either 'before' or after'.
      Example: <mc-dropdown xPosition="before" #dropdown="mcDropdown"></mc-dropdown>`);
}
/**
 * Throws an exception for the case when dropdown's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * \@docs-private
 * @return {?}
 */
function throwMcDropdownInvalidPositionY() {
    throw Error(`yPosition value must be either 'above' or below'.
      Example: <mc-dropdown yPosition="above" #dropdown="mcDropdown"></mc-dropdown>`);
}

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Animations used by the mc-dropdown component.
 * \@docs-private
 * @type {?}
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
/** @type {?} */
const fadeInItems = mcDropdownAnimations.fadeInItems;
/** @type {?} */
const transformDropdown = mcDropdownAnimations.transformDropdown;

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Default `mc-dropdown` options that can be overridden.
 * @record
 */
function McDropdownDefaultOptions() { }
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
const MC_DROPDOWN_DEFAULT_OPTIONS = new InjectionToken('mc-dropdown-default-options', {
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
class McDropdown {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _defaultOptions
     */
    constructor(_elementRef, _ngZone, _defaultOptions) {
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
    /**
     * Position of the dropdown in the X axis.
     * @return {?}
     */
    get xPosition() {
        return this._xPosition;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set xPosition(value) {
        if (value !== 'before' && value !== 'after') {
            throwMcDropdownInvalidPositionX();
        }
        this._xPosition = value;
        this.setPositionClasses();
    }
    /**
     * Position of the dropdown in the Y axis.
     * @return {?}
     */
    get yPosition() {
        return this._yPosition;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set yPosition(value) {
        if (value !== 'above' && value !== 'below') {
            throwMcDropdownInvalidPositionY();
        }
        this._yPosition = value;
        this.setPositionClasses();
    }
    /**
     * Whether the dropdown should overlap its trigger vertically.
     * @return {?}
     */
    get overlapTriggerY() {
        return this._overlapTriggerY;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set overlapTriggerY(value) {
        this._overlapTriggerY = coerceBooleanProperty(value);
    }
    /**
     * Whether the dropdown should overlap its trigger horizontally.
     * @return {?}
     */
    get overlapTriggerX() {
        return this._overlapTriggerX;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set overlapTriggerX(value) {
        this._overlapTriggerX = coerceBooleanProperty(value);
    }
    /**
     * Whether the dropdown has a backdrop.
     * @return {?}
     */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * This method takes classes set on the host mc-dropdown element and applies them on the
     * dropdown template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing dropdown from outside the component.
     * @param {?} classes list of class names
     * @return {?}
     */
    set panelClass(classes) {
        /** @type {?} */
        const previousPanelClass = this.previousPanelClass;
        if (previousPanelClass && previousPanelClass.length) {
            previousPanelClass.split(' ').forEach((/**
             * @param {?} className
             * @return {?}
             */
            (className) => {
                this.classList[className] = false;
            }));
        }
        this.previousPanelClass = classes;
        if (classes && classes.length) {
            classes.split(' ').forEach((/**
             * @param {?} className
             * @return {?}
             */
            (className) => {
                this.classList[className] = true;
            }));
            this._elementRef.nativeElement.className = '';
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setPositionClasses();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.keyManager = new FocusKeyManager(this.items)
            .withWrap()
            .withTypeAhead();
        this.tabSubscription = this.keyManager.tabOut.subscribe((/**
         * @return {?}
         */
        () => this.closed.emit('tab')));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.tabSubscription.unsubscribe();
        this.closed.complete();
    }
    /**
     * Stream that emits whenever the hovered dropdown item changes.
     * @return {?}
     */
    hovered() {
        return this.itemChanges.pipe(startWith(this.itemsArray), switchMap((/**
         * @param {?} items
         * @return {?}
         */
        (items) => merge(...items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.hovered))))));
    }
    /**
     * Handle a keyboard event from the dropdown, delegating to the appropriate action.
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
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
        }
    }
    /**
     * @return {?}
     */
    handleClick() {
        this.closed.emit('click');
    }
    /**
     * Focus the first item in the dropdown.
     * @param {?=} origin Action from which the focus originated. Used to set the correct styling.
     * @return {?}
     */
    focusFirstItem(origin = 'program') {
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this._ngZone.onStable.asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => this.keyManager.setFocusOrigin(origin).setFirstItemActive()));
        }
        else {
            this.keyManager.setFocusOrigin(origin).setFirstItemActive();
        }
    }
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     * @return {?}
     */
    resetActiveItem() {
        this.keyManager.setActiveItem(-1);
    }
    /**
     * Registers a dropdown item with the dropdown.
     * \@docs-private
     * @param {?} item
     * @return {?}
     */
    addItem(item) {
        // We register the items through this method, rather than picking them up through
        // `ContentChildren`, because we need the items to be picked up by their closest
        // `mc-dropdown` ancestor. If we used `@ContentChildren(McDropdownItem, {descendants: true})`,
        // all descendant items will bleed into the top-level dropdown in the case where the consumer
        // has `mc-dropdown` instances nested inside each other.
        if (this.itemsArray.indexOf(item) === -1) {
            this.itemsArray.push(item);
            this.itemChanges.next(this.itemsArray);
        }
    }
    /**
     * Removes an item from the dropdown.
     * \@docs-private
     * @param {?} item
     * @return {?}
     */
    removeItem(item) {
        /** @type {?} */
        const index = this.itemsArray.indexOf(item);
        if (this.itemsArray.indexOf(item) > -1) {
            this.itemsArray.splice(index, 1);
            this.itemChanges.next(this.itemsArray);
        }
    }
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * \@docs-private
     * @param {?=} posX Position of the dropdown along the x axis.
     * @param {?=} posY Position of the dropdown along the y axis.
     * @return {?}
     */
    setPositionClasses(posX = this.xPosition, posY = this.yPosition) {
        /** @type {?} */
        const classes = this.classList;
        classes['mc-dropdown-before'] = posX === 'before';
        classes['mc-dropdown-after'] = posX === 'after';
        classes['mc-dropdown-above'] = posY === 'above';
        classes['mc-dropdown-below'] = posY === 'below';
    }
    /**
     * Starts the enter animation.
     * @return {?}
     */
    startAnimation() {
        this.panelAnimationState = 'enter';
    }
    /**
     * Resets the panel animation to its initial state.
     * @return {?}
     */
    resetAnimation() {
        this.panelAnimationState = 'void';
    }
    /**
     * Callback that is invoked when the panel animation completes.
     * @param {?} event
     * @return {?}
     */
    onAnimationDone(event) {
        this.animationDone.next(event);
        this.isAnimating = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
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
}
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
                styles: [".mc-dropdown__item{align-items:center;border:1px solid transparent;box-sizing:border-box;display:flex;outline:none;padding:5px 15px;position:relative;text-align:left;white-space:nowrap;width:100%}.mc-dropdown__item:not([disabled]):not(.mc-disabled){cursor:pointer}.mc-dropdown__item .mc-dropdown__item-caption{margin-top:4px}.mc-dropdown__trigger{margin-left:auto;padding-left:16px}.mc-dropdown__panel{border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-style:solid;border-width:1px;margin-top:-1px;min-width:100%;overflow:auto;padding:4px 0}.mc-dropdown__content h1,.mc-dropdown__content h2,.mc-dropdown__content h3,.mc-dropdown__content h4,.mc-dropdown__content h5{margin:0;padding:8px 16px 4px}"]
            }] }
];
/** @nocollapse */
McDropdown.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [MC_DROPDOWN_DEFAULT_OPTIONS,] }] }
];
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

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-trigger.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token that determines the scroll handling while the dropdown is open.
 * @type {?}
 */
const MC_DROPDOWN_SCROLL_STRATEGY = new InjectionToken('mc-dropdown-scroll-strategy');
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
    () => overlay.scrollStrategies.reposition());
}
/**
 * \@docs-private
 * @type {?}
 */
const MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DROPDOWN_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
};
/**
 * Default top padding of the nested dropdown panel.
 * @type {?}
 */
const NESTED_PANEL_TOP_PADDING = 2;
/**
 * Options for binding a passive event listener.
 * @type {?}
 */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
class McDropdownTrigger {
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
        const parentClose = this._parent ? this._parent.closed : of();
        /** @type {?} */
        const hover = this._parent ? this._parent.hovered().pipe(filter((/**
         * @param {?} active
         * @return {?}
         */
        (active) => active !== this._dropdownItemInstance)), filter((/**
         * @return {?}
         */
        () => this._opened))) : of();
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

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McDropdownModule {
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-positions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-dropdown.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_DROPDOWN_DEFAULT_OPTIONS, MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY, MC_DROPDOWN_PANEL, MC_DROPDOWN_SCROLL_STRATEGY, MC_DROPDOWN_SCROLL_STRATEGY_FACTORY, MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER, McDropdown, McDropdownContent, McDropdownItem, McDropdownItemBase, McDropdownItemMixinBase, McDropdownModule, McDropdownTrigger, NESTED_PANEL_TOP_PADDING, fadeInItems, mcDropdownAnimations, throwMcDropdownInvalidPositionX, throwMcDropdownInvalidPositionY, throwMcDropdownMissingError, transformDropdown };
//# sourceMappingURL=ptsecurity-mosaic-dropdown.js.map

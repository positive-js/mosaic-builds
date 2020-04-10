/**
 * @fileoverview added by tsickle
 * Generated from: navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Directive, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
/** @type {?} */
const COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
export class McNavbarLogo {
}
McNavbarLogo.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-logo',
                host: {
                    class: 'mc-navbar-logo'
                }
            },] }
];
export class McNavbarBrand {
}
McNavbarBrand.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-brand',
                host: {
                    class: 'mc-navbar-brand'
                }
            },] }
];
export class McNavbarTitle {
}
McNavbarTitle.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-title',
                host: {
                    class: 'mc-navbar-title'
                }
            },] }
];
export class McNavbarItemBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
if (false) {
    /** @type {?} */
    McNavbarItemBase.prototype.elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
export class McNavbarItem extends McNavbarMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _focusMonitor
     */
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
        this.tabIndex = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsedTitle(value) {
        this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.denyClickIfDisabled();
        this._focusMonitor.monitor(this.elementRef.nativeElement, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    /**
     * @private
     * @return {?}
     */
    denyClickIfDisabled() {
        /** @type {?} */
        const events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.elementRef.nativeElement.removeEventListener('click', event)));
        this.elementRef.nativeElement.addEventListener('click', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }), true);
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.elementRef.nativeElement.addEventListener('click', event)));
    }
}
McNavbarItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar-item',
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled'],
                host: {
                    '[attr.tabIndex]': 'disabled ? -1 : tabIndex',
                    '[attr.disabled]': 'disabled || null',
                    class: 'mc-navbar-item'
                }
            }] }
];
/** @nocollapse */
McNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McNavbarItem.propDecorators = {
    tabIndex: [{ type: Input }],
    collapsedTitle: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McNavbarItem.prototype.tabIndex;
    /** @type {?} */
    McNavbarItem.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McNavbarItem.prototype._focusMonitor;
}
export class McNavbarContainer {
    constructor() {
        this.position = 'left';
    }
    /**
     * @return {?}
     */
    get cssClasses() {
        return this.position === 'left' ? 'mc-navbar-left' : 'mc-navbar-right';
    }
}
McNavbarContainer.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-container'
            },] }
];
McNavbarContainer.propDecorators = {
    position: [{ type: Input }],
    cssClasses: [{ type: HostBinding, args: ['class',] }]
};
if (false) {
    /** @type {?} */
    McNavbarContainer.prototype.position;
}
class CollapsibleItem {
    /**
     * @param {?} element
     * @param {?} width
     */
    constructor(element, width) {
        this.element = element;
        this.width = width;
        this.collapsed = false;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    processCollapsed(collapsed) {
        this.collapsed = collapsed;
        this.updateCollapsedClass();
    }
    /**
     * @private
     * @return {?}
     */
    updateCollapsedClass() {
        if (this.collapsed) {
            this.element.classList.add(COLLAPSED_CLASS);
        }
        else {
            this.element.classList.remove(COLLAPSED_CLASS);
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    CollapsibleItem.prototype.collapsed;
    /** @type {?} */
    CollapsibleItem.prototype.element;
    /** @type {?} */
    CollapsibleItem.prototype.width;
}
class CachedItemWidth {
    /**
     * @param {?} element
     * @param {?} width
     * @param {?=} itemsForCollapse
     */
    constructor(element, width, itemsForCollapse = []) {
        this.element = element;
        this.width = width;
        this.itemsForCollapse = itemsForCollapse;
    }
    /**
     * @return {?}
     */
    get canCollapse() {
        return this.itemsForCollapse.length > 0;
    }
    /**
     * @return {?}
     */
    get collapsedItemsWidth() {
        if (this._collapsedItemsWidth !== undefined) {
            return this._collapsedItemsWidth;
        }
        this.calculateAndCacheCollapsedItemsWidth();
        return this._collapsedItemsWidth;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    processCollapsed(collapsed) {
        if (this.itemsForCollapse.length > 0) {
            this.updateTitle(collapsed);
        }
        this.itemsForCollapse.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.processCollapsed(collapsed)));
    }
    /**
     * @private
     * @return {?}
     */
    calculateAndCacheCollapsedItemsWidth() {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce((/**
         * @param {?} acc
         * @param {?} item
         * @return {?}
         */
        (acc, item) => acc + item.width), 0);
    }
    /**
     * @private
     * @return {?}
     */
    getTitle() {
        /** @type {?} */
        const computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    }
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    updateTitle(collapsed) {
        if (collapsed) {
            this.element.setAttribute('title', this.getTitle());
        }
        else {
            this.element.removeAttribute('title');
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    CachedItemWidth.prototype._collapsedItemsWidth;
    /** @type {?} */
    CachedItemWidth.prototype.element;
    /** @type {?} */
    CachedItemWidth.prototype.width;
    /** @type {?} */
    CachedItemWidth.prototype.itemsForCollapse;
}
export class McNavbar {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.forceRecalculateItemsWidth = false;
        this.resizeDebounceInterval = 100;
        this.firstLevelElement = 'mc-navbar-container';
        this.secondLevelElements = [
            'mc-navbar-item',
            'mc-navbar-brand',
            'mc-navbar-title'
        ];
        /** @type {?} */
        const resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this.resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    /**
     * @private
     * @return {?}
     */
    get maxAllowedWidth() {
        return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
    }
    /**
     * @private
     * @return {?}
     */
    get itemsWidths() {
        if (this._itemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this._itemsWidths;
        }
        this.calculateAndCacheItemsWidth();
        return this._itemsWidths;
    }
    /**
     * @private
     * @return {?}
     */
    get totalItemsWidth() {
        if (this.totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this.totalItemsWidths;
        }
        this.calculateAndCacheTotalItemsWidth();
        return this.totalItemsWidths;
    }
    /**
     * @return {?}
     */
    updateCollapsed() {
        /** @type {?} */
        let collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (let i = this.itemsWidths.length - 1; i >= 0; i--) {
            /** @type {?} */
            const item = this.itemsWidths[i];
            if (!item.canCollapse) {
                continue;
            }
            item.processCollapsed(collapseDelta > 0);
            collapseDelta -= item.collapsedItemsWidth;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout((/**
         * @return {?}
         */
        () => this.updateCollapsed()), 0);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    calculateAndCacheTotalItemsWidth() {
        this.totalItemsWidths = this.itemsWidths
            .reduce((/**
         * @param {?} acc
         * @param {?} item
         * @return {?}
         */
        (acc, item) => acc + item.width), 0);
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    getOuterElementWidth(element) {
        /** @type {?} */
        const baseWidth = element.getBoundingClientRect().width;
        /** @type {?} */
        const marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        /** @type {?} */
        const marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    }
    /**
     * @private
     * @return {?}
     */
    calculateAndCacheItemsWidth() {
        /** @type {?} */
        const allItemsSelector = this.secondLevelElements
            .map((/**
         * @param {?} e
         * @return {?}
         */
        (e) => `${this.firstLevelElement}>${e}`));
        /** @type {?} */
        const allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map((/**
         * @param {?} el
         * @return {?}
         */
        (el) => new CachedItemWidth(el, this.getOuterElementWidth(el), this.getItemsForCollapse(el))));
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    getItemsForCollapse(element) {
        /** @type {?} */
        const icon = element.querySelector(`[mc-icon],mc-navbar-logo,[mc-navbar-logo]`);
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll('mc-navbar-title'))
            .map((/**
         * @param {?} el
         * @return {?}
         */
        (el) => new CollapsibleItem((/** @type {?} */ (el)), el.getBoundingClientRect().width)));
    }
}
McNavbar.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar',
                template: `
        <nav class="mc-navbar">
            <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
        </nav>
    `,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar [mc-icon]{min-width:16px;min-height:16px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"]
            }] }
];
/** @nocollapse */
McNavbar.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.forceRecalculateItemsWidth;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.resizeDebounceInterval;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.firstLevelElement;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.secondLevelElements;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.totalItemsWidths;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype._itemsWidths;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype.resizeSubscription;
    /**
     * @type {?}
     * @private
     */
    McNavbar.prototype._elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9uYXZiYXIvIiwic291cmNlcyI6WyJuYXZiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFFSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7TUFHeEMsZUFBZSxHQUFXLDJCQUEyQjtBQVUzRCxNQUFNLE9BQU8sWUFBWTs7O1lBTnhCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGdCQUFnQjtpQkFDMUI7YUFDSjs7QUFTRCxNQUFNLE9BQU8sYUFBYTs7O1lBTnpCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjtpQkFDM0I7YUFDSjs7QUFTRCxNQUFNLE9BQU8sYUFBYTs7O1lBTnpCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjtpQkFDM0I7YUFDSjs7QUFHRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBQ3pCLFlBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0NBQ2hEOzs7SUFEZSxzQ0FBNkI7Ozs7QUFJN0MsTUFBTSxPQUFP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LG1CQUFjLEVBQUUsRUFBQSxFQUFFLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7SUFDOUYsQ0FBQzs7O1lBcEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7O0tBSVQ7Z0JBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBMU1HLFVBQVU7Ozs7Ozs7SUE2TVYsOENBQTZEOzs7OztJQUM3RCwwQ0FBc0Q7Ozs7O0lBQ3RELHFDQUFtRTs7Ozs7SUFDbkUsdUNBSUU7Ozs7O0lBRUYsb0NBQWlDOzs7OztJQWdCakMsZ0NBQXdDOzs7OztJQVl4QyxzQ0FBeUM7Ozs7O0lBR3JDLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5jb25zdCBDT0xMQVBTRURfQ0xBU1M6IHN0cmluZyA9ICdtYy1uYXZiYXItY29sbGFwc2VkLXRpdGxlJztcblxuZXhwb3J0IHR5cGUgTWNOYXZiYXJDb250YWluZXJQb3NpdGlvblR5cGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1sb2dvJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWxvZ28nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckxvZ28ge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItYnJhbmQnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItYnJhbmQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckJyYW5kIHt9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLXRpdGxlJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLXRpdGxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUaXRsZSB7fVxuXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTmF2YmFyTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY05hdmJhckl0ZW1CYXNlID0gbWl4aW5EaXNhYmxlZChNY05hdmJhckl0ZW1CYXNlKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItaXRlbScsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLnRhYkluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogdGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1pdGVtJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtIGV4dGVuZHMgTWNOYXZiYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ2FuRGlzYWJsZSB7XG5cbiAgICBASW5wdXQoKVxuICAgIHRhYkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgY29sbGFwc2VkVGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbXB1dGVkVGl0bGUnLCBlbmNvZGVVUkkodmFsdWUpKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvclxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kZW55Q2xpY2tJZkRpc2FibGVkKCk7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIGR1ZSB0byBhbmd1bGFyIDIgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTEyMDBcbiAgICBwcml2YXRlIGRlbnlDbGlja0lmRGlzYWJsZWQoKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50czogRXZlbnRbXSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmV2ZW50TGlzdGVuZXJzKCdjbGljaycpO1xuXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCkpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCkpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItY29udGFpbmVyJ1xufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckNvbnRhaW5lciB7XG4gICAgQElucHV0KClcbiAgICBwb3NpdGlvbjogTWNOYXZiYXJDb250YWluZXJQb3NpdGlvblR5cGUgPSAnbGVmdCc7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgICBnZXQgY3NzQ2xhc3NlcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbiA9PT0gJ2xlZnQnID8gJ21jLW5hdmJhci1sZWZ0JyA6ICdtYy1uYXZiYXItcmlnaHQnO1xuICAgIH1cbn1cblxuY2xhc3MgQ29sbGFwc2libGVJdGVtIHtcbiAgICBwcml2YXRlIGNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcHVibGljIHdpZHRoOiBudW1iZXJcbiAgICApIHt9XG5cbiAgICBwcm9jZXNzQ29sbGFwc2VkKGNvbGxhcHNlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IGNvbGxhcHNlZDtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbGxhcHNlZENsYXNzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVDb2xsYXBzZWRDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChDT0xMQVBTRURfQ0xBU1MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ09MTEFQU0VEX0NMQVNTKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5jbGFzcyBDYWNoZWRJdGVtV2lkdGgge1xuXG4gICAgZ2V0IGNhbkNvbGxhcHNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc0ZvckNvbGxhcHNlLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGNvbGxhcHNlZEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZENhY2hlQ29sbGFwc2VkSXRlbXNXaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWRJdGVtc1dpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbGxhcHNlZEl0ZW1zV2lkdGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgaXRlbXNGb3JDb2xsYXBzZTogQ29sbGFwc2libGVJdGVtW10gPSBbXVxuICAgICkge31cblxuICAgIHByb2Nlc3NDb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zRm9yQ29sbGFwc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUaXRsZShjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pdGVtc0ZvckNvbGxhcHNlLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0ucHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZWQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZENhY2hlQ29sbGFwc2VkSXRlbXNXaWR0aCgpIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2VkSXRlbXNXaWR0aCA9IHRoaXMuaXRlbXNGb3JDb2xsYXBzZVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLndpZHRoLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkVGl0bGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjb21wdXRlZFRpdGxlJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXB1dGVkVGl0bGVcbiAgICAgICAgICAgID8gZGVjb2RlVVJJKGNvbXB1dGVkVGl0bGUpXG4gICAgICAgICAgICA6ICh0aGlzLml0ZW1zRm9yQ29sbGFwc2UubGVuZ3RoID4gMCA/IHRoaXMuaXRlbXNGb3JDb2xsYXBzZVswXS5lbGVtZW50LmlubmVyVGV4dCA6ICcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRpdGxlKGNvbGxhcHNlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuZ2V0VGl0bGUoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmF2IGNsYXNzPVwibWMtbmF2YmFyXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWMtbmF2YmFyLWNvbnRhaW5lcl0sIG1jLW5hdmJhci1jb250YWluZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmF2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2YmFyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm9yY2VSZWNhbGN1bGF0ZUl0ZW1zV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpcnN0TGV2ZWxFbGVtZW50OiBzdHJpbmcgPSAnbWMtbmF2YmFyLWNvbnRhaW5lcic7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZWNvbmRMZXZlbEVsZW1lbnRzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ21jLW5hdmJhci1pdGVtJyxcbiAgICAgICAgJ21jLW5hdmJhci1icmFuZCcsXG4gICAgICAgICdtYy1uYXZiYXItdGl0bGUnXG4gICAgXTtcblxuICAgIHByaXZhdGUgdG90YWxJdGVtc1dpZHRoczogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBnZXQgbWF4QWxsb3dlZFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignbmF2JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgaXRlbXNXaWR0aHMoKTogQ2FjaGVkSXRlbVdpZHRoW10ge1xuICAgICAgICBpZiAodGhpcy5faXRlbXNXaWR0aHMgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5mb3JjZVJlY2FsY3VsYXRlSXRlbXNXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zV2lkdGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVBbmRDYWNoZUl0ZW1zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNXaWR0aHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXRlbXNXaWR0aHM6IENhY2hlZEl0ZW1XaWR0aFtdO1xuXG4gICAgcHJpdmF0ZSBnZXQgdG90YWxJdGVtc1dpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnRvdGFsSXRlbXNXaWR0aHMgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5mb3JjZVJlY2FsY3VsYXRlSXRlbXNXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG90YWxJdGVtc1dpZHRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQW5kQ2FjaGVUb3RhbEl0ZW1zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zV2lkdGhzO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkge1xuICAgICAgICBjb25zdCByZXNpemVPYnNlcnZlciA9IGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMucmVzaXplRGVib3VuY2VJbnRlcnZhbCkpO1xuXG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gcmVzaXplT2JzZXJ2ZXIuc3Vic2NyaWJlKHRoaXMudXBkYXRlQ29sbGFwc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbGxhcHNlZCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbGxhcHNlRGVsdGEgPSB0aGlzLnRvdGFsSXRlbXNXaWR0aCAtIHRoaXMubWF4QWxsb3dlZFdpZHRoO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLml0ZW1zV2lkdGhzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1dpZHRoc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFpdGVtLmNhbkNvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ucHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZURlbHRhID4gMCk7XG4gICAgICAgICAgICBjb2xsYXBzZURlbHRhIC09IGl0ZW0uY29sbGFwc2VkSXRlbXNXaWR0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gTm90ZTogdGhpcyB3YWl0IGlzIHJlcXVpcmVkIGZvciBsb2FkaW5nIGFuZCByZW5kZXJpbmcgZm9udHMgZm9yIGljb25zO1xuICAgICAgICAvLyB1bmZvcnR1bmF0ZWx5IHdlIGNhbm5vdCBjb250cm9sIGZvbnQgcmVuZGVyaW5nXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVDb2xsYXBzZWQoKSwgMCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVBbmRDYWNoZVRvdGFsSXRlbXNXaWR0aCgpIHtcbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zV2lkdGhzID0gdGhpcy5pdGVtc1dpZHRoc1xuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLndpZHRoLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE91dGVyRWxlbWVudFdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYmFzZVdpZHRoICA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tcmlnaHQnKSk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkxlZnQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1sZWZ0JykpO1xuXG4gICAgICAgIHJldHVybiBiYXNlV2lkdGggKyBtYXJnaW5SaWdodCArIG1hcmdpbkxlZnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVBbmRDYWNoZUl0ZW1zV2lkdGgoKSB7XG4gICAgICAgIGNvbnN0IGFsbEl0ZW1zU2VsZWN0b3IgPSB0aGlzLnNlY29uZExldmVsRWxlbWVudHNcbiAgICAgICAgICAgIC5tYXAoKGU6IHN0cmluZykgPT4gYCR7dGhpcy5maXJzdExldmVsRWxlbWVudH0+JHtlfWApO1xuICAgICAgICBjb25zdCBhbGxJdGVtczogSFRNTEVsZW1lbnRbXSA9IEFycmF5LmZyb20odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYWxsSXRlbXNTZWxlY3RvcikpO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zV2lkdGhzID0gYWxsSXRlbXNcbiAgICAgICAgICAgIC5tYXAoKGVsKSA9PiBuZXcgQ2FjaGVkSXRlbVdpZHRoKGVsLCB0aGlzLmdldE91dGVyRWxlbWVudFdpZHRoKGVsKSwgdGhpcy5nZXRJdGVtc0ZvckNvbGxhcHNlKGVsKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbXNGb3JDb2xsYXBzZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IENvbGxhcHNpYmxlSXRlbVtdIHtcbiAgICAgICAgY29uc3QgaWNvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgW21jLWljb25dLG1jLW5hdmJhci1sb2dvLFttYy1uYXZiYXItbG9nb11gKTtcblxuICAgICAgICBpZiAoIWljb24pIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWMtbmF2YmFyLXRpdGxlJykpXG4gICAgICAgICAgICAubWFwKChlbCkgPT4gbmV3IENvbGxhcHNpYmxlSXRlbSg8SFRNTEVsZW1lbnQ+IGVsLCBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpO1xuICAgIH1cbn1cbiJdfQ==
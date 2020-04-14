/**
 * @fileoverview added by tsickle
 * Generated from: navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
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
export const McNavbarMixinBase = mixinTabIndex(mixinDisabled(McNavbarItemBase));
export class McNavbarItem extends McNavbarMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _focusMonitor
     */
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
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
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-navbar-item',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null'
                }
            }] }
];
/** @nocollapse */
McNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McNavbarItem.propDecorators = {
    collapsedTitle: [{ type: Input }]
};
if (false) {
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
}
McNavbarContainer.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-container',
                host: {
                    '[class.mc-navbar-left]': 'this.position === "left"',
                    '[class.mc-navbar-right]': 'this.position !== "left"'
                }
            },] }
];
McNavbarContainer.propDecorators = {
    position: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9uYXZiYXIvIiwic291cmNlcyI6WyJuYXZiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFFSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBK0MsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BILE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7TUFHeEMsZUFBZSxHQUFXLDJCQUEyQjtBQVUzRCxNQUFNLE9BQU8sWUFBWTs7O1lBTnhCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGdCQUFnQjtpQkFDMUI7YUFDSjs7QUFTRCxNQUFNLE9BQU8sYUFBYTs7O1lBTnpCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjtpQkFDM0I7YUFDSjs7QUFTRCxNQUFNLE9BQU8sYUFBYTs7O1lBTnpCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjtpQkFDM0I7YUFDSjs7QUFHRCxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBQ3pCLFlBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0NBQ2hEOzs7SUFEZSxzQ0FBNkI7Ozs7QUFJN0MsTUFBTSxPQUFP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QUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7OztLQUlUO2dCQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OztZQWpNRyxVQUFVOzs7Ozs7O0lBb01WLDhDQUE2RDs7Ozs7SUFDN0QsMENBQXNEOzs7OztJQUN0RCxxQ0FBbUU7Ozs7O0lBQ25FLHVDQUlFOzs7OztJQUVGLG9DQUFpQzs7Ozs7SUFnQmpDLGdDQUF3Qzs7Ozs7SUFZeEMsc0NBQXlDOzs7OztJQUdyQywrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgSGFzVGFiSW5kZXhDdG9yLCBtaXhpbkRpc2FibGVkLCBtaXhpblRhYkluZGV4IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5jb25zdCBDT0xMQVBTRURfQ0xBU1M6IHN0cmluZyA9ICdtYy1uYXZiYXItY29sbGFwc2VkLXRpdGxlJztcblxuZXhwb3J0IHR5cGUgTWNOYXZiYXJDb250YWluZXJQb3NpdGlvblR5cGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1sb2dvJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWxvZ28nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckxvZ28ge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItYnJhbmQnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItYnJhbmQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckJyYW5kIHt9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLXRpdGxlJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLXRpdGxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUaXRsZSB7fVxuXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTmF2YmFyTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jTmF2YmFySXRlbUJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNOYXZiYXJJdGVtQmFzZSkpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1pdGVtJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1pdGVtJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbSBleHRlbmRzIE1jTmF2YmFyTWl4aW5CYXNlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENhbkRpc2FibGUge1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGNvbGxhcHNlZFRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb21wdXRlZFRpdGxlJywgZW5jb2RlVVJJKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3JcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZGVueUNsaWNrSWZEaXNhYmxlZCgpO1xuXG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIG1ldGhvZCBpcyByZXF1aXJlZCBkdWUgdG8gYW5ndWxhciAyIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzExMjAwXG4gICAgcHJpdmF0ZSBkZW55Q2xpY2tJZkRpc2FibGVkKCkge1xuICAgICAgICBjb25zdCBldmVudHM6IEV2ZW50W10gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ldmVudExpc3RlbmVycygnY2xpY2snKTtcblxuICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQpKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQpKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWNvbnRhaW5lcicsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLW5hdmJhci1sZWZ0XSc6ICd0aGlzLnBvc2l0aW9uID09PSBcImxlZnRcIicsXG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLXJpZ2h0XSc6ICd0aGlzLnBvc2l0aW9uICE9PSBcImxlZnRcIidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQ29udGFpbmVyIHtcbiAgICBASW5wdXQoKVxuICAgIHBvc2l0aW9uOiBNY05hdmJhckNvbnRhaW5lclBvc2l0aW9uVHlwZSA9ICdsZWZ0Jztcbn1cblxuY2xhc3MgQ29sbGFwc2libGVJdGVtIHtcbiAgICBwcml2YXRlIGNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwdWJsaWMgd2lkdGg6IG51bWJlcikge31cblxuICAgIHByb2Nlc3NDb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gY29sbGFwc2VkO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29sbGFwc2VkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUNvbGxhcHNlZENsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKENPTExBUFNFRF9DTEFTUyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDT0xMQVBTRURfQ0xBU1MpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmNsYXNzIENhY2hlZEl0ZW1XaWR0aCB7XG4gICAgZ2V0IGNhbkNvbGxhcHNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc0ZvckNvbGxhcHNlLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGNvbGxhcHNlZEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZENhY2hlQ29sbGFwc2VkSXRlbXNXaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWRJdGVtc1dpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbGxhcHNlZEl0ZW1zV2lkdGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgaXRlbXNGb3JDb2xsYXBzZTogQ29sbGFwc2libGVJdGVtW10gPSBbXVxuICAgICkge31cblxuICAgIHByb2Nlc3NDb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zRm9yQ29sbGFwc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUaXRsZShjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pdGVtc0ZvckNvbGxhcHNlLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0ucHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZWQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZENhY2hlQ29sbGFwc2VkSXRlbXNXaWR0aCgpIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2VkSXRlbXNXaWR0aCA9IHRoaXMuaXRlbXNGb3JDb2xsYXBzZVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLndpZHRoLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkVGl0bGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjb21wdXRlZFRpdGxlJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXB1dGVkVGl0bGVcbiAgICAgICAgICAgID8gZGVjb2RlVVJJKGNvbXB1dGVkVGl0bGUpXG4gICAgICAgICAgICA6ICh0aGlzLml0ZW1zRm9yQ29sbGFwc2UubGVuZ3RoID4gMCA/IHRoaXMuaXRlbXNGb3JDb2xsYXBzZVswXS5lbGVtZW50LmlubmVyVGV4dCA6ICcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRpdGxlKGNvbGxhcHNlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuZ2V0VGl0bGUoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmF2IGNsYXNzPVwibWMtbmF2YmFyXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWMtbmF2YmFyLWNvbnRhaW5lcl0sIG1jLW5hdmJhci1jb250YWluZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmF2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2YmFyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm9yY2VSZWNhbGN1bGF0ZUl0ZW1zV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpcnN0TGV2ZWxFbGVtZW50OiBzdHJpbmcgPSAnbWMtbmF2YmFyLWNvbnRhaW5lcic7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZWNvbmRMZXZlbEVsZW1lbnRzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ21jLW5hdmJhci1pdGVtJyxcbiAgICAgICAgJ21jLW5hdmJhci1icmFuZCcsXG4gICAgICAgICdtYy1uYXZiYXItdGl0bGUnXG4gICAgXTtcblxuICAgIHByaXZhdGUgdG90YWxJdGVtc1dpZHRoczogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBnZXQgbWF4QWxsb3dlZFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignbmF2JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgaXRlbXNXaWR0aHMoKTogQ2FjaGVkSXRlbVdpZHRoW10ge1xuICAgICAgICBpZiAodGhpcy5faXRlbXNXaWR0aHMgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5mb3JjZVJlY2FsY3VsYXRlSXRlbXNXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zV2lkdGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVBbmRDYWNoZUl0ZW1zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNXaWR0aHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXRlbXNXaWR0aHM6IENhY2hlZEl0ZW1XaWR0aFtdO1xuXG4gICAgcHJpdmF0ZSBnZXQgdG90YWxJdGVtc1dpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnRvdGFsSXRlbXNXaWR0aHMgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5mb3JjZVJlY2FsY3VsYXRlSXRlbXNXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG90YWxJdGVtc1dpZHRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQW5kQ2FjaGVUb3RhbEl0ZW1zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zV2lkdGhzO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkge1xuICAgICAgICBjb25zdCByZXNpemVPYnNlcnZlciA9IGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMucmVzaXplRGVib3VuY2VJbnRlcnZhbCkpO1xuXG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gcmVzaXplT2JzZXJ2ZXIuc3Vic2NyaWJlKHRoaXMudXBkYXRlQ29sbGFwc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbGxhcHNlZCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbGxhcHNlRGVsdGEgPSB0aGlzLnRvdGFsSXRlbXNXaWR0aCAtIHRoaXMubWF4QWxsb3dlZFdpZHRoO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLml0ZW1zV2lkdGhzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1dpZHRoc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFpdGVtLmNhbkNvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ucHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZURlbHRhID4gMCk7XG4gICAgICAgICAgICBjb2xsYXBzZURlbHRhIC09IGl0ZW0uY29sbGFwc2VkSXRlbXNXaWR0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gTm90ZTogdGhpcyB3YWl0IGlzIHJlcXVpcmVkIGZvciBsb2FkaW5nIGFuZCByZW5kZXJpbmcgZm9udHMgZm9yIGljb25zO1xuICAgICAgICAvLyB1bmZvcnR1bmF0ZWx5IHdlIGNhbm5vdCBjb250cm9sIGZvbnQgcmVuZGVyaW5nXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVDb2xsYXBzZWQoKSwgMCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVBbmRDYWNoZVRvdGFsSXRlbXNXaWR0aCgpIHtcbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zV2lkdGhzID0gdGhpcy5pdGVtc1dpZHRoc1xuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLndpZHRoLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE91dGVyRWxlbWVudFdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYmFzZVdpZHRoICA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tcmlnaHQnKSk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkxlZnQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1sZWZ0JykpO1xuXG4gICAgICAgIHJldHVybiBiYXNlV2lkdGggKyBtYXJnaW5SaWdodCArIG1hcmdpbkxlZnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVBbmRDYWNoZUl0ZW1zV2lkdGgoKSB7XG4gICAgICAgIGNvbnN0IGFsbEl0ZW1zU2VsZWN0b3IgPSB0aGlzLnNlY29uZExldmVsRWxlbWVudHNcbiAgICAgICAgICAgIC5tYXAoKGU6IHN0cmluZykgPT4gYCR7dGhpcy5maXJzdExldmVsRWxlbWVudH0+JHtlfWApO1xuICAgICAgICBjb25zdCBhbGxJdGVtczogSFRNTEVsZW1lbnRbXSA9IEFycmF5LmZyb20odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYWxsSXRlbXNTZWxlY3RvcikpO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zV2lkdGhzID0gYWxsSXRlbXNcbiAgICAgICAgICAgIC5tYXAoKGVsKSA9PiBuZXcgQ2FjaGVkSXRlbVdpZHRoKGVsLCB0aGlzLmdldE91dGVyRWxlbWVudFdpZHRoKGVsKSwgdGhpcy5nZXRJdGVtc0ZvckNvbGxhcHNlKGVsKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbXNGb3JDb2xsYXBzZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IENvbGxhcHNpYmxlSXRlbVtdIHtcbiAgICAgICAgY29uc3QgaWNvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgW21jLWljb25dLG1jLW5hdmJhci1sb2dvLFttYy1uYXZiYXItbG9nb11gKTtcblxuICAgICAgICBpZiAoIWljb24pIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWMtbmF2YmFyLXRpdGxlJykpXG4gICAgICAgICAgICAubWFwKChlbCkgPT4gbmV3IENvbGxhcHNpYmxlSXRlbSg8SFRNTEVsZW1lbnQ+IGVsLCBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpO1xuICAgIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * Generated from: navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{flex-shrink:0;height:100%}.mc-navbar,.mc-navbar-left,.mc-navbar-right,mc-navbar-container{align-items:center;display:flex;flex-direction:row;justify-content:space-between}.mc-navbar{height:48px;padding:0;position:relative}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar [mc-icon]{min-height:16px;min-width:16px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{align-items:center;display:flex;height:100%;padding-left:16px;padding-right:16px;position:relative}.mc-navbar-brand,mc-navbar-brand{margin-right:24px;padding-left:0;padding-right:12px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL25hdmJhci8iLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVILFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUErQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEgsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOztNQUd4QyxlQUFlLEdBQVcsMkJBQTJCO0FBVTNELE1BQU0sT0FBTyxZQUFZOzs7WUFOeEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsZ0JBQWdCO2lCQUMxQjthQUNKOztBQVNELE1BQU0sT0FBTyxhQUFhOzs7WUFOekIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsaUJBQWlCO2lCQUMzQjthQUNKOztBQVNELE1BQU0sT0FBTyxhQUFhOzs7WUFOekIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsaUJBQWlCO2lCQUMzQjthQUNKOztBQUdELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFDekIsWUFBbUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7Q0FDaEQ7OztJQURlLHNDQUE2Qjs7OztB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Q0FBQzs7O1lBcEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7O0tBSVQ7Z0JBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBak1HLFVBQVU7Ozs7Ozs7SUFvTVYsOENBQTZEOzs7OztJQUM3RCwwQ0FBc0Q7Ozs7O0lBQ3RELHFDQUFtRTs7Ozs7SUFDbkUsdUNBSUU7Ozs7O0lBRUYsb0NBQWlDOzs7OztJQWdCakMsZ0NBQXdDOzs7OztJQVl4QyxzQ0FBeUM7Ozs7O0lBR3JDLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBIYXNUYWJJbmRleEN0b3IsIG1peGluRGlzYWJsZWQsIG1peGluVGFiSW5kZXggfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmNvbnN0IENPTExBUFNFRF9DTEFTUzogc3RyaW5nID0gJ21jLW5hdmJhci1jb2xsYXBzZWQtdGl0bGUnO1xuXG5leHBvcnQgdHlwZSBNY05hdmJhckNvbnRhaW5lclBvc2l0aW9uVHlwZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWxvZ28nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItbG9nbydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyTG9nbyB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1icmFuZCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1icmFuZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQnJhbmQge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItdGl0bGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItdGl0bGUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhclRpdGxlIHt9XG5cbmV4cG9ydCBjbGFzcyBNY05hdmJhckl0ZW1CYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNOYXZiYXJNaXhpbkJhc2U6XG4gICAgSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNOYXZiYXJJdGVtQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY05hdmJhckl0ZW1CYXNlKSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtIGV4dGVuZHMgTWNOYXZiYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ2FuRGlzYWJsZSB7XG4gICAgQElucHV0KClcbiAgICBzZXQgY29sbGFwc2VkVGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbXB1dGVkVGl0bGUnLCBlbmNvZGVVUkkodmFsdWUpKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvclxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kZW55Q2xpY2tJZkRpc2FibGVkKCk7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIGR1ZSB0byBhbmd1bGFyIDIgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTEyMDBcbiAgICBwcml2YXRlIGRlbnlDbGlja0lmRGlzYWJsZWQoKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50czogRXZlbnRbXSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmV2ZW50TGlzdGVuZXJzKCdjbGljaycpO1xuXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCkpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCkpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItY29udGFpbmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLWxlZnRdJzogJ3RoaXMucG9zaXRpb24gPT09IFwibGVmdFwiJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1uYXZiYXItcmlnaHRdJzogJ3RoaXMucG9zaXRpb24gIT09IFwibGVmdFwiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJDb250YWluZXIge1xuICAgIEBJbnB1dCgpXG4gICAgcG9zaXRpb246IE1jTmF2YmFyQ29udGFpbmVyUG9zaXRpb25UeXBlID0gJ2xlZnQnO1xufVxuXG5jbGFzcyBDb2xsYXBzaWJsZUl0ZW0ge1xuICAgIHByaXZhdGUgY29sbGFwc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsIHB1YmxpYyB3aWR0aDogbnVtYmVyKSB7fVxuXG4gICAgcHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb2xsYXBzZWRDbGFzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ29sbGFwc2VkQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ09MTEFQU0VEX0NMQVNTKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENPTExBUFNFRF9DTEFTUyk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuY2xhc3MgQ2FjaGVkSXRlbVdpZHRoIHtcbiAgICBnZXQgY2FuQ29sbGFwc2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zRm9yQ29sbGFwc2UubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgY29sbGFwc2VkSXRlbXNXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fY29sbGFwc2VkSXRlbXNXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkSXRlbXNXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQW5kQ2FjaGVDb2xsYXBzZWRJdGVtc1dpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VkSXRlbXNXaWR0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcHVibGljIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBpdGVtc0ZvckNvbGxhcHNlOiBDb2xsYXBzaWJsZUl0ZW1bXSA9IFtdXG4gICAgKSB7fVxuXG4gICAgcHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNGb3JDb2xsYXBzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLml0ZW1zRm9yQ29sbGFwc2UuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5wcm9jZXNzQ29sbGFwc2VkKGNvbGxhcHNlZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlQW5kQ2FjaGVDb2xsYXBzZWRJdGVtc1dpZHRoKCkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZWRJdGVtc1dpZHRoID0gdGhpcy5pdGVtc0ZvckNvbGxhcHNlXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0ud2lkdGgsIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY29tcHV0ZWRUaXRsZSA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NvbXB1dGVkVGl0bGUnKTtcblxuICAgICAgICByZXR1cm4gY29tcHV0ZWRUaXRsZVxuICAgICAgICAgICAgPyBkZWNvZGVVUkkoY29tcHV0ZWRUaXRsZSlcbiAgICAgICAgICAgIDogKHRoaXMuaXRlbXNGb3JDb2xsYXBzZS5sZW5ndGggPiAwID8gdGhpcy5pdGVtc0ZvckNvbGxhcHNlWzBdLmVsZW1lbnQuaW5uZXJUZXh0IDogJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVGl0bGUoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5nZXRUaXRsZSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RpdGxlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuYXYgY2xhc3M9XCJtYy1uYXZiYXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItY29udGFpbmVyXSwgbWMtbmF2YmFyLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9uYXY+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9uYXZiYXIuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBmb3JjZVJlY2FsY3VsYXRlSXRlbXNXaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVzaXplRGVib3VuY2VJbnRlcnZhbDogbnVtYmVyID0gMTAwO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZmlyc3RMZXZlbEVsZW1lbnQ6IHN0cmluZyA9ICdtYy1uYXZiYXItY29udGFpbmVyJztcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlY29uZExldmVsRWxlbWVudHM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgICAgICAnbWMtbmF2YmFyLWJyYW5kJyxcbiAgICAgICAgJ21jLW5hdmJhci10aXRsZSdcbiAgICBdO1xuXG4gICAgcHJpdmF0ZSB0b3RhbEl0ZW1zV2lkdGhzOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGdldCBtYXhBbGxvd2VkV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBpdGVtc1dpZHRocygpOiBDYWNoZWRJdGVtV2lkdGhbXSB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtc1dpZHRocyAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmZvcmNlUmVjYWxjdWxhdGVJdGVtc1dpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNXaWR0aHM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZENhY2hlSXRlbXNXaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1dpZHRocztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pdGVtc1dpZHRoczogQ2FjaGVkSXRlbVdpZHRoW107XG5cbiAgICBwcml2YXRlIGdldCB0b3RhbEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMudG90YWxJdGVtc1dpZHRocyAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmZvcmNlUmVjYWxjdWxhdGVJdGVtc1dpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zV2lkdGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVBbmRDYWNoZVRvdGFsSXRlbXNXaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnRvdGFsSXRlbXNXaWR0aHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHJlc2l6ZU9ic2VydmVyID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUodGhpcy5yZXNpemVEZWJvdW5jZUludGVydmFsKSk7XG5cbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSByZXNpemVPYnNlcnZlci5zdWJzY3JpYmUodGhpcy51cGRhdGVDb2xsYXBzZWQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sbGFwc2VkKCk6IHZvaWQge1xuICAgICAgICBsZXQgY29sbGFwc2VEZWx0YSA9IHRoaXMudG90YWxJdGVtc1dpZHRoIC0gdGhpcy5tYXhBbGxvd2VkV2lkdGg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaXRlbXNXaWR0aHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zV2lkdGhzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW0uY2FuQ29sbGFwc2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5wcm9jZXNzQ29sbGFwc2VkKGNvbGxhcHNlRGVsdGEgPiAwKTtcbiAgICAgICAgICAgIGNvbGxhcHNlRGVsdGEgLT0gaXRlbS5jb2xsYXBzZWRJdGVtc1dpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBOb3RlOiB0aGlzIHdhaXQgaXMgcmVxdWlyZWQgZm9yIGxvYWRpbmcgYW5kIHJlbmRlcmluZyBmb250cyBmb3IgaWNvbnM7XG4gICAgICAgIC8vIHVuZm9ydHVuYXRlbHkgd2UgY2Fubm90IGNvbnRyb2wgZm9udCByZW5kZXJpbmdcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUNvbGxhcHNlZCgpLCAwKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZENhY2hlVG90YWxJdGVtc1dpZHRoKCkge1xuICAgICAgICB0aGlzLnRvdGFsSXRlbXNXaWR0aHMgPSB0aGlzLml0ZW1zV2lkdGhzXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0ud2lkdGgsIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3V0ZXJFbGVtZW50V2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBiYXNlV2lkdGggID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1yaWdodCcpKTtcbiAgICAgICAgY29uc3QgbWFyZ2luTGVmdCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWxlZnQnKSk7XG5cbiAgICAgICAgcmV0dXJuIGJhc2VXaWR0aCArIG1hcmdpblJpZ2h0ICsgbWFyZ2luTGVmdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZENhY2hlSXRlbXNXaWR0aCgpIHtcbiAgICAgICAgY29uc3QgYWxsSXRlbXNTZWxlY3RvciA9IHRoaXMuc2Vjb25kTGV2ZWxFbGVtZW50c1xuICAgICAgICAgICAgLm1hcCgoZTogc3RyaW5nKSA9PiBgJHt0aGlzLmZpcnN0TGV2ZWxFbGVtZW50fT4ke2V9YCk7XG4gICAgICAgIGNvbnN0IGFsbEl0ZW1zOiBIVE1MRWxlbWVudFtdID0gQXJyYXkuZnJvbSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChhbGxJdGVtc1NlbGVjdG9yKSk7XG5cbiAgICAgICAgdGhpcy5faXRlbXNXaWR0aHMgPSBhbGxJdGVtc1xuICAgICAgICAgICAgLm1hcCgoZWwpID0+IG5ldyBDYWNoZWRJdGVtV2lkdGgoZWwsIHRoaXMuZ2V0T3V0ZXJFbGVtZW50V2lkdGgoZWwpLCB0aGlzLmdldEl0ZW1zRm9yQ29sbGFwc2UoZWwpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJdGVtc0ZvckNvbGxhcHNlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogQ29sbGFwc2libGVJdGVtW10ge1xuICAgICAgICBjb25zdCBpY29uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbbWMtaWNvbl0sbWMtbmF2YmFyLWxvZ28sW21jLW5hdmJhci1sb2dvXWApO1xuXG4gICAgICAgIGlmICghaWNvbikge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYy1uYXZiYXItdGl0bGUnKSlcbiAgICAgICAgICAgIC5tYXAoKGVsKSA9PiBuZXcgQ29sbGFwc2libGVJdGVtKDxIVE1MRWxlbWVudD4gZWwsIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSk7XG4gICAgfVxufVxuIl19
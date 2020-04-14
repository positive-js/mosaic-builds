/**
 * @fileoverview added by tsickle
 * Generated from: navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
/** @type {?} */
var COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
var McNavbarLogo = /** @class */ (function () {
    function McNavbarLogo() {
    }
    McNavbarLogo.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-navbar-logo',
                    host: {
                        class: 'mc-navbar-logo'
                    }
                },] }
    ];
    return McNavbarLogo;
}());
export { McNavbarLogo };
var McNavbarBrand = /** @class */ (function () {
    function McNavbarBrand() {
    }
    McNavbarBrand.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-navbar-brand',
                    host: {
                        class: 'mc-navbar-brand'
                    }
                },] }
    ];
    return McNavbarBrand;
}());
export { McNavbarBrand };
var McNavbarTitle = /** @class */ (function () {
    function McNavbarTitle() {
    }
    McNavbarTitle.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-navbar-title',
                    host: {
                        class: 'mc-navbar-title'
                    }
                },] }
    ];
    return McNavbarTitle;
}());
export { McNavbarTitle };
var McNavbarItemBase = /** @class */ (function () {
    function McNavbarItemBase(elementRef) {
        this.elementRef = elementRef;
    }
    return McNavbarItemBase;
}());
export { McNavbarItemBase };
if (false) {
    /** @type {?} */
    McNavbarItemBase.prototype.elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McNavbarMixinBase = mixinTabIndex(mixinDisabled(McNavbarItemBase));
var McNavbarItem = /** @class */ (function (_super) {
    __extends(McNavbarItem, _super);
    function McNavbarItem(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        return _this;
    }
    Object.defineProperty(McNavbarItem.prototype, "collapsedTitle", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McNavbarItem.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.denyClickIfDisabled();
        this._focusMonitor.monitor(this.elementRef.nativeElement, true);
    };
    /**
     * @return {?}
     */
    McNavbarItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    /**
     * @private
     * @return {?}
     */
    McNavbarItem.prototype.denyClickIfDisabled = 
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.elementRef.nativeElement.removeEventListener('click', event); }));
        this.elementRef.nativeElement.addEventListener('click', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }), true);
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.elementRef.nativeElement.addEventListener('click', event); }));
    };
    McNavbarItem.decorators = [
        { type: Component, args: [{
                    selector: 'mc-navbar-item',
                    template: "<ng-content></ng-content>",
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
    McNavbarItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    McNavbarItem.propDecorators = {
        collapsedTitle: [{ type: Input }]
    };
    return McNavbarItem;
}(McNavbarMixinBase));
export { McNavbarItem };
if (false) {
    /** @type {?} */
    McNavbarItem.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McNavbarItem.prototype._focusMonitor;
}
var McNavbarContainer = /** @class */ (function () {
    function McNavbarContainer() {
        this.position = 'left';
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
    return McNavbarContainer;
}());
export { McNavbarContainer };
if (false) {
    /** @type {?} */
    McNavbarContainer.prototype.position;
}
var CollapsibleItem = /** @class */ (function () {
    function CollapsibleItem(element, width) {
        this.element = element;
        this.width = width;
        this.collapsed = false;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    CollapsibleItem.prototype.processCollapsed = /**
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        this.collapsed = collapsed;
        this.updateCollapsedClass();
    };
    /**
     * @private
     * @return {?}
     */
    CollapsibleItem.prototype.updateCollapsedClass = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.collapsed) {
            this.element.classList.add(COLLAPSED_CLASS);
        }
        else {
            this.element.classList.remove(COLLAPSED_CLASS);
        }
    };
    return CollapsibleItem;
}());
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
var CachedItemWidth = /** @class */ (function () {
    function CachedItemWidth(element, width, itemsForCollapse) {
        if (itemsForCollapse === void 0) { itemsForCollapse = []; }
        this.element = element;
        this.width = width;
        this.itemsForCollapse = itemsForCollapse;
    }
    Object.defineProperty(CachedItemWidth.prototype, "canCollapse", {
        get: /**
         * @return {?}
         */
        function () {
            return this.itemsForCollapse.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CachedItemWidth.prototype, "collapsedItemsWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._collapsedItemsWidth !== undefined) {
                return this._collapsedItemsWidth;
            }
            this.calculateAndCacheCollapsedItemsWidth();
            return this._collapsedItemsWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collapsed
     * @return {?}
     */
    CachedItemWidth.prototype.processCollapsed = /**
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        if (this.itemsForCollapse.length > 0) {
            this.updateTitle(collapsed);
        }
        this.itemsForCollapse.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.processCollapsed(collapsed); }));
    };
    /**
     * @private
     * @return {?}
     */
    CachedItemWidth.prototype.calculateAndCacheCollapsedItemsWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce((/**
         * @param {?} acc
         * @param {?} item
         * @return {?}
         */
        function (acc, item) { return acc + item.width; }), 0);
    };
    /**
     * @private
     * @return {?}
     */
    CachedItemWidth.prototype.getTitle = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    };
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    CachedItemWidth.prototype.updateTitle = /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        if (collapsed) {
            this.element.setAttribute('title', this.getTitle());
        }
        else {
            this.element.removeAttribute('title');
        }
    };
    return CachedItemWidth;
}());
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
var McNavbar = /** @class */ (function () {
    function McNavbar(_elementRef) {
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
        var resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this.resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    Object.defineProperty(McNavbar.prototype, "maxAllowedWidth", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbar.prototype, "itemsWidths", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (this._itemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
                return this._itemsWidths;
            }
            this.calculateAndCacheItemsWidth();
            return this._itemsWidths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbar.prototype, "totalItemsWidth", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (this.totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
                return this.totalItemsWidths;
            }
            this.calculateAndCacheTotalItemsWidth();
            return this.totalItemsWidths;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McNavbar.prototype.updateCollapsed = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (var i = this.itemsWidths.length - 1; i >= 0; i--) {
            /** @type {?} */
            var item = this.itemsWidths[i];
            if (!item.canCollapse) {
                continue;
            }
            item.processCollapsed(collapseDelta > 0);
            collapseDelta -= item.collapsedItemsWidth;
        }
    };
    /**
     * @return {?}
     */
    McNavbar.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.updateCollapsed(); }), 0);
    };
    /**
     * @return {?}
     */
    McNavbar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resizeSubscription.unsubscribe();
    };
    /**
     * @private
     * @return {?}
     */
    McNavbar.prototype.calculateAndCacheTotalItemsWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this.totalItemsWidths = this.itemsWidths
            .reduce((/**
         * @param {?} acc
         * @param {?} item
         * @return {?}
         */
        function (acc, item) { return acc + item.width; }), 0);
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    McNavbar.prototype.getOuterElementWidth = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var baseWidth = element.getBoundingClientRect().width;
        /** @type {?} */
        var marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        /** @type {?} */
        var marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    };
    /**
     * @private
     * @return {?}
     */
    McNavbar.prototype.calculateAndCacheItemsWidth = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var allItemsSelector = this.secondLevelElements
            .map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.firstLevelElement + ">" + e; }));
        /** @type {?} */
        var allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map((/**
         * @param {?} el
         * @return {?}
         */
        function (el) { return new CachedItemWidth(el, _this.getOuterElementWidth(el), _this.getItemsForCollapse(el)); }));
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    McNavbar.prototype.getItemsForCollapse = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var icon = element.querySelector("[mc-icon],mc-navbar-logo,[mc-navbar-logo]");
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll('mc-navbar-title'))
            .map((/**
         * @param {?} el
         * @return {?}
         */
        function (el) { return new CollapsibleItem((/** @type {?} */ (el)), el.getBoundingClientRect().width); }));
    };
    McNavbar.decorators = [
        { type: Component, args: [{
                    selector: 'mc-navbar',
                    template: "\n        <nav class=\"mc-navbar\">\n            <ng-content select=\"[mc-navbar-container], mc-navbar-container\"></ng-content>\n        </nav>\n    ",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar [mc-icon]{min-width:16px;min-height:16px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"]
                }] }
    ];
    /** @nocollapse */
    McNavbar.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McNavbar;
}());
export { McNavbar };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9uYXZiYXIvIiwic291cmNlcyI6WyJuYXZiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBRUgsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQStDLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwSCxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBR3hDLGVBQWUsR0FBVywyQkFBMkI7QUFJM0Q7SUFBQTtJQU0yQixDQUFDOztnQkFOM0IsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsZ0JBQWdCO3FCQUMxQjtpQkFDSjs7SUFDMEIsbUJBQUM7Q0FBQSxBQU41QixJQU00QjtTQUFmLFlBQVk7QUFFekI7SUFBQTtJQU00QixDQUFDOztnQkFONUIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsaUJBQWlCO3FCQUMzQjtpQkFDSjs7SUFDMkIsb0JBQUM7Q0FBQSxBQU43QixJQU02QjtTQUFoQixhQUFhO0FBRTFCO0lBQUE7SUFNNEIsQ0FBQzs7Z0JBTjVCLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjtxQkFDM0I7aUJBQ0o7O0lBQzJCLG9CQUFDO0NBQUEsQUFON0IsSUFNNkI7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ay9hMTF5JztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBIYXNUYWJJbmRleEN0b3IsIG1peGluRGlzYWJsZWQsIG1peGluVGFiSW5kZXggfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmNvbnN0IENPTExBUFNFRF9DTEFTUzogc3RyaW5nID0gJ21jLW5hdmJhci1jb2xsYXBzZWQtdGl0bGUnO1xuXG5leHBvcnQgdHlwZSBNY05hdmJhckNvbnRhaW5lclBvc2l0aW9uVHlwZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWxvZ28nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItbG9nbydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyTG9nbyB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1icmFuZCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1icmFuZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQnJhbmQge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItdGl0bGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItdGl0bGUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhclRpdGxlIHt9XG5cbmV4cG9ydCBjbGFzcyBNY05hdmJhckl0ZW1CYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNOYXZiYXJNaXhpbkJhc2U6XG4gICAgSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNOYXZiYXJJdGVtQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY05hdmJhckl0ZW1CYXNlKSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtIGV4dGVuZHMgTWNOYXZiYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ2FuRGlzYWJsZSB7XG4gICAgQElucHV0KClcbiAgICBzZXQgY29sbGFwc2VkVGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbXB1dGVkVGl0bGUnLCBlbmNvZGVVUkkodmFsdWUpKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvclxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kZW55Q2xpY2tJZkRpc2FibGVkKCk7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIGR1ZSB0byBhbmd1bGFyIDIgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTEyMDBcbiAgICBwcml2YXRlIGRlbnlDbGlja0lmRGlzYWJsZWQoKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50czogRXZlbnRbXSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmV2ZW50TGlzdGVuZXJzKCdjbGljaycpO1xuXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCkpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCkpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItY29udGFpbmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLWxlZnRdJzogJ3RoaXMucG9zaXRpb24gPT09IFwibGVmdFwiJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1uYXZiYXItcmlnaHRdJzogJ3RoaXMucG9zaXRpb24gIT09IFwibGVmdFwiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJDb250YWluZXIge1xuICAgIEBJbnB1dCgpXG4gICAgcG9zaXRpb246IE1jTmF2YmFyQ29udGFpbmVyUG9zaXRpb25UeXBlID0gJ2xlZnQnO1xufVxuXG5jbGFzcyBDb2xsYXBzaWJsZUl0ZW0ge1xuICAgIHByaXZhdGUgY29sbGFwc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsIHB1YmxpYyB3aWR0aDogbnVtYmVyKSB7fVxuXG4gICAgcHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb2xsYXBzZWRDbGFzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ29sbGFwc2VkQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ09MTEFQU0VEX0NMQVNTKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENPTExBUFNFRF9DTEFTUyk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuY2xhc3MgQ2FjaGVkSXRlbVdpZHRoIHtcbiAgICBnZXQgY2FuQ29sbGFwc2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zRm9yQ29sbGFwc2UubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXQgY29sbGFwc2VkSXRlbXNXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fY29sbGFwc2VkSXRlbXNXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkSXRlbXNXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQW5kQ2FjaGVDb2xsYXBzZWRJdGVtc1dpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VkSXRlbXNXaWR0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcHVibGljIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBpdGVtc0ZvckNvbGxhcHNlOiBDb2xsYXBzaWJsZUl0ZW1bXSA9IFtdXG4gICAgKSB7fVxuXG4gICAgcHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNGb3JDb2xsYXBzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLml0ZW1zRm9yQ29sbGFwc2UuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5wcm9jZXNzQ29sbGFwc2VkKGNvbGxhcHNlZCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlQW5kQ2FjaGVDb2xsYXBzZWRJdGVtc1dpZHRoKCkge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZWRJdGVtc1dpZHRoID0gdGhpcy5pdGVtc0ZvckNvbGxhcHNlXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0ud2lkdGgsIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY29tcHV0ZWRUaXRsZSA9IHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NvbXB1dGVkVGl0bGUnKTtcblxuICAgICAgICByZXR1cm4gY29tcHV0ZWRUaXRsZVxuICAgICAgICAgICAgPyBkZWNvZGVVUkkoY29tcHV0ZWRUaXRsZSlcbiAgICAgICAgICAgIDogKHRoaXMuaXRlbXNGb3JDb2xsYXBzZS5sZW5ndGggPiAwID8gdGhpcy5pdGVtc0ZvckNvbGxhcHNlWzBdLmVsZW1lbnQuaW5uZXJUZXh0IDogJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVGl0bGUoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5nZXRUaXRsZSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RpdGxlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuYXYgY2xhc3M9XCJtYy1uYXZiYXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItY29udGFpbmVyXSwgbWMtbmF2YmFyLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9uYXY+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9uYXZiYXIuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBmb3JjZVJlY2FsY3VsYXRlSXRlbXNXaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVzaXplRGVib3VuY2VJbnRlcnZhbDogbnVtYmVyID0gMTAwO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZmlyc3RMZXZlbEVsZW1lbnQ6IHN0cmluZyA9ICdtYy1uYXZiYXItY29udGFpbmVyJztcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlY29uZExldmVsRWxlbWVudHM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgICAgICAnbWMtbmF2YmFyLWJyYW5kJyxcbiAgICAgICAgJ21jLW5hdmJhci10aXRsZSdcbiAgICBdO1xuXG4gICAgcHJpdmF0ZSB0b3RhbEl0ZW1zV2lkdGhzOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGdldCBtYXhBbGxvd2VkV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBpdGVtc1dpZHRocygpOiBDYWNoZWRJdGVtV2lkdGhbXSB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtc1dpZHRocyAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmZvcmNlUmVjYWxjdWxhdGVJdGVtc1dpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNXaWR0aHM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZENhY2hlSXRlbXNXaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1dpZHRocztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pdGVtc1dpZHRoczogQ2FjaGVkSXRlbVdpZHRoW107XG5cbiAgICBwcml2YXRlIGdldCB0b3RhbEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMudG90YWxJdGVtc1dpZHRocyAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmZvcmNlUmVjYWxjdWxhdGVJdGVtc1dpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zV2lkdGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVBbmRDYWNoZVRvdGFsSXRlbXNXaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnRvdGFsSXRlbXNXaWR0aHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHJlc2l6ZU9ic2VydmVyID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUodGhpcy5yZXNpemVEZWJvdW5jZUludGVydmFsKSk7XG5cbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSByZXNpemVPYnNlcnZlci5zdWJzY3JpYmUodGhpcy51cGRhdGVDb2xsYXBzZWQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sbGFwc2VkKCk6IHZvaWQge1xuICAgICAgICBsZXQgY29sbGFwc2VEZWx0YSA9IHRoaXMudG90YWxJdGVtc1dpZHRoIC0gdGhpcy5tYXhBbGxvd2VkV2lkdGg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaXRlbXNXaWR0aHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zV2lkdGhzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW0uY2FuQ29sbGFwc2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5wcm9jZXNzQ29sbGFwc2VkKGNvbGxhcHNlRGVsdGEgPiAwKTtcbiAgICAgICAgICAgIGNvbGxhcHNlRGVsdGEgLT0gaXRlbS5jb2xsYXBzZWRJdGVtc1dpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBOb3RlOiB0aGlzIHdhaXQgaXMgcmVxdWlyZWQgZm9yIGxvYWRpbmcgYW5kIHJlbmRlcmluZyBmb250cyBmb3IgaWNvbnM7XG4gICAgICAgIC8vIHVuZm9ydHVuYXRlbHkgd2UgY2Fubm90IGNvbnRyb2wgZm9udCByZW5kZXJpbmdcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUNvbGxhcHNlZCgpLCAwKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZENhY2hlVG90YWxJdGVtc1dpZHRoKCkge1xuICAgICAgICB0aGlzLnRvdGFsSXRlbXNXaWR0aHMgPSB0aGlzLml0ZW1zV2lkdGhzXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0ud2lkdGgsIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3V0ZXJFbGVtZW50V2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBiYXNlV2lkdGggID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1yaWdodCcpKTtcbiAgICAgICAgY29uc3QgbWFyZ2luTGVmdCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWxlZnQnKSk7XG5cbiAgICAgICAgcmV0dXJuIGJhc2VXaWR0aCArIG1hcmdpblJpZ2h0ICsgbWFyZ2luTGVmdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZENhY2hlSXRlbXNXaWR0aCgpIHtcbiAgICAgICAgY29uc3QgYWxsSXRlbXNTZWxlY3RvciA9IHRoaXMuc2Vjb25kTGV2ZWxFbGVtZW50c1xuICAgICAgICAgICAgLm1hcCgoZTogc3RyaW5nKSA9PiBgJHt0aGlzLmZpcnN0TGV2ZWxFbGVtZW50fT4ke2V9YCk7XG4gICAgICAgIGNvbnN0IGFsbEl0ZW1zOiBIVE1MRWxlbWVudFtdID0gQXJyYXkuZnJvbSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChhbGxJdGVtc1NlbGVjdG9yKSk7XG5cbiAgICAgICAgdGhpcy5faXRlbXNXaWR0aHMgPSBhbGxJdGVtc1xuICAgICAgICAgICAgLm1hcCgoZWwpID0+IG5ldyBDYWNoZWRJdGVtV2lkdGgoZWwsIHRoaXMuZ2V0T3V0ZXJFbGVtZW50V2lkdGgoZWwpLCB0aGlzLmdldEl0ZW1zRm9yQ29sbGFwc2UoZWwpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJdGVtc0ZvckNvbGxhcHNlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogQ29sbGFwc2libGVJdGVtW10ge1xuICAgICAgICBjb25zdCBpY29uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbbWMtaWNvbl0sbWMtbmF2YmFyLWxvZ28sW21jLW5hdmJhci1sb2dvXWApO1xuXG4gICAgICAgIGlmICghaWNvbikge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYy1uYXZiYXItdGl0bGUnKSlcbiAgICAgICAgICAgIC5tYXAoKGVsKSA9PiBuZXcgQ29sbGFwc2libGVJdGVtKDxIVE1MRWxlbWVudD4gZWwsIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSk7XG4gICAgfVxufVxuIl19
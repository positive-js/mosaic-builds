/**
 * @fileoverview added by tsickle
 * Generated from: navbar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Directive, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
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
export var McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
var McNavbarItem = /** @class */ (function (_super) {
    __extends(McNavbarItem, _super);
    function McNavbarItem(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        _this.tabIndex = 0;
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
                    inputs: ['disabled'],
                    host: {
                        '[attr.tabIndex]': 'disabled ? -1 : tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-navbar-item'
                    }
                }] }
    ];
    /** @nocollapse */
    McNavbarItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    McNavbarItem.propDecorators = {
        tabIndex: [{ type: Input }],
        collapsedTitle: [{ type: Input }]
    };
    return McNavbarItem;
}(McNavbarMixinBase));
export { McNavbarItem };
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
var McNavbarContainer = /** @class */ (function () {
    function McNavbarContainer() {
        this.position = 'left';
    }
    Object.defineProperty(McNavbarContainer.prototype, "cssClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return this.position === 'left' ? 'mc-navbar-left' : 'mc-navbar-right';
        },
        enumerable: true,
        configurable: true
    });
    McNavbarContainer.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-navbar-container'
                },] }
    ];
    McNavbarContainer.propDecorators = {
        position: [{ type: Input }],
        cssClasses: [{ type: HostBinding, args: ['class',] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9uYXZiYXIvIiwic291cmNlcyI6WyJuYXZiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBRUgsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFHTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBR3hDLGVBQWUsR0FBVywyQkFBMkI7QUFJM0Q7SUFBQTtJQU0yQixDQUFDOztnQkFOM0IsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsZ0JBQWdCO3FCQUMxQjtpQkFDSjs7SUFDMEIsbUJBQUM7Q0FBQSxBQU41QixJQU00QjtTQUFmLFlBQVk7QUFFekI7SUFBQTtJQU00QixDQUFDOztnQkFONUIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsaUJBQWlCO3FCQUMzQjtpQkFDSjs7SUFDMkIsb0JBQUM7Q0FBQSxBQU43QixJQU02QjtTQUFoQixhQUFhO0FBRTFCO0lBQUE7SUFNNEIsQ0FBQzs7Z0JBTjVCLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjtxQkFDM0I7aUJBQ0o7O0lBQzJCLG9CQUFDO0NBQUEsQUFON0IsSUFNNkI7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LGdDQUF3Qzs7Ozs7SUFZeEMsc0NBQXlDOzs7OztJQUdyQywrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgbWl4aW5EaXNhYmxlZCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuY29uc3QgQ09MTEFQU0VEX0NMQVNTOiBzdHJpbmcgPSAnbWMtbmF2YmFyLWNvbGxhcHNlZC10aXRsZSc7XG5cbmV4cG9ydCB0eXBlIE1jTmF2YmFyQ29udGFpbmVyUG9zaXRpb25UeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItbG9nbycsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1sb2dvJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJMb2dvIHt9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWJyYW5kJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWJyYW5kJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJCcmFuZCB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci10aXRsZScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci10aXRsZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyVGl0bGUge31cblxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY05hdmJhck1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNOYXZiYXJJdGVtQmFzZSA9IG1peGluRGlzYWJsZWQoTWNOYXZiYXJJdGVtQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci50YWJJbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6IHRhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItaXRlbSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbSBleHRlbmRzIE1jTmF2YmFyTWl4aW5CYXNlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENhbkRpc2FibGUge1xuXG4gICAgQElucHV0KClcbiAgICB0YWJJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGNvbGxhcHNlZFRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb21wdXRlZFRpdGxlJywgZW5jb2RlVVJJKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3JcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZGVueUNsaWNrSWZEaXNhYmxlZCgpO1xuXG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIG1ldGhvZCBpcyByZXF1aXJlZCBkdWUgdG8gYW5ndWxhciAyIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzExMjAwXG4gICAgcHJpdmF0ZSBkZW55Q2xpY2tJZkRpc2FibGVkKCkge1xuICAgICAgICBjb25zdCBldmVudHM6IEV2ZW50W10gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ldmVudExpc3RlbmVycygnY2xpY2snKTtcblxuICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQpKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQpKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWNvbnRhaW5lcidcbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJDb250YWluZXIge1xuICAgIEBJbnB1dCgpXG4gICAgcG9zaXRpb246IE1jTmF2YmFyQ29udGFpbmVyUG9zaXRpb25UeXBlID0gJ2xlZnQnO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gICAgZ2V0IGNzc0NsYXNzZXMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPT09ICdsZWZ0JyA/ICdtYy1uYXZiYXItbGVmdCcgOiAnbWMtbmF2YmFyLXJpZ2h0JztcbiAgICB9XG59XG5cbmNsYXNzIENvbGxhcHNpYmxlSXRlbSB7XG4gICAgcHJpdmF0ZSBjb2xsYXBzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyXG4gICAgKSB7fVxuXG4gICAgcHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb2xsYXBzZWRDbGFzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ29sbGFwc2VkQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ09MTEFQU0VEX0NMQVNTKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENPTExBUFNFRF9DTEFTUyk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuY2xhc3MgQ2FjaGVkSXRlbVdpZHRoIHtcblxuICAgIGdldCBjYW5Db2xsYXBzZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNGb3JDb2xsYXBzZS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldCBjb2xsYXBzZWRJdGVtc1dpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9jb2xsYXBzZWRJdGVtc1dpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWRJdGVtc1dpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVBbmRDYWNoZUNvbGxhcHNlZEl0ZW1zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkSXRlbXNXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2xsYXBzZWRJdGVtc1dpZHRoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBwdWJsaWMgd2lkdGg6IG51bWJlcixcbiAgICAgICAgcHVibGljIGl0ZW1zRm9yQ29sbGFwc2U6IENvbGxhcHNpYmxlSXRlbVtdID0gW11cbiAgICApIHt9XG5cbiAgICBwcm9jZXNzQ29sbGFwc2VkKGNvbGxhcHNlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5pdGVtc0ZvckNvbGxhcHNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGl0bGUoY29sbGFwc2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXRlbXNGb3JDb2xsYXBzZS5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnByb2Nlc3NDb2xsYXBzZWQoY29sbGFwc2VkKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVBbmRDYWNoZUNvbGxhcHNlZEl0ZW1zV2lkdGgoKSB7XG4gICAgICAgIHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGggPSB0aGlzLml0ZW1zRm9yQ29sbGFwc2VcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgaXRlbS53aWR0aCwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBjb21wdXRlZFRpdGxlID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnY29tcHV0ZWRUaXRsZScpO1xuXG4gICAgICAgIHJldHVybiBjb21wdXRlZFRpdGxlXG4gICAgICAgICAgICA/IGRlY29kZVVSSShjb21wdXRlZFRpdGxlKVxuICAgICAgICAgICAgOiAodGhpcy5pdGVtc0ZvckNvbGxhcHNlLmxlbmd0aCA+IDAgPyB0aGlzLml0ZW1zRm9yQ29sbGFwc2VbMF0uZWxlbWVudC5pbm5lclRleHQgOiAnJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUaXRsZShjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLmdldFRpdGxlKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndGl0bGUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5hdiBjbGFzcz1cIm1jLW5hdmJhclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLW5hdmJhci1jb250YWluZXJdLCBtYy1uYXZiYXItY29udGFpbmVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L25hdj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL25hdmJhci5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGZvcmNlUmVjYWxjdWxhdGVJdGVtc1dpZHRoOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSByZWFkb25seSByZXNpemVEZWJvdW5jZUludGVydmFsOiBudW1iZXIgPSAxMDA7XG4gICAgcHJpdmF0ZSByZWFkb25seSBmaXJzdExldmVsRWxlbWVudDogc3RyaW5nID0gJ21jLW5hdmJhci1jb250YWluZXInO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vjb25kTGV2ZWxFbGVtZW50czogc3RyaW5nW10gPSBbXG4gICAgICAgICdtYy1uYXZiYXItaXRlbScsXG4gICAgICAgICdtYy1uYXZiYXItYnJhbmQnLFxuICAgICAgICAnbWMtbmF2YmFyLXRpdGxlJ1xuICAgIF07XG5cbiAgICBwcml2YXRlIHRvdGFsSXRlbXNXaWR0aHM6IG51bWJlcjtcblxuICAgIHByaXZhdGUgZ2V0IG1heEFsbG93ZWRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGl0ZW1zV2lkdGhzKCk6IENhY2hlZEl0ZW1XaWR0aFtdIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zV2lkdGhzICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuZm9yY2VSZWNhbGN1bGF0ZUl0ZW1zV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1dpZHRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQW5kQ2FjaGVJdGVtc1dpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zV2lkdGhzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2l0ZW1zV2lkdGhzOiBDYWNoZWRJdGVtV2lkdGhbXTtcblxuICAgIHByaXZhdGUgZ2V0IHRvdGFsSXRlbXNXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy50b3RhbEl0ZW1zV2lkdGhzICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuZm9yY2VSZWNhbGN1bGF0ZUl0ZW1zV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsSXRlbXNXaWR0aHM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZENhY2hlVG90YWxJdGVtc1dpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudG90YWxJdGVtc1dpZHRocztcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICAgICAgY29uc3QgcmVzaXplT2JzZXJ2ZXIgPSBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJylcbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSh0aGlzLnJlc2l6ZURlYm91bmNlSW50ZXJ2YWwpKTtcblxuICAgICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHJlc2l6ZU9ic2VydmVyLnN1YnNjcmliZSh0aGlzLnVwZGF0ZUNvbGxhcHNlZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb2xsYXBzZWQoKTogdm9pZCB7XG4gICAgICAgIGxldCBjb2xsYXBzZURlbHRhID0gdGhpcy50b3RhbEl0ZW1zV2lkdGggLSB0aGlzLm1heEFsbG93ZWRXaWR0aDtcblxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5pdGVtc1dpZHRocy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNXaWR0aHNbaV07XG5cbiAgICAgICAgICAgIGlmICghaXRlbS5jYW5Db2xsYXBzZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLnByb2Nlc3NDb2xsYXBzZWQoY29sbGFwc2VEZWx0YSA+IDApO1xuICAgICAgICAgICAgY29sbGFwc2VEZWx0YSAtPSBpdGVtLmNvbGxhcHNlZEl0ZW1zV2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIE5vdGU6IHRoaXMgd2FpdCBpcyByZXF1aXJlZCBmb3IgbG9hZGluZyBhbmQgcmVuZGVyaW5nIGZvbnRzIGZvciBpY29ucztcbiAgICAgICAgLy8gdW5mb3J0dW5hdGVseSB3ZSBjYW5ub3QgY29udHJvbCBmb250IHJlbmRlcmluZ1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlQ29sbGFwc2VkKCksIDApO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlQW5kQ2FjaGVUb3RhbEl0ZW1zV2lkdGgoKSB7XG4gICAgICAgIHRoaXMudG90YWxJdGVtc1dpZHRocyA9IHRoaXMuaXRlbXNXaWR0aHNcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgaXRlbS53aWR0aCwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPdXRlckVsZW1lbnRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGJhc2VXaWR0aCAgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCBtYXJnaW5SaWdodCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXJpZ2h0JykpO1xuICAgICAgICBjb25zdCBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tbGVmdCcpKTtcblxuICAgICAgICByZXR1cm4gYmFzZVdpZHRoICsgbWFyZ2luUmlnaHQgKyBtYXJnaW5MZWZ0O1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlQW5kQ2FjaGVJdGVtc1dpZHRoKCkge1xuICAgICAgICBjb25zdCBhbGxJdGVtc1NlbGVjdG9yID0gdGhpcy5zZWNvbmRMZXZlbEVsZW1lbnRzXG4gICAgICAgICAgICAubWFwKChlOiBzdHJpbmcpID0+IGAke3RoaXMuZmlyc3RMZXZlbEVsZW1lbnR9PiR7ZX1gKTtcbiAgICAgICAgY29uc3QgYWxsSXRlbXM6IEhUTUxFbGVtZW50W10gPSBBcnJheS5mcm9tKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGFsbEl0ZW1zU2VsZWN0b3IpKTtcblxuICAgICAgICB0aGlzLl9pdGVtc1dpZHRocyA9IGFsbEl0ZW1zXG4gICAgICAgICAgICAubWFwKChlbCkgPT4gbmV3IENhY2hlZEl0ZW1XaWR0aChlbCwgdGhpcy5nZXRPdXRlckVsZW1lbnRXaWR0aChlbCksIHRoaXMuZ2V0SXRlbXNGb3JDb2xsYXBzZShlbCkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEl0ZW1zRm9yQ29sbGFwc2UoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBDb2xsYXBzaWJsZUl0ZW1bXSB7XG4gICAgICAgIGNvbnN0IGljb24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYFttYy1pY29uXSxtYy1uYXZiYXItbG9nbyxbbWMtbmF2YmFyLWxvZ29dYCk7XG5cbiAgICAgICAgaWYgKCFpY29uKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ21jLW5hdmJhci10aXRsZScpKVxuICAgICAgICAgICAgLm1hcCgoZWwpID0+IG5ldyBDb2xsYXBzaWJsZUl0ZW0oPEhUTUxFbGVtZW50PiBlbCwgZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKTtcbiAgICB9XG59XG4iXX0=
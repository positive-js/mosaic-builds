/**
 * @fileoverview added by tsickle
 * Generated from: services/measure-scrollbar.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
var McMeasureScrollbarService = /** @class */ (function () {
    function McMeasureScrollbarService(document) {
        this.document = document;
        this.scrollbarMeasure = {
            position: 'absolute',
            top: '-9999px',
            width: '50px',
            height: '50px',
            overflow: 'scroll'
        };
        this.initScrollBarWidth();
    }
    Object.defineProperty(McMeasureScrollbarService.prototype, "scrollBarWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._scrollBarWidth) {
                return this._scrollBarWidth;
            }
            this.initScrollBarWidth();
            return this._scrollBarWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McMeasureScrollbarService.prototype.initScrollBarWidth = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollDiv = this.document.createElement('div');
        // tslint:disable-next-line
        for (var scrollProp in this.scrollbarMeasure) {
            if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
                scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
            }
        }
        this.document.body.appendChild(scrollDiv);
        /** @type {?} */
        var width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.document.body.removeChild(scrollDiv);
        this._scrollBarWidth = width;
    };
    McMeasureScrollbarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    McMeasureScrollbarService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ McMeasureScrollbarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function McMeasureScrollbarService_Factory() { return new McMeasureScrollbarService(i0.ɵɵinject(i1.DOCUMENT)); }, token: McMeasureScrollbarService, providedIn: "root" });
    return McMeasureScrollbarService;
}());
export { McMeasureScrollbarService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    McMeasureScrollbarService.prototype._scrollBarWidth;
    /**
     * @type {?}
     * @private
     */
    McMeasureScrollbarService.prototype.scrollbarMeasure;
    /**
     * @type {?}
     * @private
     */
    McMeasureScrollbarService.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS1zY3JvbGxiYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWVhc3VyZS1zY3JvbGxiYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBR25EO0lBdUJJLG1DQUM4QixRQUFhO1FBQWIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQVRuQyxxQkFBZ0IsR0FBRztZQUN2QixRQUFRLEVBQUUsVUFBVTtZQUNwQixHQUFHLEVBQUUsU0FBUztZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsUUFBUTtTQUNyQixDQUFDO1FBS0UsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQXRCRCxzQkFBSSxxREFBYzs7OztRQUFsQjtZQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQy9CO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFFMUIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBOzs7O0lBaUJELHNEQUFrQjs7O0lBQWxCOztZQUNVLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFFcEQsMkJBQTJCO1FBQzNCLEtBQUssSUFBTSxVQUFVLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzVDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbkU7U0FDSjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFFcEMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVc7UUFFM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7O2dCQTdDSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dEQXNCUSxNQUFNLFNBQUMsUUFBUTs7O29DQTVCeEI7Q0FrREMsQUE5Q0QsSUE4Q0M7U0EzQ1kseUJBQXlCOzs7Ozs7SUFXbEMsb0RBQWdDOzs7OztJQUNoQyxxREFNRTs7Ozs7SUFHRSw2Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE1jTWVhc3VyZVNjcm9sbGJhclNlcnZpY2Uge1xuXG4gICAgZ2V0IHNjcm9sbEJhcldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxCYXJXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEJhcldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdFNjcm9sbEJhcldpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEJhcldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Njcm9sbEJhcldpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzY3JvbGxiYXJNZWFzdXJlID0ge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgdG9wOiAnLTk5OTlweCcsXG4gICAgICAgIHdpZHRoOiAnNTBweCcsXG4gICAgICAgIGhlaWdodDogJzUwcHgnLFxuICAgICAgICBvdmVyZmxvdzogJ3Njcm9sbCdcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICB0aGlzLmluaXRTY3JvbGxCYXJXaWR0aCgpO1xuICAgIH1cblxuICAgIGluaXRTY3JvbGxCYXJXaWR0aCgpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsRGl2ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgZm9yIChjb25zdCBzY3JvbGxQcm9wIGluIHRoaXMuc2Nyb2xsYmFyTWVhc3VyZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYmFyTWVhc3VyZS5oYXNPd25Qcm9wZXJ0eShzY3JvbGxQcm9wKSkge1xuICAgICAgICAgICAgICAgIHNjcm9sbERpdi5zdHlsZVtzY3JvbGxQcm9wXSA9IHRoaXMuc2Nyb2xsYmFyTWVhc3VyZVtzY3JvbGxQcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuICAgICAgICB0aGlzLl9zY3JvbGxCYXJXaWR0aCA9IHdpZHRoO1xuICAgIH1cbn1cbiJdfQ==
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class McMeasureScrollbarService {
    constructor(document) {
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
    get scrollBarWidth() {
        if (this._scrollBarWidth) {
            return this._scrollBarWidth;
        }
        this.initScrollBarWidth();
        return this._scrollBarWidth;
    }
    initScrollBarWidth() {
        const scrollDiv = this.document.createElement('div');
        // tslint:disable-next-line
        for (const scrollProp in this.scrollbarMeasure) {
            if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
                scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
            }
        }
        this.document.body.appendChild(scrollDiv);
        const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.document.body.removeChild(scrollDiv);
        this._scrollBarWidth = width;
    }
}
/** @nocollapse */ McMeasureScrollbarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function McMeasureScrollbarService_Factory() { return new McMeasureScrollbarService(i0.ɵɵinject(i1.DOCUMENT)); }, token: McMeasureScrollbarService, providedIn: "root" });
McMeasureScrollbarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
McMeasureScrollbarService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS1zY3JvbGxiYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jb3JlL3NlcnZpY2VzL21lYXN1cmUtc2Nyb2xsYmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNbkQsTUFBTSxPQUFPLHlCQUF5QjtJQW9CbEMsWUFDOEIsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFUbkMscUJBQWdCLEdBQUc7WUFDdkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLFFBQVE7U0FDckIsQ0FBQztRQUtFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUF0QkQsSUFBSSxjQUFjO1FBQ2QsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBaUJELGtCQUFrQjtRQUNkLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJELDJCQUEyQjtRQUMzQixLQUFLLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUM1QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2xELFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25FO1NBQ0o7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFMUMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBRTVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7O1lBN0NKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7Ozs0Q0FzQlEsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE1jTWVhc3VyZVNjcm9sbGJhclNlcnZpY2Uge1xuXG4gICAgZ2V0IHNjcm9sbEJhcldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxCYXJXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEJhcldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdFNjcm9sbEJhcldpZHRoKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEJhcldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Njcm9sbEJhcldpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzY3JvbGxiYXJNZWFzdXJlID0ge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgdG9wOiAnLTk5OTlweCcsXG4gICAgICAgIHdpZHRoOiAnNTBweCcsXG4gICAgICAgIGhlaWdodDogJzUwcHgnLFxuICAgICAgICBvdmVyZmxvdzogJ3Njcm9sbCdcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICB0aGlzLmluaXRTY3JvbGxCYXJXaWR0aCgpO1xuICAgIH1cblxuICAgIGluaXRTY3JvbGxCYXJXaWR0aCgpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsRGl2ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgZm9yIChjb25zdCBzY3JvbGxQcm9wIGluIHRoaXMuc2Nyb2xsYmFyTWVhc3VyZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsYmFyTWVhc3VyZS5oYXNPd25Qcm9wZXJ0eShzY3JvbGxQcm9wKSkge1xuICAgICAgICAgICAgICAgIHNjcm9sbERpdi5zdHlsZVtzY3JvbGxQcm9wXSA9IHRoaXMuc2Nyb2xsYmFyTWVhc3VyZVtzY3JvbGxQcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuICAgICAgICB0aGlzLl9zY3JvbGxCYXJXaWR0aCA9IHdpZHRoO1xuICAgIH1cbn1cbiJdfQ==
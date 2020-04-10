/**
 * @fileoverview added by tsickle
 * Generated from: services/measure-scrollbar.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class McMeasureScrollbarService {
    /**
     * @param {?} document
     */
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
    /**
     * @return {?}
     */
    get scrollBarWidth() {
        if (this._scrollBarWidth) {
            return this._scrollBarWidth;
        }
        this.initScrollBarWidth();
        return this._scrollBarWidth;
    }
    /**
     * @return {?}
     */
    initScrollBarWidth() {
        /** @type {?} */
        const scrollDiv = this.document.createElement('div');
        // tslint:disable-next-line
        for (const scrollProp in this.scrollbarMeasure) {
            if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
                scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
            }
        }
        this.document.body.appendChild(scrollDiv);
        /** @type {?} */
        const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.document.body.removeChild(scrollDiv);
        this._scrollBarWidth = width;
    }
}
McMeasureScrollbarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
McMeasureScrollbarService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ McMeasureScrollbarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function McMeasureScrollbarService_Factory() { return new McMeasureScrollbarService(i0.ɵɵinject(i1.DOCUMENT)); }, token: McMeasureScrollbarService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS1zY3JvbGxiYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWVhc3VyZS1zY3JvbGxiYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTW5ELE1BQU0sT0FBTyx5QkFBeUI7Ozs7SUFvQmxDLFlBQzhCLFFBQWE7UUFBYixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBVG5DLHFCQUFnQixHQUFHO1lBQ3ZCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLEdBQUcsRUFBRSxTQUFTO1lBQ2QsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUM7UUFLRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBdEJELElBQUksY0FBYztRQUNkLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQzs7OztJQWlCRCxrQkFBa0I7O2NBQ1IsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUVwRCwyQkFBMkI7UUFDM0IsS0FBSyxNQUFNLFVBQVUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNsRCxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNuRTtTQUNKO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztjQUVwQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVztRQUUzRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQzs7O1lBN0NKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7Ozs0Q0FzQlEsTUFBTSxTQUFDLFFBQVE7Ozs7Ozs7O0lBVnBCLG9EQUFnQzs7Ozs7SUFDaEMscURBTUU7Ozs7O0lBR0UsNkNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNY01lYXN1cmVTY3JvbGxiYXJTZXJ2aWNlIHtcblxuICAgIGdldCBzY3JvbGxCYXJXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsQmFyV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxCYXJXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRTY3JvbGxCYXJXaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxCYXJXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zY3JvbGxCYXJXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgc2Nyb2xsYmFyTWVhc3VyZSA9IHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHRvcDogJy05OTk5cHgnLFxuICAgICAgICB3aWR0aDogJzUwcHgnLFxuICAgICAgICBoZWlnaHQ6ICc1MHB4JyxcbiAgICAgICAgb3ZlcmZsb3c6ICdzY3JvbGwnXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgICApIHtcbiAgICAgICAgdGhpcy5pbml0U2Nyb2xsQmFyV2lkdGgoKTtcbiAgICB9XG5cbiAgICBpbml0U2Nyb2xsQmFyV2lkdGgoKSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbERpdiA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGZvciAoY29uc3Qgc2Nyb2xsUHJvcCBpbiB0aGlzLnNjcm9sbGJhck1lYXN1cmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbGJhck1lYXN1cmUuaGFzT3duUHJvcGVydHkoc2Nyb2xsUHJvcCkpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxEaXYuc3R5bGVbc2Nyb2xsUHJvcF0gPSB0aGlzLnNjcm9sbGJhck1lYXN1cmVbc2Nyb2xsUHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcblxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsQmFyV2lkdGggPSB3aWR0aDtcbiAgICB9XG59XG4iXX0=
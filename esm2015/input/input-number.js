/**
 * @fileoverview added by tsickle
 * Generated from: input-number.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Platform } from '@angular/cdk/platform';
import { Attribute, Directive, ElementRef, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { END, C, V, X, A, Z, DELETE, BACKSPACE, TAB, ENTER, ESCAPE, ZERO, NINE, NUMPAD_ZERO, NUMPAD_NINE, NUMPAD_MINUS, DASH, FF_MINUS, LEFT_ARROW, RIGHT_ARROW, HOME, UP_ARROW, DOWN_ARROW, F1, F12 } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
/** @type {?} */
export const BIG_STEP = 10;
/** @type {?} */
export const SMALL_STEP = 1;
/**
 * @param {?} value
 * @return {?}
 */
export function normalizeSplitter(value) {
    return value ? value.replace(/,/g, '.') : value;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isFloat(value) {
    return /^-?\d+\.\d+$/.test(value);
}
/**
 * @param {?} value
 * @return {?}
 */
export function isInt(value) {
    return /^-?\d+$/.test(value);
}
/**
 * @param {?} value
 * @return {?}
 */
export function isDigit(value) {
    return isFloat(value) || isInt(value);
}
/**
 * @param {?} value
 * @return {?}
 */
export function getPrecision(value) {
    /** @type {?} */
    const arr = value.toString().split('.');
    return arr.length === 1
        ? 1
        // tslint:disable-next-line:no-magic-numbers
        : Math.pow(10, arr[1].length);
}
/**
 * @param {?} value1
 * @param {?} value2
 * @return {?}
 */
export function add(value1, value2) {
    /** @type {?} */
    const precision = Math.max(getPrecision(value1), getPrecision(value2));
    return (value1 * precision + value2 * precision) / precision;
}
export class McNumberInput {
    /**
     * @param {?} platform
     * @param {?} elementRef
     * @param {?} ngControl
     * @param {?} step
     * @param {?} bigStep
     * @param {?} min
     * @param {?} max
     */
    constructor(platform, elementRef, ngControl, step, bigStep, min, max) {
        this.platform = platform;
        this.elementRef = elementRef;
        this.ngControl = ngControl;
        this.focused = false;
        this.stateChanges = new Subject();
        this.step = isDigit(step) ? parseFloat(step) : SMALL_STEP;
        this.bigStep = isDigit(bigStep) ? parseFloat(bigStep) : BIG_STEP;
        this.min = isDigit(min) ? parseFloat(min) : -Infinity;
        this.max = isDigit(max) ? parseFloat(max) : Infinity;
        if ('valueAsNumber' in this.nativeElement) {
            Object.defineProperty(Object.getPrototypeOf(this.nativeElement), 'valueAsNumber', {
                // tslint:disable-next-line:no-reserved-keywords
                /**
                 * @return {?}
                 */
                get() {
                    /** @type {?} */
                    const res = parseFloat(normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    /**
     * @return {?}
     */
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    focusChanged(isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
        const isCtrlA = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === A && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isCtrlC = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === C && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isCtrlV = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === V && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isCtrlX = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === X && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isCtrlZ = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode === Z && (e.ctrlKey || e.metaKey));
        /** @type {?} */
        const isFKey = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.keyCode >= F1 && e.keyCode <= F12);
        /** @type {?} */
        const isNumber = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => (e.keyCode >= ZERO && e.keyCode <= NINE) ||
            (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE));
        /** @type {?} */
        const isIEPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.key === '.' || e.key === 'Decimal');
        /** @type {?} */
        const isNotIEPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.key === '.' || e.key === ',');
        /** @type {?} */
        const minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        /** @type {?} */
        const serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        /** @type {?} */
        const arrows = [LEFT_ARROW, RIGHT_ARROW];
        /** @type {?} */
        const allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
        // Decimal is for IE
        /** @type {?} */
        const isPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => this.platform.EDGE || this.platform.TRIDENT
            ? isIEPeriod(e)
            : isNotIEPeriod(e));
        if (allowedKeys.indexOf(keyCode) !== -1 ||
            isCtrlA(event) ||
            isCtrlC(event) ||
            isCtrlV(event) ||
            isCtrlX(event) ||
            isCtrlZ(event) ||
            isFKey(event) ||
            isPeriod(event)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is not a number and stop the keypress
        if (event.shiftKey || !isNumber(event)) {
            event.preventDefault();
            // process steps
            /** @type {?} */
            const step = event.shiftKey ? this.bigStep : this.step;
            if (keyCode === UP_ARROW) {
                this.stepUp(step);
            }
            if (keyCode === DOWN_ARROW) {
                this.stepDown(step);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPaste(event) {
        if (!isDigit(normalizeSplitter(event.clipboardData.getData('text')))) {
            event.preventDefault();
        }
    }
    /**
     * @param {?} step
     * @return {?}
     */
    stepUp(step) {
        this.elementRef.nativeElement.focus();
        /** @type {?} */
        const res = Math.max(Math.min(add(this.nativeElement.valueAsNumber || 0, step), this.max), this.min);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    }
    /**
     * @param {?} step
     * @return {?}
     */
    stepDown(step) {
        this.elementRef.nativeElement.focus();
        /** @type {?} */
        const res = Math.min(Math.max(add(this.nativeElement.valueAsNumber || 0, -step), this.min), this.max);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    viewToModelUpdate(value) {
        if (this.ngControl) {
            (/** @type {?} */ (this.ngControl.control)).setValue(value);
        }
    }
}
McNumberInput.decorators = [
    { type: Directive, args: [{
                selector: `input[mcInput][type="number"]`,
                exportAs: 'mcNumericalInput',
                host: {
                    '(blur)': 'focusChanged(false)',
                    '(focus)': 'focusChanged(true)',
                    '(paste)': 'onPaste($event)',
                    '(keydown)': 'onKeyDown($event)'
                }
            },] }
];
/** @nocollapse */
McNumberInput.ctorParameters = () => [
    { type: Platform },
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: String, decorators: [{ type: Attribute, args: ['step',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['big-step',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['min',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['max',] }] }
];
McNumberInput.propDecorators = {
    bigStep: [{ type: Input }],
    step: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McNumberInput.prototype.bigStep;
    /** @type {?} */
    McNumberInput.prototype.step;
    /** @type {?} */
    McNumberInput.prototype.min;
    /** @type {?} */
    McNumberInput.prototype.max;
    /** @type {?} */
    McNumberInput.prototype.value;
    /** @type {?} */
    McNumberInput.prototype.focused;
    /** @type {?} */
    McNumberInput.prototype.stateChanges;
    /**
     * @type {?}
     * @private
     */
    McNumberInput.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    McNumberInput.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McNumberInput.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvaW5wdXQvIiwic291cmNlcyI6WyJpbnB1dC1udW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUNILFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxRQUFRLEVBQ1IsSUFBSSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQ0gsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUNqRCxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQ2hFLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQ3pFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHL0IsTUFBTSxPQUFPLFFBQVEsR0FBRyxFQUFFOztBQUMxQixNQUFNLE9BQU8sVUFBVSxHQUFHLENBQUM7Ozs7O0FBRTNCLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUFhO0lBQzNDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3BELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxLQUFh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QUFRLEVBQUUscUJBQXFCO29CQUMvQixTQUFTLEVBQUUsb0JBQW9CO29CQUMvQixTQUFTLEVBQUUsaUJBQWlCO29CQUM1QixXQUFXLEVBQUUsbUJBQW1CO2lCQUNuQzthQUNKOzs7O1lBOURRLFFBQVE7WUFJYixVQUFVO1lBS0wsU0FBUyx1QkFnRlQsUUFBUSxZQUFJLElBQUk7eUNBQ2hCLFNBQVMsU0FBQyxNQUFNO3lDQUNoQixTQUFTLFNBQUMsVUFBVTt5Q0FDcEIsU0FBUyxTQUFDLEtBQUs7eUNBQ2YsU0FBUyxTQUFDLEtBQUs7OztzQkE3Qm5CLEtBQUs7bUJBR0wsS0FBSztrQkFHTCxLQUFLO2tCQUdMLEtBQUs7Ozs7SUFUTixnQ0FDZ0I7O0lBRWhCLDZCQUNhOztJQUViLDRCQUNZOztJQUVaLDRCQUNZOztJQUVaLDhCQUFXOztJQUVYLGdDQUF5Qjs7SUFFekIscUNBQTJEOzs7OztJQU92RCxpQ0FBMEI7Ozs7O0lBQzFCLG1DQUE4Qjs7Ozs7SUFDOUIsa0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgICBBdHRyaWJ1dGUsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgRU5ELCBDLCBWLCBYLCBBLCBaLCBERUxFVEUsIEJBQ0tTUEFDRSwgVEFCLCBFTlRFUixcbiAgICBFU0NBUEUsIFpFUk8sIE5JTkUsIE5VTVBBRF9aRVJPLCBOVU1QQURfTklORSwgTlVNUEFEX01JTlVTLCBEQVNILFxuICAgIEZGX01JTlVTLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgSE9NRSwgVVBfQVJST1csIERPV05fQVJST1csIEYxLCBGMTJcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuXG5leHBvcnQgY29uc3QgQklHX1NURVAgPSAxMDtcbmV4cG9ydCBjb25zdCBTTUFMTF9TVEVQID0gMTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVNwbGl0dGVyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UoLywvZywgJy4nKSA6IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGbG9hdCh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eLT9cXGQrXFwuXFxkKyQvLnRlc3QodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnQodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXi0/XFxkKyQvLnRlc3QodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaWdpdCh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmxvYXQodmFsdWUpIHx8IGlzSW50KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZWNpc2lvbih2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBhcnIgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcuJyk7XG5cbiAgICByZXR1cm4gYXJyLmxlbmd0aCA9PT0gMVxuICAgICAgICA/IDFcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgOiAgTWF0aC5wb3coMTAsIGFyclsxXS5sZW5ndGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkKHZhbHVlMTogbnVtYmVyLCB2YWx1ZTI6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcHJlY2lzaW9uID0gTWF0aC5tYXgoZ2V0UHJlY2lzaW9uKHZhbHVlMSksIGdldFByZWNpc2lvbih2YWx1ZTIpKTtcblxuICAgIHJldHVybiAodmFsdWUxICogcHJlY2lzaW9uICsgdmFsdWUyICogcHJlY2lzaW9uKSAvIHByZWNpc2lvbjtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYGlucHV0W21jSW5wdXRdW3R5cGU9XCJudW1iZXJcIl1gLFxuICAgIGV4cG9ydEFzOiAnbWNOdW1lcmljYWxJbnB1dCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJsdXIpJzogJ2ZvY3VzQ2hhbmdlZChmYWxzZSknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknLFxuICAgICAgICAnKHBhc3RlKSc6ICdvblBhc3RlKCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOdW1iZXJJbnB1dCB7XG4gICAgQElucHV0KClcbiAgICBiaWdTdGVwOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHN0ZXA6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgbWluOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIG1heDogbnVtYmVyO1xuXG4gICAgdmFsdWU6IGFueTtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgbmF0aXZlRWxlbWVudCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSAsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAQXR0cmlidXRlKCdzdGVwJykgc3RlcDogc3RyaW5nLFxuICAgICAgICBAQXR0cmlidXRlKCdiaWctc3RlcCcpIGJpZ1N0ZXA6IHN0cmluZyxcbiAgICAgICAgQEF0dHJpYnV0ZSgnbWluJykgbWluOiBzdHJpbmcsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ21heCcpIG1heDogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IGlzRGlnaXQoc3RlcCkgPyBwYXJzZUZsb2F0KHN0ZXApIDogU01BTExfU1RFUDtcbiAgICAgICAgdGhpcy5iaWdTdGVwID0gaXNEaWdpdChiaWdTdGVwKSA/IHBhcnNlRmxvYXQoYmlnU3RlcCkgOiBCSUdfU1RFUDtcbiAgICAgICAgdGhpcy5taW4gPSBpc0RpZ2l0KG1pbikgPyBwYXJzZUZsb2F0KG1pbikgOiAtSW5maW5pdHk7XG4gICAgICAgIHRoaXMubWF4ID0gaXNEaWdpdChtYXgpID8gcGFyc2VGbG9hdChtYXgpIDogSW5maW5pdHk7XG5cbiAgICAgICAgaWYgKCd2YWx1ZUFzTnVtYmVyJyBpbiB0aGlzLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcy5uYXRpdmVFbGVtZW50KSwgJ3ZhbHVlQXNOdW1iZXInLCB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBwYXJzZUZsb2F0KG5vcm1hbGl6ZVNwbGl0dGVyKHRoaXMudmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNOYU4ocmVzKSA/IG51bGwgOiByZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1c0NoYW5nZWQoaXNGb2N1c2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0ZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBjb25zdCBpc0N0cmxBID0gKGUpID0+IGUua2V5Q29kZSA9PT0gQSAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSk7XG4gICAgICAgIGNvbnN0IGlzQ3RybEMgPSAoZSkgPT4gZS5rZXlDb2RlID09PSBDICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KTtcbiAgICAgICAgY29uc3QgaXNDdHJsViA9IChlKSA9PiBlLmtleUNvZGUgPT09IFYgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpO1xuICAgICAgICBjb25zdCBpc0N0cmxYID0gKGUpID0+IGUua2V5Q29kZSA9PT0gWCAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSk7XG4gICAgICAgIGNvbnN0IGlzQ3RybFogPSAoZSkgPT4gZS5rZXlDb2RlID09PSBaICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KTtcblxuICAgICAgICBjb25zdCBpc0ZLZXkgPSAoZSkgPT4gZS5rZXlDb2RlID49IEYxICYmIGUua2V5Q29kZSA8PSBGMTI7XG5cbiAgICAgICAgY29uc3QgaXNOdW1iZXIgPSAoZSkgPT4gKGUua2V5Q29kZSA+PSBaRVJPICYmIGUua2V5Q29kZSA8PSBOSU5FKSB8fFxuICAgICAgICAgICAgKGUua2V5Q29kZSA+PSBOVU1QQURfWkVSTyAmJiBlLmtleUNvZGUgPD0gTlVNUEFEX05JTkUpO1xuXG4gICAgICAgIGNvbnN0IGlzSUVQZXJpb2QgPSAoZSkgPT4gZS5rZXkgPT09ICcuJyB8fCBlLmtleSA9PT0gJ0RlY2ltYWwnO1xuICAgICAgICBjb25zdCBpc05vdElFUGVyaW9kID0gKGUpID0+IGUua2V5ID09PSAnLicgfHwgZS5rZXkgPT09ICcsJztcblxuICAgICAgICBjb25zdCBtaW51c2VzID0gW05VTVBBRF9NSU5VUywgREFTSCwgRkZfTUlOVVNdO1xuICAgICAgICBjb25zdCBzZXJ2aWNlS2V5cyA9IFtERUxFVEUsIEJBQ0tTUEFDRSwgVEFCLCBFU0NBUEUsIEVOVEVSXTtcbiAgICAgICAgY29uc3QgYXJyb3dzID0gW0xFRlRfQVJST1csIFJJR0hUX0FSUk9XXTtcbiAgICAgICAgY29uc3QgYWxsb3dlZEtleXMgPSAgW0hPTUUsIEVORF0uY29uY2F0KGFycm93cykuY29uY2F0KHNlcnZpY2VLZXlzKS5jb25jYXQobWludXNlcyk7XG5cbiAgICAgICAgLy8gRGVjaW1hbCBpcyBmb3IgSUVcbiAgICAgICAgY29uc3QgaXNQZXJpb2QgPSAoZSkgPT4gdGhpcy5wbGF0Zm9ybS5FREdFIHx8IHRoaXMucGxhdGZvcm0uVFJJREVOVFxuICAgICAgICAgICAgPyBpc0lFUGVyaW9kKGUpXG4gICAgICAgICAgICA6IGlzTm90SUVQZXJpb2QoZSk7XG5cbiAgICAgICAgaWYgKGFsbG93ZWRLZXlzLmluZGV4T2Yoa2V5Q29kZSkgIT09IC0xIHx8XG4gICAgICAgICAgICBpc0N0cmxBKGV2ZW50KSB8fFxuICAgICAgICAgICAgaXNDdHJsQyhldmVudCkgfHxcbiAgICAgICAgICAgIGlzQ3RybFYoZXZlbnQpIHx8XG4gICAgICAgICAgICBpc0N0cmxYKGV2ZW50KSB8fFxuICAgICAgICAgICAgaXNDdHJsWihldmVudCkgfHxcbiAgICAgICAgICAgIGlzRktleShldmVudCkgfHxcbiAgICAgICAgICAgIGlzUGVyaW9kKGV2ZW50KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgbm90IGEgbnVtYmVyIGFuZCBzdG9wIHRoZSBrZXlwcmVzc1xuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgfHwgIWlzTnVtYmVyKGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gcHJvY2VzcyBzdGVwc1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5iaWdTdGVwIDogdGhpcy5zdGVwO1xuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBVcChzdGVwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBEb3duKHN0ZXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYXN0ZShldmVudCkge1xuICAgICAgICBpZiAoIWlzRGlnaXQobm9ybWFsaXplU3BsaXR0ZXIoZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JykpKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0ZXBVcChzdGVwOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICBjb25zdCByZXMgPSBNYXRoLm1heChNYXRoLm1pbihhZGQodGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlQXNOdW1iZXIgfHwgMCwgc3RlcCksIHRoaXMubWF4KSwgdGhpcy5taW4pO1xuXG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC52YWx1ZSA9IHJlcy50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMudmlld1RvTW9kZWxVcGRhdGUodGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlQXNOdW1iZXIpO1xuICAgIH1cblxuICAgIHN0ZXBEb3duKHN0ZXA6IG51bWJlcikge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIGNvbnN0IHJlcyA9IE1hdGgubWluKE1hdGgubWF4KGFkZCh0aGlzLm5hdGl2ZUVsZW1lbnQudmFsdWVBc051bWJlciB8fCAwLCAtc3RlcCksIHRoaXMubWluKSwgdGhpcy5tYXgpO1xuXG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC52YWx1ZSA9IHJlcy50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMudmlld1RvTW9kZWxVcGRhdGUodGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlQXNOdW1iZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlld1RvTW9kZWxVcGRhdGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2whLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
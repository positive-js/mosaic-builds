/**
 * @fileoverview added by tsickle
 * Generated from: input-number.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2lucHV0LyIsInNvdXJjZXMiOlsiaW5wdXQtbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsUUFBUSxFQUNSLElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUNILEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFDakQsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUNoRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUN6RSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRy9CLE1BQU0sT0FBTyxRQUFRLEdBQUcsRUFBRTs7QUFDMUIsTUFBTSxPQUFPLFVBQVUsR0FBRyxDQUFDOzs7OztBQUUzQixNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBYTtJQUMzQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNwRCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBYTtJQUNqQyxPQUFPLGNB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WUFBWSxDQUFDLFNBQWtCO1FBQzNCLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQW9COzs7Y0FFcEIsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPOztjQUV2QixPQUFPOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7O2NBQzVELE9BQU87Ozs7UUFBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTs7Y0FDNUQsT0FBTzs7OztRQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBOztjQUM1RCxPQUFPOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7O2NBQzVELE9BQU87Ozs7UUFBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTs7Y0FFNUQsTUFBTTs7OztRQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVB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QjtvQkFDL0IsU0FBUyxFQUFFLG9CQUFvQjtvQkFDL0IsU0FBUyxFQUFFLGlCQUFpQjtvQkFDNUIsV0FBVyxFQUFFLG1CQUFtQjtpQkFDbkM7YUFDSjs7OztZQTlEUSxRQUFRO1lBSWIsVUFBVTtZQUtMLFNBQVMsdUJBZ0ZULFFBQVEsWUFBSSxJQUFJO3lDQUNoQixTQUFTLFNBQUMsTUFBTTt5Q0FDaEIsU0FBUyxTQUFDLFVBQVU7eUNBQ3BCLFNBQVMsU0FBQyxLQUFLO3lDQUNmLFNBQVMsU0FBQyxLQUFLOzs7c0JBN0JuQixLQUFLO21CQUdMLEtBQUs7a0JBR0wsS0FBSztrQkFHTCxLQUFLOzs7O0lBVE4sZ0NBQ2dCOztJQUVoQiw2QkFDYTs7SUFFYiw0QkFDWTs7SUFFWiw0QkFDWTs7SUFFWiw4QkFBVzs7SUFFWCxnQ0FBeUI7O0lBRXpCLHFDQUEyRDs7Ozs7SUFPdkQsaUNBQTBCOzs7OztJQUMxQixtQ0FBOEI7Ozs7O0lBQzlCLGtDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gICAgQXR0cmlidXRlLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIEVORCwgQywgViwgWCwgQSwgWiwgREVMRVRFLCBCQUNLU1BBQ0UsIFRBQiwgRU5URVIsXG4gICAgRVNDQVBFLCBaRVJPLCBOSU5FLCBOVU1QQURfWkVSTywgTlVNUEFEX05JTkUsIE5VTVBBRF9NSU5VUywgREFTSCxcbiAgICBGRl9NSU5VUywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIEhPTUUsIFVQX0FSUk9XLCBET1dOX0FSUk9XLCBGMSwgRjEyXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IGNvbnN0IEJJR19TVEVQID0gMTA7XG5leHBvcnQgY29uc3QgU01BTExfU1RFUCA9IDE7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVTcGxpdHRlcih2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS5yZXBsYWNlKC8sL2csICcuJykgOiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmxvYXQodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXi0/XFxkK1xcLlxcZCskLy50ZXN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL14tP1xcZCskLy50ZXN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlnaXQodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0Zsb2F0KHZhbHVlKSB8fCBpc0ludCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmVjaXNpb24odmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgYXJyID0gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuXG4gICAgcmV0dXJuIGFyci5sZW5ndGggPT09IDFcbiAgICAgICAgPyAxXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIDogIE1hdGgucG93KDEwLCBhcnJbMV0ubGVuZ3RoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZCh2YWx1ZTE6IG51bWJlciwgdmFsdWUyOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHByZWNpc2lvbiA9IE1hdGgubWF4KGdldFByZWNpc2lvbih2YWx1ZTEpLCBnZXRQcmVjaXNpb24odmFsdWUyKSk7XG5cbiAgICByZXR1cm4gKHZhbHVlMSAqIHByZWNpc2lvbiArIHZhbHVlMiAqIHByZWNpc2lvbikgLyBwcmVjaXNpb247XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBpbnB1dFttY0lucHV0XVt0eXBlPVwibnVtYmVyXCJdYCxcbiAgICBleHBvcnRBczogJ21jTnVtZXJpY2FsSW5wdXQnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhibHVyKSc6ICdmb2N1c0NoYW5nZWQoZmFsc2UpJyxcbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXNDaGFuZ2VkKHRydWUpJyxcbiAgICAgICAgJyhwYXN0ZSknOiAnb25QYXN0ZSgkZXZlbnQpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTnVtYmVySW5wdXQge1xuICAgIEBJbnB1dCgpXG4gICAgYmlnU3RlcDogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBzdGVwOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIG1pbjogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBtYXg6IG51bWJlcjtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0gLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQEF0dHJpYnV0ZSgnc3RlcCcpIHN0ZXA6IHN0cmluZyxcbiAgICAgICAgQEF0dHJpYnV0ZSgnYmlnLXN0ZXAnKSBiaWdTdGVwOiBzdHJpbmcsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ21pbicpIG1pbjogc3RyaW5nLFxuICAgICAgICBAQXR0cmlidXRlKCdtYXgnKSBtYXg6IHN0cmluZ1xuICAgICkge1xuICAgICAgICB0aGlzLnN0ZXAgPSBpc0RpZ2l0KHN0ZXApID8gcGFyc2VGbG9hdChzdGVwKSA6IFNNQUxMX1NURVA7XG4gICAgICAgIHRoaXMuYmlnU3RlcCA9IGlzRGlnaXQoYmlnU3RlcCkgPyBwYXJzZUZsb2F0KGJpZ1N0ZXApIDogQklHX1NURVA7XG4gICAgICAgIHRoaXMubWluID0gaXNEaWdpdChtaW4pID8gcGFyc2VGbG9hdChtaW4pIDogLUluZmluaXR5O1xuICAgICAgICB0aGlzLm1heCA9IGlzRGlnaXQobWF4KSA/IHBhcnNlRmxvYXQobWF4KSA6IEluZmluaXR5O1xuXG4gICAgICAgIGlmICgndmFsdWVBc051bWJlcicgaW4gdGhpcy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMubmF0aXZlRWxlbWVudCksICd2YWx1ZUFzTnVtYmVyJywge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZXNlcnZlZC1rZXl3b3Jkc1xuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gcGFyc2VGbG9hdChub3JtYWxpemVTcGxpdHRlcih0aGlzLnZhbHVlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzTmFOKHJlcykgPyBudWxsIDogcmVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNDaGFuZ2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNGb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgY29uc3QgaXNDdHJsQSA9IChlKSA9PiBlLmtleUNvZGUgPT09IEEgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpO1xuICAgICAgICBjb25zdCBpc0N0cmxDID0gKGUpID0+IGUua2V5Q29kZSA9PT0gQyAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSk7XG4gICAgICAgIGNvbnN0IGlzQ3RybFYgPSAoZSkgPT4gZS5rZXlDb2RlID09PSBWICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KTtcbiAgICAgICAgY29uc3QgaXNDdHJsWCA9IChlKSA9PiBlLmtleUNvZGUgPT09IFggJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpO1xuICAgICAgICBjb25zdCBpc0N0cmxaID0gKGUpID0+IGUua2V5Q29kZSA9PT0gWiAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSk7XG5cbiAgICAgICAgY29uc3QgaXNGS2V5ID0gKGUpID0+IGUua2V5Q29kZSA+PSBGMSAmJiBlLmtleUNvZGUgPD0gRjEyO1xuXG4gICAgICAgIGNvbnN0IGlzTnVtYmVyID0gKGUpID0+IChlLmtleUNvZGUgPj0gWkVSTyAmJiBlLmtleUNvZGUgPD0gTklORSkgfHxcbiAgICAgICAgICAgIChlLmtleUNvZGUgPj0gTlVNUEFEX1pFUk8gJiYgZS5rZXlDb2RlIDw9IE5VTVBBRF9OSU5FKTtcblxuICAgICAgICBjb25zdCBpc0lFUGVyaW9kID0gKGUpID0+IGUua2V5ID09PSAnLicgfHwgZS5rZXkgPT09ICdEZWNpbWFsJztcbiAgICAgICAgY29uc3QgaXNOb3RJRVBlcmlvZCA9IChlKSA9PiBlLmtleSA9PT0gJy4nIHx8IGUua2V5ID09PSAnLCc7XG5cbiAgICAgICAgY29uc3QgbWludXNlcyA9IFtOVU1QQURfTUlOVVMsIERBU0gsIEZGX01JTlVTXTtcbiAgICAgICAgY29uc3Qgc2VydmljZUtleXMgPSBbREVMRVRFLCBCQUNLU1BBQ0UsIFRBQiwgRVNDQVBFLCBFTlRFUl07XG4gICAgICAgIGNvbnN0IGFycm93cyA9IFtMRUZUX0FSUk9XLCBSSUdIVF9BUlJPV107XG4gICAgICAgIGNvbnN0IGFsbG93ZWRLZXlzID0gIFtIT01FLCBFTkRdLmNvbmNhdChhcnJvd3MpLmNvbmNhdChzZXJ2aWNlS2V5cykuY29uY2F0KG1pbnVzZXMpO1xuXG4gICAgICAgIC8vIERlY2ltYWwgaXMgZm9yIElFXG4gICAgICAgIGNvbnN0IGlzUGVyaW9kID0gKGUpID0+IHRoaXMucGxhdGZvcm0uRURHRSB8fCB0aGlzLnBsYXRmb3JtLlRSSURFTlRcbiAgICAgICAgICAgID8gaXNJRVBlcmlvZChlKVxuICAgICAgICAgICAgOiBpc05vdElFUGVyaW9kKGUpO1xuXG4gICAgICAgIGlmIChhbGxvd2VkS2V5cy5pbmRleE9mKGtleUNvZGUpICE9PSAtMSB8fFxuICAgICAgICAgICAgaXNDdHJsQShldmVudCkgfHxcbiAgICAgICAgICAgIGlzQ3RybEMoZXZlbnQpIHx8XG4gICAgICAgICAgICBpc0N0cmxWKGV2ZW50KSB8fFxuICAgICAgICAgICAgaXNDdHJsWChldmVudCkgfHxcbiAgICAgICAgICAgIGlzQ3RybFooZXZlbnQpIHx8XG4gICAgICAgICAgICBpc0ZLZXkoZXZlbnQpIHx8XG4gICAgICAgICAgICBpc1BlcmlvZChldmVudClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBsZXQgaXQgaGFwcGVuLCBkb24ndCBkbyBhbnl0aGluZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIG5vdCBhIG51bWJlciBhbmQgc3RvcCB0aGUga2V5cHJlc3NcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5IHx8ICFpc051bWJlcihldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIHByb2Nlc3Mgc3RlcHNcbiAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSBldmVudC5zaGlmdEtleSA/IHRoaXMuYmlnU3RlcCA6IHRoaXMuc3RlcDtcblxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IFVQX0FSUk9XKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwVXAoc3RlcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwRG93bihzdGVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGFzdGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFpc0RpZ2l0KG5vcm1hbGl6ZVNwbGl0dGVyKGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpKSkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGVwVXAoc3RlcDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgY29uc3QgcmVzID0gTWF0aC5tYXgoTWF0aC5taW4oYWRkKHRoaXMubmF0aXZlRWxlbWVudC52YWx1ZUFzTnVtYmVyIHx8IDAsIHN0ZXApLCB0aGlzLm1heCksIHRoaXMubWluKTtcblxuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSByZXMudG9TdHJpbmcoKTtcblxuICAgICAgICB0aGlzLnZpZXdUb01vZGVsVXBkYXRlKHRoaXMubmF0aXZlRWxlbWVudC52YWx1ZUFzTnVtYmVyKTtcbiAgICB9XG5cbiAgICBzdGVwRG93bihzdGVwOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICBjb25zdCByZXMgPSBNYXRoLm1pbihNYXRoLm1heChhZGQodGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlQXNOdW1iZXIgfHwgMCwgLXN0ZXApLCB0aGlzLm1pbiksIHRoaXMubWF4KTtcblxuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSByZXMudG9TdHJpbmcoKTtcblxuICAgICAgICB0aGlzLnZpZXdUb01vZGVsVXBkYXRlKHRoaXMubmF0aXZlRWxlbWVudC52YWx1ZUFzTnVtYmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpZXdUb01vZGVsVXBkYXRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sIS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
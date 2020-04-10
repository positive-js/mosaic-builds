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
export var BIG_STEP = 10;
/** @type {?} */
export var SMALL_STEP = 1;
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
    var arr = value.toString().split('.');
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
    var precision = Math.max(getPrecision(value1), getPrecision(value2));
    return (value1 * precision + value2 * precision) / precision;
}
var McNumberInput = /** @class */ (function () {
    function McNumberInput(platform, elementRef, ngControl, step, bigStep, min, max) {
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
                get: 
                // tslint:disable-next-line:no-reserved-keywords
                /**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var res = parseFloat(normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    Object.defineProperty(McNumberInput.prototype, "nativeElement", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} isFocused
     * @return {?}
     */
    McNumberInput.prototype.focusChanged = /**
     * @param {?} isFocused
     * @return {?}
     */
    function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McNumberInput.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // tslint:disable-next-line:deprecation
        /** @type {?} */
        var keyCode = event.keyCode;
        /** @type {?} */
        var isCtrlA = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === A && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isCtrlC = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === C && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isCtrlV = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === V && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isCtrlX = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === X && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isCtrlZ = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode === Z && (e.ctrlKey || e.metaKey); });
        /** @type {?} */
        var isFKey = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.keyCode >= F1 && e.keyCode <= F12; });
        /** @type {?} */
        var isNumber = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return (e.keyCode >= ZERO && e.keyCode <= NINE) ||
            (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE); });
        /** @type {?} */
        var isIEPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.key === '.' || e.key === 'Decimal'; });
        /** @type {?} */
        var isNotIEPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.key === '.' || e.key === ','; });
        /** @type {?} */
        var minuses = [NUMPAD_MINUS, DASH, FF_MINUS];
        /** @type {?} */
        var serviceKeys = [DELETE, BACKSPACE, TAB, ESCAPE, ENTER];
        /** @type {?} */
        var arrows = [LEFT_ARROW, RIGHT_ARROW];
        /** @type {?} */
        var allowedKeys = [HOME, END].concat(arrows).concat(serviceKeys).concat(minuses);
        // Decimal is for IE
        /** @type {?} */
        var isPeriod = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.platform.EDGE || _this.platform.TRIDENT
            ? isIEPeriod(e)
            : isNotIEPeriod(e); });
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
            var step = event.shiftKey ? this.bigStep : this.step;
            if (keyCode === UP_ARROW) {
                this.stepUp(step);
            }
            if (keyCode === DOWN_ARROW) {
                this.stepDown(step);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McNumberInput.prototype.onPaste = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!isDigit(normalizeSplitter(event.clipboardData.getData('text')))) {
            event.preventDefault();
        }
    };
    /**
     * @param {?} step
     * @return {?}
     */
    McNumberInput.prototype.stepUp = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.elementRef.nativeElement.focus();
        /** @type {?} */
        var res = Math.max(Math.min(add(this.nativeElement.valueAsNumber || 0, step), this.max), this.min);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    };
    /**
     * @param {?} step
     * @return {?}
     */
    McNumberInput.prototype.stepDown = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.elementRef.nativeElement.focus();
        /** @type {?} */
        var res = Math.min(Math.max(add(this.nativeElement.valueAsNumber || 0, -step), this.min), this.max);
        this.nativeElement.value = res.toString();
        this.viewToModelUpdate(this.nativeElement.valueAsNumber);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McNumberInput.prototype.viewToModelUpdate = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.ngControl) {
            (/** @type {?} */ (this.ngControl.control)).setValue(value);
        }
    };
    McNumberInput.decorators = [
        { type: Directive, args: [{
                    selector: "input[mcInput][type=\"number\"]",
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
    McNumberInput.ctorParameters = function () { return [
        { type: Platform },
        { type: ElementRef },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
        { type: String, decorators: [{ type: Attribute, args: ['step',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['big-step',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['min',] }] },
        { type: String, decorators: [{ type: Attribute, args: ['max',] }] }
    ]; };
    McNumberInput.propDecorators = {
        bigStep: [{ type: Input }],
        step: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }]
    };
    return McNumberInput;
}());
export { McNumberInput };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2lucHV0LyIsInNvdXJjZXMiOlsiaW5wdXQtbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsUUFBUSxFQUNSLElBQUksRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUNILEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFDakQsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUNoRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUN6RSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRy9CLE1BQU0sS0FBTyxRQUFRLEdBQUcsRUFBRTs7QUFDMUIsTUFBTSxLQUFPLFVBQVUsR0FBRyxDQUFDOzs7OztBQUUzQixNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBYTtJQUMzQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNwRCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBYTtJQUNqQyxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsS0FBSyxDQUFDLEtBQWE7SUFDL0IsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxLQUFhO0lBQ2pDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBYTs7UUFDaEMsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBRXZDLE9BQU8sR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsNENBQTRDO1FBQzVDLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkMsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFjLEVBQUUsTUFBYzs7UUFDeEMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV0RSxPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBQ2pFLENBQUM7QUFHRDtJQWlDSSx1QkFDWSxRQUFrQixFQUNsQixVQUFzQixFQUNGLFNBQW9CLEVBQzdCLElBQVksRUFDUixPQUFlLEVBQ3BCLEdBQVcsRUFDWCxHQUFXO1FBTnJCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNGLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFYcEQsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUVoQixpQkFBWSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBZXZELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDakUsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDdEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRXJELElBQUksZUFBZSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxlQUFlLEVBQUU7Z0JBQzlFLGdEQUFnRDtnQkFDaEQsR0FBRzs7Ozs7Ozt3QkFDTyxHQUFHLEdBQUcsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFckQsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBNUJELHNCQUFJLHdDQUFhOzs7O1FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTs7Ozs7SUE0QkQsb0NBQVk7Ozs7SUFBWixVQUFhLFNBQWtCO1FBQzNCLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7O0lBRUQsaUNBQVM7Ozs7SUFBVCxVQUFVLEtBQW9CO1FBQTlCLGlCQXVEQzs7O1lBckRTLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTzs7WUFFdkIsT0FBTzs7OztRQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQTs7WUFDNUQsT0FBTzs7OztRQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQTs7WUFDNUQsT0FBTzs7OztRQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQTs7WUFDNUQsT0FBTzs7OztRQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQTs7WUFDNUQsT0FBTzs7OztRQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQTs7WUFFNUQsTUFBTTs7OztRQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxHQUFHLEVBQW5DLENBQW1DLENBQUE7O1lBRW5ELFFBQVE7Ozs7UUFBRyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7WUFDNUQsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQURsQyxDQUNrQyxDQUFBOztZQUVwRCxVQUFVOzs7O1FBQUcsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBcEMsQ0FBb0MsQ0FBQTs7WUFDeEQsYUFBYTs7OztRQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQTlCLENBQThCLENBQUE7O1lBRXJELE9BQU8sR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDOztZQUN4QyxXQUFXLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDOztZQUNyRCxNQUFNLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDOztZQUNsQyxXQUFXLEdBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOzs7WUFHN0UsUUFBUTs7OztRQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQy9ELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFGRSxDQUVGLENBQUE7UUFFdEIsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDYixRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ2pCO1lBQ0UsbUNBQW1DO1lBQ25DLE9BQU87U0FDVjtRQUNELHVEQUF1RDtRQUN2RCxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7Z0JBR2pCLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUV0RCxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7WUFFRCxJQUFJLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkI7U0FDSjtJQUNMLENBQUM7Ozs7O0lBRUQsK0JBQU87Ozs7SUFBUCxVQUFRLEtBQUs7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs7OztJQUVELDhCQUFNOzs7O0lBQU4sVUFBTyxJQUFZO1FBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7O1lBRWhDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVwRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7SUFFRCxnQ0FBUTs7OztJQUFSLFVBQVMsSUFBWTtRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFFaEMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFckcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7OztJQUVPLHlDQUFpQjs7Ozs7SUFBekIsVUFBMEIsS0FBYTtRQUNuQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsbUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDOztnQkF6SkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQ0FBK0I7b0JBQ3pDLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLElBQUksRUFBRTt3QkFDRixRQUFRLEVBQUUscUJBQXFCO3dCQUMvQixTQUFTLEVBQUUsb0JBQW9CO3dCQUMvQixTQUFTLEVBQUUsaUJBQWlCO3dCQUM1QixXQUFXLEVBQUUsbUJBQW1CO3FCQUNuQztpQkFDSjs7OztnQkE5RFEsUUFBUTtnQkFJYixVQUFVO2dCQUtMLFNBQVMsdUJBZ0ZULFFBQVEsWUFBSSxJQUFJOzZDQUNoQixTQUFTLFNBQUMsTUFBTTs2Q0FDaEIsU0FBUyxTQUFDLFVBQVU7NkNBQ3BCLFNBQVMsU0FBQyxLQUFLOzZDQUNmLFNBQVMsU0FBQyxLQUFLOzs7MEJBN0JuQixLQUFLO3VCQUdMLEtBQUs7c0JBR0wsS0FBSztzQkFHTCxLQUFLOztJQXNJVixvQkFBQztDQUFBLEFBMUpELElBMEpDO1NBaEpZLGFBQWE7OztJQUN0QixnQ0FDZ0I7O0lBRWhCLDZCQUNhOztJQUViLDRCQUNZOztJQUVaLDRCQUNZOztJQUVaLDhCQUFXOztJQUVYLGdDQUF5Qjs7SUFFekIscUNBQTJEOzs7OztJQU92RCxpQ0FBMEI7Ozs7O0lBQzFCLG1DQUE4Qjs7Ozs7SUFDOUIsa0NBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgICBBdHRyaWJ1dGUsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gICAgRU5ELCBDLCBWLCBYLCBBLCBaLCBERUxFVEUsIEJBQ0tTUEFDRSwgVEFCLCBFTlRFUixcbiAgICBFU0NBUEUsIFpFUk8sIE5JTkUsIE5VTVBBRF9aRVJPLCBOVU1QQURfTklORSwgTlVNUEFEX01JTlVTLCBEQVNILFxuICAgIEZGX01JTlVTLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPVywgSE9NRSwgVVBfQVJST1csIERPV05fQVJST1csIEYxLCBGMTJcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuXG5leHBvcnQgY29uc3QgQklHX1NURVAgPSAxMDtcbmV4cG9ydCBjb25zdCBTTUFMTF9TVEVQID0gMTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVNwbGl0dGVyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UoLywvZywgJy4nKSA6IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGbG9hdCh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eLT9cXGQrXFwuXFxkKyQvLnRlc3QodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnQodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXi0/XFxkKyQvLnRlc3QodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaWdpdCh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmxvYXQodmFsdWUpIHx8IGlzSW50KHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZWNpc2lvbih2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBhcnIgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcuJyk7XG5cbiAgICByZXR1cm4gYXJyLmxlbmd0aCA9PT0gMVxuICAgICAgICA/IDFcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgOiAgTWF0aC5wb3coMTAsIGFyclsxXS5sZW5ndGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkKHZhbHVlMTogbnVtYmVyLCB2YWx1ZTI6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcHJlY2lzaW9uID0gTWF0aC5tYXgoZ2V0UHJlY2lzaW9uKHZhbHVlMSksIGdldFByZWNpc2lvbih2YWx1ZTIpKTtcblxuICAgIHJldHVybiAodmFsdWUxICogcHJlY2lzaW9uICsgdmFsdWUyICogcHJlY2lzaW9uKSAvIHByZWNpc2lvbjtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYGlucHV0W21jSW5wdXRdW3R5cGU9XCJudW1iZXJcIl1gLFxuICAgIGV4cG9ydEFzOiAnbWNOdW1lcmljYWxJbnB1dCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJsdXIpJzogJ2ZvY3VzQ2hhbmdlZChmYWxzZSknLFxuICAgICAgICAnKGZvY3VzKSc6ICdmb2N1c0NoYW5nZWQodHJ1ZSknLFxuICAgICAgICAnKHBhc3RlKSc6ICdvblBhc3RlKCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOdW1iZXJJbnB1dCB7XG4gICAgQElucHV0KClcbiAgICBiaWdTdGVwOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIHN0ZXA6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgbWluOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKVxuICAgIG1heDogbnVtYmVyO1xuXG4gICAgdmFsdWU6IGFueTtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgbmF0aXZlRWxlbWVudCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSAsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcml2YXRlIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAQXR0cmlidXRlKCdzdGVwJykgc3RlcDogc3RyaW5nLFxuICAgICAgICBAQXR0cmlidXRlKCdiaWctc3RlcCcpIGJpZ1N0ZXA6IHN0cmluZyxcbiAgICAgICAgQEF0dHJpYnV0ZSgnbWluJykgbWluOiBzdHJpbmcsXG4gICAgICAgIEBBdHRyaWJ1dGUoJ21heCcpIG1heDogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc3RlcCA9IGlzRGlnaXQoc3RlcCkgPyBwYXJzZUZsb2F0KHN0ZXApIDogU01BTExfU1RFUDtcbiAgICAgICAgdGhpcy5iaWdTdGVwID0gaXNEaWdpdChiaWdTdGVwKSA/IHBhcnNlRmxvYXQoYmlnU3RlcCkgOiBCSUdfU1RFUDtcbiAgICAgICAgdGhpcy5taW4gPSBpc0RpZ2l0KG1pbikgPyBwYXJzZUZsb2F0KG1pbikgOiAtSW5maW5pdHk7XG4gICAgICAgIHRoaXMubWF4ID0gaXNEaWdpdChtYXgpID8gcGFyc2VGbG9hdChtYXgpIDogSW5maW5pdHk7XG5cbiAgICAgICAgaWYgKCd2YWx1ZUFzTnVtYmVyJyBpbiB0aGlzLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcy5uYXRpdmVFbGVtZW50KSwgJ3ZhbHVlQXNOdW1iZXInLCB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBwYXJzZUZsb2F0KG5vcm1hbGl6ZVNwbGl0dGVyKHRoaXMudmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNOYU4ocmVzKSA/IG51bGwgOiByZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1c0NoYW5nZWQoaXNGb2N1c2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0ZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBjb25zdCBpc0N0cmxBID0gKGUpID0+IGUua2V5Q29kZSA9PT0gQSAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSk7XG4gICAgICAgIGNvbnN0IGlzQ3RybEMgPSAoZSkgPT4gZS5rZXlDb2RlID09PSBDICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KTtcbiAgICAgICAgY29uc3QgaXNDdHJsViA9IChlKSA9PiBlLmtleUNvZGUgPT09IFYgJiYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpO1xuICAgICAgICBjb25zdCBpc0N0cmxYID0gKGUpID0+IGUua2V5Q29kZSA9PT0gWCAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSk7XG4gICAgICAgIGNvbnN0IGlzQ3RybFogPSAoZSkgPT4gZS5rZXlDb2RlID09PSBaICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KTtcblxuICAgICAgICBjb25zdCBpc0ZLZXkgPSAoZSkgPT4gZS5rZXlDb2RlID49IEYxICYmIGUua2V5Q29kZSA8PSBGMTI7XG5cbiAgICAgICAgY29uc3QgaXNOdW1iZXIgPSAoZSkgPT4gKGUua2V5Q29kZSA+PSBaRVJPICYmIGUua2V5Q29kZSA8PSBOSU5FKSB8fFxuICAgICAgICAgICAgKGUua2V5Q29kZSA+PSBOVU1QQURfWkVSTyAmJiBlLmtleUNvZGUgPD0gTlVNUEFEX05JTkUpO1xuXG4gICAgICAgIGNvbnN0IGlzSUVQZXJpb2QgPSAoZSkgPT4gZS5rZXkgPT09ICcuJyB8fCBlLmtleSA9PT0gJ0RlY2ltYWwnO1xuICAgICAgICBjb25zdCBpc05vdElFUGVyaW9kID0gKGUpID0+IGUua2V5ID09PSAnLicgfHwgZS5rZXkgPT09ICcsJztcblxuICAgICAgICBjb25zdCBtaW51c2VzID0gW05VTVBBRF9NSU5VUywgREFTSCwgRkZfTUlOVVNdO1xuICAgICAgICBjb25zdCBzZXJ2aWNlS2V5cyA9IFtERUxFVEUsIEJBQ0tTUEFDRSwgVEFCLCBFU0NBUEUsIEVOVEVSXTtcbiAgICAgICAgY29uc3QgYXJyb3dzID0gW0xFRlRfQVJST1csIFJJR0hUX0FSUk9XXTtcbiAgICAgICAgY29uc3QgYWxsb3dlZEtleXMgPSAgW0hPTUUsIEVORF0uY29uY2F0KGFycm93cykuY29uY2F0KHNlcnZpY2VLZXlzKS5jb25jYXQobWludXNlcyk7XG5cbiAgICAgICAgLy8gRGVjaW1hbCBpcyBmb3IgSUVcbiAgICAgICAgY29uc3QgaXNQZXJpb2QgPSAoZSkgPT4gdGhpcy5wbGF0Zm9ybS5FREdFIHx8IHRoaXMucGxhdGZvcm0uVFJJREVOVFxuICAgICAgICAgICAgPyBpc0lFUGVyaW9kKGUpXG4gICAgICAgICAgICA6IGlzTm90SUVQZXJpb2QoZSk7XG5cbiAgICAgICAgaWYgKGFsbG93ZWRLZXlzLmluZGV4T2Yoa2V5Q29kZSkgIT09IC0xIHx8XG4gICAgICAgICAgICBpc0N0cmxBKGV2ZW50KSB8fFxuICAgICAgICAgICAgaXNDdHJsQyhldmVudCkgfHxcbiAgICAgICAgICAgIGlzQ3RybFYoZXZlbnQpIHx8XG4gICAgICAgICAgICBpc0N0cmxYKGV2ZW50KSB8fFxuICAgICAgICAgICAgaXNDdHJsWihldmVudCkgfHxcbiAgICAgICAgICAgIGlzRktleShldmVudCkgfHxcbiAgICAgICAgICAgIGlzUGVyaW9kKGV2ZW50KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgbm90IGEgbnVtYmVyIGFuZCBzdG9wIHRoZSBrZXlwcmVzc1xuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgfHwgIWlzTnVtYmVyKGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gcHJvY2VzcyBzdGVwc1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5iaWdTdGVwIDogdGhpcy5zdGVwO1xuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBVcChzdGVwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBEb3duKHN0ZXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYXN0ZShldmVudCkge1xuICAgICAgICBpZiAoIWlzRGlnaXQobm9ybWFsaXplU3BsaXR0ZXIoZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JykpKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0ZXBVcChzdGVwOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICBjb25zdCByZXMgPSBNYXRoLm1heChNYXRoLm1pbihhZGQodGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlQXNOdW1iZXIgfHwgMCwgc3RlcCksIHRoaXMubWF4KSwgdGhpcy5taW4pO1xuXG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC52YWx1ZSA9IHJlcy50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMudmlld1RvTW9kZWxVcGRhdGUodGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlQXNOdW1iZXIpO1xuICAgIH1cblxuICAgIHN0ZXBEb3duKHN0ZXA6IG51bWJlcikge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIGNvbnN0IHJlcyA9IE1hdGgubWluKE1hdGgubWF4KGFkZCh0aGlzLm5hdGl2ZUVsZW1lbnQudmFsdWVBc051bWJlciB8fCAwLCAtc3RlcCksIHRoaXMubWluKSwgdGhpcy5tYXgpO1xuXG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudC52YWx1ZSA9IHJlcy50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMudmlld1RvTW9kZWxVcGRhdGUodGhpcy5uYXRpdmVFbGVtZW50LnZhbHVlQXNOdW1iZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlld1RvTW9kZWxVcGRhdGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2whLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
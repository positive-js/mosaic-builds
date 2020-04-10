/**
 * @fileoverview added by tsickle
 * Generated from: formatters/number/formatter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign } from "tslib";
/* tslint:disable:naming-convention */
import { Inject, Injectable, InjectionToken, Optional, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/** @type {?} */
export var MC_LOCALE_ID = new InjectionToken('McLocaleId');
/** @type {?} */
export var DEFAULT_MC_LOCALE_ID = 'ru';
/**
 * @param {?} value
 * @return {?}
 */
function isEmpty(value) {
    return value == null || value === '' || value !== value;
}
/**
 * @param {?} value
 * @return {?}
 */
function strToNumber(value) {
    if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
        return Number(value);
    }
    if (typeof value !== 'number') {
        throw new Error(value + " is not a number");
    }
    return value;
}
/** @type {?} */
export var NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
/** @type {?} */
var minIntGroupPosition = 1;
/** @type {?} */
var minFractionGroupPosition = 3;
/** @type {?} */
var maxFractionGroupPosition = 5;
/**
 * @record
 */
function NumberFormatOptions() { }
if (false) {
    /** @type {?} */
    NumberFormatOptions.prototype.useGrouping;
    /** @type {?} */
    NumberFormatOptions.prototype.minimumIntegerDigits;
    /** @type {?} */
    NumberFormatOptions.prototype.minimumFractionDigits;
    /** @type {?} */
    NumberFormatOptions.prototype.maximumFractionDigits;
    /** @type {?} */
    NumberFormatOptions.prototype.minimumSignificantDigits;
    /** @type {?} */
    NumberFormatOptions.prototype.maximumSignificantDigits;
    /** @type {?|undefined} */
    NumberFormatOptions.prototype.localeMatcher;
    /** @type {?|undefined} */
    NumberFormatOptions.prototype.style;
    /** @type {?|undefined} */
    NumberFormatOptions.prototype.currency;
    /** @type {?|undefined} */
    NumberFormatOptions.prototype.currencyDisplay;
}
var ParsedDigitsInfo = /** @class */ (function () {
    function ParsedDigitsInfo() {
    }
    return ParsedDigitsInfo;
}());
if (false) {
    /** @type {?} */
    ParsedDigitsInfo.prototype.minimumIntegerDigits;
    /** @type {?} */
    ParsedDigitsInfo.prototype.minimumFractionDigits;
    /** @type {?} */
    ParsedDigitsInfo.prototype.maximumFractionDigits;
}
/**
 * @param {?} digitsInfo
 * @return {?}
 */
function parseDigitsInfo(digitsInfo) {
    /** @type {?} */
    var parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
    if (parts === null) {
        throw new Error(digitsInfo + " is not a valid digit info");
    }
    /** @type {?} */
    var minIntPart = parts[minIntGroupPosition];
    /** @type {?} */
    var minFractionPart = parts[minFractionGroupPosition];
    /** @type {?} */
    var maxFractionPart = parts[maxFractionGroupPosition];
    /** @type {?} */
    var result = new ParsedDigitsInfo();
    if (minIntPart != null) {
        result.minimumIntegerDigits = parseInt(minIntPart);
    }
    if (minFractionPart != null) {
        result.minimumFractionDigits = parseInt(minFractionPart);
    }
    if (maxFractionPart != null) {
        result.maximumFractionDigits = parseInt(maxFractionPart);
    }
    else if (minFractionPart != null && result.minimumFractionDigits > result.maximumFractionDigits) {
        result.maximumFractionDigits = result.minimumFractionDigits;
    }
    return result;
}
var McDecimalPipe = /** @class */ (function () {
    function McDecimalPipe(_locale) {
        this._locale = _locale;
    }
    /**
     * @param value The number to be formatted.
     * @param digitsInfo Decimal representation options, specified by a string
     * in the following format:<br>
     * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
     *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
     * Default is `1`.
     *   - `minFractionDigits`: The minimum number of digits after the decimal point.
     * Default is `0`.
     *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
     * Default is `3`.
     * @param locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `MC_LOCALE_ID`, which is `ru` by default.
     */
    /**
     * @param {?} value The number to be formatted.
     * @param {?=} digitsInfo Decimal representation options, specified by a string
     * in the following format:<br>
     * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
     *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
     * Default is `1`.
     *   - `minFractionDigits`: The minimum number of digits after the decimal point.
     * Default is `0`.
     *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
     * Default is `3`.
     * @param {?=} locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `MC_LOCALE_ID`, which is `ru` by default.
     * @return {?}
     */
    McDecimalPipe.prototype.transform = /**
     * @param {?} value The number to be formatted.
     * @param {?=} digitsInfo Decimal representation options, specified by a string
     * in the following format:<br>
     * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
     *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
     * Default is `1`.
     *   - `minFractionDigits`: The minimum number of digits after the decimal point.
     * Default is `0`.
     *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
     * Default is `3`.
     * @param {?=} locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `MC_LOCALE_ID`, which is `ru` by default.
     * @return {?}
     */
    function (value, digitsInfo, locale) {
        if (isEmpty(value)) {
            return null;
        }
        /** @type {?} */
        var currentLocale = locale || this._locale || DEFAULT_MC_LOCALE_ID;
        /** @type {?} */
        var parsedDigitsInfo;
        if (digitsInfo) {
            parsedDigitsInfo = parseDigitsInfo(digitsInfo);
        }
        /** @type {?} */
        var options = __assign({ useGrouping: true, minimumIntegerDigits: 1, minimumFractionDigits: 0, maximumFractionDigits: 3 }, parsedDigitsInfo);
        try {
            /** @type {?} */
            var num = strToNumber(value);
            return Intl.NumberFormat.call(this, currentLocale, options).format(num);
        }
        catch (error) {
            throw Error("InvalidPipeArgument: McDecimalPipe for pipe '" + JSON.stringify(error.message) + "'");
        }
    };
    McDecimalPipe.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
        { type: Pipe, args: [{ name: 'mcNumber' },] }
    ];
    /** @nocollapse */
    McDecimalPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MC_LOCALE_ID,] }] }
    ]; };
    /** @nocollapse */ McDecimalPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function McDecimalPipe_Factory() { return new McDecimalPipe(i0.ɵɵinject(MC_LOCALE_ID, 8)); }, token: McDecimalPipe, providedIn: "root" });
    return McDecimalPipe;
}());
export { McDecimalPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    McDecimalPipe.prototype._locale;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJmb3JtYXR0ZXJzL251bWJlci9mb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7O0FBR2xHLE1BQU0sS0FBTyxZQUFZLEdBQUcsSUFBSSxjQUFjLENBQVMsWUFBWSxDQUFDOztBQUVwRSxNQUFNLEtBQU8sb0JBQW9CLEdBQUcsSUFBSTs7Ozs7QUFHeEMsU0FBUyxPQUFPLENBQUMsS0FBVTtJQUN2QixPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO0FBQzVELENBQUM7Ozs7O0FBRUQsU0FBUyxXQUFXLENBQUMsS0FBc0I7SUFDdkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3hFLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCO0lBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBSSxLQUFLLHFCQUFrQixDQUFDLENBQUM7S0FDL0M7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDOztBQUVELE1BQU0sS0FBTyxvQkFBb0IsR0FBRyw2QkFBNkI7O0lBRTNELG1CQUFtQixHQUFHLENBQUM7O0lBQ3ZCLHdCQUF3QixHQUFHLENBQUM7O0lBQzVCLHdCQUF3QixHQUFHLENBQUM7Ozs7QUFFbEMsa0NBY0M7OztJQWJHLDBDQUFxQjs7SUFFckIsbURBQTZCOztJQUM3QixvREFBOEI7O0lB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QkF2RmhEO0NBa0lDLEFBOUNELElBOENDO1NBNUNZLGFBQWE7Ozs7OztJQUNWLGdDQUF5RCIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOm5hbWluZy1jb252ZW50aW9uICovXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmV4cG9ydCBjb25zdCBNQ19MT0NBTEVfSUQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignTWNMb2NhbGVJZCcpO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQ19MT0NBTEVfSUQgPSAncnUnO1xuXG5cbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHN0clRvTnVtYmVyKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBudW1iZXIge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmICFpc05hTihOdW1iZXIodmFsdWUpIC0gcGFyc2VGbG9hdCh2YWx1ZSkpKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt2YWx1ZX0gaXMgbm90IGEgbnVtYmVyYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgY29uc3QgTlVNQkVSX0ZPUk1BVF9SRUdFWFAgPSAvXihcXGQrKT9cXC4oKFxcZCspKC0oXFxkKykpPyk/JC87XG5cbmNvbnN0IG1pbkludEdyb3VwUG9zaXRpb24gPSAxO1xuY29uc3QgbWluRnJhY3Rpb25Hcm91cFBvc2l0aW9uID0gMztcbmNvbnN0IG1heEZyYWN0aW9uR3JvdXBQb3NpdGlvbiA9IDU7XG5cbmludGVyZmFjZSBOdW1iZXJGb3JtYXRPcHRpb25zIHtcbiAgICB1c2VHcm91cGluZzogYm9vbGVhbjtcblxuICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiBudW1iZXI7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XG4gICAgbWluaW11bVNpZ25pZmljYW50RGlnaXRzOiBudW1iZXI7XG4gICAgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiBudW1iZXI7XG5cbiAgICBsb2NhbGVNYXRjaGVyPzogc3RyaW5nO1xuICAgIHN0eWxlPzogc3RyaW5nO1xuXG4gICAgY3VycmVuY3k/OiBzdHJpbmc7XG4gICAgY3VycmVuY3lEaXNwbGF5Pzogc3RyaW5nO1xufVxuXG5jbGFzcyBQYXJzZWREaWdpdHNJbmZvIHtcbiAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogbnVtYmVyO1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBwYXJzZURpZ2l0c0luZm8oZGlnaXRzSW5mbzogc3RyaW5nKTogUGFyc2VkRGlnaXRzSW5mbyB7XG4gICAgY29uc3QgcGFydHMgPSBkaWdpdHNJbmZvLm1hdGNoKE5VTUJFUl9GT1JNQVRfUkVHRVhQKTtcblxuICAgIGlmIChwYXJ0cyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZGlnaXRzSW5mb30gaXMgbm90IGEgdmFsaWQgZGlnaXQgaW5mb2ApO1xuICAgIH1cblxuICAgIGNvbnN0IG1pbkludFBhcnQgPSBwYXJ0c1ttaW5JbnRHcm91cFBvc2l0aW9uXTtcbiAgICBjb25zdCBtaW5GcmFjdGlvblBhcnQgPSBwYXJ0c1ttaW5GcmFjdGlvbkdyb3VwUG9zaXRpb25dO1xuICAgIGNvbnN0IG1heEZyYWN0aW9uUGFydCA9IHBhcnRzW21heEZyYWN0aW9uR3JvdXBQb3NpdGlvbl07XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUGFyc2VkRGlnaXRzSW5mbygpO1xuXG4gICAgaWYgKG1pbkludFBhcnQgIT0gbnVsbCkge1xuICAgICAgICByZXN1bHQubWluaW11bUludGVnZXJEaWdpdHMgPSBwYXJzZUludChtaW5JbnRQYXJ0KTtcbiAgICB9XG5cbiAgICBpZiAobWluRnJhY3Rpb25QYXJ0ICE9IG51bGwpIHtcbiAgICAgICAgcmVzdWx0Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA9IHBhcnNlSW50KG1pbkZyYWN0aW9uUGFydCk7XG4gICAgfVxuXG4gICAgaWYgKG1heEZyYWN0aW9uUGFydCAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdC5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPSBwYXJzZUludChtYXhGcmFjdGlvblBhcnQpO1xuICAgIH0gZWxzZSBpZiAobWluRnJhY3Rpb25QYXJ0ICE9IG51bGwgJiYgcmVzdWx0Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA+IHJlc3VsdC5tYXhpbXVtRnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgcmVzdWx0Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA9IHJlc3VsdC5taW5pbXVtRnJhY3Rpb25EaWdpdHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuQFBpcGUoe25hbWU6ICdtY051bWJlcid9KVxuZXhwb3J0IGNsYXNzIE1jRGVjaW1hbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0xPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcpIHt9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIG51bWJlciB0byBiZSBmb3JtYXR0ZWQuXG4gICAgICogQHBhcmFtIGRpZ2l0c0luZm8gRGVjaW1hbCByZXByZXNlbnRhdGlvbiBvcHRpb25zLCBzcGVjaWZpZWQgYnkgYSBzdHJpbmdcbiAgICAgKiBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDo8YnI+XG4gICAgICogPGNvZGU+e21pbkludGVnZXJEaWdpdHN9LnttaW5GcmFjdGlvbkRpZ2l0c30te21heEZyYWN0aW9uRGlnaXRzfTwvY29kZT4uXG4gICAgICogICAtIGBtaW5JbnRlZ2VyRGlnaXRzYDogVGhlIG1pbmltdW0gbnVtYmVyIG9mIGludGVnZXIgZGlnaXRzIGJlZm9yZSB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICAgKiBEZWZhdWx0IGlzIGAxYC5cbiAgICAgKiAgIC0gYG1pbkZyYWN0aW9uRGlnaXRzYDogVGhlIG1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICAgKiBEZWZhdWx0IGlzIGAwYC5cbiAgICAgKiAgIC0gYG1heEZyYWN0aW9uRGlnaXRzYDogVGhlIG1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICAgKiBEZWZhdWx0IGlzIGAzYC5cbiAgICAgKiBAcGFyYW0gbG9jYWxlIEEgbG9jYWxlIGNvZGUgZm9yIHRoZSBsb2NhbGUgZm9ybWF0IHJ1bGVzIHRvIHVzZS5cbiAgICAgKiBXaGVuIG5vdCBzdXBwbGllZCwgdXNlcyB0aGUgdmFsdWUgb2YgYE1DX0xPQ0FMRV9JRGAsIHdoaWNoIGlzIGBydWAgYnkgZGVmYXVsdC5cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGlnaXRzSW5mbz86IHN0cmluZywgbG9jYWxlPzogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGlmIChpc0VtcHR5KHZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRMb2NhbGUgPSBsb2NhbGUgfHwgdGhpcy5fbG9jYWxlIHx8IERFRkFVTFRfTUNfTE9DQUxFX0lEO1xuXG4gICAgICAgIGxldCBwYXJzZWREaWdpdHNJbmZvO1xuXG4gICAgICAgIGlmIChkaWdpdHNJbmZvKSB7XG4gICAgICAgICAgICBwYXJzZWREaWdpdHNJbmZvID0gcGFyc2VEaWdpdHNJbmZvKGRpZ2l0c0luZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogTnVtYmVyRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IDEsXG4gICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDAsXG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDMsXG4gICAgICAgICAgICAuLi5wYXJzZWREaWdpdHNJbmZvXG4gICAgICAgIH07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHN0clRvTnVtYmVyKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIEludGwuTnVtYmVyRm9ybWF0LmNhbGwodGhpcywgY3VycmVudExvY2FsZSwgb3B0aW9ucykuZm9ybWF0KG51bSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZFBpcGVBcmd1bWVudDogTWNEZWNpbWFsUGlwZSBmb3IgcGlwZSAnJHtKU09OLnN0cmluZ2lmeShlcnJvci5tZXNzYWdlKX0nYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
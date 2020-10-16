/**
 * @fileoverview added by tsickle
 * Generated from: formatters/number/formatter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:naming-convention */
import { Inject, Injectable, InjectionToken, Optional, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/** @type {?} */
export const MC_LOCALE_ID = new InjectionToken('McLocaleId');
/** @type {?} */
export const DEFAULT_MC_LOCALE_ID = 'ru';
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
        throw new Error(`${value} is not a number`);
    }
    return value;
}
/** @type {?} */
export const NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
/** @type {?} */
const minIntGroupPosition = 1;
/** @type {?} */
const minFractionGroupPosition = 3;
/** @type {?} */
const maxFractionGroupPosition = 5;
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
class ParsedDigitsInfo {
}
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
    const parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
    if (parts === null) {
        throw new Error(`${digitsInfo} is not a valid digit info`);
    }
    /** @type {?} */
    const minIntPart = parts[minIntGroupPosition];
    /** @type {?} */
    const minFractionPart = parts[minFractionGroupPosition];
    /** @type {?} */
    const maxFractionPart = parts[maxFractionGroupPosition];
    /** @type {?} */
    const result = new ParsedDigitsInfo();
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
export class McDecimalPipe {
    /**
     * @param {?} _locale
     */
    constructor(_locale) {
        this._locale = _locale;
    }
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
    transform(value, digitsInfo, locale) {
        if (isEmpty(value)) {
            return null;
        }
        /** @type {?} */
        const currentLocale = locale || this._locale || DEFAULT_MC_LOCALE_ID;
        /** @type {?} */
        let parsedDigitsInfo;
        if (digitsInfo) {
            parsedDigitsInfo = parseDigitsInfo(digitsInfo);
        }
        /** @type {?} */
        const options = Object.assign({ useGrouping: true, minimumIntegerDigits: 1, minimumFractionDigits: 0, maximumFractionDigits: 3 }, parsedDigitsInfo);
        try {
            /** @type {?} */
            const num = strToNumber(value);
            return Intl.NumberFormat.call(this, currentLocale, options).format(num);
        }
        catch (error) {
            throw Error(`InvalidPipeArgument: McDecimalPipe for pipe '${JSON.stringify(error.message)}'`);
        }
    }
}
McDecimalPipe.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
    { type: Pipe, args: [{ name: 'mcNumber' },] }
];
/** @nocollapse */
McDecimalPipe.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MC_LOCALE_ID,] }] }
];
/** @nocollapse */ McDecimalPipe.ɵprov = i0.ɵɵdefineInjectable({ factory: function McDecimalPipe_Factory() { return new McDecimalPipe(i0.ɵɵinject(MC_LOCALE_ID, 8)); }, token: McDecimalPipe, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    McDecimalPipe.prototype._locale;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImZvcm1hdHRlcnMvbnVtYmVyL2Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7OztBQUdsRyxNQUFNLE9BQU8sWUFBWSxHQUFHLElBQUksY0FBYyxDQUFTLFlBQVksQ0FBQzs7QUFFcEUsTUFBTSxPQUFPLG9CQUFvQixHQUFHLElBQUk7Ozs7O0FBR3hDLFNBQVMsT0FBTyxDQUFDLEtBQVU7SUFDdkIsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQztBQUM1RCxDQUFDOzs7OztBQUVELFNBQVMsV0FBVyxDQUFDLEtBQXNCO0lBQ3ZDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN4RSxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4QjtJQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLGtCQUFrQixDQUFDLENBQUM7S0FDL0M7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDOztBQUVELE1BQU0sT0FBTyxvQkFBb0IsR0FBRyw2QkFBNkI7O01BRTNELG1CQUFtQixHQUFHLENBQUM7O01BQ3ZCLHdCQUF3QixHQUFHLENBQUM7O01BQzVCLHdCQUF3QixHQUFHLENBQUM7Ozs7QUFFbEMsa0NBY0M7OztJQWJHLDBDQUFxQjs7SUFFckIsbURBQTZC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bnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bmFtaW5nLWNvbnZlbnRpb24gKi9cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX0xPQ0FMRV9JRCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdNY0xvY2FsZUlkJyk7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX01DX0xPQ0FMRV9JRCA9ICdydSc7XG5cblxuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09ICcnIHx8IHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gc3RyVG9OdW1iZXIodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgIWlzTmFOKE51bWJlcih2YWx1ZSkgLSBwYXJzZUZsb2F0KHZhbHVlKSkpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ZhbHVlfSBpcyBub3QgYSBudW1iZXJgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBOVU1CRVJfRk9STUFUX1JFR0VYUCA9IC9eKFxcZCspP1xcLigoXFxkKykoLShcXGQrKSk/KT8kLztcblxuY29uc3QgbWluSW50R3JvdXBQb3NpdGlvbiA9IDE7XG5jb25zdCBtaW5GcmFjdGlvbkdyb3VwUG9zaXRpb24gPSAzO1xuY29uc3QgbWF4RnJhY3Rpb25Hcm91cFBvc2l0aW9uID0gNTtcblxuaW50ZXJmYWNlIE51bWJlckZvcm1hdE9wdGlvbnMge1xuICAgIHVzZUdyb3VwaW5nOiBib29sZWFuO1xuXG4gICAgbWluaW11bUludGVnZXJEaWdpdHM6IG51bWJlcjtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcbiAgICBtaW5pbXVtU2lnbmlmaWNhbnREaWdpdHM6IG51bWJlcjtcbiAgICBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IG51bWJlcjtcblxuICAgIGxvY2FsZU1hdGNoZXI/OiBzdHJpbmc7XG4gICAgc3R5bGU/OiBzdHJpbmc7XG5cbiAgICBjdXJyZW5jeT86IHN0cmluZztcbiAgICBjdXJyZW5jeURpc3BsYXk/OiBzdHJpbmc7XG59XG5cbmNsYXNzIFBhcnNlZERpZ2l0c0luZm8ge1xuICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiBudW1iZXI7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGlnaXRzSW5mbyhkaWdpdHNJbmZvOiBzdHJpbmcpOiBQYXJzZWREaWdpdHNJbmZvIHtcbiAgICBjb25zdCBwYXJ0cyA9IGRpZ2l0c0luZm8ubWF0Y2goTlVNQkVSX0ZPUk1BVF9SRUdFWFApO1xuXG4gICAgaWYgKHBhcnRzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtkaWdpdHNJbmZvfSBpcyBub3QgYSB2YWxpZCBkaWdpdCBpbmZvYCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWluSW50UGFydCA9IHBhcnRzW21pbkludEdyb3VwUG9zaXRpb25dO1xuICAgIGNvbnN0IG1pbkZyYWN0aW9uUGFydCA9IHBhcnRzW21pbkZyYWN0aW9uR3JvdXBQb3NpdGlvbl07XG4gICAgY29uc3QgbWF4RnJhY3Rpb25QYXJ0ID0gcGFydHNbbWF4RnJhY3Rpb25Hcm91cFBvc2l0aW9uXTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQYXJzZWREaWdpdHNJbmZvKCk7XG5cbiAgICBpZiAobWluSW50UGFydCAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdC5taW5pbXVtSW50ZWdlckRpZ2l0cyA9IHBhcnNlSW50KG1pbkludFBhcnQpO1xuICAgIH1cblxuICAgIGlmIChtaW5GcmFjdGlvblBhcnQgIT0gbnVsbCkge1xuICAgICAgICByZXN1bHQubWluaW11bUZyYWN0aW9uRGlnaXRzID0gcGFyc2VJbnQobWluRnJhY3Rpb25QYXJ0KTtcbiAgICB9XG5cbiAgICBpZiAobWF4RnJhY3Rpb25QYXJ0ICE9IG51bGwpIHtcbiAgICAgICAgcmVzdWx0Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA9IHBhcnNlSW50KG1heEZyYWN0aW9uUGFydCk7XG4gICAgfSBlbHNlIGlmIChtaW5GcmFjdGlvblBhcnQgIT0gbnVsbCAmJiByZXN1bHQubWluaW11bUZyYWN0aW9uRGlnaXRzID4gcmVzdWx0Lm1heGltdW1GcmFjdGlvbkRpZ2l0cykge1xuICAgICAgICByZXN1bHQubWF4aW11bUZyYWN0aW9uRGlnaXRzID0gcmVzdWx0Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5AUGlwZSh7bmFtZTogJ21jTnVtYmVyJ30pXG5leHBvcnQgY2xhc3MgTWNEZWNpbWFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTUNfTE9DQUxFX0lEKSBwcml2YXRlIF9sb2NhbGU6IHN0cmluZykge31cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgbnVtYmVyIHRvIGJlIGZvcm1hdHRlZC5cbiAgICAgKiBAcGFyYW0gZGlnaXRzSW5mbyBEZWNpbWFsIHJlcHJlc2VudGF0aW9uIG9wdGlvbnMsIHNwZWNpZmllZCBieSBhIHN0cmluZ1xuICAgICAqIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0Ojxicj5cbiAgICAgKiA8Y29kZT57bWluSW50ZWdlckRpZ2l0c30ue21pbkZyYWN0aW9uRGlnaXRzfS17bWF4RnJhY3Rpb25EaWdpdHN9PC9jb2RlPi5cbiAgICAgKiAgIC0gYG1pbkludGVnZXJEaWdpdHNgOiBUaGUgbWluaW11bSBudW1iZXIgb2YgaW50ZWdlciBkaWdpdHMgYmVmb3JlIHRoZSBkZWNpbWFsIHBvaW50LlxuICAgICAqIERlZmF1bHQgaXMgYDFgLlxuICAgICAqICAgLSBgbWluRnJhY3Rpb25EaWdpdHNgOiBUaGUgbWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIHRoZSBkZWNpbWFsIHBvaW50LlxuICAgICAqIERlZmF1bHQgaXMgYDBgLlxuICAgICAqICAgLSBgbWF4RnJhY3Rpb25EaWdpdHNgOiBUaGUgbWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIHRoZSBkZWNpbWFsIHBvaW50LlxuICAgICAqIERlZmF1bHQgaXMgYDNgLlxuICAgICAqIEBwYXJhbSBsb2NhbGUgQSBsb2NhbGUgY29kZSBmb3IgdGhlIGxvY2FsZSBmb3JtYXQgcnVsZXMgdG8gdXNlLlxuICAgICAqIFdoZW4gbm90IHN1cHBsaWVkLCB1c2VzIHRoZSB2YWx1ZSBvZiBgTUNfTE9DQUxFX0lEYCwgd2hpY2ggaXMgYHJ1YCBieSBkZWZhdWx0LlxuICAgICAqL1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBkaWdpdHNJbmZvPzogc3RyaW5nLCBsb2NhbGU/OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKGlzRW1wdHkodmFsdWUpKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudExvY2FsZSA9IGxvY2FsZSB8fCB0aGlzLl9sb2NhbGUgfHwgREVGQVVMVF9NQ19MT0NBTEVfSUQ7XG5cbiAgICAgICAgbGV0IHBhcnNlZERpZ2l0c0luZm87XG5cbiAgICAgICAgaWYgKGRpZ2l0c0luZm8pIHtcbiAgICAgICAgICAgIHBhcnNlZERpZ2l0c0luZm8gPSBwYXJzZURpZ2l0c0luZm8oZGlnaXRzSW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zOiBOdW1iZXJGb3JtYXRPcHRpb25zID0ge1xuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogMSxcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCxcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMyxcbiAgICAgICAgICAgIC4uLnBhcnNlZERpZ2l0c0luZm9cbiAgICAgICAgfTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gc3RyVG9OdW1iZXIodmFsdWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gSW50bC5OdW1iZXJGb3JtYXQuY2FsbCh0aGlzLCBjdXJyZW50TG9jYWxlLCBvcHRpb25zKS5mb3JtYXQobnVtKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkUGlwZUFyZ3VtZW50OiBNY0RlY2ltYWxQaXBlIGZvciBwaXBlICcke0pTT04uc3RyaW5naWZ5KGVycm9yLm1lc3NhZ2UpfSdgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
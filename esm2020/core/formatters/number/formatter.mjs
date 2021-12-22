/* tslint:disable:naming-convention */
import { Inject, Injectable, InjectionToken, Optional, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export const MC_LOCALE_ID = new InjectionToken('McLocaleId');
export const DEFAULT_MC_LOCALE_ID = 'ru';
function isEmpty(value) {
    return value == null || value === '' || value !== value;
}
function strToNumber(value) {
    if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
        return Number(value);
    }
    if (typeof value !== 'number') {
        throw new Error(`${value} is not a number`);
    }
    return value;
}
export const NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
const minIntGroupPosition = 1;
const minFractionGroupPosition = 3;
const maxFractionGroupPosition = 5;
class ParsedDigitsInfo {
}
function parseDigitsInfo(digitsInfo) {
    const parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
    if (parts === null) {
        throw new Error(`${digitsInfo} is not a valid digit info`);
    }
    const minIntPart = parts[minIntGroupPosition];
    const minFractionPart = parts[minFractionGroupPosition];
    const maxFractionPart = parts[maxFractionGroupPosition];
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
    constructor(_locale) {
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
    transform(value, digitsInfo, locale) {
        if (isEmpty(value)) {
            return null;
        }
        const currentLocale = locale || this._locale || DEFAULT_MC_LOCALE_ID;
        let parsedDigitsInfo;
        if (digitsInfo) {
            parsedDigitsInfo = parseDigitsInfo(digitsInfo);
        }
        const options = {
            useGrouping: true,
            minimumIntegerDigits: 1,
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
            ...parsedDigitsInfo
        };
        try {
            const num = strToNumber(value);
            return Intl.NumberFormat.call(this, currentLocale, options).format(num);
        }
        catch (error) {
            throw Error(`InvalidPipeArgument: McDecimalPipe for pipe '${JSON.stringify(error.message)}'`);
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McDecimalPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McDecimalPipe, deps: [{ token: MC_LOCALE_ID, optional: true }], target: i0.ɵɵFactoryTarget.Pipe });
/** @nocollapse */ /** @nocollapse */ McDecimalPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McDecimalPipe, name: "mcNumber" });
/** @nocollapse */ /** @nocollapse */ McDecimalPipe.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McDecimalPipe, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McDecimalPipe, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }, {
            type: Pipe,
            args: [{ name: 'mcNumber' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_LOCALE_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvZm9ybWF0dGVycy9udW1iZXIvZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR2xHLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBUyxZQUFZLENBQUMsQ0FBQztBQUVyRSxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUM7QUFHekMsU0FBUyxPQUFPLENBQUMsS0FBVTtJQUN2QixPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO0FBQzVELENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFzQjtJQUN2QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEI7SUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0FBRWxFLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sd0JBQXdCLEdBQUcsQ0FB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IjpbIi8qIHRzbGludDpkaXNhYmxlOm5hbWluZy1jb252ZW50aW9uICovXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmV4cG9ydCBjb25zdCBNQ19MT0NBTEVfSUQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignTWNMb2NhbGVJZCcpO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQ19MT0NBTEVfSUQgPSAncnUnO1xuXG5cbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHN0clRvTnVtYmVyKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBudW1iZXIge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmICFpc05hTihOdW1iZXIodmFsdWUpIC0gcGFyc2VGbG9hdCh2YWx1ZSkpKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt2YWx1ZX0gaXMgbm90IGEgbnVtYmVyYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgY29uc3QgTlVNQkVSX0ZPUk1BVF9SRUdFWFAgPSAvXihcXGQrKT9cXC4oKFxcZCspKC0oXFxkKykpPyk/JC87XG5cbmNvbnN0IG1pbkludEdyb3VwUG9zaXRpb24gPSAxO1xuY29uc3QgbWluRnJhY3Rpb25Hcm91cFBvc2l0aW9uID0gMztcbmNvbnN0IG1heEZyYWN0aW9uR3JvdXBQb3NpdGlvbiA9IDU7XG5cbmludGVyZmFjZSBOdW1iZXJGb3JtYXRPcHRpb25zIHtcbiAgICB1c2VHcm91cGluZzogYm9vbGVhbjtcblxuICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiBudW1iZXI7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XG4gICAgbWluaW11bVNpZ25pZmljYW50RGlnaXRzOiBudW1iZXI7XG4gICAgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiBudW1iZXI7XG5cbiAgICBsb2NhbGVNYXRjaGVyPzogc3RyaW5nO1xuICAgIHN0eWxlPzogc3RyaW5nO1xuXG4gICAgY3VycmVuY3k/OiBzdHJpbmc7XG4gICAgY3VycmVuY3lEaXNwbGF5Pzogc3RyaW5nO1xufVxuXG5jbGFzcyBQYXJzZWREaWdpdHNJbmZvIHtcbiAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogbnVtYmVyO1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBwYXJzZURpZ2l0c0luZm8oZGlnaXRzSW5mbzogc3RyaW5nKTogUGFyc2VkRGlnaXRzSW5mbyB7XG4gICAgY29uc3QgcGFydHMgPSBkaWdpdHNJbmZvLm1hdGNoKE5VTUJFUl9GT1JNQVRfUkVHRVhQKTtcblxuICAgIGlmIChwYXJ0cyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZGlnaXRzSW5mb30gaXMgbm90IGEgdmFsaWQgZGlnaXQgaW5mb2ApO1xuICAgIH1cblxuICAgIGNvbnN0IG1pbkludFBhcnQgPSBwYXJ0c1ttaW5JbnRHcm91cFBvc2l0aW9uXTtcbiAgICBjb25zdCBtaW5GcmFjdGlvblBhcnQgPSBwYXJ0c1ttaW5GcmFjdGlvbkdyb3VwUG9zaXRpb25dO1xuICAgIGNvbnN0IG1heEZyYWN0aW9uUGFydCA9IHBhcnRzW21heEZyYWN0aW9uR3JvdXBQb3NpdGlvbl07XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUGFyc2VkRGlnaXRzSW5mbygpO1xuXG4gICAgaWYgKG1pbkludFBhcnQgIT0gbnVsbCkge1xuICAgICAgICByZXN1bHQubWluaW11bUludGVnZXJEaWdpdHMgPSBwYXJzZUludChtaW5JbnRQYXJ0KTtcbiAgICB9XG5cbiAgICBpZiAobWluRnJhY3Rpb25QYXJ0ICE9IG51bGwpIHtcbiAgICAgICAgcmVzdWx0Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA9IHBhcnNlSW50KG1pbkZyYWN0aW9uUGFydCk7XG4gICAgfVxuXG4gICAgaWYgKG1heEZyYWN0aW9uUGFydCAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdC5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPSBwYXJzZUludChtYXhGcmFjdGlvblBhcnQpO1xuICAgIH0gZWxzZSBpZiAobWluRnJhY3Rpb25QYXJ0ICE9IG51bGwgJiYgcmVzdWx0Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA+IHJlc3VsdC5tYXhpbXVtRnJhY3Rpb25EaWdpdHMpIHtcbiAgICAgICAgcmVzdWx0Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA9IHJlc3VsdC5taW5pbXVtRnJhY3Rpb25EaWdpdHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuQFBpcGUoe25hbWU6ICdtY051bWJlcid9KVxuZXhwb3J0IGNsYXNzIE1jRGVjaW1hbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0xPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcpIHt9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIG51bWJlciB0byBiZSBmb3JtYXR0ZWQuXG4gICAgICogQHBhcmFtIGRpZ2l0c0luZm8gRGVjaW1hbCByZXByZXNlbnRhdGlvbiBvcHRpb25zLCBzcGVjaWZpZWQgYnkgYSBzdHJpbmdcbiAgICAgKiBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDo8YnI+XG4gICAgICogPGNvZGU+e21pbkludGVnZXJEaWdpdHN9LnttaW5GcmFjdGlvbkRpZ2l0c30te21heEZyYWN0aW9uRGlnaXRzfTwvY29kZT4uXG4gICAgICogICAtIGBtaW5JbnRlZ2VyRGlnaXRzYDogVGhlIG1pbmltdW0gbnVtYmVyIG9mIGludGVnZXIgZGlnaXRzIGJlZm9yZSB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICAgKiBEZWZhdWx0IGlzIGAxYC5cbiAgICAgKiAgIC0gYG1pbkZyYWN0aW9uRGlnaXRzYDogVGhlIG1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICAgKiBEZWZhdWx0IGlzIGAwYC5cbiAgICAgKiAgIC0gYG1heEZyYWN0aW9uRGlnaXRzYDogVGhlIG1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICAgKiBEZWZhdWx0IGlzIGAzYC5cbiAgICAgKiBAcGFyYW0gbG9jYWxlIEEgbG9jYWxlIGNvZGUgZm9yIHRoZSBsb2NhbGUgZm9ybWF0IHJ1bGVzIHRvIHVzZS5cbiAgICAgKiBXaGVuIG5vdCBzdXBwbGllZCwgdXNlcyB0aGUgdmFsdWUgb2YgYE1DX0xPQ0FMRV9JRGAsIHdoaWNoIGlzIGBydWAgYnkgZGVmYXVsdC5cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGlnaXRzSW5mbz86IHN0cmluZywgbG9jYWxlPzogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGlmIChpc0VtcHR5KHZhbHVlKSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRMb2NhbGUgPSBsb2NhbGUgfHwgdGhpcy5fbG9jYWxlIHx8IERFRkFVTFRfTUNfTE9DQUxFX0lEO1xuXG4gICAgICAgIGxldCBwYXJzZWREaWdpdHNJbmZvO1xuXG4gICAgICAgIGlmIChkaWdpdHNJbmZvKSB7XG4gICAgICAgICAgICBwYXJzZWREaWdpdHNJbmZvID0gcGFyc2VEaWdpdHNJbmZvKGRpZ2l0c0luZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogTnVtYmVyRm9ybWF0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IDEsXG4gICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDAsXG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDMsXG4gICAgICAgICAgICAuLi5wYXJzZWREaWdpdHNJbmZvXG4gICAgICAgIH07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IHN0clRvTnVtYmVyKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIEludGwuTnVtYmVyRm9ybWF0LmNhbGwodGhpcywgY3VycmVudExvY2FsZSwgb3B0aW9ucykuZm9ybWF0KG51bSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZFBpcGVBcmd1bWVudDogTWNEZWNpbWFsUGlwZSBmb3IgcGlwZSAnJHtKU09OLnN0cmluZ2lmeShlcnJvci5tZXNzYWdlKX0nYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
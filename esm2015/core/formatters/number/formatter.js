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
        const options = Object.assign({ useGrouping: true, minimumIntegerDigits: 1, minimumFractionDigits: 0, maximumFractionDigits: 3 }, parsedDigitsInfo);
        try {
            const num = strToNumber(value);
            return Intl.NumberFormat.call(this, currentLocale, options).format(num);
        }
        catch (error) {
            throw Error(`InvalidPipeArgument: McDecimalPipe for pipe '${JSON.stringify(error.message)}'`);
        }
    }
}
/** @nocollapse */ McDecimalPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDecimalPipe, deps: [{ token: MC_LOCALE_ID, optional: true }], target: i0.ɵɵFactoryTarget.Pipe });
/** @nocollapse */ McDecimalPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDecimalPipe, name: "mcNumber" });
/** @nocollapse */ McDecimalPipe.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDecimalPipe, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDecimalPipe, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvZm9ybWF0dGVycy9udW1iZXIvZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR2xHLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBUyxZQUFZLENBQUMsQ0FBQztBQUVyRSxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUM7QUFHekMsU0FBUyxPQUFPLENBQUMsS0FBVTtJQUN2QixPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO0FBQzVELENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFzQjtJQUN2QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEI7SUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0FBRWxFLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sd0JBQXdCLEdBQUcsQ0FB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bnQ6ZGlzYWJsZTpuYW1pbmctY29udmVudGlvbiAqL1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5leHBvcnQgY29uc3QgTUNfTE9DQUxFX0lEID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ01jTG9jYWxlSWQnKTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUNfTE9DQUxFX0lEID0gJ3J1JztcblxuXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycgfHwgdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBzdHJUb051bWJlcih2YWx1ZTogbnVtYmVyIHwgc3RyaW5nKTogbnVtYmVyIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhaXNOYU4oTnVtYmVyKHZhbHVlKSAtIHBhcnNlRmxvYXQodmFsdWUpKSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWV9IGlzIG5vdCBhIG51bWJlcmApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IE5VTUJFUl9GT1JNQVRfUkVHRVhQID0gL14oXFxkKyk/XFwuKChcXGQrKSgtKFxcZCspKT8pPyQvO1xuXG5jb25zdCBtaW5JbnRHcm91cFBvc2l0aW9uID0gMTtcbmNvbnN0IG1pbkZyYWN0aW9uR3JvdXBQb3NpdGlvbiA9IDM7XG5jb25zdCBtYXhGcmFjdGlvbkdyb3VwUG9zaXRpb24gPSA1O1xuXG5pbnRlcmZhY2UgTnVtYmVyRm9ybWF0T3B0aW9ucyB7XG4gICAgdXNlR3JvdXBpbmc6IGJvb2xlYW47XG5cbiAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogbnVtYmVyO1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuICAgIG1pbmltdW1TaWduaWZpY2FudERpZ2l0czogbnVtYmVyO1xuICAgIG1heGltdW1TaWduaWZpY2FudERpZ2l0czogbnVtYmVyO1xuXG4gICAgbG9jYWxlTWF0Y2hlcj86IHN0cmluZztcbiAgICBzdHlsZT86IHN0cmluZztcblxuICAgIGN1cnJlbmN5Pzogc3RyaW5nO1xuICAgIGN1cnJlbmN5RGlzcGxheT86IHN0cmluZztcbn1cblxuY2xhc3MgUGFyc2VkRGlnaXRzSW5mbyB7XG4gICAgbWluaW11bUludGVnZXJEaWdpdHM6IG51bWJlcjtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcbn1cblxuZnVuY3Rpb24gcGFyc2VEaWdpdHNJbmZvKGRpZ2l0c0luZm86IHN0cmluZyk6IFBhcnNlZERpZ2l0c0luZm8ge1xuICAgIGNvbnN0IHBhcnRzID0gZGlnaXRzSW5mby5tYXRjaChOVU1CRVJfRk9STUFUX1JFR0VYUCk7XG5cbiAgICBpZiAocGFydHMgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2RpZ2l0c0luZm99IGlzIG5vdCBhIHZhbGlkIGRpZ2l0IGluZm9gKTtcbiAgICB9XG5cbiAgICBjb25zdCBtaW5JbnRQYXJ0ID0gcGFydHNbbWluSW50R3JvdXBQb3NpdGlvbl07XG4gICAgY29uc3QgbWluRnJhY3Rpb25QYXJ0ID0gcGFydHNbbWluRnJhY3Rpb25Hcm91cFBvc2l0aW9uXTtcbiAgICBjb25zdCBtYXhGcmFjdGlvblBhcnQgPSBwYXJ0c1ttYXhGcmFjdGlvbkdyb3VwUG9zaXRpb25dO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFBhcnNlZERpZ2l0c0luZm8oKTtcblxuICAgIGlmIChtaW5JbnRQYXJ0ICE9IG51bGwpIHtcbiAgICAgICAgcmVzdWx0Lm1pbmltdW1JbnRlZ2VyRGlnaXRzID0gcGFyc2VJbnQobWluSW50UGFydCk7XG4gICAgfVxuXG4gICAgaWYgKG1pbkZyYWN0aW9uUGFydCAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdC5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPSBwYXJzZUludChtaW5GcmFjdGlvblBhcnQpO1xuICAgIH1cblxuICAgIGlmIChtYXhGcmFjdGlvblBhcnQgIT0gbnVsbCkge1xuICAgICAgICByZXN1bHQubWF4aW11bUZyYWN0aW9uRGlnaXRzID0gcGFyc2VJbnQobWF4RnJhY3Rpb25QYXJ0KTtcbiAgICB9IGVsc2UgaWYgKG1pbkZyYWN0aW9uUGFydCAhPSBudWxsICYmIHJlc3VsdC5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPiByZXN1bHQubWF4aW11bUZyYWN0aW9uRGlnaXRzKSB7XG4gICAgICAgIHJlc3VsdC5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPSByZXN1bHQubWluaW11bUZyYWN0aW9uRGlnaXRzO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbkBQaXBlKHtuYW1lOiAnbWNOdW1iZXInfSlcbmV4cG9ydCBjbGFzcyBNY0RlY2ltYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChNQ19MT0NBTEVfSUQpIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nKSB7fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSBudW1iZXIgdG8gYmUgZm9ybWF0dGVkLlxuICAgICAqIEBwYXJhbSBkaWdpdHNJbmZvIERlY2ltYWwgcmVwcmVzZW50YXRpb24gb3B0aW9ucywgc3BlY2lmaWVkIGJ5IGEgc3RyaW5nXG4gICAgICogaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6PGJyPlxuICAgICAqIDxjb2RlPnttaW5JbnRlZ2VyRGlnaXRzfS57bWluRnJhY3Rpb25EaWdpdHN9LXttYXhGcmFjdGlvbkRpZ2l0c308L2NvZGU+LlxuICAgICAqICAgLSBgbWluSW50ZWdlckRpZ2l0c2A6IFRoZSBtaW5pbXVtIG51bWJlciBvZiBpbnRlZ2VyIGRpZ2l0cyBiZWZvcmUgdGhlIGRlY2ltYWwgcG9pbnQuXG4gICAgICogRGVmYXVsdCBpcyBgMWAuXG4gICAgICogICAtIGBtaW5GcmFjdGlvbkRpZ2l0c2A6IFRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIGRlY2ltYWwgcG9pbnQuXG4gICAgICogRGVmYXVsdCBpcyBgMGAuXG4gICAgICogICAtIGBtYXhGcmFjdGlvbkRpZ2l0c2A6IFRoZSBtYXhpbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIGRlY2ltYWwgcG9pbnQuXG4gICAgICogRGVmYXVsdCBpcyBgM2AuXG4gICAgICogQHBhcmFtIGxvY2FsZSBBIGxvY2FsZSBjb2RlIGZvciB0aGUgbG9jYWxlIGZvcm1hdCBydWxlcyB0byB1c2UuXG4gICAgICogV2hlbiBub3Qgc3VwcGxpZWQsIHVzZXMgdGhlIHZhbHVlIG9mIGBNQ19MT0NBTEVfSURgLCB3aGljaCBpcyBgcnVgIGJ5IGRlZmF1bHQuXG4gICAgICovXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGRpZ2l0c0luZm8/OiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBpZiAoaXNFbXB0eSh2YWx1ZSkpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBjdXJyZW50TG9jYWxlID0gbG9jYWxlIHx8IHRoaXMuX2xvY2FsZSB8fCBERUZBVUxUX01DX0xPQ0FMRV9JRDtcblxuICAgICAgICBsZXQgcGFyc2VkRGlnaXRzSW5mbztcblxuICAgICAgICBpZiAoZGlnaXRzSW5mbykge1xuICAgICAgICAgICAgcGFyc2VkRGlnaXRzSW5mbyA9IHBhcnNlRGlnaXRzSW5mbyhkaWdpdHNJbmZvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE51bWJlckZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAxLFxuICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAwLFxuICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAzLFxuICAgICAgICAgICAgLi4ucGFyc2VkRGlnaXRzSW5mb1xuICAgICAgICB9O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSBzdHJUb051bWJlcih2YWx1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBJbnRsLk51bWJlckZvcm1hdC5jYWxsKHRoaXMsIGN1cnJlbnRMb2NhbGUsIG9wdGlvbnMpLmZvcm1hdChudW0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWRQaXBlQXJndW1lbnQ6IE1jRGVjaW1hbFBpcGUgZm9yIHBpcGUgJyR7SlNPTi5zdHJpbmdpZnkoZXJyb3IubWVzc2FnZSl9J2ApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
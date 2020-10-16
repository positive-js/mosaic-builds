/**
 * @fileoverview added by tsickle
 * Generated from: highlight/highlight.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class McHighlightPipe {
    /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    transform(value, args) {
        if (!args) {
            return value;
        }
        return value.replace(new RegExp(`(${args})`, 'gi'), '<mark class="mc-highlight">$1</mark>');
    }
}
McHighlightPipe.decorators = [
    { type: Pipe, args: [{ name: 'mcHighlight' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsiaGlnaGxpZ2h0L2hpZ2hsaWdodC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJcEQsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQUN4QixTQUFTLENBQUMsS0FBVSxFQUFFLElBQVM7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO1NBQUU7UUFFNUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsc0NBQXNDLENBQUMsQ0FBQztJQUNoRyxDQUFDOzs7WUFOSixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBQaXBlKHsgbmFtZTogJ21jSGlnaGxpZ2h0JyB9KVxuZXhwb3J0IGNsYXNzIE1jSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAoIWFyZ3MpIHsgcmV0dXJuIHZhbHVlOyB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChgKCR7YXJnc30pYCwgJ2dpJyksICc8bWFyayBjbGFzcz1cIm1jLWhpZ2hsaWdodFwiPiQxPC9tYXJrPicpO1xuICAgIH1cbn1cbiJdfQ==
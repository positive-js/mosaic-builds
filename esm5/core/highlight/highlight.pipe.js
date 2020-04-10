/**
 * @fileoverview added by tsickle
 * Generated from: highlight/highlight.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var McHighlightPipe = /** @class */ (function () {
    function McHighlightPipe() {
    }
    /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    McHighlightPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    function (value, args) {
        if (!args) {
            return value;
        }
        return value.replace(new RegExp("(" + args + ")", 'gi'), '<mark class="mc-highlight">$1</mark>');
    };
    McHighlightPipe.decorators = [
        { type: Pipe, args: [{ name: 'mcHighlight' },] }
    ];
    return McHighlightPipe;
}());
export { McHighlightPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImhpZ2hsaWdodC9oaWdobGlnaHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BEO0lBQUE7SUFPQSxDQUFDOzs7Ozs7SUFMRyxtQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQVUsRUFBRSxJQUFTO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztTQUFFO1FBRTVCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFJLElBQUksTUFBRyxFQUFFLElBQUksQ0FBQyxFQUFFLHNDQUFzQyxDQUFDLENBQUM7SUFDaEcsQ0FBQzs7Z0JBTkosSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRTs7SUFPN0Isc0JBQUM7Q0FBQSxBQVBELElBT0M7U0FOWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBQaXBlKHsgbmFtZTogJ21jSGlnaGxpZ2h0JyB9KVxuZXhwb3J0IGNsYXNzIE1jSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAoIWFyZ3MpIHsgcmV0dXJuIHZhbHVlOyB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChgKCR7YXJnc30pYCwgJ2dpJyksICc8bWFyayBjbGFzcz1cIm1jLWhpZ2hsaWdodFwiPiQxPC9tYXJrPicpO1xuICAgIH1cbn1cbiJdfQ==
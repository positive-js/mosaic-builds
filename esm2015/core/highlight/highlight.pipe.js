/**
 * @fileoverview added by tsickle
 * Generated from: highlight/highlight.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImhpZ2hsaWdodC9oaWdobGlnaHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSXBELE1BQU0sT0FBTyxlQUFlOzs7Ozs7SUFDeEIsU0FBUyxDQUFDLEtBQVUsRUFBRSxJQUFTO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztTQUFFO1FBRTVCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLHNDQUFzQyxDQUFDLENBQUM7SUFDaEcsQ0FBQzs7O1lBTkosSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AUGlwZSh7IG5hbWU6ICdtY0hpZ2hsaWdodCcgfSlcbmV4cG9ydCBjbGFzcyBNY0hpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJnczogYW55KTogYW55IHtcbiAgICAgICAgaWYgKCFhcmdzKSB7IHJldHVybiB2YWx1ZTsgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCgke2FyZ3N9KWAsICdnaScpLCAnPG1hcmsgY2xhc3M9XCJtYy1oaWdobGlnaHRcIj4kMTwvbWFyaz4nKTtcbiAgICB9XG59XG4iXX0=
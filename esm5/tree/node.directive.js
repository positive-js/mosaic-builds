/**
 * @fileoverview added by tsickle
 * Generated from: node.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Directive, Input } from '@angular/core';
import { CdkTreeNodeDef } from '@ptsecurity/cdk/tree';
/**
 * @template T
 */
var McTreeNodeDef = /** @class */ (function (_super) {
    __extends(McTreeNodeDef, _super);
    function McTreeNodeDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTreeNodeDef.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen'],
                    providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
                },] }
    ];
    McTreeNodeDef.propDecorators = {
        data: [{ type: Input, args: ['mcTreeNode',] }]
    };
    return McTreeNodeDef;
}(CdkTreeNodeDef));
export { McTreeNodeDef };
if (false) {
    /** @type {?} */
    McTreeNodeDef.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdHJlZS8iLCJzb3VyY2VzIjpbIm5vZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUd0RDtJQUtzQyxpQ0FBaUI7SUFMdkQ7O0lBT0EsQ0FBQzs7Z0JBUEEsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLE1BQU0sRUFBRSxDQUFDLHlCQUF5QixDQUFDO29CQUNuQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxDQUFDO2lCQUN2RTs7O3VCQUVJLEtBQUssU0FBQyxZQUFZOztJQUN2QixvQkFBQztDQUFBLEFBUEQsQ0FLc0MsY0FBYyxHQUVuRDtTQUZZLGFBQWE7OztJQUN0Qiw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlTm9kZURlZiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay90cmVlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RyZWVOb2RlRGVmXScsXG4gICAgaW5wdXRzOiBbJ3doZW46IG1jVHJlZU5vZGVEZWZXaGVuJ10sXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZURlZiwgdXNlRXhpc3Rpbmc6IE1jVHJlZU5vZGVEZWYgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZURlZjxUPiBleHRlbmRzIENka1RyZWVOb2RlRGVmPFQ+IHtcbiAgICBASW5wdXQoJ21jVHJlZU5vZGUnKSBkYXRhOiBUO1xufVxuIl19
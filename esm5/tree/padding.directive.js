/**
 * @fileoverview added by tsickle
 * Generated from: padding.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Directive, Input } from '@angular/core';
import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';
/**
 * @template T
 */
var McTreeNodePadding = /** @class */ (function (_super) {
    __extends(McTreeNodePadding, _super);
    function McTreeNodePadding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseLeftPadding = 12;
        /* tslint:disable-next-line:naming-convention orthodox-getter-and-setter*/
        _this._indent = 20;
        _this.iconWidth = 20;
        return _this;
    }
    Object.defineProperty(McTreeNodePadding.prototype, "leftPadding", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTreeNodePadding.prototype.paddingIndent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : 0;
        /** @type {?} */
        var level = this.level || nodeLevel;
        return level > 0 ? (level * this._indent) + this.leftPadding + "px" : this.leftPadding + "px";
    };
    /**
     * @return {?}
     */
    McTreeNodePadding.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    };
    McTreeNodePadding.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }]
                },] }
    ];
    McTreeNodePadding.propDecorators = {
        level: [{ type: Input, args: ['mcTreeNodePadding',] }],
        indent: [{ type: Input, args: ['mcTreeNodePaddingIndent',] }]
    };
    return McTreeNodePadding;
}(CdkTreeNodePadding));
export { McTreeNodePadding };
if (false) {
    /** @type {?} */
    McTreeNodePadding.prototype.level;
    /** @type {?} */
    McTreeNodePadding.prototype.indent;
    /** @type {?} */
    McTreeNodePadding.prototype.baseLeftPadding;
    /** @type {?} */
    McTreeNodePadding.prototype._indent;
    /** @type {?} */
    McTreeNodePadding.prototype.withIcon;
    /** @type {?} */
    McTreeNodePadding.prototype.iconWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdHJlZS8iLCJzb3VyY2VzIjpbInBhZGRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRzFEO0lBSTBDLHFDQUFxQjtJQUovRDtRQUFBLHFFQW1DQztRQTFCRyxxQkFBZSxHQUFXLEVBQUUsQ0FBQzs7UUFFN0IsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUdyQixlQUFTLEdBQVcsRUFBRSxDQUFDOztJQXFCM0IsQ0FBQztJQW5CRyxzQkFBSSwwQ0FBVzs7OztRQUFmO1lBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDdkUsQ0FBQzs7O09BQUE7Ozs7SUFFRCx5Q0FBYTs7O0lBQWI7O1lBQ1UsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEQsQ0FBQyxDQUFDLENBQUM7O1lBRUQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUztRQUVyQyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxPQUFJLENBQUMsQ0FBQyxDQUFJLElBQUksQ0FBQyxXQUFXLE9BQUksQ0FBQztJQUNsRyxDQUFDOzs7O0lBRUQsb0NBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Z0JBbENKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztpQkFDL0U7Ozt3QkFFSSxLQUFLLFNBQUMsbUJBQW1CO3lCQUV6QixLQUFLLFNBQUMseUJBQXlCOztJQTRCcEMsd0JBQUM7Q0FBQSxBQW5DRCxDQUkwQyxrQkFBa0IsR0ErQjNEO1NBL0JZLGlCQUFpQjs7O0lBQzFCLGtDQUEwQzs7SUFFMUMsbUNBQWlEOztJQUVqRCw0Q0FBNkI7O0lBRTdCLG9DQUFxQjs7SUFFckIscUNBQWtCOztJQUNsQixzQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1RyZWVOb2RlUGFkZGluZyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay90cmVlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RyZWVOb2RlUGFkZGluZ10nLFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrVHJlZU5vZGVQYWRkaW5nLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZVBhZGRpbmcgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVBhZGRpbmc8VD4gZXh0ZW5kcyBDZGtUcmVlTm9kZVBhZGRpbmc8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgnbWNUcmVlTm9kZVBhZGRpbmcnKSBsZXZlbDogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY1RyZWVOb2RlUGFkZGluZ0luZGVudCcpIGluZGVudDogbnVtYmVyO1xuXG4gICAgYmFzZUxlZnRQYWRkaW5nOiBudW1iZXIgPSAxMjtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gb3J0aG9kb3gtZ2V0dGVyLWFuZC1zZXR0ZXIqL1xuICAgIF9pbmRlbnQ6IG51bWJlciA9IDIwO1xuXG4gICAgd2l0aEljb246IGJvb2xlYW47XG4gICAgaWNvbldpZHRoOiBudW1iZXIgPSAyMDtcblxuICAgIGdldCBsZWZ0UGFkZGluZygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMud2l0aEljb24gPyAwIDogdGhpcy5pY29uV2lkdGgpICsgdGhpcy5iYXNlTGVmdFBhZGRpbmc7XG4gICAgfVxuXG4gICAgcGFkZGluZ0luZGVudCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgY29uc3Qgbm9kZUxldmVsID0gKHRoaXMudHJlZU5vZGUuZGF0YSAmJiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwpXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbCh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLmxldmVsIHx8IG5vZGVMZXZlbDtcblxuICAgICAgICByZXR1cm4gbGV2ZWwgPiAwID8gYCR7KGxldmVsICogdGhpcy5faW5kZW50KSArIHRoaXMubGVmdFBhZGRpbmd9cHhgIDogYCR7dGhpcy5sZWZ0UGFkZGluZ31weGA7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMud2l0aEljb24gPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuaXNFeHBhbmRhYmxlKHRoaXMudHJlZU5vZGUuZGF0YSk7XG5cbiAgICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgfVxufVxuIl19
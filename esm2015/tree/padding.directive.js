/**
 * @fileoverview added by tsickle
 * Generated from: padding.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';
/**
 * @template T
 */
export class McTreeNodePadding extends CdkTreeNodePadding {
    constructor() {
        super(...arguments);
        this.baseLeftPadding = 12;
        /* tslint:disable-next-line:naming-convention orthodox-getter-and-setter*/
        this._indent = 20;
        this.iconWidth = 20;
    }
    /**
     * @return {?}
     */
    get leftPadding() {
        return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
    }
    /**
     * @return {?}
     */
    paddingIndent() {
        /** @type {?} */
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : 0;
        /** @type {?} */
        const level = this.level || nodeLevel;
        return level > 0 ? `${(level * this._indent) + this.leftPadding}px` : `${this.leftPadding}px`;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90cmVlLyIsInNvdXJjZXMiOlsicGFkZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQU8xRCxNQUFNLE9BQU8saUJBQXFCLFNBQVEsa0JBQXFCO0lBSi9EOztRQVNJLG9CQUFlLEdBQVcsRUFBRSxDQUFDOztRQUU3QixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBR3JCLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFxQjNCLENBQUM7Ozs7SUFuQkcsSUFBSSxXQUFXO1FBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDdkUsQ0FBQzs7OztJQUVELGFBQWE7O2NBQ0gsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEQsQ0FBQyxDQUFDLENBQUM7O2NBRUQsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUztRQUVyQyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUM7SUFDbEcsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7WUFsQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2FBQy9FOzs7b0JBRUksS0FBSyxTQUFDLG1CQUFtQjtxQkFFekIsS0FBSyxTQUFDLHlCQUF5Qjs7OztJQUZoQyxrQ0FBMEM7O0lBRTFDLG1DQUFpRDs7SUFFakQsNENBQTZCOztJQUU3QixvQ0FBcUI7O0lBRXJCLHFDQUFrQjs7SUFDbEIsc0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlTm9kZVBhZGRpbmcgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUcmVlTm9kZVBhZGRpbmddJyxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlUGFkZGluZywgdXNlRXhpc3Rpbmc6IE1jVHJlZU5vZGVQYWRkaW5nIH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGVQYWRkaW5nPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVQYWRkaW5nPFQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoJ21jVHJlZU5vZGVQYWRkaW5nJykgbGV2ZWw6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnbWNUcmVlTm9kZVBhZGRpbmdJbmRlbnQnKSBpbmRlbnQ6IG51bWJlcjtcblxuICAgIGJhc2VMZWZ0UGFkZGluZzogbnVtYmVyID0gMTI7XG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uIG9ydGhvZG94LWdldHRlci1hbmQtc2V0dGVyKi9cbiAgICBfaW5kZW50OiBudW1iZXIgPSAyMDtcblxuICAgIHdpdGhJY29uOiBib29sZWFuO1xuICAgIGljb25XaWR0aDogbnVtYmVyID0gMjA7XG5cbiAgICBnZXQgbGVmdFBhZGRpbmcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLndpdGhJY29uID8gMCA6IHRoaXMuaWNvbldpZHRoKSArIHRoaXMuYmFzZUxlZnRQYWRkaW5nO1xuICAgIH1cblxuICAgIHBhZGRpbmdJbmRlbnQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IG5vZGVMZXZlbCA9ICh0aGlzLnRyZWVOb2RlLmRhdGEgJiYgdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsKVxuICAgICAgICAgICAgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwodGhpcy50cmVlTm9kZS5kYXRhKVxuICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgIGNvbnN0IGxldmVsID0gdGhpcy5sZXZlbCB8fCBub2RlTGV2ZWw7XG5cbiAgICAgICAgcmV0dXJuIGxldmVsID4gMCA/IGAkeyhsZXZlbCAqIHRoaXMuX2luZGVudCkgKyB0aGlzLmxlZnRQYWRkaW5nfXB4YCA6IGAke3RoaXMubGVmdFBhZGRpbmd9cHhgO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpdGhJY29uID0gdGhpcy50cmVlLnRyZWVDb250cm9sLmlzRXhwYW5kYWJsZSh0aGlzLnRyZWVOb2RlLmRhdGEpO1xuXG4gICAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuICAgIH1cbn1cbiJdfQ==
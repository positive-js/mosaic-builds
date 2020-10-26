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
        this.iconWidth = 20;
    }
    /**
     * @return {?}
     */
    get level() { return this._level; }
    /**
     * @param {?} value
     * @return {?}
     */
    set level(value) { this.setLevelInput(value); }
    /**
     * @return {?}
     */
    get indent() { return this._indent; }
    /**
     * @param {?} indent
     * @return {?}
     */
    set indent(indent) { this.setIndentInput(indent); }
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
    McTreeNodePadding.prototype.baseLeftPadding;
    /** @type {?} */
    McTreeNodePadding.prototype.withIcon;
    /** @type {?} */
    McTreeNodePadding.prototype.iconWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90cmVlLyIsInNvdXJjZXMiOlsicGFkZGluZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQU8xRCxNQUFNLE9BQU8saUJBQXFCLFNBQVEsa0JBQXFCO0lBSi9EOztRQWNJLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBRzdCLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFxQjNCLENBQUM7Ozs7SUFoQ0csSUFDSSxLQUFLLEtBQWEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDM0MsSUFBSSxLQUFLLENBQUMsS0FBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRXZELElBQ0ksTUFBTSxLQUFzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7OztJQUN0RCxJQUFJLE1BQU0sQ0FBQyxNQUF1QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBT3BFLElBQUksV0FBVztRQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFFRCxhQUFhOztjQUNILFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFDOztjQUVELEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVM7UUFFckMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDO0lBQ2xHLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7O1lBckNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzthQUMvRTs7O29CQUdJLEtBQUssU0FBQyxtQkFBbUI7cUJBSXpCLEtBQUssU0FBQyx5QkFBeUI7Ozs7SUFJaEMsNENBQTZCOztJQUU3QixxQ0FBa0I7O0lBQ2xCLHNDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVQYWRkaW5nIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVHJlZU5vZGVQYWRkaW5nXScsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZVBhZGRpbmcsIHVzZUV4aXN0aW5nOiBNY1RyZWVOb2RlUGFkZGluZyB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlUGFkZGluZzxUPiBleHRlbmRzIENka1RyZWVOb2RlUGFkZGluZzxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ21jVHJlZU5vZGVQYWRkaW5nJylcbiAgICBnZXQgbGV2ZWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xldmVsOyB9XG4gICAgc2V0IGxldmVsKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5zZXRMZXZlbElucHV0KHZhbHVlKTsgfVxuXG4gICAgQElucHV0KCdtY1RyZWVOb2RlUGFkZGluZ0luZGVudCcpXG4gICAgZ2V0IGluZGVudCgpOiBudW1iZXIgfCBzdHJpbmcgeyByZXR1cm4gdGhpcy5faW5kZW50OyB9XG4gICAgc2V0IGluZGVudChpbmRlbnQ6IG51bWJlciB8IHN0cmluZykgeyB0aGlzLnNldEluZGVudElucHV0KGluZGVudCk7IH1cblxuICAgIGJhc2VMZWZ0UGFkZGluZzogbnVtYmVyID0gMTI7XG5cbiAgICB3aXRoSWNvbjogYm9vbGVhbjtcbiAgICBpY29uV2lkdGg6IG51bWJlciA9IDIwO1xuXG4gICAgZ2V0IGxlZnRQYWRkaW5nKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy53aXRoSWNvbiA/IDAgOiB0aGlzLmljb25XaWR0aCkgKyB0aGlzLmJhc2VMZWZ0UGFkZGluZztcbiAgICB9XG5cbiAgICBwYWRkaW5nSW5kZW50KCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBjb25zdCBub2RlTGV2ZWwgPSAodGhpcy50cmVlTm9kZS5kYXRhICYmIHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbClcbiAgICAgICAgICAgID8gdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsKHRoaXMudHJlZU5vZGUuZGF0YSlcbiAgICAgICAgICAgIDogMDtcblxuICAgICAgICBjb25zdCBsZXZlbCA9IHRoaXMubGV2ZWwgfHwgbm9kZUxldmVsO1xuXG4gICAgICAgIHJldHVybiBsZXZlbCA+IDAgPyBgJHsobGV2ZWwgKiB0aGlzLl9pbmRlbnQpICsgdGhpcy5sZWZ0UGFkZGluZ31weGAgOiBgJHt0aGlzLmxlZnRQYWRkaW5nfXB4YDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aXRoSWNvbiA9IHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGFibGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgICB9XG59XG4iXX0=
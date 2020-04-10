/**
 * @fileoverview added by tsickle
 * Generated from: padding.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdHJlZS8iLCJzb3VyY2VzIjpbInBhZGRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFPMUQsTUFBTSxPQUFPLGlCQUFxQixTQUFRLGtCQUFxQjtJQUovRDs7UUFTSSxvQkFBZSxHQUFXLEVBQUUsQ0FBQzs7UUFFN0IsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUdyQixjQUFTLEdBQVcsRUFBRSxDQUFDO0lBcUIzQixDQUFDOzs7O0lBbkJHLElBQUksV0FBVztRQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFFRCxhQUFhOztjQUNILFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFDOztjQUVELEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVM7UUFFckMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDO0lBQ2xHLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7O1lBbENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzthQUMvRTs7O29CQUVJLEtBQUssU0FBQyxtQkFBbUI7cUJBRXpCLEtBQUssU0FBQyx5QkFBeUI7Ozs7SUFGaEMsa0NBQTBDOztJQUUxQyxtQ0FBaUQ7O0lBRWpELDRDQUE2Qjs7SUFFN0Isb0NBQXFCOztJQUVyQixxQ0FBa0I7O0lBQ2xCLHNDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrVHJlZU5vZGVQYWRkaW5nIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVHJlZU5vZGVQYWRkaW5nXScsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZVBhZGRpbmcsIHVzZUV4aXN0aW5nOiBNY1RyZWVOb2RlUGFkZGluZyB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlUGFkZGluZzxUPiBleHRlbmRzIENka1RyZWVOb2RlUGFkZGluZzxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCdtY1RyZWVOb2RlUGFkZGluZycpIGxldmVsOiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jVHJlZU5vZGVQYWRkaW5nSW5kZW50JykgaW5kZW50OiBudW1iZXI7XG5cbiAgICBiYXNlTGVmdFBhZGRpbmc6IG51bWJlciA9IDEyO1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiBvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlciovXG4gICAgX2luZGVudDogbnVtYmVyID0gMjA7XG5cbiAgICB3aXRoSWNvbjogYm9vbGVhbjtcbiAgICBpY29uV2lkdGg6IG51bWJlciA9IDIwO1xuXG4gICAgZ2V0IGxlZnRQYWRkaW5nKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy53aXRoSWNvbiA/IDAgOiB0aGlzLmljb25XaWR0aCkgKyB0aGlzLmJhc2VMZWZ0UGFkZGluZztcbiAgICB9XG5cbiAgICBwYWRkaW5nSW5kZW50KCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBjb25zdCBub2RlTGV2ZWwgPSAodGhpcy50cmVlTm9kZS5kYXRhICYmIHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbClcbiAgICAgICAgICAgID8gdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsKHRoaXMudHJlZU5vZGUuZGF0YSlcbiAgICAgICAgICAgIDogMDtcblxuICAgICAgICBjb25zdCBsZXZlbCA9IHRoaXMubGV2ZWwgfHwgbm9kZUxldmVsO1xuXG4gICAgICAgIHJldHVybiBsZXZlbCA+IDAgPyBgJHsobGV2ZWwgKiB0aGlzLl9pbmRlbnQpICsgdGhpcy5sZWZ0UGFkZGluZ31weGAgOiBgJHt0aGlzLmxlZnRQYWRkaW5nfXB4YDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aXRoSWNvbiA9IHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGFibGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgICB9XG59XG4iXX0=
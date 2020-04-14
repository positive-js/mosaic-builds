/**
 * @fileoverview added by tsickle
 * Generated from: toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Component, Directive, Input, ViewEncapsulation } from '@angular/core';
import { CdkTree, CdkTreeNode, CdkTreeNodeToggle } from '@ptsecurity/cdk/tree';
import { map } from 'rxjs/operators';
/**
 * @template T
 */
var McTreeNodeToggleComponent = /** @class */ (function (_super) {
    __extends(McTreeNodeToggleComponent, _super);
    function McTreeNodeToggleComponent(tree, treeNode) {
        var _this = _super.call(this, tree, treeNode) || this;
        _this.disabled = false;
        _this.tree.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value.length > 0; })))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return _this.disabled = state; }));
        return _this;
    }
    Object.defineProperty(McTreeNodeToggleComponent.prototype, "iconState", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled || this.tree.treeControl.isExpanded(this.node);
        },
        enumerable: true,
        configurable: true
    });
    McTreeNodeToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tree-node-toggle',
                    template: "\n        <i class=\"mc mc-icon mc-angle-down-S_16\"></i>\n    ",
                    host: {
                        class: 'mc-tree-node-toggle',
                        '(click)': 'toggle($event)',
                        '[class.mc-opened]': 'iconState',
                        '[attr.disabled]': 'disabled || null'
                    },
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggleComponent }]
                }] }
    ];
    /** @nocollapse */
    McTreeNodeToggleComponent.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    McTreeNodeToggleComponent.propDecorators = {
        node: [{ type: Input }]
    };
    return McTreeNodeToggleComponent;
}(CdkTreeNodeToggle));
export { McTreeNodeToggleComponent };
if (false) {
    /** @type {?} */
    McTreeNodeToggleComponent.prototype.disabled;
    /** @type {?} */
    McTreeNodeToggleComponent.prototype.node;
}
/**
 * @template T
 */
var McTreeNodeToggleDirective = /** @class */ (function (_super) {
    __extends(McTreeNodeToggleDirective, _super);
    function McTreeNodeToggleDirective(tree, treeNode) {
        var _this = _super.call(this, tree, treeNode) || this;
        _this.disabled = false;
        _this.tree.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value.length > 0; })))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) { return _this.disabled = state; }));
        return _this;
    }
    McTreeNodeToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mcTreeNodeToggle]',
                    host: {
                        '(click)': 'toggle($event)',
                        '[attr.disabled]': 'disabled || null'
                    },
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggleDirective }]
                },] }
    ];
    /** @nocollapse */
    McTreeNodeToggleDirective.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    return McTreeNodeToggleDirective;
}(CdkTreeNodeToggle));
export { McTreeNodeToggleDirective };
if (false) {
    /** @type {?} */
    McTreeNodeToggleDirective.prototype.disabled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJ0b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3JDO0lBY2tELDZDQUFvQjtJQVNsRSxtQ0FBWSxJQUFnQixFQUFFLFFBQXdCO1FBQXRELFlBQ0ksa0JBQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUt4QjtRQWRELGNBQVEsR0FBWSxLQUFLLENBQUM7UUFXdEIsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUM1QixJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWhCLENBQWdCLEVBQUMsQ0FBQzthQUN0QyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFjLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBckIsQ0FBcUIsRUFBQyxDQUFDOztJQUM5RCxDQUFDO0lBVkQsc0JBQUksZ0RBQVM7Ozs7UUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hFLENBQUM7OztPQUFBOztnQkFyQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSxpRUFFVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IsbUJBQW1CLEVBQUUsV0FBVzt3QkFDaEMsaUJBQWlCLEVBQUUsa0JBQWtCO3FCQUN4QztvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLHlCQUF5QixFQUFFLENBQUM7aUJBQ3RGOzs7O2dCQWpCUSxPQUFPO2dCQUFFLFdBQVc7Ozt1QkFxQnhCLEtBQUs7O0lBYVYsZ0NBQUM7Q0FBQSxBQTlCRCxDQWNrRCxpQkFBaUIsR0FnQmxFO1NBaEJZLHlCQUF5Qjs7O0lBQ2xDLDZDQUEwQjs7SUFFMUIseUNBQWlCOzs7OztBQWVyQjtJQVFrRCw2Q0FBb0I7SUFHbEUsbUNBQVksSUFBZ0IsRUFBRSxRQUF3QjtRQUF0RCxZQUNJLGtCQUFNLElBQUksRUFBRSxRQUFRLENBQUMsU0FLeEI7UUFSRCxjQUFRLEdBQVksS0FBSyxDQUFDO1FBS3RCLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDNUIsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixFQUFDLENBQUM7YUFDdEMsU0FBUzs7OztRQUFDLFVBQUMsS0FBYyxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQXJCLENBQXFCLEVBQUMsQ0FBQzs7SUFDOUQsQ0FBQzs7Z0JBakJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixJQUFJLEVBQUU7d0JBQ0YsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IsaUJBQWlCLEVBQUUsa0JBQWtCO3FCQUN4QztvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUseUJBQXlCLEVBQUUsQ0FBQztpQkFDdEY7Ozs7Z0JBM0NRLE9BQU87Z0JBQUUsV0FBVzs7SUFzRDdCLGdDQUFDO0NBQUEsQUFsQkQsQ0FRa0QsaUJBQWlCLEdBVWxFO1NBVlkseUJBQXlCOzs7SUFDbEMsNkNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUsIENka1RyZWVOb2RlVG9nZ2xlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1ub2RlLXRvZ2dsZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWFuZ2xlLWRvd24tU18xNlwiPjwvaT5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknLFxuICAgICAgICAnW2NsYXNzLm1jLW9wZW5lZF0nOiAnaWNvblN0YXRlJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlVG9nZ2xlLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZVRvZ2dsZUNvbXBvbmVudCB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50PFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVUb2dnbGU8VD4ge1xuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBub2RlOiBUO1xuXG4gICAgZ2V0IGljb25TdGF0ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnRyZWUudHJlZUNvbnRyb2wuaXNFeHBhbmRlZCh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHRyZWU6IENka1RyZWU8VD4sIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge1xuICAgICAgICBzdXBlcih0cmVlLCB0cmVlTm9kZSk7XG5cbiAgICAgICAgdGhpcy50cmVlLnRyZWVDb250cm9sLmZpbHRlclZhbHVlXG4gICAgICAgICAgICAucGlwZShtYXAoKHZhbHVlKSA9PiB2YWx1ZS5sZW5ndGggPiAwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB0aGlzLmRpc2FibGVkID0gc3RhdGUpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUcmVlTm9kZVRvZ2dsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlVG9nZ2xlLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVUb2dnbGU8VD4ge1xuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlOiBDZGtUcmVlPFQ+LCB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcbiAgICAgICAgc3VwZXIodHJlZSwgdHJlZU5vZGUpO1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG59XG4iXX0=
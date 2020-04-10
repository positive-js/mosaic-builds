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
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-opened]': 'iconState'
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
                        '[class.mc-disabled]': 'disabled'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJ0b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3JDO0lBY2tELDZDQUFvQjtJQVNsRSxtQ0FBWSxJQUFnQixFQUFFLFFBQXdCO1FBQXRELFlBQ0ksa0JBQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUt4QjtRQWRELGNBQVEsR0FBWSxLQUFLLENBQUM7UUFXdEIsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUM1QixJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWhCLENBQWdCLEVBQUMsQ0FBQzthQUN0QyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFjLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBckIsQ0FBcUIsRUFBQyxDQUFDOztJQUM5RCxDQUFDO0lBVkQsc0JBQUksZ0RBQVM7Ozs7UUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hFLENBQUM7OztPQUFBOztnQkFyQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSxpRUFFVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IscUJBQXFCLEVBQUUsVUFBVTt3QkFDakMsbUJBQW1CLEVBQUUsV0FBVztxQkFDbkM7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx5QkFBeUIsRUFBRSxDQUFDO2lCQUN0Rjs7OztnQkFqQlEsT0FBTztnQkFBRSxXQUFXOzs7dUJBcUJ4QixLQUFLOztJQWFWLGdDQUFDO0NBQUEsQUE5QkQsQ0Fja0QsaUJBQWlCLEdBZ0JsRTtTQWhCWSx5QkFBeUI7OztJQUNsQyw2Q0FBMEI7O0lBRTFCLHlDQUFpQjs7Ozs7QUFlckI7SUFRa0QsNkNBQW9CO0lBR2xFLG1DQUFZLElBQWdCLEVBQUUsUUFBd0I7UUFBdEQsWUFDSSxrQkFBTSxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBS3hCO1FBUkQsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUt0QixLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXO2FBQzVCLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBaEIsQ0FBZ0IsRUFBQyxDQUFDO2FBQ3RDLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQWMsSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUFyQixDQUFxQixFQUFDLENBQUM7O0lBQzlELENBQUM7O2dCQWpCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsSUFBSSxFQUFFO3dCQUNGLFNBQVMsRUFBRSxnQkFBZ0I7d0JBQzNCLHFCQUFxQixFQUFFLFVBQVU7cUJBQ3BDO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx5QkFBeUIsRUFBRSxDQUFDO2lCQUN0Rjs7OztnQkEzQ1EsT0FBTztnQkFBRSxXQUFXOztJQXNEN0IsZ0NBQUM7Q0FBQSxBQWxCRCxDQVFrRCxpQkFBaUIsR0FVbEU7U0FWWSx5QkFBeUI7OztJQUNsQyw2Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlLCBDZGtUcmVlTm9kZSwgQ2RrVHJlZU5vZGVUb2dnbGUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aSBjbGFzcz1cIm1jIG1jLWljb24gbWMtYW5nbGUtZG93bi1TXzE2XCI+PC9pPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtbm9kZS10b2dnbGUnLFxuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoJGV2ZW50KScsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1vcGVuZWRdJzogJ2ljb25TdGF0ZSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZVRvZ2dsZSwgdXNlRXhpc3Rpbmc6IE1jVHJlZU5vZGVUb2dnbGVDb21wb25lbnQgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZUNvbXBvbmVudDxUPiBleHRlbmRzIENka1RyZWVOb2RlVG9nZ2xlPFQ+IHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbm9kZTogVDtcblxuICAgIGdldCBpY29uU3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy50cmVlLnRyZWVDb250cm9sLmlzRXhwYW5kZWQodGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlOiBDZGtUcmVlPFQ+LCB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcbiAgICAgICAgc3VwZXIodHJlZSwgdHJlZU5vZGUpO1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVHJlZU5vZGVUb2dnbGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlVG9nZ2xlLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVUb2dnbGU8VD4ge1xuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlOiBDZGtUcmVlPFQ+LCB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcbiAgICAgICAgc3VwZXIodHJlZSwgdHJlZU5vZGUpO1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG59XG4iXX0=
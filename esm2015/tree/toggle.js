/**
 * @fileoverview added by tsickle
 * Generated from: toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Directive, Input, ViewEncapsulation } from '@angular/core';
import { CdkTree, CdkTreeNode, CdkTreeNodeToggle } from '@ptsecurity/cdk/tree';
import { map } from 'rxjs/operators';
/**
 * @template T
 */
export class McTreeNodeToggleComponent extends CdkTreeNodeToggle {
    /**
     * @param {?} tree
     * @param {?} treeNode
     */
    constructor(tree, treeNode) {
        super(tree, treeNode);
        this.disabled = false;
        this.tree.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => value.length > 0)))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => this.disabled = state));
    }
    /**
     * @return {?}
     */
    get iconState() {
        return this.disabled || this.tree.treeControl.isExpanded(this.node);
    }
}
McTreeNodeToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'mc-tree-node-toggle',
                template: `
        <i class="mc mc-icon mc-angle-down-S_16"></i>
    `,
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
McTreeNodeToggleComponent.ctorParameters = () => [
    { type: CdkTree },
    { type: CdkTreeNode }
];
McTreeNodeToggleComponent.propDecorators = {
    node: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McTreeNodeToggleComponent.prototype.disabled;
    /** @type {?} */
    McTreeNodeToggleComponent.prototype.node;
}
/**
 * @template T
 */
export class McTreeNodeToggleDirective extends CdkTreeNodeToggle {
    /**
     * @param {?} tree
     * @param {?} treeNode
     */
    constructor(tree, treeNode) {
        super(tree, treeNode);
        this.disabled = false;
        this.tree.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => value.length > 0)))
            .subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => this.disabled = state));
    }
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
McTreeNodeToggleDirective.ctorParameters = () => [
    { type: CdkTree },
    { type: CdkTreeNode }
];
if (false) {
    /** @type {?} */
    McTreeNodeToggleDirective.prototype.disabled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJ0b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFpQnJDLE1BQU0sT0FBTyx5QkFBNkIsU0FBUSxpQkFBb0I7Ozs7O0lBU2xFLFlBQVksSUFBZ0IsRUFBRSxRQUF3QjtRQUNsRCxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBVDFCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFXdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUM1QixJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxDQUFDO2FBQ3RDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBVkQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7O1lBckJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7O0tBRVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxxQkFBcUI7b0JBQzVCLFNBQVMsRUFBRSxnQkFBZ0I7b0JBQzNCLHFCQUFxQixFQUFFLFVBQVU7b0JBQ2pDLG1CQUFtQixFQUFFLFdBQVc7aUJBQ25DO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUseUJBQXlCLEVBQUUsQ0FBQzthQUN0Rjs7OztZQWpCUSxPQUFPO1lBQUUsV0FBVzs7O21CQXFCeEIsS0FBSzs7OztJQUZOLDZDQUEwQjs7SUFFMUIseUNBQWlCOzs7OztBQXVCckIsTUFBTSxPQUFPLHlCQUE2QixTQUFRLGlCQUFvQjs7Ozs7SUFHbEUsWUFBWSxJQUFnQixFQUFFLFFBQXdCO1FBQ2xELEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFIMUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUt0QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXO2FBQzVCLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLENBQUM7YUFDdEMsU0FBUzs7OztRQUFDLENBQUMsS0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBQyxDQUFDO0lBQzlELENBQUM7OztZQWpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSxnQkFBZ0I7b0JBQzNCLHFCQUFxQixFQUFFLFVBQVU7aUJBQ3BDO2dCQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx5QkFBeUIsRUFBRSxDQUFDO2FBQ3RGOzs7O1lBM0NRLE9BQU87WUFBRSxXQUFXOzs7O0lBNkN6Qiw2Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlLCBDZGtUcmVlTm9kZSwgQ2RrVHJlZU5vZGVUb2dnbGUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aSBjbGFzcz1cIm1jIG1jLWljb24gbWMtYW5nbGUtZG93bi1TXzE2XCI+PC9pPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtbm9kZS10b2dnbGUnLFxuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoJGV2ZW50KScsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1vcGVuZWRdJzogJ2ljb25TdGF0ZSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZVRvZ2dsZSwgdXNlRXhpc3Rpbmc6IE1jVHJlZU5vZGVUb2dnbGVDb21wb25lbnQgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZUNvbXBvbmVudDxUPiBleHRlbmRzIENka1RyZWVOb2RlVG9nZ2xlPFQ+IHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbm9kZTogVDtcblxuICAgIGdldCBpY29uU3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy50cmVlLnRyZWVDb250cm9sLmlzRXhwYW5kZWQodGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlOiBDZGtUcmVlPFQ+LCB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcbiAgICAgICAgc3VwZXIodHJlZSwgdHJlZU5vZGUpO1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVHJlZU5vZGVUb2dnbGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlVG9nZ2xlLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVUb2dnbGU8VD4ge1xuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlOiBDZGtUcmVlPFQ+LCB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcbiAgICAgICAgc3VwZXIodHJlZSwgdHJlZU5vZGUpO1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG59XG4iXX0=
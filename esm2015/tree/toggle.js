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
                    '[class.mc-opened]': 'iconState',
                    '[attr.disabled]': 'disabled || null'
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
                    '[attr.disabled]': 'disabled || null'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJ0b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFpQnJDLE1BQU0sT0FBTyx5QkFBNkIsU0FBUSxpQkFBb0I7Ozs7O0lBU2xFLFlBQVksSUFBZ0IsRUFBRSxRQUF3QjtRQUNsRCxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBVDFCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFXdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUM1QixJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxDQUFDO2FBQ3RDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBVkQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7O1lBckJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7O0tBRVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxxQkFBcUI7b0JBQzVCLFNBQVMsRUFBRSxnQkFBZ0I7b0JBQzNCLG1CQUFtQixFQUFFLFdBQVc7b0JBQ2hDLGlCQUFpQixFQUFFLGtCQUFrQjtpQkFDeEM7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx5QkFBeUIsRUFBRSxDQUFDO2FBQ3RGOzs7O1lBakJRLE9BQU87WUFBRSxXQUFXOzs7bUJBcUJ4QixLQUFLOzs7O0lBRk4sNkNBQTBCOztJQUUxQix5Q0FBaUI7Ozs7O0FBdUJyQixNQUFNLE9BQU8seUJBQTZCLFNBQVEsaUJBQW9COzs7OztJQUdsRSxZQUFZLElBQWdCLEVBQUUsUUFBd0I7UUFDbEQsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUgxQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBS3RCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDNUIsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsQ0FBQzthQUN0QyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUFDLENBQUM7SUFDOUQsQ0FBQzs7O1lBakJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0YsU0FBUyxFQUFFLGdCQUFnQjtvQkFDM0IsaUJBQWlCLEVBQUUsa0JBQWtCO2lCQUN4QztnQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUseUJBQXlCLEVBQUUsQ0FBQzthQUN0Rjs7OztZQTNDUSxPQUFPO1lBQUUsV0FBVzs7OztJQTZDekIsNkNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUsIENka1RyZWVOb2RlVG9nZ2xlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1ub2RlLXRvZ2dsZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWFuZ2xlLWRvd24tU18xNlwiPjwvaT5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknLFxuICAgICAgICAnW2NsYXNzLm1jLW9wZW5lZF0nOiAnaWNvblN0YXRlJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlVG9nZ2xlLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZVRvZ2dsZUNvbXBvbmVudCB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50PFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVUb2dnbGU8VD4ge1xuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBub2RlOiBUO1xuXG4gICAgZ2V0IGljb25TdGF0ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnRyZWUudHJlZUNvbnRyb2wuaXNFeHBhbmRlZCh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHRyZWU6IENka1RyZWU8VD4sIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge1xuICAgICAgICBzdXBlcih0cmVlLCB0cmVlTm9kZSk7XG5cbiAgICAgICAgdGhpcy50cmVlLnRyZWVDb250cm9sLmZpbHRlclZhbHVlXG4gICAgICAgICAgICAucGlwZShtYXAoKHZhbHVlKSA9PiB2YWx1ZS5sZW5ndGggPiAwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB0aGlzLmRpc2FibGVkID0gc3RhdGUpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUcmVlTm9kZVRvZ2dsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlVG9nZ2xlLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVUb2dnbGU8VD4ge1xuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cmVlOiBDZGtUcmVlPFQ+LCB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcbiAgICAgICAgc3VwZXIodHJlZSwgdHJlZU5vZGUpO1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG59XG4iXX0=
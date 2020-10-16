/**
 * @fileoverview added by tsickle
 * Generated from: toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Directive, Input, ViewEncapsulation } from '@angular/core';
import { CdkTree, CdkTreeNode } from '@ptsecurity/cdk/tree';
import { map } from 'rxjs/operators';
/**
 * @template T
 */
export class McTreeNodeToggleComponent {
    /**
     * @param {?} tree
     * @param {?} treeNode
     */
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this.disabled = false;
        this._recursive = false;
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
    get recursive() {
        return this._recursive;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set recursive(value) {
        this._recursive = value;
    }
    /**
     * @return {?}
     */
    get iconState() {
        return this.disabled || this.tree.treeControl.isExpanded(this.node);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
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
                    '[class.mc-opened]': 'iconState',
                    '[attr.disabled]': 'disabled || null',
                    '(click)': 'toggle($event)'
                },
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
McTreeNodeToggleComponent.ctorParameters = () => [
    { type: CdkTree },
    { type: CdkTreeNode }
];
McTreeNodeToggleComponent.propDecorators = {
    node: [{ type: Input }],
    recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
};
if (false) {
    /** @type {?} */
    McTreeNodeToggleComponent.prototype.disabled;
    /** @type {?} */
    McTreeNodeToggleComponent.prototype.node;
    /**
     * @type {?}
     * @private
     */
    McTreeNodeToggleComponent.prototype._recursive;
    /**
     * @type {?}
     * @private
     */
    McTreeNodeToggleComponent.prototype.tree;
    /**
     * @type {?}
     * @private
     */
    McTreeNodeToggleComponent.prototype.treeNode;
}
/**
 * @template T
 */
export class McTreeNodeToggleDirective {
    /**
     * @param {?} tree
     * @param {?} treeNode
     */
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this.disabled = false;
        this._recursive = false;
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
    get recursive() {
        return this._recursive;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set recursive(value) {
        this._recursive = value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    }
}
McTreeNodeToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mcTreeNodeToggle]',
                host: {
                    '[attr.disabled]': 'disabled || null',
                    '(click)': 'toggle($event)'
                }
            },] }
];
/** @nocollapse */
McTreeNodeToggleDirective.ctorParameters = () => [
    { type: CdkTree },
    { type: CdkTreeNode }
];
McTreeNodeToggleDirective.propDecorators = {
    recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
};
if (false) {
    /** @type {?} */
    McTreeNodeToggleDirective.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    McTreeNodeToggleDirective.prototype._recursive;
    /**
     * @type {?}
     * @private
     */
    McTreeNodeToggleDirective.prototype.tree;
    /**
     * @type {?}
     * @private
     */
    McTreeNodeToggleDirective.prototype.treeNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdHJlZS8iLCJzb3VyY2VzIjpbInRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQWdCckMsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7SUFvQmxDLFlBQW9CLElBQWdCLEVBQVUsUUFBd0I7UUFBbEQsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBbkJ0RSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBYWxCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFPdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUM1QixJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxDQUFDO2FBQ3RDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBbkJELElBQ0ksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7OztJQUlELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7O0lBUUQsTUFBTSxDQUFDLEtBQVk7UUFDZixJQUFJLENBQUMsU0FBUztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7OztZQTdDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOztLQUVUO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUscUJBQXFCO29CQUM1QixtQkFBbUIsRUFBRSxXQUFXO29CQUNoQyxpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLFNBQVMsRUFBRSxnQkFBZ0I7aUJBQzlCO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3hDOzs7O1lBaEJRLE9BQU87WUFBRSxXQUFXOzs7bUJBb0J4QixLQUFLO3dCQUVMLEtBQUssU0FBQyw0QkFBNEI7Ozs7SUFKbkMsNkNBQTBCOztJQUUxQix5Q0FBaUI7Ozs7O0lBV2pCLCtDQUEyQjs7Ozs7SUFNZix5Q0FBd0I7Ozs7O0lBQUUsNkNBQWdDOzs7OztBQXNCMUUsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7SUFjbEMsWUFBb0IsSUFBZ0IsRUFBVSxRQUF3QjtRQUFsRCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFidEUsYUFBUSxHQUFZLEtBQUssQ0FBQztRQVdsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBSXZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDNUIsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsQ0FBQzthQUN0QyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUFDLENBQUM7SUFDOUQsQ0FBQzs7OztJQWhCRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBV0QsTUFBTSxDQUFDLEtBQVk7UUFDZixJQUFJLENBQUMsU0FBUztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7OztZQWxDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsSUFBSSxFQUFFO29CQUNGLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsU0FBUyxFQUFFLGdCQUFnQjtpQkFDOUI7YUFDSjs7OztZQTFEUSxPQUFPO1lBQUUsV0FBVzs7O3dCQThEeEIsS0FBSyxTQUFDLDRCQUE0Qjs7OztJQUZuQyw2Q0FBMEI7Ozs7O0lBVzFCLCtDQUEyQjs7Ozs7SUFFZix5Q0FBd0I7Ozs7O0lBQUUsNkNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrVHJlZSwgQ2RrVHJlZU5vZGUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aSBjbGFzcz1cIm1jIG1jLWljb24gbWMtYW5nbGUtZG93bi1TXzE2XCI+PC9pPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtbm9kZS10b2dnbGUnLFxuICAgICAgICAnW2NsYXNzLm1jLW9wZW5lZF0nOiAnaWNvblN0YXRlJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGVUb2dnbGVDb21wb25lbnQ8VD4ge1xuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBub2RlOiBUO1xuXG4gICAgQElucHV0KCdjZGtUcmVlTm9kZVRvZ2dsZVJlY3Vyc2l2ZScpXG4gICAgZ2V0IHJlY3Vyc2l2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Vyc2l2ZTtcbiAgICB9XG5cbiAgICBzZXQgcmVjdXJzaXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlY3Vyc2l2ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY3Vyc2l2ZSA9IGZhbHNlO1xuXG4gICAgZ2V0IGljb25TdGF0ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnRyZWUudHJlZUNvbnRyb2wuaXNFeHBhbmRlZCh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZTogQ2RrVHJlZTxUPiwgcHJpdmF0ZSB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcbiAgICAgICAgdGhpcy50cmVlLnRyZWVDb250cm9sLmZpbHRlclZhbHVlXG4gICAgICAgICAgICAucGlwZShtYXAoKHZhbHVlKSA9PiB2YWx1ZS5sZW5ndGggPiAwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB0aGlzLmRpc2FibGVkID0gc3RhdGUpO1xuICAgIH1cblxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWN1cnNpdmVcbiAgICAgICAgICAgID8gdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZURlc2NlbmRhbnRzKHRoaXMudHJlZU5vZGUuZGF0YSlcbiAgICAgICAgICAgIDogdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZSh0aGlzLnRyZWVOb2RlLmRhdGEpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUcmVlTm9kZVRvZ2dsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlPFQ+IHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdjZGtUcmVlTm9kZVRvZ2dsZVJlY3Vyc2l2ZScpXG4gICAgZ2V0IHJlY3Vyc2l2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Vyc2l2ZTtcbiAgICB9XG5cbiAgICBzZXQgcmVjdXJzaXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlY3Vyc2l2ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY3Vyc2l2ZSA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlOiBDZGtUcmVlPFQ+LCBwcml2YXRlIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVjdXJzaXZlXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGVEZXNjZW5kYW50cyh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG4iXX0=
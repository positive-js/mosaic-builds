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
        (value) => (value === null || value === void 0 ? void 0 : value.length) > 0)))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdHJlZS8iLCJzb3VyY2VzIjpbInRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQWdCckMsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7SUFvQmxDLFlBQW9CLElBQWdCLEVBQVUsUUFBd0I7UUFBbEQsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBbkJ0RSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBYWxCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFPdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUM1QixJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxNQUFNLElBQUcsQ0FBQyxFQUFDLENBQUM7YUFDdkMsU0FBUzs7OztRQUFDLENBQUMsS0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBQyxDQUFDO0lBQzlELENBQUM7Ozs7SUFuQkQsSUFDSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsSUFBSSxTQUFTLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7O0lBSUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQzs7Ozs7SUFRRCxNQUFNLENBQUMsS0FBWTtRQUNmLElBQUksQ0FBQyxTQUFTO1lBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7O1lBN0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7O0tBRVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxxQkFBcUI7b0JBQzVCLG1CQUFtQixFQUFFLFdBQVc7b0JBQ2hDLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsU0FBUyxFQUFFLGdCQUFnQjtpQkFDOUI7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozs7WUFoQlEsT0FBTztZQUFFLFdBQVc7OzttQkFvQnhCLEtBQUs7d0JBRUwsS0FBSyxTQUFDLDRCQUE0Qjs7OztJQUpuQyw2Q0FBMEI7O0lBRTFCLHlDQUFpQjs7Ozs7SUFXakIsK0NBQTJCOzs7OztJQU1mLHlDQUF3Qjs7Ozs7SUFBRSw2Q0FBZ0M7Ozs7O0FBc0IxRSxNQUFNLE9BQU8seUJBQXlCOzs7OztJQWNsQyxZQUFvQixJQUFnQixFQUFVLFFBQXdCO1FBQWxELFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQWJ0RSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBV2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFJdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUM1QixJQUFJLENBQUMsR0FBRzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxDQUFDO2FBQ3RDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBaEJELElBQ0ksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFXRCxNQUFNLENBQUMsS0FBWTtRQUNmLElBQUksQ0FBQyxTQUFTO1lBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7O1lBbENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0YsaUJBQWlCLEVBQUUsa0JBQWtCO29CQUNyQyxTQUFTLEVBQUUsZ0JBQWdCO2lCQUM5QjthQUNKOzs7O1lBMURRLE9BQU87WUFBRSxXQUFXOzs7d0JBOER4QixLQUFLLFNBQUMsNEJBQTRCOzs7O0lBRm5DLDZDQUEwQjs7Ozs7SUFXMUIsK0NBQTJCOzs7OztJQUVmLHlDQUF3Qjs7Ozs7SUFBRSw2Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlLCBDZGtUcmVlTm9kZSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay90cmVlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRyZWUtbm9kZS10b2dnbGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIGNsYXNzPVwibWMgbWMtaWNvbiBtYy1hbmdsZS1kb3duLVNfMTZcIj48L2k+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1ub2RlLXRvZ2dsZScsXG4gICAgICAgICdbY2xhc3MubWMtb3BlbmVkXSc6ICdpY29uU3RhdGUnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoJGV2ZW50KSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZUNvbXBvbmVudDxUPiB7XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIG5vZGU6IFQ7XG5cbiAgICBASW5wdXQoJ2Nka1RyZWVOb2RlVG9nZ2xlUmVjdXJzaXZlJylcbiAgICBnZXQgcmVjdXJzaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVjdXJzaXZlO1xuICAgIH1cblxuICAgIHNldCByZWN1cnNpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVjdXJzaXZlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjdXJzaXZlID0gZmFsc2U7XG5cbiAgICBnZXQgaWNvblN0YXRlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGVkKHRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlOiBDZGtUcmVlPFQ+LCBwcml2YXRlIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge1xuICAgICAgICB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZmlsdGVyVmFsdWVcbiAgICAgICAgICAgIC5waXBlKG1hcCgodmFsdWUpID0+IHZhbHVlPy5sZW5ndGggPiAwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB0aGlzLmRpc2FibGVkID0gc3RhdGUpO1xuICAgIH1cblxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWN1cnNpdmVcbiAgICAgICAgICAgID8gdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZURlc2NlbmRhbnRzKHRoaXMudHJlZU5vZGUuZGF0YSlcbiAgICAgICAgICAgIDogdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZSh0aGlzLnRyZWVOb2RlLmRhdGEpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUcmVlTm9kZVRvZ2dsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlPFQ+IHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdjZGtUcmVlTm9kZVRvZ2dsZVJlY3Vyc2l2ZScpXG4gICAgZ2V0IHJlY3Vyc2l2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Vyc2l2ZTtcbiAgICB9XG5cbiAgICBzZXQgcmVjdXJzaXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlY3Vyc2l2ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY3Vyc2l2ZSA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlOiBDZGtUcmVlPFQ+LCBwcml2YXRlIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVjdXJzaXZlXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGVEZXNjZW5kYW50cyh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG4iXX0=
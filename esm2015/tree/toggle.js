/**
 * @fileoverview added by tsickle
 * Generated from: toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJ0b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFnQnJDLE1BQU0sT0FBTyx5QkFBeUI7Ozs7O0lBb0JsQyxZQUFvQixJQUFnQixFQUFVLFFBQXdCO1FBQWxELFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQW5CdEUsYUFBUSxHQUFZLEtBQUssQ0FBQztRQWFsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBT3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDNUIsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUMsQ0FBQzthQUN0QyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUFDLENBQUM7SUFDOUQsQ0FBQzs7OztJQW5CRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFJRCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7OztJQVFELE1BQU0sQ0FBQyxLQUFZO1FBQ2YsSUFBSSxDQUFDLFNBQVM7WUFDVixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUE3Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7S0FFVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjtvQkFDNUIsbUJBQW1CLEVBQUUsV0FBVztvQkFDaEMsaUJBQWlCLEVBQUUsa0JBQWtCO29CQUNyQyxTQUFTLEVBQUUsZ0JBQWdCO2lCQUM5QjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7OztZQWhCUSxPQUFPO1lBQUUsV0FBVzs7O21CQW9CeEIsS0FBSzt3QkFFTCxLQUFLLFNBQUMsNEJBQTRCOzs7O0lBSm5DLDZDQUEwQjs7SUFFMUIseUNBQWlCOzs7OztJQVdqQiwrQ0FBMkI7Ozs7O0lBTWYseUNBQXdCOzs7OztJQUFFLDZDQUFnQzs7Ozs7QUFzQjFFLE1BQU0sT0FBTyx5QkFBeUI7Ozs7O0lBY2xDLFlBQW9CLElBQWdCLEVBQVUsUUFBd0I7UUFBbEQsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBYnRFLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFXbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUl2QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXO2FBQzVCLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLENBQUM7YUFDdEMsU0FBUzs7OztRQUFDLENBQUMsS0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBQyxDQUFDO0lBQzlELENBQUM7Ozs7SUFoQkQsSUFDSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsSUFBSSxTQUFTLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7OztJQVdELE1BQU0sQ0FBQyxLQUFZO1FBQ2YsSUFBSSxDQUFDLFNBQVM7WUFDVixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUFsQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLElBQUksRUFBRTtvQkFDRixpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLFNBQVMsRUFBRSxnQkFBZ0I7aUJBQzlCO2FBQ0o7Ozs7WUExRFEsT0FBTztZQUFFLFdBQVc7Ozt3QkE4RHhCLEtBQUssU0FBQyw0QkFBNEI7Ozs7SUFGbkMsNkNBQTBCOzs7OztJQVcxQiwrQ0FBMkI7Ozs7O0lBRWYseUNBQXdCOzs7OztJQUFFLDZDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1ub2RlLXRvZ2dsZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWFuZ2xlLWRvd24tU18xNlwiPjwvaT5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1vcGVuZWRdJzogJ2ljb25TdGF0ZScsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50PFQ+IHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbm9kZTogVDtcblxuICAgIEBJbnB1dCgnY2RrVHJlZU5vZGVUb2dnbGVSZWN1cnNpdmUnKVxuICAgIGdldCByZWN1cnNpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWN1cnNpdmU7XG4gICAgfVxuXG4gICAgc2V0IHJlY3Vyc2l2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZWN1cnNpdmUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWN1cnNpdmUgPSBmYWxzZTtcblxuICAgIGdldCBpY29uU3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy50cmVlLnRyZWVDb250cm9sLmlzRXhwYW5kZWQodGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyZWU6IENka1RyZWU8VD4sIHByaXZhdGUgdHJlZU5vZGU6IENka1RyZWVOb2RlPFQ+KSB7XG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVjdXJzaXZlXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGVEZXNjZW5kYW50cyh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVHJlZU5vZGVUb2dnbGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZTxUPiB7XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnY2RrVHJlZU5vZGVUb2dnbGVSZWN1cnNpdmUnKVxuICAgIGdldCByZWN1cnNpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWN1cnNpdmU7XG4gICAgfVxuXG4gICAgc2V0IHJlY3Vyc2l2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZWN1cnNpdmUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWN1cnNpdmUgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZTogQ2RrVHJlZTxUPiwgcHJpdmF0ZSB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcblxuICAgICAgICB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZmlsdGVyVmFsdWVcbiAgICAgICAgICAgIC5waXBlKG1hcCgodmFsdWUpID0+IHZhbHVlLmxlbmd0aCA+IDApKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoc3RhdGU6IGJvb2xlYW4pID0+IHRoaXMuZGlzYWJsZWQgPSBzdGF0ZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlY3Vyc2l2ZVxuICAgICAgICAgICAgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wudG9nZ2xlRGVzY2VuZGFudHModGhpcy50cmVlTm9kZS5kYXRhKVxuICAgICAgICAgICAgOiB0aGlzLnRyZWUudHJlZUNvbnRyb2wudG9nZ2xlKHRoaXMudHJlZU5vZGUuZGF0YSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxufVxuIl19
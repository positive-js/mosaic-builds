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
var McTreeNodeToggleComponent = /** @class */ (function () {
    function McTreeNodeToggleComponent(tree, treeNode) {
        var _this = this;
        this.tree = tree;
        this.treeNode = treeNode;
        this.disabled = false;
        this._recursive = false;
        this.tree.treeControl.filterValue
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
    }
    Object.defineProperty(McTreeNodeToggleComponent.prototype, "recursive", {
        get: /**
         * @return {?}
         */
        function () {
            return this._recursive;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._recursive = value;
        },
        enumerable: true,
        configurable: true
    });
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
    /**
     * @param {?} event
     * @return {?}
     */
    McTreeNodeToggleComponent.prototype.toggle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    };
    McTreeNodeToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tree-node-toggle',
                    template: "\n        <i class=\"mc mc-icon mc-angle-down-S_16\"></i>\n    ",
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
    McTreeNodeToggleComponent.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    McTreeNodeToggleComponent.propDecorators = {
        node: [{ type: Input }],
        recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
    };
    return McTreeNodeToggleComponent;
}());
export { McTreeNodeToggleComponent };
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
var McTreeNodeToggleDirective = /** @class */ (function () {
    function McTreeNodeToggleDirective(tree, treeNode) {
        var _this = this;
        this.tree = tree;
        this.treeNode = treeNode;
        this.disabled = false;
        this._recursive = false;
        this.tree.treeControl.filterValue
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
    }
    Object.defineProperty(McTreeNodeToggleDirective.prototype, "recursive", {
        get: /**
         * @return {?}
         */
        function () {
            return this._recursive;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._recursive = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    McTreeNodeToggleDirective.prototype.toggle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    };
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
    McTreeNodeToggleDirective.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    McTreeNodeToggleDirective.propDecorators = {
        recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
    };
    return McTreeNodeToggleDirective;
}());
export { McTreeNodeToggleDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJ0b2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHckM7SUFpQ0ksbUNBQW9CLElBQWdCLEVBQVUsUUFBd0I7UUFBdEUsaUJBSUM7UUFKbUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBbkJ0RSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBYWxCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFPdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVzthQUM1QixJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWhCLENBQWdCLEVBQUMsQ0FBQzthQUN0QyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFjLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBckIsQ0FBcUIsRUFBQyxDQUFDO0lBQzlELENBQUM7SUFuQkQsc0JBQ0ksZ0RBQVM7Ozs7UUFEYjtZQUVJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7OztRQUVELFVBQWMsS0FBYztZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDOzs7T0FKQTtJQVFELHNCQUFJLGdEQUFTOzs7O1FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FB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Ozs7O0lBRWYseUNBQXdCOzs7OztJQUFFLDZDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1RyZWUsIENka1RyZWVOb2RlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1ub2RlLXRvZ2dsZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWFuZ2xlLWRvd24tU18xNlwiPjwvaT5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1vcGVuZWRdJzogJ2ljb25TdGF0ZScsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50PFQ+IHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbm9kZTogVDtcblxuICAgIEBJbnB1dCgnY2RrVHJlZU5vZGVUb2dnbGVSZWN1cnNpdmUnKVxuICAgIGdldCByZWN1cnNpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWN1cnNpdmU7XG4gICAgfVxuXG4gICAgc2V0IHJlY3Vyc2l2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZWN1cnNpdmUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWN1cnNpdmUgPSBmYWxzZTtcblxuICAgIGdldCBpY29uU3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy50cmVlLnRyZWVDb250cm9sLmlzRXhwYW5kZWQodGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyZWU6IENka1RyZWU8VD4sIHByaXZhdGUgdHJlZU5vZGU6IENka1RyZWVOb2RlPFQ+KSB7XG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVjdXJzaXZlXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGVEZXNjZW5kYW50cyh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVHJlZU5vZGVUb2dnbGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZTxUPiB7XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnY2RrVHJlZU5vZGVUb2dnbGVSZWN1cnNpdmUnKVxuICAgIGdldCByZWN1cnNpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWN1cnNpdmU7XG4gICAgfVxuXG4gICAgc2V0IHJlY3Vyc2l2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9yZWN1cnNpdmUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWN1cnNpdmUgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZTogQ2RrVHJlZTxUPiwgcHJpdmF0ZSB0cmVlTm9kZTogQ2RrVHJlZU5vZGU8VD4pIHtcblxuICAgICAgICB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZmlsdGVyVmFsdWVcbiAgICAgICAgICAgIC5waXBlKG1hcCgodmFsdWUpID0+IHZhbHVlLmxlbmd0aCA+IDApKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoc3RhdGU6IGJvb2xlYW4pID0+IHRoaXMuZGlzYWJsZWQgPSBzdGF0ZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlY3Vyc2l2ZVxuICAgICAgICAgICAgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wudG9nZ2xlRGVzY2VuZGFudHModGhpcy50cmVlTm9kZS5kYXRhKVxuICAgICAgICAgICAgOiB0aGlzLnRyZWUudHJlZUNvbnRyb2wudG9nZ2xlKHRoaXMudHJlZU5vZGUuZGF0YSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxufVxuIl19
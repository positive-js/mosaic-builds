import { Component, Directive, Input, ViewEncapsulation } from '@angular/core';
import { CdkTree, CdkTreeNode } from '@ptsecurity/cdk/tree';
import { map } from 'rxjs/operators';
export class McTreeNodeToggleComponent {
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this.disabled = false;
        this._recursive = false;
        this.tree.treeControl.filterValue
            .pipe(map((value) => (value === null || value === void 0 ? void 0 : value.length) > 0))
            .subscribe((state) => this.disabled = state);
    }
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = value;
    }
    get iconState() {
        return this.disabled || this.tree.treeControl.isExpanded(this.node);
    }
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
            },] }
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
export class McTreeNodeToggleDirective {
    constructor(tree, treeNode) {
        this.tree = tree;
        this.treeNode = treeNode;
        this.disabled = false;
        this._recursive = false;
        this.tree.treeControl.filterValue
            .pipe(map((value) => value.length > 0))
            .subscribe((state) => this.disabled = state);
    }
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = value;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWdCckMsTUFBTSxPQUFPLHlCQUF5QjtJQW9CbEMsWUFBb0IsSUFBZ0IsRUFBVSxRQUF3QjtRQUFsRCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFuQnRFLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFhbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQU92QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXO2FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE1BQU0sSUFBRyxDQUFDLENBQUMsQ0FBQzthQUN2QyxTQUFTLENBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQW5CRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUlELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFRRCxNQUFNLENBQUMsS0FBWTtRQUNmLElBQUksQ0FBQyxTQUFTO1lBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7O1lBN0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7O0tBRVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxxQkFBcUI7b0JBQzVCLG1CQUFtQixFQUFFLFdBQVc7b0JBQ2hDLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsU0FBUyxFQUFFLGdCQUFnQjtpQkFDOUI7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozs7WUFoQlEsT0FBTztZQUFFLFdBQVc7OzttQkFvQnhCLEtBQUs7d0JBRUwsS0FBSyxTQUFDLDRCQUE0Qjs7QUFxQ3ZDLE1BQU0sT0FBTyx5QkFBeUI7SUFjbEMsWUFBb0IsSUFBZ0IsRUFBVSxRQUF3QjtRQUFsRCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFidEUsYUFBUSxHQUFZLEtBQUssQ0FBQztRQVdsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBSXZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN0QyxTQUFTLENBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQWhCRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQVdELE1BQU0sQ0FBQyxLQUFZO1FBQ2YsSUFBSSxDQUFDLFNBQVM7WUFDVixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7WUFsQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLElBQUksRUFBRTtvQkFDRixpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLFNBQVMsRUFBRSxnQkFBZ0I7aUJBQzlCO2FBQ0o7Ozs7WUExRFEsT0FBTztZQUFFLFdBQVc7Ozt3QkE4RHhCLEtBQUssU0FBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlLCBDZGtUcmVlTm9kZSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay90cmVlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRyZWUtbm9kZS10b2dnbGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIGNsYXNzPVwibWMgbWMtaWNvbiBtYy1hbmdsZS1kb3duLVNfMTZcIj48L2k+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1ub2RlLXRvZ2dsZScsXG4gICAgICAgICdbY2xhc3MubWMtb3BlbmVkXSc6ICdpY29uU3RhdGUnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoJGV2ZW50KSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZUNvbXBvbmVudDxUPiB7XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIG5vZGU6IFQ7XG5cbiAgICBASW5wdXQoJ2Nka1RyZWVOb2RlVG9nZ2xlUmVjdXJzaXZlJylcbiAgICBnZXQgcmVjdXJzaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVjdXJzaXZlO1xuICAgIH1cblxuICAgIHNldCByZWN1cnNpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVjdXJzaXZlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjdXJzaXZlID0gZmFsc2U7XG5cbiAgICBnZXQgaWNvblN0YXRlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGVkKHRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlOiBDZGtUcmVlPFQ+LCBwcml2YXRlIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge1xuICAgICAgICB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZmlsdGVyVmFsdWVcbiAgICAgICAgICAgIC5waXBlKG1hcCgodmFsdWUpID0+IHZhbHVlPy5sZW5ndGggPiAwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB0aGlzLmRpc2FibGVkID0gc3RhdGUpO1xuICAgIH1cblxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWN1cnNpdmVcbiAgICAgICAgICAgID8gdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZURlc2NlbmRhbnRzKHRoaXMudHJlZU5vZGUuZGF0YSlcbiAgICAgICAgICAgIDogdGhpcy50cmVlLnRyZWVDb250cm9sLnRvZ2dsZSh0aGlzLnRyZWVOb2RlLmRhdGEpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUcmVlTm9kZVRvZ2dsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlPFQ+IHtcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdjZGtUcmVlTm9kZVRvZ2dsZVJlY3Vyc2l2ZScpXG4gICAgZ2V0IHJlY3Vyc2l2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Vyc2l2ZTtcbiAgICB9XG5cbiAgICBzZXQgcmVjdXJzaXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlY3Vyc2l2ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY3Vyc2l2ZSA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlOiBDZGtUcmVlPFQ+LCBwcml2YXRlIHRyZWVOb2RlOiBDZGtUcmVlTm9kZTxUPikge1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWUubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVjdXJzaXZlXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGVEZXNjZW5kYW50cyh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG4iXX0=
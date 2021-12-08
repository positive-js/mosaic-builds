import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { map } from 'rxjs/operators';
import { McTreeBase, McTreeNode } from './tree-base';
import * as i0 from "@angular/core";
import * as i1 from "./tree-base";
export class McTreeNodeToggleBase {
}
// tslint:disable-next-line:naming-convention
export const McTreeNodeToggleMixinBase = mixinDisabled(McTreeNodeToggleBase);
/** @docs-private */
export class McTreeNodeToggleBaseDirective extends McTreeNodeToggleMixinBase {
    constructor(tree, treeNode) {
        super();
        this.tree = tree;
        this.treeNode = treeNode;
        this._recursive = false;
        this.tree.treeControl.filterValue
            .pipe(map((value) => (value === null || value === void 0 ? void 0 : value.length) > 0))
            .subscribe((state) => this.disabled = state);
    }
    get recursive() {
        return this._recursive;
    }
    set recursive(value) {
        this._recursive = coerceBooleanProperty(value);
    }
    get iconState() {
        return this.tree.treeControl.isExpanded(this.node);
    }
    toggle(event) {
        if (this.disabled) {
            return;
        }
        this.recursive
            ? this.tree.treeControl.toggleDescendants(this.treeNode.data)
            : this.tree.treeControl.toggle(this.treeNode.data);
        event.stopPropagation();
    }
}
/** @nocollapse */ McTreeNodeToggleBaseDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodeToggleBaseDirective, deps: [{ token: i1.McTreeBase }, { token: i1.McTreeNode }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeToggleBaseDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTreeNodeToggleBaseDirective, inputs: { node: "node", recursive: ["mcTreeNodeToggleRecursive", "recursive"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodeToggleBaseDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.McTreeBase }, { type: i1.McTreeNode }]; }, propDecorators: { node: [{
                type: Input
            }], recursive: [{
                type: Input,
                args: ['mcTreeNodeToggleRecursive']
            }] } });
export class McTreeNodeToggleComponent extends McTreeNodeToggleBaseDirective {
}
/** @nocollapse */ McTreeNodeToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodeToggleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTreeNodeToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McTreeNodeToggleComponent, selector: "mc-tree-node-toggle", inputs: { disabled: "disabled" }, host: { listeners: { "click": "toggle($event)" }, properties: { "class.mc-expanded": "iconState", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-node-toggle" }, exportAs: ["mcTreeNodeToggle"], usesInheritance: true, ngImport: i0, template: `<i class="mc mc-icon mc-angle-down-S_16"></i>`, isInline: true, styles: [".mc-tree-node-toggle{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:100%;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-expanded .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodeToggleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-node-toggle',
                    exportAs: 'mcTreeNodeToggle',
                    template: `<i class="mc mc-icon mc-angle-down-S_16"></i>`,
                    styleUrls: ['./toggle.scss'],
                    host: {
                        class: 'mc-tree-node-toggle',
                        '[class.mc-expanded]': 'iconState',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    },
                    inputs: ['disabled'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
export class McTreeNodeToggleDirective extends McTreeNodeToggleBaseDirective {
}
/** @nocollapse */ McTreeNodeToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodeToggleDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTreeNodeToggleDirective, selector: "[mcTreeNodeToggle]", host: { listeners: { "click": "toggle($event)" }, properties: { "attr.disabled": "disabled || null" } }, exportAs: ["mcTreeNodeToggle"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodeToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodeToggle]',
                    exportAs: 'mcTreeNodeToggle',
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    }
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBR3JELE1BQU0sT0FBTyxvQkFBb0I7Q0FBRztBQUdwQyw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQ2EsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdkYsb0JBQW9CO0FBRXBCLE1BQU0sT0FBTyw2QkFBaUMsU0FBUSx5QkFBeUI7SUFrQjNFLFlBQW9CLElBQW1CLEVBQVUsUUFBdUI7UUFDcEUsS0FBSyxFQUFFLENBQUM7UUFEUSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQU5oRSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBU3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsTUFBTSxJQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDLFNBQVMsQ0FBQyxDQUFDLEtBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBckJELElBQ0ksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsS0FBVTtRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFJRCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVVELE1BQU0sQ0FBQyxLQUFZO1FBQ2YsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRTlCLElBQUksQ0FBQyxTQUFTO1lBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7OElBbENRLDZCQUE2QjtrSUFBN0IsNkJBQTZCOzRGQUE3Qiw2QkFBNkI7a0JBRHpDLFNBQVM7MEhBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUdGLFNBQVM7c0JBRFosS0FBSzt1QkFBQywyQkFBMkI7O0FBb0R0QyxNQUFNLE9BQU8seUJBQTZCLFNBQVEsNkJBQWdDOzswSUFBckUseUJBQXlCOzhIQUF6Qix5QkFBeUIsc1VBZHhCLCtDQUErQzs0RkFjaEQseUJBQXlCO2tCQWpCckMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzVCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUscUJBQXFCO3dCQUM1QixxQkFBcUIsRUFBRSxXQUFXO3dCQUVsQyxpQkFBaUIsRUFBRSxrQkFBa0I7d0JBRXJDLFNBQVMsRUFBRSxnQkFBZ0I7cUJBQzlCO29CQUNELE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDs7QUFZRCxNQUFNLE9BQU8seUJBQTZCLFNBQVEsNkJBQWdDOzswSUFBckUseUJBQXlCOzhIQUF6Qix5QkFBeUI7NEZBQXpCLHlCQUF5QjtrQkFSckMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixJQUFJLEVBQUU7d0JBQ0YsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxTQUFTLEVBQUUsZ0JBQWdCO3FCQUM5QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jVHJlZUJhc2UsIE1jVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtYmFzZSc7XG5cblxuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGVUb2dnbGVCYXNlIHt9XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUcmVlTm9kZVRvZ2dsZU1peGluQmFzZTpcbiAgICBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY1RyZWVOb2RlVG9nZ2xlQmFzZSA9IG1peGluRGlzYWJsZWQoTWNUcmVlTm9kZVRvZ2dsZUJhc2UpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZUJhc2VEaXJlY3RpdmU8VD4gZXh0ZW5kcyBNY1RyZWVOb2RlVG9nZ2xlTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSB7XG4gICAgQElucHV0KCkgbm9kZTogVDtcblxuICAgIEBJbnB1dCgnbWNUcmVlTm9kZVRvZ2dsZVJlY3Vyc2l2ZScpXG4gICAgZ2V0IHJlY3Vyc2l2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Vyc2l2ZTtcbiAgICB9XG5cbiAgICBzZXQgcmVjdXJzaXZlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fcmVjdXJzaXZlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWN1cnNpdmUgPSBmYWxzZTtcblxuICAgIGdldCBpY29uU3RhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuaXNFeHBhbmRlZCh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZTogTWNUcmVlQmFzZTxUPiwgcHJpdmF0ZSB0cmVlTm9kZTogTWNUcmVlTm9kZTxUPikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMudHJlZS50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gdmFsdWU/Lmxlbmd0aCA+IDApKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoc3RhdGU6IGJvb2xlYW4pID0+IHRoaXMuZGlzYWJsZWQgPSBzdGF0ZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlY3Vyc2l2ZVxuICAgICAgICAgICAgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wudG9nZ2xlRGVzY2VuZGFudHModGhpcy50cmVlTm9kZS5kYXRhKVxuICAgICAgICAgICAgOiB0aGlzLnRyZWUudHJlZUNvbnRyb2wudG9nZ2xlKHRoaXMudHJlZU5vZGUuZGF0YSk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1ub2RlLXRvZ2dsZScsXG4gICAgZXhwb3J0QXM6ICdtY1RyZWVOb2RlVG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZTogYDxpIGNsYXNzPVwibWMgbWMtaWNvbiBtYy1hbmdsZS1kb3duLVNfMTZcIj48L2k+YCxcbiAgICBzdHlsZVVybHM6IFsnLi90b2dnbGUuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1leHBhbmRlZF0nOiAnaWNvblN0YXRlJyxcblxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJ1xuICAgIH0sXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50PFQ+IGV4dGVuZHMgTWNUcmVlTm9kZVRvZ2dsZUJhc2VEaXJlY3RpdmU8VD4ge31cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RyZWVOb2RlVG9nZ2xlXScsXG4gICAgZXhwb3J0QXM6ICdtY1RyZWVOb2RlVG9nZ2xlJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZTxUPiBleHRlbmRzIE1jVHJlZU5vZGVUb2dnbGVCYXNlRGlyZWN0aXZlPFQ+IHt9XG4iXX0=
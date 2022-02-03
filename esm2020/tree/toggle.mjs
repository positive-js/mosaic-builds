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
            .pipe(map((value) => value?.length > 0))
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
/** @nocollapse */ /** @nocollapse */ McTreeNodeToggleBaseDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeNodeToggleBaseDirective, deps: [{ token: i1.McTreeBase }, { token: i1.McTreeNode }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTreeNodeToggleBaseDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McTreeNodeToggleBaseDirective, inputs: { node: "node", recursive: ["mcTreeNodeToggleRecursive", "recursive"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeNodeToggleBaseDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.McTreeBase }, { type: i1.McTreeNode }]; }, propDecorators: { node: [{
                type: Input
            }], recursive: [{
                type: Input,
                args: ['mcTreeNodeToggleRecursive']
            }] } });
export class McTreeNodeToggleComponent extends McTreeNodeToggleBaseDirective {
}
/** @nocollapse */ /** @nocollapse */ McTreeNodeToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeNodeToggleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTreeNodeToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McTreeNodeToggleComponent, selector: "mc-tree-node-toggle", inputs: { disabled: "disabled" }, host: { listeners: { "click": "toggle($event)" }, properties: { "class.mc-expanded": "iconState", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-node-toggle" }, exportAs: ["mcTreeNodeToggle"], usesInheritance: true, ngImport: i0, template: `<i class="mc mc-icon mc-angle-down-S_16"></i>`, isInline: true, styles: [".mc-tree-node-toggle{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:100%;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-expanded .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeNodeToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tree-node-toggle', exportAs: 'mcTreeNodeToggle', template: `<i class="mc mc-icon mc-angle-down-S_16"></i>`, host: {
                        class: 'mc-tree-node-toggle',
                        '[class.mc-expanded]': 'iconState',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    }, inputs: ['disabled'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mc-tree-node-toggle{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:100%;cursor:pointer}.mc-tree-node-toggle .mc-icon{transform:rotate(-90deg)}.mc-tree-node-toggle.mc-expanded .mc-icon{transform:rotate(0)}.mc-tree-node-toggle[disabled]{cursor:default}\n"] }]
        }] });
export class McTreeNodeToggleDirective extends McTreeNodeToggleBaseDirective {
}
/** @nocollapse */ /** @nocollapse */ McTreeNodeToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeNodeToggleDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTreeNodeToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McTreeNodeToggleDirective, selector: "[mc-tree-node-toggle], [mcTreeNodeToggle]", host: { listeners: { "click": "toggle($event)" }, properties: { "attr.disabled": "disabled || null" } }, exportAs: ["mcTreeNodeToggle"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeNodeToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-tree-node-toggle], [mcTreeNodeToggle]',
                    exportAs: 'mcTreeNodeToggle',
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'toggle($event)'
                    }
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBR3JELE1BQU0sT0FBTyxvQkFBb0I7Q0FBRztBQUdwQyw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQ2EsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdkYsb0JBQW9CO0FBRXBCLE1BQU0sT0FBTyw2QkFBaUMsU0FBUSx5QkFBeUI7SUFrQjNFLFlBQW9CLElBQW1CLEVBQVUsUUFBdUI7UUFDcEUsS0FBSyxFQUFFLENBQUM7UUFEUSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQU5oRSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBU3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7YUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2QyxTQUFTLENBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQXJCRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksU0FBUyxDQUFDLEtBQVU7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBSUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFVRCxNQUFNLENBQUMsS0FBWTtRQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUU5QixJQUFJLENBQUMsU0FBUztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7O2dLQWxDUSw2QkFBNkI7b0pBQTdCLDZCQUE2QjsyRkFBN0IsNkJBQTZCO2tCQUR6QyxTQUFTOzBIQUVHLElBQUk7c0JBQVosS0FBSztnQkFHRixTQUFTO3NCQURaLEtBQUs7dUJBQUMsMkJBQTJCOztBQW9EdEMsTUFBTSxPQUFPLHlCQUE2QixTQUFRLDZCQUFnQzs7NEpBQXJFLHlCQUF5QjtnSkFBekIseUJBQXlCLHNVQWR4QiwrQ0FBK0M7MkZBY2hELHlCQUF5QjtrQkFqQnJDLFNBQVM7K0JBQ0kscUJBQXFCLFlBQ3JCLGtCQUFrQixZQUNsQiwrQ0FBK0MsUUFFbkQ7d0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIscUJBQXFCLEVBQUUsV0FBVzt3QkFFbEMsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUVyQyxTQUFTLEVBQUUsZ0JBQWdCO3FCQUM5QixVQUNPLENBQUMsVUFBVSxDQUFDLGlCQUNMLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07O0FBYW5ELE1BQU0sT0FBTyx5QkFBNkIsU0FBUSw2QkFBZ0M7OzRKQUFyRSx5QkFBeUI7Z0pBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQVJyQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwyQ0FBMkM7b0JBQ3JELFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLElBQUksRUFBRTt3QkFDRixpQkFBaUIsRUFBRSxrQkFBa0I7d0JBQ3JDLFNBQVMsRUFBRSxnQkFBZ0I7cUJBQzlCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgbWl4aW5EaXNhYmxlZCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNUcmVlQmFzZSwgTWNUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1iYXNlJztcblxuXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVRvZ2dsZUJhc2Uge31cblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RyZWVOb2RlVG9nZ2xlTWl4aW5CYXNlOlxuICAgIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jVHJlZU5vZGVUb2dnbGVCYXNlID0gbWl4aW5EaXNhYmxlZChNY1RyZWVOb2RlVG9nZ2xlQmFzZSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlVG9nZ2xlQmFzZURpcmVjdGl2ZTxUPiBleHRlbmRzIE1jVHJlZU5vZGVUb2dnbGVNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgICBASW5wdXQoKSBub2RlOiBUO1xuXG4gICAgQElucHV0KCdtY1RyZWVOb2RlVG9nZ2xlUmVjdXJzaXZlJylcbiAgICBnZXQgcmVjdXJzaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVjdXJzaXZlO1xuICAgIH1cblxuICAgIHNldCByZWN1cnNpdmUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9yZWN1cnNpdmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY3Vyc2l2ZSA9IGZhbHNlO1xuXG4gICAgZ2V0IGljb25TdGF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGVkKHRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlOiBNY1RyZWVCYXNlPFQ+LCBwcml2YXRlIHRyZWVOb2RlOiBNY1RyZWVOb2RlPFQ+KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLnRyZWVDb250cm9sLmZpbHRlclZhbHVlXG4gICAgICAgICAgICAucGlwZShtYXAoKHZhbHVlKSA9PiB2YWx1ZT8ubGVuZ3RoID4gMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4gdGhpcy5kaXNhYmxlZCA9IHN0YXRlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucmVjdXJzaXZlXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGVEZXNjZW5kYW50cyh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IHRoaXMudHJlZS50cmVlQ29udHJvbC50b2dnbGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLW5vZGUtdG9nZ2xlJyxcbiAgICBleHBvcnRBczogJ21jVHJlZU5vZGVUb2dnbGUnLFxuICAgIHRlbXBsYXRlOiBgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWFuZ2xlLWRvd24tU18xNlwiPjwvaT5gLFxuICAgIHN0eWxlVXJsczogWycuL3RvZ2dsZS5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtbm9kZS10b2dnbGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWV4cGFuZGVkXSc6ICdpY29uU3RhdGUnLFxuXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCRldmVudCknXG4gICAgfSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGVUb2dnbGVDb21wb25lbnQ8VD4gZXh0ZW5kcyBNY1RyZWVOb2RlVG9nZ2xlQmFzZURpcmVjdGl2ZTxUPiB7fVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLXRyZWUtbm9kZS10b2dnbGVdLCBbbWNUcmVlTm9kZVRvZ2dsZV0nLFxuICAgIGV4cG9ydEFzOiAnbWNUcmVlTm9kZVRvZ2dsZScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGUoJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGVUb2dnbGVEaXJlY3RpdmU8VD4gZXh0ZW5kcyBNY1RyZWVOb2RlVG9nZ2xlQmFzZURpcmVjdGl2ZTxUPiB7fVxuIl19
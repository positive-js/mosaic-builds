import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { McTreeNodeActionComponent } from './action';
import { McTreeNodeDef } from './node';
import { McTreeNodeOutlet } from './outlet';
import { McTreeNodePadding } from './padding.directive';
import { McTreeNodeToggleDirective, McTreeNodeToggleComponent } from './toggle';
import { McTree } from './tree';
import { McTreeNode } from './tree-base';
import { McTreeOption } from './tree-option.component';
import { McTreeSelection } from './tree-selection.component';
import * as i0 from "@angular/core";
const MC_TREE_DIRECTIVES = [
    McTreeNodeOutlet,
    McTreeNodeDef,
    McTreeNode,
    McTreeNodePadding,
    McTree,
    McTreeSelection,
    McTreeOption,
    McTreeNodePadding,
    McTreeNodeActionComponent,
    McTreeNodeToggleComponent,
    McTreeNodeToggleDirective
];
export class McTreeModule {
}
/** @nocollapse */ McTreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, declarations: [McTreeNodeOutlet,
        McTreeNodeDef,
        McTreeNode,
        McTreeNodePadding,
        McTree,
        McTreeSelection,
        McTreeOption,
        McTreeNodePadding,
        McTreeNodeActionComponent,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective], imports: [CommonModule, McPseudoCheckboxModule], exports: [McTreeNodeOutlet,
        McTreeNodeDef,
        McTreeNode,
        McTreeNodePadding,
        McTree,
        McTreeSelection,
        McTreeOption,
        McTreeNodePadding,
        McTreeNodeActionComponent,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective] });
/** @nocollapse */ McTreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, imports: [[CommonModule, McPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, McPseudoCheckboxModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS90cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQUc3RCxNQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQixNQUFNO0lBQ04sZUFBZTtJQUNmLFlBQVk7SUFDWixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6Qix5QkFBeUI7Q0FDNUIsQ0FBQztBQU9GLE1BQU0sT0FBTyxZQUFZOzs0SEFBWixZQUFZOzZIQUFaLFlBQVksaUJBbEJyQixnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsTUFBTTtRQUNOLGVBQWU7UUFDZixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIseUJBQXlCLGFBSWYsWUFBWSxFQUFFLHNCQUFzQixhQWQ5QyxnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsTUFBTTtRQUNOLGVBQWU7UUFDZixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIseUJBQXlCOzZIQVFoQixZQUFZLFlBSlosQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUM7MkZBSXRDLFlBQVk7a0JBTHhCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLHNCQUFzQixDQUFDO29CQUMvQyxPQUFPLEVBQUUsa0JBQWtCO29CQUMzQixZQUFZLEVBQUUsa0JBQWtCO2lCQUNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNUcmVlTm9kZUFjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vYWN0aW9uJztcbmltcG9ydCB7IE1jVHJlZU5vZGVEZWYgfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHsgTWNUcmVlTm9kZU91dGxldCB9IGZyb20gJy4vb3V0bGV0JztcbmltcG9ydCB7IE1jVHJlZU5vZGVQYWRkaW5nIH0gZnJvbSAnLi9wYWRkaW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlLCBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi90b2dnbGUnO1xuaW1wb3J0IHsgTWNUcmVlIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IE1jVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtYmFzZSc7XG5pbXBvcnQgeyBNY1RyZWVPcHRpb24gfSBmcm9tICcuL3RyZWUtb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RyZWVTZWxlY3Rpb24gfSBmcm9tICcuL3RyZWUtc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5cblxuY29uc3QgTUNfVFJFRV9ESVJFQ1RJVkVTID0gW1xuICAgIE1jVHJlZU5vZGVPdXRsZXQsXG4gICAgTWNUcmVlTm9kZURlZixcbiAgICBNY1RyZWVOb2RlLFxuICAgIE1jVHJlZU5vZGVQYWRkaW5nLFxuICAgIE1jVHJlZSxcbiAgICBNY1RyZWVTZWxlY3Rpb24sXG4gICAgTWNUcmVlT3B0aW9uLFxuICAgIE1jVHJlZU5vZGVQYWRkaW5nLFxuICAgIE1jVHJlZU5vZGVBY3Rpb25Db21wb25lbnQsXG4gICAgTWNUcmVlTm9kZVRvZ2dsZUNvbXBvbmVudCxcbiAgICBNY1RyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1jUHNldWRvQ2hlY2tib3hNb2R1bGVdLFxuICAgIGV4cG9ydHM6IE1DX1RSRUVfRElSRUNUSVZFUyxcbiAgICBkZWNsYXJhdGlvbnM6IE1DX1RSRUVfRElSRUNUSVZFU1xufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVNb2R1bGUge31cbiJdfQ==
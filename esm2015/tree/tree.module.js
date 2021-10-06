import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@ptsecurity/cdk/tree';
import { McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { McTreeNodeDef } from './node.directive';
import { McTreeNodePadding } from './padding.directive';
import { McTreeNodeToggleDirective, McTreeNodeToggleComponent } from './toggle';
import { McTreeOption } from './tree-option.component';
import { McTreeSelection } from './tree-selection.component';
import * as i0 from "@angular/core";
const MC_TREE_DIRECTIVES = [
    McTreeSelection,
    McTreeOption,
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeNodeToggleComponent,
    McTreeNodeToggleDirective
];
export class McTreeModule {
}
/** @nocollapse */ McTreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, declarations: [McTreeSelection,
        McTreeOption,
        McTreeNodeDef,
        McTreeNodePadding,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective], imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule], exports: [McTreeSelection,
        McTreeOption,
        McTreeNodeDef,
        McTreeNodePadding,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective] });
/** @nocollapse */ McTreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, imports: [[CommonModule, CdkTreeModule, McPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS90cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFakUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQUc3RCxNQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLGVBQWU7SUFDZixZQUFZO0lBQ1osYUFBYTtJQUNiLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIseUJBQXlCO0NBQzVCLENBQUM7QUFPRixNQUFNLE9BQU8sWUFBWTs7NEhBQVosWUFBWTs2SEFBWixZQUFZLGlCQWJyQixlQUFlO1FBQ2YsWUFBWTtRQUNaLGFBQWE7UUFDYixpQkFBaUI7UUFDakIseUJBQXlCO1FBQ3pCLHlCQUF5QixhQUlmLFlBQVksRUFBRSxhQUFhLEVBQUUsc0JBQXNCLGFBVDdELGVBQWU7UUFDZixZQUFZO1FBQ1osYUFBYTtRQUNiLGlCQUFpQjtRQUNqQix5QkFBeUI7UUFDekIseUJBQXlCOzZIQVFoQixZQUFZLFlBSlosQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixDQUFDOzJGQUlyRCxZQUFZO2tCQUx4QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsc0JBQXNCLENBQUM7b0JBQzlELE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLFlBQVksRUFBRSxrQkFBa0I7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNUcmVlTm9kZURlZiB9IGZyb20gJy4vbm9kZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNUcmVlTm9kZVBhZGRpbmcgfSBmcm9tICcuL3BhZGRpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1jVHJlZU5vZGVUb2dnbGVEaXJlY3RpdmUsIE1jVHJlZU5vZGVUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL3RvZ2dsZSc7XG5pbXBvcnQgeyBNY1RyZWVPcHRpb24gfSBmcm9tICcuL3RyZWUtb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RyZWVTZWxlY3Rpb24gfSBmcm9tICcuL3RyZWUtc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5cblxuY29uc3QgTUNfVFJFRV9ESVJFQ1RJVkVTID0gW1xuICAgIE1jVHJlZVNlbGVjdGlvbixcbiAgICBNY1RyZWVPcHRpb24sXG4gICAgTWNUcmVlTm9kZURlZixcbiAgICBNY1RyZWVOb2RlUGFkZGluZyxcbiAgICBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50LFxuICAgIE1jVHJlZU5vZGVUb2dnbGVEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2RrVHJlZU1vZHVsZSwgTWNQc2V1ZG9DaGVja2JveE1vZHVsZV0sXG4gICAgZXhwb3J0czogTUNfVFJFRV9ESVJFQ1RJVkVTLFxuICAgIGRlY2xhcmF0aW9uczogTUNfVFJFRV9ESVJFQ1RJVkVTXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU1vZHVsZSB7fVxuIl19
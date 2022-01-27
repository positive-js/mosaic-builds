import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
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
    McTreeNodeToggleComponent,
    McTreeNodeToggleDirective
];
export class McTreeModule {
}
/** @nocollapse */ /** @nocollapse */ McTreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeModule, declarations: [McTreeNodeOutlet,
        McTreeNodeDef,
        McTreeNode,
        McTreeNodePadding,
        McTree,
        McTreeSelection,
        McTreeOption,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective], imports: [CommonModule, McPseudoCheckboxModule], exports: [McTreeNodeOutlet,
        McTreeNodeDef,
        McTreeNode,
        McTreeNodePadding,
        McTree,
        McTreeSelection,
        McTreeOption,
        McTreeNodeToggleComponent,
        McTreeNodeToggleDirective] });
/** @nocollapse */ /** @nocollapse */ McTreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeModule, imports: [[CommonModule, McPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, McPseudoCheckboxModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS90cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBRzdELE1BQU0sa0JBQWtCLEdBQUc7SUFDdkIsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixVQUFVO0lBQ1YsaUJBQWlCO0lBQ2pCLE1BQU07SUFDTixlQUFlO0lBQ2YsWUFBWTtJQUNaLHlCQUF5QjtJQUN6Qix5QkFBeUI7Q0FDNUIsQ0FBQztBQU9GLE1BQU0sT0FBTyxZQUFZOzsrSUFBWixZQUFZO2dKQUFaLFlBQVksaUJBaEJyQixnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsTUFBTTtRQUNOLGVBQWU7UUFDZixZQUFZO1FBQ1oseUJBQXlCO1FBQ3pCLHlCQUF5QixhQUlmLFlBQVksRUFBRSxzQkFBc0IsYUFaOUMsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixVQUFVO1FBQ1YsaUJBQWlCO1FBQ2pCLE1BQU07UUFDTixlQUFlO1FBQ2YsWUFBWTtRQUNaLHlCQUF5QjtRQUN6Qix5QkFBeUI7Z0pBUWhCLFlBQVksWUFKWixDQUFDLFlBQVksRUFBRSxzQkFBc0IsQ0FBQzsyRkFJdEMsWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUM7b0JBQy9DLE9BQU8sRUFBRSxrQkFBa0I7b0JBQzNCLFlBQVksRUFBRSxrQkFBa0I7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY1BzZXVkb0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1RyZWVOb2RlRGVmIH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7IE1jVHJlZU5vZGVPdXRsZXQgfSBmcm9tICcuL291dGxldCc7XG5pbXBvcnQgeyBNY1RyZWVOb2RlUGFkZGluZyB9IGZyb20gJy4vcGFkZGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSwgTWNUcmVlTm9kZVRvZ2dsZUNvbXBvbmVudCB9IGZyb20gJy4vdG9nZ2xlJztcbmltcG9ydCB7IE1jVHJlZSB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBNY1RyZWVOb2RlIH0gZnJvbSAnLi90cmVlLWJhc2UnO1xuaW1wb3J0IHsgTWNUcmVlT3B0aW9uIH0gZnJvbSAnLi90cmVlLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNUcmVlU2VsZWN0aW9uIH0gZnJvbSAnLi90cmVlLXNlbGVjdGlvbi5jb21wb25lbnQnO1xuXG5cbmNvbnN0IE1DX1RSRUVfRElSRUNUSVZFUyA9IFtcbiAgICBNY1RyZWVOb2RlT3V0bGV0LFxuICAgIE1jVHJlZU5vZGVEZWYsXG4gICAgTWNUcmVlTm9kZSxcbiAgICBNY1RyZWVOb2RlUGFkZGluZyxcbiAgICBNY1RyZWUsXG4gICAgTWNUcmVlU2VsZWN0aW9uLFxuICAgIE1jVHJlZU9wdGlvbixcbiAgICBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50LFxuICAgIE1jVHJlZU5vZGVUb2dnbGVEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWNQc2V1ZG9DaGVja2JveE1vZHVsZV0sXG4gICAgZXhwb3J0czogTUNfVFJFRV9ESVJFQ1RJVkVTLFxuICAgIGRlY2xhcmF0aW9uczogTUNfVFJFRV9ESVJFQ1RJVkVTXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU1vZHVsZSB7fVxuIl19
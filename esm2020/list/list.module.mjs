import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McLineModule, McOptionModule, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { McListSelection, McListOption } from './list-selection.component';
import { McList, McListItem } from './list.component';
import * as i0 from "@angular/core";
export class McListModule {
}
/** @nocollapse */ /** @nocollapse */ McListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McListModule, declarations: [McList,
        McListSelection,
        McListItem,
        McListOption], imports: [CommonModule,
        A11yModule,
        McPseudoCheckboxModule,
        McLineModule,
        McOptionModule], exports: [McList,
        McListSelection,
        McListItem,
        McListOption,
        McOptionModule] });
/** @nocollapse */ /** @nocollapse */ McListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McListModule, imports: [[
            CommonModule,
            A11yModule,
            McPseudoCheckboxModule,
            McLineModule,
            McOptionModule
        ], McOptionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        McPseudoCheckboxModule,
                        McLineModule,
                        McOptionModule
                    ],
                    exports: [
                        McList,
                        McListSelection,
                        McListItem,
                        McListOption,
                        McOptionModule
                    ],
                    declarations: [
                        McList,
                        McListSelection,
                        McListItem,
                        McListOption
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvbGlzdC9saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUvRixPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBeUJ0RCxNQUFNLE9BQU8sWUFBWTs7K0lBQVosWUFBWTtnSkFBWixZQUFZLGlCQU5qQixNQUFNO1FBQ04sZUFBZTtRQUNmLFVBQVU7UUFDVixZQUFZLGFBakJaLFlBQVk7UUFDWixVQUFVO1FBQ1Ysc0JBQXNCO1FBQ3RCLFlBQVk7UUFDWixjQUFjLGFBR2QsTUFBTTtRQUNOLGVBQWU7UUFDZixVQUFVO1FBQ1YsWUFBWTtRQUNaLGNBQWM7Z0pBU1QsWUFBWSxZQXJCWjtZQUNMLFlBQVk7WUFDWixVQUFVO1lBQ1Ysc0JBQXNCO1lBQ3RCLFlBQVk7WUFDWixjQUFjO1NBQ2pCLEVBTUcsY0FBYzsyRkFTVCxZQUFZO2tCQXRCeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixVQUFVO3dCQUNWLHNCQUFzQjt3QkFDdEIsWUFBWTt3QkFDWixjQUFjO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsTUFBTTt3QkFDTixlQUFlO3dCQUNmLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixjQUFjO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsTUFBTTt3QkFDTixlQUFlO3dCQUNmLFVBQVU7d0JBQ1YsWUFBWTtxQkFDZjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jTGluZU1vZHVsZSwgTWNPcHRpb25Nb2R1bGUsIE1jUHNldWRvQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cbmltcG9ydCB7IE1jTGlzdFNlbGVjdGlvbiwgTWNMaXN0T3B0aW9uIH0gZnJvbSAnLi9saXN0LXNlbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNMaXN0LCBNY0xpc3RJdGVtIH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWNMaW5lTW9kdWxlLFxuICAgICAgICBNY09wdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY0xpc3QsXG4gICAgICAgIE1jTGlzdFNlbGVjdGlvbixcbiAgICAgICAgTWNMaXN0SXRlbSxcbiAgICAgICAgTWNMaXN0T3B0aW9uLFxuICAgICAgICBNY09wdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jTGlzdCxcbiAgICAgICAgTWNMaXN0U2VsZWN0aW9uLFxuICAgICAgICBNY0xpc3RJdGVtLFxuICAgICAgICBNY0xpc3RPcHRpb25cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jTGlzdE1vZHVsZSB7fVxuIl19
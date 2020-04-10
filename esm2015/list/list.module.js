/**
 * @fileoverview added by tsickle
 * Generated from: list.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McLineModule, McOptionModule, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { McListSelection, McListOption } from './list-selection.component';
import { McList, McListItem } from './list.component';
export class McListModule {
}
McListModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvbGlzdC8iLCJzb3VyY2VzIjpbImxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBeUJ0RCxNQUFNLE9BQU8sWUFBWTs7O1lBdEJ4QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixzQkFBc0I7b0JBQ3RCLFlBQVk7b0JBQ1osY0FBYztpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLE1BQU07b0JBQ04sZUFBZTtvQkFDZixVQUFVO29CQUNWLFlBQVk7b0JBQ1osY0FBYztpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLE1BQU07b0JBQ04sZUFBZTtvQkFDZixVQUFVO29CQUNWLFlBQVk7aUJBQ2Y7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jTGluZU1vZHVsZSwgTWNPcHRpb25Nb2R1bGUsIE1jUHNldWRvQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cbmltcG9ydCB7IE1jTGlzdFNlbGVjdGlvbiwgTWNMaXN0T3B0aW9uIH0gZnJvbSAnLi9saXN0LXNlbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNMaXN0LCBNY0xpc3RJdGVtIH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWNMaW5lTW9kdWxlLFxuICAgICAgICBNY09wdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY0xpc3QsXG4gICAgICAgIE1jTGlzdFNlbGVjdGlvbixcbiAgICAgICAgTWNMaXN0SXRlbSxcbiAgICAgICAgTWNMaXN0T3B0aW9uLFxuICAgICAgICBNY09wdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jTGlzdCxcbiAgICAgICAgTWNMaXN0U2VsZWN0aW9uLFxuICAgICAgICBNY0xpc3RJdGVtLFxuICAgICAgICBNY0xpc3RPcHRpb25cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jTGlzdE1vZHVsZSB7fVxuIl19
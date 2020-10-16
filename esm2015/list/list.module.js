/**
 * @fileoverview added by tsickle
 * Generated from: list.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9saXN0LyIsInNvdXJjZXMiOlsibGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUvRixPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUF5QnRELE1BQU0sT0FBTyxZQUFZOzs7WUF0QnhCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixVQUFVO29CQUNWLHNCQUFzQjtvQkFDdEIsWUFBWTtvQkFDWixjQUFjO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsTUFBTTtvQkFDTixlQUFlO29CQUNmLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixjQUFjO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsTUFBTTtvQkFDTixlQUFlO29CQUNmLFVBQVU7b0JBQ1YsWUFBWTtpQkFDZjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNMaW5lTW9kdWxlLCBNY09wdGlvbk1vZHVsZSwgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNMaXN0U2VsZWN0aW9uLCBNY0xpc3RPcHRpb24gfSBmcm9tICcuL2xpc3Qtc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY0xpc3QsIE1jTGlzdEl0ZW0gfSBmcm9tICcuL2xpc3QuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBNY1BzZXVkb0NoZWNrYm94TW9kdWxlLFxuICAgICAgICBNY0xpbmVNb2R1bGUsXG4gICAgICAgIE1jT3B0aW9uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jTGlzdCxcbiAgICAgICAgTWNMaXN0U2VsZWN0aW9uLFxuICAgICAgICBNY0xpc3RJdGVtLFxuICAgICAgICBNY0xpc3RPcHRpb24sXG4gICAgICAgIE1jT3B0aW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNMaXN0LFxuICAgICAgICBNY0xpc3RTZWxlY3Rpb24sXG4gICAgICAgIE1jTGlzdEl0ZW0sXG4gICAgICAgIE1jTGlzdE9wdGlvblxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNMaXN0TW9kdWxlIHt9XG4iXX0=
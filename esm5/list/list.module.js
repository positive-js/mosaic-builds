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
var McListModule = /** @class */ (function () {
    function McListModule() {
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
    return McListModule;
}());
export { McListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvbGlzdC8iLCJzb3VyY2VzIjpbImxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3REO0lBQUE7SUFzQjJCLENBQUM7O2dCQXRCM0IsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1Ysc0JBQXNCO3dCQUN0QixZQUFZO3dCQUNaLGNBQWM7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxNQUFNO3dCQUNOLGVBQWU7d0JBQ2YsVUFBVTt3QkFDVixZQUFZO3dCQUNaLGNBQWM7cUJBQ2pCO29CQUNELFlBQVksRUFBRTt3QkFDVixNQUFNO3dCQUNOLGVBQWU7d0JBQ2YsVUFBVTt3QkFDVixZQUFZO3FCQUNmO2lCQUNKOztJQUMwQixtQkFBQztDQUFBLEFBdEI1QixJQXNCNEI7U0FBZixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNMaW5lTW9kdWxlLCBNY09wdGlvbk1vZHVsZSwgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNMaXN0U2VsZWN0aW9uLCBNY0xpc3RPcHRpb24gfSBmcm9tICcuL2xpc3Qtc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY0xpc3QsIE1jTGlzdEl0ZW0gfSBmcm9tICcuL2xpc3QuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBNY1BzZXVkb0NoZWNrYm94TW9kdWxlLFxuICAgICAgICBNY0xpbmVNb2R1bGUsXG4gICAgICAgIE1jT3B0aW9uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jTGlzdCxcbiAgICAgICAgTWNMaXN0U2VsZWN0aW9uLFxuICAgICAgICBNY0xpc3RJdGVtLFxuICAgICAgICBNY0xpc3RPcHRpb24sXG4gICAgICAgIE1jT3B0aW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNMaXN0LFxuICAgICAgICBNY0xpc3RTZWxlY3Rpb24sXG4gICAgICAgIE1jTGlzdEl0ZW0sXG4gICAgICAgIE1jTGlzdE9wdGlvblxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNMaXN0TW9kdWxlIHt9XG4iXX0=
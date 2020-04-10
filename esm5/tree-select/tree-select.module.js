/**
 * @fileoverview added by tsickle
 * Generated from: tree-select.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@ptsecurity/cdk/tree';
import { MC_SELECT_SCROLL_STRATEGY_PROVIDER, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McTagsModule } from '@ptsecurity/mosaic/tags';
import { McTreeModule } from '@ptsecurity/mosaic/tree';
import { McTreeSelect, McTreeSelectTrigger } from './tree-select.component';
var McTreeSelectModule = /** @class */ (function () {
    function McTreeSelectModule() {
    }
    McTreeSelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        CdkTreeModule,
                        McTreeModule,
                        McIconModule,
                        McTagsModule,
                        McPseudoCheckboxModule
                    ],
                    exports: [McTreeSelect, McTreeSelectTrigger, CommonModule],
                    declarations: [McTreeSelect, McTreeSelectTrigger],
                    providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                },] }
    ];
    return McTreeSelectModule;
}());
export { McTreeSelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUtc2VsZWN0LyIsInNvdXJjZXMiOlsidHJlZS1zZWxlY3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHNUU7SUFBQTtJQWNpQyxDQUFDOztnQkFkakMsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixzQkFBc0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLENBQUM7b0JBQzFELFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztvQkFDakQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7aUJBQ2xEOztJQUNnQyx5QkFBQztDQUFBLEFBZGxDLElBY2tDO1NBQXJCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1RyZWVNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5pbXBvcnQgeyBNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLCBNY1BzZXVkb0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgTWNUYWdzTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3RhZ3MnO1xuaW1wb3J0IHsgTWNUcmVlTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUnO1xuXG5pbXBvcnQgeyBNY1RyZWVTZWxlY3QsIE1jVHJlZVNlbGVjdFRyaWdnZXIgfSBmcm9tICcuL3RyZWUtc2VsZWN0LmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgQ2RrVHJlZU1vZHVsZSxcbiAgICAgICAgTWNUcmVlTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGUsXG4gICAgICAgIE1jVGFnc01vZHVsZSxcbiAgICAgICAgTWNQc2V1ZG9DaGVja2JveE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW01jVHJlZVNlbGVjdCwgTWNUcmVlU2VsZWN0VHJpZ2dlciwgQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY1RyZWVTZWxlY3QsIE1jVHJlZVNlbGVjdFRyaWdnZXJdLFxuICAgIHByb3ZpZGVyczogW01DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZVNlbGVjdE1vZHVsZSB7fVxuIl19
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MC_SELECT_SCROLL_STRATEGY_PROVIDER, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McSelectModule } from '@ptsecurity/mosaic/select';
import { McTagsModule } from '@ptsecurity/mosaic/tags';
import { McTreeModule } from '@ptsecurity/mosaic/tree';
import { McTreeSelect, McTreeSelectFooter, McTreeSelectTrigger } from './tree-select.component';
import * as i0 from "@angular/core";
export class McTreeSelectModule {
}
/** @nocollapse */ /** @nocollapse */ McTreeSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McTreeSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectModule, declarations: [McTreeSelect, McTreeSelectTrigger, McTreeSelectFooter], imports: [CommonModule,
        OverlayModule,
        McTreeModule,
        McIconModule,
        McTagsModule,
        McPseudoCheckboxModule,
        McSelectModule], exports: [McTreeSelect, McTreeSelectTrigger, McTreeSelectFooter, CommonModule] });
/** @nocollapse */ /** @nocollapse */ McTreeSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectModule, providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [[
            CommonModule,
            OverlayModule,
            McTreeModule,
            McIconModule,
            McTagsModule,
            McPseudoCheckboxModule,
            McSelectModule
        ], CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McTreeModule,
                        McIconModule,
                        McTagsModule,
                        McPseudoCheckboxModule,
                        McSelectModule
                    ],
                    exports: [McTreeSelect, McTreeSelectTrigger, McTreeSelectFooter, CommonModule],
                    declarations: [McTreeSelect, McTreeSelectTrigger, McTreeSelectFooter],
                    providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUtc2VsZWN0L3RyZWUtc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFpQmhHLE1BQU0sT0FBTyxrQkFBa0I7O3FKQUFsQixrQkFBa0I7c0pBQWxCLGtCQUFrQixpQkFIWixZQUFZLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLGFBVGhFLFlBQVk7UUFDWixhQUFhO1FBQ2IsWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osc0JBQXNCO1FBQ3RCLGNBQWMsYUFFUixZQUFZLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsWUFBWTtzSkFJcEUsa0JBQWtCLGFBRmhCLENBQUMsa0NBQWtDLENBQUMsWUFYdEM7WUFDTCxZQUFZO1lBQ1osYUFBYTtZQUNiLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLHNCQUFzQjtZQUN0QixjQUFjO1NBQ2pCLEVBQ2dFLFlBQVk7MkZBSXBFLGtCQUFrQjtrQkFkOUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3dCQUNaLHNCQUFzQjt3QkFDdEIsY0FBYztxQkFDakI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLFlBQVksQ0FBQztvQkFDOUUsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDO29CQUNyRSxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztpQkFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLCBNY1BzZXVkb0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgTWNTZWxlY3RNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvc2VsZWN0JztcbmltcG9ydCB7IE1jVGFnc01vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90YWdzJztcbmltcG9ydCB7IE1jVHJlZU1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90cmVlJztcblxuaW1wb3J0IHsgTWNUcmVlU2VsZWN0LCBNY1RyZWVTZWxlY3RGb290ZXIsIE1jVHJlZVNlbGVjdFRyaWdnZXIgfSBmcm9tICcuL3RyZWUtc2VsZWN0LmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgTWNUcmVlTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGUsXG4gICAgICAgIE1jVGFnc01vZHVsZSxcbiAgICAgICAgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWNTZWxlY3RNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtNY1RyZWVTZWxlY3QsIE1jVHJlZVNlbGVjdFRyaWdnZXIsIE1jVHJlZVNlbGVjdEZvb3RlciwgQ29tbW9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY1RyZWVTZWxlY3QsIE1jVHJlZVNlbGVjdFRyaWdnZXIsIE1jVHJlZVNlbGVjdEZvb3Rlcl0sXG4gICAgcHJvdmlkZXJzOiBbTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlU2VsZWN0TW9kdWxlIHt9XG4iXX0=
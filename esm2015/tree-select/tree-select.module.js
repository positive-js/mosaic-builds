import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@ptsecurity/cdk/tree';
import { MC_SELECT_SCROLL_STRATEGY_PROVIDER, McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McTagsModule } from '@ptsecurity/mosaic/tags';
import { McTreeModule } from '@ptsecurity/mosaic/tree';
import { McTreeSelect, McTreeSelectTrigger } from './tree-select.component';
import * as i0 from "@angular/core";
export class McTreeSelectModule {
}
/** @nocollapse */ McTreeSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McTreeSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeSelectModule, declarations: [McTreeSelect, McTreeSelectTrigger], imports: [CommonModule,
        OverlayModule,
        CdkTreeModule,
        McTreeModule,
        McIconModule,
        McTagsModule,
        McPseudoCheckboxModule], exports: [McTreeSelect, McTreeSelectTrigger, CommonModule] });
/** @nocollapse */ McTreeSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeSelectModule, providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [[
            CommonModule,
            OverlayModule,
            CdkTreeModule,
            McTreeModule,
            McIconModule,
            McTagsModule,
            McPseudoCheckboxModule
        ], CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeSelectModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1zZWxlY3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUtc2VsZWN0L3RyZWUtc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFpQjVFLE1BQU0sT0FBTyxrQkFBa0I7O2tJQUFsQixrQkFBa0I7bUlBQWxCLGtCQUFrQixpQkFIWixZQUFZLEVBQUUsbUJBQW1CLGFBVDVDLFlBQVk7UUFDWixhQUFhO1FBQ2IsYUFBYTtRQUNiLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLHNCQUFzQixhQUVoQixZQUFZLEVBQUUsbUJBQW1CLEVBQUUsWUFBWTttSUFJaEQsa0JBQWtCLGFBRmhCLENBQUMsa0NBQWtDLENBQUMsWUFYdEM7WUFDTCxZQUFZO1lBQ1osYUFBYTtZQUNiLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWixzQkFBc0I7U0FDekIsRUFDNEMsWUFBWTsyRkFJaEQsa0JBQWtCO2tCQWQ5QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixzQkFBc0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxZQUFZLENBQUM7b0JBQzFELFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQztvQkFDakQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7aUJBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrVHJlZU1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay90cmVlJztcbmltcG9ydCB7IE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIsIE1jUHNldWRvQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5pbXBvcnQgeyBNY1RhZ3NNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdGFncyc7XG5pbXBvcnQgeyBNY1RyZWVNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdHJlZSc7XG5cbmltcG9ydCB7IE1jVHJlZVNlbGVjdCwgTWNUcmVlU2VsZWN0VHJpZ2dlciB9IGZyb20gJy4vdHJlZS1zZWxlY3QuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICBDZGtUcmVlTW9kdWxlLFxuICAgICAgICBNY1RyZWVNb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZSxcbiAgICAgICAgTWNUYWdzTW9kdWxlLFxuICAgICAgICBNY1BzZXVkb0NoZWNrYm94TW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbTWNUcmVlU2VsZWN0LCBNY1RyZWVTZWxlY3RUcmlnZ2VyLCBDb21tb25Nb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW01jVHJlZVNlbGVjdCwgTWNUcmVlU2VsZWN0VHJpZ2dlcl0sXG4gICAgcHJvdmlkZXJzOiBbTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlU2VsZWN0TW9kdWxlIHt9XG4iXX0=
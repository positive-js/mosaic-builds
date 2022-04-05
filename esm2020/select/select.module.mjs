import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MC_SELECT_SCROLL_STRATEGY_PROVIDER, McOptionModule } from '@ptsecurity/mosaic/core';
import { McFormFieldModule } from '@ptsecurity/mosaic/form-field';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McTagsModule } from '@ptsecurity/mosaic/tags';
import { McToolTipModule } from '@ptsecurity/mosaic/tooltip';
import { McOptionTooltip } from './select-option.directive';
import { McSelect, McSelectSearch, McSelectSearchEmptyResult, McSelectTrigger } from './select.component';
import * as i0 from "@angular/core";
export class McSelectModule {
}
/** @nocollapse */ /** @nocollapse */ McSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectModule, declarations: [McSelect,
        McSelectSearch,
        McSelectSearchEmptyResult,
        McSelectTrigger,
        McOptionTooltip], imports: [CommonModule,
        OverlayModule,
        McOptionModule,
        McIconModule,
        McTagsModule,
        McToolTipModule], exports: [McFormFieldModule,
        McSelect,
        McSelectSearch,
        McSelectSearchEmptyResult,
        McSelectTrigger,
        McOptionTooltip,
        McOptionModule,
        CommonModule] });
/** @nocollapse */ /** @nocollapse */ McSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectModule, providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [[
            CommonModule,
            OverlayModule,
            McOptionModule,
            McIconModule,
            McTagsModule,
            McToolTipModule
        ], McFormFieldModule,
        McOptionModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McOptionModule,
                        McIconModule,
                        McTagsModule,
                        McToolTipModule
                    ],
                    exports: [
                        McFormFieldModule,
                        McSelect,
                        McSelectSearch,
                        McSelectSearchEmptyResult,
                        McSelectTrigger,
                        McOptionTooltip,
                        McOptionModule,
                        CommonModule
                    ],
                    declarations: [
                        McSelect,
                        McSelectSearch,
                        McSelectSearchEmptyResult,
                        McSelectTrigger,
                        McOptionTooltip
                    ],
                    providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUErQjFHLE1BQU0sT0FBTyxjQUFjOztpSkFBZCxjQUFjO2tKQUFkLGNBQWMsaUJBUm5CLFFBQVE7UUFDUixjQUFjO1FBQ2QseUJBQXlCO1FBQ3pCLGVBQWU7UUFDZixlQUFlLGFBdEJmLFlBQVk7UUFDWixhQUFhO1FBQ2IsY0FBYztRQUNkLFlBQVk7UUFDWixZQUFZO1FBQ1osZUFBZSxhQUdmLGlCQUFpQjtRQUNqQixRQUFRO1FBQ1IsY0FBYztRQUNkLHlCQUF5QjtRQUN6QixlQUFlO1FBQ2YsZUFBZTtRQUNmLGNBQWM7UUFDZCxZQUFZO2tKQVdQLGNBQWMsYUFGWixDQUFDLGtDQUFrQyxDQUFDLFlBekJ0QztZQUNMLFlBQVk7WUFDWixhQUFhO1lBQ2IsY0FBYztZQUNkLFlBQVk7WUFDWixZQUFZO1lBQ1osZUFBZTtTQUNsQixFQUVHLGlCQUFpQjtRQU1qQixjQUFjO1FBQ2QsWUFBWTsyRkFXUCxjQUFjO2tCQTVCMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGVBQWU7cUJBQ2xCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxpQkFBaUI7d0JBQ2pCLFFBQVE7d0JBQ1IsY0FBYzt3QkFDZCx5QkFBeUI7d0JBQ3pCLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixjQUFjO3dCQUNkLFlBQVk7cUJBQ2Y7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLFFBQVE7d0JBQ1IsY0FBYzt3QkFDZCx5QkFBeUI7d0JBQ3pCLGVBQWU7d0JBQ2YsZUFBZTtxQkFDbEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7aUJBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUNfU0VMRUNUX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUiwgTWNPcHRpb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcbmltcG9ydCB7IE1jVGFnc01vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90YWdzJztcbmltcG9ydCB7IE1jVG9vbFRpcE1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcblxuaW1wb3J0IHsgTWNPcHRpb25Ub29sdGlwIH0gZnJvbSAnLi9zZWxlY3Qtb3B0aW9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY1NlbGVjdCwgTWNTZWxlY3RTZWFyY2gsIE1jU2VsZWN0U2VhcmNoRW1wdHlSZXN1bHQsIE1jU2VsZWN0VHJpZ2dlciB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgTWNPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZSxcbiAgICAgICAgTWNUYWdzTW9kdWxlLFxuICAgICAgICBNY1Rvb2xUaXBNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1jU2VsZWN0LFxuICAgICAgICBNY1NlbGVjdFNlYXJjaCxcbiAgICAgICAgTWNTZWxlY3RTZWFyY2hFbXB0eVJlc3VsdCxcbiAgICAgICAgTWNTZWxlY3RUcmlnZ2VyLFxuICAgICAgICBNY09wdGlvblRvb2x0aXAsXG4gICAgICAgIE1jT3B0aW9uTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY1NlbGVjdCxcbiAgICAgICAgTWNTZWxlY3RTZWFyY2gsXG4gICAgICAgIE1jU2VsZWN0U2VhcmNoRW1wdHlSZXN1bHQsXG4gICAgICAgIE1jU2VsZWN0VHJpZ2dlcixcbiAgICAgICAgTWNPcHRpb25Ub29sdGlwXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBNY1NlbGVjdE1vZHVsZSB7fVxuIl19
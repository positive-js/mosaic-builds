import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MC_SELECT_SCROLL_STRATEGY_PROVIDER, McOptionModule } from '@ptsecurity/mosaic/core';
import { McFormFieldModule } from '@ptsecurity/mosaic/form-field';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McTagsModule } from '@ptsecurity/mosaic/tags';
import { McSelect, McSelectSearch, McSelectSearchEmptyResult, McSelectTrigger } from './select.component';
import * as i0 from "@angular/core";
export class McSelectModule {
}
/** @nocollapse */ McSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSelectModule, declarations: [McSelect,
        McSelectSearch,
        McSelectSearchEmptyResult,
        McSelectTrigger], imports: [CommonModule,
        OverlayModule,
        McOptionModule,
        McIconModule,
        McTagsModule], exports: [McFormFieldModule,
        McSelect,
        McSelectSearch,
        McSelectSearchEmptyResult,
        McSelectTrigger,
        McOptionModule,
        CommonModule] });
/** @nocollapse */ McSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSelectModule, providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [[
            CommonModule,
            OverlayModule,
            McOptionModule,
            McIconModule,
            McTagsModule
        ], McFormFieldModule,
        McOptionModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McOptionModule,
                        McIconModule,
                        McTagsModule
                    ],
                    exports: [
                        McFormFieldModule,
                        McSelect,
                        McSelectSearch,
                        McSelectSearchEmptyResult,
                        McSelectTrigger,
                        McOptionModule,
                        CommonModule
                    ],
                    declarations: [
                        McSelect,
                        McSelectSearch,
                        McSelectSearchEmptyResult,
                        McSelectTrigger
                    ],
                    providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9zZWxlY3Qvc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBMkIxRyxNQUFNLE9BQU8sY0FBYzs7OEhBQWQsY0FBYzsrSEFBZCxjQUFjLGlCQU5uQixRQUFRO1FBQ1IsY0FBYztRQUNkLHlCQUF5QjtRQUN6QixlQUFlLGFBbkJmLFlBQVk7UUFDWixhQUFhO1FBQ2IsY0FBYztRQUNkLFlBQVk7UUFDWixZQUFZLGFBR1osaUJBQWlCO1FBQ2pCLFFBQVE7UUFDUixjQUFjO1FBQ2QseUJBQXlCO1FBQ3pCLGVBQWU7UUFDZixjQUFjO1FBQ2QsWUFBWTsrSEFTUCxjQUFjLGFBRlosQ0FBQyxrQ0FBa0MsQ0FBQyxZQXJCdEM7WUFDTCxZQUFZO1lBQ1osYUFBYTtZQUNiLGNBQWM7WUFDZCxZQUFZO1lBQ1osWUFBWTtTQUNmLEVBRUcsaUJBQWlCO1FBS2pCLGNBQWM7UUFDZCxZQUFZOzJGQVNQLGNBQWM7a0JBeEIxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsY0FBYzt3QkFDZCxZQUFZO3dCQUNaLFlBQVk7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGlCQUFpQjt3QkFDakIsUUFBUTt3QkFDUixjQUFjO3dCQUNkLHlCQUF5Qjt3QkFDekIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLFlBQVk7cUJBQ2Y7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLFFBQVE7d0JBQ1IsY0FBYzt3QkFDZCx5QkFBeUI7d0JBQ3pCLGVBQWU7cUJBQUM7b0JBQ3BCLFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO2lCQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIsIE1jT3B0aW9uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5pbXBvcnQgeyBNY1RhZ3NNb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdGFncyc7XG5cbmltcG9ydCB7IE1jU2VsZWN0LCBNY1NlbGVjdFNlYXJjaCwgTWNTZWxlY3RTZWFyY2hFbXB0eVJlc3VsdCwgTWNTZWxlY3RUcmlnZ2VyIH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICBNY09wdGlvbk1vZHVsZSxcbiAgICAgICAgTWNJY29uTW9kdWxlLFxuICAgICAgICBNY1RhZ3NNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1jU2VsZWN0LFxuICAgICAgICBNY1NlbGVjdFNlYXJjaCxcbiAgICAgICAgTWNTZWxlY3RTZWFyY2hFbXB0eVJlc3VsdCxcbiAgICAgICAgTWNTZWxlY3RUcmlnZ2VyLFxuICAgICAgICBNY09wdGlvbk1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNTZWxlY3QsXG4gICAgICAgIE1jU2VsZWN0U2VhcmNoLFxuICAgICAgICBNY1NlbGVjdFNlYXJjaEVtcHR5UmVzdWx0LFxuICAgICAgICBNY1NlbGVjdFRyaWdnZXJdLFxuICAgIHByb3ZpZGVyczogW01DX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE1jU2VsZWN0TW9kdWxlIHt9XG4iXX0=
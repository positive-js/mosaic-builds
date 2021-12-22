import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McTooltipComponent, McTooltipTrigger, McExtendedTooltipTrigger, McWarningTooltipTrigger, MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, MC_TOOLTIP_OPEN_TIME_PROVIDER } from './tooltip.component';
import * as i0 from "@angular/core";
export class McToolTipModule {
}
/** @nocollapse */ /** @nocollapse */ McToolTipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McToolTipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McToolTipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McToolTipModule, declarations: [McTooltipComponent,
        McTooltipTrigger,
        McExtendedTooltipTrigger,
        McWarningTooltipTrigger], imports: [CommonModule, OverlayModule], exports: [McTooltipComponent,
        McTooltipTrigger,
        McExtendedTooltipTrigger,
        McWarningTooltipTrigger] });
/** @nocollapse */ /** @nocollapse */ McToolTipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McToolTipModule, providers: [
        MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
        MC_TOOLTIP_OPEN_TIME_PROVIDER
    ], imports: [[CommonModule, OverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McToolTipModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        McTooltipComponent,
                        McTooltipTrigger,
                        McExtendedTooltipTrigger,
                        McWarningTooltipTrigger
                    ],
                    exports: [
                        McTooltipComponent,
                        McTooltipTrigger,
                        McExtendedTooltipTrigger,
                        McWarningTooltipTrigger
                    ],
                    imports: [CommonModule, OverlayModule],
                    providers: [
                        MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
                        MC_TOOLTIP_OPEN_TIME_PROVIDER
                    ],
                    entryComponents: [McTooltipComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdG9vbHRpcC90b29sdGlwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUNILGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUN2QiwyQ0FBMkMsRUFDM0MsNkJBQTZCLEVBQ2hDLE1BQU0scUJBQXFCLENBQUM7O0FBdUI3QixNQUFNLE9BQU8sZUFBZTs7a0pBQWYsZUFBZTttSkFBZixlQUFlLGlCQWxCcEIsa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQix3QkFBd0I7UUFDeEIsdUJBQXVCLGFBUWpCLFlBQVksRUFBRSxhQUFhLGFBTGpDLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsd0JBQXdCO1FBQ3hCLHVCQUF1QjttSkFTbEIsZUFBZSxhQU5iO1FBQ1AsMkNBQTJDO1FBQzNDLDZCQUE2QjtLQUNoQyxZQUpRLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQzsyRkFPN0IsZUFBZTtrQkFwQjNCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQix3QkFBd0I7d0JBQ3hCLHVCQUF1QjtxQkFDMUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQix3QkFBd0I7d0JBQ3hCLHVCQUF1QjtxQkFDMUI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDdEMsU0FBUyxFQUFFO3dCQUNQLDJDQUEyQzt3QkFDM0MsNkJBQTZCO3FCQUNoQztvQkFDRCxlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgTWNUb29sdGlwQ29tcG9uZW50LFxuICAgIE1jVG9vbHRpcFRyaWdnZXIsXG4gICAgTWNFeHRlbmRlZFRvb2x0aXBUcmlnZ2VyLFxuICAgIE1jV2FybmluZ1Rvb2x0aXBUcmlnZ2VyLFxuICAgIE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIsXG4gICAgTUNfVE9PTFRJUF9PUEVOX1RJTUVfUFJPVklERVJcbn0gZnJvbSAnLi90b29sdGlwLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNUb29sdGlwQ29tcG9uZW50LFxuICAgICAgICBNY1Rvb2x0aXBUcmlnZ2VyLFxuICAgICAgICBNY0V4dGVuZGVkVG9vbHRpcFRyaWdnZXIsXG4gICAgICAgIE1jV2FybmluZ1Rvb2x0aXBUcmlnZ2VyXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jVG9vbHRpcENvbXBvbmVudCxcbiAgICAgICAgTWNUb29sdGlwVHJpZ2dlcixcbiAgICAgICAgTWNFeHRlbmRlZFRvb2x0aXBUcmlnZ2VyLFxuICAgICAgICBNY1dhcm5pbmdUb29sdGlwVHJpZ2dlclxuICAgIF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIsXG4gICAgICAgIE1DX1RPT0xUSVBfT1BFTl9USU1FX1BST1ZJREVSXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNY1Rvb2x0aXBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1jVG9vbFRpcE1vZHVsZSB7fVxuIl19
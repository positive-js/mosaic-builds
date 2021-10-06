import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McTooltipComponent, McTooltip, MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from './tooltip.component';
import * as i0 from "@angular/core";
export class McToolTipModule {
}
/** @nocollapse */ McToolTipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McToolTipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McToolTipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McToolTipModule, declarations: [McTooltipComponent, McTooltip], imports: [CommonModule, OverlayModule], exports: [McTooltipComponent, McTooltip] });
/** @nocollapse */ McToolTipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McToolTipModule, providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[CommonModule, OverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McToolTipModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [McTooltipComponent, McTooltip],
                    exports: [McTooltipComponent, McTooltip],
                    imports: [CommonModule, OverlayModule],
                    providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McTooltipComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdG9vbHRpcC90b29sdGlwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUNILGtCQUFrQixFQUNsQixTQUFTLEVBQ1QsMkNBQTJDLEVBQzlDLE1BQU0scUJBQXFCLENBQUM7O0FBVTdCLE1BQU0sT0FBTyxlQUFlOzsrSEFBZixlQUFlO2dJQUFmLGVBQWUsaUJBTlQsa0JBQWtCLEVBQUUsU0FBUyxhQUVsQyxZQUFZLEVBQUUsYUFBYSxhQUQzQixrQkFBa0IsRUFBRSxTQUFTO2dJQUs5QixlQUFlLGFBSGIsQ0FBQywyQ0FBMkMsQ0FBQyxZQUQvQyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7MkZBSTdCLGVBQWU7a0JBUDNCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDO29CQUM3QyxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxTQUFTLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQ3RDLFNBQVMsRUFBRSxDQUFDLDJDQUEyQyxDQUFDO29CQUN4RCxlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgTWNUb29sdGlwQ29tcG9uZW50LFxuICAgIE1jVG9vbHRpcCxcbiAgICBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXG59IGZyb20gJy4vdG9vbHRpcC5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbTWNUb29sdGlwQ29tcG9uZW50LCBNY1Rvb2x0aXBdLFxuICAgIGV4cG9ydHM6IFtNY1Rvb2x0aXBDb21wb25lbnQsIE1jVG9vbHRpcF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUl0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbTWNUb29sdGlwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2xUaXBNb2R1bGUge1xufVxuIl19
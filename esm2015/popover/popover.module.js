import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McPopoverComponent, McPopoverTrigger, MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './popover.component';
import * as i0 from "@angular/core";
export class McPopoverModule {
}
/** @nocollapse */ McPopoverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McPopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McPopoverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McPopoverModule, declarations: [McPopoverComponent, McPopoverTrigger], imports: [CommonModule, OverlayModule], exports: [McPopoverComponent, McPopoverTrigger] });
/** @nocollapse */ McPopoverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McPopoverModule, providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[CommonModule, OverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McPopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [McPopoverComponent, McPopoverTrigger],
                    exports: [McPopoverComponent, McPopoverTrigger],
                    imports: [CommonModule, OverlayModule],
                    providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McPopoverComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUNILGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsMkNBQTJDLEVBQzlDLE1BQU0scUJBQXFCLENBQUM7O0FBVTdCLE1BQU0sT0FBTyxlQUFlOztnSUFBZixlQUFlO2lJQUFmLGVBQWUsaUJBTlQsa0JBQWtCLEVBQUUsZ0JBQWdCLGFBRXpDLFlBQVksRUFBRSxhQUFhLGFBRDNCLGtCQUFrQixFQUFFLGdCQUFnQjtpSUFLckMsZUFBZSxhQUhiLENBQUMsMkNBQTJDLENBQUMsWUFEL0MsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDOzRGQUk3QixlQUFlO2tCQVAzQixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDO29CQUNwRCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDL0MsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDdEMsU0FBUyxFQUFFLENBQUMsMkNBQTJDLENBQUM7b0JBQ3hELGVBQWUsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgICBNY1BvcG92ZXJDb21wb25lbnQsXG4gICAgTWNQb3BvdmVyVHJpZ2dlcixcbiAgICBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXG59IGZyb20gJy4vcG9wb3Zlci5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbTWNQb3BvdmVyQ29tcG9uZW50LCBNY1BvcG92ZXJUcmlnZ2VyXSxcbiAgICBleHBvcnRzOiBbTWNQb3BvdmVyQ29tcG9uZW50LCBNY1BvcG92ZXJUcmlnZ2VyXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNY1BvcG92ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3Zlck1vZHVsZSB7fVxuIl19
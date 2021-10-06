import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McPopoverComponent, McPopover, MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './popover.component';
import * as i0 from "@angular/core";
export class McPopoverModule {
}
/** @nocollapse */ McPopoverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McPopoverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverModule, declarations: [McPopoverComponent, McPopover], imports: [CommonModule, OverlayModule], exports: [A11yModule, McPopoverComponent, McPopover] });
/** @nocollapse */ McPopoverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverModule, providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[CommonModule, OverlayModule], A11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [McPopoverComponent, McPopover],
                    exports: [A11yModule, McPopoverComponent, McPopover],
                    imports: [CommonModule, OverlayModule],
                    providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McPopoverComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsU0FBUyxFQUNULDJDQUEyQyxFQUM5QyxNQUFNLHFCQUFxQixDQUFDOztBQVU3QixNQUFNLE9BQU8sZUFBZTs7K0hBQWYsZUFBZTtnSUFBZixlQUFlLGlCQU5ULGtCQUFrQixFQUFFLFNBQVMsYUFFbEMsWUFBWSxFQUFFLGFBQWEsYUFEM0IsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFNBQVM7Z0lBSzFDLGVBQWUsYUFIYixDQUFDLDJDQUEyQyxDQUFDLFlBRC9DLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxFQUQ1QixVQUFVOzJGQUtYLGVBQWU7a0JBUDNCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDO29CQUM3QyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxDQUFDO29CQUNwRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUN0QyxTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztvQkFDeEQsZUFBZSxFQUFFLENBQUMsa0JBQWtCLENBQUM7aUJBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgICBNY1BvcG92ZXJDb21wb25lbnQsXG4gICAgTWNQb3BvdmVyLFxuICAgIE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJcbn0gZnJvbSAnLi9wb3BvdmVyLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtNY1BvcG92ZXJDb21wb25lbnQsIE1jUG9wb3Zlcl0sXG4gICAgZXhwb3J0czogW0ExMXlNb2R1bGUsIE1jUG9wb3ZlckNvbXBvbmVudCwgTWNQb3BvdmVyXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNY1BvcG92ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3Zlck1vZHVsZSB7fVxuIl19
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { McTimepicker } from './timepicker.directive';
import * as i0 from "@angular/core";
export class McTimepickerModule {
}
/** @nocollapse */ /** @nocollapse */ McTimepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTimepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McTimepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTimepickerModule, declarations: [McTimepicker], imports: [CommonModule,
        A11yModule,
        PlatformModule,
        FormsModule], exports: [McTimepicker] });
/** @nocollapse */ /** @nocollapse */ McTimepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTimepickerModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTimepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule,
                        FormsModule
                    ],
                    declarations: [McTimepicker],
                    exports: [McTimepicker]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBYXRELE1BQU0sT0FBTyxrQkFBa0I7O3FKQUFsQixrQkFBa0I7c0pBQWxCLGtCQUFrQixpQkFIWixZQUFZLGFBTHZCLFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYztRQUNkLFdBQVcsYUFHTCxZQUFZO3NKQUViLGtCQUFrQixZQVRsQjtZQUNMLFlBQVk7WUFDWixVQUFVO1lBQ1YsY0FBYztZQUNkLFdBQVc7U0FDZDsyRkFJUSxrQkFBa0I7a0JBVjlCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixjQUFjO3dCQUNkLFdBQVc7cUJBQ2Q7b0JBQ0QsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUM1QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE1jVGltZXBpY2tlciB9IGZyb20gJy4vdGltZXBpY2tlci5kaXJlY3RpdmUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEExMXlNb2R1bGUsXG4gICAgICAgIFBsYXRmb3JtTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNUaW1lcGlja2VyXSxcbiAgICBleHBvcnRzOiBbTWNUaW1lcGlja2VyXVxufSlcbmV4cG9ydCBjbGFzcyBNY1RpbWVwaWNrZXJNb2R1bGUge31cbiJdfQ==
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McGutterDirective, McSplitterAreaDirective, McSplitterComponent } from './splitter.component';
import * as i0 from "@angular/core";
export class McSplitterModule {
}
/** @nocollapse */ McSplitterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McSplitterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSplitterModule, declarations: [McGutterDirective,
        McSplitterAreaDirective,
        McSplitterComponent], imports: [CommonModule,
        McIconModule], exports: [McGutterDirective,
        McSplitterAreaDirective,
        McSplitterComponent] });
/** @nocollapse */ McSplitterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSplitterModule, imports: [[
            CommonModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSplitterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        McIconModule
                    ],
                    exports: [
                        McGutterDirective,
                        McSplitterAreaDirective,
                        McSplitterComponent
                    ],
                    declarations: [
                        McGutterDirective,
                        McSplitterAreaDirective,
                        McSplitterComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3NwbGl0dGVyL3NwbGl0dGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBbUJ2RyxNQUFNLE9BQU8sZ0JBQWdCOztnSUFBaEIsZ0JBQWdCO2lJQUFoQixnQkFBZ0IsaUJBTHJCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsbUJBQW1CLGFBWG5CLFlBQVk7UUFDWixZQUFZLGFBR1osaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixtQkFBbUI7aUlBUWQsZ0JBQWdCLFlBZmhCO1lBQ0wsWUFBWTtZQUNaLFlBQVk7U0FDZjsyRkFZUSxnQkFBZ0I7a0JBaEI1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFlBQVk7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2QixtQkFBbUI7cUJBQ3RCO29CQUNELFlBQVksRUFBRTt3QkFDVixpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsbUJBQW1CO3FCQUN0QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5pbXBvcnQgeyBNY0d1dHRlckRpcmVjdGl2ZSwgTWNTcGxpdHRlckFyZWFEaXJlY3RpdmUsIE1jU3BsaXR0ZXJDb21wb25lbnQgfSBmcm9tICcuL3NwbGl0dGVyLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTWNJY29uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jR3V0dGVyRGlyZWN0aXZlLFxuICAgICAgICBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSxcbiAgICAgICAgTWNTcGxpdHRlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jR3V0dGVyRGlyZWN0aXZlLFxuICAgICAgICBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSxcbiAgICAgICAgTWNTcGxpdHRlckNvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNTcGxpdHRlck1vZHVsZSB7XG59XG4iXX0=
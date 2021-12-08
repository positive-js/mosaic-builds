import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McToolTipModule } from '@ptsecurity/mosaic/tooltip';
import { McNavbarFocusableItem, McNavbarBrand, McNavbarDivider, McNavbarItem, McNavbarLogo, McNavbarTitle, McNavbarRectangleElement, McNavbarToggle, McNavbarSubTitle, McNavbarBento } from './navbar-item.component';
import { McNavbar, McNavbarContainer } from './navbar.component';
import { McVerticalNavbar } from './vertical-navbar.component';
import * as i0 from "@angular/core";
export class McNavbarModule {
}
/** @nocollapse */ McNavbarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McNavbarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbarModule, declarations: [McNavbar,
        McNavbarContainer,
        McNavbarTitle,
        McNavbarItem,
        McNavbarBrand,
        McNavbarLogo,
        McNavbarToggle,
        McVerticalNavbar,
        McNavbarDivider,
        McNavbarFocusableItem,
        McNavbarRectangleElement,
        McNavbarSubTitle,
        McNavbarBento], imports: [CommonModule,
        A11yModule,
        PlatformModule,
        McIconModule,
        McToolTipModule], exports: [McNavbar,
        McNavbarContainer,
        McNavbarTitle,
        McNavbarItem,
        McNavbarBrand,
        McNavbarLogo,
        McNavbarToggle,
        McVerticalNavbar,
        McNavbarDivider,
        McNavbarFocusableItem,
        McNavbarRectangleElement,
        McNavbarSubTitle,
        McNavbarBento] });
/** @nocollapse */ McNavbarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbarModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule,
            McIconModule,
            McToolTipModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule,
                        McIconModule,
                        McToolTipModule
                    ],
                    exports: [
                        McNavbar,
                        McNavbarContainer,
                        McNavbarTitle,
                        McNavbarItem,
                        McNavbarBrand,
                        McNavbarLogo,
                        McNavbarToggle,
                        McVerticalNavbar,
                        McNavbarDivider,
                        McNavbarFocusableItem,
                        McNavbarRectangleElement,
                        McNavbarSubTitle,
                        McNavbarBento
                    ],
                    declarations: [
                        McNavbar,
                        McNavbarContainer,
                        McNavbarTitle,
                        McNavbarItem,
                        McNavbarBrand,
                        McNavbarLogo,
                        McNavbarToggle,
                        McVerticalNavbar,
                        McNavbarDivider,
                        McNavbarFocusableItem,
                        McNavbarRectangleElement,
                        McNavbarSubTitle,
                        McNavbarBento
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsT0FBTyxFQUNILHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsZUFBZSxFQUNmLFlBQVksRUFDWixZQUFZLEVBQ1osYUFBYSxFQUNiLHdCQUF3QixFQUN4QixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBMEMvRCxNQUFNLE9BQU8sY0FBYzs7K0hBQWQsY0FBYztnSUFBZCxjQUFjLGlCQWZuQixRQUFRO1FBQ1IsaUJBQWlCO1FBQ2pCLGFBQWE7UUFDYixZQUFZO1FBQ1osYUFBYTtRQUNiLFlBQVk7UUFDWixjQUFjO1FBQ2QsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixxQkFBcUI7UUFDckIsd0JBQXdCO1FBQ3hCLGdCQUFnQjtRQUNoQixhQUFhLGFBbENiLFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYztRQUNkLFlBQVk7UUFDWixlQUFlLGFBR2YsUUFBUTtRQUNSLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2IsWUFBWTtRQUNaLGFBQWE7UUFDYixZQUFZO1FBQ1osY0FBYztRQUNkLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLHdCQUF3QjtRQUN4QixnQkFBZ0I7UUFDaEIsYUFBYTtnSUFrQlIsY0FBYyxZQXRDZDtZQUNMLFlBQVk7WUFDWixVQUFVO1lBQ1YsY0FBYztZQUNkLFlBQVk7WUFDWixlQUFlO1NBQ2xCOzRGQWdDUSxjQUFjO2tCQXZDMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixlQUFlO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsUUFBUTt3QkFDUixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQix3QkFBd0I7d0JBQ3hCLGdCQUFnQjt3QkFDaEIsYUFBYTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLFFBQVE7d0JBQ1IsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIsd0JBQXdCO3dCQUN4QixnQkFBZ0I7d0JBQ2hCLGFBQWE7cUJBQ2hCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgTWNUb29sVGlwTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3Rvb2x0aXAnO1xuXG5pbXBvcnQge1xuICAgIE1jTmF2YmFyRm9jdXNhYmxlSXRlbSxcbiAgICBNY05hdmJhckJyYW5kLFxuICAgIE1jTmF2YmFyRGl2aWRlcixcbiAgICBNY05hdmJhckl0ZW0sXG4gICAgTWNOYXZiYXJMb2dvLFxuICAgIE1jTmF2YmFyVGl0bGUsXG4gICAgTWNOYXZiYXJSZWN0YW5nbGVFbGVtZW50LFxuICAgIE1jTmF2YmFyVG9nZ2xlLFxuICAgIE1jTmF2YmFyU3ViVGl0bGUsXG4gICAgTWNOYXZiYXJCZW50b1xufSBmcm9tICcuL25hdmJhci1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY05hdmJhciwgTWNOYXZiYXJDb250YWluZXIgfSBmcm9tICcuL25hdmJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNWZXJ0aWNhbE5hdmJhciB9IGZyb20gJy4vdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgUGxhdGZvcm1Nb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZSxcbiAgICAgICAgTWNUb29sVGlwTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jTmF2YmFyLFxuICAgICAgICBNY05hdmJhckNvbnRhaW5lcixcbiAgICAgICAgTWNOYXZiYXJUaXRsZSxcbiAgICAgICAgTWNOYXZiYXJJdGVtLFxuICAgICAgICBNY05hdmJhckJyYW5kLFxuICAgICAgICBNY05hdmJhckxvZ28sXG4gICAgICAgIE1jTmF2YmFyVG9nZ2xlLFxuICAgICAgICBNY1ZlcnRpY2FsTmF2YmFyLFxuICAgICAgICBNY05hdmJhckRpdmlkZXIsXG4gICAgICAgIE1jTmF2YmFyRm9jdXNhYmxlSXRlbSxcbiAgICAgICAgTWNOYXZiYXJSZWN0YW5nbGVFbGVtZW50LFxuICAgICAgICBNY05hdmJhclN1YlRpdGxlLFxuICAgICAgICBNY05hdmJhckJlbnRvXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNOYXZiYXIsXG4gICAgICAgIE1jTmF2YmFyQ29udGFpbmVyLFxuICAgICAgICBNY05hdmJhclRpdGxlLFxuICAgICAgICBNY05hdmJhckl0ZW0sXG4gICAgICAgIE1jTmF2YmFyQnJhbmQsXG4gICAgICAgIE1jTmF2YmFyTG9nbyxcbiAgICAgICAgTWNOYXZiYXJUb2dnbGUsXG4gICAgICAgIE1jVmVydGljYWxOYXZiYXIsXG4gICAgICAgIE1jTmF2YmFyRGl2aWRlcixcbiAgICAgICAgTWNOYXZiYXJGb2N1c2FibGVJdGVtLFxuICAgICAgICBNY05hdmJhclJlY3RhbmdsZUVsZW1lbnQsXG4gICAgICAgIE1jTmF2YmFyU3ViVGl0bGUsXG4gICAgICAgIE1jTmF2YmFyQmVudG9cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyTW9kdWxlIHt9XG4iXX0=
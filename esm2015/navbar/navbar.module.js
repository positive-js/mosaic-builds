import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McNavbarItemBase, McNavbarBrand, McNavbarDivider, McNavbarItem, McNavbarLogo, McNavbarTitle } from './navbar-item.component';
import { McNavbar, McNavbarContainer } from './navbar.component';
import { McNavbarToggle, McVerticalNavbar } from './vertical-navbar.component';
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
        McNavbarItemBase], imports: [CommonModule,
        A11yModule,
        PlatformModule,
        McIconModule], exports: [McNavbar,
        McNavbarContainer,
        McNavbarTitle,
        McNavbarItem,
        McNavbarBrand,
        McNavbarLogo,
        McNavbarToggle,
        McVerticalNavbar,
        McNavbarDivider,
        McNavbarItemBase] });
/** @nocollapse */ McNavbarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbarModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule,
                        McIconModule
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
                        McNavbarItemBase
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
                        McNavbarItemBase
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixlQUFlLEVBQ2YsWUFBWSxFQUNaLFlBQVksRUFDWixhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFtQy9FLE1BQU0sT0FBTyxjQUFjOzsrSEFBZCxjQUFjO2dJQUFkLGNBQWMsaUJBWm5CLFFBQVE7UUFDUixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLFlBQVk7UUFDWixhQUFhO1FBQ2IsWUFBWTtRQUNaLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGdCQUFnQixhQTNCaEIsWUFBWTtRQUNaLFVBQVU7UUFDVixjQUFjO1FBQ2QsWUFBWSxhQUdaLFFBQVE7UUFDUixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLFlBQVk7UUFDWixhQUFhO1FBQ2IsWUFBWTtRQUNaLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGdCQUFnQjtnSUFlWCxjQUFjLFlBL0JkO1lBQ0wsWUFBWTtZQUNaLFVBQVU7WUFDVixjQUFjO1lBQ2QsWUFBWTtTQUNmOzRGQTBCUSxjQUFjO2tCQWhDMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGNBQWM7d0JBQ2QsWUFBWTtxQkFDZjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsUUFBUTt3QkFDUixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsZ0JBQWdCO3FCQUNuQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsUUFBUTt3QkFDUixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsZ0JBQWdCO3FCQUNuQjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHtcbiAgICBNY05hdmJhckl0ZW1CYXNlLFxuICAgIE1jTmF2YmFyQnJhbmQsXG4gICAgTWNOYXZiYXJEaXZpZGVyLFxuICAgIE1jTmF2YmFySXRlbSxcbiAgICBNY05hdmJhckxvZ28sXG4gICAgTWNOYXZiYXJUaXRsZVxufSBmcm9tICcuL25hdmJhci1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY05hdmJhciwgTWNOYXZiYXJDb250YWluZXIgfSBmcm9tICcuL25hdmJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNOYXZiYXJUb2dnbGUsIE1jVmVydGljYWxOYXZiYXIgfSBmcm9tICcuL3ZlcnRpY2FsLW5hdmJhci5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEExMXlNb2R1bGUsXG4gICAgICAgIFBsYXRmb3JtTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNOYXZiYXIsXG4gICAgICAgIE1jTmF2YmFyQ29udGFpbmVyLFxuICAgICAgICBNY05hdmJhclRpdGxlLFxuICAgICAgICBNY05hdmJhckl0ZW0sXG4gICAgICAgIE1jTmF2YmFyQnJhbmQsXG4gICAgICAgIE1jTmF2YmFyTG9nbyxcbiAgICAgICAgTWNOYXZiYXJUb2dnbGUsXG4gICAgICAgIE1jVmVydGljYWxOYXZiYXIsXG4gICAgICAgIE1jTmF2YmFyRGl2aWRlcixcbiAgICAgICAgTWNOYXZiYXJJdGVtQmFzZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jTmF2YmFyLFxuICAgICAgICBNY05hdmJhckNvbnRhaW5lcixcbiAgICAgICAgTWNOYXZiYXJUaXRsZSxcbiAgICAgICAgTWNOYXZiYXJJdGVtLFxuICAgICAgICBNY05hdmJhckJyYW5kLFxuICAgICAgICBNY05hdmJhckxvZ28sXG4gICAgICAgIE1jTmF2YmFyVG9nZ2xlLFxuICAgICAgICBNY1ZlcnRpY2FsTmF2YmFyLFxuICAgICAgICBNY05hdmJhckRpdmlkZXIsXG4gICAgICAgIE1jTmF2YmFySXRlbUJhc2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyTW9kdWxlIHt9XG4iXX0=
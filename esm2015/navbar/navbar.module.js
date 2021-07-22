import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McNavbarItemBase, McNavbarBrand, McNavbarDivider, McNavbarItem, McNavbarLogo, McNavbarTitle } from './navbar-item.component';
import { McNavbar, McNavbarContainer } from './navbar.component';
import { McNavbarToggle, McVerticalNavbar } from './vertical-navbar.component';
export class McNavbarModule {
}
McNavbarModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixlQUFlLEVBQ2YsWUFBWSxFQUNaLFlBQVksRUFDWixhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQW1DL0UsTUFBTSxPQUFPLGNBQWM7OztZQWhDMUIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsY0FBYztvQkFDZCxZQUFZO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxRQUFRO29CQUNSLGlCQUFpQjtvQkFDakIsYUFBYTtvQkFDYixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixnQkFBZ0I7aUJBQ25CO2dCQUNELFlBQVksRUFBRTtvQkFDVixRQUFRO29CQUNSLGlCQUFpQjtvQkFDakIsYUFBYTtvQkFDYixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixnQkFBZ0I7aUJBQ25CO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7XG4gICAgTWNOYXZiYXJJdGVtQmFzZSxcbiAgICBNY05hdmJhckJyYW5kLFxuICAgIE1jTmF2YmFyRGl2aWRlcixcbiAgICBNY05hdmJhckl0ZW0sXG4gICAgTWNOYXZiYXJMb2dvLFxuICAgIE1jTmF2YmFyVGl0bGVcbn0gZnJvbSAnLi9uYXZiYXItaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNOYXZiYXIsIE1jTmF2YmFyQ29udGFpbmVyIH0gZnJvbSAnLi9uYXZiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1jTmF2YmFyVG9nZ2xlLCBNY1ZlcnRpY2FsTmF2YmFyIH0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBQbGF0Zm9ybU1vZHVsZSxcbiAgICAgICAgTWNJY29uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jTmF2YmFyLFxuICAgICAgICBNY05hdmJhckNvbnRhaW5lcixcbiAgICAgICAgTWNOYXZiYXJUaXRsZSxcbiAgICAgICAgTWNOYXZiYXJJdGVtLFxuICAgICAgICBNY05hdmJhckJyYW5kLFxuICAgICAgICBNY05hdmJhckxvZ28sXG4gICAgICAgIE1jTmF2YmFyVG9nZ2xlLFxuICAgICAgICBNY1ZlcnRpY2FsTmF2YmFyLFxuICAgICAgICBNY05hdmJhckRpdmlkZXIsXG4gICAgICAgIE1jTmF2YmFySXRlbUJhc2VcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY05hdmJhcixcbiAgICAgICAgTWNOYXZiYXJDb250YWluZXIsXG4gICAgICAgIE1jTmF2YmFyVGl0bGUsXG4gICAgICAgIE1jTmF2YmFySXRlbSxcbiAgICAgICAgTWNOYXZiYXJCcmFuZCxcbiAgICAgICAgTWNOYXZiYXJMb2dvLFxuICAgICAgICBNY05hdmJhclRvZ2dsZSxcbiAgICAgICAgTWNWZXJ0aWNhbE5hdmJhcixcbiAgICAgICAgTWNOYXZiYXJEaXZpZGVyLFxuICAgICAgICBNY05hdmJhckl0ZW1CYXNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhck1vZHVsZSB7fVxuIl19
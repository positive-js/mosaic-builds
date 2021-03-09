import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McNavbar, McNavbarContainer, McNavbarItem, McNavbarTitle, McNavbarBrand, McNavbarLogo } from './navbar.component';
export class McNavbarModule {
}
McNavbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule
                ],
                exports: [
                    McNavbar,
                    McNavbarContainer,
                    McNavbarTitle,
                    McNavbarItem,
                    McNavbarBrand,
                    McNavbarLogo
                ],
                declarations: [
                    McNavbar,
                    McNavbarContainer,
                    McNavbarTitle,
                    McNavbarItem,
                    McNavbarBrand,
                    McNavbarLogo
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFDSCxRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixhQUFhLEVBQ2IsYUFBYSxFQUNiLFlBQVksRUFDZixNQUFNLG9CQUFvQixDQUFDO0FBMEI1QixNQUFNLE9BQU8sY0FBYzs7O1lBdkIxQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixjQUFjO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsUUFBUTtvQkFDUixpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixhQUFhO29CQUNiLFlBQVk7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLFFBQVE7b0JBQ1IsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixZQUFZO2lCQUNmO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgTWNOYXZiYXIsXG4gICAgTWNOYXZiYXJDb250YWluZXIsXG4gICAgTWNOYXZiYXJJdGVtLFxuICAgIE1jTmF2YmFyVGl0bGUsXG4gICAgTWNOYXZiYXJCcmFuZCxcbiAgICBNY05hdmJhckxvZ29cbn0gZnJvbSAnLi9uYXZiYXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBQbGF0Zm9ybU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY05hdmJhcixcbiAgICAgICAgTWNOYXZiYXJDb250YWluZXIsXG4gICAgICAgIE1jTmF2YmFyVGl0bGUsXG4gICAgICAgIE1jTmF2YmFySXRlbSxcbiAgICAgICAgTWNOYXZiYXJCcmFuZCxcbiAgICAgICAgTWNOYXZiYXJMb2dvXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNOYXZiYXIsXG4gICAgICAgIE1jTmF2YmFyQ29udGFpbmVyLFxuICAgICAgICBNY05hdmJhclRpdGxlLFxuICAgICAgICBNY05hdmJhckl0ZW0sXG4gICAgICAgIE1jTmF2YmFyQnJhbmQsXG4gICAgICAgIE1jTmF2YmFyTG9nb1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJNb2R1bGUge31cbiJdfQ==
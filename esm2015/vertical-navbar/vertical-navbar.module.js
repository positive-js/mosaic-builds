import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McVerticalNavbarItem, McVerticalNavbarItemBadge, McVerticalNavbarItemIcon } from './vertical-navbar-item.component';
import { McVerticalNavbar, McVerticalNavbarHeader, McVerticalNavbarTitle } from './vertical-navbar.component';
const COMPONENTS = [
    McVerticalNavbar,
    McVerticalNavbarTitle,
    McVerticalNavbarItem,
    McVerticalNavbarItemIcon,
    McVerticalNavbarItemBadge,
    McVerticalNavbarHeader
];
export class McVerticalNavbarModule {
}
McVerticalNavbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule,
                    McIconModule
                ],
                exports: COMPONENTS,
                declarations: COMPONENTS
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy92ZXJ0aWNhbC1uYXZiYXIvdmVydGljYWwtbmF2YmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQ0gsb0JBQW9CLEVBQ3BCLHlCQUF5QixFQUN6Qix3QkFBd0IsRUFDM0IsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc5RyxNQUFNLFVBQVUsR0FBRztJQUNmLGdCQUFnQjtJQUNoQixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLHdCQUF3QjtJQUN4Qix5QkFBeUI7SUFDekIsc0JBQXNCO0NBQ3pCLENBQUM7QUFZRixNQUFNLE9BQU8sc0JBQXNCOzs7WUFWbEMsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsY0FBYztvQkFDZCxZQUFZO2lCQUNmO2dCQUNELE9BQU8sRUFBRSxVQUFVO2dCQUNuQixZQUFZLEVBQUUsVUFBVTthQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHtcbiAgICBNY1ZlcnRpY2FsTmF2YmFySXRlbSxcbiAgICBNY1ZlcnRpY2FsTmF2YmFySXRlbUJhZGdlLFxuICAgIE1jVmVydGljYWxOYXZiYXJJdGVtSWNvblxufSBmcm9tICcuL3ZlcnRpY2FsLW5hdmJhci1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1ZlcnRpY2FsTmF2YmFyLCBNY1ZlcnRpY2FsTmF2YmFySGVhZGVyLCBNY1ZlcnRpY2FsTmF2YmFyVGl0bGUgfSBmcm9tICcuL3ZlcnRpY2FsLW5hdmJhci5jb21wb25lbnQnO1xuXG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gICAgTWNWZXJ0aWNhbE5hdmJhcixcbiAgICBNY1ZlcnRpY2FsTmF2YmFyVGl0bGUsXG4gICAgTWNWZXJ0aWNhbE5hdmJhckl0ZW0sXG4gICAgTWNWZXJ0aWNhbE5hdmJhckl0ZW1JY29uLFxuICAgIE1jVmVydGljYWxOYXZiYXJJdGVtQmFkZ2UsXG4gICAgTWNWZXJ0aWNhbE5hdmJhckhlYWRlclxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgUGxhdGZvcm1Nb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogQ09NUE9ORU5UUyxcbiAgICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFNcbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhck1vZHVsZSB7fVxuIl19
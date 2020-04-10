/**
 * @fileoverview added by tsickle
 * Generated from: vertical-navbar.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McVerticalNavbarItem, McVerticalNavbarItemBadge, McVerticalNavbarItemIcon } from './vertical-navbar-item.component';
import { McVerticalNavbar, McVerticalNavbarHeader, McVerticalNavbarTitle } from './vertical-navbar.component';
/** @type {?} */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy92ZXJ0aWNhbC1uYXZiYXIvIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC1uYXZiYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUNILG9CQUFvQixFQUNwQix5QkFBeUIsRUFDekIsd0JBQXdCLEVBQzNCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O01BR3hHLFVBQVUsR0FBRztJQUNmLGdCQUFnQjtJQUNoQixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLHdCQUF3QjtJQUN4Qix5QkFBeUI7SUFDekIsc0JBQXNCO0NBQ3pCO0FBWUQsTUFBTSxPQUFPLHNCQUFzQjs7O1lBVmxDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixVQUFVO29CQUNWLGNBQWM7b0JBQ2QsWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUUsVUFBVTtnQkFDbkIsWUFBWSxFQUFFLFVBQVU7YUFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7XG4gICAgTWNWZXJ0aWNhbE5hdmJhckl0ZW0sXG4gICAgTWNWZXJ0aWNhbE5hdmJhckl0ZW1CYWRnZSxcbiAgICBNY1ZlcnRpY2FsTmF2YmFySXRlbUljb25cbn0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXItaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNWZXJ0aWNhbE5hdmJhciwgTWNWZXJ0aWNhbE5hdmJhckhlYWRlciwgTWNWZXJ0aWNhbE5hdmJhclRpdGxlIH0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50JztcblxuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICAgIE1jVmVydGljYWxOYXZiYXIsXG4gICAgTWNWZXJ0aWNhbE5hdmJhclRpdGxlLFxuICAgIE1jVmVydGljYWxOYXZiYXJJdGVtLFxuICAgIE1jVmVydGljYWxOYXZiYXJJdGVtSWNvbixcbiAgICBNY1ZlcnRpY2FsTmF2YmFySXRlbUJhZGdlLFxuICAgIE1jVmVydGljYWxOYXZiYXJIZWFkZXJcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEExMXlNb2R1bGUsXG4gICAgICAgIFBsYXRmb3JtTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IENPTVBPTkVOVFMsXG4gICAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTXG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXJNb2R1bGUge31cbiJdfQ==
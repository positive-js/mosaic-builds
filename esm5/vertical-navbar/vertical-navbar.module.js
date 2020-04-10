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
var COMPONENTS = [
    McVerticalNavbar,
    McVerticalNavbarTitle,
    McVerticalNavbarItem,
    McVerticalNavbarItemIcon,
    McVerticalNavbarItemBadge,
    McVerticalNavbarHeader
];
var McVerticalNavbarModule = /** @class */ (function () {
    function McVerticalNavbarModule() {
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
    return McVerticalNavbarModule;
}());
export { McVerticalNavbarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy92ZXJ0aWNhbC1uYXZiYXIvIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC1uYXZiYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUNILG9CQUFvQixFQUNwQix5QkFBeUIsRUFDekIsd0JBQXdCLEVBQzNCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBR3hHLFVBQVUsR0FBRztJQUNmLGdCQUFnQjtJQUNoQixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLHdCQUF3QjtJQUN4Qix5QkFBeUI7SUFDekIsc0JBQXNCO0NBQ3pCO0FBRUQ7SUFBQTtJQVVxQyxDQUFDOztnQkFWckMsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsY0FBYzt3QkFDZCxZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRSxVQUFVO29CQUNuQixZQUFZLEVBQUUsVUFBVTtpQkFDM0I7O0lBQ29DLDZCQUFDO0NBQUEsQUFWdEMsSUFVc0M7U0FBekIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5pbXBvcnQge1xuICAgIE1jVmVydGljYWxOYXZiYXJJdGVtLFxuICAgIE1jVmVydGljYWxOYXZiYXJJdGVtQmFkZ2UsXG4gICAgTWNWZXJ0aWNhbE5hdmJhckl0ZW1JY29uXG59IGZyb20gJy4vdmVydGljYWwtbmF2YmFyLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE1jVmVydGljYWxOYXZiYXIsIE1jVmVydGljYWxOYXZiYXJIZWFkZXIsIE1jVmVydGljYWxOYXZiYXJUaXRsZSB9IGZyb20gJy4vdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudCc7XG5cblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgICBNY1ZlcnRpY2FsTmF2YmFyLFxuICAgIE1jVmVydGljYWxOYXZiYXJUaXRsZSxcbiAgICBNY1ZlcnRpY2FsTmF2YmFySXRlbSxcbiAgICBNY1ZlcnRpY2FsTmF2YmFySXRlbUljb24sXG4gICAgTWNWZXJ0aWNhbE5hdmJhckl0ZW1CYWRnZSxcbiAgICBNY1ZlcnRpY2FsTmF2YmFySGVhZGVyXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBQbGF0Zm9ybU1vZHVsZSxcbiAgICAgICAgTWNJY29uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBDT01QT05FTlRTLFxuICAgIGRlY2xhcmF0aW9uczogQ09NUE9ORU5UU1xufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFyTW9kdWxlIHt9XG4iXX0=
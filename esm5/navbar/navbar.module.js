/**
 * @fileoverview added by tsickle
 * Generated from: navbar.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McNavbar, McNavbarContainer, McNavbarItem, McNavbarTitle, McNavbarBrand, McNavbarLogo } from './navbar.component';
var McNavbarModule = /** @class */ (function () {
    function McNavbarModule() {
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
    return McNavbarModule;
}());
export { McNavbarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9uYXZiYXIvIiwic291cmNlcyI6WyJuYXZiYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQ0gsUUFBUSxFQUNSLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLEVBQ2YsTUFBTSxvQkFBb0IsQ0FBQztBQUc1QjtJQUFBO0lBdUI2QixDQUFDOztnQkF2QjdCLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGNBQWM7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxRQUFRO3dCQUNSLGlCQUFpQjt3QkFDakIsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsWUFBWTtxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsUUFBUTt3QkFDUixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7cUJBQ2Y7aUJBQ0o7O0lBQzRCLHFCQUFDO0NBQUEsQUF2QjlCLElBdUI4QjtTQUFqQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIE1jTmF2YmFyLFxuICAgIE1jTmF2YmFyQ29udGFpbmVyLFxuICAgIE1jTmF2YmFySXRlbSxcbiAgICBNY05hdmJhclRpdGxlLFxuICAgIE1jTmF2YmFyQnJhbmQsXG4gICAgTWNOYXZiYXJMb2dvXG59IGZyb20gJy4vbmF2YmFyLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgUGxhdGZvcm1Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNOYXZiYXIsXG4gICAgICAgIE1jTmF2YmFyQ29udGFpbmVyLFxuICAgICAgICBNY05hdmJhclRpdGxlLFxuICAgICAgICBNY05hdmJhckl0ZW0sXG4gICAgICAgIE1jTmF2YmFyQnJhbmQsXG4gICAgICAgIE1jTmF2YmFyTG9nb1xuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jTmF2YmFyLFxuICAgICAgICBNY05hdmJhckNvbnRhaW5lcixcbiAgICAgICAgTWNOYXZiYXJUaXRsZSxcbiAgICAgICAgTWNOYXZiYXJJdGVtLFxuICAgICAgICBNY05hdmJhckJyYW5kLFxuICAgICAgICBNY05hdmJhckxvZ29cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyTW9kdWxlIHt9XG4iXX0=
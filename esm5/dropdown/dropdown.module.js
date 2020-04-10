/**
 * @fileoverview added by tsickle
 * Generated from: dropdown.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McDropdownContent } from './dropdown-content';
import { McDropdownItem } from './dropdown-item';
import { MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER, McDropdownTrigger } from './dropdown-trigger';
import { McDropdown } from './dropdown.component';
var McDropdownModule = /** @class */ (function () {
    function McDropdownModule() {
    }
    McDropdownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McIconModule
                    ],
                    exports: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
                    declarations: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
                    providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] }
    ];
    return McDropdownModule;
}());
export { McDropdownModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLDRDQUE0QyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2xEO0lBQUE7SUFVK0IsQ0FBQzs7Z0JBVi9CLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFlBQVk7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztvQkFDM0UsWUFBWSxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztvQkFDaEYsU0FBUyxFQUFFLENBQUMsNENBQTRDLENBQUM7aUJBQzVEOztJQUM4Qix1QkFBQztDQUFBLEFBVmhDLElBVWdDO1NBQW5CLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHsgTWNEcm9wZG93bkNvbnRlbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbnRlbnQnO1xuaW1wb3J0IHsgTWNEcm9wZG93bkl0ZW0gfSBmcm9tICcuL2Ryb3Bkb3duLWl0ZW0nO1xuaW1wb3J0IHsgTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIsIE1jRHJvcGRvd25UcmlnZ2VyIH0gZnJvbSAnLi9kcm9wZG93bi10cmlnZ2VyJztcbmltcG9ydCB7IE1jRHJvcGRvd24gfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgTWNJY29uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbTWNEcm9wZG93biwgTWNEcm9wZG93bkl0ZW0sIE1jRHJvcGRvd25UcmlnZ2VyLCBNY0Ryb3Bkb3duQ29udGVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNEcm9wZG93biwgTWNEcm9wZG93bkl0ZW0sIE1jRHJvcGRvd25UcmlnZ2VyLCBNY0Ryb3Bkb3duQ29udGVudF0sXG4gICAgcHJvdmlkZXJzOiBbTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25Nb2R1bGUge31cbiJdfQ==
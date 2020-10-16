/**
 * @fileoverview added by tsickle
 * Generated from: dropdown.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McDropdownContent } from './dropdown-content';
import { McDropdownItem } from './dropdown-item';
import { MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER, McDropdownTrigger } from './dropdown-trigger';
import { McDropdown } from './dropdown.component';
export class McDropdownModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vIiwic291cmNlcyI6WyJkcm9wZG93bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsNENBQTRDLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFhbEQsTUFBTSxPQUFPLGdCQUFnQjs7O1lBVjVCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixhQUFhO29CQUNiLFlBQVk7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztnQkFDM0UsWUFBWSxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztnQkFDaEYsU0FBUyxFQUFFLENBQUMsNENBQTRDLENBQUM7YUFDNUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7IE1jRHJvcGRvd25Db250ZW50IH0gZnJvbSAnLi9kcm9wZG93bi1jb250ZW50JztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtJztcbmltcG9ydCB7IE1DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSLCBNY0Ryb3Bkb3duVHJpZ2dlciB9IGZyb20gJy4vZHJvcGRvd24tdHJpZ2dlcic7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bi5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW01jRHJvcGRvd24sIE1jRHJvcGRvd25JdGVtLCBNY0Ryb3Bkb3duVHJpZ2dlciwgTWNEcm9wZG93bkNvbnRlbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW01jRHJvcGRvd24sIE1jRHJvcGRvd25JdGVtLCBNY0Ryb3Bkb3duVHJpZ2dlciwgTWNEcm9wZG93bkNvbnRlbnRdLFxuICAgIHByb3ZpZGVyczogW01DX0RST1BET1dOX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duTW9kdWxlIHt9XG4iXX0=
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McDropdownContent } from './dropdown-content.directive';
import { McDropdownItem } from './dropdown-item.component';
import { MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER, McDropdownTrigger } from './dropdown-trigger.directive';
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
                exports: [
                    McDropdown,
                    McDropdownItem,
                    McDropdownTrigger,
                    McDropdownContent
                ],
                declarations: [
                    McDropdown,
                    McDropdownItem,
                    McDropdownTrigger,
                    McDropdownContent
                ],
                providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNENBQTRDLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUF1QmxELE1BQU0sT0FBTyxnQkFBZ0I7OztZQXBCNUIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsVUFBVTtvQkFDVixjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNwQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsVUFBVTtvQkFDVixjQUFjO29CQUNkLGlCQUFpQjtvQkFDakIsaUJBQWlCO2lCQUNwQjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQzthQUM1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHsgTWNEcm9wZG93bkNvbnRlbnQgfSBmcm9tICcuL2Ryb3Bkb3duLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1jRHJvcGRvd25JdGVtIH0gZnJvbSAnLi9kcm9wZG93bi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiwgTWNEcm9wZG93blRyaWdnZXIgfSBmcm9tICcuL2Ryb3Bkb3duLXRyaWdnZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1jRHJvcGRvd24gfSBmcm9tICcuL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgTWNJY29uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jRHJvcGRvd24sXG4gICAgICAgIE1jRHJvcGRvd25JdGVtLFxuICAgICAgICBNY0Ryb3Bkb3duVHJpZ2dlcixcbiAgICAgICAgTWNEcm9wZG93bkNvbnRlbnRcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY0Ryb3Bkb3duLFxuICAgICAgICBNY0Ryb3Bkb3duSXRlbSxcbiAgICAgICAgTWNEcm9wZG93blRyaWdnZXIsXG4gICAgICAgIE1jRHJvcGRvd25Db250ZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtNQ19EUk9QRE9XTl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgTWNEcm9wZG93bk1vZHVsZSB7fVxuIl19
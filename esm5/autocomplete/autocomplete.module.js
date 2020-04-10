/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McOptionModule, McCommonModule } from '@ptsecurity/mosaic/core';
import { McAutocompleteOrigin } from './autocomplete-origin.directive';
import { McAutocompleteTrigger, MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from './autocomplete-trigger.directive';
import { McAutocomplete } from './autocomplete.component';
var McAutocompleteModule = /** @class */ (function () {
    function McAutocompleteModule() {
    }
    McAutocompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [McOptionModule, OverlayModule, McCommonModule, CommonModule],
                    exports: [
                        McAutocomplete,
                        McOptionModule,
                        McAutocompleteTrigger,
                        McAutocompleteOrigin,
                        McCommonModule
                    ],
                    declarations: [McAutocomplete, McAutocompleteTrigger, McAutocompleteOrigin],
                    providers: [MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
                },] }
    ];
    return McAutocompleteModule;
}());
export { McAutocompleteModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJhdXRvY29tcGxldGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUNILHFCQUFxQixFQUNyQixnREFBZ0QsRUFDbkQsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHMUQ7SUFBQTtJQVltQyxDQUFDOztnQkFabkMsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQztvQkFDdEUsT0FBTyxFQUFFO3dCQUNMLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxxQkFBcUI7d0JBQ3JCLG9CQUFvQjt3QkFDcEIsY0FBYztxQkFDakI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixDQUFDO29CQUMzRSxTQUFTLEVBQUUsQ0FBQyxnREFBZ0QsQ0FBQztpQkFDaEU7O0lBQ2tDLDJCQUFDO0NBQUEsQUFacEMsSUFZb0M7U0FBdkIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNPcHRpb25Nb2R1bGUsIE1jQ29tbW9uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNY0F1dG9jb21wbGV0ZU9yaWdpbiB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLW9yaWdpbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHtcbiAgICBNY0F1dG9jb21wbGV0ZVRyaWdnZXIsXG4gICAgTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXG59IGZyb20gJy4vYXV0b2NvbXBsZXRlLXRyaWdnZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1jQXV0b2NvbXBsZXRlIH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtNY09wdGlvbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgTWNDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY0F1dG9jb21wbGV0ZSxcbiAgICAgICAgTWNPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1jQXV0b2NvbXBsZXRlVHJpZ2dlcixcbiAgICAgICAgTWNBdXRvY29tcGxldGVPcmlnaW4sXG4gICAgICAgIE1jQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY0F1dG9jb21wbGV0ZSwgTWNBdXRvY29tcGxldGVUcmlnZ2VyLCBNY0F1dG9jb21wbGV0ZU9yaWdpbl0sXG4gICAgcHJvdmlkZXJzOiBbTUNfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBNY0F1dG9jb21wbGV0ZU1vZHVsZSB7fVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: input.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { McInput, McInputMono } from './input';
import { McNumberInput } from './input-number';
import { MaxValidator, MinValidator } from './input-number-validators';
var McInputModule = /** @class */ (function () {
    function McInputModule() {
    }
    McInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                    exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
                    declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
                },] }
    ];
    return McInputModule;
}());
export { McInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2lucHV0LyIsInNvdXJjZXMiOlsiaW5wdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHdkU7SUFBQTtJQUs0QixDQUFDOztnQkFMNUIsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQztvQkFDaEUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQztvQkFDMUUsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBRTtpQkFDbkY7O0lBQzJCLG9CQUFDO0NBQUEsQUFMN0IsSUFLNkI7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWNDb21tb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cbmltcG9ydCB7IE1jSW5wdXQsIE1jSW5wdXRNb25vIH0gZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgeyBNY051bWJlcklucHV0IH0gZnJvbSAnLi9pbnB1dC1udW1iZXInO1xuaW1wb3J0IHsgTWF4VmFsaWRhdG9yLCBNaW5WYWxpZGF0b3IgfSBmcm9tICcuL2lucHV0LW51bWJlci12YWxpZGF0b3JzJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEExMXlNb2R1bGUsIE1jQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gICAgZXhwb3J0czogW01jSW5wdXQsIE1jTnVtYmVySW5wdXQsIE1jSW5wdXRNb25vLCBNaW5WYWxpZGF0b3IsIE1heFZhbGlkYXRvcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNJbnB1dCwgTWNOdW1iZXJJbnB1dCwgTWNJbnB1dE1vbm8sIE1pblZhbGlkYXRvciwgTWF4VmFsaWRhdG9yIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNJbnB1dE1vZHVsZSB7fVxuIl19
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { McInput, McInputMono } from './input';
import { McNumberInput } from './input-number';
import { MaxValidator, MinValidator } from './input-number-validators';
import * as i0 from "@angular/core";
export class McInputModule {
}
/** @nocollapse */ /** @nocollapse */ McInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McInputModule, declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator], imports: [CommonModule, A11yModule, McCommonModule, FormsModule], exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator] });
/** @nocollapse */ /** @nocollapse */ McInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McInputModule, imports: [[CommonModule, A11yModule, McCommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                    exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
                    declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2lucHV0L2lucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFRdkUsTUFBTSxPQUFPLGFBQWE7O2dKQUFiLGFBQWE7aUpBQWIsYUFBYSxpQkFGUCxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxhQUZwRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxXQUFXLGFBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZO2lKQUdoRSxhQUFhLFlBSmIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUM7MkZBSXZELGFBQWE7a0JBTHpCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDO29CQUNoRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUMxRSxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFFO2lCQUNuRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWNDb21tb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cbmltcG9ydCB7IE1jSW5wdXQsIE1jSW5wdXRNb25vIH0gZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgeyBNY051bWJlcklucHV0IH0gZnJvbSAnLi9pbnB1dC1udW1iZXInO1xuaW1wb3J0IHsgTWF4VmFsaWRhdG9yLCBNaW5WYWxpZGF0b3IgfSBmcm9tICcuL2lucHV0LW51bWJlci12YWxpZGF0b3JzJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEExMXlNb2R1bGUsIE1jQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gICAgZXhwb3J0czogW01jSW5wdXQsIE1jTnVtYmVySW5wdXQsIE1jSW5wdXRNb25vLCBNaW5WYWxpZGF0b3IsIE1heFZhbGlkYXRvcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNJbnB1dCwgTWNOdW1iZXJJbnB1dCwgTWNJbnB1dE1vbm8sIE1pblZhbGlkYXRvciwgTWF4VmFsaWRhdG9yIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNJbnB1dE1vZHVsZSB7fVxuIl19
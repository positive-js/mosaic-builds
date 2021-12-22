import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McCleaner } from './cleaner';
import { McFormField, McFormFieldWithoutBorders } from './form-field';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
import * as i0 from "@angular/core";
export class McFormFieldModule {
}
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McFormFieldModule, declarations: [McFormField,
        McFormFieldWithoutBorders,
        McHint,
        McPrefix,
        McSuffix,
        McCleaner,
        McStepper], imports: [CommonModule, McIconModule], exports: [McFormField,
        McFormFieldWithoutBorders,
        McHint,
        McPrefix,
        McSuffix,
        McCleaner,
        McStepper] });
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McFormFieldModule, imports: [[CommonModule, McIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        McFormField,
                        McFormFieldWithoutBorders,
                        McHint,
                        McPrefix,
                        McSuffix,
                        McCleaner,
                        McStepper
                    ],
                    imports: [CommonModule, McIconModule],
                    exports: [
                        McFormField,
                        McFormFieldWithoutBorders,
                        McHint,
                        McPrefix,
                        McSuffix,
                        McCleaner,
                        McStepper
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBd0JwQyxNQUFNLE9BQU8saUJBQWlCOztvSkFBakIsaUJBQWlCO3FKQUFqQixpQkFBaUIsaUJBbkJ0QixXQUFXO1FBQ1gseUJBQXlCO1FBQ3pCLE1BQU07UUFDTixRQUFRO1FBQ1IsUUFBUTtRQUNSLFNBQVM7UUFDVCxTQUFTLGFBRUgsWUFBWSxFQUFFLFlBQVksYUFFaEMsV0FBVztRQUNYLHlCQUF5QjtRQUN6QixNQUFNO1FBQ04sUUFBUTtRQUNSLFFBQVE7UUFDUixTQUFTO1FBQ1QsU0FBUztxSkFHSixpQkFBaUIsWUFYakIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDOzJGQVc1QixpQkFBaUI7a0JBckI3QixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixXQUFXO3dCQUNYLHlCQUF5Qjt3QkFDekIsTUFBTTt3QkFDTixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsU0FBUzt3QkFDVCxTQUFTO3FCQUNaO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7b0JBQ3JDLE9BQU8sRUFBRTt3QkFDTCxXQUFXO3dCQUNYLHlCQUF5Qjt3QkFDekIsTUFBTTt3QkFDTixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsU0FBUzt3QkFDVCxTQUFTO3FCQUNaO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7IE1jQ2xlYW5lciB9IGZyb20gJy4vY2xlYW5lcic7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZCwgTWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycyB9IGZyb20gJy4vZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNY0hpbnQgfSBmcm9tICcuL2hpbnQnO1xuaW1wb3J0IHsgTWNQcmVmaXggfSBmcm9tICcuL3ByZWZpeCc7XG5pbXBvcnQgeyBNY1N0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXInO1xuaW1wb3J0IHsgTWNTdWZmaXggfSBmcm9tICcuL3N1ZmZpeCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNGb3JtRmllbGQsXG4gICAgICAgIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMsXG4gICAgICAgIE1jSGludCxcbiAgICAgICAgTWNQcmVmaXgsXG4gICAgICAgIE1jU3VmZml4LFxuICAgICAgICBNY0NsZWFuZXIsXG4gICAgICAgIE1jU3RlcHBlclxuICAgIF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWNJY29uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jRm9ybUZpZWxkLFxuICAgICAgICBNY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzLFxuICAgICAgICBNY0hpbnQsXG4gICAgICAgIE1jUHJlZml4LFxuICAgICAgICBNY1N1ZmZpeCxcbiAgICAgICAgTWNDbGVhbmVyLFxuICAgICAgICBNY1N0ZXBwZXJcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkTW9kdWxlIHtcbn1cbiJdfQ==
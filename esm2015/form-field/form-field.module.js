/**
 * @fileoverview added by tsickle
 * Generated from: form-field.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McCleaner } from './cleaner';
import { McFormField, McFormFieldWithoutBorders } from './form-field';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
export class McFormFieldModule {
}
McFormFieldModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvZm9ybS1maWVsZC8iLCJzb3VyY2VzIjpbImZvcm0tZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBd0JwQyxNQUFNLE9BQU8saUJBQWlCOzs7WUFyQjdCLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YsV0FBVztvQkFDWCx5QkFBeUI7b0JBQ3pCLE1BQU07b0JBQ04sUUFBUTtvQkFDUixRQUFRO29CQUNSLFNBQVM7b0JBQ1QsU0FBUztpQkFDWjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO2dCQUNyQyxPQUFPLEVBQUU7b0JBQ0wsV0FBVztvQkFDWCx5QkFBeUI7b0JBQ3pCLE1BQU07b0JBQ04sUUFBUTtvQkFDUixRQUFRO29CQUNSLFNBQVM7b0JBQ1QsU0FBUztpQkFDWjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7IE1jQ2xlYW5lciB9IGZyb20gJy4vY2xlYW5lcic7XG5pbXBvcnQgeyBNY0Zvcm1GaWVsZCwgTWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycyB9IGZyb20gJy4vZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNY0hpbnQgfSBmcm9tICcuL2hpbnQnO1xuaW1wb3J0IHsgTWNQcmVmaXggfSBmcm9tICcuL3ByZWZpeCc7XG5pbXBvcnQgeyBNY1N0ZXBwZXIgfSBmcm9tICcuL3N0ZXBwZXInO1xuaW1wb3J0IHsgTWNTdWZmaXggfSBmcm9tICcuL3N1ZmZpeCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNGb3JtRmllbGQsXG4gICAgICAgIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMsXG4gICAgICAgIE1jSGludCxcbiAgICAgICAgTWNQcmVmaXgsXG4gICAgICAgIE1jU3VmZml4LFxuICAgICAgICBNY0NsZWFuZXIsXG4gICAgICAgIE1jU3RlcHBlclxuICAgIF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWNJY29uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jRm9ybUZpZWxkLFxuICAgICAgICBNY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzLFxuICAgICAgICBNY0hpbnQsXG4gICAgICAgIE1jUHJlZml4LFxuICAgICAgICBNY1N1ZmZpeCxcbiAgICAgICAgTWNDbGVhbmVyLFxuICAgICAgICBNY1N0ZXBwZXJcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkTW9kdWxlIHtcbn1cbiJdfQ==
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McCleaner } from './cleaner';
import { McFormField, McFormFieldWithoutBorders } from './form-field';
import { McHint } from './hint';
import { McPasswordHint } from './password-hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
import * as i0 from "@angular/core";
export class McFormFieldModule {
}
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldModule, declarations: [McFormField,
        McFormFieldWithoutBorders,
        McHint,
        McPasswordHint,
        McPrefix,
        McSuffix,
        McCleaner,
        McStepper], imports: [CommonModule, McIconModule], exports: [McFormField,
        McFormFieldWithoutBorders,
        McHint,
        McPasswordHint,
        McPrefix,
        McSuffix,
        McCleaner,
        McStepper] });
/** @nocollapse */ /** @nocollapse */ McFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldModule, imports: [[CommonModule, McIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        McFormField,
                        McFormFieldWithoutBorders,
                        McHint,
                        McPasswordHint,
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
                        McPasswordHint,
                        McPrefix,
                        McSuffix,
                        McCleaner,
                        McStepper
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDOztBQTBCcEMsTUFBTSxPQUFPLGlCQUFpQjs7b0pBQWpCLGlCQUFpQjtxSkFBakIsaUJBQWlCLGlCQXJCdEIsV0FBVztRQUNYLHlCQUF5QjtRQUN6QixNQUFNO1FBQ04sY0FBYztRQUNkLFFBQVE7UUFDUixRQUFRO1FBQ1IsU0FBUztRQUNULFNBQVMsYUFFSCxZQUFZLEVBQUUsWUFBWSxhQUVoQyxXQUFXO1FBQ1gseUJBQXlCO1FBQ3pCLE1BQU07UUFDTixjQUFjO1FBQ2QsUUFBUTtRQUNSLFFBQVE7UUFDUixTQUFTO1FBQ1QsU0FBUztxSkFHSixpQkFBaUIsWUFaakIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDOzJGQVk1QixpQkFBaUI7a0JBdkI3QixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixXQUFXO3dCQUNYLHlCQUF5Qjt3QkFDekIsTUFBTTt3QkFDTixjQUFjO3dCQUNkLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixTQUFTO3dCQUNULFNBQVM7cUJBQ1o7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztvQkFDckMsT0FBTyxFQUFFO3dCQUNMLFdBQVc7d0JBQ1gseUJBQXlCO3dCQUN6QixNQUFNO3dCQUNOLGNBQWM7d0JBQ2QsUUFBUTt3QkFDUixRQUFRO3dCQUNSLFNBQVM7d0JBQ1QsU0FBUztxQkFDWjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5pbXBvcnQgeyBNY0NsZWFuZXIgfSBmcm9tICcuL2NsZWFuZXInO1xuaW1wb3J0IHsgTWNGb3JtRmllbGQsIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMgfSBmcm9tICcuL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNIaW50IH0gZnJvbSAnLi9oaW50JztcbmltcG9ydCB7IE1jUGFzc3dvcmRIaW50IH0gZnJvbSAnLi9wYXNzd29yZC1oaW50JztcbmltcG9ydCB7IE1jUHJlZml4IH0gZnJvbSAnLi9wcmVmaXgnO1xuaW1wb3J0IHsgTWNTdGVwcGVyIH0gZnJvbSAnLi9zdGVwcGVyJztcbmltcG9ydCB7IE1jU3VmZml4IH0gZnJvbSAnLi9zdWZmaXgnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jRm9ybUZpZWxkLFxuICAgICAgICBNY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzLFxuICAgICAgICBNY0hpbnQsXG4gICAgICAgIE1jUGFzc3dvcmRIaW50LFxuICAgICAgICBNY1ByZWZpeCxcbiAgICAgICAgTWNTdWZmaXgsXG4gICAgICAgIE1jQ2xlYW5lcixcbiAgICAgICAgTWNTdGVwcGVyXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNY0ljb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNGb3JtRmllbGQsXG4gICAgICAgIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMsXG4gICAgICAgIE1jSGludCxcbiAgICAgICAgTWNQYXNzd29yZEhpbnQsXG4gICAgICAgIE1jUHJlZml4LFxuICAgICAgICBNY1N1ZmZpeCxcbiAgICAgICAgTWNDbGVhbmVyLFxuICAgICAgICBNY1N0ZXBwZXJcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybUZpZWxkTW9kdWxlIHt9XG4iXX0=
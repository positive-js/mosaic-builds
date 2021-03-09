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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUF3QnBDLE1BQU0sT0FBTyxpQkFBaUI7OztZQXJCN0IsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVixXQUFXO29CQUNYLHlCQUF5QjtvQkFDekIsTUFBTTtvQkFDTixRQUFRO29CQUNSLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxTQUFTO2lCQUNaO2dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRTtvQkFDTCxXQUFXO29CQUNYLHlCQUF5QjtvQkFDekIsTUFBTTtvQkFDTixRQUFRO29CQUNSLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxTQUFTO2lCQUNaO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHsgTWNDbGVhbmVyIH0gZnJvbSAnLi9jbGVhbmVyJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkLCBNY0Zvcm1GaWVsZFdpdGhvdXRCb3JkZXJzIH0gZnJvbSAnLi9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1jSGludCB9IGZyb20gJy4vaGludCc7XG5pbXBvcnQgeyBNY1ByZWZpeCB9IGZyb20gJy4vcHJlZml4JztcbmltcG9ydCB7IE1jU3RlcHBlciB9IGZyb20gJy4vc3RlcHBlcic7XG5pbXBvcnQgeyBNY1N1ZmZpeCB9IGZyb20gJy4vc3VmZml4JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY0Zvcm1GaWVsZCxcbiAgICAgICAgTWNGb3JtRmllbGRXaXRob3V0Qm9yZGVycyxcbiAgICAgICAgTWNIaW50LFxuICAgICAgICBNY1ByZWZpeCxcbiAgICAgICAgTWNTdWZmaXgsXG4gICAgICAgIE1jQ2xlYW5lcixcbiAgICAgICAgTWNTdGVwcGVyXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNY0ljb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNGb3JtRmllbGQsXG4gICAgICAgIE1jRm9ybUZpZWxkV2l0aG91dEJvcmRlcnMsXG4gICAgICAgIE1jSGludCxcbiAgICAgICAgTWNQcmVmaXgsXG4gICAgICAgIE1jU3VmZml4LFxuICAgICAgICBNY0NsZWFuZXIsXG4gICAgICAgIE1jU3RlcHBlclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRmllbGRNb2R1bGUge1xufVxuIl19
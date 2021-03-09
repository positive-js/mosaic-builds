import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIcon, McIconCSSStyler } from './icon.component';
export class McIconModule {
}
McIconModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule
                ],
                exports: [
                    McIcon,
                    McIconCSSStyler
                ],
                declarations: [
                    McIcon,
                    McIconCSSStyler
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvaWNvbi9pY29uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFDSCxNQUFNLEVBQ04sZUFBZSxFQUNsQixNQUFNLGtCQUFrQixDQUFDO0FBa0IxQixNQUFNLE9BQU8sWUFBWTs7O1lBZnhCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixVQUFVO29CQUNWLGNBQWM7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxNQUFNO29CQUNOLGVBQWU7aUJBQ2xCO2dCQUNELFlBQVksRUFBRTtvQkFDVixNQUFNO29CQUNOLGVBQWU7aUJBQ2xCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgTWNJY29uLFxuICAgIE1jSWNvbkNTU1N0eWxlclxufSBmcm9tICcuL2ljb24uY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBQbGF0Zm9ybU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY0ljb24sXG4gICAgICAgIE1jSWNvbkNTU1N0eWxlclxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jSWNvbixcbiAgICAgICAgTWNJY29uQ1NTU3R5bGVyXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY0ljb25Nb2R1bGUge31cbiJdfQ==
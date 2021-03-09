import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McProgressBar } from './progress-bar.component';
export class McProgressBarModule {
}
McProgressBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    PlatformModule
                ],
                exports: [
                    McProgressBar
                ],
                declarations: [
                    McProgressBar
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wcm9ncmVzcy1iYXIvcHJvZ3Jlc3MtYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUNILGFBQWEsRUFDaEIsTUFBTSwwQkFBMEIsQ0FBQztBQWVsQyxNQUFNLE9BQU8sbUJBQW1COzs7WUFaL0IsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGNBQWM7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxhQUFhO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsYUFBYTtpQkFDaEI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIE1jUHJvZ3Jlc3NCYXJcbn0gZnJvbSAnLi9wcm9ncmVzcy1iYXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBQbGF0Zm9ybU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY1Byb2dyZXNzQmFyXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNQcm9ncmVzc0JhclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNQcm9ncmVzc0Jhck1vZHVsZSB7fVxuIl19
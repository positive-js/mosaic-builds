import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McGutterDirective, McSplitterAreaDirective, McSplitterComponent } from './splitter.component';
export class McSplitterModule {
}
McSplitterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    McIconModule
                ],
                exports: [
                    McGutterDirective,
                    McSplitterAreaDirective,
                    McSplitterComponent
                ],
                declarations: [
                    McGutterDirective,
                    McSplitterAreaDirective,
                    McSplitterComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3NwbGl0dGVyL3NwbGl0dGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFtQnZHLE1BQU0sT0FBTyxnQkFBZ0I7OztZQWhCNUIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFlBQVk7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2QixtQkFBbUI7aUJBQ3RCO2dCQUNELFlBQVksRUFBRTtvQkFDVixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsbUJBQW1CO2lCQUN0QjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7IE1jR3V0dGVyRGlyZWN0aXZlLCBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSwgTWNTcGxpdHRlckNvbXBvbmVudCB9IGZyb20gJy4vc3BsaXR0ZXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNHdXR0ZXJEaXJlY3RpdmUsXG4gICAgICAgIE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlLFxuICAgICAgICBNY1NwbGl0dGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNHdXR0ZXJEaXJlY3RpdmUsXG4gICAgICAgIE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlLFxuICAgICAgICBNY1NwbGl0dGVyQ29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1NwbGl0dGVyTW9kdWxlIHtcbn1cbiJdfQ==
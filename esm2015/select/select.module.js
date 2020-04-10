/**
 * @fileoverview added by tsickle
 * Generated from: select.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MC_SELECT_SCROLL_STRATEGY_PROVIDER, McOptionModule } from '@ptsecurity/mosaic/core';
import { McFormFieldModule } from '@ptsecurity/mosaic/form-field';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McTagsModule } from '@ptsecurity/mosaic/tags';
import { McSelect, McSelectSearch, McSelectSearchEmptyResult, McSelectTrigger } from './select.component';
export class McSelectModule {
}
McSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    McOptionModule,
                    McIconModule,
                    McTagsModule
                ],
                exports: [
                    McFormFieldModule,
                    McSelect,
                    McSelectSearch,
                    McSelectSearchEmptyResult,
                    McSelectTrigger,
                    McOptionModule,
                    CommonModule
                ],
                declarations: [
                    McSelect,
                    McSelectSearch,
                    McSelectSearchEmptyResult,
                    McSelectTrigger
                ],
                providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9zZWxlY3QvIiwic291cmNlcyI6WyJzZWxlY3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBMkIxRyxNQUFNLE9BQU8sY0FBYzs7O1lBeEIxQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixjQUFjO29CQUNkLFlBQVk7b0JBQ1osWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsaUJBQWlCO29CQUNqQixRQUFRO29CQUNSLGNBQWM7b0JBQ2QseUJBQXlCO29CQUN6QixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsWUFBWTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsUUFBUTtvQkFDUixjQUFjO29CQUNkLHlCQUF5QjtvQkFDekIsZUFBZTtpQkFBQztnQkFDcEIsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLCBNY09wdGlvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgTWNUYWdzTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3RhZ3MnO1xuXG5pbXBvcnQgeyBNY1NlbGVjdCwgTWNTZWxlY3RTZWFyY2gsIE1jU2VsZWN0U2VhcmNoRW1wdHlSZXN1bHQsIE1jU2VsZWN0VHJpZ2dlciB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgTWNPcHRpb25Nb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZSxcbiAgICAgICAgTWNUYWdzTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jRm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNY1NlbGVjdCxcbiAgICAgICAgTWNTZWxlY3RTZWFyY2gsXG4gICAgICAgIE1jU2VsZWN0U2VhcmNoRW1wdHlSZXN1bHQsXG4gICAgICAgIE1jU2VsZWN0VHJpZ2dlcixcbiAgICAgICAgTWNPcHRpb25Nb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jU2VsZWN0LFxuICAgICAgICBNY1NlbGVjdFNlYXJjaCxcbiAgICAgICAgTWNTZWxlY3RTZWFyY2hFbXB0eVJlc3VsdCxcbiAgICAgICAgTWNTZWxlY3RUcmlnZ2VyXSxcbiAgICBwcm92aWRlcnM6IFtNQ19TRUxFQ1RfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBNY1NlbGVjdE1vZHVsZSB7fVxuIl19
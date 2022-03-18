import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McGutterDirective, McGutterGhostDirective, McSplitterAreaDirective, McSplitterComponent } from './splitter.component';
import * as i0 from "@angular/core";
export class McSplitterModule {
}
/** @nocollapse */ /** @nocollapse */ McSplitterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McSplitterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSplitterModule, declarations: [McGutterDirective,
        McGutterGhostDirective,
        McSplitterAreaDirective,
        McSplitterComponent], imports: [CommonModule,
        McIconModule], exports: [McGutterDirective,
        McSplitterAreaDirective,
        McSplitterComponent] });
/** @nocollapse */ /** @nocollapse */ McSplitterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSplitterModule, imports: [[
            CommonModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSplitterModule, decorators: [{
            type: NgModule,
            args: [{
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
                        McGutterGhostDirective,
                        McSplitterAreaDirective,
                        McSplitterComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3NwbGl0dGVyL3NwbGl0dGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUNILGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLG1CQUFtQixFQUN0QixNQUFNLHNCQUFzQixDQUFDOztBQW9COUIsTUFBTSxPQUFPLGdCQUFnQjs7bUpBQWhCLGdCQUFnQjtvSkFBaEIsZ0JBQWdCLGlCQU5yQixpQkFBaUI7UUFDakIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2QixtQkFBbUIsYUFabkIsWUFBWTtRQUNaLFlBQVksYUFHWixpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLG1CQUFtQjtvSkFTZCxnQkFBZ0IsWUFoQmhCO1lBQ0wsWUFBWTtZQUNaLFlBQVk7U0FDZjsyRkFhUSxnQkFBZ0I7a0JBakI1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFlBQVk7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2QixtQkFBbUI7cUJBQ3RCO29CQUNELFlBQVksRUFBRTt3QkFDVixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsdUJBQXVCO3dCQUN2QixtQkFBbUI7cUJBQ3RCO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7XG4gICAgTWNHdXR0ZXJEaXJlY3RpdmUsXG4gICAgTWNHdXR0ZXJHaG9zdERpcmVjdGl2ZSxcbiAgICBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSxcbiAgICBNY1NwbGl0dGVyQ29tcG9uZW50XG59IGZyb20gJy4vc3BsaXR0ZXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNHdXR0ZXJEaXJlY3RpdmUsXG4gICAgICAgIE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlLFxuICAgICAgICBNY1NwbGl0dGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNHdXR0ZXJEaXJlY3RpdmUsXG4gICAgICAgIE1jR3V0dGVyR2hvc3REaXJlY3RpdmUsXG4gICAgICAgIE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlLFxuICAgICAgICBNY1NwbGl0dGVyQ29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1NwbGl0dGVyTW9kdWxlIHtcbn1cbiJdfQ==
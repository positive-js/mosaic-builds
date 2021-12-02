import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McButton, McAnchor, McButtonCssStyler } from './button.component';
import * as i0 from "@angular/core";
export class McButtonModule {
}
/** @nocollapse */ McButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonModule, declarations: [McButton,
        McAnchor,
        McButtonCssStyler], imports: [CommonModule,
        A11yModule,
        PlatformModule], exports: [McButton,
        McAnchor,
        McButtonCssStyler] });
/** @nocollapse */ McButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [
                        McButton,
                        McAnchor,
                        McButtonCssStyler
                    ],
                    declarations: [
                        McButton,
                        McAnchor,
                        McButtonCssStyler
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9idXR0b24vYnV0dG9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFDSCxRQUFRLEVBQ1IsUUFBUSxFQUNSLGlCQUFpQixFQUNwQixNQUFNLG9CQUFvQixDQUFDOztBQW9CNUIsTUFBTSxPQUFPLGNBQWM7OytIQUFkLGNBQWM7Z0lBQWQsY0FBYyxpQkFMbkIsUUFBUTtRQUNSLFFBQVE7UUFDUixpQkFBaUIsYUFaakIsWUFBWTtRQUNaLFVBQVU7UUFDVixjQUFjLGFBR2QsUUFBUTtRQUNSLFFBQVE7UUFDUixpQkFBaUI7Z0lBUVosY0FBYyxZQWhCZDtZQUNMLFlBQVk7WUFDWixVQUFVO1lBQ1YsY0FBYztTQUNqQjs0RkFZUSxjQUFjO2tCQWpCMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGNBQWM7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsaUJBQWlCO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsUUFBUTt3QkFDUixRQUFRO3dCQUNSLGlCQUFpQjtxQkFDcEI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgTWNCdXR0b24sXG4gICAgTWNBbmNob3IsXG4gICAgTWNCdXR0b25Dc3NTdHlsZXJcbn0gZnJvbSAnLi9idXR0b24uY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBQbGF0Zm9ybU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY0J1dHRvbixcbiAgICAgICAgTWNBbmNob3IsXG4gICAgICAgIE1jQnV0dG9uQ3NzU3R5bGVyXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNCdXR0b24sXG4gICAgICAgIE1jQW5jaG9yLFxuICAgICAgICBNY0J1dHRvbkNzc1N0eWxlclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNCdXR0b25Nb2R1bGUge31cbiJdfQ==
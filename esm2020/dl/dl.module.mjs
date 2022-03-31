import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McDlComponent, McDtComponent, McDdComponent } from './dl.component';
import * as i0 from "@angular/core";
export class McDlModule {
}
/** @nocollapse */ /** @nocollapse */ McDlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McDlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlModule, declarations: [McDlComponent,
        McDtComponent,
        McDdComponent], imports: [CommonModule,
        A11yModule,
        PlatformModule], exports: [McDlComponent,
        McDtComponent,
        McDdComponent] });
/** @nocollapse */ /** @nocollapse */ McDlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [
                        McDlComponent,
                        McDtComponent,
                        McDdComponent
                    ],
                    declarations: [
                        McDlComponent,
                        McDtComponent,
                        McDdComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RsL2RsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFDSCxhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDaEIsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFvQnhCLE1BQU0sT0FBTyxVQUFVOzs2SUFBVixVQUFVOzhJQUFWLFVBQVUsaUJBTGYsYUFBYTtRQUNiLGFBQWE7UUFDYixhQUFhLGFBWmIsWUFBWTtRQUNaLFVBQVU7UUFDVixjQUFjLGFBR2QsYUFBYTtRQUNiLGFBQWE7UUFDYixhQUFhOzhJQVFSLFVBQVUsWUFoQlY7WUFDTCxZQUFZO1lBQ1osVUFBVTtZQUNWLGNBQWM7U0FDakI7MkZBWVEsVUFBVTtrQkFqQnRCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixjQUFjO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGFBQWE7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDVixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsYUFBYTtxQkFDaEI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgTWNEbENvbXBvbmVudCxcbiAgICBNY0R0Q29tcG9uZW50LFxuICAgIE1jRGRDb21wb25lbnRcbn0gZnJvbSAnLi9kbC5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEExMXlNb2R1bGUsXG4gICAgICAgIFBsYXRmb3JtTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jRGxDb21wb25lbnQsXG4gICAgICAgIE1jRHRDb21wb25lbnQsXG4gICAgICAgIE1jRGRDb21wb25lbnRcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY0RsQ29tcG9uZW50LFxuICAgICAgICBNY0R0Q29tcG9uZW50LFxuICAgICAgICBNY0RkQ29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY0RsTW9kdWxlIHt9XG4iXX0=
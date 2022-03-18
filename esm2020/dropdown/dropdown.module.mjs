import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McDropdownContent } from './dropdown-content.directive';
import { McDropdownItem } from './dropdown-item.component';
import { MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER, McDropdownTrigger } from './dropdown-trigger.directive';
import { McDropdown } from './dropdown.component';
import * as i0 from "@angular/core";
export class McDropdownModule {
}
/** @nocollapse */ /** @nocollapse */ McDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDropdownModule, declarations: [McDropdown,
        McDropdownItem,
        McDropdownTrigger,
        McDropdownContent], imports: [CommonModule,
        OverlayModule,
        McIconModule], exports: [McDropdown,
        McDropdownItem,
        McDropdownTrigger,
        McDropdownContent] });
/** @nocollapse */ /** @nocollapse */ McDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDropdownModule, providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[
            CommonModule,
            OverlayModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        McIconModule
                    ],
                    exports: [
                        McDropdown,
                        McDropdownItem,
                        McDropdownTrigger,
                        McDropdownContent
                    ],
                    declarations: [
                        McDropdown,
                        McDropdownItem,
                        McDropdownTrigger,
                        McDropdownContent
                    ],
                    providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNENBQTRDLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBdUJsRCxNQUFNLE9BQU8sZ0JBQWdCOzttSkFBaEIsZ0JBQWdCO29KQUFoQixnQkFBZ0IsaUJBUHJCLFVBQVU7UUFDVixjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLGlCQUFpQixhQWRqQixZQUFZO1FBQ1osYUFBYTtRQUNiLFlBQVksYUFHWixVQUFVO1FBQ1YsY0FBYztRQUNkLGlCQUFpQjtRQUNqQixpQkFBaUI7b0pBVVosZ0JBQWdCLGFBRmQsQ0FBQyw0Q0FBNEMsQ0FBQyxZQWpCaEQ7WUFDTCxZQUFZO1lBQ1osYUFBYTtZQUNiLFlBQVk7U0FDZjsyRkFlUSxnQkFBZ0I7a0JBcEI1QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsWUFBWTtxQkFDZjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsVUFBVTt3QkFDVixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsaUJBQWlCO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsVUFBVTt3QkFDVixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsaUJBQWlCO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztpQkFDNUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7IE1jRHJvcGRvd25Db250ZW50IH0gZnJvbSAnLi9kcm9wZG93bi1jb250ZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duSXRlbSB9IGZyb20gJy4vZHJvcGRvd24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIsIE1jRHJvcGRvd25UcmlnZ2VyIH0gZnJvbSAnLi9kcm9wZG93bi10cmlnZ2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duIH0gZnJvbSAnLi9kcm9wZG93bi5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY0Ryb3Bkb3duLFxuICAgICAgICBNY0Ryb3Bkb3duSXRlbSxcbiAgICAgICAgTWNEcm9wZG93blRyaWdnZXIsXG4gICAgICAgIE1jRHJvcGRvd25Db250ZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNEcm9wZG93bixcbiAgICAgICAgTWNEcm9wZG93bkl0ZW0sXG4gICAgICAgIE1jRHJvcGRvd25UcmlnZ2VyLFxuICAgICAgICBNY0Ryb3Bkb3duQ29udGVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbTUNfRFJPUERPV05fU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25Nb2R1bGUge31cbiJdfQ==
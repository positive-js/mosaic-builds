import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McPseudoCheckboxModule } from '../selection/index';
import { McOptionActionComponent } from './action';
import { McOptgroup } from './optgroup';
import { McOption } from './option';
import * as i0 from "@angular/core";
export class McOptionModule {
}
/** @nocollapse */ /** @nocollapse */ McOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McOptionModule, declarations: [McOption, McOptgroup, McOptionActionComponent], imports: [CommonModule, McPseudoCheckboxModule], exports: [McOption, McOptgroup, McOptionActionComponent] });
/** @nocollapse */ /** @nocollapse */ McOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McOptionModule, imports: [[CommonModule, McPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, McPseudoCheckboxModule],
                    declarations: [McOption, McOptgroup, McOptionActionComponent],
                    exports: [McOption, McOptgroup, McOptionActionComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jb3JlL29wdGlvbi9vcHRpb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBUXBDLE1BQU0sT0FBTyxjQUFjOztpSkFBZCxjQUFjO2tKQUFkLGNBQWMsaUJBSFIsUUFBUSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsYUFEbEQsWUFBWSxFQUFFLHNCQUFzQixhQUVwQyxRQUFRLEVBQUUsVUFBVSxFQUFFLHVCQUF1QjtrSkFFOUMsY0FBYyxZQUpkLENBQUMsWUFBWSxFQUFFLHNCQUFzQixDQUFDOzJGQUl0QyxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxzQkFBc0IsQ0FBQztvQkFDL0MsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsQ0FBQztvQkFDN0QsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsQ0FBQztpQkFDM0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdGlvbi9pbmRleCc7XG5cbmltcG9ydCB7IE1jT3B0aW9uQWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9hY3Rpb24nO1xuaW1wb3J0IHsgTWNPcHRncm91cCB9IGZyb20gJy4vb3B0Z3JvdXAnO1xuaW1wb3J0IHsgTWNPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNY1BzZXVkb0NoZWNrYm94TW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY09wdGlvbiwgTWNPcHRncm91cCwgTWNPcHRpb25BY3Rpb25Db21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtNY09wdGlvbiwgTWNPcHRncm91cCwgTWNPcHRpb25BY3Rpb25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1jT3B0aW9uTW9kdWxlIHt9XG4iXX0=
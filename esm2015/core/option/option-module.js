import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McPseudoCheckboxModule } from '../selection/index';
import { McOptgroup } from './optgroup';
import { McOption } from './option';
import * as i0 from "@angular/core";
export class McOptionModule {
}
/** @nocollapse */ McOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McOptionModule, declarations: [McOption, McOptgroup], imports: [CommonModule, McPseudoCheckboxModule], exports: [McOption, McOptgroup] });
/** @nocollapse */ McOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McOptionModule, imports: [[CommonModule, McPseudoCheckboxModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, McPseudoCheckboxModule],
                    exports: [McOption, McOptgroup],
                    declarations: [McOption, McOptgroup]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jb3JlL29wdGlvbi9vcHRpb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUFRcEMsTUFBTSxPQUFPLGNBQWM7OzhIQUFkLGNBQWM7K0hBQWQsY0FBYyxpQkFGUixRQUFRLEVBQUUsVUFBVSxhQUZ6QixZQUFZLEVBQUUsc0JBQXNCLGFBQ3BDLFFBQVEsRUFBRSxVQUFVOytIQUdyQixjQUFjLFlBSmQsQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUM7MkZBSXRDLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLHNCQUFzQixDQUFDO29CQUMvQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO29CQUMvQixZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO2lCQUN2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1BzZXVkb0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vc2VsZWN0aW9uL2luZGV4JztcblxuaW1wb3J0IHsgTWNPcHRncm91cCB9IGZyb20gJy4vb3B0Z3JvdXAnO1xuaW1wb3J0IHsgTWNPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNY1BzZXVkb0NoZWNrYm94TW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWNPcHRpb24sIE1jT3B0Z3JvdXBdLFxuICAgIGRlY2xhcmF0aW9uczogW01jT3B0aW9uLCBNY09wdGdyb3VwXVxufSlcbmV4cG9ydCBjbGFzcyBNY09wdGlvbk1vZHVsZSB7fVxuIl19
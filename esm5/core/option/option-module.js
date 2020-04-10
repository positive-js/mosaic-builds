/**
 * @fileoverview added by tsickle
 * Generated from: option/option-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McPseudoCheckboxModule } from '../selection/index';
import { McOptgroup } from './optgroup';
import { McOption } from './option';
var McOptionModule = /** @class */ (function () {
    function McOptionModule() {
    }
    McOptionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, McPseudoCheckboxModule],
                    exports: [McOption, McOptgroup],
                    declarations: [McOption, McOptgroup]
                },] }
    ];
    return McOptionModule;
}());
export { McOptionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsib3B0aW9uL29wdGlvbi1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHcEM7SUFBQTtJQUs2QixDQUFDOztnQkFMN0IsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxzQkFBc0IsQ0FBQztvQkFDL0MsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztvQkFDL0IsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztpQkFDdkM7O0lBQzRCLHFCQUFDO0NBQUEsQUFMOUIsSUFLOEI7U0FBakIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1BzZXVkb0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vc2VsZWN0aW9uL2luZGV4JztcblxuaW1wb3J0IHsgTWNPcHRncm91cCB9IGZyb20gJy4vb3B0Z3JvdXAnO1xuaW1wb3J0IHsgTWNPcHRpb24gfSBmcm9tICcuL29wdGlvbic7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNY1BzZXVkb0NoZWNrYm94TW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWNPcHRpb24sIE1jT3B0Z3JvdXBdLFxuICAgIGRlY2xhcmF0aW9uczogW01jT3B0aW9uLCBNY09wdGdyb3VwXVxufSlcbmV4cG9ydCBjbGFzcyBNY09wdGlvbk1vZHVsZSB7fVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: tree.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@ptsecurity/cdk/tree';
import { McPseudoCheckboxModule } from '@ptsecurity/mosaic/core';
import { McTreeNodeDef } from './node.directive';
import { McTreeNodePadding } from './padding.directive';
import { McTreeNodeToggleDirective, McTreeNodeToggleComponent } from './toggle';
import { McTreeOption } from './tree-option.component';
import { McTreeSelection } from './tree-selection.component';
/** @type {?} */
var MC_TREE_DIRECTIVES = [
    McTreeSelection,
    McTreeOption,
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeNodeToggleComponent,
    McTreeNodeToggleDirective
];
var McTreeModule = /** @class */ (function () {
    function McTreeModule() {
    }
    McTreeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTreeModule, McPseudoCheckboxModule],
                    exports: MC_TREE_DIRECTIVES,
                    declarations: MC_TREE_DIRECTIVES
                },] }
    ];
    return McTreeModule;
}());
export { McTreeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUFHdkQsa0JBQWtCLEdBQUc7SUFDdkIsZUFBZTtJQUNmLFlBQVk7SUFDWixhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6Qix5QkFBeUI7Q0FDNUI7QUFFRDtJQUFBO0lBSzJCLENBQUM7O2dCQUwzQixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxzQkFBc0IsQ0FBQztvQkFDOUQsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsWUFBWSxFQUFFLGtCQUFrQjtpQkFDbkM7O0lBQzBCLG1CQUFDO0NBQUEsQUFMNUIsSUFLNEI7U0FBZixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNUcmVlTm9kZURlZiB9IGZyb20gJy4vbm9kZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNUcmVlTm9kZVBhZGRpbmcgfSBmcm9tICcuL3BhZGRpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1jVHJlZU5vZGVUb2dnbGVEaXJlY3RpdmUsIE1jVHJlZU5vZGVUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL3RvZ2dsZSc7XG5pbXBvcnQgeyBNY1RyZWVPcHRpb24gfSBmcm9tICcuL3RyZWUtb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RyZWVTZWxlY3Rpb24gfSBmcm9tICcuL3RyZWUtc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5cblxuY29uc3QgTUNfVFJFRV9ESVJFQ1RJVkVTID0gW1xuICAgIE1jVHJlZVNlbGVjdGlvbixcbiAgICBNY1RyZWVPcHRpb24sXG4gICAgTWNUcmVlTm9kZURlZixcbiAgICBNY1RyZWVOb2RlUGFkZGluZyxcbiAgICBNY1RyZWVOb2RlVG9nZ2xlQ29tcG9uZW50LFxuICAgIE1jVHJlZU5vZGVUb2dnbGVEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2RrVHJlZU1vZHVsZSwgTWNQc2V1ZG9DaGVja2JveE1vZHVsZV0sXG4gICAgZXhwb3J0czogTUNfVFJFRV9ESVJFQ1RJVkVTLFxuICAgIGRlY2xhcmF0aW9uczogTUNfVFJFRV9ESVJFQ1RJVkVTXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU1vZHVsZSB7fVxuIl19
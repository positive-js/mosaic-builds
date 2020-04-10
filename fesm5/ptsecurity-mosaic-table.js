import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McTable = /** @class */ (function () {
    function McTable() {
    }
    McTable.decorators = [
        { type: Directive, args: [{
                    selector: 'table[mc-table]',
                    host: {
                        class: 'mc-table'
                    }
                },] }
    ];
    return McTable;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: table.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McTableModule = /** @class */ (function () {
    function McTableModule() {
    }
    McTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [McTable],
                    declarations: [McTable]
                },] }
    ];
    return McTableModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-table.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McTable, McTableModule };
//# sourceMappingURL=ptsecurity-mosaic-table.js.map

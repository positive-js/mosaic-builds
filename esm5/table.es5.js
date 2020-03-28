/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
    ];
    return McTable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] },
    ];
    return McTableModule;
}());

export { McTable, McTableModule };
//# sourceMappingURL=table.es5.js.map

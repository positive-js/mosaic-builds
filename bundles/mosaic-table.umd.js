/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/table', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.table = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core));
}(this, (function (exports, a11y, platform, common, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McTable = /** @class */ (function () {
        function McTable() {
        }
        McTable.decorators = [
            { type: core.Directive, args: [{
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            a11y.A11yModule,
                            platform.PlatformModule
                        ],
                        exports: [McTable],
                        declarations: [McTable]
                    },] },
        ];
        return McTableModule;
    }());

    exports.McTable = McTable;
    exports.McTableModule = McTableModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-table.umd.js.map

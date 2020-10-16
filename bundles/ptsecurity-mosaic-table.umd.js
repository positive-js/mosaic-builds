(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/table', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.table = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core));
}(this, (function (exports, a11y, platform, common, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: table.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McTable = /** @class */ (function () {
        function McTable() {
        }
        return McTable;
    }());
    McTable.decorators = [
        { type: core.Directive, args: [{
                    selector: 'table[mc-table]',
                    host: {
                        class: 'mc-table'
                    }
                },] }
    ];

    /**
     * @fileoverview added by tsickle
     * Generated from: table.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McTableModule = /** @class */ (function () {
        function McTableModule() {
        }
        return McTableModule;
    }());
    McTableModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        a11y.A11yModule,
                        platform.PlatformModule
                    ],
                    exports: [McTable],
                    declarations: [McTable]
                },] }
    ];

    /**
     * @fileoverview added by tsickle
     * Generated from: public-api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: ptsecurity-mosaic-table.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.McTable = McTable;
    exports.McTableModule = McTableModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-table.umd.js.map

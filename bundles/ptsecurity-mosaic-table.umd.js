(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core')) :
        typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/table', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.table = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core));
}(this, (function (exports, a11y, platform, common, i0) { 'use strict';

        function _interopNamespace(e) {
                if (e && e.__esModule) return e;
                var n = Object.create(null);
                if (e) {
                        Object.keys(e).forEach(function (k) {
                                if (k !== 'default') {
                                        var d = Object.getOwnPropertyDescriptor(e, k);
                                        Object.defineProperty(n, k, d.get ? d : {
                                                enumerable: true,
                                                get: function () {
                                                        return e[k];
                                                }
                                        });
                                }
                        });
                }
                n['default'] = e;
                return Object.freeze(n);
        }

        var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

        var McTable = /** @class */ (function () {
            function McTable() {
            }
            return McTable;
        }());
        /** @nocollapse */ McTable.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTable, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
        /** @nocollapse */ McTable.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTable, selector: "table[mc-table]", host: { classAttribute: "mc-table" }, ngImport: i0__namespace });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTable, decorators: [{
                    type: i0.Directive,
                    args: [{
                            selector: 'table[mc-table]',
                            host: {
                                class: 'mc-table'
                            }
                        }]
                }] });

        var McTableModule = /** @class */ (function () {
            function McTableModule() {
            }
            return McTableModule;
        }());
        /** @nocollapse */ McTableModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTableModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
        /** @nocollapse */ McTableModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTableModule, declarations: [McTable], imports: [common.CommonModule,
                a11y.A11yModule,
                platform.PlatformModule], exports: [McTable] });
        /** @nocollapse */ McTableModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTableModule, imports: [[
                    common.CommonModule,
                    a11y.A11yModule,
                    platform.PlatformModule
                ]] });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McTableModule, decorators: [{
                    type: i0.NgModule,
                    args: [{
                            imports: [
                                common.CommonModule,
                                a11y.A11yModule,
                                platform.PlatformModule
                            ],
                            exports: [McTable],
                            declarations: [McTable]
                        }]
                }] });

        /**
         * Generated bundle index. Do not edit.
         */

        exports.McTable = McTable;
        exports.McTableModule = McTableModule;

        Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-table.umd.js.map

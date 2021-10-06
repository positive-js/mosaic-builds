(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/divider', ['exports', '@angular/cdk/coercion', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.divider = {}), global.ng.cdk.coercion, global.ng.core, global.ng.common));
}(this, (function (exports, coercion, i0, common) { 'use strict';

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

    var McDivider = /** @class */ (function () {
        function McDivider() {
            this._vertical = false;
            this._inset = false;
        }
        Object.defineProperty(McDivider.prototype, "vertical", {
            // Whether the divider is vertically aligned.
            get: function () {
                return this._vertical;
            },
            set: function (value) {
                this._vertical = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDivider.prototype, "inset", {
            // Whether the divider is an inset divider.
            get: function () {
                return this._inset;
            },
            set: function (value) {
                this._inset = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        return McDivider;
    }());
    /** @nocollapse */ McDivider.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McDivider, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McDivider.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McDivider, selector: "mc-divider", inputs: { vertical: "vertical", inset: "inset" }, host: { properties: { "class.mc-divider_vertical": "vertical", "class.mc-divider_horizontal": "!vertical", "class.mc-divider_inset": "inset" }, classAttribute: "mc-divider" }, ngImport: i0__namespace, template: '', isInline: true, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}\n"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McDivider, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-divider',
                        host: {
                            class: 'mc-divider',
                            '[class.mc-divider_vertical]': 'vertical',
                            '[class.mc-divider_horizontal]': '!vertical',
                            '[class.mc-divider_inset]': 'inset'
                        },
                        template: '',
                        styleUrls: ['divider.scss'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], propDecorators: { vertical: [{
                    type: i0.Input
                }], inset: [{
                    type: i0.Input
                }] } });

    var McDividerModule = /** @class */ (function () {
        function McDividerModule() {
        }
        return McDividerModule;
    }());
    /** @nocollapse */ McDividerModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McDividerModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McDividerModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McDividerModule, declarations: [McDivider], imports: [common.CommonModule], exports: [McDivider] });
    /** @nocollapse */ McDividerModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McDividerModule, imports: [[common.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McDividerModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        exports: [McDivider],
                        declarations: [McDivider]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.McDivider = McDivider;
    exports.McDividerModule = McDividerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-divider.umd.js.map

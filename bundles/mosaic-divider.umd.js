/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/divider', ['exports', '@angular/core', '@ptsecurity/mosaic/core', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.divider = {}),global.ng.core,global.ng.mosaic.core,global.ng.common));
}(this, (function (exports,core,core$1,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McDivider = /** @class */ (function () {
    function McDivider() {
        this._vertical = false;
        this._inset = false;
    }
    Object.defineProperty(McDivider.prototype, "vertical", {
        get: /**
         * @return {?}
         */
        function () {
            return this._vertical;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._vertical = core$1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDivider.prototype, "inset", {
        get: /**
         * @return {?}
         */
        function () {
            return this._inset;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._inset = core$1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    McDivider.decorators = [
        { type: core.Component, args: [{selector: 'mc-divider',
                    host: {
                        class: 'mc-divider',
                        role: 'separator',
                        '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                        '[class.mc-divider-vertical]': 'vertical',
                        '[class.mc-divider-inset]': 'inset'
                    },
                    template: '',
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}"],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                },] },
    ];
    /** @nocollapse */
    McDivider.propDecorators = {
        "vertical": [{ type: core.Input },],
        "inset": [{ type: core.Input },],
    };
    return McDivider;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McDividerModule = /** @class */ (function () {
    function McDividerModule() {
    }
    McDividerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        core$1.McCommonModule,
                        common.CommonModule
                    ],
                    exports: [
                        McDivider,
                        core$1.McCommonModule
                    ],
                    declarations: [
                        McDivider
                    ]
                },] },
    ];
    return McDividerModule;
}());

exports.McDivider = McDivider;
exports.McDividerModule = McDividerModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-divider.umd.js.map

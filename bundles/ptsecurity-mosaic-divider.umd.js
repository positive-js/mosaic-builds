(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/divider', ['exports', '@angular/cdk/coercion', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.divider = {}), global.ng.cdk.coercion, global.ng.core, global.ng.common));
}(this, (function (exports, coercion, core, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: divider.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McDivider = /** @class */ (function () {
        function McDivider() {
            this._vertical = false;
            this._inset = false;
        }
        Object.defineProperty(McDivider.prototype, "vertical", {
            // Whether the divider is vertically aligned.
            get: 
            // Whether the divider is vertically aligned.
            /**
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
                this._vertical = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McDivider.prototype, "inset", {
            // Whether the divider is an inset divider.
            get: 
            // Whether the divider is an inset divider.
            /**
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
                this._inset = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        McDivider.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-divider',
                        host: {
                            class: 'mc-divider',
                            role: 'separator',
                            '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                            '[class.mc-divider_vertical]': 'vertical',
                            '[class.mc-divider_inset]': 'inset'
                        },
                        template: '',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}"]
                    }] }
        ];
        McDivider.propDecorators = {
            vertical: [{ type: core.Input }],
            inset: [{ type: core.Input }]
        };
        return McDivider;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        McDivider.prototype._vertical;
        /**
         * @type {?}
         * @private
         */
        McDivider.prototype._inset;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: divider.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McDividerModule = /** @class */ (function () {
        function McDividerModule() {
        }
        McDividerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [McDivider],
                        declarations: [McDivider]
                    },] }
        ];
        return McDividerModule;
    }());

    exports.McDivider = McDivider;
    exports.McDividerModule = McDividerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-divider.umd.js.map

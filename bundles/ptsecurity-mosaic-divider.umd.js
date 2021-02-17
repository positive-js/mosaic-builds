(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/divider', ['exports', '@angular/cdk/coercion', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.divider = {}), global.ng.cdk.coercion, global.ng.core, global.ng.common));
}(this, (function (exports, coercion, core, common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: divider.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McDivider = /** @class */ (function () {
        function McDivider() {
            this._vertical = false;
            this._inset = false;
        }
        Object.defineProperty(McDivider.prototype, "vertical", {
            // Whether the divider is vertically aligned.
            /**
             * @return {?}
             */
            get: function () {
                return this._vertical;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._vertical = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McDivider.prototype, "inset", {
            // Whether the divider is an inset divider.
            /**
             * @return {?}
             */
            get: function () {
                return this._inset;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._inset = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        return McDivider;
    }());
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
                    styles: [".mc-divider{border-top-style:solid;border-top-width:var(--mc-divider-size-width,1px);display:block;margin:0}.mc-divider.mc-divider_vertical{border-right-style:solid;border-right-width:var(--mc-divider-size-width,1px);border-top:0}.mc-divider.mc-divider_inset{margin-left:var(--mc-divider-size-inset-margin,80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:var(--mc-divider-size-inset-margin,80px)}"]
                }] }
    ];
    McDivider.propDecorators = {
        vertical: [{ type: core.Input }],
        inset: [{ type: core.Input }]
    };
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McDividerModule = /** @class */ (function () {
        function McDividerModule() {
        }
        return McDividerModule;
    }());
    McDividerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [McDivider],
                    declarations: [McDivider]
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
     * Generated from: ptsecurity-mosaic-divider.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.McDivider = McDivider;
    exports.McDividerModule = McDividerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-divider.umd.js.map

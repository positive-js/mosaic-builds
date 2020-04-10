import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
            this._vertical = coerceBooleanProperty(value);
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
            this._inset = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    McDivider.decorators = [
        { type: Component, args: [{
                    selector: 'mc-divider',
                    host: {
                        class: 'mc-divider',
                        role: 'separator',
                        '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                        '[class.mc-divider-vertical]': 'vertical',
                        '[class.mc-divider-inset]': 'inset'
                    },
                    template: '',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}"]
                }] }
    ];
    McDivider.propDecorators = {
        vertical: [{ type: Input }],
        inset: [{ type: Input }]
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
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [McDivider],
                    declarations: [McDivider]
                },] }
    ];
    return McDividerModule;
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
 * Generated from: ptsecurity-mosaic-divider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McDivider, McDividerModule };
//# sourceMappingURL=ptsecurity-mosaic-divider.js.map

/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                },] },
    ];
    McDivider.propDecorators = {
        vertical: [{ type: Input }],
        inset: [{ type: Input }]
    };
    return McDivider;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McDividerModule = /** @class */ (function () {
    function McDividerModule() {
    }
    McDividerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [McDivider],
                    declarations: [McDivider]
                },] },
    ];
    return McDividerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McDivider, McDividerModule };
//# sourceMappingURL=divider.es5.js.map

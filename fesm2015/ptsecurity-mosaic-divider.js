import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: divider.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McDivider {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    // Whether the divider is vertically aligned.
    /**
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    // Whether the divider is an inset divider.
    /**
     * @return {?}
     */
    get inset() {
        return this._inset;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
}
McDivider.decorators = [
    { type: Component, args: [{
                selector: 'mc-divider',
                host: {
                    class: 'mc-divider',
                    role: 'separator',
                    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                    '[class.mc-divider_vertical]': 'vertical',
                    '[class.mc-divider_inset]': 'inset'
                },
                template: '',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                styles: [".mc-divider{border-top-style:solid;border-top-width:var(--mc-divider-size-width,1px);display:block;margin:0}.mc-divider.mc-divider_vertical{border-right-style:solid;border-right-width:var(--mc-divider-size-width,1px);border-top:0}.mc-divider.mc-divider_inset{margin-left:var(--mc-divider-size-inset-margin,80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:var(--mc-divider-size-inset-margin,80px)}"]
            }] }
];
McDivider.propDecorators = {
    vertical: [{ type: Input }],
    inset: [{ type: Input }]
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
class McDividerModule {
}
McDividerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
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

export { McDivider, McDividerModule };
//# sourceMappingURL=ptsecurity-mosaic-divider.js.map

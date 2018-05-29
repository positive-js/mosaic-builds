/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { toBoolean, McCommonModule } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class McDivider {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
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
        this._vertical = toBoolean(value);
    }
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
        this._inset = toBoolean(value);
    }
}
McDivider.decorators = [
    { type: Component, args: [{selector: 'mc-divider',
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
/** @nocollapse */
McDivider.propDecorators = {
    "vertical": [{ type: Input },],
    "inset": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class McDividerModule {
}
McDividerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    McCommonModule,
                    CommonModule
                ],
                exports: [
                    McDivider,
                    McCommonModule
                ],
                declarations: [
                    McDivider
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { McDivider, McDividerModule };
//# sourceMappingURL=divider.js.map

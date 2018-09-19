/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata } from 'tslib';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { CommonModule } from '@angular/common';

let McDivider = class McDivider {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    // Whether the divider is vertically aligned.
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    // Whether the divider is an inset divider.
    get inset() {
        return this._inset;
    }
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McDivider.prototype, "vertical", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McDivider.prototype, "inset", null);
McDivider = __decorate([
    Component({
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
    })
], McDivider);

let McDividerModule = class McDividerModule {
};
McDividerModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [McDivider],
        declarations: [McDivider]
    })
], McDividerModule);

/**
 * Generated bundle index. Do not edit.
 */

export { McDivider, McDividerModule };
//# sourceMappingURL=divider.js.map

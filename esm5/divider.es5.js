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
            this._vertical = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDivider.prototype, "inset", {
        // Whether the divider is an inset divider.
        get: function () {
            return this._inset;
        },
        set: function (value) {
            this._inset = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
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
    return McDivider;
}());

var McDividerModule = /** @class */ (function () {
    function McDividerModule() {
    }
    McDividerModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [McDivider],
            declarations: [McDivider]
        })
    ], McDividerModule);
    return McDividerModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McDivider, McDividerModule };
//# sourceMappingURL=divider.es5.js.map

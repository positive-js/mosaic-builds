/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/coercion'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/divider', ['exports', '@angular/core', '@ptsecurity/cdk/coercion', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.divider = {}),global.ng.core,global.ng.cdk.coercion,global.ng.common));
}(this, (function (exports,core,coercion,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDivider.prototype, "vertical", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDivider.prototype, "inset", null);
    McDivider = __decorate([
        core.Component({
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
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        })
    ], McDivider);
    return McDivider;
}());

var McDividerModule = /** @class */ (function () {
    function McDividerModule() {
    }
    McDividerModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule],
            exports: [McDivider],
            declarations: [McDivider]
        })
    ], McDividerModule);
    return McDividerModule;
}());

exports.McDivider = McDivider;
exports.McDividerModule = McDividerModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-divider.umd.js.map

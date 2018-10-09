/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@angular/common'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/platform')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/icon', ['exports', '@angular/core', '@ptsecurity/mosaic/core', '@angular/common', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/platform'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.icon = {}),global.ng.core,global.ng.mosaic.core,global.ng.common,global.ng.cdk.a11y,global.ng.cdk.platform));
}(this, (function (exports,core,core$1,common,a11y,platform) { 'use strict';

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var McIconCSSStyler = /** @class */ (function () {
    function McIconCSSStyler() {
    }
    McIconCSSStyler = __decorate([
        core.Directive({
            selector: '[mc-icon]',
            host: { class: 'mc mc-icon' }
        })
    ], McIconCSSStyler);
    return McIconCSSStyler;
}());
var McIconBase = /** @class */ (function () {
    function McIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McIconBase;
}());
var _McIconMixinBase = core$1.mixinColor(McIconBase);
var McIcon = /** @class */ (function (_super) {
    __extends(McIcon, _super);
    function McIcon(elementRef, iconName) {
        var _this = _super.call(this, elementRef) || this;
        elementRef.nativeElement.classList.add(iconName);
        return _this;
    }
    McIcon.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    McIcon = __decorate([
        core.Component({
            selector: "[mc-icon]",
            template: '<ng-content></ng-content>',
            styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None
        }),
        __param(1, core.Attribute('mc-icon')),
        __metadata("design:paramtypes", [core.ElementRef, String])
    ], McIcon);
    return McIcon;
}(_McIconMixinBase));

var McIconModule = /** @class */ (function () {
    function McIconModule() {
    }
    McIconModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule,
                platform.PlatformModule
            ],
            exports: [
                McIcon,
                McIconCSSStyler
            ],
            declarations: [
                McIcon,
                McIconCSSStyler
            ]
        })
    ], McIconModule);
    return McIconModule;
}());

exports.McIconModule = McIconModule;
exports.McIconCSSStyler = McIconCSSStyler;
exports.McIconBase = McIconBase;
exports._McIconMixinBase = _McIconMixinBase;
exports.McIcon = McIcon;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-icon.umd.js.map

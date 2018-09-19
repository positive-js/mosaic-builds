/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/mosaic/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/link', ['exports', '@angular/core', '@ptsecurity/cdk/a11y', '@ptsecurity/mosaic/core', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.link = {}),global.ng.core,global.ng.cdk.a11y,global.ng.mosaic.core,global.ng.common));
}(this, (function (exports,core,a11y,core$1,common) { 'use strict';

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

var McLinkBase = /** @class */ (function () {
    function McLinkBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McLinkBase;
}());
var _McLinkBase = core$1.mixinTabIndex(core$1.mixinDisabled(McLinkBase));
var McLink = /** @class */ (function (_super) {
    __extends(McLink, _super);
    function McLink(tabIndex, elementRef, _focusMonitor, _changeDetector) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._changeDetector = _changeDetector;
        _this._disabled = false;
        _this._focusMonitor.monitor(elementRef.nativeElement, true);
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(McLink.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            var newValue = core$1.toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    McLink.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    McLink.prototype.focus = function () {
        this._getHostElement().focus();
    };
    McLink.prototype._getHostElement = function () {
        return this.elementRef.nativeElement;
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McLink.prototype, "disabled", null);
    McLink = __decorate([
        core.Component({
            selector: 'a.mc-link',
            template: "<ng-content></ng-content>",
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            exportAs: 'mcLink',
            styles: [".mc-link{display:inline-flex;align-items:center;padding:2px 4px;text-decoration:none!important;cursor:pointer;outline:0}.mc-link{transition-property:color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link:focus{transition:none}.mc-link:hover{transition:none}.mc-link.mc-focused,.mc-link:focus{border-radius:3px}.mc-link[disabled]{pointer-events:none;cursor:default}.mc-link>.mc-link__icon{color:inherit}.mc-link>.mc-link__text:not(:first-child){margin-left:4px}.mc-link>.mc-link__text:not(:last-child){margin-right:4px}.mc-link .mc-link_dashed,.mc-link.mc-link_underlined{transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link .mc-link_dashed:focus,.mc-link.mc-link_underlined:focus{transition:none}.mc-link .mc-link_dashed:hover,.mc-link.mc-link_underlined:hover{transition:none}"],
            inputs: ['disabled'],
            host: {
                '[attr.disabled]': 'disabled || null',
                '[attr.tabindex]': 'tabIndex'
            }
        }),
        __param(0, core.Attribute('tabindex')),
        __metadata("design:paramtypes", [String, core.ElementRef,
            a11y.FocusMonitor,
            core.ChangeDetectorRef])
    ], McLink);
    return McLink;
}(_McLinkBase));

var McLinkModule = /** @class */ (function () {
    function McLinkModule() {
    }
    McLinkModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule
            ],
            declarations: [McLink],
            exports: [McLink]
        })
    ], McLinkModule);
    return McLinkModule;
}());

exports.McLinkModule = McLinkModule;
exports.McLinkBase = McLinkBase;
exports._McLinkBase = _McLinkBase;
exports.McLink = McLink;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-link.umd.js.map

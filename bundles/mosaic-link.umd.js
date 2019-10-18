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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McLinkBase = /** @class */ (function () {
    function McLinkBase(elementRef) {
        this.elementRef = elementRef;
    }
    return McLinkBase;
}());
// tslint:disable-next-line: naming-convention
/** @type {?} */
var McLinkMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McLinkBase));
var McLink = /** @class */ (function (_super) {
    __extends(McLink, _super);
    function McLink(elementRef, focusMonitor, changeDetector, tabIndex) {
        var _this = _super.call(this, elementRef) || this;
        _this.focusMonitor = focusMonitor;
        _this.changeDetector = changeDetector;
        _this._disabled = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.focusMonitor.monitor(elementRef.nativeElement, true);
        return _this;
    }
    Object.defineProperty(McLink.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = core$1.toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this.changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McLink.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McLink.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.getHostElement().focus();
    };
    /**
     * @return {?}
     */
    McLink.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement;
    };
    McLink.decorators = [
        { type: core.Directive, args: [{
                    selector: 'a.mc-link',
                    exportAs: 'mcLink',
                    inputs: ['disabled'],
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'tabIndex'
                    }
                },] },
    ];
    /** @nocollapse */
    McLink.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y.FocusMonitor },
        { type: core.ChangeDetectorRef },
        { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] }
    ]; };
    McLink.propDecorators = {
        disabled: [{ type: core.Input }]
    };
    return McLink;
}(McLinkMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McLinkModule = /** @class */ (function () {
    function McLinkModule() {
    }
    McLinkModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        a11y.A11yModule
                    ],
                    declarations: [McLink],
                    exports: [McLink]
                },] },
    ];
    return McLinkModule;
}());

exports.McLinkModule = McLinkModule;
exports.McLinkBase = McLinkBase;
exports.McLinkMixinBase = McLinkMixinBase;
exports.McLink = McLink;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-link.umd.js.map

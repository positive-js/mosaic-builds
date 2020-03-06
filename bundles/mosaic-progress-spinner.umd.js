/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/progress-spinner', ['exports', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.progressSpinner = {}), global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.mosaic.core));
}(this, (function (exports, platform, common, core, core$1) { 'use strict';

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
    /** @type {?} */
    var idIterator = 0;
    /** @type {?} */
    var MIN_PERCENT = 0;
    /** @type {?} */
    var MAX_PERCENT = 100;
    var McProgressSpinnerBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McProgressSpinnerBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McProgressSpinnerBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McProgressSpinnerMixinBase = core$1.mixinColor(McProgressSpinnerBase);
    /** @type {?} */
    var MAX_DASH_ARRAY = 273;
    var McProgressSpinner = /** @class */ (function (_super) {
        __extends(McProgressSpinner, _super);
        function McProgressSpinner(elementRef) {
            var _this = _super.call(this, elementRef) || this;
            _this.id = "mc-progress-spinner-" + idIterator++;
            _this.value = 0;
            _this.mode = 'determinate';
            _this.color = core$1.ThemePalette.Primary;
            return _this;
        }
        Object.defineProperty(McProgressSpinner.prototype, "percentage", {
            get: /**
             * @return {?}
             */
            function () {
                return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McProgressSpinner.prototype, "dashOffsetPercent", {
            get: /**
             * @return {?}
             */
            function () {
                return MAX_DASH_ARRAY - this.percentage * MAX_DASH_ARRAY + "%";
            },
            enumerable: true,
            configurable: true
        });
        McProgressSpinner.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-progress-spinner',
                        template: "<div class=\"mc-progress-spinner__inner\" [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\"><svg focusable=\"false\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 100 100\" class=\"mc-progress-spinner__svg\"><circle cx=\"50%\" cy=\"50%\" r=\"42.5%\" class=\"mc-progress-spinner__circle\" [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\"></circle></svg></div>",
                        styles: ["@keyframes mc-progress-spinner-indeterminate{100%{transform:rotateZ(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;height:16px;overflow:hidden}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotateZ(-90deg)}.mc-progress-spinner__inner--indeterminate{animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            class: 'mc-progress-spinner',
                            '[attr.id]': 'id'
                        }
                    },] },
        ];
        /** @nocollapse */
        McProgressSpinner.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        McProgressSpinner.propDecorators = {
            id: [{ type: core.Input }],
            value: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            color: [{ type: core.Input }]
        };
        return McProgressSpinner;
    }(McProgressSpinnerMixinBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McProgressSpinnerModule = /** @class */ (function () {
        function McProgressSpinnerModule() {
        }
        McProgressSpinnerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            platform.PlatformModule
                        ],
                        exports: [
                            McProgressSpinner
                        ],
                        declarations: [
                            McProgressSpinner
                        ]
                    },] },
        ];
        return McProgressSpinnerModule;
    }());

    exports.McProgressSpinner = McProgressSpinner;
    exports.McProgressSpinnerBase = McProgressSpinnerBase;
    exports.McProgressSpinnerMixinBase = McProgressSpinnerMixinBase;
    exports.McProgressSpinnerModule = McProgressSpinnerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-progress-spinner.umd.js.map

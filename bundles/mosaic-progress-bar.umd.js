/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/progress-bar', ['exports', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.progressBar = {}), global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.mosaic.core));
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
    var McProgressBarBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McProgressBarBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McProgressBarBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McProgressBarMixinBase = core$1.mixinColor(McProgressBarBase);
    var McProgressBar = /** @class */ (function (_super) {
        __extends(McProgressBar, _super);
        function McProgressBar(elementRef) {
            var _this = _super.call(this, elementRef) || this;
            _this.id = "mc-progress-bar-" + idIterator++;
            _this.value = 0;
            _this.mode = 'determinate';
            _this.color = core$1.ThemePalette.Primary;
            return _this;
        }
        Object.defineProperty(McProgressBar.prototype, "percentage", {
            get: /**
             * @return {?}
             */
            function () {
                return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
            },
            enumerable: true,
            configurable: true
        });
        McProgressBar.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-progress-bar',
                        template: "<div class=\"mc-progress-bar__inner\" [ngSwitch]=\"mode\" [id]=\"id\"><div *ngSwitchCase=\"'indeterminate'\" class=\"mc-progress-bar__line mc-progress-bar__line--indeterminate\"></div><div *ngSwitchDefault class=\"mc-progress-bar__line mc-progress-bar__line--determinate\" [ngStyle]=\"{transform: 'scaleX(' + percentage + ')'}\"></div></div>",
                        styles: ["@keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}100%{transform:scaleX(.4) translateX(250%)}}.mc-progress-bar{display:block;height:4px;overflow:hidden}.mc-progress-bar__inner{height:100%}.mc-progress-bar__line{height:100%;transform-origin:top left}.mc-progress-bar__line--determinate{transition:transform .3s}.mc-progress-bar__line--indeterminate{animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            class: 'mc-progress-bar',
                            '[attr.id]': 'id'
                        }
                    },] },
        ];
        /** @nocollapse */
        McProgressBar.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        McProgressBar.propDecorators = {
            id: [{ type: core.Input }],
            value: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            color: [{ type: core.Input }]
        };
        return McProgressBar;
    }(McProgressBarMixinBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McProgressBarModule = /** @class */ (function () {
        function McProgressBarModule() {
        }
        McProgressBarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            platform.PlatformModule
                        ],
                        exports: [
                            McProgressBar
                        ],
                        declarations: [
                            McProgressBar
                        ]
                    },] },
        ];
        return McProgressBarModule;
    }());

    exports.McProgressBar = McProgressBar;
    exports.McProgressBarBase = McProgressBarBase;
    exports.McProgressBarMixinBase = McProgressBarMixinBase;
    exports.McProgressBarModule = McProgressBarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-progress-bar.umd.js.map

/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';

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
var McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase);
/** @type {?} */
var MAX_DASH_ARRAY = 273;
var McProgressSpinner = /** @class */ (function (_super) {
    __extends(McProgressSpinner, _super);
    function McProgressSpinner(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.id = "mc-progress-spinner-" + idIterator++;
        _this.value = 0;
        _this.mode = 'determinate';
        _this.color = ThemePalette.Primary;
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
        { type: Component, args: [{
                    selector: 'mc-progress-spinner',
                    template: "<div class=\"mc-progress-spinner__inner\" [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\"><svg focusable=\"false\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 100 100\" class=\"mc-progress-spinner__svg\"><circle cx=\"50%\" cy=\"50%\" r=\"42.5%\" class=\"mc-progress-spinner__circle\" [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\"></circle></svg></div>",
                    styles: ["@keyframes mc-progress-spinner-indeterminate{100%{transform:rotateZ(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;height:16px;overflow:hidden}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotateZ(-90deg)}.mc-progress-spinner__inner--indeterminate{animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'mc-progress-spinner',
                        '[attr.id]': 'id'
                    }
                },] },
    ];
    /** @nocollapse */
    McProgressSpinner.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    McProgressSpinner.propDecorators = {
        id: [{ type: Input }],
        value: [{ type: Input }],
        mode: [{ type: Input }],
        color: [{ type: Input }]
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        PlatformModule
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

export { McProgressSpinner, McProgressSpinnerBase, McProgressSpinnerMixinBase, McProgressSpinnerModule };
//# sourceMappingURL=progress-spinner.es5.js.map

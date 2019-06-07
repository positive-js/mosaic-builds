/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

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
    function McProgressBarBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McProgressBarBase;
}());
/** @type {?} */
var _McProgressBarMixinBase = mixinColor(McProgressBarBase);
var McProgressBar = /** @class */ (function (_super) {
    __extends(McProgressBar, _super);
    function McProgressBar(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.id = "mc-progress-bar-" + idIterator++;
        _this.value = 0;
        _this.mode = 'determinate';
        _this.color = ThemePalette.Primary;
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
        { type: Component, args: [{
                    selector: 'mc-progress-bar',
                    template: "<div class=\"mc-progress-bar__inner\" [ngSwitch]=\"mode\" [id]=\"id\"><div *ngSwitchCase=\"'indeterminate'\" class=\"mc-progress-bar__line mc-progress-bar__line--indeterminate\"></div><div *ngSwitchDefault class=\"mc-progress-bar__line mc-progress-bar__line--determinate\" [ngStyle]=\"{transform: 'scaleX(' + percentage + ')'}\"></div></div>",
                    styles: ["@keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}100%{transform:scaleX(.4) translateX(250%)}}.mc-progress-bar{display:block;height:4px;overflow:hidden}.mc-progress-bar__inner{height:100%}.mc-progress-bar__line{height:100%;transform-origin:top left}.mc-progress-bar__line--determinate{transition:transform .3s}.mc-progress-bar__line--indeterminate{animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'mc-progress-bar',
                        '[attr.id]': 'id'
                    }
                },] },
    ];
    /** @nocollapse */
    McProgressBar.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    McProgressBar.propDecorators = {
        id: [{ type: Input }],
        value: [{ type: Input }],
        mode: [{ type: Input }],
        color: [{ type: Input }]
    };
    return McProgressBar;
}(_McProgressBarMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McProgressBarModule = /** @class */ (function () {
    function McProgressBarModule() {
    }
    McProgressBarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        PlatformModule
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McProgressBarModule, McProgressBarBase, _McProgressBarMixinBase, McProgressBar };
//# sourceMappingURL=progress-bar.es5.js.map

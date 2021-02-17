import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * Generated from: progress-spinner.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let idIterator = 0;
/** @type {?} */
const MIN_PERCENT = 0;
/** @type {?} */
const MAX_PERCENT = 100;
class McProgressSpinnerBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McProgressSpinnerBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase, ThemePalette.Primary);
/** @type {?} */
const MAX_DASH_ARRAY = 273;
class McProgressSpinner extends McProgressSpinnerMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-spinner-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
    }
    /**
     * @return {?}
     */
    get percentage() {
        return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
    }
    /**
     * @return {?}
     */
    get dashOffsetPercent() {
        return `${MAX_DASH_ARRAY - this.percentage * MAX_DASH_ARRAY}%`;
    }
}
McProgressSpinner.decorators = [
    { type: Component, args: [{
                selector: 'mc-progress-spinner',
                template: "<div class=\"mc-progress-spinner__inner\"\n     [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\">\n    <svg focusable=\"false\"\n         preserveAspectRatio=\"xMidYMid meet\"\n         viewBox=\"0 0 100 100\"\n         class=\"mc-progress-spinner__svg\">\n        <circle cx=\"50%\"\n                cy=\"50%\"\n                r=\"42.5%\"\n                class=\"mc-progress-spinner__circle\"\n                [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\">\n        </circle>\n    </svg>\n</div>\n\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                host: {
                    class: 'mc-progress-spinner',
                    '[attr.id]': 'id'
                },
                styles: ["@-webkit-keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}@keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}.mc-progress-spinner{display:inline-block;height:var(--mc-progress-spinner-size-size,16px);overflow:hidden;width:var(--mc-progress-spinner-size-size,16px)}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transform-origin:center center;transition:stroke-dashoffset .3s}.mc-progress-spinner__inner{height:100%;transform:rotate(-90deg);width:100%}.mc-progress-spinner__inner--indeterminate{-webkit-animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite;animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{height:100%;width:100%}"]
            }] }
];
/** @nocollapse */
McProgressSpinner.ctorParameters = () => [
    { type: ElementRef }
];
McProgressSpinner.propDecorators = {
    id: [{ type: Input }],
    value: [{ type: Input }],
    mode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McProgressSpinner.prototype.id;
    /** @type {?} */
    McProgressSpinner.prototype.value;
    /** @type {?} */
    McProgressSpinner.prototype.mode;
}

/**
 * @fileoverview added by tsickle
 * Generated from: progress-spinner.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McProgressSpinnerModule {
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-progress-spinner.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McProgressSpinner, McProgressSpinnerBase, McProgressSpinnerMixinBase, McProgressSpinnerModule };
//# sourceMappingURL=ptsecurity-mosaic-progress-spinner.js.map

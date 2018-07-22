/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

let idIterator = 0;
const MIN_PERCENT = 0;
const MAX_PERCENT = 100;
class McProgressSpinnerBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _McProgressPinnerMixinBase = mixinColor(McProgressSpinnerBase);
const MAX_DASH_ARRAY = 273;
class McProgressSpinner extends _McProgressPinnerMixinBase {
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-spinner-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
        this.color = ThemePalette.Primary;
    }
    get percentage() {
        return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
    }
    get dashOffsetPercent() {
        return `${MAX_DASH_ARRAY - this.percentage * MAX_DASH_ARRAY}%`;
    }
}
McProgressSpinner.decorators = [
    { type: Component, args: [{
                selector: 'mc-progress-spinner',
                template: "<div class=\"mc-progress-spinner__inner\" [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\"><svg focusable=\"false\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 100 100\" class=\"mc-progress-spinner__svg\"><circle cx=\"50%\" cy=\"50%\" r=\"42.5%\" class=\"mc-progress-spinner__circle\" [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\"></circle></svg></div>",
                styles: ["@keyframes mc-progress-spinner-indeterminate{100%{transform:rotateZ(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;height:16px;overflow:hidden}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotateZ(-90deg)}.mc-progress-spinner__inner--indeterminate{animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    class: 'mc-progress-spinner',
                    '[attr.id]': 'id'
                }
            },] },
];
/** @nocollapse */
McProgressSpinner.ctorParameters = () => [
    { type: ElementRef, },
];
McProgressSpinner.propDecorators = {
    "id": [{ type: Input },],
    "value": [{ type: Input },],
    "mode": [{ type: Input },],
    "color": [{ type: Input },],
};

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
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { McProgressSpinnerModule, McProgressSpinnerBase, _McProgressPinnerMixinBase, McProgressSpinner };
//# sourceMappingURL=progress-spinner.js.map

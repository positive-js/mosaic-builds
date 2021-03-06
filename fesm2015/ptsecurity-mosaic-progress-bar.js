import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';

let idIterator = 0;
const MIN_PERCENT = 0;
const MAX_PERCENT = 100;
class McProgressBarBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McProgressBarMixinBase = mixinColor(McProgressBarBase, ThemePalette.Primary);
class McProgressBar extends McProgressBarMixinBase {
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-bar-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
    }
    get percentage() {
        return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
    }
}
McProgressBar.decorators = [
    { type: Component, args: [{
                selector: 'mc-progress-bar',
                template: "\n<div class=\"mc-progress-bar__inner\" [ngSwitch]=\"mode\" [id]=\"id\">\n    <div\n        *ngSwitchCase=\"'indeterminate'\"\n        class=\"mc-progress-bar__line mc-progress-bar__line--indeterminate\">\n    </div>\n    <div\n        *ngSwitchDefault\n        class=\"mc-progress-bar__line mc-progress-bar__line--determinate\"\n        [ngStyle]=\"{transform: 'scaleX(' + percentage + ')'}\">\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                host: {
                    class: 'mc-progress-bar',
                    '[attr.id]': 'id'
                },
                styles: ["@-webkit-keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}to{transform:scaleX(.4) translateX(250%)}}@keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}to{transform:scaleX(.4) translateX(250%)}}.mc-progress-bar{display:block;height:var(--mc-progress-bar-size-height,4px);overflow:hidden}.mc-progress-bar__inner{height:100%}.mc-progress-bar__line{height:100%;transform-origin:top left}.mc-progress-bar__line--determinate{transition:transform .3s}.mc-progress-bar__line--indeterminate{-webkit-animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite;animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite}"]
            },] }
];
/** @nocollapse */
McProgressBar.ctorParameters = () => [
    { type: ElementRef }
];
McProgressBar.propDecorators = {
    id: [{ type: Input }],
    value: [{ type: Input }],
    mode: [{ type: Input }]
};

class McProgressBarModule {
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
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McProgressBar, McProgressBarBase, McProgressBarMixinBase, McProgressBarModule };
//# sourceMappingURL=ptsecurity-mosaic-progress-bar.js.map

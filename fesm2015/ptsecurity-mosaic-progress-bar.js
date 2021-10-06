import { PlatformModule } from '@angular/cdk/platform';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
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
/** @nocollapse */ McProgressBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McProgressBar, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McProgressBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McProgressBar, selector: "mc-progress-bar", inputs: { color: "color", id: "id", value: "value", mode: "mode" }, host: { properties: { "attr.id": "id" }, classAttribute: "mc-progress-bar" }, usesInheritance: true, ngImport: i0, template: "\n<div class=\"mc-progress-bar__inner\" [ngSwitch]=\"mode\" [id]=\"id\">\n    <div\n        *ngSwitchCase=\"'indeterminate'\"\n        class=\"mc-progress-bar__line mc-progress-bar__line--indeterminate\">\n    </div>\n    <div\n        *ngSwitchDefault\n        class=\"mc-progress-bar__line mc-progress-bar__line--determinate\"\n        [ngStyle]=\"{transform: 'scaleX(' + percentage + ')'}\">\n    </div>\n</div>\n", styles: ["@keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translate(-150%)}to{transform:scaleX(.4) translate(250%)}}.mc-progress-bar{display:block;height:4px;height:var(--mc-progress-bar-size-height, 4px);overflow:hidden}.mc-progress-bar__inner{height:100%}.mc-progress-bar__line{height:100%;transform-origin:top left}.mc-progress-bar__line--determinate{transition:transform .3s}.mc-progress-bar__line--indeterminate{animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite}\n"], directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McProgressBar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-progress-bar',
                    templateUrl: './progress-bar.component.html',
                    styleUrls: ['./progress-bar.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['color'],
                    host: {
                        class: 'mc-progress-bar',
                        '[attr.id]': 'id'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { id: [{
                type: Input
            }], value: [{
                type: Input
            }], mode: [{
                type: Input
            }] } });

class McProgressBarModule {
}
/** @nocollapse */ McProgressBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McProgressBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McProgressBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McProgressBarModule, declarations: [McProgressBar], imports: [CommonModule,
        PlatformModule], exports: [McProgressBar] });
/** @nocollapse */ McProgressBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McProgressBarModule, imports: [[
            CommonModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McProgressBarModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McProgressBar, McProgressBarBase, McProgressBarMixinBase, McProgressBarModule };
//# sourceMappingURL=ptsecurity-mosaic-progress-bar.js.map

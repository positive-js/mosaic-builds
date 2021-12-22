import { PlatformModule } from '@angular/cdk/platform';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';

let idIterator = 0;
const MIN_PERCENT = 0;
const MAX_PERCENT = 100;
class McProgressSpinnerBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase, ThemePalette.Primary);
const MAX_DASH_ARRAY = 273;
class McProgressSpinner extends McProgressSpinnerMixinBase {
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-spinner-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
    }
    get percentage() {
        return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
    }
    get dashOffsetPercent() {
        return `${MAX_DASH_ARRAY - this.percentage * MAX_DASH_ARRAY}%`;
    }
}
/** @nocollapse */ /** @nocollapse */ McProgressSpinner.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McProgressSpinner, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McProgressSpinner.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McProgressSpinner, selector: "mc-progress-spinner", inputs: { color: "color", id: "id", value: "value", mode: "mode" }, host: { properties: { "attr.id": "id" }, classAttribute: "mc-progress-spinner" }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-progress-spinner__inner\"\n     [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\">\n    <svg focusable=\"false\"\n         preserveAspectRatio=\"xMidYMid meet\"\n         viewBox=\"0 0 100 100\"\n         class=\"mc-progress-spinner__svg\">\n        <circle cx=\"50%\"\n                cy=\"50%\"\n                r=\"42.5%\"\n                class=\"mc-progress-spinner__circle\"\n                [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\">\n        </circle>\n    </svg>\n</div>\n\n", styles: ["@keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;width:var(--mc-progress-spinner-size-size, 16px);height:16px;height:var(--mc-progress-spinner-size-size, 16px);overflow:hidden}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotate(-90deg)}.mc-progress-spinner__inner--indeterminate{animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McProgressSpinner, decorators: [{
            type: Component,
            args: [{ selector: 'mc-progress-spinner', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color'], host: {
                        class: 'mc-progress-spinner',
                        '[attr.id]': 'id'
                    }, template: "<div class=\"mc-progress-spinner__inner\"\n     [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\">\n    <svg focusable=\"false\"\n         preserveAspectRatio=\"xMidYMid meet\"\n         viewBox=\"0 0 100 100\"\n         class=\"mc-progress-spinner__svg\">\n        <circle cx=\"50%\"\n                cy=\"50%\"\n                r=\"42.5%\"\n                class=\"mc-progress-spinner__circle\"\n                [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\">\n        </circle>\n    </svg>\n</div>\n\n", styles: ["@keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;width:var(--mc-progress-spinner-size-size, 16px);height:16px;height:var(--mc-progress-spinner-size-size, 16px);overflow:hidden}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotate(-90deg)}.mc-progress-spinner__inner--indeterminate{animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { id: [{
                type: Input
            }], value: [{
                type: Input
            }], mode: [{
                type: Input
            }] } });

class McProgressSpinnerModule {
}
/** @nocollapse */ /** @nocollapse */ McProgressSpinnerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McProgressSpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McProgressSpinnerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McProgressSpinnerModule, declarations: [McProgressSpinner], imports: [CommonModule,
        PlatformModule], exports: [McProgressSpinner] });
/** @nocollapse */ /** @nocollapse */ McProgressSpinnerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McProgressSpinnerModule, imports: [[
            CommonModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McProgressSpinnerModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McProgressSpinner, McProgressSpinnerBase, McProgressSpinnerMixinBase, McProgressSpinnerModule };
//# sourceMappingURL=ptsecurity-mosaic-progress-spinner.mjs.map

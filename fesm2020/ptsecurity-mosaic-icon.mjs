import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Component, ChangeDetectionStrategy, ViewEncapsulation, Attribute, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';

// tslint:disable-next-line:naming-convention
class McIconCSSStyler {
}
/** @nocollapse */ /** @nocollapse */ McIconCSSStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McIconCSSStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McIconCSSStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McIconCSSStyler, selector: "[mc-icon]", host: { classAttribute: "mc mc-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McIconCSSStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-icon]',
                    host: { class: 'mc mc-icon' }
                }]
        }] });
class McIconBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line: naming-convention
const McIconMixinBase = mixinColor(McIconBase, ThemePalette.Empty);
class McIcon extends McIconMixinBase {
    constructor(elementRef, iconName) {
        super(elementRef);
        if (iconName) {
            elementRef.nativeElement.classList.add(iconName);
        }
    }
    getHostElement() {
        return this._elementRef.nativeElement;
    }
}
/** @nocollapse */ /** @nocollapse */ McIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McIcon, deps: [{ token: i0.ElementRef }, { token: 'mc-icon', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McIcon.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McIcon, selector: "[mc-icon]", inputs: { color: "color" }, usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McIcon, decorators: [{
            type: Component,
            args: [{ selector: `[mc-icon]`, template: '<ng-content></ng-content>', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color'], styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['mc-icon']
                }] }]; } });

class McIconModule {
}
/** @nocollapse */ /** @nocollapse */ McIconModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McIconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McIconModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McIconModule, declarations: [McIcon,
        McIconCSSStyler], imports: [CommonModule,
        A11yModule,
        PlatformModule], exports: [McIcon,
        McIconCSSStyler] });
/** @nocollapse */ /** @nocollapse */ McIconModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McIconModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McIconModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [
                        McIcon,
                        McIconCSSStyler
                    ],
                    declarations: [
                        McIcon,
                        McIconCSSStyler
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McIcon, McIconBase, McIconCSSStyler, McIconMixinBase, McIconModule };
//# sourceMappingURL=ptsecurity-mosaic-icon.mjs.map

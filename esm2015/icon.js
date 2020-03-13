/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Attribute, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable-next-line:naming-convention
class McIconCSSStyler {
}
McIconCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mc-icon]',
                host: { class: 'mc mc-icon' }
            },] },
];
class McIconBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
const McIconMixinBase = mixinColor(McIconBase, ThemePalette.Empty);
class McIcon extends McIconMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} iconName
     */
    constructor(elementRef, iconName) {
        super(elementRef);
        if (iconName) {
            elementRef.nativeElement.classList.add(iconName);
        }
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this._elementRef.nativeElement;
    }
}
McIcon.decorators = [
    { type: Component, args: [{
                selector: `[mc-icon]`,
                template: '<ng-content></ng-content>',
                styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color']
            },] },
];
/** @nocollapse */
McIcon.ctorParameters = () => [
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['mc-icon',] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McIconModule {
}
McIconModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];

export { McIcon, McIconBase, McIconCSSStyler, McIconMixinBase, McIconModule };
//# sourceMappingURL=icon.js.map

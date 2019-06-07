/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { Attribute, ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';
import { PlatformModule } from '@ptsecurity/cdk/platform';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McIconCSSStyler = /** @class */ (function () {
    function McIconCSSStyler() {
    }
    McIconCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-icon]',
                    host: { class: 'mc mc-icon' }
                },] },
    ];
    return McIconCSSStyler;
}());
var McIconBase = /** @class */ (function () {
    function McIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McIconBase;
}());
/** @type {?} */
var _McIconMixinBase = mixinColor(McIconBase, ThemePalette.Empty);
var McIcon = /** @class */ (function (_super) {
    __extends(McIcon, _super);
    function McIcon(elementRef, iconName) {
        var _this = _super.call(this, elementRef) || this;
        elementRef.nativeElement.classList.add(iconName);
        return _this;
    }
    /**
     * @return {?}
     */
    McIcon.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    McIcon.decorators = [
        { type: Component, args: [{
                    selector: "[mc-icon]",
                    template: '<ng-content></ng-content>',
                    styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['color']
                },] },
    ];
    /** @nocollapse */
    McIcon.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['mc-icon',] }] }
    ]; };
    return McIcon;
}(_McIconMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McIconModule = /** @class */ (function () {
    function McIconModule() {
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
    return McIconModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McIconModule, McIconCSSStyler, McIconBase, _McIconMixinBase, McIcon };
//# sourceMappingURL=icon.es5.js.map

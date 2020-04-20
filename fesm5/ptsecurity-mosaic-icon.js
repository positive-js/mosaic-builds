import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Attribute, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * Generated from: icon.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McIconCSSStyler = /** @class */ (function () {
    function McIconCSSStyler() {
    }
    McIconCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-icon]',
                    host: { class: 'mc mc-icon' }
                },] }
    ];
    return McIconCSSStyler;
}());
var McIconBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McIconBase;
}());
if (false) {
    /** @type {?} */
    McIconBase.prototype._elementRef;
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
var McIconMixinBase = mixinColor(McIconBase, ThemePalette.Empty);
var McIcon = /** @class */ (function (_super) {
    __extends(McIcon, _super);
    function McIcon(elementRef, iconName) {
        var _this = _super.call(this, elementRef) || this;
        if (iconName) {
            elementRef.nativeElement.classList.add(iconName);
        }
        return _this;
    }
    /**
     * @return {?}
     */
    McIcon.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    McIcon.decorators = [
        { type: Component, args: [{
                    selector: "[mc-icon]",
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['color'],
                    styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"]
                }] }
    ];
    /** @nocollapse */
    McIcon.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['mc-icon',] }] }
    ]; };
    return McIcon;
}(McIconMixinBase));

/**
 * @fileoverview added by tsickle
 * Generated from: icon.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] }
    ];
    return McIconModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-icon.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McIcon, McIconBase, McIconCSSStyler, McIconMixinBase, McIconModule };
//# sourceMappingURL=ptsecurity-mosaic-icon.js.map
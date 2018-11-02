/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __param, __metadata } from 'tslib';
import { Attribute, ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';
import { PlatformModule } from '@ptsecurity/cdk/platform';

var McIconCSSStyler = /** @class */ (function () {
    function McIconCSSStyler() {
    }
    McIconCSSStyler = __decorate([
        Directive({
            selector: '[mc-icon]',
            host: { class: 'mc mc-icon' }
        })
    ], McIconCSSStyler);
    return McIconCSSStyler;
}());
var McIconBase = /** @class */ (function () {
    function McIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McIconBase;
}());
var _McIconMixinBase = mixinColor(McIconBase, ThemePalette.Empty);
var McIcon = /** @class */ (function (_super) {
    __extends(McIcon, _super);
    function McIcon(elementRef, iconName) {
        var _this = _super.call(this, elementRef) || this;
        elementRef.nativeElement.classList.add(iconName);
        return _this;
    }
    McIcon.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    McIcon = __decorate([
        Component({
            selector: "[mc-icon]",
            template: '<ng-content></ng-content>',
            styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            inputs: ['color']
        }),
        __param(1, Attribute('mc-icon')),
        __metadata("design:paramtypes", [ElementRef, String])
    ], McIcon);
    return McIcon;
}(_McIconMixinBase));

var McIconModule = /** @class */ (function () {
    function McIconModule() {
    }
    McIconModule = __decorate([
        NgModule({
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
        })
    ], McIconModule);
    return McIconModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McIconModule, McIconCSSStyler, McIconBase, _McIconMixinBase, McIcon };
//# sourceMappingURL=icon.es5.js.map

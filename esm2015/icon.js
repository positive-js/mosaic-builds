/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __param, __metadata } from 'tslib';
import { Attribute, ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, NgModule } from '@angular/core';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';
import { PlatformModule } from '@ptsecurity/cdk/platform';

let McIconCSSStyler = class McIconCSSStyler {
};
McIconCSSStyler = __decorate([
    Directive({
        selector: '[mc-icon]',
        host: { class: 'mc mc-icon' }
    })
], McIconCSSStyler);
class McIconBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _McIconMixinBase = mixinColor(McIconBase);
let McIcon = class McIcon extends _McIconMixinBase {
    constructor(elementRef, iconName) {
        super(elementRef);
        elementRef.nativeElement.classList.add(iconName);
    }
    _getHostElement() {
        return this._elementRef.nativeElement;
    }
};
McIcon = __decorate([
    Component({
        selector: `[mc-icon]`,
        template: '<ng-content></ng-content>',
        styles: [""],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    }),
    __param(1, Attribute('mc-icon')),
    __metadata("design:paramtypes", [ElementRef, String])
], McIcon);

let McIconModule = class McIconModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { McIconModule, McIconCSSStyler, McIconBase, _McIconMixinBase, McIcon };
//# sourceMappingURL=icon.js.map

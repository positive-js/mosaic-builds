import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Attribute, NgModule } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';

// tslint:disable-next-line:naming-convention
class McIconCSSStyler {
}
McIconCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mc-icon]',
                host: { class: 'mc mc-icon' }
            },] }
];
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
McIcon.decorators = [
    { type: Component, args: [{
                selector: `[mc-icon]`,
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"]
            },] }
];
/** @nocollapse */
McIcon.ctorParameters = () => [
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['mc-icon',] }] }
];

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
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McIcon, McIconBase, McIconCSSStyler, McIconMixinBase, McIconModule };
//# sourceMappingURL=ptsecurity-mosaic-icon.js.map

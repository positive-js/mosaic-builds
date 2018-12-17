/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata } from 'tslib';
import { ElementRef, QueryList, ContentChildren, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

class McTagBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _McTagMixinBase = mixinColor(mixinDisabled(McTagBase));
let McTag = class McTag extends _McTagMixinBase {
    constructor(elementRef) {
        super(elementRef);
        this._disabled = false;
        this.nativeElement = elementRef.nativeElement;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value !== this.disabled) {
            this._disabled = value;
        }
    }
    ngAfterContentInit() {
        this._addClassModificatorForIcons();
    }
    _addClassModificatorForIcons() {
        const icons = this.contentChildren.map((item) => item._elementRef.nativeElement);
        if (icons.length === 1) {
            const iconElement = icons[0];
            if (!iconElement.previousElementSibling && !iconElement.nextElementSibling) {
                if (iconElement.nextSibling) {
                    iconElement.classList.add('mc-icon_left');
                    this.nativeElement.classList.add('mc-left-icon');
                }
                if (iconElement.previousSibling) {
                    iconElement.classList.add('mc-icon_right');
                    this.nativeElement.classList.add('mc-right-icon');
                }
            }
        }
        else if (icons.length > 1) {
            const firstIconElement = icons[0];
            const secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    }
};
__decorate([
    ContentChildren(McIcon),
    __metadata("design:type", QueryList)
], McTag.prototype, "contentChildren", void 0);
McTag = __decorate([
    Component({
        selector: 'mc-tag',
        template: "<div class=\"mc-tag__wrapper\"><span class=\"mc-tag__text\"><ng-content></ng-content></span><ng-content select=\"[mc-icon]\"></ng-content><div class=\"mc-tag-overlay\"></div></div>",
        styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;height:24px;border-width:1px;border-style:solid;border-radius:4px;cursor:default}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:24px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-tag__text{margin-left:7px;text-overflow:ellipsis;overflow:hidden}"],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        host: {
            class: 'mc-tag',
            '[class.mc-disabled]': 'disabled'
        },
        inputs: ['color', 'disabled']
    }),
    __metadata("design:paramtypes", [ElementRef])
], McTag);

let McTagModule = class McTagModule {
};
McTagModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            PlatformModule
        ],
        exports: [
            McTag
        ],
        declarations: [
            McTag
        ]
    })
], McTagModule);

/**
 * Generated bundle index. Do not edit.
 */

export { McTagBase, _McTagMixinBase, McTag, McTagModule };
//# sourceMappingURL=tag.js.map

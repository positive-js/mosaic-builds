/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends, __decorate, __metadata } from 'tslib';
import { ElementRef, QueryList, ContentChildren, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { mixinColor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

var McTagBase = /** @class */ (function () {
    function McTagBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTagBase;
}());
var _McTagMixinBase = mixinColor(McTagBase);
var McTag = /** @class */ (function (_super) {
    __extends(McTag, _super);
    function McTag(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.nativeElement = elementRef.nativeElement;
        return _this;
    }
    McTag.prototype.ngAfterContentInit = function () {
        this._addClassModificatorForIcons();
    };
    McTag.prototype._addClassModificatorForIcons = function () {
        var icons = this.contentChildren.map(function (item) { return item._elementRef.nativeElement; });
        if (icons.length === 1) {
            var iconElement = icons[0];
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
            var firstIconElement = icons[0];
            var secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    };
    __decorate([
        ContentChildren(McIcon),
        __metadata("design:type", QueryList)
    ], McTag.prototype, "contentChildren", void 0);
    McTag = __decorate([
        Component({
            selector: 'mc-tag',
            template: "<div class=\"mc-tag__wrapper\"><span class=\"mc-tag__text\"><ng-content></ng-content></span><ng-content select=\"[mc-icon]\"></ng-content></div>",
            styles: [".mc-tag{display:inline-block;overflow:hidden;height:22px;border-width:1px;border-style:solid;border-radius:4px;cursor:default}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{display:flex;align-items:center;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:22px;height:22px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag__text{margin-left:7px;text-overflow:ellipsis;overflow:hidden}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            host: { class: 'mc-tag' },
            inputs: ['color']
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], McTag);
    return McTag;
}(_McTagMixinBase));

var McTagModule = /** @class */ (function () {
    function McTagModule() {
    }
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
    return McTagModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McTagBase, _McTagMixinBase, McTag, McTagModule };
//# sourceMappingURL=tag.es5.js.map
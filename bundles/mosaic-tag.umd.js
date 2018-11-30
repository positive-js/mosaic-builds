/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/icon'), require('@angular/common'), require('@ptsecurity/cdk/platform')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tag', ['exports', '@angular/core', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/icon', '@angular/common', '@ptsecurity/cdk/platform'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.tag = {}),global.ng.core,global.ng.mosaic.core,global.ng.mosaic.icon,global.ng.common,global.ng.cdk.platform));
}(this, (function (exports,core,core$1,icon,common,platform) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var McTagBase = /** @class */ (function () {
    function McTagBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTagBase;
}());
var _McTagMixinBase = core$1.mixinColor(core$1.mixinDisabled(McTagBase));
var McTag = /** @class */ (function (_super) {
    __extends(McTag, _super);
    function McTag(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this._disabled = false;
        _this.nativeElement = elementRef.nativeElement;
        return _this;
    }
    Object.defineProperty(McTag.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            if (value !== this.disabled) {
                this._disabled = value;
            }
        },
        enumerable: true,
        configurable: true
    });
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
        core.ContentChildren(icon.McIcon),
        __metadata("design:type", core.QueryList)
    ], McTag.prototype, "contentChildren", void 0);
    McTag = __decorate([
        core.Component({
            selector: 'mc-tag',
            template: "<div class=\"mc-tag__wrapper\"><span class=\"mc-tag__text\"><ng-content></ng-content></span><ng-content select=\"[mc-icon]\"></ng-content><div class=\"mc-tag-overlay\"></div></div>",
            styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;height:22px;border-width:1px;border-style:solid;border-radius:4px;cursor:default}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{display:flex;align-items:center;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:22px;height:22px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-tag__text{margin-left:7px;text-overflow:ellipsis;overflow:hidden}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            host: {
                class: 'mc-tag',
                '[class.mc-disabled]': 'disabled'
            },
            inputs: ['color', 'disabled']
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McTag);
    return McTag;
}(_McTagMixinBase));

var McTagModule = /** @class */ (function () {
    function McTagModule() {
    }
    McTagModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                platform.PlatformModule
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

exports.McTagBase = McTagBase;
exports._McTagMixinBase = _McTagMixinBase;
exports.McTag = McTag;
exports.McTagModule = McTagModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-tag.umd.js.map

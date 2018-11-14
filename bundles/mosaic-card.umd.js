/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/keycodes'), require('@angular/common'), require('@ptsecurity/cdk/platform')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/card', ['exports', '@angular/core', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/keycodes', '@angular/common', '@ptsecurity/cdk/platform'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.card = {}),global.ng.core,global.ng.cdk.a11y,global.ng.cdk.keycodes,global.ng.common,global.ng.cdk.platform));
}(this, (function (exports,core,a11y,keycodes,common,platform) { 'use strict';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var McCard = /** @class */ (function () {
    function McCard(_elementRef, _focusMonitor) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.readonly = false;
        this.selected = false;
        this.selectedChange = new core.EventEmitter();
        this._tabIndex = 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, false);
    }
    Object.defineProperty(McCard.prototype, "tabIndex", {
        get: function () {
            return this.readonly ? null : this._tabIndex;
        },
        set: function (value) {
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    McCard.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    McCard.prototype.focus = function () {
        this.hostElement.focus();
    };
    McCard.prototype.onClick = function ($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    };
    Object.defineProperty(McCard.prototype, "hostElement", {
        get: function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    McCard.prototype.onKeyDown = function ($event) {
        switch ($event.keyCode) {
            case keycodes.SPACE:
                if (!this.readonly) {
                    $event.preventDefault();
                    this.selectedChange.emit(!this.selected);
                }
                break;
            default:
        }
    };
    __decorate([
        core.HostBinding('attr.tabIndex'),
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCard.prototype, "tabIndex", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCard.prototype, "readonly", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCard.prototype, "selected", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McCard.prototype, "selectedChange", void 0);
    McCard = __decorate([
        core.Component({
            selector: 'mc-card',
            template: "<ng-content></ng-content><div class=\"mc-card__overlay\"></div>",
            styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left-width:4px;border-left-style:solid;border-left-color:transparent}.mc-card:focus{outline:0}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:0 0}.mc-card.mc-card_readonly{cursor:auto}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['color'],
            host: {
                class: 'mc-card',
                '[class.mc-card_readonly]': 'readonly',
                '[class.mc-card_selected]': 'selected',
                '(keydown)': 'onKeyDown($event)',
                '(click)': 'onClick($event)'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef, a11y.FocusMonitor])
    ], McCard);
    return McCard;
}());

var McCardModule = /** @class */ (function () {
    function McCardModule() {
    }
    McCardModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule,
                platform.PlatformModule
            ],
            exports: [McCard],
            declarations: [McCard]
        })
    ], McCardModule);
    return McCardModule;
}());

exports.McCardModule = McCardModule;
exports.McCard = McCard;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-card.umd.js.map

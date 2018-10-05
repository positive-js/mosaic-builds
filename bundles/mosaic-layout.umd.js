/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/mosaic/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/layout', ['exports', '@angular/core', '@ptsecurity/mosaic/core', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.layout = {}),global.ng.core,global.ng.mosaic.core,global.ng.common));
}(this, (function (exports,core,core$1,common) { 'use strict';

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

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var McContentComponent = /** @class */ (function () {
    function McContentComponent() {
    }
    McContentComponent = __decorate([
        core.Component({
            selector: 'mc-content',
            preserveWhitespaces: false,
            template: "<ng-content></ng-content>",
            styles: [
                ":host {\n            display: block;\n        }"
            ],
            host: {
                '[class.mc-layout-content]': 'true'
            }
        })
    ], McContentComponent);
    return McContentComponent;
}());

var McFooterComponent = /** @class */ (function () {
    function McFooterComponent() {
    }
    McFooterComponent = __decorate([
        core.Component({
            selector: 'mc-footer',
            preserveWhitespaces: false,
            template: "<ng-content></ng-content>",
            styles: [
                ":host {\n            display: block;\n        }"
            ],
            host: {
                '[class.mc-layout-footer]': 'true'
            }
        })
    ], McFooterComponent);
    return McFooterComponent;
}());

var McHeaderComponent = /** @class */ (function () {
    function McHeaderComponent() {
    }
    McHeaderComponent = __decorate([
        core.Component({
            selector: 'mc-header',
            preserveWhitespaces: false,
            template: "<ng-content></ng-content>",
            styles: [
                ":host {\n            display: block;\n        }"
            ],
            host: {
                '[class.mc-layout-header]': 'true'
            }
        })
    ], McHeaderComponent);
    return McHeaderComponent;
}());

var McLayoutComponent = /** @class */ (function () {
    function McLayoutComponent() {
        this.hasSidebar = false;
    }
    McLayoutComponent = __decorate([
        core.Component({
            selector: 'mc-layout',
            preserveWhitespaces: false,
            styles: [".mc-layout{display:flex;flex-direction:column;flex:auto}.mc-layout,.mc-layout *{box-sizing:border-box}.mc-layout-content{flex:auto}.mc-layout-has-sidebar{flex-direction:row}.mc-layout-has-sidebar>.mc-layout,.mc-layout-has-sidebar>.mc-layout-content{overflow-x:hidden}.mc-layout-footer,.mc-layout-header{flex:0 0 auto;padding:0 0}.mc-layout-sider{transition:all .2s;position:relative;min-width:0}.mc-layout-sider-children{height:100%;padding-top:.1px;margin-top:-.1px}.mc-layout-sider-right{order:1}"],
            template: "<ng-content></ng-content>",
            host: {
                '[class.mc-layout]': 'true',
                '[class.mc-layout-has-sidebar]': 'hasSidebar'
            },
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        })
    ], McLayoutComponent);
    return McLayoutComponent;
}());

var McSidebarComponent = /** @class */ (function () {
    function McSidebarComponent(mcLayoutComponent) {
        this.mcLayoutComponent = mcLayoutComponent;
        this._mcWidth = 200;
        this.mcCollapsedWidth = 80;
        // tslint:disable-next-line
        this.mcCollapsedChange = new core.EventEmitter();
        this.collapsed = false;
        this.collapsible = false;
    }
    Object.defineProperty(McSidebarComponent.prototype, "mcCollapsible", {
        get: function () {
            return this.collapsible;
        },
        set: function (value) {
            this.collapsible = core$1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSidebarComponent.prototype, "mcCollapsed", {
        get: function () {
            return this.collapsed;
        },
        set: function (value) {
            this.collapsed = core$1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSidebarComponent.prototype, "mcFlex", {
        get: function () {
            if (this.mcCollapsed) {
                return "0 0 " + this.mcCollapsedWidth + "px";
            }
            else {
                return "0 0 " + this.mcWidth + "px";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSidebarComponent.prototype, "mcWidth", {
        get: function () {
            if (this.mcCollapsed) {
                return this.mcCollapsedWidth;
            }
            else {
                return this._mcWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    McSidebarComponent.prototype.ngOnInit = function () {
        if (this.mcLayoutComponent) {
            this.mcLayoutComponent.hasSidebar = true;
        }
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McSidebarComponent.prototype, "_mcWidth", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McSidebarComponent.prototype, "mcCollapsedWidth", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSidebarComponent.prototype, "mcCollapsible", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSidebarComponent.prototype, "mcCollapsed", null);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McSidebarComponent.prototype, "mcCollapsedChange", void 0);
    McSidebarComponent = __decorate([
        core.Component({
            selector: 'mc-sidebar',
            preserveWhitespaces: false,
            template: "<div class=\"mc-layout-sidebar-children\"><ng-content></ng-content></div>",
            host: {
                '[class.mc-layout-sidebar]': 'true',
                '[class.mc-layout-sidebar-collapsed]': 'mcCollapsed',
                '[style.flex]': 'mcFlex',
                '[style.max-width.px]': 'mcWidth',
                '[style.min-width.px]': 'mcWidth',
                '[style.width.px]': 'mcWidth'
            },
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(0, core.Optional()), __param(0, core.Host()),
        __metadata("design:paramtypes", [McLayoutComponent])
    ], McSidebarComponent);
    return McSidebarComponent;
}());

var McLayoutModule = /** @class */ (function () {
    function McLayoutModule() {
    }
    McLayoutModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule],
            exports: [
                McLayoutComponent,
                McContentComponent,
                McFooterComponent,
                McHeaderComponent,
                McSidebarComponent
            ],
            declarations: [
                McLayoutComponent,
                McContentComponent,
                McFooterComponent,
                McHeaderComponent,
                McSidebarComponent
            ]
        })
    ], McLayoutModule);
    return McLayoutModule;
}());

exports.McContentComponent = McContentComponent;
exports.McFooterComponent = McFooterComponent;
exports.McHeaderComponent = McHeaderComponent;
exports.McLayoutComponent = McLayoutComponent;
exports.McSidebarComponent = McSidebarComponent;
exports.McLayoutModule = McLayoutModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-layout.umd.js.map

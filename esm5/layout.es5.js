/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter, Host, Input, Optional, Output, NgModule } from '@angular/core';
import { toBoolean } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

var McContentComponent = /** @class */ (function () {
    function McContentComponent() {
    }
    McContentComponent = __decorate([
        Component({
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
        Component({
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
        Component({
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
        Component({
            selector: 'mc-layout',
            preserveWhitespaces: false,
            styles: [".mc-layout{display:flex;flex-direction:column;flex:auto}.mc-layout,.mc-layout *{box-sizing:border-box}.mc-layout-content{flex:auto}.mc-layout-has-sidebar{flex-direction:row}.mc-layout-has-sidebar>.mc-layout,.mc-layout-has-sidebar>.mc-layout-content{overflow-x:hidden}.mc-layout-footer,.mc-layout-header{flex:0 0 auto;padding:0 0}.mc-layout-sider{transition:all .2s;position:relative;min-width:0}.mc-layout-sider-children{height:100%;padding-top:.1px;margin-top:-.1px}.mc-layout-sider-right{order:1}"],
            template: "<ng-content></ng-content>",
            host: {
                '[class.mc-layout]': 'true',
                '[class.mc-layout-has-sidebar]': 'hasSidebar'
            },
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], McLayoutComponent);
    return McLayoutComponent;
}());

var McSidebarComponent = /** @class */ (function () {
    function McSidebarComponent(mcLayoutComponent) {
        this.mcLayoutComponent = mcLayoutComponent;
        this._mcWidth = 200;
        this.mcCollapsedWidth = 80;
        this.mcCollapsedChange = new EventEmitter();
        this.collapsed = false;
        this.collapsible = false;
    }
    Object.defineProperty(McSidebarComponent.prototype, "mcCollapsible", {
        get: function () {
            return this.collapsible;
        },
        set: function (value) {
            this.collapsible = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSidebarComponent.prototype, "mcCollapsed", {
        get: function () {
            return this.collapsed;
        },
        set: function (value) {
            this.collapsed = toBoolean(value);
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
        Input(),
        __metadata("design:type", Object)
    ], McSidebarComponent.prototype, "_mcWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], McSidebarComponent.prototype, "mcCollapsedWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSidebarComponent.prototype, "mcCollapsible", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSidebarComponent.prototype, "mcCollapsed", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], McSidebarComponent.prototype, "mcCollapsedChange", void 0);
    McSidebarComponent = __decorate([
        Component({
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
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param(0, Optional()), __param(0, Host()),
        __metadata("design:paramtypes", [McLayoutComponent])
    ], McSidebarComponent);
    return McSidebarComponent;
}());

var McLayoutModule = /** @class */ (function () {
    function McLayoutModule() {
    }
    McLayoutModule = __decorate([
        NgModule({
            imports: [CommonModule],
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

/**
 * Generated bundle index. Do not edit.
 */

export { McContentComponent, McFooterComponent, McHeaderComponent, McLayoutComponent, McSidebarComponent, McLayoutModule };
//# sourceMappingURL=layout.es5.js.map

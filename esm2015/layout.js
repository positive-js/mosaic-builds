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

let McContentComponent = class McContentComponent {
};
McContentComponent = __decorate([
    Component({
        selector: 'mc-content',
        preserveWhitespaces: false,
        template: "<ng-content></ng-content>",
        styles: [
            `:host {
            display: block;
        }`
        ],
        host: {
            '[class.mc-layout-content]': 'true'
        }
    })
], McContentComponent);

let McFooterComponent = class McFooterComponent {
};
McFooterComponent = __decorate([
    Component({
        selector: 'mc-footer',
        preserveWhitespaces: false,
        template: "<ng-content></ng-content>",
        styles: [
            `:host {
            display: block;
        }`
        ],
        host: {
            '[class.mc-layout-footer]': 'true'
        }
    })
], McFooterComponent);

let McHeaderComponent = class McHeaderComponent {
};
McHeaderComponent = __decorate([
    Component({
        selector: 'mc-header',
        preserveWhitespaces: false,
        template: "<ng-content></ng-content>",
        styles: [
            `:host {
            display: block;
        }`
        ],
        host: {
            '[class.mc-layout-header]': 'true'
        }
    })
], McHeaderComponent);

let McLayoutComponent = class McLayoutComponent {
    constructor() {
        this.hasSidebar = false;
    }
};
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

let McSidebarComponent = class McSidebarComponent {
    constructor(mcLayoutComponent) {
        this.mcLayoutComponent = mcLayoutComponent;
        this._mcWidth = 200;
        this.mcCollapsedWidth = 80;
        this.mcCollapsedChange = new EventEmitter();
        this.collapsed = false;
        this.collapsible = false;
    }
    set mcCollapsible(value) {
        this.collapsible = toBoolean(value);
    }
    get mcCollapsible() {
        return this.collapsible;
    }
    set mcCollapsed(value) {
        this.collapsed = toBoolean(value);
    }
    get mcCollapsed() {
        return this.collapsed;
    }
    get mcFlex() {
        if (this.mcCollapsed) {
            return `0 0 ${this.mcCollapsedWidth}px`;
        }
        else {
            return `0 0 ${this.mcWidth}px`;
        }
    }
    get mcWidth() {
        if (this.mcCollapsed) {
            return this.mcCollapsedWidth;
        }
        else {
            return this._mcWidth;
        }
    }
    ngOnInit() {
        if (this.mcLayoutComponent) {
            this.mcLayoutComponent.hasSidebar = true;
        }
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

let McLayoutModule = class McLayoutModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { McContentComponent, McFooterComponent, McHeaderComponent, McLayoutComponent, McSidebarComponent, McLayoutModule };
//# sourceMappingURL=layout.js.map

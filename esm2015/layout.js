/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Component, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter, Host, Input, Optional, Output, NgModule } from '@angular/core';
import { toBoolean } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McContentComponent {
}
McContentComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McFooterComponent {
}
McFooterComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McHeaderComponent {
}
McHeaderComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McLayoutComponent {
    constructor() {
        this.hasSidebar = false;
    }
}
McLayoutComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McSidebarComponent {
    /**
     * @param {?} mcLayoutComponent
     */
    constructor(mcLayoutComponent) {
        this.mcLayoutComponent = mcLayoutComponent;
        this._mcWidth = 200;
        this.mcCollapsedWidth = 80;
        // tslint:disable-next-line
        this.mcCollapsedChange = new EventEmitter();
        this.collapsed = false;
        this.collapsible = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcCollapsible(value) {
        this.collapsible = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get mcCollapsible() {
        return this.collapsible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcCollapsed(value) {
        this.collapsed = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get mcCollapsed() {
        return this.collapsed;
    }
    /**
     * @return {?}
     */
    get mcFlex() {
        if (this.mcCollapsed) {
            return `0 0 ${this.mcCollapsedWidth}px`;
        }
        else {
            return `0 0 ${this.mcWidth}px`;
        }
    }
    /**
     * @return {?}
     */
    get mcWidth() {
        if (this.mcCollapsed) {
            return this.mcCollapsedWidth;
        }
        else {
            return this._mcWidth;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.mcLayoutComponent) {
            this.mcLayoutComponent.hasSidebar = true;
        }
    }
}
McSidebarComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];
/** @nocollapse */
McSidebarComponent.ctorParameters = () => [
    { type: McLayoutComponent, decorators: [{ type: Optional }, { type: Host }] }
];
McSidebarComponent.propDecorators = {
    _mcWidth: [{ type: Input }],
    mcCollapsedWidth: [{ type: Input }],
    mcCollapsible: [{ type: Input }],
    mcCollapsed: [{ type: Input }],
    mcCollapsedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McLayoutModule {
}
McLayoutModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McContentComponent, McFooterComponent, McHeaderComponent, McLayoutComponent, McSidebarComponent, McLayoutModule };
//# sourceMappingURL=layout.js.map

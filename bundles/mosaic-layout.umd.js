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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McContentComponent = /** @class */ (function () {
    function McContentComponent() {
    }
    McContentComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-content',
                    preserveWhitespaces: false,
                    template: "<ng-content></ng-content>",
                    styles: [
                        ":host {\n            display: block;\n        }"
                    ],
                    host: {
                        '[class.mc-layout-content]': 'true'
                    }
                },] },
    ];
    return McContentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McFooterComponent = /** @class */ (function () {
    function McFooterComponent() {
    }
    McFooterComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-footer',
                    preserveWhitespaces: false,
                    template: "<ng-content></ng-content>",
                    styles: [
                        ":host {\n            display: block;\n        }"
                    ],
                    host: {
                        '[class.mc-layout-footer]': 'true'
                    }
                },] },
    ];
    return McFooterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McHeaderComponent = /** @class */ (function () {
    function McHeaderComponent() {
    }
    McHeaderComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-header',
                    preserveWhitespaces: false,
                    template: "<ng-content></ng-content>",
                    styles: [
                        ":host {\n            display: block;\n        }"
                    ],
                    host: {
                        '[class.mc-layout-header]': 'true'
                    }
                },] },
    ];
    return McHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McLayoutComponent = /** @class */ (function () {
    function McLayoutComponent() {
        this.hasSidebar = false;
    }
    McLayoutComponent.decorators = [
        { type: core.Component, args: [{
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
                },] },
    ];
    return McLayoutComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        get: /**
         * @return {?}
         */
        function () {
            return this.collapsible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.collapsible = core$1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSidebarComponent.prototype, "mcCollapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this.collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.collapsed = core$1.toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSidebarComponent.prototype, "mcFlex", {
        get: /**
         * @return {?}
         */
        function () {
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
        get: /**
         * @return {?}
         */
        function () {
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
    /**
     * @return {?}
     */
    McSidebarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.mcLayoutComponent) {
            this.mcLayoutComponent.hasSidebar = true;
        }
    };
    McSidebarComponent.decorators = [
        { type: core.Component, args: [{
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
                },] },
    ];
    /** @nocollapse */
    McSidebarComponent.ctorParameters = function () { return [
        { type: McLayoutComponent, decorators: [{ type: core.Optional }, { type: core.Host }] }
    ]; };
    McSidebarComponent.propDecorators = {
        _mcWidth: [{ type: core.Input }],
        mcCollapsedWidth: [{ type: core.Input }],
        mcCollapsible: [{ type: core.Input }],
        mcCollapsed: [{ type: core.Input }],
        mcCollapsedChange: [{ type: core.Output }]
    };
    return McSidebarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McLayoutModule = /** @class */ (function () {
    function McLayoutModule() {
    }
    McLayoutModule.decorators = [
        { type: core.NgModule, args: [{
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
                },] },
    ];
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

/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/mosaic/icon'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/dropdown'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/vertical-navbar', ['exports', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/cdk/a11y', '@ptsecurity/mosaic/icon', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/dropdown', '@angular/animations'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.verticalNavbar = {}), global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.cdk.a11y, global.ng.mosaic.icon, global.ng.mosaic.core, global.ng.mosaic.dropdown, global.ng.animations));
}(this, (function (exports, platform, common, core, a11y, icon, core$1, dropdown, animations) { 'use strict';

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McVerticalNavbarItemIcon = /** @class */ (function () {
        function McVerticalNavbarItemIcon() {
        }
        McVerticalNavbarItemIcon.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-vertical-navbar-item-icon',
                        host: {
                            class: 'mc-vertical-navbar__item-icon'
                        }
                    },] },
        ];
        return McVerticalNavbarItemIcon;
    }());
    var McVerticalNavbarItemBadge = /** @class */ (function () {
        function McVerticalNavbarItemBadge() {
        }
        McVerticalNavbarItemBadge.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-vertical-navbar-badge',
                        template: "\n        <span class=\"mc-badge mc-badge_light\">\n            <ng-content></ng-content>\n        </span>\n    ",
                        host: {
                            class: 'mc-vertical-navbar__badge'
                        }
                    },] },
        ];
        return McVerticalNavbarItemBadge;
    }());
    var McVerticalNavbarItemBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McVerticalNavbarItemBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McVerticalNavbarItemBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McVerticalNavbarMixinBase = core$1.mixinDisabled(McVerticalNavbarItemBase);
    var McVerticalNavbarItem = /** @class */ (function (_super) {
        __extends(McVerticalNavbarItem, _super);
        function McVerticalNavbarItem(element, focusMonitor, trigger) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.focusMonitor = focusMonitor;
            _this.trigger = trigger;
            _this.tabIndex = 0;
            _this.focusMonitor.monitor(_this.element.nativeElement).subscribe();
            return _this;
        }
        Object.defineProperty(McVerticalNavbarItem.prototype, "hasDropdownAttached", {
            get: /**
             * @return {?}
             */
            function () {
                return !!this.trigger;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McVerticalNavbarItem.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.focusMonitor.stopMonitoring(this.element.nativeElement);
        };
        McVerticalNavbarItem.decorators = [
            { type: core.Component, args: [{
                        selector: 'a[mc-vertical-navbar-item], mc-vertical-navbar-item',
                        template: "<div class=\"mc-vertical-navbar__item\"><ng-content></ng-content><i *ngIf=\"hasDropdownAttached\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-vertical-navbar__item-dropdown-icon\"></i></div>",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".mc-vertical-navbar__badge{position:absolute;width:64px;top:0;left:0}.mc-vertical-navbar__badge .mc-badge{position:absolute;right:4px;top:4px}.mc-vertical-navbar__item-icon{margin-right:16px}.mc-vertical-navbar__item-icon .mc-icon{font-size:32px}.mc-vertical-navbar__title{white-space:nowrap}.mc-vertical-navbar__item-dropdown-icon{margin-left:auto;padding-left:16px}a[mc-vertical-navbar-item],mc-vertical-navbar-item{height:64px;margin:1px 0;width:100%;position:relative;display:flex;align-items:center;box-sizing:border-box;cursor:pointer;text-decoration:none}a[mc-vertical-navbar-item] .mc-vertical-navbar__item,mc-vertical-navbar-item .mc-vertical-navbar__item{padding-left:16px;padding-right:16px;display:flex;align-items:center;width:100%;height:100%}a[mc-vertical-navbar-item].mc-progress,mc-vertical-navbar-item.mc-progress{cursor:pointer}a[mc-vertical-navbar-item].mc-vertical-navbar__item_active,mc-vertical-navbar-item.mc-vertical-navbar__item_active{cursor:default}a[mc-vertical-navbar-item][disabled],mc-vertical-navbar-item[disabled]{cursor:default;pointer-events:none}"],
                        inputs: ['disabled'],
                        host: {
                            class: 'mc-vertical-navbar-item',
                            '[attr.disabled]': 'disabled || null',
                            '[attr.tabindex]': 'disabled ? -1 : 0'
                        }
                    },] },
        ];
        /** @nocollapse */
        McVerticalNavbarItem.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: a11y.FocusMonitor },
            { type: dropdown.McDropdownTrigger, decorators: [{ type: core.Optional }, { type: core.Self }] }
        ]; };
        McVerticalNavbarItem.propDecorators = {
            tabIndex: [{ type: core.Input }]
        };
        return McVerticalNavbarItem;
    }(McVerticalNavbarMixinBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function toggleVerticalNavbarAnimation() {
        return animations.trigger('toggle', [
            animations.state('0', animations.style({
                width: '64px'
            })),
            animations.state('1', animations.style({
                width: '*'
            })),
            animations.transition('0 <=> 1', animations.animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
        ]);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McVerticalNavbarHeader = /** @class */ (function () {
        function McVerticalNavbarHeader() {
        }
        McVerticalNavbarHeader.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-vertical-navbar-header, a[mc-vertical-navbar-header]',
                        host: {
                            class: 'mc-vertical-navbar__header'
                        }
                    },] },
        ];
        return McVerticalNavbarHeader;
    }());
    var McVerticalNavbarTitle = /** @class */ (function () {
        function McVerticalNavbarTitle() {
        }
        McVerticalNavbarTitle.decorators = [
            { type: core.Directive, args: [{
                        selector: 'mc-vertical-navbar-title',
                        host: {
                            class: 'mc-vertical-navbar__title'
                        }
                    },] },
        ];
        return McVerticalNavbarTitle;
    }());
    var McVerticalNavbar = /** @class */ (function () {
        function McVerticalNavbar(cd) {
            this.cd = cd;
            this.expanded = false;
        }
        /**
         * @return {?}
         */
        McVerticalNavbar.prototype.toggle = /**
         * @return {?}
         */
        function () {
            this.expanded = !this.expanded;
            this.cd.markForCheck();
        };
        McVerticalNavbar.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-vertical-navbar',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "<nav class=\"mc-vertical-navbar\" [@toggle]=\"expanded\"><div class=\"mc-vertical-navbar__header-area\"><div cdkMonitorElementFocus tabindex=\"0\" class=\"mc-vertical-navbar__toggle-button\" (click)=\"toggle()\" (keydown.space)=\"toggle()\" (keydown.enter)=\"toggle()\"><i mc-icon=\"mc-hamburger_32\" *ngIf=\"!expanded\"></i> <i mc-icon=\"mc-close-L_32\" *ngIf=\"expanded\"></i></div><div cdkMonitorSubtreeFocus *ngIf=\"expanded\"><ng-content select=\"mc-vertical-navbar-header, a[mc-vertical-navbar-header]\"></ng-content></div></div><ng-content></ng-content></nav>",
                        styles: [".mc-vertical-navbar{height:100%;position:fixed;left:0;top:0;z-index:100;display:flex;flex-direction:column;align-items:flex-start;min-height:100%;overflow:hidden}.mc-vertical-navbar .mc-vertical-navbar__header-area{display:flex;width:100%;align-items:stretch;box-sizing:border-box;min-height:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__header{display:flex;height:100%;justify-content:stretch;text-decoration:none;align-self:stretch;align-items:center}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__toggle-button{cursor:pointer;display:flex;flex:0 0 auto;justify-content:center;align-items:center;align-self:stretch;width:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__title{padding:0 16px}"],
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [
                            toggleVerticalNavbarAnimation()
                        ]
                    },] },
        ];
        /** @nocollapse */
        McVerticalNavbar.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        McVerticalNavbar.propDecorators = {
            expanded: [{ type: core.Input }]
        };
        return McVerticalNavbar;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COMPONENTS = [
        McVerticalNavbar,
        McVerticalNavbarTitle,
        McVerticalNavbarItem,
        McVerticalNavbarItemIcon,
        McVerticalNavbarItemBadge,
        McVerticalNavbarHeader
    ];
    var McVerticalNavbarModule = /** @class */ (function () {
        function McVerticalNavbarModule() {
        }
        McVerticalNavbarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            a11y.A11yModule,
                            platform.PlatformModule,
                            icon.McIconModule
                        ],
                        exports: COMPONENTS,
                        declarations: COMPONENTS
                    },] },
        ];
        return McVerticalNavbarModule;
    }());

    exports.McVerticalNavbar = McVerticalNavbar;
    exports.McVerticalNavbarHeader = McVerticalNavbarHeader;
    exports.McVerticalNavbarItem = McVerticalNavbarItem;
    exports.McVerticalNavbarItemBadge = McVerticalNavbarItemBadge;
    exports.McVerticalNavbarItemIcon = McVerticalNavbarItemIcon;
    exports.McVerticalNavbarMixinBase = McVerticalNavbarMixinBase;
    exports.McVerticalNavbarModule = McVerticalNavbarModule;
    exports.McVerticalNavbarTitle = McVerticalNavbarTitle;
    exports.ɵa23 = toggleVerticalNavbarAnimation;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-vertical-navbar.umd.js.map

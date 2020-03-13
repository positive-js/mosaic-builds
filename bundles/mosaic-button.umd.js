/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/core')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/button', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/mosaic/core'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.button = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.mosaic.core));
}(this, (function (exports, a11y, platform, common, core, core$1) { 'use strict';

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
    var McButtonCssStyler = /** @class */ (function () {
        function McButtonCssStyler(elementRef, renderer) {
            this.renderer = renderer;
            this.icons = [];
            this.nativeElement = elementRef.nativeElement;
        }
        Object.defineProperty(McButtonCssStyler.prototype, "isIconButton", {
            get: /**
             * @return {?}
             */
            function () {
                return this.icons.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McButtonCssStyler.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            /**
             * Here we had to use native selectors due to number of angular issues about ContentChildren limitations
             * https://github.com/angular/angular/issues/16299
             * https://github.com/angular/angular/issues/8563
             * https://github.com/angular/angular/issues/14769
             */
            this.icons = Array.from(this.nativeElement.querySelectorAll('.mc-icon'));
            this.addClassModificatorForIcons();
        };
        /**
         * @private
         * @return {?}
         */
        McButtonCssStyler.prototype.addClassModificatorForIcons = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var twoIcons = 2;
            var _a = this.icons, firstIconElement = _a[0], secondIconElement = _a[1];
            if (this.icons.length === 1) {
                /** @type {?} */
                var COMMENT_NODE = 8;
                if (firstIconElement.nextSibling && firstIconElement.nextSibling.nodeType !== COMMENT_NODE) {
                    this.renderer.addClass(firstIconElement, 'mc-icon_left');
                    this.renderer.addClass(this.nativeElement, 'mc-icon-button_left');
                }
                if (firstIconElement.previousSibling && firstIconElement.previousSibling.nodeType !== COMMENT_NODE) {
                    this.renderer.addClass(firstIconElement, 'mc-icon_right');
                    this.renderer.addClass(this.nativeElement, 'mc-icon-button_right');
                }
            }
            else if (this.icons.length === twoIcons) {
                this.renderer.addClass(firstIconElement, 'mc-icon_left');
                this.renderer.addClass(secondIconElement, 'mc-icon_right');
            }
        };
        McButtonCssStyler.decorators = [
            { type: core.Directive, args: [{
                        selector: 'button[mc-button], a[mc-button]',
                        host: {
                            '[class.mc-button]': '!isIconButton',
                            '[class.mc-icon-button]': 'isIconButton'
                        }
                    },] },
        ];
        /** @nocollapse */
        McButtonCssStyler.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        return McButtonCssStyler;
    }());
    var McButtonBase = /** @class */ (function () {
        // tslint:disable-next-line:naming-convention
        function McButtonBase(_elementRef) {
            this._elementRef = _elementRef;
        }
        return McButtonBase;
    }());
    // tslint:disable-next-line:naming-convention
    /** @type {?} */
    var McButtonMixinBase = core$1.mixinColor(core$1.mixinDisabled(McButtonBase));
    var McButton = /** @class */ (function (_super) {
        __extends(McButton, _super);
        function McButton(elementRef, _focusMonitor) {
            var _this = _super.call(this, elementRef) || this;
            _this._focusMonitor = _focusMonitor;
            _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
            return _this;
        }
        /**
         * @return {?}
         */
        McButton.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        };
        /**
         * @return {?}
         */
        McButton.prototype.focus = /**
         * @return {?}
         */
        function () {
            this.getHostElement().focus();
        };
        /**
         * @return {?}
         */
        McButton.prototype.getHostElement = /**
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement;
        };
        McButton.decorators = [
            { type: core.Component, args: [{
                        selector: 'button[mc-button]',
                        template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
                        styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px}.mc-icon-button{padding:5px 7px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        inputs: ['disabled', 'color'],
                        host: {
                            '[disabled]': 'disabled || null'
                        }
                    },] },
        ];
        /** @nocollapse */
        McButton.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: a11y.FocusMonitor }
        ]; };
        return McButton;
    }(McButtonMixinBase));
    var McAnchor = /** @class */ (function (_super) {
        __extends(McAnchor, _super);
        function McAnchor(focusMonitor, elementRef) {
            return _super.call(this, elementRef, focusMonitor) || this;
        }
        /**
         * @param {?} event
         * @return {?}
         */
        McAnchor.prototype.haltDisabledEvents = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.disabled) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };
        McAnchor.decorators = [
            { type: core.Component, args: [{
                        selector: 'a[mc-button]',
                        template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
                        styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px}.mc-icon-button{padding:5px 7px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        inputs: ['disabled', 'color'],
                        host: {
                            '[attr.tabindex]': 'disabled ? -1 : 0',
                            '[attr.disabled]': 'disabled || null',
                            '(click)': 'haltDisabledEvents($event)'
                        }
                    },] },
        ];
        /** @nocollapse */
        McAnchor.ctorParameters = function () { return [
            { type: a11y.FocusMonitor },
            { type: core.ElementRef }
        ]; };
        return McAnchor;
    }(McButton));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McButtonModule = /** @class */ (function () {
        function McButtonModule() {
        }
        McButtonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            a11y.A11yModule,
                            platform.PlatformModule
                        ],
                        exports: [
                            McButton,
                            McAnchor,
                            McButtonCssStyler
                        ],
                        declarations: [
                            McButton,
                            McAnchor,
                            McButtonCssStyler
                        ]
                    },] },
        ];
        return McButtonModule;
    }());

    exports.McAnchor = McAnchor;
    exports.McButton = McButton;
    exports.McButtonBase = McButtonBase;
    exports.McButtonCssStyler = McButtonCssStyler;
    exports.McButtonMixinBase = McButtonMixinBase;
    exports.McButtonModule = McButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-button.umd.js.map

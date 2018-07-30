/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/platform'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/icon'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/button', ['exports', '@angular/core', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/platform', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/icon', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.button = {}),global.ng.core,global.ng.cdk.a11y,global.ng.cdk.platform,global.ng.mosaic.core,global.ng.mosaic.icon,global.ng.common));
}(this, (function (exports,core,a11y,platform,core$1,icon,common) { 'use strict';

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
 * @suppress {checkTypes} checked by tsc
 */
var McButtonCSSStyler = /** @class */ (function () {
    function McButtonCSSStyler() {
    }
    McButtonCSSStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[mc-button], a[mc-button]',
                    host: { class: 'mc-button' }
                },] },
    ];
    return McButtonCSSStyler;
}());
var McXSButtonCSSStyler = /** @class */ (function () {
    function McXSButtonCSSStyler() {
    }
    McXSButtonCSSStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[mc-xs-button], a[mc-xs-button]',
                    host: { class: 'mc-button mc-button_xs' }
                },] },
    ];
    return McXSButtonCSSStyler;
}());
var McSMButtonCSSStyler = /** @class */ (function () {
    function McSMButtonCSSStyler() {
    }
    McSMButtonCSSStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[mc-sm-button], a[mc-sm-button]',
                    host: { class: 'mc-button mc-button_sm' }
                },] },
    ];
    return McSMButtonCSSStyler;
}());
var McLGButtonCSSStyler = /** @class */ (function () {
    function McLGButtonCSSStyler() {
    }
    McLGButtonCSSStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[mc-lg-button], a[mc-lg-button]',
                    host: { class: 'mc-button mc-button_lg' }
                },] },
    ];
    return McLGButtonCSSStyler;
}());
var McXLButtonCSSStyler = /** @class */ (function () {
    function McXLButtonCSSStyler() {
    }
    McXLButtonCSSStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[mc-xl-button], a[mc-xl-button]',
                    host: { class: 'mc-button mc-button_xl' }
                },] },
    ];
    return McXLButtonCSSStyler;
}());
var McIconButtonCSSStyler = /** @class */ (function () {
    function McIconButtonCSSStyler(elementRef) {
        this.nativeElement = elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    McIconButtonCSSStyler.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._addClassModificatorForIcons();
    };
    /**
     * @return {?}
     */
    McIconButtonCSSStyler.prototype._addClassModificatorForIcons = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ twoIcons = 2;
        var /** @type {?} */ icons = this.contentChildren.map(function (item) { return item._elementRef.nativeElement; });
        if (icons.length === 1) {
            var /** @type {?} */ iconElement = icons[0];
            if (!iconElement.previousElementSibling && !iconElement.nextElementSibling) {
                if (iconElement.nextSibling) {
                    iconElement.classList.add('mc-icon_left');
                    this.nativeElement.classList.add('mc-icon-button_left');
                }
                if (iconElement.previousSibling) {
                    iconElement.classList.add('mc-icon_right');
                    this.nativeElement.classList.add('mc-icon-button_right');
                }
            }
        }
        else if (icons.length === twoIcons) {
            var /** @type {?} */ firstIconElement = icons[0];
            var /** @type {?} */ secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    };
    McIconButtonCSSStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[mc-icon-button], a[mc-icon-button]',
                    queries: {
                        contentChildren: new core.ContentChildren(icon.McIcon)
                    },
                    host: { class: 'mc-icon-button' }
                },] },
    ];
    /** @nocollapse */
    McIconButtonCSSStyler.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    return McIconButtonCSSStyler;
}());
var McButtonBase = /** @class */ (function () {
    function McButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McButtonBase;
}());
var /** @type {?} */ _McButtonMixinBase = core$1.mixinColor(core$1.mixinDisabled(McButtonBase));
var McButton = /** @class */ (function (_super) {
    __extends(McButton, _super);
    function McButton(elementRef, _platform, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this._platform = _platform;
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
        this._getHostElement().focus();
    };
    /**
     * @return {?}
     */
    McButton.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    McButton.decorators = [
        { type: core.Component, args: [{
                    selector: "\n        button[mc-button],\n        button[mc-xs-button],\n        button[mc-sm-button],\n        button[mc-lg-button],\n        button[mc-xl-button]\n    ",
                    template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
                    styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:15px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
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
        { type: core.ElementRef, },
        { type: platform.Platform, },
        { type: a11y.FocusMonitor, },
    ]; };
    return McButton;
}(_McButtonMixinBase));
var McAnchor = /** @class */ (function (_super) {
    __extends(McAnchor, _super);
    function McAnchor(platform$$1, focusMonitor, elementRef) {
        return _super.call(this, elementRef, platform$$1, focusMonitor) || this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    McAnchor.prototype._haltDisabledEvents = /**
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
                    selector: 'a[mc-button], a[mc-xs-button], a[mc-sm-button], a[mc-lg-button], a[mc-xl-button]',
                    template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
                    styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:15px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    inputs: ['disabled', 'color'],
                    host: {
                        '[attr.tabindex]': 'disabled ? -1 : 0',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': '_haltDisabledEvents($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    McAnchor.ctorParameters = function () { return [
        { type: platform.Platform, },
        { type: a11y.FocusMonitor, },
        { type: core.ElementRef, },
    ]; };
    return McAnchor;
}(McButton));
var McIconButton = /** @class */ (function (_super) {
    __extends(McIconButton, _super);
    function McIconButton(platform$$1, focusMonitor, elementRef) {
        return _super.call(this, elementRef, platform$$1, focusMonitor) || this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    McIconButton.prototype._haltDisabledEvents = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    McIconButton.decorators = [
        { type: core.Component, args: [{
                    selector: 'button[mc-icon-button]',
                    template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
                    styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:15px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    inputs: ['disabled', 'color'],
                    host: {
                        '[attr.tabindex]': 'disabled ? -1 : 0',
                        '[attr.disabled]': 'disabled || null'
                    }
                },] },
    ];
    /** @nocollapse */
    McIconButton.ctorParameters = function () { return [
        { type: platform.Platform, },
        { type: a11y.FocusMonitor, },
        { type: core.ElementRef, },
    ]; };
    return McIconButton;
}(McButton));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
                        McIconButton,
                        McButtonCSSStyler,
                        McXSButtonCSSStyler,
                        McSMButtonCSSStyler,
                        McLGButtonCSSStyler,
                        McXLButtonCSSStyler,
                        McIconButtonCSSStyler
                    ],
                    declarations: [
                        McButton,
                        McAnchor,
                        McIconButton,
                        McButtonCSSStyler,
                        McXSButtonCSSStyler,
                        McSMButtonCSSStyler,
                        McLGButtonCSSStyler,
                        McXLButtonCSSStyler,
                        McIconButtonCSSStyler
                    ]
                },] },
    ];
    return McButtonModule;
}());

exports.McButtonModule = McButtonModule;
exports.McButtonCSSStyler = McButtonCSSStyler;
exports.McXSButtonCSSStyler = McXSButtonCSSStyler;
exports.McSMButtonCSSStyler = McSMButtonCSSStyler;
exports.McLGButtonCSSStyler = McLGButtonCSSStyler;
exports.McXLButtonCSSStyler = McXLButtonCSSStyler;
exports.McIconButtonCSSStyler = McIconButtonCSSStyler;
exports.McButtonBase = McButtonBase;
exports._McButtonMixinBase = _McButtonMixinBase;
exports.McButton = McButton;
exports.McAnchor = McAnchor;
exports.McIconButton = McIconButton;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-button.umd.js.map

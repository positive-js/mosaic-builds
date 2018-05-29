/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/bidi'), require('@angular/common'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/platform'), require('@angular/forms'), require('@ptsecurity/cdk/collections'), require('rxjs'), require('@ptsecurity/cdk/keycodes')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic', ['exports', '@angular/core', '@ptsecurity/cdk/bidi', '@angular/common', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/platform', '@angular/forms', '@ptsecurity/cdk/collections', 'rxjs', '@ptsecurity/cdk/keycodes'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = {}),global.ng.core,global.ng.cdk.bidi,global.ng.common,global.ng.cdk.a11y,global.ng.cdk.platform,global.ng.forms,global.ng.cdk.collections,global.rxjs,global.ng.cdk.keycodes));
}(this, (function (exports,core,bidi,common,a11y,platform,forms,collections,rxjs,keycodes) { 'use strict';

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

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} val
 * @return {?}
 */
function isBoolean(val) { return typeof val === 'boolean'; }
/**
 * @param {?} value
 * @return {?}
 */
function toBoolean(value) {
    return value != null && "" + value !== 'false';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Injection token that configures whether the Mosaic sanity checks are enabled.
var /** @type {?} */ MС_SANITY_CHECKS = new core.InjectionToken('mc-sanity-checks', {
    providedIn: 'root',
    factory: MC_SANITY_CHECKS_FACTORY
});
/**
 * @return {?}
 */
function MC_SANITY_CHECKS_FACTORY() {
    return true;
}
/**
 * Module that captures anything that should be loaded and/or run for *all* Mosaic
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
var McCommonModule = /** @class */ (function () {
    function McCommonModule(_sanityChecksEnabled) {
        this._sanityChecksEnabled = _sanityChecksEnabled;
        this._hasDoneGlobalChecks = false;
        this._document = typeof document === 'object' && document ? document : null;
        this._window = typeof window === 'object' && window ? window : null;
        if (this._areChecksEnabled() && !this._hasDoneGlobalChecks) {
            this._checkDoctypeIsDefined();
            this._checkThemeIsPresent();
            this._hasDoneGlobalChecks = true;
        }
    }
    /**
     * @return {?}
     */
    McCommonModule.prototype._areChecksEnabled = /**
     * @return {?}
     */
    function () {
        return this._sanityChecksEnabled && core.isDevMode() && !this._isTestEnv();
    };
    /**
     * @return {?}
     */
    McCommonModule.prototype._isTestEnv = /**
     * @return {?}
     */
    function () {
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    };
    /**
     * @return {?}
     */
    McCommonModule.prototype._checkDoctypeIsDefined = /**
     * @return {?}
     */
    function () {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Mosaic components not to behave as expected.');
        }
    };
    /**
     * @return {?}
     */
    McCommonModule.prototype._checkThemeIsPresent = /**
     * @return {?}
     */
    function () {
        if (this._document && typeof getComputedStyle === 'function') {
            var /** @type {?} */ testElement = this._document.createElement('div');
            testElement.classList.add('mc-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            var /** @type {?} */ computedStyle = getComputedStyle(testElement);
            // In some situations, the computed style of the test element can be null. For example in
            // Firefox, the computed style is null if an application is running inside of a hidden iframe.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
            if (computedStyle && computedStyle.display !== 'none') {
                console.warn('Could not find Mosaic core theme. Most Mosaic ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: link there');
            }
            this._document.body.removeChild(testElement);
        }
    };
    McCommonModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [bidi.BidiModule],
                    exports: [bidi.BidiModule]
                },] },
    ];
    /** @nocollapse */
    McCommonModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MС_SANITY_CHECKS,] },] },
    ]; };
    return McCommonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 * @param {?} base
 * @return {?}
 */
function mixinDisabled(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._disabled = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = toBoolean(value);
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var ThemePalette = {
    Primary: 'primary',
    Second: 'second',
    Warn: 'warn',
    Default: 'second',
};
/**
 * Mixin to augment a directive with a `color` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultColor
 * @return {?}
 */
function mixinColor(base, defaultColor) {
    if (defaultColor === void 0) { defaultColor = ThemePalette.Default; }
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            // Set the default color that can be specified from the mixin.
            // Set the default color that can be specified from the mixin.
            _this.color = defaultColor;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "color", {
            get: /**
             * @return {?}
             */
            function () {
                return this._color;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var /** @type {?} */ colorPalette = value || defaultColor;
                if (colorPalette !== this._color) {
                    if (this._color) {
                        this._elementRef.nativeElement.classList.remove("mc-" + this._color);
                    }
                    if (colorPalette) {
                        this._elementRef.nativeElement.classList.add("mc-" + colorPalette);
                    }
                    this._color = colorPalette;
                }
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 * @param {?} base
 * @param {?=} defaultTabIndex
 * @return {?}
 */
function mixinTabIndex(base, defaultTabIndex) {
    if (defaultTabIndex === void 0) { defaultTabIndex = 0; }
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._tabIndex = defaultTabIndex;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "tabIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this.disabled ? -1 : this._tabIndex;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._tabIndex = value != null ? value : defaultTabIndex;
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
var McLine = /** @class */ (function () {
    function McLine() {
    }
    McLine.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-line], [mcLine]',
                    host: { class: 'mc-line' }
                },] },
    ];
    return McLine;
}());
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
var   /**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
McLineSetter = /** @class */ (function () {
    function McLineSetter(_lines, _element) {
        var _this = this;
        this._lines = _lines;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    McLineSetter.prototype._setLineClass = /**
     * @param {?} count
     * @return {?}
     */
    function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mc-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mc-multi-line", true);
        }
    };
    /**
     * @return {?}
     */
    McLineSetter.prototype._resetClasses = /**
     * @return {?}
     */
    function () {
        this._setClass('mc-2-line', false);
        this._setClass('mc-3-line', false);
        this._setClass('mc-multi-line', false);
    };
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    McLineSetter.prototype._setClass = /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    function (className, isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add(className);
        }
        else {
            this._element.nativeElement.classList.remove(className);
        }
    };
    return McLineSetter;
}());
var McLineModule = /** @class */ (function () {
    function McLineModule() {
    }
    McLineModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [McCommonModule],
                    exports: [McLine, McCommonModule],
                    declarations: [McLine]
                },] },
    ];
    return McLineModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `mc-primary .mc-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<mc-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * \@docs-private
 */
var McPseudoCheckbox = /** @class */ (function () {
    function McPseudoCheckbox() {
        // Display state of the checkbox.
        this.state = 'unchecked';
        // Whether the checkbox is disabled.
        this.disabled = false;
    }
    McPseudoCheckbox.decorators = [
        { type: core.Component, args: [{
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    selector: 'mc-pseudo-checkbox',
                    styles: [""],
                    template: '',
                    host: {
                        class: 'mc-pseudo-checkbox',
                        '[class.mc-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                        '[class.mc-pseudo-checkbox-checked]': 'state === "checked"',
                        '[class.mc-pseudo-checkbox-disabled]': 'disabled'
                    }
                },] },
    ];
    /** @nocollapse */
    McPseudoCheckbox.propDecorators = {
        "state": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
    };
    return McPseudoCheckbox;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McPseudoCheckboxModule = /** @class */ (function () {
    function McPseudoCheckboxModule() {
    }
    McPseudoCheckboxModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [McPseudoCheckbox],
                    declarations: [McPseudoCheckbox]
                },] },
    ];
    return McPseudoCheckboxModule;
}());

var McIconBase = /** @class */ (function () {
    function McIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McIconBase;
}());
var /** @type {?} */ _McIconMixinBase = mixinColor(McIconBase);
var McIcon = /** @class */ (function (_super) {
    __extends(McIcon, _super);
    function McIcon(elementRef, iconName) {
        var _this = _super.call(this, elementRef) || this;
        elementRef.nativeElement.classList.add(iconName);
        return _this;
    }
    /**
     * @return {?}
     */
    McIcon.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    McIcon.decorators = [
        { type: core.Component, args: [{
                    selector: "[mc-icon]",
                    template: '<ng-content></ng-content>',
                    styles: [""],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    McIcon.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: undefined, decorators: [{ type: core.Attribute, args: ['mc-icon',] },] },
    ]; };
    return McIcon;
}(_McIconMixinBase));

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
                        contentChildren: new core.ContentChildren(McIcon)
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
var /** @type {?} */ _McButtonMixinBase = mixinColor(mixinDisabled(McButtonBase));
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
                    styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px;font-size:inherit;font-weight:500}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:14px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:14px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
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
                    styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px;font-size:inherit;font-weight:500}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:14px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:14px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
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
                    styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px;font-size:inherit;font-weight:500}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:14px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:14px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McDivider = /** @class */ (function () {
    function McDivider() {
        this._vertical = false;
        this._inset = false;
    }
    Object.defineProperty(McDivider.prototype, "vertical", {
        get: /**
         * @return {?}
         */
        function () {
            return this._vertical;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._vertical = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDivider.prototype, "inset", {
        get: /**
         * @return {?}
         */
        function () {
            return this._inset;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._inset = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    McDivider.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-divider',
                    host: {
                        class: 'mc-divider',
                        role: 'separator',
                        '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                        '[class.mc-divider-vertical]': 'vertical',
                        '[class.mc-divider-inset]': 'inset'
                    },
                    template: '',
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}"],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                },] },
    ];
    /** @nocollapse */
    McDivider.propDecorators = {
        "vertical": [{ type: core.Input },],
        "inset": [{ type: core.Input },],
    };
    return McDivider;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McDividerModule = /** @class */ (function () {
    function McDividerModule() {
    }
    McDividerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        McCommonModule,
                        common.CommonModule
                    ],
                    exports: [
                        McDivider,
                        McCommonModule
                    ],
                    declarations: [
                        McDivider
                    ]
                },] },
    ];
    return McDividerModule;
}());

// Increasing integer for generating unique ids for radio components.
var nextUniqueId = 0;
/** Change event object emitted by McRadio. */
var   /** Change event object emitted by McRadio. */
McRadioChange = /** @class */ (function () {
    function McRadioChange(/** The McRadioButton that emits the change event. */
    source, /** The value of the McRadioButton. */
    value) {
        this.source = source;
        this.value = value;
    }
    return McRadioChange;
}());
// Boilerplate for applying mixins to McRadioGroup.
/** @docs-private */
var   
// Boilerplate for applying mixins to McRadioGroup.
/** @docs-private */
McRadioGroupBase = /** @class */ (function () {
    function McRadioGroupBase() {
    }
    return McRadioGroupBase;
}());
var _McRadioGroupMixinBase = mixinDisabled(McRadioGroupBase);
/**
 * Provider Expression that allows mc-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
var MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return McRadioGroup; }),
    multi: true
};
var McRadioGroup = /** @class */ (function (_super) {
    __extends(McRadioGroup, _super);
    function McRadioGroup(_changeDetector) {
        var _this = _super.call(this) || this;
        _this._changeDetector = _changeDetector;
        /**
             * Event emitted when the group value changes.
             * Change events are only emitted when the value changes due to user interaction with
             * a radio button (the same behavior as `<input type-"radio">`).
             */
        _this.change = new core.EventEmitter();
        /**
             * Selected value for group. Should equal the value of the selected radio button if there *is*
             * a corresponding radio button with a matching value. If there is *not* such a corresponding
             * radio button, this value persists to be applied in case a new radio button is added with a
             * matching value.
             */
        _this._value = null;
        /** The HTML name attribute applied to radio buttons in this group. */
        _this._name = "mc-radio-group-" + nextUniqueId++;
        /** The currently selected radio button. Should match value. */
        _this._selected = null;
        /** Whether the `value` has been set to its initial value. */
        _this._isInitialized = false;
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        _this._labelPosition = 'after';
        /** Whether the radio group is disabled. */
        _this._disabled = false;
        /** Whether the radio group is required. */
        _this._required = false;
        /** The method to be called in order to update ngModel */
        _this.controlValueAccessorChangeFn = function () { };
        /**
             * onTouch function registered via registerOnTouch (ControlValueAccessor).
             * @docs-private
             */
        _this.onTouched = function () { };
        return _this;
    }
    Object.defineProperty(McRadioGroup.prototype, "name", {
        get: /** Name of the radio button group. All radio buttons inside this group will use this name. */
        function () { return this._name; },
        set: function (value) {
            this._name = value;
            this.updateRadioButtonNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "labelPosition", {
        get: /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        function () {
            return this._labelPosition;
        },
        set: function (v) {
            this._labelPosition = v === 'before' ? 'before' : 'after';
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "value", {
        get: /** Value of the radio button. */
        function () { return this._value; },
        set: function (newValue) {
            if (this._value !== newValue) {
                // Set this before proceeding to ensure no circular loop occurs with selection.
                this._value = newValue;
                this.updateSelectedRadioFromValue();
                this.checkSelectedRadioButton();
            }
        },
        enumerable: true,
        configurable: true
    });
    McRadioGroup.prototype.checkSelectedRadioButton = function () {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    };
    Object.defineProperty(McRadioGroup.prototype, "selected", {
        get: /** Whether the radio button is selected. */
        function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            this.checkSelectedRadioButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "disabled", {
        get: /** Whether the radio group is disabled */
        function () { return this._disabled; },
        set: function (value) {
            this._disabled = toBoolean(value);
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "required", {
        get: /** Whether the radio group is required */
        function () { return this._required; },
        set: function (value) {
            this._required = toBoolean(value);
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    /**
         * Initialize properties once content children are available.
         * This allows us to propagate relevant attributes to associated buttons.
         */
    McRadioGroup.prototype.ngAfterContentInit = /**
         * Initialize properties once content children are available.
         * This allows us to propagate relevant attributes to associated buttons.
         */
    function () {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on McRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the McRadioGroup.
        this._isInitialized = true;
    };
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    /**
         * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
         * radio buttons upon their blur.
         */
    McRadioGroup.prototype.touch = /**
         * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
         * radio buttons upon their blur.
         */
    function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    /** Dispatch change event with current selection and group value. */
    /** Dispatch change event with current selection and group value. */
    McRadioGroup.prototype.emitChangeEvent = /** Dispatch change event with current selection and group value. */
    function () {
        if (this._isInitialized) {
            this.change.emit(new McRadioChange((this._selected), this._value));
        }
    };
    McRadioGroup.prototype.markRadiosForCheck = function () {
        if (this._radios) {
            this._radios.forEach(function (radio) { return radio.markForCheck(); });
        }
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param value
         */
    McRadioGroup.prototype.writeValue = /**
         * Sets the model value. Implemented as part of ControlValueAccessor.
         * @param value
         */
    function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    /**
         * Registers a callback to be triggered when the model value changes.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
    McRadioGroup.prototype.registerOnChange = /**
         * Registers a callback to be triggered when the model value changes.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
    function (fn) {
        this.controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    /**
         * Registers a callback to be triggered when the control is touched.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
    McRadioGroup.prototype.registerOnTouched = /**
         * Registers a callback to be triggered when the control is touched.
         * Implemented as part of ControlValueAccessor.
         * @param fn Callback to be registered.
         */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    /**
         * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
         * @param isDisabled Whether the control should be disabled.
         */
    McRadioGroup.prototype.setDisabledState = /**
         * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
         * @param isDisabled Whether the control should be disabled.
         */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    };
    McRadioGroup.prototype.updateRadioButtonNames = function () {
        var _this = this;
        if (this._radios) {
            this._radios.forEach(function (radio) {
                radio.name = _this.name;
            });
        }
    };
    /** Updates the `selected` radio button from the internal _value state. */
    /** Updates the `selected` radio button from the internal _value state. */
    McRadioGroup.prototype.updateSelectedRadioFromValue = /** Updates the `selected` radio button from the internal _value state. */
    function () {
        var _this = this;
        // If the value already matches the selected radio, do nothing.
        var isAlreadySelected = this._selected != null && this._selected.value === this._value;
        if (this._radios != null && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(function (radio) {
                radio.checked = _this.value === radio.value;
                if (radio.checked) {
                    _this._selected = radio;
                }
            });
        }
    };
    McRadioGroup.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-radio-group',
                    exportAs: 'mcRadioGroup',
                    providers: [MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'radiogroup',
                        'class': 'mc-radio-group'
                    },
                    inputs: ['disabled']
                },] },
    ];
    /** @nocollapse */
    McRadioGroup.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef, },
    ]; };
    McRadioGroup.propDecorators = {
        "change": [{ type: core.Output },],
        "_radios": [{ type: core.ContentChildren, args: [core.forwardRef(function () { return McRadioButton; }), { descendants: true },] },],
        "name": [{ type: core.Input },],
        "labelPosition": [{ type: core.Input },],
        "value": [{ type: core.Input },],
        "selected": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
        "required": [{ type: core.Input },],
    };
    return McRadioGroup;
}(_McRadioGroupMixinBase));
// Boilerplate for applying mixins to McRadioButton.
/** @docs-private */
var   
// Boilerplate for applying mixins to McRadioButton.
/** @docs-private */
McRadioButtonBase = /** @class */ (function () {
    function McRadioButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McRadioButtonBase;
}());
var _McRadioButtonMixinBase = mixinColor(mixinTabIndex(McRadioButtonBase));
var McRadioButton = /** @class */ (function (_super) {
    __extends(McRadioButton, _super);
    function McRadioButton(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetector = _changeDetector;
        _this._focusMonitor = _focusMonitor;
        _this._radioDispatcher = _radioDispatcher;
        _this._uniqueId = "mc-radio-" + ++nextUniqueId;
        /* tslint:disable:member-ordering */
        /** The unique ID for the radio button. */
        _this.id = _this._uniqueId;
        /**
             * Event emitted when the checked state of this radio button changes.
             * Change events are only emitted when the value changes due to user interaction with
             * the radio button (the same behavior as `<input type-"radio">`).
             */
        _this.change = new core.EventEmitter();
        /** Whether this radio is checked. */
        _this._checked = false;
        /** Value assigned to this radio. */
        _this._value = null;
        /** Unregister function for _radioDispatcher */
        _this.removeUniqueSelectionListener = function () { };
        _this.radioGroup = radioGroup;
        _this.removeUniqueSelectionListener =
            _radioDispatcher.listen(function (id, name) {
                if (id !== _this.id && name === _this.name) {
                    _this.checked = false;
                }
            });
        return _this;
    }
    Object.defineProperty(McRadioButton.prototype, "checked", {
        get: /** Whether this radio button is checked. */
        function () { return this._checked; },
        set: function (value) {
            var newCheckedState = toBoolean(value);
            if (this._checked !== newCheckedState) {
                this._checked = newCheckedState;
                if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                    this.radioGroup.selected = this;
                }
                else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                    // When unchecking the selected radio button, update the selected radio
                    // property on the group.
                    this.radioGroup.selected = null;
                }
                if (newCheckedState) {
                    // Notify all radio buttons with the same name to un-check.
                    this._radioDispatcher.notify(this.id, this.name);
                }
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "value", {
        get: /** The value of this radio button. */
        function () { return this._value; },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                if (this.radioGroup != null) {
                    if (!this.checked) {
                        // Update checked when the value changed to match the radio group's value
                        this.checked = this.radioGroup.value === value;
                    }
                    if (this.checked) {
                        this.radioGroup.selected = this;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "disabled", {
        get: /** Whether the radio button is disabled. */
        function () {
            return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
        },
        set: function (value) {
            var newDisabledState = toBoolean(value);
            if (this._disabled !== newDisabledState) {
                this._disabled = newDisabledState;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "required", {
        get: /** Whether the radio button is required. */
        function () {
            return this._required || (this.radioGroup && this.radioGroup.required);
        },
        set: function (value) {
            this._required = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "labelPosition", {
        get: /** Whether the label should appear after or before the radio button. Defaults to 'after' */
        function () {
            return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
        },
        set: function (value) {
            this._labelPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "inputId", {
        /** ID of the native input element inside `<mc-radio-button>` */
        get: /** ID of the native input element inside `<mc-radio-button>` */
        function () { return (this.id || this._uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    McRadioButton.prototype.ngOnInit = function () {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    };
    McRadioButton.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._focusMonitor
            .monitor(this._inputElement.nativeElement)
            .subscribe(function (focusOrigin) { return _this.onInputFocusChange(focusOrigin); });
    };
    McRadioButton.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
        this.removeUniqueSelectionListener();
    };
    /** Focuses the radio button. */
    /** Focuses the radio button. */
    McRadioButton.prototype.focus = /** Focuses the radio button. */
    function () {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    };
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    /**
         * Marks the radio button as needing checking for change detection.
         * This method is exposed because the parent radio group will directly
         * update bound properties of the radio button.
         */
    McRadioButton.prototype.markForCheck = /**
         * Marks the radio button as needing checking for change detection.
         * This method is exposed because the parent radio group will directly
         * update bound properties of the radio button.
         */
    function () {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    };
    McRadioButton.prototype.onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    McRadioButton.prototype.onInputChange = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        var groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this.emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup.controlValueAccessorChangeFn(this.value);
            this.radioGroup.touch();
            if (groupValueChanged) {
                this.radioGroup.emitChangeEvent();
            }
        }
    };
    /** Dispatch change event with current value. */
    /** Dispatch change event with current value. */
    McRadioButton.prototype.emitChangeEvent = /** Dispatch change event with current value. */
    function () {
        this.change.emit(new McRadioChange(this, this._value));
    };
    /** Function is called whenever the focus changes for the input element. */
    /** Function is called whenever the focus changes for the input element. */
    McRadioButton.prototype.onInputFocusChange = /** Function is called whenever the focus changes for the input element. */
    function (focusOrigin) {
        if (!focusOrigin && this.radioGroup) {
            this.radioGroup.touch();
        }
    };
    McRadioButton.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-radio-button',
                    template: "<label [attr.for]=\"inputId\" class=\"mc-radio-label\" #label><div class=\"mc-radio-container\"><div class=\"mc-radio-inner-circle\"></div><div class=\"mc-radio-outer-circle\"></div></div><input #input class=\"mc-radio-input cdk-visually-hidden\" type=\"radio\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [tabIndex]=\"tabIndex\" [attr.name]=\"name\" [required]=\"required\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-describedby]=\"ariaDescribedby\" (change)=\"onInputChange($event)\" (click)=\"onInputClick($event)\"><div class=\"mc-radio-label-content\" [class.mc-radio-label-before]=\"labelPosition == 'before'\"><span style=\"display:none\">&nbsp;</span><ng-content></ng-content></div></label>",
                    styles: [".mc-radio-button{display:inline-block}.mc-radio-label{cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle}.mc-radio-container{box-sizing:border-box;display:inline-block;position:relative;width:16px;height:16px;flex-shrink:0}.mc-radio-outer-circle{box-sizing:border-box;height:16px;left:0;position:absolute;top:0;width:16px;border-width:1px;border-style:solid;border-radius:50%}.mc-radio-inner-circle{border-radius:50%;box-sizing:border-box;height:16px;left:0;position:absolute;top:0;width:16px}.mc-radio-checked .mc-radio-inner-circle:before{content:'';display:block;position:absolute;width:6px;height:6px;margin-left:5px;margin-top:5px;border-radius:50%}.mc-radio-label-content{display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .mc-radio-label-content{padding-right:8px;padding-left:0}.mc-radio-disabled,.mc-radio-disabled .mc-radio-label{cursor:default}"],
                    inputs: ['color', 'tabIndex'],
                    encapsulation: core.ViewEncapsulation.None,
                    exportAs: 'mcRadioButton',
                    host: {
                        'class': 'mc-radio-button',
                        '[attr.id]': 'id',
                        '[class.mc-radio-checked]': 'checked',
                        '[class.mc-radio-disabled]': 'disabled',
                        '(focus)': '_inputElement.nativeElement.focus()'
                    },
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McRadioButton.ctorParameters = function () { return [
        { type: McRadioGroup, decorators: [{ type: core.Optional },] },
        { type: core.ElementRef, },
        { type: core.ChangeDetectorRef, },
        { type: a11y.FocusMonitor, },
        { type: collections.UniqueSelectionDispatcher, },
    ]; };
    McRadioButton.propDecorators = {
        "id": [{ type: core.Input },],
        "name": [{ type: core.Input },],
        "ariaLabel": [{ type: core.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: core.Input, args: ['aria-labelledby',] },],
        "ariaDescribedby": [{ type: core.Input, args: ['aria-describedby',] },],
        "checked": [{ type: core.Input },],
        "value": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
        "required": [{ type: core.Input },],
        "labelPosition": [{ type: core.Input },],
        "_inputElement": [{ type: core.ViewChild, args: ['input',] },],
        "change": [{ type: core.Output },],
    };
    return McRadioButton;
}(_McRadioButtonMixinBase));

var McRadioModule = /** @class */ (function () {
    function McRadioModule() {
    }
    McRadioModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, a11y.A11yModule, McCommonModule],
                    exports: [McRadioGroup, McRadioButton, McCommonModule],
                    declarations: [McRadioGroup, McRadioButton]
                },] },
    ];
    return McRadioModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
var McListOption = /** @class */ (function () {
    function McListOption(_element, _changeDetector, listSelection) {
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.listSelection = listSelection;
        this._hasFocus = false;
        // Whether the label should appear before or after the checkbox. Defaults to 'after'
        this.checkboxPosition = 'after';
        this._selected = false;
        this._disabled = false;
    }
    Object.defineProperty(McListOption.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled || (this.listSelection && this.listSelection.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListOption.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this.listSelection.selectedOptions && this.listSelection.selectedOptions.isSelected(this) || false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ isSelected = toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                this.listSelection._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McListOption.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._selected) {
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            var /** @type {?} */ wasSelected_1 = this._selected;
            Promise.resolve().then(function () {
                if (_this._selected || wasSelected_1) {
                    _this.selected = true;
                    _this._changeDetector.markForCheck();
                }
            });
        }
    };
    /**
     * @return {?}
     */
    McListOption.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._lineSetter = new McLineSetter(this._lines, this._element);
    };
    /**
     * @return {?}
     */
    McListOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(function () { return _this.selected = false; });
        }
        this.listSelection._removeOptionFromList(this);
    };
    /**
     * @return {?}
     */
    McListOption.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
    };
    /**
     * @return {?}
     */
    McListOption.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    McListOption.prototype.getLabel = /**
     * @return {?}
     */
    function () {
        return this._text ? this._text.nativeElement.textContent : '';
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    McListOption.prototype.setSelected = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (this._selected === selected) {
            return;
        }
        this._selected = selected;
        if (!this.listSelection.selectedOptions) {
            return;
        }
        if (selected) {
            this.listSelection.selectedOptions.select(this);
        }
        else {
            this.listSelection.selectedOptions.deselect(this);
        }
        this._changeDetector.markForCheck();
    };
    /**
     * @return {?}
     */
    McListOption.prototype._getHeight = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement.getClientRects()[0].height;
    };
    /**
     * @return {?}
     */
    McListOption.prototype._handleClick = /**
     * @return {?}
     */
    function () {
        if (this.disabled || this.listSelection.autoSelect) {
            return;
        }
        this.toggle();
        // Emit a change event if the selected state of the option changed through user interaction.
        this.listSelection._emitChangeEvent(this);
    };
    /**
     * @return {?}
     */
    McListOption.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this._hasFocus = true;
        this.listSelection.setFocusedOption(this);
    };
    /**
     * @return {?}
     */
    McListOption.prototype._handleBlur = /**
     * @return {?}
     */
    function () {
        this._hasFocus = false;
        this.listSelection._onTouched();
    };
    /**
     * @return {?}
     */
    McListOption.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    McListOption.decorators = [
        { type: core.Component, args: [{
                    exportAs: 'mcListOption',
                    selector: 'mc-list-option',
                    host: {
                        tabindex: '-1',
                        class: 'mc-list-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': '_hasFocus',
                        '[class.mc-list-option-disabled]': 'disabled',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()',
                        '(click)': '_handleClick()'
                    },
                    template: "<div class=\"mc-list-item-content\"><div class=\"mc-list-text\" #text><ng-content></ng-content></div></div>",
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McListOption.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.ChangeDetectorRef, },
        { type: McListSelection, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return McListSelection; }),] },] },
    ]; };
    McListOption.propDecorators = {
        "_lines": [{ type: core.ContentChildren, args: [McLine,] },],
        "_text": [{ type: core.ViewChild, args: ['text',] },],
        "checkboxPosition": [{ type: core.Input },],
        "value": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
        "selected": [{ type: core.Input },],
    };
    return McListOption;
}());
var /** @type {?} */ MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return McListSelection; }),
    multi: true
};
var McListSelectionChange = /** @class */ (function () {
    function McListSelectionChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McListSelectionChange;
}());
var McListSelectionBase = /** @class */ (function () {
    function McListSelectionBase() {
    }
    return McListSelectionBase;
}());
var /** @type {?} */ _McListSelectionMixinBase = mixinDisabled(McListSelectionBase);
var McListSelection = /** @class */ (function (_super) {
    __extends(McListSelection, _super);
    function McListSelection(_element, tabIndex, autoSelect, noUnselect, multiple) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this.horizontal = false;
        // Emits a change event whenever the selected state of an option changes.
        _this.selectionChange = new core.EventEmitter();
        _this.selectedOptions = new collections.SelectionModel(true);
        _this._scrollSize = 0;
        _this._modelChanges = rxjs.Subscription.EMPTY;
        // View to model callback that should be called if the list or its options lost focus.
        _this._onTouched = function () { };
        _this._onChange = function (_) { };
        _this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        _this.multiple = multiple === null ? true : toBoolean(multiple);
        _this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    /**
     * @return {?}
     */
    McListSelection.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.horizontal = toBoolean(this.horizontal);
        this._keyManager = new a11y.FocusKeyManager(this.options)
            .withTypeAhead()
            .withHorizontalOrientation(this.horizontal ? 'ltr' : null)
            .withVerticalOrientation(!this.horizontal);
        if (this._tempValues) {
            this._setOptionsFromValues(this._tempValues);
            this._tempValues = null;
        }
        // this.selectedOptions = new SelectionModel<McListOption>(this.multiple);
        // непонятна целесообразность сего
        // Sync external changes to the model back to the options.
        this._modelChanges = /** @type {?} */ ((this.selectedOptions.onChange)).subscribe(function (event) {
            if (event.added) {
                for (var _i = 0, _a = event.added; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.selected = true;
                }
            }
            if (event.removed) {
                for (var _b = 0, _c = event.removed; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.selected = false;
                }
            }
        });
        this.updateScrollSize();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // непонятна целесообразность сего
        this._modelChanges.unsubscribe();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        this.options.forEach(function (option) { return option.setSelected(true); });
        this._reportValueChange();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        this.options.forEach(function (option) { return option.setSelected(false); });
        this._reportValueChange();
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.updateScrollSize = /**
     * @return {?}
     */
    function () {
        if (this.horizontal || !this.options.first) {
            return;
        }
        this._scrollSize = Math.floor(this._getHeight() / this.options.first._getHeight());
    };
    // Sets the focused option of the selection-list.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype.setFocusedOption = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this._keyManager.updateActiveItemIndex(this._getOptionIndex(option));
        if (this.autoSelect) {
            this.options.forEach(function (item) { return item.setSelected(false); });
            option.setSelected(true);
            this._emitChangeEvent(option);
            this._reportValueChange();
        }
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} values
     * @return {?}
     */
    McListSelection.prototype.writeValue = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McListSelection.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    McListSelection.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as a part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McListSelection.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (this.options) {
            this.options.forEach(function (option) { return option.disabled = isDisabled; });
        }
    };
    /**
     * @return {?}
     */
    McListSelection.prototype.getSelectedOptionValues = /**
     * @return {?}
     */
    function () {
        return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
    };
    // Toggles the selected state of the currently focused option.
    /**
     * @return {?}
     */
    McListSelection.prototype.toggleFocusedOption = /**
     * @return {?}
     */
    function () {
        if (this.noUnselect && this.selectedOptions.selected.length === 1) {
            return;
        }
        var /** @type {?} */ focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var /** @type {?} */ focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    };
    /**
     * @return {?}
     */
    McListSelection.prototype._getHeight = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement.getClientRects()[0].height;
    };
    // Removes an option from the selection list and updates the active item.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype._removeOptionFromList = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option._hasFocus) {
            var /** @type {?} */ optionIndex = this._getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.setNextItemActive();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McListSelection.prototype._onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ keyCode = event.keyCode;
        var /** @type {?} */ manager = this._keyManager;
        var /** @type {?} */ previousFocusIndex = manager.activeItemIndex;
        switch (event.keyCode) {
            case keycodes.SPACE:
            case keycodes.ENTER:
                this.toggleFocusedOption();
                event.preventDefault();
                break;
            case keycodes.HOME:
                this._keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case keycodes.END:
                this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case keycodes.PAGE_UP:
                if (!this.horizontal) {
                    this._keyManager.setPreviousPageItemActive(this._scrollSize);
                }
                event.preventDefault();
                break;
            case keycodes.PAGE_DOWN:
                if (!this.horizontal) {
                    this._keyManager.setNextPageItemActive(this._scrollSize);
                }
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
        if ((keyCode === keycodes.UP_ARROW || keyCode === keycodes.DOWN_ARROW) &&
            event.shiftKey &&
            manager.activeItemIndex !== previousFocusIndex) {
            this.toggleFocusedOption();
        }
    };
    // Reports a value change to the ControlValueAccessor
    /**
     * @return {?}
     */
    McListSelection.prototype._reportValueChange = /**
     * @return {?}
     */
    function () {
        if (this.options) {
            this._onChange(this.getSelectedOptionValues());
        }
    };
    // Emits a change event if the selected state of an option changed.
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype._emitChangeEvent = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    McListSelection.prototype._getOptionByValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.options.find(function (option) { return option.value === value; });
    };
    /**
     * @param {?} values
     * @return {?}
     */
    McListSelection.prototype._setOptionsFromValues = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.options.forEach(function (option) { return option.setSelected(false); });
        values
            .map(function (value) { return _this._getOptionByValue(value); })
            .filter(Boolean)
            .forEach(function (option) { return ((option)).setSelected(true); });
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    McListSelection.prototype._isValidIndex = /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    function (index) {
        return index >= 0 && index < this.options.length;
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McListSelection.prototype._getOptionIndex = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.options.toArray().indexOf(option);
    };
    McListSelection.decorators = [
        { type: core.Component, args: [{
                    exportAs: 'mcListSelection',
                    selector: 'mc-list-selection',
                    template: '<ng-content></ng-content>',
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:32px;line-height:2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:32px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-list-selection',
                        '[tabIndex]': 'tabIndex',
                        '(focus)': 'focus()',
                        '(blur)': '_onTouched()',
                        '(keydown)': '_onKeyDown($event)',
                        '(window:resize)': 'updateScrollSize()'
                    },
                    providers: [MC_SELECTION_LIST_VALUE_ACCESSOR],
                    preserveWhitespaces: false
                },] },
    ];
    /** @nocollapse */
    McListSelection.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: undefined, decorators: [{ type: core.Attribute, args: ['tabindex',] },] },
        { type: undefined, decorators: [{ type: core.Attribute, args: ['auto-select',] },] },
        { type: undefined, decorators: [{ type: core.Attribute, args: ['no-unselect',] },] },
        { type: undefined, decorators: [{ type: core.Attribute, args: ['multiple',] },] },
    ]; };
    McListSelection.propDecorators = {
        "options": [{ type: core.ContentChildren, args: [McListOption,] },],
        "horizontal": [{ type: core.Input },],
        "selectionChange": [{ type: core.Output },],
    };
    return McListSelection;
}(_McListSelectionMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McListBase = /** @class */ (function () {
    function McListBase() {
    }
    return McListBase;
}());
var McList = /** @class */ (function (_super) {
    __extends(McList, _super);
    function McList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McList.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-list',
                    host: { class: 'mc-list' },
                    template: '<ng-content></ng-content>',
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:32px;line-height:2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:32px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    return McList;
}(McListBase));
/**
 * Directive whose purpose is to add the mc- CSS styling to this selector.
 * \@docs-private
 */
var McListSubheaderCssStyler = /** @class */ (function () {
    function McListSubheaderCssStyler() {
    }
    McListSubheaderCssStyler.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-subheader], [mcSubheader]',
                    host: { class: 'mc-subheader' }
                },] },
    ];
    return McListSubheaderCssStyler;
}());
var McListItemBase = /** @class */ (function () {
    function McListItemBase() {
    }
    return McListItemBase;
}());
var McListItem = /** @class */ (function (_super) {
    __extends(McListItem, _super);
    function McListItem(_element) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        return _this;
    }
    /**
     * @return {?}
     */
    McListItem.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._lineSetter = new McLineSetter(this._lines, this._element);
    };
    /**
     * @return {?}
     */
    McListItem.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.add('mc-focused');
    };
    /**
     * @return {?}
     */
    McListItem.prototype._handleBlur = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.remove('mc-focused');
    };
    /**
     * @return {?}
     */
    McListItem.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    McListItem.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-list-item, a[mc-list-item]',
                    host: {
                        class: 'mc-list-item',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()'
                    },
                    template: "<div class=\"mc-list-item-content\"><ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content><div class=\"mc-list-text\"><ng-content select=\"[mc-line], [mcLine]\"></ng-content></div><ng-content></ng-content></div>",
                    encapsulation: core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McListItem.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    McListItem.propDecorators = {
        "_lines": [{ type: core.ContentChildren, args: [McLine,] },],
    };
    return McListItem;
}(McListItemBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McListModule = /** @class */ (function () {
    function McListModule() {
    }
    McListModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        a11y.A11yModule,
                        McLineModule
                    ],
                    exports: [
                        McList,
                        McListSelection,
                        McListItem,
                        McListOption,
                        McListSubheaderCssStyler
                    ],
                    declarations: [
                        McList,
                        McListSelection,
                        McListItem,
                        McListOption,
                        McListSubheaderCssStyler
                    ]
                },] },
    ];
    return McListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ VERSION = new core.Version('0.0.1-e2022cf');

exports.VERSION = VERSION;
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
exports.ɵa0 = MC_SANITY_CHECKS_FACTORY;
exports.isBoolean = isBoolean;
exports.toBoolean = toBoolean;
exports.McCommonModule = McCommonModule;
exports.MС_SANITY_CHECKS = MС_SANITY_CHECKS;
exports.mixinDisabled = mixinDisabled;
exports.mixinColor = mixinColor;
exports.ThemePalette = ThemePalette;
exports.mixinTabIndex = mixinTabIndex;
exports.McLine = McLine;
exports.McLineSetter = McLineSetter;
exports.McLineModule = McLineModule;
exports.McPseudoCheckboxModule = McPseudoCheckboxModule;
exports.McPseudoCheckbox = McPseudoCheckbox;
exports.McDivider = McDivider;
exports.McDividerModule = McDividerModule;
exports.McRadioModule = McRadioModule;
exports.McRadioChange = McRadioChange;
exports.McRadioGroupBase = McRadioGroupBase;
exports._McRadioGroupMixinBase = _McRadioGroupMixinBase;
exports.MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR;
exports.McRadioGroup = McRadioGroup;
exports.McRadioButtonBase = McRadioButtonBase;
exports._McRadioButtonMixinBase = _McRadioButtonMixinBase;
exports.McRadioButton = McRadioButton;
exports.McListModule = McListModule;
exports.McListBase = McListBase;
exports.McList = McList;
exports.McListSubheaderCssStyler = McListSubheaderCssStyler;
exports.McListItemBase = McListItemBase;
exports.McListItem = McListItem;
exports.McListOption = McListOption;
exports.MC_SELECTION_LIST_VALUE_ACCESSOR = MC_SELECTION_LIST_VALUE_ACCESSOR;
exports.McListSelectionChange = McListSelectionChange;
exports.McListSelectionBase = McListSelectionBase;
exports._McListSelectionMixinBase = _McListSelectionMixinBase;
exports.McListSelection = McListSelection;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic.umd.js.map

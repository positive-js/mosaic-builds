/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/bidi'), require('rxjs'), require('@angular/common'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/platform'), require('@angular/forms'), require('@ptsecurity/cdk/keycodes'), require('rxjs/operators'), require('@ptsecurity/cdk/coercion'), require('@ptsecurity/cdk/collections'), require('@ptsecurity/cdk/tree')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic', ['exports', '@angular/core', '@ptsecurity/cdk/bidi', 'rxjs', '@angular/common', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/platform', '@angular/forms', '@ptsecurity/cdk/keycodes', 'rxjs/operators', '@ptsecurity/cdk/coercion', '@ptsecurity/cdk/collections', '@ptsecurity/cdk/tree'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = {}),global.ng.core,global.ng.cdk.bidi,global.rxjs,global.ng.common,global.ng.cdk.a11y,global.ng.cdk.platform,global.ng.forms,global.ng.cdk.keycodes,global.rxjs.operators,global.ng.cdk.coercion,global.ng.cdk.collections,global.ng.cdk.tree));
}(this, (function (exports,core,bidi,rxjs,common,a11y,platform,forms,keycodes,operators,coercion,collections,tree) { 'use strict';

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

function isBoolean(val) { return typeof val === 'boolean'; }
function toBoolean(value) {
    return value != null && "" + value !== 'false';
}

// Injection token that configures whether the Mosaic sanity checks are enabled.
var MC_SANITY_CHECKS = new core.InjectionToken('mc-sanity-checks', {
    providedIn: 'root',
    factory: MC_SANITY_CHECKS_FACTORY
});
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
        // Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
        this._hasDoneGlobalChecks = false;
        // Reference to the global `document` object.
        this._document = typeof document === 'object' && document ? document : null;
        // Reference to the global 'window' object.
        this._window = typeof window === 'object' && window ? window : null;
        if (this._areChecksEnabled() && !this._hasDoneGlobalChecks) {
            this._checkDoctypeIsDefined();
            this._checkThemeIsPresent();
            this._hasDoneGlobalChecks = true;
        }
    }
    // Whether any sanity checks are enabled
    McCommonModule.prototype._areChecksEnabled = function () {
        return this._sanityChecksEnabled && core.isDevMode() && !this._isTestEnv();
    };
    // Whether the code is running in tests.
    McCommonModule.prototype._isTestEnv = function () {
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    };
    McCommonModule.prototype._checkDoctypeIsDefined = function () {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Mosaic components not to behave as expected.');
        }
    };
    McCommonModule.prototype._checkThemeIsPresent = function () {
        if (this._document && typeof getComputedStyle === 'function') {
            var testElement = this._document.createElement('div');
            testElement.classList.add('mc-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            var computedStyle = getComputedStyle(testElement);
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
    McCommonModule = __decorate([
        core.NgModule({
            imports: [bidi.BidiModule],
            exports: [bidi.BidiModule]
        }),
        __param(0, core.Optional()), __param(0, core.Inject(MC_SANITY_CHECKS)),
        __metadata("design:paramtypes", [Boolean])
    ], McCommonModule);
    return McCommonModule;
}());

// Mixin to augment a directive with a `disabled` property.
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
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = toBoolean(value);
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}


(function (ThemePalette) {
    ThemePalette["Primary"] = "primary";
    ThemePalette["Second"] = "second";
    ThemePalette["Warn"] = "warn";
    ThemePalette["Default"] = "second";
})(exports.ThemePalette || (exports.ThemePalette = {}));
/** Mixin to augment a directive with a `color` property. */
function mixinColor(base, defaultColor) {
    if (defaultColor === void 0) { defaultColor = exports.ThemePalette.Default; }
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            // Set the default color that can be specified from the mixin.
            _this.color = defaultColor;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                var colorPalette = value || defaultColor;
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

// Mixin to augment a directive with a `tabIndex` property.
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
            get: function () {
                return this.disabled ? -1 : this._tabIndex;
            },
            set: function (value) {
                this._tabIndex = value != null ? value : defaultTabIndex;
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 */
function mixinErrorState(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            /** Whether the component is in an error state. */
            _this.errorState = false;
            /**
             * Stream that emits whenever the state of the input changes such that the wrapping
             * `MсFormField` needs to run change detection.
             */
            _this.stateChanges = new rxjs.Subject();
            return _this;
        }
        class_1.prototype.updateErrorState = function () {
            var oldState = this.errorState;
            var parent = this._parentFormGroup || this._parentForm;
            var matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
            var control = this.ngControl ? this.ngControl.control : null;
            var newState = matcher.isErrorState(control, parent);
            if (newState !== oldState) {
                this.errorState = newState;
                this.stateChanges.next();
            }
        };
        return class_1;
    }(base));
}

/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
var McLine = /** @class */ (function () {
    function McLine() {
    }
    McLine = __decorate([
        core.Directive({
            selector: '[mc-line], [mcLine]',
            host: { class: 'mc-line' }
        })
    ], McLine);
    return McLine;
}());
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
var McLineSetter = /** @class */ (function () {
    function McLineSetter(_lines, _element) {
        var _this = this;
        this._lines = _lines;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    McLineSetter.prototype._setLineClass = function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mc-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mc-multi-line", true);
        }
    };
    McLineSetter.prototype._resetClasses = function () {
        this._setClass('mc-2-line', false);
        this._setClass('mc-3-line', false);
        this._setClass('mc-multi-line', false);
    };
    McLineSetter.prototype._setClass = function (className, isAdd) {
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
    McLineModule = __decorate([
        core.NgModule({
            imports: [],
            exports: [McLine],
            declarations: [McLine]
        })
    ], McLineModule);
    return McLineModule;
}());

/** Error state matcher that matches when a control is invalid and dirty. */
var ShowOnDirtyErrorStateMatcher = /** @class */ (function () {
    function ShowOnDirtyErrorStateMatcher() {
    }
    ShowOnDirtyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    };
    ShowOnDirtyErrorStateMatcher = __decorate([
        core.Injectable()
    ], ShowOnDirtyErrorStateMatcher);
    return ShowOnDirtyErrorStateMatcher;
}());
/** Provider that defines how form controls behave with regards to displaying error messages. */
var ErrorStateMatcher = /** @class */ (function () {
    function ErrorStateMatcher() {
    }
    ErrorStateMatcher.prototype.isErrorState = function (control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    };
    ErrorStateMatcher.ngInjectableDef = core.defineInjectable({ factory: function ErrorStateMatcher_Factory() { return new ErrorStateMatcher(); }, token: ErrorStateMatcher, providedIn: "root" });
    ErrorStateMatcher = __decorate([
        core.Injectable({ providedIn: 'root' })
    ], ErrorStateMatcher);
    return ErrorStateMatcher;
}());

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
 * @docs-private
 */
var McPseudoCheckbox = /** @class */ (function () {
    function McPseudoCheckbox() {
        // Display state of the checkbox.
        this.state = 'unchecked';
        // Whether the checkbox is disabled.
        this.disabled = false;
    }
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McPseudoCheckbox.prototype, "state", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McPseudoCheckbox.prototype, "disabled", void 0);
    McPseudoCheckbox = __decorate([
        core.Component({
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
        })
    ], McPseudoCheckbox);
    return McPseudoCheckbox;
}());

var McPseudoCheckboxModule = /** @class */ (function () {
    function McPseudoCheckboxModule() {
    }
    McPseudoCheckboxModule = __decorate([
        core.NgModule({
            exports: [McPseudoCheckbox],
            declarations: [McPseudoCheckbox]
        })
    ], McPseudoCheckboxModule);
    return McPseudoCheckboxModule;
}());

var McIconCSSStyler = /** @class */ (function () {
    function McIconCSSStyler() {
    }
    McIconCSSStyler = __decorate([
        core.Directive({
            selector: '[mc-icon]',
            host: { class: 'mc mc-icon' }
        })
    ], McIconCSSStyler);
    return McIconCSSStyler;
}());
var McIconBase = /** @class */ (function () {
    function McIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McIconBase;
}());
var _McIconMixinBase = mixinColor(McIconBase);
var McIcon = /** @class */ (function (_super) {
    __extends(McIcon, _super);
    function McIcon(elementRef, iconName) {
        var _this = _super.call(this, elementRef) || this;
        elementRef.nativeElement.classList.add(iconName);
        return _this;
    }
    McIcon.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    McIcon = __decorate([
        core.Component({
            selector: "[mc-icon]",
            template: '<ng-content></ng-content>',
            styles: [""],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None
        }),
        __param(1, core.Attribute('mc-icon')),
        __metadata("design:paramtypes", [core.ElementRef, String])
    ], McIcon);
    return McIcon;
}(_McIconMixinBase));

var McIconModule = /** @class */ (function () {
    function McIconModule() {
    }
    McIconModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule,
                platform.PlatformModule
            ],
            exports: [
                McIcon,
                McIconCSSStyler
            ],
            declarations: [
                McIcon,
                McIconCSSStyler
            ]
        })
    ], McIconModule);
    return McIconModule;
}());

var McButtonCSSStyler = /** @class */ (function () {
    function McButtonCSSStyler() {
    }
    McButtonCSSStyler = __decorate([
        core.Directive({
            selector: 'button[mc-button], a[mc-button]',
            host: { class: 'mc-button' }
        })
    ], McButtonCSSStyler);
    return McButtonCSSStyler;
}());
var McXSButtonCSSStyler = /** @class */ (function () {
    function McXSButtonCSSStyler() {
    }
    McXSButtonCSSStyler = __decorate([
        core.Directive({
            selector: 'button[mc-xs-button], a[mc-xs-button]',
            host: { class: 'mc-button mc-button_xs' }
        })
    ], McXSButtonCSSStyler);
    return McXSButtonCSSStyler;
}());
var McSMButtonCSSStyler = /** @class */ (function () {
    function McSMButtonCSSStyler() {
    }
    McSMButtonCSSStyler = __decorate([
        core.Directive({
            selector: 'button[mc-sm-button], a[mc-sm-button]',
            host: { class: 'mc-button mc-button_sm' }
        })
    ], McSMButtonCSSStyler);
    return McSMButtonCSSStyler;
}());
var McLGButtonCSSStyler = /** @class */ (function () {
    function McLGButtonCSSStyler() {
    }
    McLGButtonCSSStyler = __decorate([
        core.Directive({
            selector: 'button[mc-lg-button], a[mc-lg-button]',
            host: { class: 'mc-button mc-button_lg' }
        })
    ], McLGButtonCSSStyler);
    return McLGButtonCSSStyler;
}());
var McXLButtonCSSStyler = /** @class */ (function () {
    function McXLButtonCSSStyler() {
    }
    McXLButtonCSSStyler = __decorate([
        core.Directive({
            selector: 'button[mc-xl-button], a[mc-xl-button]',
            host: { class: 'mc-button mc-button_xl' }
        })
    ], McXLButtonCSSStyler);
    return McXLButtonCSSStyler;
}());
var McIconButtonCSSStyler = /** @class */ (function () {
    function McIconButtonCSSStyler(elementRef) {
        this.nativeElement = elementRef.nativeElement;
    }
    McIconButtonCSSStyler.prototype.ngAfterContentInit = function () {
        this._addClassModificatorForIcons();
    };
    McIconButtonCSSStyler.prototype._addClassModificatorForIcons = function () {
        var twoIcons = 2;
        var icons = this.contentChildren.map(function (item) { return item._elementRef.nativeElement; });
        if (icons.length === 1) {
            var iconElement = icons[0];
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
            var firstIconElement = icons[0];
            var secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    };
    McIconButtonCSSStyler = __decorate([
        core.Directive({
            selector: 'button[mc-icon-button], a[mc-icon-button]',
            queries: {
                contentChildren: new core.ContentChildren(McIcon)
            },
            host: { class: 'mc-icon-button' }
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McIconButtonCSSStyler);
    return McIconButtonCSSStyler;
}());
var McButtonBase = /** @class */ (function () {
    function McButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McButtonBase;
}());
var _McButtonMixinBase = mixinColor(mixinDisabled(McButtonBase));
var McButton = /** @class */ (function (_super) {
    __extends(McButton, _super);
    function McButton(elementRef, _platform, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this._platform = _platform;
        _this._focusMonitor = _focusMonitor;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
        return _this;
    }
    McButton.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    McButton.prototype.focus = function () {
        this._getHostElement().focus();
    };
    McButton.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    McButton = __decorate([
        core.Component({
            selector: "\n        button[mc-button],\n        button[mc-xs-button],\n        button[mc-sm-button],\n        button[mc-lg-button],\n        button[mc-xl-button]\n    ",
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:15px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:16px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[disabled]': 'disabled || null'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef, platform.Platform, a11y.FocusMonitor])
    ], McButton);
    return McButton;
}(_McButtonMixinBase));
var McAnchor = /** @class */ (function (_super) {
    __extends(McAnchor, _super);
    function McAnchor(platform$$1, focusMonitor, elementRef) {
        return _super.call(this, elementRef, platform$$1, focusMonitor) || this;
    }
    McAnchor.prototype._haltDisabledEvents = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    McAnchor = __decorate([
        core.Component({
            selector: 'a[mc-button], a[mc-xs-button], a[mc-sm-button], a[mc-lg-button], a[mc-xl-button]',
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:15px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:16px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[attr.tabindex]': 'disabled ? -1 : 0',
                '[attr.disabled]': 'disabled || null',
                '(click)': '_haltDisabledEvents($event)'
            }
        }),
        __metadata("design:paramtypes", [platform.Platform, a11y.FocusMonitor, core.ElementRef])
    ], McAnchor);
    return McAnchor;
}(McButton));
var McIconButton = /** @class */ (function (_super) {
    __extends(McIconButton, _super);
    function McIconButton(platform$$1, focusMonitor, elementRef) {
        return _super.call(this, elementRef, platform$$1, focusMonitor) || this;
    }
    McIconButton.prototype._haltDisabledEvents = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    McIconButton = __decorate([
        core.Component({
            selector: 'button[mc-icon-button]',
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:15px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:16px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[attr.tabindex]': 'disabled ? -1 : 0',
                '[attr.disabled]': 'disabled || null'
            }
        }),
        __metadata("design:paramtypes", [platform.Platform, a11y.FocusMonitor, core.ElementRef])
    ], McIconButton);
    return McIconButton;
}(McButton));

var McButtonModule = /** @class */ (function () {
    function McButtonModule() {
    }
    McButtonModule = __decorate([
        core.NgModule({
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
        })
    ], McButtonModule);
    return McButtonModule;
}());

/**
 * Injection token that can be used to specify the checkbox click behavior.
 */
var MC_CHECKBOX_CLICK_ACTION = new core.InjectionToken('mc-checkbox-click-action');

// Increasing integer for generating unique ids for checkbox components.
var nextUniqueId = 0;
/**
 * Provider Expression that allows mc-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
var MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return McCheckbox; }),
    multi: true
};
/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */

(function (TransitionCheckState) {
    /** The initial state of the component before any user interaction. */
    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
    /** The state representing the component when it's becoming checked. */
    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
    /** The state representing the component when it's becoming unchecked. */
    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
    /** The state representing the component when it's becoming indeterminate. */
    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
})(exports.TransitionCheckState || (exports.TransitionCheckState = {}));
/** Change event object emitted by McCheckbox. */
var McCheckboxChange = /** @class */ (function () {
    function McCheckboxChange() {
    }
    return McCheckboxChange;
}());
// Boilerplate for applying mixins to McCheckbox.
/** @docs-private */
var McCheckboxBase = /** @class */ (function () {
    function McCheckboxBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McCheckboxBase;
}());
var _McCheckboxMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McCheckboxBase)));
/**
 * A mosaic checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A McCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 */
var McCheckbox = /** @class */ (function (_super) {
    __extends(McCheckbox, _super);
    function McCheckbox(elementRef, _changeDetectorRef, _focusMonitor, tabIndex, _clickAction) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._focusMonitor = _focusMonitor;
        _this._clickAction = _clickAction;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
         * take precedence so this may be omitted.
         */
        _this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        _this.ariaLabelledby = null;
        _this._uniqueId = "mc-checkbox-" + ++nextUniqueId;
        /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
        _this.id = _this._uniqueId;
        /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
        _this.labelPosition = 'after';
        /** Name value will be applied to the input element if present */
        _this.name = null;
        /** Event emitted when the checkbox's `checked` value changes. */
        _this.change = new core.EventEmitter();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        _this.indeterminateChange = new core.EventEmitter();
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * @docs-private
         */
        _this._onTouched = function () {
        };
        _this._currentAnimationClass = '';
        _this._currentCheckState = exports.TransitionCheckState.Init;
        _this._controlValueAccessorChangeFn = function () {
        };
        _this._checked = false;
        _this._disabled = false;
        _this._indeterminate = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(McCheckbox.prototype, "inputId", {
        /** Returns the unique id for the visual hidden input. */
        get: function () {
            return (this.id || this._uniqueId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "required", {
        /** Whether the checkbox is required. */
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    McCheckbox.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._focusMonitor
            .monitor(this._inputElement.nativeElement)
            .subscribe(function (focusOrigin) { return _this._onInputFocusChange(focusOrigin); });
    };
    McCheckbox.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
    };
    Object.defineProperty(McCheckbox.prototype, "checked", {
        /**
         * Whether the checkbox is checked.
         */
        get: function () {
            return this._checked;
        },
        set: function (value) {
            if (value != this.checked) {
                this._checked = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "disabled", {
        /**
         * Whether the checkbox is disabled. This fully overrides the implementation provided by
         * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
         */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            if (value != this.disabled) {
                this._disabled = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCheckbox.prototype, "indeterminate", {
        /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
         * set to false.
         */
        get: function () {
            return this._indeterminate;
        },
        set: function (value) {
            var changed = value != this._indeterminate;
            this._indeterminate = value;
            if (changed) {
                if (this._indeterminate) {
                    this._transitionCheckState(exports.TransitionCheckState.Indeterminate);
                }
                else {
                    this._transitionCheckState(this.checked ? exports.TransitionCheckState.Checked : exports.TransitionCheckState.Unchecked);
                }
                this.indeterminateChange.emit(this._indeterminate);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Method being called whenever the label text changes. */
    McCheckbox.prototype._onLabelTextChange = function () {
        // This method is getting called whenever the label of the checkbox changes.
        // Since the checkbox uses the OnPush strategy we need to notify it about the change
        // that has been recognized by the cdkObserveContent directive.
        this._changeDetectorRef.markForCheck();
    };
    // Implemented as part of ControlValueAccessor.
    McCheckbox.prototype.writeValue = function (value) {
        this.checked = !!value;
    };
    // Implemented as part of ControlValueAccessor.
    McCheckbox.prototype.registerOnChange = function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McCheckbox.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McCheckbox.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    McCheckbox.prototype._getAriaChecked = function () {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    };
    McCheckbox.prototype._transitionCheckState = function (newState) {
        var oldState = this._currentCheckState;
        var element = this._elementRef.nativeElement;
        if (oldState === newState) {
            return;
        }
        if (this._currentAnimationClass.length > 0) {
            element.classList.remove(this._currentAnimationClass);
        }
        this._currentCheckState = newState;
        if (this._currentAnimationClass.length > 0) {
            element.classList.add(this._currentAnimationClass);
        }
    };
    McCheckbox.prototype._emitChangeEvent = function () {
        var event = new McCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    };
    /** Function is called whenever the focus changes for the input element. */
    McCheckbox.prototype._onInputFocusChange = function (focusOrigin) {
        if (focusOrigin) {
            this._onTouched();
        }
    };
    /** Toggles the `checked` state of the checkbox. */
    McCheckbox.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    McCheckbox.prototype._onInputClick = function (event) {
        var _this = this;
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
        // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
        if (!this.disabled && this._clickAction !== 'noop') {
            // When user manually click on the checkbox, `indeterminate` is set to false.
            if (this.indeterminate && this._clickAction !== 'check') {
                Promise.resolve().then(function () {
                    _this._indeterminate = false;
                    _this.indeterminateChange.emit(_this._indeterminate);
                });
            }
            this.toggle();
            this._transitionCheckState(this._checked ? exports.TransitionCheckState.Checked : exports.TransitionCheckState.Unchecked);
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
        else if (!this.disabled && this._clickAction === 'noop') {
            // Reset native input when clicked with noop. The native checkbox becomes checked after
            // click, reset it to be align with `checked` value of `mc-checkbox`.
            this._inputElement.nativeElement.checked = this.checked;
            this._inputElement.nativeElement.indeterminate = this.indeterminate;
        }
    };
    /** Focuses the checkbox. */
    McCheckbox.prototype.focus = function () {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    };
    McCheckbox.prototype._onInteractionEvent = function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    };
    __decorate([
        core.Input('aria-label'),
        __metadata("design:type", String)
    ], McCheckbox.prototype, "ariaLabel", void 0);
    __decorate([
        core.Input('aria-labelledby'),
        __metadata("design:type", Object)
    ], McCheckbox.prototype, "ariaLabelledby", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McCheckbox.prototype, "id", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McCheckbox.prototype, "required", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McCheckbox.prototype, "labelPosition", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCheckbox.prototype, "name", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McCheckbox.prototype, "change", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McCheckbox.prototype, "indeterminateChange", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McCheckbox.prototype, "value", void 0);
    __decorate([
        core.ViewChild('input'),
        __metadata("design:type", core.ElementRef)
    ], McCheckbox.prototype, "_inputElement", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McCheckbox.prototype, "checked", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCheckbox.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McCheckbox.prototype, "indeterminate", null);
    McCheckbox = __decorate([
        core.Component({
            selector: 'mc-checkbox',
            template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label><div class=\"mc-checkbox-inner-container\" [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\"><input #input class=\"mc-checkbox-input cdk-visually-hidden\" type=\"checkbox\" [id]=\"inputId\" [required]=\"required\" [checked]=\"checked\" [attr.value]=\"value\" [disabled]=\"disabled\" [attr.name]=\"name\" [tabIndex]=\"tabIndex\" [indeterminate]=\"indeterminate\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-checked]=\"_getAriaChecked()\" (change)=\"_onInteractionEvent($event)\" (click)=\"_onInputClick($event)\"><div class=\"mc-checkbox-frame\"></div><div class=\"mc-checkbox-background\"><i class=\"mc-checkbox-checkmark mc mc-check_16\"></i> <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i></div></div><span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"_onLabelTextChange()\"><span style=\"display:none\">&nbsp;</span><ng-content></ng-content></span></label>",
            styles: [".mc-checkbox-checkmark,.mc-checkbox-mixedmark{width:calc(100% - 2px)}.mc-checkbox-background,.mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none}.mc-checkbox{cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-frame{background-color:transparent;border-width:1px;border-style:solid;box-shadow:inset 0 0 1px 0 rgba(0,0,0,.2)}.mc-checkbox-background{align-items:center;display:inline-flex;justify-content:center}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%;opacity:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}.mc-checkbox-checked .mc-checkbox-checkmark{opacity:1}.mc-checkbox-checked .mc-checkbox-mixedmark{opacity:0}.mc-checkbox-indeterminate .mc-checkbox-checkmark{opacity:0}.mc-checkbox-indeterminate .mc-checkbox-mixedmark{opacity:1}.mc-checkbox-unchecked .mc-checkbox-background{background-color:transparent}.mc-checkbox-disabled{cursor:default}.mc-checkbox-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-input{bottom:0;left:50%}.mc-checkbox-input:focus+.mc-checkbox-frame{top:-1px;left:-1px;border-width:2px;width:18px;height:18px}"],
            exportAs: 'mcCheckbox',
            host: {
                class: 'mc-checkbox',
                '[id]': 'id',
                '[attr.id]': 'id',
                '[class.mc-checkbox-indeterminate]': 'indeterminate',
                '[class.mc-checkbox-checked]': 'checked',
                '[class.mc-checkbox-disabled]': 'disabled',
                '[class.mc-checkbox-label-before]': 'labelPosition == "before"'
            },
            providers: [MC_CHECKBOX_CONTROL_VALUE_ACCESSOR],
            inputs: ['color', 'tabIndex'],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(3, core.Attribute('tabindex')),
        __param(4, core.Optional()), __param(4, core.Inject(MC_CHECKBOX_CLICK_ACTION)),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef,
            a11y.FocusMonitor, String, Object])
    ], McCheckbox);
    return McCheckbox;
}(_McCheckboxMixinBase));

var MC_CHECKBOX_REQUIRED_VALIDATOR = {
    provide: forms.NG_VALIDATORS,
    useExisting: core.forwardRef(function () { return McCheckboxRequiredValidator; }),
    multi: true
};
/**
 * Validator for Mosaic checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mc-checkbox`.
 */
var McCheckboxRequiredValidator = /** @class */ (function (_super) {
    __extends(McCheckboxRequiredValidator, _super);
    function McCheckboxRequiredValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McCheckboxRequiredValidator = __decorate([
        core.Directive({
            selector: "mc-checkbox[required][formControlName],\n             mc-checkbox[required][formControl], mc-checkbox[required][ngModel]",
            providers: [MC_CHECKBOX_REQUIRED_VALIDATOR],
            host: { '[attr.required]': 'required ? "" : null' }
        })
    ], McCheckboxRequiredValidator);
    return McCheckboxRequiredValidator;
}(forms.CheckboxRequiredValidator));

var McCheckboxModule = /** @class */ (function () {
    function McCheckboxModule() {
    }
    McCheckboxModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, McCommonModule],
            exports: [McCheckbox, McCheckboxRequiredValidator, McCommonModule],
            declarations: [McCheckbox, McCheckboxRequiredValidator]
        })
    ], McCheckboxModule);
    return McCheckboxModule;
}());

var McDivider = /** @class */ (function () {
    function McDivider() {
        this._vertical = false;
        this._inset = false;
    }
    Object.defineProperty(McDivider.prototype, "vertical", {
        // Whether the divider is vertically aligned.
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDivider.prototype, "inset", {
        // Whether the divider is an inset divider.
        get: function () {
            return this._inset;
        },
        set: function (value) {
            this._inset = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDivider.prototype, "vertical", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDivider.prototype, "inset", null);
    McDivider = __decorate([
        core.Component({
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
        })
    ], McDivider);
    return McDivider;
}());

var McDividerModule = /** @class */ (function () {
    function McDividerModule() {
    }
    McDividerModule = __decorate([
        core.NgModule({
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
        })
    ], McDividerModule);
    return McDividerModule;
}());

var McCleaner = /** @class */ (function () {
    function McCleaner() {
    }
    McCleaner = __decorate([
        core.Component({
            selector: 'mc-cleaner',
            template: '<i mc-icon="mc-close-M_16" class="mc-cleaner__icon"></i>'
        })
    ], McCleaner);
    return McCleaner;
}());

/** An interface which allows a control to work inside of a `MсFormField`. */
var McFormFieldControl = /** @class */ (function () {
    function McFormFieldControl() {
    }
    return McFormFieldControl;
}());

function getMcFormFieldMissingControlError() {
    return Error('mc-form-field must contain a McFormFieldControl.');
}

var nextUniqueId$1 = 0;
var McHint = /** @class */ (function () {
    function McHint() {
        this.id = "mc-hint-" + nextUniqueId$1++;
    }
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McHint.prototype, "id", void 0);
    McHint = __decorate([
        core.Directive({
            selector: 'mc-hint',
            host: {
                class: 'mc-hint',
                '[attr.id]': 'id'
            }
        })
    ], McHint);
    return McHint;
}());

var McPrefix = /** @class */ (function () {
    function McPrefix() {
    }
    McPrefix = __decorate([
        core.Directive({
            selector: '[mcPrefix]'
        })
    ], McPrefix);
    return McPrefix;
}());

var McSuffix = /** @class */ (function () {
    function McSuffix() {
    }
    McSuffix = __decorate([
        core.Directive({
            selector: '[mcSuffix]'
        })
    ], McSuffix);
    return McSuffix;
}());

var McFormFieldBase = /** @class */ (function () {
    function McFormFieldBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McFormFieldBase;
}());
var McFormField = /** @class */ (function (_super) {
    __extends(McFormField, _super);
    function McFormField(_elementRef, _changeDetectorRef) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        return _this;
    }
    McFormField.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._validateControlChild();
        if (this._control.controlType) {
            this._elementRef.nativeElement.classList
                .add("mc-form-field-type-" + this._control.controlType);
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this._control.stateChanges.pipe(operators.startWith()).subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
        // Run change detection if the value changes.
        var valueChanges = this._control.ngControl && this._control.ngControl.valueChanges || rxjs.EMPTY;
        rxjs.merge(valueChanges)
            .subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
    };
    McFormField.prototype.ngAfterContentChecked = function () {
        this._validateControlChild();
    };
    McFormField.prototype.ngAfterViewInit = function () {
        // Avoid animations on load.
        this._changeDetectorRef.detectChanges();
    };
    McFormField.prototype.clearValue = function ($event) {
        $event.stopPropagation();
        if (this._control && this._control.ngControl) {
            this._control.ngControl.reset();
        }
    };
    McFormField.prototype.onContainerClick = function ($event) {
        return this._control.onContainerClick && this._control.onContainerClick($event);
    };
    McFormField.prototype.onKeyDown = function (e) {
        if (e.keyCode === keycodes.ESCAPE &&
            this._control.focused &&
            this.hasCleaner) {
            if (this._control && this._control.ngControl) {
                this._control.ngControl.reset();
            }
            e.preventDefault();
        }
    };
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    McFormField.prototype._shouldForward = function (prop) {
        var ngControl = this._control ? this._control.ngControl : null;
        return ngControl && ngControl[prop];
    };
    /** Throws an error if the form field's control is missing. */
    McFormField.prototype._validateControlChild = function () {
        if (!this._control) {
            throw getMcFormFieldMissingControlError();
        }
    };
    Object.defineProperty(McFormField.prototype, "hasHint", {
        get: function () {
            return this._hint && this._hint.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasSuffix", {
        get: function () {
            return this._suffix && this._suffix.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasPrefix", {
        get: function () {
            return this._prefix && this._prefix.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "hasCleaner", {
        get: function () {
            return this._cleaner && this._cleaner.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "canShowCleaner", {
        get: function () {
            return this.hasCleaner &&
                this._control && this._control.ngControl
                ? this._control.ngControl.value && !this._control.disabled
                : false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core.ContentChild(McFormFieldControl),
        __metadata("design:type", McFormFieldControl)
    ], McFormField.prototype, "_control", void 0);
    __decorate([
        core.ContentChildren(McHint),
        __metadata("design:type", core.QueryList)
    ], McFormField.prototype, "_hint", void 0);
    __decorate([
        core.ContentChildren(McSuffix),
        __metadata("design:type", core.QueryList)
    ], McFormField.prototype, "_suffix", void 0);
    __decorate([
        core.ContentChildren(McPrefix),
        __metadata("design:type", core.QueryList)
    ], McFormField.prototype, "_prefix", void 0);
    __decorate([
        core.ContentChildren(McCleaner),
        __metadata("design:type", core.QueryList)
    ], McFormField.prototype, "_cleaner", void 0);
    McFormField = __decorate([
        core.Component({
            selector: 'mc-form-field',
            exportAs: 'mcFormField',
            template: "<div class=\"mc-form-field__wrapper\"><div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\"><div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\"><ng-content select=\"[mcPrefix]\"></ng-content></div><div class=\"mc-form-field__infix\"><ng-content></ng-content></div><div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\"><ng-content select=\"[mcSuffix]\"></ng-content></div><div class=\"mc-form-field__cleaner\" *ngIf=\"canShowCleaner && !hasSuffix\" (click)=\"clearValue($event)\"><ng-content select=\"mc-cleaner\"></ng-content></div></div><div class=\"mc-form-field__hint\" *ngIf=\"hasHint\"><ng-content select=\"mc-hint\"></ng-content></div></div>",
            // McInput is a directive and can't have styles, so we need to include its styles here.
            // The McInput styles are fairly minimal so it shouldn't be a big deal for people who
            // aren't using McInput.
            styles: [".mc-form-field{display:inline-block;position:relative}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-width:1px;border-style:solid;border-color:initial;border-radius:3px}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}mc-cleaner{position:absolute;top:0;bottom:0;right:0;width:32px;cursor:pointer;display:flex;flex-direction:row;justify-content:center;align-items:center} .mc-input{background:0 0;padding:0;margin:0;border:none;outline:0;box-sizing:border-box;padding:5px 16px;width:100%}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}"],
            host: {
                class: 'mc-form-field',
                '[class.mc-form-field_invalid]': '_control.errorState',
                '[class.mc-form-field_disabled]': '_control.disabled',
                '[class.mc-form-field_has-prefix]': 'hasPrefix',
                '[class.mc-form-field_has-suffix]': 'hasSuffix',
                '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                '[class.mc-focused]': '_control.focused',
                '[class.ng-untouched]': '_shouldForward("untouched")',
                '[class.ng-touched]': '_shouldForward("touched")',
                '[class.ng-pristine]': '_shouldForward("pristine")',
                '[class.ng-dirty]': '_shouldForward("dirty")',
                '[class.ng-valid]': '_shouldForward("valid")',
                '[class.ng-invalid]': '_shouldForward("invalid")',
                '[class.ng-pending]': '_shouldForward("pending")',
                '(keydown)': 'onKeyDown($event)'
            },
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef])
    ], McFormField);
    return McFormField;
}(McFormFieldBase));
var McFormFieldWithoutBorders = /** @class */ (function () {
    function McFormFieldWithoutBorders() {
    }
    McFormFieldWithoutBorders = __decorate([
        core.Directive({
            selector: 'mc-form-field[mcFormFieldWithoutBorders]',
            exportAs: 'mcFormFieldWithoutBorders',
            host: { class: 'mc-form-field_without-borders' }
        })
    ], McFormFieldWithoutBorders);
    return McFormFieldWithoutBorders;
}());

var McFormFieldModule = /** @class */ (function () {
    function McFormFieldModule() {
    }
    McFormFieldModule = __decorate([
        core.NgModule({
            declarations: [
                McFormField,
                McFormFieldWithoutBorders,
                McHint,
                McPrefix,
                McSuffix,
                McCleaner
            ],
            imports: [common.CommonModule, McIconModule],
            exports: [
                McFormField,
                McFormFieldWithoutBorders,
                McHint,
                McPrefix,
                McSuffix,
                McCleaner
            ]
        })
    ], McFormFieldModule);
    return McFormFieldModule;
}());

function getMcInputUnsupportedTypeError(inputType) {
    return Error("Input type \"" + inputType + "\" isn't supported by mcInput.");
}

var MC_INPUT_VALUE_ACCESSOR = new core.InjectionToken('MC_INPUT_VALUE_ACCESSOR');

var MC_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
var nextUniqueId$2 = 0;
var McInputBase = /** @class */ (function () {
    function McInputBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return McInputBase;
}());
var _McInputMixinBase = mixinErrorState(McInputBase);
var McInput = /** @class */ (function (_super) {
    __extends(McInput, _super);
    function McInput(_elementRef, _platform, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
        _this._platform = _platform;
        _this.ngControl = ngControl;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.focused = false;
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.stateChanges = new rxjs.Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.controlType = 'mc-input';
        _this._uid = "mc-input-" + nextUniqueId$2++;
        _this._disabled = false;
        _this._required = false;
        _this._type = 'text';
        _this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(function (t) { return platform.getSupportedInputTypes().has(t); });
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this._inputValueAccessor = inputValueAccessor || _this._elementRef.nativeElement;
        _this._previousNativeValue = _this.value;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        return _this;
    }
    McInput_1 = McInput;
    Object.defineProperty(McInput.prototype, "disabled", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coercion.coerceBooleanProperty(value);
            // Browsers may not fire the blur event if the input is disabled too quickly.
            // Reset from here to ensure that the element doesn't become stuck.
            if (this.focused) {
                this.focused = false;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "id", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value || this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "required", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "type", {
        // tslint:disable no-reserved-keywords
        /** Input type of the element. */
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value || 'text';
            this._validateType();
            // When using Angular inputs, developers are no longer able to set the properties on the native
            // input element. To ensure that bindings for `type` work, we need to sync the setter
            // with the native property. Textarea elements don't support the type property or attribute.
            if (platform.getSupportedInputTypes().has(this._type)) {
                this._elementRef.nativeElement.type = this._type;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McInput.prototype, "value", {
        // tslint:enable no-reserved-keywords
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._inputValueAccessor.value;
        },
        set: function (value) {
            if (value !== this.value) {
                this._inputValueAccessor.value = value;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    McInput.prototype.ngOnChanges = function () {
        this.stateChanges.next();
    };
    McInput.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    McInput.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this._dirtyCheckNativeValue();
    };
    /** Focuses the input. */
    McInput.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    /** Callback for the cases where the focused state of the input changes. */
    McInput.prototype._focusChanged = function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    McInput.prototype._onInput = function () {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    };
    Object.defineProperty(McInput.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    McInput.prototype.onContainerClick = function () {
        this.focus();
    };
    /** Does some manual dirty checking on the native input `value` property. */
    McInput.prototype._dirtyCheckNativeValue = function () {
        var newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Make sure the input is a supported type. */
    McInput.prototype._validateType = function () {
        if (MC_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw getMcInputUnsupportedTypeError(this._type);
        }
    };
    /** Checks whether the input type is one of the types that are never empty. */
    McInput.prototype._isNeverEmpty = function () {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    };
    /** Checks whether the input is invalid based on the native validation. */
    McInput.prototype._isBadInput = function () {
        // The `validity` property won't be present on platform-server.
        var validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    };
    var McInput_1;
    __decorate([
        core.Input(),
        __metadata("design:type", ErrorStateMatcher)
    ], McInput.prototype, "errorStateMatcher", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McInput.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "id", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McInput.prototype, "placeholder", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McInput.prototype, "required", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "type", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McInput.prototype, "value", null);
    McInput = McInput_1 = __decorate([
        core.Directive({
            selector: "input[mcInput]",
            exportAs: 'mcInput',
            host: {
                'class': 'mc-input',
                // Native input properties that are overwritten by Angular inputs need to be synced with
                // the native input element. Otherwise property bindings for those don't work.
                '[attr.id]': 'id',
                '[attr.placeholder]': 'placeholder',
                '[disabled]': 'disabled',
                '[required]': 'required',
                '(blur)': '_focusChanged(false)',
                '(focus)': '_focusChanged(true)',
                '(input)': '_onInput()'
            },
            providers: [{ provide: McFormFieldControl, useExisting: McInput_1 }]
        }),
        __param(2, core.Optional()), __param(2, core.Self()),
        __param(3, core.Optional()),
        __param(4, core.Optional()),
        __param(6, core.Optional()), __param(6, core.Self()), __param(6, core.Inject(MC_INPUT_VALUE_ACCESSOR)),
        __metadata("design:paramtypes", [core.ElementRef,
            platform.Platform,
            forms.NgControl,
            forms.NgForm,
            forms.FormGroupDirective,
            ErrorStateMatcher, Object])
    ], McInput);
    return McInput;
}(_McInputMixinBase));
var McInputMono = /** @class */ (function () {
    function McInputMono() {
    }
    McInputMono = __decorate([
        core.Directive({
            selector: 'input[mcInputMonospace]',
            exportAs: 'McInputMonospace',
            host: { class: 'mc-input_monospace' }
        })
    ], McInputMono);
    return McInputMono;
}());

var McInputModule = /** @class */ (function () {
    function McInputModule() {
    }
    McInputModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, a11y.A11yModule, McCommonModule, forms.FormsModule],
            exports: [McInput, McInputMono],
            declarations: [McInput, McInputMono]
        })
    ], McInputModule);
    return McInputModule;
}());

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
        get: function () {
            return this._disabled || (this.listSelection && this.listSelection.disabled);
        },
        set: function (value) {
            var newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McListOption.prototype, "selected", {
        get: function () {
            return this.listSelection.selectedOptions && this.listSelection.selectedOptions.isSelected(this) || false;
        },
        set: function (value) {
            var isSelected = toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                this.listSelection._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    McListOption.prototype.ngOnInit = function () {
        var _this = this;
        if (this._selected) {
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            var wasSelected_1 = this._selected;
            Promise.resolve().then(function () {
                if (_this._selected || wasSelected_1) {
                    _this.selected = true;
                    _this._changeDetector.markForCheck();
                }
            });
        }
    };
    McListOption.prototype.ngAfterContentInit = function () {
        this._lineSetter = new McLineSetter(this._lines, this._element);
    };
    McListOption.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(function () { return _this.selected = false; });
        }
        this.listSelection._removeOptionFromList(this);
    };
    McListOption.prototype.toggle = function () {
        this.selected = !this.selected;
    };
    McListOption.prototype.focus = function () {
        this._element.nativeElement.focus();
        this.listSelection.setFocusedOption(this);
    };
    McListOption.prototype.getLabel = function () {
        return this._text ? this._text.nativeElement.textContent : '';
    };
    McListOption.prototype.setSelected = function (selected) {
        if (this._selected === selected || !this.listSelection.selectedOptions) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.listSelection.selectedOptions.select(this);
        }
        else {
            this.listSelection.selectedOptions.deselect(this);
        }
        this._changeDetector.markForCheck();
    };
    McListOption.prototype._getHeight = function () {
        return this._element.nativeElement.getClientRects()[0].height;
    };
    McListOption.prototype._handleClick = function () {
        if (this.disabled) {
            return;
        }
        this.listSelection.setFocusedOption(this);
    };
    McListOption.prototype._handleFocus = function () {
        if (this.disabled || this._hasFocus) {
            return;
        }
        this._hasFocus = true;
    };
    McListOption.prototype._handleBlur = function () {
        this._hasFocus = false;
        this.listSelection._onTouched();
    };
    McListOption.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate([
        core.ContentChildren(McLine),
        __metadata("design:type", core.QueryList)
    ], McListOption.prototype, "_lines", void 0);
    __decorate([
        core.ViewChild('text'),
        __metadata("design:type", core.ElementRef)
    ], McListOption.prototype, "_text", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McListOption.prototype, "checkboxPosition", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McListOption.prototype, "value", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McListOption.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McListOption.prototype, "selected", null);
    McListOption = __decorate([
        core.Component({
            exportAs: 'mcListOption',
            selector: 'mc-list-option',
            host: {
                tabindex: '-1',
                class: 'mc-list-option',
                '[class.mc-selected]': 'selected',
                '[class.mc-focused]': '_hasFocus',
                '(focus)': '_handleFocus()',
                '(blur)': '_handleBlur()',
                '(click)': '_handleClick()'
            },
            template: "<div class=\"mc-list-item-content\"><div class=\"mc-list-text\" #text><ng-content></ng-content></div></div>",
            encapsulation: core.ViewEncapsulation.None,
            preserveWhitespaces: false,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(2, core.Inject(core.forwardRef(function () { return McListSelection; }))),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef,
            McListSelection])
    ], McListOption);
    return McListOption;
}());
var MC_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return McListSelection; }),
    multi: true
};
// Change event that is being fired whenever the selected state of an option changes. */
var McListSelectionChange = /** @class */ (function () {
    function McListSelectionChange(
    // Reference to the selection list that emitted the event.
    source, 
    // Reference to the option that has been changed.
    option) {
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
var _McListSelectionMixinBase = mixinDisabled(McListSelectionBase);
var McListSelection = /** @class */ (function (_super) {
    __extends(McListSelection, _super);
    function McListSelection(_element, tabIndex, autoSelect, noUnselect, multiple) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this.horizontal = false;
        // Emits a change event whenever the selected state of an option changes.
        _this.selectionChange = new core.EventEmitter();
        _this._modelChanges = rxjs.Subscription.EMPTY;
        // View to model callback that should be called if the list or its options lost focus.
        _this._onTouched = function () { };
        // View to model callback that should be called whenever the selected options change.
        _this._onChange = function (_) { };
        _this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        _this.multiple = multiple === null ? true : toBoolean(multiple);
        _this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.selectedOptions = new collections.SelectionModel(_this.multiple);
        return _this;
    }
    McListSelection.prototype.ngAfterContentInit = function () {
        this.horizontal = toBoolean(this.horizontal);
        this._keyManager = new a11y.FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(!this.horizontal)
            .withHorizontalOrientation(this.horizontal ? 'ltr' : null);
        if (this._tempValues) {
            this._setOptionsFromValues(this._tempValues);
            this._tempValues = null;
        }
        // Sync external changes to the model back to the options.
        this._modelChanges = this.selectedOptions.onChange.subscribe(function (event) {
            for (var _i = 0, _a = event.added; _i < _a.length; _i++) {
                var item = _a[_i];
                item.selected = true;
            }
            for (var _b = 0, _c = event.removed; _b < _c.length; _b++) {
                var item = _c[_b];
                item.selected = false;
            }
        });
        this.updateScrollSize();
    };
    McListSelection.prototype.ngOnDestroy = function () {
        this._modelChanges.unsubscribe();
    };
    McListSelection.prototype.focus = function () {
        this._element.nativeElement.focus();
    };
    McListSelection.prototype.selectAll = function () {
        this.options.forEach(function (option) { return option.setSelected(true); });
        this._reportValueChange();
    };
    McListSelection.prototype.deselectAll = function () {
        this.options.forEach(function (option) { return option.setSelected(false); });
        this._reportValueChange();
    };
    McListSelection.prototype.updateScrollSize = function () {
        if (this.horizontal || !this.options.first) {
            return;
        }
        this._keyManager.withScrollSize(Math.floor(this._getHeight() / this.options.first._getHeight()));
    };
    // Sets the focused option of the selection-list.
    McListSelection.prototype.setFocusedOption = function (option) {
        this._keyManager.updateActiveItem(option);
        if (this.withShift && this.multiple) {
            var previousIndex_1 = this._keyManager.previousActiveItemIndex;
            var activeIndex_1 = this._keyManager.activeItemIndex;
            if (previousIndex_1 < activeIndex_1) {
                this.options.forEach(function (item, index) {
                    if (index >= previousIndex_1 && index <= activeIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            else {
                this.options.forEach(function (item, index) {
                    if (index >= activeIndex_1 && index <= previousIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            this.withShift = false;
        }
        else if (this.withCtrl) {
            this.withCtrl = false;
            if (!this._canDeselectLast(option)) {
                return;
            }
            option.toggle();
        }
        else {
            if (this.autoSelect) {
                this.options.forEach(function (item) { return item.setSelected(false); });
                option.setSelected(true);
            }
        }
        this._emitChangeEvent(option);
        this._reportValueChange();
    };
    // Implemented as part of ControlValueAccessor.
    McListSelection.prototype.writeValue = function (values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    };
    // Implemented as part of ControlValueAccessor.
    McListSelection.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McListSelection.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    // Implemented as a part of ControlValueAccessor.
    McListSelection.prototype.setDisabledState = function (isDisabled) {
        if (this.options) {
            this.options.forEach(function (option) { return option.disabled = isDisabled; });
        }
    };
    McListSelection.prototype.getSelectedOptionValues = function () {
        return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
    };
    // Toggles the selected state of the currently focused option.
    McListSelection.prototype.toggleFocusedOption = function () {
        var focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this._canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    };
    McListSelection.prototype._canDeselectLast = function (listOption) {
        return !(this.noUnselect && this.selectedOptions.selected.length === 1 && listOption.selected);
    };
    McListSelection.prototype._getHeight = function () {
        return this._element.nativeElement.getClientRects()[0].height;
    };
    // Removes an option from the selection list and updates the active item.
    McListSelection.prototype._removeOptionFromList = function (option) {
        if (option._hasFocus) {
            var optionIndex = this._getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.setNextItemActive();
            }
        }
    };
    McListSelection.prototype._onKeyDown = function (event) {
        var keyCode = event.keyCode;
        this.withShift = event.shiftKey;
        this.withCtrl = event.ctrlKey;
        switch (keyCode) {
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
                    this._keyManager.setPreviousPageItemActive();
                }
                event.preventDefault();
                break;
            case keycodes.PAGE_DOWN:
                if (!this.horizontal) {
                    this._keyManager.setNextPageItemActive();
                }
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    // Reports a value change to the ControlValueAccessor
    McListSelection.prototype._reportValueChange = function () {
        if (this.options) {
            this._onChange(this.getSelectedOptionValues());
        }
    };
    // Emits a change event if the selected state of an option changed.
    McListSelection.prototype._emitChangeEvent = function (option) {
        this.selectionChange.emit(new McListSelectionChange(this, option));
    };
    // Returns the option with the specified value.
    McListSelection.prototype._getOptionByValue = function (value) {
        return this.options.find(function (option) { return option.value === value; });
    };
    // Sets the selected options based on the specified values.
    McListSelection.prototype._setOptionsFromValues = function (values) {
        var _this = this;
        this.options.forEach(function (option) { return option.setSelected(false); });
        values
            .map(function (value) { return _this._getOptionByValue(value); })
            .filter(Boolean)
            .forEach(function (option) { return option.setSelected(true); });
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    McListSelection.prototype._isValidIndex = function (index) {
        return index >= 0 && index < this.options.length;
    };
    // Returns the index of the specified list option.
    McListSelection.prototype._getOptionIndex = function (option) {
        return this.options.toArray().indexOf(option);
    };
    __decorate([
        core.ContentChildren(McListOption),
        __metadata("design:type", core.QueryList)
    ], McListSelection.prototype, "options", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McListSelection.prototype, "horizontal", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McListSelection.prototype, "selectionChange", void 0);
    McListSelection = __decorate([
        core.Component({
            exportAs: 'mcListSelection',
            selector: 'mc-list-selection',
            template: '<ng-content></ng-content>',
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:32px;line-height:2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:32px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
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
        }),
        __param(1, core.Attribute('tabindex')),
        __param(2, core.Attribute('auto-select')),
        __param(3, core.Attribute('no-unselect')),
        __param(4, core.Attribute('multiple')),
        __metadata("design:paramtypes", [core.ElementRef, String, String, String, String])
    ], McListSelection);
    return McListSelection;
}(_McListSelectionMixinBase));

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
    McList = __decorate([
        core.Component({
            selector: 'mc-list',
            host: { class: 'mc-list' },
            template: '<ng-content></ng-content>',
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-subheader{display:flex;box-sizing:border-box;padding:15px;align-items:center}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{margin:0}.mc-list,.mc-list-selection{display:block}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{height:32px;line-height:2px}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list-item,.mc-list .mc-list-option,.mc-list-selection .mc-list-item,.mc-list-selection .mc-list-option{display:block;height:32px}.mc-list .mc-list-item .mc-list-item-content,.mc-list .mc-list-option .mc-list-item-content,.mc-list-selection .mc-list-item .mc-list-item-content,.mc-list-selection .mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list .mc-list-item.mc-2-line,.mc-list .mc-list-option.mc-2-line,.mc-list-selection .mc-list-item.mc-2-line,.mc-list-selection .mc-list-option.mc-2-line{height:72px}.mc-list .mc-list-item.mc-3-line,.mc-list .mc-list-option.mc-3-line,.mc-list-selection .mc-list-item.mc-3-line,.mc-list-selection .mc-list-option.mc-3-line{height:88px}.mc-list .mc-list-item.mc-multi-line,.mc-list .mc-list-option.mc-multi-line,.mc-list-selection .mc-list-item.mc-multi-line,.mc-list-selection .mc-list-option.mc-multi-line{height:auto}.mc-list .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list .mc-list-option.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-selection .mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list .mc-list-item .mc-list-text,.mc-list .mc-list-option .mc-list-text,.mc-list-selection .mc-list-item .mc-list-text,.mc-list-selection .mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list .mc-list-item .mc-list-text>*,.mc-list .mc-list-option .mc-list-text>*,.mc-list-selection .mc-list-item .mc-list-text>*,.mc-list-selection .mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list .mc-list-item .mc-list-text:empty,.mc-list .mc-list-option .mc-list-text:empty,.mc-list-selection .mc-list-item .mc-list-text:empty,.mc-list-selection .mc-list-option .mc-list-text:empty{display:none}.mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-selection .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list .mc-list-item .mc-list-icon,.mc-list .mc-list-option .mc-list-icon,.mc-list-selection .mc-list-item .mc-list-icon,.mc-list-selection .mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list .mc-list-option .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-selection .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list .mc-list-item .mc-divider,.mc-list .mc-list-option .mc-divider,.mc-list-selection .mc-list-item .mc-divider,.mc-list-selection .mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list .mc-list-item .mc-divider,[dir=rtl] .mc-list .mc-list-option .mc-divider,[dir=rtl] .mc-list-selection .mc-list-item .mc-divider,[dir=rtl] .mc-list-selection .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list .mc-list-item .mc-divider.mc-divider-inset,.mc-list .mc-list-option .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-item .mc-divider.mc-divider-inset,.mc-list-selection .mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None
        })
    ], McList);
    return McList;
}(McListBase));
/**
 * Directive whose purpose is to add the mc- CSS styling to this selector.
 * @docs-private
 */
var McListSubheaderCssStyler = /** @class */ (function () {
    function McListSubheaderCssStyler() {
    }
    McListSubheaderCssStyler = __decorate([
        core.Directive({
            selector: '[mc-subheader], [mcSubheader]',
            host: { class: 'mc-subheader' }
        })
    ], McListSubheaderCssStyler);
    return McListSubheaderCssStyler;
}());
// Boilerplate for applying mixins to McListItem.
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
    McListItem.prototype.ngAfterContentInit = function () {
        this._lineSetter = new McLineSetter(this._lines, this._element);
    };
    McListItem.prototype._handleFocus = function () {
        this._element.nativeElement.classList.add('mc-focused');
    };
    McListItem.prototype._handleBlur = function () {
        this._element.nativeElement.classList.remove('mc-focused');
    };
    McListItem.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate([
        core.ContentChildren(McLine),
        __metadata("design:type", core.QueryList)
    ], McListItem.prototype, "_lines", void 0);
    McListItem = __decorate([
        core.Component({
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
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McListItem);
    return McListItem;
}(McListItemBase));

var McListModule = /** @class */ (function () {
    function McListModule() {
    }
    McListModule = __decorate([
        core.NgModule({
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
        })
    ], McListModule);
    return McListModule;
}());

var McLink = /** @class */ (function () {
    function McLink(elementRef, _focusMonitor) {
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
        this._focusMonitor.monitor(elementRef.nativeElement, true);
    }
    McLink.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    McLink.prototype.focus = function () {
        this._getHostElement().focus();
    };
    McLink.prototype._getHostElement = function () {
        return this.elementRef.nativeElement;
    };
    McLink = __decorate([
        core.Component({
            selector: 'a.mc-link',
            template: "<ng-content></ng-content>",
            encapsulation: core.ViewEncapsulation.None,
            styles: [".mc-link{display:inline-flex;align-items:center;padding:2px 4px;text-decoration:none!important;cursor:pointer;outline:0}.mc-link{transition-property:color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link:focus{transition:none}.mc-link:hover{transition:none}.mc-link.mc-focused,.mc-link:focus{border-radius:3px}.mc-link.mc-disabled,.mc-link[disabled]{pointer-events:none;cursor:default}.mc-link>.mc-link__icon{color:inherit}.mc-link>.mc-link__text:not(:first-child){margin-left:4px}.mc-link>.mc-link__text:not(:last-child){margin-right:4px}.mc-link .mc-link_dashed,.mc-link.mc-link_underlined{transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link .mc-link_dashed:focus,.mc-link.mc-link_underlined:focus{transition:none}.mc-link .mc-link_dashed:hover,.mc-link.mc-link_underlined:hover{transition:none}"]
        }),
        __metadata("design:paramtypes", [core.ElementRef, a11y.FocusMonitor])
    ], McLink);
    return McLink;
}());

var McLinkModule = /** @class */ (function () {
    function McLinkModule() {
    }
    McLinkModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule
            ],
            declarations: [
                McLink
            ],
            exports: [
                McLink
            ]
        })
    ], McLinkModule);
    return McLinkModule;
}());

var COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
var MC_ICON = 'mc-icon';
var MC_NAVBAR = 'mc-navbar';
var MC_NAVBAR_CONTAINER = 'mc-navbar-container';
var MC_NAVBAR_ITEM = 'mc-navbar-item';
var MC_NAVBAR_BRAND = 'mc-navbar-brand';
var MC_NAVBAR_TITLE = 'mc-navbar-title';
var MC_NAVBAR_LOGO = 'mc-navbar-logo';
var McNavbarLogo = /** @class */ (function () {
    function McNavbarLogo() {
    }
    McNavbarLogo = __decorate([
        core.Directive({
            selector: MC_NAVBAR_LOGO,
            host: {
                class: MC_NAVBAR_LOGO
            }
        })
    ], McNavbarLogo);
    return McNavbarLogo;
}());
var McNavbarBrand = /** @class */ (function () {
    function McNavbarBrand() {
    }
    McNavbarBrand = __decorate([
        core.Directive({
            selector: MC_NAVBAR_BRAND,
            host: {
                class: MC_NAVBAR_BRAND
            }
        })
    ], McNavbarBrand);
    return McNavbarBrand;
}());
var McNavbarTitle = /** @class */ (function () {
    function McNavbarTitle() {
    }
    McNavbarTitle = __decorate([
        core.Directive({
            selector: MC_NAVBAR_TITLE,
            host: {
                class: MC_NAVBAR_TITLE
            }
        })
    ], McNavbarTitle);
    return McNavbarTitle;
}());
var McNavbarItemBase = /** @class */ (function () {
    function McNavbarItemBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McNavbarItemBase;
}());
var _McNavbarMixinBase = mixinDisabled(McNavbarItemBase);
var McNavbarItem = /** @class */ (function (_super) {
    __extends(McNavbarItem, _super);
    function McNavbarItem(elementRef, _focusMonitor, _platform, _cdRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._platform = _platform;
        _this._cdRef = _cdRef;
        _this.tabIndex = 0;
        _this.dropdownItems = [];
        _this.isCollapsed = true;
        _this._subscription = new rxjs.Subscription();
        return _this;
    }
    Object.defineProperty(McNavbarItem.prototype, "collapsedTitle", {
        set: function (value) {
            this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbarItem.prototype, "hasDropdownContent", {
        get: function () {
            return this.dropdownItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbarItem.prototype, "_dropdownElements", {
        get: function () {
            return this.dropdownContent ? this.dropdownContent.nativeElement.querySelectorAll('li > *') : [];
        },
        enumerable: true,
        configurable: true
    });
    McNavbarItem.prototype.ngOnInit = function () {
        this.denyClickIfDisabled();
        this._focusMonitor$ = this._focusMonitor.monitor(this.elementRef.nativeElement, true);
        if (this.hasDropdownContent) {
            this.listenClickOutside();
        }
    };
    McNavbarItem.prototype.ngAfterViewInit = function () {
        if (!this.hasDropdownContent) {
            return;
        }
        this.startListenFocusDropdownItems();
    };
    McNavbarItem.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.stopListenFocusDropdownItems();
    };
    McNavbarItem.prototype.isActiveDropdownLink = function (link) {
        if (!this._platform.isBrowser) {
            return false;
        }
        return window.location.href.indexOf(link) >= 0;
    };
    McNavbarItem.prototype.handleClickByItem = function () {
        this.toggleDropdown();
    };
    McNavbarItem.prototype.handleKeydown = function ($event) {
        var isNavbarItem = $event.target.classList.contains(MC_NAVBAR_ITEM);
        // tslint:disable-next-line
        if (this.hasDropdownContent && $event.keyCode === keycodes.SPACE && isNavbarItem) {
            this.toggleDropdown();
        }
    };
    McNavbarItem.prototype.handleClickByDropdownItem = function () {
        this.forceCloseDropdown();
    };
    McNavbarItem.prototype.listenClickOutside = function () {
        var _this = this;
        this._subscription.add(this._focusMonitor$.subscribe(function (origin) {
            if (origin === null) {
                _this.forceCloseDropdown();
            }
        }));
    };
    McNavbarItem.prototype.toggleDropdown = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    McNavbarItem.prototype.forceCloseDropdown = function () {
        this.isCollapsed = true;
        this._cdRef.detectChanges();
    };
    McNavbarItem.prototype.startListenFocusDropdownItems = function () {
        var _this = this;
        this._dropdownElements.forEach(function (el) {
            _this._focusMonitor.monitor(el, true);
        });
    };
    McNavbarItem.prototype.stopListenFocusDropdownItems = function () {
        var _this = this;
        this._dropdownElements.forEach(function (el) {
            _this._focusMonitor.stopMonitoring(el);
        });
    };
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    McNavbarItem.prototype.denyClickIfDisabled = function () {
        var _this = this;
        var events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach(function (event) { return _this.elementRef.nativeElement.removeEventListener('click', event); });
        this.elementRef.nativeElement.addEventListener('click', function (event) {
            if (_this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }, true);
        events.forEach(function (event) { return _this.elementRef.nativeElement.addEventListener('click', event); });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McNavbarItem.prototype, "tabIndex", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Array)
    ], McNavbarItem.prototype, "dropdownItems", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McNavbarItem.prototype, "collapsedTitle", null);
    __decorate([
        core.ContentChild('dropdownItemTmpl', { read: core.TemplateRef }),
        __metadata("design:type", core.TemplateRef)
    ], McNavbarItem.prototype, "dropdownItemTmpl", void 0);
    __decorate([
        core.ViewChild('dropdownContent', { read: core.ElementRef }),
        __metadata("design:type", core.ElementRef)
    ], McNavbarItem.prototype, "dropdownContent", void 0);
    McNavbarItem = __decorate([
        core.Component({
            selector: MC_NAVBAR_ITEM,
            template: "\n        <a\n            [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n            (click)=\"handleClickByItem()\"\n            (keydown)=\"handleKeydown($event)\"\n            class=\"mc-navbar-item\"\n        >\n            <ng-content></ng-content>\n            <i *ngIf=\"hasDropdownContent\" mc-icon=\"mc-angle-M_16\"></i>\n        </a>\n        <ul\n            #dropdownContent\n            *ngIf=\"hasDropdownContent\"\n            [ngClass]=\"{ 'is-collapsed': isCollapsed }\"\n            class=\"mc-navbar-dropdown\"\n        >\n            <li\n                *ngFor=\"let item of dropdownItems\"\n                (click)=\"handleClickByDropdownItem()\"\n                class=\"mc-navbar-dropdown-item\"\n            >\n                <ng-container *ngIf=\"dropdownItemTmpl\">\n                    <ng-container *ngTemplateOutlet=\"dropdownItemTmpl; context: { $implicit: item }\"></ng-container>\n                </ng-container>\n                <a\n                    *ngIf=\"!dropdownItemTmpl\"\n                    [attr.href]=\"item.link\"\n                    [ngClass]=\"{ 'is-active': isActiveDropdownLink(item.link) }\"\n                    class=\"mc-navbar-dropdown-link\"\n                >{{ item.text }}</a>\n            </li>\n        </ul>\n    ",
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            inputs: ['disabled'],
            host: {
                '[attr.disabled]': 'disabled || null',
                '[attr.tabindex]': '-1'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            a11y.FocusMonitor,
            platform.Platform,
            core.ChangeDetectorRef])
    ], McNavbarItem);
    return McNavbarItem;
}(_McNavbarMixinBase));
var McNavbarContainer = /** @class */ (function () {
    function McNavbarContainer() {
        this.position = 'left';
    }
    Object.defineProperty(McNavbarContainer.prototype, "cssClasses", {
        get: function () {
            return this.position === 'left' ? 'mc-navbar-left' : 'mc-navbar-right';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McNavbarContainer.prototype, "position", void 0);
    __decorate([
        core.HostBinding('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], McNavbarContainer.prototype, "cssClasses", null);
    McNavbarContainer = __decorate([
        core.Directive({
            selector: MC_NAVBAR_CONTAINER
        })
    ], McNavbarContainer);
    return McNavbarContainer;
}());
var CollapsibleItem = /** @class */ (function () {
    function CollapsibleItem(element, width) {
        this.element = element;
        this.width = width;
        this._collapsed = false;
    }
    CollapsibleItem.prototype.processCollapsed = function (collapsed) {
        this._collapsed = collapsed;
        this.updateCollapsedClass();
    };
    CollapsibleItem.prototype.updateCollapsedClass = function () {
        if (this._collapsed) {
            this.element.classList.add(COLLAPSED_CLASS);
        }
        else {
            this.element.classList.remove(COLLAPSED_CLASS);
        }
    };
    return CollapsibleItem;
}());
var CachedItemWidth = /** @class */ (function () {
    function CachedItemWidth(element, width, itemsForCollapse) {
        if (itemsForCollapse === void 0) { itemsForCollapse = []; }
        this.element = element;
        this.width = width;
        this.itemsForCollapse = itemsForCollapse;
    }
    Object.defineProperty(CachedItemWidth.prototype, "canCollapse", {
        get: function () {
            return this.itemsForCollapse.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CachedItemWidth.prototype, "collapsedItemsWidth", {
        get: function () {
            if (this._collapsedItemsWidth !== undefined) {
                return this._collapsedItemsWidth;
            }
            this.calculateAndCacheCollapsedItemsWidth();
            return this._collapsedItemsWidth;
        },
        enumerable: true,
        configurable: true
    });
    CachedItemWidth.prototype.processCollapsed = function (collapsed) {
        if (this.itemsForCollapse.length > 0) {
            this.updateTitle(collapsed);
        }
        this.itemsForCollapse.forEach(function (item) { return item.processCollapsed(collapsed); });
    };
    CachedItemWidth.prototype.calculateAndCacheCollapsedItemsWidth = function () {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce(function (acc, item) { return acc + item.width; }, 0);
    };
    CachedItemWidth.prototype.getTitle = function () {
        var computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    };
    CachedItemWidth.prototype.updateTitle = function (collapsed) {
        if (collapsed) {
            this.element.setAttribute('title', this.getTitle());
        }
        else {
            this.element.removeAttribute('title');
        }
    };
    return CachedItemWidth;
}());
var McNavbar = /** @class */ (function () {
    function McNavbar(_elementRef) {
        this._elementRef = _elementRef;
        this.forceRecalculateItemsWidth = false;
        this.resizeDebounceInterval = 100;
        this.firstLevelElement = MC_NAVBAR_CONTAINER;
        this.secondLevelElements = [
            MC_NAVBAR_ITEM,
            MC_NAVBAR_BRAND,
            MC_NAVBAR_TITLE
        ];
        var resizeObserver = rxjs.fromEvent(window, 'resize')
            .pipe(operators.debounceTime(this.resizeDebounceInterval));
        this._resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    Object.defineProperty(McNavbar.prototype, "maxAllowedWidth", {
        get: function () {
            return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbar.prototype, "itemsWidths", {
        get: function () {
            if (this._itemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
                return this._itemsWidths;
            }
            this.calculateAndCacheItemsWidth();
            return this._itemsWidths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McNavbar.prototype, "totalItemsWidth", {
        get: function () {
            if (this._totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
                return this._totalItemsWidths;
            }
            this.calculateAndCacheTotalItemsWidth();
            return this._totalItemsWidths;
        },
        enumerable: true,
        configurable: true
    });
    McNavbar.prototype.updateCollapsed = function () {
        var collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (var i = this.itemsWidths.length - 1; i >= 0; i--) {
            var item = this.itemsWidths[i];
            if (!item.canCollapse) {
                continue;
            }
            item.processCollapsed(collapseDelta > 0);
            collapseDelta -= item.collapsedItemsWidth;
        }
    };
    McNavbar.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(function () { return _this.updateCollapsed(); }, 0);
    };
    McNavbar.prototype.ngOnDestroy = function () {
        this._resizeSubscription.unsubscribe();
    };
    McNavbar.prototype.calculateAndCacheTotalItemsWidth = function () {
        this._totalItemsWidths = this.itemsWidths
            .reduce(function (acc, item) { return acc + item.width; }, 0);
    };
    McNavbar.prototype.getOuterElementWidth = function (element) {
        var baseWidth = element.getBoundingClientRect().width;
        var marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        var marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    };
    McNavbar.prototype.calculateAndCacheItemsWidth = function () {
        var _this = this;
        var allItemsSelector = this.secondLevelElements
            .map(function (e) { return _this.firstLevelElement + ">" + e; });
        var allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map(function (el) { return new CachedItemWidth(el, _this.getOuterElementWidth(el), _this.getItemsForCollapse(el)); });
    };
    McNavbar.prototype.getItemsForCollapse = function (element) {
        var icon = element.querySelector("[" + MC_ICON + "]," + MC_NAVBAR_LOGO + ",[" + MC_NAVBAR_LOGO + "]");
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll(MC_NAVBAR_TITLE))
            .map(function (el) { return new CollapsibleItem(el, el.getBoundingClientRect().width); });
    };
    McNavbar = __decorate([
        core.Component({
            selector: MC_NAVBAR,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            template: "\n        <nav class=\"mc-navbar\">\n            <ng-content select=\"[" + MC_NAVBAR_CONTAINER + "]," + MC_NAVBAR_CONTAINER + "\"></ng-content>\n        </nav>\n    ",
            styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{height:100%;display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:48px;padding:0 0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:8px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:8px}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:16px;padding-right:16px;background-color:transparent;border:none}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:12px;margin-right:24px}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:12px;padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}.mc-navbar-dropdown{position:absolute;top:100%;left:0;box-sizing:border-box;min-width:100%;height:auto;margin:0;list-style:none;padding-top:4px;padding-right:0;padding-bottom:4px;padding-left:0;border:1px solid;border-top:none;z-index:1}.mc-navbar-right .mc-navbar-dropdown{left:auto;right:0}.mc-navbar-dropdown-link{position:relative;display:block;box-sizing:border-box;padding-top:6px;padding-right:16px;padding-bottom:6px;padding-left:16px;border:2px solid transparent;text-decoration:none;white-space:nowrap}.mc-navbar-dropdown-link.is-active:hover::before{position:absolute;top:-2px;right:-2px;bottom:-2px;left:-2px;content:\"\"}.mc-navbar-dropdown.is-collapsed{display:none}"],
            encapsulation: core.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McNavbar);
    return McNavbar;
}());

var McNavbarModule = /** @class */ (function () {
    function McNavbarModule() {
    }
    McNavbarModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule,
                platform.PlatformModule,
                McIconModule
            ],
            exports: [
                McNavbar,
                McNavbarContainer,
                McNavbarTitle,
                McNavbarItem,
                McNavbarBrand,
                McNavbarLogo
            ],
            declarations: [
                McNavbar,
                McNavbarContainer,
                McNavbarTitle,
                McNavbarItem,
                McNavbarBrand,
                McNavbarLogo
            ]
        })
    ], McNavbarModule);
    return McNavbarModule;
}());

var idIterator = 0;
var MIN_PERCENT = 0;
var MAX_PERCENT = 100;
var McProgressBarBase = /** @class */ (function () {
    function McProgressBarBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McProgressBarBase;
}());
var _McProgressBarMixinBase = mixinColor(McProgressBarBase);
var McProgressBar = /** @class */ (function (_super) {
    __extends(McProgressBar, _super);
    function McProgressBar(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.id = "mc-progress-bar-" + idIterator++;
        _this.value = 0;
        _this.mode = 'determinate';
        _this.color = exports.ThemePalette.Primary;
        return _this;
    }
    Object.defineProperty(McProgressBar.prototype, "percentage", {
        get: function () {
            return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McProgressBar.prototype, "id", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McProgressBar.prototype, "value", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McProgressBar.prototype, "mode", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McProgressBar.prototype, "color", void 0);
    McProgressBar = __decorate([
        core.Component({
            selector: 'mc-progress-bar',
            template: "<div class=\"mc-progress-bar__inner\" [ngSwitch]=\"mode\" [id]=\"id\"><div *ngSwitchCase=\"'indeterminate'\" class=\"mc-progress-bar__line mc-progress-bar__line--indeterminate\"></div><div *ngSwitchDefault class=\"mc-progress-bar__line mc-progress-bar__line--determinate\" [ngStyle]=\"{transform: 'scaleX(' + percentage + ')'}\"></div></div>",
            styles: ["@keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}100%{transform:scaleX(.4) translateX(250%)}}.mc-progress-bar{display:block;height:4px;overflow:hidden}.mc-progress-bar__inner{height:100%}.mc-progress-bar__line{height:100%;transform-origin:top left}.mc-progress-bar__line--determinate{transition:transform .3s}.mc-progress-bar__line--indeterminate{animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            host: {
                class: 'mc-progress-bar',
                '[attr.id]': 'id'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McProgressBar);
    return McProgressBar;
}(_McProgressBarMixinBase));

var McProgressBarModule = /** @class */ (function () {
    function McProgressBarModule() {
    }
    McProgressBarModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                platform.PlatformModule
            ],
            exports: [
                McProgressBar
            ],
            declarations: [
                McProgressBar
            ]
        })
    ], McProgressBarModule);
    return McProgressBarModule;
}());

var idIterator$1 = 0;
var MIN_PERCENT$1 = 0;
var MAX_PERCENT$1 = 100;
var McProgressSpinnerBase = /** @class */ (function () {
    function McProgressSpinnerBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McProgressSpinnerBase;
}());
var _McProgressPinnerMixinBase = mixinColor(McProgressSpinnerBase);
var MAX_DASH_ARRAY = 273;
var McProgressSpinner = /** @class */ (function (_super) {
    __extends(McProgressSpinner, _super);
    function McProgressSpinner(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.id = "mc-progress-spinner-" + idIterator$1++;
        _this.value = 0;
        _this.mode = 'determinate';
        _this.color = exports.ThemePalette.Primary;
        return _this;
    }
    Object.defineProperty(McProgressSpinner.prototype, "percentage", {
        get: function () {
            return Math.max(MIN_PERCENT$1, Math.min(MAX_PERCENT$1, this.value)) / MAX_PERCENT$1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McProgressSpinner.prototype, "dashOffsetPercent", {
        get: function () {
            return MAX_DASH_ARRAY - this.percentage * MAX_DASH_ARRAY + "%";
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McProgressSpinner.prototype, "id", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McProgressSpinner.prototype, "value", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McProgressSpinner.prototype, "mode", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McProgressSpinner.prototype, "color", void 0);
    McProgressSpinner = __decorate([
        core.Component({
            selector: 'mc-progress-spinner',
            template: "<div class=\"mc-progress-spinner__inner\" [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\"><svg focusable=\"false\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 100 100\" class=\"mc-progress-spinner__svg\"><circle cx=\"50%\" cy=\"50%\" r=\"42.5%\" class=\"mc-progress-spinner__circle\" [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\"></circle></svg></div>",
            styles: ["@keyframes mc-progress-spinner-indeterminate{100%{transform:rotateZ(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;height:16px;overflow:hidden}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotateZ(-90deg)}.mc-progress-spinner__inner--indeterminate{animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            host: {
                class: 'mc-progress-spinner',
                '[attr.id]': 'id'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McProgressSpinner);
    return McProgressSpinner;
}(_McProgressPinnerMixinBase));

var McProgressSpinnerModule = /** @class */ (function () {
    function McProgressSpinnerModule() {
    }
    McProgressSpinnerModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                platform.PlatformModule
            ],
            exports: [
                McProgressSpinner
            ],
            declarations: [
                McProgressSpinner
            ]
        })
    ], McProgressSpinnerModule);
    return McProgressSpinnerModule;
}());

// Increasing integer for generating unique ids for radio components.
var nextUniqueId$3 = 0;
/** Change event object emitted by McRadio. */
var McRadioChange = /** @class */ (function () {
    function McRadioChange(
    /** The McRadioButton that emits the change event. */
    source, 
    /** The value of the McRadioButton. */
    value) {
        this.source = source;
        this.value = value;
    }
    return McRadioChange;
}());
// Boilerplate for applying mixins to McRadioGroup.
/** @docs-private */
var McRadioGroupBase = /** @class */ (function () {
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
        _this._name = "mc-radio-group-" + nextUniqueId$3++;
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
        // tslint:disable-next-line
        _this.controlValueAccessorChangeFn = function () { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * @docs-private
         */
        // tslint:disable-next-line
        _this.onTouched = function () { };
        return _this;
    }
    Object.defineProperty(McRadioGroup.prototype, "name", {
        /** Name of the radio button group. All radio buttons inside this group will use this name. */
        get: function () { return this._name; },
        set: function (value) {
            this._name = value;
            this.updateRadioButtonNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "labelPosition", {
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        get: function () {
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
        /** Value of the radio button. */
        get: function () { return this._value; },
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
    Object.defineProperty(McRadioGroup.prototype, "selected", {
        /** Whether the radio button is selected. */
        get: function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            this.checkSelectedRadioButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "disabled", {
        /** Whether the radio group is disabled */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = toBoolean(value);
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioGroup.prototype, "required", {
        /** Whether the radio group is required */
        get: function () { return this._required; },
        set: function (value) {
            this._required = toBoolean(value);
            this.markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    McRadioGroup.prototype.checkSelectedRadioButton = function () {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    };
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    McRadioGroup.prototype.ngAfterContentInit = function () {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on McRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the McRadioGroup.
        this._isInitialized = true;
    };
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    McRadioGroup.prototype.touch = function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    /** Dispatch change event with current selection and group value. */
    McRadioGroup.prototype.emitChangeEvent = function () {
        if (this._isInitialized) {
            this.change.emit(new McRadioChange(this._selected, this._value));
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
    McRadioGroup.prototype.writeValue = function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    McRadioGroup.prototype.registerOnChange = function (fn) {
        this.controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    McRadioGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    McRadioGroup.prototype.setDisabledState = function (isDisabled) {
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
    McRadioGroup.prototype.updateSelectedRadioFromValue = function () {
        var _this = this;
        // If the value already matches the selected radio, do nothing.
        var isAlreadySelected = this._selected !== null && this._selected.value === this._value;
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
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McRadioGroup.prototype, "name", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [Object])
    ], McRadioGroup.prototype, "labelPosition", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McRadioGroup.prototype, "value", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McRadioGroup.prototype, "selected", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], McRadioGroup.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McRadioGroup.prototype, "required", null);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McRadioGroup.prototype, "change", void 0);
    __decorate([
        core.ContentChildren(core.forwardRef(function () { return McRadioButton; }), { descendants: true }),
        __metadata("design:type", core.QueryList)
    ], McRadioGroup.prototype, "_radios", void 0);
    McRadioGroup = __decorate([
        core.Directive({
            selector: 'mc-radio-group',
            exportAs: 'mcRadioGroup',
            providers: [MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
            host: {
                role: 'radiogroup',
                class: 'mc-radio-group'
            },
            inputs: ['disabled']
        }),
        __metadata("design:paramtypes", [core.ChangeDetectorRef])
    ], McRadioGroup);
    return McRadioGroup;
}(_McRadioGroupMixinBase));
// Boilerplate for applying mixins to McRadioButton.
/** @docs-private */
var McRadioButtonBase = /** @class */ (function () {
    function McRadioButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McRadioButtonBase;
}());
var _McRadioButtonMixinBase = mixinColor(mixinTabIndex(McRadioButtonBase));
var McRadioButton = /** @class */ (function (_super) {
    __extends(McRadioButton, _super);
    function McRadioButton(radioGroup, elementRef, _changeDetector, _radioDispatcher) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetector = _changeDetector;
        _this._radioDispatcher = _radioDispatcher;
        _this._uniqueId = "mc-radio-" + ++nextUniqueId$3;
        /* tslint:disable:member-ordering */
        /** The unique ID for the radio button. */
        _this.id = _this._uniqueId;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        _this.change = new core.EventEmitter();
        _this.isFocused = false;
        /** Whether this radio is checked. */
        _this._checked = false;
        /** Value assigned to this radio. */
        _this._value = null;
        /** Unregister function for _radioDispatcher */
        // tslint:disable-next-line
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
        /** Whether this radio button is checked. */
        get: function () { return this._checked; },
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
        /** The value of this radio button. */
        get: function () { return this._value; },
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
        /** Whether the radio button is disabled. */
        get: function () {
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
        /** Whether the radio button is required. */
        get: function () {
            return this._required || (this.radioGroup && this.radioGroup.required);
        },
        set: function (value) {
            this._required = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McRadioButton.prototype, "labelPosition", {
        /** Whether the label should appear after or before the radio button. Defaults to 'after' */
        get: function () {
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
        get: function () { return (this.id || this._uniqueId) + "-input"; },
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
    McRadioButton.prototype.ngOnDestroy = function () {
        this.removeUniqueSelectionListener();
    };
    /** Focuses the radio button. */
    // tslint:disable-next-line
    McRadioButton.prototype.focus = function () { };
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    McRadioButton.prototype.markForCheck = function () {
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
    McRadioButton.prototype.emitChangeEvent = function () {
        this.change.emit(new McRadioChange(this, this._value));
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "id", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "name", void 0);
    __decorate([
        core.Input('aria-label'),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "ariaLabel", void 0);
    __decorate([
        core.Input('aria-labelledby'),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "ariaLabelledby", void 0);
    __decorate([
        core.Input('aria-describedby'),
        __metadata("design:type", String)
    ], McRadioButton.prototype, "ariaDescribedby", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McRadioButton.prototype, "checked", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McRadioButton.prototype, "value", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McRadioButton.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McRadioButton.prototype, "required", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [Object])
    ], McRadioButton.prototype, "labelPosition", null);
    __decorate([
        core.ViewChild('input'),
        __metadata("design:type", core.ElementRef)
    ], McRadioButton.prototype, "_inputElement", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McRadioButton.prototype, "change", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McRadioButton.prototype, "isFocused", void 0);
    McRadioButton = __decorate([
        core.Component({
            selector: 'mc-radio-button',
            template: "<label [attr.for]=\"inputId\" class=\"mc-radio-label\" #label><input #input class=\"mc-radio-input cdk-visually-hidden\" type=\"radio\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [tabIndex]=\"tabIndex\" [attr.name]=\"name\" [required]=\"required\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-describedby]=\"ariaDescribedby\" (change)=\"onInputChange($event)\" (click)=\"onInputClick($event)\"><div class=\"mc-radio-label-content\" [class.mc-radio-label-before]=\"labelPosition == 'before'\"><span style=\"display:none\">&nbsp;</span><ng-content></ng-content></div></label>",
            styles: [".mc-radio-button{display:inline-block}.mc-radio-label{cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle}.mc-radio-label-content{display:inline-block;order:0;line-height:inherit;padding-right:0}[dir=rtl] .mc-radio-label-content{padding-right:26px;padding-left:0}.mc-radio-input{position:absolute;outline:0;opacity:0}.mc-radio-input+.mc-radio-label-content{position:relative;cursor:pointer;padding-left:26px}.mc-radio-input+.mc-radio-label-content:before{position:absolute;left:0;top:-1px;content:'';background:#fff;width:14px;height:14px;display:block;box-shadow:inset 0 0 1px 0 rgba(0,0,0,.2);border-width:1px;border-style:solid;border-radius:50%}.mc-radio-input+.mc-radio-label-content:after{content:'';top:4px;left:5px;width:6px;height:6px;border-radius:50%;position:absolute;opacity:0}.mc-radio-input:checked+.mc-radio-label-content:before{box-shadow:unset}.mc-radio-input:checked:hover+.mc-radio-label-content:after{opacity:1}.mc-radio-input:focus+.mc-radio-label-content:before{top:-2px;left:-1px;box-shadow:inset 0 0 0 1px #fff;border-width:2px}.mc-radio-input[disabled]{cursor:default}.mc-radio-input[disabled]+.mc-radio-label-content{cursor:default}"],
            inputs: ['color', 'tabIndex'],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            exportAs: 'mcRadioButton',
            host: {
                class: 'mc-radio-button',
                '[attr.id]': 'id',
                '[class.mc-radio-checked]': 'checked',
                '[class.mc-radio-disabled]': 'disabled',
                '(focus)': '_inputElement.nativeElement.focus()'
            }
        }),
        __param(0, core.Optional()),
        __metadata("design:paramtypes", [McRadioGroup,
            core.ElementRef,
            core.ChangeDetectorRef,
            collections.UniqueSelectionDispatcher])
    ], McRadioButton);
    return McRadioButton;
}(_McRadioButtonMixinBase));

var McRadioModule = /** @class */ (function () {
    function McRadioModule() {
    }
    McRadioModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, a11y.A11yModule, McCommonModule],
            exports: [McRadioGroup, McRadioButton, McCommonModule],
            declarations: [McRadioGroup, McRadioButton]
        })
    ], McRadioModule);
    return McRadioModule;
}());

var McTreeNodeDef = /** @class */ (function (_super) {
    __extends(McTreeNodeDef, _super);
    function McTreeNodeDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTreeNodeDef_1 = McTreeNodeDef;
    var McTreeNodeDef_1;
    __decorate([
        core.Input('mcTreeNode'),
        __metadata("design:type", Object)
    ], McTreeNodeDef.prototype, "data", void 0);
    McTreeNodeDef = McTreeNodeDef_1 = __decorate([
        core.Directive({
            selector: '[mcTreeNodeDef]',
            inputs: ['when: mcTreeNodeDefWhen'],
            providers: [{ provide: tree.CdkTreeNodeDef, useExisting: McTreeNodeDef_1 }]
        })
    ], McTreeNodeDef);
    return McTreeNodeDef;
}(tree.CdkTreeNodeDef));

var McTreeNodePadding = /** @class */ (function (_super) {
    __extends(McTreeNodePadding, _super);
    function McTreeNodePadding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._baseLeftPadding = 6;
        _this._iconWidth = 20;
        _this._indent = 16;
        return _this;
    }
    McTreeNodePadding_1 = McTreeNodePadding;
    Object.defineProperty(McTreeNodePadding.prototype, "leftPadding", {
        get: function () {
            return (this._withIcon ? 0 : this._iconWidth) + this._baseLeftPadding;
        },
        enumerable: true,
        configurable: true
    });
    McTreeNodePadding.prototype._paddingIndent = function () {
        var nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        var level = this._level || nodeLevel;
        return level ? (level * this._indent) + this.leftPadding + "px" : this._baseLeftPadding + "px";
    };
    McTreeNodePadding.prototype.ngOnInit = function () {
        this._withIcon = this._tree.treeControl.isExpandable(this._treeNode.data);
        this._setPadding();
    };
    var McTreeNodePadding_1;
    __decorate([
        core.Input('mcTreeNodePadding'),
        __metadata("design:type", Number)
    ], McTreeNodePadding.prototype, "level", void 0);
    __decorate([
        core.Input('mcTreeNodePaddingIndent'),
        __metadata("design:type", Number)
    ], McTreeNodePadding.prototype, "indent", void 0);
    McTreeNodePadding = McTreeNodePadding_1 = __decorate([
        core.Directive({
            selector: '[mcTreeNodePadding]',
            providers: [{ provide: tree.CdkTreeNodePadding, useExisting: McTreeNodePadding_1 }]
        })
    ], McTreeNodePadding);
    return McTreeNodePadding;
}(tree.CdkTreeNodePadding));

/**
 * Wrapper for the CdkTree node with Material design styles.
 */
var McTreeNodeOption = /** @class */ (function (_super) {
    __extends(McTreeNodeOption, _super);
    function McTreeNodeOption(_elementRef, treeSelection) {
        var _this = _super.call(this, _elementRef, treeSelection) || this;
        _this._elementRef = _elementRef;
        _this.treeSelection = treeSelection;
        _this.role = 'treeitem';
        _this._hasFocus = false;
        _this._disabled = false;
        _this._selected = false;
        return _this;
    }
    McTreeNodeOption_1 = McTreeNodeOption;
    Object.defineProperty(McTreeNodeOption.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            var newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTreeNodeOption.prototype, "selected", {
        get: function () {
            return this.treeSelection.selectedOptions && this.treeSelection.selectedOptions.isSelected(this) || false;
        },
        set: function (value) {
            var isSelected = toBoolean(value);
            if (isSelected !== this._selected) {
                this.setSelected(isSelected);
                // this.treeSelection._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    McTreeNodeOption.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
        this.treeSelection.setFocusedOption(this);
    };
    McTreeNodeOption.prototype.toggle = function () {
        this.selected = !this.selected;
    };
    McTreeNodeOption.prototype.setSelected = function (selected) {
        if (this._selected === selected || !this.treeSelection.selectedOptions) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.treeSelection.selectedOptions.select(this);
        }
        else {
            this.treeSelection.selectedOptions.deselect(this);
        }
        // this._changeDetector.markForCheck();
    };
    McTreeNodeOption.prototype._getHeight = function () {
        return this._elementRef.nativeElement.getClientRects()[0].height;
    };
    McTreeNodeOption.prototype._handleFocus = function () {
        if (this.disabled || this._hasFocus) {
            return;
        }
        this._hasFocus = true;
    };
    McTreeNodeOption.prototype._handleBlur = function () {
        this._hasFocus = false;
    };
    McTreeNodeOption.prototype._handleClick = function () {
        if (this.disabled) {
            return;
        }
        this.treeSelection.setFocusedOption(this);
    };
    var McTreeNodeOption_1;
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTreeNodeOption.prototype, "role", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTreeNodeOption.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTreeNodeOption.prototype, "selected", null);
    McTreeNodeOption = McTreeNodeOption_1 = __decorate([
        core.Directive({
            exportAs: 'mcTreeNodeOption',
            selector: 'mc-tree-node-option',
            host: {
                tabindex: '-1',
                '[class.mc-selected]': 'selected',
                '[class.mc-focused]': '_hasFocus',
                '[attr.aria-expanded]': 'isExpanded',
                '[attr.aria-level]': 'role === "treeitem" ? level : null',
                class: 'mc-tree-node',
                '(focus)': '_handleFocus()',
                '(blur)': '_handleBlur()',
                '(click)': '_handleClick()'
            },
            providers: [
                { provide: tree.CdkTreeNode, useExisting: McTreeNodeOption_1 }
            ]
        }),
        __param(1, core.Inject(core.forwardRef(function () { return McTreeSelection; }))),
        __metadata("design:paramtypes", [core.ElementRef,
            McTreeSelection])
    ], McTreeNodeOption);
    return McTreeNodeOption;
}(tree.CdkTreeNode));
var _McTreeSelectionBase = mixinTabIndex(mixinDisabled(tree.CdkTree));
var McTreeNavigationChange = /** @class */ (function () {
    function McTreeNavigationChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McTreeNavigationChange;
}());
var McTreeSelectionChange = /** @class */ (function () {
    function McTreeSelectionChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return McTreeSelectionChange;
}());
var McTreeSelection = /** @class */ (function (_super) {
    __extends(McTreeSelection, _super);
    function McTreeSelection(_elementRef, _differs, _changeDetectorRef, tabIndex, multiple, autoSelect, noUnselect) {
        var _this = _super.call(this, _differs, _changeDetectorRef) || this;
        _this._elementRef = _elementRef;
        _this._disabled = false;
        _this.navigationChange = new core.EventEmitter();
        _this.selectionChange = new core.EventEmitter();
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.multiple = multiple === null ? true : toBoolean(multiple);
        _this.autoSelect = autoSelect === null ? true : toBoolean(autoSelect);
        _this.noUnselect = noUnselect === null ? true : toBoolean(noUnselect);
        _this.selectedOptions = new collections.SelectionModel(_this.multiple);
        return _this;
    }
    McTreeSelection_1 = McTreeSelection;
    Object.defineProperty(McTreeSelection.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (rawValue) {
            var value = toBoolean(rawValue);
            if (this._disabled !== value) {
                this._disabled = value;
                if (this._disabled) {
                    console.log('need disable all options');
                }
                else {
                    console.log('need enable all options');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    McTreeSelection.prototype._onKeyDown = function (event) {
        var keyCode = event.keyCode;
        this.withShift = event.shiftKey;
        this.withCtrl = event.ctrlKey;
        switch (keyCode) {
            case keycodes.LEFT_ARROW:
                if (this._keyManager.activeItem) {
                    this.treeControl.collapse(this._keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
            case keycodes.RIGHT_ARROW:
                if (this._keyManager.activeItem) {
                    this.treeControl.expand(this._keyManager.activeItem.data);
                }
                event.preventDefault();
                break;
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
                this._keyManager.setPreviousPageItemActive();
                event.preventDefault();
                break;
            case keycodes.PAGE_DOWN:
                this._keyManager.setNextPageItemActive();
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    McTreeSelection.prototype.ngAfterContentInit = function () {
        this._keyManager = new a11y.FocusKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
    };
    McTreeSelection.prototype.updateScrollSize = function () {
        if (!this.options.first) {
            return;
        }
        this._keyManager.withScrollSize(Math.floor(this._getHeight() / this.options.first._getHeight()));
    };
    McTreeSelection.prototype.setFocusedOption = function (option) {
        this._keyManager.updateActiveItem(option);
        if (this.withShift && this.multiple) {
            var previousIndex_1 = this._keyManager.previousActiveItemIndex;
            var activeIndex_1 = this._keyManager.activeItemIndex;
            if (previousIndex_1 < activeIndex_1) {
                this.options.forEach(function (item, index) {
                    if (index >= previousIndex_1 && index <= activeIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            else {
                this.options.forEach(function (item, index) {
                    if (index >= activeIndex_1 && index <= previousIndex_1) {
                        item.setSelected(true);
                    }
                });
            }
            this.withShift = false;
        }
        else if (this.withCtrl) {
            this.withCtrl = false;
            if (!this._canDeselectLast(option)) {
                return;
            }
            option.toggle();
        }
        else {
            if (this.autoSelect) {
                this.options.forEach(function (item) { return item.setSelected(false); });
                option.setSelected(true);
            }
        }
        this._emitNavigationEvent(option);
    };
    // Toggles the selected state of the currently focused option.
    McTreeSelection.prototype.toggleFocusedOption = function () {
        var focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && this._canDeselectLast(focusedOption)) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    };
    McTreeSelection.prototype.renderNodeChanges = function (data, dataDiffer, viewContainer, parentData) {
        if (dataDiffer === void 0) { dataDiffer = this._dataDiffer; }
        if (viewContainer === void 0) { viewContainer = this._nodeOutlet.viewContainer; }
        _super.prototype.renderNodeChanges.call(this, data, dataDiffer, viewContainer, parentData);
        var arrayOfInstances = [];
        viewContainer._embeddedViews.forEach(function (view) {
            var viewDef = view.def;
            viewDef.nodes.forEach(function (node) {
                if (viewDef.nodeMatchedQueries === node.matchedQueryIds) {
                    var nodeData = view.nodes[node.nodeIndex];
                    arrayOfInstances.push(nodeData.instance);
                }
            });
        });
        if (this.options) {
            this.options.reset(arrayOfInstances);
            this.options.notifyOnChanges();
        }
        this.updateScrollSize();
    };
    McTreeSelection.prototype._getHeight = function () {
        return this._elementRef.nativeElement.getClientRects()[0].height;
    };
    McTreeSelection.prototype._emitNavigationEvent = function (option) {
        this.navigationChange.emit(new McTreeNavigationChange(this, option));
    };
    McTreeSelection.prototype._emitChangeEvent = function (option) {
        this.selectionChange.emit(new McTreeNavigationChange(this, option));
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    McTreeSelection.prototype._isValidIndex = function (index) {
        return index >= 0 && index < this.options.length;
    };
    McTreeSelection.prototype._canDeselectLast = function (option) {
        return !(this.noUnselect && this.selectedOptions.selected.length === 1 && option.selected);
    };
    var McTreeSelection_1;
    __decorate([
        core.ViewChild(tree.CdkTreeNodeOutlet),
        __metadata("design:type", tree.CdkTreeNodeOutlet)
    ], McTreeSelection.prototype, "_nodeOutlet", void 0);
    __decorate([
        core.ContentChildren(core.forwardRef(function () { return McTreeNodeOption; })),
        __metadata("design:type", core.QueryList)
    ], McTreeSelection.prototype, "options", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTreeSelection.prototype, "disabled", null);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McTreeSelection.prototype, "navigationChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McTreeSelection.prototype, "selectionChange", void 0);
    McTreeSelection = McTreeSelection_1 = __decorate([
        core.Component({
            exportAs: 'mcTreeSelection',
            selector: 'mc-tree-selection',
            template: "<ng-container cdkTreeNodeOutlet></ng-container>",
            host: {
                '[tabIndex]': 'tabIndex',
                class: 'mc-tree-selection',
                role: 'tree-selection',
                '(keydown)': '_onKeyDown($event)',
                '(window:resize)': 'updateScrollSize()'
            },
            styles: [".mc-tree-selection{display:block;border:1px solid red}.mc-tree-node{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-node>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-node:focus{outline:0}.mc-tree-node:not([disabled]){cursor:pointer}.mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            providers: [{ provide: tree.CdkTree, useExisting: McTreeSelection_1 }]
        }),
        __param(3, core.Attribute('tabindex')),
        __param(4, core.Attribute('multiple')),
        __param(5, core.Attribute('auto-select')),
        __param(6, core.Attribute('no-unselect')),
        __metadata("design:paramtypes", [core.ElementRef,
            core.IterableDiffers,
            core.ChangeDetectorRef, String, String, String, String])
    ], McTreeSelection);
    return McTreeSelection;
}(_McTreeSelectionBase));

var MC_TREE_DIRECTIVES = [
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeSelection,
    McTreeNodeOption
];
var McTreeModule = /** @class */ (function () {
    function McTreeModule() {
    }
    McTreeModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, tree.CdkTreeModule],
            exports: MC_TREE_DIRECTIVES,
            declarations: MC_TREE_DIRECTIVES
        })
    ], McTreeModule);
    return McTreeModule;
}());

/**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type `T` to flattened nodes of type `F`.
 *
 * For example, the input data of type `T` is nested, and contains its children data:
 *   SomeNode: {
 *     key: 'Fruits',
 *     children: [
 *       NodeOne: {
 *         key: 'Apple',
 *       },
 *       NodeTwo: {
 *        key: 'Pear',
 *      }
 *    ]
 *  }
 *  After flattener flatten the tree, the structure will become
 *  SomeNode: {
 *    key: 'Fruits',
 *    expandable: true,
 *    level: 1
 *  },
 *  NodeOne: {
 *    key: 'Apple',
 *    expandable: false,
 *    level: 2
 *  },
 *  NodeTwo: {
 *   key: 'Pear',
 *   expandable: false,
 *   level: 2
 * }
 * and the output flattened type is `F` with additional information.
 */
var McTreeFlattener = /** @class */ (function () {
    function McTreeFlattener(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    McTreeFlattener.prototype._flattenNode = function (node, level, resultNodes, parentMap) {
        var _this = this;
        var flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            this.getChildren(node).pipe(operators.take(1)).subscribe(function (children) {
                children.forEach(function (child, index) {
                    var childParentMap = parentMap.slice();
                    childParentMap.push(index !== children.length - 1);
                    _this._flattenNode(child, level + 1, resultNodes, childParentMap);
                });
            });
        }
        return resultNodes;
    };
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    McTreeFlattener.prototype.flattenNodes = function (structuredData) {
        var _this = this;
        var resultNodes = [];
        structuredData.forEach(function (node) { return _this._flattenNode(node, 0, resultNodes, []); });
        return resultNodes;
    };
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    McTreeFlattener.prototype.expandFlattenedNodes = function (nodes, treeControl) {
        var _this = this;
        var results = [];
        var currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach(function (node) {
            var expand = true;
            for (var i = 0; i <= _this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (_this.isExpandable(node)) {
                currentExpand[_this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        });
        return results;
    };
    return McTreeFlattener;
}());
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 */
var McTreeFlatDataSource = /** @class */ (function (_super) {
    __extends(McTreeFlatDataSource, _super);
    function McTreeFlatDataSource(treeControl, treeFlattener, initialData) {
        if (initialData === void 0) { initialData = []; }
        var _this = _super.call(this) || this;
        _this.treeControl = treeControl;
        _this.treeFlattener = treeFlattener;
        _this._flattenedData = new rxjs.BehaviorSubject([]);
        _this._expandedData = new rxjs.BehaviorSubject([]);
        _this._data = new rxjs.BehaviorSubject(initialData);
        return _this;
    }
    Object.defineProperty(McTreeFlatDataSource.prototype, "data", {
        get: function () {
            return this._data.value;
        },
        set: function (value) {
            this._data.next(value);
            this._flattenedData.next(this.treeFlattener.flattenNodes(this.data));
            this.treeControl.dataNodes = this._flattenedData.value;
        },
        enumerable: true,
        configurable: true
    });
    McTreeFlatDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        var changes = [
            collectionViewer.viewChange,
            this.treeControl.expansionModel.onChange,
            this._flattenedData
        ];
        return rxjs.merge.apply(void 0, changes).pipe(operators.map(function () {
            _this._expandedData.next(_this.treeFlattener.expandFlattenedNodes(_this._flattenedData.value, _this.treeControl));
            return _this._expandedData.value;
        }));
    };
    McTreeFlatDataSource.prototype.disconnect = function () {
        // no op
    };
    return McTreeFlatDataSource;
}(collections.DataSource));

/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 */
var McTreeNestedDataSource = /** @class */ (function (_super) {
    __extends(McTreeNestedDataSource, _super);
    function McTreeNestedDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = new rxjs.BehaviorSubject([]);
        return _this;
    }
    Object.defineProperty(McTreeNestedDataSource.prototype, "data", {
        /**
         * Data for the nested tree
         */
        get: function () {
            return this._data.value;
        },
        set: function (value) {
            this._data.next(value);
        },
        enumerable: true,
        configurable: true
    });
    McTreeNestedDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        return rxjs.merge.apply(void 0, [collectionViewer.viewChange, this._data]).pipe(operators.map(function () { return _this.data; }));
    };
    McTreeNestedDataSource.prototype.disconnect = function () {
        // no op
    };
    return McTreeNestedDataSource;
}(collections.DataSource));

var VERSION = new core.Version('0.0.1');

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
exports.MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = MC_CHECKBOX_CONTROL_VALUE_ACCESSOR;
exports.McCheckboxChange = McCheckboxChange;
exports.McCheckboxBase = McCheckboxBase;
exports._McCheckboxMixinBase = _McCheckboxMixinBase;
exports.McCheckbox = McCheckbox;
exports.MC_CHECKBOX_CLICK_ACTION = MC_CHECKBOX_CLICK_ACTION;
exports.McCheckboxModule = McCheckboxModule;
exports.MC_CHECKBOX_REQUIRED_VALIDATOR = MC_CHECKBOX_REQUIRED_VALIDATOR;
exports.McCheckboxRequiredValidator = McCheckboxRequiredValidator;
exports.ɵa1 = MC_SANITY_CHECKS_FACTORY;
exports.isBoolean = isBoolean;
exports.toBoolean = toBoolean;
exports.McCommonModule = McCommonModule;
exports.MC_SANITY_CHECKS = MC_SANITY_CHECKS;
exports.mixinDisabled = mixinDisabled;
exports.mixinColor = mixinColor;
exports.mixinTabIndex = mixinTabIndex;
exports.mixinErrorState = mixinErrorState;
exports.McLine = McLine;
exports.McLineSetter = McLineSetter;
exports.McLineModule = McLineModule;
exports.ShowOnDirtyErrorStateMatcher = ShowOnDirtyErrorStateMatcher;
exports.ErrorStateMatcher = ErrorStateMatcher;
exports.McPseudoCheckboxModule = McPseudoCheckboxModule;
exports.McPseudoCheckbox = McPseudoCheckbox;
exports.McDivider = McDivider;
exports.McDividerModule = McDividerModule;
exports.McFormFieldModule = McFormFieldModule;
exports.McFormFieldBase = McFormFieldBase;
exports.McFormField = McFormField;
exports.McFormFieldWithoutBorders = McFormFieldWithoutBorders;
exports.McFormFieldControl = McFormFieldControl;
exports.getMcFormFieldMissingControlError = getMcFormFieldMissingControlError;
exports.McHint = McHint;
exports.McSuffix = McSuffix;
exports.McPrefix = McPrefix;
exports.McCleaner = McCleaner;
exports.McIconModule = McIconModule;
exports.McIconCSSStyler = McIconCSSStyler;
exports.McIconBase = McIconBase;
exports._McIconMixinBase = _McIconMixinBase;
exports.McIcon = McIcon;
exports.ɵa13 = MC_INPUT_VALUE_ACCESSOR;
exports.McInputModule = McInputModule;
exports.McInputBase = McInputBase;
exports._McInputMixinBase = _McInputMixinBase;
exports.McInput = McInput;
exports.McInputMono = McInputMono;
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
exports.McLinkModule = McLinkModule;
exports.McLink = McLink;
exports.McNavbarModule = McNavbarModule;
exports.McNavbarLogo = McNavbarLogo;
exports.McNavbarBrand = McNavbarBrand;
exports.McNavbarTitle = McNavbarTitle;
exports.McNavbarItemBase = McNavbarItemBase;
exports._McNavbarMixinBase = _McNavbarMixinBase;
exports.McNavbarItem = McNavbarItem;
exports.McNavbarContainer = McNavbarContainer;
exports.McNavbar = McNavbar;
exports.McProgressBarModule = McProgressBarModule;
exports.McProgressBarBase = McProgressBarBase;
exports._McProgressBarMixinBase = _McProgressBarMixinBase;
exports.McProgressBar = McProgressBar;
exports.McProgressSpinnerModule = McProgressSpinnerModule;
exports.McProgressSpinnerBase = McProgressSpinnerBase;
exports._McProgressPinnerMixinBase = _McProgressPinnerMixinBase;
exports.McProgressSpinner = McProgressSpinner;
exports.McRadioModule = McRadioModule;
exports.McRadioChange = McRadioChange;
exports.McRadioGroupBase = McRadioGroupBase;
exports._McRadioGroupMixinBase = _McRadioGroupMixinBase;
exports.MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = MC_RADIO_GROUP_CONTROL_VALUE_ACCESSOR;
exports.McRadioGroup = McRadioGroup;
exports.McRadioButtonBase = McRadioButtonBase;
exports._McRadioButtonMixinBase = _McRadioButtonMixinBase;
exports.McRadioButton = McRadioButton;
exports.McTreeModule = McTreeModule;
exports.McTreeNodeDef = McTreeNodeDef;
exports.McTreeNodePadding = McTreeNodePadding;
exports.McTreeNodeOption = McTreeNodeOption;
exports._McTreeSelectionBase = _McTreeSelectionBase;
exports.McTreeNavigationChange = McTreeNavigationChange;
exports.McTreeSelectionChange = McTreeSelectionChange;
exports.McTreeSelection = McTreeSelection;
exports.McTreeFlattener = McTreeFlattener;
exports.McTreeFlatDataSource = McTreeFlatDataSource;
exports.McTreeNestedDataSource = McTreeNestedDataSource;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic.umd.js.map

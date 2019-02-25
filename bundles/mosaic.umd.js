/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/bidi'), require('@ptsecurity/cdk/coercion'), require('rxjs'), require('@angular/common'), require('@ptsecurity/cdk/keycodes'), require('@angular/animations'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/platform'), require('@angular/forms'), require('rxjs/operators'), require('@ptsecurity/cdk/datetime'), require('@ptsecurity/cdk/portal'), require('@ptsecurity/cdk/overlay'), require('@ptsecurity/cdk/collections'), require('@ptsecurity/cdk/tree'), require('@ptsecurity/cdk/scrolling')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic', ['exports', '@angular/core', '@ptsecurity/cdk/bidi', '@ptsecurity/cdk/coercion', 'rxjs', '@angular/common', '@ptsecurity/cdk/keycodes', '@angular/animations', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/platform', '@angular/forms', 'rxjs/operators', '@ptsecurity/cdk/datetime', '@ptsecurity/cdk/portal', '@ptsecurity/cdk/overlay', '@ptsecurity/cdk/collections', '@ptsecurity/cdk/tree', '@ptsecurity/cdk/scrolling'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = {}),global.ng.core,global.ng.cdk.bidi,global.ng.cdk.coercion,global.rxjs,global.ng.common,global.ng.cdk.keycodes,global.ng.animations,global.ng.cdk.a11y,global.ng.cdk.platform,global.ng.forms,global.rxjs.operators,global.ng.cdk.datetime,global.ng.cdk.portal,global.ng.cdk.overlay,global.ng.cdk.collections,global.ng.cdk.tree,global.ng.cdk.scrolling));
}(this, (function (exports,core,bidi,coercion,rxjs,common,keycodes,animations,a11y,platform,forms,operators,datetime,portal,overlay,collections,tree,scrolling) { 'use strict';

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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
 * This module should be imported to each top-level component module (e.g., McTabsModule).
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
        // tslint:disable-next-line
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
                this._disabled = coercion.coerceBooleanProperty(value);
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
    ThemePalette["Error"] = "error";
    ThemePalette["Default"] = "second";
    ThemePalette["Empty"] = "";
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
             * `MatFormField` needs to run change detection.
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
        this.state = 'unchecked';
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
            styles: [".mc-pseudo-checkbox{position:relative;display:inline-block;box-sizing:border-box;width:16px;height:16px;border-radius:3px;border-width:1px;border-style:solid;cursor:pointer;vertical-align:middle;flex-shrink:0}.mc-pseudo-checkbox .mc-checkbox-checkmark,.mc-pseudo-checkbox .mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px}.mc-pseudo-checkbox.mc-pseudo-checkbox-checked,.mc-pseudo-checkbox.mc-pseudo-checkbox-indeterminate{border-color:transparent}.mc-pseudo-checkbox.mc-checked .mc-checkbox-checkmark{display:inline-block}.mc-pseudo-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:inline-block}.mc-pseudo-checkbox.mc-disabled{cursor:default}"],
            template: "<i class=\"mc-checkbox-checkmark mc mc-check_16\"></i> <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>",
            host: {
                class: 'mc-pseudo-checkbox',
                '[class.mc-indeterminate]': 'state === "indeterminate"',
                '[class.mc-checked]': 'state === "checked"',
                '[class.mc-disabled]': 'disabled'
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

var McMeasureScrollbarService = /** @class */ (function () {
    function McMeasureScrollbarService(document) {
        this.document = document;
        this.scrollbarMeasure = {
            position: 'absolute',
            top: '-9999px',
            width: '50px',
            height: '50px',
            overflow: 'scroll'
        };
        this.initScrollBarWidth();
    }
    Object.defineProperty(McMeasureScrollbarService.prototype, "scrollBarWidth", {
        get: function () {
            if (this._scrollbarWidth) {
                return this._scrollbarWidth;
            }
            this.initScrollBarWidth();
            return this._scrollbarWidth;
        },
        enumerable: true,
        configurable: true
    });
    McMeasureScrollbarService.prototype.initScrollBarWidth = function () {
        var scrollDiv = this.document.createElement('div');
        // tslint:disable-next-line
        for (var scrollProp in this.scrollbarMeasure) {
            if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
                scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
            }
        }
        this.document.body.appendChild(scrollDiv);
        var width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.document.body.removeChild(scrollDiv);
        this._scrollbarWidth = width;
    };
    McMeasureScrollbarService.ngInjectableDef = core.defineInjectable({ factory: function McMeasureScrollbarService_Factory() { return new McMeasureScrollbarService(core.inject(common.DOCUMENT)); }, token: McMeasureScrollbarService, providedIn: "root" });
    McMeasureScrollbarService = __decorate([
        core.Injectable({
            providedIn: 'root'
        }),
        __param(0, core.Inject(common.DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], McMeasureScrollbarService);
    return McMeasureScrollbarService;
}());

// Boilerplate for applying mixins to McOptgroup.
/** @docs-private */
var McOptgroupBase = /** @class */ (function () {
    function McOptgroupBase() {
    }
    return McOptgroupBase;
}());
var _McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
// Counter for unique group ids.
var _uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `mc-option`.
 */
var McOptgroup = /** @class */ (function (_super) {
    __extends(McOptgroup, _super);
    function McOptgroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Unique id for the underlying label. */
        _this._labelId = "mc-optgroup-label-" + _uniqueOptgroupIdCounter++;
        return _this;
    }
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McOptgroup.prototype, "label", void 0);
    McOptgroup = __decorate([
        core.Component({
            selector: 'mc-optgroup',
            exportAs: 'mcOptgroup',
            template: "<label class=\"mc-optgroup-label\" [id]=\"_labelId\">{{ label }}</label><ng-content select=\"mc-option, ng-container\"></ng-content>",
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            inputs: ['disabled'],
            styles: [".mc-optgroup-label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}"],
            host: {
                class: 'mc-optgroup',
                role: 'group',
                '[class.mc-optgroup-disabled]': 'disabled',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-labelledby]': '_labelId'
            }
        })
    ], McOptgroup);
    return McOptgroup;
}(_McOptgroupMixinBase));

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
/** Event object emitted by McOption when selected or deselected. */
var McOptionSelectionChange = /** @class */ (function () {
    function McOptionSelectionChange(
    /** Reference to the option that emitted the event. */
    source, 
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return McOptionSelectionChange;
}());
/**
 * Injection token used to provide the parent component to options.
 */
var MC_OPTION_PARENT_COMPONENT = new core.InjectionToken('MC_OPTION_PARENT_COMPONENT');
/**
 * Single option inside of a `<mat-select>` element.
 */
var McOption = /** @class */ (function () {
    function McOption(_element, _changeDetectorRef, _parent, group) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parent = _parent;
        this.group = group;
        /** Event emitted when the option is selected or deselected. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new core.EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this._stateChanges = new rxjs.Subject();
        this._selected = false;
        this._active = false;
        this._disabled = false;
        this._id = "mc-option-" + _uniqueIdCounter++;
        this._mostRecentViewValue = '';
    }
    Object.defineProperty(McOption.prototype, "multiple", {
        /** Whether the wrapping component is in multiple selection mode. */
        get: function () {
            return this._parent && this._parent.multiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "id", {
        /** The unique ID of the option. */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: function () {
            return (this.group && this.group.disabled) || this._disabled;
        },
        set: function (value) {
            this._disabled = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "disableRipple", {
        /** Whether ripples for the option are disabled. */
        get: function () {
            return this._parent && this._parent.disableRipple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: function () {
            // TODO(kara): Add input property alternative for node envs.
            return (this._getHostElement().textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    McOption.prototype.select = function () {
        if (!this._selected) {
            this._selected = true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent();
        }
    };
    /** Deselects the option. */
    McOption.prototype.deselect = function () {
        if (this._selected) {
            this._selected = false;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent();
        }
    };
    /** Sets focus onto this option. */
    McOption.prototype.focus = function () {
        var element = this._getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    McOption.prototype.setActiveStyles = function () {
        if (!this._active) {
            this._active = true;
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    McOption.prototype.setInactiveStyles = function () {
        if (this._active) {
            this._active = false;
            this._changeDetectorRef.markForCheck();
        }
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    McOption.prototype.getLabel = function () {
        return this.viewValue;
    };
    /** Ensures the option is selected when activated from the keyboard. */
    McOption.prototype._handleKeydown = function (event) {
        // tslint:disable-next-line
        if (event.keyCode === keycodes.ENTER || event.keyCode === keycodes.SPACE) {
            this._selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    };
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    McOption.prototype._selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    McOption.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /** Gets the host DOM element. */
    McOption.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    McOption.prototype.ngAfterViewChecked = function () {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `mat-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            var viewValue = this.viewValue;
            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this._stateChanges.next();
            }
        }
    };
    McOption.prototype.ngOnDestroy = function () {
        this._stateChanges.complete();
    };
    /** Emits the selection change event. */
    McOption.prototype._emitSelectionChangeEvent = function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new McOptionSelectionChange(this, isUserInput));
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McOption.prototype, "value", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McOption.prototype, "disabled", null);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McOption.prototype, "onSelectionChange", void 0);
    McOption = __decorate([
        core.Component({
            selector: 'mc-option',
            exportAs: 'mcOption',
            host: {
                '[attr.tabindex]': '_getTabIndex()',
                '[class.mc-selected]': 'selected',
                '[class.mc-option-multiple]': 'multiple',
                '[class.mc-active]': 'active',
                '[id]': 'id',
                '[class.mc-disabled]': 'disabled',
                '(click)': '_selectViaInteraction()',
                '(keydown)': '_handleKeydown($event)',
                class: 'mc-option'
            },
            styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;border:2px solid transparent;cursor:pointer;outline:0;padding:0 16px;-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"],
            template: "<mc-pseudo-checkbox *ngIf=\"multiple\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mc-pseudo-checkbox><span class=\"mc-option-text\"><ng-content></ng-content></span><div class=\"mc-option-overlay\"></div>",
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(2, core.Optional()), __param(2, core.Inject(MC_OPTION_PARENT_COMPONENT)),
        __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef, Object, McOptgroup])
    ], McOption);
    return McOption;
}());
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
function _countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        var optionsArray = options.toArray();
        var groups = optionGroups.toArray();
        var groupCounter = 0;
        for (var i = 0; i < optionIndex + 1; i++) {
            if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                groupCounter++;
            }
        }
        return groupCounter;
    }
    return 0;
}
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionIndex Index of the option to be scrolled into the view.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
function _getOptionScrollPosition(optionIndex, optionHeight, currentScrollPosition, panelHeight) {
    var optionOffset = optionIndex * optionHeight;
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}

var McOptionModule = /** @class */ (function () {
    function McOptionModule() {
    }
    McOptionModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, McPseudoCheckboxModule],
            exports: [McOption, McOptgroup],
            declarations: [McOption, McOptgroup]
        })
    ], McOptionModule);
    return McOptionModule;
}());

/** InjectionToken that can be used to specify the global label options. */
var MC_LABEL_GLOBAL_OPTIONS = new core.InjectionToken('mc-label-global-options');

var fadeAnimation = animations.trigger('fadeAnimation', [
    animations.state('void', animations.style({ opacity: 0 })),
    animations.state('true', animations.style({ opacity: 1 })),
    animations.state('false', animations.style({ opacity: 0 })),
    animations.transition('* => true', animations.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
    animations.transition('* => void', animations.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
]);


(function (AnimationCurves) {
    AnimationCurves["StandardCurve"] = "cubic-bezier(0.4,0.0,0.2,1)";
    AnimationCurves["DecelerationCurve"] = "cubic-bezier(0.0,0.0,0.2,1)";
    AnimationCurves["AccelerationCurve"] = "cubic-bezier(0.4,0.0,1,1)";
    AnimationCurves["SharpCurve"] = "cubic-bezier(0.4,0.0,0.6,1)";
})(exports.AnimationCurves || (exports.AnimationCurves = {}));

var POSITION_MAP = {
    top: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
    },
    topCenter: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetX: undefined,
        offsetY: undefined
    },
    topLeft: {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX: undefined,
        offsetY: undefined
    },
    topRight: {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetX: undefined,
        offsetY: undefined
    },
    right: {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center'
    },
    rightTop: {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: undefined,
        offsetY: undefined
    },
    rightBottom: {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX: undefined,
        offsetY: undefined
    },
    bottom: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
    },
    bottomCenter: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
    },
    bottomLeft: {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
    },
    bottomRight: {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
    },
    left: {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center'
    },
    leftTop: {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top'
    },
    leftBottom: {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom'
    }
};
var DEFAULT_4_POSITIONS = _objectValues([
    POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left
]);
function arrayMap(array, iteratee) {
    var index = -1;
    var length = array == null ? 0 : array.length;
    var result = Array(length);
    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
function baseValues(object, props) {
    return arrayMap(props, function (key) {
        return object[key];
    });
}
function _objectValues(object) {
    return object == null ? [] : baseValues(object, Object.keys(object));
}

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
var _McIconMixinBase = mixinColor(McIconBase, exports.ThemePalette.Empty);
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
            styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['color']
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
            var COMMENT_NODE = 8;
            if (!iconElement.previousElementSibling && !iconElement.nextElementSibling) {
                if (iconElement.nextSibling && iconElement.nextSibling.nodeType !== COMMENT_NODE) {
                    iconElement.classList.add('mc-icon_left');
                    this.nativeElement.classList.add('mc-icon-button_left');
                }
                if (iconElement.previousSibling && iconElement.previousSibling.nodeType !== COMMENT_NODE) {
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
    function McButton(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
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
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:15px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group_vertical{display:flex;flex-direction:column}.mc-button-group_vertical>.mc-button:first-child:not(:last-child),.mc-button-group_vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group_vertical>.mc-button:last-child:not(:first-child),.mc-button-group_vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group_vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group_vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group_vertical .mc-button+.mc-button,.mc-button-group_vertical .mc-button+.mc-icon-button,.mc-button-group_vertical .mc-icon-button+.mc-button,.mc-button-group_vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[disabled]': 'disabled || null'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef, a11y.FocusMonitor])
    ], McButton);
    return McButton;
}(_McButtonMixinBase));
var McAnchor = /** @class */ (function (_super) {
    __extends(McAnchor, _super);
    function McAnchor(focusMonitor, elementRef) {
        return _super.call(this, elementRef, focusMonitor) || this;
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
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:15px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group_vertical{display:flex;flex-direction:column}.mc-button-group_vertical>.mc-button:first-child:not(:last-child),.mc-button-group_vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group_vertical>.mc-button:last-child:not(:first-child),.mc-button-group_vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group_vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group_vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group_vertical .mc-button+.mc-button,.mc-button-group_vertical .mc-button+.mc-icon-button,.mc-button-group_vertical .mc-icon-button+.mc-button,.mc-button-group_vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[attr.tabindex]': 'disabled ? -1 : 0',
                '[attr.disabled]': 'disabled || null',
                '(click)': '_haltDisabledEvents($event)'
            }
        }),
        __metadata("design:paramtypes", [a11y.FocusMonitor, core.ElementRef])
    ], McAnchor);
    return McAnchor;
}(McButton));
var McIconButton = /** @class */ (function (_super) {
    __extends(McIconButton, _super);
    function McIconButton(focusMonitor, elementRef) {
        return _super.call(this, elementRef, focusMonitor) || this;
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
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:15px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group_vertical{display:flex;flex-direction:column}.mc-button-group_vertical>.mc-button:first-child:not(:last-child),.mc-button-group_vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group_vertical>.mc-button:last-child:not(:first-child),.mc-button-group_vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group_vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group_vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group_vertical .mc-button+.mc-button,.mc-button-group_vertical .mc-button+.mc-icon-button,.mc-button-group_vertical .mc-icon-button+.mc-button,.mc-button-group_vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[attr.tabindex]': 'disabled ? -1 : 0',
                '[attr.disabled]': 'disabled || null'
            }
        }),
        __metadata("design:paramtypes", [a11y.FocusMonitor, core.ElementRef])
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
                McIconButtonCSSStyler
            ],
            declarations: [
                McButton,
                McAnchor,
                McIconButton,
                McButtonCSSStyler,
                McIconButtonCSSStyler
            ]
        })
    ], McButtonModule);
    return McButtonModule;
}());

var McCard = /** @class */ (function () {
    function McCard(_elementRef, _focusMonitor) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.readonly = false;
        this.selected = false;
        this.selectedChange = new core.EventEmitter();
        this._tabIndex = 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, false);
    }
    Object.defineProperty(McCard.prototype, "tabIndex", {
        get: function () {
            return this.readonly ? null : this._tabIndex;
        },
        set: function (value) {
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    McCard.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    McCard.prototype.focus = function () {
        this.hostElement.focus();
    };
    McCard.prototype.onClick = function ($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    };
    Object.defineProperty(McCard.prototype, "hostElement", {
        get: function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    McCard.prototype.onKeyDown = function ($event) {
        switch ($event.keyCode) {
            case keycodes.SPACE:
                if (!this.readonly) {
                    $event.preventDefault();
                    this.selectedChange.emit(!this.selected);
                }
                break;
            default:
        }
    };
    __decorate([
        core.HostBinding('attr.tabIndex'),
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCard.prototype, "tabIndex", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCard.prototype, "readonly", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCard.prototype, "selected", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McCard.prototype, "selectedChange", void 0);
    McCard = __decorate([
        core.Component({
            selector: 'mc-card',
            template: "<ng-content></ng-content><div class=\"mc-card__overlay\"></div>",
            styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left-width:4px;border-left-style:solid;border-left-color:transparent}.mc-card:focus{outline:0}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:0 0}.mc-card.mc-card_readonly{cursor:auto}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['color'],
            host: {
                class: 'mc-card',
                '[class.mc-card_readonly]': 'readonly',
                '[class.mc-card_selected]': 'selected',
                '(keydown)': 'onKeyDown($event)',
                '(click)': 'onClick($event)'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef, a11y.FocusMonitor])
    ], McCard);
    return McCard;
}());

var McCardModule = /** @class */ (function () {
    function McCardModule() {
    }
    McCardModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule,
                platform.PlatformModule
            ],
            exports: [McCard],
            declarations: [McCard]
        })
    ], McCardModule);
    return McCardModule;
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
            template: "<label [attr.for]=\"inputId\" class=\"mc-checkbox-layout\" #label><div class=\"mc-checkbox-inner-container\" [class.mc-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\"><input #input type=\"checkbox\" class=\"mc-checkbox-input cdk-visually-hidden\" [id]=\"inputId\" [required]=\"required\" [checked]=\"checked\" [attr.value]=\"value\" [disabled]=\"disabled\" [attr.name]=\"name\" [tabIndex]=\"tabIndex\" [indeterminate]=\"indeterminate\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-checked]=\"_getAriaChecked()\" (change)=\"_onInteractionEvent($event)\" (click)=\"_onInputClick($event)\"><div class=\"mc-checkbox-frame\"><i class=\"mc-checkbox-checkmark mc mc-check_16\"></i> <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i></div></div><span class=\"mc-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"_onLabelTextChange()\"><ng-content></ng-content></span></label>",
            styles: [".mc-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:3px;box-sizing:border-box;pointer-events:none}.mc-checkbox{cursor:pointer;-webkit-tap-highlight-color:transparent}.mc-checkbox.mc-checked .mc-checkbox-checkmark{display:block}.mc-checkbox.mc-checked .mc-checkbox-mixedmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-checkmark{display:none}.mc-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:block}.mc-checkbox.mc-disabled{cursor:default}.mc-checkbox.mc-disabled .mc-checkbox-frame{box-shadow:none}.mc-checkbox-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mc-checkbox-inner-container{margin-left:8px;margin-right:auto}.mc-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mc-checkbox-frame{background-color:transparent;border-width:1px;border-style:solid;box-shadow:inset 0 0 1px 0 rgba(0,0,0,.2)}.mc-checkbox-checkmark,.mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px;right:0;bottom:0}.mc-checkbox-label-before .mc-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mc-checkbox-label-before .mc-checkbox-inner-container{margin-left:auto;margin-right:8px}"],
            exportAs: 'mcCheckbox',
            host: {
                class: 'mc-checkbox',
                '[id]': 'id',
                '[attr.id]': 'id',
                '[class.mc-indeterminate]': 'indeterminate',
                '[class.mc-checked]': 'checked',
                '[class.mc-disabled]': 'disabled',
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
            imports: [common.CommonModule],
            exports: [McCheckbox, McCheckboxRequiredValidator],
            declarations: [McCheckbox, McCheckboxRequiredValidator]
        })
    ], McCheckboxModule);
    return McCheckboxModule;
}());

var McCleaner = /** @class */ (function () {
    function McCleaner() {
    }
    McCleaner = __decorate([
        core.Component({
            selector: 'mc-cleaner',
            template: '<i class="mc-icon_light" mc-icon="mc-close-M_16" color="second"></i>'
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

/** An interface which allows a control to work inside of a `MсFormField`. */
var McFormFieldNumberControl = /** @class */ (function () {
    function McFormFieldNumberControl() {
    }
    return McFormFieldNumberControl;
}());

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

var McStepper = /** @class */ (function () {
    function McStepper() {
        this.stepUp = new core.EventEmitter();
        this.stepDown = new core.EventEmitter();
    }
    McStepper.prototype.onStepUp = function ($event) {
        this.stepUp.emit();
        $event.preventDefault();
    };
    McStepper.prototype.onStepDown = function ($event) {
        this.stepDown.emit();
        $event.preventDefault();
    };
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McStepper.prototype, "stepUp", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McStepper.prototype, "stepDown", void 0);
    McStepper = __decorate([
        core.Component({
            selector: 'mc-stepper',
            template: "\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-up mc-angle-down-L_16\"\n           (mousedown)=\"onStepUp($event)\">\n        </i>\n        <i class=\"mc mc-icon mc-icon_light mc-second mc-stepper-step-down mc-angle-down-L_16\"\n           (mousedown)=\"onStepDown($event)\">\n        </i>\n    "
        })
    ], McStepper);
    return McStepper;
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

var nextUniqueId$1$1 = 0;
var McFormFieldBase = /** @class */ (function () {
    function McFormFieldBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McFormFieldBase;
}());
var _McFormFieldMixinBase = mixinColor(McFormFieldBase);
var McFormField = /** @class */ (function (_super) {
    __extends(McFormField, _super);
    function McFormField(_elementRef, _changeDetectorRef) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        // Unique id for the internal form field label.
        _this._labelId = "mc-form-field-label-" + nextUniqueId$1$1++;
        _this.hovered = false;
        return _this;
    }
    McFormField.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._validateControlChild();
        if (this._control.controlType) {
            this._elementRef.nativeElement.classList
                .add("mc-form-field-type-" + this._control.controlType);
            if (this._numberControl && this.hasStepper) {
                this._stepper.stepUp.subscribe(this.onStepUp.bind(this));
                this._stepper.stepDown.subscribe(this.onStepDown.bind(this));
            }
        }
        // Subscribe to changes in the child control state in order to update the form field UI.
        this._control.stateChanges.pipe(operators.startWith())
            .subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
        if (this._numberControl) {
            this._numberControl.stateChanges.pipe(operators.startWith())
                .subscribe(function () {
                _this._changeDetectorRef.markForCheck();
            });
        }
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
        if (this._control.onContainerClick) {
            this._control.onContainerClick($event);
        }
    };
    McFormField.prototype.onKeyDown = function (event) {
        // tslint:disable-next-line:deprecation
        if (event.keyCode === keycodes.ESCAPE && this._control.focused && this.hasCleaner) {
            if (this._control && this._control.ngControl) {
                this._control.ngControl.reset();
            }
            event.preventDefault();
        }
    };
    McFormField.prototype.onHoverChanged = function (isHovered) {
        if (isHovered !== this.hovered) {
            this.hovered = isHovered;
            this._changeDetectorRef.markForCheck();
        }
    };
    McFormField.prototype.onStepUp = function () {
        if (this._numberControl) {
            this._numberControl.stepUp(this._numberControl.step);
        }
    };
    McFormField.prototype.onStepDown = function () {
        if (this._numberControl) {
            this._numberControl.stepDown(this._numberControl.step);
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
    Object.defineProperty(McFormField.prototype, "hasStepper", {
        get: function () {
            return !!this._stepper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "canShowCleaner", {
        get: function () {
            return this.hasCleaner &&
                this._control &&
                this._control.ngControl
                ? this._control.ngControl.value && !this._control.disabled
                : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "disabled", {
        get: function () {
            return this._control && this._control.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McFormField.prototype, "canShowStepper", {
        get: function () {
            return this._numberControl &&
                !this.disabled &&
                (this._numberControl.focused ||
                    this.hovered);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core.ContentChild(McFormFieldControl),
        __metadata("design:type", McFormFieldControl)
    ], McFormField.prototype, "_control", void 0);
    __decorate([
        core.ContentChild(McFormFieldNumberControl),
        __metadata("design:type", McFormFieldNumberControl)
    ], McFormField.prototype, "_numberControl", void 0);
    __decorate([
        core.ContentChild(McStepper),
        __metadata("design:type", McStepper)
    ], McFormField.prototype, "_stepper", void 0);
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
            template: "<div class=\"mc-form-field__container\" (click)=\"onContainerClick($event)\"><div class=\"mc-form-field__prefix\" *ngIf=\"hasPrefix\"><ng-content select=\"[mcPrefix]\"></ng-content></div><div class=\"mc-form-field__infix\"><ng-content></ng-content></div><div class=\"mc-form-field__suffix\" *ngIf=\"hasSuffix\"><ng-content select=\"[mcSuffix]\"></ng-content></div><div class=\"mc-form-field__cleaner\" *ngIf=\"canShowCleaner && !hasSuffix\" (click)=\"clearValue($event)\"><ng-content select=\"mc-cleaner\"></ng-content></div><ng-content *ngIf=\"canShowStepper\" select=\"mc-stepper\"></ng-content></div><div class=\"mc-form-field__hint\" *ngIf=\"hasHint\"><ng-content select=\"mc-hint\"></ng-content></div>",
            // McInput is a directive and can't have styles, so we need to include its styles here.
            // The McInput styles are fairly minimal so it shouldn't be a big deal for people who
            // aren't using McInput.
            styles: [".mc-form-field{position:relative;display:inline-block;width:100%}.mc-form-field__hint{margin-top:4px}.mc-form-field__container{position:relative;border-width:1px;border-style:solid;border-color:initial;border-radius:3px}.mc-form-field_without-borders .mc-form-field__container{border-color:transparent}.mc-form-field__prefix,.mc-form-field__suffix{position:absolute;top:0;bottom:0;width:32px;display:flex;flex-direction:row;justify-content:center;align-items:center}.mc-form-field__prefix{left:0}.mc-form-field__suffix{right:0}.mc-form-field_has-cleaner .mc-input,.mc-form-field_has-stepper .mc-input,.mc-form-field_has-suffix .mc-input{padding-right:32px}.mc-form-field_has-prefix .mc-input{padding-left:32px}mc-cleaner{position:absolute;display:flex;flex-direction:row;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px;cursor:pointer}mc-stepper{position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;top:0;bottom:0;right:0;width:32px}mc-stepper .mc-stepper-step-down,mc-stepper .mc-stepper-step-up{cursor:pointer;width:32px;text-align:center}mc-stepper .mc-stepper-step-up{transform:scaleY(-1)} .mc-input{background:0 0;padding:0;margin:0;border:none;outline:0;box-sizing:border-box;padding:5px 16px;width:100%;min-height:30px}.mc-input::-ms-clear{display:none;width:0;height:0}.mc-input::-ms-reveal{display:none;width:0;height:0}.mc-input::-webkit-search-cancel-button,.mc-input::-webkit-search-decoration,.mc-input::-webkit-search-results-button,.mc-input::-webkit-search-results-decoration{display:none}.mc-input{display:inline-block}input.mc-input[type=number]{-moz-appearance:textfield}input.mc-input[type=number]::-webkit-inner-spin-button,input.mc-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input.mc-input:invalid{box-shadow:unset} .mc-textarea{background:0 0;margin:0;border:none;outline:0;resize:none;overflow:auto;width:100%;box-sizing:border-box;padding:5px 16px}.mc-textarea{display:inline-block;-webkit-appearance:none;vertical-align:bottom}.mc-textarea:not(.mc-textarea-resizable){box-sizing:border-box;overflow-y:hidden}.mc-textarea.mc-textarea-resizable{resize:vertical;min-height:50px}.mc-textarea:invalid{box-shadow:unset}"],
            host: {
                class: 'mc-form-field',
                '[class.mc-form-field_invalid]': '_control.errorState',
                '[class.mc-disabled]': '_control.disabled',
                '[class.mc-form-field_has-prefix]': 'hasPrefix',
                '[class.mc-form-field_has-suffix]': 'hasSuffix',
                '[class.mc-form-field_has-cleaner]': 'canShowCleaner',
                '[class.mc-form-field_has-stepper]': 'canShowStepper',
                '[class.mc-focused]': '_control.focused',
                '[class.ng-untouched]': '_shouldForward("untouched")',
                '[class.ng-touched]': '_shouldForward("touched")',
                '[class.ng-pristine]': '_shouldForward("pristine")',
                '[class.ng-dirty]': '_shouldForward("dirty")',
                '[class.ng-valid]': '_shouldForward("valid")',
                '[class.ng-invalid]': '_shouldForward("invalid")',
                '[class.ng-pending]': '_shouldForward("pending")',
                '(keydown)': 'onKeyDown($event)',
                '(mouseenter)': 'onHoverChanged(true)',
                '(mouseleave)': 'onHoverChanged(false)'
            },
            inputs: ['color'],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.ElementRef, core.ChangeDetectorRef])
    ], McFormField);
    return McFormField;
}(_McFormFieldMixinBase));
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
                McCleaner,
                McStepper
            ],
            imports: [common.CommonModule, McIconModule],
            exports: [
                McFormField,
                McFormFieldWithoutBorders,
                McHint,
                McPrefix,
                McSuffix,
                McCleaner,
                McStepper
            ]
        })
    ], McFormFieldModule);
    return McFormFieldModule;
}());

function getMcInputUnsupportedTypeError(inputType) {
    return Error("Input type \"" + inputType + "\" isn't supported by mcInput.");
}

var MC_INPUT_VALUE_ACCESSOR = new core.InjectionToken('MC_INPUT_VALUE_ACCESSOR');

function sanitizeNumber(value) {
    return !isFinite(value) || isNaN(value)
        ? null
        : value;
}
function getPrecision(value) {
    var arr = value.toString().split('.');
    return arr.length === 1
        ? 1
        // tslint:disable-next-line:no-magic-numbers
        : Math.pow(10, arr[1].length);
}
function add(value1, value2) {
    var precision = Math.max(getPrecision(value1), getPrecision(value2));
    var res = (value1 * precision + value2 * precision) / precision;
    return sanitizeNumber(res);
}
var stepUp = function (value, max, min, step) {
    var res;
    if (value === null) {
        res = add(min, step);
        return res === null ? null : Math.min(res, max);
    }
    res = add(value, step);
    return res === null ? null : Math.max(Math.min(res, max), min);
};
var stepDown = function (value, max, min, step) {
    var res;
    if (value === null) {
        res = add(max, -step);
        return res === null ? null : Math.max(res, min);
    }
    res = add(value, -step);
    return res === null ? null : Math.min(Math.max(res, min), max);
};

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
var BIG_STEP = 10;
var SMALL_STEP = 1;
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
var McNumberInput = /** @class */ (function () {
    function McNumberInput(_platform, _elementRef, _model, step, bigStep, min, max) {
        this._platform = _platform;
        this._elementRef = _elementRef;
        this._model = _model;
        /**
         * Implemented as part of McFormFieldNumberControl.
         * @docs-private
         */
        this.focused = false;
        /**
         * Implemented as part of McFormFieldNumberControl.
         * @docs-private
         */
        this.stateChanges = new rxjs.Subject();
        this.step = this.isDigit(step) ? parseFloat(step) : SMALL_STEP;
        this.bigStep = this.isDigit(bigStep) ? parseFloat(bigStep) : BIG_STEP;
        this.min = this.isDigit(min) ? parseFloat(min) : -Infinity;
        this.max = this.isDigit(max) ? parseFloat(max) : Infinity;
        this._host = this._elementRef.nativeElement;
        var self = this;
        if ('valueAsNumber' in this._host) {
            Object.defineProperty(Object.getPrototypeOf(this._host), 'valueAsNumber', {
                // tslint:disable-next-line:no-reserved-keywords
                get: function () {
                    var res = parseFloat(self.normalizeSplitter(this.value));
                    return isNaN(res) ? null : res;
                }
            });
        }
    }
    McNumberInput_1 = McNumberInput;
    McNumberInput.prototype._focusChanged = function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    McNumberInput.prototype.onKeyDown = function (event) {
        var _this = this;
        // tslint:disable-next-line:deprecation
        var keyCode = event.keyCode;
        var isCtrlA = function (e) { return e.keyCode === keycodes.A && (e.ctrlKey || e.metaKey); };
        var isCtrlC = function (e) { return e.keyCode === keycodes.C && (e.ctrlKey || e.metaKey); };
        var isCtrlV = function (e) { return e.keyCode === keycodes.V && (e.ctrlKey || e.metaKey); };
        var isCtrlX = function (e) { return e.keyCode === keycodes.X && (e.ctrlKey || e.metaKey); };
        var isFKey = function (e) { return e.keyCode >= keycodes.F1 && e.keyCode <= keycodes.F12; };
        var isNumber = function (e) { return (e.keyCode >= keycodes.ZERO && e.keyCode <= keycodes.NINE) ||
            (e.keyCode >= keycodes.NUMPAD_ZERO && e.keyCode <= keycodes.NUMPAD_NINE); };
        var minuses = [keycodes.NUMPAD_MINUS, keycodes.DASH, keycodes.FF_MINUS];
        var serviceKeys = [keycodes.DELETE, keycodes.BACKSPACE, keycodes.TAB, keycodes.ESCAPE, keycodes.ENTER];
        var arrows = [keycodes.LEFT_ARROW, keycodes.RIGHT_ARROW];
        var allowedKeys = [keycodes.HOME, keycodes.END].concat(arrows).concat(serviceKeys).concat(minuses);
        var isIEPeriod = function (e) { return e.key === '.' || e.key === 'Decimal'; };
        var isNotIEPeriod = function (e) { return e.key === '.' || e.key === ','; };
        // Decimal is for IE
        var isPeriod = function (e) { return _this._platform.EDGE || _this._platform.TRIDENT
            ? isIEPeriod(e)
            : isNotIEPeriod(e); };
        if (allowedKeys.indexOf(keyCode) !== -1 ||
            isCtrlA(event) ||
            isCtrlC(event) ||
            isCtrlV(event) ||
            isCtrlX(event) ||
            isFKey(event) ||
            isPeriod(event)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is not a number and stop the keypress
        if (event.shiftKey || !isNumber(event)) {
            event.preventDefault();
            // process steps
            var step = event.shiftKey ? this.bigStep : this.step;
            if (keyCode === keycodes.UP_ARROW) {
                this.stepUp(step);
            }
            if (keyCode === keycodes.DOWN_ARROW) {
                this.stepDown(step);
            }
        }
    };
    McNumberInput.prototype.onPaste = function (event) {
        var value = event.clipboardData.getData('text');
        value = this.normalizeSplitter(value);
        if (!this.isDigit(value)) {
            event.preventDefault();
        }
    };
    McNumberInput.prototype.stepUp = function (step) {
        this._elementRef.nativeElement.focus();
        var res = stepUp(this._host.valueAsNumber, this.max, this.min, step);
        this._host.value = res === null ? '' : res.toString();
        this._model.update.emit(this._host.valueAsNumber);
    };
    McNumberInput.prototype.stepDown = function (step) {
        this._elementRef.nativeElement.focus();
        var res = stepDown(this._host.valueAsNumber, this.max, this.min, step);
        this._host.value = res === null ? '' : res.toString();
        this._model.update.emit(this._host.valueAsNumber);
    };
    McNumberInput.prototype.normalizeSplitter = function (value) {
        return value ? value.replace(/,/g, '.') : value;
    };
    McNumberInput.prototype.isDigit = function (value) {
        return this.isFloat(value) || this.isInt(value);
    };
    McNumberInput.prototype.isFloat = function (value) {
        return /^-?\d+\.\d+$/.test(value);
    };
    McNumberInput.prototype.isInt = function (value) {
        return /^-?\d+$/.test(value);
    };
    var McNumberInput_1;
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McNumberInput.prototype, "bigStep", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McNumberInput.prototype, "step", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McNumberInput.prototype, "min", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McNumberInput.prototype, "max", void 0);
    McNumberInput = McNumberInput_1 = __decorate([
        core.Directive({
            selector: "input[mcInput][type=\"number\"]",
            exportAs: 'mcNumericalInput',
            providers: [forms.NgModel, { provide: McFormFieldNumberControl, useExisting: McNumberInput_1 }],
            host: {
                '(blur)': '_focusChanged(false)',
                '(focus)': '_focusChanged(true)',
                '(paste)': 'onPaste($event)',
                '(keydown)': 'onKeyDown($event)'
            }
        }),
        __param(3, core.Attribute('step')),
        __param(4, core.Attribute('big-step')),
        __param(5, core.Attribute('min')),
        __param(6, core.Attribute('max')),
        __metadata("design:paramtypes", [platform.Platform,
            core.ElementRef,
            forms.NgModel, String, String, String, String])
    ], McNumberInput);
    return McNumberInput;
}());
var McInput = /** @class */ (function (_super) {
    __extends(McInput, _super);
    function McInput(_elementRef, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
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
                class: 'mc-input',
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
        __param(1, core.Optional()), __param(1, core.Self()),
        __param(2, core.Optional()),
        __param(3, core.Optional()),
        __param(5, core.Optional()), __param(5, core.Self()), __param(5, core.Inject(MC_INPUT_VALUE_ACCESSOR)),
        __metadata("design:paramtypes", [core.ElementRef,
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

var MIN_VALIDATOR = {
    provide: forms.NG_VALIDATORS,
    useExisting: core.forwardRef(function () { return MinValidator; }),
    multi: true
};
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
var MinValidator = /** @class */ (function () {
    function MinValidator() {
    }
    MinValidator.prototype.ngOnChanges = function (changes) {
        if ('min' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    };
    MinValidator.prototype.validate = function (c) { return this._validator(c); };
    MinValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
    MinValidator.prototype._createValidator = function () { this._validator = forms.Validators.min(parseInt(this.min, 10)); };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], MinValidator.prototype, "min", void 0);
    MinValidator = __decorate([
        core.Directive({
            selector: '[min][formControlName],[min][formControl],[min][ngModel]',
            providers: [MIN_VALIDATOR],
            host: { '[attr.min]': 'min ? min : null' }
        })
    ], MinValidator);
    return MinValidator;
}());
var MAX_VALIDATOR = {
    provide: forms.NG_VALIDATORS,
    useExisting: core.forwardRef(function () { return MaxValidator; }),
    multi: true
};
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
var MaxValidator = /** @class */ (function () {
    function MaxValidator() {
    }
    MaxValidator.prototype.ngOnChanges = function (changes) {
        if ('max' in changes) {
            this._createValidator();
            if (this._onChange) {
                this._onChange();
            }
        }
    };
    MaxValidator.prototype.validate = function (c) { return this._validator(c); };
    MaxValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
    MaxValidator.prototype._createValidator = function () { this._validator = forms.Validators.max(parseInt(this.max, 10)); };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], MaxValidator.prototype, "max", void 0);
    MaxValidator = __decorate([
        core.Directive({
            selector: '[max][formControlName],[max][formControl],[max][ngModel]',
            providers: [MAX_VALIDATOR],
            host: {
                '[attr.max]': 'max ? max : null'
            }
        })
    ], MaxValidator);
    return MaxValidator;
}());

var McInputModule = /** @class */ (function () {
    function McInputModule() {
    }
    McInputModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, a11y.A11yModule, McCommonModule, forms.FormsModule],
            exports: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator],
            declarations: [McInput, McNumberInput, McInputMono, MinValidator, MaxValidator]
        })
    ], McInputModule);
    return McInputModule;
}());

/** @docs-private */
function createMissingDateImplError(provider) {
    return Error("McDatepicker: No provider found for " + provider + ". You must import one of the existing " +
        "modules at your application root or provide a custom implementation or use exists ones.");
}

/** Datepicker data that requires internationalization. */
var McDatepickerIntl = /** @class */ (function () {
    function McDatepickerIntl() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new rxjs.Subject();
        /** A label for the calendar popup (used by screen readers). */
        this.calendarLabel = 'Calendar';
        /** A label for the button used to open the calendar popup (used by screen readers). */
        this.openCalendarLabel = 'Open calendar';
        /** A label for the previous month button (used by screen readers). */
        this.prevMonthLabel = 'Previous month';
        /** A label for the next month button (used by screen readers). */
        this.nextMonthLabel = 'Next month';
        /** A label for the previous year button (used by screen readers). */
        this.prevYearLabel = 'Previous year';
        /** A label for the next year button (used by screen readers). */
        this.nextYearLabel = 'Next year';
        /** A label for the previous multi-year button (used by screen readers). */
        this.prevMultiYearLabel = 'Previous 20 years';
        /** A label for the next multi-year button (used by screen readers). */
        this.nextMultiYearLabel = 'Next 20 years';
        /** A label for the 'switch to month view' button (used by screen readers). */
        this.switchToMonthViewLabel = 'Choose date';
        /** A label for the 'switch to year view' button (used by screen readers). */
        this.switchToMultiYearViewLabel = 'Choose month and year';
    }
    McDatepickerIntl.ngInjectableDef = core.defineInjectable({ factory: function McDatepickerIntl_Factory() { return new McDatepickerIntl(); }, token: McDatepickerIntl, providedIn: "root" });
    McDatepickerIntl = __decorate([
        core.Injectable({ providedIn: 'root' })
    ], McDatepickerIntl);
    return McDatepickerIntl;
}());

/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
var McCalendarCell = /** @class */ (function () {
    function McCalendarCell(value, displayValue, ariaLabel, enabled, cssClasses) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.cssClasses = cssClasses;
    }
    return McCalendarCell;
}());
/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */
var McCalendarBody = /** @class */ (function () {
    function McCalendarBody(elementRef, ngZone) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        /** The number of columns in the table. */
        this.numCols = 7;
        /** The cell number of the active cell in the table. */
        this.activeCell = 0;
        /**
         * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
         * maintained even as the table resizes.
         */
        this.cellAspectRatio = 1;
        /** Emits when a new value is selected. */
        this.selectedValueChange = new core.EventEmitter();
    }
    McCalendarBody.prototype.cellClicked = function (cell) {
        if (cell.enabled) {
            this.selectedValueChange.emit(cell.value);
        }
    };
    McCalendarBody.prototype.ngOnChanges = function (changes) {
        var columnChanges = changes.numCols;
        // tslint:disable-next-line:no-this-assignment
        var _a = this, rows = _a.rows, numCols = _a.numCols;
        if (changes.rows || columnChanges) {
            this.firstRowOffset = rows && rows.length && rows[0].length ? numCols - rows[0].length : 0;
        }
        if (changes.cellAspectRatio || columnChanges || !this.cellPadding) {
            this.cellPadding = this.cellAspectRatio * 50 / numCols + "%";
        }
        if (columnChanges || !this.cellWidth) {
            this.cellWidth = 100 / numCols + "%";
        }
    };
    McCalendarBody.prototype.isActiveCell = function (rowIndex, colIndex) {
        var cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this.firstRowOffset;
        }
        return cellNumber === this.activeCell;
    };
    /** Focuses the active cell after the microtask queue is empty. */
    McCalendarBody.prototype.focusActiveCell = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe(function () {
                var activeCell = _this.elementRef.nativeElement.querySelector('.mc-calendar__body_active');
                if (activeCell) {
                    activeCell.focus();
                }
            });
        });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McCalendarBody.prototype, "label", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Array)
    ], McCalendarBody.prototype, "rows", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McCalendarBody.prototype, "todayValue", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McCalendarBody.prototype, "selectedValue", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McCalendarBody.prototype, "labelMinRequiredCells", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCalendarBody.prototype, "numCols", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCalendarBody.prototype, "activeCell", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCalendarBody.prototype, "cellAspectRatio", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McCalendarBody.prototype, "selectedValueChange", void 0);
    McCalendarBody = __decorate([
        core.Component({
            selector: '[mc-calendar-body]',
            template: "<tr *ngIf=\"firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\"><td class=\"mc-calendar__body-label\" [attr.colspan]=\"numCols\" [style.paddingTop]=\"cellPadding\" [style.paddingBottom]=\"cellPadding\">{{label}}</td></tr><tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\"><td *ngIf=\"rowIndex === 0 && firstRowOffset\" aria-hidden=\"true\" class=\"mc-calendar__body-label\" [attr.colspan]=\"firstRowOffset\" [style.paddingTop]=\"cellPadding\" [style.paddingBottom]=\"cellPadding\">{{firstRowOffset >= labelMinRequiredCells ? label : ''}}</td><td *ngFor=\"let item of row; let colIndex = index\" role=\"gridcell\" class=\"mc-calendar__body-cell\" [ngClass]=\"item.cssClasses\" [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\" [class.mc-calendar__body_disabled]=\"!item.enabled\" [class.mc-calendar__body_active]=\"isActiveCell(rowIndex, colIndex)\" [attr.aria-label]=\"item.ariaLabel\" [attr.aria-disabled]=\"!item.enabled || null\" [attr.aria-selected]=\"selectedValue === item.value\" (click)=\"cellClicked(item)\" [style.width]=\"cellWidth\" [style.paddingTop]=\"cellPadding\" [style.paddingBottom]=\"cellPadding\"><div class=\"mc-calendar__body-cell-content\" [class.mc-calendar__body_selected]=\"selectedValue === item.value\" [class.mc-calendar__body-today]=\"todayValue === item.value\">{{item.displayValue}}</div></td></tr>",
            styles: [".mc-calendar__body{min-width:224px}.mc-calendar__body-label{height:0;line-height:0;text-align:left;padding-left:4.71429%;padding-right:4.71429%}.mc-calendar__body-cell{position:relative;height:0;line-height:0;text-align:center;outline:0;cursor:pointer}.mc-calendar__body_disabled{cursor:default}.mc-calendar__body-cell-content{position:absolute;top:5%;left:5%;padding:8px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-style:solid}@media screen and (-ms-high-contrast:active){.mc-calendar__body-cell-content{border:none}}mc-month-view .mc-calendar__body-cell-content{justify-content:flex-end}mc-multi-year-view .mc-calendar__body-cell-content,mc-year-view .mc-calendar__body-cell-content{justify-content:center}@media screen and (-ms-high-contrast:active){.mc-calendar__body_selected,.mc-datepicker__popup:not(:empty){outline:solid 1px}.mc-calendar__body-today{outline:dotted 1px}}[dir=rtl] .mc-calendar__body-label{text-align:right}"],
            host: {
                class: 'mc-calendar__body',
                role: 'grid',
                'aria-readonly': 'true'
            },
            exportAs: 'mcCalendarBody',
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.ElementRef, core.NgZone])
    ], McCalendarBody);
    return McCalendarBody;
}());

var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
var McMonthView = /** @class */ (function () {
    function McMonthView(changeDetectorRef, dateFormats, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateFormats = dateFormats;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /** Emits when a new date is selected. */
        this.selectedChange = new core.EventEmitter();
        /** Emits when any date is selected. */
        this.userSelection = new core.EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new core.EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        var firstDayOfWeek = this.dateAdapter.getFirstDayOfWeek();
        var narrowWeekdays = this.dateAdapter.getDayOfWeekNames('narrow');
        var longWeekdays = this.dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        var weekdays = longWeekdays.map(function (long, i) {
            return { long: long, narrow: narrowWeekdays[i] };
        });
        this.weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this.dateAdapter.today();
    }
    Object.defineProperty(McMonthView.prototype, "activeDate", {
        /**
         * The date to display in this month view (everything other than the month and year is ignored).
         */
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
            this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (!this.hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
                this.init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMonthView.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.selectedDate = this.getDateInCurrentMonth(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMonthView.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._minDate;
        },
        set: function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMonthView.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._maxDate;
        },
        set: function (value) {
            this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    McMonthView.prototype.ngAfterContentInit = function () {
        this.init();
    };
    /** Handles when a new date is selected. */
    McMonthView.prototype.dateSelected = function (date) {
        if (this.selectedDate !== date) {
            var selectedYear = this.dateAdapter.getYear(this.activeDate);
            var selectedMonth = this.dateAdapter.getMonth(this.activeDate);
            var selectedDate = this.dateAdapter.createDate(selectedYear, selectedMonth, date);
            this.selectedChange.emit(selectedDate);
        }
        this.userSelection.emit();
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    McMonthView.prototype.handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this.isRtl();
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case keycodes.LEFT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                break;
            case keycodes.RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                break;
            case keycodes.UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, -7);
                break;
            case keycodes.DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, 7);
                break;
            case keycodes.HOME:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, 1 - this.dateAdapter.getDate(this._activeDate));
                break;
            case keycodes.END:
                this.activeDate = this.dateAdapter.addCalendarDays(this._activeDate, (this.dateAdapter.getNumDaysInMonth(this._activeDate) -
                    this.dateAdapter.getDate(this._activeDate)));
                break;
            case keycodes.PAGE_UP:
                this.activeDate = event.altKey ?
                    this.dateAdapter.addCalendarYears(this._activeDate, -1) :
                    this.dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case keycodes.PAGE_DOWN:
                this.activeDate = event.altKey ?
                    this.dateAdapter.addCalendarYears(this._activeDate, 1) :
                    this.dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case keycodes.ENTER:
            case keycodes.SPACE:
                if (!this.dateFilter || this.dateFilter(this._activeDate)) {
                    this.dateSelected(this.dateAdapter.getDate(this._activeDate));
                    this.userSelection.emit();
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this.dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this.focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Initializes this month view. */
    McMonthView.prototype.init = function () {
        this.selectedDate = this.getDateInCurrentMonth(this.selected);
        this.todayDate = this.getDateInCurrentMonth(this.dateAdapter.today());
        this.monthLabel =
            this.dateAdapter.getMonthNames('short')[this.dateAdapter.getMonth(this.activeDate)];
        this.monthLabel = this.monthLabel[0].toLocaleUpperCase() + this.monthLabel.substr(1);
        var firstOfMonth = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate), 1);
        this.firstWeekOffset =
            (DAYS_PER_WEEK + this.dateAdapter.getDayOfWeek(firstOfMonth) -
                this.dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this.createWeekCells();
        this.changeDetectorRef.markForCheck();
    };
    /** Focuses the active cell after the microtask queue is empty. */
    McMonthView.prototype.focusActiveCell = function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /** Creates McCalendarCells for the dates in this month. */
    McMonthView.prototype.createWeekCells = function () {
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(this.activeDate);
        var dateNames = this.dateAdapter.getDateNames();
        this.weeks = [[]];
        for (var i = 0, cell = this.firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell === DAYS_PER_WEEK) {
                this.weeks.push([]);
                cell = 0;
            }
            var date = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), this.dateAdapter.getMonth(this.activeDate), i + 1);
            var enabled = this.shouldEnableDate(date);
            var ariaLabel = this.dateAdapter.format(date, this.dateFormats.display.dateA11yLabel);
            var cellClasses = this.dateClass ? this.dateClass(date) : undefined;
            this.weeks[this.weeks.length - 1]
                .push(new McCalendarCell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses));
        }
    };
    /** Date filter for the month */
    McMonthView.prototype.shouldEnableDate = function (date) {
        return !!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate || this.dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this.dateAdapter.compareDate(date, this.maxDate) <= 0);
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    McMonthView.prototype.getDateInCurrentMonth = function (date) {
        return date && this.hasSameMonthAndYear(date, this.activeDate) ?
            this.dateAdapter.getDate(date) : null;
    };
    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    McMonthView.prototype.hasSameMonthAndYear = function (d1, d2) {
        return !!(d1 && d2 && this.dateAdapter.getMonth(d1) === this.dateAdapter.getMonth(d2) &&
            this.dateAdapter.getYear(d1) === this.dateAdapter.getYear(d2));
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McMonthView.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    McMonthView.prototype.isRtl = function () {
        return this.dir && this.dir.value === 'rtl';
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMonthView.prototype, "activeDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMonthView.prototype, "selected", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMonthView.prototype, "minDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMonthView.prototype, "maxDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McMonthView.prototype, "dateFilter", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McMonthView.prototype, "dateClass", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McMonthView.prototype, "selectedChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McMonthView.prototype, "userSelection", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McMonthView.prototype, "activeDateChange", void 0);
    __decorate([
        core.ViewChild(McCalendarBody),
        __metadata("design:type", McCalendarBody)
    ], McMonthView.prototype, "mcCalendarBody", void 0);
    McMonthView = __decorate([
        core.Component({
            selector: 'mc-month-view',
            template: "<table class=\"mc-calendar__table\"><thead class=\"mc-calendar__table-header\"><tr><th *ngFor=\"let day of weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th></tr><tr><th class=\"mc-calendar__table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th></tr></thead><tbody mc-calendar-body [label]=\"monthLabel\" [rows]=\"weeks\" [todayValue]=\"todayDate\" [selectedValue]=\"selectedDate\" [labelMinRequiredCells]=\"3\" [activeCell]=\"dateAdapter.getDate(activeDate) - 1\" (selectedValueChange)=\"dateSelected($event)\" (keydown)=\"handleCalendarBodyKeydown($event)\"></tbody></table>",
            exportAs: 'mcMonthView',
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(1, core.Optional()), __param(1, core.Inject(datetime.MC_DATE_FORMATS)),
        __param(2, core.Optional()),
        __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ChangeDetectorRef, Object, datetime.DateAdapter,
            bidi.Directionality])
    ], McMonthView);
    return McMonthView;
}());

var yearsPerPage = 24;
var yearsPerRow = 4;
/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */
var McMultiYearView = /** @class */ (function () {
    function McMultiYearView(changeDetectorRef, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /** Emits when a new year is selected. */
        this.selectedChange = new core.EventEmitter();
        /** Emits the selected year. This doesn't imply a change on the selected date */
        this.yearSelected = new core.EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new core.EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._activeDate = this.dateAdapter.today();
    }
    Object.defineProperty(McMultiYearView.prototype, "activeDate", {
        /** The date to display in this multi-year view (everything other than the year is ignored). */
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
            this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (Math.floor(this.dateAdapter.getYear(oldActiveDate) / yearsPerPage) !==
                Math.floor(this.dateAdapter.getYear(this._activeDate) / yearsPerPage)) {
                this.init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMultiYearView.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.selectedYear = this._selected && this.dateAdapter.getYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMultiYearView.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._minDate;
        },
        set: function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McMultiYearView.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._maxDate;
        },
        set: function (value) {
            this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    McMultiYearView.prototype.ngAfterContentInit = function () {
        this.init();
    };
    /** Initializes this multi-year view. */
    McMultiYearView.prototype.init = function () {
        var _this = this;
        this.todayYear = this.dateAdapter.getYear(this.dateAdapter.today());
        var activeYear = this.dateAdapter.getYear(this._activeDate);
        var activeOffset = activeYear % yearsPerPage;
        this.years = [];
        for (var i = 0, row = []; i < yearsPerPage; i++) {
            row.push(activeYear - activeOffset + i);
            if (row.length === yearsPerRow) {
                this.years.push(row.map(function (year) { return _this.createCellForYear(year); }));
                row = [];
            }
        }
        this.changeDetectorRef.markForCheck();
    };
    /** Handles when a new year is selected. */
    McMultiYearView.prototype.onYearSelected = function (year) {
        this.yearSelected.emit(this.dateAdapter.createDate(year, 0, 1));
        var month = this.dateAdapter.getMonth(this.activeDate);
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(this.dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(this.dateAdapter.createDate(year, month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
    };
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    McMultiYearView.prototype.handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this.isRtl();
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case keycodes.LEFT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
                break;
            case keycodes.RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
                break;
            case keycodes.UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
                break;
            case keycodes.DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
                break;
            case keycodes.HOME:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, -this.dateAdapter.getYear(this._activeDate) % yearsPerPage);
                break;
            case keycodes.END:
                this.activeDate = this.dateAdapter.addCalendarYears(this._activeDate, yearsPerPage - this.dateAdapter.getYear(this._activeDate) % yearsPerPage - 1);
                break;
            case keycodes.PAGE_UP:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
                break;
            case keycodes.PAGE_DOWN:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
                break;
            case keycodes.ENTER:
            case keycodes.SPACE:
                this.onYearSelected(this.dateAdapter.getYear(this._activeDate));
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this.dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this.focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    McMultiYearView.prototype.getActiveCell = function () {
        return this.dateAdapter.getYear(this.activeDate) % yearsPerPage;
    };
    /** Focuses the active cell after the microtask queue is empty. */
    McMultiYearView.prototype.focusActiveCell = function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /** Creates an McCalendarCell for the given year. */
    McMultiYearView.prototype.createCellForYear = function (year) {
        var yearName = this.dateAdapter.getYearName(this.dateAdapter.createDate(year, 0, 1));
        return new McCalendarCell(year, yearName, yearName, this.shouldEnableYear(year));
    };
    /** Whether the given year is enabled. */
    McMultiYearView.prototype.shouldEnableYear = function (year) {
        // disable if the year is greater than maxDate lower than minDate
        if (year === undefined || year === null ||
            (this.maxDate && year > this.dateAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this.dateAdapter.getYear(this.minDate))) {
            return false;
        }
        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }
        var firstOfYear = this.dateAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (var date = firstOfYear; this.dateAdapter.getYear(date) === year; date = this.dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McMultiYearView.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    McMultiYearView.prototype.isRtl = function () {
        return this.dir && this.dir.value === 'rtl';
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMultiYearView.prototype, "activeDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMultiYearView.prototype, "selected", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMultiYearView.prototype, "minDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McMultiYearView.prototype, "maxDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McMultiYearView.prototype, "dateFilter", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McMultiYearView.prototype, "selectedChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McMultiYearView.prototype, "yearSelected", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McMultiYearView.prototype, "activeDateChange", void 0);
    __decorate([
        core.ViewChild(McCalendarBody),
        __metadata("design:type", McCalendarBody)
    ], McMultiYearView.prototype, "mcCalendarBody", void 0);
    McMultiYearView = __decorate([
        core.Component({
            selector: 'mc-multi-year-view',
            template: "<table class=\"mc-calendar__table\"><thead class=\"mc-calendar__table-header\"><tr><th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th></tr></thead><tbody mc-calendar-body [rows]=\"years\" [todayValue]=\"todayYear\" [selectedValue]=\"selectedYear\" [numCols]=\"4\" [cellAspectRatio]=\"4 / 7\" [activeCell]=\"getActiveCell()\" (selectedValueChange)=\"onYearSelected($event)\" (keydown)=\"handleCalendarBodyKeydown($event)\"></tbody></table>",
            exportAs: 'mcMultiYearView',
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(1, core.Optional()),
        __param(2, core.Optional()),
        __metadata("design:paramtypes", [core.ChangeDetectorRef,
            datetime.DateAdapter,
            bidi.Directionality])
    ], McMultiYearView);
    return McMultiYearView;
}());

/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */
var McYearView = /** @class */ (function () {
    function McYearView(changeDetectorRef, dateFormats, dateAdapter, dir) {
        this.changeDetectorRef = changeDetectorRef;
        this.dateFormats = dateFormats;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        /** Emits when a new month is selected. */
        this.selectedChange = new core.EventEmitter();
        /** Emits the selected month. This doesn't imply a change on the selected date */
        this.monthSelected = new core.EventEmitter();
        /** Emits when any date is activated. */
        this.activeDateChange = new core.EventEmitter();
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        this._activeDate = this.dateAdapter.today();
    }
    Object.defineProperty(McYearView.prototype, "activeDate", {
        /** The date to display in this year view (everything other than the year is ignored). */
        get: function () {
            return this._activeDate;
        },
        set: function (value) {
            var oldActiveDate = this._activeDate;
            var validDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value)) || this.dateAdapter.today();
            this._activeDate = this.dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (this.dateAdapter.getYear(oldActiveDate) !== this.dateAdapter.getYear(this._activeDate)) {
                this.init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McYearView.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.selectedMonth = this.getMonthInCurrentYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McYearView.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._minDate;
        },
        set: function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McYearView.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._maxDate;
        },
        set: function (value) {
            this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    McYearView.prototype.ngAfterContentInit = function () {
        this.init();
    };
    /** Handles when a new month is selected. */
    McYearView.prototype.onMonthSelected = function (month) {
        var normalizedDate = this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1);
        this.monthSelected.emit(normalizedDate);
        var daysInMonth = this.dateAdapter.getNumDaysInMonth(normalizedDate);
        this.selectedChange.emit(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, Math.min(this.dateAdapter.getDate(this.activeDate), daysInMonth)));
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    McYearView.prototype.handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        var oldActiveDate = this._activeDate;
        var isRtl = this.isRtl();
        var VERTICAL_SHIFT = 4;
        var PAGE_SHIFT = 10;
        var MAX_MONTH_INDEX = 11;
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case keycodes.LEFT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
                break;
            case keycodes.RIGHT_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
                break;
            case keycodes.UP_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, -VERTICAL_SHIFT);
                break;
            case keycodes.DOWN_ARROW:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, VERTICAL_SHIFT);
                break;
            case keycodes.HOME:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, -this.dateAdapter.getMonth(this._activeDate));
                break;
            case keycodes.END:
                this.activeDate = this.dateAdapter.addCalendarMonths(this._activeDate, MAX_MONTH_INDEX - this.dateAdapter.getMonth(this._activeDate));
                break;
            case keycodes.PAGE_UP:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -PAGE_SHIFT : -1);
                break;
            case keycodes.PAGE_DOWN:
                this.activeDate =
                    this.dateAdapter.addCalendarYears(this._activeDate, event.altKey ? PAGE_SHIFT : 1);
                break;
            case keycodes.ENTER:
            case keycodes.SPACE:
                this.onMonthSelected(this.dateAdapter.getMonth(this._activeDate));
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this.dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this.focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Initializes this year view. */
    McYearView.prototype.init = function () {
        var _this = this;
        this.selectedMonth = this.getMonthInCurrentYear(this.selected);
        this.todayMonth = this.getMonthInCurrentYear(this.dateAdapter.today());
        this.yearLabel = this.dateAdapter.getYearName(this.activeDate);
        var monthNames = this.dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        // tslint:disable-next-line:no-magic-numbers
        this.months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map(function (row) { return row.map(function (month) { return _this.createCellForMonth(month, monthNames[month]); }); });
        this.changeDetectorRef.markForCheck();
    };
    /** Focuses the active cell after the microtask queue is empty. */
    McYearView.prototype.focusActiveCell = function () {
        this.mcCalendarBody.focusActiveCell();
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    McYearView.prototype.getMonthInCurrentYear = function (date) {
        return date && this.dateAdapter.getYear(date) === this.dateAdapter.getYear(this.activeDate) ?
            this.dateAdapter.getMonth(date) : null;
    };
    /** Creates an McCalendarCell for the given month. */
    McYearView.prototype.createCellForMonth = function (month, monthName) {
        var ariaLabel = this.dateAdapter.format(this.dateAdapter.createDate(this.dateAdapter.getYear(this.activeDate), month, 1), this.dateFormats.display.monthYearA11yLabel);
        var newMonthName = monthName[0].toLocaleUpperCase() + monthName.substr(1);
        return new McCalendarCell(month, newMonthName, ariaLabel, this.shouldEnableMonth(month));
    };
    /** Whether the given month is enabled. */
    McYearView.prototype.shouldEnableMonth = function (month) {
        var activeYear = this.dateAdapter.getYear(this.activeDate);
        if (month === undefined || month === null ||
            this.isYearAndMonthAfterMaxDate(activeYear, month) ||
            this.isYearAndMonthBeforeMinDate(activeYear, month)) {
            return false;
        }
        if (!this.dateFilter) {
            return true;
        }
        var firstOfMonth = this.dateAdapter.createDate(activeYear, month, 1);
        // If any date in the month is enabled count the month as enabled.
        for (var date = firstOfMonth; this.dateAdapter.getMonth(date) === month; date = this.dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    McYearView.prototype.isYearAndMonthAfterMaxDate = function (year, month) {
        if (this.maxDate) {
            var maxYear = this.dateAdapter.getYear(this.maxDate);
            var maxMonth = this.dateAdapter.getMonth(this.maxDate);
            return year > maxYear || (year === maxYear && month > maxMonth);
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    McYearView.prototype.isYearAndMonthBeforeMinDate = function (year, month) {
        if (this.minDate) {
            var minYear = this.dateAdapter.getYear(this.minDate);
            var minMonth = this.dateAdapter.getMonth(this.minDate);
            return year < minYear || (year === minYear && month < minMonth);
        }
        return false;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McYearView.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    McYearView.prototype.isRtl = function () {
        return this.dir && this.dir.value === 'rtl';
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McYearView.prototype, "activeDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McYearView.prototype, "selected", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McYearView.prototype, "minDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McYearView.prototype, "maxDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McYearView.prototype, "dateFilter", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McYearView.prototype, "selectedChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McYearView.prototype, "monthSelected", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McYearView.prototype, "activeDateChange", void 0);
    __decorate([
        core.ViewChild(McCalendarBody),
        __metadata("design:type", McCalendarBody)
    ], McYearView.prototype, "mcCalendarBody", void 0);
    McYearView = __decorate([
        core.Component({
            selector: 'mc-year-view',
            template: "<table class=\"mc-calendar__table\"><thead class=\"mc-calendar__table-header\"><tr><th class=\"mc-calendar__table-header-divider\" colspan=\"4\"></th></tr></thead><tbody mc-calendar-body [label]=\"yearLabel\" [rows]=\"months\" [todayValue]=\"todayMonth\" [selectedValue]=\"selectedMonth\" [labelMinRequiredCells]=\"2\" [numCols]=\"4\" [cellAspectRatio]=\"4 / 7\" [activeCell]=\"dateAdapter.getMonth(activeDate)\" (selectedValueChange)=\"onMonthSelected($event)\" (keydown)=\"handleCalendarBodyKeydown($event)\"></tbody></table>",
            exportAs: 'mcYearView',
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(1, core.Optional()), __param(1, core.Inject(datetime.MC_DATE_FORMATS)),
        __param(2, core.Optional()),
        __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ChangeDetectorRef, Object, datetime.DateAdapter,
            bidi.Directionality])
    ], McYearView);
    return McYearView;
}());

/** Default header for McCalendar */
var McCalendarHeader = /** @class */ (function () {
    function McCalendarHeader(intl, calendar, dateAdapter, dateFormats, changeDetectorRef) {
        this.intl = intl;
        this.calendar = calendar;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.calendar.stateChanges.subscribe(function () { return changeDetectorRef.markForCheck(); });
    }
    Object.defineProperty(McCalendarHeader.prototype, "periodButtonText", {
        /** The label for the current calendar view. */
        get: function () {
            if (this.calendar.currentView === 'month') {
                var label = this.dateAdapter
                    .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel);
                return label[0].toLocaleUpperCase() + label.substr(1);
            }
            if (this.calendar.currentView === 'year') {
                return this.dateAdapter.getYearName(this.calendar.activeDate);
            }
            var activeYear = this.dateAdapter.getYear(this.calendar.activeDate);
            var firstYearInView = this.dateAdapter.getYearName(
            // tslint:disable-next-line:no-magic-numbers
            this.dateAdapter.createDate(activeYear - activeYear % 24, 0, 1));
            var lastYearInView = this.dateAdapter.getYearName(
            // tslint:disable-next-line:no-magic-numbers
            this.dateAdapter.createDate(activeYear + yearsPerPage - 1 - activeYear % 24, 0, 1));
            return firstYearInView + " \u2013 " + lastYearInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendarHeader.prototype, "periodButtonLabel", {
        get: function () {
            return this.calendar.currentView === 'month' ?
                this.intl.switchToMultiYearViewLabel : this.intl.switchToMonthViewLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendarHeader.prototype, "prevButtonLabel", {
        /** The label for the previous button. */
        get: function () {
            return {
                month: this.intl.prevMonthLabel,
                year: this.intl.prevYearLabel,
                'multi-year': this.intl.prevMultiYearLabel
            }[this.calendar.currentView];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendarHeader.prototype, "nextButtonLabel", {
        /** The label for the next button. */
        get: function () {
            return {
                month: this.intl.nextMonthLabel,
                year: this.intl.nextYearLabel,
                'multi-year': this.intl.nextMultiYearLabel
            }[this.calendar.currentView];
        },
        enumerable: true,
        configurable: true
    });
    /** Handles user clicks on the period label. */
    McCalendarHeader.prototype.currentPeriodClicked = function () {
        this.calendar.currentView = this.calendar.currentView === 'month' ? 'multi-year' : 'month';
    };
    /** Handles user clicks on the previous button. */
    McCalendarHeader.prototype.previousClicked = function () {
        this.calendar.activeDate = this.calendar.currentView === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? -1 : -yearsPerPage);
    };
    /** Handles user clicks on the next button. */
    McCalendarHeader.prototype.nextClicked = function () {
        this.calendar.activeDate = this.calendar.currentView === 'month' ?
            this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
            this.dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView === 'year' ? 1 : yearsPerPage);
    };
    /** Whether the previous period button is enabled. */
    McCalendarHeader.prototype.previousEnabled = function () {
        if (!this.calendar.minDate) {
            return true;
        }
        return !this.calendar.minDate ||
            !this.isSameView(this.calendar.activeDate, this.calendar.minDate);
    };
    /** Whether the next period button is enabled. */
    McCalendarHeader.prototype.nextEnabled = function () {
        return !this.calendar.maxDate ||
            !this.isSameView(this.calendar.activeDate, this.calendar.maxDate);
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    McCalendarHeader.prototype.isSameView = function (date1, date2) {
        if (this.calendar.currentView === 'month') {
            return this.dateAdapter.getYear(date1) === this.dateAdapter.getYear(date2) &&
                this.dateAdapter.getMonth(date1) === this.dateAdapter.getMonth(date2);
        }
        if (this.calendar.currentView === 'year') {
            return this.dateAdapter.getYear(date1) === this.dateAdapter.getYear(date2);
        }
        // Otherwise we are in 'multi-year' view.
        return Math.floor(this.dateAdapter.getYear(date1) / yearsPerPage) ===
            Math.floor(this.dateAdapter.getYear(date2) / yearsPerPage);
    };
    McCalendarHeader = __decorate([
        core.Component({
            selector: 'mc-calendar-header',
            template: "<div class=\"mc-calendar__header\"><div class=\"mc-calendar__controls\"><button mc-button type=\"button\" class=\"mc-calendar__period-button\" (click)=\"currentPeriodClicked()\" [attr.aria-label]=\"periodButtonLabel\">{{periodButtonText}} <i class=\"mc mc-icon\" [class.mc-angle-up-M_16]=\"calendar.currentView !== 'month'\" [class.mc-angle-down-M_16]=\"calendar.currentView === 'month'\"></i></button><div class=\"mc-calendar-spacer\"></div><ng-content></ng-content><button mc-icon-button type=\"button\" class=\"mc-calendar__previous-button\" [disabled]=\"!previousEnabled()\" (click)=\"previousClicked()\" [attr.aria-label]=\"prevButtonLabel\"><i mc-icon=\"mc-angle-left-L_16\"></i></button> <button mc-icon-button type=\"button\" class=\"mc-calendar__next-button\" [disabled]=\"!nextEnabled()\" (click)=\"nextClicked()\" [attr.aria-label]=\"nextButtonLabel\"><i mc-icon=\"mc-angle-right-L_16\"></i></button></div></div>",
            exportAs: 'mcCalendarHeader',
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(1, core.Inject(core.forwardRef(function () { return McCalendar; }))),
        __param(2, core.Optional()),
        __param(3, core.Optional()), __param(3, core.Inject(datetime.MC_DATE_FORMATS)),
        __metadata("design:paramtypes", [McDatepickerIntl,
            McCalendar,
            datetime.DateAdapter, Object, core.ChangeDetectorRef])
    ], McCalendarHeader);
    return McCalendarHeader;
}());
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
var McCalendar = /** @class */ (function () {
    function McCalendar(intl, dateAdapter, dateFormats, changeDetectorRef) {
        var _this = this;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.changeDetectorRef = changeDetectorRef;
        /** Whether the calendar should be started in month or year view. */
        this.startView = 'month';
        /** Emits when the currently selected date changes. */
        this.selectedChange = new core.EventEmitter();
        /**
         * Emits the year chosen in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new core.EventEmitter();
        /**
         * Emits the month chosen in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new core.EventEmitter();
        /** Emits when any date is selected. */
        this.userSelection = new core.EventEmitter();
        /**
         * Emits whenever there is a state change that the header may need to respond to.
         */
        this.stateChanges = new rxjs.Subject();
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this.moveFocusOnNextTick = false;
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        this.intlChanges = intl.changes.subscribe(function () {
            changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        });
    }
    Object.defineProperty(McCalendar.prototype, "startAt", {
        /** A date representing the period (month or year) to start the calendar in. */
        get: function () {
            return this._startAt;
        },
        set: function (value) {
            this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this._minDate;
        },
        set: function (value) {
            this._minDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this._maxDate;
        },
        set: function (value) {
            this._maxDate = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: function () {
            return this.clampedActiveDate;
        },
        set: function (value) {
            this.clampedActiveDate = this.dateAdapter.clampDate(value, this.minDate, this.maxDate);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCalendar.prototype, "currentView", {
        /** Whether the calendar is in month view. */
        get: function () {
            return this._currentView;
        },
        set: function (value) {
            this._currentView = value;
            this.moveFocusOnNextTick = true;
        },
        enumerable: true,
        configurable: true
    });
    McCalendar.prototype.ngAfterContentInit = function () {
        this.calendarHeaderPortal = new portal.ComponentPortal(this.headerComponent || McCalendarHeader);
        this.activeDate = this.startAt || this.dateAdapter.today();
        // Assign to the private property since we don't want to move focus on init.
        this._currentView = this.startView;
    };
    McCalendar.prototype.ngAfterViewChecked = function () {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    };
    McCalendar.prototype.ngOnDestroy = function () {
        this.intlChanges.unsubscribe();
        this.stateChanges.complete();
    };
    McCalendar.prototype.ngOnChanges = function (changes) {
        var change = changes.minDate || changes.maxDate || changes.dateFilter;
        if (change && !change.firstChange) {
            var view = this.getCurrentViewComponent();
            if (view) {
                // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
                // passed down to the view via data bindings which won't be up-to-date when we call `init`.
                this.changeDetectorRef.detectChanges();
                view.init();
            }
        }
        this.stateChanges.next();
    };
    McCalendar.prototype.focusActiveCell = function () {
        this.getCurrentViewComponent().focusActiveCell();
    };
    /** Updates today's date after an update of the active date */
    McCalendar.prototype.updateTodaysDate = function () {
        var view = this.currentView === 'month' ? this.monthView :
            (this.currentView === 'year' ? this.yearView : this.multiYearView);
        view.ngAfterContentInit();
    };
    /** Handles date selection in the month view. */
    McCalendar.prototype.dateSelected = function (date) {
        if (!this.dateAdapter.sameDate(date, this.selected)) {
            this.selectedChange.emit(date);
        }
    };
    /** Handles year selection in the multiyear view. */
    McCalendar.prototype.yearSelectedInMultiYearView = function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Handles month selection in the year view. */
    McCalendar.prototype.monthSelectedInYearView = function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    McCalendar.prototype.userSelected = function () {
        this.userSelection.emit();
    };
    /** Handles year/month selection in the multi-year/year views. */
    McCalendar.prototype.goToDateInView = function (date, view) {
        this.activeDate = date;
        this.currentView = view;
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McCalendar.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Returns the component instance that corresponds to the current calendar view. */
    McCalendar.prototype.getCurrentViewComponent = function () {
        return this.monthView || this.yearView || this.multiYearView;
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCalendar.prototype, "startAt", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCalendar.prototype, "selected", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCalendar.prototype, "minDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McCalendar.prototype, "maxDate", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McCalendar.prototype, "headerComponent", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McCalendar.prototype, "startView", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McCalendar.prototype, "dateFilter", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McCalendar.prototype, "dateClass", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McCalendar.prototype, "selectedChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McCalendar.prototype, "yearSelected", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McCalendar.prototype, "monthSelected", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McCalendar.prototype, "userSelection", void 0);
    __decorate([
        core.ViewChild(McMonthView),
        __metadata("design:type", McMonthView)
    ], McCalendar.prototype, "monthView", void 0);
    __decorate([
        core.ViewChild(McYearView),
        __metadata("design:type", McYearView)
    ], McCalendar.prototype, "yearView", void 0);
    __decorate([
        core.ViewChild(McMultiYearView),
        __metadata("design:type", McMultiYearView)
    ], McCalendar.prototype, "multiYearView", void 0);
    McCalendar = __decorate([
        core.Component({
            selector: 'mc-calendar',
            template: "<ng-template [cdkPortalOutlet]=\"calendarHeaderPortal\"></ng-template><div class=\"mc-calendar__content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\"><mc-month-view *ngSwitchCase=\"'month'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" [dateClass]=\"dateClass\" (selectedChange)=\"dateSelected($event)\" (userSelection)=\"userSelected()\"></mc-month-view><mc-year-view *ngSwitchCase=\"'year'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (monthSelected)=\"monthSelectedInYearView($event)\" (selectedChange)=\"goToDateInView($event, 'month')\"></mc-year-view><mc-multi-year-view *ngSwitchCase=\"'multi-year'\" [(activeDate)]=\"activeDate\" [selected]=\"selected\" [dateFilter]=\"dateFilter\" [maxDate]=\"maxDate\" [minDate]=\"minDate\" (yearSelected)=\"yearSelectedInMultiYearView($event)\" (selectedChange)=\"goToDateInView($event, 'year')\"></mc-multi-year-view></div>",
            styles: [".mc-calendar{display:block}.mc-calendar__header{padding:8px 8px 0 8px}.mc-calendar__content{padding:0 8px 8px 8px;outline:0}.mc-calendar__controls{display:flex;margin:5% calc(33% / 7 - 16px)}.mc-calendar__controls .mc-button,.mc-calendar__controls .mc-icon-button{border-radius:0;border-color:transparent;background-color:transparent}.mc-calendar__controls .mc-button .mc-button-overlay,.mc-calendar__controls .mc-icon-button .mc-button-overlay{z-index:-1}.mc-calendar-spacer{flex:1 1 auto}.mc-calendar__period-button{min-width:0}.mc-calendar__previous-button::after{border-left-width:2px;transform:translateX(2px) rotate(-45deg)}.mc-calendar__next-button::after{border-right-width:2px;transform:translateX(-2px) rotate(45deg)}.mc-calendar__table{border-spacing:0;border-collapse:collapse;width:100%}.mc-calendar__table-header th{text-align:center;padding:0 0 8px 0}.mc-calendar__table-header-divider{position:relative;height:1px}.mc-calendar__table-header-divider::after{content:'';position:absolute;top:0;left:-8px;right:-8px;height:1px}"],
            host: {
                class: 'mc-calendar'
            },
            exportAs: 'mcCalendar',
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(1, core.Optional()),
        __param(2, core.Optional()), __param(2, core.Inject(datetime.MC_DATE_FORMATS)),
        __metadata("design:paramtypes", [McDatepickerIntl,
            datetime.DateAdapter, Object, core.ChangeDetectorRef])
    ], McCalendar);
    return McCalendar;
}());

/**
 * Animations used by the mosaic datepicker.
 * @docs-private
 */
var mcDatepickerAnimations = {
    /** Transforms the height of the datepicker's calendar. */
    transformPanel: animations.trigger('transformPanel', [
        animations.state('void', animations.style({
            opacity: 0,
            transform: 'scale(1, 0.8)'
        })),
        animations.transition('void => enter', animations.animate('120ms cubic-bezier(0, 0, 0.2, 1)', animations.style({
            opacity: 1,
            transform: 'scale(1, 1)'
        }))),
        animations.transition('* => void', animations.animate('100ms linear', animations.style({ opacity: 0 })))
    ]),
    /** Fades in the content of the calendar. */
    fadeInCalendar: animations.trigger('fadeInCalendar', [
        animations.state('void', animations.style({ opacity: 0 })),
        animations.state('enter', animations.style({ opacity: 1 })),
        // need to keep it until #12440 gets in, otherwise the exit animation will look glitchy.
        animations.transition('void => *', animations.animate('120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
    ])
};
// todo should be put into polyfils
// https://github.com/angular/angular/issues/24769
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

/** Used to generate a unique ID for each datepicker instance. */
var datepickerUid = 0;
/** Injection token that determines the scroll handling while the calendar is open. */
var MC_DATEPICKER_SCROLL_STRATEGY = new core.InjectionToken('mc-datepicker-scroll-strategy');
/** @docs-private */
// tslint:disable-next-line:naming-convention
function MC_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay$$1) {
    return function () { return overlay$$1.scrollStrategies.reposition(); };
}
/** @docs-private */
var MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DATEPICKER_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: MC_DATEPICKER_SCROLL_STRATEGY_FACTORY
};
// Boilerplate for applying mixins to McDatepickerContent.
/** @docs-private */
var McDatepickerContentBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McDatepickerContentBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McDatepickerContentBase;
}());
// tslint:disable-next-line:naming-convention
var McDatepickerContentMixinBase = mixinColor(McDatepickerContentBase);
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * McCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
var McDatepickerContent = /** @class */ (function (_super) {
    __extends(McDatepickerContent, _super);
    function McDatepickerContent(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    McDatepickerContent.prototype.ngAfterViewInit = function () {
        this.calendar.focusActiveCell();
    };
    __decorate([
        core.ViewChild(McCalendar),
        __metadata("design:type", McCalendar)
    ], McDatepickerContent.prototype, "calendar", void 0);
    McDatepickerContent = __decorate([
        core.Component({
            selector: 'mc-datepicker__content',
            template: "<mc-calendar [id]=\"datepicker.id\" [ngClass]=\"datepicker.panelClass\" [startAt]=\"datepicker.startAt\" [startView]=\"datepicker.startView\" [minDate]=\"datepicker.minDate\" [maxDate]=\"datepicker.maxDate\" [dateFilter]=\"datepicker.dateFilter\" [headerComponent]=\"datepicker.calendarHeaderComponent\" [selected]=\"datepicker.selected\" [dateClass]=\"datepicker.dateClass\" [@fadeInCalendar]=\"'enter'\" (selectedChange)=\"datepicker.select($event)\" (yearSelected)=\"datepicker.selectYear($event)\" (monthSelected)=\"datepicker.selectMonth($event)\" (userSelection)=\"datepicker.close()\"></mc-calendar>",
            styles: [".mc-datepicker__content{display:block}.mc-datepicker__content .mc-calendar{width:296px;height:344px}.mc-datepicker__content .mc-calendar__next-button[disabled],.mc-datepicker__content .mc-calendar__previous-button[disabled]{border:0}@media all and (orientation:landscape){.mc-calendar{width:64vh;height:80vh}}@media all and (orientation:portrait){.mc-calendar{width:80vw;height:100vw}}"],
            host: {
                class: 'mc-datepicker__content',
                '[@transformPanel]': '"enter"'
            },
            animations: [
                mcDatepickerAnimations.transformPanel,
                mcDatepickerAnimations.fadeInCalendar
            ],
            exportAs: 'mcDatepickerContent',
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            inputs: ['color']
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McDatepickerContent);
    return McDatepickerContent;
}(McDatepickerContentMixinBase));
// TODO: We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="mcDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
var McDatepicker = /** @class */ (function () {
    function McDatepicker(overlay$$1, ngZone, viewContainerRef, scrollStrategy, dateAdapter, dir, document) {
        this.overlay = overlay$$1;
        this.ngZone = ngZone;
        this.viewContainerRef = viewContainerRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        this.document = document;
        /** The view that the calendar should start in. */
        this.startView = 'month';
        /**
         * Emits selected year in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new core.EventEmitter();
        /**
         * Emits selected month in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new core.EventEmitter();
        /** Emits when the datepicker has been opened. */
        this.openedStream = new core.EventEmitter();
        /** Emits when the datepicker has been closed. */
        this.closedStream = new core.EventEmitter();
        /** The id for the datepicker calendar. */
        this.id = "mc-datepicker-" + datepickerUid++;
        this.stateChanges = new rxjs.Subject();
        /** Emits when the datepicker is disabled. */
        this.disabledChange = new rxjs.Subject();
        /** Emits new selected date when selected date changes. */
        this.selectedChanged = new rxjs.Subject();
        this._opened = false;
        this.validSelected = null;
        /** The element that was focused before the datepicker was opened. */
        this.focusedElementBeforeOpen = null;
        /** Subscription to value changes in the associated input element. */
        this.inputSubscription = rxjs.Subscription.EMPTY;
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this.scrollStrategy = scrollStrategy;
    }
    McDatepicker_1 = McDatepicker;
    Object.defineProperty(McDatepicker.prototype, "startAt", {
        /** The date to open the calendar to initially. */
        get: function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            return this._startAt || (this.datepickerInput ? this.datepickerInput.value : null);
        },
        set: function (value) {
            this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "color", {
        /** Color palette to use on the datepicker's calendar. */
        get: function () {
            // @ts-ignore:next-line
            return this._color ||
                (this.datepickerInput ? this.datepickerInput.getThemePalette() : undefined);
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "disabled", {
        /** Whether the datepicker pop-up should be disabled. */
        get: function () {
            return this._disabled === undefined && this.datepickerInput ?
                this.datepickerInput.disabled : !!this._disabled;
        },
        set: function (value) {
            var newValue = coercion.coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this.disabledChange.next(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "opened", {
        /** Whether the calendar is open. */
        get: function () {
            return this._opened;
        },
        set: function (value) {
            if (value) {
                this.open();
            }
            else {
                this.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "selected", {
        /** The currently selected date. */
        get: function () {
            return this.validSelected;
        },
        set: function (value) {
            this.validSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "minDate", {
        /** The minimum selectable date. */
        get: function () {
            return this.datepickerInput && this.datepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: function () {
            return this.datepickerInput && this.datepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "dateFilter", {
        get: function () {
            return this.datepickerInput && this.datepickerInput.dateFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "value", {
        get: function () {
            return this.selected;
        },
        enumerable: true,
        configurable: true
    });
    McDatepicker.prototype.ngOnDestroy = function () {
        this.close();
        this.inputSubscription.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
            this.popupComponentRef = null;
        }
    };
    /** Selects the given date */
    McDatepicker.prototype.select = function (date) {
        var oldValue = this.selected;
        this.selected = date;
        if (!this.dateAdapter.sameDate(oldValue, this.selected)) {
            this.selectedChanged.next(date);
        }
    };
    /** Emits the selected year in multiyear view */
    McDatepicker.prototype.selectYear = function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Emits selected month in year view */
    McDatepicker.prototype.selectMonth = function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    McDatepicker.prototype.registerInput = function (input) {
        var _this = this;
        if (this.datepickerInput) {
            throw Error('A McDatepicker can only be associated with a single input.');
        }
        this.datepickerInput = input;
        this.inputSubscription =
            this.datepickerInput.valueChange.subscribe(function (value) { return _this.selected = value; });
    };
    /** Open the calendar. */
    McDatepicker.prototype.open = function () {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this.datepickerInput) {
            throw Error('Attempted to open an McDatepicker with no associated input.');
        }
        if (this.document) {
            this.focusedElementBeforeOpen = this.document.activeElement;
        }
        this.openAsPopup();
        this._opened = true;
        this.openedStream.emit();
    };
    /** Close the calendar. */
    McDatepicker.prototype.close = function () {
        var _this = this;
        if (!this._opened) {
            return;
        }
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.calendarPortal && this.calendarPortal.isAttached) {
            this.calendarPortal.detach();
        }
        var completeClose = function () {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (_this._opened) {
                _this._opened = false;
                _this.closedStream.emit();
                _this.focusedElementBeforeOpen = null;
            }
        };
        if (this.focusedElementBeforeOpen &&
            typeof this.focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this.focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    };
    /** Open the calendar as a popup. */
    McDatepicker.prototype.openAsPopup = function () {
        var _this = this;
        if (!this.calendarPortal) {
            this.calendarPortal = new portal.ComponentPortal(McDatepickerContent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            this.popupComponentRef = this.popupRef.attach(this.calendarPortal);
            this.popupComponentRef.instance.datepicker = this;
            this.setColor();
            // Update the position once the calendar has rendered.
            this.ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe(function () {
                _this.popupRef.updatePosition();
            });
        }
    };
    /** Create the popup. */
    McDatepicker.prototype.createPopup = function () {
        var _this = this;
        var overlayConfig = new overlay.OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'mc-overlay-transparent-backdrop',
            direction: this.dir,
            scrollStrategy: this.scrollStrategy(),
            panelClass: 'mc-datepicker__popup'
        });
        this.popupRef = this.overlay.create(overlayConfig);
        this.popupRef.overlayElement.setAttribute('role', 'dialog');
        rxjs.merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef.keydownEvents().pipe(operators.filter(function (event) {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            // tslint:disable-next-line:deprecation
            return event.keyCode === keycodes.ESCAPE || (_this.datepickerInput && event.altKey && event.keyCode === keycodes.UP_ARROW);
        }))).subscribe(function () { return _this.close(); });
    };
    /** Create the popup PositionStrategy. */
    McDatepicker.prototype.createPopupPositionStrategy = function () {
        return this.overlay.position()
            .flexibleConnectedTo(this.datepickerInput.elementRef)
            .withTransformOriginOn('.mc-datepicker__content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]);
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McDatepicker.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    /** Passes the current theme color along to the calendar overlay. */
    McDatepicker.prototype.setColor = function () {
        var color = this.color;
        if (this.popupComponentRef) {
            this.popupComponentRef.instance.color = color;
        }
    };
    var McDatepicker_1;
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDatepicker.prototype, "startAt", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McDatepicker.prototype, "color", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDatepicker.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDatepicker.prototype, "opened", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McDatepicker.prototype, "calendarHeaderComponent", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McDatepicker.prototype, "startView", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McDatepicker.prototype, "yearSelected", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McDatepicker.prototype, "monthSelected", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McDatepicker.prototype, "panelClass", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McDatepicker.prototype, "dateClass", void 0);
    __decorate([
        core.Output('opened'),
        __metadata("design:type", core.EventEmitter)
    ], McDatepicker.prototype, "openedStream", void 0);
    __decorate([
        core.Output('closed'),
        __metadata("design:type", core.EventEmitter)
    ], McDatepicker.prototype, "closedStream", void 0);
    McDatepicker = McDatepicker_1 = __decorate([
        core.Component({
            selector: 'mc-datepicker',
            template: '',
            exportAs: 'mcDatepicker',
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            providers: [{ provide: McFormFieldControl, useExisting: McDatepicker_1 }]
        }),
        __param(3, core.Inject(MC_DATEPICKER_SCROLL_STRATEGY)),
        __param(4, core.Optional()),
        __param(5, core.Optional()),
        __param(6, core.Optional()), __param(6, core.Inject(common.DOCUMENT)),
        __metadata("design:paramtypes", [overlay.Overlay,
            core.NgZone,
            core.ViewContainerRef, Object, datetime.DateAdapter,
            bidi.Directionality, Object])
    ], McDatepicker);
    return McDatepicker;
}());

/** @docs-private */
var MC_DATEPICKER_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return McDatepickerInput; }),
    multi: true
};
/** @docs-private */
var MC_DATEPICKER_VALIDATORS = {
    provide: forms.NG_VALIDATORS,
    useExisting: core.forwardRef(function () { return McDatepickerInput; }),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use McDatepickerInputEvent instead.
 */
var McDatepickerInputEvent = /** @class */ (function () {
    function McDatepickerInputEvent(
    /** Reference to the datepicker input component that emitted the event. */
    target, 
    /** Reference to the native input element associated with the datepicker input. */
    targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
    return McDatepickerInputEvent;
}());
/** Directive used to connect an input to a McDatepicker. */
var McDatepickerInput = /** @class */ (function () {
    function McDatepickerInput(elementRef, dateAdapter, dateFormats, formField) {
        var _this = this;
        this.elementRef = elementRef;
        this.dateAdapter = dateAdapter;
        this.dateFormats = dateFormats;
        this.formField = formField;
        /** Emits when a `change` event is fired on this `<input>`. */
        this.dateChange = new core.EventEmitter();
        /** Emits when an `input` event is fired on this `<input>`. */
        this.dateInput = new core.EventEmitter();
        /** Emits when the value changes (either due to user input or programmatic change). */
        this.valueChange = new core.EventEmitter();
        /** Emits when the disabled state has changed */
        this.disabledChange = new core.EventEmitter();
        this.datepickerSubscription = rxjs.Subscription.EMPTY;
        this.localeSubscription = rxjs.Subscription.EMPTY;
        /** Whether the last value set on the input was valid. */
        this.lastValueValid = false;
        this.onTouched = function () {
        };
        this.cvaOnChange = function () {
        };
        this.validatorOnChange = function () {
        };
        /** The form control validator for whether the input parses. */
        this.parseValidator = function () {
            return _this.lastValueValid ?
                null : { mcDatepickerParse: { text: _this.elementRef.nativeElement.value } };
        };
        /** The form control validator for the min date. */
        this.minValidator = function (control) {
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return (!_this.min || !controlValue ||
                _this.dateAdapter.compareDate(_this.min, controlValue) <= 0) ?
                null : { mcDatepickerMin: { min: _this.min, actual: controlValue } };
        };
        /** The form control validator for the max date. */
        this.maxValidator = function (control) {
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return (!_this.max || !controlValue ||
                _this.dateAdapter.compareDate(_this.max, controlValue) >= 0) ?
                null : { mcDatepickerMax: { max: _this.max, actual: controlValue } };
        };
        /** The form control validator for the date filter. */
        this.filterValidator = function (control) {
            var controlValue = _this.getValidDateOrNull(_this.dateAdapter.deserialize(control.value));
            return !_this.dateFilter || !controlValue || _this.dateFilter(controlValue) ?
                null : { mcDatepickerFilter: true };
        };
        /** The combined form control validator for this input. */
        // tslint:disable:member-ordering
        this.validator = forms.Validators.compose([
            this.parseValidator,
            this.minValidator,
            this.maxValidator,
            this.filterValidator
        ]);
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this.dateFormats) {
            throw createMissingDateImplError('MC_DATE_FORMATS');
        }
        // Update the displayed date when the locale changes.
        this.localeSubscription = dateAdapter.localeChanges.subscribe(function () {
            _this.value = _this.value;
        });
    }
    McDatepickerInput_1 = McDatepickerInput;
    Object.defineProperty(McDatepickerInput.prototype, "mcDatepicker", {
        /** The datepicker that this input is associated with. */
        set: function (value) {
            var _this = this;
            if (!value) {
                return;
            }
            this.datepicker = value;
            this.datepicker.registerInput(this);
            this.datepickerSubscription.unsubscribe();
            this.datepickerSubscription = this.datepicker.selectedChanged.subscribe(function (selected) {
                _this.value = selected;
                _this.cvaOnChange(selected);
                _this.onTouched();
                _this.dateInput.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
                _this.dateChange.emit(new McDatepickerInputEvent(_this, _this.elementRef.nativeElement));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "mcDatepickerFilter", {
        /** Function that can be used to filter out dates within the datepicker. */
        set: function (value) {
            this.dateFilter = value;
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "value", {
        /** The value of the input. */
        get: function () {
            return this._value;
        },
        set: function (value) {
            // tslint:disable-next-line:no-parameter-reassignment
            value = this.dateAdapter.deserialize(value);
            this.lastValueValid = !value || this.dateAdapter.isValid(value);
            // tslint:disable-next-line:no-parameter-reassignment
            value = this.getValidDateOrNull(value);
            var oldDate = this.value;
            this._value = value;
            this.formatValue(value);
            if (!this.dateAdapter.sameDate(oldDate, value)) {
                this.valueChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "min", {
        /** The minimum valid date. */
        get: function () {
            return this._min;
        },
        set: function (value) {
            this._min = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "max", {
        /** The maximum valid date. */
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepickerInput.prototype, "disabled", {
        /** Whether the datepicker-input is disabled. */
        get: function () {
            return !!this._disabled;
        },
        set: function (value) {
            var newValue = coercion.coerceBooleanProperty(value);
            var element = this.elementRef.nativeElement;
            if (this._disabled !== newValue) {
                this._disabled = newValue;
                this.disabledChange.emit(newValue);
            }
            // We need to null check the `blur` method, because it's undefined during SSR.
            if (newValue && element.blur) {
                // Normally, native input elements automatically blur if they turn disabled. This behavior
                // is problematic, because it would mean that it triggers another change detection cycle,
                // which then causes a changed after checked error if the input element was focused before.
                element.blur();
            }
        },
        enumerable: true,
        configurable: true
    });
    McDatepickerInput.prototype.ngOnDestroy = function () {
        this.datepickerSubscription.unsubscribe();
        this.localeSubscription.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    };
    /** @docs-private */
    McDatepickerInput.prototype.registerOnValidatorChange = function (fn) {
        this.validatorOnChange = fn;
    };
    /** @docs-private */
    McDatepickerInput.prototype.validate = function (c) {
        return this.validator ? this.validator(c) : null;
    };
    // Implemented as part of ControlValueAccessor.
    McDatepickerInput.prototype.writeValue = function (value) {
        this.value = value;
    };
    // Implemented as part of ControlValueAccessor.
    McDatepickerInput.prototype.registerOnChange = function (fn) {
        this.cvaOnChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McDatepickerInput.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    McDatepickerInput.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    McDatepickerInput.prototype.onKeydown = function (event) {
        // tslint:disable-next-line:deprecation
        var isAltDownArrow = event.altKey && event.keyCode === keycodes.DOWN_ARROW;
        if (this.datepicker && isAltDownArrow && !this.elementRef.nativeElement.readOnly) {
            this.datepicker.open();
            event.preventDefault();
        }
    };
    McDatepickerInput.prototype.onInput = function (value) {
        var date = this.dateAdapter.parse(value, this.dateFormats.parse.dateInput);
        this.lastValueValid = !date || this.dateAdapter.isValid(date);
        date = this.getValidDateOrNull(date);
        if (!this.dateAdapter.sameDate(date, this._value)) {
            this._value = date;
            this.cvaOnChange(date);
            this.valueChange.emit(date);
            this.dateInput.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
        }
    };
    McDatepickerInput.prototype.onChange = function () {
        this.dateChange.emit(new McDatepickerInputEvent(this, this.elementRef.nativeElement));
    };
    /** Returns the palette used by the input's form field, if any. */
    McDatepickerInput.prototype.getThemePalette = function () {
        return this.formField ? this.formField.color : undefined;
    };
    /** Handles blur events on the input. */
    McDatepickerInput.prototype.onBlur = function () {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this.formatValue(this.value);
        }
        this.onTouched();
    };
    /** Formats a value and sets it on the input element. */
    McDatepickerInput.prototype.formatValue = function (value) {
        this.elementRef.nativeElement.value =
            value ? this.dateAdapter.format(value, this.dateFormats.display.dateInput) : '';
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    McDatepickerInput.prototype.getValidDateOrNull = function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
    var McDatepickerInput_1;
    __decorate([
        core.Input(),
        __metadata("design:type", McDatepicker),
        __metadata("design:paramtypes", [McDatepicker])
    ], McDatepickerInput.prototype, "mcDatepicker", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], McDatepickerInput.prototype, "mcDatepickerFilter", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDatepickerInput.prototype, "value", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDatepickerInput.prototype, "min", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDatepickerInput.prototype, "max", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDatepickerInput.prototype, "disabled", null);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McDatepickerInput.prototype, "dateChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McDatepickerInput.prototype, "dateInput", void 0);
    McDatepickerInput = McDatepickerInput_1 = __decorate([
        core.Directive({
            selector: 'input[mcDatepicker]',
            providers: [
                MC_DATEPICKER_VALUE_ACCESSOR,
                MC_DATEPICKER_VALIDATORS,
                { provide: MC_INPUT_VALUE_ACCESSOR, useExisting: McDatepickerInput_1 }
            ],
            host: {
                '[attr.aria-haspopup]': 'true',
                '[attr.aria-owns]': '(datepicker?.opened && datepicker.id) || null',
                '[attr.min]': 'min ? dateAdapter.toIso8601(min) : null',
                '[attr.max]': 'max ? dateAdapter.toIso8601(max) : null',
                '[disabled]': 'disabled',
                '(input)': 'onInput($event.target.value)',
                '(change)': 'onChange()',
                '(blur)': 'onBlur()',
                '(keydown)': 'onKeydown($event)'
            },
            exportAs: 'mcDatepickerInput'
        }),
        __param(1, core.Optional()),
        __param(2, core.Optional()), __param(2, core.Inject(datetime.MC_DATE_FORMATS)),
        __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef,
            datetime.DateAdapter, Object, McFormField])
    ], McDatepickerInput);
    return McDatepickerInput;
}());

/** Can be used to override the icon of a `mcDatepickerToggle`. */
var McDatepickerToggleIcon = /** @class */ (function () {
    function McDatepickerToggleIcon() {
    }
    McDatepickerToggleIcon = __decorate([
        core.Directive({
            selector: '[mcDatepickerToggleIcon]'
        })
    ], McDatepickerToggleIcon);
    return McDatepickerToggleIcon;
}());
var McDatepickerToggle = /** @class */ (function () {
    function McDatepickerToggle(intl, changeDetectorRef, defaultTabIndex) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.stateChanges = rxjs.Subscription.EMPTY;
        var parsedTabIndex = Number(defaultTabIndex);
        this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
    }
    Object.defineProperty(McDatepickerToggle.prototype, "disabled", {
        /** Whether the toggle button is disabled. */
        get: function () {
            return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
        },
        set: function (value) {
            this._disabled = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    McDatepickerToggle.prototype.ngOnChanges = function (changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    };
    McDatepickerToggle.prototype.ngOnDestroy = function () {
        this.stateChanges.unsubscribe();
    };
    McDatepickerToggle.prototype.ngAfterContentInit = function () {
        this.watchStateChanges();
    };
    McDatepickerToggle.prototype.open = function (event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    };
    McDatepickerToggle.prototype.watchStateChanges = function () {
        var _this = this;
        var datepickerDisabled = this.datepicker ? this.datepicker.disabledChange : rxjs.of();
        var inputDisabled = this.datepicker && this.datepicker.datepickerInput ?
            this.datepicker.datepickerInput.disabledChange : rxjs.of();
        var datepickerToggled = this.datepicker ?
            rxjs.merge(this.datepicker.openedStream, this.datepicker.closedStream) :
            rxjs.of();
        this.stateChanges.unsubscribe();
        this.stateChanges = rxjs.merge(this.intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDatepickerToggle.prototype, "disabled", null);
    __decorate([
        core.Input('for'),
        __metadata("design:type", McDatepicker)
    ], McDatepickerToggle.prototype, "datepicker", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McDatepickerToggle.prototype, "tabIndex", void 0);
    __decorate([
        core.ContentChild(McDatepickerToggleIcon),
        __metadata("design:type", McDatepickerToggleIcon)
    ], McDatepickerToggle.prototype, "customIcon", void 0);
    __decorate([
        core.ViewChild('button'),
        __metadata("design:type", McButton)
    ], McDatepickerToggle.prototype, "button", void 0);
    McDatepickerToggle = __decorate([
        core.Component({
            selector: 'mc-datepicker-toggle',
            template: "<button #button mc-icon-button type=\"button\" class=\"mc-datepicker-toggle__button\" aria-haspopup=\"true\" [attr.aria-label]=\"intl.openCalendarLabel\" [attr.tabindex]=\"disabled ? -1 : tabIndex\" [disabled]=\"disabled\" (click)=\"open($event)\"><i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i><ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content></button>",
            styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{width:30px;height:30px;margin-left:2px;border-color:transparent;border-radius:0;background:0 0}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;width:1.5em;height:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}"],
            host: {
                class: 'mc-datepicker-toggle',
                // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
                // consumer may have provided, while still being able to receive focus.
                '[attr.tabindex]': '-1',
                '[class.mc-datepicker-toggle_active]': 'datepicker && datepicker.opened',
                '[class.mc-warn]': 'datepicker && datepicker.color === "error"',
                '(focus)': 'button.focus()'
            },
            exportAs: 'mcDatepickerToggle',
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __param(2, core.Attribute('tabindex')),
        __metadata("design:paramtypes", [McDatepickerIntl,
            core.ChangeDetectorRef, String])
    ], McDatepickerToggle);
    return McDatepickerToggle;
}());

var McDatepickerModule = /** @class */ (function () {
    function McDatepickerModule() {
    }
    McDatepickerModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                McButtonModule,
                overlay.OverlayModule,
                a11y.A11yModule,
                portal.PortalModule,
                McButtonModule,
                McIconModule
            ],
            exports: [
                McCalendar,
                McCalendarBody,
                McDatepicker,
                McDatepickerContent,
                McDatepickerInput,
                McDatepickerToggle,
                McDatepickerToggleIcon,
                McMonthView,
                McYearView,
                McMultiYearView,
                McCalendarHeader
            ],
            declarations: [
                McCalendar,
                McCalendarBody,
                McDatepicker,
                McDatepickerContent,
                McDatepickerInput,
                McDatepickerToggle,
                McDatepickerToggleIcon,
                McMonthView,
                McYearView,
                McMultiYearView,
                McCalendarHeader
            ],
            providers: [
                McDatepickerIntl,
                MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
            ],
            entryComponents: [
                McDatepickerContent,
                McCalendarHeader
            ]
        })
    ], McDatepickerModule);
    return McDatepickerModule;
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
            this._vertical = coercion.coerceBooleanProperty(value);
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
            this._inset = coercion.coerceBooleanProperty(value);
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
            imports: [common.CommonModule],
            exports: [McDivider],
            declarations: [McDivider]
        })
    ], McDividerModule);
    return McDividerModule;
}());

/**
 * Dropdown content that will be rendered lazily once the dropdown is opened.
 */
var McDropdownContent = /** @class */ (function () {
    function McDropdownContent(_template, _componentFactoryResolver, _appRef, _injector, _viewContainerRef, _document) {
        this._template = _template;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._document = _document;
        /** Emits when the dropdown content has been attached. */
        this._attached = new rxjs.Subject();
    }
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    McDropdownContent.prototype.attach = function (context) {
        if (context === void 0) { context = {}; }
        if (!this._portal) {
            this._portal = new portal.TemplatePortal(this._template, this._viewContainerRef);
        }
        this.detach();
        if (!this._outlet) {
            this._outlet = new portal.DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
        }
        var element = this._template.elementRef.nativeElement;
        // Because we support opening the same dropdown from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        element.parentNode.insertBefore(this._outlet.outletElement, element);
        this._portal.attach(this._outlet, context);
        this._attached.next();
    };
    /**
     * Detaches the content.
     * @docs-private
     */
    McDropdownContent.prototype.detach = function () {
        if (this._portal.isAttached) {
            this._portal.detach();
        }
    };
    McDropdownContent.prototype.ngOnDestroy = function () {
        if (this._outlet) {
            this._outlet.dispose();
        }
    };
    McDropdownContent = __decorate([
        core.Directive({
            selector: 'ng-template[mcDropdownContent]'
        }),
        __param(5, core.Inject(common.DOCUMENT)),
        __metadata("design:paramtypes", [core.TemplateRef,
            core.ComponentFactoryResolver,
            core.ApplicationRef,
            core.Injector,
            core.ViewContainerRef, Object])
    ], McDropdownContent);
    return McDropdownContent;
}());

/**
 * Injection token used to provide the parent dropdown to dropdown-specific components.
 * @docs-private
 */
var MC_DROPDOWN_PANEL = new core.InjectionToken('MC_DROPDOWN_PANEL');

// Boilerplate for applying mixins to McDropdownItem.
/** @docs-private */
var McDropdownItemBase = /** @class */ (function () {
    function McDropdownItemBase() {
    }
    return McDropdownItemBase;
}());
var _McDropdownItemMixinBase = mixinDisabled(McDropdownItemBase);
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
var McDropdownItem = /** @class */ (function (_super) {
    __extends(McDropdownItem, _super);
    function McDropdownItem(_elementRef, document, _focusMonitor, _parentDropdownPanel) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._parentDropdownPanel = _parentDropdownPanel;
        if (_focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for dropdown items only when the focus was not caused by a
            // mouse or touch interaction.
            _focusMonitor.monitor(_this._elementRef.nativeElement, false);
        }
        if (_parentDropdownPanel && _parentDropdownPanel.addItem) {
            _parentDropdownPanel.addItem(_this);
        }
        _this._document = document;
        return _this;
    }
    /** Focuses the dropdown item. */
    McDropdownItem.prototype.focus = function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._getHostElement(), origin);
        }
        else {
            this._getHostElement().focus();
        }
    };
    McDropdownItem.prototype.ngOnDestroy = function () {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
        if (this._parentDropdownPanel && this._parentDropdownPanel.removeItem) {
            this._parentDropdownPanel.removeItem(this);
        }
    };
    /** Used to set the `tabindex`. */
    McDropdownItem.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /** Returns the host DOM element. */
    McDropdownItem.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    /** Prevents the default element actions if it is disabled. */
    McDropdownItem.prototype._checkDisabled = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    McDropdownItem.prototype.getLabel = function () {
        var element = this._elementRef.nativeElement;
        // tslint:disable-next-line:no-magic-numbers
        var textNodeType = this._document ? this._document.TEXT_NODE : 3;
        var output = '';
        if (element.childNodes) {
            var length_1 = element.childNodes.length;
            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (var i = 0; i < length_1; i++) {
                if (element.childNodes[i].nodeType === textNodeType) {
                    output += element.childNodes[i].textContent;
                }
            }
        }
        return output.trim();
    };
    McDropdownItem = __decorate([
        core.Component({
            selector: 'mc-dropdown-item, [mc-dropdown-item]',
            exportAs: 'mcDropdownItem',
            inputs: ['disabled'],
            host: {
                role: 'dropdown-item',
                class: 'mc-dropdown__item',
                '[attr.tabindex]': '_getTabIndex()',
                '[attr.disabled]': 'disabled || null',
                '(click)': '_checkDisabled($event)'
            },
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            template: "<ng-content></ng-content>"
        }),
        __param(1, core.Inject(common.DOCUMENT)),
        __param(3, core.Inject(MC_DROPDOWN_PANEL)), __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef, Object, a11y.FocusMonitor, Object])
    ], McDropdownItem);
    return McDropdownItem;
}(_McDropdownItemMixinBase));

function throwMcDropdownMissingError() {
    throw Error("mcDropdownTriggerFor: must pass in an mc-dropdown instance.\n    Example:\n      <mc-dropdown #dropdown=\"mcDropdown\"></mc-dropdown>\n      <button [mcDropdownTriggerFor]=\"dropdown\"></button>");
}
/**
 * Throws an exception for the case when dropdown's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
function throwMcDropdownInvalidPositionX() {
    throw Error("xPosition value must be either 'before' or after'.\n      Example: <mc-dropdown xPosition=\"before\" #dropdown=\"mcDropdown\"></mc-dropdown>");
}
/**
 * Throws an exception for the case when dropdown's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
function throwMcDropdownInvalidPositionY() {
    throw Error("yPosition value must be either 'above' or below'.\n      Example: <mc-dropdown yPosition=\"above\" #dropdown=\"mcDropdown\"></mc-dropdown>");
}

/**
 * Animations used by the mc-dropdown component.
 * Animation duration and timing values are based on:
 * https://material.io/guidelines/components/menus.html#menus-usage
 * @docs-private
 */
var mcDropdownAnimations = {
    /**
     * This animation controls the dropdown panel's entry and exit from the page.
     *
     * When the dropdown panel is added to the DOM, it scales in and fades in its border.
     *
     * When the dropdown panel is removed from the DOM, it simply fades out after a brief
     * delay to display the ripple.
     */
    transformDropdown: animations.trigger('transformDropdown', [
        animations.state('void', animations.style({
            opacity: 0,
            transform: 'scale(0.8)'
        })),
        animations.transition('void => enter', animations.group([
            animations.query('.mc-dropdown__content', animations.animate('50ms linear', animations.style({ opacity: 1 }))),
            animations.animate('50ms cubic-bezier(0, 0, 0.2, 1)', animations.style({ transform: 'scale(1)' }))
        ])),
        animations.transition('* => void', animations.animate('50ms 25ms linear', animations.style({ opacity: 0 })))
    ]),
    /**
     * This animation fades in the background color and content of the dropdown panel
     * after its containing element is scaled in.
     */
    fadeInItems: animations.trigger('fadeInItems', [
        // now. Remove next time we do breaking changes.
        animations.state('showing', animations.style({ opacity: 1 })),
        animations.transition('void => *', [
            animations.style({ opacity: 0 }),
            animations.animate('200ms 60ms cubic-bezier(0.55, 0, 0.55, 0.2)')
        ])
    ])
};
var fadeInItems = mcDropdownAnimations.fadeInItems;
var transformDropdown = mcDropdownAnimations.transformDropdown;

/** Injection token to be used to override the default options for `mc-dropdown`. */
var MC_DROPDOWN_DEFAULT_OPTIONS = new core.InjectionToken('mc-dropdown-default-options', {
    providedIn: 'root',
    factory: MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
function MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY() {
    return {
        overlapTrigger: false,
        xPosition: 'after',
        yPosition: 'below',
        backdropClass: 'cdk-overlay-transparent-backdrop'
    };
}
var McDropdown = /** @class */ (function () {
    function McDropdown(_elementRef, _ngZone, _defaultOptions) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._defaultOptions = _defaultOptions;
        /** Config object to be passed into the dropdown's ngClass */
        this._classList = {};
        /** Current state of the panel animation. */
        this._panelAnimationState = 'void';
        /** Emits whenever an animation on the dropdown completes. */
        this._animationDone = new rxjs.Subject();
        /** Class to be added to the backdrop element. */
        this.backdropClass = this._defaultOptions.backdropClass;
        /** Event emitted when the dropdown is closed. */
        this.closed = new core.EventEmitter();
        this._xPosition = this._defaultOptions.xPosition;
        this._yPosition = this._defaultOptions.yPosition;
        /** Dropdown items inside the current dropdown. */
        this._items = [];
        /** Emits whenever the amount of dropdown items changes. */
        this._itemChanges = new rxjs.Subject();
        /** Subscription to tab events on the dropdown panel */
        this._tabSubscription = rxjs.Subscription.EMPTY;
        this._overlapTrigger = this._defaultOptions.overlapTrigger;
        this._hasBackdrop = this._defaultOptions.hasBackdrop;
    }
    McDropdown_1 = McDropdown;
    Object.defineProperty(McDropdown.prototype, "xPosition", {
        /** Position of the dropdown in the X axis. */
        get: function () { return this._xPosition; },
        set: function (value) {
            if (value !== 'before' && value !== 'after') {
                throwMcDropdownInvalidPositionX();
            }
            this._xPosition = value;
            this.setPositionClasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "yPosition", {
        /** Position of the dropdown in the Y axis. */
        get: function () { return this._yPosition; },
        set: function (value) {
            if (value !== 'above' && value !== 'below') {
                throwMcDropdownInvalidPositionY();
            }
            this._yPosition = value;
            this.setPositionClasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "overlapTrigger", {
        /** Whether the dropdown should overlap its trigger. */
        get: function () { return this._overlapTrigger; },
        set: function (value) {
            this._overlapTrigger = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "hasBackdrop", {
        /** Whether the dropdown has a backdrop. */
        get: function () { return this._hasBackdrop; },
        set: function (value) {
            this._hasBackdrop = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdown.prototype, "panelClass", {
        /**
         * This method takes classes set on the host mc-dropdown element and applies them on the
         * dropdown template that displays in the overlay container.  Otherwise, it's difficult
         * to style the containing dropdown from outside the component.
         * @param classes list of class names
         */
        set: function (classes) {
            if (classes && classes.length) {
                this._classList = classes.split(' ').reduce(function (obj, className) {
                    obj[className] = true;
                    return obj;
                }, {});
                this._elementRef.nativeElement.className = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    McDropdown.prototype.ngOnInit = function () {
        this.setPositionClasses();
    };
    McDropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._keyManager = new a11y.FocusKeyManager(this.items).withWrap().withTypeAhead();
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () { return _this.closed.emit('tab'); });
    };
    McDropdown.prototype.ngOnDestroy = function () {
        this._tabSubscription.unsubscribe();
        this.closed.complete();
    };
    /** Handle a keyboard event from the dropdown, delegating to the appropriate action. */
    McDropdown.prototype._handleKeydown = function (event) {
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case keycodes.ESCAPE:
                this.closed.emit('keydown');
                break;
            case keycodes.UP_ARROW:
            case keycodes.DOWN_ARROW:
                this._keyManager.setFocusOrigin('keyboard');
                this._keyManager.onKeydown(event);
                break;
            default:
                // todo зачем обрабатывать лишние события ?
                this._keyManager.onKeydown(event);
        }
    };
    /**
     * Focus the first item in the dropdown.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    McDropdown.prototype.focusFirstItem = function (origin) {
        var _this = this;
        if (origin === void 0) { origin = 'program'; }
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this._ngZone.onStable.asObservable()
                .pipe(operators.take(1))
                .subscribe(function () { return _this._keyManager.setFocusOrigin(origin).setFirstItemActive(); });
        }
        else {
            this._keyManager.setFocusOrigin(origin).setFirstItemActive();
        }
    };
    /**
     * Resets the active item in the dropdown. This is used when the dropdown is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    McDropdown.prototype.resetActiveItem = function () {
        this._keyManager.setActiveItem(-1);
    };
    /**
     * Registers a dropdown item with the dropdown.
     * @docs-private
     */
    McDropdown.prototype.addItem = function (item) {
        // We register the items through this method, rather than picking them up through
        // `ContentChildren`, because we need the items to be picked up by their closest
        // `mc-dropdown` ancestor. If we used `@ContentChildren(McDropdownItem, {descendants: true})`,
        // all descendant items will bleed into the top-level dropdown in the case where the consumer
        // has `mc-dropdown` instances nested inside each other.
        if (this._items.indexOf(item) === -1) {
            this._items.push(item);
            this._itemChanges.next(this._items);
        }
    };
    /**
     * Removes an item from the dropdown.
     * @docs-private
     */
    McDropdown.prototype.removeItem = function (item) {
        var index = this._items.indexOf(item);
        if (this._items.indexOf(item) > -1) {
            this._items.splice(index, 1);
            this._itemChanges.next(this._items);
        }
    };
    /**
     * Adds classes to the dropdown panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * @param posX Position of the dropdown along the x axis.
     * @param posY Position of the dropdown along the y axis.
     * @docs-private
     */
    McDropdown.prototype.setPositionClasses = function (posX, posY) {
        if (posX === void 0) { posX = this.xPosition; }
        if (posY === void 0) { posY = this.yPosition; }
        var classes = this._classList;
        classes['mc-dropdown-before'] = posX === 'before';
        classes['mc-dropdown-after'] = posX === 'after';
        classes['mc-dropdown-above'] = posY === 'above';
        classes['mc-dropdown-below'] = posY === 'below';
    };
    /** Starts the enter animation. */
    McDropdown.prototype._startAnimation = function () {
        this._panelAnimationState = 'enter';
    };
    /** Resets the panel animation to its initial state. */
    McDropdown.prototype._resetAnimation = function () {
        this._panelAnimationState = 'void';
    };
    /** Callback that is invoked when the panel animation completes. */
    McDropdown.prototype._onAnimationDone = function (event) {
        this._animationDone.next(event);
        this._isAnimating = false;
        // Scroll the content element to the top once the animation is done. This is necessary, because
        // we move focus to the first item while it's still being animated, which can throw the browser
        // off when it determines the scroll position. Alternatively we can move focus when the
        // animation is done, however moving focus asynchronously will interrupt screen readers
        // which are in the process of reading out the dropdown already. We take the `element` from
        // the `event` since we can't use a `ViewChild` to access the pane.
        if (event.toState === 'enter' && this._keyManager.activeItemIndex === 0) {
            event.element.scrollTop = 0;
        }
    };
    var McDropdown_1;
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McDropdown.prototype, "xPosition", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McDropdown.prototype, "yPosition", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McDropdown.prototype, "overlapTrigger", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McDropdown.prototype, "hasBackdrop", null);
    __decorate([
        core.Input('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McDropdown.prototype, "panelClass", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McDropdown.prototype, "backdropClass", void 0);
    __decorate([
        core.ViewChild(core.TemplateRef),
        __metadata("design:type", core.TemplateRef)
    ], McDropdown.prototype, "templateRef", void 0);
    __decorate([
        core.ContentChildren(McDropdownItem),
        __metadata("design:type", core.QueryList)
    ], McDropdown.prototype, "items", void 0);
    __decorate([
        core.ContentChild(McDropdownContent),
        __metadata("design:type", McDropdownContent)
    ], McDropdown.prototype, "lazyContent", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McDropdown.prototype, "closed", void 0);
    McDropdown = McDropdown_1 = __decorate([
        core.Component({
            selector: 'mc-dropdown',
            template: "<ng-template><div class=\"mc-dropdown__panel\" [ngClass]=\"_classList\" (keydown)=\"_handleKeydown($event)\" (click)=\"closed.emit('click')\" [@transformDropdown]=\"_panelAnimationState\" (@transformDropdown.start)=\"_isAnimating = true\" (@transformDropdown.done)=\"_onAnimationDone($event)\" tabindex=\"-1\"><div class=\"mc-dropdown__content\"><ng-content></ng-content></div></div></ng-template>",
            styles: [".mc-dropdown__item{display:block;box-sizing:border-box;width:100%;border:1px solid transparent;outline:0;padding:5px 15px;text-align:left}.mc-dropdown__item:not([disabled]){cursor:pointer}.mc-dropdown__item .mc-dropdown__item-caption{margin-top:4px}.mc-dropdown__panel{min-width:100%;overflow:auto;margin-top:-1px;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-dropdown__content{height:100%}.mc-dropdown__content h1,.mc-dropdown__content h2,.mc-dropdown__content h3,.mc-dropdown__content h4,.mc-dropdown__content h5{padding:8px 16px 4px 16px;margin:0}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            exportAs: 'mcDropdown',
            animations: [
                mcDropdownAnimations.transformDropdown,
                mcDropdownAnimations.fadeInItems
            ],
            providers: [
                { provide: MC_DROPDOWN_PANEL, useExisting: McDropdown_1 }
            ]
        }),
        __param(2, core.Inject(MC_DROPDOWN_DEFAULT_OPTIONS)),
        __metadata("design:paramtypes", [core.ElementRef,
            core.NgZone, Object])
    ], McDropdown);
    return McDropdown;
}());

/** Injection token that determines the scroll handling while the dropdown is open. */
var MC_DROPDOWN_SCROLL_STRATEGY = new core.InjectionToken('mc-dropdown-scroll-strategy');
/** @docs-private */
function MC_DROPDOWN_SCROLL_STRATEGY_FACTORY(overlay$$1) {
    return function () { return overlay$$1.scrollStrategies.reposition(); };
}
/** @docs-private */
var MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DROPDOWN_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: MC_DROPDOWN_SCROLL_STRATEGY_FACTORY
};
/**
 * This directive is intended to be used in conjunction with an mc-dropdown tag.  It is
 * responsible for toggling the display of the provided dropdown instance.
 */
var McDropdownTrigger = /** @class */ (function () {
    function McDropdownTrigger(_overlay, _element, _viewContainerRef, _scrollStrategy, _dir, _focusMonitor) {
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this._focusMonitor = _focusMonitor;
        // Tracking input type is necessary so it's possible to only auto-focus
        // the first item of the list when the dropdown is opened via the keyboard
        this._openedBy = null;
        /** Event emitted when the associated dropdown is opened. */
        this.dropdownOpened = new core.EventEmitter();
        /** Event emitted when the associated dropdown is closed. */
        this.dropdownClosed = new core.EventEmitter();
        this._overlayRef = null;
        this._opened = false;
        this._closeSubscription = rxjs.Subscription.EMPTY;
        this._hoverSubscription = rxjs.Subscription.EMPTY;
    }
    Object.defineProperty(McDropdownTrigger.prototype, "opened", {
        /** Whether the dropdown is open. */
        get: function () {
            return this._opened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDropdownTrigger.prototype, "dir", {
        /** The text direction of the containing app. */
        get: function () {
            return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    McDropdownTrigger.prototype.ngOnInit = function () {
        this.dropdown.closed = this.dropdown.closed || new core.EventEmitter();
    };
    McDropdownTrigger.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._check();
        this.dropdown.closed.asObservable().subscribe(function () {
            _this._destroy();
        });
    };
    McDropdownTrigger.prototype.ngOnDestroy = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this._cleanUpSubscriptions();
    };
    /** Toggles the dropdown between the open and closed states. */
    McDropdownTrigger.prototype.toggle = function () {
        // tslint:disable-next-line:no-void-expression
        return this._opened ? this.close() : this.open();
    };
    /** Opens the dropdown. */
    McDropdownTrigger.prototype.open = function () {
        var _this = this;
        if (this._opened) {
            return;
        }
        this._check();
        var overlayRef = this._createOverlay();
        this._setPosition(overlayRef.getConfig().positionStrategy);
        overlayRef.attach(this._portal);
        if (this.dropdown.lazyContent) {
            this.dropdown.lazyContent.attach(this.data);
        }
        this._closeSubscription = this._closingActions().subscribe(function () { return _this.close(); });
        this._init();
        if (this.dropdown instanceof McDropdown) {
            this.dropdown._startAnimation();
        }
    };
    /** Closes the dropdown. */
    McDropdownTrigger.prototype.close = function () {
        this.dropdown.closed.emit();
    };
    /**
     * Focuses the dropdown trigger.
     * @param origin Source of the dropdown trigger's focus.
     */
    McDropdownTrigger.prototype.focus = function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._element.nativeElement, origin);
        }
        else {
            this._element.nativeElement.focus();
        }
    };
    /** Closes the dropdown and does the necessary cleanup. */
    McDropdownTrigger.prototype._destroy = function () {
        var _this = this;
        if (!this._overlayRef || !this.opened) {
            return;
        }
        var dropdown = this.dropdown;
        this._closeSubscription.unsubscribe();
        this._overlayRef.detach();
        if (dropdown instanceof McDropdown) {
            dropdown._resetAnimation();
            if (dropdown.lazyContent) {
                // Wait for the exit animation to finish before detaching the content.
                dropdown._animationDone
                    .pipe(operators.filter(function (event) { return event.toState === 'void'; }), operators.take(1), 
                // Interrupt if the content got re-attached.
                operators.takeUntil(dropdown.lazyContent._attached))
                    .subscribe(function () { return dropdown.lazyContent.detach(); }, undefined, function () {
                    // No matter whether the content got re-attached, reset the dropdown.
                    _this._reset();
                });
            }
            else {
                this._reset();
            }
        }
        else {
            this._reset();
            if (dropdown.lazyContent) {
                dropdown.lazyContent.detach();
            }
        }
    };
    /**
     * This method sets the dropdown state to open and focuses the first item if
     * the dropdown was opened via the keyboard.
     */
    McDropdownTrigger.prototype._init = function () {
        this.dropdown.direction = this.dir;
        this._setIsOpened(true);
        this.dropdown.focusFirstItem(this._openedBy || 'program');
    };
    /**
     * This method resets the dropdown when it's closed, most importantly restoring
     * focus to the dropdown trigger if the dropdown was opened via the keyboard.
     */
    McDropdownTrigger.prototype._reset = function () {
        this._setIsOpened(false);
        // We should reset focus if the user is navigating using a keyboard or
        // if we have a top-level trigger which might cause focus to be lost
        // when clicking on the backdrop.
        if (!this._openedBy) {
            // Note that the focus style will show up both for `program` and
            // `keyboard` so we don't have to specify which one it is.
            this.focus();
        }
        else {
            this.focus(this._openedBy);
        }
        this._openedBy = null;
    };
    // set state rather than toggle to support triggers sharing a dropdown
    McDropdownTrigger.prototype._setIsOpened = function (isOpen) {
        this._opened = isOpen;
        // tslint:disable-next-line:no-void-expression
        this._opened ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
    };
    /**
     * This method checks that a valid instance of Dropdown has been passed into
     * mcDropdownTriggerFor. If not, an exception is thrown.
     */
    McDropdownTrigger.prototype._check = function () {
        if (!this.dropdown) {
            throwMcDropdownMissingError();
        }
    };
    /**
     * This method creates the overlay from the provided dropdown's template and saves its
     * OverlayRef so that it can be attached to the DOM when open is called.
     */
    McDropdownTrigger.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            this._portal = new portal.TemplatePortal(this.dropdown.templateRef, this._viewContainerRef);
            var config = this._getOverlayConfig();
            this._subscribeToPositions(config.positionStrategy);
            this._overlayRef = this._overlay.create(config);
            // Consume the `keydownEvents` in order to prevent them from going to another overlay.
            // Ideally we'd also have our keyboard event logic in here, however doing so will
            // break anybody that may have implemented the `McDropdownPanel` themselves.
            this._overlayRef.keydownEvents().subscribe();
        }
        return this._overlayRef;
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    McDropdownTrigger.prototype._getOverlayConfig = function () {
        return new overlay.OverlayConfig({
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._element)
                .withLockedPosition()
                .withTransformOriginOn('.mc-dropdown__panel'),
            hasBackdrop: this.dropdown.hasBackdrop === null || this.dropdown.hasBackdrop === undefined
                ? true
                : this.dropdown.hasBackdrop,
            backdropClass: this.dropdown.backdropClass || 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this._scrollStrategy(),
            direction: this._dir
        });
    };
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the dropdown based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    McDropdownTrigger.prototype._subscribeToPositions = function (position) {
        var _this = this;
        if (this.dropdown.setPositionClasses) {
            // todo possibly we should not recompute positions there
            /*position.positionChanges.subscribe((change) => {
                const posX: DropdownPositionX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
                const posY: DropdownPositionY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';

                this.dropdown.setPositionClasses!(posX, posY);
            });*/
            position.positionChanges.subscribe(function () {
                _this.dropdown.setPositionClasses(_this.dropdown.xPosition, _this.dropdown.yPosition);
            });
        }
    };
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    McDropdownTrigger.prototype._setPosition = function (positionStrategy) {
        var _a = this.dropdown.xPosition === 'before' ? ['end', 'start'] : ['start', 'end'], originX = _a[0], originFallbackX = _a[1];
        var _b = this.dropdown.yPosition === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], overlayFallbackY = _b[1];
        var _c = [overlayY, overlayFallbackY], originY = _c[0], originFallbackY = _c[1];
        var _d = [originX, originFallbackX], overlayX = _d[0], overlayFallbackX = _d[1];
        var offsetY = 0;
        if (!this.dropdown.overlapTrigger) {
            originY = overlayY === 'top' ? 'bottom' : 'top';
            originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
        }
        positionStrategy.withPositions([
            { originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY, offsetY: offsetY },
            { originX: originFallbackX, originY: originY, overlayX: overlayFallbackX, overlayY: overlayY, offsetY: offsetY },
            {
                originX: originX,
                originY: originFallbackY,
                overlayX: overlayX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            },
            {
                originX: originFallbackX,
                originY: originFallbackY,
                overlayX: overlayFallbackX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            }
        ]);
    };
    /** Cleans up the active subscriptions. */
    McDropdownTrigger.prototype._cleanUpSubscriptions = function () {
        this._closeSubscription.unsubscribe();
        this._hoverSubscription.unsubscribe();
    };
    /** Returns a stream that emits whenever an action that should close the dropdown occurs. */
    McDropdownTrigger.prototype._closingActions = function () {
        var backdrop = this._overlayRef.backdropClick();
        var detachments = this._overlayRef.detachments();
        return rxjs.merge(backdrop, detachments);
    };
    __decorate([
        core.Input('mcDropdownTriggerFor'),
        __metadata("design:type", Object)
    ], McDropdownTrigger.prototype, "dropdown", void 0);
    __decorate([
        core.Input('mcDropdownTriggerData'),
        __metadata("design:type", Object)
    ], McDropdownTrigger.prototype, "data", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McDropdownTrigger.prototype, "dropdownOpened", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McDropdownTrigger.prototype, "dropdownClosed", void 0);
    McDropdownTrigger = __decorate([
        core.Directive({
            selector: "[mcDropdownTriggerFor]",
            host: {
                '(touchstart)': '_openedBy = "touch"',
                '(click)': 'toggle()'
            },
            exportAs: 'mcDropdownTrigger'
        }),
        __param(3, core.Inject(MC_DROPDOWN_SCROLL_STRATEGY)),
        __param(4, core.Optional()),
        __metadata("design:paramtypes", [overlay.Overlay,
            core.ElementRef,
            core.ViewContainerRef, Object, bidi.Directionality,
            a11y.FocusMonitor])
    ], McDropdownTrigger);
    return McDropdownTrigger;
}());

var McDropdownModule = /** @class */ (function () {
    function McDropdownModule() {
    }
    McDropdownModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                overlay.OverlayModule
            ],
            exports: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
            declarations: [McDropdown, McDropdownItem, McDropdownTrigger, McDropdownContent],
            providers: [MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER]
        })
    ], McDropdownModule);
    return McDropdownModule;
}());

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
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{display:flex;box-sizing:border-box;height:32px;line-height:2px;padding:15px;align-items:center}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list .mc-subheader,.mc-list .mc-list-selection .mc-subheader,.mc-list-selection .mc-list .mc-subheader,.mc-list-selection .mc-list-selection .mc-subheader{margin:0}.mc-list-item,.mc-list-option{display:block;height:32px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
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
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list .mc-subheader,.mc-list-selection .mc-subheader{display:flex;box-sizing:border-box;height:32px;line-height:2px;padding:15px;align-items:center}.mc-list .mc-subheader:first-child,.mc-list-selection .mc-subheader:first-child{margin-top:0}.mc-list .mc-list .mc-subheader,.mc-list .mc-list-selection .mc-subheader,.mc-list-selection .mc-list .mc-subheader,.mc-list-selection .mc-list-selection .mc-subheader{margin:0}.mc-list-item,.mc-list-option{display:block;height:32px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-option:not([disabled]){cursor:pointer}"],
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

var McLinkBase = /** @class */ (function () {
    function McLinkBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McLinkBase;
}());
var _McLinkBase = mixinTabIndex(mixinDisabled(McLinkBase));
var McLink = /** @class */ (function (_super) {
    __extends(McLink, _super);
    function McLink(tabIndex, elementRef, _focusMonitor, _changeDetector) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._changeDetector = _changeDetector;
        _this._disabled = false;
        _this._focusMonitor.monitor(elementRef.nativeElement, true);
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(McLink.prototype, "disabled", {
        get: function () {
            return this._disabled;
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
    McLink.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    McLink.prototype.focus = function () {
        this._getHostElement().focus();
    };
    McLink.prototype._getHostElement = function () {
        return this.elementRef.nativeElement;
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McLink.prototype, "disabled", null);
    McLink = __decorate([
        core.Component({
            selector: 'a.mc-link',
            template: "<ng-content></ng-content>",
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            exportAs: 'mcLink',
            styles: [".mc-link{display:inline-flex;align-items:center;padding:2px 0;text-decoration:none!important;cursor:pointer;outline:0;transition-property:color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link:focus{transition:none}.mc-link:hover{transition:none}.mc-link.mc-focused,.mc-link:focus{border-radius:3px}.mc-link[disabled]{pointer-events:none;cursor:default}.mc-link>.mc-link__icon{color:inherit}.mc-link>.mc-link__text:not(:first-child){margin-left:4px}.mc-link>.mc-link__text:not(:last-child){margin-right:4px}.mc-link.mc-link_dashed,.mc-link.mc-link_underlined{transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link.mc-link_dashed:focus,.mc-link.mc-link_underlined:focus{transition:none}.mc-link.mc-link_dashed:hover,.mc-link.mc-link_underlined:hover{transition:none}"],
            inputs: ['disabled'],
            host: {
                '[attr.disabled]': 'disabled || null',
                '[attr.tabindex]': 'tabIndex'
            }
        }),
        __param(0, core.Attribute('tabindex')),
        __metadata("design:paramtypes", [String, core.ElementRef,
            a11y.FocusMonitor,
            core.ChangeDetectorRef])
    ], McLink);
    return McLink;
}(_McLinkBase));

var McLinkModule = /** @class */ (function () {
    function McLinkModule() {
    }
    McLinkModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule
            ],
            declarations: [McLink],
            exports: [McLink]
        })
    ], McLinkModule);
    return McLinkModule;
}());

var McModalControlService = /** @class */ (function () {
    function McModalControlService(parentService) {
        this.parentService = parentService;
        // @ts-ignore
        this.rootOpenModals = this.parentService ? null : [];
        // @ts-ignore
        this.rootAfterAllClose = this.parentService ? null : new rxjs.Subject();
        // @ts-ignore
        this.rootRegisteredMetaMap = this.parentService ? null : new Map();
    }
    Object.defineProperty(McModalControlService.prototype, "afterAllClose", {
        // Track singleton afterAllClose through over the injection tree
        get: function () {
            return this.parentService ? this.parentService.afterAllClose : this.rootAfterAllClose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalControlService.prototype, "openModals", {
        // Track singleton openModals array through over the injection tree
        get: function () {
            return this.parentService ? this.parentService.openModals : this.rootOpenModals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalControlService.prototype, "registeredMetaMap", {
        // Registered modal for later usage
        get: function () {
            return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
        },
        enumerable: true,
        configurable: true
    });
    // Register a modal to listen its open/close
    McModalControlService.prototype.registerModal = function (modalRef) {
        var _this = this;
        if (!this.hasRegistered(modalRef)) {
            var afterOpenSubscription = modalRef.afterOpen.subscribe(function () { return _this.openModals.push(modalRef); });
            var afterCloseSubscription = modalRef.afterClose.subscribe(function () { return _this.removeOpenModal(modalRef); });
            this.registeredMetaMap.set(modalRef, { modalRef: modalRef, afterOpenSubscription: afterOpenSubscription, afterCloseSubscription: afterCloseSubscription });
        }
    };
    McModalControlService.prototype.hasRegistered = function (modalRef) {
        return this.registeredMetaMap.has(modalRef);
    };
    // Close all registered opened modals
    McModalControlService.prototype.closeAll = function () {
        var i = this.openModals.length;
        while (i--) {
            this.openModals[i].close();
        }
    };
    McModalControlService.prototype.removeOpenModal = function (modalRef) {
        var index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this.afterAllClose.next();
            }
        }
    };
    McModalControlService = __decorate([
        core.Injectable(),
        __param(0, core.Optional()), __param(0, core.SkipSelf()),
        __metadata("design:paramtypes", [McModalControlService])
    ], McModalControlService);
    return McModalControlService;
}());

/**
 * API class that public to users to handle the modal instance.
 * McModalRef is aim to avoid accessing to the modal instance directly by users.
 */
var McModalRef = /** @class */ (function () {
    function McModalRef() {
    }
    return McModalRef;
}());

var ModalUtil = /** @class */ (function () {
    function ModalUtil(document) {
        this.document = document;
        this.lastPosition = { x: -1, y: -1 };
        this.listenDocumentClick();
    }
    ModalUtil.prototype.getLastClickPosition = function () {
        return this.lastPosition;
    };
    ModalUtil.prototype.listenDocumentClick = function () {
        var _this = this;
        this.document.addEventListener('click', function (event) {
            _this.lastPosition = { x: event.clientX, y: event.clientY };
        });
    };
    return ModalUtil;
}());
var ModalUtil$1 = new ModalUtil(document);

// Duration when perform animations (ms)
var MODAL_ANIMATE_DURATION = 200;
var McModalComponent = /** @class */ (function (_super) {
    __extends(McModalComponent, _super);
    function McModalComponent(overlay$$1, renderer, cfr, elementRef, viewContainer, mcMeasureScrollbarService, modalControl, changeDetector, document) {
        var _this = _super.call(this) || this;
        _this.overlay = overlay$$1;
        _this.renderer = renderer;
        _this.cfr = cfr;
        _this.elementRef = elementRef;
        _this.viewContainer = viewContainer;
        _this.mcMeasureScrollbarService = mcMeasureScrollbarService;
        _this.modalControl = modalControl;
        _this.changeDetector = changeDetector;
        _this.document = document;
        // tslint:disable-next-line:no-any
        _this.mcModalType = 'default';
        _this._mcVisible = false;
        _this.mcVisibleChange = new core.EventEmitter();
        _this.mcZIndex = 1000;
        _this.mcWidth = 480;
        _this.mcCloseByESC = true;
        _this._mcClosable = true;
        _this._mcMask = true;
        _this._mcMaskClosable = true;
        // Trigger when modal open(visible) after animations
        _this.mcAfterOpen = new core.EventEmitter();
        // Trigger when modal leave-animation over
        _this.mcAfterClose = new core.EventEmitter();
        _this.mcOkType = 'primary';
        _this._mcOkLoading = false;
        _this.mcOnOk = new core.EventEmitter();
        _this._mcCancelLoading = false;
        _this.mcOnCancel = new core.EventEmitter();
        // The origin point that animation based on
        _this.transformOrigin = '0px 0px 0px';
        _this.mcGetContainer = function () { return _this.overlay.create(); };
        return _this;
    }
    Object.defineProperty(McModalComponent.prototype, "mcVisible", {
        get: function () { return this._mcVisible; },
        set: function (value) { this._mcVisible = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcClosable", {
        get: function () { return this._mcClosable; },
        set: function (value) { this._mcClosable = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcMask", {
        get: function () { return this._mcMask; },
        set: function (value) { this._mcMask = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcMaskClosable", {
        get: function () { return this._mcMaskClosable; },
        set: function (value) { this._mcMaskClosable = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcOkLoading", {
        get: function () { return this._mcOkLoading; },
        set: function (value) { this._mcOkLoading = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcCancelLoading", {
        get: function () { return this._mcCancelLoading; },
        set: function (value) { this._mcCancelLoading = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "afterOpen", {
        // Observable alias for mcAfterOpen
        get: function () {
            return this.mcAfterOpen.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "afterClose", {
        // Observable alias for mcAfterClose
        get: function () {
            return this.mcAfterClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "okText", {
        get: function () {
            return this.mcOkText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "cancelText", {
        get: function () {
            return this.mcCancelText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "hidden", {
        // Indicate whether this dialog should hidden
        get: function () {
            return !this.mcVisible && !this.animationState;
        },
        enumerable: true,
        configurable: true
    });
    McModalComponent.prototype.ngOnInit = function () {
        // Create component along without View
        if (this.isComponent(this.mcContent)) {
            this.createDynamicComponent(this.mcContent);
        }
        // Setup default button options
        if (this.isModalButtons(this.mcFooter)) {
            this.mcFooter = this.formatModalButtons(this.mcFooter);
        }
        // Place the modal dom to elsewhere
        this.container = typeof this.mcGetContainer === 'function' ? this.mcGetContainer() : this.mcGetContainer;
        if (this.container instanceof HTMLElement) {
            this.container.appendChild(this.elementRef.nativeElement);
        }
        else if (this.container instanceof overlay.OverlayRef) {
            // NOTE: only attach the dom to overlay, the view container is not changed actually
            this.container.overlayElement.appendChild(this.elementRef.nativeElement);
        }
        // Register modal when afterOpen/afterClose is stable
        this.modalControl.registerModal(this);
    };
    // [NOTE] NOT available when using by service!
    // Because ngOnChanges never be called when using by service,
    // here we can't support "mcContent"(Component) etc. as inputs that initialized dynamically.
    // BUT: User also can change "mcContent" dynamically to trigger UI changes
    // (provided you don't use Component that needs initializations)
    McModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.mcVisible) {
            // Do not trigger animation while initializing
            this.handleVisibleStateChange(this.mcVisible, !changes.mcVisible.firstChange);
        }
    };
    McModalComponent.prototype.ngAfterViewInit = function () {
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        if (this.autoFocusButtonOk) {
            this.autoFocusButtonOk.nativeElement.focus();
        }
    };
    McModalComponent.prototype.ngOnDestroy = function () {
        if (this.container instanceof overlay.OverlayRef) {
            this.container.dispose();
        }
    };
    McModalComponent.prototype.open = function () {
        this.changeVisibleFromInside(true);
    };
    McModalComponent.prototype.close = function (result) {
        this.changeVisibleFromInside(false, result);
    };
    // Destroy equals Close
    McModalComponent.prototype.destroy = function (result) {
        this.close(result);
    };
    McModalComponent.prototype.triggerOk = function () {
        this.onClickOkCancel('ok');
    };
    McModalComponent.prototype.triggerCancel = function () {
        this.onClickOkCancel('cancel');
    };
    McModalComponent.prototype.getInstance = function () {
        return this;
    };
    McModalComponent.prototype.getContentComponentRef = function () {
        return this.contentComponentRef;
    };
    McModalComponent.prototype.getContentComponent = function () {
        return this.contentComponentRef && this.contentComponentRef.instance;
    };
    McModalComponent.prototype.getElement = function () {
        return this.elementRef && this.elementRef.nativeElement;
    };
    McModalComponent.prototype.onClickMask = function ($event) {
        if (this.mcMask &&
            this.mcMaskClosable &&
            $event.target.classList.contains('mc-modal-wrap') &&
            this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    };
    // tslint:disable-next-line
    McModalComponent.prototype.isModalType = function (type) {
        return this.mcModalType === type;
    };
    McModalComponent.prototype.onKeyDown = function (event) {
        if (event.keyCode === keycodes.ESCAPE && this.container && (this.container instanceof overlay.OverlayRef)) {
            this.close();
            event.preventDefault();
        }
    };
    // AoT
    McModalComponent.prototype.onClickCloseBtn = function () {
        if (this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    };
    // AoT
    // tslint:disable-next-line
    McModalComponent.prototype.onClickOkCancel = function (type) {
        var _this = this;
        var trigger = { ok: this.mcOnOk, cancel: this.mcOnCancel }[type];
        var loadingKey = { ok: 'mcOkLoading', cancel: 'mcCancelLoading' }[type];
        if (trigger instanceof core.EventEmitter) {
            trigger.emit(this.getContentComponent());
        }
        else if (typeof trigger === 'function') {
            var result = trigger(this.getContentComponent());
            // Users can return "false" to prevent closing by default
            var caseClose_1 = function (doClose) { return (doClose !== false) && _this.close(doClose); };
            if (isPromise(result)) {
                this[loadingKey] = true;
                var handleThen = function (doClose) {
                    _this[loadingKey] = false;
                    caseClose_1(doClose);
                };
                result.then(handleThen).catch(handleThen);
            }
            else {
                caseClose_1(result);
            }
        }
    };
    // AoT
    McModalComponent.prototype.isNonEmptyString = function (value) {
        return typeof value === 'string' && value !== '';
    };
    // AoT
    McModalComponent.prototype.isTemplateRef = function (value) {
        return value instanceof core.TemplateRef;
    };
    // AoT
    McModalComponent.prototype.isComponent = function (value) {
        return value instanceof core.Type;
    };
    // AoT
    McModalComponent.prototype.isModalButtons = function (value) {
        return Array.isArray(value) && value.length > 0;
    };
    // Do rest things when visible state changed
    McModalComponent.prototype.handleVisibleStateChange = function (visible, animation, closeResult) {
        var _this = this;
        if (animation === void 0) { animation = true; }
        // Hide scrollbar at the first time when shown up
        if (visible) {
            this.changeBodyOverflow(1);
        }
        return Promise
            .resolve(animation && this.animateTo(visible))
            // Emit open/close event after animations over
            .then(function () {
            if (visible) {
                _this.mcAfterOpen.emit();
            }
            else {
                _this.mcAfterClose.emit(closeResult);
                // Show/hide scrollbar when animation is over
                _this.changeBodyOverflow();
            }
        });
    };
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    // tslint:disable-next-line
    McModalComponent.prototype.getButtonCallableProp = function (options, prop) {
        var value = options[prop];
        var args = [];
        if (this.contentComponentRef) {
            args.push(this.contentComponentRef.instance);
        }
        return typeof value === 'function' ? value.apply(options, args) : value;
    };
    // On mcFooter's modal button click
    // AoT
    // tslint:disable-next-line
    McModalComponent.prototype.onButtonClick = function (button) {
        // Call onClick directly
        var result = this.getButtonCallableProp(button, 'onClick');
        if (isPromise(result)) {
            button.loading = true;
            result.then(function () { return button.loading = false; }).catch(function () { return button.loading = false; });
        }
    };
    // Change mcVisible from inside
    McModalComponent.prototype.changeVisibleFromInside = function (visible, closeResult) {
        if (this.mcVisible !== visible) {
            // Change mcVisible value immediately
            this.mcVisible = visible;
            this.mcVisibleChange.emit(visible);
            return this.handleVisibleStateChange(visible, true, closeResult);
        }
        return Promise.resolve();
    };
    McModalComponent.prototype.changeAnimationState = function (state) {
        var _a, _b;
        this.animationState = state;
        if (state) {
            this.maskAnimationClassMap = (_a = {}, _a["fade-" + state] = true, _a["fade-" + state + "-active"] = true, _a);
            this.modalAnimationClassMap = (_b = {}, _b["zoom-" + state] = true, _b["zoom-" + state + "-active"] = true, _b);
        }
        else {
            // @ts-ignore
            this.maskAnimationClassMap = this.modalAnimationClassMap = null;
        }
        if (this.contentComponentRef) {
            this.contentComponentRef.changeDetectorRef.markForCheck();
        }
        else {
            this.changeDetector.markForCheck();
        }
    };
    McModalComponent.prototype.animateTo = function (isVisible) {
        var _this = this;
        // Figure out the lastest click position when shows up
        if (isVisible) {
            // [NOTE] Using timeout due to the document.click event is fired later than visible change,
            // so if not postponed to next event-loop, we can't get the lastest click position
            window.setTimeout(function () { return _this.updateTransformOrigin(); });
        }
        this.changeAnimationState(isVisible ? 'enter' : 'leave');
        // Return when animation is over
        return new Promise(function (resolve) { return window.setTimeout(function () {
            _this.changeAnimationState(null);
            resolve();
        }, MODAL_ANIMATE_DURATION); });
    };
    McModalComponent.prototype.formatModalButtons = function (buttons) {
        return buttons.map(function (button) {
            return __assign({
                type: 'default',
                size: 'default',
                autoLoading: true,
                show: true,
                loading: false,
                disabled: false
            }, button);
        });
    };
    /**
     * Create a component dynamically but not attach to any View
     * (this action will be executed when bodyContainer is ready)
     * @param component Component class
     */
    McModalComponent.prototype.createDynamicComponent = function (component) {
        var factory = this.cfr.resolveComponentFactory(component);
        var childInjector = core.Injector.create({
            providers: [{ provide: McModalRef, useValue: this }],
            parent: this.viewContainer.parentInjector
        });
        this.contentComponentRef = factory.create(childInjector);
        if (this.mcComponentParams) {
            Object.assign(this.contentComponentRef.instance, this.mcComponentParams);
        }
        // Do the first change detection immediately
        // (or we do detection at ngAfterViewInit, multi-changes error will be thrown)
        this.contentComponentRef.changeDetectorRef.detectChanges();
    };
    // Update transform-origin to the last click position on document
    McModalComponent.prototype.updateTransformOrigin = function () {
        var modalElement = this.modalContainer.nativeElement;
        var lastPosition = ModalUtil$1.getLastClickPosition();
        if (lastPosition) {
            // tslint:disable-next-line
            this.transformOrigin = lastPosition.x - modalElement.offsetLeft + "px " + (lastPosition.y - modalElement.offsetTop) + "px 0px";
        }
    };
    /**
     * Take care of the body's overflow to decide the existense of scrollbar
     * @param plusNum The number that the openModals.length will increase soon
     */
    McModalComponent.prototype.changeBodyOverflow = function (plusNum) {
        if (plusNum === void 0) { plusNum = 0; }
        var openModals = this.modalControl.openModals;
        if (openModals.length + plusNum > 0) {
            // tslint:disable-next-line
            this.renderer.setStyle(this.document.body, 'padding-right', this.mcMeasureScrollbarService.scrollBarWidth + "px");
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        }
        else {
            this.renderer.removeStyle(this.document.body, 'padding-right');
            this.renderer.removeStyle(this.document.body, 'overflow');
        }
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcModalType", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcContent", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcComponentParams", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcFooter", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcVisible", null);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcVisibleChange", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McModalComponent.prototype, "mcZIndex", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcWidth", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcWrapClassName", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcClassName", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcStyle", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcTitle", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McModalComponent.prototype, "mcCloseByESC", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcClosable", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcMask", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcMaskClosable", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcMaskStyle", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcBodyStyle", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcAfterOpen", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcAfterClose", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcOkText", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcOkType", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcOkLoading", null);
    __decorate([
        core.Input(), core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcOnOk", void 0);
    __decorate([
        core.ViewChild('autoFocusButtonOk', { read: core.ElementRef }),
        __metadata("design:type", core.ElementRef)
    ], McModalComponent.prototype, "autoFocusButtonOk", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcCancelText", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcCancelLoading", null);
    __decorate([
        core.Input(), core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcOnCancel", void 0);
    __decorate([
        core.ViewChild('modalContainer'),
        __metadata("design:type", core.ElementRef)
    ], McModalComponent.prototype, "modalContainer", void 0);
    __decorate([
        core.ViewChild('bodyContainer', { read: core.ViewContainerRef }),
        __metadata("design:type", core.ViewContainerRef)
    ], McModalComponent.prototype, "bodyContainer", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcGetContainer", void 0);
    McModalComponent = __decorate([
        core.Component({
            selector: 'mc-modal',
            template: "<ng-template #tplOriginContent><ng-content></ng-content></ng-template><div><div *ngIf=\"mcMask\" class=\"mc-modal-mask\" [ngClass]=\"maskAnimationClassMap\" [class.mc-modal-mask-hidden]=\"hidden\" [ngStyle]=\"mcMaskStyle\" [style.zIndex]=\"mcZIndex\"></div><div (click)=\"onClickMask($event)\" class=\"mc-modal-wrap {{ mcWrapClassName }}\" [style.zIndex]=\"mcZIndex\" [style.display]=\"hidden ? 'none' : ''\" tabindex=\"-1\" role=\"dialog\"><div #modalContainer class=\"mc-modal {{ mcClassName }}\" [ngClass]=\"modalAnimationClassMap\" [ngStyle]=\"mcStyle\" [style.width]=\"mcWidth | toCssUnit\" [style.transform-origin]=\"transformOrigin\" role=\"document\"><div class=\"mc-modal-content\"><button *ngIf=\"mcClosable\" (click)=\"onClickCloseBtn()\" class=\"mc-modal-close\" aria-label=\"Close\"><span class=\"mc-modal-close-x\"><i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i></span></button><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isModalType('default')\" [ngTemplateOutlet]=\"tplContentDefault\"></ng-container><ng-container *ngSwitchCase=\"isModalType('confirm')\" [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container></ng-container></div></div></div></div><ng-template #tplContentDefault><div *ngIf=\"mcTitle\" class=\"mc-modal-header\"><div class=\"mc-modal-title\"><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"mcTitle\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\"><div [innerHTML]=\"mcTitle\"></div></ng-container></ng-container></div></div><div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\"><ng-container #bodyContainer><ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\"><div [innerHTML]=\"mcContent\"></div></ng-container><ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container></ng-container></ng-container></div><div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\"><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\"><div [innerHTML]=\"mcFooter\"></div></ng-container><ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\"><button *ngFor=\"let button of mcFooter\" mc-button [hidden]=\"!getButtonCallableProp(button, 'show')\" [disabled]=\"getButtonCallableProp(button, 'disabled')\" [color]=\"button.type\">{{ button.label }}</button></ng-container><ng-container *ngSwitchDefault><button *ngIf=\"mcOkText!==null\" mc-button color=\"primary\" (click)=\"onClickOkCancel('ok')\">{{ okText }}</button> <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">{{ cancelText }}</button></ng-container></ng-container></div></ng-template><ng-template #tplContentConfirm><div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\"><div class=\"mc-confirm-body-wrapper\"><div class=\"mc-confirm-body\"><div class=\"mc-confirm-content\"><ng-container #bodyContainer><ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\"><div [innerHTML]=\"mcContent\"></div></ng-container><ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container></ng-container></ng-container></div></div></div></div><div class=\"mc-confirm-btns\"><button mc-button [color]=\"mcOkType\" #autoFocusButtonOk *ngIf=\"mcOkText !== ''\" (click)=\"onClickOkCancel('ok')\">{{ okText }}</button> <button mc-button color=\"second\" *ngIf=\"mcCancelText!==''\" (click)=\"onClickOkCancel('cancel')\">{{ cancelText }}</button></div></ng-template>",
            styles: ["@keyframes mcFadeIn{0%{opacity:0}100%{opacity:1}}@keyframes mcFadeOut{0%{opacity:1}100%{opacity:0}}@keyframes mcZoomIn{0%{opacity:0;transform:translate(0,-25%)}100%{opacity:1;transform:scale(1)}}@keyframes mcZoomOut{0%{transform:scale(1)}100%{opacity:0;transform:translate(0,-30%)}}.fade-appear,.fade-enter{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-leave{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-appear.fade-appear-active,.fade-enter.fade-enter-active{animation-name:mcFadeIn;animation-play-state:running}.fade-leave.fade-leave-active{animation-name:mcFadeOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{opacity:0;animation-timing-function:ease-out}.className-leave{animation-timing-function:ease-out}.zoom-appear,.zoom-enter{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-leave{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-appear.zoom-appear-active,.zoom-enter.zoom-enter-active{animation-name:mcZoomIn;animation-play-state:running}.zoom-leave.zoom-leave-active{animation-name:mcZoomOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{transform:translate(0,-25%);animation-timing-function:cubic-bezier(.075,.82,.165,1)}.className-leave{transform:translate(0,0);animation-timing-function:cubic-bezier(.785,.135,.15,.86)}.mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-close{display:none}.mc-confirm .mc-modal-body{padding:24px}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:after,.mc-confirm-body-wrapper:before{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px 16px 16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;width:auto;margin:0 auto;padding:0 0 24px 0;list-style:none}.mc-modal.zoom-appear,.mc-modal.zoom-enter{animation-duration:.3s;transform:none;opacity:0}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;background-clip:padding-box;background-color:#fff}.mc-modal-close{position:absolute;z-index:10;top:0;right:0;padding:0;border:0;outline:0;cursor:pointer;background:0 0}.mc-modal-close .mc-modal-close-x{display:block;vertical-align:baseline;text-align:center;width:56px;height:56px;line-height:56px}.mc-modal-header{padding:14px 16px;border-radius:4px 4px 0 0}.mc-modal-body{padding:16px 24px 24px 24px;max-height:calc(100vh - 260px);word-wrap:break-word;overflow-y:auto}.mc-modal-footer{padding:16px 16px;border-radius:0 0 4px 4px;text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%;background-color:rgba(0,0,0,.5)}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            host: {
                '(keydown)': 'onKeyDown($event)'
            }
        }),
        __param(8, core.Inject(common.DOCUMENT)),
        __metadata("design:paramtypes", [overlay.Overlay,
            core.Renderer2,
            core.ComponentFactoryResolver,
            core.ElementRef,
            core.ViewContainerRef,
            McMeasureScrollbarService,
            McModalControlService,
            core.ChangeDetectorRef, Object])
    ], McModalComponent);
    return McModalComponent;
}(McModalRef));
////////////
function isPromise(obj) {
    // tslint:disable-next-line
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

var CssUnitPipe = /** @class */ (function () {
    function CssUnitPipe() {
    }
    CssUnitPipe.prototype.transform = function (value, defaultUnit) {
        if (defaultUnit === void 0) { defaultUnit = 'px'; }
        var formatted = +value;
        return isNaN(formatted) ? "" + value : "" + formatted + defaultUnit;
    };
    CssUnitPipe = __decorate([
        core.Pipe({
            name: 'toCssUnit'
        })
    ], CssUnitPipe);
    return CssUnitPipe;
}());

// A builder used for managing service creating modals
var ModalBuilderForService = /** @class */ (function () {
    function ModalBuilderForService(overlay$$1, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.overlay = overlay$$1;
        this.createModal();
        if (!('mcGetContainer' in options)) {
            options.mcGetContainer = null;
        }
        this.changeProps(options);
        this.modalRef.instance.open();
        this.modalRef.instance.mcAfterClose.subscribe(function () { return _this.destroyModal(); });
        this.overlayRef.keydownEvents()
            // @ts-ignore
            .pipe(operators.filter(function (event) {
            return event.keyCode === keycodes.ESCAPE && options.mcCloseByESC;
        }))
            .subscribe(function () { return _this.modalRef.instance.close(); });
    }
    ModalBuilderForService.prototype.getInstance = function () {
        return this.modalRef && this.modalRef.instance;
    };
    ModalBuilderForService.prototype.destroyModal = function () {
        if (this.modalRef) {
            this.overlayRef.dispose();
            // @ts-ignore
            this.modalRef = null;
        }
    };
    ModalBuilderForService.prototype.changeProps = function (options) {
        if (this.modalRef) {
            // here not limit user's inputs at runtime
            Object.assign(this.modalRef.instance, options);
        }
    };
    // Create component to ApplicationRef
    ModalBuilderForService.prototype.createModal = function () {
        this.overlayRef = this.overlay.create();
        this.modalRef = this.overlayRef.attach(new portal.ComponentPortal(McModalComponent));
    };
    return ModalBuilderForService;
}());
var McModalService = /** @class */ (function () {
    function McModalService(overlay$$1, modalControl) {
        this.overlay = overlay$$1;
        this.modalControl = modalControl;
    }
    Object.defineProperty(McModalService.prototype, "openModals", {
        // Track of the current close modals (we assume invisible is close this time)
        get: function () {
            return this.modalControl.openModals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalService.prototype, "afterAllClose", {
        get: function () {
            return this.modalControl.afterAllClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // Closes all of the currently-open dialogs
    McModalService.prototype.closeAll = function () {
        this.modalControl.closeAll();
    };
    McModalService.prototype.create = function (options) {
        if (options === void 0) { options = {}; }
        if (typeof options.mcOnCancel !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnCancel = function () { };
        }
        if (!('mcCloseByESC' in options)) {
            options.mcCloseByESC = true;
        }
        if (!('mcWidth' in options)) {
            // tslint:disable-next-line
            options.mcWidth = 480;
        }
        return new ModalBuilderForService(this.overlay, options).getInstance();
    };
    McModalService.prototype.confirm = function (options, confirmType) {
        if (options === void 0) { options = {}; }
        if (confirmType === void 0) { confirmType = 'confirm'; }
        if ('mcFooter' in options) {
            console.warn("The Confirm-Modal doesn't support \"mcFooter\", this property will be ignored.");
        }
        // NOTE: only support function currently by calling confirm()
        if (typeof options.mcOnOk !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnOk = function () { };
        }
        options.mcModalType = 'confirm';
        options.mcClassName = "mc-confirm mc-confirm-" + confirmType + " " + (options.mcClassName || '');
        options.mcMaskClosable = false;
        return this.create(options);
    };
    McModalService.prototype.success = function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'success');
    };
    McModalService.prototype.delete = function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'warn');
    };
    McModalService.prototype.simpleConfirm = function (options, confirmType) {
        if (options === void 0) { options = {}; }
        // Remove the Cancel button if the user not specify a Cancel button
        if (!('mcCancelText' in options)) {
            // @ts-ignore
            options.mcCancelText = null;
        }
        return this.confirm(options, confirmType);
    };
    McModalService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [overlay.Overlay,
            McModalControlService])
    ], McModalService);
    return McModalService;
}());

var McModalModule = /** @class */ (function () {
    function McModalModule() {
    }
    McModalModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, overlay.OverlayModule, McButtonModule, McIconModule],
            exports: [McModalComponent],
            declarations: [McModalComponent, CssUnitPipe],
            entryComponents: [McModalComponent],
            providers: [McModalControlService, McModalService]
        })
    ], McModalModule);
    return McModalModule;
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
            template: "\n        <a\n            [attr.tabindex]=\"disabled ? -1 : tabIndex\"\n            (click)=\"handleClickByItem()\"\n            (keydown)=\"handleKeydown($event)\"\n            class=\"mc-navbar-item\"\n        >\n            <ng-content></ng-content>\n            <i *ngIf=\"hasDropdownContent\" mc-icon=\"mc-angle-down-M_16\"></i>\n        </a>\n        <ul\n            #dropdownContent\n            *ngIf=\"hasDropdownContent\"\n            [ngClass]=\"{ 'is-collapsed': isCollapsed }\"\n            class=\"mc-navbar-dropdown\"\n        >\n            <li\n                *ngFor=\"let item of dropdownItems\"\n                (click)=\"handleClickByDropdownItem()\"\n                class=\"mc-navbar-dropdown-item\"\n            >\n                <ng-container *ngIf=\"dropdownItemTmpl\">\n                    <ng-container *ngTemplateOutlet=\"dropdownItemTmpl; context: { $implicit: item }\"></ng-container>\n                </ng-container>\n                <a\n                    *ngIf=\"!dropdownItemTmpl\"\n                    [attr.href]=\"item.link\"\n                    [ngClass]=\"{ 'is-active': isActiveDropdownLink(item.link) }\"\n                    class=\"mc-navbar-dropdown-link\"\n                >{{ item.text }}</a>\n            </li>\n        </ul>\n    ",
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
var _McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase);
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
}(_McProgressSpinnerMixinBase));

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
            template: "<label class=\"mc-radio-label\" [attr.for]=\"inputId\" #label><input type=\"radio\" class=\"mc-radio-input cdk-visually-hidden\" #input [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [tabIndex]=\"tabIndex\" [attr.name]=\"name\" [required]=\"required\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-describedby]=\"ariaDescribedby\" (change)=\"onInputChange($event)\" (click)=\"onInputClick($event)\"><div class=\"mc-radio-label-content\" [class.mc-radio-label-before]=\"labelPosition == 'before'\"><div class=\"mc-radio-button__outer-circle\"></div><div class=\"mc-radio-button__inner-circle\"></div><ng-content></ng-content></div></label>",
            styles: [".mc-radio-button{display:inline-block}.mc-radio-label{display:inline-flex;align-items:center;vertical-align:middle;cursor:pointer;white-space:nowrap}.mc-radio-label-content{display:inline-block;position:relative;order:0;line-height:inherit;padding-left:26px;padding-right:0}.mc-radio-label-content .mc-radio-button__inner-circle,.mc-radio-label-content .mc-radio-button__outer-circle{box-sizing:content-box;position:absolute;content:'';border-style:solid;border-radius:50%}.mc-radio-label-content .mc-radio-button__outer-circle{left:0;top:calc(50% - 8px);width:14px;height:14px;border-width:1px}.mc-radio-label-content .mc-radio-button__inner-circle{display:none;left:1px;top:calc(50% - 7px);width:6px;height:6px;border-width:4px;border-color:transparent}[dir=rtl] .mc-radio-label-content{padding-right:26px;padding-left:0}.mc-radio-input{position:absolute;outline:0;opacity:0}"],
            inputs: ['color', 'tabIndex'],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            exportAs: 'mcRadioButton',
            host: {
                class: 'mc-radio-button',
                '[attr.id]': 'id',
                '[class.mc-checked]': 'checked',
                '[class.mc-disabled]': 'disabled',
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
            exports: [McRadioGroup, McRadioButton],
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
            styles: [".mc-tree-selection{display:block}.mc-tree-node{display:flex;align-items:center;height:28px;word-wrap:break-word;border:2px solid transparent}.mc-tree-node>.mc-icon{margin-right:4px;cursor:pointer}.mc-tree-node:focus{outline:0}.mc-tree-node:not([disabled]){cursor:pointer}.mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}"],
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

/** Decorates the `ng-template` tags and reads out the template from it. */
var McTabContent = /** @class */ (function () {
    function McTabContent(template) {
        this.template = template;
    }
    McTabContent = __decorate([
        core.Directive({ selector: '[mcTabContent]' }),
        __metadata("design:paramtypes", [core.TemplateRef])
    ], McTabContent);
    return McTabContent;
}());

/** Used to flag tab labels for use with the portal directive */
var McTabLabel = /** @class */ (function (_super) {
    __extends(McTabLabel, _super);
    function McTabLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTabLabel = __decorate([
        core.Directive({
            selector: '[mc-tab-label], [mcTabLabel]'
        })
    ], McTabLabel);
    return McTabLabel;
}(portal.CdkPortal));
// TODO: workaround for https://github.com/angular/material2/issues/12760
McTabLabel.ctorParameters = function () { return portal.CdkPortal.ctorParameters; };

var McTabBase = /** @class */ (function () {
    function McTabBase() {
    }
    return McTabBase;
}());
var mcTabMixinBase = mixinDisabled(McTabBase);
var McTab = /** @class */ (function (_super) {
    __extends(McTab, _super);
    function McTab(viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.viewContainerRef = viewContainerRef;
        /** Plain text label for the tab, used when there is no template label. */
        _this.textLabel = '';
        /** Emits whenever the internal state of the tab changes. */
        _this.stateChanges = new rxjs.Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        _this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        _this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        _this.isActive = false;
        /** Portal that will be the hosted content of the tab */
        _this.contentPortal = null;
        return _this;
    }
    Object.defineProperty(McTab.prototype, "content", {
        /** @docs-private */
        get: function () {
            return this.contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    McTab.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('textLabel') ||
            changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    };
    McTab.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    McTab.prototype.ngOnInit = function () {
        this.contentPortal = new portal.TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    };
    __decorate([
        core.ContentChild(McTabLabel),
        __metadata("design:type", McTabLabel)
    ], McTab.prototype, "templateLabel", void 0);
    __decorate([
        core.ContentChild(McTabContent, { read: core.TemplateRef }),
        __metadata("design:type", core.TemplateRef)
    ], McTab.prototype, "explicitContent", void 0);
    __decorate([
        core.ViewChild(core.TemplateRef),
        __metadata("design:type", core.TemplateRef)
    ], McTab.prototype, "implicitContent", void 0);
    __decorate([
        core.Input('label'),
        __metadata("design:type", String)
    ], McTab.prototype, "textLabel", void 0);
    __decorate([
        core.Input('aria-label'),
        __metadata("design:type", String)
    ], McTab.prototype, "ariaLabel", void 0);
    __decorate([
        core.Input('aria-labelledby'),
        __metadata("design:type", String)
    ], McTab.prototype, "ariaLabelledby", void 0);
    McTab = __decorate([
        core.Component({
            selector: 'mc-tab',
            // Create a template for the content of the <mc-tab> so that we can grab a reference to this
            // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
            // tab-group.
            template: '<ng-template><ng-content></ng-content></ng-template>',
            inputs: ['disabled'],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            exportAs: 'mcTab'
        }),
        __metadata("design:paramtypes", [core.ViewContainerRef])
    ], McTab);
    return McTab;
}(mcTabMixinBase));

var mcTabsAnimations = {
    /** Animation translates a tab along the X axis. */
    translateTab: animations.trigger('translateTab', [
        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
        animations.state('center, void, left-origin-center, right-origin-center', animations.style({ transform: 'none' })),
        // If the tab is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        animations.state('left', animations.style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
        animations.state('right', animations.style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
        animations.transition('* => left, * => right, left => center, right => center', animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
        animations.transition('void => left-origin-center', [
            animations.style({ transform: 'translate3d(-100%, 0, 0)' }),
            animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ]),
        animations.transition('void => right-origin-center', [
            animations.style({ transform: 'translate3d(100%, 0, 0)' }),
            animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ])
    ])
};

/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
var McTabBody = /** @class */ (function () {
    function McTabBody(elementRef, dir, changeDetectorRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.dir = dir;
        /** Event emitted when the tab begins to animate towards the center as the active tab. */
        this.onCentering = new core.EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this.beforeCentering = new core.EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this.afterLeavingCenter = new core.EventEmitter();
        /** Event emitted when the tab completes its animation towards the center. */
        this.onCentered = new core.EventEmitter(true);
        // Note that the default value will always be overwritten by `McTabBody`, but we need one
        // anyway to prevent the animations module from throwing an error if the body is used on its own.
        /** Duration for the tab's animation. */
        this.animationDuration = '0ms';
        /** Subscription to the directionality change observable. */
        this.dirChangeSubscription = rxjs.Subscription.EMPTY;
        if (this.dir && changeDetectorRef) {
            this.dirChangeSubscription = this.dir.change.subscribe(function (direction) {
                _this.computePositionAnimationState(direction);
                changeDetectorRef.markForCheck();
            });
        }
    }
    Object.defineProperty(McTabBody.prototype, "position", {
        /** The shifted index position of the tab body, where zero represents the active center tab. */
        set: function (position) {
            this.positionIndex = position;
            this.computePositionAnimationState();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    McTabBody.prototype.ngOnInit = function () {
        if (this.bodyPosition === 'center' && this.origin != null) {
            this.bodyPosition = this.computePositionFromOrigin();
        }
    };
    McTabBody.prototype.ngOnDestroy = function () {
        this.dirChangeSubscription.unsubscribe();
    };
    McTabBody.prototype.onTranslateTabStarted = function (e) {
        var isCentering = this.isCenterPosition(e.toState);
        this.beforeCentering.emit(isCentering);
        if (isCentering) {
            this.onCentering.emit(this.elementRef.nativeElement.clientHeight);
        }
    };
    McTabBody.prototype.onTranslateTabComplete = function (e) {
        // If the transition to the center is complete, emit an event.
        if (this.isCenterPosition(e.toState) && this.isCenterPosition(this.bodyPosition)) {
            this.onCentered.emit();
        }
        if (this.isCenterPosition(e.fromState) && !this.isCenterPosition(this.bodyPosition)) {
            this.afterLeavingCenter.emit();
        }
    };
    /** The text direction of the containing app. */
    McTabBody.prototype.getLayoutDirection = function () {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Whether the provided position state is considered center, regardless of origin. */
    McTabBody.prototype.isCenterPosition = function (position) {
        return position === 'center' ||
            position === 'left-origin-center' ||
            position === 'right-origin-center';
    };
    /** Computes the position state that will be used for the tab-body animation trigger. */
    McTabBody.prototype.computePositionAnimationState = function (dir) {
        if (dir === void 0) { dir = this.getLayoutDirection(); }
        if (this.positionIndex < 0) {
            this.bodyPosition = dir === 'ltr' ? 'left' : 'right';
        }
        else if (this.positionIndex > 0) {
            this.bodyPosition = dir === 'ltr' ? 'right' : 'left';
        }
        else {
            this.bodyPosition = 'center';
        }
    };
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     */
    McTabBody.prototype.computePositionFromOrigin = function () {
        var dir = this.getLayoutDirection();
        if ((dir === 'ltr' && this.origin <= 0) || (dir === 'rtl' && this.origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McTabBody.prototype, "position", null);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabBody.prototype, "onCentering", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabBody.prototype, "beforeCentering", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabBody.prototype, "afterLeavingCenter", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabBody.prototype, "onCentered", void 0);
    __decorate([
        core.ViewChild(portal.PortalHostDirective),
        __metadata("design:type", portal.PortalHostDirective)
    ], McTabBody.prototype, "portalHost", void 0);
    __decorate([
        core.Input('content'),
        __metadata("design:type", portal.TemplatePortal)
    ], McTabBody.prototype, "content", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McTabBody.prototype, "origin", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTabBody.prototype, "animationDuration", void 0);
    McTabBody = __decorate([
        core.Component({
            selector: 'mc-tab-body',
            template: "<div class=\"mc-tab-body__content\" #content [@translateTab]=\"{ value: bodyPosition, params: {animationDuration: animationDuration} }\" (@translateTab.start)=\"onTranslateTabStarted($event)\" (@translateTab.done)=\"onTranslateTabComplete($event)\"><ng-template mcTabBodyHost></ng-template></div>",
            styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            animations: [mcTabsAnimations.translateTab],
            host: {
                class: 'mc-tab-body'
            }
        }),
        __param(1, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef,
            bidi.Directionality,
            core.ChangeDetectorRef])
    ], McTabBody);
    return McTabBody;
}());
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
var McTabBodyPortal = /** @class */ (function (_super) {
    __extends(McTabBodyPortal, _super);
    function McTabBodyPortal(componentFactoryResolver, viewContainerRef, host) {
        var _this = _super.call(this, componentFactoryResolver, viewContainerRef) || this;
        _this.host = host;
        /** Subscription to events for when the tab body begins centering. */
        _this.centeringSub = rxjs.Subscription.EMPTY;
        /** Subscription to events for when the tab body finishes leaving from center position. */
        _this.leavingSub = rxjs.Subscription.EMPTY;
        return _this;
    }
    /** Set initial visibility or set up subscription for changing visibility. */
    McTabBodyPortal.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.centeringSub = this.host.beforeCentering
            .pipe(operators.startWith(this.host.isCenterPosition(this.host.bodyPosition)))
            .subscribe(function (isCentering) {
            if (isCentering && !_this.hasAttached()) {
                _this.attach(_this.host.content);
            }
        });
        this.leavingSub = this.host.afterLeavingCenter.subscribe(function () {
            _this.detach();
        });
    };
    /** Clean up centering subscription. */
    McTabBodyPortal.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.centeringSub.unsubscribe();
        this.leavingSub.unsubscribe();
    };
    McTabBodyPortal = __decorate([
        core.Directive({
            selector: '[mcTabBodyHost]'
        }),
        __param(2, core.Inject(core.forwardRef(function () { return McTabBody; }))),
        __metadata("design:paramtypes", [core.ComponentFactoryResolver,
            core.ViewContainerRef,
            McTabBody])
    ], McTabBodyPortal);
    return McTabBodyPortal;
}(portal.CdkPortalOutlet));

// Boilerplate for applying mixins to McTabLabelWrapper.
/** @docs-private */
var McTabLabelWrapperBase = /** @class */ (function () {
    function McTabLabelWrapperBase() {
    }
    return McTabLabelWrapperBase;
}());
var mcTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * @docs-private
 */
var McTabLabelWrapper = /** @class */ (function (_super) {
    __extends(McTabLabelWrapper, _super);
    function McTabLabelWrapper(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** Sets focus on the wrapper element */
    McTabLabelWrapper.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    McTabLabelWrapper.prototype.getOffsetLeft = function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    McTabLabelWrapper.prototype.getOffsetWidth = function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    McTabLabelWrapper = __decorate([
        core.Directive({
            selector: '[mcTabLabelWrapper]',
            inputs: ['disabled'],
            host: {
                '[class.mc-disabled]': 'disabled',
                '[attr.aria-disabled]': '!!disabled'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McTabLabelWrapper);
    return McTabLabelWrapper;
}(mcTabLabelWrapperMixinBase));

var VIEWPORT_THROTTLE_TIME = 150;
var SCROLL_DISTANCE_DELIMITER = 3;
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
var EXAGGERATED_OVERSCROLL = 60;
// Boilerplate for applying mixins to McTabHeader.
/** @docs-private */
var McTabHeaderBase = /** @class */ (function () {
    function McTabHeaderBase() {
    }
    return McTabHeaderBase;
}());
/**
 * The header of the tab group which displays a list of all the tabs in the tab group.
 * When the tabs list's width exceeds the width of the header container,
 * then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
var McTabHeader = /** @class */ (function (_super) {
    __extends(McTabHeader, _super);
    function McTabHeader(elementRef, changeDetectorRef, viewportRuler, dir, ngZone) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.viewportRuler = viewportRuler;
        _this.dir = dir;
        _this.ngZone = ngZone;
        /** Whether the controls for pagination should be displayed */
        _this.showPaginationControls = false;
        /** Whether the tab list can be scrolled more towards the end of the tab label list. */
        _this.disableScrollAfter = true;
        /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
        _this.disableScrollBefore = true;
        /** Event emitted when the option is selected. */
        _this.selectFocusedIndex = new core.EventEmitter();
        /** Event emitted when a label is focused. */
        _this.indexFocused = new core.EventEmitter();
        /** The distance in pixels that the tab labels should be translated to the left. */
        _this._scrollDistance = 0;
        /** Whether the header should scroll to the selected index after the view has been checked. */
        _this.selectedIndexChanged = false;
        /** Emits when the component is destroyed. */
        _this.destroyed = new rxjs.Subject();
        _this._selectedIndex = 0;
        return _this;
    }
    Object.defineProperty(McTabHeader.prototype, "selectedIndex", {
        /** The index of the active tab. */
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            var coercedValue = coercion.coerceNumberProperty(value);
            this.selectedIndexChanged = this._selectedIndex !== coercedValue;
            this._selectedIndex = coercedValue;
            if (this.keyManager) {
                this.keyManager.updateActiveItem(coercedValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabHeader.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: function () {
            return this.keyManager ? this.keyManager.activeItemIndex : 0;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: function (value) {
            if (!this.isValidIndex(value) ||
                this.focusIndex === value ||
                !this.keyManager) {
                return;
            }
            this.keyManager.setActiveItem(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabHeader.prototype, "scrollDistance", {
        /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        get: function () {
            return this._scrollDistance;
        },
        set: function (v) {
            this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this.scrollDistanceChanged = true;
            this.checkScrollingControls();
        },
        enumerable: true,
        configurable: true
    });
    McTabHeader.prototype.ngAfterContentChecked = function () {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this.tabLabelCount !== this.labelWrappers.length) {
            this.updatePagination();
            this.tabLabelCount = this.labelWrappers.length;
            this.changeDetectorRef.markForCheck();
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this.selectedIndexChanged) {
            this.scrollToLabel(this._selectedIndex);
            this.checkScrollingControls();
            this.selectedIndexChanged = false;
            this.changeDetectorRef.markForCheck();
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this.scrollDistanceChanged) {
            this.updateTabScrollPosition();
            this.scrollDistanceChanged = false;
            this.changeDetectorRef.markForCheck();
        }
    };
    McTabHeader.prototype.handleKeydown = function (event) {
        switch (event.keyCode) {
            case keycodes.HOME:
                this.keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case keycodes.END:
                this.keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case keycodes.ENTER:
            case keycodes.SPACE:
                this.selectFocusedIndex.emit(this.focusIndex);
                event.preventDefault();
                break;
            default:
                this.keyManager.onKeydown(event);
        }
    };
    McTabHeader.prototype.ngAfterContentInit = function () {
        var _this = this;
        var dirChange = this.dir ? this.dir.change : rxjs.of(null);
        var resize = this.viewportRuler.change(VIEWPORT_THROTTLE_TIME);
        var realign = function () {
            _this.updatePagination();
        };
        this.keyManager = new a11y.FocusKeyManager(this.labelWrappers)
            .withHorizontalOrientation(this.getLayoutDirection())
            .withWrap();
        this.keyManager.updateActiveItem(0);
        // Defer the first call in order to allow for slower browsers to lay out the elements.
        // This helps in cases where the user lands directly on a page with paginated tabs.
        typeof requestAnimationFrame === undefined
            ? realign()
            : requestAnimationFrame(realign);
        // On dir change or window resize, update the orientation of
        // the key manager if the direction has changed.
        rxjs.merge(dirChange, resize)
            .pipe(operators.takeUntil(this.destroyed))
            .subscribe(function () {
            realign();
            _this.keyManager.withHorizontalOrientation(_this.getLayoutDirection());
        });
        // If there is a change in the focus key manager we need to emit the `indexFocused`
        // event in order to provide a public event that notifies about focus changes. Also we realign
        // the tabs container by scrolling the new focused tab into the visible section.
        this.keyManager.change
            .pipe(operators.takeUntil(this.destroyed))
            .subscribe(function (newFocusIndex) {
            _this.indexFocused.emit(newFocusIndex);
            _this.setTabFocus(newFocusIndex);
        });
    };
    McTabHeader.prototype.ngOnDestroy = function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    McTabHeader.prototype.onContentChanges = function () {
        var _this = this;
        var textContent = this.elementRef.nativeElement.textContent;
        // We need to diff the text content of the header, because the MutationObserver callback
        // will fire even if the text content didn't change which is inefficient and is prone
        // to infinite loops if a poorly constructed expression is passed in.
        if (textContent !== this.currentTextContent) {
            this.currentTextContent = textContent;
            var zoneCallback = function () {
                _this.updatePagination();
                _this.changeDetectorRef.markForCheck();
            };
            // The content observer runs outside the `NgZone` by default, which
            // means that we need to bring the callback back in ourselves.
            // TODO: Remove null check for `_ngZone` once it's a required parameter.
            this.ngZone ? this.ngZone.run(zoneCallback) : zoneCallback();
        }
    };
    /**
     * Updating the view whether pagination should be enabled or not
     *
     * WARNING: Calling this method can be very costly in terms of performance.  It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     */
    McTabHeader.prototype.updatePagination = function () {
        this.checkPaginationEnabled();
        this.checkScrollingControls();
        this.updateTabScrollPosition();
    };
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    McTabHeader.prototype.isValidIndex = function (index) {
        if (!this.labelWrappers) {
            return true;
        }
        var tab = this.labelWrappers
            ? this.labelWrappers.toArray()[index]
            : null;
        return !!tab && !tab.disabled;
    };
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    McTabHeader.prototype.setTabFocus = function (tabIndex) {
        if (this.showPaginationControls) {
            this.scrollToLabel(tabIndex);
        }
        if (this.labelWrappers && this.labelWrappers.length) {
            this.labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            var containerEl = this.tabListContainer.nativeElement;
            var dir = this.getLayoutDirection();
            if (dir === 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft =
                    containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    };
    /** The layout direction of the containing app. */
    McTabHeader.prototype.getLayoutDirection = function () {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    McTabHeader.prototype.updateTabScrollPosition = function () {
        var scrollDistance = this.scrollDistance;
        var translateX = this.getLayoutDirection() === 'ltr'
            ? -scrollDistance
            : scrollDistance;
        // Don't use `translate3d` here because we don't want to create a new layer. A new layer
        // seems to cause flickering and overflow in Internet Explorer.
        // See: https://github.com/angular/material2/issues/10276
        // We round the `transform` here, because transforms with sub-pixel precision cause some
        // browsers to blur the content of the element.
        this.tabList.nativeElement.style.transform = "translateX(" + Math.round(translateX) + "px)";
        // Setting the `transform` on IE will change the scroll offset of the parent, causing the
        // position to be thrown off in some cases. We have to reset it ourselves to ensure that
        // it doesn't get thrown off.
        this.tabList.nativeElement.scrollLeft = 0;
    };
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.scrollHeader = function (scrollDir) {
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance +=
            ((scrollDir === 'before' ? -1 : 1) * viewLength) / SCROLL_DISTANCE_DELIMITER;
    };
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.scrollToLabel = function (labelIndex) {
        var selectedLabel = this.labelWrappers
            ? this.labelWrappers.toArray()[labelIndex]
            : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        var labelBeforePos;
        var labelAfterPos;
        if (this.getLayoutDirection() === 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos =
                this.tabList.nativeElement.offsetWidth -
                    selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        var beforeVisiblePos = this.scrollDistance;
        var afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -=
                beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance +=
                labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    };
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.checkPaginationEnabled = function () {
        var isEnabled = this.tabList.nativeElement.scrollWidth >
            this.elementRef.nativeElement.offsetWidth;
        if (!isEnabled) {
            this.scrollDistance = 0;
        }
        if (isEnabled !== this.showPaginationControls) {
            this.changeDetectorRef.markForCheck();
        }
        this.showPaginationControls = isEnabled;
    };
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.checkScrollingControls = function () {
        // Check if the pagination arrows should be activated.
        this.disableScrollBefore = this.scrollDistance === 0;
        this.disableScrollAfter =
            this.scrollDistance === this.getMaxScrollDistance();
        this.changeDetectorRef.markForCheck();
    };
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.getMaxScrollDistance = function () {
        var lengthOfTabList = this.tabList.nativeElement.scrollWidth;
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        return lengthOfTabList - viewLength || 0;
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McTabHeader.prototype, "selectedIndex", null);
    __decorate([
        core.ContentChildren(McTabLabelWrapper),
        __metadata("design:type", core.QueryList)
    ], McTabHeader.prototype, "labelWrappers", void 0);
    __decorate([
        core.ViewChild('tabListContainer'),
        __metadata("design:type", core.ElementRef)
    ], McTabHeader.prototype, "tabListContainer", void 0);
    __decorate([
        core.ViewChild('tabList'),
        __metadata("design:type", core.ElementRef)
    ], McTabHeader.prototype, "tabList", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabHeader.prototype, "selectFocusedIndex", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabHeader.prototype, "indexFocused", void 0);
    McTabHeader = __decorate([
        core.Component({
            selector: 'mc-tab-header',
            template: "<div class=\"mc-tab-header__pagination mc-tab-header__pagination_before mc-elevation-z4\" aria-hidden=\"true\" [class.mc-tab-header_disabled]=\"disableScrollBefore\" (click)=\"scrollHeader('before')\"><div class=\"mc-tab-header__pagination-chevron\"></div></div><div class=\"mc-tab-header__content\" #tabListContainer (keydown)=\"handleKeydown($event)\"><div class=\"mc-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"onContentChanges()\"><div class=\"mc-tab-list__content\"><ng-content></ng-content></div></div></div><div class=\"mc-tab-header__pagination mc-tab-header__pagination_after mc-elevation-z4\" aria-hidden=\"true\" [class.mc-tab-header_disabled]=\"disableScrollAfter\" (click)=\"scrollHeader('after')\"><div class=\"mc-tab-header__pagination-chevron\"></div></div>",
            styles: [".mc-tab-header{display:flex}.mc-tab-header__pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mc-tab-header__pagination .mc-tab-header__pagination-controls_enabled{display:flex}.mc-tab-header__pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mc-tab-header__pagination_after,.mc-tab-header_rtl .mc-tab-header__pagination_before{padding-right:4px}.mc-tab-header__pagination_after .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_before .mc-tab-header__pagination-chevron{transform:rotate(45deg)}.mc-tab-header__pagination_before,.mc-tab-header_rtl .mc-tab-header__pagination_after{padding-left:4px}.mc-tab-header__pagination_before .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_after .mc-tab-header__pagination-chevron{transform:rotate(-135deg)}.mc-tab-header_disabled{box-shadow:none;cursor:default}.mc-tab-header__content{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-group_stretch-labels .mc-tab-label{flex-basis:0;flex-grow:1}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                class: 'mc-tab-header',
                '[class.mc-tab-header__pagination-controls_enabled]': 'showPaginationControls',
                '[class.mc-tab-header_rtl]': 'getLayoutDirection() == \'rtl\''
            }
        }),
        __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef,
            scrolling.ViewportRuler,
            bidi.Directionality,
            core.NgZone])
    ], McTabHeader);
    return McTabHeader;
}(McTabHeaderBase));

var McLightTabsCssStyler = /** @class */ (function () {
    function McLightTabsCssStyler() {
    }
    McLightTabsCssStyler = __decorate([
        core.Directive({
            selector: 'mc-tab-group[mc-light-tabs], [mc-tab-nav-bar][mc-light-tabs]',
            host: { class: 'mc-tab-group_light' }
        })
    ], McLightTabsCssStyler);
    return McLightTabsCssStyler;
}());
var McAlignTabsCenterCssStyler = /** @class */ (function () {
    function McAlignTabsCenterCssStyler() {
    }
    McAlignTabsCenterCssStyler = __decorate([
        core.Directive({
            selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
            host: { class: 'mc-tab-group_align-labels-center' }
        })
    ], McAlignTabsCenterCssStyler);
    return McAlignTabsCenterCssStyler;
}());
var McAlignTabsEndCssStyler = /** @class */ (function () {
    function McAlignTabsEndCssStyler() {
    }
    McAlignTabsEndCssStyler = __decorate([
        core.Directive({
            selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
            host: { class: 'mc-tab-group_align-labels-end' }
        })
    ], McAlignTabsEndCssStyler);
    return McAlignTabsEndCssStyler;
}());
var McStretchTabsCssStyler = /** @class */ (function () {
    function McStretchTabsCssStyler() {
    }
    McStretchTabsCssStyler = __decorate([
        core.Directive({
            selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
            host: { class: 'mc-tab-group_stretch-labels' }
        })
    ], McStretchTabsCssStyler);
    return McStretchTabsCssStyler;
}());
/** Used to generate unique ID's for each tab component */
var nextId = 0;
/** A simple change event emitted on focus or selection changes. */
var McTabChangeEvent = /** @class */ (function () {
    function McTabChangeEvent() {
    }
    return McTabChangeEvent;
}());
/** Injection token that can be used to provide the default options the tabs module. */
var MC_TABS_CONFIG = new core.InjectionToken('MC_TABS_CONFIG');
// Boilerplate for applying mixins to McTabGroup.
/** @docs-private */
var McTabGroupBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTabGroupBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTabGroupBase;
}());
var mcTabGroupMixinBase = mixinColor(mixinDisabled(McTabGroupBase));
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
var McTabGroup = /** @class */ (function (_super) {
    __extends(McTabGroup, _super);
    function McTabGroup(elementRef, changeDetectorRef, lightTabs, defaultConfig) {
        var _this = _super.call(this, elementRef) || this;
        _this.changeDetectorRef = changeDetectorRef;
        /** Position of the tab header. */
        _this.headerPosition = 'above';
        /** Output to enable support for two-way binding on `[(selectedIndex)]` */
        _this.selectedIndexChange = new core.EventEmitter();
        /** Event emitted when focus has changed within a tab group. */
        _this.focusChange = new core.EventEmitter();
        /** Event emitted when the body animation has completed */
        _this.animationDone = new core.EventEmitter();
        /** Event emitted when the tab selection has changed. */
        _this.selectedTabChange = new core.EventEmitter(true);
        /** The tab index that should be selected after the content has been checked. */
        _this.indexToSelect = 0;
        /** Snapshot of the height of the tab body wrapper before another tab is activated. */
        _this.tabBodyWrapperHeight = 0;
        /** Subscription to tabs being added/removed. */
        _this.tabsSubscription = rxjs.Subscription.EMPTY;
        /** Subscription to changes in the tab labels. */
        _this.tabLabelSubscription = rxjs.Subscription.EMPTY;
        _this._dynamicHeight = false;
        _this._selectedIndex = null;
        _this.lightTab = coercion.coerceBooleanProperty(lightTabs);
        _this.groupId = nextId++;
        _this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
            defaultConfig.animationDuration : '0ms';
        return _this;
    }
    Object.defineProperty(McTabGroup.prototype, "dynamicHeight", {
        /** Whether the tab group should grow to the size of the active tab. */
        get: function () { return this._dynamicHeight; },
        set: function (value) { this._dynamicHeight = coercion.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabGroup.prototype, "selectedIndex", {
        /** The index of the active tab. */
        get: function () { return this._selectedIndex; },
        set: function (value) {
            this.indexToSelect = coercion.coerceNumberProperty(value, null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    McTabGroup.prototype.ngAfterContentChecked = function () {
        var _this = this;
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        var indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect) {
            var isFirstRun_1 = this._selectedIndex == null;
            if (!isFirstRun_1) {
                this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
            }
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then(function () {
                _this.tabs.forEach(function (tab, index) { return tab.isActive = index === indexToSelect; });
                if (!isFirstRun_1) {
                    _this.selectedIndexChange.emit(indexToSelect);
                }
            });
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.tabs.forEach(function (tab, index) {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (_this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - _this._selectedIndex;
            }
        });
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this.changeDetectorRef.markForCheck();
        }
    };
    McTabGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this.tabsSubscription = this.tabs.changes.subscribe(function () {
            var indexToSelect = _this.clampTabIndex(_this.indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === _this._selectedIndex) {
                var tabs = _this.tabs.toArray();
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].isActive) {
                        // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `selectedIndexChange` event.
                        _this.indexToSelect = _this._selectedIndex = i;
                        break;
                    }
                }
            }
            _this.subscribeToTabLabels();
            _this.changeDetectorRef.markForCheck();
        });
    };
    McTabGroup.prototype.ngOnDestroy = function () {
        this.tabsSubscription.unsubscribe();
        this.tabLabelSubscription.unsubscribe();
    };
    McTabGroup.prototype.focusChanged = function (index) {
        this.focusChange.emit(this.createChangeEvent(index));
    };
    /** Returns a unique id for each tab label element */
    McTabGroup.prototype.getTabLabelId = function (i) {
        return "mc-tab-label-" + this.groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    McTabGroup.prototype.getTabContentId = function (i) {
        return "mc-tab-content-" + this.groupId + "-" + i;
    };
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    McTabGroup.prototype.setTabBodyWrapperHeight = function (tabHeight) {
        if (!this._dynamicHeight || !this.tabBodyWrapperHeight) {
            return;
        }
        var wrapper = this.tabBodyWrapper.nativeElement;
        wrapper.style.height = this.tabBodyWrapperHeight + "px";
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this.tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = tabHeight + "px";
        }
    };
    /** Removes the height of the tab body wrapper. */
    McTabGroup.prototype.removeTabBodyWrapperHeight = function () {
        this.tabBodyWrapperHeight = this.tabBodyWrapper.nativeElement.clientHeight;
        this.tabBodyWrapper.nativeElement.style.height = '';
        this.animationDone.emit();
    };
    /** Handle click events, setting new selected index if appropriate. */
    McTabGroup.prototype.handleClick = function (tab, tabHeader, index) {
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = index;
        }
    };
    /** Retrieves the tabindex for the tab. */
    McTabGroup.prototype.getTabIndex = function (tab, index) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === index ? 0 : -1;
    };
    McTabGroup.prototype.createChangeEvent = function (index) {
        var event = new McTabChangeEvent();
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    };
    /**
     * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     */
    McTabGroup.prototype.subscribeToTabLabels = function () {
        var _this = this;
        if (this.tabLabelSubscription) {
            this.tabLabelSubscription.unsubscribe();
        }
        this.tabLabelSubscription = rxjs.merge.apply(void 0, this.tabs.map(function (tab) { return tab.stateChanges; })).subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
    };
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    McTabGroup.prototype.clampTabIndex = function (index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Mch.max(NaN, 0) === NaN).
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTabGroup.prototype, "dynamicHeight", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTabGroup.prototype, "selectedIndex", null);
    __decorate([
        core.ContentChildren(McTab),
        __metadata("design:type", core.QueryList)
    ], McTabGroup.prototype, "tabs", void 0);
    __decorate([
        core.ViewChild('tabBodyWrapper'),
        __metadata("design:type", core.ElementRef)
    ], McTabGroup.prototype, "tabBodyWrapper", void 0);
    __decorate([
        core.ViewChild('tabHeader'),
        __metadata("design:type", McTabHeader)
    ], McTabGroup.prototype, "tabHeader", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTabGroup.prototype, "headerPosition", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTabGroup.prototype, "animationDuration", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabGroup.prototype, "selectedIndexChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabGroup.prototype, "focusChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabGroup.prototype, "animationDone", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabGroup.prototype, "selectedTabChange", void 0);
    McTabGroup = __decorate([
        core.Component({
            selector: 'mc-tab-group',
            exportAs: 'mcTabGroup',
            template: "<mc-tab-header #tabHeader [selectedIndex]=\"selectedIndex\" (indexFocused)=\"focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"><div role=\"tab\" mcTabLabelWrapper cdkMonitorElementFocus [class.mc-tab-label]=\"!lightTab\" [class.mc-tab-light-label]=\"lightTab\" *ngFor=\"let tab of tabs; let i = index\" [id]=\"getTabLabelId(i)\" [attr.tabIndex]=\"getTabIndex(tab, i)\" [attr.aria-posinset]=\"i + 1\" [attr.aria-setsize]=\"tabs.length\" [attr.aria-controls]=\"getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [attr.aria-label]=\"tab.ariaLabel || null\" [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\" [class.mc-active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" (click)=\"handleClick(tab, tabHeader, i)\"><div class=\"mc-tab-label__content\"><ng-template [ngIf]=\"tab.templateLabel\"><ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template></ng-template><ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template></div><div class=\"mc-tab-overlay\"></div></div></mc-tab-header><div class=\"mc-tab-body__wrapper\" #tabBodyWrapper><mc-tab-body role=\"tabpanel\" *ngFor=\"let tab of tabs; let i = index\" [id]=\"getTabContentId(i)\" [attr.aria-labelledby]=\"getTabLabelId(i)\" [class.mc-tab-body__active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" [animationDuration]=\"animationDuration\" (onCentered)=\"removeTabBodyWrapperHeight()\" (onCentering)=\"setTabBodyWrapperHeight($event)\"></mc-tab-body></div>",
            styles: [".mc-tab-label.cdk-keyboard-focused:after,.mc-tab-light-label.cdk-keyboard-focused:after,.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{display:block;position:absolute;content:\"\"}.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-label.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-label.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-label .mc-tab-overlay{border-top-width:1px;border-top-style:solid;border-top-color:transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-light-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-light-label.cdk-keyboard-focused{z-index:1}.mc-tab-light-label.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-light-label.mc-disabled{pointer-events:none}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-light-label.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-light-label.cdk-keyboard-focused:after{top:-1px}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:0}.mc-tab-header__content{padding:1px 1px 0 1px}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            inputs: ['color'],
            host: {
                class: 'mc-tab-group',
                '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
                '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"'
            }
        }),
        __param(2, core.Attribute('mc-light-tabs')),
        __param(3, core.Inject(MC_TABS_CONFIG)), __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef, String, Object])
    ], McTabGroup);
    return McTabGroup;
}(mcTabGroupMixinBase));

// Boilerplate for applying mixins to McTabNav.
/** @docs-private */
var McTabNavBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTabNavBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTabNavBase;
}());
var mcTabNavMixinBase = mixinColor(McTabNavBase);
/**
 * Navigation component matching the styles of the tab group header.
 */
var McTabNav = /** @class */ (function (_super) {
    __extends(McTabNav, _super);
    function McTabNav(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    McTabNav = __decorate([
        core.Component({
            selector: '[mc-tab-nav-bar]',
            exportAs: 'mcTabNavBar, mcTabNav',
            inputs: ['color'],
            template: "<div class=\"mc-tab-links\"><ng-content></ng-content></div>",
            styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{display:block;position:absolute;content:\"\"}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{border-top-width:1px;border-top-style:solid;border-top-color:transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:0}.mc-tab-links{display:flex;position:relative;padding:1px 1px 0 1px;flex-grow:1}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"],
            host: { class: 'mc-tab-nav-bar' },
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McTabNav);
    return McTabNav;
}(mcTabNavMixinBase));
// Boilerplate for applying mixins to McTabLink.
var McTabLinkBase = /** @class */ (function () {
    function McTabLinkBase() {
    }
    return McTabLinkBase;
}());
var mcTabLinkMixinBase = mixinTabIndex(mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
var McTabLink = /** @class */ (function (_super) {
    __extends(McTabLink, _super);
    function McTabLink(elementRef, tabIndex, focusMonitor) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.focusMonitor = focusMonitor;
        /** Whether the tab link is active or not. */
        _this.isActive = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.focusMonitor.monitor(_this.elementRef.nativeElement);
        return _this;
    }
    Object.defineProperty(McTabLink.prototype, "active", {
        /** Whether the link is active. */
        get: function () {
            return this.isActive;
        },
        set: function (value) {
            if (value !== this.isActive) {
                this.isActive = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    McTabLink.prototype.ngOnDestroy = function () {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTabLink.prototype, "active", null);
    McTabLink = __decorate([
        core.Directive({
            selector: '[mc-tab-link], [mcTabLink]',
            exportAs: 'mcTabLink',
            inputs: ['disabled', 'tabIndex'],
            host: {
                class: 'mc-tab-link',
                '[attr.aria-current]': 'active',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.tabIndex]': 'tabIndex',
                '[class.mc-disabled]': 'disabled',
                '[class.mc-active]': 'active'
            }
        }),
        __param(1, core.Attribute('tabindex')),
        __metadata("design:paramtypes", [core.ElementRef, String, a11y.FocusMonitor])
    ], McTabLink);
    return McTabLink;
}(mcTabLinkMixinBase));

var McTabsModule = /** @class */ (function () {
    function McTabsModule() {
    }
    McTabsModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                McCommonModule,
                portal.PortalModule,
                a11y.A11yModule
            ],
            // Don't export all components because some are only to be used internally.
            exports: [
                McCommonModule,
                McTabGroup,
                McTabLabel,
                McTab,
                McTabNav,
                McTabLink,
                McTabContent,
                McLightTabsCssStyler,
                McAlignTabsCenterCssStyler,
                McAlignTabsEndCssStyler,
                McStretchTabsCssStyler
            ],
            declarations: [
                McTabGroup,
                McTabLabel,
                McTab,
                McTabLabelWrapper,
                McTabNav,
                McTabLink,
                McTabBody,
                McTabBodyPortal,
                McTabHeader,
                McTabContent,
                McLightTabsCssStyler,
                McAlignTabsCenterCssStyler,
                McAlignTabsEndCssStyler,
                McStretchTabsCssStyler
            ]
        })
    ], McTabsModule);
    return McTabsModule;
}());

var McTagBase = /** @class */ (function () {
    function McTagBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTagBase;
}());
var _McTagMixinBase = mixinColor(mixinDisabled(McTagBase));
var McTag = /** @class */ (function (_super) {
    __extends(McTag, _super);
    function McTag(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this._disabled = false;
        _this.nativeElement = elementRef.nativeElement;
        return _this;
    }
    Object.defineProperty(McTag.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            if (value !== this.disabled) {
                this._disabled = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    McTag.prototype.ngAfterContentInit = function () {
        this._addClassModificatorForIcons();
    };
    McTag.prototype._addClassModificatorForIcons = function () {
        var icons = this.contentChildren.map(function (item) { return item._elementRef.nativeElement; });
        if (icons.length === 1) {
            var iconElement = icons[0];
            if (!iconElement.previousElementSibling && !iconElement.nextElementSibling) {
                if (iconElement.nextSibling) {
                    iconElement.classList.add('mc-icon_left');
                    this.nativeElement.classList.add('mc-left-icon');
                }
                if (iconElement.previousSibling) {
                    iconElement.classList.add('mc-icon_right');
                    this.nativeElement.classList.add('mc-right-icon');
                }
            }
        }
        else if (icons.length > 1) {
            var firstIconElement = icons[0];
            var secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    };
    __decorate([
        core.ContentChildren(McIcon),
        __metadata("design:type", core.QueryList)
    ], McTag.prototype, "contentChildren", void 0);
    McTag = __decorate([
        core.Component({
            selector: 'mc-tag',
            template: "<div class=\"mc-tag__wrapper\"><span class=\"mc-tag__text\"><ng-content></ng-content></span><ng-content select=\"[mc-icon]\"></ng-content><div class=\"mc-tag-overlay\"></div></div>",
            styles: [".mc-tag{position:relative;display:inline-block;overflow:hidden;height:24px;border-width:1px;border-style:solid;border-radius:4px;cursor:default}.mc-tag.mc-left-icon{padding-left:3px}.mc-tag.mc-right-icon{padding-right:3px}.mc-tag__wrapper{display:flex;align-items:center;height:100%;flex:1 1 100%}.mc-tag__wrapper .mc-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;height:24px}.mc-tag__wrapper .mc-icon_left{margin-right:3px}.mc-tag__wrapper .mc-icon_right{margin-left:3px}.mc-tag-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-tag__text{margin-left:7px;text-overflow:ellipsis;overflow:hidden}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            host: {
                class: 'mc-tag',
                '[class.mc-disabled]': 'disabled'
            },
            inputs: ['color', 'disabled']
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McTag);
    return McTag;
}(_McTagMixinBase));

var McTagModule = /** @class */ (function () {
    function McTagModule() {
    }
    McTagModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                platform.PlatformModule
            ],
            exports: [
                McTag
            ],
            declarations: [
                McTag
            ]
        })
    ], McTagModule);
    return McTagModule;
}());

var MC_TEXTAREA_VALUE_ACCESSOR = new core.InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
var nextUniqueId$4 = 0;
var McTextareaBase = /** @class */ (function () {
    function McTextareaBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return McTextareaBase;
}());
// tslint:disable-next-line:naming-convention
var McTextareaMixinBase = mixinErrorState(McTextareaBase);
var McTextarea = /** @class */ (function (_super) {
    __extends(McTextarea, _super);
    function McTextarea(elementRef, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor, ngZone) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this.elementRef = elementRef;
        _this.ngControl = ngControl;
        _this.ngZone = ngZone;
        _this.canGrow = true;
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
        _this.controlType = 'mc-textarea';
        _this.uid = "mc-textsrea-" + nextUniqueId$4++;
        _this._disabled = false;
        _this._required = false;
        _this.lineHeight = 0;
        _this.freeRowsHeight = 0;
        _this.minHeight = 0;
        // If no input value accessor was explicitly specified, use the element as the textarea value
        // accessor.
        _this.valueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
        _this.previousNativeValue = _this.value;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        var growObserver = rxjs.fromEvent(elementRef.nativeElement, 'input');
        _this.growSubscription = growObserver.subscribe(_this.grow.bind(_this));
        return _this;
    }
    McTextarea_1 = McTextarea;
    Object.defineProperty(McTextarea.prototype, "disabled", {
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
            if (this.focused) {
                this.focused = false;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTextarea.prototype, "id", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value || this.uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTextarea.prototype, "required", {
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
    Object.defineProperty(McTextarea.prototype, "value", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this.valueAccessor.value;
        },
        set: function (value) {
            if (value !== this.value) {
                this.valueAccessor.value = value;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    McTextarea.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.grow(); }, 0);
        this.lineHeight = parseInt(getComputedStyle(this.elementRef.nativeElement).lineHeight, 10);
        var paddingTop = parseInt(getComputedStyle(this.elementRef.nativeElement).paddingTop, 10);
        var paddingBottom = parseInt(getComputedStyle(this.elementRef.nativeElement).paddingBottom, 10);
        // tslint:disable-next-line:no-magic-numbers
        this.minHeight = this.lineHeight * 2 + paddingTop + paddingBottom;
        this.freeRowsHeight = this.lineHeight;
    };
    McTextarea.prototype.ngOnChanges = function () {
        this.stateChanges.next();
    };
    McTextarea.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
        this.growSubscription.unsubscribe();
    };
    McTextarea.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this.dirtyCheckNativeValue();
    };
    /** Grow textarea height to avoid vertical scroll  */
    McTextarea.prototype.grow = function () {
        var _this = this;
        if (!this.canGrow) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            var textarea = _this.elementRef.nativeElement;
            var outerHeight = parseInt(window.getComputedStyle(textarea).height, 10);
            var diff = outerHeight - textarea.clientHeight;
            textarea.style.height = 0; // this line is important to height recalculation
            var height = Math.max(_this.minHeight, textarea.scrollHeight + diff + _this.freeRowsHeight);
            textarea.style.height = height + "px";
        });
    };
    /** Focuses the textarea. */
    McTextarea.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    /** Callback for the cases where the focused state of the textarea changes. */
    McTextarea.prototype.focusChanged = function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    Object.defineProperty(McTextarea.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return !this.elementRef.nativeElement.value && !this.isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    McTextarea.prototype.onContainerClick = function () {
        this.focus();
    };
    /** Does some manual dirty checking on the native textarea `value` property. */
    McTextarea.prototype.dirtyCheckNativeValue = function () {
        var newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Checks whether the textarea is invalid based on the native validation. */
    McTextarea.prototype.isBadInput = function () {
        // The `validity` property won't be present on platform-server.
        var validity = this.elementRef.nativeElement.validity;
        return validity && validity.badInput;
    };
    McTextarea.prototype.getGrowHeight = function () {
        var textarea = this.elementRef.nativeElement;
        var outerHeight = parseInt(window.getComputedStyle(textarea).height.toString(), 10);
        var diff = outerHeight - textarea.clientHeight;
        return Math.max(this.minHeight, textarea.scrollHeight + diff);
    };
    var McTextarea_1;
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McTextarea.prototype, "canGrow", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", ErrorStateMatcher)
    ], McTextarea.prototype, "errorStateMatcher", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTextarea.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTextarea.prototype, "id", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTextarea.prototype, "placeholder", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTextarea.prototype, "required", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTextarea.prototype, "value", null);
    McTextarea = McTextarea_1 = __decorate([
        core.Directive({
            selector: 'textarea[mcTextarea]',
            exportAs: 'mcTextarea',
            host: {
                class: 'mc-textarea',
                '[class.mc-textarea-resizable]': '!canGrow',
                '[attr.id]': 'id',
                '[attr.placeholder]': 'placeholder',
                '[attr.aria-invalid]': 'errorState',
                '[disabled]': 'disabled',
                '[required]': 'required',
                '(blur)': 'focusChanged(false)',
                '(focus)': 'focusChanged(true)'
            },
            providers: [{ provide: McFormFieldControl, useExisting: McTextarea_1 }]
        }),
        __param(1, core.Optional()), __param(1, core.Self()),
        __param(2, core.Optional()),
        __param(3, core.Optional()),
        __param(5, core.Optional()), __param(5, core.Self()), __param(5, core.Inject(MC_TEXTAREA_VALUE_ACCESSOR)),
        __metadata("design:paramtypes", [core.ElementRef,
            forms.NgControl,
            forms.NgForm,
            forms.FormGroupDirective,
            ErrorStateMatcher, Object, core.NgZone])
    ], McTextarea);
    return McTextarea;
}(McTextareaMixinBase));

var McTextareaModule = /** @class */ (function () {
    function McTextareaModule() {
    }
    McTextareaModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, a11y.A11yModule, McCommonModule, forms.FormsModule],
            exports: [McTextarea],
            declarations: [McTextarea]
        })
    ], McTextareaModule);
    return McTextareaModule;
}());

var _a;

(function (TimeParts) {
    TimeParts[TimeParts["hours"] = 0] = "hours";
    TimeParts[TimeParts["minutes"] = 1] = "minutes";
    TimeParts[TimeParts["seconds"] = 2] = "seconds";
})(exports.TimeParts || (exports.TimeParts = {}));

(function (TimeFormats) {
    TimeFormats["HHmmss"] = "HH:mm:ss";
    TimeFormats["HHmm"] = "HH:mm";
})(exports.TimeFormats || (exports.TimeFormats = {}));
var TIMEFORMAT_PLACEHOLDERS = (_a = {}, _a[exports.TimeFormats.HHmmss] = '  :  :  ', _a[exports.TimeFormats.HHmm] = '  :  ', _a);
var DEFAULT_TIME_FORMAT = exports.TimeFormats.HHmm;
var HOURS_MINUTES_SECONDS_REGEXP = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])?$/);
var HOURS_MINUTES_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]|[0-9])?$/;
var HOURS_ONLY_REGEXP = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):?$/;
var SECONDS_PER_MINUTE = 59;
var MINUTES_PER_HOUR = 59;
var HOURS_PER_DAY = 23;
// TODO Move it to common CDK
var ARROW_UP_KEYCODE = 'ArrowUp';
var ARROW_DOWN_KEYCODE = 'ArrowDown';
var ARROW_LEFT_KEYCODE = 'ArrowLeft';
var ARROW_RIGHT_KEYCODE = 'ArrowRight';

var uniqueComponentIdSuffix = 0;
var formValidators = new WeakMap();
var formValidatorOnChangeRegistrators = new WeakMap();
var validatorOnChange = function (c) {
    var validatorOnChangeHandler = formValidatorOnChangeRegistrators.get(c);
    if (validatorOnChangeHandler !== undefined) {
        validatorOnChangeHandler();
    }
};
var ɵ0 = validatorOnChange;
var McTimepickerBase = /** @class */ (function () {
    function McTimepickerBase(
    // tslint:disable-next-line naming-convention
    _defaultErrorStateMatcher, 
    // tslint:disable-next-line naming-convention
    _parentForm, 
    // tslint:disable-next-line naming-convention
    _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return McTimepickerBase;
}());
// tslint:disable-next-line naming-convention
var McTimepickerMixinBase = mixinErrorState(McTimepickerBase);
var ɵ1 = {
    validate: function (c) {
        // TODO This is `workaround` to bind singleton-like Validator implementation to
        // context of each validated component. This MUST be realized in proper way!
        if (this.__validatorOnChangeHandler !== undefined) {
            formValidatorOnChangeRegistrators.set(c, this.__validatorOnChangeHandler);
            this.__validatorOnChangeHandler = undefined;
        }
        var validator = formValidators.get(c);
        return validator ? validator(c) : null;
    },
    registerOnValidatorChange: function (fn) {
        this.__validatorOnChangeHandler = fn;
    }
};
var McTimepicker = /** @class */ (function (_super) {
    __extends(McTimepicker, _super);
    function McTimepicker(elementRef, ngControl, 
    // tslint:disable-next-line naming-convention
    _parentForm, 
    // tslint:disable-next-line naming-convention
    _parentFormGroup, 
    // tslint:disable-next-line naming-convention
    _defaultErrorStateMatcher, inputValueAccessor, renderer) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this.elementRef = elementRef;
        _this.ngControl = ngControl;
        _this.renderer = renderer;
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
        _this.controlType = 'mc-timepicker';
        _this.uid = "mc-timepicker-" + uniqueComponentIdSuffix++;
        _this._minTime = null;
        _this._maxTime = null;
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this.inputValueAccessor = inputValueAccessor || _this.elementRef.nativeElement;
        _this.previousNativeValue = _this.value;
        _this.onChange = rxjs.noop;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        _this.placeholder = TIMEFORMAT_PLACEHOLDERS[DEFAULT_TIME_FORMAT];
        // Instead of NG_VALUE_ACCESSOR (https://github.com/angular/material2/issues/8158#issuecomment-344618103)
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        // Substitute initial empty validator with validator linked to directive object instance (workaround)
        formValidators.set(_this.ngControl.control, forms.Validators.compose([
            function () { return _this.parseValidator(); },
            function () { return _this.minTimeValidator(); },
            function () { return _this.maxTimeValidator(); }
        ]));
        return _this;
    }
    McTimepicker_1 = McTimepicker;
    Object.defineProperty(McTimepicker.prototype, "disabled", {
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
            }
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "id", {
        get: function () { return this._id; },
        set: function (value) { this._id = value || this.uid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "required", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () { return this._required; },
        set: function (value) { this._required = coercion.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "value", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () { return this.inputValueAccessor.value; },
        set: function (value) {
            if (value !== this.value) {
                this.inputValueAccessor.value = value;
                this.applyInputChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "timeFormat", {
        get: function () { return this._timeFormat; },
        set: function (formatValue) {
            this._timeFormat = Object
                .keys(exports.TimeFormats)
                .map(function (timeFormatKey) { return exports.TimeFormats[timeFormatKey]; })
                .indexOf(formatValue) > -1 ? formatValue : DEFAULT_TIME_FORMAT;
            validatorOnChange(this.ngControl.control);
            this.placeholder = TIMEFORMAT_PLACEHOLDERS[this._timeFormat];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "minTime", {
        get: function () { return this._minTime; },
        set: function (minValue) {
            this._minTime = minValue;
            this.minDateTime = minValue !== null ? this.getDateFromTimeString(minValue) : undefined;
            validatorOnChange(this.ngControl.control);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTimepicker.prototype, "maxTime", {
        get: function () { return this._maxTime; },
        set: function (maxValue) {
            this._maxTime = maxValue;
            this.maxDateTime = maxValue !== null ? this.getDateFromTimeString(maxValue) : undefined;
            validatorOnChange(this.ngControl.control);
        },
        enumerable: true,
        configurable: true
    });
    McTimepicker.prototype.ngOnChanges = function () {
        this.stateChanges.next();
    };
    McTimepicker.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    McTimepicker.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this.dirtyCheckNativeValue();
    };
    McTimepicker.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    McTimepicker.prototype.focusChanged = function (isFocused) {
        if (isFocused !== this.focused) {
            this.focused = isFocused;
            this.onTouched();
            this.stateChanges.next();
        }
    };
    McTimepicker.prototype.onBlur = function () {
        this.applyInputChanges();
        this.focusChanged(false);
    };
    McTimepicker.prototype.onPaste = function ($event) {
        $event.preventDefault();
        var clipboardUserInput = $event.clipboardData.getData('text');
        if (this.getDateFromTimeString(clipboardUserInput) === undefined) {
            return;
        }
        this.elementRef.nativeElement.value = clipboardUserInput;
        this.onInput();
    };
    McTimepicker.prototype.onInput = function () {
        var initialCursorStart = this.elementRef.nativeElement.selectionStart;
        var initialCursorEnd = this.elementRef.nativeElement.selectionEnd;
        var isAutocompleteTriggered = false;
        var _a = this.getParsedTimeParts(this.elementRef.nativeElement.value), hoursOnly = _a.hoursOnly, hoursAndMinutes = _a.hoursAndMinutes, hoursAndMinutesAndSeconds = _a.hoursAndMinutesAndSeconds;
        // tslint:disable no-magic-numbers
        if (hoursOnly &&
            hoursOnly[1] &&
            hoursOnly[1].length === 2) {
            isAutocompleteTriggered = true;
        }
        else if (hoursAndMinutes &&
            hoursAndMinutes[1].length === 1 &&
            hoursAndMinutes[2] &&
            hoursAndMinutes[2].length === 2) {
            isAutocompleteTriggered = true;
        }
        else if (hoursAndMinutesAndSeconds &&
            hoursAndMinutesAndSeconds[1].length === 2 &&
            hoursAndMinutesAndSeconds[2].length === 2 &&
            hoursAndMinutesAndSeconds[3] &&
            hoursAndMinutesAndSeconds[3].length === 2) {
            isAutocompleteTriggered = true;
        }
        // tslint:enable no-magic-numbers
        this.applyInputChanges({ doTimestringReformat: isAutocompleteTriggered });
        this.elementRef.nativeElement.selectionStart = initialCursorStart;
        this.elementRef.nativeElement.selectionEnd = initialCursorEnd;
        if (isAutocompleteTriggered && this.ngControl.errors === null) {
            this.createSelectionOfTimeComponentInInput(initialCursorStart + 1);
        }
    };
    Object.defineProperty(McTimepicker.prototype, "empty", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return !this.elementRef.nativeElement.value && !this.isBadInput();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    McTimepicker.prototype.onContainerClick = function () {
        this.focus();
    };
    McTimepicker.prototype.writeValue = function (value) {
        if (value !== null) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(value, this.timeFormat));
        }
        this.onChange(value || null);
        this.applyInputChanges();
    };
    McTimepicker.prototype.onKeyDown = function (event) {
        var keyCode = this.getKeyCode(event);
        if (keyCode === ARROW_UP_KEYCODE || keyCode === ARROW_DOWN_KEYCODE) {
            this.upDownTimeByArrowKeys(event);
        }
        if (keyCode === ARROW_LEFT_KEYCODE || keyCode === ARROW_RIGHT_KEYCODE) {
            this.switchSelectionBetweenTimeparts(event);
        }
    };
    McTimepicker.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    McTimepicker.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /** Does some manual dirty checking on the native input `value` property. */
    McTimepicker.prototype.dirtyCheckNativeValue = function () {
        var newValue = this.value;
        if (this.previousNativeValue !== newValue) {
            this.previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Checks whether the input is invalid based on the native validation. */
    McTimepicker.prototype.isBadInput = function () {
        var validity = this.elementRef.nativeElement.validity;
        return validity && validity.badInput;
    };
    McTimepicker.prototype.applyInputChanges = function (applyParams) {
        if (applyParams === void 0) { applyParams = {}; }
        var changedTime = applyParams.changedTime, _a = applyParams.doTimestringReformat, doTimestringReformat = _a === void 0 ? true : _a;
        var timeToApply = changedTime ||
            this.getDateFromTimeString(this.elementRef.nativeElement.value);
        this.currentDateTimeInput = timeToApply;
        if (doTimestringReformat && timeToApply !== undefined) {
            var selectionStart = this.elementRef.nativeElement.selectionStart;
            var selectionEnd = this.elementRef.nativeElement.selectionEnd;
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.getTimeStringFromDate(timeToApply, this.timeFormat));
            this.elementRef.nativeElement.selectionStart = selectionStart;
            this.elementRef.nativeElement.selectionEnd = selectionEnd;
        }
        this.ngControl.control.updateValueAndValidity();
        var result = this.ngControl.errors === null && timeToApply !== undefined ? timeToApply : null;
        this.onChange(result);
        this.stateChanges.next();
    };
    McTimepicker.prototype.upDownTimeByArrowKeys = function (event) {
        event.preventDefault();
        var changedTime = this.currentDateTimeInput;
        if (changedTime !== undefined) {
            var cursorPos = this.elementRef.nativeElement.selectionStart;
            var modifiedTimePart = this.getTimeEditMetrics(cursorPos)
                .modifiedTimePart;
            var keyCode = this.getKeyCode(event);
            if (keyCode === ARROW_UP_KEYCODE) {
                changedTime = this.incrementTime(changedTime, modifiedTimePart);
            }
            if (keyCode === ARROW_DOWN_KEYCODE) {
                changedTime = this.decrementTime(changedTime, modifiedTimePart);
            }
            this.applyInputChanges({ changedTime: changedTime });
            this.createSelectionOfTimeComponentInInput(cursorPos);
        }
    };
    McTimepicker.prototype.switchSelectionBetweenTimeparts = function (event) {
        var changedTime = this.currentDateTimeInput;
        var keyCode = this.getKeyCode(event);
        if (changedTime !== undefined) {
            var cursorPos = this.elementRef.nativeElement.selectionStart;
            if (keyCode === ARROW_LEFT_KEYCODE) {
                cursorPos = this.getCursorPositionOfPrevTimePartStart(cursorPos, this.elementRef.nativeElement.value);
            }
            else if (keyCode === ARROW_RIGHT_KEYCODE) {
                cursorPos = this.getCursorPositionOfNextTimePartStart(cursorPos, this.elementRef.nativeElement.value);
            }
            this.createSelectionOfTimeComponentInInput(cursorPos);
        }
    };
    /**
     * @description Microsoft EDGE doesn't support KeyboaedEvent.code thus we need this helper
     */
    McTimepicker.prototype.getKeyCode = function (event) {
        return event.code || event.key;
    };
    McTimepicker.prototype.createSelectionOfTimeComponentInInput = function (cursorPos) {
        var _this = this;
        setTimeout(function () {
            var newEditParams = _this.getTimeEditMetrics(cursorPos);
            _this.elementRef.nativeElement.selectionStart = newEditParams.cursorStartPosition;
            _this.elementRef.nativeElement.selectionEnd = newEditParams.cursorEndPosition;
        });
    };
    McTimepicker.prototype.incrementTime = function (dateVal, whatToIncrement) {
        if (whatToIncrement === void 0) { whatToIncrement = exports.TimeParts.seconds; }
        var _a = this.getTimeDigitsFromDate(dateVal), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
        switch (whatToIncrement) {
            case exports.TimeParts.hours:
                hours++;
                break;
            case exports.TimeParts.minutes:
                minutes++;
                break;
            case exports.TimeParts.seconds:
                seconds++;
                break;
            default:
        }
        if (seconds > SECONDS_PER_MINUTE) {
            seconds = 0;
        }
        if (minutes > MINUTES_PER_HOUR) {
            minutes = 0;
        }
        if (hours > HOURS_PER_DAY) {
            hours = 0;
        }
        return this.getDateFromTimeDigits(hours, minutes, seconds);
    };
    /**
     * @description Decrement part of time
     */
    McTimepicker.prototype.decrementTime = function (dateVal, whatToDecrement) {
        if (whatToDecrement === void 0) { whatToDecrement = exports.TimeParts.seconds; }
        var _a = this.getTimeDigitsFromDate(dateVal), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
        switch (whatToDecrement) {
            case exports.TimeParts.hours:
                hours--;
                break;
            case exports.TimeParts.minutes:
                minutes--;
                break;
            case exports.TimeParts.seconds:
                seconds--;
                break;
            default:
        }
        if (seconds < 0) {
            seconds = SECONDS_PER_MINUTE;
        }
        if (minutes < 0) {
            minutes = MINUTES_PER_HOUR;
        }
        if (hours < 0) {
            hours = HOURS_PER_DAY;
        }
        return this.getDateFromTimeDigits(hours, minutes, seconds);
    };
    McTimepicker.prototype.getCursorPositionOfPrevTimePartStart = function (cursorPos, timeString) {
        return cursorPos === 0 ? timeString.length : cursorPos - 1;
    };
    McTimepicker.prototype.getCursorPositionOfNextTimePartStart = function (cursorPos, timeString, timeDevider) {
        if (timeDevider === void 0) { timeDevider = ':'; }
        var nextDividerPos = timeString.indexOf(timeDevider, cursorPos);
        return nextDividerPos !== undefined ? nextDividerPos + 1 : 0;
    };
    /**
     * @description Get params for arrow-keys (up/down) time valie edit.
     * @param cursorPosition Current cursor position in timeString
     */
    McTimepicker.prototype.getTimeEditMetrics = function (cursorPosition) {
        var timeString = this.elementRef.nativeElement.value;
        var modifiedTimePart;
        var cursorStartPosition;
        var cursorEndPosition;
        var hoursIndex = 0;
        var minutesIndex = timeString.indexOf(':', hoursIndex + 1);
        var secondsIndex = minutesIndex !== -1 ? timeString.indexOf(':', minutesIndex + 1) : -1;
        if (secondsIndex !== -1 && cursorPosition > secondsIndex) {
            modifiedTimePart = exports.TimeParts.seconds;
            cursorStartPosition = secondsIndex + 1;
            cursorEndPosition = timeString.length;
        }
        else if (minutesIndex !== -1 && cursorPosition > minutesIndex) {
            modifiedTimePart = exports.TimeParts.minutes;
            cursorStartPosition = minutesIndex + 1;
            cursorEndPosition = secondsIndex > -1 ? secondsIndex : timeString.length;
        }
        else {
            modifiedTimePart = exports.TimeParts.hours;
            cursorStartPosition = hoursIndex;
            cursorEndPosition = minutesIndex !== -1 ? minutesIndex : timeString.length;
        }
        return {
            modifiedTimePart: modifiedTimePart,
            cursorStartPosition: cursorStartPosition,
            cursorEndPosition: cursorEndPosition
        };
    };
    /**
     * @description Create time string for displaying inside input element of UI
     */
    McTimepicker.prototype.getTimeStringFromDate = function (tempVal, timeFormat) {
        if (timeFormat === void 0) { timeFormat = DEFAULT_TIME_FORMAT; }
        var _a;
        var hours = this.getNumberWithLeadingZero(tempVal.getHours());
        var minutes = this.getNumberWithLeadingZero(tempVal.getMinutes());
        var seconds = this.getNumberWithLeadingZero(tempVal.getSeconds());
        var formattedTimeGenerators = (_a = {}, _a[exports.TimeFormats.HHmm] = function () { return hours + ":" + minutes; }, _a[exports.TimeFormats.HHmmss] = function () { return hours + ":" + minutes + ":" + seconds; }, _a);
        return formattedTimeGenerators[timeFormat]();
    };
    McTimepicker.prototype.getParsedTimeParts = function (timeString) {
        var hoursAndMinutesAndSeconds = timeString.match(HOURS_MINUTES_SECONDS_REGEXP);
        var hoursAndMinutes = timeString.match(HOURS_MINUTES_REGEXP);
        var hoursOnly = timeString.match(HOURS_ONLY_REGEXP);
        return {
            hoursOnly: hoursOnly,
            hoursAndMinutes: hoursAndMinutes,
            hoursAndMinutesAndSeconds: hoursAndMinutesAndSeconds
        };
    };
    /**
     * @description Create Date object from separate parts of time
     */
    McTimepicker.prototype.getDateFromTimeDigits = function (hours, minutes, seconds) {
        if (seconds === void 0) { seconds = 0; }
        return this.getDateFromTimeString(hours + ":" + minutes + ":" + seconds);
    };
    McTimepicker.prototype.getDateFromTimeString = function (timeString) {
        // TODO Use moment-js
        if (timeString === undefined) {
            return;
        }
        var _a = this.getParsedTimeParts(timeString), hoursOnly = _a.hoursOnly, hoursAndMinutes = _a.hoursAndMinutes, hoursAndMinutesAndSeconds = _a.hoursAndMinutesAndSeconds;
        if (timeString.trim().length === 0 ||
            hoursOnly === null && hoursAndMinutes === null && hoursAndMinutesAndSeconds === null) {
            return;
        }
        // tslint:disable no-magic-numbers
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
        if (hoursOnly) {
            hours = Number(hoursOnly[1]);
        }
        else if (hoursAndMinutes) {
            hours = Number(hoursAndMinutes[1]);
            minutes = Number(hoursAndMinutes[2]);
        }
        else if (hoursAndMinutesAndSeconds) {
            hours = Number(hoursAndMinutesAndSeconds[1]);
            minutes = Number(hoursAndMinutesAndSeconds[2]);
            seconds = Number(hoursAndMinutesAndSeconds[3]);
        }
        // const timestamp: number = Date.parse(fullDateString);
        var resultDate = new Date(1970, 0, 1, hours, minutes, seconds);
        // tslint:enable no-magic-numbers
        return isNaN(resultDate.getTime()) ? undefined : resultDate;
    };
    McTimepicker.prototype.getNumberWithLeadingZero = function (digit) {
        var MAX_DIGIT_WITH_LEADING_ZERO = 9;
        return digit > MAX_DIGIT_WITH_LEADING_ZERO ? "" + digit : "0" + digit;
    };
    McTimepicker.prototype.getTimeDigitsFromDate = function (dateVal) {
        return {
            hours: dateVal.getHours(),
            minutes: dateVal.getMinutes(),
            seconds: dateVal.getSeconds()
        };
    };
    McTimepicker.prototype.parseValidator = function () {
        return this.currentDateTimeInput === undefined ?
            { mcTimepickerParse: { text: this.elementRef.nativeElement.value } } :
            null;
    };
    McTimepicker.prototype.minTimeValidator = function () {
        if (this.currentDateTimeInput !== undefined &&
            this.minDateTime !== undefined &&
            this.isTimeLowerThenMin(this.currentDateTimeInput)) {
            return { mcTimepickerLowerThenMintime: { text: this.elementRef.nativeElement.value } };
        }
        return null;
    };
    McTimepicker.prototype.maxTimeValidator = function () {
        if (this.currentDateTimeInput !== undefined &&
            this.maxDateTime !== undefined &&
            this.isTimeGreaterThenMax(this.currentDateTimeInput)) {
            return { mcTimepickerHigherThenMaxtime: { text: this.elementRef.nativeElement.value } };
        }
        return null;
    };
    McTimepicker.prototype.isTimeLowerThenMin = function (timeToCompare) {
        return timeToCompare.getTime() - this.minDateTime.getTime() < 0;
    };
    McTimepicker.prototype.isTimeGreaterThenMax = function (timeToCompare) {
        return timeToCompare.getTime() - this.maxDateTime.getTime() >= 0;
    };
    var McTimepicker_1;
    __decorate([
        core.Input(),
        __metadata("design:type", ErrorStateMatcher)
    ], McTimepicker.prototype, "errorStateMatcher", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTimepicker.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTimepicker.prototype, "id", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTimepicker.prototype, "placeholder", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTimepicker.prototype, "required", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTimepicker.prototype, "value", null);
    __decorate([
        core.Input('time-format'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTimepicker.prototype, "timeFormat", null);
    __decorate([
        core.Input('min-time'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTimepicker.prototype, "minTime", null);
    __decorate([
        core.Input('max-time'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTimepicker.prototype, "maxTime", null);
    McTimepicker = McTimepicker_1 = __decorate([
        core.Directive({
            selector: 'input[mcTimepicker]',
            exportAs: 'mcTimepickerInput',
            host: {
                class: 'mc-timepicker mc-input',
                // Native input properties that are overwritten by Angular inputs need to be synced with
                // the native input element. Otherwise property bindings for those don't work.
                '[attr.id]': 'id',
                '[attr.placeholder]': 'placeholder',
                '[disabled]': 'disabled',
                '[required]': 'required',
                '[attr.time-format]': 'timeFormat',
                '[attr.min-time]': 'minTime',
                '[attr.max-time]': 'maxTime',
                '[attr.value]': 'value',
                '[attr.aria-invalid]': 'errorState',
                '(blur)': 'onBlur()',
                '(focus)': 'focusChanged(true)',
                '(input)': 'onInput()',
                '(paste)': 'onPaste($event)',
                '(keydown)': 'onKeyDown($event)'
            },
            providers: [
                {
                    provide: forms.NG_VALIDATORS,
                    useValue: ɵ1,
                    multi: true
                },
                {
                    provide: McFormFieldControl,
                    useExisting: core.forwardRef(function () { return McTimepicker_1; })
                }
            ]
        }),
        __param(1, core.Optional()), __param(1, core.Self()),
        __param(2, core.Optional()),
        __param(3, core.Optional()),
        __param(5, core.Optional()), __param(5, core.Self()), __param(5, core.Inject(MC_INPUT_VALUE_ACCESSOR)),
        __metadata("design:paramtypes", [core.ElementRef,
            forms.NgControl,
            forms.NgForm,
            forms.FormGroupDirective,
            ErrorStateMatcher, Object, core.Renderer2])
    ], McTimepicker);
    return McTimepicker;
}(McTimepickerMixinBase));

var McTimepickerModule = /** @class */ (function () {
    function McTimepickerModule() {
    }
    McTimepickerModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                a11y.A11yModule,
                platform.PlatformModule,
                forms.FormsModule
            ],
            declarations: [
                McTimepicker
            ],
            exports: [
                McTimepicker
            ]
        })
    ], McTimepickerModule);
    return McTimepickerModule;
}());

/**
 * Returns an exception to be thrown when attempting to change a select's `multiple` option
 * after initialization.
 * @docs-private
 */
function getMcSelectDynamicMultipleError() {
    return Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * @docs-private
 */
function getMcSelectNonArrayValueError() {
    return Error('Value must be an array in multiple-selection mode.');
}
/**
 * Returns an exception to be thrown when assigning a non-function value to the comparator
 * used to determine if a value corresponds to an option. Note that whether the function
 * actually takes two values and returns a boolean is not checked.
 */
function getMcSelectNonFunctionValueError() {
    return Error('`compareWith` must be a function.');
}

/**
 * The following are all the animations for the mat-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material mat-select animation.
 */
var mcSelectAnimations = {
    /**
     * This animation transforms the select's overlay panel on and off the page.
     *
     * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
     * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
     * side to ensure the option text correctly overlaps the trigger text.
     *
     * When the panel is removed from the DOM, it simply fades out linearly.
     */
    transformPanel: animations.trigger('transformPanel', [
        animations.state('void', animations.style({
            transform: 'scaleY(0)',
            minWidth: '100%',
            opacity: 0
        })),
        animations.transition('void => *', animations.group([
            animations.query('@fadeInContent', animations.animateChild()),
            animations.animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        animations.transition('* => void', [
            animations.animate('250ms 100ms linear', animations.style({ opacity: 0 }))
        ])
    ]),
    /**
     * This animation fades in the background color and text content of the
     * select's options. It is time delayed to occur 100ms after the overlay
     * panel has transformed in.
     */
    fadeInContent: animations.trigger('fadeInContent', [
        animations.state('showing', animations.style({ opacity: 1 })),
        animations.transition('void => showing', [
            animations.style({ opacity: 0 }),
            animations.animate('150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')
        ])
    ])
};

/* tslint:disable:no-empty */
var nextUniqueId$5 = 0;
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The max height of the select's overlay panel */
var SELECT_PANEL_MAX_HEIGHT = 224;
/** The panel's padding on the x-axis */
var SELECT_PANEL_PADDING_X = 1;
/** The panel's x axis padding if it is indented (e.g. there is an option group). */
/* tslint:disable-next-line:no-magic-numbers */
var SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/** The height of the select items in `em` units. */
var SELECT_ITEM_HEIGHT_EM = 2;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
var SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Injection token that determines the scroll handling while a select is open. */
var MC_SELECT_SCROLL_STRATEGY = new core.InjectionToken('mc-select-scroll-strategy');
/** @docs-private */
function MC_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay$$1) {
    return function () { return overlay$$1.scrollStrategies.reposition(); };
}
/** @docs-private */
var MC_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: MC_SELECT_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: MC_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/** Change event object that is emitted when the select value has changed. */
var McSelectChange = /** @class */ (function () {
    function McSelectChange(
    /** Reference to the select that emitted the change event. */
    source, 
    /** Current value of the select that emitted the event. */
    value) {
        this.source = source;
        this.value = value;
    }
    return McSelectChange;
}());
// Boilerplate for applying mixins to McSelect.
/** @docs-private */
var McSelectBase = /** @class */ (function () {
    function McSelectBase(_elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._elementRef = _elementRef;
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return McSelectBase;
}());
var _McSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(McSelectBase)));
/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
var McSelectTrigger = /** @class */ (function () {
    function McSelectTrigger() {
    }
    McSelectTrigger = __decorate([
        core.Directive({ selector: 'mc-select-trigger' })
    ], McSelectTrigger);
    return McSelectTrigger;
}());
var McSelect = /** @class */ (function (_super) {
    __extends(McSelect, _super);
    function McSelect(_viewportRuler, _changeDetectorRef, _ngZone, _renderer, _defaultErrorStateMatcher, elementRef, _dir, _parentForm, _parentFormGroup, _parentFormField, ngControl, tabIndex, _scrollStrategyFactory) {
        var _this = _super.call(this, elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._viewportRuler = _viewportRuler;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._ngZone = _ngZone;
        _this._renderer = _renderer;
        _this._dir = _dir;
        _this._parentFormField = _parentFormField;
        _this.ngControl = ngControl;
        _this._scrollStrategyFactory = _scrollStrategyFactory;
        /** The cached font-size of the trigger element. */
        _this._triggerFontSize = 0;
        /** The IDs of child options to be passed to the aria-owns attribute. */
        _this._optionIds = '';
        /** The value of the select panel's transform-origin property. */
        _this._transformOrigin = 'top';
        /** Whether the panel's animation is done. */
        _this._panelDoneAnimating = false;
        /** Emits when the panel element is finished transforming in. */
        _this._panelDoneAnimatingStream = new rxjs.Subject();
        /** Strategy that will be used to handle scrolling while the select panel is open. */
        _this._scrollStrategy = _this._scrollStrategyFactory();
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        _this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        _this._positions = [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            }
        ];
        /** A name for this control that can be used by `mc-form-field`. */
        _this.controlType = 'mc-select';
        /** Combined stream of all of the child options' change events. */
        _this.optionSelectionChanges = rxjs.defer(function () {
            if (_this.options) {
                return rxjs.merge.apply(void 0, _this.options.map(function (option) { return option.onSelectionChange; }));
            }
            return _this._ngZone.onStable
                .asObservable()
                .pipe(operators.take(1), operators.switchMap(function () { return _this.optionSelectionChanges; }));
        });
        /** Event emitted when the select panel has been toggled. */
        _this.openedChange = new core.EventEmitter();
        /** Event emitted when the select has been opened. */
        _this._openedStream = _this.openedChange.pipe(operators.filter(function (o) { return o; }), operators.map(function () { }));
        /** Event emitted when the select has been closed. */
        _this._closedStream = _this.openedChange.pipe(operators.filter(function (o) { return !o; }), operators.map(function () { }));
        /** Event emitted when the selected value has been changed by the user. */
        _this.selectionChange = new core.EventEmitter();
        /**
         * Event that emits whenever the raw value of the select changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * @docs-private
         */
        _this.valueChange = new core.EventEmitter();
        _this.hiddenItems = 0;
        _this.oneMoreText = '...ещё';
        /** Whether or not the overlay panel is open. */
        _this._panelOpen = false;
        /** Whether filling out the select is required in the form. */
        _this._required = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        _this._scrollTop = 0;
        /** Whether the component is in multiple selection mode. */
        _this._multiple = false;
        /** Unique id for this input. */
        _this._uid = "mc-select-" + nextUniqueId$5++;
        /** Emits whenever the component is destroyed. */
        _this._destroy = new rxjs.Subject();
        _this._focused = false;
        /** `View -> model callback called when value changes` */
        _this._onChange = function () { };
        /** `View -> model callback called when select has been touched` */
        _this._onTouched = function () { };
        /** Comparison function to specify which option is displayed. Defaults to object equality. */
        _this._compareWith = function (o1, o2) { return o1 === o2; };
        if (_this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            _this.ngControl.valueAccessor = _this;
        }
        _this.tabIndex = parseInt(tabIndex) || 0;
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        return _this;
    }
    McSelect_1 = McSelect;
    Object.defineProperty(McSelect.prototype, "focused", {
        /** Whether the select is focused. */
        get: function () {
            return this._focused || this._panelOpen;
        },
        /**
         * @deprecated Setter to be removed as this property is intended to be readonly.
         * @breaking-change 8.0.0
         */
        set: function (value) {
            this._focused = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: function () {
            return this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "required", {
        /** Whether the component is required. */
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coercion.coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "multiple", {
        /** Whether the user should be allowed to select multiple options. */
        get: function () {
            return this._multiple;
        },
        set: function (value) {
            if (this._selectionModel) {
                throw getMcSelectDynamicMultipleError();
            }
            this._multiple = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "compareWith", {
        /**
         * Function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         */
        get: function () {
            return this._compareWith;
        },
        set: function (fn) {
            /* tslint:disable-next-line:strict-type-predicates */
            if (typeof fn !== 'function') {
                throw getMcSelectNonFunctionValueError();
            }
            this._compareWith = fn;
            if (this._selectionModel) {
                // A different comparator means the selection could change.
                this._initializeSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "value", {
        /** Value of the select control. */
        get: function () {
            return this._value;
        },
        set: function (newValue) {
            if (newValue !== this._value) {
                this.writeValue(newValue);
                this._value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value || this._uid;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    McSelect.prototype.ngOnInit = function () {
        var _this = this;
        this._selectionModel = new collections.SelectionModel(this.multiple);
        this.stateChanges.next();
        // We need `distinctUntilChanged` here, because some browsers will
        // fire the animation end event twice for the same animation. See:
        // https://github.com/angular/angular/issues/24084
        this._panelDoneAnimatingStream
            .pipe(operators.distinctUntilChanged(), operators.takeUntil(this._destroy))
            .subscribe(function () {
            if (_this.panelOpen) {
                _this._scrollTop = 0;
                _this.openedChange.emit(true);
            }
            else {
                _this.openedChange.emit(false);
                _this._panelDoneAnimating = false;
                _this.overlayDir.offsetX = 0;
                _this._changeDetectorRef.markForCheck();
            }
        });
    };
    McSelect.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._initKeyManager();
        this._selectionModel.onChange
            .pipe(operators.takeUntil(this._destroy))
            .subscribe(function (event) {
            event.added.forEach(function (option) { return option.select(); });
            event.removed.forEach(function (option) { return option.deselect(); });
        });
        this.options.changes
            .pipe(operators.startWith(null), operators.takeUntil(this._destroy))
            .subscribe(function () {
            _this._resetOptions();
            _this._initializeSelection();
        });
    };
    McSelect.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.tags.changes
            .subscribe(function () {
            setTimeout(function () { return _this._calculateHiddenItems(); }, 0);
        });
    };
    McSelect.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            this.updateErrorState();
        }
    };
    McSelect.prototype.ngOnChanges = function (changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes.disabled) {
            this.stateChanges.next();
        }
    };
    McSelect.prototype.ngOnDestroy = function () {
        this._destroy.next();
        this._destroy.complete();
        this.stateChanges.complete();
    };
    /** Toggles the overlay panel open or closed. */
    McSelect.prototype.toggle = function () {
        if (this.panelOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /** Opens the overlay panel. */
    McSelect.prototype.open = function () {
        var _this = this;
        if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
            return;
        }
        this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
        this._panelOpen = true;
        this._keyManager.withHorizontalOrientation(null);
        this._calculateOverlayPosition();
        this._highlightCorrectOption();
        this._changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this._ngZone.onStable.asObservable()
            .pipe(operators.take(1))
            .subscribe(function () {
            if (_this._triggerFontSize && _this.overlayDir.overlayRef &&
                _this.overlayDir.overlayRef.overlayElement) {
                _this.overlayDir.overlayRef.overlayElement.style.fontSize = _this._triggerFontSize + "px";
            }
        });
    };
    /** Closes the overlay panel and focuses the host element. */
    McSelect.prototype.close = function () {
        if (this._panelOpen) {
            this._panelOpen = false;
            this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
            this._changeDetectorRef.markForCheck();
            this._onTouched();
        }
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    McSelect.prototype.writeValue = function (value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    };
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    McSelect.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    McSelect.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    McSelect.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    Object.defineProperty(McSelect.prototype, "panelOpen", {
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "selected", {
        get: function () {
            return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "triggerValue", {
        get: function () {
            if (this.empty) {
                return '';
            }
            if (this._multiple) {
                var selectedOptions = this._selectionModel.selected.map(function (option) { return option.viewValue; });
                if (this._isRtl()) {
                    selectedOptions.reverse();
                }
                return selectedOptions.join(', ');
            }
            return this._selectionModel.selected[0].viewValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "triggerValues", {
        get: function () {
            if (this.empty) {
                return [];
            }
            if (this._multiple) {
                var selectedOptions = this._selectionModel.selected;
                if (this._isRtl()) {
                    selectedOptions.reverse();
                }
                return selectedOptions;
            }
            return [this._selectionModel.selected[0]];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSelect.prototype, "empty", {
        get: function () {
            return !this._selectionModel || this._selectionModel.isEmpty();
        },
        enumerable: true,
        configurable: true
    });
    McSelect.prototype._isRtl = function () {
        return this._dir ? this._dir.value === 'rtl' : false;
    };
    McSelect.prototype._handleKeydown = function (event) {
        if (!this.disabled) {
            if (this.panelOpen) {
                this._handleOpenKeydown(event);
            }
            else {
                this._handleClosedKeydown(event);
            }
        }
    };
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    McSelect.prototype._onFadeInDone = function () {
        this._panelDoneAnimating = this.panelOpen;
        this._changeDetectorRef.markForCheck();
    };
    McSelect.prototype._onFocus = function () {
        if (!this.disabled) {
            this._focused = true;
            this.stateChanges.next();
        }
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    McSelect.prototype._onBlur = function () {
        this._focused = false;
        if (!this.disabled && !this.panelOpen) {
            this._onTouched();
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    };
    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    McSelect.prototype._onAttached = function () {
        var _this = this;
        this.overlayDir.positionChange
            .pipe(operators.take(1))
            .subscribe(function () {
            _this._changeDetectorRef.detectChanges();
            _this._calculateOverlayOffsetX();
            _this.panel.nativeElement.scrollTop = _this._scrollTop;
        });
    };
    /** Returns the theme to be used on the panel. */
    McSelect.prototype._getPanelTheme = function () {
        return this._parentFormField ? "mc-" + this._parentFormField.color : '';
    };
    /** Focuses the select element. */
    McSelect.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    McSelect.prototype._calculateOverlayScroll = function (selectedIndex, scrollBuffer, maxScroll) {
        var itemHeight = this._getItemHeight();
        var optionOffsetFromScrollTop = itemHeight * selectedIndex;
        /* tslint:disable-next-line:no-magic-numbers */
        var halfOptionHeight = itemHeight / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        var optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
    };
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    McSelect.prototype.onContainerClick = function () {
        this.focus();
        this.open();
    };
    /** Invoked when an option is clicked. */
    McSelect.prototype.onRemoveMatcherItem = function (option, $event) {
        $event.stopPropagation();
        option.deselect();
    };
    Object.defineProperty(McSelect.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        get: function () {
            return this._panelOpen || !this.empty;
        },
        enumerable: true,
        configurable: true
    });
    McSelect.prototype._calculateHiddenItems = function () {
        if (this.empty) {
            return;
        }
        var visibleItems = 0;
        var totalItemsWidth = this._getTotalItemsWidthInMatcher();
        var totalVisibleItemsWidth = 0;
        var itemMargin = 4;
        this.tags.forEach(function (tag) {
            if (tag.nativeElement.offsetTop < tag.nativeElement.offsetHeight) {
                totalVisibleItemsWidth += tag.nativeElement.getBoundingClientRect().width + itemMargin;
                visibleItems++;
            }
        });
        this.hiddenItems = this.selected.length - visibleItems;
        if (this.hiddenItems) {
            var itemsCounter = this.trigger.nativeElement.querySelector('.mc-select__match-hidden-text');
            var matcherList = this.trigger.nativeElement.querySelector('.mc-select__match-list');
            var itemsCounterShowed = itemsCounter.offsetTop < itemsCounter.offsetHeight;
            // const itemsCounterWidth: number = itemsCounter.getBoundingClientRect().width;
            var itemsCounterWidth = 86;
            var matcherListWidth = matcherList.getBoundingClientRect().width;
            var matcherWidth = matcherListWidth + itemsCounterWidth;
            if (itemsCounterShowed && (totalItemsWidth < matcherWidth)) {
                this.hiddenItems = 0;
            }
            if (totalVisibleItemsWidth === matcherListWidth ||
                (totalVisibleItemsWidth + itemsCounterWidth) < matcherListWidth) {
                this._changeDetectorRef.markForCheck();
                return;
            }
            else if (!itemsCounterShowed && (totalItemsWidth + itemsCounterWidth) > matcherWidth) {
                this.hiddenItems++;
            }
        }
        this._changeDetectorRef.markForCheck();
    };
    McSelect.prototype._getTotalItemsWidthInMatcher = function () {
        var triggerClone = this.trigger.nativeElement.cloneNode(true);
        triggerClone.querySelector('.mc-select__match-hidden-text').remove();
        this._renderer.setStyle(triggerClone, 'position', 'absolute');
        this._renderer.setStyle(triggerClone, 'visibility', 'hidden');
        this._renderer.setStyle(triggerClone, 'top', '-100%');
        this._renderer.setStyle(triggerClone, 'left', '0');
        this._renderer.appendChild(this.trigger.nativeElement, triggerClone);
        var totalItemsWidth = 0;
        var itemMargin = 4;
        triggerClone.querySelectorAll('mc-tag').forEach(function (item) {
            totalItemsWidth += item.getBoundingClientRect().width + itemMargin;
        });
        triggerClone.remove();
        return totalItemsWidth;
    };
    /** Handles keyboard events while the select is closed. */
    McSelect.prototype._handleClosedKeydown = function (event) {
        /* tslint:disable-next-line */
        var keyCode = event.keyCode;
        var isArrowKey = keyCode === keycodes.DOWN_ARROW || keyCode === keycodes.UP_ARROW ||
            keyCode === keycodes.LEFT_ARROW || keyCode === keycodes.RIGHT_ARROW;
        var isOpenKey = keyCode === keycodes.ENTER || keyCode === keycodes.SPACE;
        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        }
        else if (!this.multiple) {
            this._keyManager.onKeydown(event);
        }
    };
    /** Handles keyboard events when the selected is open. */
    McSelect.prototype._handleOpenKeydown = function (event) {
        /* tslint:disable-next-line */
        var keyCode = event.keyCode;
        var isArrowKey = keyCode === keycodes.DOWN_ARROW || keyCode === keycodes.UP_ARROW;
        var manager = this._keyManager;
        if (keyCode === keycodes.HOME || keyCode === keycodes.END) {
            event.preventDefault();
            if (keyCode === keycodes.HOME) {
                manager.setFirstItemActive();
            }
            else {
                manager.setLastItemActive();
            }
        }
        else if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        }
        else if ((keyCode === keycodes.ENTER || keyCode === keycodes.SPACE) && manager.activeItem) {
            event.preventDefault();
            manager.activeItem._selectViaInteraction();
        }
        else if (this._multiple && keyCode === keycodes.A && event.ctrlKey) {
            event.preventDefault();
            var hasDeselectedOptions_1 = this.options.some(function (option) { return !option.selected; });
            this.options.forEach(function (option) {
                if (hasDeselectedOptions_1 && !option.disabled) {
                    option.select();
                }
                else {
                    option.deselect();
                }
            });
        }
        else {
            var previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem._selectViaInteraction();
            }
        }
    };
    McSelect.prototype._initializeSelection = function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(function () {
            _this._setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value);
        });
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    McSelect.prototype._setSelectionByValue = function (value) {
        var _this = this;
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw getMcSelectNonArrayValueError();
            }
            this._selectionModel.clear();
            value.forEach(function (currentValue) { return _this._selectValue(currentValue); });
            this._sortValues();
        }
        else {
            this._selectionModel.clear();
            var correspondingOption = this._selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this._keyManager.setActiveItem(correspondingOption);
            }
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    McSelect.prototype._selectValue = function (value) {
        var _this = this;
        var correspondingOption = this.options.find(function (option) {
            try {
                // Treat null as a special reset value.
                return option.value != null && _this._compareWith(option.value, value);
            }
            catch (error) {
                if (core.isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        });
        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    };
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    McSelect.prototype._initKeyManager = function () {
        var _this = this;
        this._keyManager = new a11y.ActiveDescendantKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation()
            .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
        this._keyManager.tabOut
            .pipe(operators.takeUntil(this._destroy))
            .subscribe(function () {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            _this.focus();
            _this.close();
        });
        this._keyManager.change
            .pipe(operators.takeUntil(this._destroy))
            .subscribe(function () {
            if (_this._panelOpen && _this.panel) {
                _this._scrollActiveOptionIntoView();
            }
            else if (!_this._panelOpen && !_this.multiple && _this._keyManager.activeItem) {
                _this._keyManager.activeItem._selectViaInteraction();
            }
        });
    };
    /** Drops current option subscriptions and IDs and resets from scratch. */
    McSelect.prototype._resetOptions = function () {
        var _this = this;
        var changedOrDestroyed = rxjs.merge(this.options.changes, this._destroy);
        this.optionSelectionChanges
            .pipe(operators.takeUntil(changedOrDestroyed))
            .subscribe(function (event) {
            _this._onSelect(event.source, event.isUserInput);
            if (event.isUserInput && !_this.multiple && _this._panelOpen) {
                _this.close();
                _this.focus();
            }
        });
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        rxjs.merge.apply(void 0, this.options.map(function (option) { return option._stateChanges; })).pipe(operators.takeUntil(changedOrDestroyed))
            .subscribe(function () {
            _this._changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        });
        this._setOptionIds();
    };
    /** Invoked when an option is clicked. */
    McSelect.prototype._onSelect = function (option, isUserInput) {
        var wasSelected = this._selectionModel.isSelected(option);
        if (option.value == null && !this._multiple) {
            option.deselect();
            this._selectionModel.clear();
            this._propagateChanges(option.value);
        }
        else {
            if (option.selected) {
                this._selectionModel.select(option);
            }
            else {
                this._selectionModel.deselect(option);
            }
            if (isUserInput) {
                this._keyManager.setActiveItem(option);
            }
            if (this.multiple) {
                this._sortValues();
                if (isUserInput) {
                    // In case the user selected the option with their mouse, we
                    // want to restore focus back to the trigger, in order to
                    // prevent the select keyboard controls from clashing with
                    // the ones from `mc-option`.
                    this.focus();
                }
            }
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
        this.stateChanges.next();
    };
    /** Sorts the selected values in the selected based on their order in the panel. */
    McSelect.prototype._sortValues = function () {
        var _this = this;
        if (this.multiple) {
            var options_1 = this.options.toArray();
            this._selectionModel.sort(function (a, b) {
                return _this.sortComparator ? _this.sortComparator(a, b, options_1) :
                    options_1.indexOf(a) - options_1.indexOf(b);
            });
            this.stateChanges.next();
        }
    };
    /** Emits change event to set the model value. */
    McSelect.prototype._propagateChanges = function (fallbackValue) {
        var valueToEmit = null;
        if (this.multiple) {
            valueToEmit = this.selected.map(function (option) { return option.value; });
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this.selectionChange.emit(new McSelectChange(this, valueToEmit));
        this._changeDetectorRef.markForCheck();
    };
    /** Records option IDs to pass to the aria-owns property. */
    McSelect.prototype._setOptionIds = function () {
        this._optionIds = this.options.map(function (option) { return option.id; }).join(' ');
    };
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    McSelect.prototype._highlightCorrectOption = function () {
        if (this._keyManager) {
            if (this.empty) {
                this._keyManager.setFirstItemActive();
            }
            else {
                this._keyManager.setActiveItem(this._selectionModel.selected[0]);
            }
        }
    };
    /** Scrolls the active option into view. */
    McSelect.prototype._scrollActiveOptionIntoView = function () {
        var activeOptionIndex = this._keyManager.activeItemIndex || 0;
        var labelCount = _countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
        this.panel.nativeElement.scrollTop = _getOptionScrollPosition(activeOptionIndex + labelCount, this._getItemHeight(), this.panel.nativeElement.scrollTop, SELECT_PANEL_MAX_HEIGHT);
    };
    /** Gets the index of the provided option in the option list. */
    McSelect.prototype._getOptionIndex = function (option) {
        /* tslint:disable-next-line */
        return this.options.reduce(function (result, current, index) {
            /* tslint:disable-next-line:strict-type-predicates */
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    };
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    McSelect.prototype._calculateOverlayPosition = function () {
        var itemHeight = this._getItemHeight();
        var items = this._getItemCount();
        var panelHeight = Math.min(items * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        var scrollContainerHeight = items * itemHeight;
        // The farthest the panel can be scrolled before it hits the bottom
        var maxScroll = scrollContainerHeight - panelHeight;
        // If no value is selected we open the popup to the first item.
        var selectedOptionOffset = this.empty ? 0 : this._getOptionIndex(this._selectionModel.selected[0]);
        selectedOptionOffset += _countGroupLabelsBeforeOption(selectedOptionOffset, this.options, this.optionGroups);
        // We must maintain a scroll buffer so the selected option will be scrolled to the
        // center of the overlay panel rather than the top.
        /* tslint:disable-next-line:no-magic-numbers */
        var scrollBuffer = panelHeight / 2;
        this._scrollTop = this._calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
        this._offsetY = this._calculateOverlayOffsetY();
        this._checkOverlayWithinViewport(maxScroll);
    };
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    McSelect.prototype._calculateOverlayOffsetX = function () {
        var overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        var viewportSize = this._viewportRuler.getViewportSize();
        var isRtl = this._isRtl();
        /* tslint:disable-next-line:no-magic-numbers */
        var paddingWidth = SELECT_PANEL_PADDING_X * 2;
        var offsetX;
        var selected = this._selectionModel.selected[0] || this.options.first;
        offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        var leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        var rightOverflow = overlayRect.right + offsetX - viewportSize.width
            + (isRtl ? 0 : paddingWidth);
        // If the element overflows on either side, reduce the offset to allow it to fit.
        if (leftOverflow > 0) {
            offsetX += leftOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        else if (rightOverflow > 0) {
            offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors. Round the value to avoid
        // blurry content in some browsers.
        this.overlayDir.offsetX = Math.round(offsetX);
        this.overlayDir.overlayRef.updatePosition();
    };
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    McSelect.prototype._calculateOverlayOffsetY = function () {
        // const itemHeight = this._getItemHeight();
        // const optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        // todo I'm not sure that we will use it
        return 0;
        // return Math.round(-optionHeightAdjustment);
    };
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    McSelect.prototype._checkOverlayWithinViewport = function (maxScroll) {
        var itemHeight = this._getItemHeight();
        var viewportSize = this._viewportRuler.getViewportSize();
        var topSpaceAvailable = this._triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        var bottomSpaceAvailable = viewportSize.height - this._triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        var panelHeightTop = Math.abs(this._offsetY);
        var totalPanelHeight = Math.min(this._getItemCount() * itemHeight, SELECT_PANEL_MAX_HEIGHT);
        var panelHeightBottom = totalPanelHeight - panelHeightTop - this._triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    };
    /** Adjusts the overlay panel up to fit in the viewport. */
    McSelect.prototype._adjustPanelUp = function (panelHeightBottom, bottomSpaceAvailable) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        var distanceBelowViewport = Math.round(panelHeightBottom - bottomSpaceAvailable);
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = "50% bottom 0px";
        }
    };
    /** Adjusts the overlay panel down to fit in the viewport. */
    McSelect.prototype._adjustPanelDown = function (panelHeightTop, topSpaceAvailable, maxScroll) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        var distanceAboveViewport = Math.round(panelHeightTop - topSpaceAvailable);
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = "50% top 0px";
            return;
        }
    };
    /** Sets the transform origin point based on the selected option. */
    McSelect.prototype._getOriginBasedOnOption = function () {
        var itemHeight = this._getItemHeight();
        /* tslint:disable-next-line:no-magic-numbers */
        var optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        /* tslint:disable-next-line:no-magic-numbers */
        var originY = Math.abs(this._offsetY) - optionHeightAdjustment + itemHeight / 2;
        return "50% " + originY + "px 0px";
    };
    /** Calculates the amount of items in the select. This includes options and group labels. */
    McSelect.prototype._getItemCount = function () {
        return this.options.length + this.optionGroups.length;
    };
    /** Calculates the height of the select's options. */
    McSelect.prototype._getItemHeight = function () {
        /* tslint:disable-next-line:no-magic-numbers */
        return 32;
        // return this._triggerFontSize * SELECT_ITEM_HEIGHT_EM;
    };
    var McSelect_1;
    __decorate([
        core.ViewChild('trigger'),
        __metadata("design:type", core.ElementRef)
    ], McSelect.prototype, "trigger", void 0);
    __decorate([
        core.ViewChildren(McTag),
        __metadata("design:type", core.QueryList)
    ], McSelect.prototype, "tags", void 0);
    __decorate([
        core.ViewChild('panel'),
        __metadata("design:type", core.ElementRef)
    ], McSelect.prototype, "panel", void 0);
    __decorate([
        core.ViewChild(overlay.CdkConnectedOverlay),
        __metadata("design:type", overlay.CdkConnectedOverlay)
    ], McSelect.prototype, "overlayDir", void 0);
    __decorate([
        core.ContentChildren(McOption, { descendants: true }),
        __metadata("design:type", core.QueryList)
    ], McSelect.prototype, "options", void 0);
    __decorate([
        core.ContentChildren(McOptgroup),
        __metadata("design:type", core.QueryList)
    ], McSelect.prototype, "optionGroups", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McSelect.prototype, "panelClass", void 0);
    __decorate([
        core.ContentChild(McSelectTrigger),
        __metadata("design:type", McSelectTrigger)
    ], McSelect.prototype, "customTrigger", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McSelect.prototype, "placeholder", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSelect.prototype, "required", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSelect.prototype, "multiple", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function])
    ], McSelect.prototype, "compareWith", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McSelect.prototype, "value", null);
    __decorate([
        core.Input(),
        __metadata("design:type", ErrorStateMatcher)
    ], McSelect.prototype, "errorStateMatcher", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Function)
    ], McSelect.prototype, "sortComparator", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McSelect.prototype, "id", null);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McSelect.prototype, "openedChange", void 0);
    __decorate([
        core.Output('opened'),
        __metadata("design:type", rxjs.Observable)
    ], McSelect.prototype, "_openedStream", void 0);
    __decorate([
        core.Output('closed'),
        __metadata("design:type", rxjs.Observable)
    ], McSelect.prototype, "_closedStream", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McSelect.prototype, "selectionChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McSelect.prototype, "valueChange", void 0);
    McSelect = McSelect_1 = __decorate([
        core.Component({
            selector: 'mc-select',
            exportAs: 'mcSelect',
            template: "<div cdk-overlay-origin class=\"mc-select__trigger\" (click)=\"toggle()\" [class.mc-select__trigger_multiple]=\"multiple\" #origin=\"cdkOverlayOrigin\" #trigger><div class=\"mc-select__matcher\" [ngSwitch]=\"empty\"><span class=\"mc-select__placeholder\" *ngSwitchCase=\"true\">{{ placeholder || '\u00A0' }}</span> <span *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\"><div *ngSwitchDefault [ngSwitch]=\"multiple\" class=\"mc-select__match-container\"><span *ngSwitchCase=\"false\" class=\"mc-select__matcher-text\">{{ triggerValue }}</span><div *ngSwitchCase=\"true\" class=\"mc-select__match-list\"><mc-tag *ngFor=\"let option of triggerValues\" [disabled]=\"disabled\" [class.mc-error]=\"errorState\">{{ option.viewValue || option.value }} <i mc-icon=\"mc-close-S_16\" (click)=\"onRemoveMatcherItem(option, $event)\"></i></mc-tag></div><div class=\"mc-select__match-hidden-text\" [style.display]=\"hiddenItems > 0 ? 'block' : 'none'\">{{ oneMoreText }} {{ hiddenItems }}</div></div><ng-content select=\"mc-select-trigger\" *ngSwitchCase=\"true\"></ng-content></span></div><div class=\"mc-select__arrow-wrapper\"><i class=\"mc-select__arrow\" mc-icon=\"mc-angle-down-L_16\" color=\"second\"></i></div></div><ng-template cdk-connected-overlay cdkConnectedOverlayLockPosition cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\" [cdkConnectedOverlayScrollStrategy]=\"_scrollStrategy\" [cdkConnectedOverlayOrigin]=\"origin\" [cdkConnectedOverlayOpen]=\"panelOpen\" [cdkConnectedOverlayPositions]=\"_positions\" [cdkConnectedOverlayMinWidth]=\"_triggerRect?.width\" [cdkConnectedOverlayOffsetY]=\"_offsetY\" (backdropClick)=\"close()\" (attach)=\"_onAttached()\" (detach)=\"close()\"><div #panel class=\"mc-select__panel {{ _getPanelTheme() }}\" [ngClass]=\"panelClass\" (@transformPanel.done)=\"_panelDoneAnimatingStream.next($event.toState)\" [style.transformOrigin]=\"_transformOrigin\" [class.mc-select-panel-done-animcing]=\"_panelDoneAnimating\" [style.font-size.px]=\"_triggerFontSize\" (keydown)=\"_handleKeydown($event)\"><div class=\"mc-select__content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"><ng-content></ng-content></div></div></ng-template>",
            styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-select{box-sizing:border-box;display:inline-block;width:100%;outline:0}.mc-select.mc-disabled .mc-select__trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mc-select__trigger{display:flex;box-sizing:border-box;position:relative;height:30px;cursor:pointer;padding:3px 7px 3px 15px}.mc-select__trigger.mc-select__trigger_multiple{padding-left:7px}.mc-select__matcher{display:flex;align-items:center;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-select__matcher>span{width:100%}.mc-select__match-list{display:flex;flex-wrap:wrap;overflow:hidden;max-height:24px;margin:0;padding-left:0}.mc-select__match-list .mc-tag{margin-right:4px}.mc-select__match-container{display:flex;flex-direction:row;justify-content:space-between;width:100%}.mc-select__match-container .mc-select__match-hidden-text{flex:0 0 70px;align-self:center;padding:0 8px;text-align:right}.mc-select__match-item{display:flex;border:1px solid transparent;border-radius:3px;padding-left:7px;margin-right:4px;max-width:100%}.mc-select__arrow-wrapper{display:table-cell;vertical-align:middle}.mc-form-field-appearance-fill .mc-select__arrow-wrapper,.mc-form-field-appearance-standard .mc-select__arrow-wrapper{transform:translateY(-50%)}.mc-form-field-appearance-outline .mc-select__arrow-wrapper{transform:translateY(-25%)}.mc-select__panel{max-height:224px;min-width:100%;overflow:auto;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-select__content{height:100%}.mc-select__panel .mc-optgroup-label,.mc-select__panel .mc-option{font-size:inherit;line-height:32px;height:32px}.mc-form-field-type-mc-select:not(.mc-disabled) .mc-form-field-flex{cursor:pointer}.mc-form-field-type-mc-select .mc-form-field-label{width:calc(100% - 18px)}"],
            inputs: ['disabled', 'tabIndex'],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                '[attr.id]': 'id',
                '[attr.tabindex]': 'tabIndex',
                class: 'mc-select',
                '[class.mc-disabled]': 'disabled',
                '[class.mc-select-invalid]': 'errorState',
                '[class.mc-select-required]': 'required',
                '(keydown)': '_handleKeydown($event)',
                '(focus)': '_onFocus()',
                '(blur)': '_onBlur()',
                '(window:resize)': '_calculateHiddenItems()'
            },
            animations: [
                mcSelectAnimations.transformPanel,
                mcSelectAnimations.fadeInContent
            ],
            providers: [
                { provide: McFormFieldControl, useExisting: McSelect_1 },
                { provide: MC_OPTION_PARENT_COMPONENT, useExisting: McSelect_1 }
            ]
        }),
        __param(6, core.Optional()),
        __param(7, core.Optional()),
        __param(8, core.Optional()),
        __param(9, core.Optional()),
        __param(10, core.Self()), __param(10, core.Optional()),
        __param(11, core.Attribute('tabindex')),
        __param(12, core.Inject(MC_SELECT_SCROLL_STRATEGY)),
        __metadata("design:paramtypes", [overlay.ViewportRuler,
            core.ChangeDetectorRef,
            core.NgZone,
            core.Renderer2,
            ErrorStateMatcher,
            core.ElementRef,
            bidi.Directionality,
            forms.NgForm,
            forms.FormGroupDirective,
            McFormField,
            forms.NgControl, String, Object])
    ], McSelect);
    return McSelect;
}(_McSelectMixinBase));

var McSelectModule = /** @class */ (function () {
    function McSelectModule() {
    }
    McSelectModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                overlay.OverlayModule,
                McOptionModule,
                McIconModule,
                McTagModule
            ],
            exports: [McFormFieldModule, McSelect, McSelectTrigger, McOptionModule, common.CommonModule],
            declarations: [McSelect, McSelectTrigger],
            providers: [MC_SELECT_SCROLL_STRATEGY_PROVIDER]
        })
    ], McSelectModule);
    return McSelectModule;
}());

/** Injection token that can be used to access the data that was passed in to a sidepanel. */
var MC_SIDEPANEL_DATA = new core.InjectionToken('McSidepanelData');

(function (McSidepanelPosition) {
    McSidepanelPosition["Right"] = "right";
    McSidepanelPosition["Left"] = "left";
    McSidepanelPosition["Top"] = "top";
    McSidepanelPosition["Bottom"] = "bottom";
})(exports.McSidepanelPosition || (exports.McSidepanelPosition = {}));
var McSidepanelConfig = /** @class */ (function () {
    function McSidepanelConfig() {
        /** Data being injected into the child component. */
        this.data = null;
        this.position = exports.McSidepanelPosition.Right;
        /** Whether the sidepanel has a backdrop. */
        this.hasBackdrop = true;
        /** When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true. */
        this.requiredBackdrop = false;
        /** Whether the user can use escape or clicking outside to close the sidepanel. */
        this.disableClose = false;
        /** Custom class for the overlay pane. */
        this.overlayPanelClass = '';
    }
    return McSidepanelConfig;
}());

var McSidepanelAnimationState;
(function (McSidepanelAnimationState) {
    McSidepanelAnimationState["Void"] = "void";
    McSidepanelAnimationState["Visible"] = "visible";
    McSidepanelAnimationState["Hidden"] = "hidden";
})(McSidepanelAnimationState || (McSidepanelAnimationState = {}));
// TODO Find a way to use dynamic keys and avoid error "Expression form not supported."
// tslint:disable-next-line
var mcSidepanelTransformAnimation = {
    right: { in: 'translateX(100%)', out: 'translateX(0%)' },
    left: { in: 'translateX(-100%)', out: 'translateX(0%)' },
    top: { in: 'translateY(-100%)', out: 'translateY(0%)' },
    bottom: { in: 'translateY(100%)', out: 'translateY(0%)' }
};
var mcSidepanelAnimations = {
    sidepanelState: animations.trigger('state', [
        animations.state('hidden', animations.style({ transform: '{{transformIn}}' }), { params: { transformIn: mcSidepanelTransformAnimation[exports.McSidepanelPosition.Right].in } }),
        animations.state('visible', animations.style({ transform: '{{transformOut}}' }), { params: { transformOut: mcSidepanelTransformAnimation[exports.McSidepanelPosition.Right].out } }),
        animations.transition('visible => void, visible => hidden', animations.animate("200ms " + exports.AnimationCurves.AccelerationCurve)),
        animations.transition('void => visible', animations.animate("200ms " + exports.AnimationCurves.DecelerationCurve))
    ])
};

var MC_SIDEPANEL_WITH_INDENT = new core.InjectionToken('mc-sidepanel-with-indent');
var MC_SIDEPANEL_WITH_SHADOW = new core.InjectionToken('mc-sidepanel-with-shadow');
var McSidepanelContainerComponent = /** @class */ (function (_super) {
    __extends(McSidepanelContainerComponent, _super);
    function McSidepanelContainerComponent(elementRef, changeDetectorRef, sidepanelConfig, withIndent, withShadow) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.sidepanelConfig = sidepanelConfig;
        _this.withIndent = withIndent;
        _this.withShadow = withShadow;
        /** The state of the sidepanel animations. */
        _this.animationState = McSidepanelAnimationState.Void;
        /** Emits whenever the state of the animation changes. */
        _this.animationStateChanged = new core.EventEmitter();
        return _this;
    }
    McSidepanelContainerComponent.prototype.ngOnDestroy = function () {
        this.destroyed = true;
    };
    /** Attach a component portal as content to this sidepanel container. */
    McSidepanelContainerComponent.prototype.attachComponentPortal = function (portal$$1) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachComponentPortal(portal$$1);
    };
    /** Attach a template portal as content to this sidepanel container. */
    McSidepanelContainerComponent.prototype.attachTemplatePortal = function (portal$$1) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachTemplatePortal(portal$$1);
    };
    /** Begin animation of the sidepanel entrance into view. */
    McSidepanelContainerComponent.prototype.enter = function () {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Visible;
            this.changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the sidepanel exiting from view. */
    McSidepanelContainerComponent.prototype.exit = function () {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Hidden;
            this.changeDetectorRef.markForCheck();
        }
    };
    McSidepanelContainerComponent.prototype.onAnimation = function (event) {
        this.animationStateChanged.emit(event);
    };
    McSidepanelContainerComponent.prototype.setAnimation = function () {
        var position = this.sidepanelConfig.position;
        this.animationTransform = {
            transformIn: mcSidepanelTransformAnimation[position].in,
            transformOut: mcSidepanelTransformAnimation[position].out
        };
    };
    McSidepanelContainerComponent.prototype.setPanelClass = function () {
        var element = this.elementRef.nativeElement;
        var position = this.sidepanelConfig.position;
        element.classList.add("mc-sidepanel-container_" + position);
        if (this.withShadow) {
            element.classList.add('mc-sidepanel-container_shadowed');
        }
    };
    McSidepanelContainerComponent.prototype.validatePortalAttached = function () {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    };
    __decorate([
        core.ViewChild(portal.CdkPortalOutlet),
        __metadata("design:type", portal.CdkPortalOutlet)
    ], McSidepanelContainerComponent.prototype, "portalOutlet", void 0);
    McSidepanelContainerComponent = __decorate([
        core.Component({
            selector: 'mc-sidepanel-container',
            template: "<div class=\"mc-sidepanel-wrapper\"><div class=\"mc-sidepanel-indent\" *ngIf=\"withIndent\"><button mcSidepanelClose></button></div><div class=\"mc-sidepanel-content\"><ng-template cdkPortalOutlet></ng-template></div></div>",
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-sidepanel-container{outline:0;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translateX(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translateX(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_bottom,.mc-sidepanel-container_top{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_bottom .mc-sidepanel-indent,.mc-sidepanel-container_top .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0 0 0 8px}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            animations: [mcSidepanelAnimations.sidepanelState],
            host: {
                class: 'mc-sidepanel-container',
                tabindex: '-1',
                role: 'dialog',
                'aria-modal': 'true',
                '[attr.id]': 'id',
                '[@state]': "{\n            value: animationState,\n            params: animationTransform\n        }",
                '(@state.start)': 'onAnimation($event)',
                '(@state.done)': 'onAnimation($event)'
            }
        }),
        __param(3, core.Inject(MC_SIDEPANEL_WITH_INDENT)),
        __param(4, core.Inject(MC_SIDEPANEL_WITH_SHADOW)),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef,
            McSidepanelConfig, Boolean, Boolean])
    ], McSidepanelContainerComponent);
    return McSidepanelContainerComponent;
}(portal.BasePortalOutlet));

// Counter for unique sidepanel ids.
var uniqueId = 0;
var McSidepanelRef = /** @class */ (function () {
    function McSidepanelRef(containerInstance, overlayRef, config) {
        var _this = this;
        this.containerInstance = containerInstance;
        this.overlayRef = overlayRef;
        this.config = config;
        /** Subject for notifying the user that the sidepanel has been closed and dismissed. */
        this.afterClosed$ = new rxjs.Subject();
        /** Subject for notifying the user that the sidepanel has opened and appeared. */
        this.afterOpened$ = new rxjs.Subject();
        this.id = this.config.id || "mc-sidepanel-" + uniqueId++;
        this.containerInstance.id = this.id;
        // Emit when opening animation completes
        containerInstance.animationStateChanged.pipe(operators.filter(function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Visible; }), operators.take(1)).subscribe(function () {
            _this.afterOpened$.next();
            _this.afterOpened$.complete();
        });
        // Dispose overlay when closing animation is complete
        containerInstance.animationStateChanged.pipe(operators.filter(function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Hidden; }), operators.take(1)).subscribe(function () {
            overlayRef.dispose();
            _this.afterClosed$.next(_this.result);
            _this.afterClosed$.complete();
        });
        if (!containerInstance.sidepanelConfig.disableClose) {
            rxjs.merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(
            // tslint:disable:deprecation
            // keyCode is deprecated, but IE11 and Edge don't support code property, which we need use instead
            operators.filter(function (event) { return event.keyCode === keycodes.ESCAPE; }))).subscribe(function () { return _this.close(); });
        }
    }
    McSidepanelRef.prototype.close = function (result) {
        var _this = this;
        if (!this.afterClosed$.closed) {
            // Transition the backdrop in parallel to the sidepanel.
            this.containerInstance.animationStateChanged.pipe(operators.filter(function (event) { return event.phaseName === 'done'; }), operators.take(1)).subscribe(function () { return _this.overlayRef.detachBackdrop(); });
            this.result = result;
            this.containerInstance.exit();
        }
    };
    /** Gets an observable that is notified when the sidepanel is finished closing. */
    McSidepanelRef.prototype.afterClosed = function () {
        return this.afterClosed$.asObservable();
    };
    /** Gets an observable that is notified when the sidepanel has opened and appeared. */
    McSidepanelRef.prototype.afterOpened = function () {
        return this.afterOpened$.asObservable();
    };
    return McSidepanelRef;
}());

/** Injection token that can be used to specify default sidepanel options. */
var MC_SIDEPANEL_DEFAULT_OPTIONS = new core.InjectionToken('mc-sidepanel-default-options');
var McSidepanelService = /** @class */ (function () {
    function McSidepanelService(overlay$$1, injector, defaultOptions, parentSidepanelService) {
        this.overlay = overlay$$1;
        this.injector = injector;
        this.defaultOptions = defaultOptions;
        this.parentSidepanelService = parentSidepanelService;
        this.openedSidepanelsAtThisLevel = [];
    }
    Object.defineProperty(McSidepanelService.prototype, "openedSidepanels", {
        /** Keeps track of the currently-open sidepanels. */
        get: function () {
            return this.parentSidepanelService ? this.parentSidepanelService.openedSidepanels :
                this.openedSidepanelsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    McSidepanelService.prototype.ngOnDestroy = function () {
        // Only close the sidepanels at this level on destroy
        // since the parent service may still be active.
        this.closeSidepanels(this.openedSidepanelsAtThisLevel);
    };
    McSidepanelService.prototype.open = function (componentOrTemplateRef, config) {
        var _this = this;
        var fullConfig = __assign({}, (this.defaultOptions || new McSidepanelConfig()), config);
        if (fullConfig.id && this.getSidepanelById(fullConfig.id)) {
            throw Error("Sidepanel with id \"" + fullConfig.id + "\" exists already. The sidepanel id must be unique.");
        }
        var overlayRef = this.createOverlay(fullConfig);
        var container = this.attachContainer(overlayRef, fullConfig);
        var ref = new McSidepanelRef(container, overlayRef, fullConfig);
        if (componentOrTemplateRef instanceof core.TemplateRef) {
            container.attachTemplatePortal(new portal.TemplatePortal(componentOrTemplateRef, null, {
                $implicit: fullConfig.data,
                sidepanelRef: ref
            }));
        }
        else {
            var injector = this.createInjector(fullConfig, ref, container);
            var portal$$1 = new portal.ComponentPortal(componentOrTemplateRef, undefined, injector);
            var contentRef = container.attachComponentPortal(portal$$1);
            ref.instance = contentRef.instance;
        }
        this.openedSidepanels.push(ref);
        ref.afterClosed().subscribe(function () { return _this.removeOpenSidepanel(ref); });
        container.enter();
        return ref;
    };
    /**
     * Closes all of the currently-open sidepanels.
     */
    McSidepanelService.prototype.closeAll = function () {
        this.closeSidepanels(this.openedSidepanels);
    };
    /**
     * Finds an open sidepanel by its id.
     * @param id ID to use when looking up the sidepanel.
     */
    McSidepanelService.prototype.getSidepanelById = function (id) {
        return this.openedSidepanels.find(function (sidepanel) { return sidepanel.id === id; });
    };
    /**
     * Attaches the sidepanel container component to the overlay.
     */
    McSidepanelService.prototype.attachContainer = function (overlayRef, config) {
        var openedSidepanelsWithSamePosition = this.getOpenedSidepanelsWithSamePosition(config);
        var injector = new portal.PortalInjector(this.injector, new WeakMap([
            [McSidepanelConfig, config],
            [MC_SIDEPANEL_WITH_INDENT, openedSidepanelsWithSamePosition.length >= 1],
            [MC_SIDEPANEL_WITH_SHADOW, openedSidepanelsWithSamePosition.length < 2] // tslint:disable-line
        ]));
        var containerPortal = new portal.ComponentPortal(McSidepanelContainerComponent, undefined, injector);
        var containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    };
    /**
     * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
     * of a sidepanel to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the sidepanel.
     * @param sidepanelRef Reference to the sidepanel.
     * @param sidepanelContainer Sidepanel container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the sidepanel.
     */
    McSidepanelService.prototype.createInjector = function (config, sidepanelRef, sidepanelContainer) {
        // The McSidepanelContainerComponent is injected in the portal as the McSidepanelContainerComponent and
        // the sidepanel's content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the McSidepanelContainerComponent is explicitly
        // added to the injection tokens.
        var injectionTokens = new WeakMap([
            [McSidepanelContainerComponent, sidepanelContainer],
            [MC_SIDEPANEL_DATA, config.data],
            [McSidepanelRef, sidepanelRef]
        ]);
        return new portal.PortalInjector(this.injector, injectionTokens);
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified sidepanel config.
     */
    McSidepanelService.prototype.createOverlay = function (config) {
        var overlayConfig = new overlay.OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: this.getBackdropClass(config),
            maxWidth: '100%',
            panelClass: config.overlayPanelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global()
        });
        return this.overlay.create(overlayConfig);
    };
    McSidepanelService.prototype.closeSidepanels = function (sidepanels) {
        var reversedOpenedSidepanels = sidepanels.reverse().slice();
        reversedOpenedSidepanels.forEach(function (sidepanelRef) {
            sidepanelRef.close();
        });
    };
    McSidepanelService.prototype.getBackdropClass = function (config) {
        var hasOpenedSidepanelWithBackdrop = this.openedSidepanels.some(function (sidepanelRef) { return sidepanelRef.config.hasBackdrop; });
        return config.requiredBackdrop || !hasOpenedSidepanelWithBackdrop ? 'cdk-overlay-dark-backdrop' :
            'cdk-overlay-transparent-backdrop';
    };
    McSidepanelService.prototype.getOpenedSidepanelsWithSamePosition = function (config) {
        return this.openedSidepanels.filter(function (sidepanelRef) { return sidepanelRef.config.position === config.position; });
    };
    /**
     * Removes a sidepanel from the array of open sidepanels.
     * @param sidepanelRef Sidepanel to be removed.
     */
    McSidepanelService.prototype.removeOpenSidepanel = function (sidepanelRef) {
        var index = this.openedSidepanels.indexOf(sidepanelRef);
        if (index > -1) {
            this.openedSidepanels.splice(index, 1);
        }
    };
    McSidepanelService = __decorate([
        core.Injectable(),
        __param(2, core.Optional()), __param(2, core.Inject(MC_SIDEPANEL_DEFAULT_OPTIONS)),
        __param(3, core.Optional()), __param(3, core.SkipSelf()),
        __metadata("design:paramtypes", [overlay.Overlay,
            core.Injector,
            McSidepanelConfig,
            McSidepanelService])
    ], McSidepanelService);
    return McSidepanelService;
}());

/**
 * Button that will close the current sidepanel.
 */
var McSidepanelClose = /** @class */ (function () {
    function McSidepanelClose(sidepanelRef, elementRef, sidepanelService) {
        this.sidepanelRef = sidepanelRef;
        this.elementRef = elementRef;
        this.sidepanelService = sidepanelService;
    }
    McSidepanelClose.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.sidepanelRef) {
            // When this directive is included in a sidepanel via TemplateRef (rather than being
            // in a Component), the SidepanelRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the SidepanelRef by
            // ID.
            // This must occur in `onInit`, as the ID binding for the sidepanel container won't
            // be resolved at constructor time. We use setTimeout by same reason.
            setTimeout(function () {
                _this.sidepanelRef = getClosestSidepanel(_this.elementRef, _this.sidepanelService.openedSidepanels);
            });
        }
    };
    McSidepanelClose.prototype.ngOnChanges = function (changes) {
        var proxiedChange = changes.mcSidepanelClose || changes.sidepanelResult;
        if (proxiedChange) {
            this.sidepanelResult = proxiedChange.currentValue;
        }
    };
    __decorate([
        core.Input('mc-sidepanel-close'),
        __metadata("design:type", Object)
    ], McSidepanelClose.prototype, "sidepanelResult", void 0);
    __decorate([
        core.Input('mcSidepanelClose'),
        __metadata("design:type", Object)
    ], McSidepanelClose.prototype, "mcSidepanelClose", void 0);
    McSidepanelClose = __decorate([
        core.Directive({
            selector: 'button[mc-sidepanel-close], button[mcSidepanelClose]',
            host: {
                '(click)': 'sidepanelRef.close(sidepanelResult)',
                class: 'mc-sidepanel-close',
                type: 'button'
            }
        }),
        __param(0, core.Optional()),
        __metadata("design:paramtypes", [McSidepanelRef,
            core.ElementRef,
            McSidepanelService])
    ], McSidepanelClose);
    return McSidepanelClose;
}());
/**
 * Header of a sidepanel.
 */
var McSidepanelHeader = /** @class */ (function () {
    function McSidepanelHeader() {
    }
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McSidepanelHeader.prototype, "closeable", void 0);
    McSidepanelHeader = __decorate([
        core.Component({
            selector: 'mc-sidepanel-header',
            template: "\n        <div class=\"mc-sidepanel-title\">\n            <ng-content></ng-content>\n        </div>\n        <button *ngIf=\"closeable\" mc-sidepanel-close>\n            <span class=\"mc-sidepanel-close-x\">\n                <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n            </span>\n        </button>\n    ",
            host: {
                class: 'mc-sidepanel-header'
            }
        })
    ], McSidepanelHeader);
    return McSidepanelHeader;
}());
/**
 * Scrollable content container of a sidepanel.
 */
var McSidepanelBody = /** @class */ (function () {
    function McSidepanelBody() {
    }
    McSidepanelBody = __decorate([
        core.Directive({
            selector: 'mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody',
            host: {
                class: 'mc-sidepanel-body'
            }
        })
    ], McSidepanelBody);
    return McSidepanelBody;
}());
/**
 * Footer of a sidepanel.
 */
var McSidepanelFooter = /** @class */ (function () {
    function McSidepanelFooter() {
    }
    McSidepanelFooter = __decorate([
        core.Directive({
            selector: 'mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter',
            host: {
                class: 'mc-sidepanel-footer'
            }
        })
    ], McSidepanelFooter);
    return McSidepanelFooter;
}());
/**
 * Actions block of a sidepanel footer.
 */
var McSidepanelActions = /** @class */ (function () {
    function McSidepanelActions() {
    }
    McSidepanelActions = __decorate([
        core.Directive({
            selector: 'mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions',
            host: {
                class: 'mc-sidepanel-actions'
            }
        })
    ], McSidepanelActions);
    return McSidepanelActions;
}());
/**
 * Finds the closest McSidepanelRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a sidepanel.
 * @param openSidepanels References to the currently-open sidepanels.
 */
function getClosestSidepanel(element, openSidepanels) {
    var parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mc-sidepanel-container')) {
        parent = parent.parentElement;
    }
    return parent ? openSidepanels.find(function (sidepanel) { return sidepanel.id === parent.id; }) : null;
}

var McSidepanelModule = /** @class */ (function () {
    function McSidepanelModule() {
    }
    McSidepanelModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                overlay.OverlayModule,
                portal.PortalModule,
                McCommonModule,
                McIconModule
            ],
            providers: [McSidepanelService],
            declarations: [
                McSidepanelContainerComponent,
                McSidepanelClose,
                McSidepanelHeader,
                McSidepanelBody,
                McSidepanelFooter,
                McSidepanelActions
            ],
            entryComponents: [McSidepanelContainerComponent],
            exports: [
                McSidepanelContainerComponent,
                McSidepanelClose,
                McSidepanelHeader,
                McSidepanelBody,
                McSidepanelFooter,
                McSidepanelActions
            ]
        })
    ], McSidepanelModule);
    return McSidepanelModule;
}());

var McSplitterComponent = /** @class */ (function () {
    function McSplitterComponent(elementRef, ngZone, renderer) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.areas = [];
        this._disabled = false;
        this._gutterSize = 6;
        this.isDragging = false;
        this.areaPositionDivider = 2;
        this.listeners = [];
    }
    Object.defineProperty(McSplitterComponent.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSplitterComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = coercion.coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSplitterComponent.prototype, "gutterSize", {
        get: function () {
            return this._gutterSize;
        },
        set: function (gutterSize) {
            var size = coercion.coerceNumberProperty(gutterSize);
            this._gutterSize = size > 0 ? size : this.gutterSize;
        },
        enumerable: true,
        configurable: true
    });
    McSplitterComponent.prototype.addArea = function (area) {
        var index = this.areas.length;
        var order = index * this.areaPositionDivider;
        var size = area.getSize();
        area.setOrder(order);
        this.areas.push({
            area: area,
            index: index,
            order: order,
            initialSize: size
        });
    };
    McSplitterComponent.prototype.ngOnInit = function () {
        if (!this.direction) {
            this.direction = "horizontal" /* Horizontal */;
        }
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'column' : 'row');
    };
    McSplitterComponent.prototype.onMouseDown = function (event, leftAreaIndex, rightAreaIndex) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        var leftArea = this.areas[leftAreaIndex];
        var rightArea = this.areas[rightAreaIndex];
        var startPoint = {
            x: event.screenX,
            y: event.screenY
        };
        leftArea.initialSize = leftArea.area.getSize();
        rightArea.initialSize = rightArea.area.getSize();
        this.areas.forEach(function (item) {
            var size = item.area.getSize();
            item.area.disableFlex();
            item.area.setSize(size);
        });
        this.ngZone.runOutsideAngular(function () {
            _this.listeners.push(_this.renderer.listen('document', 'mouseup', function () { return _this.onMouseUp(); }));
        });
        this.ngZone.runOutsideAngular(function () {
            _this.listeners.push(_this.renderer.listen('document', 'mousemove', function (e) { return _this.onMouseMove(e, startPoint, leftArea, rightArea); }));
        });
        this.isDragging = true;
    };
    McSplitterComponent.prototype.removeArea = function (area) {
        var indexToRemove = -1;
        this.areas.some(function (item, index) {
            if (item.area === area) {
                indexToRemove = index;
                return true;
            }
            return false;
        });
        if (indexToRemove === -1) {
            return;
        }
        this.areas.splice(indexToRemove, 1);
    };
    McSplitterComponent.prototype.isVertical = function () {
        return this.direction === "vertical" /* Vertical */;
    };
    McSplitterComponent.prototype.onMouseMove = function (event, startPoint, leftArea, rightArea) {
        if (!this.isDragging || this.disabled) {
            return;
        }
        var endPoint = {
            x: event.screenX,
            y: event.screenY
        };
        var offset = this.isVertical()
            ? startPoint.y - endPoint.y
            : startPoint.x - endPoint.x;
        var newLeftAreaSize = leftArea.initialSize - offset;
        var newRightAreaSize = rightArea.initialSize + offset;
        var minLeftAreaSize = leftArea.area.getMinSize();
        var minRightAreaSize = rightArea.area.getMinSize();
        if (newLeftAreaSize <= minLeftAreaSize || newRightAreaSize <= minRightAreaSize) {
            var rightAreaOffset = leftArea.initialSize - minLeftAreaSize;
            leftArea.area.setSize(minLeftAreaSize);
            rightArea.area.setSize(rightArea.initialSize + rightAreaOffset);
        }
        else if (newLeftAreaSize <= 0) {
            leftArea.area.setSize(0);
            rightArea.area.setSize(rightArea.initialSize + leftArea.initialSize);
        }
        else if (newRightAreaSize <= 0) {
            leftArea.area.setSize(rightArea.initialSize + leftArea.initialSize);
            rightArea.area.setSize(0);
        }
        else {
            leftArea.area.setSize(newLeftAreaSize);
            rightArea.area.setSize(newRightAreaSize);
        }
    };
    McSplitterComponent.prototype.onMouseUp = function () {
        while (this.listeners.length > 0) {
            var unsubscribe = this.listeners.pop();
            if (unsubscribe) {
                unsubscribe();
            }
        }
        this.isDragging = false;
    };
    McSplitterComponent.prototype.setStyle = function (property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McSplitterComponent.prototype, "direction", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSplitterComponent.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McSplitterComponent.prototype, "gutterSize", null);
    McSplitterComponent = __decorate([
        core.Component({
            selector: 'mc-splitter',
            preserveWhitespaces: false,
            styles: ["mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch;overflow:hidden}mc-splitter-area{overflow:hidden}mc-gutter{display:flex;flex-grow:0;flex-shrink:0;overflow:hidden;justify-content:center;align-items:center}.icon-vertical{transform:rotate(90deg)}"],
            template: "<ng-content></ng-content><ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\"><mc-gutter *ngIf=\"last === false\" [direction]=\"direction\" [disabled]=\"disabled\" [size]=\"gutterSize\" [order]=\"index * 2 + 1\" (mousedown)=\"onMouseDown($event, index, index + 1)\"><i mc-icon=\"mc-ellipsis_16\" color=\"second\" [class.icon-vertical]=\"direction === 'vertical'\" *ngIf=\"!disabled\"></i></mc-gutter></ng-template>",
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            core.NgZone,
            core.Renderer2])
    ], McSplitterComponent);
    return McSplitterComponent;
}());
var McGutterDirective = /** @class */ (function () {
    function McGutterDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._direction = "vertical" /* Vertical */;
        this._disabled = false;
        this._order = 0;
        this._size = 6;
    }
    Object.defineProperty(McGutterDirective.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = coercion.coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "order", {
        get: function () {
            return this._order;
        },
        set: function (order) {
            this._order = coercion.coerceNumberProperty(order);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            this._size = coercion.coerceNumberProperty(size);
        },
        enumerable: true,
        configurable: true
    });
    McGutterDirective.prototype.ngOnInit = function () {
        this.setStyle("cursor" /* Cursor */, this.getCursor(this.getState()));
        this.setStyle("flex-basis" /* FlexBasis */, coercion.coerceCssPixelValue(this.size));
        this.setStyle(this.isVertical() ? "height" /* Height */ : "width" /* Width */, coercion.coerceCssPixelValue(this.size));
        this.setStyle("order" /* Order */, this.order);
        if (!this.isVertical()) {
            this.setStyle("height" /* Height */, '100%');
        }
        if (this.disabled) {
            this.setAttr("disabled" /* Disabled */, 'true');
        }
        // fix IE issue with gutter icon. flex-direction is requied for flex alignment options
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'row' : 'column');
    };
    McGutterDirective.prototype.isVertical = function () {
        return this.direction === "vertical" /* Vertical */;
    };
    McGutterDirective.prototype.getCursor = function (state) {
        switch (state) {
            case "disabled" /* Disabled */:
                return "default" /* Default */;
            case "vertical" /* Vertical */:
                return "row-resize" /* ResizeRow */;
            case "horizontal" /* Horizontal */:
                return "col-resize" /* ResizeColumn */;
            default:
                throw Error("Unknown gutter state for cursor: " + state);
        }
    };
    McGutterDirective.prototype.getState = function () {
        return this.disabled
            ? "disabled" /* Disabled */
            : this.direction === "vertical" /* Vertical */
                ? "vertical" /* Vertical */
                : "horizontal" /* Horizontal */;
    };
    McGutterDirective.prototype.setStyle = function (property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    };
    McGutterDirective.prototype.setAttr = function (attribute, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attribute, value);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McGutterDirective.prototype, "direction", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McGutterDirective.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McGutterDirective.prototype, "order", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McGutterDirective.prototype, "size", null);
    McGutterDirective = __decorate([
        core.Directive({
            selector: 'mc-gutter'
        }),
        __metadata("design:paramtypes", [core.Renderer2,
            core.ElementRef])
    ], McGutterDirective);
    return McGutterDirective;
}());
var McSplitterAreaDirective = /** @class */ (function () {
    function McSplitterAreaDirective(elementRef, renderer, splitter) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.splitter = splitter;
    }
    McSplitterAreaDirective.prototype.disableFlex = function () {
        this.renderer.removeStyle(this.elementRef.nativeElement, 'flex');
    };
    McSplitterAreaDirective.prototype.ngOnInit = function () {
        this.splitter.addArea(this);
        this.removeStyle("max-width" /* MaxWidth */);
        this.setStyle("flex" /* Flex */, '1');
        if (this.splitter.direction === "vertical" /* Vertical */) {
            this.setStyle("width" /* Width */, '100%');
            this.removeStyle("height" /* Height */);
        }
        else {
            this.setStyle("height" /* Height */, '100%');
            this.removeStyle("width" /* Width */);
        }
    };
    McSplitterAreaDirective.prototype.ngOnDestroy = function () {
        this.splitter.removeArea(this);
    };
    McSplitterAreaDirective.prototype.setOrder = function (order) {
        this.setStyle("order" /* Order */, order);
    };
    McSplitterAreaDirective.prototype.setSize = function (size) {
        var sz = coercion.coerceNumberProperty(size);
        this.setStyle(this.getSizeProperty(), coercion.coerceCssPixelValue(sz));
    };
    McSplitterAreaDirective.prototype.getSize = function () {
        return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
    };
    McSplitterAreaDirective.prototype.getMinSize = function () {
        var styles = getComputedStyle(this.elementRef.nativeElement);
        return parseFloat(styles[this.getMinSizeProperty()]);
    };
    McSplitterAreaDirective.prototype.isVertical = function () {
        return this.splitter.direction === "vertical" /* Vertical */;
    };
    McSplitterAreaDirective.prototype.getMinSizeProperty = function () {
        return this.isVertical()
            ? "min-height" /* MinHeight */
            : "minWidth" /* MinWidth */;
    };
    McSplitterAreaDirective.prototype.getOffsetSizeProperty = function () {
        return this.isVertical()
            ? "offsetHeight" /* OffsetHeight */
            : "offsetWidth" /* OffsetWidth */;
    };
    McSplitterAreaDirective.prototype.getSizeProperty = function () {
        return this.isVertical()
            ? "height" /* Height */
            : "width" /* Width */;
    };
    McSplitterAreaDirective.prototype.setStyle = function (style, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, style, value);
    };
    McSplitterAreaDirective.prototype.removeStyle = function (style) {
        this.renderer.removeStyle(this.elementRef.nativeElement, style);
    };
    McSplitterAreaDirective = __decorate([
        core.Directive({
            selector: 'mc-splitter-area'
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            core.Renderer2,
            McSplitterComponent])
    ], McSplitterAreaDirective);
    return McSplitterAreaDirective;
}());

var McSplitterModule = /** @class */ (function () {
    function McSplitterModule() {
    }
    McSplitterModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                McIconModule
            ],
            exports: [
                McGutterDirective,
                McSplitterAreaDirective,
                McSplitterComponent
            ],
            declarations: [
                McGutterDirective,
                McSplitterAreaDirective,
                McSplitterComponent
            ]
        })
    ], McSplitterModule);
    return McSplitterModule;
}());

var nextUniqueId$6 = 0;
var McToggleBase = /** @class */ (function () {
    function McToggleBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McToggleBase;
}());
var _McToggleMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McToggleBase), exports.ThemePalette.Primary));
var McToggleChange = /** @class */ (function () {
    function McToggleChange() {
    }
    return McToggleChange;
}());
var McToggleComponent = /** @class */ (function (_super) {
    __extends(McToggleComponent, _super);
    function McToggleComponent(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._changeDetectorRef = _changeDetectorRef;
        _this.labelPosition = 'right';
        _this.ariaLabel = '';
        _this.ariaLabelledby = null;
        _this._uniqueId = "mc-toggle-" + ++nextUniqueId$6;
        // tslint:disable:member-ordering
        _this.id = _this._uniqueId;
        _this.name = null;
        _this._disabled = false;
        _this._checked = false;
        _this.change = new core.EventEmitter();
        // tslint:disable-next-line:no-empty
        _this._onTouchedCallback = function () { };
        // tslint:disable-next-line:no-empty
        _this._onChangeCallback = function (_) { };
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
        return _this;
    }
    McToggleComponent_1 = McToggleComponent;
    Object.defineProperty(McToggleComponent.prototype, "inputId", {
        get: function () {
            return (this.id || this._uniqueId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McToggleComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            if (value !== this._disabled) {
                this._disabled = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McToggleComponent.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            if (value !== this._checked) {
                this._checked = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    McToggleComponent.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    McToggleComponent.prototype.focus = function () {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    };
    McToggleComponent.prototype._getAriaChecked = function () {
        return this.checked;
    };
    McToggleComponent.prototype._onInteractionEvent = function (event) {
        event.stopPropagation();
    };
    McToggleComponent.prototype._onLabelTextChange = function () {
        this._changeDetectorRef.markForCheck();
    };
    McToggleComponent.prototype._onInputClick = function (event) {
        event.stopPropagation();
        this._updateModelValue();
        this._emitChangeEvent();
    };
    McToggleComponent.prototype.writeValue = function (value) {
        this.checked = !!value;
    };
    McToggleComponent.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    McToggleComponent.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    McToggleComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    McToggleComponent.prototype._updateModelValue = function () {
        this._checked = !this.checked;
        this._onChangeCallback(this.checked);
        this._onTouchedCallback();
    };
    McToggleComponent.prototype._emitChangeEvent = function () {
        var event = new McToggleChange();
        event.source = this;
        event.checked = this.checked;
        this._onChangeCallback(this.checked);
        this.change.emit(event);
    };
    var McToggleComponent_1;
    __decorate([
        core.ViewChild('input'),
        __metadata("design:type", core.ElementRef)
    ], McToggleComponent.prototype, "_inputElement", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McToggleComponent.prototype, "labelPosition", void 0);
    __decorate([
        core.Input('aria-label'),
        __metadata("design:type", String)
    ], McToggleComponent.prototype, "ariaLabel", void 0);
    __decorate([
        core.Input('aria-labelledby'),
        __metadata("design:type", Object)
    ], McToggleComponent.prototype, "ariaLabelledby", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McToggleComponent.prototype, "id", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McToggleComponent.prototype, "name", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McToggleComponent.prototype, "value", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McToggleComponent.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McToggleComponent.prototype, "checked", null);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McToggleComponent.prototype, "change", void 0);
    McToggleComponent = McToggleComponent_1 = __decorate([
        core.Component({
            selector: 'mc-toggle',
            exportAs: 'mcToggle',
            template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\" #label><div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\"><input #input type=\"checkbox\" class=\"mc-toggle-input cdk-visually-hidden\" [id]=\"inputId\" [checked]=\"checked\" [attr.value]=\"value\" [disabled]=\"disabled\" [attr.name]=\"name\" [tabIndex]=\"tabIndex\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-checked]=\"_getAriaChecked()\" (click)=\"_onInputClick($event)\" (change)=\"_onInteractionEvent($event)\"><div class=\"mc-toggle-bar-container\"><div class=\"mc-toggle__focus-frame\"></div><div class=\"mc-toggle-bar\"><div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div></div></div><div class=\"mc-toggle__content\" [class.left]=\"labelPosition === 'left'\" [class.right]=\"labelPosition === 'right'\"><span class=\"mc-toggle-label\" (cdkObserveContent)=\"_onLabelTextChange()\"><ng-content></ng-content></span></div></div></label>",
            styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-toggle .mc-toggle-bar{position:relative;border-width:1px;border-style:solid}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{display:flex;align-items:center;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px}.mc-toggle__content.right{margin-left:8px}.mc-toggle__circle{position:absolute;border-width:1px;border-style:solid;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translateX(-1px)}.mc-toggle__focus-frame{position:absolute;top:0;left:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;width:28px;border-radius:9px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__focus-frame{border-radius:9px;height:16px;width:28px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}.mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;width:24px;border-radius:8px}.mc-toggle.mc-toggle_small .mc-toggle__focus-frame{border-radius:8px;height:14px;width:24px}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}.mc-toggle:not(.mc-disabled){cursor:pointer}"],
            providers: [
                { provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return McToggleComponent_1; }), multi: true }
            ],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['disabled', 'color', 'tabIndex'],
            host: {
                class: 'mc-toggle',
                '[id]': 'id',
                '[attr.id]': 'id',
                '[class.mc-disabled]': 'disabled',
                '[class.mc-toggle_off]': '!checked'
            },
            animations: [
                animations.trigger('switch', [
                    animations.state('true', animations.style({ left: '50%' })),
                    animations.state('false', animations.style({ left: '1px' })),
                    animations.transition('true <=> false', animations.animate('150ms'))
                ])
            ]
        }),
        __param(3, core.Attribute('tabindex')),
        __metadata("design:paramtypes", [core.ElementRef,
            a11y.FocusMonitor,
            core.ChangeDetectorRef, String])
    ], McToggleComponent);
    return McToggleComponent;
}(_McToggleMixinBase));

var McToggleModule = /** @class */ (function () {
    function McToggleModule() {
    }
    McToggleModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, a11y.A11yModule, McCommonModule],
            exports: [McToggleComponent],
            declarations: [McToggleComponent]
        })
    ], McToggleModule);
    return McToggleModule;
}());

var McTooltipComponent = /** @class */ (function () {
    function McTooltipComponent(cdr) {
        this.cdr = cdr;
        this.prefix = 'mc-tooltip_placement';
        this.positions = DEFAULT_4_POSITIONS.slice();
        this.classMap = {};
        this.mcVisibleChange = new core.EventEmitter();
        this.mcMouseEnterDelay = 400;
        this.mcMouseLeaveDelay = 0;
        this._mcTrigger = 'hover';
        this._mcPlacement = 'top';
        this._mcVisible = new rxjs.BehaviorSubject(false);
        /** Subject for notifying that the tooltip has been hidden from the view */
        this.onHideSubject = new rxjs.Subject();
        this.closeOnInteraction = false;
        this.availablePositions = POSITION_MAP;
        this.$visible = this._mcVisible.asObservable();
    }
    Object.defineProperty(McTooltipComponent.prototype, "mcTitle", {
        get: function () {
            return this._mcTitle;
        },
        set: function (value) {
            this.isTitleString = !(value instanceof core.TemplateRef);
            if (this.isTitleString) {
                this._mcTitle = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcTrigger", {
        get: function () {
            return this._mcTrigger;
        },
        set: function (value) {
            this._mcTrigger = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcPlacement", {
        get: function () {
            return this._mcPlacement;
        },
        set: function (value) {
            if (value !== this._mcPlacement) {
                this._mcPlacement = value;
                this.positions.unshift(POSITION_MAP[this.mcPlacement]);
            }
            else if (!value) {
                this._mcPlacement = 'top';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcVisible", {
        get: function () {
            return this._mcVisible.value;
        },
        set: function (value) {
            var visible = coercion.coerceBooleanProperty(value);
            if (this._mcVisible.value !== visible) {
                this._mcVisible.next(visible);
                this.mcVisibleChange.emit(visible);
            }
        },
        enumerable: true,
        configurable: true
    });
    McTooltipComponent.prototype.show = function () {
        var _this = this;
        if (this.hideTid) {
            clearTimeout(this.hideTid);
        }
        if (!this.isContentEmpty()) {
            if (this.mcTrigger !== 'manual') {
                this.closeOnInteraction = true;
            }
            this.showTid = setTimeout(function () {
                _this.mcVisible = true;
                _this.mcVisibleChange.emit(true);
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                _this.markForCheck();
            }, this.mcMouseEnterDelay);
        }
    };
    McTooltipComponent.prototype.hide = function () {
        var _this = this;
        if (this.showTid) {
            clearTimeout(this.showTid);
        }
        this.hideTid = setTimeout(function () {
            _this.mcVisible = false;
            _this.mcVisibleChange.emit(false);
            _this.onHideSubject.next();
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this.markForCheck();
        }, this.mcMouseLeaveDelay);
    };
    McTooltipComponent.prototype.setClassMap = function () {
        this.classMap = this.prefix + "-" + this.mcPlacement;
    };
    McTooltipComponent.prototype.isContentEmpty = function () {
        return this.isTitleString ? (this.mcTitle === '' || !this.mcTitle) : false;
    };
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    McTooltipComponent.prototype.afterHidden = function () {
        return this.onHideSubject.asObservable();
    };
    McTooltipComponent.prototype.markForCheck = function () {
        this.cdr.markForCheck();
    };
    McTooltipComponent.prototype.handleBodyInteraction = function () {
        if (this.closeOnInteraction) {
            this.hide();
        }
    };
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTooltipComponent.prototype, "mcVisibleChange", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McTooltipComponent.prototype, "mcMouseEnterDelay", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McTooltipComponent.prototype, "mcMouseLeaveDelay", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTooltipComponent.prototype, "mcTitle", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltipComponent.prototype, "mcTrigger", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltipComponent.prototype, "mcPlacement", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTooltipComponent.prototype, "mcVisible", null);
    McTooltipComponent = __decorate([
        core.Component({
            selector: 'mc-tooltip-component',
            inputs: [
                'mcMouseEnterDelay',
                'mcMouseLeaveDelay',
                'mcTitle',
                'mcVisible',
                'mcTrigger',
                'mcPlacement'
            ],
            outputs: ['mcVisibleChange'],
            animations: [fadeAnimation],
            template: "<div class=\"mc-tooltip\" [ngClass]=\"classMap\" [@fadeAnimation]=\"''+($visible | async)\"><div class=\"mc-tooltip-content\"><div class=\"mc-tooltip-arrow\"></div><div class=\"mc-tooltip-inner\"><ng-container>{{ mcTitle }}</ng-container></div></div></div>",
            preserveWhitespaces: false,
            styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;margin:0;padding:0;z-index:1060;max-width:240px;list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:11px}.mc-tooltip_placement-right{padding-left:11px}.mc-tooltip_placement-bottom{padding-top:11px}.mc-tooltip_placement-left{padding-right:11px}.mc-tooltip-inner{padding:8px 16px;text-align:left;text-decoration:none;border-radius:3px;min-height:16px;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:3px;border-width:8px 8px 0;left:50%;margin-left:-8px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:3px;border-width:8px 8px 8px 0;top:16px;margin-top:-8px}.mc-tooltip_placement-left .mc-tooltip-arrow{right:3px;border-width:8px 0 8px 8px;top:16px;margin-top:-8px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:3px;border-width:0 8px 8px;left:50%;margin-left:-8px}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                '(body:click)': 'this.handleBodyInteraction()'
            }
        }),
        __metadata("design:paramtypes", [core.ChangeDetectorRef])
    ], McTooltipComponent);
    return McTooltipComponent;
}());
var MC_TOOLTIP_SCROLL_STRATEGY = new core.InjectionToken('mc-tooltip-scroll-strategy');
/** @docs-private */
function mcTooltipScrollStrategyFactory(overlay$$1) {
    return function () { return overlay$$1.scrollStrategies.reposition({ scrollThrottle: 20 }); };
}
/** @docs-private */
var MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_TOOLTIP_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: mcTooltipScrollStrategyFactory
};
/** Creates an error to be thrown if the user supplied an invalid tooltip position. */
function getMcTooltipInvalidPositionError(position) {
    return Error("McTooltip position \"" + position + "\" is invalid.");
}
var VIEWPORT_MARGIN = 8;
var McTooltip = /** @class */ (function () {
    function McTooltip(overlay$$1, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        this.overlay = overlay$$1;
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.scrollDispatcher = scrollDispatcher;
        this.hostView = hostView;
        this.scrollStrategy = scrollStrategy;
        this.direction = direction;
        this.isTooltipOpen = false;
        this.isDynamicTooltip = false;
        this.parentDisabled = false;
        this.mcVisibleChange = new core.EventEmitter();
        this.$unsubscribe = new rxjs.Subject();
        this._disabled = false;
        this._mcTrigger = 'hover';
        this._mcPlacement = 'top';
        this.manualListeners = new Map();
        this.destroyed = new rxjs.Subject();
        this.availablePositions = POSITION_MAP;
    }
    Object.defineProperty(McTooltip.prototype, "mcTitle", {
        get: function () {
            return this._mcTitle;
        },
        set: function (title) {
            this._mcTitle = title;
            this.updateCompValue('mcTitle', title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "setTitle", {
        set: function (title) {
            this.mcTitle = title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcMouseEnterDelay", {
        get: function () {
            return this._mcMouseEnterDelay;
        },
        set: function (value) {
            this._mcMouseEnterDelay = value;
            this.updateCompValue('mcMouseEnterDelay', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcMouseLeaveDelay", {
        get: function () {
            return this._mcMouseLeaveDelay;
        },
        set: function (value) {
            this._mcMouseLeaveDelay = value;
            this.updateCompValue('mcMouseLeaveDelay', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcTrigger", {
        get: function () {
            return this._mcTrigger;
        },
        set: function (value) {
            if (value) {
                this._mcTrigger = value;
                this.updateCompValue('mcTrigger', value);
            }
            else {
                this._mcTrigger = 'hover';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcPlacement", {
        get: function () {
            return this._mcPlacement;
        },
        set: function (value) {
            if (value) {
                this._mcPlacement = value;
                this.updateCompValue('mcPlacement', value);
            }
            else {
                this._mcPlacement = 'top';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcTooltipClass", {
        get: function () { return this._mcTooltipClass; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "m\u0441TooltipClass", {
        set: function (value) {
            this._mcTooltipClass = value;
            if (this.tooltip) {
                this.tooltip.setClassMap();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcVisible", {
        get: function () {
            return this._mcVisible;
        },
        set: function (externalValue) {
            var value = coercion.coerceBooleanProperty(externalValue);
            this._mcVisible = value;
            this.updateCompValue('mcVisible', value);
            if (value) {
                this.show();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "isOpen", {
        get: function () {
            return this.isTooltipOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "isParentDisabled", {
        get: function () {
            return this.parentDisabled;
        },
        enumerable: true,
        configurable: true
    });
    /** Create the overlay config and position strategy */
    McTooltip.prototype.createOverlay = function () {
        var _this = this;
        if (this.overlayRef) {
            return this.overlayRef;
        }
        // Create connected position strategy that listens for scroll events to reposition.
        var strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-tooltip')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions(DEFAULT_4_POSITIONS.slice());
        var scrollableAncestors = this.scrollDispatcher
            .getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges.pipe(operators.takeUntil(this.destroyed)).subscribe(function (change) {
            if (_this.tooltip) {
                _this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && _this.tooltip.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    _this.ngZone.run(function () { return _this.hide(); });
                }
            }
        });
        this.overlayRef = this.overlay.create({
            direction: this.direction,
            positionStrategy: strategy,
            panelClass: 'mc-tooltip-panel',
            scrollStrategy: this.scrollStrategy()
        });
        this.updatePosition();
        this.overlayRef.detachments()
            .pipe(operators.takeUntil(this.destroyed))
            .subscribe(function () { return _this.detach(); });
        return this.overlayRef;
    };
    McTooltip.prototype.detach = function () {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.tooltip = null;
    };
    McTooltip.prototype.onPositionChange = function ($event) {
        var _this = this;
        var updatedPlacement = this.mcPlacement;
        Object.keys(this.availablePositions).some(function (key) {
            if ($event.connectionPair.originX === _this.availablePositions[key].originX &&
                $event.connectionPair.originY === _this.availablePositions[key].originY &&
                $event.connectionPair.overlayX === _this.availablePositions[key].overlayX &&
                $event.connectionPair.overlayY === _this.availablePositions[key].overlayY) {
                updatedPlacement = key;
                return true;
            }
            return false;
        });
        this.updateCompValue('mcPlacement', updatedPlacement);
        if (this.tooltip) {
            this.tooltip.setClassMap();
            this.tooltip.markForCheck();
        }
        this.handlePositioningUpdate();
    };
    McTooltip.prototype.handlePositioningUpdate = function () {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
            var pos = (this.overlayRef.overlayElement.clientHeight -
                this.hostView.element.nativeElement.clientHeight) / 2; // tslint:disable-line
            var currentContainer = this.overlayRef.overlayElement.style.top || '0px';
            this.overlayRef.overlayElement.style.top =
                parseInt(currentContainer.split('px')[0], 10) + pos - 1 + "px";
            // TODO: обновлять положение стрелки\указателя\"дятла"
        }
    };
    // tslint:disable-next-line:no-any
    McTooltip.prototype.updateCompValue = function (key, value) {
        if (this.isDynamicTooltip && value) {
            if (this.tooltip) {
                this.tooltip[key] = value;
            }
        }
    };
    McTooltip.prototype.ngOnInit = function () {
        this.initElementRefListeners();
    };
    McTooltip.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.manualListeners.forEach(function (listener, event) {
            return _this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        this.manualListeners.clear();
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    };
    McTooltip.prototype.handleKeydown = function (e) {
        if (this.isTooltipOpen && e.keyCode === keycodes.ESCAPE) { // tslint:disable-line
            this.hide();
        }
    };
    McTooltip.prototype.handleTouchend = function () {
        this.hide();
    };
    McTooltip.prototype.initElementRefListeners = function () {
        var _this = this;
        if (this.mcTrigger === 'hover') {
            this.manualListeners
                .set('mouseenter', function () { return _this.show(); })
                .set('mouseleave', function () { return _this.hide(); })
                .forEach(function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); });
        }
        if (this.mcTrigger === 'focus') {
            this.manualListeners
                .set('focus', function () { return _this.show(); })
                .set('blur', function () { return _this.hide(); })
                .forEach(function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); });
        }
    };
    McTooltip.prototype.show = function () {
        var _this = this;
        if (!this.disabled) {
            if (!this.tooltip) {
                var overlayRef = this.createOverlay();
                this.detach();
                this.portal = this.portal || new portal.ComponentPortal(McTooltipComponent, this.hostView);
                this.tooltip = overlayRef.attach(this.portal).instance;
                this.tooltip.afterHidden()
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe(function () { return _this.detach(); });
                this.isDynamicTooltip = true;
                var properties = [
                    'mcTitle',
                    'mcPlacement',
                    'mcTrigger',
                    'mcTooltipDisabled',
                    'mcMouseEnterDelay',
                    'mcMouseLeaveDelay',
                    'mсTooltipClass',
                    'mcVisible'
                ];
                properties.forEach(function (property) { return _this.updateCompValue(property, _this[property]); });
                this.tooltip.mcVisibleChange.pipe(operators.takeUntil(this.$unsubscribe), operators.distinctUntilChanged())
                    .subscribe(function (data) {
                    _this.mcVisible = data;
                    _this.mcVisibleChange.emit(data);
                    _this.isTooltipOpen = data;
                });
            }
            this.updatePosition();
            this.tooltip.show();
        }
    };
    McTooltip.prototype.hide = function () {
        if (this.tooltip) {
            this.tooltip.hide();
        }
    };
    /** Updates the position of the current tooltip. */
    McTooltip.prototype.updatePosition = function () {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        var position = this.overlayRef.getConfig().positionStrategy;
        var origin = this.getOrigin();
        var overlay$$1 = this.getOverlayPosition();
        position.withPositions([
            __assign({}, origin.main, overlay$$1.main),
            __assign({}, origin.fallback, overlay$$1.fallback)
        ]);
    };
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    McTooltip.prototype.getOrigin = function () {
        var position = this.mcPlacement;
        var isLtr = !this.direction || this.direction.value === 'ltr';
        var originPosition;
        if (position === 'top' || position === 'bottom') {
            originPosition = { originX: 'center', originY: position === 'top' ? 'top' : 'bottom' };
        }
        else if (position === 'top' ||
            (position === 'left' && isLtr) ||
            (position === 'right' && !isLtr)) {
            originPosition = { originX: 'start', originY: 'center' };
        }
        else if (position === 'bottom' ||
            (position === 'right' && isLtr) ||
            (position === 'left' && !isLtr)) {
            originPosition = { originX: 'end', originY: 'center' };
        }
        else {
            throw getMcTooltipInvalidPositionError(position);
        }
        var _a = this.invertPosition(originPosition.originX, originPosition.originY), x = _a.x, y = _a.y;
        return {
            main: originPosition,
            fallback: { originX: x, originY: y }
        };
    };
    /** Returns the overlay position and a fallback position based on the user's preference */
    McTooltip.prototype.getOverlayPosition = function () {
        var position = this.mcPlacement;
        var isLtr = !this.direction || this.direction.value === 'ltr';
        var overlayPosition;
        if (position === 'top') {
            overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
        }
        else if (position === 'bottom') {
            overlayPosition = { overlayX: 'center', overlayY: 'top' };
        }
        else if (position === 'top' ||
            (position === 'left' && isLtr) ||
            (position === 'right' && !isLtr)) {
            overlayPosition = { overlayX: 'end', overlayY: 'center' };
        }
        else if (position === 'bottom' ||
            (position === 'right' && isLtr) ||
            (position === 'left' && !isLtr)) {
            overlayPosition = { overlayX: 'start', overlayY: 'center' };
        }
        else {
            throw getMcTooltipInvalidPositionError(position);
        }
        var _a = this.invertPosition(overlayPosition.overlayX, overlayPosition.overlayY), x = _a.x, y = _a.y;
        return {
            main: overlayPosition,
            fallback: { overlayX: x, overlayY: y }
        };
    };
    /** Inverts an overlay position. */
    McTooltip.prototype.invertPosition = function (x, y) {
        var newX = x;
        var newY = y;
        if (this.mcPlacement === 'top' || this.mcPlacement === 'bottom') {
            if (y === 'top') {
                newY = 'bottom';
            }
            else if (y === 'bottom') {
                newY = 'top';
            }
        }
        else {
            if (x === 'end') {
                newX = 'start';
            }
            else if (x === 'start') {
                newX = 'end';
            }
        }
        return { x: newX, y: newY };
    };
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McTooltip.prototype, "mcVisibleChange", void 0);
    __decorate([
        core.Input('mcTooltip'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltip.prototype, "mcTitle", null);
    __decorate([
        core.Input('mcTitle'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltip.prototype, "setTitle", null);
    __decorate([
        core.Input('mcTooltipDisabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], McTooltip.prototype, "disabled", null);
    __decorate([
        core.Input('mcMouseEnterDelay'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McTooltip.prototype, "mcMouseEnterDelay", null);
    __decorate([
        core.Input('mcMouseLeaveDelay'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McTooltip.prototype, "mcMouseLeaveDelay", null);
    __decorate([
        core.Input('mcTrigger'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltip.prototype, "mcTrigger", null);
    __decorate([
        core.Input('mcPlacement'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltip.prototype, "mcPlacement", null);
    __decorate([
        core.Input('mcTooltipClass'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], McTooltip.prototype, "mcTooltipClass", null);
    __decorate([
        core.Input('mcVisible'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTooltip.prototype, "mcVisible", null);
    __decorate([
        core.HostBinding('class.mc-tooltip-open'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], McTooltip.prototype, "isOpen", null);
    __decorate([
        core.HostBinding('class.disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], McTooltip.prototype, "isParentDisabled", null);
    McTooltip = __decorate([
        core.Directive({
            selector: '[mcTooltip], [attribute^="mcTooltip"]',
            exportAs: 'mcTooltip',
            host: {
                '(keydown)': 'handleKeydown($event)',
                '(touchend)': 'handleTouchend()'
            }
        }),
        __param(5, core.Inject(MC_TOOLTIP_SCROLL_STRATEGY)),
        __param(6, core.Optional()),
        __metadata("design:paramtypes", [overlay.Overlay,
            core.ElementRef,
            core.NgZone,
            overlay.ScrollDispatcher,
            core.ViewContainerRef, Object, bidi.Directionality])
    ], McTooltip);
    return McTooltip;
}());

var McToolTipModule = /** @class */ (function () {
    function McToolTipModule() {
    }
    McToolTipModule = __decorate([
        core.NgModule({
            declarations: [McTooltipComponent, McTooltip],
            exports: [McTooltipComponent, McTooltip],
            imports: [common.CommonModule, overlay.OverlayModule],
            providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
            entryComponents: [McTooltipComponent]
        })
    ], McToolTipModule);
    return McToolTipModule;
}());

var VERSION = new core.Version('1.0.0-beta.3');

exports.VERSION = VERSION;
exports.ɵa2 = MC_SANITY_CHECKS_FACTORY;
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
exports.McMeasureScrollbarService = McMeasureScrollbarService;
exports.McOptionModule = McOptionModule;
exports.McOptionSelectionChange = McOptionSelectionChange;
exports.MC_OPTION_PARENT_COMPONENT = MC_OPTION_PARENT_COMPONENT;
exports.McOption = McOption;
exports._countGroupLabelsBeforeOption = _countGroupLabelsBeforeOption;
exports._getOptionScrollPosition = _getOptionScrollPosition;
exports.McOptgroupBase = McOptgroupBase;
exports._McOptgroupMixinBase = _McOptgroupMixinBase;
exports.McOptgroup = McOptgroup;
exports.MC_LABEL_GLOBAL_OPTIONS = MC_LABEL_GLOBAL_OPTIONS;
exports.fadeAnimation = fadeAnimation;
exports.POSITION_MAP = POSITION_MAP;
exports.DEFAULT_4_POSITIONS = DEFAULT_4_POSITIONS;
exports.McButtonModule = McButtonModule;
exports.McButtonCSSStyler = McButtonCSSStyler;
exports.McIconButtonCSSStyler = McIconButtonCSSStyler;
exports.McButtonBase = McButtonBase;
exports._McButtonMixinBase = _McButtonMixinBase;
exports.McButton = McButton;
exports.McAnchor = McAnchor;
exports.McIconButton = McIconButton;
exports.McCardModule = McCardModule;
exports.McCard = McCard;
exports.MC_CHECKBOX_CONTROL_VALUE_ACCESSOR = MC_CHECKBOX_CONTROL_VALUE_ACCESSOR;
exports.McCheckboxChange = McCheckboxChange;
exports.McCheckboxBase = McCheckboxBase;
exports._McCheckboxMixinBase = _McCheckboxMixinBase;
exports.McCheckbox = McCheckbox;
exports.MC_CHECKBOX_CLICK_ACTION = MC_CHECKBOX_CLICK_ACTION;
exports.McCheckboxModule = McCheckboxModule;
exports.MC_CHECKBOX_REQUIRED_VALIDATOR = MC_CHECKBOX_REQUIRED_VALIDATOR;
exports.McCheckboxRequiredValidator = McCheckboxRequiredValidator;
exports.ɵa27 = McMultiYearView;
exports.McDatepickerModule = McDatepickerModule;
exports.McCalendarHeader = McCalendarHeader;
exports.McCalendar = McCalendar;
exports.McCalendarCell = McCalendarCell;
exports.McCalendarBody = McCalendarBody;
exports.MC_DATEPICKER_SCROLL_STRATEGY = MC_DATEPICKER_SCROLL_STRATEGY;
exports.MC_DATEPICKER_SCROLL_STRATEGY_FACTORY = MC_DATEPICKER_SCROLL_STRATEGY_FACTORY;
exports.MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER;
exports.McDatepickerContentBase = McDatepickerContentBase;
exports.McDatepickerContentMixinBase = McDatepickerContentMixinBase;
exports.McDatepickerContent = McDatepickerContent;
exports.McDatepicker = McDatepicker;
exports.mcDatepickerAnimations = mcDatepickerAnimations;
exports.MC_DATEPICKER_VALUE_ACCESSOR = MC_DATEPICKER_VALUE_ACCESSOR;
exports.MC_DATEPICKER_VALIDATORS = MC_DATEPICKER_VALIDATORS;
exports.McDatepickerInputEvent = McDatepickerInputEvent;
exports.McDatepickerInput = McDatepickerInput;
exports.McDatepickerIntl = McDatepickerIntl;
exports.McDatepickerToggleIcon = McDatepickerToggleIcon;
exports.McDatepickerToggle = McDatepickerToggle;
exports.McMonthView = McMonthView;
exports.McYearView = McYearView;
exports.McDivider = McDivider;
exports.McDividerModule = McDividerModule;
exports.McDropdownModule = McDropdownModule;
exports.MC_DROPDOWN_DEFAULT_OPTIONS = MC_DROPDOWN_DEFAULT_OPTIONS;
exports.MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY = MC_DROPDOWN_DEFAULT_OPTIONS_FACTORY;
exports.McDropdown = McDropdown;
exports.McDropdownItemBase = McDropdownItemBase;
exports._McDropdownItemMixinBase = _McDropdownItemMixinBase;
exports.McDropdownItem = McDropdownItem;
exports.MC_DROPDOWN_PANEL = MC_DROPDOWN_PANEL;
exports.throwMcDropdownMissingError = throwMcDropdownMissingError;
exports.throwMcDropdownInvalidPositionX = throwMcDropdownInvalidPositionX;
exports.throwMcDropdownInvalidPositionY = throwMcDropdownInvalidPositionY;
exports.mcDropdownAnimations = mcDropdownAnimations;
exports.fadeInItems = fadeInItems;
exports.transformDropdown = transformDropdown;
exports.McDropdownContent = McDropdownContent;
exports.MC_DROPDOWN_SCROLL_STRATEGY = MC_DROPDOWN_SCROLL_STRATEGY;
exports.MC_DROPDOWN_SCROLL_STRATEGY_FACTORY = MC_DROPDOWN_SCROLL_STRATEGY_FACTORY;
exports.MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_DROPDOWN_SCROLL_STRATEGY_FACTORY_PROVIDER;
exports.McDropdownTrigger = McDropdownTrigger;
exports.McFormFieldModule = McFormFieldModule;
exports.McFormFieldBase = McFormFieldBase;
exports._McFormFieldMixinBase = _McFormFieldMixinBase;
exports.McFormField = McFormField;
exports.McFormFieldWithoutBorders = McFormFieldWithoutBorders;
exports.McFormFieldControl = McFormFieldControl;
exports.McFormFieldNumberControl = McFormFieldNumberControl;
exports.getMcFormFieldMissingControlError = getMcFormFieldMissingControlError;
exports.McHint = McHint;
exports.McSuffix = McSuffix;
exports.McPrefix = McPrefix;
exports.McCleaner = McCleaner;
exports.McStepper = McStepper;
exports.McIconModule = McIconModule;
exports.McIconCSSStyler = McIconCSSStyler;
exports.McIconBase = McIconBase;
exports._McIconMixinBase = _McIconMixinBase;
exports.McIcon = McIcon;
exports.ɵc22 = MAX_VALIDATOR;
exports.ɵa22 = MIN_VALIDATOR;
exports.ɵd22 = MaxValidator;
exports.ɵb22 = MinValidator;
exports.McInputModule = McInputModule;
exports.BIG_STEP = BIG_STEP;
exports.SMALL_STEP = SMALL_STEP;
exports.McInputBase = McInputBase;
exports._McInputMixinBase = _McInputMixinBase;
exports.McNumberInput = McNumberInput;
exports.McInput = McInput;
exports.McInputMono = McInputMono;
exports.stepUp = stepUp;
exports.stepDown = stepDown;
exports.MC_INPUT_VALUE_ACCESSOR = MC_INPUT_VALUE_ACCESSOR;
exports.McContentComponent = McContentComponent;
exports.McFooterComponent = McFooterComponent;
exports.McHeaderComponent = McHeaderComponent;
exports.McLayoutComponent = McLayoutComponent;
exports.McSidebarComponent = McSidebarComponent;
exports.McLayoutModule = McLayoutModule;
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
exports.McLinkBase = McLinkBase;
exports._McLinkBase = _McLinkBase;
exports.McLink = McLink;
exports.ɵb24 = CssUnitPipe;
exports.ɵa24 = McModalControlService;
exports.McModalComponent = McModalComponent;
exports.McModalRef = McModalRef;
exports.McModalModule = McModalModule;
exports.McModalService = McModalService;
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
exports._McProgressSpinnerMixinBase = _McProgressSpinnerMixinBase;
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
exports.ɵd14 = McTabBase;
exports.ɵe14 = mcTabMixinBase;
exports.ɵa14 = McTabHeaderBase;
exports.ɵb14 = McTabLabelWrapperBase;
exports.ɵc14 = mcTabLabelWrapperMixinBase;
exports.ɵh14 = McTabLinkBase;
exports.ɵf14 = McTabNavBase;
exports.ɵi14 = mcTabLinkMixinBase;
exports.ɵg14 = mcTabNavMixinBase;
exports.McTabBody = McTabBody;
exports.McTabBodyPortal = McTabBodyPortal;
exports.McTabHeader = McTabHeader;
exports.McTabLabelWrapper = McTabLabelWrapper;
exports.McTab = McTab;
exports.McTabLabel = McTabLabel;
exports.McTabNav = McTabNav;
exports.McTabLink = McTabLink;
exports.McTabContent = McTabContent;
exports.McTabsModule = McTabsModule;
exports.McLightTabsCssStyler = McLightTabsCssStyler;
exports.McAlignTabsCenterCssStyler = McAlignTabsCenterCssStyler;
exports.McAlignTabsEndCssStyler = McAlignTabsEndCssStyler;
exports.McStretchTabsCssStyler = McStretchTabsCssStyler;
exports.McTabChangeEvent = McTabChangeEvent;
exports.MC_TABS_CONFIG = MC_TABS_CONFIG;
exports.McTabGroupBase = McTabGroupBase;
exports.mcTabGroupMixinBase = mcTabGroupMixinBase;
exports.McTabGroup = McTabGroup;
exports.mcTabsAnimations = mcTabsAnimations;
exports.McTagBase = McTagBase;
exports._McTagMixinBase = _McTagMixinBase;
exports.McTag = McTag;
exports.McTagModule = McTagModule;
exports.MC_TEXTAREA_VALUE_ACCESSOR = MC_TEXTAREA_VALUE_ACCESSOR;
exports.McTextareaBase = McTextareaBase;
exports.McTextareaMixinBase = McTextareaMixinBase;
exports.McTextarea = McTextarea;
exports.McTextareaModule = McTextareaModule;
exports.McTimepickerModule = McTimepickerModule;
exports.TIMEFORMAT_PLACEHOLDERS = TIMEFORMAT_PLACEHOLDERS;
exports.DEFAULT_TIME_FORMAT = DEFAULT_TIME_FORMAT;
exports.HOURS_MINUTES_SECONDS_REGEXP = HOURS_MINUTES_SECONDS_REGEXP;
exports.HOURS_MINUTES_REGEXP = HOURS_MINUTES_REGEXP;
exports.HOURS_ONLY_REGEXP = HOURS_ONLY_REGEXP;
exports.SECONDS_PER_MINUTE = SECONDS_PER_MINUTE;
exports.MINUTES_PER_HOUR = MINUTES_PER_HOUR;
exports.HOURS_PER_DAY = HOURS_PER_DAY;
exports.ARROW_UP_KEYCODE = ARROW_UP_KEYCODE;
exports.ARROW_DOWN_KEYCODE = ARROW_DOWN_KEYCODE;
exports.ARROW_LEFT_KEYCODE = ARROW_LEFT_KEYCODE;
exports.ARROW_RIGHT_KEYCODE = ARROW_RIGHT_KEYCODE;
exports.McTimepickerBase = McTimepickerBase;
exports.McTimepickerMixinBase = McTimepickerMixinBase;
exports.McTimepicker = McTimepicker;
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
exports.ɵa25 = mcSelectAnimations;
exports.McSelectModule = McSelectModule;
exports.SELECT_PANEL_MAX_HEIGHT = SELECT_PANEL_MAX_HEIGHT;
exports.SELECT_PANEL_PADDING_X = SELECT_PANEL_PADDING_X;
exports.SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_INDENT_PADDING_X;
exports.SELECT_ITEM_HEIGHT_EM = SELECT_ITEM_HEIGHT_EM;
exports.SELECT_PANEL_VIEWPORT_PADDING = SELECT_PANEL_VIEWPORT_PADDING;
exports.MC_SELECT_SCROLL_STRATEGY = MC_SELECT_SCROLL_STRATEGY;
exports.MC_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY = MC_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY;
exports.MC_SELECT_SCROLL_STRATEGY_PROVIDER = MC_SELECT_SCROLL_STRATEGY_PROVIDER;
exports.McSelectChange = McSelectChange;
exports.McSelectBase = McSelectBase;
exports._McSelectMixinBase = _McSelectMixinBase;
exports.McSelectTrigger = McSelectTrigger;
exports.McSelect = McSelect;
exports.ɵb21 = mcSidepanelAnimations;
exports.ɵa21 = mcSidepanelTransformAnimation;
exports.ɵg21 = McSidepanelActions;
exports.ɵe21 = McSidepanelBody;
exports.ɵc21 = McSidepanelClose;
exports.ɵf21 = McSidepanelFooter;
exports.ɵd21 = McSidepanelHeader;
exports.McSidepanelModule = McSidepanelModule;
exports.MC_SIDEPANEL_DEFAULT_OPTIONS = MC_SIDEPANEL_DEFAULT_OPTIONS;
exports.McSidepanelService = McSidepanelService;
exports.MC_SIDEPANEL_DATA = MC_SIDEPANEL_DATA;
exports.McSidepanelConfig = McSidepanelConfig;
exports.MC_SIDEPANEL_WITH_INDENT = MC_SIDEPANEL_WITH_INDENT;
exports.MC_SIDEPANEL_WITH_SHADOW = MC_SIDEPANEL_WITH_SHADOW;
exports.McSidepanelContainerComponent = McSidepanelContainerComponent;
exports.McSidepanelRef = McSidepanelRef;
exports.McSplitterModule = McSplitterModule;
exports.McSplitterComponent = McSplitterComponent;
exports.McGutterDirective = McGutterDirective;
exports.McSplitterAreaDirective = McSplitterAreaDirective;
exports.McToggleModule = McToggleModule;
exports.McToggleBase = McToggleBase;
exports._McToggleMixinBase = _McToggleMixinBase;
exports.McToggleChange = McToggleChange;
exports.McToggleComponent = McToggleComponent;
exports.McToolTipModule = McToolTipModule;
exports.McTooltipComponent = McTooltipComponent;
exports.MC_TOOLTIP_SCROLL_STRATEGY = MC_TOOLTIP_SCROLL_STRATEGY;
exports.mcTooltipScrollStrategyFactory = mcTooltipScrollStrategyFactory;
exports.MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER;
exports.getMcTooltipInvalidPositionError = getMcTooltipInvalidPositionError;
exports.McTooltip = McTooltip;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic.umd.js.map

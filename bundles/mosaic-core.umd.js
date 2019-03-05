/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/bidi'), require('@ptsecurity/cdk/coercion'), require('rxjs'), require('@angular/common'), require('@ptsecurity/cdk/keycodes'), require('@angular/animations'), require('@ptsecurity/cdk/overlay')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/core', ['exports', '@angular/core', '@ptsecurity/cdk/bidi', '@ptsecurity/cdk/coercion', 'rxjs', '@angular/common', '@ptsecurity/cdk/keycodes', '@angular/animations', '@ptsecurity/cdk/overlay'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.core = {}),global.ng.core,global.ng.cdk.bidi,global.ng.cdk.coercion,global.rxjs,global.ng.common,global.ng.cdk.keycodes,global.ng.animations,global.ng.cdk.overlay));
}(this, (function (exports,core,bidi,coercion,rxjs,common,keycodes,animations,overlay) { 'use strict';

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
            var parent = this.parentFormGroup || this.parentForm;
            var matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
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
var McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
// Counter for unique group ids.
var uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `mc-option`.
 */
var McOptgroup = /** @class */ (function (_super) {
    __extends(McOptgroup, _super);
    function McOptgroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Unique id for the underlying label. */
        _this.labelId = "mc-optgroup-label-" + uniqueOptgroupIdCounter++;
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
            template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label><ng-content select=\"mc-option, ng-container\"></ng-content>",
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            inputs: ['disabled'],
            styles: [".mc-optgroup-label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}"],
            host: {
                class: 'mc-optgroup',
                role: 'group',
                '[class.mc-optgroup-disabled]': 'disabled',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-labelledby]': 'labelId'
            }
        })
    ], McOptgroup);
    return McOptgroup;
}(McOptgroupMixinBase));

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var uniqueIdCounter = 0;
/** Event object emitted by McOption when selected or deselected. */
var McOptionSelectionChange = /** @class */ (function () {
    function McOptionSelectionChange(source, isUserInput) {
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
 * Single option inside of a `<mc-select>` element.
 */
var McOption = /** @class */ (function () {
    function McOption(element, changeDetectorRef, parent, group$$1) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.group = group$$1;
        /** Event emitted when the option is selected or deselected. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new core.EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this.stateChanges = new rxjs.Subject();
        this._id = "mc-option-" + uniqueIdCounter++;
        this._selected = false;
        this._disabled = false;
        this._active = false;
        this.mostRecentViewValue = '';
    }
    Object.defineProperty(McOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: function () {
            // TODO(kara): Add input property alternative for node envs.
            return (this.getHostElement().textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "multiple", {
        /** Whether the wrapping component is in multiple selection mode. */
        get: function () {
            return this.parent && this.parent.multiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "disabled", {
        get: function () {
            return (this.group && this.group.disabled) || this._disabled;
        },
        set: function (value) {
            this._disabled = coercion.coerceBooleanProperty(value);
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
    McOption.prototype.ngAfterViewChecked = function () {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `mc-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            var viewValue = this.viewValue;
            if (viewValue !== this.mostRecentViewValue) {
                this.mostRecentViewValue = viewValue;
                this.stateChanges.next();
            }
        }
    };
    McOption.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    McOption.prototype.select = function () {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    };
    McOption.prototype.deselect = function () {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    };
    McOption.prototype.focus = function () {
        var element = this.getHostElement();
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
            this.changeDetectorRef.markForCheck();
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
            this.changeDetectorRef.markForCheck();
        }
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    McOption.prototype.getLabel = function () {
        return this.viewValue;
    };
    /** Ensures the option is selected when activated from the keyboard. */
    McOption.prototype.handleKeydown = function (event) {
        // tslint:disable-next-line
        if (event.keyCode === keycodes.ENTER || event.keyCode === keycodes.SPACE) {
            this.selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    };
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    McOption.prototype.selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
        }
    };
    McOption.prototype.getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    McOption.prototype.getHostElement = function () {
        return this.element.nativeElement;
    };
    /** Emits the selection change event. */
    McOption.prototype.emitSelectionChangeEvent = function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new McOptionSelectionChange(this, isUserInput));
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McOption.prototype, "value", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McOption.prototype, "onSelectionChange", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McOption.prototype, "disabled", null);
    McOption = __decorate([
        core.Component({
            selector: 'mc-option',
            exportAs: 'mcOption',
            host: {
                '[attr.tabindex]': 'getTabIndex()',
                class: 'mc-option',
                '[class.mc-selected]': 'selected',
                '[class.mc-option-multiple]': 'multiple',
                '[class.mc-active]': 'active',
                '[class.mc-disabled]': 'disabled',
                '[id]': 'id',
                '(click)': 'selectViaInteraction()',
                '(keydown)': 'handleKeydown($event)'
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
function countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
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
function getOptionScrollPosition(optionIndex, optionHeight, currentScrollPosition, panelHeight) {
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

var selectEvents = 'selectEvents';

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

/** The max height of the select's overlay panel */
var SELECT_PANEL_MAX_HEIGHT = 224;
/** The panel's padding on the x-axis */
var SELECT_PANEL_PADDING_X = 1;
/** The panel's x axis padding if it is indented (e.g. there is an option group). */
/* tslint:disable-next-line:no-magic-numbers */
var SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
var SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Injection token that determines the scroll handling while a select is open. */
var MC_SELECT_SCROLL_STRATEGY = new core.InjectionToken('mc-select-scroll-strategy');
/** @docs-private */
function mcSelectScrollStrategyProviderFactory(overlay$$1) {
    return function () { return overlay$$1.scrollStrategies.reposition(); };
}
/** @docs-private */
var MC_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: MC_SELECT_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: mcSelectScrollStrategyProviderFactory
};

/**
 * The following are all the animations for the mc-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material mc-select animation.
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
exports.countGroupLabelsBeforeOption = countGroupLabelsBeforeOption;
exports.getOptionScrollPosition = getOptionScrollPosition;
exports.McOptgroupBase = McOptgroupBase;
exports.McOptgroupMixinBase = McOptgroupMixinBase;
exports.McOptgroup = McOptgroup;
exports.MC_LABEL_GLOBAL_OPTIONS = MC_LABEL_GLOBAL_OPTIONS;
exports.fadeAnimation = fadeAnimation;
exports.POSITION_MAP = POSITION_MAP;
exports.DEFAULT_4_POSITIONS = DEFAULT_4_POSITIONS;
exports.mcSelectAnimations = mcSelectAnimations;
exports.selectEvents = selectEvents;
exports.getMcSelectDynamicMultipleError = getMcSelectDynamicMultipleError;
exports.getMcSelectNonArrayValueError = getMcSelectNonArrayValueError;
exports.getMcSelectNonFunctionValueError = getMcSelectNonFunctionValueError;
exports.SELECT_PANEL_MAX_HEIGHT = SELECT_PANEL_MAX_HEIGHT;
exports.SELECT_PANEL_PADDING_X = SELECT_PANEL_PADDING_X;
exports.SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_INDENT_PADDING_X;
exports.SELECT_PANEL_VIEWPORT_PADDING = SELECT_PANEL_VIEWPORT_PADDING;
exports.MC_SELECT_SCROLL_STRATEGY = MC_SELECT_SCROLL_STRATEGY;
exports.mcSelectScrollStrategyProviderFactory = mcSelectScrollStrategyProviderFactory;
exports.MC_SELECT_SCROLL_STRATEGY_PROVIDER = MC_SELECT_SCROLL_STRATEGY_PROVIDER;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-core.umd.js.map

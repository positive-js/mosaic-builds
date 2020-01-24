/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/bidi'), require('@angular/core'), require('@angular/cdk/coercion'), require('rxjs'), require('@angular/common'), require('@ptsecurity/cdk/keycodes'), require('@angular/animations'), require('@angular/cdk/overlay'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/core', ['exports', '@angular/cdk/bidi', '@angular/core', '@angular/cdk/coercion', 'rxjs', '@angular/common', '@ptsecurity/cdk/keycodes', '@angular/animations', '@angular/cdk/overlay', '@angular/forms'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.core = {}), global.ng.cdk.bidi, global.ng.core, global.ng.cdk.coercion, global.rxjs, global.ng.common, global.ng.cdk.keycodes, global.ng.animations, global.ng.cdk.overlay, global.ng.forms));
}(this, (function (exports, bidi, core, coercion, rxjs, common, keycodes, animations, overlay, forms) { 'use strict';

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Injection token that configures whether the Mosaic sanity checks are enabled.
    /** @type {?} */
    var MC_SANITY_CHECKS = new core.InjectionToken('mc-sanity-checks', {
        providedIn: 'root',
        factory: mcSanityChecksFactory
    });
    /**
     * @return {?}
     */
    function mcSanityChecksFactory() {
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
            this.hasDoneGlobalChecks = false;
            // Reference to the global `document` object.
            // tslint:disable-next-line: orthodox-getter-and-setter
            this._document = typeof document === 'object' && document ? document : null;
            // Reference to the global 'window' object.
            // tslint:disable-next-line: orthodox-getter-and-setter
            this._window = typeof window === 'object' && window ? window : null;
            if (this.areChecksEnabled() && !this.hasDoneGlobalChecks) {
                this.checkDoctypeIsDefined();
                this.checkThemeIsPresent();
                this.hasDoneGlobalChecks = true;
            }
        }
        // Whether any sanity checks are enabled
        // Whether any sanity checks are enabled
        /**
         * @private
         * @return {?}
         */
        McCommonModule.prototype.areChecksEnabled = 
        // Whether any sanity checks are enabled
        /**
         * @private
         * @return {?}
         */
        function () {
            return this._sanityChecksEnabled && core.isDevMode() && !this.isTestEnv();
        };
        // Whether the code is running in tests.
        // Whether the code is running in tests.
        /**
         * @private
         * @return {?}
         */
        McCommonModule.prototype.isTestEnv = 
        // Whether the code is running in tests.
        /**
         * @private
         * @return {?}
         */
        function () {
            // tslint:disable-next-line
            return this._window && (this._window['__karma__'] || this._window['jasmine']);
        };
        /**
         * @private
         * @return {?}
         */
        McCommonModule.prototype.checkDoctypeIsDefined = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._document && !this._document.doctype) {
                console.warn('Current document does not have a doctype. This may cause ' +
                    'some Mosaic components not to behave as expected.');
            }
        };
        /**
         * @private
         * @return {?}
         */
        McCommonModule.prototype.checkThemeIsPresent = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._document && typeof getComputedStyle === 'function') {
                /** @type {?} */
                var testElement = this._document.createElement('div');
                testElement.classList.add('mc-theme-loaded-marker');
                this._document.body.appendChild(testElement);
                /** @type {?} */
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
        McCommonModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [bidi.BidiModule],
                        exports: [bidi.BidiModule]
                    },] },
        ];
        /** @nocollapse */
        McCommonModule.ctorParameters = function () { return [
            { type: Boolean, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_SANITY_CHECKS,] }] }
        ]; };
        return McCommonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    this._disabled = coercion.coerceBooleanProperty(value);
                },
                enumerable: true,
                configurable: true
            });
            return class_1;
        }(base));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var ThemePalette = {
        Primary: 'primary',
        Second: 'second',
        Error: 'error',
        Default: 'second',
        Empty: '',
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
                    /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Mixin to augment a directive with a `tabIndex` property.
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Mixin to augment a directive with updateErrorState method.
     * For component with `errorState` and need to update `errorState`.
     * @template T
     * @param {?} base
     * @return {?}
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
                /**
                 * Whether the component is in an error state.
                 */
                _this.errorState = false;
                /**
                 * Stream that emits whenever the state of the input changes such that the wrapping
                 * `MatFormField` needs to run change detection.
                 */
                _this.stateChanges = new rxjs.Subject();
                return _this;
            }
            /**
             * @return {?}
             */
            class_1.prototype.updateErrorState = /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var oldState = this.errorState;
                /** @type {?} */
                var parent = this.parentFormGroup || this.parentForm;
                /** @type {?} */
                var matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
                /** @type {?} */
                var control = this.ngControl ? (/** @type {?} */ (this.ngControl.control)) : null;
                /** @type {?} */
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.setLineClass(this._lines.length);
            this._lines.changes.subscribe((/**
             * @return {?}
             */
            function () {
                _this.setLineClass(_this._lines.length);
            }));
        }
        /**
         * @private
         * @param {?} count
         * @return {?}
         */
        McLineSetter.prototype.setLineClass = /**
         * @private
         * @param {?} count
         * @return {?}
         */
        function (count) {
            /** @type {?} */
            var minLineClassNumber = 2;
            /** @type {?} */
            var maxLineClassNumber = 3;
            this.resetClasses();
            if (count === minLineClassNumber || count === maxLineClassNumber) {
                this.setClass("mc-" + count + "-line", true);
            }
            else if (count > maxLineClassNumber) {
                this.setClass("mc-multi-line", true);
            }
        };
        /**
         * @private
         * @return {?}
         */
        McLineSetter.prototype.resetClasses = /**
         * @private
         * @return {?}
         */
        function () {
            this.setClass('mc-2-line', false);
            this.setClass('mc-3-line', false);
            this.setClass('mc-multi-line', false);
        };
        /**
         * @private
         * @param {?} className
         * @param {?} isAdd
         * @return {?}
         */
        McLineSetter.prototype.setClass = /**
         * @private
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
                        imports: [],
                        exports: [McLine],
                        declarations: [McLine]
                    },] },
        ];
        return McLineModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Error state matcher that matches when a control is invalid and dirty.
     */
    var ShowOnDirtyErrorStateMatcher = /** @class */ (function () {
        function ShowOnDirtyErrorStateMatcher() {
        }
        /**
         * @param {?} control
         * @param {?} form
         * @return {?}
         */
        ShowOnDirtyErrorStateMatcher.prototype.isErrorState = /**
         * @param {?} control
         * @param {?} form
         * @return {?}
         */
        function (control, form) {
            return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
        };
        ShowOnDirtyErrorStateMatcher.decorators = [
            { type: core.Injectable },
        ];
        return ShowOnDirtyErrorStateMatcher;
    }());
    /**
     * Provider that defines how form controls behave with regards to displaying error messages.
     */
    var ErrorStateMatcher = /** @class */ (function () {
        function ErrorStateMatcher() {
        }
        /**
         * @param {?} control
         * @param {?} form
         * @return {?}
         */
        ErrorStateMatcher.prototype.isErrorState = /**
         * @param {?} control
         * @param {?} form
         * @return {?}
         */
        function (control, form) {
            return !!(control && control.invalid && (control.touched || (form && form.submitted)));
        };
        ErrorStateMatcher.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] },
        ];
        /** @nocollapse */ ErrorStateMatcher.ngInjectableDef = core["ɵɵdefineInjectable"]({ factory: function ErrorStateMatcher_Factory() { return new ErrorStateMatcher(); }, token: ErrorStateMatcher, providedIn: "root" });
        return ErrorStateMatcher;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.state = 'unchecked';
            this.disabled = false;
        }
        McPseudoCheckbox.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-pseudo-checkbox',
                        template: "<i class=\"mc-checkbox-checkmark mc mc-check_16\"></i> <i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>",
                        styles: [".mc-pseudo-checkbox{position:relative;display:inline-block;box-sizing:border-box;width:16px;height:16px;border-radius:3px;border-width:1px;border-style:solid;cursor:pointer;vertical-align:middle;flex-shrink:0}.mc-pseudo-checkbox .mc-checkbox-checkmark,.mc-pseudo-checkbox .mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px}.mc-pseudo-checkbox.mc-pseudo-checkbox-checked,.mc-pseudo-checkbox.mc-pseudo-checkbox-indeterminate{border-color:transparent}.mc-pseudo-checkbox.mc-checked .mc-checkbox-checkmark{display:inline-block}.mc-pseudo-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:inline-block}.mc-pseudo-checkbox.mc-disabled{cursor:default}"],
                        host: {
                            class: 'mc-pseudo-checkbox',
                            '[class.mc-indeterminate]': 'state === "indeterminate"',
                            '[class.mc-checked]': 'state === "checked"',
                            '[class.mc-disabled]': 'disabled'
                        },
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        McPseudoCheckbox.propDecorators = {
            state: [{ type: core.Input }],
            disabled: [{ type: core.Input }]
        };
        return McPseudoCheckbox;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var MultipleMode = {
        CHECKBOX: 'checkbox',
        KEYBOARD: 'keyboard',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            get: /**
             * @return {?}
             */
            function () {
                if (this._scrollBarWidth) {
                    return this._scrollBarWidth;
                }
                this.initScrollBarWidth();
                return this._scrollBarWidth;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McMeasureScrollbarService.prototype.initScrollBarWidth = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var scrollDiv = this.document.createElement('div');
            // tslint:disable-next-line
            for (var scrollProp in this.scrollbarMeasure) {
                if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
                    scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
                }
            }
            this.document.body.appendChild(scrollDiv);
            /** @type {?} */
            var width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            this.document.body.removeChild(scrollDiv);
            this._scrollBarWidth = width;
        };
        McMeasureScrollbarService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        McMeasureScrollbarService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        /** @nocollapse */ McMeasureScrollbarService.ngInjectableDef = core["ɵɵdefineInjectable"]({ factory: function McMeasureScrollbarService_Factory() { return new McMeasureScrollbarService(core["ɵɵinject"](common.DOCUMENT)); }, token: McMeasureScrollbarService, providedIn: "root" });
        return McMeasureScrollbarService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@docs-private
     */
    var   /**
     * \@docs-private
     */
    McOptgroupBase = /** @class */ (function () {
        function McOptgroupBase() {
        }
        return McOptgroupBase;
    }());
    // tslint:disable-next-line: naming-convention
    /** @type {?} */
    var McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
    /** @type {?} */
    var uniqueOptgroupIdCounter = 0;
    /**
     * Component that is used to group instances of `mc-option`.
     */
    var McOptgroup = /** @class */ (function (_super) {
        __extends(McOptgroup, _super);
        function McOptgroup() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Unique id for the underlying label.
             */
            _this.labelId = "mc-optgroup-label-" + uniqueOptgroupIdCounter++;
            return _this;
        }
        McOptgroup.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-optgroup',
                        exportAs: 'mcOptgroup',
                        template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label><ng-content select=\"mc-option, mc-list-option, ng-container\"></ng-content>",
                        styles: [".mc-optgroup-label{padding-left:17px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        inputs: ['disabled'],
                        host: {
                            class: 'mc-optgroup',
                            '[class.mc-disabled]': 'disabled'
                        }
                    },] },
        ];
        McOptgroup.propDecorators = {
            label: [{ type: core.Input }]
        };
        return McOptgroup;
    }(McOptgroupMixinBase));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Option IDs need to be unique across components, so this counter exists outside of
     * the component definition.
     * @type {?}
     */
    var uniqueIdCounter = 0;
    /**
     * Event object emitted by McOption when selected or deselected.
     */
    var   /**
     * Event object emitted by McOption when selected or deselected.
     */
    McOptionSelectionChange = /** @class */ (function () {
        function McOptionSelectionChange(source, isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.source = source;
            this.isUserInput = isUserInput;
        }
        return McOptionSelectionChange;
    }());
    /**
     * Injection token used to provide the parent component to options.
     * @type {?}
     */
    var MC_OPTION_PARENT_COMPONENT = new core.InjectionToken('MC_OPTION_PARENT_COMPONENT');
    /**
     * Single option inside of a `<mc-select>` element.
     */
    var McOption = /** @class */ (function () {
        function McOption(element, changeDetectorRef, parent, group) {
            this.element = element;
            this.changeDetectorRef = changeDetectorRef;
            this.parent = parent;
            this.group = group;
            /**
             * Event emitted when the option is selected or deselected.
             */
            // tslint:disable-next-line:no-output-on-prefix
            this.onSelectionChange = new core.EventEmitter();
            /**
             * Emits when the state of the option changes and any parents have to be notified.
             */
            this.stateChanges = new rxjs.Subject();
            this._id = "mc-option-" + uniqueIdCounter++;
            this._selected = false;
            this._disabled = false;
            this._active = false;
            this.mostRecentViewValue = '';
        }
        Object.defineProperty(McOption.prototype, "showCheckbox", {
            get: /**
             * @return {?}
             */
            function () {
                return this._showCheckbox === undefined ? this.multiple : this._showCheckbox;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._showCheckbox = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "viewValue", {
            /**
             * The displayed value of the option. It is necessary to show the selected option in the
             * select's trigger.
             */
            get: /**
             * The displayed value of the option. It is necessary to show the selected option in the
             * select's trigger.
             * @return {?}
             */
            function () {
                // TODO: Add input property alternative for node envs.
                return (this.getHostElement().textContent || '').trim();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "multiple", {
            /** Whether the wrapping component is in multiple selection mode. */
            get: /**
             * Whether the wrapping component is in multiple selection mode.
             * @return {?}
             */
            function () {
                return this.parent && this.parent.multiple;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "id", {
            get: /**
             * @return {?}
             */
            function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "selected", {
            get: /**
             * @return {?}
             */
            function () {
                return this._selected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(McOption.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return (this.group && this.group.disabled) || this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
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
            get: /**
             * Whether or not the option is currently active and ready to be selected.
             * An active option displays styles as if it is focused, but the
             * focus is actually retained somewhere else. This comes in handy
             * for components like autocomplete where focus must remain on the input.
             * @return {?}
             */
            function () {
                return this._active;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        McOption.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
        function () {
            // Since parent components could be using the option's label to display the selected values
            // (e.g. `mc-select`) and they don't have a way of knowing if the option's label has changed
            // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
            // relatively cheap, however we still limit them only to selected options in order to avoid
            // hitting the DOM too often.
            if (this._selected) {
                /** @type {?} */
                var viewValue = this.viewValue;
                if (viewValue !== this.mostRecentViewValue) {
                    this.mostRecentViewValue = viewValue;
                    this.stateChanges.next();
                }
            }
        };
        /**
         * @return {?}
         */
        McOption.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.stateChanges.complete();
        };
        /**
         * @return {?}
         */
        McOption.prototype.getHeight = /**
         * @return {?}
         */
        function () {
            // tslint:disable-next-line:naming-convention
            /** @type {?} */
            var DOMRect = this.element.nativeElement.getClientRects()[0];
            return DOMRect ? DOMRect.height : 0;
        };
        /**
         * @return {?}
         */
        McOption.prototype.select = /**
         * @return {?}
         */
        function () {
            if (!this._selected) {
                this._selected = true;
                this.changeDetectorRef.markForCheck();
                this.emitSelectionChangeEvent();
            }
        };
        /**
         * @return {?}
         */
        McOption.prototype.deselect = /**
         * @return {?}
         */
        function () {
            if (this._selected) {
                this._selected = false;
                this.changeDetectorRef.markForCheck();
                this.emitSelectionChangeEvent();
            }
        };
        /**
         * @return {?}
         */
        McOption.prototype.focus = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
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
        /**
         * This method sets display styles on the option to make it appear
         * active. This is used by the ActiveDescendantKeyManager so key
         * events will display the proper options as active on arrow key events.
         * @return {?}
         */
        McOption.prototype.setActiveStyles = /**
         * This method sets display styles on the option to make it appear
         * active. This is used by the ActiveDescendantKeyManager so key
         * events will display the proper options as active on arrow key events.
         * @return {?}
         */
        function () {
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
        /**
         * This method removes display styles on the option that made it appear
         * active. This is used by the ActiveDescendantKeyManager so key
         * events will display the proper options as active on arrow key events.
         * @return {?}
         */
        McOption.prototype.setInactiveStyles = /**
         * This method removes display styles on the option that made it appear
         * active. This is used by the ActiveDescendantKeyManager so key
         * events will display the proper options as active on arrow key events.
         * @return {?}
         */
        function () {
            if (this._active) {
                this._active = false;
                this.changeDetectorRef.markForCheck();
            }
        };
        /** Gets the label to be used when determining whether the option should be focused. */
        /**
         * Gets the label to be used when determining whether the option should be focused.
         * @return {?}
         */
        McOption.prototype.getLabel = /**
         * Gets the label to be used when determining whether the option should be focused.
         * @return {?}
         */
        function () {
            return this.viewValue;
        };
        /** Ensures the option is selected when activated from the keyboard. */
        /**
         * Ensures the option is selected when activated from the keyboard.
         * @param {?} event
         * @return {?}
         */
        McOption.prototype.handleKeydown = /**
         * Ensures the option is selected when activated from the keyboard.
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
        /**
         * `Selects the option while indicating the selection came from the user. Used to
         * determine if the select's view -> model callback should be invoked.`
         * @return {?}
         */
        McOption.prototype.selectViaInteraction = /**
         * `Selects the option while indicating the selection came from the user. Used to
         * determine if the select's view -> model callback should be invoked.`
         * @return {?}
         */
        function () {
            if (!this.disabled) {
                this._selected = this.multiple ? !this._selected : true;
                this.changeDetectorRef.markForCheck();
                this.emitSelectionChangeEvent(true);
            }
        };
        /**
         * @return {?}
         */
        McOption.prototype.getTabIndex = /**
         * @return {?}
         */
        function () {
            return this.disabled ? '-1' : '0';
        };
        /**
         * @return {?}
         */
        McOption.prototype.getHostElement = /**
         * @return {?}
         */
        function () {
            return this.element.nativeElement;
        };
        /** Emits the selection change event. */
        /**
         * Emits the selection change event.
         * @private
         * @param {?=} isUserInput
         * @return {?}
         */
        McOption.prototype.emitSelectionChangeEvent = /**
         * Emits the selection change event.
         * @private
         * @param {?=} isUserInput
         * @return {?}
         */
        function (isUserInput) {
            if (isUserInput === void 0) { isUserInput = false; }
            this.onSelectionChange.emit(new McOptionSelectionChange(this, isUserInput));
        };
        McOption.decorators = [
            { type: core.Component, args: [{
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
                        styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;border:2px solid transparent;cursor:pointer;outline:0;padding:0 16px;-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"],
                        template: "<mc-pseudo-checkbox *ngIf=\"showCheckbox\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mc-pseudo-checkbox><span class=\"mc-option-text\"><ng-content></ng-content></span><div class=\"mc-option-overlay\"></div>",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        McOption.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_OPTION_PARENT_COMPONENT,] }] },
            { type: McOptgroup, decorators: [{ type: core.Optional }] }
        ]; };
        McOption.propDecorators = {
            value: [{ type: core.Input }],
            showCheckbox: [{ type: core.Input }],
            onSelectionChange: [{ type: core.Output }],
            disabled: [{ type: core.Input }]
        };
        return McOption;
    }());
    /**
     * Counts the amount of option group labels that precede the specified option.
     * \@docs-private
     * @param {?} optionIndex Index of the option at which to start counting.
     * @param {?} options Flat list of all of the options.
     * @param {?} optionGroups Flat list of all of the option groups.
     * @return {?}
     */
    function countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
        if (optionGroups.length) {
            /** @type {?} */
            var optionsArray = options.toArray();
            /** @type {?} */
            var groups = optionGroups.toArray();
            /** @type {?} */
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
     * \@docs-private
     * @param {?} optionIndex Index of the option to be scrolled into the view.
     * @param {?} optionHeight Height of the options.
     * @param {?} currentScrollPosition Current scroll position of the panel.
     * @param {?} panelHeight Height of the panel.
     * @return {?}
     */
    function getOptionScrollPosition(optionIndex, optionHeight, currentScrollPosition, panelHeight) {
        /** @type {?} */
        var optionOffset = optionIndex * optionHeight;
        if (optionOffset < currentScrollPosition) {
            return optionOffset;
        }
        if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
            return Math.max(0, optionOffset - panelHeight + optionHeight);
        }
        return currentScrollPosition;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McOptionModule = /** @class */ (function () {
        function McOptionModule() {
        }
        McOptionModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, McPseudoCheckboxModule],
                        exports: [McOption, McOptgroup],
                        declarations: [McOption, McOptgroup]
                    },] },
        ];
        return McOptionModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * InjectionToken that can be used to specify the global label options.
     * @type {?}
     */
    var MC_LABEL_GLOBAL_OPTIONS = new core.InjectionToken('mc-label-global-options');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var fadeAnimation = animations.trigger('fadeAnimation', [
        animations.state('void', animations.style({ opacity: 0 })),
        animations.state('true', animations.style({ opacity: 1 })),
        animations.state('false', animations.style({ opacity: 0 })),
        animations.transition('* => true', animations.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
        animations.transition('* => void', animations.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
    ]);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var AnimationCurves = {
        StandardCurve: 'cubic-bezier(0.4,0.0,0.2,1)',
        DecelerationCurve: 'cubic-bezier(0.0,0.0,0.2,1)',
        AccelerationCurve: 'cubic-bezier(0.4,0.0,1,1)',
        SharpCurve: 'cubic-bezier(0.4,0.0,0.6,1)',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
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
            overlayY: 'bottom'
        },
        topLeft: {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom'
        },
        topRight: {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom'
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
            overlayY: 'top'
        },
        rightBottom: {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom'
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
    /** @type {?} */
    var DEFAULT_4_POSITIONS = objectValues([
        POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left
    ]);
    /** @type {?} */
    var EXTENDED_OVERLAY_POSITIONS = objectValues([
        POSITION_MAP.top, POSITION_MAP.topLeft, POSITION_MAP.topRight, POSITION_MAP.right, POSITION_MAP.rightTop,
        POSITION_MAP.rightBottom, POSITION_MAP.bottom, POSITION_MAP.bottomLeft, POSITION_MAP.bottomRight,
        POSITION_MAP.left, POSITION_MAP.leftTop, POSITION_MAP.leftBottom
    ]);
    /** @type {?} */
    var POSITION_TO_CSS_MAP = {
        top: 'top',
        topLeft: 'top-left',
        topRight: 'top-right',
        right: 'right',
        rightTop: 'right-top',
        rightBottom: 'right-bottom',
        left: 'left',
        leftTop: 'left-top',
        leftBottom: 'left-bottom',
        bottom: 'bottom',
        bottomLeft: 'bottom-left',
        bottomRight: 'bottom-right'
    };
    /**
     * @template T, S
     * @param {?} array
     * @param {?} iteratee
     * @return {?}
     */
    function arrayMap(array, iteratee) {
        /** @type {?} */
        var index = -1;
        /** @type {?} */
        var length = array == null ? 0 : array.length;
        /** @type {?} */
        var result = Array(length);
        while (++index < length) {
            result[index] = iteratee(array[index], index, array);
        }
        return result;
    }
    /**
     * @template T
     * @param {?} object
     * @param {?} props
     * @return {?}
     */
    function baseValues(object, props) {
        return arrayMap(props, (/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return object[key];
        }));
    }
    /**
     * @template T
     * @param {?} object
     * @return {?}
     */
    function objectValues(object) {
        return object == null ? [] : baseValues(object, Object.keys(object));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var selectEvents = 'selectEvents';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Returns an exception to be thrown when attempting to change a select's `multiple` option
     * after initialization.
     * \@docs-private
     * @return {?}
     */
    function getMcSelectDynamicMultipleError() {
        return Error('Cannot change `multiple` mode of select after initialization.');
    }
    /**
     * Returns an exception to be thrown when attempting to assign a non-array value to a select
     * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
     * resetting the value.
     * \@docs-private
     * @return {?}
     */
    function getMcSelectNonArrayValueError() {
        return Error('Value must be an array in multiple-selection mode.');
    }
    /**
     * Returns an exception to be thrown when assigning a non-function value to the comparator
     * used to determine if a value corresponds to an option. Note that whether the function
     * actually takes two values and returns a boolean is not checked.
     * @return {?}
     */
    function getMcSelectNonFunctionValueError() {
        return Error('`compareWith` must be a function.');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * The max height of the select's overlay panel
     * @type {?}
     */
    var SELECT_PANEL_MAX_HEIGHT = 224;
    /**
     * The panel's padding on the x-axis
     * @type {?}
     */
    var SELECT_PANEL_PADDING_X = 1;
    /* tslint:disable-next-line:no-magic-numbers */
    /**
     * The panel's x axis padding if it is indented (e.g. there is an option group).
     * @type {?}
     */
    var SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
    /**
     * The select panel will only "fit" inside the viewport if it is positioned at
     * this value or more away from the viewport boundary.
     * @type {?}
     */
    var SELECT_PANEL_VIEWPORT_PADDING = 8;
    /**
     * Injection token that determines the scroll handling while a select is open.
     * @type {?}
     */
    var MC_SELECT_SCROLL_STRATEGY = new core.InjectionToken('mc-select-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */
    function mcSelectScrollStrategyProviderFactory(overlay) {
        return (/**
         * @return {?}
         */
        function () { return overlay.scrollStrategies.reposition(); });
    }
    /**
     * \@docs-private
     * @type {?}
     */
    var MC_SELECT_SCROLL_STRATEGY_PROVIDER = {
        provide: MC_SELECT_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: mcSelectScrollStrategyProviderFactory
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * The following are all the animations for the mc-select component, with each
     * const containing the metadata for one animation.
     *
     * @type {?}
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McHighlightPipe = /** @class */ (function () {
        function McHighlightPipe() {
        }
        /**
         * @param {?} value
         * @param {?} args
         * @return {?}
         */
        McHighlightPipe.prototype.transform = /**
         * @param {?} value
         * @param {?} args
         * @return {?}
         */
        function (value, args) {
            if (!args) {
                return value;
            }
            return value.replace(new RegExp("(" + args + ")", 'gi'), '<mark class="mc-highlight">$1</mark>');
        };
        McHighlightPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'mcHighlight' },] },
        ];
        return McHighlightPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McHighlightModule = /** @class */ (function () {
        function McHighlightModule() {
        }
        McHighlightModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        exports: [McHighlightPipe],
                        declarations: [McHighlightPipe]
                    },] },
        ];
        return McHighlightModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MC_LOCALE_ID = new core.InjectionToken('McLocaleId');
    /** @type {?} */
    var DEFAULT_MC_LOCALE_ID = 'ru';
    /**
     * @param {?} value
     * @return {?}
     */
    function isEmpty(value) {
        return value == null || value === '' || value !== value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function strToNumber(value) {
        if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
            return Number(value);
        }
        if (typeof value !== 'number') {
            throw new Error(value + " is not a number");
        }
        return value;
    }
    /** @type {?} */
    var NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
    /** @type {?} */
    var minIntGroupPosition = 1;
    /** @type {?} */
    var minFractionGroupPosition = 3;
    /** @type {?} */
    var maxFractionGroupPosition = 5;
    var ParsedDigitsInfo = /** @class */ (function () {
        function ParsedDigitsInfo() {
        }
        return ParsedDigitsInfo;
    }());
    /**
     * @param {?} digitsInfo
     * @return {?}
     */
    function parseDigitsInfo(digitsInfo) {
        /** @type {?} */
        var parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
        if (parts === null) {
            throw new Error(digitsInfo + " is not a valid digit info");
        }
        /** @type {?} */
        var minIntPart = parts[minIntGroupPosition];
        /** @type {?} */
        var minFractionPart = parts[minFractionGroupPosition];
        /** @type {?} */
        var maxFractionPart = parts[maxFractionGroupPosition];
        /** @type {?} */
        var result = new ParsedDigitsInfo();
        if (minIntPart != null) {
            result.minimumIntegerDigits = parseInt(minIntPart);
        }
        if (minFractionPart != null) {
            result.minimumFractionDigits = parseInt(minFractionPart);
        }
        if (maxFractionPart != null) {
            result.maximumFractionDigits = parseInt(maxFractionPart);
        }
        else if (minFractionPart != null && result.minimumFractionDigits > result.maximumFractionDigits) {
            result.maximumFractionDigits = result.minimumFractionDigits;
        }
        return result;
    }
    var McDecimalPipe = /** @class */ (function () {
        function McDecimalPipe(_locale) {
            this._locale = _locale;
        }
        /**
         * @param value The number to be formatted.
         * @param digitsInfo Decimal representation options, specified by a string
         * in the following format:<br>
         * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
         *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
         * Default is `1`.
         *   - `minFractionDigits`: The minimum number of digits after the decimal point.
         * Default is `0`.
         *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
         * Default is `3`.
         * @param locale A locale code for the locale format rules to use.
         * When not supplied, uses the value of `MC_LOCALE_ID`, which is `ru` by default.
         */
        /**
         * @param {?} value The number to be formatted.
         * @param {?=} digitsInfo Decimal representation options, specified by a string
         * in the following format:<br>
         * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
         *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
         * Default is `1`.
         *   - `minFractionDigits`: The minimum number of digits after the decimal point.
         * Default is `0`.
         *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
         * Default is `3`.
         * @param {?=} locale A locale code for the locale format rules to use.
         * When not supplied, uses the value of `MC_LOCALE_ID`, which is `ru` by default.
         * @return {?}
         */
        McDecimalPipe.prototype.transform = /**
         * @param {?} value The number to be formatted.
         * @param {?=} digitsInfo Decimal representation options, specified by a string
         * in the following format:<br>
         * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
         *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
         * Default is `1`.
         *   - `minFractionDigits`: The minimum number of digits after the decimal point.
         * Default is `0`.
         *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
         * Default is `3`.
         * @param {?=} locale A locale code for the locale format rules to use.
         * When not supplied, uses the value of `MC_LOCALE_ID`, which is `ru` by default.
         * @return {?}
         */
        function (value, digitsInfo, locale) {
            if (isEmpty(value)) {
                return null;
            }
            /** @type {?} */
            var currentLocale = locale || this._locale || DEFAULT_MC_LOCALE_ID;
            /** @type {?} */
            var parsedDigitsInfo;
            if (digitsInfo) {
                parsedDigitsInfo = parseDigitsInfo(digitsInfo);
            }
            /** @type {?} */
            var options = __assign({ useGrouping: true, minimumIntegerDigits: 1, minimumFractionDigits: 0, maximumFractionDigits: 3 }, parsedDigitsInfo);
            try {
                /** @type {?} */
                var num = strToNumber(value);
                return Intl.NumberFormat.call(this, currentLocale, options).format(num);
            }
            catch (error) {
                throw Error("InvalidPipeArgument: McDecimalPipe for pipe '" + JSON.stringify(error.message) + "'");
            }
        };
        McDecimalPipe.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] },
            { type: core.Pipe, args: [{ name: 'mcNumber' },] },
        ];
        /** @nocollapse */
        McDecimalPipe.ctorParameters = function () { return [
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_LOCALE_ID,] }] }
        ]; };
        /** @nocollapse */ McDecimalPipe.ngInjectableDef = core["ɵɵdefineInjectable"]({ factory: function McDecimalPipe_Factory() { return new McDecimalPipe(core["ɵɵinject"](MC_LOCALE_ID, 8)); }, token: McDecimalPipe, providedIn: "root" });
        return McDecimalPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McFormattersModule = /** @class */ (function () {
        function McFormattersModule() {
        }
        McFormattersModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [
                            McDecimalPipe
                        ],
                        declarations: [
                            McDecimalPipe
                        ]
                    },] },
        ];
        return McFormattersModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MC_VALIDATION = new core.InjectionToken('McUseValidation', { factory: (/**
         * @return {?}
         */
        function () { return ({ useValidation: true }); }) });
    /**
     * @param {?} control
     * @param {?} validator
     * @return {?}
     */
    function setValidState(control, validator) {
        if (!control) {
            return;
        }
        control.clearValidators();
        control.updateValueAndValidity({ emitEvent: false });
        control.setValidators(validator);
    }
    /**
     * This function do next:
     * - run validation on submitting parent form
     * - prevent validation in required validator if form doesn't submitted
     * - if control focused validation will be prevented
     * @param {?} component
     * @return {?}
     */
    function setMosaicValidation(component) {
        /** @type {?} */
        var ngControl = component.ngControl;
        if (!ngControl) {
            return;
        }
        /** @type {?} */
        var parentForm = component.parentForm || component.parentFormGroup;
        if (parentForm) {
            parentForm.ngSubmit.subscribe((/**
             * @return {?}
             */
            function () {
                // tslint:disable-next-line: no-unnecessary-type-assertion
                (/** @type {?} */ (ngControl.control)).updateValueAndValidity();
            }));
        }
        if (component.ngModel) {
            setMosaicValidationForModelControl(component, component.rawValidators, parentForm);
        }
        else if (component.formControlName) {
            setMosaicValidationForFormControl(component, parentForm, ngControl);
        }
    }
    /**
     * @param {?} component
     * @param {?} validators
     * @param {?} parentForm
     * @return {?}
     */
    function setMosaicValidationForModelControl(component, validators, parentForm) {
        if (!validators) {
            return;
        }
        validators.forEach((/**
         * @param {?} validator
         * @return {?}
         */
        function (validator) {
            // tslint:disable-next-line: no-unbound-method
            /** @type {?} */
            var originalValidate = validator.validate;
            if (validator instanceof forms.RequiredValidator) {
                // changed required validation logic
                validator.validate = (/**
                 * @param {?} control
                 * @return {?}
                 */
                function (control) {
                    if (parentForm && !parentForm.submitted) {
                        return null;
                    }
                    return originalValidate.call(validator, control);
                });
            }
            else {
                // changed all other validation logic
                validator.validate = (/**
                 * @param {?} control
                 * @return {?}
                 */
                function (control) {
                    if (component.focused) {
                        return null;
                    }
                    return originalValidate.call(validator, control);
                });
            }
        }));
    }
    /**
     * @param {?} component
     * @param {?} parentForm
     * @param {?} ngControl
     * @return {?}
     */
    function setMosaicValidationForFormControl(component, parentForm, ngControl) {
        /** @type {?} */
        var originalValidator = (/** @type {?} */ (ngControl.control)).validator;
        // changed required validation logic after initialization
        if (ngControl.invalid && (/** @type {?} */ (ngControl.errors)).required) {
            setValidState((/** @type {?} */ (ngControl.control)), (/** @type {?} */ (originalValidator)));
        }
        // check dynamic updates
        (/** @type {?} */ (ngControl.statusChanges)).subscribe((/**
         * @return {?}
         */
        function () {
            // changed required validation logic
            if (ngControl.invalid && !parentForm.submitted && (/** @type {?} */ (ngControl.errors)).required) {
                setValidState((/** @type {?} */ (ngControl.control)), (/** @type {?} */ (originalValidator)));
            }
            // changed all other validation logic
            if (ngControl.invalid && component.focused) {
                setValidState((/** @type {?} */ (ngControl.control)), (/** @type {?} */ (originalValidator)));
            }
        }));
    }

    exports.AnimationCurves = AnimationCurves;
    exports.DEFAULT_4_POSITIONS = DEFAULT_4_POSITIONS;
    exports.DEFAULT_MC_LOCALE_ID = DEFAULT_MC_LOCALE_ID;
    exports.EXTENDED_OVERLAY_POSITIONS = EXTENDED_OVERLAY_POSITIONS;
    exports.ErrorStateMatcher = ErrorStateMatcher;
    exports.MC_LABEL_GLOBAL_OPTIONS = MC_LABEL_GLOBAL_OPTIONS;
    exports.MC_LOCALE_ID = MC_LOCALE_ID;
    exports.MC_OPTION_PARENT_COMPONENT = MC_OPTION_PARENT_COMPONENT;
    exports.MC_SANITY_CHECKS = MC_SANITY_CHECKS;
    exports.MC_SELECT_SCROLL_STRATEGY = MC_SELECT_SCROLL_STRATEGY;
    exports.MC_SELECT_SCROLL_STRATEGY_PROVIDER = MC_SELECT_SCROLL_STRATEGY_PROVIDER;
    exports.MC_VALIDATION = MC_VALIDATION;
    exports.McCommonModule = McCommonModule;
    exports.McDecimalPipe = McDecimalPipe;
    exports.McFormattersModule = McFormattersModule;
    exports.McHighlightModule = McHighlightModule;
    exports.McHighlightPipe = McHighlightPipe;
    exports.McLine = McLine;
    exports.McLineModule = McLineModule;
    exports.McLineSetter = McLineSetter;
    exports.McMeasureScrollbarService = McMeasureScrollbarService;
    exports.McOptgroup = McOptgroup;
    exports.McOptgroupBase = McOptgroupBase;
    exports.McOptgroupMixinBase = McOptgroupMixinBase;
    exports.McOption = McOption;
    exports.McOptionModule = McOptionModule;
    exports.McOptionSelectionChange = McOptionSelectionChange;
    exports.McPseudoCheckbox = McPseudoCheckbox;
    exports.McPseudoCheckboxModule = McPseudoCheckboxModule;
    exports.MultipleMode = MultipleMode;
    exports.NUMBER_FORMAT_REGEXP = NUMBER_FORMAT_REGEXP;
    exports.POSITION_MAP = POSITION_MAP;
    exports.POSITION_TO_CSS_MAP = POSITION_TO_CSS_MAP;
    exports.SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_INDENT_PADDING_X;
    exports.SELECT_PANEL_MAX_HEIGHT = SELECT_PANEL_MAX_HEIGHT;
    exports.SELECT_PANEL_PADDING_X = SELECT_PANEL_PADDING_X;
    exports.SELECT_PANEL_VIEWPORT_PADDING = SELECT_PANEL_VIEWPORT_PADDING;
    exports.ShowOnDirtyErrorStateMatcher = ShowOnDirtyErrorStateMatcher;
    exports.ThemePalette = ThemePalette;
    exports.countGroupLabelsBeforeOption = countGroupLabelsBeforeOption;
    exports.fadeAnimation = fadeAnimation;
    exports.getMcSelectDynamicMultipleError = getMcSelectDynamicMultipleError;
    exports.getMcSelectNonArrayValueError = getMcSelectNonArrayValueError;
    exports.getMcSelectNonFunctionValueError = getMcSelectNonFunctionValueError;
    exports.getOptionScrollPosition = getOptionScrollPosition;
    exports.isBoolean = isBoolean;
    exports.mcSelectAnimations = mcSelectAnimations;
    exports.mcSelectScrollStrategyProviderFactory = mcSelectScrollStrategyProviderFactory;
    exports.mixinColor = mixinColor;
    exports.mixinDisabled = mixinDisabled;
    exports.mixinErrorState = mixinErrorState;
    exports.mixinTabIndex = mixinTabIndex;
    exports.selectEvents = selectEvents;
    exports.setMosaicValidation = setMosaicValidation;
    exports.setMosaicValidationForFormControl = setMosaicValidationForFormControl;
    exports.setMosaicValidationForModelControl = setMosaicValidationForModelControl;
    exports.toBoolean = toBoolean;
    exports.ɵa3 = mcSanityChecksFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-core.umd.js.map

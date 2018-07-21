/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { NgModule, InjectionToken, Optional, Inject, isDevMode, Directive, Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { BidiModule } from '@ptsecurity/cdk/bidi';
import { __extends } from 'tslib';

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
var /** @type {?} */ MС_SANITY_CHECKS = new InjectionToken('mc-sanity-checks', {
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
        return this._sanityChecksEnabled && isDevMode() && !this._isTestEnv();
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
        { type: NgModule, args: [{
                    imports: [BidiModule],
                    exports: [BidiModule]
                },] },
    ];
    /** @nocollapse */
    McCommonModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MС_SANITY_CHECKS,] },] },
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
        { type: Directive, args: [{
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
var  /**
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
        { type: NgModule, args: [{
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
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
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
        "state": [{ type: Input },],
        "disabled": [{ type: Input },],
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
        { type: NgModule, args: [{
                    exports: [McPseudoCheckbox],
                    declarations: [McPseudoCheckbox]
                },] },
    ];
    return McPseudoCheckboxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { isBoolean, toBoolean, McCommonModule, MС_SANITY_CHECKS, mixinDisabled, mixinColor, ThemePalette, mixinTabIndex, McLine, McLineSetter, McLineModule, McPseudoCheckboxModule, McPseudoCheckbox, MC_SANITY_CHECKS_FACTORY as ɵa0 };
//# sourceMappingURL=core.es5.js.map

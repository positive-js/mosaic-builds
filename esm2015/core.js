/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { NgModule, InjectionToken, Optional, Inject, isDevMode, Directive, Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';

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
    return value != null && `${value}` !== 'false';
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
// Injection token that configures whether the Material sanity checks are enabled.
const /** @type {?} */ MС_SANITY_CHECKS = new InjectionToken('mc-sanity-checks');
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
class McCommonModule {
    /**
     * @param {?} _sanityChecksEnabled
     */
    constructor(_sanityChecksEnabled) {
        this._sanityChecksEnabled = _sanityChecksEnabled;
        this._hasDoneGlobalChecks = false;
        this._hasCheckedHammer = false;
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
    _areChecksEnabled() {
        return this._sanityChecksEnabled && isDevMode() && !this._isTestEnv();
    }
    /**
     * @return {?}
     */
    _isTestEnv() {
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    }
    /**
     * @return {?}
     */
    _checkDoctypeIsDefined() {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    }
    /**
     * @return {?}
     */
    _checkThemeIsPresent() {
        if (this._document && typeof getComputedStyle === 'function') {
            const /** @type {?} */ testElement = this._document.createElement('div');
            testElement.classList.add('mc-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            const /** @type {?} */ computedStyle = getComputedStyle(testElement);
            // In some situations, the computed style of the test element can be null. For example in
            // Firefox, the computed style is null if an application is running inside of a hidden iframe.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
            if (computedStyle && computedStyle.display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    }
    /**
     * @return {?}
     */
    _checkHammerIsAvailable() {
        if (this._hasCheckedHammer || !this._window) {
            return;
        }
        if (this._areChecksEnabled() && !this._window['Hammer']) {
            console.warn('Could not find HammerJS. Certain Angular Material components may not work correctly.');
        }
        this._hasCheckedHammer = true;
    }
}
McCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [],
                providers: [{
                        provide: MС_SANITY_CHECKS, useValue: true
                    }]
            },] },
];
/** @nocollapse */
McCommonModule.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MС_SANITY_CHECKS,] },] },
];

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
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this._disabled = false;
        }
        /**
         * @return {?}
         */
        get disabled() {
            return this._disabled;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set disabled(value) {
            this._disabled = toBoolean(value);
        }
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const ThemePalette = {
    Primary: 'primary',
    Second: 'second',
    Warn: 'warn',
    Default: '',
};
/**
 * Mixin to augment a directive with a `color` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultColor
 * @return {?}
 */
function mixinColor(base, defaultColor = ThemePalette.Default) {
    return class extends base {
        /**
         * @return {?}
         */
        get color() {
            return this._color;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set color(value) {
            const /** @type {?} */ colorPalette = value || defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._elementRef.nativeElement.classList.remove(`mc-${this._color}`);
                }
                if (colorPalette) {
                    this._elementRef.nativeElement.classList.add(`mc-${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            // Set the default color that can be specified from the mixin.
            this.color = defaultColor;
        }
    };
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
function mixinTabIndex(base, defaultTabIndex = 0) {
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this._tabIndex = defaultTabIndex;
        }
        /**
         * @return {?}
         */
        get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set tabIndex(value) {
            this._tabIndex = value != null ? value : defaultTabIndex;
        }
    };
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
class McLine {
}
McLine.decorators = [
    { type: Directive, args: [{
                selector: '[mc-line], [mcLine]',
                host: { class: 'mc-line' }
            },] },
];
/** @nocollapse */
McLine.ctorParameters = () => [];
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
class McLineSetter {
    /**
     * @param {?} _lines
     * @param {?} _element
     */
    constructor(_lines, _element) {
        this._lines = _lines;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this._setLineClass(this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    _setLineClass(count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass(`mc-${count}-line`, true);
        }
        else if (count > 3) {
            this._setClass(`mc-multi-line`, true);
        }
    }
    /**
     * @return {?}
     */
    _resetClasses() {
        this._setClass('mc-2-line', false);
        this._setClass('mc-3-line', false);
        this._setClass('mc-multi-line', false);
    }
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    _setClass(className, isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add(className);
        }
        else {
            this._element.nativeElement.classList.remove(className);
        }
    }
}
class McLineModule {
}
McLineModule.decorators = [
    { type: NgModule, args: [{
                imports: [McCommonModule],
                exports: [McLine, McCommonModule],
                declarations: [McLine]
            },] },
];
/** @nocollapse */
McLineModule.ctorParameters = () => [];

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
class McPseudoCheckbox {
    constructor() {
        // Display state of the checkbox.
        this.state = 'unchecked';
        // Whether the checkbox is disabled.
        this.disabled = false;
    }
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
McPseudoCheckbox.ctorParameters = () => [];
McPseudoCheckbox.propDecorators = {
    "state": [{ type: Input },],
    "disabled": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class McPseudoCheckboxModule {
}
McPseudoCheckboxModule.decorators = [
    { type: NgModule, args: [{
                exports: [McPseudoCheckbox],
                declarations: [McPseudoCheckbox]
            },] },
];
/** @nocollapse */
McPseudoCheckboxModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { isBoolean, toBoolean, McCommonModule, MС_SANITY_CHECKS, mixinDisabled, mixinColor, ThemePalette, mixinTabIndex, McLine, McLineSetter, McLineModule, McPseudoCheckboxModule, McPseudoCheckbox };
//# sourceMappingURL=core.js.map

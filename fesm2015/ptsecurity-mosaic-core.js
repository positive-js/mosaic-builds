import { BidiModule } from '@angular/cdk/bidi';
import { InjectionToken, isDevMode, NgModule, Optional, Inject, Directive, Injectable, ɵɵdefineInjectable, ɵɵinject, Pipe, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, EventEmitter, ElementRef, ChangeDetectorRef, Output } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { RequiredValidator } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Overlay } from '@angular/cdk/overlay';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { ENTER, SPACE } from '@ptsecurity/cdk/keycodes';

function isBoolean(val) { return typeof val === 'boolean'; }
function toBoolean(value) {
    return value != null && `${value}` !== 'false';
}

// Injection token that configures whether the Mosaic sanity checks are enabled.
const MC_SANITY_CHECKS = new InjectionToken('mc-sanity-checks', {
    providedIn: 'root',
    factory: mcSanityChecksFactory
});
function mcSanityChecksFactory() {
    return true;
}
/**
 * Module that captures anything that should be loaded and/or run for *all* Mosaic
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., McTabsModule).
 */
class McCommonModule {
    constructor(_sanityChecksEnabled) {
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
    areChecksEnabled() {
        return this._sanityChecksEnabled && isDevMode() && !this.isTestEnv();
    }
    // Whether the code is running in tests.
    isTestEnv() {
        // tslint:disable-next-line
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    }
    checkDoctypeIsDefined() {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Mosaic components not to behave as expected.');
        }
    }
    checkThemeIsPresent() {
        if (this._document && typeof getComputedStyle === 'function') {
            const testElement = this._document.createElement('div');
            testElement.classList.add('mc-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            const computedStyle = getComputedStyle(testElement);
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
    }
}
McCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule],
                exports: [BidiModule]
            },] }
];
/** @nocollapse */
McCommonModule.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MC_SANITY_CHECKS,] }] }
];

function mixinDisabled(base) {
    return class extends base {
        constructor(...args) {
            // tslint:disable-next-line
            super(...args);
            this._disabled = false;
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
        }
    };
}

var ThemePalette;
(function (ThemePalette) {
    ThemePalette["Primary"] = "primary";
    ThemePalette["Second"] = "second";
    ThemePalette["Error"] = "error";
    ThemePalette["Default"] = "second";
    ThemePalette["Empty"] = "";
})(ThemePalette || (ThemePalette = {}));
/** Mixin to augment a directive with a `color` property. */
function mixinColor(base, defaultColor = ThemePalette.Default) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.color = defaultColor;
        }
        get color() {
            return this._color;
        }
        set color(value) {
            const colorPalette = value || defaultColor;
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
    };
}

// Mixin to augment a directive with a `tabIndex` property.
function mixinTabIndex(base, defaultTabIndex = 0) {
    // Note: We cast `base` to `unknown` and then `Constructor`. It could be an abstract class,
    // but given we `extend` it from another class, we can assume a constructor being accessible.
    // tslint:disable-next-line:naming-convention
    class Mixin extends base {
        constructor(...args) {
            super(...args);
            // tslint:disable-next-line:orthodox-getter-and-setter
            this._tabIndex = defaultTabIndex;
            this.defaultTabIndex = defaultTabIndex;
        }
        get tabIndex() { return this.disabled ? -1 : this._tabIndex; }
        set tabIndex(value) {
            // If the specified tabIndex value is null or undefined, fall back to the default value.
            this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
        }
    }
    // Since we don't directly extend from `base` with it's original types, and we instruct
    // TypeScript that `T` actually is instantiatable through `new`, the types don't overlap.
    // This is a limitation in TS as abstract classes cannot be typed properly dynamically.
    return Mixin;
}

/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 */
function mixinErrorState(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            /** Whether the component is in an error state. */
            this.errorState = false;
            /**
             * Stream that emits whenever the state of the input changes such that the wrapping
             * `MatFormField` needs to run change detection.
             */
            this.stateChanges = new Subject();
        }
        updateErrorState() {
            const oldState = this.errorState;
            const parent = this.parentFormGroup || this.parentForm;
            const matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
            const control = this.ngControl ? this.ngControl.control : null;
            const newState = matcher.isErrorState(control, parent);
            if (newState !== oldState) {
                this.errorState = newState;
                this.stateChanges.next();
            }
        }
    };
}

/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
class McLine {
}
McLine.decorators = [
    { type: Directive, args: [{
                selector: '[mc-line], [mcLine]',
                host: { class: 'mc-line' }
            },] }
];
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
class McLineSetter {
    constructor(_lines, _element) {
        this._lines = _lines;
        this._element = _element;
        this.setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this.setLineClass(this._lines.length);
        });
    }
    setLineClass(count) {
        const minLineClassNumber = 2;
        const maxLineClassNumber = 3;
        this.resetClasses();
        if (count === minLineClassNumber || count === maxLineClassNumber) {
            this.setClass(`mc-${count}-line`, true);
        }
        else if (count > maxLineClassNumber) {
            this.setClass(`mc-multi-line`, true);
        }
    }
    resetClasses() {
        this.setClass('mc-2-line', false);
        this.setClass('mc-3-line', false);
        this.setClass('mc-multi-line', false);
    }
    setClass(className, isAdd) {
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
                imports: [],
                exports: [McLine],
                declarations: [McLine]
            },] }
];

/** Error state matcher that matches when a control is invalid and dirty. */
class ShowOnDirtyErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    }
}
ShowOnDirtyErrorStateMatcher.decorators = [
    { type: Injectable }
];
/** Provider that defines how form controls behave with regards to displaying error messages. */
class ErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    }
}
/** @nocollapse */ ErrorStateMatcher.ɵprov = ɵɵdefineInjectable({ factory: function ErrorStateMatcher_Factory() { return new ErrorStateMatcher(); }, token: ErrorStateMatcher, providedIn: "root" });
ErrorStateMatcher.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];

/* tslint:disable:naming-convention */
const MC_LOCALE_ID = new InjectionToken('McLocaleId');
const DEFAULT_MC_LOCALE_ID = 'ru';
function isEmpty(value) {
    return value == null || value === '' || value !== value;
}
function strToNumber(value) {
    if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
        return Number(value);
    }
    if (typeof value !== 'number') {
        throw new Error(`${value} is not a number`);
    }
    return value;
}
const NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
const minIntGroupPosition = 1;
const minFractionGroupPosition = 3;
const maxFractionGroupPosition = 5;
class ParsedDigitsInfo {
}
function parseDigitsInfo(digitsInfo) {
    const parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
    if (parts === null) {
        throw new Error(`${digitsInfo} is not a valid digit info`);
    }
    const minIntPart = parts[minIntGroupPosition];
    const minFractionPart = parts[minFractionGroupPosition];
    const maxFractionPart = parts[maxFractionGroupPosition];
    const result = new ParsedDigitsInfo();
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
class McDecimalPipe {
    constructor(_locale) {
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
    transform(value, digitsInfo, locale) {
        if (isEmpty(value)) {
            return null;
        }
        const currentLocale = locale || this._locale || DEFAULT_MC_LOCALE_ID;
        let parsedDigitsInfo;
        if (digitsInfo) {
            parsedDigitsInfo = parseDigitsInfo(digitsInfo);
        }
        const options = Object.assign({ useGrouping: true, minimumIntegerDigits: 1, minimumFractionDigits: 0, maximumFractionDigits: 3 }, parsedDigitsInfo);
        try {
            const num = strToNumber(value);
            return Intl.NumberFormat.call(this, currentLocale, options).format(num);
        }
        catch (error) {
            throw Error(`InvalidPipeArgument: McDecimalPipe for pipe '${JSON.stringify(error.message)}'`);
        }
    }
}
/** @nocollapse */ McDecimalPipe.ɵprov = ɵɵdefineInjectable({ factory: function McDecimalPipe_Factory() { return new McDecimalPipe(ɵɵinject(MC_LOCALE_ID, 8)); }, token: McDecimalPipe, providedIn: "root" });
McDecimalPipe.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
    { type: Pipe, args: [{ name: 'mcNumber' },] }
];
/** @nocollapse */
McDecimalPipe.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MC_LOCALE_ID,] }] }
];

class McFormattersModule {
}
McFormattersModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    McDecimalPipe
                ],
                declarations: [
                    McDecimalPipe
                ]
            },] }
];

const MC_VALIDATION = new InjectionToken('McUseValidation', { factory: () => ({ useValidation: true }) });
function setValidState(control, validator) {
    if (!control) {
        return;
    }
    control.clearValidators();
    control.updateValueAndValidity({ emitEvent: false });
    control.setValidators(validator);
}
/** This function do next:
 * - run validation on submitting parent form
 * - prevent validation in required validator if form doesn't submitted
 * - if control has focus validation will be prevented
 */
function setMosaicValidation(component) {
    const ngControl = component.ngControl;
    if (!ngControl) {
        return;
    }
    const parentForm = component.parentForm || component.parentFormGroup;
    if (parentForm) {
        parentForm.ngSubmit.subscribe(() => {
            // tslint:disable-next-line: no-unnecessary-type-assertion
            ngControl.control.updateValueAndValidity({ emitEvent: false });
        });
    }
    if (component.ngModel) {
        setMosaicValidationForModelControl(component, component.rawValidators, parentForm);
    }
    else if (component.formControlName || component.ngControl) {
        setMosaicValidationForFormControl(component, parentForm, ngControl);
    }
}
function setMosaicValidationForModelControl(component, validators, parentForm) {
    if (!validators) {
        return;
    }
    validators.forEach((validator) => {
        // tslint:disable-next-line: no-unbound-method
        const originalValidate = validator.validate;
        if (validator instanceof RequiredValidator) {
            // changed required validation logic
            validator.validate = (control) => {
                if (parentForm && !parentForm.submitted) {
                    return null;
                }
                return originalValidate.call(validator, control);
            };
        }
        else {
            // changed all other validation logic
            validator.validate = (control) => {
                if (component.focused) {
                    return null;
                }
                return originalValidate.call(validator, control);
            };
        }
    });
}
function setMosaicValidationForFormControl(component, parentForm, ngControl) {
    const originalValidator = ngControl.control.validator;
    // changed required validation logic after initialization
    if (ngControl.invalid && ngControl.errors.required) {
        Promise.resolve().then(() => setValidState(ngControl.control, originalValidator));
    }
    // check dynamic updates
    ngControl.statusChanges
        .subscribe(() => {
        // changed required validation logic
        if (ngControl.invalid && (parentForm && !parentForm.submitted) && ngControl.errors.required) {
            setValidState(ngControl.control, originalValidator);
        }
        // changed all other validation logic
        if (ngControl.invalid && component.focused) {
            setValidState(ngControl.control, originalValidator);
        }
    });
}

class McHighlightPipe {
    transform(value, args) {
        if (!args) {
            return value;
        }
        return value.replace(new RegExp(`(${args})`, 'gi'), '<mark class="mc-highlight">$1</mark>');
    }
}
McHighlightPipe.decorators = [
    { type: Pipe, args: [{ name: 'mcHighlight' },] }
];

class McHighlightModule {
}
McHighlightModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [McHighlightPipe],
                declarations: [McHighlightPipe]
            },] }
];

const selectEvents = 'selectEvents';

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
const SELECT_PANEL_MAX_HEIGHT = 224;
/** The panel's padding on the x-axis */
const SELECT_PANEL_PADDING_X = 1;
/** The panel's x axis padding if it is indented (e.g. there is an option group). */
/* tslint:disable-next-line:no-magic-numbers */
const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
const SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Injection token that determines the scroll handling while a select is open. */
const MC_SELECT_SCROLL_STRATEGY = new InjectionToken('mc-select-scroll-strategy');
/** @docs-private */
function mcSelectScrollStrategyProviderFactory(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/** @docs-private */
const MC_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: MC_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcSelectScrollStrategyProviderFactory
};

const POSITION_MAP = {
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
const DEFAULT_4_POSITIONS = objectValues([
    POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left
]);
const EXTENDED_OVERLAY_POSITIONS = objectValues([
    POSITION_MAP.top, POSITION_MAP.topLeft, POSITION_MAP.topRight, POSITION_MAP.right, POSITION_MAP.rightTop,
    POSITION_MAP.rightBottom, POSITION_MAP.bottom, POSITION_MAP.bottomLeft, POSITION_MAP.bottomRight,
    POSITION_MAP.left, POSITION_MAP.leftTop, POSITION_MAP.leftBottom
]);
const TOP_POSITION_PRIORITY = objectValues([
    POSITION_MAP.top,
    POSITION_MAP.bottom,
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftBottom,
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottomRight
]);
const BOTTOM_POSITION_PRIORITY = objectValues([
    POSITION_MAP.bottom,
    POSITION_MAP.top,
    POSITION_MAP.topLeft,
    POSITION_MAP.topRight,
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftBottom
]);
const RIGHT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.right,
    POSITION_MAP.left,
    POSITION_MAP.leftTop,
    POSITION_MAP.leftBottom,
    POSITION_MAP.top,
    POSITION_MAP.bottom
]);
const LEFT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.left,
    POSITION_MAP.right,
    POSITION_MAP.rightTop,
    POSITION_MAP.rightBottom,
    POSITION_MAP.top,
    POSITION_MAP.bottom
]);
const RIGHT_TOP_POSITION_PRIORITY = objectValues([
    POSITION_MAP.rightTop,
    POSITION_MAP.leftTop,
    POSITION_MAP.left,
    POSITION_MAP.leftBottom,
    POSITION_MAP.topLeft,
    POSITION_MAP.bottomLeft
]);
const RIGHT_BOTTOM_POSITION_PRIORITY = objectValues([
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftBottom,
    POSITION_MAP.left,
    POSITION_MAP.leftTop,
    POSITION_MAP.topLeft,
    POSITION_MAP.bottomLeft
]);
const LEFT_TOP_POSITION_PRIORITY = objectValues([
    POSITION_MAP.leftTop,
    POSITION_MAP.rightTop,
    POSITION_MAP.right,
    POSITION_MAP.rightBottom,
    POSITION_MAP.topRight,
    POSITION_MAP.bottomRight
]);
const LEFT_BOTTOM_POSITION_PRIORITY = objectValues([
    POSITION_MAP.leftBottom,
    POSITION_MAP.rightBottom,
    POSITION_MAP.right,
    POSITION_MAP.rightTop,
    POSITION_MAP.topRight,
    POSITION_MAP.bottomRight
]);
const TOP_LEFT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.topLeft,
    POSITION_MAP.topRight,
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottom,
    POSITION_MAP.bottomRight,
    POSITION_MAP.leftBottom,
    POSITION_MAP.rightBottom
]);
const TOP_RIGHT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.topRight,
    POSITION_MAP.topLeft,
    POSITION_MAP.bottomRight,
    POSITION_MAP.bottom,
    POSITION_MAP.bottomLeft,
    POSITION_MAP.leftBottom,
    POSITION_MAP.rightBottom
]);
const BOTTOM_RIGHT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.bottomRight,
    POSITION_MAP.bottomLeft,
    POSITION_MAP.topRight,
    POSITION_MAP.top,
    POSITION_MAP.topLeft,
    POSITION_MAP.leftTop,
    POSITION_MAP.rightTop
]);
const BOTTOM_LEFT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottomRight,
    POSITION_MAP.topLeft,
    POSITION_MAP.top,
    POSITION_MAP.topRight,
    POSITION_MAP.rightTop,
    POSITION_MAP.leftTop
]);
const POSITION_PRIORITY_STRATEGY = {
    top: TOP_POSITION_PRIORITY,
    topLeft: TOP_LEFT_POSITION_PRIORITY,
    topRight: TOP_RIGHT_POSITION_PRIORITY,
    bottom: BOTTOM_POSITION_PRIORITY,
    bottomLeft: BOTTOM_LEFT_POSITION_PRIORITY,
    bottomRight: BOTTOM_RIGHT_POSITION_PRIORITY,
    left: LEFT_POSITION_PRIORITY,
    leftTop: LEFT_TOP_POSITION_PRIORITY,
    leftBottom: LEFT_BOTTOM_POSITION_PRIORITY,
    right: RIGHT_POSITION_PRIORITY,
    rightTop: RIGHT_TOP_POSITION_PRIORITY,
    rightBottom: RIGHT_BOTTOM_POSITION_PRIORITY
};
const POSITION_TO_CSS_MAP = {
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
const DEFAULT_4_POSITIONS_TO_CSS_MAP = {
    top: 'top',
    bottom: 'bottom',
    right: 'right',
    left: 'left'
};
function arrayMap(array, iteratee) {
    let index = -1;
    const length = array == null ? 0 : array.length;
    const result = Array(length);
    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
function baseValues(object, props) {
    return arrayMap(props, (key) => {
        return object[key];
    });
}
function objectValues(object) {
    return object == null ? [] : baseValues(object, Object.keys(object));
}

const fadeAnimation = trigger('fadeAnimation', [
    state('void', style({ opacity: 0 })),
    state('true', style({ opacity: 1 })),
    state('false', style({ opacity: 0 })),
    transition('* => true', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
    transition('* => void', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
]);

var AnimationCurves;
(function (AnimationCurves) {
    AnimationCurves["StandardCurve"] = "cubic-bezier(0.4,0.0,0.2,1)";
    AnimationCurves["DecelerationCurve"] = "cubic-bezier(0.0,0.0,0.2,1)";
    AnimationCurves["AccelerationCurve"] = "cubic-bezier(0.4,0.0,1,1)";
    AnimationCurves["SharpCurve"] = "cubic-bezier(0.4,0.0,0.6,1)";
})(AnimationCurves || (AnimationCurves = {}));

/**
 * The following are all the animations for the mc-select component, with each
 * const containing the metadata for one animation.
 *
 */
const mcSelectAnimations = {
    /**
     * This animation transforms the select's overlay panel on and off the page.
     *
     * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
     * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
     * side to ensure the option text correctly overlaps the trigger text.
     *
     * When the panel is removed from the DOM, it simply fades out linearly.
     */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            transform: 'scaleY(0)',
            minWidth: '100%',
            opacity: 0
        })),
        transition('void => *', group([
            animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        transition('* => void', [
            animate('250ms 100ms linear', style({ opacity: 0 }))
        ])
    ]),
    /**
     * This animation fades in the background color and text content of the
     * select's options. It is time delayed to occur 100ms after the overlay
     * panel has transformed in.
     */
    fadeInContent: trigger('fadeInContent', [
        state('showing', style({ opacity: 1 })),
        transition('void => showing', [
            style({ opacity: 0 }),
            animate('150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')
        ])
    ])
};
const transformPanel = mcSelectAnimations.transformPanel;
const fadeInContent = mcSelectAnimations.fadeInContent;

/** InjectionToken that can be used to specify the global label options. */
const MC_LABEL_GLOBAL_OPTIONS = new InjectionToken('mc-label-global-options');

var MultipleMode;
(function (MultipleMode) {
    MultipleMode["CHECKBOX"] = "checkbox";
    MultipleMode["KEYBOARD"] = "keyboard";
})(MultipleMode || (MultipleMode = {}));

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
class McPseudoCheckbox {
    constructor() {
        this.state = 'unchecked';
        this.disabled = false;
    }
}
McPseudoCheckbox.decorators = [
    { type: Component, args: [{
                selector: 'mc-pseudo-checkbox',
                template: "<i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n<i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n",
                host: {
                    class: 'mc-pseudo-checkbox',
                    '[class.mc-indeterminate]': 'state === "indeterminate"',
                    '[class.mc-checked]': 'state === "checked"',
                    '[class.mc-disabled]': 'disabled'
                },
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-pseudo-checkbox{position:relative;display:inline-block;box-sizing:border-box;width:var(--mc-checkbox-size-width,16px);height:var(--mc-checkbox-size-width,16px);border-radius:3px;border-width:var(--mc-checkbox-size-border-width,1px);border-style:solid;cursor:pointer;vertical-align:middle;flex-shrink:0}.mc-pseudo-checkbox .mc-checkbox-checkmark,.mc-pseudo-checkbox .mc-checkbox-mixedmark{display:none;position:absolute;top:calc(-1 * var(--mc-checkbox-size-border-width, 1px));left:calc(-1 * var(--mc-checkbox-size-border-width, 1px))}.mc-pseudo-checkbox.mc-pseudo-checkbox-checked,.mc-pseudo-checkbox.mc-pseudo-checkbox-indeterminate{border-color:transparent}.mc-pseudo-checkbox.mc-checked .mc-checkbox-checkmark,.mc-pseudo-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:inline-block}.mc-pseudo-checkbox.mc-disabled{cursor:default}"]
            },] }
];
McPseudoCheckbox.propDecorators = {
    state: [{ type: Input }],
    disabled: [{ type: Input }]
};

class McPseudoCheckboxModule {
}
McPseudoCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [McPseudoCheckbox],
                declarations: [McPseudoCheckbox]
            },] }
];

class McMeasureScrollbarService {
    constructor(document) {
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
    get scrollBarWidth() {
        if (this._scrollBarWidth) {
            return this._scrollBarWidth;
        }
        this.initScrollBarWidth();
        return this._scrollBarWidth;
    }
    initScrollBarWidth() {
        const scrollDiv = this.document.createElement('div');
        // tslint:disable-next-line
        for (const scrollProp in this.scrollbarMeasure) {
            if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
                scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
            }
        }
        this.document.body.appendChild(scrollDiv);
        const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.document.body.removeChild(scrollDiv);
        this._scrollBarWidth = width;
    }
}
/** @nocollapse */ McMeasureScrollbarService.ɵprov = ɵɵdefineInjectable({ factory: function McMeasureScrollbarService_Factory() { return new McMeasureScrollbarService(ɵɵinject(DOCUMENT)); }, token: McMeasureScrollbarService, providedIn: "root" });
McMeasureScrollbarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
McMeasureScrollbarService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/** @docs-private */
class McOptgroupBase {
}
// tslint:disable-next-line: naming-convention
const McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
let uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `mc-option`.
 */
class McOptgroup extends McOptgroupMixinBase {
    constructor() {
        super(...arguments);
        /** Unique id for the underlying label. */
        this.labelId = `mc-optgroup-label-${uniqueOptgroupIdCounter++}`;
    }
}
McOptgroup.decorators = [
    { type: Component, args: [{
                selector: 'mc-optgroup',
                exportAs: 'mcOptgroup',
                template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label>\n<ng-content select=\"mc-option, mc-list-option, ng-container\"></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled'],
                host: {
                    class: 'mc-optgroup',
                    '[class.mc-disabled]': 'disabled'
                },
                styles: [".mc-optgroup-label{padding-left:var(--mc-optgroup-size-padding-left,17px);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}"]
            },] }
];
McOptgroup.propDecorators = {
    label: [{ type: Input }]
};

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let uniqueIdCounter = 0;
/** Event object emitted by McOption when selected or deselected. */
class McOptionSelectionChange {
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
/**
 * Injection token used to provide the parent component to options.
 */
const MC_OPTION_PARENT_COMPONENT = new InjectionToken('MC_OPTION_PARENT_COMPONENT');
/**
 * Single option inside of a `<mc-select>` element.
 */
class McOption {
    constructor(element, changeDetectorRef, parent, group) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.group = group;
        /** Event emitted when the option is selected or deselected. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this.stateChanges = new Subject();
        this._id = `mc-option-${uniqueIdCounter++}`;
        this._selected = false;
        this._disabled = false;
        this._active = false;
        this.mostRecentViewValue = '';
    }
    get showCheckbox() {
        return this._showCheckbox === undefined ? this.multiple : this._showCheckbox;
    }
    set showCheckbox(value) {
        this._showCheckbox = coerceBooleanProperty(value);
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        // TODO: Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
    }
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple() {
        return this.parent && this.parent.multiple;
    }
    get id() {
        return this._id;
    }
    get selected() {
        return this._selected;
    }
    get disabled() {
        return (this.group && this.group.disabled) || this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
        return this._active;
    }
    ngAfterViewChecked() {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `mc-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            const viewValue = this.viewValue;
            if (viewValue !== this.mostRecentViewValue) {
                this.mostRecentViewValue = viewValue;
                this.stateChanges.next();
            }
        }
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    getHeight() {
        // tslint:disable-next-line:naming-convention
        const DOMRect = this.element.nativeElement.getClientRects()[0];
        return DOMRect ? DOMRect.height : 0;
    }
    select() {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    }
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    }
    focus() {
        const element = this.getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
        return this.viewValue;
    }
    /** Ensures the option is selected when activated from the keyboard. */
    handleKeydown(event) {
        // tslint:disable-next-line
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    }
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
        }
    }
    getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    getHostElement() {
        return this.element.nativeElement;
    }
    /** Emits the selection change event. */
    emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new McOptionSelectionChange(this, isUserInput));
    }
}
McOption.decorators = [
    { type: Component, args: [{
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
                template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : ''\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:var(--mc-option-size-height,32px);border:var(--mc-option-size-border-width,2px) solid transparent;cursor:pointer;outline:none;padding:var(--mc-option-size-padding,0 16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:calc(-1 * var(--mc-option-size-border-width, 2px));left:calc(-1 * var(--mc-option-size-border-width, 2px));right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
            },] }
];
/** @nocollapse */
McOption.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_OPTION_PARENT_COMPONENT,] }] },
    { type: McOptgroup, decorators: [{ type: Optional }] }
];
McOption.propDecorators = {
    value: [{ type: Input }],
    showCheckbox: [{ type: Input }],
    onSelectionChange: [{ type: Output }],
    disabled: [{ type: Input }]
};
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
function countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        const optionsArray = options.toArray();
        const groups = optionGroups.toArray();
        let groupCounter = 0;
        for (let i = 0; i < optionIndex + 1; i++) {
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
    const optionOffset = optionIndex * optionHeight;
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}

class McOptionModule {
}
McOptionModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, McPseudoCheckboxModule],
                exports: [McOption, McOptgroup],
                declarations: [McOption, McOptgroup]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { AnimationCurves, BOTTOM_LEFT_POSITION_PRIORITY, BOTTOM_POSITION_PRIORITY, BOTTOM_RIGHT_POSITION_PRIORITY, DEFAULT_4_POSITIONS, DEFAULT_4_POSITIONS_TO_CSS_MAP, DEFAULT_MC_LOCALE_ID, EXTENDED_OVERLAY_POSITIONS, ErrorStateMatcher, LEFT_BOTTOM_POSITION_PRIORITY, LEFT_POSITION_PRIORITY, LEFT_TOP_POSITION_PRIORITY, MC_LABEL_GLOBAL_OPTIONS, MC_LOCALE_ID, MC_OPTION_PARENT_COMPONENT, MC_SANITY_CHECKS, MC_SELECT_SCROLL_STRATEGY, MC_SELECT_SCROLL_STRATEGY_PROVIDER, MC_VALIDATION, McCommonModule, McDecimalPipe, McFormattersModule, McHighlightModule, McHighlightPipe, McLine, McLineModule, McLineSetter, McMeasureScrollbarService, McOptgroup, McOptgroupBase, McOptgroupMixinBase, McOption, McOptionModule, McOptionSelectionChange, McPseudoCheckbox, McPseudoCheckboxModule, MultipleMode, NUMBER_FORMAT_REGEXP, POSITION_MAP, POSITION_PRIORITY_STRATEGY, POSITION_TO_CSS_MAP, RIGHT_BOTTOM_POSITION_PRIORITY, RIGHT_POSITION_PRIORITY, RIGHT_TOP_POSITION_PRIORITY, SELECT_PANEL_INDENT_PADDING_X, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, ShowOnDirtyErrorStateMatcher, TOP_LEFT_POSITION_PRIORITY, TOP_POSITION_PRIORITY, TOP_RIGHT_POSITION_PRIORITY, ThemePalette, countGroupLabelsBeforeOption, fadeAnimation, getMcSelectDynamicMultipleError, getMcSelectNonArrayValueError, getMcSelectNonFunctionValueError, getOptionScrollPosition, isBoolean, mcSelectAnimations, mcSelectScrollStrategyProviderFactory, mixinColor, mixinDisabled, mixinErrorState, mixinTabIndex, selectEvents, setMosaicValidation, setMosaicValidationForFormControl, setMosaicValidationForModelControl, toBoolean, mcSanityChecksFactory as ɵa };
//# sourceMappingURL=ptsecurity-mosaic-core.js.map

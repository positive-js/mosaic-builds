/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __param, __metadata } from 'tslib';
import { NgModule, InjectionToken, Optional, Inject, isDevMode, Directive, Injectable, Component, ViewEncapsulation, Input, ChangeDetectionStrategy, defineInjectable, inject } from '@angular/core';
import { BidiModule } from '@ptsecurity/cdk/bidi';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

function isBoolean(val) { return typeof val === 'boolean'; }
function toBoolean(value) {
    return value != null && `${value}` !== 'false';
}

// Injection token that configures whether the Mosaic sanity checks are enabled.
const MC_SANITY_CHECKS = new InjectionToken('mc-sanity-checks', {
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
let McCommonModule = class McCommonModule {
    constructor(_sanityChecksEnabled) {
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
    _areChecksEnabled() {
        return this._sanityChecksEnabled && isDevMode() && !this._isTestEnv();
    }
    // Whether the code is running in tests.
    _isTestEnv() {
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    }
    _checkDoctypeIsDefined() {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Mosaic components not to behave as expected.');
        }
    }
    _checkThemeIsPresent() {
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
};
McCommonModule = __decorate([
    NgModule({
        imports: [BidiModule],
        exports: [BidiModule]
    }),
    __param(0, Optional()), __param(0, Inject(MC_SANITY_CHECKS)),
    __metadata("design:paramtypes", [Boolean])
], McCommonModule);

// Mixin to augment a directive with a `disabled` property.
function mixinDisabled(base) {
    return class extends base {
        constructor(...args) {
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
    ThemePalette["Warn"] = "warn";
    ThemePalette["Default"] = "second";
})(ThemePalette || (ThemePalette = {}));
/** Mixin to augment a directive with a `color` property. */
function mixinColor(base, defaultColor = ThemePalette.Default) {
    return class extends base {
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
        constructor(...args) {
            super(...args);
            // Set the default color that can be specified from the mixin.
            this.color = defaultColor;
        }
    };
}

// Mixin to augment a directive with a `tabIndex` property.
function mixinTabIndex(base, defaultTabIndex = 0) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this._tabIndex = defaultTabIndex;
        }
        get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
        }
        set tabIndex(value) {
            this._tabIndex = value != null ? value : defaultTabIndex;
        }
    };
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
             * `MсFormField` needs to run change detection.
             */
            this.stateChanges = new Subject();
        }
        updateErrorState() {
            const oldState = this.errorState;
            const parent = this._parentFormGroup || this._parentForm;
            const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
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
let McLine = class McLine {
};
McLine = __decorate([
    Directive({
        selector: '[mc-line], [mcLine]',
        host: { class: 'mc-line' }
    })
], McLine);
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
class McLineSetter {
    constructor(_lines, _element) {
        this._lines = _lines;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this._setLineClass(this._lines.length);
        });
    }
    _setLineClass(count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass(`mc-${count}-line`, true);
        }
        else if (count > 3) {
            this._setClass(`mc-multi-line`, true);
        }
    }
    _resetClasses() {
        this._setClass('mc-2-line', false);
        this._setClass('mc-3-line', false);
        this._setClass('mc-multi-line', false);
    }
    _setClass(className, isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add(className);
        }
        else {
            this._element.nativeElement.classList.remove(className);
        }
    }
}
let McLineModule = class McLineModule {
};
McLineModule = __decorate([
    NgModule({
        imports: [],
        exports: [McLine],
        declarations: [McLine]
    })
], McLineModule);

/** Error state matcher that matches when a control is invalid and dirty. */
let ShowOnDirtyErrorStateMatcher = class ShowOnDirtyErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    }
};
ShowOnDirtyErrorStateMatcher = __decorate([
    Injectable()
], ShowOnDirtyErrorStateMatcher);
/** Provider that defines how form controls behave with regards to displaying error messages. */
let ErrorStateMatcher = class ErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    }
};
ErrorStateMatcher.ngInjectableDef = defineInjectable({ factory: function ErrorStateMatcher_Factory() { return new ErrorStateMatcher(); }, token: ErrorStateMatcher, providedIn: "root" });
ErrorStateMatcher = __decorate([
    Injectable({ providedIn: 'root' })
], ErrorStateMatcher);

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
let McPseudoCheckbox = class McPseudoCheckbox {
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
    constructor() {
        // Display state of the checkbox.
        this.state = 'unchecked';
        // Whether the checkbox is disabled.
        this.disabled = false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], McPseudoCheckbox.prototype, "state", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], McPseudoCheckbox.prototype, "disabled", void 0);
McPseudoCheckbox = __decorate([
    Component({
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
    })
], McPseudoCheckbox);

let McPseudoCheckboxModule = class McPseudoCheckboxModule {
};
McPseudoCheckboxModule = __decorate([
    NgModule({
        exports: [McPseudoCheckbox],
        declarations: [McPseudoCheckbox]
    })
], McPseudoCheckboxModule);

let McMeasureScrollbarService = class McMeasureScrollbarService {
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
        if (this._scrollbarWidth) {
            return this._scrollbarWidth;
        }
        this.initScrollBarWidth();
        return this._scrollbarWidth;
    }
    initScrollBarWidth() {
        const scrollDiv = this.document.createElement('div');
        for (const scrollProp in this.scrollbarMeasure) {
            if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
                scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
            }
        }
        this.document.body.appendChild(scrollDiv);
        const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.document.body.removeChild(scrollDiv);
        this._scrollbarWidth = width;
    }
};
McMeasureScrollbarService.ngInjectableDef = defineInjectable({ factory: function McMeasureScrollbarService_Factory() { return new McMeasureScrollbarService(inject(DOCUMENT)); }, token: McMeasureScrollbarService, providedIn: "root" });
McMeasureScrollbarService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], McMeasureScrollbarService);

/**
 * Generated bundle index. Do not edit.
 */

export { MC_SANITY_CHECKS_FACTORY as ɵa0, isBoolean, toBoolean, McCommonModule, MC_SANITY_CHECKS, mixinDisabled, mixinColor, ThemePalette, mixinTabIndex, mixinErrorState, McLine, McLineSetter, McLineModule, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, McPseudoCheckboxModule, McPseudoCheckbox, McMeasureScrollbarService };
//# sourceMappingURL=core.js.map

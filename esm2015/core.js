/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __param, __metadata } from 'tslib';
import { NgModule, InjectionToken, Optional, Inject, isDevMode, Directive, Injectable, Component, ViewEncapsulation, Input, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, EventEmitter, Output, defineInjectable, inject } from '@angular/core';
import { BidiModule } from '@ptsecurity/cdk/bidi';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { Subject } from 'rxjs';
import { DOCUMENT, CommonModule } from '@angular/common';
import { ENTER, SPACE } from '@ptsecurity/cdk/keycodes';
import { animate, state, style, transition, trigger, query, animateChild, group } from '@angular/animations';
import { Overlay } from '@ptsecurity/cdk/overlay';

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
 * This module should be imported to each top-level component module (e.g., McTabsModule).
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
        // tslint:disable-next-line
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
        this.state = 'unchecked';
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
        // tslint:disable-next-line
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

// Boilerplate for applying mixins to McOptgroup.
/** @docs-private */
class McOptgroupBase {
}
const McOptgroupMixinBase = mixinDisabled(McOptgroupBase);
// Counter for unique group ids.
let uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `mc-option`.
 */
let McOptgroup = class McOptgroup extends McOptgroupMixinBase {
    /**
     * Component that is used to group instances of `mc-option`.
     */
    constructor() {
        super(...arguments);
        /** Unique id for the underlying label. */
        this.labelId = `mc-optgroup-label-${uniqueOptgroupIdCounter++}`;
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], McOptgroup.prototype, "label", void 0);
McOptgroup = __decorate([
    Component({
        selector: 'mc-optgroup',
        exportAs: 'mcOptgroup',
        template: "<label class=\"mc-optgroup-label\" [id]=\"labelId\">{{ label }}</label><ng-content select=\"mc-option, ng-container\"></ng-content>",
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
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
let McOption = class McOption {
    constructor(element, changeDetectorRef, parent, group$$1) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.group = group$$1;
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
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        // TODO(kara): Add input property alternative for node envs.
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
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], McOption.prototype, "value", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], McOption.prototype, "onSelectionChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McOption.prototype, "disabled", null);
McOption = __decorate([
    Component({
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
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __param(2, Optional()), __param(2, Inject(MC_OPTION_PARENT_COMPONENT)),
    __param(3, Optional()),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef, Object, McOptgroup])
], McOption);
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

let McOptionModule = class McOptionModule {
};
McOptionModule = __decorate([
    NgModule({
        imports: [CommonModule, McPseudoCheckboxModule],
        exports: [McOption, McOptgroup],
        declarations: [McOption, McOptgroup]
    })
], McOptionModule);

/** InjectionToken that can be used to specify the global label options. */
const MC_LABEL_GLOBAL_OPTIONS = new InjectionToken('mc-label-global-options');

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
const DEFAULT_4_POSITIONS = _objectValues([
    POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left
]);
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
function _objectValues(object) {
    return object == null ? [] : baseValues(object, Object.keys(object));
}

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

/**
 * The following are all the animations for the mc-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material mc-select animation.
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
            query('@fadeInContent', animateChild()),
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

/**
 * Generated bundle index. Do not edit.
 */

export { MC_SANITY_CHECKS_FACTORY as ɵa2, isBoolean, toBoolean, McCommonModule, MC_SANITY_CHECKS, mixinDisabled, mixinColor, ThemePalette, mixinTabIndex, mixinErrorState, McLine, McLineSetter, McLineModule, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, McPseudoCheckboxModule, McPseudoCheckbox, McMeasureScrollbarService, McOptionModule, McOptionSelectionChange, MC_OPTION_PARENT_COMPONENT, McOption, countGroupLabelsBeforeOption, getOptionScrollPosition, McOptgroupBase, McOptgroupMixinBase, McOptgroup, MC_LABEL_GLOBAL_OPTIONS, fadeAnimation, AnimationCurves, POSITION_MAP, DEFAULT_4_POSITIONS, mcSelectAnimations, selectEvents, getMcSelectDynamicMultipleError, getMcSelectNonArrayValueError, getMcSelectNonFunctionValueError, SELECT_PANEL_MAX_HEIGHT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_PANEL_VIEWPORT_PADDING, MC_SELECT_SCROLL_STRATEGY, mcSelectScrollStrategyProviderFactory, MC_SELECT_SCROLL_STRATEGY_PROVIDER };
//# sourceMappingURL=core.js.map

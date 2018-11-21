/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends, __decorate, __metadata, __param } from 'tslib';
import { Directive, ElementRef, Inject, Input, Optional, Self, InjectionToken, NgZone, NgModule } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm, FormsModule } from '@angular/forms';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { ErrorStateMatcher, mixinErrorState, McCommonModule } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { fromEvent, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@ptsecurity/cdk/a11y';

var MC_TEXTAREA_VALUE_ACCESSOR = new InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
var nextUniqueId = 0;
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
        _this.stateChanges = new Subject();
        /**
         * Implemented as part of McFormFieldControl.
         * @docs-private
         */
        _this.controlType = 'mc-textarea';
        _this.uid = "mc-textsrea-" + nextUniqueId++;
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
        var growObserver = fromEvent(elementRef.nativeElement, 'input');
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
            this._disabled = coerceBooleanProperty(value);
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
            this._required = coerceBooleanProperty(value);
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
        Input(),
        __metadata("design:type", Boolean)
    ], McTextarea.prototype, "canGrow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ErrorStateMatcher)
    ], McTextarea.prototype, "errorStateMatcher", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTextarea.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTextarea.prototype, "id", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McTextarea.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTextarea.prototype, "required", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTextarea.prototype, "value", null);
    McTextarea = McTextarea_1 = __decorate([
        Directive({
            selector: 'textarea[mcTextarea]',
            exportAs: 'mcTextarea',
            host: {
                class: 'mc-textarea',
                '[class.mc-textarea-resizable]': '!canGrow',
                '[attr.id]': 'id',
                '[attr.placeholder]': 'placeholder',
                '[disabled]': 'disabled',
                '[required]': 'required',
                '(blur)': 'focusChanged(false)',
                '(focus)': 'focusChanged(true)'
            },
            providers: [{ provide: McFormFieldControl, useExisting: McTextarea_1 }]
        }),
        __param(1, Optional()), __param(1, Self()),
        __param(2, Optional()),
        __param(3, Optional()),
        __param(5, Optional()), __param(5, Self()), __param(5, Inject(MC_TEXTAREA_VALUE_ACCESSOR)),
        __metadata("design:paramtypes", [ElementRef,
            NgControl,
            NgForm,
            FormGroupDirective,
            ErrorStateMatcher, Object, NgZone])
    ], McTextarea);
    return McTextarea;
}(McTextareaMixinBase));

var McTextareaModule = /** @class */ (function () {
    function McTextareaModule() {
    }
    McTextareaModule = __decorate([
        NgModule({
            imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
            exports: [McTextarea],
            declarations: [McTextarea]
        })
    ], McTextareaModule);
    return McTextareaModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { MC_TEXTAREA_VALUE_ACCESSOR, McTextareaBase, McTextareaMixinBase, McTextarea, McTextareaModule };
//# sourceMappingURL=textarea.es5.js.map

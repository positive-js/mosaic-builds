/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ptsecurity/cdk/coercion'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/mosaic/form-field'), require('rxjs'), require('@angular/common'), require('@ptsecurity/cdk/a11y')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/textarea', ['exports', '@angular/core', '@angular/forms', '@ptsecurity/cdk/coercion', '@ptsecurity/mosaic/core', '@ptsecurity/mosaic/form-field', 'rxjs', '@angular/common', '@ptsecurity/cdk/a11y'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.textarea = {}),global.ng.core,global.ng.forms,global.ng.cdk.coercion,global.ng.mosaic.core,global.ng.mosaic.formField,global.rxjs,global.ng.common,global.ng.cdk.a11y));
}(this, (function (exports,core,forms,coercion,core$1,formField,rxjs,common,a11y) { 'use strict';

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

var MC_TEXTAREA_VALUE_ACCESSOR = new core.InjectionToken('MC_TEXTAREA_VALUE_ACCESSOR');
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
var McTextareaMixinBase = core$1.mixinErrorState(McTextareaBase);
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
        __metadata("design:type", core$1.ErrorStateMatcher)
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
                '[disabled]': 'disabled',
                '[required]': 'required',
                '(blur)': 'focusChanged(false)',
                '(focus)': 'focusChanged(true)'
            },
            providers: [{ provide: formField.McFormFieldControl, useExisting: McTextarea_1 }]
        }),
        __param(1, core.Optional()), __param(1, core.Self()),
        __param(2, core.Optional()),
        __param(3, core.Optional()),
        __param(5, core.Optional()), __param(5, core.Self()), __param(5, core.Inject(MC_TEXTAREA_VALUE_ACCESSOR)),
        __metadata("design:paramtypes", [core.ElementRef,
            forms.NgControl,
            forms.NgForm,
            forms.FormGroupDirective,
            core$1.ErrorStateMatcher, Object, core.NgZone])
    ], McTextarea);
    return McTextarea;
}(McTextareaMixinBase));

var McTextareaModule = /** @class */ (function () {
    function McTextareaModule() {
    }
    McTextareaModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, a11y.A11yModule, core$1.McCommonModule, forms.FormsModule],
            exports: [McTextarea],
            declarations: [McTextarea]
        })
    ], McTextareaModule);
    return McTextareaModule;
}());

exports.MC_TEXTAREA_VALUE_ACCESSOR = MC_TEXTAREA_VALUE_ACCESSOR;
exports.McTextareaBase = McTextareaBase;
exports.McTextareaMixinBase = McTextareaMixinBase;
exports.McTextarea = McTextarea;
exports.McTextareaModule = McTextareaModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-textarea.umd.js.map

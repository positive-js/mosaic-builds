/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/core'), require('@angular/forms'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/mosaic/core'), require('@angular/common'), require('@angular/platform-browser/animations')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/toggle', ['exports', '@angular/animations', '@angular/core', '@angular/forms', '@ptsecurity/cdk/a11y', '@ptsecurity/mosaic/core', '@angular/common', '@angular/platform-browser/animations'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.toggle = {}),global.ng.animations,global.ng.core,global.ng.forms,global.ng.cdk.a11y,global.ng.mosaic.core,global.ng.common,global.ng.platformBrowser.animations));
}(this, (function (exports,animations,core,forms,a11y,core$1,common,animations$1) { 'use strict';

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

var nextUniqueId = 0;
var McToggleBase = /** @class */ (function () {
    function McToggleBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McToggleBase;
}());
var _McToggleMixinBase = core$1.mixinTabIndex(core$1.mixinColor(core$1.mixinDisabled(McToggleBase)));
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
        _this.color = core$1.ThemePalette.Primary;
        _this.labelPosition = 'right';
        _this.ariaLabel = '';
        _this.ariaLabelledby = null;
        _this._uniqueId = "mc-toggle-" + ++nextUniqueId;
        // tslint:disable:member-ordering
        _this.id = _this._uniqueId;
        _this.name = null;
        _this._disabled = false;
        _this._checked = false;
        _this.change = new core.EventEmitter();
        _this._onTouchedCallback = function () { };
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
            styles: ["mc-toggle{display:inline-block}mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}mc-toggle .mc-toggle__container{display:flex;align-items:center;position:relative}mc-toggle .mc-toggle__container.left{flex-direction:row-reverse}mc-toggle .mc-toggle__content.left{margin-right:8px}mc-toggle .mc-toggle__content.right{margin-left:8px}mc-toggle .mc-toggle-bar{position:relative}mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}mc-toggle .mc-toggle-bar-container{position:relative}mc-toggle .mc-toggle__focus-frame{position:absolute;z-index:1;top:-1px;left:-1px}mc-toggle .mc-toggle__circle{position:absolute;border-radius:100%;margin-top:-1px;margin-left:-1px}mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;width:28px;border-radius:9px}mc-toggle:not(.mc-toggle_small) .mc-toggle__focus-frame{border-radius:10px;height:18px;width:30px}mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;width:24px;border-radius:8px}mc-toggle.mc-toggle_small .mc-toggle__focus-frame{border-radius:9px;height:16px;width:26px}mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}mc-toggle:not(.mc-disabled){cursor:pointer}"],
            providers: [
                { provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return McToggleComponent_1; }), multi: true }
            ],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            inputs: ['disabled', 'color', 'tabIndex'],
            host: {
                '[id]': 'id',
                '[attr.id]': 'id',
                '[class.mc-disabled]': 'disabled',
                '[class.mc-toggle-off]': '!checked'
            },
            animations: [
                animations.trigger('switch', [
                    animations.state('true', animations.style({ right: '-1px' })),
                    animations.state('false', animations.style({ right: '*' })),
                    animations.transition('* => *', animations.animate('150ms'))
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
            imports: [common.CommonModule, animations$1.BrowserAnimationsModule, a11y.A11yModule, core$1.McCommonModule],
            exports: [McToggleComponent],
            declarations: [McToggleComponent]
        })
    ], McToggleModule);
    return McToggleModule;
}());

exports.McToggleModule = McToggleModule;
exports.McToggleBase = McToggleBase;
exports._McToggleMixinBase = _McToggleMixinBase;
exports.McToggleChange = McToggleChange;
exports.McToggleComponent = McToggleComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-toggle.umd.js.map

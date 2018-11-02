/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { ThemePalette, mixinColor, mixinDisabled, mixinTabIndex, McCommonModule } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

var McToggleComponent_1;
let nextUniqueId = 0;
class McToggleBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _McToggleMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McToggleBase)));
class McToggleChange {
}
let McToggleComponent = McToggleComponent_1 = class McToggleComponent extends _McToggleMixinBase {
    constructor(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this._changeDetectorRef = _changeDetectorRef;
        this.color = ThemePalette.Primary;
        this.labelPosition = 'right';
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this._uniqueId = `mc-toggle-${++nextUniqueId}`;
        // tslint:disable:member-ordering
        this.id = this._uniqueId;
        this.name = null;
        this._disabled = false;
        this._checked = false;
        this.change = new EventEmitter();
        this._onTouchedCallback = () => { };
        this._onChangeCallback = (_) => { };
        this.tabIndex = parseInt(tabIndex) || 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    get inputId() {
        return `${this.id || this._uniqueId}-input`;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value !== this._disabled) {
            this._disabled = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        if (value !== this._checked) {
            this._checked = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    focus() {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    }
    _getAriaChecked() {
        return this.checked;
    }
    _onInteractionEvent(event) {
        event.stopPropagation();
    }
    _onLabelTextChange() {
        this._changeDetectorRef.markForCheck();
    }
    _onInputClick(event) {
        event.stopPropagation();
        this._updateModelValue();
        this._emitChangeEvent();
    }
    writeValue(value) {
        this.checked = !!value;
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    _updateModelValue() {
        this._checked = !this.checked;
        this._onChangeCallback(this.checked);
        this._onTouchedCallback();
    }
    _emitChangeEvent() {
        const event = new McToggleChange();
        event.source = this;
        event.checked = this.checked;
        this._onChangeCallback(this.checked);
        this.change.emit(event);
    }
};
__decorate([
    ViewChild('input'),
    __metadata("design:type", ElementRef)
], McToggleComponent.prototype, "_inputElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], McToggleComponent.prototype, "labelPosition", void 0);
__decorate([
    Input('aria-label'),
    __metadata("design:type", String)
], McToggleComponent.prototype, "ariaLabel", void 0);
__decorate([
    Input('aria-labelledby'),
    __metadata("design:type", Object)
], McToggleComponent.prototype, "ariaLabelledby", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], McToggleComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], McToggleComponent.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], McToggleComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McToggleComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McToggleComponent.prototype, "checked", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McToggleComponent.prototype, "change", void 0);
McToggleComponent = McToggleComponent_1 = __decorate([
    Component({
        selector: 'mc-toggle',
        exportAs: 'mcToggle',
        template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\" #label><div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\"><input #input type=\"checkbox\" class=\"mc-toggle-input cdk-visually-hidden\" [id]=\"inputId\" [checked]=\"checked\" [attr.value]=\"value\" [disabled]=\"disabled\" [attr.name]=\"name\" [tabIndex]=\"tabIndex\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-checked]=\"_getAriaChecked()\" (click)=\"_onInputClick($event)\" (change)=\"_onInteractionEvent($event)\"><div class=\"mc-toggle-bar-container\"><div class=\"mc-toggle__focus-frame\"></div><div class=\"mc-toggle-bar\"><div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div></div></div><div class=\"mc-toggle__content\" [class.left]=\"labelPosition === 'left'\" [class.right]=\"labelPosition === 'right'\"><span class=\"mc-toggle-label\" (cdkObserveContent)=\"_onLabelTextChange()\"><ng-content></ng-content></span></div></div></label>",
        styles: ["mc-toggle{display:inline-block}mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}mc-toggle .mc-toggle__container{display:flex;align-items:center;position:relative}mc-toggle .mc-toggle__container.left{flex-direction:row-reverse}mc-toggle .mc-toggle__content.left{margin-right:8px}mc-toggle .mc-toggle__content.right{margin-left:8px}mc-toggle .mc-toggle-bar{position:relative}mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}mc-toggle .mc-toggle-bar-container{position:relative}mc-toggle .mc-toggle__focus-frame{position:absolute;z-index:1;top:-1px;left:-1px}mc-toggle .mc-toggle__circle{position:absolute;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translateX(-1px)}mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;width:28px;border-radius:9px}mc-toggle:not(.mc-toggle_small) .mc-toggle__focus-frame{border-radius:10px;height:18px;width:30px}mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;width:24px;border-radius:8px}mc-toggle.mc-toggle_small .mc-toggle__focus-frame{border-radius:9px;height:16px;width:26px}mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}mc-toggle:not(.mc-disabled){cursor:pointer}"],
        providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => McToggleComponent_1), multi: true }
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        inputs: ['disabled', 'color', 'tabIndex'],
        host: {
            '[id]': 'id',
            '[attr.id]': 'id',
            '[class.mc-disabled]': 'disabled',
            '[class.mc-toggle-off]': '!checked'
        },
        animations: [
            trigger('switch', [
                state('true', style({ left: '50%' })),
                state('false', style({ left: '1px' })),
                transition('true <=> false', animate('150ms'))
            ])
        ]
    }),
    __param(3, Attribute('tabindex')),
    __metadata("design:paramtypes", [ElementRef,
        FocusMonitor,
        ChangeDetectorRef, String])
], McToggleComponent);

let McToggleModule = class McToggleModule {
};
McToggleModule = __decorate([
    NgModule({
        imports: [CommonModule, BrowserAnimationsModule, A11yModule, McCommonModule],
        exports: [McToggleComponent],
        declarations: [McToggleComponent]
    })
], McToggleModule);

/**
 * Generated bundle index. Do not edit.
 */

export { McToggleModule, McToggleBase, _McToggleMixinBase, McToggleChange, McToggleComponent };
//# sourceMappingURL=toggle.js.map

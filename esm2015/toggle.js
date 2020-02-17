/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { CommonModule } from '@angular/common';
import { EventEmitter, Component, forwardRef, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Attribute, ViewChild, Input, Output, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinTabIndex, mixinColor, mixinDisabled, ThemePalette, McCommonModule } from '@ptsecurity/mosaic/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let nextUniqueId = 0;
class McToggleBase {
    // tslint:disable-next-line: naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
const McToggleMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McToggleBase), ThemePalette.Primary));
class McToggleChange {
}
class McToggleComponent extends McToggleMixinBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     * @param {?} _focusMonitor
     * @param {?} _changeDetectorRef
     * @param {?} tabIndex
     */
    constructor(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this._changeDetectorRef = _changeDetectorRef;
        this.labelPosition = 'right';
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.name = null;
        this._disabled = false;
        this._checked = false;
        this.change = new EventEmitter();
        this.uniqueId = `mc-toggle-${++nextUniqueId}`;
        // tslint:disable-next-line:no-empty
        this.onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
        // tslint:disable-next-line:no-empty
        this.onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this.id = this.uniqueId;
        this.tabIndex = parseInt(tabIndex) || 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    /**
     * @return {?}
     */
    get inputId() {
        return `${this.id || this.uniqueId}-input`;
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
        if (value !== this._disabled) {
            this._disabled = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get checked() {
        return this._checked;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        if (value !== this._checked) {
            this._checked = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    focus() {
        this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
    }
    /**
     * @return {?}
     */
    getAriaChecked() {
        return this.checked;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInteractionEvent(event) {
        event.stopPropagation();
    }
    /**
     * @return {?}
     */
    onLabelTextChange() {
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInputClick(event) {
        event.stopPropagation();
        this.updateModelValue();
        this.emitChangeEvent();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = !!value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @private
     * @return {?}
     */
    updateModelValue() {
        this._checked = !this.checked;
        this.onChangeCallback(this.checked);
        this.onTouchedCallback();
    }
    /**
     * @private
     * @return {?}
     */
    emitChangeEvent() {
        /** @type {?} */
        const event = new McToggleChange();
        event.source = this;
        event.checked = this.checked;
        this.onChangeCallback(this.checked);
        this.change.emit(event);
    }
}
McToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'mc-toggle',
                exportAs: 'mcToggle',
                template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\" #label><div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\"><input #input type=\"checkbox\" class=\"mc-toggle-input cdk-visually-hidden\" [id]=\"inputId\" [checked]=\"checked\" [attr.value]=\"value\" [disabled]=\"disabled\" [attr.name]=\"name\" [tabIndex]=\"tabIndex\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-checked]=\"getAriaChecked()\" (click)=\"onInputClick($event)\" (change)=\"onInteractionEvent($event)\"><div class=\"mc-toggle-bar-container\"><div class=\"mc-toggle__overlay\"></div><div class=\"mc-toggle-bar\"><div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div></div></div><div class=\"mc-toggle__content\" [class.left]=\"labelPosition === 'left'\" [class.right]=\"labelPosition === 'right'\"><span class=\"mc-toggle-label\" (cdkObserveContent)=\"onLabelTextChange()\"><ng-content></ng-content></span></div></div></label>",
                styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-toggle .mc-toggle-bar{position:relative;border-width:1px;border-style:solid}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{display:flex;align-items:center;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px}.mc-toggle__content.right{margin-left:8px}.mc-toggle__circle{position:absolute;border-width:1px;border-style:solid;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translateX(-1px)}.mc-toggle__overlay{position:absolute;top:0;left:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;width:28px;border-radius:9px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__overlay{border-radius:9px;height:16px;width:28px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}.mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;width:24px;border-radius:8px}.mc-toggle.mc-toggle_small .mc-toggle__overlay{border-radius:8px;height:14px;width:24px}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}.mc-toggle:not(.mc-disabled){cursor:pointer}"],
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => McToggleComponent)), multi: true }
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled', 'color', 'tabIndex'],
                host: {
                    class: 'mc-toggle',
                    '[id]': 'id',
                    '[attr.id]': 'id',
                    '[class.mc-disabled]': 'disabled',
                    '[class.mc-active]': 'checked'
                },
                animations: [
                    trigger('switch', [
                        state('true', style({ left: '50%' })),
                        state('false', style({ left: '1px' })),
                        transition('true <=> false', animate('150ms'))
                    ])
                ]
            },] },
];
/** @nocollapse */
McToggleComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
];
McToggleComponent.propDecorators = {
    inputElement: [{ type: ViewChild, args: ['input', { static: false },] }],
    labelPosition: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    id: [{ type: Input }],
    name: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    checked: [{ type: Input }],
    change: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McToggleModule {
}
McToggleModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, McCommonModule],
                exports: [McToggleComponent],
                declarations: [McToggleComponent]
            },] },
];

export { McToggleBase, McToggleChange, McToggleComponent, McToggleMixinBase, McToggleModule };
//# sourceMappingURL=toggle.js.map

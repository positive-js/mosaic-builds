/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { ThemePalette, mixinColor, mixinDisabled, mixinTabIndex, McCommonModule } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nextUniqueId = 0;
var McToggleBase = /** @class */ (function () {
    function McToggleBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McToggleBase;
}());
/** @type {?} */
var _McToggleMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McToggleBase), ThemePalette.Primary));
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
        _this.labelPosition = 'right';
        _this.ariaLabel = '';
        _this.ariaLabelledby = null;
        _this._uniqueId = "mc-toggle-" + ++nextUniqueId;
        // tslint:disable:member-ordering
        _this.id = _this._uniqueId;
        _this.name = null;
        _this._disabled = false;
        _this._checked = false;
        _this.change = new EventEmitter();
        // tslint:disable-next-line:no-empty
        _this._onTouchedCallback = (/**
         * @return {?}
         */
        function () { });
        // tslint:disable-next-line:no-empty
        _this._onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
        return _this;
    }
    Object.defineProperty(McToggleComponent.prototype, "inputId", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.id || this._uniqueId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McToggleComponent.prototype, "disabled", {
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
            if (value !== this._disabled) {
                this._disabled = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McToggleComponent.prototype, "checked", {
        get: /**
         * @return {?}
         */
        function () {
            return this._checked;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._checked) {
                this._checked = value;
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McToggleComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McToggleComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    };
    /**
     * @return {?}
     */
    McToggleComponent.prototype._getAriaChecked = /**
     * @return {?}
     */
    function () {
        return this.checked;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McToggleComponent.prototype._onInteractionEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    /**
     * @return {?}
     */
    McToggleComponent.prototype._onLabelTextChange = /**
     * @return {?}
     */
    function () {
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McToggleComponent.prototype._onInputClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this._updateModelValue();
        this._emitChangeEvent();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    McToggleComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.checked = !!value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    McToggleComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    McToggleComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    McToggleComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @private
     * @return {?}
     */
    McToggleComponent.prototype._updateModelValue = /**
     * @private
     * @return {?}
     */
    function () {
        this._checked = !this.checked;
        this._onChangeCallback(this.checked);
        this._onTouchedCallback();
    };
    /**
     * @private
     * @return {?}
     */
    McToggleComponent.prototype._emitChangeEvent = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = new McToggleChange();
        event.source = this;
        event.checked = this.checked;
        this._onChangeCallback(this.checked);
        this.change.emit(event);
    };
    McToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-toggle',
                    exportAs: 'mcToggle',
                    template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\" #label><div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\"><input #input type=\"checkbox\" class=\"mc-toggle-input cdk-visually-hidden\" [id]=\"inputId\" [checked]=\"checked\" [attr.value]=\"value\" [disabled]=\"disabled\" [attr.name]=\"name\" [tabIndex]=\"tabIndex\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-checked]=\"_getAriaChecked()\" (click)=\"_onInputClick($event)\" (change)=\"_onInteractionEvent($event)\"><div class=\"mc-toggle-bar-container\"><div class=\"mc-toggle__focus-frame\"></div><div class=\"mc-toggle-bar\"><div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div></div></div><div class=\"mc-toggle__content\" [class.left]=\"labelPosition === 'left'\" [class.right]=\"labelPosition === 'right'\"><span class=\"mc-toggle-label\" (cdkObserveContent)=\"_onLabelTextChange()\"><ng-content></ng-content></span></div></div></label>",
                    styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-toggle .mc-toggle-bar{position:relative;border-width:1px;border-style:solid}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{display:flex;align-items:center;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px}.mc-toggle__content.right{margin-left:8px}.mc-toggle__circle{position:absolute;border-width:1px;border-style:solid;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translateX(-1px)}.mc-toggle__focus-frame{position:absolute;top:0;left:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;width:28px;border-radius:9px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__focus-frame{border-radius:9px;height:16px;width:28px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}.mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;width:24px;border-radius:8px}.mc-toggle.mc-toggle_small .mc-toggle__focus-frame{border-radius:8px;height:14px;width:24px}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}.mc-toggle:not(.mc-disabled){cursor:pointer}"],
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return McToggleComponent; })), multi: true }
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled', 'color', 'tabIndex'],
                    host: {
                        class: 'mc-toggle',
                        '[id]': 'id',
                        '[attr.id]': 'id',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-toggle_off]': '!checked'
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
    McToggleComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
    ]; };
    McToggleComponent.propDecorators = {
        _inputElement: [{ type: ViewChild, args: ['input', { static: false },] }],
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
    return McToggleComponent;
}(_McToggleMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McToggleModule = /** @class */ (function () {
    function McToggleModule() {
    }
    McToggleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, A11yModule, McCommonModule],
                    exports: [McToggleComponent],
                    declarations: [McToggleComponent]
                },] },
    ];
    return McToggleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McToggleModule, McToggleBase, _McToggleMixinBase, McToggleChange, McToggleComponent };
//# sourceMappingURL=toggle.es5.js.map

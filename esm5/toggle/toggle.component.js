/**
 * @fileoverview added by tsickle
 * Generated from: toggle.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemePalette, mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
/** @type {?} */
var nextUniqueId = 0;
var McToggleBase = /** @class */ (function () {
    // tslint:disable-next-line: naming-convention
    function McToggleBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McToggleBase;
}());
export { McToggleBase };
if (false) {
    /** @type {?} */
    McToggleBase.prototype._elementRef;
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
export var McToggleMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McToggleBase), ThemePalette.Primary));
var McToggleChange = /** @class */ (function () {
    function McToggleChange() {
    }
    return McToggleChange;
}());
export { McToggleChange };
if (false) {
    /** @type {?} */
    McToggleChange.prototype.source;
    /** @type {?} */
    McToggleChange.prototype.checked;
}
var McToggleComponent = /** @class */ (function (_super) {
    __extends(McToggleComponent, _super);
    // tslint:disable-next-line:naming-convention
    function McToggleComponent(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._changeDetectorRef = _changeDetectorRef;
        _this.labelPosition = 'right';
        _this.ariaLabel = '';
        _this.ariaLabelledby = null;
        _this.name = null;
        _this._disabled = false;
        _this._checked = false;
        _this.change = new EventEmitter();
        _this.uniqueId = "mc-toggle-" + ++nextUniqueId;
        // tslint:disable-next-line:no-empty
        _this.onTouchedCallback = (/**
         * @return {?}
         */
        function () { });
        // tslint:disable-next-line:no-empty
        _this.onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        _this.id = _this.uniqueId;
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
        return _this;
    }
    Object.defineProperty(McToggleComponent.prototype, "inputId", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.id || this.uniqueId) + "-input";
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
        this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
    };
    /**
     * @return {?}
     */
    McToggleComponent.prototype.getAriaChecked = /**
     * @return {?}
     */
    function () {
        return this.checked;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McToggleComponent.prototype.onInteractionEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    /**
     * @return {?}
     */
    McToggleComponent.prototype.onLabelTextChange = /**
     * @return {?}
     */
    function () {
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McToggleComponent.prototype.onInputClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.updateModelValue();
        this.emitChangeEvent();
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
        this.onChangeCallback = fn;
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
        this.onTouchedCallback = fn;
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
    McToggleComponent.prototype.updateModelValue = /**
     * @private
     * @return {?}
     */
    function () {
        this._checked = !this.checked;
        this.onChangeCallback(this.checked);
        this.onTouchedCallback();
    };
    /**
     * @private
     * @return {?}
     */
    McToggleComponent.prototype.emitChangeEvent = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = new McToggleChange();
        event.source = this;
        event.checked = this.checked;
        this.onChangeCallback(this.checked);
        this.change.emit(event);
    };
    McToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-toggle',
                    exportAs: 'mcToggle',
                    template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\" #label>\n    <div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\">\n        <input #input\n               type=\"checkbox\"\n               class=\"mc-toggle-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (click)=\"onInputClick($event)\"\n               (change)=\"onInteractionEvent($event)\"/>\n        <div class=\"mc-toggle-bar-container\">\n            <div class=\"mc-toggle__overlay\"></div>\n            <div class=\"mc-toggle-bar\">\n                <div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div>\n            </div>\n        </div>\n        <div class=\"mc-toggle__content\"\n             [class.left]=\"labelPosition === 'left'\"\n             [class.right]=\"labelPosition === 'right'\">\n            <span class=\"mc-toggle-label\" (cdkObserveContent)=\"onLabelTextChange()\">\n                <ng-content></ng-content>\n            </span>\n        </div>\n    </div>\n</label>\n",
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
                        '[class.mc-active]': 'checked'
                    },
                    animations: [
                        trigger('switch', [
                            state('true', style({ left: '50%' })),
                            state('false', style({ left: '1px' })),
                            transition('true <=> false', animate('150ms'))
                        ])
                    ],
                    styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-toggle .mc-toggle-bar{position:relative;border-width:1px;border-style:solid}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{display:flex;align-items:center;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px}.mc-toggle__content.right{margin-left:8px}.mc-toggle__circle{position:absolute;border-width:1px;border-style:solid;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translateX(-1px)}.mc-toggle__overlay{position:absolute;top:0;left:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;width:28px;border-radius:9px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__overlay{border-radius:9px;height:16px;width:28px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}.mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;width:24px;border-radius:8px}.mc-toggle.mc-toggle_small .mc-toggle__overlay{border-radius:8px;height:14px;width:24px}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}.mc-toggle:not(.mc-disabled){cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    McToggleComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
    ]; };
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
    return McToggleComponent;
}(McToggleMixinBase));
export { McToggleComponent };
if (false) {
    /** @type {?} */
    McToggleComponent.prototype.inputElement;
    /** @type {?} */
    McToggleComponent.prototype.labelPosition;
    /** @type {?} */
    McToggleComponent.prototype.ariaLabel;
    /** @type {?} */
    McToggleComponent.prototype.ariaLabelledby;
    /** @type {?} */
    McToggleComponent.prototype.id;
    /** @type {?} */
    McToggleComponent.prototype.name;
    /** @type {?} */
    McToggleComponent.prototype.value;
    /**
     * @type {?}
     * @private
     */
    McToggleComponent.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McToggleComponent.prototype._checked;
    /** @type {?} */
    McToggleComponent.prototype.change;
    /**
     * @type {?}
     * @private
     */
    McToggleComponent.prototype.uniqueId;
    /**
     * @type {?}
     * @private
     */
    McToggleComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    McToggleComponent.prototype.onChangeCallback;
    /** @type {?} */
    McToggleComponent.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    McToggleComponent.prototype._focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McToggleComponent.prototype._changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90b2dnbGUvIiwic291cmNlcyI6WyJ0b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCxTQUFTLEVBQ1QsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFDcEMsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQ3hCLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUNILFlBQVksRUFJWixVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQzs7SUFHN0IsWUFBWSxHQUFHLENBQUM7QUFJcEI7SUFDSSw4Q0FBOEM7SUFDOUMsc0JBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUNsRCxtQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRGUsbUNBQThCOzs7O0FBSTlDLE1BQU0sS0FBTyxpQkFBaUIsR0FJSixhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFdEc7SUFBQTtJQUdBLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRkcsZ0NBQTBCOztJQUMxQixpQ0FBaUI7O0FBR3JCO0lBMEJ1QyxxQ0FBaUI7SUFxRHBE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LEFBNUpELENBMEJ1QyxpQkFBaUIsR0FrSXZEO1NBbElZLGlCQUFpQjs7O0lBRzFCLHlDQUE4RDs7SUFFOUQsMENBQTBEOztJQUUxRCxzQ0FBNEM7O0lBQzVDLDJDQUErRDs7SUFFL0QsK0JBQW9COztJQU1wQixpQ0FBb0M7O0lBRXBDLGtDQUF1Qjs7Ozs7SUFjdkIsc0NBQW1DOzs7OztJQWNuQyxxQ0FBa0M7O0lBRWxDLG1DQUN1Qzs7Ozs7SUFFdkMscUNBQXlEOzs7OztJQTREekQsOENBQXFDOzs7OztJQUdyQyw2Q0FBMEM7O0lBNUQ5Qix3Q0FBOEI7Ozs7O0lBQzlCLDBDQUFtQzs7Ozs7SUFDbkMsK0NBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEF0dHJpYnV0ZSxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZixcbiAgICBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIFRoZW1lUGFsZXR0ZSxcbiAgICBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLFxuICAgIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXhcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG50eXBlIFRvZ2dsZUxhYmVsUG9zaXRpb25UeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuZXhwb3J0IGNsYXNzIE1jVG9nZ2xlQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVG9nZ2xlTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmXG4gICAgQ2FuRGlzYWJsZUN0b3IgJlxuICAgIENhbkNvbG9yQ3RvciAmXG4gICAgdHlwZW9mIE1jVG9nZ2xlQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKE1jVG9nZ2xlQmFzZSksIFRoZW1lUGFsZXR0ZS5QcmltYXJ5KSk7XG5cbmV4cG9ydCBjbGFzcyBNY1RvZ2dsZUNoYW5nZSB7XG4gICAgc291cmNlOiBNY1RvZ2dsZUNvbXBvbmVudDtcbiAgICBjaGVja2VkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRvZ2dsZScsXG4gICAgZXhwb3J0QXM6ICdtY1RvZ2dsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RvZ2dsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9nZ2xlLnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY1RvZ2dsZUNvbXBvbmVudCksIG11bHRpOiB0cnVlfVxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnY29sb3InLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdG9nZ2xlJyxcbiAgICAgICAgJ1tpZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnY2hlY2tlZCdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignc3dpdGNoJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3RydWUnICwgc3R5bGUoeyBsZWZ0OiAnNTAlJyB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnZmFsc2UnLCBzdHlsZSh7IGxlZnQ6ICcxcHgnIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3RydWUgPD0+IGZhbHNlJywgYW5pbWF0ZSgnMTUwbXMnKSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVG9nZ2xlQ29tcG9uZW50IGV4dGVuZHMgTWNUb2dnbGVNaXhpbkJhc2VcbiAgICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBDYW5Db2xvciwgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgge1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7c3RhdGljOiBmYWxzZX0pIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGxhYmVsUG9zaXRpb246IFRvZ2dsZUxhYmVsUG9zaXRpb25UeXBlID0gJ3JpZ2h0JztcblxuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gICAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy51bmlxdWVJZH0taW5wdXRgO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBjaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNUb2dnbGVDaGFuZ2U+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNY1RvZ2dsZUNoYW5nZT4oKTtcblxuICAgIHByaXZhdGUgdW5pcXVlSWQ6IHN0cmluZyA9IGBtYy10b2dnbGUtJHsrK25leHRVbmlxdWVJZH1gO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuaWQgPSAgdGhpcy51bmlxdWVJZDtcblxuICAgICAgICB0aGlzLnRhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgpIHx8IDA7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5Ym9hcmQnKTtcbiAgICB9XG5cbiAgICBnZXRBcmlhQ2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICB9XG5cbiAgICBvbkludGVyYWN0aW9uRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIG9uTGFiZWxUZXh0Q2hhbmdlKCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbklucHV0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWxWYWx1ZSgpO1xuICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5XG4gICAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge307XG5cbiAgICBwcml2YXRlIHVwZGF0ZU1vZGVsVmFsdWUoKSB7XG4gICAgICAgIHRoaXMuX2NoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdENoYW5nZUV2ZW50KCkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNY1RvZ2dsZUNoYW5nZSgpO1xuICAgICAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBldmVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmNoZWNrZWQpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * Generated from: toggle.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemePalette, mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
/** @type {?} */
let nextUniqueId = 0;
export class McToggleBase {
    // tslint:disable-next-line: naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McToggleBase.prototype._elementRef;
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
export const McToggleMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McToggleBase), ThemePalette.Primary));
export class McToggleChange {
}
if (false) {
    /** @type {?} */
    McToggleChange.prototype.source;
    /** @type {?} */
    McToggleChange.prototype.checked;
}
export class McToggleComponent extends McToggleMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _focusMonitor
     * @param {?} _changeDetectorRef
     */
    constructor(_elementRef, _focusMonitor, _changeDetectorRef) {
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
                template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\" #label>\n    <div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\">\n        <input #input\n               type=\"checkbox\"\n               class=\"mc-toggle-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (click)=\"onInputClick($event)\"\n               (change)=\"onInteractionEvent($event)\"/>\n        <div class=\"mc-toggle-bar-container\">\n            <div class=\"mc-toggle__overlay\"></div>\n            <div class=\"mc-toggle-bar\">\n                <div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div>\n            </div>\n        </div>\n        <div class=\"mc-toggle__content\"\n             [class.left]=\"labelPosition === 'left'\"\n             [class.right]=\"labelPosition === 'right'\">\n            <span class=\"mc-toggle-label\" (cdkObserveContent)=\"onLabelTextChange()\">\n                <ng-content></ng-content>\n            </span>\n        </div>\n    </div>\n</label>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color', 'tabIndex'],
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
                providers: [{
                        provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => McToggleComponent)), multi: true
                    }],
                styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-toggle .mc-toggle-bar{position:relative;border-width:1px;border-style:solid}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{display:flex;align-items:center;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px}.mc-toggle__content.right{margin-left:8px}.mc-toggle__circle{position:absolute;border-width:1px;border-style:solid;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translateX(-1px)}.mc-toggle__overlay{position:absolute;top:0;left:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;width:28px;border-radius:9px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__overlay{border-radius:9px;height:16px;width:28px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}.mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;width:24px;border-radius:8px}.mc-toggle.mc-toggle_small .mc-toggle__overlay{border-radius:8px;height:14px;width:24px}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}.mc-toggle:not(.mc-disabled){cursor:pointer}"]
            }] }
];
/** @nocollapse */
McToggleComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90b2dnbGUvIiwic291cmNlcyI6WyJ0b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUNILFlBQVksRUFJWixVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQzs7SUFHN0IsWUFBWSxHQUFHLENBQUM7QUFJcEIsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBRXJCLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDs7O0lBRGUsbUNBQThCOzs7O0FBSTlDLE1BQU0sT0FBTyxpQkFBaUIsR0FJSixhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFdEcsTUFBTSxPQUFPLGNBQWM7Q0FHMUI7OztJQUZHLGdDQUEwQjs7SUFDMUIsaUNBQWlCOztBQTZCckIsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGlCQUFpQjs7Ozs7O0lBb0RwRCxZQUVXLFdBQXVCLEVBQ3RCLGFBQTJCLEVBQzNCLGtCQUFxQztR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LCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIFRoZW1lUGFsZXR0ZSxcbiAgICBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLFxuICAgIENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4LCBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXhcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG50eXBlIFRvZ2dsZUxhYmVsUG9zaXRpb25UeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuZXhwb3J0IGNsYXNzIE1jVG9nZ2xlQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVG9nZ2xlTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmXG4gICAgQ2FuRGlzYWJsZUN0b3IgJlxuICAgIENhbkNvbG9yQ3RvciAmXG4gICAgdHlwZW9mIE1jVG9nZ2xlQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKE1jVG9nZ2xlQmFzZSksIFRoZW1lUGFsZXR0ZS5QcmltYXJ5KSk7XG5cbmV4cG9ydCBjbGFzcyBNY1RvZ2dsZUNoYW5nZSB7XG4gICAgc291cmNlOiBNY1RvZ2dsZUNvbXBvbmVudDtcbiAgICBjaGVja2VkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRvZ2dsZScsXG4gICAgZXhwb3J0QXM6ICdtY1RvZ2dsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RvZ2dsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9nZ2xlLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvcicsICd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10b2dnbGUnLFxuICAgICAgICAnW2lkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbY2xhc3MubWMtYWN0aXZlXSc6ICdjaGVja2VkJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzd2l0Y2gnLCBbXG4gICAgICAgICAgICBzdGF0ZSgndHJ1ZScgLCBzdHlsZSh7IGxlZnQ6ICc1MCUnIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCdmYWxzZScsIHN0eWxlKHsgbGVmdDogJzFweCcgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndHJ1ZSA8PT4gZmFsc2UnLCBhbmltYXRlKCcxNTBtcycpKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWNUb2dnbGVDb21wb25lbnQpLCBtdWx0aTogdHJ1ZVxuICAgIH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jVG9nZ2xlQ29tcG9uZW50IGV4dGVuZHMgTWNUb2dnbGVNaXhpbkJhc2VcbiAgICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBDYW5Db2xvciwgQ2FuRGlzYWJsZSwgSGFzVGFiSW5kZXgge1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSkgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgbGFiZWxQb3NpdGlvbjogVG9nZ2xlTGFiZWxQb3NpdGlvblR5cGUgPSAncmlnaHQnO1xuXG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgICBnZXQgaW5wdXRJZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5pZCB8fCB0aGlzLnVuaXF1ZUlkfS1pbnB1dGA7XG4gICAgfVxuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGNoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja2VkO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGNoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNY1RvZ2dsZUNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1jVG9nZ2xlQ2hhbmdlPigpO1xuXG4gICAgcHJpdmF0ZSB1bmlxdWVJZDogc3RyaW5nID0gYG1jLXRvZ2dsZS0keysrbmV4dFVuaXF1ZUlkfWA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgICAgIHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBzdXBlcihfZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5pZCA9ICB0aGlzLnVuaXF1ZUlkO1xuXG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2tleWJvYXJkJyk7XG4gICAgfVxuXG4gICAgZ2V0QXJpYUNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgfVxuXG4gICAgb25JbnRlcmFjdGlvbkV2ZW50KGV2ZW50OiBFdmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbkxhYmVsVGV4dENoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsVmFsdWUoKTtcbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gISF2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2sgPSAoKSA9PiB7fTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHt9O1xuXG4gICAgcHJpdmF0ZSB1cGRhdGVNb2RlbFZhbHVlKCkge1xuICAgICAgICB0aGlzLl9jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuY2hlY2tlZCk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVtaXRDaGFuZ2VFdmVudCgpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTWNUb2dnbGVDaGFuZ2UoKTtcbiAgICAgICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICAgICAgZXZlbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChldmVudCk7XG4gICAgfVxufVxuIl19
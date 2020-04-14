/**
 * @fileoverview added by tsickle
 * Generated from: toggle.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
    function McToggleComponent(_elementRef, _focusMonitor, _changeDetectorRef) {
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
                            function () { return McToggleComponent; })), multi: true
                        }],
                    styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-toggle .mc-toggle-bar{position:relative;border-width:1px;border-style:solid}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{display:flex;align-items:center;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px}.mc-toggle__content.right{margin-left:8px}.mc-toggle__circle{position:absolute;border-width:1px;border-style:solid;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translateX(-1px)}.mc-toggle__overlay{position:absolute;top:0;left:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;width:28px;border-radius:9px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__overlay{border-radius:9px;height:16px;width:28px}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;width:16px}.mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;width:24px;border-radius:8px}.mc-toggle.mc-toggle_small .mc-toggle__overlay{border-radius:8px;height:14px;width:24px}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;width:14px}.mc-toggle:not(.mc-disabled){cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    McToggleComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: ChangeDetectorRef }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90b2dnbGUvIiwic291cmNlcyI6WyJ0b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDSCxZQUFZLEVBSVosVUFBVSxFQUNWLGFBQWEsRUFDYixhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7O0lBRzdCLFlBQVksR0FBRyxDQUFDO0FBSXBCO0lBQ0ksOENBQThDO0lBQzlDLHNCQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFDbEQsbUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQURlLG1DQUE4Qjs7OztBQUk5QyxNQUFNLEtBQU8saUJBQWlCLEdBSUosYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXRHO0lBQUE7SUFHQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQUZHLGdDQUEwQjs7SUFDMUIsaUNBQWlCOztBQUdyQjtJQTBCdUMscUNBQWlCO0lBb0RwRCwyQkFFVyxXQUF1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QyxrQ0FBdUI7Ozs7O0lBY3ZCLHNDQUFtQzs7Ozs7SUFjbkMscUNBQWtDOztJQUVsQyxtQ0FBNkY7Ozs7O0lBRTdGLHFDQUF5RDs7Ozs7SUEwRHpELDhDQUFxQzs7Ozs7SUFHckMsNkNBQTBDOztJQXpEdEMsd0NBQThCOzs7OztJQUM5QiwwQ0FBbUM7Ozs7O0lBQ25DLCtDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBUaGVtZVBhbGV0dGUsXG4gICAgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvcixcbiAgICBIYXNUYWJJbmRleCwgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4XG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxudHlwZSBUb2dnbGVMYWJlbFBvc2l0aW9uVHlwZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbmV4cG9ydCBjbGFzcyBNY1RvZ2dsZUJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RvZ2dsZU1peGluQmFzZTpcbiAgICBIYXNUYWJJbmRleEN0b3IgJlxuICAgIENhbkRpc2FibGVDdG9yICZcbiAgICBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY1RvZ2dsZUJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY1RvZ2dsZUJhc2UpLCBUaGVtZVBhbGV0dGUuUHJpbWFyeSkpO1xuXG5leHBvcnQgY2xhc3MgTWNUb2dnbGVDaGFuZ2Uge1xuICAgIHNvdXJjZTogTWNUb2dnbGVDb21wb25lbnQ7XG4gICAgY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10b2dnbGUnLFxuICAgIGV4cG9ydEFzOiAnbWNUb2dnbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RvZ2dsZS5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnY29sb3InLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdG9nZ2xlJyxcbiAgICAgICAgJ1tpZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnY2hlY2tlZCdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignc3dpdGNoJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3RydWUnICwgc3R5bGUoeyBsZWZ0OiAnNTAlJyB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnZmFsc2UnLCBzdHlsZSh7IGxlZnQ6ICcxcHgnIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3RydWUgPD0+IGZhbHNlJywgYW5pbWF0ZSgnMTUwbXMnKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jVG9nZ2xlQ29tcG9uZW50KSwgbXVsdGk6IHRydWVcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RvZ2dsZUNvbXBvbmVudCBleHRlbmRzIE1jVG9nZ2xlTWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQ2FuQ29sb3IsIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGxhYmVsUG9zaXRpb246IFRvZ2dsZUxhYmVsUG9zaXRpb25UeXBlID0gJ3JpZ2h0JztcblxuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gICAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy51bmlxdWVJZH0taW5wdXRgO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBjaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNUb2dnbGVDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RvZ2dsZUNoYW5nZT4oKTtcblxuICAgIHByaXZhdGUgdW5pcXVlSWQ6IHN0cmluZyA9IGBtYy10b2dnbGUtJHsrK25leHRVbmlxdWVJZH1gO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgICAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuaWQgPSAgdGhpcy51bmlxdWVJZDtcblxuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXlib2FyZCcpO1xuICAgIH1cblxuICAgIGdldEFyaWFDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgIH1cblxuICAgIG9uSW50ZXJhY3Rpb25FdmVudChldmVudDogRXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25MYWJlbFRleHRDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uSW5wdXRDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbFZhbHVlKCk7XG4gICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge307XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7fTtcblxuICAgIHByaXZhdGUgdXBkYXRlTW9kZWxWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmNoZWNrZWQpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbWl0Q2hhbmdlRXZlbnQoKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1jVG9nZ2xlQ2hhbmdlKCk7XG4gICAgICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIGV2ZW50LmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuY2hlY2tlZCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cbiJdfQ==
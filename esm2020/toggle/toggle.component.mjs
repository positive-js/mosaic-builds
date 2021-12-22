import { animate, state, style, transition, trigger } from '@angular/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemePalette, mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
let nextUniqueId = 0;
export class McToggleBase {
    // tslint:disable-next-line: naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line: naming-convention
export const McToggleMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McToggleBase), ThemePalette.Primary));
export class McToggleChange {
}
export class McToggleComponent extends McToggleMixinBase {
    constructor(
    // tslint:disable-next-line:naming-convention
    _elementRef, _focusMonitor, _changeDetectorRef) {
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
        this.onTouchedCallback = () => { };
        // tslint:disable-next-line:no-empty
        this.onChangeCallback = (_) => { };
        this.id = this.uniqueId;
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    get inputId() {
        return `${this.id || this.uniqueId}-input`;
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
        this._focusMonitor.focusVia(this.inputElement.nativeElement, 'keyboard');
    }
    getAriaChecked() {
        return this.checked;
    }
    onChangeEvent(event) {
        event.stopPropagation();
        this.updateModelValue();
        this.emitChangeEvent();
    }
    onLabelTextChange() {
        this._changeDetectorRef.markForCheck();
    }
    onInputClick(event) {
        event.stopPropagation();
    }
    writeValue(value) {
        this.checked = !!value;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    updateModelValue() {
        this._checked = !this.checked;
        this.onTouchedCallback();
    }
    emitChangeEvent() {
        const event = new McToggleChange();
        event.source = this;
        event.checked = this.checked;
        this.onChangeCallback(this.checked);
        this.change.emit(event);
    }
}
/** @nocollapse */ /** @nocollapse */ McToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McToggleComponent, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McToggleComponent, selector: "mc-toggle", inputs: { color: "color", tabIndex: "tabIndex", labelPosition: "labelPosition", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], id: "id", name: "name", value: "value", disabled: "disabled", checked: "checked" }, outputs: { change: "change" }, host: { properties: { "id": "id", "attr.id": "id", "class.mc-disabled": "disabled", "class.mc-active": "checked" }, classAttribute: "mc-toggle" }, providers: [{
            provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((() => McToggleComponent)), multi: true
        }], viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true }], exportAs: ["mcToggle"], usesInheritance: true, ngImport: i0, template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\">\n    <div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\">\n        <input #input\n               type=\"checkbox\"\n               role=\"switch\"\n               class=\"mc-toggle-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (click)=\"onInputClick($event)\"\n               (change)=\"onChangeEvent($event)\"/>\n        <div class=\"mc-toggle-bar-container\">\n            <div class=\"mc-toggle__overlay\"></div>\n            <div class=\"mc-toggle-bar\">\n                <div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div>\n            </div>\n        </div>\n        <div class=\"mc-toggle__content\"\n             [class.left]=\"labelPosition === 'left'\"\n             [class.right]=\"labelPosition === 'right'\">\n            <span class=\"mc-toggle-label\" (cdkObserveContent)=\"onLabelTextChange()\">\n                <ng-content></ng-content>\n            </span>\n        </div>\n    </div>\n</label>\n", styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-toggle .mc-toggle-bar{position:relative;border-width:1px;border-style:solid}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{display:flex;align-items:center;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px;margin-right:var(--mc-toggle-size-label-margin, 8px)}.mc-toggle__content.right{margin-left:8px;margin-left:var(--mc-toggle-size-label-margin, 8px)}.mc-toggle__circle{position:absolute;border-width:1px;border-style:solid;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translate(-1px)}.mc-toggle__overlay{position:absolute;top:0;left:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;height:var(--mc-toggle-size-height, 16px);width:28px;width:var(--mc-toggle-size-width, 28px);border-radius:9px;border-radius:var(--mc-toggle-size-border-radius, 9px)}.mc-toggle:not(.mc-toggle_small) .mc-toggle__overlay{border-radius:9px;border-radius:var(--mc-toggle-size-border-radius, 9px);height:16px;height:var(--mc-toggle-size-height, 16px);width:28px;width:var(--mc-toggle-size-width, 28px)}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;height:var(--mc-toggle-size-height, 16px);width:16px;width:var(--mc-toggle-size-height, 16px)}.mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;height:var(--mc-toggle-small-size-height, 14px);width:24px;width:var(--mc-toggle-small-size-width, 24px);border-radius:8px;border-radius:var(--mc-toggle-small-size-border-radius, 8px)}.mc-toggle.mc-toggle_small .mc-toggle__overlay{border-radius:8px;border-radius:var(--mc-toggle-small-size-border-radius, 8px);height:14px;height:var(--mc-toggle-small-size-height, 14px);width:24px;width:var(--mc-toggle-small-size-width, 24px)}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;height:var(--mc-toggle-small-size-height, 14px);width:14px;width:var(--mc-toggle-small-size-height, 14px)}.mc-toggle:not(.mc-disabled){cursor:pointer}\n"], animations: [
        trigger('switch', [
            state('true', style({ left: '50%' })),
            state('false', style({ left: '1px' })),
            transition('true <=> false', animate('150ms'))
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-toggle', exportAs: 'mcToggle', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color', 'tabIndex'], host: {
                        class: 'mc-toggle',
                        '[id]': 'id',
                        '[attr.id]': 'id',
                        '[class.mc-disabled]': 'disabled',
                        '[class.mc-active]': 'checked'
                    }, animations: [
                        trigger('switch', [
                            state('true', style({ left: '50%' })),
                            state('false', style({ left: '1px' })),
                            transition('true <=> false', animate('150ms'))
                        ])
                    ], providers: [{
                            provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((() => McToggleComponent)), multi: true
                        }], template: "<label [attr.for]=\"inputId\" class=\"mc-toggle-layout\">\n    <div class=\"mc-toggle__container\" [class.left]=\"labelPosition === 'left'\">\n        <input #input\n               type=\"checkbox\"\n               role=\"switch\"\n               class=\"mc-toggle-input cdk-visually-hidden\"\n               [id]=\"inputId\"\n               [checked]=\"checked\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabIndex]=\"tabIndex\"\n               [attr.aria-label]=\"ariaLabel || null\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"getAriaChecked()\"\n               (click)=\"onInputClick($event)\"\n               (change)=\"onChangeEvent($event)\"/>\n        <div class=\"mc-toggle-bar-container\">\n            <div class=\"mc-toggle__overlay\"></div>\n            <div class=\"mc-toggle-bar\">\n                <div class=\"mc-toggle__circle\" [@switch]=\"checked\"></div>\n            </div>\n        </div>\n        <div class=\"mc-toggle__content\"\n             [class.left]=\"labelPosition === 'left'\"\n             [class.right]=\"labelPosition === 'right'\">\n            <span class=\"mc-toggle-label\" (cdkObserveContent)=\"onLabelTextChange()\">\n                <ng-content></ng-content>\n            </span>\n        </div>\n    </div>\n</label>\n", styles: [".mc-toggle{display:inline-block}.mc-toggle .mc-toggle-layout{cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mc-toggle .mc-toggle-bar{position:relative;border-width:1px;border-style:solid}.mc-toggle .mc-toggle-bar.mc-toggle-label-position-left{order:1}.mc-toggle .mc-toggle-bar-container{position:relative}.mc-toggle__container{display:flex;align-items:center;position:relative}.mc-toggle__container.left{flex-direction:row-reverse}.mc-toggle__content.left{margin-right:8px;margin-right:var(--mc-toggle-size-label-margin, 8px)}.mc-toggle__content.right{margin-left:8px;margin-left:var(--mc-toggle-size-label-margin, 8px)}.mc-toggle__circle{position:absolute;border-width:1px;border-style:solid;border-radius:100%;margin-top:-1px;margin-left:-1px;transform:translate(-1px)}.mc-toggle__overlay{position:absolute;top:0;left:0;z-index:1}.mc-toggle:not(.mc-toggle_small) .mc-toggle-bar{height:16px;height:var(--mc-toggle-size-height, 16px);width:28px;width:var(--mc-toggle-size-width, 28px);border-radius:9px;border-radius:var(--mc-toggle-size-border-radius, 9px)}.mc-toggle:not(.mc-toggle_small) .mc-toggle__overlay{border-radius:9px;border-radius:var(--mc-toggle-size-border-radius, 9px);height:16px;height:var(--mc-toggle-size-height, 16px);width:28px;width:var(--mc-toggle-size-width, 28px)}.mc-toggle:not(.mc-toggle_small) .mc-toggle__circle{height:16px;height:var(--mc-toggle-size-height, 16px);width:16px;width:var(--mc-toggle-size-height, 16px)}.mc-toggle.mc-toggle_small .mc-toggle-bar{height:14px;height:var(--mc-toggle-small-size-height, 14px);width:24px;width:var(--mc-toggle-small-size-width, 24px);border-radius:8px;border-radius:var(--mc-toggle-small-size-border-radius, 8px)}.mc-toggle.mc-toggle_small .mc-toggle__overlay{border-radius:8px;border-radius:var(--mc-toggle-small-size-border-radius, 8px);height:14px;height:var(--mc-toggle-small-size-height, 14px);width:24px;width:var(--mc-toggle-small-size-width, 24px)}.mc-toggle.mc-toggle_small .mc-toggle__circle{height:14px;height:var(--mc-toggle-small-size-height, 14px);width:14px;width:var(--mc-toggle-small-size-height, 14px)}.mc-toggle:not(.mc-disabled){cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: false }]
            }], labelPosition: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], id: [{
                type: Input
            }], name: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], checked: [{
                type: Input
            }], change: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDSCxZQUFZLEVBSVosVUFBVSxFQUNWLGFBQWEsRUFDYixhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7OztBQUdqQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFJckIsTUFBTSxPQUFPLFlBQVk7SUFDckIsOENBQThDO0lBQzlDLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDtBQUVELDhDQUE4QztBQUM5QyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FJSixhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUV2RyxNQUFNLE9BQU8sY0FBYztDQUcxQjtBQTRCRCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsaUJBQWlCO0lBb0RwRDtJQUNJLDZDQUE2QztJQUN0QyxXQUF1QixFQUN0QixhQUEyQixFQUMzQixrQkFBcUM7UUFFN0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBSlosZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQW5EeEMsa0JBQWEsR0FBNEIsT0FBTyxDQUFDO1FBRXJDLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDbEIsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBUXRELFNBQUksR0FBa0IsSUFBSSxDQUFDO1FBZ0I1QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBYzNCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFZixXQUFNLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBRXJGLGFBQVEsR0FBVyxhQUFhLEVBQUUsWUFBWSxFQUFFLENBQUM7UUEwRHpELG9DQUFvQztRQUM1QixzQkFBaUIsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFckMsb0NBQW9DO1FBQzVCLHFCQUFnQixHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFwRHRDLElBQUksQ0FBQyxFQUFFLEdBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUV6QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBbkRELElBQUksT0FBTztRQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBTUQsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFVO1FBQ25CLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQUlELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFDSSxPQUFPLENBQUMsS0FBYztRQUN0QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFxQkQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQVk7UUFDdEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBaUI7UUFDMUIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBUU8sZ0JBQWdCO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyxlQUFlO1FBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDbkMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRTdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7b0pBOUhRLGlCQUFpQjt3SUFBakIsaUJBQWlCLHlkQUpmLENBQUM7WUFDUixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQyxFQUFFLEtBQUssRUFBRSxJQUFJO1NBQzVGLENBQUMsZ0xDdkVOLCszQ0FnQ0EseXFFRDhCZ0I7UUFDUixPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ2QsS0FBSyxDQUFDLE1BQU0sRUFBRyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN0QyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQsQ0FBQztLQUNMOzJGQUtRLGlCQUFpQjtrQkExQjdCLFNBQVM7K0JBQ0ksV0FBVyxZQUNYLFVBQVUsbUJBR0gsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxVQUM3QixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsUUFDdkI7d0JBQ0YsS0FBSyxFQUFFLFdBQVc7d0JBQ2xCLE1BQU0sRUFBRSxJQUFJO3dCQUNaLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixxQkFBcUIsRUFBRSxVQUFVO3dCQUNqQyxtQkFBbUIsRUFBRSxTQUFTO3FCQUNqQyxjQUNXO3dCQUNSLE9BQU8sQ0FBQyxRQUFRLEVBQUU7NEJBQ2QsS0FBSyxDQUFDLE1BQU0sRUFBRyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFDdEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFDdEMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDakQsQ0FBQztxQkFDTCxhQUNVLENBQUM7NEJBQ1IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUMsR0FBRyxFQUFFLGtCQUFrQixFQUFDLEVBQUUsS0FBSyxFQUFFLElBQUk7eUJBQzVGLENBQUM7NEpBS3FDLFlBQVk7c0JBQWxELFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFNUIsYUFBYTtzQkFBckIsS0FBSztnQkFFZSxTQUFTO3NCQUE3QixLQUFLO3VCQUFDLFlBQVk7Z0JBQ08sY0FBYztzQkFBdkMsS0FBSzt1QkFBQyxpQkFBaUI7Z0JBRWYsRUFBRTtzQkFBVixLQUFLO2dCQU1HLElBQUk7c0JBQVosS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0YsUUFBUTtzQkFEWCxLQUFLO2dCQW1CRixPQUFPO3NCQURWLEtBQUs7Z0JBVWEsTUFBTTtzQkFBeEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBUaGVtZVBhbGV0dGUsXG4gICAgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvcixcbiAgICBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvcixcbiAgICBIYXNUYWJJbmRleCwgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4XG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxudHlwZSBUb2dnbGVMYWJlbFBvc2l0aW9uVHlwZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbmV4cG9ydCBjbGFzcyBNY1RvZ2dsZUJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RvZ2dsZU1peGluQmFzZTpcbiAgICBIYXNUYWJJbmRleEN0b3IgJlxuICAgIENhbkRpc2FibGVDdG9yICZcbiAgICBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY1RvZ2dsZUJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY1RvZ2dsZUJhc2UpLCBUaGVtZVBhbGV0dGUuUHJpbWFyeSkpO1xuXG5leHBvcnQgY2xhc3MgTWNUb2dnbGVDaGFuZ2Uge1xuICAgIHNvdXJjZTogTWNUb2dnbGVDb21wb25lbnQ7XG4gICAgY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10b2dnbGUnLFxuICAgIGV4cG9ydEFzOiAnbWNUb2dnbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RvZ2dsZS5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnY29sb3InLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdG9nZ2xlJyxcbiAgICAgICAgJ1tpZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnY2hlY2tlZCdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignc3dpdGNoJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3RydWUnICwgc3R5bGUoeyBsZWZ0OiAnNTAlJyB9KSksXG4gICAgICAgICAgICBzdGF0ZSgnZmFsc2UnLCBzdHlsZSh7IGxlZnQ6ICcxcHgnIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3RydWUgPD0+IGZhbHNlJywgYW5pbWF0ZSgnMTUwbXMnKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jVG9nZ2xlQ29tcG9uZW50KSwgbXVsdGk6IHRydWVcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RvZ2dsZUNvbXBvbmVudCBleHRlbmRzIE1jVG9nZ2xlTWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQ2FuQ29sb3IsIENhbkRpc2FibGUsIEhhc1RhYkluZGV4IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGxhYmVsUG9zaXRpb246IFRvZ2dsZUxhYmVsUG9zaXRpb25UeXBlID0gJ3JpZ2h0JztcblxuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gICAgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy51bmlxdWVJZH0taW5wdXRgO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBjaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjaGVja2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWNUb2dnbGVDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RvZ2dsZUNoYW5nZT4oKTtcblxuICAgIHByaXZhdGUgdW5pcXVlSWQ6IHN0cmluZyA9IGBtYy10b2dnbGUtJHsrK25leHRVbmlxdWVJZH1gO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgICAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuaWQgPSAgdGhpcy51bmlxdWVJZDtcblxuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXlib2FyZCcpO1xuICAgIH1cblxuICAgIGdldEFyaWFDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWxWYWx1ZSgpO1xuICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cblxuICAgIG9uTGFiZWxUZXh0Q2hhbmdlKCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbklucHV0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge307XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcbiAgICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7fTtcblxuICAgIHByaXZhdGUgdXBkYXRlTW9kZWxWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVtaXRDaGFuZ2VFdmVudCgpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTWNUb2dnbGVDaGFuZ2UoKTtcbiAgICAgICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICAgICAgZXZlbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChldmVudCk7XG4gICAgfVxufVxuIiwiPGxhYmVsIFthdHRyLmZvcl09XCJpbnB1dElkXCIgY2xhc3M9XCJtYy10b2dnbGUtbGF5b3V0XCI+XG4gICAgPGRpdiBjbGFzcz1cIm1jLXRvZ2dsZV9fY29udGFpbmVyXCIgW2NsYXNzLmxlZnRdPVwibGFiZWxQb3NpdGlvbiA9PT0gJ2xlZnQnXCI+XG4gICAgICAgIDxpbnB1dCAjaW5wdXRcbiAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICByb2xlPVwic3dpdGNoXCJcbiAgICAgICAgICAgICAgIGNsYXNzPVwibWMtdG9nZ2xlLWlucHV0IGNkay12aXN1YWxseS1oaWRkZW5cIlxuICAgICAgICAgICAgICAgW2lkXT1cImlucHV0SWRcIlxuICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZFwiXG4gICAgICAgICAgICAgICBbYXR0ci52YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbCB8fCBudWxsXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiZ2V0QXJpYUNoZWNrZWQoKVwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwib25JbnB1dENsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkNoYW5nZUV2ZW50KCRldmVudClcIi8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy10b2dnbGUtYmFyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXRvZ2dsZV9fb3ZlcmxheVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXRvZ2dsZS1iYXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdG9nZ2xlX19jaXJjbGVcIiBbQHN3aXRjaF09XCJjaGVja2VkXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy10b2dnbGVfX2NvbnRlbnRcIlxuICAgICAgICAgICAgIFtjbGFzcy5sZWZ0XT1cImxhYmVsUG9zaXRpb24gPT09ICdsZWZ0J1wiXG4gICAgICAgICAgICAgW2NsYXNzLnJpZ2h0XT1cImxhYmVsUG9zaXRpb24gPT09ICdyaWdodCdcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWMtdG9nZ2xlLWxhYmVsXCIgKGNka09ic2VydmVDb250ZW50KT1cIm9uTGFiZWxUZXh0Q2hhbmdlKClcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9sYWJlbD5cbiJdfQ==
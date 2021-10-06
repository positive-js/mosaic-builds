import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
declare type ToggleLabelPositionType = 'left' | 'right';
export declare class McToggleBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McToggleMixinBase: HasTabIndexCtor & CanDisableCtor & CanColorCtor & typeof McToggleBase;
export declare class McToggleChange {
    source: McToggleComponent;
    checked: boolean;
}
export declare class McToggleComponent extends McToggleMixinBase implements ControlValueAccessor, CanColor, CanDisable, HasTabIndex {
    _elementRef: ElementRef;
    private _focusMonitor;
    private _changeDetectorRef;
    inputElement: ElementRef;
    labelPosition: ToggleLabelPositionType;
    ariaLabel: string;
    ariaLabelledby: string | null;
    id: string;
    get inputId(): string;
    name: string | null;
    value: string;
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    get checked(): boolean;
    set checked(value: boolean);
    private _checked;
    readonly change: EventEmitter<McToggleChange>;
    private uniqueId;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    focus(): void;
    getAriaChecked(): boolean;
    onChangeEvent(event: Event): void;
    onLabelTextChange(): void;
    onInputClick(event: MouseEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    private onTouchedCallback;
    private onChangeCallback;
    private updateModelValue;
    private emitChangeEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<McToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McToggleComponent, "mc-toggle", ["mcToggle"], { "color": "color"; "tabIndex": "tabIndex"; "labelPosition": "labelPosition"; "ariaLabel": "aria-label"; "ariaLabelledby": "aria-labelledby"; "id": "id"; "name": "name"; "value": "value"; "disabled": "disabled"; "checked": "checked"; }, { "change": "change"; }, never, ["*"]>;
}
export {};

import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CanColor, CanColorCtor, CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
declare type ToggleLabelPositionType = 'left' | 'right';
export declare class McToggleBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const mcToggleMixinBase: HasTabIndexCtor & CanDisableCtor & CanColorCtor & typeof McToggleBase;
export declare class McToggleChange {
    source: McToggleComponent;
    checked: boolean;
}
export declare class McToggleComponent extends mcToggleMixinBase implements ControlValueAccessor, CanColor, CanDisable, HasTabIndex {
    _elementRef: ElementRef;
    private _focusMonitor;
    private _changeDetectorRef;
    inputElement: ElementRef;
    labelPosition: ToggleLabelPositionType;
    ariaLabel: string;
    ariaLabelledby: string | null;
    id: string;
    readonly inputId: string;
    name: string | null;
    value: string;
    disabled: any;
    private _disabled;
    checked: boolean;
    private _checked;
    readonly change: EventEmitter<McToggleChange>;
    private uniqueId;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef, tabIndex: string);
    ngOnDestroy(): void;
    focus(): void;
    getAriaChecked(): boolean;
    onInteractionEvent(event: Event): void;
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
}
export {};

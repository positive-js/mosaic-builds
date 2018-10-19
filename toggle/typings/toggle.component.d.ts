import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { ThemePalette, CanColor, CanColorCtor, CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
declare type ToggleLabelPositionType = 'left' | 'right';
export declare class McToggleBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McToggleMixinBase: HasTabIndexCtor & CanDisableCtor & CanColorCtor & typeof McToggleBase;
export declare class McToggleChange {
    source: McToggleComponent;
    checked: boolean;
}
export declare class McToggleComponent extends _McToggleMixinBase implements ControlValueAccessor, CanColor, CanDisable, HasTabIndex {
    _elementRef: ElementRef;
    private _focusMonitor;
    private _changeDetectorRef;
    color: ThemePalette;
    _inputElement: ElementRef;
    labelPosition: ToggleLabelPositionType;
    ariaLabel: string;
    ariaLabelledby: string | null;
    private _uniqueId;
    id: string;
    readonly inputId: string;
    name: string | null;
    value: string;
    private _disabled;
    disabled: any;
    private _checked;
    checked: boolean;
    readonly change: EventEmitter<McToggleChange>;
    constructor(_elementRef: ElementRef, _focusMonitor: FocusMonitor, _changeDetectorRef: ChangeDetectorRef, tabIndex: string);
    ngOnDestroy(): void;
    focus(): void;
    _getAriaChecked(): boolean;
    _onInteractionEvent(event: Event): void;
    _onLabelTextChange(): void;
    _onInputClick(event: MouseEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _updateModelValue;
    private _emitChangeEvent;
}
export {};

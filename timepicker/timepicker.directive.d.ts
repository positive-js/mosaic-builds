import { ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McWarningTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { Subject } from 'rxjs';
import { TimeFormats } from './timepicker.constants';
import * as i0 from "@angular/core";
/** @docs-private */
export declare const MC_TIMEPICKER_VALUE_ACCESSOR: any;
/** @docs-private */
export declare const MC_TIMEPICKER_VALIDATORS: any;
export declare class McTimepicker<D> implements McFormFieldControl<D>, ControlValueAccessor, Validator, OnDestroy {
    private elementRef;
    private renderer;
    private dateAdapter;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    readonly stateChanges: Subject<void>;
    readonly errorState: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    focused: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    controlType: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get placeholder(): string;
    set placeholder(value: string);
    private _placeholder;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    get id(): string;
    set id(value: string);
    private _id;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    private _required;
    get format(): TimeFormats;
    set format(formatValue: TimeFormats);
    private _format;
    get min(): D | null;
    set min(value: D | null);
    private _min;
    get max(): D | null;
    set max(value: D | null);
    private _max;
    get value(): D | null;
    set value(value: D | null);
    private _value;
    set mcValidationTooltip(tooltip: McWarningTooltipTrigger);
    incorrectInput: EventEmitter<void>;
    get hasSelection(): boolean;
    get isFullFormat(): boolean;
    get isShortFormat(): boolean;
    get viewValue(): string;
    get ngControl(): any;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get empty(): boolean;
    get selectionStart(): number | null;
    set selectionStart(value: number | null);
    get selectionEnd(): number | null;
    set selectionEnd(value: number | null);
    private readonly uid;
    private readonly validator;
    private lastValueValid;
    private control;
    private defaultPlaceholder;
    private onChange;
    private onTouched;
    constructor(elementRef: ElementRef, renderer: Renderer2, dateAdapter: DateAdapter<any>);
    ngOnDestroy(): void;
    getSize(): number;
    focus(): void;
    focusChanged(isFocused: boolean): void;
    onBlur(): void;
    onPaste($event: any): void;
    onInput: () => void;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    onKeyDown(event: KeyboardEvent): void;
    validate(control: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
    writeValue(value: D | null): void;
    registerOnChange(fn: (value: D) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    private formatUserPaste;
    private formatUserInput;
    private replaceSymbols;
    private replaceNumbers;
    /** Checks whether the input is invalid based on the native validation. */
    private isBadInput;
    private spaceKeyHandler;
    private getNewValue;
    private verticalArrowKeyHandler;
    private horizontalArrowKeyHandler;
    private createSelectionOfTimeComponentInInput;
    private incrementTime;
    private decrementTime;
    /**
     * @description Get params for arrow-keys (up/down) time valie edit.
     * @param cursorPosition Current cursor position in timeString
     */
    private getTimeEditMetrics;
    /**
     * @description Create time string for displaying inside input element of UI
     */
    private getTimeStringFromDate;
    private getDateFromTimeString;
    private parseValidator;
    private minValidator;
    private maxValidator;
    private compareTime;
    private getValidDateOrNull;
    private setViewValue;
    private updateView;
    private setControl;
    private validatorOnChange;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTimepicker<any>, [null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTimepicker<any>, "input[mcTimepicker]", ["mcTimepicker"], { "placeholder": "placeholder"; "disabled": "disabled"; "id": "id"; "required": "required"; "format": "format"; "min": "min"; "max": "max"; "value": "value"; "mcValidationTooltip": "mcValidationTooltip"; }, { "incorrectInput": "incorrectInput"; }, never>;
}

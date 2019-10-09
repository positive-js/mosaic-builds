import { Platform } from '@angular/cdk/platform';
import { DoCheck, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm, NgModel } from '@angular/forms';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher } from '@ptsecurity/mosaic/core';
import { McFormFieldControl, McFormFieldNumberControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
export declare const BIG_STEP = 10;
export declare const SMALL_STEP = 1;
export declare class McInputBase {
    defaultErrorStateMatcher: ErrorStateMatcher;
    parentForm: NgForm;
    parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(defaultErrorStateMatcher: ErrorStateMatcher, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
export declare const mcInputMixinBase: CanUpdateErrorStateCtor & typeof McInputBase;
export declare class McNumberInput implements McFormFieldNumberControl<any> {
    private _platform;
    private _elementRef;
    private _model;
    /**
     * Implemented as part of McFormFieldNumberControl.
     * @docs-private
     */
    bigStep: number;
    /**
     * Implemented as part of McFormFieldNumberControl.
     * @docs-private
     */
    step: number;
    min: number;
    max: number;
    /**
     * Implemented as part of McFormFieldNumberControl.
     * @docs-private
     */
    value: any;
    /**
     * Implemented as part of McFormFieldNumberControl.
     * @docs-private
     */
    focused: boolean;
    /**
     * Implemented as part of McFormFieldNumberControl.
     * @docs-private
     */
    readonly stateChanges: Subject<void>;
    private readonly host;
    constructor(_platform: Platform, _elementRef: ElementRef, _model: NgModel, step: string, bigStep: string, min: string, max: string);
    focusChanged(isFocused: boolean): void;
    onKeyDown(event: KeyboardEvent): void;
    onPaste(event: any): void;
    stepUp(step: number): void;
    stepDown(step: number): void;
    private normalizeSplitter;
    private isDigit;
    private isFloat;
    private isInt;
}
export declare class McInput extends mcInputMixinBase implements McFormFieldControl<any>, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState {
    protected _elementRef: ElementRef;
    ngControl: NgControl;
    /** An object used to control when error messages are shown. */
    errorStateMatcher: ErrorStateMatcher;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    focused: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    readonly stateChanges: Subject<void>;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    controlType: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    placeholder: string;
    protected uid: string;
    protected previousNativeValue: any;
    protected neverEmptyInputTypes: string[];
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    disabled: boolean;
    protected _disabled: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    id: string;
    protected _id: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    required: boolean;
    protected _required: boolean;
    /** Input type of the element. */
    type: string;
    protected _type: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    value: string;
    private _inputValueAccessor;
    constructor(_elementRef: ElementRef, ngControl: NgControl, parentForm: NgForm, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    /** Focuses the input. */
    focus(): void;
    /** Callback for the cases where the focused state of the input changes. */
    focusChanged(isFocused: boolean): void;
    onInput(): void;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    readonly empty: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    /** Does some manual dirty checking on the native input `value` property. */
    protected dirtyCheckNativeValue(): void;
    /** Make sure the input is a supported type. */
    protected validateType(): void;
    /** Checks whether the input type is one of the types that are never empty. */
    protected isNeverEmpty(): boolean;
    /** Checks whether the input is invalid based on the native validation. */
    protected isBadInput(): boolean;
}
export declare class McInputMono {
}

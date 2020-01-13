import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, DoCheck, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm, NgModel, Validator } from '@angular/forms';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher, McValidationOptions } from '@ptsecurity/mosaic/core';
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
export declare const McInputMixinBase: CanUpdateErrorStateCtor & typeof McInputBase;
export declare class McNumberInput implements McFormFieldNumberControl<any> {
    private platform;
    private elementRef;
    private model;
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
    constructor(platform: Platform, elementRef: ElementRef, model: NgModel, step: string, bigStep: string, min: string, max: string);
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
export declare class McInput extends McInputMixinBase implements McFormFieldControl<any>, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState, AfterContentInit, OnChanges {
    protected elementRef: ElementRef;
    private rawValidators;
    private mcValidation;
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
    private _disabled;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    id: string;
    private _id;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    required: boolean;
    private _required;
    /** Input type of the element. */
    type: string;
    private _type;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    value: string;
    private _inputValueAccessor;
    constructor(elementRef: ElementRef, rawValidators: Validator[], mcValidation: McValidationOptions, ngControl: NgControl, parentForm: NgForm, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any);
    ngAfterContentInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    /** Focuses the input. */
    focus(): void;
    onBlur(): void;
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

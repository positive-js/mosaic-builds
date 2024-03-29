import { AfterContentInit, DoCheck, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { FormControlName, FormGroupDirective, NgControl, NgForm, NgModel, Validator } from '@angular/forms';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher, McValidationOptions } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
import { McNumberInput } from './input-number';
import * as i0 from "@angular/core";
export declare class McInputBase {
    defaultErrorStateMatcher: ErrorStateMatcher;
    parentForm: NgForm;
    parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(defaultErrorStateMatcher: ErrorStateMatcher, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
export declare const McInputMixinBase: CanUpdateErrorStateCtor & typeof McInputBase;
export declare class McInput extends McInputMixinBase implements McFormFieldControl<any>, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState, AfterContentInit, OnChanges {
    protected elementRef: ElementRef;
    rawValidators: Validator[];
    private mcValidation;
    numberInput: McNumberInput;
    ngModel: NgModel;
    formControlName: FormControlName;
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
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
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
    /** Input type of the element. */
    get type(): string;
    set type(value: string);
    private _type;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value(): string;
    set value(value: string);
    private _inputValueAccessor;
    constructor(elementRef: ElementRef, rawValidators: Validator[], mcValidation: McValidationOptions, ngControl: NgControl, numberInput: McNumberInput, ngModel: NgModel, formControlName: FormControlName, parentForm: NgForm, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any);
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
    get empty(): boolean;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<McInput, [null, { optional: true; self: true; }, { optional: true; }, { optional: true; self: true; }, { optional: true; self: true; }, { optional: true; self: true; }, { optional: true; self: true; }, { optional: true; }, { optional: true; }, null, { optional: true; self: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McInput, "input[mcInput]", ["mcInput"], { "errorStateMatcher": "errorStateMatcher"; "placeholder": "placeholder"; "disabled": "disabled"; "id": "id"; "required": "required"; "type": "type"; "value": "value"; }, {}, never>;
}
export declare class McInputMono {
    static ɵfac: i0.ɵɵFactoryDeclaration<McInputMono, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McInputMono, "input[mcInputMonospace]", ["McInputMonospace"], {}, {}, never>;
}

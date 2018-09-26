import { DoCheck, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Platform } from '@ptsecurity/cdk/platform';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
export declare class McInputBase {
    _defaultErrorStateMatcher: ErrorStateMatcher;
    _parentForm: NgForm;
    _parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(_defaultErrorStateMatcher: ErrorStateMatcher, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
export declare const _McInputMixinBase: CanUpdateErrorStateCtor & typeof McInputBase;
export declare class McInput extends _McInputMixinBase implements McFormFieldControl<any>, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState {
    protected _elementRef: ElementRef;
    protected _platform: Platform;
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
    disabled: boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    id: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    placeholder: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    required: boolean;
    /** Input type of the element. */
    type: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    value: string;
    protected _uid: string;
    protected _previousNativeValue: any;
    protected _disabled: boolean;
    protected _id: string;
    protected _required: boolean;
    protected _type: string;
    protected _neverEmptyInputTypes: string[];
    private _inputValueAccessor;
    constructor(_elementRef: ElementRef, _platform: Platform, ngControl: NgControl, _parentForm: NgForm, _parentFormGroup: FormGroupDirective, _defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any);
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    /** Focuses the input. */
    focus(): void;
    /** Callback for the cases where the focused state of the input changes. */
    _focusChanged(isFocused: boolean): void;
    _onInput(): void;
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
    protected _dirtyCheckNativeValue(): void;
    /** Make sure the input is a supported type. */
    protected _validateType(): void;
    /** Checks whether the input type is one of the types that are never empty. */
    protected _isNeverEmpty(): boolean;
    /** Checks whether the input is invalid based on the native validation. */
    protected _isBadInput(): boolean;
}
export declare class McInputMono {
}

import { DoCheck, ElementRef, OnChanges, OnDestroy, InjectionToken, NgZone, OnInit } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
export declare const MC_TEXTAREA_VALUE_ACCESSOR: InjectionToken<{
    value: any;
}>;
export declare class McTextareaBase {
    defaultErrorStateMatcher: ErrorStateMatcher;
    parentForm: NgForm;
    parentFormGroup: FormGroupDirective;
    ngControl: NgControl;
    constructor(defaultErrorStateMatcher: ErrorStateMatcher, parentForm: NgForm, parentFormGroup: FormGroupDirective, ngControl: NgControl);
}
export declare const McTextareaMixinBase: CanUpdateErrorStateCtor & typeof McTextareaBase;
export declare class McTextarea extends McTextareaMixinBase implements McFormFieldControl<any>, OnInit, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState {
    protected elementRef: ElementRef;
    ngControl: NgControl;
    private ngZone;
    canGrow: boolean;
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
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    value: string;
    protected uid: string;
    protected previousNativeValue: any;
    private _disabled;
    private _id;
    private _required;
    private valueAccessor;
    private growSubscription;
    private lineHeight;
    private freeRowsHeight;
    private minHeight;
    constructor(elementRef: ElementRef, ngControl: NgControl, parentForm: NgForm, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any, ngZone: NgZone);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    /** Grow textarea height to avoid vertical scroll  */
    grow(): void;
    /** Focuses the textarea. */
    focus(): void;
    /** Callback for the cases where the focused state of the textarea changes. */
    focusChanged(isFocused: boolean): void;
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
    /** Does some manual dirty checking on the native textarea `value` property. */
    protected dirtyCheckNativeValue(): void;
    /** Checks whether the textarea is invalid based on the native validation. */
    protected isBadInput(): boolean;
    private getGrowHeight;
}

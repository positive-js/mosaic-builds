import { DoCheck, ElementRef, OnChanges, OnDestroy, InjectionToken, NgZone, OnInit, AfterContentInit } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm, NgModel, Validator } from '@angular/forms';
import { CanUpdateErrorState, CanUpdateErrorStateCtor, ErrorStateMatcher, McValidationOptions } from '@ptsecurity/mosaic/core';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
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
export declare class McTextarea extends McTextareaMixinBase implements McFormFieldControl<any>, OnInit, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState, AfterContentInit {
    protected elementRef: ElementRef;
    ngControl: NgControl;
    rawValidators: Validator[];
    private mcValidation;
    ngModel: NgModel;
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
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get id(): string;
    set id(value: string);
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    placeholder: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get required(): boolean;
    set required(value: boolean);
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value(): string;
    set value(value: string);
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
    constructor(elementRef: ElementRef, ngControl: NgControl, parentForm: NgForm, rawValidators: Validator[], mcValidation: McValidationOptions, ngModel: NgModel, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any, ngZone: NgZone);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
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
    get empty(): boolean;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    onContainerClick(): void;
    /** Does some manual dirty checking on the native textarea `value` property. */
    protected dirtyCheckNativeValue(): void;
    /** Checks whether the textarea is invalid based on the native validation. */
    protected isBadInput(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTextarea, [null, { optional: true; self: true; }, { optional: true; }, { optional: true; self: true; }, { optional: true; }, { optional: true; self: true; }, { optional: true; }, null, { optional: true; self: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTextarea, "textarea[mcTextarea]", ["mcTextarea"], { "canGrow": "canGrow"; "errorStateMatcher": "errorStateMatcher"; "disabled": "disabled"; "id": "id"; "placeholder": "placeholder"; "required": "required"; "value": "value"; }, {}, never>;
}

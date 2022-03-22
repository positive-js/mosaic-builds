import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { AfterContentInit, DoCheck, ElementRef, NgZone, OnChanges, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControlName, FormGroupDirective, NgControl, NgForm, NgModel, Validator } from '@angular/forms';
import { CanUpdateErrorState, ErrorStateMatcher, McValidationOptions } from '@ptsecurity/mosaic/core';
import { McFormField, McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { McTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { Subject } from 'rxjs';
import { McInputMixinBase } from './input';
import * as i0 from "@angular/core";
export declare class McPasswordToggle extends McTooltipTrigger implements OnDestroy {
    private focusMonitor;
    private formField;
    get content(): string | TemplateRef<any>;
    set content(content: string | TemplateRef<any>);
    mcTooltipHidden: string | TemplateRef<any>;
    get disabled(): any;
    set disabled(value: any);
    protected _disabled: boolean;
    get tabIndex(): number;
    set tabIndex(value: number);
    private _tabIndex;
    get hidden(): boolean;
    constructor(overlay: Overlay, elementRef: ElementRef, ngZone: NgZone, scrollDispatcher: ScrollDispatcher, hostView: ViewContainerRef, scrollStrategy: any, direction: Directionality, focusMonitor: FocusMonitor, formField: McFormField);
    ngOnDestroy(): void;
    toggle(): void;
    private runFocusMonitor;
    private stopFocusMonitor;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPasswordToggle, [null, null, null, null, null, null, { optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McPasswordToggle, "mc-password-toggle", ["mcPasswordToggle"], { "content": "mcTooltipNotHidden"; "mcTooltipHidden": "mcTooltipHidden"; "disabled": "disabled"; "tabIndex": "tabIndex"; }, {}, never, ["*"]>;
}
export declare class McInputPassword extends McInputMixinBase implements McFormFieldControl<any>, OnChanges, OnDestroy, DoCheck, CanUpdateErrorState, AfterContentInit, OnChanges {
    protected elementRef: ElementRef;
    rawValidators: Validator[];
    private mcValidation;
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
    readonly stateChanges: Subject<any>;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    controlType: string;
    elementType: string;
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    placeholder: string;
    protected uid: string;
    protected previousNativeValue: any;
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
    /**
     * Implemented as part of McFormFieldControl.
     * @docs-private
     */
    get value(): string;
    set value(value: string);
    private _inputValueAccessor;
    constructor(elementRef: ElementRef, rawValidators: Validator[], mcValidation: McValidationOptions, ngControl: NgControl, ngModel: NgModel, formControlName: FormControlName, parentForm: NgForm, parentFormGroup: FormGroupDirective, defaultErrorStateMatcher: ErrorStateMatcher, inputValueAccessor: any);
    ngAfterContentInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    toggleType(): void;
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
    /** Checks whether the input is invalid based on the native validation. */
    protected isBadInput(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<McInputPassword, [null, { optional: true; self: true; }, { optional: true; }, { optional: true; self: true; }, { optional: true; self: true; }, { optional: true; self: true; }, { optional: true; }, { optional: true; }, null, { optional: true; self: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McInputPassword, "input[mcInputPassword]", ["mcInputPassword"], { "errorStateMatcher": "errorStateMatcher"; "placeholder": "placeholder"; "disabled": "disabled"; "id": "id"; "required": "required"; "value": "value"; }, {}, never>;
}

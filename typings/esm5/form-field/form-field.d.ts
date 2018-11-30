import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CanColor, CanColorCtor } from '@ptsecurity/mosaic/core';
import { McCleaner } from './cleaner';
import { McFormFieldControl } from './form-field-control';
import { McFormFieldNumberControl } from './form-field-number-control';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
export declare class McFormFieldBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McFormFieldMixinBase: CanColorCtor & typeof McFormFieldBase;
export declare class McFormField extends _McFormFieldMixinBase implements AfterContentInit, AfterContentChecked, AfterViewInit, CanColor {
    _elementRef: ElementRef;
    private _changeDetectorRef;
    _control: McFormFieldControl<any>;
    _numberControl: McFormFieldNumberControl<any>;
    _stepper: McStepper;
    _hint: QueryList<McHint>;
    _suffix: QueryList<McSuffix>;
    _prefix: QueryList<McPrefix>;
    _cleaner: QueryList<McCleaner>;
    _labelId: string;
    hovered: boolean;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    clearValue($event: any): void;
    onContainerClick($event: any): void;
    onKeyDown(event: KeyboardEvent): void;
    onHoverChanged(isHovered: boolean): void;
    onStepUp(): void;
    onStepDown(): void;
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop: keyof NgControl): boolean;
    /** Throws an error if the form field's control is missing. */
    protected _validateControlChild(): void;
    readonly hasHint: boolean;
    readonly hasSuffix: boolean;
    readonly hasPrefix: boolean;
    readonly hasCleaner: boolean;
    readonly hasStepper: boolean;
    readonly canShowCleaner: boolean;
    readonly disabled: boolean;
    readonly canShowStepper: boolean;
}
export declare class McFormFieldWithoutBorders {
}

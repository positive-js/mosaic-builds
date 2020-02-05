import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CanColor, CanColorCtor } from '@ptsecurity/mosaic/core';
import { McCleaner } from './cleaner';
import { McFormFieldControl } from './form-field-control';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
export declare class McFormFieldBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McFormFieldMixinBase: CanColorCtor & typeof McFormFieldBase;
export declare class McFormField extends McFormFieldMixinBase implements AfterContentInit, AfterContentChecked, AfterViewInit, CanColor {
    _elementRef: ElementRef;
    private _changeDetectorRef;
    control: McFormFieldControl<any>;
    stepper: McStepper;
    cleaner: McCleaner | null;
    hint: QueryList<McHint>;
    suffix: QueryList<McSuffix>;
    prefix: QueryList<McPrefix>;
    connectionContainerRef: ElementRef;
    labelId: string;
    hovered: boolean;
    canCleanerClearByEsc: boolean;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    clearValue($event: any): void;
    onContainerClick($event: any): void;
    onKeyDown(event: KeyboardEvent): void;
    onHoverChanged(isHovered: boolean): void;
    /**
     * Gets an ElementRef for the element that a overlay attached to the form-field should be
     * positioned relative to.
     */
    getConnectedOverlayOrigin(): ElementRef;
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    shouldForward(prop: keyof NgControl): boolean;
    /** Throws an error if the form field's control is missing. */
    protected validateControlChild(): void;
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

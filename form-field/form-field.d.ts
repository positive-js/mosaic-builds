import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CanColor, CanColorCtor } from '@ptsecurity/mosaic/core';
import { McCleaner } from './cleaner';
import { McFormFieldControl } from './form-field-control';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McStepper } from './stepper';
import { McSuffix } from './suffix';
import * as i0 from "@angular/core";
export declare class McFormFieldBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const McFormFieldMixinBase: CanColorCtor & typeof McFormFieldBase;
export declare class McFormField extends McFormFieldMixinBase implements AfterContentInit, AfterContentChecked, AfterViewInit, CanColor, OnDestroy {
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
    private $unsubscribe;
    get hasHint(): boolean;
    get hasSuffix(): boolean;
    get hasPrefix(): boolean;
    get hasCleaner(): boolean;
    get hasStepper(): boolean;
    get canShowCleaner(): boolean;
    get disabled(): boolean;
    get canShowStepper(): boolean;
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
    ngOnDestroy(): void;
    /** Throws an error if the form field's control is missing. */
    protected validateControlChild(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McFormField, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McFormField, "mc-form-field", ["mcFormField"], { "color": "color"; }, {}, ["control", "stepper", "cleaner", "hint", "suffix", "prefix"], ["[mcPrefix]", "*", "[mcSuffix]", "mc-cleaner", "mc-stepper", "mc-hint"]>;
}
export declare class McFormFieldWithoutBorders {
    static ɵfac: i0.ɵɵFactoryDeclaration<McFormFieldWithoutBorders, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McFormFieldWithoutBorders, "mc-form-field[mcFormFieldWithoutBorders]", ["mcFormFieldWithoutBorders"], {}, {}, never>;
}

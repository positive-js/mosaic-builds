import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { CanColor } from '@ptsecurity/mosaic/core';
import { McCleaner } from './cleaner';
import { McFormFieldControl } from './form-field-control';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McSuffix } from './suffix';
export declare class McFormFieldBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare const _McFormFieldMixinBase: import("@ptsecurity/mosaic/core/common-behaviors/constructor").Constructor<CanColor> & typeof McFormFieldBase;
export declare class McFormField extends _McFormFieldMixinBase implements AfterContentInit, AfterContentChecked, AfterViewInit, CanColor {
    _elementRef: ElementRef;
    private _changeDetectorRef;
    _control: McFormFieldControl<any>;
    _hint: QueryList<McHint>;
    _suffix: QueryList<McSuffix>;
    _prefix: QueryList<McPrefix>;
    _cleaner: QueryList<McCleaner>;
    _labelId: string;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    clearValue($event: any): void;
    onContainerClick($event: any): void;
    onKeyDown(e: KeyboardEvent): void;
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop: string): boolean;
    /** Throws an error if the form field's control is missing. */
    protected _validateControlChild(): void;
    readonly hasHint: boolean;
    readonly hasSuffix: boolean;
    readonly hasPrefix: boolean;
    readonly hasCleaner: boolean;
    readonly canShowCleaner: boolean;
}
export declare class McFormFieldWithoutBorders {
}

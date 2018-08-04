import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, QueryList } from '@angular/core';
import { McCleaner } from './cleaner';
import { McFormFieldControl } from './form-field-control';
import { McHint } from './hint';
import { McPrefix } from './prefix';
import { McSuffix } from './suffix';
export declare class McFormFieldBase {
    _elementRef: ElementRef;
    constructor(_elementRef: ElementRef);
}
export declare class McFormField extends McFormFieldBase implements AfterContentInit, AfterContentChecked, AfterViewInit {
    _elementRef: ElementRef;
    private _changeDetectorRef;
    _control: McFormFieldControl<any>;
    _hint: QueryList<McHint>;
    _suffix: QueryList<McSuffix>;
    _prefix: QueryList<McPrefix>;
    _cleaner: QueryList<McCleaner>;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    clearValue($event: any): void;
    onContainerClick($event: any): void;
    /** Determines whether a class from the NgControl should be forwarded to the host element. */
    _shouldForward(prop: string): boolean;
    /** Throws an error if the form field's control is missing. */
    protected _validateControlChild(): void;
    readonly hasHint: boolean;
    readonly hasSuffix: boolean;
    readonly hasPrefix: boolean;
    readonly canShowCleaner: boolean;
}
export declare class McFormFieldWithoutBorders {
}

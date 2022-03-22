import { AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { McFormField } from './form-field';
import * as i0 from "@angular/core";
export declare enum PasswordRules {
    Length = 0,
    UpperLatin = 1,
    LowerLatin = 2,
    Digit = 3,
    SpecialSymbols = 4
}
export declare const regExpPasswordValidator: {
    2: RegExp;
    1: RegExp;
    3: RegExp;
    4: RegExp;
};
export declare class McPasswordHint implements AfterContentInit {
    private changeDetectorRef;
    private formField;
    id: string;
    rule: PasswordRules | any;
    min: number;
    max: number;
    regex: RegExp | null;
    hasError: boolean;
    checked: boolean;
    private checkRule;
    private get control();
    private lastControlValue;
    constructor(changeDetectorRef: ChangeDetectorRef, formField: McFormField);
    ngAfterContentInit(): void;
    private checkValue;
    private checkLengthRule;
    private checkRegexRule;
    private isValueChanged;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPasswordHint, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McPasswordHint, "mc-password-hint", never, { "id": "id"; "rule": "rule"; "min": "min"; "max": "max"; "regex": "regex"; }, {}, never, ["*"]>;
}

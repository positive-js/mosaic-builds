import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Inject, Input } from '@angular/core';
import { McFormField } from './form-field';
import * as i0 from "@angular/core";
import * as i1 from "@ptsecurity/mosaic/icon";
import * as i2 from "@angular/common";
import * as i3 from "./form-field";
let nextPasswordHintUniqueId = 0;
export var PasswordRules;
(function (PasswordRules) {
    PasswordRules[PasswordRules["Length"] = 0] = "Length";
    PasswordRules[PasswordRules["UpperLatin"] = 1] = "UpperLatin";
    PasswordRules[PasswordRules["LowerLatin"] = 2] = "LowerLatin";
    PasswordRules[PasswordRules["Digit"] = 3] = "Digit";
    PasswordRules[PasswordRules["SpecialSymbols"] = 4] = "SpecialSymbols";
})(PasswordRules || (PasswordRules = {}));
export const regExpPasswordValidator = {
    [PasswordRules.LowerLatin]: RegExp(/^(?=.*?[a-z])/),
    [PasswordRules.UpperLatin]: RegExp(/^(?=.*?[A-Z])/),
    [PasswordRules.Digit]: RegExp(/^(?=.*?[0-9])/),
    [PasswordRules.SpecialSymbols]: RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/)
};
export class McPasswordHint {
    constructor(changeDetectorRef, formField) {
        this.changeDetectorRef = changeDetectorRef;
        this.formField = formField;
        this.id = `mc-hint-${nextPasswordHintUniqueId++}`;
        this.hasError = false;
        this.checked = false;
        this.checkValue = () => {
            if (this.control.focused && this.isValueChanged()) {
                this.hasError = false;
                this.checked = this.checkRule(this.control.value);
            }
            else if (!this.control.focused && !this.isValueChanged()) {
                this.hasError = !this.checkRule(this.control.value);
            }
            this.lastControlValue = this.control.value;
            this.changeDetectorRef.markForCheck();
        };
    }
    get control() {
        return this.formField.control;
    }
    ngAfterContentInit() {
        if (this.rule === null) {
            throw Error('You should set [rule] name');
        }
        if (this.rule === PasswordRules.Length && (this.min || this.max) === null) {
            throw Error('For [rule] "Length" need set [min] and [max]');
        }
        if (this.rule === PasswordRules.Length) {
            this.checkRule = this.checkLengthRule;
        }
        else if ([PasswordRules.UpperLatin, PasswordRules.LowerLatin, PasswordRules.Digit, PasswordRules.SpecialSymbols]
            .includes(this.rule)) {
            this.regex = this.regex || regExpPasswordValidator[this.rule];
            this.checkRule = this.checkRegexRule;
        }
        else {
            throw Error(`Unknown [rule]=${this.rule}`);
        }
        this.formField.control.stateChanges
            .subscribe(this.checkValue);
    }
    checkLengthRule(value) {
        return value.length >= this.min && value.length <= this.max;
    }
    checkRegexRule(value) {
        return !!this.regex?.test(value);
    }
    isValueChanged() {
        return this.lastControlValue !== this.formField.control.value;
    }
}
/** @nocollapse */ /** @nocollapse */ McPasswordHint.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPasswordHint, deps: [{ token: i0.ChangeDetectorRef }, { token: forwardRef(() => McFormField) }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McPasswordHint.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McPasswordHint, selector: "mc-password-hint", inputs: { id: "id", rule: "rule", min: "min", max: "max", regex: "regex" }, host: { properties: { "class.mc-password-hint_valid": "checked", "class.mc-password-hint_invalid": "hasError", "attr.id": "id" }, classAttribute: "mc-password-hint" }, ngImport: i0, template: `
        <i *ngIf="!checked" class="mc-password-hint__icon" mc-icon="mc-close-M_16"></i>
        <i *ngIf="checked" class="mc-password-hint__icon" mc-icon="mc-check_16"></i>

        <span class="mc-password-hint__text">
            <ng-content></ng-content>
        </span>
    `, isInline: true, components: [{ type: i1.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPasswordHint, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-password-hint',
                    template: `
        <i *ngIf="!checked" class="mc-password-hint__icon" mc-icon="mc-close-M_16"></i>
        <i *ngIf="checked" class="mc-password-hint__icon" mc-icon="mc-check_16"></i>

        <span class="mc-password-hint__text">
            <ng-content></ng-content>
        </span>
    `,
                    host: {
                        class: 'mc-password-hint',
                        '[class.mc-password-hint_valid]': 'checked',
                        '[class.mc-password-hint_invalid]': 'hasError',
                        '[attr.id]': 'id'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i3.McFormField, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McFormField)]
                }] }]; }, propDecorators: { id: [{
                type: Input
            }], rule: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], regex: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL3Bhc3N3b3JkLWhpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7O0FBRzNDLElBQUksd0JBQXdCLEdBQUcsQ0FBQyxDQUFDO0FBRWpDLE1BQU0sQ0FBTixJQUFZLGFBTVg7QUFORCxXQUFZLGFBQWE7SUFDckIscURBQU0sQ0FBQTtJQUNOLDZEQUFVLENBQUE7SUFDViw2REFBVSxDQUFBO0lBQ1YsbURBQUssQ0FBQTtJQUNMLHFFQUFjLENBQUE7QUFDbEIsQ0FBQyxFQU5XLGFBQWEsS0FBYixhQUFhLFFBTXhCO0FBRUQsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUc7SUFDbkMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUNuRCxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ25ELENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDOUMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxDQUFDLCtDQUErQyxDQUFDO0NBQzFGLENBQUM7QUFxQkYsTUFBTSxPQUFPLGNBQWM7SUFvQnZCLFlBQ1ksaUJBQW9DLEVBQ0csU0FBc0I7UUFEN0Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNHLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFyQmhFLE9BQUUsR0FBVyxXQUFXLHdCQUF3QixFQUFFLEVBQUUsQ0FB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QWhCYjs7Ozs7OztLQU9UOzJGQVNRLGNBQWM7a0JBbEIxQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRTs7Ozs7OztLQU9UO29CQUNELElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsa0JBQWtCO3dCQUN6QixnQ0FBZ0MsRUFBRSxTQUFTO3dCQUMzQyxrQ0FBa0MsRUFBRSxVQUFVO3dCQUM5QyxXQUFXLEVBQUUsSUFBSTtxQkFDcEI7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzswQkF1QlEsTUFBTTsyQkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDOzRDQXJCaEMsRUFBRTtzQkFBVixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1jRm9ybUZpZWxkIH0gZnJvbSAnLi9mb3JtLWZpZWxkJztcblxuXG5sZXQgbmV4dFBhc3N3b3JkSGludFVuaXF1ZUlkID0gMDtcblxuZXhwb3J0IGVudW0gUGFzc3dvcmRSdWxlcyB7XG4gICAgTGVuZ3RoLFxuICAgIFVwcGVyTGF0aW4sXG4gICAgTG93ZXJMYXRpbixcbiAgICBEaWdpdCxcbiAgICBTcGVjaWFsU3ltYm9sc1xufVxuXG5leHBvcnQgY29uc3QgcmVnRXhwUGFzc3dvcmRWYWxpZGF0b3IgPSB7XG4gICAgW1Bhc3N3b3JkUnVsZXMuTG93ZXJMYXRpbl06IFJlZ0V4cCgvXig/PS4qP1thLXpdKS8pLFxuICAgIFtQYXNzd29yZFJ1bGVzLlVwcGVyTGF0aW5dOiBSZWdFeHAoL14oPz0uKj9bQS1aXSkvKSxcbiAgICBbUGFzc3dvcmRSdWxlcy5EaWdpdF06IFJlZ0V4cCgvXig/PS4qP1swLTldKS8pLFxuICAgIFtQYXNzd29yZFJ1bGVzLlNwZWNpYWxTeW1ib2xzXTogUmVnRXhwKC9eKD89Lio/W1wiICFcIiMkJSYnKCkqKywtLi86Ozw9Pj9AW1xcXV5fYHt8fX5cIl0pLylcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wYXNzd29yZC1oaW50JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aSAqbmdJZj1cIiFjaGVja2VkXCIgY2xhc3M9XCJtYy1wYXNzd29yZC1oaW50X19pY29uXCIgbWMtaWNvbj1cIm1jLWNsb3NlLU1fMTZcIj48L2k+XG4gICAgICAgIDxpICpuZ0lmPVwiY2hlY2tlZFwiIGNsYXNzPVwibWMtcGFzc3dvcmQtaGludF9faWNvblwiIG1jLWljb249XCJtYy1jaGVja18xNlwiPjwvaT5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1jLXBhc3N3b3JkLWhpbnRfX3RleHRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXBhc3N3b3JkLWhpbnQnLFxuICAgICAgICAnW2NsYXNzLm1jLXBhc3N3b3JkLWhpbnRfdmFsaWRdJzogJ2NoZWNrZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLXBhc3N3b3JkLWhpbnRfaW52YWxpZF0nOiAnaGFzRXJyb3InLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNQYXNzd29yZEhpbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLWhpbnQtJHtuZXh0UGFzc3dvcmRIaW50VW5pcXVlSWQrK31gO1xuXG4gICAgQElucHV0KCkgcnVsZTogUGFzc3dvcmRSdWxlcyB8IGFueTtcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHJlZ2V4OiBSZWdFeHAgfCBudWxsO1xuXG4gICAgaGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGNoZWNrUnVsZTogKHZhbHVlOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGdldCBjb250cm9sKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRmllbGQuY29udHJvbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxhc3RDb250cm9sVmFsdWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jRm9ybUZpZWxkKSkgcHJpdmF0ZSBmb3JtRmllbGQ6IE1jRm9ybUZpZWxkXG4gICAgKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ydWxlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignWW91IHNob3VsZCBzZXQgW3J1bGVdIG5hbWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJ1bGUgPT09IFBhc3N3b3JkUnVsZXMuTGVuZ3RoICYmICh0aGlzLm1pbiB8fCB0aGlzLm1heCkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdGb3IgW3J1bGVdIFwiTGVuZ3RoXCIgbmVlZCBzZXQgW21pbl0gYW5kIFttYXhdJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ydWxlID09PSBQYXNzd29yZFJ1bGVzLkxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1J1bGUgPSB0aGlzLmNoZWNrTGVuZ3RoUnVsZTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIFtQYXNzd29yZFJ1bGVzLlVwcGVyTGF0aW4sIFBhc3N3b3JkUnVsZXMuTG93ZXJMYXRpbiwgUGFzc3dvcmRSdWxlcy5EaWdpdCwgUGFzc3dvcmRSdWxlcy5TcGVjaWFsU3ltYm9sc11cbiAgICAgICAgICAgICAgICAuaW5jbHVkZXModGhpcy5ydWxlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMucmVnZXggPSB0aGlzLnJlZ2V4IHx8IHJlZ0V4cFBhc3N3b3JkVmFsaWRhdG9yW3RoaXMucnVsZV07XG4gICAgICAgICAgICB0aGlzLmNoZWNrUnVsZSA9IHRoaXMuY2hlY2tSZWdleFJ1bGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biBbcnVsZV09JHt0aGlzLnJ1bGV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm1GaWVsZC5jb250cm9sLnN0YXRlQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLmNoZWNrVmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tWYWx1ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbC5mb2N1c2VkICYmIHRoaXMuaXNWYWx1ZUNoYW5nZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5oYXNFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmNoZWNrUnVsZSh0aGlzLmNvbnRyb2wudmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmNvbnRyb2wuZm9jdXNlZCAmJiAhdGhpcy5pc1ZhbHVlQ2hhbmdlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gIXRoaXMuY2hlY2tSdWxlKHRoaXMuY29udHJvbC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RDb250cm9sVmFsdWUgPSB0aGlzLmNvbnRyb2wudmFsdWU7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0xlbmd0aFJ1bGUodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID49IHRoaXMubWluICYmIHZhbHVlLmxlbmd0aCA8PSB0aGlzLm1heDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrUmVnZXhSdWxlKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5yZWdleD8udGVzdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZhbHVlQ2hhbmdlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdENvbnRyb2xWYWx1ZSAhPT0gdGhpcy5mb3JtRmllbGQuY29udHJvbC52YWx1ZTtcbiAgICB9XG59XG4iXX0=
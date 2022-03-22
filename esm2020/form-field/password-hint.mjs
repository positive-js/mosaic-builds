import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { McFormField } from './form-field';
import * as i0 from "@angular/core";
import * as i1 from "./form-field";
import * as i2 from "@ptsecurity/mosaic/icon";
import * as i3 from "@angular/common";
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
/** @nocollapse */ /** @nocollapse */ McPasswordHint.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPasswordHint, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.McFormField }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McPasswordHint.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McPasswordHint, selector: "mc-password-hint", inputs: { id: "id", rule: "rule", min: "min", max: "max", regex: "regex" }, host: { properties: { "class.mc-password-hint_valid": "checked", "class.mc-password-hint_invalid": "hasError", "attr.id": "id" }, classAttribute: "mc-password-hint" }, ngImport: i0, template: `
        <i *ngIf="!checked" class="mc-password-hint__icon" mc-icon="mc-close-M_16"></i>
        <i *ngIf="checked" class="mc-password-hint__icon" mc-icon="mc-check_16"></i>

        <span class="mc-password-hint__text">
            <ng-content></ng-content>
        </span>
    `, isInline: true, components: [{ type: i2.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.McFormField }]; }, propDecorators: { id: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL3Bhc3N3b3JkLWhpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDUixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQUczQyxJQUFJLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQUVqQyxNQUFNLENBQU4sSUFBWSxhQU1YO0FBTkQsV0FBWSxhQUFhO0lBQ3JCLHFEQUFNLENBQUE7SUFDTiw2REFBVSxDQUFBO0lBQ1YsNkRBQVUsQ0FBQTtJQUNWLG1EQUFLLENBQUE7SUFDTCxxRUFBYyxDQUFBO0FBQ2xCLENBQUMsRUFOVyxhQUFhLEtBQWIsYUFBYSxRQU14QjtBQUVELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHO0lBQ25DLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDbkQsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUNuRCxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQzlDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sQ0FBQywrQ0FBK0MsQ0FBQztDQUMxRixDQUFDO0FBcUJGLE1BQU0sT0FBTyxjQUFjO0lBb0J2QixZQUFvQixpQkFBb0MsRUFBVSxTQUFzQjtRQUFwRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQW5CL0UsT0FBRSxHQUFXLFdBQVcsd0JBQXdCLEVBQUUsRUFBRSxDQUFDO1FBUTlELGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQXFDakIsZUFBVSxHQUFHLEdBQUcsRUFBRTtZQUN0QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2RDtZQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFBO0lBdEMwRixDQUFDO0lBTjVGLElBQVksT0FBTztRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDbEMsQ0FBQztJQU1ELGtCQUFrQjtRQUNkLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUM3QztRQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZFLE1BQU0sS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDekM7YUFBTSxJQUNILENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLGNBQWMsQ0FBQzthQUNsRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUMxQjtZQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3hDO2FBQU07WUFDSCxNQUFNLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZO2FBQzlCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQWVPLGVBQWUsQ0FBQyxLQUFhO1FBQ2pDLE9BQU8sS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNoRSxDQUFDO0lBRU8sY0FBYyxDQUFDLEtBQWE7UUFDaEMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLGNBQWM7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2xFLENBQUM7O2lKQXRFUSxjQUFjO3FJQUFkLGNBQWMsNFNBaEJiOzs7Ozs7O0tBT1Q7MkZBU1EsY0FBYztrQkFsQjFCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7Ozs7O0tBT1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxrQkFBa0I7d0JBQ3pCLGdDQUFnQyxFQUFFLFNBQVM7d0JBQzNDLGtDQUFrQyxFQUFFLFVBQVU7d0JBQzlDLFdBQVcsRUFBRSxJQUFJO3FCQUNwQjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDbEQ7a0lBRVksRUFBRTtzQkFBVixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1jRm9ybUZpZWxkIH0gZnJvbSAnLi9mb3JtLWZpZWxkJztcblxuXG5sZXQgbmV4dFBhc3N3b3JkSGludFVuaXF1ZUlkID0gMDtcblxuZXhwb3J0IGVudW0gUGFzc3dvcmRSdWxlcyB7XG4gICAgTGVuZ3RoLFxuICAgIFVwcGVyTGF0aW4sXG4gICAgTG93ZXJMYXRpbixcbiAgICBEaWdpdCxcbiAgICBTcGVjaWFsU3ltYm9sc1xufVxuXG5leHBvcnQgY29uc3QgcmVnRXhwUGFzc3dvcmRWYWxpZGF0b3IgPSB7XG4gICAgW1Bhc3N3b3JkUnVsZXMuTG93ZXJMYXRpbl06IFJlZ0V4cCgvXig/PS4qP1thLXpdKS8pLFxuICAgIFtQYXNzd29yZFJ1bGVzLlVwcGVyTGF0aW5dOiBSZWdFeHAoL14oPz0uKj9bQS1aXSkvKSxcbiAgICBbUGFzc3dvcmRSdWxlcy5EaWdpdF06IFJlZ0V4cCgvXig/PS4qP1swLTldKS8pLFxuICAgIFtQYXNzd29yZFJ1bGVzLlNwZWNpYWxTeW1ib2xzXTogUmVnRXhwKC9eKD89Lio/W1wiICFcIiMkJSYnKCkqKywtLi86Ozw9Pj9AW1xcXV5fYHt8fX5cIl0pLylcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wYXNzd29yZC1oaW50JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aSAqbmdJZj1cIiFjaGVja2VkXCIgY2xhc3M9XCJtYy1wYXNzd29yZC1oaW50X19pY29uXCIgbWMtaWNvbj1cIm1jLWNsb3NlLU1fMTZcIj48L2k+XG4gICAgICAgIDxpICpuZ0lmPVwiY2hlY2tlZFwiIGNsYXNzPVwibWMtcGFzc3dvcmQtaGludF9faWNvblwiIG1jLWljb249XCJtYy1jaGVja18xNlwiPjwvaT5cblxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1jLXBhc3N3b3JkLWhpbnRfX3RleHRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXBhc3N3b3JkLWhpbnQnLFxuICAgICAgICAnW2NsYXNzLm1jLXBhc3N3b3JkLWhpbnRfdmFsaWRdJzogJ2NoZWNrZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLXBhc3N3b3JkLWhpbnRfaW52YWxpZF0nOiAnaGFzRXJyb3InLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNQYXNzd29yZEhpbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLWhpbnQtJHtuZXh0UGFzc3dvcmRIaW50VW5pcXVlSWQrK31gO1xuXG4gICAgQElucHV0KCkgcnVsZTogUGFzc3dvcmRSdWxlcyB8IGFueTtcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHJlZ2V4OiBSZWdFeHAgfCBudWxsO1xuXG4gICAgaGFzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGNoZWNrUnVsZTogKHZhbHVlOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGdldCBjb250cm9sKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRmllbGQuY29udHJvbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxhc3RDb250cm9sVmFsdWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGZvcm1GaWVsZDogTWNGb3JtRmllbGQpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJ1bGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdZb3Ugc2hvdWxkIHNldCBbcnVsZV0gbmFtZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucnVsZSA9PT0gUGFzc3dvcmRSdWxlcy5MZW5ndGggJiYgKHRoaXMubWluIHx8IHRoaXMubWF4KSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ZvciBbcnVsZV0gXCJMZW5ndGhcIiBuZWVkIHNldCBbbWluXSBhbmQgW21heF0nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJ1bGUgPT09IFBhc3N3b3JkUnVsZXMuTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrUnVsZSA9IHRoaXMuY2hlY2tMZW5ndGhSdWxlO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgW1Bhc3N3b3JkUnVsZXMuVXBwZXJMYXRpbiwgUGFzc3dvcmRSdWxlcy5Mb3dlckxhdGluLCBQYXNzd29yZFJ1bGVzLkRpZ2l0LCBQYXNzd29yZFJ1bGVzLlNwZWNpYWxTeW1ib2xzXVxuICAgICAgICAgICAgICAgIC5pbmNsdWRlcyh0aGlzLnJ1bGUpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5yZWdleCA9IHRoaXMucmVnZXggfHwgcmVnRXhwUGFzc3dvcmRWYWxpZGF0b3JbdGhpcy5ydWxlXTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tSdWxlID0gdGhpcy5jaGVja1JlZ2V4UnVsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIFtydWxlXT0ke3RoaXMucnVsZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9ybUZpZWxkLmNvbnRyb2wuc3RhdGVDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuY2hlY2tWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja1ZhbHVlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sLmZvY3VzZWQgJiYgdGhpcy5pc1ZhbHVlQ2hhbmdlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuY2hlY2tSdWxlKHRoaXMuY29udHJvbC52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuY29udHJvbC5mb2N1c2VkICYmICF0aGlzLmlzVmFsdWVDaGFuZ2VkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSAhdGhpcy5jaGVja1J1bGUodGhpcy5jb250cm9sLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdENvbnRyb2xWYWx1ZSA9IHRoaXMuY29udHJvbC52YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrTGVuZ3RoUnVsZSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPj0gdGhpcy5taW4gJiYgdmFsdWUubGVuZ3RoIDw9IHRoaXMubWF4O1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tSZWdleFJ1bGUodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnJlZ2V4Py50ZXN0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVmFsdWVDaGFuZ2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0Q29udHJvbFZhbHVlICE9PSB0aGlzLmZvcm1GaWVsZC5jb250cm9sLnZhbHVlO1xuICAgIH1cbn1cbiJdfQ==
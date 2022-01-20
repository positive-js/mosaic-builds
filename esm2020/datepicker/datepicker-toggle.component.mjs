import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { McButton } from '@ptsecurity/mosaic/button';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { McDatepickerIntl } from './datepicker-intl';
import { McDatepicker } from './datepicker.component';
import * as i0 from "@angular/core";
import * as i1 from "./datepicker-intl";
import * as i2 from "@ptsecurity/mosaic/button";
import * as i3 from "@ptsecurity/mosaic/icon";
import * as i4 from "@angular/common";
/** Can be used to override the icon of a `mcDatepickerToggle`. */
export class McDatepickerToggleIcon {
}
/** @nocollapse */ /** @nocollapse */ McDatepickerToggleIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McDatepickerToggleIcon, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McDatepickerToggleIcon.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McDatepickerToggleIcon, selector: "[mcDatepickerToggleIcon]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McDatepickerToggleIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcDatepickerToggleIcon]'
                }]
        }] });
export class McDatepickerToggle {
    constructor(intl, changeDetectorRef) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.stateChanges = Subscription.EMPTY;
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        return this._disabled === undefined ? this.datepicker.disabled : this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    }
    ngOnDestroy() {
        this.stateChanges.unsubscribe();
    }
    ngAfterContentInit() {
        this.watchStateChanges();
    }
    open(event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
    watchStateChanges() {
        const datepickerDisabled = this.datepicker ? this.datepicker.disabledChange : observableOf();
        const inputDisabled = this.datepicker && this.datepicker.datepickerInput ?
            this.datepicker.datepickerInput.disabledChange : observableOf();
        const datepickerToggled = this.datepicker ?
            merge(this.datepicker.openedStream, this.datepicker.closedStream) :
            observableOf();
        this.stateChanges.unsubscribe();
        this.stateChanges = merge(this.intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe(() => this.changeDetectorRef.markForCheck());
    }
}
/** @nocollapse */ /** @nocollapse */ McDatepickerToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McDatepickerToggle, deps: [{ token: i1.McDatepickerIntl }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDatepickerToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McDatepickerToggle, selector: "mc-datepicker-toggle", inputs: { disabled: "disabled", datepicker: ["for", "datepicker"], tabIndex: "tabIndex" }, host: { properties: { "class.mc-active": "datepicker && datepicker.opened" }, classAttribute: "mc-datepicker-toggle" }, queries: [{ propertyName: "customIcon", first: true, predicate: McDatepickerToggleIcon, descendants: true }], viewQueries: [{ propertyName: "button", first: true, predicate: ["button"], descendants: true }], exportAs: ["mcDatepickerToggle"], usesOnChanges: true, ngImport: i0, template: "<!--todo need simplify this-->\n<button\n    #button\n    mc-button\n    type=\"button\"\n    class=\"mc-datepicker-toggle__button\"\n    aria-haspopup=\"true\"\n    [attr.aria-label]=\"intl.openCalendarLabel\"\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    (click)=\"open($event)\">\n\n    <i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i>\n\n    <ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content>\n</button>\n", styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{width:30px;width:var(--mc-datepicker-toggle-size-width, 30px);height:30px;height:var(--mc-datepicker-toggle-size-height, 30px);margin-left:2px}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;width:1.5em;height:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}\n"], components: [{ type: i2.McButton, selector: "[mc-button]", inputs: ["color", "tabIndex", "disabled"] }, { type: i3.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i2.McButtonCssStyler, selector: "[mc-button]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McDatepickerToggle, decorators: [{
            type: Component,
            args: [{ selector: 'mc-datepicker-toggle', host: {
                        class: 'mc-datepicker-toggle',
                        '[class.mc-active]': 'datepicker && datepicker.opened'
                    }, exportAs: 'mcDatepickerToggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<!--todo need simplify this-->\n<button\n    #button\n    mc-button\n    type=\"button\"\n    class=\"mc-datepicker-toggle__button\"\n    aria-haspopup=\"true\"\n    [attr.aria-label]=\"intl.openCalendarLabel\"\n    [tabIndex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    (click)=\"open($event)\">\n\n    <i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i>\n\n    <ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content>\n</button>\n", styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{width:30px;width:var(--mc-datepicker-toggle-size-width, 30px);height:30px;height:var(--mc-datepicker-toggle-size-height, 30px);margin-left:2px}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;width:1.5em;height:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.McDatepickerIntl }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], datepicker: [{
                type: Input,
                args: ['for']
            }], tabIndex: [{
                type: Input
            }], customIcon: [{
                type: ContentChild,
                args: [McDatepickerToggleIcon, { static: false }]
            }], button: [{
                type: ViewChild,
                args: ['button', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci10b2dnbGUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxLQUFLLEVBSUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7OztBQUd0RCxrRUFBa0U7QUFJbEUsTUFBTSxPQUFPLHNCQUFzQjs7eUpBQXRCLHNCQUFzQjs2SUFBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBSGxDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtpQkFDdkM7O0FBZ0JELE1BQU0sT0FBTyxrQkFBa0I7SUEwQjNCLFlBQW1CLElBQXNCLEVBQVUsaUJBQW9DO1FBQXBFLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUovRSxpQkFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFJZ0QsQ0FBQztJQXpCM0YsNkNBQTZDO0lBQzdDLElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQW1CRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQVk7UUFDYixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQjtRQUNyQixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUU3RixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwRSxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ25FLFlBQVksRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNqQixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLGlCQUFpQixDQUNwQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDOztxSkFuRVEsa0JBQWtCO3lJQUFsQixrQkFBa0IsdVRBa0JiLHNCQUFzQix5TUMzRHhDLDRlQWdCQTsyRkR5QmEsa0JBQWtCO2tCQVo5QixTQUFTOytCQUNJLHNCQUFzQixRQUcxQjt3QkFDRixLQUFLLEVBQUUsc0JBQXNCO3dCQUM3QixtQkFBbUIsRUFBRSxpQ0FBaUM7cUJBQ3pELFlBQ1Msb0JBQW9CLGlCQUNmLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07dUlBSzNDLFFBQVE7c0JBRFgsS0FBSztnQkFVUSxVQUFVO3NCQUF2QixLQUFLO3VCQUFDLEtBQUs7Z0JBR0gsUUFBUTtzQkFBaEIsS0FBSztnQkFHbUQsVUFBVTtzQkFBbEUsWUFBWTt1QkFBQyxzQkFBc0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBR2YsTUFBTTtzQkFBN0MsU0FBUzt1QkFBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNCdXR0b24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcbmltcG9ydCB7IG1lcmdlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5cblxuLyoqIENhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBpY29uIG9mIGEgYG1jRGF0ZXBpY2tlclRvZ2dsZWAuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY0RhdGVwaWNrZXJUb2dnbGVJY29uXSdcbn0pXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VyVG9nZ2xlSWNvbiB7fVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZGF0ZXBpY2tlci10b2dnbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnZGF0ZXBpY2tlci10b2dnbGUuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2RhdGVwaWNrZXItdG9nZ2xlLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZGF0ZXBpY2tlci10b2dnbGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnZGF0ZXBpY2tlciAmJiBkYXRlcGlja2VyLm9wZW5lZCdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNEYXRlcGlja2VyVG9nZ2xlJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlclRvZ2dsZTxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmRhdGVwaWNrZXIuZGlzYWJsZWQgOiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBEYXRlcGlja2VyIGluc3RhbmNlIHRoYXQgdGhlIGJ1dHRvbiB3aWxsIHRvZ2dsZS4gKi9cbiAgICBASW5wdXQoJ2ZvcicpIGRhdGVwaWNrZXI6IE1jRGF0ZXBpY2tlcjxEPjtcblxuICAgIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyIHwgbnVsbDtcblxuICAgIC8qKiBDdXN0b20gaWNvbiBzZXQgYnkgdGhlIGNvbnN1bWVyLiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNEYXRlcGlja2VyVG9nZ2xlSWNvbiwgeyBzdGF0aWM6IGZhbHNlIH0pIGN1c3RvbUljb246IE1jRGF0ZXBpY2tlclRvZ2dsZUljb247XG5cbiAgICAvKiogVW5kZXJseWluZyBidXR0b24gZWxlbWVudC4gKi9cbiAgICBAVmlld0NoaWxkKCdidXR0b24nLCB7IHN0YXRpYzogZmFsc2UgfSkgYnV0dG9uOiBNY0J1dHRvbjtcbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGludGw6IE1jRGF0ZXBpY2tlckludGwsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5kYXRlcGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvcGVuKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRlcGlja2VyICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIub3BlbigpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHdhdGNoU3RhdGVDaGFuZ2VzKCkge1xuICAgICAgICBjb25zdCBkYXRlcGlja2VyRGlzYWJsZWQgPSB0aGlzLmRhdGVwaWNrZXIgPyB0aGlzLmRhdGVwaWNrZXIuZGlzYWJsZWRDaGFuZ2UgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICBjb25zdCBpbnB1dERpc2FibGVkID0gdGhpcy5kYXRlcGlja2VyICYmIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VySW5wdXQgP1xuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXJJbnB1dC5kaXNhYmxlZENoYW5nZSA6IG9ic2VydmFibGVPZigpO1xuXG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXJUb2dnbGVkID0gdGhpcy5kYXRlcGlja2VyID9cbiAgICAgICAgICAgIG1lcmdlKHRoaXMuZGF0ZXBpY2tlci5vcGVuZWRTdHJlYW0sIHRoaXMuZGF0ZXBpY2tlci5jbG9zZWRTdHJlYW0pIDpcbiAgICAgICAgICAgIG9ic2VydmFibGVPZigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMgPSBtZXJnZShcbiAgICAgICAgICAgIHRoaXMuaW50bC5jaGFuZ2VzLFxuICAgICAgICAgICAgZGF0ZXBpY2tlckRpc2FibGVkLFxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCxcbiAgICAgICAgICAgIGRhdGVwaWNrZXJUb2dnbGVkXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cbn1cbiIsIjwhLS10b2RvIG5lZWQgc2ltcGxpZnkgdGhpcy0tPlxuPGJ1dHRvblxuICAgICNidXR0b25cbiAgICBtYy1idXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cIm1jLWRhdGVwaWNrZXItdG9nZ2xlX19idXR0b25cIlxuICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImludGwub3BlbkNhbGVuZGFyTGFiZWxcIlxuICAgIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAoY2xpY2spPVwib3BlbigkZXZlbnQpXCI+XG5cbiAgICA8aSAqbmdJZj1cIiFjdXN0b21JY29uXCIgbWMtaWNvbj1cIm1jLWNhbGVuZGFyXzE2XCIgY2xhc3M9XCJtYy1kYXRlcGlja2VyLXRvZ2dsZV9fZGVmYXVsdC1pY29uXCI+PC9pPlxuXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jRGF0ZXBpY2tlclRvZ2dsZUljb25dXCI+PC9uZy1jb250ZW50PlxuPC9idXR0b24+XG4iXX0=
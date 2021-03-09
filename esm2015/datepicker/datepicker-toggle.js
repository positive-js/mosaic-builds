import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { McButton } from '@ptsecurity/mosaic/button';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { McDatepicker } from './datepicker';
import { McDatepickerIntl } from './datepicker-intl';
/** Can be used to override the icon of a `mcDatepickerToggle`. */
export class McDatepickerToggleIcon {
}
McDatepickerToggleIcon.decorators = [
    { type: Directive, args: [{
                selector: '[mcDatepickerToggleIcon]'
            },] }
];
export class McDatepickerToggle {
    constructor(intl, changeDetectorRef) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.stateChanges = Subscription.EMPTY;
    }
    /** Whether the toggle button is disabled. */
    get disabled() {
        return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
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
McDatepickerToggle.decorators = [
    { type: Component, args: [{
                selector: 'mc-datepicker-toggle',
                template: "<button\n    #button\n    mc-button\n    type=\"button\"\n    class=\"mc-datepicker-toggle__button\"\n    aria-haspopup=\"true\"\n    [attr.aria-label]=\"intl.openCalendarLabel\"\n    [attr.tabindex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    (click)=\"open($event)\">\n\n    <i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i>\n\n    <ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content>\n</button>\n",
                host: {
                    class: 'mc-datepicker-toggle',
                    '[class.mc-active]': 'datepicker && datepicker.opened'
                },
                exportAs: 'mcDatepickerToggle',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{width:var(--mc-datepicker-toggle-size-width,30px);height:var(--mc-datepicker-toggle-size-height,30px);margin-left:2px}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;width:1.5em;height:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}"]
            },] }
];
/** @nocollapse */
McDatepickerToggle.ctorParameters = () => [
    { type: McDatepickerIntl },
    { type: ChangeDetectorRef }
];
McDatepickerToggle.propDecorators = {
    disabled: [{ type: Input }],
    datepicker: [{ type: Input, args: ['for',] }],
    tabIndex: [{ type: Input }],
    customIcon: [{ type: ContentChild, args: [McDatepickerToggleIcon, { static: false },] }],
    button: [{ type: ViewChild, args: ['button', { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLXRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxLQUFLLEVBSUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR3JELGtFQUFrRTtBQUlsRSxNQUFNLE9BQU8sc0JBQXNCOzs7WUFIbEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7YUFDdkM7O0FBZ0JELE1BQU0sT0FBTyxrQkFBa0I7SUEyQjNCLFlBQW1CLElBQXNCLEVBQVUsaUJBQW9DO1FBQXBFLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUovRSxpQkFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFJZ0QsQ0FBQztJQXpCM0YsNkNBQTZDO0lBQzdDLElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN0RixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFtQkQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFZO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0YsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNuRSxZQUFZLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDakIsa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixpQkFBaUIsQ0FDcEIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBN0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQywyZEFBcUM7Z0JBRXJDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsc0JBQXNCO29CQUM3QixtQkFBbUIsRUFBRSxpQ0FBaUM7aUJBQ3pEO2dCQUNELFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7WUFyQlEsZ0JBQWdCO1lBZnJCLGlCQUFpQjs7O3VCQXdDaEIsS0FBSzt5QkFVTCxLQUFLLFNBQUMsS0FBSzt1QkFHWCxLQUFLO3lCQUdMLFlBQVksU0FBQyxzQkFBc0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7cUJBR3BELFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNCdXR0b24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcbmltcG9ydCB7IG1lcmdlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY0RhdGVwaWNrZXIgfSBmcm9tICcuL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VySW50bCB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnRsJztcblxuXG4vKiogQ2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGljb24gb2YgYSBgbWNEYXRlcGlja2VyVG9nZ2xlYC4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jRGF0ZXBpY2tlclRvZ2dsZUljb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXJUb2dnbGVJY29uIHt9XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kYXRlcGlja2VyLXRvZ2dsZScsXG4gICAgdGVtcGxhdGVVcmw6ICdkYXRlcGlja2VyLXRvZ2dsZS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci10b2dnbGUuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1kYXRlcGlja2VyLXRvZ2dsZScsXG4gICAgICAgICdbY2xhc3MubWMtYWN0aXZlXSc6ICdkYXRlcGlja2VyICYmIGRhdGVwaWNrZXIub3BlbmVkJ1xuICAgIH0sXG4gICAgZXhwb3J0QXM6ICdtY0RhdGVwaWNrZXJUb2dnbGUnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VyVG9nZ2xlPEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRvZ2dsZSBidXR0b24gaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5kYXRlcGlja2VyLmRpc2FibGVkIDogISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBEYXRlcGlja2VyIGluc3RhbmNlIHRoYXQgdGhlIGJ1dHRvbiB3aWxsIHRvZ2dsZS4gKi9cbiAgICBASW5wdXQoJ2ZvcicpIGRhdGVwaWNrZXI6IE1jRGF0ZXBpY2tlcjxEPjtcblxuICAgIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyIHwgbnVsbDtcblxuICAgIC8qKiBDdXN0b20gaWNvbiBzZXQgYnkgdGhlIGNvbnN1bWVyLiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNEYXRlcGlja2VyVG9nZ2xlSWNvbiwge3N0YXRpYzogZmFsc2V9KSBjdXN0b21JY29uOiBNY0RhdGVwaWNrZXJUb2dnbGVJY29uO1xuXG4gICAgLyoqIFVuZGVybHlpbmcgYnV0dG9uIGVsZW1lbnQuICovXG4gICAgQFZpZXdDaGlsZCgnYnV0dG9uJywge3N0YXRpYzogZmFsc2V9KSBidXR0b246IE1jQnV0dG9uO1xuICAgIHByaXZhdGUgc3RhdGVDaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW50bDogTWNEYXRlcGlja2VySW50bCwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmRhdGVwaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy53YXRjaFN0YXRlQ2hhbmdlcygpO1xuICAgIH1cblxuICAgIG9wZW4oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGVwaWNrZXIgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5vcGVuKCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgd2F0Y2hTdGF0ZUNoYW5nZXMoKSB7XG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXJEaXNhYmxlZCA9IHRoaXMuZGF0ZXBpY2tlciA/IHRoaXMuZGF0ZXBpY2tlci5kaXNhYmxlZENoYW5nZSA6IG9ic2VydmFibGVPZigpO1xuICAgICAgICBjb25zdCBpbnB1dERpc2FibGVkID0gdGhpcy5kYXRlcGlja2VyICYmIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VySW5wdXQgP1xuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXJJbnB1dC5kaXNhYmxlZENoYW5nZSA6IG9ic2VydmFibGVPZigpO1xuICAgICAgICBjb25zdCBkYXRlcGlja2VyVG9nZ2xlZCA9IHRoaXMuZGF0ZXBpY2tlciA/XG4gICAgICAgICAgICBtZXJnZSh0aGlzLmRhdGVwaWNrZXIub3BlbmVkU3RyZWFtLCB0aGlzLmRhdGVwaWNrZXIuY2xvc2VkU3RyZWFtKSA6XG4gICAgICAgICAgICBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcyA9IG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5pbnRsLmNoYW5nZXMsXG4gICAgICAgICAgICBkYXRlcGlja2VyRGlzYWJsZWQsXG4gICAgICAgICAgICBpbnB1dERpc2FibGVkLFxuICAgICAgICAgICAgZGF0ZXBpY2tlclRvZ2dsZWRcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxufVxuIl19
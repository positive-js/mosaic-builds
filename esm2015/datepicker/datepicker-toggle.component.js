import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { McButton } from '@ptsecurity/mosaic/button';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { McDatepickerIntl } from './datepicker-intl';
import { McDatepicker } from './datepicker.component';
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
McDatepickerToggle.decorators = [
    { type: Component, args: [{
                selector: 'mc-datepicker-toggle',
                template: "<!--todo need simplify this-->\n<button\n    #button\n    mc-button\n    type=\"button\"\n    class=\"mc-datepicker-toggle__button\"\n    aria-haspopup=\"true\"\n    [attr.aria-label]=\"intl.openCalendarLabel\"\n    [attr.tabindex]=\"tabIndex\"\n    [disabled]=\"disabled\"\n    (click)=\"open($event)\">\n\n    <i *ngIf=\"!customIcon\" mc-icon=\"mc-calendar_16\" class=\"mc-datepicker-toggle__default-icon\"></i>\n\n    <ng-content select=\"[mcDatepickerToggleIcon]\"></ng-content>\n</button>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULEtBQUssRUFJTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd0RCxrRUFBa0U7QUFJbEUsTUFBTSxPQUFPLHNCQUFzQjs7O1lBSGxDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2FBQ3ZDOztBQWdCRCxNQUFNLE9BQU8sa0JBQWtCO0lBMEIzQixZQUFtQixJQUFzQixFQUFVLGlCQUFvQztRQUFwRSxTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFKL0UsaUJBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBSWdELENBQUM7SUF6QjNGLDZDQUE2QztJQUM3QyxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNwRixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFtQkQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFZO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFN0YsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNuRSxZQUFZLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDakIsa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixpQkFBaUIsQ0FDcEIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBL0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQywyZkFBcUM7Z0JBRXJDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsc0JBQXNCO29CQUM3QixtQkFBbUIsRUFBRSxpQ0FBaUM7aUJBQ3pEO2dCQUNELFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7WUF0QlEsZ0JBQWdCO1lBZHJCLGlCQUFpQjs7O3VCQXVDaEIsS0FBSzt5QkFVTCxLQUFLLFNBQUMsS0FBSzt1QkFHWCxLQUFLO3lCQUdMLFlBQVksU0FBQyxzQkFBc0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7cUJBR3RELFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNCdXR0b24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcbmltcG9ydCB7IG1lcmdlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5cblxuLyoqIENhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBpY29uIG9mIGEgYG1jRGF0ZXBpY2tlclRvZ2dsZWAuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY0RhdGVwaWNrZXJUb2dnbGVJY29uXSdcbn0pXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VyVG9nZ2xlSWNvbiB7fVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZGF0ZXBpY2tlci10b2dnbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnZGF0ZXBpY2tlci10b2dnbGUuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2RhdGVwaWNrZXItdG9nZ2xlLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZGF0ZXBpY2tlci10b2dnbGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnZGF0ZXBpY2tlciAmJiBkYXRlcGlja2VyLm9wZW5lZCdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNEYXRlcGlja2VyVG9nZ2xlJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlclRvZ2dsZTxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmRhdGVwaWNrZXIuZGlzYWJsZWQgOiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBEYXRlcGlja2VyIGluc3RhbmNlIHRoYXQgdGhlIGJ1dHRvbiB3aWxsIHRvZ2dsZS4gKi9cbiAgICBASW5wdXQoJ2ZvcicpIGRhdGVwaWNrZXI6IE1jRGF0ZXBpY2tlcjxEPjtcblxuICAgIC8qKiBUYWJpbmRleCBmb3IgdGhlIHRvZ2dsZS4gKi9cbiAgICBASW5wdXQoKSB0YWJJbmRleDogbnVtYmVyIHwgbnVsbDtcblxuICAgIC8qKiBDdXN0b20gaWNvbiBzZXQgYnkgdGhlIGNvbnN1bWVyLiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNEYXRlcGlja2VyVG9nZ2xlSWNvbiwgeyBzdGF0aWM6IGZhbHNlIH0pIGN1c3RvbUljb246IE1jRGF0ZXBpY2tlclRvZ2dsZUljb247XG5cbiAgICAvKiogVW5kZXJseWluZyBidXR0b24gZWxlbWVudC4gKi9cbiAgICBAVmlld0NoaWxkKCdidXR0b24nLCB7IHN0YXRpYzogZmFsc2UgfSkgYnV0dG9uOiBNY0J1dHRvbjtcbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGludGw6IE1jRGF0ZXBpY2tlckludGwsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5kYXRlcGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvcGVuKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRlcGlja2VyICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIub3BlbigpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHdhdGNoU3RhdGVDaGFuZ2VzKCkge1xuICAgICAgICBjb25zdCBkYXRlcGlja2VyRGlzYWJsZWQgPSB0aGlzLmRhdGVwaWNrZXIgPyB0aGlzLmRhdGVwaWNrZXIuZGlzYWJsZWRDaGFuZ2UgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICBjb25zdCBpbnB1dERpc2FibGVkID0gdGhpcy5kYXRlcGlja2VyICYmIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VySW5wdXQgP1xuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXJJbnB1dC5kaXNhYmxlZENoYW5nZSA6IG9ic2VydmFibGVPZigpO1xuXG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXJUb2dnbGVkID0gdGhpcy5kYXRlcGlja2VyID9cbiAgICAgICAgICAgIG1lcmdlKHRoaXMuZGF0ZXBpY2tlci5vcGVuZWRTdHJlYW0sIHRoaXMuZGF0ZXBpY2tlci5jbG9zZWRTdHJlYW0pIDpcbiAgICAgICAgICAgIG9ic2VydmFibGVPZigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMgPSBtZXJnZShcbiAgICAgICAgICAgIHRoaXMuaW50bC5jaGFuZ2VzLFxuICAgICAgICAgICAgZGF0ZXBpY2tlckRpc2FibGVkLFxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCxcbiAgICAgICAgICAgIGRhdGVwaWNrZXJUb2dnbGVkXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-toggle.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { McButton } from '@ptsecurity/mosaic/button';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { McDatepicker } from './datepicker';
import { McDatepickerIntl } from './datepicker-intl';
/**
 * Can be used to override the icon of a `mcDatepickerToggle`.
 */
export class McDatepickerToggleIcon {
}
McDatepickerToggleIcon.decorators = [
    { type: Directive, args: [{
                selector: '[mcDatepickerToggleIcon]'
            },] }
];
/**
 * @template D
 */
export class McDatepickerToggle {
    /**
     * @param {?} intl
     * @param {?} changeDetectorRef
     */
    constructor(intl, changeDetectorRef) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.stateChanges = Subscription.EMPTY;
    }
    /**
     * Whether the toggle button is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.watchStateChanges();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    open(event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    watchStateChanges() {
        /** @type {?} */
        const datepickerDisabled = this.datepicker ? this.datepicker.disabledChange : observableOf();
        /** @type {?} */
        const inputDisabled = this.datepicker && this.datepicker.datepickerInput ?
            this.datepicker.datepickerInput.disabledChange : observableOf();
        /** @type {?} */
        const datepickerToggled = this.datepicker ?
            merge(this.datepicker.openedStream, this.datepicker.closedStream) :
            observableOf();
        this.stateChanges.unsubscribe();
        this.stateChanges = merge(this.intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe((/**
         * @return {?}
         */
        () => this.changeDetectorRef.markForCheck()));
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
                styles: [".mc-datepicker-toggle:focus{outline:0}.mc-datepicker-toggle__button.mc-icon-button{width:30px;height:30px;margin-left:2px}.mc-form-field-appearance-legacy .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field-appearance-legacy .mc-form-field-suffix .mc-datepicker-toggle__default-icon{width:1em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-datepicker-toggle__default-icon{display:block;width:1.5em;height:1.5em}.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-prefix .mc-icon-button .mc-datepicker-toggle__default-icon,.mc-form-field:not(.mc-form-field-appearance-legacy) .mc-form-field-suffix .mc-icon-button .mc-datepicker-toggle__default-icon{margin:auto}"]
            }] }
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
if (false) {
    /**
     * Datepicker instance that the button will toggle.
     * @type {?}
     */
    McDatepickerToggle.prototype.datepicker;
    /**
     * Tabindex for the toggle.
     * @type {?}
     */
    McDatepickerToggle.prototype.tabIndex;
    /**
     * Custom icon set by the consumer.
     * @type {?}
     */
    McDatepickerToggle.prototype.customIcon;
    /**
     * Underlying button element.
     * @type {?}
     */
    McDatepickerToggle.prototype.button;
    /**
     * @type {?}
     * @private
     */
    McDatepickerToggle.prototype.stateChanges;
    /**
     * @type {?}
     * @private
     */
    McDatepickerToggle.prototype._disabled;
    /** @type {?} */
    McDatepickerToggle.prototype.intl;
    /**
     * @type {?}
     * @private
     */
    McDatepickerToggle.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXItdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsS0FBSyxFQUlMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQU9yRCxNQUFNLE9BQU8sc0JBQXNCOzs7WUFIbEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7YUFDdkM7Ozs7O0FBZ0JELE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBMkIzQixZQUFtQixJQUFzQixFQUFVLGlCQUFvQztRQUFwRSxTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFKL0UsaUJBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBSWdELENBQUM7Ozs7O0lBeEIzRixJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdEYsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7SUFtQkQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBWTtRQUNiLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDOzs7OztJQUVPLGlCQUFpQjs7Y0FDZixrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFOztjQUN0RixhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFOztjQUM3RCxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNuRSxZQUFZLEVBQUU7UUFFbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ2pCLGtCQUFrQixFQUNsQixhQUFhLEVBQ2IsaUJBQWlCLENBQ3BCLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxFQUFDLENBQUM7SUFDN0QsQ0FBQzs7O1lBN0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQywyZEFBcUM7Z0JBRXJDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsc0JBQXNCO29CQUM3QixtQkFBbUIsRUFBRSxpQ0FBaUM7aUJBQ3pEO2dCQUNELFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7Ozs7WUFyQlEsZ0JBQWdCO1lBZnJCLGlCQUFpQjs7O3VCQXdDaEIsS0FBSzt5QkFVTCxLQUFLLFNBQUMsS0FBSzt1QkFHWCxLQUFLO3lCQUdMLFlBQVksU0FBQyxzQkFBc0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7cUJBR3BELFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOzs7Ozs7O0lBVHBDLHdDQUEwQzs7Ozs7SUFHMUMsc0NBQWlDOzs7OztJQUdqQyx3Q0FBMEY7Ozs7O0lBRzFGLG9DQUF1RDs7Ozs7SUFDdkQsMENBQTBDOzs7OztJQUUxQyx1Q0FBMkI7O0lBRWYsa0NBQTZCOzs7OztJQUFFLCtDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jQnV0dG9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2J1dHRvbic7XG5pbXBvcnQgeyBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWNEYXRlcGlja2VyIH0gZnJvbSAnLi9kYXRlcGlja2VyJztcbmltcG9ydCB7IE1jRGF0ZXBpY2tlckludGwgfSBmcm9tICcuL2RhdGVwaWNrZXItaW50bCc7XG5cblxuLyoqIENhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBpY29uIG9mIGEgYG1jRGF0ZXBpY2tlclRvZ2dsZWAuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY0RhdGVwaWNrZXJUb2dnbGVJY29uXSdcbn0pXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VyVG9nZ2xlSWNvbiB7fVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZGF0ZXBpY2tlci10b2dnbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnZGF0ZXBpY2tlci10b2dnbGUuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2RhdGVwaWNrZXItdG9nZ2xlLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZGF0ZXBpY2tlci10b2dnbGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnZGF0ZXBpY2tlciAmJiBkYXRlcGlja2VyLm9wZW5lZCdcbiAgICB9LFxuICAgIGV4cG9ydEFzOiAnbWNEYXRlcGlja2VyVG9nZ2xlJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlclRvZ2dsZTxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCA/IHRoaXMuZGF0ZXBpY2tlci5kaXNhYmxlZCA6ICEhdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogRGF0ZXBpY2tlciBpbnN0YW5jZSB0aGF0IHRoZSBidXR0b24gd2lsbCB0b2dnbGUuICovXG4gICAgQElucHV0KCdmb3InKSBkYXRlcGlja2VyOiBNY0RhdGVwaWNrZXI8RD47XG5cbiAgICAvKiogVGFiaW5kZXggZm9yIHRoZSB0b2dnbGUuICovXG4gICAgQElucHV0KCkgdGFiSW5kZXg6IG51bWJlciB8IG51bGw7XG5cbiAgICAvKiogQ3VzdG9tIGljb24gc2V0IGJ5IHRoZSBjb25zdW1lci4gKi9cbiAgICBAQ29udGVudENoaWxkKE1jRGF0ZXBpY2tlclRvZ2dsZUljb24sIHtzdGF0aWM6IGZhbHNlfSkgY3VzdG9tSWNvbjogTWNEYXRlcGlja2VyVG9nZ2xlSWNvbjtcblxuICAgIC8qKiBVbmRlcmx5aW5nIGJ1dHRvbiBlbGVtZW50LiAqL1xuICAgIEBWaWV3Q2hpbGQoJ2J1dHRvbicsIHtzdGF0aWM6IGZhbHNlfSkgYnV0dG9uOiBNY0J1dHRvbjtcbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGludGw6IE1jRGF0ZXBpY2tlckludGwsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5kYXRlcGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvcGVuKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRlcGlja2VyICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIub3BlbigpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHdhdGNoU3RhdGVDaGFuZ2VzKCkge1xuICAgICAgICBjb25zdCBkYXRlcGlja2VyRGlzYWJsZWQgPSB0aGlzLmRhdGVwaWNrZXIgPyB0aGlzLmRhdGVwaWNrZXIuZGlzYWJsZWRDaGFuZ2UgOiBvYnNlcnZhYmxlT2YoKTtcbiAgICAgICAgY29uc3QgaW5wdXREaXNhYmxlZCA9IHRoaXMuZGF0ZXBpY2tlciAmJiB0aGlzLmRhdGVwaWNrZXIuZGF0ZXBpY2tlcklucHV0ID9cbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5kYXRlcGlja2VySW5wdXQuZGlzYWJsZWRDaGFuZ2UgOiBvYnNlcnZhYmxlT2YoKTtcbiAgICAgICAgY29uc3QgZGF0ZXBpY2tlclRvZ2dsZWQgPSB0aGlzLmRhdGVwaWNrZXIgP1xuICAgICAgICAgICAgbWVyZ2UodGhpcy5kYXRlcGlja2VyLm9wZW5lZFN0cmVhbSwgdGhpcy5kYXRlcGlja2VyLmNsb3NlZFN0cmVhbSkgOlxuICAgICAgICAgICAgb2JzZXJ2YWJsZU9mKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMgPSBtZXJnZShcbiAgICAgICAgICAgIHRoaXMuaW50bC5jaGFuZ2VzLFxuICAgICAgICAgICAgZGF0ZXBpY2tlckRpc2FibGVkLFxuICAgICAgICAgICAgaW5wdXREaXNhYmxlZCxcbiAgICAgICAgICAgIGRhdGVwaWNrZXJUb2dnbGVkXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICAgIH1cbn1cbiJdfQ==
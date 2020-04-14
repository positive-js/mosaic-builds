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
var McDatepickerToggleIcon = /** @class */ (function () {
    function McDatepickerToggleIcon() {
    }
    McDatepickerToggleIcon.decorators = [
        { type: Directive, args: [{
                    selector: '[mcDatepickerToggleIcon]'
                },] }
    ];
    return McDatepickerToggleIcon;
}());
export { McDatepickerToggleIcon };
/**
 * @template D
 */
var McDatepickerToggle = /** @class */ (function () {
    function McDatepickerToggle(intl, changeDetectorRef) {
        this.intl = intl;
        this.changeDetectorRef = changeDetectorRef;
        this.stateChanges = Subscription.EMPTY;
    }
    Object.defineProperty(McDatepickerToggle.prototype, "disabled", {
        /** Whether the toggle button is disabled. */
        get: /**
         * Whether the toggle button is disabled.
         * @return {?}
         */
        function () {
            return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    McDatepickerToggle.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    };
    /**
     * @return {?}
     */
    McDatepickerToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.unsubscribe();
    };
    /**
     * @return {?}
     */
    McDatepickerToggle.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.watchStateChanges();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McDatepickerToggle.prototype.open = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @private
     * @return {?}
     */
    McDatepickerToggle.prototype.watchStateChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var datepickerDisabled = this.datepicker ? this.datepicker.disabledChange : observableOf();
        /** @type {?} */
        var inputDisabled = this.datepicker && this.datepicker.datepickerInput ?
            this.datepicker.datepickerInput.disabledChange : observableOf();
        /** @type {?} */
        var datepickerToggled = this.datepicker ?
            merge(this.datepicker.openedStream, this.datepicker.closedStream) :
            observableOf();
        this.stateChanges.unsubscribe();
        this.stateChanges = merge(this.intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe((/**
         * @return {?}
         */
        function () { return _this.changeDetectorRef.markForCheck(); }));
    };
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
    McDatepickerToggle.ctorParameters = function () { return [
        { type: McDatepickerIntl },
        { type: ChangeDetectorRef }
    ]; };
    McDatepickerToggle.propDecorators = {
        disabled: [{ type: Input }],
        datepicker: [{ type: Input, args: ['for',] }],
        tabIndex: [{ type: Input }],
        customIcon: [{ type: ContentChild, args: [McDatepickerToggleIcon, { static: false },] }],
        button: [{ type: ViewChild, args: ['button', { static: false },] }]
    };
    return McDatepickerToggle;
}());
export { McDatepickerToggle };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXItdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsS0FBSyxFQUlMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUlyRDtJQUFBO0lBR3FDLENBQUM7O2dCQUhyQyxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtpQkFDdkM7O0lBQ29DLDZCQUFDO0NBQUEsQUFIdEMsSUFHc0M7U0FBekIsc0JBQXNCOzs7O0FBR25DO0lBdUNJLDRCQUFtQixJQUFzQixFQUFVLGlCQUFvQztRQUFwRSxTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFKL0UsaUJBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBSWdELENBQUM7SUF4QjNGLHNCQUNJLHdDQUFRO1FBRlosNkNBQTZDOzs7OztRQUM3QztZQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxD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Ozs7SUFBRSwrQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0J1dHRvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24nO1xuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jRGF0ZXBpY2tlciB9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuXG5cbi8qKiBDYW4gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgaWNvbiBvZiBhIGBtY0RhdGVwaWNrZXJUb2dnbGVgLiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNEYXRlcGlja2VyVG9nZ2xlSWNvbl0nXG59KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlclRvZ2dsZUljb24ge31cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWRhdGVwaWNrZXItdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2RhdGVwaWNrZXItdG9nZ2xlLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkYXRlcGlja2VyLXRvZ2dsZS5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWRhdGVwaWNrZXItdG9nZ2xlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1hY3RpdmVdJzogJ2RhdGVwaWNrZXIgJiYgZGF0ZXBpY2tlci5vcGVuZWQnXG4gICAgfSxcbiAgICBleHBvcnRBczogJ21jRGF0ZXBpY2tlclRvZ2dsZScsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXJUb2dnbGU8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmRhdGVwaWNrZXIuZGlzYWJsZWQgOiAhIXRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIERhdGVwaWNrZXIgaW5zdGFuY2UgdGhhdCB0aGUgYnV0dG9uIHdpbGwgdG9nZ2xlLiAqL1xuICAgIEBJbnB1dCgnZm9yJykgZGF0ZXBpY2tlcjogTWNEYXRlcGlja2VyPEQ+O1xuXG4gICAgLyoqIFRhYmluZGV4IGZvciB0aGUgdG9nZ2xlLiAqL1xuICAgIEBJbnB1dCgpIHRhYkluZGV4OiBudW1iZXIgfCBudWxsO1xuXG4gICAgLyoqIEN1c3RvbSBpY29uIHNldCBieSB0aGUgY29uc3VtZXIuICovXG4gICAgQENvbnRlbnRDaGlsZChNY0RhdGVwaWNrZXJUb2dnbGVJY29uLCB7c3RhdGljOiBmYWxzZX0pIGN1c3RvbUljb246IE1jRGF0ZXBpY2tlclRvZ2dsZUljb247XG5cbiAgICAvKiogVW5kZXJseWluZyBidXR0b24gZWxlbWVudC4gKi9cbiAgICBAVmlld0NoaWxkKCdidXR0b24nLCB7c3RhdGljOiBmYWxzZX0pIGJ1dHRvbjogTWNCdXR0b247XG4gICAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnRsOiBNY0RhdGVwaWNrZXJJbnRsLCBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuZGF0ZXBpY2tlcikge1xuICAgICAgICAgICAgdGhpcy53YXRjaFN0YXRlQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb3BlbihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZXBpY2tlciAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kYXRlcGlja2VyLm9wZW4oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3YXRjaFN0YXRlQ2hhbmdlcygpIHtcbiAgICAgICAgY29uc3QgZGF0ZXBpY2tlckRpc2FibGVkID0gdGhpcy5kYXRlcGlja2VyID8gdGhpcy5kYXRlcGlja2VyLmRpc2FibGVkQ2hhbmdlIDogb2JzZXJ2YWJsZU9mKCk7XG4gICAgICAgIGNvbnN0IGlucHV0RGlzYWJsZWQgPSB0aGlzLmRhdGVwaWNrZXIgJiYgdGhpcy5kYXRlcGlja2VyLmRhdGVwaWNrZXJJbnB1dCA/XG4gICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXIuZGF0ZXBpY2tlcklucHV0LmRpc2FibGVkQ2hhbmdlIDogb2JzZXJ2YWJsZU9mKCk7XG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXJUb2dnbGVkID0gdGhpcy5kYXRlcGlja2VyID9cbiAgICAgICAgICAgIG1lcmdlKHRoaXMuZGF0ZXBpY2tlci5vcGVuZWRTdHJlYW0sIHRoaXMuZGF0ZXBpY2tlci5jbG9zZWRTdHJlYW0pIDpcbiAgICAgICAgICAgIG9ic2VydmFibGVPZigpO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzID0gbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLmludGwuY2hhbmdlcyxcbiAgICAgICAgICAgIGRhdGVwaWNrZXJEaXNhYmxlZCxcbiAgICAgICAgICAgIGlucHV0RGlzYWJsZWQsXG4gICAgICAgICAgICBkYXRlcGlja2VyVG9nZ2xlZFxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG59XG4iXX0=
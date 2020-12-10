/**
 * @fileoverview added by tsickle
 * Generated from: datepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-unbound-method
// tslint:disable:no-magic-numbers
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@ptsecurity/cdk/datetime';
import { ESCAPE, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { McFormFieldControl } from '@ptsecurity/mosaic/form-field';
import { merge, Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { McCalendar } from './calendar';
import { mcDatepickerAnimations } from './datepicker-animations';
import { createMissingDateImplError } from './datepicker-errors';
/**
 * Used to generate a unique ID for each datepicker instance.
 * @type {?}
 */
let datepickerUid = 0;
/**
 * Injection token that determines the scroll handling while the calendar is open.
 * @type {?}
 */
export const MC_DATEPICKER_SCROLL_STRATEGY = new InjectionToken('mc-datepicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
// tslint:disable-next-line:naming-convention
export function MC_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.reposition());
}
/**
 * \@docs-private
 * @type {?}
 */
export const MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_DATEPICKER_SCROLL_STRATEGY_FACTORY
};
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * McCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 * @template D
 */
export class McDatepickerContent {
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.calendar.focusActiveCell();
    }
}
McDatepickerContent.decorators = [
    { type: Component, args: [{
                selector: 'mc-datepicker__content',
                exportAs: 'mcDatepickerContent',
                template: "<mc-calendar [id]=\"datepicker.id\"\n             [ngClass]=\"datepicker.panelClass\"\n             [startAt]=\"datepicker.startAt\"\n             [startView]=\"datepicker.startView\"\n             [minDate]=\"datepicker.minDate\"\n             [maxDate]=\"datepicker.maxDate\"\n             [dateFilter]=\"datepicker.dateFilter\"\n             [headerComponent]=\"datepicker.calendarHeaderComponent\"\n             [selected]=\"datepicker.selected\"\n             [dateClass]=\"datepicker.dateClass\"\n             [@fadeInCalendar]=\"'enter'\"\n             (selectedChange)=\"datepicker.select($event)\"\n             (yearSelected)=\"datepicker.selectYear($event)\"\n             (monthSelected)=\"datepicker.selectMonth($event)\"\n             (userSelection)=\"datepicker.close()\">\n</mc-calendar>\n",
                host: {
                    class: 'mc-datepicker__content',
                    '[@transformPanel]': '"enter"'
                },
                animations: [
                    mcDatepickerAnimations.transformPanel,
                    mcDatepickerAnimations.fadeInCalendar
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-datepicker__content{border-style:solid;border-width:1px;display:block}.mc-datepicker__content .mc-calendar{height:344px;width:296px}.mc-datepicker__content .mc-calendar__next-button[disabled],.mc-datepicker__content .mc-calendar__previous-button[disabled]{border:0}@media (orientation:landscape){.mc-calendar{height:80vh;width:64vh}}@media (orientation:portrait){.mc-calendar{height:100vw;width:80vw}}"]
            }] }
];
McDatepickerContent.propDecorators = {
    calendar: [{ type: ViewChild, args: [McCalendar, { static: false },] }]
};
if (false) {
    /**
     * Reference to the internal calendar component.
     * @type {?}
     */
    McDatepickerContent.prototype.calendar;
    /**
     * Reference to the datepicker that created the overlay.
     * @type {?}
     */
    McDatepickerContent.prototype.datepicker;
}
// TODO: We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="mcDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/**
 * Component responsible for managing the datepicker popup/dialog.
 * @template D
 */
export class McDatepicker {
    /**
     * @param {?} overlay
     * @param {?} ngZone
     * @param {?} viewContainerRef
     * @param {?} scrollStrategy
     * @param {?} dateAdapter
     * @param {?} dir
     * @param {?} document
     */
    constructor(overlay, ngZone, viewContainerRef, scrollStrategy, dateAdapter, dir, document) {
        this.overlay = overlay;
        this.ngZone = ngZone;
        this.viewContainerRef = viewContainerRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        this.document = document;
        this._hasBackdrop = false;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /**
         * Emits selected year in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        this.backdropClass = 'cdk-overlay-transparent-backdrop';
        /**
         * Emits when the datepicker has been opened.
         */
        this.openedStream = new EventEmitter();
        /**
         * Emits when the datepicker has been closed.
         */
        this.closedStream = new EventEmitter();
        /**
         * The id for the datepicker calendar.
         */
        this.id = `mc-datepicker-${datepickerUid++}`;
        this.stateChanges = new Subject();
        /**
         * Emits when the datepicker is disabled.
         */
        this.disabledChange = new Subject();
        /**
         * Emits new selected date when selected date changes.
         */
        this.selectedChanged = new Subject();
        this._opened = false;
        this.validSelected = null;
        /**
         * The element that was focused before the datepicker was opened.
         */
        this.focusedElementBeforeOpen = null;
        /**
         * Subscription to value changes in the associated input element.
         */
        this.inputSubscription = Subscription.EMPTY;
        this.closeSubscription = Subscription.EMPTY;
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this.scrollStrategy = scrollStrategy;
    }
    /**
     * @return {?}
     */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * The date to open the calendar to initially.
     * @return {?}
     */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this.datepickerInput ? this.datepickerInput.value : null);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set startAt(value) {
        this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
    }
    /**
     * Whether the datepicker pop-up should be disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined && this.datepickerInput ? this.datepickerInput.disabled : this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.disabledChange.next(newValue);
        }
    }
    /**
     * Whether the calendar is open.
     * @return {?}
     */
    get opened() {
        return this._opened;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set opened(value) {
        coerceBooleanProperty(value) ? this.open() : this.close();
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() {
        return this.validSelected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this.validSelected = value;
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDate() {
        return this.datepickerInput && this.datepickerInput.min;
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDate() {
        return this.datepickerInput && this.datepickerInput.max;
    }
    /**
     * @return {?}
     */
    get dateFilter() {
        return this.datepickerInput && this.datepickerInput.dateFilter;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.selected;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this.inputSubscription.unsubscribe();
        this.closeSubscription.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
            this.popupComponentRef = null;
        }
    }
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    select(date) {
        /** @type {?} */
        const oldValue = this.selected;
        this.selected = date;
        if (!this.dateAdapter.sameDate(oldValue, this.selected)) {
            this.selectedChanged.next(date);
        }
    }
    /**
     * Emits the selected year in multiyear view
     * @param {?} normalizedYear
     * @return {?}
     */
    selectYear(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    selectMonth(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    registerInput(input) {
        if (this.datepickerInput) {
            throw Error('A McDatepicker can only be associated with a single input.');
        }
        this.datepickerInput = input;
        this.inputSubscription = this.datepickerInput.valueChange
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => this.selected = value));
    }
    /**
     * Open the calendar.
     * @return {?}
     */
    open() {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this.datepickerInput) {
            throw Error('Attempted to open an McDatepicker with no associated input.');
        }
        if (this.document) {
            this.focusedElementBeforeOpen = this.document.activeElement;
        }
        this.openAsPopup();
        this._opened = true;
        this.openedStream.emit();
    }
    /**
     * Close the calendar.
     * @return {?}
     */
    close() {
        if (!this._opened) {
            return;
        }
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.calendarPortal && this.calendarPortal.isAttached) {
            this.calendarPortal.detach();
        }
        /** @type {?} */
        const completeClose = (/**
         * @return {?}
         */
        () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this._opened) {
                this._opened = false;
                this.closedStream.emit();
                this.focusedElementBeforeOpen = null;
                this.datepickerInput.elementRef.nativeElement.focus();
            }
        });
        if (this.focusedElementBeforeOpen &&
            typeof this.focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this.focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    openAsPopup() {
        if (!this.calendarPortal) {
            this.calendarPortal = new ComponentPortal(McDatepickerContent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            this.popupComponentRef = this.popupRef.attach(this.calendarPortal);
            this.popupComponentRef.instance.datepicker = this;
            // Update the position once the calendar has rendered.
            this.ngZone.onStable.asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => this.popupRef.updatePosition()));
        }
    }
    /**
     * Create the popup.
     * @private
     * @return {?}
     */
    createPopup() {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: this.hasBackdrop,
            backdropClass: this.backdropClass,
            direction: this.dir,
            scrollStrategy: this.scrollStrategy(),
            panelClass: 'mc-datepicker__popup'
        });
        this.popupRef = this.overlay.create(overlayConfig);
        this.popupRef.overlayElement.setAttribute('role', 'dialog');
        this.closeSubscription = this.closingActions()
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * @private
     * @return {?}
     */
    closingActions() {
        return merge(this.popupRef.backdropClick(), this.popupRef.outsidePointerEvents(), this.popupRef.detachments(), this.popupRef.keydownEvents().pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            // tslint:disable-next-line:deprecation
            return event.keyCode === ESCAPE || (this.datepickerInput && event.altKey && event.keyCode === UP_ARROW);
        }))));
    }
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    createPopupPositionStrategy() {
        return this.overlay.position()
            .flexibleConnectedTo(this.datepickerInput.elementRef)
            .withTransformOriginOn('.mc-datepicker__content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]);
    }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    getValidDateOrNull(obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    }
}
McDatepicker.decorators = [
    { type: Component, args: [{
                selector: 'mc-datepicker',
                template: '',
                exportAs: 'mcDatepicker',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [{ provide: McFormFieldControl, useExisting: McDatepicker }]
            }] }
];
/** @nocollapse */
McDatepicker.ctorParameters = () => [
    { type: Overlay },
    { type: NgZone },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [MC_DATEPICKER_SCROLL_STRATEGY,] }] },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
McDatepicker.propDecorators = {
    hasBackdrop: [{ type: Input }],
    startAt: [{ type: Input }],
    disabled: [{ type: Input }],
    opened: [{ type: Input }],
    calendarHeaderComponent: [{ type: Input }],
    startView: [{ type: Input }],
    yearSelected: [{ type: Output }],
    monthSelected: [{ type: Output }],
    panelClass: [{ type: Input }],
    dateClass: [{ type: Input }],
    backdropClass: [{ type: Input }],
    openedStream: [{ type: Output, args: ['opened',] }],
    closedStream: [{ type: Output, args: ['closed',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype._hasBackdrop;
    /**
     * An input indicating the type of the custom header component for the calendar, if set.
     * @type {?}
     */
    McDatepicker.prototype.calendarHeaderComponent;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    McDatepicker.prototype.startView;
    /**
     * Emits selected year in multiyear view.
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    McDatepicker.prototype.yearSelected;
    /**
     * Emits selected month in year view.
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    McDatepicker.prototype.monthSelected;
    /**
     * Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`.
     * @type {?}
     */
    McDatepicker.prototype.panelClass;
    /**
     * Function that can be used to add custom CSS classes to dates.
     * @type {?}
     */
    McDatepicker.prototype.dateClass;
    /** @type {?} */
    McDatepicker.prototype.backdropClass;
    /**
     * Emits when the datepicker has been opened.
     * @type {?}
     */
    McDatepicker.prototype.openedStream;
    /**
     * Emits when the datepicker has been closed.
     * @type {?}
     */
    McDatepicker.prototype.closedStream;
    /**
     * The id for the datepicker calendar.
     * @type {?}
     */
    McDatepicker.prototype.id;
    /**
     * A reference to the overlay when the calendar is opened as a popup.
     * @type {?}
     */
    McDatepicker.prototype.popupRef;
    /**
     * The input element this datepicker is associated with.
     * @type {?}
     */
    McDatepicker.prototype.datepickerInput;
    /** @type {?} */
    McDatepicker.prototype.stateChanges;
    /**
     * Emits when the datepicker is disabled.
     * @type {?}
     */
    McDatepicker.prototype.disabledChange;
    /**
     * Emits new selected date when selected date changes.
     * @type {?}
     */
    McDatepicker.prototype.selectedChanged;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype._startAt;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype._opened;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.validSelected;
    /**
     * A portal containing the calendar for this datepicker.
     * @type {?}
     * @private
     */
    McDatepicker.prototype.calendarPortal;
    /**
     * Reference to the component instantiated in popup mode.
     * @type {?}
     * @private
     */
    McDatepicker.prototype.popupComponentRef;
    /**
     * The element that was focused before the datepicker was opened.
     * @type {?}
     * @private
     */
    McDatepicker.prototype.focusedElementBeforeOpen;
    /**
     * Subscription to value changes in the associated input element.
     * @type {?}
     * @private
     */
    McDatepicker.prototype.inputSubscription;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.closeSubscription;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.dateAdapter;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.dir;
    /**
     * @type {?}
     * @private
     */
    McDatepicker.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJkYXRlcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNILE9BQU8sRUFDUCxhQUFhLEVBSWhCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGVBQWUsRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFeEMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxF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dGhvZFxuLy8gdHNsaW50OmRpc2FibGU6bm8tbWFnaWMtbnVtYmVyc1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlDb25maWcsXG4gICAgT3ZlcmxheVJlZixcbiAgICBQb3NpdGlvblN0cmF0ZWd5LFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCB7IEVTQ0FQRSwgVVBfQVJST1cgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgTWNGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY0NhbGVuZGFyIH0gZnJvbSAnLi9jYWxlbmRhcic7XG5pbXBvcnQgeyBNY0NhbGVuZGFyQ2VsbENzc0NsYXNzZXMgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuaW1wb3J0IHsgbWNEYXRlcGlja2VyQW5pbWF0aW9ucyB9IGZyb20gJy4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnB1dCB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dCc7XG5cblxuLyoqIFVzZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgSUQgZm9yIGVhY2ggZGF0ZXBpY2tlciBpbnN0YW5jZS4gKi9cbmxldCBkYXRlcGlja2VyVWlkID0gMDtcblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSB0aGUgY2FsZW5kYXIgaXMgb3Blbi4gKi9cbmV4cG9ydCBjb25zdCBNQ19EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtZGF0ZXBpY2tlci1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUlkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBNQ19EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZXG59O1xuXG4vKipcbiAqIENvbXBvbmVudCB1c2VkIGFzIHRoZSBjb250ZW50IGZvciB0aGUgZGF0ZXBpY2tlciBkaWFsb2cgYW5kIHBvcHVwLiBXZSB1c2UgdGhpcyBpbnN0ZWFkIG9mIHVzaW5nXG4gKiBNY0NhbGVuZGFyIGRpcmVjdGx5IGFzIHRoZSBjb250ZW50IHNvIHdlIGNhbiBjb250cm9sIHRoZSBpbml0aWFsIGZvY3VzLiBUaGlzIGFsc28gZ2l2ZXMgdXMgYVxuICogcGxhY2UgdG8gcHV0IGFkZGl0aW9uYWwgZmVhdHVyZXMgb2YgdGhlIHBvcHVwIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIHRoZSBjYWxlbmRhciBpdHNlbGYgaW4gdGhlXG4gKiBmdXR1cmUuIChlLmcuIGNvbmZpcm1hdGlvbiBidXR0b25zKS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kYXRlcGlja2VyX19jb250ZW50JyxcbiAgICBleHBvcnRBczogJ21jRGF0ZXBpY2tlckNvbnRlbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnZGF0ZXBpY2tlci1jb250ZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydkYXRlcGlja2VyLWNvbnRlbnQuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1kYXRlcGlja2VyX19jb250ZW50JyxcbiAgICAgICAgJ1tAdHJhbnNmb3JtUGFuZWxdJzogJ1wiZW50ZXJcIidcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgbWNEYXRlcGlja2VyQW5pbWF0aW9ucy50cmFuc2Zvcm1QYW5lbCxcbiAgICAgICAgbWNEYXRlcGlja2VyQW5pbWF0aW9ucy5mYWRlSW5DYWxlbmRhclxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXJDb250ZW50PEQ+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgaW50ZXJuYWwgY2FsZW5kYXIgY29tcG9uZW50LiAqL1xuICAgIEBWaWV3Q2hpbGQoTWNDYWxlbmRhciwgeyBzdGF0aWM6IGZhbHNlIH0pIGNhbGVuZGFyOiBNY0NhbGVuZGFyPEQ+O1xuXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgZGF0ZXBpY2tlciB0aGF0IGNyZWF0ZWQgdGhlIG92ZXJsYXkuICovXG4gICAgZGF0ZXBpY2tlcjogTWNEYXRlcGlja2VyPEQ+O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cbn1cblxuXG4vLyBUT0RPOiBXZSB1c2UgYSBjb21wb25lbnQgaW5zdGVhZCBvZiBhIGRpcmVjdGl2ZSBoZXJlIHNvIHRoZSB1c2VyIGNhbiB1c2UgaW1wbGljaXRcbi8vIHRlbXBsYXRlIHJlZmVyZW5jZSB2YXJpYWJsZXMgKGUuZy4gI2QgdnMgI2Q9XCJtY0RhdGVwaWNrZXJcIikuIFdlIGNhbiBjaGFuZ2UgdGhpcyB0byBhIGRpcmVjdGl2ZVxuLy8gaWYgYW5ndWxhciBhZGRzIHN1cHBvcnQgZm9yIGBleHBvcnRBczogJyRpbXBsaWNpdCdgIG9uIGRpcmVjdGl2ZXMuXG4vKiogQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyB0aGUgZGF0ZXBpY2tlciBwb3B1cC9kaWFsb2cuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWRhdGVwaWNrZXInLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBleHBvcnRBczogJ21jRGF0ZXBpY2tlcicsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jRGF0ZXBpY2tlciB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXI8RD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhhc0JhY2tkcm9wKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzQmFja2Ryb3A7XG4gICAgfVxuXG4gICAgc2V0IGhhc0JhY2tkcm9wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hhc0JhY2tkcm9wID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNCYWNrZHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBkYXRlIHRvIG9wZW4gdGhlIGNhbGVuZGFyIHRvIGluaXRpYWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGFydEF0KCk6IEQgfCBudWxsIHtcbiAgICAgICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XG4gICAgICAgIC8vIHNlbGVjdGVkIHZhbHVlIGlzLlxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRBdCB8fCAodGhpcy5kYXRlcGlja2VySW5wdXQgPyB0aGlzLmRhdGVwaWNrZXJJbnB1dC52YWx1ZSA6IG51bGwpO1xuICAgIH1cblxuICAgIHNldCBzdGFydEF0KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlcGlja2VyIHBvcC11cCBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0ZXBpY2tlcklucHV0ID8gdGhpcy5kYXRlcGlja2VySW5wdXQuZGlzYWJsZWQgOiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLm5leHQobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXG4gICAgQElucHV0KClcbiAgICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xuICAgIH1cblxuICAgIHNldCBvcGVuZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKSA/IHRoaXMub3BlbigpIDogdGhpcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRTZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsaWRTZWxlY3RlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5kYXRlcGlja2VySW5wdXQubWluO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5kYXRlcGlja2VySW5wdXQubWF4O1xuICAgIH1cblxuICAgIGdldCBkYXRlRmlsdGVyKCk6IChkYXRlOiBEIHwgbnVsbCkgPT4gYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXJJbnB1dCAmJiB0aGlzLmRhdGVwaWNrZXJJbnB1dC5kYXRlRmlsdGVyO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKiBBbiBpbnB1dCBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIHRoZSBjdXN0b20gaGVhZGVyIGNvbXBvbmVudCBmb3IgdGhlIGNhbGVuZGFyLCBpZiBzZXQuICovXG4gICAgQElucHV0KCkgY2FsZW5kYXJIZWFkZXJDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICAgIC8qKiBUaGUgdmlldyB0aGF0IHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgaW4uICovXG4gICAgQElucHV0KCkgc3RhcnRWaWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXInID0gJ21vbnRoJztcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIHllYXIgaW4gbXVsdGl5ZWFyIHZpZXcuXG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB5ZWFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlldy5cbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAgIC8qKiBDbGFzc2VzIHRvIGJlIHBhc3NlZCB0byB0aGUgZGF0ZSBwaWNrZXIgcGFuZWwuIFN1cHBvcnRzIHRoZSBzYW1lIHN5bnRheCBhcyBgbmdDbGFzc2AuICovXG4gICAgQElucHV0KCkgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhZGQgY3VzdG9tIENTUyBjbGFzc2VzIHRvIGRhdGVzLiAqL1xuICAgIEBJbnB1dCgpIGRhdGVDbGFzczogKGRhdGU6IEQpID0+IE1jQ2FsZW5kYXJDZWxsQ3NzQ2xhc3NlcztcblxuICAgIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M6IHN0cmluZyA9ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCc7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgZGF0ZXBpY2tlciBoYXMgYmVlbiBvcGVuZWQuICovXG4gICAgQE91dHB1dCgnb3BlbmVkJykgb3BlbmVkU3RyZWFtOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgZGF0ZXBpY2tlciBoYXMgYmVlbiBjbG9zZWQuICovXG4gICAgQE91dHB1dCgnY2xvc2VkJykgY2xvc2VkU3RyZWFtOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogVGhlIGlkIGZvciB0aGUgZGF0ZXBpY2tlciBjYWxlbmRhci4gKi9cbiAgICBpZDogc3RyaW5nID0gYG1jLWRhdGVwaWNrZXItJHtkYXRlcGlja2VyVWlkKyt9YDtcblxuICAgIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgb3ZlcmxheSB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQgYXMgYSBwb3B1cC4gKi9cbiAgICBwb3B1cFJlZjogT3ZlcmxheVJlZjtcblxuICAgIC8qKiBUaGUgaW5wdXQgZWxlbWVudCB0aGlzIGRhdGVwaWNrZXIgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICAgIGRhdGVwaWNrZXJJbnB1dDogTWNEYXRlcGlja2VySW5wdXQ8RD47XG5cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgZGlzYWJsZWQuICovXG4gICAgcmVhZG9ubHkgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgLyoqIEVtaXRzIG5ldyBzZWxlY3RlZCBkYXRlIHdoZW4gc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VzLiAqL1xuICAgIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PEQ+KCk7XG4gICAgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG4gICAgcHJpdmF0ZSBfc3RhcnRBdDogRCB8IG51bGw7XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfb3BlbmVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB2YWxpZFNlbGVjdGVkOiBEIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKiogQSBwb3J0YWwgY29udGFpbmluZyB0aGUgY2FsZW5kYXIgZm9yIHRoaXMgZGF0ZXBpY2tlci4gKi9cbiAgICBwcml2YXRlIGNhbGVuZGFyUG9ydGFsOiBDb21wb25lbnRQb3J0YWw8TWNEYXRlcGlja2VyQ29udGVudDxEPj47XG5cbiAgICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgaW5zdGFudGlhdGVkIGluIHBvcHVwIG1vZGUuICovXG4gICAgcHJpdmF0ZSBwb3B1cENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPE1jRGF0ZXBpY2tlckNvbnRlbnQ8RD4+IHwgbnVsbDtcblxuICAgIC8qKiBUaGUgZWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSB0aGUgZGF0ZXBpY2tlciB3YXMgb3BlbmVkLiAqL1xuICAgIHByaXZhdGUgZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byB2YWx1ZSBjaGFuZ2VzIGluIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuICovXG4gICAgcHJpdmF0ZSBpbnB1dFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgY2xvc2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneSA9IHNjcm9sbFN0cmF0ZWd5O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuaW5wdXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wdXBSZWYpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5wb3B1cENvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU2VsZWN0cyB0aGUgZ2l2ZW4gZGF0ZSAqL1xuICAgIHNlbGVjdChkYXRlOiBEKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVBZGFwdGVyLnNhbWVEYXRlKG9sZFZhbHVlLCB0aGlzLnNlbGVjdGVkKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQubmV4dChkYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aXllYXIgdmlldyAqL1xuICAgIHNlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IEQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlldyAqL1xuICAgIHNlbGVjdE1vbnRoKG5vcm1hbGl6ZWRNb250aDogRCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vbnRoU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkTW9udGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGFuIGlucHV0IHdpdGggdGhpcyBkYXRlcGlja2VyLlxuICAgICAqIEBwYXJhbSBpbnB1dCBUaGUgZGF0ZXBpY2tlciBpbnB1dCB0byByZWdpc3RlciB3aXRoIHRoaXMgZGF0ZXBpY2tlci5cbiAgICAgKi9cbiAgICByZWdpc3RlcklucHV0KGlucHV0OiBNY0RhdGVwaWNrZXJJbnB1dDxEPik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRlcGlja2VySW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBIE1jRGF0ZXBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGVwaWNrZXJJbnB1dCA9IGlucHV0O1xuICAgICAgICB0aGlzLmlucHV0U3Vic2NyaXB0aW9uID0gdGhpcy5kYXRlcGlja2VySW5wdXQudmFsdWVDaGFuZ2VcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBEIHwgbnVsbCkgPT4gdGhpcy5zZWxlY3RlZCA9IHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogT3BlbiB0aGUgY2FsZW5kYXIuICovXG4gICAgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX29wZW5lZCB8fCB0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlcGlja2VySW5wdXQpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0ZWQgdG8gb3BlbiBhbiBNY0RhdGVwaWNrZXIgd2l0aCBubyBhc3NvY2lhdGVkIGlucHV0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuQXNQb3B1cCgpO1xuXG4gICAgICAgIHRoaXMuX29wZW5lZCA9IHRydWU7XG4gICAgICAgIHRoaXMub3BlbmVkU3RyZWFtLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKiogQ2xvc2UgdGhlIGNhbGVuZGFyLiAqL1xuICAgIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX29wZW5lZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy5wb3B1cFJlZiAmJiB0aGlzLnBvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYWxlbmRhclBvcnRhbCAmJiB0aGlzLmNhbGVuZGFyUG9ydGFsLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJQb3J0YWwuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZUNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gVGhlIGBfb3BlbmVkYCBjb3VsZCd2ZSBiZWVuIHJlc2V0IGFscmVhZHkgaWZcbiAgICAgICAgICAgIC8vIHdlIGdvdCB0d28gZXZlbnRzIGluIHF1aWNrIHN1Y2Nlc3Npb24uXG4gICAgICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZWRTdHJlYW0uZW1pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlcklucHV0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBCZWNhdXNlIElFIG1vdmVzIGZvY3VzIGFzeW5jaHJvbm91c2x5LCB3ZSBjYW4ndCBjb3VudCBvbiBpdCBiZWluZyByZXN0b3JlZCBiZWZvcmUgd2UndmVcbiAgICAgICAgICAgIC8vIG1hcmtlZCB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQuIElmIHRoZSBldmVudCBmaXJlcyBvdXQgb2Ygc2VxdWVuY2UgYW5kIHRoZSBlbGVtZW50IHRoYXRcbiAgICAgICAgICAgIC8vIHdlJ3JlIHJlZm9jdXNpbmcgb3BlbnMgdGhlIGRhdGVwaWNrZXIgb24gZm9jdXMsIHRoZSB1c2VyIGNvdWxkIGJlIHN0dWNrIHdpdGggbm90IGJlaW5nXG4gICAgICAgICAgICAvLyBhYmxlIHRvIGNsb3NlIHRoZSBjYWxlbmRhciBhdCBhbGwuIFdlIHdvcmsgYXJvdW5kIGl0IGJ5IG1ha2luZyB0aGUgbG9naWMsIHRoYXQgbWFya3NcbiAgICAgICAgICAgIC8vIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZCwgYXN5bmMgYXMgd2VsbC5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNvbXBsZXRlQ2xvc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVDbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyIGFzIGEgcG9wdXAuICovXG4gICAgcHJpdmF0ZSBvcGVuQXNQb3B1cCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbGVuZGFyUG9ydGFsKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbDxNY0RhdGVwaWNrZXJDb250ZW50PEQ+PihcbiAgICAgICAgICAgICAgICBNY0RhdGVwaWNrZXJDb250ZW50LCB0aGlzLnZpZXdDb250YWluZXJSZWZcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucG9wdXBSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwQ29tcG9uZW50UmVmID0gdGhpcy5wb3B1cFJlZi5hdHRhY2godGhpcy5jYWxlbmRhclBvcnRhbCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwQ29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGVwaWNrZXIgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9uY2UgdGhlIGNhbGVuZGFyIGhhcyByZW5kZXJlZC5cbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucG9wdXBSZWYudXBkYXRlUG9zaXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIHRoZSBwb3B1cC4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZVBvcHVwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0aGlzLmhhc0JhY2tkcm9wLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5iYWNrZHJvcENsYXNzLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcixcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtZGF0ZXBpY2tlcl9fcG9wdXAnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucG9wdXBSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICAgICAgICB0aGlzLnBvcHVwUmVmLm92ZXJsYXlFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcblxuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uID0gdGhpcy5jbG9zaW5nQWN0aW9ucygpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zaW5nQWN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLm91dHNpZGVQb2ludGVyRXZlbnRzKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaG1lbnRzKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmtleWRvd25FdmVudHMoKS5waXBlKGZpbHRlcigoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDbG9zaW5nIG9uIGFsdCArIHVwIGlzIG9ubHkgdmFsaWQgd2hlbiB0aGVyZSdzIGFuIGlucHV0IGFzc29jaWF0ZWQgd2l0aCB0aGUgZGF0ZXBpY2tlci5cbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8ICh0aGlzLmRhdGVwaWNrZXJJbnB1dCAmJiBldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgcG9wdXAgUG9zaXRpb25TdHJhdGVneS4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZVBvcHVwUG9zaXRpb25TdHJhdGVneSgpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmRhdGVwaWNrZXJJbnB1dC5lbGVtZW50UmVmKVxuICAgICAgICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1jLWRhdGVwaWNrZXJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKDgpXG4gICAgICAgICAgICAud2l0aExvY2tlZFBvc2l0aW9uKClcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gICAgfVxufVxuIl19
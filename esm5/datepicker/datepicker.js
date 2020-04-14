/**
 * @fileoverview added by tsickle
 * Generated from: datepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var datepickerUid = 0;
/**
 * Injection token that determines the scroll handling while the calendar is open.
 * @type {?}
 */
export var MC_DATEPICKER_SCROLL_STRATEGY = new InjectionToken('mc-datepicker-scroll-strategy');
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
    function () { return overlay.scrollStrategies.reposition(); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
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
var McDatepickerContent = /** @class */ (function () {
    function McDatepickerContent() {
    }
    /**
     * @return {?}
     */
    McDatepickerContent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.calendar.focusActiveCell();
    };
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
                    styles: [".mc-datepicker__content{display:block;border-width:1px;border-style:solid}.mc-datepicker__content .mc-calendar{width:296px;height:344px}.mc-datepicker__content .mc-calendar__next-button[disabled],.mc-datepicker__content .mc-calendar__previous-button[disabled]{border:0}@media all and (orientation:landscape){.mc-calendar{width:64vh;height:80vh}}@media all and (orientation:portrait){.mc-calendar{width:80vw;height:100vw}}"]
                }] }
    ];
    McDatepickerContent.propDecorators = {
        calendar: [{ type: ViewChild, args: [McCalendar, { static: false },] }]
    };
    return McDatepickerContent;
}());
export { McDatepickerContent };
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
var McDatepicker = /** @class */ (function () {
    function McDatepicker(overlay, ngZone, viewContainerRef, scrollStrategy, dateAdapter, dir, document) {
        this.overlay = overlay;
        this.ngZone = ngZone;
        this.viewContainerRef = viewContainerRef;
        this.dateAdapter = dateAdapter;
        this.dir = dir;
        this.document = document;
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
        this.id = "mc-datepicker-" + datepickerUid++;
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
        if (!this.dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this.scrollStrategy = scrollStrategy;
    }
    Object.defineProperty(McDatepicker.prototype, "startAt", {
        /** The date to open the calendar to initially. */
        get: /**
         * The date to open the calendar to initially.
         * @return {?}
         */
        function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            return this._startAt || (this.datepickerInput ? this.datepickerInput.value : null);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._startAt = this.getValidDateOrNull(this.dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "disabled", {
        /** Whether the datepicker pop-up should be disabled. */
        get: /**
         * Whether the datepicker pop-up should be disabled.
         * @return {?}
         */
        function () {
            return this._disabled === undefined && this.datepickerInput ?
                this.datepickerInput.disabled : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this.disabledChange.next(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "opened", {
        /** Whether the calendar is open. */
        get: /**
         * Whether the calendar is open.
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.open();
            }
            else {
                this.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "selected", {
        /** The currently selected date. */
        get: /**
         * The currently selected date.
         * @return {?}
         */
        function () {
            return this.validSelected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.validSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "minDate", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this.datepickerInput && this.datepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this.datepickerInput && this.datepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "dateFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.datepickerInput && this.datepickerInput.dateFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McDatepicker.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McDatepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        this.inputSubscription.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
            this.popupComponentRef = null;
        }
    };
    /** Selects the given date */
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    McDatepicker.prototype.select = /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var oldValue = this.selected;
        this.selected = date;
        if (!this.dateAdapter.sameDate(oldValue, this.selected)) {
            this.selectedChanged.next(date);
        }
    };
    /** Emits the selected year in multiyear view */
    /**
     * Emits the selected year in multiyear view
     * @param {?} normalizedYear
     * @return {?}
     */
    McDatepicker.prototype.selectYear = /**
     * Emits the selected year in multiyear view
     * @param {?} normalizedYear
     * @return {?}
     */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /** Emits selected month in year view */
    /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    McDatepicker.prototype.selectMonth = /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    McDatepicker.prototype.registerInput = /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    function (input) {
        var _this = this;
        if (this.datepickerInput) {
            throw Error('A McDatepicker can only be associated with a single input.');
        }
        this.datepickerInput = input;
        this.inputSubscription =
            this.datepickerInput.valueChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return _this.selected = value; }));
    };
    /** Open the calendar. */
    /**
     * Open the calendar.
     * @return {?}
     */
    McDatepicker.prototype.open = /**
     * Open the calendar.
     * @return {?}
     */
    function () {
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
    };
    /** Close the calendar. */
    /**
     * Close the calendar.
     * @return {?}
     */
    McDatepicker.prototype.close = /**
     * Close the calendar.
     * @return {?}
     */
    function () {
        var _this = this;
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
        var completeClose = (/**
         * @return {?}
         */
        function () {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (_this._opened) {
                _this._opened = false;
                _this.closedStream.emit();
                _this.focusedElementBeforeOpen = null;
                _this.datepickerInput.elementRef.nativeElement.focus();
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
    };
    /** Open the calendar as a popup. */
    /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    McDatepicker.prototype.openAsPopup = /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
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
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
             * @return {?}
             */
            function () {
                _this.popupRef.updatePosition();
            }));
        }
    };
    /** Create the popup. */
    /**
     * Create the popup.
     * @private
     * @return {?}
     */
    McDatepicker.prototype.createPopup = /**
     * Create the popup.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'mc-overlay-transparent-backdrop',
            direction: this.dir,
            scrollStrategy: this.scrollStrategy(),
            panelClass: 'mc-datepicker__popup'
        });
        this.popupRef = this.overlay.create(overlayConfig);
        this.popupRef.overlayElement.setAttribute('role', 'dialog');
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef.keydownEvents().pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            // tslint:disable-next-line:deprecation
            return event.keyCode === ESCAPE || (_this.datepickerInput && event.altKey && event.keyCode === UP_ARROW);
        })))).subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /** Create the popup PositionStrategy. */
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    McDatepicker.prototype.createPopupPositionStrategy = /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    McDatepicker.prototype.getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return (this.dateAdapter.isDateInstance(obj) && this.dateAdapter.isValid(obj)) ? obj : null;
    };
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
    McDatepicker.ctorParameters = function () { return [
        { type: Overlay },
        { type: NgZone },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [MC_DATEPICKER_SCROLL_STRATEGY,] }] },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    McDatepicker.propDecorators = {
        startAt: [{ type: Input }],
        disabled: [{ type: Input }],
        opened: [{ type: Input }],
        calendarHeaderComponent: [{ type: Input }],
        startView: [{ type: Input }],
        yearSelected: [{ type: Output }],
        monthSelected: [{ type: Output }],
        panelClass: [{ type: Input }],
        dateClass: [{ type: Input }],
        openedStream: [{ type: Output, args: ['opened',] }],
        closedStream: [{ type: Output, args: ['closed',] }]
    };
    return McDatepicker;
}());
export { McDatepicker };
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxlQUFlLEVBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSwwQkFBMEIsRUFB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ZXRob2Rcbi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5Q29uZmlnLFxuICAgIE92ZXJsYXlSZWYsXG4gICAgUG9zaXRpb25TdHJhdGVneSxcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQgeyBFU0NBUEUsIFVQX0FSUk9XIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE1jRm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9mb3JtLWZpZWxkJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNDYWxlbmRhciB9IGZyb20gJy4vY2FsZW5kYXInO1xuaW1wb3J0IHsgTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzIH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcbmltcG9ydCB7IG1jRGF0ZXBpY2tlckFuaW1hdGlvbnMgfSBmcm9tICcuL2RhdGVwaWNrZXItYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VySW5wdXQgfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQnO1xuXG5cbi8qKiBVc2VkIHRvIGdlbmVyYXRlIGEgdW5pcXVlIElEIGZvciBlYWNoIGRhdGVwaWNrZXIgaW5zdGFuY2UuICovXG5sZXQgZGF0ZXBpY2tlclVpZCA9IDA7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgTUNfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLWRhdGVwaWNrZXItc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZKG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogTUNfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWVxufTtcblxuLyoqXG4gKiBDb21wb25lbnQgdXNlZCBhcyB0aGUgY29udGVudCBmb3IgdGhlIGRhdGVwaWNrZXIgZGlhbG9nIGFuZCBwb3B1cC4gV2UgdXNlIHRoaXMgaW5zdGVhZCBvZiB1c2luZ1xuICogTWNDYWxlbmRhciBkaXJlY3RseSBhcyB0aGUgY29udGVudCBzbyB3ZSBjYW4gY29udHJvbCB0aGUgaW5pdGlhbCBmb2N1cy4gVGhpcyBhbHNvIGdpdmVzIHVzIGFcbiAqIHBsYWNlIHRvIHB1dCBhZGRpdGlvbmFsIGZlYXR1cmVzIG9mIHRoZSBwb3B1cCB0aGF0IGFyZSBub3QgcGFydCBvZiB0aGUgY2FsZW5kYXIgaXRzZWxmIGluIHRoZVxuICogZnV0dXJlLiAoZS5nLiBjb25maXJtYXRpb24gYnV0dG9ucykuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZGF0ZXBpY2tlcl9fY29udGVudCcsXG4gICAgZXhwb3J0QXM6ICdtY0RhdGVwaWNrZXJDb250ZW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2RhdGVwaWNrZXItY29udGVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci1jb250ZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZGF0ZXBpY2tlcl9fY29udGVudCcsXG4gICAgICAgICdbQHRyYW5zZm9ybVBhbmVsXSc6ICdcImVudGVyXCInXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIG1jRGF0ZXBpY2tlckFuaW1hdGlvbnMudHJhbnNmb3JtUGFuZWwsXG4gICAgICAgIG1jRGF0ZXBpY2tlckFuaW1hdGlvbnMuZmFkZUluQ2FsZW5kYXJcbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VyQ29udGVudDxEPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgaW50ZXJuYWwgY2FsZW5kYXIgY29tcG9uZW50LiAqL1xuICAgIEBWaWV3Q2hpbGQoTWNDYWxlbmRhciwgeyBzdGF0aWM6IGZhbHNlIH0pIGNhbGVuZGFyOiBNY0NhbGVuZGFyPEQ+O1xuXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgZGF0ZXBpY2tlciB0aGF0IGNyZWF0ZWQgdGhlIG92ZXJsYXkuICovXG4gICAgZGF0ZXBpY2tlcjogTWNEYXRlcGlja2VyPEQ+O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cbn1cblxuXG4vLyBUT0RPOiBXZSB1c2UgYSBjb21wb25lbnQgaW5zdGVhZCBvZiBhIGRpcmVjdGl2ZSBoZXJlIHNvIHRoZSB1c2VyIGNhbiB1c2UgaW1wbGljaXRcbi8vIHRlbXBsYXRlIHJlZmVyZW5jZSB2YXJpYWJsZXMgKGUuZy4gI2QgdnMgI2Q9XCJtY0RhdGVwaWNrZXJcIikuIFdlIGNhbiBjaGFuZ2UgdGhpcyB0byBhIGRpcmVjdGl2ZVxuLy8gaWYgYW5ndWxhciBhZGRzIHN1cHBvcnQgZm9yIGBleHBvcnRBczogJyRpbXBsaWNpdCdgIG9uIGRpcmVjdGl2ZXMuXG4vKiogQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyB0aGUgZGF0ZXBpY2tlciBwb3B1cC9kaWFsb2cuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWRhdGVwaWNrZXInLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBleHBvcnRBczogJ21jRGF0ZXBpY2tlcicsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1jRm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1jRGF0ZXBpY2tlciB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY0RhdGVwaWNrZXI8RD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFRoZSBkYXRlIHRvIG9wZW4gdGhlIGNhbGVuZGFyIHRvIGluaXRpYWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGFydEF0KCk6IEQgfCBudWxsIHtcbiAgICAgICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XG4gICAgICAgIC8vIHNlbGVjdGVkIHZhbHVlIGlzLlxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRBdCB8fCAodGhpcy5kYXRlcGlja2VySW5wdXQgPyB0aGlzLmRhdGVwaWNrZXJJbnB1dC52YWx1ZSA6IG51bGwpO1xuICAgIH1cblxuICAgIHNldCBzdGFydEF0KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGVPck51bGwodGhpcy5kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlcGlja2VyIHBvcC11cCBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0ZXBpY2tlcklucHV0ID9cbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlcklucHV0LmRpc2FibGVkIDogISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLm5leHQobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXG4gICAgQElucHV0KClcbiAgICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xuICAgIH1cblxuICAgIHNldCBvcGVuZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRTZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsaWRTZWxlY3RlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5kYXRlcGlja2VySW5wdXQubWluO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5kYXRlcGlja2VySW5wdXQubWF4O1xuICAgIH1cblxuICAgIGdldCBkYXRlRmlsdGVyKCk6IChkYXRlOiBEIHwgbnVsbCkgPT4gYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXJJbnB1dCAmJiB0aGlzLmRhdGVwaWNrZXJJbnB1dC5kYXRlRmlsdGVyO1xuICAgIH1cblxuXG4gICAgZ2V0IHZhbHVlKCk6IEQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLyoqIEFuIGlucHV0IGluZGljYXRpbmcgdGhlIHR5cGUgb2YgdGhlIGN1c3RvbSBoZWFkZXIgY29tcG9uZW50IGZvciB0aGUgY2FsZW5kYXIsIGlmIHNldC4gKi9cbiAgICBASW5wdXQoKSBjYWxlbmRhckhlYWRlckNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxhbnk+O1xuXG4gICAgLyoqIFRoZSB2aWV3IHRoYXQgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBpbi4gKi9cbiAgICBASW5wdXQoKSBzdGFydFZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcicgPSAnbW9udGgnO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aXllYXIgdmlldy5cbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHllYXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3LlxuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gICAgLyoqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBkYXRlIHBpY2tlciBwYW5lbC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cbiAgICBASW5wdXQoKSBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBjdXN0b20gQ1NTIGNsYXNzZXMgdG8gZGF0ZXMuICovXG4gICAgQElucHV0KCkgZGF0ZUNsYXNzOiAoZGF0ZTogRCkgPT4gTWNDYWxlbmRhckNlbGxDc3NDbGFzc2VzO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRhdGVwaWNrZXIgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoJ29wZW5lZCcpIG9wZW5lZFN0cmVhbTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRhdGVwaWNrZXIgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoJ2Nsb3NlZCcpIGNsb3NlZFN0cmVhbTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIFRoZSBpZCBmb3IgdGhlIGRhdGVwaWNrZXIgY2FsZW5kYXIuICovXG4gICAgaWQ6IHN0cmluZyA9IGBtYy1kYXRlcGlja2VyLSR7ZGF0ZXBpY2tlclVpZCsrfWA7XG5cbiAgICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIG92ZXJsYXkgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkIGFzIGEgcG9wdXAuICovXG4gICAgcG9wdXBSZWY6IE92ZXJsYXlSZWY7XG5cbiAgICAvKiogVGhlIGlucHV0IGVsZW1lbnQgdGhpcyBkYXRlcGlja2VyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgICBkYXRlcGlja2VySW5wdXQ6IE1jRGF0ZXBpY2tlcklucHV0PEQ+O1xuXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBPYnNlcnZhYmxlPHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkYXRlcGlja2VyIGlzIGRpc2FibGVkLiAqL1xuICAgIHJlYWRvbmx5IGRpc2FibGVkQ2hhbmdlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFbWl0cyBuZXcgc2VsZWN0ZWQgZGF0ZSB3aGVuIHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgICByZWFkb25seSBzZWxlY3RlZENoYW5nZWQgPSBuZXcgU3ViamVjdDxEPigpO1xuICAgIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuICAgIHByaXZhdGUgX3N0YXJ0QXQ6IEQgfCBudWxsO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuICAgIHByaXZhdGUgX29wZW5lZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgdmFsaWRTZWxlY3RlZDogRCB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqIEEgcG9ydGFsIGNvbnRhaW5pbmcgdGhlIGNhbGVuZGFyIGZvciB0aGlzIGRhdGVwaWNrZXIuICovXG4gICAgcHJpdmF0ZSBjYWxlbmRhclBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1jRGF0ZXBpY2tlckNvbnRlbnQ8RD4+O1xuXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50IGluc3RhbnRpYXRlZCBpbiBwb3B1cCBtb2RlLiAqL1xuICAgIHByaXZhdGUgcG9wdXBDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxNY0RhdGVwaWNrZXJDb250ZW50PEQ+PiB8IG51bGw7XG5cbiAgICAvKiogVGhlIGVsZW1lbnQgdGhhdCB3YXMgZm9jdXNlZCBiZWZvcmUgdGhlIGRhdGVwaWNrZXIgd2FzIG9wZW5lZC4gKi9cbiAgICBwcml2YXRlIGZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gdmFsdWUgY2hhbmdlcyBpbiB0aGUgYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LiAqL1xuICAgIHByaXZhdGUgaW5wdXRTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneSA9IHNjcm9sbFN0cmF0ZWd5O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuaW5wdXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnBvcHVwUmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMucG9wdXBDb21wb25lbnRSZWYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFNlbGVjdHMgdGhlIGdpdmVuIGRhdGUgKi9cbiAgICBzZWxlY3QoZGF0ZTogRCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlO1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZUFkYXB0ZXIuc2FtZURhdGUob2xkVmFsdWUsIHRoaXMuc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlZC5uZXh0KGRhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyIGluIG11bHRpeWVhciB2aWV3ICovXG4gICAgc2VsZWN0WWVhcihub3JtYWxpemVkWWVhcjogRCk6IHZvaWQge1xuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRZZWFyKTtcbiAgICB9XG5cbiAgICAvKiogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3ICovXG4gICAgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBEKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYW4gaW5wdXQgd2l0aCB0aGlzIGRhdGVwaWNrZXIuXG4gICAgICogQHBhcmFtIGlucHV0IFRoZSBkYXRlcGlja2VyIGlucHV0IHRvIHJlZ2lzdGVyIHdpdGggdGhpcyBkYXRlcGlja2VyLlxuICAgICAqL1xuICAgIHJlZ2lzdGVySW5wdXQoaW5wdXQ6IE1jRGF0ZXBpY2tlcklucHV0PEQ+KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGVwaWNrZXJJbnB1dCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0EgTWNEYXRlcGlja2VyIGNhbiBvbmx5IGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNpbmdsZSBpbnB1dC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGVwaWNrZXJJbnB1dCA9IGlucHV0O1xuICAgICAgICB0aGlzLmlucHV0U3Vic2NyaXB0aW9uID1cbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlcklucHV0LnZhbHVlQ2hhbmdlLnN1YnNjcmliZSgodmFsdWU6IEQgfCBudWxsKSA9PiB0aGlzLnNlbGVjdGVkID0gdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBPcGVuIHRoZSBjYWxlbmRhci4gKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZGF0ZXBpY2tlcklucHV0KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQXR0ZW1wdGVkIHRvIG9wZW4gYW4gTWNEYXRlcGlja2VyIHdpdGggbm8gYXNzb2NpYXRlZCBpbnB1dC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5Bc1BvcHVwKCk7XG5cbiAgICAgICAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vcGVuZWRTdHJlYW0uZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKiBDbG9zZSB0aGUgY2FsZW5kYXIuICovXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fb3BlbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3B1cFJlZiAmJiB0aGlzLnBvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYWxlbmRhclBvcnRhbCAmJiB0aGlzLmNhbGVuZGFyUG9ydGFsLmlzQXR0YWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJQb3J0YWwuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZUNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gVGhlIGBfb3BlbmVkYCBjb3VsZCd2ZSBiZWVuIHJlc2V0IGFscmVhZHkgaWZcbiAgICAgICAgICAgIC8vIHdlIGdvdCB0d28gZXZlbnRzIGluIHF1aWNrIHN1Y2Nlc3Npb24uXG4gICAgICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZWRTdHJlYW0uZW1pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlcklucHV0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBCZWNhdXNlIElFIG1vdmVzIGZvY3VzIGFzeW5jaHJvbm91c2x5LCB3ZSBjYW4ndCBjb3VudCBvbiBpdCBiZWluZyByZXN0b3JlZCBiZWZvcmUgd2UndmVcbiAgICAgICAgICAgIC8vIG1hcmtlZCB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQuIElmIHRoZSBldmVudCBmaXJlcyBvdXQgb2Ygc2VxdWVuY2UgYW5kIHRoZSBlbGVtZW50IHRoYXRcbiAgICAgICAgICAgIC8vIHdlJ3JlIHJlZm9jdXNpbmcgb3BlbnMgdGhlIGRhdGVwaWNrZXIgb24gZm9jdXMsIHRoZSB1c2VyIGNvdWxkIGJlIHN0dWNrIHdpdGggbm90IGJlaW5nXG4gICAgICAgICAgICAvLyBhYmxlIHRvIGNsb3NlIHRoZSBjYWxlbmRhciBhdCBhbGwuIFdlIHdvcmsgYXJvdW5kIGl0IGJ5IG1ha2luZyB0aGUgbG9naWMsIHRoYXQgbWFya3NcbiAgICAgICAgICAgIC8vIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZCwgYXN5bmMgYXMgd2VsbC5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNvbXBsZXRlQ2xvc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVDbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyIGFzIGEgcG9wdXAuICovXG4gICAgcHJpdmF0ZSBvcGVuQXNQb3B1cCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbGVuZGFyUG9ydGFsKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbDxNY0RhdGVwaWNrZXJDb250ZW50PEQ+PihNY0RhdGVwaWNrZXJDb250ZW50LFxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucG9wdXBSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwQ29tcG9uZW50UmVmID0gdGhpcy5wb3B1cFJlZi5hdHRhY2godGhpcy5jYWxlbmRhclBvcnRhbCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwQ29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGVwaWNrZXIgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9uY2UgdGhlIGNhbGVuZGFyIGhhcyByZW5kZXJlZC5cbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwUmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIHBvcHVwLiAqL1xuICAgIHByaXZhdGUgY3JlYXRlUG9wdXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmNyZWF0ZVBvcHVwUG9zaXRpb25TdHJhdGVneSgpLFxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnbWMtb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICdtYy1kYXRlcGlja2VyX19wb3B1cCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wb3B1cFJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gICAgICAgIHRoaXMucG9wdXBSZWYub3ZlcmxheUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2RpYWxvZycpO1xuXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaG1lbnRzKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmtleWRvd25FdmVudHMoKS5waXBlKGZpbHRlcigoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDbG9zaW5nIG9uIGFsdCArIHVwIGlzIG9ubHkgdmFsaWQgd2hlbiB0aGVyZSdzIGFuIGlucHV0IGFzc29jaWF0ZWQgd2l0aCB0aGUgZGF0ZXBpY2tlci5cbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8ICh0aGlzLmRhdGVwaWNrZXJJbnB1dCAmJiBldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpO1xuICAgICAgICAgICAgfSkpXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgcG9wdXAgUG9zaXRpb25TdHJhdGVneS4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZVBvcHVwUG9zaXRpb25TdHJhdGVneSgpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmRhdGVwaWNrZXJJbnB1dC5lbGVtZW50UmVmKVxuICAgICAgICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1jLWRhdGVwaWNrZXJfX2NvbnRlbnQnKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKDgpXG4gICAgICAgICAgICAud2l0aExvY2tlZFBvc2l0aW9uKClcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiAodGhpcy5kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gICAgfVxufVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: card.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { Output, ChangeDetectionStrategy, Component, ElementRef, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
var McCardBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McCardBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McCardBase;
}());
export { McCardBase };
if (false) {
    /** @type {?} */
    McCardBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McCardBaseMixin = mixinColor(McCardBase);
var McCard = /** @class */ (function (_super) {
    __extends(McCard, _super);
    function McCard(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this._focusMonitor = _focusMonitor;
        _this.readonly = false;
        _this.selected = false;
        _this.selectedChange = new EventEmitter();
        _this._tabIndex = 0;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, false);
        return _this;
    }
    Object.defineProperty(McCard.prototype, "tabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readonly ? null : this._tabIndex;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McCard.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McCard.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.hostElement.focus();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McCard.prototype.onClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McCard.prototype.onKeyDown = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        // tslint:disable-next-line:deprecation
        switch ($event.keyCode) {
            case SPACE:
                if (!this.readonly) {
                    $event.preventDefault();
                    this.selectedChange.emit(!this.selected);
                }
                break;
            default:
        }
    };
    Object.defineProperty(McCard.prototype, "hostElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    McCard.decorators = [
        { type: Component, args: [{
                    selector: 'mc-card',
                    template: "<ng-content></ng-content>\n<div class=\"mc-card__overlay\"></div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['color'],
                    host: {
                        class: 'mc-card',
                        '[class.mc-card_readonly]': 'readonly',
                        '[class.mc-selected]': 'selected',
                        '[attr.tabindex]': 'tabIndex',
                        '(keydown)': 'onKeyDown($event)',
                        '(click)': 'onClick($event)'
                    },
                    styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left:4px solid transparent}.mc-card:focus{outline:0}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:0 0}.mc-card.mc-card_readonly{cursor:auto}"]
                }] }
    ];
    /** @nocollapse */
    McCard.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    McCard.propDecorators = {
        readonly: [{ type: Input }],
        selected: [{ type: Input }],
        selectedChange: [{ type: Output }],
        tabIndex: [{ type: Input }]
    };
    return McCard;
}(McCardBaseMixin));
export { McCard };
if (false) {
    /** @type {?} */
    McCard.prototype.readonly;
    /** @type {?} */
    McCard.prototype.selected;
    /** @type {?} */
    McCard.prototype.selectedChange;
    /**
     * @type {?}
     * @private
     */
    McCard.prototype._tabIndex;
    /**
     * @type {?}
     * @private
     */
    McCard.prototype._focusMonitor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY2FyZC8iLCJzb3VyY2VzIjpbImNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsTUFBTSxFQUNOLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRCxPQUFPLEVBQWdCLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR25FO0lBQ0ksNkNBQTZDO0lBQzdDLG9CQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFDbEQsaUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7OztJQURlLGlDQUE4Qjs7OztBQUk5QyxNQUFNLEtBQU8sZUFBZSxHQUFxQyxVQUFVLENBQUMsVUFBVSxDQUFDO0FBR3ZGO0lBZ0I0QiwwQkFBZTtJQXFCdkMsZ0JBQVksVUFBc0IsRUFBVSxhQUEyQjtRQUF2RSxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUdwQjtRQUoyQyxtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQW5CdkUsY0FBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixjQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLG9CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVdyQyxlQUFTLEdBQWtCLENBQUMsQ0FBQztRQUtqQyxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7SUFDdEUsQ0FBQztJQWZELHNCQUNJLDRCQUFROzs7O1FBRFo7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqRCxDQUFDOzs7OztRQUVELFVBQWEsS0FBb0I7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSkE7Ozs7SUFjRCw0QkFBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7SUFFRCxzQkFBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsd0JBQU87Ozs7SUFBUCxVQUFRLE1BQWtCO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7Ozs7O0lBRUQsMEJBQVM7Ozs7SUFBVCxVQUFVLE1BQXFCO1FBQzNCLHVDQUF1QztRQUN2QyxRQUFRLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDcEIsS0FBSyxLQUFLO2dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNoQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxNQUFNO1lBQ1YsUUFBUTtTQUNYO0lBQ0wsQ0FBQztJQUVELHNCQUFZLCtCQUFXOzs7OztRQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7O2dCQTFFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLCtFQUFvQztvQkFFcEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ2pCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsMEJBQTBCLEVBQUUsVUFBVTt3QkFDdEMscUJBQXFCLEVBQUUsVUFBVTt3QkFDakMsaUJBQWlCLEVBQUUsVUFBVTt3QkFDN0IsV0FBVyxFQUFFLG1CQUFtQjt3QkFDaEMsU0FBUyxFQUFFLGlCQUFpQjtxQkFDL0I7O2lCQUNKOzs7O2dCQWxDRyxVQUFVO2dCQUxMLFlBQVk7OzsyQkF5Q2hCLEtBQUs7MkJBR0wsS0FBSztpQ0FHTCxNQUFNOzJCQUdOLEtBQUs7O0lBaURWLGFBQUM7Q0FBQSxBQTNFRCxDQWdCNEIsZUFBZSxHQTJEMUM7U0EzRFksTUFBTTs7O0lBQ2YsMEJBQ2lCOztJQUVqQiwwQkFDaUI7O0lBRWpCLGdDQUM2Qzs7Ozs7SUFXN0MsMkJBQXFDOzs7OztJQUVELCtCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgT3V0cHV0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTUEFDRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDYW5Db2xvckN0b3IsIG1peGluQ29sb3IgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IGNsYXNzIE1jQ2FyZEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNDYXJkQmFzZU1peGluOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNDYXJkQmFzZSA9IG1peGluQ29sb3IoTWNDYXJkQmFzZSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FyZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWNhcmQnLFxuICAgICAgICAnW2NsYXNzLm1jLWNhcmRfcmVhZG9ubHldJzogJ3JlYWRvbmx5JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcoY2xpY2spJzogJ29uQ2xpY2soJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQ2FyZCBleHRlbmRzIE1jQ2FyZEJhc2VNaXhpbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgQElucHV0KClcbiAgICByZWFkb25seSA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpXG4gICAgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB0YWJJbmRleCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZG9ubHkgPyBudWxsIDogdGhpcy5fdGFiSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IHRhYkluZGV4KHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhvc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgb25DbGljaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCghdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oJGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBzd2l0Y2ggKCRldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KCF0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgaG9zdEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19
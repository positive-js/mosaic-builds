/**
 * @fileoverview added by tsickle
 * Generated from: card.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Output, ChangeDetectionStrategy, Component, ElementRef, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
export class McCardBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McCardBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McCardBaseMixin = mixinColor(McCardBase);
export class McCard extends McCardBaseMixin {
    /**
     * @param {?} elementRef
     * @param {?} _focusMonitor
     */
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this._focusMonitor = _focusMonitor;
        this.readonly = false;
        this.selected = false;
        this.selectedChange = new EventEmitter();
        this._tabIndex = 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, false);
    }
    /**
     * @return {?}
     */
    get tabIndex() {
        return this.readonly ? null : this._tabIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        this._tabIndex = value;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    focus() {
        this.hostElement.focus();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClick($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onKeyDown($event) {
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
    }
    /**
     * @private
     * @return {?}
     */
    get hostElement() {
        return this._elementRef.nativeElement;
    }
}
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
                styles: [".mc-card{border-left:var(--mc-card-size-vertical-line,4px) solid transparent;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;position:relative}.mc-card:focus{outline:none}.mc-card .mc-card__overlay{background:transparent;bottom:0;left:0;pointer-events:none;position:absolute;right:0;top:0}.mc-card.mc-card_readonly{cursor:auto}"]
            }] }
];
/** @nocollapse */
McCard.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McCard.propDecorators = {
    readonly: [{ type: Input }],
    selected: [{ type: Input }],
    selectedChange: [{ type: Output }],
    tabIndex: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9jYXJkLyIsInNvdXJjZXMiOlsiY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILE1BQU0sRUFDTix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUduRSxNQUFNLE9BQU8sVUFBVTs7Ozs7SUFFbkIsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEOzs7SUFEZSxpQ0FBOEI7Ozs7QUFJOUMsTUFBTSxPQUFPLGVBQWUsR0FBcUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztBQW1CdkYsTUFBTSxPQUFPLE1BQU8sU0FBUSxlQUFlOzs7OztJQXFCdkMsWUFBWSxVQUFzQixFQUFVLGFBQTJCO1FBQ25FLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQURzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQW5CdkUsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVdyQyxjQUFTLEdBQWtCLENBQUMsQ0FBQztRQUtqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7O0lBZkQsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDakQsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFvQjtRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDOzs7O0lBVUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7OztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLE1BQWtCO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQXFCO1FBQzNCLHVDQUF1QztRQUN2QyxRQUFRLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDcEIsS0FBSyxLQUFLO2dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNoQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QztnQkFDRCxNQUFNO1lBQ1YsUUFBUTtTQUNYO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxJQUFZLFdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUMxQyxDQUFDOzs7WUExRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxTQUFTO2dCQUNuQiwrRUFBb0M7Z0JBRXBDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLDBCQUEwQixFQUFFLFVBQVU7b0JBQ3RDLHFCQUFxQixFQUFFLFVBQVU7b0JBQ2pDLGlCQUFpQixFQUFFLFVBQVU7b0JBQzdCLFdBQVcsRUFBRSxtQkFBbUI7b0JBQ2hDLFNBQVMsRUFBRSxpQkFBaUI7aUJBQy9COzthQUNKOzs7O1lBbENHLFVBQVU7WUFMTCxZQUFZOzs7dUJBeUNoQixLQUFLO3VCQUdMLEtBQUs7NkJBR0wsTUFBTTt1QkFHTixLQUFLOzs7O0lBVE4sMEJBQ2lCOztJQUVqQiwwQkFDaUI7O0lBRWpCLGdDQUM2Qzs7Ozs7SUFXN0MsMkJBQXFDOzs7OztJQUVELCtCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgT3V0cHV0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTUEFDRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDYW5Db2xvckN0b3IsIG1peGluQ29sb3IgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IGNsYXNzIE1jQ2FyZEJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNDYXJkQmFzZU1peGluOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNDYXJkQmFzZSA9IG1peGluQ29sb3IoTWNDYXJkQmFzZSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FyZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWNhcmQnLFxuICAgICAgICAnW2NsYXNzLm1jLWNhcmRfcmVhZG9ubHldJzogJ3JlYWRvbmx5JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgICAgICcoY2xpY2spJzogJ29uQ2xpY2soJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQ2FyZCBleHRlbmRzIE1jQ2FyZEJhc2VNaXhpbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgQElucHV0KClcbiAgICByZWFkb25seSA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpXG4gICAgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB0YWJJbmRleCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZG9ubHkgPyBudWxsIDogdGhpcy5fdGFiSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IHRhYkluZGV4KHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXg6IG51bWJlciB8IG51bGwgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhvc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgb25DbGljaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCghdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleURvd24oJGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBzd2l0Y2ggKCRldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KCF0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgaG9zdEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19
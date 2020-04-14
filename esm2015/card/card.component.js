/**
 * @fileoverview added by tsickle
 * Generated from: card.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left:4px solid transparent}.mc-card:focus{outline:0}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:0 0}.mc-card.mc-card_readonly{cursor:auto}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY2FyZC8iLCJzb3VyY2VzIjpbImNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCxNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pELE9BQU8sRUFBZ0IsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHbkUsTUFBTSxPQUFPLFVBQVU7Ozs7O0lBRW5CLFlBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztDQUNqRDs7O0lBRGUsaUNBQThCOzs7O0FBSTlDLE1BQU0sT0FBTyxlQUFlLEdBQXFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7QUFtQnZGLE1BQU0sT0FBTyxNQUFPLFNBQVEsZUFBZTs7Ozs7SUFxQnZDLFlBQVksVUFBc0IsRUFBVSxhQUEyQjtRQUNuRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFEc0Isa0JBQWEsR0FBYixhQUFhLENBQWM7UUFuQnZFLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFXckMsY0FBUyxHQUFrQixDQUFDLENBQUM7UUFLakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7OztJQWZELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBb0I7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7OztJQVVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxNQUFrQjtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxNQUFxQjtRQUMzQix1Q0FBdUM7UUFDdkMsUUFBUSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3BCLEtBQUssS0FBSztnQkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDaEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsTUFBTTtZQUNWLFFBQVE7U0FDWDtJQUNMLENBQUM7Ozs7O0lBRUQsSUFBWSxXQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDMUMsQ0FBQzs7O1lBMUVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsK0VBQW9DO2dCQUVwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxTQUFTO29CQUNoQiwwQkFBMEIsRUFBRSxVQUFVO29CQUN0QyxxQkFBcUIsRUFBRSxVQUFVO29CQUNqQyxpQkFBaUIsRUFBRSxVQUFVO29CQUM3QixXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxTQUFTLEVBQUUsaUJBQWlCO2lCQUMvQjs7YUFDSjs7OztZQWxDRyxVQUFVO1lBTEwsWUFBWTs7O3VCQXlDaEIsS0FBSzt1QkFHTCxLQUFLOzZCQUdMLE1BQU07dUJBR04sS0FBSzs7OztJQVROLDBCQUNpQjs7SUFFakIsMEJBQ2lCOztJQUVqQixnQ0FDNkM7Ozs7O0lBVzdDLDJCQUFxQzs7Ozs7SUFFRCwrQkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIE91dHB1dCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU1BBQ0UgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbmV4cG9ydCBjbGFzcyBNY0NhcmRCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jQ2FyZEJhc2VNaXhpbjogQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jQ2FyZEJhc2UgPSBtaXhpbkNvbG9yKE1jQ2FyZEJhc2UpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtY2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NhcmQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1jYXJkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jYXJkX3JlYWRvbmx5XSc6ICdyZWFkb25seScsXG4gICAgICAgICdbY2xhc3MubWMtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0NhcmQgZXh0ZW5kcyBNY0NhcmRCYXNlTWl4aW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHkgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRvbmx5ID8gbnVsbCA6IHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RhYkluZGV4OiBudW1iZXIgfCBudWxsID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmFsc2UpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3N0RWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoIXRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgc3dpdGNoICgkZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCghdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiJdfQ==
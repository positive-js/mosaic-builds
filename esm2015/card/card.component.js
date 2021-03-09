import { FocusMonitor } from '@angular/cdk/a11y';
import { Output, ChangeDetectionStrategy, Component, ElementRef, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';
export class McCardBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McCardBaseMixin = mixinColor(McCardBase);
export class McCard extends McCardBaseMixin {
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this._focusMonitor = _focusMonitor;
        this.readonly = false;
        this.selected = false;
        this.selectedChange = new EventEmitter();
        this._tabIndex = 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, false);
    }
    get tabIndex() {
        return this.readonly ? null : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value;
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    focus() {
        this.hostElement.focus();
    }
    onClick($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    }
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
                styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left:var(--mc-card-size-vertical-line,4px) solid transparent}.mc-card:focus{outline:none}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:transparent}.mc-card.mc-card_readonly{cursor:auto}"]
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILE1BQU0sRUFDTix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUduRSxNQUFNLE9BQU8sVUFBVTtJQUNuQiw2Q0FBNkM7SUFDN0MsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEO0FBRUQsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBcUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBbUJ4RixNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFxQnZDLFlBQVksVUFBc0IsRUFBVSxhQUEyQjtRQUNuRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFEc0Isa0JBQWEsR0FBYixhQUFhLENBQWM7UUFuQnZFLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFXckMsY0FBUyxHQUFrQixDQUFDLENBQUM7UUFLakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQWZELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFvQjtRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBVUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBa0I7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRXpCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFxQjtRQUMzQix1Q0FBdUM7UUFDdkMsUUFBUSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3BCLEtBQUssS0FBSztnQkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDaEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsTUFBTTtZQUNWLFFBQVE7U0FDWDtJQUNMLENBQUM7SUFFRCxJQUFZLFdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUMxQyxDQUFDOzs7WUExRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxTQUFTO2dCQUNuQiwrRUFBb0M7Z0JBRXBDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLDBCQUEwQixFQUFFLFVBQVU7b0JBQ3RDLHFCQUFxQixFQUFFLFVBQVU7b0JBQ2pDLGlCQUFpQixFQUFFLFVBQVU7b0JBQzdCLFdBQVcsRUFBRSxtQkFBbUI7b0JBQ2hDLFNBQVMsRUFBRSxpQkFBaUI7aUJBQy9COzthQUNKOzs7O1lBbENHLFVBQVU7WUFMTCxZQUFZOzs7dUJBeUNoQixLQUFLO3VCQUdMLEtBQUs7NkJBR0wsTUFBTTt1QkFHTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBPdXRwdXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNQQUNFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENhbkNvbG9yQ3RvciwgbWl4aW5Db2xvciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5leHBvcnQgY2xhc3MgTWNDYXJkQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0NhcmRCYXNlTWl4aW46IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY0NhcmRCYXNlID0gbWl4aW5Db2xvcihNY0NhcmRCYXNlKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWNhcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jYXJkLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnY29sb3InXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtY2FyZCcsXG4gICAgICAgICdbY2xhc3MubWMtY2FyZF9yZWFkb25seV0nOiAncmVhZG9ubHknLFxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhjbGljayknOiAnb25DbGljaygkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNDYXJkIGV4dGVuZHMgTWNDYXJkQmFzZU1peGluIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKVxuICAgIHJlYWRvbmx5ID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KClcbiAgICBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkb25seSA/IG51bGwgOiB0aGlzLl90YWJJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90YWJJbmRleDogbnVtYmVyIHwgbnVsbCA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG9zdEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KCF0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bigkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIHN3aXRjaCAoJGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoIXRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBob3N0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG4iXX0=
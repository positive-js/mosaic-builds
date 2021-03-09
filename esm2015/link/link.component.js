import { FocusMonitor } from '@angular/cdk/a11y';
import { Input, ElementRef, ChangeDetectorRef, Directive } from '@angular/core';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
export class McLinkBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
// tslint:disable-next-line: naming-convention
export const McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
export class McLink extends McLinkMixinBase {
    constructor(elementRef, focusMonitor, changeDetector) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.changeDetector = changeDetector;
        this._disabled = false;
        this.focusMonitor.monitor(elementRef.nativeElement, true);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.changeDetector.markForCheck();
        }
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    focus() {
        this.getHostElement().focus();
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
McLink.decorators = [
    { type: Directive, args: [{
                selector: 'a.mc-link',
                exportAs: 'mcLink',
                inputs: ['tabIndex'],
                host: {
                    '[attr.disabled]': 'disabled || null',
                    '[attr.tabindex]': 'tabIndex'
                }
            },] }
];
/** @nocollapse */
McLink.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef }
];
McLink.propDecorators = {
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvbGluay9saW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILEtBQUssRUFDTCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNiLGFBQWEsRUFDYixTQUFTLEVBQ1osTUFBTSx5QkFBeUIsQ0FBQztBQUdqQyxNQUFNLE9BQU8sVUFBVTtJQUNuQixZQUFtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztDQUNoRDtBQUVELDhDQUE4QztBQUM5QyxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQ0osYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBWWpFLE1BQU0sT0FBTyxNQUFPLFNBQVEsZUFBZTtJQWlCdkMsWUFDSSxVQUFzQixFQUNkLFlBQTBCLEVBQzFCLGNBQWlDO1FBRXpDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUhWLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUxyQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBU3RCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQXhCRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQVU7UUFDbkIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFjRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQzs7O1lBL0NKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsSUFBSSxFQUFFO29CQUNGLGlCQUFpQixFQUFFLGtCQUFrQjtvQkFDckMsaUJBQWlCLEVBQUUsVUFBVTtpQkFDaEM7YUFDSjs7OztZQTlCRyxVQUFVO1lBSEwsWUFBWTtZQUtqQixpQkFBaUI7Ozt1QkErQmhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIElucHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIERpcmVjdGl2ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXgsIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgdG9Cb29sZWFuXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5leHBvcnQgY2xhc3MgTWNMaW5rQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0xpbmtNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNMaW5rQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY0xpbmtCYXNlKSk7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYS5tYy1saW5rJyxcbiAgICBleHBvcnRBczogJ21jTGluaycsXG4gICAgaW5wdXRzOiBbJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4J1xuICAgIH1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNY0xpbmsgZXh0ZW5kcyBNY0xpbmtNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEhhc1RhYkluZGV4LCBDYW5EaXNhYmxlIHtcbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdG9Cb29sZWFuKHZhbHVlKTtcblxuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19
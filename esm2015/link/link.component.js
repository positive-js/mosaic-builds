import { FocusMonitor } from '@angular/cdk/a11y';
import { Input, ElementRef, ChangeDetectorRef, Directive, ContentChild } from '@angular/core';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
export class McLinkBase {
}
// tslint:disable-next-line: naming-convention
export const McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
export const baseURLRegex = /^http(s)?:\/\//;
export class McLink extends McLinkMixinBase {
    constructor(elementRef, focusMonitor, changeDetector) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.changeDetector = changeDetector;
        this._disabled = false;
        this._pseudo = false;
        this._noUnderline = false;
        this._useVisited = false;
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
    get pseudo() {
        return this._pseudo;
    }
    set pseudo(value) {
        this._pseudo = toBoolean(value);
    }
    get noUnderline() {
        return this._noUnderline;
    }
    set noUnderline(value) {
        this._noUnderline = toBoolean(value);
    }
    get useVisited() {
        return this._useVisited;
    }
    set useVisited(value) {
        this._useVisited = toBoolean(value);
    }
    get hasIcon() {
        return !!this.icon;
    }
    get print() {
        var _a;
        return this._print || ((_a = this.getHostElement().href) === null || _a === void 0 ? void 0 : _a.replace(baseURLRegex, ''));
    }
    set print(value) {
        this.printMode = toBoolean(value);
        this._print = value;
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
                selector: '[mc-link]',
                exportAs: 'mcLink',
                inputs: ['tabIndex'],
                host: {
                    class: 'mc-link',
                    '[class.mc-link_no-underline]': 'noUnderline',
                    '[class.mc-link_use-visited]': 'useVisited',
                    '[class.mc-link_pseudo]': 'pseudo',
                    '[class.mc-link_print]': 'printMode',
                    '[class.mc-text-only]': '!hasIcon',
                    '[class.mc-text-with-icon]': 'hasIcon',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.print]': 'print'
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
    disabled: [{ type: Input }],
    pseudo: [{ type: Input }],
    noUnderline: [{ type: Input }],
    useVisited: [{ type: Input }],
    print: [{ type: Input }],
    icon: [{ type: ContentChild, args: [McIcon,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvbGluay9saW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILEtBQUssRUFDTCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUtILGFBQWEsRUFDYixhQUFhLEVBQ2IsU0FBUyxFQUNaLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR2pELE1BQU0sT0FBTyxVQUFVO0NBQUc7QUFFMUIsOENBQThDO0FBQzlDLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FDSixhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFFakUsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDO0FBb0I3QyxNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUF1RXZDLFlBQ1ksVUFBc0IsRUFDdEIsWUFBMEIsRUFDMUIsY0FBaUM7UUFFekMsS0FBSyxFQUFFLENBQUM7UUFKQSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQTNEckMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVdsQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBV2hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBV3JCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBOEJ4QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUE5RUQsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFVO1FBQ25CLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBSUQsSUFDSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFJRCxJQUNJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLEtBQVU7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUlELElBQ0ksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxVQUFVLENBQUMsS0FBVTtRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBSUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFDSSxLQUFLOztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sV0FBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSwwQ0FBRSxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFVO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFrQkQsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3pDLENBQUM7OztZQTdHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsU0FBUztvQkFDaEIsOEJBQThCLEVBQUUsYUFBYTtvQkFDN0MsNkJBQTZCLEVBQUUsWUFBWTtvQkFDM0Msd0JBQXdCLEVBQUUsUUFBUTtvQkFDbEMsdUJBQXVCLEVBQUUsV0FBVztvQkFDcEMsc0JBQXNCLEVBQUUsVUFBVTtvQkFDbEMsMkJBQTJCLEVBQUUsU0FBUztvQkFDdEMsaUJBQWlCLEVBQUUsa0JBQWtCO29CQUNyQyxpQkFBaUIsRUFBRSxVQUFVO29CQUM3QixjQUFjLEVBQUUsT0FBTztpQkFDMUI7YUFDSjs7OztZQTFDRyxVQUFVO1lBSEwsWUFBWTtZQUtqQixpQkFBaUI7Ozt1QkEyQ2hCLEtBQUs7cUJBZ0JMLEtBQUs7MEJBV0wsS0FBSzt5QkFXTCxLQUFLO29CQWVMLEtBQUs7bUJBZUwsWUFBWSxTQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIElucHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgSGFzVGFiSW5kZXgsXG4gICAgSGFzVGFiSW5kZXhDdG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICB0b0Jvb2xlYW5cbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5cbmV4cG9ydCBjbGFzcyBNY0xpbmtCYXNlIHt9XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0xpbmtNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNMaW5rQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY0xpbmtCYXNlKSk7XG5cbmV4cG9ydCBjb25zdCBiYXNlVVJMUmVnZXggPSAvXmh0dHAocyk/OlxcL1xcLy87XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLWxpbmtdJyxcbiAgICBleHBvcnRBczogJ21jTGluaycsXG4gICAgaW5wdXRzOiBbJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWxpbmsnLFxuICAgICAgICAnW2NsYXNzLm1jLWxpbmtfbm8tdW5kZXJsaW5lXSc6ICdub1VuZGVybGluZScsXG4gICAgICAgICdbY2xhc3MubWMtbGlua191c2UtdmlzaXRlZF0nOiAndXNlVmlzaXRlZCcsXG4gICAgICAgICdbY2xhc3MubWMtbGlua19wc2V1ZG9dJzogJ3BzZXVkbycsXG4gICAgICAgICdbY2xhc3MubWMtbGlua19wcmludF0nOiAncHJpbnRNb2RlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10ZXh0LW9ubHldJzogJyFoYXNJY29uJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10ZXh0LXdpdGgtaWNvbl0nOiAnaGFzSWNvbicsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIucHJpbnRdJzogJ3ByaW50J1xuICAgIH1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNY0xpbmsgZXh0ZW5kcyBNY0xpbmtNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEhhc1RhYkluZGV4LCBDYW5EaXNhYmxlIHtcbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdG9Cb29sZWFuKHZhbHVlKTtcblxuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBwc2V1ZG8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wc2V1ZG87XG4gICAgfVxuXG4gICAgc2V0IHBzZXVkbyh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3BzZXVkbyA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHNldWRvID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBub1VuZGVybGluZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vVW5kZXJsaW5lO1xuICAgIH1cblxuICAgIHNldCBub1VuZGVybGluZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX25vVW5kZXJsaW5lID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9ub1VuZGVybGluZSA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdXNlVmlzaXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZVZpc2l0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHVzZVZpc2l0ZWQodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl91c2VWaXNpdGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91c2VWaXNpdGVkID0gZmFsc2U7XG5cbiAgICBnZXQgaGFzSWNvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5pY29uO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHByaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJpbnQgfHwgdGhpcy5nZXRIb3N0RWxlbWVudCgpLmhyZWY/LnJlcGxhY2UoYmFzZVVSTFJlZ2V4LCAnJyk7XG4gICAgfVxuXG4gICAgc2V0IHByaW50KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5wcmludE1vZGUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX3ByaW50ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHJpbnQ6IHN0cmluZztcblxuICAgIHByaW50TW9kZTogYm9vbGVhbjtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNJY29uKSBpY29uOiBNY0ljb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiJdfQ==
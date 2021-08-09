import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { McNavbarItemBase } from './navbar-item.component';
import { toggleVerticalNavbarAnimation } from './vertical-navbar.animation';
export class McVerticalNavbar {
    constructor() {
        this._expanded = false;
        this.setItemsState = () => {
            var _a;
            (_a = this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.vertical = true);
        };
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        this._expanded = coerceBooleanProperty(value);
        this.setClosedStateForItems(value);
    }
    toggle() {
        this.expanded = !this.expanded;
    }
    ngAfterContentInit() {
        this.setItemsState();
        this.setClosedStateForItems(this.expanded);
        this.navbarBaseItems.changes
            .subscribe(this.setItemsState);
    }
    setClosedStateForItems(value) {
        var _a;
        (_a = this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            item.closed = !value;
            setTimeout(() => { var _a; return (_a = item.button) === null || _a === void 0 ? void 0 : _a.updateClassModifierForIcons(); });
        });
    }
}
McVerticalNavbar.decorators = [
    { type: Component, args: [{
                selector: 'mc-vertical-navbar',
                exportAs: 'McVerticalNavbar',
                template: `
        <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
        <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
    `,
                host: {
                    class: 'mc-vertical-navbar',
                    '[class.mc-closed]': '!expanded',
                    '[class.mc-opened]': 'expanded',
                    '[@toggle]': 'expanded'
                },
                animations: [toggleVerticalNavbarAnimation()],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-vertical-navbar{display:flex;flex-direction:column}.mc-vertical-navbar .mc-navbar-container{flex-direction:column;align-items:unset}.mc-vertical-navbar.mc-opened{width:var(--mc-vertical-navbar-size-states-opened-width,240px)}.mc-vertical-navbar.mc-closed{width:var(--mc-vertical-navbar-size-states-closed-width,48px)}"]
            },] }
];
McVerticalNavbar.propDecorators = {
    expanded: [{ type: Input }],
    navbarBaseItems: [{ type: ContentChildren, args: [McNavbarItemBase, { descendants: true },] }]
};
export class McNavbarToggleBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McNavbarToggleMixinBase = mixinTabIndex(mixinDisabled(McNavbarToggleBase));
export class McNavbarToggle extends McNavbarToggleMixinBase {
    constructor(mcNavbar, focusMonitor, elementRef) {
        super(elementRef);
        this.mcNavbar = mcNavbar;
        this.focusMonitor = focusMonitor;
        this.elementRef = elementRef;
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    ngAfterContentInit() {
        this.focusMonitor.monitor(this.elementRef.nativeElement, true);
    }
}
McNavbarToggle.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar-toggle',
                template: `
        <i mc-icon
           [class.mc-angle-left-M_16]="mcNavbar.expanded"
           [class.mc-angle-right-M_16]="!mcNavbar.expanded"
           *ngIf="!customIcon">
        </i>

        <ng-content select="[mc-icon]"></ng-content>
        <ng-content select="mc-navbar-title" *ngIf="mcNavbar.expanded"></ng-content>
    `,
                host: {
                    class: 'mc-navbar-item mc-navbar-toggle mc-vertical',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null'
                },
                inputs: ['tabIndex'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-navbar{position:relative}.mc-navbar,.mc-navbar-container{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{flex-shrink:0}"]
            },] }
];
/** @nocollapse */
McNavbarToggle.ctorParameters = () => [
    { type: McVerticalNavbar },
    { type: FocusMonitor },
    { type: ElementRef }
];
McNavbarToggle.propDecorators = {
    customIcon: [{ type: ContentChild, args: [McIcon,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFtQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBcUI1RSxNQUFNLE9BQU8sZ0JBQWdCO0lBbEI3QjtRQThCWSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBdUIzQixrQkFBYSxHQUFHLEdBQUcsRUFBRTs7WUFDekIsTUFBQSxJQUFJLENBQUMsZUFBZSwwQ0FBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFO1FBQ2xFLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFyQ0csSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUNJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENB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VUFBVTs7O3lCQXVHVCxZQUFZLFNBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlQ3RvciwgSGFzVGFiSW5kZXhDdG9yLCBtaXhpbkRpc2FibGVkLCBtaXhpblRhYkluZGV4IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5pbXBvcnQgeyBNY05hdmJhckl0ZW1CYXNlIH0gZnJvbSAnLi9uYXZiYXItaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgdG9nZ2xlVmVydGljYWxOYXZiYXJBbmltYXRpb24gfSBmcm9tICcuL3ZlcnRpY2FsLW5hdmJhci5hbmltYXRpb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdmVydGljYWwtbmF2YmFyJyxcbiAgICBleHBvcnRBczogJ01jVmVydGljYWxOYXZiYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItY29udGFpbmVyXSwgbWMtbmF2YmFyLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLW5hdmJhci10b2dnbGVdLCBtYy1uYXZiYXItdG9nZ2xlXCI+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vdmVydGljYWwtbmF2YmFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jbG9zZWRdJzogJyFleHBhbmRlZCcsXG4gICAgICAgICdbY2xhc3MubWMtb3BlbmVkXSc6ICdleHBhbmRlZCcsXG4gICAgICAgICdbQHRvZ2dsZV0nOiAnZXhwYW5kZWQnXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiBbdG9nZ2xlVmVydGljYWxOYXZiYXJBbmltYXRpb24oKV0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgZ2V0IGV4cGFuZGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc2V0Q2xvc2VkU3RhdGVGb3JJdGVtcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNOYXZiYXJJdGVtQmFzZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBuYXZiYXJCYXNlSXRlbXM6IFF1ZXJ5TGlzdDxNY05hdmJhckl0ZW1CYXNlPjtcblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRJdGVtc1N0YXRlKCk7XG4gICAgICAgIHRoaXMuc2V0Q2xvc2VkU3RhdGVGb3JJdGVtcyh0aGlzLmV4cGFuZGVkKTtcblxuICAgICAgICB0aGlzLm5hdmJhckJhc2VJdGVtcy5jaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuc2V0SXRlbXNTdGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDbG9zZWRTdGF0ZUZvckl0ZW1zKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubmF2YmFyQmFzZUl0ZW1zPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsb3NlZCA9ICF2YWx1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaXRlbS5idXR0b24/LnVwZGF0ZUNsYXNzTW9kaWZpZXJGb3JJY29ucygpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJdGVtc1N0YXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLm5hdmJhckJhc2VJdGVtcz8uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS52ZXJ0aWNhbCA9IHRydWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyVG9nZ2xlQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY05hdmJhclRvZ2dsZU1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJlxuICAgIHR5cGVvZiBNY05hdmJhclRvZ2dsZUJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNOYXZiYXJUb2dnbGVCYXNlKSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLXRvZ2dsZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGkgbWMtaWNvblxuICAgICAgICAgICBbY2xhc3MubWMtYW5nbGUtbGVmdC1NXzE2XT1cIm1jTmF2YmFyLmV4cGFuZGVkXCJcbiAgICAgICAgICAgW2NsYXNzLm1jLWFuZ2xlLXJpZ2h0LU1fMTZdPVwiIW1jTmF2YmFyLmV4cGFuZGVkXCJcbiAgICAgICAgICAgKm5nSWY9XCIhY3VzdG9tSWNvblwiPlxuICAgICAgICA8L2k+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLWljb25dXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtYy1uYXZiYXItdGl0bGVcIiAqbmdJZj1cIm1jTmF2YmFyLmV4cGFuZGVkXCI+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2YmFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWl0ZW0gbWMtbmF2YmFyLXRvZ2dsZSBtYy12ZXJ0aWNhbCcsXG5cbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCdcbiAgICB9LFxuICAgIGlucHV0czogWyd0YWJJbmRleCddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUb2dnbGUgZXh0ZW5kcyBNY05hdmJhclRvZ2dsZU1peGluQmFzZSB7XG4gICAgQENvbnRlbnRDaGlsZChNY0ljb24pIGN1c3RvbUljb246IE1jSWNvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbWNOYXZiYXI6IE1jVmVydGljYWxOYXZiYXIsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gICAgfVxufVxuIl19
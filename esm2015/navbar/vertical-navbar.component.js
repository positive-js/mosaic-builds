import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { McNavbarItemBase } from './navbar-item.component';
import { toggleVerticalNavbarAnimation } from './vertical-navbar.animation';
export class McVerticalNavbar {
    constructor() {
        this._expanded = false;
        this.setItemsState = () => {
            this.navbarBaseItems.forEach((item) => item.vertical = true);
        };
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        this._expanded = value;
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
        this.navbarBaseItems.forEach((item) => {
            item.closed = value;
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
                    '[class.mc-closed]': 'expanded',
                    '[class.mc-opened]': '!expanded',
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
           [class.mc-angle-left-M_16]="!mcNavbar.expanded"
           [class.mc-angle-right-M_16]="mcNavbar.expanded"
           *ngIf="!customIcon">
        </i>

        <ng-content select="[mc-icon]"></ng-content>
        <ng-content select="mc-navbar-title" *ngIf="!mcNavbar.expanded"></ng-content>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFtQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBcUI1RSxNQUFNLE9BQU8sZ0JBQWdCO0lBbEI3QjtRQThCWSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBdUIzQixrQkFBYSxHQUFHLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUE7SUFDTCxDQUFDO0lBckNHLElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFDSSxRQUFRLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV2QixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU1ELE1B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fSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlQ3RvciwgSGFzVGFiSW5kZXhDdG9yLCBtaXhpbkRpc2FibGVkLCBtaXhpblRhYkluZGV4IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5pbXBvcnQgeyBNY05hdmJhckl0ZW1CYXNlIH0gZnJvbSAnLi9uYXZiYXItaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgdG9nZ2xlVmVydGljYWxOYXZiYXJBbmltYXRpb24gfSBmcm9tICcuL3ZlcnRpY2FsLW5hdmJhci5hbmltYXRpb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdmVydGljYWwtbmF2YmFyJyxcbiAgICBleHBvcnRBczogJ01jVmVydGljYWxOYXZiYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItY29udGFpbmVyXSwgbWMtbmF2YmFyLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLW5hdmJhci10b2dnbGVdLCBtYy1uYXZiYXItdG9nZ2xlXCI+PC9uZy1jb250ZW50PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vdmVydGljYWwtbmF2YmFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdmVydGljYWwtbmF2YmFyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jbG9zZWRdJzogJ2V4cGFuZGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1vcGVuZWRdJzogJyFleHBhbmRlZCcsXG4gICAgICAgICdbQHRvZ2dsZV0nOiAnZXhwYW5kZWQnXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiBbdG9nZ2xlVmVydGljYWxOYXZiYXJBbmltYXRpb24oKV0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1ZlcnRpY2FsTmF2YmFyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgZ2V0IGV4cGFuZGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnNldENsb3NlZFN0YXRlRm9ySXRlbXModmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jTmF2YmFySXRlbUJhc2UsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbmF2YmFyQmFzZUl0ZW1zOiBRdWVyeUxpc3Q8TWNOYXZiYXJJdGVtQmFzZT47XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbXNTdGF0ZSgpO1xuICAgICAgICB0aGlzLnNldENsb3NlZFN0YXRlRm9ySXRlbXModGhpcy5leHBhbmRlZCk7XG5cbiAgICAgICAgdGhpcy5uYXZiYXJCYXNlSXRlbXMuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnNldEl0ZW1zU3RhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2xvc2VkU3RhdGVGb3JJdGVtcyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm5hdmJhckJhc2VJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsb3NlZCA9IHZhbHVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBpdGVtLmJ1dHRvbj8udXBkYXRlQ2xhc3NNb2RpZmllckZvckljb25zKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEl0ZW1zU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubmF2YmFyQmFzZUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0udmVydGljYWwgPSB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNY05hdmJhclRvZ2dsZUJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNOYXZiYXJUb2dnbGVNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNOYXZiYXJUb2dnbGVCYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1jTmF2YmFyVG9nZ2xlQmFzZSkpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci10b2dnbGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIG1jLWljb25cbiAgICAgICAgICAgW2NsYXNzLm1jLWFuZ2xlLWxlZnQtTV8xNl09XCIhbWNOYXZiYXIuZXhwYW5kZWRcIlxuICAgICAgICAgICBbY2xhc3MubWMtYW5nbGUtcmlnaHQtTV8xNl09XCJtY05hdmJhci5leHBhbmRlZFwiXG4gICAgICAgICAgICpuZ0lmPVwiIWN1c3RvbUljb25cIj5cbiAgICAgICAgPC9pPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1pY29uXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtbmF2YmFyLXRpdGxlXCIgKm5nSWY9XCIhbWNOYXZiYXIuZXhwYW5kZWRcIj48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9uYXZiYXIuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItaXRlbSBtYy1uYXZiYXItdG9nZ2xlIG1jLXZlcnRpY2FsJyxcblxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH0sXG4gICAgaW5wdXRzOiBbJ3RhYkluZGV4J10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhclRvZ2dsZSBleHRlbmRzIE1jTmF2YmFyVG9nZ2xlTWl4aW5CYXNlIHtcbiAgICBAQ29udGVudENoaWxkKE1jSWNvbikgY3VzdG9tSWNvbjogTWNJY29uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBtY05hdmJhcjogTWNWZXJ0aWNhbE5hdmJhcixcbiAgICAgICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG59XG4iXX0=
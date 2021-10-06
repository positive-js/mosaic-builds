import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { McNavbarItemBase } from './navbar-item.component';
import { toggleVerticalNavbarAnimation } from './vertical-navbar.animation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@ptsecurity/mosaic/icon";
import * as i3 from "@angular/common";
export class McVerticalNavbar {
    constructor() {
        this._expanded = false;
        this.setItemsState = () => {
            Promise.resolve().then(() => { var _a; return (_a = this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.vertical = true); });
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
/** @nocollapse */ McVerticalNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McVerticalNavbar, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McVerticalNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McVerticalNavbar, selector: "mc-vertical-navbar", inputs: { expanded: "expanded" }, host: { properties: { "class.mc-closed": "!expanded", "class.mc-opened": "expanded", "@toggle": "expanded" }, classAttribute: "mc-vertical-navbar" }, queries: [{ propertyName: "navbarBaseItems", predicate: McNavbarItemBase, descendants: true }], exportAs: ["McVerticalNavbar"], ngImport: i0, template: `
        <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
        <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
    `, isInline: true, styles: [".mc-vertical-navbar{display:flex;flex-direction:column}.mc-vertical-navbar .mc-navbar-container{flex-direction:column;align-items:unset}.mc-vertical-navbar.mc-opened{width:240px;width:var(--mc-vertical-navbar-size-states-opened-width, 240px)}.mc-vertical-navbar.mc-closed{width:48px;width:var(--mc-vertical-navbar-size-states-closed-width, 48px)}\n"], animations: [toggleVerticalNavbarAnimation()], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McVerticalNavbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-vertical-navbar',
                    exportAs: 'McVerticalNavbar',
                    template: `
        <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
        <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
    `,
                    styleUrls: ['./vertical-navbar.scss'],
                    host: {
                        class: 'mc-vertical-navbar',
                        '[class.mc-closed]': '!expanded',
                        '[class.mc-opened]': 'expanded',
                        '[@toggle]': 'expanded'
                    },
                    animations: [toggleVerticalNavbarAnimation()],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { expanded: [{
                type: Input
            }], navbarBaseItems: [{
                type: ContentChildren,
                args: [McNavbarItemBase, { descendants: true }]
            }] } });
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
/** @nocollapse */ McNavbarToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarToggle, deps: [{ token: McVerticalNavbar }, { token: i1.FocusMonitor }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McNavbarToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarToggle, selector: "mc-navbar-toggle", inputs: { tabIndex: "tabIndex" }, host: { properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" }, classAttribute: "mc-navbar-item mc-navbar-toggle mc-vertical" }, queries: [{ propertyName: "customIcon", first: true, predicate: McIcon, descendants: true }], usesInheritance: true, ngImport: i0, template: `
        <i mc-icon
           [class.mc-angle-left-M_16]="mcNavbar.expanded"
           [class.mc-angle-right-M_16]="!mcNavbar.expanded"
           *ngIf="!customIcon">
        </i>

        <ng-content select="[mc-icon]"></ng-content>
        <ng-content select="mc-navbar-title" *ngIf="mcNavbar.expanded"></ng-content>
    `, isInline: true, styles: [".mc-navbar{position:relative;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}\n"], components: [{ type: i2.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarToggle, decorators: [{
            type: Component,
            args: [{
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
                    styleUrls: ['./navbar.scss'],
                    host: {
                        class: 'mc-navbar-item mc-navbar-toggle mc-vertical',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null'
                    },
                    inputs: ['tabIndex'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: McVerticalNavbar }, { type: i1.FocusMonitor }, { type: i0.ElementRef }]; }, propDecorators: { customIcon: [{
                type: ContentChild,
                args: [McIcon]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFtQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7OztBQXFCNUUsTUFBTSxPQUFPLGdCQUFnQjtJQWxCN0I7UUE4QlksY0FBUyxHQUFZLEtBQUssQ0FBQztRQXVCM0Isa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDekIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBQyxPQUFBLE1BQUEsSUFBSSxDQUFDLGVBQWUsMENBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFBLEVBQUEsQ0FBQyxDQUFDO1FBQ2hHLENBQUMsQ0FBQTtLQUNKO0lBckNHLElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lB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QlY7Ozs7Ozs7OztLQVNUOzJGQVlRLGNBQWM7a0JBdkIxQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7O0tBU1Q7b0JBQ0QsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUM1QixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLDZDQUE2Qzt3QkFFcEQsaUJBQWlCLEVBQUUsVUFBVTt3QkFDN0IsaUJBQWlCLEVBQUUsa0JBQWtCO3FCQUN4QztvQkFDRCxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7MERBS3dCLGdCQUFnQiw4RUFIZixVQUFVO3NCQUEvQixZQUFZO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZUN0b3IsIEhhc1RhYkluZGV4Q3RvciwgbWl4aW5EaXNhYmxlZCwgbWl4aW5UYWJJbmRleCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jSWNvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHsgTWNOYXZiYXJJdGVtQmFzZSB9IGZyb20gJy4vbmF2YmFyLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IHRvZ2dsZVZlcnRpY2FsTmF2YmFyQW5pbWF0aW9uIH0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXIuYW5pbWF0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhcicsXG4gICAgZXhwb3J0QXM6ICdNY1ZlcnRpY2FsTmF2YmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWMtbmF2YmFyLWNvbnRhaW5lcl0sIG1jLW5hdmJhci1jb250YWluZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItdG9nZ2xlXSwgbWMtbmF2YmFyLXRvZ2dsZVwiPjwvbmctY29udGVudD5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL3ZlcnRpY2FsLW5hdmJhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXZlcnRpY2FsLW5hdmJhcicsXG4gICAgICAgICdbY2xhc3MubWMtY2xvc2VkXSc6ICchZXhwYW5kZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLW9wZW5lZF0nOiAnZXhwYW5kZWQnLFxuICAgICAgICAnW0B0b2dnbGVdJzogJ2V4cGFuZGVkJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uczogW3RvZ2dsZVZlcnRpY2FsTmF2YmFyQW5pbWF0aW9uKCldLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNWZXJ0aWNhbE5hdmJhciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIGdldCBleHBhbmRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGV4cGFuZGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2V4cGFuZGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICB0aGlzLnNldENsb3NlZFN0YXRlRm9ySXRlbXModmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jTmF2YmFySXRlbUJhc2UsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbmF2YmFyQmFzZUl0ZW1zOiBRdWVyeUxpc3Q8TWNOYXZiYXJJdGVtQmFzZT47XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbXNTdGF0ZSgpO1xuICAgICAgICB0aGlzLnNldENsb3NlZFN0YXRlRm9ySXRlbXModGhpcy5leHBhbmRlZCk7XG5cbiAgICAgICAgdGhpcy5uYXZiYXJCYXNlSXRlbXMuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnNldEl0ZW1zU3RhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2xvc2VkU3RhdGVGb3JJdGVtcyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm5hdmJhckJhc2VJdGVtcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jbG9zZWQgPSAhdmFsdWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGl0ZW0uYnV0dG9uPy51cGRhdGVDbGFzc01vZGlmaWVyRm9ySWNvbnMoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXRlbXNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLm5hdmJhckJhc2VJdGVtcz8uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS52ZXJ0aWNhbCA9IHRydWUpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNY05hdmJhclRvZ2dsZUJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNOYXZiYXJUb2dnbGVNaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNOYXZiYXJUb2dnbGVCYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1jTmF2YmFyVG9nZ2xlQmFzZSkpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci10b2dnbGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIG1jLWljb25cbiAgICAgICAgICAgW2NsYXNzLm1jLWFuZ2xlLWxlZnQtTV8xNl09XCJtY05hdmJhci5leHBhbmRlZFwiXG4gICAgICAgICAgIFtjbGFzcy5tYy1hbmdsZS1yaWdodC1NXzE2XT1cIiFtY05hdmJhci5leHBhbmRlZFwiXG4gICAgICAgICAgICpuZ0lmPVwiIWN1c3RvbUljb25cIj5cbiAgICAgICAgPC9pPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1pY29uXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtbmF2YmFyLXRpdGxlXCIgKm5nSWY9XCJtY05hdmJhci5leHBhbmRlZFwiPjwvbmctY29udGVudD5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL25hdmJhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1pdGVtIG1jLW5hdmJhci10b2dnbGUgbWMtdmVydGljYWwnLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnXG4gICAgfSxcbiAgICBpbnB1dHM6IFsndGFiSW5kZXgnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyVG9nZ2xlIGV4dGVuZHMgTWNOYXZiYXJUb2dnbGVNaXhpbkJhc2Uge1xuICAgIEBDb250ZW50Q2hpbGQoTWNJY29uKSBjdXN0b21JY29uOiBNY0ljb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIG1jTmF2YmFyOiBNY1ZlcnRpY2FsTmF2YmFyLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cbn1cbiJdfQ==
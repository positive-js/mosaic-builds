import { ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, QueryList, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { McNavbarItem, McNavbarItemBase } from './navbar-item.component';
export class McNavbarContainer {
}
McNavbarContainer.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-container',
                host: {
                    class: 'mc-navbar-container'
                }
            },] }
];
export class McNavbar {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.resizeStream = new Subject();
        this.resizeDebounceInterval = 100;
        this.updateCollapsed = () => {
            const collapseDelta = this.totalItemsWidth - this.width;
            const needCollapse = collapseDelta > 0;
            if (needCollapse) {
                this.collapseItems(collapseDelta);
            }
            else {
                this.unCollapseItems(collapseDelta);
            }
        };
        this.setItemsState = () => {
            Promise.resolve().then(() => { var _a; return (_a = this.navbarBaseItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.horizontal = true); });
        };
        this.resizeSubscription = this.resizeStream
            .pipe(debounceTime(this.resizeDebounceInterval))
            .subscribe(this.updateCollapsed);
    }
    get width() {
        return this.elementRef.nativeElement.getBoundingClientRect().width;
    }
    get totalItemsWidth() {
        return this.navbarBaseItems
            .reduce((acc, item) => acc + item.getOuterElementWidth(), 0);
    }
    get collapsableItems() {
        return this.navbarItems
            .toArray()
            .filter((item) => item.icon && item.title && item.collapsable)
            .reverse();
    }
    ngAfterContentInit() {
        this.setItemsState();
        this.navbarBaseItems.changes
            .subscribe(this.setItemsState);
    }
    ngAfterViewInit() {
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(this.updateCollapsed);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
    collapseItems(collapseDelta) {
        let delta = collapseDelta;
        const unCollapsedItems = this.collapsableItems
            .filter((item) => !item.collapsed);
        for (const item of unCollapsedItems) {
            item.collapsed = true;
            delta -= item.getTitleWidth();
            if (delta < 0) {
                break;
            }
        }
    }
    unCollapseItems(collapseDelta) {
        let delta = collapseDelta;
        this.collapsableItems
            .filter((item) => item.collapsed)
            .forEach((item) => {
            if (delta + item.getTitleWidth() < 0) {
                item.collapsed = false;
                delta += item.getTitleWidth();
            }
        });
    }
}
McNavbar.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar',
                template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`,
                host: {
                    class: 'mc-navbar',
                    '(window:resize)': 'resizeStream.next($event)'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-navbar{position:relative}.mc-navbar,.mc-navbar-container{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{flex-shrink:0}"]
            },] }
];
/** @nocollapse */
McNavbar.ctorParameters = () => [
    { type: ElementRef }
];
McNavbar.propDecorators = {
    navbarBaseItems: [{ type: ContentChildren, args: [McNavbarItemBase, { descendants: true },] }],
    navbarItems: [{ type: ContentChildren, args: [McNavbarItem, { descendants: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFZekUsTUFBTSxPQUFPLGlCQUFpQjs7O1lBTjdCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjtpQkFDL0I7YUFDSjs7QUFjRCxNQUFNLE9BQU8sUUFBUTtJQTJCakIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXRCakMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUyxDQUFDO1FBRTVCLDJCQUFzQixHQUFXLEdBQUcsQ0FBQztRQTJDdEQsb0JBQWUsR0FBRyxHQUFHLEVBQUU7WUFDbkIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXhELE1BQU0sWUFBWSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFFdkMsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0ws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QVEsRUFBRSwrRUFBK0U7Z0JBRXpGLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsV0FBVztvQkFDbEIsaUJBQWlCLEVBQUUsMkJBQTJCO2lCQUNqRDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBaENHLFVBQVU7Ozs4QkFrQ1QsZUFBZSxTQUFDLGdCQUFnQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTswQkFFdkQsZUFBZSxTQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNOYXZiYXJJdGVtLCBNY05hdmJhckl0ZW1CYXNlIH0gZnJvbSAnLi9uYXZiYXItaXRlbS5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB0eXBlIE1jTmF2YmFyQ29udGFpbmVyUG9zaXRpb25UeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1jb250YWluZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItY29udGFpbmVyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJDb250YWluZXIge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXInLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLW5hdmJhci1jb250YWluZXJdLCBtYy1uYXZiYXItY29udGFpbmVyXCI+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2YmFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyJyxcbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICdyZXNpemVTdHJlYW0ubmV4dCgkZXZlbnQpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY05hdmJhckl0ZW1CYXNlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG5hdmJhckJhc2VJdGVtczogUXVlcnlMaXN0PE1jTmF2YmFySXRlbUJhc2U+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY05hdmJhckl0ZW0sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbmF2YmFySXRlbXM6IFF1ZXJ5TGlzdDxNY05hdmJhckl0ZW0+O1xuXG4gICAgcmVhZG9ubHkgcmVzaXplU3RyZWFtID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcblxuICAgIHByaXZhdGUgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0b3RhbEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2YmFyQmFzZUl0ZW1zXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0uZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKSwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgY29sbGFwc2FibGVJdGVtcygpOiBNY05hdmJhckl0ZW1bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmJhckl0ZW1zXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmljb24gJiYgaXRlbS50aXRsZSAmJiBpdGVtLmNvbGxhcHNhYmxlKVxuICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTdHJlYW1cbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSh0aGlzLnJlc2l6ZURlYm91bmNlSW50ZXJ2YWwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnVwZGF0ZUNvbGxhcHNlZCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEl0ZW1zU3RhdGUoKTtcblxuICAgICAgICB0aGlzLm5hdmJhckJhc2VJdGVtcy5jaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuc2V0SXRlbXNTdGF0ZSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBOb3RlOiB0aGlzIHdhaXQgaXMgcmVxdWlyZWQgZm9yIGxvYWRpbmcgYW5kIHJlbmRlcmluZyBmb250cyBmb3IgaWNvbnM7XG4gICAgICAgIC8vIHVuZm9ydHVuYXRlbHkgd2UgY2Fubm90IGNvbnRyb2wgZm9udCByZW5kZXJpbmdcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZUNvbGxhcHNlZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sbGFwc2VkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2xsYXBzZURlbHRhID0gdGhpcy50b3RhbEl0ZW1zV2lkdGggLSB0aGlzLndpZHRoO1xuXG4gICAgICAgIGNvbnN0IG5lZWRDb2xsYXBzZSA9IGNvbGxhcHNlRGVsdGEgPiAwO1xuXG4gICAgICAgIGlmIChuZWVkQ29sbGFwc2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VJdGVtcyhjb2xsYXBzZURlbHRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5Db2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGE6IG51bWJlcikge1xuICAgICAgICBsZXQgZGVsdGEgPSBjb2xsYXBzZURlbHRhO1xuXG4gICAgICAgIGNvbnN0IHVuQ29sbGFwc2VkSXRlbXMgPSB0aGlzLmNvbGxhcHNhYmxlSXRlbXNcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmNvbGxhcHNlZCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHVuQ29sbGFwc2VkSXRlbXMpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sbGFwc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbHRhIC09IGl0ZW0uZ2V0VGl0bGVXaWR0aCgpO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPCAwKSB7IGJyZWFrOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVuQ29sbGFwc2VJdGVtcyhjb2xsYXBzZURlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRlbHRhID0gY29sbGFwc2VEZWx0YTtcblxuICAgICAgICB0aGlzLmNvbGxhcHNhYmxlSXRlbXNcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29sbGFwc2VkKVxuICAgICAgICAgICAgLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGEgKyBpdGVtLmdldFRpdGxlV2lkdGgoKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgKz0gaXRlbS5nZXRUaXRsZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJdGVtc1N0YXRlID0gKCkgPT4ge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMubmF2YmFyQmFzZUl0ZW1zPy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmhvcml6b250YWwgPSB0cnVlKSk7XG4gICAgfVxufVxuIl19
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
            this.navbarBaseItems.forEach((item) => item.horizontal = true);
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
            .filter((item) => item.icon && item.title)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFZekUsTUFBTSxPQUFPLGlCQUFpQjs7O1lBTjdCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjtpQkFDL0I7YUFDSjs7QUFjRCxNQUFNLE9BQU8sUUFBUTtJQTJCakIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXRCakMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUyxDQUFDO1FBRTVCLDJCQUFzQixHQUFXLEdBQUcsQ0FBQztRQTJDdEQsb0JBQWUsR0FBRyxHQUFHLEVBQUU7WUFDbkIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXhELE1BQU0sWUFBWSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFFdkMsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0ws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QjtpQkFDakQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OztZQWhDRyxVQUFVOzs7OEJBa0NULGVBQWUsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7MEJBRXZELGVBQWUsU0FBQyxZQUFZLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jTmF2YmFySXRlbSwgTWNOYXZiYXJJdGVtQmFzZSB9IGZyb20gJy4vbmF2YmFyLWl0ZW0uY29tcG9uZW50JztcblxuXG5leHBvcnQgdHlwZSBNY05hdmJhckNvbnRhaW5lclBvc2l0aW9uVHlwZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItY29udGFpbmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWNvbnRhaW5lcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQ29udGFpbmVyIHt9XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItY29udGFpbmVyXSwgbWMtbmF2YmFyLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlVXJsczogWycuL25hdmJhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhcicsXG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAncmVzaXplU3RyZWFtLm5leHQoJGV2ZW50KSdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNOYXZiYXJJdGVtQmFzZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBuYXZiYXJCYXNlSXRlbXM6IFF1ZXJ5TGlzdDxNY05hdmJhckl0ZW1CYXNlPjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNOYXZiYXJJdGVtLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG5hdmJhckl0ZW1zOiBRdWVyeUxpc3Q8TWNOYXZiYXJJdGVtPjtcblxuICAgIHJlYWRvbmx5IHJlc2l6ZVN0cmVhbSA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSByZXNpemVEZWJvdW5jZUludGVydmFsOiBudW1iZXIgPSAxMDA7XG5cbiAgICBwcml2YXRlIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgdG90YWxJdGVtc1dpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmJhckJhc2VJdGVtc1xuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLmdldE91dGVyRWxlbWVudFdpZHRoKCksIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGNvbGxhcHNhYmxlSXRlbXMoKTogTWNOYXZiYXJJdGVtW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZiYXJJdGVtc1xuICAgICAgICAgICAgLnRvQXJyYXkoKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pY29uICYmIGl0ZW0udGl0bGUpXG4gICAgICAgICAgICAucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSB0aGlzLnJlc2l6ZVN0cmVhbVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMucmVzaXplRGVib3VuY2VJbnRlcnZhbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlQ29sbGFwc2VkKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbXNTdGF0ZSgpO1xuXG4gICAgICAgIHRoaXMubmF2YmFyQmFzZUl0ZW1zLmNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy5zZXRJdGVtc1N0YXRlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIE5vdGU6IHRoaXMgd2FpdCBpcyByZXF1aXJlZCBmb3IgbG9hZGluZyBhbmQgcmVuZGVyaW5nIGZvbnRzIGZvciBpY29ucztcbiAgICAgICAgLy8gdW5mb3J0dW5hdGVseSB3ZSBjYW5ub3QgY29udHJvbCBmb250IHJlbmRlcmluZ1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMudXBkYXRlQ29sbGFwc2VkKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb2xsYXBzZWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNlRGVsdGEgPSB0aGlzLnRvdGFsSXRlbXNXaWR0aCAtIHRoaXMud2lkdGg7XG5cbiAgICAgICAgY29uc3QgbmVlZENvbGxhcHNlID0gY29sbGFwc2VEZWx0YSA+IDA7XG5cbiAgICAgICAgaWYgKG5lZWRDb2xsYXBzZSkge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51bkNvbGxhcHNlSXRlbXMoY29sbGFwc2VEZWx0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbGxhcHNlSXRlbXMoY29sbGFwc2VEZWx0YTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkZWx0YSA9IGNvbGxhcHNlRGVsdGE7XG5cbiAgICAgICAgY29uc3QgdW5Db2xsYXBzZWRJdGVtcyA9IHRoaXMuY29sbGFwc2FibGVJdGVtc1xuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gIWl0ZW0uY29sbGFwc2VkKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdW5Db2xsYXBzZWRJdGVtcykge1xuICAgICAgICAgICAgaXRlbS5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVsdGEgLT0gaXRlbS5nZXRUaXRsZVdpZHRoKCk7XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA8IDApIHsgYnJlYWs7IH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdW5Db2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGE6IG51bWJlcikge1xuICAgICAgICBsZXQgZGVsdGEgPSBjb2xsYXBzZURlbHRhO1xuXG4gICAgICAgIHRoaXMuY29sbGFwc2FibGVJdGVtc1xuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb2xsYXBzZWQpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkZWx0YSArIGl0ZW0uZ2V0VGl0bGVXaWR0aCgpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSArPSBpdGVtLmdldFRpdGxlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEl0ZW1zU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubmF2YmFyQmFzZUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uaG9yaXpvbnRhbCA9IHRydWUpO1xuICAgIH1cbn1cbiJdfQ==
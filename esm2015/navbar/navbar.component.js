import { ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, QueryList, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { McNavbarItem, McNavbarItemBase } from './navbar-item.component';
import * as i0 from "@angular/core";
export class McNavbarContainer {
}
/** @nocollapse */ McNavbarContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarContainer, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNavbarContainer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McNavbarContainer, selector: "mc-navbar-container", host: { classAttribute: "mc-navbar-container" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbarContainer, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-container',
                    host: {
                        class: 'mc-navbar-container'
                    }
                }]
        }] });
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
/** @nocollapse */ McNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbar, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McNavbar, selector: "mc-navbar", host: { listeners: { "window:resize": "resizeStream.next($event)" }, classAttribute: "mc-navbar" }, queries: [{ propertyName: "navbarBaseItems", predicate: McNavbarItemBase, descendants: true }, { propertyName: "navbarItems", predicate: McNavbarItem, descendants: true }], ngImport: i0, template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`, isInline: true, styles: [".mc-navbar{position:relative;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-navbar',
                    template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`,
                    styleUrls: ['./navbar.scss'],
                    host: {
                        class: 'mc-navbar',
                        '(window:resize)': 'resizeStream.next($event)'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { navbarBaseItems: [{
                type: ContentChildren,
                args: [McNavbarItemBase, { descendants: true }]
            }], navbarItems: [{
                type: ContentChildren,
                args: [McNavbarItem, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBWXpFLE1BQU0sT0FBTyxpQkFBaUI7O2lJQUFqQixpQkFBaUI7cUhBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQU43QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUscUJBQXFCO3FCQUMvQjtpQkFDSjs7QUFjRCxNQUFNLE9BQU8sUUFBUTtJQTJCakIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXRCakMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUyxDQUFDO1FBRTVCLDJCQUFzQixHQUFXLEdBQUcsQ0FBQztRQTJDdEQsb0JBQWUsR0FBRyxHQUFHLEVBQUU7WUFDbkIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXhELE1BQU0sWUFBWSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFFdkMsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDSCxJ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LENBQUM7SUFDWCxDQUFDOzt3SEF2RlEsUUFBUTs0R0FBUixRQUFRLHFMQUNBLGdCQUFnQixpRUFFaEIsWUFBWSxnREFabkIsK0VBQStFOzJGQVNoRixRQUFRO2tCQVhwQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsK0VBQStFO29CQUN6RixTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzVCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsV0FBVzt3QkFDbEIsaUJBQWlCLEVBQUUsMkJBQTJCO3FCQUNqRDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDO2lHQUU2RCxlQUFlO3NCQUF4RSxlQUFlO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFFRixXQUFXO3NCQUFoRSxlQUFlO3VCQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNOYXZiYXJJdGVtLCBNY05hdmJhckl0ZW1CYXNlIH0gZnJvbSAnLi9uYXZiYXItaXRlbS5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB0eXBlIE1jTmF2YmFyQ29udGFpbmVyUG9zaXRpb25UeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1jb250YWluZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItY29udGFpbmVyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJDb250YWluZXIge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXInLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLW5hdmJhci1jb250YWluZXJdLCBtYy1uYXZiYXItY29udGFpbmVyXCI+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2YmFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyJyxcbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICdyZXNpemVTdHJlYW0ubmV4dCgkZXZlbnQpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY05hdmJhckl0ZW1CYXNlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG5hdmJhckJhc2VJdGVtczogUXVlcnlMaXN0PE1jTmF2YmFySXRlbUJhc2U+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY05hdmJhckl0ZW0sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbmF2YmFySXRlbXM6IFF1ZXJ5TGlzdDxNY05hdmJhckl0ZW0+O1xuXG4gICAgcmVhZG9ubHkgcmVzaXplU3RyZWFtID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcblxuICAgIHByaXZhdGUgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0b3RhbEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2YmFyQmFzZUl0ZW1zXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0uZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKSwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgY29sbGFwc2FibGVJdGVtcygpOiBNY05hdmJhckl0ZW1bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmJhckl0ZW1zXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmljb24gJiYgaXRlbS50aXRsZSAmJiBpdGVtLmNvbGxhcHNhYmxlKVxuICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTdHJlYW1cbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSh0aGlzLnJlc2l6ZURlYm91bmNlSW50ZXJ2YWwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnVwZGF0ZUNvbGxhcHNlZCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEl0ZW1zU3RhdGUoKTtcblxuICAgICAgICB0aGlzLm5hdmJhckJhc2VJdGVtcy5jaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuc2V0SXRlbXNTdGF0ZSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBOb3RlOiB0aGlzIHdhaXQgaXMgcmVxdWlyZWQgZm9yIGxvYWRpbmcgYW5kIHJlbmRlcmluZyBmb250cyBmb3IgaWNvbnM7XG4gICAgICAgIC8vIHVuZm9ydHVuYXRlbHkgd2UgY2Fubm90IGNvbnRyb2wgZm9udCByZW5kZXJpbmdcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZUNvbGxhcHNlZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sbGFwc2VkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2xsYXBzZURlbHRhID0gdGhpcy50b3RhbEl0ZW1zV2lkdGggLSB0aGlzLndpZHRoO1xuXG4gICAgICAgIGNvbnN0IG5lZWRDb2xsYXBzZSA9IGNvbGxhcHNlRGVsdGEgPiAwO1xuXG4gICAgICAgIGlmIChuZWVkQ29sbGFwc2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VJdGVtcyhjb2xsYXBzZURlbHRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5Db2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGE6IG51bWJlcikge1xuICAgICAgICBsZXQgZGVsdGEgPSBjb2xsYXBzZURlbHRhO1xuXG4gICAgICAgIGNvbnN0IHVuQ29sbGFwc2VkSXRlbXMgPSB0aGlzLmNvbGxhcHNhYmxlSXRlbXNcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmNvbGxhcHNlZCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHVuQ29sbGFwc2VkSXRlbXMpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sbGFwc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbHRhIC09IGl0ZW0uZ2V0VGl0bGVXaWR0aCgpO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPCAwKSB7IGJyZWFrOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVuQ29sbGFwc2VJdGVtcyhjb2xsYXBzZURlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRlbHRhID0gY29sbGFwc2VEZWx0YTtcblxuICAgICAgICB0aGlzLmNvbGxhcHNhYmxlSXRlbXNcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29sbGFwc2VkKVxuICAgICAgICAgICAgLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGEgKyBpdGVtLmdldFRpdGxlV2lkdGgoKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgKz0gaXRlbS5nZXRUaXRsZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJdGVtc1N0YXRlID0gKCkgPT4ge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMubmF2YmFyQmFzZUl0ZW1zPy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmhvcml6b250YWwgPSB0cnVlKSk7XG4gICAgfVxufVxuIl19
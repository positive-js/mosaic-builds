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
/** @nocollapse */ McNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McNavbar, selector: "mc-navbar", host: { listeners: { "window:resize": "resizeStream.next($event)" }, classAttribute: "mc-navbar" }, queries: [{ propertyName: "navbarBaseItems", predicate: McNavbarItemBase, descendants: true }, { propertyName: "navbarItems", predicate: McNavbarItem, descendants: true }], ngImport: i0, template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`, isInline: true, styles: [".mc-navbar{position:relative;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center}\n", ".mc-navbar-title{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{position:relative;display:flex;align-items:center;height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-horizontal .mc-navbar-title+.mc-icon{padding-left:4px;padding-left:var(--mc-navbar-size-icon-margin, 4px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-title{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical .mc-navbar-title{padding-left:26px}.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-title,.mc-navbar-item.mc-vertical .mc-navbar-title+.mc-icon{padding-left:10px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 10px)}.mc-navbar-item.mc-vertical.mc-opened .mc-badge{right:16px}.mc-navbar-item.mc-vertical.mc-closed .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical.mc-closed .mc-navbar-title{display:none}.mc-navbar-item.mc-vertical.mc-closed.mc-navbar-item_button{padding-left:8px;padding-right:8px}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical{flex-direction:column}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-opened{align-items:unset}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-item{position:absolute;top:0;right:0}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-logo{padding-left:16px;justify-content:flex-end}.mc-navbar-brand.mc-vertical.mc-opened .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-closed{padding:0}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-logo{align-items:center;justify-content:center;width:48px}.mc-navbar-brand.mc-vertical.mc-closed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 16px}.mc-navbar-divider.mc-vertical.mc-closed{margin-right:10px;margin-left:10px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McNavbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-navbar',
                    template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`,
                    styleUrls: [
                        './navbar.scss',
                        './navbar-item.scss',
                        './navbar-brand.scss',
                        './navbar-divider.scss'
                    ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBWXpFLE1BQU0sT0FBTyxpQkFBaUI7O2lJQUFqQixpQkFBaUI7cUhBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQU43QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUscUJBQXFCO3FCQUMvQjtpQkFDSjs7QUFtQkQsTUFBTSxPQUFPLFFBQVE7SUEyQmpCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUF0QmpDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVMsQ0FBQztRQUU1QiwyQkFBc0IsR0FBVyxHQUFHLENBQUM7UUEyQ3RELG9CQUFlLEdBQUcsR0FBRyxFQUFFO1lBQ25CLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV4RCxNQUFNLFlBQVksR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBRXZDLElBQUksWUFBWSxFQUFFO2dCQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDckM7aUJBQU07Z0JBQ0gs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QyxDQUFDO0lBQ1gsQ0FBQzs7d0hBdkZRLFFBQVE7NEdBQVIsUUFBUSxxTEFDQSxnQkFBZ0IsaUVBRWhCLFlBQVksZ0RBakJuQiwrRUFBK0U7MkZBY2hGLFFBQVE7a0JBaEJwQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsK0VBQStFO29CQUN6RixTQUFTLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLHFCQUFxQjt3QkFDckIsdUJBQXVCO3FCQUMxQjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLFdBQVc7d0JBQ2xCLGlCQUFpQixFQUFFLDJCQUEyQjtxQkFDakQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4QztpR0FFNkQsZUFBZTtzQkFBeEUsZUFBZTt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBRUYsV0FBVztzQkFBaEUsZUFBZTt1QkFBQyxZQUFZLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jTmF2YmFySXRlbSwgTWNOYXZiYXJJdGVtQmFzZSB9IGZyb20gJy4vbmF2YmFyLWl0ZW0uY29tcG9uZW50JztcblxuXG5leHBvcnQgdHlwZSBNY05hdmJhckNvbnRhaW5lclBvc2l0aW9uVHlwZSA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItY29udGFpbmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWNvbnRhaW5lcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQ29udGFpbmVyIHt9XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItY29udGFpbmVyXSwgbWMtbmF2YmFyLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICAnLi9uYXZiYXIuc2NzcycsXG4gICAgICAgICcuL25hdmJhci1pdGVtLnNjc3MnLFxuICAgICAgICAnLi9uYXZiYXItYnJhbmQuc2NzcycsXG4gICAgICAgICcuL25hdmJhci1kaXZpZGVyLnNjc3MnXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyJyxcbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICdyZXNpemVTdHJlYW0ubmV4dCgkZXZlbnQpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY05hdmJhckl0ZW1CYXNlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG5hdmJhckJhc2VJdGVtczogUXVlcnlMaXN0PE1jTmF2YmFySXRlbUJhc2U+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY05hdmJhckl0ZW0sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbmF2YmFySXRlbXM6IFF1ZXJ5TGlzdDxNY05hdmJhckl0ZW0+O1xuXG4gICAgcmVhZG9ubHkgcmVzaXplU3RyZWFtID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcblxuICAgIHByaXZhdGUgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0b3RhbEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2YmFyQmFzZUl0ZW1zXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0uZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKSwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgY29sbGFwc2FibGVJdGVtcygpOiBNY05hdmJhckl0ZW1bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmJhckl0ZW1zXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmljb24gJiYgaXRlbS50aXRsZSAmJiBpdGVtLmNvbGxhcHNhYmxlKVxuICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTdHJlYW1cbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSh0aGlzLnJlc2l6ZURlYm91bmNlSW50ZXJ2YWwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnVwZGF0ZUNvbGxhcHNlZCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEl0ZW1zU3RhdGUoKTtcblxuICAgICAgICB0aGlzLm5hdmJhckJhc2VJdGVtcy5jaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuc2V0SXRlbXNTdGF0ZSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBOb3RlOiB0aGlzIHdhaXQgaXMgcmVxdWlyZWQgZm9yIGxvYWRpbmcgYW5kIHJlbmRlcmluZyBmb250cyBmb3IgaWNvbnM7XG4gICAgICAgIC8vIHVuZm9ydHVuYXRlbHkgd2UgY2Fubm90IGNvbnRyb2wgZm9udCByZW5kZXJpbmdcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZUNvbGxhcHNlZCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sbGFwc2VkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb2xsYXBzZURlbHRhID0gdGhpcy50b3RhbEl0ZW1zV2lkdGggLSB0aGlzLndpZHRoO1xuXG4gICAgICAgIGNvbnN0IG5lZWRDb2xsYXBzZSA9IGNvbGxhcHNlRGVsdGEgPiAwO1xuXG4gICAgICAgIGlmIChuZWVkQ29sbGFwc2UpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VJdGVtcyhjb2xsYXBzZURlbHRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5Db2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGE6IG51bWJlcikge1xuICAgICAgICBsZXQgZGVsdGEgPSBjb2xsYXBzZURlbHRhO1xuXG4gICAgICAgIGNvbnN0IHVuQ29sbGFwc2VkSXRlbXMgPSB0aGlzLmNvbGxhcHNhYmxlSXRlbXNcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmNvbGxhcHNlZCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHVuQ29sbGFwc2VkSXRlbXMpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sbGFwc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbHRhIC09IGl0ZW0uZ2V0VGl0bGVXaWR0aCgpO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPCAwKSB7IGJyZWFrOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVuQ29sbGFwc2VJdGVtcyhjb2xsYXBzZURlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRlbHRhID0gY29sbGFwc2VEZWx0YTtcblxuICAgICAgICB0aGlzLmNvbGxhcHNhYmxlSXRlbXNcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29sbGFwc2VkKVxuICAgICAgICAgICAgLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGEgKyBpdGVtLmdldFRpdGxlV2lkdGgoKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgKz0gaXRlbS5nZXRUaXRsZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJdGVtc1N0YXRlID0gKCkgPT4ge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMubmF2YmFyQmFzZUl0ZW1zPy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmhvcml6b250YWwgPSB0cnVlKSk7XG4gICAgfVxufVxuIl19
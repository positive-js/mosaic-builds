import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
const COLLAPSED_CLASS = 'mc-navbar-collapsed-title';
export class McNavbarLogo {
}
McNavbarLogo.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-logo',
                host: {
                    class: 'mc-navbar-logo'
                }
            },] }
];
export class McNavbarBrand {
}
McNavbarBrand.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-brand',
                host: {
                    class: 'mc-navbar-brand'
                }
            },] }
];
export class McNavbarTitle {
}
McNavbarTitle.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-title',
                host: {
                    class: 'mc-navbar-title'
                }
            },] }
];
export class McNavbarItemBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McNavbarMixinBase = mixinTabIndex(mixinDisabled(McNavbarItemBase));
export class McNavbarItem extends McNavbarMixinBase {
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
    }
    set collapsedTitle(value) {
        this.elementRef.nativeElement.setAttribute('computedTitle', encodeURI(value));
    }
    ngOnInit() {
        this.denyClickIfDisabled();
        this._focusMonitor.monitor(this.elementRef.nativeElement, true);
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    // This method is required due to angular 2 issue https://github.com/angular/angular/issues/11200
    denyClickIfDisabled() {
        const events = this.elementRef.nativeElement.eventListeners('click');
        events.forEach((event) => this.elementRef.nativeElement.removeEventListener('click', event));
        this.elementRef.nativeElement.addEventListener('click', (event) => {
            if (this.elementRef.nativeElement.hasAttribute('disabled')) {
                event.stopImmediatePropagation();
            }
        }, true);
        events.forEach((event) => this.elementRef.nativeElement.addEventListener('click', event));
    }
}
McNavbarItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar-item',
                template: `<ng-content></ng-content>`,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-navbar-item',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null'
                }
            },] }
];
/** @nocollapse */
McNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McNavbarItem.propDecorators = {
    collapsedTitle: [{ type: Input }]
};
export class McNavbarContainer {
    constructor() {
        this.position = 'left';
    }
}
McNavbarContainer.decorators = [
    { type: Directive, args: [{
                selector: 'mc-navbar-container',
                host: {
                    '[class.mc-navbar-left]': 'this.position === "left"',
                    '[class.mc-navbar-right]': 'this.position !== "left"'
                }
            },] }
];
McNavbarContainer.propDecorators = {
    position: [{ type: Input }]
};
class CollapsibleItem {
    constructor(element, width) {
        this.element = element;
        this.width = width;
        this.collapsed = false;
    }
    processCollapsed(collapsed) {
        this.collapsed = collapsed;
        this.updateCollapsedClass();
    }
    updateCollapsedClass() {
        if (this.collapsed) {
            this.element.classList.add(COLLAPSED_CLASS);
        }
        else {
            this.element.classList.remove(COLLAPSED_CLASS);
        }
    }
}
class CachedItemWidth {
    constructor(element, width, itemsForCollapse = []) {
        this.element = element;
        this.width = width;
        this.itemsForCollapse = itemsForCollapse;
    }
    get canCollapse() {
        return this.itemsForCollapse.length > 0;
    }
    get collapsedItemsWidth() {
        if (this._collapsedItemsWidth !== undefined) {
            return this._collapsedItemsWidth;
        }
        this.calculateAndCacheCollapsedItemsWidth();
        return this._collapsedItemsWidth;
    }
    processCollapsed(collapsed) {
        if (this.itemsForCollapse.length > 0) {
            this.updateTitle(collapsed);
        }
        this.itemsForCollapse.forEach((item) => item.processCollapsed(collapsed));
    }
    calculateAndCacheCollapsedItemsWidth() {
        this._collapsedItemsWidth = this.itemsForCollapse
            .reduce((acc, item) => acc + item.width, 0);
    }
    getTitle() {
        const computedTitle = this.element.getAttribute('computedTitle');
        return computedTitle
            ? decodeURI(computedTitle)
            : (this.itemsForCollapse.length > 0 ? this.itemsForCollapse[0].element.innerText : '');
    }
    updateTitle(collapsed) {
        if (collapsed) {
            this.element.setAttribute('title', this.getTitle());
        }
        else {
            this.element.removeAttribute('title');
        }
    }
}
export class McNavbar {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.forceRecalculateItemsWidth = false;
        this.resizeDebounceInterval = 100;
        this.firstLevelElement = 'mc-navbar-container';
        this.secondLevelElements = [
            'mc-navbar-item',
            'mc-navbar-brand',
            'mc-navbar-title'
        ];
        const resizeObserver = fromEvent(window, 'resize')
            .pipe(debounceTime(this.resizeDebounceInterval));
        this.resizeSubscription = resizeObserver.subscribe(this.updateCollapsed.bind(this));
    }
    get maxAllowedWidth() {
        return this._elementRef.nativeElement.querySelector('nav').getBoundingClientRect().width;
    }
    get itemsWidths() {
        if (this._itemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this._itemsWidths;
        }
        this.calculateAndCacheItemsWidth();
        return this._itemsWidths;
    }
    get totalItemsWidth() {
        if (this.totalItemsWidths !== undefined && !this.forceRecalculateItemsWidth) {
            return this.totalItemsWidths;
        }
        this.calculateAndCacheTotalItemsWidth();
        return this.totalItemsWidths;
    }
    updateCollapsed() {
        let collapseDelta = this.totalItemsWidth - this.maxAllowedWidth;
        for (let i = this.itemsWidths.length - 1; i >= 0; i--) {
            const item = this.itemsWidths[i];
            if (!item.canCollapse) {
                continue;
            }
            item.processCollapsed(collapseDelta > 0);
            collapseDelta -= item.collapsedItemsWidth;
        }
    }
    ngAfterViewInit() {
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(() => this.updateCollapsed(), 0);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
    calculateAndCacheTotalItemsWidth() {
        this.totalItemsWidths = this.itemsWidths
            .reduce((acc, item) => acc + item.width, 0);
    }
    getOuterElementWidth(element) {
        const baseWidth = element.getBoundingClientRect().width;
        const marginRight = parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
        const marginLeft = parseInt(getComputedStyle(element).getPropertyValue('margin-left'));
        return baseWidth + marginRight + marginLeft;
    }
    calculateAndCacheItemsWidth() {
        const allItemsSelector = this.secondLevelElements
            .map((e) => `${this.firstLevelElement}>${e}`);
        const allItems = Array.from(this._elementRef.nativeElement.querySelectorAll(allItemsSelector));
        this._itemsWidths = allItems
            .map((el) => new CachedItemWidth(el, this.getOuterElementWidth(el), this.getItemsForCollapse(el)));
    }
    getItemsForCollapse(element) {
        const icon = element.querySelector(`[mc-icon],mc-navbar-logo,[mc-navbar-logo]`);
        if (!icon) {
            return [];
        }
        return Array.from(element.querySelectorAll('mc-navbar-title'))
            .map((el) => new CollapsibleItem(el, el.getBoundingClientRect().width));
    }
}
McNavbar.decorators = [
    { type: Component, args: [{
                selector: 'mc-navbar',
                template: `
        <nav class="mc-navbar">
            <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
        </nav>
    `,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-navbar-left,.mc-navbar-right,mc-navbar-container{flex-shrink:0;height:100%}.mc-navbar,.mc-navbar-left,.mc-navbar-right,mc-navbar-container{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.mc-navbar{position:relative;height:var(--mc-navbar-size-height,48px)}.mc-navbar [mc-icon]+mc-navbar-title{margin-left:var(--mc-navbar-size-icon-margin-left,8px)}.mc-navbar [mc-icon]{min-width:16px;min-height:16px}.mc-navbar mc-navbar-title:not(.mc-navbar-collapsed-title)+[mc-icon]{margin-left:var(--mc-navbar-size-icon-margin-left,8px)}.mc-navbar-brand,.mc-navbar-item,.mc-navbar-title,mc-navbar-brand,mc-navbar-item,mc-navbar-item:first-child{height:100%;position:relative;display:flex;align-items:center;padding-left:var(--mc-navbar-item-size-padding,16px);padding-right:var(--mc-navbar-item-size-padding,16px)}.mc-navbar-brand,mc-navbar-brand{padding-left:0;padding-right:var(--mc-navbar-brand-size-padding,12px);margin-right:var(--mc-navbar-brand-size-margin-right,24px)}.mc-navbar-brand .mc-navbar-title,mc-navbar-brand .mc-navbar-title{padding-left:var(--mc-navbar-brand-size-padding,12px);padding-right:0}.mc-navbar-title{white-space:nowrap}.mc-navbar-item:not([disabled]){cursor:pointer}.mc-navbar-item .mc-navbar-title,mc-navbar-brand{padding:0}mc-navbar-item.mc-progress:not([disabled]){cursor:pointer}.mc-navbar-item[disabled],mc-navbar-item[disabled] .mc-navbar-item{cursor:default}mc-navbar-title.mc-navbar-collapsed-title{display:none}"]
            },] }
];
/** @nocollapse */
McNavbar.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUVILFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUErQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEgsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLE1BQU0sZUFBZSxHQUFXLDJCQUEyQixDQUFDO0FBVTVELE1BQU0sT0FBTyxZQUFZOzs7WUFOeEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsZ0JBQWdCO2lCQUMxQjthQUNKOztBQVNELE1BQU0sT0FBTyxhQUFhOzs7WUFOekIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsaUJBQWlCO2lCQUMzQjthQUNKOztBQVNELE1BQU0sT0FBTyxhQUFhOzs7WUFOekIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsaUJBQWlCO2lCQUMzQjthQUNKOztBQUdELE1BQU0sT0FBTyxnQkFBZ0I7SUFDekIsWUFBbUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7Q0FDaEQ7QUFFRCw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFD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QUM1QyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUQsTUFBTSxRQUFRLEdBQWtCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBRTlHLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUTthQUN2QixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBRU8sbUJBQW1CLENBQUMsT0FBb0I7UUFDNUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1FBRWhGLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3pELEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxlQUFlLENBQWUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQzs7O1lBcEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7O0tBSVQ7Z0JBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBck1HLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgSGFzVGFiSW5kZXhDdG9yLCBtaXhpbkRpc2FibGVkLCBtaXhpblRhYkluZGV4IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5jb25zdCBDT0xMQVBTRURfQ0xBU1M6IHN0cmluZyA9ICdtYy1uYXZiYXItY29sbGFwc2VkLXRpdGxlJztcblxuZXhwb3J0IHR5cGUgTWNOYXZiYXJDb250YWluZXJQb3NpdGlvblR5cGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1sb2dvJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWxvZ28nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckxvZ28ge31cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItYnJhbmQnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItYnJhbmQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckJyYW5kIHt9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLXRpdGxlJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLXRpdGxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUaXRsZSB7fVxuXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJJdGVtQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTmF2YmFyTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jTmF2YmFySXRlbUJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNOYXZiYXJJdGVtQmFzZSkpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1pdGVtJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1pdGVtJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbSBleHRlbmRzIE1jTmF2YmFyTWl4aW5CYXNlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENhbkRpc2FibGUge1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGNvbGxhcHNlZFRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjb21wdXRlZFRpdGxlJywgZW5jb2RlVVJJKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3JcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZGVueUNsaWNrSWZEaXNhYmxlZCgpO1xuXG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIG1ldGhvZCBpcyByZXF1aXJlZCBkdWUgdG8gYW5ndWxhciAyIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzExMjAwXG4gICAgcHJpdmF0ZSBkZW55Q2xpY2tJZkRpc2FibGVkKCkge1xuICAgICAgICBjb25zdCBldmVudHM6IEV2ZW50W10gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ldmVudExpc3RlbmVycygnY2xpY2snKTtcblxuICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQpKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcblxuICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQpKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWNvbnRhaW5lcicsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLW5hdmJhci1sZWZ0XSc6ICd0aGlzLnBvc2l0aW9uID09PSBcImxlZnRcIicsXG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLXJpZ2h0XSc6ICd0aGlzLnBvc2l0aW9uICE9PSBcImxlZnRcIidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyQ29udGFpbmVyIHtcbiAgICBASW5wdXQoKVxuICAgIHBvc2l0aW9uOiBNY05hdmJhckNvbnRhaW5lclBvc2l0aW9uVHlwZSA9ICdsZWZ0Jztcbn1cblxuY2xhc3MgQ29sbGFwc2libGVJdGVtIHtcbiAgICBwcml2YXRlIGNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwdWJsaWMgd2lkdGg6IG51bWJlcikge31cblxuICAgIHByb2Nlc3NDb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gY29sbGFwc2VkO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29sbGFwc2VkQ2xhc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUNvbGxhcHNlZENsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKENPTExBUFNFRF9DTEFTUyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDT0xMQVBTRURfQ0xBU1MpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmNsYXNzIENhY2hlZEl0ZW1XaWR0aCB7XG4gICAgZ2V0IGNhbkNvbGxhcHNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc0ZvckNvbGxhcHNlLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IGNvbGxhcHNlZEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZEl0ZW1zV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFuZENhY2hlQ29sbGFwc2VkSXRlbXNXaWR0aCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWRJdGVtc1dpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbGxhcHNlZEl0ZW1zV2lkdGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgaXRlbXNGb3JDb2xsYXBzZTogQ29sbGFwc2libGVJdGVtW10gPSBbXVxuICAgICkge31cblxuICAgIHByb2Nlc3NDb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zRm9yQ29sbGFwc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUaXRsZShjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pdGVtc0ZvckNvbGxhcHNlLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0ucHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZWQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUFuZENhY2hlQ29sbGFwc2VkSXRlbXNXaWR0aCgpIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2VkSXRlbXNXaWR0aCA9IHRoaXMuaXRlbXNGb3JDb2xsYXBzZVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLndpZHRoLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVkVGl0bGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjb21wdXRlZFRpdGxlJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXB1dGVkVGl0bGVcbiAgICAgICAgICAgID8gZGVjb2RlVVJJKGNvbXB1dGVkVGl0bGUpXG4gICAgICAgICAgICA6ICh0aGlzLml0ZW1zRm9yQ29sbGFwc2UubGVuZ3RoID4gMCA/IHRoaXMuaXRlbXNGb3JDb2xsYXBzZVswXS5lbGVtZW50LmlubmVyVGV4dCA6ICcnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRpdGxlKGNvbGxhcHNlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuZ2V0VGl0bGUoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmF2IGNsYXNzPVwibWMtbmF2YmFyXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWMtbmF2YmFyLWNvbnRhaW5lcl0sIG1jLW5hdmJhci1jb250YWluZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmF2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2YmFyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm9yY2VSZWNhbGN1bGF0ZUl0ZW1zV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpcnN0TGV2ZWxFbGVtZW50OiBzdHJpbmcgPSAnbWMtbmF2YmFyLWNvbnRhaW5lcic7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZWNvbmRMZXZlbEVsZW1lbnRzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ21jLW5hdmJhci1pdGVtJyxcbiAgICAgICAgJ21jLW5hdmJhci1icmFuZCcsXG4gICAgICAgICdtYy1uYXZiYXItdGl0bGUnXG4gICAgXTtcblxuICAgIHByaXZhdGUgdG90YWxJdGVtc1dpZHRoczogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBnZXQgbWF4QWxsb3dlZFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignbmF2JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgaXRlbXNXaWR0aHMoKTogQ2FjaGVkSXRlbVdpZHRoW10ge1xuICAgICAgICBpZiAodGhpcy5faXRlbXNXaWR0aHMgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5mb3JjZVJlY2FsY3VsYXRlSXRlbXNXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zV2lkdGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVBbmRDYWNoZUl0ZW1zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNXaWR0aHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXRlbXNXaWR0aHM6IENhY2hlZEl0ZW1XaWR0aFtdO1xuXG4gICAgcHJpdmF0ZSBnZXQgdG90YWxJdGVtc1dpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnRvdGFsSXRlbXNXaWR0aHMgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5mb3JjZVJlY2FsY3VsYXRlSXRlbXNXaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG90YWxJdGVtc1dpZHRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQW5kQ2FjaGVUb3RhbEl0ZW1zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy50b3RhbEl0ZW1zV2lkdGhzO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkge1xuICAgICAgICBjb25zdCByZXNpemVPYnNlcnZlciA9IGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKVxuICAgICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMucmVzaXplRGVib3VuY2VJbnRlcnZhbCkpO1xuXG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gcmVzaXplT2JzZXJ2ZXIuc3Vic2NyaWJlKHRoaXMudXBkYXRlQ29sbGFwc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbGxhcHNlZCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbGxhcHNlRGVsdGEgPSB0aGlzLnRvdGFsSXRlbXNXaWR0aCAtIHRoaXMubWF4QWxsb3dlZFdpZHRoO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLml0ZW1zV2lkdGhzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1dpZHRoc1tpXTtcblxuICAgICAgICAgICAgaWYgKCFpdGVtLmNhbkNvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ucHJvY2Vzc0NvbGxhcHNlZChjb2xsYXBzZURlbHRhID4gMCk7XG4gICAgICAgICAgICBjb2xsYXBzZURlbHRhIC09IGl0ZW0uY29sbGFwc2VkSXRlbXNXaWR0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gTm90ZTogdGhpcyB3YWl0IGlzIHJlcXVpcmVkIGZvciBsb2FkaW5nIGFuZCByZW5kZXJpbmcgZm9udHMgZm9yIGljb25zO1xuICAgICAgICAvLyB1bmZvcnR1bmF0ZWx5IHdlIGNhbm5vdCBjb250cm9sIGZvbnQgcmVuZGVyaW5nXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVDb2xsYXBzZWQoKSwgMCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVBbmRDYWNoZVRvdGFsSXRlbXNXaWR0aCgpIHtcbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zV2lkdGhzID0gdGhpcy5pdGVtc1dpZHRoc1xuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLndpZHRoLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE91dGVyRWxlbWVudFdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYmFzZVdpZHRoICA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tcmlnaHQnKSk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkxlZnQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1sZWZ0JykpO1xuXG4gICAgICAgIHJldHVybiBiYXNlV2lkdGggKyBtYXJnaW5SaWdodCArIG1hcmdpbkxlZnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVBbmRDYWNoZUl0ZW1zV2lkdGgoKSB7XG4gICAgICAgIGNvbnN0IGFsbEl0ZW1zU2VsZWN0b3IgPSB0aGlzLnNlY29uZExldmVsRWxlbWVudHNcbiAgICAgICAgICAgIC5tYXAoKGU6IHN0cmluZykgPT4gYCR7dGhpcy5maXJzdExldmVsRWxlbWVudH0+JHtlfWApO1xuICAgICAgICBjb25zdCBhbGxJdGVtczogSFRNTEVsZW1lbnRbXSA9IEFycmF5LmZyb20odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYWxsSXRlbXNTZWxlY3RvcikpO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zV2lkdGhzID0gYWxsSXRlbXNcbiAgICAgICAgICAgIC5tYXAoKGVsKSA9PiBuZXcgQ2FjaGVkSXRlbVdpZHRoKGVsLCB0aGlzLmdldE91dGVyRWxlbWVudFdpZHRoKGVsKSwgdGhpcy5nZXRJdGVtc0ZvckNvbGxhcHNlKGVsKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SXRlbXNGb3JDb2xsYXBzZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IENvbGxhcHNpYmxlSXRlbVtdIHtcbiAgICAgICAgY29uc3QgaWNvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgW21jLWljb25dLG1jLW5hdmJhci1sb2dvLFttYy1uYXZiYXItbG9nb11gKTtcblxuICAgICAgICBpZiAoIWljb24pIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbWMtbmF2YmFyLXRpdGxlJykpXG4gICAgICAgICAgICAubWFwKChlbCkgPT4gbmV3IENvbGxhcHNpYmxlSXRlbSg8SFRNTEVsZW1lbnQ+IGVsLCBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpO1xuICAgIH1cbn1cbiJdfQ==
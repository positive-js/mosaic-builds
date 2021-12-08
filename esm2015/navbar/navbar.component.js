import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, forwardRef, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { ENTER, isVerticalMovement, LEFT_ARROW, RIGHT_ARROW, SPACE, TAB } from '@ptsecurity/cdk/keycodes';
import { merge, Subject } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { McNavbarFocusableItem, McNavbarItem, McNavbarRectangleElement } from './navbar-item.component';
import * as i0 from "@angular/core";
export class McFocusableComponent {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this._tabIndex = 0;
        this.destroyed = new Subject();
    }
    get tabIndex() {
        return this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value;
    }
    get optionFocusChanges() {
        return merge(...this.focusableItems.map((item) => item.onFocus));
    }
    get optionBlurChanges() {
        return merge(...this.focusableItems.map((option) => option.onBlur));
    }
    ngAfterContentInit() {
        this.keyManager = new FocusKeyManager(this.focusableItems)
            .withTypeAhead();
        this.keyManager.setFocusOrigin('keyboard');
        this.keyManager.tabOut
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => {
            this.tabIndex = -1;
            setTimeout(() => {
                this.tabIndex = 0;
                this.changeDetectorRef.markForCheck();
            });
        });
        this.focusableItems.changes
            .pipe(startWith(null), takeUntil(this.destroyed))
            .subscribe(() => {
            this.resetOptions();
            // Check to see if we need to update our tab index
            this.updateTabIndex();
        });
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    focus() {
        if (this.focusableItems.length === 0) {
            return;
        }
        this.keyManager.setFirstItemActive();
    }
    blur() {
        if (!this.hasFocusedItem()) {
            this.keyManager.setActiveItem(-1);
        }
        this.changeDetectorRef.markForCheck();
    }
    resetOptions() {
        this.dropSubscriptions();
        this.listenToOptionsFocus();
    }
    dropSubscriptions() {
        if (this.optionFocusSubscription) {
            this.optionFocusSubscription.unsubscribe();
            this.optionFocusSubscription = null;
        }
        if (this.optionBlurSubscription) {
            this.optionBlurSubscription.unsubscribe();
            this.optionBlurSubscription = null;
        }
    }
    listenToOptionsFocus() {
        this.optionFocusSubscription = this.optionFocusChanges
            .subscribe((event) => {
            const index = this.focusableItems.toArray().indexOf(event.item);
            if (this.isValidIndex(index)) {
                this.keyManager.updateActiveItem(index);
            }
        });
        this.optionBlurSubscription = this.optionBlurChanges
            .subscribe(() => this.blur());
    }
    updateTabIndex() {
        this.tabIndex = this.focusableItems.length === 0 ? -1 : 0;
    }
    isValidIndex(index) {
        return index >= 0 && index < this.focusableItems.length;
    }
    hasFocusedItem() {
        return this.focusableItems.some((item) => item.hasFocus);
    }
}
/** @nocollapse */ McFocusableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McFocusableComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McFocusableComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McFocusableComponent, inputs: { tabIndex: "tabIndex" }, queries: [{ propertyName: "focusableItems", predicate: McNavbarFocusableItem, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McFocusableComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { focusableItems: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarFocusableItem), { descendants: true }]
            }], tabIndex: [{
                type: Input
            }] } });
export class McNavbarContainer {
}
/** @nocollapse */ McNavbarContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbarContainer, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McNavbarContainer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McNavbarContainer, selector: "mc-navbar-container", host: { classAttribute: "mc-navbar-container" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbarContainer, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-container',
                    host: {
                        class: 'mc-navbar-container'
                    }
                }]
        }] });
export class McNavbar extends McFocusableComponent {
    constructor(elementRef, changeDetectorRef) {
        super(changeDetectorRef);
        this.elementRef = elementRef;
        this.resizeStream = new Subject();
        this.resizeDebounceInterval = 100;
        this.updateExpandedStateForItems = () => {
            const collapseDelta = this.totalItemsWidth - this.width;
            const needCollapse = collapseDelta > 0;
            if (needCollapse) {
                this.collapseItems(collapseDelta);
            }
            else {
                this.expandItems(collapseDelta);
            }
        };
        this.setItemsState = () => {
            Promise.resolve()
                .then(() => { var _a; return (_a = this.rectangleElements) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.horizontal = true); });
        };
        this.resizeSubscription = this.resizeStream
            .pipe(debounceTime(this.resizeDebounceInterval))
            .subscribe(this.updateExpandedStateForItems);
    }
    get width() {
        return this.elementRef.nativeElement.getBoundingClientRect().width;
    }
    get totalItemsWidth() {
        return this.rectangleElements
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
        this.rectangleElements.changes
            .subscribe(this.setItemsState);
        super.ngAfterContentInit();
        this.keyManager.withHorizontalOrientation('ltr');
    }
    ngAfterViewInit() {
        // Note: this wait is required for loading and rendering fonts for icons;
        // unfortunately we cannot control font rendering
        setTimeout(this.updateExpandedStateForItems);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
        super.ngOnDestroy();
    }
    onKeyDown(event) {
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        if ([SPACE, ENTER, LEFT_ARROW, RIGHT_ARROW].includes(keyCode) || isVerticalMovement(event)) {
            event.preventDefault();
        }
        if (keyCode === TAB) {
            this.keyManager.tabOut.next();
            return;
        }
        else if (keyCode === RIGHT_ARROW) {
            this.keyManager.setNextItemActive();
        }
        else if (keyCode === LEFT_ARROW) {
            this.keyManager.setPreviousItemActive();
        }
        else {
            this.keyManager.onKeydown(event);
        }
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
    expandItems(collapseDelta) {
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
/** @nocollapse */ McNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbar, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McNavbar, selector: "mc-navbar", host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "onKeyDown($event)", "window:resize": "resizeStream.next($event)" }, properties: { "attr.tabindex": "tabIndex" }, classAttribute: "mc-navbar" }, queries: [{ propertyName: "rectangleElements", predicate: McNavbarRectangleElement, descendants: true }, { propertyName: "navbarItems", predicate: McNavbarItem, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`, isInline: true, styles: [".mc-navbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:relative}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center;position:relative}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McNavbar, decorators: [{
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
                        '[attr.tabindex]': 'tabIndex',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'resizeStream.next($event)'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { rectangleElements: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarRectangleElement), { descendants: true }]
            }], navbarItems: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarItem), { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQ0gsS0FBSyxFQUNMLGtCQUFrQixFQUNsQixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxHQUFHLEVBQ04sTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEUsT0FBTyxFQUNILHFCQUFxQixFQUVyQixZQUFZLEVBQ1osd0JBQXdCLEVBQzNCLE1BQU0seUJBQXlCLENBQUM7O0FBT2pDLE1BQU0sT0FBTyxvQkFBb0I7SUE4QjdCLFlBQXNCLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBZmxELGNBQVMsR0FBRyxDQUFDLENBQUM7UUFVSCxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUtVLENBQUM7SUF4QjlELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBSUQsSUFBSSxr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RUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBFTlRFUixcbiAgICBpc1ZlcnRpY2FsTW92ZW1lbnQsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBTUEFDRSxcbiAgICBUQUJcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgc3RhcnRXaXRoLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgTWNOYXZiYXJGb2N1c2FibGVJdGVtLFxuICAgIE1jTmF2YmFyRm9jdXNhYmxlSXRlbUV2ZW50LFxuICAgIE1jTmF2YmFySXRlbSxcbiAgICBNY05hdmJhclJlY3RhbmdsZUVsZW1lbnRcbn0gZnJvbSAnLi9uYXZiYXItaXRlbS5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCB0eXBlIE1jTmF2YmFyQ29udGFpbmVyUG9zaXRpb25UeXBlID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBNY0ZvY3VzYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE1jTmF2YmFyRm9jdXNhYmxlSXRlbSksIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICBmb2N1c2FibGVJdGVtczogUXVlcnlMaXN0PE1jTmF2YmFyRm9jdXNhYmxlSXRlbT47XG5cbiAgICBrZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8TWNOYXZiYXJGb2N1c2FibGVJdGVtPjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHRhYkluZGV4KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgdGFiSW5kZXgodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RhYkluZGV4ID0gMDtcblxuICAgIGdldCBvcHRpb25Gb2N1c0NoYW5nZXMoKTogT2JzZXJ2YWJsZTxNY05hdmJhckZvY3VzYWJsZUl0ZW1FdmVudD4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5mb2N1c2FibGVJdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0ub25Gb2N1cykpO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25CbHVyQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jTmF2YmFyRm9jdXNhYmxlSXRlbUV2ZW50PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLmZvY3VzYWJsZUl0ZW1zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24ub25CbHVyKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBwcml2YXRlIG9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuICAgIHByaXZhdGUgb3B0aW9uQmx1clN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXI8TWNOYXZiYXJGb2N1c2FibGVJdGVtPih0aGlzLmZvY3VzYWJsZUl0ZW1zKVxuICAgICAgICAud2l0aFR5cGVBaGVhZCgpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGb2N1c09yaWdpbigna2V5Ym9hcmQnKTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0XG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJJbmRleCA9IC0xO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFiSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb2N1c2FibGVJdGVtcy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0T3B0aW9ucygpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIG5lZWQgdG8gdXBkYXRlIG91ciB0YWIgaW5kZXhcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRhYkluZGV4KCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzYWJsZUl0ZW1zLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgfVxuXG4gICAgYmx1cigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzZWRJdGVtKCkpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlc2V0T3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICB0aGlzLmxpc3RlblRvT3B0aW9uc0ZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRyb3BTdWJzY3JpcHRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25Gb2N1c1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxpc3RlblRvT3B0aW9uc0ZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25Gb2N1c0NoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuZm9jdXNhYmxlSXRlbXMudG9BcnJheSgpLmluZGV4T2YoZXZlbnQuaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkSW5kZXgoaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci51cGRhdGVBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkJsdXJDaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYmx1cigpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRhYkluZGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYkluZGV4ID0gdGhpcy5mb2N1c2FibGVJdGVtcy5sZW5ndGggPT09IDAgPyAtMSA6IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZhbGlkSW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuZm9jdXNhYmxlSXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzRm9jdXNlZEl0ZW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzYWJsZUl0ZW1zLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaGFzRm9jdXMpO1xuICAgIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1jb250YWluZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItY29udGFpbmVyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJDb250YWluZXIge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXInLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLW5hdmJhci1jb250YWluZXJdLCBtYy1uYXZiYXItY29udGFpbmVyXCI+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuL25hdmJhci5zY3NzJyxcbiAgICAgICAgJy4vbmF2YmFyLWl0ZW0uc2NzcycsXG4gICAgICAgICcuL25hdmJhci1icmFuZC5zY3NzJyxcbiAgICAgICAgJy4vbmF2YmFyLWRpdmlkZXIuc2NzcydcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXInLFxuXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KScsXG5cbiAgICAgICAgJyh3aW5kb3c6cmVzaXplKSc6ICdyZXNpemVTdHJlYW0ubmV4dCgkZXZlbnQpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhciBleHRlbmRzIE1jRm9jdXNhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWNOYXZiYXJSZWN0YW5nbGVFbGVtZW50KSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHJlY3RhbmdsZUVsZW1lbnRzOiBRdWVyeUxpc3Q8TWNOYXZiYXJSZWN0YW5nbGVFbGVtZW50PjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNY05hdmJhckl0ZW0pLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG5hdmJhckl0ZW1zOiBRdWVyeUxpc3Q8TWNOYXZiYXJJdGVtPjtcblxuICAgIHJlYWRvbmx5IHJlc2l6ZVN0cmVhbSA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSByZXNpemVEZWJvdW5jZUludGVydmFsOiBudW1iZXIgPSAxMDA7XG5cbiAgICBwcml2YXRlIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgdG90YWxJdGVtc1dpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY3RhbmdsZUVsZW1lbnRzXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0uZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKSwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgY29sbGFwc2FibGVJdGVtcygpOiBNY05hdmJhckl0ZW1bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmJhckl0ZW1zXG4gICAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmljb24gJiYgaXRlbS50aXRsZSAmJiBpdGVtLmNvbGxhcHNhYmxlKVxuICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmKTtcblxuICAgICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHRoaXMucmVzaXplU3RyZWFtXG4gICAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUodGhpcy5yZXNpemVEZWJvdW5jZUludGVydmFsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy51cGRhdGVFeHBhbmRlZFN0YXRlRm9ySXRlbXMpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRJdGVtc1N0YXRlKCk7XG5cbiAgICAgICAgdGhpcy5yZWN0YW5nbGVFbGVtZW50cy5jaGFuZ2VzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuc2V0SXRlbXNTdGF0ZSk7XG5cbiAgICAgICAgc3VwZXIubmdBZnRlckNvbnRlbnRJbml0KCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24oJ2x0cicpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gTm90ZTogdGhpcyB3YWl0IGlzIHJlcXVpcmVkIGZvciBsb2FkaW5nIGFuZCByZW5kZXJpbmcgZm9udHMgZm9yIGljb25zO1xuICAgICAgICAvLyB1bmZvcnR1bmF0ZWx5IHdlIGNhbm5vdCBjb250cm9sIGZvbnQgcmVuZGVyaW5nXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGVFeHBhbmRlZFN0YXRlRm9ySXRlbXMpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKFtTUEFDRSwgRU5URVIsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XXS5pbmNsdWRlcyhrZXlDb2RlKSB8fCBpc1ZlcnRpY2FsTW92ZW1lbnQoZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT09IFRBQikge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnRhYk91dC5uZXh0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVFeHBhbmRlZFN0YXRlRm9ySXRlbXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNlRGVsdGEgPSB0aGlzLnRvdGFsSXRlbXNXaWR0aCAtIHRoaXMud2lkdGg7XG5cbiAgICAgICAgY29uc3QgbmVlZENvbGxhcHNlID0gY29sbGFwc2VEZWx0YSA+IDA7XG5cbiAgICAgICAgaWYgKG5lZWRDb2xsYXBzZSkge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRJdGVtcyhjb2xsYXBzZURlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY29sbGFwc2VJdGVtcyhjb2xsYXBzZURlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRlbHRhID0gY29sbGFwc2VEZWx0YTtcblxuICAgICAgICBjb25zdCB1bkNvbGxhcHNlZEl0ZW1zID0gdGhpcy5jb2xsYXBzYWJsZUl0ZW1zXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS5jb2xsYXBzZWQpO1xuXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB1bkNvbGxhcHNlZEl0ZW1zKSB7XG4gICAgICAgICAgICBpdGVtLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgICAgICAgICBkZWx0YSAtPSBpdGVtLmdldFRpdGxlV2lkdGgoKTtcblxuICAgICAgICAgICAgaWYgKGRlbHRhIDwgMCkgeyBicmVhazsgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleHBhbmRJdGVtcyhjb2xsYXBzZURlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRlbHRhID0gY29sbGFwc2VEZWx0YTtcblxuICAgICAgICB0aGlzLmNvbGxhcHNhYmxlSXRlbXNcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29sbGFwc2VkKVxuICAgICAgICAgICAgLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGEgKyBpdGVtLmdldFRpdGxlV2lkdGgoKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgKz0gaXRlbS5nZXRUaXRsZVdpZHRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJdGVtc1N0YXRlID0gKCkgPT4ge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5yZWN0YW5nbGVFbGVtZW50cz8uZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5ob3Jpem9udGFsID0gdHJ1ZSkpO1xuICAgIH1cbn1cbiJdfQ==
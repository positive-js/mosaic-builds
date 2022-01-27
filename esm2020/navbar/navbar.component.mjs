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
/** @nocollapse */ /** @nocollapse */ McFocusableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McFocusableComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McFocusableComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McFocusableComponent, inputs: { tabIndex: "tabIndex" }, queries: [{ propertyName: "focusableItems", predicate: i0.forwardRef(function () { return McNavbarFocusableItem; }), descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McFocusableComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { focusableItems: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarFocusableItem), { descendants: true }]
            }], tabIndex: [{
                type: Input
            }] } });
export class McNavbarContainer {
}
/** @nocollapse */ /** @nocollapse */ McNavbarContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McNavbarContainer, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarContainer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McNavbarContainer, selector: "mc-navbar-container", host: { classAttribute: "mc-navbar-container" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McNavbarContainer, decorators: [{
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
                .then(() => this.rectangleElements?.forEach((item) => item.horizontal = true));
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
/** @nocollapse */ /** @nocollapse */ McNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McNavbar, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McNavbar, selector: "mc-navbar", host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "onKeyDown($event)", "window:resize": "resizeStream.next($event)" }, properties: { "attr.tabindex": "tabIndex" }, classAttribute: "mc-navbar" }, queries: [{ propertyName: "rectangleElements", predicate: i0.forwardRef(function () { return McNavbarRectangleElement; }), descendants: true }, { propertyName: "navbarItems", predicate: i0.forwardRef(function () { return McNavbarItem; }), descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`, isInline: true, styles: [".mc-navbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:relative}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center;position:relative}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McNavbar, decorators: [{
            type: Component,
            args: [{ selector: 'mc-navbar', template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`, host: {
                        class: 'mc-navbar',
                        '[attr.tabindex]': 'tabIndex',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(keydown)': 'onKeyDown($event)',
                        '(window:resize)': 'resizeStream.next($event)'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".mc-navbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:relative}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center;position:relative}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { rectangleElements: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarRectangleElement), { descendants: true }]
            }], navbarItems: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarItem), { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQ0gsS0FBSyxFQUNMLGtCQUFrQixFQUNsQixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxHQUFHLEVBQ04sTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEUsT0FBTyxFQUNILHFCQUFxQixFQUVyQixZQUFZLEVBQ1osd0JBQXdCLEVBQzNCLE1BQU0seUJBQXlCLENBQUM7O0FBT2pDLE1BQU0sT0FBTyxvQkFBb0I7SUE4QjdCLFlBQXNCLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBZmxELGNBQVMsR0FBRyxDQUFDLENBQUM7UUFVSCxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUtVLENBQUM7SUF4QjlELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBVTtRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBSUQsSUFBSSxrQkFBa0I7UUFDbEIsT0FBTyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELElBQUksaUJBQWlCO1FBQ2pCLE9BQU8sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFTRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBZSxDQUF3QixJQUFJLENBQUMsY0FBYyxDQUFDO2FBQ2hGLGFBQWEsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTthQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVuQixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTzthQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDaEQsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXRCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUVqRCxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVTLFlBQVk7UUFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVTLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUM5QixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztTQUN2QztRQUVELElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQjthQUNqRCxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQixNQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQjthQUMvQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVPLGNBQWM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFhO1FBQzlCLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFDNUQsQ0FBQztJQUVPLGNBQWM7UUFDbEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdELENBQUM7O3VKQXhIUSxvQkFBb0I7MklBQXBCLG9CQUFvQiw4SEFDSyxxQkFBcUI7MkZBRDlDLG9CQUFvQjtrQkFEaEMsU0FBUzt3R0FHTixjQUFjO3NCQURiLGVBQWU7dUJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQU0zRSxRQUFRO3NCQURYLEtBQUs7O0FBNEhWLE1BQU0sT0FBTyxpQkFBaUI7O29KQUFqQixpQkFBaUI7d0lBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQU43QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUscUJBQXFCO3FCQUMvQjtpQkFDSjs7QUEyQkQsTUFBTSxPQUFPLFFBQVMsU0FBUSxvQkFBb0I7SUE0QjlDLFlBQ1ksVUFBc0IsRUFDOUIsaUJBQW9DO1FBRXBDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBSGpCLGVBQVUsR0FBVixVQUFVLENBQVk7UUF2QnpCLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVMsQ0FBQztRQUU1QiwyQkFBc0IsR0FBVyxHQUFHLENBQUM7UUEyRXRELGdDQUEyQixHQUFHLEdBQUcsRUFBRTtZQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFeEQsTUFBTSxZQUFZLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUV2QyxJQUFJLFlBQVksRUFBRTtnQkFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDbkM7UUFDTCxDQUFDLENBQUE7UUE2Qk8sa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDekIsT0FBTyxDQUFDLE9BQU8sRUFBRTtpQkFDWixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLENBQUMsQ0FBQTtRQTNGRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVk7YUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUMvQyxTQUFTLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQTNCRCxJQUFZLEtBQUs7UUFDYixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxJQUFZLGVBQWU7UUFDdkIsT0FBTyxJQUFJLENBQUMsaUJBQWlCO2FBQ3hCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsSUFBWSxnQkFBZ0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVzthQUNsQixPQUFPLEVBQUU7YUFDVCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQzdELE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFlRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU87YUFDekIsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVuQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxlQUFlO1FBQ1gseUVBQXlFO1FBQ3pFLGlEQUFpRDtRQUNqRCxVQUFVLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFdEMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBb0I7UUFDMUIsd0NBQXdDO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4RixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFOUIsT0FBTztTQUNWO2FBQU0sSUFBSSxPQUFPLEtBQUssV0FBVyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUN2QzthQUFNLElBQUksT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDM0M7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQWNPLGFBQWEsQ0FBQyxhQUFxQjtRQUN2QyxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUM7UUFFMUIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCO2FBQ3pDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkMsS0FBSyxNQUFNLElBQUksSUFBSSxnQkFBZ0IsRUFBRTtZQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRTlCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFBRSxNQUFNO2FBQUU7U0FDNUI7SUFDTCxDQUFDO0lBRU8sV0FBVyxDQUFDLGFBQXFCO1FBQ3JDLElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUUxQixJQUFJLENBQUMsZ0JBQWdCO2FBQ2hCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNoQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNkLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOzsySUF4SFEsUUFBUTsrSEFBUixRQUFRLDZVQUNpQix3QkFBd0Isd0dBR3hCLFlBQVksMkVBMUJwQywrRUFBK0U7MkZBc0JoRixRQUFRO2tCQXhCcEIsU0FBUzsrQkFDSSxXQUFXLFlBQ1gsK0VBQStFLFFBT25GO3dCQUNGLEtBQUssRUFBRSxXQUFXO3dCQUVsQixpQkFBaUIsRUFBRSxVQUFVO3dCQUU3QixTQUFTLEVBQUUsU0FBUzt3QkFDcEIsUUFBUSxFQUFFLFFBQVE7d0JBRWxCLFdBQVcsRUFBRSxtQkFBbUI7d0JBRWhDLGlCQUFpQixFQUFFLDJCQUEyQjtxQkFDakQsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7aUlBSXJDLGlCQUFpQjtzQkFEaEIsZUFBZTt1QkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBR1YsV0FBVztzQkFBbEYsZUFBZTt1QkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEVOVEVSLFxuICAgIGlzVmVydGljYWxNb3ZlbWVudCxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFNQQUNFLFxuICAgIFRBQlxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgICBNY05hdmJhckZvY3VzYWJsZUl0ZW0sXG4gICAgTWNOYXZiYXJGb2N1c2FibGVJdGVtRXZlbnQsXG4gICAgTWNOYXZiYXJJdGVtLFxuICAgIE1jTmF2YmFyUmVjdGFuZ2xlRWxlbWVudFxufSBmcm9tICcuL25hdmJhci1pdGVtLmNvbXBvbmVudCc7XG5cblxuZXhwb3J0IHR5cGUgTWNOYXZiYXJDb250YWluZXJQb3NpdGlvblR5cGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuXG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE1jRm9jdXNhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTWNOYXZiYXJGb2N1c2FibGVJdGVtKSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIGZvY3VzYWJsZUl0ZW1zOiBRdWVyeUxpc3Q8TWNOYXZiYXJGb2N1c2FibGVJdGVtPjtcblxuICAgIGtleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjxNY05hdmJhckZvY3VzYWJsZUl0ZW0+O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdGFiSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhYkluZGV4O1xuICAgIH1cblxuICAgIHNldCB0YWJJbmRleCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGFiSW5kZXggPSAwO1xuXG4gICAgZ2V0IG9wdGlvbkZvY3VzQ2hhbmdlcygpOiBPYnNlcnZhYmxlPE1jTmF2YmFyRm9jdXNhYmxlSXRlbUV2ZW50PiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi50aGlzLmZvY3VzYWJsZUl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5vbkZvY3VzKSk7XG4gICAgfVxuXG4gICAgZ2V0IG9wdGlvbkJsdXJDaGFuZ2VzKCk6IE9ic2VydmFibGU8TWNOYXZiYXJGb2N1c2FibGVJdGVtRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMuZm9jdXNhYmxlSXRlbXMubWFwKChvcHRpb24pID0+IG9wdGlvbi5vbkJsdXIpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgb3B0aW9uRm9jdXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG4gICAgcHJpdmF0ZSBvcHRpb25CbHVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcjxNY05hdmJhckZvY3VzYWJsZUl0ZW0+KHRoaXMuZm9jdXNhYmxlSXRlbXMpXG4gICAgICAgIC53aXRoVHlwZUFoZWFkKCk7XG5cbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEZvY3VzT3JpZ2luKCdrZXlib2FyZCcpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvY3VzYWJsZUl0ZW1zLmNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgbmVlZCB0byB1cGRhdGUgb3VyIHRhYiBpbmRleFxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGFiSW5kZXgoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG5cbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNhYmxlSXRlbXMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICB9XG5cbiAgICBibHVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzRm9jdXNlZEl0ZW0oKSkge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVzZXRPcHRpb25zKCkge1xuICAgICAgICB0aGlzLmRyb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG9PcHRpb25zRm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZHJvcFN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbkZvY3VzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkJsdXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25CbHVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdGVuVG9PcHRpb25zRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3B0aW9uRm9jdXNTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbkZvY3VzQ2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5mb2N1c2FibGVJdGVtcy50b0FycmF5KCkuaW5kZXhPZihldmVudC5pdGVtKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRJbmRleChpbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0aW9uQmx1clN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9uQmx1ckNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5ibHVyKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVGFiSW5kZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFiSW5kZXggPSB0aGlzLmZvY3VzYWJsZUl0ZW1zLmxlbmd0aCA9PT0gMCA/IC0xIDogMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVmFsaWRJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5mb2N1c2FibGVJdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNGb2N1c2VkSXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNhYmxlSXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5oYXNGb2N1cyk7XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWNvbnRhaW5lcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1jb250YWluZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckNvbnRhaW5lciB7fVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhcicsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudCBzZWxlY3Q9XCJbbWMtbmF2YmFyLWNvbnRhaW5lcl0sIG1jLW5hdmJhci1jb250YWluZXJcIj48L25nLWNvbnRlbnQ+YCxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJy4vbmF2YmFyLnNjc3MnLFxuICAgICAgICAnLi9uYXZiYXItaXRlbS5zY3NzJyxcbiAgICAgICAgJy4vbmF2YmFyLWJyYW5kLnNjc3MnLFxuICAgICAgICAnLi9uYXZiYXItZGl2aWRlci5zY3NzJ1xuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhcicsXG5cbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG5cbiAgICAgICAgJyhmb2N1cyknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcblxuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ3Jlc2l6ZVN0cmVhbS5uZXh0KCRldmVudCknXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyIGV4dGVuZHMgTWNGb2N1c2FibGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNY05hdmJhclJlY3RhbmdsZUVsZW1lbnQpLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gICAgcmVjdGFuZ2xlRWxlbWVudHM6IFF1ZXJ5TGlzdDxNY05hdmJhclJlY3RhbmdsZUVsZW1lbnQ+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE1jTmF2YmFySXRlbSksIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbmF2YmFySXRlbXM6IFF1ZXJ5TGlzdDxNY05hdmJhckl0ZW0+O1xuXG4gICAgcmVhZG9ubHkgcmVzaXplU3RyZWFtID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlc2l6ZURlYm91bmNlSW50ZXJ2YWw6IG51bWJlciA9IDEwMDtcblxuICAgIHByaXZhdGUgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0b3RhbEl0ZW1zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjdGFuZ2xlRWxlbWVudHNcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgaXRlbS5nZXRPdXRlckVsZW1lbnRXaWR0aCgpLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBjb2xsYXBzYWJsZUl0ZW1zKCk6IE1jTmF2YmFySXRlbVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2YmFySXRlbXNcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWNvbiAmJiBpdGVtLnRpdGxlICYmIGl0ZW0uY29sbGFwc2FibGUpXG4gICAgICAgICAgICAucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTdHJlYW1cbiAgICAgICAgICAgIC5waXBlKGRlYm91bmNlVGltZSh0aGlzLnJlc2l6ZURlYm91bmNlSW50ZXJ2YWwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnVwZGF0ZUV4cGFuZGVkU3RhdGVGb3JJdGVtcyk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEl0ZW1zU3RhdGUoKTtcblxuICAgICAgICB0aGlzLnJlY3RhbmdsZUVsZW1lbnRzLmNoYW5nZXNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy5zZXRJdGVtc1N0YXRlKTtcblxuICAgICAgICBzdXBlci5uZ0FmdGVyQ29udGVudEluaXQoKTtcblxuICAgICAgICB0aGlzLmtleU1hbmFnZXIud2l0aEhvcml6b250YWxPcmllbnRhdGlvbignbHRyJyk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBOb3RlOiB0aGlzIHdhaXQgaXMgcmVxdWlyZWQgZm9yIGxvYWRpbmcgYW5kIHJlbmRlcmluZyBmb250cyBmb3IgaWNvbnM7XG4gICAgICAgIC8vIHVuZm9ydHVuYXRlbHkgd2UgY2Fubm90IGNvbnRyb2wgZm9udCByZW5kZXJpbmdcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZUV4cGFuZGVkU3RhdGVGb3JJdGVtcyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcblxuICAgICAgICBpZiAoW1NQQUNFLCBFTlRFUiwgTEVGVF9BUlJPVywgUklHSFRfQVJST1ddLmluY2x1ZGVzKGtleUNvZGUpIHx8IGlzVmVydGljYWxNb3ZlbWVudChldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Q29kZSA9PT0gVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIudGFiT3V0Lm5leHQoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUV4cGFuZGVkU3RhdGVGb3JJdGVtcyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29sbGFwc2VEZWx0YSA9IHRoaXMudG90YWxJdGVtc1dpZHRoIC0gdGhpcy53aWR0aDtcblxuICAgICAgICBjb25zdCBuZWVkQ29sbGFwc2UgPSBjb2xsYXBzZURlbHRhID4gMDtcblxuICAgICAgICBpZiAobmVlZENvbGxhcHNlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlSXRlbXMoY29sbGFwc2VEZWx0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZEl0ZW1zKGNvbGxhcHNlRGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb2xsYXBzZUl0ZW1zKGNvbGxhcHNlRGVsdGE6IG51bWJlcikge1xuICAgICAgICBsZXQgZGVsdGEgPSBjb2xsYXBzZURlbHRhO1xuXG4gICAgICAgIGNvbnN0IHVuQ29sbGFwc2VkSXRlbXMgPSB0aGlzLmNvbGxhcHNhYmxlSXRlbXNcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmNvbGxhcHNlZCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHVuQ29sbGFwc2VkSXRlbXMpIHtcbiAgICAgICAgICAgIGl0ZW0uY29sbGFwc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbHRhIC09IGl0ZW0uZ2V0VGl0bGVXaWR0aCgpO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPCAwKSB7IGJyZWFrOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGV4cGFuZEl0ZW1zKGNvbGxhcHNlRGVsdGE6IG51bWJlcikge1xuICAgICAgICBsZXQgZGVsdGEgPSBjb2xsYXBzZURlbHRhO1xuXG4gICAgICAgIHRoaXMuY29sbGFwc2FibGVJdGVtc1xuICAgICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb2xsYXBzZWQpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkZWx0YSArIGl0ZW0uZ2V0VGl0bGVXaWR0aCgpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSArPSBpdGVtLmdldFRpdGxlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEl0ZW1zU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnJlY3RhbmdsZUVsZW1lbnRzPy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmhvcml6b250YWwgPSB0cnVlKSk7XG4gICAgfVxufVxuIl19
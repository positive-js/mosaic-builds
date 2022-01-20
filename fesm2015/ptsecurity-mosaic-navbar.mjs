import * as i2 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import * as i7 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, ContentChildren, forwardRef, Input, Component, ChangeDetectionStrategy, ViewEncapsulation, ContentChild, Optional, Inject, NgModule } from '@angular/core';
import * as i6 from '@ptsecurity/mosaic/icon';
import { McIcon, McIconModule } from '@ptsecurity/mosaic/icon';
import { McTooltipTrigger, MC_TOOLTIP_SCROLL_STRATEGY, TooltipModifier, McToolTipModule } from '@ptsecurity/mosaic/tooltip';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SPACE, ENTER, LEFT_ARROW, RIGHT_ARROW, isVerticalMovement, TAB, DOWN_ARROW, UP_ARROW, NUMPAD_DIVIDE, SLASH } from '@ptsecurity/cdk/keycodes';
import { McButton, McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { toBoolean, PopUpPlacements } from '@ptsecurity/mosaic/core';
import { Subject, merge, EMPTY } from 'rxjs';
import { takeUntil, startWith, debounceTime, take } from 'rxjs/operators';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VerticalNavbarSizeStatesCollapsedWidth, VerticalNavbarSizeStatesExpandedWidth } from '@ptsecurity/mosaic/design-tokens';
import * as i3 from '@angular/cdk/overlay';
import * as i4 from '@angular/cdk/bidi';
import * as i5 from '@ptsecurity/mosaic/dropdown';

class McFocusableComponent {
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
/** @nocollapse */ /** @nocollapse */ McFocusableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McFocusableComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McFocusableComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McFocusableComponent, inputs: { tabIndex: "tabIndex" }, queries: [{ propertyName: "focusableItems", predicate: i0.forwardRef(function () { return McNavbarFocusableItem; }), descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McFocusableComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { focusableItems: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarFocusableItem), { descendants: true }]
            }], tabIndex: [{
                type: Input
            }] } });
class McNavbarContainer {
}
/** @nocollapse */ /** @nocollapse */ McNavbarContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarContainer, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarContainer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarContainer, selector: "mc-navbar-container", host: { classAttribute: "mc-navbar-container" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarContainer, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-container',
                    host: {
                        class: 'mc-navbar-container'
                    }
                }]
        }] });
class McNavbar extends McFocusableComponent {
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
/** @nocollapse */ /** @nocollapse */ McNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbar, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McNavbar, selector: "mc-navbar", host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "onKeyDown($event)", "window:resize": "resizeStream.next($event)" }, properties: { "attr.tabindex": "tabIndex" }, classAttribute: "mc-navbar" }, queries: [{ propertyName: "rectangleElements", predicate: i0.forwardRef(function () { return McNavbarRectangleElement; }), descendants: true }, { propertyName: "navbarItems", predicate: i0.forwardRef(function () { return McNavbarItem; }), descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>`, isInline: true, styles: [".mc-navbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:relative}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center;position:relative}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbar, decorators: [{
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

function toggleVerticalNavbarAnimation() {
    return trigger('toggle', [
        state('0', style({ width: `var(--mc-vertical-navbar-size-states-closed-width, ${VerticalNavbarSizeStatesCollapsedWidth})` })),
        state('1', style({ width: `var(--mc-vertical-navbar-size-states-opened-width, ${VerticalNavbarSizeStatesExpandedWidth})` })),
        transition('0 <=> 1', animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
    ]);
}

class McVerticalNavbar extends McFocusableComponent {
    constructor(changeDetectorRef) {
        super(changeDetectorRef);
        this.animationDone = new Subject();
        this._expanded = false;
        this.updateExpandedStateForItems = () => {
            var _a;
            (_a = this.rectangleElements) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                item.collapsed = !this.expanded;
                setTimeout(() => { var _a; return (_a = item.button) === null || _a === void 0 ? void 0 : _a.updateClassModifierForIcons(); });
            });
        };
        this.updateTooltipForItems = () => {
            this.items.forEach((item) => item.updateTooltip());
        };
        this.setItemsState = () => {
            Promise.resolve()
                .then(() => { var _a; return (_a = this.rectangleElements) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.vertical = true); });
        };
        this.animationDone
            .subscribe(this.updateTooltipForItems);
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        this._expanded = coerceBooleanProperty(value);
        this.updateExpandedStateForItems();
    }
    ngAfterContentInit() {
        this.setItemsState();
        this.updateExpandedStateForItems();
        this.updateTooltipForItems();
        this.rectangleElements.changes
            .subscribe(this.setItemsState);
        super.ngAfterContentInit();
        this.keyManager.withVerticalOrientation(true);
    }
    toggle() {
        this.expanded = !this.expanded;
        this.changeDetectorRef.markForCheck();
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
        else if (keyCode === DOWN_ARROW) {
            this.keyManager.setNextItemActive();
        }
        else if (keyCode === UP_ARROW) {
            this.keyManager.setPreviousItemActive();
        }
        else {
            this.keyManager.onKeydown(event);
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McVerticalNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McVerticalNavbar, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McVerticalNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McVerticalNavbar, selector: "mc-vertical-navbar", inputs: { expanded: "expanded" }, host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "onKeyDown($event)" }, properties: { "attr.tabindex": "tabIndex" }, classAttribute: "mc-vertical-navbar" }, queries: [{ propertyName: "bento", first: true, predicate: i0.forwardRef(function () { return McNavbarBento; }), descendants: true }, { propertyName: "rectangleElements", predicate: i0.forwardRef(function () { return McNavbarRectangleElement; }), descendants: true }, { propertyName: "items", predicate: i0.forwardRef(function () { return McNavbarItem; }), descendants: true }], exportAs: ["McVerticalNavbar"], usesInheritance: true, ngImport: i0, template: `
        <div class="mc-vertical-navbar__container"
             [@toggle]="expanded"
             (@toggle.done)="animationDone.next()"
             [class.mc-collapsed]="!expanded"
             [class.mc-expanded]="expanded">

            <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
            <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
        </div>
    `, isInline: true, styles: [".mc-vertical-navbar{position:relative;width:56px;width:var(--mc-vertical-navbar-size-states-closed-width, 56px);height:100%}.mc-vertical-navbar .mc-navbar-container{flex-direction:column;align-items:unset}.mc-vertical-navbar .mc-vertical-navbar__container{display:flex;flex-direction:column;justify-content:space-between;height:100%}.mc-vertical-navbar .mc-vertical-navbar__container.mc-collapsed{width:56px;width:var(--mc-vertical-navbar-size-states-closed-width, 56px)}.mc-vertical-navbar .mc-vertical-navbar__container.mc-expanded{width:240px;width:var(--mc-vertical-navbar-size-states-opened-width, 240px)}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], animations: [toggleVerticalNavbarAnimation()], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McVerticalNavbar, decorators: [{
            type: Component,
            args: [{ selector: 'mc-vertical-navbar', exportAs: 'McVerticalNavbar', template: `
        <div class="mc-vertical-navbar__container"
             [@toggle]="expanded"
             (@toggle.done)="animationDone.next()"
             [class.mc-collapsed]="!expanded"
             [class.mc-expanded]="expanded">

            <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
            <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
        </div>
    `, host: {
                        class: 'mc-vertical-navbar',
                        '[attr.tabindex]': 'tabIndex',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(keydown)': 'onKeyDown($event)'
                    }, animations: [toggleVerticalNavbarAnimation()], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".mc-vertical-navbar{position:relative;width:56px;width:var(--mc-vertical-navbar-size-states-closed-width, 56px);height:100%}.mc-vertical-navbar .mc-navbar-container{flex-direction:column;align-items:unset}.mc-vertical-navbar .mc-vertical-navbar__container{display:flex;flex-direction:column;justify-content:space-between;height:100%}.mc-vertical-navbar .mc-vertical-navbar__container.mc-collapsed{width:56px;width:var(--mc-vertical-navbar-size-states-closed-width, 56px)}.mc-vertical-navbar .mc-vertical-navbar__container.mc-expanded{width:240px;width:var(--mc-vertical-navbar-size-states-opened-width, 240px)}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { rectangleElements: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarRectangleElement), { descendants: true }]
            }], items: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarItem), { descendants: true }]
            }], bento: [{
                type: ContentChild,
                args: [forwardRef(() => McNavbarBento)]
            }], expanded: [{
                type: Input
            }] } });

class McNavbarLogo {
    constructor() {
        this.hovered = new Subject();
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarLogo.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarLogo, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarLogo.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarLogo, selector: "mc-navbar-logo, [mc-navbar-logo]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, classAttribute: "mc-navbar-logo" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarLogo, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-logo, [mc-navbar-logo]',
                    host: {
                        class: 'mc-navbar-logo',
                        '(mouseenter)': 'hovered.next(true)',
                        '(mouseleave)': 'hovered.next(false)'
                    }
                }]
        }] });
class McNavbarBento {
}
/** @nocollapse */ /** @nocollapse */ McNavbarBento.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarBento, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarBento.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarBento, selector: "mc-navbar-item[bento], [mc-navbar-item][bento]", host: { classAttribute: "mc-navbar-bento" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarBento, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-item[bento], [mc-navbar-item][bento]',
                    host: {
                        class: 'mc-navbar-bento'
                    }
                }]
        }] });
class McNavbarTitle {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.hovered = new Subject();
        this.isTextOverflown = false;
    }
    get text() {
        return this.elementRef.nativeElement.innerText;
    }
    get isOverflown() {
        return this.elementRef.nativeElement.scrollWidth > this.elementRef.nativeElement.clientWidth;
    }
    getOuterElementWidth() {
        const { width, marginLeft, marginRight } = window.getComputedStyle(this.elementRef.nativeElement);
        return [width, marginLeft, marginRight].reduce((acc, item) => acc + parseInt(item) || 0, 0);
    }
    checkTextOverflown() {
        // tslint:disable-next-line:no-magic-numbers
        this.isTextOverflown = this.text.length > 18;
    }
    ngAfterViewInit() {
        this.outerElementWidth = this.getOuterElementWidth();
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarTitle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarTitle, selector: "mc-navbar-title, [mc-navbar-title]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, properties: { "class.mc-navbar-title_small": "isTextOverflown" }, classAttribute: "mc-navbar-title" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-title, [mc-navbar-title]',
                    host: {
                        class: 'mc-navbar-title',
                        '[class.mc-navbar-title_small]': 'isTextOverflown',
                        '(mouseenter)': 'hovered.next(true)',
                        '(mouseleave)': 'hovered.next(false)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
class McNavbarSubTitle {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.hovered = new Subject();
    }
    get text() {
        return this.elementRef.nativeElement.innerText;
    }
    get isOverflown() {
        return this.elementRef.nativeElement.scrollWidth > this.elementRef.nativeElement.clientWidth;
    }
    getOuterElementWidth() {
        const { width, marginLeft, marginRight } = window.getComputedStyle(this.elementRef.nativeElement);
        return [width, marginLeft, marginRight].reduce((acc, item) => acc + parseInt(item) || 0, 0);
    }
    ngAfterContentInit() {
        this.outerElementWidth = this.getOuterElementWidth();
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarSubTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarSubTitle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarSubTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarSubTitle, selector: "mc-navbar-subtitle, [mc-navbar-subtitle]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, classAttribute: "mc-navbar-subtitle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarSubTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-subtitle, [mc-navbar-subtitle]',
                    host: {
                        class: 'mc-navbar-subtitle',
                        '(mouseenter)': 'hovered.next(true)',
                        '(mouseleave)': 'hovered.next(false)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
class McNavbarBrand {
    constructor(navbar) {
        this.navbar = navbar;
        this.hovered = false;
        this.destroyed = new Subject();
    }
    get hasBento() {
        var _a;
        return !!((_a = this.navbar) === null || _a === void 0 ? void 0 : _a.bento);
    }
    ngAfterContentInit() {
        var _a;
        merge(this.logo ? this.logo.hovered : EMPTY, this.title ? this.title.hovered : EMPTY)
            .pipe(takeUntil(this.destroyed))
            .subscribe((value) => this.hovered = value);
        (_a = this.navbar) === null || _a === void 0 ? void 0 : _a.animationDone.subscribe(() => { var _a; return (_a = this.title) === null || _a === void 0 ? void 0 : _a.checkTextOverflown(); });
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarBrand.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarBrand, deps: [{ token: McVerticalNavbar, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McNavbarBrand.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarBrand, selector: "mc-navbar-brand, [mc-navbar-brand]", host: { properties: { "class.mc-hovered": "hovered", "class.layout-column": "hasBento", "class.layout-row": "!hasBento" }, classAttribute: "mc-navbar-brand" }, queries: [{ propertyName: "logo", first: true, predicate: McNavbarLogo, descendants: true }, { propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }], exportAs: ["mcNavbarBrand"], ngImport: i0, template: `
        <ng-content></ng-content>
        <div class="mc-navbar-item__overlay"></div>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarBrand, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-navbar-brand, [mc-navbar-brand]',
                    exportAs: 'mcNavbarBrand',
                    template: `
        <ng-content></ng-content>
        <div class="mc-navbar-item__overlay"></div>
    `,
                    host: {
                        class: 'mc-navbar-brand',
                        '[class.mc-hovered]': 'hovered',
                        '[class.layout-column]': 'hasBento',
                        '[class.layout-row]': '!hasBento'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: McVerticalNavbar, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { logo: [{
                type: ContentChild,
                args: [McNavbarLogo]
            }], title: [{
                type: ContentChild,
                args: [McNavbarTitle]
            }] } });
class McNavbarDivider {
}
/** @nocollapse */ /** @nocollapse */ McNavbarDivider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarDivider, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarDivider.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarDivider, selector: "mc-navbar-divider", host: { classAttribute: "mc-navbar-divider" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarDivider, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-divider',
                    host: {
                        class: 'mc-navbar-divider'
                    }
                }]
        }] });
class McNavbarFocusableItem {
    constructor(elementRef, changeDetector, focusMonitor, ngZone) {
        this.elementRef = elementRef;
        this.changeDetector = changeDetector;
        this.focusMonitor = focusMonitor;
        this.ngZone = ngZone;
        this.onFocus = new Subject();
        this.onBlur = new Subject();
        this._hasFocus = false;
        this._disabled = false;
    }
    get hasFocus() {
        var _a;
        return !!((_a = this.button) === null || _a === void 0 ? void 0 : _a.hasFocus) || this._hasFocus;
    }
    set hasFocus(value) {
        this._hasFocus = value;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.changeDetector.markForCheck();
        }
    }
    get tabIndex() {
        return -1;
    }
    ngAfterContentInit() {
        if (this.button) {
            this.button.tabIndex = -1;
        }
        this.focusMonitor.monitor(this.elementRef);
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
    onFocusHandler() {
        if (this.disabled || this.hasFocus) {
            return;
        }
        this.onFocus.next({ item: this });
        this.hasFocus = true;
        this.changeDetector.markForCheck();
        this.elementRef.nativeElement.focus();
    }
    focus(origin) {
        if (this.disabled || this.hasFocus) {
            return origin;
        }
        if (origin === 'keyboard') {
            this.focusMonitor.focusVia(this.elementRef, origin);
        }
        if (this.button) {
            this.button.focusViaKeyboard();
            this.changeDetector.markForCheck();
            return;
        }
        this.onFocusHandler();
    }
    blur() {
        // When animations are enabled, Angular may end up removing the option from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the list
        // that moves focus not the next item. To work around the issue, we defer marking the option
        // as not focused until the next time the zone stabilizes.
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            this.ngZone.run(() => {
                var _a;
                this._hasFocus = false;
                if ((_a = this.button) === null || _a === void 0 ? void 0 : _a.hasFocus) {
                    return;
                }
                this.onBlur.next({ item: this });
            });
        });
    }
    getLabel() {
        var _a;
        return ((_a = this.title) === null || _a === void 0 ? void 0 : _a.text) || '';
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarFocusableItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarFocusableItem, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarFocusableItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarFocusableItem, selector: "mc-navbar-item, [mc-navbar-item], mc-navbar-brand, [mc-navbar-brand], mc-navbar-toggle", inputs: { disabled: "disabled" }, host: { listeners: { "focus": "onFocusHandler()", "blur": "blur()" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null", "class.mc-navbar-item_button": "button" }, classAttribute: "mc-navbar-focusable-item" }, queries: [{ propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }, { propertyName: "button", first: true, predicate: McButton, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarFocusableItem, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-item, [mc-navbar-item], mc-navbar-brand, [mc-navbar-brand], mc-navbar-toggle',
                    host: {
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-navbar-focusable-item',
                        '[class.mc-navbar-item_button]': 'button',
                        '(focus)': 'onFocusHandler()',
                        '(blur)': 'blur()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.FocusMonitor }, { type: i0.NgZone }]; }, propDecorators: { title: [{
                type: ContentChild,
                args: [McNavbarTitle]
            }], button: [{
                type: ContentChild,
                args: [McButton]
            }], disabled: [{
                type: Input
            }] } });
class McNavbarItem extends McTooltipTrigger {
    constructor(rectangleElement, changeDetectorRef, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction, dropdownTrigger, bento) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this.rectangleElement = rectangleElement;
        this.changeDetectorRef = changeDetectorRef;
        this.dropdownTrigger = dropdownTrigger;
        this.bento = bento;
        this._collapsed = false;
        this._collapsable = true;
        if (this.hasDropDownTrigger) {
            this.dropdownTrigger.openByArrowDown = false;
        }
        this.rectangleElement.state
            .subscribe(() => {
            this.collapsed = this.rectangleElement.collapsed;
            this.changeDetectorRef.detectChanges();
        });
    }
    get collapsed() {
        return this._collapsed;
    }
    set collapsed(value) {
        if (this._collapsed !== value) {
            this._collapsed = value;
            this.updateTooltip();
        }
    }
    get croppedText() {
        var _a, _b;
        const croppedTitleText = ((_a = this.title) === null || _a === void 0 ? void 0 : _a.isOverflown) ? this.titleText : '';
        const croppedSubTitleText = ((_b = this.subTitle) === null || _b === void 0 ? void 0 : _b.isOverflown) ? this.subTitleText : '';
        return `${croppedTitleText}\n ${croppedSubTitleText}`;
    }
    get collapsable() {
        return this._collapsable;
    }
    set collapsable(value) {
        this._collapsable = coerceBooleanProperty(value);
    }
    get titleText() {
        var _a;
        return this.collapsedText || ((_a = this.title) === null || _a === void 0 ? void 0 : _a.text) || null;
    }
    get subTitleText() {
        var _a;
        return ((_a = this.subTitle) === null || _a === void 0 ? void 0 : _a.text) || null;
    }
    get disabled() {
        return (!this.collapsed && !this.hasCroppedText) || !this.title;
    }
    get hasDropDownTrigger() {
        return !!this.dropdownTrigger;
    }
    get showVerticalDropDownAngle() {
        return !this.bento && this.hasDropDownTrigger && this.rectangleElement.vertical && !this.collapsed;
    }
    get showHorizontalDropDownAngle() {
        return this.hasDropDownTrigger && this.rectangleElement.horizontal && !this.collapsed;
    }
    get hasCroppedText() {
        var _a, _b;
        return !!(((_a = this.title) === null || _a === void 0 ? void 0 : _a.isOverflown) || ((_b = this.subTitle) === null || _b === void 0 ? void 0 : _b.isOverflown));
    }
    ngAfterContentInit() {
        this.updateTooltip();
    }
    updateTooltip() {
        if (this.collapsed) {
            this.content = `${this.titleText}\n ${this.subTitleText || ''}`;
        }
        else if (!this.collapsed && this.hasCroppedText) {
            this.content = this.croppedText;
        }
        if (this.rectangleElement.vertical) {
            this.placement = PopUpPlacements.Right;
        }
        this.changeDetectorRef.markForCheck();
    }
    getTitleWidth() {
        return this.title.outerElementWidth;
    }
    onKeyDown($event) {
        if (!this.hasDropDownTrigger) {
            return;
        }
        if ([ENTER, SPACE].includes($event.keyCode) ||
            (this.rectangleElement.horizontal && $event.keyCode === DOWN_ARROW)) {
            this.dropdownTrigger.openedBy = 'keyboard';
            this.dropdownTrigger.open();
            $event.preventDefault();
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarItem, deps: [{ token: McNavbarRectangleElement }, { token: i0.ChangeDetectorRef }, { token: i3.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: i5.McDropdownTrigger, optional: true }, { token: McNavbarBento, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McNavbarItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarItem, selector: "mc-navbar-item, [mc-navbar-item]", inputs: { collapsedText: "collapsedText", collapsed: "collapsed", collapsable: "collapsable" }, host: { listeners: { "keydown": "onKeyDown($event)" }, properties: { "class.mc-navbar-item_collapsed": "collapsed" }, classAttribute: "mc-navbar-item" }, queries: [{ propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }, { propertyName: "subTitle", first: true, predicate: McNavbarSubTitle, descendants: true }, { propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcNavbarItem"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<div class=\"mc-navbar-item__container\" *ngIf=\"title\">\n    <div class=\"mc-navbar-item__title\">\n        <ng-content select=\"mc-navbar-title, [mc-navbar-title]\"></ng-content>\n        <ng-content select=\"mc-navbar-subtitle, [mc-navbar-subtitle]\"></ng-content>\n    </div>\n\n    <i class=\"mc-navbar-item__arrow-icon\" mc-icon=\"mc-angle-right-M_24\" *ngIf=\"showVerticalDropDownAngle\"></i>\n    <i class=\"mc-navbar-item__arrow-icon\" mc-icon=\"mc-angle-down-S_16\" *ngIf=\"showHorizontalDropDownAngle\"></i>\n\n</div>\n\n<ng-content></ng-content>\n\n<div class=\"mc-navbar-item__overlay\"></div>\n", components: [{ type: i6.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarItem, decorators: [{
            type: Component,
            args: [{ selector: 'mc-navbar-item, [mc-navbar-item]', exportAs: 'mcNavbarItem', host: {
                        class: 'mc-navbar-item',
                        '[class.mc-navbar-item_collapsed]': 'collapsed',
                        '(keydown)': 'onKeyDown($event)'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<div class=\"mc-navbar-item__container\" *ngIf=\"title\">\n    <div class=\"mc-navbar-item__title\">\n        <ng-content select=\"mc-navbar-title, [mc-navbar-title]\"></ng-content>\n        <ng-content select=\"mc-navbar-subtitle, [mc-navbar-subtitle]\"></ng-content>\n    </div>\n\n    <i class=\"mc-navbar-item__arrow-icon\" mc-icon=\"mc-angle-right-M_24\" *ngIf=\"showVerticalDropDownAngle\"></i>\n    <i class=\"mc-navbar-item__arrow-icon\" mc-icon=\"mc-angle-down-S_16\" *ngIf=\"showHorizontalDropDownAngle\"></i>\n\n</div>\n\n<ng-content></ng-content>\n\n<div class=\"mc-navbar-item__overlay\"></div>\n" }]
        }], ctorParameters: function () {
        return [{ type: McNavbarRectangleElement }, { type: i0.ChangeDetectorRef }, { type: i3.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i3.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MC_TOOLTIP_SCROLL_STRATEGY]
                    }] }, { type: i4.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: i5.McDropdownTrigger, decorators: [{
                        type: Optional
                    }] }, { type: McNavbarBento, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { title: [{
                type: ContentChild,
                args: [McNavbarTitle]
            }], subTitle: [{
                type: ContentChild,
                args: [McNavbarSubTitle]
            }], icon: [{
                type: ContentChild,
                args: [McIcon]
            }], collapsedText: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], collapsable: [{
                type: Input
            }] } });
class McNavbarRectangleElement {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.state = new Subject();
    }
    get horizontal() {
        return this._horizontal;
    }
    set horizontal(value) {
        this._horizontal = value;
        this.state.next();
    }
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = value;
        this.state.next();
    }
    get collapsed() {
        return this._collapsed;
    }
    set collapsed(value) {
        this._collapsed = value;
        this.state.next();
    }
    getOuterElementWidth() {
        const { width, marginLeft, marginRight } = window.getComputedStyle(this.elementRef.nativeElement);
        return [width, marginLeft, marginRight].reduce((acc, item) => acc + parseInt(item), 0);
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarRectangleElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarRectangleElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarRectangleElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarRectangleElement, selector: "mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]", host: { properties: { "class.mc-vertical": "vertical", "class.mc-horizontal": "horizontal", "class.mc-expanded": "vertical && !collapsed", "class.mc-collapsed": "vertical && collapsed" } }, queries: [{ propertyName: "button", first: true, predicate: McButtonCssStyler, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarRectangleElement, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]',
                    host: {
                        '[class.mc-vertical]': 'vertical',
                        '[class.mc-horizontal]': 'horizontal',
                        '[class.mc-expanded]': 'vertical && !collapsed',
                        '[class.mc-collapsed]': 'vertical && collapsed'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { button: [{
                type: ContentChild,
                args: [McButtonCssStyler]
            }] } });
class McNavbarToggle extends McTooltipTrigger {
    constructor(navbar, changeDetectorRef, overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction, document) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this.navbar = navbar;
        this.changeDetectorRef = changeDetectorRef;
        this.document = document;
        this.modifier = TooltipModifier.Default;
        this.toggle = () => {
            this.navbar.toggle();
            this.changeDetectorRef.markForCheck();
            this.hide();
        };
        this.windowToggleHandler = (event) => {
            if (event.ctrlKey && [NUMPAD_DIVIDE, SLASH].includes(event.keyCode)) {
                this.ngZone.run(this.toggle);
            }
        };
        this.placement = PopUpPlacements.Right;
        const window = this.getWindow();
        if (window) {
            this.ngZone.runOutsideAngular(() => {
                window.addEventListener('keydown', this.windowToggleHandler);
            });
        }
    }
    get content() {
        return this._content;
    }
    set content(content) {
        this._content = content;
        this.updateData();
    }
    get disabled() {
        return this.navbar.expanded;
    }
    onKeydown($event) {
        if ([SPACE, ENTER].includes($event.keyCode)) {
            this.toggle();
            $event.stopPropagation();
            $event.preventDefault();
        }
        super.handleKeydown($event);
    }
    ngOnDestroy() {
        const window = this.getWindow();
        if (window) {
            window.removeEventListener('keydown', this.windowToggleHandler);
        }
    }
    getWindow() {
        var _a;
        return ((_a = this.document) === null || _a === void 0 ? void 0 : _a.defaultView) || window;
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarToggle, deps: [{ token: McVerticalNavbar }, { token: i0.ChangeDetectorRef }, { token: i3.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McNavbarToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McNavbarToggle, selector: "mc-navbar-toggle", inputs: { content: ["mcCollapsedTooltip", "content"] }, host: { listeners: { "keydown": "onKeydown($event)", "click": "toggle()", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" }, classAttribute: "mc-navbar-item mc-navbar-toggle mc-vertical" }, queries: [{ propertyName: "customIcon", first: true, predicate: McIcon, descendants: true }], usesInheritance: true, ngImport: i0, template: `
        <i mc-icon
           [class.mc-angle-left-M_24]="navbar.expanded"
           [class.mc-angle-right-M_24]="!navbar.expanded"
           *ngIf="!customIcon">
        </i>

        <ng-content select="[mc-icon]"></ng-content>

        <div class="mc-navbar-item__title" *ngIf="navbar.expanded">
            <ng-content select="mc-navbar-title"></ng-content>
        </div>

        <div class="mc-navbar-item__overlay"></div>
    `, isInline: true, styles: [".mc-navbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:relative}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center;position:relative}\n"], components: [{ type: i6.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarToggle, decorators: [{
            type: Component,
            args: [{ selector: 'mc-navbar-toggle', template: `
        <i mc-icon
           [class.mc-angle-left-M_24]="navbar.expanded"
           [class.mc-angle-right-M_24]="!navbar.expanded"
           *ngIf="!customIcon">
        </i>

        <ng-content select="[mc-icon]"></ng-content>

        <div class="mc-navbar-item__title" *ngIf="navbar.expanded">
            <ng-content select="mc-navbar-title"></ng-content>
        </div>

        <div class="mc-navbar-item__overlay"></div>
    `, host: {
                        class: 'mc-navbar-item mc-navbar-toggle mc-vertical',
                        '[class.mc-tooltip_open]': 'isOpen',
                        '(keydown)': 'onKeydown($event)',
                        '(click)': 'toggle()',
                        '(touchend)': 'handleTouchend()'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".mc-navbar{display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:relative}.mc-navbar-container{display:flex;flex-shrink:0;flex-direction:row;justify-content:space-between;align-items:center;position:relative}\n"] }]
        }], ctorParameters: function () {
        return [{ type: McVerticalNavbar }, { type: i0.ChangeDetectorRef }, { type: i3.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i3.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MC_TOOLTIP_SCROLL_STRATEGY]
                    }] }, { type: i4.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    }, propDecorators: { customIcon: [{
                type: ContentChild,
                args: [McIcon]
            }], content: [{
                type: Input,
                args: ['mcCollapsedTooltip']
            }] } });

class McNavbarModule {
}
/** @nocollapse */ /** @nocollapse */ McNavbarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McNavbarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarModule, declarations: [McNavbar,
        McNavbarContainer,
        McNavbarTitle,
        McNavbarItem,
        McNavbarBrand,
        McNavbarLogo,
        McNavbarToggle,
        McVerticalNavbar,
        McNavbarDivider,
        McNavbarFocusableItem,
        McNavbarRectangleElement,
        McNavbarSubTitle,
        McNavbarBento], imports: [CommonModule,
        A11yModule,
        PlatformModule,
        McIconModule,
        McToolTipModule], exports: [McNavbar,
        McNavbarContainer,
        McNavbarTitle,
        McNavbarItem,
        McNavbarBrand,
        McNavbarLogo,
        McNavbarToggle,
        McVerticalNavbar,
        McNavbarDivider,
        McNavbarFocusableItem,
        McNavbarRectangleElement,
        McNavbarSubTitle,
        McNavbarBento] });
/** @nocollapse */ /** @nocollapse */ McNavbarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule,
            McIconModule,
            McToolTipModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule,
                        McIconModule,
                        McToolTipModule
                    ],
                    exports: [
                        McNavbar,
                        McNavbarContainer,
                        McNavbarTitle,
                        McNavbarItem,
                        McNavbarBrand,
                        McNavbarLogo,
                        McNavbarToggle,
                        McVerticalNavbar,
                        McNavbarDivider,
                        McNavbarFocusableItem,
                        McNavbarRectangleElement,
                        McNavbarSubTitle,
                        McNavbarBento
                    ],
                    declarations: [
                        McNavbar,
                        McNavbarContainer,
                        McNavbarTitle,
                        McNavbarItem,
                        McNavbarBrand,
                        McNavbarLogo,
                        McNavbarToggle,
                        McVerticalNavbar,
                        McNavbarDivider,
                        McNavbarFocusableItem,
                        McNavbarRectangleElement,
                        McNavbarSubTitle,
                        McNavbarBento
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McFocusableComponent, McNavbar, McNavbarBento, McNavbarBrand, McNavbarContainer, McNavbarDivider, McNavbarFocusableItem, McNavbarItem, McNavbarLogo, McNavbarModule, McNavbarRectangleElement, McNavbarSubTitle, McNavbarTitle, McNavbarToggle, McVerticalNavbar };
//# sourceMappingURL=ptsecurity-mosaic-navbar.mjs.map

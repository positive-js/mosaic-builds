import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, Inject, Input, NgZone, Optional, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DOWN_ARROW, ENTER, NUMPAD_DIVIDE, SLASH, SPACE } from '@ptsecurity/cdk/keycodes';
import { McButton, McButtonCssStyler } from '@ptsecurity/mosaic/button';
import { PopUpPlacements, toBoolean } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { MC_TOOLTIP_SCROLL_STRATEGY, McTooltipTrigger, TooltipModifier } from '@ptsecurity/mosaic/tooltip';
import { EMPTY, merge, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { McVerticalNavbar } from './vertical-navbar.component';
import * as i0 from "@angular/core";
import * as i1 from "./vertical-navbar.component";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/overlay";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@ptsecurity/mosaic/dropdown";
import * as i6 from "@ptsecurity/mosaic/icon";
import * as i7 from "@angular/common";
export class McNavbarLogo {
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
export class McNavbarBento {
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
export class McNavbarTitle {
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
export class McNavbarSubTitle {
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
export class McNavbarBrand {
    constructor(navbar) {
        this.navbar = navbar;
        this.hovered = false;
        this.destroyed = new Subject();
    }
    get hasBento() {
        return !!this.navbar?.bento;
    }
    ngAfterContentInit() {
        merge(this.logo ? this.logo.hovered : EMPTY, this.title ? this.title.hovered : EMPTY)
            .pipe(takeUntil(this.destroyed))
            .subscribe((value) => this.hovered = value);
        this.navbar?.animationDone
            .subscribe(() => this.title?.checkTextOverflown());
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarBrand.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarBrand, deps: [{ token: i1.McVerticalNavbar, optional: true }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.McVerticalNavbar, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { logo: [{
                type: ContentChild,
                args: [McNavbarLogo]
            }], title: [{
                type: ContentChild,
                args: [McNavbarTitle]
            }] } });
export class McNavbarDivider {
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
export class McNavbarFocusableItem {
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
        return !!this.button?.hasFocus || this._hasFocus;
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
                this._hasFocus = false;
                if (this.button?.hasFocus) {
                    return;
                }
                this.onBlur.next({ item: this });
            });
        });
    }
    getLabel() {
        return this.title?.text || '';
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
export class McNavbarItem extends McTooltipTrigger {
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
        const croppedTitleText = this.title?.isOverflown ? this.titleText : '';
        const croppedSubTitleText = this.subTitle?.isOverflown ? this.subTitleText : '';
        return `${croppedTitleText}\n ${croppedSubTitleText}`;
    }
    get collapsable() {
        return this._collapsable;
    }
    set collapsable(value) {
        this._collapsable = coerceBooleanProperty(value);
    }
    get titleText() {
        return this.collapsedText || this.title?.text || null;
    }
    get subTitleText() {
        return this.subTitle?.text || null;
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
        return !!(this.title?.isOverflown || this.subTitle?.isOverflown);
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
        }], ctorParameters: function () { return [{ type: McNavbarRectangleElement }, { type: i0.ChangeDetectorRef }, { type: i3.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i3.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i5.McDropdownTrigger, decorators: [{
                    type: Optional
                }] }, { type: McNavbarBento, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { title: [{
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
export class McNavbarRectangleElement {
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
export class McNavbarToggle extends McTooltipTrigger {
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
        return this.document?.defaultView || window;
    }
}
/** @nocollapse */ /** @nocollapse */ McNavbarToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McNavbarToggle, deps: [{ token: i1.McVerticalNavbar }, { token: i0.ChangeDetectorRef }, { token: i3.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.McVerticalNavbar }, { type: i0.ChangeDetectorRef }, { type: i3.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i3.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { customIcon: [{
                type: ContentChild,
                args: [McIcon]
            }], content: [{
                type: Input,
                args: ['mcCollapsedTooltip']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL25hdmJhci9uYXZiYXItaXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvbmF2YmFyL25hdmJhci1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUVSLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRixPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQs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QkFBbUIsQ0FBQyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQVVPLFNBQVM7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxJQUFJLE1BQU0sQ0FBQztJQUNoRCxDQUFDOztpSkExRVEsY0FBYywwTkE0QlgsMEJBQTBCLDJEQUVkLFFBQVE7cUlBOUJ2QixjQUFjLHdYQUNULE1BQU0sdUVBNUJWOzs7Ozs7Ozs7Ozs7OztLQWNUOzJGQWFRLGNBQWM7a0JBN0IxQixTQUFTOytCQUNJLGtCQUFrQixZQUNsQjs7Ozs7Ozs7Ozs7Ozs7S0FjVCxRQUVLO3dCQUNGLEtBQUssRUFBRSw2Q0FBNkM7d0JBQ3BELHlCQUF5QixFQUFFLFFBQVE7d0JBRW5DLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLFNBQVMsRUFBRSxVQUFVO3dCQUNyQixZQUFZLEVBQUUsa0JBQWtCO3FCQUNuQyxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBOEJoQyxNQUFNOzJCQUFDLDBCQUEwQjs7MEJBQ2pDLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsUUFBUTs0Q0E3QlYsVUFBVTtzQkFBL0IsWUFBWTt1QkFBQyxNQUFNO2dCQUdoQixPQUFPO3NCQURWLEtBQUs7dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE92ZXJsYXksIFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5URVIsIE5VTVBBRF9ESVZJREUsIFNMQVNILCBTUEFDRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBNY0J1dHRvbiwgTWNCdXR0b25Dc3NTdHlsZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcbmltcG9ydCB7IFBvcFVwUGxhY2VtZW50cywgdG9Cb29sZWFuIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNEcm9wZG93blRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZHJvcGRvd24nO1xuaW1wb3J0IHsgTWNJY29uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1ksIE1jVG9vbHRpcFRyaWdnZXIsIFRvb2x0aXBNb2RpZmllciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcbmltcG9ydCB7IEVNUFRZLCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY1ZlcnRpY2FsTmF2YmFyIH0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50JztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNOYXZiYXJGb2N1c2FibGVJdGVtRXZlbnQge1xuICAgIGl0ZW06IE1jTmF2YmFyRm9jdXNhYmxlSXRlbTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1sb2dvLCBbbWMtbmF2YmFyLWxvZ29dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWxvZ28nLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hvdmVyZWQubmV4dCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnaG92ZXJlZC5uZXh0KGZhbHNlKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyTG9nbyB7XG4gICAgcmVhZG9ubHkgaG92ZXJlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItaXRlbVtiZW50b10sIFttYy1uYXZiYXItaXRlbV1bYmVudG9dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWJlbnRvJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJCZW50byB7fVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLXRpdGxlLCBbbWMtbmF2YmFyLXRpdGxlXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci10aXRsZScsXG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLXRpdGxlX3NtYWxsXSc6ICdpc1RleHRPdmVyZmxvd24nLFxuXG4gICAgICAgICcobW91c2VlbnRlciknOiAnaG92ZXJlZC5uZXh0KHRydWUpJyxcbiAgICAgICAgJyhtb3VzZWxlYXZlKSc6ICdob3ZlcmVkLm5leHQoZmFsc2UpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUaXRsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIHJlYWRvbmx5IGhvdmVyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgb3V0ZXJFbGVtZW50V2lkdGg6IG51bWJlcjtcbiAgICBpc1RleHRPdmVyZmxvd246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCB0ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG4gICAgfVxuXG4gICAgZ2V0IGlzT3ZlcmZsb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBnZXRPdXRlckVsZW1lbnRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBbd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0XS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgcGFyc2VJbnQoaXRlbSkgfHwgMCwgMCk7XG4gICAgfVxuXG4gICAgY2hlY2tUZXh0T3ZlcmZsb3duKCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICB0aGlzLmlzVGV4dE92ZXJmbG93biA9IHRoaXMudGV4dC5sZW5ndGggPiAxODtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3V0ZXJFbGVtZW50V2lkdGggPSB0aGlzLmdldE91dGVyRWxlbWVudFdpZHRoKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1zdWJ0aXRsZSwgW21jLW5hdmJhci1zdWJ0aXRsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItc3VidGl0bGUnLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hvdmVyZWQubmV4dCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnaG92ZXJlZC5uZXh0KGZhbHNlKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyU3ViVGl0bGUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICByZWFkb25seSBob3ZlcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIG91dGVyRWxlbWVudFdpZHRoOiBudW1iZXI7XG5cbiAgICBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH1cblxuICAgIGdldCBpc092ZXJmbG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gW3dpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodF0ucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIHBhcnNlSW50KGl0ZW0pIHx8IDAsIDApO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vdXRlckVsZW1lbnRXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKTtcbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItYnJhbmQsIFttYy1uYXZiYXItYnJhbmRdJyxcbiAgICBleHBvcnRBczogJ21jTmF2YmFyQnJhbmQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLW5hdmJhci1pdGVtX19vdmVybGF5XCI+PC9kaXY+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWJyYW5kJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ob3ZlcmVkXSc6ICdob3ZlcmVkJyxcbiAgICAgICAgJ1tjbGFzcy5sYXlvdXQtY29sdW1uXSc6ICdoYXNCZW50bycsXG4gICAgICAgICdbY2xhc3MubGF5b3V0LXJvd10nOiAnIWhhc0JlbnRvJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJCcmFuZCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZChNY05hdmJhckxvZ28pIGxvZ286IE1jTmF2YmFyTG9nbztcbiAgICBAQ29udGVudENoaWxkKE1jTmF2YmFyVGl0bGUpIHRpdGxlOiBNY05hdmJhclRpdGxlO1xuXG4gICAgaG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IGhhc0JlbnRvKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm5hdmJhcj8uYmVudG87XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBuYXZiYXI6IE1jVmVydGljYWxOYXZiYXIpIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5sb2dvID8gdGhpcy5sb2dvLmhvdmVyZWQgOiBFTVBUWSxcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPyB0aGlzLnRpdGxlLmhvdmVyZWQgOiBFTVBUWVxuICAgICAgICApXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB0aGlzLmhvdmVyZWQgPSB2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5uYXZiYXI/LmFuaW1hdGlvbkRvbmVcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy50aXRsZT8uY2hlY2tUZXh0T3ZlcmZsb3duKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWRpdmlkZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItZGl2aWRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyRGl2aWRlciB7fVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0sIFttYy1uYXZiYXItaXRlbV0sIG1jLW5hdmJhci1icmFuZCwgW21jLW5hdmJhci1icmFuZF0sIG1jLW5hdmJhci10b2dnbGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItZm9jdXNhYmxlLWl0ZW0nLFxuICAgICAgICAnW2NsYXNzLm1jLW5hdmJhci1pdGVtX2J1dHRvbl0nOiAnYnV0dG9uJyxcblxuICAgICAgICAnKGZvY3VzKSc6ICdvbkZvY3VzSGFuZGxlcigpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckZvY3VzYWJsZUl0ZW0gaW1wbGVtZW50cyBJRm9jdXNhYmxlT3B0aW9uLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGQoTWNOYXZiYXJUaXRsZSkgdGl0bGU6IE1jTmF2YmFyVGl0bGU7XG5cbiAgICBAQ29udGVudENoaWxkKE1jQnV0dG9uKSBidXR0b246IE1jQnV0dG9uO1xuXG4gICAgcmVhZG9ubHkgb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE1jTmF2YmFyRm9jdXNhYmxlSXRlbUV2ZW50PigpO1xuXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNOYXZiYXJGb2N1c2FibGVJdGVtRXZlbnQ+KCk7XG5cbiAgICBnZXQgaGFzRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuYnV0dG9uPy5oYXNGb2N1cyB8fCB0aGlzLl9oYXNGb2N1cztcbiAgICB9XG5cbiAgICBzZXQgaGFzRm9jdXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGFzRm9jdXMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgICApIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5idXR0b24udGFiSW5kZXggPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5oYXNGb2N1cykgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLm9uRm9jdXMubmV4dCh7IGl0ZW06IHRoaXMgfSk7XG5cbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzKG9yaWdpbj86IEZvY3VzT3JpZ2luKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaGFzRm9jdXMpIHsgcmV0dXJuIG9yaWdpbjsgfVxuXG4gICAgICAgIGlmIChvcmlnaW4gPT09ICdrZXlib2FyZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuZWxlbWVudFJlZiwgb3JpZ2luKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5idXR0b24uZm9jdXNWaWFLZXlib2FyZCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRm9jdXNIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIG9wdGlvbiBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIGxpc3RcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBvcHRpb25cbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFzRm9jdXMgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idXR0b24/Lmhhc0ZvY3VzKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CbHVyLm5leHQoeyBpdGVtOiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGU/LnRleHQgfHwgJyc7XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0sIFttYy1uYXZiYXItaXRlbV0nLFxuICAgIGV4cG9ydEFzOiAnbWNOYXZiYXJJdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmF2YmFyLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItaXRlbScsXG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLWl0ZW1fY29sbGFwc2VkXSc6ICdjb2xsYXBzZWQnLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFySXRlbSBleHRlbmRzIE1jVG9vbHRpcFRyaWdnZXIge1xuICAgIEBDb250ZW50Q2hpbGQoTWNOYXZiYXJUaXRsZSkgdGl0bGU6IE1jTmF2YmFyVGl0bGU7XG4gICAgQENvbnRlbnRDaGlsZChNY05hdmJhclN1YlRpdGxlKSBzdWJUaXRsZTogTWNOYXZiYXJTdWJUaXRsZTtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNJY29uKSBpY29uOiBNY0ljb247XG5cbiAgICBASW5wdXQoKSBjb2xsYXBzZWRUZXh0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWQ7XG4gICAgfVxuXG4gICAgc2V0IGNvbGxhcHNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fY29sbGFwc2VkICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGFwc2VkID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICBnZXQgY3JvcHBlZFRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY3JvcHBlZFRpdGxlVGV4dCA9IHRoaXMudGl0bGU/LmlzT3ZlcmZsb3duID8gdGhpcy50aXRsZVRleHQgOiAnJztcbiAgICAgICAgY29uc3QgY3JvcHBlZFN1YlRpdGxlVGV4dCA9IHRoaXMuc3ViVGl0bGU/LmlzT3ZlcmZsb3duID8gdGhpcy5zdWJUaXRsZVRleHQgOiAnJztcblxuICAgICAgICByZXR1cm4gYCR7Y3JvcHBlZFRpdGxlVGV4dH1cXG4gJHtjcm9wcGVkU3ViVGl0bGVUZXh0fWA7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgY29sbGFwc2FibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzYWJsZTtcbiAgICB9XG5cbiAgICBzZXQgY29sbGFwc2FibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2FibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbGxhcHNhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGdldCB0aXRsZVRleHQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlZFRleHQgfHwgdGhpcy50aXRsZT8udGV4dCB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldCBzdWJUaXRsZVRleHQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YlRpdGxlPy50ZXh0IHx8IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKCF0aGlzLmNvbGxhcHNlZCAmJiAhdGhpcy5oYXNDcm9wcGVkVGV4dCkgfHwgIXRoaXMudGl0bGU7XG4gICAgfVxuXG4gICAgZ2V0IGhhc0Ryb3BEb3duVHJpZ2dlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5kcm9wZG93blRyaWdnZXI7XG4gICAgfVxuXG4gICAgZ2V0IHNob3dWZXJ0aWNhbERyb3BEb3duQW5nbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5iZW50byAmJiB0aGlzLmhhc0Ryb3BEb3duVHJpZ2dlciAmJiB0aGlzLnJlY3RhbmdsZUVsZW1lbnQudmVydGljYWwgJiYgIXRoaXMuY29sbGFwc2VkO1xuICAgIH1cblxuICAgIGdldCBzaG93SG9yaXpvbnRhbERyb3BEb3duQW5nbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0Ryb3BEb3duVHJpZ2dlciAmJiB0aGlzLnJlY3RhbmdsZUVsZW1lbnQuaG9yaXpvbnRhbCAmJiAhdGhpcy5jb2xsYXBzZWQgO1xuICAgIH1cblxuICAgIGdldCBoYXNDcm9wcGVkVGV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMudGl0bGU/LmlzT3ZlcmZsb3duIHx8IHRoaXMuc3ViVGl0bGU/LmlzT3ZlcmZsb3duKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlY3RhbmdsZUVsZW1lbnQ6IE1jTmF2YmFyUmVjdGFuZ2xlRWxlbWVudCxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZHJvcGRvd25UcmlnZ2VyOiBNY0Ryb3Bkb3duVHJpZ2dlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBiZW50bzogTWNOYXZiYXJCZW50b1xuICAgICkge1xuICAgICAgICBzdXBlcihvdmVybGF5LCBlbGVtZW50UmVmLCBuZ1pvbmUsIHNjcm9sbERpc3BhdGNoZXIsIGhvc3RWaWV3LCBzY3JvbGxTdHJhdGVneSwgZGlyZWN0aW9uKTtcblxuICAgICAgICBpZiAodGhpcy5oYXNEcm9wRG93blRyaWdnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25UcmlnZ2VyLm9wZW5CeUFycm93RG93biA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWN0YW5nbGVFbGVtZW50LnN0YXRlXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IHRoaXMucmVjdGFuZ2xlRWxlbWVudC5jb2xsYXBzZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVG9vbHRpcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBgJHt0aGlzLnRpdGxlVGV4dH1cXG4gJHt0aGlzLnN1YlRpdGxlVGV4dCB8fCAnJ31gO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmNvbGxhcHNlZCAmJiB0aGlzLmhhc0Nyb3BwZWRUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmNyb3BwZWRUZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVjdGFuZ2xlRWxlbWVudC52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnQgPSBQb3BVcFBsYWNlbWVudHMuUmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldFRpdGxlV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGUub3V0ZXJFbGVtZW50V2lkdGg7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzRHJvcERvd25UcmlnZ2VyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIFtFTlRFUiwgU1BBQ0VdLmluY2x1ZGVzKCRldmVudC5rZXlDb2RlKSB8fFxuICAgICAgICAgICAgKHRoaXMucmVjdGFuZ2xlRWxlbWVudC5ob3Jpem9udGFsICYmICRldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25UcmlnZ2VyLm9wZW5lZEJ5ID0gJ2tleWJvYXJkJztcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25UcmlnZ2VyLm9wZW4oKTtcblxuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItaXRlbSwgW21jLW5hdmJhci1pdGVtXSwgbWMtbmF2YmFyLWRpdmlkZXIsIG1jLW5hdmJhci1icmFuZCwgW21jLW5hdmJhci1icmFuZF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5tYy12ZXJ0aWNhbF0nOiAndmVydGljYWwnLFxuICAgICAgICAnW2NsYXNzLm1jLWhvcml6b250YWxdJzogJ2hvcml6b250YWwnLFxuXG4gICAgICAgICdbY2xhc3MubWMtZXhwYW5kZWRdJzogJ3ZlcnRpY2FsICYmICFjb2xsYXBzZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWNvbGxhcHNlZF0nOiAndmVydGljYWwgJiYgY29sbGFwc2VkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJSZWN0YW5nbGVFbGVtZW50IHtcbiAgICByZWFkb25seSBzdGF0ZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgaG9yaXpvbnRhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvcml6b250YWw7XG4gICAgfVxuXG4gICAgc2V0IGhvcml6b250YWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faG9yaXpvbnRhbCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuc3RhdGUubmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hvcml6b250YWw6IGJvb2xlYW47XG5cbiAgICBnZXQgdmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBzZXQgdmVydGljYWwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmVydGljYWwgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92ZXJ0aWNhbDogYm9vbGVhbjtcblxuICAgIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWQ7XG4gICAgfVxuXG4gICAgc2V0IGNvbGxhcHNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jb2xsYXBzZWQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2xsYXBzZWQ6IGJvb2xlYW47XG5cbiAgICBAQ29udGVudENoaWxkKE1jQnV0dG9uQ3NzU3R5bGVyKSBidXR0b246IE1jQnV0dG9uQ3NzU3R5bGVyO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBnZXRPdXRlckVsZW1lbnRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBbd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0XS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgcGFyc2VJbnQoaXRlbSksIDApO1xuICAgIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci10b2dnbGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIG1jLWljb25cbiAgICAgICAgICAgW2NsYXNzLm1jLWFuZ2xlLWxlZnQtTV8yNF09XCJuYXZiYXIuZXhwYW5kZWRcIlxuICAgICAgICAgICBbY2xhc3MubWMtYW5nbGUtcmlnaHQtTV8yNF09XCIhbmF2YmFyLmV4cGFuZGVkXCJcbiAgICAgICAgICAgKm5nSWY9XCIhY3VzdG9tSWNvblwiPlxuICAgICAgICA8L2k+XG5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLWljb25dXCI+PC9uZy1jb250ZW50PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy1uYXZiYXItaXRlbV9fdGl0bGVcIiAqbmdJZj1cIm5hdmJhci5leHBhbmRlZFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtbmF2YmFyLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtbmF2YmFyLWl0ZW1fX292ZXJsYXlcIj48L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL25hdmJhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci1pdGVtIG1jLW5hdmJhci10b2dnbGUgbWMtdmVydGljYWwnLFxuICAgICAgICAnW2NsYXNzLm1jLXRvb2x0aXBfb3Blbl0nOiAnaXNPcGVuJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlKCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhclRvZ2dsZSBleHRlbmRzIE1jVG9vbHRpcFRyaWdnZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGQoTWNJY29uKSBjdXN0b21JY29uOiBNY0ljb247XG5cbiAgICBASW5wdXQoJ21jQ29sbGFwc2VkVG9vbHRpcCcpXG4gICAgZ2V0IGNvbnRlbnQoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH1cblxuICAgIHNldCBjb250ZW50KGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZiYXIuZXhwYW5kZWQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1vZGlmaWVyOiBUb29sdGlwTW9kaWZpZXIgPSBUb29sdGlwTW9kaWZpZXIuRGVmYXVsdDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbmF2YmFyOiBNY1ZlcnRpY2FsTmF2YmFyLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuXG4gICAgICAgIHRoaXMucGxhY2VtZW50ID0gUG9wVXBQbGFjZW1lbnRzLlJpZ2h0O1xuXG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMuZ2V0V2luZG93KCk7XG5cbiAgICAgICAgaWYgKHdpbmRvdykge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy53aW5kb3dUb2dnbGVIYW5kbGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlkb3duKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoW1NQQUNFLCBFTlRFUl0uaW5jbHVkZXMoJGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuXG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLmhhbmRsZUtleWRvd24oJGV2ZW50KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy5nZXRXaW5kb3coKTtcblxuICAgICAgICBpZiAod2luZG93KSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMud2luZG93VG9nZ2xlSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubmF2YmFyLnRvZ2dsZSgpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRXaW5kb3coKTogV2luZG93IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQ/LmRlZmF1bHRWaWV3IHx8IHdpbmRvdztcbiAgICB9XG5cbiAgICBwcml2YXRlIHdpbmRvd1RvZ2dsZUhhbmRsZXIgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgW05VTVBBRF9ESVZJREUsIFNMQVNIXS5pbmNsdWRlcyhldmVudC5rZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKHRoaXMudG9nZ2xlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIjxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1pY29uXVwiPjwvbmctY29udGVudD5cblxuPGRpdiBjbGFzcz1cIm1jLW5hdmJhci1pdGVtX19jb250YWluZXJcIiAqbmdJZj1cInRpdGxlXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1jLW5hdmJhci1pdGVtX190aXRsZVwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtYy1uYXZiYXItdGl0bGUsIFttYy1uYXZiYXItdGl0bGVdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtYy1uYXZiYXItc3VidGl0bGUsIFttYy1uYXZiYXItc3VidGl0bGVdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPGkgY2xhc3M9XCJtYy1uYXZiYXItaXRlbV9fYXJyb3ctaWNvblwiIG1jLWljb249XCJtYy1hbmdsZS1yaWdodC1NXzI0XCIgKm5nSWY9XCJzaG93VmVydGljYWxEcm9wRG93bkFuZ2xlXCI+PC9pPlxuICAgIDxpIGNsYXNzPVwibWMtbmF2YmFyLWl0ZW1fX2Fycm93LWljb25cIiBtYy1pY29uPVwibWMtYW5nbGUtZG93bi1TXzE2XCIgKm5nSWY9XCJzaG93SG9yaXpvbnRhbERyb3BEb3duQW5nbGVcIj48L2k+XG5cbjwvZGl2PlxuXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbjxkaXYgY2xhc3M9XCJtYy1uYXZiYXItaXRlbV9fb3ZlcmxheVwiPjwvZGl2PlxuIl19
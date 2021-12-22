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
import { merge, Subject } from 'rxjs';
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
/** @nocollapse */ /** @nocollapse */ McNavbarLogo.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarLogo, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarLogo.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarLogo, selector: "mc-navbar-logo, [mc-navbar-logo]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, classAttribute: "mc-navbar-logo" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarLogo, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McNavbarBento.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarBento, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarBento.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarBento, selector: "mc-navbar-item[bento], [mc-navbar-item][bento]", host: { classAttribute: "mc-navbar-bento" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarBento, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McNavbarTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarTitle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarTitle, selector: "mc-navbar-title, [mc-navbar-title]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, properties: { "class.mc-navbar-title_small": "isTextOverflown" }, classAttribute: "mc-navbar-title" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarTitle, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McNavbarSubTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarSubTitle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarSubTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarSubTitle, selector: "mc-navbar-subtitle, [mc-navbar-subtitle]", host: { listeners: { "mouseenter": "hovered.next(true)", "mouseleave": "hovered.next(false)" }, classAttribute: "mc-navbar-subtitle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarSubTitle, decorators: [{
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
        merge(this.logo.hovered, this.title.hovered)
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
/** @nocollapse */ /** @nocollapse */ McNavbarBrand.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarBrand, deps: [{ token: i1.McVerticalNavbar, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McNavbarBrand.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarBrand, selector: "mc-navbar-brand, [mc-navbar-brand]", host: { properties: { "class.mc-hovered": "hovered", "class.layout-column": "hasBento", "class.layout-row": "!hasBento" }, classAttribute: "mc-navbar-brand" }, queries: [{ propertyName: "logo", first: true, predicate: McNavbarLogo, descendants: true }, { propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }], exportAs: ["mcNavbarBrand"], ngImport: i0, template: `
        <ng-content></ng-content>
        <div class="mc-navbar-item__overlay"></div>
    `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarBrand, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McNavbarDivider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarDivider, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarDivider.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarDivider, selector: "mc-navbar-divider", host: { classAttribute: "mc-navbar-divider" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarDivider, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McNavbarFocusableItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarFocusableItem, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.FocusMonitor }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarFocusableItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarFocusableItem, selector: "mc-navbar-item, [mc-navbar-item], mc-navbar-brand, [mc-navbar-brand], mc-navbar-toggle", inputs: { disabled: "disabled" }, host: { listeners: { "focus": "onFocusHandler()", "blur": "blur()" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null", "class.mc-navbar-item_button": "button" }, classAttribute: "mc-navbar-focusable-item" }, queries: [{ propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }, { propertyName: "button", first: true, predicate: McButton, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarFocusableItem, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McNavbarItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarItem, deps: [{ token: McNavbarRectangleElement }, { token: i0.ChangeDetectorRef }, { token: i3.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: i5.McDropdownTrigger, optional: true }, { token: McNavbarBento, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McNavbarItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarItem, selector: "mc-navbar-item, [mc-navbar-item]", inputs: { collapsedText: "collapsedText", collapsed: "collapsed", collapsable: "collapsable" }, host: { listeners: { "keydown": "onKeyDown($event)" }, properties: { "class.mc-navbar-item_collapsed": "collapsed" }, classAttribute: "mc-navbar-item" }, queries: [{ propertyName: "title", first: true, predicate: McNavbarTitle, descendants: true }, { propertyName: "subTitle", first: true, predicate: McNavbarSubTitle, descendants: true }, { propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcNavbarItem"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<div class=\"mc-navbar-item__container\" *ngIf=\"title\">\n    <div class=\"mc-navbar-item__title\">\n        <ng-content select=\"mc-navbar-title, [mc-navbar-title]\"></ng-content>\n        <ng-content select=\"mc-navbar-subtitle, [mc-navbar-subtitle]\"></ng-content>\n    </div>\n\n    <i class=\"mc-navbar-item__arrow-icon\" mc-icon=\"mc-angle-right-M_24\" *ngIf=\"showVerticalDropDownAngle\"></i>\n    <i class=\"mc-navbar-item__arrow-icon\" mc-icon=\"mc-angle-down-S_16\" *ngIf=\"showHorizontalDropDownAngle\"></i>\n\n</div>\n\n<ng-content></ng-content>\n\n<div class=\"mc-navbar-item__overlay\"></div>\n", components: [{ type: i6.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarItem, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McNavbarRectangleElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarRectangleElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McNavbarRectangleElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarRectangleElement, selector: "mc-navbar-item, [mc-navbar-item], mc-navbar-divider, mc-navbar-brand, [mc-navbar-brand]", host: { properties: { "class.mc-vertical": "vertical", "class.mc-horizontal": "horizontal", "class.mc-expanded": "vertical && !collapsed", "class.mc-collapsed": "vertical && collapsed" } }, queries: [{ propertyName: "button", first: true, predicate: McButtonCssStyler, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarRectangleElement, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McNavbarToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarToggle, deps: [{ token: i1.McVerticalNavbar }, { token: i0.ChangeDetectorRef }, { token: i3.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McNavbarToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McNavbarToggle, selector: "mc-navbar-toggle", inputs: { content: ["mcCollapsedTooltip", "content"] }, host: { listeners: { "keydown": "onKeydown($event)", "click": "toggle()", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" }, classAttribute: "mc-navbar-item mc-navbar-toggle mc-vertical" }, queries: [{ propertyName: "customIcon", first: true, predicate: McIcon, descendants: true }], usesInheritance: true, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McNavbarToggle, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL25hdmJhci9uYXZiYXItaXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvbmF2YmFyL25hdmJhci1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUVSLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRixPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQs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LGNBQWMsME5BNEJYLDBCQUEwQiwyREFFZCxRQUFRO3FJQTlCdkIsY0FBYyx3WEFDVCxNQUFNLHVFQTVCVjs7Ozs7Ozs7Ozs7Ozs7S0FjVDsyRkFhUSxjQUFjO2tCQTdCMUIsU0FBUzsrQkFDSSxrQkFBa0IsWUFDbEI7Ozs7Ozs7Ozs7Ozs7O0tBY1QsUUFFSzt3QkFDRixLQUFLLEVBQUUsNkNBQTZDO3dCQUNwRCx5QkFBeUIsRUFBRSxRQUFRO3dCQUVuQyxXQUFXLEVBQUUsbUJBQW1CO3dCQUNoQyxTQUFTLEVBQUUsVUFBVTt3QkFDckIsWUFBWSxFQUFFLGtCQUFrQjtxQkFDbkMsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7OzBCQThCaEMsTUFBTTsyQkFBQywwQkFBMEI7OzBCQUNqQyxRQUFROzswQkFDUixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFFBQVE7NENBN0JWLFVBQVU7c0JBQS9CLFlBQVk7dUJBQUMsTUFBTTtnQkFHaEIsT0FBTztzQkFEVixLQUFLO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBPdmVybGF5LCBTY3JvbGxEaXNwYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBOVU1QQURfRElWSURFLCBTTEFTSCwgU1BBQ0UgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgTWNCdXR0b24sIE1jQnV0dG9uQ3NzU3R5bGVyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2J1dHRvbic7XG5pbXBvcnQgeyBQb3BVcFBsYWNlbWVudHMsIHRvQm9vbGVhbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRHJvcGRvd25UcmlnZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duJztcbmltcG9ydCB7IE1jSWNvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcbmltcG9ydCB7IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLCBNY1Rvb2x0aXBUcmlnZ2VyLCBUb29sdGlwTW9kaWZpZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcCc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY1ZlcnRpY2FsTmF2YmFyIH0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXIuY29tcG9uZW50JztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNOYXZiYXJGb2N1c2FibGVJdGVtRXZlbnQge1xuICAgIGl0ZW06IE1jTmF2YmFyRm9jdXNhYmxlSXRlbTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1sb2dvLCBbbWMtbmF2YmFyLWxvZ29dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWxvZ28nLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hvdmVyZWQubmV4dCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnaG92ZXJlZC5uZXh0KGZhbHNlKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyTG9nbyB7XG4gICAgcmVhZG9ubHkgaG92ZXJlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItaXRlbVtiZW50b10sIFttYy1uYXZiYXItaXRlbV1bYmVudG9dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWJlbnRvJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJCZW50byB7fVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLXRpdGxlLCBbbWMtbmF2YmFyLXRpdGxlXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLW5hdmJhci10aXRsZScsXG4gICAgICAgICdbY2xhc3MubWMtbmF2YmFyLXRpdGxlX3NtYWxsXSc6ICdpc1RleHRPdmVyZmxvd24nLFxuXG4gICAgICAgICcobW91c2VlbnRlciknOiAnaG92ZXJlZC5uZXh0KHRydWUpJyxcbiAgICAgICAgJyhtb3VzZWxlYXZlKSc6ICdob3ZlcmVkLm5leHQoZmFsc2UpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUaXRsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIHJlYWRvbmx5IGhvdmVyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgb3V0ZXJFbGVtZW50V2lkdGg6IG51bWJlcjtcbiAgICBpc1RleHRPdmVyZmxvd246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCB0ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG4gICAgfVxuXG4gICAgZ2V0IGlzT3ZlcmZsb3duKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBnZXRPdXRlckVsZW1lbnRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBbd2lkdGgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0XS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgcGFyc2VJbnQoaXRlbSkgfHwgMCwgMCk7XG4gICAgfVxuXG4gICAgY2hlY2tUZXh0T3ZlcmZsb3duKCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICB0aGlzLmlzVGV4dE92ZXJmbG93biA9IHRoaXMudGV4dC5sZW5ndGggPiAxODtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3V0ZXJFbGVtZW50V2lkdGggPSB0aGlzLmdldE91dGVyRWxlbWVudFdpZHRoKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1zdWJ0aXRsZSwgW21jLW5hdmJhci1zdWJ0aXRsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItc3VidGl0bGUnLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hvdmVyZWQubmV4dCh0cnVlKScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnaG92ZXJlZC5uZXh0KGZhbHNlKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyU3ViVGl0bGUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICByZWFkb25seSBob3ZlcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIG91dGVyRWxlbWVudFdpZHRoOiBudW1iZXI7XG5cbiAgICBnZXQgdGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH1cblxuICAgIGdldCBpc092ZXJmbG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoID4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gW3dpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodF0ucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIHBhcnNlSW50KGl0ZW0pIHx8IDAsIDApO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vdXRlckVsZW1lbnRXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKTtcbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItYnJhbmQsIFttYy1uYXZiYXItYnJhbmRdJyxcbiAgICBleHBvcnRBczogJ21jTmF2YmFyQnJhbmQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLW5hdmJhci1pdGVtX19vdmVybGF5XCI+PC9kaXY+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWJyYW5kJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ob3ZlcmVkXSc6ICdob3ZlcmVkJyxcbiAgICAgICAgJ1tjbGFzcy5sYXlvdXQtY29sdW1uXSc6ICdoYXNCZW50bycsXG4gICAgICAgICdbY2xhc3MubGF5b3V0LXJvd10nOiAnIWhhc0JlbnRvJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJCcmFuZCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZChNY05hdmJhckxvZ28pIGxvZ286IE1jTmF2YmFyTG9nbztcbiAgICBAQ29udGVudENoaWxkKE1jTmF2YmFyVGl0bGUpIHRpdGxlOiBNY05hdmJhclRpdGxlO1xuXG4gICAgaG92ZXJlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IGhhc0JlbnRvKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm5hdmJhcj8uYmVudG87XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJpdmF0ZSBuYXZiYXI6IE1jVmVydGljYWxOYXZiYXIpIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5sb2dvLmhvdmVyZWQsXG4gICAgICAgICAgICB0aGlzLnRpdGxlLmhvdmVyZWRcbiAgICAgICAgKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4gdGhpcy5ob3ZlcmVkID0gdmFsdWUpO1xuXG4gICAgICAgIHRoaXMubmF2YmFyPy5hbmltYXRpb25Eb25lXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudGl0bGU/LmNoZWNrVGV4dE92ZXJmbG93bigpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1kaXZpZGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWRpdmlkZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckRpdmlkZXIge31cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1pdGVtLCBbbWMtbmF2YmFyLWl0ZW1dLCBtYy1uYXZiYXItYnJhbmQsIFttYy1uYXZiYXItYnJhbmRdLCBtYy1uYXZiYXItdG9nZ2xlJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWZvY3VzYWJsZS1pdGVtJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1uYXZiYXItaXRlbV9idXR0b25dJzogJ2J1dHRvbicsXG5cbiAgICAgICAgJyhmb2N1cyknOiAnb25Gb2N1c0hhbmRsZXIoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJGb2N1c2FibGVJdGVtIGltcGxlbWVudHMgSUZvY3VzYWJsZU9wdGlvbiwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBAQ29udGVudENoaWxkKE1jTmF2YmFyVGl0bGUpIHRpdGxlOiBNY05hdmJhclRpdGxlO1xuXG4gICAgQENvbnRlbnRDaGlsZChNY0J1dHRvbikgYnV0dG9uOiBNY0J1dHRvbjtcblxuICAgIHJlYWRvbmx5IG9uRm9jdXMgPSBuZXcgU3ViamVjdDxNY05hdmJhckZvY3VzYWJsZUl0ZW1FdmVudD4oKTtcblxuICAgIHJlYWRvbmx5IG9uQmx1ciA9IG5ldyBTdWJqZWN0PE1jTmF2YmFyRm9jdXNhYmxlSXRlbUV2ZW50PigpO1xuXG4gICAgZ2V0IGhhc0ZvY3VzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmJ1dHRvbj8uaGFzRm9jdXMgfHwgdGhpcy5faGFzRm9jdXM7XG4gICAgfVxuXG4gICAgc2V0IGhhc0ZvY3VzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hhc0ZvY3VzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIGdldCB0YWJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXG4gICAgKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5idXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLnRhYkluZGV4ID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgb25Gb2N1c0hhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaGFzRm9jdXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyBpdGVtOiB0aGlzIH0pO1xuXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1cyhvcmlnaW4/OiBGb2N1c09yaWdpbikge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmhhc0ZvY3VzKSB7IHJldHVybiBvcmlnaW47IH1cblxuICAgICAgICBpZiAob3JpZ2luID09PSAna2V5Ym9hcmQnKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmVsZW1lbnRSZWYsIG9yaWdpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5idXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmZvY3VzVmlhS2V5Ym9hcmQoKTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkZvY3VzSGFuZGxlcigpO1xuICAgIH1cblxuICAgIGJsdXIoKTogdm9pZCB7XG4gICAgICAgIC8vIFdoZW4gYW5pbWF0aW9ucyBhcmUgZW5hYmxlZCwgQW5ndWxhciBtYXkgZW5kIHVwIHJlbW92aW5nIHRoZSBvcHRpb24gZnJvbSB0aGUgRE9NIGEgbGl0dGxlXG4gICAgICAgIC8vIGVhcmxpZXIgdGhhbiB1c3VhbCwgY2F1c2luZyBpdCB0byBiZSBibHVycmVkIGFuZCB0aHJvd2luZyBvZmYgdGhlIGxvZ2ljIGluIHRoZSBsaXN0XG4gICAgICAgIC8vIHRoYXQgbW92ZXMgZm9jdXMgbm90IHRoZSBuZXh0IGl0ZW0uIFRvIHdvcmsgYXJvdW5kIHRoZSBpc3N1ZSwgd2UgZGVmZXIgbWFya2luZyB0aGUgb3B0aW9uXG4gICAgICAgIC8vIGFzIG5vdCBmb2N1c2VkIHVudGlsIHRoZSBuZXh0IHRpbWUgdGhlIHpvbmUgc3RhYmlsaXplcy5cbiAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhc0ZvY3VzID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnV0dG9uPy5oYXNGb2N1cykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQmx1ci5uZXh0KHsgaXRlbTogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlPy50ZXh0IHx8ICcnO1xuICAgIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW5hdmJhci1pdGVtLCBbbWMtbmF2YmFyLWl0ZW1dJyxcbiAgICBleHBvcnRBczogJ21jTmF2YmFySXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25hdmJhci1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbmF2YmFyLWl0ZW0nLFxuICAgICAgICAnW2NsYXNzLm1jLW5hdmJhci1pdGVtX2NvbGxhcHNlZF0nOiAnY29sbGFwc2VkJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY05hdmJhckl0ZW0gZXh0ZW5kcyBNY1Rvb2x0aXBUcmlnZ2VyIHtcbiAgICBAQ29udGVudENoaWxkKE1jTmF2YmFyVGl0bGUpIHRpdGxlOiBNY05hdmJhclRpdGxlO1xuICAgIEBDb250ZW50Q2hpbGQoTWNOYXZiYXJTdWJUaXRsZSkgc3ViVGl0bGU6IE1jTmF2YmFyU3ViVGl0bGU7XG5cbiAgICBAQ29udGVudENoaWxkKE1jSWNvbikgaWNvbjogTWNJY29uO1xuXG4gICAgQElucHV0KCkgY29sbGFwc2VkVGV4dDogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgY29sbGFwc2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkO1xuICAgIH1cblxuICAgIHNldCBjb2xsYXBzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbGxhcHNlZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxhcHNlZCA9IHZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IGNyb3BwZWRUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGNyb3BwZWRUaXRsZVRleHQgPSB0aGlzLnRpdGxlPy5pc092ZXJmbG93biA/IHRoaXMudGl0bGVUZXh0IDogJyc7XG4gICAgICAgIGNvbnN0IGNyb3BwZWRTdWJUaXRsZVRleHQgPSB0aGlzLnN1YlRpdGxlPy5pc092ZXJmbG93biA/IHRoaXMuc3ViVGl0bGVUZXh0IDogJyc7XG5cbiAgICAgICAgcmV0dXJuIGAke2Nyb3BwZWRUaXRsZVRleHR9XFxuICR7Y3JvcHBlZFN1YlRpdGxlVGV4dH1gO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbGxhcHNhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2FibGU7XG4gICAgfVxuXG4gICAgc2V0IGNvbGxhcHNhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2NvbGxhcHNhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2xsYXBzYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgdGl0bGVUZXh0KCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWRUZXh0IHx8IHRoaXMudGl0bGU/LnRleHQgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgc3ViVGl0bGVUZXh0KCk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJUaXRsZT8udGV4dCB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICghdGhpcy5jb2xsYXBzZWQgJiYgIXRoaXMuaGFzQ3JvcHBlZFRleHQpIHx8ICF0aGlzLnRpdGxlO1xuICAgIH1cblxuICAgIGdldCBoYXNEcm9wRG93blRyaWdnZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZHJvcGRvd25UcmlnZ2VyO1xuICAgIH1cblxuICAgIGdldCBzaG93VmVydGljYWxEcm9wRG93bkFuZ2xlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuYmVudG8gJiYgdGhpcy5oYXNEcm9wRG93blRyaWdnZXIgJiYgdGhpcy5yZWN0YW5nbGVFbGVtZW50LnZlcnRpY2FsICYmICF0aGlzLmNvbGxhcHNlZDtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0hvcml6b250YWxEcm9wRG93bkFuZ2xlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNEcm9wRG93blRyaWdnZXIgJiYgdGhpcy5yZWN0YW5nbGVFbGVtZW50Lmhvcml6b250YWwgJiYgIXRoaXMuY29sbGFwc2VkIDtcbiAgICB9XG5cbiAgICBnZXQgaGFzQ3JvcHBlZFRleHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhISh0aGlzLnRpdGxlPy5pc092ZXJmbG93biB8fCB0aGlzLnN1YlRpdGxlPy5pc092ZXJmbG93bik7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWN0YW5nbGVFbGVtZW50OiBNY05hdmJhclJlY3RhbmdsZUVsZW1lbnQsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRyb3Bkb3duVHJpZ2dlcjogTWNEcm9wZG93blRyaWdnZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgYmVudG86IE1jTmF2YmFyQmVudG9cbiAgICApIHtcbiAgICAgICAgc3VwZXIob3ZlcmxheSwgZWxlbWVudFJlZiwgbmdab25lLCBzY3JvbGxEaXNwYXRjaGVyLCBob3N0Vmlldywgc2Nyb2xsU3RyYXRlZ3ksIGRpcmVjdGlvbik7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzRHJvcERvd25UcmlnZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duVHJpZ2dlci5vcGVuQnlBcnJvd0Rvd24gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVjdGFuZ2xlRWxlbWVudC5zdGF0ZVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSB0aGlzLnJlY3RhbmdsZUVsZW1lbnQuY29sbGFwc2VkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gYCR7dGhpcy50aXRsZVRleHR9XFxuICR7dGhpcy5zdWJUaXRsZVRleHQgfHwgJyd9YDtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5jb2xsYXBzZWQgJiYgdGhpcy5oYXNDcm9wcGVkVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5jcm9wcGVkVGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlY3RhbmdsZUVsZW1lbnQudmVydGljYWwpIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VtZW50ID0gUG9wVXBQbGFjZW1lbnRzLlJpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXRUaXRsZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlLm91dGVyRWxlbWVudFdpZHRoO1xuICAgIH1cblxuICAgIG9uS2V5RG93bigkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0Ryb3BEb3duVHJpZ2dlcikgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBbRU5URVIsIFNQQUNFXS5pbmNsdWRlcygkZXZlbnQua2V5Q29kZSkgfHxcbiAgICAgICAgICAgICh0aGlzLnJlY3RhbmdsZUVsZW1lbnQuaG9yaXpvbnRhbCAmJiAkZXZlbnQua2V5Q29kZSA9PT0gRE9XTl9BUlJPVylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duVHJpZ2dlci5vcGVuZWRCeSA9ICdrZXlib2FyZCc7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duVHJpZ2dlci5vcGVuKCk7XG5cbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtbmF2YmFyLWl0ZW0sIFttYy1uYXZiYXItaXRlbV0sIG1jLW5hdmJhci1kaXZpZGVyLCBtYy1uYXZiYXItYnJhbmQsIFttYy1uYXZiYXItYnJhbmRdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdmVydGljYWxdJzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ob3Jpem9udGFsXSc6ICdob3Jpem9udGFsJyxcblxuICAgICAgICAnW2NsYXNzLm1jLWV4cGFuZGVkXSc6ICd2ZXJ0aWNhbCAmJiAhY29sbGFwc2VkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jb2xsYXBzZWRdJzogJ3ZlcnRpY2FsICYmIGNvbGxhcHNlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTmF2YmFyUmVjdGFuZ2xlRWxlbWVudCB7XG4gICAgcmVhZG9ubHkgc3RhdGUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgZ2V0IGhvcml6b250YWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ob3Jpem9udGFsO1xuICAgIH1cblxuICAgIHNldCBob3Jpem9udGFsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hvcml6b250YWwgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnN0YXRlLm5leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9ob3Jpem9udGFsOiBib29sZWFuO1xuXG4gICAgZ2V0IHZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gICAgfVxuXG4gICAgc2V0IHZlcnRpY2FsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmVydGljYWw6IGJvb2xlYW47XG5cbiAgICBnZXQgY29sbGFwc2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkO1xuICAgIH1cblxuICAgIHNldCBjb2xsYXBzZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2VkID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5uZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29sbGFwc2VkOiBib29sZWFuO1xuXG4gICAgQENvbnRlbnRDaGlsZChNY0J1dHRvbkNzc1N0eWxlcikgYnV0dG9uOiBNY0J1dHRvbkNzc1N0eWxlcjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0T3V0ZXJFbGVtZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gW3dpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodF0ucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIHBhcnNlSW50KGl0ZW0pLCAwKTtcbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1uYXZiYXItdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aSBtYy1pY29uXG4gICAgICAgICAgIFtjbGFzcy5tYy1hbmdsZS1sZWZ0LU1fMjRdPVwibmF2YmFyLmV4cGFuZGVkXCJcbiAgICAgICAgICAgW2NsYXNzLm1jLWFuZ2xlLXJpZ2h0LU1fMjRdPVwiIW5hdmJhci5leHBhbmRlZFwiXG4gICAgICAgICAgICpuZ0lmPVwiIWN1c3RvbUljb25cIj5cbiAgICAgICAgPC9pPlxuXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1pY29uXVwiPjwvbmctY29udGVudD5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtbmF2YmFyLWl0ZW1fX3RpdGxlXCIgKm5nSWY9XCJuYXZiYXIuZXhwYW5kZWRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1jLW5hdmJhci10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLW5hdmJhci1pdGVtX19vdmVybGF5XCI+PC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9uYXZiYXIuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1uYXZiYXItaXRlbSBtYy1uYXZiYXItdG9nZ2xlIG1jLXZlcnRpY2FsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy10b29sdGlwX29wZW5dJzogJ2lzT3BlbicsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNOYXZiYXJUb2dnbGUgZXh0ZW5kcyBNY1Rvb2x0aXBUcmlnZ2VyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBAQ29udGVudENoaWxkKE1jSWNvbikgY3VzdG9tSWNvbjogTWNJY29uO1xuXG4gICAgQElucHV0KCdtY0NvbGxhcHNlZFRvb2x0aXAnKVxuICAgIGdldCBjb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudChjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2YmFyLmV4cGFuZGVkO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtb2RpZmllcjogVG9vbHRpcE1vZGlmaWVyID0gVG9vbHRpcE1vZGlmaWVyLkRlZmF1bHQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIG5hdmJhcjogTWNWZXJ0aWNhbE5hdmJhcixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcihvdmVybGF5LCBlbGVtZW50UmVmLCBuZ1pvbmUsIHNjcm9sbERpc3BhdGNoZXIsIGhvc3RWaWV3LCBzY3JvbGxTdHJhdGVneSwgZGlyZWN0aW9uKTtcblxuICAgICAgICB0aGlzLnBsYWNlbWVudCA9IFBvcFVwUGxhY2VtZW50cy5SaWdodDtcblxuICAgICAgICBjb25zdCB3aW5kb3cgPSB0aGlzLmdldFdpbmRvdygpO1xuXG4gICAgICAgIGlmICh3aW5kb3cpIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMud2luZG93VG9nZ2xlSGFuZGxlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5ZG93bigkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKFtTUEFDRSwgRU5URVJdLmluY2x1ZGVzKCRldmVudC5rZXlDb2RlKSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcblxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5oYW5kbGVLZXlkb3duKCRldmVudCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMuZ2V0V2luZG93KCk7XG5cbiAgICAgICAgaWYgKHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLndpbmRvd1RvZ2dsZUhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLm5hdmJhci50b2dnbGUoKTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0V2luZG93KCk6IFdpbmRvdyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50Py5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3aW5kb3dUb2dnbGVIYW5kbGVyID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIFtOVU1QQURfRElWSURFLCBTTEFTSF0uaW5jbHVkZXMoZXZlbnQua2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bih0aGlzLnRvZ2dsZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCI8bmctY29udGVudCBzZWxlY3Q9XCJbbWMtaWNvbl1cIj48L25nLWNvbnRlbnQ+XG5cbjxkaXYgY2xhc3M9XCJtYy1uYXZiYXItaXRlbV9fY29udGFpbmVyXCIgKm5nSWY9XCJ0aXRsZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYy1uYXZiYXItaXRlbV9fdGl0bGVcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtbmF2YmFyLXRpdGxlLCBbbWMtbmF2YmFyLXRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtbmF2YmFyLXN1YnRpdGxlLCBbbWMtbmF2YmFyLXN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICAgIDxpIGNsYXNzPVwibWMtbmF2YmFyLWl0ZW1fX2Fycm93LWljb25cIiBtYy1pY29uPVwibWMtYW5nbGUtcmlnaHQtTV8yNFwiICpuZ0lmPVwic2hvd1ZlcnRpY2FsRHJvcERvd25BbmdsZVwiPjwvaT5cbiAgICA8aSBjbGFzcz1cIm1jLW5hdmJhci1pdGVtX19hcnJvdy1pY29uXCIgbWMtaWNvbj1cIm1jLWFuZ2xlLWRvd24tU18xNlwiICpuZ0lmPVwic2hvd0hvcml6b250YWxEcm9wRG93bkFuZ2xlXCI+PC9pPlxuXG48L2Rpdj5cblxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48ZGl2IGNsYXNzPVwibWMtbmF2YmFyLWl0ZW1fX292ZXJsYXlcIj48L2Rpdj5cbiJdfQ==
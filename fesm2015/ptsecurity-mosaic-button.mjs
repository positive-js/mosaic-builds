import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, ContentChildren, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { mixinTabIndex, mixinColor } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';

class McButtonCssStyler {
    constructor(elementRef, renderer) {
        this.renderer = renderer;
        this.nativeElement = elementRef.nativeElement;
    }
    get isIconButton() {
        return this.icons.length > 0;
    }
    ngAfterContentInit() {
        this.updateClassModifierForIcons();
    }
    updateClassModifierForIcons() {
        const twoIcons = 2;
        const [firstIconElement, secondIconElement] = this.icons.map((item) => item.getHostElement());
        if (this.icons.length === 1) {
            this.renderer.removeClass(firstIconElement, 'mc-icon_left');
            this.renderer.removeClass(this.nativeElement, 'mc-icon-button_left');
            this.renderer.removeClass(firstIconElement, 'mc-icon_right');
            this.renderer.removeClass(this.nativeElement, 'mc-icon-button_right');
            const COMMENT_NODE = 8;
            if (firstIconElement.nextSibling && firstIconElement.nextSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_left');
                this.renderer.addClass(this.nativeElement, 'mc-icon-button_left');
            }
            if (firstIconElement.previousSibling && firstIconElement.previousSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_right');
                this.renderer.addClass(this.nativeElement, 'mc-icon-button_right');
            }
        }
        else if (this.icons.length === twoIcons) {
            this.renderer.addClass(firstIconElement, 'mc-icon_left');
            this.renderer.addClass(secondIconElement, 'mc-icon_right');
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McButtonCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McButtonCssStyler, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McButtonCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McButtonCssStyler, selector: "[mc-button]", host: { properties: { "class.mc-button": "!isIconButton", "class.mc-icon-button": "isIconButton" } }, queries: [{ propertyName: "icons", predicate: McIcon, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McButtonCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-button]',
                    host: {
                        '[class.mc-button]': '!isIconButton',
                        '[class.mc-icon-button]': 'isIconButton'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { icons: [{
                type: ContentChildren,
                args: [McIcon, { descendants: true }]
            }] } });
class McButtonBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McButtonMixinBase = mixinTabIndex(mixinColor(McButtonBase));
class McButton extends McButtonMixinBase {
    constructor(elementRef, focusMonitor) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.hasFocus = false;
        this._disabled = false;
        this.runFocusMonitor();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.stopFocusMonitor() : this.runFocusMonitor();
    }
    ngOnDestroy() {
        this.stopFocusMonitor();
    }
    onFocus($event) {
        $event.stopPropagation();
        this.hasFocus = true;
    }
    onBlur() {
        this.hasFocus = false;
    }
    getHostElement() {
        return this._elementRef.nativeElement;
    }
    focus() {
        this.hasFocus = true;
        this.getHostElement().focus();
    }
    focusViaKeyboard() {
        this.hasFocus = true;
        this.focusMonitor.focusVia(this.getHostElement(), 'keyboard');
    }
    haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
        }
    }
    runFocusMonitor() {
        this.focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    stopFocusMonitor() {
        this.focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}
/** @nocollapse */ /** @nocollapse */ McButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McButton, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McButton, selector: "[mc-button]", inputs: { color: "color", tabIndex: "tabIndex", disabled: "disabled" }, host: { listeners: { "focus": "onFocus($event)", "blur": "onBlur()" }, properties: { "attr.disabled": "disabled || null", "attr.tabIndex": "tabIndex" } }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-button-wrapper\">\n    <ng-content></ng-content>\n</div>\n<div class=\"mc-button-overlay\" (click)=\"haltDisabledEvents($event)\"></div>\n", styles: [".mc-icon-button,.mc-light-button,.mc-button{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;position:relative;box-sizing:border-box;display:inline-block;margin:0;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;border:1px solid transparent;border:var(--mc-button-size-border-width, 1px) solid transparent;border-radius:3px;border-radius:var(--mc-button-size-border-radius, 3px)}.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner,.mc-button::-moz-focus-inner{border:0}.mc-icon-button:focus,.mc-light-button:focus,.mc-button:focus{outline:none}[disabled].mc-icon-button,[disabled].mc-light-button,[disabled].mc-button{cursor:default}.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button,.cdk-focused.mc-button{z-index:1}.mc-button{padding:5px 15px;padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:5px 7px;padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:15px;padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:15px;padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex;align-items:center}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:8px;margin-right:var(--mc-icon-button-size-icon-padding, 8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:8px;margin-left:var(--mc-icon-button-size-icon-padding, 8px)}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;border-radius:inherit}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McButton, decorators: [{
            type: Component,
            args: [{ selector: '[mc-button]', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color', 'tabIndex'], host: {
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabIndex]': 'tabIndex',
                        '(focus)': 'onFocus($event)',
                        '(blur)': 'onBlur()'
                    }, template: "<div class=\"mc-button-wrapper\">\n    <ng-content></ng-content>\n</div>\n<div class=\"mc-button-overlay\" (click)=\"haltDisabledEvents($event)\"></div>\n", styles: [".mc-icon-button,.mc-light-button,.mc-button{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;position:relative;box-sizing:border-box;display:inline-block;margin:0;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;border:1px solid transparent;border:var(--mc-button-size-border-width, 1px) solid transparent;border-radius:3px;border-radius:var(--mc-button-size-border-radius, 3px)}.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner,.mc-button::-moz-focus-inner{border:0}.mc-icon-button:focus,.mc-light-button:focus,.mc-button:focus{outline:none}[disabled].mc-icon-button,[disabled].mc-light-button,[disabled].mc-button{cursor:default}.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button,.cdk-focused.mc-button{z-index:1}.mc-button{padding:5px 15px;padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:5px 7px;padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:15px;padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:15px;padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex;align-items:center}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:8px;margin-right:var(--mc-icon-button-size-icon-padding, 8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:8px;margin-left:var(--mc-icon-button-size-icon-padding, 8px)}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;border-radius:inherit}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }]; }, propDecorators: { disabled: [{
                type: Input
            }] } });

class McButtonModule {
}
/** @nocollapse */ /** @nocollapse */ McButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McButtonModule, declarations: [McButton,
        McButtonCssStyler], imports: [CommonModule,
        A11yModule,
        PlatformModule], exports: [McButton,
        McButtonCssStyler] });
/** @nocollapse */ /** @nocollapse */ McButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McButtonModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [
                        McButton,
                        McButtonCssStyler
                    ],
                    declarations: [
                        McButton,
                        McButtonCssStyler
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McButton, McButtonBase, McButtonCssStyler, McButtonMixinBase, McButtonModule };
//# sourceMappingURL=ptsecurity-mosaic-button.mjs.map

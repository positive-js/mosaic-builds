import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, ContentChildren, Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import { mixinTabIndex, mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
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
/** @nocollapse */ McButtonCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonCssStyler, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McButtonCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McButtonCssStyler, selector: "button[mc-button], a[mc-button]", host: { properties: { "class.mc-button": "!isIconButton", "class.mc-icon-button": "isIconButton" } }, queries: [{ propertyName: "icons", predicate: McIcon, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mc-button], a[mc-button]',
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
const McButtonMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McButtonBase)));
class McButton extends McButtonMixinBase {
    constructor(elementRef, focusMonitor) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.hasFocus = false;
        this.focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this._elementRef.nativeElement);
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
}
/** @nocollapse */ McButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButton, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McButton, selector: "button[mc-button]", inputs: { tabIndex: "tabIndex", disabled: "disabled", color: "color" }, host: { listeners: { "focus": "onFocus($event)", "blur": "onBlur()" }, properties: { "attr.disabled": "disabled || null", "attr.tabIndex": "tabIndex" } }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-button-wrapper\">\n    <ng-content></ng-content>\n</div>\n<div class=\"mc-button-overlay\"></div>\n", styles: [".mc-icon-button,.mc-light-button,.mc-button{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;border:1px solid transparent;border:var(--mc-button-size-border-width, 1px) solid transparent;border-radius:3px;border-radius:var(--mc-button-size-border-radius, 3px)}.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner,.mc-button::-moz-focus-inner{border:0}.mc-icon-button:focus,.mc-light-button:focus,.mc-button:focus{outline:none}[disabled].mc-icon-button,[disabled].mc-light-button,[disabled].mc-button{pointer-events:none;cursor:default}.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button,.cdk-focused.mc-button{z-index:1}.mc-button{padding:calc(6px - 1px) calc(16px - 1px);padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:calc(6px - 1px) calc(8px - 1px);padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:calc(16px - 1px);padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:calc(16px - 1px);padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:8px;margin-right:var(--mc-icon-button-size-icon-padding, 8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:8px;margin-left:var(--mc-icon-button-size-icon-padding, 8px)}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'button[mc-button]',
                    templateUrl: './button.component.html',
                    styleUrls: ['./button.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['tabIndex', 'disabled', 'color'],
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabIndex]': 'tabIndex',
                        '(focus)': 'onFocus($event)',
                        '(blur)': 'onBlur()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }]; } });
class McAnchor extends McButton {
    constructor(focusMonitor, elementRef) {
        super(elementRef, focusMonitor);
    }
    haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
/** @nocollapse */ McAnchor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McAnchor, deps: [{ token: i1.FocusMonitor }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McAnchor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McAnchor, selector: "a[mc-button]", inputs: { disabled: "disabled", color: "color", tabIndex: "tabIndex" }, host: { listeners: { "click": "haltDisabledEvents($event)" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" } }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-button-wrapper\">\n    <ng-content></ng-content>\n</div>\n<div class=\"mc-button-overlay\"></div>\n", styles: [".mc-icon-button,.mc-light-button,.mc-button{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;border:1px solid transparent;border:var(--mc-button-size-border-width, 1px) solid transparent;border-radius:3px;border-radius:var(--mc-button-size-border-radius, 3px)}.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner,.mc-button::-moz-focus-inner{border:0}.mc-icon-button:focus,.mc-light-button:focus,.mc-button:focus{outline:none}[disabled].mc-icon-button,[disabled].mc-light-button,[disabled].mc-button{pointer-events:none;cursor:default}.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button,.cdk-focused.mc-button{z-index:1}.mc-button{padding:calc(6px - 1px) calc(16px - 1px);padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:calc(6px - 1px) calc(8px - 1px);padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:calc(16px - 1px);padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:calc(16px - 1px);padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:8px;margin-right:var(--mc-icon-button-size-icon-padding, 8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:8px;margin-left:var(--mc-icon-button-size-icon-padding, 8px)}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McAnchor, decorators: [{
            type: Component,
            args: [{
                    selector: 'a[mc-button]',
                    templateUrl: './button.component.html',
                    styleUrls: ['button.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled', 'color', 'tabIndex'],
                    host: {
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'haltDisabledEvents($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.FocusMonitor }, { type: i0.ElementRef }]; } });

class McButtonModule {
}
/** @nocollapse */ McButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonModule, declarations: [McButton,
        McAnchor,
        McButtonCssStyler], imports: [CommonModule,
        A11yModule,
        PlatformModule], exports: [McButton,
        McAnchor,
        McButtonCssStyler] });
/** @nocollapse */ McButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [
                        McButton,
                        McAnchor,
                        McButtonCssStyler
                    ],
                    declarations: [
                        McButton,
                        McAnchor,
                        McButtonCssStyler
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McAnchor, McButton, McButtonBase, McButtonCssStyler, McButtonMixinBase, McButtonModule };
//# sourceMappingURL=ptsecurity-mosaic-button.js.map

/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, ContentChildren, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { Platform, PlatformModule } from '@ptsecurity/cdk/platform';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class McButtonCSSStyler {
}
McButtonCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: 'button[mc-button], a[mc-button]',
                host: { class: 'mc-button' }
            },] },
];
class McXSButtonCSSStyler {
}
McXSButtonCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: 'button[mc-xs-button], a[mc-xs-button]',
                host: { class: 'mc-button mc-button_xs' }
            },] },
];
class McSMButtonCSSStyler {
}
McSMButtonCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: 'button[mc-sm-button], a[mc-sm-button]',
                host: { class: 'mc-button mc-button_sm' }
            },] },
];
class McLGButtonCSSStyler {
}
McLGButtonCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: 'button[mc-lg-button], a[mc-lg-button]',
                host: { class: 'mc-button mc-button_lg' }
            },] },
];
class McXLButtonCSSStyler {
}
McXLButtonCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: 'button[mc-xl-button], a[mc-xl-button]',
                host: { class: 'mc-button mc-button_xl' }
            },] },
];
class McIconButtonCSSStyler {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.nativeElement = elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._addClassModificatorForIcons();
    }
    /**
     * @return {?}
     */
    _addClassModificatorForIcons() {
        const /** @type {?} */ twoIcons = 2;
        const /** @type {?} */ icons = this.contentChildren.map((item) => item._elementRef.nativeElement);
        if (icons.length === 1) {
            const /** @type {?} */ iconElement = icons[0];
            if (!iconElement.previousElementSibling && !iconElement.nextElementSibling) {
                if (iconElement.nextSibling) {
                    iconElement.classList.add('mc-icon_left');
                    this.nativeElement.classList.add('mc-icon-button_left');
                }
                if (iconElement.previousSibling) {
                    iconElement.classList.add('mc-icon_right');
                    this.nativeElement.classList.add('mc-icon-button_right');
                }
            }
        }
        else if (icons.length === twoIcons) {
            const /** @type {?} */ firstIconElement = icons[0];
            const /** @type {?} */ secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    }
}
McIconButtonCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: 'button[mc-icon-button], a[mc-icon-button]',
                queries: {
                    contentChildren: new ContentChildren(McIcon)
                },
                host: { class: 'mc-icon-button' }
            },] },
];
/** @nocollapse */
McIconButtonCSSStyler.ctorParameters = () => [
    { type: ElementRef, },
];
class McButtonBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const /** @type {?} */ _McButtonMixinBase = mixinColor(mixinDisabled(McButtonBase));
class McButton extends _McButtonMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _platform
     * @param {?} _focusMonitor
     */
    constructor(elementRef, _platform, _focusMonitor) {
        super(elementRef);
        this._platform = _platform;
        this._focusMonitor = _focusMonitor;
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    focus() {
        this._getHostElement().focus();
    }
    /**
     * @return {?}
     */
    _getHostElement() {
        return this._elementRef.nativeElement;
    }
}
McButton.decorators = [
    { type: Component, args: [{
                selector: `
        button[mc-button],
        button[mc-xs-button],
        button[mc-sm-button],
        button[mc-lg-button],
        button[mc-xl-button]
    `,
                template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
                styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px;font-size:inherit;font-weight:500}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:14px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:14px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled', 'color'],
                host: {
                    '[disabled]': 'disabled || null'
                }
            },] },
];
/** @nocollapse */
McButton.ctorParameters = () => [
    { type: ElementRef, },
    { type: Platform, },
    { type: FocusMonitor, },
];
class McAnchor extends McButton {
    /**
     * @param {?} platform
     * @param {?} focusMonitor
     * @param {?} elementRef
     */
    constructor(platform, focusMonitor, elementRef) {
        super(elementRef, platform, focusMonitor);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
McAnchor.decorators = [
    { type: Component, args: [{
                selector: 'a[mc-button], a[mc-xs-button], a[mc-sm-button], a[mc-lg-button], a[mc-xl-button]',
                template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
                styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px;font-size:inherit;font-weight:500}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:14px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:14px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled', 'color'],
                host: {
                    '[attr.tabindex]': 'disabled ? -1 : 0',
                    '[attr.disabled]': 'disabled || null',
                    '(click)': '_haltDisabledEvents($event)'
                }
            },] },
];
/** @nocollapse */
McAnchor.ctorParameters = () => [
    { type: Platform, },
    { type: FocusMonitor, },
    { type: ElementRef, },
];
class McIconButton extends McButton {
    /**
     * @param {?} platform
     * @param {?} focusMonitor
     * @param {?} elementRef
     */
    constructor(platform, focusMonitor, elementRef) {
        super(elementRef, platform, focusMonitor);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
McIconButton.decorators = [
    { type: Component, args: [{
                selector: 'button[mc-icon-button]',
                template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
                styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-button,.mc-button_lg,.mc-button_sm,.mc-button_xl,.mc-button_xs,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px;font-size:inherit;font-weight:500}.mc-button::-moz-focus-inner,.mc-button_lg::-moz-focus-inner,.mc-button_sm::-moz-focus-inner,.mc-button_xl::-moz-focus-inner,.mc-button_xs::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-button_lg:focus,.mc-button_sm:focus,.mc-button_xl:focus,.mc-button_xs:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-button_lg[disabled],.mc-button_sm[disabled],.mc-button_xl[disabled],.mc-button_xs[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-button_lg,.cdk-focused.mc-button_sm,.cdk-focused.mc-button_xl,.cdk-focused.mc-button_xs,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.mc-button{padding:5px 15px;line-height:20px;font-size:14px}.mc-button_xs{padding:3px 7px;line-height:16px;font-size:12px}.mc-button_sm{padding:3px 15px;line-height:16px;font-size:12px}.mc-button_lg{padding:9px 15px;line-height:20px;font-size:14px}.mc-button_xl{padding:9px 59px;line-height:28px;font-size:18px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:14px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group-vertical{display:flex;flex-direction:column}.mc-button-group-vertical>.mc-button:first-child:not(:last-child),.mc-button-group-vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group-vertical>.mc-button:last-child:not(:first-child),.mc-button-group-vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group-vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group-vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group-vertical .mc-button+.mc-button,.mc-button-group-vertical .mc-button+.mc-icon-button,.mc-button-group-vertical .mc-icon-button+.mc-button,.mc-button-group-vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled', 'color'],
                host: {
                    '[attr.tabindex]': 'disabled ? -1 : 0',
                    '[attr.disabled]': 'disabled || null'
                }
            },] },
];
/** @nocollapse */
McIconButton.ctorParameters = () => [
    { type: Platform, },
    { type: FocusMonitor, },
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class McButtonModule {
}
McButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule
                ],
                exports: [
                    McButton,
                    McAnchor,
                    McIconButton,
                    McButtonCSSStyler,
                    McXSButtonCSSStyler,
                    McSMButtonCSSStyler,
                    McLGButtonCSSStyler,
                    McXLButtonCSSStyler,
                    McIconButtonCSSStyler
                ],
                declarations: [
                    McButton,
                    McAnchor,
                    McIconButton,
                    McButtonCSSStyler,
                    McXSButtonCSSStyler,
                    McSMButtonCSSStyler,
                    McLGButtonCSSStyler,
                    McXLButtonCSSStyler,
                    McIconButtonCSSStyler
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { McButtonModule, McButtonCSSStyler, McXSButtonCSSStyler, McSMButtonCSSStyler, McLGButtonCSSStyler, McXLButtonCSSStyler, McIconButtonCSSStyler, McButtonBase, _McButtonMixinBase, McButton, McAnchor, McIconButton };
//# sourceMappingURL=button.js.map

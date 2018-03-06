/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { Platform, PlatformModule } from '@ptsecurity/cdk/platform';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McButtonCSSStyler = /** @class */ (function () {
    function McButtonCSSStyler() {
    }
    McButtonCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'button[mc-button], a[mc-button]',
                    host: { class: 'mc-button' }
                },] },
    ];
    /** @nocollapse */
    McButtonCSSStyler.ctorParameters = function () { return []; };
    return McButtonCSSStyler;
}());
var McXSButtonCSSStyler = /** @class */ (function () {
    function McXSButtonCSSStyler() {
    }
    McXSButtonCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'button[mc-xs-button], a[mc-xs-button]',
                    host: { class: 'mc-xs-button' }
                },] },
    ];
    /** @nocollapse */
    McXSButtonCSSStyler.ctorParameters = function () { return []; };
    return McXSButtonCSSStyler;
}());
var McSMButtonCSSStyler = /** @class */ (function () {
    function McSMButtonCSSStyler() {
    }
    McSMButtonCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'button[mc-sm-button], a[mc-sm-button]',
                    host: { class: 'mc-sm-button' }
                },] },
    ];
    /** @nocollapse */
    McSMButtonCSSStyler.ctorParameters = function () { return []; };
    return McSMButtonCSSStyler;
}());
var McLGButtonCSSStyler = /** @class */ (function () {
    function McLGButtonCSSStyler() {
    }
    McLGButtonCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'button[mc-lg-button], a[mc-lg-button]',
                    host: { class: 'mc-lg-button' }
                },] },
    ];
    /** @nocollapse */
    McLGButtonCSSStyler.ctorParameters = function () { return []; };
    return McLGButtonCSSStyler;
}());
var McXLButtonCSSStyler = /** @class */ (function () {
    function McXLButtonCSSStyler() {
    }
    McXLButtonCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'button[mc-xl-button], a[mc-xl-button]',
                    host: { class: 'mc-xl-button' }
                },] },
    ];
    /** @nocollapse */
    McXLButtonCSSStyler.ctorParameters = function () { return []; };
    return McXLButtonCSSStyler;
}());
var McButtonBase = /** @class */ (function () {
    function McButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McButtonBase;
}());
var /** @type {?} */ _McButtonMixinBase = mixinColor(mixinDisabled(McButtonBase));
var McButton = /** @class */ (function (_super) {
    __extends(McButton, _super);
    function McButton(elementRef, _platform, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this._platform = _platform;
        _this._focusMonitor = _focusMonitor;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
        return _this;
    }
    /**
     * @return {?}
     */
    McButton.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McButton.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._getHostElement().focus();
    };
    /**
     * @return {?}
     */
    McButton.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    McButton.decorators = [
        { type: Component, args: [{
                    selector: "\n        button[mc-button], button[mc-xs-button], button[mc-sm-button], button[mc-lg-button], button[mc-xl-button]\n    ",
                    template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
                    styles: [".mc-button,.mc-icon-button,.mc-lg-button,.mc-light-button,.mc-sm-button,.mc-xl-button,.mc-xs-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;margin:0;border-radius:3px;font-size:inherit;font-weight:500;text-align:center;border:1px solid transparent}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-lg-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner,.mc-sm-button::-moz-focus-inner,.mc-xl-button::-moz-focus-inner,.mc-xs-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-lg-button:focus,.mc-light-button:focus,.mc-sm-button:focus,.mc-xl-button:focus,.mc-xs-button:focus{outline:0}[disabled].mc-button,[disabled].mc-icon-button,[disabled].mc-lg-button,[disabled].mc-light-button,[disabled].mc-sm-button,[disabled].mc-xl-button,[disabled].mc-xs-button{cursor:default}@keyframes progress-bar-stripes{from{background-position:0 0}to{background-position:29px 0}}.mc-button{padding:5px 15px;line-height:20px;font-size:14px}.mc-xs-button{padding:3px 7px;line-height:16px;font-size:12px}.mc-sm-button{padding:3px 15px;line-height:16px;font-size:12px}.mc-lg-button{padding:9px 15px;line-height:20px;font-size:14px}.mc-xl-button{padding:9px 59px;line-height:28px;font-size:18px}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled', 'color'],
                    host: {
                        '[disabled]': 'disabled || null'
                    }
                },] },
    ];
    /** @nocollapse */
    McButton.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Platform, },
        { type: FocusMonitor, },
    ]; };
    return McButton;
}(_McButtonMixinBase));
var McAnchor = /** @class */ (function (_super) {
    __extends(McAnchor, _super);
    function McAnchor(platform, focusMonitor, elementRef) {
        return _super.call(this, elementRef, platform, focusMonitor) || this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    McAnchor.prototype._haltDisabledEvents = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    McAnchor.decorators = [
        { type: Component, args: [{
                    selector: 'a[mc-button], a[mc-xs-button], a[mc-sm-button], a[mc-lg-button], a[mc-xl-button]',
                    template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-focus-overlay\"></div>",
                    styles: [".mc-button,.mc-icon-button,.mc-lg-button,.mc-light-button,.mc-sm-button,.mc-xl-button,.mc-xs-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;margin:0;border-radius:3px;font-size:inherit;font-weight:500;text-align:center;border:1px solid transparent}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-lg-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner,.mc-sm-button::-moz-focus-inner,.mc-xl-button::-moz-focus-inner,.mc-xs-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-lg-button:focus,.mc-light-button:focus,.mc-sm-button:focus,.mc-xl-button:focus,.mc-xs-button:focus{outline:0}[disabled].mc-button,[disabled].mc-icon-button,[disabled].mc-lg-button,[disabled].mc-light-button,[disabled].mc-sm-button,[disabled].mc-xl-button,[disabled].mc-xs-button{cursor:default}@keyframes progress-bar-stripes{from{background-position:0 0}to{background-position:29px 0}}.mc-button{padding:5px 15px;line-height:20px;font-size:14px}.mc-xs-button{padding:3px 7px;line-height:16px;font-size:12px}.mc-sm-button{padding:3px 15px;line-height:16px;font-size:12px}.mc-lg-button{padding:9px 15px;line-height:20px;font-size:14px}.mc-xl-button{padding:9px 59px;line-height:28px;font-size:18px}"],
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
    McAnchor.ctorParameters = function () { return [
        { type: Platform, },
        { type: FocusMonitor, },
        { type: ElementRef, },
    ]; };
    return McAnchor;
}(McButton));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var McButtonModule = /** @class */ (function () {
    function McButtonModule() {
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
                        McButtonCSSStyler,
                        McXSButtonCSSStyler,
                        McSMButtonCSSStyler,
                        McLGButtonCSSStyler,
                        McXLButtonCSSStyler
                    ],
                    declarations: [
                        McButton,
                        McAnchor,
                        McButtonCSSStyler,
                        McXSButtonCSSStyler,
                        McSMButtonCSSStyler,
                        McLGButtonCSSStyler,
                        McXLButtonCSSStyler
                    ]
                },] },
    ];
    /** @nocollapse */
    McButtonModule.ctorParameters = function () { return []; };
    return McButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { McButtonModule, McButtonCSSStyler, McXSButtonCSSStyler, McSMButtonCSSStyler, McLGButtonCSSStyler, McXLButtonCSSStyler, McButtonBase, _McButtonMixinBase, McButton, McAnchor };
//# sourceMappingURL=button.es5.js.map

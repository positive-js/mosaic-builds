/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends } from 'tslib';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McButtonCssStyler = /** @class */ (function () {
    function McButtonCssStyler(elementRef) {
        this.icons = [];
        this.nativeElement = elementRef.nativeElement;
    }
    Object.defineProperty(McButtonCssStyler.prototype, "isIconButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this.icons.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McButtonCssStyler.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        /**
         * Here we had to use native selectors due to number of angular issues about ContentChildren limitations
         * https://github.com/angular/angular/issues/16299
         * https://github.com/angular/angular/issues/8563
         * https://github.com/angular/angular/issues/14769
         */
        this.icons = Array.from(this.nativeElement.querySelectorAll('.mc-icon'));
        this.addClassModificatorForIcons();
    };
    /**
     * @private
     * @return {?}
     */
    McButtonCssStyler.prototype.addClassModificatorForIcons = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var twoIcons = 2;
        if (this.icons.length === 1) {
            /** @type {?} */
            var iconElement = this.icons[0];
            /** @type {?} */
            var COMMENT_NODE = 8;
            if (!iconElement.previousElementSibling && !iconElement.nextElementSibling) {
                if (iconElement.nextSibling && iconElement.nextSibling.nodeType !== COMMENT_NODE) {
                    iconElement.classList.add('mc-icon_left');
                    this.nativeElement.classList.add('mc-icon-button_left');
                }
                if (iconElement.previousSibling && iconElement.previousSibling.nodeType !== COMMENT_NODE) {
                    iconElement.classList.add('mc-icon_right');
                    this.nativeElement.classList.add('mc-icon-button_right');
                }
            }
        }
        else if (this.icons.length === twoIcons) {
            /** @type {?} */
            var firstIconElement = this.icons[0];
            /** @type {?} */
            var secondIconElement = this.icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    };
    McButtonCssStyler.decorators = [
        { type: Directive, args: [{
                    selector: 'button[mc-button], a[mc-button]',
                    host: {
                        '[class.mc-button]': '!isIconButton',
                        '[class.mc-icon-button]': 'isIconButton'
                    }
                },] },
    ];
    /** @nocollapse */
    McButtonCssStyler.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return McButtonCssStyler;
}());
var McButtonBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McButtonBase;
}());
// tslint:disable-next-line:naming-convention
/** @type {?} */
var McButtonMixinBase = mixinColor(mixinDisabled(McButtonBase));
var McButton = /** @class */ (function (_super) {
    __extends(McButton, _super);
    function McButton(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
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
        this.getHostElement().focus();
    };
    /**
     * @return {?}
     */
    McButton.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    McButton.decorators = [
        { type: Component, args: [{
                    selector: 'button[mc-button]',
                    template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
                    styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px}.mc-button_transparent.mc-primary,.mc-button_transparent.mc-second{border-color:transparent;background-color:transparent}.mc-button_transparent.mc-primary.mc-disabled,.mc-button_transparent.mc-primary[disabled],.mc-button_transparent.mc-second.mc-disabled,.mc-button_transparent.mc-second[disabled]{border-color:transparent}.mc-button_transparent.mc-primary.mc-active,.mc-button_transparent.mc-primary:active,.mc-button_transparent.mc-second.mc-active,.mc-button_transparent.mc-second:active{border-color:transparent;background-color:transparent;box-shadow:none}.mc-icon-button{padding:5px 7px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"],
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
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    return McButton;
}(McButtonMixinBase));
var McAnchor = /** @class */ (function (_super) {
    __extends(McAnchor, _super);
    function McAnchor(focusMonitor, elementRef) {
        return _super.call(this, elementRef, focusMonitor) || this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    McAnchor.prototype.haltDisabledEvents = /**
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
                    selector: 'a[mc-button]',
                    template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
                    styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px}.mc-button_transparent.mc-primary,.mc-button_transparent.mc-second{border-color:transparent;background-color:transparent}.mc-button_transparent.mc-primary.mc-disabled,.mc-button_transparent.mc-primary[disabled],.mc-button_transparent.mc-second.mc-disabled,.mc-button_transparent.mc-second[disabled]{border-color:transparent}.mc-button_transparent.mc-primary.mc-active,.mc-button_transparent.mc-primary:active,.mc-button_transparent.mc-second.mc-active,.mc-button_transparent.mc-second:active{border-color:transparent;background-color:transparent;box-shadow:none}.mc-icon-button{padding:5px 7px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled', 'color'],
                    host: {
                        '[attr.tabindex]': 'disabled ? -1 : 0',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'haltDisabledEvents($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    McAnchor.ctorParameters = function () { return [
        { type: FocusMonitor },
        { type: ElementRef }
    ]; };
    return McAnchor;
}(McButton));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                        McButtonCssStyler
                    ],
                    declarations: [
                        McButton,
                        McAnchor,
                        McButtonCssStyler
                    ]
                },] },
    ];
    return McButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McButtonModule, McButtonCssStyler, McButtonBase, McButtonMixinBase, McButton, McAnchor };
//# sourceMappingURL=button.es5.js.map

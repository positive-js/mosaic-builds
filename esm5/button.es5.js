/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __extends } from 'tslib';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, ContentChildren, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

var McButtonCSSStyler = /** @class */ (function () {
    function McButtonCSSStyler() {
    }
    McButtonCSSStyler = __decorate([
        Directive({
            selector: 'button[mc-button], a[mc-button]',
            host: { class: 'mc-button' }
        })
    ], McButtonCSSStyler);
    return McButtonCSSStyler;
}());
var McIconButtonCSSStyler = /** @class */ (function () {
    function McIconButtonCSSStyler(elementRef) {
        this.nativeElement = elementRef.nativeElement;
    }
    McIconButtonCSSStyler.prototype.ngAfterContentInit = function () {
        this._addClassModificatorForIcons();
    };
    McIconButtonCSSStyler.prototype._addClassModificatorForIcons = function () {
        var twoIcons = 2;
        var icons = this.contentChildren.map(function (item) { return item._elementRef.nativeElement; });
        if (icons.length === 1) {
            var iconElement = icons[0];
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
            var firstIconElement = icons[0];
            var secondIconElement = icons[1];
            firstIconElement.classList.add('mc-icon_left');
            secondIconElement.classList.add('mc-icon_right');
        }
    };
    McIconButtonCSSStyler = __decorate([
        Directive({
            selector: 'button[mc-icon-button], a[mc-icon-button]',
            queries: {
                contentChildren: new ContentChildren(McIcon)
            },
            host: { class: 'mc-icon-button' }
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], McIconButtonCSSStyler);
    return McIconButtonCSSStyler;
}());
var McButtonBase = /** @class */ (function () {
    function McButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McButtonBase;
}());
var _McButtonMixinBase = mixinColor(mixinDisabled(McButtonBase));
var McButton = /** @class */ (function (_super) {
    __extends(McButton, _super);
    function McButton(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this._focusMonitor = _focusMonitor;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
        return _this;
    }
    McButton.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    McButton.prototype.focus = function () {
        this._getHostElement().focus();
    };
    McButton.prototype._getHostElement = function () {
        return this._elementRef.nativeElement;
    };
    McButton = __decorate([
        Component({
            selector: "\n        button[mc-button],\n        button[mc-xs-button],\n        button[mc-sm-button],\n        button[mc-lg-button],\n        button[mc-xl-button]\n    ",
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:15px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group_vertical{display:flex;flex-direction:column}.mc-button-group_vertical>.mc-button:first-child:not(:last-child),.mc-button-group_vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group_vertical>.mc-button:last-child:not(:first-child),.mc-button-group_vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group_vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group_vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group_vertical .mc-button+.mc-button,.mc-button-group_vertical .mc-button+.mc-icon-button,.mc-button-group_vertical .mc-icon-button+.mc-button,.mc-button-group_vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[disabled]': 'disabled || null'
            }
        }),
        __metadata("design:paramtypes", [ElementRef, FocusMonitor])
    ], McButton);
    return McButton;
}(_McButtonMixinBase));
var McAnchor = /** @class */ (function (_super) {
    __extends(McAnchor, _super);
    function McAnchor(focusMonitor, elementRef) {
        return _super.call(this, elementRef, focusMonitor) || this;
    }
    McAnchor.prototype._haltDisabledEvents = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    McAnchor = __decorate([
        Component({
            selector: 'a[mc-button], a[mc-xs-button], a[mc-sm-button], a[mc-lg-button], a[mc-xl-button]',
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:15px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group_vertical{display:flex;flex-direction:column}.mc-button-group_vertical>.mc-button:first-child:not(:last-child),.mc-button-group_vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group_vertical>.mc-button:last-child:not(:first-child),.mc-button-group_vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group_vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group_vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group_vertical .mc-button+.mc-button,.mc-button-group_vertical .mc-button+.mc-icon-button,.mc-button-group_vertical .mc-icon-button+.mc-button,.mc-button-group_vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[attr.tabindex]': 'disabled ? -1 : 0',
                '[attr.disabled]': 'disabled || null',
                '(click)': '_haltDisabledEvents($event)'
            }
        }),
        __metadata("design:paramtypes", [FocusMonitor, ElementRef])
    ], McAnchor);
    return McAnchor;
}(McButton));
var McIconButton = /** @class */ (function (_super) {
    __extends(McIconButton, _super);
    function McIconButton(focusMonitor, elementRef) {
        return _super.call(this, elementRef, focusMonitor) || this;
    }
    McIconButton.prototype._haltDisabledEvents = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    McIconButton = __decorate([
        Component({
            selector: 'button[mc-icon-button]',
            template: "<div class=\"mc-button-wrapper\"><ng-content></ng-content></div><div class=\"mc-button-overlay\"></div>",
            styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border:1px solid transparent;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px;line-height:20px;font-size:15px}.mc-icon-button{padding:5px 7px;line-height:20px;font-size:15px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}.mc-button-group{display:flex;flex-direction:row}.mc-button-group>.mc-button:first-of-type:not(:last-of-type),.mc-button-group>.mc-icon-button:first-of-type:not(:last-of-type){border-bottom-right-radius:0;border-top-right-radius:0}.mc-button-group>.mc-button:last-of-type:not(:first-of-type),.mc-button-group>.mc-icon-button:last-of-type:not(:first-of-type){border-bottom-left-radius:0;border-top-left-radius:0}.mc-button-group>.mc-button:not(:first-of-type):not(:last-of-type),.mc-button-group>.mc-icon-button:not(:first-of-type):not(:last-of-type){border-radius:0}.mc-button-group .mc-button+.mc-button,.mc-button-group .mc-button+.mc-icon-button,.mc-button-group .mc-icon-button+.mc-button,.mc-button-group .mc-icon-button+.mc-icon-button{margin-left:-1px}.mc-button-group_justified>.mc-button,.mc-button-group_justified>.mc-icon-button{width:100%}.mc-button-group_vertical{display:flex;flex-direction:column}.mc-button-group_vertical>.mc-button:first-child:not(:last-child),.mc-button-group_vertical>.mc-icon-button:first-child:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-right-radius:3px}.mc-button-group_vertical>.mc-button:last-child:not(:first-child),.mc-button-group_vertical>.mc-icon-button:last-child:not(:first-child){border-top-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:3px}.mc-button-group_vertical>.mc-button:not(:first-child):not(:last-child),.mc-button-group_vertical>.mc-icon-button:not(:first-child):not(:last-child){border-radius:0}.mc-button-group_vertical .mc-button+.mc-button,.mc-button-group_vertical .mc-button+.mc-icon-button,.mc-button-group_vertical .mc-icon-button+.mc-button,.mc-button-group_vertical .mc-icon-button+.mc-icon-button{margin-top:-1px}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            inputs: ['disabled', 'color'],
            host: {
                '[attr.tabindex]': 'disabled ? -1 : 0',
                '[attr.disabled]': 'disabled || null'
            }
        }),
        __metadata("design:paramtypes", [FocusMonitor, ElementRef])
    ], McIconButton);
    return McIconButton;
}(McButton));

var McButtonModule = /** @class */ (function () {
    function McButtonModule() {
    }
    McButtonModule = __decorate([
        NgModule({
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
                McIconButtonCSSStyler
            ],
            declarations: [
                McButton,
                McAnchor,
                McIconButton,
                McButtonCSSStyler,
                McIconButtonCSSStyler
            ]
        })
    ], McButtonModule);
    return McButtonModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McButtonModule, McButtonCSSStyler, McIconButtonCSSStyler, McButtonBase, _McButtonMixinBase, McButton, McAnchor, McIconButton };
//# sourceMappingURL=button.es5.js.map

/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __metadata, __param } from 'tslib';
import { Input, Attribute, Component, ElementRef, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

var McLinkBase = /** @class */ (function () {
    function McLinkBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McLinkBase;
}());
var _McLinkBase = mixinTabIndex(mixinDisabled(McLinkBase));
var McLink = /** @class */ (function (_super) {
    __extends(McLink, _super);
    function McLink(tabIndex, elementRef, _focusMonitor, _changeDetector) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._changeDetector = _changeDetector;
        _this._disabled = false;
        _this._focusMonitor.monitor(elementRef.nativeElement, true);
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(McLink.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            var newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    McLink.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    McLink.prototype.focus = function () {
        this._getHostElement().focus();
    };
    McLink.prototype._getHostElement = function () {
        return this.elementRef.nativeElement;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McLink.prototype, "disabled", null);
    McLink = __decorate([
        Component({
            selector: 'a.mc-link',
            template: "<ng-content></ng-content>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            exportAs: 'mcLink',
            styles: [".mc-link{display:inline-flex;align-items:center;padding:2px 4px;text-decoration:none!important;cursor:pointer;outline:0}.mc-link{transition-property:color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link:focus{transition:none}.mc-link:hover{transition:none}.mc-link.mc-focused,.mc-link:focus{border-radius:3px}.mc-link[disabled]{pointer-events:none;cursor:default}.mc-link>.mc-link__icon{color:inherit}.mc-link>.mc-link__text:not(:first-child){margin-left:4px}.mc-link>.mc-link__text:not(:last-child){margin-right:4px}.mc-link .mc-link_dashed,.mc-link.mc-link_underlined{transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link .mc-link_dashed:focus,.mc-link.mc-link_underlined:focus{transition:none}.mc-link .mc-link_dashed:hover,.mc-link.mc-link_underlined:hover{transition:none}"],
            inputs: ['disabled'],
            host: {
                '[attr.disabled]': 'disabled || null',
                '[attr.tabindex]': 'tabIndex'
            }
        }),
        __param(0, Attribute('tabindex')),
        __metadata("design:paramtypes", [String, ElementRef,
            FocusMonitor,
            ChangeDetectorRef])
    ], McLink);
    return McLink;
}(_McLinkBase));

var McLinkModule = /** @class */ (function () {
    function McLinkModule() {
    }
    McLinkModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                A11yModule
            ],
            declarations: [McLink],
            exports: [McLink]
        })
    ], McLinkModule);
    return McLinkModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McLinkModule, McLinkBase, _McLinkBase, McLink };
//# sourceMappingURL=link.es5.js.map

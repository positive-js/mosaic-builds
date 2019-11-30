/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, ChangeDetectorRef, Attribute, Input, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { __extends } from 'tslib';
import { mixinTabIndex, mixinDisabled, toBoolean } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McLinkBase = /** @class */ (function () {
    function McLinkBase(elementRef) {
        this.elementRef = elementRef;
    }
    return McLinkBase;
}());
// tslint:disable-next-line: naming-convention
/** @type {?} */
var McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
var McLink = /** @class */ (function (_super) {
    __extends(McLink, _super);
    function McLink(elementRef, focusMonitor, changeDetector, tabIndex) {
        var _this = _super.call(this, elementRef) || this;
        _this.focusMonitor = focusMonitor;
        _this.changeDetector = changeDetector;
        _this._disabled = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.focusMonitor.monitor(elementRef.nativeElement, true);
        return _this;
    }
    Object.defineProperty(McLink.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = toBoolean(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this.changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McLink.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McLink.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.getHostElement().focus();
    };
    /**
     * @return {?}
     */
    McLink.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement;
    };
    McLink.decorators = [
        { type: Directive, args: [{
                    selector: 'a.mc-link',
                    exportAs: 'mcLink',
                    inputs: ['disabled'],
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'tabIndex'
                    }
                },] },
    ];
    /** @nocollapse */
    McLink.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
    ]; };
    McLink.propDecorators = {
        disabled: [{ type: Input }]
    };
    return McLink;
}(McLinkMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McLinkModule = /** @class */ (function () {
    function McLinkModule() {
    }
    McLinkModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        A11yModule
                    ],
                    declarations: [McLink],
                    exports: [McLink]
                },] },
    ];
    return McLinkModule;
}());

export { McLink, McLinkBase, McLinkMixinBase, McLinkModule };
//# sourceMappingURL=link.es5.js.map

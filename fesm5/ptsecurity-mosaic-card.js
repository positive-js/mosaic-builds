import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, Output, NgModule } from '@angular/core';
import { __extends } from 'tslib';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * Generated from: card.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McCardBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McCardBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McCardBase;
}());
if (false) {
    /** @type {?} */
    McCardBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
var McCardBaseMixin = mixinColor(McCardBase);
var McCard = /** @class */ (function (_super) {
    __extends(McCard, _super);
    function McCard(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this._focusMonitor = _focusMonitor;
        _this.readonly = false;
        _this.selected = false;
        _this.selectedChange = new EventEmitter();
        _this._tabIndex = 0;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, false);
        return _this;
    }
    Object.defineProperty(McCard.prototype, "tabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.readonly ? null : this._tabIndex;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McCard.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McCard.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.hostElement.focus();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McCard.prototype.onClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McCard.prototype.onKeyDown = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        // tslint:disable-next-line:deprecation
        switch ($event.keyCode) {
            case SPACE:
                if (!this.readonly) {
                    $event.preventDefault();
                    this.selectedChange.emit(!this.selected);
                }
                break;
            default:
        }
    };
    Object.defineProperty(McCard.prototype, "hostElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    McCard.decorators = [
        { type: Component, args: [{
                    selector: 'mc-card',
                    template: "<ng-content></ng-content>\n<div class=\"mc-card__overlay\"></div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['color'],
                    host: {
                        class: 'mc-card',
                        '[class.mc-card_readonly]': 'readonly',
                        '[class.mc-selected]': 'selected',
                        '[attr.tabindex]': 'tabIndex',
                        '(keydown)': 'onKeyDown($event)',
                        '(click)': 'onClick($event)'
                    },
                    styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left:4px solid transparent}.mc-card:focus{outline:0}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:0 0}.mc-card.mc-card_readonly{cursor:auto}"]
                }] }
    ];
    /** @nocollapse */
    McCard.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    McCard.propDecorators = {
        readonly: [{ type: Input }],
        selected: [{ type: Input }],
        selectedChange: [{ type: Output }],
        tabIndex: [{ type: Input }]
    };
    return McCard;
}(McCardBaseMixin));
if (false) {
    /** @type {?} */
    McCard.prototype.readonly;
    /** @type {?} */
    McCard.prototype.selected;
    /** @type {?} */
    McCard.prototype.selectedChange;
    /**
     * @type {?}
     * @private
     */
    McCard.prototype._tabIndex;
    /**
     * @type {?}
     * @private
     */
    McCard.prototype._focusMonitor;
}

/**
 * @fileoverview added by tsickle
 * Generated from: card.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McCardModule = /** @class */ (function () {
    function McCardModule() {
    }
    McCardModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [McCard],
                    declarations: [McCard]
                },] }
    ];
    return McCardModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-card.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McCard, McCardBase, McCardBaseMixin, McCardModule };
//# sourceMappingURL=ptsecurity-mosaic-card.js.map

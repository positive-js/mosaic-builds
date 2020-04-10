(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/a11y'), require('@angular/cdk/platform'), require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/keycodes')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/card', ['exports', '@angular/cdk/a11y', '@angular/cdk/platform', '@angular/common', '@angular/core', '@ptsecurity/cdk/keycodes'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.card = {}), global.ng.cdk.a11y, global.ng.cdk.platform, global.ng.common, global.ng.core, global.ng.cdk.keycodes));
}(this, (function (exports, a11y, platform, common, core, keycodes) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: card.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McCard = /** @class */ (function () {
        function McCard(_elementRef, _focusMonitor) {
            this._elementRef = _elementRef;
            this._focusMonitor = _focusMonitor;
            this.readonly = false;
            this.selected = false;
            this.selectedChange = new core.EventEmitter();
            this._tabIndex = 0;
            this._focusMonitor.monitor(this._elementRef.nativeElement, false);
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
                case keycodes.SPACE:
                    if (!this.readonly) {
                        $event.preventDefault();
                        this.selectedChange.emit(!this.selected);
                    }
                    break;
                default:
            }
        };
        McCard.decorators = [
            { type: core.Component, args: [{
                        selector: 'mc-card',
                        template: "<ng-content></ng-content>\n<div class=\"mc-card__overlay\"></div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        inputs: ['color'],
                        host: {
                            class: 'mc-card',
                            '[class.mc-card_readonly]': 'readonly',
                            '[class.mc-card_selected]': 'selected',
                            '(keydown)': 'onKeyDown($event)',
                            '(click)': 'onClick($event)'
                        },
                        styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left:4px solid transparent}.mc-card:focus{outline:0}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:0 0}.mc-card.mc-card_readonly{cursor:auto}"]
                    }] }
        ];
        /** @nocollapse */
        McCard.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: a11y.FocusMonitor }
        ]; };
        McCard.propDecorators = {
            tabIndex: [{ type: core.HostBinding, args: ['attr.tabIndex',] }, { type: core.Input }],
            readonly: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            selectedChange: [{ type: core.Output }]
        };
        return McCard;
    }());
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
        McCard.prototype._elementRef;
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            a11y.A11yModule,
                            platform.PlatformModule
                        ],
                        exports: [McCard],
                        declarations: [McCard]
                    },] }
        ];
        return McCardModule;
    }());

    exports.McCard = McCard;
    exports.McCardModule = McCardModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-card.umd.js.map

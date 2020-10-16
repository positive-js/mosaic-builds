(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@angular/cdk/coercion')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/splitter', ['exports', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@angular/cdk/coercion'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.splitter = {}), global.ng.common, global.ng.core, global.ptsecurity.mosaic.icon, global.ng.cdk.coercion));
}(this, (function (exports, common, core, icon, coercion) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: splitter.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function IArea() { }
    if (false) {
        /** @type {?} */
        IArea.prototype.area;
        /** @type {?} */
        IArea.prototype.index;
        /** @type {?} */
        IArea.prototype.order;
        /** @type {?} */
        IArea.prototype.initialSize;
    }
    /**
     * @record
     */
    function IPoint() { }
    if (false) {
        /** @type {?} */
        IPoint.prototype.x;
        /** @type {?} */
        IPoint.prototype.y;
    }
    /** @enum {string} */
    var StyleProperty = {
        Flex: "flex",
        FlexBasis: "flex-basis",
        FlexDirection: "flex-direction",
        Height: "height",
        MaxWidth: "max-width",
        MinHeight: "min-height",
        MinWidth: "minWidth",
        OffsetHeight: "offsetHeight",
        OffsetWidth: "offsetWidth",
        Order: "order",
        Width: "width",
    };
    /** @enum {string} */
    var Direction = {
        Horizontal: "horizontal",
        Vertical: "vertical",
    };
    var McGutterDirective = /** @class */ (function () {
        /**
         * @param {?} elementRef
         * @param {?} renderer
         */
        function McGutterDirective(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this._direction = Direction.Vertical;
            this._order = 0;
            this._size = 6;
            this.dragged = false;
        }
        Object.defineProperty(McGutterDirective.prototype, "direction", {
            /**
             * @return {?}
             */
            get: function () {
                return this._direction;
            },
            /**
             * @param {?} direction
             * @return {?}
             */
            set: function (direction) {
                this._direction = direction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McGutterDirective.prototype, "order", {
            /**
             * @return {?}
             */
            get: function () {
                return this._order;
            },
            /**
             * @param {?} order
             * @return {?}
             */
            set: function (order) {
                this._order = coercion.coerceNumberProperty(order);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McGutterDirective.prototype, "size", {
            /**
             * @return {?}
             */
            get: function () {
                return this._size;
            },
            /**
             * @param {?} size
             * @return {?}
             */
            set: function (size) {
                this._size = coercion.coerceNumberProperty(size);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @return {?}
         */
        McGutterDirective.prototype.ngOnInit = function () {
            this.setStyle("flex-basis" /* FlexBasis */, coercion.coerceCssPixelValue(this.size));
            this.setStyle(this.isVertical() ? "height" /* Height */ : "width" /* Width */, coercion.coerceCssPixelValue(this.size));
            this.setStyle("order" /* Order */, this.order);
            if (!this.isVertical()) {
                this.setStyle("height" /* Height */, '100%');
            }
            // fix IE issue with gutter icon. flex-direction is requied for flex alignment options
            this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'row' : 'column');
        };
        /**
         * @return {?}
         */
        McGutterDirective.prototype.isVertical = function () {
            return this.direction === Direction.Vertical;
        };
        /**
         * @private
         * @param {?} property
         * @param {?} value
         * @return {?}
         */
        McGutterDirective.prototype.setStyle = function (property, value) {
            this.renderer.setStyle(this.elementRef.nativeElement, property, value);
        };
        return McGutterDirective;
    }());
    McGutterDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'mc-gutter',
                    host: {
                        class: 'mc-gutter',
                        '[class.mc-gutter_vertical]': 'isVertical()',
                        '[class.mc-gutter_dragged]': 'dragged',
                        '(mousedown)': 'dragged = true'
                    }
                },] }
    ];
    /** @nocollapse */
    McGutterDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };
    McGutterDirective.propDecorators = {
        direction: [{ type: core.Input }],
        order: [{ type: core.Input }],
        size: [{ type: core.Input }]
    };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        McGutterDirective.prototype._direction;
        /**
         * @type {?}
         * @private
         */
        McGutterDirective.prototype._order;
        /**
         * @type {?}
         * @private
         */
        McGutterDirective.prototype._size;
        /** @type {?} */
        McGutterDirective.prototype.dragged;
        /**
         * @type {?}
         * @private
         */
        McGutterDirective.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McGutterDirective.prototype.renderer;
    }
    var McSplitterComponent = /** @class */ (function () {
        /**
         * @param {?} elementRef
         * @param {?} changeDetectorRef
         * @param {?} ngZone
         * @param {?} renderer
         */
        function McSplitterComponent(elementRef, changeDetectorRef, ngZone, renderer) {
            this.elementRef = elementRef;
            this.changeDetectorRef = changeDetectorRef;
            this.ngZone = ngZone;
            this.renderer = renderer;
            this.areas = [];
            this.isDragging = false;
            this.areaPositionDivider = 2;
            this.listeners = [];
            this._hideGutters = false;
            this._disabled = false;
            this._gutterSize = 6;
        }
        Object.defineProperty(McSplitterComponent.prototype, "hideGutters", {
            /**
             * @return {?}
             */
            get: function () {
                return this._hideGutters;
            },
            /**
             * @param {?} value
             * @return {?}
             */
            set: function (value) {
                this._hideGutters = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSplitterComponent.prototype, "direction", {
            /**
             * @return {?}
             */
            get: function () {
                return this._direction;
            },
            /**
             * @param {?} direction
             * @return {?}
             */
            set: function (direction) {
                this._direction = direction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSplitterComponent.prototype, "disabled", {
            /**
             * @return {?}
             */
            get: function () {
                return this._disabled;
            },
            /**
             * @param {?} disabled
             * @return {?}
             */
            set: function (disabled) {
                this._disabled = coercion.coerceBooleanProperty(disabled);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSplitterComponent.prototype, "gutterSize", {
            /**
             * @return {?}
             */
            get: function () {
                return this._gutterSize;
            },
            /**
             * @param {?} gutterSize
             * @return {?}
             */
            set: function (gutterSize) {
                /** @type {?} */
                var size = coercion.coerceNumberProperty(gutterSize);
                this._gutterSize = size > 0 ? size : this.gutterSize;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @param {?} area
         * @return {?}
         */
        McSplitterComponent.prototype.addArea = function (area) {
            /** @type {?} */
            var index = this.areas.length;
            /** @type {?} */
            var order = index * this.areaPositionDivider;
            /** @type {?} */
            var size = area.getSize();
            area.setOrder(order);
            this.areas.push({
                area: area,
                index: index,
                order: order,
                initialSize: size
            });
        };
        /**
         * @return {?}
         */
        McSplitterComponent.prototype.ngOnInit = function () {
            if (!this.direction) {
                this.direction = Direction.Horizontal;
            }
            this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'column' : 'row');
        };
        /**
         * @param {?} event
         * @param {?} leftAreaIndex
         * @param {?} rightAreaIndex
         * @return {?}
         */
        McSplitterComponent.prototype.onMouseDown = function (event, leftAreaIndex, rightAreaIndex) {
            var _this = this;
            if (this.disabled) {
                return;
            }
            event.preventDefault();
            /** @type {?} */
            var leftArea = this.areas[leftAreaIndex];
            /** @type {?} */
            var rightArea = this.areas[rightAreaIndex];
            /** @type {?} */
            var startPoint = {
                x: event.screenX,
                y: event.screenY
            };
            leftArea.initialSize = leftArea.area.getSize();
            rightArea.initialSize = rightArea.area.getSize();
            this.areas.forEach(( /**
             * @param {?} item
             * @return {?}
             */function (item) {
                /** @type {?} */
                var size = item.area.getSize();
                item.area.disableFlex();
                item.area.setSize(size);
            }));
            this.ngZone.runOutsideAngular(( /**
             * @return {?}
             */function () {
                _this.listeners.push(_this.renderer.listen('document', 'mouseup', ( /**
                 * @return {?}
                 */function () { return _this.onMouseUp(); })));
            }));
            this.ngZone.runOutsideAngular(( /**
             * @return {?}
             */function () {
                _this.listeners.push(_this.renderer.listen('document', 'mousemove', ( /**
                 * @param {?} e
                 * @return {?}
                 */function (e) { return _this.onMouseMove(e, startPoint, leftArea, rightArea); })));
            }));
            this.isDragging = true;
        };
        /**
         * @param {?} area
         * @return {?}
         */
        McSplitterComponent.prototype.removeArea = function (area) {
            /** @type {?} */
            var indexToRemove = -1;
            this.areas.some(( /**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */function (item, index) {
                if (item.area === area) {
                    indexToRemove = index;
                    return true;
                }
                return false;
            }));
            if (indexToRemove === -1) {
                return;
            }
            this.areas.splice(indexToRemove, 1);
        };
        /**
         * @return {?}
         */
        McSplitterComponent.prototype.isVertical = function () {
            return this.direction === Direction.Vertical;
        };
        /**
         * @private
         * @return {?}
         */
        McSplitterComponent.prototype.updateGutter = function () {
            var _this = this;
            this.gutters.forEach(( /**
             * @param {?} gutter
             * @return {?}
             */function (gutter) {
                if (gutter.dragged) {
                    gutter.dragged = false;
                    _this.changeDetectorRef.detectChanges();
                }
            }));
        };
        /**
         * @private
         * @param {?} event
         * @param {?} startPoint
         * @param {?} leftArea
         * @param {?} rightArea
         * @return {?}
         */
        McSplitterComponent.prototype.onMouseMove = function (event, startPoint, leftArea, rightArea) {
            if (!this.isDragging || this.disabled) {
                return;
            }
            /** @type {?} */
            var endPoint = {
                x: event.screenX,
                y: event.screenY
            };
            /** @type {?} */
            var offset = this.isVertical()
                ? startPoint.y - endPoint.y
                : startPoint.x - endPoint.x;
            /** @type {?} */
            var newLeftAreaSize = leftArea.initialSize - offset;
            /** @type {?} */
            var newRightAreaSize = rightArea.initialSize + offset;
            /** @type {?} */
            var minLeftAreaSize = leftArea.area.getMinSize();
            /** @type {?} */
            var minRightAreaSize = rightArea.area.getMinSize();
            if (newLeftAreaSize <= minLeftAreaSize || newRightAreaSize <= minRightAreaSize) {
                return;
            }
            else if (newLeftAreaSize <= 0) {
                leftArea.area.setSize(0);
                rightArea.area.setSize(rightArea.initialSize + leftArea.initialSize);
            }
            else if (newRightAreaSize <= 0) {
                leftArea.area.setSize(rightArea.initialSize + leftArea.initialSize);
                rightArea.area.setSize(0);
            }
            else {
                leftArea.area.setSize(newLeftAreaSize);
                rightArea.area.setSize(newRightAreaSize);
            }
        };
        /**
         * @private
         * @return {?}
         */
        McSplitterComponent.prototype.onMouseUp = function () {
            while (this.listeners.length > 0) {
                /** @type {?} */
                var unsubscribe = this.listeners.pop();
                if (unsubscribe) {
                    unsubscribe();
                }
            }
            this.isDragging = false;
            this.updateGutter();
        };
        /**
         * @private
         * @param {?} property
         * @param {?} value
         * @return {?}
         */
        McSplitterComponent.prototype.setStyle = function (property, value) {
            this.renderer.setStyle(this.elementRef.nativeElement, property, value);
        };
        return McSplitterComponent;
    }());
    McSplitterComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-splitter',
                    exportAs: 'mcSplitter',
                    host: {
                        class: 'mc-splitter'
                    },
                    preserveWhitespaces: false,
                    template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: [".mc-splitter{align-items:stretch;display:flex;flex-wrap:nowrap}.mc-gutter,.mc-splitter,.mc-splitter .mc-splitter-area{overflow:hidden}.mc-gutter{align-items:center;display:flex;flex-grow:0;flex-shrink:0;justify-content:center}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}"]
                }] }
    ];
    /** @nocollapse */
    McSplitterComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef },
        { type: core.NgZone },
        { type: core.Renderer2 }
    ]; };
    McSplitterComponent.propDecorators = {
        gutters: [{ type: core.ViewChildren, args: [McGutterDirective,] }],
        hideGutters: [{ type: core.Input }],
        direction: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        gutterSize: [{ type: core.Input }]
    };
    if (false) {
        /** @type {?} */
        McSplitterComponent.prototype.areas;
        /** @type {?} */
        McSplitterComponent.prototype.gutters;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype.isDragging;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype.areaPositionDivider;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype.listeners;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype._hideGutters;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype._direction;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype._gutterSize;
        /** @type {?} */
        McSplitterComponent.prototype.elementRef;
        /** @type {?} */
        McSplitterComponent.prototype.changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        McSplitterComponent.prototype.renderer;
    }
    var McSplitterAreaDirective = /** @class */ (function () {
        /**
         * @param {?} elementRef
         * @param {?} renderer
         * @param {?} splitter
         */
        function McSplitterAreaDirective(elementRef, renderer, splitter) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.splitter = splitter;
        }
        /**
         * @return {?}
         */
        McSplitterAreaDirective.prototype.disableFlex = function () {
            this.renderer.removeStyle(this.elementRef.nativeElement, 'flex');
        };
        /**
         * @return {?}
         */
        McSplitterAreaDirective.prototype.ngOnInit = function () {
            this.splitter.addArea(this);
            this.removeStyle("max-width" /* MaxWidth */);
            if (this.splitter.direction === Direction.Vertical) {
                this.setStyle("width" /* Width */, '100%');
                this.removeStyle("height" /* Height */);
            }
            else {
                this.setStyle("height" /* Height */, '100%');
                this.removeStyle("width" /* Width */);
            }
        };
        /**
         * @return {?}
         */
        McSplitterAreaDirective.prototype.ngOnDestroy = function () {
            this.splitter.removeArea(this);
        };
        /**
         * @param {?} order
         * @return {?}
         */
        McSplitterAreaDirective.prototype.setOrder = function (order) {
            this.setStyle("order" /* Order */, order);
        };
        /**
         * @param {?} size
         * @return {?}
         */
        McSplitterAreaDirective.prototype.setSize = function (size) {
            if (size) {
                /** @type {?} */
                var sz = coercion.coerceNumberProperty(size);
                this.setStyle(this.getSizeProperty(), coercion.coerceCssPixelValue(sz));
            }
        };
        /**
         * @return {?}
         */
        McSplitterAreaDirective.prototype.getSize = function () {
            return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
        };
        /**
         * @return {?}
         */
        McSplitterAreaDirective.prototype.getMinSize = function () {
            /** @type {?} */
            var styles = getComputedStyle(this.elementRef.nativeElement);
            return parseFloat(styles[this.getMinSizeProperty()]);
        };
        /**
         * @private
         * @return {?}
         */
        McSplitterAreaDirective.prototype.isVertical = function () {
            return this.splitter.direction === Direction.Vertical;
        };
        /**
         * @private
         * @return {?}
         */
        McSplitterAreaDirective.prototype.getMinSizeProperty = function () {
            return this.isVertical()
                ? "min-height" /* MinHeight */
                : "minWidth" /* MinWidth */;
        };
        /**
         * @private
         * @return {?}
         */
        McSplitterAreaDirective.prototype.getOffsetSizeProperty = function () {
            return this.isVertical()
                ? "offsetHeight" /* OffsetHeight */
                : "offsetWidth" /* OffsetWidth */;
        };
        /**
         * @private
         * @return {?}
         */
        McSplitterAreaDirective.prototype.getSizeProperty = function () {
            return this.isVertical()
                ? "height" /* Height */
                : "width" /* Width */;
        };
        /**
         * @private
         * @param {?} style
         * @param {?} value
         * @return {?}
         */
        McSplitterAreaDirective.prototype.setStyle = function (style, value) {
            this.renderer.setStyle(this.elementRef.nativeElement, style, value);
        };
        /**
         * @private
         * @param {?} style
         * @return {?}
         */
        McSplitterAreaDirective.prototype.removeStyle = function (style) {
            this.renderer.removeStyle(this.elementRef.nativeElement, style);
        };
        return McSplitterAreaDirective;
    }());
    McSplitterAreaDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-splitter-area]',
                    host: {
                        class: 'mc-splitter-area'
                    }
                },] }
    ];
    /** @nocollapse */
    McSplitterAreaDirective.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: McSplitterComponent }
    ]; };
    if (false) {
        /**
         * @type {?}
         * @private
         */
        McSplitterAreaDirective.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        McSplitterAreaDirective.prototype.renderer;
        /**
         * @type {?}
         * @private
         */
        McSplitterAreaDirective.prototype.splitter;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: splitter.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var McSplitterModule = /** @class */ (function () {
        function McSplitterModule() {
        }
        return McSplitterModule;
    }());
    McSplitterModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        icon.McIconModule
                    ],
                    exports: [
                        McGutterDirective,
                        McSplitterAreaDirective,
                        McSplitterComponent
                    ],
                    declarations: [
                        McGutterDirective,
                        McSplitterAreaDirective,
                        McSplitterComponent
                    ]
                },] }
    ];

    /**
     * @fileoverview added by tsickle
     * Generated from: public-api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: ptsecurity-mosaic-splitter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Direction = Direction;
    exports.McGutterDirective = McGutterDirective;
    exports.McSplitterAreaDirective = McSplitterAreaDirective;
    exports.McSplitterComponent = McSplitterComponent;
    exports.McSplitterModule = McSplitterModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-splitter.umd.js.map

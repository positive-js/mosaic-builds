(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/mosaic/icon'), require('@angular/cdk/coercion')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/splitter', ['exports', '@angular/common', '@angular/core', '@ptsecurity/mosaic/icon', '@angular/cdk/coercion'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.splitter = {}), global.ng.common, global.ng.core, global.ptsecurity.mosaic.icon, global.ng.cdk.coercion));
}(this, (function (exports, common, core, icon, coercion) { 'use strict';

    exports.Direction = void 0;
    (function (Direction) {
        Direction["Horizontal"] = "horizontal";
        Direction["Vertical"] = "vertical";
    })(exports.Direction || (exports.Direction = {}));
    var McGutterDirective = /** @class */ (function () {
        function McGutterDirective(elementRef, renderer) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this._direction = exports.Direction.Vertical;
            this._order = 0;
            this._size = 6;
            this.dragged = false;
        }
        Object.defineProperty(McGutterDirective.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (direction) {
                this._direction = direction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McGutterDirective.prototype, "order", {
            get: function () {
                return this._order;
            },
            set: function (order) {
                this._order = coercion.coerceNumberProperty(order);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McGutterDirective.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (size) {
                this._size = coercion.coerceNumberProperty(size);
            },
            enumerable: false,
            configurable: true
        });
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
        McGutterDirective.prototype.isVertical = function () {
            return this.direction === exports.Direction.Vertical;
        };
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
    var McSplitterComponent = /** @class */ (function () {
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
            get: function () {
                return this._hideGutters;
            },
            set: function (value) {
                this._hideGutters = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSplitterComponent.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (direction) {
                this._direction = direction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSplitterComponent.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                this._disabled = coercion.coerceBooleanProperty(disabled);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSplitterComponent.prototype, "gutterSize", {
            get: function () {
                return this._gutterSize;
            },
            set: function (gutterSize) {
                var size = coercion.coerceNumberProperty(gutterSize);
                this._gutterSize = size > 0 ? size : this.gutterSize;
            },
            enumerable: false,
            configurable: true
        });
        McSplitterComponent.prototype.addArea = function (area) {
            var index = this.areas.length;
            var order = index * this.areaPositionDivider;
            var size = area.getSize();
            area.setOrder(order);
            this.areas.push({
                area: area,
                index: index,
                order: order,
                initialSize: size
            });
        };
        McSplitterComponent.prototype.ngOnInit = function () {
            if (!this.direction) {
                this.direction = exports.Direction.Horizontal;
            }
            this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'column' : 'row');
        };
        McSplitterComponent.prototype.onMouseDown = function (event, leftAreaIndex, rightAreaIndex) {
            var _this = this;
            if (this.disabled) {
                return;
            }
            event.preventDefault();
            var leftArea = this.areas[leftAreaIndex];
            var rightArea = this.areas[rightAreaIndex];
            var startPoint = {
                x: event.screenX,
                y: event.screenY
            };
            leftArea.initialSize = leftArea.area.getSize();
            rightArea.initialSize = rightArea.area.getSize();
            this.areas.forEach(function (item) {
                var size = item.area.getSize();
                item.area.disableFlex();
                item.area.setSize(size);
            });
            this.ngZone.runOutsideAngular(function () {
                _this.listeners.push(_this.renderer.listen('document', 'mouseup', function () { return _this.onMouseUp(); }));
            });
            this.ngZone.runOutsideAngular(function () {
                _this.listeners.push(_this.renderer.listen('document', 'mousemove', function (e) { return _this.onMouseMove(e, startPoint, leftArea, rightArea); }));
            });
            this.isDragging = true;
        };
        McSplitterComponent.prototype.removeArea = function (area) {
            var indexToRemove = -1;
            this.areas.some(function (item, index) {
                if (item.area === area) {
                    indexToRemove = index;
                    return true;
                }
                return false;
            });
            if (indexToRemove === -1) {
                return;
            }
            this.areas.splice(indexToRemove, 1);
        };
        McSplitterComponent.prototype.isVertical = function () {
            return this.direction === exports.Direction.Vertical;
        };
        McSplitterComponent.prototype.updateGutter = function () {
            var _this = this;
            this.gutters.forEach(function (gutter) {
                if (gutter.dragged) {
                    gutter.dragged = false;
                    _this.changeDetectorRef.detectChanges();
                }
            });
        };
        McSplitterComponent.prototype.onMouseMove = function (event, startPoint, leftArea, rightArea) {
            if (!this.isDragging || this.disabled) {
                return;
            }
            var endPoint = {
                x: event.screenX,
                y: event.screenY
            };
            var offset = this.isVertical()
                ? startPoint.y - endPoint.y
                : startPoint.x - endPoint.x;
            var newLeftAreaSize = leftArea.initialSize - offset;
            var newRightAreaSize = rightArea.initialSize + offset;
            var minLeftAreaSize = leftArea.area.getMinSize();
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
        McSplitterComponent.prototype.onMouseUp = function () {
            while (this.listeners.length > 0) {
                var unsubscribe = this.listeners.pop();
                if (unsubscribe) {
                    unsubscribe();
                }
            }
            this.isDragging = false;
            this.updateGutter();
        };
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
                    styles: [".mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch}.mc-gutter,.mc-splitter,.mc-splitter .mc-splitter-area{overflow:hidden}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}"]
                },] }
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
    var McSplitterAreaDirective = /** @class */ (function () {
        function McSplitterAreaDirective(elementRef, renderer, splitter) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.splitter = splitter;
        }
        McSplitterAreaDirective.prototype.disableFlex = function () {
            this.renderer.removeStyle(this.elementRef.nativeElement, 'flex');
        };
        McSplitterAreaDirective.prototype.ngOnInit = function () {
            this.splitter.addArea(this);
            this.removeStyle("max-width" /* MaxWidth */);
            if (this.splitter.direction === exports.Direction.Vertical) {
                this.setStyle("width" /* Width */, '100%');
                this.removeStyle("height" /* Height */);
            }
            else {
                this.setStyle("height" /* Height */, '100%');
                this.removeStyle("width" /* Width */);
            }
        };
        McSplitterAreaDirective.prototype.ngOnDestroy = function () {
            this.splitter.removeArea(this);
        };
        McSplitterAreaDirective.prototype.setOrder = function (order) {
            this.setStyle("order" /* Order */, order);
        };
        McSplitterAreaDirective.prototype.setSize = function (size) {
            if (size) {
                var sz = coercion.coerceNumberProperty(size);
                this.setStyle(this.getSizeProperty(), coercion.coerceCssPixelValue(sz));
            }
        };
        McSplitterAreaDirective.prototype.getSize = function () {
            return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
        };
        McSplitterAreaDirective.prototype.getMinSize = function () {
            var styles = getComputedStyle(this.elementRef.nativeElement);
            return parseFloat(styles[this.getMinSizeProperty()]);
        };
        McSplitterAreaDirective.prototype.isVertical = function () {
            return this.splitter.direction === exports.Direction.Vertical;
        };
        McSplitterAreaDirective.prototype.getMinSizeProperty = function () {
            return this.isVertical()
                ? "min-height" /* MinHeight */
                : "minWidth" /* MinWidth */;
        };
        McSplitterAreaDirective.prototype.getOffsetSizeProperty = function () {
            return this.isVertical()
                ? "offsetHeight" /* OffsetHeight */
                : "offsetWidth" /* OffsetWidth */;
        };
        McSplitterAreaDirective.prototype.getSizeProperty = function () {
            return this.isVertical()
                ? "height" /* Height */
                : "width" /* Width */;
        };
        McSplitterAreaDirective.prototype.setStyle = function (style, value) {
            this.renderer.setStyle(this.elementRef.nativeElement, style, value);
        };
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
     * Generated bundle index. Do not edit.
     */

    exports.McGutterDirective = McGutterDirective;
    exports.McSplitterAreaDirective = McSplitterAreaDirective;
    exports.McSplitterComponent = McSplitterComponent;
    exports.McSplitterModule = McSplitterModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-splitter.umd.js.map

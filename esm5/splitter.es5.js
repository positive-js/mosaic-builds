/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata } from 'tslib';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, NgZone, Renderer2, ViewEncapsulation, NgModule } from '@angular/core';
import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@ptsecurity/cdk/coercion';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

var McSplitterComponent = /** @class */ (function () {
    function McSplitterComponent(elementRef, ngZone, renderer) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.areas = [];
        this._disabled = false;
        this._gutterSize = 6;
        this.isDragging = false;
        this.areaPositionDivider = 2;
        this.listeners = [];
    }
    Object.defineProperty(McSplitterComponent.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSplitterComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSplitterComponent.prototype, "gutterSize", {
        get: function () {
            return this._gutterSize;
        },
        set: function (gutterSize) {
            var size = coerceNumberProperty(gutterSize);
            this._gutterSize = size > 0 ? size : this.gutterSize;
        },
        enumerable: true,
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
            this.direction = "horizontal" /* Horizontal */;
        }
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'column' : 'row');
    };
    McSplitterComponent.prototype.onMouseDown = function (event, leftAreaIndex, rightAreaIndex) {
        var _this = this;
        if (this.disabled) {
            return;
        }
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
        return this.direction === "vertical" /* Vertical */;
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
            var rightAreaOffset = leftArea.initialSize - minLeftAreaSize;
            leftArea.area.setSize(minLeftAreaSize);
            rightArea.area.setSize(rightArea.initialSize + rightAreaOffset);
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
    };
    McSplitterComponent.prototype.setStyle = function (property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McSplitterComponent.prototype, "direction", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSplitterComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McSplitterComponent.prototype, "gutterSize", null);
    McSplitterComponent = __decorate([
        Component({
            selector: 'mc-splitter',
            preserveWhitespaces: false,
            styles: ["mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch;overflow:hidden}mc-splitter-area{overflow:hidden}mc-gutter{display:flex;flex-grow:0;flex-shrink:0;overflow:hidden;justify-content:center;align-items:center}.icon-vertical{transform:rotate(90deg)}"],
            template: "<ng-content></ng-content><ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\"><mc-gutter *ngIf=\"last === false\" [direction]=\"direction\" [disabled]=\"disabled\" [size]=\"gutterSize\" [order]=\"index * 2 + 1\" (mousedown)=\"onMouseDown($event, index, index + 1)\"><i mc-icon=\"mc-ellipsis_16\" [class.icon-vertical]=\"direction === 'vertical'\" *ngIf=\"!disabled\"></i></mc-gutter></ng-template>",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ElementRef,
            NgZone,
            Renderer2])
    ], McSplitterComponent);
    return McSplitterComponent;
}());
var McGutterDirective = /** @class */ (function () {
    function McGutterDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._direction = "vertical" /* Vertical */;
        this._disabled = false;
        this._order = 0;
        this._size = 6;
    }
    Object.defineProperty(McGutterDirective.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "order", {
        get: function () {
            return this._order;
        },
        set: function (order) {
            this._order = coerceNumberProperty(order);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            this._size = coerceNumberProperty(size);
        },
        enumerable: true,
        configurable: true
    });
    McGutterDirective.prototype.ngOnInit = function () {
        this.setStyle("cursor" /* Cursor */, this.getCursor(this.getState()));
        this.setStyle("flex-basis" /* FlexBasis */, coerceCssPixelValue(this.size));
        this.setStyle(this.isVertical() ? "height" /* Height */ : "width" /* Width */, coerceCssPixelValue(this.size));
        this.setStyle("order" /* Order */, this.order);
        if (!this.isVertical()) {
            this.setStyle("height" /* Height */, '100%');
        }
        if (this.disabled) {
            this.setAttr("disabled" /* Disabled */, 'true');
        }
    };
    McGutterDirective.prototype.isVertical = function () {
        return this.direction === "vertical" /* Vertical */;
    };
    McGutterDirective.prototype.getCursor = function (state) {
        switch (state) {
            case "disabled" /* Disabled */:
                return "default" /* Default */;
            case "vertical" /* Vertical */:
                return "row-resize" /* ResizeRow */;
            case "horizontal" /* Horizontal */:
                return "col-resize" /* ResizeColumn */;
            default:
                throw Error("Unknown gutter state for cursor: " + state);
        }
    };
    McGutterDirective.prototype.getState = function () {
        return this.disabled
            ? "disabled" /* Disabled */
            : this.direction === "vertical" /* Vertical */
                ? "vertical" /* Vertical */
                : "horizontal" /* Horizontal */;
    };
    McGutterDirective.prototype.setStyle = function (property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    };
    McGutterDirective.prototype.setAttr = function (attribute, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attribute, value);
    };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McGutterDirective.prototype, "direction", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McGutterDirective.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McGutterDirective.prototype, "order", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McGutterDirective.prototype, "size", null);
    McGutterDirective = __decorate([
        Directive({
            selector: 'mc-gutter'
        }),
        __metadata("design:paramtypes", [Renderer2,
            ElementRef])
    ], McGutterDirective);
    return McGutterDirective;
}());
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
        this.setStyle("flex" /* Flex */, '1');
        if (this.splitter.direction === "vertical" /* Vertical */) {
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
        var sz = coerceNumberProperty(size);
        this.setStyle(this.getSizeProperty(), coerceCssPixelValue(sz));
    };
    McSplitterAreaDirective.prototype.getSize = function () {
        return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
    };
    McSplitterAreaDirective.prototype.getMinSize = function () {
        var styles = getComputedStyle(this.elementRef.nativeElement);
        return parseFloat(styles[this.getMinSizeProperty()]);
    };
    McSplitterAreaDirective.prototype.isVertical = function () {
        return this.splitter.direction === "vertical" /* Vertical */;
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
    McSplitterAreaDirective = __decorate([
        Directive({
            selector: 'mc-splitter-area'
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            McSplitterComponent])
    ], McSplitterAreaDirective);
    return McSplitterAreaDirective;
}());

var McSplitterModule = /** @class */ (function () {
    function McSplitterModule() {
    }
    McSplitterModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                McIconModule
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
        })
    ], McSplitterModule);
    return McSplitterModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McSplitterModule, McSplitterComponent, McGutterDirective, McSplitterAreaDirective };
//# sourceMappingURL=splitter.es5.js.map

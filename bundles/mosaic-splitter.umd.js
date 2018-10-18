/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/coercion'), require('@angular/common'), require('@ptsecurity/mosaic/icon')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/splitter', ['exports', '@angular/core', '@ptsecurity/cdk/coercion', '@angular/common', '@ptsecurity/mosaic/icon'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.splitter = {}),global.ng.core,global.ng.cdk.coercion,global.ng.common,global.ng.mosaic.icon));
}(this, (function (exports,core,coercion,common,icon) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

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
            this._disabled = coercion.coerceBooleanProperty(disabled);
        },
        enumerable: true,
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
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McSplitterComponent.prototype, "direction", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McSplitterComponent.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McSplitterComponent.prototype, "gutterSize", null);
    McSplitterComponent = __decorate([
        core.Component({
            selector: 'mc-splitter',
            preserveWhitespaces: false,
            styles: ["mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch;overflow:hidden}mc-splitter-area{overflow:hidden}mc-gutter{display:flex;flex-grow:0;flex-shrink:0;overflow:hidden;justify-content:center;align-items:center}.icon-vertical{transform:rotate(90deg)}"],
            template: "<ng-content></ng-content><ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\"><mc-gutter *ngIf=\"last === false\" [direction]=\"direction\" [disabled]=\"disabled\" [size]=\"gutterSize\" [order]=\"index * 2 + 1\" (mousedown)=\"onMouseDown($event, index, index + 1)\"><i mc-icon=\"mc-ellipsis_16\" [class.icon-vertical]=\"direction === 'vertical'\" *ngIf=\"!disabled\"></i></mc-gutter></ng-template>",
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            core.NgZone,
            core.Renderer2])
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
            this._disabled = coercion.coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "order", {
        get: function () {
            return this._order;
        },
        set: function (order) {
            this._order = coercion.coerceNumberProperty(order);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            this._size = coercion.coerceNumberProperty(size);
        },
        enumerable: true,
        configurable: true
    });
    McGutterDirective.prototype.ngOnInit = function () {
        this.setStyle("cursor" /* Cursor */, this.getCursor(this.getState()));
        this.setStyle("flex-basis" /* FlexBasis */, coercion.coerceCssPixelValue(this.size));
        this.setStyle(this.isVertical() ? "height" /* Height */ : "width" /* Width */, coercion.coerceCssPixelValue(this.size));
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
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McGutterDirective.prototype, "direction", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McGutterDirective.prototype, "disabled", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McGutterDirective.prototype, "order", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McGutterDirective.prototype, "size", null);
    McGutterDirective = __decorate([
        core.Directive({
            selector: 'mc-gutter'
        }),
        __metadata("design:paramtypes", [core.Renderer2,
            core.ElementRef])
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
        var sz = coercion.coerceNumberProperty(size);
        this.setStyle(this.getSizeProperty(), coercion.coerceCssPixelValue(sz));
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
        core.Directive({
            selector: 'mc-splitter-area'
        }),
        __metadata("design:paramtypes", [core.ElementRef,
            core.Renderer2,
            McSplitterComponent])
    ], McSplitterAreaDirective);
    return McSplitterAreaDirective;
}());

var McSplitterModule = /** @class */ (function () {
    function McSplitterModule() {
    }
    McSplitterModule = __decorate([
        core.NgModule({
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
        })
    ], McSplitterModule);
    return McSplitterModule;
}());

exports.McSplitterModule = McSplitterModule;
exports.McSplitterComponent = McSplitterComponent;
exports.McGutterDirective = McGutterDirective;
exports.McSplitterAreaDirective = McSplitterAreaDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-splitter.umd.js.map

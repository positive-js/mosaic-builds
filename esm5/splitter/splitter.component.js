/**
 * @fileoverview added by tsickle
 * Generated from: splitter.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Input, NgZone, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
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
export { Direction };
var McGutterDirective = /** @class */ (function () {
    function McGutterDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._direction = "vertical" /* Vertical */;
        this._order = 0;
        this._size = 6;
        this.dragged = false;
    }
    Object.defineProperty(McGutterDirective.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        set: /**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "order", {
        get: /**
         * @return {?}
         */
        function () {
            return this._order;
        },
        set: /**
         * @param {?} order
         * @return {?}
         */
        function (order) {
            this._order = coerceNumberProperty(order);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McGutterDirective.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            this._size = coerceNumberProperty(size);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McGutterDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setStyle("flex-basis" /* FlexBasis */, coerceCssPixelValue(this.size));
        this.setStyle(this.isVertical() ? "height" /* Height */ : "width" /* Width */, coerceCssPixelValue(this.size));
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
    McGutterDirective.prototype.isVertical = /**
     * @return {?}
     */
    function () {
        return this.direction === "vertical" /* Vertical */;
    };
    /**
     * @private
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    McGutterDirective.prototype.setStyle = /**
     * @private
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    function (property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    };
    McGutterDirective.decorators = [
        { type: Directive, args: [{
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
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    McGutterDirective.propDecorators = {
        direction: [{ type: Input }],
        order: [{ type: Input }],
        size: [{ type: Input }]
    };
    return McGutterDirective;
}());
export { McGutterDirective };
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
        get: /**
         * @return {?}
         */
        function () {
            return this._hideGutters;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hideGutters = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSplitterComponent.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        set: /**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSplitterComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            this._disabled = coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSplitterComponent.prototype, "gutterSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterSize;
        },
        set: /**
         * @param {?} gutterSize
         * @return {?}
         */
        function (gutterSize) {
            /** @type {?} */
            var size = coerceNumberProperty(gutterSize);
            this._gutterSize = size > 0 ? size : this.gutterSize;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} area
     * @return {?}
     */
    McSplitterComponent.prototype.addArea = /**
     * @param {?} area
     * @return {?}
     */
    function (area) {
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
    McSplitterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.direction) {
            this.direction = "horizontal" /* Horizontal */;
        }
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'column' : 'row');
    };
    /**
     * @param {?} event
     * @param {?} leftAreaIndex
     * @param {?} rightAreaIndex
     * @return {?}
     */
    McSplitterComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @param {?} leftAreaIndex
     * @param {?} rightAreaIndex
     * @return {?}
     */
    function (event, leftAreaIndex, rightAreaIndex) {
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
        this.areas.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var size = item.area.getSize();
            item.area.disableFlex();
            item.area.setSize(size);
        }));
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.listeners.push(_this.renderer.listen('document', 'mouseup', (/**
             * @return {?}
             */
            function () { return _this.onMouseUp(); })));
        }));
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.listeners.push(_this.renderer.listen('document', 'mousemove', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.onMouseMove(e, startPoint, leftArea, rightArea); })));
        }));
        this.isDragging = true;
    };
    /**
     * @param {?} area
     * @return {?}
     */
    McSplitterComponent.prototype.removeArea = /**
     * @param {?} area
     * @return {?}
     */
    function (area) {
        /** @type {?} */
        var indexToRemove = -1;
        this.areas.some((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) {
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
    McSplitterComponent.prototype.isVertical = /**
     * @return {?}
     */
    function () {
        return this.direction === "vertical" /* Vertical */;
    };
    /**
     * @private
     * @return {?}
     */
    McSplitterComponent.prototype.updateGutter = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.gutters.forEach((/**
         * @param {?} gutter
         * @return {?}
         */
        function (gutter) {
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
    McSplitterComponent.prototype.onMouseMove = /**
     * @private
     * @param {?} event
     * @param {?} startPoint
     * @param {?} leftArea
     * @param {?} rightArea
     * @return {?}
     */
    function (event, startPoint, leftArea, rightArea) {
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
    McSplitterComponent.prototype.onMouseUp = /**
     * @private
     * @return {?}
     */
    function () {
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
    McSplitterComponent.prototype.setStyle = /**
     * @private
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    function (property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    };
    McSplitterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-splitter',
                    exportAs: 'mcSplitter',
                    host: {
                        class: 'mc-splitter'
                    },
                    preserveWhitespaces: false,
                    template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch;overflow:hidden}.mc-splitter .mc-splitter-area{overflow:hidden}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;overflow:hidden}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}"]
                }] }
    ];
    /** @nocollapse */
    McSplitterComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    McSplitterComponent.propDecorators = {
        gutters: [{ type: ViewChildren, args: [McGutterDirective,] }],
        hideGutters: [{ type: Input }],
        direction: [{ type: Input }],
        disabled: [{ type: Input }],
        gutterSize: [{ type: Input }]
    };
    return McSplitterComponent;
}());
export { McSplitterComponent };
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
    function McSplitterAreaDirective(elementRef, renderer, splitter) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.splitter = splitter;
    }
    /**
     * @return {?}
     */
    McSplitterAreaDirective.prototype.disableFlex = /**
     * @return {?}
     */
    function () {
        this.renderer.removeStyle(this.elementRef.nativeElement, 'flex');
    };
    /**
     * @return {?}
     */
    McSplitterAreaDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.splitter.addArea(this);
        this.removeStyle("max-width" /* MaxWidth */);
        if (this.splitter.direction === "vertical" /* Vertical */) {
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
    McSplitterAreaDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.splitter.removeArea(this);
    };
    /**
     * @param {?} order
     * @return {?}
     */
    McSplitterAreaDirective.prototype.setOrder = /**
     * @param {?} order
     * @return {?}
     */
    function (order) {
        this.setStyle("order" /* Order */, order);
    };
    /**
     * @param {?} size
     * @return {?}
     */
    McSplitterAreaDirective.prototype.setSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (size) {
            /** @type {?} */
            var sz = coerceNumberProperty(size);
            this.setStyle(this.getSizeProperty(), coerceCssPixelValue(sz));
        }
    };
    /**
     * @return {?}
     */
    McSplitterAreaDirective.prototype.getSize = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
    };
    /**
     * @return {?}
     */
    McSplitterAreaDirective.prototype.getMinSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var styles = getComputedStyle(this.elementRef.nativeElement);
        return parseFloat(styles[this.getMinSizeProperty()]);
    };
    /**
     * @private
     * @return {?}
     */
    McSplitterAreaDirective.prototype.isVertical = /**
     * @private
     * @return {?}
     */
    function () {
        return this.splitter.direction === "vertical" /* Vertical */;
    };
    /**
     * @private
     * @return {?}
     */
    McSplitterAreaDirective.prototype.getMinSizeProperty = /**
     * @private
     * @return {?}
     */
    function () {
        return this.isVertical()
            ? "min-height" /* MinHeight */
            : "minWidth" /* MinWidth */;
    };
    /**
     * @private
     * @return {?}
     */
    McSplitterAreaDirective.prototype.getOffsetSizeProperty = /**
     * @private
     * @return {?}
     */
    function () {
        return this.isVertical()
            ? "offsetHeight" /* OffsetHeight */
            : "offsetWidth" /* OffsetWidth */;
    };
    /**
     * @private
     * @return {?}
     */
    McSplitterAreaDirective.prototype.getSizeProperty = /**
     * @private
     * @return {?}
     */
    function () {
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
    McSplitterAreaDirective.prototype.setStyle = /**
     * @private
     * @param {?} style
     * @param {?} value
     * @return {?}
     */
    function (style, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, style, value);
    };
    /**
     * @private
     * @param {?} style
     * @return {?}
     */
    McSplitterAreaDirective.prototype.removeStyle = /**
     * @private
     * @param {?} style
     * @return {?}
     */
    function (style) {
        this.renderer.removeStyle(this.elementRef.nativeElement, style);
    };
    McSplitterAreaDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-splitter-area]',
                    host: {
                        class: 'mc-splitter-area'
                    }
                },] }
    ];
    /** @nocollapse */
    McSplitterAreaDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: McSplitterComponent }
    ]; };
    return McSplitterAreaDirective;
}());
export { McSplitterAreaDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3NwbGl0dGVyLyIsInNvdXJjZXMiOlsic3BsaXR0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekcsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFHTixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7Ozs7QUFHdkIsb0JBS0M7OztJQUpHLHFCQUE4Qjs7SUFDOUIsc0JBQWM7O0lBQ2Qsc0JBQWM7O0lBQ2QsNEJBQW9COzs7OztBQUd4QixxQkFHQzs7O0lBRkcsbUJBQVU7O0lBQ1YsbUJBQVU7OztBQUdkLElBQVcsYUFBYTtJQUNwQixJQUFJLFFBQVM7SUFDYixTQUFTLGNBQWU7SUFDeEIsYUFBYSxrQkFBbUI7SUFDaEMsTUFBTSxVQUFXO0lBQ2pCLFFBQVEsYUFBYztJQUN0QixTQUFTLGNBQWU7SUFDeEIsUUFBUSxZQUFhO0lBQ3JCLFlBQVksZ0JBQWlCO0lBQzdCLFdBQVcsZUFBZ0I7SUFDM0IsS0FBSyxTQUFVO0lBQ2YsS0FBSyxTQUFVO0VBQ2xCOztBQUVELElBQWtCLFNBQVM7SUFDdkIsVUFBVSxjQUFlO0lBQ3pCLFFBQVEsWUFBYTtFQUN4Qjs7QUFHRDtJQTZDSSwyQkFDWSxVQUFzQixFQUN0QixRQUFtQjtRQURuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUE1QnZCLGVBQVUsNkJBQWlDO1FBVzNDLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFXbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztR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QUFFO3dCQUNGLEtBQUssRUFBRSxrQkFBa0I7cUJBQzVCO2lCQUNKOzs7O2dCQTlWRyxVQUFVO2dCQU1WLFNBQVM7Z0JBNlZhLG1CQUFtQjs7SUEyRTdDLDhCQUFDO0NBQUEsQUFyRkQsSUFxRkM7U0EvRVksdUJBQXVCOzs7Ozs7SUFFNUIsNkNBQThCOzs7OztJQUM5QiwyQ0FBMkI7Ozs7O0lBQzNCLDJDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlQ3NzUGl4ZWxWYWx1ZSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuaW50ZXJmYWNlIElBcmVhIHtcbiAgICBhcmVhOiBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIG9yZGVyOiBudW1iZXI7XG4gICAgaW5pdGlhbFNpemU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIElQb2ludCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbn1cblxuY29uc3QgZW51bSBTdHlsZVByb3BlcnR5IHtcbiAgICBGbGV4ID0gJ2ZsZXgnLFxuICAgIEZsZXhCYXNpcyA9ICdmbGV4LWJhc2lzJyxcbiAgICBGbGV4RGlyZWN0aW9uID0gJ2ZsZXgtZGlyZWN0aW9uJyxcbiAgICBIZWlnaHQgPSAnaGVpZ2h0JyxcbiAgICBNYXhXaWR0aCA9ICdtYXgtd2lkdGgnLFxuICAgIE1pbkhlaWdodCA9ICdtaW4taGVpZ2h0JyxcbiAgICBNaW5XaWR0aCA9ICdtaW5XaWR0aCcsXG4gICAgT2Zmc2V0SGVpZ2h0ID0gJ29mZnNldEhlaWdodCcsXG4gICAgT2Zmc2V0V2lkdGggPSAnb2Zmc2V0V2lkdGgnLFxuICAgIE9yZGVyID0gJ29yZGVyJyxcbiAgICBXaWR0aCA9ICd3aWR0aCdcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gRGlyZWN0aW9uIHtcbiAgICBIb3Jpem9udGFsID0gJ2hvcml6b250YWwnLFxuICAgIFZlcnRpY2FsID0gJ3ZlcnRpY2FsJ1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtZ3V0dGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZ3V0dGVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ndXR0ZXJfdmVydGljYWxdJzogJ2lzVmVydGljYWwoKScsXG4gICAgICAgICdbY2xhc3MubWMtZ3V0dGVyX2RyYWdnZWRdJzogJ2RyYWdnZWQnLFxuICAgICAgICAnKG1vdXNlZG93biknOiAnZHJhZ2dlZCA9IHRydWUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0d1dHRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZ2V0IGRpcmVjdGlvbigpOiBEaXJlY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRpcmVjdGlvbihkaXJlY3Rpb246IERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiBEaXJlY3Rpb24gPSBEaXJlY3Rpb24uVmVydGljYWw7XG5cbiAgICBnZXQgb3JkZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG9yZGVyKG9yZGVyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fb3JkZXIgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShvcmRlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3JkZXI6IG51bWJlciA9IDA7XG5cbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBzaXplKHNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zaXplID0gY29lcmNlTnVtYmVyUHJvcGVydHkoc2l6ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyID0gNjtcblxuICAgIGRyYWdnZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuRmxleEJhc2lzLCBjb2VyY2VDc3NQaXhlbFZhbHVlKHRoaXMuc2l6ZSkpO1xuICAgICAgICB0aGlzLnNldFN0eWxlKHRoaXMuaXNWZXJ0aWNhbCgpID8gU3R5bGVQcm9wZXJ0eS5IZWlnaHQgOiBTdHlsZVByb3BlcnR5LldpZHRoLCBjb2VyY2VDc3NQaXhlbFZhbHVlKHRoaXMuc2l6ZSkpO1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuT3JkZXIsIHRoaXMub3JkZXIpO1xuXG4gICAgICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5IZWlnaHQsICcxMDAlJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXggSUUgaXNzdWUgd2l0aCBndXR0ZXIgaWNvbi4gZmxleC1kaXJlY3Rpb24gaXMgcmVxdWllZCBmb3IgZmxleCBhbGlnbm1lbnQgb3B0aW9uc1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuRmxleERpcmVjdGlvbiwgdGhpcy5pc1ZlcnRpY2FsKCkgPyAncm93JyA6ICdjb2x1bW4nKTtcbiAgICB9XG5cbiAgICBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHByb3BlcnR5OiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc3BsaXR0ZXInLFxuICAgIGV4cG9ydEFzOiAnbWNTcGxpdHRlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNwbGl0dGVyJ1xuICAgIH0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgc3R5bGVVcmxzOiBbJ3NwbGl0dGVyLnNjc3MnXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc3BsaXR0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNTcGxpdHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcmVhZG9ubHkgYXJlYXM6IElBcmVhW10gPSBbXTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oTWNHdXR0ZXJEaXJlY3RpdmUpIGd1dHRlcnM6IFF1ZXJ5TGlzdDxNY0d1dHRlckRpcmVjdGl2ZT47XG5cbiAgICBwcml2YXRlIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXJlYVBvc2l0aW9uRGl2aWRlcjogbnVtYmVyID0gMjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxpc3RlbmVyczogKCgpID0+IHZvaWQpW10gPSBbXTtcblxuICAgIGdldCBoaWRlR3V0dGVycygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZGVHdXR0ZXJzO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGhpZGVHdXR0ZXJzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hpZGVHdXR0ZXJzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oaWRlR3V0dGVyczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGRpcmVjdGlvbigpOiBEaXJlY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRpcmVjdGlvbihkaXJlY3Rpb246IERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiBEaXJlY3Rpb247XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBndXR0ZXJTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndXR0ZXJTaXplO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGd1dHRlclNpemUoZ3V0dGVyU2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShndXR0ZXJTaXplKTtcbiAgICAgICAgdGhpcy5fZ3V0dGVyU2l6ZSA9IHNpemUgPiAwID8gc2l6ZSA6IHRoaXMuZ3V0dGVyU2l6ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9ndXR0ZXJTaXplOiBudW1iZXIgPSA2O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgICApIHt9XG5cbiAgICBhZGRBcmVhKGFyZWE6IE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLmFyZWFzLmxlbmd0aDtcbiAgICAgICAgY29uc3Qgb3JkZXI6IG51bWJlciA9IGluZGV4ICogdGhpcy5hcmVhUG9zaXRpb25EaXZpZGVyO1xuICAgICAgICBjb25zdCBzaXplOiBudW1iZXIgPSBhcmVhLmdldFNpemUoKTtcblxuICAgICAgICBhcmVhLnNldE9yZGVyKG9yZGVyKTtcblxuICAgICAgICB0aGlzLmFyZWFzLnB1c2goe1xuICAgICAgICAgICAgYXJlYSxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgb3JkZXIsXG4gICAgICAgICAgICBpbml0aWFsU2l6ZTogc2l6ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uSG9yaXpvbnRhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5GbGV4RGlyZWN0aW9uLCB0aGlzLmlzVmVydGljYWwoKSA/ICdjb2x1bW4nIDogJ3JvdycpO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50LCBsZWZ0QXJlYUluZGV4OiBudW1iZXIsIHJpZ2h0QXJlYUluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBsZWZ0QXJlYSA9IHRoaXMuYXJlYXNbbGVmdEFyZWFJbmRleF07XG4gICAgICAgIGNvbnN0IHJpZ2h0QXJlYSA9IHRoaXMuYXJlYXNbcmlnaHRBcmVhSW5kZXhdO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0UG9pbnQ6IElQb2ludCA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LnNjcmVlblgsXG4gICAgICAgICAgICB5OiBldmVudC5zY3JlZW5ZXG4gICAgICAgIH07XG5cbiAgICAgICAgbGVmdEFyZWEuaW5pdGlhbFNpemUgPSBsZWZ0QXJlYS5hcmVhLmdldFNpemUoKTtcbiAgICAgICAgcmlnaHRBcmVhLmluaXRpYWxTaXplID0gcmlnaHRBcmVhLmFyZWEuZ2V0U2l6ZSgpO1xuXG4gICAgICAgIHRoaXMuYXJlYXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGl0ZW0uYXJlYS5nZXRTaXplKCk7XG4gICAgICAgICAgICBpdGVtLmFyZWEuZGlzYWJsZUZsZXgoKTtcbiAgICAgICAgICAgIGl0ZW0uYXJlYS5zZXRTaXplKHNpemUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbW91c2V1cCcsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMub25Nb3VzZVVwKClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZU1vdmUoZSwgc3RhcnRQb2ludCwgbGVmdEFyZWEsIHJpZ2h0QXJlYSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHJlbW92ZUFyZWEoYXJlYTogTWNTcGxpdHRlckFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4VG9SZW1vdmU6IG51bWJlciA9IC0xO1xuXG4gICAgICAgIHRoaXMuYXJlYXMuc29tZSgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmFyZWEgPT09IGFyZWEpIHtcbiAgICAgICAgICAgICAgICBpbmRleFRvUmVtb3ZlID0gaW5kZXg7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaW5kZXhUb1JlbW92ZSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXJlYXMuc3BsaWNlKGluZGV4VG9SZW1vdmUsIDEpO1xuICAgIH1cblxuICAgIGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlR3V0dGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmd1dHRlcnMuZm9yRWFjaCgoZ3V0dGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ3V0dGVyLmRyYWdnZWQpIHtcbiAgICAgICAgICAgICAgICBndXR0ZXIuZHJhZ2dlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCwgc3RhcnRQb2ludDogSVBvaW50LCBsZWZ0QXJlYTogSUFyZWEsIHJpZ2h0QXJlYTogSUFyZWEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcgfHwgdGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBlbmRQb2ludDogSVBvaW50ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuc2NyZWVuWCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnNjcmVlbllcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmlzVmVydGljYWwoKVxuICAgICAgICAgICAgPyBzdGFydFBvaW50LnkgLSBlbmRQb2ludC55XG4gICAgICAgICAgICA6IHN0YXJ0UG9pbnQueCAtIGVuZFBvaW50Lng7XG5cbiAgICAgICAgY29uc3QgbmV3TGVmdEFyZWFTaXplID0gbGVmdEFyZWEuaW5pdGlhbFNpemUgLSBvZmZzZXQ7XG4gICAgICAgIGNvbnN0IG5ld1JpZ2h0QXJlYVNpemUgPSByaWdodEFyZWEuaW5pdGlhbFNpemUgKyBvZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgbWluTGVmdEFyZWFTaXplID0gbGVmdEFyZWEuYXJlYS5nZXRNaW5TaXplKCk7XG4gICAgICAgIGNvbnN0IG1pblJpZ2h0QXJlYVNpemUgPSByaWdodEFyZWEuYXJlYS5nZXRNaW5TaXplKCk7XG5cbiAgICAgICAgaWYgKG5ld0xlZnRBcmVhU2l6ZSA8PSBtaW5MZWZ0QXJlYVNpemUgfHwgbmV3UmlnaHRBcmVhU2l6ZSA8PSBtaW5SaWdodEFyZWFTaXplKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAobmV3TGVmdEFyZWFTaXplIDw9IDApIHtcbiAgICAgICAgICAgIGxlZnRBcmVhLmFyZWEuc2V0U2l6ZSgwKTtcbiAgICAgICAgICAgIHJpZ2h0QXJlYS5hcmVhLnNldFNpemUocmlnaHRBcmVhLmluaXRpYWxTaXplICsgbGVmdEFyZWEuaW5pdGlhbFNpemUpO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1JpZ2h0QXJlYVNpemUgPD0gMCkge1xuICAgICAgICAgICAgbGVmdEFyZWEuYXJlYS5zZXRTaXplKHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSArIGxlZnRBcmVhLmluaXRpYWxTaXplKTtcbiAgICAgICAgICAgIHJpZ2h0QXJlYS5hcmVhLnNldFNpemUoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZWZ0QXJlYS5hcmVhLnNldFNpemUobmV3TGVmdEFyZWFTaXplKTtcbiAgICAgICAgICAgIHJpZ2h0QXJlYS5hcmVhLnNldFNpemUobmV3UmlnaHRBcmVhU2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTW91c2VVcCgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMubGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gdGhpcy5saXN0ZW5lcnMucG9wKCk7XG5cbiAgICAgICAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUd1dHRlcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3R5bGUocHJvcGVydHk6IFN0eWxlUHJvcGVydHksIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcHJvcGVydHksIHZhbHVlKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLXNwbGl0dGVyLWFyZWFdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc3BsaXR0ZXItYXJlYSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBzcGxpdHRlcjogTWNTcGxpdHRlckNvbXBvbmVudFxuICAgICkge31cblxuICAgIGRpc2FibGVGbGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleCcpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNwbGl0dGVyLmFkZEFyZWEodGhpcyk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVTdHlsZShTdHlsZVByb3BlcnR5Lk1heFdpZHRoKTtcblxuICAgICAgICBpZiAodGhpcy5zcGxpdHRlci5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LldpZHRoLCAnMTAwJScpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdHlsZShTdHlsZVByb3BlcnR5LkhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuSGVpZ2h0LCAnMTAwJScpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdHlsZShTdHlsZVByb3BlcnR5LldpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNwbGl0dGVyLnJlbW92ZUFyZWEodGhpcyk7XG4gICAgfVxuXG4gICAgc2V0T3JkZXIob3JkZXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuT3JkZXIsIG9yZGVyKTtcbiAgICB9XG5cbiAgICBzZXRTaXplKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3ogPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShzaXplKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5nZXRTaXplUHJvcGVydHkoKSwgY29lcmNlQ3NzUGl4ZWxWYWx1ZShzeikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbdGhpcy5nZXRPZmZzZXRTaXplUHJvcGVydHkoKV07XG4gICAgfVxuXG4gICAgZ2V0TWluU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZXNbdGhpcy5nZXRNaW5TaXplUHJvcGVydHkoKV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaXR0ZXIuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNaW5TaXplUHJvcGVydHkoKTogU3R5bGVQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKVxuICAgICAgICAgICAgPyBTdHlsZVByb3BlcnR5Lk1pbkhlaWdodFxuICAgICAgICAgICAgOiBTdHlsZVByb3BlcnR5Lk1pbldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T2Zmc2V0U2l6ZVByb3BlcnR5KCk6IFN0eWxlUHJvcGVydHkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKClcbiAgICAgICAgICAgID8gU3R5bGVQcm9wZXJ0eS5PZmZzZXRIZWlnaHRcbiAgICAgICAgICAgIDogU3R5bGVQcm9wZXJ0eS5PZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNpemVQcm9wZXJ0eSgpOiBTdHlsZVByb3BlcnR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpXG4gICAgICAgICAgICA/IFN0eWxlUHJvcGVydHkuSGVpZ2h0XG4gICAgICAgICAgICA6IFN0eWxlUHJvcGVydHkuV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTdHlsZShzdHlsZTogU3R5bGVQcm9wZXJ0eSwgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzdHlsZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlU3R5bGUoc3R5bGU6IFN0eWxlUHJvcGVydHkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgc3R5bGUpO1xuICAgIH1cbn1cbiJdfQ==
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
        this._direction = Direction.Vertical;
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
        return this.direction === Direction.Vertical;
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
        return this.direction === Direction.Vertical;
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
        return this.splitter.direction === Direction.Vertical;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3NwbGl0dGVyLyIsInNvdXJjZXMiOlsic3BsaXR0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekcsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFHTixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7Ozs7QUFHdkIsb0JBS0M7OztJQUpHLHFCQUE4Qjs7SUFDOUIsc0JBQWM7O0lBQ2Qsc0JBQWM7O0lBQ2QsNEJBQW9COzs7OztBQUd4QixxQkFHQzs7O0lBRkcsbUJBQVU7O0lBQ1YsbUJBQVU7OztBQUdkLElBQVcsYUFBYTtJQUNwQixJQUFJLFFBQVM7SUFDYixTQUFTLGNBQWU7SUFDeEIsYUFBYSxrQkFBbUI7SUFDaEMsTUFBTSxVQUFXO0lBQ2pCLFFBQVEsYUFBYztJQUN0QixTQUFTLGNBQWU7SUFDeEIsUUFBUSxZQUFhO0lBQ3JCLFlBQVksZ0JBQWlCO0lBQzdCLFdBQVcsZUFBZ0I7SUFDM0IsS0FBSyxTQUFVO0lBQ2YsS0FBSyxTQUFVO0VBQ2xCOztBQUVELElBQVksU0FBUztJQUNqQixVQUFVLGNBQWU7SUFDekIsUUFBUSxZQUFhO0VBQ3hCOztBQUdEO0lBNkNJLDJCQUNZLFVBQXNCLEVBQ3RCLFFBQW1CO1FBRG5CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTVCdkIsZUFBVSxHQUFjLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFXM0MsV0FBTSxHQUFXLENBQUMsQ0FBQztRQVduQixVQUFL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RSxLQUFLLENBQUMsQ0FBQztJQUNwRSxDQUFDOztnQkFwRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsa0JBQWtCO3FCQUM1QjtpQkFDSjs7OztnQkE5VkcsVUFBVTtnQkFNVixTQUFTO2dCQTZWYSxtQkFBbUI7O0lBMkU3Qyw4QkFBQztDQUFBLEFBckZELElBcUZDO1NBL0VZLHVCQUF1Qjs7Ozs7O0lBRTVCLDZDQUE4Qjs7Ozs7SUFDOUIsMkNBQTJCOzs7OztJQUMzQiwyQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZUNzc1BpeGVsVmFsdWUsIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVmlld0NoaWxkcmVuLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmludGVyZmFjZSBJQXJlYSB7XG4gICAgYXJlYTogTWNTcGxpdHRlckFyZWFEaXJlY3RpdmU7XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgICBvcmRlcjogbnVtYmVyO1xuICAgIGluaXRpYWxTaXplOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBJUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG59XG5cbmNvbnN0IGVudW0gU3R5bGVQcm9wZXJ0eSB7XG4gICAgRmxleCA9ICdmbGV4JyxcbiAgICBGbGV4QmFzaXMgPSAnZmxleC1iYXNpcycsXG4gICAgRmxleERpcmVjdGlvbiA9ICdmbGV4LWRpcmVjdGlvbicsXG4gICAgSGVpZ2h0ID0gJ2hlaWdodCcsXG4gICAgTWF4V2lkdGggPSAnbWF4LXdpZHRoJyxcbiAgICBNaW5IZWlnaHQgPSAnbWluLWhlaWdodCcsXG4gICAgTWluV2lkdGggPSAnbWluV2lkdGgnLFxuICAgIE9mZnNldEhlaWdodCA9ICdvZmZzZXRIZWlnaHQnLFxuICAgIE9mZnNldFdpZHRoID0gJ29mZnNldFdpZHRoJyxcbiAgICBPcmRlciA9ICdvcmRlcicsXG4gICAgV2lkdGggPSAnd2lkdGgnXG59XG5cbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XG4gICAgSG9yaXpvbnRhbCA9ICdob3Jpem9udGFsJyxcbiAgICBWZXJ0aWNhbCA9ICd2ZXJ0aWNhbCdcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLWd1dHRlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWd1dHRlcicsXG4gICAgICAgICdbY2xhc3MubWMtZ3V0dGVyX3ZlcnRpY2FsXSc6ICdpc1ZlcnRpY2FsKCknLFxuICAgICAgICAnW2NsYXNzLm1jLWd1dHRlcl9kcmFnZ2VkXSc6ICdkcmFnZ2VkJyxcbiAgICAgICAgJyhtb3VzZWRvd24pJzogJ2RyYWdnZWQgPSB0cnVlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNHdXR0ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGdldCBkaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOiBEaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogRGlyZWN0aW9uID0gRGlyZWN0aW9uLlZlcnRpY2FsO1xuXG4gICAgZ2V0IG9yZGVyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBvcmRlcihvcmRlcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX29yZGVyID0gY29lcmNlTnVtYmVyUHJvcGVydHkob3JkZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29yZGVyOiBudW1iZXIgPSAwO1xuXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHNpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NpemU6IG51bWJlciA9IDY7XG5cbiAgICBkcmFnZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkZsZXhCYXNpcywgY29lcmNlQ3NzUGl4ZWxWYWx1ZSh0aGlzLnNpemUpKTtcbiAgICAgICAgdGhpcy5zZXRTdHlsZSh0aGlzLmlzVmVydGljYWwoKSA/IFN0eWxlUHJvcGVydHkuSGVpZ2h0IDogU3R5bGVQcm9wZXJ0eS5XaWR0aCwgY29lcmNlQ3NzUGl4ZWxWYWx1ZSh0aGlzLnNpemUpKTtcbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5Lk9yZGVyLCB0aGlzLm9yZGVyKTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuSGVpZ2h0LCAnMTAwJScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZml4IElFIGlzc3VlIHdpdGggZ3V0dGVyIGljb24uIGZsZXgtZGlyZWN0aW9uIGlzIHJlcXVpZWQgZm9yIGZsZXggYWxpZ25tZW50IG9wdGlvbnNcbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkZsZXhEaXJlY3Rpb24sIHRoaXMuaXNWZXJ0aWNhbCgpID8gJ3JvdycgOiAnY29sdW1uJyk7XG4gICAgfVxuXG4gICAgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTdHlsZShwcm9wZXJ0eTogU3R5bGVQcm9wZXJ0eSwgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXNwbGl0dGVyJyxcbiAgICBleHBvcnRBczogJ21jU3BsaXR0ZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zcGxpdHRlcidcbiAgICB9LFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIHN0eWxlVXJsczogWydzcGxpdHRlci5zY3NzJ10sXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NwbGl0dGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jU3BsaXR0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHJlYWRvbmx5IGFyZWFzOiBJQXJlYVtdID0gW107XG5cbiAgICBAVmlld0NoaWxkcmVuKE1jR3V0dGVyRGlyZWN0aXZlKSBndXR0ZXJzOiBRdWVyeUxpc3Q8TWNHdXR0ZXJEaXJlY3RpdmU+O1xuXG4gICAgcHJpdmF0ZSBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGFyZWFQb3NpdGlvbkRpdmlkZXI6IG51bWJlciA9IDI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsaXN0ZW5lcnM6ICgoKSA9PiB2b2lkKVtdID0gW107XG5cbiAgICBnZXQgaGlkZUd1dHRlcnMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaWRlR3V0dGVycztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBoaWRlR3V0dGVycyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oaWRlR3V0dGVycyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGlkZUd1dHRlcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBkaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOiBEaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogRGlyZWN0aW9uO1xuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgZ3V0dGVyU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU2l6ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBndXR0ZXJTaXplKGd1dHRlclNpemU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBzaXplID0gY29lcmNlTnVtYmVyUHJvcGVydHkoZ3V0dGVyU2l6ZSk7XG4gICAgICAgIHRoaXMuX2d1dHRlclNpemUgPSBzaXplID4gMCA/IHNpemUgOiB0aGlzLmd1dHRlclNpemU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ3V0dGVyU2l6ZTogbnVtYmVyID0gNjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgYWRkQXJlYShhcmVhOiBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5hcmVhcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG9yZGVyOiBudW1iZXIgPSBpbmRleCAqIHRoaXMuYXJlYVBvc2l0aW9uRGl2aWRlcjtcbiAgICAgICAgY29uc3Qgc2l6ZTogbnVtYmVyID0gYXJlYS5nZXRTaXplKCk7XG5cbiAgICAgICAgYXJlYS5zZXRPcmRlcihvcmRlcik7XG5cbiAgICAgICAgdGhpcy5hcmVhcy5wdXNoKHtcbiAgICAgICAgICAgIGFyZWEsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIG9yZGVyLFxuICAgICAgICAgICAgaW5pdGlhbFNpemU6IHNpemVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkhvcml6b250YWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuRmxleERpcmVjdGlvbiwgdGhpcy5pc1ZlcnRpY2FsKCkgPyAnY29sdW1uJyA6ICdyb3cnKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCwgbGVmdEFyZWFJbmRleDogbnVtYmVyLCByaWdodEFyZWFJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgbGVmdEFyZWEgPSB0aGlzLmFyZWFzW2xlZnRBcmVhSW5kZXhdO1xuICAgICAgICBjb25zdCByaWdodEFyZWEgPSB0aGlzLmFyZWFzW3JpZ2h0QXJlYUluZGV4XTtcblxuICAgICAgICBjb25zdCBzdGFydFBvaW50OiBJUG9pbnQgPSB7XG4gICAgICAgICAgICB4OiBldmVudC5zY3JlZW5YLFxuICAgICAgICAgICAgeTogZXZlbnQuc2NyZWVuWVxuICAgICAgICB9O1xuXG4gICAgICAgIGxlZnRBcmVhLmluaXRpYWxTaXplID0gbGVmdEFyZWEuYXJlYS5nZXRTaXplKCk7XG4gICAgICAgIHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSA9IHJpZ2h0QXJlYS5hcmVhLmdldFNpemUoKTtcblxuICAgICAgICB0aGlzLmFyZWFzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBpdGVtLmFyZWEuZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgaXRlbS5hcmVhLmRpc2FibGVGbGV4KCk7XG4gICAgICAgICAgICBpdGVtLmFyZWEuc2V0U2l6ZShzaXplKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgJ21vdXNldXAnLFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm9uTW91c2VVcCgpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgJ21vdXNlbW92ZScsXG4gICAgICAgICAgICAgICAgICAgIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm9uTW91c2VNb3ZlKGUsIHN0YXJ0UG9pbnQsIGxlZnRBcmVhLCByaWdodEFyZWEpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVBcmVhKGFyZWE6IE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleFRvUmVtb3ZlOiBudW1iZXIgPSAtMTtcblxuICAgICAgICB0aGlzLmFyZWFzLnNvbWUoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5hcmVhID09PSBhcmVhKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhUb1JlbW92ZSA9IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFyZWFzLnNwbGljZShpbmRleFRvUmVtb3ZlLCAxKTtcbiAgICB9XG5cbiAgICBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUd1dHRlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ndXR0ZXJzLmZvckVhY2goKGd1dHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGd1dHRlci5kcmFnZ2VkKSB7XG4gICAgICAgICAgICAgICAgZ3V0dGVyLmRyYWdnZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIHN0YXJ0UG9pbnQ6IElQb2ludCwgbGVmdEFyZWE6IElBcmVhLCByaWdodEFyZWE6IElBcmVhKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0RyYWdnaW5nIHx8IHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgZW5kUG9pbnQ6IElQb2ludCA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LnNjcmVlblgsXG4gICAgICAgICAgICB5OiBldmVudC5zY3JlZW5ZXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5pc1ZlcnRpY2FsKClcbiAgICAgICAgICAgID8gc3RhcnRQb2ludC55IC0gZW5kUG9pbnQueVxuICAgICAgICAgICAgOiBzdGFydFBvaW50LnggLSBlbmRQb2ludC54O1xuXG4gICAgICAgIGNvbnN0IG5ld0xlZnRBcmVhU2l6ZSA9IGxlZnRBcmVhLmluaXRpYWxTaXplIC0gb2Zmc2V0O1xuICAgICAgICBjb25zdCBuZXdSaWdodEFyZWFTaXplID0gcmlnaHRBcmVhLmluaXRpYWxTaXplICsgb2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IG1pbkxlZnRBcmVhU2l6ZSA9IGxlZnRBcmVhLmFyZWEuZ2V0TWluU2l6ZSgpO1xuICAgICAgICBjb25zdCBtaW5SaWdodEFyZWFTaXplID0gcmlnaHRBcmVhLmFyZWEuZ2V0TWluU2l6ZSgpO1xuXG4gICAgICAgIGlmIChuZXdMZWZ0QXJlYVNpemUgPD0gbWluTGVmdEFyZWFTaXplIHx8IG5ld1JpZ2h0QXJlYVNpemUgPD0gbWluUmlnaHRBcmVhU2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld0xlZnRBcmVhU2l6ZSA8PSAwKSB7XG4gICAgICAgICAgICBsZWZ0QXJlYS5hcmVhLnNldFNpemUoMCk7XG4gICAgICAgICAgICByaWdodEFyZWEuYXJlYS5zZXRTaXplKHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSArIGxlZnRBcmVhLmluaXRpYWxTaXplKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdSaWdodEFyZWFTaXplIDw9IDApIHtcbiAgICAgICAgICAgIGxlZnRBcmVhLmFyZWEuc2V0U2l6ZShyaWdodEFyZWEuaW5pdGlhbFNpemUgKyBsZWZ0QXJlYS5pbml0aWFsU2l6ZSk7XG4gICAgICAgICAgICByaWdodEFyZWEuYXJlYS5zZXRTaXplKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVmdEFyZWEuYXJlYS5zZXRTaXplKG5ld0xlZnRBcmVhU2l6ZSk7XG4gICAgICAgICAgICByaWdodEFyZWEuYXJlYS5zZXRTaXplKG5ld1JpZ2h0QXJlYVNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1vdXNlVXAoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLmxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IHRoaXMubGlzdGVuZXJzLnBvcCgpO1xuXG4gICAgICAgICAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy51cGRhdGVHdXR0ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHByb3BlcnR5OiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1zcGxpdHRlci1hcmVhXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNwbGl0dGVyLWFyZWEnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgc3BsaXR0ZXI6IE1jU3BsaXR0ZXJDb21wb25lbnRcbiAgICApIHt9XG5cbiAgICBkaXNhYmxlRmxleCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgnKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGxpdHRlci5hZGRBcmVhKHRoaXMpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlU3R5bGUoU3R5bGVQcm9wZXJ0eS5NYXhXaWR0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3BsaXR0ZXIuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5XaWR0aCwgJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3R5bGUoU3R5bGVQcm9wZXJ0eS5IZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkhlaWdodCwgJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3R5bGUoU3R5bGVQcm9wZXJ0eS5XaWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGxpdHRlci5yZW1vdmVBcmVhKHRoaXMpO1xuICAgIH1cblxuICAgIHNldE9yZGVyKG9yZGVyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5Lk9yZGVyLCBvcmRlcik7XG4gICAgfVxuXG4gICAgc2V0U2l6ZShzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN6ID0gY29lcmNlTnVtYmVyUHJvcGVydHkoc2l6ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKHRoaXMuZ2V0U2l6ZVByb3BlcnR5KCksIGNvZXJjZUNzc1BpeGVsVmFsdWUoc3opKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RoaXMuZ2V0T2Zmc2V0U2l6ZVByb3BlcnR5KCldO1xuICAgIH1cblxuICAgIGdldE1pblNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGVzW3RoaXMuZ2V0TWluU2l6ZVByb3BlcnR5KCldKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGl0dGVyLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TWluU2l6ZVByb3BlcnR5KCk6IFN0eWxlUHJvcGVydHkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKClcbiAgICAgICAgICAgID8gU3R5bGVQcm9wZXJ0eS5NaW5IZWlnaHRcbiAgICAgICAgICAgIDogU3R5bGVQcm9wZXJ0eS5NaW5XaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE9mZnNldFNpemVQcm9wZXJ0eSgpOiBTdHlsZVByb3BlcnR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpXG4gICAgICAgICAgICA/IFN0eWxlUHJvcGVydHkuT2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICA6IFN0eWxlUHJvcGVydHkuT2Zmc2V0V2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTaXplUHJvcGVydHkoKTogU3R5bGVQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKVxuICAgICAgICAgICAgPyBTdHlsZVByb3BlcnR5LkhlaWdodFxuICAgICAgICAgICAgOiBTdHlsZVByb3BlcnR5LldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3R5bGUoc3R5bGU6IFN0eWxlUHJvcGVydHksIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgc3R5bGUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVN0eWxlKHN0eWxlOiBTdHlsZVByb3BlcnR5KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHN0eWxlKTtcbiAgICB9XG59XG4iXX0=
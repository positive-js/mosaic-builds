/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Input, NgZone, Renderer2, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        this._disabled = false;
        this._gutterSize = 6;
    }
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
            /** @type {?} */
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
                    styles: [".mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch;overflow:hidden}.mc-splitter .mc-splitter-area{overflow:hidden}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;overflow:hidden}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}"],
                    template: "<ng-content></ng-content><ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\"><mc-gutter *ngIf=\"last === false\" [class.mc-gutter_vertical]=\"isVertical()\" [direction]=\"direction\" [attr.disabled]=\"disabled || null\" [size]=\"gutterSize\" [order]=\"index * 2 + 1\" (mousedown)=\"onMouseDown($event, index, index + 1)\"><i mc-icon=\"mc-ellipsis_16\" color=\"second\" *ngIf=\"!disabled\"></i></mc-gutter></ng-template>",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McSplitterComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    McSplitterComponent.propDecorators = {
        direction: [{ type: Input }],
        disabled: [{ type: Input }],
        gutterSize: [{ type: Input }]
    };
    return McSplitterComponent;
}());
var McGutterDirective = /** @class */ (function () {
    function McGutterDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._direction = "vertical" /* Vertical */;
        this._order = 0;
        this._size = 6;
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
     * @private
     * @return {?}
     */
    McGutterDirective.prototype.isVertical = /**
     * @private
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
                        class: 'mc-gutter'
                    }
                },] },
    ];
    /** @nocollapse */
    McGutterDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    McGutterDirective.propDecorators = {
        direction: [{ type: Input }],
        order: [{ type: Input }],
        size: [{ type: Input }]
    };
    return McGutterDirective;
}());
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
                },] },
    ];
    /** @nocollapse */
    McSplitterAreaDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: McSplitterComponent }
    ]; };
    return McSplitterAreaDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McSplitterModule = /** @class */ (function () {
    function McSplitterModule() {
    }
    McSplitterModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    return McSplitterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McSplitterModule, McSplitterComponent, McGutterDirective, McSplitterAreaDirective };
//# sourceMappingURL=splitter.es5.js.map

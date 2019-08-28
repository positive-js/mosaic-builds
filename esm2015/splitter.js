/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Input, NgZone, Renderer2, ViewChildren, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McGutterDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._direction = "vertical" /* Vertical */;
        this._order = 0;
        this._size = 6;
        this.dragged = false;
    }
    /**
     * @return {?}
     */
    get direction() {
        return this._direction;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    set direction(direction) {
        this._direction = direction;
    }
    /**
     * @return {?}
     */
    get order() {
        return this._order;
    }
    /**
     * @param {?} order
     * @return {?}
     */
    set order(order) {
        this._order = coerceNumberProperty(order);
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set size(size) {
        this._size = coerceNumberProperty(size);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setStyle("flex-basis" /* FlexBasis */, coerceCssPixelValue(this.size));
        this.setStyle(this.isVertical() ? "height" /* Height */ : "width" /* Width */, coerceCssPixelValue(this.size));
        this.setStyle("order" /* Order */, this.order);
        if (!this.isVertical()) {
            this.setStyle("height" /* Height */, '100%');
        }
        // fix IE issue with gutter icon. flex-direction is requied for flex alignment options
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'row' : 'column');
    }
    /**
     * @return {?}
     */
    isVertical() {
        return this.direction === "vertical" /* Vertical */;
    }
    /**
     * @private
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    setStyle(property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    }
}
McGutterDirective.decorators = [
    { type: Directive, args: [{
                selector: 'mc-gutter',
                host: {
                    class: 'mc-gutter',
                    '[class.mc-gutter_vertical]': 'isVertical()',
                    '[class.mc-gutter_dragged]': 'dragged',
                    '(mousedown)': 'dragged = true'
                }
            },] },
];
/** @nocollapse */
McGutterDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
McGutterDirective.propDecorators = {
    direction: [{ type: Input }],
    order: [{ type: Input }],
    size: [{ type: Input }]
};
class McSplitterComponent {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} ngZone
     * @param {?} renderer
     */
    constructor(elementRef, changeDetectorRef, ngZone, renderer) {
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
    /**
     * @return {?}
     */
    get hideGutters() {
        return this._hideGutters;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hideGutters(value) {
        this._hideGutters = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get direction() {
        return this._direction;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    set direction(direction) {
        this._direction = direction;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        this._disabled = coerceBooleanProperty(disabled);
    }
    /**
     * @return {?}
     */
    get gutterSize() {
        return this._gutterSize;
    }
    /**
     * @param {?} gutterSize
     * @return {?}
     */
    set gutterSize(gutterSize) {
        /** @type {?} */
        const size = coerceNumberProperty(gutterSize);
        this._gutterSize = size > 0 ? size : this.gutterSize;
    }
    /**
     * @param {?} area
     * @return {?}
     */
    addArea(area) {
        /** @type {?} */
        const index = this.areas.length;
        /** @type {?} */
        const order = index * this.areaPositionDivider;
        /** @type {?} */
        const size = area.getSize();
        area.setOrder(order);
        this.areas.push({
            area,
            index,
            order,
            initialSize: size
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.direction) {
            this.direction = "horizontal" /* Horizontal */;
        }
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'column' : 'row');
    }
    /**
     * @param {?} event
     * @param {?} leftAreaIndex
     * @param {?} rightAreaIndex
     * @return {?}
     */
    onMouseDown(event, leftAreaIndex, rightAreaIndex) {
        if (this.disabled) {
            return;
        }
        event.preventDefault();
        /** @type {?} */
        const leftArea = this.areas[leftAreaIndex];
        /** @type {?} */
        const rightArea = this.areas[rightAreaIndex];
        /** @type {?} */
        const startPoint = {
            x: event.screenX,
            y: event.screenY
        };
        leftArea.initialSize = leftArea.area.getSize();
        rightArea.initialSize = rightArea.area.getSize();
        this.areas.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const size = item.area.getSize();
            item.area.disableFlex();
            item.area.setSize(size);
        }));
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.listeners.push(this.renderer.listen('document', 'mouseup', (/**
             * @return {?}
             */
            () => this.onMouseUp())));
        }));
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.listeners.push(this.renderer.listen('document', 'mousemove', (/**
             * @param {?} e
             * @return {?}
             */
            (e) => this.onMouseMove(e, startPoint, leftArea, rightArea))));
        }));
        this.isDragging = true;
    }
    /**
     * @param {?} area
     * @return {?}
     */
    removeArea(area) {
        /** @type {?} */
        let indexToRemove = -1;
        this.areas.some((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
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
    }
    /**
     * @return {?}
     */
    isVertical() {
        return this.direction === "vertical" /* Vertical */;
    }
    /**
     * @private
     * @return {?}
     */
    updateGutter() {
        this.gutters.forEach((/**
         * @param {?} gutter
         * @return {?}
         */
        (gutter) => {
            if (gutter.dragged) {
                gutter.dragged = false;
                this.changeDetectorRef.detectChanges();
            }
        }));
    }
    /**
     * @private
     * @param {?} event
     * @param {?} startPoint
     * @param {?} leftArea
     * @param {?} rightArea
     * @return {?}
     */
    onMouseMove(event, startPoint, leftArea, rightArea) {
        if (!this.isDragging || this.disabled) {
            return;
        }
        /** @type {?} */
        const endPoint = {
            x: event.screenX,
            y: event.screenY
        };
        /** @type {?} */
        const offset = this.isVertical()
            ? startPoint.y - endPoint.y
            : startPoint.x - endPoint.x;
        /** @type {?} */
        const newLeftAreaSize = leftArea.initialSize - offset;
        /** @type {?} */
        const newRightAreaSize = rightArea.initialSize + offset;
        /** @type {?} */
        const minLeftAreaSize = leftArea.area.getMinSize();
        /** @type {?} */
        const minRightAreaSize = rightArea.area.getMinSize();
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
    }
    /**
     * @private
     * @return {?}
     */
    onMouseUp() {
        while (this.listeners.length > 0) {
            /** @type {?} */
            const unsubscribe = this.listeners.pop();
            if (unsubscribe) {
                unsubscribe();
            }
        }
        this.isDragging = false;
        this.updateGutter();
    }
    /**
     * @private
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    setStyle(property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    }
}
McSplitterComponent.decorators = [
    { type: Component, args: [{
                selector: 'mc-splitter',
                exportAs: 'mcSplitter',
                host: {
                    class: 'mc-splitter'
                },
                preserveWhitespaces: false,
                styles: [".mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch;overflow:hidden}.mc-splitter .mc-splitter-area{overflow:hidden}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;overflow:hidden}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}"],
                template: "<ng-content></ng-content><ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\"><mc-gutter *ngIf=\"last === false\" [direction]=\"direction\" [attr.disabled]=\"disabled || null\" [style.display]=\"hideGutters ? 'none' : 'flex'\" [size]=\"gutterSize\" [order]=\"index * 2 + 1\" (mousedown)=\"onMouseDown($event, index, index + 1)\"></mc-gutter></ng-template>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
McSplitterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: Renderer2 }
];
McSplitterComponent.propDecorators = {
    gutters: [{ type: ViewChildren, args: [McGutterDirective,] }],
    hideGutters: [{ type: Input }],
    direction: [{ type: Input }],
    disabled: [{ type: Input }],
    gutterSize: [{ type: Input }]
};
class McSplitterAreaDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} splitter
     */
    constructor(elementRef, renderer, splitter) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.splitter = splitter;
    }
    /**
     * @return {?}
     */
    disableFlex() {
        this.renderer.removeStyle(this.elementRef.nativeElement, 'flex');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.splitter.removeArea(this);
    }
    /**
     * @param {?} order
     * @return {?}
     */
    setOrder(order) {
        this.setStyle("order" /* Order */, order);
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setSize(size) {
        if (size) {
            /** @type {?} */
            const sz = coerceNumberProperty(size);
            this.setStyle(this.getSizeProperty(), coerceCssPixelValue(sz));
        }
    }
    /**
     * @return {?}
     */
    getSize() {
        return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
    }
    /**
     * @return {?}
     */
    getMinSize() {
        /** @type {?} */
        const styles = getComputedStyle(this.elementRef.nativeElement);
        return parseFloat(styles[this.getMinSizeProperty()]);
    }
    /**
     * @private
     * @return {?}
     */
    isVertical() {
        return this.splitter.direction === "vertical" /* Vertical */;
    }
    /**
     * @private
     * @return {?}
     */
    getMinSizeProperty() {
        return this.isVertical()
            ? "min-height" /* MinHeight */
            : "minWidth" /* MinWidth */;
    }
    /**
     * @private
     * @return {?}
     */
    getOffsetSizeProperty() {
        return this.isVertical()
            ? "offsetHeight" /* OffsetHeight */
            : "offsetWidth" /* OffsetWidth */;
    }
    /**
     * @private
     * @return {?}
     */
    getSizeProperty() {
        return this.isVertical()
            ? "height" /* Height */
            : "width" /* Width */;
    }
    /**
     * @private
     * @param {?} style
     * @param {?} value
     * @return {?}
     */
    setStyle(style, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, style, value);
    }
    /**
     * @private
     * @param {?} style
     * @return {?}
     */
    removeStyle(style) {
        this.renderer.removeStyle(this.elementRef.nativeElement, style);
    }
}
McSplitterAreaDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mc-splitter-area]',
                host: {
                    class: 'mc-splitter-area'
                }
            },] },
];
/** @nocollapse */
McSplitterAreaDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: McSplitterComponent }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McSplitterModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McSplitterModule, McGutterDirective, McSplitterComponent, McSplitterAreaDirective };
//# sourceMappingURL=splitter.js.map

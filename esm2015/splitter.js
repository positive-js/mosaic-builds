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

let McSplitterComponent = class McSplitterComponent {
    constructor(elementRef, ngZone, renderer) {
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
    set direction(direction) {
        this._direction = direction;
    }
    get direction() {
        return this._direction;
    }
    set disabled(disabled) {
        this._disabled = coerceBooleanProperty(disabled);
    }
    get disabled() {
        return this._disabled;
    }
    set gutterSize(gutterSize) {
        const size = coerceNumberProperty(gutterSize);
        this._gutterSize = size > 0 ? size : this.gutterSize;
    }
    get gutterSize() {
        return this._gutterSize;
    }
    addArea(area) {
        const index = this.areas.length;
        const order = index * this.areaPositionDivider;
        const size = area.getSize();
        area.setOrder(order);
        this.areas.push({
            area,
            index,
            order,
            initialSize: size
        });
    }
    ngOnInit() {
        if (!this.direction) {
            this.direction = "horizontal" /* Horizontal */;
        }
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'column' : 'row');
    }
    onMouseDown(event, leftAreaIndex, rightAreaIndex) {
        if (this.disabled) {
            return;
        }
        const leftArea = this.areas[leftAreaIndex];
        const rightArea = this.areas[rightAreaIndex];
        const startPoint = {
            x: event.screenX,
            y: event.screenY
        };
        leftArea.initialSize = leftArea.area.getSize();
        rightArea.initialSize = rightArea.area.getSize();
        this.areas.forEach((item) => {
            const size = item.area.getSize();
            item.area.disableFlex();
            item.area.setSize(size);
        });
        this.ngZone.runOutsideAngular(() => {
            this.listeners.push(this.renderer.listen('document', 'mouseup', () => this.onMouseUp()));
        });
        this.ngZone.runOutsideAngular(() => {
            this.listeners.push(this.renderer.listen('document', 'mousemove', (e) => this.onMouseMove(e, startPoint, leftArea, rightArea)));
        });
        this.isDragging = true;
    }
    removeArea(area) {
        let indexToRemove = -1;
        this.areas.some((item, index) => {
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
    }
    isVertical() {
        return this.direction === "vertical" /* Vertical */;
    }
    onMouseMove(event, startPoint, leftArea, rightArea) {
        if (!this.isDragging || this.disabled) {
            return;
        }
        const endPoint = {
            x: event.screenX,
            y: event.screenY
        };
        const offset = this.isVertical()
            ? startPoint.y - endPoint.y
            : startPoint.x - endPoint.x;
        const newLeftAreaSize = leftArea.initialSize - offset;
        const newRightAreaSize = rightArea.initialSize + offset;
        const minLeftAreaSize = leftArea.area.getMinSize();
        const minRightAreaSize = rightArea.area.getMinSize();
        if (newLeftAreaSize <= minLeftAreaSize || newRightAreaSize <= minRightAreaSize) {
            const rightAreaOffset = leftArea.initialSize - minLeftAreaSize;
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
    }
    onMouseUp() {
        while (this.listeners.length > 0) {
            const unsubscribe = this.listeners.pop();
            if (unsubscribe) {
                unsubscribe();
            }
        }
        this.isDragging = false;
    }
    setStyle(property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    }
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
let McGutterDirective = class McGutterDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._direction = "vertical" /* Vertical */;
        this._disabled = false;
        this._order = 0;
        this._size = 6;
    }
    set direction(direction) {
        this._direction = direction;
    }
    get direction() {
        return this._direction;
    }
    set disabled(disabled) {
        this._disabled = coerceBooleanProperty(disabled);
    }
    get disabled() {
        return this._disabled;
    }
    set order(order) {
        this._order = coerceNumberProperty(order);
    }
    get order() {
        return this._order;
    }
    set size(size) {
        this._size = coerceNumberProperty(size);
    }
    get size() {
        return this._size;
    }
    ngOnInit() {
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
    }
    isVertical() {
        return this.direction === "vertical" /* Vertical */;
    }
    getCursor(state) {
        switch (state) {
            case "disabled" /* Disabled */:
                return "default" /* Default */;
            case "vertical" /* Vertical */:
                return "row-resize" /* ResizeRow */;
            case "horizontal" /* Horizontal */:
                return "col-resize" /* ResizeColumn */;
            default:
                throw Error(`Unknown gutter state for cursor: ${state}`);
        }
    }
    getState() {
        return this.disabled
            ? "disabled" /* Disabled */
            : this.direction === "vertical" /* Vertical */
                ? "vertical" /* Vertical */
                : "horizontal" /* Horizontal */;
    }
    setStyle(property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    }
    setAttr(attribute, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attribute, value);
    }
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
let McSplitterAreaDirective = class McSplitterAreaDirective {
    constructor(elementRef, renderer, splitter) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.splitter = splitter;
    }
    disableFlex() {
        this.renderer.removeStyle(this.elementRef.nativeElement, 'flex');
    }
    ngOnInit() {
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
    }
    ngOnDestroy() {
        this.splitter.removeArea(this);
    }
    setOrder(order) {
        this.setStyle("order" /* Order */, order);
    }
    setSize(size) {
        const sz = coerceNumberProperty(size);
        this.setStyle(this.getSizeProperty(), coerceCssPixelValue(sz));
    }
    getSize() {
        return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
    }
    getMinSize() {
        const styles = getComputedStyle(this.elementRef.nativeElement);
        return parseFloat(styles[this.getMinSizeProperty()]);
    }
    isVertical() {
        return this.splitter.direction === "vertical" /* Vertical */;
    }
    getMinSizeProperty() {
        return this.isVertical()
            ? "min-height" /* MinHeight */
            : "minWidth" /* MinWidth */;
    }
    getOffsetSizeProperty() {
        return this.isVertical()
            ? "offsetHeight" /* OffsetHeight */
            : "offsetWidth" /* OffsetWidth */;
    }
    getSizeProperty() {
        return this.isVertical()
            ? "height" /* Height */
            : "width" /* Width */;
    }
    setStyle(style, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, style, value);
    }
    removeStyle(style) {
        this.renderer.removeStyle(this.elementRef.nativeElement, style);
    }
};
McSplitterAreaDirective = __decorate([
    Directive({
        selector: 'mc-splitter-area'
    }),
    __metadata("design:paramtypes", [ElementRef,
        Renderer2,
        McSplitterComponent])
], McSplitterAreaDirective);

let McSplitterModule = class McSplitterModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { McSplitterModule, McSplitterComponent, McGutterDirective, McSplitterAreaDirective };
//# sourceMappingURL=splitter.js.map

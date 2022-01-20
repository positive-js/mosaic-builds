import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Input, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Output, ViewChildren, ViewChild, NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { coerceNumberProperty, coerceCssPixelValue, coerceBooleanProperty } from '@angular/cdk/coercion';

var Direction;
(function (Direction) {
    Direction["Horizontal"] = "horizontal";
    Direction["Vertical"] = "vertical";
})(Direction || (Direction = {}));
class McGutterDirective {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._direction = Direction.Vertical;
        this._order = 0;
        this._size = 6;
        this.dragged = false;
    }
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        this._direction = direction;
    }
    get order() {
        return this._order;
    }
    set order(order) {
        this._order = coerceNumberProperty(order);
    }
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = coerceNumberProperty(size);
    }
    get isVertical() {
        return this._direction === Direction.Vertical;
    }
    ngOnInit() {
        this.setStyle("flex-basis" /* FlexBasis */, coerceCssPixelValue(this.size));
        this.setStyle(this.isVertical ? "height" /* Height */ : "width" /* Width */, coerceCssPixelValue(this.size));
        this.setStyle("order" /* Order */, this.order);
        if (!this.isVertical) {
            this.setStyle("height" /* Height */, '100%');
        }
        // fix IE issue with gutter icon. flex-direction is requied for flex alignment options
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical ? 'row' : 'column');
    }
    getPosition() {
        return {
            x: this.elementRef.nativeElement.offsetLeft,
            y: this.elementRef.nativeElement.offsetTop
        };
    }
    setStyle(property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    }
}
/** @nocollapse */ /** @nocollapse */ McGutterDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McGutterDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McGutterDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McGutterDirective, selector: "mc-gutter", inputs: { direction: "direction", order: "order", size: "size" }, host: { listeners: { "mousedown": "dragged = true" }, properties: { "class.mc-gutter_vertical": "isVertical", "class.mc-gutter_dragged": "dragged" }, classAttribute: "mc-gutter" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McGutterDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-gutter',
                    host: {
                        class: 'mc-gutter',
                        '[class.mc-gutter_vertical]': 'isVertical',
                        '[class.mc-gutter_dragged]': 'dragged',
                        '(mousedown)': 'dragged = true'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { direction: [{
                type: Input
            }], order: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
class McGutterGhostDirective {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._x = 0;
        this._y = 0;
        this._direction = Direction.Vertical;
        this._size = 6;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
        this.setStyle("left" /* Left */, coerceCssPixelValue(x));
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
        this.setStyle("top" /* Top */, coerceCssPixelValue(y));
    }
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        this._direction = direction;
        this.updateDimensions();
    }
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = coerceNumberProperty(size);
        this.updateDimensions();
    }
    get isVertical() {
        return this.direction === Direction.Vertical;
    }
    updateDimensions() {
        this.setStyle(this.isVertical ? "width" /* Width */ : "height" /* Height */, '100%');
        this.setStyle(this.isVertical ? "height" /* Height */ : "width" /* Width */, coerceCssPixelValue(this.size));
    }
    setStyle(property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    }
}
/** @nocollapse */ /** @nocollapse */ McGutterGhostDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McGutterGhostDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McGutterGhostDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McGutterGhostDirective, selector: "mc-gutter-ghost", inputs: { visible: "visible", x: "x", y: "y", direction: "direction", size: "size" }, host: { properties: { "class.mc-gutter-ghost_vertical": "isVertical", "class.mc-gutter-ghost_visible": "visible" }, classAttribute: "mc-gutter-ghost" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McGutterGhostDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-gutter-ghost',
                    host: {
                        class: 'mc-gutter-ghost',
                        '[class.mc-gutter-ghost_vertical]': 'isVertical',
                        '[class.mc-gutter-ghost_visible]': 'visible'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { visible: [{
                type: Input
            }], x: [{
                type: Input
            }], y: [{
                type: Input
            }], direction: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
class McSplitterComponent {
    constructor(elementRef, changeDetectorRef, ngZone, renderer) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.gutterPositionChange = new EventEmitter();
        this.areas = [];
        this._isDragging = false;
        this.areaPositionDivider = 2;
        this.listeners = [];
        this._hideGutters = false;
        this._disabled = false;
        this._useGhost = false;
        this._gutterSize = 6;
        this._resizing = false;
    }
    get isDragging() {
        return this._isDragging;
    }
    get hideGutters() {
        return this._hideGutters;
    }
    set hideGutters(value) {
        this._hideGutters = coerceBooleanProperty(value);
    }
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        this._direction = direction;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = coerceBooleanProperty(disabled);
    }
    get useGhost() {
        return this._useGhost;
    }
    set useGhost(useGhost) {
        this._useGhost = coerceBooleanProperty(useGhost);
    }
    get gutterSize() {
        return this._gutterSize;
    }
    set gutterSize(gutterSize) {
        const size = coerceNumberProperty(gutterSize);
        this._gutterSize = size > 0 ? size : this.gutterSize;
    }
    get resizing() {
        return this._resizing;
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
            this.direction = Direction.Horizontal;
        }
        this.setStyle("flex-direction" /* FlexDirection */, this.isVertical() ? 'column' : 'row');
    }
    onMouseDown(event, leftAreaIndex, rightAreaIndex) {
        if (this.disabled) {
            return;
        }
        event.preventDefault();
        const startPoint = {
            x: event.screenX,
            y: event.screenY
        };
        const leftArea = this.areas[leftAreaIndex];
        const rightArea = this.areas[rightAreaIndex];
        leftArea.initialSize = leftArea.area.getSize();
        rightArea.initialSize = rightArea.area.getSize();
        let currentGutter;
        if (this.useGhost) {
            // tslint:disable-next-line:no-magic-numbers
            const gutterOrder = leftAreaIndex * 2 + 1;
            currentGutter = this.gutters.find((gutter) => gutter.order === gutterOrder);
            if (currentGutter) {
                const gutterPosition = currentGutter.getPosition();
                this.ghost.direction = currentGutter.direction;
                this.ghost.size = currentGutter.size;
                this.ghost.x = gutterPosition.x;
                this.ghost.y = gutterPosition.y;
                this.ghost.visible = true;
                this.setStyle("cursor" /* Cursor */, currentGutter.direction === Direction.Vertical ? 'row-resize' : 'col-resize');
            }
        }
        else {
            this.areas.forEach((item) => {
                const size = item.area.getSize();
                item.area.disableFlex();
                item.area.setSize(size);
            });
        }
        this.listeners.push(this.renderer.listen('document', 'mouseup', () => this.onMouseUp(leftArea, rightArea, currentGutter)));
        this.ngZone.runOutsideAngular(() => {
            this.listeners.push(this.renderer.listen('document', 'mousemove', (e) => this.onMouseMove(e, startPoint, leftArea, rightArea, currentGutter)));
        });
        this._isDragging = true;
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
        return this.direction === Direction.Vertical;
    }
    updateGutter() {
        this.gutters.forEach((gutter) => {
            if (gutter.dragged) {
                gutter.dragged = false;
                this.changeDetectorRef.detectChanges();
            }
        });
    }
    onMouseMove(event, startPoint, leftArea, rightArea, currentGutter) {
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
        if (this.useGhost && currentGutter) {
            const gutterPosition = currentGutter.getPosition();
            const leftPos = leftArea.area.getPosition();
            const rightPos = rightArea.area.getPosition();
            const rightMin = rightArea.area.getMinSize() || 0;
            const leftMin = leftArea.area.getMinSize() || 0;
            const key = this.isVertical() ? 'y' : 'x';
            const minPos = leftPos[key] - leftMin;
            const maxPos = rightPos[key] + (rightArea.area.getSize() || 0) - rightMin - currentGutter.size;
            const newPos = gutterPosition[key] - offset;
            this.ghost[key] = newPos < minPos ? minPos : Math.min(newPos, maxPos);
        }
        else {
            this.resizeAreas(leftArea, rightArea, offset);
        }
    }
    resizeAreas(leftArea, rightArea, sizeOffset) {
        const newLeftAreaSize = leftArea.initialSize - sizeOffset;
        const newRightAreaSize = rightArea.initialSize + sizeOffset;
        const minLeftAreaSize = leftArea.area.getMinSize();
        const minRightAreaSize = rightArea.area.getMinSize();
        if (newLeftAreaSize < minLeftAreaSize || newRightAreaSize < minRightAreaSize) {
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
    onMouseUp(leftArea, rightArea, currentGutter) {
        while (this.listeners.length > 0) {
            const unsubscribe = this.listeners.pop();
            if (unsubscribe) {
                unsubscribe();
            }
        }
        if (this.useGhost && currentGutter) {
            const gutterPosition = currentGutter.getPosition();
            const offset = this.ghost.direction === Direction.Vertical ?
                gutterPosition.y - this.ghost.y :
                gutterPosition.x - this.ghost.x;
            this.resizeAreas(leftArea, rightArea, offset);
            this.ghost.visible = false;
            this.setStyle("cursor" /* Cursor */, 'unset');
        }
        this._isDragging = false;
        this.updateGutter();
        this.gutterPositionChange.emit();
    }
    setStyle(property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    }
}
/** @nocollapse */ /** @nocollapse */ McSplitterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McSplitterComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McSplitterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McSplitterComponent, selector: "mc-splitter", inputs: { hideGutters: "hideGutters", direction: "direction", disabled: "disabled", useGhost: "useGhost", gutterSize: "gutterSize" }, outputs: { gutterPositionChange: "gutterPositionChange" }, host: { classAttribute: "mc-splitter" }, viewQueries: [{ propertyName: "ghost", first: true, predicate: McGutterGhostDirective, descendants: true }, { propertyName: "gutters", predicate: McGutterDirective, descendants: true }], exportAs: ["mcSplitter"], ngImport: i0, template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n\n<mc-gutter-ghost *ngIf=\"useGhost\"></mc-gutter-ghost>\n", styles: [".mc-splitter{display:flex;position:relative;flex-wrap:nowrap;align-items:stretch;overflow:hidden}.mc-splitter .mc-splitter-area{overflow:hidden}.mc-splitter .mc-splitter-area_resizing{pointer-events:none}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;overflow:hidden}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}.mc-gutter-ghost{position:absolute;z-index:999;display:none;overflow:hidden}.mc-gutter-ghost.mc-gutter-ghost_vertical>.mc-icon{transform:rotate(90deg)}.mc-gutter-ghost.mc-gutter-ghost_visible{display:block}\n"], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: McGutterDirective, selector: "mc-gutter", inputs: ["direction", "order", "size"] }, { type: McGutterGhostDirective, selector: "mc-gutter-ghost", inputs: ["visible", "x", "y", "direction", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McSplitterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-splitter', exportAs: 'mcSplitter', host: {
                        class: 'mc-splitter'
                    }, preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n\n<mc-gutter-ghost *ngIf=\"useGhost\"></mc-gutter-ghost>\n", styles: [".mc-splitter{display:flex;position:relative;flex-wrap:nowrap;align-items:stretch;overflow:hidden}.mc-splitter .mc-splitter-area{overflow:hidden}.mc-splitter .mc-splitter-area_resizing{pointer-events:none}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;overflow:hidden}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}.mc-gutter-ghost{position:absolute;z-index:999;display:none;overflow:hidden}.mc-gutter-ghost.mc-gutter-ghost_vertical>.mc-icon{transform:rotate(90deg)}.mc-gutter-ghost.mc-gutter-ghost_visible{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.Renderer2 }]; }, propDecorators: { gutterPositionChange: [{
                type: Output
            }], gutters: [{
                type: ViewChildren,
                args: [McGutterDirective]
            }], ghost: [{
                type: ViewChild,
                args: [McGutterGhostDirective]
            }], hideGutters: [{
                type: Input
            }], direction: [{
                type: Input
            }], disabled: [{
                type: Input
            }], useGhost: [{
                type: Input
            }], gutterSize: [{
                type: Input
            }] } });
class McSplitterAreaDirective {
    constructor(elementRef, renderer, splitter) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.splitter = splitter;
        this.sizeChange = new EventEmitter();
    }
    isResizing() {
        return this.splitter.isDragging;
    }
    disableFlex() {
        this.renderer.removeStyle(this.elementRef.nativeElement, 'flex');
    }
    ngOnInit() {
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
        this.splitter.gutterPositionChange.subscribe(() => this.emitSizeChange());
    }
    ngOnDestroy() {
        this.splitter.removeArea(this);
    }
    setOrder(order) {
        this.setStyle("order" /* Order */, order);
    }
    setSize(size) {
        if (!isNaN(size)) {
            const sz = coerceNumberProperty(size);
            this.setStyle(this.getSizeProperty(), coerceCssPixelValue(sz));
        }
    }
    getSize() {
        return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
    }
    getPosition() {
        return {
            x: this.elementRef.nativeElement.offsetLeft,
            y: this.elementRef.nativeElement.offsetTop
        };
    }
    getMinSize() {
        const styles = getComputedStyle(this.elementRef.nativeElement);
        return parseFloat(styles[this.getMinSizeProperty()]);
    }
    isVertical() {
        return this.splitter.direction === Direction.Vertical;
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
    emitSizeChange() {
        this.sizeChange.emit(this.getSize());
    }
}
/** @nocollapse */ /** @nocollapse */ McSplitterAreaDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McSplitterAreaDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: McSplitterComponent }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSplitterAreaDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: McSplitterAreaDirective, selector: "[mc-splitter-area]", outputs: { sizeChange: "sizeChange" }, host: { properties: { "class.mc-splitter-area_resizing": "isResizing()" }, classAttribute: "mc-splitter-area" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McSplitterAreaDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-splitter-area]',
                    host: {
                        class: 'mc-splitter-area',
                        '[class.mc-splitter-area_resizing]': 'isResizing()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: McSplitterComponent }]; }, propDecorators: { sizeChange: [{
                type: Output
            }] } });

class McSplitterModule {
}
/** @nocollapse */ /** @nocollapse */ McSplitterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McSplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McSplitterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McSplitterModule, declarations: [McGutterDirective,
        McGutterGhostDirective,
        McSplitterAreaDirective,
        McSplitterComponent], imports: [CommonModule,
        McIconModule], exports: [McGutterDirective,
        McSplitterAreaDirective,
        McSplitterComponent] });
/** @nocollapse */ /** @nocollapse */ McSplitterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McSplitterModule, imports: [[
            CommonModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McSplitterModule, decorators: [{
            type: NgModule,
            args: [{
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
                        McGutterGhostDirective,
                        McSplitterAreaDirective,
                        McSplitterComponent
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Direction, McGutterDirective, McGutterGhostDirective, McSplitterAreaDirective, McSplitterComponent, McSplitterModule };
//# sourceMappingURL=ptsecurity-mosaic-splitter.mjs.map

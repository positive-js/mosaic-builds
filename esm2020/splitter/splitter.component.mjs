import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Input, NgZone, Output, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export var Direction;
(function (Direction) {
    Direction["Horizontal"] = "horizontal";
    Direction["Vertical"] = "vertical";
})(Direction || (Direction = {}));
export class McGutterDirective {
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
/** @nocollapse */ /** @nocollapse */ McGutterDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McGutterDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McGutterDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McGutterDirective, selector: "mc-gutter", inputs: { direction: "direction", order: "order", size: "size" }, host: { listeners: { "mousedown": "dragged = true" }, properties: { "class.mc-gutter_vertical": "isVertical", "class.mc-gutter_dragged": "dragged" }, classAttribute: "mc-gutter" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McGutterDirective, decorators: [{
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
export class McGutterGhostDirective {
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
/** @nocollapse */ /** @nocollapse */ McGutterGhostDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McGutterGhostDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McGutterGhostDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McGutterGhostDirective, selector: "mc-gutter-ghost", inputs: { visible: "visible", x: "x", y: "y", direction: "direction", size: "size" }, host: { properties: { "class.mc-gutter-ghost_vertical": "isVertical", "class.mc-gutter-ghost_visible": "visible" }, classAttribute: "mc-gutter-ghost" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McGutterGhostDirective, decorators: [{
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
export class McSplitterComponent {
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
/** @nocollapse */ /** @nocollapse */ McSplitterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSplitterComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McSplitterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McSplitterComponent, selector: "mc-splitter", inputs: { hideGutters: "hideGutters", direction: "direction", disabled: "disabled", useGhost: "useGhost", gutterSize: "gutterSize" }, outputs: { gutterPositionChange: "gutterPositionChange" }, host: { classAttribute: "mc-splitter" }, viewQueries: [{ propertyName: "ghost", first: true, predicate: McGutterGhostDirective, descendants: true }, { propertyName: "gutters", predicate: McGutterDirective, descendants: true }], exportAs: ["mcSplitter"], ngImport: i0, template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n\n<mc-gutter-ghost *ngIf=\"useGhost\"></mc-gutter-ghost>\n", styles: [".mc-splitter{display:flex;position:relative;flex-wrap:nowrap;align-items:stretch;overflow:hidden}.mc-splitter .mc-splitter-area{overflow:hidden}.mc-splitter .mc-splitter-area_resizing{pointer-events:none}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;overflow:hidden}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}.mc-gutter-ghost{position:absolute;z-index:999;display:none;overflow:hidden}.mc-gutter-ghost.mc-gutter-ghost_vertical>.mc-icon{transform:rotate(90deg)}.mc-gutter-ghost.mc-gutter-ghost_visible{display:block}\n"], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: McGutterDirective, selector: "mc-gutter", inputs: ["direction", "order", "size"] }, { type: McGutterGhostDirective, selector: "mc-gutter-ghost", inputs: ["visible", "x", "y", "direction", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSplitterComponent, decorators: [{
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
export class McSplitterAreaDirective {
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
/** @nocollapse */ /** @nocollapse */ McSplitterAreaDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSplitterAreaDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: McSplitterComponent }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSplitterAreaDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McSplitterAreaDirective, selector: "[mc-splitter-area]", outputs: { sizeChange: "sizeChange" }, host: { properties: { "class.mc-splitter-area_resizing": "isResizing()" }, classAttribute: "mc-splitter-area" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSplitterAreaDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3NwbGl0dGVyL3NwbGl0dGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9zcGxpdHRlci9zcGxpdHRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RyxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQzs7O0FBZ0N2QixNQUFNLENBQU4sSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ2pCLHNDQUF5QixDQUFBO0lBQ3pCLGtDQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFIVyxTQUFTLEtBQVQsU0FBUyxRQUdwQjtBQVdELE1BQU0sT0FBTyxpQkFBaUI7SUF3QzFCLFlBQ1ksVUFBc0IsRUFDdEIsUUFBbUI7UUFEbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBaEN2QixlQUFVLEdBQWMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQVczQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBV25CLFVBQUssR0FBVyxDQUFDLENBQUM7UUFNMUIsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUt0QixDQUFDO0lBMUNKLElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFDSSxTQUFTLENBQUMsU0FBb0I7UUFD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QixDQUFDO0lBQ2pDLENBQUM7SUFFTyxxQkFBcUI7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLENBQUM7WUFDRCxDQUFDLGdDQUEwQixDQUFDO0lBQ3BDLENBQUM7SUFFTyxlQUFlO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDO1lBQ0QsQ0FBQyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDO0lBRU8sUUFBUSxDQUFDLEtBQW9CLEVBQUUsS0FBc0I7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBb0I7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVPLGNBQWM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7MEpBakdRLHVCQUF1QixxRUFNVixtQkFBbUI7OElBTmhDLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQVBuQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsa0JBQWtCO3dCQUN6QixtQ0FBbUMsRUFBRSxjQUFjO3FCQUN0RDtpQkFDSjsyR0FPeUIsbUJBQW1CLDBCQUwvQixVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VDc3NQaXhlbFZhbHVlLCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5pbnRlcmZhY2UgSUFyZWEge1xuICAgIGFyZWE6IE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgb3JkZXI6IG51bWJlcjtcbiAgICBpbml0aWFsU2l6ZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgSVBvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuXG5jb25zdCBlbnVtIFN0eWxlUHJvcGVydHkge1xuICAgIEZsZXggPSAnZmxleCcsXG4gICAgRmxleEJhc2lzID0gJ2ZsZXgtYmFzaXMnLFxuICAgIEZsZXhEaXJlY3Rpb24gPSAnZmxleC1kaXJlY3Rpb24nLFxuICAgIEhlaWdodCA9ICdoZWlnaHQnLFxuICAgIE1heFdpZHRoID0gJ21heC13aWR0aCcsXG4gICAgTWluSGVpZ2h0ID0gJ21pbi1oZWlnaHQnLFxuICAgIE1pbldpZHRoID0gJ21pbldpZHRoJyxcbiAgICBPZmZzZXRIZWlnaHQgPSAnb2Zmc2V0SGVpZ2h0JyxcbiAgICBPZmZzZXRXaWR0aCA9ICdvZmZzZXRXaWR0aCcsXG4gICAgT3JkZXIgPSAnb3JkZXInLFxuICAgIFdpZHRoID0gJ3dpZHRoJyxcbiAgICBUb3AgPSAndG9wJyxcbiAgICBMZWZ0ID0gJ2xlZnQnLFxuICAgIEN1cnNvciA9ICdjdXJzb3InXG59XG5cbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XG4gICAgSG9yaXpvbnRhbCA9ICdob3Jpem9udGFsJyxcbiAgICBWZXJ0aWNhbCA9ICd2ZXJ0aWNhbCdcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1ndXR0ZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1ndXR0ZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWd1dHRlcl92ZXJ0aWNhbF0nOiAnaXNWZXJ0aWNhbCcsXG4gICAgICAgICdbY2xhc3MubWMtZ3V0dGVyX2RyYWdnZWRdJzogJ2RyYWdnZWQnLFxuICAgICAgICAnKG1vdXNlZG93biknOiAnZHJhZ2dlZCA9IHRydWUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0d1dHRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZ2V0IGRpcmVjdGlvbigpOiBEaXJlY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRpcmVjdGlvbihkaXJlY3Rpb246IERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiBEaXJlY3Rpb24gPSBEaXJlY3Rpb24uVmVydGljYWw7XG5cbiAgICBnZXQgb3JkZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGVyO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG9yZGVyKG9yZGVyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fb3JkZXIgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShvcmRlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3JkZXI6IG51bWJlciA9IDA7XG5cbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBzaXplKHNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zaXplID0gY29lcmNlTnVtYmVyUHJvcGVydHkoc2l6ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyID0gNjtcblxuICAgIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWw7XG4gICAgfVxuXG4gICAgZHJhZ2dlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5GbGV4QmFzaXMsIGNvZXJjZUNzc1BpeGVsVmFsdWUodGhpcy5zaXplKSk7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5pc1ZlcnRpY2FsID8gU3R5bGVQcm9wZXJ0eS5IZWlnaHQgOiBTdHlsZVByb3BlcnR5LldpZHRoLCBjb2VyY2VDc3NQaXhlbFZhbHVlKHRoaXMuc2l6ZSkpO1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuT3JkZXIsIHRoaXMub3JkZXIpO1xuXG4gICAgICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuSGVpZ2h0LCAnMTAwJScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZml4IElFIGlzc3VlIHdpdGggZ3V0dGVyIGljb24uIGZsZXgtZGlyZWN0aW9uIGlzIHJlcXVpZWQgZm9yIGZsZXggYWxpZ25tZW50IG9wdGlvbnNcbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkZsZXhEaXJlY3Rpb24sIHRoaXMuaXNWZXJ0aWNhbCA/ICdyb3cnIDogJ2NvbHVtbicpO1xuICAgIH1cblxuICAgIGdldFBvc2l0aW9uKCk6IElQb2ludCB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgICAgICAgICAgeTogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTdHlsZShwcm9wZXJ0eTogU3R5bGVQcm9wZXJ0eSwgdmFsdWU6IHN0cmluZyB8IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1ndXR0ZXItZ2hvc3QnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1ndXR0ZXItZ2hvc3QnLFxuICAgICAgICAnW2NsYXNzLm1jLWd1dHRlci1naG9zdF92ZXJ0aWNhbF0nOiAnaXNWZXJ0aWNhbCcsXG4gICAgICAgICdbY2xhc3MubWMtZ3V0dGVyLWdob3N0X3Zpc2libGVdJzogJ3Zpc2libGUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0d1dHRlckdob3N0RGlyZWN0aXZlIHtcbiAgICBASW5wdXQoKSB2aXNpYmxlOiBib29sZWFuO1xuXG4gICAgZ2V0IHgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgeCh4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5MZWZ0LCBjb2VyY2VDc3NQaXhlbFZhbHVlKHgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF94OiBudW1iZXIgPSAwO1xuXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgeSh5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5Ub3AsIGNvZXJjZUNzc1BpeGVsVmFsdWUoeSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3k6IG51bWJlciA9IDA7XG5cblxuICAgIGdldCBkaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOiBEaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXJlY3Rpb246IERpcmVjdGlvbiA9IERpcmVjdGlvbi5WZXJ0aWNhbDtcblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShzaXplKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyID0gNjtcblxuICAgIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgICApIHt9XG5cbiAgICBwcml2YXRlIHVwZGF0ZURpbWVuc2lvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5pc1ZlcnRpY2FsID8gU3R5bGVQcm9wZXJ0eS5XaWR0aCA6IFN0eWxlUHJvcGVydHkuSGVpZ2h0LCAnMTAwJScpO1xuICAgICAgICB0aGlzLnNldFN0eWxlKHRoaXMuaXNWZXJ0aWNhbCA/IFN0eWxlUHJvcGVydHkuSGVpZ2h0IDogU3R5bGVQcm9wZXJ0eS5XaWR0aCwgY29lcmNlQ3NzUGl4ZWxWYWx1ZSh0aGlzLnNpemUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHByb3BlcnR5OiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc3BsaXR0ZXInLFxuICAgIGV4cG9ydEFzOiAnbWNTcGxpdHRlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNwbGl0dGVyJ1xuICAgIH0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgc3R5bGVVcmxzOiBbJ3NwbGl0dGVyLnNjc3MnXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc3BsaXR0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNTcGxpdHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQE91dHB1dCgpIGd1dHRlclBvc2l0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICByZWFkb25seSBhcmVhczogSUFyZWFbXSA9IFtdO1xuXG4gICAgQFZpZXdDaGlsZHJlbihNY0d1dHRlckRpcmVjdGl2ZSkgZ3V0dGVyczogUXVlcnlMaXN0PE1jR3V0dGVyRGlyZWN0aXZlPjtcbiAgICBAVmlld0NoaWxkKE1jR3V0dGVyR2hvc3REaXJlY3RpdmUpIGdob3N0OiBNY0d1dHRlckdob3N0RGlyZWN0aXZlO1xuXG4gICAgZ2V0IGlzRHJhZ2dpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RyYWdnaW5nO1xuICAgIH1cbiAgICBwcml2YXRlIF9pc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGFyZWFQb3NpdGlvbkRpdmlkZXI6IG51bWJlciA9IDI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsaXN0ZW5lcnM6ICgoKSA9PiB2b2lkKVtdID0gW107XG5cbiAgICBnZXQgaGlkZUd1dHRlcnMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaWRlR3V0dGVycztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBoaWRlR3V0dGVycyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oaWRlR3V0dGVycyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGlkZUd1dHRlcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBkaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOiBEaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogRGlyZWN0aW9uO1xuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgdXNlR2hvc3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VHaG9zdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB1c2VHaG9zdCh1c2VHaG9zdDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl91c2VHaG9zdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh1c2VHaG9zdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXNlR2hvc3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBndXR0ZXJTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndXR0ZXJTaXplO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGd1dHRlclNpemUoZ3V0dGVyU2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShndXR0ZXJTaXplKTtcbiAgICAgICAgdGhpcy5fZ3V0dGVyU2l6ZSA9IHNpemUgPiAwID8gc2l6ZSA6IHRoaXMuZ3V0dGVyU2l6ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9ndXR0ZXJTaXplOiBudW1iZXIgPSA2O1xuXG4gICAgZ2V0IHJlc2l6aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzaXppbmc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgYWRkQXJlYShhcmVhOiBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5hcmVhcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG9yZGVyOiBudW1iZXIgPSBpbmRleCAqIHRoaXMuYXJlYVBvc2l0aW9uRGl2aWRlcjtcbiAgICAgICAgY29uc3Qgc2l6ZTogbnVtYmVyID0gYXJlYS5nZXRTaXplKCk7XG5cbiAgICAgICAgYXJlYS5zZXRPcmRlcihvcmRlcik7XG5cbiAgICAgICAgdGhpcy5hcmVhcy5wdXNoKHtcbiAgICAgICAgICAgIGFyZWEsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIG9yZGVyLFxuICAgICAgICAgICAgaW5pdGlhbFNpemU6IHNpemVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkhvcml6b250YWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuRmxleERpcmVjdGlvbiwgdGhpcy5pc1ZlcnRpY2FsKCkgPyAnY29sdW1uJyA6ICdyb3cnKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCwgbGVmdEFyZWFJbmRleDogbnVtYmVyLCByaWdodEFyZWFJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRQb2ludDogSVBvaW50ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuc2NyZWVuWCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnNjcmVlbllcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsZWZ0QXJlYSA9IHRoaXMuYXJlYXNbbGVmdEFyZWFJbmRleF07XG4gICAgICAgIGNvbnN0IHJpZ2h0QXJlYSA9IHRoaXMuYXJlYXNbcmlnaHRBcmVhSW5kZXhdO1xuICAgICAgICBsZWZ0QXJlYS5pbml0aWFsU2l6ZSA9IGxlZnRBcmVhLmFyZWEuZ2V0U2l6ZSgpO1xuICAgICAgICByaWdodEFyZWEuaW5pdGlhbFNpemUgPSByaWdodEFyZWEuYXJlYS5nZXRTaXplKCk7XG4gICAgICAgIGxldCBjdXJyZW50R3V0dGVyOiBNY0d1dHRlckRpcmVjdGl2ZSB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodGhpcy51c2VHaG9zdCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgICAgIGNvbnN0IGd1dHRlck9yZGVyID0gbGVmdEFyZWFJbmRleCAqIDIgKyAxO1xuICAgICAgICAgICAgY3VycmVudEd1dHRlciA9IHRoaXMuZ3V0dGVycy5maW5kKChndXR0ZXI6IE1jR3V0dGVyRGlyZWN0aXZlKSA9PiBndXR0ZXIub3JkZXIgPT09IGd1dHRlck9yZGVyKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRHdXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBndXR0ZXJQb3NpdGlvbiA9IGN1cnJlbnRHdXR0ZXIuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2hvc3QuZGlyZWN0aW9uID0gY3VycmVudEd1dHRlci5kaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5naG9zdC5zaXplID0gY3VycmVudEd1dHRlci5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2hvc3QueCA9IGd1dHRlclBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgdGhpcy5naG9zdC55ID0gZ3V0dGVyUG9zaXRpb24ueTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2hvc3QudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkN1cnNvciwgY3VycmVudEd1dHRlci5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbCA/ICdyb3ctcmVzaXplJyA6ICdjb2wtcmVzaXplJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFyZWFzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gaXRlbS5hcmVhLmdldFNpemUoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmFyZWEuZGlzYWJsZUZsZXgoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmFyZWEuc2V0U2l6ZShzaXplKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAgICAgICAnbW91c2V1cCcsXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5vbk1vdXNlVXAobGVmdEFyZWEsIHJpZ2h0QXJlYSwgY3VycmVudEd1dHRlcilcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZU1vdmUoZSwgc3RhcnRQb2ludCwgbGVmdEFyZWEsIHJpZ2h0QXJlYSwgY3VycmVudEd1dHRlcilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVBcmVhKGFyZWE6IE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleFRvUmVtb3ZlOiBudW1iZXIgPSAtMTtcblxuICAgICAgICB0aGlzLmFyZWFzLnNvbWUoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5hcmVhID09PSBhcmVhKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhUb1JlbW92ZSA9IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFyZWFzLnNwbGljZShpbmRleFRvUmVtb3ZlLCAxKTtcbiAgICB9XG5cbiAgICBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUd1dHRlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ndXR0ZXJzLmZvckVhY2goKGd1dHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGd1dHRlci5kcmFnZ2VkKSB7XG4gICAgICAgICAgICAgICAgZ3V0dGVyLmRyYWdnZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogSVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEFyZWE6IElBcmVhLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRBcmVhOiBJQXJlYSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHdXR0ZXI6IE1jR3V0dGVyRGlyZWN0aXZlIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0RyYWdnaW5nIHx8IHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY29uc3QgZW5kUG9pbnQ6IElQb2ludCA9IHtcbiAgICAgICAgICAgIHg6IGV2ZW50LnNjcmVlblgsXG4gICAgICAgICAgICB5OiBldmVudC5zY3JlZW5ZXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5pc1ZlcnRpY2FsKClcbiAgICAgICAgICAgID8gc3RhcnRQb2ludC55IC0gZW5kUG9pbnQueVxuICAgICAgICAgICAgOiBzdGFydFBvaW50LnggLSBlbmRQb2ludC54O1xuXG4gICAgICAgIGlmICh0aGlzLnVzZUdob3N0ICYmIGN1cnJlbnRHdXR0ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGd1dHRlclBvc2l0aW9uID0gY3VycmVudEd1dHRlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgbGVmdFBvcyA9IGxlZnRBcmVhLmFyZWEuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0UG9zID0gcmlnaHRBcmVhLmFyZWEuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0TWluID0gcmlnaHRBcmVhLmFyZWEuZ2V0TWluU2l6ZSgpIHx8IDA7XG4gICAgICAgICAgICBjb25zdCBsZWZ0TWluID0gbGVmdEFyZWEuYXJlYS5nZXRNaW5TaXplKCkgfHwgMDtcblxuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5pc1ZlcnRpY2FsKCkgPyAneScgOiAneCc7XG5cbiAgICAgICAgICAgIGNvbnN0IG1pblBvcyA9IGxlZnRQb3Nba2V5XSAtIGxlZnRNaW47XG5cbiAgICAgICAgICAgIGNvbnN0IG1heFBvcyA9IHJpZ2h0UG9zW2tleV0gKyAocmlnaHRBcmVhLmFyZWEuZ2V0U2l6ZSgpIHx8IDApIC0gcmlnaHRNaW4gLSBjdXJyZW50R3V0dGVyLnNpemU7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1BvcyA9IGd1dHRlclBvc2l0aW9uW2tleV0gLSBvZmZzZXQ7XG5cbiAgICAgICAgICAgIHRoaXMuZ2hvc3Rba2V5XSA9IG5ld1BvcyA8IG1pblBvcyA/IG1pblBvcyA6IE1hdGgubWluKG5ld1BvcywgbWF4UG9zKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICB0aGlzLnJlc2l6ZUFyZWFzKGxlZnRBcmVhLCByaWdodEFyZWEsIG9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZUFyZWFzKGxlZnRBcmVhOiBJQXJlYSwgcmlnaHRBcmVhOiBJQXJlYSwgc2l6ZU9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG5ld0xlZnRBcmVhU2l6ZSA9IGxlZnRBcmVhLmluaXRpYWxTaXplIC0gc2l6ZU9mZnNldDtcbiAgICAgICAgY29uc3QgbmV3UmlnaHRBcmVhU2l6ZSA9IHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSArIHNpemVPZmZzZXQ7XG5cbiAgICAgICAgY29uc3QgbWluTGVmdEFyZWFTaXplID0gbGVmdEFyZWEuYXJlYS5nZXRNaW5TaXplKCk7XG4gICAgICAgIGNvbnN0IG1pblJpZ2h0QXJlYVNpemUgPSByaWdodEFyZWEuYXJlYS5nZXRNaW5TaXplKCk7XG5cbiAgICAgICAgaWYgKG5ld0xlZnRBcmVhU2l6ZSA8IG1pbkxlZnRBcmVhU2l6ZSB8fCBuZXdSaWdodEFyZWFTaXplIDwgbWluUmlnaHRBcmVhU2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld0xlZnRBcmVhU2l6ZSA8PSAwKSB7XG4gICAgICAgICAgICBsZWZ0QXJlYS5hcmVhLnNldFNpemUoMCk7XG4gICAgICAgICAgICByaWdodEFyZWEuYXJlYS5zZXRTaXplKHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSArIGxlZnRBcmVhLmluaXRpYWxTaXplKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdSaWdodEFyZWFTaXplIDw9IDApIHtcbiAgICAgICAgICAgIGxlZnRBcmVhLmFyZWEuc2V0U2l6ZShyaWdodEFyZWEuaW5pdGlhbFNpemUgKyBsZWZ0QXJlYS5pbml0aWFsU2l6ZSk7XG4gICAgICAgICAgICByaWdodEFyZWEuYXJlYS5zZXRTaXplKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVmdEFyZWEuYXJlYS5zZXRTaXplKG5ld0xlZnRBcmVhU2l6ZSk7XG4gICAgICAgICAgICByaWdodEFyZWEuYXJlYS5zZXRTaXplKG5ld1JpZ2h0QXJlYVNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1vdXNlVXAobGVmdEFyZWE6IElBcmVhLFxuICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0QXJlYTogSUFyZWEsXG4gICAgICAgICAgICAgICAgICAgICAgY3VycmVudEd1dHRlcjogTWNHdXR0ZXJEaXJlY3RpdmUgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMubGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gdGhpcy5saXN0ZW5lcnMucG9wKCk7XG5cbiAgICAgICAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudXNlR2hvc3QgJiYgY3VycmVudEd1dHRlcikge1xuICAgICAgICAgICAgY29uc3QgZ3V0dGVyUG9zaXRpb24gPSBjdXJyZW50R3V0dGVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmdob3N0LmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsID9cbiAgICAgICAgICAgICAgICBndXR0ZXJQb3NpdGlvbi55IC0gdGhpcy5naG9zdC55IDpcbiAgICAgICAgICAgICAgICBndXR0ZXJQb3NpdGlvbi54IC0gdGhpcy5naG9zdC54O1xuICAgICAgICAgICAgdGhpcy5yZXNpemVBcmVhcyhsZWZ0QXJlYSwgcmlnaHRBcmVhLCBvZmZzZXQpO1xuICAgICAgICAgICAgdGhpcy5naG9zdC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuQ3Vyc29yLCAndW5zZXQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy51cGRhdGVHdXR0ZXIoKTtcblxuICAgICAgICB0aGlzLmd1dHRlclBvc2l0aW9uQ2hhbmdlLmVtaXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHByb3BlcnR5OiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1zcGxpdHRlci1hcmVhXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNwbGl0dGVyLWFyZWEnLFxuICAgICAgICAnW2NsYXNzLm1jLXNwbGl0dGVyLWFyZWFfcmVzaXppbmddJzogJ2lzUmVzaXppbmcoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBPdXRwdXQoKSBzaXplQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIHNwbGl0dGVyOiBNY1NwbGl0dGVyQ29tcG9uZW50XG4gICAgKSB7IH1cblxuICAgIGlzUmVzaXppbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGl0dGVyLmlzRHJhZ2dpbmc7XG4gICAgfVxuXG4gICAgZGlzYWJsZUZsZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4Jyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BsaXR0ZXIuYWRkQXJlYSh0aGlzKTtcblxuICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuTWF4V2lkdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNwbGl0dGVyLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuV2lkdGgsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuSGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5IZWlnaHQsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuV2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zcGxpdHRlci5ndXR0ZXJQb3NpdGlvbkNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5lbWl0U2l6ZUNoYW5nZSgpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGxpdHRlci5yZW1vdmVBcmVhKHRoaXMpO1xuICAgIH1cblxuICAgIHNldE9yZGVyKG9yZGVyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5Lk9yZGVyLCBvcmRlcik7XG4gICAgfVxuXG4gICAgc2V0U2l6ZShzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFpc05hTihzaXplKSkge1xuICAgICAgICAgICAgY29uc3Qgc3ogPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShzaXplKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5nZXRTaXplUHJvcGVydHkoKSwgY29lcmNlQ3NzUGl4ZWxWYWx1ZShzeikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbdGhpcy5nZXRPZmZzZXRTaXplUHJvcGVydHkoKV07XG4gICAgfVxuXG4gICAgZ2V0UG9zaXRpb24oKTogSVBvaW50IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQsXG4gICAgICAgICAgICB5OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRUb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRNaW5TaXplKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlc1t0aGlzLmdldE1pblNpemVQcm9wZXJ0eSgpXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpdHRlci5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1pblNpemVQcm9wZXJ0eSgpOiBTdHlsZVByb3BlcnR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpXG4gICAgICAgICAgICA/IFN0eWxlUHJvcGVydHkuTWluSGVpZ2h0XG4gICAgICAgICAgICA6IFN0eWxlUHJvcGVydHkuTWluV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRTaXplUHJvcGVydHkoKTogU3R5bGVQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKVxuICAgICAgICAgICAgPyBTdHlsZVByb3BlcnR5Lk9mZnNldEhlaWdodFxuICAgICAgICAgICAgOiBTdHlsZVByb3BlcnR5Lk9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2l6ZVByb3BlcnR5KCk6IFN0eWxlUHJvcGVydHkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKClcbiAgICAgICAgICAgID8gU3R5bGVQcm9wZXJ0eS5IZWlnaHRcbiAgICAgICAgICAgIDogU3R5bGVQcm9wZXJ0eS5XaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHN0eWxlOiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHN0eWxlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVTdHlsZShzdHlsZTogU3R5bGVQcm9wZXJ0eSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbWl0U2l6ZUNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaXplQ2hhbmdlLmVtaXQodGhpcy5nZXRTaXplKCkpO1xuICAgIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1hcmVhIFtuZ0Zvck9mXT1cImFyZWFzXCIgbGV0LWluZGV4PVwiaW5kZXhcIiBsZXQtbGFzdD1cImxhc3RcIj5cbiAgICA8bWMtZ3V0dGVyICpuZ0lmPVwibGFzdCA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCJkaXJlY3Rpb25cIlxuICAgICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJoaWRlR3V0dGVycyA/ICdub25lJyA6ICdmbGV4J1wiXG4gICAgICAgICAgICAgICBbc2l6ZV09XCJndXR0ZXJTaXplXCJcbiAgICAgICAgICAgICAgIFtvcmRlcl09XCJpbmRleCAqIDIgKyAxXCJcbiAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBpbmRleCwgaW5kZXggKyAxKVwiPlxuICAgIDwvbWMtZ3V0dGVyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG1jLWd1dHRlci1naG9zdCAqbmdJZj1cInVzZUdob3N0XCI+PC9tYy1ndXR0ZXItZ2hvc3Q+XG4iXX0=
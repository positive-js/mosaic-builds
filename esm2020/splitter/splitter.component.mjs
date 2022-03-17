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
/** @nocollapse */ /** @nocollapse */ McGutterDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McGutterDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McGutterDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McGutterDirective, selector: "mc-gutter", inputs: { direction: "direction", order: "order", size: "size" }, host: { listeners: { "mousedown": "dragged = true" }, properties: { "class.mc-gutter_vertical": "isVertical", "class.mc-gutter_dragged": "dragged" }, classAttribute: "mc-gutter" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McGutterDirective, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McGutterGhostDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McGutterGhostDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McGutterGhostDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McGutterGhostDirective, selector: "mc-gutter-ghost", inputs: { visible: "visible", x: "x", y: "y", direction: "direction", size: "size" }, host: { properties: { "class.mc-gutter-ghost_vertical": "isVertical", "class.mc-gutter-ghost_visible": "visible" }, classAttribute: "mc-gutter-ghost" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McGutterGhostDirective, decorators: [{
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
        this.changeDetectorRef.markForCheck();
    }
    setStyle(property, value) {
        this.renderer.setStyle(this.elementRef.nativeElement, property, value);
    }
}
/** @nocollapse */ /** @nocollapse */ McSplitterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McSplitterComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McSplitterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McSplitterComponent, selector: "mc-splitter", inputs: { hideGutters: "hideGutters", direction: "direction", disabled: "disabled", useGhost: "useGhost", gutterSize: "gutterSize" }, outputs: { gutterPositionChange: "gutterPositionChange" }, host: { classAttribute: "mc-splitter" }, viewQueries: [{ propertyName: "ghost", first: true, predicate: McGutterGhostDirective, descendants: true }, { propertyName: "gutters", predicate: McGutterDirective, descendants: true }], exportAs: ["mcSplitter"], ngImport: i0, template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n\n<mc-gutter-ghost *ngIf=\"useGhost\"></mc-gutter-ghost>\n", styles: [".mc-splitter{display:flex;position:relative;flex-wrap:nowrap;align-items:stretch;overflow:hidden}.mc-splitter .mc-splitter-area{overflow:hidden}.mc-splitter .mc-splitter-area_resizing{pointer-events:none}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;overflow:hidden}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}.mc-gutter-ghost{position:absolute;z-index:999;display:none;overflow:hidden}.mc-gutter-ghost.mc-gutter-ghost_vertical>.mc-icon{transform:rotate(90deg)}.mc-gutter-ghost.mc-gutter-ghost_visible{display:block}\n"], directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: McGutterDirective, selector: "mc-gutter", inputs: ["direction", "order", "size"] }, { type: McGutterGhostDirective, selector: "mc-gutter-ghost", inputs: ["visible", "x", "y", "direction", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McSplitterComponent, decorators: [{
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
        this.emitSizeChange = () => {
            this.sizeChange.emit(this.getSize());
        };
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
        this.splitter.gutterPositionChange
            .subscribe(this.emitSizeChange);
    }
    ngOnDestroy() {
        this.splitter.removeArea(this);
    }
    setOrder(order) {
        this.setStyle("order" /* Order */, order);
    }
    setSize(size) {
        if (isNaN(size)) {
            return;
        }
        this.setStyle(this.getSizeProperty(), coerceCssPixelValue(coerceNumberProperty(size)));
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
}
/** @nocollapse */ /** @nocollapse */ McSplitterAreaDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McSplitterAreaDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: McSplitterComponent }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSplitterAreaDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McSplitterAreaDirective, selector: "[mc-splitter-area]", outputs: { sizeChange: "sizeChange" }, host: { properties: { "class.mc-splitter-area_resizing": "isResizing()" }, classAttribute: "mc-splitter-area" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McSplitterAreaDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3NwbGl0dGVyL3NwbGl0dGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9zcGxpdHRlci9zcGxpdHRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RyxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQzs7O0FBZ0N2QixNQUFNLENBQU4sSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ2pCLHNDQUF5QixDQUFBO0lBQ3pCLGtDQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFIVyxTQUFTLEtBQVQsU0FBUyxRQUdwQjtBQVdELE1BQU0sT0FBTyxpQkFBaUI7SUEyQzFCLFlBQ1ksVUFBc0IsRUFDdEIsUUFBbUI7UUFEbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBbEN2QixlQUFVLEdBQWMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQVkzQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBWW5CLFVBQUssR0FBVyxDQUFDLENBQUM7UUFNMUIsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUt0QixDQUFDO0lBNUNKLElBQ0ksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsU0FBb0I7UUFD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QUFTLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUMxRCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDO1lBQ0QsQ0FBQywwQkFBdUIsQ0FBQztJQUNqQyxDQUFDO0lBRU8scUJBQXFCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDO1lBQ0QsQ0FBQyxnQ0FBMEIsQ0FBQztJQUNwQyxDQUFDO0lBRU8sZUFBZTtRQUNuQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsQ0FBQztZQUNELENBQUMsb0JBQW9CLENBQUM7SUFDOUIsQ0FBQztJQUVPLFFBQVEsQ0FBQyxLQUFvQixFQUFFLEtBQXNCO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU8sV0FBVyxDQUFDLEtBQW9CO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLENBQUM7OzBKQTdGUSx1QkFBdUIscUVBTVYsbUJBQW1COzhJQU5oQyx1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFQbkMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGtCQUFrQjt3QkFDekIsbUNBQW1DLEVBQUUsY0FBYztxQkFDdEQ7aUJBQ0o7MkdBT3lCLG1CQUFtQiwwQkFML0IsVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlQ3NzUGl4ZWxWYWx1ZSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuaW50ZXJmYWNlIElBcmVhIHtcbiAgICBhcmVhOiBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIG9yZGVyOiBudW1iZXI7XG4gICAgaW5pdGlhbFNpemU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIElQb2ludCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbn1cblxuY29uc3QgZW51bSBTdHlsZVByb3BlcnR5IHtcbiAgICBGbGV4ID0gJ2ZsZXgnLFxuICAgIEZsZXhCYXNpcyA9ICdmbGV4LWJhc2lzJyxcbiAgICBGbGV4RGlyZWN0aW9uID0gJ2ZsZXgtZGlyZWN0aW9uJyxcbiAgICBIZWlnaHQgPSAnaGVpZ2h0JyxcbiAgICBNYXhXaWR0aCA9ICdtYXgtd2lkdGgnLFxuICAgIE1pbkhlaWdodCA9ICdtaW4taGVpZ2h0JyxcbiAgICBNaW5XaWR0aCA9ICdtaW5XaWR0aCcsXG4gICAgT2Zmc2V0SGVpZ2h0ID0gJ29mZnNldEhlaWdodCcsXG4gICAgT2Zmc2V0V2lkdGggPSAnb2Zmc2V0V2lkdGgnLFxuICAgIE9yZGVyID0gJ29yZGVyJyxcbiAgICBXaWR0aCA9ICd3aWR0aCcsXG4gICAgVG9wID0gJ3RvcCcsXG4gICAgTGVmdCA9ICdsZWZ0JyxcbiAgICBDdXJzb3IgPSAnY3Vyc29yJ1xufVxuXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICAgIEhvcml6b250YWwgPSAnaG9yaXpvbnRhbCcsXG4gICAgVmVydGljYWwgPSAndmVydGljYWwnXG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtZ3V0dGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZ3V0dGVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ndXR0ZXJfdmVydGljYWxdJzogJ2lzVmVydGljYWwnLFxuICAgICAgICAnW2NsYXNzLm1jLWd1dHRlcl9kcmFnZ2VkXSc6ICdkcmFnZ2VkJyxcbiAgICAgICAgJyhtb3VzZWRvd24pJzogJ2RyYWdnZWQgPSB0cnVlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNHdXR0ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgc2V0IGRpcmVjdGlvbihkaXJlY3Rpb246IERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiBEaXJlY3Rpb24gPSBEaXJlY3Rpb24uVmVydGljYWw7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG9yZGVyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmRlcjtcbiAgICB9XG5cbiAgICBzZXQgb3JkZXIob3JkZXI6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9vcmRlciA9IGNvZXJjZU51bWJlclByb3BlcnR5KG9yZGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vcmRlcjogbnVtYmVyID0gMDtcblxuXG4gICAgQElucHV0KClcbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICBzZXQgc2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHNpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NpemU6IG51bWJlciA9IDY7XG5cbiAgICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsO1xuICAgIH1cblxuICAgIGRyYWdnZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuRmxleEJhc2lzLCBjb2VyY2VDc3NQaXhlbFZhbHVlKHRoaXMuc2l6ZSkpO1xuICAgICAgICB0aGlzLnNldFN0eWxlKHRoaXMuaXNWZXJ0aWNhbCA/IFN0eWxlUHJvcGVydHkuSGVpZ2h0IDogU3R5bGVQcm9wZXJ0eS5XaWR0aCwgY29lcmNlQ3NzUGl4ZWxWYWx1ZSh0aGlzLnNpemUpKTtcbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5Lk9yZGVyLCB0aGlzLm9yZGVyKTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkhlaWdodCwgJzEwMCUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpeCBJRSBpc3N1ZSB3aXRoIGd1dHRlciBpY29uLiBmbGV4LWRpcmVjdGlvbiBpcyByZXF1aWVkIGZvciBmbGV4IGFsaWdubWVudCBvcHRpb25zXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5GbGV4RGlyZWN0aW9uLCB0aGlzLmlzVmVydGljYWwgPyAncm93JyA6ICdjb2x1bW4nKTtcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbigpOiBJUG9pbnQge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHk6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3R5bGUocHJvcGVydHk6IFN0eWxlUHJvcGVydHksIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcHJvcGVydHksIHZhbHVlKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtZ3V0dGVyLWdob3N0JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZ3V0dGVyLWdob3N0JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ndXR0ZXItZ2hvc3RfdmVydGljYWxdJzogJ2lzVmVydGljYWwnLFxuICAgICAgICAnW2NsYXNzLm1jLWd1dHRlci1naG9zdF92aXNpYmxlXSc6ICd2aXNpYmxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNHdXR0ZXJHaG9zdERpcmVjdGl2ZSB7XG4gICAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuTGVmdCwgY29lcmNlQ3NzUGl4ZWxWYWx1ZSh4KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfeDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuVG9wLCBjb2VyY2VDc3NQaXhlbFZhbHVlKHkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF95OiBudW1iZXIgPSAwO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXJlY3Rpb24oKTogRGlyZWN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiBEaXJlY3Rpb24gPSBEaXJlY3Rpb24uVmVydGljYWw7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIHNldCBzaXplKHNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zaXplID0gY29lcmNlTnVtYmVyUHJvcGVydHkoc2l6ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NpemU6IG51bWJlciA9IDY7XG5cbiAgICBnZXQgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWw7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVEaW1lbnNpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0eWxlKHRoaXMuaXNWZXJ0aWNhbCA/IFN0eWxlUHJvcGVydHkuV2lkdGggOiBTdHlsZVByb3BlcnR5LkhlaWdodCwgJzEwMCUnKTtcbiAgICAgICAgdGhpcy5zZXRTdHlsZSh0aGlzLmlzVmVydGljYWwgPyBTdHlsZVByb3BlcnR5LkhlaWdodCA6IFN0eWxlUHJvcGVydHkuV2lkdGgsIGNvZXJjZUNzc1BpeGVsVmFsdWUodGhpcy5zaXplKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTdHlsZShwcm9wZXJ0eTogU3R5bGVQcm9wZXJ0eSwgdmFsdWU6IHN0cmluZyB8IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXNwbGl0dGVyJyxcbiAgICBleHBvcnRBczogJ21jU3BsaXR0ZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zcGxpdHRlcidcbiAgICB9LFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIHN0eWxlVXJsczogWydzcGxpdHRlci5zY3NzJ10sXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NwbGl0dGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jU3BsaXR0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBPdXRwdXQoKSBndXR0ZXJQb3NpdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgcmVhZG9ubHkgYXJlYXM6IElBcmVhW10gPSBbXTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oTWNHdXR0ZXJEaXJlY3RpdmUpIGd1dHRlcnM6IFF1ZXJ5TGlzdDxNY0d1dHRlckRpcmVjdGl2ZT47XG4gICAgQFZpZXdDaGlsZChNY0d1dHRlckdob3N0RGlyZWN0aXZlKSBnaG9zdDogTWNHdXR0ZXJHaG9zdERpcmVjdGl2ZTtcblxuICAgIGdldCBpc0RyYWdnaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEcmFnZ2luZztcbiAgICB9XG4gICAgcHJpdmF0ZSBfaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBhcmVhUG9zaXRpb25EaXZpZGVyOiBudW1iZXIgPSAyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBoaWRlR3V0dGVycygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZGVHdXR0ZXJzO1xuICAgIH1cblxuICAgIHNldCBoaWRlR3V0dGVycyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oaWRlR3V0dGVycyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGlkZUd1dHRlcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgc2V0IGRpcmVjdGlvbihkaXJlY3Rpb246IERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiBEaXJlY3Rpb247XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShkaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgQElucHV0KClcbiAgICBnZXQgdXNlR2hvc3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VHaG9zdDtcbiAgICB9XG5cbiAgICBzZXQgdXNlR2hvc3QodXNlR2hvc3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdXNlR2hvc3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodXNlR2hvc3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VzZUdob3N0OiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGd1dHRlclNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlclNpemU7XG4gICAgfVxuXG4gICAgc2V0IGd1dHRlclNpemUoZ3V0dGVyU2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShndXR0ZXJTaXplKTtcbiAgICAgICAgdGhpcy5fZ3V0dGVyU2l6ZSA9IHNpemUgPiAwID8gc2l6ZSA6IHRoaXMuZ3V0dGVyU2l6ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9ndXR0ZXJTaXplOiBudW1iZXIgPSA2O1xuXG4gICAgZ2V0IHJlc2l6aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzaXppbmc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgYWRkQXJlYShhcmVhOiBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5hcmVhcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG9yZGVyOiBudW1iZXIgPSBpbmRleCAqIHRoaXMuYXJlYVBvc2l0aW9uRGl2aWRlcjtcbiAgICAgICAgY29uc3Qgc2l6ZTogbnVtYmVyID0gYXJlYS5nZXRTaXplKCk7XG5cbiAgICAgICAgYXJlYS5zZXRPcmRlcihvcmRlcik7XG5cbiAgICAgICAgdGhpcy5hcmVhcy5wdXNoKHtcbiAgICAgICAgICAgIGFyZWEsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIG9yZGVyLFxuICAgICAgICAgICAgaW5pdGlhbFNpemU6IHNpemVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLkhvcml6b250YWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuRmxleERpcmVjdGlvbiwgdGhpcy5pc1ZlcnRpY2FsKCkgPyAnY29sdW1uJyA6ICdyb3cnKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCwgbGVmdEFyZWFJbmRleDogbnVtYmVyLCByaWdodEFyZWFJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRQb2ludDogSVBvaW50ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuc2NyZWVuWCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnNjcmVlbllcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsZWZ0QXJlYSA9IHRoaXMuYXJlYXNbbGVmdEFyZWFJbmRleF07XG4gICAgICAgIGNvbnN0IHJpZ2h0QXJlYSA9IHRoaXMuYXJlYXNbcmlnaHRBcmVhSW5kZXhdO1xuXG4gICAgICAgIGxlZnRBcmVhLmluaXRpYWxTaXplID0gbGVmdEFyZWEuYXJlYS5nZXRTaXplKCk7XG4gICAgICAgIHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSA9IHJpZ2h0QXJlYS5hcmVhLmdldFNpemUoKTtcblxuICAgICAgICBsZXQgY3VycmVudEd1dHRlcjogTWNHdXR0ZXJEaXJlY3RpdmUgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMudXNlR2hvc3QpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICBjb25zdCBndXR0ZXJPcmRlciA9IGxlZnRBcmVhSW5kZXggKiAyICsgMTtcbiAgICAgICAgICAgIGN1cnJlbnRHdXR0ZXIgPSB0aGlzLmd1dHRlcnMuZmluZCgoZ3V0dGVyOiBNY0d1dHRlckRpcmVjdGl2ZSkgPT4gZ3V0dGVyLm9yZGVyID09PSBndXR0ZXJPcmRlcik7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50R3V0dGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3V0dGVyUG9zaXRpb24gPSBjdXJyZW50R3V0dGVyLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdob3N0LmRpcmVjdGlvbiA9IGN1cnJlbnRHdXR0ZXIuZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2hvc3Quc2l6ZSA9IGN1cnJlbnRHdXR0ZXIuc2l6ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdob3N0LnggPSBndXR0ZXJQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHRoaXMuZ2hvc3QueSA9IGd1dHRlclBvc2l0aW9uLnk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdob3N0LnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5DdXJzb3IsIGN1cnJlbnRHdXR0ZXIuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWwgPyAncm93LXJlc2l6ZScgOiAnY29sLXJlc2l6ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcmVhcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGl0ZW0uYXJlYS5nZXRTaXplKCk7XG5cbiAgICAgICAgICAgICAgICBpdGVtLmFyZWEuZGlzYWJsZUZsZXgoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmFyZWEuc2V0U2l6ZShzaXplKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgICAgJ2RvY3VtZW50JyxcbiAgICAgICAgICAgICAgICAnbW91c2V1cCcsXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5vbk1vdXNlVXAobGVmdEFyZWEsIHJpZ2h0QXJlYSwgY3VycmVudEd1dHRlcilcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICAgICAgICAnZG9jdW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZU1vdmUoZSwgc3RhcnRQb2ludCwgbGVmdEFyZWEsIHJpZ2h0QXJlYSwgY3VycmVudEd1dHRlcilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVBcmVhKGFyZWE6IE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleFRvUmVtb3ZlOiBudW1iZXIgPSAtMTtcblxuICAgICAgICB0aGlzLmFyZWFzLnNvbWUoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5hcmVhID09PSBhcmVhKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhUb1JlbW92ZSA9IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPT09IC0xKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuYXJlYXMuc3BsaWNlKGluZGV4VG9SZW1vdmUsIDEpO1xuICAgIH1cblxuICAgIGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlR3V0dGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmd1dHRlcnMuZm9yRWFjaCgoZ3V0dGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ3V0dGVyLmRyYWdnZWQpIHtcbiAgICAgICAgICAgICAgICBndXR0ZXIuZHJhZ2dlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Nb3VzZU1vdmUoXG4gICAgICAgIGV2ZW50OiBNb3VzZUV2ZW50LFxuICAgICAgICBzdGFydFBvaW50OiBJUG9pbnQsXG4gICAgICAgIGxlZnRBcmVhOiBJQXJlYSxcbiAgICAgICAgcmlnaHRBcmVhOiBJQXJlYSxcbiAgICAgICAgY3VycmVudEd1dHRlcjogTWNHdXR0ZXJEaXJlY3RpdmUgfCB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcgfHwgdGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBlbmRQb2ludDogSVBvaW50ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuc2NyZWVuWCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnNjcmVlbllcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmlzVmVydGljYWwoKVxuICAgICAgICAgICAgPyBzdGFydFBvaW50LnkgLSBlbmRQb2ludC55XG4gICAgICAgICAgICA6IHN0YXJ0UG9pbnQueCAtIGVuZFBvaW50Lng7XG5cbiAgICAgICAgaWYgKHRoaXMudXNlR2hvc3QgJiYgY3VycmVudEd1dHRlcikge1xuICAgICAgICAgICAgY29uc3QgZ3V0dGVyUG9zaXRpb24gPSBjdXJyZW50R3V0dGVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBsZWZ0UG9zID0gbGVmdEFyZWEuYXJlYS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgcmlnaHRQb3MgPSByaWdodEFyZWEuYXJlYS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgcmlnaHRNaW4gPSByaWdodEFyZWEuYXJlYS5nZXRNaW5TaXplKCkgfHwgMDtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRNaW4gPSBsZWZ0QXJlYS5hcmVhLmdldE1pblNpemUoKSB8fCAwO1xuXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmlzVmVydGljYWwoKSA/ICd5JyA6ICd4JztcblxuICAgICAgICAgICAgY29uc3QgbWluUG9zID0gbGVmdFBvc1trZXldIC0gbGVmdE1pbjtcbiAgICAgICAgICAgIGNvbnN0IG1heFBvcyA9IHJpZ2h0UG9zW2tleV0gKyAocmlnaHRBcmVhLmFyZWEuZ2V0U2l6ZSgpIHx8IDApIC0gcmlnaHRNaW4gLSBjdXJyZW50R3V0dGVyLnNpemU7XG4gICAgICAgICAgICBjb25zdCBuZXdQb3MgPSBndXR0ZXJQb3NpdGlvbltrZXldIC0gb2Zmc2V0O1xuXG4gICAgICAgICAgICB0aGlzLmdob3N0W2tleV0gPSBuZXdQb3MgPCBtaW5Qb3MgPyBtaW5Qb3MgOiBNYXRoLm1pbihuZXdQb3MsIG1heFBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHRoaXMucmVzaXplQXJlYXMobGVmdEFyZWEsIHJpZ2h0QXJlYSwgb2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplQXJlYXMobGVmdEFyZWE6IElBcmVhLCByaWdodEFyZWE6IElBcmVhLCBzaXplT2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmV3TGVmdEFyZWFTaXplID0gbGVmdEFyZWEuaW5pdGlhbFNpemUgLSBzaXplT2Zmc2V0O1xuICAgICAgICBjb25zdCBuZXdSaWdodEFyZWFTaXplID0gcmlnaHRBcmVhLmluaXRpYWxTaXplICsgc2l6ZU9mZnNldDtcblxuICAgICAgICBjb25zdCBtaW5MZWZ0QXJlYVNpemUgPSBsZWZ0QXJlYS5hcmVhLmdldE1pblNpemUoKTtcbiAgICAgICAgY29uc3QgbWluUmlnaHRBcmVhU2l6ZSA9IHJpZ2h0QXJlYS5hcmVhLmdldE1pblNpemUoKTtcblxuICAgICAgICBpZiAobmV3TGVmdEFyZWFTaXplIDwgbWluTGVmdEFyZWFTaXplIHx8IG5ld1JpZ2h0QXJlYVNpemUgPCBtaW5SaWdodEFyZWFTaXplKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAobmV3TGVmdEFyZWFTaXplIDw9IDApIHtcbiAgICAgICAgICAgIGxlZnRBcmVhLmFyZWEuc2V0U2l6ZSgwKTtcbiAgICAgICAgICAgIHJpZ2h0QXJlYS5hcmVhLnNldFNpemUocmlnaHRBcmVhLmluaXRpYWxTaXplICsgbGVmdEFyZWEuaW5pdGlhbFNpemUpO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1JpZ2h0QXJlYVNpemUgPD0gMCkge1xuICAgICAgICAgICAgbGVmdEFyZWEuYXJlYS5zZXRTaXplKHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSArIGxlZnRBcmVhLmluaXRpYWxTaXplKTtcbiAgICAgICAgICAgIHJpZ2h0QXJlYS5hcmVhLnNldFNpemUoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZWZ0QXJlYS5hcmVhLnNldFNpemUobmV3TGVmdEFyZWFTaXplKTtcbiAgICAgICAgICAgIHJpZ2h0QXJlYS5hcmVhLnNldFNpemUobmV3UmlnaHRBcmVhU2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTW91c2VVcChcbiAgICAgICAgbGVmdEFyZWE6IElBcmVhLFxuICAgICAgICByaWdodEFyZWE6IElBcmVhLFxuICAgICAgICBjdXJyZW50R3V0dGVyOiBNY0d1dHRlckRpcmVjdGl2ZSB8IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgICB3aGlsZSAodGhpcy5saXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSB0aGlzLmxpc3RlbmVycy5wb3AoKTtcblxuICAgICAgICAgICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnVzZUdob3N0ICYmIGN1cnJlbnRHdXR0ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGd1dHRlclBvc2l0aW9uID0gY3VycmVudEd1dHRlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5naG9zdC5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbCA/XG4gICAgICAgICAgICAgICAgZ3V0dGVyUG9zaXRpb24ueSAtIHRoaXMuZ2hvc3QueSA6XG4gICAgICAgICAgICAgICAgZ3V0dGVyUG9zaXRpb24ueCAtIHRoaXMuZ2hvc3QueDtcbiAgICAgICAgICAgIHRoaXMucmVzaXplQXJlYXMobGVmdEFyZWEsIHJpZ2h0QXJlYSwgb2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuZ2hvc3QudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkN1cnNvciwgJ3Vuc2V0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlR3V0dGVyKCk7XG5cbiAgICAgICAgdGhpcy5ndXR0ZXJQb3NpdGlvbkNoYW5nZS5lbWl0KCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHByb3BlcnR5OiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1zcGxpdHRlci1hcmVhXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNwbGl0dGVyLWFyZWEnLFxuICAgICAgICAnW2NsYXNzLm1jLXNwbGl0dGVyLWFyZWFfcmVzaXppbmddJzogJ2lzUmVzaXppbmcoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBPdXRwdXQoKSBzaXplQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIHNwbGl0dGVyOiBNY1NwbGl0dGVyQ29tcG9uZW50XG4gICAgKSB7fVxuXG4gICAgaXNSZXNpemluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaXR0ZXIuaXNEcmFnZ2luZztcbiAgICB9XG5cbiAgICBkaXNhYmxlRmxleCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgnKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGxpdHRlci5hZGRBcmVhKHRoaXMpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlU3R5bGUoU3R5bGVQcm9wZXJ0eS5NYXhXaWR0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3BsaXR0ZXIuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5XaWR0aCwgJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3R5bGUoU3R5bGVQcm9wZXJ0eS5IZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkhlaWdodCwgJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3R5bGUoU3R5bGVQcm9wZXJ0eS5XaWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwbGl0dGVyLmd1dHRlclBvc2l0aW9uQ2hhbmdlXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuZW1pdFNpemVDaGFuZ2UpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNwbGl0dGVyLnJlbW92ZUFyZWEodGhpcyk7XG4gICAgfVxuXG4gICAgc2V0T3JkZXIob3JkZXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuT3JkZXIsIG9yZGVyKTtcbiAgICB9XG5cbiAgICBzZXRTaXplKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoaXNOYU4oc2l6ZSkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5zZXRTdHlsZSh0aGlzLmdldFNpemVQcm9wZXJ0eSgpLCBjb2VyY2VDc3NQaXhlbFZhbHVlKGNvZXJjZU51bWJlclByb3BlcnR5KHNpemUpKSk7XG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbdGhpcy5nZXRPZmZzZXRTaXplUHJvcGVydHkoKV07XG4gICAgfVxuXG4gICAgZ2V0UG9zaXRpb24oKTogSVBvaW50IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQsXG4gICAgICAgICAgICB5OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRUb3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRNaW5TaXplKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlc1t0aGlzLmdldE1pblNpemVQcm9wZXJ0eSgpXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpdHRlci5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1pblNpemVQcm9wZXJ0eSgpOiBTdHlsZVByb3BlcnR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpXG4gICAgICAgICAgICA/IFN0eWxlUHJvcGVydHkuTWluSGVpZ2h0XG4gICAgICAgICAgICA6IFN0eWxlUHJvcGVydHkuTWluV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRTaXplUHJvcGVydHkoKTogU3R5bGVQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKVxuICAgICAgICAgICAgPyBTdHlsZVByb3BlcnR5Lk9mZnNldEhlaWdodFxuICAgICAgICAgICAgOiBTdHlsZVByb3BlcnR5Lk9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2l6ZVByb3BlcnR5KCk6IFN0eWxlUHJvcGVydHkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKClcbiAgICAgICAgICAgID8gU3R5bGVQcm9wZXJ0eS5IZWlnaHRcbiAgICAgICAgICAgIDogU3R5bGVQcm9wZXJ0eS5XaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHN0eWxlOiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHN0eWxlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVTdHlsZShzdHlsZTogU3R5bGVQcm9wZXJ0eSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzdHlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbWl0U2l6ZUNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zaXplQ2hhbmdlLmVtaXQodGhpcy5nZXRTaXplKCkpO1xuICAgIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1hcmVhIFtuZ0Zvck9mXT1cImFyZWFzXCIgbGV0LWluZGV4PVwiaW5kZXhcIiBsZXQtbGFzdD1cImxhc3RcIj5cbiAgICA8bWMtZ3V0dGVyICpuZ0lmPVwibGFzdCA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCJkaXJlY3Rpb25cIlxuICAgICAgICAgICAgICAgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJoaWRlR3V0dGVycyA/ICdub25lJyA6ICdmbGV4J1wiXG4gICAgICAgICAgICAgICBbc2l6ZV09XCJndXR0ZXJTaXplXCJcbiAgICAgICAgICAgICAgIFtvcmRlcl09XCJpbmRleCAqIDIgKyAxXCJcbiAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50LCBpbmRleCwgaW5kZXggKyAxKVwiPlxuICAgIDwvbWMtZ3V0dGVyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG1jLWd1dHRlci1naG9zdCAqbmdJZj1cInVzZUdob3N0XCI+PC9tYy1ndXR0ZXItZ2hvc3Q+XG4iXX0=
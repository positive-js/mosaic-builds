import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Renderer2, Input, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, ViewChildren, NgModule } from '@angular/core';
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
    isVertical() {
        return this.direction === Direction.Vertical;
    }
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
            },] }
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
    get gutterSize() {
        return this._gutterSize;
    }
    set gutterSize(gutterSize) {
        const size = coerceNumberProperty(gutterSize);
        this._gutterSize = size > 0 ? size : this.gutterSize;
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
    onMouseUp() {
        while (this.listeners.length > 0) {
            const unsubscribe = this.listeners.pop();
            if (unsubscribe) {
                unsubscribe();
            }
        }
        this.isDragging = false;
        this.updateGutter();
    }
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
                template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch}.mc-gutter,.mc-splitter,.mc-splitter .mc-splitter-area{overflow:hidden}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}"]
            },] }
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
        if (this.splitter.direction === Direction.Vertical) {
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
        if (size) {
            const sz = coerceNumberProperty(size);
            this.setStyle(this.getSizeProperty(), coerceCssPixelValue(sz));
        }
    }
    getSize() {
        return this.elementRef.nativeElement[this.getOffsetSizeProperty()];
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
McSplitterAreaDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mc-splitter-area]',
                host: {
                    class: 'mc-splitter-area'
                }
            },] }
];
/** @nocollapse */
McSplitterAreaDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: McSplitterComponent }
];

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
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Direction, McGutterDirective, McSplitterAreaDirective, McSplitterComponent, McSplitterModule };
//# sourceMappingURL=ptsecurity-mosaic-splitter.js.map

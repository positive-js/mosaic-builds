/**
 * @fileoverview added by tsickle
 * Generated from: splitter.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
const StyleProperty = {
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
const Direction = {
    Horizontal: "horizontal",
    Vertical: "vertical",
};
export { Direction };
export class McGutterDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._direction = Direction.Vertical;
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
        return this.direction === Direction.Vertical;
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
export class McSplitterComponent {
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
            this.direction = Direction.Horizontal;
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
        return this.direction === Direction.Vertical;
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
                template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-splitter{align-items:stretch;display:flex;flex-wrap:nowrap}.mc-gutter,.mc-splitter,.mc-splitter .mc-splitter-area{overflow:hidden}.mc-gutter{align-items:center;display:flex;flex-grow:0;flex-shrink:0;justify-content:center}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}"]
            }] }
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
export class McSplitterAreaDirective {
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
        if (this.splitter.direction === Direction.Vertical) {
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
        return this.splitter.direction === Direction.Vertical;
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
            },] }
];
/** @nocollapse */
McSplitterAreaDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: McSplitterComponent }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvc3BsaXR0ZXIvIiwic291cmNlcyI6WyJzcGxpdHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RyxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUdOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQzs7OztBQUd2QixvQkFLQzs7O0lBSkcscUJBQThCOztJQUM5QixzQkFBYzs7SUFDZCxzQkFBYzs7SUFDZCw0QkFBb0I7Ozs7O0FBR3hCLHFCQUdDOzs7SUFGRyxtQkFBVTs7SUFDVixtQkFBVTs7O0FBR2QsTUFBVyxhQUFhO0lBQ3BCLElBQUksUUFBUztJQUNiLFNBQVMsY0FBZTtJQUN4QixhQUFhLGtCQUFtQjtJQUNoQyxNQUFNLFVBQVc7SUFDakIsUUFBUSxhQUFjO0lBQ3RCLFNBQVMsY0FBZTtJQUN4QixRQUFRLFlBQWE7SUFDckIsWUFBWSxnQkFBaUI7SUFDN0IsV0FBVyxlQUFnQjtJQUMzQixLQUFLLFNBQVU7SUFDZixLQUFLLFNBQVU7RUFDbEI7O0FBRUQsTUFBWSxTQUFTO0lBQ2pCLFVBQVUsY0FBZTtJQUN6QixRQUFRLFlBQWE7RUFDeEI7O0FBWUQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFvQzFCLFlBQ1ksVUFBc0IsRUFDdEIsUUFBbUI7UUFEbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBNUJ2QixlQUFVLEdBQWMsU0FBUyxDQUFDLFFBQVEsQ0FBQztR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QUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7SUFFTyxVQUFVO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBQzFELENBQUM7Ozs7O0lBRU8sa0JBQWtCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDO1lBQ0QsQ0FBQywwQkFBdUIsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVPLHFCQUFxQjtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsQ0FBQztZQUNELENBQUMsZ0NBQTBCLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTyxlQUFlO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDO1lBQ0QsQ0FBQyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDOzs7Ozs7O0lBRU8sUUFBUSxDQUFDLEtBQW9CLEVBQUUsS0FBc0I7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7OztJQUVPLFdBQVcsQ0FBQyxLQUFvQjtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7WUFwRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsa0JBQWtCO2lCQUM1QjthQUNKOzs7O1lBOVZHLFVBQVU7WUFNVixTQUFTO1lBNlZhLG1CQUFtQjs7Ozs7OztJQUZyQyw2Q0FBOEI7Ozs7O0lBQzlCLDJDQUEyQjs7Ozs7SUFDM0IsMkNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VDc3NQaXhlbFZhbHVlLCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5pbnRlcmZhY2UgSUFyZWEge1xuICAgIGFyZWE6IE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgb3JkZXI6IG51bWJlcjtcbiAgICBpbml0aWFsU2l6ZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgSVBvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuXG5jb25zdCBlbnVtIFN0eWxlUHJvcGVydHkge1xuICAgIEZsZXggPSAnZmxleCcsXG4gICAgRmxleEJhc2lzID0gJ2ZsZXgtYmFzaXMnLFxuICAgIEZsZXhEaXJlY3Rpb24gPSAnZmxleC1kaXJlY3Rpb24nLFxuICAgIEhlaWdodCA9ICdoZWlnaHQnLFxuICAgIE1heFdpZHRoID0gJ21heC13aWR0aCcsXG4gICAgTWluSGVpZ2h0ID0gJ21pbi1oZWlnaHQnLFxuICAgIE1pbldpZHRoID0gJ21pbldpZHRoJyxcbiAgICBPZmZzZXRIZWlnaHQgPSAnb2Zmc2V0SGVpZ2h0JyxcbiAgICBPZmZzZXRXaWR0aCA9ICdvZmZzZXRXaWR0aCcsXG4gICAgT3JkZXIgPSAnb3JkZXInLFxuICAgIFdpZHRoID0gJ3dpZHRoJ1xufVxuXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICAgIEhvcml6b250YWwgPSAnaG9yaXpvbnRhbCcsXG4gICAgVmVydGljYWwgPSAndmVydGljYWwnXG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1ndXR0ZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1ndXR0ZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWd1dHRlcl92ZXJ0aWNhbF0nOiAnaXNWZXJ0aWNhbCgpJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ndXR0ZXJfZHJhZ2dlZF0nOiAnZHJhZ2dlZCcsXG4gICAgICAgICcobW91c2Vkb3duKSc6ICdkcmFnZ2VkID0gdHJ1ZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jR3V0dGVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBnZXQgZGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXJlY3Rpb246IERpcmVjdGlvbiA9IERpcmVjdGlvbi5WZXJ0aWNhbDtcblxuICAgIGdldCBvcmRlcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkZXI7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgb3JkZXIob3JkZXI6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9vcmRlciA9IGNvZXJjZU51bWJlclByb3BlcnR5KG9yZGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vcmRlcjogbnVtYmVyID0gMDtcblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShzaXplKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXIgPSA2O1xuXG4gICAgZHJhZ2dlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5GbGV4QmFzaXMsIGNvZXJjZUNzc1BpeGVsVmFsdWUodGhpcy5zaXplKSk7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5pc1ZlcnRpY2FsKCkgPyBTdHlsZVByb3BlcnR5LkhlaWdodCA6IFN0eWxlUHJvcGVydHkuV2lkdGgsIGNvZXJjZUNzc1BpeGVsVmFsdWUodGhpcy5zaXplKSk7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5PcmRlciwgdGhpcy5vcmRlcik7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzVmVydGljYWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkhlaWdodCwgJzEwMCUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpeCBJRSBpc3N1ZSB3aXRoIGd1dHRlciBpY29uLiBmbGV4LWRpcmVjdGlvbiBpcyByZXF1aWVkIGZvciBmbGV4IGFsaWdubWVudCBvcHRpb25zXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5GbGV4RGlyZWN0aW9uLCB0aGlzLmlzVmVydGljYWwoKSA/ICdyb3cnIDogJ2NvbHVtbicpO1xuICAgIH1cblxuICAgIGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3R5bGUocHJvcGVydHk6IFN0eWxlUHJvcGVydHksIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcHJvcGVydHksIHZhbHVlKTtcbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zcGxpdHRlcicsXG4gICAgZXhwb3J0QXM6ICdtY1NwbGl0dGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc3BsaXR0ZXInXG4gICAgfSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBzdHlsZVVybHM6IFsnc3BsaXR0ZXIuc2NzcyddLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zcGxpdHRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1NwbGl0dGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICByZWFkb25seSBhcmVhczogSUFyZWFbXSA9IFtdO1xuXG4gICAgQFZpZXdDaGlsZHJlbihNY0d1dHRlckRpcmVjdGl2ZSkgZ3V0dGVyczogUXVlcnlMaXN0PE1jR3V0dGVyRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBhcmVhUG9zaXRpb25EaXZpZGVyOiBudW1iZXIgPSAyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG4gICAgZ2V0IGhpZGVHdXR0ZXJzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlkZUd1dHRlcnM7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgaGlkZUd1dHRlcnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGlkZUd1dHRlcnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hpZGVHdXR0ZXJzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgZGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXJlY3Rpb246IERpcmVjdGlvbjtcblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGd1dHRlclNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlclNpemU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZ3V0dGVyU2l6ZShndXR0ZXJTaXplOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KGd1dHRlclNpemUpO1xuICAgICAgICB0aGlzLl9ndXR0ZXJTaXplID0gc2l6ZSA+IDAgPyBzaXplIDogdGhpcy5ndXR0ZXJTaXplO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2d1dHRlclNpemU6IG51bWJlciA9IDY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge31cblxuICAgIGFkZEFyZWEoYXJlYTogTWNTcGxpdHRlckFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuYXJlYXMubGVuZ3RoO1xuICAgICAgICBjb25zdCBvcmRlcjogbnVtYmVyID0gaW5kZXggKiB0aGlzLmFyZWFQb3NpdGlvbkRpdmlkZXI7XG4gICAgICAgIGNvbnN0IHNpemU6IG51bWJlciA9IGFyZWEuZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGFyZWEuc2V0T3JkZXIob3JkZXIpO1xuXG4gICAgICAgIHRoaXMuYXJlYXMucHVzaCh7XG4gICAgICAgICAgICBhcmVhLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBvcmRlcixcbiAgICAgICAgICAgIGluaXRpYWxTaXplOiBzaXplXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5Ib3Jpem9udGFsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkZsZXhEaXJlY3Rpb24sIHRoaXMuaXNWZXJ0aWNhbCgpID8gJ2NvbHVtbicgOiAncm93Jyk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZnRBcmVhSW5kZXg6IG51bWJlciwgcmlnaHRBcmVhSW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IGxlZnRBcmVhID0gdGhpcy5hcmVhc1tsZWZ0QXJlYUluZGV4XTtcbiAgICAgICAgY29uc3QgcmlnaHRBcmVhID0gdGhpcy5hcmVhc1tyaWdodEFyZWFJbmRleF07XG5cbiAgICAgICAgY29uc3Qgc3RhcnRQb2ludDogSVBvaW50ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuc2NyZWVuWCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnNjcmVlbllcbiAgICAgICAgfTtcblxuICAgICAgICBsZWZ0QXJlYS5pbml0aWFsU2l6ZSA9IGxlZnRBcmVhLmFyZWEuZ2V0U2l6ZSgpO1xuICAgICAgICByaWdodEFyZWEuaW5pdGlhbFNpemUgPSByaWdodEFyZWEuYXJlYS5nZXRTaXplKCk7XG5cbiAgICAgICAgdGhpcy5hcmVhcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXplID0gaXRlbS5hcmVhLmdldFNpemUoKTtcbiAgICAgICAgICAgIGl0ZW0uYXJlYS5kaXNhYmxlRmxleCgpO1xuICAgICAgICAgICAgaXRlbS5hcmVhLnNldFNpemUoc2l6ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgICAgICAgICAgICdtb3VzZXVwJyxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5vbk1vdXNlVXAoKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgICAgICAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgICAgICAgICAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShlLCBzdGFydFBvaW50LCBsZWZ0QXJlYSwgcmlnaHRBcmVhKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXJlYShhcmVhOiBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXhUb1JlbW92ZTogbnVtYmVyID0gLTE7XG5cbiAgICAgICAgdGhpcy5hcmVhcy5zb21lKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uYXJlYSA9PT0gYXJlYSkge1xuICAgICAgICAgICAgICAgIGluZGV4VG9SZW1vdmUgPSBpbmRleDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleFRvUmVtb3ZlID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcmVhcy5zcGxpY2UoaW5kZXhUb1JlbW92ZSwgMSk7XG4gICAgfVxuXG4gICAgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVHdXR0ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3V0dGVycy5mb3JFYWNoKChndXR0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChndXR0ZXIuZHJhZ2dlZCkge1xuICAgICAgICAgICAgICAgIGd1dHRlci5kcmFnZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50LCBzdGFydFBvaW50OiBJUG9pbnQsIGxlZnRBcmVhOiBJQXJlYSwgcmlnaHRBcmVhOiBJQXJlYSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZyB8fCB0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGVuZFBvaW50OiBJUG9pbnQgPSB7XG4gICAgICAgICAgICB4OiBldmVudC5zY3JlZW5YLFxuICAgICAgICAgICAgeTogZXZlbnQuc2NyZWVuWVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuaXNWZXJ0aWNhbCgpXG4gICAgICAgICAgICA/IHN0YXJ0UG9pbnQueSAtIGVuZFBvaW50LnlcbiAgICAgICAgICAgIDogc3RhcnRQb2ludC54IC0gZW5kUG9pbnQueDtcblxuICAgICAgICBjb25zdCBuZXdMZWZ0QXJlYVNpemUgPSBsZWZ0QXJlYS5pbml0aWFsU2l6ZSAtIG9mZnNldDtcbiAgICAgICAgY29uc3QgbmV3UmlnaHRBcmVhU2l6ZSA9IHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSArIG9mZnNldDtcblxuICAgICAgICBjb25zdCBtaW5MZWZ0QXJlYVNpemUgPSBsZWZ0QXJlYS5hcmVhLmdldE1pblNpemUoKTtcbiAgICAgICAgY29uc3QgbWluUmlnaHRBcmVhU2l6ZSA9IHJpZ2h0QXJlYS5hcmVhLmdldE1pblNpemUoKTtcblxuICAgICAgICBpZiAobmV3TGVmdEFyZWFTaXplIDw9IG1pbkxlZnRBcmVhU2l6ZSB8fCBuZXdSaWdodEFyZWFTaXplIDw9IG1pblJpZ2h0QXJlYVNpemUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdMZWZ0QXJlYVNpemUgPD0gMCkge1xuICAgICAgICAgICAgbGVmdEFyZWEuYXJlYS5zZXRTaXplKDApO1xuICAgICAgICAgICAgcmlnaHRBcmVhLmFyZWEuc2V0U2l6ZShyaWdodEFyZWEuaW5pdGlhbFNpemUgKyBsZWZ0QXJlYS5pbml0aWFsU2l6ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UmlnaHRBcmVhU2l6ZSA8PSAwKSB7XG4gICAgICAgICAgICBsZWZ0QXJlYS5hcmVhLnNldFNpemUocmlnaHRBcmVhLmluaXRpYWxTaXplICsgbGVmdEFyZWEuaW5pdGlhbFNpemUpO1xuICAgICAgICAgICAgcmlnaHRBcmVhLmFyZWEuc2V0U2l6ZSgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlZnRBcmVhLmFyZWEuc2V0U2l6ZShuZXdMZWZ0QXJlYVNpemUpO1xuICAgICAgICAgICAgcmlnaHRBcmVhLmFyZWEuc2V0U2l6ZShuZXdSaWdodEFyZWFTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Nb3VzZVVwKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5saXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSB0aGlzLmxpc3RlbmVycy5wb3AoKTtcblxuICAgICAgICAgICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlR3V0dGVyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTdHlsZShwcm9wZXJ0eTogU3R5bGVQcm9wZXJ0eSwgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtc3BsaXR0ZXItYXJlYV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zcGxpdHRlci1hcmVhJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTcGxpdHRlckFyZWFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIHNwbGl0dGVyOiBNY1NwbGl0dGVyQ29tcG9uZW50XG4gICAgKSB7fVxuXG4gICAgZGlzYWJsZUZsZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4Jyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BsaXR0ZXIuYWRkQXJlYSh0aGlzKTtcblxuICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuTWF4V2lkdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNwbGl0dGVyLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuV2lkdGgsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuSGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5IZWlnaHQsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuV2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BsaXR0ZXIucmVtb3ZlQXJlYSh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRPcmRlcihvcmRlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5PcmRlciwgb3JkZXIpO1xuICAgIH1cblxuICAgIHNldFNpemUoc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICBjb25zdCBzeiA9IGNvZXJjZU51bWJlclByb3BlcnR5KHNpemUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZSh0aGlzLmdldFNpemVQcm9wZXJ0eSgpLCBjb2VyY2VDc3NQaXhlbFZhbHVlKHN6KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0aGlzLmdldE9mZnNldFNpemVQcm9wZXJ0eSgpXTtcbiAgICB9XG5cbiAgICBnZXRNaW5TaXplKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlc1t0aGlzLmdldE1pblNpemVQcm9wZXJ0eSgpXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpdHRlci5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1pblNpemVQcm9wZXJ0eSgpOiBTdHlsZVByb3BlcnR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpXG4gICAgICAgICAgICA/IFN0eWxlUHJvcGVydHkuTWluSGVpZ2h0XG4gICAgICAgICAgICA6IFN0eWxlUHJvcGVydHkuTWluV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRTaXplUHJvcGVydHkoKTogU3R5bGVQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKVxuICAgICAgICAgICAgPyBTdHlsZVByb3BlcnR5Lk9mZnNldEhlaWdodFxuICAgICAgICAgICAgOiBTdHlsZVByb3BlcnR5Lk9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2l6ZVByb3BlcnR5KCk6IFN0eWxlUHJvcGVydHkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKClcbiAgICAgICAgICAgID8gU3R5bGVQcm9wZXJ0eS5IZWlnaHRcbiAgICAgICAgICAgIDogU3R5bGVQcm9wZXJ0eS5XaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHN0eWxlOiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHN0eWxlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVTdHlsZShzdHlsZTogU3R5bGVQcm9wZXJ0eSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzdHlsZSk7XG4gICAgfVxufVxuIl19
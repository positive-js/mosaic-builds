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
                template: "<ng-content></ng-content>\n\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <mc-gutter *ngIf=\"last === false\"\n               [direction]=\"direction\"\n               [attr.disabled]=\"disabled || null\"\n               [style.display]=\"hideGutters ? 'none' : 'flex'\"\n               [size]=\"gutterSize\"\n               [order]=\"index * 2 + 1\"\n               (mousedown)=\"onMouseDown($event, index, index + 1)\">\n    </mc-gutter>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mc-splitter{display:flex;flex-wrap:nowrap;align-items:stretch;overflow:hidden}.mc-splitter .mc-splitter-area{overflow:hidden}.mc-gutter{display:flex;flex-grow:0;flex-shrink:0;justify-content:center;align-items:center;overflow:hidden}.mc-gutter.mc-gutter_vertical>.mc-icon{transform:rotate(90deg)}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3NwbGl0dGVyLyIsInNvdXJjZXMiOlsic3BsaXR0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekcsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFHTixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7Ozs7QUFHdkIsb0JBS0M7OztJQUpHLHFCQUE4Qjs7SUFDOUIsc0JBQWM7O0lBQ2Qsc0JBQWM7O0lBQ2QsNEJBQW9COzs7OztBQUd4QixxQkFHQzs7O0lBRkcsbUJBQVU7O0lBQ1YsbUJBQVU7OztBQUdkLE1BQVcsYUFBYTtJQUNwQixJQUFJLFFBQVM7SUFDYixTQUFTLGNBQWU7SUFDeEIsYUFBYSxrQkFBbUI7SUFDaEMsTUFBTSxVQUFXO0lBQ2pCLFFBQVEsYUFBYztJQUN0QixTQUFTLGNBQWU7SUFDeEIsUUFBUSxZQUFhO0lBQ3JCLFlBQVksZ0JBQWlCO0lBQzdCLFdBQVcsZUFBZ0I7SUFDM0IsS0FBSyxTQUFVO0lBQ2YsS0FBSyxTQUFVO0VBQ2xCOztBQUVELE1BQWtCLFNBQVM7SUFDdkIsVUFBVSxjQUFlO0lBQ3pCLFFBQVEsWUFBYTtFQUN4Qjs7QUFZRCxNQUFNLE9BQU8saUJBQWlCOzs7OztJQW9DMUIsWUFDWSxVQUFzQixFQUN0QixRQUFtQjtRQURuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUE1QnZCLGVBQVUsNkJBQWlDO1FBVzNDLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFXbkIs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QixDQUFDO0lBQzFELENBQUM7Ozs7O0lBRU8sa0JBQWtCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDO1lBQ0QsQ0FBQywwQkFBdUIsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVPLHFCQUFxQjtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsQ0FBQztZQUNELENBQUMsZ0NBQTBCLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTyxlQUFlO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDO1lBQ0QsQ0FBQyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDOzs7Ozs7O0lBRU8sUUFBUSxDQUFDLEtBQW9CLEVBQUUsS0FBc0I7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7OztJQUVPLFdBQVcsQ0FBQyxLQUFvQjtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7WUFwRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsa0JBQWtCO2lCQUM1QjthQUNKOzs7O1lBOVZHLFVBQVU7WUFNVixTQUFTO1lBNlZhLG1CQUFtQjs7Ozs7OztJQUZyQyw2Q0FBOEI7Ozs7O0lBQzlCLDJDQUEyQjs7Ozs7SUFDM0IsMkNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VDc3NQaXhlbFZhbHVlLCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5pbnRlcmZhY2UgSUFyZWEge1xuICAgIGFyZWE6IE1jU3BsaXR0ZXJBcmVhRGlyZWN0aXZlO1xuICAgIGluZGV4OiBudW1iZXI7XG4gICAgb3JkZXI6IG51bWJlcjtcbiAgICBpbml0aWFsU2l6ZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgSVBvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuXG5jb25zdCBlbnVtIFN0eWxlUHJvcGVydHkge1xuICAgIEZsZXggPSAnZmxleCcsXG4gICAgRmxleEJhc2lzID0gJ2ZsZXgtYmFzaXMnLFxuICAgIEZsZXhEaXJlY3Rpb24gPSAnZmxleC1kaXJlY3Rpb24nLFxuICAgIEhlaWdodCA9ICdoZWlnaHQnLFxuICAgIE1heFdpZHRoID0gJ21heC13aWR0aCcsXG4gICAgTWluSGVpZ2h0ID0gJ21pbi1oZWlnaHQnLFxuICAgIE1pbldpZHRoID0gJ21pbldpZHRoJyxcbiAgICBPZmZzZXRIZWlnaHQgPSAnb2Zmc2V0SGVpZ2h0JyxcbiAgICBPZmZzZXRXaWR0aCA9ICdvZmZzZXRXaWR0aCcsXG4gICAgT3JkZXIgPSAnb3JkZXInLFxuICAgIFdpZHRoID0gJ3dpZHRoJ1xufVxuXG5leHBvcnQgY29uc3QgZW51bSBEaXJlY3Rpb24ge1xuICAgIEhvcml6b250YWwgPSAnaG9yaXpvbnRhbCcsXG4gICAgVmVydGljYWwgPSAndmVydGljYWwnXG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1ndXR0ZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1ndXR0ZXInLFxuICAgICAgICAnW2NsYXNzLm1jLWd1dHRlcl92ZXJ0aWNhbF0nOiAnaXNWZXJ0aWNhbCgpJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1ndXR0ZXJfZHJhZ2dlZF0nOiAnZHJhZ2dlZCcsXG4gICAgICAgICcobW91c2Vkb3duKSc6ICdkcmFnZ2VkID0gdHJ1ZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jR3V0dGVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBnZXQgZGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXJlY3Rpb246IERpcmVjdGlvbiA9IERpcmVjdGlvbi5WZXJ0aWNhbDtcblxuICAgIGdldCBvcmRlcigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkZXI7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgb3JkZXIob3JkZXI6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9vcmRlciA9IGNvZXJjZU51bWJlclByb3BlcnR5KG9yZGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vcmRlcjogbnVtYmVyID0gMDtcblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eShzaXplKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXIgPSA2O1xuXG4gICAgZHJhZ2dlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5GbGV4QmFzaXMsIGNvZXJjZUNzc1BpeGVsVmFsdWUodGhpcy5zaXplKSk7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUodGhpcy5pc1ZlcnRpY2FsKCkgPyBTdHlsZVByb3BlcnR5LkhlaWdodCA6IFN0eWxlUHJvcGVydHkuV2lkdGgsIGNvZXJjZUNzc1BpeGVsVmFsdWUodGhpcy5zaXplKSk7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5PcmRlciwgdGhpcy5vcmRlcik7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzVmVydGljYWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkhlaWdodCwgJzEwMCUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpeCBJRSBpc3N1ZSB3aXRoIGd1dHRlciBpY29uLiBmbGV4LWRpcmVjdGlvbiBpcyByZXF1aWVkIGZvciBmbGV4IGFsaWdubWVudCBvcHRpb25zXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5GbGV4RGlyZWN0aW9uLCB0aGlzLmlzVmVydGljYWwoKSA/ICdyb3cnIDogJ2NvbHVtbicpO1xuICAgIH1cblxuICAgIGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3R5bGUocHJvcGVydHk6IFN0eWxlUHJvcGVydHksIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcHJvcGVydHksIHZhbHVlKTtcbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zcGxpdHRlcicsXG4gICAgZXhwb3J0QXM6ICdtY1NwbGl0dGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc3BsaXR0ZXInXG4gICAgfSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBzdHlsZVVybHM6IFsnc3BsaXR0ZXIuc2NzcyddLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zcGxpdHRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1NwbGl0dGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICByZWFkb25seSBhcmVhczogSUFyZWFbXSA9IFtdO1xuXG4gICAgQFZpZXdDaGlsZHJlbihNY0d1dHRlckRpcmVjdGl2ZSkgZ3V0dGVyczogUXVlcnlMaXN0PE1jR3V0dGVyRGlyZWN0aXZlPjtcblxuICAgIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBhcmVhUG9zaXRpb25EaXZpZGVyOiBudW1iZXIgPSAyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG4gICAgZ2V0IGhpZGVHdXR0ZXJzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlkZUd1dHRlcnM7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgaGlkZUd1dHRlcnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGlkZUd1dHRlcnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hpZGVHdXR0ZXJzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgZGlyZWN0aW9uKCk6IERpcmVjdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogRGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXJlY3Rpb246IERpcmVjdGlvbjtcblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGd1dHRlclNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlclNpemU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZ3V0dGVyU2l6ZShndXR0ZXJTaXplOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KGd1dHRlclNpemUpO1xuICAgICAgICB0aGlzLl9ndXR0ZXJTaXplID0gc2l6ZSA+IDAgPyBzaXplIDogdGhpcy5ndXR0ZXJTaXplO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2d1dHRlclNpemU6IG51bWJlciA9IDY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge31cblxuICAgIGFkZEFyZWEoYXJlYTogTWNTcGxpdHRlckFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuYXJlYXMubGVuZ3RoO1xuICAgICAgICBjb25zdCBvcmRlcjogbnVtYmVyID0gaW5kZXggKiB0aGlzLmFyZWFQb3NpdGlvbkRpdmlkZXI7XG4gICAgICAgIGNvbnN0IHNpemU6IG51bWJlciA9IGFyZWEuZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGFyZWEuc2V0T3JkZXIob3JkZXIpO1xuXG4gICAgICAgIHRoaXMuYXJlYXMucHVzaCh7XG4gICAgICAgICAgICBhcmVhLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBvcmRlcixcbiAgICAgICAgICAgIGluaXRpYWxTaXplOiBzaXplXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5Ib3Jpem9udGFsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdHlsZShTdHlsZVByb3BlcnR5LkZsZXhEaXJlY3Rpb24sIHRoaXMuaXNWZXJ0aWNhbCgpID8gJ2NvbHVtbicgOiAncm93Jyk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQsIGxlZnRBcmVhSW5kZXg6IG51bWJlciwgcmlnaHRBcmVhSW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IGxlZnRBcmVhID0gdGhpcy5hcmVhc1tsZWZ0QXJlYUluZGV4XTtcbiAgICAgICAgY29uc3QgcmlnaHRBcmVhID0gdGhpcy5hcmVhc1tyaWdodEFyZWFJbmRleF07XG5cbiAgICAgICAgY29uc3Qgc3RhcnRQb2ludDogSVBvaW50ID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuc2NyZWVuWCxcbiAgICAgICAgICAgIHk6IGV2ZW50LnNjcmVlbllcbiAgICAgICAgfTtcblxuICAgICAgICBsZWZ0QXJlYS5pbml0aWFsU2l6ZSA9IGxlZnRBcmVhLmFyZWEuZ2V0U2l6ZSgpO1xuICAgICAgICByaWdodEFyZWEuaW5pdGlhbFNpemUgPSByaWdodEFyZWEuYXJlYS5nZXRTaXplKCk7XG5cbiAgICAgICAgdGhpcy5hcmVhcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaXplID0gaXRlbS5hcmVhLmdldFNpemUoKTtcbiAgICAgICAgICAgIGl0ZW0uYXJlYS5kaXNhYmxlRmxleCgpO1xuICAgICAgICAgICAgaXRlbS5hcmVhLnNldFNpemUoc2l6ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgICAgICAgICAgICdtb3VzZXVwJyxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5vbk1vdXNlVXAoKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgICAgICAgICdkb2N1bWVudCcsXG4gICAgICAgICAgICAgICAgICAgICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgICAgICAgICAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNlTW92ZShlLCBzdGFydFBvaW50LCBsZWZ0QXJlYSwgcmlnaHRBcmVhKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXJlYShhcmVhOiBNY1NwbGl0dGVyQXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXhUb1JlbW92ZTogbnVtYmVyID0gLTE7XG5cbiAgICAgICAgdGhpcy5hcmVhcy5zb21lKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uYXJlYSA9PT0gYXJlYSkge1xuICAgICAgICAgICAgICAgIGluZGV4VG9SZW1vdmUgPSBpbmRleDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpbmRleFRvUmVtb3ZlID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcmVhcy5zcGxpY2UoaW5kZXhUb1JlbW92ZSwgMSk7XG4gICAgfVxuXG4gICAgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVHdXR0ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3V0dGVycy5mb3JFYWNoKChndXR0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChndXR0ZXIuZHJhZ2dlZCkge1xuICAgICAgICAgICAgICAgIGd1dHRlci5kcmFnZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50LCBzdGFydFBvaW50OiBJUG9pbnQsIGxlZnRBcmVhOiBJQXJlYSwgcmlnaHRBcmVhOiBJQXJlYSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZyB8fCB0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGVuZFBvaW50OiBJUG9pbnQgPSB7XG4gICAgICAgICAgICB4OiBldmVudC5zY3JlZW5YLFxuICAgICAgICAgICAgeTogZXZlbnQuc2NyZWVuWVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuaXNWZXJ0aWNhbCgpXG4gICAgICAgICAgICA/IHN0YXJ0UG9pbnQueSAtIGVuZFBvaW50LnlcbiAgICAgICAgICAgIDogc3RhcnRQb2ludC54IC0gZW5kUG9pbnQueDtcblxuICAgICAgICBjb25zdCBuZXdMZWZ0QXJlYVNpemUgPSBsZWZ0QXJlYS5pbml0aWFsU2l6ZSAtIG9mZnNldDtcbiAgICAgICAgY29uc3QgbmV3UmlnaHRBcmVhU2l6ZSA9IHJpZ2h0QXJlYS5pbml0aWFsU2l6ZSArIG9mZnNldDtcblxuICAgICAgICBjb25zdCBtaW5MZWZ0QXJlYVNpemUgPSBsZWZ0QXJlYS5hcmVhLmdldE1pblNpemUoKTtcbiAgICAgICAgY29uc3QgbWluUmlnaHRBcmVhU2l6ZSA9IHJpZ2h0QXJlYS5hcmVhLmdldE1pblNpemUoKTtcblxuICAgICAgICBpZiAobmV3TGVmdEFyZWFTaXplIDw9IG1pbkxlZnRBcmVhU2l6ZSB8fCBuZXdSaWdodEFyZWFTaXplIDw9IG1pblJpZ2h0QXJlYVNpemUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdMZWZ0QXJlYVNpemUgPD0gMCkge1xuICAgICAgICAgICAgbGVmdEFyZWEuYXJlYS5zZXRTaXplKDApO1xuICAgICAgICAgICAgcmlnaHRBcmVhLmFyZWEuc2V0U2l6ZShyaWdodEFyZWEuaW5pdGlhbFNpemUgKyBsZWZ0QXJlYS5pbml0aWFsU2l6ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UmlnaHRBcmVhU2l6ZSA8PSAwKSB7XG4gICAgICAgICAgICBsZWZ0QXJlYS5hcmVhLnNldFNpemUocmlnaHRBcmVhLmluaXRpYWxTaXplICsgbGVmdEFyZWEuaW5pdGlhbFNpemUpO1xuICAgICAgICAgICAgcmlnaHRBcmVhLmFyZWEuc2V0U2l6ZSgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlZnRBcmVhLmFyZWEuc2V0U2l6ZShuZXdMZWZ0QXJlYVNpemUpO1xuICAgICAgICAgICAgcmlnaHRBcmVhLmFyZWEuc2V0U2l6ZShuZXdSaWdodEFyZWFTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Nb3VzZVVwKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5saXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSB0aGlzLmxpc3RlbmVycy5wb3AoKTtcblxuICAgICAgICAgICAgaWYgKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlR3V0dGVyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTdHlsZShwcm9wZXJ0eTogU3R5bGVQcm9wZXJ0eSwgdmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtc3BsaXR0ZXItYXJlYV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zcGxpdHRlci1hcmVhJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTcGxpdHRlckFyZWFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIHNwbGl0dGVyOiBNY1NwbGl0dGVyQ29tcG9uZW50XG4gICAgKSB7fVxuXG4gICAgZGlzYWJsZUZsZXgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4Jyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BsaXR0ZXIuYWRkQXJlYSh0aGlzKTtcblxuICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuTWF4V2lkdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNwbGl0dGVyLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKFN0eWxlUHJvcGVydHkuV2lkdGgsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuSGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5IZWlnaHQsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0eWxlKFN0eWxlUHJvcGVydHkuV2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BsaXR0ZXIucmVtb3ZlQXJlYSh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRPcmRlcihvcmRlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3R5bGUoU3R5bGVQcm9wZXJ0eS5PcmRlciwgb3JkZXIpO1xuICAgIH1cblxuICAgIHNldFNpemUoc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICBjb25zdCBzeiA9IGNvZXJjZU51bWJlclByb3BlcnR5KHNpemUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZSh0aGlzLmdldFNpemVQcm9wZXJ0eSgpLCBjb2VyY2VDc3NQaXhlbFZhbHVlKHN6KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0aGlzLmdldE9mZnNldFNpemVQcm9wZXJ0eSgpXTtcbiAgICB9XG5cbiAgICBnZXRNaW5TaXplKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlc1t0aGlzLmdldE1pblNpemVQcm9wZXJ0eSgpXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpdHRlci5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1pblNpemVQcm9wZXJ0eSgpOiBTdHlsZVByb3BlcnR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpXG4gICAgICAgICAgICA/IFN0eWxlUHJvcGVydHkuTWluSGVpZ2h0XG4gICAgICAgICAgICA6IFN0eWxlUHJvcGVydHkuTWluV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPZmZzZXRTaXplUHJvcGVydHkoKTogU3R5bGVQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKVxuICAgICAgICAgICAgPyBTdHlsZVByb3BlcnR5Lk9mZnNldEhlaWdodFxuICAgICAgICAgICAgOiBTdHlsZVByb3BlcnR5Lk9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2l6ZVByb3BlcnR5KCk6IFN0eWxlUHJvcGVydHkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKClcbiAgICAgICAgICAgID8gU3R5bGVQcm9wZXJ0eS5IZWlnaHRcbiAgICAgICAgICAgIDogU3R5bGVQcm9wZXJ0eS5XaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKHN0eWxlOiBTdHlsZVByb3BlcnR5LCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHN0eWxlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVTdHlsZShzdHlsZTogU3R5bGVQcm9wZXJ0eSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzdHlsZSk7XG4gICAgfVxufVxuIl19
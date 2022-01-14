import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, QueryList, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
interface IArea {
    area: McSplitterAreaDirective;
    index: number;
    order: number;
    initialSize: number;
}
interface IPoint {
    x: number;
    y: number;
}
export declare enum Direction {
    Horizontal = "horizontal",
    Vertical = "vertical"
}
export declare class McGutterDirective implements OnInit {
    private elementRef;
    private renderer;
    get direction(): Direction;
    set direction(direction: Direction);
    private _direction;
    get order(): number;
    set order(order: number);
    private _order;
    get size(): number;
    set size(size: number);
    private _size;
    get isVertical(): boolean;
    dragged: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    getPosition(): IPoint;
    private setStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<McGutterDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McGutterDirective, "mc-gutter", never, { "direction": "direction"; "order": "order"; "size": "size"; }, {}, never>;
}
export declare class McGutterGhostDirective {
    private elementRef;
    private renderer;
    visible: boolean;
    get x(): number;
    set x(x: number);
    private _x;
    get y(): number;
    set y(y: number);
    private _y;
    get direction(): Direction;
    set direction(direction: Direction);
    private _direction;
    get size(): number;
    set size(size: number);
    private _size;
    get isVertical(): boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    private updateDimensions;
    private setStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<McGutterGhostDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McGutterGhostDirective, "mc-gutter-ghost", never, { "visible": "visible"; "x": "x"; "y": "y"; "direction": "direction"; "size": "size"; }, {}, never>;
}
export declare class McSplitterComponent implements OnInit {
    elementRef: ElementRef;
    changeDetectorRef: ChangeDetectorRef;
    private ngZone;
    private renderer;
    gutterPositionChange: EventEmitter<void>;
    readonly areas: IArea[];
    gutters: QueryList<McGutterDirective>;
    ghost: McGutterGhostDirective;
    get isDragging(): boolean;
    private _isDragging;
    private readonly areaPositionDivider;
    private readonly listeners;
    get hideGutters(): boolean;
    set hideGutters(value: boolean);
    private _hideGutters;
    get direction(): Direction;
    set direction(direction: Direction);
    private _direction;
    get disabled(): boolean;
    set disabled(disabled: boolean);
    private _disabled;
    get useGhost(): boolean;
    set useGhost(useGhost: boolean);
    private _useGhost;
    get gutterSize(): number;
    set gutterSize(gutterSize: number);
    private _gutterSize;
    get resizing(): boolean;
    private _resizing;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, renderer: Renderer2);
    addArea(area: McSplitterAreaDirective): void;
    ngOnInit(): void;
    onMouseDown(event: MouseEvent, leftAreaIndex: number, rightAreaIndex: number): void;
    removeArea(area: McSplitterAreaDirective): void;
    isVertical(): boolean;
    private updateGutter;
    private onMouseMove;
    private resizeAreas;
    private onMouseUp;
    private setStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<McSplitterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McSplitterComponent, "mc-splitter", ["mcSplitter"], { "hideGutters": "hideGutters"; "direction": "direction"; "disabled": "disabled"; "useGhost": "useGhost"; "gutterSize": "gutterSize"; }, { "gutterPositionChange": "gutterPositionChange"; }, never, ["*"]>;
}
export declare class McSplitterAreaDirective implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    private splitter;
    sizeChange: EventEmitter<number>;
    constructor(elementRef: ElementRef, renderer: Renderer2, splitter: McSplitterComponent);
    isResizing(): boolean;
    disableFlex(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    setOrder(order: number): void;
    setSize(size: number): void;
    getSize(): number;
    getPosition(): IPoint;
    getMinSize(): number;
    private isVertical;
    private getMinSizeProperty;
    private getOffsetSizeProperty;
    private getSizeProperty;
    private setStyle;
    private removeStyle;
    private emitSizeChange;
    static ɵfac: i0.ɵɵFactoryDeclaration<McSplitterAreaDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McSplitterAreaDirective, "[mc-splitter-area]", never, {}, { "sizeChange": "sizeChange"; }, never>;
}
export {};

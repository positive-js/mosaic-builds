import { ChangeDetectorRef, ElementRef, NgZone, OnDestroy, OnInit, QueryList, Renderer2 } from '@angular/core';
interface IArea {
    area: McSplitterAreaDirective;
    index: number;
    order: number;
    initialSize: number;
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
    dragged: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    isVertical(): boolean;
    private setStyle;
}
export declare class McSplitterComponent implements OnInit {
    elementRef: ElementRef;
    changeDetectorRef: ChangeDetectorRef;
    private ngZone;
    private renderer;
    readonly areas: IArea[];
    gutters: QueryList<McGutterDirective>;
    private isDragging;
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
    get gutterSize(): number;
    set gutterSize(gutterSize: number);
    private _gutterSize;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, renderer: Renderer2);
    addArea(area: McSplitterAreaDirective): void;
    ngOnInit(): void;
    onMouseDown(event: MouseEvent, leftAreaIndex: number, rightAreaIndex: number): void;
    removeArea(area: McSplitterAreaDirective): void;
    isVertical(): boolean;
    private updateGutter;
    private onMouseMove;
    private onMouseUp;
    private setStyle;
}
export declare class McSplitterAreaDirective implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    private splitter;
    constructor(elementRef: ElementRef, renderer: Renderer2, splitter: McSplitterComponent);
    disableFlex(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    setOrder(order: number): void;
    setSize(size: number): void;
    getSize(): number;
    getMinSize(): number;
    private isVertical;
    private getMinSizeProperty;
    private getOffsetSizeProperty;
    private getSizeProperty;
    private setStyle;
    private removeStyle;
}
export {};

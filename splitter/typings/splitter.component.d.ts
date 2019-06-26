import { ChangeDetectorRef, ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
interface IArea {
    area: McSplitterAreaDirective;
    index: number;
    order: number;
    initialSize: number;
}
export declare const enum Direction {
    Horizontal = "horizontal",
    Vertical = "vertical"
}
export declare class McSplitterComponent implements OnInit {
    elementRef: ElementRef;
    changeDetectorRef: ChangeDetectorRef;
    private ngZone;
    private renderer;
    readonly areas: IArea[];
    private _direction;
    private _disabled;
    private _gutterSize;
    private isDragging;
    private readonly areaPositionDivider;
    private readonly listeners;
    direction: Direction;
    disabled: boolean;
    gutterSize: number;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, renderer: Renderer2);
    addArea(area: McSplitterAreaDirective): void;
    ngOnInit(): void;
    onMouseDown(event: MouseEvent, leftAreaIndex: number, rightAreaIndex: number): void;
    removeArea(area: McSplitterAreaDirective): void;
    private isVertical;
    private onMouseMove;
    private onMouseUp;
    private setStyle;
}
export declare class McGutterDirective implements OnInit {
    private renderer;
    private elementRef;
    private _direction;
    private _disabled;
    private _order;
    private _size;
    direction: Direction;
    disabled: boolean;
    order: number;
    size: number;
    constructor(renderer: Renderer2, elementRef: ElementRef);
    ngOnInit(): void;
    private isVertical;
    private getCursor;
    private getState;
    private setStyle;
    private setAttr;
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

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { McModalControlService } from './modal-control.service';
import { McModalRef } from './modal-ref.class';
import { IModalButtonOptions, IModalOptions, ModalType, OnClickCallback } from './modal.type';
export declare const MODAL_ANIMATE_DURATION = 200;
export declare class McModalComponent<T = any, R = any> extends McModalRef<T, R> implements OnInit, OnChanges, AfterViewInit, OnDestroy, IModalOptions {
    private overlay;
    private renderer;
    private cfr;
    private elementRef;
    private viewContainer;
    private modalControl;
    private changeDetector;
    private document;
    mcModalType: ModalType;
    mcComponent: Type<T>;
    mcContent: string | TemplateRef<{}> | Type<T>;
    mcComponentParams: T;
    mcFooter: string | TemplateRef<{}> | IModalButtonOptions<T>[];
    get mcVisible(): boolean;
    set mcVisible(value: boolean);
    private _mcVisible;
    mcVisibleChange: EventEmitter<boolean>;
    mcZIndex: number;
    mcWidth: number | string;
    mcWrapClassName: string;
    mcClassName: string;
    mcStyle: object;
    mcTitle: string | TemplateRef<{}>;
    mcCloseByESC: boolean;
    get mcClosable(): boolean;
    set mcClosable(value: boolean);
    private _mcClosable;
    get mcMask(): boolean;
    set mcMask(value: boolean);
    private _mcMask;
    get mcMaskClosable(): boolean;
    set mcMaskClosable(value: boolean);
    private _mcMaskClosable;
    mcMaskStyle: object;
    mcBodyStyle: object;
    mcAfterOpen: EventEmitter<void>;
    mcAfterClose: EventEmitter<R>;
    mcOkText: string;
    mcOkType: string;
    get mcOkLoading(): boolean;
    set mcOkLoading(value: boolean);
    private _mcOkLoading;
    mcOnOk: EventEmitter<T> | OnClickCallback<T>;
    mcCancelText: string;
    get mcCancelLoading(): boolean;
    set mcCancelLoading(value: boolean);
    private _mcCancelLoading;
    mcOnCancel: EventEmitter<T> | OnClickCallback<T>;
    modalContainer: ElementRef;
    bodyContainer: ViewContainerRef;
    autoFocusedButtons: QueryList<ElementRef>;
    maskAnimationClassMap: object;
    modalAnimationClassMap: object;
    transformOrigin: string;
    get afterOpen(): Observable<void>;
    get afterClose(): Observable<R>;
    get okText(): string;
    get cancelText(): string;
    get hidden(): boolean;
    private contentComponentRef;
    private animationState;
    private container;
    constructor(overlay: Overlay, renderer: Renderer2, cfr: ComponentFactoryResolver, elementRef: ElementRef, viewContainer: ViewContainerRef, modalControl: McModalControlService, changeDetector: ChangeDetectorRef, document: any);
    mcGetContainer: HTMLElement | OverlayRef | (() => HTMLElement | OverlayRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    open(): void;
    close(result?: R): void;
    destroy(result?: R): void;
    markForCheck(): void;
    triggerOk(): void;
    triggerCancel(): void;
    getInstance(): McModalComponent;
    getContentComponentRef(): ComponentRef<T>;
    getContentComponent(): T;
    getElement(): HTMLElement;
    getMcFooter(): HTMLElement;
    onClickMask($event: MouseEvent): void;
    isModalType(type: ModalType): boolean;
    onKeyDown(event: KeyboardEvent): void;
    onClickCloseBtn(): void;
    onClickOkCancel(type: 'ok' | 'cancel'): void;
    isNonEmptyString(value: {}): boolean;
    isTemplateRef(value: {}): boolean;
    isComponent(value: {}): boolean;
    isModalButtons(value: {}): boolean;
    getButtonCallableProp(options: IModalButtonOptions<T>, prop: string): {};
    onButtonClick(button: IModalButtonOptions<T>): void;
    private handleVisibleStateChange;
    private changeVisibleFromInside;
    private changeAnimationState;
    private animateTo;
    private formatModalButtons;
    /**
     * Create a component dynamically but not attach to any View
     * (this action will be executed when bodyContainer is ready)
     * @param component Component class
     */
    private createDynamicComponent;
    private updateTransformOrigin;
    /**
     * Take care of the body's overflow to decide the existense of scrollbar
     * @param plusNum The number that the openModals.length will increase soon
     */
    private changeBodyOverflow;
}

import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@ptsecurity/cdk/overlay';
import { McMeasureScrollbarService } from '@ptsecurity/mosaic/core';
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
    private mcMeasureScrollbarService;
    private modalControl;
    private changeDetector;
    private document;
    mcModalType: ModalType;
    mcContent: string | TemplateRef<{}> | Type<T>;
    mcComponentParams: object;
    mcFooter: string | TemplateRef<{}> | IModalButtonOptions<T>[];
    mcVisible: boolean;
    _mcVisible: boolean;
    mcVisibleChange: EventEmitter<boolean>;
    mcZIndex: number;
    mcWidth: number | string;
    mcWrapClassName: string;
    mcClassName: string;
    mcStyle: object;
    mcTitle: string | TemplateRef<{}>;
    mcCloseByESC: boolean;
    mcClosable: boolean;
    _mcClosable: boolean;
    mcMask: boolean;
    _mcMask: boolean;
    mcMaskClosable: boolean;
    _mcMaskClosable: boolean;
    mcMaskStyle: object;
    mcBodyStyle: object;
    mcAfterOpen: EventEmitter<void>;
    mcAfterClose: EventEmitter<R>;
    mcOkText: string;
    mcOkType: string;
    mcOkLoading: boolean;
    _mcOkLoading: boolean;
    mcOnOk: EventEmitter<T> | OnClickCallback<T>;
    autoFocusButtonOk: ElementRef;
    mcCancelText: string;
    mcCancelLoading: boolean;
    _mcCancelLoading: boolean;
    mcOnCancel: EventEmitter<T> | OnClickCallback<T>;
    modalContainer: ElementRef;
    bodyContainer: ViewContainerRef;
    maskAnimationClassMap: object;
    modalAnimationClassMap: object;
    transformOrigin: string;
    readonly afterOpen: Observable<void>;
    readonly afterClose: Observable<R>;
    readonly okText: string;
    readonly cancelText: string;
    readonly hidden: boolean;
    private contentComponentRef;
    private animationState;
    private container;
    constructor(overlay: Overlay, renderer: Renderer2, cfr: ComponentFactoryResolver, elementRef: ElementRef, viewContainer: ViewContainerRef, mcMeasureScrollbarService: McMeasureScrollbarService, modalControl: McModalControlService, changeDetector: ChangeDetectorRef, document: any);
    mcGetContainer: HTMLElement | OverlayRef | (() => HTMLElement | OverlayRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    open(): void;
    close(result?: R): void;
    destroy(result?: R): void;
    triggerOk(): void;
    triggerCancel(): void;
    getInstance(): McModalComponent;
    getContentComponentRef(): ComponentRef<T>;
    getContentComponent(): T;
    getElement(): HTMLElement;
    onClickMask($event: MouseEvent): void;
    isModalType(type: ModalType): boolean;
    onKeyDown(event: KeyboardEvent): void;
    onClickCloseBtn(): void;
    onClickOkCancel(type: 'ok' | 'cancel'): void;
    isNonEmptyString(value: {}): boolean;
    isTemplateRef(value: {}): boolean;
    isComponent(value: {}): boolean;
    isModalButtons(value: {}): boolean;
    private handleVisibleStateChange;
    getButtonCallableProp(options: IModalButtonOptions<T>, prop: string): {};
    onButtonClick(button: IModalButtonOptions<T>): void;
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

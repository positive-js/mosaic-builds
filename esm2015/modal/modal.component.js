import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Injector, Input, Output, QueryList, Renderer2, TemplateRef, Type, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { McModalControlService } from './modal-control.service';
import { McModalRef } from './modal-ref.class';
import { modalUtilObject as ModalUtil } from './modal-util';
// Duration when perform animations (ms)
export const MODAL_ANIMATE_DURATION = 200;
export class McModalComponent extends McModalRef {
    constructor(overlay, renderer, cfr, elementRef, viewContainer, modalControl, changeDetector, document) {
        super();
        this.overlay = overlay;
        this.renderer = renderer;
        this.cfr = cfr;
        this.elementRef = elementRef;
        this.viewContainer = viewContainer;
        this.modalControl = modalControl;
        this.changeDetector = changeDetector;
        this.document = document;
        this.mcModalType = 'default';
        this._mcVisible = false;
        this.mcVisibleChange = new EventEmitter();
        this.mcZIndex = 1000;
        this.mcWidth = 480;
        this.mcCloseByESC = true;
        this._mcClosable = true;
        this._mcMask = true;
        this._mcMaskClosable = false;
        // Trigger when modal open(visible) after animations
        this.mcAfterOpen = new EventEmitter();
        // Trigger when modal leave-animation over
        this.mcAfterClose = new EventEmitter();
        this.mcOkType = 'primary';
        this._mcOkLoading = false;
        this.mcOnOk = new EventEmitter();
        this._mcCancelLoading = false;
        this.mcOnCancel = new EventEmitter();
        // The origin point that animation based on
        this.transformOrigin = '0px 0px 0px';
        this.mcGetContainer = () => this.overlay.create();
    }
    get mcVisible() { return this._mcVisible; }
    set mcVisible(value) { this._mcVisible = value; }
    get mcClosable() { return this._mcClosable; }
    set mcClosable(value) { this._mcClosable = value; }
    get mcMask() { return this._mcMask; }
    set mcMask(value) { this._mcMask = value; }
    get mcMaskClosable() { return this._mcMaskClosable; }
    set mcMaskClosable(value) { this._mcMaskClosable = value; }
    get mcOkLoading() { return this._mcOkLoading; }
    set mcOkLoading(value) { this._mcOkLoading = value; }
    get mcCancelLoading() { return this._mcCancelLoading; }
    set mcCancelLoading(value) { this._mcCancelLoading = value; }
    // Observable alias for mcAfterOpen
    get afterOpen() {
        return this.mcAfterOpen.asObservable();
    }
    // Observable alias for mcAfterClose
    get afterClose() {
        return this.mcAfterClose.asObservable();
    }
    get okText() {
        return this.mcOkText;
    }
    get cancelText() {
        return this.mcCancelText;
    }
    // Indicate whether this dialog should hidden
    get hidden() {
        return !this.mcVisible && !this.animationState;
    }
    ngOnInit() {
        // Create component along without View
        if (this.isComponent(this.mcContent)) {
            this.createDynamicComponent(this.mcContent);
        }
        // Setup default button options
        if (this.isModalButtons(this.mcFooter)) {
            this.mcFooter = this.formatModalButtons(this.mcFooter);
        }
        if (this.isComponent(this.mcComponent)) {
            this.createDynamicComponent(this.mcComponent);
        }
        // Place the modal dom to elsewhere
        this.container = typeof this.mcGetContainer === 'function' ? this.mcGetContainer() : this.mcGetContainer;
        if (this.container instanceof HTMLElement) {
            this.container.appendChild(this.elementRef.nativeElement);
        }
        else if (this.container instanceof OverlayRef) {
            // NOTE: only attach the dom to overlay, the view container is not changed actually
            this.container.overlayElement.appendChild(this.elementRef.nativeElement);
        }
        // Register modal when afterOpen/afterClose is stable
        this.modalControl.registerModal(this);
    }
    // [NOTE] NOT available when using by service!
    // Because ngOnChanges never be called when using by service,
    // here we can't support "mcContent"(Component) etc. as inputs that initialized dynamically.
    // BUT: User also can change "mcContent" dynamically to trigger UI changes
    // (provided you don't use Component that needs initializations)
    ngOnChanges(changes) {
        if (changes.mcVisible) {
            // Do not trigger animation while initializing
            this.handleVisibleStateChange(this.mcVisible, !changes.mcVisible.firstChange);
        }
    }
    ngAfterViewInit() {
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        for (const autoFocusedButton of this.autoFocusedButtons.toArray()) {
            if (autoFocusedButton.nativeElement.autofocus) {
                autoFocusedButton.nativeElement.focus();
                break;
            }
        }
    }
    ngOnDestroy() {
        if (this.container instanceof OverlayRef) {
            this.container.dispose();
        }
    }
    open() {
        this.changeVisibleFromInside(true);
    }
    close(result) {
        this.changeVisibleFromInside(false, result);
    }
    // Destroy equals Close
    destroy(result) {
        this.close(result);
    }
    markForCheck() {
        this.changeDetector.markForCheck();
    }
    triggerOk() {
        this.onClickOkCancel('ok');
    }
    triggerCancel() {
        this.onClickOkCancel('cancel');
    }
    getInstance() {
        return this;
    }
    getContentComponentRef() {
        return this.contentComponentRef;
    }
    getContentComponent() {
        return this.contentComponentRef && this.contentComponentRef.instance;
    }
    getElement() {
        return this.elementRef && this.elementRef.nativeElement;
    }
    onClickMask($event) {
        if (this.mcMask &&
            this.mcMaskClosable &&
            $event.target.classList.contains('mc-modal-wrap') &&
            this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    }
    // tslint:disable-next-line: no-reserved-keywords
    isModalType(type) {
        return this.mcModalType === type;
    }
    onKeyDown(event) {
        // tslint:disable-next-line:deprecation .key isn't supported in Edge
        if (event.keyCode === ESCAPE && this.container && (this.container instanceof OverlayRef)) {
            this.close();
            event.preventDefault();
        }
    }
    // AoT
    onClickCloseBtn() {
        if (this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    }
    // AoT
    // tslint:disable-next-line: no-reserved-keywords
    onClickOkCancel(type) {
        const trigger = { ok: this.mcOnOk, cancel: this.mcOnCancel }[type];
        const loadingKey = { ok: 'mcOkLoading', cancel: 'mcCancelLoading' }[type];
        if (trigger instanceof EventEmitter) {
            trigger.emit(this.getContentComponent());
        }
        else if (typeof trigger === 'function') {
            const result = trigger(this.getContentComponent());
            // Users can return "false" to prevent closing by default
            const caseClose = (doClose) => (doClose !== false) && this.close(doClose);
            if (isPromise(result)) {
                this[loadingKey] = true;
                const handleThen = (doClose) => {
                    this[loadingKey] = false;
                    caseClose(doClose);
                };
                result.then(handleThen).catch(handleThen);
            }
            else {
                caseClose(result);
            }
        }
    }
    // AoT
    isNonEmptyString(value) {
        return typeof value === 'string' && value !== '';
    }
    // AoT
    isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    // AoT
    isComponent(value) {
        return value instanceof Type;
    }
    // AoT
    isModalButtons(value) {
        return Array.isArray(value) && value.length > 0;
    }
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    getButtonCallableProp(options, prop) {
        const value = options[prop];
        const args = [];
        if (this.contentComponentRef) {
            args.push(this.contentComponentRef.instance);
        }
        return typeof value === 'function' ? value.apply(options, args) : value;
    }
    // On mcFooter's modal button click
    // AoT
    onButtonClick(button) {
        // Call onClick directly
        // tslint:disable-next-line:no-inferred-empty-object-type  rule seems to be broken
        const result = this.getButtonCallableProp(button, 'onClick');
        if (isPromise(result)) {
            button.loading = true;
            result.then(() => button.loading = false).catch(() => button.loading = false);
        }
    }
    // Do rest things when visible state changed
    handleVisibleStateChange(visible, animation = true, closeResult) {
        // Hide scrollbar at the first time when shown up
        if (visible) {
            this.changeBodyOverflow(1);
        }
        return Promise
            .resolve(animation && this.animateTo(visible))
            // Emit open/close event after animations over
            .then(() => {
            if (visible) {
                this.mcAfterOpen.emit();
            }
            else {
                this.mcAfterClose.emit(closeResult);
                // Show/hide scrollbar when animation is over
                this.changeBodyOverflow();
            }
        });
    }
    // Change mcVisible from inside
    changeVisibleFromInside(visible, closeResult) {
        if (this.mcVisible !== visible) {
            // Change mcVisible value immediately
            this.mcVisible = visible;
            this.mcVisibleChange.emit(visible);
            return this.handleVisibleStateChange(visible, true, closeResult);
        }
        return Promise.resolve();
    }
    changeAnimationState(state) {
        this.animationState = state;
        if (state) {
            this.maskAnimationClassMap = {
                [`fade-${state}`]: true,
                [`fade-${state}-active`]: true
            };
            this.modalAnimationClassMap = {
                [`zoom-${state}`]: true,
                [`zoom-${state}-active`]: true
            };
        }
        else {
            // @ts-ignore
            this.maskAnimationClassMap = this.modalAnimationClassMap = null;
        }
        if (this.contentComponentRef) {
            this.contentComponentRef.changeDetectorRef.markForCheck();
        }
        else {
            this.changeDetector.markForCheck();
        }
    }
    animateTo(isVisible) {
        // Figure out the lastest click position when shows up
        if (isVisible) {
            // [NOTE] Using timeout due to the document.click event is fired later than visible change,
            // so if not postponed to next event-loop, we can't get the lastest click position
            window.setTimeout(() => this.updateTransformOrigin());
        }
        this.changeAnimationState(isVisible ? 'enter' : 'leave');
        // Return when animation is over
        return new Promise((resolve) => {
            return window.setTimeout(() => {
                this.changeAnimationState(null);
                resolve();
            }, MODAL_ANIMATE_DURATION);
        });
    }
    formatModalButtons(buttons) {
        return buttons.map((button) => {
            return Object.assign({
                type: 'default',
                size: 'default',
                autoLoading: true,
                show: true,
                loading: false,
                disabled: false
            }, button);
        });
    }
    /**
     * Create a component dynamically but not attach to any View
     * (this action will be executed when bodyContainer is ready)
     * @param component Component class
     */
    createDynamicComponent(component) {
        const factory = this.cfr.resolveComponentFactory(component);
        const childInjector = Injector.create({
            providers: [{ provide: McModalRef, useValue: this }],
            parent: this.viewContainer.injector
        });
        this.contentComponentRef = factory.create(childInjector);
        if (this.mcComponentParams) {
            Object.assign(this.contentComponentRef.instance, this.mcComponentParams);
        }
        // Do the first change detection immediately
        // (or we do detection at ngAfterViewInit, multi-changes error will be thrown)
        this.contentComponentRef.changeDetectorRef.detectChanges();
    }
    // Update transform-origin to the last click position on document
    updateTransformOrigin() {
        const modalElement = this.modalContainer.nativeElement;
        const lastPosition = ModalUtil.getLastClickPosition();
        if (lastPosition) {
            this.transformOrigin = `${lastPosition.x - modalElement.offsetLeft}px ${lastPosition.y - modalElement.offsetTop}px 0px`;
        }
    }
    /**
     * Take care of the body's overflow to decide the existense of scrollbar
     * @param plusNum The number that the openModals.length will increase soon
     */
    changeBodyOverflow(plusNum = 0) {
        const openModals = this.modalControl.openModals;
        if (openModals.length + plusNum > 0) {
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        }
        else {
            this.renderer.removeStyle(this.document.body, 'overflow');
        }
    }
}
McModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'mc-modal',
                template: "<!-- Compatible: the <ng-content> can appear only once -->\n<ng-template #tplOriginContent>\n    <ng-content></ng-content>\n</ng-template>\n\n<div>\n    <div *ngIf=\"mcMask\"\n         class=\"mc-modal-mask\"\n         [ngClass]=\"maskAnimationClassMap\"\n         [class.mc-modal-mask-hidden]=\"hidden\"\n         [ngStyle]=\"mcMaskStyle\"\n         [style.zIndex]=\"mcZIndex\"\n    ></div>\n    <div\n        (mousedown)=\"onClickMask($event)\"\n        class=\"mc-modal-wrap {{ mcWrapClassName }}\"\n        [style.zIndex]=\"mcZIndex\"\n        [style.display]=\"hidden ? 'none' : ''\"\n        tabindex=\"-1\"\n        role=\"dialog\"\n    >\n        <div #modalContainer\n             class=\"mc-modal {{ mcClassName }}\"\n             [ngClass]=\"modalAnimationClassMap\"\n             [ngStyle]=\"mcStyle\"\n             [style.width]=\"mcWidth | toCssUnit\"\n             [style.transform-origin]=\"transformOrigin\"\n             role=\"document\"\n        >\n            <div class=\"mc-modal-content\" cdkTrapFocus>\n                <button *ngIf=\"mcClosable\"\n                        mc-button\n                        (click)=\"onClickCloseBtn()\"\n                        class=\"mc-modal-close mc-button_transparent\"\n                        aria-label=\"Close\">\n                    <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n                </button>\n                <ng-container [ngSwitch]=\"true\">\n                    <ng-container *ngSwitchCase=\"isModalType('default')\"\n                                  [ngTemplateOutlet]=\"tplContentDefault\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('confirm')\"\n                                  [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('custom')\"\n                                  [ngTemplateOutlet]=\"tplContentCustom\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template #tplContentCustom>\n    <ng-container #bodyContainer></ng-container>\n</ng-template>\n\n\n<!-- [Predefined] Default Modal Content -->\n<ng-template #tplContentDefault>\n    <div *ngIf=\"mcTitle\" class=\"mc-modal-header\">\n        <div class=\"mc-modal-title\">\n            <ng-container [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"mcTitle\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\">\n                    <div [innerHTML]=\"mcTitle\"></div>\n                </ng-container>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <ng-container #bodyContainer>\n            <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                    <div [innerHTML]=\"mcContent\"></div>\n                </ng-container>\n                <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\">\n        <ng-container [ngSwitch]=\"true\">\n            <ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container>\n            <ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\">\n                <ng-container *ngFor=\"let button of mcFooter\">\n                    <button\n                        mc-button\n                        #autoFocusedButton\n                        [attr.autofocus]=\"button.autoFocus\"\n                        *ngIf=\"getButtonCallableProp(button, 'show')\"\n                        [disabled]=\"getButtonCallableProp(button, 'disabled')\"\n                        [class.mc-progress]=\"getButtonCallableProp(button, 'loading')\"\n                        (click)=\"onButtonClick(button)\"\n                        [color]=\"button.type\">\n                        {{ button.label }}\n                    </button>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n                <button\n                    #autoFocusedButton\n                    [attr.autofocus]=\"true\"\n                    *ngIf=\"mcOkText !== null\"\n                    mc-button\n                    color=\"primary\"\n                    (click)=\"onClickOkCancel('ok')\">\n\n                    {{ okText }}\n                </button>\n                <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">\n                    {{ cancelText }}\n                </button>\n            </ng-container>\n        </ng-container>\n    </div>\n</ng-template>\n<!-- /[Predefined] Default Modal Content -->\n\n<!-- [Predefined] Confirm Modal Content -->\n<ng-template #tplContentConfirm>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <div class=\"mc-confirm-body-wrapper\">\n            <div class=\"mc-confirm-body\">\n                <div class=\"mc-confirm-content\">\n                    <ng-container #bodyContainer>\n                        <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                            <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\"\n                                          [ngTemplateOutlet]=\"mcContent\"></ng-container>\n                            <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                                <div [innerHTML]=\"mcContent\"></div>\n                            </ng-container>\n                            <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n                        </ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div> <!-- /.mc-confirm-body-wrapper -->\n    </div>\n    <div class=\"mc-confirm-btns\">\n        <button\n            mc-button\n            #autoFocusedButton\n            [color]=\"mcOkType\"\n            [attr.autofocus]=\"true\"\n            *ngIf=\"mcOkText !== ''\"\n            (click)=\"onClickOkCancel('ok')\">\n\n            {{ okText }}\n        </button>\n        <button mc-button color=\"second\" *ngIf=\"mcCancelText!==''\" (click)=\"onClickOkCancel('cancel')\">\n            {{ cancelText }}\n        </button>\n    </div>\n</ng-template>\n<!-- /[Predefined] Confirm Modal Content -->\n",
                encapsulation: ViewEncapsulation.None,
                host: {
                    '(keydown)': 'onKeyDown($event)'
                },
                styles: [".mc-confirm .mc-modal-close,.mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-body{padding:var(--mc-modal-confirm-size-padding,24px)}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:after,.mc-confirm-body-wrapper:before{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:var(--mc-modal-footer-size-border-radius,0 0 4px 4px);text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px}.mc-modal{box-sizing:border-box;position:relative;top:var(--mc-modal-size-top,48px);width:auto;margin:0 auto;padding:var(--mc-modal-size-padding,0 0 24px);list-style:none}.mc-modal.zoom-appear,.mc-modal.zoom-enter{-webkit-animation-duration:.3s;animation-duration:.3s;transform:none;opacity:0}.mc-modal .mc-modal-close{position:absolute;z-index:10;top:0;right:0;width:var(--mc-modal-size-close-width,56px);height:var(--mc-modal-size-close-width,56px)}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:var(--mc-modal-size-border-radius,4px);background-clip:padding-box;background-color:#fff}.mc-modal-header{display:block;border-radius:var(--mc-modal-header-size-border-radius,4px 4px 0 0);padding:var(--mc-modal-header-size-padding,14px 16px)}.mc-modal-body{display:block;overflow-y:auto;max-height:var(--mc-modal-body-size-max-height,calc(100vh - 260px));padding:var(--mc-modal-body-size-padding,16px 24px 24px);word-wrap:break-word}.mc-modal-footer{display:block;border-radius:var(--mc-modal-footer-size-border-radius,0 0 4px 4px);padding:var(--mc-modal-footer-size-padding,16px 16px);text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}"]
            },] }
];
/** @nocollapse */
McModalComponent.ctorParameters = () => [
    { type: Overlay },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: McModalControlService },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
McModalComponent.propDecorators = {
    mcModalType: [{ type: Input }],
    mcComponent: [{ type: Input }],
    mcContent: [{ type: Input }],
    mcComponentParams: [{ type: Input }],
    mcFooter: [{ type: Input }],
    mcVisible: [{ type: Input }],
    mcVisibleChange: [{ type: Output }],
    mcZIndex: [{ type: Input }],
    mcWidth: [{ type: Input }],
    mcWrapClassName: [{ type: Input }],
    mcClassName: [{ type: Input }],
    mcStyle: [{ type: Input }],
    mcTitle: [{ type: Input }],
    mcCloseByESC: [{ type: Input }],
    mcClosable: [{ type: Input }],
    mcMask: [{ type: Input }],
    mcMaskClosable: [{ type: Input }],
    mcMaskStyle: [{ type: Input }],
    mcBodyStyle: [{ type: Input }],
    mcAfterOpen: [{ type: Output }],
    mcAfterClose: [{ type: Output }],
    mcOkText: [{ type: Input }],
    mcOkType: [{ type: Input }],
    mcOkLoading: [{ type: Input }],
    mcOnOk: [{ type: Input }, { type: Output }],
    mcCancelText: [{ type: Input }],
    mcCancelLoading: [{ type: Input }],
    mcOnCancel: [{ type: Input }, { type: Output }],
    modalContainer: [{ type: ViewChild, args: ['modalContainer', { static: true },] }],
    bodyContainer: [{ type: ViewChild, args: ['bodyContainer', { read: ViewContainerRef, static: false },] }],
    autoFocusedButtons: [{ type: ViewChildren, args: ['autoFocusedButton', { read: ElementRef },] }],
    mcGetContainer: [{ type: Input }]
};
////////////
function isPromise(obj) {
    // tslint:disable-next-line: no-unbound-method
    return !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function' &&
        typeof obj.catch === 'function';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL21vZGFsL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ1ksaUJBQWlCLEVBQ2hDLFNBQVMsRUFDVCx3QkFBd0IsRUFFeEIsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFJTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFFVCxXQUFXLEVBQ1gsSUFBSSxFQUNKLFNBQVMsRUFDVCxZQUFZLEVBQ1osZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQ3RDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsSUFBSSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJNUQsd0NBQXdDO0FBQ3hDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQWExQyxNQUFNLE9BQU8sZ0JBQW1DLFNBQVEsVUFBZ0I7SUErR3BFLFlBQ1ksT0FBZ0IsRUFDaEIsUUFBbUIsRUFDbkIsR0FBNkIsRUFDN0IsVUFBc0IsRUFDdEIsYUFBK0IsRUFDL0IsWUFBbUMsRUFDbkMsY0FBaUMsRUFDZixRQUFhO1FBRXZDLEtBQUssRUFBRSxDQUFDO1FBVEEsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FB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QUFDLENBQUMsR0FBRztRQUNSLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsQ0FBQztRQUN0RCxPQUFRLEdBQW1CLENBQUMsSUFBSSxLQUFLLFVBQVU7UUFDL0MsT0FBUSxHQUFtQixDQUFDLEtBQUssS0FBSyxVQUFVLENBQUM7QUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFR5cGUsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3Q29udGFpbmVyUmVmLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jTW9kYWxDb250cm9sU2VydmljZSB9IGZyb20gJy4vbW9kYWwtY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IE1jTW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZi5jbGFzcyc7XG5pbXBvcnQgeyBtb2RhbFV0aWxPYmplY3QgYXMgTW9kYWxVdGlsIH0gZnJvbSAnLi9tb2RhbC11dGlsJztcbmltcG9ydCB7IElNb2RhbEJ1dHRvbk9wdGlvbnMsIElNb2RhbE9wdGlvbnMsIE1vZGFsVHlwZSwgT25DbGlja0NhbGxiYWNrIH0gZnJvbSAnLi9tb2RhbC50eXBlJztcblxuXG4vLyBEdXJhdGlvbiB3aGVuIHBlcmZvcm0gYW5pbWF0aW9ucyAobXMpXG5leHBvcnQgY29uc3QgTU9EQUxfQU5JTUFURV9EVVJBVElPTiA9IDIwMDtcblxudHlwZSBBbmltYXRpb25TdGF0ZSA9ICdlbnRlcicgfCAnbGVhdmUnIHwgbnVsbDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1tb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tb2RhbC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY01vZGFsQ29tcG9uZW50PFQgPSBhbnksIFIgPSBhbnk+IGV4dGVuZHMgTWNNb2RhbFJlZjxULCBSPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSU1vZGFsT3B0aW9ucyB7XG5cbiAgICBASW5wdXQoKSBtY01vZGFsVHlwZTogTW9kYWxUeXBlID0gJ2RlZmF1bHQnO1xuXG4gICAgLy8gVGhlIGluc3RhbmNlIG9mIGNvbXBvbmVudCBvcGVuZWQgaW50byB0aGUgZGlhbG9nLlxuICAgIEBJbnB1dCgpIG1jQ29tcG9uZW50OiBUeXBlPFQ+O1xuICAgIC8vIElmIG5vdCBzcGVjaWZpZWQsIHdpbGwgdXNlIDxuZy1jb250ZW50PlxuICAgIEBJbnB1dCgpIG1jQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+IHwgVHlwZTxUPjtcbiAgICAvLyBhdmFpbGFibGUgd2hlbiBtY0NvbnRlbnQgaXMgYSBjb21wb25lbnRcbiAgICBASW5wdXQoKSBtY0NvbXBvbmVudFBhcmFtczogVDtcbiAgICAvLyBEZWZhdWx0IE1vZGFsIE9OTFlcbiAgICBASW5wdXQoKSBtY0Zvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+IHwgSU1vZGFsQnV0dG9uT3B0aW9uczxUPltdO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNWaXNpYmxlKCkgeyByZXR1cm4gdGhpcy5fbWNWaXNpYmxlOyB9XG4gICAgc2V0IG1jVmlzaWJsZSh2YWx1ZSkgeyB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTsgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KCkgbWNaSW5kZXg6IG51bWJlciA9IDEwMDA7XG4gICAgQElucHV0KCkgbWNXaWR0aDogbnVtYmVyIHwgc3RyaW5nID0gNDgwO1xuICAgIEBJbnB1dCgpIG1jV3JhcENsYXNzTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jQ2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbWNTdHlsZTogb2JqZWN0O1xuICAgIEBJbnB1dCgpIG1jVGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PjtcbiAgICBASW5wdXQoKSBtY0Nsb3NlQnlFU0M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNDbG9zYWJsZSgpIHsgcmV0dXJuIHRoaXMuX21jQ2xvc2FibGU7IH1cbiAgICBzZXQgbWNDbG9zYWJsZSh2YWx1ZSkgeyB0aGlzLl9tY0Nsb3NhYmxlID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY0Nsb3NhYmxlID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jTWFzaygpIHsgcmV0dXJuIHRoaXMuX21jTWFzazsgfVxuICAgIHNldCBtY01hc2sodmFsdWUpIHsgdGhpcy5fbWNNYXNrID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY01hc2sgPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNNYXNrQ2xvc2FibGUoKSB7IHJldHVybiB0aGlzLl9tY01hc2tDbG9zYWJsZTsgfVxuICAgIHNldCBtY01hc2tDbG9zYWJsZSh2YWx1ZSkgeyB0aGlzLl9tY01hc2tDbG9zYWJsZSA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNNYXNrQ2xvc2FibGUgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIG1jTWFza1N0eWxlOiBvYmplY3Q7XG4gICAgQElucHV0KCkgbWNCb2R5U3R5bGU6IG9iamVjdDtcblxuICAgIC8vIFRyaWdnZXIgd2hlbiBtb2RhbCBvcGVuKHZpc2libGUpIGFmdGVyIGFuaW1hdGlvbnNcbiAgICBAT3V0cHV0KCkgbWNBZnRlck9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgLy8gVHJpZ2dlciB3aGVuIG1vZGFsIGxlYXZlLWFuaW1hdGlvbiBvdmVyXG4gICAgQE91dHB1dCgpIG1jQWZ0ZXJDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8Uj4oKTtcblxuICAgIC8vIC0tLSBQcmVkZWZpbmVkIE9LICYgQ2FuY2VsIGJ1dHRvbnNcbiAgICBASW5wdXQoKSBtY09rVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jT2tUeXBlID0gJ3ByaW1hcnknO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNPa0xvYWRpbmcoKSB7IHJldHVybiB0aGlzLl9tY09rTG9hZGluZzsgfVxuICAgIHNldCBtY09rTG9hZGluZyh2YWx1ZSkgeyB0aGlzLl9tY09rTG9hZGluZyA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNPa0xvYWRpbmcgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIEBPdXRwdXQoKSBtY09uT2s6IEV2ZW50RW1pdHRlcjxUPiB8IE9uQ2xpY2tDYWxsYmFjazxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcbiAgICBASW5wdXQoKSBtY0NhbmNlbFRleHQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jQ2FuY2VsTG9hZGluZygpIHsgcmV0dXJuIHRoaXMuX21jQ2FuY2VsTG9hZGluZzsgfVxuICAgIHNldCBtY0NhbmNlbExvYWRpbmcodmFsdWUpIHsgdGhpcy5fbWNDYW5jZWxMb2FkaW5nID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY0NhbmNlbExvYWRpbmcgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIEBPdXRwdXQoKSBtY09uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8VD4gfCBPbkNsaWNrQ2FsbGJhY2s8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdtb2RhbENvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIG1vZGFsQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2JvZHlDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogZmFsc2UgfSkgYm9keUNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAgICAvLyBPbmx5IGFpbSB0byBmb2N1cyB0aGUgb2sgYnV0dG9uIHRoYXQgbmVlZHMgdG8gYmUgYXV0byBmb2N1c2VkXG4gICAgQFZpZXdDaGlsZHJlbignYXV0b0ZvY3VzZWRCdXR0b24nLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgYXV0b0ZvY3VzZWRCdXR0b25zOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgICBtYXNrQW5pbWF0aW9uQ2xhc3NNYXA6IG9iamVjdDtcbiAgICBtb2RhbEFuaW1hdGlvbkNsYXNzTWFwOiBvYmplY3Q7XG4gICAgLy8gVGhlIG9yaWdpbiBwb2ludCB0aGF0IGFuaW1hdGlvbiBiYXNlZCBvblxuICAgIHRyYW5zZm9ybU9yaWdpbiA9ICcwcHggMHB4IDBweCc7XG5cbiAgICAvLyBPYnNlcnZhYmxlIGFsaWFzIGZvciBtY0FmdGVyT3BlblxuICAgIGdldCBhZnRlck9wZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jQWZ0ZXJPcGVuLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8vIE9ic2VydmFibGUgYWxpYXMgZm9yIG1jQWZ0ZXJDbG9zZVxuICAgIGdldCBhZnRlckNsb3NlKCk6IE9ic2VydmFibGU8Uj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tY0FmdGVyQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IG9rVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5tY09rVGV4dDtcbiAgICB9XG5cbiAgICBnZXQgY2FuY2VsVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5tY0NhbmNlbFRleHQ7XG4gICAgfVxuXG4gICAgLy8gSW5kaWNhdGUgd2hldGhlciB0aGlzIGRpYWxvZyBzaG91bGQgaGlkZGVuXG4gICAgZ2V0IGhpZGRlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLm1jVmlzaWJsZSAmJiAhdGhpcy5hbmltYXRpb25TdGF0ZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIHJlZmVyZW5jZSB3aGVuIHVzaW5nIG1jQ29udGVudCBhcyBDb21wb25lbnRcbiAgICBwcml2YXRlIGNvbnRlbnRDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxUPjtcbiAgICAvLyBDdXJyZW50IGFuaW1hdGlvbiBzdGF0ZVxuICAgIHByaXZhdGUgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlO1xuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCB8IE92ZXJsYXlSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIG1vZGFsQ29udHJvbDogTWNNb2RhbENvbnRyb2xTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgbWNHZXRDb250YWluZXI6IEhUTUxFbGVtZW50IHwgT3ZlcmxheVJlZiB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IE92ZXJsYXlSZWYpID0gKCkgPT4gdGhpcy5vdmVybGF5LmNyZWF0ZSgpO1xuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGNvbXBvbmVudCBhbG9uZyB3aXRob3V0IFZpZXdcbiAgICAgICAgaWYgKHRoaXMuaXNDb21wb25lbnQodGhpcy5tY0NvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUR5bmFtaWNDb21wb25lbnQodGhpcy5tY0NvbnRlbnQgYXMgVHlwZTxUPik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR1cCBkZWZhdWx0IGJ1dHRvbiBvcHRpb25zXG4gICAgICAgIGlmICh0aGlzLmlzTW9kYWxCdXR0b25zKHRoaXMubWNGb290ZXIpKSB7XG4gICAgICAgICAgICB0aGlzLm1jRm9vdGVyID0gdGhpcy5mb3JtYXRNb2RhbEJ1dHRvbnModGhpcy5tY0Zvb3RlciBhcyBJTW9kYWxCdXR0b25PcHRpb25zPFQ+W10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDb21wb25lbnQodGhpcy5tY0NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHluYW1pY0NvbXBvbmVudCh0aGlzLm1jQ29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBtb2RhbCBkb20gdG8gZWxzZXdoZXJlXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdHlwZW9mIHRoaXMubWNHZXRDb250YWluZXIgPT09ICdmdW5jdGlvbicgPyB0aGlzLm1jR2V0Q29udGFpbmVyKCkgOiB0aGlzLm1jR2V0Q29udGFpbmVyO1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikge1xuICAgICAgICAgICAgLy8gTk9URTogb25seSBhdHRhY2ggdGhlIGRvbSB0byBvdmVybGF5LCB0aGUgdmlldyBjb250YWluZXIgaXMgbm90IGNoYW5nZWQgYWN0dWFsbHlcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm92ZXJsYXlFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZ2lzdGVyIG1vZGFsIHdoZW4gYWZ0ZXJPcGVuL2FmdGVyQ2xvc2UgaXMgc3RhYmxlXG4gICAgICAgIHRoaXMubW9kYWxDb250cm9sLnJlZ2lzdGVyTW9kYWwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gW05PVEVdIE5PVCBhdmFpbGFibGUgd2hlbiB1c2luZyBieSBzZXJ2aWNlIVxuICAgIC8vIEJlY2F1c2UgbmdPbkNoYW5nZXMgbmV2ZXIgYmUgY2FsbGVkIHdoZW4gdXNpbmcgYnkgc2VydmljZSxcbiAgICAvLyBoZXJlIHdlIGNhbid0IHN1cHBvcnQgXCJtY0NvbnRlbnRcIihDb21wb25lbnQpIGV0Yy4gYXMgaW5wdXRzIHRoYXQgaW5pdGlhbGl6ZWQgZHluYW1pY2FsbHkuXG4gICAgLy8gQlVUOiBVc2VyIGFsc28gY2FuIGNoYW5nZSBcIm1jQ29udGVudFwiIGR5bmFtaWNhbGx5IHRvIHRyaWdnZXIgVUkgY2hhbmdlc1xuICAgIC8vIChwcm92aWRlZCB5b3UgZG9uJ3QgdXNlIFxiQ29tcG9uZW50IHRoYXQgbmVlZHMgaW5pdGlhbGl6YXRpb25zKVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBEbyBub3QgdHJpZ2dlciBhbmltYXRpb24gd2hpbGUgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVZpc2libGVTdGF0ZUNoYW5nZSh0aGlzLm1jVmlzaWJsZSwgIWNoYW5nZXMubWNWaXNpYmxlLmZpcnN0Q2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gSWYgdXNpbmcgQ29tcG9uZW50LCBpdCBpcyB0aGUgdGltZSB0byBhdHRhY2ggVmlldyB3aGlsZSBib2R5Q29udGFpbmVyIGlzIHJlYWR5XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keUNvbnRhaW5lci5pbnNlcnQodGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgYXV0b0ZvY3VzZWRCdXR0b24gb2YgdGhpcy5hdXRvRm9jdXNlZEJ1dHRvbnMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAoYXV0b0ZvY3VzZWRCdXR0b24ubmF0aXZlRWxlbWVudC5hdXRvZm9jdXMpIHtcbiAgICAgICAgICAgICAgICAoYXV0b0ZvY3VzZWRCdXR0b24ubmF0aXZlRWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuZm9jdXMoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmlzaWJsZUZyb21JbnNpZGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xvc2UocmVzdWx0PzogUikge1xuICAgICAgICB0aGlzLmNoYW5nZVZpc2libGVGcm9tSW5zaWRlKGZhbHNlLCByZXN1bHQpO1xuICAgIH1cblxuICAgIC8vIERlc3Ryb3kgZXF1YWxzIENsb3NlXG4gICAgZGVzdHJveShyZXN1bHQ/OiBSKSB7XG4gICAgICAgIHRoaXMuY2xvc2UocmVzdWx0KTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdHJpZ2dlck9rKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnb2snKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgfVxuXG4gICAgZ2V0SW5zdGFuY2UoKTogTWNNb2RhbENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRDb21wb25lbnRSZWYoKTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudENvbXBvbmVudFJlZjtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50Q29tcG9uZW50KCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50Q29tcG9uZW50UmVmICYmIHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZiAmJiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBvbkNsaWNrTWFzaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5tY01hc2sgJiZcbiAgICAgICAgICAgIHRoaXMubWNNYXNrQ2xvc2FibGUgJiZcbiAgICAgICAgICAgICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ21jLW1vZGFsLXdyYXAnKSAmJlxuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgaXNNb2RhbFR5cGUodHlwZTogTW9kYWxUeXBlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jTW9kYWxUeXBlID09PSB0eXBlO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvbiAua2V5IGlzbid0IHN1cHBvcnRlZCBpbiBFZGdlXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250YWluZXIgJiYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikpIHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIG9uQ2xpY2tDbG9zZUJ0bigpIHtcbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgb25DbGlja09rQ2FuY2VsKHR5cGU6ICdvaycgfCAnY2FuY2VsJykge1xuICAgICAgICBjb25zdCB0cmlnZ2VyID0geyBvazogdGhpcy5tY09uT2ssIGNhbmNlbDogdGhpcy5tY09uQ2FuY2VsIH1bdHlwZV07XG4gICAgICAgIGNvbnN0IGxvYWRpbmdLZXkgPSB7IG9rOiAnbWNPa0xvYWRpbmcnLCBjYW5jZWw6ICdtY0NhbmNlbExvYWRpbmcnIH1bdHlwZV07XG5cbiAgICAgICAgaWYgKHRyaWdnZXIgaW5zdGFuY2VvZiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgIHRyaWdnZXIuZW1pdCh0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyaWdnZXIgPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJpZ2dlcih0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICAgICAgICAvLyBVc2VycyBjYW4gcmV0dXJuIFwiZmFsc2VcIiB0byBwcmV2ZW50IGNsb3NpbmcgYnkgZGVmYXVsdFxuICAgICAgICAgICAgY29uc3QgY2FzZUNsb3NlID0gKGRvQ2xvc2U6IGJvb2xlYW4gfCB2b2lkIHwge30pID0+IChkb0Nsb3NlICE9PSBmYWxzZSkgJiYgdGhpcy5jbG9zZShkb0Nsb3NlIGFzIFIpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2xvYWRpbmdLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVUaGVuID0gKGRvQ2xvc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tsb2FkaW5nS2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlQ2xvc2UoZG9DbG9zZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAocmVzdWx0IGFzIFByb21pc2U8dm9pZD4pLnRoZW4oaGFuZGxlVGhlbikuY2F0Y2goaGFuZGxlVGhlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhc2VDbG9zZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgaXNOb25FbXB0eVN0cmluZyh2YWx1ZToge30pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzVGVtcGxhdGVSZWYodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzQ29tcG9uZW50KHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUeXBlO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzTW9kYWxCdXR0b25zKHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvLyBMb29rdXAgYSBidXR0b24ncyBwcm9wZXJ0eSwgaWYgdGhlIHByb3AgaXMgYSBmdW5jdGlvbiwgY2FsbCAmIHRoZW4gcmV0dXJuIHRoZSByZXN1bHQsIG90aGVyd2lzZSwgcmV0dXJuIGl0c2VsZi5cbiAgICAvLyBBb1RcbiAgICBnZXRCdXR0b25DYWxsYWJsZVByb3Aob3B0aW9uczogSU1vZGFsQnV0dG9uT3B0aW9uczxUPiwgcHJvcDogc3RyaW5nKToge30ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbcHJvcF07XG4gICAgICAgIGNvbnN0IGFyZ3M6IGFueVtdID0gW107XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmFwcGx5KG9wdGlvbnMsIGFyZ3MpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gT24gbWNGb290ZXIncyBtb2RhbCBidXR0b24gY2xpY2tcbiAgICAvLyBBb1RcbiAgICBvbkJ1dHRvbkNsaWNrKGJ1dHRvbjogSU1vZGFsQnV0dG9uT3B0aW9uczxUPikge1xuICAgICAgICAvLyBDYWxsIG9uQ2xpY2sgZGlyZWN0bHlcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWluZmVycmVkLWVtcHR5LW9iamVjdC10eXBlICBydWxlIHNlZW1zIHRvIGJlIGJyb2tlblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldEJ1dHRvbkNhbGxhYmxlUHJvcChidXR0b24sICdvbkNsaWNrJyk7XG4gICAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgYnV0dG9uLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgKHJlc3VsdCBhcyBQcm9taXNlPHt9PikudGhlbigoKSA9PiBidXR0b24ubG9hZGluZyA9IGZhbHNlKS5jYXRjaCgoKSA9PiBidXR0b24ubG9hZGluZyA9IGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvIHJlc3QgdGhpbmdzIHdoZW4gdmlzaWJsZSBzdGF0ZSBjaGFuZ2VkXG4gICAgcHJpdmF0ZSBoYW5kbGVWaXNpYmxlU3RhdGVDaGFuZ2UodmlzaWJsZTogYm9vbGVhbiwgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZSwgY2xvc2VSZXN1bHQ/OiBSKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgLy8gSGlkZSBzY3JvbGxiYXIgYXQgdGhlIGZpcnN0IHRpbWUgd2hlbiBzaG93biB1cFxuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VCb2R5T3ZlcmZsb3coMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgLnJlc29sdmUoYW5pbWF0aW9uICYmIHRoaXMuYW5pbWF0ZVRvKHZpc2libGUpKVxuICAgICAgICAgICAgLy8gRW1pdCBvcGVuL2Nsb3NlIGV2ZW50IGFmdGVyIGFuaW1hdGlvbnMgb3ZlclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNBZnRlck9wZW4uZW1pdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNBZnRlckNsb3NlLmVtaXQoY2xvc2VSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBTaG93L2hpZGUgc2Nyb2xsYmFyIHdoZW4gYW5pbWF0aW9uIGlzIG92ZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VCb2R5T3ZlcmZsb3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDaGFuZ2UgbWNWaXNpYmxlIGZyb20gaW5zaWRlXG4gICAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmxlRnJvbUluc2lkZSh2aXNpYmxlOiBib29sZWFuLCBjbG9zZVJlc3VsdD86IFIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgbWNWaXNpYmxlIHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IHZpc2libGU7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVWaXNpYmxlU3RhdGVDaGFuZ2UodmlzaWJsZSwgdHJ1ZSwgY2xvc2VSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQW5pbWF0aW9uU3RhdGUoc3RhdGU6IEFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tBbmltYXRpb25DbGFzc01hcCA9IHtcbiAgICAgICAgICAgICAgICBbYGZhZGUtJHtzdGF0ZX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBbYGZhZGUtJHtzdGF0ZX0tYWN0aXZlYF06IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSB7XG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9LWFjdGl2ZWBdOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5tYXNrQW5pbWF0aW9uQ2xhc3NNYXAgPSB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudENvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYW5pbWF0ZVRvKGlzVmlzaWJsZTogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGxhc3Rlc3QgY2xpY2sgcG9zaXRpb24gd2hlbiBzaG93cyB1cFxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBbTk9URV0gVXNpbmcgdGltZW91dCBkdWUgdG8gdGhlIGRvY3VtZW50LmNsaWNrIGV2ZW50IGlzIGZpcmVkIGxhdGVyIHRoYW4gdmlzaWJsZSBjaGFuZ2UsXG4gICAgICAgICAgICAvLyBzbyBpZiBub3QgcG9zdHBvbmVkIHRvIG5leHQgZXZlbnQtbG9vcCwgd2UgY2FuJ3QgZ2V0IHRoZSBsYXN0ZXN0IGNsaWNrIHBvc2l0aW9uXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRyYW5zZm9ybU9yaWdpbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlQW5pbWF0aW9uU3RhdGUoaXNWaXNpYmxlID8gJ2VudGVyJyA6ICdsZWF2ZScpO1xuXG4gICAgICAgIC8vIFJldHVybiB3aGVuIGFuaW1hdGlvbiBpcyBvdmVyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBbmltYXRpb25TdGF0ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgTU9EQUxfQU5JTUFURV9EVVJBVElPTlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb3JtYXRNb2RhbEJ1dHRvbnMoYnV0dG9uczogSU1vZGFsQnV0dG9uT3B0aW9uczxUPltdKTogSU1vZGFsQnV0dG9uT3B0aW9uczxUPltdIHtcbiAgICAgICAgcmV0dXJuIGJ1dHRvbnMubWFwKChidXR0b24pID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi57XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogJ2RlZmF1bHQnLFxuICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLi4uYnV0dG9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb21wb25lbnQgZHluYW1pY2FsbHkgYnV0IG5vdCBhdHRhY2ggdG8gYW55IFZpZXdcbiAgICAgKiAodGhpcyBhY3Rpb24gd2lsbCBiZSBleGVjdXRlZCB3aGVuIGJvZHlDb250YWluZXIgaXMgcmVhZHkpXG4gICAgICogQHBhcmFtIGNvbXBvbmVudCBDb21wb25lbnQgY2xhc3NcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUR5bmFtaWNDb21wb25lbnQoY29tcG9uZW50OiBUeXBlPFQ+KSB7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgICBjb25zdCBjaGlsZEluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBNY01vZGFsUmVmLCB1c2VWYWx1ZTogdGhpc31dLFxuICAgICAgICAgICAgcGFyZW50OiB0aGlzLnZpZXdDb250YWluZXIuaW5qZWN0b3JcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmID0gZmFjdG9yeS5jcmVhdGUoY2hpbGRJbmplY3Rvcik7XG5cbiAgICAgICAgaWYgKHRoaXMubWNDb21wb25lbnRQYXJhbXMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmluc3RhbmNlLCB0aGlzLm1jQ29tcG9uZW50UGFyYW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvIHRoZSBmaXJzdCBjaGFuZ2UgZGV0ZWN0aW9uIGltbWVkaWF0ZWx5XG4gICAgICAgIC8vIChvciB3ZSBkbyBkZXRlY3Rpb24gYXQgbmdBZnRlclZpZXdJbml0LCBtdWx0aS1jaGFuZ2VzIGVycm9yIHdpbGwgYmUgdGhyb3duKVxuICAgICAgICB0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0cmFuc2Zvcm0tb3JpZ2luIHRvIHRoZSBsYXN0IGNsaWNrIHBvc2l0aW9uIG9uIGRvY3VtZW50XG4gICAgcHJpdmF0ZSB1cGRhdGVUcmFuc2Zvcm1PcmlnaW4oKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsRWxlbWVudCA9IHRoaXMubW9kYWxDb250YWluZXIubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgbGFzdFBvc2l0aW9uID0gTW9kYWxVdGlsLmdldExhc3RDbGlja1Bvc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKGxhc3RQb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcmlnaW4gPSBgJHtsYXN0UG9zaXRpb24ueCAtIG1vZGFsRWxlbWVudC5vZmZzZXRMZWZ0fXB4ICR7bGFzdFBvc2l0aW9uLnkgLSBtb2RhbEVsZW1lbnQub2Zmc2V0VG9wfXB4IDBweGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUYWtlIGNhcmUgb2YgdGhlIGJvZHkncyBvdmVyZmxvdyB0byBkZWNpZGUgdGhlIGV4aXN0ZW5zZSBvZiBzY3JvbGxiYXJcbiAgICAgKiBAcGFyYW0gcGx1c051bSBUaGUgbnVtYmVyIHRoYXQgdGhlIG9wZW5Nb2RhbHMubGVuZ3RoIHdpbGwgaW5jcmVhc2Ugc29vblxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlQm9keU92ZXJmbG93KHBsdXNOdW06IG51bWJlciA9IDApIHtcbiAgICAgICAgY29uc3Qgb3Blbk1vZGFscyA9IHRoaXMubW9kYWxDb250cm9sLm9wZW5Nb2RhbHM7XG5cbiAgICAgICAgaWYgKG9wZW5Nb2RhbHMubGVuZ3RoICsgcGx1c051bSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kb2N1bWVudC5ib2R5LCAnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vL1xuXG5mdW5jdGlvbiBpc1Byb21pc2Uob2JqOiB7fSB8IHZvaWQpOiBib29sZWFuIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuYm91bmQtbWV0aG9kXG4gICAgcmV0dXJuICEhb2JqICYmXG4gICAgICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgICAgICB0eXBlb2YgKG9iaiBhcyBQcm9taXNlPHt9PikudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICB0eXBlb2YgKG9iaiBhcyBQcm9taXNlPHt9PikuY2F0Y2ggPT09ICdmdW5jdGlvbic7XG59XG4iXX0=
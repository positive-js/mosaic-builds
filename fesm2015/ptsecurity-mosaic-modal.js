import { OverlayRef, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Injectable, Optional, SkipSelf, EventEmitter, TemplateRef, Type, Injector, Component, ViewEncapsulation, Renderer2, ComponentFactoryResolver, ElementRef, ViewContainerRef, ChangeDetectorRef, Inject, Input, Output, ViewChild, ViewChildren, Pipe, Directive, NgModule } from '@angular/core';
import { ESCAPE, ENTER } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
import { A11yModule } from '@angular/cdk/a11y';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { ComponentPortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators';

class McModalControlService {
    constructor(parentService) {
        this.parentService = parentService;
        // @ts-ignore
        this.rootOpenModals = this.parentService ? null : [];
        // @ts-ignore
        this.rootAfterAllClose = this.parentService ? null : new Subject();
        // @ts-ignore
        this.rootRegisteredMetaMap = this.parentService ? null : new Map();
    }
    // Track singleton afterAllClose through over the injection tree
    get afterAllClose() {
        return this.parentService ? this.parentService.afterAllClose : this.rootAfterAllClose;
    }
    // Track singleton openModals array through over the injection tree
    get openModals() {
        return this.parentService ? this.parentService.openModals : this.rootOpenModals;
    }
    // Registered modal for later usage
    get registeredMetaMap() {
        return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
    }
    // Register a modal to listen its open/close
    registerModal(modalRef) {
        if (!this.hasRegistered(modalRef)) {
            const afterOpenSubscription = modalRef.afterOpen.subscribe(() => this.openModals.push(modalRef));
            const afterCloseSubscription = modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));
            this.registeredMetaMap.set(modalRef, { modalRef, afterOpenSubscription, afterCloseSubscription });
        }
    }
    hasRegistered(modalRef) {
        return this.registeredMetaMap.has(modalRef);
    }
    // Close all registered opened modals
    closeAll() {
        let i = this.openModals.length;
        while (i--) {
            this.openModals[i].close();
        }
    }
    removeOpenModal(modalRef) {
        const index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this.afterAllClose.next();
            }
        }
    }
}
McModalControlService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
McModalControlService.ctorParameters = () => [
    { type: McModalControlService, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

/**
 * API class that public to users to handle the modal instance.
 * McModalRef is aim to avoid accessing to the modal instance directly by users.
 */
// tslint:disable-next-line:naming-convention
class McModalRef {
}

class ModalUtil {
    constructor(document) {
        this.document = document;
        this.lastPosition = { x: -1, y: -1 };
        this.listenDocumentClick();
    }
    getLastClickPosition() {
        return this.lastPosition;
    }
    listenDocumentClick() {
        this.document.addEventListener('click', (event) => {
            this.lastPosition = { x: event.clientX, y: event.clientY };
        });
    }
}
const modalUtilObject = new ModalUtil(document);

// Duration when perform animations (ms)
const MODAL_ANIMATE_DURATION = 200;
class McModalComponent extends McModalRef {
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
        var _a;
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        (_a = this.getElement().getElementsByTagName('button')[0]) === null || _a === void 0 ? void 0 : _a.focus();
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
    getMcFooter() {
        return this.getElement().getElementsByClassName('mc-modal-footer').item(0);
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
        var _a;
        // tslint:disable-next-line:deprecation .key isn't supported in Edge
        if (event.keyCode === ESCAPE && this.container && (this.container instanceof OverlayRef)) {
            this.close();
            event.preventDefault();
        }
        // tslint:disable-next-line:deprecation .key isn't supported in Edge
        if (event.ctrlKey && event.keyCode === ENTER) {
            if (this.mcModalType === 'confirm') {
                this.triggerOk();
            }
            (_a = this.getElement().querySelector('[mc-modal-main-action]')) === null || _a === void 0 ? void 0 : _a.click();
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
        const lastPosition = modalUtilObject.getLastClickPosition();
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
                template: "<!-- Compatible: the <ng-content> can appear only once -->\n<ng-template #tplOriginContent>\n    <ng-content></ng-content>\n</ng-template>\n\n<div>\n    <div *ngIf=\"mcMask\"\n         class=\"mc-modal-mask\"\n         [ngClass]=\"maskAnimationClassMap\"\n         [class.mc-modal-mask-hidden]=\"hidden\"\n         [ngStyle]=\"mcMaskStyle\"\n         [style.zIndex]=\"mcZIndex\"\n    ></div>\n    <div\n        (mousedown)=\"onClickMask($event)\"\n        class=\"mc-modal-wrap {{ mcWrapClassName }}\"\n        [style.zIndex]=\"mcZIndex\"\n        [style.display]=\"hidden ? 'none' : ''\"\n        tabindex=\"-1\"\n        role=\"dialog\"\n    >\n        <div #modalContainer\n             class=\"mc-modal {{ mcClassName }}\"\n             [ngClass]=\"modalAnimationClassMap\"\n             [ngStyle]=\"mcStyle\"\n             [style.width]=\"mcWidth | toCssUnit\"\n             [style.transform-origin]=\"transformOrigin\"\n             role=\"document\"\n        >\n            <div class=\"mc-modal-content\" cdkTrapFocus>\n                <button *ngIf=\"mcClosable\"\n                        mc-button\n                        (click)=\"onClickCloseBtn()\"\n                        class=\"mc-modal-close mc-button_transparent\"\n                        aria-label=\"Close\">\n                    <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" [color]=\"'second'\"></i>\n                </button>\n                <ng-container [ngSwitch]=\"true\">\n                    <ng-container *ngSwitchCase=\"isModalType('default')\"\n                                  [ngTemplateOutlet]=\"tplContentDefault\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('confirm')\"\n                                  [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('custom')\"\n                                  [ngTemplateOutlet]=\"tplContentCustom\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template #tplContentCustom>\n    <ng-container #bodyContainer></ng-container>\n</ng-template>\n\n\n<!-- [Predefined] Default Modal Content -->\n<ng-template #tplContentDefault>\n    <div *ngIf=\"mcTitle\" class=\"mc-modal-header\">\n        <div class=\"mc-modal-title\">\n            <ng-container [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"mcTitle\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\">\n                    <div [innerHTML]=\"mcTitle\"></div>\n                </ng-container>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <ng-container #bodyContainer>\n            <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                    <div [innerHTML]=\"mcContent\"></div>\n                </ng-container>\n                <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\">\n        <ng-container [ngSwitch]=\"true\">\n            <ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container>\n            <ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\">\n                <ng-container *ngFor=\"let button of mcFooter\">\n                    <button\n                        mc-button\n                        #autoFocusedButton\n                        [attr.autofocus]=\"button.autoFocus\"\n                        [attr.mc-modal-main-action]=\"button.mcModalMainAction\"\n                        *ngIf=\"getButtonCallableProp(button, 'show')\"\n                        [disabled]=\"getButtonCallableProp(button, 'disabled')\"\n                        [class.mc-progress]=\"getButtonCallableProp(button, 'loading')\"\n                        (click)=\"onButtonClick(button)\"\n                        [color]=\"button.type\">\n                        {{ button.label }}\n                    </button>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n                <button\n                    #autoFocusedButton\n                    [attr.autofocus]=\"true\"\n                    *ngIf=\"mcOkText !== null\"\n                    mc-button\n                    [color]=\"'primary'\"\n                    (click)=\"onClickOkCancel('ok')\">\n\n                    {{ okText }}\n                </button>\n                <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">\n                    {{ cancelText }}\n                </button>\n            </ng-container>\n        </ng-container>\n    </div>\n</ng-template>\n<!-- /[Predefined] Default Modal Content -->\n\n<!-- [Predefined] Confirm Modal Content -->\n<ng-template #tplContentConfirm>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <div class=\"mc-confirm-body-wrapper\">\n            <div class=\"mc-confirm-body\">\n                <div class=\"mc-confirm-content\">\n                    <ng-container #bodyContainer>\n                        <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                            <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\"\n                                          [ngTemplateOutlet]=\"mcContent\"></ng-container>\n                            <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                                <div [innerHTML]=\"mcContent\"></div>\n                            </ng-container>\n                            <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n                        </ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div> <!-- /.mc-confirm-body-wrapper -->\n    </div>\n    <div class=\"mc-confirm-btns\">\n        <button\n            mc-button\n            #autoFocusedButton\n            [color]=\"mcOkType\"\n            [attr.autofocus]=\"true\"\n            *ngIf=\"mcOkText !== ''\"\n            (click)=\"onClickOkCancel('ok')\">\n\n            {{ okText }}\n        </button>\n        <button mc-button [color]=\"'second'\" *ngIf=\"mcCancelText!==''\" (click)=\"onClickOkCancel('cancel')\">\n            {{ cancelText }}\n        </button>\n    </div>\n</ng-template>\n<!-- /[Predefined] Confirm Modal Content -->\n",
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

class CssUnitPipe {
    transform(value, defaultUnit = 'px') {
        const formatted = +value;
        return isNaN(formatted) ? `${value}` : `${formatted}${defaultUnit}`;
    }
}
CssUnitPipe.decorators = [
    { type: Pipe, args: [{
                name: 'toCssUnit'
            },] }
];

class McModalTitle {
}
McModalTitle.decorators = [
    { type: Directive, args: [{
                selector: `[mc-modal-title], mc-modal-title, [mcModalTitle]`,
                host: {
                    class: 'mc-modal-header mc-modal-title'
                }
            },] }
];
class McModalBody {
}
McModalBody.decorators = [
    { type: Directive, args: [{
                selector: `[mc-modal-body], mc-modal-body, [mcModalBody]`,
                host: {
                    class: 'mc-modal-body'
                }
            },] }
];
class McModalFooter {
}
McModalFooter.decorators = [
    { type: Directive, args: [{
                selector: `[mc-modal-footer], mc-modal-footer, [mcModalFooter]`,
                host: {
                    class: 'mc-modal-footer'
                }
            },] }
];
class McModalMainAction {
}
McModalMainAction.decorators = [
    { type: Directive, args: [{
                selector: `[mc-modal-main-action]`
            },] }
];

// A builder used for managing service creating modals
class ModalBuilderForService {
    constructor(overlay, options = {}) {
        this.overlay = overlay;
        this.createModal();
        if (!('mcGetContainer' in options)) {
            options.mcGetContainer = undefined;
        }
        this.changeProps(options);
        this.modalRef.instance.open();
        this.modalRef.instance.mcAfterClose.subscribe(() => this.destroyModal());
        this.overlayRef.keydownEvents()
            // @ts-ignore
            .pipe(filter((event) => {
            // tslint:disable-next-line:deprecation replacement .key isn't supported in Edge
            return event.keyCode === ESCAPE && options.mcCloseByESC;
        }))
            .subscribe(() => this.modalRef.instance.close());
    }
    getInstance() {
        return this.modalRef && this.modalRef.instance;
    }
    destroyModal() {
        if (this.modalRef) {
            this.overlayRef.dispose();
            this.modalRef = null;
        }
    }
    changeProps(options) {
        if (this.modalRef) {
            // here not limit user's inputs at runtime
            Object.assign(this.modalRef.instance, options);
        }
    }
    // Create component to ApplicationRef
    createModal() {
        this.overlayRef = this.overlay.create();
        this.modalRef = this.overlayRef.attach(new ComponentPortal(McModalComponent));
    }
}
class McModalService {
    constructor(overlay, modalControl) {
        this.overlay = overlay;
        this.modalControl = modalControl;
    }
    // Track of the current close modals (we assume invisible is close this time)
    get openModals() {
        return this.modalControl.openModals;
    }
    get afterAllClose() {
        return this.modalControl.afterAllClose.asObservable();
    }
    // Closes all of the currently-open dialogs
    closeAll() {
        this.modalControl.closeAll();
    }
    create(options = {}) {
        if (typeof options.mcOnCancel !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnCancel = () => { };
        }
        if (!('mcCloseByESC' in options)) {
            options.mcCloseByESC = true;
        }
        if (!('mcWidth' in options)) {
            // tslint:disable-next-line
            options.mcWidth = 480;
        }
        return new ModalBuilderForService(this.overlay, options).getInstance();
    }
    confirm(options = {}, confirmType = 'confirm') {
        if ('mcFooter' in options) {
            console.warn(`The Confirm-Modal doesn't support "mcFooter", this property will be ignored.`);
        }
        // NOTE: only support function currently by calling confirm()
        if (typeof options.mcOnOk !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnOk = () => { };
        }
        options.mcModalType = 'confirm';
        options.mcClassName = `mc-confirm mc-confirm-${confirmType} ${options.mcClassName || ''}`;
        return this.create(options);
    }
    open(options = {}) {
        options.mcModalType = 'custom';
        return this.create(options);
    }
    success(options = {}) {
        return this.simpleConfirm(options, 'success');
    }
    // tslint:disable-next-line: no-reserved-keywords
    delete(options = {}) {
        return this.simpleConfirm(options, 'warn');
    }
    simpleConfirm(options = {}, confirmType) {
        // Remove the Cancel button if the user not specify a Cancel button
        if (!('mcCancelText' in options)) {
            // @ts-ignore
            options.mcCancelText = null;
        }
        return this.confirm(options, confirmType);
    }
}
McModalService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
McModalService.ctorParameters = () => [
    { type: Overlay },
    { type: McModalControlService }
];

class McModalModule {
}
McModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, OverlayModule, A11yModule, McButtonModule, McIconModule],
                exports: [
                    McModalComponent,
                    McModalTitle,
                    McModalBody,
                    McModalFooter
                ],
                declarations: [
                    McModalComponent,
                    McModalTitle,
                    McModalBody,
                    McModalFooter,
                    CssUnitPipe,
                    McModalMainAction
                ],
                entryComponents: [McModalComponent],
                providers: [McModalControlService, McModalService]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McModalBody, McModalComponent, McModalFooter, McModalMainAction, McModalModule, McModalRef, McModalService, McModalTitle, McModalControlService as ɵa, CssUnitPipe as ɵb };
//# sourceMappingURL=ptsecurity-mosaic-modal.js.map

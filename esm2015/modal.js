/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Injectable, Optional, SkipSelf, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Injector, Input, Output, Renderer2, TemplateRef, Type, ViewChild, ViewContainerRef, ViewEncapsulation, Pipe, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, CommonModule } from '@angular/common';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { McMeasureScrollbarService } from '@ptsecurity/mosaic/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators';
import { A11yModule } from '@angular/cdk/a11y';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McModalControlService {
    /**
     * @param {?} parentService
     */
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
    /**
     * @return {?}
     */
    get afterAllClose() {
        return this.parentService ? this.parentService.afterAllClose : (/** @type {?} */ (this.rootAfterAllClose));
    }
    // Track singleton openModals array through over the injection tree
    /**
     * @return {?}
     */
    get openModals() {
        return this.parentService ? this.parentService.openModals : (/** @type {?} */ (this.rootOpenModals));
    }
    // Registered modal for later usage
    /**
     * @private
     * @return {?}
     */
    get registeredMetaMap() {
        return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
    }
    // Register a modal to listen its open/close
    /**
     * @param {?} modalRef
     * @return {?}
     */
    registerModal(modalRef) {
        if (!this.hasRegistered(modalRef)) {
            /** @type {?} */
            const afterOpenSubscription = modalRef.afterOpen.subscribe((/**
             * @return {?}
             */
            () => this.openModals.push(modalRef)));
            /** @type {?} */
            const afterCloseSubscription = modalRef.afterClose.subscribe((/**
             * @return {?}
             */
            () => this.removeOpenModal(modalRef)));
            this.registeredMetaMap.set(modalRef, { modalRef, afterOpenSubscription, afterCloseSubscription });
        }
    }
    /**
     * @param {?} modalRef
     * @return {?}
     */
    hasRegistered(modalRef) {
        return this.registeredMetaMap.has(modalRef);
    }
    // Close all registered opened modals
    /**
     * @return {?}
     */
    closeAll() {
        /** @type {?} */
        let i = this.openModals.length;
        while (i--) {
            this.openModals[i].close();
        }
    }
    /**
     * @private
     * @param {?} modalRef
     * @return {?}
     */
    removeOpenModal(modalRef) {
        /** @type {?} */
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
    { type: Injectable },
];
/** @nocollapse */
McModalControlService.ctorParameters = () => [
    { type: McModalControlService, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * API class that public to users to handle the modal instance.
 * McModalRef is aim to avoid accessing to the modal instance directly by users.
 * @abstract
 * @template T, R
 */
class McModalRef {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModalUtil {
    /**
     * @param {?} document
     */
    constructor(document) {
        this.document = document;
        this.lastPosition = { x: -1, y: -1 };
        this.listenDocumentClick();
    }
    /**
     * @return {?}
     */
    getLastClickPosition() {
        return this.lastPosition;
    }
    /**
     * @return {?}
     */
    listenDocumentClick() {
        this.document.addEventListener('click', (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.lastPosition = { x: event.clientX, y: event.clientY };
        }));
    }
}
var ModalUtil$1 = new ModalUtil(document);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Duration when perform animations (ms)
/** @type {?} */
const MODAL_ANIMATE_DURATION = 200;
/**
 * @template T, R
 */
class McModalComponent extends McModalRef {
    /**
     * @param {?} overlay
     * @param {?} renderer
     * @param {?} cfr
     * @param {?} elementRef
     * @param {?} viewContainer
     * @param {?} mcMeasureScrollbarService
     * @param {?} modalControl
     * @param {?} changeDetector
     * @param {?} document
     */
    constructor(overlay, renderer, cfr, elementRef, viewContainer, mcMeasureScrollbarService, modalControl, changeDetector, document) {
        super();
        this.overlay = overlay;
        this.renderer = renderer;
        this.cfr = cfr;
        this.elementRef = elementRef;
        this.viewContainer = viewContainer;
        this.mcMeasureScrollbarService = mcMeasureScrollbarService;
        this.modalControl = modalControl;
        this.changeDetector = changeDetector;
        this.document = document;
        // tslint:disable-next-line:no-any
        this.mcModalType = 'default';
        this._mcVisible = false;
        this.mcVisibleChange = new EventEmitter();
        this.mcZIndex = 1000;
        this.mcWidth = 480;
        this.mcCloseByESC = true;
        this._mcClosable = true;
        this._mcMask = true;
        this._mcMaskClosable = true;
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
        this.mcGetContainer = (/**
         * @return {?}
         */
        () => this.overlay.create());
    }
    /**
     * @return {?}
     */
    get mcVisible() { return this._mcVisible; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcVisible(value) { this._mcVisible = value; }
    /**
     * @return {?}
     */
    get mcClosable() { return this._mcClosable; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcClosable(value) { this._mcClosable = value; }
    /**
     * @return {?}
     */
    get mcMask() { return this._mcMask; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcMask(value) { this._mcMask = value; }
    /**
     * @return {?}
     */
    get mcMaskClosable() { return this._mcMaskClosable; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcMaskClosable(value) { this._mcMaskClosable = value; }
    /**
     * @return {?}
     */
    get mcOkLoading() { return this._mcOkLoading; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcOkLoading(value) { this._mcOkLoading = value; }
    /**
     * @return {?}
     */
    get mcCancelLoading() { return this._mcCancelLoading; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcCancelLoading(value) { this._mcCancelLoading = value; }
    // Observable alias for mcAfterOpen
    /**
     * @return {?}
     */
    get afterOpen() {
        return this.mcAfterOpen.asObservable();
    }
    // Observable alias for mcAfterClose
    /**
     * @return {?}
     */
    get afterClose() {
        return this.mcAfterClose.asObservable();
    }
    /**
     * @return {?}
     */
    get okText() {
        return this.mcOkText;
    }
    /**
     * @return {?}
     */
    get cancelText() {
        return this.mcCancelText;
    }
    // Indicate whether this dialog should hidden
    /**
     * @return {?}
     */
    get hidden() {
        return !this.mcVisible && !this.animationState;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Create component along without View
        if (this.isComponent(this.mcContent)) {
            this.createDynamicComponent((/** @type {?} */ (this.mcContent)));
        }
        // Setup default button options
        if (this.isModalButtons(this.mcFooter)) {
            this.mcFooter = this.formatModalButtons((/** @type {?} */ (this.mcFooter)));
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
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.mcVisible) {
            // Do not trigger animation while initializing
            this.handleVisibleStateChange(this.mcVisible, !changes.mcVisible.firstChange);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        if (this.autoFocusButtonOk) {
            ((/** @type {?} */ (this.autoFocusButtonOk.nativeElement))).focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.container instanceof OverlayRef) {
            this.container.dispose();
        }
    }
    /**
     * @return {?}
     */
    open() {
        this.changeVisibleFromInside(true);
    }
    /**
     * @param {?=} result
     * @return {?}
     */
    close(result) {
        this.changeVisibleFromInside(false, result);
    }
    // Destroy equals Close
    /**
     * @param {?=} result
     * @return {?}
     */
    destroy(result) {
        this.close(result);
    }
    /**
     * @return {?}
     */
    triggerOk() {
        this.onClickOkCancel('ok');
    }
    /**
     * @return {?}
     */
    triggerCancel() {
        this.onClickOkCancel('cancel');
    }
    /**
     * @return {?}
     */
    getInstance() {
        return this;
    }
    /**
     * @return {?}
     */
    getContentComponentRef() {
        return this.contentComponentRef;
    }
    /**
     * @return {?}
     */
    getContentComponent() {
        return this.contentComponentRef && this.contentComponentRef.instance;
    }
    /**
     * @return {?}
     */
    getElement() {
        return this.elementRef && this.elementRef.nativeElement;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClickMask($event) {
        if (this.mcMask &&
            this.mcMaskClosable &&
            ((/** @type {?} */ ($event.target))).classList.contains('mc-modal-wrap') &&
            this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    }
    // tslint:disable-next-line
    /**
     * @param {?} type
     * @return {?}
     */
    isModalType(type) {
        return this.mcModalType === type;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        if (event.keyCode === ESCAPE && this.container && (this.container instanceof OverlayRef)) {
            this.close();
            event.preventDefault();
        }
    }
    // AoT
    /**
     * @return {?}
     */
    onClickCloseBtn() {
        if (this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    }
    // AoT
    // tslint:disable-next-line
    /**
     * @param {?} type
     * @return {?}
     */
    onClickOkCancel(type) {
        /** @type {?} */
        const trigger = { ok: this.mcOnOk, cancel: this.mcOnCancel }[type];
        /** @type {?} */
        const loadingKey = { ok: 'mcOkLoading', cancel: 'mcCancelLoading' }[type];
        if (trigger instanceof EventEmitter) {
            trigger.emit(this.getContentComponent());
        }
        else if (typeof trigger === 'function') {
            /** @type {?} */
            const result = trigger(this.getContentComponent());
            // Users can return "false" to prevent closing by default
            /** @type {?} */
            const caseClose = (/**
             * @param {?} doClose
             * @return {?}
             */
            (doClose) => (doClose !== false) && this.close((/** @type {?} */ (doClose))));
            if (isPromise(result)) {
                this[loadingKey] = true;
                /** @type {?} */
                const handleThen = (/**
                 * @param {?} doClose
                 * @return {?}
                 */
                (doClose) => {
                    this[loadingKey] = false;
                    caseClose(doClose);
                });
                ((/** @type {?} */ (result))).then(handleThen).catch(handleThen);
            }
            else {
                caseClose(result);
            }
        }
    }
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    isNonEmptyString(value) {
        return typeof value === 'string' && value !== '';
    }
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    isComponent(value) {
        return value instanceof Type;
    }
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    isModalButtons(value) {
        return Array.isArray(value) && value.length > 0;
    }
    // Do rest things when visible state changed
    /**
     * @private
     * @param {?} visible
     * @param {?=} animation
     * @param {?=} closeResult
     * @return {?}
     */
    handleVisibleStateChange(visible, animation = true, closeResult) {
        // Hide scrollbar at the first time when shown up
        if (visible) {
            this.changeBodyOverflow(1);
        }
        return Promise
            .resolve(animation && this.animateTo(visible))
            // Emit open/close event after animations over
            .then((/**
         * @return {?}
         */
        () => {
            if (visible) {
                this.mcAfterOpen.emit();
            }
            else {
                this.mcAfterClose.emit(closeResult);
                // Show/hide scrollbar when animation is over
                this.changeBodyOverflow();
            }
        }));
    }
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    // tslint:disable-next-line
    /**
     * @param {?} options
     * @param {?} prop
     * @return {?}
     */
    getButtonCallableProp(options, prop) {
        /** @type {?} */
        const value = options[prop];
        /** @type {?} */
        const args = [];
        if (this.contentComponentRef) {
            args.push(this.contentComponentRef.instance);
        }
        return typeof value === 'function' ? value.apply(options, args) : value;
    }
    // On mcFooter's modal button click
    // AoT
    // tslint:disable-next-line
    /**
     * @param {?} button
     * @return {?}
     */
    onButtonClick(button) {
        // Call onClick directly
        /** @type {?} */
        const result = this.getButtonCallableProp(button, 'onClick');
        if (isPromise(result)) {
            button.loading = true;
            ((/** @type {?} */ (result))).then((/**
             * @return {?}
             */
            () => button.loading = false)).catch((/**
             * @return {?}
             */
            () => button.loading = false));
        }
    }
    // Change mcVisible from inside
    /**
     * @private
     * @param {?} visible
     * @param {?=} closeResult
     * @return {?}
     */
    changeVisibleFromInside(visible, closeResult) {
        if (this.mcVisible !== visible) {
            // Change mcVisible value immediately
            this.mcVisible = visible;
            this.mcVisibleChange.emit(visible);
            return this.handleVisibleStateChange(visible, true, closeResult);
        }
        return Promise.resolve();
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
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
    /**
     * @private
     * @param {?} isVisible
     * @return {?}
     */
    animateTo(isVisible) {
        // Figure out the lastest click position when shows up
        if (isVisible) {
            // [NOTE] Using timeout due to the document.click event is fired later than visible change,
            // so if not postponed to next event-loop, we can't get the lastest click position
            window.setTimeout((/**
             * @return {?}
             */
            () => this.updateTransformOrigin()));
        }
        this.changeAnimationState(isVisible ? 'enter' : 'leave');
        // Return when animation is over
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => window.setTimeout((/**
         * @return {?}
         */
        () => {
            this.changeAnimationState(null);
            resolve();
        }), MODAL_ANIMATE_DURATION)));
    }
    /**
     * @private
     * @param {?} buttons
     * @return {?}
     */
    formatModalButtons(buttons) {
        return buttons.map((/**
         * @param {?} button
         * @return {?}
         */
        (button) => {
            return Object.assign({
                type: 'default',
                size: 'default',
                autoLoading: true,
                show: true,
                loading: false,
                disabled: false
            }, button);
        }));
    }
    /**
     * Create a component dynamically but not attach to any View
     * (this action will be executed when bodyContainer is ready)
     * @private
     * @param {?} component Component class
     * @return {?}
     */
    createDynamicComponent(component) {
        /** @type {?} */
        const factory = this.cfr.resolveComponentFactory(component);
        /** @type {?} */
        const childInjector = Injector.create({
            providers: [{ provide: McModalRef, useValue: this }],
            parent: this.viewContainer.parentInjector
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
    /**
     * @private
     * @return {?}
     */
    updateTransformOrigin() {
        /** @type {?} */
        const modalElement = (/** @type {?} */ (this.modalContainer.nativeElement));
        /** @type {?} */
        const lastPosition = ModalUtil$1.getLastClickPosition();
        if (lastPosition) {
            // tslint:disable-next-line
            this.transformOrigin = `${lastPosition.x - modalElement.offsetLeft}px ${lastPosition.y - modalElement.offsetTop}px 0px`;
        }
    }
    /**
     * Take care of the body's overflow to decide the existense of scrollbar
     * @private
     * @param {?=} plusNum The number that the openModals.length will increase soon
     * @return {?}
     */
    changeBodyOverflow(plusNum = 0) {
        /** @type {?} */
        const openModals = this.modalControl.openModals;
        if (openModals.length + plusNum > 0) {
            // tslint:disable-next-line
            this.renderer.setStyle(this.document.body, 'padding-right', `${this.mcMeasureScrollbarService.scrollBarWidth}px`);
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        }
        else {
            this.renderer.removeStyle(this.document.body, 'padding-right');
            this.renderer.removeStyle(this.document.body, 'overflow');
        }
    }
}
McModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'mc-modal',
                template: "<ng-template #tplOriginContent><ng-content></ng-content></ng-template><div><div *ngIf=\"mcMask\" class=\"mc-modal-mask\" [ngClass]=\"maskAnimationClassMap\" [class.mc-modal-mask-hidden]=\"hidden\" [ngStyle]=\"mcMaskStyle\" [style.zIndex]=\"mcZIndex\"></div><div (click)=\"onClickMask($event)\" class=\"mc-modal-wrap {{ mcWrapClassName }}\" [style.zIndex]=\"mcZIndex\" [style.display]=\"hidden ? 'none' : ''\" tabindex=\"-1\" role=\"dialog\"><div #modalContainer class=\"mc-modal {{ mcClassName }}\" [ngClass]=\"modalAnimationClassMap\" [ngStyle]=\"mcStyle\" [style.width]=\"mcWidth | toCssUnit\" [style.transform-origin]=\"transformOrigin\" role=\"document\"><div class=\"mc-modal-content\" cdkTrapFocus><button *ngIf=\"mcClosable\" (click)=\"onClickCloseBtn()\" class=\"mc-modal-close\" aria-label=\"Close\"><span class=\"mc-modal-close-x\"><i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i></span></button><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isModalType('default')\" [ngTemplateOutlet]=\"tplContentDefault\"></ng-container><ng-container *ngSwitchCase=\"isModalType('confirm')\" [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container></ng-container></div></div></div></div><ng-template #tplContentDefault><div *ngIf=\"mcTitle\" class=\"mc-modal-header\"><div class=\"mc-modal-title\"><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"mcTitle\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\"><div [innerHTML]=\"mcTitle\"></div></ng-container></ng-container></div></div><div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\"><ng-container #bodyContainer><ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\"><div [innerHTML]=\"mcContent\"></div></ng-container><ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container></ng-container></ng-container></div><div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\"><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\"><div [innerHTML]=\"mcFooter\"></div></ng-container><ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\"><button *ngFor=\"let button of mcFooter\" mc-button [hidden]=\"!getButtonCallableProp(button, 'show')\" [disabled]=\"getButtonCallableProp(button, 'disabled')\" (click)=\"onButtonClick(button)\" [color]=\"button.type\">{{ button.label }}</button></ng-container><ng-container *ngSwitchDefault><button *ngIf=\"mcOkText!==null\" mc-button color=\"primary\" (click)=\"onClickOkCancel('ok')\">{{ okText }}</button> <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\" autofocus>{{ cancelText }}</button></ng-container></ng-container></div></ng-template><ng-template #tplContentConfirm><div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\"><div class=\"mc-confirm-body-wrapper\"><div class=\"mc-confirm-body\"><div class=\"mc-confirm-content\"><ng-container #bodyContainer><ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\"><div [innerHTML]=\"mcContent\"></div></ng-container><ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container></ng-container></ng-container></div></div></div></div><div class=\"mc-confirm-btns\"><button mc-button [color]=\"mcOkType\" #autoFocusButtonOk *ngIf=\"mcOkText !== ''\" (click)=\"onClickOkCancel('ok')\">{{ okText }}</button> <button mc-button color=\"second\" *ngIf=\"mcCancelText!==''\" (click)=\"onClickOkCancel('cancel')\" autofocus>{{ cancelText }}</button></div></ng-template>",
                styles: ["@keyframes mcFadeIn{0%{opacity:0}100%{opacity:1}}@keyframes mcFadeOut{0%{opacity:1}100%{opacity:0}}@keyframes mcZoomIn{0%{opacity:0;transform:translate(0,-25%)}100%{opacity:1;transform:scale(1)}}@keyframes mcZoomOut{0%{transform:scale(1)}100%{opacity:0;transform:translate(0,-30%)}}.fade-appear,.fade-enter{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-leave{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-appear.fade-appear-active,.fade-enter.fade-enter-active{animation-name:mcFadeIn;animation-play-state:running}.fade-leave.fade-leave-active{animation-name:mcFadeOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{opacity:0;animation-timing-function:ease-out}.className-leave{animation-timing-function:ease-out}.zoom-appear,.zoom-enter{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-leave{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-appear.zoom-appear-active,.zoom-enter.zoom-enter-active{animation-name:mcZoomIn;animation-play-state:running}.zoom-leave.zoom-leave-active{animation-name:mcZoomOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{transform:translate(0,-25%);animation-timing-function:cubic-bezier(.075,.82,.165,1)}.className-leave{transform:translate(0,0);animation-timing-function:cubic-bezier(.785,.135,.15,.86)}.mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-close{display:none}.mc-confirm .mc-modal-body{padding:24px}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:after,.mc-confirm-body-wrapper:before{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px 16px 16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;width:auto;margin:0 auto;padding:0 0 24px 0;list-style:none}.mc-modal.zoom-appear,.mc-modal.zoom-enter{animation-duration:.3s;transform:none;opacity:0}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;background-clip:padding-box;background-color:#fff}.mc-modal-close{position:absolute;z-index:10;top:0;right:0;padding:0;border:0;outline:0;cursor:pointer;background:0 0}.mc-modal-close .mc-modal-close-x{display:block;vertical-align:baseline;text-align:center;width:56px;height:56px;line-height:56px}.mc-modal-header{padding:14px 16px;border-radius:4px 4px 0 0}.mc-modal-body{padding:16px 24px 24px 24px;max-height:calc(100vh - 260px);word-wrap:break-word;overflow-y:auto}.mc-modal-footer{padding:16px 16px;border-radius:0 0 4px 4px;text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%;background-color:rgba(0,0,0,.5)}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '(keydown)': 'onKeyDown($event)'
                }
            },] },
];
/** @nocollapse */
McModalComponent.ctorParameters = () => [
    { type: Overlay },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: McMeasureScrollbarService },
    { type: McModalControlService },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
McModalComponent.propDecorators = {
    mcModalType: [{ type: Input }],
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
    modalContainer: [{ type: ViewChild, args: ['modalContainer', { static: false },] }],
    bodyContainer: [{ type: ViewChild, args: ['bodyContainer', { read: ViewContainerRef, static: false },] }],
    autoFocusButtonOk: [{ type: ViewChild, args: ['autoFocusButtonOk', { read: ElementRef, static: false },] }],
    mcGetContainer: [{ type: Input }]
};
////////////
/**
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    // tslint:disable-next-line
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof ((/** @type {?} */ (obj))).then === 'function' && typeof ((/** @type {?} */ (obj))).catch === 'function';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CssUnitPipe {
    /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    transform(value, defaultUnit = 'px') {
        /** @type {?} */
        const formatted = +value;
        return isNaN(formatted) ? `${value}` : `${formatted}${defaultUnit}`;
    }
}
CssUnitPipe.decorators = [
    { type: Pipe, args: [{
                name: 'toCssUnit'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// A builder used for managing service creating modals
class ModalBuilderForService {
    /**
     * @param {?} overlay
     * @param {?=} options
     */
    constructor(overlay, options = {}) {
        this.overlay = overlay;
        this.createModal();
        if (!('mcGetContainer' in options)) {
            options.mcGetContainer = undefined;
        }
        this.changeProps(options);
        (/** @type {?} */ (this.modalRef)).instance.open();
        (/** @type {?} */ (this.modalRef)).instance.mcAfterClose.subscribe((/**
         * @return {?}
         */
        () => this.destroyModal()));
        this.overlayRef.keydownEvents()
            // @ts-ignore
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            return event.keyCode === ESCAPE && options.mcCloseByESC;
        })))
            .subscribe((/**
         * @return {?}
         */
        () => (/** @type {?} */ (this.modalRef)).instance.close()));
    }
    /**
     * @return {?}
     */
    getInstance() {
        return this.modalRef && this.modalRef.instance;
    }
    /**
     * @return {?}
     */
    destroyModal() {
        if (this.modalRef) {
            this.overlayRef.dispose();
            this.modalRef = null;
        }
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    changeProps(options) {
        if (this.modalRef) {
            // here not limit user's inputs at runtime
            Object.assign(this.modalRef.instance, options);
        }
    }
    // Create component to ApplicationRef
    /**
     * @private
     * @return {?}
     */
    createModal() {
        this.overlayRef = this.overlay.create();
        this.modalRef = this.overlayRef.attach(new ComponentPortal(McModalComponent));
    }
}
class McModalService {
    /**
     * @param {?} overlay
     * @param {?} modalControl
     */
    constructor(overlay, modalControl) {
        this.overlay = overlay;
        this.modalControl = modalControl;
    }
    // Track of the current close modals (we assume invisible is close this time)
    /**
     * @return {?}
     */
    get openModals() {
        return this.modalControl.openModals;
    }
    /**
     * @return {?}
     */
    get afterAllClose() {
        return this.modalControl.afterAllClose.asObservable();
    }
    // Closes all of the currently-open dialogs
    /**
     * @return {?}
     */
    closeAll() {
        this.modalControl.closeAll();
    }
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    create(options = {}) {
        if (typeof options.mcOnCancel !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnCancel = (/**
             * @return {?}
             */
            () => { });
        }
        if (!('mcCloseByESC' in options)) {
            options.mcCloseByESC = true;
        }
        if (!('mcWidth' in options)) {
            // tslint:disable-next-line
            options.mcWidth = 480;
        }
        return (/** @type {?} */ (new ModalBuilderForService(this.overlay, options).getInstance()));
    }
    /**
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    confirm(options = {}, confirmType = 'confirm') {
        if ('mcFooter' in options) {
            console.warn(`The Confirm-Modal doesn't support "mcFooter", this property will be ignored.`);
        }
        // NOTE: only support function currently by calling confirm()
        if (typeof options.mcOnOk !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnOk = (/**
             * @return {?}
             */
            () => { });
        }
        options.mcModalType = 'confirm';
        options.mcClassName = `mc-confirm mc-confirm-${confirmType} ${options.mcClassName || ''}`;
        options.mcMaskClosable = false;
        return this.create(options);
    }
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    success(options = {}) {
        return this.simpleConfirm(options, 'success');
    }
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    delete(options = {}) {
        return this.simpleConfirm(options, 'warn');
    }
    /**
     * @private
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
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
    { type: Injectable },
];
/** @nocollapse */
McModalService.ctorParameters = () => [
    { type: Overlay },
    { type: McModalControlService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McModalModule {
}
McModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, OverlayModule, A11yModule, McButtonModule, McIconModule],
                exports: [McModalComponent],
                declarations: [McModalComponent, CssUnitPipe],
                entryComponents: [McModalComponent],
                providers: [McModalControlService, McModalService]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McModalComponent, McModalRef, McModalModule, McModalService, CssUnitPipe as ɵb28, McModalControlService as ɵa28 };
//# sourceMappingURL=modal.js.map

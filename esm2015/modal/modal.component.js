/**
 * @fileoverview added by tsickle
 * Generated from: modal.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Injector, Input, Output, QueryList, Renderer2, TemplateRef, Type, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { McModalControlService } from './modal-control.service';
import { McModalRef } from './modal-ref.class';
import { modalUtilObject as ModalUtil } from './modal-util';
// Duration when perform animations (ms)
/** @type {?} */
export const MODAL_ANIMATE_DURATION = 200;
/**
 * @template T, R
 */
export class McModalComponent extends McModalRef {
    /**
     * @param {?} overlay
     * @param {?} renderer
     * @param {?} cfr
     * @param {?} elementRef
     * @param {?} viewContainer
     * @param {?} modalControl
     * @param {?} changeDetector
     * @param {?} document
     */
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
        for (const autoFocusedButton of this.autoFocusedButtons.toArray()) {
            if (autoFocusedButton.nativeElement.autofocus) {
                ((/** @type {?} */ (autoFocusedButton.nativeElement))).focus();
                break;
            }
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
    markForCheck() {
        this.changeDetector.markForCheck();
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
    // tslint:disable-next-line: no-reserved-keywords
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
        // tslint:disable-next-line:deprecation .key isn't supported in Edge
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
    // tslint:disable-next-line: no-reserved-keywords
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
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
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
    /**
     * @param {?} button
     * @return {?}
     */
    onButtonClick(button) {
        // Call onClick directly
        // tslint:disable-next-line:no-inferred-empty-object-type  rule seems to be broken
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
    /**
     * @private
     * @return {?}
     */
    updateTransformOrigin() {
        /** @type {?} */
        const modalElement = (/** @type {?} */ (this.modalContainer.nativeElement));
        /** @type {?} */
        const lastPosition = ModalUtil.getLastClickPosition();
        if (lastPosition) {
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
                styles: ["@-webkit-keyframes mcFadeIn{0%{opacity:0}to{opacity:1}}@keyframes mcFadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes mcFadeOut{0%{opacity:1}to{opacity:0}}@keyframes mcFadeOut{0%{opacity:1}to{opacity:0}}@-webkit-keyframes mcZoomIn{0%{opacity:0;transform:translateY(-25%)}to{opacity:1;transform:scale(1)}}@keyframes mcZoomIn{0%{opacity:0;transform:translateY(-25%)}to{opacity:1;transform:scale(1)}}@-webkit-keyframes mcZoomOut{0%{transform:scale(1)}to{opacity:0;transform:translateY(-30%)}}@keyframes mcZoomOut{0%{transform:scale(1)}to{opacity:0;transform:translateY(-30%)}}.fade-appear,.fade-enter,.fade-leave{-webkit-animation-duration:.3s;-webkit-animation-fill-mode:both;-webkit-animation-play-state:paused;animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-appear.fade-appear-active,.fade-enter.fade-enter-active{-webkit-animation-name:mcFadeIn;-webkit-animation-play-state:running;animation-name:mcFadeIn;animation-play-state:running}.fade-leave.fade-leave-active{-webkit-animation-name:mcFadeOut;-webkit-animation-play-state:running;animation-name:mcFadeOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{opacity:0}.className-appear,.className-enter,.className-leave{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}.zoom-appear,.zoom-enter,.zoom-leave{-webkit-animation-duration:.3s;-webkit-animation-fill-mode:both;-webkit-animation-play-state:paused;animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-appear.zoom-appear-active,.zoom-enter.zoom-enter-active{-webkit-animation-name:mcZoomIn;-webkit-animation-play-state:running;animation-name:mcZoomIn;animation-play-state:running}.zoom-leave.zoom-leave-active{-webkit-animation-name:mcZoomOut;-webkit-animation-play-state:running;animation-name:mcZoomOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{-webkit-animation-timing-function:cubic-bezier(.075,.82,.165,1);animation-timing-function:cubic-bezier(.075,.82,.165,1);transform:translateY(-25%)}.className-leave{-webkit-animation-timing-function:cubic-bezier(.785,.135,.15,.86);animation-timing-function:cubic-bezier(.785,.135,.15,.86);transform:translate(0)}.mc-confirm .mc-modal-close,.mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-body{padding:24px}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:after,.mc-confirm-body-wrapper:before{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px}.mc-modal{box-sizing:border-box;list-style:none;margin:0 auto;padding:0 0 24px;position:relative;top:48px;width:auto}.mc-modal.zoom-appear,.mc-modal.zoom-enter{-webkit-animation-duration:.3s;animation-duration:.3s;opacity:0;transform:none}.mc-modal .mc-modal-close{height:56px;position:absolute;right:0;top:0;width:56px;z-index:10}.mc-modal-wrap{-webkit-overflow-scrolling:touch;bottom:0;left:0;outline:0;overflow:auto;position:fixed;right:0;top:0;z-index:1000}.mc-modal-title{margin:0}.mc-modal-content{background-clip:padding-box;background-color:#fff;border-radius:4px;position:relative}.mc-modal-header{border-radius:4px 4px 0 0;display:block;padding:14px 16px}.mc-modal-body{display:block;max-height:calc(100vh - 260px);overflow-y:auto;padding:16px 24px 24px;word-wrap:break-word}.mc-modal-footer{border-radius:0 0 4px 4px;display:block;padding:16px;text-align:right}.mc-modal-footer button+button{margin-bottom:0;margin-left:16px}.mc-modal-mask{bottom:0;height:100%;left:0;position:fixed;right:0;top:0;z-index:1000}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}"]
            }] }
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
if (false) {
    /** @type {?} */
    McModalComponent.prototype.mcModalType;
    /** @type {?} */
    McModalComponent.prototype.mcComponent;
    /** @type {?} */
    McModalComponent.prototype.mcContent;
    /** @type {?} */
    McModalComponent.prototype.mcComponentParams;
    /** @type {?} */
    McModalComponent.prototype.mcFooter;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype._mcVisible;
    /** @type {?} */
    McModalComponent.prototype.mcVisibleChange;
    /** @type {?} */
    McModalComponent.prototype.mcZIndex;
    /** @type {?} */
    McModalComponent.prototype.mcWidth;
    /** @type {?} */
    McModalComponent.prototype.mcWrapClassName;
    /** @type {?} */
    McModalComponent.prototype.mcClassName;
    /** @type {?} */
    McModalComponent.prototype.mcStyle;
    /** @type {?} */
    McModalComponent.prototype.mcTitle;
    /** @type {?} */
    McModalComponent.prototype.mcCloseByESC;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype._mcClosable;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype._mcMask;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype._mcMaskClosable;
    /** @type {?} */
    McModalComponent.prototype.mcMaskStyle;
    /** @type {?} */
    McModalComponent.prototype.mcBodyStyle;
    /** @type {?} */
    McModalComponent.prototype.mcAfterOpen;
    /** @type {?} */
    McModalComponent.prototype.mcAfterClose;
    /** @type {?} */
    McModalComponent.prototype.mcOkText;
    /** @type {?} */
    McModalComponent.prototype.mcOkType;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype._mcOkLoading;
    /** @type {?} */
    McModalComponent.prototype.mcOnOk;
    /** @type {?} */
    McModalComponent.prototype.mcCancelText;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype._mcCancelLoading;
    /** @type {?} */
    McModalComponent.prototype.mcOnCancel;
    /** @type {?} */
    McModalComponent.prototype.modalContainer;
    /** @type {?} */
    McModalComponent.prototype.bodyContainer;
    /** @type {?} */
    McModalComponent.prototype.autoFocusedButtons;
    /** @type {?} */
    McModalComponent.prototype.maskAnimationClassMap;
    /** @type {?} */
    McModalComponent.prototype.modalAnimationClassMap;
    /** @type {?} */
    McModalComponent.prototype.transformOrigin;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.contentComponentRef;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.animationState;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.container;
    /** @type {?} */
    McModalComponent.prototype.mcGetContainer;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.cfr;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.viewContainer;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.modalControl;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    McModalComponent.prototype.document;
}
////////////
/**
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    // tslint:disable-next-line: no-unbound-method
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof ((/** @type {?} */ (obj))).then === 'function' && typeof ((/** @type {?} */ (obj))).catch === 'function';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ1ksaUJBQWlCLEVBQ2hDLFNBQVMsRUFDVCx3QkFBd0IsRUFFeEIsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFJTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFFVCxXQUFXLEVBQ1gsSUFBSSxFQUNKLFNBQVMsRUFDVCxZQUFZLEVBQ1osZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQ3RDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsSUFBSSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUs1RCxNQUFNLE9BQU8sc0JBQXNCLEdBQUcsR0FBRzs7OztBQWF6QyxNQUFNLE9BQU8sZ0JBQW1DLFNBQVEsVUFBZ0I7Ozs7Ozs7Ozs7O0lBK0dwRSxZQUNZLE9BQWdCLEVBQ2hCLFFBQW1CLEVBQ25CLEdBQTZCLEVBQzdCLFVBQXNCLEVBQ3RCLGFBQStCLEVBQy9CLFlBQW1DLEVBQ25DLGNBQWlDLEVBQ2YsUUFBYTtRQUV2QyxLQUFLLEVBQUUsQ0FBQztRQVRBLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsYUFBUSxHQUFSLFFBQVEs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OztJQUt0Qyx1Q0FBMkI7Ozs7O0lBSzNCLG1DQUF1Qjs7Ozs7SUFLdkIsMkNBQWdDOztJQUVoQyx1Q0FBNkI7O0lBQzdCLHVDQUE2Qjs7SUFHN0IsdUNBQWlEOztJQUVqRCx3Q0FBK0M7O0lBRy9DLG9DQUEwQjs7SUFDMUIsb0NBQThCOzs7OztJQUs5Qix3Q0FBNkI7O0lBRTdCLGtDQUF3Rjs7SUFDeEYsd0NBQThCOzs7OztJQUs5Qiw0Q0FBaUM7O0lBRWpDLHNDQUE0Rjs7SUFFNUYsMENBQTBFOztJQUMxRSx5Q0FBdUc7O0lBRXZHLDhDQUFtRzs7SUFFbkcsaURBQThCOztJQUM5QixrREFBK0I7O0lBRS9CLDJDQUFnQzs7Ozs7SUEwQmhDLCtDQUE2Qzs7Ozs7SUFFN0MsMENBQXVDOzs7OztJQUN2QyxxQ0FBNEM7O0lBZTVDLDBDQUFtSDs7Ozs7SUFaL0csbUNBQXdCOzs7OztJQUN4QixvQ0FBMkI7Ozs7O0lBQzNCLCtCQUFxQzs7Ozs7SUFDckMsc0NBQThCOzs7OztJQUM5Qix5Q0FBdUM7Ozs7O0lBQ3ZDLHdDQUEyQzs7Ozs7SUFDM0MsMENBQXlDOzs7OztJQUN6QyxvQ0FBdUM7Ozs7Ozs7QUFtVy9DLFNBQVMsU0FBUyxDQUFDLEdBQWM7SUFDN0IsOENBQThDO0lBQzlDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsbUJBQUEsR0FBRyxFQUFlLENBQUMsQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLE9BQU8sQ0FBQyxtQkFBQSxHQUFHLEVBQWUsQ0FBQyxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUM7QUFDbEwsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFR5cGUsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3Q29udGFpbmVyUmVmLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jTW9kYWxDb250cm9sU2VydmljZSB9IGZyb20gJy4vbW9kYWwtY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IE1jTW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZi5jbGFzcyc7XG5pbXBvcnQgeyBtb2RhbFV0aWxPYmplY3QgYXMgTW9kYWxVdGlsIH0gZnJvbSAnLi9tb2RhbC11dGlsJztcbmltcG9ydCB7IElNb2RhbEJ1dHRvbk9wdGlvbnMsIElNb2RhbE9wdGlvbnMsIE1vZGFsVHlwZSwgT25DbGlja0NhbGxiYWNrIH0gZnJvbSAnLi9tb2RhbC50eXBlJztcblxuXG4vLyBEdXJhdGlvbiB3aGVuIHBlcmZvcm0gYW5pbWF0aW9ucyAobXMpXG5leHBvcnQgY29uc3QgTU9EQUxfQU5JTUFURV9EVVJBVElPTiA9IDIwMDtcblxudHlwZSBBbmltYXRpb25TdGF0ZSA9ICdlbnRlcicgfCAnbGVhdmUnIHwgbnVsbDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1tb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tb2RhbC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY01vZGFsQ29tcG9uZW50PFQgPSBhbnksIFIgPSBhbnk+IGV4dGVuZHMgTWNNb2RhbFJlZjxULCBSPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSU1vZGFsT3B0aW9ucyB7XG5cbiAgICBASW5wdXQoKSBtY01vZGFsVHlwZTogTW9kYWxUeXBlID0gJ2RlZmF1bHQnO1xuXG4gICAgLy8gVGhlIGluc3RhbmNlIG9mIGNvbXBvbmVudCBvcGVuZWQgaW50byB0aGUgZGlhbG9nLlxuICAgIEBJbnB1dCgpIG1jQ29tcG9uZW50OiBUeXBlPFQ+O1xuICAgIC8vIElmIG5vdCBzcGVjaWZpZWQsIHdpbGwgdXNlIDxuZy1jb250ZW50PlxuICAgIEBJbnB1dCgpIG1jQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+IHwgVHlwZTxUPjtcbiAgICAvLyBhdmFpbGFibGUgd2hlbiBtY0NvbnRlbnQgaXMgYSBjb21wb25lbnRcbiAgICBASW5wdXQoKSBtY0NvbXBvbmVudFBhcmFtczogVDtcbiAgICAvLyBEZWZhdWx0IE1vZGFsIE9OTFlcbiAgICBASW5wdXQoKSBtY0Zvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+IHwgSU1vZGFsQnV0dG9uT3B0aW9uczxUPltdO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNWaXNpYmxlKCkgeyByZXR1cm4gdGhpcy5fbWNWaXNpYmxlOyB9XG4gICAgc2V0IG1jVmlzaWJsZSh2YWx1ZSkgeyB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTsgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KCkgbWNaSW5kZXg6IG51bWJlciA9IDEwMDA7XG4gICAgQElucHV0KCkgbWNXaWR0aDogbnVtYmVyIHwgc3RyaW5nID0gNDgwO1xuICAgIEBJbnB1dCgpIG1jV3JhcENsYXNzTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jQ2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbWNTdHlsZTogb2JqZWN0O1xuICAgIEBJbnB1dCgpIG1jVGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PjtcbiAgICBASW5wdXQoKSBtY0Nsb3NlQnlFU0M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNDbG9zYWJsZSgpIHsgcmV0dXJuIHRoaXMuX21jQ2xvc2FibGU7IH1cbiAgICBzZXQgbWNDbG9zYWJsZSh2YWx1ZSkgeyB0aGlzLl9tY0Nsb3NhYmxlID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY0Nsb3NhYmxlID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jTWFzaygpIHsgcmV0dXJuIHRoaXMuX21jTWFzazsgfVxuICAgIHNldCBtY01hc2sodmFsdWUpIHsgdGhpcy5fbWNNYXNrID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY01hc2sgPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNNYXNrQ2xvc2FibGUoKSB7IHJldHVybiB0aGlzLl9tY01hc2tDbG9zYWJsZTsgfVxuICAgIHNldCBtY01hc2tDbG9zYWJsZSh2YWx1ZSkgeyB0aGlzLl9tY01hc2tDbG9zYWJsZSA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNNYXNrQ2xvc2FibGUgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIG1jTWFza1N0eWxlOiBvYmplY3Q7XG4gICAgQElucHV0KCkgbWNCb2R5U3R5bGU6IG9iamVjdDtcblxuICAgIC8vIFRyaWdnZXIgd2hlbiBtb2RhbCBvcGVuKHZpc2libGUpIGFmdGVyIGFuaW1hdGlvbnNcbiAgICBAT3V0cHV0KCkgbWNBZnRlck9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgLy8gVHJpZ2dlciB3aGVuIG1vZGFsIGxlYXZlLWFuaW1hdGlvbiBvdmVyXG4gICAgQE91dHB1dCgpIG1jQWZ0ZXJDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8Uj4oKTtcblxuICAgIC8vIC0tLSBQcmVkZWZpbmVkIE9LICYgQ2FuY2VsIGJ1dHRvbnNcbiAgICBASW5wdXQoKSBtY09rVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jT2tUeXBlID0gJ3ByaW1hcnknO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNPa0xvYWRpbmcoKSB7IHJldHVybiB0aGlzLl9tY09rTG9hZGluZzsgfVxuICAgIHNldCBtY09rTG9hZGluZyh2YWx1ZSkgeyB0aGlzLl9tY09rTG9hZGluZyA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNPa0xvYWRpbmcgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIEBPdXRwdXQoKSBtY09uT2s6IEV2ZW50RW1pdHRlcjxUPiB8IE9uQ2xpY2tDYWxsYmFjazxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcbiAgICBASW5wdXQoKSBtY0NhbmNlbFRleHQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jQ2FuY2VsTG9hZGluZygpIHsgcmV0dXJuIHRoaXMuX21jQ2FuY2VsTG9hZGluZzsgfVxuICAgIHNldCBtY0NhbmNlbExvYWRpbmcodmFsdWUpIHsgdGhpcy5fbWNDYW5jZWxMb2FkaW5nID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY0NhbmNlbExvYWRpbmcgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIEBPdXRwdXQoKSBtY09uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8VD4gfCBPbkNsaWNrQ2FsbGJhY2s8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdtb2RhbENvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIG1vZGFsQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2JvZHlDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogZmFsc2UgfSkgYm9keUNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAgICAvLyBPbmx5IGFpbSB0byBmb2N1cyB0aGUgb2sgYnV0dG9uIHRoYXQgbmVlZHMgdG8gYmUgYXV0byBmb2N1c2VkXG4gICAgQFZpZXdDaGlsZHJlbignYXV0b0ZvY3VzZWRCdXR0b24nLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgYXV0b0ZvY3VzZWRCdXR0b25zOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgICBtYXNrQW5pbWF0aW9uQ2xhc3NNYXA6IG9iamVjdDtcbiAgICBtb2RhbEFuaW1hdGlvbkNsYXNzTWFwOiBvYmplY3Q7XG4gICAgLy8gVGhlIG9yaWdpbiBwb2ludCB0aGF0IGFuaW1hdGlvbiBiYXNlZCBvblxuICAgIHRyYW5zZm9ybU9yaWdpbiA9ICcwcHggMHB4IDBweCc7XG5cbiAgICAvLyBPYnNlcnZhYmxlIGFsaWFzIGZvciBtY0FmdGVyT3BlblxuICAgIGdldCBhZnRlck9wZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jQWZ0ZXJPcGVuLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8vIE9ic2VydmFibGUgYWxpYXMgZm9yIG1jQWZ0ZXJDbG9zZVxuICAgIGdldCBhZnRlckNsb3NlKCk6IE9ic2VydmFibGU8Uj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tY0FmdGVyQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IG9rVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5tY09rVGV4dDtcbiAgICB9XG5cbiAgICBnZXQgY2FuY2VsVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5tY0NhbmNlbFRleHQ7XG4gICAgfVxuXG4gICAgLy8gSW5kaWNhdGUgd2hldGhlciB0aGlzIGRpYWxvZyBzaG91bGQgaGlkZGVuXG4gICAgZ2V0IGhpZGRlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLm1jVmlzaWJsZSAmJiAhdGhpcy5hbmltYXRpb25TdGF0ZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIHJlZmVyZW5jZSB3aGVuIHVzaW5nIG1jQ29udGVudCBhcyBDb21wb25lbnRcbiAgICBwcml2YXRlIGNvbnRlbnRDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxUPjtcbiAgICAvLyBDdXJyZW50IGFuaW1hdGlvbiBzdGF0ZVxuICAgIHByaXZhdGUgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlO1xuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCB8IE92ZXJsYXlSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIG1vZGFsQ29udHJvbDogTWNNb2RhbENvbnRyb2xTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgbWNHZXRDb250YWluZXI6IEhUTUxFbGVtZW50IHwgT3ZlcmxheVJlZiB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IE92ZXJsYXlSZWYpID0gKCkgPT4gdGhpcy5vdmVybGF5LmNyZWF0ZSgpO1xuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGNvbXBvbmVudCBhbG9uZyB3aXRob3V0IFZpZXdcbiAgICAgICAgaWYgKHRoaXMuaXNDb21wb25lbnQodGhpcy5tY0NvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUR5bmFtaWNDb21wb25lbnQodGhpcy5tY0NvbnRlbnQgYXMgVHlwZTxUPik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR1cCBkZWZhdWx0IGJ1dHRvbiBvcHRpb25zXG4gICAgICAgIGlmICh0aGlzLmlzTW9kYWxCdXR0b25zKHRoaXMubWNGb290ZXIpKSB7XG4gICAgICAgICAgICB0aGlzLm1jRm9vdGVyID0gdGhpcy5mb3JtYXRNb2RhbEJ1dHRvbnModGhpcy5tY0Zvb3RlciBhcyBJTW9kYWxCdXR0b25PcHRpb25zPFQ+W10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDb21wb25lbnQodGhpcy5tY0NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHluYW1pY0NvbXBvbmVudCh0aGlzLm1jQ29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBtb2RhbCBkb20gdG8gZWxzZXdoZXJlXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdHlwZW9mIHRoaXMubWNHZXRDb250YWluZXIgPT09ICdmdW5jdGlvbicgPyB0aGlzLm1jR2V0Q29udGFpbmVyKCkgOiB0aGlzLm1jR2V0Q29udGFpbmVyO1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikge1xuICAgICAgICAgICAgLy8gTk9URTogb25seSBhdHRhY2ggdGhlIGRvbSB0byBvdmVybGF5LCB0aGUgdmlldyBjb250YWluZXIgaXMgbm90IGNoYW5nZWQgYWN0dWFsbHlcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm92ZXJsYXlFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZ2lzdGVyIG1vZGFsIHdoZW4gYWZ0ZXJPcGVuL2FmdGVyQ2xvc2UgaXMgc3RhYmxlXG4gICAgICAgIHRoaXMubW9kYWxDb250cm9sLnJlZ2lzdGVyTW9kYWwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gW05PVEVdIE5PVCBhdmFpbGFibGUgd2hlbiB1c2luZyBieSBzZXJ2aWNlIVxuICAgIC8vIEJlY2F1c2UgbmdPbkNoYW5nZXMgbmV2ZXIgYmUgY2FsbGVkIHdoZW4gdXNpbmcgYnkgc2VydmljZSxcbiAgICAvLyBoZXJlIHdlIGNhbid0IHN1cHBvcnQgXCJtY0NvbnRlbnRcIihDb21wb25lbnQpIGV0Yy4gYXMgaW5wdXRzIHRoYXQgaW5pdGlhbGl6ZWQgZHluYW1pY2FsbHkuXG4gICAgLy8gQlVUOiBVc2VyIGFsc28gY2FuIGNoYW5nZSBcIm1jQ29udGVudFwiIGR5bmFtaWNhbGx5IHRvIHRyaWdnZXIgVUkgY2hhbmdlc1xuICAgIC8vIChwcm92aWRlZCB5b3UgZG9uJ3QgdXNlIFxiQ29tcG9uZW50IHRoYXQgbmVlZHMgaW5pdGlhbGl6YXRpb25zKVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBEbyBub3QgdHJpZ2dlciBhbmltYXRpb24gd2hpbGUgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVZpc2libGVTdGF0ZUNoYW5nZSh0aGlzLm1jVmlzaWJsZSwgIWNoYW5nZXMubWNWaXNpYmxlLmZpcnN0Q2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gSWYgdXNpbmcgQ29tcG9uZW50LCBpdCBpcyB0aGUgdGltZSB0byBhdHRhY2ggVmlldyB3aGlsZSBib2R5Q29udGFpbmVyIGlzIHJlYWR5XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keUNvbnRhaW5lci5pbnNlcnQodGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgYXV0b0ZvY3VzZWRCdXR0b24gb2YgdGhpcy5hdXRvRm9jdXNlZEJ1dHRvbnMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAoYXV0b0ZvY3VzZWRCdXR0b24ubmF0aXZlRWxlbWVudC5hdXRvZm9jdXMpIHtcbiAgICAgICAgICAgICAgICAoYXV0b0ZvY3VzZWRCdXR0b24ubmF0aXZlRWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuZm9jdXMoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmlzaWJsZUZyb21JbnNpZGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xvc2UocmVzdWx0PzogUikge1xuICAgICAgICB0aGlzLmNoYW5nZVZpc2libGVGcm9tSW5zaWRlKGZhbHNlLCByZXN1bHQpO1xuICAgIH1cblxuICAgIC8vIERlc3Ryb3kgZXF1YWxzIENsb3NlXG4gICAgZGVzdHJveShyZXN1bHQ/OiBSKSB7XG4gICAgICAgIHRoaXMuY2xvc2UocmVzdWx0KTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdHJpZ2dlck9rKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnb2snKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgfVxuXG4gICAgZ2V0SW5zdGFuY2UoKTogTWNNb2RhbENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRDb21wb25lbnRSZWYoKTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudENvbXBvbmVudFJlZjtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50Q29tcG9uZW50KCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50Q29tcG9uZW50UmVmICYmIHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZiAmJiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBvbkNsaWNrTWFzaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5tY01hc2sgJiZcbiAgICAgICAgICAgIHRoaXMubWNNYXNrQ2xvc2FibGUgJiZcbiAgICAgICAgICAgICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ21jLW1vZGFsLXdyYXAnKSAmJlxuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgaXNNb2RhbFR5cGUodHlwZTogTW9kYWxUeXBlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jTW9kYWxUeXBlID09PSB0eXBlO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvbiAua2V5IGlzbid0IHN1cHBvcnRlZCBpbiBFZGdlXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250YWluZXIgJiYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikpIHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIG9uQ2xpY2tDbG9zZUJ0bigpIHtcbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgb25DbGlja09rQ2FuY2VsKHR5cGU6ICdvaycgfCAnY2FuY2VsJykge1xuICAgICAgICBjb25zdCB0cmlnZ2VyID0geyBvazogdGhpcy5tY09uT2ssIGNhbmNlbDogdGhpcy5tY09uQ2FuY2VsIH1bdHlwZV07XG4gICAgICAgIGNvbnN0IGxvYWRpbmdLZXkgPSB7IG9rOiAnbWNPa0xvYWRpbmcnLCBjYW5jZWw6ICdtY0NhbmNlbExvYWRpbmcnIH1bdHlwZV07XG5cbiAgICAgICAgaWYgKHRyaWdnZXIgaW5zdGFuY2VvZiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgIHRyaWdnZXIuZW1pdCh0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyaWdnZXIgPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJpZ2dlcih0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICAgICAgICAvLyBVc2VycyBjYW4gcmV0dXJuIFwiZmFsc2VcIiB0byBwcmV2ZW50IGNsb3NpbmcgYnkgZGVmYXVsdFxuICAgICAgICAgICAgY29uc3QgY2FzZUNsb3NlID0gKGRvQ2xvc2U6IGJvb2xlYW4gfCB2b2lkIHwge30pID0+IChkb0Nsb3NlICE9PSBmYWxzZSkgJiYgdGhpcy5jbG9zZShkb0Nsb3NlIGFzIFIpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2xvYWRpbmdLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVUaGVuID0gKGRvQ2xvc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tsb2FkaW5nS2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlQ2xvc2UoZG9DbG9zZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAocmVzdWx0IGFzIFByb21pc2U8dm9pZD4pLnRoZW4oaGFuZGxlVGhlbikuY2F0Y2goaGFuZGxlVGhlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhc2VDbG9zZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgaXNOb25FbXB0eVN0cmluZyh2YWx1ZToge30pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzVGVtcGxhdGVSZWYodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzQ29tcG9uZW50KHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUeXBlO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzTW9kYWxCdXR0b25zKHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvLyBMb29rdXAgYSBidXR0b24ncyBwcm9wZXJ0eSwgaWYgdGhlIHByb3AgaXMgYSBmdW5jdGlvbiwgY2FsbCAmIHRoZW4gcmV0dXJuIHRoZSByZXN1bHQsIG90aGVyd2lzZSwgcmV0dXJuIGl0c2VsZi5cbiAgICAvLyBBb1RcbiAgICBnZXRCdXR0b25DYWxsYWJsZVByb3Aob3B0aW9uczogSU1vZGFsQnV0dG9uT3B0aW9uczxUPiwgcHJvcDogc3RyaW5nKToge30ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbcHJvcF07XG4gICAgICAgIGNvbnN0IGFyZ3M6IGFueVtdID0gW107XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmFwcGx5KG9wdGlvbnMsIGFyZ3MpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gT24gbWNGb290ZXIncyBtb2RhbCBidXR0b24gY2xpY2tcbiAgICAvLyBBb1RcbiAgICBvbkJ1dHRvbkNsaWNrKGJ1dHRvbjogSU1vZGFsQnV0dG9uT3B0aW9uczxUPikge1xuICAgICAgICAvLyBDYWxsIG9uQ2xpY2sgZGlyZWN0bHlcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWluZmVycmVkLWVtcHR5LW9iamVjdC10eXBlICBydWxlIHNlZW1zIHRvIGJlIGJyb2tlblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldEJ1dHRvbkNhbGxhYmxlUHJvcChidXR0b24sICdvbkNsaWNrJyk7XG4gICAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgYnV0dG9uLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgKHJlc3VsdCBhcyBQcm9taXNlPHt9PikudGhlbigoKSA9PiBidXR0b24ubG9hZGluZyA9IGZhbHNlKS5jYXRjaCgoKSA9PiBidXR0b24ubG9hZGluZyA9IGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvIHJlc3QgdGhpbmdzIHdoZW4gdmlzaWJsZSBzdGF0ZSBjaGFuZ2VkXG4gICAgcHJpdmF0ZSBoYW5kbGVWaXNpYmxlU3RhdGVDaGFuZ2UodmlzaWJsZTogYm9vbGVhbiwgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZSwgY2xvc2VSZXN1bHQ/OiBSKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgLy8gSGlkZSBzY3JvbGxiYXIgYXQgdGhlIGZpcnN0IHRpbWUgd2hlbiBzaG93biB1cFxuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VCb2R5T3ZlcmZsb3coMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgLnJlc29sdmUoYW5pbWF0aW9uICYmIHRoaXMuYW5pbWF0ZVRvKHZpc2libGUpKVxuICAgICAgICAgICAgLy8gRW1pdCBvcGVuL2Nsb3NlIGV2ZW50IGFmdGVyIGFuaW1hdGlvbnMgb3ZlclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNBZnRlck9wZW4uZW1pdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNBZnRlckNsb3NlLmVtaXQoY2xvc2VSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBTaG93L2hpZGUgc2Nyb2xsYmFyIHdoZW4gYW5pbWF0aW9uIGlzIG92ZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VCb2R5T3ZlcmZsb3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDaGFuZ2UgbWNWaXNpYmxlIGZyb20gaW5zaWRlXG4gICAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmxlRnJvbUluc2lkZSh2aXNpYmxlOiBib29sZWFuLCBjbG9zZVJlc3VsdD86IFIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgbWNWaXNpYmxlIHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IHZpc2libGU7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVWaXNpYmxlU3RhdGVDaGFuZ2UodmlzaWJsZSwgdHJ1ZSwgY2xvc2VSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQW5pbWF0aW9uU3RhdGUoc3RhdGU6IEFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tBbmltYXRpb25DbGFzc01hcCA9IHtcbiAgICAgICAgICAgICAgICBbYGZhZGUtJHtzdGF0ZX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBbYGZhZGUtJHtzdGF0ZX0tYWN0aXZlYF06IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSB7XG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9LWFjdGl2ZWBdOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5tYXNrQW5pbWF0aW9uQ2xhc3NNYXAgPSB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudENvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYW5pbWF0ZVRvKGlzVmlzaWJsZTogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGxhc3Rlc3QgY2xpY2sgcG9zaXRpb24gd2hlbiBzaG93cyB1cFxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBbTk9URV0gVXNpbmcgdGltZW91dCBkdWUgdG8gdGhlIGRvY3VtZW50LmNsaWNrIGV2ZW50IGlzIGZpcmVkIGxhdGVyIHRoYW4gdmlzaWJsZSBjaGFuZ2UsXG4gICAgICAgICAgICAvLyBzbyBpZiBub3QgcG9zdHBvbmVkIHRvIG5leHQgZXZlbnQtbG9vcCwgd2UgY2FuJ3QgZ2V0IHRoZSBsYXN0ZXN0IGNsaWNrIHBvc2l0aW9uXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRyYW5zZm9ybU9yaWdpbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlQW5pbWF0aW9uU3RhdGUoaXNWaXNpYmxlID8gJ2VudGVyJyA6ICdsZWF2ZScpO1xuXG4gICAgICAgIC8vIFJldHVybiB3aGVuIGFuaW1hdGlvbiBpcyBvdmVyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBbmltYXRpb25TdGF0ZShudWxsKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgTU9EQUxfQU5JTUFURV9EVVJBVElPTikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0TW9kYWxCdXR0b25zKGJ1dHRvbnM6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSk6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSB7XG4gICAgICAgIHJldHVybiBidXR0b25zLm1hcCgoYnV0dG9uKSA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLmJ1dHRvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tcG9uZW50IGR5bmFtaWNhbGx5IGJ1dCBub3QgYXR0YWNoIHRvIGFueSBWaWV3XG4gICAgICogKHRoaXMgYWN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBib2R5Q29udGFpbmVyIGlzIHJlYWR5KVxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgQ29tcG9uZW50IGNsYXNzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVEeW5hbWljQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxUPikge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgY2hpbGRJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWNNb2RhbFJlZiwgdXNlVmFsdWU6IHRoaXN9XSxcbiAgICAgICAgICAgIHBhcmVudDogdGhpcy52aWV3Q29udGFpbmVyLmluamVjdG9yXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGVudENvbXBvbmVudFJlZiA9IGZhY3RvcnkuY3JlYXRlKGNoaWxkSW5qZWN0b3IpO1xuXG4gICAgICAgIGlmICh0aGlzLm1jQ29tcG9uZW50UGFyYW1zKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5tY0NvbXBvbmVudFBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyB0aGUgZmlyc3QgY2hhbmdlIGRldGVjdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAvLyAob3Igd2UgZG8gZGV0ZWN0aW9uIGF0IG5nQWZ0ZXJWaWV3SW5pdCwgbXVsdGktY2hhbmdlcyBlcnJvciB3aWxsIGJlIHRocm93bilcbiAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdHJhbnNmb3JtLW9yaWdpbiB0byB0aGUgbGFzdCBjbGljayBwb3NpdGlvbiBvbiBkb2N1bWVudFxuICAgIHByaXZhdGUgdXBkYXRlVHJhbnNmb3JtT3JpZ2luKCkge1xuICAgICAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSB0aGlzLm1vZGFsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IE1vZGFsVXRpbC5nZXRMYXN0Q2xpY2tQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmIChsYXN0UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3JpZ2luID0gYCR7bGFzdFBvc2l0aW9uLnggLSBtb2RhbEVsZW1lbnQub2Zmc2V0TGVmdH1weCAke2xhc3RQb3NpdGlvbi55IC0gbW9kYWxFbGVtZW50Lm9mZnNldFRvcH1weCAwcHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZSBjYXJlIG9mIHRoZSBib2R5J3Mgb3ZlcmZsb3cgdG8gZGVjaWRlIHRoZSBleGlzdGVuc2Ugb2Ygc2Nyb2xsYmFyXG4gICAgICogQHBhcmFtIHBsdXNOdW0gVGhlIG51bWJlciB0aGF0IHRoZSBvcGVuTW9kYWxzLmxlbmd0aCB3aWxsIGluY3JlYXNlIHNvb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUJvZHlPdmVyZmxvdyhwbHVzTnVtOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Nb2RhbHMgPSB0aGlzLm1vZGFsQ29udHJvbC5vcGVuTW9kYWxzO1xuXG4gICAgICAgIGlmIChvcGVuTW9kYWxzLmxlbmd0aCArIHBsdXNOdW0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHksICdvdmVyZmxvdycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gaXNQcm9taXNlKG9iajoge30gfCB2b2lkKTogYm9vbGVhbiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICAgIHJldHVybiAhIW9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIChvYmogYXMgUHJvbWlzZTx7fT4pLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIChvYmogYXMgUHJvbWlzZTx7fT4pLmNhdGNoID09PSAnZnVuY3Rpb24nO1xufVxuIl19
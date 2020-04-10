/**
 * @fileoverview added by tsickle
 * Generated from: modal.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: ["@-webkit-keyframes mcFadeIn{0%{opacity:0}100%{opacity:1}}@keyframes mcFadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes mcFadeOut{0%{opacity:1}100%{opacity:0}}@keyframes mcFadeOut{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes mcZoomIn{0%{opacity:0;transform:translate(0,-25%)}100%{opacity:1;transform:scale(1)}}@keyframes mcZoomIn{0%{opacity:0;transform:translate(0,-25%)}100%{opacity:1;transform:scale(1)}}@-webkit-keyframes mcZoomOut{0%{transform:scale(1)}100%{opacity:0;transform:translate(0,-30%)}}@keyframes mcZoomOut{0%{transform:scale(1)}100%{opacity:0;transform:translate(0,-30%)}}.fade-appear,.fade-enter,.fade-leave{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-play-state:paused;animation-play-state:paused}.fade-appear.fade-appear-active,.fade-enter.fade-enter-active{-webkit-animation-name:mcFadeIn;animation-name:mcFadeIn;-webkit-animation-play-state:running;animation-play-state:running}.fade-leave.fade-leave-active{-webkit-animation-name:mcFadeOut;animation-name:mcFadeOut;-webkit-animation-play-state:running;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{opacity:0;transform:translate(0,-25%);-webkit-animation-timing-function:cubic-bezier(.075,.82,.165,1);animation-timing-function:cubic-bezier(.075,.82,.165,1)}.zoom-appear,.zoom-enter,.zoom-leave{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-play-state:paused;animation-play-state:paused}.zoom-appear.zoom-appear-active,.zoom-enter.zoom-enter-active{-webkit-animation-name:mcZoomIn;animation-name:mcZoomIn;-webkit-animation-play-state:running;animation-play-state:running}.zoom-leave.zoom-leave-active{-webkit-animation-name:mcZoomOut;animation-name:mcZoomOut;-webkit-animation-play-state:running;animation-play-state:running;pointer-events:none}.className-leave{transform:translate(0,0);-webkit-animation-timing-function:cubic-bezier(.785,.135,.15,.86);animation-timing-function:cubic-bezier(.785,.135,.15,.86)}.mc-confirm .mc-modal-close,.mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-body{padding:24px}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:after,.mc-confirm-body-wrapper:before{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;width:auto;margin:0 auto;padding:0 0 24px;list-style:none}.mc-modal.zoom-appear,.mc-modal.zoom-enter{-webkit-animation-duration:.3s;animation-duration:.3s;transform:none;opacity:0}.mc-modal .mc-modal-close{position:absolute;z-index:10;top:0;right:0;width:56px;height:56px}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;background-clip:padding-box;background-color:#fff}.mc-modal-header{padding:14px 16px;display:block;border-radius:4px 4px 0 0}.mc-modal-body{display:block;padding:16px 24px 24px;max-height:calc(100vh - 260px);word-wrap:break-word;overflow-y:auto}.mc-modal-footer{display:block;padding:16px;border-radius:0 0 4px 4px;text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%;background-color:rgba(0,0,0,.5)}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNZLGlCQUFpQixFQUNoQyxTQUFTLEVBQ1Qsd0JBQXdCLEVBRXhCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBSUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBRVQsV0FBVyxFQUNYLElBQUksRUFDSixTQUFTLEVBQ1QsWUFBWSxFQUNaLGdCQUFnQixFQUFFLGlCQUFpQixFQUN0QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLElBQUksU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFLNUQsTUFBTSxPQUFPLHNCQUFzQixHQUFHLEdBQUc7Ozs7QUFhekMsTUFBTSxPQUFPLGdCQUFtQyxTQUFRLFVBQWdCOzs7Ozs7Ozs7OztJQStHcEUsWUFDWSxPQUFnQixFQUNoQixRQUFtQixFQUNuQixHQUE2QixFQUM3QixVQUFzQixFQUN0QixhQUErQixFQUMvQixZQUFtQyxFQUNuQyxjQUFpQyxFQUNmLFFBQWE7UUFFdkMsS0FBSyxFQUFFLENBQUM7UUFUQSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsUUFB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Ozs7OztJQUszQixtQ0FBdUI7Ozs7O0lBS3ZCLDJDQUFnQzs7SUFFaEMsdUNBQTZCOztJQUM3Qix1Q0FBNkI7O0lBRzdCLHVDQUFpRDs7SUFFakQsd0NBQStDOztJQUcvQyxvQ0FBMEI7O0lBQzFCLG9DQUE4Qjs7Ozs7SUFLOUIsd0NBQTZCOztJQUU3QixrQ0FBd0Y7O0lBQ3hGLHdDQUE4Qjs7Ozs7SUFLOUIsNENBQWlDOztJQUVqQyxzQ0FBNEY7O0lBRTVGLDBDQUEwRTs7SUFDMUUseUNBQXVHOztJQUV2Ryw4Q0FBbUc7O0lBRW5HLGlEQUE4Qjs7SUFDOUIsa0RBQStCOztJQUUvQiwyQ0FBZ0M7Ozs7O0lBMEJoQywrQ0FBNkM7Ozs7O0lBRTdDLDBDQUF1Qzs7Ozs7SUFDdkMscUNBQTRDOztJQWU1QywwQ0FBbUg7Ozs7O0lBWi9HLG1DQUF3Qjs7Ozs7SUFDeEIsb0NBQTJCOzs7OztJQUMzQiwrQkFBcUM7Ozs7O0lBQ3JDLHNDQUE4Qjs7Ozs7SUFDOUIseUNBQXVDOzs7OztJQUN2Qyx3Q0FBMkM7Ozs7O0lBQzNDLDBDQUF5Qzs7Ozs7SUFDekMsb0NBQXVDOzs7Ozs7O0FBb1cvQyxTQUFTLFNBQVMsQ0FBQyxHQUFjO0lBQzdCLDhDQUE4QztJQUM5QyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLG1CQUFBLEdBQUcsRUFBZSxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsbUJBQUEsR0FBRyxFQUFlLENBQUMsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDO0FBQ2xMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0b3IsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBUeXBlLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0NvbnRhaW5lclJlZiwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY01vZGFsQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBNY01vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgbW9kYWxVdGlsT2JqZWN0IGFzIE1vZGFsVXRpbCB9IGZyb20gJy4vbW9kYWwtdXRpbCc7XG5pbXBvcnQgeyBJTW9kYWxCdXR0b25PcHRpb25zLCBJTW9kYWxPcHRpb25zLCBNb2RhbFR5cGUsIE9uQ2xpY2tDYWxsYmFjayB9IGZyb20gJy4vbW9kYWwudHlwZSc7XG5cblxuLy8gRHVyYXRpb24gd2hlbiBwZXJmb3JtIGFuaW1hdGlvbnMgKG1zKVxuZXhwb3J0IGNvbnN0IE1PREFMX0FOSU1BVEVfRFVSQVRJT04gPSAyMDA7XG5cbnR5cGUgQW5pbWF0aW9uU3RhdGUgPSAnZW50ZXInIHwgJ2xlYXZlJyB8IG51bGw7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbW9kYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbW9kYWwuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNNb2RhbENvbXBvbmVudDxUID0gYW55LCBSID0gYW55PiBleHRlbmRzIE1jTW9kYWxSZWY8VCwgUj5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIElNb2RhbE9wdGlvbnMge1xuXG4gICAgQElucHV0KCkgbWNNb2RhbFR5cGU6IE1vZGFsVHlwZSA9ICdkZWZhdWx0JztcblxuICAgIC8vIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgb3BlbmVkIGludG8gdGhlIGRpYWxvZy5cbiAgICBASW5wdXQoKSBtY0NvbXBvbmVudDogVHlwZTxUPjtcbiAgICAvLyBJZiBub3Qgc3BlY2lmaWVkLCB3aWxsIHVzZSA8bmctY29udGVudD5cbiAgICBASW5wdXQoKSBtY0NvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PiB8IFR5cGU8VD47XG4gICAgLy8gYXZhaWxhYmxlIHdoZW4gbWNDb250ZW50IGlzIGEgY29tcG9uZW50XG4gICAgQElucHV0KCkgbWNDb21wb25lbnRQYXJhbXM6IFQ7XG4gICAgLy8gRGVmYXVsdCBNb2RhbCBPTkxZXG4gICAgQElucHV0KCkgbWNGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PiB8IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMuX21jVmlzaWJsZTsgfVxuICAgIHNldCBtY1Zpc2libGUodmFsdWUpIHsgdGhpcy5fbWNWaXNpYmxlID0gdmFsdWU7IH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIG1jVmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBJbnB1dCgpIG1jWkluZGV4OiBudW1iZXIgPSAxMDAwO1xuICAgIEBJbnB1dCgpIG1jV2lkdGg6IG51bWJlciB8IHN0cmluZyA9IDQ4MDtcbiAgICBASW5wdXQoKSBtY1dyYXBDbGFzc05hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtY0NsYXNzTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jU3R5bGU6IG9iamVjdDtcbiAgICBASW5wdXQoKSBtY1RpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7fT47XG4gICAgQElucHV0KCkgbWNDbG9zZUJ5RVNDOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jQ2xvc2FibGUoKSB7IHJldHVybiB0aGlzLl9tY0Nsb3NhYmxlOyB9XG4gICAgc2V0IG1jQ2xvc2FibGUodmFsdWUpIHsgdGhpcy5fbWNDbG9zYWJsZSA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNDbG9zYWJsZSA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY01hc2soKSB7IHJldHVybiB0aGlzLl9tY01hc2s7IH1cbiAgICBzZXQgbWNNYXNrKHZhbHVlKSB7IHRoaXMuX21jTWFzayA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNNYXNrID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jTWFza0Nsb3NhYmxlKCkgeyByZXR1cm4gdGhpcy5fbWNNYXNrQ2xvc2FibGU7IH1cbiAgICBzZXQgbWNNYXNrQ2xvc2FibGUodmFsdWUpIHsgdGhpcy5fbWNNYXNrQ2xvc2FibGUgPSB2YWx1ZTsgfVxuICAgIHByaXZhdGUgX21jTWFza0Nsb3NhYmxlID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBtY01hc2tTdHlsZTogb2JqZWN0O1xuICAgIEBJbnB1dCgpIG1jQm9keVN0eWxlOiBvYmplY3Q7XG5cbiAgICAvLyBUcmlnZ2VyIHdoZW4gbW9kYWwgb3Blbih2aXNpYmxlKSBhZnRlciBhbmltYXRpb25zXG4gICAgQE91dHB1dCgpIG1jQWZ0ZXJPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIC8vIFRyaWdnZXIgd2hlbiBtb2RhbCBsZWF2ZS1hbmltYXRpb24gb3ZlclxuICAgIEBPdXRwdXQoKSBtY0FmdGVyQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPFI+KCk7XG5cbiAgICAvLyAtLS0gUHJlZGVmaW5lZCBPSyAmIENhbmNlbCBidXR0b25zXG4gICAgQElucHV0KCkgbWNPa1RleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBtY09rVHlwZSA9ICdwcmltYXJ5JztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jT2tMb2FkaW5nKCkgeyByZXR1cm4gdGhpcy5fbWNPa0xvYWRpbmc7IH1cbiAgICBzZXQgbWNPa0xvYWRpbmcodmFsdWUpIHsgdGhpcy5fbWNPa0xvYWRpbmcgPSB2YWx1ZTsgfVxuICAgIHByaXZhdGUgX21jT2tMb2FkaW5nID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBAT3V0cHV0KCkgbWNPbk9rOiBFdmVudEVtaXR0ZXI8VD4gfCBPbkNsaWNrQ2FsbGJhY2s8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG4gICAgQElucHV0KCkgbWNDYW5jZWxUZXh0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY0NhbmNlbExvYWRpbmcoKSB7IHJldHVybiB0aGlzLl9tY0NhbmNlbExvYWRpbmc7IH1cbiAgICBzZXQgbWNDYW5jZWxMb2FkaW5nKHZhbHVlKSB7IHRoaXMuX21jQ2FuY2VsTG9hZGluZyA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNDYW5jZWxMb2FkaW5nID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBAT3V0cHV0KCkgbWNPbkNhbmNlbDogRXZlbnRFbWl0dGVyPFQ+IHwgT25DbGlja0NhbGxiYWNrPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbW9kYWxDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBtb2RhbENvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdib2R5Q29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IGZhbHNlIH0pIGJvZHlDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gICAgLy8gT25seSBhaW0gdG8gZm9jdXMgdGhlIG9rIGJ1dHRvbiB0aGF0IG5lZWRzIHRvIGJlIGF1dG8gZm9jdXNlZFxuICAgIEBWaWV3Q2hpbGRyZW4oJ2F1dG9Gb2N1c2VkQnV0dG9uJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIGF1dG9Gb2N1c2VkQnV0dG9uczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gICAgbWFza0FuaW1hdGlvbkNsYXNzTWFwOiBvYmplY3Q7XG4gICAgbW9kYWxBbmltYXRpb25DbGFzc01hcDogb2JqZWN0O1xuICAgIC8vIFRoZSBvcmlnaW4gcG9pbnQgdGhhdCBhbmltYXRpb24gYmFzZWQgb25cbiAgICB0cmFuc2Zvcm1PcmlnaW4gPSAnMHB4IDBweCAwcHgnO1xuXG4gICAgLy8gT2JzZXJ2YWJsZSBhbGlhcyBmb3IgbWNBZnRlck9wZW5cbiAgICBnZXQgYWZ0ZXJPcGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tY0FmdGVyT3Blbi5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvLyBPYnNlcnZhYmxlIGFsaWFzIGZvciBtY0FmdGVyQ2xvc2VcbiAgICBnZXQgYWZ0ZXJDbG9zZSgpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNBZnRlckNsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGdldCBva1RleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNPa1RleHQ7XG4gICAgfVxuXG4gICAgZ2V0IGNhbmNlbFRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNDYW5jZWxUZXh0O1xuICAgIH1cblxuICAgIC8vIEluZGljYXRlIHdoZXRoZXIgdGhpcyBkaWFsb2cgc2hvdWxkIGhpZGRlblxuICAgIGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5tY1Zpc2libGUgJiYgIXRoaXMuYW5pbWF0aW9uU3RhdGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHRoZSByZWZlcmVuY2Ugd2hlbiB1c2luZyBtY0NvbnRlbnQgYXMgQ29tcG9uZW50XG4gICAgcHJpdmF0ZSBjb250ZW50Q29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD47XG4gICAgLy8gQ3VycmVudCBhbmltYXRpb24gc3RhdGVcbiAgICBwcml2YXRlIGFuaW1hdGlvblN0YXRlOiBBbmltYXRpb25TdGF0ZTtcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBPdmVybGF5UmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2w6IE1jTW9kYWxDb250cm9sU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIG1jR2V0Q29udGFpbmVyOiBIVE1MRWxlbWVudCB8IE92ZXJsYXlSZWYgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBPdmVybGF5UmVmKSA9ICgpID0+IHRoaXMub3ZlcmxheS5jcmVhdGUoKTtcblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIENyZWF0ZSBjb21wb25lbnQgYWxvbmcgd2l0aG91dCBWaWV3XG4gICAgICAgIGlmICh0aGlzLmlzQ29tcG9uZW50KHRoaXMubWNDb250ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVEeW5hbWljQ29tcG9uZW50KHRoaXMubWNDb250ZW50IGFzIFR5cGU8VD4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0dXAgZGVmYXVsdCBidXR0b24gb3B0aW9uc1xuICAgICAgICBpZiAodGhpcy5pc01vZGFsQnV0dG9ucyh0aGlzLm1jRm9vdGVyKSkge1xuICAgICAgICAgICAgdGhpcy5tY0Zvb3RlciA9IHRoaXMuZm9ybWF0TW9kYWxCdXR0b25zKHRoaXMubWNGb290ZXIgYXMgSU1vZGFsQnV0dG9uT3B0aW9uczxUPltdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuaXNDb21wb25lbnQodGhpcy5tY0NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHluYW1pY0NvbXBvbmVudCh0aGlzLm1jQ29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBtb2RhbCBkb20gdG8gZWxzZXdoZXJlXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdHlwZW9mIHRoaXMubWNHZXRDb250YWluZXIgPT09ICdmdW5jdGlvbicgPyB0aGlzLm1jR2V0Q29udGFpbmVyKCkgOiB0aGlzLm1jR2V0Q29udGFpbmVyO1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikge1xuICAgICAgICAgICAgLy8gTk9URTogb25seSBhdHRhY2ggdGhlIGRvbSB0byBvdmVybGF5LCB0aGUgdmlldyBjb250YWluZXIgaXMgbm90IGNoYW5nZWQgYWN0dWFsbHlcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm92ZXJsYXlFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZ2lzdGVyIG1vZGFsIHdoZW4gYWZ0ZXJPcGVuL2FmdGVyQ2xvc2UgaXMgc3RhYmxlXG4gICAgICAgIHRoaXMubW9kYWxDb250cm9sLnJlZ2lzdGVyTW9kYWwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gW05PVEVdIE5PVCBhdmFpbGFibGUgd2hlbiB1c2luZyBieSBzZXJ2aWNlIVxuICAgIC8vIEJlY2F1c2UgbmdPbkNoYW5nZXMgbmV2ZXIgYmUgY2FsbGVkIHdoZW4gdXNpbmcgYnkgc2VydmljZSxcbiAgICAvLyBoZXJlIHdlIGNhbid0IHN1cHBvcnQgXCJtY0NvbnRlbnRcIihDb21wb25lbnQpIGV0Yy4gYXMgaW5wdXRzIHRoYXQgaW5pdGlhbGl6ZWQgZHluYW1pY2FsbHkuXG4gICAgLy8gQlVUOiBVc2VyIGFsc28gY2FuIGNoYW5nZSBcIm1jQ29udGVudFwiIGR5bmFtaWNhbGx5IHRvIHRyaWdnZXIgVUkgY2hhbmdlc1xuICAgIC8vIChwcm92aWRlZCB5b3UgZG9uJ3QgdXNlIFxiQ29tcG9uZW50IHRoYXQgbmVlZHMgaW5pdGlhbGl6YXRpb25zKVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBEbyBub3QgdHJpZ2dlciBhbmltYXRpb24gd2hpbGUgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVZpc2libGVTdGF0ZUNoYW5nZSh0aGlzLm1jVmlzaWJsZSwgIWNoYW5nZXMubWNWaXNpYmxlLmZpcnN0Q2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gSWYgdXNpbmcgQ29tcG9uZW50LCBpdCBpcyB0aGUgdGltZSB0byBhdHRhY2ggVmlldyB3aGlsZSBib2R5Q29udGFpbmVyIGlzIHJlYWR5XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keUNvbnRhaW5lci5pbnNlcnQodGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgYXV0b0ZvY3VzZWRCdXR0b24gb2YgdGhpcy5hdXRvRm9jdXNlZEJ1dHRvbnMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAoYXV0b0ZvY3VzZWRCdXR0b24ubmF0aXZlRWxlbWVudC5hdXRvZm9jdXMpIHtcbiAgICAgICAgICAgICAgICAoYXV0b0ZvY3VzZWRCdXR0b24ubmF0aXZlRWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuZm9jdXMoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmlzaWJsZUZyb21JbnNpZGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xvc2UocmVzdWx0PzogUikge1xuICAgICAgICB0aGlzLmNoYW5nZVZpc2libGVGcm9tSW5zaWRlKGZhbHNlLCByZXN1bHQpO1xuICAgIH1cblxuICAgIC8vIERlc3Ryb3kgZXF1YWxzIENsb3NlXG4gICAgZGVzdHJveShyZXN1bHQ/OiBSKSB7XG4gICAgICAgIHRoaXMuY2xvc2UocmVzdWx0KTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdHJpZ2dlck9rKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnb2snKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgfVxuXG4gICAgZ2V0SW5zdGFuY2UoKTogTWNNb2RhbENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRDb21wb25lbnRSZWYoKTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudENvbXBvbmVudFJlZjtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50Q29tcG9uZW50KCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50Q29tcG9uZW50UmVmICYmIHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZiAmJiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBvbkNsaWNrTWFzaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5tY01hc2sgJiZcbiAgICAgICAgICAgIHRoaXMubWNNYXNrQ2xvc2FibGUgJiZcbiAgICAgICAgICAgICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ21jLW1vZGFsLXdyYXAnKSAmJlxuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgaXNNb2RhbFR5cGUodHlwZTogTW9kYWxUeXBlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jTW9kYWxUeXBlID09PSB0eXBlO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvbiAua2V5IGlzbid0IHN1cHBvcnRlZCBpbiBFZGdlXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250YWluZXIgJiYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikpIHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIG9uQ2xpY2tDbG9zZUJ0bigpIHtcbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgb25DbGlja09rQ2FuY2VsKHR5cGU6ICdvaycgfCAnY2FuY2VsJykge1xuICAgICAgICBjb25zdCB0cmlnZ2VyID0geyBvazogdGhpcy5tY09uT2ssIGNhbmNlbDogdGhpcy5tY09uQ2FuY2VsIH1bdHlwZV07XG4gICAgICAgIGNvbnN0IGxvYWRpbmdLZXkgPSB7IG9rOiAnbWNPa0xvYWRpbmcnLCBjYW5jZWw6ICdtY0NhbmNlbExvYWRpbmcnIH1bdHlwZV07XG5cbiAgICAgICAgaWYgKHRyaWdnZXIgaW5zdGFuY2VvZiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgIHRyaWdnZXIuZW1pdCh0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyaWdnZXIgPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJpZ2dlcih0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICAgICAgICAvLyBVc2VycyBjYW4gcmV0dXJuIFwiZmFsc2VcIiB0byBwcmV2ZW50IGNsb3NpbmcgYnkgZGVmYXVsdFxuICAgICAgICAgICAgY29uc3QgY2FzZUNsb3NlID0gKGRvQ2xvc2U6IGJvb2xlYW4gfCB2b2lkIHwge30pID0+IChkb0Nsb3NlICE9PSBmYWxzZSkgJiYgdGhpcy5jbG9zZShkb0Nsb3NlIGFzIFIpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2xvYWRpbmdLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVUaGVuID0gKGRvQ2xvc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tsb2FkaW5nS2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlQ2xvc2UoZG9DbG9zZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAocmVzdWx0IGFzIFByb21pc2U8dm9pZD4pLnRoZW4oaGFuZGxlVGhlbikuY2F0Y2goaGFuZGxlVGhlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhc2VDbG9zZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgaXNOb25FbXB0eVN0cmluZyh2YWx1ZToge30pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzVGVtcGxhdGVSZWYodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzQ29tcG9uZW50KHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUeXBlO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzTW9kYWxCdXR0b25zKHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvLyBMb29rdXAgYSBidXR0b24ncyBwcm9wZXJ0eSwgaWYgdGhlIHByb3AgaXMgYSBmdW5jdGlvbiwgY2FsbCAmIHRoZW4gcmV0dXJuIHRoZSByZXN1bHQsIG90aGVyd2lzZSwgcmV0dXJuIGl0c2VsZi5cbiAgICAvLyBBb1RcbiAgICBnZXRCdXR0b25DYWxsYWJsZVByb3Aob3B0aW9uczogSU1vZGFsQnV0dG9uT3B0aW9uczxUPiwgcHJvcDogc3RyaW5nKToge30ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbcHJvcF07XG4gICAgICAgIGNvbnN0IGFyZ3M6IGFueVtdID0gW107XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmFwcGx5KG9wdGlvbnMsIGFyZ3MpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gT24gbWNGb290ZXIncyBtb2RhbCBidXR0b24gY2xpY2tcbiAgICAvLyBBb1RcbiAgICBvbkJ1dHRvbkNsaWNrKGJ1dHRvbjogSU1vZGFsQnV0dG9uT3B0aW9uczxUPikge1xuICAgICAgICAvLyBDYWxsIG9uQ2xpY2sgZGlyZWN0bHlcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWluZmVycmVkLWVtcHR5LW9iamVjdC10eXBlICBydWxlIHNlZW1zIHRvIGJlIGJyb2tlblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldEJ1dHRvbkNhbGxhYmxlUHJvcChidXR0b24sICdvbkNsaWNrJyk7XG4gICAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgYnV0dG9uLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgKHJlc3VsdCBhcyBQcm9taXNlPHt9PikudGhlbigoKSA9PiBidXR0b24ubG9hZGluZyA9IGZhbHNlKS5jYXRjaCgoKSA9PiBidXR0b24ubG9hZGluZyA9IGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvIHJlc3QgdGhpbmdzIHdoZW4gdmlzaWJsZSBzdGF0ZSBjaGFuZ2VkXG4gICAgcHJpdmF0ZSBoYW5kbGVWaXNpYmxlU3RhdGVDaGFuZ2UodmlzaWJsZTogYm9vbGVhbiwgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZSwgY2xvc2VSZXN1bHQ/OiBSKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgLy8gSGlkZSBzY3JvbGxiYXIgYXQgdGhlIGZpcnN0IHRpbWUgd2hlbiBzaG93biB1cFxuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VCb2R5T3ZlcmZsb3coMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgLnJlc29sdmUoYW5pbWF0aW9uICYmIHRoaXMuYW5pbWF0ZVRvKHZpc2libGUpKVxuICAgICAgICAgICAgLy8gRW1pdCBvcGVuL2Nsb3NlIGV2ZW50IGFmdGVyIGFuaW1hdGlvbnMgb3ZlclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNBZnRlck9wZW4uZW1pdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNBZnRlckNsb3NlLmVtaXQoY2xvc2VSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBTaG93L2hpZGUgc2Nyb2xsYmFyIHdoZW4gYW5pbWF0aW9uIGlzIG92ZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VCb2R5T3ZlcmZsb3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDaGFuZ2UgbWNWaXNpYmxlIGZyb20gaW5zaWRlXG4gICAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmxlRnJvbUluc2lkZSh2aXNpYmxlOiBib29sZWFuLCBjbG9zZVJlc3VsdD86IFIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgbWNWaXNpYmxlIHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IHZpc2libGU7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVWaXNpYmxlU3RhdGVDaGFuZ2UodmlzaWJsZSwgdHJ1ZSwgY2xvc2VSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQW5pbWF0aW9uU3RhdGUoc3RhdGU6IEFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tBbmltYXRpb25DbGFzc01hcCA9IHtcbiAgICAgICAgICAgICAgICBbYGZhZGUtJHtzdGF0ZX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBbYGZhZGUtJHtzdGF0ZX0tYWN0aXZlYF06IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSB7XG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9LWFjdGl2ZWBdOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5tYXNrQW5pbWF0aW9uQ2xhc3NNYXAgPSB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudENvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYW5pbWF0ZVRvKGlzVmlzaWJsZTogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGxhc3Rlc3QgY2xpY2sgcG9zaXRpb24gd2hlbiBzaG93cyB1cFxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBbTk9URV0gVXNpbmcgdGltZW91dCBkdWUgdG8gdGhlIGRvY3VtZW50LmNsaWNrIGV2ZW50IGlzIGZpcmVkIGxhdGVyIHRoYW4gdmlzaWJsZSBjaGFuZ2UsXG4gICAgICAgICAgICAvLyBzbyBpZiBub3QgcG9zdHBvbmVkIHRvIG5leHQgZXZlbnQtbG9vcCwgd2UgY2FuJ3QgZ2V0IHRoZSBsYXN0ZXN0IGNsaWNrIHBvc2l0aW9uXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRyYW5zZm9ybU9yaWdpbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlQW5pbWF0aW9uU3RhdGUoaXNWaXNpYmxlID8gJ2VudGVyJyA6ICdsZWF2ZScpO1xuXG4gICAgICAgIC8vIFJldHVybiB3aGVuIGFuaW1hdGlvbiBpcyBvdmVyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBbmltYXRpb25TdGF0ZShudWxsKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgTU9EQUxfQU5JTUFURV9EVVJBVElPTikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0TW9kYWxCdXR0b25zKGJ1dHRvbnM6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSk6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSB7XG4gICAgICAgIHJldHVybiBidXR0b25zLm1hcCgoYnV0dG9uKSA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLmJ1dHRvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tcG9uZW50IGR5bmFtaWNhbGx5IGJ1dCBub3QgYXR0YWNoIHRvIGFueSBWaWV3XG4gICAgICogKHRoaXMgYWN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBib2R5Q29udGFpbmVyIGlzIHJlYWR5KVxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgQ29tcG9uZW50IGNsYXNzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVEeW5hbWljQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxUPikge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgY2hpbGRJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWNNb2RhbFJlZiwgdXNlVmFsdWU6IHRoaXN9XSxcbiAgICAgICAgICAgIHBhcmVudDogdGhpcy52aWV3Q29udGFpbmVyLmluamVjdG9yXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGVudENvbXBvbmVudFJlZiA9IGZhY3RvcnkuY3JlYXRlKGNoaWxkSW5qZWN0b3IpO1xuXG4gICAgICAgIGlmICh0aGlzLm1jQ29tcG9uZW50UGFyYW1zKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5tY0NvbXBvbmVudFBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyB0aGUgZmlyc3QgY2hhbmdlIGRldGVjdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAvLyAob3Igd2UgZG8gZGV0ZWN0aW9uIGF0IG5nQWZ0ZXJWaWV3SW5pdCwgbXVsdGktY2hhbmdlcyBlcnJvciB3aWxsIGJlIHRocm93bilcbiAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdHJhbnNmb3JtLW9yaWdpbiB0byB0aGUgbGFzdCBjbGljayBwb3NpdGlvbiBvbiBkb2N1bWVudFxuICAgIHByaXZhdGUgdXBkYXRlVHJhbnNmb3JtT3JpZ2luKCkge1xuICAgICAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSB0aGlzLm1vZGFsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IE1vZGFsVXRpbC5nZXRMYXN0Q2xpY2tQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmIChsYXN0UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3JpZ2luID0gYCR7bGFzdFBvc2l0aW9uLnggLSBtb2RhbEVsZW1lbnQub2Zmc2V0TGVmdH1weCAke2xhc3RQb3NpdGlvbi55IC0gbW9kYWxFbGVtZW50Lm9mZnNldFRvcH1weCAwcHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZSBjYXJlIG9mIHRoZSBib2R5J3Mgb3ZlcmZsb3cgdG8gZGVjaWRlIHRoZSBleGlzdGVuc2Ugb2Ygc2Nyb2xsYmFyXG4gICAgICogQHBhcmFtIHBsdXNOdW0gVGhlIG51bWJlciB0aGF0IHRoZSBvcGVuTW9kYWxzLmxlbmd0aCB3aWxsIGluY3JlYXNlIHNvb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUJvZHlPdmVyZmxvdyhwbHVzTnVtOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Nb2RhbHMgPSB0aGlzLm1vZGFsQ29udHJvbC5vcGVuTW9kYWxzO1xuXG4gICAgICAgIGlmIChvcGVuTW9kYWxzLmxlbmd0aCArIHBsdXNOdW0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHksICdvdmVyZmxvdycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gaXNQcm9taXNlKG9iajoge30gfCB2b2lkKTogYm9vbGVhbiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICAgIHJldHVybiAhIW9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIChvYmogYXMgUHJvbWlzZTx7fT4pLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIChvYmogYXMgUHJvbWlzZTx7fT4pLmNhdGNoID09PSAnZnVuY3Rpb24nO1xufVxuIl19
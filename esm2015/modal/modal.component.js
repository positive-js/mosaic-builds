import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Injector, Input, Output, QueryList, Renderer2, TemplateRef, Type, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE, ENTER } from '@ptsecurity/cdk/keycodes';
import { ThemePalette } from '@ptsecurity/mosaic/core';
import { McModalControlService } from './modal-control.service';
import { McModalRef } from './modal-ref.class';
import { modalUtilObject as ModalUtil } from './modal-util';
import { ModalSize } from './modal.type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./modal-control.service";
import * as i3 from "@ptsecurity/mosaic/button";
import * as i4 from "@ptsecurity/mosaic/icon";
import * as i5 from "@angular/common";
import * as i6 from "@angular/cdk/a11y";
import * as i7 from "./modal.directive";
import * as i8 from "./css-unit.pipe";
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
        this.themePalette = ThemePalette;
        this.mcModalType = 'default';
        this._mcVisible = false;
        this.mcVisibleChange = new EventEmitter();
        this.mcZIndex = 1000;
        this.mcSize = ModalSize.Normal;
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
        this.isTopOverflow = false;
        this.isBottomOverflow = false;
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
        this.checkOverflow();
    }
    ngOnDestroy() {
        if (this.container instanceof OverlayRef) {
            this.container.dispose();
        }
    }
    checkOverflow() {
        var _a;
        const nativeElement = (_a = this.modalBody) === null || _a === void 0 ? void 0 : _a.nativeElement;
        if (!nativeElement) {
            return;
        }
        const scrollTop = nativeElement.scrollTop;
        const offsetHeight = nativeElement.offsetHeight;
        const scrollHeight = nativeElement.scrollHeight;
        this.isTopOverflow = scrollTop > 0;
        this.isBottomOverflow = scrollTop + offsetHeight < scrollHeight;
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
                resolve(null);
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
/** @nocollapse */ McModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McModalComponent, deps: [{ token: i1.Overlay }, { token: i0.Renderer2 }, { token: i0.ComponentFactoryResolver }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i2.McModalControlService }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McModalComponent, selector: "mc-modal", inputs: { mcModalType: "mcModalType", mcComponent: "mcComponent", mcContent: "mcContent", mcComponentParams: "mcComponentParams", mcFooter: "mcFooter", mcVisible: "mcVisible", mcZIndex: "mcZIndex", mcWidth: "mcWidth", mcSize: "mcSize", mcWrapClassName: "mcWrapClassName", mcClassName: "mcClassName", mcStyle: "mcStyle", mcTitle: "mcTitle", mcCloseByESC: "mcCloseByESC", mcClosable: "mcClosable", mcMask: "mcMask", mcMaskClosable: "mcMaskClosable", mcMaskStyle: "mcMaskStyle", mcBodyStyle: "mcBodyStyle", mcOkText: "mcOkText", mcOkType: "mcOkType", mcOkLoading: "mcOkLoading", mcOnOk: "mcOnOk", mcCancelText: "mcCancelText", mcCancelLoading: "mcCancelLoading", mcOnCancel: "mcOnCancel", mcGetContainer: "mcGetContainer" }, outputs: { mcVisibleChange: "mcVisibleChange", mcAfterOpen: "mcAfterOpen", mcAfterClose: "mcAfterClose", mcOnOk: "mcOnOk", mcOnCancel: "mcOnCancel" }, host: { listeners: { "keydown": "onKeyDown($event)" } }, viewQueries: [{ propertyName: "modalContainer", first: true, predicate: ["modalContainer"], descendants: true, static: true }, { propertyName: "bodyContainer", first: true, predicate: ["bodyContainer"], descendants: true, read: ViewContainerRef }, { propertyName: "modalBody", first: true, predicate: ["modalBody"], descendants: true }, { propertyName: "autoFocusedButtons", predicate: ["autoFocusedButton"], descendants: true, read: ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<!-- Compatible: the <ng-content> can appear only once -->\n<ng-template #tplOriginContent>\n    <ng-content></ng-content>\n</ng-template>\n\n<div>\n    <div *ngIf=\"mcMask\"\n         class=\"mc-modal-mask\"\n         [ngClass]=\"maskAnimationClassMap\"\n         [class.mc-modal-mask-hidden]=\"hidden\"\n         [ngStyle]=\"mcMaskStyle\"\n         [style.zIndex]=\"mcZIndex\"\n    ></div>\n    <div (mousedown)=\"onClickMask($event)\"\n         class=\"mc-modal-wrap {{ mcWrapClassName }}\"\n         [style.zIndex]=\"mcZIndex\"\n         [style.display]=\"hidden ? 'none' : ''\"\n         tabindex=\"-1\">\n\n        <div #modalContainer\n             class=\"mc-modal {{ mcClassName }} mc-modal_{{ mcSize }}\"\n             [ngClass]=\"modalAnimationClassMap\"\n             [ngStyle]=\"mcStyle\"\n             [style.width]=\"mcWidth | toCssUnit\"\n             [style.transform-origin]=\"transformOrigin\">\n\n            <div class=\"mc-modal-content\" cdkTrapFocus>\n                <button *ngIf=\"mcClosable\"\n                        mc-button\n                        (click)=\"onClickCloseBtn()\"\n                        class=\"mc-modal-close mc-button_transparent\">\n                    <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" [color]=\"themePalette.Second\"></i>\n                </button>\n                <ng-container [ngSwitch]=\"true\">\n                    <ng-container *ngSwitchCase=\"isModalType('default')\"\n                                  [ngTemplateOutlet]=\"tplContentDefault\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('confirm')\"\n                                  [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('custom')\"\n                                  [ngTemplateOutlet]=\"tplContentCustom\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template #tplContentCustom>\n    <ng-container #bodyContainer></ng-container>\n</ng-template>\n\n\n<!-- [Predefined] Default Modal Content -->\n<ng-template #tplContentDefault>\n    <div *ngIf=\"mcTitle\" class=\"mc-modal-header\" [class.mc-modal-body_top-overflow]=\"isTopOverflow\">\n        <div class=\"mc-modal-title\">\n            <ng-container [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"$any(mcTitle)\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\">\n                    <div [innerHTML]=\"mcTitle\"></div>\n                </ng-container>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-modal-body\" #modalBody [ngStyle]=\"mcBodyStyle\" (scroll)=\"checkOverflow()\">\n        <ng-container #bodyContainer>\n            <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"$any(mcContent)\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                    <div [innerHTML]=\"mcContent\"></div>\n                </ng-container>\n                <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\" [class.mc-modal-body_bottom-overflow]=\"isBottomOverflow\">\n        <ng-container [ngSwitch]=\"true\">\n            <ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"$any(mcFooter)\"></ng-container>\n            <ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\">\n                <ng-container *ngFor=\"let button of $any(mcFooter)\">\n                    <button\n                        mc-button\n                        #autoFocusedButton\n                        [attr.autofocus]=\"button.autoFocus\"\n                        [attr.mc-modal-main-action]=\"button.mcModalMainAction\"\n                        *ngIf=\"getButtonCallableProp(button, 'show')\"\n                        [disabled]=\"getButtonCallableProp(button, 'disabled')\"\n                        [class.mc-progress]=\"getButtonCallableProp(button, 'loading')\"\n                        (click)=\"onButtonClick(button)\"\n                        [color]=\"button.type\">\n                        {{ button.label }}\n                    </button>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n                <button\n                    #autoFocusedButton\n                    [attr.autofocus]=\"true\"\n                    *ngIf=\"mcOkText !== null\"\n                    mc-button\n                    [color]=\"themePalette.Primary\"\n                    (click)=\"onClickOkCancel('ok')\">\n\n                    {{ okText }}\n                </button>\n                <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">\n                    {{ cancelText }}\n                </button>\n            </ng-container>\n        </ng-container>\n    </div>\n</ng-template>\n<!-- /[Predefined] Default Modal Content -->\n\n<!-- [Predefined] Confirm Modal Content -->\n<ng-template #tplContentConfirm>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <div class=\"mc-confirm-body-wrapper\">\n            <div class=\"mc-confirm-body\">\n                <div class=\"mc-confirm-content\">\n                    <ng-container #bodyContainer>\n                        <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                            <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\"\n                                          [ngTemplateOutlet]=\"$any(mcContent)\">\n                            </ng-container>\n                            <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                                <div [innerHTML]=\"mcContent\"></div>\n                            </ng-container>\n                            <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n                        </ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div> <!-- /.mc-confirm-body-wrapper -->\n    </div>\n    <div class=\"mc-confirm-btns\">\n        <button\n            mc-button\n            #autoFocusedButton\n            [color]=\"mcOkType\"\n            [attr.autofocus]=\"true\"\n            *ngIf=\"mcOkText !== ''\"\n            (click)=\"onClickOkCancel('ok')\">\n\n            {{ okText }}\n        </button>\n\n        <button mc-button [color]=\"themePalette.Second\" *ngIf=\"mcCancelText !== ''\" (click)=\"onClickOkCancel('cancel')\">\n            {{ cancelText }}\n        </button>\n    </div>\n</ng-template>\n<!-- /[Predefined] Confirm Modal Content -->\n", styles: [".mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-close{display:none}.mc-confirm .mc-modal-body{padding:24px;padding:var(--mc-modal-confirm-size-padding, 24px)}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:before,.mc-confirm-body-wrapper:after{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;border-radius:var(--mc-modal-footer-size-border-radius, 0 0 4px 4px);text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;top:var(--mc-modal-size-top, 48px);width:auto;margin:0 auto;list-style:none}.mc-modal.zoom-enter,.mc-modal.zoom-appear{animation-duration:.3s;transform:none;opacity:0}.mc-modal.mc-modal_small{width:400px;width:var(--mc-modal-size-small, 400px)}.mc-modal.mc-modal_normal{width:640px;width:var(--mc-modal-size-normal, 640px)}.mc-modal.mc-modal_large{width:960px;width:var(--mc-modal-size-large, 960px)}.mc-modal .mc-modal-close{position:absolute;z-index:10;top:0;right:0;width:56px;width:var(--mc-modal-size-close-width, 56px);height:56px;height:var(--mc-modal-size-close-width, 56px)}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;border-radius:var(--mc-modal-size-border-radius, 4px);background-clip:padding-box;background-color:#fff}.mc-modal-header{display:block;border-radius:4px 4px 0 0;border-radius:var(--mc-modal-header-size-border-radius, 4px 4px 0 0);padding:14px 16px;padding:var(--mc-modal-header-size-padding, 14px 16px)}.mc-modal-body{display:block;overflow-y:auto;max-height:calc(100vh - 260px);max-height:var(--mc-modal-body-size-max-height, calc(100vh - 260px));padding:16px 24px 24px;padding:var(--mc-modal-body-size-padding, 16px 24px 24px);word-wrap:break-word}.mc-modal-footer{display:block;border-radius:0 0 4px 4px;border-radius:var(--mc-modal-footer-size-border-radius, 0 0 4px 4px);padding:16px;padding:var(--mc-modal-footer-size-padding, 16px 16px);text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}\n"], components: [{ type: i3.McButton, selector: "button[mc-button]", inputs: ["disabled", "color"] }, { type: i4.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i6.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i3.McButtonCssStyler, selector: "button[mc-button], a[mc-button]" }, { type: i4.McIconCSSStyler, selector: "[mc-icon]" }, { type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.McModalMainAction, selector: "[mc-modal-main-action]" }], pipes: { "toCssUnit": i8.CssUnitPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-modal',
                    templateUrl: './modal.component.html',
                    styleUrls: ['./modal.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '(keydown)': 'onKeyDown($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Renderer2 }, { type: i0.ComponentFactoryResolver }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i2.McModalControlService }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { mcModalType: [{
                type: Input
            }], mcComponent: [{
                type: Input
            }], mcContent: [{
                type: Input
            }], mcComponentParams: [{
                type: Input
            }], mcFooter: [{
                type: Input
            }], mcVisible: [{
                type: Input
            }], mcVisibleChange: [{
                type: Output
            }], mcZIndex: [{
                type: Input
            }], mcWidth: [{
                type: Input
            }], mcSize: [{
                type: Input
            }], mcWrapClassName: [{
                type: Input
            }], mcClassName: [{
                type: Input
            }], mcStyle: [{
                type: Input
            }], mcTitle: [{
                type: Input
            }], mcCloseByESC: [{
                type: Input
            }], mcClosable: [{
                type: Input
            }], mcMask: [{
                type: Input
            }], mcMaskClosable: [{
                type: Input
            }], mcMaskStyle: [{
                type: Input
            }], mcBodyStyle: [{
                type: Input
            }], mcAfterOpen: [{
                type: Output
            }], mcAfterClose: [{
                type: Output
            }], mcOkText: [{
                type: Input
            }], mcOkType: [{
                type: Input
            }], mcOkLoading: [{
                type: Input
            }], mcOnOk: [{
                type: Input
            }, {
                type: Output
            }], mcCancelText: [{
                type: Input
            }], mcCancelLoading: [{
                type: Input
            }], mcOnCancel: [{
                type: Input
            }, {
                type: Output
            }], modalContainer: [{
                type: ViewChild,
                args: ['modalContainer', { static: true }]
            }], bodyContainer: [{
                type: ViewChild,
                args: ['bodyContainer', { read: ViewContainerRef, static: false }]
            }], autoFocusedButtons: [{
                type: ViewChildren,
                args: ['autoFocusedButton', { read: ElementRef }]
            }], modalBody: [{
                type: ViewChild,
                args: ['modalBody']
            }], mcGetContainer: [{
                type: Input
            }] } });
////////////
function isPromise(obj) {
    // tslint:disable-next-line: no-unbound-method
    return !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function' &&
        typeof obj.catch === 'function';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL21vZGFsL21vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9tb2RhbC9tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1Qsd0JBQXdCLEVBRXhCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBSUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBRVQsV0FBVyxFQUNYLElBQUksRUFDSixTQUFTLEVBQ1QsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLElBQUksU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVELE9BQU8sRUFBc0MsU0FBUyxFQUE4QixNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7OztBQUd6Ryx3Q0FBd0M7QUFDeEMsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFDO0FBZTFDLE1BQU0sT0FBTyxnQkFBbUMsU0FBUSxVQUFn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S0FBSyxVQUFVLENBQUM7QUFDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVHlwZSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NoaWxkcmVuLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUsIEVOVEVSIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWNNb2RhbENvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWNNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmLmNsYXNzJztcbmltcG9ydCB7IG1vZGFsVXRpbE9iamVjdCBhcyBNb2RhbFV0aWwgfSBmcm9tICcuL21vZGFsLXV0aWwnO1xuaW1wb3J0IHsgSU1vZGFsQnV0dG9uT3B0aW9ucywgSU1vZGFsT3B0aW9ucywgTW9kYWxTaXplLCBNb2RhbFR5cGUsIE9uQ2xpY2tDYWxsYmFjayB9IGZyb20gJy4vbW9kYWwudHlwZSc7XG5cblxuLy8gRHVyYXRpb24gd2hlbiBwZXJmb3JtIGFuaW1hdGlvbnMgKG1zKVxuZXhwb3J0IGNvbnN0IE1PREFMX0FOSU1BVEVfRFVSQVRJT04gPSAyMDA7XG5cbnR5cGUgQW5pbWF0aW9uU3RhdGUgPSAnZW50ZXInIHwgJ2xlYXZlJyB8IG51bGw7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1tb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tb2RhbC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY01vZGFsQ29tcG9uZW50PFQgPSBhbnksIFIgPSBhbnk+IGV4dGVuZHMgTWNNb2RhbFJlZjxULCBSPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSU1vZGFsT3B0aW9ucyB7XG5cbiAgICB0aGVtZVBhbGV0dGUgPSBUaGVtZVBhbGV0dGU7XG5cbiAgICBASW5wdXQoKSBtY01vZGFsVHlwZTogTW9kYWxUeXBlID0gJ2RlZmF1bHQnO1xuXG4gICAgLy8gVGhlIGluc3RhbmNlIG9mIGNvbXBvbmVudCBvcGVuZWQgaW50byB0aGUgZGlhbG9nLlxuICAgIEBJbnB1dCgpIG1jQ29tcG9uZW50OiBUeXBlPFQ+O1xuICAgIC8vIElmIG5vdCBzcGVjaWZpZWQsIHdpbGwgdXNlIDxuZy1jb250ZW50PlxuICAgIEBJbnB1dCgpIG1jQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+IHwgVHlwZTxUPjtcbiAgICAvLyBhdmFpbGFibGUgd2hlbiBtY0NvbnRlbnQgaXMgYSBjb21wb25lbnRcbiAgICBASW5wdXQoKSBtY0NvbXBvbmVudFBhcmFtczogVDtcbiAgICAvLyBEZWZhdWx0IE1vZGFsIE9OTFlcbiAgICBASW5wdXQoKSBtY0Zvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+IHwgSU1vZGFsQnV0dG9uT3B0aW9uczxUPltdO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNWaXNpYmxlKCkgeyByZXR1cm4gdGhpcy5fbWNWaXNpYmxlOyB9XG4gICAgc2V0IG1jVmlzaWJsZSh2YWx1ZSkgeyB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTsgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KCkgbWNaSW5kZXg6IG51bWJlciA9IDEwMDA7XG4gICAgQElucHV0KCkgbWNXaWR0aDogbnVtYmVyIHwgc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jU2l6ZTogTW9kYWxTaXplID0gTW9kYWxTaXplLk5vcm1hbDtcbiAgICBASW5wdXQoKSBtY1dyYXBDbGFzc05hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtY0NsYXNzTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jU3R5bGU6IG9iamVjdDtcbiAgICBASW5wdXQoKSBtY1RpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7fT47XG4gICAgQElucHV0KCkgbWNDbG9zZUJ5RVNDOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jQ2xvc2FibGUoKSB7IHJldHVybiB0aGlzLl9tY0Nsb3NhYmxlOyB9XG4gICAgc2V0IG1jQ2xvc2FibGUodmFsdWUpIHsgdGhpcy5fbWNDbG9zYWJsZSA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNDbG9zYWJsZSA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY01hc2soKSB7IHJldHVybiB0aGlzLl9tY01hc2s7IH1cbiAgICBzZXQgbWNNYXNrKHZhbHVlKSB7IHRoaXMuX21jTWFzayA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNNYXNrID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jTWFza0Nsb3NhYmxlKCkgeyByZXR1cm4gdGhpcy5fbWNNYXNrQ2xvc2FibGU7IH1cbiAgICBzZXQgbWNNYXNrQ2xvc2FibGUodmFsdWUpIHsgdGhpcy5fbWNNYXNrQ2xvc2FibGUgPSB2YWx1ZTsgfVxuICAgIHByaXZhdGUgX21jTWFza0Nsb3NhYmxlID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBtY01hc2tTdHlsZTogb2JqZWN0O1xuICAgIEBJbnB1dCgpIG1jQm9keVN0eWxlOiBvYmplY3Q7XG5cbiAgICAvLyBUcmlnZ2VyIHdoZW4gbW9kYWwgb3Blbih2aXNpYmxlKSBhZnRlciBhbmltYXRpb25zXG4gICAgQE91dHB1dCgpIG1jQWZ0ZXJPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIC8vIFRyaWdnZXIgd2hlbiBtb2RhbCBsZWF2ZS1hbmltYXRpb24gb3ZlclxuICAgIEBPdXRwdXQoKSBtY0FmdGVyQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPFI+KCk7XG5cbiAgICAvLyAtLS0gUHJlZGVmaW5lZCBPSyAmIENhbmNlbCBidXR0b25zXG4gICAgQElucHV0KCkgbWNPa1RleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBtY09rVHlwZSA9ICdwcmltYXJ5JztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jT2tMb2FkaW5nKCkgeyByZXR1cm4gdGhpcy5fbWNPa0xvYWRpbmc7IH1cbiAgICBzZXQgbWNPa0xvYWRpbmcodmFsdWUpIHsgdGhpcy5fbWNPa0xvYWRpbmcgPSB2YWx1ZTsgfVxuICAgIHByaXZhdGUgX21jT2tMb2FkaW5nID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBAT3V0cHV0KCkgbWNPbk9rOiBFdmVudEVtaXR0ZXI8VD4gfCBPbkNsaWNrQ2FsbGJhY2s8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG4gICAgQElucHV0KCkgbWNDYW5jZWxUZXh0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY0NhbmNlbExvYWRpbmcoKSB7IHJldHVybiB0aGlzLl9tY0NhbmNlbExvYWRpbmc7IH1cbiAgICBzZXQgbWNDYW5jZWxMb2FkaW5nKHZhbHVlKSB7IHRoaXMuX21jQ2FuY2VsTG9hZGluZyA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNDYW5jZWxMb2FkaW5nID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBAT3V0cHV0KCkgbWNPbkNhbmNlbDogRXZlbnRFbWl0dGVyPFQ+IHwgT25DbGlja0NhbGxiYWNrPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbW9kYWxDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBtb2RhbENvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdib2R5Q29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IGZhbHNlIH0pIGJvZHlDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gICAgLy8gT25seSBhaW0gdG8gZm9jdXMgdGhlIG9rIGJ1dHRvbiB0aGF0IG5lZWRzIHRvIGJlIGF1dG8gZm9jdXNlZFxuICAgIEBWaWV3Q2hpbGRyZW4oJ2F1dG9Gb2N1c2VkQnV0dG9uJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIGF1dG9Gb2N1c2VkQnV0dG9uczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnbW9kYWxCb2R5JykgbW9kYWxCb2R5OiBFbGVtZW50UmVmO1xuXG4gICAgaXNUb3BPdmVyZmxvdzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzQm90dG9tT3ZlcmZsb3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG1hc2tBbmltYXRpb25DbGFzc01hcDogb2JqZWN0O1xuICAgIG1vZGFsQW5pbWF0aW9uQ2xhc3NNYXA6IG9iamVjdDtcbiAgICAvLyBUaGUgb3JpZ2luIHBvaW50IHRoYXQgYW5pbWF0aW9uIGJhc2VkIG9uXG4gICAgdHJhbnNmb3JtT3JpZ2luID0gJzBweCAwcHggMHB4JztcblxuICAgIC8vIE9ic2VydmFibGUgYWxpYXMgZm9yIG1jQWZ0ZXJPcGVuXG4gICAgZ2V0IGFmdGVyT3BlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNBZnRlck9wZW4uYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLy8gT2JzZXJ2YWJsZSBhbGlhcyBmb3IgbWNBZnRlckNsb3NlXG4gICAgZ2V0IGFmdGVyQ2xvc2UoKTogT2JzZXJ2YWJsZTxSPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jQWZ0ZXJDbG9zZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBnZXQgb2tUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jT2tUZXh0O1xuICAgIH1cblxuICAgIGdldCBjYW5jZWxUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jQ2FuY2VsVGV4dDtcbiAgICB9XG5cbiAgICAvLyBJbmRpY2F0ZSB3aGV0aGVyIHRoaXMgZGlhbG9nIHNob3VsZCBoaWRkZW5cbiAgICBnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMubWNWaXNpYmxlICYmICF0aGlzLmFuaW1hdGlvblN0YXRlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB0aGUgcmVmZXJlbmNlIHdoZW4gdXNpbmcgbWNDb250ZW50IGFzIENvbXBvbmVudFxuICAgIHByaXZhdGUgY29udGVudENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFQ+O1xuICAgIC8vIEN1cnJlbnQgYW5pbWF0aW9uIHN0YXRlXG4gICAgcHJpdmF0ZSBhbmltYXRpb25TdGF0ZTogQW5pbWF0aW9uU3RhdGU7XG4gICAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50IHwgT3ZlcmxheVJlZjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgbW9kYWxDb250cm9sOiBNY01vZGFsQ29udHJvbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBtY0dldENvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBPdmVybGF5UmVmIHwgKCgpID0+IEhUTUxFbGVtZW50IHwgT3ZlcmxheVJlZikgPSAoKSA9PiB0aGlzLm92ZXJsYXkuY3JlYXRlKCk7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGNvbXBvbmVudCBhbG9uZyB3aXRob3V0IFZpZXdcbiAgICAgICAgaWYgKHRoaXMuaXNDb21wb25lbnQodGhpcy5tY0NvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUR5bmFtaWNDb21wb25lbnQodGhpcy5tY0NvbnRlbnQgYXMgVHlwZTxUPik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR1cCBkZWZhdWx0IGJ1dHRvbiBvcHRpb25zXG4gICAgICAgIGlmICh0aGlzLmlzTW9kYWxCdXR0b25zKHRoaXMubWNGb290ZXIpKSB7XG4gICAgICAgICAgICB0aGlzLm1jRm9vdGVyID0gdGhpcy5mb3JtYXRNb2RhbEJ1dHRvbnModGhpcy5tY0Zvb3RlciBhcyBJTW9kYWxCdXR0b25PcHRpb25zPFQ+W10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDb21wb25lbnQodGhpcy5tY0NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHluYW1pY0NvbXBvbmVudCh0aGlzLm1jQ29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBtb2RhbCBkb20gdG8gZWxzZXdoZXJlXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdHlwZW9mIHRoaXMubWNHZXRDb250YWluZXIgPT09ICdmdW5jdGlvbicgPyB0aGlzLm1jR2V0Q29udGFpbmVyKCkgOiB0aGlzLm1jR2V0Q29udGFpbmVyO1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikge1xuICAgICAgICAgICAgLy8gTk9URTogb25seSBhdHRhY2ggdGhlIGRvbSB0byBvdmVybGF5LCB0aGUgdmlldyBjb250YWluZXIgaXMgbm90IGNoYW5nZWQgYWN0dWFsbHlcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm92ZXJsYXlFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZ2lzdGVyIG1vZGFsIHdoZW4gYWZ0ZXJPcGVuL2FmdGVyQ2xvc2UgaXMgc3RhYmxlXG4gICAgICAgIHRoaXMubW9kYWxDb250cm9sLnJlZ2lzdGVyTW9kYWwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gW05PVEVdIE5PVCBhdmFpbGFibGUgd2hlbiB1c2luZyBieSBzZXJ2aWNlIVxuICAgIC8vIEJlY2F1c2UgbmdPbkNoYW5nZXMgbmV2ZXIgYmUgY2FsbGVkIHdoZW4gdXNpbmcgYnkgc2VydmljZSxcbiAgICAvLyBoZXJlIHdlIGNhbid0IHN1cHBvcnQgXCJtY0NvbnRlbnRcIihDb21wb25lbnQpIGV0Yy4gYXMgaW5wdXRzIHRoYXQgaW5pdGlhbGl6ZWQgZHluYW1pY2FsbHkuXG4gICAgLy8gQlVUOiBVc2VyIGFsc28gY2FuIGNoYW5nZSBcIm1jQ29udGVudFwiIGR5bmFtaWNhbGx5IHRvIHRyaWdnZXIgVUkgY2hhbmdlc1xuICAgIC8vIChwcm92aWRlZCB5b3UgZG9uJ3QgdXNlIFxiQ29tcG9uZW50IHRoYXQgbmVlZHMgaW5pdGlhbGl6YXRpb25zKVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBEbyBub3QgdHJpZ2dlciBhbmltYXRpb24gd2hpbGUgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVZpc2libGVTdGF0ZUNoYW5nZSh0aGlzLm1jVmlzaWJsZSwgIWNoYW5nZXMubWNWaXNpYmxlLmZpcnN0Q2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gSWYgdXNpbmcgQ29tcG9uZW50LCBpdCBpcyB0aGUgdGltZSB0byBhdHRhY2ggVmlldyB3aGlsZSBib2R5Q29udGFpbmVyIGlzIHJlYWR5XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keUNvbnRhaW5lci5pbnNlcnQodGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYnV0dG9uJylbMF0/LmZvY3VzKCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBhdXRvRm9jdXNlZEJ1dHRvbiBvZiB0aGlzLmF1dG9Gb2N1c2VkQnV0dG9ucy50b0FycmF5KCkpIHtcbiAgICAgICAgICAgIGlmIChhdXRvRm9jdXNlZEJ1dHRvbi5uYXRpdmVFbGVtZW50LmF1dG9mb2N1cykge1xuICAgICAgICAgICAgICAgIChhdXRvRm9jdXNlZEJ1dHRvbi5uYXRpdmVFbGVtZW50IGFzIEhUTUxCdXR0b25FbGVtZW50KS5mb2N1cygpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrT3ZlcmZsb3coKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tPdmVyZmxvdygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMubW9kYWxCb2R5Py5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIGlmICghbmF0aXZlRWxlbWVudCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBzY3JvbGxUb3A6IG51bWJlciA9IG5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICBjb25zdCBvZmZzZXRIZWlnaHQ6IG51bWJlciA9IG5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQ6IG51bWJlciA9IG5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuaXNUb3BPdmVyZmxvdyA9IHNjcm9sbFRvcCA+IDA7XG5cbiAgICAgICAgdGhpcy5pc0JvdHRvbU92ZXJmbG93ID0gKHNjcm9sbFRvcCBhcyBudW1iZXIgKyBvZmZzZXRIZWlnaHQgYXMgbnVtYmVyKSA8IHNjcm9sbEhlaWdodDtcbiAgICB9XG5cbiAgICBvcGVuKCkge1xuICAgICAgICB0aGlzLmNoYW5nZVZpc2libGVGcm9tSW5zaWRlKHRydWUpO1xuICAgIH1cblxuICAgIGNsb3NlKHJlc3VsdD86IFIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VWaXNpYmxlRnJvbUluc2lkZShmYWxzZSwgcmVzdWx0KTtcbiAgICB9XG5cbiAgICAvLyBEZXN0cm95IGVxdWFscyBDbG9zZVxuICAgIGRlc3Ryb3kocmVzdWx0PzogUikge1xuICAgICAgICB0aGlzLmNsb3NlKHJlc3VsdCk7XG4gICAgfVxuXG4gICAgbWFya0ZvckNoZWNrKCkge1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRyaWdnZXJPaygpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrT2tDYW5jZWwoJ29rJyk7XG4gICAgfVxuXG4gICAgdHJpZ2dlckNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrT2tDYW5jZWwoJ2NhbmNlbCcpO1xuICAgIH1cblxuICAgIGdldEluc3RhbmNlKCk6IE1jTW9kYWxDb21wb25lbnQge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRDb250ZW50Q29tcG9uZW50UmVmKCk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRDb21wb25lbnRSZWY7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudENvbXBvbmVudCgpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudENvbXBvbmVudFJlZiAmJiB0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYgJiYgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0TWNGb290ZXIoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50KCkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWMtbW9kYWwtZm9vdGVyJykuaXRlbSgwKSBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBvbkNsaWNrTWFzaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5tY01hc2sgJiZcbiAgICAgICAgICAgIHRoaXMubWNNYXNrQ2xvc2FibGUgJiZcbiAgICAgICAgICAgICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ21jLW1vZGFsLXdyYXAnKSAmJlxuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgaXNNb2RhbFR5cGUodHlwZTogTW9kYWxUeXBlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jTW9kYWxUeXBlID09PSB0eXBlO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvbiAua2V5IGlzbid0IHN1cHBvcnRlZCBpbiBFZGdlXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250YWluZXIgJiYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikpIHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb24gLmtleSBpc24ndCBzdXBwb3J0ZWQgaW4gRWRnZVxuICAgICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICAgICAgaWYgKHRoaXMubWNNb2RhbFR5cGUgPT09ICdjb25maXJtJykge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlck9rKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICh0aGlzLmdldEVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKCdbbWMtbW9kYWwtbWFpbi1hY3Rpb25dJykgYXMgSFRNTEVsZW1lbnQpPy5jbGljaygpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgb25DbGlja0Nsb3NlQnRuKCkge1xuICAgICAgICBpZiAodGhpcy5tY1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMub25DbGlja09rQ2FuY2VsKCdjYW5jZWwnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tcmVzZXJ2ZWQta2V5d29yZHNcbiAgICBvbkNsaWNrT2tDYW5jZWwodHlwZTogJ29rJyB8ICdjYW5jZWwnKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSB7IG9rOiB0aGlzLm1jT25PaywgY2FuY2VsOiB0aGlzLm1jT25DYW5jZWwgfVt0eXBlXTtcbiAgICAgICAgY29uc3QgbG9hZGluZ0tleSA9IHsgb2s6ICdtY09rTG9hZGluZycsIGNhbmNlbDogJ21jQ2FuY2VsTG9hZGluZycgfVt0eXBlXTtcblxuICAgICAgICBpZiAodHJpZ2dlciBpbnN0YW5jZW9mIEV2ZW50RW1pdHRlcikge1xuICAgICAgICAgICAgdHJpZ2dlci5lbWl0KHRoaXMuZ2V0Q29udGVudENvbXBvbmVudCgpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHJpZ2dlciA9PT0gJ2Z1bmN0aW9uJykge1xuXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0cmlnZ2VyKHRoaXMuZ2V0Q29udGVudENvbXBvbmVudCgpKTtcbiAgICAgICAgICAgIC8vIFVzZXJzIGNhbiByZXR1cm4gXCJmYWxzZVwiIHRvIHByZXZlbnQgY2xvc2luZyBieSBkZWZhdWx0XG4gICAgICAgICAgICBjb25zdCBjYXNlQ2xvc2UgPSAoZG9DbG9zZTogYm9vbGVhbiB8IHZvaWQgfCB7fSkgPT4gKGRvQ2xvc2UgIT09IGZhbHNlKSAmJiB0aGlzLmNsb3NlKGRvQ2xvc2UgYXMgUik7XG5cbiAgICAgICAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIHRoaXNbbG9hZGluZ0tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZVRoZW4gPSAoZG9DbG9zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2xvYWRpbmdLZXldID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VDbG9zZShkb0Nsb3NlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgUHJvbWlzZTx2b2lkPikudGhlbihoYW5kbGVUaGVuKS5jYXRjaChoYW5kbGVUaGVuKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FzZUNsb3NlKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICBpc05vbkVtcHR5U3RyaW5nKHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJyc7XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgaXNUZW1wbGF0ZVJlZih2YWx1ZToge30pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgaXNDb21wb25lbnQodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFR5cGU7XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgaXNNb2RhbEJ1dHRvbnModmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8vIExvb2t1cCBhIGJ1dHRvbidzIHByb3BlcnR5LCBpZiB0aGUgcHJvcCBpcyBhIGZ1bmN0aW9uLCBjYWxsICYgdGhlbiByZXR1cm4gdGhlIHJlc3VsdCwgb3RoZXJ3aXNlLCByZXR1cm4gaXRzZWxmLlxuICAgIC8vIEFvVFxuICAgIGdldEJ1dHRvbkNhbGxhYmxlUHJvcChvcHRpb25zOiBJTW9kYWxCdXR0b25PcHRpb25zPFQ+LCBwcm9wOiBzdHJpbmcpOiB7fSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1twcm9wXTtcbiAgICAgICAgY29uc3QgYXJnczogYW55W10gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudENvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gdmFsdWUuYXBwbHkob3B0aW9ucywgYXJncykgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBPbiBtY0Zvb3RlcidzIG1vZGFsIGJ1dHRvbiBjbGlja1xuICAgIC8vIEFvVFxuICAgIG9uQnV0dG9uQ2xpY2soYnV0dG9uOiBJTW9kYWxCdXR0b25PcHRpb25zPFQ+KSB7XG4gICAgICAgIC8vIENhbGwgb25DbGljayBkaXJlY3RseVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5mZXJyZWQtZW1wdHktb2JqZWN0LXR5cGUgIHJ1bGUgc2VlbXMgdG8gYmUgYnJva2VuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKGJ1dHRvbiwgJ29uQ2xpY2snKTtcbiAgICAgICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgICAgICBidXR0b24ubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAocmVzdWx0IGFzIFByb21pc2U8e30+KS50aGVuKCgpID0+IGJ1dHRvbi5sb2FkaW5nID0gZmFsc2UpLmNhdGNoKCgpID0+IGJ1dHRvbi5sb2FkaW5nID0gZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRG8gcmVzdCB0aGluZ3Mgd2hlbiB2aXNpYmxlIHN0YXRlIGNoYW5nZWRcbiAgICBwcml2YXRlIGhhbmRsZVZpc2libGVTdGF0ZUNoYW5nZSh2aXNpYmxlOiBib29sZWFuLCBhbmltYXRpb246IGJvb2xlYW4gPSB0cnVlLCBjbG9zZVJlc3VsdD86IFIpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICAvLyBIaWRlIHNjcm9sbGJhciBhdCB0aGUgZmlyc3QgdGltZSB3aGVuIHNob3duIHVwXG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUJvZHlPdmVyZmxvdygxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlXG4gICAgICAgICAgICAucmVzb2x2ZShhbmltYXRpb24gJiYgdGhpcy5hbmltYXRlVG8odmlzaWJsZSkpXG4gICAgICAgICAgICAvLyBFbWl0IG9wZW4vY2xvc2UgZXZlbnQgYWZ0ZXIgYW5pbWF0aW9ucyBvdmVyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tY0FmdGVyT3Blbi5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tY0FmdGVyQ2xvc2UuZW1pdChjbG9zZVJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cvaGlkZSBzY3JvbGxiYXIgd2hlbiBhbmltYXRpb24gaXMgb3ZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUJvZHlPdmVyZmxvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENoYW5nZSBtY1Zpc2libGUgZnJvbSBpbnNpZGVcbiAgICBwcml2YXRlIGNoYW5nZVZpc2libGVGcm9tSW5zaWRlKHZpc2libGU6IGJvb2xlYW4sIGNsb3NlUmVzdWx0PzogUik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy5tY1Zpc2libGUgIT09IHZpc2libGUpIHtcbiAgICAgICAgICAgIC8vIENoYW5nZSBtY1Zpc2libGUgdmFsdWUgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlID0gdmlzaWJsZTtcbiAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQodmlzaWJsZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVZpc2libGVTdGF0ZUNoYW5nZSh2aXNpYmxlLCB0cnVlLCBjbG9zZVJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFuZ2VBbmltYXRpb25TdGF0ZShzdGF0ZTogQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHN0YXRlO1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMubWFza0FuaW1hdGlvbkNsYXNzTWFwID0ge1xuICAgICAgICAgICAgICAgIFtgZmFkZS0ke3N0YXRlfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgIFtgZmFkZS0ke3N0YXRlfS1hY3RpdmVgXTogdHJ1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5tb2RhbEFuaW1hdGlvbkNsYXNzTWFwID0ge1xuICAgICAgICAgICAgICAgIFtgem9vbS0ke3N0YXRlfWBdOiB0cnVlLFxuICAgICAgICAgICAgICAgIFtgem9vbS0ke3N0YXRlfS1hY3RpdmVgXTogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMubWFza0FuaW1hdGlvbkNsYXNzTWFwID0gdGhpcy5tb2RhbEFuaW1hdGlvbkNsYXNzTWFwID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudENvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFuaW1hdGVUbyhpc1Zpc2libGU6IGJvb2xlYW4pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICAvLyBGaWd1cmUgb3V0IHRoZSBsYXN0ZXN0IGNsaWNrIHBvc2l0aW9uIHdoZW4gc2hvd3MgdXBcbiAgICAgICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICAgICAgLy8gW05PVEVdIFVzaW5nIHRpbWVvdXQgZHVlIHRvIHRoZSBkb2N1bWVudC5jbGljayBldmVudCBpcyBmaXJlZCBsYXRlciB0aGFuIHZpc2libGUgY2hhbmdlLFxuICAgICAgICAgICAgLy8gc28gaWYgbm90IHBvc3Rwb25lZCB0byBuZXh0IGV2ZW50LWxvb3AsIHdlIGNhbid0IGdldCB0aGUgbGFzdGVzdCBjbGljayBwb3NpdGlvblxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVUcmFuc2Zvcm1PcmlnaW4oKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZUFuaW1hdGlvblN0YXRlKGlzVmlzaWJsZSA/ICdlbnRlcicgOiAnbGVhdmUnKTtcblxuICAgICAgICAvLyBSZXR1cm4gd2hlbiBhbmltYXRpb24gaXMgb3ZlclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQW5pbWF0aW9uU3RhdGUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBNT0RBTF9BTklNQVRFX0RVUkFUSU9OXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvcm1hdE1vZGFsQnV0dG9ucyhidXR0b25zOiBJTW9kYWxCdXR0b25PcHRpb25zPFQ+W10pOiBJTW9kYWxCdXR0b25PcHRpb25zPFQ+W10ge1xuICAgICAgICByZXR1cm4gYnV0dG9ucy5tYXAoKGJ1dHRvbikgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RlZmF1bHQnLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAuLi5idXR0b25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNvbXBvbmVudCBkeW5hbWljYWxseSBidXQgbm90IGF0dGFjaCB0byBhbnkgVmlld1xuICAgICAqICh0aGlzIGFjdGlvbiB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gYm9keUNvbnRhaW5lciBpcyByZWFkeSlcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50IENvbXBvbmVudCBjbGFzc1xuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlRHluYW1pY0NvbXBvbmVudChjb21wb25lbnQ6IFR5cGU8VD4pIHtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGNoaWxkSW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICAgICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1jTW9kYWxSZWYsIHVzZVZhbHVlOiB0aGlzfV0sXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXMudmlld0NvbnRhaW5lci5pbmplY3RvclxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZShjaGlsZEluamVjdG9yKTtcblxuICAgICAgICBpZiAodGhpcy5tY0NvbXBvbmVudFBhcmFtcykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYuaW5zdGFuY2UsIHRoaXMubWNDb21wb25lbnRQYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG8gdGhlIGZpcnN0IGNoYW5nZSBkZXRlY3Rpb24gaW1tZWRpYXRlbHlcbiAgICAgICAgLy8gKG9yIHdlIGRvIGRldGVjdGlvbiBhdCBuZ0FmdGVyVmlld0luaXQsIG11bHRpLWNoYW5nZXMgZXJyb3Igd2lsbCBiZSB0aHJvd24pXG4gICAgICAgIHRoaXMuY29udGVudENvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRyYW5zZm9ybS1vcmlnaW4gdG8gdGhlIGxhc3QgY2xpY2sgcG9zaXRpb24gb24gZG9jdW1lbnRcbiAgICBwcml2YXRlIHVwZGF0ZVRyYW5zZm9ybU9yaWdpbigpIHtcbiAgICAgICAgY29uc3QgbW9kYWxFbGVtZW50ID0gdGhpcy5tb2RhbENvbnRhaW5lci5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBsYXN0UG9zaXRpb24gPSBNb2RhbFV0aWwuZ2V0TGFzdENsaWNrUG9zaXRpb24oKTtcblxuICAgICAgICBpZiAobGFzdFBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9yaWdpbiA9IGAke2xhc3RQb3NpdGlvbi54IC0gbW9kYWxFbGVtZW50Lm9mZnNldExlZnR9cHggJHtsYXN0UG9zaXRpb24ueSAtIG1vZGFsRWxlbWVudC5vZmZzZXRUb3B9cHggMHB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2UgY2FyZSBvZiB0aGUgYm9keSdzIG92ZXJmbG93IHRvIGRlY2lkZSB0aGUgZXhpc3RlbnNlIG9mIHNjcm9sbGJhclxuICAgICAqIEBwYXJhbSBwbHVzTnVtIFRoZSBudW1iZXIgdGhhdCB0aGUgb3Blbk1vZGFscy5sZW5ndGggd2lsbCBpbmNyZWFzZSBzb29uXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VCb2R5T3ZlcmZsb3cocGx1c051bTogbnVtYmVyID0gMCkge1xuICAgICAgICBjb25zdCBvcGVuTW9kYWxzID0gdGhpcy5tb2RhbENvbnRyb2wub3Blbk1vZGFscztcblxuICAgICAgICBpZiAob3Blbk1vZGFscy5sZW5ndGggKyBwbHVzTnVtID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHksICdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5kb2N1bWVudC5ib2R5LCAnb3ZlcmZsb3cnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vXG5cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmo6IHt9IHwgdm9pZCk6IGJvb2xlYW4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5ib3VuZC1tZXRob2RcbiAgICByZXR1cm4gISFvYmogJiZcbiAgICAgICAgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpICYmXG4gICAgICAgIHR5cGVvZiAob2JqIGFzIFByb21pc2U8e30+KS50aGVuID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgIHR5cGVvZiAob2JqIGFzIFByb21pc2U8e30+KS5jYXRjaCA9PT0gJ2Z1bmN0aW9uJztcbn1cbiIsIjwhLS0gQ29tcGF0aWJsZTogdGhlIDxuZy1jb250ZW50PiBjYW4gYXBwZWFyIG9ubHkgb25jZSAtLT5cbjxuZy10ZW1wbGF0ZSAjdHBsT3JpZ2luQ29udGVudD5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuXG48ZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJtY01hc2tcIlxuICAgICAgICAgY2xhc3M9XCJtYy1tb2RhbC1tYXNrXCJcbiAgICAgICAgIFtuZ0NsYXNzXT1cIm1hc2tBbmltYXRpb25DbGFzc01hcFwiXG4gICAgICAgICBbY2xhc3MubWMtbW9kYWwtbWFzay1oaWRkZW5dPVwiaGlkZGVuXCJcbiAgICAgICAgIFtuZ1N0eWxlXT1cIm1jTWFza1N0eWxlXCJcbiAgICAgICAgIFtzdHlsZS56SW5kZXhdPVwibWNaSW5kZXhcIlxuICAgID48L2Rpdj5cbiAgICA8ZGl2IChtb3VzZWRvd24pPVwib25DbGlja01hc2soJGV2ZW50KVwiXG4gICAgICAgICBjbGFzcz1cIm1jLW1vZGFsLXdyYXAge3sgbWNXcmFwQ2xhc3NOYW1lIH19XCJcbiAgICAgICAgIFtzdHlsZS56SW5kZXhdPVwibWNaSW5kZXhcIlxuICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiaGlkZGVuID8gJ25vbmUnIDogJydcIlxuICAgICAgICAgdGFiaW5kZXg9XCItMVwiPlxuXG4gICAgICAgIDxkaXYgI21vZGFsQ29udGFpbmVyXG4gICAgICAgICAgICAgY2xhc3M9XCJtYy1tb2RhbCB7eyBtY0NsYXNzTmFtZSB9fSBtYy1tb2RhbF97eyBtY1NpemUgfX1cIlxuICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXBcIlxuICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIm1jU3R5bGVcIlxuICAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCJtY1dpZHRoIHwgdG9Dc3NVbml0XCJcbiAgICAgICAgICAgICBbc3R5bGUudHJhbnNmb3JtLW9yaWdpbl09XCJ0cmFuc2Zvcm1PcmlnaW5cIj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1jLW1vZGFsLWNvbnRlbnRcIiBjZGtUcmFwRm9jdXM+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIm1jQ2xvc2FibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbWMtYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGlja0Nsb3NlQnRuKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYy1tb2RhbC1jbG9zZSBtYy1idXR0b25fdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgbWMtaWNvbj1cIm1jLWNsb3NlLUxfMTZcIiBjbGFzcz1cIm1jLWljb24gbWMtaWNvbl9saWdodFwiIFtjb2xvcl09XCJ0aGVtZVBhbGV0dGUuU2Vjb25kXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNNb2RhbFR5cGUoJ2RlZmF1bHQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsQ29udGVudERlZmF1bHRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNNb2RhbFR5cGUoJ2NvbmZpcm0nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsQ29udGVudENvbmZpcm1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNNb2RhbFR5cGUoJ2N1c3RvbScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxDb250ZW50Q3VzdG9tXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICN0cGxDb250ZW50Q3VzdG9tPlxuICAgIDxuZy1jb250YWluZXIgI2JvZHlDb250YWluZXI+PC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG5cbjwhLS0gW1ByZWRlZmluZWRdIERlZmF1bHQgTW9kYWwgQ29udGVudCAtLT5cbjxuZy10ZW1wbGF0ZSAjdHBsQ29udGVudERlZmF1bHQ+XG4gICAgPGRpdiAqbmdJZj1cIm1jVGl0bGVcIiBjbGFzcz1cIm1jLW1vZGFsLWhlYWRlclwiIFtjbGFzcy5tYy1tb2RhbC1ib2R5X3RvcC1vdmVyZmxvd109XCJpc1RvcE92ZXJmbG93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy1tb2RhbC10aXRsZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzVGVtcGxhdGVSZWYobWNUaXRsZSlcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KG1jVGl0bGUpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNOb25FbXB0eVN0cmluZyhtY1RpdGxlKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwibWNUaXRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtYy1tb2RhbC1ib2R5XCIgI21vZGFsQm9keSBbbmdTdHlsZV09XCJtY0JvZHlTdHlsZVwiIChzY3JvbGwpPVwiY2hlY2tPdmVyZmxvdygpXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgI2JvZHlDb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzQ29tcG9uZW50KG1jQ29udGVudClcIiBbbmdTd2l0Y2hdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzVGVtcGxhdGVSZWYobWNDb250ZW50KVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIiRhbnkobWNDb250ZW50KVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzTm9uRW1wdHlTdHJpbmcobWNDb250ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwibWNDb250ZW50XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0IFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbE9yaWdpbkNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwibWNGb290ZXIgIT09IG51bGxcIiBjbGFzcz1cIm1jLW1vZGFsLWZvb3RlclwiIFtjbGFzcy5tYy1tb2RhbC1ib2R5X2JvdHRvbS1vdmVyZmxvd109XCJpc0JvdHRvbU92ZXJmbG93XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInRydWVcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzVGVtcGxhdGVSZWYobWNGb290ZXIpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShtY0Zvb3RlcilcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzTm9uRW1wdHlTdHJpbmcobWNGb290ZXIpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cIm1jRm9vdGVyXCI+PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzTW9kYWxCdXR0b25zKG1jRm9vdGVyKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiAkYW55KG1jRm9vdGVyKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBtYy1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICNhdXRvRm9jdXNlZEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXV0b2ZvY3VzXT1cImJ1dHRvbi5hdXRvRm9jdXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIubWMtbW9kYWwtbWFpbi1hY3Rpb25dPVwiYnV0dG9uLm1jTW9kYWxNYWluQWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKGJ1dHRvbiwgJ3Nob3cnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKGJ1dHRvbiwgJ2Rpc2FibGVkJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm1jLXByb2dyZXNzXT1cImdldEJ1dHRvbkNhbGxhYmxlUHJvcChidXR0b24sICdsb2FkaW5nJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soYnV0dG9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwiYnV0dG9uLnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGJ1dHRvbi5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgI2F1dG9Gb2N1c2VkQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmF1dG9mb2N1c109XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJtY09rVGV4dCAhPT0gbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgIG1jLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwidGhlbWVQYWxldHRlLlByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGlja09rQ2FuY2VsKCdvaycpXCI+XG5cbiAgICAgICAgICAgICAgICAgICAge3sgb2tUZXh0IH19XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIm1jQ2FuY2VsVGV4dCE9PW51bGxcIiBtYy1idXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJylcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgY2FuY2VsVGV4dCB9fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbjwhLS0gL1tQcmVkZWZpbmVkXSBEZWZhdWx0IE1vZGFsIENvbnRlbnQgLS0+XG5cbjwhLS0gW1ByZWRlZmluZWRdIENvbmZpcm0gTW9kYWwgQ29udGVudCAtLT5cbjxuZy10ZW1wbGF0ZSAjdHBsQ29udGVudENvbmZpcm0+XG4gICAgPGRpdiBjbGFzcz1cIm1jLW1vZGFsLWJvZHlcIiBbbmdTdHlsZV09XCJtY0JvZHlTdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtY29uZmlybS1ib2R5LXdyYXBwZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYy1jb25maXJtLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWMtY29uZmlybS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgI2JvZHlDb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzQ29tcG9uZW50KG1jQ29udGVudClcIiBbbmdTd2l0Y2hdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzVGVtcGxhdGVSZWYobWNDb250ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KG1jQ29udGVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJpc05vbkVtcHR5U3RyaW5nKG1jQ29udGVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cIm1jQ29udGVudFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdCBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxPcmlnaW5Db250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+IDwhLS0gLy5tYy1jb25maXJtLWJvZHktd3JhcHBlciAtLT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWMtY29uZmlybS1idG5zXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG1jLWJ1dHRvblxuICAgICAgICAgICAgI2F1dG9Gb2N1c2VkQnV0dG9uXG4gICAgICAgICAgICBbY29sb3JdPVwibWNPa1R5cGVcIlxuICAgICAgICAgICAgW2F0dHIuYXV0b2ZvY3VzXT1cInRydWVcIlxuICAgICAgICAgICAgKm5nSWY9XCJtY09rVGV4dCAhPT0gJydcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tPa0NhbmNlbCgnb2snKVwiPlxuXG4gICAgICAgICAgICB7eyBva1RleHQgfX1cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiBtYy1idXR0b24gW2NvbG9yXT1cInRoZW1lUGFsZXR0ZS5TZWNvbmRcIiAqbmdJZj1cIm1jQ2FuY2VsVGV4dCAhPT0gJydcIiAoY2xpY2spPVwib25DbGlja09rQ2FuY2VsKCdjYW5jZWwnKVwiPlxuICAgICAgICAgICAge3sgY2FuY2VsVGV4dCB9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG48IS0tIC9bUHJlZGVmaW5lZF0gQ29uZmlybSBNb2RhbCBDb250ZW50IC0tPlxuIl19
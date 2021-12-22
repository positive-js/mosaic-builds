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
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        this.getElement().getElementsByTagName('button')[0]?.focus();
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
        const nativeElement = this.modalBody?.nativeElement;
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
            this.getElement().querySelector('[mc-modal-main-action]')?.click();
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
            return {
                ...{
                    type: 'default',
                    size: 'default',
                    autoLoading: true,
                    show: true,
                    loading: false,
                    disabled: false
                },
                ...button
            };
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
/** @nocollapse */ /** @nocollapse */ McModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McModalComponent, deps: [{ token: i1.Overlay }, { token: i0.Renderer2 }, { token: i0.ComponentFactoryResolver }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i2.McModalControlService }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McModalComponent, selector: "mc-modal", inputs: { mcModalType: "mcModalType", mcComponent: "mcComponent", mcContent: "mcContent", mcComponentParams: "mcComponentParams", mcFooter: "mcFooter", mcVisible: "mcVisible", mcZIndex: "mcZIndex", mcWidth: "mcWidth", mcSize: "mcSize", mcWrapClassName: "mcWrapClassName", mcClassName: "mcClassName", mcStyle: "mcStyle", mcTitle: "mcTitle", mcCloseByESC: "mcCloseByESC", mcClosable: "mcClosable", mcMask: "mcMask", mcMaskClosable: "mcMaskClosable", mcMaskStyle: "mcMaskStyle", mcBodyStyle: "mcBodyStyle", mcOkText: "mcOkText", mcOkType: "mcOkType", mcOkLoading: "mcOkLoading", mcOnOk: "mcOnOk", mcCancelText: "mcCancelText", mcCancelLoading: "mcCancelLoading", mcOnCancel: "mcOnCancel", mcGetContainer: "mcGetContainer" }, outputs: { mcVisibleChange: "mcVisibleChange", mcAfterOpen: "mcAfterOpen", mcAfterClose: "mcAfterClose", mcOnOk: "mcOnOk", mcOnCancel: "mcOnCancel" }, host: { listeners: { "keydown": "onKeyDown($event)" } }, viewQueries: [{ propertyName: "modalContainer", first: true, predicate: ["modalContainer"], descendants: true, static: true }, { propertyName: "bodyContainer", first: true, predicate: ["bodyContainer"], descendants: true, read: ViewContainerRef }, { propertyName: "modalBody", first: true, predicate: ["modalBody"], descendants: true }, { propertyName: "autoFocusedButtons", predicate: ["autoFocusedButton"], descendants: true, read: ElementRef }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<!-- Compatible: the <ng-content> can appear only once -->\n<ng-template #tplOriginContent>\n    <ng-content></ng-content>\n</ng-template>\n\n<div>\n    <div *ngIf=\"mcMask\"\n         class=\"mc-modal-mask\"\n         [ngClass]=\"maskAnimationClassMap\"\n         [class.mc-modal-mask-hidden]=\"hidden\"\n         [ngStyle]=\"mcMaskStyle\"\n         [style.zIndex]=\"mcZIndex\"\n    ></div>\n    <div (mousedown)=\"onClickMask($event)\"\n         class=\"mc-modal-wrap {{ mcWrapClassName }}\"\n         [style.zIndex]=\"mcZIndex\"\n         [style.display]=\"hidden ? 'none' : ''\"\n         tabindex=\"-1\">\n\n        <div #modalContainer\n             class=\"mc-modal {{ mcClassName }} mc-modal_{{ mcSize }}\"\n             [ngClass]=\"modalAnimationClassMap\"\n             [ngStyle]=\"mcStyle\"\n             [style.width]=\"mcWidth | toCssUnit\"\n             [style.transform-origin]=\"transformOrigin\">\n\n            <div class=\"mc-modal-content\" cdkTrapFocus>\n                <button *ngIf=\"mcClosable\"\n                        mc-button\n                        (click)=\"onClickCloseBtn()\"\n                        class=\"mc-modal-close mc-button_transparent\">\n                    <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" [color]=\"themePalette.Second\"></i>\n                </button>\n                <ng-container [ngSwitch]=\"true\">\n                    <ng-container *ngSwitchCase=\"isModalType('default')\"\n                                  [ngTemplateOutlet]=\"tplContentDefault\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('confirm')\"\n                                  [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('custom')\"\n                                  [ngTemplateOutlet]=\"tplContentCustom\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template #tplContentCustom>\n    <ng-container #bodyContainer></ng-container>\n</ng-template>\n\n\n<!-- [Predefined] Default Modal Content -->\n<ng-template #tplContentDefault>\n    <div *ngIf=\"mcTitle\" class=\"mc-modal-header\" [class.mc-modal-body_top-overflow]=\"isTopOverflow\">\n        <div class=\"mc-modal-title\">\n            <ng-container [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"$any(mcTitle)\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\">\n                    <div [innerHTML]=\"mcTitle\"></div>\n                </ng-container>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-modal-body\" #modalBody [ngStyle]=\"mcBodyStyle\" (scroll)=\"checkOverflow()\">\n        <ng-container #bodyContainer>\n            <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"$any(mcContent)\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                    <div [innerHTML]=\"mcContent\"></div>\n                </ng-container>\n                <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\" [class.mc-modal-body_bottom-overflow]=\"isBottomOverflow\">\n        <ng-container [ngSwitch]=\"true\">\n            <ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"$any(mcFooter)\"></ng-container>\n            <ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\">\n                <ng-container *ngFor=\"let button of $any(mcFooter)\">\n                    <button\n                        mc-button\n                        #autoFocusedButton\n                        [attr.autofocus]=\"button.autoFocus\"\n                        [attr.mc-modal-main-action]=\"button.mcModalMainAction\"\n                        *ngIf=\"getButtonCallableProp(button, 'show')\"\n                        [disabled]=\"getButtonCallableProp(button, 'disabled')\"\n                        [class.mc-progress]=\"getButtonCallableProp(button, 'loading')\"\n                        (click)=\"onButtonClick(button)\"\n                        [color]=\"button.type\">\n                        {{ button.label }}\n                    </button>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n                <button\n                    #autoFocusedButton\n                    [attr.autofocus]=\"true\"\n                    *ngIf=\"mcOkText !== null\"\n                    mc-button\n                    [color]=\"themePalette.Primary\"\n                    (click)=\"onClickOkCancel('ok')\">\n\n                    {{ okText }}\n                </button>\n                <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">\n                    {{ cancelText }}\n                </button>\n            </ng-container>\n        </ng-container>\n    </div>\n</ng-template>\n<!-- /[Predefined] Default Modal Content -->\n\n<!-- [Predefined] Confirm Modal Content -->\n<ng-template #tplContentConfirm>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <div class=\"mc-confirm-body-wrapper\">\n            <div class=\"mc-confirm-body\">\n                <div class=\"mc-confirm-content\">\n                    <ng-container #bodyContainer>\n                        <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                            <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\"\n                                          [ngTemplateOutlet]=\"$any(mcContent)\">\n                            </ng-container>\n                            <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                                <div [innerHTML]=\"mcContent\"></div>\n                            </ng-container>\n                            <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n                        </ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div> <!-- /.mc-confirm-body-wrapper -->\n    </div>\n    <div class=\"mc-confirm-btns\">\n        <button\n            mc-button\n            #autoFocusedButton\n            [color]=\"mcOkType\"\n            [attr.autofocus]=\"true\"\n            *ngIf=\"mcOkText !== ''\"\n            (click)=\"onClickOkCancel('ok')\">\n\n            {{ okText }}\n        </button>\n\n        <button mc-button [color]=\"themePalette.Second\" *ngIf=\"mcCancelText !== ''\" (click)=\"onClickOkCancel('cancel')\">\n            {{ cancelText }}\n        </button>\n    </div>\n</ng-template>\n<!-- /[Predefined] Confirm Modal Content -->\n", styles: [".mc-confirm .mc-modal-header,.mc-confirm .mc-modal-close{display:none}.mc-confirm .mc-modal-body{padding:24px;padding:var(--mc-modal-confirm-size-padding, 24px)}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:before,.mc-confirm-body-wrapper:after{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;border-radius:var(--mc-modal-footer-size-border-radius, 0 0 4px 4px);text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;top:var(--mc-modal-size-top, 48px);width:auto;margin:0 auto;list-style:none}.mc-modal.zoom-enter,.mc-modal.zoom-appear{animation-duration:.3s;transform:none;opacity:0}.mc-modal.mc-modal_small{width:400px;width:var(--mc-modal-size-small, 400px)}.mc-modal.mc-modal_normal{width:640px;width:var(--mc-modal-size-normal, 640px)}.mc-modal.mc-modal_large{width:960px;width:var(--mc-modal-size-large, 960px)}.mc-modal .mc-modal-close{position:absolute;z-index:10;top:0;right:0;width:56px;width:var(--mc-modal-size-close-width, 56px);height:56px;height:var(--mc-modal-size-close-width, 56px)}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;border-radius:var(--mc-modal-size-border-radius, 4px);background-clip:padding-box;background-color:#fff}.mc-modal-header{display:block;border-radius:4px 4px 0 0;border-radius:var(--mc-modal-header-size-border-radius, 4px 4px 0 0);padding:14px 16px;padding:var(--mc-modal-header-size-padding, 14px 16px)}.mc-modal-body{display:block;overflow-y:auto;max-height:calc(100vh - 260px);max-height:var(--mc-modal-body-size-max-height, calc(100vh - 260px));padding:16px 24px 24px;padding:var(--mc-modal-body-size-padding, 16px 24px 24px);word-wrap:break-word}.mc-modal-footer{display:block;border-radius:0 0 4px 4px;border-radius:var(--mc-modal-footer-size-border-radius, 0 0 4px 4px);padding:16px;padding:var(--mc-modal-footer-size-padding, 16px 16px);text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}\n"], components: [{ type: i3.McButton, selector: "[mc-button]", inputs: ["color", "tabIndex", "disabled"] }, { type: i4.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i6.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i3.McButtonCssStyler, selector: "[mc-button]" }, { type: i4.McIconCSSStyler, selector: "[mc-icon]" }, { type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i5.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i7.McModalMainAction, selector: "[mc-modal-main-action]" }], pipes: { "toCssUnit": i8.CssUnitPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-modal', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(keydown)': 'onKeyDown($event)'
                    }, template: "<!-- Compatible: the <ng-content> can appear only once -->\n<ng-template #tplOriginContent>\n    <ng-content></ng-content>\n</ng-template>\n\n<div>\n    <div *ngIf=\"mcMask\"\n         class=\"mc-modal-mask\"\n         [ngClass]=\"maskAnimationClassMap\"\n         [class.mc-modal-mask-hidden]=\"hidden\"\n         [ngStyle]=\"mcMaskStyle\"\n         [style.zIndex]=\"mcZIndex\"\n    ></div>\n    <div (mousedown)=\"onClickMask($event)\"\n         class=\"mc-modal-wrap {{ mcWrapClassName }}\"\n         [style.zIndex]=\"mcZIndex\"\n         [style.display]=\"hidden ? 'none' : ''\"\n         tabindex=\"-1\">\n\n        <div #modalContainer\n             class=\"mc-modal {{ mcClassName }} mc-modal_{{ mcSize }}\"\n             [ngClass]=\"modalAnimationClassMap\"\n             [ngStyle]=\"mcStyle\"\n             [style.width]=\"mcWidth | toCssUnit\"\n             [style.transform-origin]=\"transformOrigin\">\n\n            <div class=\"mc-modal-content\" cdkTrapFocus>\n                <button *ngIf=\"mcClosable\"\n                        mc-button\n                        (click)=\"onClickCloseBtn()\"\n                        class=\"mc-modal-close mc-button_transparent\">\n                    <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" [color]=\"themePalette.Second\"></i>\n                </button>\n                <ng-container [ngSwitch]=\"true\">\n                    <ng-container *ngSwitchCase=\"isModalType('default')\"\n                                  [ngTemplateOutlet]=\"tplContentDefault\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('confirm')\"\n                                  [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container>\n                    <ng-container *ngSwitchCase=\"isModalType('custom')\"\n                                  [ngTemplateOutlet]=\"tplContentCustom\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    </div>\n</div>\n\n<ng-template #tplContentCustom>\n    <ng-container #bodyContainer></ng-container>\n</ng-template>\n\n\n<!-- [Predefined] Default Modal Content -->\n<ng-template #tplContentDefault>\n    <div *ngIf=\"mcTitle\" class=\"mc-modal-header\" [class.mc-modal-body_top-overflow]=\"isTopOverflow\">\n        <div class=\"mc-modal-title\">\n            <ng-container [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"$any(mcTitle)\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\">\n                    <div [innerHTML]=\"mcTitle\"></div>\n                </ng-container>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-modal-body\" #modalBody [ngStyle]=\"mcBodyStyle\" (scroll)=\"checkOverflow()\">\n        <ng-container #bodyContainer>\n            <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"$any(mcContent)\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                    <div [innerHTML]=\"mcContent\"></div>\n                </ng-container>\n                <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n            </ng-container>\n        </ng-container>\n    </div>\n    <div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\" [class.mc-modal-body_bottom-overflow]=\"isBottomOverflow\">\n        <ng-container [ngSwitch]=\"true\">\n            <ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"$any(mcFooter)\"></ng-container>\n            <ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\">\n                <ng-container *ngFor=\"let button of $any(mcFooter)\">\n                    <button\n                        mc-button\n                        #autoFocusedButton\n                        [attr.autofocus]=\"button.autoFocus\"\n                        [attr.mc-modal-main-action]=\"button.mcModalMainAction\"\n                        *ngIf=\"getButtonCallableProp(button, 'show')\"\n                        [disabled]=\"getButtonCallableProp(button, 'disabled')\"\n                        [class.mc-progress]=\"getButtonCallableProp(button, 'loading')\"\n                        (click)=\"onButtonClick(button)\"\n                        [color]=\"button.type\">\n                        {{ button.label }}\n                    </button>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngSwitchDefault>\n                <button\n                    #autoFocusedButton\n                    [attr.autofocus]=\"true\"\n                    *ngIf=\"mcOkText !== null\"\n                    mc-button\n                    [color]=\"themePalette.Primary\"\n                    (click)=\"onClickOkCancel('ok')\">\n\n                    {{ okText }}\n                </button>\n                <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">\n                    {{ cancelText }}\n                </button>\n            </ng-container>\n        </ng-container>\n    </div>\n</ng-template>\n<!-- /[Predefined] Default Modal Content -->\n\n<!-- [Predefined] Confirm Modal Content -->\n<ng-template #tplContentConfirm>\n    <div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\">\n        <div class=\"mc-confirm-body-wrapper\">\n            <div class=\"mc-confirm-body\">\n                <div class=\"mc-confirm-content\">\n                    <ng-container #bodyContainer>\n                        <ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\">\n                            <ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\"\n                                          [ngTemplateOutlet]=\"$any(mcContent)\">\n                            </ng-container>\n                            <ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\">\n                                <div [innerHTML]=\"mcContent\"></div>\n                            </ng-container>\n                            <ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container>\n                        </ng-container>\n                    </ng-container>\n                </div>\n            </div>\n        </div> <!-- /.mc-confirm-body-wrapper -->\n    </div>\n    <div class=\"mc-confirm-btns\">\n        <button\n            mc-button\n            #autoFocusedButton\n            [color]=\"mcOkType\"\n            [attr.autofocus]=\"true\"\n            *ngIf=\"mcOkText !== ''\"\n            (click)=\"onClickOkCancel('ok')\">\n\n            {{ okText }}\n        </button>\n\n        <button mc-button [color]=\"themePalette.Second\" *ngIf=\"mcCancelText !== ''\" (click)=\"onClickOkCancel('cancel')\">\n            {{ cancelText }}\n        </button>\n    </div>\n</ng-template>\n<!-- /[Predefined] Confirm Modal Content -->\n", styles: [".mc-confirm .mc-modal-header,.mc-confirm .mc-modal-close{display:none}.mc-confirm .mc-modal-body{padding:24px;padding:var(--mc-modal-confirm-size-padding, 24px)}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:before,.mc-confirm-body-wrapper:after{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;border-radius:var(--mc-modal-footer-size-border-radius, 0 0 4px 4px);text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;top:var(--mc-modal-size-top, 48px);width:auto;margin:0 auto;list-style:none}.mc-modal.zoom-enter,.mc-modal.zoom-appear{animation-duration:.3s;transform:none;opacity:0}.mc-modal.mc-modal_small{width:400px;width:var(--mc-modal-size-small, 400px)}.mc-modal.mc-modal_normal{width:640px;width:var(--mc-modal-size-normal, 640px)}.mc-modal.mc-modal_large{width:960px;width:var(--mc-modal-size-large, 960px)}.mc-modal .mc-modal-close{position:absolute;z-index:10;top:0;right:0;width:56px;width:var(--mc-modal-size-close-width, 56px);height:56px;height:var(--mc-modal-size-close-width, 56px)}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;border-radius:var(--mc-modal-size-border-radius, 4px);background-clip:padding-box;background-color:#fff}.mc-modal-header{display:block;border-radius:4px 4px 0 0;border-radius:var(--mc-modal-header-size-border-radius, 4px 4px 0 0);padding:14px 16px;padding:var(--mc-modal-header-size-padding, 14px 16px)}.mc-modal-body{display:block;overflow-y:auto;max-height:calc(100vh - 260px);max-height:var(--mc-modal-body-size-max-height, calc(100vh - 260px));padding:16px 24px 24px;padding:var(--mc-modal-body-size-padding, 16px 24px 24px);word-wrap:break-word}.mc-modal-footer{display:block;border-radius:0 0 4px 4px;border-radius:var(--mc-modal-footer-size-border-radius, 0 0 4px 4px);padding:16px;padding:var(--mc-modal-footer-size-padding, 16px 16px);text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL21vZGFsL21vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9tb2RhbC9tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1Qsd0JBQXdCLEVBRXhCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBSUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBRVQsV0FBVyxFQUNYLElBQUksRUFDSixTQUFTLEVBQ1QsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLElBQUksU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVELE9BQU8sRUFBc0MsU0FBUyxFQUE4QixNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7OztBQUd6Ryx3Q0FBd0M7QUFDeEMsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFDO0FBZTFDLE1BQU0sT0FBTyxnQkFBbUMsU0FBUSxVQUFnQjtJQXVIcEUsWUFDWSxPQUFnQixFQUNoQixRQUFtQixFQUNuQixHQUE2QixFQUM3QixVQUFzQixFQUN0QixhQUErQixFQUMvQixZQUFtQyxFQUNuQyxjQUFpQyxFQUNmLFFBQWE7UUFFdkMsS0FBSyxFQUFFLENBQUM7UUFUQSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsaUJBQVksR0FBWixZQUFZLENBQXVCO1FBQ25DLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNmLGFBQVEsR0FBUixRQUFRLENBQUs7UUE1SDNDLGlCQUFZLEdBQUcsWUFBWSxDQUFDO1FBRW5CLGdCQUFXLEdBQWMsU0FBUyxDQUFDO1FBZXBDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFakIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRS9DLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEIsV0FBTSxHQUFjLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFLckMsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFLOUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFLbkIsWUFBTyxHQUFHLElBQUksQ0FBQztRQUtmLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBS2hDLG9EQUFvRDtRQUMxQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDakQsMENBQTBDO1FBQ2hDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUl0QyxhQUFRLEdBQUcsU0FBUyxDQUFDO1FBS3RCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRVYsV0FBTSxHQUF5QyxJQUFJLFlBQVksRUFBSyxDQUFDO1FBTWhGLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUVkLGVBQVUsR0FBeUMsSUFBSSxZQUFZLEVBQUssQ0FBQztRQVM1RixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFJbEMsMkNBQTJDO1FBQzNDLG9CQUFlLEdBQUcsYUFBYSxDQUFDO1FBNEN2QixtQkFBYyxHQUFnRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRm5ILENBQUM7SUFsSEQsSUFDSSxTQUFTLEtBQUssT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMzQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBZWpELElBQ0ksVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxVQUFVLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUduRCxJQUNJLE1BQU0sS0FBSyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFHM0MsSUFDSSxjQUFjLEtBQUssT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBZTNELElBQ0ksV0FBVyxLQUFLLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBSSxXQUFXLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQU1yRCxJQUNJLGVBQWUsS0FBSyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDdkQsSUFBSSxlQUFlLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBb0I3RCxtQ0FBbUM7SUFDbkMsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxvQ0FBb0M7SUFDcEMsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLElBQUksTUFBTTtRQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUNuRCxDQUFDO0lBdUJELFFBQVE7UUFDSixzQ0FBc0M7UUFDdEMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQW9CLENBQUMsQ0FBQztTQUMxRDtRQUVELCtCQUErQjtRQUMvQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFvQyxDQUFDLENBQUM7U0FDdEY7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakQ7UUFFRCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDekcsSUFBSSxJQUFJLENBQUMsU0FBUyxZQUFZLFdBQVcsRUFBRTtZQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzdEO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxZQUFZLFVBQVUsRUFBRTtZQUM3QyxtRkFBbUY7WUFDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDNUU7UUFFRCxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELDhDQUE4QztJQUM5Qyw2REFBNkQ7SUFDN0QsNEZBQTRGO0lBQzVGLDBFQUEwRTtJQUMxRSxpRUFBaUU7SUFDakUsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNuQiw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDWCxpRkFBaUY7UUFDakYsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBRTdELEtBQUssTUFBTSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDL0QsSUFBSSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO2dCQUMxQyxpQkFBaUIsQ0FBQyxhQUFtQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUUvRCxNQUFNO2FBQ1Q7U0FDSjtRQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsWUFBWSxVQUFVLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUM7UUFFcEQsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUUvQixNQUFNLFNBQVMsR0FBVyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ2xELE1BQU0sWUFBWSxHQUFXLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDeEQsTUFBTSxZQUFZLEdBQVcsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUV4RCxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFJLFNBQW1CLEdBQUcsWUFBdUIsR0FBRyxZQUFZLENBQUM7SUFDMUYsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFVO1FBQ1osSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLE9BQU8sQ0FBQyxNQUFVO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxzQkFBc0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDcEMsQ0FBQztJQUVELG1CQUFtQjtRQUNmLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7SUFDekUsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDNUQsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQWdCLENBQUM7SUFDOUYsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFrQjtRQUMxQixJQUNJLElBQUksQ0FBQyxNQUFNO1lBQ1gsSUFBSSxDQUFDLGNBQWM7WUFDbEIsTUFBTSxDQUFDLE1BQXNCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDbEUsSUFBSSxDQUFDLFNBQVMsRUFDaEI7WUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxXQUFXLENBQUMsSUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBb0I7UUFFMUIsb0VBQW9FO1FBQ3BFLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLFlBQVksVUFBVSxDQUFDLEVBQUU7WUFFdEYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO1FBQ0Qsb0VBQW9FO1FBQ3BFLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUMxQyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEI7WUFFQSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFpQixFQUFFLEtBQUssRUFBRSxDQUFDO1lBRXBGLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxNQUFNO0lBQ04sZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELE1BQU07SUFDTixpREFBaUQ7SUFDakQsZUFBZSxDQUFDLElBQXFCO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRSxNQUFNLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUUsSUFBSSxPQUFPLFlBQVksWUFBWSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBRXRDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELHlEQUF5RDtZQUN6RCxNQUFNLFNBQVMsR0FBRyxDQUFDLE9BQTRCLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWSxDQUFDLENBQUM7WUFFcEcsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDO2dCQUNELE1BQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRTtpQkFBTTtnQkFDSCxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDckI7U0FDSjtJQUNMLENBQUM7SUFFRCxNQUFNO0lBQ04sZ0JBQWdCLENBQUMsS0FBUztRQUN0QixPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxNQUFNO0lBQ04sYUFBYSxDQUFDLEtBQVM7UUFDbkIsT0FBTyxLQUFLLFlBQVksV0FBVyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNO0lBQ04sV0FBVyxDQUFDLEtBQVM7UUFDakIsT0FBTyxLQUFLLFlBQVksSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxNQUFNO0lBQ04sY0FBYyxDQUFDLEtBQVM7UUFDcEIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxrSEFBa0g7SUFDbEgsTUFBTTtJQUNOLHFCQUFxQixDQUFDLE9BQStCLEVBQUUsSUFBWTtRQUMvRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxJQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDNUUsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxNQUFNO0lBQ04sYUFBYSxDQUFDLE1BQThCO1FBQ3hDLHdCQUF3QjtRQUN4QixrRkFBa0Y7UUFDbEYsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3RCxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFzQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ2xHO0lBQ0wsQ0FBQztJQUVELDRDQUE0QztJQUNwQyx3QkFBd0IsQ0FBQyxPQUFnQixFQUFFLFlBQXFCLElBQUksRUFBRSxXQUFlO1FBQ3pGLGlEQUFpRDtRQUNqRCxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QjtRQUVELE9BQU8sT0FBTzthQUNULE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5Qyw4Q0FBOEM7YUFDN0MsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BDLDZDQUE2QztnQkFDN0MsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCwrQkFBK0I7SUFDdkIsdUJBQXVCLENBQUMsT0FBZ0IsRUFBRSxXQUFlO1FBQzdELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUU7WUFDNUIscUNBQXFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRW5DLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDcEU7UUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU8sb0JBQW9CLENBQUMsS0FBcUI7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMscUJBQXFCLEdBQUc7Z0JBQ3pCLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUk7Z0JBQ3ZCLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxFQUFFLElBQUk7YUFDakMsQ0FBQztZQUVGLElBQUksQ0FBQyxzQkFBc0IsR0FBRztnQkFDMUIsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSTtnQkFDdkIsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLEVBQUUsSUFBSTthQUNqQyxDQUFDO1NBQ0w7YUFBTTtZQUNILGFBQWE7WUFDYixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztTQUNuRTtRQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM3RDthQUFNO1lBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFTyxTQUFTLENBQUMsU0FBa0I7UUFDaEMsc0RBQXNEO1FBQ3RELElBQUksU0FBUyxFQUFFO1lBQ1gsMkZBQTJGO1lBQzNGLGtGQUFrRjtZQUNsRixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7U0FDekQ7UUFFRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpELGdDQUFnQztRQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUNwQixHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxFQUNELHNCQUFzQixDQUN6QixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsT0FBaUM7UUFDeEQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFFMUIsT0FBTztnQkFDSCxHQUFHO29CQUNDLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLFdBQVcsRUFBRSxJQUFJO29CQUNqQixJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsS0FBSztvQkFDZCxRQUFRLEVBQUUsS0FBSztpQkFDbEI7Z0JBQ0QsR0FBRyxNQUFNO2FBQ1osQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxzQkFBc0IsQ0FBQyxTQUFrQjtRQUM3QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDbEMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztZQUNsRCxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRO1NBQ3RDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXpELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUM1RTtRQUVELDRDQUE0QztRQUM1Qyw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCxpRUFBaUU7SUFDekQscUJBQXFCO1FBQ3pCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBNEIsQ0FBQztRQUN0RSxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUV0RCxJQUFJLFlBQVksRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxVQUFVLE1BQU0sWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsU0FBUyxRQUFRLENBQUM7U0FDM0g7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssa0JBQWtCLENBQUMsVUFBa0IsQ0FBQztRQUMxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUVoRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEU7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzdEO0lBQ0wsQ0FBQzs7bUpBamdCUSxnQkFBZ0IsME9BK0hiLFFBQVE7dUlBL0hYLGdCQUFnQiw4cENBNEVXLGdCQUFnQiw4TEFFVCxVQUFVLHlFQ3BJekQsdS9OQTJKQTsyRkRyR2EsZ0JBQWdCO2tCQVY1QixTQUFTOytCQUNJLFVBQVUsaUJBR0wsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSxRQUN6Qzt3QkFDRixXQUFXLEVBQUUsbUJBQW1CO3FCQUNuQzs7MEJBaUlJLE1BQU07MkJBQUMsUUFBUTs0Q0ExSFgsV0FBVztzQkFBbkIsS0FBSztnQkFHRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0YsU0FBUztzQkFEWixLQUFLO2dCQU1JLGVBQWU7c0JBQXhCLE1BQU07Z0JBRUUsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBR0YsVUFBVTtzQkFEYixLQUFLO2dCQU1GLE1BQU07c0JBRFQsS0FBSztnQkFNRixjQUFjO3NCQURqQixLQUFLO2dCQUtHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFHSSxXQUFXO3NCQUFwQixNQUFNO2dCQUVHLFlBQVk7c0JBQXJCLE1BQU07Z0JBR0UsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdGLFdBQVc7c0JBRGQsS0FBSztnQkFLYSxNQUFNO3NCQUF4QixLQUFLOztzQkFBSSxNQUFNO2dCQUNQLFlBQVk7c0JBQXBCLEtBQUs7Z0JBR0YsZUFBZTtzQkFEbEIsS0FBSztnQkFLYSxVQUFVO3NCQUE1QixLQUFLOztzQkFBSSxNQUFNO2dCQUUrQixjQUFjO3NCQUE1RCxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDMEIsYUFBYTtzQkFBbkYsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFFWixrQkFBa0I7c0JBQTFFLFlBQVk7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUUvQixTQUFTO3NCQUFoQyxTQUFTO3VCQUFDLFdBQVc7Z0JBb0RiLGNBQWM7c0JBQXRCLEtBQUs7O0FBZ1lWLFlBQVk7QUFFWixTQUFTLFNBQVMsQ0FBQyxHQUFjO0lBQzdCLDhDQUE4QztJQUM5QyxPQUFPLENBQUMsQ0FBQyxHQUFHO1FBQ1IsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFDO1FBQ3RELE9BQVEsR0FBbUIsQ0FBQyxJQUFJLEtBQUssVUFBVTtRQUMvQyxPQUFRLEdBQW1CLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQztBQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0b3IsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBUeXBlLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVTQ0FQRSwgRU5URVIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY01vZGFsQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBNY01vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgbW9kYWxVdGlsT2JqZWN0IGFzIE1vZGFsVXRpbCB9IGZyb20gJy4vbW9kYWwtdXRpbCc7XG5pbXBvcnQgeyBJTW9kYWxCdXR0b25PcHRpb25zLCBJTW9kYWxPcHRpb25zLCBNb2RhbFNpemUsIE1vZGFsVHlwZSwgT25DbGlja0NhbGxiYWNrIH0gZnJvbSAnLi9tb2RhbC50eXBlJztcblxuXG4vLyBEdXJhdGlvbiB3aGVuIHBlcmZvcm0gYW5pbWF0aW9ucyAobXMpXG5leHBvcnQgY29uc3QgTU9EQUxfQU5JTUFURV9EVVJBVElPTiA9IDIwMDtcblxudHlwZSBBbmltYXRpb25TdGF0ZSA9ICdlbnRlcicgfCAnbGVhdmUnIHwgbnVsbDtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21vZGFsLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jTW9kYWxDb21wb25lbnQ8VCA9IGFueSwgUiA9IGFueT4gZXh0ZW5kcyBNY01vZGFsUmVmPFQsIFI+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBJTW9kYWxPcHRpb25zIHtcblxuICAgIHRoZW1lUGFsZXR0ZSA9IFRoZW1lUGFsZXR0ZTtcblxuICAgIEBJbnB1dCgpIG1jTW9kYWxUeXBlOiBNb2RhbFR5cGUgPSAnZGVmYXVsdCc7XG5cbiAgICAvLyBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IG9wZW5lZCBpbnRvIHRoZSBkaWFsb2cuXG4gICAgQElucHV0KCkgbWNDb21wb25lbnQ6IFR5cGU8VD47XG4gICAgLy8gSWYgbm90IHNwZWNpZmllZCwgd2lsbCB1c2UgPG5nLWNvbnRlbnQ+XG4gICAgQElucHV0KCkgbWNDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7fT4gfCBUeXBlPFQ+O1xuICAgIC8vIGF2YWlsYWJsZSB3aGVuIG1jQ29udGVudCBpcyBhIGNvbXBvbmVudFxuICAgIEBJbnB1dCgpIG1jQ29tcG9uZW50UGFyYW1zOiBUO1xuICAgIC8vIERlZmF1bHQgTW9kYWwgT05MWVxuICAgIEBJbnB1dCgpIG1jRm9vdGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7fT4gfCBJTW9kYWxCdXR0b25PcHRpb25zPFQ+W107XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1Zpc2libGUoKSB7IHJldHVybiB0aGlzLl9tY1Zpc2libGU7IH1cbiAgICBzZXQgbWNWaXNpYmxlKHZhbHVlKSB7IHRoaXMuX21jVmlzaWJsZSA9IHZhbHVlOyB9XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGUgPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBtY1Zpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASW5wdXQoKSBtY1pJbmRleDogbnVtYmVyID0gMTAwMDtcbiAgICBASW5wdXQoKSBtY1dpZHRoOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgQElucHV0KCkgbWNTaXplOiBNb2RhbFNpemUgPSBNb2RhbFNpemUuTm9ybWFsO1xuICAgIEBJbnB1dCgpIG1jV3JhcENsYXNzTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jQ2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbWNTdHlsZTogb2JqZWN0O1xuICAgIEBJbnB1dCgpIG1jVGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PjtcbiAgICBASW5wdXQoKSBtY0Nsb3NlQnlFU0M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNDbG9zYWJsZSgpIHsgcmV0dXJuIHRoaXMuX21jQ2xvc2FibGU7IH1cbiAgICBzZXQgbWNDbG9zYWJsZSh2YWx1ZSkgeyB0aGlzLl9tY0Nsb3NhYmxlID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY0Nsb3NhYmxlID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jTWFzaygpIHsgcmV0dXJuIHRoaXMuX21jTWFzazsgfVxuICAgIHNldCBtY01hc2sodmFsdWUpIHsgdGhpcy5fbWNNYXNrID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY01hc2sgPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNNYXNrQ2xvc2FibGUoKSB7IHJldHVybiB0aGlzLl9tY01hc2tDbG9zYWJsZTsgfVxuICAgIHNldCBtY01hc2tDbG9zYWJsZSh2YWx1ZSkgeyB0aGlzLl9tY01hc2tDbG9zYWJsZSA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNNYXNrQ2xvc2FibGUgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIG1jTWFza1N0eWxlOiBvYmplY3Q7XG4gICAgQElucHV0KCkgbWNCb2R5U3R5bGU6IG9iamVjdDtcblxuICAgIC8vIFRyaWdnZXIgd2hlbiBtb2RhbCBvcGVuKHZpc2libGUpIGFmdGVyIGFuaW1hdGlvbnNcbiAgICBAT3V0cHV0KCkgbWNBZnRlck9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgLy8gVHJpZ2dlciB3aGVuIG1vZGFsIGxlYXZlLWFuaW1hdGlvbiBvdmVyXG4gICAgQE91dHB1dCgpIG1jQWZ0ZXJDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8Uj4oKTtcblxuICAgIC8vIC0tLSBQcmVkZWZpbmVkIE9LICYgQ2FuY2VsIGJ1dHRvbnNcbiAgICBASW5wdXQoKSBtY09rVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jT2tUeXBlID0gJ3ByaW1hcnknO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNPa0xvYWRpbmcoKSB7IHJldHVybiB0aGlzLl9tY09rTG9hZGluZzsgfVxuICAgIHNldCBtY09rTG9hZGluZyh2YWx1ZSkgeyB0aGlzLl9tY09rTG9hZGluZyA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNPa0xvYWRpbmcgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIEBPdXRwdXQoKSBtY09uT2s6IEV2ZW50RW1pdHRlcjxUPiB8IE9uQ2xpY2tDYWxsYmFjazxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcbiAgICBASW5wdXQoKSBtY0NhbmNlbFRleHQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jQ2FuY2VsTG9hZGluZygpIHsgcmV0dXJuIHRoaXMuX21jQ2FuY2VsTG9hZGluZzsgfVxuICAgIHNldCBtY0NhbmNlbExvYWRpbmcodmFsdWUpIHsgdGhpcy5fbWNDYW5jZWxMb2FkaW5nID0gdmFsdWU7IH1cbiAgICBwcml2YXRlIF9tY0NhbmNlbExvYWRpbmcgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIEBPdXRwdXQoKSBtY09uQ2FuY2VsOiBFdmVudEVtaXR0ZXI8VD4gfCBPbkNsaWNrQ2FsbGJhY2s8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdtb2RhbENvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIG1vZGFsQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2JvZHlDb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogZmFsc2UgfSkgYm9keUNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAgICAvLyBPbmx5IGFpbSB0byBmb2N1cyB0aGUgb2sgYnV0dG9uIHRoYXQgbmVlZHMgdG8gYmUgYXV0byBmb2N1c2VkXG4gICAgQFZpZXdDaGlsZHJlbignYXV0b0ZvY3VzZWRCdXR0b24nLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgYXV0b0ZvY3VzZWRCdXR0b25zOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdtb2RhbEJvZHknKSBtb2RhbEJvZHk6IEVsZW1lbnRSZWY7XG5cbiAgICBpc1RvcE92ZXJmbG93OiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNCb3R0b21PdmVyZmxvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbWFza0FuaW1hdGlvbkNsYXNzTWFwOiBvYmplY3Q7XG4gICAgbW9kYWxBbmltYXRpb25DbGFzc01hcDogb2JqZWN0O1xuICAgIC8vIFRoZSBvcmlnaW4gcG9pbnQgdGhhdCBhbmltYXRpb24gYmFzZWQgb25cbiAgICB0cmFuc2Zvcm1PcmlnaW4gPSAnMHB4IDBweCAwcHgnO1xuXG4gICAgLy8gT2JzZXJ2YWJsZSBhbGlhcyBmb3IgbWNBZnRlck9wZW5cbiAgICBnZXQgYWZ0ZXJPcGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tY0FmdGVyT3Blbi5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvLyBPYnNlcnZhYmxlIGFsaWFzIGZvciBtY0FmdGVyQ2xvc2VcbiAgICBnZXQgYWZ0ZXJDbG9zZSgpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNBZnRlckNsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGdldCBva1RleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNPa1RleHQ7XG4gICAgfVxuXG4gICAgZ2V0IGNhbmNlbFRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNDYW5jZWxUZXh0O1xuICAgIH1cblxuICAgIC8vIEluZGljYXRlIHdoZXRoZXIgdGhpcyBkaWFsb2cgc2hvdWxkIGhpZGRlblxuICAgIGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5tY1Zpc2libGUgJiYgIXRoaXMuYW5pbWF0aW9uU3RhdGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHRoZSByZWZlcmVuY2Ugd2hlbiB1c2luZyBtY0NvbnRlbnQgYXMgQ29tcG9uZW50XG4gICAgcHJpdmF0ZSBjb250ZW50Q29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD47XG4gICAgLy8gQ3VycmVudCBhbmltYXRpb24gc3RhdGVcbiAgICBwcml2YXRlIGFuaW1hdGlvblN0YXRlOiBBbmltYXRpb25TdGF0ZTtcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBPdmVybGF5UmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2w6IE1jTW9kYWxDb250cm9sU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIG1jR2V0Q29udGFpbmVyOiBIVE1MRWxlbWVudCB8IE92ZXJsYXlSZWYgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBPdmVybGF5UmVmKSA9ICgpID0+IHRoaXMub3ZlcmxheS5jcmVhdGUoKTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBDcmVhdGUgY29tcG9uZW50IGFsb25nIHdpdGhvdXQgVmlld1xuICAgICAgICBpZiAodGhpcy5pc0NvbXBvbmVudCh0aGlzLm1jQ29udGVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHluYW1pY0NvbXBvbmVudCh0aGlzLm1jQ29udGVudCBhcyBUeXBlPFQ+KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldHVwIGRlZmF1bHQgYnV0dG9uIG9wdGlvbnNcbiAgICAgICAgaWYgKHRoaXMuaXNNb2RhbEJ1dHRvbnModGhpcy5tY0Zvb3RlcikpIHtcbiAgICAgICAgICAgIHRoaXMubWNGb290ZXIgPSB0aGlzLmZvcm1hdE1vZGFsQnV0dG9ucyh0aGlzLm1jRm9vdGVyIGFzIElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0NvbXBvbmVudCh0aGlzLm1jQ29tcG9uZW50KSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVEeW5hbWljQ29tcG9uZW50KHRoaXMubWNDb21wb25lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGxhY2UgdGhlIG1vZGFsIGRvbSB0byBlbHNld2hlcmVcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0eXBlb2YgdGhpcy5tY0dldENvbnRhaW5lciA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMubWNHZXRDb250YWluZXIoKSA6IHRoaXMubWNHZXRDb250YWluZXI7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBPdmVybGF5UmVmKSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBvbmx5IGF0dGFjaCB0aGUgZG9tIHRvIG92ZXJsYXksIHRoZSB2aWV3IGNvbnRhaW5lciBpcyBub3QgY2hhbmdlZCBhY3R1YWxseVxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIub3ZlcmxheUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVnaXN0ZXIgbW9kYWwgd2hlbiBhZnRlck9wZW4vYWZ0ZXJDbG9zZSBpcyBzdGFibGVcbiAgICAgICAgdGhpcy5tb2RhbENvbnRyb2wucmVnaXN0ZXJNb2RhbCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBbTk9URV0gTk9UIGF2YWlsYWJsZSB3aGVuIHVzaW5nIGJ5IHNlcnZpY2UhXG4gICAgLy8gQmVjYXVzZSBuZ09uQ2hhbmdlcyBuZXZlciBiZSBjYWxsZWQgd2hlbiB1c2luZyBieSBzZXJ2aWNlLFxuICAgIC8vIGhlcmUgd2UgY2FuJ3Qgc3VwcG9ydCBcIm1jQ29udGVudFwiKENvbXBvbmVudCkgZXRjLiBhcyBpbnB1dHMgdGhhdCBpbml0aWFsaXplZCBkeW5hbWljYWxseS5cbiAgICAvLyBCVVQ6IFVzZXIgYWxzbyBjYW4gY2hhbmdlIFwibWNDb250ZW50XCIgZHluYW1pY2FsbHkgdG8gdHJpZ2dlciBVSSBjaGFuZ2VzXG4gICAgLy8gKHByb3ZpZGVkIHlvdSBkb24ndCB1c2UgXGJDb21wb25lbnQgdGhhdCBuZWVkcyBpbml0aWFsaXphdGlvbnMpXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5tY1Zpc2libGUpIHtcbiAgICAgICAgICAgIC8vIERvIG5vdCB0cmlnZ2VyIGFuaW1hdGlvbiB3aGlsZSBpbml0aWFsaXppbmdcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVmlzaWJsZVN0YXRlQ2hhbmdlKHRoaXMubWNWaXNpYmxlLCAhY2hhbmdlcy5tY1Zpc2libGUuZmlyc3RDaGFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICAvLyBJZiB1c2luZyBDb21wb25lbnQsIGl0IGlzIHRoZSB0aW1lIHRvIGF0dGFjaCBWaWV3IHdoaWxlIGJvZHlDb250YWluZXIgaXMgcmVhZHlcbiAgICAgICAgaWYgKHRoaXMuY29udGVudENvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5ib2R5Q29udGFpbmVyLmluc2VydCh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdidXR0b24nKVswXT8uZm9jdXMoKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGF1dG9Gb2N1c2VkQnV0dG9uIG9mIHRoaXMuYXV0b0ZvY3VzZWRCdXR0b25zLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKGF1dG9Gb2N1c2VkQnV0dG9uLm5hdGl2ZUVsZW1lbnQuYXV0b2ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgKGF1dG9Gb2N1c2VkQnV0dG9uLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmZvY3VzKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlY2tPdmVyZmxvdygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBPdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja092ZXJmbG93KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5tb2RhbEJvZHk/Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCFuYXRpdmVFbGVtZW50KSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcDogbnVtYmVyID0gbmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IG9mZnNldEhlaWdodDogbnVtYmVyID0gbmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodDogbnVtYmVyID0gbmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5pc1RvcE92ZXJmbG93ID0gc2Nyb2xsVG9wID4gMDtcblxuICAgICAgICB0aGlzLmlzQm90dG9tT3ZlcmZsb3cgPSAoc2Nyb2xsVG9wIGFzIG51bWJlciArIG9mZnNldEhlaWdodCBhcyBudW1iZXIpIDwgc2Nyb2xsSGVpZ2h0O1xuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmlzaWJsZUZyb21JbnNpZGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xvc2UocmVzdWx0PzogUikge1xuICAgICAgICB0aGlzLmNoYW5nZVZpc2libGVGcm9tSW5zaWRlKGZhbHNlLCByZXN1bHQpO1xuICAgIH1cblxuICAgIC8vIERlc3Ryb3kgZXF1YWxzIENsb3NlXG4gICAgZGVzdHJveShyZXN1bHQ/OiBSKSB7XG4gICAgICAgIHRoaXMuY2xvc2UocmVzdWx0KTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdHJpZ2dlck9rKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnb2snKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgfVxuXG4gICAgZ2V0SW5zdGFuY2UoKTogTWNNb2RhbENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRDb21wb25lbnRSZWYoKTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudENvbXBvbmVudFJlZjtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50Q29tcG9uZW50KCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50Q29tcG9uZW50UmVmICYmIHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZiAmJiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRNY0Zvb3RlcigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnQoKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYy1tb2RhbC1mb290ZXInKS5pdGVtKDApIGFzIEhUTUxFbGVtZW50O1xuICAgIH1cblxuICAgIG9uQ2xpY2tNYXNrKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLm1jTWFzayAmJlxuICAgICAgICAgICAgdGhpcy5tY01hc2tDbG9zYWJsZSAmJlxuICAgICAgICAgICAgKCRldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5jb250YWlucygnbWMtbW9kYWwtd3JhcCcpICYmXG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMub25DbGlja09rQ2FuY2VsKCdjYW5jZWwnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tcmVzZXJ2ZWQta2V5d29yZHNcbiAgICBpc01vZGFsVHlwZSh0eXBlOiBNb2RhbFR5cGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNNb2RhbFR5cGUgPT09IHR5cGU7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uIC5rZXkgaXNuJ3Qgc3VwcG9ydGVkIGluIEVkZ2VcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmNvbnRhaW5lciAmJiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBPdmVybGF5UmVmKSkge1xuXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvbiAua2V5IGlzbid0IHN1cHBvcnRlZCBpbiBFZGdlXG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tY01vZGFsVHlwZSA9PT0gJ2NvbmZpcm0nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyT2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgKHRoaXMuZ2V0RWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3IoJ1ttYy1tb2RhbC1tYWluLWFjdGlvbl0nKSBhcyBIVE1MRWxlbWVudCk/LmNsaWNrKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICBvbkNsaWNrQ2xvc2VCdG4oKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrT2tDYW5jZWwoJ2NhbmNlbCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1yZXNlcnZlZC1rZXl3b3Jkc1xuICAgIG9uQ2xpY2tPa0NhbmNlbCh0eXBlOiAnb2snIHwgJ2NhbmNlbCcpIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHsgb2s6IHRoaXMubWNPbk9rLCBjYW5jZWw6IHRoaXMubWNPbkNhbmNlbCB9W3R5cGVdO1xuICAgICAgICBjb25zdCBsb2FkaW5nS2V5ID0geyBvazogJ21jT2tMb2FkaW5nJywgY2FuY2VsOiAnbWNDYW5jZWxMb2FkaW5nJyB9W3R5cGVdO1xuXG4gICAgICAgIGlmICh0cmlnZ2VyIGluc3RhbmNlb2YgRXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICB0cmlnZ2VyLmVtaXQodGhpcy5nZXRDb250ZW50Q29tcG9uZW50KCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0cmlnZ2VyID09PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRyaWdnZXIodGhpcy5nZXRDb250ZW50Q29tcG9uZW50KCkpO1xuICAgICAgICAgICAgLy8gVXNlcnMgY2FuIHJldHVybiBcImZhbHNlXCIgdG8gcHJldmVudCBjbG9zaW5nIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIGNvbnN0IGNhc2VDbG9zZSA9IChkb0Nsb3NlOiBib29sZWFuIHwgdm9pZCB8IHt9KSA9PiAoZG9DbG9zZSAhPT0gZmFsc2UpICYmIHRoaXMuY2xvc2UoZG9DbG9zZSBhcyBSKTtcblxuICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tsb2FkaW5nS2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlVGhlbiA9IChkb0Nsb3NlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbG9hZGluZ0tleV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZUNsb3NlKGRvQ2xvc2UpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBQcm9taXNlPHZvaWQ+KS50aGVuKGhhbmRsZVRoZW4pLmNhdGNoKGhhbmRsZVRoZW4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXNlQ2xvc2UocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzTm9uRW1wdHlTdHJpbmcodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJztcbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICBpc1RlbXBsYXRlUmVmKHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICBpc0NvbXBvbmVudCh2YWx1ZToge30pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVHlwZTtcbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICBpc01vZGFsQnV0dG9ucyh2YWx1ZToge30pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLy8gTG9va3VwIGEgYnV0dG9uJ3MgcHJvcGVydHksIGlmIHRoZSBwcm9wIGlzIGEgZnVuY3Rpb24sIGNhbGwgJiB0aGVuIHJldHVybiB0aGUgcmVzdWx0LCBvdGhlcndpc2UsIHJldHVybiBpdHNlbGYuXG4gICAgLy8gQW9UXG4gICAgZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKG9wdGlvbnM6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD4sIHByb3A6IHN0cmluZyk6IHt9IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW3Byb3BdO1xuICAgICAgICBjb25zdCBhcmdzOiBhbnlbXSA9IFtdO1xuICAgICAgICBpZiAodGhpcy5jb250ZW50Q29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2godGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmluc3RhbmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZS5hcHBseShvcHRpb25zLCBhcmdzKSA6IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIE9uIG1jRm9vdGVyJ3MgbW9kYWwgYnV0dG9uIGNsaWNrXG4gICAgLy8gQW9UXG4gICAgb25CdXR0b25DbGljayhidXR0b246IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD4pIHtcbiAgICAgICAgLy8gQ2FsbCBvbkNsaWNrIGRpcmVjdGx5XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbmZlcnJlZC1lbXB0eS1vYmplY3QtdHlwZSAgcnVsZSBzZWVtcyB0byBiZSBicm9rZW5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRCdXR0b25DYWxsYWJsZVByb3AoYnV0dG9uLCAnb25DbGljaycpO1xuICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIChyZXN1bHQgYXMgUHJvbWlzZTx7fT4pLnRoZW4oKCkgPT4gYnV0dG9uLmxvYWRpbmcgPSBmYWxzZSkuY2F0Y2goKCkgPT4gYnV0dG9uLmxvYWRpbmcgPSBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEbyByZXN0IHRoaW5ncyB3aGVuIHZpc2libGUgc3RhdGUgY2hhbmdlZFxuICAgIHByaXZhdGUgaGFuZGxlVmlzaWJsZVN0YXRlQ2hhbmdlKHZpc2libGU6IGJvb2xlYW4sIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWUsIGNsb3NlUmVzdWx0PzogUik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIC8vIEhpZGUgc2Nyb2xsYmFyIGF0IHRoZSBmaXJzdCB0aW1lIHdoZW4gc2hvd24gdXBcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQm9keU92ZXJmbG93KDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAgIC5yZXNvbHZlKGFuaW1hdGlvbiAmJiB0aGlzLmFuaW1hdGVUbyh2aXNpYmxlKSlcbiAgICAgICAgICAgIC8vIEVtaXQgb3Blbi9jbG9zZSBldmVudCBhZnRlciBhbmltYXRpb25zIG92ZXJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1jQWZ0ZXJPcGVuLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1jQWZ0ZXJDbG9zZS5lbWl0KGNsb3NlUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2hvdy9oaWRlIHNjcm9sbGJhciB3aGVuIGFuaW1hdGlvbiBpcyBvdmVyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQm9keU92ZXJmbG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2hhbmdlIG1jVmlzaWJsZSBmcm9tIGluc2lkZVxuICAgIHByaXZhdGUgY2hhbmdlVmlzaWJsZUZyb21JbnNpZGUodmlzaWJsZTogYm9vbGVhbiwgY2xvc2VSZXN1bHQ/OiBSKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLm1jVmlzaWJsZSAhPT0gdmlzaWJsZSkge1xuICAgICAgICAgICAgLy8gQ2hhbmdlIG1jVmlzaWJsZSB2YWx1ZSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGUgPSB2aXNpYmxlO1xuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdCh2aXNpYmxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVmlzaWJsZVN0YXRlQ2hhbmdlKHZpc2libGUsIHRydWUsIGNsb3NlUmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZUFuaW1hdGlvblN0YXRlKHN0YXRlOiBBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gc3RhdGU7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5tYXNrQW5pbWF0aW9uQ2xhc3NNYXAgPSB7XG4gICAgICAgICAgICAgICAgW2BmYWRlLSR7c3RhdGV9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgW2BmYWRlLSR7c3RhdGV9LWFjdGl2ZWBdOiB0cnVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSB7XG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9LWFjdGl2ZWBdOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5tYXNrQW5pbWF0aW9uQ2xhc3NNYXAgPSB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudENvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYW5pbWF0ZVRvKGlzVmlzaWJsZTogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGxhc3Rlc3QgY2xpY2sgcG9zaXRpb24gd2hlbiBzaG93cyB1cFxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBbTk9URV0gVXNpbmcgdGltZW91dCBkdWUgdG8gdGhlIGRvY3VtZW50LmNsaWNrIGV2ZW50IGlzIGZpcmVkIGxhdGVyIHRoYW4gdmlzaWJsZSBjaGFuZ2UsXG4gICAgICAgICAgICAvLyBzbyBpZiBub3QgcG9zdHBvbmVkIHRvIG5leHQgZXZlbnQtbG9vcCwgd2UgY2FuJ3QgZ2V0IHRoZSBsYXN0ZXN0IGNsaWNrIHBvc2l0aW9uXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRyYW5zZm9ybU9yaWdpbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlQW5pbWF0aW9uU3RhdGUoaXNWaXNpYmxlID8gJ2VudGVyJyA6ICdsZWF2ZScpO1xuXG4gICAgICAgIC8vIFJldHVybiB3aGVuIGFuaW1hdGlvbiBpcyBvdmVyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBbmltYXRpb25TdGF0ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE1PREFMX0FOSU1BVEVfRFVSQVRJT05cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0TW9kYWxCdXR0b25zKGJ1dHRvbnM6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSk6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSB7XG4gICAgICAgIHJldHVybiBidXR0b25zLm1hcCgoYnV0dG9uKSA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLmJ1dHRvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tcG9uZW50IGR5bmFtaWNhbGx5IGJ1dCBub3QgYXR0YWNoIHRvIGFueSBWaWV3XG4gICAgICogKHRoaXMgYWN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBib2R5Q29udGFpbmVyIGlzIHJlYWR5KVxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgQ29tcG9uZW50IGNsYXNzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVEeW5hbWljQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxUPikge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgY2hpbGRJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWNNb2RhbFJlZiwgdXNlVmFsdWU6IHRoaXN9XSxcbiAgICAgICAgICAgIHBhcmVudDogdGhpcy52aWV3Q29udGFpbmVyLmluamVjdG9yXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGVudENvbXBvbmVudFJlZiA9IGZhY3RvcnkuY3JlYXRlKGNoaWxkSW5qZWN0b3IpO1xuXG4gICAgICAgIGlmICh0aGlzLm1jQ29tcG9uZW50UGFyYW1zKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5tY0NvbXBvbmVudFBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyB0aGUgZmlyc3QgY2hhbmdlIGRldGVjdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAvLyAob3Igd2UgZG8gZGV0ZWN0aW9uIGF0IG5nQWZ0ZXJWaWV3SW5pdCwgbXVsdGktY2hhbmdlcyBlcnJvciB3aWxsIGJlIHRocm93bilcbiAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdHJhbnNmb3JtLW9yaWdpbiB0byB0aGUgbGFzdCBjbGljayBwb3NpdGlvbiBvbiBkb2N1bWVudFxuICAgIHByaXZhdGUgdXBkYXRlVHJhbnNmb3JtT3JpZ2luKCkge1xuICAgICAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSB0aGlzLm1vZGFsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IE1vZGFsVXRpbC5nZXRMYXN0Q2xpY2tQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmIChsYXN0UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3JpZ2luID0gYCR7bGFzdFBvc2l0aW9uLnggLSBtb2RhbEVsZW1lbnQub2Zmc2V0TGVmdH1weCAke2xhc3RQb3NpdGlvbi55IC0gbW9kYWxFbGVtZW50Lm9mZnNldFRvcH1weCAwcHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZSBjYXJlIG9mIHRoZSBib2R5J3Mgb3ZlcmZsb3cgdG8gZGVjaWRlIHRoZSBleGlzdGVuc2Ugb2Ygc2Nyb2xsYmFyXG4gICAgICogQHBhcmFtIHBsdXNOdW0gVGhlIG51bWJlciB0aGF0IHRoZSBvcGVuTW9kYWxzLmxlbmd0aCB3aWxsIGluY3JlYXNlIHNvb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUJvZHlPdmVyZmxvdyhwbHVzTnVtOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Nb2RhbHMgPSB0aGlzLm1vZGFsQ29udHJvbC5vcGVuTW9kYWxzO1xuXG4gICAgICAgIGlmIChvcGVuTW9kYWxzLmxlbmd0aCArIHBsdXNOdW0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHksICdvdmVyZmxvdycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gaXNQcm9taXNlKG9iajoge30gfCB2b2lkKTogYm9vbGVhbiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICAgIHJldHVybiAhIW9iaiAmJlxuICAgICAgICAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiZcbiAgICAgICAgdHlwZW9mIChvYmogYXMgUHJvbWlzZTx7fT4pLnRoZW4gPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgdHlwZW9mIChvYmogYXMgUHJvbWlzZTx7fT4pLmNhdGNoID09PSAnZnVuY3Rpb24nO1xufVxuIiwiPCEtLSBDb21wYXRpYmxlOiB0aGUgPG5nLWNvbnRlbnQ+IGNhbiBhcHBlYXIgb25seSBvbmNlIC0tPlxuPG5nLXRlbXBsYXRlICN0cGxPcmlnaW5Db250ZW50PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+XG5cbjxkaXY+XG4gICAgPGRpdiAqbmdJZj1cIm1jTWFza1wiXG4gICAgICAgICBjbGFzcz1cIm1jLW1vZGFsLW1hc2tcIlxuICAgICAgICAgW25nQ2xhc3NdPVwibWFza0FuaW1hdGlvbkNsYXNzTWFwXCJcbiAgICAgICAgIFtjbGFzcy5tYy1tb2RhbC1tYXNrLWhpZGRlbl09XCJoaWRkZW5cIlxuICAgICAgICAgW25nU3R5bGVdPVwibWNNYXNrU3R5bGVcIlxuICAgICAgICAgW3N0eWxlLnpJbmRleF09XCJtY1pJbmRleFwiXG4gICAgPjwvZGl2PlxuICAgIDxkaXYgKG1vdXNlZG93bik9XCJvbkNsaWNrTWFzaygkZXZlbnQpXCJcbiAgICAgICAgIGNsYXNzPVwibWMtbW9kYWwtd3JhcCB7eyBtY1dyYXBDbGFzc05hbWUgfX1cIlxuICAgICAgICAgW3N0eWxlLnpJbmRleF09XCJtY1pJbmRleFwiXG4gICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJoaWRkZW4gPyAnbm9uZScgOiAnJ1wiXG4gICAgICAgICB0YWJpbmRleD1cIi0xXCI+XG5cbiAgICAgICAgPGRpdiAjbW9kYWxDb250YWluZXJcbiAgICAgICAgICAgICBjbGFzcz1cIm1jLW1vZGFsIHt7IG1jQ2xhc3NOYW1lIH19IG1jLW1vZGFsX3t7IG1jU2l6ZSB9fVwiXG4gICAgICAgICAgICAgW25nQ2xhc3NdPVwibW9kYWxBbmltYXRpb25DbGFzc01hcFwiXG4gICAgICAgICAgICAgW25nU3R5bGVdPVwibWNTdHlsZVwiXG4gICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIm1jV2lkdGggfCB0b0Nzc1VuaXRcIlxuICAgICAgICAgICAgIFtzdHlsZS50cmFuc2Zvcm0tb3JpZ2luXT1cInRyYW5zZm9ybU9yaWdpblwiPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWMtbW9kYWwtY29udGVudFwiIGNka1RyYXBGb2N1cz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwibWNDbG9zYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtYy1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrQ2xvc2VCdG4oKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1jLW1vZGFsLWNsb3NlIG1jLWJ1dHRvbl90cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBtYy1pY29uPVwibWMtY2xvc2UtTF8xNlwiIGNsYXNzPVwibWMtaWNvbiBtYy1pY29uX2xpZ2h0XCIgW2NvbG9yXT1cInRoZW1lUGFsZXR0ZS5TZWNvbmRcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJpc01vZGFsVHlwZSgnZGVmYXVsdCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxDb250ZW50RGVmYXVsdFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJpc01vZGFsVHlwZSgnY29uZmlybScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxDb250ZW50Q29uZmlybVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJpc01vZGFsVHlwZSgnY3VzdG9tJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbENvbnRlbnRDdXN0b21cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI3RwbENvbnRlbnRDdXN0b20+XG4gICAgPG5nLWNvbnRhaW5lciAjYm9keUNvbnRhaW5lcj48L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cblxuPCEtLSBbUHJlZGVmaW5lZF0gRGVmYXVsdCBNb2RhbCBDb250ZW50IC0tPlxuPG5nLXRlbXBsYXRlICN0cGxDb250ZW50RGVmYXVsdD5cbiAgICA8ZGl2ICpuZ0lmPVwibWNUaXRsZVwiIGNsYXNzPVwibWMtbW9kYWwtaGVhZGVyXCIgW2NsYXNzLm1jLW1vZGFsLWJvZHlfdG9wLW92ZXJmbG93XT1cImlzVG9wT3ZlcmZsb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLW1vZGFsLXRpdGxlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNUZW1wbGF0ZVJlZihtY1RpdGxlKVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIiRhbnkobWNUaXRsZSlcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJpc05vbkVtcHR5U3RyaW5nKG1jVGl0bGUpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJtY1RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1jLW1vZGFsLWJvZHlcIiAjbW9kYWxCb2R5IFtuZ1N0eWxlXT1cIm1jQm9keVN0eWxlXCIgKHNjcm9sbCk9XCJjaGVja092ZXJmbG93KClcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAjYm9keUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNDb21wb25lbnQobWNDb250ZW50KVwiIFtuZ1N3aXRjaF09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNUZW1wbGF0ZVJlZihtY0NvbnRlbnQpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShtY0NvbnRlbnQpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNOb25FbXB0eVN0cmluZyhtY0NvbnRlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJtY0NvbnRlbnRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsT3JpZ2luQ29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJtY0Zvb3RlciAhPT0gbnVsbFwiIGNsYXNzPVwibWMtbW9kYWwtZm9vdGVyXCIgW2NsYXNzLm1jLW1vZGFsLWJvZHlfYm90dG9tLW92ZXJmbG93XT1cImlzQm90dG9tT3ZlcmZsb3dcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNUZW1wbGF0ZVJlZihtY0Zvb3RlcilcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KG1jRm9vdGVyKVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNOb25FbXB0eVN0cmluZyhtY0Zvb3RlcilcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwibWNGb290ZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNNb2RhbEJ1dHRvbnMobWNGb290ZXIpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mICRhbnkobWNGb290ZXIpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG1jLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgI2F1dG9Gb2N1c2VkQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hdXRvZm9jdXNdPVwiYnV0dG9uLmF1dG9Gb2N1c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5tYy1tb2RhbC1tYWluLWFjdGlvbl09XCJidXR0b24ubWNNb2RhbE1haW5BY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJnZXRCdXR0b25DYWxsYWJsZVByb3AoYnV0dG9uLCAnc2hvdycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRCdXR0b25DYWxsYWJsZVByb3AoYnV0dG9uLCAnZGlzYWJsZWQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MubWMtcHJvZ3Jlc3NdPVwiZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKGJ1dHRvbiwgJ2xvYWRpbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25CdXR0b25DbGljayhidXR0b24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJidXR0b24udHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgYnV0dG9uLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAjYXV0b0ZvY3VzZWRCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXV0b2ZvY3VzXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIm1jT2tUZXh0ICE9PSBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgbWMtYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJ0aGVtZVBhbGV0dGUuUHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrT2tDYW5jZWwoJ29rJylcIj5cblxuICAgICAgICAgICAgICAgICAgICB7eyBva1RleHQgfX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwibWNDYW5jZWxUZXh0IT09bnVsbFwiIG1jLWJ1dHRvbiAoY2xpY2spPVwib25DbGlja09rQ2FuY2VsKCdjYW5jZWwnKVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBjYW5jZWxUZXh0IH19XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuPCEtLSAvW1ByZWRlZmluZWRdIERlZmF1bHQgTW9kYWwgQ29udGVudCAtLT5cblxuPCEtLSBbUHJlZGVmaW5lZF0gQ29uZmlybSBNb2RhbCBDb250ZW50IC0tPlxuPG5nLXRlbXBsYXRlICN0cGxDb250ZW50Q29uZmlybT5cbiAgICA8ZGl2IGNsYXNzPVwibWMtbW9kYWwtYm9keVwiIFtuZ1N0eWxlXT1cIm1jQm9keVN0eWxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy1jb25maXJtLWJvZHktd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1jLWNvbmZpcm0tYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYy1jb25maXJtLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAjYm9keUNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNDb21wb25lbnQobWNDb250ZW50KVwiIFtuZ1N3aXRjaF09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiaXNUZW1wbGF0ZVJlZihtY0NvbnRlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIiRhbnkobWNDb250ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImlzTm9uRW1wdHlTdHJpbmcobWNDb250ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwibWNDb250ZW50XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0IFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbE9yaWdpbkNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gPCEtLSAvLm1jLWNvbmZpcm0tYm9keS13cmFwcGVyIC0tPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtYy1jb25maXJtLWJ0bnNcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgbWMtYnV0dG9uXG4gICAgICAgICAgICAjYXV0b0ZvY3VzZWRCdXR0b25cbiAgICAgICAgICAgIFtjb2xvcl09XCJtY09rVHlwZVwiXG4gICAgICAgICAgICBbYXR0ci5hdXRvZm9jdXNdPVwidHJ1ZVwiXG4gICAgICAgICAgICAqbmdJZj1cIm1jT2tUZXh0ICE9PSAnJ1wiXG4gICAgICAgICAgICAoY2xpY2spPVwib25DbGlja09rQ2FuY2VsKCdvaycpXCI+XG5cbiAgICAgICAgICAgIHt7IG9rVGV4dCB9fVxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uIG1jLWJ1dHRvbiBbY29sb3JdPVwidGhlbWVQYWxldHRlLlNlY29uZFwiICpuZ0lmPVwibWNDYW5jZWxUZXh0ICE9PSAnJ1wiIChjbGljayk9XCJvbkNsaWNrT2tDYW5jZWwoJ2NhbmNlbCcpXCI+XG4gICAgICAgICAgICB7eyBjYW5jZWxUZXh0IH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbjwhLS0gL1tQcmVkZWZpbmVkXSBDb25maXJtIE1vZGFsIENvbnRlbnQgLS0+XG4iXX0=
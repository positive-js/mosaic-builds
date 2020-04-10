/**
 * @fileoverview added by tsickle
 * Generated from: modal.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __extends, __values } from "tslib";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Injector, Input, Output, QueryList, Renderer2, TemplateRef, Type, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { McModalControlService } from './modal-control.service';
import { McModalRef } from './modal-ref.class';
import { modalUtilObject as ModalUtil } from './modal-util';
// Duration when perform animations (ms)
/** @type {?} */
export var MODAL_ANIMATE_DURATION = 200;
/**
 * @template T, R
 */
var McModalComponent = /** @class */ (function (_super) {
    __extends(McModalComponent, _super);
    function McModalComponent(overlay, renderer, cfr, elementRef, viewContainer, modalControl, changeDetector, document) {
        var _this = _super.call(this) || this;
        _this.overlay = overlay;
        _this.renderer = renderer;
        _this.cfr = cfr;
        _this.elementRef = elementRef;
        _this.viewContainer = viewContainer;
        _this.modalControl = modalControl;
        _this.changeDetector = changeDetector;
        _this.document = document;
        _this.mcModalType = 'default';
        _this._mcVisible = false;
        _this.mcVisibleChange = new EventEmitter();
        _this.mcZIndex = 1000;
        _this.mcWidth = 480;
        _this.mcCloseByESC = true;
        _this._mcClosable = true;
        _this._mcMask = true;
        _this._mcMaskClosable = false;
        // Trigger when modal open(visible) after animations
        _this.mcAfterOpen = new EventEmitter();
        // Trigger when modal leave-animation over
        _this.mcAfterClose = new EventEmitter();
        _this.mcOkType = 'primary';
        _this._mcOkLoading = false;
        _this.mcOnOk = new EventEmitter();
        _this._mcCancelLoading = false;
        _this.mcOnCancel = new EventEmitter();
        // The origin point that animation based on
        _this.transformOrigin = '0px 0px 0px';
        _this.mcGetContainer = (/**
         * @return {?}
         */
        function () { return _this.overlay.create(); });
        return _this;
    }
    Object.defineProperty(McModalComponent.prototype, "mcVisible", {
        get: /**
         * @return {?}
         */
        function () { return this._mcVisible; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._mcVisible = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcClosable", {
        get: /**
         * @return {?}
         */
        function () { return this._mcClosable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._mcClosable = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcMask", {
        get: /**
         * @return {?}
         */
        function () { return this._mcMask; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._mcMask = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcMaskClosable", {
        get: /**
         * @return {?}
         */
        function () { return this._mcMaskClosable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._mcMaskClosable = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcOkLoading", {
        get: /**
         * @return {?}
         */
        function () { return this._mcOkLoading; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._mcOkLoading = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcCancelLoading", {
        get: /**
         * @return {?}
         */
        function () { return this._mcCancelLoading; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._mcCancelLoading = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "afterOpen", {
        // Observable alias for mcAfterOpen
        get: 
        // Observable alias for mcAfterOpen
        /**
         * @return {?}
         */
        function () {
            return this.mcAfterOpen.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "afterClose", {
        // Observable alias for mcAfterClose
        get: 
        // Observable alias for mcAfterClose
        /**
         * @return {?}
         */
        function () {
            return this.mcAfterClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "okText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mcOkText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "cancelText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mcCancelText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "hidden", {
        // Indicate whether this dialog should hidden
        get: 
        // Indicate whether this dialog should hidden
        /**
         * @return {?}
         */
        function () {
            return !this.mcVisible && !this.animationState;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    // [NOTE] NOT available when using by service!
    // Because ngOnChanges never be called when using by service,
    // here we can't support "mcContent"(Component) etc. as inputs that initialized dynamically.
    // BUT: User also can change "mcContent" dynamically to trigger UI changes
    // (provided you don't use Component that needs initializations)
    // [NOTE] NOT available when using by service!
    // Because ngOnChanges never be called when using by service,
    // here we can't support "mcContent"(Component) etc. as inputs that initialized dynamically.
    // BUT: User also can change "mcContent" dynamically to trigger UI changes
    // (provided you don't use Component that needs initializations)
    /**
     * @param {?} changes
     * @return {?}
     */
    McModalComponent.prototype.ngOnChanges = 
    // [NOTE] NOT available when using by service!
    // Because ngOnChanges never be called when using by service,
    // here we can't support "mcContent"(Component) etc. as inputs that initialized dynamically.
    // BUT: User also can change "mcContent" dynamically to trigger UI changes
    // (provided you don't use Component that needs initializations)
    /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.mcVisible) {
            // Do not trigger animation while initializing
            this.handleVisibleStateChange(this.mcVisible, !changes.mcVisible.firstChange);
        }
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        try {
            for (var _b = __values(this.autoFocusedButtons.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var autoFocusedButton = _c.value;
                if (autoFocusedButton.nativeElement.autofocus) {
                    ((/** @type {?} */ (autoFocusedButton.nativeElement))).focus();
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.container instanceof OverlayRef) {
            this.container.dispose();
        }
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this.changeVisibleFromInside(true);
    };
    /**
     * @param {?=} result
     * @return {?}
     */
    McModalComponent.prototype.close = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        this.changeVisibleFromInside(false, result);
    };
    // Destroy equals Close
    // Destroy equals Close
    /**
     * @param {?=} result
     * @return {?}
     */
    McModalComponent.prototype.destroy = 
    // Destroy equals Close
    /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        this.close(result);
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        this.changeDetector.markForCheck();
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.triggerOk = /**
     * @return {?}
     */
    function () {
        this.onClickOkCancel('ok');
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.triggerCancel = /**
     * @return {?}
     */
    function () {
        this.onClickOkCancel('cancel');
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.getInstance = /**
     * @return {?}
     */
    function () {
        return this;
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.getContentComponentRef = /**
     * @return {?}
     */
    function () {
        return this.contentComponentRef;
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.getContentComponent = /**
     * @return {?}
     */
    function () {
        return this.contentComponentRef && this.contentComponentRef.instance;
    };
    /**
     * @return {?}
     */
    McModalComponent.prototype.getElement = /**
     * @return {?}
     */
    function () {
        return this.elementRef && this.elementRef.nativeElement;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McModalComponent.prototype.onClickMask = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.mcMask &&
            this.mcMaskClosable &&
            ((/** @type {?} */ ($event.target))).classList.contains('mc-modal-wrap') &&
            this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    };
    // tslint:disable-next-line: no-reserved-keywords
    // tslint:disable-next-line: no-reserved-keywords
    /**
     * @param {?} type
     * @return {?}
     */
    McModalComponent.prototype.isModalType = 
    // tslint:disable-next-line: no-reserved-keywords
    /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.mcModalType === type;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McModalComponent.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation .key isn't supported in Edge
        if (event.keyCode === ESCAPE && this.container && (this.container instanceof OverlayRef)) {
            this.close();
            event.preventDefault();
        }
    };
    // AoT
    // AoT
    /**
     * @return {?}
     */
    McModalComponent.prototype.onClickCloseBtn = 
    // AoT
    /**
     * @return {?}
     */
    function () {
        if (this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    };
    // AoT
    // tslint:disable-next-line: no-reserved-keywords
    // AoT
    // tslint:disable-next-line: no-reserved-keywords
    /**
     * @param {?} type
     * @return {?}
     */
    McModalComponent.prototype.onClickOkCancel = 
    // AoT
    // tslint:disable-next-line: no-reserved-keywords
    /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        /** @type {?} */
        var trigger = { ok: this.mcOnOk, cancel: this.mcOnCancel }[type];
        /** @type {?} */
        var loadingKey = { ok: 'mcOkLoading', cancel: 'mcCancelLoading' }[type];
        if (trigger instanceof EventEmitter) {
            trigger.emit(this.getContentComponent());
        }
        else if (typeof trigger === 'function') {
            /** @type {?} */
            var result = trigger(this.getContentComponent());
            // Users can return "false" to prevent closing by default
            /** @type {?} */
            var caseClose_1 = (/**
             * @param {?} doClose
             * @return {?}
             */
            function (doClose) { return (doClose !== false) && _this.close((/** @type {?} */ (doClose))); });
            if (isPromise(result)) {
                this[loadingKey] = true;
                /** @type {?} */
                var handleThen = (/**
                 * @param {?} doClose
                 * @return {?}
                 */
                function (doClose) {
                    _this[loadingKey] = false;
                    caseClose_1(doClose);
                });
                ((/** @type {?} */ (result))).then(handleThen).catch(handleThen);
            }
            else {
                caseClose_1(result);
            }
        }
    };
    // AoT
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    McModalComponent.prototype.isNonEmptyString = 
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'string' && value !== '';
    };
    // AoT
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    McModalComponent.prototype.isTemplateRef = 
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof TemplateRef;
    };
    // AoT
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    McModalComponent.prototype.isComponent = 
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof Type;
    };
    // AoT
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    McModalComponent.prototype.isModalButtons = 
    // AoT
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Array.isArray(value) && value.length > 0;
    };
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    /**
     * @param {?} options
     * @param {?} prop
     * @return {?}
     */
    McModalComponent.prototype.getButtonCallableProp = 
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    /**
     * @param {?} options
     * @param {?} prop
     * @return {?}
     */
    function (options, prop) {
        /** @type {?} */
        var value = options[prop];
        /** @type {?} */
        var args = [];
        if (this.contentComponentRef) {
            args.push(this.contentComponentRef.instance);
        }
        return typeof value === 'function' ? value.apply(options, args) : value;
    };
    // On mcFooter's modal button click
    // AoT
    // On mcFooter's modal button click
    // AoT
    /**
     * @param {?} button
     * @return {?}
     */
    McModalComponent.prototype.onButtonClick = 
    // On mcFooter's modal button click
    // AoT
    /**
     * @param {?} button
     * @return {?}
     */
    function (button) {
        // Call onClick directly
        // tslint:disable-next-line:no-inferred-empty-object-type  rule seems to be broken
        /** @type {?} */
        var result = this.getButtonCallableProp(button, 'onClick');
        if (isPromise(result)) {
            button.loading = true;
            ((/** @type {?} */ (result))).then((/**
             * @return {?}
             */
            function () { return button.loading = false; })).catch((/**
             * @return {?}
             */
            function () { return button.loading = false; }));
        }
    };
    // Do rest things when visible state changed
    // Do rest things when visible state changed
    /**
     * @private
     * @param {?} visible
     * @param {?=} animation
     * @param {?=} closeResult
     * @return {?}
     */
    McModalComponent.prototype.handleVisibleStateChange = 
    // Do rest things when visible state changed
    /**
     * @private
     * @param {?} visible
     * @param {?=} animation
     * @param {?=} closeResult
     * @return {?}
     */
    function (visible, animation, closeResult) {
        var _this = this;
        if (animation === void 0) { animation = true; }
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
        function () {
            if (visible) {
                _this.mcAfterOpen.emit();
            }
            else {
                _this.mcAfterClose.emit(closeResult);
                // Show/hide scrollbar when animation is over
                _this.changeBodyOverflow();
            }
        }));
    };
    // Change mcVisible from inside
    // Change mcVisible from inside
    /**
     * @private
     * @param {?} visible
     * @param {?=} closeResult
     * @return {?}
     */
    McModalComponent.prototype.changeVisibleFromInside = 
    // Change mcVisible from inside
    /**
     * @private
     * @param {?} visible
     * @param {?=} closeResult
     * @return {?}
     */
    function (visible, closeResult) {
        if (this.mcVisible !== visible) {
            // Change mcVisible value immediately
            this.mcVisible = visible;
            this.mcVisibleChange.emit(visible);
            return this.handleVisibleStateChange(visible, true, closeResult);
        }
        return Promise.resolve();
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    McModalComponent.prototype.changeAnimationState = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var _a, _b;
        this.animationState = state;
        if (state) {
            this.maskAnimationClassMap = (_a = {},
                _a["fade-" + state] = true,
                _a["fade-" + state + "-active"] = true,
                _a);
            this.modalAnimationClassMap = (_b = {},
                _b["zoom-" + state] = true,
                _b["zoom-" + state + "-active"] = true,
                _b);
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
    };
    /**
     * @private
     * @param {?} isVisible
     * @return {?}
     */
    McModalComponent.prototype.animateTo = /**
     * @private
     * @param {?} isVisible
     * @return {?}
     */
    function (isVisible) {
        var _this = this;
        // Figure out the lastest click position when shows up
        if (isVisible) {
            // [NOTE] Using timeout due to the document.click event is fired later than visible change,
            // so if not postponed to next event-loop, we can't get the lastest click position
            window.setTimeout((/**
             * @return {?}
             */
            function () { return _this.updateTransformOrigin(); }));
        }
        this.changeAnimationState(isVisible ? 'enter' : 'leave');
        // Return when animation is over
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) { return window.setTimeout((/**
         * @return {?}
         */
        function () {
            _this.changeAnimationState(null);
            resolve();
        }), MODAL_ANIMATE_DURATION); }));
    };
    /**
     * @private
     * @param {?} buttons
     * @return {?}
     */
    McModalComponent.prototype.formatModalButtons = /**
     * @private
     * @param {?} buttons
     * @return {?}
     */
    function (buttons) {
        return buttons.map((/**
         * @param {?} button
         * @return {?}
         */
        function (button) {
            return __assign({
                type: 'default',
                size: 'default',
                autoLoading: true,
                show: true,
                loading: false,
                disabled: false
            }, button);
        }));
    };
    /**
     * Create a component dynamically but not attach to any View
     * (this action will be executed when bodyContainer is ready)
     * @param component Component class
     */
    /**
     * Create a component dynamically but not attach to any View
     * (this action will be executed when bodyContainer is ready)
     * @private
     * @param {?} component Component class
     * @return {?}
     */
    McModalComponent.prototype.createDynamicComponent = /**
     * Create a component dynamically but not attach to any View
     * (this action will be executed when bodyContainer is ready)
     * @private
     * @param {?} component Component class
     * @return {?}
     */
    function (component) {
        /** @type {?} */
        var factory = this.cfr.resolveComponentFactory(component);
        /** @type {?} */
        var childInjector = Injector.create({
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
    };
    // Update transform-origin to the last click position on document
    // Update transform-origin to the last click position on document
    /**
     * @private
     * @return {?}
     */
    McModalComponent.prototype.updateTransformOrigin = 
    // Update transform-origin to the last click position on document
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var modalElement = (/** @type {?} */ (this.modalContainer.nativeElement));
        /** @type {?} */
        var lastPosition = ModalUtil.getLastClickPosition();
        if (lastPosition) {
            this.transformOrigin = lastPosition.x - modalElement.offsetLeft + "px " + (lastPosition.y - modalElement.offsetTop) + "px 0px";
        }
    };
    /**
     * Take care of the body's overflow to decide the existense of scrollbar
     * @param plusNum The number that the openModals.length will increase soon
     */
    /**
     * Take care of the body's overflow to decide the existense of scrollbar
     * @private
     * @param {?=} plusNum The number that the openModals.length will increase soon
     * @return {?}
     */
    McModalComponent.prototype.changeBodyOverflow = /**
     * Take care of the body's overflow to decide the existense of scrollbar
     * @private
     * @param {?=} plusNum The number that the openModals.length will increase soon
     * @return {?}
     */
    function (plusNum) {
        if (plusNum === void 0) { plusNum = 0; }
        /** @type {?} */
        var openModals = this.modalControl.openModals;
        if (openModals.length + plusNum > 0) {
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        }
        else {
            this.renderer.removeStyle(this.document.body, 'overflow');
        }
    };
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
    McModalComponent.ctorParameters = function () { return [
        { type: Overlay },
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: McModalControlService },
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
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
    return McModalComponent;
}(McModalRef));
export { McModalComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDWSxpQkFBaUIsRUFDaEMsU0FBUyxFQUNULHdCQUF3QixFQUV4QixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUlMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUVULFdBQVcsRUFDWCxJQUFJLEVBQ0osU0FBUyxFQUNULFlBQVksRUFDWixnQkFBZ0IsRUFBRSxpQkFBaUIsRUFDdEMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxJQUFJLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O0FBSzVELE1BQU0sS0FBTyxzQkFBc0IsR0FBRyxHQUFHOzs7O0FBSXpDO0lBU3dELG9DQUFnQjtJQStHcEUsMEJBQ1ksT0FBZ0IsRUFDaEIsUUFBbUIsRUFDbkIsR0FBNkIsRUFDN0IsVUFBc0IsRUFDdEIsYUFBK0IsRUFDL0IsWUFBbUMsRUFDbkMsY0FBaUMsRUFDZixRQUFhO1FBUjNDLFlBVUksaUJBQU8sU0FDVjtRQVZXLGFBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsY0FBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixTQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUM3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Q0FBdUI7Ozs7O0lBS3ZCLDJDQUFnQzs7SUFFaEMsdUNBQTZCOztJQUM3Qix1Q0FBNkI7O0lBRzdCLHVDQUFpRDs7SUFFakQsd0NBQStDOztJQUcvQyxvQ0FBMEI7O0lBQzFCLG9DQUE4Qjs7Ozs7SUFLOUIsd0NBQTZCOztJQUU3QixrQ0FBd0Y7O0lBQ3hGLHdDQUE4Qjs7Ozs7SUFLOUIsNENBQWlDOztJQUVqQyxzQ0FBNEY7O0lBRTVGLDBDQUEwRTs7SUFDMUUseUNBQXVHOztJQUV2Ryw4Q0FBbUc7O0lBRW5HLGlEQUE4Qjs7SUFDOUIsa0RBQStCOztJQUUvQiwyQ0FBZ0M7Ozs7O0lBMEJoQywrQ0FBNkM7Ozs7O0lBRTdDLDBDQUF1Qzs7Ozs7SUFDdkMscUNBQTRDOztJQWU1QywwQ0FBbUg7Ozs7O0lBWi9HLG1DQUF3Qjs7Ozs7SUFDeEIsb0NBQTJCOzs7OztJQUMzQiwrQkFBcUM7Ozs7O0lBQ3JDLHNDQUE4Qjs7Ozs7SUFDOUIseUNBQXVDOzs7OztJQUN2Qyx3Q0FBMkM7Ozs7O0lBQzNDLDBDQUF5Qzs7Ozs7SUFDekMsb0NBQXVDOzs7Ozs7O0FBb1cvQyxTQUFTLFNBQVMsQ0FBQyxHQUFjO0lBQzdCLDhDQUE4QztJQUM5QyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLG1CQUFBLEdBQUcsRUFBZSxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsbUJBQUEsR0FBRyxFQUFlLENBQUMsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDO0FBQ2xMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0b3IsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBUeXBlLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0NvbnRhaW5lclJlZiwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY01vZGFsQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBNY01vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgbW9kYWxVdGlsT2JqZWN0IGFzIE1vZGFsVXRpbCB9IGZyb20gJy4vbW9kYWwtdXRpbCc7XG5pbXBvcnQgeyBJTW9kYWxCdXR0b25PcHRpb25zLCBJTW9kYWxPcHRpb25zLCBNb2RhbFR5cGUsIE9uQ2xpY2tDYWxsYmFjayB9IGZyb20gJy4vbW9kYWwudHlwZSc7XG5cblxuLy8gRHVyYXRpb24gd2hlbiBwZXJmb3JtIGFuaW1hdGlvbnMgKG1zKVxuZXhwb3J0IGNvbnN0IE1PREFMX0FOSU1BVEVfRFVSQVRJT04gPSAyMDA7XG5cbnR5cGUgQW5pbWF0aW9uU3RhdGUgPSAnZW50ZXInIHwgJ2xlYXZlJyB8IG51bGw7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbW9kYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbW9kYWwuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNNb2RhbENvbXBvbmVudDxUID0gYW55LCBSID0gYW55PiBleHRlbmRzIE1jTW9kYWxSZWY8VCwgUj5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIElNb2RhbE9wdGlvbnMge1xuXG4gICAgQElucHV0KCkgbWNNb2RhbFR5cGU6IE1vZGFsVHlwZSA9ICdkZWZhdWx0JztcblxuICAgIC8vIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgb3BlbmVkIGludG8gdGhlIGRpYWxvZy5cbiAgICBASW5wdXQoKSBtY0NvbXBvbmVudDogVHlwZTxUPjtcbiAgICAvLyBJZiBub3Qgc3BlY2lmaWVkLCB3aWxsIHVzZSA8bmctY29udGVudD5cbiAgICBASW5wdXQoKSBtY0NvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PiB8IFR5cGU8VD47XG4gICAgLy8gYXZhaWxhYmxlIHdoZW4gbWNDb250ZW50IGlzIGEgY29tcG9uZW50XG4gICAgQElucHV0KCkgbWNDb21wb25lbnRQYXJhbXM6IFQ7XG4gICAgLy8gRGVmYXVsdCBNb2RhbCBPTkxZXG4gICAgQElucHV0KCkgbWNGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PiB8IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMuX21jVmlzaWJsZTsgfVxuICAgIHNldCBtY1Zpc2libGUodmFsdWUpIHsgdGhpcy5fbWNWaXNpYmxlID0gdmFsdWU7IH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIG1jVmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBJbnB1dCgpIG1jWkluZGV4OiBudW1iZXIgPSAxMDAwO1xuICAgIEBJbnB1dCgpIG1jV2lkdGg6IG51bWJlciB8IHN0cmluZyA9IDQ4MDtcbiAgICBASW5wdXQoKSBtY1dyYXBDbGFzc05hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtY0NsYXNzTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1jU3R5bGU6IG9iamVjdDtcbiAgICBASW5wdXQoKSBtY1RpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx7fT47XG4gICAgQElucHV0KCkgbWNDbG9zZUJ5RVNDOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jQ2xvc2FibGUoKSB7IHJldHVybiB0aGlzLl9tY0Nsb3NhYmxlOyB9XG4gICAgc2V0IG1jQ2xvc2FibGUodmFsdWUpIHsgdGhpcy5fbWNDbG9zYWJsZSA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNDbG9zYWJsZSA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY01hc2soKSB7IHJldHVybiB0aGlzLl9tY01hc2s7IH1cbiAgICBzZXQgbWNNYXNrKHZhbHVlKSB7IHRoaXMuX21jTWFzayA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNNYXNrID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jTWFza0Nsb3NhYmxlKCkgeyByZXR1cm4gdGhpcy5fbWNNYXNrQ2xvc2FibGU7IH1cbiAgICBzZXQgbWNNYXNrQ2xvc2FibGUodmFsdWUpIHsgdGhpcy5fbWNNYXNrQ2xvc2FibGUgPSB2YWx1ZTsgfVxuICAgIHByaXZhdGUgX21jTWFza0Nsb3NhYmxlID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBtY01hc2tTdHlsZTogb2JqZWN0O1xuICAgIEBJbnB1dCgpIG1jQm9keVN0eWxlOiBvYmplY3Q7XG5cbiAgICAvLyBUcmlnZ2VyIHdoZW4gbW9kYWwgb3Blbih2aXNpYmxlKSBhZnRlciBhbmltYXRpb25zXG4gICAgQE91dHB1dCgpIG1jQWZ0ZXJPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIC8vIFRyaWdnZXIgd2hlbiBtb2RhbCBsZWF2ZS1hbmltYXRpb24gb3ZlclxuICAgIEBPdXRwdXQoKSBtY0FmdGVyQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPFI+KCk7XG5cbiAgICAvLyAtLS0gUHJlZGVmaW5lZCBPSyAmIENhbmNlbCBidXR0b25zXG4gICAgQElucHV0KCkgbWNPa1RleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBtY09rVHlwZSA9ICdwcmltYXJ5JztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jT2tMb2FkaW5nKCkgeyByZXR1cm4gdGhpcy5fbWNPa0xvYWRpbmc7IH1cbiAgICBzZXQgbWNPa0xvYWRpbmcodmFsdWUpIHsgdGhpcy5fbWNPa0xvYWRpbmcgPSB2YWx1ZTsgfVxuICAgIHByaXZhdGUgX21jT2tMb2FkaW5nID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBAT3V0cHV0KCkgbWNPbk9rOiBFdmVudEVtaXR0ZXI8VD4gfCBPbkNsaWNrQ2FsbGJhY2s8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG4gICAgQElucHV0KCkgbWNDYW5jZWxUZXh0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY0NhbmNlbExvYWRpbmcoKSB7IHJldHVybiB0aGlzLl9tY0NhbmNlbExvYWRpbmc7IH1cbiAgICBzZXQgbWNDYW5jZWxMb2FkaW5nKHZhbHVlKSB7IHRoaXMuX21jQ2FuY2VsTG9hZGluZyA9IHZhbHVlOyB9XG4gICAgcHJpdmF0ZSBfbWNDYW5jZWxMb2FkaW5nID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBAT3V0cHV0KCkgbWNPbkNhbmNlbDogRXZlbnRFbWl0dGVyPFQ+IHwgT25DbGlja0NhbGxiYWNrPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbW9kYWxDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBtb2RhbENvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdib2R5Q29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IGZhbHNlIH0pIGJvZHlDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gICAgLy8gT25seSBhaW0gdG8gZm9jdXMgdGhlIG9rIGJ1dHRvbiB0aGF0IG5lZWRzIHRvIGJlIGF1dG8gZm9jdXNlZFxuICAgIEBWaWV3Q2hpbGRyZW4oJ2F1dG9Gb2N1c2VkQnV0dG9uJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIGF1dG9Gb2N1c2VkQnV0dG9uczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gICAgbWFza0FuaW1hdGlvbkNsYXNzTWFwOiBvYmplY3Q7XG4gICAgbW9kYWxBbmltYXRpb25DbGFzc01hcDogb2JqZWN0O1xuICAgIC8vIFRoZSBvcmlnaW4gcG9pbnQgdGhhdCBhbmltYXRpb24gYmFzZWQgb25cbiAgICB0cmFuc2Zvcm1PcmlnaW4gPSAnMHB4IDBweCAwcHgnO1xuXG4gICAgLy8gT2JzZXJ2YWJsZSBhbGlhcyBmb3IgbWNBZnRlck9wZW5cbiAgICBnZXQgYWZ0ZXJPcGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tY0FmdGVyT3Blbi5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvLyBPYnNlcnZhYmxlIGFsaWFzIGZvciBtY0FmdGVyQ2xvc2VcbiAgICBnZXQgYWZ0ZXJDbG9zZSgpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNBZnRlckNsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGdldCBva1RleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNPa1RleHQ7XG4gICAgfVxuXG4gICAgZ2V0IGNhbmNlbFRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNDYW5jZWxUZXh0O1xuICAgIH1cblxuICAgIC8vIEluZGljYXRlIHdoZXRoZXIgdGhpcyBkaWFsb2cgc2hvdWxkIGhpZGRlblxuICAgIGdldCBoaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5tY1Zpc2libGUgJiYgIXRoaXMuYW5pbWF0aW9uU3RhdGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHRoZSByZWZlcmVuY2Ugd2hlbiB1c2luZyBtY0NvbnRlbnQgYXMgQ29tcG9uZW50XG4gICAgcHJpdmF0ZSBjb250ZW50Q29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD47XG4gICAgLy8gQ3VycmVudCBhbmltYXRpb24gc3RhdGVcbiAgICBwcml2YXRlIGFuaW1hdGlvblN0YXRlOiBBbmltYXRpb25TdGF0ZTtcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBPdmVybGF5UmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2w6IE1jTW9kYWxDb250cm9sU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIG1jR2V0Q29udGFpbmVyOiBIVE1MRWxlbWVudCB8IE92ZXJsYXlSZWYgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBPdmVybGF5UmVmKSA9ICgpID0+IHRoaXMub3ZlcmxheS5jcmVhdGUoKTtcblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIENyZWF0ZSBjb21wb25lbnQgYWxvbmcgd2l0aG91dCBWaWV3XG4gICAgICAgIGlmICh0aGlzLmlzQ29tcG9uZW50KHRoaXMubWNDb250ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVEeW5hbWljQ29tcG9uZW50KHRoaXMubWNDb250ZW50IGFzIFR5cGU8VD4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0dXAgZGVmYXVsdCBidXR0b24gb3B0aW9uc1xuICAgICAgICBpZiAodGhpcy5pc01vZGFsQnV0dG9ucyh0aGlzLm1jRm9vdGVyKSkge1xuICAgICAgICAgICAgdGhpcy5tY0Zvb3RlciA9IHRoaXMuZm9ybWF0TW9kYWxCdXR0b25zKHRoaXMubWNGb290ZXIgYXMgSU1vZGFsQnV0dG9uT3B0aW9uczxUPltdKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuaXNDb21wb25lbnQodGhpcy5tY0NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHluYW1pY0NvbXBvbmVudCh0aGlzLm1jQ29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBtb2RhbCBkb20gdG8gZWxzZXdoZXJlXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdHlwZW9mIHRoaXMubWNHZXRDb250YWluZXIgPT09ICdmdW5jdGlvbicgPyB0aGlzLm1jR2V0Q29udGFpbmVyKCkgOiB0aGlzLm1jR2V0Q29udGFpbmVyO1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikge1xuICAgICAgICAgICAgLy8gTk9URTogb25seSBhdHRhY2ggdGhlIGRvbSB0byBvdmVybGF5LCB0aGUgdmlldyBjb250YWluZXIgaXMgbm90IGNoYW5nZWQgYWN0dWFsbHlcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLm92ZXJsYXlFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZ2lzdGVyIG1vZGFsIHdoZW4gYWZ0ZXJPcGVuL2FmdGVyQ2xvc2UgaXMgc3RhYmxlXG4gICAgICAgIHRoaXMubW9kYWxDb250cm9sLnJlZ2lzdGVyTW9kYWwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gW05PVEVdIE5PVCBhdmFpbGFibGUgd2hlbiB1c2luZyBieSBzZXJ2aWNlIVxuICAgIC8vIEJlY2F1c2UgbmdPbkNoYW5nZXMgbmV2ZXIgYmUgY2FsbGVkIHdoZW4gdXNpbmcgYnkgc2VydmljZSxcbiAgICAvLyBoZXJlIHdlIGNhbid0IHN1cHBvcnQgXCJtY0NvbnRlbnRcIihDb21wb25lbnQpIGV0Yy4gYXMgaW5wdXRzIHRoYXQgaW5pdGlhbGl6ZWQgZHluYW1pY2FsbHkuXG4gICAgLy8gQlVUOiBVc2VyIGFsc28gY2FuIGNoYW5nZSBcIm1jQ29udGVudFwiIGR5bmFtaWNhbGx5IHRvIHRyaWdnZXIgVUkgY2hhbmdlc1xuICAgIC8vIChwcm92aWRlZCB5b3UgZG9uJ3QgdXNlIFxiQ29tcG9uZW50IHRoYXQgbmVlZHMgaW5pdGlhbGl6YXRpb25zKVxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBEbyBub3QgdHJpZ2dlciBhbmltYXRpb24gd2hpbGUgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVZpc2libGVTdGF0ZUNoYW5nZSh0aGlzLm1jVmlzaWJsZSwgIWNoYW5nZXMubWNWaXNpYmxlLmZpcnN0Q2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gSWYgdXNpbmcgQ29tcG9uZW50LCBpdCBpcyB0aGUgdGltZSB0byBhdHRhY2ggVmlldyB3aGlsZSBib2R5Q29udGFpbmVyIGlzIHJlYWR5XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keUNvbnRhaW5lci5pbnNlcnQodGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgYXV0b0ZvY3VzZWRCdXR0b24gb2YgdGhpcy5hdXRvRm9jdXNlZEJ1dHRvbnMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAoYXV0b0ZvY3VzZWRCdXR0b24ubmF0aXZlRWxlbWVudC5hdXRvZm9jdXMpIHtcbiAgICAgICAgICAgICAgICAoYXV0b0ZvY3VzZWRCdXR0b24ubmF0aXZlRWxlbWVudCBhcyBIVE1MQnV0dG9uRWxlbWVudCkuZm9jdXMoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciBpbnN0YW5jZW9mIE92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmlzaWJsZUZyb21JbnNpZGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xvc2UocmVzdWx0PzogUikge1xuICAgICAgICB0aGlzLmNoYW5nZVZpc2libGVGcm9tSW5zaWRlKGZhbHNlLCByZXN1bHQpO1xuICAgIH1cblxuICAgIC8vIERlc3Ryb3kgZXF1YWxzIENsb3NlXG4gICAgZGVzdHJveShyZXN1bHQ/OiBSKSB7XG4gICAgICAgIHRoaXMuY2xvc2UocmVzdWx0KTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdHJpZ2dlck9rKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnb2snKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VyQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgfVxuXG4gICAgZ2V0SW5zdGFuY2UoKTogTWNNb2RhbENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRDb21wb25lbnRSZWYoKTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudENvbXBvbmVudFJlZjtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50Q29tcG9uZW50KCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50Q29tcG9uZW50UmVmICYmIHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZiAmJiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBvbkNsaWNrTWFzaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5tY01hc2sgJiZcbiAgICAgICAgICAgIHRoaXMubWNNYXNrQ2xvc2FibGUgJiZcbiAgICAgICAgICAgICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuY29udGFpbnMoJ21jLW1vZGFsLXdyYXAnKSAmJlxuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgaXNNb2RhbFR5cGUodHlwZTogTW9kYWxUeXBlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jTW9kYWxUeXBlID09PSB0eXBlO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvbiAua2V5IGlzbid0IHN1cHBvcnRlZCBpbiBFZGdlXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5jb250YWluZXIgJiYgKHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgT3ZlcmxheVJlZikpIHtcblxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIG9uQ2xpY2tDbG9zZUJ0bigpIHtcbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2tPa0NhbmNlbCgnY2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBb1RcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXJlc2VydmVkLWtleXdvcmRzXG4gICAgb25DbGlja09rQ2FuY2VsKHR5cGU6ICdvaycgfCAnY2FuY2VsJykge1xuICAgICAgICBjb25zdCB0cmlnZ2VyID0geyBvazogdGhpcy5tY09uT2ssIGNhbmNlbDogdGhpcy5tY09uQ2FuY2VsIH1bdHlwZV07XG4gICAgICAgIGNvbnN0IGxvYWRpbmdLZXkgPSB7IG9rOiAnbWNPa0xvYWRpbmcnLCBjYW5jZWw6ICdtY0NhbmNlbExvYWRpbmcnIH1bdHlwZV07XG5cbiAgICAgICAgaWYgKHRyaWdnZXIgaW5zdGFuY2VvZiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgIHRyaWdnZXIuZW1pdCh0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyaWdnZXIgPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJpZ2dlcih0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICAgICAgICAvLyBVc2VycyBjYW4gcmV0dXJuIFwiZmFsc2VcIiB0byBwcmV2ZW50IGNsb3NpbmcgYnkgZGVmYXVsdFxuICAgICAgICAgICAgY29uc3QgY2FzZUNsb3NlID0gKGRvQ2xvc2U6IGJvb2xlYW4gfCB2b2lkIHwge30pID0+IChkb0Nsb3NlICE9PSBmYWxzZSkgJiYgdGhpcy5jbG9zZShkb0Nsb3NlIGFzIFIpO1xuXG4gICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2xvYWRpbmdLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVUaGVuID0gKGRvQ2xvc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tsb2FkaW5nS2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlQ2xvc2UoZG9DbG9zZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAocmVzdWx0IGFzIFByb21pc2U8dm9pZD4pLnRoZW4oaGFuZGxlVGhlbikuY2F0Y2goaGFuZGxlVGhlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhc2VDbG9zZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQW9UXG4gICAgaXNOb25FbXB0eVN0cmluZyh2YWx1ZToge30pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzVGVtcGxhdGVSZWYodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzQ29tcG9uZW50KHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUeXBlO1xuICAgIH1cblxuICAgIC8vIEFvVFxuICAgIGlzTW9kYWxCdXR0b25zKHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvLyBMb29rdXAgYSBidXR0b24ncyBwcm9wZXJ0eSwgaWYgdGhlIHByb3AgaXMgYSBmdW5jdGlvbiwgY2FsbCAmIHRoZW4gcmV0dXJuIHRoZSByZXN1bHQsIG90aGVyd2lzZSwgcmV0dXJuIGl0c2VsZi5cbiAgICAvLyBBb1RcbiAgICBnZXRCdXR0b25DYWxsYWJsZVByb3Aob3B0aW9uczogSU1vZGFsQnV0dG9uT3B0aW9uczxUPiwgcHJvcDogc3RyaW5nKToge30ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbcHJvcF07XG4gICAgICAgIGNvbnN0IGFyZ3M6IGFueVtdID0gW107XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmNvbnRlbnRDb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmFwcGx5KG9wdGlvbnMsIGFyZ3MpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gT24gbWNGb290ZXIncyBtb2RhbCBidXR0b24gY2xpY2tcbiAgICAvLyBBb1RcbiAgICBvbkJ1dHRvbkNsaWNrKGJ1dHRvbjogSU1vZGFsQnV0dG9uT3B0aW9uczxUPikge1xuICAgICAgICAvLyBDYWxsIG9uQ2xpY2sgZGlyZWN0bHlcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWluZmVycmVkLWVtcHR5LW9iamVjdC10eXBlICBydWxlIHNlZW1zIHRvIGJlIGJyb2tlblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldEJ1dHRvbkNhbGxhYmxlUHJvcChidXR0b24sICdvbkNsaWNrJyk7XG4gICAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAgICAgYnV0dG9uLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgKHJlc3VsdCBhcyBQcm9taXNlPHt9PikudGhlbigoKSA9PiBidXR0b24ubG9hZGluZyA9IGZhbHNlKS5jYXRjaCgoKSA9PiBidXR0b24ubG9hZGluZyA9IGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvIHJlc3QgdGhpbmdzIHdoZW4gdmlzaWJsZSBzdGF0ZSBjaGFuZ2VkXG4gICAgcHJpdmF0ZSBoYW5kbGVWaXNpYmxlU3RhdGVDaGFuZ2UodmlzaWJsZTogYm9vbGVhbiwgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZSwgY2xvc2VSZXN1bHQ/OiBSKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgLy8gSGlkZSBzY3JvbGxiYXIgYXQgdGhlIGZpcnN0IHRpbWUgd2hlbiBzaG93biB1cFxuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VCb2R5T3ZlcmZsb3coMSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgLnJlc29sdmUoYW5pbWF0aW9uICYmIHRoaXMuYW5pbWF0ZVRvKHZpc2libGUpKVxuICAgICAgICAgICAgLy8gRW1pdCBvcGVuL2Nsb3NlIGV2ZW50IGFmdGVyIGFuaW1hdGlvbnMgb3ZlclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNBZnRlck9wZW4uZW1pdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNBZnRlckNsb3NlLmVtaXQoY2xvc2VSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBTaG93L2hpZGUgc2Nyb2xsYmFyIHdoZW4gYW5pbWF0aW9uIGlzIG92ZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VCb2R5T3ZlcmZsb3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDaGFuZ2UgbWNWaXNpYmxlIGZyb20gaW5zaWRlXG4gICAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmxlRnJvbUluc2lkZSh2aXNpYmxlOiBib29sZWFuLCBjbG9zZVJlc3VsdD86IFIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgbWNWaXNpYmxlIHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IHZpc2libGU7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVWaXNpYmxlU3RhdGVDaGFuZ2UodmlzaWJsZSwgdHJ1ZSwgY2xvc2VSZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlQW5pbWF0aW9uU3RhdGUoc3RhdGU6IEFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tBbmltYXRpb25DbGFzc01hcCA9IHtcbiAgICAgICAgICAgICAgICBbYGZhZGUtJHtzdGF0ZX1gXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBbYGZhZGUtJHtzdGF0ZX0tYWN0aXZlYF06IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSB7XG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgW2B6b29tLSR7c3RhdGV9LWFjdGl2ZWBdOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5tYXNrQW5pbWF0aW9uQ2xhc3NNYXAgPSB0aGlzLm1vZGFsQW5pbWF0aW9uQ2xhc3NNYXAgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudENvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYW5pbWF0ZVRvKGlzVmlzaWJsZTogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGxhc3Rlc3QgY2xpY2sgcG9zaXRpb24gd2hlbiBzaG93cyB1cFxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAvLyBbTk9URV0gVXNpbmcgdGltZW91dCBkdWUgdG8gdGhlIGRvY3VtZW50LmNsaWNrIGV2ZW50IGlzIGZpcmVkIGxhdGVyIHRoYW4gdmlzaWJsZSBjaGFuZ2UsXG4gICAgICAgICAgICAvLyBzbyBpZiBub3QgcG9zdHBvbmVkIHRvIG5leHQgZXZlbnQtbG9vcCwgd2UgY2FuJ3QgZ2V0IHRoZSBsYXN0ZXN0IGNsaWNrIHBvc2l0aW9uXG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVRyYW5zZm9ybU9yaWdpbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlQW5pbWF0aW9uU3RhdGUoaXNWaXNpYmxlID8gJ2VudGVyJyA6ICdsZWF2ZScpO1xuXG4gICAgICAgIC8vIFJldHVybiB3aGVuIGFuaW1hdGlvbiBpcyBvdmVyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VBbmltYXRpb25TdGF0ZShudWxsKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgTU9EQUxfQU5JTUFURV9EVVJBVElPTikpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9ybWF0TW9kYWxCdXR0b25zKGJ1dHRvbnM6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSk6IElNb2RhbEJ1dHRvbk9wdGlvbnM8VD5bXSB7XG4gICAgICAgIHJldHVybiBidXR0b25zLm1hcCgoYnV0dG9uKSA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLmJ1dHRvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tcG9uZW50IGR5bmFtaWNhbGx5IGJ1dCBub3QgYXR0YWNoIHRvIGFueSBWaWV3XG4gICAgICogKHRoaXMgYWN0aW9uIHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBib2R5Q29udGFpbmVyIGlzIHJlYWR5KVxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgQ29tcG9uZW50IGNsYXNzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVEeW5hbWljQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxUPikge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgY2hpbGRJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWNNb2RhbFJlZiwgdXNlVmFsdWU6IHRoaXN9XSxcbiAgICAgICAgICAgIHBhcmVudDogdGhpcy52aWV3Q29udGFpbmVyLmluamVjdG9yXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGVudENvbXBvbmVudFJlZiA9IGZhY3RvcnkuY3JlYXRlKGNoaWxkSW5qZWN0b3IpO1xuXG4gICAgICAgIGlmICh0aGlzLm1jQ29tcG9uZW50UGFyYW1zKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudENvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5tY0NvbXBvbmVudFBhcmFtcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyB0aGUgZmlyc3QgY2hhbmdlIGRldGVjdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAvLyAob3Igd2UgZG8gZGV0ZWN0aW9uIGF0IG5nQWZ0ZXJWaWV3SW5pdCwgbXVsdGktY2hhbmdlcyBlcnJvciB3aWxsIGJlIHRocm93bilcbiAgICAgICAgdGhpcy5jb250ZW50Q29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdHJhbnNmb3JtLW9yaWdpbiB0byB0aGUgbGFzdCBjbGljayBwb3NpdGlvbiBvbiBkb2N1bWVudFxuICAgIHByaXZhdGUgdXBkYXRlVHJhbnNmb3JtT3JpZ2luKCkge1xuICAgICAgICBjb25zdCBtb2RhbEVsZW1lbnQgPSB0aGlzLm1vZGFsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IE1vZGFsVXRpbC5nZXRMYXN0Q2xpY2tQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmIChsYXN0UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3JpZ2luID0gYCR7bGFzdFBvc2l0aW9uLnggLSBtb2RhbEVsZW1lbnQub2Zmc2V0TGVmdH1weCAke2xhc3RQb3NpdGlvbi55IC0gbW9kYWxFbGVtZW50Lm9mZnNldFRvcH1weCAwcHhgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZSBjYXJlIG9mIHRoZSBib2R5J3Mgb3ZlcmZsb3cgdG8gZGVjaWRlIHRoZSBleGlzdGVuc2Ugb2Ygc2Nyb2xsYmFyXG4gICAgICogQHBhcmFtIHBsdXNOdW0gVGhlIG51bWJlciB0aGF0IHRoZSBvcGVuTW9kYWxzLmxlbmd0aCB3aWxsIGluY3JlYXNlIHNvb25cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUJvZHlPdmVyZmxvdyhwbHVzTnVtOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGNvbnN0IG9wZW5Nb2RhbHMgPSB0aGlzLm1vZGFsQ29udHJvbC5vcGVuTW9kYWxzO1xuXG4gICAgICAgIGlmIChvcGVuTW9kYWxzLmxlbmd0aCArIHBsdXNOdW0gPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmRvY3VtZW50LmJvZHksICdvdmVyZmxvdycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gaXNQcm9taXNlKG9iajoge30gfCB2b2lkKTogYm9vbGVhbiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICAgIHJldHVybiAhIW9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIChvYmogYXMgUHJvbWlzZTx7fT4pLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIChvYmogYXMgUHJvbWlzZTx7fT4pLmNhdGNoID09PSAnZnVuY3Rpb24nO1xufVxuIl19
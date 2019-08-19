/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Injectable, Optional, SkipSelf, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Inject, Injector, Input, Output, Renderer2, TemplateRef, Type, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation, Pipe, Directive, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { __extends, __assign } from 'tslib';
import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, CommonModule } from '@angular/common';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { ComponentPortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators';
import { A11yModule } from '@angular/cdk/a11y';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McModalControlService = /** @class */ (function () {
    function McModalControlService(parentService) {
        this.parentService = parentService;
        // @ts-ignore
        this.rootOpenModals = this.parentService ? null : [];
        // @ts-ignore
        this.rootAfterAllClose = this.parentService ? null : new Subject();
        // @ts-ignore
        this.rootRegisteredMetaMap = this.parentService ? null : new Map();
    }
    Object.defineProperty(McModalControlService.prototype, "afterAllClose", {
        // Track singleton afterAllClose through over the injection tree
        get: 
        // Track singleton afterAllClose through over the injection tree
        /**
         * @return {?}
         */
        function () {
            return this.parentService ? this.parentService.afterAllClose : (/** @type {?} */ (this.rootAfterAllClose));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalControlService.prototype, "openModals", {
        // Track singleton openModals array through over the injection tree
        get: 
        // Track singleton openModals array through over the injection tree
        /**
         * @return {?}
         */
        function () {
            return this.parentService ? this.parentService.openModals : (/** @type {?} */ (this.rootOpenModals));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalControlService.prototype, "registeredMetaMap", {
        // Registered modal for later usage
        get: 
        // Registered modal for later usage
        /**
         * @private
         * @return {?}
         */
        function () {
            return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
        },
        enumerable: true,
        configurable: true
    });
    // Register a modal to listen its open/close
    // Register a modal to listen its open/close
    /**
     * @param {?} modalRef
     * @return {?}
     */
    McModalControlService.prototype.registerModal = 
    // Register a modal to listen its open/close
    /**
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        var _this = this;
        if (!this.hasRegistered(modalRef)) {
            /** @type {?} */
            var afterOpenSubscription = modalRef.afterOpen.subscribe((/**
             * @return {?}
             */
            function () { return _this.openModals.push(modalRef); }));
            /** @type {?} */
            var afterCloseSubscription = modalRef.afterClose.subscribe((/**
             * @return {?}
             */
            function () { return _this.removeOpenModal(modalRef); }));
            this.registeredMetaMap.set(modalRef, { modalRef: modalRef, afterOpenSubscription: afterOpenSubscription, afterCloseSubscription: afterCloseSubscription });
        }
    };
    /**
     * @param {?} modalRef
     * @return {?}
     */
    McModalControlService.prototype.hasRegistered = /**
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        return this.registeredMetaMap.has(modalRef);
    };
    // Close all registered opened modals
    // Close all registered opened modals
    /**
     * @return {?}
     */
    McModalControlService.prototype.closeAll = 
    // Close all registered opened modals
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = this.openModals.length;
        while (i--) {
            this.openModals[i].close();
        }
    };
    /**
     * @private
     * @param {?} modalRef
     * @return {?}
     */
    McModalControlService.prototype.removeOpenModal = /**
     * @private
     * @param {?} modalRef
     * @return {?}
     */
    function (modalRef) {
        /** @type {?} */
        var index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this.afterAllClose.next();
            }
        }
    };
    McModalControlService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    McModalControlService.ctorParameters = function () { return [
        { type: McModalControlService, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return McModalControlService;
}());

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
var  /**
 * API class that public to users to handle the modal instance.
 * McModalRef is aim to avoid accessing to the modal instance directly by users.
 * @abstract
 * @template T, R
 */
McModalRef = /** @class */ (function () {
    function McModalRef() {
    }
    return McModalRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ModalUtil = /** @class */ (function () {
    function ModalUtil(document) {
        this.document = document;
        this.lastPosition = { x: -1, y: -1 };
        this.listenDocumentClick();
    }
    /**
     * @return {?}
     */
    ModalUtil.prototype.getLastClickPosition = /**
     * @return {?}
     */
    function () {
        return this.lastPosition;
    };
    /**
     * @return {?}
     */
    ModalUtil.prototype.listenDocumentClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.document.addEventListener('click', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.lastPosition = { x: event.clientX, y: event.clientY };
        }));
    };
    return ModalUtil;
}());
var ModalUtil$1 = new ModalUtil(document);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Duration when perform animations (ms)
/** @type {?} */
var MODAL_ANIMATE_DURATION = 200;
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
        // tslint:disable-next-line:no-any
        _this.mcModalType = 'default';
        _this._mcVisible = false;
        _this.mcVisibleChange = new EventEmitter();
        _this.mcZIndex = 1000;
        _this.mcWidth = 480;
        _this.mcCloseByESC = true;
        _this._mcClosable = true;
        _this._mcMask = true;
        _this._mcMaskClosable = true;
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
            this.createDynamicComponent((/** @type {?} */ (this.mcComponent)));
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
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        for (var _i = 0, _a = this.autoFocusedButtons.toArray(); _i < _a.length; _i++) {
            var autoFocusedButton = _a[_i];
            if (autoFocusedButton.nativeElement.autofocus) {
                ((/** @type {?} */ (autoFocusedButton.nativeElement))).focus();
                break;
            }
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
    // tslint:disable-next-line
    // tslint:disable-next-line
    /**
     * @param {?} type
     * @return {?}
     */
    McModalComponent.prototype.isModalType = 
    // tslint:disable-next-line
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
    // tslint:disable-next-line
    // AoT
    // tslint:disable-next-line
    /**
     * @param {?} type
     * @return {?}
     */
    McModalComponent.prototype.onClickOkCancel = 
    // AoT
    // tslint:disable-next-line
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
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    // tslint:disable-next-line
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    // tslint:disable-next-line
    /**
     * @param {?} options
     * @param {?} prop
     * @return {?}
     */
    McModalComponent.prototype.getButtonCallableProp = 
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    // tslint:disable-next-line
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
    // tslint:disable-next-line
    // On mcFooter's modal button click
    // AoT
    // tslint:disable-next-line
    /**
     * @param {?} button
     * @return {?}
     */
    McModalComponent.prototype.onButtonClick = 
    // On mcFooter's modal button click
    // AoT
    // tslint:disable-next-line
    /**
     * @param {?} button
     * @return {?}
     */
    function (button) {
        // Call onClick directly
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
            this.maskAnimationClassMap = (_a = {}, _a["fade-" + state] = true, _a["fade-" + state + "-active"] = true, _a);
            this.modalAnimationClassMap = (_b = {}, _b["zoom-" + state] = true, _b["zoom-" + state + "-active"] = true, _b);
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
            parent: this.viewContainer.parentInjector
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
        var lastPosition = ModalUtil$1.getLastClickPosition();
        if (lastPosition) {
            // tslint:disable-next-line
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
            // tslint:disable-next-line
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        }
        else {
            this.renderer.removeStyle(this.document.body, 'overflow');
        }
    };
    McModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-modal',
                    template: "<ng-template #tplOriginContent><ng-content></ng-content></ng-template><div><div *ngIf=\"mcMask\" class=\"mc-modal-mask\" [ngClass]=\"maskAnimationClassMap\" [class.mc-modal-mask-hidden]=\"hidden\" [ngStyle]=\"mcMaskStyle\" [style.zIndex]=\"mcZIndex\"></div><div (click)=\"onClickMask($event)\" class=\"mc-modal-wrap {{ mcWrapClassName }}\" [style.zIndex]=\"mcZIndex\" [style.display]=\"hidden ? 'none' : ''\" tabindex=\"-1\" role=\"dialog\"><div #modalContainer class=\"mc-modal {{ mcClassName }}\" [ngClass]=\"modalAnimationClassMap\" [ngStyle]=\"mcStyle\" [style.width]=\"mcWidth | toCssUnit\" [style.transform-origin]=\"transformOrigin\" role=\"document\"><div class=\"mc-modal-content\" cdkTrapFocus><button *ngIf=\"mcClosable\" (click)=\"onClickCloseBtn()\" class=\"mc-modal-close\" aria-label=\"Close\"><span class=\"mc-modal-close-x\"><i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i></span></button><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isModalType('default')\" [ngTemplateOutlet]=\"tplContentDefault\"></ng-container><ng-container *ngSwitchCase=\"isModalType('confirm')\" [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container><ng-container *ngSwitchCase=\"isModalType('custom')\" [ngTemplateOutlet]=\"tplContentCustom\"></ng-container></ng-container></div></div></div></div><ng-template #tplContentCustom><ng-container #bodyContainer></ng-container></ng-template><ng-template #tplContentDefault><div *ngIf=\"mcTitle\" class=\"mc-modal-header\"><div class=\"mc-modal-title\"><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"mcTitle\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\"><div [innerHTML]=\"mcTitle\"></div></ng-container></ng-container></div></div><div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\"><ng-container #bodyContainer><ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\"><div [innerHTML]=\"mcContent\"></div></ng-container><ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container></ng-container></ng-container></div><div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\"><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\"><div [innerHTML]=\"mcFooter\"></div></ng-container><ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\"><button *ngFor=\"let button of mcFooter\" mc-button #autoFocusedButton [attr.autofocus]=\"button.autoFocus\" [hidden]=\"!getButtonCallableProp(button, 'show')\" [disabled]=\"getButtonCallableProp(button, 'disabled')\" (click)=\"onButtonClick(button)\" [color]=\"button.type\">{{ button.label }}</button></ng-container><ng-container *ngSwitchDefault><button #autoFocusedButton [attr.autofocus]=\"true\" *ngIf=\"mcOkText !== null\" mc-button color=\"primary\" (click)=\"onClickOkCancel('ok')\">{{ okText }}</button> <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">{{ cancelText }}</button></ng-container></ng-container></div></ng-template><ng-template #tplContentConfirm><div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\"><div class=\"mc-confirm-body-wrapper\"><div class=\"mc-confirm-body\"><div class=\"mc-confirm-content\"><ng-container #bodyContainer><ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\"><div [innerHTML]=\"mcContent\"></div></ng-container><ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container></ng-container></ng-container></div></div></div></div><div class=\"mc-confirm-btns\"><button mc-button #autoFocusedButton [color]=\"mcOkType\" [attr.autofocus]=\"true\" *ngIf=\"mcOkText !== ''\" (click)=\"onClickOkCancel('ok')\">{{ okText }}</button> <button mc-button color=\"second\" *ngIf=\"mcCancelText!==''\" (click)=\"onClickOkCancel('cancel')\">{{ cancelText }}</button></div></ng-template>",
                    styles: ["@keyframes mcFadeIn{0%{opacity:0}100%{opacity:1}}@keyframes mcFadeOut{0%{opacity:1}100%{opacity:0}}@keyframes mcZoomIn{0%{opacity:0;transform:translate(0,-25%)}100%{opacity:1;transform:scale(1)}}@keyframes mcZoomOut{0%{transform:scale(1)}100%{opacity:0;transform:translate(0,-30%)}}.fade-appear,.fade-enter{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-leave{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-appear.fade-appear-active,.fade-enter.fade-enter-active{animation-name:mcFadeIn;animation-play-state:running}.fade-leave.fade-leave-active{animation-name:mcFadeOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{opacity:0;animation-timing-function:ease-out}.className-leave{animation-timing-function:ease-out}.zoom-appear,.zoom-enter{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-leave{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-appear.zoom-appear-active,.zoom-enter.zoom-enter-active{animation-name:mcZoomIn;animation-play-state:running}.zoom-leave.zoom-leave-active{animation-name:mcZoomOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{transform:translate(0,-25%);animation-timing-function:cubic-bezier(.075,.82,.165,1)}.className-leave{transform:translate(0,0);animation-timing-function:cubic-bezier(.785,.135,.15,.86)}.mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-close{display:none}.mc-confirm .mc-modal-body{padding:24px}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:after,.mc-confirm-body-wrapper:before{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px 16px 16px}.mc-modal{box-sizing:border-box;position:relative;top:48px;width:auto;margin:0 auto;padding:0 0 24px 0;list-style:none}.mc-modal.zoom-appear,.mc-modal.zoom-enter{animation-duration:.3s;transform:none;opacity:0}.mc-modal-wrap{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;overflow:auto;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;background-clip:padding-box;background-color:#fff}.mc-modal-close{position:absolute;z-index:10;top:0;right:0;padding:0;border:0;outline:0;cursor:pointer;background:0 0}.mc-modal-close .mc-modal-close-x{display:block;vertical-align:baseline;text-align:center;width:56px;height:56px;line-height:56px}.mc-modal-header{padding:14px 16px;display:block;border-radius:4px 4px 0 0}.mc-modal-body{display:block;padding:16px 24px 24px 24px;max-height:calc(100vh - 260px);word-wrap:break-word;overflow-y:auto}.mc-modal-footer{display:block;padding:16px 16px;border-radius:0 0 4px 4px;text-align:right}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%;background-color:rgba(0,0,0,.5)}.mc-modal-mask.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '(keydown)': 'onKeyDown($event)'
                    }
                },] },
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
var CssUnitPipe = /** @class */ (function () {
    function CssUnitPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    CssUnitPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} defaultUnit
     * @return {?}
     */
    function (value, defaultUnit) {
        if (defaultUnit === void 0) { defaultUnit = 'px'; }
        /** @type {?} */
        var formatted = +value;
        return isNaN(formatted) ? "" + value : "" + formatted + defaultUnit;
    };
    CssUnitPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'toCssUnit'
                },] },
    ];
    return CssUnitPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McModalTitle = /** @class */ (function () {
    function McModalTitle() {
    }
    McModalTitle.decorators = [
        { type: Directive, args: [{
                    selector: "[mc-modal-title], mc-modal-title, [mcModalTitle]",
                    host: {
                        class: 'mc-modal-header mc-modal-title'
                    }
                },] },
    ];
    return McModalTitle;
}());
var McModalBody = /** @class */ (function () {
    function McModalBody() {
    }
    McModalBody.decorators = [
        { type: Directive, args: [{
                    selector: "[mc-modal-body], mc-modal-body, [mcModalBody]",
                    host: {
                        class: 'mc-modal-body'
                    }
                },] },
    ];
    return McModalBody;
}());
var McModalFooter = /** @class */ (function () {
    function McModalFooter() {
    }
    McModalFooter.decorators = [
        { type: Directive, args: [{
                    selector: "[mc-modal-footer], mc-modal-footer, [mcModalFooter]",
                    host: {
                        class: 'mc-modal-footer'
                    }
                },] },
    ];
    return McModalFooter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// A builder used for managing service creating modals
var 
// A builder used for managing service creating modals
ModalBuilderForService = /** @class */ (function () {
    function ModalBuilderForService(overlay, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
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
        function () { return _this.destroyModal(); }));
        this.overlayRef.keydownEvents()
            // @ts-ignore
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.keyCode === ESCAPE && options.mcCloseByESC;
        })))
            .subscribe((/**
         * @return {?}
         */
        function () { return (/** @type {?} */ (_this.modalRef)).instance.close(); }));
    }
    /**
     * @return {?}
     */
    ModalBuilderForService.prototype.getInstance = /**
     * @return {?}
     */
    function () {
        return this.modalRef && this.modalRef.instance;
    };
    /**
     * @return {?}
     */
    ModalBuilderForService.prototype.destroyModal = /**
     * @return {?}
     */
    function () {
        if (this.modalRef) {
            this.overlayRef.dispose();
            this.modalRef = null;
        }
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    ModalBuilderForService.prototype.changeProps = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (this.modalRef) {
            // here not limit user's inputs at runtime
            Object.assign(this.modalRef.instance, options);
        }
    };
    // Create component to ApplicationRef
    // Create component to ApplicationRef
    /**
     * @private
     * @return {?}
     */
    ModalBuilderForService.prototype.createModal = 
    // Create component to ApplicationRef
    /**
     * @private
     * @return {?}
     */
    function () {
        this.overlayRef = this.overlay.create();
        this.modalRef = this.overlayRef.attach(new ComponentPortal(McModalComponent));
    };
    return ModalBuilderForService;
}());
var McModalService = /** @class */ (function () {
    function McModalService(overlay, modalControl) {
        this.overlay = overlay;
        this.modalControl = modalControl;
    }
    Object.defineProperty(McModalService.prototype, "openModals", {
        // Track of the current close modals (we assume invisible is close this time)
        get: 
        // Track of the current close modals (we assume invisible is close this time)
        /**
         * @return {?}
         */
        function () {
            return this.modalControl.openModals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalService.prototype, "afterAllClose", {
        get: /**
         * @return {?}
         */
        function () {
            return this.modalControl.afterAllClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // Closes all of the currently-open dialogs
    // Closes all of the currently-open dialogs
    /**
     * @return {?}
     */
    McModalService.prototype.closeAll = 
    // Closes all of the currently-open dialogs
    /**
     * @return {?}
     */
    function () {
        this.modalControl.closeAll();
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    McModalService.prototype.create = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        if (typeof options.mcOnCancel !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnCancel = (/**
             * @return {?}
             */
            function () { });
        }
        if (!('mcCloseByESC' in options)) {
            options.mcCloseByESC = true;
        }
        if (!('mcWidth' in options)) {
            // tslint:disable-next-line
            options.mcWidth = 480;
        }
        return (/** @type {?} */ (new ModalBuilderForService(this.overlay, options).getInstance()));
    };
    /**
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    McModalService.prototype.confirm = /**
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    function (options, confirmType) {
        if (options === void 0) { options = {}; }
        if (confirmType === void 0) { confirmType = 'confirm'; }
        if ('mcFooter' in options) {
            console.warn("The Confirm-Modal doesn't support \"mcFooter\", this property will be ignored.");
        }
        // NOTE: only support function currently by calling confirm()
        if (typeof options.mcOnOk !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnOk = (/**
             * @return {?}
             */
            function () { });
        }
        options.mcModalType = 'confirm';
        options.mcClassName = "mc-confirm mc-confirm-" + confirmType + " " + (options.mcClassName || '');
        options.mcMaskClosable = false;
        return this.create(options);
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    McModalService.prototype.open = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        options.mcModalType = 'custom';
        return this.create(options);
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    McModalService.prototype.success = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'success');
    };
    /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    McModalService.prototype.delete = /**
     * @template T
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'warn');
    };
    /**
     * @private
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    McModalService.prototype.simpleConfirm = /**
     * @private
     * @template T
     * @param {?=} options
     * @param {?=} confirmType
     * @return {?}
     */
    function (options, confirmType) {
        if (options === void 0) { options = {}; }
        // Remove the Cancel button if the user not specify a Cancel button
        if (!('mcCancelText' in options)) {
            // @ts-ignore
            options.mcCancelText = null;
        }
        return this.confirm(options, confirmType);
    };
    McModalService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    McModalService.ctorParameters = function () { return [
        { type: Overlay },
        { type: McModalControlService }
    ]; };
    return McModalService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McModalModule = /** @class */ (function () {
    function McModalModule() {
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
                        CssUnitPipe
                    ],
                    entryComponents: [McModalComponent],
                    providers: [McModalControlService, McModalService]
                },] },
    ];
    return McModalModule;
}());

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

export { McModalComponent, McModalRef, McModalModule, McModalService, CssUnitPipe as ɵe28, McModalControlService as ɵa28, McModalBody as ɵc28, McModalFooter as ɵd28, McModalTitle as ɵb28 };
//# sourceMappingURL=modal.es5.js.map

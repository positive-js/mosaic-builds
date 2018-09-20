/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/cdk/overlay'), require('@ptsecurity/mosaic/core'), require('rxjs/operators'), require('@ptsecurity/cdk/portal'), require('@ptsecurity/mosaic/button'), require('@ptsecurity/mosaic/icon')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/modal', ['exports', '@angular/core', 'rxjs', '@angular/common', '@ptsecurity/cdk/keycodes', '@ptsecurity/cdk/overlay', '@ptsecurity/mosaic/core', 'rxjs/operators', '@ptsecurity/cdk/portal', '@ptsecurity/mosaic/button', '@ptsecurity/mosaic/icon'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.modal = {}),global.ng.core,global.rxjs,global.ng.common,global.ng.cdk.keycodes,global.ng.cdk.overlay,global.ng.mosaic.core,global.rxjs.operators,global.ng.cdk.portal,global.ng.mosaic.button,global.ng.mosaic.icon));
}(this, (function (exports,core,rxjs,common,keycodes,overlay,core$1,operators,portal,button,icon) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var McModalControlService = /** @class */ (function () {
    function McModalControlService(parentService) {
        this.parentService = parentService;
        // @ts-ignore
        this.rootOpenModals = this.parentService ? null : [];
        // @ts-ignore
        this.rootAfterAllClose = this.parentService ? null : new rxjs.Subject();
        // @ts-ignore
        this.rootRegisteredMetaMap = this.parentService ? null : new Map();
    }
    Object.defineProperty(McModalControlService.prototype, "afterAllClose", {
        // Track singleton afterAllClose through over the injection tree
        get: function () {
            return this.parentService ? this.parentService.afterAllClose : this.rootAfterAllClose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalControlService.prototype, "openModals", {
        // Track singleton openModals array through over the injection tree
        get: function () {
            return this.parentService ? this.parentService.openModals : this.rootOpenModals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalControlService.prototype, "registeredMetaMap", {
        // Registered modal for later usage
        get: function () {
            return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
        },
        enumerable: true,
        configurable: true
    });
    // Register a modal to listen its open/close
    McModalControlService.prototype.registerModal = function (modalRef) {
        var _this = this;
        if (!this.hasRegistered(modalRef)) {
            var afterOpenSubscription = modalRef.afterOpen.subscribe(function () { return _this.openModals.push(modalRef); });
            var afterCloseSubscription = modalRef.afterClose.subscribe(function () { return _this.removeOpenModal(modalRef); });
            this.registeredMetaMap.set(modalRef, { modalRef: modalRef, afterOpenSubscription: afterOpenSubscription, afterCloseSubscription: afterCloseSubscription });
        }
    };
    McModalControlService.prototype.hasRegistered = function (modalRef) {
        return this.registeredMetaMap.has(modalRef);
    };
    // Close all registered opened modals
    McModalControlService.prototype.closeAll = function () {
        var i = this.openModals.length;
        while (i--) {
            this.openModals[i].close();
        }
    };
    McModalControlService.prototype.removeOpenModal = function (modalRef) {
        var index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this.afterAllClose.next();
            }
        }
    };
    McModalControlService = __decorate([
        core.Injectable(),
        __param(0, core.Optional()), __param(0, core.SkipSelf()),
        __metadata("design:paramtypes", [McModalControlService])
    ], McModalControlService);
    return McModalControlService;
}());

/**
 * API class that public to users to handle the modal instance.
 * McModalRef is aim to avoid accessing to the modal instance directly by users.
 */
var McModalRef = /** @class */ (function () {
    function McModalRef() {
    }
    return McModalRef;
}());

var ModalUtil = /** @class */ (function () {
    function ModalUtil(document) {
        this.document = document;
        this.lastPosition = { x: -1, y: -1 };
        this.listenDocumentClick();
    }
    ModalUtil.prototype.getLastClickPosition = function () {
        return this.lastPosition;
    };
    ModalUtil.prototype.listenDocumentClick = function () {
        var _this = this;
        this.document.addEventListener('click', function (event) {
            _this.lastPosition = { x: event.clientX, y: event.clientY };
        });
    };
    return ModalUtil;
}());
var ModalUtil$1 = new ModalUtil(document);

// Duration when perform animations (ms)
var MODAL_ANIMATE_DURATION = 200;
var McModalComponent = /** @class */ (function (_super) {
    __extends(McModalComponent, _super);
    function McModalComponent(overlay$$1, renderer, cfr, elementRef, viewContainer, mcMeasureScrollbarService, modalControl, changeDetector, document) {
        var _this = _super.call(this) || this;
        _this.overlay = overlay$$1;
        _this.renderer = renderer;
        _this.cfr = cfr;
        _this.elementRef = elementRef;
        _this.viewContainer = viewContainer;
        _this.mcMeasureScrollbarService = mcMeasureScrollbarService;
        _this.modalControl = modalControl;
        _this.changeDetector = changeDetector;
        _this.document = document;
        // tslint:disable-next-line:no-any
        _this.mcModalType = 'default';
        _this._mcVisible = false;
        _this.mcVisibleChange = new core.EventEmitter();
        _this.mcZIndex = 1000;
        _this.mcWidth = 480;
        _this.mcCloseByESC = true;
        _this._mcClosable = true;
        _this._mcMask = true;
        _this._mcMaskClosable = true;
        // Trigger when modal open(visible) after animations
        _this.mcAfterOpen = new core.EventEmitter();
        // Trigger when modal leave-animation over
        _this.mcAfterClose = new core.EventEmitter();
        _this.mcOkType = 'primary';
        _this._mcOkLoading = false;
        _this.mcOnOk = new core.EventEmitter();
        _this._mcCancelLoading = false;
        _this.mcOnCancel = new core.EventEmitter();
        // The origin point that animation based on
        _this.transformOrigin = '0px 0px 0px';
        _this.mcGetContainer = function () { return _this.overlay.create(); };
        return _this;
    }
    Object.defineProperty(McModalComponent.prototype, "mcVisible", {
        get: function () { return this._mcVisible; },
        set: function (value) { this._mcVisible = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcClosable", {
        get: function () { return this._mcClosable; },
        set: function (value) { this._mcClosable = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcMask", {
        get: function () { return this._mcMask; },
        set: function (value) { this._mcMask = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcMaskClosable", {
        get: function () { return this._mcMaskClosable; },
        set: function (value) { this._mcMaskClosable = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcOkLoading", {
        get: function () { return this._mcOkLoading; },
        set: function (value) { this._mcOkLoading = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "mcCancelLoading", {
        get: function () { return this._mcCancelLoading; },
        set: function (value) { this._mcCancelLoading = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "afterOpen", {
        // Observable alias for mcAfterOpen
        get: function () {
            return this.mcAfterOpen.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "afterClose", {
        // Observable alias for mcAfterClose
        get: function () {
            return this.mcAfterClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "okText", {
        get: function () {
            return this.mcOkText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "cancelText", {
        get: function () {
            return this.mcCancelText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalComponent.prototype, "hidden", {
        // Indicate whether this dialog should hidden
        get: function () {
            return !this.mcVisible && !this.animationState;
        },
        enumerable: true,
        configurable: true
    });
    McModalComponent.prototype.ngOnInit = function () {
        // Create component along without View
        if (this.isComponent(this.mcContent)) {
            this.createDynamicComponent(this.mcContent);
        }
        // Setup default button options
        if (this.isModalButtons(this.mcFooter)) {
            this.mcFooter = this.formatModalButtons(this.mcFooter);
        }
        // Place the modal dom to elsewhere
        this.container = typeof this.mcGetContainer === 'function' ? this.mcGetContainer() : this.mcGetContainer;
        if (this.container instanceof HTMLElement) {
            this.container.appendChild(this.elementRef.nativeElement);
        }
        else if (this.container instanceof overlay.OverlayRef) {
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
    McModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.mcVisible) {
            // Do not trigger animation while initializing
            this.handleVisibleStateChange(this.mcVisible, !changes.mcVisible.firstChange);
        }
    };
    McModalComponent.prototype.ngAfterViewInit = function () {
        // If using Component, it is the time to attach View while bodyContainer is ready
        if (this.contentComponentRef) {
            this.bodyContainer.insert(this.contentComponentRef.hostView);
        }
        if (this.autoFocusButtonOk) {
            this.autoFocusButtonOk.nativeElement.focus();
        }
    };
    McModalComponent.prototype.ngOnDestroy = function () {
        if (this.container instanceof overlay.OverlayRef) {
            this.container.dispose();
        }
    };
    McModalComponent.prototype.open = function () {
        this.changeVisibleFromInside(true);
    };
    McModalComponent.prototype.close = function (result) {
        this.changeVisibleFromInside(false, result);
    };
    // Destroy equals Close
    McModalComponent.prototype.destroy = function (result) {
        this.close(result);
    };
    McModalComponent.prototype.triggerOk = function () {
        this.onClickOkCancel('ok');
    };
    McModalComponent.prototype.triggerCancel = function () {
        this.onClickOkCancel('cancel');
    };
    McModalComponent.prototype.getInstance = function () {
        return this;
    };
    McModalComponent.prototype.getContentComponentRef = function () {
        return this.contentComponentRef;
    };
    McModalComponent.prototype.getContentComponent = function () {
        return this.contentComponentRef && this.contentComponentRef.instance;
    };
    McModalComponent.prototype.getElement = function () {
        return this.elementRef && this.elementRef.nativeElement;
    };
    McModalComponent.prototype.onClickMask = function ($event) {
        if (this.mcMask &&
            this.mcMaskClosable &&
            $event.target.classList.contains('mc-modal-wrap') &&
            this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    };
    // tslint:disable-next-line
    McModalComponent.prototype.isModalType = function (type) {
        return this.mcModalType === type;
    };
    McModalComponent.prototype.onKeyDown = function (event) {
        if (event.keyCode === keycodes.ESCAPE && this.container && (this.container instanceof overlay.OverlayRef)) {
            this.close();
            event.preventDefault();
        }
    };
    // AoT
    McModalComponent.prototype.onClickCloseBtn = function () {
        if (this.mcVisible) {
            this.onClickOkCancel('cancel');
        }
    };
    // AoT
    // tslint:disable-next-line
    McModalComponent.prototype.onClickOkCancel = function (type) {
        var _this = this;
        var trigger = { ok: this.mcOnOk, cancel: this.mcOnCancel }[type];
        var loadingKey = { ok: 'mcOkLoading', cancel: 'mcCancelLoading' }[type];
        if (trigger instanceof core.EventEmitter) {
            trigger.emit(this.getContentComponent());
        }
        else if (typeof trigger === 'function') {
            var result = trigger(this.getContentComponent());
            // Users can return "false" to prevent closing by default
            var caseClose_1 = function (doClose) { return (doClose !== false) && _this.close(doClose); };
            if (isPromise(result)) {
                this[loadingKey] = true;
                var handleThen = function (doClose) {
                    _this[loadingKey] = false;
                    caseClose_1(doClose);
                };
                result.then(handleThen).catch(handleThen);
            }
            else {
                caseClose_1(result);
            }
        }
    };
    // AoT
    McModalComponent.prototype.isNonEmptyString = function (value) {
        return typeof value === 'string' && value !== '';
    };
    // AoT
    McModalComponent.prototype.isTemplateRef = function (value) {
        return value instanceof core.TemplateRef;
    };
    // AoT
    McModalComponent.prototype.isComponent = function (value) {
        return value instanceof core.Type;
    };
    // AoT
    McModalComponent.prototype.isModalButtons = function (value) {
        return Array.isArray(value) && value.length > 0;
    };
    // Do rest things when visible state changed
    McModalComponent.prototype.handleVisibleStateChange = function (visible, animation, closeResult) {
        var _this = this;
        if (animation === void 0) { animation = true; }
        // Hide scrollbar at the first time when shown up
        if (visible) {
            this.changeBodyOverflow(1);
        }
        return Promise
            .resolve(animation && this.animateTo(visible))
            // Emit open/close event after animations over
            .then(function () {
            if (visible) {
                _this.mcAfterOpen.emit();
            }
            else {
                _this.mcAfterClose.emit(closeResult);
                // Show/hide scrollbar when animation is over
                _this.changeBodyOverflow();
            }
        });
    };
    // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
    // AoT
    // tslint:disable-next-line
    McModalComponent.prototype.getButtonCallableProp = function (options, prop) {
        var value = options[prop];
        var args = [];
        if (this.contentComponentRef) {
            args.push(this.contentComponentRef.instance);
        }
        return typeof value === 'function' ? value.apply(options, args) : value;
    };
    // On mcFooter's modal button click
    // AoT
    // tslint:disable-next-line
    McModalComponent.prototype.onButtonClick = function (button$$1) {
        // Call onClick directly
        var result = this.getButtonCallableProp(button$$1, 'onClick');
        if (isPromise(result)) {
            button$$1.loading = true;
            result.then(function () { return button$$1.loading = false; }).catch(function () { return button$$1.loading = false; });
        }
    };
    // Change mcVisible from inside
    McModalComponent.prototype.changeVisibleFromInside = function (visible, closeResult) {
        if (this.mcVisible !== visible) {
            // Change mcVisible value immediately
            this.mcVisible = visible;
            this.mcVisibleChange.emit(visible);
            return this.handleVisibleStateChange(visible, true, closeResult);
        }
        return Promise.resolve();
    };
    McModalComponent.prototype.changeAnimationState = function (state) {
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
    McModalComponent.prototype.animateTo = function (isVisible) {
        var _this = this;
        // Figure out the lastest click position when shows up
        if (isVisible) {
            // [NOTE] Using timeout due to the document.click event is fired later than visible change,
            // so if not postponed to next event-loop, we can't get the lastest click position
            window.setTimeout(function () { return _this.updateTransformOrigin(); });
        }
        this.changeAnimationState(isVisible ? 'enter' : 'leave');
        // Return when animation is over
        return new Promise(function (resolve) { return window.setTimeout(function () {
            _this.changeAnimationState(null);
            resolve();
        }, MODAL_ANIMATE_DURATION); });
    };
    McModalComponent.prototype.formatModalButtons = function (buttons) {
        return buttons.map(function (button$$1) {
            return __assign({
                type: 'default',
                size: 'default',
                autoLoading: true,
                show: true,
                loading: false,
                disabled: false
            }, button$$1);
        });
    };
    /**
     * Create a component dynamically but not attach to any View
     * (this action will be executed when bodyContainer is ready)
     * @param component Component class
     */
    McModalComponent.prototype.createDynamicComponent = function (component) {
        var factory = this.cfr.resolveComponentFactory(component);
        var childInjector = core.Injector.create({
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
    McModalComponent.prototype.updateTransformOrigin = function () {
        var modalElement = this.modalContainer.nativeElement;
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
    McModalComponent.prototype.changeBodyOverflow = function (plusNum) {
        if (plusNum === void 0) { plusNum = 0; }
        var openModals = this.modalControl.openModals;
        if (openModals.length + plusNum > 0) {
            // tslint:disable-next-line
            this.renderer.setStyle(this.document.body, 'padding-right', this.mcMeasureScrollbarService.scrollBarWidth + "px");
            this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
        }
        else {
            this.renderer.removeStyle(this.document.body, 'padding-right');
            this.renderer.removeStyle(this.document.body, 'overflow');
        }
    };
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcModalType", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcContent", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcComponentParams", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcFooter", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcVisible", null);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcVisibleChange", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McModalComponent.prototype, "mcZIndex", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcWidth", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcWrapClassName", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcClassName", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcStyle", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcTitle", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McModalComponent.prototype, "mcCloseByESC", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcClosable", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcMask", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcMaskClosable", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcMaskStyle", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcBodyStyle", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcAfterOpen", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcAfterClose", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcOkText", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcOkType", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcOkLoading", null);
    __decorate([
        core.Input(), core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcOnOk", void 0);
    __decorate([
        core.ViewChild('autoFocusButtonOk', { read: core.ElementRef }),
        __metadata("design:type", core.ElementRef)
    ], McModalComponent.prototype, "autoFocusButtonOk", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McModalComponent.prototype, "mcCancelText", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McModalComponent.prototype, "mcCancelLoading", null);
    __decorate([
        core.Input(), core.Output(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcOnCancel", void 0);
    __decorate([
        core.ViewChild('modalContainer'),
        __metadata("design:type", core.ElementRef)
    ], McModalComponent.prototype, "modalContainer", void 0);
    __decorate([
        core.ViewChild('bodyContainer', { read: core.ViewContainerRef }),
        __metadata("design:type", core.ViewContainerRef)
    ], McModalComponent.prototype, "bodyContainer", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McModalComponent.prototype, "mcGetContainer", void 0);
    McModalComponent = __decorate([
        core.Component({
            selector: 'mc-modal',
            template: "<ng-template #tplOriginContent><ng-content></ng-content></ng-template><div><div *ngIf=\"mcMask\" class=\"mc-modal-mask\" [ngClass]=\"maskAnimationClassMap\" [class.mc-modal-mask-hidden]=\"hidden\" [ngStyle]=\"mcMaskStyle\" [style.zIndex]=\"mcZIndex\"></div><div (click)=\"onClickMask($event)\" class=\"mc-modal-wrap {{ mcWrapClassName }}\" [style.zIndex]=\"mcZIndex\" [style.display]=\"hidden ? 'none' : ''\" tabindex=\"-1\" role=\"dialog\"><div #modalContainer class=\"mc-modal {{ mcClassName }}\" [ngClass]=\"modalAnimationClassMap\" [ngStyle]=\"mcStyle\" [style.width]=\"mcWidth | toCssUnit\" [style.transform-origin]=\"transformOrigin\" role=\"document\"><div class=\"mc-modal-content\"><button *ngIf=\"mcClosable\" (click)=\"onClickCloseBtn()\" class=\"mc-modal-close\" aria-label=\"Close\"><span class=\"mc-modal-close-x\"><i mc-icon=\"mc-close-L_16\" class=\"mc-closer__icon\"></i></span></button><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isModalType('default')\" [ngTemplateOutlet]=\"tplContentDefault\"></ng-container><ng-container *ngSwitchCase=\"isModalType('confirm')\" [ngTemplateOutlet]=\"tplContentConfirm\"></ng-container></ng-container></div></div></div></div><ng-template #tplContentDefault><div *ngIf=\"mcTitle\" class=\"mc-modal-header\"><div class=\"mc-modal-title\"><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcTitle)\" [ngTemplateOutlet]=\"mcTitle\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcTitle)\"><div [innerHTML]=\"mcTitle\"></div></ng-container></ng-container></div></div><div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\"><ng-container #bodyContainer><ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\"><div [innerHTML]=\"mcContent\"></div></ng-container><ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container></ng-container></ng-container></div><div *ngIf=\"mcFooter !== null\" class=\"mc-modal-footer\"><ng-container [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcFooter)\"><div [innerHTML]=\"mcFooter\"></div></ng-container><ng-container *ngSwitchCase=\"isModalButtons(mcFooter)\"><button *ngFor=\"let button of mcFooter\" mc-button [hidden]=\"!getButtonCallableProp(button, 'show')\" [disabled]=\"getButtonCallableProp(button, 'disabled')\" [color]=\"button.type\">{{ button.label }}</button></ng-container><ng-container *ngSwitchDefault><button *ngIf=\"mcOkText!==null\" mc-button color=\"primary\" (click)=\"onClickOkCancel('ok')\">{{ okText }}</button> <button *ngIf=\"mcCancelText!==null\" mc-button (click)=\"onClickOkCancel('cancel')\">{{ cancelText }}</button></ng-container></ng-container></div></ng-template><ng-template #tplContentConfirm><div class=\"mc-modal-body\" [ngStyle]=\"mcBodyStyle\"><div class=\"mc-confirm-body-wrapper\"><div class=\"mc-confirm-body\"><div class=\"mc-confirm-content\"><ng-container #bodyContainer><ng-container *ngIf=\"!isComponent(mcContent)\" [ngSwitch]=\"true\"><ng-container *ngSwitchCase=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container><ng-container *ngSwitchCase=\"isNonEmptyString(mcContent)\"><div [innerHTML]=\"mcContent\"></div></ng-container><ng-container *ngSwitchDefault [ngTemplateOutlet]=\"tplOriginContent\"></ng-container></ng-container></ng-container></div></div></div></div><div class=\"mc-confirm-btns\"><button mc-button [color]=\"mcOkType\" #autoFocusButtonOk *ngIf=\"mcOkText !== ''\" (click)=\"onClickOkCancel('ok')\">{{ okText }}</button> <button mc-button color=\"second\" *ngIf=\"mcCancelText!==''\" (click)=\"onClickOkCancel('cancel')\">{{ cancelText }}</button></div></ng-template>",
            styles: ["@keyframes mcFadeIn{0%{opacity:0}100%{opacity:1}}@keyframes mcFadeOut{0%{opacity:1}100%{opacity:0}}@keyframes mcZoomIn{0%{opacity:0;transform:translate(0,-25%)}100%{opacity:1;transform:scale(1)}}@keyframes mcZoomOut{0%{transform:scale(1)}100%{opacity:0;transform:translate(0,-30%)}}.fade-appear,.fade-enter{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-leave{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.fade-appear.fade-appear-active,.fade-enter.fade-enter-active{animation-name:mcFadeIn;animation-play-state:running}.fade-leave.fade-leave-active{animation-name:mcFadeOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{opacity:0;animation-timing-function:ease-out}.className-leave{animation-timing-function:ease-out}.zoom-appear,.zoom-enter{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-leave{animation-duration:.3s;animation-fill-mode:both;animation-play-state:paused}.zoom-appear.zoom-appear-active,.zoom-enter.zoom-enter-active{animation-name:mcZoomIn;animation-play-state:running}.zoom-leave.zoom-leave-active{animation-name:mcZoomOut;animation-play-state:running;pointer-events:none}.className-appear,.className-enter{transform:translate(0,-25%);animation-timing-function:cubic-bezier(.075,.82,.165,1)}.className-leave{transform:translate(0,0);animation-timing-function:cubic-bezier(.785,.135,.15,.86)}.mc-confirm .mc-modal-header{display:none}.mc-confirm .mc-modal-close{display:none}.mc-confirm .mc-modal-body{padding:24px}.mc-confirm-body-wrapper{zoom:1}.mc-confirm-body-wrapper:after,.mc-confirm-body-wrapper:before{content:\"\";display:table}.mc-confirm-body-wrapper:after{clear:both}.mc-confirm-body .mc-confirm-title{display:block;overflow:auto}.mc-confirm .mc-confirm-btns{border-radius:0 0 4px 4px;text-align:right}.mc-confirm .mc-confirm-btns button+button{margin:16px 16px 16px}.mc-modal{box-sizing:border-box;list-style:none;position:relative;width:auto;margin:0 auto;top:48px;padding:0 0 24px 0}.mc-modal-wrap{position:fixed;overflow:auto;top:0;right:0;bottom:0;left:0;z-index:1000;-webkit-overflow-scrolling:touch;outline:0}.mc-modal-title{margin:0}.mc-modal-content{position:relative;border-radius:4px;background-clip:padding-box;background-color:#fff}.mc-modal-close{cursor:pointer;border:0;background:0 0;position:absolute;right:0;top:0;z-index:10;outline:0;padding:0}.mc-modal-close-x{display:block;vertical-align:baseline;text-align:center;width:56px;height:56px;line-height:56px}.mc-modal-header{padding:14px 16px;border-radius:4px 4px 0 0;background:#fff}.mc-modal-body{padding:16px 24px 24px 24px;word-wrap:break-word;overflow-y:auto;max-height:calc(100vh - 260px)}.mc-modal-footer{padding:16px 16px;text-align:right;border-radius:0 0 4px 4px}.mc-modal-footer button+button{margin-left:16px;margin-bottom:0}.mc-modal.zoom-appear,.mc-modal.zoom-enter{animation-duration:.3s;transform:none;opacity:0}.mc-modal-mask{position:fixed;top:0;right:0;left:0;bottom:0;background-color:rgba(0,0,0,.5);height:100%;z-index:1000}.mc-modal-mask-hidden{display:none}.mc-modal-open{overflow:hidden}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            host: {
                '(keydown)': 'onKeyDown($event)'
            }
        }),
        __param(8, core.Inject(common.DOCUMENT)),
        __metadata("design:paramtypes", [overlay.Overlay,
            core.Renderer2,
            core.ComponentFactoryResolver,
            core.ElementRef,
            core.ViewContainerRef,
            core$1.McMeasureScrollbarService,
            McModalControlService,
            core.ChangeDetectorRef, Object])
    ], McModalComponent);
    return McModalComponent;
}(McModalRef));
////////////
function isPromise(obj) {
    // tslint:disable-next-line
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

var CssUnitPipe = /** @class */ (function () {
    function CssUnitPipe() {
    }
    CssUnitPipe.prototype.transform = function (value, defaultUnit) {
        if (defaultUnit === void 0) { defaultUnit = 'px'; }
        var formatted = +value;
        return isNaN(formatted) ? "" + value : "" + formatted + defaultUnit;
    };
    CssUnitPipe = __decorate([
        core.Pipe({
            name: 'toCssUnit'
        })
    ], CssUnitPipe);
    return CssUnitPipe;
}());

// A builder used for managing service creating modals
var ModalBuilderForService = /** @class */ (function () {
    function ModalBuilderForService(overlay$$1, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.overlay = overlay$$1;
        this.createModal();
        if (!('mcGetContainer' in options)) {
            options.mcGetContainer = null;
        }
        this.changeProps(options);
        this.modalRef.instance.open();
        this.modalRef.instance.mcAfterClose.subscribe(function () { return _this.destroyModal(); });
        this.overlayRef.keydownEvents()
            // @ts-ignore
            .pipe(operators.filter(function (event) {
            return event.keyCode === keycodes.ESCAPE && options.mcCloseByESC;
        }))
            .subscribe(function () { return _this.modalRef.instance.close(); });
    }
    ModalBuilderForService.prototype.getInstance = function () {
        return this.modalRef && this.modalRef.instance;
    };
    ModalBuilderForService.prototype.destroyModal = function () {
        if (this.modalRef) {
            this.overlayRef.dispose();
            // @ts-ignore
            this.modalRef = null;
        }
    };
    ModalBuilderForService.prototype.changeProps = function (options) {
        if (this.modalRef) {
            // here not limit user's inputs at runtime
            Object.assign(this.modalRef.instance, options);
        }
    };
    // Create component to ApplicationRef
    ModalBuilderForService.prototype.createModal = function () {
        this.overlayRef = this.overlay.create();
        this.modalRef = this.overlayRef.attach(new portal.ComponentPortal(McModalComponent));
    };
    return ModalBuilderForService;
}());
var McModalService = /** @class */ (function () {
    function McModalService(overlay$$1, modalControl) {
        this.overlay = overlay$$1;
        this.modalControl = modalControl;
    }
    Object.defineProperty(McModalService.prototype, "openModals", {
        // Track of the current close modals (we assume invisible is close this time)
        get: function () {
            return this.modalControl.openModals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McModalService.prototype, "afterAllClose", {
        get: function () {
            return this.modalControl.afterAllClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // Closes all of the currently-open dialogs
    McModalService.prototype.closeAll = function () {
        this.modalControl.closeAll();
    };
    McModalService.prototype.create = function (options) {
        if (options === void 0) { options = {}; }
        if (typeof options.mcOnCancel !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnCancel = function () { };
        }
        if (!('mcCloseByESC' in options)) {
            options.mcCloseByESC = true;
        }
        if (!('mcWidth' in options)) {
            // tslint:disable-next-line
            options.mcWidth = 480;
        }
        return new ModalBuilderForService(this.overlay, options).getInstance();
    };
    McModalService.prototype.confirm = function (options, confirmType) {
        if (options === void 0) { options = {}; }
        if (confirmType === void 0) { confirmType = 'confirm'; }
        if ('mcFooter' in options) {
            console.warn("The Confirm-Modal doesn't support \"mcFooter\", this property will be ignored.");
        }
        // NOTE: only support function currently by calling confirm()
        if (typeof options.mcOnOk !== 'function') {
            // Leave a empty function to close this modal by default
            // tslint:disable-next-line
            options.mcOnOk = function () { };
        }
        options.mcModalType = 'confirm';
        options.mcClassName = "mc-confirm mc-confirm-" + confirmType + " " + (options.mcClassName || '');
        options.mcMaskClosable = false;
        return this.create(options);
    };
    McModalService.prototype.success = function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'success');
    };
    McModalService.prototype.delete = function (options) {
        if (options === void 0) { options = {}; }
        return this.simpleConfirm(options, 'warn');
    };
    McModalService.prototype.simpleConfirm = function (options, confirmType) {
        if (options === void 0) { options = {}; }
        // Remove the Cancel button if the user not specify a Cancel button
        if (!('mcCancelText' in options)) {
            // @ts-ignore
            options.mcCancelText = null;
        }
        return this.confirm(options, confirmType);
    };
    McModalService = __decorate([
        core.Injectable(),
        __metadata("design:paramtypes", [overlay.Overlay,
            McModalControlService])
    ], McModalService);
    return McModalService;
}());

var McModalModule = /** @class */ (function () {
    function McModalModule() {
    }
    McModalModule = __decorate([
        core.NgModule({
            imports: [common.CommonModule, overlay.OverlayModule, button.McButtonModule, icon.McIconModule],
            exports: [McModalComponent],
            declarations: [McModalComponent, CssUnitPipe],
            entryComponents: [McModalComponent],
            providers: [McModalControlService, McModalService]
        })
    ], McModalModule);
    return McModalModule;
}());

exports.ɵb16 = CssUnitPipe;
exports.ɵa16 = McModalControlService;
exports.McModalComponent = McModalComponent;
exports.McModalRef = McModalRef;
exports.McModalModule = McModalModule;
exports.McModalService = McModalService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-modal.umd.js.map

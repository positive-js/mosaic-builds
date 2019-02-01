/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@ptsecurity/mosaic/core'), require('@ptsecurity/cdk/portal'), require('@ptsecurity/cdk/keycodes'), require('rxjs'), require('rxjs/operators'), require('@ptsecurity/cdk/overlay'), require('@angular/common'), require('@ptsecurity/mosaic/icon')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/sidepanel', ['exports', '@angular/core', '@angular/animations', '@ptsecurity/mosaic/core', '@ptsecurity/cdk/portal', '@ptsecurity/cdk/keycodes', 'rxjs', 'rxjs/operators', '@ptsecurity/cdk/overlay', '@angular/common', '@ptsecurity/mosaic/icon'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.sidepanel = {}),global.ng.core,global.ng.animations,global.ng.mosaic.core,global.ng.cdk.portal,global.ng.cdk.keycodes,global.rxjs,global.rxjs.operators,global.ng.cdk.overlay,global.ng.common,global.ng.mosaic.icon));
}(this, (function (exports,core,animations,core$1,portal,keycodes,rxjs,operators,overlay,common,icon) { 'use strict';

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

/** Injection token that can be used to access the data that was passed in to a sidepanel. */
var MC_SIDEPANEL_DATA = new core.InjectionToken('McSidepanelData');

(function (McSidepanelPosition) {
    McSidepanelPosition["Right"] = "right";
    McSidepanelPosition["Left"] = "left";
    McSidepanelPosition["Top"] = "top";
    McSidepanelPosition["Bottom"] = "bottom";
})(exports.McSidepanelPosition || (exports.McSidepanelPosition = {}));
var McSidepanelConfig = /** @class */ (function () {
    function McSidepanelConfig() {
        /** Data being injected into the child component. */
        this.data = null;
        this.position = exports.McSidepanelPosition.Right;
        /** Whether the sidepanel has a backdrop. */
        this.hasBackdrop = true;
        /** When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true. */
        this.requiredBackdrop = false;
        /** Whether the user can use escape or clicking outside to close the sidepanel. */
        this.disableClose = false;
        /** Custom class for the overlay pane. */
        this.overlayPanelClass = '';
    }
    return McSidepanelConfig;
}());

var McSidepanelAnimationState;
(function (McSidepanelAnimationState) {
    McSidepanelAnimationState["Void"] = "void";
    McSidepanelAnimationState["Visible"] = "visible";
    McSidepanelAnimationState["Hidden"] = "hidden";
})(McSidepanelAnimationState || (McSidepanelAnimationState = {}));
// TODO Find a way to use dynamic keys and avoid error "Expression form not supported."
// tslint:disable-next-line
var mcSidepanelTransformAnimation = {
    right: { in: 'translateX(100%)', out: 'translateX(0%)' },
    left: { in: 'translateX(-100%)', out: 'translateX(0%)' },
    top: { in: 'translateY(-100%)', out: 'translateY(0%)' },
    bottom: { in: 'translateY(100%)', out: 'translateY(0%)' }
};
var mcSidepanelAnimations = {
    sidepanelState: animations.trigger('state', [
        animations.state('hidden', animations.style({ transform: '{{transformIn}}' }), { params: { transformIn: mcSidepanelTransformAnimation[exports.McSidepanelPosition.Right].in } }),
        animations.state('visible', animations.style({ transform: '{{transformOut}}' }), { params: { transformOut: mcSidepanelTransformAnimation[exports.McSidepanelPosition.Right].out } }),
        animations.transition('visible => void, visible => hidden', animations.animate("200ms " + core$1.AnimationCurves.AccelerationCurve)),
        animations.transition('void => visible', animations.animate("200ms " + core$1.AnimationCurves.DecelerationCurve))
    ])
};

var MC_SIDEPANEL_WITH_INDENT = new core.InjectionToken('mc-sidepanel-with-indent');
var MC_SIDEPANEL_WITH_SHADOW = new core.InjectionToken('mc-sidepanel-with-shadow');
var McSidepanelContainerComponent = /** @class */ (function (_super) {
    __extends(McSidepanelContainerComponent, _super);
    function McSidepanelContainerComponent(elementRef, changeDetectorRef, sidepanelConfig, withIndent, withShadow) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.sidepanelConfig = sidepanelConfig;
        _this.withIndent = withIndent;
        _this.withShadow = withShadow;
        /** The state of the sidepanel animations. */
        _this.animationState = McSidepanelAnimationState.Void;
        /** Emits whenever the state of the animation changes. */
        _this.animationStateChanged = new core.EventEmitter();
        return _this;
    }
    McSidepanelContainerComponent.prototype.ngOnDestroy = function () {
        this.destroyed = true;
    };
    /** Attach a component portal as content to this sidepanel container. */
    McSidepanelContainerComponent.prototype.attachComponentPortal = function (portal$$1) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachComponentPortal(portal$$1);
    };
    /** Attach a template portal as content to this sidepanel container. */
    McSidepanelContainerComponent.prototype.attachTemplatePortal = function (portal$$1) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachTemplatePortal(portal$$1);
    };
    /** Begin animation of the sidepanel entrance into view. */
    McSidepanelContainerComponent.prototype.enter = function () {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Visible;
            this.changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the sidepanel exiting from view. */
    McSidepanelContainerComponent.prototype.exit = function () {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Hidden;
            this.changeDetectorRef.markForCheck();
        }
    };
    McSidepanelContainerComponent.prototype.onAnimation = function (event) {
        this.animationStateChanged.emit(event);
    };
    McSidepanelContainerComponent.prototype.setAnimation = function () {
        var position = this.sidepanelConfig.position;
        this.animationTransform = {
            transformIn: mcSidepanelTransformAnimation[position].in,
            transformOut: mcSidepanelTransformAnimation[position].out
        };
    };
    McSidepanelContainerComponent.prototype.setPanelClass = function () {
        var element = this.elementRef.nativeElement;
        var position = this.sidepanelConfig.position;
        element.classList.add("mc-sidepanel-container_" + position);
        if (this.withShadow) {
            element.classList.add('mc-sidepanel-container_shadowed');
        }
    };
    McSidepanelContainerComponent.prototype.validatePortalAttached = function () {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    };
    __decorate([
        core.ViewChild(portal.CdkPortalOutlet),
        __metadata("design:type", portal.CdkPortalOutlet)
    ], McSidepanelContainerComponent.prototype, "portalOutlet", void 0);
    McSidepanelContainerComponent = __decorate([
        core.Component({
            selector: 'mc-sidepanel-container',
            template: "<div class=\"mc-sidepanel-wrapper\"><div class=\"mc-sidepanel-indent\" *ngIf=\"withIndent\"><button mcSidepanelClose></button></div><div class=\"mc-sidepanel-content\"><ng-template cdkPortalOutlet></ng-template></div></div>",
            styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-sidepanel-container{outline:0;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translateX(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translateX(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_bottom,.mc-sidepanel-container_top{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_bottom .mc-sidepanel-indent,.mc-sidepanel-container_top .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0 0 0 8px}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}"],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            animations: [mcSidepanelAnimations.sidepanelState],
            host: {
                class: 'mc-sidepanel-container',
                tabindex: '-1',
                role: 'dialog',
                'aria-modal': 'true',
                '[attr.id]': 'id',
                '[@state]': "{\n            value: animationState,\n            params: animationTransform\n        }",
                '(@state.start)': 'onAnimation($event)',
                '(@state.done)': 'onAnimation($event)'
            }
        }),
        __param(3, core.Inject(MC_SIDEPANEL_WITH_INDENT)),
        __param(4, core.Inject(MC_SIDEPANEL_WITH_SHADOW)),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef,
            McSidepanelConfig, Boolean, Boolean])
    ], McSidepanelContainerComponent);
    return McSidepanelContainerComponent;
}(portal.BasePortalOutlet));

// Counter for unique sidepanel ids.
var uniqueId = 0;
var McSidepanelRef = /** @class */ (function () {
    function McSidepanelRef(containerInstance, overlayRef, config) {
        var _this = this;
        this.containerInstance = containerInstance;
        this.overlayRef = overlayRef;
        this.config = config;
        /** Subject for notifying the user that the sidepanel has been closed and dismissed. */
        this.afterClosed$ = new rxjs.Subject();
        /** Subject for notifying the user that the sidepanel has opened and appeared. */
        this.afterOpened$ = new rxjs.Subject();
        this.id = this.config.id || "mc-sidepanel-" + uniqueId++;
        this.containerInstance.id = this.id;
        // Emit when opening animation completes
        containerInstance.animationStateChanged.pipe(operators.filter(function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Visible; }), operators.take(1)).subscribe(function () {
            _this.afterOpened$.next();
            _this.afterOpened$.complete();
        });
        // Dispose overlay when closing animation is complete
        containerInstance.animationStateChanged.pipe(operators.filter(function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Hidden; }), operators.take(1)).subscribe(function () {
            overlayRef.dispose();
            _this.afterClosed$.next(_this.result);
            _this.afterClosed$.complete();
        });
        if (!containerInstance.sidepanelConfig.disableClose) {
            rxjs.merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(
            // tslint:disable:deprecation
            // keyCode is deprecated, but IE11 and Edge don't support code property, which we need use instead
            operators.filter(function (event) { return event.keyCode === keycodes.ESCAPE; }))).subscribe(function () { return _this.close(); });
        }
    }
    McSidepanelRef.prototype.close = function (result) {
        var _this = this;
        if (!this.afterClosed$.closed) {
            // Transition the backdrop in parallel to the sidepanel.
            this.containerInstance.animationStateChanged.pipe(operators.filter(function (event) { return event.phaseName === 'done'; }), operators.take(1)).subscribe(function () { return _this.overlayRef.detachBackdrop(); });
            this.result = result;
            this.containerInstance.exit();
        }
    };
    /** Gets an observable that is notified when the sidepanel is finished closing. */
    McSidepanelRef.prototype.afterClosed = function () {
        return this.afterClosed$.asObservable();
    };
    /** Gets an observable that is notified when the sidepanel has opened and appeared. */
    McSidepanelRef.prototype.afterOpened = function () {
        return this.afterOpened$.asObservable();
    };
    return McSidepanelRef;
}());

/** Injection token that can be used to specify default sidepanel options. */
var MC_SIDEPANEL_DEFAULT_OPTIONS = new core.InjectionToken('mc-sidepanel-default-options');
var McSidepanelService = /** @class */ (function () {
    function McSidepanelService(overlay$$1, injector, defaultOptions, parentSidepanelService) {
        this.overlay = overlay$$1;
        this.injector = injector;
        this.defaultOptions = defaultOptions;
        this.parentSidepanelService = parentSidepanelService;
        this.openedSidepanelsAtThisLevel = [];
    }
    Object.defineProperty(McSidepanelService.prototype, "openedSidepanels", {
        /** Keeps track of the currently-open sidepanels. */
        get: function () {
            return this.parentSidepanelService ? this.parentSidepanelService.openedSidepanels :
                this.openedSidepanelsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    McSidepanelService.prototype.ngOnDestroy = function () {
        // Only close the sidepanels at this level on destroy
        // since the parent service may still be active.
        this.closeSidepanels(this.openedSidepanelsAtThisLevel);
    };
    McSidepanelService.prototype.open = function (componentOrTemplateRef, config) {
        var _this = this;
        var fullConfig = __assign({}, (this.defaultOptions || new McSidepanelConfig()), config);
        if (fullConfig.id && this.getSidepanelById(fullConfig.id)) {
            throw Error("Sidepanel with id \"" + fullConfig.id + "\" exists already. The sidepanel id must be unique.");
        }
        var overlayRef = this.createOverlay(fullConfig);
        var container = this.attachContainer(overlayRef, fullConfig);
        var ref = new McSidepanelRef(container, overlayRef, fullConfig);
        if (componentOrTemplateRef instanceof core.TemplateRef) {
            container.attachTemplatePortal(new portal.TemplatePortal(componentOrTemplateRef, null, {
                $implicit: fullConfig.data,
                sidepanelRef: ref
            }));
        }
        else {
            var injector = this.createInjector(fullConfig, ref, container);
            var portal$$1 = new portal.ComponentPortal(componentOrTemplateRef, undefined, injector);
            var contentRef = container.attachComponentPortal(portal$$1);
            ref.instance = contentRef.instance;
        }
        this.openedSidepanels.push(ref);
        ref.afterClosed().subscribe(function () { return _this.removeOpenSidepanel(ref); });
        container.enter();
        return ref;
    };
    /**
     * Closes all of the currently-open sidepanels.
     */
    McSidepanelService.prototype.closeAll = function () {
        this.closeSidepanels(this.openedSidepanels);
    };
    /**
     * Finds an open sidepanel by its id.
     * @param id ID to use when looking up the sidepanel.
     */
    McSidepanelService.prototype.getSidepanelById = function (id) {
        return this.openedSidepanels.find(function (sidepanel) { return sidepanel.id === id; });
    };
    /**
     * Attaches the sidepanel container component to the overlay.
     */
    McSidepanelService.prototype.attachContainer = function (overlayRef, config) {
        var openedSidepanelsWithSamePosition = this.getOpenedSidepanelsWithSamePosition(config);
        var injector = new portal.PortalInjector(this.injector, new WeakMap([
            [McSidepanelConfig, config],
            [MC_SIDEPANEL_WITH_INDENT, openedSidepanelsWithSamePosition.length >= 1],
            [MC_SIDEPANEL_WITH_SHADOW, openedSidepanelsWithSamePosition.length < 2] // tslint:disable-line
        ]));
        var containerPortal = new portal.ComponentPortal(McSidepanelContainerComponent, undefined, injector);
        var containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    };
    /**
     * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
     * of a sidepanel to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the sidepanel.
     * @param sidepanelRef Reference to the sidepanel.
     * @param sidepanelContainer Sidepanel container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the sidepanel.
     */
    McSidepanelService.prototype.createInjector = function (config, sidepanelRef, sidepanelContainer) {
        // The McSidepanelContainerComponent is injected in the portal as the McSidepanelContainerComponent and
        // the sidepanel's content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the McSidepanelContainerComponent is explicitly
        // added to the injection tokens.
        var injectionTokens = new WeakMap([
            [McSidepanelContainerComponent, sidepanelContainer],
            [MC_SIDEPANEL_DATA, config.data],
            [McSidepanelRef, sidepanelRef]
        ]);
        return new portal.PortalInjector(this.injector, injectionTokens);
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified sidepanel config.
     */
    McSidepanelService.prototype.createOverlay = function (config) {
        var overlayConfig = new overlay.OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: this.getBackdropClass(config),
            maxWidth: '100%',
            panelClass: config.overlayPanelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global()
        });
        return this.overlay.create(overlayConfig);
    };
    McSidepanelService.prototype.closeSidepanels = function (sidepanels) {
        var reversedOpenedSidepanels = sidepanels.reverse().slice();
        reversedOpenedSidepanels.forEach(function (sidepanelRef) {
            sidepanelRef.close();
        });
    };
    McSidepanelService.prototype.getBackdropClass = function (config) {
        var hasOpenedSidepanelWithBackdrop = this.openedSidepanels.some(function (sidepanelRef) { return sidepanelRef.config.hasBackdrop; });
        return config.requiredBackdrop || !hasOpenedSidepanelWithBackdrop ? 'cdk-overlay-dark-backdrop' :
            'cdk-overlay-transparent-backdrop';
    };
    McSidepanelService.prototype.getOpenedSidepanelsWithSamePosition = function (config) {
        return this.openedSidepanels.filter(function (sidepanelRef) { return sidepanelRef.config.position === config.position; });
    };
    /**
     * Removes a sidepanel from the array of open sidepanels.
     * @param sidepanelRef Sidepanel to be removed.
     */
    McSidepanelService.prototype.removeOpenSidepanel = function (sidepanelRef) {
        var index = this.openedSidepanels.indexOf(sidepanelRef);
        if (index > -1) {
            this.openedSidepanels.splice(index, 1);
        }
    };
    McSidepanelService = __decorate([
        core.Injectable(),
        __param(2, core.Optional()), __param(2, core.Inject(MC_SIDEPANEL_DEFAULT_OPTIONS)),
        __param(3, core.Optional()), __param(3, core.SkipSelf()),
        __metadata("design:paramtypes", [overlay.Overlay,
            core.Injector,
            McSidepanelConfig,
            McSidepanelService])
    ], McSidepanelService);
    return McSidepanelService;
}());

/**
 * Button that will close the current sidepanel.
 */
var McSidepanelClose = /** @class */ (function () {
    function McSidepanelClose(sidepanelRef, elementRef, sidepanelService) {
        this.sidepanelRef = sidepanelRef;
        this.elementRef = elementRef;
        this.sidepanelService = sidepanelService;
    }
    McSidepanelClose.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.sidepanelRef) {
            // When this directive is included in a sidepanel via TemplateRef (rather than being
            // in a Component), the SidepanelRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the SidepanelRef by
            // ID.
            // This must occur in `onInit`, as the ID binding for the sidepanel container won't
            // be resolved at constructor time. We use setTimeout by same reason.
            setTimeout(function () {
                _this.sidepanelRef = getClosestSidepanel(_this.elementRef, _this.sidepanelService.openedSidepanels);
            });
        }
    };
    McSidepanelClose.prototype.ngOnChanges = function (changes) {
        var proxiedChange = changes.mcSidepanelClose || changes.sidepanelResult;
        if (proxiedChange) {
            this.sidepanelResult = proxiedChange.currentValue;
        }
    };
    __decorate([
        core.Input('mc-sidepanel-close'),
        __metadata("design:type", Object)
    ], McSidepanelClose.prototype, "sidepanelResult", void 0);
    __decorate([
        core.Input('mcSidepanelClose'),
        __metadata("design:type", Object)
    ], McSidepanelClose.prototype, "mcSidepanelClose", void 0);
    McSidepanelClose = __decorate([
        core.Directive({
            selector: 'button[mc-sidepanel-close], button[mcSidepanelClose]',
            host: {
                '(click)': 'sidepanelRef.close(sidepanelResult)',
                class: 'mc-sidepanel-close',
                type: 'button'
            }
        }),
        __param(0, core.Optional()),
        __metadata("design:paramtypes", [McSidepanelRef,
            core.ElementRef,
            McSidepanelService])
    ], McSidepanelClose);
    return McSidepanelClose;
}());
/**
 * Header of a sidepanel.
 */
var McSidepanelHeader = /** @class */ (function () {
    function McSidepanelHeader() {
    }
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean)
    ], McSidepanelHeader.prototype, "closeable", void 0);
    McSidepanelHeader = __decorate([
        core.Component({
            selector: 'mc-sidepanel-header',
            template: "\n        <div class=\"mc-sidepanel-title\">\n            <ng-content></ng-content>\n        </div>\n        <button *ngIf=\"closeable\" mc-sidepanel-close>\n            <span class=\"mc-sidepanel-close-x\">\n                <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n            </span>\n        </button>\n    ",
            host: {
                class: 'mc-sidepanel-header'
            }
        })
    ], McSidepanelHeader);
    return McSidepanelHeader;
}());
/**
 * Scrollable content container of a sidepanel.
 */
var McSidepanelBody = /** @class */ (function () {
    function McSidepanelBody() {
    }
    McSidepanelBody = __decorate([
        core.Directive({
            selector: 'mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody',
            host: {
                class: 'mc-sidepanel-body'
            }
        })
    ], McSidepanelBody);
    return McSidepanelBody;
}());
/**
 * Footer of a sidepanel.
 */
var McSidepanelFooter = /** @class */ (function () {
    function McSidepanelFooter() {
    }
    McSidepanelFooter = __decorate([
        core.Directive({
            selector: 'mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter',
            host: {
                class: 'mc-sidepanel-footer'
            }
        })
    ], McSidepanelFooter);
    return McSidepanelFooter;
}());
/**
 * Actions block of a sidepanel footer.
 */
var McSidepanelActions = /** @class */ (function () {
    function McSidepanelActions() {
    }
    McSidepanelActions = __decorate([
        core.Directive({
            selector: 'mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions',
            host: {
                class: 'mc-sidepanel-actions'
            }
        })
    ], McSidepanelActions);
    return McSidepanelActions;
}());
/**
 * Finds the closest McSidepanelRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a sidepanel.
 * @param openSidepanels References to the currently-open sidepanels.
 */
function getClosestSidepanel(element, openSidepanels) {
    var parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mc-sidepanel-container')) {
        parent = parent.parentElement;
    }
    return parent ? openSidepanels.find(function (sidepanel) { return sidepanel.id === parent.id; }) : null;
}

var McSidepanelModule = /** @class */ (function () {
    function McSidepanelModule() {
    }
    McSidepanelModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                overlay.OverlayModule,
                portal.PortalModule,
                core$1.McCommonModule,
                icon.McIconModule
            ],
            providers: [McSidepanelService],
            declarations: [
                McSidepanelContainerComponent,
                McSidepanelClose,
                McSidepanelHeader,
                McSidepanelBody,
                McSidepanelFooter,
                McSidepanelActions
            ],
            entryComponents: [McSidepanelContainerComponent],
            exports: [
                McSidepanelContainerComponent,
                McSidepanelClose,
                McSidepanelHeader,
                McSidepanelBody,
                McSidepanelFooter,
                McSidepanelActions
            ]
        })
    ], McSidepanelModule);
    return McSidepanelModule;
}());

exports.ɵb20 = mcSidepanelAnimations;
exports.ɵa20 = mcSidepanelTransformAnimation;
exports.ɵg20 = McSidepanelActions;
exports.ɵe20 = McSidepanelBody;
exports.ɵc20 = McSidepanelClose;
exports.ɵf20 = McSidepanelFooter;
exports.ɵd20 = McSidepanelHeader;
exports.McSidepanelModule = McSidepanelModule;
exports.MC_SIDEPANEL_DEFAULT_OPTIONS = MC_SIDEPANEL_DEFAULT_OPTIONS;
exports.McSidepanelService = McSidepanelService;
exports.MC_SIDEPANEL_DATA = MC_SIDEPANEL_DATA;
exports.McSidepanelConfig = McSidepanelConfig;
exports.MC_SIDEPANEL_WITH_INDENT = MC_SIDEPANEL_WITH_INDENT;
exports.MC_SIDEPANEL_WITH_SHADOW = MC_SIDEPANEL_WITH_SHADOW;
exports.McSidepanelContainerComponent = McSidepanelContainerComponent;
exports.McSidepanelRef = McSidepanelRef;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-sidepanel.umd.js.map

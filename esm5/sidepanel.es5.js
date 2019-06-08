/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { InjectionToken, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, ViewChild, ViewEncapsulation, Injectable, Injector, Optional, SkipSelf, TemplateRef, Directive, Input, NgModule } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, McCommonModule } from '@ptsecurity/mosaic/core';
import { __extends, __assign } from 'tslib';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, PortalInjector, TemplatePortal, PortalModule } from '@ptsecurity/cdk/portal';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { merge, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Overlay, OverlayConfig, OverlayModule } from '@ptsecurity/cdk/overlay';
import { CommonModule } from '@angular/common';
import { McIconModule } from '@ptsecurity/mosaic/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token that can be used to access the data that was passed in to a sidepanel.
 * @type {?}
 */
var MC_SIDEPANEL_DATA = new InjectionToken('McSidepanelData');
/** @enum {string} */
var McSidepanelPosition = {
    Right: 'right',
    Left: 'left',
    Top: 'top',
    Bottom: 'bottom',
};
/**
 * @template D
 */
var  /**
 * @template D
 */
McSidepanelConfig = /** @class */ (function () {
    function McSidepanelConfig() {
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        this.position = McSidepanelPosition.Right;
        /**
         * Whether the sidepanel has a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true.
         */
        this.requiredBackdrop = false;
        /**
         * Whether the user can use escape or clicking outside to close the sidepanel.
         */
        this.disableClose = false;
        /**
         * Custom class for the overlay pane.
         */
        this.overlayPanelClass = '';
    }
    return McSidepanelConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var McSidepanelAnimationState = {
    Void: 'void',
    Visible: 'visible',
    Hidden: 'hidden',
};
// TODO Find a way to use dynamic keys and avoid error "Expression form not supported."
// tslint:disable-next-line
/** @type {?} */
var mcSidepanelTransformAnimation = {
    right: { in: 'translateX(100%)', out: 'translateX(0%)' },
    left: { in: 'translateX(-100%)', out: 'translateX(0%)' },
    top: { in: 'translateY(-100%)', out: 'translateY(0%)' },
    bottom: { in: 'translateY(100%)', out: 'translateY(0%)' }
};
/** @type {?} */
var mcSidepanelAnimations = {
    sidepanelState: trigger('state', [
        state('hidden', style({ transform: '{{transformIn}}' }), { params: { transformIn: mcSidepanelTransformAnimation[McSidepanelPosition.Right].in } }),
        state('visible', style({ transform: '{{transformOut}}' }), { params: { transformOut: mcSidepanelTransformAnimation[McSidepanelPosition.Right].out } }),
        transition('visible => void, visible => hidden', animate("200ms " + AnimationCurves.AccelerationCurve)),
        transition('void => visible', animate("200ms " + AnimationCurves.DecelerationCurve))
    ])
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MC_SIDEPANEL_WITH_INDENT = new InjectionToken('mc-sidepanel-with-indent');
/** @type {?} */
var MC_SIDEPANEL_WITH_SHADOW = new InjectionToken('mc-sidepanel-with-shadow');
var McSidepanelContainerComponent = /** @class */ (function (_super) {
    __extends(McSidepanelContainerComponent, _super);
    function McSidepanelContainerComponent(elementRef, changeDetectorRef, sidepanelConfig, withIndent, withShadow) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.sidepanelConfig = sidepanelConfig;
        _this.withIndent = withIndent;
        _this.withShadow = withShadow;
        /**
         * The state of the sidepanel animations.
         */
        _this.animationState = McSidepanelAnimationState.Void;
        /**
         * Emits whenever the state of the animation changes.
         */
        _this.animationStateChanged = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed = true;
    };
    /** Attach a component portal as content to this sidepanel container. */
    /**
     * Attach a component portal as content to this sidepanel container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.attachComponentPortal = /**
     * Attach a component portal as content to this sidepanel container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this sidepanel container. */
    /**
     * Attach a template portal as content to this sidepanel container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.attachTemplatePortal = /**
     * Attach a template portal as content to this sidepanel container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachTemplatePortal(portal);
    };
    /** Begin animation of the sidepanel entrance into view. */
    /**
     * Begin animation of the sidepanel entrance into view.
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.enter = /**
     * Begin animation of the sidepanel entrance into view.
     * @return {?}
     */
    function () {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Visible;
            this.changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the sidepanel exiting from view. */
    /**
     * Begin animation of the sidepanel exiting from view.
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.exit = /**
     * Begin animation of the sidepanel exiting from view.
     * @return {?}
     */
    function () {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Hidden;
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.onAnimation = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.animationStateChanged.emit(event);
    };
    /**
     * @private
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.setAnimation = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var position = (/** @type {?} */ (this.sidepanelConfig.position));
        this.animationTransform = {
            transformIn: mcSidepanelTransformAnimation[position].in,
            transformOut: mcSidepanelTransformAnimation[position].out
        };
    };
    /**
     * @private
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.setPanelClass = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.elementRef.nativeElement;
        /** @type {?} */
        var position = (/** @type {?} */ (this.sidepanelConfig.position));
        element.classList.add("mc-sidepanel-container_" + position);
        if (this.withShadow) {
            element.classList.add('mc-sidepanel-container_shadowed');
        }
    };
    /**
     * @private
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.validatePortalAttached = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    };
    McSidepanelContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-sidepanel-container',
                    template: "<div class=\"mc-sidepanel-wrapper\"><div class=\"mc-sidepanel-indent\" *ngIf=\"withIndent\"><button mcSidepanelClose></button></div><div class=\"mc-sidepanel-content\"><ng-template cdkPortalOutlet></ng-template></div></div>",
                    styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-sidepanel-container{outline:0;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translateX(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translateX(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_bottom,.mc-sidepanel-container_top{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_bottom .mc-sidepanel-indent,.mc-sidepanel-container_top .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0 0 0 8px}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
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
                },] },
    ];
    /** @nocollapse */
    McSidepanelContainerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: McSidepanelConfig },
        { type: Boolean, decorators: [{ type: Inject, args: [MC_SIDEPANEL_WITH_INDENT,] }] },
        { type: Boolean, decorators: [{ type: Inject, args: [MC_SIDEPANEL_WITH_SHADOW,] }] }
    ]; };
    McSidepanelContainerComponent.propDecorators = {
        portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }]
    };
    return McSidepanelContainerComponent;
}(BasePortalOutlet));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Counter for unique sidepanel ids.
/** @type {?} */
var uniqueId = 0;
/**
 * @template T, R
 */
var  /**
 * @template T, R
 */
McSidepanelRef = /** @class */ (function () {
    function McSidepanelRef(containerInstance, overlayRef, config) {
        var _this = this;
        this.containerInstance = containerInstance;
        this.overlayRef = overlayRef;
        this.config = config;
        /**
         * Subject for notifying the user that the sidepanel has been closed and dismissed.
         */
        this.afterClosed$ = new Subject();
        /**
         * Subject for notifying the user that the sidepanel has opened and appeared.
         */
        this.afterOpened$ = new Subject();
        this.id = this.config.id || "mc-sidepanel-" + uniqueId++;
        this.containerInstance.id = this.id;
        // Emit when opening animation completes
        containerInstance.animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Visible; })), take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.afterOpened$.next();
            _this.afterOpened$.complete();
        }));
        // Dispose overlay when closing animation is complete
        containerInstance.animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Hidden; })), take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            overlayRef.dispose();
            _this.afterClosed$.next(_this.result);
            _this.afterClosed$.complete();
        }));
        if (!containerInstance.sidepanelConfig.disableClose) {
            merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(
            // tslint:disable:deprecation
            // keyCode is deprecated, but IE11 and Edge don't support code property, which we need use instead
            filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.keyCode === ESCAPE; })))).subscribe((/**
             * @return {?}
             */
            function () { return _this.close(); }));
        }
    }
    /**
     * @param {?=} result
     * @return {?}
     */
    McSidepanelRef.prototype.close = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        var _this = this;
        if (!this.afterClosed$.closed) {
            // Transition the backdrop in parallel to the sidepanel.
            this.containerInstance.animationStateChanged.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.phaseName === 'done'; })), take(1)).subscribe((/**
             * @return {?}
             */
            function () { return _this.overlayRef.detachBackdrop(); }));
            this.result = result;
            this.containerInstance.exit();
        }
    };
    /** Gets an observable that is notified when the sidepanel is finished closing. */
    /**
     * Gets an observable that is notified when the sidepanel is finished closing.
     * @return {?}
     */
    McSidepanelRef.prototype.afterClosed = /**
     * Gets an observable that is notified when the sidepanel is finished closing.
     * @return {?}
     */
    function () {
        return this.afterClosed$.asObservable();
    };
    /** Gets an observable that is notified when the sidepanel has opened and appeared. */
    /**
     * Gets an observable that is notified when the sidepanel has opened and appeared.
     * @return {?}
     */
    McSidepanelRef.prototype.afterOpened = /**
     * Gets an observable that is notified when the sidepanel has opened and appeared.
     * @return {?}
     */
    function () {
        return this.afterOpened$.asObservable();
    };
    return McSidepanelRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token that can be used to specify default sidepanel options.
 * @type {?}
 */
var MC_SIDEPANEL_DEFAULT_OPTIONS = new InjectionToken('mc-sidepanel-default-options');
var McSidepanelService = /** @class */ (function () {
    function McSidepanelService(overlay, injector, defaultOptions, parentSidepanelService) {
        this.overlay = overlay;
        this.injector = injector;
        this.defaultOptions = defaultOptions;
        this.parentSidepanelService = parentSidepanelService;
        this.openedSidepanelsAtThisLevel = [];
    }
    Object.defineProperty(McSidepanelService.prototype, "openedSidepanels", {
        /** Keeps track of the currently-open sidepanels. */
        get: /**
         * Keeps track of the currently-open sidepanels.
         * @return {?}
         */
        function () {
            return this.parentSidepanelService ? this.parentSidepanelService.openedSidepanels :
                this.openedSidepanelsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McSidepanelService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // Only close the sidepanels at this level on destroy
        // since the parent service may still be active.
        this.closeSidepanels(this.openedSidepanelsAtThisLevel);
    };
    /**
     * @template T, D
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    McSidepanelService.prototype.open = /**
     * @template T, D
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    function (componentOrTemplateRef, config) {
        var _this = this;
        /** @type {?} */
        var fullConfig = __assign({}, (this.defaultOptions || new McSidepanelConfig()), config);
        if (fullConfig.id && this.getSidepanelById(fullConfig.id)) {
            throw Error("Sidepanel with id \"" + fullConfig.id + "\" exists already. The sidepanel id must be unique.");
        }
        /** @type {?} */
        var overlayRef = this.createOverlay(fullConfig);
        /** @type {?} */
        var container = this.attachContainer(overlayRef, fullConfig);
        /** @type {?} */
        var ref = new McSidepanelRef(container, overlayRef, fullConfig);
        if (componentOrTemplateRef instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, (/** @type {?} */ (null)), (/** @type {?} */ ({
                $implicit: fullConfig.data,
                sidepanelRef: ref
            }))));
        }
        else {
            /** @type {?} */
            var injector = this.createInjector(fullConfig, ref, container);
            /** @type {?} */
            var portal = new ComponentPortal(componentOrTemplateRef, undefined, injector);
            /** @type {?} */
            var contentRef = container.attachComponentPortal(portal);
            ref.instance = contentRef.instance;
        }
        this.openedSidepanels.push(ref);
        ref.afterClosed().subscribe((/**
         * @return {?}
         */
        function () { return _this.removeOpenSidepanel(ref); }));
        container.enter();
        return ref;
    };
    /**
     * Closes all of the currently-open sidepanels.
     */
    /**
     * Closes all of the currently-open sidepanels.
     * @return {?}
     */
    McSidepanelService.prototype.closeAll = /**
     * Closes all of the currently-open sidepanels.
     * @return {?}
     */
    function () {
        this.closeSidepanels(this.openedSidepanels);
    };
    /**
     * Finds an open sidepanel by its id.
     * @param id ID to use when looking up the sidepanel.
     */
    /**
     * Finds an open sidepanel by its id.
     * @param {?} id ID to use when looking up the sidepanel.
     * @return {?}
     */
    McSidepanelService.prototype.getSidepanelById = /**
     * Finds an open sidepanel by its id.
     * @param {?} id ID to use when looking up the sidepanel.
     * @return {?}
     */
    function (id) {
        return this.openedSidepanels.find((/**
         * @param {?} sidepanel
         * @return {?}
         */
        function (sidepanel) { return sidepanel.id === id; }));
    };
    /**
     * Attaches the sidepanel container component to the overlay.
     */
    /**
     * Attaches the sidepanel container component to the overlay.
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    McSidepanelService.prototype.attachContainer = /**
     * Attaches the sidepanel container component to the overlay.
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (overlayRef, config) {
        /** @type {?} */
        var openedSidepanelsWithSamePosition = this.getOpenedSidepanelsWithSamePosition(config);
        /** @type {?} */
        var injector = new PortalInjector(this.injector, new WeakMap([
            [McSidepanelConfig, config],
            [MC_SIDEPANEL_WITH_INDENT, openedSidepanelsWithSamePosition.length >= 1],
            [MC_SIDEPANEL_WITH_SHADOW, openedSidepanelsWithSamePosition.length < 2] // tslint:disable-line
        ]));
        /** @type {?} */
        var containerPortal = new ComponentPortal(McSidepanelContainerComponent, undefined, injector);
        /** @type {?} */
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
    /**
     * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
     * of a sidepanel to close itself and, optionally, to return a value.
     * @private
     * @template T
     * @param {?} config Config object that is used to construct the sidepanel.
     * @param {?} sidepanelRef Reference to the sidepanel.
     * @param {?} sidepanelContainer Sidepanel container element that wraps all of the contents.
     * @return {?} The custom injector that can be used inside the sidepanel.
     */
    McSidepanelService.prototype.createInjector = /**
     * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
     * of a sidepanel to close itself and, optionally, to return a value.
     * @private
     * @template T
     * @param {?} config Config object that is used to construct the sidepanel.
     * @param {?} sidepanelRef Reference to the sidepanel.
     * @param {?} sidepanelContainer Sidepanel container element that wraps all of the contents.
     * @return {?} The custom injector that can be used inside the sidepanel.
     */
    function (config, sidepanelRef, sidepanelContainer) {
        // The McSidepanelContainerComponent is injected in the portal as the McSidepanelContainerComponent and
        // the sidepanel's content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the McSidepanelContainerComponent is explicitly
        // added to the injection tokens.
        /** @type {?} */
        var injectionTokens = new WeakMap([
            [McSidepanelContainerComponent, sidepanelContainer],
            [MC_SIDEPANEL_DATA, config.data],
            [McSidepanelRef, sidepanelRef]
        ]);
        return new PortalInjector(this.injector, injectionTokens);
    };
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified sidepanel config.
     */
    /**
     * Creates a new overlay and places it in the correct location.
     * @private
     * @param {?} config The user-specified sidepanel config.
     * @return {?}
     */
    McSidepanelService.prototype.createOverlay = /**
     * Creates a new overlay and places it in the correct location.
     * @private
     * @param {?} config The user-specified sidepanel config.
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: this.getBackdropClass(config),
            maxWidth: '100%',
            panelClass: config.overlayPanelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global()
        });
        return this.overlay.create(overlayConfig);
    };
    /**
     * @private
     * @param {?} sidepanels
     * @return {?}
     */
    McSidepanelService.prototype.closeSidepanels = /**
     * @private
     * @param {?} sidepanels
     * @return {?}
     */
    function (sidepanels) {
        /** @type {?} */
        var reversedOpenedSidepanels = sidepanels.reverse().slice();
        reversedOpenedSidepanels.forEach((/**
         * @param {?} sidepanelRef
         * @return {?}
         */
        function (sidepanelRef) {
            sidepanelRef.close();
        }));
    };
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    McSidepanelService.prototype.getBackdropClass = /**
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var hasOpenedSidepanelWithBackdrop = this.openedSidepanels.some((/**
         * @param {?} sidepanelRef
         * @return {?}
         */
        function (sidepanelRef) { return (/** @type {?} */ (sidepanelRef.config.hasBackdrop)); }));
        return config.requiredBackdrop || !hasOpenedSidepanelWithBackdrop ? 'cdk-overlay-dark-backdrop' :
            'cdk-overlay-transparent-backdrop';
    };
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    McSidepanelService.prototype.getOpenedSidepanelsWithSamePosition = /**
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return this.openedSidepanels.filter((/**
         * @param {?} sidepanelRef
         * @return {?}
         */
        function (sidepanelRef) { return sidepanelRef.config.position === config.position; }));
    };
    /**
     * Removes a sidepanel from the array of open sidepanels.
     * @param sidepanelRef Sidepanel to be removed.
     */
    /**
     * Removes a sidepanel from the array of open sidepanels.
     * @private
     * @param {?} sidepanelRef Sidepanel to be removed.
     * @return {?}
     */
    McSidepanelService.prototype.removeOpenSidepanel = /**
     * Removes a sidepanel from the array of open sidepanels.
     * @private
     * @param {?} sidepanelRef Sidepanel to be removed.
     * @return {?}
     */
    function (sidepanelRef) {
        /** @type {?} */
        var index = this.openedSidepanels.indexOf(sidepanelRef);
        if (index > -1) {
            this.openedSidepanels.splice(index, 1);
        }
    };
    McSidepanelService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    McSidepanelService.ctorParameters = function () { return [
        { type: Overlay },
        { type: Injector },
        { type: McSidepanelConfig, decorators: [{ type: Optional }, { type: Inject, args: [MC_SIDEPANEL_DEFAULT_OPTIONS,] }] },
        { type: McSidepanelService, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return McSidepanelService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Button that will close the current sidepanel.
 */
var McSidepanelClose = /** @class */ (function () {
    function McSidepanelClose(sidepanelRef, elementRef, sidepanelService) {
        this.sidepanelRef = sidepanelRef;
        this.elementRef = elementRef;
        this.sidepanelService = sidepanelService;
    }
    /**
     * @return {?}
     */
    McSidepanelClose.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.sidepanelRef) {
            // When this directive is included in a sidepanel via TemplateRef (rather than being
            // in a Component), the SidepanelRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the SidepanelRef by
            // ID.
            // This must occur in `onInit`, as the ID binding for the sidepanel container won't
            // be resolved at constructor time. We use setTimeout by same reason.
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.sidepanelRef = (/** @type {?} */ (getClosestSidepanel(_this.elementRef, _this.sidepanelService.openedSidepanels)));
            }));
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    McSidepanelClose.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var proxiedChange = changes.mcSidepanelClose || changes.sidepanelResult;
        if (proxiedChange) {
            this.sidepanelResult = proxiedChange.currentValue;
        }
    };
    McSidepanelClose.decorators = [
        { type: Directive, args: [{
                    selector: 'button[mc-sidepanel-close], button[mcSidepanelClose]',
                    host: {
                        '(click)': 'sidepanelRef.close(sidepanelResult)',
                        class: 'mc-sidepanel-close',
                        type: 'button'
                    }
                },] },
    ];
    /** @nocollapse */
    McSidepanelClose.ctorParameters = function () { return [
        { type: McSidepanelRef, decorators: [{ type: Optional }] },
        { type: ElementRef },
        { type: McSidepanelService }
    ]; };
    McSidepanelClose.propDecorators = {
        sidepanelResult: [{ type: Input, args: ['mc-sidepanel-close',] }],
        mcSidepanelClose: [{ type: Input, args: ['mcSidepanelClose',] }]
    };
    return McSidepanelClose;
}());
/**
 * Header of a sidepanel.
 */
var McSidepanelHeader = /** @class */ (function () {
    function McSidepanelHeader() {
    }
    McSidepanelHeader.decorators = [
        { type: Component, args: [{
                    selector: 'mc-sidepanel-header',
                    template: "\n        <div class=\"mc-sidepanel-title\">\n            <ng-content></ng-content>\n        </div>\n        <button *ngIf=\"closeable\" mc-sidepanel-close>\n            <span class=\"mc-sidepanel-close-x\">\n                <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n            </span>\n        </button>\n    ",
                    host: {
                        class: 'mc-sidepanel-header'
                    }
                },] },
    ];
    McSidepanelHeader.propDecorators = {
        closeable: [{ type: Input }]
    };
    return McSidepanelHeader;
}());
/**
 * Scrollable content container of a sidepanel.
 */
var McSidepanelBody = /** @class */ (function () {
    function McSidepanelBody() {
    }
    McSidepanelBody.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody',
                    host: {
                        class: 'mc-sidepanel-body'
                    }
                },] },
    ];
    return McSidepanelBody;
}());
/**
 * Footer of a sidepanel.
 */
var McSidepanelFooter = /** @class */ (function () {
    function McSidepanelFooter() {
    }
    McSidepanelFooter.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter',
                    host: {
                        class: 'mc-sidepanel-footer'
                    }
                },] },
    ];
    return McSidepanelFooter;
}());
/**
 * Actions block of a sidepanel footer.
 */
var McSidepanelActions = /** @class */ (function () {
    function McSidepanelActions() {
    }
    McSidepanelActions.decorators = [
        { type: Directive, args: [{
                    selector: 'mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions',
                    host: {
                        class: 'mc-sidepanel-actions'
                    }
                },] },
    ];
    return McSidepanelActions;
}());
/**
 * Finds the closest McSidepanelRef to an element by looking at the DOM.
 * @param {?} element Element relative to which to look for a sidepanel.
 * @param {?} openSidepanels References to the currently-open sidepanels.
 * @return {?}
 */
function getClosestSidepanel(element, openSidepanels) {
    /** @type {?} */
    var parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mc-sidepanel-container')) {
        parent = parent.parentElement;
    }
    return parent ? openSidepanels.find((/**
     * @param {?} sidepanel
     * @return {?}
     */
    function (sidepanel) { return sidepanel.id === (/** @type {?} */ (parent)).id; })) : null;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McSidepanelModule = /** @class */ (function () {
    function McSidepanelModule() {
    }
    McSidepanelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        PortalModule,
                        McCommonModule,
                        McIconModule
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
                },] },
    ];
    return McSidepanelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McSidepanelModule, MC_SIDEPANEL_DEFAULT_OPTIONS, McSidepanelService, MC_SIDEPANEL_DATA, McSidepanelPosition, McSidepanelConfig, MC_SIDEPANEL_WITH_INDENT, MC_SIDEPANEL_WITH_SHADOW, McSidepanelContainerComponent, McSidepanelRef, mcSidepanelAnimations as ɵb19, mcSidepanelTransformAnimation as ɵa19, McSidepanelActions as ɵg19, McSidepanelBody as ɵe19, McSidepanelClose as ɵc19, McSidepanelFooter as ɵf19, McSidepanelHeader as ɵd19 };
//# sourceMappingURL=sidepanel.es5.js.map

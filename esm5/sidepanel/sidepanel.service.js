/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __read, __spread } from "tslib";
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { MC_SIDEPANEL_DATA, McSidepanelConfig } from './sidepanel-config';
import { McSidepanelContainerComponent, MC_SIDEPANEL_WITH_INDENT, MC_SIDEPANEL_WITH_SHADOW } from './sidepanel-container.component';
import { McSidepanelRef } from './sidepanel-ref';
/**
 * Injection token that can be used to specify default sidepanel options.
 * @type {?}
 */
export var MC_SIDEPANEL_DEFAULT_OPTIONS = new InjectionToken('mc-sidepanel-default-options');
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
        var fullConfig = __assign(__assign({}, (this.defaultOptions || new McSidepanelConfig())), config);
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
        var reversedOpenedSidepanels = __spread(sidepanels.reverse());
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
        { type: Injectable }
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
export { McSidepanelService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    McSidepanelService.prototype.openedSidepanelsAtThisLevel;
    /**
     * @type {?}
     * @private
     */
    McSidepanelService.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    McSidepanelService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    McSidepanelService.prototype.defaultOptions;
    /**
     * @type {?}
     * @private
     */
    McSidepanelService.prototype.parentSidepanelService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvc2lkZXBhbmVsLyIsInNvdXJjZXMiOlsic2lkZXBhbmVsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFpQixjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckcsT0FBTyxFQUVILE1BQU0sRUFDTixVQUFVLEVBQ1YsY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRSxPQUFPLEVBQ0gsNkJBQTZCLEVBQzdCLHdCQUF3QixFQUN4Qix3QkFBd0IsRUFDM0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBSWpELE1BQU0sS0FBTyw0QkFBNEIsR0FDckMsSUFBSSxjQUFjLENBQW9CLDhCQUE4QixDQUFDO0FBRXpFO0lBVUksNEJBQ1ksT0FBZ0IsRUFDaEIsUUFBa0IsRUFDZ0MsY0FBaUMsRUFDM0Qsc0JBQTBDO1FBSGxFLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNnQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDM0QsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFvQjtRQVp0RSxnQ0FBMkIsR0FBcUIsRUFBRSxDQUFDO0lBYTNELENBQUM7SUFWRCxzQkFBSSxnREFBZ0I7UUFEcEIsb0RBQW9EOzs7OztRQUNwRDtZQUNJLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FB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WixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7O2dCQXBLSixVQUFVOzs7O2dCQTFCRixPQUFPO2dCQU9aLFFBQVE7Z0JBTWdCLGlCQUFpQix1QkEwQnBDLFFBQVEsWUFBSSxNQUFNLFNBQUMsNEJBQTRCO2dCQUNRLGtCQUFrQix1QkFBekUsUUFBUSxZQUFJLFFBQVE7O0lBdUo3Qix5QkFBQztDQUFBLEFBcktELElBcUtDO1NBcEtZLGtCQUFrQjs7Ozs7O0lBQzNCLHlEQUEyRDs7Ozs7SUFTdkQscUNBQXdCOzs7OztJQUN4QixzQ0FBMEI7Ozs7O0lBQzFCLDRDQUEyRjs7Ozs7SUFDM0Ysb0RBQTBFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSwgUG9ydGFsSW5qZWN0b3IsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0YWJsZSxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbmplY3RvciwgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNQ19TSURFUEFORUxfREFUQSwgTWNTaWRlcGFuZWxDb25maWcgfSBmcm9tICcuL3NpZGVwYW5lbC1jb25maWcnO1xuaW1wb3J0IHtcbiAgICBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCxcbiAgICBNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQsXG4gICAgTUNfU0lERVBBTkVMX1dJVEhfU0hBRE9XXG59IGZyb20gJy4vc2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNTaWRlcGFuZWxSZWYgfSBmcm9tICcuL3NpZGVwYW5lbC1yZWYnO1xuXG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGRlZmF1bHQgc2lkZXBhbmVsIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUNfU0lERVBBTkVMX0RFRkFVTFRfT1BUSU9OUyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPE1jU2lkZXBhbmVsQ29uZmlnPignbWMtc2lkZXBhbmVsLWRlZmF1bHQtb3B0aW9ucycpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIG9wZW5lZFNpZGVwYW5lbHNBdFRoaXNMZXZlbDogTWNTaWRlcGFuZWxSZWZbXSA9IFtdO1xuXG4gICAgLyoqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50bHktb3BlbiBzaWRlcGFuZWxzLiAqL1xuICAgIGdldCBvcGVuZWRTaWRlcGFuZWxzKCk6IE1jU2lkZXBhbmVsUmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTaWRlcGFuZWxTZXJ2aWNlID8gdGhpcy5wYXJlbnRTaWRlcGFuZWxTZXJ2aWNlLm9wZW5lZFNpZGVwYW5lbHMgOlxuICAgICAgICAgICAgdGhpcy5vcGVuZWRTaWRlcGFuZWxzQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfU0lERVBBTkVMX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogTWNTaWRlcGFuZWxDb25maWcsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgcGFyZW50U2lkZXBhbmVsU2VydmljZTogTWNTaWRlcGFuZWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIE9ubHkgY2xvc2UgdGhlIHNpZGVwYW5lbHMgYXQgdGhpcyBsZXZlbCBvbiBkZXN0cm95XG4gICAgICAgIC8vIHNpbmNlIHRoZSBwYXJlbnQgc2VydmljZSBtYXkgc3RpbGwgYmUgYWN0aXZlLlxuICAgICAgICB0aGlzLmNsb3NlU2lkZXBhbmVscyh0aGlzLm9wZW5lZFNpZGVwYW5lbHNBdFRoaXNMZXZlbCk7XG4gICAgfVxuXG4gICAgb3BlbjxULCBEID0gYW55Pihjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgICAgICAgICAgICAgICAgICBjb25maWc/OiBNY1NpZGVwYW5lbENvbmZpZzxEPik6IE1jU2lkZXBhbmVsUmVmPFQ+IHtcbiAgICAgICAgY29uc3QgZnVsbENvbmZpZyA9IHtcbiAgICAgICAgICAgIC4uLih0aGlzLmRlZmF1bHRPcHRpb25zIHx8IG5ldyBNY1NpZGVwYW5lbENvbmZpZygpKSxcbiAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmdWxsQ29uZmlnLmlkICYmIHRoaXMuZ2V0U2lkZXBhbmVsQnlJZChmdWxsQ29uZmlnLmlkKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFNpZGVwYW5lbCB3aXRoIGlkIFwiJHtmdWxsQ29uZmlnLmlkfVwiIGV4aXN0cyBhbHJlYWR5LiBUaGUgc2lkZXBhbmVsIGlkIG11c3QgYmUgdW5pcXVlLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShmdWxsQ29uZmlnKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5hdHRhY2hDb250YWluZXIob3ZlcmxheVJlZiwgZnVsbENvbmZpZyk7XG4gICAgICAgIGNvbnN0IHJlZiA9IG5ldyBNY1NpZGVwYW5lbFJlZihjb250YWluZXIsIG92ZXJsYXlSZWYsIGZ1bGxDb25maWcpO1xuXG4gICAgICAgIGlmIChjb21wb25lbnRPclRlbXBsYXRlUmVmIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hdHRhY2hUZW1wbGF0ZVBvcnRhbChuZXcgVGVtcGxhdGVQb3J0YWw8VD4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgbnVsbCEsIHtcbiAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IGZ1bGxDb25maWcuZGF0YSxcbiAgICAgICAgICAgICAgICBzaWRlcGFuZWxSZWY6IHJlZlxuICAgICAgICAgICAgfSBhcyBhbnkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3RvcihmdWxsQ29uZmlnLCByZWYsIGNvbnRhaW5lcik7XG4gICAgICAgICAgICBjb25zdCBwb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIHVuZGVmaW5lZCwgaW5qZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudFJlZiA9IGNvbnRhaW5lci5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcblxuICAgICAgICAgICAgcmVmLmluc3RhbmNlID0gY29udGVudFJlZi5pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5wdXNoKHJlZik7XG4gICAgICAgIHJlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZU9wZW5TaWRlcGFuZWwocmVmKSk7XG4gICAgICAgIGNvbnRhaW5lci5lbnRlcigpO1xuXG4gICAgICAgIHJldHVybiByZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGFsbCBvZiB0aGUgY3VycmVudGx5LW9wZW4gc2lkZXBhbmVscy5cbiAgICAgKi9cbiAgICBjbG9zZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9zZVNpZGVwYW5lbHModGhpcy5vcGVuZWRTaWRlcGFuZWxzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbiBvcGVuIHNpZGVwYW5lbCBieSBpdHMgaWQuXG4gICAgICogQHBhcmFtIGlkIElEIHRvIHVzZSB3aGVuIGxvb2tpbmcgdXAgdGhlIHNpZGVwYW5lbC5cbiAgICAgKi9cbiAgICBnZXRTaWRlcGFuZWxCeUlkKGlkOiBzdHJpbmcpOiBNY1NpZGVwYW5lbFJlZiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuZmluZCgoc2lkZXBhbmVsKSA9PiBzaWRlcGFuZWwuaWQgPT09IGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgc2lkZXBhbmVsIGNvbnRhaW5lciBjb21wb25lbnQgdG8gdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhdHRhY2hDb250YWluZXIob3ZlcmxheVJlZjogT3ZlcmxheVJlZiwgY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3Qgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24gPSB0aGlzLmdldE9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uKGNvbmZpZyk7XG5cbiAgICAgICAgY29uc3QgaW5qZWN0b3IgPSBuZXcgUG9ydGFsSW5qZWN0b3IodGhpcy5pbmplY3RvciwgbmV3IFdlYWtNYXA8YW55PihbXG4gICAgICAgICAgICBbTWNTaWRlcGFuZWxDb25maWcsIGNvbmZpZ10sXG4gICAgICAgICAgICBbTUNfU0lERVBBTkVMX1dJVEhfSU5ERU5ULCBvcGVuZWRTaWRlcGFuZWxzV2l0aFNhbWVQb3NpdGlvbi5sZW5ndGggPj0gMV0sXG4gICAgICAgICAgICBbTUNfU0lERVBBTkVMX1dJVEhfU0hBRE9XLCBvcGVuZWRTaWRlcGFuZWxzV2l0aFNhbWVQb3NpdGlvbi5sZW5ndGggPCAyXSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgIF0pKTtcblxuICAgICAgICBjb25zdCBjb250YWluZXJQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50LCB1bmRlZmluZWQsIGluamVjdG9yKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVmOiBDb21wb25lbnRSZWY8TWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQ+ID0gb3ZlcmxheVJlZi5hdHRhY2goY29udGFpbmVyUG9ydGFsKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyUmVmLmluc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjdXN0b20gaW5qZWN0b3IgdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHNpZGVwYW5lbC4gVGhpcyBhbGxvd3MgYSBjb21wb25lbnQgbG9hZGVkIGluc2lkZVxuICAgICAqIG9mIGEgc2lkZXBhbmVsIHRvIGNsb3NlIGl0c2VsZiBhbmQsIG9wdGlvbmFsbHksIHRvIHJldHVybiBhIHZhbHVlLlxuICAgICAqIEBwYXJhbSBjb25maWcgQ29uZmlnIG9iamVjdCB0aGF0IGlzIHVzZWQgdG8gY29uc3RydWN0IHRoZSBzaWRlcGFuZWwuXG4gICAgICogQHBhcmFtIHNpZGVwYW5lbFJlZiBSZWZlcmVuY2UgdG8gdGhlIHNpZGVwYW5lbC5cbiAgICAgKiBAcGFyYW0gc2lkZXBhbmVsQ29udGFpbmVyIFNpZGVwYW5lbCBjb250YWluZXIgZWxlbWVudCB0aGF0IHdyYXBzIGFsbCBvZiB0aGUgY29udGVudHMuXG4gICAgICogQHJldHVybnMgVGhlIGN1c3RvbSBpbmplY3RvciB0aGF0IGNhbiBiZSB1c2VkIGluc2lkZSB0aGUgc2lkZXBhbmVsLlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlSW5qZWN0b3I8VD4oXG4gICAgICAgIGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcsXG4gICAgICAgIHNpZGVwYW5lbFJlZjogTWNTaWRlcGFuZWxSZWY8VD4sXG4gICAgICAgIHNpZGVwYW5lbENvbnRhaW5lcjogTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQpOiBQb3J0YWxJbmplY3RvciB7XG5cbiAgICAgICAgLy8gVGhlIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IGlzIGluamVjdGVkIGluIHRoZSBwb3J0YWwgYXMgdGhlIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IGFuZFxuICAgICAgICAvLyB0aGUgc2lkZXBhbmVsJ3MgY29udGVudCBhcmUgY3JlYXRlZCBvdXQgb2YgdGhlIHNhbWUgVmlld0NvbnRhaW5lclJlZiBhbmQgYXMgc3VjaCwgYXJlIHNpYmxpbmdzIGZvciBpbmplY3RvclxuICAgICAgICAvLyBwdXJwb3Nlcy4gVG8gYWxsb3cgdGhlIGhpZXJhcmNoeSB0aGF0IGlzIGV4cGVjdGVkLCB0aGUgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgaXMgZXhwbGljaXRseVxuICAgICAgICAvLyBhZGRlZCB0byB0aGUgaW5qZWN0aW9uIHRva2Vucy5cbiAgICAgICAgY29uc3QgaW5qZWN0aW9uVG9rZW5zID0gbmV3IFdlYWtNYXA8YW55PihbXG4gICAgICAgICAgICBbTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsIHNpZGVwYW5lbENvbnRhaW5lcl0sXG4gICAgICAgICAgICBbTUNfU0lERVBBTkVMX0RBVEEsIGNvbmZpZy5kYXRhXSxcbiAgICAgICAgICAgIFtNY1NpZGVwYW5lbFJlZiwgc2lkZXBhbmVsUmVmXVxuICAgICAgICBdKTtcblxuICAgICAgICByZXR1cm4gbmV3IFBvcnRhbEluamVjdG9yKHRoaXMuaW5qZWN0b3IsIGluamVjdGlvblRva2Vucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBvdmVybGF5IGFuZCBwbGFjZXMgaXQgaW4gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG4gICAgICogQHBhcmFtIGNvbmZpZyBUaGUgdXNlci1zcGVjaWZpZWQgc2lkZXBhbmVsIGNvbmZpZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IGNvbmZpZy5oYXNCYWNrZHJvcCxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuZ2V0QmFja2Ryb3BDbGFzcyhjb25maWcpLFxuICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6IGNvbmZpZy5vdmVybGF5UGFuZWxDbGFzcyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zZVNpZGVwYW5lbHMoc2lkZXBhbmVsczogTWNTaWRlcGFuZWxSZWZbXSkge1xuICAgICAgICBjb25zdCByZXZlcnNlZE9wZW5lZFNpZGVwYW5lbHMgPSBbLi4uc2lkZXBhbmVscy5yZXZlcnNlKCldO1xuXG4gICAgICAgIHJldmVyc2VkT3BlbmVkU2lkZXBhbmVscy5mb3JFYWNoKChzaWRlcGFuZWxSZWY6IE1jU2lkZXBhbmVsUmVmKSA9PiB7XG4gICAgICAgICAgICBzaWRlcGFuZWxSZWYuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCYWNrZHJvcENsYXNzKGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBoYXNPcGVuZWRTaWRlcGFuZWxXaXRoQmFja2Ryb3AgPVxuICAgICAgICAgICAgdGhpcy5vcGVuZWRTaWRlcGFuZWxzLnNvbWUoKHNpZGVwYW5lbFJlZikgPT4gc2lkZXBhbmVsUmVmLmNvbmZpZy5oYXNCYWNrZHJvcCEpO1xuXG4gICAgICAgIHJldHVybiBjb25maWcucmVxdWlyZWRCYWNrZHJvcCB8fCAhaGFzT3BlbmVkU2lkZXBhbmVsV2l0aEJhY2tkcm9wID8gJ2Nkay1vdmVybGF5LWRhcmstYmFja2Ryb3AnIDpcbiAgICAgICAgICAgICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPcGVuZWRTaWRlcGFuZWxzV2l0aFNhbWVQb3NpdGlvbihjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnKTogTWNTaWRlcGFuZWxSZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuZmlsdGVyKChzaWRlcGFuZWxSZWYpID0+IHNpZGVwYW5lbFJlZi5jb25maWcucG9zaXRpb24gPT09IGNvbmZpZy5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHNpZGVwYW5lbCBmcm9tIHRoZSBhcnJheSBvZiBvcGVuIHNpZGVwYW5lbHMuXG4gICAgICogQHBhcmFtIHNpZGVwYW5lbFJlZiBTaWRlcGFuZWwgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbW92ZU9wZW5TaWRlcGFuZWwoc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMub3BlbmVkU2lkZXBhbmVscy5pbmRleE9mKHNpZGVwYW5lbFJlZik7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export const MC_SIDEPANEL_DEFAULT_OPTIONS = new InjectionToken('mc-sidepanel-default-options');
export class McSidepanelService {
    /**
     * @param {?} overlay
     * @param {?} injector
     * @param {?} defaultOptions
     * @param {?} parentSidepanelService
     */
    constructor(overlay, injector, defaultOptions, parentSidepanelService) {
        this.overlay = overlay;
        this.injector = injector;
        this.defaultOptions = defaultOptions;
        this.parentSidepanelService = parentSidepanelService;
        this.openedSidepanelsAtThisLevel = [];
    }
    /**
     * Keeps track of the currently-open sidepanels.
     * @return {?}
     */
    get openedSidepanels() {
        return this.parentSidepanelService ? this.parentSidepanelService.openedSidepanels :
            this.openedSidepanelsAtThisLevel;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Only close the sidepanels at this level on destroy
        // since the parent service may still be active.
        this.closeSidepanels(this.openedSidepanelsAtThisLevel);
    }
    /**
     * @template T, D
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    open(componentOrTemplateRef, config) {
        /** @type {?} */
        const fullConfig = Object.assign(Object.assign({}, (this.defaultOptions || new McSidepanelConfig())), config);
        if (fullConfig.id && this.getSidepanelById(fullConfig.id)) {
            throw Error(`Sidepanel with id "${fullConfig.id}" exists already. The sidepanel id must be unique.`);
        }
        /** @type {?} */
        const overlayRef = this.createOverlay(fullConfig);
        /** @type {?} */
        const container = this.attachContainer(overlayRef, fullConfig);
        /** @type {?} */
        const ref = new McSidepanelRef(container, overlayRef, fullConfig);
        if (componentOrTemplateRef instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, (/** @type {?} */ (null)), (/** @type {?} */ ({
                $implicit: fullConfig.data,
                sidepanelRef: ref
            }))));
        }
        else {
            /** @type {?} */
            const injector = this.createInjector(fullConfig, ref, container);
            /** @type {?} */
            const portal = new ComponentPortal(componentOrTemplateRef, undefined, injector);
            /** @type {?} */
            const contentRef = container.attachComponentPortal(portal);
            ref.instance = contentRef.instance;
        }
        this.openedSidepanels.push(ref);
        ref.afterClosed().subscribe((/**
         * @return {?}
         */
        () => this.removeOpenSidepanel(ref)));
        container.enter();
        return ref;
    }
    /**
     * Closes all of the currently-open sidepanels.
     * @return {?}
     */
    closeAll() {
        this.closeSidepanels(this.openedSidepanels);
    }
    /**
     * Finds an open sidepanel by its id.
     * @param {?} id ID to use when looking up the sidepanel.
     * @return {?}
     */
    getSidepanelById(id) {
        return this.openedSidepanels.find((/**
         * @param {?} sidepanel
         * @return {?}
         */
        (sidepanel) => sidepanel.id === id));
    }
    /**
     * Attaches the sidepanel container component to the overlay.
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    attachContainer(overlayRef, config) {
        /** @type {?} */
        const openedSidepanelsWithSamePosition = this.getOpenedSidepanelsWithSamePosition(config);
        /** @type {?} */
        const injector = new PortalInjector(this.injector, new WeakMap([
            [McSidepanelConfig, config],
            [MC_SIDEPANEL_WITH_INDENT, openedSidepanelsWithSamePosition.length >= 1],
            [MC_SIDEPANEL_WITH_SHADOW, openedSidepanelsWithSamePosition.length < 2] // tslint:disable-line
        ]));
        /** @type {?} */
        const containerPortal = new ComponentPortal(McSidepanelContainerComponent, undefined, injector);
        /** @type {?} */
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
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
    createInjector(config, sidepanelRef, sidepanelContainer) {
        // The McSidepanelContainerComponent is injected in the portal as the McSidepanelContainerComponent and
        // the sidepanel's content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the McSidepanelContainerComponent is explicitly
        // added to the injection tokens.
        /** @type {?} */
        const injectionTokens = new WeakMap([
            [McSidepanelContainerComponent, sidepanelContainer],
            [MC_SIDEPANEL_DATA, config.data],
            [McSidepanelRef, sidepanelRef]
        ]);
        return new PortalInjector(this.injector, injectionTokens);
    }
    /**
     * Creates a new overlay and places it in the correct location.
     * @private
     * @param {?} config The user-specified sidepanel config.
     * @return {?}
     */
    createOverlay(config) {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: this.getBackdropClass(config),
            maxWidth: '100%',
            panelClass: config.overlayPanelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global()
        });
        return this.overlay.create(overlayConfig);
    }
    /**
     * @private
     * @param {?} sidepanels
     * @return {?}
     */
    closeSidepanels(sidepanels) {
        /** @type {?} */
        const reversedOpenedSidepanels = [...sidepanels.reverse()];
        reversedOpenedSidepanels.forEach((/**
         * @param {?} sidepanelRef
         * @return {?}
         */
        (sidepanelRef) => {
            sidepanelRef.close();
        }));
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    getBackdropClass(config) {
        /** @type {?} */
        const hasOpenedSidepanelWithBackdrop = this.openedSidepanels.some((/**
         * @param {?} sidepanelRef
         * @return {?}
         */
        (sidepanelRef) => (/** @type {?} */ (sidepanelRef.config.hasBackdrop))));
        return config.requiredBackdrop || !hasOpenedSidepanelWithBackdrop ? 'cdk-overlay-dark-backdrop' :
            'cdk-overlay-transparent-backdrop';
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    getOpenedSidepanelsWithSamePosition(config) {
        return this.openedSidepanels.filter((/**
         * @param {?} sidepanelRef
         * @return {?}
         */
        (sidepanelRef) => sidepanelRef.config.position === config.position));
    }
    /**
     * Removes a sidepanel from the array of open sidepanels.
     * @private
     * @param {?} sidepanelRef Sidepanel to be removed.
     * @return {?}
     */
    removeOpenSidepanel(sidepanelRef) {
        /** @type {?} */
        const index = this.openedSidepanels.indexOf(sidepanelRef);
        if (index > -1) {
            this.openedSidepanels.splice(index, 1);
        }
    }
}
McSidepanelService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
McSidepanelService.ctorParameters = () => [
    { type: Overlay },
    { type: Injector },
    { type: McSidepanelConfig, decorators: [{ type: Optional }, { type: Inject, args: [MC_SIDEPANEL_DEFAULT_OPTIONS,] }] },
    { type: McSidepanelService, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvc2lkZXBhbmVsLyIsInNvdXJjZXMiOlsic2lkZXBhbmVsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLHNCQUFzQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQWlCLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRyxPQUFPLEVBRUgsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsV0FBVyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFFLE9BQU8sRUFDSCw2QkFBNkIsRUFDN0Isd0JBQXdCLEVBQ3hCLHdCQUF3QixFQUMzQixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFJakQsTUFBTSxPQUFPLDRCQUE0QixHQUNyQyxJQUFJLGNBQWMsQ0FBb0IsOEJBQThCLENBQUM7QUFHekUsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7OztJQVMzQixZQUNZLE9BQWdCLEVBQ2hCLFFBQWtCLEVBQ2dDLGNBQWlDLEVBQzNELHNCQUEwQztRQUhsRSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDZ0MsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQzNELDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBb0I7UUFadEUsZ0NBQTJCLEdBQXFCLEVBQUUsQ0FBQztJQWEzRCxDQUFDOzs7OztJQVZELElBQUksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMs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O0lBU3ZELHFDQUF3Qjs7Ozs7SUFDeEIsc0NBQTBCOzs7OztJQUMxQiw0Q0FBMkY7Ozs7O0lBQzNGLG9EQUEwRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIENvbXBvbmVudFR5cGUsIFBvcnRhbEluamVjdG9yLCBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGFibGUsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5qZWN0b3IsIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBTa2lwU2VsZixcbiAgICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTUNfU0lERVBBTkVMX0RBVEEsIE1jU2lkZXBhbmVsQ29uZmlnIH0gZnJvbSAnLi9zaWRlcGFuZWwtY29uZmlnJztcbmltcG9ydCB7XG4gICAgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsXG4gICAgTUNfU0lERVBBTkVMX1dJVEhfSU5ERU5ULFxuICAgIE1DX1NJREVQQU5FTF9XSVRIX1NIQURPV1xufSBmcm9tICcuL3NpZGVwYW5lbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1jU2lkZXBhbmVsUmVmIH0gZnJvbSAnLi9zaWRlcGFuZWwtcmVmJztcblxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBkZWZhdWx0IHNpZGVwYW5lbCBvcHRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IE1DX1NJREVQQU5FTF9ERUZBVUxUX09QVElPTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxNY1NpZGVwYW5lbENvbmZpZz4oJ21jLXNpZGVwYW5lbC1kZWZhdWx0LW9wdGlvbnMnKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBvcGVuZWRTaWRlcGFuZWxzQXRUaGlzTGV2ZWw6IE1jU2lkZXBhbmVsUmVmW10gPSBbXTtcblxuICAgIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudGx5LW9wZW4gc2lkZXBhbmVscy4gKi9cbiAgICBnZXQgb3BlbmVkU2lkZXBhbmVscygpOiBNY1NpZGVwYW5lbFJlZltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2lkZXBhbmVsU2VydmljZSA/IHRoaXMucGFyZW50U2lkZXBhbmVsU2VydmljZS5vcGVuZWRTaWRlcGFuZWxzIDpcbiAgICAgICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVsc0F0VGhpc0xldmVsO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX1NJREVQQU5FTF9ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IE1jU2lkZXBhbmVsQ29uZmlnLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwcml2YXRlIHBhcmVudFNpZGVwYW5lbFNlcnZpY2U6IE1jU2lkZXBhbmVsU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICAvLyBPbmx5IGNsb3NlIHRoZSBzaWRlcGFuZWxzIGF0IHRoaXMgbGV2ZWwgb24gZGVzdHJveVxuICAgICAgICAvLyBzaW5jZSB0aGUgcGFyZW50IHNlcnZpY2UgbWF5IHN0aWxsIGJlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5jbG9zZVNpZGVwYW5lbHModGhpcy5vcGVuZWRTaWRlcGFuZWxzQXRUaGlzTGV2ZWwpO1xuICAgIH1cblxuICAgIG9wZW48VCwgRCA9IGFueT4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgY29uZmlnPzogTWNTaWRlcGFuZWxDb25maWc8RD4pOiBNY1NpZGVwYW5lbFJlZjxUPiB7XG4gICAgICAgIGNvbnN0IGZ1bGxDb25maWcgPSB7XG4gICAgICAgICAgICAuLi4odGhpcy5kZWZhdWx0T3B0aW9ucyB8fCBuZXcgTWNTaWRlcGFuZWxDb25maWcoKSksXG4gICAgICAgICAgICAuLi5jb25maWdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZnVsbENvbmZpZy5pZCAmJiB0aGlzLmdldFNpZGVwYW5lbEJ5SWQoZnVsbENvbmZpZy5pZCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBTaWRlcGFuZWwgd2l0aCBpZCBcIiR7ZnVsbENvbmZpZy5pZH1cIiBleGlzdHMgYWxyZWFkeS4gVGhlIHNpZGVwYW5lbCBpZCBtdXN0IGJlIHVuaXF1ZS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoZnVsbENvbmZpZyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuYXR0YWNoQ29udGFpbmVyKG92ZXJsYXlSZWYsIGZ1bGxDb25maWcpO1xuICAgICAgICBjb25zdCByZWYgPSBuZXcgTWNTaWRlcGFuZWxSZWYoY29udGFpbmVyLCBvdmVybGF5UmVmLCBmdWxsQ29uZmlnKTtcblxuICAgICAgICBpZiAoY29tcG9uZW50T3JUZW1wbGF0ZVJlZiBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICBjb250YWluZXIuYXR0YWNoVGVtcGxhdGVQb3J0YWwobmV3IFRlbXBsYXRlUG9ydGFsPFQ+KGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIG51bGwhLCB7XG4gICAgICAgICAgICAgICAgJGltcGxpY2l0OiBmdWxsQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICAgICAgc2lkZXBhbmVsUmVmOiByZWZcbiAgICAgICAgICAgIH0gYXMgYW55KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuY3JlYXRlSW5qZWN0b3IoZnVsbENvbmZpZywgcmVmLCBjb250YWluZXIpO1xuICAgICAgICAgICAgY29uc3QgcG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRPclRlbXBsYXRlUmVmLCB1bmRlZmluZWQsIGluamVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBjb250YWluZXIuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG5cbiAgICAgICAgICAgIHJlZi5pbnN0YW5jZSA9IGNvbnRlbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5lZFNpZGVwYW5lbHMucHVzaChyZWYpO1xuICAgICAgICByZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVPcGVuU2lkZXBhbmVsKHJlZikpO1xuICAgICAgICBjb250YWluZXIuZW50ZXIoKTtcblxuICAgICAgICByZXR1cm4gcmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyBhbGwgb2YgdGhlIGN1cnJlbnRseS1vcGVuIHNpZGVwYW5lbHMuXG4gICAgICovXG4gICAgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2VTaWRlcGFuZWxzKHRoaXMub3BlbmVkU2lkZXBhbmVscyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW4gb3BlbiBzaWRlcGFuZWwgYnkgaXRzIGlkLlxuICAgICAqIEBwYXJhbSBpZCBJRCB0byB1c2Ugd2hlbiBsb29raW5nIHVwIHRoZSBzaWRlcGFuZWwuXG4gICAgICovXG4gICAgZ2V0U2lkZXBhbmVsQnlJZChpZDogc3RyaW5nKTogTWNTaWRlcGFuZWxSZWYgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRTaWRlcGFuZWxzLmZpbmQoKHNpZGVwYW5lbCkgPT4gc2lkZXBhbmVsLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgdGhlIHNpZGVwYW5lbCBjb250YWluZXIgY29tcG9uZW50IHRvIHRoZSBvdmVybGF5LlxuICAgICAqL1xuICAgIHByaXZhdGUgYXR0YWNoQ29udGFpbmVyKG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0IG9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uID0gdGhpcy5nZXRPcGVuZWRTaWRlcGFuZWxzV2l0aFNhbWVQb3NpdGlvbihjb25maWcpO1xuXG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gbmV3IFBvcnRhbEluamVjdG9yKHRoaXMuaW5qZWN0b3IsIG5ldyBXZWFrTWFwPGFueT4oW1xuICAgICAgICAgICAgW01jU2lkZXBhbmVsQ29uZmlnLCBjb25maWddLFxuICAgICAgICAgICAgW01DX1NJREVQQU5FTF9XSVRIX0lOREVOVCwgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24ubGVuZ3RoID49IDFdLFxuICAgICAgICAgICAgW01DX1NJREVQQU5FTF9XSVRIX1NIQURPVywgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24ubGVuZ3RoIDwgMl0gLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICBdKSk7XG5cbiAgICAgICAgY29uc3QgY29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCwgdW5kZWZpbmVkLCBpbmplY3Rvcik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50PiA9IG92ZXJsYXlSZWYuYXR0YWNoKGNvbnRhaW5lclBvcnRhbCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY3VzdG9tIGluamVjdG9yIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSBzaWRlcGFuZWwuIFRoaXMgYWxsb3dzIGEgY29tcG9uZW50IGxvYWRlZCBpbnNpZGVcbiAgICAgKiBvZiBhIHNpZGVwYW5lbCB0byBjbG9zZSBpdHNlbGYgYW5kLCBvcHRpb25hbGx5LCB0byByZXR1cm4gYSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZyBvYmplY3QgdGhhdCBpcyB1c2VkIHRvIGNvbnN0cnVjdCB0aGUgc2lkZXBhbmVsLlxuICAgICAqIEBwYXJhbSBzaWRlcGFuZWxSZWYgUmVmZXJlbmNlIHRvIHRoZSBzaWRlcGFuZWwuXG4gICAgICogQHBhcmFtIHNpZGVwYW5lbENvbnRhaW5lciBTaWRlcGFuZWwgY29udGFpbmVyIGVsZW1lbnQgdGhhdCB3cmFwcyBhbGwgb2YgdGhlIGNvbnRlbnRzLlxuICAgICAqIEByZXR1cm5zIFRoZSBjdXN0b20gaW5qZWN0b3IgdGhhdCBjYW4gYmUgdXNlZCBpbnNpZGUgdGhlIHNpZGVwYW5lbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUluamVjdG9yPFQ+KFxuICAgICAgICBjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnLFxuICAgICAgICBzaWRlcGFuZWxSZWY6IE1jU2lkZXBhbmVsUmVmPFQ+LFxuICAgICAgICBzaWRlcGFuZWxDb250YWluZXI6IE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50KTogUG9ydGFsSW5qZWN0b3Ige1xuXG4gICAgICAgIC8vIFRoZSBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCBpcyBpbmplY3RlZCBpbiB0aGUgcG9ydGFsIGFzIHRoZSBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCBhbmRcbiAgICAgICAgLy8gdGhlIHNpZGVwYW5lbCdzIGNvbnRlbnQgYXJlIGNyZWF0ZWQgb3V0IG9mIHRoZSBzYW1lIFZpZXdDb250YWluZXJSZWYgYW5kIGFzIHN1Y2gsIGFyZSBzaWJsaW5ncyBmb3IgaW5qZWN0b3JcbiAgICAgICAgLy8gcHVycG9zZXMuIFRvIGFsbG93IHRoZSBoaWVyYXJjaHkgdGhhdCBpcyBleHBlY3RlZCwgdGhlIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IGlzIGV4cGxpY2l0bHlcbiAgICAgICAgLy8gYWRkZWQgdG8gdGhlIGluamVjdGlvbiB0b2tlbnMuXG4gICAgICAgIGNvbnN0IGluamVjdGlvblRva2VucyA9IG5ldyBXZWFrTWFwPGFueT4oW1xuICAgICAgICAgICAgW01jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50LCBzaWRlcGFuZWxDb250YWluZXJdLFxuICAgICAgICAgICAgW01DX1NJREVQQU5FTF9EQVRBLCBjb25maWcuZGF0YV0sXG4gICAgICAgICAgICBbTWNTaWRlcGFuZWxSZWYsIHNpZGVwYW5lbFJlZl1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQb3J0YWxJbmplY3Rvcih0aGlzLmluamVjdG9yLCBpbmplY3Rpb25Ub2tlbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgb3ZlcmxheSBhbmQgcGxhY2VzIGl0IGluIHRoZSBjb3JyZWN0IGxvY2F0aW9uLlxuICAgICAqIEBwYXJhbSBjb25maWcgVGhlIHVzZXItc3BlY2lmaWVkIHNpZGVwYW5lbCBjb25maWcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiBjb25maWcuaGFzQmFja2Ryb3AsXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmdldEJhY2tkcm9wQ2xhc3MoY29uZmlnKSxcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBwYW5lbENsYXNzOiBjb25maWcub3ZlcmxheVBhbmVsQ2xhc3MsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xvc2VTaWRlcGFuZWxzKHNpZGVwYW5lbHM6IE1jU2lkZXBhbmVsUmVmW10pIHtcbiAgICAgICAgY29uc3QgcmV2ZXJzZWRPcGVuZWRTaWRlcGFuZWxzID0gWy4uLnNpZGVwYW5lbHMucmV2ZXJzZSgpXTtcblxuICAgICAgICByZXZlcnNlZE9wZW5lZFNpZGVwYW5lbHMuZm9yRWFjaCgoc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZikgPT4ge1xuICAgICAgICAgICAgc2lkZXBhbmVsUmVmLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QmFja2Ryb3BDbGFzcyhjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaGFzT3BlbmVkU2lkZXBhbmVsV2l0aEJhY2tkcm9wID1cbiAgICAgICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5zb21lKChzaWRlcGFuZWxSZWYpID0+IHNpZGVwYW5lbFJlZi5jb25maWcuaGFzQmFja2Ryb3AhKTtcblxuICAgICAgICByZXR1cm4gY29uZmlnLnJlcXVpcmVkQmFja2Ryb3AgfHwgIWhhc09wZW5lZFNpZGVwYW5lbFdpdGhCYWNrZHJvcCA/ICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyA6XG4gICAgICAgICAgICAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24oY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE1jU2lkZXBhbmVsUmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRTaWRlcGFuZWxzLmZpbHRlcigoc2lkZXBhbmVsUmVmKSA9PiBzaWRlcGFuZWxSZWYuY29uZmlnLnBvc2l0aW9uID09PSBjb25maWcucG9zaXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBzaWRlcGFuZWwgZnJvbSB0aGUgYXJyYXkgb2Ygb3BlbiBzaWRlcGFuZWxzLlxuICAgICAqIEBwYXJhbSBzaWRlcGFuZWxSZWYgU2lkZXBhbmVsIHRvIGJlIHJlbW92ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmVPcGVuU2lkZXBhbmVsKHNpZGVwYW5lbFJlZjogTWNTaWRlcGFuZWxSZWYpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuaW5kZXhPZihzaWRlcGFuZWxSZWYpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
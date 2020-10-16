/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        // tslint:disable-next-line:deprecation
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
    createInjector(config, sidepanelRef, 
    // tslint:disable-next-line:deprecation
    sidepanelContainer) {
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
        // tslint:disable-next-line:deprecation
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9zaWRlcGFuZWwvIiwic291cmNlcyI6WyJzaWRlcGFuZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBaUIsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JHLE9BQU8sRUFFSCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUNILDZCQUE2QixFQUM3Qix3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQzNCLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUlqRCxNQUFNLE9BQU8sNEJBQTRCLEdBQ3JDLElBQUksY0FBYyxDQUFvQiw4QkFBOEIsQ0FBQztBQUd6RSxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7O0lBUzNCLFlBQ1ksT0FBZ0IsRUFDaEIsUUFBa0IsRUFDZ0MsY0FBaUMsRUFDM0Qsc0JBQTBDO1FBSGxFLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNnQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDM0QsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFvQjtRQVp0RSxnQ0FBMkIsR0FBcUIsRUFBRSxDQUFDO0lBYTNELENBQUM7Ozs7O0lBVkQsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsc0JB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QXpFLFFBQVEsWUFBSSxRQUFROzs7Ozs7O0lBWnpCLHlEQUEyRDs7Ozs7SUFTdkQscUNBQXdCOzs7OztJQUN4QixzQ0FBMEI7Ozs7O0lBQzFCLDRDQUEyRjs7Ozs7SUFDM0Ysb0RBQTBFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSwgUG9ydGFsSW5qZWN0b3IsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0YWJsZSxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbmplY3RvciwgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNQ19TSURFUEFORUxfREFUQSwgTWNTaWRlcGFuZWxDb25maWcgfSBmcm9tICcuL3NpZGVwYW5lbC1jb25maWcnO1xuaW1wb3J0IHtcbiAgICBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCxcbiAgICBNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQsXG4gICAgTUNfU0lERVBBTkVMX1dJVEhfU0hBRE9XXG59IGZyb20gJy4vc2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNTaWRlcGFuZWxSZWYgfSBmcm9tICcuL3NpZGVwYW5lbC1yZWYnO1xuXG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGRlZmF1bHQgc2lkZXBhbmVsIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUNfU0lERVBBTkVMX0RFRkFVTFRfT1BUSU9OUyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPE1jU2lkZXBhbmVsQ29uZmlnPignbWMtc2lkZXBhbmVsLWRlZmF1bHQtb3B0aW9ucycpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIG9wZW5lZFNpZGVwYW5lbHNBdFRoaXNMZXZlbDogTWNTaWRlcGFuZWxSZWZbXSA9IFtdO1xuXG4gICAgLyoqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50bHktb3BlbiBzaWRlcGFuZWxzLiAqL1xuICAgIGdldCBvcGVuZWRTaWRlcGFuZWxzKCk6IE1jU2lkZXBhbmVsUmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTaWRlcGFuZWxTZXJ2aWNlID8gdGhpcy5wYXJlbnRTaWRlcGFuZWxTZXJ2aWNlLm9wZW5lZFNpZGVwYW5lbHMgOlxuICAgICAgICAgICAgdGhpcy5vcGVuZWRTaWRlcGFuZWxzQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfU0lERVBBTkVMX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogTWNTaWRlcGFuZWxDb25maWcsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgcGFyZW50U2lkZXBhbmVsU2VydmljZTogTWNTaWRlcGFuZWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIE9ubHkgY2xvc2UgdGhlIHNpZGVwYW5lbHMgYXQgdGhpcyBsZXZlbCBvbiBkZXN0cm95XG4gICAgICAgIC8vIHNpbmNlIHRoZSBwYXJlbnQgc2VydmljZSBtYXkgc3RpbGwgYmUgYWN0aXZlLlxuICAgICAgICB0aGlzLmNsb3NlU2lkZXBhbmVscyh0aGlzLm9wZW5lZFNpZGVwYW5lbHNBdFRoaXNMZXZlbCk7XG4gICAgfVxuXG4gICAgb3BlbjxULCBEID0gYW55Pihjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgICAgICAgICAgICAgICAgICBjb25maWc/OiBNY1NpZGVwYW5lbENvbmZpZzxEPik6IE1jU2lkZXBhbmVsUmVmPFQ+IHtcbiAgICAgICAgY29uc3QgZnVsbENvbmZpZyA9IHtcbiAgICAgICAgICAgIC4uLih0aGlzLmRlZmF1bHRPcHRpb25zIHx8IG5ldyBNY1NpZGVwYW5lbENvbmZpZygpKSxcbiAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmdWxsQ29uZmlnLmlkICYmIHRoaXMuZ2V0U2lkZXBhbmVsQnlJZChmdWxsQ29uZmlnLmlkKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFNpZGVwYW5lbCB3aXRoIGlkIFwiJHtmdWxsQ29uZmlnLmlkfVwiIGV4aXN0cyBhbHJlYWR5LiBUaGUgc2lkZXBhbmVsIGlkIG11c3QgYmUgdW5pcXVlLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShmdWxsQ29uZmlnKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5hdHRhY2hDb250YWluZXIob3ZlcmxheVJlZiwgZnVsbENvbmZpZyk7XG4gICAgICAgIGNvbnN0IHJlZiA9IG5ldyBNY1NpZGVwYW5lbFJlZihjb250YWluZXIsIG92ZXJsYXlSZWYsIGZ1bGxDb25maWcpO1xuXG4gICAgICAgIGlmIChjb21wb25lbnRPclRlbXBsYXRlUmVmIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hdHRhY2hUZW1wbGF0ZVBvcnRhbChuZXcgVGVtcGxhdGVQb3J0YWw8VD4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgbnVsbCEsIHtcbiAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IGZ1bGxDb25maWcuZGF0YSxcbiAgICAgICAgICAgICAgICBzaWRlcGFuZWxSZWY6IHJlZlxuICAgICAgICAgICAgfSBhcyBhbnkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3RvcihmdWxsQ29uZmlnLCByZWYsIGNvbnRhaW5lcik7XG4gICAgICAgICAgICBjb25zdCBwb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIHVuZGVmaW5lZCwgaW5qZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudFJlZiA9IGNvbnRhaW5lci5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcblxuICAgICAgICAgICAgcmVmLmluc3RhbmNlID0gY29udGVudFJlZi5pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5wdXNoKHJlZik7XG4gICAgICAgIHJlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZU9wZW5TaWRlcGFuZWwocmVmKSk7XG4gICAgICAgIGNvbnRhaW5lci5lbnRlcigpO1xuXG4gICAgICAgIHJldHVybiByZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGFsbCBvZiB0aGUgY3VycmVudGx5LW9wZW4gc2lkZXBhbmVscy5cbiAgICAgKi9cbiAgICBjbG9zZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9zZVNpZGVwYW5lbHModGhpcy5vcGVuZWRTaWRlcGFuZWxzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbiBvcGVuIHNpZGVwYW5lbCBieSBpdHMgaWQuXG4gICAgICogQHBhcmFtIGlkIElEIHRvIHVzZSB3aGVuIGxvb2tpbmcgdXAgdGhlIHNpZGVwYW5lbC5cbiAgICAgKi9cbiAgICBnZXRTaWRlcGFuZWxCeUlkKGlkOiBzdHJpbmcpOiBNY1NpZGVwYW5lbFJlZiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuZmluZCgoc2lkZXBhbmVsKSA9PiBzaWRlcGFuZWwuaWQgPT09IGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgc2lkZXBhbmVsIGNvbnRhaW5lciBjb21wb25lbnQgdG8gdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhdHRhY2hDb250YWluZXIob3ZlcmxheVJlZjogT3ZlcmxheVJlZiwgY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3Qgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24gPSB0aGlzLmdldE9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uKGNvbmZpZyk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gbmV3IFBvcnRhbEluamVjdG9yKHRoaXMuaW5qZWN0b3IsIG5ldyBXZWFrTWFwPGFueT4oW1xuICAgICAgICAgICAgW01jU2lkZXBhbmVsQ29uZmlnLCBjb25maWddLFxuICAgICAgICAgICAgW01DX1NJREVQQU5FTF9XSVRIX0lOREVOVCwgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24ubGVuZ3RoID49IDFdLFxuICAgICAgICAgICAgW01DX1NJREVQQU5FTF9XSVRIX1NIQURPVywgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24ubGVuZ3RoIDwgMl0gLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICBdKSk7XG5cbiAgICAgICAgY29uc3QgY29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCwgdW5kZWZpbmVkLCBpbmplY3Rvcik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50PiA9IG92ZXJsYXlSZWYuYXR0YWNoKGNvbnRhaW5lclBvcnRhbCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY3VzdG9tIGluamVjdG9yIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSBzaWRlcGFuZWwuIFRoaXMgYWxsb3dzIGEgY29tcG9uZW50IGxvYWRlZCBpbnNpZGVcbiAgICAgKiBvZiBhIHNpZGVwYW5lbCB0byBjbG9zZSBpdHNlbGYgYW5kLCBvcHRpb25hbGx5LCB0byByZXR1cm4gYSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZyBvYmplY3QgdGhhdCBpcyB1c2VkIHRvIGNvbnN0cnVjdCB0aGUgc2lkZXBhbmVsLlxuICAgICAqIEBwYXJhbSBzaWRlcGFuZWxSZWYgUmVmZXJlbmNlIHRvIHRoZSBzaWRlcGFuZWwuXG4gICAgICogQHBhcmFtIHNpZGVwYW5lbENvbnRhaW5lciBTaWRlcGFuZWwgY29udGFpbmVyIGVsZW1lbnQgdGhhdCB3cmFwcyBhbGwgb2YgdGhlIGNvbnRlbnRzLlxuICAgICAqIEByZXR1cm5zIFRoZSBjdXN0b20gaW5qZWN0b3IgdGhhdCBjYW4gYmUgdXNlZCBpbnNpZGUgdGhlIHNpZGVwYW5lbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUluamVjdG9yPFQ+KFxuICAgICAgICBjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnLFxuICAgICAgICBzaWRlcGFuZWxSZWY6IE1jU2lkZXBhbmVsUmVmPFQ+LFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgc2lkZXBhbmVsQ29udGFpbmVyOiBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCk6IFBvcnRhbEluamVjdG9yIHtcblxuICAgICAgICAvLyBUaGUgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgaXMgaW5qZWN0ZWQgaW4gdGhlIHBvcnRhbCBhcyB0aGUgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgYW5kXG4gICAgICAgIC8vIHRoZSBzaWRlcGFuZWwncyBjb250ZW50IGFyZSBjcmVhdGVkIG91dCBvZiB0aGUgc2FtZSBWaWV3Q29udGFpbmVyUmVmIGFuZCBhcyBzdWNoLCBhcmUgc2libGluZ3MgZm9yIGluamVjdG9yXG4gICAgICAgIC8vIHB1cnBvc2VzLiBUbyBhbGxvdyB0aGUgaGllcmFyY2h5IHRoYXQgaXMgZXhwZWN0ZWQsIHRoZSBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCBpcyBleHBsaWNpdGx5XG4gICAgICAgIC8vIGFkZGVkIHRvIHRoZSBpbmplY3Rpb24gdG9rZW5zLlxuICAgICAgICBjb25zdCBpbmplY3Rpb25Ub2tlbnMgPSBuZXcgV2Vha01hcDxhbnk+KFtcbiAgICAgICAgICAgIFtNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCwgc2lkZXBhbmVsQ29udGFpbmVyXSxcbiAgICAgICAgICAgIFtNQ19TSURFUEFORUxfREFUQSwgY29uZmlnLmRhdGFdLFxuICAgICAgICAgICAgW01jU2lkZXBhbmVsUmVmLCBzaWRlcGFuZWxSZWZdXG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gbmV3IFBvcnRhbEluamVjdG9yKHRoaXMuaW5qZWN0b3IsIGluamVjdGlvblRva2Vucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBvdmVybGF5IGFuZCBwbGFjZXMgaXQgaW4gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG4gICAgICogQHBhcmFtIGNvbmZpZyBUaGUgdXNlci1zcGVjaWZpZWQgc2lkZXBhbmVsIGNvbmZpZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IGNvbmZpZy5oYXNCYWNrZHJvcCxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuZ2V0QmFja2Ryb3BDbGFzcyhjb25maWcpLFxuICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6IGNvbmZpZy5vdmVybGF5UGFuZWxDbGFzcyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zZVNpZGVwYW5lbHMoc2lkZXBhbmVsczogTWNTaWRlcGFuZWxSZWZbXSkge1xuICAgICAgICBjb25zdCByZXZlcnNlZE9wZW5lZFNpZGVwYW5lbHMgPSBbLi4uc2lkZXBhbmVscy5yZXZlcnNlKCldO1xuXG4gICAgICAgIHJldmVyc2VkT3BlbmVkU2lkZXBhbmVscy5mb3JFYWNoKChzaWRlcGFuZWxSZWY6IE1jU2lkZXBhbmVsUmVmKSA9PiB7XG4gICAgICAgICAgICBzaWRlcGFuZWxSZWYuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCYWNrZHJvcENsYXNzKGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBoYXNPcGVuZWRTaWRlcGFuZWxXaXRoQmFja2Ryb3AgPVxuICAgICAgICAgICAgdGhpcy5vcGVuZWRTaWRlcGFuZWxzLnNvbWUoKHNpZGVwYW5lbFJlZikgPT4gc2lkZXBhbmVsUmVmLmNvbmZpZy5oYXNCYWNrZHJvcCEpO1xuXG4gICAgICAgIHJldHVybiBjb25maWcucmVxdWlyZWRCYWNrZHJvcCB8fCAhaGFzT3BlbmVkU2lkZXBhbmVsV2l0aEJhY2tkcm9wID8gJ2Nkay1vdmVybGF5LWRhcmstYmFja2Ryb3AnIDpcbiAgICAgICAgICAgICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPcGVuZWRTaWRlcGFuZWxzV2l0aFNhbWVQb3NpdGlvbihjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnKTogTWNTaWRlcGFuZWxSZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuZmlsdGVyKChzaWRlcGFuZWxSZWYpID0+IHNpZGVwYW5lbFJlZi5jb25maWcucG9zaXRpb24gPT09IGNvbmZpZy5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHNpZGVwYW5lbCBmcm9tIHRoZSBhcnJheSBvZiBvcGVuIHNpZGVwYW5lbHMuXG4gICAgICogQHBhcmFtIHNpZGVwYW5lbFJlZiBTaWRlcGFuZWwgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbW92ZU9wZW5TaWRlcGFuZWwoc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMub3BlbmVkU2lkZXBhbmVscy5pbmRleE9mKHNpZGVwYW5lbFJlZik7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { MC_SIDEPANEL_DATA, McSidepanelConfig } from './sidepanel-config';
import { McSidepanelContainerComponent, MC_SIDEPANEL_WITH_INDENT, MC_SIDEPANEL_WITH_SHADOW } from './sidepanel-container.component';
import { McSidepanelRef } from './sidepanel-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./sidepanel-config";
/** Injection token that can be used to specify default sidepanel options. */
export const MC_SIDEPANEL_DEFAULT_OPTIONS = new InjectionToken('mc-sidepanel-default-options');
export class McSidepanelService {
    constructor(overlay, injector, defaultOptions, parentSidepanelService) {
        this.overlay = overlay;
        this.injector = injector;
        this.defaultOptions = defaultOptions;
        this.parentSidepanelService = parentSidepanelService;
        this.openedSidepanelsAtThisLevel = [];
    }
    /** Keeps track of the currently-open sidepanels. */
    get openedSidepanels() {
        return this.parentSidepanelService ? this.parentSidepanelService.openedSidepanels :
            this.openedSidepanelsAtThisLevel;
    }
    ngOnDestroy() {
        // Only close the sidepanels at this level on destroy
        // since the parent service may still be active.
        this.closeSidepanels(this.openedSidepanelsAtThisLevel);
    }
    open(componentOrTemplateRef, config) {
        const fullConfig = Object.assign(Object.assign({}, (this.defaultOptions || new McSidepanelConfig())), config);
        if (fullConfig.id && this.getSidepanelById(fullConfig.id)) {
            throw Error(`Sidepanel with id "${fullConfig.id}" exists already. The sidepanel id must be unique.`);
        }
        const overlayRef = this.createOverlay(fullConfig);
        const container = this.attachContainer(overlayRef, fullConfig);
        const ref = new McSidepanelRef(container, overlayRef, fullConfig);
        if (componentOrTemplateRef instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, null, {
                $implicit: fullConfig.data,
                sidepanelRef: ref
            }));
        }
        else {
            const injector = this.createInjector(fullConfig, ref, container);
            const portal = new ComponentPortal(componentOrTemplateRef, undefined, injector);
            const contentRef = container.attachComponentPortal(portal);
            ref.instance = contentRef.instance;
        }
        this.openedSidepanels.push(ref);
        ref.afterClosed().subscribe(() => this.removeOpenSidepanel(ref));
        container.enter();
        return ref;
    }
    /**
     * Closes all of the currently-open sidepanels.
     */
    closeAll() {
        this.closeSidepanels(this.openedSidepanels);
    }
    /**
     * Finds an open sidepanel by its id.
     * @param id ID to use when looking up the sidepanel.
     */
    getSidepanelById(id) {
        return this.openedSidepanels.find((sidepanel) => sidepanel.id === id);
    }
    /**
     * Attaches the sidepanel container component to the overlay.
     */
    attachContainer(overlayRef, config) {
        const openedSidepanelsWithSamePosition = this.getOpenedSidepanelsWithSamePosition(config);
        // tslint:disable-next-line:deprecation
        const injector = new PortalInjector(this.injector, new WeakMap([
            [McSidepanelConfig, config],
            [MC_SIDEPANEL_WITH_INDENT, openedSidepanelsWithSamePosition.length >= 1],
            [MC_SIDEPANEL_WITH_SHADOW, openedSidepanelsWithSamePosition.length < 2] // tslint:disable-line
        ]));
        const containerPortal = new ComponentPortal(McSidepanelContainerComponent, undefined, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    /**
     * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
     * of a sidepanel to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the sidepanel.
     * @param sidepanelRef Reference to the sidepanel.
     * @param sidepanelContainer Sidepanel container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the sidepanel.
     */
    createInjector(config, sidepanelRef, 
    // tslint:disable-next-line:deprecation
    sidepanelContainer) {
        // The McSidepanelContainerComponent is injected in the portal as the McSidepanelContainerComponent and
        // the sidepanel's content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the McSidepanelContainerComponent is explicitly
        // added to the injection tokens.
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
     * @param config The user-specified sidepanel config.
     */
    createOverlay(config) {
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
    closeSidepanels(sidepanels) {
        const reversedOpenedSidepanels = [...sidepanels.reverse()];
        reversedOpenedSidepanels.forEach((sidepanelRef) => {
            sidepanelRef.close();
        });
    }
    getBackdropClass(config) {
        const hasOpenedSidepanelWithBackdrop = this.openedSidepanels.some((sidepanelRef) => sidepanelRef.config.hasBackdrop);
        return config.requiredBackdrop || !hasOpenedSidepanelWithBackdrop ? 'cdk-overlay-dark-backdrop' :
            'cdk-overlay-transparent-backdrop';
    }
    getOpenedSidepanelsWithSamePosition(config) {
        return this.openedSidepanels.filter((sidepanelRef) => sidepanelRef.config.position === config.position);
    }
    /**
     * Removes a sidepanel from the array of open sidepanels.
     * @param sidepanelRef Sidepanel to be removed.
     */
    removeOpenSidepanel(sidepanelRef) {
        const index = this.openedSidepanels.indexOf(sidepanelRef);
        if (index > -1) {
            this.openedSidepanels.splice(index, 1);
        }
    }
}
/** @nocollapse */ McSidepanelService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: MC_SIDEPANEL_DEFAULT_OPTIONS, optional: true }, { token: McSidepanelService, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ McSidepanelService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: i2.McSidepanelConfig, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_SIDEPANEL_DEFAULT_OPTIONS]
                }] }, { type: McSidepanelService, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBaUIsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JHLE9BQU8sRUFFSCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUNILDZCQUE2QixFQUM3Qix3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQzNCLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBR2pELDZFQUE2RTtBQUM3RSxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FDckMsSUFBSSxjQUFjLENBQW9CLDhCQUE4QixDQUFDLENBQUM7QUFHMUUsTUFBTSxPQUFPLGtCQUFrQjtJQVMzQixZQUNZLE9BQWdCLEVBQ2hCLFFBQWtCLEVBQ2dDLGNBQWlDLEVBQzNELHNCQUEwQztRQUhsRSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDZ0MsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQzNELDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBb0I7UUFadEUsZ0NBQTJCLEdBQXFCLEVBQUUsQ0FBQztJQWEzRCxDQUFDO0lBWEQsb0RBQW9EO0lBQ3BELElBQUksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFB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WixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7O2tJQXRLUSxrQkFBa0IsaUVBWUgsNEJBQTRCLDZCQUNRLGtCQUFrQjtzSUFickUsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVU7OzBCQWFGLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsNEJBQTRCOzhCQUNRLGtCQUFrQjswQkFBekUsUUFBUTs7MEJBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIENvbXBvbmVudFR5cGUsIFBvcnRhbEluamVjdG9yLCBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGFibGUsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5qZWN0b3IsIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBTa2lwU2VsZixcbiAgICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTUNfU0lERVBBTkVMX0RBVEEsIE1jU2lkZXBhbmVsQ29uZmlnIH0gZnJvbSAnLi9zaWRlcGFuZWwtY29uZmlnJztcbmltcG9ydCB7XG4gICAgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsXG4gICAgTUNfU0lERVBBTkVMX1dJVEhfSU5ERU5ULFxuICAgIE1DX1NJREVQQU5FTF9XSVRIX1NIQURPV1xufSBmcm9tICcuL3NpZGVwYW5lbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1jU2lkZXBhbmVsUmVmIH0gZnJvbSAnLi9zaWRlcGFuZWwtcmVmJztcblxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBkZWZhdWx0IHNpZGVwYW5lbCBvcHRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IE1DX1NJREVQQU5FTF9ERUZBVUxUX09QVElPTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxNY1NpZGVwYW5lbENvbmZpZz4oJ21jLXNpZGVwYW5lbC1kZWZhdWx0LW9wdGlvbnMnKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBvcGVuZWRTaWRlcGFuZWxzQXRUaGlzTGV2ZWw6IE1jU2lkZXBhbmVsUmVmW10gPSBbXTtcblxuICAgIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudGx5LW9wZW4gc2lkZXBhbmVscy4gKi9cbiAgICBnZXQgb3BlbmVkU2lkZXBhbmVscygpOiBNY1NpZGVwYW5lbFJlZltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50U2lkZXBhbmVsU2VydmljZSA/IHRoaXMucGFyZW50U2lkZXBhbmVsU2VydmljZS5vcGVuZWRTaWRlcGFuZWxzIDpcbiAgICAgICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVsc0F0VGhpc0xldmVsO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX1NJREVQQU5FTF9ERUZBVUxUX09QVElPTlMpIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IE1jU2lkZXBhbmVsQ29uZmlnLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwcml2YXRlIHBhcmVudFNpZGVwYW5lbFNlcnZpY2U6IE1jU2lkZXBhbmVsU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICAvLyBPbmx5IGNsb3NlIHRoZSBzaWRlcGFuZWxzIGF0IHRoaXMgbGV2ZWwgb24gZGVzdHJveVxuICAgICAgICAvLyBzaW5jZSB0aGUgcGFyZW50IHNlcnZpY2UgbWF5IHN0aWxsIGJlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5jbG9zZVNpZGVwYW5lbHModGhpcy5vcGVuZWRTaWRlcGFuZWxzQXRUaGlzTGV2ZWwpO1xuICAgIH1cblxuICAgIG9wZW48VCwgRCA9IGFueT4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgY29uZmlnPzogTWNTaWRlcGFuZWxDb25maWc8RD4pOiBNY1NpZGVwYW5lbFJlZjxUPiB7XG4gICAgICAgIGNvbnN0IGZ1bGxDb25maWcgPSB7XG4gICAgICAgICAgICAuLi4odGhpcy5kZWZhdWx0T3B0aW9ucyB8fCBuZXcgTWNTaWRlcGFuZWxDb25maWcoKSksXG4gICAgICAgICAgICAuLi5jb25maWdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZnVsbENvbmZpZy5pZCAmJiB0aGlzLmdldFNpZGVwYW5lbEJ5SWQoZnVsbENvbmZpZy5pZCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBTaWRlcGFuZWwgd2l0aCBpZCBcIiR7ZnVsbENvbmZpZy5pZH1cIiBleGlzdHMgYWxyZWFkeS4gVGhlIHNpZGVwYW5lbCBpZCBtdXN0IGJlIHVuaXF1ZS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoZnVsbENvbmZpZyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuYXR0YWNoQ29udGFpbmVyKG92ZXJsYXlSZWYsIGZ1bGxDb25maWcpO1xuICAgICAgICBjb25zdCByZWYgPSBuZXcgTWNTaWRlcGFuZWxSZWYoY29udGFpbmVyLCBvdmVybGF5UmVmLCBmdWxsQ29uZmlnKTtcblxuICAgICAgICBpZiAoY29tcG9uZW50T3JUZW1wbGF0ZVJlZiBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICBjb250YWluZXIuYXR0YWNoVGVtcGxhdGVQb3J0YWwobmV3IFRlbXBsYXRlUG9ydGFsPFQ+KGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIG51bGwhLCB7XG4gICAgICAgICAgICAgICAgJGltcGxpY2l0OiBmdWxsQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICAgICAgc2lkZXBhbmVsUmVmOiByZWZcbiAgICAgICAgICAgIH0gYXMgYW55KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuY3JlYXRlSW5qZWN0b3IoZnVsbENvbmZpZywgcmVmLCBjb250YWluZXIpO1xuICAgICAgICAgICAgY29uc3QgcG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRPclRlbXBsYXRlUmVmLCB1bmRlZmluZWQsIGluamVjdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBjb250YWluZXIuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG5cbiAgICAgICAgICAgIHJlZi5pbnN0YW5jZSA9IGNvbnRlbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5lZFNpZGVwYW5lbHMucHVzaChyZWYpO1xuICAgICAgICByZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVPcGVuU2lkZXBhbmVsKHJlZikpO1xuICAgICAgICBjb250YWluZXIuZW50ZXIoKTtcblxuICAgICAgICByZXR1cm4gcmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyBhbGwgb2YgdGhlIGN1cnJlbnRseS1vcGVuIHNpZGVwYW5lbHMuXG4gICAgICovXG4gICAgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2VTaWRlcGFuZWxzKHRoaXMub3BlbmVkU2lkZXBhbmVscyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW4gb3BlbiBzaWRlcGFuZWwgYnkgaXRzIGlkLlxuICAgICAqIEBwYXJhbSBpZCBJRCB0byB1c2Ugd2hlbiBsb29raW5nIHVwIHRoZSBzaWRlcGFuZWwuXG4gICAgICovXG4gICAgZ2V0U2lkZXBhbmVsQnlJZChpZDogc3RyaW5nKTogTWNTaWRlcGFuZWxSZWYgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRTaWRlcGFuZWxzLmZpbmQoKHNpZGVwYW5lbCkgPT4gc2lkZXBhbmVsLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgdGhlIHNpZGVwYW5lbCBjb250YWluZXIgY29tcG9uZW50IHRvIHRoZSBvdmVybGF5LlxuICAgICAqL1xuICAgIHByaXZhdGUgYXR0YWNoQ29udGFpbmVyKG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0IG9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uID0gdGhpcy5nZXRPcGVuZWRTaWRlcGFuZWxzV2l0aFNhbWVQb3NpdGlvbihjb25maWcpO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBpbmplY3RvciA9IG5ldyBQb3J0YWxJbmplY3Rvcih0aGlzLmluamVjdG9yLCBuZXcgV2Vha01hcDxhbnk+KFtcbiAgICAgICAgICAgIFtNY1NpZGVwYW5lbENvbmZpZywgY29uZmlnXSxcbiAgICAgICAgICAgIFtNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQsIG9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uLmxlbmd0aCA+PSAxXSxcbiAgICAgICAgICAgIFtNQ19TSURFUEFORUxfV0lUSF9TSEFET1csIG9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uLmxlbmd0aCA8IDJdIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgXSkpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsIHVuZGVmaW5lZCwgaW5qZWN0b3IpO1xuICAgICAgICBjb25zdCBjb250YWluZXJSZWY6IENvbXBvbmVudFJlZjxNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudD4gPSBvdmVybGF5UmVmLmF0dGFjaChjb250YWluZXJQb3J0YWwpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXJSZWYuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGN1c3RvbSBpbmplY3RvciB0byBiZSB1c2VkIGluc2lkZSB0aGUgc2lkZXBhbmVsLiBUaGlzIGFsbG93cyBhIGNvbXBvbmVudCBsb2FkZWQgaW5zaWRlXG4gICAgICogb2YgYSBzaWRlcGFuZWwgdG8gY2xvc2UgaXRzZWxmIGFuZCwgb3B0aW9uYWxseSwgdG8gcmV0dXJuIGEgdmFsdWUuXG4gICAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgb2JqZWN0IHRoYXQgaXMgdXNlZCB0byBjb25zdHJ1Y3QgdGhlIHNpZGVwYW5lbC5cbiAgICAgKiBAcGFyYW0gc2lkZXBhbmVsUmVmIFJlZmVyZW5jZSB0byB0aGUgc2lkZXBhbmVsLlxuICAgICAqIEBwYXJhbSBzaWRlcGFuZWxDb250YWluZXIgU2lkZXBhbmVsIGNvbnRhaW5lciBlbGVtZW50IHRoYXQgd3JhcHMgYWxsIG9mIHRoZSBjb250ZW50cy5cbiAgICAgKiBAcmV0dXJucyBUaGUgY3VzdG9tIGluamVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgaW5zaWRlIHRoZSBzaWRlcGFuZWwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVJbmplY3RvcjxUPihcbiAgICAgICAgY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyxcbiAgICAgICAgc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZjxUPixcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIHNpZGVwYW5lbENvbnRhaW5lcjogTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQpOiBQb3J0YWxJbmplY3RvciB7XG5cbiAgICAgICAgLy8gVGhlIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IGlzIGluamVjdGVkIGluIHRoZSBwb3J0YWwgYXMgdGhlIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IGFuZFxuICAgICAgICAvLyB0aGUgc2lkZXBhbmVsJ3MgY29udGVudCBhcmUgY3JlYXRlZCBvdXQgb2YgdGhlIHNhbWUgVmlld0NvbnRhaW5lclJlZiBhbmQgYXMgc3VjaCwgYXJlIHNpYmxpbmdzIGZvciBpbmplY3RvclxuICAgICAgICAvLyBwdXJwb3Nlcy4gVG8gYWxsb3cgdGhlIGhpZXJhcmNoeSB0aGF0IGlzIGV4cGVjdGVkLCB0aGUgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgaXMgZXhwbGljaXRseVxuICAgICAgICAvLyBhZGRlZCB0byB0aGUgaW5qZWN0aW9uIHRva2Vucy5cbiAgICAgICAgY29uc3QgaW5qZWN0aW9uVG9rZW5zID0gbmV3IFdlYWtNYXA8YW55PihbXG4gICAgICAgICAgICBbTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsIHNpZGVwYW5lbENvbnRhaW5lcl0sXG4gICAgICAgICAgICBbTUNfU0lERVBBTkVMX0RBVEEsIGNvbmZpZy5kYXRhXSxcbiAgICAgICAgICAgIFtNY1NpZGVwYW5lbFJlZiwgc2lkZXBhbmVsUmVmXVxuICAgICAgICBdKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIG5ldyBQb3J0YWxJbmplY3Rvcih0aGlzLmluamVjdG9yLCBpbmplY3Rpb25Ub2tlbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgb3ZlcmxheSBhbmQgcGxhY2VzIGl0IGluIHRoZSBjb3JyZWN0IGxvY2F0aW9uLlxuICAgICAqIEBwYXJhbSBjb25maWcgVGhlIHVzZXItc3BlY2lmaWVkIHNpZGVwYW5lbCBjb25maWcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiBjb25maWcuaGFzQmFja2Ryb3AsXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmdldEJhY2tkcm9wQ2xhc3MoY29uZmlnKSxcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBwYW5lbENsYXNzOiBjb25maWcub3ZlcmxheVBhbmVsQ2xhc3MsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xvc2VTaWRlcGFuZWxzKHNpZGVwYW5lbHM6IE1jU2lkZXBhbmVsUmVmW10pIHtcbiAgICAgICAgY29uc3QgcmV2ZXJzZWRPcGVuZWRTaWRlcGFuZWxzID0gWy4uLnNpZGVwYW5lbHMucmV2ZXJzZSgpXTtcblxuICAgICAgICByZXZlcnNlZE9wZW5lZFNpZGVwYW5lbHMuZm9yRWFjaCgoc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZikgPT4ge1xuICAgICAgICAgICAgc2lkZXBhbmVsUmVmLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QmFja2Ryb3BDbGFzcyhjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaGFzT3BlbmVkU2lkZXBhbmVsV2l0aEJhY2tkcm9wID1cbiAgICAgICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5zb21lKChzaWRlcGFuZWxSZWYpID0+IHNpZGVwYW5lbFJlZi5jb25maWcuaGFzQmFja2Ryb3AhKTtcblxuICAgICAgICByZXR1cm4gY29uZmlnLnJlcXVpcmVkQmFja2Ryb3AgfHwgIWhhc09wZW5lZFNpZGVwYW5lbFdpdGhCYWNrZHJvcCA/ICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyA6XG4gICAgICAgICAgICAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24oY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE1jU2lkZXBhbmVsUmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRTaWRlcGFuZWxzLmZpbHRlcigoc2lkZXBhbmVsUmVmKSA9PiBzaWRlcGFuZWxSZWYuY29uZmlnLnBvc2l0aW9uID09PSBjb25maWcucG9zaXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBzaWRlcGFuZWwgZnJvbSB0aGUgYXJyYXkgb2Ygb3BlbiBzaWRlcGFuZWxzLlxuICAgICAqIEBwYXJhbSBzaWRlcGFuZWxSZWYgU2lkZXBhbmVsIHRvIGJlIHJlbW92ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmVPcGVuU2lkZXBhbmVsKHNpZGVwYW5lbFJlZjogTWNTaWRlcGFuZWxSZWYpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuaW5kZXhPZihzaWRlcGFuZWxSZWYpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
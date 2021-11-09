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
        ref.afterClosed()
            .subscribe(() => this.removeOpenSidepanel(ref));
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
        if (config.hasBackdrop && config.backdropClass) {
            return config.backdropClass;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBaUIsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JHLE9BQU8sRUFFSCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUNILDZCQUE2QixFQUM3Qix3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQzNCLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBR2pELDZFQUE2RTtBQUM3RSxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FDckMsSUFBSSxjQUFjLENBQW9CLDhCQUE4QixDQUFDLENBQUM7QUFHMUUsTUFBTSxPQUFPLGtCQUFrQjtJQVMzQixZQUNZLE9BQWdCLEVBQ2hCLFFBQWtCLEVBQ2dDLGNBQWlDLEVBQzNELHNCQUEwQztRQUhsRSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDZ0MsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQzNELDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBb0I7UUFadEUsZ0NBQTJCLEdBQXFCLEVBQUUsQ0FBQztJQWEzRCxDQUFDO0lBWEQsb0RBQW9EO0lBQ3BELElBQUksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFB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SUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7a0lBN0tRLGtCQUFrQixpRUFZSCw0QkFBNEIsNkJBQ1Esa0JBQWtCO3NJQWJyRSxrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVTs7MEJBYUYsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyw0QkFBNEI7OEJBQ1Esa0JBQWtCOzBCQUF6RSxRQUFROzswQkFBSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSwgUG9ydGFsSW5qZWN0b3IsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0YWJsZSxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbmplY3RvciwgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNQ19TSURFUEFORUxfREFUQSwgTWNTaWRlcGFuZWxDb25maWcgfSBmcm9tICcuL3NpZGVwYW5lbC1jb25maWcnO1xuaW1wb3J0IHtcbiAgICBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCxcbiAgICBNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQsXG4gICAgTUNfU0lERVBBTkVMX1dJVEhfU0hBRE9XXG59IGZyb20gJy4vc2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNTaWRlcGFuZWxSZWYgfSBmcm9tICcuL3NpZGVwYW5lbC1yZWYnO1xuXG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGRlZmF1bHQgc2lkZXBhbmVsIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUNfU0lERVBBTkVMX0RFRkFVTFRfT1BUSU9OUyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPE1jU2lkZXBhbmVsQ29uZmlnPignbWMtc2lkZXBhbmVsLWRlZmF1bHQtb3B0aW9ucycpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIG9wZW5lZFNpZGVwYW5lbHNBdFRoaXNMZXZlbDogTWNTaWRlcGFuZWxSZWZbXSA9IFtdO1xuXG4gICAgLyoqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50bHktb3BlbiBzaWRlcGFuZWxzLiAqL1xuICAgIGdldCBvcGVuZWRTaWRlcGFuZWxzKCk6IE1jU2lkZXBhbmVsUmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRTaWRlcGFuZWxTZXJ2aWNlID8gdGhpcy5wYXJlbnRTaWRlcGFuZWxTZXJ2aWNlLm9wZW5lZFNpZGVwYW5lbHMgOlxuICAgICAgICAgICAgdGhpcy5vcGVuZWRTaWRlcGFuZWxzQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfU0lERVBBTkVMX0RFRkFVTFRfT1BUSU9OUykgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogTWNTaWRlcGFuZWxDb25maWcsXG4gICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHByaXZhdGUgcGFyZW50U2lkZXBhbmVsU2VydmljZTogTWNTaWRlcGFuZWxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIE9ubHkgY2xvc2UgdGhlIHNpZGVwYW5lbHMgYXQgdGhpcyBsZXZlbCBvbiBkZXN0cm95XG4gICAgICAgIC8vIHNpbmNlIHRoZSBwYXJlbnQgc2VydmljZSBtYXkgc3RpbGwgYmUgYWN0aXZlLlxuICAgICAgICB0aGlzLmNsb3NlU2lkZXBhbmVscyh0aGlzLm9wZW5lZFNpZGVwYW5lbHNBdFRoaXNMZXZlbCk7XG4gICAgfVxuXG4gICAgb3BlbjxULCBEID0gYW55PihcbiAgICAgICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LCBjb25maWc/OiBNY1NpZGVwYW5lbENvbmZpZzxEPlxuICAgICk6IE1jU2lkZXBhbmVsUmVmPFQ+IHtcbiAgICAgICAgY29uc3QgZnVsbENvbmZpZyA9IHtcbiAgICAgICAgICAgIC4uLih0aGlzLmRlZmF1bHRPcHRpb25zIHx8IG5ldyBNY1NpZGVwYW5lbENvbmZpZygpKSxcbiAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmdWxsQ29uZmlnLmlkICYmIHRoaXMuZ2V0U2lkZXBhbmVsQnlJZChmdWxsQ29uZmlnLmlkKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFNpZGVwYW5lbCB3aXRoIGlkIFwiJHtmdWxsQ29uZmlnLmlkfVwiIGV4aXN0cyBhbHJlYWR5LiBUaGUgc2lkZXBhbmVsIGlkIG11c3QgYmUgdW5pcXVlLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShmdWxsQ29uZmlnKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5hdHRhY2hDb250YWluZXIob3ZlcmxheVJlZiwgZnVsbENvbmZpZyk7XG4gICAgICAgIGNvbnN0IHJlZiA9IG5ldyBNY1NpZGVwYW5lbFJlZihjb250YWluZXIsIG92ZXJsYXlSZWYsIGZ1bGxDb25maWcpO1xuXG4gICAgICAgIGlmIChjb21wb25lbnRPclRlbXBsYXRlUmVmIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hdHRhY2hUZW1wbGF0ZVBvcnRhbChuZXcgVGVtcGxhdGVQb3J0YWw8VD4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgbnVsbCEsIHtcbiAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IGZ1bGxDb25maWcuZGF0YSxcbiAgICAgICAgICAgICAgICBzaWRlcGFuZWxSZWY6IHJlZlxuICAgICAgICAgICAgfSBhcyBhbnkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3RvcihmdWxsQ29uZmlnLCByZWYsIGNvbnRhaW5lcik7XG4gICAgICAgICAgICBjb25zdCBwb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIHVuZGVmaW5lZCwgaW5qZWN0b3IpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudFJlZiA9IGNvbnRhaW5lci5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcblxuICAgICAgICAgICAgcmVmLmluc3RhbmNlID0gY29udGVudFJlZi5pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5wdXNoKHJlZik7XG4gICAgICAgIHJlZi5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVtb3ZlT3BlblNpZGVwYW5lbChyZWYpKTtcblxuICAgICAgICBjb250YWluZXIuZW50ZXIoKTtcblxuICAgICAgICByZXR1cm4gcmVmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyBhbGwgb2YgdGhlIGN1cnJlbnRseS1vcGVuIHNpZGVwYW5lbHMuXG4gICAgICovXG4gICAgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2VTaWRlcGFuZWxzKHRoaXMub3BlbmVkU2lkZXBhbmVscyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW4gb3BlbiBzaWRlcGFuZWwgYnkgaXRzIGlkLlxuICAgICAqIEBwYXJhbSBpZCBJRCB0byB1c2Ugd2hlbiBsb29raW5nIHVwIHRoZSBzaWRlcGFuZWwuXG4gICAgICovXG4gICAgZ2V0U2lkZXBhbmVsQnlJZChpZDogc3RyaW5nKTogTWNTaWRlcGFuZWxSZWYgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRTaWRlcGFuZWxzLmZpbmQoKHNpZGVwYW5lbCkgPT4gc2lkZXBhbmVsLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgdGhlIHNpZGVwYW5lbCBjb250YWluZXIgY29tcG9uZW50IHRvIHRoZSBvdmVybGF5LlxuICAgICAqL1xuICAgIHByaXZhdGUgYXR0YWNoQ29udGFpbmVyKG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0IG9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uID0gdGhpcy5nZXRPcGVuZWRTaWRlcGFuZWxzV2l0aFNhbWVQb3NpdGlvbihjb25maWcpO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBpbmplY3RvciA9IG5ldyBQb3J0YWxJbmplY3Rvcih0aGlzLmluamVjdG9yLCBuZXcgV2Vha01hcDxhbnk+KFtcbiAgICAgICAgICAgIFtNY1NpZGVwYW5lbENvbmZpZywgY29uZmlnXSxcbiAgICAgICAgICAgIFtNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQsIG9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uLmxlbmd0aCA+PSAxXSxcbiAgICAgICAgICAgIFtNQ19TSURFUEFORUxfV0lUSF9TSEFET1csIG9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uLmxlbmd0aCA8IDJdIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgXSkpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsIHVuZGVmaW5lZCwgaW5qZWN0b3IpO1xuICAgICAgICBjb25zdCBjb250YWluZXJSZWY6IENvbXBvbmVudFJlZjxNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudD4gPSBvdmVybGF5UmVmLmF0dGFjaChjb250YWluZXJQb3J0YWwpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXJSZWYuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGN1c3RvbSBpbmplY3RvciB0byBiZSB1c2VkIGluc2lkZSB0aGUgc2lkZXBhbmVsLiBUaGlzIGFsbG93cyBhIGNvbXBvbmVudCBsb2FkZWQgaW5zaWRlXG4gICAgICogb2YgYSBzaWRlcGFuZWwgdG8gY2xvc2UgaXRzZWxmIGFuZCwgb3B0aW9uYWxseSwgdG8gcmV0dXJuIGEgdmFsdWUuXG4gICAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgb2JqZWN0IHRoYXQgaXMgdXNlZCB0byBjb25zdHJ1Y3QgdGhlIHNpZGVwYW5lbC5cbiAgICAgKiBAcGFyYW0gc2lkZXBhbmVsUmVmIFJlZmVyZW5jZSB0byB0aGUgc2lkZXBhbmVsLlxuICAgICAqIEBwYXJhbSBzaWRlcGFuZWxDb250YWluZXIgU2lkZXBhbmVsIGNvbnRhaW5lciBlbGVtZW50IHRoYXQgd3JhcHMgYWxsIG9mIHRoZSBjb250ZW50cy5cbiAgICAgKiBAcmV0dXJucyBUaGUgY3VzdG9tIGluamVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgaW5zaWRlIHRoZSBzaWRlcGFuZWwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVJbmplY3RvcjxUPihcbiAgICAgICAgY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyxcbiAgICAgICAgc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZjxUPixcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIHNpZGVwYW5lbENvbnRhaW5lcjogTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQpOiBQb3J0YWxJbmplY3RvciB7XG5cbiAgICAgICAgLy8gVGhlIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IGlzIGluamVjdGVkIGluIHRoZSBwb3J0YWwgYXMgdGhlIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IGFuZFxuICAgICAgICAvLyB0aGUgc2lkZXBhbmVsJ3MgY29udGVudCBhcmUgY3JlYXRlZCBvdXQgb2YgdGhlIHNhbWUgVmlld0NvbnRhaW5lclJlZiBhbmQgYXMgc3VjaCwgYXJlIHNpYmxpbmdzIGZvciBpbmplY3RvclxuICAgICAgICAvLyBwdXJwb3Nlcy4gVG8gYWxsb3cgdGhlIGhpZXJhcmNoeSB0aGF0IGlzIGV4cGVjdGVkLCB0aGUgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgaXMgZXhwbGljaXRseVxuICAgICAgICAvLyBhZGRlZCB0byB0aGUgaW5qZWN0aW9uIHRva2Vucy5cbiAgICAgICAgY29uc3QgaW5qZWN0aW9uVG9rZW5zID0gbmV3IFdlYWtNYXA8YW55PihbXG4gICAgICAgICAgICBbTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsIHNpZGVwYW5lbENvbnRhaW5lcl0sXG4gICAgICAgICAgICBbTUNfU0lERVBBTkVMX0RBVEEsIGNvbmZpZy5kYXRhXSxcbiAgICAgICAgICAgIFtNY1NpZGVwYW5lbFJlZiwgc2lkZXBhbmVsUmVmXVxuICAgICAgICBdKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgcmV0dXJuIG5ldyBQb3J0YWxJbmplY3Rvcih0aGlzLmluamVjdG9yLCBpbmplY3Rpb25Ub2tlbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgb3ZlcmxheSBhbmQgcGxhY2VzIGl0IGluIHRoZSBjb3JyZWN0IGxvY2F0aW9uLlxuICAgICAqIEBwYXJhbSBjb25maWcgVGhlIHVzZXItc3BlY2lmaWVkIHNpZGVwYW5lbCBjb25maWcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiBjb25maWcuaGFzQmFja2Ryb3AsXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmdldEJhY2tkcm9wQ2xhc3MoY29uZmlnKSxcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBwYW5lbENsYXNzOiBjb25maWcub3ZlcmxheVBhbmVsQ2xhc3MsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xvc2VTaWRlcGFuZWxzKHNpZGVwYW5lbHM6IE1jU2lkZXBhbmVsUmVmW10pIHtcbiAgICAgICAgY29uc3QgcmV2ZXJzZWRPcGVuZWRTaWRlcGFuZWxzID0gWy4uLnNpZGVwYW5lbHMucmV2ZXJzZSgpXTtcblxuICAgICAgICByZXZlcnNlZE9wZW5lZFNpZGVwYW5lbHMuZm9yRWFjaCgoc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZikgPT4ge1xuICAgICAgICAgICAgc2lkZXBhbmVsUmVmLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QmFja2Ryb3BDbGFzcyhjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNCYWNrZHJvcCAmJiBjb25maWcuYmFja2Ryb3BDbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5iYWNrZHJvcENsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGFzT3BlbmVkU2lkZXBhbmVsV2l0aEJhY2tkcm9wID1cbiAgICAgICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5zb21lKChzaWRlcGFuZWxSZWYpID0+IHNpZGVwYW5lbFJlZi5jb25maWcuaGFzQmFja2Ryb3AhKTtcblxuICAgICAgICByZXR1cm4gY29uZmlnLnJlcXVpcmVkQmFja2Ryb3AgfHwgIWhhc09wZW5lZFNpZGVwYW5lbFdpdGhCYWNrZHJvcCA/ICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyA6XG4gICAgICAgICAgICAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24oY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE1jU2lkZXBhbmVsUmVmW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRTaWRlcGFuZWxzLmZpbHRlcigoc2lkZXBhbmVsUmVmKSA9PiBzaWRlcGFuZWxSZWYuY29uZmlnLnBvc2l0aW9uID09PSBjb25maWcucG9zaXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBzaWRlcGFuZWwgZnJvbSB0aGUgYXJyYXkgb2Ygb3BlbiBzaWRlcGFuZWxzLlxuICAgICAqIEBwYXJhbSBzaWRlcGFuZWxSZWYgU2lkZXBhbmVsIHRvIGJlIHJlbW92ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmVPcGVuU2lkZXBhbmVsKHNpZGVwYW5lbFJlZjogTWNTaWRlcGFuZWxSZWYpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuaW5kZXhPZihzaWRlcGFuZWxSZWYpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
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
        const fullConfig = {
            ...(this.defaultOptions || new McSidepanelConfig()),
            ...config
        };
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
/** @nocollapse */ /** @nocollapse */ McSidepanelService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McSidepanelService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: MC_SIDEPANEL_DEFAULT_OPTIONS, optional: true }, { token: McSidepanelService, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ McSidepanelService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McSidepanelService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McSidepanelService, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBaUIsY0FBYyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JHLE9BQU8sRUFFSCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUNILDZCQUE2QixFQUM3Qix3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQzNCLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBR2pELDZFQUE2RTtBQUM3RSxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FDckMsSUFBSSxjQUFjLENBQW9CLDhCQUE4QixDQUFDLENBQUM7QUFHMUUsTUFBTSxPQUFPLGtCQUFrQjtJQVMzQixZQUNZLE9BQWdCLEVBQ2hCLFFBQWtCLEVBQ2dDLGNBQWlDLEVBQzNELHNCQUEwQztRQUhsRSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDZ0MsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQzNELDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBb0I7UUFadEUsZ0NBQTJCLEdBQXFCLEVBQUUsQ0FBQztJQWEzRCxDQUFDO0lBWEQsb0RBQW9EO0lBQ3BELElBQUksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFB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QUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDOztxSkE3S1Esa0JBQWtCLGlFQVlILDRCQUE0Qiw2QkFDUSxrQkFBa0I7eUpBYnJFLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixVQUFVOzswQkFhRixRQUFROzswQkFBSSxNQUFNOzJCQUFDLDRCQUE0Qjs4QkFDUSxrQkFBa0I7MEJBQXpFLFFBQVE7OzBCQUFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBDb21wb25lbnRUeXBlLCBQb3J0YWxJbmplY3RvciwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RhYmxlLFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdG9yLCBPbkRlc3Ryb3ksXG4gICAgT3B0aW9uYWwsXG4gICAgU2tpcFNlbGYsXG4gICAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1DX1NJREVQQU5FTF9EQVRBLCBNY1NpZGVwYW5lbENvbmZpZyB9IGZyb20gJy4vc2lkZXBhbmVsLWNvbmZpZyc7XG5pbXBvcnQge1xuICAgIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE1DX1NJREVQQU5FTF9XSVRIX0lOREVOVCxcbiAgICBNQ19TSURFUEFORUxfV0lUSF9TSEFET1dcbn0gZnJvbSAnLi9zaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbFJlZiB9IGZyb20gJy4vc2lkZXBhbmVsLXJlZic7XG5cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgZGVmYXVsdCBzaWRlcGFuZWwgb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBNQ19TSURFUEFORUxfREVGQVVMVF9PUFRJT05TID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48TWNTaWRlcGFuZWxDb25maWc+KCdtYy1zaWRlcGFuZWwtZGVmYXVsdC1vcHRpb25zJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgb3BlbmVkU2lkZXBhbmVsc0F0VGhpc0xldmVsOiBNY1NpZGVwYW5lbFJlZltdID0gW107XG5cbiAgICAvKiogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnRseS1vcGVuIHNpZGVwYW5lbHMuICovXG4gICAgZ2V0IG9wZW5lZFNpZGVwYW5lbHMoKTogTWNTaWRlcGFuZWxSZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudFNpZGVwYW5lbFNlcnZpY2UgPyB0aGlzLnBhcmVudFNpZGVwYW5lbFNlcnZpY2Uub3BlbmVkU2lkZXBhbmVscyA6XG4gICAgICAgICAgICB0aGlzLm9wZW5lZFNpZGVwYW5lbHNBdFRoaXNMZXZlbDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19TSURFUEFORUxfREVGQVVMVF9PUFRJT05TKSBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBNY1NpZGVwYW5lbENvbmZpZyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBwYXJlbnRTaWRlcGFuZWxTZXJ2aWNlOiBNY1NpZGVwYW5lbFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gT25seSBjbG9zZSB0aGUgc2lkZXBhbmVscyBhdCB0aGlzIGxldmVsIG9uIGRlc3Ryb3lcbiAgICAgICAgLy8gc2luY2UgdGhlIHBhcmVudCBzZXJ2aWNlIG1heSBzdGlsbCBiZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuY2xvc2VTaWRlcGFuZWxzKHRoaXMub3BlbmVkU2lkZXBhbmVsc0F0VGhpc0xldmVsKTtcbiAgICB9XG5cbiAgICBvcGVuPFQsIEQgPSBhbnk+KFxuICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sIGNvbmZpZz86IE1jU2lkZXBhbmVsQ29uZmlnPEQ+XG4gICAgKTogTWNTaWRlcGFuZWxSZWY8VD4ge1xuICAgICAgICBjb25zdCBmdWxsQ29uZmlnID0ge1xuICAgICAgICAgICAgLi4uKHRoaXMuZGVmYXVsdE9wdGlvbnMgfHwgbmV3IE1jU2lkZXBhbmVsQ29uZmlnKCkpLFxuICAgICAgICAgICAgLi4uY29uZmlnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZ1bGxDb25maWcuaWQgJiYgdGhpcy5nZXRTaWRlcGFuZWxCeUlkKGZ1bGxDb25maWcuaWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgU2lkZXBhbmVsIHdpdGggaWQgXCIke2Z1bGxDb25maWcuaWR9XCIgZXhpc3RzIGFscmVhZHkuIFRoZSBzaWRlcGFuZWwgaWQgbXVzdCBiZSB1bmlxdWUuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KGZ1bGxDb25maWcpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmF0dGFjaENvbnRhaW5lcihvdmVybGF5UmVmLCBmdWxsQ29uZmlnKTtcbiAgICAgICAgY29uc3QgcmVmID0gbmV3IE1jU2lkZXBhbmVsUmVmKGNvbnRhaW5lciwgb3ZlcmxheVJlZiwgZnVsbENvbmZpZyk7XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgICAgICAgY29udGFpbmVyLmF0dGFjaFRlbXBsYXRlUG9ydGFsKG5ldyBUZW1wbGF0ZVBvcnRhbDxUPihjb21wb25lbnRPclRlbXBsYXRlUmVmLCBudWxsISwge1xuICAgICAgICAgICAgICAgICRpbXBsaWNpdDogZnVsbENvbmZpZy5kYXRhLFxuICAgICAgICAgICAgICAgIHNpZGVwYW5lbFJlZjogcmVmXG4gICAgICAgICAgICB9IGFzIGFueSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yKGZ1bGxDb25maWcsIHJlZiwgY29udGFpbmVyKTtcbiAgICAgICAgICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgdW5kZWZpbmVkLCBpbmplY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50UmVmID0gY29udGFpbmVyLmF0dGFjaENvbXBvbmVudFBvcnRhbChwb3J0YWwpO1xuXG4gICAgICAgICAgICByZWYuaW5zdGFuY2UgPSBjb250ZW50UmVmLmluc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuZWRTaWRlcGFuZWxzLnB1c2gocmVmKTtcbiAgICAgICAgcmVmLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVPcGVuU2lkZXBhbmVsKHJlZikpO1xuXG4gICAgICAgIGNvbnRhaW5lci5lbnRlcigpO1xuXG4gICAgICAgIHJldHVybiByZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGFsbCBvZiB0aGUgY3VycmVudGx5LW9wZW4gc2lkZXBhbmVscy5cbiAgICAgKi9cbiAgICBjbG9zZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9zZVNpZGVwYW5lbHModGhpcy5vcGVuZWRTaWRlcGFuZWxzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbiBvcGVuIHNpZGVwYW5lbCBieSBpdHMgaWQuXG4gICAgICogQHBhcmFtIGlkIElEIHRvIHVzZSB3aGVuIGxvb2tpbmcgdXAgdGhlIHNpZGVwYW5lbC5cbiAgICAgKi9cbiAgICBnZXRTaWRlcGFuZWxCeUlkKGlkOiBzdHJpbmcpOiBNY1NpZGVwYW5lbFJlZiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuZmluZCgoc2lkZXBhbmVsKSA9PiBzaWRlcGFuZWwuaWQgPT09IGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgc2lkZXBhbmVsIGNvbnRhaW5lciBjb21wb25lbnQgdG8gdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhdHRhY2hDb250YWluZXIob3ZlcmxheVJlZjogT3ZlcmxheVJlZiwgY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3Qgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24gPSB0aGlzLmdldE9wZW5lZFNpZGVwYW5lbHNXaXRoU2FtZVBvc2l0aW9uKGNvbmZpZyk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGluamVjdG9yID0gbmV3IFBvcnRhbEluamVjdG9yKHRoaXMuaW5qZWN0b3IsIG5ldyBXZWFrTWFwPGFueT4oW1xuICAgICAgICAgICAgW01jU2lkZXBhbmVsQ29uZmlnLCBjb25maWddLFxuICAgICAgICAgICAgW01DX1NJREVQQU5FTF9XSVRIX0lOREVOVCwgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24ubGVuZ3RoID49IDFdLFxuICAgICAgICAgICAgW01DX1NJREVQQU5FTF9XSVRIX1NIQURPVywgb3BlbmVkU2lkZXBhbmVsc1dpdGhTYW1lUG9zaXRpb24ubGVuZ3RoIDwgMl0gLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICBdKSk7XG5cbiAgICAgICAgY29uc3QgY29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCwgdW5kZWZpbmVkLCBpbmplY3Rvcik7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50PiA9IG92ZXJsYXlSZWYuYXR0YWNoKGNvbnRhaW5lclBvcnRhbCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY3VzdG9tIGluamVjdG9yIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSBzaWRlcGFuZWwuIFRoaXMgYWxsb3dzIGEgY29tcG9uZW50IGxvYWRlZCBpbnNpZGVcbiAgICAgKiBvZiBhIHNpZGVwYW5lbCB0byBjbG9zZSBpdHNlbGYgYW5kLCBvcHRpb25hbGx5LCB0byByZXR1cm4gYSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZyBvYmplY3QgdGhhdCBpcyB1c2VkIHRvIGNvbnN0cnVjdCB0aGUgc2lkZXBhbmVsLlxuICAgICAqIEBwYXJhbSBzaWRlcGFuZWxSZWYgUmVmZXJlbmNlIHRvIHRoZSBzaWRlcGFuZWwuXG4gICAgICogQHBhcmFtIHNpZGVwYW5lbENvbnRhaW5lciBTaWRlcGFuZWwgY29udGFpbmVyIGVsZW1lbnQgdGhhdCB3cmFwcyBhbGwgb2YgdGhlIGNvbnRlbnRzLlxuICAgICAqIEByZXR1cm5zIFRoZSBjdXN0b20gaW5qZWN0b3IgdGhhdCBjYW4gYmUgdXNlZCBpbnNpZGUgdGhlIHNpZGVwYW5lbC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUluamVjdG9yPFQ+KFxuICAgICAgICBjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnLFxuICAgICAgICBzaWRlcGFuZWxSZWY6IE1jU2lkZXBhbmVsUmVmPFQ+LFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgc2lkZXBhbmVsQ29udGFpbmVyOiBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCk6IFBvcnRhbEluamVjdG9yIHtcblxuICAgICAgICAvLyBUaGUgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgaXMgaW5qZWN0ZWQgaW4gdGhlIHBvcnRhbCBhcyB0aGUgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgYW5kXG4gICAgICAgIC8vIHRoZSBzaWRlcGFuZWwncyBjb250ZW50IGFyZSBjcmVhdGVkIG91dCBvZiB0aGUgc2FtZSBWaWV3Q29udGFpbmVyUmVmIGFuZCBhcyBzdWNoLCBhcmUgc2libGluZ3MgZm9yIGluamVjdG9yXG4gICAgICAgIC8vIHB1cnBvc2VzLiBUbyBhbGxvdyB0aGUgaGllcmFyY2h5IHRoYXQgaXMgZXhwZWN0ZWQsIHRoZSBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCBpcyBleHBsaWNpdGx5XG4gICAgICAgIC8vIGFkZGVkIHRvIHRoZSBpbmplY3Rpb24gdG9rZW5zLlxuICAgICAgICBjb25zdCBpbmplY3Rpb25Ub2tlbnMgPSBuZXcgV2Vha01hcDxhbnk+KFtcbiAgICAgICAgICAgIFtNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCwgc2lkZXBhbmVsQ29udGFpbmVyXSxcbiAgICAgICAgICAgIFtNQ19TSURFUEFORUxfREFUQSwgY29uZmlnLmRhdGFdLFxuICAgICAgICAgICAgW01jU2lkZXBhbmVsUmVmLCBzaWRlcGFuZWxSZWZdXG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gbmV3IFBvcnRhbEluamVjdG9yKHRoaXMuaW5qZWN0b3IsIGluamVjdGlvblRva2Vucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBvdmVybGF5IGFuZCBwbGFjZXMgaXQgaW4gdGhlIGNvcnJlY3QgbG9jYXRpb24uXG4gICAgICogQHBhcmFtIGNvbmZpZyBUaGUgdXNlci1zcGVjaWZpZWQgc2lkZXBhbmVsIGNvbmZpZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoY29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IGNvbmZpZy5oYXNCYWNrZHJvcCxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuZ2V0QmFja2Ryb3BDbGFzcyhjb25maWcpLFxuICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6IGNvbmZpZy5vdmVybGF5UGFuZWxDbGFzcyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zZVNpZGVwYW5lbHMoc2lkZXBhbmVsczogTWNTaWRlcGFuZWxSZWZbXSkge1xuICAgICAgICBjb25zdCByZXZlcnNlZE9wZW5lZFNpZGVwYW5lbHMgPSBbLi4uc2lkZXBhbmVscy5yZXZlcnNlKCldO1xuXG4gICAgICAgIHJldmVyc2VkT3BlbmVkU2lkZXBhbmVscy5mb3JFYWNoKChzaWRlcGFuZWxSZWY6IE1jU2lkZXBhbmVsUmVmKSA9PiB7XG4gICAgICAgICAgICBzaWRlcGFuZWxSZWYuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCYWNrZHJvcENsYXNzKGNvbmZpZzogTWNTaWRlcGFuZWxDb25maWcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoY29uZmlnLmhhc0JhY2tkcm9wICYmIGNvbmZpZy5iYWNrZHJvcENsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLmJhY2tkcm9wQ2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoYXNPcGVuZWRTaWRlcGFuZWxXaXRoQmFja2Ryb3AgPVxuICAgICAgICAgICAgdGhpcy5vcGVuZWRTaWRlcGFuZWxzLnNvbWUoKHNpZGVwYW5lbFJlZikgPT4gc2lkZXBhbmVsUmVmLmNvbmZpZy5oYXNCYWNrZHJvcCEpO1xuXG4gICAgICAgIHJldHVybiBjb25maWcucmVxdWlyZWRCYWNrZHJvcCB8fCAhaGFzT3BlbmVkU2lkZXBhbmVsV2l0aEJhY2tkcm9wID8gJ2Nkay1vdmVybGF5LWRhcmstYmFja2Ryb3AnIDpcbiAgICAgICAgICAgICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPcGVuZWRTaWRlcGFuZWxzV2l0aFNhbWVQb3NpdGlvbihjb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnKTogTWNTaWRlcGFuZWxSZWZbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFNpZGVwYW5lbHMuZmlsdGVyKChzaWRlcGFuZWxSZWYpID0+IHNpZGVwYW5lbFJlZi5jb25maWcucG9zaXRpb24gPT09IGNvbmZpZy5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHNpZGVwYW5lbCBmcm9tIHRoZSBhcnJheSBvZiBvcGVuIHNpZGVwYW5lbHMuXG4gICAgICogQHBhcmFtIHNpZGVwYW5lbFJlZiBTaWRlcGFuZWwgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbW92ZU9wZW5TaWRlcGFuZWwoc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMub3BlbmVkU2lkZXBhbmVscy5pbmRleE9mKHNpZGVwYW5lbFJlZik7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbmVkU2lkZXBhbmVscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
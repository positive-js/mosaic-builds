import { InjectionToken, Injector, OnDestroy, TemplateRef } from '@angular/core';
import { Overlay } from '@ptsecurity/cdk/overlay';
import { IComponentType } from '@ptsecurity/cdk/portal';
import { McSidepanelConfig } from './sidepanel-config';
import { McSidepanelRef } from './sidepanel-ref';
/** Injection token that can be used to specify default sidepanel options. */
export declare const MC_SIDEPANEL_DEFAULT_OPTIONS: InjectionToken<McSidepanelConfig<any>>;
export declare class McSidepanelService implements OnDestroy {
    private overlay;
    private injector;
    private defaultOptions;
    private parentSidepanelService;
    private openedSidepanelsAtThisLevel;
    /** Keeps track of the currently-open sidepanels. */
    readonly openedSidepanels: McSidepanelRef[];
    constructor(overlay: Overlay, injector: Injector, defaultOptions: McSidepanelConfig, parentSidepanelService: McSidepanelService);
    ngOnDestroy(): void;
    open<T, D = any>(componentOrTemplateRef: IComponentType<T> | TemplateRef<T>, config?: McSidepanelConfig<D>): McSidepanelRef<T>;
    /**
     * Closes all of the currently-open sidepanels.
     */
    closeAll(): void;
    /**
     * Finds an open sidepanel by its id.
     * @param id ID to use when looking up the sidepanel.
     */
    getSidepanelById(id: string): McSidepanelRef | undefined;
    /**
     * Attaches the sidepanel container component to the overlay.
     */
    private attachContainer;
    /**
     * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
     * of a sidepanel to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the sidepanel.
     * @param sidepanelRef Reference to the sidepanel.
     * @param sidepanelContainer Sidepanel container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the sidepanel.
     */
    private createInjector;
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified sidepanel config.
     */
    private createOverlay;
    private closeSidepanels;
    private getBackdropClass;
    private getOpenedSidepanelsWithSamePosition;
    /**
     * Removes a sidepanel from the array of open sidepanels.
     * @param sidepanelRef Sidepanel to be removed.
     */
    private removeOpenSidepanel;
}

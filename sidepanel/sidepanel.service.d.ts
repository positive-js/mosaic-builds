import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken, Injector, OnDestroy, TemplateRef } from '@angular/core';
import { McSidepanelConfig } from './sidepanel-config';
import { McSidepanelRef } from './sidepanel-ref';
import * as i0 from "@angular/core";
/** Injection token that can be used to specify default sidepanel options. */
export declare const MC_SIDEPANEL_DEFAULT_OPTIONS: InjectionToken<McSidepanelConfig<any>>;
export declare class McSidepanelService implements OnDestroy {
    private overlay;
    private injector;
    private defaultOptions;
    private parentSidepanelService;
    private openedSidepanelsAtThisLevel;
    /** Keeps track of the currently-open sidepanels. */
    get openedSidepanels(): McSidepanelRef[];
    constructor(overlay: Overlay, injector: Injector, defaultOptions: McSidepanelConfig, parentSidepanelService: McSidepanelService);
    ngOnDestroy(): void;
    open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: McSidepanelConfig<D>): McSidepanelRef<T>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidepanelService, [null, null, { optional: true; }, { optional: true; skipSelf: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<McSidepanelService>;
}

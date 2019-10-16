import { InjectionToken } from '@angular/core';
export declare const MC_SANITY_CHECKS: InjectionToken<boolean>;
export declare function mcSanityChecksFactory(): boolean;
/**
 * Module that captures anything that should be loaded and/or run for *all* Mosaic
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., McTabsModule).
 */
export declare class McCommonModule {
    private _sanityChecksEnabled;
    private hasDoneGlobalChecks;
    private _document;
    private _window;
    constructor(_sanityChecksEnabled: boolean);
    private areChecksEnabled;
    private isTestEnv;
    private checkDoctypeIsDefined;
    private checkThemeIsPresent;
}

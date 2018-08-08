import { InjectionToken } from '@angular/core';
export declare const MC_SANITY_CHECKS: InjectionToken<boolean>;
export declare function MC_SANITY_CHECKS_FACTORY(): boolean;
/**
 * Module that captures anything that should be loaded and/or run for *all* Mosaic
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
export declare class McCommonModule {
    private _sanityChecksEnabled;
    private _hasDoneGlobalChecks;
    private _document;
    private _window;
    constructor(_sanityChecksEnabled: boolean);
    private _areChecksEnabled();
    private _isTestEnv();
    private _checkDoctypeIsDefined();
    private _checkThemeIsPresent();
}

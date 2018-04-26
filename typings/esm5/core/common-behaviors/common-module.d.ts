import { InjectionToken } from '@angular/core';
export declare const MС_SANITY_CHECKS: InjectionToken<boolean>;
/**
 * Module that captures anything that should be loaded and/or run for *all* Mosaic
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
export declare class McCommonModule {
    private _sanityChecksEnabled;
    private _hasDoneGlobalChecks;
    private _hasCheckedHammer;
    private _document;
    private _window;
    constructor(_sanityChecksEnabled: boolean);
    private _areChecksEnabled();
    private _isTestEnv();
    private _checkDoctypeIsDefined();
    private _checkThemeIsPresent();
    _checkHammerIsAvailable(): void;
}

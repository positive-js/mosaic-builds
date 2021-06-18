import { InjectionToken } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/cdk/bidi';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<McCommonModule, [{ optional: true; }]>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<McCommonModule, never, [typeof ɵngcc1.BidiModule], [typeof ɵngcc1.BidiModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<McCommonModule>;
}

//# sourceMappingURL=common-module.d.ts.map
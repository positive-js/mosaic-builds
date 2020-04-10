import { InjectionToken } from '@angular/core';
/** Default options, for the chips module, that can be overridden. */
export interface McTagsDefaultOptions {
    /** The list of key codes that will trigger a chipEnd event. */
    separatorKeyCodes: number[];
}
/** Injection token to be used to override the default options for the chips module. */
export declare const MC_TAGS_DEFAULT_OPTIONS: InjectionToken<McTagsDefaultOptions>;

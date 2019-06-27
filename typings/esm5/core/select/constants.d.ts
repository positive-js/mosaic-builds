import { InjectionToken } from '@angular/core';
import { ScrollStrategy, Overlay, RepositionScrollStrategy } from '@angular/cdk/overlay';
/** The max height of the select's overlay panel */
export declare const SELECT_PANEL_MAX_HEIGHT = 224;
/** The panel's padding on the x-axis */
export declare const SELECT_PANEL_PADDING_X = 1;
/** The panel's x axis padding if it is indented (e.g. there is an option group). */
export declare const SELECT_PANEL_INDENT_PADDING_X: number;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
export declare const SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Injection token that determines the scroll handling while a select is open. */
export declare const MC_SELECT_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function mcSelectScrollStrategyProviderFactory(overlay: Overlay): () => RepositionScrollStrategy;
/** @docs-private */
export declare const MC_SELECT_SCROLL_STRATEGY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof mcSelectScrollStrategyProviderFactory;
};

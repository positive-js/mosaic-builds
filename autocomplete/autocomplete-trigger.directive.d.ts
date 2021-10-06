import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, ElementRef, InjectionToken, NgZone, OnDestroy, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { McOption, McOptionSelectionChange } from '@ptsecurity/mosaic/core';
import { McFormField } from '@ptsecurity/mosaic/form-field';
import { Observable } from 'rxjs';
import { McAutocompleteOrigin } from './autocomplete-origin.directive';
import { McAutocomplete } from './autocomplete.component';
import * as i0 from "@angular/core";
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the scrollTop of the panel. Because we are not
 * actually focusing the active item, scroll must be handled manually.
 */
/** The height of each autocomplete option. */
export declare const AUTOCOMPLETE_OPTION_HEIGHT = 32;
/** The total height of the autocomplete panel. */
export declare const AUTOCOMPLETE_PANEL_HEIGHT = 256;
export declare const AUTOCOMPLETE_BORDER_WIDTH: number;
/** Injection token that determines the scroll handling while the autocomplete panel is open. */
export declare const MC_AUTOCOMPLETE_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
export declare function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy;
export declare const MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY;
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
export declare const MAT_AUTOCOMPLETE_VALUE_ACCESSOR: any;
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 * @docs-private
 */
export declare function getMcAutocompleteMissingPanelError(): Error;
export declare class McAutocompleteTrigger implements ControlValueAccessor, OnDestroy {
    private elementRef;
    private viewContainerRef;
    private changeDetectorRef;
    private overlay;
    private zone;
    private dir;
    private formField;
    private document;
    private viewportRuler?;
    readonly optionSelections: Observable<McOptionSelectionChange>;
    /** The currently active option, coerced to MatOption type. */
    get activeOption(): McOption | null;
    get panelOpen(): boolean;
    /** The autocomplete panel to be attached to this trigger. */
    autocomplete: McAutocomplete;
    /**
     * Reference relative to which to position the autocomplete panel.
     * Defaults to the autocomplete trigger element.
     */
    connectedTo: McAutocompleteOrigin;
    /**
     * `autocomplete` attribute to be set on the input element.
     * @docs-private
     */
    autocompleteAttribute: string;
    /**
     * Whether the autocomplete is disabled. When disabled, the element will
     * act as a regular input and the user won't be able to open the panel.
     */
    get autocompleteDisabled(): boolean;
    set autocompleteDisabled(value: boolean);
    private _autocompleteDisabled;
    private overlayAttached;
    private overlayRef;
    private portal;
    private componentDestroyed;
    private scrollStrategy;
    /** Old value of the native input. Used to work around issues with the `input` event on IE. */
    private previousValue;
    /** Strategy that is used to position the panel. */
    private positionStrategy;
    /** The subscription for closing actions (some are bound to document). */
    private closingActionsSubscription;
    /** Subscription to viewport size changes. */
    private viewportSubscription;
    /**
     * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
     * closed autocomplete from being reopened if the user switches to another browser tab and then
     * comes back.
     */
    private canOpenOnNextFocus;
    /** Stream of keyboard events that can close the panel. */
    private readonly closeKeyEventStream;
    constructor(elementRef: ElementRef<HTMLInputElement>, viewContainerRef: ViewContainerRef, changeDetectorRef: ChangeDetectorRef, overlay: Overlay, zone: NgZone, scrollStrategy: any, dir: Directionality, formField: McFormField, document: any, viewportRuler?: ViewportRuler | undefined);
    ngOnDestroy(): void;
    /** `View -> model callback called when value changes` */
    onChange: (value: any) => void;
    /** `View -> model callback called when autocomplete has been touched` */
    onTouched: () => void;
    /** Opens the autocomplete suggestion panel. */
    openPanel(): void;
    closePanel(): void;
    /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     */
    updatePosition(): void;
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions(): Observable<McOptionSelectionChange | null>;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    handleKeydown(event: KeyboardEvent): void;
    handleInput(event: KeyboardEvent): void;
    handleFocus(): void;
    handleClick($event: MouseEvent): void;
    /** Stream of clicks outside of the autocomplete panel. */
    private getOutsideClickStream;
    /**
     * Event handler for when the window is blurred. Needs to be an
     * arrow function in order to preserve the context.
     */
    private windowBlurHandler;
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     */
    private scrollToOption;
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    private subscribeToClosingActions;
    /** Destroys the autocomplete suggestion panel. */
    private destroyPanel;
    private setTriggerValue;
    /** This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    private setValueAndClose;
    /** Clear any previous selected option and emit a selection change event for this option */
    private clearPreviousSelectedOption;
    private attachOverlay;
    private getOverlayConfig;
    private getOverlayPosition;
    private getConnectedElement;
    private getPanelWidth;
    private getHostWidth;
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     */
    private resetActiveItem;
    private canOpen;
    static ɵfac: i0.ɵɵFactoryDeclaration<McAutocompleteTrigger, [null, null, null, null, null, null, { optional: true; }, { optional: true; host: true; }, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McAutocompleteTrigger, "input[mcAutocomplete], textarea[mcAutocomplete]", ["mcAutocompleteTrigger"], { "autocomplete": "mcAutocomplete"; "connectedTo": "mcAutocompleteConnectedTo"; "autocompleteAttribute": "autocomplete"; "autocompleteDisabled": "mcAutocompleteDisabled"; }, {}, never>;
}

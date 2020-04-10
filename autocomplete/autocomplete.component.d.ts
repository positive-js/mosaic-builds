import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, QueryList, TemplateRef } from '@angular/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { McOptgroup, McOption } from '@ptsecurity/mosaic/core';
export declare class McAutocompleteSelectedEvent {
    source: McAutocomplete;
    option: McOption;
    constructor(source: McAutocomplete, option: McOption);
}
/** Default `mc-autocomplete` options that can be overridden. */
export interface McAutocompleteDefaultOptions {
    /** Whether the first option should be highlighted when an autocomplete panel is opened. */
    autoActiveFirstOption?: boolean;
}
/** Injection token to be used to override the default options for `mc-autocomplete`. */
export declare const MC_AUTOCOMPLETE_DEFAULT_OPTIONS: InjectionToken<McAutocompleteDefaultOptions>;
export declare function MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY(): McAutocompleteDefaultOptions;
export declare class McAutocomplete implements AfterContentInit {
    private changeDetectorRef;
    private elementRef;
    /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
    id: string;
    /** Manages active item in option list based on key events. */
    keyManager: ActiveDescendantKeyManager<McOption>;
    /** Whether the autocomplete panel should be visible, depending on option length. */
    showPanel: boolean;
    template: TemplateRef<any>;
    panel: ElementRef;
    options: QueryList<McOption>;
    optionGroups: QueryList<McOptgroup>;
    /** Function that maps an option's control value to its display value in the trigger. */
    displayWith: ((value: any) => string) | null;
    /**
     * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
     * match the width of its host.
     */
    panelWidth: string | number;
    /** Event that is emitted whenever an option from the list is selected. */
    readonly optionSelected: EventEmitter<McAutocompleteSelectedEvent>;
    /** Event that is emitted when the autocomplete panel is opened. */
    readonly opened: EventEmitter<void>;
    /** Event that is emitted when the autocomplete panel is closed. */
    readonly closed: EventEmitter<void>;
    /**
     * Takes classes set on the host mc-autocomplete element and applies them to the panel
     * inside the overlay container to allow for easy styling.
     */
    get classList(): string;
    set classList(value: string);
    private _classList;
    /**
     * Whether the first option should be highlighted when the autocomplete panel is opened.
     * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
     */
    get autoActiveFirstOption(): boolean;
    set autoActiveFirstOption(value: boolean);
    private _autoActiveFirstOption;
    get isOpen(): boolean;
    set isOpen(value: boolean);
    private _isOpen;
    constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>, defaults: McAutocompleteDefaultOptions);
    ngAfterContentInit(): void;
    setScrollTop(scrollTop: number): void;
    getScrollTop(): number;
    setVisibility(): void;
    emitSelectEvent(option: McOption): void;
    onKeydown(event: KeyboardEvent): any;
}

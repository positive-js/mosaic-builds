import { AfterViewChecked, ChangeDetectorRef, ElementRef, EventEmitter, InjectionToken, OnDestroy, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { McOptgroup } from './optgroup';
/** Event object emitted by McOption when selected or deselected. */
export declare class McOptionSelectionChange {
    source: McOption;
    isUserInput: boolean;
    constructor(source: McOption, isUserInput?: boolean);
}
/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
export interface McOptionParentComponent {
    multiple?: boolean;
}
/**
 * Injection token used to provide the parent component to options.
 */
export declare const MC_OPTION_PARENT_COMPONENT: InjectionToken<McOptionParentComponent>;
/**
 * Single option inside of a `<mc-select>` element.
 */
export declare class McOption implements AfterViewChecked, OnDestroy {
    private readonly element;
    private readonly changeDetectorRef;
    private readonly parent;
    readonly group: McOptgroup;
    /** The form value of the option. */
    value: any;
    get showCheckbox(): boolean | undefined;
    set showCheckbox(value: boolean | undefined);
    private _showCheckbox;
    /** Event emitted when the option is selected or deselected. */
    readonly onSelectionChange: EventEmitter<McOptionSelectionChange>;
    /** Emits when the state of the option changes and any parents have to be notified. */
    readonly stateChanges: Subject<void>;
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue(): string;
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple(): boolean | undefined;
    get id(): string;
    private _id;
    get selected(): boolean;
    private _selected;
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active(): boolean;
    private _active;
    private mostRecentViewValue;
    constructor(element: ElementRef, changeDetectorRef: ChangeDetectorRef, parent: McOptionParentComponent, group: McOptgroup);
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    getHeight(): number;
    select(): void;
    deselect(): void;
    focus(): void;
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles(): void;
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles(): void;
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel(): string;
    /** Ensures the option is selected when activated from the keyboard. */
    handleKeydown(event: KeyboardEvent): void;
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    selectViaInteraction(): void;
    getTabIndex(): string;
    getHostElement(): HTMLElement;
    /** Emits the selection change event. */
    private emitSelectionChangeEvent;
}
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
export declare function countGroupLabelsBeforeOption(optionIndex: number, options: QueryList<McOption>, optionGroups: QueryList<McOptgroup>): number;
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionIndex Index of the option to be scrolled into the view.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export declare function getOptionScrollPosition(optionIndex: number, optionHeight: number, currentScrollPosition: number, panelHeight: number): number;

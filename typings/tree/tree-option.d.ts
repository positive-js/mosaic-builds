import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, EventEmitter, ElementRef, InjectionToken } from '@angular/core';
import { CdkTreeNode } from '@ptsecurity/cdk/tree';
import { CanDisable } from '@ptsecurity/mosaic/core';
export interface McTreeOptionParentComponent {
    multiple: boolean;
    selectionModel: SelectionModel<any>;
    setFocusedOption: any;
}
/**
 * Injection token used to provide the parent component to options.
 */
export declare const MC_TREE_OPTION_PARENT_COMPONENT: InjectionToken<McTreeOptionParentComponent>;
export declare class McTreeOptionChange {
    source: McTreeOption;
    isUserInput: boolean;
    constructor(source: McTreeOption, isUserInput?: boolean);
}
export declare class McTreeOption extends CdkTreeNode<McTreeOption> implements CanDisable {
    protected elementRef: ElementRef;
    protected changeDetectorRef: ChangeDetectorRef;
    private readonly parent;
    value: any;
    private _value;
    disabled: any;
    private _disabled;
    readonly onSelectionChange: EventEmitter<McTreeOptionChange>;
    selected: boolean;
    private _selected;
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    readonly active: boolean;
    private _active;
    readonly id: string;
    private _id;
    readonly multiple: boolean;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, parent: McTreeOptionParentComponent);
    toggle(): void;
    setSelected(selected: boolean): void;
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
    getHeight(): number;
    focus(): void;
    readonly viewValue: string;
    select(): void;
    deselect(): void;
    selectViaInteraction(): void;
    emitSelectionChangeEvent(isUserInput?: boolean): void;
    getHostElement(): HTMLElement;
    getTabIndex(): string;
}

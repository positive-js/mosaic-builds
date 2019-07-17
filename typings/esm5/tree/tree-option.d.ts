import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, EventEmitter, ElementRef, InjectionToken } from '@angular/core';
import { CdkTreeNode } from '@ptsecurity/cdk/tree';
import { CanDisable } from '@ptsecurity/mosaic/core';
export interface McTreeOptionParentComponent {
    multiple: boolean;
    selectionModel: SelectionModel<any>;
    setSelectedOption: any;
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
    readonly id: string;
    private _id;
    readonly multiple: boolean;
    hasFocus: boolean;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, parent: McTreeOptionParentComponent);
    toggle(): void;
    setSelected(selected: boolean): void;
    handleFocus(): void;
    handleBlur(): void;
    focus(): void;
    getHeight(): number;
    readonly viewValue: string;
    select(): void;
    deselect(): void;
    selectViaInteraction($event?: KeyboardEvent): void;
    emitSelectionChangeEvent(isUserInput?: boolean): void;
    getHostElement(): HTMLElement;
    getTabIndex(): string;
}

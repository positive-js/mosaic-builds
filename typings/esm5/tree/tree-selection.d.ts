import { AfterContentInit, ChangeDetectorRef, EventEmitter, IterableDiffer, IterableDiffers, QueryList, ElementRef } from '@angular/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { SelectionModel } from '@ptsecurity/cdk/collections';
import { CdkTree, CdkTreeNodeOutlet } from '@ptsecurity/cdk/tree';
import { CanDisable, CanDisableCtor, HasTabIndex, HasTabIndexCtor } from '@ptsecurity/mosaic/core';
import { McTreeOption } from './tree-option';
export declare class McTreeNavigationChange {
    source: McTreeSelection;
    option: McTreeOption;
    constructor(source: McTreeSelection, option: McTreeOption);
}
export declare class McTreeSelectionChange {
    source: McTreeSelection;
    option: McTreeOption;
    constructor(source: McTreeSelection, option: McTreeOption);
}
declare class McTreeSelectionBase<T> extends CdkTree<T> {
    constructor(differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef);
}
declare const McTreeSelectionBaseMixin: HasTabIndexCtor & CanDisableCtor & typeof McTreeSelectionBase;
export declare class McTreeSelection extends McTreeSelectionBaseMixin<McTreeOption> implements AfterContentInit, CanDisable, HasTabIndex {
    private elementRef;
    nodeOutlet: CdkTreeNodeOutlet;
    options: QueryList<McTreeOption>;
    keyManager: ActiveDescendantKeyManager<McTreeOption>;
    selectionModel: SelectionModel<McTreeOption>;
    tabIndex: number;
    multiple: boolean;
    autoSelect: boolean;
    noUnselect: boolean;
    withShift: boolean;
    withCtrl: boolean;
    readonly navigationChange: EventEmitter<McTreeNavigationChange>;
    readonly selectionChange: EventEmitter<McTreeSelectionChange>;
    disabled: boolean;
    private _disabled;
    private readonly destroy;
    constructor(elementRef: ElementRef, differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef, tabIndex: string, multiple: string, autoSelect: string, noUnselect: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onKeyDown(event: KeyboardEvent): void;
    updateScrollSize(): void;
    setFocusedOption(option: McTreeOption): void;
    toggleFocusedOption(): void;
    renderNodeChanges(data: McTreeOption[], dataDiffer?: IterableDiffer<McTreeOption>, viewContainer?: any, parentData?: McTreeOption): void;
    getHeight(): number;
    emitNavigationEvent(option: McTreeOption): void;
    emitChangeEvent(option: McTreeOption): void;
    private isValidIndex;
    private canDeselectLast;
}
export {};

import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectorRef, EventEmitter, IterableDiffer, IterableDiffers, QueryList, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { CdkTree, CdkTreeNodeOutlet } from '@ptsecurity/cdk/tree';
import { CanDisable, HasTabIndex } from '@ptsecurity/mosaic/core';
import { McTreeOption } from './tree-option.component';
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
export declare class McTreeSelection extends CdkTree<any> implements ControlValueAccessor, AfterContentInit, CanDisable, HasTabIndex {
    private elementRef;
    ngControl: NgControl;
    nodeOutlet: CdkTreeNodeOutlet;
    options: QueryList<McTreeOption>;
    keyManager: FocusKeyManager<McTreeOption>;
    selectionModel: SelectionModel<any>;
    multiple: boolean;
    autoSelect: boolean;
    noUnselectLastSelected: boolean;
    readonly navigationChange: EventEmitter<McTreeNavigationChange>;
    readonly selectionChange: EventEmitter<McTreeSelectionChange>;
    disabled: boolean;
    private _disabled;
    tabIndex: number;
    private _tabIndex;
    private readonly destroy;
    constructor(elementRef: ElementRef, differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef, ngControl: NgControl, multiple: string, autoSelect: string, noUnselect: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onKeyDown(event: KeyboardEvent): void;
    updateScrollSize(): void;
    setSelectedOption(option: McTreeOption, $event?: KeyboardEvent): void;
    setFocusedOption(option: McTreeOption): void;
    toggleFocusedOption(): void;
    renderNodeChanges(data: McTreeOption[], dataDiffer?: IterableDiffer<McTreeOption>, viewContainer?: any, parentData?: McTreeOption): void;
    getHeight(): number;
    emitNavigationEvent(option: McTreeOption): void;
    emitChangeEvent(option: McTreeOption): void;
    writeValue(value: any): void;
    /** `View -> model callback called when value changes` */
    onChange: (value: any) => void;
    registerOnChange(fn: (value: any) => void): void;
    /** `View -> model callback called when select has been touched` */
    onTouched: () => void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    private getCorrespondOption;
    private setOptionsFromValues;
    private canDeselectLast;
}

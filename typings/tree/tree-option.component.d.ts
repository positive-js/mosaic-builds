import { ChangeDetectorRef, EventEmitter, ElementRef, InjectionToken, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FocusMonitor } from '@ptsecurity/cdk/a11y';
import { CdkTreeNode } from '@ptsecurity/cdk/tree';
import { CanDisable } from '@ptsecurity/mosaic/core';
/**
 * Injection token used to provide the parent component to options.
 */
export declare const MC_TREE_OPTION_PARENT_COMPONENT: InjectionToken<any>;
export declare class McTreeOptionChange {
    source: McTreeOption;
    isUserInput: boolean;
    constructor(source: McTreeOption, isUserInput?: boolean);
}
export declare class McTreeOption extends CdkTreeNode<McTreeOption> implements OnInit, OnDestroy, CanDisable, AfterContentInit {
    private changeDetectorRef;
    private focusMonitor;
    tree: any;
    value: any;
    private _value;
    disabled: any;
    private _disabled;
    readonly showCheckbox: boolean;
    readonly onSelectionChange: EventEmitter<McTreeOptionChange>;
    selected: boolean;
    private _selected;
    readonly id: string;
    private _id;
    readonly multiple: boolean;
    readonly viewValue: string;
    hasFocus: boolean;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, focusMonitor: FocusMonitor, tree: any);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    setSelected(selected: boolean): void;
    handleFocus(): void;
    handleBlur(): void;
    focus(): void;
    getHeight(): number;
    select(): void;
    deselect(): void;
    selectViaInteraction($event?: KeyboardEvent): void;
    emitSelectionChangeEvent(isUserInput?: boolean): void;
    getHostElement(): HTMLElement;
    getTabIndex(): string;
    markForCheck(): void;
}

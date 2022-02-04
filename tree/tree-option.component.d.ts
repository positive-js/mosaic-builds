import { FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectorRef, EventEmitter, ElementRef, InjectionToken, AfterContentInit, NgZone } from '@angular/core';
import { McOptionActionComponent, McPseudoCheckbox } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { McTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { Subject } from 'rxjs';
import { McTreeNodeToggleBaseDirective } from './toggle';
import { McTreeNode } from './tree-base';
import * as i0 from "@angular/core";
export interface McTreeOptionEvent {
    option: McTreeOption;
}
/**
 * Injection token used to provide the parent component to options.
 */
export declare const MC_TREE_OPTION_PARENT_COMPONENT: InjectionToken<any>;
export declare class McTreeOptionChange {
    source: McTreeOption;
    isUserInput: boolean;
    constructor(source: McTreeOption, isUserInput?: boolean);
}
export declare class McTreeOption extends McTreeNode<McTreeOption> implements AfterContentInit {
    private changeDetectorRef;
    private ngZone;
    tree: any;
    readonly onFocus: Subject<McTreeOptionEvent>;
    readonly onBlur: Subject<McTreeOptionEvent>;
    toggleElement: McTreeNodeToggleBaseDirective<McTreeOption>;
    pseudoCheckbox: McPseudoCheckbox;
    actionButton: McOptionActionComponent;
    tooltipTrigger: McTooltipTrigger;
    dropdownTrigger: McDropdownTrigger;
    get externalPseudoCheckbox(): boolean;
    get value(): any;
    set value(value: any);
    private _value;
    get disabled(): any;
    set disabled(value: any);
    private _disabled;
    get showCheckbox(): any;
    set showCheckbox(value: any);
    private _showCheckbox;
    readonly onSelectionChange: EventEmitter<McTreeOptionChange>;
    get selected(): boolean;
    set selected(value: boolean);
    private _selected;
    get id(): string;
    private _id;
    get viewValue(): string;
    hasFocus: boolean;
    get isExpandable(): boolean;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, tree: any);
    ngAfterContentInit(): void;
    toggle(): void;
    setSelected(selected: boolean): void;
    focus(focusOrigin?: FocusOrigin): void;
    blur(): void;
    getHeight(): number;
    select(setFocus?: boolean): void;
    deselect(): void;
    onKeydown($event: any): void;
    selectViaInteraction($event?: KeyboardEvent): void;
    emitSelectionChangeEvent(isUserInput?: boolean): void;
    getHostElement(): HTMLElement;
    markForCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeOption, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTreeOption, "mc-tree-option", ["mcTreeOption"], { "disabled": "disabled"; "showCheckbox": "showCheckbox"; }, { "onSelectionChange": "onSelectionChange"; }, ["toggleElement", "pseudoCheckbox", "actionButton", "tooltipTrigger", "dropdownTrigger"], ["mc-tree-node-toggle, [mc-tree-node-toggle], [mcTreeNodeToggle]", "mc-pseudo-checkbox", "mc-checkbox", "[mc-icon]", "mc-progress-spinner", "*", "mc-option-action"]>;
}

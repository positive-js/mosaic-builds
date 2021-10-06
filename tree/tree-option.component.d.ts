import { FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectorRef, EventEmitter, ElementRef, InjectionToken, AfterContentInit, NgZone } from '@angular/core';
import { CdkTreeNode } from '@ptsecurity/cdk/tree';
import { CanDisable } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
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
export declare class McTreeOption extends CdkTreeNode<McTreeOption> implements CanDisable, AfterContentInit {
    private changeDetectorRef;
    private ngZone;
    tree: any;
    readonly onFocus: Subject<McTreeOptionEvent>;
    readonly onBlur: Subject<McTreeOptionEvent>;
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
    get multiple(): boolean;
    get viewValue(): string;
    hasFocus: boolean;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, tree: any);
    ngAfterContentInit(): void;
    toggle(): void;
    setSelected(selected: boolean): void;
    focus(focusOrigin?: FocusOrigin): void;
    blur(): void;
    getHeight(): number;
    select(): void;
    deselect(): void;
    selectViaInteraction($event?: KeyboardEvent): void;
    emitSelectionChangeEvent(isUserInput?: boolean): void;
    getHostElement(): HTMLElement;
    markForCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeOption, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTreeOption, "mc-tree-option", ["mcTreeOption"], { "disabled": "disabled"; "showCheckbox": "showCheckbox"; }, { "onSelectionChange": "onSelectionChange"; }, never, ["[mc-icon]", "mc-tree-node-toggle", "*"]>;
}

import { ChangeDetectorRef, EventEmitter, ElementRef, InjectionToken, AfterContentInit, NgZone } from '@angular/core';
import { CdkTreeNode } from '@ptsecurity/cdk/tree';
import { CanDisable } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
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
    value: any;
    private _value;
    disabled: any;
    private _disabled;
    showCheckbox: any;
    private _showCheckbox;
    readonly onSelectionChange: EventEmitter<McTreeOptionChange>;
    selected: boolean;
    private _selected;
    readonly id: string;
    private _id;
    readonly multiple: boolean;
    readonly viewValue: string;
    readonly tabIndex: any;
    hasFocus: boolean;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, tree: any);
    ngAfterContentInit(): void;
    toggle(): void;
    setSelected(selected: boolean): void;
    focus(): void;
    blur(): void;
    getHeight(): number;
    select(): void;
    deselect(): void;
    selectViaInteraction($event?: KeyboardEvent): void;
    emitSelectionChangeEvent(isUserInput?: boolean): void;
    getHostElement(): HTMLElement;
    markForCheck(): void;
}

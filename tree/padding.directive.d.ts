import { Directionality } from '@angular/cdk/bidi';
import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { McTreeBase, McTreeNode } from './tree-base';
import * as i0 from "@angular/core";
export declare class McTreeNodePadding<T> implements OnInit, OnDestroy {
    protected treeNode: McTreeNode<T>;
    protected tree: McTreeBase<T>;
    private renderer;
    private element;
    private dir;
    get level(): number;
    set level(value: number);
    private _level;
    get indent(): number | string;
    set indent(indent: number | string);
    private _indent;
    get leftPadding(): number;
    /** CSS units used for the indentation value. */
    indentUnits: string;
    baseLeftPadding: number;
    withIcon: boolean;
    iconWidth: number;
    private destroyed;
    constructor(treeNode: McTreeNode<T>, tree: McTreeBase<T>, renderer: Renderer2, element: ElementRef<HTMLElement>, dir: Directionality);
    ngOnInit(): void;
    ngOnDestroy(): void;
    paddingIndent(): string | null;
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    private setLevelInput;
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    private setIndentInput;
    private setPadding;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodePadding<any>, [null, null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTreeNodePadding<any>, "[mcTreeNodePadding]", ["mcTreeNodePadding"], { "level": "mcTreeNodePadding"; "indent": "mcTreeNodePaddingIndent"; }, {}, never>;
}

import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McTreeBase, McTreeNode } from './tree-base';
import * as i0 from "@angular/core";
export declare class McTreeNodeToggleBase {
}
export declare const McTreeNodeToggleMixinBase: CanDisableCtor & typeof McTreeNodeToggleBase;
/** @docs-private */
export declare class McTreeNodeToggleBaseDirective<T> extends McTreeNodeToggleMixinBase implements CanDisable {
    private tree;
    private treeNode;
    node: T;
    get recursive(): boolean;
    set recursive(value: any);
    private _recursive;
    get iconState(): boolean;
    constructor(tree: McTreeBase<T>, treeNode: McTreeNode<T>);
    toggle(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodeToggleBaseDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTreeNodeToggleBaseDirective<any>, never, never, { "node": "node"; "recursive": "mcTreeNodeToggleRecursive"; }, {}, never>;
}
export declare class McTreeNodeToggleComponent<T> extends McTreeNodeToggleBaseDirective<T> {
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodeToggleComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTreeNodeToggleComponent<any>, "mc-tree-node-toggle", ["mcTreeNodeToggle"], { "disabled": "disabled"; }, {}, never, never>;
}
export declare class McTreeNodeToggleDirective<T> extends McTreeNodeToggleBaseDirective<T> {
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodeToggleDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTreeNodeToggleDirective<any>, "[mcTreeNodeToggle]", ["mcTreeNodeToggle"], {}, {}, never>;
}

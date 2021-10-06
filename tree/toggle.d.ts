import { CdkTree, CdkTreeNode } from '@ptsecurity/cdk/tree';
import * as i0 from "@angular/core";
export declare class McTreeNodeToggleComponent<T> {
    private tree;
    private treeNode;
    disabled: boolean;
    node: T;
    get recursive(): boolean;
    set recursive(value: boolean);
    private _recursive;
    get iconState(): any;
    constructor(tree: CdkTree<T>, treeNode: CdkTreeNode<T>);
    toggle(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodeToggleComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTreeNodeToggleComponent<any>, "mc-tree-node-toggle", never, { "node": "node"; "recursive": "cdkTreeNodeToggleRecursive"; }, {}, never, never>;
}
export declare class McTreeNodeToggleDirective<T> {
    private tree;
    private treeNode;
    disabled: boolean;
    get recursive(): boolean;
    set recursive(value: boolean);
    private _recursive;
    constructor(tree: CdkTree<T>, treeNode: CdkTreeNode<T>);
    toggle(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodeToggleDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTreeNodeToggleDirective<any>, "[mcTreeNodeToggle]", never, { "recursive": "cdkTreeNodeToggleRecursive"; }, {}, never>;
}

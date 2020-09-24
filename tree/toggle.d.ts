import { CdkTree, CdkTreeNode } from '@ptsecurity/cdk/tree';
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
}

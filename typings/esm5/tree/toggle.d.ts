import { CdkTree, CdkTreeNode, CdkTreeNodeToggle } from '@ptsecurity/cdk/tree';
export declare class McTreeNodeToggleComponent<T> extends CdkTreeNodeToggle<T> {
    protected tree: CdkTree<T>;
    protected treeNode: CdkTreeNode<T>;
    disabled: boolean;
    node: T;
    readonly iconState: any;
    constructor(tree: CdkTree<T>, treeNode: CdkTreeNode<T>);
}
export declare class McTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
    protected tree: CdkTree<T>;
    protected treeNode: CdkTreeNode<T>;
    disabled: boolean;
    constructor(tree: CdkTree<T>, treeNode: CdkTreeNode<T>);
}

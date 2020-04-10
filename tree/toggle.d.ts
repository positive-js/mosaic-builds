import { CdkTree, CdkTreeNode, CdkTreeNodeToggle } from '@ptsecurity/cdk/tree';
export declare class McTreeNodeToggleComponent<T> extends CdkTreeNodeToggle<T> {
    disabled: boolean;
    node: T;
    get iconState(): any;
    constructor(tree: CdkTree<T>, treeNode: CdkTreeNode<T>);
}
export declare class McTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
    disabled: boolean;
    constructor(tree: CdkTree<T>, treeNode: CdkTreeNode<T>);
}

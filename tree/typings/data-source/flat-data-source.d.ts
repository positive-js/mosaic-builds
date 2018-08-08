import { ICollectionViewer, DataSource } from '@ptsecurity/cdk/collections';
import { FlatTreeControl, ITreeControl } from '@ptsecurity/cdk/tree';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type `T` to flattened nodes of type `F`.
 *
 * For example, the input data of type `T` is nested, and contains its children data:
 *   SomeNode: {
 *     key: 'Fruits',
 *     children: [
 *       NodeOne: {
 *         key: 'Apple',
 *       },
 *       NodeTwo: {
 *        key: 'Pear',
 *      }
 *    ]
 *  }
 *  After flattener flatten the tree, the structure will become
 *  SomeNode: {
 *    key: 'Fruits',
 *    expandable: true,
 *    level: 1
 *  },
 *  NodeOne: {
 *    key: 'Apple',
 *    expandable: false,
 *    level: 2
 *  },
 *  NodeTwo: {
 *   key: 'Pear',
 *   expandable: false,
 *   level: 2
 * }
 * and the output flattened type is `F` with additional information.
 */
export declare class McTreeFlattener<T, F> {
    transformFunction: (node: T, level: number) => F;
    getLevel: (node: F) => number;
    isExpandable: (node: F) => boolean;
    getChildren: (node: T) => Observable<T[]>;
    constructor(transformFunction: (node: T, level: number) => F, getLevel: (node: F) => number, isExpandable: (node: F) => boolean, getChildren: (node: T) => Observable<T[]>);
    _flattenNode(node: T, level: number, resultNodes: F[], parentMap: boolean[]): F[];
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData: T[]): F[];
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    expandFlattenedNodes(nodes: F[], treeControl: ITreeControl<F>): F[];
}
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 */
export declare class McTreeFlatDataSource<T, F> extends DataSource<F> {
    private treeControl;
    private treeFlattener;
    _flattenedData: BehaviorSubject<F[]>;
    _expandedData: BehaviorSubject<F[]>;
    _data: BehaviorSubject<T[]>;
    data: T[];
    constructor(treeControl: FlatTreeControl<F>, treeFlattener: McTreeFlattener<T, F>, initialData?: T[]);
    connect(collectionViewer: ICollectionViewer): Observable<F[]>;
    disconnect(): void;
}

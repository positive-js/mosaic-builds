import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlatTreeControl } from '../control/flat-tree-control';
import { TreeControl } from '../control/tree-control';
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
    transformFunction: (node: T, level: number, parent: F | null) => F;
    getLevel: (node: F) => number;
    isExpandable: (node: F) => boolean;
    getChildren: (node: T) => Observable<T[]> | T[] | undefined | null;
    constructor(transformFunction: (node: T, level: number, parent: F | null) => F, getLevel: (node: F) => number, isExpandable: (node: F) => boolean, getChildren: (node: T) => Observable<T[]> | T[] | undefined | null);
    flattenNode(node: T, level: number, resultNodes: F[], parent: F | null): F[];
    flattenChildren(children: T[], level: number, resultNodes: F[], parent: F | null): void;
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
    expandFlattenedNodes(nodes: F[], treeControl: TreeControl<F>): F[];
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
    flattenedData: BehaviorSubject<F[]>;
    expandedData: BehaviorSubject<F[]>;
    filteredData: BehaviorSubject<F[]>;
    get data(): T[];
    set data(value: T[]);
    private _data;
    constructor(treeControl: FlatTreeControl<F>, treeFlattener: McTreeFlattener<T, F>, initialData?: T[]);
    connect(collectionViewer: CollectionViewer): Observable<F[]>;
    filterHandler(): F[];
    expansionHandler(): F[];
    disconnect(): void;
}

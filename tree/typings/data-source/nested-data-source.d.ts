import { ICollectionViewer, DataSource } from '@ptsecurity/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 */
export declare class McTreeNestedDataSource<T> extends DataSource<T> {
    _data: BehaviorSubject<T[]>;
    /**
     * Data for the nested tree
     */
    data: T[];
    connect(collectionViewer: ICollectionViewer): Observable<T[]>;
    disconnect(): void;
}

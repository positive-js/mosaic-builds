import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by ITreeControl and each non-leaf node.
 */
export declare class McTreeNestedDataSource<T> extends DataSource<T> {
    data: T[];
    private _data;
    connect(collectionViewer: CollectionViewer): Observable<T[]>;
    disconnect(): void;
}

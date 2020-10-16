/**
 * @fileoverview added by tsickle
 * Generated from: data-source/nested-data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 * @template T
 */
export class McTreeNestedDataSource extends DataSource {
    constructor() {
        super(...arguments);
        /* tslint:disable-next-line:naming-convention */
        this._data = new BehaviorSubject([]);
    }
    /**
     * @return {?}
     */
    get data() {
        return this._data.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        this._data.next(value);
    }
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    connect(collectionViewer) {
        return merge(...[collectionViewer.viewChange, this._data])
            .pipe(map((/**
         * @return {?}
         */
        () => this.data)));
    }
    /**
     * @return {?}
     */
    disconnect() {
        // no op
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    McTreeNestedDataSource.prototype._data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLWRhdGEtc291cmNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvdHJlZS8iLCJzb3VyY2VzIjpbImRhdGEtc291cmNlL25lc3RlZC1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBb0IsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQVNyQyxNQUFNLE9BQU8sc0JBQTBCLFNBQVEsVUFBYTtJQUE1RDs7O1FBV1ksVUFBSyxHQUFHLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQyxDQUFDO0lBVWpELENBQUM7Ozs7SUFuQkcsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELElBQUksSUFBSSxDQUFDLEtBQVU7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7OztJQUtELE9BQU8sQ0FBQyxnQkFBa0M7UUFDdEMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckQsSUFBSSxDQUFDLEdBQUc7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ04sUUFBUTtJQUNaLENBQUM7Q0FDSjs7Ozs7O0lBVkcsdUNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sbGVjdGlvblZpZXdlciwgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIG1lcmdlLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLyoqXG4gKiBEYXRhIHNvdXJjZSBmb3IgbmVzdGVkIHRyZWUuXG4gKlxuICogVGhlIGRhdGEgc291cmNlIGZvciBuZXN0ZWQgdHJlZSBkb2Vzbid0IGhhdmUgdG8gY29uc2lkZXIgbm9kZSBmbGF0dGVuZXIsIG9yIHRoZSB3YXkgdG8gZXhwYW5kXG4gKiBvciBjb2xsYXBzZS4gVGhlIGV4cGFuc2lvbi9jb2xsYXBzaW9uIHdpbGwgYmUgaGFuZGxlZCBieSBUcmVlQ29udHJvbCBhbmQgZWFjaCBub24tbGVhZiBub2RlLlxuICovXG5leHBvcnQgY2xhc3MgTWNUcmVlTmVzdGVkRGF0YVNvdXJjZTxUPiBleHRlbmRzIERhdGFTb3VyY2U8VD4ge1xuXG4gICAgZ2V0IGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbHVlOiBUW10pIHtcbiAgICAgICAgdGhpcy5fZGF0YS5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gKi9cbiAgICBwcml2YXRlIF9kYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KFtdKTtcblxuICAgIGNvbm5lY3QoY29sbGVjdGlvblZpZXdlcjogQ29sbGVjdGlvblZpZXdlcik6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgICAgIHJldHVybiBtZXJnZSguLi5bY29sbGVjdGlvblZpZXdlci52aWV3Q2hhbmdlLCB0aGlzLl9kYXRhXSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgoKSA9PiB0aGlzLmRhdGEpKTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICAvLyBubyBvcFxuICAgIH1cbn1cblxuIl19
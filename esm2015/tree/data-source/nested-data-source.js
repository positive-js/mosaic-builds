/**
 * @fileoverview added by tsickle
 * Generated from: data-source/nested-data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLWRhdGEtc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJkYXRhLXNvdXJjZS9uZXN0ZWQtZGF0YS1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQW9CLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFTckMsTUFBTSxPQUFPLHNCQUEwQixTQUFRLFVBQWE7SUFBNUQ7OztRQVdZLFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQztJQVVqRCxDQUFDOzs7O0lBbkJHLElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLElBQUksQ0FBQyxLQUFVO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFLRCxPQUFPLENBQUMsZ0JBQWtDO1FBQ3RDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JELElBQUksQ0FBQyxHQUFHOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLFFBQVE7SUFDWixDQUFDO0NBQ0o7Ozs7OztJQVZHLHVDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbGxlY3Rpb25WaWV3ZXIsIERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKlxuICogRGF0YSBzb3VyY2UgZm9yIG5lc3RlZCB0cmVlLlxuICpcbiAqIFRoZSBkYXRhIHNvdXJjZSBmb3IgbmVzdGVkIHRyZWUgZG9lc24ndCBoYXZlIHRvIGNvbnNpZGVyIG5vZGUgZmxhdHRlbmVyLCBvciB0aGUgd2F5IHRvIGV4cGFuZFxuICogb3IgY29sbGFwc2UuIFRoZSBleHBhbnNpb24vY29sbGFwc2lvbiB3aWxsIGJlIGhhbmRsZWQgYnkgVHJlZUNvbnRyb2wgYW5kIGVhY2ggbm9uLWxlYWYgbm9kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZU5lc3RlZERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcblxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YSh2YWx1ZTogVFtdKSB7XG4gICAgICAgIHRoaXMuX2RhdGEubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uICovXG4gICAgcHJpdmF0ZSBfZGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XG5cbiAgICBjb25uZWN0KGNvbGxlY3Rpb25WaWV3ZXI6IENvbGxlY3Rpb25WaWV3ZXIpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4uW2NvbGxlY3Rpb25WaWV3ZXIudmlld0NoYW5nZSwgdGhpcy5fZGF0YV0pXG4gICAgICAgICAgICAucGlwZShtYXAoKCkgPT4gdGhpcy5kYXRhKSk7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgLy8gbm8gb3BcbiAgICB9XG59XG5cbiJdfQ==
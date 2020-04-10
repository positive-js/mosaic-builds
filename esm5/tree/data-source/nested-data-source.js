/**
 * @fileoverview added by tsickle
 * Generated from: data-source/nested-data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
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
var /**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 * @template T
 */
McTreeNestedDataSource = /** @class */ (function (_super) {
    __extends(McTreeNestedDataSource, _super);
    function McTreeNestedDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* tslint:disable-next-line:naming-convention */
        _this._data = new BehaviorSubject([]);
        return _this;
    }
    Object.defineProperty(McTreeNestedDataSource.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this._data.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._data.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    McTreeNestedDataSource.prototype.connect = /**
     * @param {?} collectionViewer
     * @return {?}
     */
    function (collectionViewer) {
        var _this = this;
        return merge.apply(void 0, __spread([collectionViewer.viewChange, this._data])).pipe(map((/**
         * @return {?}
         */
        function () { return _this.data; })));
    };
    /**
     * @return {?}
     */
    McTreeNestedDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        // no op
    };
    return McTreeNestedDataSource;
}(DataSource));
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 * @template T
 */
export { McTreeNestedDataSource };
if (false) {
    /**
     * @type {?}
     * @private
     */
    McTreeNestedDataSource.prototype._data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLWRhdGEtc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJkYXRhLXNvdXJjZS9uZXN0ZWQtZGF0YS1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFvQixVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBU3JDOzs7Ozs7OztJQUErQywwQ0FBYTtJQUE1RDtRQUFBLHFFQXFCQzs7UUFWVyxXQUFLLEdBQUcsSUFBSSxlQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7O0lBVWpELENBQUM7SUFuQkcsc0JBQUksd0NBQUk7Ozs7UUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQzs7Ozs7UUFFRCxVQUFTLEtBQVU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDOzs7T0FKQTs7Ozs7SUFTRCx3Q0FBTzs7OztJQUFQLFVBQVEsZ0JBQWtDO1FBQTFDLGlCQUdDO1FBRkcsT0FBTyxLQUFLLHdCQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FDcEQsSUFBSSxDQUFDLEdBQUc7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFULENBQVMsRUFBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELDJDQUFVOzs7SUFBVjtRQUNJLFFBQVE7SUFDWixDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBckJELENBQStDLFVBQVUsR0FxQnhEOzs7Ozs7Ozs7Ozs7OztJQVZHLHVDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbGxlY3Rpb25WaWV3ZXIsIERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKlxuICogRGF0YSBzb3VyY2UgZm9yIG5lc3RlZCB0cmVlLlxuICpcbiAqIFRoZSBkYXRhIHNvdXJjZSBmb3IgbmVzdGVkIHRyZWUgZG9lc24ndCBoYXZlIHRvIGNvbnNpZGVyIG5vZGUgZmxhdHRlbmVyLCBvciB0aGUgd2F5IHRvIGV4cGFuZFxuICogb3IgY29sbGFwc2UuIFRoZSBleHBhbnNpb24vY29sbGFwc2lvbiB3aWxsIGJlIGhhbmRsZWQgYnkgVHJlZUNvbnRyb2wgYW5kIGVhY2ggbm9uLWxlYWYgbm9kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZU5lc3RlZERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcblxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YSh2YWx1ZTogVFtdKSB7XG4gICAgICAgIHRoaXMuX2RhdGEubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uICovXG4gICAgcHJpdmF0ZSBfZGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XG5cbiAgICBjb25uZWN0KGNvbGxlY3Rpb25WaWV3ZXI6IENvbGxlY3Rpb25WaWV3ZXIpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4uW2NvbGxlY3Rpb25WaWV3ZXIudmlld0NoYW5nZSwgdGhpcy5fZGF0YV0pXG4gICAgICAgICAgICAucGlwZShtYXAoKCkgPT4gdGhpcy5kYXRhKSk7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgLy8gbm8gb3BcbiAgICB9XG59XG5cbiJdfQ==
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 */
export class McTreeNestedDataSource extends DataSource {
    constructor() {
        super(...arguments);
        /* tslint:disable-next-line:naming-convention */
        this._data = new BehaviorSubject([]);
    }
    get data() {
        return this._data.value;
    }
    set data(value) {
        this._data.next(value);
    }
    connect(collectionViewer) {
        return merge(...[collectionViewer.viewChange, this._data])
            .pipe(map(() => this.data));
    }
    disconnect() {
        // no op
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLWRhdGEtc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvZGF0YS1zb3VyY2UvbmVzdGVkLWRhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLHNCQUEwQixTQUFRLFVBQWE7SUFBNUQ7O1FBVUksZ0RBQWdEO1FBQ3hDLFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQztJQVVqRCxDQUFDO0lBbkJHLElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQVU7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBS0QsT0FBTyxDQUFDLGdCQUFrQztRQUN0QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxVQUFVO1FBQ04sUUFBUTtJQUNaLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbGxlY3Rpb25WaWV3ZXIsIERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKlxuICogRGF0YSBzb3VyY2UgZm9yIG5lc3RlZCB0cmVlLlxuICpcbiAqIFRoZSBkYXRhIHNvdXJjZSBmb3IgbmVzdGVkIHRyZWUgZG9lc24ndCBoYXZlIHRvIGNvbnNpZGVyIG5vZGUgZmxhdHRlbmVyLCBvciB0aGUgd2F5IHRvIGV4cGFuZFxuICogb3IgY29sbGFwc2UuIFRoZSBleHBhbnNpb24vY29sbGFwc2lvbiB3aWxsIGJlIGhhbmRsZWQgYnkgVHJlZUNvbnRyb2wgYW5kIGVhY2ggbm9uLWxlYWYgbm9kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZU5lc3RlZERhdGFTb3VyY2U8VD4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcblxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YSh2YWx1ZTogVFtdKSB7XG4gICAgICAgIHRoaXMuX2RhdGEubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uICovXG4gICAgcHJpdmF0ZSBfZGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XG5cbiAgICBjb25uZWN0KGNvbGxlY3Rpb25WaWV3ZXI6IENvbGxlY3Rpb25WaWV3ZXIpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoLi4uW2NvbGxlY3Rpb25WaWV3ZXIudmlld0NoYW5nZSwgdGhpcy5fZGF0YV0pXG4gICAgICAgICAgICAucGlwZShtYXAoKCkgPT4gdGhpcy5kYXRhKSk7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgLy8gbm8gb3BcbiAgICB9XG59XG5cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * Generated from: data-source/flat-data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
 * @template T, F
 */
export class McTreeFlattener {
    /**
     * @param {?} transformFunction
     * @param {?} getLevel
     * @param {?} isExpandable
     * @param {?} getChildren
     */
    constructor(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    /**
     * @param {?} node
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    flattenNode(node, level, resultNodes, parent) {
        /** @type {?} */
        const flatNode = this.transformFunction(node, level, parent);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            /** @type {?} */
            const childrenNodes = this.getChildren(node);
            if (childrenNodes) {
                if (Array.isArray(childrenNodes)) {
                    this.flattenChildren(childrenNodes, level, resultNodes, flatNode);
                }
                else {
                    childrenNodes
                        .pipe(take(1))
                        .subscribe((/**
                     * @param {?} children
                     * @return {?}
                     */
                    (children) => {
                        this.flattenChildren(children, level, resultNodes, flatNode);
                    }));
                }
            }
        }
        return resultNodes;
    }
    /**
     * @param {?} children
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    flattenChildren(children, level, resultNodes, parent) {
        children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        (child) => {
            this.flattenNode(child, level + 1, resultNodes, parent);
        }));
    }
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     * @param {?} structuredData
     * @return {?}
     */
    flattenNodes(structuredData) {
        /** @type {?} */
        const resultNodes = [];
        structuredData.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => this.flattenNode(node, 0, resultNodes, null)));
        return resultNodes;
    }
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     * @param {?} nodes
     * @param {?} treeControl
     * @return {?}
     */
    expandFlattenedNodes(nodes, treeControl) {
        /** @type {?} */
        const results = [];
        /** @type {?} */
        const currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            /** @type {?} */
            let expand = true;
            for (let i = 0; i <= this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (this.isExpandable(node)) {
                currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        }));
        return results;
    }
}
if (false) {
    /** @type {?} */
    McTreeFlattener.prototype.transformFunction;
    /** @type {?} */
    McTreeFlattener.prototype.getLevel;
    /** @type {?} */
    McTreeFlattener.prototype.isExpandable;
    /** @type {?} */
    McTreeFlattener.prototype.getChildren;
}
/** @enum {string} */
const McTreeDataSourceChangeTypes = {
    Expansion: "expansion",
    Filter: "filter",
};
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 * @template T, F
 */
export class McTreeFlatDataSource extends DataSource {
    /**
     * @param {?} treeControl
     * @param {?} treeFlattener
     * @param {?=} initialData
     */
    constructor(treeControl, treeFlattener, initialData = []) {
        super();
        this.treeControl = treeControl;
        this.treeFlattener = treeFlattener;
        this.flattenedData = new BehaviorSubject([]);
        this.expandedData = new BehaviorSubject([]);
        this.filteredData = new BehaviorSubject([]);
        this._data = new BehaviorSubject(initialData);
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
        this.flattenedData.next(this.treeFlattener.flattenNodes(this.data));
        this.treeControl.dataNodes = this.flattenedData.value;
    }
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    connect(collectionViewer) {
        return merge(collectionViewer.viewChange, this.treeControl.expansionModel.changed
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => ({ type: McTreeDataSourceChangeTypes.Expansion, value })))), this.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        (value) => ({ type: McTreeDataSourceChangeTypes.Filter, value })))), this.flattenedData)
            .pipe(map((/**
         * @param {?} changeObj
         * @return {?}
         */
        (changeObj) => {
            if (changeObj.type === McTreeDataSourceChangeTypes.Filter) {
                if (changeObj.value && changeObj.value.length > 0) {
                    return this.filterHandler();
                }
                else {
                    return this.expansionHandler();
                }
            }
            return this.expansionHandler();
        })));
    }
    /**
     * @return {?}
     */
    filterHandler() {
        this.filteredData.next(this.treeControl.filterModel.selected);
        return this.filteredData.value;
    }
    /**
     * @return {?}
     */
    expansionHandler() {
        /** @type {?} */
        const expandedNodes = this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl);
        this.expandedData.next(expandedNodes);
        return this.expandedData.value;
    }
    /**
     * @return {?}
     */
    disconnect() {
        // no op
    }
}
if (false) {
    /** @type {?} */
    McTreeFlatDataSource.prototype.flattenedData;
    /** @type {?} */
    McTreeFlatDataSource.prototype.expandedData;
    /** @type {?} */
    McTreeFlatDataSource.prototype.filteredData;
    /**
     * @type {?}
     * @private
     */
    McTreeFlatDataSource.prototype._data;
    /**
     * @type {?}
     * @private
     */
    McTreeFlatDataSource.prototype.treeControl;
    /**
     * @type {?}
     * @private
     */
    McTreeFlatDataSource.prototype.treeFlattener;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3RyZWUvIiwic291cmNlcyI6WyJkYXRhLXNvdXJjZS9mbGF0LWRhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQzNDLE1BQU0sT0FBTyxlQUFlOzs7Ozs7O0lBQ3hCLFlBQ1csaUJBQWtFLEVBQ2xFLFFBQTZCLEVBQzdCLFlBQWtDLEVBQ2xDLFdBQWtFO1FBSGxFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBaUQ7UUFDbEUsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7UUFDN0IsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUF1RDtJQUMxRSxDQUFDOzs7Ozs7OztJQUVKLFdBQVcsQ0FBQyxJQUFPLEVBQUUsS0FBYSxFQUFFLFdBQWdCLEVBQUUsTUFBZ0I7O2NBQzVELFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7UUFDNUQsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUU7O2tCQUN2QixhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFFNUMsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUM5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QUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDL0MsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQy9CO3FCQUFNO29CQUNILE9BQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQ2xDO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ25DLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDUixDQUFDOzs7O0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELGdCQUFnQjs7Y0FDTixhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELFVBQVU7UUFDTixRQUFRO0lBQ1osQ0FBQztDQUNKOzs7SUFuRUcsNkNBQTZDOztJQUU3Qyw0Q0FBNEM7O0lBRTVDLDRDQUE0Qzs7Ozs7SUFhNUMscUNBQW9DOzs7OztJQUdoQywyQ0FBdUM7Ozs7O0lBQ3ZDLDZDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbGxlY3Rpb25WaWV3ZXIsIERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgRmxhdFRyZWVDb250cm9sLCBUcmVlQ29udHJvbCB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay90cmVlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgbWVyZ2UsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKipcbiAqIFRyZWUgZmxhdHRlbmVyIHRvIGNvbnZlcnQgYSBub3JtYWwgdHlwZSBvZiBub2RlIHRvIG5vZGUgd2l0aCBjaGlsZHJlbiAmIGxldmVsIGluZm9ybWF0aW9uLlxuICogVHJhbnNmb3JtIG5lc3RlZCBub2RlcyBvZiB0eXBlIGBUYCB0byBmbGF0dGVuZWQgbm9kZXMgb2YgdHlwZSBgRmAuXG4gKlxuICogRm9yIGV4YW1wbGUsIHRoZSBpbnB1dCBkYXRhIG9mIHR5cGUgYFRgIGlzIG5lc3RlZCwgYW5kIGNvbnRhaW5zIGl0cyBjaGlsZHJlbiBkYXRhOlxuICogICBTb21lTm9kZToge1xuICogICAgIGtleTogJ0ZydWl0cycsXG4gKiAgICAgY2hpbGRyZW46IFtcbiAqICAgICAgIE5vZGVPbmU6IHtcbiAqICAgICAgICAga2V5OiAnQXBwbGUnLFxuICogICAgICAgfSxcbiAqICAgICAgIE5vZGVUd286IHtcbiAqICAgICAgICBrZXk6ICdQZWFyJyxcbiAqICAgICAgfVxuICogICAgXVxuICogIH1cbiAqICBBZnRlciBmbGF0dGVuZXIgZmxhdHRlbiB0aGUgdHJlZSwgdGhlIHN0cnVjdHVyZSB3aWxsIGJlY29tZVxuICogIFNvbWVOb2RlOiB7XG4gKiAgICBrZXk6ICdGcnVpdHMnLFxuICogICAgZXhwYW5kYWJsZTogdHJ1ZSxcbiAqICAgIGxldmVsOiAxXG4gKiAgfSxcbiAqICBOb2RlT25lOiB7XG4gKiAgICBrZXk6ICdBcHBsZScsXG4gKiAgICBleHBhbmRhYmxlOiBmYWxzZSxcbiAqICAgIGxldmVsOiAyXG4gKiAgfSxcbiAqICBOb2RlVHdvOiB7XG4gKiAgIGtleTogJ1BlYXInLFxuICogICBleHBhbmRhYmxlOiBmYWxzZSxcbiAqICAgbGV2ZWw6IDJcbiAqIH1cbiAqIGFuZCB0aGUgb3V0cHV0IGZsYXR0ZW5lZCB0eXBlIGlzIGBGYCB3aXRoIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBNY1RyZWVGbGF0dGVuZXI8VCwgRj4ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdHJhbnNmb3JtRnVuY3Rpb246IChub2RlOiBULCBsZXZlbDogbnVtYmVyLCBwYXJlbnQ6IEYgfCBudWxsKSA9PiBGLFxuICAgICAgICBwdWJsaWMgZ2V0TGV2ZWw6IChub2RlOiBGKSA9PiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBpc0V4cGFuZGFibGU6IChub2RlOiBGKSA9PiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgZ2V0Q2hpbGRyZW46IChub2RlOiBUKSA9PiBPYnNlcnZhYmxlPFRbXT4gfCBUW10gfCB1bmRlZmluZWQgfCBudWxsXG4gICAgKSB7fVxuXG4gICAgZmxhdHRlbk5vZGUobm9kZTogVCwgbGV2ZWw6IG51bWJlciwgcmVzdWx0Tm9kZXM6IEZbXSwgcGFyZW50OiBGIHwgbnVsbCk6IEZbXSB7XG4gICAgICAgIGNvbnN0IGZsYXROb2RlID0gdGhpcy50cmFuc2Zvcm1GdW5jdGlvbihub2RlLCBsZXZlbCwgcGFyZW50KTtcbiAgICAgICAgcmVzdWx0Tm9kZXMucHVzaChmbGF0Tm9kZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNFeHBhbmRhYmxlKGZsYXROb2RlKSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW5Ob2RlcyA9IHRoaXMuZ2V0Q2hpbGRyZW4obm9kZSk7XG5cbiAgICAgICAgICAgIGlmIChjaGlsZHJlbk5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW5Ob2RlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW5Ob2RlcywgbGV2ZWwsIHJlc3VsdE5vZGVzLCBmbGF0Tm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5Ob2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNoaWxkcmVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4sIGxldmVsLCByZXN1bHROb2RlcywgZmxhdE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdE5vZGVzO1xuICAgIH1cblxuICAgIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbjogVFtdLCBsZXZlbDogbnVtYmVyLCByZXN1bHROb2RlczogRltdLCBwYXJlbnQ6IEYgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZsYXR0ZW5Ob2RlKGNoaWxkLCBsZXZlbCArIDEsIHJlc3VsdE5vZGVzLCBwYXJlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGbGF0dGVuIGEgbGlzdCBvZiBub2RlIHR5cGUgVCB0byBmbGF0dGVuZWQgdmVyc2lvbiBvZiBub2RlIEYuXG4gICAgICogUGxlYXNlIG5vdGUgdGhhdCB0eXBlIFQgbWF5IGJlIG5lc3RlZCwgYW5kIHRoZSBsZW5ndGggb2YgYHN0cnVjdHVyZWREYXRhYCBtYXkgYmUgZGlmZmVyZW50XG4gICAgICogZnJvbSB0aGF0IG9mIHJldHVybmVkIGxpc3QgYEZbXWAuXG4gICAgICovXG4gICAgZmxhdHRlbk5vZGVzKHN0cnVjdHVyZWREYXRhOiBUW10pOiBGW10ge1xuICAgICAgICBjb25zdCByZXN1bHROb2RlczogRltdID0gW107XG4gICAgICAgIHN0cnVjdHVyZWREYXRhLmZvckVhY2goKG5vZGUpID0+IHRoaXMuZmxhdHRlbk5vZGUobm9kZSwgMCwgcmVzdWx0Tm9kZXMsIG51bGwpKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0Tm9kZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwYW5kIGZsYXR0ZW5lZCBub2RlIHdpdGggY3VycmVudCBleHBhbnNpb24gc3RhdHVzLlxuICAgICAqIFRoZSByZXR1cm5lZCBsaXN0IG1heSBoYXZlIGRpZmZlcmVudCBsZW5ndGguXG4gICAgICovXG4gICAgZXhwYW5kRmxhdHRlbmVkTm9kZXMobm9kZXM6IEZbXSwgdHJlZUNvbnRyb2w6IFRyZWVDb250cm9sPEY+KTogRltdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0czogRltdID0gW107XG4gICAgICAgIGNvbnN0IGN1cnJlbnRFeHBhbmQ6IGJvb2xlYW5bXSA9IFtdO1xuICAgICAgICBjdXJyZW50RXhwYW5kWzBdID0gdHJ1ZTtcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhwYW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuZ2V0TGV2ZWwobm9kZSk7IGkrKykge1xuICAgICAgICAgICAgICAgIGV4cGFuZCA9IGV4cGFuZCAmJiBjdXJyZW50RXhwYW5kW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXhwYW5kKSB7IHJlc3VsdHMucHVzaChub2RlKTsgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGFibGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RXhwYW5kW3RoaXMuZ2V0TGV2ZWwobm9kZSkgKyAxXSA9IHRyZWVDb250cm9sLmlzRXhwYW5kZWQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbn1cblxuZW51bSBNY1RyZWVEYXRhU291cmNlQ2hhbmdlVHlwZXMge1xuICAgIEV4cGFuc2lvbiA9ICdleHBhbnNpb24nLFxuICAgIEZpbHRlciA9ICdmaWx0ZXInXG59XG5cbi8qKlxuICogRGF0YSBzb3VyY2UgZm9yIGZsYXQgdHJlZS5cbiAqIFRoZSBkYXRhIHNvdXJjZSBuZWVkIHRvIGhhbmRsZSBleHBhbnNpb24vY29sbGFwc2lvbiBvZiB0aGUgdHJlZSBub2RlIGFuZCBjaGFuZ2UgdGhlIGRhdGEgZmVlZFxuICogdG8gYE1jVHJlZWAuXG4gKiBUaGUgbmVzdGVkIHRyZWUgbm9kZXMgb2YgdHlwZSBgVGAgYXJlIGZsYXR0ZW5lZCB0aHJvdWdoIGBN0YFUcmVlRmxhdHRlbmVyYCwgYW5kIGNvbnZlcnRlZFxuICogdG8gdHlwZSBgRmAgZm9yIGBNY1RyZWVgIHRvIGNvbnN1bWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBNY1RyZWVGbGF0RGF0YVNvdXJjZTxULCBGPiBleHRlbmRzIERhdGFTb3VyY2U8Rj4ge1xuICAgIGZsYXR0ZW5lZERhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZbXT4oW10pO1xuXG4gICAgZXhwYW5kZWREYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGW10+KFtdKTtcblxuICAgIGZpbHRlcmVkRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RltdPihbXSk7XG5cbiAgICBnZXQgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IGRhdGEodmFsdWU6IFRbXSkge1xuICAgICAgICB0aGlzLl9kYXRhLm5leHQodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuZmxhdHRlbmVkRGF0YS5uZXh0KHRoaXMudHJlZUZsYXR0ZW5lci5mbGF0dGVuTm9kZXModGhpcy5kYXRhKSk7XG4gICAgICAgIHRoaXMudHJlZUNvbnRyb2wuZGF0YU5vZGVzID0gdGhpcy5mbGF0dGVuZWREYXRhLnZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RhdGE6IEJlaGF2aW9yU3ViamVjdDxUW10+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdHJlZUNvbnRyb2w6IEZsYXRUcmVlQ29udHJvbDxGPixcbiAgICAgICAgcHJpdmF0ZSB0cmVlRmxhdHRlbmVyOiBNY1RyZWVGbGF0dGVuZXI8VCwgRj4sXG4gICAgICAgIGluaXRpYWxEYXRhOiBUW10gPSBbXVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oaW5pdGlhbERhdGEpO1xuICAgIH1cblxuICAgIGNvbm5lY3QoY29sbGVjdGlvblZpZXdlcjogQ29sbGVjdGlvblZpZXdlcik6IE9ic2VydmFibGU8RltdPiB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIGNvbGxlY3Rpb25WaWV3ZXIudmlld0NoYW5nZSxcbiAgICAgICAgICAgIHRoaXMudHJlZUNvbnRyb2wuZXhwYW5zaW9uTW9kZWwuY2hhbmdlZFxuICAgICAgICAgICAgICAgIC5waXBlKG1hcCgodmFsdWUpID0+ICh7IHR5cGU6IE1jVHJlZURhdGFTb3VyY2VDaGFuZ2VUeXBlcy5FeHBhbnNpb24sIHZhbHVlIH0pKSksXG4gICAgICAgICAgICB0aGlzLnRyZWVDb250cm9sLmZpbHRlclZhbHVlXG4gICAgICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gKHsgdHlwZTogTWNUcmVlRGF0YVNvdXJjZUNoYW5nZVR5cGVzLkZpbHRlciwgdmFsdWUgfSkpKSxcbiAgICAgICAgICAgIHRoaXMuZmxhdHRlbmVkRGF0YVxuICAgICAgICApXG4gICAgICAgIC5waXBlKG1hcCgoY2hhbmdlT2JqOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZU9iai50eXBlID09PSBNY1RyZWVEYXRhU291cmNlQ2hhbmdlVHlwZXMuRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSAmJiBjaGFuZ2VPYmoudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5zaW9uSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5zaW9uSGFuZGxlcigpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZmlsdGVySGFuZGxlcigpOiBGW10ge1xuICAgICAgICB0aGlzLmZpbHRlcmVkRGF0YS5uZXh0KHRoaXMudHJlZUNvbnRyb2wuZmlsdGVyTW9kZWwuc2VsZWN0ZWQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkRGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBleHBhbnNpb25IYW5kbGVyKCk6IEZbXSB7XG4gICAgICAgIGNvbnN0IGV4cGFuZGVkTm9kZXMgPSB0aGlzLnRyZWVGbGF0dGVuZXIuZXhwYW5kRmxhdHRlbmVkTm9kZXModGhpcy5mbGF0dGVuZWREYXRhLnZhbHVlLCB0aGlzLnRyZWVDb250cm9sKTtcbiAgICAgICAgdGhpcy5leHBhbmRlZERhdGEubmV4dChleHBhbmRlZE5vZGVzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5leHBhbmRlZERhdGEudmFsdWU7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgLy8gbm8gb3BcbiAgICB9XG59XG5cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * Generated from: data-source/flat-data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
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
var /**
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
McTreeFlattener = /** @class */ (function () {
    function McTreeFlattener(transformFunction, getLevel, isExpandable, getChildren) {
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
    McTreeFlattener.prototype.flattenNode = /**
     * @param {?} node
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    function (node, level, resultNodes, parent) {
        var _this = this;
        /** @type {?} */
        var flatNode = this.transformFunction(node, level, parent);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            /** @type {?} */
            var childrenNodes = this.getChildren(node);
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
                    function (children) {
                        _this.flattenChildren(children, level, resultNodes, flatNode);
                    }));
                }
            }
        }
        return resultNodes;
    };
    /**
     * @param {?} children
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    McTreeFlattener.prototype.flattenChildren = /**
     * @param {?} children
     * @param {?} level
     * @param {?} resultNodes
     * @param {?} parent
     * @return {?}
     */
    function (children, level, resultNodes, parent) {
        var _this = this;
        children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) {
            _this.flattenNode(child, level + 1, resultNodes, parent);
        }));
    };
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     * @param {?} structuredData
     * @return {?}
     */
    McTreeFlattener.prototype.flattenNodes = /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     * @param {?} structuredData
     * @return {?}
     */
    function (structuredData) {
        var _this = this;
        /** @type {?} */
        var resultNodes = [];
        structuredData.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return _this.flattenNode(node, 0, resultNodes, null); }));
        return resultNodes;
    };
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     * @param {?} nodes
     * @param {?} treeControl
     * @return {?}
     */
    McTreeFlattener.prototype.expandFlattenedNodes = /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     * @param {?} nodes
     * @param {?} treeControl
     * @return {?}
     */
    function (nodes, treeControl) {
        var _this = this;
        /** @type {?} */
        var results = [];
        /** @type {?} */
        var currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            /** @type {?} */
            var expand = true;
            for (var i = 0; i <= _this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (_this.isExpandable(node)) {
                currentExpand[_this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        }));
        return results;
    };
    return McTreeFlattener;
}());
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
export { McTreeFlattener };
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
var McTreeDataSourceChangeTypes = {
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
var /**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 * @template T, F
 */
McTreeFlatDataSource = /** @class */ (function (_super) {
    __extends(McTreeFlatDataSource, _super);
    function McTreeFlatDataSource(treeControl, treeFlattener, initialData) {
        if (initialData === void 0) { initialData = []; }
        var _this = _super.call(this) || this;
        _this.treeControl = treeControl;
        _this.treeFlattener = treeFlattener;
        _this.flattenedData = new BehaviorSubject([]);
        _this.expandedData = new BehaviorSubject([]);
        _this.filteredData = new BehaviorSubject([]);
        _this._data = new BehaviorSubject(initialData);
        return _this;
    }
    Object.defineProperty(McTreeFlatDataSource.prototype, "data", {
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
            this.flattenedData.next(this.treeFlattener.flattenNodes(this.data));
            this.treeControl.dataNodes = this.flattenedData.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} collectionViewer
     * @return {?}
     */
    McTreeFlatDataSource.prototype.connect = /**
     * @param {?} collectionViewer
     * @return {?}
     */
    function (collectionViewer) {
        var _this = this;
        return merge(collectionViewer.viewChange, this.treeControl.expansionModel.changed
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return ({ type: McTreeDataSourceChangeTypes.Expansion, value: value }); }))), this.treeControl.filterValue
            .pipe(map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return ({ type: McTreeDataSourceChangeTypes.Filter, value: value }); }))), this.flattenedData)
            .pipe(map((/**
         * @param {?} changeObj
         * @return {?}
         */
        function (changeObj) {
            if (changeObj.type === McTreeDataSourceChangeTypes.Filter) {
                if (changeObj.value && changeObj.value.length > 0) {
                    return _this.filterHandler();
                }
                else {
                    return _this.expansionHandler();
                }
            }
            return _this.expansionHandler();
        })));
    };
    /**
     * @return {?}
     */
    McTreeFlatDataSource.prototype.filterHandler = /**
     * @return {?}
     */
    function () {
        this.filteredData.next(this.treeControl.filterModel.selected);
        return this.filteredData.value;
    };
    /**
     * @return {?}
     */
    McTreeFlatDataSource.prototype.expansionHandler = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var expandedNodes = this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl);
        this.expandedData.next(expandedNodes);
        return this.expandedData.value;
    };
    /**
     * @return {?}
     */
    McTreeFlatDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () {
        // no op
    };
    return McTreeFlatDataSource;
}(DataSource));
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 * @template T, F
 */
export { McTreeFlatDataSource };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90cmVlLyIsInNvdXJjZXMiOlsiZGF0YS1zb3VyY2UvZmxhdC1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQW9CLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNJLHlCQUNXLGlCQUFrRSxFQUNsRSxRQUE2QixFQUM3QixZQUFrQyxFQUNsQyxXQUFrRTtRQUhsRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWlEO1FBQ2xFLGFBQVEsR0FBUixRQUFRLENBQXFCO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUQ7SUFDMUUsQ0FBQzs7Ozs7Ozs7SUFFSixxQ0FBVzs7Ozs7OztJQUFYLFVBQVksSUFBTyxFQUFFLEtBQWEsRUFBRSxXQUFnQixFQUFFLE1BQWdCO1FBQXRFLGlCQXFCQzs7WUFwQlMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUM1RCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTs7Z0JBQ3ZCLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUU1QyxJQUFJLGFBQWEsRUFBRTtnQkFDZixJQUFJLEtBQUssQ0FBQyxPQUFP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QUFVLEdBb0V6RDs7Ozs7Ozs7Ozs7O0lBbkVHLDZDQUE2Qzs7SUFFN0MsNENBQTRDOztJQUU1Qyw0Q0FBNEM7Ozs7O0lBYTVDLHFDQUFvQzs7Ozs7SUFHaEMsMkNBQXVDOzs7OztJQUN2Qyw2Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xsZWN0aW9uVmlld2VyLCBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IEZsYXRUcmVlQ29udHJvbCwgVHJlZUNvbnRyb2wgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvdHJlZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIG1lcmdlLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLyoqXG4gKiBUcmVlIGZsYXR0ZW5lciB0byBjb252ZXJ0IGEgbm9ybWFsIHR5cGUgb2Ygbm9kZSB0byBub2RlIHdpdGggY2hpbGRyZW4gJiBsZXZlbCBpbmZvcm1hdGlvbi5cbiAqIFRyYW5zZm9ybSBuZXN0ZWQgbm9kZXMgb2YgdHlwZSBgVGAgdG8gZmxhdHRlbmVkIG5vZGVzIG9mIHR5cGUgYEZgLlxuICpcbiAqIEZvciBleGFtcGxlLCB0aGUgaW5wdXQgZGF0YSBvZiB0eXBlIGBUYCBpcyBuZXN0ZWQsIGFuZCBjb250YWlucyBpdHMgY2hpbGRyZW4gZGF0YTpcbiAqICAgU29tZU5vZGU6IHtcbiAqICAgICBrZXk6ICdGcnVpdHMnLFxuICogICAgIGNoaWxkcmVuOiBbXG4gKiAgICAgICBOb2RlT25lOiB7XG4gKiAgICAgICAgIGtleTogJ0FwcGxlJyxcbiAqICAgICAgIH0sXG4gKiAgICAgICBOb2RlVHdvOiB7XG4gKiAgICAgICAga2V5OiAnUGVhcicsXG4gKiAgICAgIH1cbiAqICAgIF1cbiAqICB9XG4gKiAgQWZ0ZXIgZmxhdHRlbmVyIGZsYXR0ZW4gdGhlIHRyZWUsIHRoZSBzdHJ1Y3R1cmUgd2lsbCBiZWNvbWVcbiAqICBTb21lTm9kZToge1xuICogICAga2V5OiAnRnJ1aXRzJyxcbiAqICAgIGV4cGFuZGFibGU6IHRydWUsXG4gKiAgICBsZXZlbDogMVxuICogIH0sXG4gKiAgTm9kZU9uZToge1xuICogICAga2V5OiAnQXBwbGUnLFxuICogICAgZXhwYW5kYWJsZTogZmFsc2UsXG4gKiAgICBsZXZlbDogMlxuICogIH0sXG4gKiAgTm9kZVR3bzoge1xuICogICBrZXk6ICdQZWFyJyxcbiAqICAgZXhwYW5kYWJsZTogZmFsc2UsXG4gKiAgIGxldmVsOiAyXG4gKiB9XG4gKiBhbmQgdGhlIG91dHB1dCBmbGF0dGVuZWQgdHlwZSBpcyBgRmAgd2l0aCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgTWNUcmVlRmxhdHRlbmVyPFQsIEY+IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHRyYW5zZm9ybUZ1bmN0aW9uOiAobm9kZTogVCwgbGV2ZWw6IG51bWJlciwgcGFyZW50OiBGIHwgbnVsbCkgPT4gRixcbiAgICAgICAgcHVibGljIGdldExldmVsOiAobm9kZTogRikgPT4gbnVtYmVyLFxuICAgICAgICBwdWJsaWMgaXNFeHBhbmRhYmxlOiAobm9kZTogRikgPT4gYm9vbGVhbixcbiAgICAgICAgcHVibGljIGdldENoaWxkcmVuOiAobm9kZTogVCkgPT4gT2JzZXJ2YWJsZTxUW10+IHwgVFtdIHwgdW5kZWZpbmVkIHwgbnVsbFxuICAgICkge31cblxuICAgIGZsYXR0ZW5Ob2RlKG5vZGU6IFQsIGxldmVsOiBudW1iZXIsIHJlc3VsdE5vZGVzOiBGW10sIHBhcmVudDogRiB8IG51bGwpOiBGW10ge1xuICAgICAgICBjb25zdCBmbGF0Tm9kZSA9IHRoaXMudHJhbnNmb3JtRnVuY3Rpb24obm9kZSwgbGV2ZWwsIHBhcmVudCk7XG4gICAgICAgIHJlc3VsdE5vZGVzLnB1c2goZmxhdE5vZGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZShmbGF0Tm9kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuTm9kZXMgPSB0aGlzLmdldENoaWxkcmVuKG5vZGUpO1xuXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5Ob2Rlcykge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuTm9kZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuTm9kZXMsIGxldmVsLCByZXN1bHROb2RlcywgZmxhdE5vZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuTm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChjaGlsZHJlbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuLCBsZXZlbCwgcmVzdWx0Tm9kZXMsIGZsYXROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHROb2RlcztcbiAgICB9XG5cbiAgICBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW46IFRbXSwgbGV2ZWw6IG51bWJlciwgcmVzdWx0Tm9kZXM6IEZbXSwgcGFyZW50OiBGIHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mbGF0dGVuTm9kZShjaGlsZCwgbGV2ZWwgKyAxLCByZXN1bHROb2RlcywgcGFyZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmxhdHRlbiBhIGxpc3Qgb2Ygbm9kZSB0eXBlIFQgdG8gZmxhdHRlbmVkIHZlcnNpb24gb2Ygbm9kZSBGLlxuICAgICAqIFBsZWFzZSBub3RlIHRoYXQgdHlwZSBUIG1heSBiZSBuZXN0ZWQsIGFuZCB0aGUgbGVuZ3RoIG9mIGBzdHJ1Y3R1cmVkRGF0YWAgbWF5IGJlIGRpZmZlcmVudFxuICAgICAqIGZyb20gdGhhdCBvZiByZXR1cm5lZCBsaXN0IGBGW11gLlxuICAgICAqL1xuICAgIGZsYXR0ZW5Ob2RlcyhzdHJ1Y3R1cmVkRGF0YTogVFtdKTogRltdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0Tm9kZXM6IEZbXSA9IFtdO1xuICAgICAgICBzdHJ1Y3R1cmVkRGF0YS5mb3JFYWNoKChub2RlKSA9PiB0aGlzLmZsYXR0ZW5Ob2RlKG5vZGUsIDAsIHJlc3VsdE5vZGVzLCBudWxsKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdE5vZGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cGFuZCBmbGF0dGVuZWQgbm9kZSB3aXRoIGN1cnJlbnQgZXhwYW5zaW9uIHN0YXR1cy5cbiAgICAgKiBUaGUgcmV0dXJuZWQgbGlzdCBtYXkgaGF2ZSBkaWZmZXJlbnQgbGVuZ3RoLlxuICAgICAqL1xuICAgIGV4cGFuZEZsYXR0ZW5lZE5vZGVzKG5vZGVzOiBGW10sIHRyZWVDb250cm9sOiBUcmVlQ29udHJvbDxGPik6IEZbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEZbXSA9IFtdO1xuICAgICAgICBjb25zdCBjdXJyZW50RXhwYW5kOiBib29sZWFuW10gPSBbXTtcbiAgICAgICAgY3VycmVudEV4cGFuZFswXSA9IHRydWU7XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGV4cGFuZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLmdldExldmVsKG5vZGUpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBleHBhbmQgPSBleHBhbmQgJiYgY3VycmVudEV4cGFuZFtpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV4cGFuZCkgeyByZXN1bHRzLnB1c2gobm9kZSk7IH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFeHBhbmRhYmxlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEV4cGFuZFt0aGlzLmdldExldmVsKG5vZGUpICsgMV0gPSB0cmVlQ29udHJvbC5pc0V4cGFuZGVkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG59XG5cbmVudW0gTWNUcmVlRGF0YVNvdXJjZUNoYW5nZVR5cGVzIHtcbiAgICBFeHBhbnNpb24gPSAnZXhwYW5zaW9uJyxcbiAgICBGaWx0ZXIgPSAnZmlsdGVyJ1xufVxuXG4vKipcbiAqIERhdGEgc291cmNlIGZvciBmbGF0IHRyZWUuXG4gKiBUaGUgZGF0YSBzb3VyY2UgbmVlZCB0byBoYW5kbGUgZXhwYW5zaW9uL2NvbGxhcHNpb24gb2YgdGhlIHRyZWUgbm9kZSBhbmQgY2hhbmdlIHRoZSBkYXRhIGZlZWRcbiAqIHRvIGBNY1RyZWVgLlxuICogVGhlIG5lc3RlZCB0cmVlIG5vZGVzIG9mIHR5cGUgYFRgIGFyZSBmbGF0dGVuZWQgdGhyb3VnaCBgTdGBVHJlZUZsYXR0ZW5lcmAsIGFuZCBjb252ZXJ0ZWRcbiAqIHRvIHR5cGUgYEZgIGZvciBgTWNUcmVlYCB0byBjb25zdW1lLlxuICovXG5leHBvcnQgY2xhc3MgTWNUcmVlRmxhdERhdGFTb3VyY2U8VCwgRj4gZXh0ZW5kcyBEYXRhU291cmNlPEY+IHtcbiAgICBmbGF0dGVuZWREYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGW10+KFtdKTtcblxuICAgIGV4cGFuZGVkRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RltdPihbXSk7XG5cbiAgICBmaWx0ZXJlZERhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZbXT4oW10pO1xuXG4gICAgZ2V0IGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbHVlOiBUW10pIHtcbiAgICAgICAgdGhpcy5fZGF0YS5uZXh0KHZhbHVlKTtcblxuICAgICAgICB0aGlzLmZsYXR0ZW5lZERhdGEubmV4dCh0aGlzLnRyZWVGbGF0dGVuZXIuZmxhdHRlbk5vZGVzKHRoaXMuZGF0YSkpO1xuICAgICAgICB0aGlzLnRyZWVDb250cm9sLmRhdGFOb2RlcyA9IHRoaXMuZmxhdHRlbmVkRGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kYXRhOiBCZWhhdmlvclN1YmplY3Q8VFtdPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHRyZWVDb250cm9sOiBGbGF0VHJlZUNvbnRyb2w8Rj4sXG4gICAgICAgIHByaXZhdGUgdHJlZUZsYXR0ZW5lcjogTWNUcmVlRmxhdHRlbmVyPFQsIEY+LFxuICAgICAgICBpbml0aWFsRGF0YTogVFtdID0gW11cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9kYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KGluaXRpYWxEYXRhKTtcbiAgICB9XG5cbiAgICBjb25uZWN0KGNvbGxlY3Rpb25WaWV3ZXI6IENvbGxlY3Rpb25WaWV3ZXIpOiBPYnNlcnZhYmxlPEZbXT4ge1xuICAgICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgICAgICBjb2xsZWN0aW9uVmlld2VyLnZpZXdDaGFuZ2UsXG4gICAgICAgICAgICB0aGlzLnRyZWVDb250cm9sLmV4cGFuc2lvbk1vZGVsLmNoYW5nZWRcbiAgICAgICAgICAgICAgICAucGlwZShtYXAoKHZhbHVlKSA9PiAoeyB0eXBlOiBNY1RyZWVEYXRhU291cmNlQ2hhbmdlVHlwZXMuRXhwYW5zaW9uLCB2YWx1ZSB9KSkpLFxuICAgICAgICAgICAgdGhpcy50cmVlQ29udHJvbC5maWx0ZXJWYWx1ZVxuICAgICAgICAgICAgICAgIC5waXBlKG1hcCgodmFsdWUpID0+ICh7IHR5cGU6IE1jVHJlZURhdGFTb3VyY2VDaGFuZ2VUeXBlcy5GaWx0ZXIsIHZhbHVlIH0pKSksXG4gICAgICAgICAgICB0aGlzLmZsYXR0ZW5lZERhdGFcbiAgICAgICAgKVxuICAgICAgICAucGlwZShtYXAoKGNoYW5nZU9iajogYW55KTogYW55ID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VPYmoudHlwZSA9PT0gTWNUcmVlRGF0YVNvdXJjZUNoYW5nZVR5cGVzLkZpbHRlcikge1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmoudmFsdWUgJiYgY2hhbmdlT2JqLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVySGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGFuc2lvbkhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGFuc2lvbkhhbmRsZXIoKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGZpbHRlckhhbmRsZXIoKTogRltdIHtcbiAgICAgICAgdGhpcy5maWx0ZXJlZERhdGEubmV4dCh0aGlzLnRyZWVDb250cm9sLmZpbHRlck1vZGVsLnNlbGVjdGVkKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZERhdGEudmFsdWU7XG4gICAgfVxuXG4gICAgZXhwYW5zaW9uSGFuZGxlcigpOiBGW10ge1xuICAgICAgICBjb25zdCBleHBhbmRlZE5vZGVzID0gdGhpcy50cmVlRmxhdHRlbmVyLmV4cGFuZEZsYXR0ZW5lZE5vZGVzKHRoaXMuZmxhdHRlbmVkRGF0YS52YWx1ZSwgdGhpcy50cmVlQ29udHJvbCk7XG4gICAgICAgIHRoaXMuZXhwYW5kZWREYXRhLm5leHQoZXhwYW5kZWROb2Rlcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kZWREYXRhLnZhbHVlO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIC8vIG5vIG9wXG4gICAgfVxufVxuXG4iXX0=
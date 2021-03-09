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
 */
export class McTreeFlattener {
    constructor(transformFunction, getLevel, isExpandable, getChildren) {
        this.transformFunction = transformFunction;
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getChildren = getChildren;
    }
    flattenNode(node, level, resultNodes, parent) {
        const flatNode = this.transformFunction(node, level, parent);
        resultNodes.push(flatNode);
        if (this.isExpandable(flatNode)) {
            const childrenNodes = this.getChildren(node);
            if (childrenNodes) {
                if (Array.isArray(childrenNodes)) {
                    this.flattenChildren(childrenNodes, level, resultNodes, flatNode);
                }
                else {
                    childrenNodes
                        .pipe(take(1))
                        .subscribe((children) => {
                        this.flattenChildren(children, level, resultNodes, flatNode);
                    });
                }
            }
        }
        return resultNodes;
    }
    flattenChildren(children, level, resultNodes, parent) {
        children.forEach((child) => {
            this.flattenNode(child, level + 1, resultNodes, parent);
        });
    }
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData) {
        const resultNodes = [];
        structuredData.forEach((node) => this.flattenNode(node, 0, resultNodes, null));
        return resultNodes;
    }
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    expandFlattenedNodes(nodes, treeControl) {
        const results = [];
        const currentExpand = [];
        currentExpand[0] = true;
        nodes.forEach((node) => {
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
        });
        return results;
    }
}
var McTreeDataSourceChangeTypes;
(function (McTreeDataSourceChangeTypes) {
    McTreeDataSourceChangeTypes["Expansion"] = "expansion";
    McTreeDataSourceChangeTypes["Filter"] = "filter";
})(McTreeDataSourceChangeTypes || (McTreeDataSourceChangeTypes = {}));
/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `McTree`.
 * The nested tree nodes of type `T` are flattened through `MсTreeFlattener`, and converted
 * to type `F` for `McTree` to consume.
 */
export class McTreeFlatDataSource extends DataSource {
    constructor(treeControl, treeFlattener, initialData = []) {
        super();
        this.treeControl = treeControl;
        this.treeFlattener = treeFlattener;
        this.flattenedData = new BehaviorSubject([]);
        this.expandedData = new BehaviorSubject([]);
        this.filteredData = new BehaviorSubject([]);
        this._data = new BehaviorSubject(initialData);
    }
    get data() {
        return this._data.value;
    }
    set data(value) {
        this._data.next(value);
        this.flattenedData.next(this.treeFlattener.flattenNodes(this.data));
        this.treeControl.dataNodes = this.flattenedData.value;
    }
    connect(collectionViewer) {
        return merge(collectionViewer.viewChange, this.treeControl.expansionModel.changed
            .pipe(map((value) => ({ type: McTreeDataSourceChangeTypes.Expansion, value }))), this.treeControl.filterValue
            .pipe(map((value) => ({ type: McTreeDataSourceChangeTypes.Filter, value }))), this.flattenedData)
            .pipe(map((changeObj) => {
            if (changeObj.type === McTreeDataSourceChangeTypes.Filter) {
                if (changeObj.value && changeObj.value.length > 0) {
                    return this.filterHandler();
                }
                else {
                    return this.expansionHandler();
                }
            }
            return this.expansionHandler();
        }));
    }
    filterHandler() {
        this.filteredData.next(this.treeControl.filterModel.selected);
        return this.filteredData.value;
    }
    expansionHandler() {
        const expandedNodes = this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl);
        this.expandedData.next(expandedNodes);
        return this.expandedData.value;
    }
    disconnect() {
        // no op
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90cmVlL2RhdGEtc291cmNlL2ZsYXQtZGF0YS1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxNQUFNLE9BQU8sZUFBZTtJQUN4QixZQUNXLGlCQUFrRSxFQUNsRSxRQUE2QixFQUM3QixZQUFrQyxFQUNsQyxXQUFrRTtRQUhsRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWlEO1FBQ2xFLGFBQVEsR0FBUixRQUFRLENBQXFCO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUQ7SUFDMUUsQ0FBQztJQUVKLFdBQVcsQ0FBQyxJQUFPLEVBQUUsS0FBYSxFQUFFLFdBQWdCLEVBQUUsTUFBZ0I7UUFDbEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0QsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU3QyxJQUFJLGFBQWEsRUFBRTtnQkFDZixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQzlC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SSxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDL0MsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQy9CO3FCQUFNO29CQUNILE9BQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQ2xDO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUVELFVBQVU7UUFDTixRQUFRO0lBQ1osQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sbGVjdGlvblZpZXdlciwgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBGbGF0VHJlZUNvbnRyb2wsIFRyZWVDb250cm9sIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbi8qKlxuICogVHJlZSBmbGF0dGVuZXIgdG8gY29udmVydCBhIG5vcm1hbCB0eXBlIG9mIG5vZGUgdG8gbm9kZSB3aXRoIGNoaWxkcmVuICYgbGV2ZWwgaW5mb3JtYXRpb24uXG4gKiBUcmFuc2Zvcm0gbmVzdGVkIG5vZGVzIG9mIHR5cGUgYFRgIHRvIGZsYXR0ZW5lZCBub2RlcyBvZiB0eXBlIGBGYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgdGhlIGlucHV0IGRhdGEgb2YgdHlwZSBgVGAgaXMgbmVzdGVkLCBhbmQgY29udGFpbnMgaXRzIGNoaWxkcmVuIGRhdGE6XG4gKiAgIFNvbWVOb2RlOiB7XG4gKiAgICAga2V5OiAnRnJ1aXRzJyxcbiAqICAgICBjaGlsZHJlbjogW1xuICogICAgICAgTm9kZU9uZToge1xuICogICAgICAgICBrZXk6ICdBcHBsZScsXG4gKiAgICAgICB9LFxuICogICAgICAgTm9kZVR3bzoge1xuICogICAgICAgIGtleTogJ1BlYXInLFxuICogICAgICB9XG4gKiAgICBdXG4gKiAgfVxuICogIEFmdGVyIGZsYXR0ZW5lciBmbGF0dGVuIHRoZSB0cmVlLCB0aGUgc3RydWN0dXJlIHdpbGwgYmVjb21lXG4gKiAgU29tZU5vZGU6IHtcbiAqICAgIGtleTogJ0ZydWl0cycsXG4gKiAgICBleHBhbmRhYmxlOiB0cnVlLFxuICogICAgbGV2ZWw6IDFcbiAqICB9LFxuICogIE5vZGVPbmU6IHtcbiAqICAgIGtleTogJ0FwcGxlJyxcbiAqICAgIGV4cGFuZGFibGU6IGZhbHNlLFxuICogICAgbGV2ZWw6IDJcbiAqICB9LFxuICogIE5vZGVUd286IHtcbiAqICAga2V5OiAnUGVhcicsXG4gKiAgIGV4cGFuZGFibGU6IGZhbHNlLFxuICogICBsZXZlbDogMlxuICogfVxuICogYW5kIHRoZSBvdXRwdXQgZmxhdHRlbmVkIHR5cGUgaXMgYEZgIHdpdGggYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZUZsYXR0ZW5lcjxULCBGPiB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0cmFuc2Zvcm1GdW5jdGlvbjogKG5vZGU6IFQsIGxldmVsOiBudW1iZXIsIHBhcmVudDogRiB8IG51bGwpID0+IEYsXG4gICAgICAgIHB1YmxpYyBnZXRMZXZlbDogKG5vZGU6IEYpID0+IG51bWJlcixcbiAgICAgICAgcHVibGljIGlzRXhwYW5kYWJsZTogKG5vZGU6IEYpID0+IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZHJlbjogKG5vZGU6IFQpID0+IE9ic2VydmFibGU8VFtdPiB8IFRbXSB8IHVuZGVmaW5lZCB8IG51bGxcbiAgICApIHt9XG5cbiAgICBmbGF0dGVuTm9kZShub2RlOiBULCBsZXZlbDogbnVtYmVyLCByZXN1bHROb2RlczogRltdLCBwYXJlbnQ6IEYgfCBudWxsKTogRltdIHtcbiAgICAgICAgY29uc3QgZmxhdE5vZGUgPSB0aGlzLnRyYW5zZm9ybUZ1bmN0aW9uKG5vZGUsIGxldmVsLCBwYXJlbnQpO1xuICAgICAgICByZXN1bHROb2Rlcy5wdXNoKGZsYXROb2RlKTtcblxuICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGFibGUoZmxhdE5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbk5vZGVzID0gdGhpcy5nZXRDaGlsZHJlbihub2RlKTtcblxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbk5vZGVzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbk5vZGVzLCBsZXZlbCwgcmVzdWx0Tm9kZXMsIGZsYXROb2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbk5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hpbGRyZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbiwgbGV2ZWwsIHJlc3VsdE5vZGVzLCBmbGF0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0Tm9kZXM7XG4gICAgfVxuXG4gICAgZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuOiBUW10sIGxldmVsOiBudW1iZXIsIHJlc3VsdE5vZGVzOiBGW10sIHBhcmVudDogRiB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmxhdHRlbk5vZGUoY2hpbGQsIGxldmVsICsgMSwgcmVzdWx0Tm9kZXMsIHBhcmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZsYXR0ZW4gYSBsaXN0IG9mIG5vZGUgdHlwZSBUIHRvIGZsYXR0ZW5lZCB2ZXJzaW9uIG9mIG5vZGUgRi5cbiAgICAgKiBQbGVhc2Ugbm90ZSB0aGF0IHR5cGUgVCBtYXkgYmUgbmVzdGVkLCBhbmQgdGhlIGxlbmd0aCBvZiBgc3RydWN0dXJlZERhdGFgIG1heSBiZSBkaWZmZXJlbnRcbiAgICAgKiBmcm9tIHRoYXQgb2YgcmV0dXJuZWQgbGlzdCBgRltdYC5cbiAgICAgKi9cbiAgICBmbGF0dGVuTm9kZXMoc3RydWN0dXJlZERhdGE6IFRbXSk6IEZbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdE5vZGVzOiBGW10gPSBbXTtcbiAgICAgICAgc3RydWN0dXJlZERhdGEuZm9yRWFjaCgobm9kZSkgPT4gdGhpcy5mbGF0dGVuTm9kZShub2RlLCAwLCByZXN1bHROb2RlcywgbnVsbCkpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHROb2RlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBhbmQgZmxhdHRlbmVkIG5vZGUgd2l0aCBjdXJyZW50IGV4cGFuc2lvbiBzdGF0dXMuXG4gICAgICogVGhlIHJldHVybmVkIGxpc3QgbWF5IGhhdmUgZGlmZmVyZW50IGxlbmd0aC5cbiAgICAgKi9cbiAgICBleHBhbmRGbGF0dGVuZWROb2Rlcyhub2RlczogRltdLCB0cmVlQ29udHJvbDogVHJlZUNvbnRyb2w8Rj4pOiBGW10ge1xuICAgICAgICBjb25zdCByZXN1bHRzOiBGW10gPSBbXTtcbiAgICAgICAgY29uc3QgY3VycmVudEV4cGFuZDogYm9vbGVhbltdID0gW107XG4gICAgICAgIGN1cnJlbnRFeHBhbmRbMF0gPSB0cnVlO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGxldCBleHBhbmQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5nZXRMZXZlbChub2RlKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXhwYW5kID0gZXhwYW5kICYmIGN1cnJlbnRFeHBhbmRbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChleHBhbmQpIHsgcmVzdWx0cy5wdXNoKG5vZGUpOyB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRFeHBhbmRbdGhpcy5nZXRMZXZlbChub2RlKSArIDFdID0gdHJlZUNvbnRyb2wuaXNFeHBhbmRlZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuXG5lbnVtIE1jVHJlZURhdGFTb3VyY2VDaGFuZ2VUeXBlcyB7XG4gICAgRXhwYW5zaW9uID0gJ2V4cGFuc2lvbicsXG4gICAgRmlsdGVyID0gJ2ZpbHRlcidcbn1cblxuLyoqXG4gKiBEYXRhIHNvdXJjZSBmb3IgZmxhdCB0cmVlLlxuICogVGhlIGRhdGEgc291cmNlIG5lZWQgdG8gaGFuZGxlIGV4cGFuc2lvbi9jb2xsYXBzaW9uIG9mIHRoZSB0cmVlIG5vZGUgYW5kIGNoYW5nZSB0aGUgZGF0YSBmZWVkXG4gKiB0byBgTWNUcmVlYC5cbiAqIFRoZSBuZXN0ZWQgdHJlZSBub2RlcyBvZiB0eXBlIGBUYCBhcmUgZmxhdHRlbmVkIHRocm91Z2ggYE3RgVRyZWVGbGF0dGVuZXJgLCBhbmQgY29udmVydGVkXG4gKiB0byB0eXBlIGBGYCBmb3IgYE1jVHJlZWAgdG8gY29uc3VtZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZUZsYXREYXRhU291cmNlPFQsIEY+IGV4dGVuZHMgRGF0YVNvdXJjZTxGPiB7XG4gICAgZmxhdHRlbmVkRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RltdPihbXSk7XG5cbiAgICBleHBhbmRlZERhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZbXT4oW10pO1xuXG4gICAgZmlsdGVyZWREYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGW10+KFtdKTtcblxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YSh2YWx1ZTogVFtdKSB7XG4gICAgICAgIHRoaXMuX2RhdGEubmV4dCh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5mbGF0dGVuZWREYXRhLm5leHQodGhpcy50cmVlRmxhdHRlbmVyLmZsYXR0ZW5Ob2Rlcyh0aGlzLmRhdGEpKTtcbiAgICAgICAgdGhpcy50cmVlQ29udHJvbC5kYXRhTm9kZXMgPSB0aGlzLmZsYXR0ZW5lZERhdGEudmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGF0YTogQmVoYXZpb3JTdWJqZWN0PFRbXT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0cmVlQ29udHJvbDogRmxhdFRyZWVDb250cm9sPEY+LFxuICAgICAgICBwcml2YXRlIHRyZWVGbGF0dGVuZXI6IE1jVHJlZUZsYXR0ZW5lcjxULCBGPixcbiAgICAgICAgaW5pdGlhbERhdGE6IFRbXSA9IFtdXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihpbml0aWFsRGF0YSk7XG4gICAgfVxuXG4gICAgY29ubmVjdChjb2xsZWN0aW9uVmlld2VyOiBDb2xsZWN0aW9uVmlld2VyKTogT2JzZXJ2YWJsZTxGW10+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgY29sbGVjdGlvblZpZXdlci52aWV3Q2hhbmdlLFxuICAgICAgICAgICAgdGhpcy50cmVlQ29udHJvbC5leHBhbnNpb25Nb2RlbC5jaGFuZ2VkXG4gICAgICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gKHsgdHlwZTogTWNUcmVlRGF0YVNvdXJjZUNoYW5nZVR5cGVzLkV4cGFuc2lvbiwgdmFsdWUgfSkpKSxcbiAgICAgICAgICAgIHRoaXMudHJlZUNvbnRyb2wuZmlsdGVyVmFsdWVcbiAgICAgICAgICAgICAgICAucGlwZShtYXAoKHZhbHVlKSA9PiAoeyB0eXBlOiBNY1RyZWVEYXRhU291cmNlQ2hhbmdlVHlwZXMuRmlsdGVyLCB2YWx1ZSB9KSkpLFxuICAgICAgICAgICAgdGhpcy5mbGF0dGVuZWREYXRhXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUobWFwKChjaGFuZ2VPYmo6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnR5cGUgPT09IE1jVHJlZURhdGFTb3VyY2VDaGFuZ2VUeXBlcy5GaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnZhbHVlICYmIGNoYW5nZU9iai52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlckhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbnNpb25IYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbnNpb25IYW5kbGVyKCk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJIYW5kbGVyKCk6IEZbXSB7XG4gICAgICAgIHRoaXMuZmlsdGVyZWREYXRhLm5leHQodGhpcy50cmVlQ29udHJvbC5maWx0ZXJNb2RlbC5zZWxlY3RlZCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWREYXRhLnZhbHVlO1xuICAgIH1cblxuICAgIGV4cGFuc2lvbkhhbmRsZXIoKTogRltdIHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWROb2RlcyA9IHRoaXMudHJlZUZsYXR0ZW5lci5leHBhbmRGbGF0dGVuZWROb2Rlcyh0aGlzLmZsYXR0ZW5lZERhdGEudmFsdWUsIHRoaXMudHJlZUNvbnRyb2wpO1xuICAgICAgICB0aGlzLmV4cGFuZGVkRGF0YS5uZXh0KGV4cGFuZGVkTm9kZXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkRGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICAvLyBubyBvcFxuICAgIH1cbn1cblxuIl19
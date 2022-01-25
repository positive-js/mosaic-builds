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
                    return this.expansionHandler(changeObj.value);
                }
            }
            return this.expansionHandler(changeObj.value);
        }));
    }
    filterHandler() {
        this.filteredData.next(this.treeControl.filterModel.selected);
        return this.filteredData.value;
    }
    expansionHandler(_change) {
        const expandedNodes = this.treeFlattener.expandFlattenedNodes(this.flattenedData.value, this.treeControl);
        this.expandedData.next(expandedNodes);
        return this.expandedData.value;
    }
    disconnect() {
        // no op
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90cmVlL2RhdGEtc291cmNlL2ZsYXQtZGF0YS1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixVQUFVLEVBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFDekYsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU0zQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFDeEIsWUFDVyxpQkFBa0UsRUFDbEUsUUFBNkIsRUFDN0IsWUFBa0MsRUFDbEMsV0FBa0U7UUFIbEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFpRDtRQUNsRSxhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQXVEO0lBQzFFLENBQUM7SUFFSixXQUFXLENBQUMsSUFBTyxFQUFFLEtBQWEsRUFBRSxXQUFnQixFQUFFLE1BQWdCO1FBQ2xFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdELFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFN0MsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUM5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QUksU0FBUyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQy9DLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDSCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pEO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBMkI7UUFDeEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsVUFBVTtRQUNOLFFBQVE7SUFDWixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xsZWN0aW9uVmlld2VyLCBEYXRhU291cmNlLCBTZWxlY3Rpb25DaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGbGF0VHJlZUNvbnRyb2wgfSBmcm9tICcuLi9jb250cm9sL2ZsYXQtdHJlZS1jb250cm9sJztcbmltcG9ydCB7IFRyZWVDb250cm9sIH0gZnJvbSAnLi4vY29udHJvbC90cmVlLWNvbnRyb2wnO1xuXG5cbi8qKlxuICogVHJlZSBmbGF0dGVuZXIgdG8gY29udmVydCBhIG5vcm1hbCB0eXBlIG9mIG5vZGUgdG8gbm9kZSB3aXRoIGNoaWxkcmVuICYgbGV2ZWwgaW5mb3JtYXRpb24uXG4gKiBUcmFuc2Zvcm0gbmVzdGVkIG5vZGVzIG9mIHR5cGUgYFRgIHRvIGZsYXR0ZW5lZCBub2RlcyBvZiB0eXBlIGBGYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgdGhlIGlucHV0IGRhdGEgb2YgdHlwZSBgVGAgaXMgbmVzdGVkLCBhbmQgY29udGFpbnMgaXRzIGNoaWxkcmVuIGRhdGE6XG4gKiAgIFNvbWVOb2RlOiB7XG4gKiAgICAga2V5OiAnRnJ1aXRzJyxcbiAqICAgICBjaGlsZHJlbjogW1xuICogICAgICAgTm9kZU9uZToge1xuICogICAgICAgICBrZXk6ICdBcHBsZScsXG4gKiAgICAgICB9LFxuICogICAgICAgTm9kZVR3bzoge1xuICogICAgICAgIGtleTogJ1BlYXInLFxuICogICAgICB9XG4gKiAgICBdXG4gKiAgfVxuICogIEFmdGVyIGZsYXR0ZW5lciBmbGF0dGVuIHRoZSB0cmVlLCB0aGUgc3RydWN0dXJlIHdpbGwgYmVjb21lXG4gKiAgU29tZU5vZGU6IHtcbiAqICAgIGtleTogJ0ZydWl0cycsXG4gKiAgICBleHBhbmRhYmxlOiB0cnVlLFxuICogICAgbGV2ZWw6IDFcbiAqICB9LFxuICogIE5vZGVPbmU6IHtcbiAqICAgIGtleTogJ0FwcGxlJyxcbiAqICAgIGV4cGFuZGFibGU6IGZhbHNlLFxuICogICAgbGV2ZWw6IDJcbiAqICB9LFxuICogIE5vZGVUd286IHtcbiAqICAga2V5OiAnUGVhcicsXG4gKiAgIGV4cGFuZGFibGU6IGZhbHNlLFxuICogICBsZXZlbDogMlxuICogfVxuICogYW5kIHRoZSBvdXRwdXQgZmxhdHRlbmVkIHR5cGUgaXMgYEZgIHdpdGggYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZUZsYXR0ZW5lcjxULCBGPiB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0cmFuc2Zvcm1GdW5jdGlvbjogKG5vZGU6IFQsIGxldmVsOiBudW1iZXIsIHBhcmVudDogRiB8IG51bGwpID0+IEYsXG4gICAgICAgIHB1YmxpYyBnZXRMZXZlbDogKG5vZGU6IEYpID0+IG51bWJlcixcbiAgICAgICAgcHVibGljIGlzRXhwYW5kYWJsZTogKG5vZGU6IEYpID0+IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZHJlbjogKG5vZGU6IFQpID0+IE9ic2VydmFibGU8VFtdPiB8IFRbXSB8IHVuZGVmaW5lZCB8IG51bGxcbiAgICApIHt9XG5cbiAgICBmbGF0dGVuTm9kZShub2RlOiBULCBsZXZlbDogbnVtYmVyLCByZXN1bHROb2RlczogRltdLCBwYXJlbnQ6IEYgfCBudWxsKTogRltdIHtcbiAgICAgICAgY29uc3QgZmxhdE5vZGUgPSB0aGlzLnRyYW5zZm9ybUZ1bmN0aW9uKG5vZGUsIGxldmVsLCBwYXJlbnQpO1xuICAgICAgICByZXN1bHROb2Rlcy5wdXNoKGZsYXROb2RlKTtcblxuICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGFibGUoZmxhdE5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbk5vZGVzID0gdGhpcy5nZXRDaGlsZHJlbihub2RlKTtcblxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbk5vZGVzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbk5vZGVzLCBsZXZlbCwgcmVzdWx0Tm9kZXMsIGZsYXROb2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbk5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hpbGRyZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbiwgbGV2ZWwsIHJlc3VsdE5vZGVzLCBmbGF0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0Tm9kZXM7XG4gICAgfVxuXG4gICAgZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuOiBUW10sIGxldmVsOiBudW1iZXIsIHJlc3VsdE5vZGVzOiBGW10sIHBhcmVudDogRiB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmxhdHRlbk5vZGUoY2hpbGQsIGxldmVsICsgMSwgcmVzdWx0Tm9kZXMsIHBhcmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZsYXR0ZW4gYSBsaXN0IG9mIG5vZGUgdHlwZSBUIHRvIGZsYXR0ZW5lZCB2ZXJzaW9uIG9mIG5vZGUgRi5cbiAgICAgKiBQbGVhc2Ugbm90ZSB0aGF0IHR5cGUgVCBtYXkgYmUgbmVzdGVkLCBhbmQgdGhlIGxlbmd0aCBvZiBgc3RydWN0dXJlZERhdGFgIG1heSBiZSBkaWZmZXJlbnRcbiAgICAgKiBmcm9tIHRoYXQgb2YgcmV0dXJuZWQgbGlzdCBgRltdYC5cbiAgICAgKi9cbiAgICBmbGF0dGVuTm9kZXMoc3RydWN0dXJlZERhdGE6IFRbXSk6IEZbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdE5vZGVzOiBGW10gPSBbXTtcbiAgICAgICAgc3RydWN0dXJlZERhdGEuZm9yRWFjaCgobm9kZSkgPT4gdGhpcy5mbGF0dGVuTm9kZShub2RlLCAwLCByZXN1bHROb2RlcywgbnVsbCkpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHROb2RlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBhbmQgZmxhdHRlbmVkIG5vZGUgd2l0aCBjdXJyZW50IGV4cGFuc2lvbiBzdGF0dXMuXG4gICAgICogVGhlIHJldHVybmVkIGxpc3QgbWF5IGhhdmUgZGlmZmVyZW50IGxlbmd0aC5cbiAgICAgKi9cbiAgICBleHBhbmRGbGF0dGVuZWROb2Rlcyhub2RlczogRltdLCB0cmVlQ29udHJvbDogVHJlZUNvbnRyb2w8Rj4pOiBGW10ge1xuICAgICAgICBjb25zdCByZXN1bHRzOiBGW10gPSBbXTtcbiAgICAgICAgY29uc3QgY3VycmVudEV4cGFuZDogYm9vbGVhbltdID0gW107XG4gICAgICAgIGN1cnJlbnRFeHBhbmRbMF0gPSB0cnVlO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGxldCBleHBhbmQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5nZXRMZXZlbChub2RlKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXhwYW5kID0gZXhwYW5kICYmIGN1cnJlbnRFeHBhbmRbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChleHBhbmQpIHsgcmVzdWx0cy5wdXNoKG5vZGUpOyB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRFeHBhbmRbdGhpcy5nZXRMZXZlbChub2RlKSArIDFdID0gdHJlZUNvbnRyb2wuaXNFeHBhbmRlZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuXG5lbnVtIE1jVHJlZURhdGFTb3VyY2VDaGFuZ2VUeXBlcyB7XG4gICAgRXhwYW5zaW9uID0gJ2V4cGFuc2lvbicsXG4gICAgRmlsdGVyID0gJ2ZpbHRlcidcbn1cblxuLyoqXG4gKiBEYXRhIHNvdXJjZSBmb3IgZmxhdCB0cmVlLlxuICogVGhlIGRhdGEgc291cmNlIG5lZWQgdG8gaGFuZGxlIGV4cGFuc2lvbi9jb2xsYXBzaW9uIG9mIHRoZSB0cmVlIG5vZGUgYW5kIGNoYW5nZSB0aGUgZGF0YSBmZWVkXG4gKiB0byBgTWNUcmVlYC5cbiAqIFRoZSBuZXN0ZWQgdHJlZSBub2RlcyBvZiB0eXBlIGBUYCBhcmUgZmxhdHRlbmVkIHRocm91Z2ggYE3RgVRyZWVGbGF0dGVuZXJgLCBhbmQgY29udmVydGVkXG4gKiB0byB0eXBlIGBGYCBmb3IgYE1jVHJlZWAgdG8gY29uc3VtZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZUZsYXREYXRhU291cmNlPFQsIEY+IGV4dGVuZHMgRGF0YVNvdXJjZTxGPiB7XG4gICAgZmxhdHRlbmVkRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RltdPihbXSk7XG5cbiAgICBleHBhbmRlZERhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZbXT4oW10pO1xuXG4gICAgZmlsdGVyZWREYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGW10+KFtdKTtcblxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YSh2YWx1ZTogVFtdKSB7XG4gICAgICAgIHRoaXMuX2RhdGEubmV4dCh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5mbGF0dGVuZWREYXRhLm5leHQodGhpcy50cmVlRmxhdHRlbmVyLmZsYXR0ZW5Ob2Rlcyh0aGlzLmRhdGEpKTtcbiAgICAgICAgdGhpcy50cmVlQ29udHJvbC5kYXRhTm9kZXMgPSB0aGlzLmZsYXR0ZW5lZERhdGEudmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGF0YTogQmVoYXZpb3JTdWJqZWN0PFRbXT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0cmVlQ29udHJvbDogRmxhdFRyZWVDb250cm9sPEY+LFxuICAgICAgICBwcml2YXRlIHRyZWVGbGF0dGVuZXI6IE1jVHJlZUZsYXR0ZW5lcjxULCBGPixcbiAgICAgICAgaW5pdGlhbERhdGE6IFRbXSA9IFtdXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihpbml0aWFsRGF0YSk7XG4gICAgfVxuXG4gICAgY29ubmVjdChjb2xsZWN0aW9uVmlld2VyOiBDb2xsZWN0aW9uVmlld2VyKTogT2JzZXJ2YWJsZTxGW10+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgY29sbGVjdGlvblZpZXdlci52aWV3Q2hhbmdlLFxuICAgICAgICAgICAgdGhpcy50cmVlQ29udHJvbC5leHBhbnNpb25Nb2RlbC5jaGFuZ2VkXG4gICAgICAgICAgICAgICAgLnBpcGUobWFwKCh2YWx1ZSkgPT4gKHsgdHlwZTogTWNUcmVlRGF0YVNvdXJjZUNoYW5nZVR5cGVzLkV4cGFuc2lvbiwgdmFsdWUgfSkpKSxcbiAgICAgICAgICAgIHRoaXMudHJlZUNvbnRyb2wuZmlsdGVyVmFsdWVcbiAgICAgICAgICAgICAgICAucGlwZShtYXAoKHZhbHVlKSA9PiAoeyB0eXBlOiBNY1RyZWVEYXRhU291cmNlQ2hhbmdlVHlwZXMuRmlsdGVyLCB2YWx1ZSB9KSkpLFxuICAgICAgICAgICAgdGhpcy5mbGF0dGVuZWREYXRhXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUobWFwKChjaGFuZ2VPYmo6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnR5cGUgPT09IE1jVHJlZURhdGFTb3VyY2VDaGFuZ2VUeXBlcy5GaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnZhbHVlICYmIGNoYW5nZU9iai52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlckhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbnNpb25IYW5kbGVyKGNoYW5nZU9iai52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbnNpb25IYW5kbGVyKGNoYW5nZU9iai52YWx1ZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJIYW5kbGVyKCk6IEZbXSB7XG4gICAgICAgIHRoaXMuZmlsdGVyZWREYXRhLm5leHQodGhpcy50cmVlQ29udHJvbC5maWx0ZXJNb2RlbC5zZWxlY3RlZCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWREYXRhLnZhbHVlO1xuICAgIH1cblxuICAgIGV4cGFuc2lvbkhhbmRsZXIoX2NoYW5nZTogU2VsZWN0aW9uQ2hhbmdlPEY+KTogRltdIHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWROb2RlcyA9IHRoaXMudHJlZUZsYXR0ZW5lci5leHBhbmRGbGF0dGVuZWROb2Rlcyh0aGlzLmZsYXR0ZW5lZERhdGEudmFsdWUsIHRoaXMudHJlZUNvbnRyb2wpO1xuICAgICAgICB0aGlzLmV4cGFuZGVkRGF0YS5uZXh0KGV4cGFuZGVkTm9kZXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkRGF0YS52YWx1ZTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICAvLyBubyBvcFxuICAgIH1cbn1cblxuIl19
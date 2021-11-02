import { BaseTreeControl } from './base-tree-control';
export function defaultCompareValues(firstValue, secondValue) {
    return firstValue === secondValue;
}
export function defaultCompareViewValues(firstViewValue, secondViewValue) {
    return RegExp(secondViewValue, 'gi').test(firstViewValue);
}
/** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
export class FlatTreeControl extends BaseTreeControl {
    /** Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue. */
    constructor(getLevel, isExpandable, 
    /** getValue will be used to determine if the tree contains value or not. Used in method hasValue */
    getValue, 
    /** getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction */
    getViewValue, 
    /** compareValues will be used to comparing values. */
    compareValues = defaultCompareValues, 
    /** compareValues will be used to comparing values. */
    compareViewValues = defaultCompareViewValues) {
        super();
        this.getLevel = getLevel;
        this.isExpandable = isExpandable;
        this.getValue = getValue;
        this.getViewValue = getViewValue;
        this.compareValues = compareValues;
        this.compareViewValues = compareViewValues;
    }
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
     * with correct levels.
     */
    getDescendants(dataNode) {
        const startIndex = this.dataNodes.indexOf(dataNode);
        const results = [];
        // Goes through flattened tree nodes in the `dataNodes` array, and get all descendants.
        // The level of descendants of a tree node must be greater than the level of the given
        // tree node.
        // If we reach a node whose level is equal to the level of the tree node, we hit a sibling.
        // If we reach a node whose level is greater than the level of the tree node, we hit a
        // sibling of an ancestor.
        for (let i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
            results.push(this.dataNodes[i]);
        }
        return results;
    }
    /**
     * Expands all data nodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
     * data nodes of the tree.
     */
    expandAll() {
        this.expansionModel.select(...this.dataNodes);
    }
    getParents(node, result) {
        if (node.parent) {
            result.unshift(node.parent);
            return this.getParents(node.parent, result);
        }
        else {
            return result;
        }
    }
    hasValue(value) {
        return this.dataNodes.find((node) => this.compareValues(this.getValue(node), value));
    }
    filterNodes(value) {
        this.saveExpansionState();
        this.filterModel.clear();
        this.expansionModel.clear();
        const filteredNodes = this.dataNodes
            .filter((node) => this.compareViewValues(this.getViewValue(node), value));
        const filteredNodesWithTheirParents = new Set();
        filteredNodes.forEach((filteredNode) => {
            this.getParents(filteredNode, [])
                .forEach((node) => {
                filteredNodesWithTheirParents.add(node);
                this.expandDataNode(node);
            });
            filteredNodesWithTheirParents.add(filteredNode);
            this.expandDataNode(filteredNode);
            if (this.isExpandable(filteredNode)) {
                const childNodeLevel = this.getLevel(filteredNode) + 1;
                this.getDescendants(filteredNode)
                    .filter((childNode) => this.getLevel(childNode) === childNodeLevel)
                    .filter((childNode) => !this.isExpandable(childNode) || !this.hasFilteredDescendant(childNode, filteredNodes))
                    .forEach((childNode) => {
                    filteredNodesWithTheirParents.add(childNode);
                    this.expandDataNode(childNode);
                });
            }
        });
        this.filterModel.select(...Array.from(filteredNodesWithTheirParents));
        this.filterValue.next(value);
        this.restoreExpansionState();
    }
    expandDataNode(dataNode) {
        if (this.isExpandable(dataNode)) {
            this.expansionModel.select(dataNode);
        }
    }
    saveExpansionState() {
        if (this.filterValue.value === '') {
            this.expandedItemsBeforeFiltration = this.expansionModel.selected;
        }
    }
    restoreExpansionState() {
        if (this.filterValue.value === '') {
            this.expansionModel.clear();
            this.expansionModel.select(...this.expandedItemsBeforeFiltration);
        }
    }
    hasFilteredDescendant(dataNode, filteredNodes) {
        const filteredViewValues = filteredNodes
            .map((node) => this.getViewValue(node));
        return this.getDescendants(dataNode)
            .filter((node) => filteredViewValues.includes(this.getViewValue(node)))
            .length > 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdC10cmVlLWNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS9jb250cm9sL2ZsYXQtdHJlZS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUd0RCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsVUFBVSxFQUFFLFdBQVc7SUFDeEQsT0FBTyxVQUFVLEtBQUssV0FBVyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsY0FBYyxFQUFFLGVBQWU7SUFDcEUsT0FBTyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsMkZBQTJGO0FBQzNGLE1BQU0sT0FBTyxlQUFtQixTQUFRLGVBQWtCO0lBR3RELHNHQUFzRztJQUN0RyxZQUNXLFFBQWlDLEVBQ2pDLFlBQXNDO0lBQzdDLG9HQUFvRztJQUM3RixRQUEyQjtJQUNsQywrR0FBK0c7SUFDeEcsWUFBa0M7SUFDekMsc0RBQXNEO0lBQy9DLGdCQUFzRCxvQkFBb0I7SUFDakYsc0RBQXNEO0lBQy9DLG9CQUFrRSx3QkFBd0I7UUFFakcsS0FBSyxFQUFFLENBQUM7UUFYRCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxpQkFBWSxHQUFaLFlBQVksQ0FBMEI7UUFFdEMsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFFM0IsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBRWxDLGtCQUFhLEdBQWIsYUFBYSxDQUE2RDtRQUUxRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXlFO0lBR3JHLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGNBQWMsQ0FBQyxRQUFXO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFD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LElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0wsQ0FBQztJQUVPLHFCQUFxQixDQUFDLFFBQVcsRUFBRSxhQUFrQjtRQUN6RCxNQUFNLGtCQUFrQixHQUFHLGFBQWE7YUFDbkMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFakQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQzthQUMvQixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdEUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlVHJlZUNvbnRyb2wgfSBmcm9tICcuL2Jhc2UtdHJlZS1jb250cm9sJztcblxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVWYWx1ZXMoZmlyc3RWYWx1ZSwgc2Vjb25kVmFsdWUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmlyc3RWYWx1ZSA9PT0gc2Vjb25kVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Q29tcGFyZVZpZXdWYWx1ZXMoZmlyc3RWaWV3VmFsdWUsIHNlY29uZFZpZXdWYWx1ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBSZWdFeHAoc2Vjb25kVmlld1ZhbHVlLCAnZ2knKS50ZXN0KGZpcnN0Vmlld1ZhbHVlKTtcbn1cblxuLyoqIEZsYXQgdHJlZSBjb250cm9sLiBBYmxlIHRvIGV4cGFuZC9jb2xsYXBzZSBhIHN1YnRyZWUgcmVjdXJzaXZlbHkgZm9yIGZsYXR0ZW5lZCB0cmVlLiAqL1xuZXhwb3J0IGNsYXNzIEZsYXRUcmVlQ29udHJvbDxUPiBleHRlbmRzIEJhc2VUcmVlQ29udHJvbDxUPiB7XG4gICAgZXhwYW5kZWRJdGVtc0JlZm9yZUZpbHRyYXRpb246IFRbXTtcblxuICAgIC8qKiBDb25zdHJ1Y3Qgd2l0aCBmbGF0IHRyZWUgZGF0YSBub2RlIGZ1bmN0aW9ucyBnZXRMZXZlbCwgaXNFeHBhbmRhYmxlLCBnZXRWYWx1ZSBhbmQgZ2V0Vmlld1ZhbHVlLiAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2V0TGV2ZWw6IChkYXRhTm9kZTogVCkgPT4gbnVtYmVyLFxuICAgICAgICBwdWJsaWMgaXNFeHBhbmRhYmxlOiAoZGF0YU5vZGU6IFQpID0+IGJvb2xlYW4sXG4gICAgICAgIC8qKiBnZXRWYWx1ZSB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0cmVlIGNvbnRhaW5zIHZhbHVlIG9yIG5vdC4gVXNlZCBpbiBtZXRob2QgaGFzVmFsdWUgKi9cbiAgICAgICAgcHVibGljIGdldFZhbHVlOiAoZGF0YU5vZGUpID0+IGFueSxcbiAgICAgICAgLyoqIGdldFZpZXdWYWx1ZSB3aWxsIGJlIHVzZWQgZm9yIGZpbHRlciBub2Rlcy4gUmV0dXJuZWQgdmFsdWUgd2lsbCBiZSBmaXJzdCBhcmd1bWVudCBpbiBmaWx0ZXJOb2Rlc0Z1bmN0aW9uICovXG4gICAgICAgIHB1YmxpYyBnZXRWaWV3VmFsdWU6IChkYXRhTm9kZSkgPT4gc3RyaW5nLFxuICAgICAgICAvKiogY29tcGFyZVZhbHVlcyB3aWxsIGJlIHVzZWQgdG8gY29tcGFyaW5nIHZhbHVlcy4gKi9cbiAgICAgICAgcHVibGljIGNvbXBhcmVWYWx1ZXM6IChmaXJzdFZhbHVlLCBzZWNvbmRWYWx1ZSkgPT4gYm9vbGVhbiA9IGRlZmF1bHRDb21wYXJlVmFsdWVzLFxuICAgICAgICAvKiogY29tcGFyZVZhbHVlcyB3aWxsIGJlIHVzZWQgdG8gY29tcGFyaW5nIHZhbHVlcy4gKi9cbiAgICAgICAgcHVibGljIGNvbXBhcmVWaWV3VmFsdWVzOiAoZmlyc3RWaWV3VmFsdWUsIHNlY29uZFZpZXdWYWx1ZSkgPT4gYm9vbGVhbiA9IGRlZmF1bHRDb21wYXJlVmlld1ZhbHVlc1xuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBsaXN0IG9mIHRoZSBkYXRhIG5vZGUncyBzdWJ0cmVlIG9mIGRlc2NlbmRlbnQgZGF0YSBub2Rlcy5cbiAgICAgKlxuICAgICAqIFRvIG1ha2UgdGhpcyB3b3JraW5nLCB0aGUgYGRhdGFOb2Rlc2Agb2YgdGhlIFRyZWVDb250cm9sIG11c3QgYmUgZmxhdHRlbmVkIHRyZWUgbm9kZXNcbiAgICAgKiB3aXRoIGNvcnJlY3QgbGV2ZWxzLlxuICAgICAqL1xuICAgIGdldERlc2NlbmRhbnRzKGRhdGFOb2RlOiBUKTogVFtdIHtcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMuZGF0YU5vZGVzLmluZGV4T2YoZGF0YU5vZGUpO1xuICAgICAgICBjb25zdCByZXN1bHRzOiBUW10gPSBbXTtcblxuICAgICAgICAvLyBHb2VzIHRocm91Z2ggZmxhdHRlbmVkIHRyZWUgbm9kZXMgaW4gdGhlIGBkYXRhTm9kZXNgIGFycmF5LCBhbmQgZ2V0IGFsbCBkZXNjZW5kYW50cy5cbiAgICAgICAgLy8gVGhlIGxldmVsIG9mIGRlc2NlbmRhbnRzIG9mIGEgdHJlZSBub2RlIG11c3QgYmUgZ3JlYXRlciB0aGFuIHRoZSBsZXZlbCBvZiB0aGUgZ2l2ZW5cbiAgICAgICAgLy8gdHJlZSBub2RlLlxuICAgICAgICAvLyBJZiB3ZSByZWFjaCBhIG5vZGUgd2hvc2UgbGV2ZWwgaXMgZXF1YWwgdG8gdGhlIGxldmVsIG9mIHRoZSB0cmVlIG5vZGUsIHdlIGhpdCBhIHNpYmxpbmcuXG4gICAgICAgIC8vIElmIHdlIHJlYWNoIGEgbm9kZSB3aG9zZSBsZXZlbCBpcyBncmVhdGVyIHRoYW4gdGhlIGxldmVsIG9mIHRoZSB0cmVlIG5vZGUsIHdlIGhpdCBhXG4gICAgICAgIC8vIHNpYmxpbmcgb2YgYW4gYW5jZXN0b3IuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4ICsgMTtcbiAgICAgICAgICAgICBpIDwgdGhpcy5kYXRhTm9kZXMubGVuZ3RoICYmIHRoaXMuZ2V0TGV2ZWwoZGF0YU5vZGUpIDwgdGhpcy5nZXRMZXZlbCh0aGlzLmRhdGFOb2Rlc1tpXSk7XG4gICAgICAgICAgICAgaSsrXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuZGF0YU5vZGVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cGFuZHMgYWxsIGRhdGEgbm9kZXMgaW4gdGhlIHRyZWUuXG4gICAgICpcbiAgICAgKiBUbyBtYWtlIHRoaXMgd29ya2luZywgdGhlIGBkYXRhTm9kZXNgIHZhcmlhYmxlIG9mIHRoZSBUcmVlQ29udHJvbCBtdXN0IGJlIHNldCB0byBhbGwgZmxhdHRlbmVkXG4gICAgICogZGF0YSBub2RlcyBvZiB0aGUgdHJlZS5cbiAgICAgKi9cbiAgICBleHBhbmRBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0KC4uLnRoaXMuZGF0YU5vZGVzKTtcbiAgICB9XG5cbiAgICBnZXRQYXJlbnRzKG5vZGU6IGFueSwgcmVzdWx0OiBUW10pOiBUW10ge1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJlc3VsdC51bnNoaWZ0KG5vZGUucGFyZW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyZW50cyhub2RlLnBhcmVudCwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNWYWx1ZSh2YWx1ZTogc3RyaW5nKTogVCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFOb2Rlcy5maW5kKChub2RlOiBhbnkpID0+IHRoaXMuY29tcGFyZVZhbHVlcyh0aGlzLmdldFZhbHVlKG5vZGUpLCB2YWx1ZSkpO1xuICAgIH1cblxuICAgIGZpbHRlck5vZGVzKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zYXZlRXhwYW5zaW9uU3RhdGUoKTtcblxuICAgICAgICB0aGlzLmZpbHRlck1vZGVsLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuY2xlYXIoKTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZE5vZGVzID0gdGhpcy5kYXRhTm9kZXNcbiAgICAgICAgICAgIC5maWx0ZXIoKG5vZGU6IGFueSkgPT4gdGhpcy5jb21wYXJlVmlld1ZhbHVlcyh0aGlzLmdldFZpZXdWYWx1ZShub2RlKSwgdmFsdWUpKTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZE5vZGVzV2l0aFRoZWlyUGFyZW50cyA9IG5ldyBTZXQoKTtcblxuICAgICAgICBmaWx0ZXJlZE5vZGVzLmZvckVhY2goKGZpbHRlcmVkTm9kZSkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmdldFBhcmVudHMoZmlsdGVyZWROb2RlLCBbXSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE5vZGVzV2l0aFRoZWlyUGFyZW50cy5hZGQobm9kZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmREYXRhTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZmlsdGVyZWROb2Rlc1dpdGhUaGVpclBhcmVudHMuYWRkKGZpbHRlcmVkTm9kZSk7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZERhdGFOb2RlKGZpbHRlcmVkTm9kZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZShmaWx0ZXJlZE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlTGV2ZWwgPSB0aGlzLmdldExldmVsKGZpbHRlcmVkTm9kZSkgKyAxO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREZXNjZW5kYW50cyhmaWx0ZXJlZE5vZGUpXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGNoaWxkTm9kZSkgPT4gdGhpcy5nZXRMZXZlbChjaGlsZE5vZGUpID09PSBjaGlsZE5vZGVMZXZlbClcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoY2hpbGROb2RlKSA9PiAhdGhpcy5pc0V4cGFuZGFibGUoY2hpbGROb2RlKSB8fCAhdGhpcy5oYXNGaWx0ZXJlZERlc2NlbmRhbnQoY2hpbGROb2RlLCBmaWx0ZXJlZE5vZGVzKSlcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goKGNoaWxkTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWROb2Rlc1dpdGhUaGVpclBhcmVudHMuYWRkKGNoaWxkTm9kZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kRGF0YU5vZGUoY2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyTW9kZWwuc2VsZWN0KC4uLkFycmF5LmZyb20oZmlsdGVyZWROb2Rlc1dpdGhUaGVpclBhcmVudHMpIGFzIFtdKTtcblxuICAgICAgICB0aGlzLmZpbHRlclZhbHVlLm5leHQodmFsdWUpO1xuXG4gICAgICAgIHRoaXMucmVzdG9yZUV4cGFuc2lvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleHBhbmREYXRhTm9kZShkYXRhTm9kZTogVCkge1xuICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGFibGUoZGF0YU5vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLnNlbGVjdChkYXRhTm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVFeHBhbnNpb25TdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkSXRlbXNCZWZvcmVGaWx0cmF0aW9uID0gdGhpcy5leHBhbnNpb25Nb2RlbC5zZWxlY3RlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzdG9yZUV4cGFuc2lvblN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZS52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0KC4uLnRoaXMuZXhwYW5kZWRJdGVtc0JlZm9yZUZpbHRyYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNGaWx0ZXJlZERlc2NlbmRhbnQoZGF0YU5vZGU6IFQsIGZpbHRlcmVkTm9kZXM6IFRbXSkge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFZpZXdWYWx1ZXMgPSBmaWx0ZXJlZE5vZGVzXG4gICAgICAgICAgICAubWFwKChub2RlOiBhbnkpID0+IHRoaXMuZ2V0Vmlld1ZhbHVlKG5vZGUpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZXNjZW5kYW50cyhkYXRhTm9kZSlcbiAgICAgICAgICAgIC5maWx0ZXIoKG5vZGUpID0+IGZpbHRlcmVkVmlld1ZhbHVlcy5pbmNsdWRlcyh0aGlzLmdldFZpZXdWYWx1ZShub2RlKSkpXG4gICAgICAgICAgICAubGVuZ3RoID4gMDtcbiAgICB9XG59XG4iXX0=
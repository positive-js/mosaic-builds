import { take } from 'rxjs/operators';
import { BaseTreeControl } from './base-tree-control';
/** Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type. */
export class NestedTreeControl extends BaseTreeControl {
    /** Construct with nested tree function getChildren. */
    constructor(getChildren) {
        super();
        this.getChildren = getChildren;
    }
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     */
    expandAll() {
        this.expansionModel.clear();
        const allNodes = this.dataNodes.reduce((accumulator, dataNode) => [...accumulator, ...this.getDescendants(dataNode), dataNode], []);
        this.expansionModel.select(...allNodes);
    }
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    getDescendants(dataNode) {
        const descendants = [];
        this._getDescendants(descendants, dataNode);
        return descendants.splice(1);
    }
    /** A helper function to get descendants recursively. */
    // todo нужно придумать другое название и понять в чем отличие между getDescendants и _getDescendants
    /* tslint:disable-next-line:naming-convention */
    _getDescendants(descendants, dataNode) {
        descendants.push(dataNode);
        this.getChildren(dataNode)
            .pipe(take(1))
            .subscribe((children) => {
            if (children && children.length > 0) {
                children.forEach((child) => this._getDescendants(descendants, child));
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLXRyZWUtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90cmVlL2NvbnRyb2wvbmVzdGVkLXRyZWUtY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3RELDhGQUE4RjtBQUM5RixNQUFNLE9BQU8saUJBQXFCLFNBQVEsZUFBa0I7SUFFeEQsdURBQXVEO0lBQ3ZELFlBQW1CLFdBQTZDO1FBQzVELEtBQUssRUFBRSxDQUFDO1FBRE8sZ0JBQVcsR0FBWCxXQUFXLENBQWtDO0lBRWhFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFNBQVM7UUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUNsQyxDQUFDLFdBQWdCLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsRUFDNUYsRUFBRSxDQUNMLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCw4RkFBOEY7SUFDOUYsY0FBYyxDQUFDLFFBQVc7UUFDdEIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTVDLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELHFHQUFxRztJQUNyRyxnREFBZ0Q7SUFDeEMsZUFBZSxDQUFDLFdBQWdCLEVBQUUsUUFBVztRQUNqRCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNwQixJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUM1RTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQmFzZVRyZWVDb250cm9sIH0gZnJvbSAnLi9iYXNlLXRyZWUtY29udHJvbCc7XG5cblxuLyoqIE5lc3RlZCB0cmVlIGNvbnRyb2wuIEFibGUgdG8gZXhwYW5kL2NvbGxhcHNlIGEgc3VidHJlZSByZWN1cnNpdmVseSBmb3IgTmVzdGVkTm9kZSB0eXBlLiAqL1xuZXhwb3J0IGNsYXNzIE5lc3RlZFRyZWVDb250cm9sPFQ+IGV4dGVuZHMgQmFzZVRyZWVDb250cm9sPFQ+IHtcblxuICAgIC8qKiBDb25zdHJ1Y3Qgd2l0aCBuZXN0ZWQgdHJlZSBmdW5jdGlvbiBnZXRDaGlsZHJlbi4gKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2V0Q2hpbGRyZW46IChkYXRhTm9kZTogVCkgPT4gT2JzZXJ2YWJsZTxUW10+KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwYW5kcyBhbGwgZGF0YU5vZGVzIGluIHRoZSB0cmVlLlxuICAgICAqXG4gICAgICogVG8gbWFrZSB0aGlzIHdvcmtpbmcsIHRoZSBgZGF0YU5vZGVzYCB2YXJpYWJsZSBvZiB0aGUgVHJlZUNvbnRyb2wgbXVzdCBiZSBzZXQgdG8gYWxsIHJvb3QgbGV2ZWxcbiAgICAgKiBkYXRhIG5vZGVzIG9mIHRoZSB0cmVlLlxuICAgICAqL1xuICAgIGV4cGFuZEFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICBjb25zdCBhbGxOb2RlcyA9IHRoaXMuZGF0YU5vZGVzLnJlZHVjZShcbiAgICAgICAgICAgIChhY2N1bXVsYXRvcjogVFtdLCBkYXRhTm9kZSkgPT4gWy4uLmFjY3VtdWxhdG9yLCAuLi50aGlzLmdldERlc2NlbmRhbnRzKGRhdGFOb2RlKSwgZGF0YU5vZGVdLFxuICAgICAgICAgICAgW11cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC5zZWxlY3QoLi4uYWxsTm9kZXMpO1xuICAgIH1cblxuICAgIC8qKiBHZXRzIGEgbGlzdCBvZiBkZXNjZW5kYW50IGRhdGFOb2RlcyBvZiBhIHN1YnRyZWUgcm9vdGVkIGF0IGdpdmVuIGRhdGEgbm9kZSByZWN1cnNpdmVseS4gKi9cbiAgICBnZXREZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IFRbXSB7XG4gICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gW107XG4gICAgICAgIHRoaXMuX2dldERlc2NlbmRhbnRzKGRlc2NlbmRhbnRzLCBkYXRhTm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIGRlc2NlbmRhbnRzLnNwbGljZSgxKTtcbiAgICB9XG5cbiAgICAvKiogQSBoZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IGRlc2NlbmRhbnRzIHJlY3Vyc2l2ZWx5LiAqL1xuICAgIC8vIHRvZG8g0L3Rg9C20L3QviDQv9GA0LjQtNGD0LzQsNGC0Ywg0LTRgNGD0LPQvtC1INC90LDQt9Cy0LDQvdC40LUg0Lgg0L/QvtC90Y/RgtGMINCyINGH0LXQvCDQvtGC0LvQuNGH0LjQtSDQvNC10LbQtNGDIGdldERlc2NlbmRhbnRzINC4IF9nZXREZXNjZW5kYW50c1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvbiAqL1xuICAgIHByaXZhdGUgX2dldERlc2NlbmRhbnRzKGRlc2NlbmRhbnRzOiBUW10sIGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGRlc2NlbmRhbnRzLnB1c2goZGF0YU5vZGUpO1xuXG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRyZW4oZGF0YU5vZGUpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hpbGRyZW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZDogVCkgPT4gdGhpcy5fZ2V0RGVzY2VuZGFudHMoZGVzY2VuZGFudHMsIGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19
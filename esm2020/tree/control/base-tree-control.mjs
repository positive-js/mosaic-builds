import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
/** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
/* tslint:disable-next-line:naming-convention */
export class BaseTreeControl {
    constructor() {
        /** A selection model with multi-selection to track expansion status. */
        this.expansionModel = new SelectionModel(true);
        this.filterModel = new SelectionModel(true);
        this.filterValue = new BehaviorSubject('');
    }
    /** Toggles one single data node's expanded/collapsed state. */
    toggle(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.toggle(dataNode);
    }
    /** Expands one single data node. */
    expand(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.select(dataNode);
    }
    /** Collapses one single data node. */
    collapse(dataNode) {
        if (this.filterValue.value) {
            return;
        }
        this.expansionModel.deselect(dataNode);
    }
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    isExpanded(dataNode) {
        return this.expansionModel.isSelected(dataNode);
    }
    /** Toggles a subtree rooted at `node` recursively. */
    toggleDescendants(dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    }
    /** Collapse all dataNodes in the tree. */
    collapseAll() {
        this.expansionModel.clear();
    }
    /** Expands a subtree rooted at given data node recursively. */
    expandDescendants(dataNode) {
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.select(...toBeProcessed);
    }
    /** Collapses a subtree rooted at given data node recursively. */
    collapseDescendants(dataNode) {
        const toBeProcessed = [dataNode];
        toBeProcessed.push(...this.getDescendants(dataNode));
        this.expansionModel.deselect(...toBeProcessed);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS10cmVlLWNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS9jb250cm9sL2Jhc2UtdHJlZS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBS25ELCtGQUErRjtBQUMvRixnREFBZ0Q7QUFDaEQsTUFBTSxPQUFnQixlQUFlO0lBQXJDO1FBR0ksd0VBQXdFO1FBQ3hFLG1CQUFjLEdBQXNCLElBQUksY0FBYyxDQUFJLElBQUksQ0FBQyxDQUFDO1FBRWhFLGdCQUFXLEdBQXNCLElBQUksY0FBYyxDQUFJLElBQUksQ0FBQyxDQUFDO1FBRTdELGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7SUF1RWxELENBQUM7SUFuREcsK0RBQStEO0lBQy9ELE1BQU0sQ0FBQyxRQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUV2QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLE1BQU0sQ0FBQyxRQUFXO1FBQ2QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUV2QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsc0NBQXNDO0lBQ3RDLFFBQVEsQ0FBQyxRQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELCtGQUErRjtJQUMvRixVQUFVLENBQUMsUUFBVztRQUNsQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsaUJBQWlCLENBQUMsUUFBVztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsMENBQTBDO0lBQzFDLFdBQVc7UUFDUCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsaUJBQWlCLENBQUMsUUFBVztRQUN6QixNQUFNLGFBQWEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsaUVBQWlFO0lBQ2pFLG1CQUFtQixDQUFDLFFBQVc7UUFDM0IsTUFBTSxhQUFhLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFRyZWVDb250cm9sIH0gZnJvbSAnLi90cmVlLWNvbnRyb2wnO1xuXG5cbi8qKiBCYXNlIHRyZWUgY29udHJvbC4gSXQgaGFzIGJhc2ljIHRvZ2dsZS9leHBhbmQvY29sbGFwc2Ugb3BlcmF0aW9ucyBvbiBhIHNpbmdsZSBkYXRhIG5vZGUuICovXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb24gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlVHJlZUNvbnRyb2w8VD4gaW1wbGVtZW50cyBUcmVlQ29udHJvbDxUPiB7XG4gICAgZGF0YU5vZGVzOiBUW107XG5cbiAgICAvKiogQSBzZWxlY3Rpb24gbW9kZWwgd2l0aCBtdWx0aS1zZWxlY3Rpb24gdG8gdHJhY2sgZXhwYW5zaW9uIHN0YXR1cy4gKi9cbiAgICBleHBhbnNpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWw8VD4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSk7XG5cbiAgICBmaWx0ZXJNb2RlbDogU2VsZWN0aW9uTW9kZWw8VD4gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSk7XG5cbiAgICBmaWx0ZXJWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgICAvKiogR2V0IGRlcHRoIG9mIGEgZ2l2ZW4gZGF0YSBub2RlLCByZXR1cm4gdGhlIGxldmVsIG51bWJlci4gVGhpcyBpcyBmb3IgZmxhdCB0cmVlIG5vZGUuICovXG4gICAgZ2V0TGV2ZWw6IChkYXRhTm9kZTogVCkgPT4gbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGF0YSBub2RlIGlzIGV4cGFuZGFibGUuIFJldHVybnMgdHJ1ZSBpZiBleHBhbmRhYmxlLlxuICAgICAqIFRoaXMgaXMgZm9yIGZsYXQgdHJlZSBub2RlLlxuICAgICAqL1xuICAgIGlzRXhwYW5kYWJsZTogKGRhdGFOb2RlOiBUKSA9PiBib29sZWFuO1xuXG4gICAgLyoqIEdldHMgYSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgZ2l2ZW4gZGF0YSBub2RlJ3MgY2hpbGRyZW4gY2hhbmdlLiAqL1xuICAgIGdldENoaWxkcmVuOiAoZGF0YU5vZGU6IFQpID0+IE9ic2VydmFibGU8VFtdPjtcblxuICAgIC8qKiBHZXRzIGEgbGlzdCBvZiBkZXNjZW5kZW50IGRhdGEgbm9kZXMgb2YgYSBzdWJ0cmVlIHJvb3RlZCBhdCBnaXZlbiBkYXRhIG5vZGUgcmVjdXJzaXZlbHkuICovXG4gICAgYWJzdHJhY3QgZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGU6IFQpOiBUW107XG5cbiAgICAvKiogRXhwYW5kcyBhbGwgZGF0YSBub2RlcyBpbiB0aGUgdHJlZS4gKi9cbiAgICBhYnN0cmFjdCBleHBhbmRBbGwoKTogdm9pZDtcblxuICAgIC8qKiBUb2dnbGVzIG9uZSBzaW5nbGUgZGF0YSBub2RlJ3MgZXhwYW5kZWQvY29sbGFwc2VkIHN0YXRlLiAqL1xuICAgIHRvZ2dsZShkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZS52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLnRvZ2dsZShkYXRhTm9kZSk7XG4gICAgfVxuXG4gICAgLyoqIEV4cGFuZHMgb25lIHNpbmdsZSBkYXRhIG5vZGUuICovXG4gICAgZXhwYW5kKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuc2VsZWN0KGRhdGFOb2RlKTtcbiAgICB9XG5cbiAgICAvKiogQ29sbGFwc2VzIG9uZSBzaW5nbGUgZGF0YSBub2RlLiAqL1xuICAgIGNvbGxhcHNlKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuZGVzZWxlY3QoZGF0YU5vZGUpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIGEgZ2l2ZW4gZGF0YSBub2RlIGlzIGV4cGFuZGVkIG9yIG5vdC4gUmV0dXJucyB0cnVlIGlmIHRoZSBkYXRhIG5vZGUgaXMgZXhwYW5kZWQuICovXG4gICAgaXNFeHBhbmRlZChkYXRhTm9kZTogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBhbnNpb25Nb2RlbC5pc1NlbGVjdGVkKGRhdGFOb2RlKTtcbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGBub2RlYCByZWN1cnNpdmVseS4gKi9cbiAgICB0b2dnbGVEZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmlzU2VsZWN0ZWQoZGF0YU5vZGUpXG4gICAgICAgICAgICA/IHRoaXMuY29sbGFwc2VEZXNjZW5kYW50cyhkYXRhTm9kZSlcbiAgICAgICAgICAgIDogdGhpcy5leHBhbmREZXNjZW5kYW50cyhkYXRhTm9kZSk7XG4gICAgfVxuXG4gICAgLyoqIENvbGxhcHNlIGFsbCBkYXRhTm9kZXMgaW4gdGhlIHRyZWUuICovXG4gICAgY29sbGFwc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5zaW9uTW9kZWwuY2xlYXIoKTtcbiAgICB9XG5cbiAgICAvKiogRXhwYW5kcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGdpdmVuIGRhdGEgbm9kZSByZWN1cnNpdmVseS4gKi9cbiAgICBleHBhbmREZXNjZW5kYW50cyhkYXRhTm9kZTogVCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b0JlUHJvY2Vzc2VkID0gW2RhdGFOb2RlXTtcbiAgICAgICAgdG9CZVByb2Nlc3NlZC5wdXNoKC4uLnRoaXMuZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGUpKTtcbiAgICAgICAgdGhpcy5leHBhbnNpb25Nb2RlbC5zZWxlY3QoLi4udG9CZVByb2Nlc3NlZCk7XG4gICAgfVxuXG4gICAgLyoqIENvbGxhcHNlcyBhIHN1YnRyZWUgcm9vdGVkIGF0IGdpdmVuIGRhdGEgbm9kZSByZWN1cnNpdmVseS4gKi9cbiAgICBjb2xsYXBzZURlc2NlbmRhbnRzKGRhdGFOb2RlOiBUKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRvQmVQcm9jZXNzZWQgPSBbZGF0YU5vZGVdO1xuICAgICAgICB0b0JlUHJvY2Vzc2VkLnB1c2goLi4udGhpcy5nZXREZXNjZW5kYW50cyhkYXRhTm9kZSkpO1xuICAgICAgICB0aGlzLmV4cGFuc2lvbk1vZGVsLmRlc2VsZWN0KC4uLnRvQmVQcm9jZXNzZWQpO1xuICAgIH1cbn1cbiJdfQ==
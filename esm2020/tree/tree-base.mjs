import { ChangeDetectorRef, ContentChildren, ElementRef, Input, IterableDiffers, QueryList, ViewChild, Inject, forwardRef, Directive } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { McTreeNodeDef, McTreeNodeOutletContext } from './node';
import { McTreeNodeOutlet } from './outlet';
import { getTreeControlMissingError, getTreeMissingMatchingNodeDefError, getTreeMultipleDefaultNodeDefsError, getTreeNoValidDataSourceError } from './tree-errors';
import * as i0 from "@angular/core";
export class McTreeBase {
    constructor(differs, changeDetectorRef) {
        this.differs = differs;
        this.changeDetectorRef = changeDetectorRef;
        // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
        //     Remove the MAX_VALUE in viewChange
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChange = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        /** Subject that emits when the component has been destroyed. */
        this.onDestroy = new Subject();
        /** Level of nodes */
        this.levels = new Map();
    }
    /**
     * Provides a stream containing the latest data array to render. Influenced by the tree's
     * stream of view window (what dataNodes are currently on screen).
     * Data source can be an observable of data array, or a dara array to render.
     */
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(dataSource) {
        if (this._dataSource !== dataSource) {
            this.switchDataSource(dataSource);
        }
    }
    ngOnInit() {
        this.dataDiffer = this.differs.find([]).create(this.trackBy);
        if (!this.treeControl) {
            throw getTreeControlMissingError();
        }
    }
    ngOnDestroy() {
        this.nodeOutlet.viewContainer.clear();
        this.onDestroy.next();
        this.onDestroy.complete();
        // tslint:disable-next-line:no-unbound-method
        if (this._dataSource && typeof this.dataSource.disconnect === 'function') {
            this.dataSource.disconnect(this);
        }
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
            this.dataSubscription = null;
        }
    }
    ngAfterContentChecked() {
        const defaultNodeDefs = this.nodeDefs.filter((def) => !def.when);
        if (defaultNodeDefs.length > 1) {
            throw getTreeMultipleDefaultNodeDefsError();
        }
        this.defaultNodeDef = defaultNodeDefs[0];
        if (this.dataSource && this.nodeDefs && !this.dataSubscription) {
            this.observeRenderChanges();
        }
    }
    /** Check for changes made in the data and render each change (node added/removed/moved). */
    renderNodeChanges(data, dataDiffer = this.dataDiffer, viewContainer = this.nodeOutlet.viewContainer, parentData) {
        const changes = dataDiffer.diff(data);
        if (!changes) {
            return;
        }
        changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
            if (item.previousIndex == null) {
                this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
            }
            else if (currentIndex == null) {
                viewContainer.remove(adjustedPreviousIndex);
                this.levels.delete(item.item);
            }
            else {
                const view = viewContainer.get(adjustedPreviousIndex);
                viewContainer.move(view, currentIndex);
            }
        });
        this.changeDetectorRef.detectChanges();
    }
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     */
    getNodeDef(data, i) {
        if (this.nodeDefs.length === 1) {
            return this.nodeDefs.first;
        }
        const nodeDef = this.nodeDefs.find((def) => def.when && def.when(i, data)) || this.defaultNodeDef;
        if (!nodeDef) {
            throw getTreeMissingMatchingNodeDefError();
        }
        return nodeDef;
    }
    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     */
    insertNode(nodeData, index, viewContainer, parentData) {
        const node = this.getNodeDef(nodeData, index);
        // Node context that will be provided to created embedded view
        const context = new McTreeNodeOutletContext(nodeData);
        // If the tree is flat tree, then use the `getLevel` function in flat tree control
        // Otherwise, use the level of parent node.
        if (this.treeControl.getLevel) {
            context.level = this.treeControl.getLevel(nodeData);
            /* tslint:disable-next-line:no-typeof-undefined */
        }
        else if (typeof parentData !== 'undefined' && this.levels.has(parentData)) {
            context.level = this.levels.get(parentData) + 1;
        }
        else {
            context.level = 0;
        }
        this.levels.set(nodeData, context.level);
        // Use default tree nodeOutlet, or nested node's nodeOutlet
        const container = viewContainer ? viewContainer : this.nodeOutlet.viewContainer;
        container.createEmbeddedView(node.template, context, index);
        // Set the data to just created `McTreeNode`.
        // The `McTreeNode` created from `createEmbeddedView` will be saved in static variable
        //     `mostRecentTreeNode`. We get it from static variable and pass the node data to it.
        if (McTreeNode.mostRecentTreeNode) {
            McTreeNode.mostRecentTreeNode.data = nodeData;
        }
    }
    /** Set up a subscription for the data provided by the data source. */
    observeRenderChanges() {
        let dataStream;
        // Cannot use `instanceof DataSource` since the data source could be a literal with
        // `connect` function and may not extends DataSource.
        // tslint:disable-next-line:no-unbound-method
        if (typeof this._dataSource.connect === 'function') {
            dataStream = this._dataSource.connect(this);
        }
        else if (this._dataSource instanceof Observable) {
            dataStream = this._dataSource;
        }
        else if (Array.isArray(this._dataSource)) {
            dataStream = observableOf(this._dataSource);
        }
        if (dataStream) {
            this.dataSubscription = dataStream
                .pipe(takeUntil(this.onDestroy))
                .subscribe((data) => this.renderNodeChanges(data));
        }
        else {
            throw getTreeNoValidDataSourceError();
        }
    }
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    switchDataSource(dataSource) {
        // tslint:disable-next-line:no-unbound-method
        if (this._dataSource && typeof this._dataSource.disconnect === 'function') {
            this.dataSource.disconnect(this);
        }
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
            this.dataSubscription = null;
        }
        // Remove the all dataNodes if there is now no data source
        if (!dataSource) {
            this.nodeOutlet.viewContainer.clear();
        }
        this._dataSource = dataSource;
        if (this.nodeDefs) {
            this.observeRenderChanges();
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McTreeBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTreeBase, deps: [{ token: i0.IterableDiffers }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTreeBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McTreeBase, inputs: { treeControl: "treeControl", trackBy: "trackBy", dataSource: "dataSource" }, queries: [{ propertyName: "nodeDefs", predicate: McTreeNodeDef }], viewQueries: [{ propertyName: "nodeOutlet", first: true, predicate: McTreeNodeOutlet, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTreeBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { treeControl: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], nodeOutlet: [{
                type: ViewChild,
                args: [McTreeNodeOutlet, { static: true }]
            }], nodeDefs: [{
                type: ContentChildren,
                args: [McTreeNodeDef]
            }], dataSource: [{
                type: Input
            }] } });
export class McTreeNode {
    constructor(elementRef, tree) {
        this.elementRef = elementRef;
        this.tree = tree;
        this.destroyed = new Subject();
        McTreeNode.mostRecentTreeNode = this;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    get isExpanded() {
        return this.tree.treeControl.isExpanded(this.data);
    }
    get level() {
        return this.tree.treeControl.getLevel ? this.tree.treeControl.getLevel(this._data) : 0;
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    focus() {
        this.elementRef.nativeElement.focus();
    }
}
/**
 * The most recently created `McTreeNode`. We save it in static variable so we can retrieve it
 * in `McTree` and set the data to it.
 */
McTreeNode.mostRecentTreeNode = null;
/** @nocollapse */ /** @nocollapse */ McTreeNode.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTreeNode, deps: [{ token: i0.ElementRef }, { token: forwardRef(() => McTreeBase) }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTreeNode.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McTreeNode, selector: "mc-tree-node", exportAs: ["mcTreeNode"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTreeNode, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-tree-node',
                    exportAs: 'mcTreeNode'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: McTreeBase, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => McTreeBase)]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFVBQVUsRUFDVixLQUFLLEVBR0wsZUFBZSxFQUdmLFNBQVMsRUFDVCxTQUFTLEVBR1QsTUFBTSxFQUNOLFVBQVUsRUFBRSxTQUFTLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM5RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUMsT0FBTyxFQUNILDBCQUEwQixFQUMxQixrQ0FBa0MsRUFDbEMsbUNBQW1DLEVBQ25DLDZCQUE2QixFQUNoQyxNQUFNLGVBQWUsQ0FBQzs7QUFJdkIsTUFBTSxPQUFPLFVBQVU7SUEwRG5CLFlBQXNCLE9BQXdCLEVBQVksaUJBQW9DO1FBQXhFLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXpDOUYsNkZBQTZGO1FBQzdGLHlDQUF5QztRQUN6Qzs7O1dBR0c7UUFDSCxlQUFVLEdBQUcsSUFBSSxlQUFlLENBQWlDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFLdEcsZ0VBQWdFO1FBQ3hELGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUXhDLHFCQUFxQjtRQUNiLFdBQU0sR0FBbUIsSUFB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O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFDLENBQUM7O0FBeENEOzs7R0FHRztBQUNJLDZCQUFrQixHQUEyQixJQUFLLENBQUE7NklBTGhELFVBQVUsNENBNkJQLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUlBN0IvQixVQUFVOzJGQUFWLFVBQVU7a0JBSnRCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxZQUFZO2lCQUN6QjttRkE4QjBELFVBQVU7MEJBQTVELE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbGxlY3Rpb25WaWV3ZXIsIERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIEl0ZXJhYmxlQ2hhbmdlUmVjb3JkLFxuICAgIEl0ZXJhYmxlRGlmZmVyLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBUcmFja0J5RnVuY3Rpb24sXG4gICAgSW5qZWN0LFxuICAgIGZvcndhcmRSZWYsIERpcmVjdGl2ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFRyZWVDb250cm9sIH0gZnJvbSAnLi9jb250cm9sL3RyZWUtY29udHJvbCc7XG5pbXBvcnQgeyBNY1RyZWVOb2RlRGVmLCBNY1RyZWVOb2RlT3V0bGV0Q29udGV4dCB9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQgeyBNY1RyZWVOb2RlT3V0bGV0IH0gZnJvbSAnLi9vdXRsZXQnO1xuaW1wb3J0IHtcbiAgICBnZXRUcmVlQ29udHJvbE1pc3NpbmdFcnJvcixcbiAgICBnZXRUcmVlTWlzc2luZ01hdGNoaW5nTm9kZURlZkVycm9yLFxuICAgIGdldFRyZWVNdWx0aXBsZURlZmF1bHROb2RlRGVmc0Vycm9yLFxuICAgIGdldFRyZWVOb1ZhbGlkRGF0YVNvdXJjZUVycm9yXG59IGZyb20gJy4vdHJlZS1lcnJvcnMnO1xuXG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE1jVHJlZUJhc2U8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb2xsZWN0aW9uVmlld2VyLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gICAgQElucHV0KCkgdHJlZUNvbnRyb2w6IFRyZWVDb250cm9sPFQ+O1xuXG4gICAgLyoqXG4gICAgICogVHJhY2tpbmcgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gY2hlY2sgdGhlIGRpZmZlcmVuY2VzIGluIGRhdGEgY2hhbmdlcy4gVXNlZCBzaW1pbGFybHlcbiAgICAgKiB0byBgbmdGb3JgIGB0cmFja0J5YCBmdW5jdGlvbi4gT3B0aW1pemUgbm9kZSBvcGVyYXRpb25zIGJ5IGlkZW50aWZ5aW5nIGEgbm9kZSBiYXNlZCBvbiBpdHMgZGF0YVxuICAgICAqIHJlbGF0aXZlIHRvIHRoZSBmdW5jdGlvbiB0byBrbm93IGlmIGEgbm9kZSBzaG91bGQgYmUgYWRkZWQvcmVtb3ZlZC9tb3ZlZC5cbiAgICAgKiBBY2NlcHRzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyB0d28gcGFyYW1ldGVycywgYGluZGV4YCBhbmQgYGl0ZW1gLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxUPjtcblxuICAgIC8vIE91dGxldHMgd2l0aGluIHRoZSB0cmVlJ3MgdGVtcGxhdGUgd2hlcmUgdGhlIGRhdGFOb2RlcyB3aWxsIGJlIGluc2VydGVkLlxuICAgIEBWaWV3Q2hpbGQoTWNUcmVlTm9kZU91dGxldCwgeyBzdGF0aWM6IHRydWUgfSkgbm9kZU91dGxldDogTWNUcmVlTm9kZU91dGxldDtcblxuICAgIC8qKiBUaGUgdHJlZSBub2RlIHRlbXBsYXRlIGZvciB0aGUgdHJlZSAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNUcmVlTm9kZURlZikgbm9kZURlZnM6IFF1ZXJ5TGlzdDxNY1RyZWVOb2RlRGVmPFQ+PjtcblxuICAgIC8vIFRPRE8odGluYXl1YW5nYW8pOiBTZXR1cCBhIGxpc3RlbmVyIGZvciBzY3JvbGxpbmcsIGVtaXQgdGhlIGNhbGN1bGF0ZWQgdmlldyB0byB2aWV3Q2hhbmdlLlxuICAgIC8vICAgICBSZW1vdmUgdGhlIE1BWF9WQUxVRSBpbiB2aWV3Q2hhbmdlXG4gICAgLyoqXG4gICAgICogU3RyZWFtIGNvbnRhaW5pbmcgdGhlIGxhdGVzdCBpbmZvcm1hdGlvbiBvbiB3aGF0IHJvd3MgYXJlIGJlaW5nIGRpc3BsYXllZCBvbiBzY3JlZW4uXG4gICAgICogQ2FuIGJlIHVzZWQgYnkgdGhlIGRhdGEgc291cmNlIHRvIGFzIGEgaGV1cmlzdGljIG9mIHdoYXQgZGF0YSBzaG91bGQgYmUgcHJvdmlkZWQuXG4gICAgICovXG4gICAgdmlld0NoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8eyBzdGFydDogbnVtYmVyOyBlbmQ6IG51bWJlciB9Pih7IHN0YXJ0OiAwLCBlbmQ6IE51bWJlci5NQVhfVkFMVUUgfSk7XG5cbiAgICAvKiogRGlmZmVyIHVzZWQgdG8gZmluZCB0aGUgY2hhbmdlcyBpbiB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gICAgcHJvdGVjdGVkIGRhdGFEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPFQ+O1xuXG4gICAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBTdG9yZXMgdGhlIG5vZGUgZGVmaW5pdGlvbiB0aGF0IGRvZXMgbm90IGhhdmUgYSB3aGVuIHByZWRpY2F0ZS4gKi9cbiAgICBwcml2YXRlIGRlZmF1bHROb2RlRGVmOiBNY1RyZWVOb2RlRGVmPFQ+IHwgbnVsbDtcblxuICAgIC8qKiBEYXRhIHN1YnNjcmlwdGlvbiAqL1xuICAgIHByaXZhdGUgZGF0YVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICAgIC8qKiBMZXZlbCBvZiBub2RlcyAqL1xuICAgIHByaXZhdGUgbGV2ZWxzOiBNYXA8VCwgbnVtYmVyPiA9IG5ldyBNYXA8VCwgbnVtYmVyPigpO1xuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgYSBzdHJlYW0gY29udGFpbmluZyB0aGUgbGF0ZXN0IGRhdGEgYXJyYXkgdG8gcmVuZGVyLiBJbmZsdWVuY2VkIGJ5IHRoZSB0cmVlJ3NcbiAgICAgKiBzdHJlYW0gb2YgdmlldyB3aW5kb3cgKHdoYXQgZGF0YU5vZGVzIGFyZSBjdXJyZW50bHkgb24gc2NyZWVuKS5cbiAgICAgKiBEYXRhIHNvdXJjZSBjYW4gYmUgYW4gb2JzZXJ2YWJsZSBvZiBkYXRhIGFycmF5LCBvciBhIGRhcmEgYXJyYXkgdG8gcmVuZGVyLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRhdGFTb3VyY2UoKTogRGF0YVNvdXJjZTxUPiB8IE9ic2VydmFibGU8VFtdPiB8IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICAgIH1cblxuICAgIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2U6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10pIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgIT09IGRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoRGF0YVNvdXJjZShkYXRhU291cmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLCBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZGF0YURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGUodGhpcy50cmFja0J5KTtcblxuICAgICAgICBpZiAoIXRoaXMudHJlZUNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRocm93IGdldFRyZWVDb250cm9sTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ub2RlT3V0bGV0LnZpZXdDb250YWluZXIuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLm9uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMub25EZXN0cm95LmNvbXBsZXRlKCk7XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHR5cGVvZiAodGhpcy5kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICh0aGlzLmRhdGFTb3VyY2UgYXMgRGF0YVNvdXJjZTxUPikuZGlzY29ubmVjdCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5kYXRhU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdE5vZGVEZWZzID0gdGhpcy5ub2RlRGVmcy5maWx0ZXIoKGRlZikgPT4gIWRlZi53aGVuKTtcblxuICAgICAgICBpZiAoZGVmYXVsdE5vZGVEZWZzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IGdldFRyZWVNdWx0aXBsZURlZmF1bHROb2RlRGVmc0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWZhdWx0Tm9kZURlZiA9IGRlZmF1bHROb2RlRGVmc1swXTtcblxuICAgICAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMubm9kZURlZnMgJiYgIXRoaXMuZGF0YVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlUmVuZGVyQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENoZWNrIGZvciBjaGFuZ2VzIG1hZGUgaW4gdGhlIGRhdGEgYW5kIHJlbmRlciBlYWNoIGNoYW5nZSAobm9kZSBhZGRlZC9yZW1vdmVkL21vdmVkKS4gKi9cbiAgICByZW5kZXJOb2RlQ2hhbmdlcyhcbiAgICAgICAgZGF0YTogVFtdIHwgUmVhZG9ubHlBcnJheTxUPixcbiAgICAgICAgZGF0YURpZmZlcjogSXRlcmFibGVEaWZmZXI8VD4gPSB0aGlzLmRhdGFEaWZmZXIsXG4gICAgICAgIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYgPSB0aGlzLm5vZGVPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICAgICAgcGFyZW50RGF0YT86IFRcbiAgICApIHtcbiAgICAgICAgY29uc3QgY2hhbmdlcyA9IGRhdGFEaWZmZXIuZGlmZihkYXRhKTtcblxuICAgICAgICBpZiAoIWNoYW5nZXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKChcbiAgICAgICAgICAgIGl0ZW06IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFQ+LFxuICAgICAgICAgICAgYWRqdXN0ZWRQcmV2aW91c0luZGV4OiBudW1iZXIgfCBudWxsLFxuICAgICAgICAgICAgY3VycmVudEluZGV4OiBudW1iZXIgfCBudWxsXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnROb2RlKGRhdGFbY3VycmVudEluZGV4IV0sIGN1cnJlbnRJbmRleCEsIHZpZXdDb250YWluZXIsIHBhcmVudERhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXIucmVtb3ZlKGFkanVzdGVkUHJldmlvdXNJbmRleCEpO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxzLmRlbGV0ZShpdGVtLml0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gdmlld0NvbnRhaW5lci5nZXQoYWRqdXN0ZWRQcmV2aW91c0luZGV4ISk7XG4gICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lci5tb3ZlKHZpZXchLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgbWF0Y2hpbmcgbm9kZSBkZWZpbml0aW9uIHRoYXQgc2hvdWxkIGJlIHVzZWQgZm9yIHRoaXMgbm9kZSBkYXRhLiBJZiB0aGVyZSBpcyBvbmx5XG4gICAgICogb25lIG5vZGUgZGVmaW5pdGlvbiwgaXQgaXMgcmV0dXJuZWQuIE90aGVyd2lzZSwgZmluZCB0aGUgbm9kZSBkZWZpbml0aW9uIHRoYXQgaGFzIGEgd2hlblxuICAgICAqIHByZWRpY2F0ZSB0aGF0IHJldHVybnMgdHJ1ZSB3aXRoIHRoZSBkYXRhLiBJZiBub25lIHJldHVybiB0cnVlLCByZXR1cm4gdGhlIGRlZmF1bHQgbm9kZVxuICAgICAqIGRlZmluaXRpb24uXG4gICAgICovXG4gICAgZ2V0Tm9kZURlZihkYXRhOiBULCBpOiBudW1iZXIpOiBNY1RyZWVOb2RlRGVmPFQ+IHtcbiAgICAgICAgaWYgKHRoaXMubm9kZURlZnMubGVuZ3RoID09PSAxKSB7IHJldHVybiB0aGlzLm5vZGVEZWZzLmZpcnN0OyB9XG5cbiAgICAgICAgY29uc3Qgbm9kZURlZiA9IHRoaXMubm9kZURlZnMuZmluZCgoZGVmKSA9PiBkZWYud2hlbiAmJiBkZWYud2hlbihpLCBkYXRhKSkgfHwgdGhpcy5kZWZhdWx0Tm9kZURlZjtcblxuICAgICAgICBpZiAoIW5vZGVEZWYpIHsgdGhyb3cgZ2V0VHJlZU1pc3NpbmdNYXRjaGluZ05vZGVEZWZFcnJvcigpOyB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVEZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBlbWJlZGRlZCB2aWV3IGZvciB0aGUgZGF0YSBub2RlIHRlbXBsYXRlIGFuZCBwbGFjZSBpdCBpbiB0aGUgY29ycmVjdCBpbmRleCBsb2NhdGlvblxuICAgICAqIHdpdGhpbiB0aGUgZGF0YSBub2RlIHZpZXcgY29udGFpbmVyLlxuICAgICAqL1xuICAgIGluc2VydE5vZGUobm9kZURhdGE6IFQsIGluZGV4OiBudW1iZXIsIHZpZXdDb250YWluZXI/OiBWaWV3Q29udGFpbmVyUmVmLCBwYXJlbnREYXRhPzogVCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5nZXROb2RlRGVmKG5vZGVEYXRhLCBpbmRleCk7XG5cbiAgICAgICAgLy8gTm9kZSBjb250ZXh0IHRoYXQgd2lsbCBiZSBwcm92aWRlZCB0byBjcmVhdGVkIGVtYmVkZGVkIHZpZXdcbiAgICAgICAgY29uc3QgY29udGV4dCA9IG5ldyBNY1RyZWVOb2RlT3V0bGV0Q29udGV4dDxUPihub2RlRGF0YSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHRyZWUgaXMgZmxhdCB0cmVlLCB0aGVuIHVzZSB0aGUgYGdldExldmVsYCBmdW5jdGlvbiBpbiBmbGF0IHRyZWUgY29udHJvbFxuICAgICAgICAvLyBPdGhlcndpc2UsIHVzZSB0aGUgbGV2ZWwgb2YgcGFyZW50IG5vZGUuXG4gICAgICAgIGlmICh0aGlzLnRyZWVDb250cm9sLmdldExldmVsKSB7XG4gICAgICAgICAgICBjb250ZXh0LmxldmVsID0gdGhpcy50cmVlQ29udHJvbC5nZXRMZXZlbChub2RlRGF0YSk7XG4gICAgICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdHlwZW9mLXVuZGVmaW5lZCAqL1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJlbnREYXRhICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmxldmVscy5oYXMocGFyZW50RGF0YSkpIHtcbiAgICAgICAgICAgIGNvbnRleHQubGV2ZWwgPSB0aGlzLmxldmVscy5nZXQocGFyZW50RGF0YSkhICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQubGV2ZWwgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sZXZlbHMuc2V0KG5vZGVEYXRhLCBjb250ZXh0LmxldmVsKTtcblxuICAgICAgICAvLyBVc2UgZGVmYXVsdCB0cmVlIG5vZGVPdXRsZXQsIG9yIG5lc3RlZCBub2RlJ3Mgbm9kZU91dGxldFxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB2aWV3Q29udGFpbmVyID8gdmlld0NvbnRhaW5lciA6IHRoaXMubm9kZU91dGxldC52aWV3Q29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KG5vZGUudGVtcGxhdGUsIGNvbnRleHQsIGluZGV4KTtcblxuICAgICAgICAvLyBTZXQgdGhlIGRhdGEgdG8ganVzdCBjcmVhdGVkIGBNY1RyZWVOb2RlYC5cbiAgICAgICAgLy8gVGhlIGBNY1RyZWVOb2RlYCBjcmVhdGVkIGZyb20gYGNyZWF0ZUVtYmVkZGVkVmlld2Agd2lsbCBiZSBzYXZlZCBpbiBzdGF0aWMgdmFyaWFibGVcbiAgICAgICAgLy8gICAgIGBtb3N0UmVjZW50VHJlZU5vZGVgLiBXZSBnZXQgaXQgZnJvbSBzdGF0aWMgdmFyaWFibGUgYW5kIHBhc3MgdGhlIG5vZGUgZGF0YSB0byBpdC5cbiAgICAgICAgaWYgKE1jVHJlZU5vZGUubW9zdFJlY2VudFRyZWVOb2RlKSB7XG4gICAgICAgICAgICBNY1RyZWVOb2RlLm1vc3RSZWNlbnRUcmVlTm9kZS5kYXRhID0gbm9kZURhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU2V0IHVwIGEgc3Vic2NyaXB0aW9uIGZvciB0aGUgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gICAgcHJpdmF0ZSBvYnNlcnZlUmVuZGVyQ2hhbmdlcygpIHtcbiAgICAgICAgbGV0IGRhdGFTdHJlYW06IE9ic2VydmFibGU8VFtdIHwgUmVhZG9ubHlBcnJheTxUPj4gfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gQ2Fubm90IHVzZSBgaW5zdGFuY2VvZiBEYXRhU291cmNlYCBzaW5jZSB0aGUgZGF0YSBzb3VyY2UgY291bGQgYmUgYSBsaXRlcmFsIHdpdGhcbiAgICAgICAgLy8gYGNvbm5lY3RgIGZ1bmN0aW9uIGFuZCBtYXkgbm90IGV4dGVuZHMgRGF0YVNvdXJjZS5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuX2RhdGFTb3VyY2UgYXMgRGF0YVNvdXJjZTxUPikuY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZGF0YVN0cmVhbSA9ICh0aGlzLl9kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmNvbm5lY3QodGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YVNvdXJjZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgICAgIGRhdGFTdHJlYW0gPSB0aGlzLl9kYXRhU291cmNlO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fZGF0YVNvdXJjZSkpIHtcbiAgICAgICAgICAgIGRhdGFTdHJlYW0gPSBvYnNlcnZhYmxlT2YodGhpcy5fZGF0YVNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YVN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhU3Vic2NyaXB0aW9uID0gZGF0YVN0cmVhbVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm9uRGVzdHJveSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5yZW5kZXJOb2RlQ2hhbmdlcyhkYXRhKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRUcmVlTm9WYWxpZERhdGFTb3VyY2VFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoIHRvIHRoZSBwcm92aWRlZCBkYXRhIHNvdXJjZSBieSByZXNldHRpbmcgdGhlIGRhdGEgYW5kIHVuc3Vic2NyaWJpbmcgZnJvbSB0aGUgY3VycmVudFxuICAgICAqIHJlbmRlciBjaGFuZ2Ugc3Vic2NyaXB0aW9uIGlmIG9uZSBleGlzdHMuIElmIHRoZSBkYXRhIHNvdXJjZSBpcyBudWxsLCBpbnRlcnByZXQgdGhpcyBieVxuICAgICAqIGNsZWFyaW5nIHRoZSBub2RlIG91dGxldC4gT3RoZXJ3aXNlIHN0YXJ0IGxpc3RlbmluZyBmb3IgbmV3IGRhdGEuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2U6IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPFRbXT4gfCBUW10pIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmIHR5cGVvZiAodGhpcy5fZGF0YVNvdXJjZSBhcyBEYXRhU291cmNlPFQ+KS5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAodGhpcy5kYXRhU291cmNlIGFzIERhdGFTb3VyY2U8VD4pLmRpc2Nvbm5lY3QodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGFsbCBkYXRhTm9kZXMgaWYgdGhlcmUgaXMgbm93IG5vIGRhdGEgc291cmNlXG4gICAgICAgIGlmICghZGF0YVNvdXJjZSkgeyB0aGlzLm5vZGVPdXRsZXQudmlld0NvbnRhaW5lci5jbGVhcigpOyB9XG5cbiAgICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG5cbiAgICAgICAgaWYgKHRoaXMubm9kZURlZnMpIHsgdGhpcy5vYnNlcnZlUmVuZGVyQ2hhbmdlcygpOyB9XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1ub2RlJyxcbiAgICBleHBvcnRBczogJ21jVHJlZU5vZGUnXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGU8VD4gaW1wbGVtZW50cyBJRm9jdXNhYmxlT3B0aW9uLCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFRoZSBtb3N0IHJlY2VudGx5IGNyZWF0ZWQgYE1jVHJlZU5vZGVgLiBXZSBzYXZlIGl0IGluIHN0YXRpYyB2YXJpYWJsZSBzbyB3ZSBjYW4gcmV0cmlldmUgaXRcbiAgICAgKiBpbiBgTWNUcmVlYCBhbmQgc2V0IHRoZSBkYXRhIHRvIGl0LlxuICAgICAqL1xuICAgIHN0YXRpYyBtb3N0UmVjZW50VHJlZU5vZGU6IE1jVHJlZU5vZGU8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgZGF0YSgpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfVxuXG4gICAgc2V0IGRhdGEodmFsdWU6IFQpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RhdGE6IFQ7XG5cbiAgICBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGVkKHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IGxldmVsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwodGhpcy5fZGF0YSkgOiAwO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1jVHJlZUJhc2UpKSBwdWJsaWMgdHJlZTogTWNUcmVlQmFzZTxUPlxuICAgICkge1xuICAgICAgICBNY1RyZWVOb2RlLm1vc3RSZWNlbnRUcmVlTm9kZSA9IHRoaXM7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59XG4iXX0=
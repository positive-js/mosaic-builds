import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterContentChecked, ChangeDetectorRef, ElementRef, IterableDiffer, IterableDiffers, OnDestroy, OnInit, QueryList, ViewContainerRef, TrackByFunction } from '@angular/core';
import { IFocusableOption } from '@ptsecurity/cdk/a11y';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TreeControl } from './control/tree-control';
import { McTreeNodeDef } from './node';
import { McTreeNodeOutlet } from './outlet';
import * as i0 from "@angular/core";
export declare class McTreeBase<T> implements AfterContentChecked, CollectionViewer, OnDestroy, OnInit {
    protected differs: IterableDiffers;
    protected changeDetectorRef: ChangeDetectorRef;
    treeControl: TreeControl<T>;
    /**
     * Tracking function that will be used to check the differences in data changes. Used similarly
     * to `ngFor` `trackBy` function. Optimize node operations by identifying a node based on its data
     * relative to the function to know if a node should be added/removed/moved.
     * Accepts a function that takes two parameters, `index` and `item`.
     */
    trackBy: TrackByFunction<T>;
    nodeOutlet: McTreeNodeOutlet;
    /** The tree node template for the tree */
    nodeDefs: QueryList<McTreeNodeDef<T>>;
    /**
     * Stream containing the latest information on what rows are being displayed on screen.
     * Can be used by the data source to as a heuristic of what data should be provided.
     */
    viewChange: BehaviorSubject<{
        start: number;
        end: number;
    }>;
    /** Differ used to find the changes in the data provided by the data source. */
    protected dataDiffer: IterableDiffer<T>;
    /** Subject that emits when the component has been destroyed. */
    private onDestroy;
    /** Stores the node definition that does not have a when predicate. */
    private defaultNodeDef;
    /** Data subscription */
    private dataSubscription;
    /** Level of nodes */
    private levels;
    /**
     * Provides a stream containing the latest data array to render. Influenced by the tree's
     * stream of view window (what dataNodes are currently on screen).
     * Data source can be an observable of data array, or a dara array to render.
     */
    get dataSource(): DataSource<T> | Observable<T[]> | T[];
    set dataSource(dataSource: DataSource<T> | Observable<T[]> | T[]);
    private _dataSource;
    constructor(differs: IterableDiffers, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    /** Check for changes made in the data and render each change (node added/removed/moved). */
    renderNodeChanges(data: T[] | ReadonlyArray<T>, dataDiffer?: IterableDiffer<T>, viewContainer?: ViewContainerRef, parentData?: T): void;
    /**
     * Finds the matching node definition that should be used for this node data. If there is only
     * one node definition, it is returned. Otherwise, find the node definition that has a when
     * predicate that returns true with the data. If none return true, return the default node
     * definition.
     */
    getNodeDef(data: T, i: number): McTreeNodeDef<T>;
    /**
     * Create the embedded view for the data node template and place it in the correct index location
     * within the data node view container.
     */
    insertNode(nodeData: T, index: number, viewContainer?: ViewContainerRef, parentData?: T): void;
    /** Set up a subscription for the data provided by the data source. */
    private observeRenderChanges;
    /**
     * Switch to the provided data source by resetting the data and unsubscribing from the current
     * render change subscription if one exists. If the data source is null, interpret this by
     * clearing the node outlet. Otherwise start listening for new data.
     */
    private switchDataSource;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeBase<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTreeBase<any>, never, never, { "treeControl": "treeControl"; "trackBy": "trackBy"; "dataSource": "dataSource"; }, {}, ["nodeDefs"]>;
}
export declare class McTreeNode<T> implements IFocusableOption, OnDestroy {
    protected elementRef: ElementRef;
    tree: McTreeBase<T>;
    /**
     * The most recently created `McTreeNode`. We save it in static variable so we can retrieve it
     * in `McTree` and set the data to it.
     */
    static mostRecentTreeNode: McTreeNode<any> | null;
    protected destroyed: Subject<void>;
    get data(): T;
    set data(value: T);
    private _data;
    get isExpanded(): boolean;
    get level(): number;
    constructor(elementRef: ElementRef, tree: McTreeBase<T>);
    ngOnDestroy(): void;
    focus(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNode<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTreeNode<any>, "mc-tree-node", ["mcTreeNode"], {}, {}, never>;
}

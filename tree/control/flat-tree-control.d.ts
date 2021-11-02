import { BaseTreeControl } from './base-tree-control';
export declare function defaultCompareValues(firstValue: any, secondValue: any): boolean;
export declare function defaultCompareViewValues(firstViewValue: any, secondViewValue: any): boolean;
/** Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
export declare class FlatTreeControl<T> extends BaseTreeControl<T> {
    getLevel: (dataNode: T) => number;
    isExpandable: (dataNode: T) => boolean;
    /** getValue will be used to determine if the tree contains value or not. Used in method hasValue */
    getValue: (dataNode: any) => any;
    /** getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction */
    getViewValue: (dataNode: any) => string;
    /** compareValues will be used to comparing values. */
    compareValues: (firstValue: any, secondValue: any) => boolean;
    /** compareValues will be used to comparing values. */
    compareViewValues: (firstViewValue: any, secondViewValue: any) => boolean;
    expandedItemsBeforeFiltration: T[];
    /** Construct with flat tree data node functions getLevel, isExpandable, getValue and getViewValue. */
    constructor(getLevel: (dataNode: T) => number, isExpandable: (dataNode: T) => boolean, 
    /** getValue will be used to determine if the tree contains value or not. Used in method hasValue */
    getValue: (dataNode: any) => any, 
    /** getViewValue will be used for filter nodes. Returned value will be first argument in filterNodesFunction */
    getViewValue: (dataNode: any) => string, 
    /** compareValues will be used to comparing values. */
    compareValues?: (firstValue: any, secondValue: any) => boolean, 
    /** compareValues will be used to comparing values. */
    compareViewValues?: (firstViewValue: any, secondViewValue: any) => boolean);
    /**
     * Gets a list of the data node's subtree of descendent data nodes.
     *
     * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
     * with correct levels.
     */
    getDescendants(dataNode: T): T[];
    /**
     * Expands all data nodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
     * data nodes of the tree.
     */
    expandAll(): void;
    getParents(node: any, result: T[]): T[];
    hasValue(value: string): T | undefined;
    filterNodes(value: string): void;
    private expandDataNode;
    private saveExpansionState;
    private restoreExpansionState;
    private hasFilteredDescendant;
}

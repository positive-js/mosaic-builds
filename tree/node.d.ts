import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/** Context provided to the tree node component. */
export declare class McTreeNodeOutletContext<T> {
    /** Data for the node. */
    $implicit: T;
    /** Depth of the node. */
    level: number;
    /** Index location of the node. */
    index?: number;
    /** Length of the number of total dataNodes. */
    count?: number;
    constructor(data: T);
}
/**
 * Data node definition for the McTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
export declare class McTreeNodeDef<T> {
    template: TemplateRef<any>;
    data: T;
    /**
     * Function that should return true if this node template should be used for the provided node
     * data and index. If left undefined, this node will be considered the default node template to
     * use when no other when functions return true for the data.
     * For every node, there must be at least one when function that passes or an undefined to
     * default.
     */
    when: (index: number, nodeData: T) => boolean;
    /** @docs-private */
    constructor(template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodeDef<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTreeNodeDef<any>, "[mcTreeNodeDef]", never, { "when": "mcTreeNodeDefWhen"; "data": "mcTreeNode"; }, {}, never>;
}

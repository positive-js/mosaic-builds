import { CanDisable, CanDisableCtor } from '../common-behaviors/index';
import * as i0 from "@angular/core";
/** @docs-private */
export declare class McOptgroupBase {
}
export declare const McOptgroupMixinBase: CanDisableCtor & typeof McOptgroupBase;
/**
 * Component that is used to group instances of `mc-option`.
 */
export declare class McOptgroup extends McOptgroupMixinBase implements CanDisable {
    label: string;
    /** Unique id for the underlying label. */
    labelId: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<McOptgroup, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McOptgroup, "mc-optgroup", ["mcOptgroup"], { "disabled": "disabled"; "label": "label"; }, {}, never, ["mc-option, mc-list-option, ng-container"]>;
}

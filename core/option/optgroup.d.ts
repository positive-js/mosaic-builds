import { CanDisable, CanDisableCtor } from '../common-behaviors/index';
/** @docs-private */
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<McOptgroup, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<McOptgroup, "mc-optgroup", ["mcOptgroup"], { "disabled": "disabled"; "label": "label"; }, {}, never, ["mc-option, mc-list-option, ng-container"]>;
}

//# sourceMappingURL=optgroup.d.ts.map
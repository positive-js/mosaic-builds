import { CanDisable, CanDisableCtor } from '../common-behaviors/index';
/** @docs-private */
export declare class McOptgroupBase {
}
export declare const _McOptgroupMixinBase: CanDisableCtor & typeof McOptgroupBase;
/**
 * Component that is used to group instances of `mc-option`.
 */
export declare class McOptgroup extends _McOptgroupMixinBase implements CanDisable {
    /** Label for the option group. */
    label: string;
    /** Unique id for the underlying label. */
    _labelId: string;
}

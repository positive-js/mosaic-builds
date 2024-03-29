import * as i0 from "@angular/core";
export declare type McPseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `mc-primary .mc-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<mc-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
export declare class McPseudoCheckbox {
    state: McPseudoCheckboxState;
    disabled: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<McPseudoCheckbox, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McPseudoCheckbox, "mc-pseudo-checkbox", never, { "state": "state"; "disabled": "disabled"; }, {}, never, never>;
}

import { ElementRef } from '@angular/core';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
/** @docs-private */
export declare class McTabLabelWrapperBase {
}
export declare const McTabLabelWrapperMixinBase: CanDisableCtor & typeof McTabLabelWrapperBase;
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * @docs-private
 */
export declare class McTabLabelWrapper extends McTabLabelWrapperMixinBase implements CanDisable {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
    /** Sets focus on the wrapper element */
    focus(): void;
    getOffsetLeft(): number;
    getOffsetWidth(): number;
}

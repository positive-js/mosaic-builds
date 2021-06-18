import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
/** @docs-private */
export declare class McTabLabelWrapperBase {
}
export declare const McTabLabelWrapperMixinBase: CanDisableCtor & typeof McTabLabelWrapperBase;
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * @docs-private
 */
export declare class McTabLabelWrapper extends McTabLabelWrapperMixinBase implements CanDisable, AfterViewInit {
    elementRef: ElementRef;
    private renderer;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    /** Sets focus on the wrapper element */
    focus(): void;
    getOffsetLeft(): number;
    getOffsetWidth(): number;
    private addClassModifierForIcons;
}

import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { McTab } from './tab.component';
import * as i0 from "@angular/core";
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
    labelContent: ElementRef;
    tab: McTab;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    /** Sets focus on the wrapper element */
    focus(): void;
    getOffsetLeft(): number;
    getOffsetWidth(): number;
    checkOverflow(): void;
    isOverflown(): boolean;
    getInnerText(): any;
    private addClassModifierForIcons;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTabLabelWrapper, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTabLabelWrapper, "[mcTabLabelWrapper]", never, { "disabled": "disabled"; "tab": "tab"; }, {}, ["labelContent"]>;
}

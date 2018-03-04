import { AfterContentInit, ElementRef, QueryList } from '@angular/core';
import { McLine } from '@ptsecurity/mosaic/core';
export declare class McListBase {
}
export declare class McList extends McListBase {
}
/**
 * Directive whose purpose is to add the mc- CSS styling to this selector.
 * @docs-private
 */
export declare class McListSubheaderCssStyler {
}
export declare class McListItemBase {
}
export declare class McListItem extends McListItemBase implements AfterContentInit {
    private _element;
    _lines: QueryList<McLine>;
    private _lineSetter;
    constructor(_element: ElementRef);
    ngAfterContentInit(): void;
    _handleFocus(): void;
    _handleBlur(): void;
    _getHostElement(): HTMLElement;
}

import { ElementRef } from '@angular/core';
/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
export declare class McAutocompleteOrigin {
    elementRef: ElementRef<HTMLElement>;
    constructor(elementRef: ElementRef<HTMLElement>);
}

import { Directive, ElementRef } from '@angular/core';
/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
export class McAutocompleteOrigin {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
McAutocompleteOrigin.decorators = [
    { type: Directive, args: [{
                selector: '[mcAutocompleteOrigin]',
                exportAs: 'mcAutocompleteOrigin'
            },] }
];
/** @nocollapse */
McAutocompleteOrigin.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLW9yaWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS1vcmlnaW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3REOzs7R0FHRztBQUtILE1BQU0sT0FBTyxvQkFBb0I7SUFDN0IsWUFBbUIsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7SUFBRyxDQUFDOzs7WUFMN0QsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRSxzQkFBc0I7YUFDbkM7Ozs7WUFWbUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogRGlyZWN0aXZlIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB0byBtYWtlIGl0IHVzYWJsZVxuICogYXMgYSBjb25uZWN0aW9uIHBvaW50IGZvciBhbiBhdXRvY29tcGxldGUgcGFuZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jQXV0b2NvbXBsZXRlT3JpZ2luXScsXG4gICAgZXhwb3J0QXM6ICdtY0F1dG9jb21wbGV0ZU9yaWdpbidcbn0pXG5leHBvcnQgY2xhc3MgTWNBdXRvY29tcGxldGVPcmlnaW4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cbn1cbiJdfQ==
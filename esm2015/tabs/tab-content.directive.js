import { Directive, TemplateRef } from '@angular/core';
/** Decorates the `ng-template` tags and reads out the template from it. */
export class McTabContent {
    constructor(template) {
        this.template = template;
    }
}
McTabContent.decorators = [
    { type: Directive, args: [{ selector: '[mcTabContent]' },] }
];
/** @nocollapse */
McTabContent.ctorParameters = () => [
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhYnMvdGFiLWNvbnRlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZELDJFQUEyRTtBQUUzRSxNQUFNLE9BQU8sWUFBWTtJQUNyQixZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7OztZQUZwRCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7Ozs7WUFKckIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKiogRGVjb3JhdGVzIHRoZSBgbmctdGVtcGxhdGVgIHRhZ3MgYW5kIHJlYWRzIG91dCB0aGUgdGVtcGxhdGUgZnJvbSBpdC4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1ttY1RhYkNvbnRlbnRdJyB9KVxuZXhwb3J0IGNsYXNzIE1jVGFiQ29udGVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuIl19
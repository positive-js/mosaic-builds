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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWItY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RCwyRUFBMkU7QUFFM0UsTUFBTSxPQUFPLFlBQVk7SUFDckIsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDOzs7WUFGcEQsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFOzs7O1lBSnJCLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqIERlY29yYXRlcyB0aGUgYG5nLXRlbXBsYXRlYCB0YWdzIGFuZCByZWFkcyBvdXQgdGhlIHRlbXBsYXRlIGZyb20gaXQuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbWNUYWJDb250ZW50XScgfSlcbmV4cG9ydCBjbGFzcyBNY1RhYkNvbnRlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiJdfQ==
import { CdkPortal } from '@angular/cdk/portal';
import { Directive, InjectionToken } from '@angular/core';
export const MC_TAB_LABEL = new InjectionToken('McTabLabel');
/** Used to flag tab labels for use with the portal directive */
export class McTabLabel extends CdkPortal {
}
McTabLabel.decorators = [
    { type: Directive, args: [{
                selector: '[mc-tab-label], [mcTabLabel]',
                providers: [{ provide: MC_TAB_LABEL, useExisting: McTabLabel }]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWJzL3RhYi1sYWJlbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBYSxZQUFZLENBQUMsQ0FBQztBQUV6RSxnRUFBZ0U7QUFLaEUsTUFBTSxPQUFPLFVBQVcsU0FBUSxTQUFTOzs7WUFKeEMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUM7YUFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5leHBvcnQgY29uc3QgTUNfVEFCX0xBQkVMID0gbmV3IEluamVjdGlvblRva2VuPE1jVGFiTGFiZWw+KCdNY1RhYkxhYmVsJyk7XG5cbi8qKiBVc2VkIHRvIGZsYWcgdGFiIGxhYmVscyBmb3IgdXNlIHdpdGggdGhlIHBvcnRhbCBkaXJlY3RpdmUgKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLXRhYi1sYWJlbF0sIFttY1RhYkxhYmVsXScsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNQ19UQUJfTEFCRUwsIHVzZUV4aXN0aW5nOiBNY1RhYkxhYmVsIH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiTGFiZWwgZXh0ZW5kcyBDZGtQb3J0YWwge31cbiJdfQ==
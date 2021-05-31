import { Component, Directive, ElementRef, Input, Optional } from '@angular/core';
import { McSidepanelRef } from './sidepanel-ref';
import { McSidepanelService } from './sidepanel.service';
/**
 * Button that will close the current sidepanel.
 */
export class McSidepanelClose {
    constructor(sidepanelRef, elementRef, sidepanelService) {
        this.sidepanelRef = sidepanelRef;
        this.elementRef = elementRef;
        this.sidepanelService = sidepanelService;
    }
    ngOnInit() {
        if (!this.sidepanelRef) {
            // When this directive is included in a sidepanel via TemplateRef (rather than being
            // in a Component), the SidepanelRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the SidepanelRef by
            // ID.
            // This must occur in `onInit`, as the ID binding for the sidepanel container won't
            // be resolved at constructor time. We use setTimeout by same reason.
            setTimeout(() => {
                this.sidepanelRef = getClosestSidepanel(this.elementRef, this.sidepanelService.openedSidepanels);
            });
        }
    }
    ngOnChanges(changes) {
        const proxiedChange = changes.mcSidepanelClose || changes.sidepanelResult;
        if (proxiedChange) {
            this.sidepanelResult = proxiedChange.currentValue;
        }
    }
}
McSidepanelClose.decorators = [
    { type: Directive, args: [{
                selector: 'button[mc-sidepanel-close], button[mcSidepanelClose]',
                host: {
                    '(click)': 'sidepanelRef.close(sidepanelResult)',
                    class: 'mc-sidepanel-close'
                }
            },] }
];
/** @nocollapse */
McSidepanelClose.ctorParameters = () => [
    { type: McSidepanelRef, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: McSidepanelService }
];
McSidepanelClose.propDecorators = {
    sidepanelResult: [{ type: Input, args: ['mc-sidepanel-close',] }],
    mcSidepanelClose: [{ type: Input, args: ['mcSidepanelClose',] }]
};
/**
 * Header of a sidepanel.
 */
export class McSidepanelHeader {
}
McSidepanelHeader.decorators = [
    { type: Component, args: [{
                selector: 'mc-sidepanel-header',
                template: `
        <div class="mc-sidepanel-title">
            <ng-content></ng-content>
        </div>
        <button *ngIf="closeable" mc-sidepanel-close>
            <span class="mc-sidepanel-close-x">
                <i mc-icon="mc-close-L_16" class="mc-icon mc-icon_light" [color]="'second'"></i>
            </span>
        </button>
    `,
                host: {
                    class: 'mc-sidepanel-header'
                }
            },] }
];
McSidepanelHeader.propDecorators = {
    closeable: [{ type: Input }]
};
/**
 * Scrollable content container of a sidepanel.
 */
export class McSidepanelBody {
}
McSidepanelBody.decorators = [
    { type: Directive, args: [{
                selector: 'mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody',
                host: {
                    class: 'mc-sidepanel-body'
                }
            },] }
];
/**
 * Footer of a sidepanel.
 */
export class McSidepanelFooter {
}
McSidepanelFooter.decorators = [
    { type: Directive, args: [{
                selector: 'mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter',
                host: {
                    class: 'mc-sidepanel-footer'
                }
            },] }
];
/**
 * Actions block of a sidepanel footer.
 */
export class McSidepanelActions {
}
McSidepanelActions.decorators = [
    { type: Directive, args: [{
                selector: 'mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions',
                host: {
                    class: 'mc-sidepanel-actions'
                }
            },] }
];
/**
 * Finds the closest McSidepanelRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a sidepanel.
 * @param openSidepanels References to the currently-open sidepanels.
 */
function getClosestSidepanel(element, openSidepanels) {
    let parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mc-sidepanel-container')) {
        parent = parent.parentElement;
    }
    return parent ? openSidepanels.find((sidepanel) => sidepanel.id === parent.id) : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFFBQVEsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3pEOztHQUVHO0FBUUgsTUFBTSxPQUFPLGdCQUFnQjtJQUt6QixZQUN1QixZQUE0QixFQUN2QyxVQUFtQyxFQUNuQyxnQkFBb0M7UUFGekIsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQ3ZDLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7SUFDN0MsQ0FBQztJQUVKLFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixvRkFBb0Y7WUFDcEYsbUZBQW1GO1lBQ25GLG1GQUFtRjtZQUNuRixNQUFNO1lBQ04sbUZBQW1GO1lBQ25GLHFFQUFxRTtZQUNyRSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztZQUN0RyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUUxRSxJQUFJLGFBQWEsRUFBRTtZQUNmLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQztTQUNyRDtJQUNMLENBQUM7OztZQXRDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNEQUFzRDtnQkFDaEUsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSxxQ0FBcUM7b0JBQ2hELEtBQUssRUFBRSxvQkFBb0I7aUJBQzlCO2FBQ0o7Ozs7WUFiUSxjQUFjLHVCQW9CZCxRQUFRO1lBdEJjLFVBQVU7WUFHaEMsa0JBQWtCOzs7OEJBY3RCLEtBQUssU0FBQyxvQkFBb0I7K0JBRTFCLEtBQUssU0FBQyxrQkFBa0I7O0FBK0I3Qjs7R0FFRztBQWlCSCxNQUFNLE9BQU8saUJBQWlCOzs7WUFoQjdCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7OztLQVNUO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUscUJBQXFCO2lCQUMvQjthQUNKOzs7d0JBRUksS0FBSzs7QUFHVjs7R0FFRztBQU9ILE1BQU0sT0FBTyxlQUFlOzs7WUFOM0IsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5REFBeUQ7Z0JBQ25FLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsbUJBQW1CO2lCQUM3QjthQUNKOztBQUdEOztHQUVHO0FBT0gsTUFBTSxPQUFPLGlCQUFpQjs7O1lBTjdCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsK0RBQStEO2dCQUN6RSxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjtpQkFDL0I7YUFDSjs7QUFHRDs7R0FFRztBQU9ILE1BQU0sT0FBTyxrQkFBa0I7OztZQU45QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtFQUFrRTtnQkFDNUUsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxzQkFBc0I7aUJBQ2hDO2FBQ0o7O0FBR0Q7Ozs7R0FJRztBQUNILFNBQVMsbUJBQW1CLENBQUMsT0FBZ0MsRUFBRSxjQUFnQztJQUMzRixJQUFJLE1BQU0sR0FBdUIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFFckUsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1FBQ25FLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQ2pDO0lBRUQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssTUFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDM0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE9wdGlvbmFsLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1jU2lkZXBhbmVsUmVmIH0gZnJvbSAnLi9zaWRlcGFuZWwtcmVmJztcbmltcG9ydCB7IE1jU2lkZXBhbmVsU2VydmljZSB9IGZyb20gJy4vc2lkZXBhbmVsLnNlcnZpY2UnO1xuXG5cbi8qKlxuICogQnV0dG9uIHRoYXQgd2lsbCBjbG9zZSB0aGUgY3VycmVudCBzaWRlcGFuZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYnV0dG9uW21jLXNpZGVwYW5lbC1jbG9zZV0sIGJ1dHRvblttY1NpZGVwYW5lbENsb3NlXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGNsaWNrKSc6ICdzaWRlcGFuZWxSZWYuY2xvc2Uoc2lkZXBhbmVsUmVzdWx0KScsXG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWNsb3NlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxDbG9zZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoJ21jLXNpZGVwYW5lbC1jbG9zZScpIHNpZGVwYW5lbFJlc3VsdDogYW55O1xuXG4gICAgQElucHV0KCdtY1NpZGVwYW5lbENsb3NlJykgbWNTaWRlcGFuZWxDbG9zZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBzaWRlcGFuZWxSZWY6IE1jU2lkZXBhbmVsUmVmLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHNpZGVwYW5lbFNlcnZpY2U6IE1jU2lkZXBhbmVsU2VydmljZVxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc2lkZXBhbmVsUmVmKSB7XG4gICAgICAgICAgICAvLyBXaGVuIHRoaXMgZGlyZWN0aXZlIGlzIGluY2x1ZGVkIGluIGEgc2lkZXBhbmVsIHZpYSBUZW1wbGF0ZVJlZiAocmF0aGVyIHRoYW4gYmVpbmdcbiAgICAgICAgICAgIC8vIGluIGEgQ29tcG9uZW50KSwgdGhlIFNpZGVwYW5lbFJlZiBpc24ndCBhdmFpbGFibGUgdmlhIGluamVjdGlvbiBiZWNhdXNlIGVtYmVkZGVkXG4gICAgICAgICAgICAvLyB2aWV3cyBjYW5ub3QgYmUgZ2l2ZW4gYSBjdXN0b20gaW5qZWN0b3IuIEluc3RlYWQsIHdlIGxvb2sgdXAgdGhlIFNpZGVwYW5lbFJlZiBieVxuICAgICAgICAgICAgLy8gSUQuXG4gICAgICAgICAgICAvLyBUaGlzIG11c3Qgb2NjdXIgaW4gYG9uSW5pdGAsIGFzIHRoZSBJRCBiaW5kaW5nIGZvciB0aGUgc2lkZXBhbmVsIGNvbnRhaW5lciB3b24ndFxuICAgICAgICAgICAgLy8gYmUgcmVzb2x2ZWQgYXQgY29uc3RydWN0b3IgdGltZS4gV2UgdXNlIHNldFRpbWVvdXQgYnkgc2FtZSByZWFzb24uXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGVwYW5lbFJlZiA9IGdldENsb3Nlc3RTaWRlcGFuZWwodGhpcy5lbGVtZW50UmVmLCB0aGlzLnNpZGVwYW5lbFNlcnZpY2Uub3BlbmVkU2lkZXBhbmVscykhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHByb3hpZWRDaGFuZ2UgPSBjaGFuZ2VzLm1jU2lkZXBhbmVsQ2xvc2UgfHwgY2hhbmdlcy5zaWRlcGFuZWxSZXN1bHQ7XG5cbiAgICAgICAgaWYgKHByb3hpZWRDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2lkZXBhbmVsUmVzdWx0ID0gcHJveGllZENoYW5nZS5jdXJyZW50VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogSGVhZGVyIG9mIGEgc2lkZXBhbmVsLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXNpZGVwYW5lbC1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy1zaWRlcGFuZWwtdGl0bGVcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJjbG9zZWFibGVcIiBtYy1zaWRlcGFuZWwtY2xvc2U+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1jLXNpZGVwYW5lbC1jbG9zZS14XCI+XG4gICAgICAgICAgICAgICAgPGkgbWMtaWNvbj1cIm1jLWNsb3NlLUxfMTZcIiBjbGFzcz1cIm1jLWljb24gbWMtaWNvbl9saWdodFwiIFtjb2xvcl09XCInc2Vjb25kJ1wiPjwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWhlYWRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsSGVhZGVyIHtcbiAgICBASW5wdXQoKSBjbG9zZWFibGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogU2Nyb2xsYWJsZSBjb250ZW50IGNvbnRhaW5lciBvZiBhIHNpZGVwYW5lbC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtYm9keSwgW21jLXNpZGVwYW5lbC1ib2R5XSwgbWNTaWRlcGFuZWxCb2R5JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWJvZHknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbEJvZHkge31cblxuLyoqXG4gKiBGb290ZXIgb2YgYSBzaWRlcGFuZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2lkZXBhbmVsLWZvb3RlciwgW21jLXNpZGVwYW5lbC1mb290ZXJdLCBtY1NpZGVwYW5lbEZvb3RlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1mb290ZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbEZvb3RlciB7fVxuXG4vKipcbiAqIEFjdGlvbnMgYmxvY2sgb2YgYSBzaWRlcGFuZWwgZm9vdGVyLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXNpZGVwYW5lbC1hY3Rpb25zLCBbbWMtc2lkZXBhbmVsLWFjdGlvbnNdLCBtY1NpZGVwYW5lbEFjdGlvbnMnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlcGFuZWwtYWN0aW9ucydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsQWN0aW9ucyB7fVxuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IE1jU2lkZXBhbmVsUmVmIHRvIGFuIGVsZW1lbnQgYnkgbG9va2luZyBhdCB0aGUgRE9NLlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCByZWxhdGl2ZSB0byB3aGljaCB0byBsb29rIGZvciBhIHNpZGVwYW5lbC5cbiAqIEBwYXJhbSBvcGVuU2lkZXBhbmVscyBSZWZlcmVuY2VzIHRvIHRoZSBjdXJyZW50bHktb3BlbiBzaWRlcGFuZWxzLlxuICovXG5mdW5jdGlvbiBnZXRDbG9zZXN0U2lkZXBhbmVsKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBvcGVuU2lkZXBhbmVsczogTWNTaWRlcGFuZWxSZWZbXSkge1xuICAgIGxldCBwYXJlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKHBhcmVudCAmJiAhcGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnbWMtc2lkZXBhbmVsLWNvbnRhaW5lcicpKSB7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQgPyBvcGVuU2lkZXBhbmVscy5maW5kKChzaWRlcGFuZWwpID0+IHNpZGVwYW5lbC5pZCA9PT0gcGFyZW50IS5pZCkgOiBudWxsO1xufVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Directive, ElementRef, Input, Optional } from '@angular/core';
import { McSidepanelRef } from './sidepanel-ref';
import { McSidepanelService } from './sidepanel.service';
/**
 * Button that will close the current sidepanel.
 */
export class McSidepanelClose {
    /**
     * @param {?} sidepanelRef
     * @param {?} elementRef
     * @param {?} sidepanelService
     */
    constructor(sidepanelRef, elementRef, sidepanelService) {
        this.sidepanelRef = sidepanelRef;
        this.elementRef = elementRef;
        this.sidepanelService = sidepanelService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.sidepanelRef) {
            // When this directive is included in a sidepanel via TemplateRef (rather than being
            // in a Component), the SidepanelRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the SidepanelRef by
            // ID.
            // This must occur in `onInit`, as the ID binding for the sidepanel container won't
            // be resolved at constructor time. We use setTimeout by same reason.
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.sidepanelRef = (/** @type {?} */ (getClosestSidepanel(this.elementRef, this.sidepanelService.openedSidepanels)));
            }));
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
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
if (false) {
    /** @type {?} */
    McSidepanelClose.prototype.sidepanelResult;
    /** @type {?} */
    McSidepanelClose.prototype.mcSidepanelClose;
    /** @type {?} */
    McSidepanelClose.prototype.sidepanelRef;
    /**
     * @type {?}
     * @private
     */
    McSidepanelClose.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McSidepanelClose.prototype.sidepanelService;
}
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
                <i mc-icon="mc-close-L_16" class="mc-icon mc-icon_light" color="second"></i>
            </span>
        </button>
    `,
                host: {
                    class: 'mc-sidepanel-header'
                }
            }] }
];
McSidepanelHeader.propDecorators = {
    closeable: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McSidepanelHeader.prototype.closeable;
}
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
 * @param {?} element Element relative to which to look for a sidepanel.
 * @param {?} openSidepanels References to the currently-open sidepanels.
 * @return {?}
 */
function getClosestSidepanel(element, openSidepanels) {
    /** @type {?} */
    let parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mc-sidepanel-container')) {
        parent = parent.parentElement;
    }
    return parent ? openSidepanels.find((/**
     * @param {?} sidepanel
     * @return {?}
     */
    (sidepanel) => sidepanel.id === (/** @type {?} */ (parent)).id)) : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9zaWRlcGFuZWwvIiwic291cmNlcyI6WyJzaWRlcGFuZWwtZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFFBQVEsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBYXpELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7OztJQUt6QixZQUN1QixZQUE0QixFQUN2QyxVQUFtQyxFQUNuQyxnQkFBb0M7UUFGekIsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQ3ZDLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7SUFDN0MsQ0FBQzs7OztJQUVKLFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixvRkFBb0Y7WUFDcEYsbUZBQW1GO1lBQ25GLG1GQUFtRjtZQUNuRixNQUFNO1lBQ04sbUZBQW1GO1lBQ25GLHFFQUFxRTtZQUNyRSxVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBQSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLENBQUM7WUFDdEcsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCOztjQUN4QixhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxlQUFlO1FBRXpFLElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQzs7O1lBdENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0RBQXNEO2dCQUNoRSxJQUFJLEVBQUU7b0JBQ0YsU0FBUyxFQUFFLHFDQUFxQztvQkFDaEQsS0FBSyxFQUFFLG9CQUFvQjtpQkFDOUI7YUFDSjs7OztZQWJRLGNBQWMsdUJBb0JkLFFBQVE7WUF0QmMsVUFBVTtZQUdoQyxrQkFBa0I7Ozs4QkFjdEIsS0FBSyxTQUFDLG9CQUFvQjsrQkFFMUIsS0FBSyxTQUFDLGtCQUFrQjs7OztJQUZ6QiwyQ0FBa0Q7O0lBRWxELDRDQUFpRDs7SUFHN0Msd0NBQStDOzs7OztJQUMvQyxzQ0FBMkM7Ozs7O0lBQzNDLDRDQUE0Qzs7Ozs7QUE2Q3BELE1BQU0sT0FBTyxpQkFBaUI7OztZQWhCN0IsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7O0tBU1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxxQkFBcUI7aUJBQy9CO2FBQ0o7Ozt3QkFFSSxLQUFLOzs7O0lBQU4sc0NBQTRCOzs7OztBQVloQyxNQUFNLE9BQU8sZUFBZTs7O1lBTjNCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseURBQXlEO2dCQUNuRSxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLG1CQUFtQjtpQkFDN0I7YUFDSjs7Ozs7QUFZRCxNQUFNLE9BQU8saUJBQWlCOzs7WUFON0IsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrREFBK0Q7Z0JBQ3pFLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUscUJBQXFCO2lCQUMvQjthQUNKOzs7OztBQVlELE1BQU0sT0FBTyxrQkFBa0I7OztZQU45QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtFQUFrRTtnQkFDNUUsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxzQkFBc0I7aUJBQ2hDO2FBQ0o7Ozs7Ozs7O0FBUUQsU0FBUyxtQkFBbUIsQ0FBQyxPQUFnQyxFQUFFLGNBQWdDOztRQUN2RixNQUFNLEdBQXVCLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYTtJQUVwRSxPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDbkUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7S0FDakM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUk7Ozs7SUFBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxtQkFBQSxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPcHRpb25hbCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1NpZGVwYW5lbFJlZiB9IGZyb20gJy4vc2lkZXBhbmVsLXJlZic7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbFNlcnZpY2UgfSBmcm9tICcuL3NpZGVwYW5lbC5zZXJ2aWNlJztcblxuXG4vKipcbiAqIEJ1dHRvbiB0aGF0IHdpbGwgY2xvc2UgdGhlIGN1cnJlbnQgc2lkZXBhbmVsLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2J1dHRvblttYy1zaWRlcGFuZWwtY2xvc2VdLCBidXR0b25bbWNTaWRlcGFuZWxDbG9zZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhjbGljayknOiAnc2lkZXBhbmVsUmVmLmNsb3NlKHNpZGVwYW5lbFJlc3VsdCknLFxuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1jbG9zZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsQ2xvc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCdtYy1zaWRlcGFuZWwtY2xvc2UnKSBzaWRlcGFuZWxSZXN1bHQ6IGFueTtcblxuICAgIEBJbnB1dCgnbWNTaWRlcGFuZWxDbG9zZScpIG1jU2lkZXBhbmVsQ2xvc2U6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBzaWRlcGFuZWxTZXJ2aWNlOiBNY1NpZGVwYW5lbFNlcnZpY2VcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNpZGVwYW5lbFJlZikge1xuICAgICAgICAgICAgLy8gV2hlbiB0aGlzIGRpcmVjdGl2ZSBpcyBpbmNsdWRlZCBpbiBhIHNpZGVwYW5lbCB2aWEgVGVtcGxhdGVSZWYgKHJhdGhlciB0aGFuIGJlaW5nXG4gICAgICAgICAgICAvLyBpbiBhIENvbXBvbmVudCksIHRoZSBTaWRlcGFuZWxSZWYgaXNuJ3QgYXZhaWxhYmxlIHZpYSBpbmplY3Rpb24gYmVjYXVzZSBlbWJlZGRlZFxuICAgICAgICAgICAgLy8gdmlld3MgY2Fubm90IGJlIGdpdmVuIGEgY3VzdG9tIGluamVjdG9yLiBJbnN0ZWFkLCB3ZSBsb29rIHVwIHRoZSBTaWRlcGFuZWxSZWYgYnlcbiAgICAgICAgICAgIC8vIElELlxuICAgICAgICAgICAgLy8gVGhpcyBtdXN0IG9jY3VyIGluIGBvbkluaXRgLCBhcyB0aGUgSUQgYmluZGluZyBmb3IgdGhlIHNpZGVwYW5lbCBjb250YWluZXIgd29uJ3RcbiAgICAgICAgICAgIC8vIGJlIHJlc29sdmVkIGF0IGNvbnN0cnVjdG9yIHRpbWUuIFdlIHVzZSBzZXRUaW1lb3V0IGJ5IHNhbWUgcmVhc29uLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlcGFuZWxSZWYgPSBnZXRDbG9zZXN0U2lkZXBhbmVsKHRoaXMuZWxlbWVudFJlZiwgdGhpcy5zaWRlcGFuZWxTZXJ2aWNlLm9wZW5lZFNpZGVwYW5lbHMpITtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBjb25zdCBwcm94aWVkQ2hhbmdlID0gY2hhbmdlcy5tY1NpZGVwYW5lbENsb3NlIHx8IGNoYW5nZXMuc2lkZXBhbmVsUmVzdWx0O1xuXG4gICAgICAgIGlmIChwcm94aWVkQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnNpZGVwYW5lbFJlc3VsdCA9IHByb3hpZWRDaGFuZ2UuY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEhlYWRlciBvZiBhIHNpZGVwYW5lbC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtc2lkZXBhbmVsLXRpdGxlXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY2xvc2VhYmxlXCIgbWMtc2lkZXBhbmVsLWNsb3NlPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYy1zaWRlcGFuZWwtY2xvc2UteFwiPlxuICAgICAgICAgICAgICAgIDxpIG1jLWljb249XCJtYy1jbG9zZS1MXzE2XCIgY2xhc3M9XCJtYy1pY29uIG1jLWljb25fbGlnaHRcIiBjb2xvcj1cInNlY29uZFwiPjwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWhlYWRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsSGVhZGVyIHtcbiAgICBASW5wdXQoKSBjbG9zZWFibGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogU2Nyb2xsYWJsZSBjb250ZW50IGNvbnRhaW5lciBvZiBhIHNpZGVwYW5lbC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtYm9keSwgW21jLXNpZGVwYW5lbC1ib2R5XSwgbWNTaWRlcGFuZWxCb2R5JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWJvZHknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbEJvZHkge31cblxuLyoqXG4gKiBGb290ZXIgb2YgYSBzaWRlcGFuZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2lkZXBhbmVsLWZvb3RlciwgW21jLXNpZGVwYW5lbC1mb290ZXJdLCBtY1NpZGVwYW5lbEZvb3RlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1mb290ZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbEZvb3RlciB7fVxuXG4vKipcbiAqIEFjdGlvbnMgYmxvY2sgb2YgYSBzaWRlcGFuZWwgZm9vdGVyLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXNpZGVwYW5lbC1hY3Rpb25zLCBbbWMtc2lkZXBhbmVsLWFjdGlvbnNdLCBtY1NpZGVwYW5lbEFjdGlvbnMnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlcGFuZWwtYWN0aW9ucydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsQWN0aW9ucyB7fVxuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IE1jU2lkZXBhbmVsUmVmIHRvIGFuIGVsZW1lbnQgYnkgbG9va2luZyBhdCB0aGUgRE9NLlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCByZWxhdGl2ZSB0byB3aGljaCB0byBsb29rIGZvciBhIHNpZGVwYW5lbC5cbiAqIEBwYXJhbSBvcGVuU2lkZXBhbmVscyBSZWZlcmVuY2VzIHRvIHRoZSBjdXJyZW50bHktb3BlbiBzaWRlcGFuZWxzLlxuICovXG5mdW5jdGlvbiBnZXRDbG9zZXN0U2lkZXBhbmVsKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBvcGVuU2lkZXBhbmVsczogTWNTaWRlcGFuZWxSZWZbXSkge1xuICAgIGxldCBwYXJlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKHBhcmVudCAmJiAhcGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnbWMtc2lkZXBhbmVsLWNvbnRhaW5lcicpKSB7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQgPyBvcGVuU2lkZXBhbmVscy5maW5kKChzaWRlcGFuZWwpID0+IHNpZGVwYW5lbC5pZCA9PT0gcGFyZW50IS5pZCkgOiBudWxsO1xufVxuIl19
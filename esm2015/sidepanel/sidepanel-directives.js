/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvc2lkZXBhbmVsLyIsInNvdXJjZXMiOlsic2lkZXBhbmVsLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQWF6RCxNQUFNLE9BQU8sZ0JBQWdCOzs7Ozs7SUFLekIsWUFDdUIsWUFBNEIsRUFDdkMsVUFBbUMsRUFDbkMsZ0JBQW9DO1FBRnpCLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUN2QyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO0lBQzdDLENBQUM7Ozs7SUFFSixRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsb0ZBQW9GO1lBQ3BGLG1GQUFtRjtZQUNuRixtRkFBbUY7WUFDbkYsTUFBTTtZQUNOLG1GQUFtRjtZQUNuRixxRUFBcUU7WUFDckUsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQUEsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxDQUFDO1lBQ3RHLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjs7Y0FDeEIsYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsZUFBZTtRQUV6RSxJQUFJLGFBQWEsRUFBRTtZQUNmLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQztTQUNyRDtJQUNMLENBQUM7OztZQXRDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNEQUFzRDtnQkFDaEUsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSxxQ0FBcUM7b0JBQ2hELEtBQUssRUFBRSxvQkFBb0I7aUJBQzlCO2FBQ0o7Ozs7WUFiUSxjQUFjLHVCQW9CZCxRQUFRO1lBdEJjLFVBQVU7WUFHaEMsa0JBQWtCOzs7OEJBY3RCLEtBQUssU0FBQyxvQkFBb0I7K0JBRTFCLEtBQUssU0FBQyxrQkFBa0I7Ozs7SUFGekIsMkNBQWtEOztJQUVsRCw0Q0FBaUQ7O0lBRzdDLHdDQUErQzs7Ozs7SUFDL0Msc0NBQTJDOzs7OztJQUMzQyw0Q0FBNEM7Ozs7O0FBNkNwRCxNQUFNLE9BQU8saUJBQWlCOzs7WUFoQjdCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7OztLQVNUO2dCQUNELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUscUJBQXFCO2lCQUMvQjthQUNKOzs7d0JBRUksS0FBSzs7OztJQUFOLHNDQUE0Qjs7Ozs7QUFZaEMsTUFBTSxPQUFPLGVBQWU7OztZQU4zQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlEQUF5RDtnQkFDbkUsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxtQkFBbUI7aUJBQzdCO2FBQ0o7Ozs7O0FBWUQsTUFBTSxPQUFPLGlCQUFpQjs7O1lBTjdCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsK0RBQStEO2dCQUN6RSxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjtpQkFDL0I7YUFDSjs7Ozs7QUFZRCxNQUFNLE9BQU8sa0JBQWtCOzs7WUFOOUIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrRUFBa0U7Z0JBQzVFLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsc0JBQXNCO2lCQUNoQzthQUNKOzs7Ozs7OztBQVFELFNBQVMsbUJBQW1CLENBQUMsT0FBZ0MsRUFBRSxjQUFnQzs7UUFDdkYsTUFBTSxHQUF1QixPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWE7SUFFcEUsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1FBQ25FLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQ2pDO0lBRUQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJOzs7O0lBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssbUJBQUEsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUMzRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3B0aW9uYWwsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWNTaWRlcGFuZWxSZWYgfSBmcm9tICcuL3NpZGVwYW5lbC1yZWYnO1xuaW1wb3J0IHsgTWNTaWRlcGFuZWxTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlcGFuZWwuc2VydmljZSc7XG5cblxuLyoqXG4gKiBCdXR0b24gdGhhdCB3aWxsIGNsb3NlIHRoZSBjdXJyZW50IHNpZGVwYW5lbC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdidXR0b25bbWMtc2lkZXBhbmVsLWNsb3NlXSwgYnV0dG9uW21jU2lkZXBhbmVsQ2xvc2VdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoY2xpY2spJzogJ3NpZGVwYW5lbFJlZi5jbG9zZShzaWRlcGFuZWxSZXN1bHQpJyxcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlcGFuZWwtY2xvc2UnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbENsb3NlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgnbWMtc2lkZXBhbmVsLWNsb3NlJykgc2lkZXBhbmVsUmVzdWx0OiBhbnk7XG5cbiAgICBASW5wdXQoJ21jU2lkZXBhbmVsQ2xvc2UnKSBtY1NpZGVwYW5lbENsb3NlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgcHVibGljIHNpZGVwYW5lbFJlZjogTWNTaWRlcGFuZWxSZWYsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgc2lkZXBhbmVsU2VydmljZTogTWNTaWRlcGFuZWxTZXJ2aWNlXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaWRlcGFuZWxSZWYpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gdGhpcyBkaXJlY3RpdmUgaXMgaW5jbHVkZWQgaW4gYSBzaWRlcGFuZWwgdmlhIFRlbXBsYXRlUmVmIChyYXRoZXIgdGhhbiBiZWluZ1xuICAgICAgICAgICAgLy8gaW4gYSBDb21wb25lbnQpLCB0aGUgU2lkZXBhbmVsUmVmIGlzbid0IGF2YWlsYWJsZSB2aWEgaW5qZWN0aW9uIGJlY2F1c2UgZW1iZWRkZWRcbiAgICAgICAgICAgIC8vIHZpZXdzIGNhbm5vdCBiZSBnaXZlbiBhIGN1c3RvbSBpbmplY3Rvci4gSW5zdGVhZCwgd2UgbG9vayB1cCB0aGUgU2lkZXBhbmVsUmVmIGJ5XG4gICAgICAgICAgICAvLyBJRC5cbiAgICAgICAgICAgIC8vIFRoaXMgbXVzdCBvY2N1ciBpbiBgb25Jbml0YCwgYXMgdGhlIElEIGJpbmRpbmcgZm9yIHRoZSBzaWRlcGFuZWwgY29udGFpbmVyIHdvbid0XG4gICAgICAgICAgICAvLyBiZSByZXNvbHZlZCBhdCBjb25zdHJ1Y3RvciB0aW1lLiBXZSB1c2Ugc2V0VGltZW91dCBieSBzYW1lIHJlYXNvbi5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2lkZXBhbmVsUmVmID0gZ2V0Q2xvc2VzdFNpZGVwYW5lbCh0aGlzLmVsZW1lbnRSZWYsIHRoaXMuc2lkZXBhbmVsU2VydmljZS5vcGVuZWRTaWRlcGFuZWxzKSE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgY29uc3QgcHJveGllZENoYW5nZSA9IGNoYW5nZXMubWNTaWRlcGFuZWxDbG9zZSB8fCBjaGFuZ2VzLnNpZGVwYW5lbFJlc3VsdDtcblxuICAgICAgICBpZiAocHJveGllZENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zaWRlcGFuZWxSZXN1bHQgPSBwcm94aWVkQ2hhbmdlLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBIZWFkZXIgb2YgYSBzaWRlcGFuZWwuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2lkZXBhbmVsLWhlYWRlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXNpZGVwYW5lbC10aXRsZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImNsb3NlYWJsZVwiIG1jLXNpZGVwYW5lbC1jbG9zZT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWMtc2lkZXBhbmVsLWNsb3NlLXhcIj5cbiAgICAgICAgICAgICAgICA8aSBtYy1pY29uPVwibWMtY2xvc2UtTF8xNlwiIGNsYXNzPVwibWMtaWNvbiBtYy1pY29uX2xpZ2h0XCIgY29sb3I9XCJzZWNvbmRcIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1oZWFkZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbEhlYWRlciB7XG4gICAgQElucHV0KCkgY2xvc2VhYmxlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIFNjcm9sbGFibGUgY29udGVudCBjb250YWluZXIgb2YgYSBzaWRlcGFuZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2lkZXBhbmVsLWJvZHksIFttYy1zaWRlcGFuZWwtYm9keV0sIG1jU2lkZXBhbmVsQm9keScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1ib2R5J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxCb2R5IHt9XG5cbi8qKlxuICogRm9vdGVyIG9mIGEgc2lkZXBhbmVsLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXNpZGVwYW5lbC1mb290ZXIsIFttYy1zaWRlcGFuZWwtZm9vdGVyXSwgbWNTaWRlcGFuZWxGb290ZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlcGFuZWwtZm9vdGVyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxGb290ZXIge31cblxuLyoqXG4gKiBBY3Rpb25zIGJsb2NrIG9mIGEgc2lkZXBhbmVsIGZvb3Rlci5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtYWN0aW9ucywgW21jLXNpZGVwYW5lbC1hY3Rpb25zXSwgbWNTaWRlcGFuZWxBY3Rpb25zJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWFjdGlvbnMnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbEFjdGlvbnMge31cblxuLyoqXG4gKiBGaW5kcyB0aGUgY2xvc2VzdCBNY1NpZGVwYW5lbFJlZiB0byBhbiBlbGVtZW50IGJ5IGxvb2tpbmcgYXQgdGhlIERPTS5cbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgcmVsYXRpdmUgdG8gd2hpY2ggdG8gbG9vayBmb3IgYSBzaWRlcGFuZWwuXG4gKiBAcGFyYW0gb3BlblNpZGVwYW5lbHMgUmVmZXJlbmNlcyB0byB0aGUgY3VycmVudGx5LW9wZW4gc2lkZXBhbmVscy5cbiAqL1xuZnVuY3Rpb24gZ2V0Q2xvc2VzdFNpZGVwYW5lbChlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Piwgb3BlblNpZGVwYW5lbHM6IE1jU2lkZXBhbmVsUmVmW10pIHtcbiAgICBsZXQgcGFyZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIHdoaWxlIChwYXJlbnQgJiYgIXBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21jLXNpZGVwYW5lbC1jb250YWluZXInKSkge1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50ID8gb3BlblNpZGVwYW5lbHMuZmluZCgoc2lkZXBhbmVsKSA9PiBzaWRlcGFuZWwuaWQgPT09IHBhcmVudCEuaWQpIDogbnVsbDtcbn1cbiJdfQ==
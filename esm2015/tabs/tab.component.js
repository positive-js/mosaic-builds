import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McTabContent } from './tab-content.directive';
import { MC_TAB_LABEL, McTabLabel } from './tab-label.directive';
export class McTabBase {
}
// tslint:disable-next-line:naming-convention
export const McTabMixinBase = mixinDisabled(McTabBase);
export class McTab extends McTabMixinBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        /** Plain text label for the tab, used when there is no template label. */
        this.textLabel = '';
        this.empty = false;
        this.tooltipTitle = '';
        this.tooltipPlacement = '';
        /** Emits whenever the internal state of the tab changes. */
        this.stateChanges = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        this.isActive = false;
        /** Portal that will be the hosted content of the tab */
        this.contentPortal = null;
    }
    /** @docs-private */
    get content() {
        return this.contentPortal;
    }
    get templateLabel() { return this._templateLabel; }
    set templateLabel(value) { this.setTemplateLabelInput(value); }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    setTemplateLabelInput(value) {
        // Only update the templateLabel via query if there is actually
        // a McTabLabel found. This works around an issue where a user may have
        // manually set `templateLabel` during creation mode, which would then get clobbered
        // by `undefined` when this query resolves.
        if (value) {
            this._templateLabel = value;
        }
    }
}
McTab.decorators = [
    { type: Component, args: [{
                selector: 'mc-tab',
                exportAs: 'mcTab',
                // Create a template for the content of the <mc-tab> so that we can grab a reference to this
                // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
                // tab-group.
                template: '<ng-template><ng-content></ng-content></ng-template>',
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
/** @nocollapse */
McTab.ctorParameters = () => [
    { type: ViewContainerRef }
];
McTab.propDecorators = {
    templateLabel: [{ type: ContentChild, args: [MC_TAB_LABEL,] }],
    explicitContent: [{ type: ContentChild, args: [McTabContent, { read: TemplateRef, static: true },] }],
    implicitContent: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    textLabel: [{ type: Input, args: ['label',] }],
    empty: [{ type: Input }],
    tooltipTitle: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tabId: [{ type: Input, args: ['tabId',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWJzL3RhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBS0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUdqRSxNQUFNLE9BQU8sU0FBUztDQUFHO0FBRXpCLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQXNDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQWExRixNQUFNLE9BQU8sS0FBTSxTQUFRLGNBQWM7SUFxRHJDLFlBQTZCLGdCQUFrQztRQUMzRCxLQUFLLEVBQUUsQ0FBQztRQURpQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBaEMvRCwwRUFBMEU7UUFDMUQsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUV0QixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBSS9CLDREQUE0RDtRQUNuRCxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFNUM7OztXQUdHO1FBQ0gsYUFBUSxHQUFrQixJQUFJLENBQUM7UUFFL0I7OztXQUdHO1FBQ0gsV0FBTSxHQUFrQixJQUFJLENBQUM7UUFFN0I7O1dBRUc7UUFDSCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLHdEQUF3RDtRQUNoRCxrQkFBYSxHQUEwQixJQUFJLENBQUM7SUFJcEQsQ0FBQztJQXRERCxvQkFBb0I7SUFDcEIsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUNJLGFBQWEsS0FBaUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUUvRCxJQUFJLGFBQWEsQ0FBQyxLQUFpQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFnRDNFLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08scUJBQXFCLENBQUMsS0FBaUI7UUFDN0MsK0RBQStEO1FBQy9ELHVFQUF1RTtRQUN2RSxvRkFBb0Y7UUFDcEYsMkNBQTJDO1FBQzNDLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDL0I7SUFDTCxDQUFDOzs7WUFoR0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsT0FBTztnQkFDakIsNEZBQTRGO2dCQUM1RiwrRkFBK0Y7Z0JBQy9GLGFBQWE7Z0JBQ2IsUUFBUSxFQUFFLHNEQUFzRDtnQkFDaEUsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNwQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozs7WUE3QkcsZ0JBQWdCOzs7NEJBb0NmLFlBQVksU0FBQyxZQUFZOzhCQVV6QixZQUFZLFNBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzhCQUc5RCxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt3QkFHdkMsS0FBSyxTQUFDLE9BQU87b0JBRWIsS0FBSzsyQkFDTCxLQUFLOytCQUNMLEtBQUs7b0JBRUwsS0FBSyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jVGFiQ29udGVudCB9IGZyb20gJy4vdGFiLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1DX1RBQl9MQUJFTCwgTWNUYWJMYWJlbCB9IGZyb20gJy4vdGFiLWxhYmVsLmRpcmVjdGl2ZSc7XG5cblxuZXhwb3J0IGNsYXNzIE1jVGFiQmFzZSB7fVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYk1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNUYWJCYXNlID0gbWl4aW5EaXNhYmxlZChNY1RhYkJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYicsXG4gICAgZXhwb3J0QXM6ICdtY1RhYicsXG4gICAgLy8gQ3JlYXRlIGEgdGVtcGxhdGUgZm9yIHRoZSBjb250ZW50IG9mIHRoZSA8bWMtdGFiPiBzbyB0aGF0IHdlIGNhbiBncmFiIGEgcmVmZXJlbmNlIHRvIHRoaXNcbiAgICAvLyBUZW1wbGF0ZVJlZiBhbmQgdXNlIGl0IGluIGEgUG9ydGFsIHRvIHJlbmRlciB0aGUgdGFiIGNvbnRlbnQgaW4gdGhlIGFwcHJvcHJpYXRlIHBsYWNlIGluIHRoZVxuICAgIC8vIHRhYi1ncm91cC5cbiAgICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT4nLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNUYWIgZXh0ZW5kcyBNY1RhYk1peGluQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgQ2FuRGlzYWJsZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgZ2V0IGNvbnRlbnQoKTogVGVtcGxhdGVQb3J0YWwgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudFBvcnRhbDtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkKE1DX1RBQl9MQUJFTClcbiAgICBnZXQgdGVtcGxhdGVMYWJlbCgpOiBNY1RhYkxhYmVsIHsgcmV0dXJuIHRoaXMuX3RlbXBsYXRlTGFiZWw7IH1cblxuICAgIHNldCB0ZW1wbGF0ZUxhYmVsKHZhbHVlOiBNY1RhYkxhYmVsKSB7IHRoaXMuc2V0VGVtcGxhdGVMYWJlbElucHV0KHZhbHVlKTsgfVxuXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGVMYWJlbDogTWNUYWJMYWJlbDtcblxuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIHByb3ZpZGVkIGluIHRoZSB0YWIgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFiQ29udGVudCwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIGV4cGxpY2l0Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBUZW1wbGF0ZSBpbnNpZGUgdGhlIE1jVGFiIHZpZXcgdGhhdCBjb250YWlucyBhbiBgPG5nLWNvbnRlbnQ+YC4gKi9cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbXBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKiogUGxhaW4gdGV4dCBsYWJlbCBmb3IgdGhlIHRhYiwgdXNlZCB3aGVuIHRoZXJlIGlzIG5vIHRlbXBsYXRlIGxhYmVsLiAqL1xuICAgIEBJbnB1dCgnbGFiZWwnKSB0ZXh0TGFiZWwgPSAnJztcblxuICAgIEBJbnB1dCgpIGVtcHR5ID0gZmFsc2U7XG4gICAgQElucHV0KCkgdG9vbHRpcFRpdGxlID0gJyc7XG4gICAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudCA9ICcnO1xuXG4gICAgQElucHV0KCd0YWJJZCcpIHRhYklkOiBzdHJpbmc7XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGludGVybmFsIHN0YXRlIG9mIHRoZSB0YWIgY2hhbmdlcy4gKi9cbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHJlbGF0aXZlbHkgaW5kZXhlZCBwb3NpdGlvbiB3aGVyZSAwIHJlcHJlc2VudHMgdGhlIGNlbnRlciwgbmVnYXRpdmUgaXMgbGVmdCwgYW5kIHBvc2l0aXZlXG4gICAgICogcmVwcmVzZW50cyB0aGUgcmlnaHQuXG4gICAgICovXG4gICAgcG9zaXRpb246IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGluaXRpYWwgcmVsYXRpdmVseSBpbmRleCBvcmlnaW4gb2YgdGhlIHRhYiBpZiBpdCB3YXMgY3JlYXRlZCBhbmQgc2VsZWN0ZWQgYWZ0ZXIgdGhlcmVcbiAgICAgKiB3YXMgYWxyZWFkeSBhIHNlbGVjdGVkIHRhYi4gUHJvdmlkZXMgY29udGV4dCBvZiB3aGF0IHBvc2l0aW9uIHRoZSB0YWIgc2hvdWxkIG9yaWdpbmF0ZSBmcm9tLlxuICAgICAqL1xuICAgIG9yaWdpbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB0YWIgaXMgY3VycmVudGx5IGFjdGl2ZS5cbiAgICAgKi9cbiAgICBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgLyoqIFBvcnRhbCB0aGF0IHdpbGwgYmUgdGhlIGhvc3RlZCBjb250ZW50IG9mIHRoZSB0YWIgKi9cbiAgICBwcml2YXRlIGNvbnRlbnRQb3J0YWw6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCd0ZXh0TGFiZWwnKSB8fCBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZW50UG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuZXhwbGljaXRDb250ZW50IHx8IHRoaXMuaW1wbGljaXRDb250ZW50LCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaGFzIGJlZW4gZXh0cmFjdGVkIHRvIGEgdXRpbCBiZWNhdXNlIG9mIFRTIDQgYW5kIFZFLlxuICAgICAqIFZpZXcgRW5naW5lIGRvZXNuJ3Qgc3VwcG9ydCBwcm9wZXJ0eSByZW5hbWUgaW5oZXJpdGFuY2UuXG4gICAgICogVFMgNC4wIGRvZXNuJ3QgYWxsb3cgcHJvcGVydGllcyB0byBvdmVycmlkZSBhY2Nlc3NvcnMgb3IgdmljZS12ZXJzYS5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldFRlbXBsYXRlTGFiZWxJbnB1dCh2YWx1ZTogTWNUYWJMYWJlbCkge1xuICAgICAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgdGVtcGxhdGVMYWJlbCB2aWEgcXVlcnkgaWYgdGhlcmUgaXMgYWN0dWFsbHlcbiAgICAgICAgLy8gYSBNY1RhYkxhYmVsIGZvdW5kLiBUaGlzIHdvcmtzIGFyb3VuZCBhbiBpc3N1ZSB3aGVyZSBhIHVzZXIgbWF5IGhhdmVcbiAgICAgICAgLy8gbWFudWFsbHkgc2V0IGB0ZW1wbGF0ZUxhYmVsYCBkdXJpbmcgY3JlYXRpb24gbW9kZSwgd2hpY2ggd291bGQgdGhlbiBnZXQgY2xvYmJlcmVkXG4gICAgICAgIC8vIGJ5IGB1bmRlZmluZWRgIHdoZW4gdGhpcyBxdWVyeSByZXNvbHZlcy5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90ZW1wbGF0ZUxhYmVsID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
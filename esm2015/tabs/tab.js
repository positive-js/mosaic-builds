/**
 * @fileoverview added by tsickle
 * Generated from: tab.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McTabContent } from './tab-content';
import { McTabLabel } from './tab-label';
export class McTabBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McTabMixinBase = mixinDisabled(McTabBase);
export class McTab extends McTabMixinBase {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        /**
         * Plain text label for the tab, used when there is no template label.
         */
        this.textLabel = '';
        /**
         * Emits whenever the internal state of the tab changes.
         */
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
        /**
         * Portal that will be the hosted content of the tab
         */
        this.contentPortal = null;
    }
    /**
     * \@docs-private
     * @return {?}
     */
    get content() {
        return this.contentPortal;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel') ||
            changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    }
}
McTab.decorators = [
    { type: Component, args: [{
                selector: 'mc-tab',
                // Create a template for the content of the <mc-tab> so that we can grab a reference to this
                // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
                // tab-group.
                template: '<ng-template><ng-content></ng-content></ng-template>',
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mcTab'
            }] }
];
/** @nocollapse */
McTab.ctorParameters = () => [
    { type: ViewContainerRef }
];
McTab.propDecorators = {
    templateLabel: [{ type: ContentChild, args: [McTabLabel, { static: false },] }],
    explicitContent: [{ type: ContentChild, args: [McTabContent, { read: TemplateRef, static: true },] }],
    implicitContent: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    textLabel: [{ type: Input, args: ['label',] }],
    tabId: [{ type: Input, args: ['tabId',] }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }]
};
if (false) {
    /**
     * Content for the tab label given by `<ng-template mc-tab-label>`.
     * @type {?}
     */
    McTab.prototype.templateLabel;
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     * @type {?}
     */
    McTab.prototype.explicitContent;
    /**
     * Template inside the McTab view that contains an `<ng-content>`.
     * @type {?}
     */
    McTab.prototype.implicitContent;
    /**
     * Plain text label for the tab, used when there is no template label.
     * @type {?}
     */
    McTab.prototype.textLabel;
    /** @type {?} */
    McTab.prototype.tabId;
    /**
     * Aria label for the tab.
     * @type {?}
     */
    McTab.prototype.ariaLabel;
    /**
     * Reference to the element that the tab is labelled by.
     * Will be cleared if `aria-label` is set at the same time.
     * @type {?}
     */
    McTab.prototype.ariaLabelledby;
    /**
     * Emits whenever the internal state of the tab changes.
     * @type {?}
     */
    McTab.prototype.stateChanges;
    /**
     * The relatively indexed position where 0 represents the center, negative is left, and positive
     * represents the right.
     * @type {?}
     */
    McTab.prototype.position;
    /**
     * The initial relatively index origin of the tab if it was created and selected after there
     * was already a selected tab. Provides context of what position the tab should originate from.
     * @type {?}
     */
    McTab.prototype.origin;
    /**
     * Whether the tab is currently active.
     * @type {?}
     */
    McTab.prototype.isActive;
    /**
     * Portal that will be the hosted content of the tab
     * @type {?}
     * @private
     */
    McTab.prototype.contentPortal;
    /**
     * @type {?}
     * @private
     */
    McTab.prototype.viewContainerRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhYnMvIiwic291cmNlcyI6WyJ0YWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFLTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdILGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUd6QyxNQUFNLE9BQU8sU0FBUztDQUFHOzs7QUFFekIsTUFBTSxPQUFPLGNBQWMsR0FBc0MsYUFBYSxDQUMxRSxTQUFTLENBQ1o7QUFhRCxNQUFNLE9BQU8sS0FBTSxTQUFRLGNBQWM7Ozs7SUE2RHJDLFlBQW9CLGdCQUFrQztRQUNsRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7Ozs7UUF2Q3RELGNBQVMsR0FBVyxFQUFFLENBQUM7Ozs7UUFpQmQsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDOzs7OztRQU01QyxhQUFRLEdBQWtCLElBQUksQ0FBQzs7Ozs7UUFNL0IsV0FBTSxHQUFrQixJQUFJLENBQUM7Ozs7UUFLN0IsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUdULGtCQUFhLEdBQTBCLElBQUksQ0FBQztJQUlwRCxDQUFDOzs7OztJQTVERCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUE0REQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQ0ksT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7WUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFDcEM7WUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FDbkMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQ3hCLENBQUM7SUFDTixDQUFDOzs7WUE5RkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxRQUFROzs7O2dCQUlsQixRQUFRLEVBQUUsc0RBQXNEO2dCQUNoRSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLE9BQU87YUFDcEI7Ozs7WUE5QkcsZ0JBQWdCOzs7NEJBc0NmLFlBQVksU0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOzhCQU14QyxZQUFZLFNBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzhCQUk5RCxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt3QkFJckMsS0FBSyxTQUFDLE9BQU87b0JBR2IsS0FBSyxTQUFDLE9BQU87d0JBSWIsS0FBSyxTQUFDLFlBQVk7NkJBT2xCLEtBQUssU0FBQyxpQkFBaUI7Ozs7Ozs7SUE1QnhCLDhCQUMwQjs7Ozs7SUFLMUIsZ0NBQ2tDOzs7OztJQUdsQyxnQ0FDa0M7Ozs7O0lBR2xDLDBCQUN1Qjs7SUFFdkIsc0JBQ2M7Ozs7O0lBR2QsMEJBQ2tCOzs7Ozs7SUFNbEIsK0JBQ3VCOzs7OztJQUd2Qiw2QkFBNEM7Ozs7OztJQU01Qyx5QkFBK0I7Ozs7OztJQU0vQix1QkFBNkI7Ozs7O0lBSzdCLHlCQUFpQjs7Ozs7O0lBR2pCLDhCQUFvRDs7Ozs7SUFFeEMsaUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIG1peGluRGlzYWJsZWRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY1RhYkNvbnRlbnQgfSBmcm9tICcuL3RhYi1jb250ZW50JztcbmltcG9ydCB7IE1jVGFiTGFiZWwgfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5cblxuZXhwb3J0IGNsYXNzIE1jVGFiQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jVGFiQmFzZSA9IG1peGluRGlzYWJsZWQoXG4gICAgTWNUYWJCYXNlXG4pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYicsXG4gICAgLy8gQ3JlYXRlIGEgdGVtcGxhdGUgZm9yIHRoZSBjb250ZW50IG9mIHRoZSA8bWMtdGFiPiBzbyB0aGF0IHdlIGNhbiBncmFiIGEgcmVmZXJlbmNlIHRvIHRoaXNcbiAgICAvLyBUZW1wbGF0ZVJlZiBhbmQgdXNlIGl0IGluIGEgUG9ydGFsIHRvIHJlbmRlciB0aGUgdGFiIGNvbnRlbnQgaW4gdGhlIGFwcHJvcHJpYXRlIHBsYWNlIGluIHRoZVxuICAgIC8vIHRhYi1ncm91cC5cbiAgICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT4nLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgZXhwb3J0QXM6ICdtY1RhYidcbn0pXG5leHBvcnQgY2xhc3MgTWNUYWIgZXh0ZW5kcyBNY1RhYk1peGluQmFzZVxuICAgIGltcGxlbWVudHMgT25Jbml0LCBDYW5EaXNhYmxlLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBnZXQgY29udGVudCgpOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50UG9ydGFsO1xuICAgIH1cbiAgICAvKiogQ29udGVudCBmb3IgdGhlIHRhYiBsYWJlbCBnaXZlbiBieSBgPG5nLXRlbXBsYXRlIG1jLXRhYi1sYWJlbD5gLiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNUYWJMYWJlbCwge3N0YXRpYzogZmFsc2V9KVxuICAgIHRlbXBsYXRlTGFiZWw6IE1jVGFiTGFiZWw7XG5cbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSBwcm92aWRlZCBpbiB0aGUgdGFiIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHVzZWQgaWYgcHJlc2VudCwgdXNlZCB0byBlbmFibGUgbGF6eS1sb2FkaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhYkNvbnRlbnQsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIGV4cGxpY2l0Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBUZW1wbGF0ZSBpbnNpZGUgdGhlIE1jVGFiIHZpZXcgdGhhdCBjb250YWlucyBhbiBgPG5nLWNvbnRlbnQ+YC4gKi9cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiB0cnVlfSlcbiAgICBpbXBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKiogUGxhaW4gdGV4dCBsYWJlbCBmb3IgdGhlIHRhYiwgdXNlZCB3aGVuIHRoZXJlIGlzIG5vIHRlbXBsYXRlIGxhYmVsLiAqL1xuICAgIEBJbnB1dCgnbGFiZWwnKVxuICAgIHRleHRMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoJ3RhYklkJylcbiAgICB0YWJJZDogc3RyaW5nO1xuXG4gICAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSB0YWIuICovXG4gICAgQElucHV0KCdhcmlhLWxhYmVsJylcbiAgICBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCB0aGF0IHRoZSB0YWIgaXMgbGFiZWxsZWQgYnkuXG4gICAgICogV2lsbCBiZSBjbGVhcmVkIGlmIGBhcmlhLWxhYmVsYCBpcyBzZXQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICAgKi9cbiAgICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpXG4gICAgYXJpYUxhYmVsbGVkYnk6IHN0cmluZztcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIHRhYiBjaGFuZ2VzLiAqL1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVsYXRpdmVseSBpbmRleGVkIHBvc2l0aW9uIHdoZXJlIDAgcmVwcmVzZW50cyB0aGUgY2VudGVyLCBuZWdhdGl2ZSBpcyBsZWZ0LCBhbmQgcG9zaXRpdmVcbiAgICAgKiByZXByZXNlbnRzIHRoZSByaWdodC5cbiAgICAgKi9cbiAgICBwb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5pdGlhbCByZWxhdGl2ZWx5IGluZGV4IG9yaWdpbiBvZiB0aGUgdGFiIGlmIGl0IHdhcyBjcmVhdGVkIGFuZCBzZWxlY3RlZCBhZnRlciB0aGVyZVxuICAgICAqIHdhcyBhbHJlYWR5IGEgc2VsZWN0ZWQgdGFiLiBQcm92aWRlcyBjb250ZXh0IG9mIHdoYXQgcG9zaXRpb24gdGhlIHRhYiBzaG91bGQgb3JpZ2luYXRlIGZyb20uXG4gICAgICovXG4gICAgb3JpZ2luOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRhYiBpcyBjdXJyZW50bHkgYWN0aXZlLlxuICAgICAqL1xuICAgIGlzQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvKiogUG9ydGFsIHRoYXQgd2lsbCBiZSB0aGUgaG9zdGVkIGNvbnRlbnQgb2YgdGhlIHRhYiAqL1xuICAgIHByaXZhdGUgY29udGVudFBvcnRhbDogVGVtcGxhdGVQb3J0YWwgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndGV4dExhYmVsJykgfHxcbiAgICAgICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Rpc2FibGVkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZW50UG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKFxuICAgICAgICAgICAgdGhpcy5leHBsaWNpdENvbnRlbnQgfHwgdGhpcy5pbXBsaWNpdENvbnRlbnQsXG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWZcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
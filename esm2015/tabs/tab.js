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
        if (changes.hasOwnProperty('textLabel') || changes.hasOwnProperty('disabled')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhYnMvIiwic291cmNlcyI6WyJ0YWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFLTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdILGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUd6QyxNQUFNLE9BQU8sU0FBUztDQUFHOzs7QUFFekIsTUFBTSxPQUFPLGNBQWMsR0FBc0MsYUFBYSxDQUFDLFNBQVMsQ0FBQztBQWF6RixNQUFNLE9BQU8sS0FBTSxTQUFRLGNBQWM7Ozs7SUF1RHJDLFlBQW9CLGdCQUFrQztRQUNsRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7Ozs7UUFwQ3RDLGNBQVMsR0FBVyxFQUFFLENBQUM7Ozs7UUFjOUIsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDOzs7OztRQU01QyxhQUFRLEdBQWtCLElBQUksQ0FBQzs7Ozs7UUFNL0IsV0FBTSxHQUFrQixJQUFJLENBQUM7Ozs7UUFLN0IsYUFBUSxHQUFHLEtBQUssQ0FBQzs7OztRQUdULGtCQUFhLEdBQTBCLElBQUksQ0FBQztJQUlwRCxDQUFDOzs7OztJQXZERCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUF1REQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksY0FBYyxDQUNuQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FDeEIsQ0FBQztJQUNOLENBQUM7OztZQXJGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFFBQVE7Ozs7Z0JBSWxCLFFBQVEsRUFBRSxzREFBc0Q7Z0JBQ2hFLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsT0FBTzthQUNwQjs7OztZQTVCRyxnQkFBZ0I7Ozs0QkFtQ2YsWUFBWSxTQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7OEJBSzFDLFlBQVksU0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7OEJBSTlELFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3dCQUl2QyxLQUFLLFNBQUMsT0FBTztvQkFFYixLQUFLLFNBQUMsT0FBTzt3QkFHYixLQUFLLFNBQUMsWUFBWTs2QkFNbEIsS0FBSyxTQUFDLGlCQUFpQjs7Ozs7OztJQXhCeEIsOEJBQXVFOzs7OztJQUt2RSxnQ0FDa0M7Ozs7O0lBR2xDLGdDQUNrQzs7Ozs7SUFHbEMsMEJBQXVDOztJQUV2QyxzQkFBOEI7Ozs7O0lBRzlCLDBCQUF1Qzs7Ozs7O0lBTXZDLCtCQUFpRDs7Ozs7SUFHakQsNkJBQTRDOzs7Ozs7SUFNNUMseUJBQStCOzs7Ozs7SUFNL0IsdUJBQTZCOzs7OztJQUs3Qix5QkFBaUI7Ozs7OztJQUdqQiw4QkFBb0Q7Ozs7O0lBRXhDLGlDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBtaXhpbkRpc2FibGVkXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWNUYWJDb250ZW50IH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQgeyBNY1RhYkxhYmVsIH0gZnJvbSAnLi90YWItbGFiZWwnO1xuXG5cbmV4cG9ydCBjbGFzcyBNY1RhYkJhc2Uge31cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGFiTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY1RhYkJhc2UgPSBtaXhpbkRpc2FibGVkKE1jVGFiQmFzZSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiJyxcbiAgICAvLyBDcmVhdGUgYSB0ZW1wbGF0ZSBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIDxtYy10YWI+IHNvIHRoYXQgd2UgY2FuIGdyYWIgYSByZWZlcmVuY2UgdG8gdGhpc1xuICAgIC8vIFRlbXBsYXRlUmVmIGFuZCB1c2UgaXQgaW4gYSBQb3J0YWwgdG8gcmVuZGVyIHRoZSB0YWIgY29udGVudCBpbiB0aGUgYXBwcm9wcmlhdGUgcGxhY2UgaW4gdGhlXG4gICAgLy8gdGFiLWdyb3VwLlxuICAgIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L25nLXRlbXBsYXRlPicsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBleHBvcnRBczogJ21jVGFiJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1RhYiBleHRlbmRzIE1jVGFiTWl4aW5CYXNlIGltcGxlbWVudHMgT25Jbml0LCBDYW5EaXNhYmxlLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgICBnZXQgY29udGVudCgpOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50UG9ydGFsO1xuICAgIH1cbiAgICAvKiogQ29udGVudCBmb3IgdGhlIHRhYiBsYWJlbCBnaXZlbiBieSBgPG5nLXRlbXBsYXRlIG1jLXRhYi1sYWJlbD5gLiAqL1xuICAgIEBDb250ZW50Q2hpbGQoTWNUYWJMYWJlbCwgeyBzdGF0aWM6IGZhbHNlIH0pIHRlbXBsYXRlTGFiZWw6IE1jVGFiTGFiZWw7XG5cbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSBwcm92aWRlZCBpbiB0aGUgdGFiIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHVzZWQgaWYgcHJlc2VudCwgdXNlZCB0byBlbmFibGUgbGF6eS1sb2FkaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhYkNvbnRlbnQsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIGV4cGxpY2l0Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBUZW1wbGF0ZSBpbnNpZGUgdGhlIE1jVGFiIHZpZXcgdGhhdCBjb250YWlucyBhbiBgPG5nLWNvbnRlbnQ+YC4gKi9cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIGltcGxpY2l0Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBQbGFpbiB0ZXh0IGxhYmVsIGZvciB0aGUgdGFiLCB1c2VkIHdoZW4gdGhlcmUgaXMgbm8gdGVtcGxhdGUgbGFiZWwuICovXG4gICAgQElucHV0KCdsYWJlbCcpIHRleHRMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoJ3RhYklkJykgdGFiSWQ6IHN0cmluZztcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgdGFiLiAqL1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IHRoYXQgdGhlIHRhYiBpcyBsYWJlbGxlZCBieS5cbiAgICAgKiBXaWxsIGJlIGNsZWFyZWQgaWYgYGFyaWEtbGFiZWxgIGlzIHNldCBhdCB0aGUgc2FtZSB0aW1lLlxuICAgICAqL1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZztcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgdGhlIHRhYiBjaGFuZ2VzLiAqL1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmVsYXRpdmVseSBpbmRleGVkIHBvc2l0aW9uIHdoZXJlIDAgcmVwcmVzZW50cyB0aGUgY2VudGVyLCBuZWdhdGl2ZSBpcyBsZWZ0LCBhbmQgcG9zaXRpdmVcbiAgICAgKiByZXByZXNlbnRzIHRoZSByaWdodC5cbiAgICAgKi9cbiAgICBwb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5pdGlhbCByZWxhdGl2ZWx5IGluZGV4IG9yaWdpbiBvZiB0aGUgdGFiIGlmIGl0IHdhcyBjcmVhdGVkIGFuZCBzZWxlY3RlZCBhZnRlciB0aGVyZVxuICAgICAqIHdhcyBhbHJlYWR5IGEgc2VsZWN0ZWQgdGFiLiBQcm92aWRlcyBjb250ZXh0IG9mIHdoYXQgcG9zaXRpb24gdGhlIHRhYiBzaG91bGQgb3JpZ2luYXRlIGZyb20uXG4gICAgICovXG4gICAgb3JpZ2luOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRhYiBpcyBjdXJyZW50bHkgYWN0aXZlLlxuICAgICAqL1xuICAgIGlzQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvKiogUG9ydGFsIHRoYXQgd2lsbCBiZSB0aGUgaG9zdGVkIGNvbnRlbnQgb2YgdGhlIHRhYiAqL1xuICAgIHByaXZhdGUgY29udGVudFBvcnRhbDogVGVtcGxhdGVQb3J0YWwgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3RleHRMYWJlbCcpIHx8IGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRlbnRQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwoXG4gICAgICAgICAgICB0aGlzLmV4cGxpY2l0Q29udGVudCB8fCB0aGlzLmltcGxpY2l0Q29udGVudCxcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
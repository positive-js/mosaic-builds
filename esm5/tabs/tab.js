/**
 * @fileoverview added by tsickle
 * Generated from: tab.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McTabContent } from './tab-content';
import { McTabLabel } from './tab-label';
var McTabBase = /** @class */ (function () {
    function McTabBase() {
    }
    return McTabBase;
}());
export { McTabBase };
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McTabMixinBase = mixinDisabled(McTabBase);
var McTab = /** @class */ (function (_super) {
    __extends(McTab, _super);
    function McTab(viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.viewContainerRef = viewContainerRef;
        /**
         * Plain text label for the tab, used when there is no template label.
         */
        _this.textLabel = '';
        /**
         * Emits whenever the internal state of the tab changes.
         */
        _this.stateChanges = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        _this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        _this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        _this.isActive = false;
        /**
         * Portal that will be the hosted content of the tab
         */
        _this.contentPortal = null;
        return _this;
    }
    Object.defineProperty(McTab.prototype, "content", {
        /** @docs-private */
        get: /**
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    McTab.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty('textLabel') ||
            changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    };
    /**
     * @return {?}
     */
    McTab.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
    };
    /**
     * @return {?}
     */
    McTab.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.contentPortal = new TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    };
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
    McTab.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    McTab.propDecorators = {
        templateLabel: [{ type: ContentChild, args: [McTabLabel, { static: false },] }],
        explicitContent: [{ type: ContentChild, args: [McTabContent, { read: TemplateRef, static: true },] }],
        implicitContent: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
        textLabel: [{ type: Input, args: ['label',] }],
        tabId: [{ type: Input, args: ['tabId',] }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }]
    };
    return McTab;
}(McTabMixinBase));
export { McTab };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL3RhYnMvIiwic291cmNlcyI6WyJ0YWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBS0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHekM7SUFBQTtJQUF3QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQXpCLElBQXlCOzs7O0FBRXpCLE1BQU0sS0FBTyxjQUFjLEdBQXNDLGFBQWEsQ0FDMUUsU0FBUyxDQUNaO0FBRUQ7SUFXMkIseUJBQWM7SUE2RHJDLGVBQW9CLGdCQUFrQztRQUF0RCxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjs7OztRQXZDdEQsZUFBUyxHQUFXLEVBQUUsQ0FBQzs7OztRQWlCZCxrQkFBWSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7Ozs7O1FBTTVDLGNBQVEsR0FBa0IsSUFBSSxDQUFDOzs7OztRQU0vQixZQUFNLEdBQWtCLElBQUksQ0FBQzs7OztRQUs3QixjQUFRLEdBQUcsS0FBSyxDQUFDOzs7O1FBR1QsbUJBQWEsR0FBMEIsSUFBSSxDQUFDOztJQUlwRCxDQUFDO0lBNURELHNCQUFJLDBCQUFPO1FBRFgsb0JBQW9COzs7OztRQUNwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTs7Ozs7SUE0REQsMkJBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQzlCLElBQ0ksT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7WUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFDcEM7WUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUVELDJCQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELHdCQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQ25DLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsRUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUN4QixDQUFDO0lBQ04sQ0FBQzs7Z0JBOUZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsUUFBUTs7OztvQkFJbEIsUUFBUSxFQUFFLHNEQUFzRDtvQkFDaEUsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNwQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxPQUFPO2lCQUNwQjs7OztnQkE5QkcsZ0JBQWdCOzs7Z0NBc0NmLFlBQVksU0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO2tDQU14QyxZQUFZLFNBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2tDQUk5RCxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs0QkFJckMsS0FBSyxTQUFDLE9BQU87d0JBR2IsS0FBSyxTQUFDLE9BQU87NEJBSWIsS0FBSyxTQUFDLFlBQVk7aUNBT2xCLEtBQUssU0FBQyxpQkFBaUI7O0lBaUQ1QixZQUFDO0NBQUEsQUEvRkQsQ0FXMkIsY0FBYyxHQW9GeEM7U0FwRlksS0FBSzs7Ozs7O0lBT2QsOEJBQzBCOzs7OztJQUsxQixnQ0FDa0M7Ozs7O0lBR2xDLGdDQUNrQzs7Ozs7SUFHbEMsMEJBQ3VCOztJQUV2QixzQkFDYzs7Ozs7SUFHZCwwQkFDa0I7Ozs7OztJQU1sQiwrQkFDdUI7Ozs7O0lBR3ZCLDZCQUE0Qzs7Ozs7O0lBTTVDLHlCQUErQjs7Ozs7O0lBTS9CLHVCQUE2Qjs7Ozs7SUFLN0IseUJBQWlCOzs7Ozs7SUFHakIsOEJBQW9EOzs7OztJQUV4QyxpQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jVGFiQ29udGVudCB9IGZyb20gJy4vdGFiLWNvbnRlbnQnO1xuaW1wb3J0IHsgTWNUYWJMYWJlbCB9IGZyb20gJy4vdGFiLWxhYmVsJztcblxuXG5leHBvcnQgY2xhc3MgTWNUYWJCYXNlIHt9XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYk1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNUYWJCYXNlID0gbWl4aW5EaXNhYmxlZChcbiAgICBNY1RhYkJhc2Vcbik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdGFiJyxcbiAgICAvLyBDcmVhdGUgYSB0ZW1wbGF0ZSBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIDxtYy10YWI+IHNvIHRoYXQgd2UgY2FuIGdyYWIgYSByZWZlcmVuY2UgdG8gdGhpc1xuICAgIC8vIFRlbXBsYXRlUmVmIGFuZCB1c2UgaXQgaW4gYSBQb3J0YWwgdG8gcmVuZGVyIHRoZSB0YWIgY29udGVudCBpbiB0aGUgYXBwcm9wcmlhdGUgcGxhY2UgaW4gdGhlXG4gICAgLy8gdGFiLWdyb3VwLlxuICAgIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L25nLXRlbXBsYXRlPicsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBleHBvcnRBczogJ21jVGFiJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1RhYiBleHRlbmRzIE1jVGFiTWl4aW5CYXNlXG4gICAgaW1wbGVtZW50cyBPbkluaXQsIENhbkRpc2FibGUsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIGdldCBjb250ZW50KCk6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRQb3J0YWw7XG4gICAgfVxuICAgIC8qKiBDb250ZW50IGZvciB0aGUgdGFiIGxhYmVsIGdpdmVuIGJ5IGA8bmctdGVtcGxhdGUgbWMtdGFiLWxhYmVsPmAuICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhYkxhYmVsLCB7c3RhdGljOiBmYWxzZX0pXG4gICAgdGVtcGxhdGVMYWJlbDogTWNUYWJMYWJlbDtcblxuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIHByb3ZpZGVkIGluIHRoZSB0YWIgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFiQ29udGVudCwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gICAgZXhwbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIFRlbXBsYXRlIGluc2lkZSB0aGUgTWNUYWIgdmlldyB0aGF0IGNvbnRhaW5zIGFuIGA8bmctY29udGVudD5gLiAqL1xuICAgIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IHRydWV9KVxuICAgIGltcGxpY2l0Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBQbGFpbiB0ZXh0IGxhYmVsIGZvciB0aGUgdGFiLCB1c2VkIHdoZW4gdGhlcmUgaXMgbm8gdGVtcGxhdGUgbGFiZWwuICovXG4gICAgQElucHV0KCdsYWJlbCcpXG4gICAgdGV4dExhYmVsOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgndGFiSWQnKVxuICAgIHRhYklkOiBzdHJpbmc7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIHRhYi4gKi9cbiAgICBASW5wdXQoJ2FyaWEtbGFiZWwnKVxuICAgIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IHRoYXQgdGhlIHRhYiBpcyBsYWJlbGxlZCBieS5cbiAgICAgKiBXaWxsIGJlIGNsZWFyZWQgaWYgYGFyaWEtbGFiZWxgIGlzIHNldCBhdCB0aGUgc2FtZSB0aW1lLlxuICAgICAqL1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JylcbiAgICBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgdGFiIGNoYW5nZXMuICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSByZWxhdGl2ZWx5IGluZGV4ZWQgcG9zaXRpb24gd2hlcmUgMCByZXByZXNlbnRzIHRoZSBjZW50ZXIsIG5lZ2F0aXZlIGlzIGxlZnQsIGFuZCBwb3NpdGl2ZVxuICAgICAqIHJlcHJlc2VudHMgdGhlIHJpZ2h0LlxuICAgICAqL1xuICAgIHBvc2l0aW9uOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbml0aWFsIHJlbGF0aXZlbHkgaW5kZXggb3JpZ2luIG9mIHRoZSB0YWIgaWYgaXQgd2FzIGNyZWF0ZWQgYW5kIHNlbGVjdGVkIGFmdGVyIHRoZXJlXG4gICAgICogd2FzIGFscmVhZHkgYSBzZWxlY3RlZCB0YWIuIFByb3ZpZGVzIGNvbnRleHQgb2Ygd2hhdCBwb3NpdGlvbiB0aGUgdGFiIHNob3VsZCBvcmlnaW5hdGUgZnJvbS5cbiAgICAgKi9cbiAgICBvcmlnaW46IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGFiIGlzIGN1cnJlbnRseSBhY3RpdmUuXG4gICAgICovXG4gICAgaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgIC8qKiBQb3J0YWwgdGhhdCB3aWxsIGJlIHRoZSBob3N0ZWQgY29udGVudCBvZiB0aGUgdGFiICovXG4gICAgcHJpdmF0ZSBjb250ZW50UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCd0ZXh0TGFiZWwnKSB8fFxuICAgICAgICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZGlzYWJsZWQnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRlbnRQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwoXG4gICAgICAgICAgICB0aGlzLmV4cGxpY2l0Q29udGVudCB8fCB0aGlzLmltcGxpY2l0Q29udGVudCxcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McTabContent } from './tab-content';
import { McTabLabel } from './tab-label';
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
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhYnMvdGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUtMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0gsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3pDLE1BQU0sT0FBTyxTQUFTO0NBQUc7QUFDekIsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBc0MsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBYTFGLE1BQU0sT0FBTyxLQUFNLFNBQVEsY0FBYztJQXVEckMsWUFBb0IsZ0JBQWtDO1FBQ2xELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQXJDdEQsMEVBQTBFO1FBQzFELGNBQVMsR0FBVyxFQUFFLENBQUM7UUFhdkMsNERBQTREO1FBQ25ELGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU1Qzs7O1dBR0c7UUFDSCxhQUFRLEdBQWtCLElBQUksQ0FBQztRQUUvQjs7O1dBR0c7UUFDSCxXQUFNLEdBQWtCLElBQUksQ0FBQztRQUU3Qjs7V0FFRztRQUNILGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsd0RBQXdEO1FBQ2hELGtCQUFhLEdBQTBCLElBQUksQ0FBQztJQUlwRCxDQUFDO0lBeERELG9CQUFvQjtJQUNwQixJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQXVERCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQ25DLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsRUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUN4QixDQUFDO0lBQ04sQ0FBQzs7O1lBckZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsNEZBQTRGO2dCQUM1RiwrRkFBK0Y7Z0JBQy9GLGFBQWE7Z0JBQ2IsUUFBUSxFQUFFLHNEQUFzRDtnQkFDaEUsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNwQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxPQUFPO2FBQ3BCOzs7O1lBNUJHLGdCQUFnQjs7OzRCQW1DZixZQUFZLFNBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs4QkFLMUMsWUFBWSxTQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs4QkFJOUQsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7d0JBSXZDLEtBQUssU0FBQyxPQUFPO29CQUViLEtBQUssU0FBQyxPQUFPO3dCQUdiLEtBQUssU0FBQyxZQUFZOzZCQU1sQixLQUFLLFNBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIG1peGluRGlzYWJsZWRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNY1RhYkNvbnRlbnQgfSBmcm9tICcuL3RhYi1jb250ZW50JztcbmltcG9ydCB7IE1jVGFiTGFiZWwgfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5cblxuZXhwb3J0IGNsYXNzIE1jVGFiQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jVGFiQmFzZSA9IG1peGluRGlzYWJsZWQoTWNUYWJCYXNlKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10YWInLFxuICAgIC8vIENyZWF0ZSBhIHRlbXBsYXRlIGZvciB0aGUgY29udGVudCBvZiB0aGUgPG1jLXRhYj4gc28gdGhhdCB3ZSBjYW4gZ3JhYiBhIHJlZmVyZW5jZSB0byB0aGlzXG4gICAgLy8gVGVtcGxhdGVSZWYgYW5kIHVzZSBpdCBpbiBhIFBvcnRhbCB0byByZW5kZXIgdGhlIHRhYiBjb250ZW50IGluIHRoZSBhcHByb3ByaWF0ZSBwbGFjZSBpbiB0aGVcbiAgICAvLyB0YWItZ3JvdXAuXG4gICAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+JyxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGV4cG9ydEFzOiAnbWNUYWInXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiIGV4dGVuZHMgTWNUYWJNaXhpbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIENhbkRpc2FibGUsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIGdldCBjb250ZW50KCk6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRQb3J0YWw7XG4gICAgfVxuICAgIC8qKiBDb250ZW50IGZvciB0aGUgdGFiIGxhYmVsIGdpdmVuIGJ5IGA8bmctdGVtcGxhdGUgbWMtdGFiLWxhYmVsPmAuICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhYkxhYmVsLCB7IHN0YXRpYzogZmFsc2UgfSkgdGVtcGxhdGVMYWJlbDogTWNUYWJMYWJlbDtcblxuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIHByb3ZpZGVkIGluIHRoZSB0YWIgY29udGVudCB0aGF0IHdpbGwgYmUgdXNlZCBpZiBwcmVzZW50LCB1c2VkIHRvIGVuYWJsZSBsYXp5LWxvYWRpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKE1jVGFiQ29udGVudCwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gICAgZXhwbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIFRlbXBsYXRlIGluc2lkZSB0aGUgTWNUYWIgdmlldyB0aGF0IGNvbnRhaW5zIGFuIGA8bmctY29udGVudD5gLiAqL1xuICAgIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgaW1wbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIFBsYWluIHRleHQgbGFiZWwgZm9yIHRoZSB0YWIsIHVzZWQgd2hlbiB0aGVyZSBpcyBubyB0ZW1wbGF0ZSBsYWJlbC4gKi9cbiAgICBASW5wdXQoJ2xhYmVsJykgdGV4dExhYmVsOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgndGFiSWQnKSB0YWJJZDogc3RyaW5nO1xuXG4gICAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSB0YWIuICovXG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgdGhhdCB0aGUgdGFiIGlzIGxhYmVsbGVkIGJ5LlxuICAgICAqIFdpbGwgYmUgY2xlYXJlZCBpZiBgYXJpYS1sYWJlbGAgaXMgc2V0IGF0IHRoZSBzYW1lIHRpbWUuXG4gICAgICovXG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgdGFiIGNoYW5nZXMuICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSByZWxhdGl2ZWx5IGluZGV4ZWQgcG9zaXRpb24gd2hlcmUgMCByZXByZXNlbnRzIHRoZSBjZW50ZXIsIG5lZ2F0aXZlIGlzIGxlZnQsIGFuZCBwb3NpdGl2ZVxuICAgICAqIHJlcHJlc2VudHMgdGhlIHJpZ2h0LlxuICAgICAqL1xuICAgIHBvc2l0aW9uOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbml0aWFsIHJlbGF0aXZlbHkgaW5kZXggb3JpZ2luIG9mIHRoZSB0YWIgaWYgaXQgd2FzIGNyZWF0ZWQgYW5kIHNlbGVjdGVkIGFmdGVyIHRoZXJlXG4gICAgICogd2FzIGFscmVhZHkgYSBzZWxlY3RlZCB0YWIuIFByb3ZpZGVzIGNvbnRleHQgb2Ygd2hhdCBwb3NpdGlvbiB0aGUgdGFiIHNob3VsZCBvcmlnaW5hdGUgZnJvbS5cbiAgICAgKi9cbiAgICBvcmlnaW46IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGFiIGlzIGN1cnJlbnRseSBhY3RpdmUuXG4gICAgICovXG4gICAgaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgIC8qKiBQb3J0YWwgdGhhdCB3aWxsIGJlIHRoZSBob3N0ZWQgY29udGVudCBvZiB0aGUgdGFiICovXG4gICAgcHJpdmF0ZSBjb250ZW50UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgndGV4dExhYmVsJykgfHwgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGVudFBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbChcbiAgICAgICAgICAgIHRoaXMuZXhwbGljaXRDb250ZW50IHx8IHRoaXMuaW1wbGljaXRDb250ZW50LFxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19
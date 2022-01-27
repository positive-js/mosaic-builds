import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { mixinDisabled, PopUpPlacements } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McTabContent } from './tab-content.directive';
import { MC_TAB_LABEL, McTabLabel } from './tab-label.directive';
import * as i0 from "@angular/core";
export class McTabBase {
}
// tslint:disable-next-line:naming-convention
export const McTabMixinBase = mixinDisabled(McTabBase);
export class McTab extends McTabMixinBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this._tooltipTitle = '';
        this.tooltipPlacement = PopUpPlacements.Right;
        /** Plain text label for the tab, used when there is no template label. */
        this.textLabel = '';
        this.empty = false;
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
        this._overflowTooltipTitle = '';
        /** Portal that will be the hosted content of the tab */
        this.contentPortal = null;
    }
    /** @docs-private */
    get content() {
        return this.contentPortal;
    }
    get templateLabel() {
        return this._templateLabel;
    }
    set templateLabel(value) {
        this.setTemplateLabelInput(value);
    }
    get tooltipTitle() {
        return this.overflowTooltipTitle + this._tooltipTitle;
    }
    set tooltipTitle(value) {
        this._tooltipTitle = value;
    }
    get isOverflown() {
        return !!this._overflowTooltipTitle;
    }
    get overflowTooltipTitle() {
        if (this.isOverflown) {
            return `${this._overflowTooltipTitle}\n`;
        }
        return '';
    }
    set overflowTooltipTitle(value) {
        this._overflowTooltipTitle = value;
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
/** @nocollapse */ /** @nocollapse */ McTab.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTab, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTab.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McTab, selector: "mc-tab", inputs: { disabled: "disabled", tooltipTitle: "tooltipTitle", tooltipPlacement: "tooltipPlacement", textLabel: ["label", "textLabel"], empty: "empty", tabId: "tabId" }, queries: [{ propertyName: "templateLabel", first: true, predicate: MC_TAB_LABEL, descendants: true }, { propertyName: "explicitContent", first: true, predicate: McTabContent, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "implicitContent", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["mcTab"], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: '<ng-template><ng-content></ng-content></ng-template>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTab, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tab',
                    exportAs: 'mcTab',
                    // Create a template for the content of the <mc-tab> so that we can grab a reference to this
                    // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
                    // tab-group.
                    template: '<ng-template><ng-content></ng-content></ng-template>',
                    inputs: ['disabled'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { templateLabel: [{
                type: ContentChild,
                args: [MC_TAB_LABEL]
            }], explicitContent: [{
                type: ContentChild,
                args: [McTabContent, { read: TemplateRef, static: true }]
            }], implicitContent: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], tooltipTitle: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], textLabel: [{
                type: Input,
                args: ['label']
            }], empty: [{
                type: Input
            }], tabId: [{
                type: Input,
                args: ['tabId']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWJzL3RhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBS0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxhQUFhLEVBQ2IsZUFBZSxFQUNsQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBR2pFLE1BQU0sT0FBTyxTQUFTO0NBQUc7QUFFekIsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBc0MsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBYTFGLE1BQU0sT0FBTyxLQUFNLFNBQVEsY0FBYztJQXNGckMsWUFBNkIsZ0JBQWtDO1FBQzNELEtBQUssRUFBRSxDQUFDO1FBRGlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFwRHZELGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBRWxCLHFCQUFnQixHQUFvQixlQUFlLENBQUMsS0FBSyxDQUFDO1FBRW5FLDBFQUEwRTtRQUMxRCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXRCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFJdkIsNERBQTREO1FBQ25ELGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU1Qzs7O1dBR0c7UUFDSCxhQUFR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TUFBTSxFQUFFLElBQUksRUFBRTtnQkFHcEMsWUFBWTtzQkFEZixLQUFLO2dCQVdHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFHVSxTQUFTO3NCQUF4QixLQUFLO3VCQUFDLE9BQU87Z0JBRUwsS0FBSztzQkFBYixLQUFLO2dCQUVVLEtBQUs7c0JBQXBCLEtBQUs7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIFBvcFVwUGxhY2VtZW50c1xufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jVGFiQ29udGVudCB9IGZyb20gJy4vdGFiLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1DX1RBQl9MQUJFTCwgTWNUYWJMYWJlbCB9IGZyb20gJy4vdGFiLWxhYmVsLmRpcmVjdGl2ZSc7XG5cblxuZXhwb3J0IGNsYXNzIE1jVGFiQmFzZSB7fVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RhYk1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNUYWJCYXNlID0gbWl4aW5EaXNhYmxlZChNY1RhYkJhc2UpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRhYicsXG4gICAgZXhwb3J0QXM6ICdtY1RhYicsXG4gICAgLy8gQ3JlYXRlIGEgdGVtcGxhdGUgZm9yIHRoZSBjb250ZW50IG9mIHRoZSA8bWMtdGFiPiBzbyB0aGF0IHdlIGNhbiBncmFiIGEgcmVmZXJlbmNlIHRvIHRoaXNcbiAgICAvLyBUZW1wbGF0ZVJlZiBhbmQgdXNlIGl0IGluIGEgUG9ydGFsIHRvIHJlbmRlciB0aGUgdGFiIGNvbnRlbnQgaW4gdGhlIGFwcHJvcHJpYXRlIHBsYWNlIGluIHRoZVxuICAgIC8vIHRhYi1ncm91cC5cbiAgICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT4nLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNUYWIgZXh0ZW5kcyBNY1RhYk1peGluQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgQ2FuRGlzYWJsZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIC8qKiBAZG9jcy1wcml2YXRlICovXG4gICAgZ2V0IGNvbnRlbnQoKTogVGVtcGxhdGVQb3J0YWwgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudFBvcnRhbDtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkKE1DX1RBQl9MQUJFTClcbiAgICBnZXQgdGVtcGxhdGVMYWJlbCgpOiBNY1RhYkxhYmVsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlTGFiZWw7XG4gICAgfVxuXG4gICAgc2V0IHRlbXBsYXRlTGFiZWwodmFsdWU6IE1jVGFiTGFiZWwpIHtcbiAgICAgICAgdGhpcy5zZXRUZW1wbGF0ZUxhYmVsSW5wdXQodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RlbXBsYXRlTGFiZWw6IE1jVGFiTGFiZWw7XG5cbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSBwcm92aWRlZCBpbiB0aGUgdGFiIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHVzZWQgaWYgcHJlc2VudCwgdXNlZCB0byBlbmFibGUgbGF6eS1sb2FkaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChNY1RhYkNvbnRlbnQsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBleHBsaWNpdENvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKiogVGVtcGxhdGUgaW5zaWRlIHRoZSBNY1RhYiB2aWV3IHRoYXQgY29udGFpbnMgYW4gYDxuZy1jb250ZW50PmAuICovXG4gICAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IHRydWUgfSkgaW1wbGljaXRDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdG9vbHRpcFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJmbG93VG9vbHRpcFRpdGxlICsgdGhpcy5fdG9vbHRpcFRpdGxlO1xuICAgIH1cblxuICAgIHNldCB0b29sdGlwVGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl90b29sdGlwVGl0bGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90b29sdGlwVGl0bGUgPSAnJztcblxuICAgIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBvcFVwUGxhY2VtZW50cyA9IFBvcFVwUGxhY2VtZW50cy5SaWdodDtcblxuICAgIC8qKiBQbGFpbiB0ZXh0IGxhYmVsIGZvciB0aGUgdGFiLCB1c2VkIHdoZW4gdGhlcmUgaXMgbm8gdGVtcGxhdGUgbGFiZWwuICovXG4gICAgQElucHV0KCdsYWJlbCcpIHRleHRMYWJlbCA9ICcnO1xuXG4gICAgQElucHV0KCkgZW1wdHkgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgndGFiSWQnKSB0YWJJZDogc3RyaW5nO1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgdGFiIGNoYW5nZXMuICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSByZWxhdGl2ZWx5IGluZGV4ZWQgcG9zaXRpb24gd2hlcmUgMCByZXByZXNlbnRzIHRoZSBjZW50ZXIsIG5lZ2F0aXZlIGlzIGxlZnQsIGFuZCBwb3NpdGl2ZVxuICAgICAqIHJlcHJlc2VudHMgdGhlIHJpZ2h0LlxuICAgICAqL1xuICAgIHBvc2l0aW9uOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbml0aWFsIHJlbGF0aXZlbHkgaW5kZXggb3JpZ2luIG9mIHRoZSB0YWIgaWYgaXQgd2FzIGNyZWF0ZWQgYW5kIHNlbGVjdGVkIGFmdGVyIHRoZXJlXG4gICAgICogd2FzIGFscmVhZHkgYSBzZWxlY3RlZCB0YWIuIFByb3ZpZGVzIGNvbnRleHQgb2Ygd2hhdCBwb3NpdGlvbiB0aGUgdGFiIHNob3VsZCBvcmlnaW5hdGUgZnJvbS5cbiAgICAgKi9cbiAgICBvcmlnaW46IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGFiIGlzIGN1cnJlbnRseSBhY3RpdmUuXG4gICAgICovXG4gICAgaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgIGdldCBpc092ZXJmbG93bigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fb3ZlcmZsb3dUb29sdGlwVGl0bGU7XG4gICAgfVxuXG4gICAgZ2V0IG92ZXJmbG93VG9vbHRpcFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmlzT3ZlcmZsb3duKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5fb3ZlcmZsb3dUb29sdGlwVGl0bGV9XFxuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBzZXQgb3ZlcmZsb3dUb29sdGlwVGl0bGUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9vdmVyZmxvd1Rvb2x0aXBUaXRsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX292ZXJmbG93VG9vbHRpcFRpdGxlID0gJyc7XG5cbiAgICAvKiogUG9ydGFsIHRoYXQgd2lsbCBiZSB0aGUgaG9zdGVkIGNvbnRlbnQgb2YgdGhlIHRhYiAqL1xuICAgIHByaXZhdGUgY29udGVudFBvcnRhbDogVGVtcGxhdGVQb3J0YWwgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3RleHRMYWJlbCcpIHx8IGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRlbnRQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5leHBsaWNpdENvbnRlbnQgfHwgdGhpcy5pbXBsaWNpdENvbnRlbnQsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBoYXMgYmVlbiBleHRyYWN0ZWQgdG8gYSB1dGlsIGJlY2F1c2Ugb2YgVFMgNCBhbmQgVkUuXG4gICAgICogVmlldyBFbmdpbmUgZG9lc24ndCBzdXBwb3J0IHByb3BlcnR5IHJlbmFtZSBpbmhlcml0YW5jZS5cbiAgICAgKiBUUyA0LjAgZG9lc24ndCBhbGxvdyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGFjY2Vzc29ycyBvciB2aWNlLXZlcnNhLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc2V0VGVtcGxhdGVMYWJlbElucHV0KHZhbHVlOiBNY1RhYkxhYmVsKSB7XG4gICAgICAgIC8vIE9ubHkgdXBkYXRlIHRoZSB0ZW1wbGF0ZUxhYmVsIHZpYSBxdWVyeSBpZiB0aGVyZSBpcyBhY3R1YWxseVxuICAgICAgICAvLyBhIE1jVGFiTGFiZWwgZm91bmQuIFRoaXMgd29ya3MgYXJvdW5kIGFuIGlzc3VlIHdoZXJlIGEgdXNlciBtYXkgaGF2ZVxuICAgICAgICAvLyBtYW51YWxseSBzZXQgYHRlbXBsYXRlTGFiZWxgIGR1cmluZyBjcmVhdGlvbiBtb2RlLCB3aGljaCB3b3VsZCB0aGVuIGdldCBjbG9iYmVyZWRcbiAgICAgICAgLy8gYnkgYHVuZGVmaW5lZGAgd2hlbiB0aGlzIHF1ZXJ5IHJlc29sdmVzLlxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RlbXBsYXRlTGFiZWwgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
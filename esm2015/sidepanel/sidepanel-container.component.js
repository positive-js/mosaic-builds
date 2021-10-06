import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, ViewChild, ViewEncapsulation } from '@angular/core';
import { mcSidepanelAnimations, McSidepanelAnimationState, mcSidepanelTransformAnimation } from './sidepanel-animations';
import { McSidepanelConfig } from './sidepanel-config';
import * as i0 from "@angular/core";
import * as i1 from "./sidepanel-config";
import * as i2 from "@ptsecurity/mosaic/button";
import * as i3 from "@ptsecurity/mosaic/icon";
import * as i4 from "@angular/common";
import * as i5 from "@angular/cdk/portal";
export const MC_SIDEPANEL_WITH_INDENT = new InjectionToken('mc-sidepanel-with-indent');
export const MC_SIDEPANEL_WITH_SHADOW = new InjectionToken('mc-sidepanel-with-shadow');
export class McSidepanelContainerComponent extends BasePortalOutlet {
    constructor(elementRef, changeDetectorRef, sidepanelConfig, withIndent, withShadow) {
        super();
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.sidepanelConfig = sidepanelConfig;
        this.withIndent = withIndent;
        this.withShadow = withShadow;
        /** The state of the sidepanel animations. */
        this.animationState = McSidepanelAnimationState.Void;
        /** Emits whenever the state of the animation changes. */
        this.animationStateChanged = new EventEmitter();
    }
    ngOnDestroy() {
        this.destroyed = true;
    }
    /** Attach a component portal as content to this sidepanel container. */
    attachComponentPortal(portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachComponentPortal(portal);
    }
    /** Attach a template portal as content to this sidepanel container. */
    attachTemplatePortal(portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachTemplatePortal(portal);
    }
    /** Begin animation of the sidepanel entrance into view. */
    enter() {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Visible;
            this.changeDetectorRef.detectChanges();
        }
    }
    /** Begin animation of the sidepanel exiting from view. */
    exit() {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Hidden;
            this.changeDetectorRef.markForCheck();
        }
    }
    onAnimation(event) {
        this.animationStateChanged.emit(event);
    }
    setAnimation() {
        const position = this.sidepanelConfig.position;
        this.animationTransform = {
            transformIn: mcSidepanelTransformAnimation[position].in,
            transformOut: mcSidepanelTransformAnimation[position].out
        };
    }
    setPanelClass() {
        const element = this.elementRef.nativeElement;
        const position = this.sidepanelConfig.position;
        element.classList.add(`mc-sidepanel-container_${position}`);
        if (this.withShadow) {
            element.classList.add('mc-sidepanel-container_shadowed');
        }
    }
    validatePortalAttached() {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    }
}
/** @nocollapse */ McSidepanelContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelContainerComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.McSidepanelConfig }, { token: MC_SIDEPANEL_WITH_INDENT }, { token: MC_SIDEPANEL_WITH_SHADOW }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McSidepanelContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McSidepanelContainerComponent, selector: "mc-sidepanel-container", host: { attributes: { "role": "dialog", "aria-modal": "true" }, listeners: { "@state.start": "onAnimation($event)", "@state.done": "onAnimation($event)" }, properties: { "attr.id": "id", "attr.tabindex": "-1", "@state": "{\n            value: animationState,\n            params: animationTransform\n        }" }, classAttribute: "mc-sidepanel-container" }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-sidepanel-wrapper\">\n\n    <button *ngIf=\"withIndent\"\n            class=\"mc-sidepanel-indent mc-button_transparent\"\n            mc-button\n            (click)=\"exit()\">\n        <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" [color]=\"'second'\"></i>\n    </button>\n\n    <div class=\"mc-sidepanel-content\">\n        <ng-template cdkPortalOutlet></ng-template>\n    </div>\n</div>\n", styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-sidepanel-container{outline:none;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translate(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translate(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_top,.mc-sidepanel-container_bottom{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_top .mc-sidepanel-indent,.mc-sidepanel-container_bottom .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;background:transparent;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;padding:var(--mc-sidepanel-header-size-padding, 14px 16px);display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;background:transparent;padding:0 0 0 8px;padding:var(--mc-sidepanel-header-size-close-padding, 0 0 0 8px)}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;padding:var(--mc-sidepanel-footer-size-padding, 16px);display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}\n"], components: [{ type: i2.McButton, selector: "button[mc-button]", inputs: ["disabled", "color"] }, { type: i3.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.McButtonCssStyler, selector: "button[mc-button], a[mc-button]" }, { type: i3.McIconCSSStyler, selector: "[mc-icon]" }, { type: i5.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [mcSidepanelAnimations.sidepanelState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-sidepanel-container',
                    templateUrl: './sidepanel-container.component.html',
                    styleUrls: ['./sidepanel.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [mcSidepanelAnimations.sidepanelState],
                    host: {
                        class: 'mc-sidepanel-container',
                        role: 'dialog',
                        'aria-modal': 'true',
                        '[attr.id]': 'id',
                        '[attr.tabindex]': '-1',
                        '[@state]': `{
            value: animationState,
            params: animationTransform
        }`,
                        '(@state.start)': 'onAnimation($event)',
                        '(@state.done)': 'onAnimation($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.McSidepanelConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_SIDEPANEL_WITH_INDENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_SIDEPANEL_WITH_SHADOW]
                }] }]; }, propDecorators: { portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3NpZGVwYW5lbC9zaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQW1DLE1BQU0scUJBQXFCLENBQUM7QUFDekcsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFFZCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDSCxxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUNoQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBdUIsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7OztBQUc1RSxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLGNBQWMsQ0FBVSwwQkFBMEIsQ0FBQyxDQUFDO0FBRWhHLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLElBQUksY0FBYyxDQUFVLDBCQUEwQixDQUFDLENBQUM7QUF1QmhHLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxnQkFBZ0I7SUFrQi9ELFlBQ1ksVUFBbUMsRUFDbkMsaUJBQW9DLEVBQ3JDLGVBQWtDLEVBQ0EsVUFBbUIsRUFDbkIsVUFBbUI7UUFFNUQsS0FBSyxFQUFFLENBQUM7UUFOQSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3JDLG9CQUFlLEdBQWYsZUFBZSxDQUFt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LEVBQUUsd0JBQXdCO29CQUNsQyxXQUFXLEVBQUUsc0NBQXNDO29CQUNuRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDL0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUM7b0JBQ2xELElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsd0JBQXdCO3dCQUMvQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxZQUFZLEVBQUUsTUFBTTt3QkFDcEIsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLGlCQUFpQixFQUFFLElBQUk7d0JBQ3ZCLFVBQVUsRUFBRTs7O1VBR1Y7d0JBQ0YsZ0JBQWdCLEVBQUUscUJBQXFCO3dCQUN2QyxlQUFlLEVBQUUscUJBQXFCO3FCQUN6QztpQkFDSjs7MEJBdUJRLE1BQU07MkJBQUMsd0JBQXdCOzswQkFDL0IsTUFBTTsyQkFBQyx3QkFBd0I7NENBbEJRLFlBQVk7c0JBQXZELFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCYXNlUG9ydGFsT3V0bGV0LCBDZGtQb3J0YWxPdXRsZXQsIENvbXBvbmVudFBvcnRhbCwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgbWNTaWRlcGFuZWxBbmltYXRpb25zLFxuICAgIE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUsXG4gICAgbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25cbn0gZnJvbSAnLi9zaWRlcGFuZWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbENvbmZpZywgTWNTaWRlcGFuZWxQb3NpdGlvbiB9IGZyb20gJy4vc2lkZXBhbmVsLWNvbmZpZyc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX1NJREVQQU5FTF9XSVRIX0lOREVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignbWMtc2lkZXBhbmVsLXdpdGgtaW5kZW50Jyk7XG5cbmV4cG9ydCBjb25zdCBNQ19TSURFUEFORUxfV0lUSF9TSEFET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ21jLXNpZGVwYW5lbC13aXRoLXNoYWRvdycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXNpZGVwYW5lbC1jb250YWluZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaWRlcGFuZWwuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgYW5pbWF0aW9uczogW21jU2lkZXBhbmVsQW5pbWF0aW9ucy5zaWRlcGFuZWxTdGF0ZV0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1jb250YWluZXInLFxuICAgICAgICByb2xlOiAnZGlhbG9nJyxcbiAgICAgICAgJ2FyaWEtbW9kYWwnOiAndHJ1ZScsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJy0xJyxcbiAgICAgICAgJ1tAc3RhdGVdJzogYHtcbiAgICAgICAgICAgIHZhbHVlOiBhbmltYXRpb25TdGF0ZSxcbiAgICAgICAgICAgIHBhcmFtczogYW5pbWF0aW9uVHJhbnNmb3JtXG4gICAgICAgIH1gLFxuICAgICAgICAnKEBzdGF0ZS5zdGFydCknOiAnb25BbmltYXRpb24oJGV2ZW50KScsXG4gICAgICAgICcoQHN0YXRlLmRvbmUpJzogJ29uQW5pbWF0aW9uKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCBleHRlbmRzIEJhc2VQb3J0YWxPdXRsZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKiBJRCBmb3IgdGhlIGNvbnRhaW5lciBET00gZWxlbWVudC4gKi9cbiAgICBpZDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBwb3J0YWwgb3V0bGV0IGluc2lkZSBvZiB0aGlzIGNvbnRhaW5lciBpbnRvIHdoaWNoIHRoZSBjb250ZW50IHdpbGwgYmUgbG9hZGVkLiAqL1xuICAgIEBWaWV3Q2hpbGQoQ2RrUG9ydGFsT3V0bGV0LCB7c3RhdGljOiB0cnVlfSkgcG9ydGFsT3V0bGV0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgICAvKiogVGhlIHN0YXRlIG9mIHRoZSBzaWRlcGFuZWwgYW5pbWF0aW9ucy4gKi9cbiAgICBhbmltYXRpb25TdGF0ZTogTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZSA9IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUuVm9pZDtcblxuICAgIGFuaW1hdGlvblRyYW5zZm9ybTogeyB0cmFuc2Zvcm1Jbjogc3RyaW5nOyB0cmFuc2Zvcm1PdXQ6IHN0cmluZyB9O1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBzdGF0ZSBvZiB0aGUgYW5pbWF0aW9uIGNoYW5nZXMuICovXG4gICAgYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgZGVzdHJveWVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgc2lkZXBhbmVsQ29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyxcbiAgICAgICAgQEluamVjdChNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQpIHB1YmxpYyB3aXRoSW5kZW50OiBib29sZWFuLFxuICAgICAgICBASW5qZWN0KE1DX1NJREVQQU5FTF9XSVRIX1NIQURPVykgcHVibGljIHdpdGhTaGFkb3c6IGJvb2xlYW5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKiBBdHRhY2ggYSBjb21wb25lbnQgcG9ydGFsIGFzIGNvbnRlbnQgdG8gdGhpcyBzaWRlcGFuZWwgY29udGFpbmVyLiAqL1xuICAgIGF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxUPik6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb3J0YWxBdHRhY2hlZCgpO1xuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnNldFBhbmVsQ2xhc3MoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gICAgfVxuXG4gICAgLyoqIEF0dGFjaCBhIHRlbXBsYXRlIHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc2lkZXBhbmVsIGNvbnRhaW5lci4gKi9cbiAgICBhdHRhY2hUZW1wbGF0ZVBvcnRhbDxDPihwb3J0YWw6IFRlbXBsYXRlUG9ydGFsPEM+KTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVBvcnRhbEF0dGFjaGVkKCk7XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuc2V0UGFuZWxDbGFzcygpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbE91dGxldC5hdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWwpO1xuICAgIH1cblxuICAgIC8qKiBCZWdpbiBhbmltYXRpb24gb2YgdGhlIHNpZGVwYW5lbCBlbnRyYW5jZSBpbnRvIHZpZXcuICovXG4gICAgZW50ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLlZpc2libGU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBCZWdpbiBhbmltYXRpb24gb2YgdGhlIHNpZGVwYW5lbCBleGl0aW5nIGZyb20gdmlldy4gKi9cbiAgICBleGl0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZS5IaWRkZW47XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbmltYXRpb24oZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0QW5pbWF0aW9uKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbjogTWNTaWRlcGFuZWxQb3NpdGlvbiA9IHRoaXMuc2lkZXBhbmVsQ29uZmlnLnBvc2l0aW9uITtcblxuICAgICAgICB0aGlzLmFuaW1hdGlvblRyYW5zZm9ybSA9IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybUluOiBtY1NpZGVwYW5lbFRyYW5zZm9ybUFuaW1hdGlvbltwb3NpdGlvbl0uaW4sXG4gICAgICAgICAgICB0cmFuc2Zvcm1PdXQ6IG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uW3Bvc2l0aW9uXS5vdXRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFBhbmVsQ2xhc3MoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uOiBNY1NpZGVwYW5lbFBvc2l0aW9uID0gdGhpcy5zaWRlcGFuZWxDb25maWcucG9zaXRpb24hO1xuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWMtc2lkZXBhbmVsLWNvbnRhaW5lcl8ke3Bvc2l0aW9ufWApO1xuXG4gICAgICAgIGlmICh0aGlzLndpdGhTaGFkb3cpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtc2lkZXBhbmVsLWNvbnRhaW5lcl9zaGFkb3dlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVBvcnRhbEF0dGFjaGVkKCkge1xuICAgICAgICBpZiAodGhpcy5wb3J0YWxPdXRsZXQuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0F0dGVtcHRpbmcgdG8gYXR0YWNoIHNpZGVwYW5lbCBjb250ZW50IGFmdGVyIGNvbnRlbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1jLXNpZGVwYW5lbC13cmFwcGVyXCI+XG5cbiAgICA8YnV0dG9uICpuZ0lmPVwid2l0aEluZGVudFwiXG4gICAgICAgICAgICBjbGFzcz1cIm1jLXNpZGVwYW5lbC1pbmRlbnQgbWMtYnV0dG9uX3RyYW5zcGFyZW50XCJcbiAgICAgICAgICAgIG1jLWJ1dHRvblxuICAgICAgICAgICAgKGNsaWNrKT1cImV4aXQoKVwiPlxuICAgICAgICA8aSBtYy1pY29uPVwibWMtY2xvc2UtTF8xNlwiIGNsYXNzPVwibWMtaWNvbiBtYy1pY29uX2xpZ2h0XCIgW2NvbG9yXT1cIidzZWNvbmQnXCI+PC9pPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLXNpZGVwYW5lbC1jb250ZW50XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBjZGtQb3J0YWxPdXRsZXQ+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19
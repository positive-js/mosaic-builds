import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, ViewChild, ViewEncapsulation } from '@angular/core';
import { mcSidepanelAnimations, McSidepanelAnimationState, mcSidepanelTransformAnimation } from './sidepanel-animations';
import { McSidepanelConfig } from './sidepanel-config';
import * as i0 from "@angular/core";
import * as i1 from "./sidepanel-config";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/a11y";
import * as i4 from "@angular/cdk/portal";
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
        if (this.destroyed) {
            return;
        }
        this.animationState = McSidepanelAnimationState.Visible;
        this.changeDetectorRef.detectChanges();
    }
    /** Begin animation of the sidepanel exiting from view. */
    exit() {
        if (this.destroyed) {
            return;
        }
        this.animationState = McSidepanelAnimationState.Hidden;
        this.changeDetectorRef.markForCheck();
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
    }
    validatePortalAttached() {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    }
}
/** @nocollapse */ McSidepanelContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelContainerComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.McSidepanelConfig }, { token: MC_SIDEPANEL_WITH_INDENT }, { token: MC_SIDEPANEL_WITH_SHADOW }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McSidepanelContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McSidepanelContainerComponent, selector: "mc-sidepanel-container", host: { listeners: { "@state.start": "onAnimation($event)", "@state.done": "onAnimation($event)" }, properties: { "class.mc-sidepanel_nested": "withIndent", "class.mc-sidepanel-container_shadowed": "withShadow", "attr.id": "id", "attr.tabindex": "-1", "@state": "{\n            value: animationState,\n            params: animationTransform\n        }" }, classAttribute: "mc-sidepanel-container" }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-sidepanel-wrapper\">\n\n    <div *ngIf=\"withIndent\" class=\"mc-sidepanel-indent\" (click)=\"exit()\"></div>\n\n    <div class=\"mc-sidepanel-content\" cdkTrapFocus cdkTrapFocusAutoCapture>\n        <ng-template cdkPortalOutlet></ng-template>\n    </div>\n</div>\n", styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-sidepanel-container{outline:none;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translate(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translate(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_top,.mc-sidepanel-container_bottom{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_top .mc-sidepanel-indent,.mc-sidepanel-container_bottom .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;background:transparent;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;padding:var(--mc-sidepanel-header-size-padding, 14px 16px);display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;background:transparent;padding:0 0 0 8px;padding:var(--mc-sidepanel-header-size-close-padding, 0 0 0 8px)}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;padding:var(--mc-sidepanel-footer-size-padding, 16px);display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i4.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [mcSidepanelAnimations.sidepanelState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
                        '[class.mc-sidepanel_nested]': 'withIndent',
                        '[class.mc-sidepanel-container_shadowed]': 'withShadow',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3NpZGVwYW5lbC9zaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQW1DLE1BQU0scUJBQXFCLENBQUM7QUFDekcsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFFZCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDSCxxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUNoQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBdUIsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBRzVFLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLElBQUksY0FBYyxDQUFVLDBCQUEwQixDQUFDLENBQUM7QUFFaEcsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxjQUFjLENBQVUsMEJBQTBCLENBQUMsQ0FBQztBQXVCaEcsTUFBTSxPQUFPLDZCQUE4QixTQUFRLGdCQUFnQjtJQWtCL0QsWUFDWSxVQUFtQyxFQUNuQyxpQkFBb0MsRUFDckMsZUFBa0MsRUFDQSxVQUFtQixFQUNuQixVQUFtQjtRQUU1RCxLQUFLLEVBQUUsQ0FBQztRQU5BLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDckMsb0JBQWUsR0FBZixlQUFlLENBQW1C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QWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsVUFBVSxFQUFFLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDO29CQUNsRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsNkJBQTZCLEVBQUUsWUFBWTt3QkFDM0MseUNBQXlDLEVBQUUsWUFBWTt3QkFDdkQsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLGlCQUFpQixFQUFFLElBQUk7d0JBQ3ZCLFVBQVUsRUFBRTs7O1VBR1Y7d0JBQ0YsZ0JBQWdCLEVBQUUscUJBQXFCO3dCQUN2QyxlQUFlLEVBQUUscUJBQXFCO3FCQUN6QztpQkFDSjs7MEJBdUJRLE1BQU07MkJBQUMsd0JBQXdCOzswQkFDL0IsTUFBTTsyQkFBQyx3QkFBd0I7NENBbEJVLFlBQVk7c0JBQXpELFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCYXNlUG9ydGFsT3V0bGV0LCBDZGtQb3J0YWxPdXRsZXQsIENvbXBvbmVudFBvcnRhbCwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgbWNTaWRlcGFuZWxBbmltYXRpb25zLFxuICAgIE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUsXG4gICAgbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25cbn0gZnJvbSAnLi9zaWRlcGFuZWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbENvbmZpZywgTWNTaWRlcGFuZWxQb3NpdGlvbiB9IGZyb20gJy4vc2lkZXBhbmVsLWNvbmZpZyc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX1NJREVQQU5FTF9XSVRIX0lOREVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignbWMtc2lkZXBhbmVsLXdpdGgtaW5kZW50Jyk7XG5cbmV4cG9ydCBjb25zdCBNQ19TSURFUEFORUxfV0lUSF9TSEFET1cgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ21jLXNpZGVwYW5lbC13aXRoLXNoYWRvdycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXNpZGVwYW5lbC1jb250YWluZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaWRlcGFuZWwuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgYW5pbWF0aW9uczogW21jU2lkZXBhbmVsQW5pbWF0aW9ucy5zaWRlcGFuZWxTdGF0ZV0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1jb250YWluZXInLFxuICAgICAgICAnW2NsYXNzLm1jLXNpZGVwYW5lbF9uZXN0ZWRdJzogJ3dpdGhJbmRlbnQnLFxuICAgICAgICAnW2NsYXNzLm1jLXNpZGVwYW5lbC1jb250YWluZXJfc2hhZG93ZWRdJzogJ3dpdGhTaGFkb3cnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICctMScsXG4gICAgICAgICdbQHN0YXRlXSc6IGB7XG4gICAgICAgICAgICB2YWx1ZTogYW5pbWF0aW9uU3RhdGUsXG4gICAgICAgICAgICBwYXJhbXM6IGFuaW1hdGlvblRyYW5zZm9ybVxuICAgICAgICB9YCxcbiAgICAgICAgJyhAc3RhdGUuc3RhcnQpJzogJ29uQW5pbWF0aW9uKCRldmVudCknLFxuICAgICAgICAnKEBzdGF0ZS5kb25lKSc6ICdvbkFuaW1hdGlvbigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlUG9ydGFsT3V0bGV0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKiogSUQgZm9yIHRoZSBjb250YWluZXIgRE9NIGVsZW1lbnQuICovXG4gICAgaWQ6IHN0cmluZztcblxuICAgIC8qKiBUaGUgcG9ydGFsIG91dGxldCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwgeyBzdGF0aWM6IHRydWUgfSkgcG9ydGFsT3V0bGV0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgICAvKiogVGhlIHN0YXRlIG9mIHRoZSBzaWRlcGFuZWwgYW5pbWF0aW9ucy4gKi9cbiAgICBhbmltYXRpb25TdGF0ZTogTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZSA9IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUuVm9pZDtcblxuICAgIGFuaW1hdGlvblRyYW5zZm9ybTogeyB0cmFuc2Zvcm1Jbjogc3RyaW5nOyB0cmFuc2Zvcm1PdXQ6IHN0cmluZyB9O1xuXG4gICAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBzdGF0ZSBvZiB0aGUgYW5pbWF0aW9uIGNoYW5nZXMuICovXG4gICAgYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICAgIHByaXZhdGUgZGVzdHJveWVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgc2lkZXBhbmVsQ29uZmlnOiBNY1NpZGVwYW5lbENvbmZpZyxcbiAgICAgICAgQEluamVjdChNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQpIHB1YmxpYyB3aXRoSW5kZW50OiBib29sZWFuLFxuICAgICAgICBASW5qZWN0KE1DX1NJREVQQU5FTF9XSVRIX1NIQURPVykgcHVibGljIHdpdGhTaGFkb3c6IGJvb2xlYW5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKiBBdHRhY2ggYSBjb21wb25lbnQgcG9ydGFsIGFzIGNvbnRlbnQgdG8gdGhpcyBzaWRlcGFuZWwgY29udGFpbmVyLiAqL1xuICAgIGF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxUPik6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb3J0YWxBdHRhY2hlZCgpO1xuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnNldFBhbmVsQ2xhc3MoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gICAgfVxuXG4gICAgLyoqIEF0dGFjaCBhIHRlbXBsYXRlIHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc2lkZXBhbmVsIGNvbnRhaW5lci4gKi9cbiAgICBhdHRhY2hUZW1wbGF0ZVBvcnRhbDxDPihwb3J0YWw6IFRlbXBsYXRlUG9ydGFsPEM+KTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVBvcnRhbEF0dGFjaGVkKCk7XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuc2V0UGFuZWxDbGFzcygpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbE91dGxldC5hdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWwpO1xuICAgIH1cblxuICAgIC8qKiBCZWdpbiBhbmltYXRpb24gb2YgdGhlIHNpZGVwYW5lbCBlbnRyYW5jZSBpbnRvIHZpZXcuICovXG4gICAgZW50ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZS5WaXNpYmxlO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBzaWRlcGFuZWwgZXhpdGluZyBmcm9tIHZpZXcuICovXG4gICAgZXhpdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLkhpZGRlbjtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvbihldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRBbmltYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uOiBNY1NpZGVwYW5lbFBvc2l0aW9uID0gdGhpcy5zaWRlcGFuZWxDb25maWcucG9zaXRpb24hO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uVHJhbnNmb3JtID0ge1xuICAgICAgICAgICAgdHJhbnNmb3JtSW46IG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uW3Bvc2l0aW9uXS5pbixcbiAgICAgICAgICAgIHRyYW5zZm9ybU91dDogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bcG9zaXRpb25dLm91dFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UGFuZWxDbGFzcygpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgcG9zaXRpb246IE1jU2lkZXBhbmVsUG9zaXRpb24gPSB0aGlzLnNpZGVwYW5lbENvbmZpZy5wb3NpdGlvbiE7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGBtYy1zaWRlcGFuZWwtY29udGFpbmVyXyR7cG9zaXRpb259YCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVBvcnRhbEF0dGFjaGVkKCkge1xuICAgICAgICBpZiAodGhpcy5wb3J0YWxPdXRsZXQuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0F0dGVtcHRpbmcgdG8gYXR0YWNoIHNpZGVwYW5lbCBjb250ZW50IGFmdGVyIGNvbnRlbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1jLXNpZGVwYW5lbC13cmFwcGVyXCI+XG5cbiAgICA8ZGl2ICpuZ0lmPVwid2l0aEluZGVudFwiIGNsYXNzPVwibWMtc2lkZXBhbmVsLWluZGVudFwiIChjbGljayk9XCJleGl0KClcIj48L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy1zaWRlcGFuZWwtY29udGVudFwiIGNka1RyYXBGb2N1cyBjZGtUcmFwRm9jdXNBdXRvQ2FwdHVyZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIGNka1BvcnRhbE91dGxldD48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuPC9kaXY+XG4iXX0=
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, ViewChild, ViewEncapsulation } from '@angular/core';
import { mcSidepanelAnimations, McSidepanelAnimationState, mcSidepanelTransformAnimation } from './sidepanel-animations';
import { McSidepanelConfig } from './sidepanel-config';
import * as i0 from "@angular/core";
import * as i1 from "./sidepanel-config";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/portal";
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
    }
    validatePortalAttached() {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    }
}
/** @nocollapse */ McSidepanelContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelContainerComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.McSidepanelConfig }, { token: MC_SIDEPANEL_WITH_INDENT }, { token: MC_SIDEPANEL_WITH_SHADOW }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McSidepanelContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McSidepanelContainerComponent, selector: "mc-sidepanel-container", host: { attributes: { "role": "dialog", "aria-modal": "true" }, listeners: { "@state.start": "onAnimation($event)", "@state.done": "onAnimation($event)" }, properties: { "class.mc-sidepanel_nested": "withIndent", "class.mc-sidepanel-container_shadowed": "withShadow", "attr.id": "id", "attr.tabindex": "-1", "@state": "{\n            value: animationState,\n            params: animationTransform\n        }" }, classAttribute: "mc-sidepanel-container" }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-sidepanel-wrapper\">\n\n    <div *ngIf=\"withIndent\" class=\"mc-sidepanel-indent\" (click)=\"exit()\"></div>\n\n    <div class=\"mc-sidepanel-content\">\n        <ng-template cdkPortalOutlet></ng-template>\n    </div>\n</div>\n", styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-sidepanel-container{outline:none;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translate(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translate(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_top,.mc-sidepanel-container_bottom{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_top .mc-sidepanel-indent,.mc-sidepanel-container_bottom .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;background:transparent;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;padding:var(--mc-sidepanel-header-size-padding, 14px 16px);display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;background:transparent;padding:0 0 0 8px;padding:var(--mc-sidepanel-header-size-close-padding, 0 0 0 8px)}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;padding:var(--mc-sidepanel-footer-size-padding, 16px);display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [mcSidepanelAnimations.sidepanelState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3NpZGVwYW5lbC9zaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQW1DLE1BQU0scUJBQXFCLENBQUM7QUFDekcsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFFZCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDSCxxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUNoQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBdUIsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7QUFHNUUsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxjQUFjLENBQVUsMEJBQTBCLENBQUMsQ0FBQztBQUVoRyxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLGNBQWMsQ0FBVSwwQkFBMEIsQ0FBQyxDQUFDO0FBeUJoRyxNQUFNLE9BQU8sNkJBQThCLFNBQVEsZ0JBQWdCO0lBa0IvRCxZQUNZLFVBQW1DLEVBQ25DLGlCQUFvQyxFQUNyQyxlQUFrQyxFQUNBLFVBQW1CLEVBQ25CLFVBQW1CO1FBRTVELEtBQUssRUFBRSxDQUFDO1FBTkEsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNyQyxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7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QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsVUFBVSxFQUFFLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDO29CQUNsRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsNkJBQTZCLEVBQUUsWUFBWTt3QkFDM0MseUNBQXlDLEVBQUUsWUFBWTt3QkFDdkQsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsWUFBWSxFQUFFLE1BQU07d0JBQ3BCLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixpQkFBaUIsRUFBRSxJQUFJO3dCQUN2QixVQUFVLEVBQUU7OztVQUdWO3dCQUNGLGdCQUFnQixFQUFFLHFCQUFxQjt3QkFDdkMsZUFBZSxFQUFFLHFCQUFxQjtxQkFDekM7aUJBQ0o7OzBCQXVCUSxNQUFNOzJCQUFDLHdCQUF3Qjs7MEJBQy9CLE1BQU07MkJBQUMsd0JBQXdCOzRDQWxCUSxZQUFZO3NCQUF2RCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQmFzZVBvcnRhbE91dGxldCwgQ2RrUG9ydGFsT3V0bGV0LCBDb21wb25lbnRQb3J0YWwsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIG1jU2lkZXBhbmVsQW5pbWF0aW9ucyxcbiAgICBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLFxuICAgIG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uXG59IGZyb20gJy4vc2lkZXBhbmVsLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWNTaWRlcGFuZWxDb25maWcsIE1jU2lkZXBhbmVsUG9zaXRpb24gfSBmcm9tICcuL3NpZGVwYW5lbC1jb25maWcnO1xuXG5cbmV4cG9ydCBjb25zdCBNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ21jLXNpZGVwYW5lbC13aXRoLWluZGVudCcpO1xuXG5leHBvcnQgY29uc3QgTUNfU0lERVBBTkVMX1dJVEhfU0hBRE9XID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdtYy1zaWRlcGFuZWwtd2l0aC1zaGFkb3cnKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2lkZXBhbmVsLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGFuaW1hdGlvbnM6IFttY1NpZGVwYW5lbEFuaW1hdGlvbnMuc2lkZXBhbmVsU3RhdGVdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlcGFuZWwtY29udGFpbmVyJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zaWRlcGFuZWxfbmVzdGVkXSc6ICd3aXRoSW5kZW50JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zaWRlcGFuZWwtY29udGFpbmVyX3NoYWRvd2VkXSc6ICd3aXRoU2hhZG93JyxcbiAgICAgICAgcm9sZTogJ2RpYWxvZycsXG4gICAgICAgICdhcmlhLW1vZGFsJzogJ3RydWUnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICctMScsXG4gICAgICAgICdbQHN0YXRlXSc6IGB7XG4gICAgICAgICAgICB2YWx1ZTogYW5pbWF0aW9uU3RhdGUsXG4gICAgICAgICAgICBwYXJhbXM6IGFuaW1hdGlvblRyYW5zZm9ybVxuICAgICAgICB9YCxcbiAgICAgICAgJyhAc3RhdGUuc3RhcnQpJzogJ29uQW5pbWF0aW9uKCRldmVudCknLFxuICAgICAgICAnKEBzdGF0ZS5kb25lKSc6ICdvbkFuaW1hdGlvbigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlUG9ydGFsT3V0bGV0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKiogSUQgZm9yIHRoZSBjb250YWluZXIgRE9NIGVsZW1lbnQuICovXG4gICAgaWQ6IHN0cmluZztcblxuICAgIC8qKiBUaGUgcG9ydGFsIG91dGxldCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogdHJ1ZX0pIHBvcnRhbE91dGxldDogQ2RrUG9ydGFsT3V0bGV0O1xuXG4gICAgLyoqIFRoZSBzdGF0ZSBvZiB0aGUgc2lkZXBhbmVsIGFuaW1hdGlvbnMuICovXG4gICAgYW5pbWF0aW9uU3RhdGU6IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUgPSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLlZvaWQ7XG5cbiAgICBhbmltYXRpb25UcmFuc2Zvcm06IHsgdHJhbnNmb3JtSW46IHN0cmluZzsgdHJhbnNmb3JtT3V0OiBzdHJpbmcgfTtcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgc3RhdGUgb2YgdGhlIGFuaW1hdGlvbiBjaGFuZ2VzLiAqL1xuICAgIGFuaW1hdGlvblN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIGRlc3Ryb3llZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIHNpZGVwYW5lbENvbmZpZzogTWNTaWRlcGFuZWxDb25maWcsXG4gICAgICAgIEBJbmplY3QoTUNfU0lERVBBTkVMX1dJVEhfSU5ERU5UKSBwdWJsaWMgd2l0aEluZGVudDogYm9vbGVhbixcbiAgICAgICAgQEluamVjdChNQ19TSURFUEFORUxfV0lUSF9TSEFET1cpIHB1YmxpYyB3aXRoU2hhZG93OiBib29sZWFuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiogQXR0YWNoIGEgY29tcG9uZW50IHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc2lkZXBhbmVsIGNvbnRhaW5lci4gKi9cbiAgICBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4ocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4pOiBDb21wb25lbnRSZWY8VD4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRlUG9ydGFsQXR0YWNoZWQoKTtcbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5zZXRQYW5lbENsYXNzKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9ydGFsT3V0bGV0LmF0dGFjaENvbXBvbmVudFBvcnRhbChwb3J0YWwpO1xuICAgIH1cblxuICAgIC8qKiBBdHRhY2ggYSB0ZW1wbGF0ZSBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNpZGVwYW5lbCBjb250YWluZXIuICovXG4gICAgYXR0YWNoVGVtcGxhdGVQb3J0YWw8Qz4ocG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxDPik6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb3J0YWxBdHRhY2hlZCgpO1xuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnNldFBhbmVsQ2xhc3MoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoVGVtcGxhdGVQb3J0YWwocG9ydGFsKTtcbiAgICB9XG5cbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBzaWRlcGFuZWwgZW50cmFuY2UgaW50byB2aWV3LiAqL1xuICAgIGVudGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZS5WaXNpYmxlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBzaWRlcGFuZWwgZXhpdGluZyBmcm9tIHZpZXcuICovXG4gICAgZXhpdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUuSGlkZGVuO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb246IE1jU2lkZXBhbmVsUG9zaXRpb24gPSB0aGlzLnNpZGVwYW5lbENvbmZpZy5wb3NpdGlvbiE7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb25UcmFuc2Zvcm0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1JbjogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bcG9zaXRpb25dLmluLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3V0OiBtY1NpZGVwYW5lbFRyYW5zZm9ybUFuaW1hdGlvbltwb3NpdGlvbl0ub3V0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYW5lbENsYXNzKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBwb3NpdGlvbjogTWNTaWRlcGFuZWxQb3NpdGlvbiA9IHRoaXMuc2lkZXBhbmVsQ29uZmlnLnBvc2l0aW9uITtcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLXNpZGVwYW5lbC1jb250YWluZXJfJHtwb3NpdGlvbn1gKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRlUG9ydGFsQXR0YWNoZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcnRhbE91dGxldC5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQXR0ZW1wdGluZyB0byBhdHRhY2ggc2lkZXBhbmVsIGNvbnRlbnQgYWZ0ZXIgY29udGVudCBpcyBhbHJlYWR5IGF0dGFjaGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWMtc2lkZXBhbmVsLXdyYXBwZXJcIj5cblxuICAgIDxkaXYgKm5nSWY9XCJ3aXRoSW5kZW50XCIgY2xhc3M9XCJtYy1zaWRlcGFuZWwtaW5kZW50XCIgKGNsaWNrKT1cImV4aXQoKVwiPjwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLXNpZGVwYW5lbC1jb250ZW50XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBjZGtQb3J0YWxPdXRsZXQ+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19
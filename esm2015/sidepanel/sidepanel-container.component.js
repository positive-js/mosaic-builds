/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-container.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, ViewChild, ViewEncapsulation } from '@angular/core';
import { mcSidepanelAnimations, McSidepanelAnimationState, mcSidepanelTransformAnimation } from './sidepanel-animations';
import { McSidepanelConfig } from './sidepanel-config';
/** @type {?} */
export const MC_SIDEPANEL_WITH_INDENT = new InjectionToken('mc-sidepanel-with-indent');
/** @type {?} */
export const MC_SIDEPANEL_WITH_SHADOW = new InjectionToken('mc-sidepanel-with-shadow');
export class McSidepanelContainerComponent extends BasePortalOutlet {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} sidepanelConfig
     * @param {?} withIndent
     * @param {?} withShadow
     */
    constructor(elementRef, changeDetectorRef, sidepanelConfig, withIndent, withShadow) {
        super();
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.sidepanelConfig = sidepanelConfig;
        this.withIndent = withIndent;
        this.withShadow = withShadow;
        /**
         * The state of the sidepanel animations.
         */
        this.animationState = McSidepanelAnimationState.Void;
        /**
         * Emits whenever the state of the animation changes.
         */
        this.animationStateChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed = true;
    }
    /**
     * Attach a component portal as content to this sidepanel container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    attachComponentPortal(portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachComponentPortal(portal);
    }
    /**
     * Attach a template portal as content to this sidepanel container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    attachTemplatePortal(portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachTemplatePortal(portal);
    }
    /**
     * Begin animation of the sidepanel entrance into view.
     * @return {?}
     */
    enter() {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Visible;
            this.changeDetectorRef.detectChanges();
        }
    }
    /**
     * Begin animation of the sidepanel exiting from view.
     * @return {?}
     */
    exit() {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Hidden;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onAnimation(event) {
        this.animationStateChanged.emit(event);
    }
    /**
     * @private
     * @return {?}
     */
    setAnimation() {
        /** @type {?} */
        const position = (/** @type {?} */ (this.sidepanelConfig.position));
        this.animationTransform = {
            transformIn: mcSidepanelTransformAnimation[position].in,
            transformOut: mcSidepanelTransformAnimation[position].out
        };
    }
    /**
     * @private
     * @return {?}
     */
    setPanelClass() {
        /** @type {?} */
        const element = this.elementRef.nativeElement;
        /** @type {?} */
        const position = (/** @type {?} */ (this.sidepanelConfig.position));
        element.classList.add(`mc-sidepanel-container_${position}`);
        if (this.withShadow) {
            element.classList.add('mc-sidepanel-container_shadowed');
        }
    }
    /**
     * @private
     * @return {?}
     */
    validatePortalAttached() {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    }
}
McSidepanelContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mc-sidepanel-container',
                template: "<div class=\"mc-sidepanel-wrapper\">\n\n    <button *ngIf=\"withIndent\"\n            class=\"mc-sidepanel-indent mc-button_transparent\"\n            mc-button\n            mcSidepanelClose>\n        <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n    </button>\n\n    <div class=\"mc-sidepanel-content\">\n        <ng-template cdkPortalOutlet></ng-template>\n    </div>\n</div>\n\n",
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
                },
                styles: [".mc-no-select{-moz-user-select:none;-ms-user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-sidepanel-container{display:flex;flex:1;min-height:0;outline:none;position:fixed}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{height:100%;min-width:400px;top:0;width:33%}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{height:100%;width:16px}.mc-sidepanel-container_right{right:0;transform:translateX(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translateX(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_bottom,.mc-sidepanel-container_top{flex-direction:column;height:33%;left:0;min-height:400px;width:100%}.mc-sidepanel-container_bottom .mc-sidepanel-indent,.mc-sidepanel-container_top .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background:transparent;border:none;cursor:pointer;height:100%;outline:none;padding:0;user-select:none;width:100%}.mc-sidepanel-content{display:flex;flex:1;flex-direction:column;min-height:0;width:100%}.mc-sidepanel-header{align-items:center;display:flex;flex:0 0 auto;flex-flow:row nowrap;justify-content:space-between;padding:var(--mc-sidepanel-header-size-padding,14px 16px)}.mc-sidepanel-header .mc-sidepanel-close{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background:transparent;border:none;cursor:pointer;outline:none;padding:var(--mc-sidepanel-header-size-close-padding,0 0 0 8px);user-select:none}.mc-sidepanel-title{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mc-sidepanel-body{display:flex;flex:1;flex-direction:column;min-height:0;overflow-y:auto}.mc-sidepanel-footer{align-items:center;display:flex;flex:0 0 auto;flex-flow:row nowrap;justify-content:space-between;padding:var(--mc-sidepanel-footer-size-padding,16px)}.mc-sidepanel-footer .mc-sidepanel-actions{align-items:center;display:flex;flex:1;flex-direction:row}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}"]
            }] }
];
/** @nocollapse */
McSidepanelContainerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: McSidepanelConfig },
    { type: Boolean, decorators: [{ type: Inject, args: [MC_SIDEPANEL_WITH_INDENT,] }] },
    { type: Boolean, decorators: [{ type: Inject, args: [MC_SIDEPANEL_WITH_SHADOW,] }] }
];
McSidepanelContainerComponent.propDecorators = {
    portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }]
};
if (false) {
    /**
     * ID for the container DOM element.
     * @type {?}
     */
    McSidepanelContainerComponent.prototype.id;
    /**
     * The portal outlet inside of this container into which the content will be loaded.
     * @type {?}
     */
    McSidepanelContainerComponent.prototype.portalOutlet;
    /**
     * The state of the sidepanel animations.
     * @type {?}
     */
    McSidepanelContainerComponent.prototype.animationState;
    /** @type {?} */
    McSidepanelContainerComponent.prototype.animationTransform;
    /**
     * Emits whenever the state of the animation changes.
     * @type {?}
     */
    McSidepanelContainerComponent.prototype.animationStateChanged;
    /**
     * Whether the component has been destroyed.
     * @type {?}
     * @private
     */
    McSidepanelContainerComponent.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    McSidepanelContainerComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McSidepanelContainerComponent.prototype.changeDetectorRef;
    /** @type {?} */
    McSidepanelContainerComponent.prototype.sidepanelConfig;
    /** @type {?} */
    McSidepanelContainerComponent.prototype.withIndent;
    /** @type {?} */
    McSidepanelContainerComponent.prototype.withShadow;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9zaWRlcGFuZWwvIiwic291cmNlcyI6WyJzaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQW1DLE1BQU0scUJBQXFCLENBQUM7QUFDekcsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFFZCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDSCxxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUNoQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBdUIsTUFBTSxvQkFBb0IsQ0FBQzs7QUFHNUUsTUFBTSxPQUFPLHdCQUF3QixHQUNqQyxJQUFJLGNBQWMsQ0FBVSwwQkFBMEIsQ0FBQzs7QUFFM0QsTUFBTSxPQUFPLHdCQUF3QixHQUNqQyxJQUFJLGNBQWMsQ0FBVSwwQkFBMEIsQ0FBQztBQXVCM0QsTUFBTSxPQUFPLDZCQUE4QixTQUFRLGdCQUFnQjs7Ozs7Ozs7SUFrQi9ELFlBQ1ksVUFBbUMsRUFDbkMsaUJBQW9DLEVBQ3JDLGVBQWtDLEVBQ0EsVUFBbUIsRUFDbkIsVUFBbUI7UUFFNUQsS0FBSyxFQUFFLENBQUM7UUFOQSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3JDLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtRQUNBLGVBQVUsR0FBVixVQUFVLENBQVM7UUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBUzs7OztRQWZoRSxtQkFBYyxHQUE4Qix5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aUJBQWlCLEVBQUUsSUFBSTtvQkFDdkIsVUFBVSxFQUFFOzs7VUFHVjtvQkFDRixnQkFBZ0IsRUFBRSxxQkFBcUI7b0JBQ3ZDLGVBQWUsRUFBRSxxQkFBcUI7aUJBQ3pDOzthQUNKOzs7O1lBNUNHLFVBQVU7WUFIVixpQkFBaUI7WUFrQlosaUJBQWlCOzBDQW9EakIsTUFBTSxTQUFDLHdCQUF3QjswQ0FDL0IsTUFBTSxTQUFDLHdCQUF3Qjs7OzJCQWxCbkMsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Ozs7Ozs7SUFIMUMsMkNBQVc7Ozs7O0lBR1gscURBQTBFOzs7OztJQUcxRSx1REFBMkU7O0lBRTNFLDJEQUFrRTs7Ozs7SUFHbEUsOERBQTJEOzs7Ozs7SUFHM0Qsa0RBQTJCOzs7OztJQUd2QixtREFBMkM7Ozs7O0lBQzNDLDBEQUE0Qzs7SUFDNUMsd0RBQXlDOztJQUN6QyxtREFBNEQ7O0lBQzVELG1EQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCYXNlUG9ydGFsT3V0bGV0LCBDZGtQb3J0YWxPdXRsZXQsIENvbXBvbmVudFBvcnRhbCwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgbWNTaWRlcGFuZWxBbmltYXRpb25zLFxuICAgIE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUsXG4gICAgbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25cbn0gZnJvbSAnLi9zaWRlcGFuZWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbENvbmZpZywgTWNTaWRlcGFuZWxQb3NpdGlvbiB9IGZyb20gJy4vc2lkZXBhbmVsLWNvbmZpZyc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX1NJREVQQU5FTF9XSVRIX0lOREVOVCA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdtYy1zaWRlcGFuZWwtd2l0aC1pbmRlbnQnKTtcblxuZXhwb3J0IGNvbnN0IE1DX1NJREVQQU5FTF9XSVRIX1NIQURPVyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdtYy1zaWRlcGFuZWwtd2l0aC1zaGFkb3cnKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2lkZXBhbmVsLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGFuaW1hdGlvbnM6IFttY1NpZGVwYW5lbEFuaW1hdGlvbnMuc2lkZXBhbmVsU3RhdGVdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlcGFuZWwtY29udGFpbmVyJyxcbiAgICAgICAgcm9sZTogJ2RpYWxvZycsXG4gICAgICAgICdhcmlhLW1vZGFsJzogJ3RydWUnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICctMScsXG4gICAgICAgICdbQHN0YXRlXSc6IGB7XG4gICAgICAgICAgICB2YWx1ZTogYW5pbWF0aW9uU3RhdGUsXG4gICAgICAgICAgICBwYXJhbXM6IGFuaW1hdGlvblRyYW5zZm9ybVxuICAgICAgICB9YCxcbiAgICAgICAgJyhAc3RhdGUuc3RhcnQpJzogJ29uQW5pbWF0aW9uKCRldmVudCknLFxuICAgICAgICAnKEBzdGF0ZS5kb25lKSc6ICdvbkFuaW1hdGlvbigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlUG9ydGFsT3V0bGV0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKiogSUQgZm9yIHRoZSBjb250YWluZXIgRE9NIGVsZW1lbnQuICovXG4gICAgaWQ6IHN0cmluZztcblxuICAgIC8qKiBUaGUgcG9ydGFsIG91dGxldCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogdHJ1ZX0pIHBvcnRhbE91dGxldDogQ2RrUG9ydGFsT3V0bGV0O1xuXG4gICAgLyoqIFRoZSBzdGF0ZSBvZiB0aGUgc2lkZXBhbmVsIGFuaW1hdGlvbnMuICovXG4gICAgYW5pbWF0aW9uU3RhdGU6IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUgPSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLlZvaWQ7XG5cbiAgICBhbmltYXRpb25UcmFuc2Zvcm06IHsgdHJhbnNmb3JtSW46IHN0cmluZzsgdHJhbnNmb3JtT3V0OiBzdHJpbmcgfTtcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgc3RhdGUgb2YgdGhlIGFuaW1hdGlvbiBjaGFuZ2VzLiAqL1xuICAgIGFuaW1hdGlvblN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIGRlc3Ryb3llZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIHNpZGVwYW5lbENvbmZpZzogTWNTaWRlcGFuZWxDb25maWcsXG4gICAgICAgIEBJbmplY3QoTUNfU0lERVBBTkVMX1dJVEhfSU5ERU5UKSBwdWJsaWMgd2l0aEluZGVudDogYm9vbGVhbixcbiAgICAgICAgQEluamVjdChNQ19TSURFUEFORUxfV0lUSF9TSEFET1cpIHB1YmxpYyB3aXRoU2hhZG93OiBib29sZWFuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiogQXR0YWNoIGEgY29tcG9uZW50IHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc2lkZXBhbmVsIGNvbnRhaW5lci4gKi9cbiAgICBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4ocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4pOiBDb21wb25lbnRSZWY8VD4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRlUG9ydGFsQXR0YWNoZWQoKTtcbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5zZXRQYW5lbENsYXNzKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9ydGFsT3V0bGV0LmF0dGFjaENvbXBvbmVudFBvcnRhbChwb3J0YWwpO1xuICAgIH1cblxuICAgIC8qKiBBdHRhY2ggYSB0ZW1wbGF0ZSBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNpZGVwYW5lbCBjb250YWluZXIuICovXG4gICAgYXR0YWNoVGVtcGxhdGVQb3J0YWw8Qz4ocG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxDPik6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb3J0YWxBdHRhY2hlZCgpO1xuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnNldFBhbmVsQ2xhc3MoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoVGVtcGxhdGVQb3J0YWwocG9ydGFsKTtcbiAgICB9XG5cbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBzaWRlcGFuZWwgZW50cmFuY2UgaW50byB2aWV3LiAqL1xuICAgIGVudGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZS5WaXNpYmxlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBzaWRlcGFuZWwgZXhpdGluZyBmcm9tIHZpZXcuICovXG4gICAgZXhpdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUuSGlkZGVuO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb246IE1jU2lkZXBhbmVsUG9zaXRpb24gPSB0aGlzLnNpZGVwYW5lbENvbmZpZy5wb3NpdGlvbiE7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb25UcmFuc2Zvcm0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1JbjogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bcG9zaXRpb25dLmluLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3V0OiBtY1NpZGVwYW5lbFRyYW5zZm9ybUFuaW1hdGlvbltwb3NpdGlvbl0ub3V0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYW5lbENsYXNzKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBwb3NpdGlvbjogTWNTaWRlcGFuZWxQb3NpdGlvbiA9IHRoaXMuc2lkZXBhbmVsQ29uZmlnLnBvc2l0aW9uITtcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLXNpZGVwYW5lbC1jb250YWluZXJfJHtwb3NpdGlvbn1gKTtcblxuICAgICAgICBpZiAodGhpcy53aXRoU2hhZG93KSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLXNpZGVwYW5lbC1jb250YWluZXJfc2hhZG93ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdGVQb3J0YWxBdHRhY2hlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9ydGFsT3V0bGV0Lmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0aW5nIHRvIGF0dGFjaCBzaWRlcGFuZWwgY29udGVudCBhZnRlciBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
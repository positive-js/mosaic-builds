/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-container.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, ViewChild, ViewEncapsulation } from '@angular/core';
import { mcSidepanelAnimations, McSidepanelAnimationState, mcSidepanelTransformAnimation } from './sidepanel-animations';
import { McSidepanelConfig } from './sidepanel-config';
/** @type {?} */
export var MC_SIDEPANEL_WITH_INDENT = new InjectionToken('mc-sidepanel-with-indent');
/** @type {?} */
export var MC_SIDEPANEL_WITH_SHADOW = new InjectionToken('mc-sidepanel-with-shadow');
var McSidepanelContainerComponent = /** @class */ (function (_super) {
    __extends(McSidepanelContainerComponent, _super);
    function McSidepanelContainerComponent(elementRef, changeDetectorRef, sidepanelConfig, withIndent, withShadow) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.sidepanelConfig = sidepanelConfig;
        _this.withIndent = withIndent;
        _this.withShadow = withShadow;
        /**
         * The state of the sidepanel animations.
         */
        _this.animationState = McSidepanelAnimationState.Void;
        /**
         * Emits whenever the state of the animation changes.
         */
        _this.animationStateChanged = new EventEmitter();
        return _this;
    }
    /**
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed = true;
    };
    /** Attach a component portal as content to this sidepanel container. */
    /**
     * Attach a component portal as content to this sidepanel container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.attachComponentPortal = /**
     * Attach a component portal as content to this sidepanel container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this sidepanel container. */
    /**
     * Attach a template portal as content to this sidepanel container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.attachTemplatePortal = /**
     * Attach a template portal as content to this sidepanel container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachTemplatePortal(portal);
    };
    /** Begin animation of the sidepanel entrance into view. */
    /**
     * Begin animation of the sidepanel entrance into view.
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.enter = /**
     * Begin animation of the sidepanel entrance into view.
     * @return {?}
     */
    function () {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Visible;
            this.changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the sidepanel exiting from view. */
    /**
     * Begin animation of the sidepanel exiting from view.
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.exit = /**
     * Begin animation of the sidepanel exiting from view.
     * @return {?}
     */
    function () {
        if (!this.destroyed) {
            this.animationState = McSidepanelAnimationState.Hidden;
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.onAnimation = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.animationStateChanged.emit(event);
    };
    /**
     * @private
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.setAnimation = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var position = (/** @type {?} */ (this.sidepanelConfig.position));
        this.animationTransform = {
            transformIn: mcSidepanelTransformAnimation[position].in,
            transformOut: mcSidepanelTransformAnimation[position].out
        };
    };
    /**
     * @private
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.setPanelClass = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.elementRef.nativeElement;
        /** @type {?} */
        var position = (/** @type {?} */ (this.sidepanelConfig.position));
        element.classList.add("mc-sidepanel-container_" + position);
        if (this.withShadow) {
            element.classList.add('mc-sidepanel-container_shadowed');
        }
    };
    /**
     * @private
     * @return {?}
     */
    McSidepanelContainerComponent.prototype.validatePortalAttached = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    };
    McSidepanelContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-sidepanel-container',
                    template: "<div class=\"mc-sidepanel-wrapper\">\n\n    <button *ngIf=\"withIndent\"\n            class=\"mc-sidepanel-indent mc-button_transparent\"\n            mc-button\n            mcSidepanelClose>\n        <i mc-icon=\"mc-close-L_16\" class=\"mc-icon mc-icon_light\" color=\"second\"></i>\n    </button>\n\n    <div class=\"mc-sidepanel-content\">\n        <ng-template cdkPortalOutlet></ng-template>\n    </div>\n</div>\n\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [mcSidepanelAnimations.sidepanelState],
                    host: {
                        class: 'mc-sidepanel-container',
                        tabindex: '-1',
                        role: 'dialog',
                        'aria-modal': 'true',
                        '[attr.id]': 'id',
                        '[@state]': "{\n            value: animationState,\n            params: animationTransform\n        }",
                        '(@state.start)': 'onAnimation($event)',
                        '(@state.done)': 'onAnimation($event)'
                    },
                    styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-sidepanel-container{outline:0;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translateX(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translateX(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_bottom,.mc-sidepanel-container_top{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_bottom .mc-sidepanel-indent,.mc-sidepanel-container_top .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0 0 0 8px}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}"]
                }] }
    ];
    /** @nocollapse */
    McSidepanelContainerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: McSidepanelConfig },
        { type: Boolean, decorators: [{ type: Inject, args: [MC_SIDEPANEL_WITH_INDENT,] }] },
        { type: Boolean, decorators: [{ type: Inject, args: [MC_SIDEPANEL_WITH_SHADOW,] }] }
    ]; };
    McSidepanelContainerComponent.propDecorators = {
        portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }]
    };
    return McSidepanelContainerComponent;
}(BasePortalOutlet));
export { McSidepanelContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvc2lkZXBhbmVsLyIsInNvdXJjZXMiOlsic2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBbUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RyxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsVUFBVSxFQUVWLFlBQVksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUVwQyxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDSCxxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUNoQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBdUIsTUFBTSxvQkFBb0IsQ0FBQzs7QUFHNUUsTUFBTSxLQUFPLHdCQUF3QixHQUNqQyxJQUFJLGNBQWMsQ0FBVSwwQkFBMEIsQ0FBQzs7QUFFM0QsTUFBTSxLQUFPLHdCQUF3QixHQUNqQyxJQUFJLGNBQWMsQ0FBVSwwQkFBMEIsQ0FBQztBQUUzRDtJQXFCbUQsaURBQWdCO0lBa0IvRCx1Q0FDWSxVQUFtQyxFQUNuQyxpQkFBb0MsRUFDckMsZUFBa0MsRUFDQSxVQUFtQixFQUNuQixVQUFtQjtRQUxoRSxZQU1JLGlCQUFPLFNBQ1Y7UUFOVyxnQkFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNyQyxxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFDQSxnQkFBVSxHQUFWLFVBQVUsQ0FBUztRQUNuQixnQkFBVSxHQUFWLFVBQVUsQ0FBUzs7OztRQWZoRSxvQkFBYyxHQUE4Qix5QkFBeUIsQ0FBQyxJQUFJLENBQUM7Ozs7UUFLM0Us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SUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSx3QkFBd0I7d0JBQy9CLFFBQVEsRUFBRSxJQUFJO3dCQUNkLElBQUksRUFBRSxRQUFRO3dCQUNkLFlBQVksRUFBRSxNQUFNO3dCQUNwQixXQUFXLEVBQUUsSUFBSTt3QkFDakIsVUFBVSxFQUFFLDBGQUdWO3dCQUNGLGdCQUFnQixFQUFFLHFCQUFxQjt3QkFDdkMsZUFBZSxFQUFFLHFCQUFxQjtxQkFDekM7O2lCQUNKOzs7O2dCQTFDRyxVQUFVO2dCQUhWLGlCQUFpQjtnQkFnQlosaUJBQWlCOzhDQW9EakIsTUFBTSxTQUFDLHdCQUF3Qjs4Q0FDL0IsTUFBTSxTQUFDLHdCQUF3Qjs7OytCQWxCbkMsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7O0lBeUY5QyxvQ0FBQztDQUFBLEFBbkhELENBcUJtRCxnQkFBZ0IsR0E4RmxFO1NBOUZZLDZCQUE2Qjs7Ozs7O0lBRXRDLDJDQUFXOzs7OztJQUdYLHFEQUEwRTs7Ozs7SUFHMUUsdURBQTJFOztJQUUzRSwyREFBa0U7Ozs7O0lBR2xFLDhEQUEyRDs7Ozs7O0lBRzNELGtEQUEyQjs7Ozs7SUFHdkIsbURBQTJDOzs7OztJQUMzQywwREFBNEM7O0lBQzVDLHdEQUF5Qzs7SUFDekMsbURBQTREOztJQUM1RCxtREFBNEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQmFzZVBvcnRhbE91dGxldCwgQ2RrUG9ydGFsT3V0bGV0LCBDb21wb25lbnRQb3J0YWwsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGlvblRva2VuLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgbWNTaWRlcGFuZWxBbmltYXRpb25zLFxuICAgIE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUsXG4gICAgbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25cbn0gZnJvbSAnLi9zaWRlcGFuZWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbENvbmZpZywgTWNTaWRlcGFuZWxQb3NpdGlvbiB9IGZyb20gJy4vc2lkZXBhbmVsLWNvbmZpZyc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX1NJREVQQU5FTF9XSVRIX0lOREVOVCA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdtYy1zaWRlcGFuZWwtd2l0aC1pbmRlbnQnKTtcblxuZXhwb3J0IGNvbnN0IE1DX1NJREVQQU5FTF9XSVRIX1NIQURPVyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdtYy1zaWRlcGFuZWwtd2l0aC1zaGFkb3cnKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2lkZXBhbmVsLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGFuaW1hdGlvbnM6IFttY1NpZGVwYW5lbEFuaW1hdGlvbnMuc2lkZXBhbmVsU3RhdGVdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlcGFuZWwtY29udGFpbmVyJyxcbiAgICAgICAgdGFiaW5kZXg6ICctMScsXG4gICAgICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICAgICAnYXJpYS1tb2RhbCc6ICd0cnVlJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbQHN0YXRlXSc6IGB7XG4gICAgICAgICAgICB2YWx1ZTogYW5pbWF0aW9uU3RhdGUsXG4gICAgICAgICAgICBwYXJhbXM6IGFuaW1hdGlvblRyYW5zZm9ybVxuICAgICAgICB9YCxcbiAgICAgICAgJyhAc3RhdGUuc3RhcnQpJzogJ29uQW5pbWF0aW9uKCRldmVudCknLFxuICAgICAgICAnKEBzdGF0ZS5kb25lKSc6ICdvbkFuaW1hdGlvbigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlUG9ydGFsT3V0bGV0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICAvKiogSUQgZm9yIHRoZSBjb250YWluZXIgRE9NIGVsZW1lbnQuICovXG4gICAgaWQ6IHN0cmluZztcblxuICAgIC8qKiBUaGUgcG9ydGFsIG91dGxldCBpbnNpZGUgb2YgdGhpcyBjb250YWluZXIgaW50byB3aGljaCB0aGUgY29udGVudCB3aWxsIGJlIGxvYWRlZC4gKi9cbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwge3N0YXRpYzogdHJ1ZX0pIHBvcnRhbE91dGxldDogQ2RrUG9ydGFsT3V0bGV0O1xuXG4gICAgLyoqIFRoZSBzdGF0ZSBvZiB0aGUgc2lkZXBhbmVsIGFuaW1hdGlvbnMuICovXG4gICAgYW5pbWF0aW9uU3RhdGU6IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUgPSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLlZvaWQ7XG5cbiAgICBhbmltYXRpb25UcmFuc2Zvcm06IHsgdHJhbnNmb3JtSW46IHN0cmluZzsgdHJhbnNmb3JtT3V0OiBzdHJpbmcgfTtcblxuICAgIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgc3RhdGUgb2YgdGhlIGFuaW1hdGlvbiBjaGFuZ2VzLiAqL1xuICAgIGFuaW1hdGlvblN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIGRlc3Ryb3llZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIHNpZGVwYW5lbENvbmZpZzogTWNTaWRlcGFuZWxDb25maWcsXG4gICAgICAgIEBJbmplY3QoTUNfU0lERVBBTkVMX1dJVEhfSU5ERU5UKSBwdWJsaWMgd2l0aEluZGVudDogYm9vbGVhbixcbiAgICAgICAgQEluamVjdChNQ19TSURFUEFORUxfV0lUSF9TSEFET1cpIHB1YmxpYyB3aXRoU2hhZG93OiBib29sZWFuKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiogQXR0YWNoIGEgY29tcG9uZW50IHBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgc2lkZXBhbmVsIGNvbnRhaW5lci4gKi9cbiAgICBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4ocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4pOiBDb21wb25lbnRSZWY8VD4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRlUG9ydGFsQXR0YWNoZWQoKTtcbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5zZXRQYW5lbENsYXNzKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9ydGFsT3V0bGV0LmF0dGFjaENvbXBvbmVudFBvcnRhbChwb3J0YWwpO1xuICAgIH1cblxuICAgIC8qKiBBdHRhY2ggYSB0ZW1wbGF0ZSBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNpZGVwYW5lbCBjb250YWluZXIuICovXG4gICAgYXR0YWNoVGVtcGxhdGVQb3J0YWw8Qz4ocG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxDPik6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb3J0YWxBdHRhY2hlZCgpO1xuICAgICAgICB0aGlzLnNldEFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnNldFBhbmVsQ2xhc3MoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoVGVtcGxhdGVQb3J0YWwocG9ydGFsKTtcbiAgICB9XG5cbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBzaWRlcGFuZWwgZW50cmFuY2UgaW50byB2aWV3LiAqL1xuICAgIGVudGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZS5WaXNpYmxlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBzaWRlcGFuZWwgZXhpdGluZyBmcm9tIHZpZXcuICovXG4gICAgZXhpdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUuSGlkZGVuO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb246IE1jU2lkZXBhbmVsUG9zaXRpb24gPSB0aGlzLnNpZGVwYW5lbENvbmZpZy5wb3NpdGlvbiE7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb25UcmFuc2Zvcm0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1JbjogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bcG9zaXRpb25dLmluLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3V0OiBtY1NpZGVwYW5lbFRyYW5zZm9ybUFuaW1hdGlvbltwb3NpdGlvbl0ub3V0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYW5lbENsYXNzKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBwb3NpdGlvbjogTWNTaWRlcGFuZWxQb3NpdGlvbiA9IHRoaXMuc2lkZXBhbmVsQ29uZmlnLnBvc2l0aW9uITtcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYG1jLXNpZGVwYW5lbC1jb250YWluZXJfJHtwb3NpdGlvbn1gKTtcblxuICAgICAgICBpZiAodGhpcy53aXRoU2hhZG93KSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLXNpZGVwYW5lbC1jb250YWluZXJfc2hhZG93ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdGVQb3J0YWxBdHRhY2hlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9ydGFsT3V0bGV0Lmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0aW5nIHRvIGF0dGFjaCBzaWRlcGFuZWwgY29udGVudCBhZnRlciBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel-container.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-sidepanel-container{outline:0;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translateX(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translateX(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_bottom,.mc-sidepanel-container_top{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_bottom .mc-sidepanel-indent,.mc-sidepanel-container_top .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;width:100%}.mc-sidepanel-header{padding:14px 16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;padding:0 0 0 8px}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvc2lkZXBhbmVsLyIsInNvdXJjZXMiOlsic2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFtQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3pHLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxVQUFVLEVBRVYsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBRWQsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6Qiw2QkFBNkIsRUFDaEMsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsaUJBQWlCLEVBQXVCLE1BQU0sb0JBQW9CLENBQUM7O0FBRzVFLE1BQU0sT0FBTyx3QkFBd0IsR0FDakMsSUFBSSxjQUFjLENBQVUsMEJBQTBCLENBQUM7O0FBRTNELE1BQU0sT0FBTyx3QkFBd0IsR0FDakMsSUFBSSxjQUFjLENBQVUsMEJBQTBCLENBQUM7QUF1QjNELE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxnQkFBZ0I7Ozs7Ozs7O0lBa0IvRCxZQUNZLFVBQW1DLEVBQ25DLGlCQUFvQyxFQUNyQyxlQUFrQyxFQUNBLFVBQW1CLEVBQ25CLFVBQW1CO1FBRTVELEtBQUssRUFBRSxDQUFDO1FBTkEsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNyQyxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFDQSxlQUFVLEdBQVYsVUFBVSxDQUFTO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVM7Ozs7UUFmaEUsbUJBQWMsR0FBOEIseUJBQXlCLENBQUMsSUFB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QUk7b0JBQ3ZCLFVBQVUsRUFBRTs7O1VBR1Y7b0JBQ0YsZ0JBQWdCLEVBQUUscUJBQXFCO29CQUN2QyxlQUFlLEVBQUUscUJBQXFCO2lCQUN6Qzs7YUFDSjs7OztZQTVDRyxVQUFVO1lBSFYsaUJBQWlCO1lBa0JaLGlCQUFpQjswQ0FvRGpCLE1BQU0sU0FBQyx3QkFBd0I7MENBQy9CLE1BQU0sU0FBQyx3QkFBd0I7OzsyQkFsQm5DLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDOzs7Ozs7O0lBSDFDLDJDQUFXOzs7OztJQUdYLHFEQUEwRTs7Ozs7SUFHMUUsdURBQTJFOztJQUUzRSwyREFBa0U7Ozs7O0lBR2xFLDhEQUEyRDs7Ozs7O0lBRzNELGtEQUEyQjs7Ozs7SUFHdkIsbURBQTJDOzs7OztJQUMzQywwREFBNEM7O0lBQzVDLHdEQUF5Qzs7SUFDekMsbURBQTREOztJQUM1RCxtREFBNEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQmFzZVBvcnRhbE91dGxldCwgQ2RrUG9ydGFsT3V0bGV0LCBDb21wb25lbnRQb3J0YWwsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIG1jU2lkZXBhbmVsQW5pbWF0aW9ucyxcbiAgICBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLFxuICAgIG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uXG59IGZyb20gJy4vc2lkZXBhbmVsLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWNTaWRlcGFuZWxDb25maWcsIE1jU2lkZXBhbmVsUG9zaXRpb24gfSBmcm9tICcuL3NpZGVwYW5lbC1jb25maWcnO1xuXG5cbmV4cG9ydCBjb25zdCBNQ19TSURFUEFORUxfV0lUSF9JTkRFTlQgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignbWMtc2lkZXBhbmVsLXdpdGgtaW5kZW50Jyk7XG5cbmV4cG9ydCBjb25zdCBNQ19TSURFUEFORUxfV0lUSF9TSEFET1cgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignbWMtc2lkZXBhbmVsLXdpdGgtc2hhZG93Jyk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2lkZXBhbmVsLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NpZGVwYW5lbC1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NpZGVwYW5lbC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBhbmltYXRpb25zOiBbbWNTaWRlcGFuZWxBbmltYXRpb25zLnNpZGVwYW5lbFN0YXRlXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWNvbnRhaW5lcicsXG4gICAgICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICAgICAnYXJpYS1tb2RhbCc6ICd0cnVlJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnLTEnLFxuICAgICAgICAnW0BzdGF0ZV0nOiBge1xuICAgICAgICAgICAgdmFsdWU6IGFuaW1hdGlvblN0YXRlLFxuICAgICAgICAgICAgcGFyYW1zOiBhbmltYXRpb25UcmFuc2Zvcm1cbiAgICAgICAgfWAsXG4gICAgICAgICcoQHN0YXRlLnN0YXJ0KSc6ICdvbkFuaW1hdGlvbigkZXZlbnQpJyxcbiAgICAgICAgJyhAc3RhdGUuZG9uZSknOiAnb25BbmltYXRpb24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZVBvcnRhbE91dGxldCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgLyoqIElEIGZvciB0aGUgY29udGFpbmVyIERPTSBlbGVtZW50LiAqL1xuICAgIGlkOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIHBvcnRhbCBvdXRsZXQgaW5zaWRlIG9mIHRoaXMgY29udGFpbmVyIGludG8gd2hpY2ggdGhlIGNvbnRlbnQgd2lsbCBiZSBsb2FkZWQuICovXG4gICAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHtzdGF0aWM6IHRydWV9KSBwb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcblxuICAgIC8qKiBUaGUgc3RhdGUgb2YgdGhlIHNpZGVwYW5lbCBhbmltYXRpb25zLiAqL1xuICAgIGFuaW1hdGlvblN0YXRlOiBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlID0gTWNTaWRlcGFuZWxBbmltYXRpb25TdGF0ZS5Wb2lkO1xuXG4gICAgYW5pbWF0aW9uVHJhbnNmb3JtOiB7IHRyYW5zZm9ybUluOiBzdHJpbmc7IHRyYW5zZm9ybU91dDogc3RyaW5nIH07XG5cbiAgICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIHN0YXRlIG9mIHRoZSBhbmltYXRpb24gY2hhbmdlcy4gKi9cbiAgICBhbmltYXRpb25TdGF0ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSBkZXN0cm95ZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBzaWRlcGFuZWxDb25maWc6IE1jU2lkZXBhbmVsQ29uZmlnLFxuICAgICAgICBASW5qZWN0KE1DX1NJREVQQU5FTF9XSVRIX0lOREVOVCkgcHVibGljIHdpdGhJbmRlbnQ6IGJvb2xlYW4sXG4gICAgICAgIEBJbmplY3QoTUNfU0lERVBBTkVMX1dJVEhfU0hBRE9XKSBwdWJsaWMgd2l0aFNoYWRvdzogYm9vbGVhblxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIEF0dGFjaCBhIGNvbXBvbmVudCBwb3J0YWwgYXMgY29udGVudCB0byB0aGlzIHNpZGVwYW5lbCBjb250YWluZXIuICovXG4gICAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVBvcnRhbEF0dGFjaGVkKCk7XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuc2V0UGFuZWxDbGFzcygpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbE91dGxldC5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcbiAgICB9XG5cbiAgICAvKiogQXR0YWNoIGEgdGVtcGxhdGUgcG9ydGFsIGFzIGNvbnRlbnQgdG8gdGhpcyBzaWRlcGFuZWwgY29udGFpbmVyLiAqL1xuICAgIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRlUG9ydGFsQXR0YWNoZWQoKTtcbiAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5zZXRQYW5lbENsYXNzKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9ydGFsT3V0bGV0LmF0dGFjaFRlbXBsYXRlUG9ydGFsKHBvcnRhbCk7XG4gICAgfVxuXG4gICAgLyoqIEJlZ2luIGFuaW1hdGlvbiBvZiB0aGUgc2lkZXBhbmVsIGVudHJhbmNlIGludG8gdmlldy4gKi9cbiAgICBlbnRlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IE1jU2lkZXBhbmVsQW5pbWF0aW9uU3RhdGUuVmlzaWJsZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEJlZ2luIGFuaW1hdGlvbiBvZiB0aGUgc2lkZXBhbmVsIGV4aXRpbmcgZnJvbSB2aWV3LiAqL1xuICAgIGV4aXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBNY1NpZGVwYW5lbEFuaW1hdGlvblN0YXRlLkhpZGRlbjtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvbihldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRBbmltYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uOiBNY1NpZGVwYW5lbFBvc2l0aW9uID0gdGhpcy5zaWRlcGFuZWxDb25maWcucG9zaXRpb24hO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uVHJhbnNmb3JtID0ge1xuICAgICAgICAgICAgdHJhbnNmb3JtSW46IG1jU2lkZXBhbmVsVHJhbnNmb3JtQW5pbWF0aW9uW3Bvc2l0aW9uXS5pbixcbiAgICAgICAgICAgIHRyYW5zZm9ybU91dDogbWNTaWRlcGFuZWxUcmFuc2Zvcm1BbmltYXRpb25bcG9zaXRpb25dLm91dFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UGFuZWxDbGFzcygpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgcG9zaXRpb246IE1jU2lkZXBhbmVsUG9zaXRpb24gPSB0aGlzLnNpZGVwYW5lbENvbmZpZy5wb3NpdGlvbiE7XG5cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGBtYy1zaWRlcGFuZWwtY29udGFpbmVyXyR7cG9zaXRpb259YCk7XG5cbiAgICAgICAgaWYgKHRoaXMud2l0aFNoYWRvdykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1zaWRlcGFuZWwtY29udGFpbmVyX3NoYWRvd2VkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRlUG9ydGFsQXR0YWNoZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcnRhbE91dGxldC5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQXR0ZW1wdGluZyB0byBhdHRhY2ggc2lkZXBhbmVsIGNvbnRlbnQgYWZ0ZXIgY29udGVudCBpcyBhbHJlYWR5IGF0dGFjaGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
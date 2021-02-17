/**
 * @fileoverview added by tsickle
 * Generated from: progress-bar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
/** @type {?} */
let idIterator = 0;
/** @type {?} */
const MIN_PERCENT = 0;
/** @type {?} */
const MAX_PERCENT = 100;
export class McProgressBarBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McProgressBarBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McProgressBarMixinBase = mixinColor(McProgressBarBase, ThemePalette.Primary);
export class McProgressBar extends McProgressBarMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-bar-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
    }
    /**
     * @return {?}
     */
    get percentage() {
        return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
    }
}
McProgressBar.decorators = [
    { type: Component, args: [{
                selector: 'mc-progress-bar',
                template: "\n<div class=\"mc-progress-bar__inner\" [ngSwitch]=\"mode\" [id]=\"id\">\n    <div\n        *ngSwitchCase=\"'indeterminate'\"\n        class=\"mc-progress-bar__line mc-progress-bar__line--indeterminate\">\n    </div>\n    <div\n        *ngSwitchDefault\n        class=\"mc-progress-bar__line mc-progress-bar__line--determinate\"\n        [ngStyle]=\"{transform: 'scaleX(' + percentage + ')'}\">\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                host: {
                    class: 'mc-progress-bar',
                    '[attr.id]': 'id'
                },
                styles: ["@-webkit-keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}to{transform:scaleX(.4) translateX(250%)}}@keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translateX(-150%)}to{transform:scaleX(.4) translateX(250%)}}.mc-progress-bar{display:block;height:var(--mc-progress-bar-size-height,4px);overflow:hidden}.mc-progress-bar__inner{height:100%}.mc-progress-bar__line{height:100%;transform-origin:top left}.mc-progress-bar__line--determinate{transition:transform .3s}.mc-progress-bar__line--indeterminate{-webkit-animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite;animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite}"]
            }] }
];
/** @nocollapse */
McProgressBar.ctorParameters = () => [
    { type: ElementRef }
];
McProgressBar.propDecorators = {
    id: [{ type: Input }],
    value: [{ type: Input }],
    mode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McProgressBar.prototype.id;
    /** @type {?} */
    McProgressBar.prototype.value;
    /** @type {?} */
    McProgressBar.prototype.mode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3Byb2dyZXNzLWJhci8iLCJzb3VyY2VzIjpbInByb2dyZXNzLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLEtBQUssRUFDUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQTBCLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLdkYsVUFBVSxHQUFHLENBQUM7O01BRVosV0FBVyxHQUFHLENBQUM7O01BQ2YsV0FBVyxHQUFHLEdBQUc7QUFFdkIsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFFMUIsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEOzs7SUFEZSx3Q0FBOEI7Ozs7QUFJOUMsTUFBTSxPQUFPLHNCQUFzQixHQUNXLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDO0FBY2pHLE1BQU0sT0FBTyxhQUFjLFNBQVEsc0JBQXNCOzs7O0lBS3JELFlBQVksVUFBc0I7UUFDOUIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBTGIsT0FBRSxHQUFXLG1CQUFtQixVQUFVLEVBQUUsRUFBRSxDQUFDO1FBQy9DLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsU0FBSSxHQUFvQixhQUFhLENBQUM7SUFJL0MsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO0lBQ2xGLENBQUM7OztZQXZCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsNGFBQTRDO2dCQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxpQkFBaUI7b0JBQ3hCLFdBQVcsRUFBRSxJQUFJO2lCQUNwQjs7YUFDSjs7OztZQWpDRyxVQUFVOzs7aUJBbUNULEtBQUs7b0JBQ0wsS0FBSzttQkFDTCxLQUFLOzs7O0lBRk4sMkJBQXdEOztJQUN4RCw4QkFBMkI7O0lBQzNCLDZCQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yLCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcblxubGV0IGlkSXRlcmF0b3IgPSAwO1xuXG5jb25zdCBNSU5fUEVSQ0VOVCA9IDA7XG5jb25zdCBNQVhfUEVSQ0VOVCA9IDEwMDtcblxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NCYXJCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jUHJvZ3Jlc3NCYXJNaXhpbkJhc2U6XG4gICAgQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jUHJvZ3Jlc3NCYXJCYXNlID0gbWl4aW5Db2xvcihNY1Byb2dyZXNzQmFyQmFzZSwgVGhlbWVQYWxldHRlLlByaW1hcnkpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXByb2dyZXNzLWJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzLWJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3MtYmFyLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1wcm9ncmVzcy1iYXInLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQcm9ncmVzc0JhciBleHRlbmRzIE1jUHJvZ3Jlc3NCYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy1wcm9ncmVzcy1iYXItJHtpZEl0ZXJhdG9yKyt9YDtcbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBtb2RlOiBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBnZXQgcGVyY2VudGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTUlOX1BFUkNFTlQsIE1hdGgubWluKE1BWF9QRVJDRU5ULCB0aGlzLnZhbHVlKSkgLyBNQVhfUEVSQ0VOVDtcbiAgICB9XG59XG4iXX0=
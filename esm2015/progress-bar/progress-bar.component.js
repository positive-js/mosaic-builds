import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
let idIterator = 0;
const MIN_PERCENT = 0;
const MAX_PERCENT = 100;
export class McProgressBarBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McProgressBarMixinBase = mixinColor(McProgressBarBase, ThemePalette.Primary);
export class McProgressBar extends McProgressBarMixinBase {
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-bar-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
    }
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
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wcm9ncmVzcy1iYXIvcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLEtBQUssRUFDUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQTBCLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUszRixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFFbkIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUV4QixNQUFNLE9BQU8saUJBQWlCO0lBQzFCLDZDQUE2QztJQUM3QyxZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Q0FDakQ7QUFFRCw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQ1csVUFBVSxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQWNsRyxNQUFNLE9BQU8sYUFBYyxTQUFRLHNCQUFzQjtJQUtyRCxZQUFZLFVBQXNCO1FBQzlCLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUxiLE9BQUUsR0FBVyxtQkFBbUIsVUFBVSxFQUFFLEVBQUUsQ0FBQztRQUMvQyxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFNBQUksR0FBb0IsYUFBYSxDQUFDO0lBSS9DLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNsRixDQUFDOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLDRhQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixXQUFXLEVBQUUsSUFBSTtpQkFDcEI7O2FBQ0o7Ozs7WUFqQ0csVUFBVTs7O2lCQW1DVCxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yLCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NCYXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcblxubGV0IGlkSXRlcmF0b3IgPSAwO1xuXG5jb25zdCBNSU5fUEVSQ0VOVCA9IDA7XG5jb25zdCBNQVhfUEVSQ0VOVCA9IDEwMDtcblxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NCYXJCYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jUHJvZ3Jlc3NCYXJNaXhpbkJhc2U6XG4gICAgQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jUHJvZ3Jlc3NCYXJCYXNlID0gbWl4aW5Db2xvcihNY1Byb2dyZXNzQmFyQmFzZSwgVGhlbWVQYWxldHRlLlByaW1hcnkpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXByb2dyZXNzLWJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzLWJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3MtYmFyLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1wcm9ncmVzcy1iYXInLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQcm9ncmVzc0JhciBleHRlbmRzIE1jUHJvZ3Jlc3NCYXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy1wcm9ncmVzcy1iYXItJHtpZEl0ZXJhdG9yKyt9YDtcbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBtb2RlOiBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBnZXQgcGVyY2VudGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTUlOX1BFUkNFTlQsIE1hdGgubWluKE1BWF9QRVJDRU5ULCB0aGlzLnZhbHVlKSkgLyBNQVhfUEVSQ0VOVDtcbiAgICB9XG59XG4iXX0=
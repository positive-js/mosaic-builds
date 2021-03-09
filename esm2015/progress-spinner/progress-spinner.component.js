import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
let idIterator = 0;
const MIN_PERCENT = 0;
const MAX_PERCENT = 100;
export class McProgressSpinnerBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McProgressSpinnerMixinBase = mixinColor(McProgressSpinnerBase, ThemePalette.Primary);
const MAX_DASH_ARRAY = 273;
export class McProgressSpinner extends McProgressSpinnerMixinBase {
    constructor(elementRef) {
        super(elementRef);
        this.id = `mc-progress-spinner-${idIterator++}`;
        this.value = 0;
        this.mode = 'determinate';
    }
    get percentage() {
        return Math.max(MIN_PERCENT, Math.min(MAX_PERCENT, this.value)) / MAX_PERCENT;
    }
    get dashOffsetPercent() {
        return `${MAX_DASH_ARRAY - this.percentage * MAX_DASH_ARRAY}%`;
    }
}
McProgressSpinner.decorators = [
    { type: Component, args: [{
                selector: 'mc-progress-spinner',
                template: "<div class=\"mc-progress-spinner__inner\"\n     [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\">\n    <svg focusable=\"false\"\n         preserveAspectRatio=\"xMidYMid meet\"\n         viewBox=\"0 0 100 100\"\n         class=\"mc-progress-spinner__svg\">\n        <circle cx=\"50%\"\n                cy=\"50%\"\n                r=\"42.5%\"\n                class=\"mc-progress-spinner__circle\"\n                [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\">\n        </circle>\n    </svg>\n</div>\n\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                host: {
                    class: 'mc-progress-spinner',
                    '[attr.id]': 'id'
                },
                styles: ["@-webkit-keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}@keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}.mc-progress-spinner{display:inline-block;width:var(--mc-progress-spinner-size-size,16px);height:var(--mc-progress-spinner-size-size,16px);overflow:hidden}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotate(-90deg)}.mc-progress-spinner__inner--indeterminate{-webkit-animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite;animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}"]
            },] }
];
/** @nocollapse */
McProgressSpinner.ctorParameters = () => [
    { type: ElementRef }
];
McProgressSpinner.propDecorators = {
    id: [{ type: Input }],
    value: [{ type: Input }],
    mode: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcHJvZ3Jlc3Mtc3Bpbm5lci9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLEtBQUssRUFDUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQTBCLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUszRixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFFbkIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUV4QixNQUFNLE9BQU8scUJBQXFCO0lBQzlCLDZDQUE2QztJQUM3QyxZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Q0FDakQ7QUFFRCw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQ1csVUFBVSxDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUxRyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFjM0IsTUFBTSxPQUFPLGlCQUFrQixTQUFRLDBCQUEwQjtJQUs3RCxZQUFZLFVBQXNCO1FBQzlCLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUxiLE9BQUUsR0FBVyx1QkFBdUIsVUFBVSxFQUFFLEVBQUUsQ0FBQztRQUNuRCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFNBQUksR0FBd0IsYUFBYSxDQUFDO0lBSW5ELENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNsRixDQUFDO0lBRUQsSUFBSSxpQkFBaUI7UUFDakIsT0FBTyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsR0FBRyxDQUFDO0lBQ25FLENBQUM7OztZQTNCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsZ2xCQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUscUJBQXFCO29CQUM1QixXQUFXLEVBQUUsSUFBSTtpQkFDcEI7O2FBQ0o7Ozs7WUFuQ0csVUFBVTs7O2lCQXFDVCxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5Db2xvciwgQ2FuQ29sb3JDdG9yLCBtaXhpbkNvbG9yLCBUaGVtZVBhbGV0dGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbmxldCBpZEl0ZXJhdG9yID0gMDtcblxuY29uc3QgTUlOX1BFUkNFTlQgPSAwO1xuY29uc3QgTUFYX1BFUkNFTlQgPSAxMDA7XG5cbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzU3Bpbm5lckJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2U6XG4gICAgQ2FuQ29sb3JDdG9yICYgdHlwZW9mIE1jUHJvZ3Jlc3NTcGlubmVyQmFzZSA9IG1peGluQ29sb3IoTWNQcm9ncmVzc1NwaW5uZXJCYXNlLCBUaGVtZVBhbGV0dGUuUHJpbWFyeSk7XG5cbmNvbnN0IE1BWF9EQVNIX0FSUkFZID0gMjczO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXByb2dyZXNzLXNwaW5uZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzcy1zcGlubmVyLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1wcm9ncmVzcy1zcGlubmVyJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NTcGlubmVyIGV4dGVuZHMgTWNQcm9ncmVzc1NwaW5uZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy1wcm9ncmVzcy1zcGlubmVyLSR7aWRJdGVyYXRvcisrfWA7XG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgbW9kZTogUHJvZ3Jlc3NTcGlubmVyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIGdldCBwZXJjZW50YWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNSU5fUEVSQ0VOVCwgTWF0aC5taW4oTUFYX1BFUkNFTlQsIHRoaXMudmFsdWUpKSAvIE1BWF9QRVJDRU5UO1xuICAgIH1cblxuICAgIGdldCBkYXNoT2Zmc2V0UGVyY2VudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7TUFYX0RBU0hfQVJSQVkgLSB0aGlzLnBlcmNlbnRhZ2UgKiBNQVhfREFTSF9BUlJBWX0lYDtcbiAgICB9XG59XG4iXX0=
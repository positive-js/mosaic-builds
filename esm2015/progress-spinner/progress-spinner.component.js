import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
/** @nocollapse */ McProgressSpinner.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McProgressSpinner, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McProgressSpinner.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McProgressSpinner, selector: "mc-progress-spinner", inputs: { color: "color", id: "id", value: "value", mode: "mode" }, host: { properties: { "attr.id": "id" }, classAttribute: "mc-progress-spinner" }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-progress-spinner__inner\"\n     [ngClass]=\"{'mc-progress-spinner__inner--indeterminate': mode === 'indeterminate'}\">\n    <svg focusable=\"false\"\n         preserveAspectRatio=\"xMidYMid meet\"\n         viewBox=\"0 0 100 100\"\n         class=\"mc-progress-spinner__svg\">\n        <circle cx=\"50%\"\n                cy=\"50%\"\n                r=\"42.5%\"\n                class=\"mc-progress-spinner__circle\"\n                [ngStyle]=\"{'stroke-dashoffset': mode === 'determinate' ? dashOffsetPercent : null}\">\n        </circle>\n    </svg>\n</div>\n\n", styles: ["@keyframes mc-progress-spinner-indeterminate{to{transform:rotate(270deg)}}.mc-progress-spinner{display:inline-block;width:16px;width:var(--mc-progress-spinner-size-size, 16px);height:16px;height:var(--mc-progress-spinner-size-size, 16px);overflow:hidden}.mc-progress-spinner__circle{fill:none;stroke:#000;stroke-dasharray:273%;stroke-width:13%;transition:stroke-dashoffset .3s;transform-origin:center center}.mc-progress-spinner__inner{width:100%;height:100%;transform:rotate(-90deg)}.mc-progress-spinner__inner--indeterminate{animation:mc-progress-spinner-indeterminate 1.5s cubic-bezier(.455,.03,.515,.955) infinite}.mc-progress-spinner__inner--indeterminate .mc-progress-spinner__circle{stroke-dashoffset:80%}.mc-progress-spinner__svg{width:100%;height:100%}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McProgressSpinner, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-progress-spinner',
                    templateUrl: './progress-spinner.component.html',
                    styleUrls: ['./progress-spinner.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['color'],
                    host: {
                        class: 'mc-progress-spinner',
                        '[attr.id]': 'id'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { id: [{
                type: Input
            }], value: [{
                type: Input
            }], mode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcHJvZ3Jlc3Mtc3Bpbm5lci9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wcm9ncmVzcy1zcGlubmVyL3Byb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixLQUFLLEVBQ1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUEwQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7OztBQUszRixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFFbkIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUV4QixNQUFNLE9BQU8scUJBQXFCO0lBQzlCLDZDQUE2QztJQUM3QyxZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Q0FDakQ7QUFFRCw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQ1csVUFBVSxDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUxRyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFjM0IsTUFBTSxPQUFPLGlCQUFrQixTQUFRLDBCQUEwQjtJQUs3RCxZQUFZLFVBQXNCO1FBQzlCLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUxiLE9BQUUsR0FBVyx1QkFBdUIsVUFBVSxFQUFFLEVBQUUsQ0FBQztRQUNuRCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFNBQUksR0FBd0IsYUFBYSxDQUFDO0lBSW5ELENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNsRixDQUFDO0lBRUQsSUFBSSxpQkFBaUI7UUFDakIsT0FBTyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsR0FBRyxDQUFDO0lBQ25FLENBQUM7O2tJQWZRLGlCQUFpQjtzSEFBakIsaUJBQWlCLHdPQ3hDOUIsc2tCQWVBOzRGRHlCYSxpQkFBaUI7a0JBWjdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsV0FBVyxFQUFFLG1DQUFtQztvQkFDaEQsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNqQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHFCQUFxQjt3QkFDNUIsV0FBVyxFQUFFLElBQUk7cUJBQ3BCO2lCQUNKO2lHQUVZLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIG1peGluQ29sb3IsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBQcm9ncmVzc1NwaW5uZXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcblxubGV0IGlkSXRlcmF0b3IgPSAwO1xuXG5jb25zdCBNSU5fUEVSQ0VOVCA9IDA7XG5jb25zdCBNQVhfUEVSQ0VOVCA9IDEwMDtcblxuZXhwb3J0IGNsYXNzIE1jUHJvZ3Jlc3NTcGlubmVyQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1Byb2dyZXNzU3Bpbm5lck1peGluQmFzZTpcbiAgICBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNQcm9ncmVzc1NwaW5uZXJCYXNlID0gbWl4aW5Db2xvcihNY1Byb2dyZXNzU3Bpbm5lckJhc2UsIFRoZW1lUGFsZXR0ZS5QcmltYXJ5KTtcblxuY29uc3QgTUFYX0RBU0hfQVJSQVkgPSAyNzM7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtcHJvZ3Jlc3Mtc3Bpbm5lcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Byb2dyZXNzLXNwaW5uZXIuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXByb2dyZXNzLXNwaW5uZXInLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQcm9ncmVzc1NwaW5uZXIgZXh0ZW5kcyBNY1Byb2dyZXNzU3Bpbm5lck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkNvbG9yIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLXByb2dyZXNzLXNwaW5uZXItJHtpZEl0ZXJhdG9yKyt9YDtcbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBtb2RlOiBQcm9ncmVzc1NwaW5uZXJNb2RlID0gJ2RldGVybWluYXRlJztcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgZ2V0IHBlcmNlbnRhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1JTl9QRVJDRU5ULCBNYXRoLm1pbihNQVhfUEVSQ0VOVCwgdGhpcy52YWx1ZSkpIC8gTUFYX1BFUkNFTlQ7XG4gICAgfVxuXG4gICAgZ2V0IGRhc2hPZmZzZXRQZXJjZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtNQVhfREFTSF9BUlJBWSAtIHRoaXMucGVyY2VudGFnZSAqIE1BWF9EQVNIX0FSUkFZfSVgO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtYy1wcm9ncmVzcy1zcGlubmVyX19pbm5lclwiXG4gICAgIFtuZ0NsYXNzXT1cInsnbWMtcHJvZ3Jlc3Mtc3Bpbm5lcl9faW5uZXItLWluZGV0ZXJtaW5hdGUnOiBtb2RlID09PSAnaW5kZXRlcm1pbmF0ZSd9XCI+XG4gICAgPHN2ZyBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWQgbWVldFwiXG4gICAgICAgICB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIlxuICAgICAgICAgY2xhc3M9XCJtYy1wcm9ncmVzcy1zcGlubmVyX19zdmdcIj5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjUwJVwiXG4gICAgICAgICAgICAgICAgY3k9XCI1MCVcIlxuICAgICAgICAgICAgICAgIHI9XCI0Mi41JVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJtYy1wcm9ncmVzcy1zcGlubmVyX19jaXJjbGVcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnc3Ryb2tlLWRhc2hvZmZzZXQnOiBtb2RlID09PSAnZGV0ZXJtaW5hdGUnID8gZGFzaE9mZnNldFBlcmNlbnQgOiBudWxsfVwiPlxuICAgICAgICA8L2NpcmNsZT5cbiAgICA8L3N2Zz5cbjwvZGl2PlxuXG4iXX0=
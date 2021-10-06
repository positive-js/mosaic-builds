import { ChangeDetectionStrategy, Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
/** @nocollapse */ McProgressBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McProgressBar, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McProgressBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McProgressBar, selector: "mc-progress-bar", inputs: { color: "color", id: "id", value: "value", mode: "mode" }, host: { properties: { "attr.id": "id" }, classAttribute: "mc-progress-bar" }, usesInheritance: true, ngImport: i0, template: "\n<div class=\"mc-progress-bar__inner\" [ngSwitch]=\"mode\" [id]=\"id\">\n    <div\n        *ngSwitchCase=\"'indeterminate'\"\n        class=\"mc-progress-bar__line mc-progress-bar__line--indeterminate\">\n    </div>\n    <div\n        *ngSwitchDefault\n        class=\"mc-progress-bar__line mc-progress-bar__line--determinate\"\n        [ngStyle]=\"{transform: 'scaleX(' + percentage + ')'}\">\n    </div>\n</div>\n", styles: ["@keyframes mc-progress-bar-indeterminate{0%{transform:scaleX(.25) translate(-150%)}to{transform:scaleX(.4) translate(250%)}}.mc-progress-bar{display:block;height:4px;height:var(--mc-progress-bar-size-height, 4px);overflow:hidden}.mc-progress-bar__inner{height:100%}.mc-progress-bar__line{height:100%;transform-origin:top left}.mc-progress-bar__line--determinate{transition:transform .3s}.mc-progress-bar__line--indeterminate{animation:mc-progress-bar-indeterminate 2.1s cubic-bezier(.455,.03,.515,.955) infinite}\n"], directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McProgressBar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-progress-bar',
                    templateUrl: './progress-bar.component.html',
                    styleUrls: ['./progress-bar.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['color'],
                    host: {
                        class: 'mc-progress-bar',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wcm9ncmVzcy1iYXIvcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wcm9ncmVzcy1iYXIvcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBMEIsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7QUFLM0YsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRW5CLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN0QixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFFeEIsTUFBTSxPQUFPLGlCQUFpQjtJQUMxQiw2Q0FBNkM7SUFDN0MsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEO0FBRUQsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUNXLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFjbEcsTUFBTSxPQUFPLGFBQWMsU0FBUSxzQkFBc0I7SUFLckQsWUFBWSxVQUFzQjtRQUM5QixLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFMYixPQUFFLEdBQVcsbUJBQW1CLFVBQVUsRUFBRSxFQUFFLENBQUM7UUFDL0MsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixTQUFJLEdBQW9CLGFBQWEsQ0FBQztJQUkvQyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7SUFDbEYsQ0FBQzs7NkhBWFEsYUFBYTtpSEFBYixhQUFhLGdPQ3RDMUIsa2FBWUE7MkZEMEJhLGFBQWE7a0JBWnpCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsV0FBVyxFQUFFLCtCQUErQjtvQkFDNUMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNqQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjt3QkFDeEIsV0FBVyxFQUFFLElBQUk7cUJBQ3BCO2lCQUNKO2lHQUVZLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIG1peGluQ29sb3IsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBQcm9ncmVzc0Jhck1vZGUgPSAnZGV0ZXJtaW5hdGUnIHwgJ2luZGV0ZXJtaW5hdGUnO1xuXG5sZXQgaWRJdGVyYXRvciA9IDA7XG5cbmNvbnN0IE1JTl9QRVJDRU5UID0gMDtcbmNvbnN0IE1BWF9QRVJDRU5UID0gMTAwO1xuXG5leHBvcnQgY2xhc3MgTWNQcm9ncmVzc0JhckJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNQcm9ncmVzc0Jhck1peGluQmFzZTpcbiAgICBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNQcm9ncmVzc0JhckJhc2UgPSBtaXhpbkNvbG9yKE1jUHJvZ3Jlc3NCYXJCYXNlLCBUaGVtZVBhbGV0dGUuUHJpbWFyeSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtcHJvZ3Jlc3MtYmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzcy1iYXIuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXByb2dyZXNzLWJhcicsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Byb2dyZXNzQmFyIGV4dGVuZHMgTWNQcm9ncmVzc0Jhck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkNvbG9yIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLXByb2dyZXNzLWJhci0ke2lkSXRlcmF0b3IrK31gO1xuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIG1vZGU6IFByb2dyZXNzQmFyTW9kZSA9ICdkZXRlcm1pbmF0ZSc7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIGdldCBwZXJjZW50YWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNSU5fUEVSQ0VOVCwgTWF0aC5taW4oTUFYX1BFUkNFTlQsIHRoaXMudmFsdWUpKSAvIE1BWF9QRVJDRU5UO1xuICAgIH1cbn1cbiIsIlxuPGRpdiBjbGFzcz1cIm1jLXByb2dyZXNzLWJhcl9faW5uZXJcIiBbbmdTd2l0Y2hdPVwibW9kZVwiIFtpZF09XCJpZFwiPlxuICAgIDxkaXZcbiAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidpbmRldGVybWluYXRlJ1wiXG4gICAgICAgIGNsYXNzPVwibWMtcHJvZ3Jlc3MtYmFyX19saW5lIG1jLXByb2dyZXNzLWJhcl9fbGluZS0taW5kZXRlcm1pbmF0ZVwiPlxuICAgIDwvZGl2PlxuICAgIDxkaXZcbiAgICAgICAgKm5nU3dpdGNoRGVmYXVsdFxuICAgICAgICBjbGFzcz1cIm1jLXByb2dyZXNzLWJhcl9fbGluZSBtYy1wcm9ncmVzcy1iYXJfX2xpbmUtLWRldGVybWluYXRlXCJcbiAgICAgICAgW25nU3R5bGVdPVwie3RyYW5zZm9ybTogJ3NjYWxlWCgnICsgcGVyY2VudGFnZSArICcpJ31cIj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19
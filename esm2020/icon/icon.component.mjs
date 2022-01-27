import { Attribute, ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
// tslint:disable-next-line:naming-convention
export class McIconCSSStyler {
}
/** @nocollapse */ /** @nocollapse */ McIconCSSStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McIconCSSStyler, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McIconCSSStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McIconCSSStyler, selector: "[mc-icon]", host: { classAttribute: "mc mc-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McIconCSSStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-icon]',
                    host: { class: 'mc mc-icon' }
                }]
        }] });
export class McIconBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line: naming-convention
export const McIconMixinBase = mixinColor(McIconBase, ThemePalette.Empty);
export class McIcon extends McIconMixinBase {
    constructor(elementRef, iconName) {
        super(elementRef);
        if (iconName) {
            elementRef.nativeElement.classList.add(iconName);
        }
    }
    getHostElement() {
        return this._elementRef.nativeElement;
    }
}
/** @nocollapse */ /** @nocollapse */ McIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McIcon, deps: [{ token: i0.ElementRef }, { token: 'mc-icon', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McIcon.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McIcon, selector: "[mc-icon]", inputs: { color: "color" }, usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McIcon, decorators: [{
            type: Component,
            args: [{ selector: `[mc-icon]`, template: '<ng-content></ng-content>', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color'], styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['mc-icon']
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvaWNvbi9pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBMEIsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBTzNGLDZDQUE2QztBQUM3QyxNQUFNLE9BQU8sZUFBZTs7a0pBQWYsZUFBZTtzSUFBZixlQUFlOzJGQUFmLGVBQWU7a0JBTDNCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7aUJBQ2hDOztBQUtELE1BQU0sT0FBTyxVQUFVO0lBQ25CLDZDQUE2QztJQUM3QyxZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Q0FDakQ7QUFFRCw4Q0FBOEM7QUFDOUMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFxQyxVQUFVLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQVc1RyxNQUFNLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFDdkMsWUFBWSxVQUFzQixFQUF3QixRQUFnQjtRQUN0RSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbEIsSUFBSSxRQUFRLEVBQUU7WUFDVixVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEQ7SUFDTCxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDMUMsQ0FBQzs7eUlBWFEsTUFBTSw0Q0FDZ0MsU0FBUzs2SEFEL0MsTUFBTSxvR0FOTCwyQkFBMkI7MkZBTTVCLE1BQU07a0JBUmxCLFNBQVM7K0JBQ0ksV0FBVyxZQUNYLDJCQUEyQixtQkFFcEIsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxVQUM3QixDQUFDLE9BQU8sQ0FBQzs7MEJBR29CLFNBQVM7MkJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQXR0cmlidXRlLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1peGluQ29sb3IsIENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1pY29uXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jIG1jLWljb24nIH1cbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjbGFzcyBNY0ljb25DU1NTdHlsZXIge31cblxuXG5leHBvcnQgY2xhc3MgTWNJY29uQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNJY29uTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNJY29uQmFzZSA9IG1peGluQ29sb3IoTWNJY29uQmFzZSwgVGhlbWVQYWxldHRlLkVtcHR5KTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogYFttYy1pY29uXWAsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICBzdHlsZVVybHM6IFsnaWNvbi5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnY29sb3InXVxufSlcbmV4cG9ydCBjbGFzcyBNY0ljb24gZXh0ZW5kcyBNY0ljb25NaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEF0dHJpYnV0ZSgnbWMtaWNvbicpIGljb25OYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgaWYgKGljb25OYW1lKSB7XG4gICAgICAgICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChpY29uTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG4iXX0=
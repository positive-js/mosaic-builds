/**
 * @fileoverview added by tsickle
 * Generated from: icon.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Attribute, ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
// tslint:disable-next-line:naming-convention
export class McIconCSSStyler {
}
McIconCSSStyler.decorators = [
    { type: Directive, args: [{
                selector: '[mc-icon]',
                host: { class: 'mc mc-icon' }
            },] }
];
export class McIconBase {
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
    McIconBase.prototype._elementRef;
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
export const McIconMixinBase = mixinColor(McIconBase, ThemePalette.Empty);
export class McIcon extends McIconMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} iconName
     */
    constructor(elementRef, iconName) {
        super(elementRef);
        if (iconName) {
            elementRef.nativeElement.classList.add(iconName);
        }
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this._elementRef.nativeElement;
    }
}
McIcon.decorators = [
    { type: Component, args: [{
                selector: `[mc-icon]`,
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"]
            }] }
];
/** @nocollapse */
McIcon.ctorParameters = () => [
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['mc-icon',] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvaWNvbi8iLCJzb3VyY2VzIjpbImljb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQTBCLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTzNGLDZDQUE2QztBQUM3QyxNQUFNLE9BQU8sZUFBZTs7O1lBTDNCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTthQUNoQzs7QUFLRCxNQUFNLE9BQU8sVUFBVTs7Ozs7SUFFbkIsWUFBbUIsV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2pEOzs7SUFEZSxpQ0FBOEI7Ozs7QUFJOUMsTUFBTSxPQUFPLGVBQWUsR0FBcUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDO0FBVzNHLE1BQU0sT0FBTyxNQUFPLFNBQVEsZUFBZTs7Ozs7SUFDdkMsWUFBWSxVQUFzQixFQUF3QixRQUFnQjtRQUN0RSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbEIsSUFBSSxRQUFRLEVBQUU7WUFDVixVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEQ7SUFDTCxDQUFDOzs7O0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDMUMsQ0FBQzs7O1lBbkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLDJCQUEyQjtnQkFFckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7O2FBQ3BCOzs7O1lBOUJHLFVBQVU7eUNBZ0MyQixTQUFTLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQXR0cmlidXRlLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1peGluQ29sb3IsIENhbkNvbG9yLCBDYW5Db2xvckN0b3IsIFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1pY29uXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jIG1jLWljb24nIH1cbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjbGFzcyBNY0ljb25DU1NTdHlsZXIge31cblxuXG5leHBvcnQgY2xhc3MgTWNJY29uQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNJY29uTWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWNJY29uQmFzZSA9IG1peGluQ29sb3IoTWNJY29uQmFzZSwgVGhlbWVQYWxldHRlLkVtcHR5KTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogYFttYy1pY29uXWAsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICBzdHlsZVVybHM6IFsnaWNvbi5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnY29sb3InXVxufSlcbmV4cG9ydCBjbGFzcyBNY0ljb24gZXh0ZW5kcyBNY0ljb25NaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5Db2xvciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEF0dHJpYnV0ZSgnbWMtaWNvbicpIGljb25OYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgaWYgKGljb25OYW1lKSB7XG4gICAgICAgICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChpY29uTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG4iXX0=
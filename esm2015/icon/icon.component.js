/**
 * @fileoverview added by tsickle
 * Generated from: icon.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9pY29uLyIsInNvdXJjZXMiOlsiaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBMEIsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFPM0YsNkNBQTZDO0FBQzdDLE1BQU0sT0FBTyxlQUFlOzs7WUFMM0IsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO2FBQ2hDOztBQUtELE1BQU0sT0FBTyxVQUFVOzs7OztJQUVuQixZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Q0FDakQ7OztJQURlLGlDQUE4Qjs7OztBQUk5QyxNQUFNLE9BQU8sZUFBZSxHQUFxQyxVQUFVLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUM7QUFXM0csTUFBTSxPQUFPLE1BQU8sU0FBUSxlQUFlOzs7OztJQUN2QyxZQUFZLFVBQXNCLEVBQXdCLFFBQWdCO1FBQ3RFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsQixJQUFJLFFBQVEsRUFBRTtZQUNWLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDtJQUNMLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUMxQyxDQUFDOzs7WUFuQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsMkJBQTJCO2dCQUVyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQzs7YUFDcEI7Ozs7WUE5QkcsVUFBVTt5Q0FnQzJCLFNBQVMsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWl4aW5Db2xvciwgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgVGhlbWVQYWxldHRlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLWljb25dJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMgbWMtaWNvbicgfVxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNsYXNzIE1jSWNvbkNTU1N0eWxlciB7fVxuXG5cbmV4cG9ydCBjbGFzcyBNY0ljb25CYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0ljb25NaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY0ljb25CYXNlID0gbWl4aW5Db2xvcihNY0ljb25CYXNlLCBUaGVtZVBhbGV0dGUuRW1wdHkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBgW21jLWljb25dYCxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlVXJsczogWydpY29uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddXG59KVxuZXhwb3J0IGNsYXNzIE1jSWNvbiBleHRlbmRzIE1jSWNvbk1peGluQmFzZSBpbXBsZW1lbnRzIENhbkNvbG9yIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBAQXR0cmlidXRlKCdtYy1pY29uJykgaWNvbk5hbWU6IHN0cmluZykge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICBpZiAoaWNvbk5hbWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGljb25OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiJdfQ==
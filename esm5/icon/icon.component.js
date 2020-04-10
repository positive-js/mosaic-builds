/**
 * @fileoverview added by tsickle
 * Generated from: icon.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Attribute, ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation } from '@angular/core';
import { mixinColor, ThemePalette } from '@ptsecurity/mosaic/core';
var McIconCSSStyler = /** @class */ (function () {
    function McIconCSSStyler() {
    }
    McIconCSSStyler.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-icon]',
                    host: { class: 'mc mc-icon' }
                },] }
    ];
    return McIconCSSStyler;
}());
export { McIconCSSStyler };
var McIconBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McIconBase;
}());
export { McIconBase };
if (false) {
    /** @type {?} */
    McIconBase.prototype._elementRef;
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
export var McIconMixinBase = mixinColor(McIconBase, ThemePalette.Empty);
var McIcon = /** @class */ (function (_super) {
    __extends(McIcon, _super);
    function McIcon(elementRef, iconName) {
        var _this = _super.call(this, elementRef) || this;
        if (iconName) {
            elementRef.nativeElement.classList.add(iconName);
        }
        return _this;
    }
    /**
     * @return {?}
     */
    McIcon.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    McIcon.decorators = [
        { type: Component, args: [{
                    selector: "[mc-icon]",
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['color'],
                    styles: [".mc-icon-rotate_90{transform:rotate(90deg)}.mc-icon-rotate_180{transform:rotate(180deg)}.mc-icon-rotate_270{transform:rotate(270deg)}.mc-icon-flip-h{transform:scaleY(-1)}.mc-icon-flip-v{transform:scaleX(-1)}.mc-icon-flip-vh{transform:scale(-1)}"]
                }] }
    ];
    /** @nocollapse */
    McIcon.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['mc-icon',] }] }
    ]; };
    return McIcon;
}(McIconMixinBase));
export { McIcon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvaWNvbi8iLCJzb3VyY2VzIjpbImljb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUEwQixZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUczRjtJQUFBO0lBSzhCLENBQUM7O2dCQUw5QixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7aUJBQ2hDOztJQUU2QixzQkFBQztDQUFBLEFBTC9CLElBSytCO1NBQWxCLGVBQWU7QUFHNUI7SUFDSSw2Q0FBNkM7SUFDN0Msb0JBQW1CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUNsRCxpQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7O0lBRGUsaUNBQThCOzs7O0FBSTlDLE1BQU0sS0FBTyxlQUFlLEdBQXFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQztBQUczRztJQVE0QiwwQkFBZTtJQUN2QyxnQkFBWSxVQUFzQixFQUF3QixRQUFnQjtRQUExRSxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUtwQjtRQUhHLElBQUksUUFBUSxFQUFFO1lBQ1YsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BEOztJQUNMLENBQUM7Ozs7SUFFRCwrQkFBYzs7O0lBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQzFDLENBQUM7O2dCQW5CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSwyQkFBMkI7b0JBRXJDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDOztpQkFDcEI7Ozs7Z0JBOUJHLFVBQVU7NkNBZ0MyQixTQUFTLFNBQUMsU0FBUzs7SUFXNUQsYUFBQztDQUFBLEFBcEJELENBUTRCLGVBQWUsR0FZMUM7U0FaWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWl4aW5Db2xvciwgQ2FuQ29sb3IsIENhbkNvbG9yQ3RvciwgVGhlbWVQYWxldHRlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLWljb25dJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMgbWMtaWNvbicgfVxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNsYXNzIE1jSWNvbkNTU1N0eWxlciB7fVxuXG5cbmV4cG9ydCBjbGFzcyBNY0ljb25CYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0ljb25NaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIHR5cGVvZiBNY0ljb25CYXNlID0gbWl4aW5Db2xvcihNY0ljb25CYXNlLCBUaGVtZVBhbGV0dGUuRW1wdHkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBgW21jLWljb25dYCxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlVXJsczogWydpY29uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydjb2xvciddXG59KVxuZXhwb3J0IGNsYXNzIE1jSWNvbiBleHRlbmRzIE1jSWNvbk1peGluQmFzZSBpbXBsZW1lbnRzIENhbkNvbG9yIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBAQXR0cmlidXRlKCdtYy1pY29uJykgaWNvbk5hbWU6IHN0cmluZykge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICBpZiAoaWNvbk5hbWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGljb25OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiJdfQ==
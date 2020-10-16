/**
 * @fileoverview added by tsickle
 * Generated from: list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// todo пока не делаем, перенесено из материала, но у нас в доках таких простых списков нет.
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, QueryList, ViewEncapsulation } from '@angular/core';
import { McLine, McLineSetter } from '@ptsecurity/mosaic/core';
export class McList {
}
McList.decorators = [
    { type: Component, args: [{
                selector: 'mc-list',
                host: { class: 'mc-list' },
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-divider{border-top-style:solid;border-top-width:1px;display:block;margin:0}.mc-divider.mc-divider_vertical{border-right-style:solid;border-right-width:1px;border-top:0}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-no-select{-moz-user-select:none;-ms-user-select:none;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{border:2px solid transparent;display:block;height:28px}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{align-items:center;box-sizing:border-box;display:flex;flex-direction:row;height:100%;padding:0 15px;position:relative}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-bottom:16px;padding-top:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;padding:0;width:100%}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{font-size:inherit;font-weight:400;margin:0;padding:0}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{border-radius:50%;box-sizing:content-box;flex-shrink:0;font-size:24px;height:24px;padding:4px;width:24px}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{bottom:0;left:0;margin:0;position:absolute;width:100%}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
            }] }
];
export class McListItem {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // tslint:disable-next-line:no-unused-expression
        new McLineSetter(this.lines, this.elementRef);
    }
    /**
     * @return {?}
     */
    handleFocus() {
        this.elementRef.nativeElement.classList.add('mc-focused');
    }
    /**
     * @return {?}
     */
    handleBlur() {
        this.elementRef.nativeElement.classList.remove('mc-focused');
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
McListItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-list-item, a[mc-list-item]',
                host: {
                    class: 'mc-list-item',
                    '(focus)': 'handleFocus()',
                    '(blur)': 'handleBlur()'
                },
                template: "<div class=\"mc-list-item-content\">\n    <ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content>\n\n    <div class=\"mc-list-text\">\n        <ng-content select=\"[mc-line], [mcLine]\"></ng-content>\n    </div>\n\n    <ng-content></ng-content>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
McListItem.ctorParameters = () => [
    { type: ElementRef }
];
McListItem.propDecorators = {
    lines: [{ type: ContentChildren, args: [McLine,] }]
};
if (false) {
    /** @type {?} */
    McListItem.prototype.lines;
    /**
     * @type {?}
     * @private
     */
    McListItem.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9saXN0LyIsInNvdXJjZXMiOlsibGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUNlLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFDNUYsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFXL0QsTUFBTSxPQUFPLE1BQU07OztZQVJsQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7Z0JBQzFCLFFBQVEsRUFBRSwyQkFBMkI7Z0JBRXJDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7O0FBZ0JELE1BQU0sT0FBTyxVQUFVOzs7O0lBR25CLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOzs7O0lBRTlDLGtCQUFrQjtRQUNkLGdEQUFnRDtRQUNoRCxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7OztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN6QyxDQUFDOzs7WUFoQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsY0FBYztvQkFDckIsU0FBUyxFQUFFLGVBQWU7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO2lCQUMzQjtnQkFDRCxvUkFBK0I7Z0JBQy9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQTVCMEUsVUFBVTs7O29CQThCaEYsZUFBZSxTQUFDLE1BQU07Ozs7SUFBdkIsMkJBQWtEOzs7OztJQUV0QyxnQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0b2RvINC/0L7QutCwINC90LUg0LTQtdC70LDQtdC8LCDQv9C10YDQtdC90LXRgdC10L3QviDQuNC3INC80LDRgtC10YDQuNCw0LvQsCwg0L3QviDRgyDQvdCw0YEg0LIg0LTQvtC60LDRhSDRgtCw0LrQuNGFINC/0YDQvtGB0YLRi9GFINGB0L/QuNGB0LrQvtCyINC90LXRgi5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0xpbmUsIE1jTGluZVNldHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWxpc3QnLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy1saXN0JyB9LFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpc3Qge31cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWxpc3QtaXRlbSwgYVttYy1saXN0LWl0ZW1dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbGlzdC1pdGVtJyxcbiAgICAgICAgJyhmb2N1cyknOiAnaGFuZGxlRm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJ1xuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtaXRlbS5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jTGlzdEl0ZW0gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jTGluZSkgbGluZXM6IFF1ZXJ5TGlzdDxNY0xpbmU+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLWV4cHJlc3Npb25cbiAgICAgICAgbmV3IE1jTGluZVNldHRlcih0aGlzLmxpbmVzLCB0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1mb2N1c2VkJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1cigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWMtZm9jdXNlZCcpO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiJdfQ==
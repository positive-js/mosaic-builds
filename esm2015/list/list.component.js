/**
 * @fileoverview added by tsickle
 * Generated from: list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// todo пока не делаем, перенесено из материала, но у нас в доках таких простых списков нет.
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, QueryList, ViewEncapsulation } from '@angular/core';
import { McLine, McLineSetter } from '@ptsecurity/mosaic/core';
export class McListBase {
}
export class McList extends McListBase {
}
McList.decorators = [
    { type: Component, args: [{
                selector: 'mc-list',
                host: { class: 'mc-list' },
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider-inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider-inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list-item,.mc-list-option{display:block;height:28px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider-inset,.mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider-inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider-inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider-inset,.mc-list-option .mc-divider.mc-divider-inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
            }] }
];
// Boilerplate for applying mixins to McListItem.
export class McListItemBase {
}
export class McListItem extends McListItemBase {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        super();
        this._element = _element;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // tslint:disable-next-line:no-unused-expression
        new McLineSetter(this.lines, this._element);
    }
    /**
     * @return {?}
     */
    handleFocus() {
        this._element.nativeElement.classList.add('mc-focused');
    }
    /**
     * @return {?}
     */
    handleBlur() {
        this._element.nativeElement.classList.remove('mc-focused');
    }
    /**
     * @return {?}
     */
    getHostElement() {
        return this._element.nativeElement;
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
    McListItem.prototype._element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvbGlzdC8iLCJzb3VyY2VzIjpbImxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFDZSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQzVGLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRy9ELE1BQU0sT0FBTyxVQUFVO0NBQUc7QUFVMUIsTUFBTSxPQUFPLE1BQU8sU0FBUSxVQUFVOzs7WUFSckMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2dCQUMxQixRQUFRLEVBQUUsMkJBQTJCO2dCQUVyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7QUFLRCxNQUFNLE9BQU8sY0FBYztDQUFHO0FBYzlCLE1BQU0sT0FBTyxVQUFXLFNBQVEsY0FBYzs7OztJQUkxQyxZQUFvQixRQUFvQjtRQUNwQyxLQUFLLEVBQUUsQ0FBQztRQURRLGFBQVEsR0FBUixRQUFRLENBQVk7SUFFeEMsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNkLGdEQUFnRDtRQUNoRCxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7OztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDOzs7WUFuQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsY0FBYztvQkFDckIsU0FBUyxFQUFFLGVBQWU7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO2lCQUMzQjtnQkFDRCxvUkFBK0I7Z0JBQy9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQWpDMEUsVUFBVTs7O29CQW1DaEYsZUFBZSxTQUFDLE1BQU07Ozs7SUFBdkIsMkJBQWtEOzs7OztJQUd0Qyw4QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0b2RvINC/0L7QutCwINC90LUg0LTQtdC70LDQtdC8LCDQv9C10YDQtdC90LXRgdC10L3QviDQuNC3INC80LDRgtC10YDQuNCw0LvQsCwg0L3QviDRgyDQvdCw0YEg0LIg0LTQvtC60LDRhSDRgtCw0LrQuNGFINC/0YDQvtGB0YLRi9GFINGB0L/QuNGB0LrQvtCyINC90LXRgi5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0xpbmUsIE1jTGluZVNldHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5leHBvcnQgY2xhc3MgTWNMaXN0QmFzZSB7fVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWxpc3QnLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy1saXN0JyB9LFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpc3QgZXh0ZW5kcyBNY0xpc3RCYXNlIHt9XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY0xpc3RJdGVtLlxuZXhwb3J0IGNsYXNzIE1jTGlzdEl0ZW1CYXNlIHt9XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbGlzdC1pdGVtLCBhW21jLWxpc3QtaXRlbV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1saXN0LWl0ZW0nLFxuICAgICAgICAnKGZvY3VzKSc6ICdoYW5kbGVGb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdoYW5kbGVCbHVyKCknXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1pdGVtLmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNMaXN0SXRlbSBleHRlbmRzIE1jTGlzdEl0ZW1CYXNlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQENvbnRlbnRDaGlsZHJlbihNY0xpbmUpIGxpbmVzOiBRdWVyeUxpc3Q8TWNMaW5lPjtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC1leHByZXNzaW9uXG4gICAgICAgIG5ldyBNY0xpbmVTZXR0ZXIodGhpcy5saW5lcywgdGhpcy5fZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1mb2N1c2VkJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1cigpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ21jLWZvY3VzZWQnKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19
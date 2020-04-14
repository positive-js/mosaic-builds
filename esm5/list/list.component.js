/**
 * @fileoverview added by tsickle
 * Generated from: list.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// todo пока не делаем, перенесено из материала, но у нас в доках таких простых списков нет.
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, QueryList, ViewEncapsulation } from '@angular/core';
import { McLine, McLineSetter } from '@ptsecurity/mosaic/core';
var McList = /** @class */ (function () {
    function McList() {
    }
    McList.decorators = [
        { type: Component, args: [{
                    selector: 'mc-list',
                    host: { class: 'mc-list' },
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mc-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:0}.mc-list-item,.mc-list-option{display:block;height:28px;border:2px solid transparent}.mc-list-item .mc-list-item-content,.mc-list-option .mc-list-item-content{position:relative;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;height:100%;padding:0 15px}.mc-list-item.mc-2-line,.mc-list-option.mc-2-line{height:72px}.mc-list-item.mc-3-line,.mc-list-option.mc-3-line{height:88px}.mc-list-item.mc-multi-line,.mc-list-option.mc-multi-line{height:auto}.mc-list-item.mc-multi-line .mc-list-item-content,.mc-list-option.mc-multi-line .mc-list-item-content{padding-top:16px;padding-bottom:16px}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),.mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-right:0}[dir=rtl] .mc-list-item .mc-list-item-content .mc-list-text:not(:nth-child(2)),[dir=rtl] .mc-list-option .mc-list-item-content .mc-list-text:not(:nth-child(2)){padding-left:0}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;height:24px;border-radius:50%;padding:4px;font-size:24px}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:62px;width:calc(100% - 62px)}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:62px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}"]
                }] }
    ];
    return McList;
}());
export { McList };
var McListItem = /** @class */ (function () {
    function McListItem(elementRef) {
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    McListItem.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // tslint:disable-next-line:no-unused-expression
        new McLineSetter(this.lines, this.elementRef);
    };
    /**
     * @return {?}
     */
    McListItem.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.classList.add('mc-focused');
    };
    /**
     * @return {?}
     */
    McListItem.prototype.handleBlur = /**
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.classList.remove('mc-focused');
    };
    /**
     * @return {?}
     */
    McListItem.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement;
    };
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
    McListItem.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    McListItem.propDecorators = {
        lines: [{ type: ContentChildren, args: [McLine,] }]
    };
    return McListItem;
}());
export { McListItem };
if (false) {
    /** @type {?} */
    McListItem.prototype.lines;
    /**
     * @type {?}
     * @private
     */
    McListItem.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvbGlzdC8iLCJzb3VyY2VzIjpbImxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFDZSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQzVGLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRy9EO0lBQUE7SUFRcUIsQ0FBQzs7Z0JBUnJCLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtvQkFDMUIsUUFBUSxFQUFFLDJCQUEyQjtvQkFFckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDeEM7O0lBQ29CLGFBQUM7Q0FBQSxBQVJ0QixJQVFzQjtTQUFULE1BQU07QUFHbkI7SUFlSSxvQkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7Ozs7SUFFOUMsdUNBQWtCOzs7SUFBbEI7UUFDSSxnREFBZ0Q7UUFDaEQsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELGdDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7OztJQUVELCtCQUFVOzs7SUFBVjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELG1DQUFjOzs7SUFBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQzs7Z0JBaENKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLGNBQWM7d0JBQ3JCLFNBQVMsRUFBRSxlQUFlO3dCQUMxQixRQUFRLEVBQUUsY0FBYztxQkFDM0I7b0JBQ0Qsb1JBQStCO29CQUMvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQTVCMEUsVUFBVTs7O3dCQThCaEYsZUFBZSxTQUFDLE1BQU07O0lBb0IzQixpQkFBQztDQUFBLEFBakNELElBaUNDO1NBckJZLFVBQVU7OztJQUNuQiwyQkFBa0Q7Ozs7O0lBRXRDLGdDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRvZG8g0L/QvtC60LAg0L3QtSDQtNC10LvQsNC10LwsINC/0LXRgNC10L3QtdGB0LXQvdC+INC40Lcg0LzQsNGC0LXRgNC40LDQu9CwLCDQvdC+INGDINC90LDRgSDQsiDQtNC+0LrQsNGFINGC0LDQutC40YUg0L/RgNC+0YHRgtGL0YUg0YHQv9C40YHQutC+0LIg0L3QtdGCLlxuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jTGluZSwgTWNMaW5lU2V0dGVyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbGlzdCcsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLWxpc3QnIH0sXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICBzdHlsZVVybHM6IFsnLi9saXN0LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jTGlzdCB7fVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtbGlzdC1pdGVtLCBhW21jLWxpc3QtaXRlbV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1saXN0LWl0ZW0nLFxuICAgICAgICAnKGZvY3VzKSc6ICdoYW5kbGVGb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdoYW5kbGVCbHVyKCknXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1pdGVtLmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNMaXN0SXRlbSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNMaW5lKSBsaW5lczogUXVlcnlMaXN0PE1jTGluZT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxuICAgICAgICBuZXcgTWNMaW5lU2V0dGVyKHRoaXMubGluZXMsIHRoaXMuZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgaGFuZGxlRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLWZvY3VzZWQnKTtcbiAgICB9XG5cbiAgICBoYW5kbGVCbHVyKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtYy1mb2N1c2VkJyk7XG4gICAgfVxuXG4gICAgZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19
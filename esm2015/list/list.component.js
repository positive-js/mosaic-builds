// todo пока не делаем, перенесено из материала, но у нас в доках таких простых списков нет.
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, QueryList, ViewEncapsulation } from '@angular/core';
import { McLine, McLineSetter } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
export class McList {
}
/** @nocollapse */ McList.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McList, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McList.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McList, selector: "mc-list", host: { classAttribute: "mc-list" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}.mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-list,.mc-list-selection{display:block;outline:none}.mc-list-item,.mc-list-option{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;position:relative;display:flex;align-items:center;box-sizing:border-box;height:32px;height:var(--mc-list-size-item-height, 32px);border:2px solid transparent;padding-left:16px;padding-left:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text,.mc-list-option .mc-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding-right:16px;padding-right:var(--mc-list-size-horizontal-padding, 16px)}.mc-list-item .mc-list-text>*,.mc-list-option .mc-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mc-list-item .mc-list-text:empty,.mc-list-option .mc-list-text:empty{display:none}.mc-list-item .mc-list-icon,.mc-list-option .mc-list-icon{box-sizing:content-box;flex-shrink:0;width:24px;width:var(--mc-list-size-icon-width, 24px);height:24px;height:var(--mc-list-size-icon-width, 24px);border-radius:50%;padding:4px;padding:var(--mc-list-size-icon-padding, 4px);font-size:24px;font-size:var(--mc-list-size-icon-width, 24px)}.mc-list-item .mc-list-icon~.mc-divider_inset,.mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:32pxvar(--mc-list-size-icon-width,24px)8px;width:100%-32pxvar(--mc-list-size-icon-width,24px)8px}[dir=rtl] .mc-list-item .mc-list-icon~.mc-divider_inset,[dir=rtl] .mc-list-option .mc-list-icon~.mc-divider_inset{margin-left:auto;margin-right:32pxvar(--mc-list-size-icon-width,24px)8px}.mc-list-item .mc-divider,.mc-list-option .mc-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mc-list-item .mc-divider,[dir=rtl] .mc-list-option .mc-divider{margin-left:auto;margin-right:0}.mc-list-item .mc-divider.mc-divider_inset,.mc-list-option .mc-divider.mc-divider_inset{position:absolute}.mc-list-item.mc-progress:after,.mc-list-option.mc-progress:after{top:-2px;right:-2px;bottom:-2px;left:-2px}.mc-list-item .mc-pseudo-checkbox,.mc-list-option .mc-pseudo-checkbox{margin-right:8px}.mc-list-item .mc-option-action,.mc-list-option .mc-option-action{display:none}.mc-list-item:not([disabled]):hover .mc-option-action,.mc-list-item:not([disabled]).mc-focused .mc-option-action,.mc-list-item:not([disabled]).mc-action-button-focused .mc-option-action,.mc-list-option:not([disabled]):hover .mc-option-action,.mc-list-option:not([disabled]).mc-focused .mc-option-action,.mc-list-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}.mc-list-option:not([disabled]):not(.mc-disabled){cursor:pointer}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McList, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-list',
                    host: { class: 'mc-list' },
                    template: '<ng-content></ng-content>',
                    styleUrls: ['./list.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }] });
export class McListItem {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngAfterContentInit() {
        // tslint:disable-next-line:no-unused-expression
        new McLineSetter(this.lines, this.elementRef);
    }
    handleFocus() {
        this.elementRef.nativeElement.classList.add('mc-focused');
    }
    handleBlur() {
        this.elementRef.nativeElement.classList.remove('mc-focused');
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
/** @nocollapse */ McListItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McListItem, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McListItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McListItem, selector: "mc-list-item, a[mc-list-item]", host: { listeners: { "focus": "handleFocus()", "blur": "handleBlur()" }, classAttribute: "mc-list-item" }, queries: [{ propertyName: "lines", predicate: McLine }], ngImport: i0, template: "<ng-content select=\"[mc-list-icon], [mcListIcon]\"></ng-content>\n\n<div class=\"mc-list-text\">\n    <ng-content select=\"[mc-line], [mcLine]\"></ng-content>\n</div>\n\n<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McListItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-list-item, a[mc-list-item]',
                    host: {
                        class: 'mc-list-item',
                        '(focus)': 'handleFocus()',
                        '(blur)': 'handleBlur()'
                    },
                    templateUrl: './list-item.html',
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { lines: [{
                type: ContentChildren,
                args: [McLine]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvbGlzdC9saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9saXN0L2xpc3QtaXRlbS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRGQUE0RjtBQUM1RixPQUFPLEVBQ2UsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUM1RixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFXL0QsTUFBTSxPQUFPLE1BQU07O3NIQUFOLE1BQU07MEdBQU4sTUFBTSxvRkFMTCwyQkFBMkI7MkZBSzVCLE1BQU07a0JBUmxCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7b0JBQzFCLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7QUFnQkQsTUFBTSxPQUFPLFVBQVU7SUFHbkIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFOUMsa0JBQWtCO1FBQ2QsZ0RBQWdEO1FBQ2hELElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3pDLENBQUM7OzBIQXBCUSxVQUFVOzhHQUFWLFVBQVUsc01BQ0YsTUFBTSw2QkNoQzNCLHdNQU9BOzJGRHdCYSxVQUFVO2tCQVp0QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsY0FBYzt3QkFDckIsU0FBUyxFQUFFLGVBQWU7d0JBQzFCLFFBQVEsRUFBRSxjQUFjO3FCQUMzQjtvQkFDRCxXQUFXLEVBQUUsa0JBQWtCO29CQUMvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEO2lHQUU0QixLQUFLO3NCQUE3QixlQUFlO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0b2RvINC/0L7QutCwINC90LUg0LTQtdC70LDQtdC8LCDQv9C10YDQtdC90LXRgdC10L3QviDQuNC3INC80LDRgtC10YDQuNCw0LvQsCwg0L3QviDRgyDQvdCw0YEg0LIg0LTQvtC60LDRhSDRgtCw0LrQuNGFINC/0YDQvtGB0YLRi9GFINGB0L/QuNGB0LrQvtCyINC90LXRgi5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0xpbmUsIE1jTGluZVNldHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWxpc3QnLFxuICAgIGhvc3Q6IHsgY2xhc3M6ICdtYy1saXN0JyB9LFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpc3Qge31cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWxpc3QtaXRlbSwgYVttYy1saXN0LWl0ZW1dJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbGlzdC1pdGVtJyxcbiAgICAgICAgJyhmb2N1cyknOiAnaGFuZGxlRm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJ1xuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtaXRlbS5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jTGlzdEl0ZW0gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jTGluZSkgbGluZXM6IFF1ZXJ5TGlzdDxNY0xpbmU+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLWV4cHJlc3Npb25cbiAgICAgICAgbmV3IE1jTGluZVNldHRlcih0aGlzLmxpbmVzLCB0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYy1mb2N1c2VkJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQmx1cigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWMtZm9jdXNlZCcpO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbiIsIjxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1saXN0LWljb25dLCBbbWNMaXN0SWNvbl1cIj48L25nLWNvbnRlbnQ+XG5cbjxkaXYgY2xhc3M9XCJtYy1saXN0LXRleHRcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWMtbGluZV0sIFttY0xpbmVdXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5cbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==
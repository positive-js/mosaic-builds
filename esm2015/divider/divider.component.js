import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class McDivider {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    // Whether the divider is vertically aligned.
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    // Whether the divider is an inset divider.
    get inset() {
        return this._inset;
    }
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
}
McDivider.decorators = [
    { type: Component, args: [{
                selector: 'mc-divider',
                host: {
                    class: 'mc-divider',
                    role: 'separator',
                    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
                    '[class.mc-divider_vertical]': 'vertical',
                    '[class.mc-divider_inset]': 'inset'
                },
                template: '',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                styles: [".mc-divider{display:block;margin:0;border-top-width:var(--mc-divider-size-width,1px);border-top-style:solid}.mc-divider.mc-divider_vertical{border-top:0;border-right-width:var(--mc-divider-size-width,1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:var(--mc-divider-size-inset-margin,80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:var(--mc-divider-size-inset-margin,80px)}"]
            },] }
];
McDivider.propDecorators = {
    vertical: [{ type: Input }],
    inset: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGl2aWRlci9kaXZpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWtCN0YsTUFBTSxPQUFPLFNBQVM7SUFmdEI7UUEwQlksY0FBUyxHQUFZLEtBQUssQ0FBQztRQVkzQixXQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUF2QkcsNkNBQTZDO0lBQzdDLElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFJRCwyQ0FBMkM7SUFDM0MsSUFDSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7O1lBcENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsV0FBVztvQkFDakIseUJBQXlCLEVBQUUsc0NBQXNDO29CQUNqRSw2QkFBNkIsRUFBRSxVQUFVO29CQUN6QywwQkFBMEIsRUFBRSxPQUFPO2lCQUN0QztnQkFDRCxRQUFRLEVBQUUsRUFBRTtnQkFFWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7O2FBQzdCOzs7dUJBR0ksS0FBSztvQkFZTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZGl2aWRlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWRpdmlkZXInLFxuICAgICAgICByb2xlOiAnc2VwYXJhdG9yJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtb3JpZW50YXRpb25dJzogJ3ZlcnRpY2FsID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCInLFxuICAgICAgICAnW2NsYXNzLm1jLWRpdmlkZXJfdmVydGljYWxdJzogJ3ZlcnRpY2FsJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXZpZGVyX2luc2V0XSc6ICdpbnNldCdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBzdHlsZVVybHM6IFsnZGl2aWRlci5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBNY0RpdmlkZXIge1xuICAgIC8vIFdoZXRoZXIgdGhlIGRpdmlkZXIgaXMgdmVydGljYWxseSBhbGlnbmVkLlxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gICAgfVxuXG4gICAgc2V0IHZlcnRpY2FsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3ZlcnRpY2FsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92ZXJ0aWNhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gV2hldGhlciB0aGUgZGl2aWRlciBpcyBhbiBpbnNldCBkaXZpZGVyLlxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGluc2V0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5zZXQ7XG4gICAgfVxuXG4gICAgc2V0IGluc2V0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2luc2V0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbnNldDogYm9vbGVhbiA9IGZhbHNlO1xufVxuIl19
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, Renderer2, QueryList, ContentChildren } from '@angular/core';
import { mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
export class McButtonCssStyler {
    constructor(elementRef, renderer) {
        this.renderer = renderer;
        this.nativeElement = elementRef.nativeElement;
    }
    get isIconButton() {
        return this.icons.length > 0;
    }
    ngAfterContentInit() {
        this.updateClassModifierForIcons();
    }
    updateClassModifierForIcons() {
        const twoIcons = 2;
        const [firstIconElement, secondIconElement] = this.icons.map((item) => item.getHostElement());
        if (this.icons.length === 1) {
            this.renderer.removeClass(firstIconElement, 'mc-icon_left');
            this.renderer.removeClass(this.nativeElement, 'mc-icon-button_left');
            this.renderer.removeClass(firstIconElement, 'mc-icon_right');
            this.renderer.removeClass(this.nativeElement, 'mc-icon-button_right');
            const COMMENT_NODE = 8;
            if (firstIconElement.nextSibling && firstIconElement.nextSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_left');
                this.renderer.addClass(this.nativeElement, 'mc-icon-button_left');
            }
            if (firstIconElement.previousSibling && firstIconElement.previousSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_right');
                this.renderer.addClass(this.nativeElement, 'mc-icon-button_right');
            }
        }
        else if (this.icons.length === twoIcons) {
            this.renderer.addClass(firstIconElement, 'mc-icon_left');
            this.renderer.addClass(secondIconElement, 'mc-icon_right');
        }
    }
}
McButtonCssStyler.decorators = [
    { type: Directive, args: [{
                selector: 'button[mc-button], a[mc-button]',
                host: {
                    '[class.mc-button]': '!isIconButton',
                    '[class.mc-icon-button]': 'isIconButton'
                }
            },] }
];
/** @nocollapse */
McButtonCssStyler.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
McButtonCssStyler.propDecorators = {
    icons: [{ type: ContentChildren, args: [McIcon, { descendants: true },] }]
};
export class McButtonBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McButtonMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McButtonBase)));
export class McButton extends McButtonMixinBase {
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this._focusMonitor = _focusMonitor;
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    focus() {
        this.getHostElement().focus();
    }
    focusViaKeyboard() {
        this._focusMonitor.focusVia(this.getHostElement(), 'keyboard');
    }
    getHostElement() {
        return this._elementRef.nativeElement;
    }
}
McButton.decorators = [
    { type: Component, args: [{
                selector: 'button[mc-button]',
                template: "<div class=\"mc-button-wrapper\">\n    <ng-content></ng-content>\n</div>\n<div class=\"mc-button-overlay\"></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled', 'color'],
                host: {
                    '[attr.disabled]': 'disabled || null'
                },
                styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;border:var(--mc-button-size-border-width,1px) solid transparent;border-radius:var(--mc-button-size-border-radius,3px)}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:none}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:var(--mc-icon-button-size-icon-padding,8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:var(--mc-icon-button-size-icon-padding,8px)}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"]
            },] }
];
/** @nocollapse */
McButton.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
export class McAnchor extends McButton {
    constructor(focusMonitor, elementRef) {
        super(elementRef, focusMonitor);
    }
    haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
McAnchor.decorators = [
    { type: Component, args: [{
                selector: 'a[mc-button]',
                template: "<div class=\"mc-button-wrapper\">\n    <ng-content></ng-content>\n</div>\n<div class=\"mc-button-overlay\"></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['disabled', 'color', 'tabIndex'],
                host: {
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.disabled]': 'disabled || null',
                    '(click)': 'haltDisabledEvents($event)'
                },
                styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;border:var(--mc-button-size-border-width,1px) solid transparent;border-radius:var(--mc-button-size-border-radius,3px)}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:none}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:var(--mc-icon-button-size-icon-padding,8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:var(--mc-icon-button-size-icon-padding,8px)}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"]
            },] }
];
/** @nocollapse */
McAnchor.ctorParameters = () => [
    { type: FocusMonitor },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFFVixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxlQUFlLEVBRWxCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFNaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFVakQsTUFBTSxPQUFPLGlCQUFpQjtJQVMxQixZQUFZLFVBQXNCLEVBQVUsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUMzRCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDbEQsQ0FBQztJQU5ELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFNRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMkJBQTJCO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFFOUYsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFD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ICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgUmVuZGVyZXIyLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgQWZ0ZXJDb250ZW50SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgQ2FuQ29sb3IsXG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBDYW5Db2xvckN0b3IsXG4gICAgSGFzVGFiSW5kZXhDdG9yXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jSWNvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2J1dHRvblttYy1idXR0b25dLCBhW21jLWJ1dHRvbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5tYy1idXR0b25dJzogJyFpc0ljb25CdXR0b24nLFxuICAgICAgICAnW2NsYXNzLm1jLWljb24tYnV0dG9uXSc6ICdpc0ljb25CdXR0b24nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0J1dHRvbkNzc1N0eWxlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNJY29uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGljb25zOiBRdWVyeUxpc3Q8TWNJY29uPjtcblxuICAgIG5hdGl2ZUVsZW1lbnQ6IEVsZW1lbnQ7XG5cbiAgICBnZXQgaXNJY29uQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pY29ucy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNsYXNzTW9kaWZpZXJGb3JJY29ucygpO1xuICAgIH1cblxuICAgIHVwZGF0ZUNsYXNzTW9kaWZpZXJGb3JJY29ucygpIHtcbiAgICAgICAgY29uc3QgdHdvSWNvbnMgPSAyO1xuICAgICAgICBjb25zdCBbZmlyc3RJY29uRWxlbWVudCwgc2Vjb25kSWNvbkVsZW1lbnRdID0gdGhpcy5pY29ucy5tYXAoKGl0ZW0pID0+IGl0ZW0uZ2V0SG9zdEVsZW1lbnQoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaWNvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGZpcnN0SWNvbkVsZW1lbnQsICdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5uYXRpdmVFbGVtZW50LCAnbWMtaWNvbi1idXR0b25fbGVmdCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLm5hdGl2ZUVsZW1lbnQsICdtYy1pY29uLWJ1dHRvbl9yaWdodCcpO1xuXG4gICAgICAgICAgICBjb25zdCBDT01NRU5UX05PREUgPSA4O1xuXG4gICAgICAgICAgICBpZiAoZmlyc3RJY29uRWxlbWVudC5uZXh0U2libGluZyAmJiBmaXJzdEljb25FbGVtZW50Lm5leHRTaWJsaW5nLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGZpcnN0SWNvbkVsZW1lbnQsICdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubmF0aXZlRWxlbWVudCwgJ21jLWljb24tYnV0dG9uX2xlZnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpcnN0SWNvbkVsZW1lbnQucHJldmlvdXNTaWJsaW5nICYmIGZpcnN0SWNvbkVsZW1lbnQucHJldmlvdXNTaWJsaW5nLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGZpcnN0SWNvbkVsZW1lbnQsICdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLm5hdGl2ZUVsZW1lbnQsICdtYy1pY29uLWJ1dHRvbl9yaWdodCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWNvbnMubGVuZ3RoID09PSB0d29JY29ucykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHNlY29uZEljb25FbGVtZW50LCAnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWNCdXR0b25CYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jQnV0dG9uTWl4aW5CYXNlOiBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIENhbkNvbG9yQ3RvciAmXG4gICAgdHlwZW9mIE1jQnV0dG9uQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5Db2xvcihtaXhpbkRpc2FibGVkKE1jQnV0dG9uQmFzZSkpKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2J1dHRvblttYy1idXR0b25dJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9idXR0b24uc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ2NvbG9yJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0J1dHRvbiBleHRlbmRzIE1jQnV0dG9uTWl4aW5CYXNlIGltcGxlbWVudHMgT25EZXN0cm95LCBDYW5EaXNhYmxlLCBDYW5Db2xvciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzVmlhS2V5Ym9hcmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmdldEhvc3RFbGVtZW50KCksICdrZXlib2FyZCcpO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FbbWMtYnV0dG9uXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2J1dHRvbi5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnY29sb3InLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAgICAgICAnKGNsaWNrKSc6ICdoYWx0RGlzYWJsZWRFdmVudHMoJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQW5jaG9yIGV4dGVuZHMgTWNCdXR0b24ge1xuICAgIGNvbnN0cnVjdG9yKGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIGZvY3VzTW9uaXRvcik7XG4gICAgfVxuXG4gICAgaGFsdERpc2FibGVkRXZlbnRzKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
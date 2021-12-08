import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, Renderer2, QueryList, ContentChildren } from '@angular/core';
import { mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
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
/** @nocollapse */ McButtonCssStyler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonCssStyler, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McButtonCssStyler.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McButtonCssStyler, selector: "button[mc-button], a[mc-button]", host: { properties: { "class.mc-button": "!isIconButton", "class.mc-icon-button": "isIconButton" } }, queries: [{ propertyName: "icons", predicate: McIcon, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButtonCssStyler, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mc-button], a[mc-button]',
                    host: {
                        '[class.mc-button]': '!isIconButton',
                        '[class.mc-icon-button]': 'isIconButton'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { icons: [{
                type: ContentChildren,
                args: [McIcon, { descendants: true }]
            }] } });
export class McButtonBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
export const McButtonMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McButtonBase)));
export class McButton extends McButtonMixinBase {
    constructor(elementRef, focusMonitor) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.hasFocus = false;
        this.focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    onFocus($event) {
        $event.stopPropagation();
        this.hasFocus = true;
    }
    onBlur() {
        this.hasFocus = false;
    }
    getHostElement() {
        return this._elementRef.nativeElement;
    }
    focus() {
        this.hasFocus = true;
        this.getHostElement().focus();
    }
    focusViaKeyboard() {
        this.hasFocus = true;
        this.focusMonitor.focusVia(this.getHostElement(), 'keyboard');
    }
}
/** @nocollapse */ McButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButton, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McButton, selector: "button[mc-button]", inputs: { tabIndex: "tabIndex", disabled: "disabled", color: "color" }, host: { listeners: { "focus": "onFocus($event)", "blur": "onBlur()" }, properties: { "attr.disabled": "disabled || null", "attr.tabIndex": "tabIndex" } }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-button-wrapper\">\n    <ng-content></ng-content>\n</div>\n<div class=\"mc-button-overlay\"></div>\n", styles: [".mc-icon-button,.mc-light-button,.mc-button{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;border:1px solid transparent;border:var(--mc-button-size-border-width, 1px) solid transparent;border-radius:3px;border-radius:var(--mc-button-size-border-radius, 3px)}.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner,.mc-button::-moz-focus-inner{border:0}.mc-icon-button:focus,.mc-light-button:focus,.mc-button:focus{outline:none}[disabled].mc-icon-button,[disabled].mc-light-button,[disabled].mc-button{pointer-events:none;cursor:default}.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button,.cdk-focused.mc-button{z-index:1}.mc-button{padding:calc(6px - 1px) calc(16px - 1px);padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:calc(6px - 1px) calc(8px - 1px);padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:calc(16px - 1px);padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:calc(16px - 1px);padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:8px;margin-right:var(--mc-icon-button-size-icon-padding, 8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:8px;margin-left:var(--mc-icon-button-size-icon-padding, 8px)}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'button[mc-button]',
                    templateUrl: './button.component.html',
                    styleUrls: ['./button.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['tabIndex', 'disabled', 'color'],
                    host: {
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabIndex]': 'tabIndex',
                        '(focus)': 'onFocus($event)',
                        '(blur)': 'onBlur()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }]; } });
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
/** @nocollapse */ McAnchor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McAnchor, deps: [{ token: i1.FocusMonitor }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McAnchor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McAnchor, selector: "a[mc-button]", inputs: { disabled: "disabled", color: "color", tabIndex: "tabIndex" }, host: { listeners: { "click": "haltDisabledEvents($event)" }, properties: { "attr.tabindex": "tabIndex", "attr.disabled": "disabled || null" } }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-button-wrapper\">\n    <ng-content></ng-content>\n</div>\n<div class=\"mc-button-overlay\"></div>\n", styles: [".mc-icon-button,.mc-light-button,.mc-button{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;border:1px solid transparent;border:var(--mc-button-size-border-width, 1px) solid transparent;border-radius:3px;border-radius:var(--mc-button-size-border-radius, 3px)}.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner,.mc-button::-moz-focus-inner{border:0}.mc-icon-button:focus,.mc-light-button:focus,.mc-button:focus{outline:none}[disabled].mc-icon-button,[disabled].mc-light-button,[disabled].mc-button{pointer-events:none;cursor:default}.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button,.cdk-focused.mc-button{z-index:1}.mc-button{padding:calc(6px - 1px) calc(16px - 1px);padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:calc(6px - 1px) calc(8px - 1px);padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:calc(16px - 1px);padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:calc(16px - 1px);padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:8px;margin-right:var(--mc-icon-button-size-icon-padding, 8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:8px;margin-left:var(--mc-icon-button-size-icon-padding, 8px)}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McAnchor, decorators: [{
            type: Component,
            args: [{
                    selector: 'a[mc-button]',
                    templateUrl: './button.component.html',
                    styleUrls: ['button.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled', 'color', 'tabIndex'],
                    host: {
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': 'haltDisabledEvents($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.FocusMonitor }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9idXR0b24vYnV0dG9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUVWLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULGVBQWUsRUFFbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFVBQVUsRUFDVixhQUFhLEVBQ2IsYUFBYSxFQU1oQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBVWpELE1BQU0sT0FBTyxpQkFBaUI7SUFTMUIsWUFBWSxVQUFzQixFQUFVLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ2xELENBQUM7SUFORCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBTUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELDJCQUEyQjtRQUN2QixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFj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QUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELGtCQUFrQixDQUFDLEtBQVk7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQzs7eUhBVlEsUUFBUTs2R0FBUixRQUFRLHFTQzlKckIscUhBSUE7NEZEMEphLFFBQVE7a0JBYnBCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFdBQVcsRUFBRSx5QkFBeUI7b0JBQ3RDLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQztvQkFDekMsSUFBSSxFQUFFO3dCQUNGLGlCQUFpQixFQUFFLFVBQVU7d0JBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjt3QkFDckMsU0FBUyxFQUFFLDRCQUE0QjtxQkFDMUM7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgUmVuZGVyZXIyLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgQWZ0ZXJDb250ZW50SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgbWl4aW5Db2xvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXgsXG4gICAgQ2FuQ29sb3IsXG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBDYW5Db2xvckN0b3IsXG4gICAgSGFzVGFiSW5kZXhDdG9yXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jSWNvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2J1dHRvblttYy1idXR0b25dLCBhW21jLWJ1dHRvbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5tYy1idXR0b25dJzogJyFpc0ljb25CdXR0b24nLFxuICAgICAgICAnW2NsYXNzLm1jLWljb24tYnV0dG9uXSc6ICdpc0ljb25CdXR0b24nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0J1dHRvbkNzc1N0eWxlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNJY29uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGljb25zOiBRdWVyeUxpc3Q8TWNJY29uPjtcblxuICAgIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgZ2V0IGlzSWNvbkJ1dHRvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbnMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDbGFzc01vZGlmaWVyRm9ySWNvbnMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDbGFzc01vZGlmaWVyRm9ySWNvbnMoKSB7XG4gICAgICAgIGNvbnN0IHR3b0ljb25zID0gMjtcbiAgICAgICAgY29uc3QgW2ZpcnN0SWNvbkVsZW1lbnQsIHNlY29uZEljb25FbGVtZW50XSA9IHRoaXMuaWNvbnMubWFwKChpdGVtKSA9PiBpdGVtLmdldEhvc3RFbGVtZW50KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmljb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMubmF0aXZlRWxlbWVudCwgJ21jLWljb24tYnV0dG9uX2xlZnQnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5uYXRpdmVFbGVtZW50LCAnbWMtaWNvbi1idXR0b25fcmlnaHQnKTtcblxuICAgICAgICAgICAgY29uc3QgQ09NTUVOVF9OT0RFID0gODtcblxuICAgICAgICAgICAgaWYgKGZpcnN0SWNvbkVsZW1lbnQubmV4dFNpYmxpbmcgJiYgZmlyc3RJY29uRWxlbWVudC5uZXh0U2libGluZy5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLm5hdGl2ZUVsZW1lbnQsICdtYy1pY29uLWJ1dHRvbl9sZWZ0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmaXJzdEljb25FbGVtZW50LnByZXZpb3VzU2libGluZyAmJiBmaXJzdEljb25FbGVtZW50LnByZXZpb3VzU2libGluZy5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5uYXRpdmVFbGVtZW50LCAnbWMtaWNvbi1idXR0b25fcmlnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmljb25zLmxlbmd0aCA9PT0gdHdvSWNvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzZWNvbmRJY29uRWxlbWVudCwgJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0J1dHRvbk1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY0J1dHRvbkJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY0J1dHRvbkJhc2UpKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdidXR0b25bbWMtYnV0dG9uXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWyd0YWJJbmRleCcsICdkaXNhYmxlZCcsICdjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnRhYkluZGV4XSc6ICd0YWJJbmRleCcsXG5cbiAgICAgICAgJyhmb2N1cyknOiAnb25Gb2N1cygkZXZlbnQpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uIGV4dGVuZHMgTWNCdXR0b25NaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENhbkRpc2FibGUsIENhbkNvbG9yIHtcbiAgICBoYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cygkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBmb2N1c1ZpYUtleWJvYXJkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmdldEhvc3RFbGVtZW50KCksICdrZXlib2FyZCcpO1xuICAgIH1cblxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYVttYy1idXR0b25dJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnYnV0dG9uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICdjb2xvcicsICd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbHREaXNhYmxlZEV2ZW50cygkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNBbmNob3IgZXh0ZW5kcyBNY0J1dHRvbiB7XG4gICAgY29uc3RydWN0b3IoZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgZm9jdXNNb25pdG9yKTtcbiAgICB9XG5cbiAgICBoYWx0RGlzYWJsZWRFdmVudHMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWMtYnV0dG9uLXdyYXBwZXJcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtYy1idXR0b24tb3ZlcmxheVwiPjwvZGl2PlxuIl19
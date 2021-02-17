/**
 * @fileoverview added by tsickle
 * Generated from: button.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
export class McButtonCssStyler {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.renderer = renderer;
        this.icons = [];
        this.nativeElement = elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get isIconButton() {
        return this.icons.length > 0;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /**
         * Here we had to use native selectors due to number of angular issues about ContentChildren limitations
         * https://github.com/angular/angular/issues/16299
         * https://github.com/angular/angular/issues/8563
         * https://github.com/angular/angular/issues/14769
         */
        this.icons = Array.from(this.nativeElement.querySelectorAll('.mc-icon'));
        this.addClassModificatorForIcons();
    }
    /**
     * @private
     * @return {?}
     */
    addClassModificatorForIcons() {
        /** @type {?} */
        const twoIcons = 2;
        const [firstIconElement, secondIconElement] = this.icons;
        if (this.icons.length === 1) {
            /** @type {?} */
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
if (false) {
    /** @type {?} */
    McButtonCssStyler.prototype.nativeElement;
    /**
     * @type {?}
     * @private
     */
    McButtonCssStyler.prototype.icons;
    /**
     * @type {?}
     * @private
     */
    McButtonCssStyler.prototype.renderer;
}
export class McButtonBase {
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
    McButtonBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McButtonMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McButtonBase)));
export class McButton extends McButtonMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _focusMonitor
     */
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this._focusMonitor = _focusMonitor;
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    focus() {
        this.getHostElement().focus();
    }
    /**
     * @return {?}
     */
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
                styles: [".mc-button,.mc-icon-button,.mc-light-button{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;border:none;border:var(--mc-button-size-border-width,1px) solid transparent;border-radius:var(--mc-button-size-border-radius,3px);box-sizing:border-box;cursor:pointer;display:inline-block;outline:none;position:relative;text-align:center;text-decoration:none;user-select:none;vertical-align:baseline;white-space:nowrap}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:none}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default;pointer-events:none}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{line-height:20px;margin:auto}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:var(--mc-icon-button-size-icon-padding,8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:var(--mc-icon-button-size-icon-padding,8px)}.mc-button-overlay{border-radius:inherit;bottom:-1px;left:-1px;pointer-events:none;position:absolute;right:-1px;top:-1px}"]
            }] }
];
/** @nocollapse */
McButton.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    McButton.prototype._focusMonitor;
}
export class McAnchor extends McButton {
    /**
     * @param {?} focusMonitor
     * @param {?} elementRef
     */
    constructor(focusMonitor, elementRef) {
        super(elementRef, focusMonitor);
    }
    /**
     * @param {?} event
     * @return {?}
     */
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
                styles: [".mc-button,.mc-icon-button,.mc-light-button{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;border:none;border:var(--mc-button-size-border-width,1px) solid transparent;border-radius:var(--mc-button-size-border-radius,3px);box-sizing:border-box;cursor:pointer;display:inline-block;outline:none;position:relative;text-align:center;text-decoration:none;user-select:none;vertical-align:baseline;white-space:nowrap}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:none}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{cursor:default;pointer-events:none}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:calc(var(--mc-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-button-size-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button{padding:calc(var(--mc-icon-button-size-vertical-padding, 6px) - var(--mc-button-size-border-width, 1px)) calc(var(--mc-icon-button-size-horizontal-padding, 8px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_left{padding-right:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button.mc-icon-button_right{padding-left:calc(var(--mc-icon-button-size-icon-horizontal-padding, 16px) - var(--mc-button-size-border-width, 1px))}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{line-height:20px;margin:auto}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:var(--mc-icon-button-size-icon-padding,8px)}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:var(--mc-icon-button-size-icon-padding,8px)}.mc-button-overlay{border-radius:inherit;bottom:-1px;left:-1px;pointer-events:none;position:absolute;right:-1px;top:-1px}"]
            }] }
];
/** @nocollapse */
McAnchor.ctorParameters = () => [
    { type: FocusMonitor },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2J1dHRvbi8iLCJzb3VyY2VzIjpbImJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFFVixpQkFBaUIsRUFDakIsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFNaEIsTUFBTSx5QkFBeUIsQ0FBQztBQVVqQyxNQUFNLE9BQU8saUJBQWlCOzs7OztJQVMxQixZQUFZLFVBQXNCLEVBQVUsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUZ2RCxVQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUc5QixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDbEQsQ0FBQzs7OztJQVJELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFRRCxrQkFBa0I7UUFDZDs7Ozs7V0FLRztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFTywyQkFBMkI7O2NBQ3pCLFFBQVEsR0FBRyxDQUFDO2NBQ1osQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLO1FBRXhELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztrQkFDbkIsWUFBWSxHQUFHLENBQUM7WUFFdEIsSUFBSSxnQkFBZ0IsQ0FBQyxXQUFXLElBQUksZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7Z0JBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLHFCQUFxQixDQUFDLENBQUM7YUFDckU7WUFFRCxJQUFJLGdCQUFnQixDQUFDLGVBQWUsSUFBSSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtnQkFDaEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsc0JBQXNCLENBQUMsQ0FBQzthQUN0RTtTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDOzs7WUFuREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLElBQUksRUFBRTtvQkFDRixtQkFBbUIsRUFBRSxlQUFlO29CQUNwQyx3QkFBd0IsRUFBRSxjQUFjO2lCQUMzQzthQUNKOzs7O1lBdkJHLFVBQVU7WUFHVixTQUFTOzs7O0lBc0JULDBDQUF1Qjs7Ozs7SUFNdkIsa0NBQWtDOzs7OztJQUVFLHFDQUEyQjs7QUFzQ25FLE1BQU0sT0FBTyxZQUFZOzs7OztJQUVyQixZQUFtQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Q0FDakQ7OztJQURlLG1DQUE4Qjs7OztBQUk5QyxNQUFNLE9BQU8saUJBQWlCLEdBQ0osYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQWNoRixNQUFNLE9BQU8sUUFBUyxTQUFRLGlCQUFpQjs7Ozs7SUFDM0MsWUFBWSxVQUFzQixFQUFVLGFBQTJCO1FBQ25FLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQURzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUduRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7OztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQzFDLENBQUM7OztZQTVCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsK0hBQXNDO2dCQUV0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7Z0JBQzdCLElBQUksRUFBRTtvQkFDRixpQkFBaUIsRUFBRSxrQkFBa0I7aUJBQ3hDOzthQUNKOzs7O1lBM0ZHLFVBQVU7WUFMTCxZQUFZOzs7Ozs7O0lBa0dtQixpQ0FBbUM7O0FBaUMzRSxNQUFNLE9BQU8sUUFBUyxTQUFRLFFBQVE7Ozs7O0lBQ2xDLFlBQVksWUFBMEIsRUFBRSxVQUFzQjtRQUMxRCxLQUFLLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsa0JBQWtCLENBQUMsS0FBWTtRQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDcEM7SUFDTCxDQUFDOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QiwrSEFBc0M7Z0JBRXRDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUM7Z0JBQ3pDLElBQUksRUFBRTtvQkFDRixpQkFBaUIsRUFBRSxVQUFVO29CQUM3QixpQkFBaUIsRUFBRSxrQkFBa0I7b0JBQ3JDLFNBQVMsRUFBRSw0QkFBNEI7aUJBQzFDOzthQUNKOzs7O1lBbElRLFlBQVk7WUFLakIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIENhbkNvbG9yLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgQ2FuQ29sb3JDdG9yLFxuICAgIEhhc1RhYkluZGV4Q3RvclxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdidXR0b25bbWMtYnV0dG9uXSwgYVttYy1idXR0b25dJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtYnV0dG9uXSc6ICchaXNJY29uQnV0dG9uJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1pY29uLWJ1dHRvbl0nOiAnaXNJY29uQnV0dG9uJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNCdXR0b25Dc3NTdHlsZXIge1xuICAgIG5hdGl2ZUVsZW1lbnQ6IEVsZW1lbnQ7XG5cbiAgICBnZXQgaXNJY29uQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pY29ucy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgaWNvbnM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogSGVyZSB3ZSBoYWQgdG8gdXNlIG5hdGl2ZSBzZWxlY3RvcnMgZHVlIHRvIG51bWJlciBvZiBhbmd1bGFyIGlzc3VlcyBhYm91dCBDb250ZW50Q2hpbGRyZW4gbGltaXRhdGlvbnNcbiAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTYyOTlcbiAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvODU2M1xuICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNDc2OVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pY29ucyA9IEFycmF5LmZyb20odGhpcy5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYy1pY29uJykpO1xuICAgICAgICB0aGlzLmFkZENsYXNzTW9kaWZpY2F0b3JGb3JJY29ucygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCkge1xuICAgICAgICBjb25zdCB0d29JY29ucyA9IDI7XG4gICAgICAgIGNvbnN0IFtmaXJzdEljb25FbGVtZW50LCBzZWNvbmRJY29uRWxlbWVudF0gPSB0aGlzLmljb25zO1xuXG4gICAgICAgIGlmICh0aGlzLmljb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgQ09NTUVOVF9OT0RFID0gODtcblxuICAgICAgICAgICAgaWYgKGZpcnN0SWNvbkVsZW1lbnQubmV4dFNpYmxpbmcgJiYgZmlyc3RJY29uRWxlbWVudC5uZXh0U2libGluZy5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLm5hdGl2ZUVsZW1lbnQsICdtYy1pY29uLWJ1dHRvbl9sZWZ0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmaXJzdEljb25FbGVtZW50LnByZXZpb3VzU2libGluZyAmJiBmaXJzdEljb25FbGVtZW50LnByZXZpb3VzU2libGluZy5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5uYXRpdmVFbGVtZW50LCAnbWMtaWNvbi1idXR0b25fcmlnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmljb25zLmxlbmd0aCA9PT0gdHdvSWNvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzZWNvbmRJY29uRWxlbWVudCwgJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0J1dHRvbk1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY0J1dHRvbkJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY0J1dHRvbkJhc2UpKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdidXR0b25bbWMtYnV0dG9uXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICdjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNCdXR0b24gZXh0ZW5kcyBNY0J1dHRvbk1peGluQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQ2FuRGlzYWJsZSwgQ2FuQ29sb3Ige1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhW21jLWJ1dHRvbl0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydidXR0b24uc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ2NvbG9yJywgJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFsdERpc2FibGVkRXZlbnRzKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0FuY2hvciBleHRlbmRzIE1jQnV0dG9uIHtcbiAgICBjb25zdHJ1Y3Rvcihmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCBmb2N1c01vbml0b3IpO1xuICAgIH1cblxuICAgIGhhbHREaXNhYmxlZEV2ZW50cyhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
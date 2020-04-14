/**
 * @fileoverview added by tsickle
 * Generated from: button.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { mixinColor, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
var McButtonCssStyler = /** @class */ (function () {
    function McButtonCssStyler(elementRef, renderer) {
        this.renderer = renderer;
        this.icons = [];
        this.nativeElement = elementRef.nativeElement;
    }
    Object.defineProperty(McButtonCssStyler.prototype, "isIconButton", {
        get: /**
         * @return {?}
         */
        function () {
            return this.icons.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McButtonCssStyler.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        /**
         * Here we had to use native selectors due to number of angular issues about ContentChildren limitations
         * https://github.com/angular/angular/issues/16299
         * https://github.com/angular/angular/issues/8563
         * https://github.com/angular/angular/issues/14769
         */
        this.icons = Array.from(this.nativeElement.querySelectorAll('.mc-icon'));
        this.addClassModificatorForIcons();
    };
    /**
     * @private
     * @return {?}
     */
    McButtonCssStyler.prototype.addClassModificatorForIcons = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var twoIcons = 2;
        var _a = __read(this.icons, 2), firstIconElement = _a[0], secondIconElement = _a[1];
        if (this.icons.length === 1) {
            /** @type {?} */
            var COMMENT_NODE = 8;
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
    };
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
    McButtonCssStyler.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return McButtonCssStyler;
}());
export { McButtonCssStyler };
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
var McButtonBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McButtonBase;
}());
export { McButtonBase };
if (false) {
    /** @type {?} */
    McButtonBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McButtonMixinBase = mixinTabIndex(mixinColor(mixinDisabled(McButtonBase)));
var McButton = /** @class */ (function (_super) {
    __extends(McButton, _super);
    function McButton(elementRef, _focusMonitor) {
        var _this = _super.call(this, elementRef) || this;
        _this._focusMonitor = _focusMonitor;
        _this._focusMonitor.monitor(_this._elementRef.nativeElement, true);
        return _this;
    }
    /**
     * @return {?}
     */
    McButton.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    McButton.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.getHostElement().focus();
    };
    /**
     * @return {?}
     */
    McButton.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
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
                    styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:1px solid transparent;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px}.mc-icon-button{padding:5px 7px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"]
                }] }
    ];
    /** @nocollapse */
    McButton.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor }
    ]; };
    return McButton;
}(McButtonMixinBase));
export { McButton };
if (false) {
    /**
     * @type {?}
     * @private
     */
    McButton.prototype._focusMonitor;
}
var McAnchor = /** @class */ (function (_super) {
    __extends(McAnchor, _super);
    function McAnchor(focusMonitor, elementRef) {
        return _super.call(this, elementRef, focusMonitor) || this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    McAnchor.prototype.haltDisabledEvents = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
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
                    styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:1px solid transparent;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px}.mc-icon-button{padding:5px 7px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"]
                }] }
    ];
    /** @nocollapse */
    McAnchor.ctorParameters = function () { return [
        { type: FocusMonitor },
        { type: ElementRef }
    ]; };
    return McAnchor;
}(McButton));
export { McAnchor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24vIiwic291cmNlcyI6WyJidXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUVWLGlCQUFpQixFQUNqQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFVBQVUsRUFDVixhQUFhLEVBQ2IsYUFBYSxFQU1oQixNQUFNLHlCQUF5QixDQUFDO0FBR2pDO0lBZ0JJLDJCQUFZLFVBQXNCLEVBQVUsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUZ2RCxVQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUc5QixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDbEQsQ0FBQztJQVJELHNCQUFJLDJDQUFZOzs7O1FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7Ozs7SUFRRCw4Q0FBa0I7OztJQUFsQjtRQUNJOzs7OztXQUtHO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVPLHVEQUEyQjs7OztJQUFuQzs7WUFDVSxRQUFRLEdBQUcsQ0FBQztRQUNaLElBQUEsMEJBQWtELEVBQWpELHdCQUFnQixFQUFFLHlCQUErQjtRQUV4RCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFL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LFlBQVk7O0lBbUhyQixlQUFDO0NBQUEsQUE3QkQsQ0FXOEIsaUJBQWlCLEdBa0I5QztTQWxCWSxRQUFROzs7Ozs7SUFDbUIsaUNBQW1DOztBQW9CM0U7SUFhOEIsNEJBQVE7SUFDbEMsa0JBQVksWUFBMEIsRUFBRSxVQUFzQjtlQUMxRCxrQkFBTSxVQUFVLEVBQUUsWUFBWSxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQscUNBQWtCOzs7O0lBQWxCLFVBQW1CLEtBQVk7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQzs7Z0JBdkJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsK0hBQXNDO29CQUV0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDO29CQUN6QyxJQUFJLEVBQUU7d0JBQ0YsaUJBQWlCLEVBQUUsVUFBVTt3QkFDN0IsaUJBQWlCLEVBQUUsa0JBQWtCO3dCQUNyQyxTQUFTLEVBQUUsNEJBQTRCO3FCQUMxQzs7aUJBQ0o7Ozs7Z0JBbElRLFlBQVk7Z0JBS2pCLFVBQVU7O0lBeUlkLGVBQUM7Q0FBQSxBQXhCRCxDQWE4QixRQUFRLEdBV3JDO1NBWFksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIG1peGluQ29sb3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIENhbkNvbG9yLFxuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgQ2FuQ29sb3JDdG9yLFxuICAgIEhhc1RhYkluZGV4Q3RvclxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdidXR0b25bbWMtYnV0dG9uXSwgYVttYy1idXR0b25dJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtYnV0dG9uXSc6ICchaXNJY29uQnV0dG9uJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1pY29uLWJ1dHRvbl0nOiAnaXNJY29uQnV0dG9uJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNCdXR0b25Dc3NTdHlsZXIge1xuICAgIG5hdGl2ZUVsZW1lbnQ6IEVsZW1lbnQ7XG5cbiAgICBnZXQgaXNJY29uQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pY29ucy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgaWNvbnM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogSGVyZSB3ZSBoYWQgdG8gdXNlIG5hdGl2ZSBzZWxlY3RvcnMgZHVlIHRvIG51bWJlciBvZiBhbmd1bGFyIGlzc3VlcyBhYm91dCBDb250ZW50Q2hpbGRyZW4gbGltaXRhdGlvbnNcbiAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTYyOTlcbiAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvODU2M1xuICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNDc2OVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pY29ucyA9IEFycmF5LmZyb20odGhpcy5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYy1pY29uJykpO1xuICAgICAgICB0aGlzLmFkZENsYXNzTW9kaWZpY2F0b3JGb3JJY29ucygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCkge1xuICAgICAgICBjb25zdCB0d29JY29ucyA9IDI7XG4gICAgICAgIGNvbnN0IFtmaXJzdEljb25FbGVtZW50LCBzZWNvbmRJY29uRWxlbWVudF0gPSB0aGlzLmljb25zO1xuXG4gICAgICAgIGlmICh0aGlzLmljb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgQ09NTUVOVF9OT0RFID0gODtcblxuICAgICAgICAgICAgaWYgKGZpcnN0SWNvbkVsZW1lbnQubmV4dFNpYmxpbmcgJiYgZmlyc3RJY29uRWxlbWVudC5uZXh0U2libGluZy5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLm5hdGl2ZUVsZW1lbnQsICdtYy1pY29uLWJ1dHRvbl9sZWZ0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmaXJzdEljb25FbGVtZW50LnByZXZpb3VzU2libGluZyAmJiBmaXJzdEljb25FbGVtZW50LnByZXZpb3VzU2libGluZy5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5uYXRpdmVFbGVtZW50LCAnbWMtaWNvbi1idXR0b25fcmlnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmljb25zLmxlbmd0aCA9PT0gdHdvSWNvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzZWNvbmRJY29uRWxlbWVudCwgJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uQmFzZSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0J1dHRvbk1peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY0J1dHRvbkJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluQ29sb3IobWl4aW5EaXNhYmxlZChNY0J1dHRvbkJhc2UpKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdidXR0b25bbWMtYnV0dG9uXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICdjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNCdXR0b24gZXh0ZW5kcyBNY0J1dHRvbk1peGluQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQ2FuRGlzYWJsZSwgQ2FuQ29sb3Ige1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhW21jLWJ1dHRvbl0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydidXR0b24uc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ2NvbG9yJywgJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJyhjbGljayknOiAnaGFsdERpc2FibGVkRXZlbnRzKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0FuY2hvciBleHRlbmRzIE1jQnV0dG9uIHtcbiAgICBjb25zdHJ1Y3Rvcihmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvciwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCBmb2N1c01vbml0b3IpO1xuICAgIH1cblxuICAgIGhhbHREaXNhYmxlZEV2ZW50cyhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
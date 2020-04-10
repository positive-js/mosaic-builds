/**
 * @fileoverview added by tsickle
 * Generated from: button.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Directive, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { mixinColor, mixinDisabled } from '@ptsecurity/mosaic/core';
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
export var McButtonMixinBase = mixinColor(mixinDisabled(McButtonBase));
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
                        '[disabled]': 'disabled || null'
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
                    inputs: ['disabled', 'color'],
                    host: {
                        '[attr.tabindex]': 'disabled ? -1 : 0',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24vIiwic291cmNlcyI6WyJidXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUVWLGlCQUFpQixFQUNqQixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQXNELE1BQU0seUJBQXlCLENBQUM7QUFHeEg7SUFnQkksMkJBQ0ksVUFBc0IsRUFDZCxRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBSnZCLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBTTlCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUNsRCxDQUFDO0lBWEQsc0JBQUksMkNBQVk7Ozs7UUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTs7OztJQVdELDhDQUFrQjs7O0lBQWxCO1FBQ0k7Ozs7O1dBS0c7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRU8sdURBQTJCOzs7O0lBQW5DOztZQUNVLFFBQVEsR0FBRyxDQUFDO1FBQ1osSUFBQSwwQkFBa0QsRUFBakQsd0JBQWdCLEVBQUUseUJBQStCO1FBRXhELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFF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N0JELENBVzhCLGlCQUFpQixHQWtCOUM7U0FsQlksUUFBUTs7Ozs7O0lBQ21CLGlDQUFtQzs7QUFvQjNFO0lBYThCLDRCQUFRO0lBQ2xDLGtCQUFZLFlBQTBCLEVBQUUsVUFBc0I7ZUFDMUQsa0JBQU0sVUFBVSxFQUFFLFlBQVksQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELHFDQUFrQjs7OztJQUFsQixVQUFtQixLQUFZO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztTQUNwQztJQUNMLENBQUM7O2dCQXZCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLCtIQUFzQztvQkFFdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO29CQUM3QixJQUFJLEVBQUU7d0JBQ0YsaUJBQWlCLEVBQUUsbUJBQW1CO3dCQUN0QyxpQkFBaUIsRUFBRSxrQkFBa0I7d0JBQ3JDLFNBQVMsRUFBRSw0QkFBNEI7cUJBQzFDOztpQkFDSjs7OztnQkEvSFEsWUFBWTtnQkFLakIsVUFBVTs7SUFzSWQsZUFBQztDQUFBLEFBeEJELENBYThCLFFBQVEsR0FXckM7U0FYWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1peGluQ29sb3IsIG1peGluRGlzYWJsZWQsIENhbkNvbG9yLCBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgQ2FuQ29sb3JDdG9yIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYnV0dG9uW21jLWJ1dHRvbl0sIGFbbWMtYnV0dG9uXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLWJ1dHRvbl0nOiAnIWlzSWNvbkJ1dHRvbicsXG4gICAgICAgICdbY2xhc3MubWMtaWNvbi1idXR0b25dJzogJ2lzSWNvbkJ1dHRvbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uQ3NzU3R5bGVyIHtcbiAgICBuYXRpdmVFbGVtZW50OiBFbGVtZW50O1xuXG4gICAgZ2V0IGlzSWNvbkJ1dHRvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbnMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGljb25zOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7XG4gICAgICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIZXJlIHdlIGhhZCB0byB1c2UgbmF0aXZlIHNlbGVjdG9ycyBkdWUgdG8gbnVtYmVyIG9mIGFuZ3VsYXIgaXNzdWVzIGFib3V0IENvbnRlbnRDaGlsZHJlbiBsaW1pdGF0aW9uc1xuICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNjI5OVxuICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy84NTYzXG4gICAgICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE0NzY5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmljb25zID0gQXJyYXkuZnJvbSh0aGlzLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1jLWljb24nKSk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NNb2RpZmljYXRvckZvckljb25zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRDbGFzc01vZGlmaWNhdG9yRm9ySWNvbnMoKSB7XG4gICAgICAgIGNvbnN0IHR3b0ljb25zID0gMjtcbiAgICAgICAgY29uc3QgW2ZpcnN0SWNvbkVsZW1lbnQsIHNlY29uZEljb25FbGVtZW50XSA9IHRoaXMuaWNvbnM7XG5cbiAgICAgICAgaWYgKHRoaXMuaWNvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBDT01NRU5UX05PREUgPSA4O1xuXG4gICAgICAgICAgICBpZiAoZmlyc3RJY29uRWxlbWVudC5uZXh0U2libGluZyAmJiBmaXJzdEljb25FbGVtZW50Lm5leHRTaWJsaW5nLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGZpcnN0SWNvbkVsZW1lbnQsICdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubmF0aXZlRWxlbWVudCwgJ21jLWljb24tYnV0dG9uX2xlZnQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpcnN0SWNvbkVsZW1lbnQucHJldmlvdXNTaWJsaW5nICYmIGZpcnN0SWNvbkVsZW1lbnQucHJldmlvdXNTaWJsaW5nLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGZpcnN0SWNvbkVsZW1lbnQsICdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLm5hdGl2ZUVsZW1lbnQsICdtYy1pY29uLWJ1dHRvbl9yaWdodCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWNvbnMubGVuZ3RoID09PSB0d29JY29ucykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHNlY29uZEljb25FbGVtZW50LCAnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWNCdXR0b25CYXNlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jQnV0dG9uTWl4aW5CYXNlOlxuICAgIENhbkRpc2FibGVDdG9yICZcbiAgICBDYW5Db2xvckN0b3IgJlxuICAgIHR5cGVvZiBNY0J1dHRvbkJhc2UgPVxuICAgICAgICBtaXhpbkNvbG9yKG1peGluRGlzYWJsZWQoTWNCdXR0b25CYXNlKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdidXR0b25bbWMtYnV0dG9uXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICdjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uIGV4dGVuZHMgTWNCdXR0b25NaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENhbkRpc2FibGUsIENhbkNvbG9yIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRIb3N0RWxlbWVudCgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0SG9zdEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYVttYy1idXR0b25dJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnYnV0dG9uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICdjb2xvciddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogMCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbHREaXNhYmxlZEV2ZW50cygkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNBbmNob3IgZXh0ZW5kcyBNY0J1dHRvbiB7XG4gICAgY29uc3RydWN0b3IoZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgZm9jdXNNb25pdG9yKTtcbiAgICB9XG5cbiAgICBoYWx0RGlzYWJsZWRFdmVudHMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
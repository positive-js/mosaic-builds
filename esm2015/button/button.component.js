/**
 * @fileoverview added by tsickle
 * Generated from: button.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:1px solid transparent;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px}.mc-icon-button{padding:5px 7px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"]
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
                styles: [".mc-button,.mc-icon-button,.mc-light-button{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:1px solid transparent;position:relative;box-sizing:border-box;display:inline-block;white-space:nowrap;text-decoration:none;text-align:center;vertical-align:baseline;margin:0;border-radius:3px}.mc-button::-moz-focus-inner,.mc-icon-button::-moz-focus-inner,.mc-light-button::-moz-focus-inner{border:0}.mc-button:focus,.mc-icon-button:focus,.mc-light-button:focus{outline:0}.mc-button[disabled],.mc-icon-button[disabled],.mc-light-button[disabled]{pointer-events:none;cursor:default}.cdk-focused.mc-button,.cdk-focused.mc-icon-button,.cdk-focused.mc-light-button{z-index:1}.mc-button{padding:5px 15px}.mc-icon-button{padding:5px 7px}.mc-icon-button.mc-icon-button_left{padding-right:15px}.mc-icon-button.mc-icon-button_right{padding-left:15px}.mc-icon-button .mc-button-wrapper{display:flex}.mc-icon-button .mc-button-wrapper .mc-icon{margin:auto;line-height:20px}.mc-icon-button .mc-button-wrapper .mc-icon_left{margin-right:7px}.mc-icon-button .mc-button-wrapper .mc-icon_right{margin-left:7px}.mc-button-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;pointer-events:none;border-radius:inherit}"]
            }] }
];
/** @nocollapse */
McAnchor.ctorParameters = () => [
    { type: FocusMonitor },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24vIiwic291cmNlcyI6WyJidXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsVUFBVSxFQUNWLGFBQWEsRUFDYixhQUFhLEVBTWhCLE1BQU0seUJBQXlCLENBQUM7QUFVakMsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFTMUIsWUFBWSxVQUFzQixFQUFVLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFGdkQsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ2xELENBQUM7Ozs7SUFSRCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7O0lBUUQsa0JBQWtCO1FBQ2Q7Ozs7O1dBS0c7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRU8sMkJBQTJCOztjQUN6QixRQUFRLEdBQUcsQ0FBQztjQUNaLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSztRQUV4RCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFL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LEVBQUUsVUFBc0I7UUFDMUQsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLEtBQVk7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQzs7O1lBdkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsK0hBQXNDO2dCQUV0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDO2dCQUN6QyxJQUFJLEVBQUU7b0JBQ0YsaUJBQWlCLEVBQUUsVUFBVTtvQkFDN0IsaUJBQWlCLEVBQUUsa0JBQWtCO29CQUNyQyxTQUFTLEVBQUUsNEJBQTRCO2lCQUMxQzs7YUFDSjs7OztZQWxJUSxZQUFZO1lBS2pCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBtaXhpbkNvbG9yLFxuICAgIG1peGluRGlzYWJsZWQsXG4gICAgbWl4aW5UYWJJbmRleCxcbiAgICBDYW5Db2xvcixcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIENhbkNvbG9yQ3RvcixcbiAgICBIYXNUYWJJbmRleEN0b3Jcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYnV0dG9uW21jLWJ1dHRvbl0sIGFbbWMtYnV0dG9uXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLWJ1dHRvbl0nOiAnIWlzSWNvbkJ1dHRvbicsXG4gICAgICAgICdbY2xhc3MubWMtaWNvbi1idXR0b25dJzogJ2lzSWNvbkJ1dHRvbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uQ3NzU3R5bGVyIHtcbiAgICBuYXRpdmVFbGVtZW50OiBFbGVtZW50O1xuXG4gICAgZ2V0IGlzSWNvbkJ1dHRvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbnMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGljb25zOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhlcmUgd2UgaGFkIHRvIHVzZSBuYXRpdmUgc2VsZWN0b3JzIGR1ZSB0byBudW1iZXIgb2YgYW5ndWxhciBpc3N1ZXMgYWJvdXQgQ29udGVudENoaWxkcmVuIGxpbWl0YXRpb25zXG4gICAgICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE2Mjk5XG4gICAgICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzg1NjNcbiAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTQ3NjlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaWNvbnMgPSBBcnJheS5mcm9tKHRoaXMubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWMtaWNvbicpKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzc01vZGlmaWNhdG9yRm9ySWNvbnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZENsYXNzTW9kaWZpY2F0b3JGb3JJY29ucygpIHtcbiAgICAgICAgY29uc3QgdHdvSWNvbnMgPSAyO1xuICAgICAgICBjb25zdCBbZmlyc3RJY29uRWxlbWVudCwgc2Vjb25kSWNvbkVsZW1lbnRdID0gdGhpcy5pY29ucztcblxuICAgICAgICBpZiAodGhpcy5pY29ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IENPTU1FTlRfTk9ERSA9IDg7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdEljb25FbGVtZW50Lm5leHRTaWJsaW5nICYmIGZpcnN0SWNvbkVsZW1lbnQubmV4dFNpYmxpbmcubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5uYXRpdmVFbGVtZW50LCAnbWMtaWNvbi1idXR0b25fbGVmdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmlyc3RJY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcgJiYgZmlyc3RJY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubmF0aXZlRWxlbWVudCwgJ21jLWljb24tYnV0dG9uX3JpZ2h0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pY29ucy5sZW5ndGggPT09IHR3b0ljb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGZpcnN0SWNvbkVsZW1lbnQsICdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc2Vjb25kSWNvbkVsZW1lbnQsICdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNY0J1dHRvbkJhc2Uge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNCdXR0b25NaXhpbkJhc2U6IEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICYgQ2FuQ29sb3JDdG9yICZcbiAgICB0eXBlb2YgTWNCdXR0b25CYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkNvbG9yKG1peGluRGlzYWJsZWQoTWNCdXR0b25CYXNlKSkpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYnV0dG9uW21jLWJ1dHRvbl0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2J1dHRvbi5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnY29sb3InXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jQnV0dG9uIGV4dGVuZHMgTWNCdXR0b25NaXhpbkJhc2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENhbkRpc2FibGUsIENhbkNvbG9yIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRIb3N0RWxlbWVudCgpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0SG9zdEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYVttYy1idXR0b25dJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnYnV0dG9uLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGlucHV0czogWydkaXNhYmxlZCcsICdjb2xvcicsICd0YWJJbmRleCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbHREaXNhYmxlZEV2ZW50cygkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNBbmNob3IgZXh0ZW5kcyBNY0J1dHRvbiB7XG4gICAgY29uc3RydWN0b3IoZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgZm9jdXNNb25pdG9yKTtcbiAgICB9XG5cbiAgICBoYWx0RGlzYWJsZWRFdmVudHMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
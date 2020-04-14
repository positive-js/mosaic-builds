/**
 * @fileoverview added by tsickle
 * Generated from: sidebar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, EventEmitter, Input, NgZone, Output, ViewEncapsulation } from '@angular/core';
import { isControl, isInput, isLeftBracket, isRightBracket } from '@ptsecurity/cdk/keycodes';
import { mcSidebarAnimations, McSidebarAnimationState } from './sidebar-animations';
/** @enum {string} */
var SidebarPositions = {
    Left: "left",
    Right: "right",
};
export { SidebarPositions };
/**
 * @record
 */
function McSidebarParams() { }
if (false) {
    /** @type {?} */
    McSidebarParams.prototype.openedStateMinWidth;
    /** @type {?} */
    McSidebarParams.prototype.openedStateWidth;
    /** @type {?} */
    McSidebarParams.prototype.openedStateMaxWidth;
    /** @type {?} */
    McSidebarParams.prototype.closedStateWidth;
}
var McSidebarOpened = /** @class */ (function () {
    function McSidebarOpened() {
    }
    McSidebarOpened.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-sidebar-opened]',
                    exportAs: 'mcSidebarOpened'
                },] }
    ];
    McSidebarOpened.propDecorators = {
        minWidth: [{ type: Input }],
        width: [{ type: Input }],
        maxWidth: [{ type: Input }]
    };
    return McSidebarOpened;
}());
export { McSidebarOpened };
if (false) {
    /** @type {?} */
    McSidebarOpened.prototype.minWidth;
    /** @type {?} */
    McSidebarOpened.prototype.width;
    /** @type {?} */
    McSidebarOpened.prototype.maxWidth;
}
var McSidebarClosed = /** @class */ (function () {
    function McSidebarClosed() {
    }
    McSidebarClosed.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-sidebar-closed]',
                    exportAs: 'mcSidebarClosed'
                },] }
    ];
    McSidebarClosed.propDecorators = {
        width: [{ type: Input }]
    };
    return McSidebarClosed;
}());
export { McSidebarClosed };
if (false) {
    /** @type {?} */
    McSidebarClosed.prototype.width;
}
var McSidebar = /** @class */ (function () {
    function McSidebar(ngZone, elementRef) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this._opened = true;
        this.params = {
            openedStateWidth: 'inherit',
            openedStateMinWidth: 'inherit',
            openedStateMaxWidth: 'inherit',
            closedStateWidth: '32px'
        };
        this.stateChanged = new EventEmitter();
        this.internalState = true;
    }
    Object.defineProperty(McSidebar.prototype, "opened", {
        get: /**
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._opened) {
                this.saveWidth();
            }
            this._opened = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McSidebar.prototype, "animationState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._opened ? McSidebarAnimationState.Opened : McSidebarAnimationState.Closed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McSidebar.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.position === SidebarPositions.Left || this.position === SidebarPositions.Right) {
            this.registerKeydownListener();
        }
    };
    /**
     * @return {?}
     */
    McSidebar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.position === SidebarPositions.Left || this.position === SidebarPositions.Right) {
            this.unRegisterKeydownListener();
        }
    };
    /**
     * @return {?}
     */
    McSidebar.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.opened = !this.opened;
    };
    /**
     * @return {?}
     */
    McSidebar.prototype.onAnimationStart = /**
     * @return {?}
     */
    function () {
        if (this._opened) {
            this.internalState = this._opened;
        }
    };
    /**
     * @return {?}
     */
    McSidebar.prototype.onAnimationDone = /**
     * @return {?}
     */
    function () {
        this.internalState = this._opened;
        this.stateChanged.emit(this._opened);
    };
    /**
     * @return {?}
     */
    McSidebar.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.params = {
            openedStateWidth: this.openedContent.width || 'inherit',
            openedStateMinWidth: this.openedContent.minWidth || 'inherit',
            openedStateMaxWidth: this.openedContent.maxWidth || 'inherit',
            closedStateWidth: this.closedContent.width || '32px'
        };
    };
    /**
     * @private
     * @return {?}
     */
    McSidebar.prototype.registerKeydownListener = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.documentKeydownListener = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (isControl(event) || isInput(event)) {
                return;
            }
            if ((_this.position === SidebarPositions.Left && isLeftBracket(event)) ||
                (_this.position === SidebarPositions.Right && isRightBracket(event))) {
                _this.ngZone.run((/**
                 * @return {?}
                 */
                function () { return _this._opened = !_this._opened; }));
            }
        });
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            // tslint:disable-next-line: no-unbound-method
            document.addEventListener('keypress', _this.documentKeydownListener, true);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    McSidebar.prototype.unRegisterKeydownListener = /**
     * @private
     * @return {?}
     */
    function () {
        // tslint:disable-next-line: no-unbound-method
        document.removeEventListener('keypress', this.documentKeydownListener, true);
    };
    /**
     * @private
     * @return {?}
     */
    McSidebar.prototype.saveWidth = /**
     * @private
     * @return {?}
     */
    function () {
        this.params.openedStateWidth = this.elementRef.nativeElement.offsetWidth + "px";
    };
    McSidebar.decorators = [
        { type: Component, args: [{
                    selector: 'mc-sidebar',
                    exportAs: 'mcSidebar',
                    template: "<ng-container [ngSwitch]=\"internalState\">\n    <ng-container *ngSwitchCase=\"true\">\n        <ng-content select=\"[mc-sidebar-opened]\"></ng-content>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <ng-content select=\"[mc-sidebar-closed]\"></ng-content>\n    </ng-container>\n</ng-container>\n",
                    host: {
                        class: 'mc-sidebar',
                        '[@state]': "{\n            value: animationState,\n            params: params\n        }",
                        '(@state.start)': 'onAnimationStart()',
                        '(@state.done)': 'onAnimationDone()'
                    },
                    animations: [mcSidebarAnimations.sidebarState],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-sidebar{display:inline-block;height:100%;overflow:hidden}.mc-sidebar-closed,.mc-sidebar-opened{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    McSidebar.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef }
    ]; };
    McSidebar.propDecorators = {
        opened: [{ type: Input }],
        position: [{ type: Input }],
        stateChanged: [{ type: Output }],
        openedContent: [{ type: ContentChild, args: [McSidebarOpened, { static: false },] }],
        closedContent: [{ type: ContentChild, args: [McSidebarClosed, { static: false },] }]
    };
    return McSidebar;
}());
export { McSidebar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    McSidebar.prototype._opened;
    /** @type {?} */
    McSidebar.prototype.position;
    /** @type {?} */
    McSidebar.prototype.params;
    /** @type {?} */
    McSidebar.prototype.stateChanged;
    /** @type {?} */
    McSidebar.prototype.openedContent;
    /** @type {?} */
    McSidebar.prototype.closedContent;
    /** @type {?} */
    McSidebar.prototype.internalState;
    /**
     * @type {?}
     * @private
     */
    McSidebar.prototype.documentKeydownListener;
    /**
     * @type {?}
     * @private
     */
    McSidebar.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    McSidebar.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvc2lkZWJhci8iLCJzb3VyY2VzIjpbInNpZGViYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTdGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUdwRixJQUFZLGdCQUFnQjtJQUN4QixJQUFJLFFBQVM7SUFDYixLQUFLLFNBQVU7RUFDbEI7Ozs7O0FBR0QsOEJBTUM7OztJQUxHLDhDQUE0Qjs7SUFDNUIsMkNBQXlCOztJQUN6Qiw4Q0FBNEI7O0lBRTVCLDJDQUF5Qjs7QUFJN0I7SUFBQTtJQVFBLENBQUM7O2dCQVJBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7OzJCQUVJLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOztJQUNWLHNCQUFDO0NBQUEsQUFSRCxJQVFDO1NBSlksZUFBZTs7O0lBQ3hCLG1DQUEwQjs7SUFDMUIsZ0NBQXVCOztJQUN2QixtQ0FBMEI7O0FBRzlCO0lBQUE7SUFNQSxDQUFDOztnQkFOQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLGlCQUFpQjtpQkFDOUI7Ozt3QkFFSSxLQUFLOztJQUNWLHNCQUFDO0NBQUEsQUFORCxJQU1DO1NBRlksZUFBZTs7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Q0FBQztvQkFDOUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDbEQ7Ozs7Z0JBN0RHLE1BQU07Z0JBSEssVUFBVTs7O3lCQWtFcEIsS0FBSzsyQkFjTCxLQUFLOytCQVVMLE1BQU07Z0NBRU4sWUFBWSxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0NBRS9DLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztJQTRFcEQsZ0JBQUM7Q0FBQSxBQTNIRCxJQTJIQztTQXpHWSxTQUFTOzs7Ozs7SUFhbEIsNEJBQWdDOztJQUVoQyw2QkFBb0M7O0lBRXBDLDJCQU1FOztJQUVGLGlDQUFxRjs7SUFFckYsa0NBQWlGOztJQUVqRixrQ0FBaUY7O0lBTWpGLGtDQUE4Qjs7Ozs7SUFFOUIsNENBQWdFOzs7OztJQUVwRCwyQkFBc0I7Ozs7O0lBQUUsK0JBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LCBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNDb250cm9sLCBpc0lucHV0LCBpc0xlZnRCcmFja2V0LCBpc1JpZ2h0QnJhY2tldCB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5cbmltcG9ydCB7IG1jU2lkZWJhckFuaW1hdGlvbnMsIE1jU2lkZWJhckFuaW1hdGlvblN0YXRlIH0gZnJvbSAnLi9zaWRlYmFyLWFuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBlbnVtIFNpZGViYXJQb3NpdGlvbnMge1xuICAgIExlZnQgPSAnbGVmdCcsXG4gICAgUmlnaHQgPSAncmlnaHQnXG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuaW50ZXJmYWNlIE1jU2lkZWJhclBhcmFtcyB7XG4gICAgb3BlbmVkU3RhdGVNaW5XaWR0aDogc3RyaW5nO1xuICAgIG9wZW5lZFN0YXRlV2lkdGg6IHN0cmluZztcbiAgICBvcGVuZWRTdGF0ZU1heFdpZHRoOiBzdHJpbmc7XG5cbiAgICBjbG9zZWRTdGF0ZVdpZHRoOiBzdHJpbmc7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtc2lkZWJhci1vcGVuZWRdJyxcbiAgICBleHBvcnRBczogJ21jU2lkZWJhck9wZW5lZCdcbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlYmFyT3BlbmVkIHtcbiAgICBASW5wdXQoKSBtaW5XaWR0aDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbWF4V2lkdGg6IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtc2lkZWJhci1jbG9zZWRdJyxcbiAgICBleHBvcnRBczogJ21jU2lkZWJhckNsb3NlZCdcbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlYmFyQ2xvc2VkIHtcbiAgICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2lkZWJhcicsXG4gICAgZXhwb3J0QXM6ICdtY1NpZGViYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnc2lkZWJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGViYXInLFxuICAgICAgICAnW0BzdGF0ZV0nOiBge1xuICAgICAgICAgICAgdmFsdWU6IGFuaW1hdGlvblN0YXRlLFxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgfWAsXG4gICAgICAgICcoQHN0YXRlLnN0YXJ0KSc6ICdvbkFuaW1hdGlvblN0YXJ0KCknLFxuICAgICAgICAnKEBzdGF0ZS5kb25lKSc6ICdvbkFuaW1hdGlvbkRvbmUoKSdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFttY1NpZGViYXJBbmltYXRpb25zLnNpZGViYXJTdGF0ZV0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGViYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQElucHV0KClcbiAgICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xuICAgIH1cblxuICAgIHNldCBvcGVuZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX29wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zYXZlV2lkdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29wZW5lZCA9IHZhbHVlO1xuICAgIH1cbiAgICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcG9zaXRpb246IFNpZGViYXJQb3NpdGlvbnM7XG5cbiAgICBwYXJhbXM6IE1jU2lkZWJhclBhcmFtcyA9IHtcbiAgICAgICAgb3BlbmVkU3RhdGVXaWR0aDogJ2luaGVyaXQnLFxuICAgICAgICBvcGVuZWRTdGF0ZU1pbldpZHRoOiAnaW5oZXJpdCcsXG4gICAgICAgIG9wZW5lZFN0YXRlTWF4V2lkdGg6ICdpbmhlcml0JyxcblxuICAgICAgICBjbG9zZWRTdGF0ZVdpZHRoOiAnMzJweCdcbiAgICB9O1xuXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHN0YXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZChNY1NpZGViYXJPcGVuZWQsIHsgc3RhdGljOiBmYWxzZSB9KSBvcGVuZWRDb250ZW50OiBNY1NpZGViYXJPcGVuZWQ7XG5cbiAgICBAQ29udGVudENoaWxkKE1jU2lkZWJhckNsb3NlZCwgeyBzdGF0aWM6IGZhbHNlIH0pIGNsb3NlZENvbnRlbnQ6IE1jU2lkZWJhckNsb3NlZDtcblxuICAgIGdldCBhbmltYXRpb25TdGF0ZSgpOiBNY1NpZGViYXJBbmltYXRpb25TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuZWQgPyBNY1NpZGViYXJBbmltYXRpb25TdGF0ZS5PcGVuZWQgOiBNY1NpZGViYXJBbmltYXRpb25TdGF0ZS5DbG9zZWQ7XG4gICAgfVxuXG4gICAgaW50ZXJuYWxTdGF0ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwcml2YXRlIGRvY3VtZW50S2V5ZG93bkxpc3RlbmVyOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuTGVmdCB8fCB0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLlJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuTGVmdCB8fCB0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLlJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnVuUmVnaXN0ZXJLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbFN0YXRlID0gdGhpcy5fb3BlbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25Eb25lKCkge1xuICAgICAgICB0aGlzLmludGVybmFsU3RhdGUgPSB0aGlzLl9vcGVuZWQ7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh0aGlzLl9vcGVuZWQpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgICAgICBvcGVuZWRTdGF0ZVdpZHRoOiB0aGlzLm9wZW5lZENvbnRlbnQud2lkdGggfHwgJ2luaGVyaXQnLFxuICAgICAgICAgICAgb3BlbmVkU3RhdGVNaW5XaWR0aDogdGhpcy5vcGVuZWRDb250ZW50Lm1pbldpZHRoIHx8ICdpbmhlcml0JyxcbiAgICAgICAgICAgIG9wZW5lZFN0YXRlTWF4V2lkdGg6IHRoaXMub3BlbmVkQ29udGVudC5tYXhXaWR0aCB8fCAnaW5oZXJpdCcsXG5cbiAgICAgICAgICAgIGNsb3NlZFN0YXRlV2lkdGg6IHRoaXMuY2xvc2VkQ29udGVudC53aWR0aCB8fCAnMzJweCdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyS2V5ZG93bkxpc3RlbmVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRvY3VtZW50S2V5ZG93bkxpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDb250cm9sKGV2ZW50KSB8fCBpc0lucHV0KGV2ZW50KSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICh0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLkxlZnQgJiYgaXNMZWZ0QnJhY2tldChldmVudCkpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuUmlnaHQgJiYgaXNSaWdodEJyYWNrZXQoZXZlbnQpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuX29wZW5lZCA9ICF0aGlzLl9vcGVuZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdW5SZWdpc3RlcktleWRvd25MaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIsIHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZVdpZHRoKCkge1xuICAgICAgICB0aGlzLnBhcmFtcy5vcGVuZWRTdGF0ZVdpZHRoID0gYCR7dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGh9cHhgO1xuICAgIH1cbn1cbiJdfQ==
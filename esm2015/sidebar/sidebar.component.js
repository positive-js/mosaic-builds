/**
 * @fileoverview added by tsickle
 * Generated from: sidebar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, EventEmitter, Input, NgZone, Output, ViewEncapsulation } from '@angular/core';
import { isControl, isInput, isLeftBracket, isRightBracket } from '@ptsecurity/cdk/keycodes';
import { mcSidebarAnimations, McSidebarAnimationState } from './sidebar-animations';
/** @enum {string} */
const SidebarPositions = {
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
export class McSidebarOpened {
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
if (false) {
    /** @type {?} */
    McSidebarOpened.prototype.minWidth;
    /** @type {?} */
    McSidebarOpened.prototype.width;
    /** @type {?} */
    McSidebarOpened.prototype.maxWidth;
}
export class McSidebarClosed {
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
if (false) {
    /** @type {?} */
    McSidebarClosed.prototype.width;
}
export class McSidebar {
    /**
     * @param {?} ngZone
     * @param {?} elementRef
     */
    constructor(ngZone, elementRef) {
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
    /**
     * @return {?}
     */
    get opened() {
        return this._opened;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set opened(value) {
        if (this._opened) {
            this.saveWidth();
        }
        this._opened = value;
    }
    /**
     * @return {?}
     */
    get animationState() {
        return this._opened ? McSidebarAnimationState.Opened : McSidebarAnimationState.Closed;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.position === SidebarPositions.Left || this.position === SidebarPositions.Right) {
            this.registerKeydownListener();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.position === SidebarPositions.Left || this.position === SidebarPositions.Right) {
            this.unRegisterKeydownListener();
        }
    }
    /**
     * @return {?}
     */
    toggle() {
        this.opened = !this.opened;
    }
    /**
     * @return {?}
     */
    onAnimationStart() {
        if (this._opened) {
            this.internalState = this._opened;
        }
    }
    /**
     * @return {?}
     */
    onAnimationDone() {
        this.internalState = this._opened;
        this.stateChanged.emit(this._opened);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.params = {
            openedStateWidth: this.openedContent.width || 'inherit',
            openedStateMinWidth: this.openedContent.minWidth || 'inherit',
            openedStateMaxWidth: this.openedContent.maxWidth || 'inherit',
            closedStateWidth: this.closedContent.width || '32px'
        };
    }
    /**
     * @private
     * @return {?}
     */
    registerKeydownListener() {
        this.documentKeydownListener = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (isControl(event) || isInput(event)) {
                return;
            }
            if ((this.position === SidebarPositions.Left && isLeftBracket(event)) ||
                (this.position === SidebarPositions.Right && isRightBracket(event))) {
                this.ngZone.run((/**
                 * @return {?}
                 */
                () => this._opened = !this._opened));
            }
        });
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            // tslint:disable-next-line: no-unbound-method
            document.addEventListener('keypress', this.documentKeydownListener, true);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    unRegisterKeydownListener() {
        // tslint:disable-next-line: no-unbound-method
        document.removeEventListener('keypress', this.documentKeydownListener, true);
    }
    /**
     * @private
     * @return {?}
     */
    saveWidth() {
        this.params.openedStateWidth = `${this.elementRef.nativeElement.offsetWidth}px`;
    }
}
McSidebar.decorators = [
    { type: Component, args: [{
                selector: 'mc-sidebar',
                exportAs: 'mcSidebar',
                template: "<ng-container [ngSwitch]=\"internalState\">\n    <ng-container *ngSwitchCase=\"true\">\n        <ng-content select=\"[mc-sidebar-opened]\"></ng-content>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <ng-content select=\"[mc-sidebar-closed]\"></ng-content>\n    </ng-container>\n</ng-container>\n",
                host: {
                    class: 'mc-sidebar',
                    '[@state]': `{
            value: animationState,
            params: params
        }`,
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
McSidebar.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef }
];
McSidebar.propDecorators = {
    opened: [{ type: Input }],
    position: [{ type: Input }],
    stateChanged: [{ type: Output }],
    openedContent: [{ type: ContentChild, args: [McSidebarOpened, { static: false },] }],
    closedContent: [{ type: ContentChild, args: [McSidebarClosed, { static: false },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvc2lkZWJhci8iLCJzb3VyY2VzIjpbInNpZGViYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTdGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUdwRixNQUFZLGdCQUFnQjtJQUN4QixJQUFJLFFBQVM7SUFDYixLQUFLLFNBQVU7RUFDbEI7Ozs7O0FBR0QsOEJBTUM7OztJQUxHLDhDQUE0Qjs7SUFDNUIsMkNBQXlCOztJQUN6Qiw4Q0FBNEI7O0lBRTVCLDJDQUF5Qjs7QUFRN0IsTUFBTSxPQUFPLGVBQWU7OztZQUozQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLGlCQUFpQjthQUM5Qjs7O3VCQUVJLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzs7O0lBRk4sbUNBQTBCOztJQUMxQixnQ0FBdUI7O0lBQ3ZCLG1DQUEwQjs7QUFPOUIsTUFBTSxPQUFPLGVBQWU7OztZQUozQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLGlCQUFpQjthQUM5Qjs7O29CQUVJLEtBQUs7Ozs7SUFBTixnQ0FBdUI7O0FBc0IzQixNQUFNLE9BQU8sU0FBUzs7Ozs7SUF3Q2xCLFlBQW9CLE1BQWMsRUFBVSxVQUFzQjtRQUE5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NEJBRU4sWUFBWSxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7NEJBRS9DLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7Ozs7O0lBaEJoRCw0QkFBZ0M7O0lBRWhDLDZCQUFvQzs7SUFFcEMsMkJBTUU7O0lBRUYsaUNBQXFGOztJQUVyRixrQ0FBaUY7O0lBRWpGLGtDQUFpRjs7SUFPakYsa0NBQThCOzs7OztJQUU5Qiw0Q0FBZ0U7Ozs7O0lBRXBELDJCQUFzQjs7Ozs7SUFBRSwrQkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0NvbnRyb2wsIGlzSW5wdXQsIGlzTGVmdEJyYWNrZXQsIGlzUmlnaHRCcmFja2V0IH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgbWNTaWRlYmFyQW5pbWF0aW9ucywgTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUgfSBmcm9tICcuL3NpZGViYXItYW5pbWF0aW9ucyc7XG5cblxuZXhwb3J0IGVudW0gU2lkZWJhclBvc2l0aW9ucyB7XG4gICAgTGVmdCA9ICdsZWZ0JyxcbiAgICBSaWdodCA9ICdyaWdodCdcbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5pbnRlcmZhY2UgTWNTaWRlYmFyUGFyYW1zIHtcbiAgICBvcGVuZWRTdGF0ZU1pbldpZHRoOiBzdHJpbmc7XG4gICAgb3BlbmVkU3RhdGVXaWR0aDogc3RyaW5nO1xuICAgIG9wZW5lZFN0YXRlTWF4V2lkdGg6IHN0cmluZztcblxuICAgIGNsb3NlZFN0YXRlV2lkdGg6IHN0cmluZztcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1zaWRlYmFyLW9wZW5lZF0nLFxuICAgIGV4cG9ydEFzOiAnbWNTaWRlYmFyT3BlbmVkJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGViYXJPcGVuZWQge1xuICAgIEBJbnB1dCgpIG1pbldpZHRoOiBzdHJpbmc7XG4gICAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcbiAgICBASW5wdXQoKSBtYXhXaWR0aDogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1zaWRlYmFyLWNsb3NlZF0nLFxuICAgIGV4cG9ydEFzOiAnbWNTaWRlYmFyQ2xvc2VkJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGViYXJDbG9zZWQge1xuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlYmFyJyxcbiAgICBleHBvcnRBczogJ21jU2lkZWJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICdzaWRlYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZWJhcicsXG4gICAgICAgICdbQHN0YXRlXSc6IGB7XG4gICAgICAgICAgICB2YWx1ZTogYW5pbWF0aW9uU3RhdGUsXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgICB9YCxcbiAgICAgICAgJyhAc3RhdGUuc3RhcnQpJzogJ29uQW5pbWF0aW9uU3RhcnQoKScsXG4gICAgICAgICcoQHN0YXRlLmRvbmUpJzogJ29uQW5pbWF0aW9uRG9uZSgpJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uczogW21jU2lkZWJhckFuaW1hdGlvbnMuc2lkZWJhclN0YXRlXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZWJhciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBASW5wdXQoKVxuICAgIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XG4gICAgfVxuXG4gICAgc2V0IG9wZW5lZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVXaWR0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3BlbmVkID0gdmFsdWU7XG4gICAgfVxuICAgIHByaXZhdGUgX29wZW5lZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBwb3NpdGlvbjogU2lkZWJhclBvc2l0aW9ucztcblxuICAgIHBhcmFtczogTWNTaWRlYmFyUGFyYW1zID0ge1xuICAgICAgICBvcGVuZWRTdGF0ZVdpZHRoOiAnaW5oZXJpdCcsXG4gICAgICAgIG9wZW5lZFN0YXRlTWluV2lkdGg6ICdpbmhlcml0JyxcbiAgICAgICAgb3BlbmVkU3RhdGVNYXhXaWR0aDogJ2luaGVyaXQnLFxuXG4gICAgICAgIGNsb3NlZFN0YXRlV2lkdGg6ICczMnB4J1xuICAgIH07XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc3RhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBAQ29udGVudENoaWxkKE1jU2lkZWJhck9wZW5lZCwgeyBzdGF0aWM6IGZhbHNlIH0pIG9wZW5lZENvbnRlbnQ6IE1jU2lkZWJhck9wZW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNTaWRlYmFyQ2xvc2VkLCB7IHN0YXRpYzogZmFsc2UgfSkgY2xvc2VkQ29udGVudDogTWNTaWRlYmFyQ2xvc2VkO1xuXG5cbiAgICBnZXQgYW5pbWF0aW9uU3RhdGUoKTogTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkID8gTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUuT3BlbmVkIDogTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUuQ2xvc2VkO1xuICAgIH1cblxuICAgIGludGVybmFsU3RhdGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBkb2N1bWVudEtleWRvd25MaXN0ZW5lcjogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLkxlZnQgfHwgdGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5SaWdodCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcktleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLkxlZnQgfHwgdGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5SaWdodCkge1xuICAgICAgICAgICAgdGhpcy51blJlZ2lzdGVyS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcGVuZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxTdGF0ZSA9IHRoaXMuX29wZW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRG9uZSgpIHtcbiAgICAgICAgdGhpcy5pbnRlcm5hbFN0YXRlID0gdGhpcy5fb3BlbmVkO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodGhpcy5fb3BlbmVkKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgb3BlbmVkU3RhdGVXaWR0aDogdGhpcy5vcGVuZWRDb250ZW50LndpZHRoIHx8ICdpbmhlcml0JyxcbiAgICAgICAgICAgIG9wZW5lZFN0YXRlTWluV2lkdGg6IHRoaXMub3BlbmVkQ29udGVudC5taW5XaWR0aCB8fCAnaW5oZXJpdCcsXG4gICAgICAgICAgICBvcGVuZWRTdGF0ZU1heFdpZHRoOiB0aGlzLm9wZW5lZENvbnRlbnQubWF4V2lkdGggfHwgJ2luaGVyaXQnLFxuXG4gICAgICAgICAgICBjbG9zZWRTdGF0ZVdpZHRoOiB0aGlzLmNsb3NlZENvbnRlbnQud2lkdGggfHwgJzMycHgnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlcktleWRvd25MaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ29udHJvbChldmVudCkgfHwgaXNJbnB1dChldmVudCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAodGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5MZWZ0ICYmIGlzTGVmdEJyYWNrZXQoZXZlbnQpKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLlJpZ2h0ICYmIGlzUmlnaHRCcmFja2V0KGV2ZW50KSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLl9vcGVuZWQgPSAhdGhpcy5fb3BlbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVuUmVnaXN0ZXJLZXlkb3duTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLmRvY3VtZW50S2V5ZG93bkxpc3RlbmVyLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVXaWR0aCgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMub3BlbmVkU3RhdGVXaWR0aCA9IGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRofXB4YDtcbiAgICB9XG59XG4iXX0=
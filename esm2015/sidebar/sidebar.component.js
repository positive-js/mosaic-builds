/**
 * @fileoverview added by tsickle
 * Generated from: sidebar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9zaWRlYmFyLyIsInNvdXJjZXMiOlsic2lkZWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUFFLFVBQVUsRUFDckIsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFN0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBR3BGLE1BQVksZ0JBQWdCO0lBQ3hCLElBQUksUUFBUztJQUNiLEtBQUssU0FBVTtFQUNsQjs7Ozs7QUFHRCw4QkFNQzs7O0lBTEcsOENBQTRCOztJQUM1QiwyQ0FBeUI7O0lBQ3pCLDhDQUE0Qjs7SUFFNUIsMkNBQXlCOztBQVE3QixNQUFNLE9BQU8sZUFBZTs7O1lBSjNCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsaUJBQWlCO2FBQzlCOzs7dUJBRUksS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7Ozs7SUFGTixtQ0FBMEI7O0lBQzFCLGdDQUF1Qjs7SUFDdkIsbUNBQTBCOztBQU85QixNQUFNLE9BQU8sZUFBZTs7O1lBSjNCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsaUJBQWlCO2FBQzlCOzs7b0JBRUksS0FBSzs7OztJQUFOLGdDQUF1Qjs7QUFzQjNCLE1BQU0sT0FBTyxTQUFTOzs7OztJQXVDbEIsWUFBb0IsTUFBYyxF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QUs7MkJBVUwsTUFBTTs0QkFFTixZQUFZLFNBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs0QkFFL0MsWUFBWSxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7Ozs7SUFoQmhELDRCQUFnQzs7SUFFaEMsNkJBQW9DOztJQUVwQywyQkFNRTs7SUFFRixpQ0FBcUY7O0lBRXJGLGtDQUFpRjs7SUFFakYsa0NBQWlGOztJQU1qRixrQ0FBOEI7Ozs7O0lBRTlCLDRDQUFnRTs7Ozs7SUFFcEQsMkJBQXNCOzs7OztJQUFFLCtCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSwgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzQ29udHJvbCwgaXNJbnB1dCwgaXNMZWZ0QnJhY2tldCwgaXNSaWdodEJyYWNrZXQgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuXG5pbXBvcnQgeyBtY1NpZGViYXJBbmltYXRpb25zLCBNY1NpZGViYXJBbmltYXRpb25TdGF0ZSB9IGZyb20gJy4vc2lkZWJhci1hbmltYXRpb25zJztcblxuXG5leHBvcnQgZW51bSBTaWRlYmFyUG9zaXRpb25zIHtcbiAgICBMZWZ0ID0gJ2xlZnQnLFxuICAgIFJpZ2h0ID0gJ3JpZ2h0J1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmludGVyZmFjZSBNY1NpZGViYXJQYXJhbXMge1xuICAgIG9wZW5lZFN0YXRlTWluV2lkdGg6IHN0cmluZztcbiAgICBvcGVuZWRTdGF0ZVdpZHRoOiBzdHJpbmc7XG4gICAgb3BlbmVkU3RhdGVNYXhXaWR0aDogc3RyaW5nO1xuXG4gICAgY2xvc2VkU3RhdGVXaWR0aDogc3RyaW5nO1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLXNpZGViYXItb3BlbmVkXScsXG4gICAgZXhwb3J0QXM6ICdtY1NpZGViYXJPcGVuZWQnXG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZWJhck9wZW5lZCB7XG4gICAgQElucHV0KCkgbWluV2lkdGg6IHN0cmluZztcbiAgICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1heFdpZHRoOiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLXNpZGViYXItY2xvc2VkXScsXG4gICAgZXhwb3J0QXM6ICdtY1NpZGViYXJDbG9zZWQnXG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZWJhckNsb3NlZCB7XG4gICAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXNpZGViYXInLFxuICAgIGV4cG9ydEFzOiAnbWNTaWRlYmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NpZGViYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NpZGViYXIuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlYmFyJyxcbiAgICAgICAgJ1tAc3RhdGVdJzogYHtcbiAgICAgICAgICAgIHZhbHVlOiBhbmltYXRpb25TdGF0ZSxcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgIH1gLFxuICAgICAgICAnKEBzdGF0ZS5zdGFydCknOiAnb25BbmltYXRpb25TdGFydCgpJyxcbiAgICAgICAgJyhAc3RhdGUuZG9uZSknOiAnb25BbmltYXRpb25Eb25lKCknXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiBbbWNTaWRlYmFyQW5pbWF0aW9ucy5zaWRlYmFyU3RhdGVdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlYmFyIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgICB9XG5cbiAgICBzZXQgb3BlbmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcGVuZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVdpZHRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vcGVuZWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfb3BlbmVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHBvc2l0aW9uOiBTaWRlYmFyUG9zaXRpb25zO1xuXG4gICAgcGFyYW1zOiBNY1NpZGViYXJQYXJhbXMgPSB7XG4gICAgICAgIG9wZW5lZFN0YXRlV2lkdGg6ICdpbmhlcml0JyxcbiAgICAgICAgb3BlbmVkU3RhdGVNaW5XaWR0aDogJ2luaGVyaXQnLFxuICAgICAgICBvcGVuZWRTdGF0ZU1heFdpZHRoOiAnaW5oZXJpdCcsXG5cbiAgICAgICAgY2xvc2VkU3RhdGVXaWR0aDogJzMycHgnXG4gICAgfTtcblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBzdGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNTaWRlYmFyT3BlbmVkLCB7IHN0YXRpYzogZmFsc2UgfSkgb3BlbmVkQ29udGVudDogTWNTaWRlYmFyT3BlbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZChNY1NpZGViYXJDbG9zZWQsIHsgc3RhdGljOiBmYWxzZSB9KSBjbG9zZWRDb250ZW50OiBNY1NpZGViYXJDbG9zZWQ7XG5cbiAgICBnZXQgYW5pbWF0aW9uU3RhdGUoKTogTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkID8gTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUuT3BlbmVkIDogTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUuQ2xvc2VkO1xuICAgIH1cblxuICAgIGludGVybmFsU3RhdGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBkb2N1bWVudEtleWRvd25MaXN0ZW5lcjogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLkxlZnQgfHwgdGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5SaWdodCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcktleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLkxlZnQgfHwgdGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5SaWdodCkge1xuICAgICAgICAgICAgdGhpcy51blJlZ2lzdGVyS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbmVkID0gIXRoaXMub3BlbmVkO1xuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcGVuZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxTdGF0ZSA9IHRoaXMuX29wZW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRG9uZSgpIHtcbiAgICAgICAgdGhpcy5pbnRlcm5hbFN0YXRlID0gdGhpcy5fb3BlbmVkO1xuXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodGhpcy5fb3BlbmVkKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgb3BlbmVkU3RhdGVXaWR0aDogdGhpcy5vcGVuZWRDb250ZW50LndpZHRoIHx8ICdpbmhlcml0JyxcbiAgICAgICAgICAgIG9wZW5lZFN0YXRlTWluV2lkdGg6IHRoaXMub3BlbmVkQ29udGVudC5taW5XaWR0aCB8fCAnaW5oZXJpdCcsXG4gICAgICAgICAgICBvcGVuZWRTdGF0ZU1heFdpZHRoOiB0aGlzLm9wZW5lZENvbnRlbnQubWF4V2lkdGggfHwgJ2luaGVyaXQnLFxuXG4gICAgICAgICAgICBjbG9zZWRTdGF0ZVdpZHRoOiB0aGlzLmNsb3NlZENvbnRlbnQud2lkdGggfHwgJzMycHgnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlcktleWRvd25MaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQ29udHJvbChldmVudCkgfHwgaXNJbnB1dChldmVudCkpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAodGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5MZWZ0ICYmIGlzTGVmdEJyYWNrZXQoZXZlbnQpKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLlJpZ2h0ICYmIGlzUmlnaHRCcmFja2V0KGV2ZW50KSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLl9vcGVuZWQgPSAhdGhpcy5fb3BlbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVuUmVnaXN0ZXJLZXlkb3duTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLmRvY3VtZW50S2V5ZG93bkxpc3RlbmVyLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVXaWR0aCgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMub3BlbmVkU3RhdGVXaWR0aCA9IGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRofXB4YDtcbiAgICB9XG59XG4iXX0=
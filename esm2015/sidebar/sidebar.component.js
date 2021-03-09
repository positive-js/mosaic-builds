import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, EventEmitter, Input, NgZone, Output, ViewEncapsulation } from '@angular/core';
import { isControl, isInput, isLeftBracket, isRightBracket } from '@ptsecurity/cdk/keycodes';
import { mcSidebarAnimations, McSidebarAnimationState } from './sidebar-animations';
export var SidebarPositions;
(function (SidebarPositions) {
    SidebarPositions["Left"] = "left";
    SidebarPositions["Right"] = "right";
})(SidebarPositions || (SidebarPositions = {}));
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
export class McSidebar {
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
    get opened() {
        return this._opened;
    }
    set opened(value) {
        if (this._opened) {
            this.saveWidth();
        }
        this._opened = value;
    }
    get animationState() {
        return this._opened ? McSidebarAnimationState.Opened : McSidebarAnimationState.Closed;
    }
    ngOnInit() {
        if (this.position === SidebarPositions.Left || this.position === SidebarPositions.Right) {
            this.registerKeydownListener();
        }
    }
    ngOnDestroy() {
        if (this.position === SidebarPositions.Left || this.position === SidebarPositions.Right) {
            this.unRegisterKeydownListener();
        }
    }
    toggle() {
        this.opened = !this.opened;
    }
    onAnimationStart() {
        if (this._opened) {
            this.internalState = this._opened;
        }
    }
    onAnimationDone() {
        this.internalState = this._opened;
        this.stateChanged.emit(this._opened);
    }
    ngAfterContentInit() {
        this.params = {
            openedStateWidth: this.openedContent.width || 'inherit',
            openedStateMinWidth: this.openedContent.minWidth || 'inherit',
            openedStateMaxWidth: this.openedContent.maxWidth || 'inherit',
            closedStateWidth: this.closedContent.width || '32px'
        };
    }
    registerKeydownListener() {
        this.documentKeydownListener = (event) => {
            if (isControl(event) || isInput(event)) {
                return;
            }
            if ((this.position === SidebarPositions.Left && isLeftBracket(event)) ||
                (this.position === SidebarPositions.Right && isRightBracket(event))) {
                this.ngZone.run(() => this._opened = !this._opened);
            }
        };
        this.ngZone.runOutsideAngular(() => {
            // tslint:disable-next-line: no-unbound-method
            document.addEventListener('keypress', this.documentKeydownListener, true);
        });
    }
    unRegisterKeydownListener() {
        // tslint:disable-next-line: no-unbound-method
        document.removeEventListener('keypress', this.documentKeydownListener, true);
    }
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
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUFFLFVBQVUsRUFDckIsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFN0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHcEYsTUFBTSxDQUFOLElBQVksZ0JBR1g7QUFIRCxXQUFZLGdCQUFnQjtJQUN4QixpQ0FBYSxDQUFBO0lBQ2IsbUNBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSFcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUczQjtBQWdCRCxNQUFNLE9BQU8sZUFBZTs7O1lBSjNCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsaUJBQWlCO2FBQzlCOzs7dUJBRUksS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7O0FBT1YsTUFBTSxPQUFPLGVBQWU7OztZQUozQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLGlCQUFpQjthQUM5Qjs7O29CQUVJLEtBQUs7O0FBc0JWLE1BQU0sT0FBTyxTQUFTO0lBdUNsQixZQUFvQixNQUFjLEVBQVUsVUFBc0I7UUFBOUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUExQjFELFlBQU8sR0FBWSxJQUFJLENBQUM7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cnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc0NvbnRyb2wsIGlzSW5wdXQsIGlzTGVmdEJyYWNrZXQsIGlzUmlnaHRCcmFja2V0IH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgbWNTaWRlYmFyQW5pbWF0aW9ucywgTWNTaWRlYmFyQW5pbWF0aW9uU3RhdGUgfSBmcm9tICcuL3NpZGViYXItYW5pbWF0aW9ucyc7XG5cblxuZXhwb3J0IGVudW0gU2lkZWJhclBvc2l0aW9ucyB7XG4gICAgTGVmdCA9ICdsZWZ0JyxcbiAgICBSaWdodCA9ICdyaWdodCdcbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5pbnRlcmZhY2UgTWNTaWRlYmFyUGFyYW1zIHtcbiAgICBvcGVuZWRTdGF0ZU1pbldpZHRoOiBzdHJpbmc7XG4gICAgb3BlbmVkU3RhdGVXaWR0aDogc3RyaW5nO1xuICAgIG9wZW5lZFN0YXRlTWF4V2lkdGg6IHN0cmluZztcblxuICAgIGNsb3NlZFN0YXRlV2lkdGg6IHN0cmluZztcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1zaWRlYmFyLW9wZW5lZF0nLFxuICAgIGV4cG9ydEFzOiAnbWNTaWRlYmFyT3BlbmVkJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGViYXJPcGVuZWQge1xuICAgIEBJbnB1dCgpIG1pbldpZHRoOiBzdHJpbmc7XG4gICAgQElucHV0KCkgd2lkdGg6IHN0cmluZztcbiAgICBASW5wdXQoKSBtYXhXaWR0aDogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy1zaWRlYmFyLWNsb3NlZF0nLFxuICAgIGV4cG9ydEFzOiAnbWNTaWRlYmFyQ2xvc2VkJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGViYXJDbG9zZWQge1xuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlYmFyJyxcbiAgICBleHBvcnRBczogJ21jU2lkZWJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICdzaWRlYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZWJhcicsXG4gICAgICAgICdbQHN0YXRlXSc6IGB7XG4gICAgICAgICAgICB2YWx1ZTogYW5pbWF0aW9uU3RhdGUsXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgICB9YCxcbiAgICAgICAgJyhAc3RhdGUuc3RhcnQpJzogJ29uQW5pbWF0aW9uU3RhcnQoKScsXG4gICAgICAgICcoQHN0YXRlLmRvbmUpJzogJ29uQW5pbWF0aW9uRG9uZSgpJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uczogW21jU2lkZWJhckFuaW1hdGlvbnMuc2lkZWJhclN0YXRlXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZWJhciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBASW5wdXQoKVxuICAgIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XG4gICAgfVxuXG4gICAgc2V0IG9wZW5lZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVXaWR0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3BlbmVkID0gdmFsdWU7XG4gICAgfVxuICAgIHByaXZhdGUgX29wZW5lZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBwb3NpdGlvbjogU2lkZWJhclBvc2l0aW9ucztcblxuICAgIHBhcmFtczogTWNTaWRlYmFyUGFyYW1zID0ge1xuICAgICAgICBvcGVuZWRTdGF0ZVdpZHRoOiAnaW5oZXJpdCcsXG4gICAgICAgIG9wZW5lZFN0YXRlTWluV2lkdGg6ICdpbmhlcml0JyxcbiAgICAgICAgb3BlbmVkU3RhdGVNYXhXaWR0aDogJ2luaGVyaXQnLFxuXG4gICAgICAgIGNsb3NlZFN0YXRlV2lkdGg6ICczMnB4J1xuICAgIH07XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgc3RhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBAQ29udGVudENoaWxkKE1jU2lkZWJhck9wZW5lZCwgeyBzdGF0aWM6IGZhbHNlIH0pIG9wZW5lZENvbnRlbnQ6IE1jU2lkZWJhck9wZW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNTaWRlYmFyQ2xvc2VkLCB7IHN0YXRpYzogZmFsc2UgfSkgY2xvc2VkQ29udGVudDogTWNTaWRlYmFyQ2xvc2VkO1xuXG4gICAgZ2V0IGFuaW1hdGlvblN0YXRlKCk6IE1jU2lkZWJhckFuaW1hdGlvblN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZCA/IE1jU2lkZWJhckFuaW1hdGlvblN0YXRlLk9wZW5lZCA6IE1jU2lkZWJhckFuaW1hdGlvblN0YXRlLkNsb3NlZDtcbiAgICB9XG5cbiAgICBpbnRlcm5hbFN0YXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgZG9jdW1lbnRLZXlkb3duTGlzdGVuZXI6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5MZWZ0IHx8IHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5MZWZ0IHx8IHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuUmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMudW5SZWdpc3RlcktleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvblN0YXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsU3RhdGUgPSB0aGlzLl9vcGVuZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvbkRvbmUoKSB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxTdGF0ZSA9IHRoaXMuX29wZW5lZDtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHRoaXMuX29wZW5lZCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHtcbiAgICAgICAgICAgIG9wZW5lZFN0YXRlV2lkdGg6IHRoaXMub3BlbmVkQ29udGVudC53aWR0aCB8fCAnaW5oZXJpdCcsXG4gICAgICAgICAgICBvcGVuZWRTdGF0ZU1pbldpZHRoOiB0aGlzLm9wZW5lZENvbnRlbnQubWluV2lkdGggfHwgJ2luaGVyaXQnLFxuICAgICAgICAgICAgb3BlbmVkU3RhdGVNYXhXaWR0aDogdGhpcy5vcGVuZWRDb250ZW50Lm1heFdpZHRoIHx8ICdpbmhlcml0JyxcblxuICAgICAgICAgICAgY2xvc2VkU3RhdGVXaWR0aDogdGhpcy5jbG9zZWRDb250ZW50LndpZHRoIHx8ICczMnB4J1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJLZXlkb3duTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0NvbnRyb2woZXZlbnQpIHx8IGlzSW5wdXQoZXZlbnQpKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuTGVmdCAmJiBpc0xlZnRCcmFja2V0KGV2ZW50KSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5wb3NpdGlvbiA9PT0gU2lkZWJhclBvc2l0aW9ucy5SaWdodCAmJiBpc1JpZ2h0QnJhY2tldChldmVudCkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5fb3BlbmVkID0gIXRoaXMuX29wZW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLmRvY3VtZW50S2V5ZG93bkxpc3RlbmVyLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1blJlZ2lzdGVyS2V5ZG93bkxpc3RlbmVyKCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlV2lkdGgoKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLm9wZW5lZFN0YXRlV2lkdGggPSBgJHt0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aH1weGA7XG4gICAgfVxufVxuIl19
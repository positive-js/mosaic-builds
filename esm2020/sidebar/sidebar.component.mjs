import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, EventEmitter, Input, NgZone, Output, ViewEncapsulation } from '@angular/core';
import { isControl, isInput, isLeftBracket, isRightBracket } from '@ptsecurity/cdk/keycodes';
import { mcSidebarAnimations, McSidebarAnimationState } from './sidebar-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export var SidebarPositions;
(function (SidebarPositions) {
    SidebarPositions["Left"] = "left";
    SidebarPositions["Right"] = "right";
})(SidebarPositions || (SidebarPositions = {}));
export class McSidebarOpened {
}
/** @nocollapse */ /** @nocollapse */ McSidebarOpened.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSidebarOpened, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSidebarOpened.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McSidebarOpened, selector: "[mc-sidebar-opened]", inputs: { minWidth: "minWidth", width: "width", maxWidth: "maxWidth" }, exportAs: ["mcSidebarOpened"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSidebarOpened, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-sidebar-opened]',
                    exportAs: 'mcSidebarOpened'
                }]
        }], propDecorators: { minWidth: [{
                type: Input
            }], width: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }] } });
export class McSidebarClosed {
}
/** @nocollapse */ /** @nocollapse */ McSidebarClosed.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSidebarClosed, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSidebarClosed.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McSidebarClosed, selector: "[mc-sidebar-closed]", inputs: { width: "width" }, exportAs: ["mcSidebarClosed"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSidebarClosed, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-sidebar-closed]',
                    exportAs: 'mcSidebarClosed'
                }]
        }], propDecorators: { width: [{
                type: Input
            }] } });
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
/** @nocollapse */ /** @nocollapse */ McSidebar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSidebar, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McSidebar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McSidebar, selector: "mc-sidebar", inputs: { opened: "opened", position: "position" }, outputs: { stateChanged: "stateChanged" }, host: { listeners: { "@state.start": "onAnimationStart()", "@state.done": "onAnimationDone()" }, properties: { "@state": "{\n            value: animationState,\n            params: params\n        }" }, classAttribute: "mc-sidebar" }, queries: [{ propertyName: "openedContent", first: true, predicate: McSidebarOpened, descendants: true }, { propertyName: "closedContent", first: true, predicate: McSidebarClosed, descendants: true }], exportAs: ["mcSidebar"], ngImport: i0, template: "<ng-container [ngSwitch]=\"internalState\">\n    <ng-container *ngSwitchCase=\"true\">\n        <ng-content select=\"[mc-sidebar-opened]\"></ng-content>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <ng-content select=\"[mc-sidebar-closed]\"></ng-content>\n    </ng-container>\n</ng-container>\n", styles: [".mc-sidebar{display:inline-block;height:100%;overflow:hidden}.mc-sidebar-opened,.mc-sidebar-closed{height:100%}\n"], directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], animations: [mcSidebarAnimations.sidebarState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McSidebar, decorators: [{
            type: Component,
            args: [{ selector: 'mc-sidebar', exportAs: 'mcSidebar', host: {
                        class: 'mc-sidebar',
                        '[@state]': `{
            value: animationState,
            params: params
        }`,
                        '(@state.start)': 'onAnimationStart()',
                        '(@state.done)': 'onAnimationDone()'
                    }, animations: [mcSidebarAnimations.sidebarState], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container [ngSwitch]=\"internalState\">\n    <ng-container *ngSwitchCase=\"true\">\n        <ng-content select=\"[mc-sidebar-opened]\"></ng-content>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <ng-content select=\"[mc-sidebar-closed]\"></ng-content>\n    </ng-container>\n</ng-container>\n", styles: [".mc-sidebar{display:inline-block;height:100%;overflow:hidden}.mc-sidebar-opened,.mc-sidebar-closed{height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }]; }, propDecorators: { opened: [{
                type: Input
            }], position: [{
                type: Input
            }], stateChanged: [{
                type: Output
            }], openedContent: [{
                type: ContentChild,
                args: [McSidebarOpened, { static: false }]
            }], closedContent: [{
                type: ContentChild,
                args: [McSidebarClosed, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9zaWRlYmFyL3NpZGViYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTdGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFHcEYsTUFBTSxDQUFOLElBQVksZ0JBR1g7QUFIRCxXQUFZLGdCQUFnQjtJQUN4QixpQ0FBYSxDQUFBO0lBQ2IsbUNBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSFcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUczQjtBQWdCRCxNQUFNLE9BQU8sZUFBZTs7a0pBQWYsZUFBZTtzSUFBZixlQUFlOzJGQUFmLGVBQWU7a0JBSjNCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLGlCQUFpQjtpQkFDOUI7OEJBRVksUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSzs7QUFPVixNQUFNLE9BQU8sZUFBZTs7a0pBQWYsZUFBZTtzSUFBZixlQUFlOzJGQUFmLGVBQWU7a0JBSjNCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0Is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QUFNO3NIQUkzQyxNQUFNO3NCQURULEtBQUs7Z0JBY0csUUFBUTtzQkFBaEIsS0FBSztnQkFVYSxZQUFZO3NCQUE5QixNQUFNO2dCQUUyQyxhQUFhO3NCQUE5RCxZQUFZO3VCQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRUUsYUFBYTtzQkFBOUQsWUFBWTt1QkFBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LCBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNDb250cm9sLCBpc0lucHV0LCBpc0xlZnRCcmFja2V0LCBpc1JpZ2h0QnJhY2tldCB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5cbmltcG9ydCB7IG1jU2lkZWJhckFuaW1hdGlvbnMsIE1jU2lkZWJhckFuaW1hdGlvblN0YXRlIH0gZnJvbSAnLi9zaWRlYmFyLWFuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBlbnVtIFNpZGViYXJQb3NpdGlvbnMge1xuICAgIExlZnQgPSAnbGVmdCcsXG4gICAgUmlnaHQgPSAncmlnaHQnXG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuaW50ZXJmYWNlIE1jU2lkZWJhclBhcmFtcyB7XG4gICAgb3BlbmVkU3RhdGVNaW5XaWR0aDogc3RyaW5nO1xuICAgIG9wZW5lZFN0YXRlV2lkdGg6IHN0cmluZztcbiAgICBvcGVuZWRTdGF0ZU1heFdpZHRoOiBzdHJpbmc7XG5cbiAgICBjbG9zZWRTdGF0ZVdpZHRoOiBzdHJpbmc7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtc2lkZWJhci1vcGVuZWRdJyxcbiAgICBleHBvcnRBczogJ21jU2lkZWJhck9wZW5lZCdcbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlYmFyT3BlbmVkIHtcbiAgICBASW5wdXQoKSBtaW5XaWR0aDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbWF4V2lkdGg6IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtc2lkZWJhci1jbG9zZWRdJyxcbiAgICBleHBvcnRBczogJ21jU2lkZWJhckNsb3NlZCdcbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlYmFyQ2xvc2VkIHtcbiAgICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2lkZWJhcicsXG4gICAgZXhwb3J0QXM6ICdtY1NpZGViYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnc2lkZWJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2lkZWJhci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGViYXInLFxuICAgICAgICAnW0BzdGF0ZV0nOiBge1xuICAgICAgICAgICAgdmFsdWU6IGFuaW1hdGlvblN0YXRlLFxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgfWAsXG4gICAgICAgICcoQHN0YXRlLnN0YXJ0KSc6ICdvbkFuaW1hdGlvblN0YXJ0KCknLFxuICAgICAgICAnKEBzdGF0ZS5kb25lKSc6ICdvbkFuaW1hdGlvbkRvbmUoKSdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFttY1NpZGViYXJBbmltYXRpb25zLnNpZGViYXJTdGF0ZV0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGViYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQElucHV0KClcbiAgICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xuICAgIH1cblxuICAgIHNldCBvcGVuZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX29wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zYXZlV2lkdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29wZW5lZCA9IHZhbHVlO1xuICAgIH1cbiAgICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcG9zaXRpb246IFNpZGViYXJQb3NpdGlvbnM7XG5cbiAgICBwYXJhbXM6IE1jU2lkZWJhclBhcmFtcyA9IHtcbiAgICAgICAgb3BlbmVkU3RhdGVXaWR0aDogJ2luaGVyaXQnLFxuICAgICAgICBvcGVuZWRTdGF0ZU1pbldpZHRoOiAnaW5oZXJpdCcsXG4gICAgICAgIG9wZW5lZFN0YXRlTWF4V2lkdGg6ICdpbmhlcml0JyxcblxuICAgICAgICBjbG9zZWRTdGF0ZVdpZHRoOiAnMzJweCdcbiAgICB9O1xuXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHN0YXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZChNY1NpZGViYXJPcGVuZWQsIHsgc3RhdGljOiBmYWxzZSB9KSBvcGVuZWRDb250ZW50OiBNY1NpZGViYXJPcGVuZWQ7XG5cbiAgICBAQ29udGVudENoaWxkKE1jU2lkZWJhckNsb3NlZCwgeyBzdGF0aWM6IGZhbHNlIH0pIGNsb3NlZENvbnRlbnQ6IE1jU2lkZWJhckNsb3NlZDtcblxuICAgIGdldCBhbmltYXRpb25TdGF0ZSgpOiBNY1NpZGViYXJBbmltYXRpb25TdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuZWQgPyBNY1NpZGViYXJBbmltYXRpb25TdGF0ZS5PcGVuZWQgOiBNY1NpZGViYXJBbmltYXRpb25TdGF0ZS5DbG9zZWQ7XG4gICAgfVxuXG4gICAgaW50ZXJuYWxTdGF0ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwcml2YXRlIGRvY3VtZW50S2V5ZG93bkxpc3RlbmVyOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuTGVmdCB8fCB0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLlJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyS2V5ZG93bkxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuTGVmdCB8fCB0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLlJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnVuUmVnaXN0ZXJLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wZW5lZCkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbFN0YXRlID0gdGhpcy5fb3BlbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25Eb25lKCkge1xuICAgICAgICB0aGlzLmludGVybmFsU3RhdGUgPSB0aGlzLl9vcGVuZWQ7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh0aGlzLl9vcGVuZWQpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgICAgICBvcGVuZWRTdGF0ZVdpZHRoOiB0aGlzLm9wZW5lZENvbnRlbnQud2lkdGggfHwgJ2luaGVyaXQnLFxuICAgICAgICAgICAgb3BlbmVkU3RhdGVNaW5XaWR0aDogdGhpcy5vcGVuZWRDb250ZW50Lm1pbldpZHRoIHx8ICdpbmhlcml0JyxcbiAgICAgICAgICAgIG9wZW5lZFN0YXRlTWF4V2lkdGg6IHRoaXMub3BlbmVkQ29udGVudC5tYXhXaWR0aCB8fCAnaW5oZXJpdCcsXG5cbiAgICAgICAgICAgIGNsb3NlZFN0YXRlV2lkdGg6IHRoaXMuY2xvc2VkQ29udGVudC53aWR0aCB8fCAnMzJweCdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyS2V5ZG93bkxpc3RlbmVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRvY3VtZW50S2V5ZG93bkxpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNDb250cm9sKGV2ZW50KSB8fCBpc0lucHV0KGV2ZW50KSkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICh0aGlzLnBvc2l0aW9uID09PSBTaWRlYmFyUG9zaXRpb25zLkxlZnQgJiYgaXNMZWZ0QnJhY2tldChldmVudCkpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMucG9zaXRpb24gPT09IFNpZGViYXJQb3NpdGlvbnMuUmlnaHQgJiYgaXNSaWdodEJyYWNrZXQoZXZlbnQpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuX29wZW5lZCA9ICF0aGlzLl9vcGVuZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdW5SZWdpc3RlcktleWRvd25MaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIsIHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2F2ZVdpZHRoKCkge1xuICAgICAgICB0aGlzLnBhcmFtcy5vcGVuZWRTdGF0ZVdpZHRoID0gYCR7dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGh9cHhgO1xuICAgIH1cbn1cbiIsIjxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImludGVybmFsU3RhdGVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1zaWRlYmFyLW9wZW5lZF1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbWMtc2lkZWJhci1jbG9zZWRdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG4iXX0=
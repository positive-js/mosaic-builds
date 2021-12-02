import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Input, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Output, ContentChild, NgModule } from '@angular/core';
import { isControl, isInput, isLeftBracket, isRightBracket } from '@ptsecurity/cdk/keycodes';
import { trigger, state, style, transition, animate } from '@angular/animations';

var McSidebarAnimationState;
(function (McSidebarAnimationState) {
    McSidebarAnimationState["Opened"] = "opened";
    McSidebarAnimationState["Closed"] = "closed";
})(McSidebarAnimationState || (McSidebarAnimationState = {}));
const mcSidebarAnimations = {
    sidebarState: trigger('state', [
        state('opened', style({
            minWidth: '{{ openedStateMinWidth }}',
            width: '{{ openedStateWidth }}',
            maxWidth: '{{ openedStateMaxWidth }}'
        }), { params: { openedStateMinWidth: '', openedStateWidth: '', openedStateMaxWidth: '' } }),
        state('closed', style({
            minWidth: '{{ closedStateWidth }}',
            width: '{{ closedStateWidth }}',
            maxWidth: '{{ closedStateWidth }}'
        }), { params: { closedStateWidth: '' } }),
        transition('opened => closed', [animate('0.1s')]),
        transition('closed => opened', [animate('0.2s')])
    ])
};

var SidebarPositions;
(function (SidebarPositions) {
    SidebarPositions["Left"] = "left";
    SidebarPositions["Right"] = "right";
})(SidebarPositions || (SidebarPositions = {}));
class McSidebarOpened {
}
/** @nocollapse */ McSidebarOpened.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebarOpened, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McSidebarOpened.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McSidebarOpened, selector: "[mc-sidebar-opened]", inputs: { minWidth: "minWidth", width: "width", maxWidth: "maxWidth" }, exportAs: ["mcSidebarOpened"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebarOpened, decorators: [{
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
class McSidebarClosed {
}
/** @nocollapse */ McSidebarClosed.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebarClosed, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McSidebarClosed.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McSidebarClosed, selector: "[mc-sidebar-closed]", inputs: { width: "width" }, exportAs: ["mcSidebarClosed"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebarClosed, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-sidebar-closed]',
                    exportAs: 'mcSidebarClosed'
                }]
        }], propDecorators: { width: [{
                type: Input
            }] } });
class McSidebar {
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
/** @nocollapse */ McSidebar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebar, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McSidebar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McSidebar, selector: "mc-sidebar", inputs: { opened: "opened", position: "position" }, outputs: { stateChanged: "stateChanged" }, host: { listeners: { "@state.start": "onAnimationStart()", "@state.done": "onAnimationDone()" }, properties: { "@state": "{\n            value: animationState,\n            params: params\n        }" }, classAttribute: "mc-sidebar" }, queries: [{ propertyName: "openedContent", first: true, predicate: McSidebarOpened, descendants: true }, { propertyName: "closedContent", first: true, predicate: McSidebarClosed, descendants: true }], exportAs: ["mcSidebar"], ngImport: i0, template: "<ng-container [ngSwitch]=\"internalState\">\n    <ng-container *ngSwitchCase=\"true\">\n        <ng-content select=\"[mc-sidebar-opened]\"></ng-content>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <ng-content select=\"[mc-sidebar-closed]\"></ng-content>\n    </ng-container>\n</ng-container>\n", styles: [".mc-sidebar{display:inline-block;height:100%;overflow:hidden}.mc-sidebar-opened,.mc-sidebar-closed{height:100%}\n"], directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], animations: [mcSidebarAnimations.sidebarState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-sidebar',
                    exportAs: 'mcSidebar',
                    templateUrl: 'sidebar.component.html',
                    styleUrls: ['./sidebar.scss'],
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
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
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

class McSidebarModule {
}
/** @nocollapse */ McSidebarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McSidebarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebarModule, declarations: [McSidebarClosed,
        McSidebarOpened,
        McSidebar], imports: [CommonModule], exports: [McSidebarClosed,
        McSidebarOpened,
        McSidebar] });
/** @nocollapse */ McSidebarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        McSidebarClosed,
                        McSidebarOpened,
                        McSidebar
                    ],
                    exports: [
                        McSidebarClosed,
                        McSidebarOpened,
                        McSidebar
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McSidebar, McSidebarClosed, McSidebarModule, McSidebarOpened, SidebarPositions };
//# sourceMappingURL=ptsecurity-mosaic-sidebar.js.map

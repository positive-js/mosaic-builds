import { CommonModule } from '@angular/common';
import { Directive, Input, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, NgZone, ElementRef, Output, ContentChild, NgModule } from '@angular/core';
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
class McSidebarClosed {
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

class McSidebarModule {
}
McSidebarModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McSidebar, McSidebarClosed, McSidebarModule, McSidebarOpened, SidebarPositions, mcSidebarAnimations as ɵa };
//# sourceMappingURL=ptsecurity-mosaic-sidebar.js.map

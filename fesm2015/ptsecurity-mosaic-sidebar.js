import { CommonModule } from '@angular/common';
import { Directive, Input, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, NgZone, ElementRef, Output, ContentChild, NgModule } from '@angular/core';
import { isControl, isInput, isLeftBracket, isRightBracket } from '@ptsecurity/cdk/keycodes';
import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * Generated from: sidebar-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const McSidebarAnimationState = {
    Opened: "opened",
    Closed: "closed",
};
/** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * Generated from: sidebar.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const SidebarPositions = {
    Left: "left",
    Right: "right",
};
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
if (false) {
    /** @type {?} */
    McSidebarOpened.prototype.minWidth;
    /** @type {?} */
    McSidebarOpened.prototype.width;
    /** @type {?} */
    McSidebarOpened.prototype.maxWidth;
}
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
if (false) {
    /** @type {?} */
    McSidebarClosed.prototype.width;
}
class McSidebar {
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

/**
 * @fileoverview added by tsickle
 * Generated from: sidebar.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-sidebar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McSidebar, McSidebarClosed, McSidebarModule, McSidebarOpened, SidebarPositions, mcSidebarAnimations as ɵa };
//# sourceMappingURL=ptsecurity-mosaic-sidebar.js.map

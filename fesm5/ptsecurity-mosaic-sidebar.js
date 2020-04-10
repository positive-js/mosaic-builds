import { CommonModule } from '@angular/common';
import { Directive, Input, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, NgZone, ElementRef, Output, ContentChild, NgModule } from '@angular/core';
import { isControl, isInput, isLeftBracket, isRightBracket } from '@ptsecurity/cdk/keycodes';
import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * Generated from: sidebar-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var McSidebarAnimationState = {
    Opened: "opened",
    Closed: "closed",
};
/** @type {?} */
var mcSidebarAnimations = {
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var SidebarPositions = {
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McSidebarModule = /** @class */ (function () {
    function McSidebarModule() {
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
    return McSidebarModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-sidebar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McSidebar, McSidebarClosed, McSidebarModule, McSidebarOpened, SidebarPositions, mcSidebarAnimations as ɵa };
//# sourceMappingURL=ptsecurity-mosaic-sidebar.js.map

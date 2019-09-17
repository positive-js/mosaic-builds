/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/sidebar', ['exports', '@angular/animations', '@angular/core', '@ptsecurity/cdk/keycodes', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.sidebar = {}),global.ng.animations,global.ng.core,global.ng.cdk.keycodes,global.ng.common));
}(this, (function (exports,animations,core,keycodes,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var McSidebarAnimationState = {
    Opened: 'opened',
    Closed: 'closed',
};
/** @type {?} */
var mcSidebarAnimations = {
    sidebarState: animations.trigger('state', [
        animations.state('opened', animations.style({
            minWidth: '{{ openedStateMinWidth }}',
            width: '{{ openedStateWidth }}',
            maxWidth: '{{ openedStateMaxWidth }}'
        }), { params: { openedStateMinWidth: '', openedStateWidth: '', openedStateMaxWidth: '' } }),
        animations.state('closed', animations.style({
            minWidth: '{{ closedStateWidth }}',
            width: '{{ closedStateWidth }}',
            maxWidth: '{{ closedStateWidth }}'
        }), { params: { closedStateWidth: '' } }),
        animations.transition('opened => closed', [animations.animate('0.1s')]),
        animations.transition('closed => opened', [animations.animate('0.2s')])
    ])
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var SidebarPositions = {
    Left: 'left',
    Right: 'right',
};
var McSidebarOpened = /** @class */ (function () {
    function McSidebarOpened() {
    }
    McSidebarOpened.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-sidebar-opened]',
                    exportAs: 'mcSidebarOpened'
                },] },
    ];
    McSidebarOpened.propDecorators = {
        minWidth: [{ type: core.Input }],
        width: [{ type: core.Input }],
        maxWidth: [{ type: core.Input }]
    };
    return McSidebarOpened;
}());
var McSidebarClosed = /** @class */ (function () {
    function McSidebarClosed() {
    }
    McSidebarClosed.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mc-sidebar-closed]',
                    exportAs: 'mcSidebarClosed'
                },] },
    ];
    McSidebarClosed.propDecorators = {
        width: [{ type: core.Input }]
    };
    return McSidebarClosed;
}());
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
        this.stateChanged = new core.EventEmitter();
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
            if (keycodes.isControl(event) || keycodes.isInput(event)) {
                return;
            }
            if ((_this.position === SidebarPositions.Left && keycodes.isLeftBracket(event)) ||
                (_this.position === SidebarPositions.Right && keycodes.isRightBracket(event))) {
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
        { type: core.Component, args: [{
                    selector: 'mc-sidebar',
                    exportAs: 'mcSidebar',
                    template: "<ng-container [ngSwitch]=\"internalState\"><ng-container *ngSwitchCase=\"true\"><ng-content select=\"[mc-sidebar-opened]\"></ng-content></ng-container><ng-container *ngSwitchCase=\"false\"><ng-content select=\"[mc-sidebar-closed]\"></ng-content></ng-container></ng-container>",
                    styles: [".mc-sidebar{display:inline-block;height:100%;overflow:hidden}.mc-sidebar-closed,.mc-sidebar-opened{height:100%}"],
                    host: {
                        class: 'mc-sidebar',
                        '[@state]': "{\n            value: animationState,\n            params: params\n        }",
                        '(@state.start)': 'onAnimationStart()',
                        '(@state.done)': 'onAnimationDone()'
                    },
                    animations: [mcSidebarAnimations.sidebarState],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    McSidebar.ctorParameters = function () { return [
        { type: core.NgZone },
        { type: core.ElementRef }
    ]; };
    McSidebar.propDecorators = {
        opened: [{ type: core.Input }],
        position: [{ type: core.Input }],
        stateChanged: [{ type: core.Output }],
        openedContent: [{ type: core.ContentChild, args: [McSidebarOpened, { static: false },] }],
        closedContent: [{ type: core.ContentChild, args: [McSidebarClosed, { static: false },] }]
    };
    return McSidebar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McSidebarModule = /** @class */ (function () {
    function McSidebarModule() {
    }
    McSidebarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
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
                },] },
    ];
    return McSidebarModule;
}());

exports.McSidebarModule = McSidebarModule;
exports.SidebarPositions = SidebarPositions;
exports.McSidebarOpened = McSidebarOpened;
exports.McSidebarClosed = McSidebarClosed;
exports.McSidebar = McSidebar;
exports.ɵa1 = mcSidebarAnimations;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-sidebar.umd.js.map

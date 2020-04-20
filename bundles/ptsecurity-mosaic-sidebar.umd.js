(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/sidebar', ['exports', '@angular/common', '@angular/core', '@ptsecurity/cdk/keycodes', '@angular/animations'], factory) :
    (global = global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.sidebar = {}), global.ng.common, global.ng.core, global.keycodes, global.ng.animations));
}(this, (function (exports, common, core, keycodes, animations) { 'use strict';

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
            { type: core.Directive, args: [{
                        selector: '[mc-sidebar-opened]',
                        exportAs: 'mcSidebarOpened'
                    },] }
        ];
        McSidebarOpened.propDecorators = {
            minWidth: [{ type: core.Input }],
            width: [{ type: core.Input }],
            maxWidth: [{ type: core.Input }]
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
            { type: core.Directive, args: [{
                        selector: '[mc-sidebar-closed]',
                        exportAs: 'mcSidebarClosed'
                    },] }
        ];
        McSidebarClosed.propDecorators = {
            width: [{ type: core.Input }]
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
                        template: "<ng-container [ngSwitch]=\"internalState\">\n    <ng-container *ngSwitchCase=\"true\">\n        <ng-content select=\"[mc-sidebar-opened]\"></ng-content>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <ng-content select=\"[mc-sidebar-closed]\"></ng-content>\n    </ng-container>\n</ng-container>\n",
                        host: {
                            class: 'mc-sidebar',
                            '[@state]': "{\n            value: animationState,\n            params: params\n        }",
                            '(@state.start)': 'onAnimationStart()',
                            '(@state.done)': 'onAnimationDone()'
                        },
                        animations: [mcSidebarAnimations.sidebarState],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".mc-sidebar{display:inline-block;height:100%;overflow:hidden}.mc-sidebar-closed,.mc-sidebar-opened{height:100%}"]
                    }] }
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
                    },] }
        ];
        return McSidebarModule;
    }());

    exports.McSidebar = McSidebar;
    exports.McSidebarClosed = McSidebarClosed;
    exports.McSidebarModule = McSidebarModule;
    exports.McSidebarOpened = McSidebarOpened;
    exports.SidebarPositions = SidebarPositions;
    exports.ɵa = mcSidebarAnimations;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-sidebar.umd.js.map
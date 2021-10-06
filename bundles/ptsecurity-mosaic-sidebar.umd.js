(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/sidebar', ['exports', '@angular/common', '@angular/core', '@ptsecurity/cdk/keycodes', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity.mosaic = global.ptsecurity.mosaic || {}, global.ptsecurity.mosaic.sidebar = {}), global.ng.common, global.ng.core, global.mc.cdk.keycodes, global.ng.animations));
}(this, (function (exports, i1, i0, keycodes, animations) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var McSidebarAnimationState;
    (function (McSidebarAnimationState) {
        McSidebarAnimationState["Opened"] = "opened";
        McSidebarAnimationState["Closed"] = "closed";
    })(McSidebarAnimationState || (McSidebarAnimationState = {}));
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

    exports.SidebarPositions = void 0;
    (function (SidebarPositions) {
        SidebarPositions["Left"] = "left";
        SidebarPositions["Right"] = "right";
    })(exports.SidebarPositions || (exports.SidebarPositions = {}));
    var McSidebarOpened = /** @class */ (function () {
        function McSidebarOpened() {
        }
        return McSidebarOpened;
    }());
    /** @nocollapse */ McSidebarOpened.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebarOpened, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McSidebarOpened.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McSidebarOpened, selector: "[mc-sidebar-opened]", inputs: { minWidth: "minWidth", width: "width", maxWidth: "maxWidth" }, exportAs: ["mcSidebarOpened"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebarOpened, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mc-sidebar-opened]',
                        exportAs: 'mcSidebarOpened'
                    }]
            }], propDecorators: { minWidth: [{
                    type: i0.Input
                }], width: [{
                    type: i0.Input
                }], maxWidth: [{
                    type: i0.Input
                }] } });
    var McSidebarClosed = /** @class */ (function () {
        function McSidebarClosed() {
        }
        return McSidebarClosed;
    }());
    /** @nocollapse */ McSidebarClosed.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebarClosed, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ McSidebarClosed.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McSidebarClosed, selector: "[mc-sidebar-closed]", inputs: { width: "width" }, exportAs: ["mcSidebarClosed"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebarClosed, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[mc-sidebar-closed]',
                        exportAs: 'mcSidebarClosed'
                    }]
            }], propDecorators: { width: [{
                    type: i0.Input
                }] } });
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
            this.stateChanged = new i0.EventEmitter();
            this.internalState = true;
        }
        Object.defineProperty(McSidebar.prototype, "opened", {
            get: function () {
                return this._opened;
            },
            set: function (value) {
                if (this._opened) {
                    this.saveWidth();
                }
                this._opened = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(McSidebar.prototype, "animationState", {
            get: function () {
                return this._opened ? McSidebarAnimationState.Opened : McSidebarAnimationState.Closed;
            },
            enumerable: false,
            configurable: true
        });
        McSidebar.prototype.ngOnInit = function () {
            if (this.position === exports.SidebarPositions.Left || this.position === exports.SidebarPositions.Right) {
                this.registerKeydownListener();
            }
        };
        McSidebar.prototype.ngOnDestroy = function () {
            if (this.position === exports.SidebarPositions.Left || this.position === exports.SidebarPositions.Right) {
                this.unRegisterKeydownListener();
            }
        };
        McSidebar.prototype.toggle = function () {
            this.opened = !this.opened;
        };
        McSidebar.prototype.onAnimationStart = function () {
            if (this._opened) {
                this.internalState = this._opened;
            }
        };
        McSidebar.prototype.onAnimationDone = function () {
            this.internalState = this._opened;
            this.stateChanged.emit(this._opened);
        };
        McSidebar.prototype.ngAfterContentInit = function () {
            this.params = {
                openedStateWidth: this.openedContent.width || 'inherit',
                openedStateMinWidth: this.openedContent.minWidth || 'inherit',
                openedStateMaxWidth: this.openedContent.maxWidth || 'inherit',
                closedStateWidth: this.closedContent.width || '32px'
            };
        };
        McSidebar.prototype.registerKeydownListener = function () {
            var _this = this;
            this.documentKeydownListener = function (event) {
                if (keycodes.isControl(event) || keycodes.isInput(event)) {
                    return;
                }
                if ((_this.position === exports.SidebarPositions.Left && keycodes.isLeftBracket(event)) ||
                    (_this.position === exports.SidebarPositions.Right && keycodes.isRightBracket(event))) {
                    _this.ngZone.run(function () { return _this._opened = !_this._opened; });
                }
            };
            this.ngZone.runOutsideAngular(function () {
                // tslint:disable-next-line: no-unbound-method
                document.addEventListener('keypress', _this.documentKeydownListener, true);
            });
        };
        McSidebar.prototype.unRegisterKeydownListener = function () {
            // tslint:disable-next-line: no-unbound-method
            document.removeEventListener('keypress', this.documentKeydownListener, true);
        };
        McSidebar.prototype.saveWidth = function () {
            this.params.openedStateWidth = this.elementRef.nativeElement.offsetWidth + "px";
        };
        return McSidebar;
    }());
    /** @nocollapse */ McSidebar.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebar, deps: [{ token: i0__namespace.NgZone }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ McSidebar.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McSidebar, selector: "mc-sidebar", inputs: { opened: "opened", position: "position" }, outputs: { stateChanged: "stateChanged" }, host: { listeners: { "@state.start": "onAnimationStart()", "@state.done": "onAnimationDone()" }, properties: { "@state": "{\n            value: animationState,\n            params: params\n        }" }, classAttribute: "mc-sidebar" }, queries: [{ propertyName: "openedContent", first: true, predicate: McSidebarOpened, descendants: true }, { propertyName: "closedContent", first: true, predicate: McSidebarClosed, descendants: true }], exportAs: ["mcSidebar"], ngImport: i0__namespace, template: "<ng-container [ngSwitch]=\"internalState\">\n    <ng-container *ngSwitchCase=\"true\">\n        <ng-content select=\"[mc-sidebar-opened]\"></ng-content>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <ng-content select=\"[mc-sidebar-closed]\"></ng-content>\n    </ng-container>\n</ng-container>\n", styles: [".mc-sidebar{display:inline-block;height:100%;overflow:hidden}.mc-sidebar-opened,.mc-sidebar-closed{height:100%}\n"], directives: [{ type: i1__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], animations: [mcSidebarAnimations.sidebarState], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebar, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mc-sidebar',
                        exportAs: 'mcSidebar',
                        templateUrl: 'sidebar.component.html',
                        styleUrls: ['./sidebar.scss'],
                        host: {
                            class: 'mc-sidebar',
                            '[@state]': "{\n            value: animationState,\n            params: params\n        }",
                            '(@state.start)': 'onAnimationStart()',
                            '(@state.done)': 'onAnimationDone()'
                        },
                        animations: [mcSidebarAnimations.sidebarState],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.NgZone }, { type: i0__namespace.ElementRef }]; }, propDecorators: { opened: [{
                    type: i0.Input
                }], position: [{
                    type: i0.Input
                }], stateChanged: [{
                    type: i0.Output
                }], openedContent: [{
                    type: i0.ContentChild,
                    args: [McSidebarOpened, { static: false }]
                }], closedContent: [{
                    type: i0.ContentChild,
                    args: [McSidebarClosed, { static: false }]
                }] } });

    var McSidebarModule = /** @class */ (function () {
        function McSidebarModule() {
        }
        return McSidebarModule;
    }());
    /** @nocollapse */ McSidebarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ McSidebarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebarModule, declarations: [McSidebarClosed,
            McSidebarOpened,
            McSidebar], imports: [i1.CommonModule], exports: [McSidebarClosed,
            McSidebarOpened,
            McSidebar] });
    /** @nocollapse */ McSidebarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebarModule, imports: [[i1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0__namespace, type: McSidebarModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule],
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

    exports.McSidebar = McSidebar;
    exports.McSidebarClosed = McSidebarClosed;
    exports.McSidebarModule = McSidebarModule;
    exports.McSidebarOpened = McSidebarOpened;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-sidebar.umd.js.map

/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/core'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tooltip', ['exports', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/core', '@ptsecurity/cdk/keycodes', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.tooltip = {}),global.ng.cdk.bidi,global.ng.cdk.coercion,global.ng.cdk.overlay,global.ng.cdk.portal,global.ng.core,global.ng.cdk.keycodes,global.ng.mosaic.core,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,bidi,coercion,overlay,portal,core,keycodes,core$1,rxjs,operators,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McTooltipComponent = /** @class */ (function () {
    function McTooltipComponent(cdr) {
        this.cdr = cdr;
        this.prefix = 'mc-tooltip_placement';
        this.positions = core$1.DEFAULT_4_POSITIONS.slice();
        this.classMap = {};
        this.mcVisibleChange = new core.EventEmitter();
        this.mcMouseEnterDelay = 400;
        this.mcMouseLeaveDelay = 0;
        this._mcTrigger = 'hover';
        this._mcPlacement = 'top';
        this._mcVisible = new rxjs.BehaviorSubject(false);
        /**
         * Subject for notifying that the tooltip has been hidden from the view
         */
        this.onHideSubject = new rxjs.Subject();
        this.closeOnInteraction = false;
        this.availablePositions = core$1.POSITION_MAP;
        this.$visible = this._mcVisible.asObservable();
    }
    Object.defineProperty(McTooltipComponent.prototype, "mcTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcTitle;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isTitleString = !(value instanceof core.TemplateRef);
            if (this.isTitleString) {
                this._mcTitle = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcTrigger", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcTrigger;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mcTrigger = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcPlacement", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcPlacement;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._mcPlacement) {
                this._mcPlacement = value;
                this.positions.unshift(core$1.POSITION_MAP[this.mcPlacement]);
            }
            else if (!value) {
                this._mcPlacement = 'top';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcVisible.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var visible = coercion.coerceBooleanProperty(value);
            if (this._mcVisible.value !== visible) {
                this._mcVisible.next(visible);
                this.mcVisibleChange.emit(visible);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McTooltipComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.hideTid) {
            clearTimeout(this.hideTid);
        }
        if (!this.isContentEmpty()) {
            if (this.mcTrigger !== 'manual') {
                this.closeOnInteraction = true;
            }
            this.showTid = setTimeout((/**
             * @return {?}
             */
            function () {
                _this.mcVisible = true;
                _this.mcVisibleChange.emit(true);
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                _this.markForCheck();
            }), this.mcMouseEnterDelay);
        }
    };
    /**
     * @return {?}
     */
    McTooltipComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.showTid) {
            clearTimeout(this.showTid);
        }
        this.hideTid = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.mcVisible = false;
            _this.mcVisibleChange.emit(false);
            _this.onHideSubject.next();
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this.markForCheck();
        }), this.mcMouseLeaveDelay);
    };
    /**
     * @return {?}
     */
    McTooltipComponent.prototype.setClassMap = /**
     * @return {?}
     */
    function () {
        this.classMap = this.prefix + "-" + this.mcPlacement;
    };
    /**
     * @return {?}
     */
    McTooltipComponent.prototype.isContentEmpty = /**
     * @return {?}
     */
    function () {
        return this.isTitleString ? (this.mcTitle === '' || !this.mcTitle) : false;
    };
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view.
     * @return {?}
     */
    McTooltipComponent.prototype.afterHidden = /**
     * Returns an observable that notifies when the tooltip has been hidden from view.
     * @return {?}
     */
    function () {
        return this.onHideSubject.asObservable();
    };
    /**
     * @return {?}
     */
    McTooltipComponent.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        this.cdr.markForCheck();
    };
    /**
     * @return {?}
     */
    McTooltipComponent.prototype.handleBodyInteraction = /**
     * @return {?}
     */
    function () {
        if (this.closeOnInteraction) {
            this.hide();
        }
    };
    McTooltipComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mc-tooltip-component',
                    inputs: [
                        'mcMouseEnterDelay',
                        'mcMouseLeaveDelay',
                        'mcTitle',
                        'mcVisible',
                        'mcTrigger',
                        'mcPlacement'
                    ],
                    outputs: ['mcVisibleChange'],
                    animations: [core$1.fadeAnimation],
                    template: "<div class=\"mc-tooltip\" [ngClass]=\"classMap\" [@fadeAnimation]=\"''+($visible | async)\"><div class=\"mc-tooltip-content\"><div class=\"mc-tooltip-arrow\"></div><div class=\"mc-tooltip-inner\"><ng-container>{{ mcTitle }}</ng-container></div></div></div>",
                    preserveWhitespaces: false,
                    styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;margin:0;padding:0;z-index:1060;max-width:240px;list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:9px}.mc-tooltip_placement-right{padding-left:9px}.mc-tooltip_placement-bottom{padding-top:9px}.mc-tooltip_placement-left{padding-right:9px}.mc-tooltip-inner{padding:8px 16px;text-align:left;text-decoration:none;border-radius:3px;min-height:16px;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:12px;height:12px;transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:4px;left:50%;margin-left:-5px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-left .mc-tooltip-arrow{right:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:4px;left:50%;margin-left:-5px}"],
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        '(body:click)': 'this.handleBodyInteraction()'
                    }
                },] },
    ];
    /** @nocollapse */
    McTooltipComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    McTooltipComponent.propDecorators = {
        mcVisibleChange: [{ type: core.Output }],
        mcMouseEnterDelay: [{ type: core.Input }],
        mcMouseLeaveDelay: [{ type: core.Input }],
        mcTitle: [{ type: core.Input }],
        mcTrigger: [{ type: core.Input }],
        mcPlacement: [{ type: core.Input }],
        mcVisible: [{ type: core.Input }]
    };
    return McTooltipComponent;
}());
/** @type {?} */
var MC_TOOLTIP_SCROLL_STRATEGY = new core.InjectionToken('mc-tooltip-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function mcTooltipScrollStrategyFactory(overlay$$1) {
    return (/**
     * @return {?}
     */
    function () { return overlay$$1.scrollStrategies.reposition({ scrollThrottle: 20 }); });
}
/**
 * \@docs-private
 * @type {?}
 */
var MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_TOOLTIP_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: mcTooltipScrollStrategyFactory
};
/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @param {?} position
 * @return {?}
 */
function getMcTooltipInvalidPositionError(position) {
    return Error("McTooltip position \"" + position + "\" is invalid.");
}
/** @type {?} */
var VIEWPORT_MARGIN = 8;
var McTooltip = /** @class */ (function () {
    function McTooltip(overlay$$1, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        this.overlay = overlay$$1;
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.scrollDispatcher = scrollDispatcher;
        this.hostView = hostView;
        this.scrollStrategy = scrollStrategy;
        this.direction = direction;
        this.isTooltipOpen = false;
        this.isDynamicTooltip = false;
        this.parentDisabled = false;
        this.mcVisibleChange = new core.EventEmitter();
        this.$unsubscribe = new rxjs.Subject();
        this._disabled = false;
        this._mcTrigger = 'hover';
        this._mcPlacement = 'top';
        this.manualListeners = new Map();
        this.destroyed = new rxjs.Subject();
        this.availablePositions = core$1.POSITION_MAP;
    }
    Object.defineProperty(McTooltip.prototype, "mcTitle", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcTitle;
        },
        set: /**
         * @param {?} title
         * @return {?}
         */
        function (title) {
            this._mcTitle = title;
            this.updateCompValue('mcTitle', title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "setTitle", {
        set: /**
         * @param {?} title
         * @return {?}
         */
        function (title) {
            this.mcTitle = title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coercion.coerceBooleanProperty(value);
            this.updateCompValue('mcTooltipDisabled', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcMouseEnterDelay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcMouseEnterDelay;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mcMouseEnterDelay = value;
            this.updateCompValue('mcMouseEnterDelay', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcMouseLeaveDelay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcMouseLeaveDelay;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mcMouseLeaveDelay = value;
            this.updateCompValue('mcMouseLeaveDelay', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcTrigger", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcTrigger;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._mcTrigger = value;
                this.updateCompValue('mcTrigger', value);
            }
            else {
                this._mcTrigger = 'hover';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcPlacement", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcPlacement;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._mcPlacement = value;
                this.updateCompValue('mcPlacement', value);
            }
            else {
                this._mcPlacement = 'top';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcTooltipClass", {
        get: /**
         * @return {?}
         */
        function () { return this._mcTooltipClass; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "m\u0441TooltipClass", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mcTooltipClass = value;
            if (this.tooltip) {
                this.tooltip.setClassMap();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcVisible;
        },
        set: /**
         * @param {?} externalValue
         * @return {?}
         */
        function (externalValue) {
            /** @type {?} */
            var value = coercion.coerceBooleanProperty(externalValue);
            this._mcVisible = value;
            this.updateCompValue('mcVisible', value);
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isTooltipOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "isParentDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parentDisabled;
        },
        enumerable: true,
        configurable: true
    });
    /** Create the overlay config and position strategy */
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    McTooltip.prototype.createOverlay = /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.overlayRef) {
            return this.overlayRef;
        }
        // Create connected position strategy that listens for scroll events to reposition.
        /** @type {?} */
        var strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-tooltip')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions(core$1.DEFAULT_4_POSITIONS.slice());
        /** @type {?} */
        var scrollableAncestors = this.scrollDispatcher
            .getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges.pipe(operators.takeUntil(this.destroyed)).subscribe((/**
         * @param {?} change
         * @return {?}
         */
        function (change) {
            if (_this.tooltip) {
                _this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && _this.tooltip.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    _this.ngZone.run((/**
                     * @return {?}
                     */
                    function () { return _this.hide(); }));
                }
            }
        }));
        this.overlayRef = this.overlay.create({
            direction: this.direction,
            positionStrategy: strategy,
            panelClass: 'mc-tooltip-panel',
            scrollStrategy: this.scrollStrategy()
        });
        this.updatePosition();
        this.overlayRef.detachments()
            .pipe(operators.takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.detach(); }));
        return this.overlayRef;
    };
    /**
     * @return {?}
     */
    McTooltip.prototype.detach = /**
     * @return {?}
     */
    function () {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.tooltip = null;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McTooltip.prototype.onPositionChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        /** @type {?} */
        var updatedPlacement = this.mcPlacement;
        Object.keys(this.availablePositions).some((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if ($event.connectionPair.originX === _this.availablePositions[key].originX &&
                $event.connectionPair.originY === _this.availablePositions[key].originY &&
                $event.connectionPair.overlayX === _this.availablePositions[key].overlayX &&
                $event.connectionPair.overlayY === _this.availablePositions[key].overlayY) {
                updatedPlacement = key;
                return true;
            }
            return false;
        }));
        this.updateCompValue('mcPlacement', updatedPlacement);
        if (this.tooltip) {
            this.tooltip.setClassMap();
            this.tooltip.markForCheck();
        }
        this.handlePositioningUpdate();
    };
    /**
     * @return {?}
     */
    McTooltip.prototype.handlePositioningUpdate = /**
     * @return {?}
     */
    function () {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
            /** @type {?} */
            var pos = (this.overlayRef.overlayElement.clientHeight -
                this.hostView.element.nativeElement.clientHeight) / 2;
            // tslint:disable-line
            /** @type {?} */
            var currentContainer = this.overlayRef.overlayElement.style.top || '0px';
            this.overlayRef.overlayElement.style.top =
                parseInt(currentContainer.split('px')[0], 10) + pos - 1 + "px";
            // TODO: обновлять положение стрелки\указателя\"дятла"
        }
    };
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    McTooltip.prototype.updateCompValue = 
    // tslint:disable-next-line:no-any
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        if (this.isDynamicTooltip && value) {
            if (this.tooltip) {
                this.tooltip[key] = value;
            }
        }
    };
    /**
     * @return {?}
     */
    McTooltip.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initElementRefListeners();
    };
    /**
     * @return {?}
     */
    McTooltip.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.manualListeners.forEach((/**
         * @param {?} listener
         * @param {?} event
         * @return {?}
         */
        function (listener, event) {
            return _this.elementRef.nativeElement.removeEventListener(event, listener);
        }));
        this.manualListeners.clear();
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    McTooltip.prototype.handleKeydown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.isTooltipOpen && e.keyCode === keycodes.ESCAPE) { // tslint:disable-line
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    McTooltip.prototype.handleTouchend = /**
     * @return {?}
     */
    function () {
        this.hide();
    };
    /**
     * @return {?}
     */
    McTooltip.prototype.initElementRefListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.mcTrigger === 'hover') {
            this.manualListeners
                .set('mouseenter', (/**
             * @return {?}
             */
            function () { return _this.show(); }))
                .set('mouseleave', (/**
             * @return {?}
             */
            function () { return _this.hide(); }))
                .forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); }));
        }
        if (this.mcTrigger === 'focus') {
            this.manualListeners
                .set('focus', (/**
             * @return {?}
             */
            function () { return _this.show(); }))
                .set('blur', (/**
             * @return {?}
             */
            function () { return _this.hide(); }))
                .forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); }));
        }
    };
    /**
     * @return {?}
     */
    McTooltip.prototype.show = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.disabled) {
            if (!this.tooltip) {
                /** @type {?} */
                var overlayRef = this.createOverlay();
                this.detach();
                this.portal = this.portal || new portal.ComponentPortal(McTooltipComponent, this.hostView);
                this.tooltip = overlayRef.attach(this.portal).instance;
                this.tooltip.afterHidden()
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.detach(); }));
                this.isDynamicTooltip = true;
                /** @type {?} */
                var properties = [
                    'mcTitle',
                    'mcPlacement',
                    'mcTrigger',
                    'mcTooltipDisabled',
                    'mcMouseEnterDelay',
                    'mcMouseLeaveDelay',
                    'mсTooltipClass',
                    'mcVisible'
                ];
                properties.forEach((/**
                 * @param {?} property
                 * @return {?}
                 */
                function (property) { return _this.updateCompValue(property, _this[property]); }));
                this.tooltip.mcVisibleChange.pipe(operators.takeUntil(this.$unsubscribe), operators.distinctUntilChanged())
                    .subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    _this.mcVisible = data;
                    _this.mcVisibleChange.emit(data);
                    _this.isTooltipOpen = data;
                }));
            }
            this.updatePosition();
            this.tooltip.show();
        }
    };
    /**
     * @return {?}
     */
    McTooltip.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (this.tooltip) {
            this.tooltip.hide();
        }
    };
    /** Updates the position of the current tooltip. */
    /**
     * Updates the position of the current tooltip.
     * @return {?}
     */
    McTooltip.prototype.updatePosition = /**
     * Updates the position of the current tooltip.
     * @return {?}
     */
    function () {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        /** @type {?} */
        var position = (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
        /** @type {?} */
        var origin = this.getOrigin();
        /** @type {?} */
        var overlay$$1 = this.getOverlayPosition();
        position.withPositions([
            __assign({}, origin.main, overlay$$1.main),
            __assign({}, origin.fallback, overlay$$1.fallback)
        ]);
    };
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     * @return {?}
     */
    McTooltip.prototype.getOrigin = /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     * @return {?}
     */
    function () {
        /** @type {?} */
        var position = this.mcPlacement;
        /** @type {?} */
        var isLtr = !this.direction || this.direction.value === 'ltr';
        /** @type {?} */
        var originPosition;
        if (position === 'top' || position === 'bottom') {
            originPosition = { originX: 'center', originY: position === 'top' ? 'top' : 'bottom' };
        }
        else if (position === 'top' ||
            (position === 'left' && isLtr) ||
            (position === 'right' && !isLtr)) {
            originPosition = { originX: 'start', originY: 'center' };
        }
        else if (position === 'bottom' ||
            (position === 'right' && isLtr) ||
            (position === 'left' && !isLtr)) {
            originPosition = { originX: 'end', originY: 'center' };
        }
        else {
            throw getMcTooltipInvalidPositionError(position);
        }
        var _a = this.invertPosition(originPosition.originX, originPosition.originY), x = _a.x, y = _a.y;
        return {
            main: originPosition,
            fallback: { originX: x, originY: y }
        };
    };
    /** Returns the overlay position and a fallback position based on the user's preference */
    /**
     * Returns the overlay position and a fallback position based on the user's preference
     * @return {?}
     */
    McTooltip.prototype.getOverlayPosition = /**
     * Returns the overlay position and a fallback position based on the user's preference
     * @return {?}
     */
    function () {
        /** @type {?} */
        var position = this.mcPlacement;
        /** @type {?} */
        var isLtr = !this.direction || this.direction.value === 'ltr';
        /** @type {?} */
        var overlayPosition;
        if (position === 'top') {
            overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
        }
        else if (position === 'bottom') {
            overlayPosition = { overlayX: 'center', overlayY: 'top' };
        }
        else if (position === 'top' ||
            (position === 'left' && isLtr) ||
            (position === 'right' && !isLtr)) {
            overlayPosition = { overlayX: 'end', overlayY: 'center' };
        }
        else if (position === 'bottom' ||
            (position === 'right' && isLtr) ||
            (position === 'left' && !isLtr)) {
            overlayPosition = { overlayX: 'start', overlayY: 'center' };
        }
        else {
            throw getMcTooltipInvalidPositionError(position);
        }
        var _a = this.invertPosition(overlayPosition.overlayX, overlayPosition.overlayY), x = _a.x, y = _a.y;
        return {
            main: overlayPosition,
            fallback: { overlayX: x, overlayY: y }
        };
    };
    /** Inverts an overlay position. */
    /**
     * Inverts an overlay position.
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    McTooltip.prototype.invertPosition = /**
     * Inverts an overlay position.
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        /** @type {?} */
        var newX = x;
        /** @type {?} */
        var newY = y;
        if (this.mcPlacement === 'top' || this.mcPlacement === 'bottom') {
            if (y === 'top') {
                newY = 'bottom';
            }
            else if (y === 'bottom') {
                newY = 'top';
            }
        }
        else {
            if (x === 'end') {
                newX = 'start';
            }
            else if (x === 'start') {
                newX = 'end';
            }
        }
        return { x: newX, y: newY };
    };
    McTooltip.decorators = [
        { type: core.Directive, args: [{
                    selector: '[mcTooltip], [attribute^="mcTooltip"]',
                    exportAs: 'mcTooltip',
                    host: {
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                },] },
    ];
    /** @nocollapse */
    McTooltip.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: core.ElementRef },
        { type: core.NgZone },
        { type: overlay.ScrollDispatcher },
        { type: core.ViewContainerRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [MC_TOOLTIP_SCROLL_STRATEGY,] }] },
        { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
    ]; };
    McTooltip.propDecorators = {
        mcVisibleChange: [{ type: core.Output }],
        mcTitle: [{ type: core.Input, args: ['mcTooltip',] }],
        setTitle: [{ type: core.Input, args: ['mcTitle',] }],
        disabled: [{ type: core.Input, args: ['mcTooltipDisabled',] }],
        mcMouseEnterDelay: [{ type: core.Input, args: ['mcMouseEnterDelay',] }],
        mcMouseLeaveDelay: [{ type: core.Input, args: ['mcMouseLeaveDelay',] }],
        mcTrigger: [{ type: core.Input, args: ['mcTrigger',] }],
        mcPlacement: [{ type: core.Input, args: ['mcPlacement',] }],
        mcTooltipClass: [{ type: core.Input, args: ['mcTooltipClass',] }],
        mcVisible: [{ type: core.Input, args: ['mcVisible',] }],
        isOpen: [{ type: core.HostBinding, args: ['class.mc-tooltip-open',] }],
        isParentDisabled: [{ type: core.HostBinding, args: ['class.disabled',] }]
    };
    return McTooltip;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McToolTipModule = /** @class */ (function () {
    function McToolTipModule() {
    }
    McToolTipModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [McTooltipComponent, McTooltip],
                    exports: [McTooltipComponent, McTooltip],
                    imports: [common.CommonModule, overlay.OverlayModule],
                    providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McTooltipComponent]
                },] },
    ];
    return McToolTipModule;
}());

exports.McToolTipModule = McToolTipModule;
exports.mcTooltipScrollStrategyFactory = mcTooltipScrollStrategyFactory;
exports.getMcTooltipInvalidPositionError = getMcTooltipInvalidPositionError;
exports.McTooltipComponent = McTooltipComponent;
exports.MC_TOOLTIP_SCROLL_STRATEGY = MC_TOOLTIP_SCROLL_STRATEGY;
exports.MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER;
exports.McTooltip = McTooltip;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-tooltip.umd.js.map

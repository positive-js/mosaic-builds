/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/bidi'), require('@ptsecurity/cdk/coercion'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/cdk/overlay'), require('@ptsecurity/cdk/portal'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/platform-browser/animations')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tooltip', ['exports', '@angular/core', '@ptsecurity/cdk/bidi', '@ptsecurity/cdk/coercion', '@ptsecurity/cdk/keycodes', '@ptsecurity/cdk/overlay', '@ptsecurity/cdk/portal', '@ptsecurity/mosaic/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/platform-browser/animations'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.tooltip = {}),global.ng.core,global.ng.cdk.bidi,global.ng.cdk.coercion,global.ng.cdk.keycodes,global.ng.cdk.overlay,global.ng.cdk.portal,global.ng.mosaic.core,global.rxjs,global.rxjs.operators,global.ng.common,global.ng.platformBrowser.animations));
}(this, (function (exports,core,bidi,coercion,keycodes,overlay,portal,core$1,rxjs,operators,common,animations) { 'use strict';

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var McTooltipComponent = /** @class */ (function () {
    function McTooltipComponent(cdr) {
        this.cdr = cdr;
        this._prefix = 'mc-tooltip_placement';
        this._positions = core$1.DEFAULT_4_POSITIONS.slice();
        this._classMap = {};
        this._placement = 'top';
        this._trigger = 'hover';
        this.visibleSource = new rxjs.BehaviorSubject(false);
        this.$visible = this.visibleSource.asObservable();
        this.mcVisibleChange = new core.EventEmitter();
        this.mcMouseEnterDelay = 400;
        this.mcMouseLeaveDelay = 0;
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new rxjs.Subject();
        this._closeOnInteraction = false;
        this.availablePositions = core$1.POSITION_MAP;
    }
    Object.defineProperty(McTooltipComponent.prototype, "mcTitle", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this.isTitleString = !(value instanceof core.TemplateRef);
            if (this.isTitleString) {
                this._title = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcVisible", {
        get: function () {
            return this.visibleSource.value;
        },
        set: function (value) {
            var visible = coercion.coerceBooleanProperty(value);
            if (this.visibleSource.value !== visible) {
                this.visibleSource.next(visible);
                this.mcVisibleChange.emit(visible);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcTrigger", {
        get: function () {
            return this._trigger;
        },
        set: function (value) {
            this._trigger = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcPlacement", {
        get: function () {
            return this._placement;
        },
        set: function (value) {
            if (value !== this._placement) {
                this._placement = value;
                this._positions.unshift(core$1.POSITION_MAP[this.mcPlacement]);
            }
            else if (!value) {
                this._placement = 'top';
            }
        },
        enumerable: true,
        configurable: true
    });
    McTooltipComponent.prototype.show = function () {
        var _this = this;
        if (this.hideTId) {
            clearTimeout(this.hideTId);
        }
        if (!this.isContentEmpty()) {
            if (this.mcTrigger !== 'manual') {
                this._closeOnInteraction = true;
            }
            this.showTId = setTimeout(function () {
                _this.mcVisible = true;
                _this.mcVisibleChange.emit(true);
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                _this._markForCheck();
            }, this.mcMouseEnterDelay);
        }
    };
    McTooltipComponent.prototype.hide = function () {
        var _this = this;
        if (this.showTId) {
            clearTimeout(this.showTId);
        }
        this.hideTId = setTimeout(function () {
            _this.mcVisible = false;
            _this.mcVisibleChange.emit(false);
            _this._onHide.next();
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
        }, this.mcMouseLeaveDelay);
    };
    McTooltipComponent.prototype.setClassMap = function () {
        this._classMap = this._prefix + "-" + this._placement;
    };
    McTooltipComponent.prototype.isContentEmpty = function () {
        return this.isTitleString ? (this.mcTitle === '' || !this.mcTitle) : false;
    };
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    McTooltipComponent.prototype.afterHidden = function () {
        return this._onHide.asObservable();
    };
    McTooltipComponent.prototype._markForCheck = function () {
        this.cdr.markForCheck();
    };
    McTooltipComponent.prototype._handleBodyInteraction = function () {
        if (this._closeOnInteraction) {
            this.hide();
        }
    };
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTooltipComponent.prototype, "mcVisibleChange", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McTooltipComponent.prototype, "mcMouseEnterDelay", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object)
    ], McTooltipComponent.prototype, "mcMouseLeaveDelay", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTooltipComponent.prototype, "mcTitle", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTooltipComponent.prototype, "mcVisible", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltipComponent.prototype, "mcTrigger", null);
    __decorate([
        core.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltipComponent.prototype, "mcPlacement", null);
    McTooltipComponent = __decorate([
        core.Component({
            selector: 'mc-tooltip',
            exportAs: 'mcTooltip',
            animations: [core$1.fadeAnimation],
            template: "<div class=\"mc-tooltip\" [ngClass]=\"_classMap\" [@fadeAnimation]=\"''+($visible | async)\"><div class=\"mc-tooltip-content\"><div class=\"mc-tooltip-arrow\"></div><div class=\"mc-tooltip-inner\"><ng-container>{{ mcTitle }}</ng-container></div></div></div>",
            preserveWhitespaces: false,
            styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;margin:0;padding:0;z-index:1060;max-width:240px;list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:11px}.mc-tooltip_placement-right{padding-left:11px}.mc-tooltip_placement-bottom{padding-top:11px}.mc-tooltip_placement-left{padding-right:11px}.mc-tooltip-inner{padding:8px 16px;text-align:left;text-decoration:none;border-radius:3px;min-height:16px;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:3px;border-width:8px 8px 0;left:50%;margin-left:-8px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:3px;border-width:8px 8px 8px 0;top:16px;margin-top:-8px}.mc-tooltip_placement-left .mc-tooltip-arrow{right:3px;border-width:8px 0 8px 8px;top:16px;margin-top:-8px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:3px;border-width:0 8px 8px;left:50%;margin-left:-8px}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                '(body:click)': 'this._handleBodyInteraction()'
            }
        }),
        __metadata("design:paramtypes", [core.ChangeDetectorRef])
    ], McTooltipComponent);
    return McTooltipComponent;
}());
var MC_TOOLTIP_SCROLL_STRATEGY = new core.InjectionToken('mc-tooltip-scroll-strategy');
/** @docs-private */
function MC_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay$$1) {
    return function () { return overlay$$1.scrollStrategies.reposition({ scrollThrottle: 20 }); };
}
/** @docs-private */
var MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_TOOLTIP_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: MC_TOOLTIP_SCROLL_STRATEGY_FACTORY
};
/** Creates an error to be thrown if the user supplied an invalid tooltip position. */
function getMcTooltipInvalidPositionError(position) {
    return Error("McTooltip position \"" + position + "\" is invalid.");
}
var VIEWPORT_MARGIN = 8;
var McTooltip = /** @class */ (function () {
    function McTooltip(_overlay, elementRef, _ngZone, _scrollDispatcher, hostView, _scrollStrategy, _dir) {
        this._overlay = _overlay;
        this.elementRef = elementRef;
        this._ngZone = _ngZone;
        this._scrollDispatcher = _scrollDispatcher;
        this.hostView = hostView;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this.isTooltipOpen = false;
        this.isDynamicTooltip = false;
        this.parentDisabled = false;
        this._disabled = false;
        this._trigger = 'hover';
        this._placement = 'top';
        this.mcVisibleChange = new core.EventEmitter();
        this.$unsubscribe = new rxjs.Subject();
        this.manualListeners = new Map();
        this._destroyed = new rxjs.Subject();
        this.availablePositions = core$1.POSITION_MAP;
    }
    Object.defineProperty(McTooltip.prototype, "mcTitle", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            this._title = title;
            this.updateCompValue('mcTitle', title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "setTitle", {
        set: function (title) {
            this.mcTitle = title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcMouseEnterDelay", {
        get: function () {
            return this._mouseEnterDelay;
        },
        set: function (value) {
            this._mouseEnterDelay = value;
            this.updateCompValue('mcMouseEnterDelay', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcMouseLeaveDelay", {
        get: function () {
            return this._mouseEnterDelay;
        },
        set: function (value) {
            this._mouseLeaveDelay = value;
            this.updateCompValue('mcMouseLeaveDelay', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcVisible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            this.updateCompValue('mcVisible', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcTrigger", {
        get: function () {
            return this._trigger;
        },
        set: function (value) {
            this._trigger = value;
            this.updateCompValue('mcTrigger', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcPlacement", {
        get: function () {
            return this._placement;
        },
        set: function (value) {
            if (value) {
                this._placement = value;
                this.updateCompValue('mcPlacement', value);
            }
            else {
                this._placement = 'top';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "mcTooltipClass", {
        get: function () { return this.tooltipClass; },
        set: function (value) {
            this.tooltipClass = value;
            if (this.tooltip) {
                this.tooltip.setClassMap();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "isOpen", {
        get: function () {
            return this.isTooltipOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltip.prototype, "isParentDisabled", {
        get: function () {
            return this.parentDisabled;
        },
        enumerable: true,
        configurable: true
    });
    /** Create the overlay config and position strategy */
    McTooltip.prototype._createOverlay = function () {
        var _this = this;
        if (this._overlayRef) {
            return this._overlayRef;
        }
        // Create connected position strategy that listens for scroll events to reposition.
        var strategy = this._overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-tooltip')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions(core$1.DEFAULT_4_POSITIONS.slice());
        var scrollableAncestors = this._scrollDispatcher
            .getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges.pipe(operators.takeUntil(this._destroyed)).subscribe(function (change) {
            if (_this.tooltip) {
                _this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && _this.tooltip.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    _this._ngZone.run(function () { return _this.hide(); });
                }
            }
        });
        this._overlayRef = this._overlay.create({
            direction: this._dir,
            positionStrategy: strategy,
            panelClass: 'mc-tooltip-panel',
            scrollStrategy: this._scrollStrategy()
        });
        this._updatePosition();
        this._overlayRef.detachments()
            .pipe(operators.takeUntil(this._destroyed))
            .subscribe(function () { return _this._detach(); });
        return this._overlayRef;
    };
    McTooltip.prototype._detach = function () {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this.tooltip = null;
    };
    McTooltip.prototype.onPositionChange = function ($event) {
        var _this = this;
        var updatedPlacement = this.mcPlacement;
        Object.keys(this.availablePositions).some(function (key) {
            if ($event.connectionPair.originX === _this.availablePositions[key].originX &&
                $event.connectionPair.originY === _this.availablePositions[key].originY &&
                $event.connectionPair.overlayX === _this.availablePositions[key].overlayX &&
                $event.connectionPair.overlayY === _this.availablePositions[key].overlayY) {
                updatedPlacement = key;
                return true;
            }
            return false;
        });
        this.updateCompValue('mcPlacement', updatedPlacement);
        if (this.tooltip) {
            this.tooltip.setClassMap();
            this.tooltip._markForCheck();
        }
        this.handlePositioningUpdate();
    };
    McTooltip.prototype.handlePositioningUpdate = function () {
        if (!this._overlayRef) {
            this._overlayRef = this._createOverlay();
        }
        if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
            var pos = (this._overlayRef.overlayElement.clientHeight -
                this.hostView.element.nativeElement.clientHeight) / 2; // tslint:disable-line
            var currentContainer = this._overlayRef.overlayElement.style.top || '0px';
            this._overlayRef.overlayElement.style.top =
                parseInt(currentContainer.split('px')[0], 10) + pos - 1 + "px";
            // TODO: обновлять положение стрелки\указателя\"дятла"
        }
    };
    // tslint:disable-next-line:no-any
    McTooltip.prototype.updateCompValue = function (key, value) {
        if (this.isDynamicTooltip && value) {
            if (this.tooltip) {
                this.tooltip[key] = value;
            }
        }
    };
    McTooltip.prototype.ngOnInit = function () {
        this.initElementRefListeners();
    };
    McTooltip.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        this.manualListeners.forEach(function (listener, event) {
            return _this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        this.manualListeners.clear();
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    };
    McTooltip.prototype.handleKeydown = function (e) {
        if (this.isTooltipOpen && e.keyCode === keycodes.ESCAPE) { // tslint:disable-line
            this.hide();
        }
    };
    McTooltip.prototype.handleTouchend = function () {
        this.hide();
    };
    McTooltip.prototype.initElementRefListeners = function () {
        var _this = this;
        if (this.mcTrigger === 'hover') {
            this.manualListeners
                .set('mouseenter', function () { return _this.show(); })
                .set('mouseleave', function () { return _this.hide(); })
                .forEach(function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); });
        }
        if (this.mcTrigger === 'focus') {
            this.manualListeners
                .set('focus', function () { return _this.show(); })
                .set('blur', function () { return _this.hide(); })
                .forEach(function (listener, event) { return _this.elementRef.nativeElement.addEventListener(event, listener); });
        }
    };
    McTooltip.prototype.show = function () {
        var _this = this;
        if (!this.disabled) {
            if (!this.tooltip) {
                var overlayRef = this._createOverlay();
                this._detach();
                this._portal = this._portal || new portal.ComponentPortal(McTooltipComponent, this.hostView);
                this.tooltip = overlayRef.attach(this._portal).instance;
                this.tooltip.afterHidden()
                    .pipe(operators.takeUntil(this._destroyed))
                    .subscribe(function () { return _this._detach(); });
                this.isDynamicTooltip = true;
                var properties = [
                    'mcTitle',
                    'mcMouseEnterDelay',
                    'mcMouseLeaveDelay',
                    'mcVisible',
                    'mcTrigger',
                    'mcPlacement'
                ];
                properties.forEach(function (property) { return _this.updateCompValue(property, _this[property]); });
                this.tooltip.mcVisibleChange.pipe(operators.takeUntil(this.$unsubscribe), operators.distinctUntilChanged())
                    .subscribe(function (data) {
                    _this._visible = data;
                    _this.mcVisibleChange.emit(data);
                    _this.isTooltipOpen = data;
                });
            }
            this._updatePosition();
            this.tooltip.show();
        }
    };
    McTooltip.prototype.hide = function () {
        if (this.tooltip) {
            this.tooltip.hide();
        }
    };
    /** Updates the position of the current tooltip. */
    McTooltip.prototype._updatePosition = function () {
        if (!this._overlayRef) {
            this._overlayRef = this._createOverlay();
        }
        var position = this._overlayRef.getConfig().positionStrategy;
        var origin = this._getOrigin();
        var overlay$$1 = this._getOverlayPosition();
        position.withPositions([
            __assign({}, origin.main, overlay$$1.main),
            __assign({}, origin.fallback, overlay$$1.fallback)
        ]);
    };
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    McTooltip.prototype._getOrigin = function () {
        var position = this.mcPlacement;
        var isLtr = !this._dir || this._dir.value === 'ltr';
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
        var _a = this._invertPosition(originPosition.originX, originPosition.originY), x = _a.x, y = _a.y;
        return {
            main: originPosition,
            fallback: { originX: x, originY: y }
        };
    };
    /** Returns the overlay position and a fallback position based on the user's preference */
    McTooltip.prototype._getOverlayPosition = function () {
        var position = this.mcPlacement;
        var isLtr = !this._dir || this._dir.value === 'ltr';
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
        var _a = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY), x = _a.x, y = _a.y;
        return {
            main: overlayPosition,
            fallback: { overlayX: x, overlayY: y }
        };
    };
    /** Inverts an overlay position. */
    McTooltip.prototype._invertPosition = function (x, y) {
        var newX = x;
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
    __decorate([
        core.Output(),
        __metadata("design:type", Object)
    ], McTooltip.prototype, "mcVisibleChange", void 0);
    __decorate([
        core.Input('mcTooltip'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltip.prototype, "mcTitle", null);
    __decorate([
        core.Input('mcTitle'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltip.prototype, "setTitle", null);
    __decorate([
        core.Input('mcTooltipDisabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Object])
    ], McTooltip.prototype, "disabled", null);
    __decorate([
        core.Input('mcMouseEnterDelay'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McTooltip.prototype, "mcMouseEnterDelay", null);
    __decorate([
        core.Input('mcMouseLeaveDelay'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McTooltip.prototype, "mcMouseLeaveDelay", null);
    __decorate([
        core.Input('mcVisible'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTooltip.prototype, "mcVisible", null);
    __decorate([
        core.Input('mcTrigger'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltip.prototype, "mcTrigger", null);
    __decorate([
        core.Input('mcPlacement'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], McTooltip.prototype, "mcPlacement", null);
    __decorate([
        core.Input('mсTooltipClass'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTooltip.prototype, "mcTooltipClass", null);
    __decorate([
        core.HostBinding('class.mc-tooltip-open'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], McTooltip.prototype, "isOpen", null);
    __decorate([
        core.HostBinding('class.disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], McTooltip.prototype, "isParentDisabled", null);
    McTooltip = __decorate([
        core.Directive({
            selector: '[mcTooltip], mcTooltip',
            exportAs: 'mcTooltip',
            host: {
                '(keydown)': 'handleKeydown($event)',
                '(touchend)': 'handleTouchend()'
            }
        }),
        __param(5, core.Inject(MC_TOOLTIP_SCROLL_STRATEGY)),
        __param(6, core.Optional()),
        __metadata("design:paramtypes", [overlay.Overlay,
            core.ElementRef,
            core.NgZone,
            overlay.ScrollDispatcher,
            core.ViewContainerRef, Object, bidi.Directionality])
    ], McTooltip);
    return McTooltip;
}());

var McToolTipModule = /** @class */ (function () {
    function McToolTipModule() {
    }
    McToolTipModule = __decorate([
        core.NgModule({
            declarations: [McTooltipComponent, McTooltip],
            exports: [McTooltipComponent, McTooltip],
            imports: [animations.BrowserAnimationsModule, common.CommonModule, overlay.OverlayModule],
            providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
            entryComponents: [McTooltipComponent]
        })
    ], McToolTipModule);
    return McToolTipModule;
}());

exports.McToolTipModule = McToolTipModule;
exports.McTooltipComponent = McTooltipComponent;
exports.MC_TOOLTIP_SCROLL_STRATEGY = MC_TOOLTIP_SCROLL_STRATEGY;
exports.MC_TOOLTIP_SCROLL_STRATEGY_FACTORY = MC_TOOLTIP_SCROLL_STRATEGY_FACTORY;
exports.MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER;
exports.getMcTooltipInvalidPositionError = getMcTooltipInvalidPositionError;
exports.McTooltip = McTooltip;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-tooltip.umd.js.map

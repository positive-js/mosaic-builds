/**
 * @fileoverview added by tsickle
 * Generated from: tooltip.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __read, __spread } from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, HostBinding, Inject, InjectionToken, Input, NgZone, Optional, Output, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { fadeAnimation, DEFAULT_4_POSITIONS, POSITION_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
var McTooltipComponent = /** @class */ (function () {
    function McTooltipComponent(cdr) {
        this.cdr = cdr;
        this.prefix = 'mc-tooltip_placement';
        this.positions = __spread(DEFAULT_4_POSITIONS);
        this.classMap = {};
        this.mcVisibleChange = new EventEmitter();
        this.mcMouseEnterDelay = 400;
        this.mcMouseLeaveDelay = 0;
        this._mcTrigger = 'hover';
        this._mcPlacement = 'top';
        this._mcVisible = new BehaviorSubject(false);
        /**
         * Subject for notifying that the tooltip has been hidden from the view
         */
        this.onHideSubject = new Subject();
        this.closeOnInteraction = false;
        this.availablePositions = POSITION_MAP;
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
            this.isTitleString = !(value instanceof TemplateRef);
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
                this.positions.unshift(POSITION_MAP[this.mcPlacement]);
            }
            else if (!value) {
                this._mcPlacement = 'top';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "mcTooltipClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcTooltipClass;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mcTooltipClass = value;
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
            var visible = coerceBooleanProperty(value);
            if (visible && this._mcVisible.value !== visible) {
                this.show();
            }
            else {
                this.hide();
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
                _this._mcVisible.next(true);
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
            _this._mcVisible.next(false);
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
        var _a;
        this.classMap = (_a = {},
            _a[this.prefix + "-" + this.mcPlacement] = true,
            _a[this.mcTooltipClass] = true,
            _a);
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
        { type: Component, args: [{
                    selector: 'mc-tooltip-component',
                    animations: [fadeAnimation],
                    template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@fadeAnimation]=\"''+($visible | async)\">\n    <div class=\"mc-tooltip-content\">\n        <div class=\"mc-tooltip-arrow\"></div>\n        <div class=\"mc-tooltip-inner\">\n            <ng-container>{{ mcTitle }}</ng-container>\n        </div>\n    </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '(body:click)': 'this.handleBodyInteraction()'
                    },
                    styles: ["@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px);background-size:29px 29px;-webkit-animation:1s linear infinite mc-progress;animation:1s linear infinite mc-progress}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;margin:0;padding:0;z-index:1060;max-width:240px;list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:9px}.mc-tooltip_placement-right{padding-left:9px}.mc-tooltip_placement-bottom{padding-top:9px}.mc-tooltip_placement-left{padding-right:9px}.mc-tooltip-inner{padding:8px 16px;text-align:left;text-decoration:none;border-radius:3px;min-height:16px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:12px;height:12px;transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:4px;left:50%;margin-left:-5px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-left .mc-tooltip-arrow{right:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:4px;left:50%;margin-left:-5px}"]
                }] }
    ];
    /** @nocollapse */
    McTooltipComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    McTooltipComponent.propDecorators = {
        mcVisibleChange: [{ type: Output }],
        mcMouseEnterDelay: [{ type: Input }],
        mcMouseLeaveDelay: [{ type: Input }],
        mcTitle: [{ type: Input }],
        mcTrigger: [{ type: Input }],
        mcPlacement: [{ type: Input }],
        mcTooltipClass: [{ type: Input }],
        mcVisible: [{ type: Input }]
    };
    return McTooltipComponent;
}());
export { McTooltipComponent };
if (false) {
    /** @type {?} */
    McTooltipComponent.prototype.prefix;
    /** @type {?} */
    McTooltipComponent.prototype.positions;
    /** @type {?} */
    McTooltipComponent.prototype.classMap;
    /** @type {?} */
    McTooltipComponent.prototype.isTitleString;
    /** @type {?} */
    McTooltipComponent.prototype.showTid;
    /** @type {?} */
    McTooltipComponent.prototype.hideTid;
    /** @type {?} */
    McTooltipComponent.prototype.availablePositions;
    /** @type {?} */
    McTooltipComponent.prototype.$visible;
    /** @type {?} */
    McTooltipComponent.prototype.mcVisibleChange;
    /** @type {?} */
    McTooltipComponent.prototype.mcMouseEnterDelay;
    /** @type {?} */
    McTooltipComponent.prototype.mcMouseLeaveDelay;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcTitle;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcTrigger;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcTooltipClass;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcPlacement;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcVisible;
    /**
     * Subject for notifying that the tooltip has been hidden from the view
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype.onHideSubject;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype.closeOnInteraction;
    /** @type {?} */
    McTooltipComponent.prototype.cdr;
}
/** @type {?} */
export var MC_TOOLTIP_SCROLL_STRATEGY = new InjectionToken('mc-tooltip-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function mcTooltipScrollStrategyFactory(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_TOOLTIP_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcTooltipScrollStrategyFactory
};
/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @param {?} position
 * @return {?}
 */
export function getMcTooltipInvalidPositionError(position) {
    return Error("McTooltip position \"" + position + "\" is invalid.");
}
/** @type {?} */
var VIEWPORT_MARGIN = 8;
var McTooltip = /** @class */ (function () {
    function McTooltip(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        this.overlay = overlay;
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.scrollDispatcher = scrollDispatcher;
        this.hostView = hostView;
        this.scrollStrategy = scrollStrategy;
        this.direction = direction;
        this.isTooltipOpen = false;
        this.isDynamicTooltip = false;
        this.parentDisabled = false;
        this.mcVisibleChange = new EventEmitter();
        this.$unsubscribe = new Subject();
        this._disabled = false;
        this._mcTrigger = 'hover';
        this._mcPlacement = 'top';
        this.manualListeners = new Map();
        this.destroyed = new Subject();
        this.availablePositions = POSITION_MAP;
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
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
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
        function () {
            return this._mcTooltipClass;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._mcTooltipClass = value;
                this.updateCompValue('mcTooltipClass', value);
            }
            else {
                this._mcTooltipClass = '';
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
            var value = coerceBooleanProperty(externalValue);
            if (this._mcVisible !== value) {
                this._mcVisible = value;
                this.updateCompValue('mcVisible', value);
                if (value) {
                    this.show();
                }
                else {
                    this.hide();
                }
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
            .withPositions(__spread(DEFAULT_4_POSITIONS));
        /** @type {?} */
        var scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
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
            .pipe(takeUntil(this.destroyed))
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
        if (this.isDynamicTooltip && value && this.tooltip) {
            this.tooltip[key] = value;
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
            _this.elementRef.nativeElement.removeEventListener(event, listener);
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
        if (this.isTooltipOpen && e.keyCode === ESCAPE) { // tslint:disable-line
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
                this.portal = this.portal || new ComponentPortal(McTooltipComponent, this.hostView);
                this.tooltip = overlayRef.attach(this.portal).instance;
                this.tooltip.afterHidden()
                    .pipe(takeUntil(this.destroyed))
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
                    'mcTooltipClass'
                ];
                properties.forEach((/**
                 * @param {?} property
                 * @return {?}
                 */
                function (property) { return _this.updateCompValue(property, _this[property]); }));
                this.tooltip.mcVisibleChange.pipe(takeUntil(this.$unsubscribe), distinctUntilChanged())
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
        var overlay = this.getOverlayPosition();
        position.withPositions([
            __assign(__assign({}, origin.main), overlay.main),
            __assign(__assign({}, origin.fallback), overlay.fallback)
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
        { type: Directive, args: [{
                    selector: '[mcTooltip], [attribute^="mcTooltip"]',
                    exportAs: 'mcTooltip',
                    host: {
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                },] }
    ];
    /** @nocollapse */
    McTooltip.ctorParameters = function () { return [
        { type: Overlay },
        { type: ElementRef },
        { type: NgZone },
        { type: ScrollDispatcher },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [MC_TOOLTIP_SCROLL_STRATEGY,] }] },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    McTooltip.propDecorators = {
        mcVisibleChange: [{ type: Output }],
        mcTitle: [{ type: Input, args: ['mcTooltip',] }],
        setTitle: [{ type: Input, args: ['mcTitle',] }],
        disabled: [{ type: Input, args: ['mcTooltipDisabled',] }],
        mcMouseEnterDelay: [{ type: Input, args: ['mcMouseEnterDelay',] }],
        mcMouseLeaveDelay: [{ type: Input, args: ['mcMouseLeaveDelay',] }],
        mcTrigger: [{ type: Input, args: ['mcTrigger',] }],
        mcPlacement: [{ type: Input, args: ['mcPlacement',] }],
        mcTooltipClass: [{ type: Input, args: ['mcTooltipClass',] }],
        mcVisible: [{ type: Input, args: ['mcVisible',] }],
        isOpen: [{ type: HostBinding, args: ['class.mc-tooltip-open',] }],
        isParentDisabled: [{ type: HostBinding, args: ['class.disabled',] }]
    };
    return McTooltip;
}());
export { McTooltip };
if (false) {
    /** @type {?} */
    McTooltip.prototype.isTooltipOpen;
    /** @type {?} */
    McTooltip.prototype.isDynamicTooltip;
    /** @type {?} */
    McTooltip.prototype.parentDisabled;
    /** @type {?} */
    McTooltip.prototype.overlayRef;
    /** @type {?} */
    McTooltip.prototype.portal;
    /** @type {?} */
    McTooltip.prototype.availablePositions;
    /** @type {?} */
    McTooltip.prototype.tooltip;
    /** @type {?} */
    McTooltip.prototype.mcVisibleChange;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.$unsubscribe;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype._mcTitle;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype._mcMouseEnterDelay;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype._mcMouseLeaveDelay;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype._mcTrigger;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype._mcPlacement;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype._mcTooltipClass;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype._mcVisible;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.manualListeners;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.scrollDispatcher;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.hostView;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    McTooltip.prototype.direction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBR0gsT0FBTyxFQUVQLGdCQUFnQixFQU9uQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQ0gsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixZQUFZLEVBQ2YsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakU7SUFxR0ksNEJBQW1CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBeEZ6QyxXQUFNLEdBQUcsc0JBQXNCLENBQUM7UUFDaEMsY0FBUyxZQUFpQyxtQkFBbUIsRUFBRTtRQUMvRCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBT0os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Z0JyQyxpQ0FBcUM7Ozs7O0lBZ0JyQyxvQ0FBZ0M7Ozs7O0lBc0JoQywrQkFBNEI7Ozs7O0lBWTVCLG9DQUFnRjs7Ozs7SUFDaEYsOEJBQWlEOzs7OztJQUc3Qyw0QkFBd0I7Ozs7O0lBQ3hCLCtCQUE4Qjs7Ozs7SUFDOUIsMkJBQXNCOzs7OztJQUN0QixxQ0FBMEM7Ozs7O0lBQzFDLDZCQUFrQzs7Ozs7SUFDbEMsbUNBQTBEOzs7OztJQUMxRCw4QkFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSxcbiAgICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheVJlZixcbiAgICBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIFNjcm9sbFN0cmF0ZWd5LFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uLFxuICAgIE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgICBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyxcbiAgICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3Ncbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgZmFkZUFuaW1hdGlvbixcbiAgICBERUZBVUxUXzRfUE9TSVRJT05TLFxuICAgIFBPU0lUSU9OX01BUFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10b29sdGlwLWNvbXBvbmVudCcsXG4gICAgYW5pbWF0aW9uczogW2ZhZGVBbmltYXRpb25dLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b29sdGlwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b29sdGlwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhib2R5OmNsaWNrKSc6ICd0aGlzLmhhbmRsZUJvZHlJbnRlcmFjdGlvbigpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUb29sdGlwQ29tcG9uZW50IHtcbiAgICBwcmVmaXggPSAnbWMtdG9vbHRpcF9wbGFjZW1lbnQnO1xuICAgIHBvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gWy4uLkRFRkFVTFRfNF9QT1NJVElPTlNdO1xuICAgIGNsYXNzTWFwID0ge307XG4gICAgaXNUaXRsZVN0cmluZzogYm9vbGVhbjtcbiAgICBzaG93VGlkOiBhbnk7XG4gICAgaGlkZVRpZDogYW55O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogYW55O1xuICAgICR2aXNpYmxlOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gICAgQE91dHB1dCgpIG1jVmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgbWNNb3VzZUVudGVyRGVsYXkgPSA0MDA7XG5cbiAgICBASW5wdXQoKSBtY01vdXNlTGVhdmVEZWxheSA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1RpdGxlKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVGl0bGUodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgICAgIHRoaXMuaXNUaXRsZVN0cmluZyA9ICEodmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZik7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUaXRsZVN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5fbWNUaXRsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1RyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgbWNUcmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUcmlnZ2VyOiBzdHJpbmcgPSAnaG92ZXInO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBtY1BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fbWNQbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucy51bnNoaWZ0KFBPU0lUSU9OX01BUFsgdGhpcy5tY1BsYWNlbWVudCBdKTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1Rvb2x0aXBDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUb29sdGlwQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0IG1jVG9vbHRpcENsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWNUb29sdGlwQ2xhc3MgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Rvb2x0aXBDbGFzczogc3RyaW5nO1xuICAgIHByaXZhdGUgX21jUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVmlzaWJsZS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgbWNWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZpc2libGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmICh2aXNpYmxlICYmIHRoaXMuX21jVmlzaWJsZS52YWx1ZSAhPT0gdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHRvb2x0aXAgaGFzIGJlZW4gaGlkZGVuIGZyb20gdGhlIHZpZXcgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uSGlkZVN1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBjbG9zZU9uSW50ZXJhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zID0gUE9TSVRJT05fTUFQO1xuICAgICAgICB0aGlzLiR2aXNpYmxlID0gdGhpcy5fbWNWaXNpYmxlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmhpZGVUaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVUaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVtcHR5KCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciAhPT0gJ21hbnVhbCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlT25JbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd1RpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgICAgICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9LCB0aGlzLm1jTW91c2VFbnRlckRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWRlVGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMub25IaWRlU3ViamVjdC5uZXh0KCk7XG5cbiAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAvLyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byBPblB1c2ggaXQgd2lsbCBiZSBjaGVja2VkIGFueXdheXNcbiAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIHRoaXMubWNNb3VzZUxlYXZlRGVsYXkpO1xuICAgIH1cblxuICAgIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsYXNzTWFwID0ge1xuICAgICAgICAgICAgW2Ake3RoaXMucHJlZml4fS0ke3RoaXMubWNQbGFjZW1lbnR9YF06IHRydWUsXG4gICAgICAgICAgICBbdGhpcy5tY1Rvb2x0aXBDbGFzc106IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpc0NvbnRlbnRFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUaXRsZVN0cmluZyA/ICh0aGlzLm1jVGl0bGUgPT09ICcnIHx8ICF0aGlzLm1jVGl0bGUpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHdoZW4gdGhlIHRvb2x0aXAgaGFzIGJlZW4gaGlkZGVuIGZyb20gdmlldy4gKi9cbiAgICBhZnRlckhpZGRlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25IaWRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGhhbmRsZUJvZHlJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy10b29sdGlwLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jVG9vbHRpcFNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7c2Nyb2xsVGhyb3R0bGU6IDIwfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNUb29sdGlwU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG4vKiogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCB0b29sdGlwIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRXJyb3IoYE1jVG9vbHRpcCBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIgaXMgaW52YWxpZC5gKTtcbn1cblxuY29uc3QgVklFV1BPUlRfTUFSR0lOOiBudW1iZXIgPSA4O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1Rvb2x0aXBdLCBbYXR0cmlidXRlXj1cIm1jVG9vbHRpcFwiXScsXG4gICAgZXhwb3J0QXM6ICdtY1Rvb2x0aXAnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUb29sdGlwIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGlzVG9vbHRpcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0R5bmFtaWNUb29sdGlwID0gZmFsc2U7XG4gICAgcGFyZW50RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNY1Rvb2x0aXBDb21wb25lbnQ+O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogYW55O1xuICAgIHRvb2x0aXA6IE1jVG9vbHRpcENvbXBvbmVudCB8IG51bGw7XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIHByaXZhdGUgJHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIEBJbnB1dCgnbWNUb29sdGlwJylcbiAgICBnZXQgbWNUaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUaXRsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNUaXRsZSh0aXRsZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21jVGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVGl0bGUnLCB0aXRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUaXRsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCdtY1RpdGxlJylcbiAgICBzZXQgc2V0VGl0bGUodGl0bGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1jVGl0bGUgPSB0aXRsZTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jVG9vbHRpcERpc2FibGVkJylcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUb29sdGlwRGlzYWJsZWQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnbWNNb3VzZUVudGVyRGVsYXknKVxuICAgIGdldCBtY01vdXNlRW50ZXJEZWxheSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNNb3VzZUVudGVyRGVsYXk7XG4gICAgfVxuXG4gICAgc2V0IG1jTW91c2VFbnRlckRlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWNNb3VzZUVudGVyRGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jTW91c2VFbnRlckRlbGF5JywgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jTW91c2VFbnRlckRlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jTW91c2VMZWF2ZURlbGF5JylcbiAgICBnZXQgbWNNb3VzZUxlYXZlRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5O1xuICAgIH1cblxuICAgIHNldCBtY01vdXNlTGVhdmVEZWxheSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY01vdXNlTGVhdmVEZWxheScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY01vdXNlTGVhdmVEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY1RyaWdnZXInKVxuICAgIGdldCBtY1RyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgbWNUcmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1RyaWdnZXInLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSAnaG92ZXInO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUcmlnZ2VyOiBzdHJpbmcgPSAnaG92ZXInO1xuXG4gICAgQElucHV0KCdtY1BsYWNlbWVudCcpXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG5cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQbGFjZW1lbnQnLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KCdtY1Rvb2x0aXBDbGFzcycpXG4gICAgZ2V0IG1jVG9vbHRpcENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Rvb2x0aXBDbGFzcztcbiAgICB9XG5cbiAgICBzZXQgbWNUb29sdGlwQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVG9vbHRpcENsYXNzID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUb29sdGlwQ2xhc3MnLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Rvb2x0aXBDbGFzcyA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUb29sdGlwQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgnbWNWaXNpYmxlJylcbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUoZXh0ZXJuYWxWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShleHRlcm5hbFZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fbWNWaXNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNWaXNpYmxlJywgdmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IGJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1jLXRvb2x0aXAtb3BlbicpXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUb29sdGlwT3BlbjtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgICBnZXQgaXNQYXJlbnREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYW51YWxMaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdD4oKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgcHJpdmF0ZSBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zID0gUE9TSVRJT05fTUFQO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICAgIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHsgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjsgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBjb25uZWN0ZWQgcG9zaXRpb24gc3RyYXRlZ3kgdGhhdCBsaXN0ZW5zIGZvciBzY3JvbGwgZXZlbnRzIHRvIHJlcG9zaXRpb24uXG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5tYy10b29sdGlwJylcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbihWSUVXUE9SVF9NQVJHSU4pXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbLi4uREVGQVVMVF80X1BPU0lUSU9OU10pO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVBbmNlc3RvcnMgPSB0aGlzLnNjcm9sbERpc3BhdGNoZXIuZ2V0QW5jZXN0b3JTY3JvbGxDb250YWluZXJzKHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAgICAgc3RyYXRlZ3kud2l0aFNjcm9sbGFibGVDb250YWluZXJzKHNjcm9sbGFibGVBbmNlc3RvcnMpO1xuXG4gICAgICAgIHN0cmF0ZWd5LnBvc2l0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblBvc2l0aW9uQ2hhbmdlKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2Uuc2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzLmlzT3ZlcmxheUNsaXBwZWQgJiYgdGhpcy50b29sdGlwLm1jVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcG9zaXRpb24gY2hhbmdlcyBvY2N1ciBhbmQgdGhlIG92ZXJsYXkgaXMgY2xpcHBlZCBieVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYSBwYXJlbnQgc2Nyb2xsYWJsZSB0aGVuIGNsb3NlIHRoZSB0b29sdGlwLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbixcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHN0cmF0ZWd5LFxuICAgICAgICAgICAgcGFuZWxDbGFzczogJ21jLXRvb2x0aXAtcGFuZWwnLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvb2x0aXAgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50OiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRQbGFjZW1lbnQgPSB0aGlzLm1jUGxhY2VtZW50O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zKS5zb21lKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5YICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWSAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vdmVybGF5WCAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vdmVybGF5WVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZFBsYWNlbWVudCA9IGtleTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BsYWNlbWVudCcsIHVwZGF0ZWRQbGFjZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5zZXRDbGFzc01hcCgpO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVQb3NpdGlvbmluZ1VwZGF0ZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZVBvc2l0aW9uaW5nVXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tY1BsYWNlbWVudCA9PT0gJ3JpZ2h0JyB8fCB0aGlzLm1jUGxhY2VtZW50ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9XG4gICAgICAgICAgICAgICAgKHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jbGllbnRIZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvc3RWaWV3LmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpIC8gMjsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICAgICAgY29uc3QgY3VycmVudENvbnRhaW5lciA9IHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS50b3AgfHwgJzBweCc7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUudG9wID1cbiAgICAgICAgICAgICAgICBgJHtwYXJzZUludChjdXJyZW50Q29udGFpbmVyLnNwbGl0KCdweCcpWzBdLCAxMCkgKyBwb3MgLSAxfXB4YDtcbiAgICAgICAgICAgIC8vIFRPRE86INC+0LHQvdC+0LLQu9GP0YLRjCDQv9C+0LvQvtC20LXQvdC40LUg0YHRgtGA0LXQu9C60LhcXNGD0LrQsNC30LDRgtC10LvRj1xcXCLQtNGP0YLQu9CwXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICB1cGRhdGVDb21wVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEeW5hbWljVG9vbHRpcCAmJiB2YWx1ZSAmJiB0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudFJlZkxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXBPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hlbmQoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VlbnRlcicsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlbGVhdmUnLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyID09PSAnZm9jdXMnKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ2ZvY3VzJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnYmx1cicsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50b29sdGlwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvcnRhbCA9IHRoaXMucG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoTWNUb29sdGlwQ29tcG9uZW50LCB0aGlzLmhvc3RWaWV3KTtcblxuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcCA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKS5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNEeW5hbWljVG9vbHRpcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgJ21jVGl0bGUnLFxuICAgICAgICAgICAgICAgICAgICAnbWNQbGFjZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbWNUcmlnZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgJ21jVG9vbHRpcERpc2FibGVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ21jTW91c2VFbnRlckRlbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jTW91c2VMZWF2ZURlbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jVG9vbHRpcENsYXNzJ1xuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4gdGhpcy51cGRhdGVDb21wVmFsdWUocHJvcGVydHksIHRoaXNbIHByb3BlcnR5IF0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAubWNWaXNpYmxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuJHVuc3Vic2NyaWJlKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGUgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNUb29sdGlwT3BlbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgdG9vbHRpcC4gKi9cbiAgICB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHRoaXMuZ2V0T3JpZ2luKCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpO1xuXG4gICAgICAgIHBvc2l0aW9uLndpdGhQb3NpdGlvbnMoW1xuICAgICAgICAgICAgeyAuLi5vcmlnaW4ubWFpbiwgLi4ub3ZlcmxheS5tYWluIH0sXG4gICAgICAgICAgICB7IC4uLm9yaWdpbi5mYWxsYmFjaywgLi4ub3ZlcmxheS5mYWxsYmFjayB9XG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9yaWdpbiBwb3NpdGlvbiBhbmQgYSBmYWxsYmFjayBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgdXNlcidzIHBvc2l0aW9uIHByZWZlcmVuY2UuXG4gICAgICogVGhlIGZhbGxiYWNrIHBvc2l0aW9uIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBvcmlnaW4gKGUuZy4gYCdiZWxvdycgLT4gJ2Fib3ZlJ2ApLlxuICAgICAqL1xuICAgIGdldE9yaWdpbigpOiB7bWFpbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uOyBmYWxsYmFjazogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9ufSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgY29uc3QgaXNMdHIgPSAhdGhpcy5kaXJlY3Rpb24gfHwgdGhpcy5kaXJlY3Rpb24udmFsdWUgPT09ICdsdHInO1xuICAgICAgICBsZXQgb3JpZ2luUG9zaXRpb246IE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbjtcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09ICd0b3AnIHx8IHBvc2l0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgb3JpZ2luUG9zaXRpb24gPSB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiBwb3NpdGlvbiA9PT0gJ3RvcCcgPyAndG9wJyA6ICdib3R0b20nIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ3RvcCcgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG9yaWdpblBvc2l0aW9uID0geyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdib3R0b20nIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAhaXNMdHIpKSB7XG4gICAgICAgICAgICBvcmlnaW5Qb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1Rvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmludmVydFBvc2l0aW9uKG9yaWdpblBvc2l0aW9uLm9yaWdpblgsIG9yaWdpblBvc2l0aW9uLm9yaWdpblkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWluOiBvcmlnaW5Qb3NpdGlvbixcbiAgICAgICAgICAgIGZhbGxiYWNrOiB7IG9yaWdpblg6IHgsIG9yaWdpblk6IHkgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSBvdmVybGF5IHBvc2l0aW9uIGFuZCBhIGZhbGxiYWNrIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcHJlZmVyZW5jZSAqL1xuICAgIGdldE92ZXJsYXlQb3NpdGlvbigpOiB7IG1haW46IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb247IGZhbGxiYWNrOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uIH0ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMubWNQbGFjZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlzTHRyID0gIXRoaXMuZGlyZWN0aW9uIHx8IHRoaXMuZGlyZWN0aW9uLnZhbHVlID09PSAnbHRyJztcbiAgICAgICAgbGV0IG92ZXJsYXlQb3NpdGlvbjogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbjtcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICdib3R0b20nIH07XG4gICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICd0b3AnIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ3RvcCcgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAnYm90dG9tJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3ZlcmxheVBvc2l0aW9uID0geyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1Rvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmludmVydFBvc2l0aW9uKG92ZXJsYXlQb3NpdGlvbi5vdmVybGF5WCwgb3ZlcmxheVBvc2l0aW9uLm92ZXJsYXlZKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWFpbjogb3ZlcmxheVBvc2l0aW9uLFxuICAgICAgICAgICAgZmFsbGJhY2s6IHsgb3ZlcmxheVg6IHgsIG92ZXJsYXlZOiB5IH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiogSW52ZXJ0cyBhbiBvdmVybGF5IHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgaW52ZXJ0UG9zaXRpb24oeDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsIHk6IFZlcnRpY2FsQ29ubmVjdGlvblBvcykge1xuICAgICAgICBsZXQgbmV3WDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MgPSB4O1xuICAgICAgICBsZXQgbmV3WTogVmVydGljYWxDb25uZWN0aW9uUG9zID0geTtcbiAgICAgICAgaWYgKHRoaXMubWNQbGFjZW1lbnQgPT09ICd0b3AnIHx8IHRoaXMubWNQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBpZiAoeSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICBuZXdZID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHkgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgbmV3WSA9ICd0b3AnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHggPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgbmV3WCA9ICdzdGFydCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHggPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICBuZXdYID0gJ2VuZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB4OiBuZXdYLCB5OiBuZXdZIH07XG4gICAgfVxufVxuIl19
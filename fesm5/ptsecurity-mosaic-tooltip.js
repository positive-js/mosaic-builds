import { Overlay, ScrollDispatcher, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { EventEmitter, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Output, Input, InjectionToken, Directive, ElementRef, NgZone, ViewContainerRef, Inject, Optional, HostBinding, NgModule } from '@angular/core';
import { __spread, __assign } from 'tslib';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentPortal } from '@angular/cdk/portal';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { DEFAULT_4_POSITIONS, POSITION_MAP, fadeAnimation } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: tooltip.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            this._mcTitle = value;
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
    Object.defineProperty(McTooltipComponent.prototype, "isTemplateRef", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mcTitle instanceof TemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTooltipComponent.prototype, "isNonEmptyString", {
        get: /**
         * @return {?}
         */
        function () {
            return typeof this.mcTitle === 'string' && this._mcTitle !== '';
        },
        enumerable: true,
        configurable: true
    });
    McTooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-tooltip-component',
                    animations: [fadeAnimation],
                    template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@fadeAnimation]=\"''+($visible | async)\">\n    <div class=\"mc-tooltip-content\">\n        <div class=\"mc-tooltip-arrow\"></div>\n        <div class=\"mc-tooltip-inner\">\n            <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"mcTitle\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString\">\n                <div [innerHTML]=\"mcTitle\"></div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '(body:click)': 'this.handleBodyInteraction()'
                    },
                    styles: ["@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px);background-size:29px 29px;-webkit-animation:1s linear infinite mc-progress;animation:1s linear infinite mc-progress}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;margin:0;padding:0;z-index:1060;max-width:240px;list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:9px}.mc-tooltip_placement-right{padding-left:9px}.mc-tooltip_placement-bottom{padding-top:9px}.mc-tooltip_placement-left{padding-right:9px}.mc-tooltip-inner{padding:8px 16px;text-align:left;text-decoration:none;border-radius:3px;min-height:32px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:12px;height:12px;transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:4px;left:50%;margin-left:-5px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-left .mc-tooltip-arrow{right:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:4px;left:50%;margin-left:-5px}"]
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
var MC_TOOLTIP_SCROLL_STRATEGY = new InjectionToken('mc-tooltip-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function mcTooltipScrollStrategyFactory(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); });
}
/**
 * \@docs-private
 * @type {?}
 */
var MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_TOOLTIP_SCROLL_STRATEGY,
    deps: [Overlay],
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
            this.updatePosition();
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
            this.tooltip.markForCheck();
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
        if (this.tooltip) {
            position.apply();
            window.dispatchEvent(new Event('resize'));
        }
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

/**
 * @fileoverview added by tsickle
 * Generated from: tooltip.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McToolTipModule = /** @class */ (function () {
    function McToolTipModule() {
    }
    McToolTipModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [McTooltipComponent, McTooltip],
                    exports: [McTooltipComponent, McTooltip],
                    imports: [CommonModule, OverlayModule],
                    providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McTooltipComponent]
                },] }
    ];
    return McToolTipModule;
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
 * Generated from: ptsecurity-mosaic-tooltip.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_TOOLTIP_SCROLL_STRATEGY, MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, McToolTipModule, McTooltip, McTooltipComponent, getMcTooltipInvalidPositionError, mcTooltipScrollStrategyFactory };
//# sourceMappingURL=ptsecurity-mosaic-tooltip.js.map

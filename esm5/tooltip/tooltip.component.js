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
        { type: Component, args: [{
                    selector: 'mc-tooltip-component',
                    animations: [fadeAnimation],
                    template: "\n    <div class=\"mc-tooltip\"\n         [ngClass]=\"classMap\"\n         [@fadeAnimation]=\"''+($visible | async)\">\n        <div class=\"mc-tooltip-content\">\n            <div class=\"mc-tooltip-arrow\"></div>\n            <div class=\"mc-tooltip-inner\">\n                <ng-container>{{ mcTitle }}</ng-container>\n            </div>\n        </div>\n    </div>\n\n",
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
                    'mсTooltipClass'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBR0gsT0FBTyxFQUVQLGdCQUFnQixFQU9uQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQ0gsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixZQUFZLEVBQ2YsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakU7SUEyRkksNEJBQW1CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBOUV6QyxXQUFNLEdBQUcsc0JBQXNCLENBQUM7UUFDaEMsY0FBUyxZQUFpQyxtQkFBbUIsRUFBRTtRQUMvRCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBT0os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J0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSxcbiAgICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheVJlZixcbiAgICBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIFNjcm9sbFN0cmF0ZWd5LFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uLFxuICAgIE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgICBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyxcbiAgICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3Ncbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgZmFkZUFuaW1hdGlvbixcbiAgICBERUZBVUxUXzRfUE9TSVRJT05TLFxuICAgIFBPU0lUSU9OX01BUFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10b29sdGlwLWNvbXBvbmVudCcsXG4gICAgYW5pbWF0aW9uczogW2ZhZGVBbmltYXRpb25dLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b29sdGlwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b29sdGlwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhib2R5OmNsaWNrKSc6ICd0aGlzLmhhbmRsZUJvZHlJbnRlcmFjdGlvbigpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUb29sdGlwQ29tcG9uZW50IHtcbiAgICBwcmVmaXggPSAnbWMtdG9vbHRpcF9wbGFjZW1lbnQnO1xuICAgIHBvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gWy4uLkRFRkFVTFRfNF9QT1NJVElPTlNdO1xuICAgIGNsYXNzTWFwID0ge307XG4gICAgaXNUaXRsZVN0cmluZzogYm9vbGVhbjtcbiAgICBzaG93VGlkOiBhbnk7XG4gICAgaGlkZVRpZDogYW55O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogYW55O1xuICAgICR2aXNpYmxlOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gICAgQE91dHB1dCgpIG1jVmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgbWNNb3VzZUVudGVyRGVsYXkgPSA0MDA7XG5cbiAgICBASW5wdXQoKSBtY01vdXNlTGVhdmVEZWxheSA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1RpdGxlKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVGl0bGUodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgICAgIHRoaXMuaXNUaXRsZVN0cmluZyA9ICEodmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZik7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUaXRsZVN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5fbWNUaXRsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1RyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgbWNUcmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUcmlnZ2VyOiBzdHJpbmcgPSAnaG92ZXInO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBtY1BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fbWNQbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucy51bnNoaWZ0KFBPU0lUSU9OX01BUFsgdGhpcy5tY1BsYWNlbWVudCBdKTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGUudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2aXNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAodmlzaWJsZSAmJiB0aGlzLl9tY1Zpc2libGUudmFsdWUgIT09IHZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSB0b29sdGlwIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHRoZSB2aWV3ICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkhpZGVTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgY2xvc2VPbkludGVyYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICAgICAgdGhpcy4kdmlzaWJsZSA9IHRoaXMuX21jVmlzaWJsZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5oaWRlVGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVGlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFbXB0eSgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNob3dUaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dCh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgICAgICAgICAvLyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byBPblB1c2ggaXQgd2lsbCBiZSBjaGVja2VkIGFueXdheXNcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSwgdGhpcy5tY01vdXNlRW50ZXJEZWxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zaG93VGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGlkZVRpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZVN1YmplY3QubmV4dCgpO1xuXG4gICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LCB0aGlzLm1jTW91c2VMZWF2ZURlbGF5KTtcbiAgICB9XG5cbiAgICBzZXRDbGFzc01hcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGFzc01hcCA9IGAke3RoaXMucHJlZml4fS0ke3RoaXMubWNQbGFjZW1lbnR9YDtcbiAgICB9XG5cbiAgICBpc0NvbnRlbnRFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUaXRsZVN0cmluZyA/ICh0aGlzLm1jVGl0bGUgPT09ICcnIHx8ICF0aGlzLm1jVGl0bGUpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHdoZW4gdGhlIHRvb2x0aXAgaGFzIGJlZW4gaGlkZGVuIGZyb20gdmlldy4gKi9cbiAgICBhZnRlckhpZGRlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25IaWRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGhhbmRsZUJvZHlJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy10b29sdGlwLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jVG9vbHRpcFNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7c2Nyb2xsVGhyb3R0bGU6IDIwfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNUb29sdGlwU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG4vKiogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCB0b29sdGlwIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRXJyb3IoYE1jVG9vbHRpcCBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIgaXMgaW52YWxpZC5gKTtcbn1cblxuY29uc3QgVklFV1BPUlRfTUFSR0lOOiBudW1iZXIgPSA4O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1Rvb2x0aXBdLCBbYXR0cmlidXRlXj1cIm1jVG9vbHRpcFwiXScsXG4gICAgZXhwb3J0QXM6ICdtY1Rvb2x0aXAnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUb29sdGlwIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGlzVG9vbHRpcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0R5bmFtaWNUb29sdGlwID0gZmFsc2U7XG4gICAgcGFyZW50RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNY1Rvb2x0aXBDb21wb25lbnQ+O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogYW55O1xuICAgIHRvb2x0aXA6IE1jVG9vbHRpcENvbXBvbmVudCB8IG51bGw7XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIHByaXZhdGUgJHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIEBJbnB1dCgnbWNUb29sdGlwJylcbiAgICBnZXQgbWNUaXRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUaXRsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNUaXRsZSh0aXRsZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21jVGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVGl0bGUnLCB0aXRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUaXRsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCdtY1RpdGxlJylcbiAgICBzZXQgc2V0VGl0bGUodGl0bGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1jVGl0bGUgPSB0aXRsZTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jVG9vbHRpcERpc2FibGVkJylcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUb29sdGlwRGlzYWJsZWQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnbWNNb3VzZUVudGVyRGVsYXknKVxuICAgIGdldCBtY01vdXNlRW50ZXJEZWxheSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNNb3VzZUVudGVyRGVsYXk7XG4gICAgfVxuXG4gICAgc2V0IG1jTW91c2VFbnRlckRlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWNNb3VzZUVudGVyRGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jTW91c2VFbnRlckRlbGF5JywgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jTW91c2VFbnRlckRlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jTW91c2VMZWF2ZURlbGF5JylcbiAgICBnZXQgbWNNb3VzZUxlYXZlRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5O1xuICAgIH1cblxuICAgIHNldCBtY01vdXNlTGVhdmVEZWxheSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY01vdXNlTGVhdmVEZWxheScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY01vdXNlTGVhdmVEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY1RyaWdnZXInKVxuICAgIGdldCBtY1RyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgbWNUcmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1RyaWdnZXInLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSAnaG92ZXInO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUcmlnZ2VyOiBzdHJpbmcgPSAnaG92ZXInO1xuXG4gICAgQElucHV0KCdtY1BsYWNlbWVudCcpXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG5cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQbGFjZW1lbnQnLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KCdtY1Rvb2x0aXBDbGFzcycpXG4gICAgZ2V0IG1jVG9vbHRpcENsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUb29sdGlwQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0IG3RgVRvb2x0aXBDbGFzcyh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgICAgIHRoaXMuX21jVG9vbHRpcENsYXNzID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLnNldENsYXNzTWFwKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Rvb2x0aXBDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4gICAgQElucHV0KCdtY1Zpc2libGUnKVxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZShleHRlcm5hbFZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGV4dGVybmFsVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tY1Zpc2libGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Zpc2libGUnLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MubWMtdG9vbHRpcC1vcGVuJylcbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1Rvb2x0aXBPcGVuO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICAgIGdldCBpc1BhcmVudERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnREaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hbnVhbExpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0PigpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBwcml2YXRlIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb25maWcgYW5kIHBvc2l0aW9uIHN0cmF0ZWd5ICovXG4gICAgY3JlYXRlT3ZlcmxheSgpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikgeyByZXR1cm4gdGhpcy5vdmVybGF5UmVmOyB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGNvbm5lY3RlZCBwb3NpdGlvbiBzdHJhdGVneSB0aGF0IGxpc3RlbnMgZm9yIHNjcm9sbCBldmVudHMgdG8gcmVwb3NpdGlvbi5cbiAgICAgICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5lbGVtZW50UmVmKVxuICAgICAgICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1jLXRvb2x0aXAnKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKFZJRVdQT1JUX01BUkdJTilcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFsuLi5ERUZBVUxUXzRfUE9TSVRJT05TXSk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZUFuY2VzdG9ycyA9IHRoaXMuc2Nyb2xsRGlzcGF0Y2hlci5nZXRBbmNlc3RvclNjcm9sbENvbnRhaW5lcnModGhpcy5lbGVtZW50UmVmKTtcblxuICAgICAgICBzdHJhdGVneS53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnMoc2Nyb2xsYWJsZUFuY2VzdG9ycyk7XG5cbiAgICAgICAgc3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUG9zaXRpb25DaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5zY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMuaXNPdmVybGF5Q2xpcHBlZCAmJiB0aGlzLnRvb2x0aXAubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZnRlciBwb3NpdGlvbiBjaGFuZ2VzIG9jY3VyIGFuZCB0aGUgb3ZlcmxheSBpcyBjbGlwcGVkIGJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhIHBhcmVudCBzY3JvbGxhYmxlIHRoZW4gY2xvc2UgdGhlIHRvb2x0aXAuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogc3RyYXRlZ3ksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtdG9vbHRpcC1wYW5lbCcsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9vbHRpcCA9IG51bGw7XG4gICAgfVxuXG4gICAgb25Qb3NpdGlvbkNoYW5nZSgkZXZlbnQ6IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgICAgICBsZXQgdXBkYXRlZFBsYWNlbWVudCA9IHRoaXMubWNQbGFjZW1lbnQ7XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5hdmFpbGFibGVQb3NpdGlvbnMpLnNvbWUoKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5YID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5ZICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlYID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlYICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlZXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkUGxhY2VtZW50ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdXBkYXRlZFBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLnNldENsYXNzTWFwKCk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uaW5nVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlUG9zaXRpb25pbmdVcGRhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1jUGxhY2VtZW50ID09PSAncmlnaHQnIHx8IHRoaXMubWNQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgY29uc3QgcG9zID1cbiAgICAgICAgICAgICAgICAodGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmNsaWVudEhlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdFZpZXcuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCkgLyAyOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q29udGFpbmVyID0gdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLnRvcCB8fCAnMHB4JztcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS50b3AgPVxuICAgICAgICAgICAgICAgIGAke3BhcnNlSW50KGN1cnJlbnRDb250YWluZXIuc3BsaXQoJ3B4JylbMF0sIDEwKSArIHBvcyAtIDF9cHhgO1xuICAgICAgICAgICAgLy8gVE9ETzog0L7QsdC90L7QstC70Y/RgtGMINC/0L7Qu9C+0LbQtdC90LjQtSDRgdGC0YDQtdC70LrQuFxc0YPQutCw0LfQsNGC0LXQu9GPXFxcItC00Y/RgtC70LBcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHVwZGF0ZUNvbXBWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0R5bmFtaWNUb29sdGlwICYmIHZhbHVlICYmIHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzVG9vbHRpcE9wZW4gJiYgZS5rZXlDb2RlID09PSBFU0NBUEUpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaGVuZCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWVudGVyJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VsZWF2ZScsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnZm9jdXMnLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdibHVyJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9ydGFsID0gdGhpcy5wb3J0YWwgfHwgbmV3IENvbXBvbmVudFBvcnRhbChNY1Rvb2x0aXBDb21wb25lbnQsIHRoaXMuaG9zdFZpZXcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwID0gb3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcC5hZnRlckhpZGRlbigpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0R5bmFtaWNUb29sdGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gW1xuICAgICAgICAgICAgICAgICAgICAnbWNUaXRsZScsXG4gICAgICAgICAgICAgICAgICAgICdtY1BsYWNlbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICdtY1RyaWdnZXInLFxuICAgICAgICAgICAgICAgICAgICAnbWNUb29sdGlwRGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgICAgICAnbWNNb3VzZUVudGVyRGVsYXknLFxuICAgICAgICAgICAgICAgICAgICAnbWNNb3VzZUxlYXZlRGVsYXknLFxuICAgICAgICAgICAgICAgICAgICAnbdGBVG9vbHRpcENsYXNzJ1xuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4gdGhpcy51cGRhdGVDb21wVmFsdWUocHJvcGVydHksIHRoaXNbIHByb3BlcnR5IF0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAubWNWaXNpYmxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuJHVuc3Vic2NyaWJlKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGUgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNUb29sdGlwT3BlbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgdG9vbHRpcC4gKi9cbiAgICB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHRoaXMuZ2V0T3JpZ2luKCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpO1xuXG4gICAgICAgIHBvc2l0aW9uLndpdGhQb3NpdGlvbnMoW1xuICAgICAgICAgICAgeyAuLi5vcmlnaW4ubWFpbiwgLi4ub3ZlcmxheS5tYWluIH0sXG4gICAgICAgICAgICB7IC4uLm9yaWdpbi5mYWxsYmFjaywgLi4ub3ZlcmxheS5mYWxsYmFjayB9XG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9yaWdpbiBwb3NpdGlvbiBhbmQgYSBmYWxsYmFjayBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgdXNlcidzIHBvc2l0aW9uIHByZWZlcmVuY2UuXG4gICAgICogVGhlIGZhbGxiYWNrIHBvc2l0aW9uIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBvcmlnaW4gKGUuZy4gYCdiZWxvdycgLT4gJ2Fib3ZlJ2ApLlxuICAgICAqL1xuICAgIGdldE9yaWdpbigpOiB7bWFpbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uOyBmYWxsYmFjazogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9ufSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgY29uc3QgaXNMdHIgPSAhdGhpcy5kaXJlY3Rpb24gfHwgdGhpcy5kaXJlY3Rpb24udmFsdWUgPT09ICdsdHInO1xuICAgICAgICBsZXQgb3JpZ2luUG9zaXRpb246IE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbjtcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09ICd0b3AnIHx8IHBvc2l0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgb3JpZ2luUG9zaXRpb24gPSB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiBwb3NpdGlvbiA9PT0gJ3RvcCcgPyAndG9wJyA6ICdib3R0b20nIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ3RvcCcgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG9yaWdpblBvc2l0aW9uID0geyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdib3R0b20nIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAhaXNMdHIpKSB7XG4gICAgICAgICAgICBvcmlnaW5Qb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1Rvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmludmVydFBvc2l0aW9uKG9yaWdpblBvc2l0aW9uLm9yaWdpblgsIG9yaWdpblBvc2l0aW9uLm9yaWdpblkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWluOiBvcmlnaW5Qb3NpdGlvbixcbiAgICAgICAgICAgIGZhbGxiYWNrOiB7IG9yaWdpblg6IHgsIG9yaWdpblk6IHkgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSBvdmVybGF5IHBvc2l0aW9uIGFuZCBhIGZhbGxiYWNrIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcHJlZmVyZW5jZSAqL1xuICAgIGdldE92ZXJsYXlQb3NpdGlvbigpOiB7IG1haW46IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb247IGZhbGxiYWNrOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uIH0ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMubWNQbGFjZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlzTHRyID0gIXRoaXMuZGlyZWN0aW9uIHx8IHRoaXMuZGlyZWN0aW9uLnZhbHVlID09PSAnbHRyJztcbiAgICAgICAgbGV0IG92ZXJsYXlQb3NpdGlvbjogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbjtcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICdib3R0b20nIH07XG4gICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICd0b3AnIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ3RvcCcgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAnYm90dG9tJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3ZlcmxheVBvc2l0aW9uID0geyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1Rvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmludmVydFBvc2l0aW9uKG92ZXJsYXlQb3NpdGlvbi5vdmVybGF5WCwgb3ZlcmxheVBvc2l0aW9uLm92ZXJsYXlZKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWFpbjogb3ZlcmxheVBvc2l0aW9uLFxuICAgICAgICAgICAgZmFsbGJhY2s6IHsgb3ZlcmxheVg6IHgsIG92ZXJsYXlZOiB5IH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiogSW52ZXJ0cyBhbiBvdmVybGF5IHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgaW52ZXJ0UG9zaXRpb24oeDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsIHk6IFZlcnRpY2FsQ29ubmVjdGlvblBvcykge1xuICAgICAgICBsZXQgbmV3WDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MgPSB4O1xuICAgICAgICBsZXQgbmV3WTogVmVydGljYWxDb25uZWN0aW9uUG9zID0geTtcbiAgICAgICAgaWYgKHRoaXMubWNQbGFjZW1lbnQgPT09ICd0b3AnIHx8IHRoaXMubWNQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBpZiAoeSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICBuZXdZID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHkgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgbmV3WSA9ICd0b3AnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHggPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgbmV3WCA9ICdzdGFydCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHggPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICBuZXdYID0gJ2VuZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB4OiBuZXdYLCB5OiBuZXdZIH07XG4gICAgfVxufVxuIl19
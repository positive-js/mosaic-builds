/**
 * @fileoverview added by tsickle
 * Generated from: popover.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { DEFAULT_4_POSITIONS_TO_CSS_MAP, EXTENDED_OVERLAY_POSITIONS, POSITION_MAP, POSITION_PRIORITY_STRATEGY, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { mcPopoverAnimations } from './popover-animations';
/** @enum {string} */
var PopoverTriggers = {
    Click: "click",
    Focus: "focus",
    Hover: "hover",
};
/** @enum {string} */
var PopoverVisibility = {
    Initial: "initial",
    Visible: "visible",
    Hidden: "hidden",
};
export { PopoverVisibility };
var McPopoverComponent = /** @class */ (function () {
    function McPopoverComponent(changeDetectorRef, componentElementRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.componentElementRef = componentElementRef;
        this.positions = __spread(EXTENDED_OVERLAY_POSITIONS);
        this.popoverVisibility = PopoverVisibility.Initial;
        this.closeOnInteraction = false;
        this.mcVisibleChange = new EventEmitter();
        this._mcTrigger = PopoverTriggers.Hover;
        this._mcPlacement = 'top';
        this._mcVisible = new BehaviorSubject(false);
        this._classList = [];
        /**
         * Subject for notifying that the popover has been hidden from the view
         */
        this.onHideSubject = new Subject();
        this.availablePositions = POSITION_MAP;
    }
    Object.defineProperty(McPopoverComponent.prototype, "mcTrigger", {
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
    Object.defineProperty(McPopoverComponent.prototype, "mcPlacement", {
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
    Object.defineProperty(McPopoverComponent.prototype, "mcPopoverSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this.popoverSize;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this.popoverSize) {
                this.popoverSize = value;
            }
            else if (!value) {
                this.popoverSize = 'normal';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopoverComponent.prototype, "mcVisible", {
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
            if (this._mcVisible.value !== visible) {
                this._mcVisible.next(visible);
                this.mcVisibleChange.emit(visible);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopoverComponent.prototype, "classList", {
        get: /**
         * @return {?}
         */
        function () {
            return this._classList.join(' ');
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var list = [];
            if (Array.isArray(value)) {
                list = value;
            }
            else {
                list.push(value);
            }
            this._classList = list;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopoverComponent.prototype, "getCssClassesList", {
        get: /**
         * @return {?}
         */
        function () {
            return this.classList + " mc-popover-" + this.mcPopoverSize + " mc-popover_placement-" + this.getPlacementClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopoverComponent.prototype, "getPlacementClass", {
        get: /**
         * @return {?}
         */
        function () {
            return POSITION_TO_CSS_MAP[this.mcPlacement];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopoverComponent.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.popoverVisibility === PopoverVisibility.Visible;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} e
     * @return {?}
     */
    McPopoverComponent.prototype.handleKeydown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        // tslint:disable-next-line: deprecation
        if (this.isOpen && e.keyCode === ESCAPE) {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    McPopoverComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.isNonEmptyContent()) {
            this.closeOnInteraction = true;
            this.popoverVisibility = PopoverVisibility.Visible;
            this._mcVisible.next(true);
            this.mcVisibleChange.emit(true);
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    McPopoverComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.popoverVisibility = PopoverVisibility.Hidden;
        this._mcVisible.next(false);
        this.mcVisibleChange.emit(false);
        // Mark for check so if any parent component has set the
        // ChangeDetectionStrategy to OnPush it will be checked anyways
        this.markForCheck();
    };
    /**
     * @return {?}
     */
    McPopoverComponent.prototype.isNonEmptyContent = /**
     * @return {?}
     */
    function () {
        return !!this.mcContent && (this.isTemplateRef(this.mcContent) || this.isNonEmptyString(this.mcContent));
    };
    /** Returns an observable that notifies when the popover has been hidden from view. */
    /**
     * Returns an observable that notifies when the popover has been hidden from view.
     * @return {?}
     */
    McPopoverComponent.prototype.afterHidden = /**
     * Returns an observable that notifies when the popover has been hidden from view.
     * @return {?}
     */
    function () {
        return this.onHideSubject.asObservable();
    };
    /**
     * @return {?}
     */
    McPopoverComponent.prototype.isVisible = /**
     * @return {?}
     */
    function () {
        return this.popoverVisibility === PopoverVisibility.Visible;
    };
    /**
     * @return {?}
     */
    McPopoverComponent.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    McPopoverComponent.prototype.isTemplateRef = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof TemplateRef;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    McPopoverComponent.prototype.isNonEmptyString = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'string' && value !== '';
    };
    /**
     * @return {?}
     */
    McPopoverComponent.prototype.animationStart = /**
     * @return {?}
     */
    function () {
        this.closeOnInteraction = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McPopoverComponent.prototype.animationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var toState = (/** @type {?} */ (event.toState));
        if (toState === PopoverVisibility.Hidden && !this.isVisible()) {
            this.onHideSubject.next();
        }
        if (toState === PopoverVisibility.Visible || toState === PopoverVisibility.Hidden) {
            this.closeOnInteraction = true;
        }
    };
    /**
     * @return {?}
     */
    McPopoverComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.onHideSubject.complete();
    };
    McPopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mc-popover',
                    template: "<div class=\"mc-popover\"\n     [ngClass]=\"classList\"\n     [@state]=\"popoverVisibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"mcHeader\">\n            <ng-container *ngIf=\"isTemplateRef(mcHeader)\" [ngTemplateOutlet]=\"mcHeader\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcHeader)\">\n                <div [innerHTML]=\"mcHeader\"></div>\n            </ng-container>\n        </div>\n        <div class=\"mc-popover__content\" *ngIf=\"mcContent\">\n            <ng-container *ngIf=\"isTemplateRef(mcContent)\" [ngTemplateOutlet]=\"mcContent\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcContent)\">\n                <div [innerHTML]=\"mcContent\"></div>\n            </ng-container>\n        </div>\n        <div class=\"mc-popover__footer\" *ngIf=\"mcFooter\">\n            <ng-container *ngIf=\"isTemplateRef(mcFooter)\" [ngTemplateOutlet]=\"mcFooter\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString(mcFooter)\">\n                <div [innerHTML]=\"mcFooter\"></div>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"mc-popover__arrow\"\n         [ngClass]=\"{ 'mc-popover__arrow_with-footer': mcFooter }\"></div>\n</div>\n",
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [mcPopoverAnimations.popoverState],
                    host: {
                        '[class]': 'getCssClassesList',
                        '(keydown)': 'handleKeydown($event)'
                    },
                    styles: ["@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px);background-size:29px 29px;-webkit-animation:1s linear infinite mc-progress;animation:1s linear infinite mc-progress}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;display:block;margin:0;border-radius:4px;border-width:1px;border-style:solid;padding:0;box-sizing:border-box;visibility:visible;z-index:1060;list-style:none;white-space:pre-line}.mc-popover-small,.mc-popover-small .mc-popover{max-width:280px}.mc-popover-normal,.mc-popover-normal .mc-popover{max-width:400px}.mc-popover-large,.mc-popover-large .mc-popover{max-width:640px}.mc-popover__container{border-radius:4px;overflow:hidden}.mc-popover__header{padding:10px 16px;border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{padding:16px}.mc-popover__footer{margin-top:8px;padding:12px 16px;border-top-width:1px;border-top-style:solid}.mc-popover_placement-top .mc-popover,.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover{margin-bottom:12px}.mc-popover_placement-right .mc-popover,.mc-popover_placement-right-bottom .mc-popover,.mc-popover_placement-right-top .mc-popover{margin-left:12px}.mc-popover_placement-bottom .mc-popover,.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover{margin-top:12px}.mc-popover_placement-left .mc-popover,.mc-popover_placement-left-bottom .mc-popover,.mc-popover_placement-left-top .mc-popover{margin-right:12px}.mc-popover__arrow{position:absolute;z-index:-1;width:14px;height:14px;border:1px solid;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:-8px;left:50%;margin-left:-6px}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-8px;left:20px;margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-8px;right:20px;margin-left:0}.mc-popover_placement-right .mc-popover__arrow{left:-8px;top:50%;margin-top:-6px}.mc-popover_placement-right-top .mc-popover__arrow{left:-8px;top:20px;margin-top:-6px}.mc-popover_placement-right-bottom .mc-popover__arrow{left:-8px;bottom:14px;margin-top:-6px}.mc-popover_placement-left .mc-popover__arrow{right:-8px;top:50%;margin-top:-6px}.mc-popover_placement-left-top .mc-popover__arrow{right:-8px;top:20px;margin-top:-6px}.mc-popover_placement-left-bottom .mc-popover__arrow{right:-8px;bottom:14px;margin-top:-6px}.mc-popover_placement-bottom .mc-popover__arrow{top:-8px;left:50%;margin-left:-6px}.mc-popover_placement-bottom-left .mc-popover__arrow{top:-8px;left:20px;margin-left:0}.mc-popover_placement-bottom-right .mc-popover__arrow{top:-8px;right:20px;margin-left:0}"]
                }] }
    ];
    /** @nocollapse */
    McPopoverComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    McPopoverComponent.propDecorators = {
        mcVisibleChange: [{ type: Output, args: ['mcPopoverVisibleChange',] }]
    };
    return McPopoverComponent;
}());
export { McPopoverComponent };
if (false) {
    /** @type {?} */
    McPopoverComponent.prototype.positions;
    /** @type {?} */
    McPopoverComponent.prototype.availablePositions;
    /** @type {?} */
    McPopoverComponent.prototype.popoverVisibility;
    /** @type {?} */
    McPopoverComponent.prototype.closeOnInteraction;
    /** @type {?} */
    McPopoverComponent.prototype.mcContent;
    /** @type {?} */
    McPopoverComponent.prototype.mcHeader;
    /** @type {?} */
    McPopoverComponent.prototype.mcFooter;
    /** @type {?} */
    McPopoverComponent.prototype.mcVisibleChange;
    /**
     * @type {?}
     * @private
     */
    McPopoverComponent.prototype._mcTrigger;
    /**
     * @type {?}
     * @private
     */
    McPopoverComponent.prototype._mcPlacement;
    /**
     * @type {?}
     * @private
     */
    McPopoverComponent.prototype.popoverSize;
    /**
     * @type {?}
     * @private
     */
    McPopoverComponent.prototype._mcVisible;
    /**
     * @type {?}
     * @private
     */
    McPopoverComponent.prototype._classList;
    /**
     * Subject for notifying that the popover has been hidden from the view
     * @type {?}
     * @private
     */
    McPopoverComponent.prototype.onHideSubject;
    /** @type {?} */
    McPopoverComponent.prototype.changeDetectorRef;
    /** @type {?} */
    McPopoverComponent.prototype.componentElementRef;
}
/** @type {?} */
export var MC_POPOVER_SCROLL_STRATEGY = new InjectionToken('mc-popover-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function mcPopoverScrollStrategyFactory(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_POPOVER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcPopoverScrollStrategyFactory
};
/**
 * Creates an error to be thrown if the user supplied an invalid popover position.
 * @param {?} position
 * @return {?}
 */
export function getMcPopoverInvalidPositionError(position) {
    return Error("McPopover position \"" + position + "\" is invalid.");
}
/** @type {?} */
var VIEWPORT_MARGIN = 8;
/** @type {?} */
var POPOVER_ARROW_BORDER_DISTANCE = 20;
// tslint:disable-line
var McPopover = /** @class */ (function () {
    function McPopover(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        var _this = this;
        this.overlay = overlay;
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.scrollDispatcher = scrollDispatcher;
        this.hostView = hostView;
        this.scrollStrategy = scrollStrategy;
        this.direction = direction;
        this.isPopoverOpen = false;
        this.isDynamicPopover = false;
        this.mcVisibleChange = new EventEmitter();
        this.mcPositionStrategyPlacementChange = new EventEmitter();
        this.$unsubscribe = new Subject();
        this._disabled = false;
        this._mcTrigger = PopoverTriggers.Click;
        this.popoverSize = 'normal';
        this._mcPlacementPriority = null;
        this._mcPlacement = 'top';
        this.manualListeners = new Map();
        this.destroyed = new Subject();
        this.resizeListener = (/**
         * @return {?}
         */
        function () { return _this.updatePosition(); });
        this.availablePositions = POSITION_MAP;
        this.defaultPositionsMap = DEFAULT_4_POSITIONS_TO_CSS_MAP;
    }
    Object.defineProperty(McPopover.prototype, "mcHeader", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcHeader;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mcHeader = value;
            this.updateCompValue('mcHeader', value);
            if (this.isPopoverOpen) {
                this.updatePosition(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopover.prototype, "mcContent", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcContent;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mcContent = value;
            this.updateCompValue('mcContent', value);
            if (this.isPopoverOpen) {
                this.updatePosition(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopover.prototype, "mcFooter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcFooter;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mcFooter = value;
            this.updateCompValue('mcFooter', value);
            if (this.isPopoverOpen) {
                this.updatePosition(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopover.prototype, "disabled", {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopover.prototype, "mcMouseEnterDelay", {
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
    Object.defineProperty(McPopover.prototype, "mcMouseLeaveDelay", {
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
    Object.defineProperty(McPopover.prototype, "mcTrigger", {
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
                this._mcTrigger = PopoverTriggers.Click;
            }
            this.resetListeners();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopover.prototype, "mcPopoverSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this.popoverSize;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value && (value === 'small' || value === 'normal' || value === 'large')) {
                this.popoverSize = value;
                this.updateCompValue('mcPopoverSize', value);
            }
            else {
                this.popoverSize = 'normal';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopover.prototype, "mcPlacementPriority", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mcPlacementPriority;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value && value.length > 0) {
                this._mcPlacementPriority = value;
            }
            else {
                this._mcPlacementPriority = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopover.prototype, "mcPlacement", {
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
    Object.defineProperty(McPopover.prototype, "classList", {
        get: /**
         * @return {?}
         */
        function () {
            return this._classList;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._classList = value;
            this.updateCompValue('classList', this._classList);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McPopover.prototype, "mcVisible", {
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
    Object.defineProperty(McPopover.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isPopoverOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** Create the overlay config and position strategy */
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    McPopover.prototype.createOverlay = /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        // Create connected position strategy that listens for scroll events to reposition.
        /** @type {?} */
        var strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-popover')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions(__spread(EXTENDED_OVERLAY_POSITIONS));
        /** @type {?} */
        var scrollableAncestors = this.scrollDispatcher
            .getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} change
         * @return {?}
         */
        function (change) {
            if (_this.popover) {
                _this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && _this.popover.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the popover.
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
            panelClass: 'mc-popover__panel',
            scrollStrategy: this.scrollStrategy(),
            hasBackdrop: this.mcTrigger === PopoverTriggers.Click,
            backdropClass: 'no-class'
        });
        this.updateOverlayBackdropClick();
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
    McPopover.prototype.detach = /**
     * @return {?}
     */
    function () {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.popover = null;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    McPopover.prototype.onPositionChange = /**
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
        this.mcPositionStrategyPlacementChange.emit(updatedPlacement);
        if (this.popover) {
            this.updateCompValue('classList', this.classList);
            this.popover.markForCheck();
        }
        if (!this.defaultPositionsMap[updatedPlacement]) {
            this.handlePositionUpdate(updatedPlacement);
        }
    };
    /**
     * @param {?} updatedPlacement
     * @return {?}
     */
    McPopover.prototype.handlePositionUpdate = /**
     * @param {?} updatedPlacement
     * @return {?}
     */
    function (updatedPlacement) {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        /** @type {?} */
        var currentContainer = this.overlayRef.overlayElement.style;
        /** @type {?} */
        var elementHeight = this.hostView.element.nativeElement.clientHeight;
        /** @type {?} */
        var elementWidth = this.hostView.element.nativeElement.clientWidth;
        /** @type {?} */
        var verticalOffset = Math.floor(elementHeight / 2);
        // tslint:disable-line
        /** @type {?} */
        var horizontalOffset = Math.floor(elementWidth / 2 - 6);
        // tslint:disable-line
        /** @type {?} */
        var offsets = {
            top: verticalOffset,
            bottom: verticalOffset,
            right: horizontalOffset,
            left: horizontalOffset
        };
        /** @type {?} */
        var styleProperty = updatedPlacement.split(/(?=[A-Z])/)[1].toLowerCase();
        if (!this.overlayRef.overlayElement.style[styleProperty]) {
            this.overlayRef.overlayElement.style[styleProperty] = '0px';
        }
        this.overlayRef.overlayElement.style[styleProperty] =
            parseInt(currentContainer[styleProperty].split('px')[0], 10) +
                offsets[styleProperty] - POPOVER_ARROW_BORDER_DISTANCE + "px";
    };
    // tslint:disable-next-line:no-any
    // tslint:disable-next-line:no-any
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    McPopover.prototype.updateCompValue = 
    // tslint:disable-next-line:no-any
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        if (this.isDynamicPopover && value) {
            if (this.popover) {
                this.popover[key] = value;
            }
        }
    };
    /**
     * @return {?}
     */
    McPopover.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initElementRefListeners();
    };
    /**
     * @return {?}
     */
    McPopover.prototype.ngOnDestroy = /**
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
    McPopover.prototype.handleKeydown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        // tslint:disable-next-line: deprecation
        if (this.isOpen && e.keyCode === ESCAPE) {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    McPopover.prototype.handleTouchend = /**
     * @return {?}
     */
    function () {
        this.hide();
    };
    /**
     * @return {?}
     */
    McPopover.prototype.initElementRefListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.mcTrigger === PopoverTriggers.Click) {
            this.manualListeners
                .set('click', (/**
             * @return {?}
             */
            function () { return _this.show(); }))
                .forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            function (listener, event) {
                _this.elementRef.nativeElement.addEventListener(event, listener);
            }));
        }
        else if (this.mcTrigger === PopoverTriggers.Hover) {
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
            function (listener, event) {
                _this.elementRef.nativeElement.addEventListener(event, listener);
            }));
        }
        else if (this.mcTrigger === PopoverTriggers.Focus) {
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
            function (listener, event) {
                _this.elementRef.nativeElement.addEventListener(event, listener);
            }));
        }
    };
    /**
     * @return {?}
     */
    McPopover.prototype.registerResizeHandler = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // The resize handler is currently responsible for detecting slider dimension
        // changes and therefore doesn't cause a value change that needs to be propagated.
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.addEventListener('resize', _this.resizeListener);
        }));
    };
    /**
     * @return {?}
     */
    McPopover.prototype.deregisterResizeHandler = /**
     * @return {?}
     */
    function () {
        window.removeEventListener('resize', this.resizeListener);
    };
    /**
     * @return {?}
     */
    McPopover.prototype.resetListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.manualListeners.size) {
            this.manualListeners.forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            function (listener, event) {
                _this.elementRef.nativeElement.removeEventListener(event, listener);
            }));
            this.manualListeners.clear();
            this.initElementRefListeners();
        }
    };
    /**
     * @return {?}
     */
    McPopover.prototype.show = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.disabled) {
            if (!this.popover) {
                this.detach();
                /** @type {?} */
                var overlayRef = this.createOverlay();
                this.portal = this.portal || new ComponentPortal(McPopoverComponent, this.hostView);
                this.popover = overlayRef.attach(this.portal).instance;
                this.popover.afterHidden()
                    .pipe(takeUntil(this.destroyed))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.detach(); }));
                this.isDynamicPopover = true;
                /** @type {?} */
                var properties = [
                    'mcPlacement',
                    'mcPopoverSize',
                    'mcTrigger',
                    'mcMouseEnterDelay',
                    'mcMouseLeaveDelay',
                    'classList',
                    'mcVisible',
                    'mcHeader',
                    'mcContent',
                    'mcFooter'
                ];
                properties.forEach((/**
                 * @param {?} property
                 * @return {?}
                 */
                function (property) { return _this.updateCompValue(property, _this[property]); }));
                this.popover.mcVisibleChange
                    .pipe(takeUntil(this.$unsubscribe), distinctUntilChanged())
                    .subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    _this.mcVisible = data;
                    _this.mcVisibleChange.emit(data);
                    _this.isPopoverOpen = data;
                }));
            }
            this.popover.show();
        }
    };
    /**
     * @return {?}
     */
    McPopover.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (this.popover) {
            this.popover.hide();
        }
    };
    /**
     * @return {?}
     */
    McPopover.prototype.updateOverlayBackdropClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.mcTrigger === PopoverTriggers.Click && this.overlayRef) {
            this.backDropSubscription = this.overlayRef.backdropClick()
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (!_this.popover) {
                    return;
                }
                _this.popover.hide();
            }));
        }
        else if (this.backDropSubscription && this.overlayRef) {
            this.backDropSubscription.unsubscribe();
            this.overlayRef.detachBackdrop();
        }
    };
    /** Updates the position of the current popover. */
    /**
     * Updates the position of the current popover.
     * @param {?=} reapplyPosition
     * @return {?}
     */
    McPopover.prototype.updatePosition = /**
     * Updates the position of the current popover.
     * @param {?=} reapplyPosition
     * @return {?}
     */
    function (reapplyPosition) {
        if (reapplyPosition === void 0) { reapplyPosition = false; }
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        /** @type {?} */
        var position = (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
        position.withPositions(this.getPrioritizedPositions()).withPush(true);
        if (reapplyPosition) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                position.reapplyLastPosition();
            }));
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    McPopover.prototype.getPriorityPlacementStrategy = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var result = [];
        /** @type {?} */
        var possiblePositions = Object.keys(this.availablePositions);
        if (Array.isArray(value)) {
            value.forEach((/**
             * @param {?} position
             * @return {?}
             */
            function (position) {
                if (possiblePositions.includes(position)) {
                    result.push(_this.availablePositions[position]);
                }
            }));
        }
        else if (possiblePositions.includes(value)) {
            result.push(this.availablePositions[value]);
        }
        return result;
    };
    /**
     * @private
     * @return {?}
     */
    McPopover.prototype.getPrioritizedPositions = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.mcPlacementPriority) {
            return this.getPriorityPlacementStrategy(this.mcPlacementPriority);
        }
        return POSITION_PRIORITY_STRATEGY[this.mcPlacement];
    };
    McPopover.decorators = [
        { type: Directive, args: [{
                    selector: '[mcPopover]',
                    exportAs: 'mcPopover',
                    host: {
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()',
                        '[class.mc-popover_open]': 'isOpen'
                    }
                },] }
    ];
    /** @nocollapse */
    McPopover.ctorParameters = function () { return [
        { type: Overlay },
        { type: ElementRef },
        { type: NgZone },
        { type: ScrollDispatcher },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [MC_POPOVER_SCROLL_STRATEGY,] }] },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    McPopover.propDecorators = {
        mcVisibleChange: [{ type: Output, args: ['mcPopoverVisibleChange',] }],
        mcPositionStrategyPlacementChange: [{ type: Output, args: ['mcPopoverPositionStrategyPlacementChange',] }],
        mcHeader: [{ type: Input, args: ['mcPopoverHeader',] }],
        mcContent: [{ type: Input, args: ['mcPopoverContent',] }],
        mcFooter: [{ type: Input, args: ['mcPopoverFooter',] }],
        disabled: [{ type: Input, args: ['mcPopoverDisabled',] }],
        mcMouseEnterDelay: [{ type: Input, args: ['mcPopoverMouseEnterDelay',] }],
        mcMouseLeaveDelay: [{ type: Input, args: ['mcPopoverMouseLeaveDelay',] }],
        mcTrigger: [{ type: Input, args: ['mcPopoverTrigger',] }],
        mcPopoverSize: [{ type: Input, args: ['mcPopoverSize',] }],
        mcPlacementPriority: [{ type: Input, args: ['mcPopoverPlacementPriority',] }],
        mcPlacement: [{ type: Input, args: ['mcPopoverPlacement',] }],
        classList: [{ type: Input, args: ['mcPopoverClass',] }],
        mcVisible: [{ type: Input, args: ['mcPopoverVisible',] }]
    };
    return McPopover;
}());
export { McPopover };
if (false) {
    /** @type {?} */
    McPopover.prototype.isPopoverOpen;
    /** @type {?} */
    McPopover.prototype.isDynamicPopover;
    /** @type {?} */
    McPopover.prototype.overlayRef;
    /** @type {?} */
    McPopover.prototype.portal;
    /** @type {?} */
    McPopover.prototype.availablePositions;
    /** @type {?} */
    McPopover.prototype.defaultPositionsMap;
    /** @type {?} */
    McPopover.prototype.popover;
    /** @type {?} */
    McPopover.prototype.mcVisibleChange;
    /** @type {?} */
    McPopover.prototype.mcPositionStrategyPlacementChange;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcHeader;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcContent;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcFooter;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.$unsubscribe;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcMouseEnterDelay;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcMouseLeaveDelay;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcTrigger;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.popoverSize;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcPlacementPriority;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcPlacement;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._classList;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._mcVisible;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.manualListeners;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.backDropSubscription;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.resizeListener;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.scrollDispatcher;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.hostView;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype.direction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvcG9wb3Zlci8iLCJzb3VyY2VzIjpbInBvcG92ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBSUgsT0FBTyxFQUVQLGdCQUFnQixFQUVuQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFDSCw4QkFBOEIsRUFDOUIsMEJBQTBCLEVBQzFCLFlBQVksRUFBRSwwQkFBMEIsRUFDeEMsbUJBQW1CLEVBQ3RCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFHM0QsSUFBSyxlQUFlO0lBQ2hCLEtBQUssU0FBVTtJQUNmLEtBQUssU0FBVTtJQUNmLEtBQUssU0FBVTtFQUNsQjs7QUFFRCxJ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aUNBQXFDOzs7OztJQVVyQywrQkFBc0M7Ozs7O0lBc0J0QywrQkFBNEI7Ozs7O0lBTTVCLG9DQUFnRjs7Ozs7SUFDaEYsOEJBQWlEOzs7OztJQUNqRCx5Q0FBMkM7Ozs7O0lBNlQzQyxtQ0FBcUQ7Ozs7O0lBMVRqRCw0QkFBd0I7Ozs7O0lBQ3hCLCtCQUE4Qjs7Ozs7SUFDOUIsMkJBQXNCOzs7OztJQUN0QixxQ0FBMEM7Ozs7O0lBQzFDLDZCQUFrQzs7Ozs7SUFDbEMsbUNBQTBEOzs7OztJQUMxRCw4QkFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsXG4gICAgQ29ubmVjdGlvblBvc2l0aW9uUGFpcixcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5UmVmLFxuICAgIFNjcm9sbERpc3BhdGNoZXIsXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgREVGQVVMVF80X1BPU0lUSU9OU19UT19DU1NfTUFQLFxuICAgIEVYVEVOREVEX09WRVJMQVlfUE9TSVRJT05TLFxuICAgIFBPU0lUSU9OX01BUCwgUE9TSVRJT05fUFJJT1JJVFlfU1RSQVRFR1ksXG4gICAgUE9TSVRJT05fVE9fQ1NTX01BUFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWNQb3BvdmVyQW5pbWF0aW9ucyB9IGZyb20gJy4vcG9wb3Zlci1hbmltYXRpb25zJztcblxuXG5lbnVtIFBvcG92ZXJUcmlnZ2VycyB7XG4gICAgQ2xpY2sgPSAnY2xpY2snLFxuICAgIEZvY3VzID0gJ2ZvY3VzJyxcbiAgICBIb3ZlciA9ICdob3Zlcidcbn1cblxuZXhwb3J0IGVudW0gUG9wb3ZlclZpc2liaWxpdHkge1xuICAgIEluaXRpYWwgPSAnaW5pdGlhbCcsXG4gICAgVmlzaWJsZSA9ICd2aXNpYmxlJyxcbiAgICBIaWRkZW4gPSAnaGlkZGVuJ1xufVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtcG9wb3ZlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIHN0eWxlVXJsczogWycuL3BvcG92ZXIuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW21jUG9wb3ZlckFuaW1hdGlvbnMucG9wb3ZlclN0YXRlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3NdJzogJ2dldENzc0NsYXNzZXNMaXN0JyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1BvcG92ZXJDb21wb25lbnQge1xuICAgIHBvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gWy4uLkVYVEVOREVEX09WRVJMQVlfUE9TSVRJT05TXTtcbiAgICBhdmFpbGFibGVQb3NpdGlvbnM6IGFueTtcbiAgICBwb3BvdmVyVmlzaWJpbGl0eTogUG9wb3ZlclZpc2liaWxpdHkgPSBQb3BvdmVyVmlzaWJpbGl0eS5Jbml0aWFsO1xuICAgIGNsb3NlT25JbnRlcmFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG1jQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgICBtY0hlYWRlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgICBtY0Zvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoJ21jUG9wb3ZlclZpc2libGVDaGFuZ2UnKSBtY1Zpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGdldCBtY1RyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgbWNUcmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUcmlnZ2VyOiBzdHJpbmcgPSBQb3BvdmVyVHJpZ2dlcnMuSG92ZXI7XG5cbiAgICBnZXQgbWNQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBtY1BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fbWNQbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucy51bnNoaWZ0KFBPU0lUSU9OX01BUFsgdGhpcy5tY1BsYWNlbWVudCBdKTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBnZXQgbWNQb3BvdmVyU2l6ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyU2l6ZTtcbiAgICB9XG5cbiAgICBzZXQgbWNQb3BvdmVyU2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5wb3BvdmVyU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyU2l6ZSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyU2l6ZSA9ICdub3JtYWwnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3BvdmVyU2l6ZTogc3RyaW5nO1xuXG4gICAgZ2V0IG1jVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVmlzaWJsZS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgbWNWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZpc2libGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tY1Zpc2libGUudmFsdWUgIT09IHZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KHZpc2libGUpO1xuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdCh2aXNpYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NMaXN0LmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBzZXQgY2xhc3NMaXN0KHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgICAgICBsZXQgbGlzdDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxpc3QgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3QucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jbGFzc0xpc3QgPSBsaXN0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsYXNzTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICAgIGdldCBnZXRDc3NDbGFzc2VzTGlzdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jbGFzc0xpc3R9IG1jLXBvcG92ZXItJHt0aGlzLm1jUG9wb3ZlclNpemV9IG1jLXBvcG92ZXJfcGxhY2VtZW50LSR7dGhpcy5nZXRQbGFjZW1lbnRDbGFzc31gO1xuICAgIH1cblxuICAgIGdldCBnZXRQbGFjZW1lbnRDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gUE9TSVRJT05fVE9fQ1NTX01BUFt0aGlzLm1jUGxhY2VtZW50XTtcbiAgICB9XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuVmlzaWJsZTtcbiAgICB9XG5cbiAgICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHBvcG92ZXIgaGFzIGJlZW4gaGlkZGVuIGZyb20gdGhlIHZpZXcgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uSGlkZVN1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgY29tcG9uZW50RWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSBFU0NBUEUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNOb25FbXB0eUNvbnRlbnQoKSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9IFBvcG92ZXJWaXNpYmlsaXR5LlZpc2libGU7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9IFBvcG92ZXJWaXNpYmlsaXR5LkhpZGRlbjtcbiAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQoZmFsc2UpO1xuICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgICAvLyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byBPblB1c2ggaXQgd2lsbCBiZSBjaGVja2VkIGFueXdheXNcbiAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBpc05vbkVtcHR5Q29udGVudCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5tY0NvbnRlbnQgJiYgKHRoaXMuaXNUZW1wbGF0ZVJlZih0aGlzLm1jQ29udGVudCkgfHwgdGhpcy5pc05vbkVtcHR5U3RyaW5nKHRoaXMubWNDb250ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHdoZW4gdGhlIHBvcG92ZXIgaGFzIGJlZW4gaGlkZGVuIGZyb20gdmlldy4gKi9cbiAgICBhZnRlckhpZGRlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25IaWRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXJWaXNpYmlsaXR5ID09PSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlO1xuICAgIH1cblxuICAgIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBpc1RlbXBsYXRlUmVmKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgfVxuXG4gICAgaXNOb25FbXB0eVN0cmluZyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJztcbiAgICB9XG5cbiAgICBhbmltYXRpb25TdGFydCgpIHtcbiAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b1N0YXRlID0gZXZlbnQudG9TdGF0ZSBhcyBQb3BvdmVyVmlzaWJpbGl0eTtcblxuICAgICAgICBpZiAodG9TdGF0ZSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuSGlkZGVuICYmICF0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZVN1YmplY3QubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvU3RhdGUgPT09IFBvcG92ZXJWaXNpYmlsaXR5LlZpc2libGUgfHwgdG9TdGF0ZSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlT25JbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1kgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLXBvcG92ZXItc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gbWNQb3BvdmVyU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5KG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKHtzY3JvbGxUaHJvdHRsZTogMjB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1BvcG92ZXJTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbi8qKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biBpZiB0aGUgdXNlciBzdXBwbGllZCBhbiBpbnZhbGlkIHBvcG92ZXIgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNQb3BvdmVySW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBFcnJvcihgTWNQb3BvdmVyIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG5jb25zdCBWSUVXUE9SVF9NQVJHSU46IG51bWJlciA9IDg7XG5jb25zdCBQT1BPVkVSX0FSUk9XX0JPUkRFUl9ESVNUQU5DRTogbnVtYmVyID0gMjA7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNQb3BvdmVyXScsXG4gICAgZXhwb3J0QXM6ICdtY1BvcG92ZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1wb3BvdmVyX29wZW5dJzogJ2lzT3BlbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3ZlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBpc1BvcG92ZXJPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNEeW5hbWljUG9wb3ZlciA9IGZhbHNlO1xuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICAgIHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1jUG9wb3ZlckNvbXBvbmVudD47XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiB7IFtrZXk6IHN0cmluZ106IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIgfTtcbiAgICBkZWZhdWx0UG9zaXRpb25zTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ307XG4gICAgcG9wb3ZlcjogTWNQb3BvdmVyQ29tcG9uZW50IHwgbnVsbDtcblxuICAgIEBPdXRwdXQoJ21jUG9wb3ZlclZpc2libGVDaGFuZ2UnKSBtY1Zpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBAT3V0cHV0KCdtY1BvcG92ZXJQb3NpdGlvblN0cmF0ZWd5UGxhY2VtZW50Q2hhbmdlJylcbiAgICBtY1Bvc2l0aW9uU3RyYXRlZ3lQbGFjZW1lbnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJIZWFkZXInKVxuICAgIGdldCBtY0hlYWRlcigpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jSGVhZGVyO1xuICAgIH1cbiAgICBzZXQgbWNIZWFkZXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNIZWFkZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jSGVhZGVyJywgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUG9wb3Zlck9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNIZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckNvbnRlbnQnKVxuICAgIGdldCBtY0NvbnRlbnQoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY0NvbnRlbnQ7XG4gICAgfVxuICAgIHNldCBtY0NvbnRlbnQodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNDb250ZW50ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY0NvbnRlbnQnLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQb3BvdmVyT3Blbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY0NvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckZvb3RlcicpXG4gICAgZ2V0IG1jRm9vdGVyKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNGb290ZXI7XG4gICAgfVxuICAgIHNldCBtY0Zvb3Rlcih2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9tY0Zvb3RlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNGb290ZXInLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQb3BvdmVyT3Blbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY0Zvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHByaXZhdGUgJHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJNb3VzZUVudGVyRGVsYXknKVxuICAgIGdldCBtY01vdXNlRW50ZXJEZWxheSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNNb3VzZUVudGVyRGVsYXk7XG4gICAgfVxuICAgIHNldCBtY01vdXNlRW50ZXJEZWxheSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21jTW91c2VFbnRlckRlbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY01vdXNlRW50ZXJEZWxheScsIHZhbHVlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNNb3VzZUVudGVyRGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyTW91c2VMZWF2ZURlbGF5JylcbiAgICBnZXQgbWNNb3VzZUxlYXZlRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5O1xuICAgIH1cbiAgICBzZXQgbWNNb3VzZUxlYXZlRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlTGVhdmVEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUxlYXZlRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgX21jTW91c2VMZWF2ZURlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclRyaWdnZXInKVxuICAgIGdldCBtY1RyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgbWNUcmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1RyaWdnZXInLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSBQb3BvdmVyVHJpZ2dlcnMuQ2xpY2s7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVHJpZ2dlcjogc3RyaW5nID0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJTaXplJylcbiAgICBnZXQgbWNQb3BvdmVyU2l6ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyU2l6ZTtcbiAgICB9XG4gICAgc2V0IG1jUG9wb3ZlclNpemUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgJiYgKHZhbHVlID09PSAnc21hbGwnIHx8IHZhbHVlID09PSAnbm9ybWFsJyB8fCB2YWx1ZSA9PT0gJ2xhcmdlJykpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BvcG92ZXJTaXplJywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyU2l6ZSA9ICdub3JtYWwnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgcG9wb3ZlclNpemU6IHN0cmluZyA9ICdub3JtYWwnO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJQbGFjZW1lbnRQcmlvcml0eScpXG4gICAgZ2V0IG1jUGxhY2VtZW50UHJpb3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudFByaW9yaXR5O1xuICAgIH1cbiAgICBzZXQgbWNQbGFjZW1lbnRQcmlvcml0eSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnRQcmlvcml0eSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnRQcmlvcml0eSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnRQcmlvcml0eTogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyUGxhY2VtZW50JylcbiAgICBnZXQgbWNQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50O1xuICAgIH1cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQbGFjZW1lbnQnLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyQ2xhc3MnKVxuICAgIGdldCBjbGFzc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGFzc0xpc3Q7XG4gICAgfVxuICAgIHNldCBjbGFzc0xpc3QodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuX2NsYXNzTGlzdCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnY2xhc3NMaXN0JywgdGhpcy5fY2xhc3NMaXN0KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfY2xhc3NMaXN0OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyVmlzaWJsZScpXG4gICAgZ2V0IG1jVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVmlzaWJsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNWaXNpYmxlKGV4dGVybmFsVmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZXh0ZXJuYWxWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21jVmlzaWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVmlzaWJsZScsIHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQb3BvdmVyT3BlbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hbnVhbExpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0PigpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBwcml2YXRlIGJhY2tEcm9wU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgcHJpdmF0ZSBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSkgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zID0gUE9TSVRJT05fTUFQO1xuICAgICAgICB0aGlzLmRlZmF1bHRQb3NpdGlvbnNNYXAgPSBERUZBVUxUXzRfUE9TSVRJT05TX1RPX0NTU19NQVA7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb25maWcgYW5kIHBvc2l0aW9uIHN0cmF0ZWd5ICovXG4gICAgY3JlYXRlT3ZlcmxheSgpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBjb25uZWN0ZWQgcG9zaXRpb24gc3RyYXRlZ3kgdGhhdCBsaXN0ZW5zIGZvciBzY3JvbGwgZXZlbnRzIHRvIHJlcG9zaXRpb24uXG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5tYy1wb3BvdmVyJylcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbihWSUVXUE9SVF9NQVJHSU4pXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbLi4uRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlNdKTtcblxuICAgICAgICBjb25zdCBzY3JvbGxhYmxlQW5jZXN0b3JzID0gdGhpcy5zY3JvbGxEaXNwYXRjaGVyXG4gICAgICAgICAgICAuZ2V0QW5jZXN0b3JTY3JvbGxDb250YWluZXJzKHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAgICAgc3RyYXRlZ3kud2l0aFNjcm9sbGFibGVDb250YWluZXJzKHNjcm9sbGFibGVBbmNlc3RvcnMpO1xuXG4gICAgICAgIHN0cmF0ZWd5LnBvc2l0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgICAgIHRoaXMub25Qb3NpdGlvbkNoYW5nZShjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2Uuc2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzLmlzT3ZlcmxheUNsaXBwZWQgJiYgdGhpcy5wb3BvdmVyLm1jVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBZnRlciBwb3NpdGlvbiBjaGFuZ2VzIG9jY3VyIGFuZCB0aGUgb3ZlcmxheSBpcyBjbGlwcGVkIGJ5XG4gICAgICAgICAgICAgICAgICAgIC8vIGEgcGFyZW50IHNjcm9sbGFibGUgdGhlbiBjbG9zZSB0aGUgcG9wb3Zlci5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbixcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHN0cmF0ZWd5LFxuICAgICAgICAgICAgcGFuZWxDbGFzczogJ21jLXBvcG92ZXJfX3BhbmVsJyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdGhpcy5tY1RyaWdnZXIgPT09IFBvcG92ZXJUcmlnZ2Vycy5DbGljayxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICduby1jbGFzcydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVPdmVybGF5QmFja2Ryb3BDbGljaygpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcG92ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50OiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRQbGFjZW1lbnQgPSB0aGlzLm1jUGxhY2VtZW50O1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucykuc29tZSgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWCAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5ZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblkgJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkUGxhY2VtZW50ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdXBkYXRlZFBsYWNlbWVudCk7XG4gICAgICAgIHRoaXMubWNQb3NpdGlvblN0cmF0ZWd5UGxhY2VtZW50Q2hhbmdlLmVtaXQodXBkYXRlZFBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ2NsYXNzTGlzdCcsIHRoaXMuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kZWZhdWx0UG9zaXRpb25zTWFwW3VwZGF0ZWRQbGFjZW1lbnRdKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uVXBkYXRlKHVwZGF0ZWRQbGFjZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUG9zaXRpb25VcGRhdGUodXBkYXRlZFBsYWNlbWVudDogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGU7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmhvc3RWaWV3LmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IHRoaXMuaG9zdFZpZXcuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldDogbnVtYmVyID0gTWF0aC5mbG9vcihlbGVtZW50SGVpZ2h0IC8gMik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldDogbnVtYmVyID0gTWF0aC5mbG9vcihlbGVtZW50V2lkdGggLyAyIC0gNik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3Qgb2Zmc2V0czogeyBba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0ge1xuICAgICAgICAgICAgdG9wOiB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIGJvdHRvbTogdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICByaWdodDogaG9yaXpvbnRhbE9mZnNldCxcbiAgICAgICAgICAgIGxlZnQ6IGhvcml6b250YWxPZmZzZXRcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzdHlsZVByb3BlcnR5ID0gdXBkYXRlZFBsYWNlbWVudC5zcGxpdCgvKD89W0EtWl0pLylbMV0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZVtzdHlsZVByb3BlcnR5XSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlW3N0eWxlUHJvcGVydHldID0gJzBweCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGVbc3R5bGVQcm9wZXJ0eV0gPVxuICAgICAgICAgICAgYCR7cGFyc2VJbnQoY3VycmVudENvbnRhaW5lcltzdHlsZVByb3BlcnR5XS5zcGxpdCgncHgnKVswXSwgMTApICtcbiAgICAgICAgICAgIG9mZnNldHNbc3R5bGVQcm9wZXJ0eV0gLSBQT1BPVkVSX0FSUk9XX0JPUkRFUl9ESVNUQU5DRX1weGA7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHVwZGF0ZUNvbXBWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0R5bmFtaWNQb3BvdmVyICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoZW5kKCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpbml0RWxlbWVudFJlZkxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyID09PSBQb3BvdmVyVHJpZ2dlcnMuQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnY2xpY2snLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlZW50ZXInLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tY1RyaWdnZXIgPT09IFBvcG92ZXJUcmlnZ2Vycy5Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdmb2N1cycsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ2JsdXInLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgLy8gVGhlIHJlc2l6ZSBoYW5kbGVyIGlzIGN1cnJlbnRseSByZXNwb25zaWJsZSBmb3IgZGV0ZWN0aW5nIHNsaWRlciBkaW1lbnNpb25cbiAgICAgICAgLy8gY2hhbmdlcyBhbmQgdGhlcmVmb3JlIGRvZXNuJ3QgY2F1c2UgYSB2YWx1ZSBjaGFuZ2UgdGhhdCBuZWVkcyB0byBiZSBwcm9wYWdhdGVkLlxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hbnVhbExpc3RlbmVycy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvcnRhbCA9IHRoaXMucG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoTWNQb3BvdmVyQ29tcG9uZW50LCB0aGlzLmhvc3RWaWV3KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9wb3ZlciA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKS5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcG92ZXIuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pc0R5bmFtaWNQb3BvdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gW1xuICAgICAgICAgICAgICAgICAgICAnbWNQbGFjZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbWNQb3BvdmVyU2l6ZScsXG4gICAgICAgICAgICAgICAgICAgICdtY1RyaWdnZXInLFxuICAgICAgICAgICAgICAgICAgICAnbWNNb3VzZUVudGVyRGVsYXknLFxuICAgICAgICAgICAgICAgICAgICAnbWNNb3VzZUxlYXZlRGVsYXknLFxuICAgICAgICAgICAgICAgICAgICAnY2xhc3NMaXN0JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jVmlzaWJsZScsXG4gICAgICAgICAgICAgICAgICAgICdtY0hlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICdtY0NvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbWNGb290ZXInXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHRoaXMudXBkYXRlQ29tcFZhbHVlKHByb3BlcnR5LCB0aGlzW3Byb3BlcnR5XSkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyLm1jVmlzaWJsZUNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy4kdW5zdWJzY3JpYmUpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BvcG92ZXJPcGVuID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlT3ZlcmxheUJhY2tkcm9wQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrICYmIHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5iYWNrRHJvcFN1YnNjcmlwdGlvbiA9IHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBvcG92ZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJhY2tEcm9wU3Vic2NyaXB0aW9uICYmIHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5iYWNrRHJvcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaEJhY2tkcm9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgcG9wb3Zlci4gKi9cbiAgICB1cGRhdGVQb3NpdGlvbihyZWFwcGx5UG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuICAgICAgICBwb3NpdGlvbi53aXRoUG9zaXRpb25zKHRoaXMuZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSkud2l0aFB1c2godHJ1ZSk7XG5cbiAgICAgICAgaWYgKHJlYXBwbHlQb3NpdGlvbikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ucmVhcHBseUxhc3RQb3NpdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFByaW9yaXR5UGxhY2VtZW50U3RyYXRlZ3kodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKTogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbXTtcbiAgICAgICAgY29uc3QgcG9zc2libGVQb3NpdGlvbnMgPSBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgocG9zaXRpb246IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5hdmFpbGFibGVQb3NpdGlvbnNbcG9zaXRpb25dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW3ZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jUGxhY2VtZW50UHJpb3JpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByaW9yaXR5UGxhY2VtZW50U3RyYXRlZ3kodGhpcy5tY1BsYWNlbWVudFByaW9yaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQT1NJVElPTl9QUklPUklUWV9TVFJBVEVHWVt0aGlzLm1jUGxhY2VtZW50XTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZUxpc3RlbmVyID0gKCkgPT4gdGhpcy51cGRhdGVQb3NpdGlvbigpO1xufVxuIl19
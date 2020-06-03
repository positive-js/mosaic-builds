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
                    styles: ["@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px);background-size:29px 29px;-webkit-animation:1s linear infinite mc-progress;animation:1s linear infinite mc-progress}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;display:block;margin:0;border-radius:4px;border-width:1px;border-style:solid;padding:0;box-sizing:border-box;visibility:visible;z-index:1060;list-style:none;white-space:pre-line}.mc-popover-small,.mc-popover-small .mc-popover{max-width:280px}.mc-popover-normal,.mc-popover-normal .mc-popover{max-width:400px}.mc-popover-large,.mc-popover-large .mc-popover{max-width:640px}.mc-popover__container{border-radius:4px;overflow:hidden}.mc-popover__header{padding:10px 16px;border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{padding:16px}.mc-popover__footer{margin-top:8px;padding:12px 16px;border-top-width:1px;border-top-style:solid}.mc-popover_placement-top .mc-popover,.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover{margin-bottom:8px}.mc-popover_placement-right .mc-popover,.mc-popover_placement-right-bottom .mc-popover,.mc-popover_placement-right-top .mc-popover{margin-left:8px}.mc-popover_placement-bottom .mc-popover,.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover{margin-top:8px}.mc-popover_placement-left .mc-popover,.mc-popover_placement-left-bottom .mc-popover,.mc-popover_placement-left-top .mc-popover{margin-right:8px}.mc-popover__arrow{position:absolute;z-index:-1;width:14px;height:14px;border:1px solid;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:-6px;left:50%;margin-left:-4px}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-6px;left:20px;margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-6px;right:20px;margin-left:0}.mc-popover_placement-right .mc-popover__arrow{left:-6px;top:50%;margin-top:-4px}.mc-popover_placement-right-top .mc-popover__arrow{left:-6px;top:18px;margin-top:-4px}.mc-popover_placement-right-bottom .mc-popover__arrow{left:-6px;bottom:14px;margin-top:-4px}.mc-popover_placement-left .mc-popover__arrow{right:-6px;top:50%;margin-top:-4px}.mc-popover_placement-left-top .mc-popover__arrow{right:-6px;top:18px;margin-top:-4px}.mc-popover_placement-left-bottom .mc-popover__arrow{right:-6px;bottom:14px;margin-top:-4px}.mc-popover_placement-bottom .mc-popover__arrow{top:-6px;left:50%;margin-left:-4px}.mc-popover_placement-bottom-left .mc-popover__arrow{top:-6px;left:20px;margin-left:0}.mc-popover_placement-bottom-right .mc-popover__arrow{top:-6px;right:20px;margin-left:0}"]
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
/* Constant distance between popover container border
*  corner according to popover placement and middle of arrow
* */
/** @type {?} */
var POPOVER_ARROW_BORDER_DISTANCE = 20;
// tslint:disable-line
/* Constant value for min height and width of anchor element used for popover.
*  Set as POPOVER_ARROW_BORDER_DISTANCE multiplied by 2
*  plus 2px border for both sides of element. Used in check of position management.
* */
/** @type {?} */
var ANCHOR_MIN_HEIGHT_WIDTH = 44;
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
        if (((styleProperty === 'top' || styleProperty === 'bottom') &&
            elementHeight > ANCHOR_MIN_HEIGHT_WIDTH) ||
            ((styleProperty === 'left' || styleProperty === 'right') &&
                elementWidth > ANCHOR_MIN_HEIGHT_WIDTH)) {
            return;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvcG9wb3Zlci8iLCJzb3VyY2VzIjpbInBvcG92ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBSUgsT0FBTyxFQUVQLGdCQUFnQixFQUVuQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFDSCw4QkFBOEIsRUFDOUIsMEJBQTBCLEVBQzFCLFlBQVksRUFBRSwwQkFBMEIsRUFDeEMsbUJBQW1CLEVBQ3RCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFHM0QsSUFBSyxlQUFlO0lBQ2hCLEtBQUssU0FBVTtJQUNmLEtBQUssU0FBVTtJQUNmLEtBQUssU0FBVTtFQUNsQjs7QUFFRCxJ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Q0FBOEM7O0lBQzlDLDRCQUFtQzs7SUFFbkMsb0NBQWdGOztJQUVoRixzREFDNkU7Ozs7O0lBYzdFLDhCQUE2Qzs7Ozs7SUFjN0MsK0JBQThDOzs7OztJQWM5Qyw4QkFBNkM7Ozs7O0lBRTdDLGlDQUEyQzs7Ozs7SUFTM0MsOEJBQW1DOzs7OztJQVVuQyx1Q0FBbUM7Ozs7O0lBVW5DLHVDQUFtQzs7Ozs7SUFpQm5DLCtCQUFtRDs7Ozs7SUFjbkQsZ0NBQXVDOzs7OztJQWF2Qyx5Q0FBOEQ7Ozs7O0lBYzlELGlDQUFxQzs7Ozs7SUFVckMsK0JBQXNDOzs7OztJQXNCdEMsK0JBQTRCOzs7OztJQU01QixvQ0FBZ0Y7Ozs7O0lBQ2hGLDhCQUFpRDs7Ozs7SUFDakQseUNBQTJDOzs7OztJQW9VM0MsbUNBQXFEOzs7OztJQWpVakQsNEJBQXdCOzs7OztJQUN4QiwrQkFBOEI7Ozs7O0lBQzlCLDJCQUFzQjs7Ozs7SUFDdEIscUNBQTBDOzs7OztJQUMxQyw2QkFBa0M7Ozs7O0lBQ2xDLG1DQUEwRDs7Ozs7SUFDMUQsOEJBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLFxuICAgIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheVJlZixcbiAgICBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIERFRkFVTFRfNF9QT1NJVElPTlNfVE9fQ1NTX01BUCxcbiAgICBFWFRFTkRFRF9PVkVSTEFZX1BPU0lUSU9OUyxcbiAgICBQT1NJVElPTl9NQVAsIFBPU0lUSU9OX1BSSU9SSVRZX1NUUkFURUdZLFxuICAgIFBPU0lUSU9OX1RPX0NTU19NQVBcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jUG9wb3ZlckFuaW1hdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItYW5pbWF0aW9ucyc7XG5cblxuZW51bSBQb3BvdmVyVHJpZ2dlcnMge1xuICAgIENsaWNrID0gJ2NsaWNrJyxcbiAgICBGb2N1cyA9ICdmb2N1cycsXG4gICAgSG92ZXIgPSAnaG92ZXInXG59XG5cbmV4cG9ydCBlbnVtIFBvcG92ZXJWaXNpYmlsaXR5IHtcbiAgICBJbml0aWFsID0gJ2luaXRpYWwnLFxuICAgIFZpc2libGUgPSAndmlzaWJsZScsXG4gICAgSGlkZGVuID0gJ2hpZGRlbidcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXBvcG92ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wb3BvdmVyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFttY1BvcG92ZXJBbmltYXRpb25zLnBvcG92ZXJTdGF0ZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzXSc6ICdnZXRDc3NDbGFzc2VzTGlzdCcsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQb3BvdmVyQ29tcG9uZW50IHtcbiAgICBwb3NpdGlvbnM6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFsuLi5FWFRFTkRFRF9PVkVSTEFZX1BPU0lUSU9OU107XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgcG9wb3ZlclZpc2liaWxpdHk6IFBvcG92ZXJWaXNpYmlsaXR5ID0gUG9wb3ZlclZpc2liaWxpdHkuSW5pdGlhbDtcbiAgICBjbG9zZU9uSW50ZXJhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBtY0NvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgbWNIZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgbWNGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KCdtY1BvcG92ZXJWaXNpYmxlQ2hhbmdlJykgbWNWaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVHJpZ2dlcjogc3RyaW5nID0gUG9wb3ZlclRyaWdnZXJzLkhvdmVyO1xuXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG5cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX21jUGxhY2VtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMudW5zaGlmdChQT1NJVElPTl9NQVBbIHRoaXMubWNQbGFjZW1lbnQgXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgZ2V0IG1jUG9wb3ZlclNpemUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclNpemU7XG4gICAgfVxuXG4gICAgc2V0IG1jUG9wb3ZlclNpemUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMucG9wb3ZlclNpemUpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSAnbm9ybWFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcG9wb3ZlclNpemU6IHN0cmluZztcblxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGUudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2aXNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fbWNWaXNpYmxlLnZhbHVlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dCh2aXNpYmxlKTtcbiAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQodmlzaWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsYXNzTGlzdC5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgc2V0IGNsYXNzTGlzdCh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGxpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBsaXN0ID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2xhc3NMaXN0ID0gbGlzdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGFzc0xpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICBnZXQgZ2V0Q3NzQ2xhc3Nlc0xpc3QoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY2xhc3NMaXN0fSBtYy1wb3BvdmVyLSR7dGhpcy5tY1BvcG92ZXJTaXplfSBtYy1wb3BvdmVyX3BsYWNlbWVudC0ke3RoaXMuZ2V0UGxhY2VtZW50Q2xhc3N9YDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0UGxhY2VtZW50Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFBPU0lUSU9OX1RPX0NTU19NQVBbdGhpcy5tY1BsYWNlbWVudF07XG4gICAgfVxuXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPT09IFBvcG92ZXJWaXNpYmlsaXR5LlZpc2libGU7XG4gICAgfVxuXG4gICAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBwb3BvdmVyIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHRoZSB2aWV3ICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkhpZGVTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbXBvbmVudEVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzTm9uRW1wdHlDb250ZW50KCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlO1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPSBQb3BvdmVyVmlzaWJpbGl0eS5IaWRkZW47XG4gICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaXNOb25FbXB0eUNvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubWNDb250ZW50ICYmICh0aGlzLmlzVGVtcGxhdGVSZWYodGhpcy5tY0NvbnRlbnQpIHx8IHRoaXMuaXNOb25FbXB0eVN0cmluZyh0aGlzLm1jQ29udGVudCkpO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB3aGVuIHRoZSBwb3BvdmVyIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHZpZXcuICovXG4gICAgYWZ0ZXJIaWRkZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uSGlkZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuVmlzaWJsZTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaXNUZW1wbGF0ZVJlZih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIGlzTm9uRW1wdHlTdHJpbmcodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJyc7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uU3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG9TdGF0ZSA9IGV2ZW50LnRvU3RhdGUgYXMgUG9wb3ZlclZpc2liaWxpdHk7XG5cbiAgICAgICAgaWYgKHRvU3RhdGUgPT09IFBvcG92ZXJWaXNpYmlsaXR5LkhpZGRlbiAmJiAhdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0Lm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b1N0YXRlID09PSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlIHx8IHRvU3RhdGUgPT09IFBvcG92ZXJWaXNpYmlsaXR5LkhpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMub25IaWRlU3ViamVjdC5jb21wbGV0ZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1wb3BvdmVyLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jUG9wb3ZlclNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7c2Nyb2xsVGhyb3R0bGU6IDIwfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNQb3BvdmVyU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG4vKiogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCBwb3BvdmVyIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jUG9wb3ZlckludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRXJyb3IoYE1jUG9wb3ZlciBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIgaXMgaW52YWxpZC5gKTtcbn1cblxuY29uc3QgVklFV1BPUlRfTUFSR0lOOiBudW1iZXIgPSA4O1xuXG4vKiBDb25zdGFudCBkaXN0YW5jZSBiZXR3ZWVuIHBvcG92ZXIgY29udGFpbmVyIGJvcmRlclxuKiAgY29ybmVyIGFjY29yZGluZyB0byBwb3BvdmVyIHBsYWNlbWVudCBhbmQgbWlkZGxlIG9mIGFycm93XG4qICovXG5jb25zdCBQT1BPVkVSX0FSUk9XX0JPUkRFUl9ESVNUQU5DRTogbnVtYmVyID0gMjA7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuLyogQ29uc3RhbnQgdmFsdWUgZm9yIG1pbiBoZWlnaHQgYW5kIHdpZHRoIG9mIGFuY2hvciBlbGVtZW50IHVzZWQgZm9yIHBvcG92ZXIuXG4qICBTZXQgYXMgUE9QT1ZFUl9BUlJPV19CT1JERVJfRElTVEFOQ0UgbXVsdGlwbGllZCBieSAyXG4qICBwbHVzIDJweCBib3JkZXIgZm9yIGJvdGggc2lkZXMgb2YgZWxlbWVudC4gVXNlZCBpbiBjaGVjayBvZiBwb3NpdGlvbiBtYW5hZ2VtZW50LlxuKiAqL1xuY29uc3QgQU5DSE9SX01JTl9IRUlHSFRfV0lEVEg6IG51bWJlciA9IDQ0OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jUG9wb3Zlcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNQb3BvdmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKScsXG4gICAgICAgICdbY2xhc3MubWMtcG9wb3Zlcl9vcGVuXSc6ICdpc09wZW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1BvcG92ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgaXNQb3BvdmVyT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzRHluYW1pY1BvcG92ZXIgPSBmYWxzZTtcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNY1BvcG92ZXJDb21wb25lbnQ+O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogeyBba2V5OiBzdHJpbmddOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH07XG4gICAgZGVmYXVsdFBvc2l0aW9uc01hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICAgIHBvcG92ZXI6IE1jUG9wb3ZlckNvbXBvbmVudCB8IG51bGw7XG5cbiAgICBAT3V0cHV0KCdtY1BvcG92ZXJWaXNpYmxlQ2hhbmdlJykgbWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyUG9zaXRpb25TdHJhdGVneVBsYWNlbWVudENoYW5nZScpXG4gICAgbWNQb3NpdGlvblN0cmF0ZWd5UGxhY2VtZW50Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVySGVhZGVyJylcbiAgICBnZXQgbWNIZWFkZXIoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY0hlYWRlcjtcbiAgICB9XG4gICAgc2V0IG1jSGVhZGVyKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jSGVhZGVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY0hlYWRlcicsIHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1BvcG92ZXJPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jSGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJDb250ZW50JylcbiAgICBnZXQgbWNDb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNDb250ZW50O1xuICAgIH1cbiAgICBzZXQgbWNDb250ZW50KHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jQ29udGVudCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNDb250ZW50JywgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUG9wb3Zlck9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJGb290ZXInKVxuICAgIGdldCBtY0Zvb3RlcigpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jRm9vdGVyO1xuICAgIH1cbiAgICBzZXQgbWNGb290ZXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNGb290ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jRm9vdGVyJywgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUG9wb3Zlck9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwcml2YXRlICR1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckRpc2FibGVkJylcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyTW91c2VFbnRlckRlbGF5JylcbiAgICBnZXQgbWNNb3VzZUVudGVyRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VFbnRlckRlbGF5O1xuICAgIH1cbiAgICBzZXQgbWNNb3VzZUVudGVyRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlRW50ZXJEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUVudGVyRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgX21jTW91c2VFbnRlckRlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jUG9wb3Zlck1vdXNlTGVhdmVEZWxheScpXG4gICAgZ2V0IG1jTW91c2VMZWF2ZURlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlTGVhdmVEZWxheTtcbiAgICB9XG4gICAgc2V0IG1jTW91c2VMZWF2ZURlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWNNb3VzZUxlYXZlRGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jTW91c2VMZWF2ZURlbGF5JywgdmFsdWUpO1xuICAgIH1cbiAgICBwcml2YXRlIF9tY01vdXNlTGVhdmVEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJUcmlnZ2VyJylcbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUcmlnZ2VyJywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9IFBvcG92ZXJUcmlnZ2Vycy5DbGljaztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyU2l6ZScpXG4gICAgZ2V0IG1jUG9wb3ZlclNpemUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclNpemU7XG4gICAgfVxuICAgIHNldCBtY1BvcG92ZXJTaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmICh2YWx1ZSA9PT0gJ3NtYWxsJyB8fCB2YWx1ZSA9PT0gJ25vcm1hbCcgfHwgdmFsdWUgPT09ICdsYXJnZScpKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJTaXplID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQb3BvdmVyU2l6ZScsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSAnbm9ybWFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHBvcG92ZXJTaXplOiBzdHJpbmcgPSAnbm9ybWFsJztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyUGxhY2VtZW50UHJpb3JpdHknKVxuICAgIGdldCBtY1BsYWNlbWVudFByaW9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnRQcmlvcml0eTtcbiAgICB9XG4gICAgc2V0IG1jUGxhY2VtZW50UHJpb3JpdHkodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50UHJpb3JpdHkgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50UHJpb3JpdHkgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jUGxhY2VtZW50UHJpb3JpdHk6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclBsYWNlbWVudCcpXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckNsYXNzJylcbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NMaXN0O1xuICAgIH1cbiAgICBzZXQgY2xhc3NMaXN0KHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLl9jbGFzc0xpc3QgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ2NsYXNzTGlzdCcsIHRoaXMuX2NsYXNzTGlzdCk7XG4gICAgfVxuICAgIHByaXZhdGUgX2NsYXNzTGlzdDogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclZpc2libGUnKVxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZShleHRlcm5hbFZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGV4dGVybmFsVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tY1Zpc2libGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Zpc2libGUnLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzUG9wb3Zlck9wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYW51YWxMaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdD4oKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcHJpdmF0ZSBiYWNrRHJvcFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIHByaXZhdGUgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICAgICAgdGhpcy5kZWZhdWx0UG9zaXRpb25zTWFwID0gREVGQVVMVF80X1BPU0lUSU9OU19UT19DU1NfTUFQO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICAgIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgY29ubmVjdGVkIHBvc2l0aW9uIHN0cmF0ZWd5IHRoYXQgbGlzdGVucyBmb3Igc2Nyb2xsIGV2ZW50cyB0byByZXBvc2l0aW9uLlxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYpXG4gICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcubWMtcG9wb3ZlcicpXG4gICAgICAgICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgICAgICAgIC53aXRoVmlld3BvcnRNYXJnaW4oVklFV1BPUlRfTUFSR0lOKVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoWy4uLkVYVEVOREVEX09WRVJMQVlfUE9TSVRJT05TXSk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZUFuY2VzdG9ycyA9IHRoaXMuc2Nyb2xsRGlzcGF0Y2hlclxuICAgICAgICAgICAgLmdldEFuY2VzdG9yU2Nyb2xsQ29udGFpbmVycyh0aGlzLmVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHN0cmF0ZWd5LndpdGhTY3JvbGxhYmxlQ29udGFpbmVycyhzY3JvbGxhYmxlQW5jZXN0b3JzKTtcblxuICAgICAgICBzdHJhdGVneS5wb3NpdGlvbkNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUG9zaXRpb25DaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnNjcm9sbGFibGVWaWV3UHJvcGVydGllcy5pc092ZXJsYXlDbGlwcGVkICYmIHRoaXMucG9wb3Zlci5tY1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcG9zaXRpb24gY2hhbmdlcyBvY2N1ciBhbmQgdGhlIG92ZXJsYXkgaXMgY2xpcHBlZCBieVxuICAgICAgICAgICAgICAgICAgICAvLyBhIHBhcmVudCBzY3JvbGxhYmxlIHRoZW4gY2xvc2UgdGhlIHBvcG92ZXIuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24sXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiBzdHJhdGVneSxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICdtYy1wb3BvdmVyX19wYW5lbCcsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IHRoaXMubWNUcmlnZ2VyID09PSBQb3BvdmVyVHJpZ2dlcnMuQ2xpY2ssXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiAnbm8tY2xhc3MnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlT3ZlcmxheUJhY2tkcm9wQ2xpY2soKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3BvdmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBvblBvc2l0aW9uQ2hhbmdlKCRldmVudDogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgICAgIGxldCB1cGRhdGVkUGxhY2VtZW50ID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5hdmFpbGFibGVQb3NpdGlvbnMpLnNvbWUoKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKCRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5YID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5ZICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlYID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlYICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlZKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZFBsYWNlbWVudCA9IGtleTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BsYWNlbWVudCcsIHVwZGF0ZWRQbGFjZW1lbnQpO1xuICAgICAgICB0aGlzLm1jUG9zaXRpb25TdHJhdGVneVBsYWNlbWVudENoYW5nZS5lbWl0KHVwZGF0ZWRQbGFjZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdjbGFzc0xpc3QnLCB0aGlzLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGVmYXVsdFBvc2l0aW9uc01hcFt1cGRhdGVkUGxhY2VtZW50XSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVQb3NpdGlvblVwZGF0ZSh1cGRhdGVkUGxhY2VtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVBvc2l0aW9uVXBkYXRlKHVwZGF0ZWRQbGFjZW1lbnQ6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50Q29udGFpbmVyID0gdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlO1xuICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5ob3N0Vmlldy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB0aGlzLmhvc3RWaWV3LmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgdmVydGljYWxPZmZzZXQ6IG51bWJlciA9IE1hdGguZmxvb3IoZWxlbWVudEhlaWdodCAvIDIpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgIGNvbnN0IGhvcml6b250YWxPZmZzZXQ6IG51bWJlciA9IE1hdGguZmxvb3IoZWxlbWVudFdpZHRoIC8gMiAtIDYpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgIGNvbnN0IG9mZnNldHM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyfSA9IHtcbiAgICAgICAgICAgIHRvcDogdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICBib3R0b206IHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgcmlnaHQ6IGhvcml6b250YWxPZmZzZXQsXG4gICAgICAgICAgICBsZWZ0OiBob3Jpem9udGFsT2Zmc2V0XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc3R5bGVQcm9wZXJ0eSA9IHVwZGF0ZWRQbGFjZW1lbnQuc3BsaXQoLyg/PVtBLVpdKS8pWzFdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKCgoc3R5bGVQcm9wZXJ0eSA9PT0gJ3RvcCcgfHwgc3R5bGVQcm9wZXJ0eSA9PT0gJ2JvdHRvbScpICYmXG4gICAgICAgICAgICBlbGVtZW50SGVpZ2h0ID4gQU5DSE9SX01JTl9IRUlHSFRfV0lEVEgpIHx8XG4gICAgICAgICAgICAoKHN0eWxlUHJvcGVydHkgPT09ICdsZWZ0JyB8fCBzdHlsZVByb3BlcnR5ID09PSAncmlnaHQnKSAmJlxuICAgICAgICAgICAgZWxlbWVudFdpZHRoID4gQU5DSE9SX01JTl9IRUlHSFRfV0lEVEgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZVtzdHlsZVByb3BlcnR5XSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlW3N0eWxlUHJvcGVydHldID0gJzBweCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGVbc3R5bGVQcm9wZXJ0eV0gPVxuICAgICAgICAgICAgYCR7cGFyc2VJbnQoY3VycmVudENvbnRhaW5lcltzdHlsZVByb3BlcnR5XS5zcGxpdCgncHgnKVswXSwgMTApICtcbiAgICAgICAgICAgIG9mZnNldHNbc3R5bGVQcm9wZXJ0eV0gLSBQT1BPVkVSX0FSUk9XX0JPUkRFUl9ESVNUQU5DRX1weGA7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHVwZGF0ZUNvbXBWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0R5bmFtaWNQb3BvdmVyICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoZW5kKCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpbml0RWxlbWVudFJlZkxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyID09PSBQb3BvdmVyVHJpZ2dlcnMuQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnY2xpY2snLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlZW50ZXInLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tY1RyaWdnZXIgPT09IFBvcG92ZXJUcmlnZ2Vycy5Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdmb2N1cycsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ2JsdXInLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgLy8gVGhlIHJlc2l6ZSBoYW5kbGVyIGlzIGN1cnJlbnRseSByZXNwb25zaWJsZSBmb3IgZGV0ZWN0aW5nIHNsaWRlciBkaW1lbnNpb25cbiAgICAgICAgLy8gY2hhbmdlcyBhbmQgdGhlcmVmb3JlIGRvZXNuJ3QgY2F1c2UgYSB2YWx1ZSBjaGFuZ2UgdGhhdCBuZWVkcyB0byBiZSBwcm9wYWdhdGVkLlxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hbnVhbExpc3RlbmVycy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvcnRhbCA9IHRoaXMucG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoTWNQb3BvdmVyQ29tcG9uZW50LCB0aGlzLmhvc3RWaWV3KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9wb3ZlciA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKS5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcG92ZXIuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pc0R5bmFtaWNQb3BvdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gW1xuICAgICAgICAgICAgICAgICAgICAnbWNQbGFjZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbWNQb3BvdmVyU2l6ZScsXG4gICAgICAgICAgICAgICAgICAgICdtY1RyaWdnZXInLFxuICAgICAgICAgICAgICAgICAgICAnbWNNb3VzZUVudGVyRGVsYXknLFxuICAgICAgICAgICAgICAgICAgICAnbWNNb3VzZUxlYXZlRGVsYXknLFxuICAgICAgICAgICAgICAgICAgICAnY2xhc3NMaXN0JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jVmlzaWJsZScsXG4gICAgICAgICAgICAgICAgICAgICdtY0hlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICdtY0NvbnRlbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbWNGb290ZXInXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHRoaXMudXBkYXRlQ29tcFZhbHVlKHByb3BlcnR5LCB0aGlzW3Byb3BlcnR5XSkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyLm1jVmlzaWJsZUNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy4kdW5zdWJzY3JpYmUpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BvcG92ZXJPcGVuID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlT3ZlcmxheUJhY2tkcm9wQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrICYmIHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5iYWNrRHJvcFN1YnNjcmlwdGlvbiA9IHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBvcG92ZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJhY2tEcm9wU3Vic2NyaXB0aW9uICYmIHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5iYWNrRHJvcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaEJhY2tkcm9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgcG9wb3Zlci4gKi9cbiAgICB1cGRhdGVQb3NpdGlvbihyZWFwcGx5UG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuICAgICAgICBwb3NpdGlvbi53aXRoUG9zaXRpb25zKHRoaXMuZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSkud2l0aFB1c2godHJ1ZSk7XG5cbiAgICAgICAgaWYgKHJlYXBwbHlQb3NpdGlvbikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ucmVhcHBseUxhc3RQb3NpdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFByaW9yaXR5UGxhY2VtZW50U3RyYXRlZ3kodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKTogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbXTtcbiAgICAgICAgY29uc3QgcG9zc2libGVQb3NpdGlvbnMgPSBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgocG9zaXRpb246IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5hdmFpbGFibGVQb3NpdGlvbnNbcG9zaXRpb25dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW3ZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jUGxhY2VtZW50UHJpb3JpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByaW9yaXR5UGxhY2VtZW50U3RyYXRlZ3kodGhpcy5tY1BsYWNlbWVudFByaW9yaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQT1NJVElPTl9QUklPUklUWV9TVFJBVEVHWVt0aGlzLm1jUGxhY2VtZW50XTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZUxpc3RlbmVyID0gKCkgPT4gdGhpcy51cGRhdGVQb3NpdGlvbigpO1xufVxuIl19
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, ScrollDispatcher, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { EventEmitter, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Output, InjectionToken, Directive, NgZone, ViewContainerRef, Inject, Optional, Input, NgModule } from '@angular/core';
import { __spread, __assign } from 'tslib';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentPortal } from '@angular/cdk/portal';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { EXTENDED_OVERLAY_POSITIONS, POSITION_MAP, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * @fileoverview added by tsickle
 * Generated from: popover-animations.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var mcPopoverAnimations = {
    /**
     * Animation that transitions a tooltip in and out.
     */
    popoverState: trigger('state', [
        state('initial', style({
            opacity: 0,
            transform: 'scale(1, 0.8)'
        })),
        transition('* => visible', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
            opacity: 1,
            transform: 'scale(1, 1)'
        }))),
        transition('* => hidden', animate('100ms linear', style({ opacity: 0 })))
    ])
};

/**
 * @fileoverview added by tsickle
 * Generated from: popover.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                    styles: ["@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px);background-size:29px 29px;-webkit-animation:1s linear infinite mc-progress;animation:1s linear infinite mc-progress}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;display:block;margin:0;border-radius:4px;border-width:1px;border-style:solid;padding:0;box-sizing:border-box;visibility:visible;z-index:1060;list-style:none;white-space:pre-line}.mc-popover-small{max-width:280px}.mc-popover-small .mc-popover{max-width:280px!important}.mc-popover-normal{max-width:400px}.mc-popover-normal .mc-popover{max-width:400px!important}.mc-popover-large{max-width:640px}.mc-popover-large .mc-popover{max-width:640px!important}.mc-popover__container{border-radius:4px;overflow:hidden}.mc-popover__header{padding:10px 16px;border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{padding:16px}.mc-popover__footer{margin-top:8px;padding:12px 16px;border-top-width:1px;border-top-style:solid}.mc-popover_placement-top .mc-popover,.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover{margin-bottom:10px}.mc-popover_placement-right .mc-popover,.mc-popover_placement-right-bottom .mc-popover,.mc-popover_placement-right-top .mc-popover{margin-left:10px}.mc-popover_placement-bottom .mc-popover,.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover{margin-top:10px}.mc-popover_placement-left .mc-popover,.mc-popover_placement-left-bottom .mc-popover,.mc-popover_placement-left-top .mc-popover{margin-left:-10px}.mc-popover__arrow{position:absolute;z-index:-1;width:14px;height:14px;border:1px solid;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:-8px;left:50%;margin-left:-6px}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-8px;left:20px;margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-8px;right:20px;margin-left:0}.mc-popover_placement-right .mc-popover__arrow{left:-8px;top:50%;margin-top:-6px}.mc-popover_placement-right-top .mc-popover__arrow{left:-8px;top:20px;margin-top:-6px}.mc-popover_placement-right-bottom .mc-popover__arrow{left:-8px;bottom:14px;margin-top:-6px}.mc-popover_placement-left .mc-popover__arrow{right:-8px;top:50%;margin-top:-6px}.mc-popover_placement-left-top .mc-popover__arrow{right:-8px;top:20px;margin-top:-6px}.mc-popover_placement-left-bottom .mc-popover__arrow{right:-8px;bottom:14px;margin-top:-6px}.mc-popover_placement-bottom .mc-popover__arrow{top:-8px;left:50%;margin-left:-6px}.mc-popover_placement-bottom-left .mc-popover__arrow{top:-8px;left:20px;margin-left:0}.mc-popover_placement-bottom-right .mc-popover__arrow{top:-8px;right:20px;margin-left:0}"]
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
var MC_POPOVER_SCROLL_STRATEGY = new InjectionToken('mc-popover-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function mcPopoverScrollStrategyFactory(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition({ scrollThrottle: 20 }); });
}
/**
 * \@docs-private
 * @type {?}
 */
var MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_POPOVER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcPopoverScrollStrategyFactory
};
/**
 * Creates an error to be thrown if the user supplied an invalid popover position.
 * @param {?} position
 * @return {?}
 */
function getMcPopoverInvalidPositionError(position) {
    return Error("McPopover position \"" + position + "\" is invalid.");
}
/** @type {?} */
var VIEWPORT_MARGIN = 8;
/**
 * \@docs-private
 * Minimal width of anchor element should be equal or greater than popover arrow width plus arrow offset right/left
 * MIN_ANCHOR_ELEMENT_WIDTH used for positioning update inside handlePositionUpdate()
 * @type {?}
 */
var MIN_ANCHOR_ELEMENT_WIDTH = 40;
var McPopover = /** @class */ (function () {
    function McPopover(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
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
        this.$unsubscribe = new Subject();
        this._disabled = false;
        this._mcTrigger = PopoverTriggers.Click;
        this.popoverSize = 'normal';
        this._mcPlacement = 'top';
        this.manualListeners = new Map();
        this.destroyed = new Subject();
        this.availablePositions = POSITION_MAP;
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
            return this.overlayRef;
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
        strategy.positionChanges.pipe(takeUntil(this.destroyed)).subscribe((/**
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
        if (this.mcTrigger === PopoverTriggers.Click) {
            this.overlayRef.backdropClick()
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
        if (this.overlayRef && this.overlayRef.hasAttached() && this.popover) {
            this.overlayRef.detach();
            this.popover = null;
        }
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
        if (this.popover) {
            this.updateCompValue('classList', this.classList);
            this.popover.markForCheck();
        }
        this.handlePositionUpdate();
    };
    /**
     * @return {?}
     */
    McPopover.prototype.handlePositionUpdate = /**
     * @return {?}
     */
    function () {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        /** @type {?} */
        var verticalOffset = this.hostView.element.nativeElement.clientHeight / 2;
        // tslint:disable-line
        /** @type {?} */
        var anchorElementWidth = this.hostView.element.nativeElement.clientWidth;
        if (this.mcPlacement === 'rightTop' || this.mcPlacement === 'leftTop') {
            /** @type {?} */
            var currentContainer = this.overlayRef.overlayElement.style.top || '0px';
            this.overlayRef.overlayElement.style.top =
                parseInt(currentContainer.split('px')[0], 10) + verticalOffset - 20 + "px"; // tslint:disable-line
        }
        if (this.mcPlacement === 'rightBottom' || this.mcPlacement === 'leftBottom') {
            /** @type {?} */
            var currentContainer = this.overlayRef.overlayElement.style.bottom || '0px';
            this.overlayRef.overlayElement.style.bottom =
                parseInt(currentContainer.split('px')[0], 10) + verticalOffset - 22 + "px"; // tslint:disable-line
        }
        if ((this.mcPlacement === 'topRight' || this.mcPlacement === 'bottomRight') &&
            anchorElementWidth < MIN_ANCHOR_ELEMENT_WIDTH) {
            /** @type {?} */
            var currentContainer = this.overlayRef.overlayElement.style.right || '0px';
            this.overlayRef.overlayElement.style.right =
                parseInt(currentContainer.split('px')[0], 10) - 18 + "px"; // tslint:disable-line
        }
        if ((this.mcPlacement === 'topLeft' || this.mcPlacement === 'bottomLeft') &&
            anchorElementWidth < MIN_ANCHOR_ELEMENT_WIDTH) {
            /** @type {?} */
            var currentContainer = this.overlayRef.overlayElement.style.left || '0px';
            this.overlayRef.overlayElement.style.left =
                parseInt(currentContainer.split('px')[0], 10) - 20 + "px"; // tslint:disable-line
        }
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
    McPopover.prototype.show = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.disabled) {
            if (!this.popover) {
                /** @type {?} */
                var overlayRef = this.createOverlay();
                this.detach();
                this.portal = this.portal || new ComponentPortal(McPopoverComponent, this.hostView);
                this.popover = overlayRef.attach(this.portal).instance;
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
                this.mcVisibleChange.emit(this.popover.mcVisible);
                this.popover.afterHidden()
                    .pipe(takeUntil(this.destroyed))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.detach(); }));
            }
            this.updatePosition();
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
        /** @type {?} */
        var origin = this.getOrigin();
        /** @type {?} */
        var overlay = this.getOverlayPosition();
        position.withPositions([
            __assign(__assign({}, origin.main), overlay.main),
            __assign(__assign({}, origin.fallback), overlay.fallback)
        ]);
        //
        // FIXME: Необходимо в некоторых моментах форсировать позиционировать только после рендеринга всего контента
        //
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
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     * @return {?}
     */
    McPopover.prototype.getOrigin = /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     * @return {?}
     */
    function () {
        /** @type {?} */
        var originPosition;
        /** @type {?} */
        var originXPosition = this.getOriginXaxis();
        /** @type {?} */
        var originYPosition = this.getOriginYaxis();
        originPosition = { originX: originXPosition, originY: originYPosition };
        var _a = this.invertPosition(originPosition.originX, originPosition.originY), x = _a.x, y = _a.y;
        return {
            main: originPosition,
            fallback: { originX: x, originY: y }
        };
    };
    /**
     * @return {?}
     */
    McPopover.prototype.getOriginXaxis = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var position = this.mcPlacement;
        /** @type {?} */
        var origX;
        /** @type {?} */
        var isLtr = !this.direction || this.direction.value === 'ltr';
        if (position === 'top' || position === 'bottom') {
            origX = 'center';
        }
        else if (position.toLowerCase().includes('right') && !isLtr ||
            position.toLowerCase().includes('left') && isLtr) {
            origX = 'start';
        }
        else if (position.toLowerCase().includes('right') && isLtr ||
            position.toLowerCase().includes('left') && !isLtr) {
            origX = 'end';
        }
        else {
            throw getMcPopoverInvalidPositionError(position);
        }
        return origX;
    };
    /**
     * @return {?}
     */
    McPopover.prototype.getOriginYaxis = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var position = this.mcPlacement;
        /** @type {?} */
        var origY;
        if (position === 'right' || position === 'left') {
            origY = 'center';
        }
        else if (position.toLowerCase().includes('top')) {
            origY = 'top';
        }
        else if (position.toLowerCase().includes('bottom')) {
            origY = 'bottom';
        }
        else {
            throw getMcPopoverInvalidPositionError(position);
        }
        return origY;
    };
    /** Returns the overlay position and a fallback position based on the user's preference */
    /**
     * Returns the overlay position and a fallback position based on the user's preference
     * @return {?}
     */
    McPopover.prototype.getOverlayPosition = /**
     * Returns the overlay position and a fallback position based on the user's preference
     * @return {?}
     */
    function () {
        /** @type {?} */
        var position = this.mcPlacement;
        /** @type {?} */
        var overlayPosition;
        if (this.availablePositions[position]) {
            overlayPosition = {
                overlayX: this.availablePositions[position].overlayX,
                overlayY: this.availablePositions[position].overlayY
            };
        }
        else {
            throw getMcPopoverInvalidPositionError(position);
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
    McPopover.prototype.invertPosition = /**
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
        mcHeader: [{ type: Input, args: ['mcPopoverHeader',] }],
        mcContent: [{ type: Input, args: ['mcPopoverContent',] }],
        mcFooter: [{ type: Input, args: ['mcPopoverFooter',] }],
        disabled: [{ type: Input, args: ['mcPopoverDisabled',] }],
        mcMouseEnterDelay: [{ type: Input, args: ['mcPopoverMouseEnterDelay',] }],
        mcMouseLeaveDelay: [{ type: Input, args: ['mcPopoverMouseLeaveDelay',] }],
        mcTrigger: [{ type: Input, args: ['mcPopoverTrigger',] }],
        mcPopoverSize: [{ type: Input, args: ['mcPopoverSize',] }],
        mcPlacement: [{ type: Input, args: ['mcPopoverPlacement',] }],
        classList: [{ type: Input, args: ['mcPopoverClass',] }],
        mcVisible: [{ type: Input, args: ['mcPopoverVisible',] }]
    };
    return McPopover;
}());
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
    McPopover.prototype.popover;
    /** @type {?} */
    McPopover.prototype.mcVisibleChange;
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

/**
 * @fileoverview added by tsickle
 * Generated from: popover.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var McPopoverModule = /** @class */ (function () {
    function McPopoverModule() {
    }
    McPopoverModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [McPopoverComponent, McPopover],
                    exports: [A11yModule, McPopoverComponent, McPopover],
                    imports: [CommonModule, OverlayModule],
                    providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McPopoverComponent]
                },] }
    ];
    return McPopoverModule;
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
 * Generated from: ptsecurity-mosaic-popover.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MC_POPOVER_SCROLL_STRATEGY, MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER, McPopover, McPopoverComponent, McPopoverModule, PopoverVisibility, getMcPopoverInvalidPositionError, mcPopoverAnimations, mcPopoverScrollStrategyFactory };
//# sourceMappingURL=ptsecurity-mosaic-popover.js.map

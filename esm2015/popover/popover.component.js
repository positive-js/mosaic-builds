/**
 * @fileoverview added by tsickle
 * Generated from: popover.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { DEFAULT_4_POSITIONS_TO_CSS_MAP, EXTENDED_OVERLAY_POSITIONS, POSITION_MAP, POSITION_PRIORITY_STRATEGY, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, merge, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { mcPopoverAnimations } from './popover-animations';
/** @enum {string} */
const PopoverTriggers = {
    Click: "click",
    Focus: "focus",
    Hover: "hover",
};
/** @enum {string} */
const PopoverVisibility = {
    Initial: "initial",
    Visible: "visible",
    Hidden: "hidden",
};
export { PopoverVisibility };
export class McPopoverComponent {
    /**
     * @param {?} changeDetectorRef
     * @param {?} componentElementRef
     */
    constructor(changeDetectorRef, componentElementRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.componentElementRef = componentElementRef;
        this.positions = [...EXTENDED_OVERLAY_POSITIONS];
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
    /**
     * @return {?}
     */
    get mcTrigger() {
        return this._mcTrigger;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcTrigger(value) {
        this._mcTrigger = value;
    }
    /**
     * @return {?}
     */
    get mcPlacement() {
        return this._mcPlacement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcPlacement(value) {
        if (value !== this._mcPlacement) {
            this._mcPlacement = value;
            this.positions.unshift(POSITION_MAP[this.mcPlacement]);
        }
        else if (!value) {
            this._mcPlacement = 'top';
        }
    }
    /**
     * @return {?}
     */
    get mcPopoverSize() {
        return this.popoverSize;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcPopoverSize(value) {
        if (value !== this.popoverSize) {
            this.popoverSize = value;
        }
        else if (!value) {
            this.popoverSize = 'normal';
        }
    }
    /**
     * @return {?}
     */
    get mcVisible() {
        return this._mcVisible.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcVisible(value) {
        /** @type {?} */
        const visible = coerceBooleanProperty(value);
        if (this._mcVisible.value !== visible) {
            this._mcVisible.next(visible);
            this.mcVisibleChange.emit(visible);
        }
    }
    /**
     * @return {?}
     */
    get classList() {
        return this._classList.join(' ');
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set classList(value) {
        /** @type {?} */
        let list = [];
        if (Array.isArray(value)) {
            list = value;
        }
        else {
            list.push(value);
        }
        this._classList = list;
    }
    /**
     * @return {?}
     */
    get getCssClassesList() {
        return `${this.classList} mc-popover-${this.mcPopoverSize} mc-popover_placement-${this.getPlacementClass}`;
    }
    /**
     * @return {?}
     */
    get getPlacementClass() {
        return POSITION_TO_CSS_MAP[this.mcPlacement];
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this.popoverVisibility === PopoverVisibility.Visible;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleKeydown(e) {
        // tslint:disable-next-line: deprecation
        if (this.isOpen && e.keyCode === ESCAPE) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    show() {
        if (this.isNonEmptyContent()) {
            this.closeOnInteraction = true;
            this.popoverVisibility = PopoverVisibility.Visible;
            this._mcVisible.next(true);
            this.mcVisibleChange.emit(true);
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.popoverVisibility = PopoverVisibility.Hidden;
        this._mcVisible.next(false);
        this.mcVisibleChange.emit(false);
        // Mark for check so if any parent component has set the
        // ChangeDetectionStrategy to OnPush it will be checked anyways
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    isNonEmptyContent() {
        return !!this.mcContent && (this.isTemplateRef(this.mcContent) || this.isNonEmptyString(this.mcContent));
    }
    /**
     * Returns an observable that notifies when the popover has been hidden from view.
     * @return {?}
     */
    afterHidden() {
        return this.onHideSubject.asObservable();
    }
    /**
     * @return {?}
     */
    isVisible() {
        return this.popoverVisibility === PopoverVisibility.Visible;
    }
    /**
     * @return {?}
     */
    markForCheck() {
        this.changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isNonEmptyString(value) {
        return typeof value === 'string' && value !== '';
    }
    /**
     * @return {?}
     */
    animationStart() {
        this.closeOnInteraction = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    animationDone(event) {
        /** @type {?} */
        const toState = (/** @type {?} */ (event.toState));
        if (toState === PopoverVisibility.Hidden && !this.isVisible()) {
            this.onHideSubject.next();
        }
        if (toState === PopoverVisibility.Visible || toState === PopoverVisibility.Hidden) {
            this.closeOnInteraction = true;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.onHideSubject.complete();
    }
}
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
                styles: ["@-webkit-keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{-webkit-animation:mc-progress 1s linear infinite;animation:mc-progress 1s linear infinite;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 0,transparent 20px,rgba(0,0,0,.05) 0,rgba(0,0,0,.05) 30px,transparent 0) repeat;background-size:29px 29px;border-radius:inherit;bottom:0;content:\"\";left:0;position:absolute;right:0;top:0}.cdk-overlay-container{height:100%;pointer-events:none;position:fixed;width:100%}.cdk-overlay-backdrop,.cdk-overlay-container{box-sizing:border-box;left:0;margin:0;padding:0;top:0;z-index:1000}.cdk-overlay-backdrop{-webkit-tap-highlight-color:transparent;bottom:0;opacity:0;pointer-events:auto;position:absolute;right:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.cdk-overlay-pane{max-height:100%;max-width:100%;pointer-events:auto}.cdk-overlay-connected-position-bounding-box,.cdk-overlay-pane{box-sizing:border-box;margin:0;padding:0;position:absolute;z-index:1000}.cdk-overlay-connected-position-bounding-box{display:flex;flex-direction:column;min-height:1px;min-width:1px}.mc-popover{border-radius:4px;border-style:solid;border-width:1px;box-sizing:border-box;display:block;list-style:none;margin:0;padding:0;position:relative;visibility:visible;white-space:pre-line;z-index:1060}.mc-popover-small,.mc-popover-small .mc-popover{max-width:280px}.mc-popover-normal,.mc-popover-normal .mc-popover{max-width:400px}.mc-popover-large,.mc-popover-large .mc-popover{max-width:640px}.mc-popover__container{border-radius:4px;overflow:hidden}.mc-popover__header{border-bottom-style:solid;border-bottom-width:1px;padding:10px 16px}.mc-popover__content{padding:16px}.mc-popover__footer{border-top-style:solid;border-top-width:1px;margin-top:8px;padding:12px 16px}.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover,.mc-popover_placement-top .mc-popover{margin-bottom:8px}.mc-popover_placement-right-bottom .mc-popover,.mc-popover_placement-right-top .mc-popover,.mc-popover_placement-right .mc-popover{margin-left:8px}.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover,.mc-popover_placement-bottom .mc-popover{margin-top:8px}.mc-popover_placement-left-bottom .mc-popover,.mc-popover_placement-left-top .mc-popover,.mc-popover_placement-left .mc-popover{margin-right:8px}.mc-popover__arrow{border:1px solid;height:14px;position:absolute;transform:rotate(45deg);width:14px;z-index:-1}.mc-popover_placement-top .mc-popover__arrow{bottom:-6px;left:50%;margin-left:-4px}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-6px;left:20px;margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-6px;margin-left:0;right:20px}.mc-popover_placement-right .mc-popover__arrow{left:-6px;margin-top:-4px;top:50%}.mc-popover_placement-right-top .mc-popover__arrow{left:-6px;margin-top:-4px;top:18px}.mc-popover_placement-right-bottom .mc-popover__arrow{bottom:14px;left:-6px;margin-top:-4px}.mc-popover_placement-left .mc-popover__arrow{margin-top:-4px;right:-6px;top:50%}.mc-popover_placement-left-top .mc-popover__arrow{margin-top:-4px;right:-6px;top:18px}.mc-popover_placement-left-bottom .mc-popover__arrow{bottom:14px;margin-top:-4px;right:-6px}.mc-popover_placement-bottom .mc-popover__arrow{left:50%;margin-left:-4px;top:-6px}.mc-popover_placement-bottom-left .mc-popover__arrow{left:20px;margin-left:0;top:-6px}.mc-popover_placement-bottom-right .mc-popover__arrow{margin-left:0;right:20px;top:-6px}"]
            }] }
];
/** @nocollapse */
McPopoverComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
McPopoverComponent.propDecorators = {
    mcVisibleChange: [{ type: Output, args: ['mcPopoverVisibleChange',] }]
};
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
export const MC_POPOVER_SCROLL_STRATEGY = new InjectionToken('mc-popover-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function mcPopoverScrollStrategyFactory(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 }));
}
/**
 * \@docs-private
 * @type {?}
 */
export const MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
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
    return Error(`McPopover position "${position}" is invalid.`);
}
/** @type {?} */
const VIEWPORT_MARGIN = 8;
/* Constant distance between popover container border
*  corner according to popover placement and middle of arrow
* */
/** @type {?} */
const POPOVER_ARROW_BORDER_DISTANCE = 20;
// tslint:disable-line
/* Constant value for min height and width of anchor element used for popover.
*  Set as POPOVER_ARROW_BORDER_DISTANCE multiplied by 2
*  plus 2px border for both sides of element. Used in check of position management.
* */
/** @type {?} */
const ANCHOR_MIN_HEIGHT_WIDTH = 44;
// tslint:disable-line
export class McPopover {
    /**
     * @param {?} overlay
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} scrollDispatcher
     * @param {?} hostView
     * @param {?} scrollStrategy
     * @param {?} direction
     */
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        this.overlay = overlay;
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.scrollDispatcher = scrollDispatcher;
        this.hostView = hostView;
        this.scrollStrategy = scrollStrategy;
        this.direction = direction;
        this.isPopoverOpen = false;
        this.isDynamicPopover = false;
        this.backdropClass = 'cdk-overlay-transparent-backdrop';
        this.mcVisibleChange = new EventEmitter();
        this.mcPositionStrategyPlacementChange = new EventEmitter();
        this._hasBackdrop = false;
        this.$unsubscribe = new Subject();
        this._disabled = false;
        this._mcTrigger = PopoverTriggers.Click;
        this.popoverSize = 'normal';
        this._mcPlacementPriority = null;
        this._mcPlacement = 'top';
        this.closeSubscription = Subscription.EMPTY;
        this.manualListeners = new Map();
        this.destroyed = new Subject();
        this.resizeListener = (/**
         * @return {?}
         */
        () => this.updatePosition());
        this.availablePositions = POSITION_MAP;
        this.defaultPositionsMap = DEFAULT_4_POSITIONS_TO_CSS_MAP;
    }
    /**
     * @return {?}
     */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get mcHeader() {
        return this._mcHeader;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcHeader(value) {
        this._mcHeader = value;
        this.updateCompValue('mcHeader', value);
        if (this.isPopoverOpen) {
            this.updatePosition(true);
        }
    }
    /**
     * @return {?}
     */
    get mcContent() {
        return this._mcContent;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcContent(value) {
        this._mcContent = value;
        this.updateCompValue('mcContent', value);
        if (this.isPopoverOpen) {
            this.updatePosition(true);
        }
    }
    /**
     * @return {?}
     */
    get mcFooter() {
        return this._mcFooter;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcFooter(value) {
        this._mcFooter = value;
        this.updateCompValue('mcFooter', value);
        if (this.isPopoverOpen) {
            this.updatePosition(true);
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get mcMouseEnterDelay() {
        return this._mcMouseEnterDelay;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcMouseEnterDelay(value) {
        this._mcMouseEnterDelay = value;
        this.updateCompValue('mcMouseEnterDelay', value);
    }
    /**
     * @return {?}
     */
    get mcMouseLeaveDelay() {
        return this._mcMouseLeaveDelay;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcMouseLeaveDelay(value) {
        this._mcMouseLeaveDelay = value;
        this.updateCompValue('mcMouseLeaveDelay', value);
    }
    /**
     * @return {?}
     */
    get mcTrigger() {
        return this._mcTrigger;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcTrigger(value) {
        if (value) {
            this._mcTrigger = value;
            this.updateCompValue('mcTrigger', value);
        }
        else {
            this._mcTrigger = PopoverTriggers.Click;
        }
        this.resetListeners();
    }
    /**
     * @return {?}
     */
    get mcPopoverSize() {
        return this.popoverSize;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcPopoverSize(value) {
        if (value && (value === 'small' || value === 'normal' || value === 'large')) {
            this.popoverSize = value;
            this.updateCompValue('mcPopoverSize', value);
        }
        else {
            this.popoverSize = 'normal';
        }
    }
    /**
     * @return {?}
     */
    get mcPlacementPriority() {
        return this._mcPlacementPriority;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcPlacementPriority(value) {
        if (value && value.length > 0) {
            this._mcPlacementPriority = value;
        }
        else {
            this._mcPlacementPriority = null;
        }
    }
    /**
     * @return {?}
     */
    get mcPlacement() {
        return this._mcPlacement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcPlacement(value) {
        if (value) {
            this._mcPlacement = value;
            this.updateCompValue('mcPlacement', value);
        }
        else {
            this._mcPlacement = 'top';
        }
    }
    /**
     * @return {?}
     */
    get classList() {
        return this._classList;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set classList(value) {
        this._classList = value;
        this.updateCompValue('classList', this._classList);
    }
    /**
     * @return {?}
     */
    get mcVisible() {
        return this._mcVisible;
    }
    /**
     * @param {?} externalValue
     * @return {?}
     */
    set mcVisible(externalValue) {
        /** @type {?} */
        const value = coerceBooleanProperty(externalValue);
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
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this.isPopoverOpen;
    }
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    createOverlay() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        // Create connected position strategy that listens for scroll events to reposition.
        /** @type {?} */
        const strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-popover')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions([...EXTENDED_OVERLAY_POSITIONS]);
        /** @type {?} */
        const scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} change
         * @return {?}
         */
        (change) => {
            if (this.popover) {
                this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && this.popover.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the popover.
                    this.ngZone.run((/**
                     * @return {?}
                     */
                    () => this.hide()));
                }
            }
        }));
        this.overlayRef = this.overlay.create({
            direction: this.direction,
            positionStrategy: strategy,
            panelClass: 'mc-popover__panel',
            scrollStrategy: this.scrollStrategy(),
            hasBackdrop: this.hasBackdrop,
            backdropClass: this.backdropClass
        });
        this.closeSubscription = this.closingActions()
            .subscribe((/**
         * @return {?}
         */
        () => this.hide()));
        this.updatePosition();
        this.overlayRef.detachments()
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => this.detach()));
        return this.overlayRef;
    }
    /**
     * @return {?}
     */
    detach() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.popover = null;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onPositionChange($event) {
        /** @type {?} */
        let updatedPlacement = this.mcPlacement;
        Object.keys(this.availablePositions).some((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if ($event.connectionPair.originX === this.availablePositions[key].originX &&
                $event.connectionPair.originY === this.availablePositions[key].originY &&
                $event.connectionPair.overlayX === this.availablePositions[key].overlayX &&
                $event.connectionPair.overlayY === this.availablePositions[key].overlayY) {
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
    }
    /**
     * @param {?} updatedPlacement
     * @return {?}
     */
    handlePositionUpdate(updatedPlacement) {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        /** @type {?} */
        const currentContainer = this.overlayRef.overlayElement.style;
        /** @type {?} */
        const elementHeight = this.hostView.element.nativeElement.clientHeight;
        /** @type {?} */
        const elementWidth = this.hostView.element.nativeElement.clientWidth;
        /** @type {?} */
        const verticalOffset = Math.floor(elementHeight / 2);
        // tslint:disable-line
        /** @type {?} */
        const horizontalOffset = Math.floor(elementWidth / 2 - 6);
        // tslint:disable-line
        /** @type {?} */
        const offsets = {
            top: verticalOffset,
            bottom: verticalOffset,
            right: horizontalOffset,
            left: horizontalOffset
        };
        /** @type {?} */
        const styleProperty = updatedPlacement.split(/(?=[A-Z])/)[1].toLowerCase();
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
            `${parseInt(currentContainer[styleProperty].split('px')[0], 10) +
                offsets[styleProperty] - POPOVER_ARROW_BORDER_DISTANCE}px`;
    }
    // tslint:disable-next-line:no-any
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    updateCompValue(key, value) {
        if (this.isDynamicPopover && value) {
            if (this.popover) {
                this.popover[key] = value;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initElementRefListeners();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.manualListeners.forEach((/**
         * @param {?} listener
         * @param {?} event
         * @return {?}
         */
        (listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        }));
        this.manualListeners.clear();
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
        this.closeSubscription.unsubscribe();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleKeydown(e) {
        // tslint:disable-next-line: deprecation
        if (this.isOpen && e.keyCode === ESCAPE) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    handleTouchend() {
        this.hide();
    }
    /**
     * @return {?}
     */
    initElementRefListeners() {
        if (this.mcTrigger === PopoverTriggers.Click) {
            this.manualListeners
                .set('click', (/**
             * @return {?}
             */
            () => this.show()))
                .forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            (listener, event) => {
                this.elementRef.nativeElement.addEventListener(event, listener);
            }));
        }
        else if (this.mcTrigger === PopoverTriggers.Hover) {
            this.manualListeners
                .set('mouseenter', (/**
             * @return {?}
             */
            () => this.show()))
                .set('mouseleave', (/**
             * @return {?}
             */
            () => this.hide()))
                .forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            (listener, event) => {
                this.elementRef.nativeElement.addEventListener(event, listener);
            }));
        }
        else if (this.mcTrigger === PopoverTriggers.Focus) {
            this.manualListeners
                .set('focus', (/**
             * @return {?}
             */
            () => this.show()))
                .set('blur', (/**
             * @return {?}
             */
            () => this.hide()))
                .forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            (listener, event) => {
                this.elementRef.nativeElement.addEventListener(event, listener);
            }));
        }
    }
    /**
     * @return {?}
     */
    registerResizeHandler() {
        // The resize handler is currently responsible for detecting slider dimension
        // changes and therefore doesn't cause a value change that needs to be propagated.
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.addEventListener('resize', this.resizeListener);
        }));
    }
    /**
     * @return {?}
     */
    deregisterResizeHandler() {
        window.removeEventListener('resize', this.resizeListener);
    }
    /**
     * @return {?}
     */
    resetListeners() {
        if (this.manualListeners.size) {
            this.manualListeners.forEach((/**
             * @param {?} listener
             * @param {?} event
             * @return {?}
             */
            (listener, event) => {
                this.elementRef.nativeElement.removeEventListener(event, listener);
            }));
            this.manualListeners.clear();
            this.initElementRefListeners();
        }
    }
    /**
     * @return {?}
     */
    show() {
        if (this.disabled) {
            return;
        }
        if (!this.popover) {
            this.detach();
            /** @type {?} */
            const overlayRef = this.createOverlay();
            this.portal = this.portal || new ComponentPortal(McPopoverComponent, this.hostView);
            this.popover = overlayRef.attach(this.portal).instance;
            this.popover.afterHidden()
                .pipe(takeUntil(this.destroyed))
                .subscribe((/**
             * @return {?}
             */
            () => this.detach()));
            this.isDynamicPopover = true;
            /** @type {?} */
            const properties = [
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
            (property) => this.updateCompValue(property, this[property])));
            this.popover.mcVisibleChange
                .pipe(takeUntil(this.$unsubscribe), distinctUntilChanged())
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                this.mcVisible = data;
                this.mcVisibleChange.emit(data);
                this.isPopoverOpen = data;
            }));
        }
        this.popover.show();
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.popover) {
            this.popover.hide();
        }
    }
    /**
     * Updates the position of the current popover.
     * @param {?=} reapplyPosition
     * @return {?}
     */
    updatePosition(reapplyPosition = false) {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        /** @type {?} */
        const position = (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
        position.withPositions(this.getPrioritizedPositions()).withPush(true);
        if (reapplyPosition) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                position.reapplyLastPosition();
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    closingActions() {
        /** @type {?} */
        const backdrop = (/** @type {?} */ (this.overlayRef)).backdropClick();
        /** @type {?} */
        const outsidePointerEvents = (/** @type {?} */ (this.overlayRef)).outsidePointerEvents();
        /** @type {?} */
        const detachments = (/** @type {?} */ (this.overlayRef)).detachments();
        return merge(backdrop, outsidePointerEvents, detachments);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getPriorityPlacementStrategy(value) {
        /** @type {?} */
        const result = [];
        /** @type {?} */
        const possiblePositions = Object.keys(this.availablePositions);
        if (Array.isArray(value)) {
            value.forEach((/**
             * @param {?} position
             * @return {?}
             */
            (position) => {
                if (possiblePositions.includes(position)) {
                    result.push(this.availablePositions[position]);
                }
            }));
        }
        else if (possiblePositions.includes(value)) {
            result.push(this.availablePositions[value]);
        }
        return result;
    }
    /**
     * @private
     * @return {?}
     */
    getPrioritizedPositions() {
        if (this.mcPlacementPriority) {
            return this.getPriorityPlacementStrategy(this.mcPlacementPriority);
        }
        return POSITION_PRIORITY_STRATEGY[this.mcPlacement];
    }
}
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
McPopover.ctorParameters = () => [
    { type: Overlay },
    { type: ElementRef },
    { type: NgZone },
    { type: ScrollDispatcher },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [MC_POPOVER_SCROLL_STRATEGY,] }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
McPopover.propDecorators = {
    backdropClass: [{ type: Input }],
    mcVisibleChange: [{ type: Output, args: ['mcPopoverVisibleChange',] }],
    mcPositionStrategyPlacementChange: [{ type: Output, args: ['mcPopoverPositionStrategyPlacementChange',] }],
    hasBackdrop: [{ type: Input }],
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
    McPopover.prototype.backdropClass;
    /** @type {?} */
    McPopover.prototype.mcVisibleChange;
    /** @type {?} */
    McPopover.prototype.mcPositionStrategyPlacementChange;
    /**
     * @type {?}
     * @private
     */
    McPopover.prototype._hasBackdrop;
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
    McPopover.prototype.closeSubscription;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9wb3BvdmVyLyIsInNvdXJjZXMiOlsicG9wb3Zlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUlILE9BQU8sRUFFUCxnQkFBZ0IsRUFFbkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQ0gsOEJBQThCLEVBQzlCLDBCQUEwQixFQUMxQixZQUFZLEVBQUUsMEJBQTBCLEVBQ3hDLG1CQUFtQixFQUN0QixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUczRCxNQUFLLGVBQWU7SUFDaEIsS0FBSyxTQUFVO0lBQ2YsS0FBSyxT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Riw4QkFBaUQ7Ozs7O0lBZ1VqRCxtQ0FBcUQ7Ozs7O0lBN1RqRCw0QkFBd0I7Ozs7O0lBQ3hCLCtCQUE4Qjs7Ozs7SUFDOUIsMkJBQXNCOzs7OztJQUN0QixxQ0FBMEM7Ozs7O0lBQzFDLDZCQUFrQzs7Ozs7SUFDbEMsbUNBQTBEOzs7OztJQUMxRCw4QkFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsXG4gICAgQ29ubmVjdGlvblBvc2l0aW9uUGFpcixcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5UmVmLFxuICAgIFNjcm9sbERpc3BhdGNoZXIsXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgREVGQVVMVF80X1BPU0lUSU9OU19UT19DU1NfTUFQLFxuICAgIEVYVEVOREVEX09WRVJMQVlfUE9TSVRJT05TLFxuICAgIFBPU0lUSU9OX01BUCwgUE9TSVRJT05fUFJJT1JJVFlfU1RSQVRFR1ksXG4gICAgUE9TSVRJT05fVE9fQ1NTX01BUFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jUG9wb3ZlckFuaW1hdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItYW5pbWF0aW9ucyc7XG5cblxuZW51bSBQb3BvdmVyVHJpZ2dlcnMge1xuICAgIENsaWNrID0gJ2NsaWNrJyxcbiAgICBGb2N1cyA9ICdmb2N1cycsXG4gICAgSG92ZXIgPSAnaG92ZXInXG59XG5cbmV4cG9ydCBlbnVtIFBvcG92ZXJWaXNpYmlsaXR5IHtcbiAgICBJbml0aWFsID0gJ2luaXRpYWwnLFxuICAgIFZpc2libGUgPSAndmlzaWJsZScsXG4gICAgSGlkZGVuID0gJ2hpZGRlbidcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXBvcG92ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wb3BvdmVyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFttY1BvcG92ZXJBbmltYXRpb25zLnBvcG92ZXJTdGF0ZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzXSc6ICdnZXRDc3NDbGFzc2VzTGlzdCcsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQb3BvdmVyQ29tcG9uZW50IHtcbiAgICBwb3NpdGlvbnM6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFsuLi5FWFRFTkRFRF9PVkVSTEFZX1BPU0lUSU9OU107XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgcG9wb3ZlclZpc2liaWxpdHk6IFBvcG92ZXJWaXNpYmlsaXR5ID0gUG9wb3ZlclZpc2liaWxpdHkuSW5pdGlhbDtcbiAgICBjbG9zZU9uSW50ZXJhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBtY0NvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgbWNIZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgbWNGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KCdtY1BvcG92ZXJWaXNpYmxlQ2hhbmdlJykgbWNWaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVHJpZ2dlcjogc3RyaW5nID0gUG9wb3ZlclRyaWdnZXJzLkhvdmVyO1xuXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG5cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX21jUGxhY2VtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMudW5zaGlmdChQT1NJVElPTl9NQVBbIHRoaXMubWNQbGFjZW1lbnQgXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgZ2V0IG1jUG9wb3ZlclNpemUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclNpemU7XG4gICAgfVxuXG4gICAgc2V0IG1jUG9wb3ZlclNpemUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMucG9wb3ZlclNpemUpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSAnbm9ybWFsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcG9wb3ZlclNpemU6IHN0cmluZztcblxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGUudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2aXNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fbWNWaXNpYmxlLnZhbHVlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dCh2aXNpYmxlKTtcbiAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQodmlzaWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsYXNzTGlzdC5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgc2V0IGNsYXNzTGlzdCh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGxpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBsaXN0ID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2xhc3NMaXN0ID0gbGlzdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGFzc0xpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICBnZXQgZ2V0Q3NzQ2xhc3Nlc0xpc3QoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY2xhc3NMaXN0fSBtYy1wb3BvdmVyLSR7dGhpcy5tY1BvcG92ZXJTaXplfSBtYy1wb3BvdmVyX3BsYWNlbWVudC0ke3RoaXMuZ2V0UGxhY2VtZW50Q2xhc3N9YDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0UGxhY2VtZW50Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFBPU0lUSU9OX1RPX0NTU19NQVBbdGhpcy5tY1BsYWNlbWVudF07XG4gICAgfVxuXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPT09IFBvcG92ZXJWaXNpYmlsaXR5LlZpc2libGU7XG4gICAgfVxuXG4gICAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBwb3BvdmVyIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHRoZSB2aWV3ICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkhpZGVTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbXBvbmVudEVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzTm9uRW1wdHlDb250ZW50KCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlO1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPSBQb3BvdmVyVmlzaWJpbGl0eS5IaWRkZW47XG4gICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaXNOb25FbXB0eUNvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubWNDb250ZW50ICYmICh0aGlzLmlzVGVtcGxhdGVSZWYodGhpcy5tY0NvbnRlbnQpIHx8IHRoaXMuaXNOb25FbXB0eVN0cmluZyh0aGlzLm1jQ29udGVudCkpO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB3aGVuIHRoZSBwb3BvdmVyIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHZpZXcuICovXG4gICAgYWZ0ZXJIaWRkZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uSGlkZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuVmlzaWJsZTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaXNUZW1wbGF0ZVJlZih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIGlzTm9uRW1wdHlTdHJpbmcodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJyc7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uU3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG9TdGF0ZSA9IGV2ZW50LnRvU3RhdGUgYXMgUG9wb3ZlclZpc2liaWxpdHk7XG5cbiAgICAgICAgaWYgKHRvU3RhdGUgPT09IFBvcG92ZXJWaXNpYmlsaXR5LkhpZGRlbiAmJiAhdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0Lm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b1N0YXRlID09PSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlIHx8IHRvU3RhdGUgPT09IFBvcG92ZXJWaXNpYmlsaXR5LkhpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMub25IaWRlU3ViamVjdC5jb21wbGV0ZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1wb3BvdmVyLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jUG9wb3ZlclNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7c2Nyb2xsVGhyb3R0bGU6IDIwfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNQb3BvdmVyU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG4vKiogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCBwb3BvdmVyIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jUG9wb3ZlckludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRXJyb3IoYE1jUG9wb3ZlciBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIgaXMgaW52YWxpZC5gKTtcbn1cblxuY29uc3QgVklFV1BPUlRfTUFSR0lOOiBudW1iZXIgPSA4O1xuXG4vKiBDb25zdGFudCBkaXN0YW5jZSBiZXR3ZWVuIHBvcG92ZXIgY29udGFpbmVyIGJvcmRlclxuKiAgY29ybmVyIGFjY29yZGluZyB0byBwb3BvdmVyIHBsYWNlbWVudCBhbmQgbWlkZGxlIG9mIGFycm93XG4qICovXG5jb25zdCBQT1BPVkVSX0FSUk9XX0JPUkRFUl9ESVNUQU5DRTogbnVtYmVyID0gMjA7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuLyogQ29uc3RhbnQgdmFsdWUgZm9yIG1pbiBoZWlnaHQgYW5kIHdpZHRoIG9mIGFuY2hvciBlbGVtZW50IHVzZWQgZm9yIHBvcG92ZXIuXG4qICBTZXQgYXMgUE9QT1ZFUl9BUlJPV19CT1JERVJfRElTVEFOQ0UgbXVsdGlwbGllZCBieSAyXG4qICBwbHVzIDJweCBib3JkZXIgZm9yIGJvdGggc2lkZXMgb2YgZWxlbWVudC4gVXNlZCBpbiBjaGVjayBvZiBwb3NpdGlvbiBtYW5hZ2VtZW50LlxuKiAqL1xuY29uc3QgQU5DSE9SX01JTl9IRUlHSFRfV0lEVEg6IG51bWJlciA9IDQ0OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jUG9wb3Zlcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNQb3BvdmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKScsXG4gICAgICAgICdbY2xhc3MubWMtcG9wb3Zlcl9vcGVuXSc6ICdpc09wZW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1BvcG92ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgaXNQb3BvdmVyT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzRHluYW1pY1BvcG92ZXIgPSBmYWxzZTtcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNY1BvcG92ZXJDb21wb25lbnQ+O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogeyBba2V5OiBzdHJpbmddOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH07XG4gICAgZGVmYXVsdFBvc2l0aW9uc01hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICAgIHBvcG92ZXI6IE1jUG9wb3ZlckNvbXBvbmVudCB8IG51bGw7XG5cbiAgICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyVmlzaWJsZUNoYW5nZScpIG1jVmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBPdXRwdXQoJ21jUG9wb3ZlclBvc2l0aW9uU3RyYXRlZ3lQbGFjZW1lbnRDaGFuZ2UnKVxuICAgIG1jUG9zaXRpb25TdHJhdGVneVBsYWNlbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICAgIH1cblxuICAgIHNldCBoYXNCYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzQmFja2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVySGVhZGVyJylcbiAgICBnZXQgbWNIZWFkZXIoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY0hlYWRlcjtcbiAgICB9XG4gICAgc2V0IG1jSGVhZGVyKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jSGVhZGVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY0hlYWRlcicsIHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1BvcG92ZXJPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jSGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJDb250ZW50JylcbiAgICBnZXQgbWNDb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNDb250ZW50O1xuICAgIH1cbiAgICBzZXQgbWNDb250ZW50KHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jQ29udGVudCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNDb250ZW50JywgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUG9wb3Zlck9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJGb290ZXInKVxuICAgIGdldCBtY0Zvb3RlcigpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jRm9vdGVyO1xuICAgIH1cbiAgICBzZXQgbWNGb290ZXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNGb290ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jRm9vdGVyJywgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUG9wb3Zlck9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwcml2YXRlICR1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckRpc2FibGVkJylcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyTW91c2VFbnRlckRlbGF5JylcbiAgICBnZXQgbWNNb3VzZUVudGVyRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VFbnRlckRlbGF5O1xuICAgIH1cbiAgICBzZXQgbWNNb3VzZUVudGVyRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlRW50ZXJEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUVudGVyRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgX21jTW91c2VFbnRlckRlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jUG9wb3Zlck1vdXNlTGVhdmVEZWxheScpXG4gICAgZ2V0IG1jTW91c2VMZWF2ZURlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlTGVhdmVEZWxheTtcbiAgICB9XG4gICAgc2V0IG1jTW91c2VMZWF2ZURlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWNNb3VzZUxlYXZlRGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jTW91c2VMZWF2ZURlbGF5JywgdmFsdWUpO1xuICAgIH1cbiAgICBwcml2YXRlIF9tY01vdXNlTGVhdmVEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJUcmlnZ2VyJylcbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUcmlnZ2VyJywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9IFBvcG92ZXJUcmlnZ2Vycy5DbGljaztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyU2l6ZScpXG4gICAgZ2V0IG1jUG9wb3ZlclNpemUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclNpemU7XG4gICAgfVxuICAgIHNldCBtY1BvcG92ZXJTaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmICh2YWx1ZSA9PT0gJ3NtYWxsJyB8fCB2YWx1ZSA9PT0gJ25vcm1hbCcgfHwgdmFsdWUgPT09ICdsYXJnZScpKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJTaXplID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQb3BvdmVyU2l6ZScsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSAnbm9ybWFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHBvcG92ZXJTaXplOiBzdHJpbmcgPSAnbm9ybWFsJztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyUGxhY2VtZW50UHJpb3JpdHknKVxuICAgIGdldCBtY1BsYWNlbWVudFByaW9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnRQcmlvcml0eTtcbiAgICB9XG4gICAgc2V0IG1jUGxhY2VtZW50UHJpb3JpdHkodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50UHJpb3JpdHkgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50UHJpb3JpdHkgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jUGxhY2VtZW50UHJpb3JpdHk6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclBsYWNlbWVudCcpXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckNsYXNzJylcbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NMaXN0O1xuICAgIH1cbiAgICBzZXQgY2xhc3NMaXN0KHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLl9jbGFzc0xpc3QgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ2NsYXNzTGlzdCcsIHRoaXMuX2NsYXNzTGlzdCk7XG4gICAgfVxuICAgIHByaXZhdGUgX2NsYXNzTGlzdDogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclZpc2libGUnKVxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZShleHRlcm5hbFZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGV4dGVybmFsVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tY1Zpc2libGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Zpc2libGUnLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xvc2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IGJvb2xlYW47XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1BvcG92ZXJPcGVuO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFudWFsTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIHByaXZhdGUgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICAgICAgdGhpcy5kZWZhdWx0UG9zaXRpb25zTWFwID0gREVGQVVMVF80X1BPU0lUSU9OU19UT19DU1NfTUFQO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICAgIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgY29ubmVjdGVkIHBvc2l0aW9uIHN0cmF0ZWd5IHRoYXQgbGlzdGVucyBmb3Igc2Nyb2xsIGV2ZW50cyB0byByZXBvc2l0aW9uLlxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYpXG4gICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcubWMtcG9wb3ZlcicpXG4gICAgICAgICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgICAgICAgIC53aXRoVmlld3BvcnRNYXJnaW4oVklFV1BPUlRfTUFSR0lOKVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoWy4uLkVYVEVOREVEX09WRVJMQVlfUE9TSVRJT05TXSk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZUFuY2VzdG9ycyA9IHRoaXMuc2Nyb2xsRGlzcGF0Y2hlci5nZXRBbmNlc3RvclNjcm9sbENvbnRhaW5lcnModGhpcy5lbGVtZW50UmVmKTtcblxuICAgICAgICBzdHJhdGVneS53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnMoc2Nyb2xsYWJsZUFuY2VzdG9ycyk7XG5cbiAgICAgICAgc3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblBvc2l0aW9uQ2hhbmdlKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5zY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMuaXNPdmVybGF5Q2xpcHBlZCAmJiB0aGlzLnBvcG92ZXIubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIHBvc2l0aW9uIGNoYW5nZXMgb2NjdXIgYW5kIHRoZSBvdmVybGF5IGlzIGNsaXBwZWQgYnlcbiAgICAgICAgICAgICAgICAgICAgLy8gYSBwYXJlbnQgc2Nyb2xsYWJsZSB0aGVuIGNsb3NlIHRoZSBwb3BvdmVyLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogc3RyYXRlZ3ksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtcG9wb3Zlcl9fcGFuZWwnLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0aGlzLmhhc0JhY2tkcm9wLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5iYWNrZHJvcENsYXNzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLmNsb3NpbmdBY3Rpb25zKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcG92ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50OiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRQbGFjZW1lbnQgPSB0aGlzLm1jUGxhY2VtZW50O1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucykuc29tZSgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWCAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5ZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblkgJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkUGxhY2VtZW50ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdXBkYXRlZFBsYWNlbWVudCk7XG4gICAgICAgIHRoaXMubWNQb3NpdGlvblN0cmF0ZWd5UGxhY2VtZW50Q2hhbmdlLmVtaXQodXBkYXRlZFBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ2NsYXNzTGlzdCcsIHRoaXMuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kZWZhdWx0UG9zaXRpb25zTWFwW3VwZGF0ZWRQbGFjZW1lbnRdKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uVXBkYXRlKHVwZGF0ZWRQbGFjZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUG9zaXRpb25VcGRhdGUodXBkYXRlZFBsYWNlbWVudDogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGU7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmhvc3RWaWV3LmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IHRoaXMuaG9zdFZpZXcuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldDogbnVtYmVyID0gTWF0aC5mbG9vcihlbGVtZW50SGVpZ2h0IC8gMik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldDogbnVtYmVyID0gTWF0aC5mbG9vcihlbGVtZW50V2lkdGggLyAyIC0gNik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3Qgb2Zmc2V0czogeyBba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0ge1xuICAgICAgICAgICAgdG9wOiB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIGJvdHRvbTogdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICByaWdodDogaG9yaXpvbnRhbE9mZnNldCxcbiAgICAgICAgICAgIGxlZnQ6IGhvcml6b250YWxPZmZzZXRcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzdHlsZVByb3BlcnR5ID0gdXBkYXRlZFBsYWNlbWVudC5zcGxpdCgvKD89W0EtWl0pLylbMV0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoKChzdHlsZVByb3BlcnR5ID09PSAndG9wJyB8fCBzdHlsZVByb3BlcnR5ID09PSAnYm90dG9tJykgJiZcbiAgICAgICAgICAgIGVsZW1lbnRIZWlnaHQgPiBBTkNIT1JfTUlOX0hFSUdIVF9XSURUSCkgfHxcbiAgICAgICAgICAgICgoc3R5bGVQcm9wZXJ0eSA9PT0gJ2xlZnQnIHx8IHN0eWxlUHJvcGVydHkgPT09ICdyaWdodCcpICYmXG4gICAgICAgICAgICBlbGVtZW50V2lkdGggPiBBTkNIT1JfTUlOX0hFSUdIVF9XSURUSCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlW3N0eWxlUHJvcGVydHldKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGVbc3R5bGVQcm9wZXJ0eV0gPSAnMHB4JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZVtzdHlsZVByb3BlcnR5XSA9XG4gICAgICAgICAgICBgJHtwYXJzZUludChjdXJyZW50Q29udGFpbmVyW3N0eWxlUHJvcGVydHldLnNwbGl0KCdweCcpWzBdLCAxMCkgK1xuICAgICAgICAgICAgb2Zmc2V0c1tzdHlsZVByb3BlcnR5XSAtIFBPUE9WRVJfQVJST1dfQk9SREVSX0RJU1RBTkNFfXB4YDtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgdXBkYXRlQ29tcFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzRHluYW1pY1BvcG92ZXIgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcG92ZXJba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLm5leHQoKTtcbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUuY29tcGxldGUoKTtcblxuICAgICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoZW5kKCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpbml0RWxlbWVudFJlZkxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyID09PSBQb3BvdmVyVHJpZ2dlcnMuQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnY2xpY2snLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlZW50ZXInLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tY1RyaWdnZXIgPT09IFBvcG92ZXJUcmlnZ2Vycy5Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdmb2N1cycsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ2JsdXInLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgLy8gVGhlIHJlc2l6ZSBoYW5kbGVyIGlzIGN1cnJlbnRseSByZXNwb25zaWJsZSBmb3IgZGV0ZWN0aW5nIHNsaWRlciBkaW1lbnNpb25cbiAgICAgICAgLy8gY2hhbmdlcyBhbmQgdGhlcmVmb3JlIGRvZXNuJ3QgY2F1c2UgYSB2YWx1ZSBjaGFuZ2UgdGhhdCBuZWVkcyB0byBiZSBwcm9wYWdhdGVkLlxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmVzZXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hbnVhbExpc3RlbmVycy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoIXRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSB0aGlzLnBvcnRhbCB8fCBuZXcgQ29tcG9uZW50UG9ydGFsKE1jUG9wb3ZlckNvbXBvbmVudCwgdGhpcy5ob3N0Vmlldyk7XG5cbiAgICAgICAgICAgIHRoaXMucG9wb3ZlciA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKS5pbnN0YW5jZTtcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5hZnRlckhpZGRlbigpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuXG4gICAgICAgICAgICB0aGlzLmlzRHluYW1pY1BvcG92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IFtcbiAgICAgICAgICAgICAgICAnbWNQbGFjZW1lbnQnLFxuICAgICAgICAgICAgICAgICdtY1BvcG92ZXJTaXplJyxcbiAgICAgICAgICAgICAgICAnbWNUcmlnZ2VyJyxcbiAgICAgICAgICAgICAgICAnbWNNb3VzZUVudGVyRGVsYXknLFxuICAgICAgICAgICAgICAgICdtY01vdXNlTGVhdmVEZWxheScsXG4gICAgICAgICAgICAgICAgJ2NsYXNzTGlzdCcsXG4gICAgICAgICAgICAgICAgJ21jVmlzaWJsZScsXG4gICAgICAgICAgICAgICAgJ21jSGVhZGVyJyxcbiAgICAgICAgICAgICAgICAnbWNDb250ZW50JyxcbiAgICAgICAgICAgICAgICAnbWNGb290ZXInXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB0aGlzLnVwZGF0ZUNvbXBWYWx1ZShwcm9wZXJ0eSwgdGhpc1twcm9wZXJ0eV0pKTtcblxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyLm1jVmlzaWJsZUNoYW5nZVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLiR1bnN1YnNjcmliZSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQb3BvdmVyT3BlbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvcG92ZXIuc2hvdygpO1xuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgcG9wb3Zlci4gKi9cbiAgICB1cGRhdGVQb3NpdGlvbihyZWFwcGx5UG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuICAgICAgICBwb3NpdGlvbi53aXRoUG9zaXRpb25zKHRoaXMuZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSkud2l0aFB1c2godHJ1ZSk7XG5cbiAgICAgICAgaWYgKHJlYXBwbHlQb3NpdGlvbikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ucmVhcHBseUxhc3RQb3NpdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsb3NpbmdBY3Rpb25zKCkge1xuICAgICAgICBjb25zdCBiYWNrZHJvcCA9IHRoaXMub3ZlcmxheVJlZiEuYmFja2Ryb3BDbGljaygpO1xuICAgICAgICBjb25zdCBvdXRzaWRlUG9pbnRlckV2ZW50cyA9IHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKTtcbiAgICAgICAgY29uc3QgZGV0YWNobWVudHMgPSB0aGlzLm92ZXJsYXlSZWYhLmRldGFjaG1lbnRzKCk7XG5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGJhY2tkcm9wLCBvdXRzaWRlUG9pbnRlckV2ZW50cywgZGV0YWNobWVudHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UHJpb3JpdHlQbGFjZW1lbnRTdHJhdGVneSh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBwb3NzaWJsZVBvc2l0aW9ucyA9IE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChwb3NpdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlUG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1twb3NpdGlvbl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHBvc3NpYmxlUG9zaXRpb25zLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5hdmFpbGFibGVQb3NpdGlvbnNbdmFsdWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQcmlvcml0aXplZFBvc2l0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMubWNQbGFjZW1lbnRQcmlvcml0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJpb3JpdHlQbGFjZW1lbnRTdHJhdGVneSh0aGlzLm1jUGxhY2VtZW50UHJpb3JpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFBPU0lUSU9OX1BSSU9SSVRZX1NUUkFURUdZW3RoaXMubWNQbGFjZW1lbnRdO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplTGlzdGVuZXIgPSAoKSA9PiB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG59XG4iXX0=
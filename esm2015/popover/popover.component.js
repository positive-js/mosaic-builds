/**
 * @fileoverview added by tsickle
 * Generated from: popover.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                styles: ["@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px);background-size:29px 29px;-webkit-animation:1s linear infinite mc-progress;animation:1s linear infinite mc-progress}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;display:block;margin:0;border-radius:4px;border-width:1px;border-style:solid;padding:0;box-sizing:border-box;visibility:visible;z-index:1060;list-style:none;white-space:pre-line}.mc-popover-small,.mc-popover-small .mc-popover{max-width:280px}.mc-popover-normal,.mc-popover-normal .mc-popover{max-width:400px}.mc-popover-large,.mc-popover-large .mc-popover{max-width:640px}.mc-popover__container{border-radius:4px;overflow:hidden}.mc-popover__header{padding:10px 16px;border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{padding:16px}.mc-popover__footer{margin-top:8px;padding:12px 16px;border-top-width:1px;border-top-style:solid}.mc-popover_placement-top .mc-popover,.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover{margin-bottom:8px}.mc-popover_placement-right .mc-popover,.mc-popover_placement-right-bottom .mc-popover,.mc-popover_placement-right-top .mc-popover{margin-left:8px}.mc-popover_placement-bottom .mc-popover,.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover{margin-top:8px}.mc-popover_placement-left .mc-popover,.mc-popover_placement-left-bottom .mc-popover,.mc-popover_placement-left-top .mc-popover{margin-right:8px}.mc-popover__arrow{position:absolute;z-index:-1;width:14px;height:14px;border:1px solid;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:-6px;left:50%;margin-left:-4px}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-6px;left:20px;margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-6px;right:20px;margin-left:0}.mc-popover_placement-right .mc-popover__arrow{left:-6px;top:50%;margin-top:-4px}.mc-popover_placement-right-top .mc-popover__arrow{left:-6px;top:18px;margin-top:-4px}.mc-popover_placement-right-bottom .mc-popover__arrow{left:-6px;bottom:14px;margin-top:-4px}.mc-popover_placement-left .mc-popover__arrow{right:-6px;top:50%;margin-top:-4px}.mc-popover_placement-left-top .mc-popover__arrow{right:-6px;top:18px;margin-top:-4px}.mc-popover_placement-left-bottom .mc-popover__arrow{right:-6px;bottom:14px;margin-top:-4px}.mc-popover_placement-bottom .mc-popover__arrow{top:-6px;left:50%;margin-left:-4px}.mc-popover_placement-bottom-left .mc-popover__arrow{top:-6px;left:20px;margin-left:0}.mc-popover_placement-bottom-right .mc-popover__arrow{top:-6px;right:20px;margin-left:0}"]
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
        () => this.updatePosition());
        this.availablePositions = POSITION_MAP;
        this.defaultPositionsMap = DEFAULT_4_POSITIONS_TO_CSS_MAP;
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
        const scrollableAncestors = this.scrollDispatcher
            .getAncestorScrollContainers(this.elementRef);
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
        if (!this.disabled) {
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
     * @return {?}
     */
    updateOverlayBackdropClick() {
        if (this.mcTrigger === PopoverTriggers.Click && this.overlayRef) {
            this.backDropSubscription = this.overlayRef.backdropClick()
                .subscribe((/**
             * @return {?}
             */
            () => {
                if (!this.popover) {
                    return;
                }
                this.popover.hide();
            }));
        }
        else if (this.backDropSubscription && this.overlayRef) {
            this.backDropSubscription.unsubscribe();
            this.overlayRef.detachBackdrop();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvcG9wb3Zlci8iLCJzb3VyY2VzIjpbInBvcG92ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFJSCxPQUFPLEVBRVAsZ0JBQWdCLEVBRW5CLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUNILDhCQUE4QixFQUM5QiwwQkFBMEIsRUFDMUIsWUFBWSxFQUFFLDBCQUEwQixFQUN4QyxtQkFBbUIsRUFDdEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUczRCxNQUFLLGVBQWU7SUFDaEIsS0FBSyxTQUFVO0lBQ2YsS0FBSyxTQUFVO0lBQ2YsS0FBSyxTQUFVO0VBQ2xCOztBQUVELE1B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QUFLLFNBQUMsa0JBQWtCO3VCQWN4QixLQUFLLFNBQUMsaUJBQWlCO3VCQWdCdkIsS0FBSyxTQUFDLG1CQUFtQjtnQ0FTekIsS0FBSyxTQUFDLDBCQUEwQjtnQ0FVaEMsS0FBSyxTQUFDLDBCQUEwQjt3QkFVaEMsS0FBSyxTQUFDLGtCQUFrQjs0QkFpQnhCLEtBQUssU0FBQyxlQUFlO2tDQWNyQixLQUFLLFNBQUMsNEJBQTRCOzBCQWFsQyxLQUFLLFNBQUMsb0JBQW9CO3dCQWMxQixLQUFLLFNBQUMsZ0JBQWdCO3dCQVV0QixLQUFLLFNBQUMsa0JBQWtCOzs7O0lBMUp6QixrQ0FBK0I7O0lBQy9CLHFDQUF5Qjs7SUFDekIsK0JBQThCOztJQUM5QiwyQkFBNEM7O0lBQzVDLHVDQUE4RDs7SUFDOUQsd0NBQThDOztJQUM5Qyw0QkFBbUM7O0lBRW5DLG9DQUFnRjs7SUFFaEYsc0RBQzZFOzs7OztJQWM3RSw4QkFBNkM7Ozs7O0lBYzdDLCtCQUE4Qzs7Ozs7SUFjOUMsOEJBQTZDOzs7OztJQUU3QyxpQ0FBMkM7Ozs7O0lBUzNDLDhCQUFtQzs7Ozs7SUFVbkMsdUNBQW1DOzs7OztJQVVuQyx1Q0FBbUM7Ozs7O0lBaUJuQywrQkFBbUQ7Ozs7O0lBY25ELGdDQUF1Qzs7Ozs7SUFhdkMseUNBQThEOzs7OztJQWM5RCxpQ0FBcUM7Ozs7O0lBVXJDLCtCQUFzQzs7Ozs7SUFzQnRDLCtCQUE0Qjs7Ozs7SUFNNUIsb0NBQWdGOzs7OztJQUNoRiw4QkFBaUQ7Ozs7O0lBQ2pELHlDQUEyQzs7Ozs7SUFvVTNDLG1DQUFxRDs7Ozs7SUFqVWpELDRCQUF3Qjs7Ozs7SUFDeEIsK0JBQThCOzs7OztJQUM5QiwyQkFBc0I7Ozs7O0lBQ3RCLHFDQUEwQzs7Ozs7SUFDMUMsNkJBQWtDOzs7OztJQUNsQyxtQ0FBMEQ7Ozs7O0lBQzFELDhCQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSxcbiAgICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlSZWYsXG4gICAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBERUZBVUxUXzRfUE9TSVRJT05TX1RPX0NTU19NQVAsXG4gICAgRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlMsXG4gICAgUE9TSVRJT05fTUFQLCBQT1NJVElPTl9QUklPUklUWV9TVFJBVEVHWSxcbiAgICBQT1NJVElPTl9UT19DU1NfTUFQXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBtY1BvcG92ZXJBbmltYXRpb25zIH0gZnJvbSAnLi9wb3BvdmVyLWFuaW1hdGlvbnMnO1xuXG5cbmVudW0gUG9wb3ZlclRyaWdnZXJzIHtcbiAgICBDbGljayA9ICdjbGljaycsXG4gICAgRm9jdXMgPSAnZm9jdXMnLFxuICAgIEhvdmVyID0gJ2hvdmVyJ1xufVxuXG5leHBvcnQgZW51bSBQb3BvdmVyVmlzaWJpbGl0eSB7XG4gICAgSW5pdGlhbCA9ICdpbml0aWFsJyxcbiAgICBWaXNpYmxlID0gJ3Zpc2libGUnLFxuICAgIEhpZGRlbiA9ICdoaWRkZW4nXG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wb3BvdmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgc3R5bGVVcmxzOiBbJy4vcG9wb3Zlci5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbbWNQb3BvdmVyQW5pbWF0aW9ucy5wb3BvdmVyU3RhdGVdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzc10nOiAnZ2V0Q3NzQ2xhc3Nlc0xpc3QnLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3ZlckNvbXBvbmVudCB7XG4gICAgcG9zaXRpb25zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbLi4uRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlNdO1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogYW55O1xuICAgIHBvcG92ZXJWaXNpYmlsaXR5OiBQb3BvdmVyVmlzaWJpbGl0eSA9IFBvcG92ZXJWaXNpYmlsaXR5LkluaXRpYWw7XG4gICAgY2xvc2VPbkludGVyYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgbWNDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIG1jSGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIG1jRm9vdGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyVmlzaWJsZUNoYW5nZScpIG1jVmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9IFBvcG92ZXJUcmlnZ2Vycy5Ib3ZlcjtcblxuICAgIGdldCBtY1BsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9tY1BsYWNlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnVuc2hpZnQoUE9TSVRJT05fTUFQWyB0aGlzLm1jUGxhY2VtZW50IF0pO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICAgIGdldCBtY1BvcG92ZXJTaXplKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXJTaXplO1xuICAgIH1cblxuICAgIHNldCBtY1BvcG92ZXJTaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnBvcG92ZXJTaXplKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJTaXplID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJTaXplID0gJ25vcm1hbCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcG92ZXJTaXplOiBzdHJpbmc7XG5cbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21jVmlzaWJsZS52YWx1ZSAhPT0gdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQodmlzaWJsZSk7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIGdldCBjbGFzc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGFzc0xpc3Quam9pbignICcpO1xuICAgIH1cblxuICAgIHNldCBjbGFzc0xpc3QodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCBsaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgbGlzdCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NsYXNzTGlzdCA9IGxpc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xhc3NMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgZ2V0IGdldENzc0NsYXNzZXNMaXN0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNsYXNzTGlzdH0gbWMtcG9wb3Zlci0ke3RoaXMubWNQb3BvdmVyU2l6ZX0gbWMtcG9wb3Zlcl9wbGFjZW1lbnQtJHt0aGlzLmdldFBsYWNlbWVudENsYXNzfWA7XG4gICAgfVxuXG4gICAgZ2V0IGdldFBsYWNlbWVudENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBQT1NJVElPTl9UT19DU1NfTUFQW3RoaXMubWNQbGFjZW1lbnRdO1xuICAgIH1cblxuICAgIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXJWaXNpYmlsaXR5ID09PSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlO1xuICAgIH1cblxuICAgIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgcG9wb3ZlciBoYXMgYmVlbiBoaWRkZW4gZnJvbSB0aGUgdmlldyAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb25IaWRlU3ViamVjdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBjb21wb25lbnRFbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zID0gUE9TSVRJT05fTUFQO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiBlLmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc05vbkVtcHR5Q29udGVudCgpKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlT25JbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJWaXNpYmlsaXR5ID0gUG9wb3ZlclZpc2liaWxpdHkuVmlzaWJsZTtcbiAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KHRydWUpO1xuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAvLyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byBPblB1c2ggaXQgd2lsbCBiZSBjaGVja2VkIGFueXdheXNcbiAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBvcG92ZXJWaXNpYmlsaXR5ID0gUG9wb3ZlclZpc2liaWxpdHkuSGlkZGVuO1xuICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dChmYWxzZSk7XG4gICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGlzTm9uRW1wdHlDb250ZW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLm1jQ29udGVudCAmJiAodGhpcy5pc1RlbXBsYXRlUmVmKHRoaXMubWNDb250ZW50KSB8fCB0aGlzLmlzTm9uRW1wdHlTdHJpbmcodGhpcy5tY0NvbnRlbnQpKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2hlbiB0aGUgcG9wb3ZlciBoYXMgYmVlbiBoaWRkZW4gZnJvbSB2aWV3LiAqL1xuICAgIGFmdGVySGlkZGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkhpZGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPT09IFBvcG92ZXJWaXNpYmlsaXR5LlZpc2libGU7XG4gICAgfVxuXG4gICAgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGlzVGVtcGxhdGVSZWYodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICB9XG5cbiAgICBpc05vbkVtcHR5U3RyaW5nKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnO1xuICAgIH1cblxuICAgIGFuaW1hdGlvblN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNsb3NlT25JbnRlcmFjdGlvbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRvU3RhdGUgPSBldmVudC50b1N0YXRlIGFzIFBvcG92ZXJWaXNpYmlsaXR5O1xuXG4gICAgICAgIGlmICh0b1N0YXRlID09PSBQb3BvdmVyVmlzaWJpbGl0eS5IaWRkZW4gJiYgIXRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMub25IaWRlU3ViamVjdC5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9TdGF0ZSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuVmlzaWJsZSB8fCB0b1N0YXRlID09PSBQb3BvdmVyVmlzaWJpbGl0eS5IaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm9uSGlkZVN1YmplY3QuY29tcGxldGUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtcG9wb3Zlci1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBtY1BvcG92ZXJTY3JvbGxTdHJhdGVneUZhY3Rvcnkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oe3Njcm9sbFRocm90dGxlOiAyMH0pO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1ksXG4gICAgZGVwczogW092ZXJsYXldLFxuICAgIHVzZUZhY3Rvcnk6IG1jUG9wb3ZlclNjcm9sbFN0cmF0ZWd5RmFjdG9yeVxufTtcblxuLyoqIENyZWF0ZXMgYW4gZXJyb3IgdG8gYmUgdGhyb3duIGlmIHRoZSB1c2VyIHN1cHBsaWVkIGFuIGludmFsaWQgcG9wb3ZlciBwb3NpdGlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNY1BvcG92ZXJJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIEVycm9yKGBNY1BvcG92ZXIgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiIGlzIGludmFsaWQuYCk7XG59XG5cbmNvbnN0IFZJRVdQT1JUX01BUkdJTjogbnVtYmVyID0gODtcblxuLyogQ29uc3RhbnQgZGlzdGFuY2UgYmV0d2VlbiBwb3BvdmVyIGNvbnRhaW5lciBib3JkZXJcbiogIGNvcm5lciBhY2NvcmRpbmcgdG8gcG9wb3ZlciBwbGFjZW1lbnQgYW5kIG1pZGRsZSBvZiBhcnJvd1xuKiAqL1xuY29uc3QgUE9QT1ZFUl9BUlJPV19CT1JERVJfRElTVEFOQ0U6IG51bWJlciA9IDIwOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbi8qIENvbnN0YW50IHZhbHVlIGZvciBtaW4gaGVpZ2h0IGFuZCB3aWR0aCBvZiBhbmNob3IgZWxlbWVudCB1c2VkIGZvciBwb3BvdmVyLlxuKiAgU2V0IGFzIFBPUE9WRVJfQVJST1dfQk9SREVSX0RJU1RBTkNFIG11bHRpcGxpZWQgYnkgMlxuKiAgcGx1cyAycHggYm9yZGVyIGZvciBib3RoIHNpZGVzIG9mIGVsZW1lbnQuIFVzZWQgaW4gY2hlY2sgb2YgcG9zaXRpb24gbWFuYWdlbWVudC5cbiogKi9cbmNvbnN0IEFOQ0hPUl9NSU5fSEVJR0hUX1dJRFRIOiBudW1iZXIgPSA0NDsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1BvcG92ZXJdJyxcbiAgICBleHBvcnRBczogJ21jUG9wb3ZlcicsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknLFxuICAgICAgICAnW2NsYXNzLm1jLXBvcG92ZXJfb3Blbl0nOiAnaXNPcGVuJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQb3BvdmVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGlzUG9wb3Zlck9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0R5bmFtaWNQb3BvdmVyID0gZmFsc2U7XG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGw7XG4gICAgcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8TWNQb3BvdmVyQ29tcG9uZW50PjtcbiAgICBhdmFpbGFibGVQb3NpdGlvbnM6IHsgW2tleTogc3RyaW5nXTogQ29ubmVjdGlvblBvc2l0aW9uUGFpciB9O1xuICAgIGRlZmF1bHRQb3NpdGlvbnNNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgICBwb3BvdmVyOiBNY1BvcG92ZXJDb21wb25lbnQgfCBudWxsO1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyVmlzaWJsZUNoYW5nZScpIG1jVmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBPdXRwdXQoJ21jUG9wb3ZlclBvc2l0aW9uU3RyYXRlZ3lQbGFjZW1lbnRDaGFuZ2UnKVxuICAgIG1jUG9zaXRpb25TdHJhdGVneVBsYWNlbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckhlYWRlcicpXG4gICAgZ2V0IG1jSGVhZGVyKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNIZWFkZXI7XG4gICAgfVxuICAgIHNldCBtY0hlYWRlcih2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9tY0hlYWRlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNIZWFkZXInLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQb3BvdmVyT3Blbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY0hlYWRlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyQ29udGVudCcpXG4gICAgZ2V0IG1jQ29udGVudCgpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jQ29udGVudDtcbiAgICB9XG4gICAgc2V0IG1jQ29udGVudCh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9tY0NvbnRlbnQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jQ29udGVudCcsIHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1BvcG92ZXJPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyRm9vdGVyJylcbiAgICBnZXQgbWNGb290ZXIoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY0Zvb3RlcjtcbiAgICB9XG4gICAgc2V0IG1jRm9vdGVyKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jRm9vdGVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY0Zvb3RlcicsIHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1BvcG92ZXJPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jRm9vdGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHJpdmF0ZSAkdW5zdWJzY3JpYmUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJEaXNhYmxlZCcpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoJ21jUG9wb3Zlck1vdXNlRW50ZXJEZWxheScpXG4gICAgZ2V0IG1jTW91c2VFbnRlckRlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlRW50ZXJEZWxheTtcbiAgICB9XG4gICAgc2V0IG1jTW91c2VFbnRlckRlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWNNb3VzZUVudGVyRGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jTW91c2VFbnRlckRlbGF5JywgdmFsdWUpO1xuICAgIH1cbiAgICBwcml2YXRlIF9tY01vdXNlRW50ZXJEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJNb3VzZUxlYXZlRGVsYXknKVxuICAgIGdldCBtY01vdXNlTGVhdmVEZWxheSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNNb3VzZUxlYXZlRGVsYXk7XG4gICAgfVxuICAgIHNldCBtY01vdXNlTGVhdmVEZWxheSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY01vdXNlTGVhdmVEZWxheScsIHZhbHVlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNNb3VzZUxlYXZlRGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyVHJpZ2dlcicpXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVHJpZ2dlcicsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IFBvcG92ZXJUcmlnZ2Vycy5DbGljaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUcmlnZ2VyOiBzdHJpbmcgPSBQb3BvdmVyVHJpZ2dlcnMuQ2xpY2s7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclNpemUnKVxuICAgIGdldCBtY1BvcG92ZXJTaXplKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXJTaXplO1xuICAgIH1cbiAgICBzZXQgbWNQb3BvdmVyU2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiAodmFsdWUgPT09ICdzbWFsbCcgfHwgdmFsdWUgPT09ICdub3JtYWwnIHx8IHZhbHVlID09PSAnbGFyZ2UnKSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyU2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUG9wb3ZlclNpemUnLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJTaXplID0gJ25vcm1hbCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBwb3BvdmVyU2l6ZTogc3RyaW5nID0gJ25vcm1hbCc7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclBsYWNlbWVudFByaW9yaXR5JylcbiAgICBnZXQgbWNQbGFjZW1lbnRQcmlvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50UHJpb3JpdHk7XG4gICAgfVxuICAgIHNldCBtY1BsYWNlbWVudFByaW9yaXR5KHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudFByaW9yaXR5ID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudFByaW9yaXR5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudFByaW9yaXR5OiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJQbGFjZW1lbnQnKVxuICAgIGdldCBtY1BsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnQ7XG4gICAgfVxuICAgIHNldCBtY1BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BsYWNlbWVudCcsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJDbGFzcycpXG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsYXNzTGlzdDtcbiAgICB9XG4gICAgc2V0IGNsYXNzTGlzdCh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5fY2xhc3NMaXN0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdjbGFzc0xpc3QnLCB0aGlzLl9jbGFzc0xpc3QpO1xuICAgIH1cbiAgICBwcml2YXRlIF9jbGFzc0xpc3Q6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJWaXNpYmxlJylcbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUoZXh0ZXJuYWxWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShleHRlcm5hbFZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fbWNWaXNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNWaXNpYmxlJywgdmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IGJvb2xlYW47XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1BvcG92ZXJPcGVuO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFudWFsTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHByaXZhdGUgYmFja0Ryb3BTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBwcml2YXRlIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgICAgIHRoaXMuZGVmYXVsdFBvc2l0aW9uc01hcCA9IERFRkFVTFRfNF9QT1NJVElPTlNfVE9fQ1NTX01BUDtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIHRoZSBvdmVybGF5IGNvbmZpZyBhbmQgcG9zaXRpb24gc3RyYXRlZ3kgKi9cbiAgICBjcmVhdGVPdmVybGF5KCk6IE92ZXJsYXlSZWYge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGNvbm5lY3RlZCBwb3NpdGlvbiBzdHJhdGVneSB0aGF0IGxpc3RlbnMgZm9yIHNjcm9sbCBldmVudHMgdG8gcmVwb3NpdGlvbi5cbiAgICAgICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5lbGVtZW50UmVmKVxuICAgICAgICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1jLXBvcG92ZXInKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKFZJRVdQT1JUX01BUkdJTilcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFsuLi5FWFRFTkRFRF9PVkVSTEFZX1BPU0lUSU9OU10pO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVBbmNlc3RvcnMgPSB0aGlzLnNjcm9sbERpc3BhdGNoZXJcbiAgICAgICAgICAgIC5nZXRBbmNlc3RvclNjcm9sbENvbnRhaW5lcnModGhpcy5lbGVtZW50UmVmKTtcblxuICAgICAgICBzdHJhdGVneS53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnMoc2Nyb2xsYWJsZUFuY2VzdG9ycyk7XG5cbiAgICAgICAgc3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblBvc2l0aW9uQ2hhbmdlKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5zY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMuaXNPdmVybGF5Q2xpcHBlZCAmJiB0aGlzLnBvcG92ZXIubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIHBvc2l0aW9uIGNoYW5nZXMgb2NjdXIgYW5kIHRoZSBvdmVybGF5IGlzIGNsaXBwZWQgYnlcbiAgICAgICAgICAgICAgICAgICAgLy8gYSBwYXJlbnQgc2Nyb2xsYWJsZSB0aGVuIGNsb3NlIHRoZSBwb3BvdmVyLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogc3RyYXRlZ3ksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtcG9wb3Zlcl9fcGFuZWwnLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogJ25vLWNsYXNzJ1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZU92ZXJsYXlCYWNrZHJvcENsaWNrKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2htZW50cygpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGFjaCgpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmO1xuICAgIH1cblxuICAgIGRldGFjaCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9wb3ZlciA9IG51bGw7XG4gICAgfVxuXG4gICAgb25Qb3NpdGlvbkNoYW5nZSgkZXZlbnQ6IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgICAgICBsZXQgdXBkYXRlZFBsYWNlbWVudCA9IHRoaXMubWNQbGFjZW1lbnQ7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zKS5zb21lKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICgkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5YICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWSAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vdmVybGF5WCAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vdmVybGF5WSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWRQbGFjZW1lbnQgPSBrZXk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQbGFjZW1lbnQnLCB1cGRhdGVkUGxhY2VtZW50KTtcbiAgICAgICAgdGhpcy5tY1Bvc2l0aW9uU3RyYXRlZ3lQbGFjZW1lbnRDaGFuZ2UuZW1pdCh1cGRhdGVkUGxhY2VtZW50KTtcblxuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnY2xhc3NMaXN0JywgdGhpcy5jbGFzc0xpc3QpO1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRlZmF1bHRQb3NpdGlvbnNNYXBbdXBkYXRlZFBsYWNlbWVudF0pIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlUG9zaXRpb25VcGRhdGUodXBkYXRlZFBsYWNlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVQb3NpdGlvblVwZGF0ZSh1cGRhdGVkUGxhY2VtZW50OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudENvbnRhaW5lciA9IHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZTtcbiAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IHRoaXMuaG9zdFZpZXcuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgZWxlbWVudFdpZHRoID0gdGhpcy5ob3N0Vmlldy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IHZlcnRpY2FsT2Zmc2V0OiBudW1iZXIgPSBNYXRoLmZsb29yKGVsZW1lbnRIZWlnaHQgLyAyKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICBjb25zdCBob3Jpem9udGFsT2Zmc2V0OiBudW1iZXIgPSBNYXRoLmZsb29yKGVsZW1lbnRXaWR0aCAvIDIgLSA2KTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICBjb25zdCBvZmZzZXRzOiB7IFtrZXk6IHN0cmluZ106IG51bWJlcn0gPSB7XG4gICAgICAgICAgICB0b3A6IHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgYm90dG9tOiB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHJpZ2h0OiBob3Jpem9udGFsT2Zmc2V0LFxuICAgICAgICAgICAgbGVmdDogaG9yaXpvbnRhbE9mZnNldFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHN0eWxlUHJvcGVydHkgPSB1cGRhdGVkUGxhY2VtZW50LnNwbGl0KC8oPz1bQS1aXSkvKVsxXS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmICgoKHN0eWxlUHJvcGVydHkgPT09ICd0b3AnIHx8IHN0eWxlUHJvcGVydHkgPT09ICdib3R0b20nKSAmJlxuICAgICAgICAgICAgZWxlbWVudEhlaWdodCA+IEFOQ0hPUl9NSU5fSEVJR0hUX1dJRFRIKSB8fFxuICAgICAgICAgICAgKChzdHlsZVByb3BlcnR5ID09PSAnbGVmdCcgfHwgc3R5bGVQcm9wZXJ0eSA9PT0gJ3JpZ2h0JykgJiZcbiAgICAgICAgICAgIGVsZW1lbnRXaWR0aCA+IEFOQ0hPUl9NSU5fSEVJR0hUX1dJRFRIKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGVbc3R5bGVQcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZVtzdHlsZVByb3BlcnR5XSA9ICcwcHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlW3N0eWxlUHJvcGVydHldID1cbiAgICAgICAgICAgIGAke3BhcnNlSW50KGN1cnJlbnRDb250YWluZXJbc3R5bGVQcm9wZXJ0eV0uc3BsaXQoJ3B4JylbMF0sIDEwKSArXG4gICAgICAgICAgICBvZmZzZXRzW3N0eWxlUHJvcGVydHldIC0gUE9QT1ZFUl9BUlJPV19CT1JERVJfRElTVEFOQ0V9cHhgO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICB1cGRhdGVDb21wVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEeW5hbWljUG9wb3ZlciAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucG9wb3ZlcltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudFJlZkxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiBlLmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaGVuZCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ2NsaWNrJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tY1RyaWdnZXIgPT09IFBvcG92ZXJUcmlnZ2Vycy5Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWVudGVyJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VsZWF2ZScsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWNUcmlnZ2VyID09PSBQb3BvdmVyVHJpZ2dlcnMuRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnZm9jdXMnLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdibHVyJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgICAgIC8vIFRoZSByZXNpemUgaGFuZGxlciBpcyBjdXJyZW50bHkgcmVzcG9uc2libGUgZm9yIGRldGVjdGluZyBzbGlkZXIgZGltZW5zaW9uXG4gICAgICAgIC8vIGNoYW5nZXMgYW5kIHRoZXJlZm9yZSBkb2Vzbid0IGNhdXNlIGEgdmFsdWUgY2hhbmdlIHRoYXQgbmVlZHMgdG8gYmUgcHJvcGFnYXRlZC5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJlc2V0TGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tYW51YWxMaXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0RWxlbWVudFJlZkxpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSB0aGlzLnBvcnRhbCB8fCBuZXcgQ29tcG9uZW50UG9ydGFsKE1jUG9wb3ZlckNvbXBvbmVudCwgdGhpcy5ob3N0Vmlldyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvcG92ZXIgPSBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCkuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyLmFmdGVySGlkZGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGFjaCgpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNEeW5hbWljUG9wb3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgJ21jUGxhY2VtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jUG9wb3ZlclNpemUnLFxuICAgICAgICAgICAgICAgICAgICAnbWNUcmlnZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgJ21jTW91c2VFbnRlckRlbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jTW91c2VMZWF2ZURlbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzTGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICdtY1Zpc2libGUnLFxuICAgICAgICAgICAgICAgICAgICAnbWNIZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAnbWNDb250ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jRm9vdGVyJ1xuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB0aGlzLnVwZGF0ZUNvbXBWYWx1ZShwcm9wZXJ0eSwgdGhpc1twcm9wZXJ0eV0pKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9wb3Zlci5tY1Zpc2libGVDaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuJHVuc3Vic2NyaWJlKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGUgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQb3BvdmVyT3BlbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU92ZXJsYXlCYWNrZHJvcENsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgPT09IFBvcG92ZXJUcmlnZ2Vycy5DbGljayAmJiB0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja0Ryb3BTdWJzY3JpcHRpb24gPSB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wb3BvdmVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wb3Zlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5iYWNrRHJvcFN1YnNjcmlwdGlvbiAmJiB0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja0Ryb3BTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2hCYWNrZHJvcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHBvcG92ZXIuICovXG4gICAgdXBkYXRlUG9zaXRpb24ocmVhcHBseVBvc2l0aW9uOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID1cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbiAgICAgICAgcG9zaXRpb24ud2l0aFBvc2l0aW9ucyh0aGlzLmdldFByaW9yaXRpemVkUG9zaXRpb25zKCkpLndpdGhQdXNoKHRydWUpO1xuXG4gICAgICAgIGlmIChyZWFwcGx5UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnJlYXBwbHlMYXN0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQcmlvcml0eVBsYWNlbWVudFN0cmF0ZWd5KHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSk6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gW107XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlUG9zaXRpb25zID0gT2JqZWN0LmtleXModGhpcy5hdmFpbGFibGVQb3NpdGlvbnMpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKHBvc2l0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocG9zc2libGVQb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW3Bvc2l0aW9uXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zc2libGVQb3NpdGlvbnMuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1t2YWx1ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFByaW9yaXRpemVkUG9zaXRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy5tY1BsYWNlbWVudFByaW9yaXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcmlvcml0eVBsYWNlbWVudFN0cmF0ZWd5KHRoaXMubWNQbGFjZW1lbnRQcmlvcml0eSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUE9TSVRJT05fUFJJT1JJVFlfU1RSQVRFR1lbdGhpcy5tY1BsYWNlbWVudF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNpemVMaXN0ZW5lciA9ICgpID0+IHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbn1cbiJdfQ==
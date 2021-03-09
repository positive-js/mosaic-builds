import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { DEFAULT_4_POSITIONS_TO_CSS_MAP, EXTENDED_OVERLAY_POSITIONS, POSITION_MAP, POSITION_PRIORITY_STRATEGY, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, merge, Subject, Subscription } from 'rxjs';
import { delay, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { mcPopoverAnimations } from './popover-animations';
var PopoverTriggers;
(function (PopoverTriggers) {
    PopoverTriggers["Click"] = "click";
    PopoverTriggers["Focus"] = "focus";
    PopoverTriggers["Hover"] = "hover";
})(PopoverTriggers || (PopoverTriggers = {}));
export var PopoverVisibility;
(function (PopoverVisibility) {
    PopoverVisibility["Initial"] = "initial";
    PopoverVisibility["Visible"] = "visible";
    PopoverVisibility["Hidden"] = "hidden";
})(PopoverVisibility || (PopoverVisibility = {}));
export class McPopoverComponent {
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
        /** Subject for notifying that the popover has been hidden from the view */
        this.onHideSubject = new Subject();
        this.availablePositions = POSITION_MAP;
    }
    get mcTrigger() {
        return this._mcTrigger;
    }
    set mcTrigger(value) {
        this._mcTrigger = value;
    }
    get mcPlacement() {
        return this._mcPlacement;
    }
    set mcPlacement(value) {
        if (value !== this._mcPlacement) {
            this._mcPlacement = value;
            this.positions.unshift(POSITION_MAP[this.mcPlacement]);
        }
        else if (!value) {
            this._mcPlacement = 'top';
        }
    }
    get mcPopoverSize() {
        return this.popoverSize;
    }
    set mcPopoverSize(value) {
        if (value !== this.popoverSize) {
            this.popoverSize = value;
        }
        else if (!value) {
            this.popoverSize = 'normal';
        }
    }
    get mcVisible() {
        return this._mcVisible.value;
    }
    set mcVisible(value) {
        const visible = coerceBooleanProperty(value);
        if (this._mcVisible.value !== visible) {
            this._mcVisible.next(visible);
            this.mcVisibleChange.emit(visible);
        }
    }
    get classList() {
        return this._classList.join(' ');
    }
    set classList(value) {
        let list = [];
        if (Array.isArray(value)) {
            list = value;
        }
        else {
            list.push(value);
        }
        this._classList = list;
    }
    get getCssClassesList() {
        return `${this.classList} mc-popover-${this.mcPopoverSize} mc-popover_placement-${this.getPlacementClass}`;
    }
    get getPlacementClass() {
        return POSITION_TO_CSS_MAP[this.mcPlacement];
    }
    get isOpen() {
        return this.popoverVisibility === PopoverVisibility.Visible;
    }
    handleKeydown(e) {
        // tslint:disable-next-line: deprecation
        if (this.isOpen && e.keyCode === ESCAPE) {
            this.hide();
        }
    }
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
    hide() {
        this.popoverVisibility = PopoverVisibility.Hidden;
        this._mcVisible.next(false);
        this.mcVisibleChange.emit(false);
        // Mark for check so if any parent component has set the
        // ChangeDetectionStrategy to OnPush it will be checked anyways
        this.markForCheck();
    }
    isNonEmptyContent() {
        return !!this.mcContent && (this.isTemplateRef(this.mcContent) || this.isNonEmptyString(this.mcContent));
    }
    /** Returns an observable that notifies when the popover has been hidden from view. */
    afterHidden() {
        return this.onHideSubject.asObservable();
    }
    isVisible() {
        return this.popoverVisibility === PopoverVisibility.Visible;
    }
    markForCheck() {
        this.changeDetectorRef.markForCheck();
    }
    isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    isNonEmptyString(value) {
        return typeof value === 'string' && value !== '';
    }
    animationStart() {
        this.closeOnInteraction = false;
    }
    animationDone(event) {
        const toState = event.toState;
        if (toState === PopoverVisibility.Hidden && !this.isVisible()) {
            this.onHideSubject.next();
        }
        if (toState === PopoverVisibility.Visible || toState === PopoverVisibility.Hidden) {
            this.closeOnInteraction = true;
        }
    }
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
                styles: ["@-webkit-keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 0,transparent 20px,rgba(0,0,0,.05) 0,rgba(0,0,0,.05) 30px,transparent 0) repeat;background-size:29px 29px;-webkit-animation:mc-progress 1s linear infinite;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;height:100%;width:100%;position:fixed}.cdk-overlay-backdrop,.cdk-overlay-container{top:0;left:0;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{bottom:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto}.cdk-overlay-pane{pointer-events:auto;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box,.cdk-overlay-pane{box-sizing:border-box;position:absolute;margin:0;padding:0;z-index:1000}.cdk-overlay-connected-position-bounding-box{display:flex;flex-direction:column;min-width:1px;min-height:1px}.mc-popover{position:relative;display:block;border-radius:var(--mc-popover-size-border-radius,4px);border-width:var(--mc-popover-size-border-width,1px);border-style:solid;box-sizing:border-box;visibility:visible;z-index:1030;list-style:none;white-space:pre-line}.mc-popover-small,.mc-popover-small .mc-popover{max-width:var(--mc-popover-size-small-width,200px)}.mc-popover-normal,.mc-popover-normal .mc-popover{max-width:var(--mc-popover-size-normal-width,400px)}.mc-popover-large,.mc-popover-large .mc-popover{max-width:var(--mc-popover-size-large-width,640px)}.mc-popover__container{border-radius:var(--mc-popover-size-border-radius,4px);overflow:hidden}.mc-popover__header{padding:var(--mc-popover-header-size-padding,10px 16px);border-bottom-width:var(--mc-popover-size-border-width,1px);border-bottom-style:solid}.mc-popover__content{padding:var(--mc-popover-size-padding,16px)}.mc-popover__footer{margin-top:var(--mc-popover-footer-size-margin-top,8px);padding:var(--mc-popover-footer-size-padding,12px 16px);border-top-width:var(--mc-popover-size-border-width,1px);border-top-style:solid}.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover,.mc-popover_placement-top .mc-popover{margin-bottom:calc(var(--mc-popover-size-arrow-width, $popover-size-arrow-width) * 2)}.mc-popover_placement-right-bottom .mc-popover,.mc-popover_placement-right-top .mc-popover,.mc-popover_placement-right .mc-popover{margin-left:calc(var(--mc-popover-size-arrow-width, $popover-size-arrow-width) * 2)}.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover,.mc-popover_placement-bottom .mc-popover{margin-top:calc(var(--mc-popover-size-arrow-width, $popover-size-arrow-width) * 2)}.mc-popover_placement-left-bottom .mc-popover,.mc-popover_placement-left-top .mc-popover,.mc-popover_placement-left .mc-popover{margin-right:calc(var(--mc-popover-size-arrow-width, $popover-size-arrow-width) * 2)}.mc-popover__arrow{position:absolute;z-index:-1;width:14px;height:14px;border:1px solid;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));left:50%;margin-left:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-top-left .mc-popover__arrow{left:20px}.mc-popover_placement-top-left .mc-popover__arrow,.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{right:20px}.mc-popover_placement-right .mc-popover__arrow{top:50%}.mc-popover_placement-right-top .mc-popover__arrow,.mc-popover_placement-right .mc-popover__arrow{left:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-right-top .mc-popover__arrow{top:18px}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));bottom:14px;margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-left .mc-popover__arrow{top:50%}.mc-popover_placement-left-top .mc-popover__arrow,.mc-popover_placement-left .mc-popover__arrow{right:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-left-top .mc-popover__arrow{top:18px}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));bottom:14px;margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));left:50%;margin-left:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));left:20px;margin-left:0}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc(-1 * (var(--mc-popover-size-arrow-width, $popover-size-arrow-width) + 2px));right:20px;margin-left:0}"]
            },] }
];
/** @nocollapse */
McPopoverComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
McPopoverComponent.propDecorators = {
    mcVisibleChange: [{ type: Output, args: ['mcPopoverVisibleChange',] }]
};
export const MC_POPOVER_SCROLL_STRATEGY = new InjectionToken('mc-popover-scroll-strategy');
/** @docs-private */
export function mcPopoverScrollStrategyFactory(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 });
}
/** @docs-private */
export const MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_POPOVER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcPopoverScrollStrategyFactory
};
/** Creates an error to be thrown if the user supplied an invalid popover position. */
export function getMcPopoverInvalidPositionError(position) {
    return Error(`McPopover position "${position}" is invalid.`);
}
const VIEWPORT_MARGIN = 8;
/* Constant distance between popover container border
*  corner according to popover placement and middle of arrow
* */
const POPOVER_ARROW_BORDER_DISTANCE = 20; // tslint:disable-line
/* Constant value for min height and width of anchor element used for popover.
*  Set as POPOVER_ARROW_BORDER_DISTANCE multiplied by 2
*  plus 2px border for both sides of element. Used in check of position management.
* */
const ANCHOR_MIN_HEIGHT_WIDTH = 44; // tslint:disable-line
export class McPopover {
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
        this.resizeListener = () => this.updatePosition();
        this.availablePositions = POSITION_MAP;
        this.defaultPositionsMap = DEFAULT_4_POSITIONS_TO_CSS_MAP;
    }
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    get mcHeader() {
        return this._mcHeader;
    }
    set mcHeader(value) {
        this._mcHeader = value;
        this.updateCompValue('mcHeader', value);
        if (this.isPopoverOpen) {
            this.updatePosition(true);
        }
    }
    get mcContent() {
        return this._mcContent;
    }
    set mcContent(value) {
        this._mcContent = value;
        this.updateCompValue('mcContent', value);
        if (this.isPopoverOpen) {
            this.updatePosition(true);
        }
    }
    get mcFooter() {
        return this._mcFooter;
    }
    set mcFooter(value) {
        this._mcFooter = value;
        this.updateCompValue('mcFooter', value);
        if (this.isPopoverOpen) {
            this.updatePosition(true);
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get mcMouseEnterDelay() {
        return this._mcMouseEnterDelay;
    }
    set mcMouseEnterDelay(value) {
        this._mcMouseEnterDelay = value;
        this.updateCompValue('mcMouseEnterDelay', value);
    }
    get mcMouseLeaveDelay() {
        return this._mcMouseLeaveDelay;
    }
    set mcMouseLeaveDelay(value) {
        this._mcMouseLeaveDelay = value;
        this.updateCompValue('mcMouseLeaveDelay', value);
    }
    get mcTrigger() {
        return this._mcTrigger;
    }
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
    get mcPopoverSize() {
        return this.popoverSize;
    }
    set mcPopoverSize(value) {
        if (value && (value === 'small' || value === 'normal' || value === 'large')) {
            this.popoverSize = value;
            this.updateCompValue('mcPopoverSize', value);
        }
        else {
            this.popoverSize = 'normal';
        }
    }
    get mcPlacementPriority() {
        return this._mcPlacementPriority;
    }
    set mcPlacementPriority(value) {
        if (value && value.length > 0) {
            this._mcPlacementPriority = value;
        }
        else {
            this._mcPlacementPriority = null;
        }
    }
    get mcPlacement() {
        return this._mcPlacement;
    }
    set mcPlacement(value) {
        if (value) {
            this._mcPlacement = value;
            this.updateCompValue('mcPlacement', value);
        }
        else {
            this._mcPlacement = 'top';
        }
    }
    get classList() {
        return this._classList;
    }
    set classList(value) {
        this._classList = value;
        this.updateCompValue('classList', this._classList);
    }
    get mcVisible() {
        return this._mcVisible;
    }
    set mcVisible(externalValue) {
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
    get isOpen() {
        return this.isPopoverOpen;
    }
    /** Create the overlay config and position strategy */
    createOverlay() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-popover')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions([...EXTENDED_OVERLAY_POSITIONS]);
        const scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges
            .pipe(takeUntil(this.destroyed))
            .subscribe((change) => {
            if (this.popover) {
                this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && this.popover.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the popover.
                    this.ngZone.run(() => this.hide());
                }
            }
        });
        this.overlayRef = this.overlay.create({
            direction: this.direction,
            positionStrategy: strategy,
            panelClass: 'mc-popover__panel',
            scrollStrategy: this.scrollStrategy(),
            hasBackdrop: this.hasBackdrop,
            backdropClass: this.backdropClass
        });
        this.closeSubscription = this.closingActions()
            // need for close popover on trigger click, because popover fire unexpected events: hide and then show
            // todo need fix it
            .pipe(delay(0))
            .subscribe(() => this.hide());
        this.updatePosition();
        this.overlayRef.detachments()
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.detach());
        return this.overlayRef;
    }
    detach() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.popover = null;
    }
    onPositionChange($event) {
        let updatedPlacement = this.mcPlacement;
        Object.keys(this.availablePositions).some((key) => {
            if ($event.connectionPair.originX === this.availablePositions[key].originX &&
                $event.connectionPair.originY === this.availablePositions[key].originY &&
                $event.connectionPair.overlayX === this.availablePositions[key].overlayX &&
                $event.connectionPair.overlayY === this.availablePositions[key].overlayY) {
                updatedPlacement = key;
                return true;
            }
            return false;
        });
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
    handlePositionUpdate(updatedPlacement) {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        const currentContainer = this.overlayRef.overlayElement.style;
        const elementHeight = this.hostView.element.nativeElement.clientHeight;
        const elementWidth = this.hostView.element.nativeElement.clientWidth;
        const verticalOffset = Math.floor(elementHeight / 2); // tslint:disable-line
        const horizontalOffset = Math.floor(elementWidth / 2 - 6); // tslint:disable-line
        const offsets = {
            top: verticalOffset,
            bottom: verticalOffset,
            right: horizontalOffset,
            left: horizontalOffset
        };
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
    updateCompValue(key, value) {
        if (this.isDynamicPopover && value) {
            if (this.popover) {
                this.popover[key] = value;
            }
        }
    }
    ngOnInit() {
        this.initElementRefListeners();
    }
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.manualListeners.forEach((listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        this.manualListeners.clear();
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
        this.closeSubscription.unsubscribe();
    }
    handleKeydown(e) {
        // tslint:disable-next-line: deprecation
        if (this.isOpen && e.keyCode === ESCAPE) {
            this.hide();
        }
    }
    handleTouchend() {
        this.hide();
    }
    initElementRefListeners() {
        if (this.mcTrigger === PopoverTriggers.Click) {
            this.manualListeners
                .set('click', () => this.show())
                .forEach((listener, event) => {
                this.elementRef.nativeElement.addEventListener(event, listener);
            });
        }
        else if (this.mcTrigger === PopoverTriggers.Hover) {
            this.manualListeners
                .set('mouseenter', () => this.show())
                .set('mouseleave', () => this.hide())
                .forEach((listener, event) => {
                this.elementRef.nativeElement.addEventListener(event, listener);
            });
        }
        else if (this.mcTrigger === PopoverTriggers.Focus) {
            this.manualListeners
                .set('focus', () => this.show())
                .set('blur', () => this.hide())
                .forEach((listener, event) => {
                this.elementRef.nativeElement.addEventListener(event, listener);
            });
        }
    }
    registerResizeHandler() {
        // The resize handler is currently responsible for detecting slider dimension
        // changes and therefore doesn't cause a value change that needs to be propagated.
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('resize', this.resizeListener);
        });
    }
    deregisterResizeHandler() {
        window.removeEventListener('resize', this.resizeListener);
    }
    resetListeners() {
        if (this.manualListeners.size) {
            this.manualListeners.forEach((listener, event) => {
                this.elementRef.nativeElement.removeEventListener(event, listener);
            });
            this.manualListeners.clear();
            this.initElementRefListeners();
        }
    }
    show() {
        if (this.disabled) {
            return;
        }
        if (!this.popover) {
            this.detach();
            const overlayRef = this.createOverlay();
            this.portal = this.portal || new ComponentPortal(McPopoverComponent, this.hostView);
            this.popover = overlayRef.attach(this.portal).instance;
            this.popover.afterHidden()
                .pipe(takeUntil(this.destroyed))
                .subscribe(() => this.detach());
            this.isDynamicPopover = true;
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
            properties.forEach((property) => this.updateCompValue(property, this[property]));
            this.popover.mcVisibleChange
                .pipe(takeUntil(this.$unsubscribe), distinctUntilChanged())
                .subscribe((data) => {
                this.mcVisible = data;
                this.mcVisibleChange.emit(data);
                this.isPopoverOpen = data;
            });
        }
        this.popover.show();
    }
    hide() {
        if (this.popover) {
            this.popover.hide();
        }
    }
    /** Updates the position of the current popover. */
    updatePosition(reapplyPosition = false) {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        const position = this.overlayRef.getConfig().positionStrategy;
        position.withPositions(this.getPrioritizedPositions()).withPush(true);
        if (reapplyPosition) {
            setTimeout(() => position.reapplyLastPosition());
        }
    }
    closingActions() {
        const backdrop = this.overlayRef.backdropClick();
        const outsidePointerEvents = this.overlayRef.outsidePointerEvents();
        const detachments = this.overlayRef.detachments();
        return merge(backdrop, outsidePointerEvents, detachments);
    }
    getPriorityPlacementStrategy(value) {
        const result = [];
        const possiblePositions = Object.keys(this.availablePositions);
        if (Array.isArray(value)) {
            value.forEach((position) => {
                if (possiblePositions.includes(position)) {
                    result.push(this.availablePositions[position]);
                }
            });
        }
        else if (possiblePositions.includes(value)) {
            result.push(this.availablePositions[value]);
        }
        return result;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUlILE9BQU8sRUFFUCxnQkFBZ0IsRUFFbkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQ0gsOEJBQThCLEVBQzlCLDBCQUEwQixFQUMxQixZQUFZLEVBQUUsMEJBQTBCLEVBQ3hDLG1CQUFtQixFQUN0QixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakYsT0FBTyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUczRCxJQUFLLGVBSUo7QUFKRCxXQUFLLGVBQWU7SUFDaEIsa0NBQWUsQ0FBQTtJ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Qjs0Q0FrZFgsTUFBTSxTQUFDLDBCQUEwQjtZQTllakMsY0FBYyx1QkErZWQsUUFBUTs7OzRCQXJNWixLQUFLOzhCQUVMLE1BQU0sU0FBQyx3QkFBd0I7Z0RBRS9CLE1BQU0sU0FBQywwQ0FBMEM7MEJBR2pELEtBQUs7dUJBV0wsS0FBSyxTQUFDLGlCQUFpQjt3QkFjdkIsS0FBSyxTQUFDLGtCQUFrQjt1QkFjeEIsS0FBSyxTQUFDLGlCQUFpQjt1QkFnQnZCLEtBQUssU0FBQyxtQkFBbUI7Z0NBU3pCLEtBQUssU0FBQywwQkFBMEI7Z0NBVWhDLEtBQUssU0FBQywwQkFBMEI7d0JBVWhDLEtBQUssU0FBQyxrQkFBa0I7NEJBaUJ4QixLQUFLLFNBQUMsZUFBZTtrQ0FjckIsS0FBSyxTQUFDLDRCQUE0QjswQkFhbEMsS0FBSyxTQUFDLG9CQUFvQjt3QkFjMUIsS0FBSyxTQUFDLGdCQUFnQjt3QkFVdEIsS0FBSyxTQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSxcbiAgICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlSZWYsXG4gICAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBERUZBVUxUXzRfUE9TSVRJT05TX1RPX0NTU19NQVAsXG4gICAgRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlMsXG4gICAgUE9TSVRJT05fTUFQLCBQT1NJVElPTl9QUklPUklUWV9TVFJBVEVHWSxcbiAgICBQT1NJVElPTl9UT19DU1NfTUFQXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jUG9wb3ZlckFuaW1hdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItYW5pbWF0aW9ucyc7XG5cblxuZW51bSBQb3BvdmVyVHJpZ2dlcnMge1xuICAgIENsaWNrID0gJ2NsaWNrJyxcbiAgICBGb2N1cyA9ICdmb2N1cycsXG4gICAgSG92ZXIgPSAnaG92ZXInXG59XG5cbmV4cG9ydCBlbnVtIFBvcG92ZXJWaXNpYmlsaXR5IHtcbiAgICBJbml0aWFsID0gJ2luaXRpYWwnLFxuICAgIFZpc2libGUgPSAndmlzaWJsZScsXG4gICAgSGlkZGVuID0gJ2hpZGRlbidcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXBvcG92ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wb3BvdmVyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFttY1BvcG92ZXJBbmltYXRpb25zLnBvcG92ZXJTdGF0ZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzXSc6ICdnZXRDc3NDbGFzc2VzTGlzdCcsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQb3BvdmVyQ29tcG9uZW50IHtcbiAgICBwb3NpdGlvbnM6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFsuLi5FWFRFTkRFRF9PVkVSTEFZX1BPU0lUSU9OU107XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgcG9wb3ZlclZpc2liaWxpdHk6IFBvcG92ZXJWaXNpYmlsaXR5ID0gUG9wb3ZlclZpc2liaWxpdHkuSW5pdGlhbDtcbiAgICBjbG9zZU9uSW50ZXJhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBtY0NvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgbWNIZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgbWNGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KCdtY1BvcG92ZXJWaXNpYmxlQ2hhbmdlJykgbWNWaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVHJpZ2dlcjogc3RyaW5nID0gUG9wb3ZlclRyaWdnZXJzLkhvdmVyO1xuXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG5cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX21jUGxhY2VtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMudW5zaGlmdChQT1NJVElPTl9NQVBbdGhpcy5tY1BsYWNlbWVudF0pO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICAgIGdldCBtY1BvcG92ZXJTaXplKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXJTaXplO1xuICAgIH1cblxuICAgIHNldCBtY1BvcG92ZXJTaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnBvcG92ZXJTaXplKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJTaXplID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJTaXplID0gJ25vcm1hbCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcG92ZXJTaXplOiBzdHJpbmc7XG5cbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21jVmlzaWJsZS52YWx1ZSAhPT0gdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQodmlzaWJsZSk7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIGdldCBjbGFzc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGFzc0xpc3Quam9pbignICcpO1xuICAgIH1cblxuICAgIHNldCBjbGFzc0xpc3QodmFsdWU6IHN0cmluZykge1xuICAgICAgICBsZXQgbGlzdDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxpc3QgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3QucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jbGFzc0xpc3QgPSBsaXN0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsYXNzTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICAgIGdldCBnZXRDc3NDbGFzc2VzTGlzdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5jbGFzc0xpc3R9IG1jLXBvcG92ZXItJHt0aGlzLm1jUG9wb3ZlclNpemV9IG1jLXBvcG92ZXJfcGxhY2VtZW50LSR7dGhpcy5nZXRQbGFjZW1lbnRDbGFzc31gO1xuICAgIH1cblxuICAgIGdldCBnZXRQbGFjZW1lbnRDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gUE9TSVRJT05fVE9fQ1NTX01BUFt0aGlzLm1jUGxhY2VtZW50XTtcbiAgICB9XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuVmlzaWJsZTtcbiAgICB9XG5cbiAgICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHBvcG92ZXIgaGFzIGJlZW4gaGlkZGVuIGZyb20gdGhlIHZpZXcgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uSGlkZVN1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgY29tcG9uZW50RWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSBFU0NBUEUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNOb25FbXB0eUNvbnRlbnQoKSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9IFBvcG92ZXJWaXNpYmlsaXR5LlZpc2libGU7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9IFBvcG92ZXJWaXNpYmlsaXR5LkhpZGRlbjtcbiAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQoZmFsc2UpO1xuICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgICAvLyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byBPblB1c2ggaXQgd2lsbCBiZSBjaGVja2VkIGFueXdheXNcbiAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBpc05vbkVtcHR5Q29udGVudCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5tY0NvbnRlbnQgJiYgKHRoaXMuaXNUZW1wbGF0ZVJlZih0aGlzLm1jQ29udGVudCkgfHwgdGhpcy5pc05vbkVtcHR5U3RyaW5nKHRoaXMubWNDb250ZW50KSk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHdoZW4gdGhlIHBvcG92ZXIgaGFzIGJlZW4gaGlkZGVuIGZyb20gdmlldy4gKi9cbiAgICBhZnRlckhpZGRlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25IaWRlU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXJWaXNpYmlsaXR5ID09PSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlO1xuICAgIH1cblxuICAgIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBpc1RlbXBsYXRlUmVmKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgfVxuXG4gICAgaXNOb25FbXB0eVN0cmluZyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJztcbiAgICB9XG5cbiAgICBhbmltYXRpb25TdGFydCgpIHtcbiAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b1N0YXRlID0gZXZlbnQudG9TdGF0ZSBhcyBQb3BvdmVyVmlzaWJpbGl0eTtcblxuICAgICAgICBpZiAodG9TdGF0ZSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuSGlkZGVuICYmICF0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZVN1YmplY3QubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvU3RhdGUgPT09IFBvcG92ZXJWaXNpYmlsaXR5LlZpc2libGUgfHwgdG9TdGF0ZSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlT25JbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1kgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLXBvcG92ZXItc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gbWNQb3BvdmVyU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5KG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKHtzY3JvbGxUaHJvdHRsZTogMjB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1BvcG92ZXJTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbi8qKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biBpZiB0aGUgdXNlciBzdXBwbGllZCBhbiBpbnZhbGlkIHBvcG92ZXIgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNQb3BvdmVySW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBFcnJvcihgTWNQb3BvdmVyIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG5jb25zdCBWSUVXUE9SVF9NQVJHSU46IG51bWJlciA9IDg7XG5cbi8qIENvbnN0YW50IGRpc3RhbmNlIGJldHdlZW4gcG9wb3ZlciBjb250YWluZXIgYm9yZGVyXG4qICBjb3JuZXIgYWNjb3JkaW5nIHRvIHBvcG92ZXIgcGxhY2VtZW50IGFuZCBtaWRkbGUgb2YgYXJyb3dcbiogKi9cbmNvbnN0IFBPUE9WRVJfQVJST1dfQk9SREVSX0RJU1RBTkNFOiBudW1iZXIgPSAyMDsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4vKiBDb25zdGFudCB2YWx1ZSBmb3IgbWluIGhlaWdodCBhbmQgd2lkdGggb2YgYW5jaG9yIGVsZW1lbnQgdXNlZCBmb3IgcG9wb3Zlci5cbiogIFNldCBhcyBQT1BPVkVSX0FSUk9XX0JPUkRFUl9ESVNUQU5DRSBtdWx0aXBsaWVkIGJ5IDJcbiogIHBsdXMgMnB4IGJvcmRlciBmb3IgYm90aCBzaWRlcyBvZiBlbGVtZW50LiBVc2VkIGluIGNoZWNrIG9mIHBvc2l0aW9uIG1hbmFnZW1lbnQuXG4qICovXG5jb25zdCBBTkNIT1JfTUlOX0hFSUdIVF9XSURUSDogbnVtYmVyID0gNDQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNQb3BvdmVyXScsXG4gICAgZXhwb3J0QXM6ICdtY1BvcG92ZXInLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1wb3BvdmVyX29wZW5dJzogJ2lzT3BlbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3ZlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBpc1BvcG92ZXJPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNEeW5hbWljUG9wb3ZlciA9IGZhbHNlO1xuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICAgIHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1jUG9wb3ZlckNvbXBvbmVudD47XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiB7IFtrZXk6IHN0cmluZ106IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIgfTtcbiAgICBkZWZhdWx0UG9zaXRpb25zTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ307XG4gICAgcG9wb3ZlcjogTWNQb3BvdmVyQ29tcG9uZW50IHwgbnVsbDtcblxuICAgIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M6IHN0cmluZyA9ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCc7XG5cbiAgICBAT3V0cHV0KCdtY1BvcG92ZXJWaXNpYmxlQ2hhbmdlJykgbWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyUG9zaXRpb25TdHJhdGVneVBsYWNlbWVudENoYW5nZScpXG4gICAgbWNQb3NpdGlvblN0cmF0ZWd5UGxhY2VtZW50Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhhc0JhY2tkcm9wKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzQmFja2Ryb3A7XG4gICAgfVxuXG4gICAgc2V0IGhhc0JhY2tkcm9wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hhc0JhY2tkcm9wID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNCYWNrZHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJIZWFkZXInKVxuICAgIGdldCBtY0hlYWRlcigpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jSGVhZGVyO1xuICAgIH1cbiAgICBzZXQgbWNIZWFkZXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNIZWFkZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jSGVhZGVyJywgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUG9wb3Zlck9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNIZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckNvbnRlbnQnKVxuICAgIGdldCBtY0NvbnRlbnQoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY0NvbnRlbnQ7XG4gICAgfVxuICAgIHNldCBtY0NvbnRlbnQodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNDb250ZW50ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY0NvbnRlbnQnLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQb3BvdmVyT3Blbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY0NvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckZvb3RlcicpXG4gICAgZ2V0IG1jRm9vdGVyKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNGb290ZXI7XG4gICAgfVxuICAgIHNldCBtY0Zvb3Rlcih2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9tY0Zvb3RlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNGb290ZXInLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQb3BvdmVyT3Blbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY0Zvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHByaXZhdGUgJHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJNb3VzZUVudGVyRGVsYXknKVxuICAgIGdldCBtY01vdXNlRW50ZXJEZWxheSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNNb3VzZUVudGVyRGVsYXk7XG4gICAgfVxuICAgIHNldCBtY01vdXNlRW50ZXJEZWxheSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21jTW91c2VFbnRlckRlbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY01vdXNlRW50ZXJEZWxheScsIHZhbHVlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNNb3VzZUVudGVyRGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyTW91c2VMZWF2ZURlbGF5JylcbiAgICBnZXQgbWNNb3VzZUxlYXZlRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5O1xuICAgIH1cbiAgICBzZXQgbWNNb3VzZUxlYXZlRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlTGVhdmVEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUxlYXZlRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgX21jTW91c2VMZWF2ZURlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclRyaWdnZXInKVxuICAgIGdldCBtY1RyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgbWNUcmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1RyaWdnZXInLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSBQb3BvdmVyVHJpZ2dlcnMuQ2xpY2s7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVHJpZ2dlcjogc3RyaW5nID0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJTaXplJylcbiAgICBnZXQgbWNQb3BvdmVyU2l6ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyU2l6ZTtcbiAgICB9XG4gICAgc2V0IG1jUG9wb3ZlclNpemUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgJiYgKHZhbHVlID09PSAnc21hbGwnIHx8IHZhbHVlID09PSAnbm9ybWFsJyB8fCB2YWx1ZSA9PT0gJ2xhcmdlJykpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BvcG92ZXJTaXplJywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyU2l6ZSA9ICdub3JtYWwnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgcG9wb3ZlclNpemU6IHN0cmluZyA9ICdub3JtYWwnO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJQbGFjZW1lbnRQcmlvcml0eScpXG4gICAgZ2V0IG1jUGxhY2VtZW50UHJpb3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudFByaW9yaXR5O1xuICAgIH1cbiAgICBzZXQgbWNQbGFjZW1lbnRQcmlvcml0eSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnRQcmlvcml0eSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnRQcmlvcml0eSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnRQcmlvcml0eTogc3RyaW5nIHwgc3RyaW5nW10gfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyUGxhY2VtZW50JylcbiAgICBnZXQgbWNQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50O1xuICAgIH1cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQbGFjZW1lbnQnLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyQ2xhc3MnKVxuICAgIGdldCBjbGFzc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGFzc0xpc3Q7XG4gICAgfVxuICAgIHNldCBjbGFzc0xpc3QodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuX2NsYXNzTGlzdCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnY2xhc3NMaXN0JywgdGhpcy5fY2xhc3NMaXN0KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfY2xhc3NMaXN0OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyVmlzaWJsZScpXG4gICAgZ2V0IG1jVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVmlzaWJsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNWaXNpYmxlKGV4dGVybmFsVmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZXh0ZXJuYWxWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21jVmlzaWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVmlzaWJsZScsIHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzUG9wb3Zlck9wZW47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYW51YWxMaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdD4oKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgcHJpdmF0ZSBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSkgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zID0gUE9TSVRJT05fTUFQO1xuICAgICAgICB0aGlzLmRlZmF1bHRQb3NpdGlvbnNNYXAgPSBERUZBVUxUXzRfUE9TSVRJT05TX1RPX0NTU19NQVA7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb25maWcgYW5kIHBvc2l0aW9uIHN0cmF0ZWd5ICovXG4gICAgY3JlYXRlT3ZlcmxheSgpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBjb25uZWN0ZWQgcG9zaXRpb24gc3RyYXRlZ3kgdGhhdCBsaXN0ZW5zIGZvciBzY3JvbGwgZXZlbnRzIHRvIHJlcG9zaXRpb24uXG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5tYy1wb3BvdmVyJylcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbihWSUVXUE9SVF9NQVJHSU4pXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbLi4uRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlNdKTtcblxuICAgICAgICBjb25zdCBzY3JvbGxhYmxlQW5jZXN0b3JzID0gdGhpcy5zY3JvbGxEaXNwYXRjaGVyLmdldEFuY2VzdG9yU2Nyb2xsQ29udGFpbmVycyh0aGlzLmVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHN0cmF0ZWd5LndpdGhTY3JvbGxhYmxlQ29udGFpbmVycyhzY3JvbGxhYmxlQW5jZXN0b3JzKTtcblxuICAgICAgICBzdHJhdGVneS5wb3NpdGlvbkNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUG9zaXRpb25DaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnNjcm9sbGFibGVWaWV3UHJvcGVydGllcy5pc092ZXJsYXlDbGlwcGVkICYmIHRoaXMucG9wb3Zlci5tY1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcG9zaXRpb24gY2hhbmdlcyBvY2N1ciBhbmQgdGhlIG92ZXJsYXkgaXMgY2xpcHBlZCBieVxuICAgICAgICAgICAgICAgICAgICAvLyBhIHBhcmVudCBzY3JvbGxhYmxlIHRoZW4gY2xvc2UgdGhlIHBvcG92ZXIuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24sXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiBzdHJhdGVneSxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICdtYy1wb3BvdmVyX19wYW5lbCcsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IHRoaXMuaGFzQmFja2Ryb3AsXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmJhY2tkcm9wQ2xhc3NcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbiA9IHRoaXMuY2xvc2luZ0FjdGlvbnMoKVxuICAgICAgICAgICAgLy8gbmVlZCBmb3IgY2xvc2UgcG9wb3ZlciBvbiB0cmlnZ2VyIGNsaWNrLCBiZWNhdXNlIHBvcG92ZXIgZmlyZSB1bmV4cGVjdGVkIGV2ZW50czogaGlkZSBhbmQgdGhlbiBzaG93XG4gICAgICAgICAgICAvLyB0b2RvIG5lZWQgZml4IGl0XG4gICAgICAgICAgICAucGlwZShkZWxheSgwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcG92ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50OiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRQbGFjZW1lbnQgPSB0aGlzLm1jUGxhY2VtZW50O1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucykuc29tZSgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWCAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5ZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblkgJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkUGxhY2VtZW50ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdXBkYXRlZFBsYWNlbWVudCk7XG4gICAgICAgIHRoaXMubWNQb3NpdGlvblN0cmF0ZWd5UGxhY2VtZW50Q2hhbmdlLmVtaXQodXBkYXRlZFBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ2NsYXNzTGlzdCcsIHRoaXMuY2xhc3NMaXN0KTtcbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kZWZhdWx0UG9zaXRpb25zTWFwW3VwZGF0ZWRQbGFjZW1lbnRdKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uVXBkYXRlKHVwZGF0ZWRQbGFjZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlUG9zaXRpb25VcGRhdGUodXBkYXRlZFBsYWNlbWVudDogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGU7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmhvc3RWaWV3LmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IHRoaXMuaG9zdFZpZXcuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbE9mZnNldDogbnVtYmVyID0gTWF0aC5mbG9vcihlbGVtZW50SGVpZ2h0IC8gMik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldDogbnVtYmVyID0gTWF0aC5mbG9vcihlbGVtZW50V2lkdGggLyAyIC0gNik7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgY29uc3Qgb2Zmc2V0czogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHtcbiAgICAgICAgICAgIHRvcDogdmVydGljYWxPZmZzZXQsXG4gICAgICAgICAgICBib3R0b206IHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgcmlnaHQ6IGhvcml6b250YWxPZmZzZXQsXG4gICAgICAgICAgICBsZWZ0OiBob3Jpem9udGFsT2Zmc2V0XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc3R5bGVQcm9wZXJ0eSA9IHVwZGF0ZWRQbGFjZW1lbnQuc3BsaXQoLyg/PVtBLVpdKS8pWzFdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKCgoc3R5bGVQcm9wZXJ0eSA9PT0gJ3RvcCcgfHwgc3R5bGVQcm9wZXJ0eSA9PT0gJ2JvdHRvbScpICYmXG4gICAgICAgICAgICBlbGVtZW50SGVpZ2h0ID4gQU5DSE9SX01JTl9IRUlHSFRfV0lEVEgpIHx8XG4gICAgICAgICAgICAoKHN0eWxlUHJvcGVydHkgPT09ICdsZWZ0JyB8fCBzdHlsZVByb3BlcnR5ID09PSAncmlnaHQnKSAmJlxuICAgICAgICAgICAgZWxlbWVudFdpZHRoID4gQU5DSE9SX01JTl9IRUlHSFRfV0lEVEgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZVtzdHlsZVByb3BlcnR5XSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlW3N0eWxlUHJvcGVydHldID0gJzBweCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGVbc3R5bGVQcm9wZXJ0eV0gPVxuICAgICAgICAgICAgYCR7cGFyc2VJbnQoY3VycmVudENvbnRhaW5lcltzdHlsZVByb3BlcnR5XS5zcGxpdCgncHgnKVswXSwgMTApICtcbiAgICAgICAgICAgIG9mZnNldHNbc3R5bGVQcm9wZXJ0eV0gLSBQT1BPVkVSX0FSUk9XX0JPUkRFUl9ESVNUQU5DRX1weGA7XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHVwZGF0ZUNvbXBWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0R5bmFtaWNQb3BvdmVyICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgdGhpcy5jbG9zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiBlLmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaGVuZCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ2NsaWNrJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tY1RyaWdnZXIgPT09IFBvcG92ZXJUcmlnZ2Vycy5Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWVudGVyJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VsZWF2ZScsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWNUcmlnZ2VyID09PSBQb3BvdmVyVHJpZ2dlcnMuRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnZm9jdXMnLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdibHVyJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgICAgIC8vIFRoZSByZXNpemUgaGFuZGxlciBpcyBjdXJyZW50bHkgcmVzcG9uc2libGUgZm9yIGRldGVjdGluZyBzbGlkZXIgZGltZW5zaW9uXG4gICAgICAgIC8vIGNoYW5nZXMgYW5kIHRoZXJlZm9yZSBkb2Vzbid0IGNhdXNlIGEgdmFsdWUgY2hhbmdlIHRoYXQgbmVlZHMgdG8gYmUgcHJvcGFnYXRlZC5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHJlc2V0TGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tYW51YWxMaXN0ZW5lcnMuc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0RWxlbWVudFJlZkxpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG5cbiAgICAgICAgICAgIHRoaXMucG9ydGFsID0gdGhpcy5wb3J0YWwgfHwgbmV3IENvbXBvbmVudFBvcnRhbChNY1BvcG92ZXJDb21wb25lbnQsIHRoaXMuaG9zdFZpZXcpO1xuXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIgPSBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCkuaW5zdGFuY2U7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGFjaCgpKTtcblxuICAgICAgICAgICAgdGhpcy5pc0R5bmFtaWNQb3BvdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBbXG4gICAgICAgICAgICAgICAgJ21jUGxhY2VtZW50JyxcbiAgICAgICAgICAgICAgICAnbWNQb3BvdmVyU2l6ZScsXG4gICAgICAgICAgICAgICAgJ21jVHJpZ2dlcicsXG4gICAgICAgICAgICAgICAgJ21jTW91c2VFbnRlckRlbGF5JyxcbiAgICAgICAgICAgICAgICAnbWNNb3VzZUxlYXZlRGVsYXknLFxuICAgICAgICAgICAgICAgICdjbGFzc0xpc3QnLFxuICAgICAgICAgICAgICAgICdtY1Zpc2libGUnLFxuICAgICAgICAgICAgICAgICdtY0hlYWRlcicsXG4gICAgICAgICAgICAgICAgJ21jQ29udGVudCcsXG4gICAgICAgICAgICAgICAgJ21jRm9vdGVyJ1xuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4gdGhpcy51cGRhdGVDb21wVmFsdWUocHJvcGVydHksIHRoaXNbcHJvcGVydHldKSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9wb3Zlci5tY1Zpc2libGVDaGFuZ2VcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy4kdW5zdWJzY3JpYmUpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGUgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUG9wb3Zlck9wZW4gPSBkYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb3BvdmVyLnNob3coKTtcbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHBvcG92ZXIuICovXG4gICAgdXBkYXRlUG9zaXRpb24ocmVhcHBseVBvc2l0aW9uOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgICAgIHBvc2l0aW9uLndpdGhQb3NpdGlvbnModGhpcy5nZXRQcmlvcml0aXplZFBvc2l0aW9ucygpKS53aXRoUHVzaCh0cnVlKTtcblxuICAgICAgICBpZiAocmVhcHBseVBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBvc2l0aW9uLnJlYXBwbHlMYXN0UG9zaXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsb3NpbmdBY3Rpb25zKCkge1xuICAgICAgICBjb25zdCBiYWNrZHJvcCA9IHRoaXMub3ZlcmxheVJlZiEuYmFja2Ryb3BDbGljaygpO1xuICAgICAgICBjb25zdCBvdXRzaWRlUG9pbnRlckV2ZW50cyA9IHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKTtcbiAgICAgICAgY29uc3QgZGV0YWNobWVudHMgPSB0aGlzLm92ZXJsYXlSZWYhLmRldGFjaG1lbnRzKCk7XG5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGJhY2tkcm9wLCBvdXRzaWRlUG9pbnRlckV2ZW50cywgZGV0YWNobWVudHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UHJpb3JpdHlQbGFjZW1lbnRTdHJhdGVneSh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10ge1xuICAgICAgICBjb25zdCByZXN1bHQ6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFtdO1xuICAgICAgICBjb25zdCBwb3NzaWJsZVBvc2l0aW9ucyA9IE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChwb3NpdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlUG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1twb3NpdGlvbl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHBvc3NpYmxlUG9zaXRpb25zLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5hdmFpbGFibGVQb3NpdGlvbnNbdmFsdWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQcmlvcml0aXplZFBvc2l0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMubWNQbGFjZW1lbnRQcmlvcml0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJpb3JpdHlQbGFjZW1lbnRTdHJhdGVneSh0aGlzLm1jUGxhY2VtZW50UHJpb3JpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFBPU0lUSU9OX1BSSU9SSVRZX1NUUkFURUdZW3RoaXMubWNQbGFjZW1lbnRdO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplTGlzdGVuZXIgPSAoKSA9PiB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG59XG4iXX0=
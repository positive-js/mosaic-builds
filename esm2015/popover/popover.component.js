import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { DEFAULT_4_POSITIONS_TO_CSS_MAP, EXTENDED_OVERLAY_POSITIONS, POSITION_MAP, POSITION_PRIORITY_STRATEGY, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, merge, NEVER, Subject, Subscription } from 'rxjs';
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
                styles: ["@-webkit-keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 0,transparent 20px,rgba(0,0,0,.05) 0,rgba(0,0,0,.05) 30px,transparent 0) repeat;background-size:29px 29px;-webkit-animation:mc-progress 1s linear infinite;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;height:100%;width:100%;position:fixed}.cdk-overlay-backdrop,.cdk-overlay-container{top:0;left:0;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{bottom:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto}.cdk-overlay-pane{pointer-events:auto;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box,.cdk-overlay-pane{box-sizing:border-box;position:absolute;margin:0;padding:0;z-index:1000}.cdk-overlay-connected-position-bounding-box{display:flex;flex-direction:column;min-width:1px;min-height:1px}.mc-popover{position:relative;display:block;border-radius:var(--mc-popover-size-border-radius,4px);border-width:var(--mc-popover-size-border-width,1px);border-style:solid;box-sizing:border-box;visibility:visible;z-index:1030;list-style:none;white-space:pre-line}.mc-popover-small,.mc-popover-small .mc-popover{max-width:var(--mc-popover-size-small-width,200px)}.mc-popover-normal,.mc-popover-normal .mc-popover{max-width:var(--mc-popover-size-normal-width,400px)}.mc-popover-large,.mc-popover-large .mc-popover{max-width:var(--mc-popover-size-large-width,640px)}.mc-popover__container{border-radius:var(--mc-popover-size-border-radius,4px);overflow:hidden}.mc-popover__header{padding:var(--mc-popover-header-size-padding,10px 16px);border-bottom-width:var(--mc-popover-size-border-width,1px);border-bottom-style:solid}.mc-popover__content{padding:var(--mc-popover-size-padding,16px)}.mc-popover__footer{margin-top:var(--mc-popover-footer-size-margin-top,8px);padding:var(--mc-popover-footer-size-padding,12px 16px);border-top-width:var(--mc-popover-size-border-width,1px);border-top-style:solid}.mc-popover_placement-top-left .mc-popover,.mc-popover_placement-top-right .mc-popover,.mc-popover_placement-top .mc-popover{margin-bottom:calc(var(--mc-popover-size-arrow-width, 4px) * 2)}.mc-popover_placement-right-bottom .mc-popover,.mc-popover_placement-right-top .mc-popover,.mc-popover_placement-right .mc-popover{margin-left:calc(var(--mc-popover-size-arrow-width, 4px) * 2)}.mc-popover_placement-bottom-left .mc-popover,.mc-popover_placement-bottom-right .mc-popover,.mc-popover_placement-bottom .mc-popover{margin-top:calc(var(--mc-popover-size-arrow-width, 4px) * 2)}.mc-popover_placement-left-bottom .mc-popover,.mc-popover_placement-left-top .mc-popover,.mc-popover_placement-left .mc-popover{margin-right:calc(var(--mc-popover-size-arrow-width, 4px) * 2)}.mc-popover__arrow{position:absolute;z-index:-1;width:14px;height:14px;border:1px solid;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));left:50%;margin-left:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-top-left .mc-popover__arrow{bottom:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));left:20px;margin-left:0}.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));right:20px;margin-left:0}.mc-popover_placement-right .mc-popover__arrow{top:50%}.mc-popover_placement-right-top .mc-popover__arrow,.mc-popover_placement-right .mc-popover__arrow{left:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-right-top .mc-popover__arrow{top:18px}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));bottom:14px;margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-left .mc-popover__arrow{top:50%}.mc-popover_placement-left-top .mc-popover__arrow,.mc-popover_placement-left .mc-popover__arrow{right:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-left-top .mc-popover__arrow{top:18px}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));bottom:14px;margin-top:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));left:50%;margin-left:calc(-1 * var(--mc-popover-size-arrow-width, 4px))}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));left:20px;margin-left:0}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc(-1 * (var(--mc-popover-size-arrow-width, 4px) + 2px));right:20px;margin-left:0}"]
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
        const outsidePointerEvents = this.hasBackdrop ? NEVER : this.overlayRef.outsidePointerEvents();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUlILE9BQU8sRUFFUCxnQkFBZ0IsRUFFbkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQ0gsOEJBQThCLEVBQzlCLDBCQUEwQixFQUMxQixZQUFZLEVBQUUsMEJBQTBCLEVBQ3hDLG1CQUFtQixFQUN0QixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHM0QsSUFBSyxlQUlKO0FBSkQsV0FBSyxlQUFlO0lBQ2hCLGtDQUFlLENBQUE7SUFDZixrQ0FBZSxDQUFBO0lBQ2Ysa0NBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSkksZUFBZSxLQUFmLGVBQWUsUUFJbkI7QUFFRCxNQUFNLENBQU4sSUFBWSxpQkFJWDtBQUpELFdBQVksaUJBQWlCO0lBQ3pCLHdDQUFtQixDQUFBO0lBQ25CLHdDQUFtQixDQUFBO0lBQ25CLHNDQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxpQkFBaUIsS0FBakIsaUJBQWlCLFFBSTVCO0FBZ0JELE1BQU0sT0FBTyxrQkFBa0I7SUFrRzNCLFlBQW1CLGlCQUFvQyxFQUFTLG1CQUErQjtRQUE1RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFZO1FBakcvRixjQUFTLEdBQTZCLENBQUMsR0FBRywwQkFBMEIsQ0FBQyxDQUFDO1FBRXRFLHNCQUFpQixHQUFzQixpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFDakUsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBS0Ysb0JBQWUsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVV0RixlQUFVLEdBQVcsZUFBZSxDQUFDLEtBQUssQ0FBQztRQWUzQyxpQkFBWSxHQUFXLEtBQUssQ0FBQztRQTZCN0IsZUFBVSxHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQWtCM0UsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQWNsQywyRUFBMkU7UUFDMUQsa0JBQWEsR0FBaUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUd6RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO0lBQzNDLENBQUM7SUF6RkQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFJRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLEtBQWE7UUFDekIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7YUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBSUQsSUFBSSxhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLGFBQWEsQ0FBQyxLQUFhO1FBQzNCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7YUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBSUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxTQUFTLENBQUMsS0FBYztRQUN4QixNQUFNLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFJRCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUV4QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFJRCxJQUFJLGlCQUFpQjtRQUNqQixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsZUFBZSxJQUFJLENBQUMsYUFBYSx5QkFBeUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDL0csQ0FBQztJQUVELElBQUksaUJBQWlCO1FBQ2pCLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDaEUsQ0FBQztJQVNELGFBQWEsQ0FBQyxDQUFnQjtRQUMxQix3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1lBQzFCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyx3REFBd0Q7WUFDeEQsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztRQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyx3REFBd0Q7UUFDeEQsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM3RyxDQUFDO0lBRUQsc0ZBQXNGO0lBQ3RGLFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDaEUsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFVO1FBQ3BCLE9BQU8sS0FBSyxZQUFZLFdBQVcsQ0FBQztJQUN4QyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBVTtRQUN2QixPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQXFCO1FBQy9CLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUE0QixDQUFDO1FBRW5ELElBQUksT0FBTyxLQUFLLGlCQUFpQixDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxPQUFPLEtBQUssaUJBQWlCLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7WUFDL0UsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7WUEzTEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QiwyMkNBQXVDO2dCQUN2QyxtQkFBbUIsRUFBRSxLQUFLO2dCQUUxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFVBQVUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQztnQkFDOUMsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSxtQkFBbUI7b0JBQzlCLFdBQVcsRUFBRSx1QkFBdUI7aUJBQ3ZDOzthQUNKOzs7O1lBdkRHLGlCQUFpQjtZQUdqQixVQUFVOzs7OEJBOERULE1BQU0sU0FBQyx3QkFBd0I7O0FBd0twQyxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FDbkMsSUFBSSxjQUFjLENBQXVCLDRCQUE0QixDQUFDLENBQUM7QUFFM0Usb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxPQUFnQjtJQUMzRCxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBQyxjQUFjLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCLE1BQU0sQ0FBQyxNQUFNLDJDQUEyQyxHQUFHO0lBQ3ZELE9BQU8sRUFBRSwwQkFBMEI7SUFDbkMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2YsVUFBVSxFQUFFLDhCQUE4QjtDQUM3QyxDQUFDO0FBRUYsc0ZBQXNGO0FBQ3RGLE1BQU0sVUFBVSxnQ0FBZ0MsQ0FBQyxRQUFnQjtJQUM3RCxPQUFPLEtBQUssQ0FBQyx1QkFBdUIsUUFBUSxlQUFlLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQsTUFBTSxlQUFlLEdBQVcsQ0FBQyxDQUFDO0FBRWxDOztJQUVJO0FBQ0osTUFBTSw2QkFBNkIsR0FBVyxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7QUFFeEU7OztJQUdJO0FBQ0osTUFBTSx1QkFBdUIsR0FBVyxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7QUFXbEUsTUFBTSxPQUFPLFNBQVM7SUF1TWxCLFlBQ1ksT0FBZ0IsRUFDaEIsVUFBc0IsRUFDdEIsTUFBYyxFQUNkLGdCQUFrQyxFQUNsQyxRQUEwQixFQUNVLGNBQWMsRUFDdEMsU0FBeUI7UUFOckMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQ1UsbUJBQWMsR0FBZCxjQUFjLENBQUE7UUFDdEMsY0FBUyxHQUFULFNBQVMsQ0FBZ0I7UUE3TWpELGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQU9oQixrQkFBYSxHQUFXLGtDQUFrQyxDQUFDO1FBRWxDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUdoRixzQ0FBaUMsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVdyRSxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQTRDOUIsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBU25DLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFxQzNCLGVBQVUsR0FBVyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBYzNDLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBYS9CLHlCQUFvQixHQUE2QixJQUFJLENBQUM7UUFjdEQsaUJBQVksR0FBVyxLQUFLLENBQUM7UUFnQzdCLHNCQUFpQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFRdkMsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBOEMsQ0FBQztRQUMvRCxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWlVekMsbUJBQWMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUF0VGpELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLDhCQUE4QixDQUFDO0lBQzlELENBQUM7SUFsTUQsSUFDSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFjO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUlELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBZ0M7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBR0QsSUFDSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFnQztRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFHRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWdDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUtELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSztRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUdELElBQ0ksaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ25DLENBQUM7SUFDRCxJQUFJLGlCQUFpQixDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFHRCxJQUNJLGlCQUFpQjtRQUNqQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxLQUFhO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBR0QsSUFDSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBSUQsSUFDSSxhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxLQUFhO1FBQzNCLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sSUFBSSxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxPQUFPLENBQUMsRUFBRTtZQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoRDthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBR0QsSUFDSSxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDckMsQ0FBQztJQUNELElBQUksbUJBQW1CLENBQUMsS0FBSztRQUN6QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1NBQ3JDO2FBQU07WUFDSCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUdELElBQ0ksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBYTtRQUN6QixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFHRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLEtBQXdCO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsSUFDSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxhQUFzQjtRQUNoQyxNQUFNLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVuRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXpDLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO1NBQ0o7SUFDTCxDQUFDO0lBTUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFrQkQsc0RBQXNEO0lBQ3RELGFBQWE7UUFDVCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM3QjtRQUVELG1GQUFtRjtRQUNuRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTthQUNuQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ3BDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQzthQUNwQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUM7YUFDN0Isa0JBQWtCLENBQUMsZUFBZSxDQUFDO2FBQ25DLGFBQWEsQ0FBQyxDQUFDLEdBQUcsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1FBRXBELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUvRixRQUFRLENBQUMsd0JBQXdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV2RCxRQUFRLENBQUMsZUFBZTthQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQixTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN0QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtvQkFDNUUsNkRBQTZEO29CQUM3RCw4Q0FBOEM7b0JBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN0QzthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2xDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLFVBQVUsRUFBRSxtQkFBbUI7WUFDL0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNwQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQyxzR0FBc0c7WUFDdEcsbUJBQW1CO2FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZCxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO2FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUVwQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQXNDO1FBQ25ELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzlDLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87Z0JBQ3RFLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPO2dCQUN0RSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUTtnQkFDeEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDMUUsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO2dCQUV2QixPQUFPLElBQUksQ0FBQzthQUNmO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU5RCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxnQkFBd0I7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDMUM7UUFFRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUM5RCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1FBQ3ZFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDckUsTUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFDcEYsTUFBTSxnQkFBZ0IsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFDekYsTUFBTSxPQUFPLEdBQThCO1lBQ3ZDLEdBQUcsRUFBRSxjQUFjO1lBQ25CLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsSUFBSSxFQUFFLGdCQUFnQjtTQUN6QixDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTNFLElBQUksQ0FBQyxDQUFDLGFBQWEsS0FBSyxLQUFLLElBQUksYUFBYSxLQUFLLFFBQVEsQ0FBQztZQUN4RCxhQUFhLEdBQUcsdUJBQXVCLENBQUM7WUFDeEMsQ0FBQyxDQUFDLGFBQWEsS0FBSyxNQUFNLElBQUksYUFBYSxLQUFLLE9BQU8sQ0FBQztnQkFDeEQsWUFBWSxHQUFHLHVCQUF1QixDQUFDLEVBQUU7WUFDekMsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQy9EO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUMvQyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMvRCxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsNkJBQTZCLElBQUksQ0FBQztJQUNuRSxDQUFDO0lBRUQsa0NBQWtDO0lBQ2xDLGVBQWUsQ0FBQyxHQUFXLEVBQUUsS0FBVTtRQUNuQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxLQUFLLEVBQUU7WUFDaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDN0I7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGFBQWEsQ0FBQyxDQUFnQjtRQUMxQix3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVELGNBQWM7UUFDVixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHVCQUF1QjtRQUNuQixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxDQUFDLEtBQUssRUFBRTtZQUMxQyxJQUFJLENBQUMsZUFBZTtpQkFDZixHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDL0IsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7U0FDVjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxlQUFlLENBQUMsS0FBSyxFQUFFO1lBQ2pELElBQUksQ0FBQyxlQUFlO2lCQUNmLEdBQUcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNwQyxHQUFHLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDcEMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7U0FDVjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxlQUFlLENBQUMsS0FBSyxFQUFFO1lBQ2pELElBQUksQ0FBQyxlQUFlO2lCQUNmLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMvQixHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDOUIsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsNkVBQTZFO1FBQzdFLGtGQUFrRjtRQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMvQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1QkFBdUI7UUFDbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELGNBQWM7UUFDVixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDdkUsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksZUFBZSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVwRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtpQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUVwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQzdCLE1BQU0sVUFBVSxHQUFHO2dCQUNmLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixXQUFXO2dCQUNYLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUNuQixXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsVUFBVTtnQkFDVixXQUFXO2dCQUNYLFVBQVU7YUFDYixDQUFDO1lBRUYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqRixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWU7aUJBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUM7aUJBQzFELFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsY0FBYyxDQUFDLGtCQUEyQixLQUFLO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBcUQsQ0FBQztRQUNuRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRFLElBQUksZUFBZSxFQUFFO1lBQ2pCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQUVPLGNBQWM7UUFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNsRCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2hHLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkQsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTyw0QkFBNEIsQ0FBQyxLQUF3QjtRQUN6RCxNQUFNLE1BQU0sR0FBNkIsRUFBRSxDQUFDO1FBQzVDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMvRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ2xEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNLElBQUksaUJBQWlCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU8sdUJBQXVCO1FBQzNCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsT0FBTywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBN2dCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixJQUFJLEVBQUU7b0JBQ0YsV0FBVyxFQUFFLHVCQUF1QjtvQkFDcEMsWUFBWSxFQUFFLGtCQUFrQjtvQkFDaEMseUJBQXlCLEVBQUUsUUFBUTtpQkFDdEM7YUFDSjs7OztZQTFSRyxPQUFPO1lBV1AsVUFBVTtZQUtWLE1BQU07WUFkTixnQkFBZ0I7WUFvQmhCLGdCQUFnQjs0Q0FrZFgsTUFBTSxTQUFDLDBCQUEwQjtZQTllakMsY0FBYyx1QkErZWQsUUFBUTs7OzRCQXJNWixLQUFLOzhCQUVMLE1BQU0sU0FBQyx3QkFBd0I7Z0RBRS9CLE1BQU0sU0FBQywwQ0FBMEM7MEJBR2pELEtBQUs7dUJBV0wsS0FBSyxTQUFDLGlCQUFpQjt3QkFjdkIsS0FBSyxTQUFDLGtCQUFrQjt1QkFjeEIsS0FBSyxTQUFDLGlCQUFpQjt1QkFnQnZCLEtBQUssU0FBQyxtQkFBbUI7Z0NBU3pCLEtBQUssU0FBQywwQkFBMEI7Z0NBVWhDLEtBQUssU0FBQywwQkFBMEI7d0JBVWhDLEtBQUssU0FBQyxrQkFBa0I7NEJBaUJ4QixLQUFLLFNBQUMsZUFBZTtrQ0FjckIsS0FBSyxTQUFDLDRCQUE0QjswQkFhbEMsS0FBSyxTQUFDLG9CQUFvQjt3QkFjMUIsS0FBSyxTQUFDLGdCQUFnQjt3QkFVdEIsS0FBSyxTQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSxcbiAgICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlSZWYsXG4gICAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBERUZBVUxUXzRfUE9TSVRJT05TX1RPX0NTU19NQVAsXG4gICAgRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlMsXG4gICAgUE9TSVRJT05fTUFQLCBQT1NJVElPTl9QUklPUklUWV9TVFJBVEVHWSxcbiAgICBQT1NJVElPTl9UT19DU1NfTUFQXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgbWVyZ2UsIE5FVkVSLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBtY1BvcG92ZXJBbmltYXRpb25zIH0gZnJvbSAnLi9wb3BvdmVyLWFuaW1hdGlvbnMnO1xuXG5cbmVudW0gUG9wb3ZlclRyaWdnZXJzIHtcbiAgICBDbGljayA9ICdjbGljaycsXG4gICAgRm9jdXMgPSAnZm9jdXMnLFxuICAgIEhvdmVyID0gJ2hvdmVyJ1xufVxuXG5leHBvcnQgZW51bSBQb3BvdmVyVmlzaWJpbGl0eSB7XG4gICAgSW5pdGlhbCA9ICdpbml0aWFsJyxcbiAgICBWaXNpYmxlID0gJ3Zpc2libGUnLFxuICAgIEhpZGRlbiA9ICdoaWRkZW4nXG59XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wb3BvdmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgc3R5bGVVcmxzOiBbJy4vcG9wb3Zlci5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbbWNQb3BvdmVyQW5pbWF0aW9ucy5wb3BvdmVyU3RhdGVdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzc10nOiAnZ2V0Q3NzQ2xhc3Nlc0xpc3QnLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3ZlckNvbXBvbmVudCB7XG4gICAgcG9zaXRpb25zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbLi4uRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlNdO1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogYW55O1xuICAgIHBvcG92ZXJWaXNpYmlsaXR5OiBQb3BvdmVyVmlzaWJpbGl0eSA9IFBvcG92ZXJWaXNpYmlsaXR5LkluaXRpYWw7XG4gICAgY2xvc2VPbkludGVyYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgbWNDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIG1jSGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIG1jRm9vdGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyVmlzaWJsZUNoYW5nZScpIG1jVmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9IFBvcG92ZXJUcmlnZ2Vycy5Ib3ZlcjtcblxuICAgIGdldCBtY1BsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9tY1BsYWNlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnVuc2hpZnQoUE9TSVRJT05fTUFQW3RoaXMubWNQbGFjZW1lbnRdKTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBnZXQgbWNQb3BvdmVyU2l6ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyU2l6ZTtcbiAgICB9XG5cbiAgICBzZXQgbWNQb3BvdmVyU2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5wb3BvdmVyU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyU2l6ZSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyU2l6ZSA9ICdub3JtYWwnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3BvdmVyU2l6ZTogc3RyaW5nO1xuXG4gICAgZ2V0IG1jVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVmlzaWJsZS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgbWNWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZpc2libGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tY1Zpc2libGUudmFsdWUgIT09IHZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KHZpc2libGUpO1xuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdCh2aXNpYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NMaXN0LmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBzZXQgY2xhc3NMaXN0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGxpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBsaXN0ID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2xhc3NMaXN0ID0gbGlzdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGFzc0xpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICBnZXQgZ2V0Q3NzQ2xhc3Nlc0xpc3QoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY2xhc3NMaXN0fSBtYy1wb3BvdmVyLSR7dGhpcy5tY1BvcG92ZXJTaXplfSBtYy1wb3BvdmVyX3BsYWNlbWVudC0ke3RoaXMuZ2V0UGxhY2VtZW50Q2xhc3N9YDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0UGxhY2VtZW50Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFBPU0lUSU9OX1RPX0NTU19NQVBbdGhpcy5tY1BsYWNlbWVudF07XG4gICAgfVxuXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPT09IFBvcG92ZXJWaXNpYmlsaXR5LlZpc2libGU7XG4gICAgfVxuXG4gICAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSBwb3BvdmVyIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHRoZSB2aWV3ICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkhpZGVTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGNvbXBvbmVudEVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzTm9uRW1wdHlDb250ZW50KCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlO1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucG9wb3ZlclZpc2liaWxpdHkgPSBQb3BvdmVyVmlzaWJpbGl0eS5IaWRkZW47XG4gICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaXNOb25FbXB0eUNvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubWNDb250ZW50ICYmICh0aGlzLmlzVGVtcGxhdGVSZWYodGhpcy5tY0NvbnRlbnQpIHx8IHRoaXMuaXNOb25FbXB0eVN0cmluZyh0aGlzLm1jQ29udGVudCkpO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB3aGVuIHRoZSBwb3BvdmVyIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHZpZXcuICovXG4gICAgYWZ0ZXJIaWRkZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uSGlkZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyVmlzaWJpbGl0eSA9PT0gUG9wb3ZlclZpc2liaWxpdHkuVmlzaWJsZTtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaXNUZW1wbGF0ZVJlZih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIGlzTm9uRW1wdHlTdHJpbmcodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZSAhPT0gJyc7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uU3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG9TdGF0ZSA9IGV2ZW50LnRvU3RhdGUgYXMgUG9wb3ZlclZpc2liaWxpdHk7XG5cbiAgICAgICAgaWYgKHRvU3RhdGUgPT09IFBvcG92ZXJWaXNpYmlsaXR5LkhpZGRlbiAmJiAhdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0Lm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b1N0YXRlID09PSBQb3BvdmVyVmlzaWJpbGl0eS5WaXNpYmxlIHx8IHRvU3RhdGUgPT09IFBvcG92ZXJWaXNpYmlsaXR5LkhpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMub25IaWRlU3ViamVjdC5jb21wbGV0ZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1wb3BvdmVyLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jUG9wb3ZlclNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7c2Nyb2xsVGhyb3R0bGU6IDIwfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNQb3BvdmVyU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG4vKiogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCBwb3BvdmVyIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jUG9wb3ZlckludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRXJyb3IoYE1jUG9wb3ZlciBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIgaXMgaW52YWxpZC5gKTtcbn1cblxuY29uc3QgVklFV1BPUlRfTUFSR0lOOiBudW1iZXIgPSA4O1xuXG4vKiBDb25zdGFudCBkaXN0YW5jZSBiZXR3ZWVuIHBvcG92ZXIgY29udGFpbmVyIGJvcmRlclxuKiAgY29ybmVyIGFjY29yZGluZyB0byBwb3BvdmVyIHBsYWNlbWVudCBhbmQgbWlkZGxlIG9mIGFycm93XG4qICovXG5jb25zdCBQT1BPVkVSX0FSUk9XX0JPUkRFUl9ESVNUQU5DRTogbnVtYmVyID0gMjA7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuLyogQ29uc3RhbnQgdmFsdWUgZm9yIG1pbiBoZWlnaHQgYW5kIHdpZHRoIG9mIGFuY2hvciBlbGVtZW50IHVzZWQgZm9yIHBvcG92ZXIuXG4qICBTZXQgYXMgUE9QT1ZFUl9BUlJPV19CT1JERVJfRElTVEFOQ0UgbXVsdGlwbGllZCBieSAyXG4qICBwbHVzIDJweCBib3JkZXIgZm9yIGJvdGggc2lkZXMgb2YgZWxlbWVudC4gVXNlZCBpbiBjaGVjayBvZiBwb3NpdGlvbiBtYW5hZ2VtZW50LlxuKiAqL1xuY29uc3QgQU5DSE9SX01JTl9IRUlHSFRfV0lEVEg6IG51bWJlciA9IDQ0OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jUG9wb3Zlcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNQb3BvdmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKScsXG4gICAgICAgICdbY2xhc3MubWMtcG9wb3Zlcl9vcGVuXSc6ICdpc09wZW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1BvcG92ZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgaXNQb3BvdmVyT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzRHluYW1pY1BvcG92ZXIgPSBmYWxzZTtcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNY1BvcG92ZXJDb21wb25lbnQ+O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogeyBba2V5OiBzdHJpbmddOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH07XG4gICAgZGVmYXVsdFBvc2l0aW9uc01hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICAgIHBvcG92ZXI6IE1jUG9wb3ZlckNvbXBvbmVudCB8IG51bGw7XG5cbiAgICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyVmlzaWJsZUNoYW5nZScpIG1jVmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBPdXRwdXQoJ21jUG9wb3ZlclBvc2l0aW9uU3RyYXRlZ3lQbGFjZW1lbnRDaGFuZ2UnKVxuICAgIG1jUG9zaXRpb25TdHJhdGVneVBsYWNlbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICAgIH1cblxuICAgIHNldCBoYXNCYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzQmFja2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVySGVhZGVyJylcbiAgICBnZXQgbWNIZWFkZXIoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY0hlYWRlcjtcbiAgICB9XG4gICAgc2V0IG1jSGVhZGVyKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jSGVhZGVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY0hlYWRlcicsIHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1BvcG92ZXJPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jSGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJDb250ZW50JylcbiAgICBnZXQgbWNDb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNDb250ZW50O1xuICAgIH1cbiAgICBzZXQgbWNDb250ZW50KHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jQ29udGVudCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNDb250ZW50JywgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUG9wb3Zlck9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJGb290ZXInKVxuICAgIGdldCBtY0Zvb3RlcigpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jRm9vdGVyO1xuICAgIH1cbiAgICBzZXQgbWNGb290ZXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNGb290ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jRm9vdGVyJywgdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUG9wb3Zlck9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfbWNGb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwcml2YXRlICR1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckRpc2FibGVkJylcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyTW91c2VFbnRlckRlbGF5JylcbiAgICBnZXQgbWNNb3VzZUVudGVyRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VFbnRlckRlbGF5O1xuICAgIH1cbiAgICBzZXQgbWNNb3VzZUVudGVyRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlRW50ZXJEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUVudGVyRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuICAgIHByaXZhdGUgX21jTW91c2VFbnRlckRlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jUG9wb3Zlck1vdXNlTGVhdmVEZWxheScpXG4gICAgZ2V0IG1jTW91c2VMZWF2ZURlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlTGVhdmVEZWxheTtcbiAgICB9XG4gICAgc2V0IG1jTW91c2VMZWF2ZURlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWNNb3VzZUxlYXZlRGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jTW91c2VMZWF2ZURlbGF5JywgdmFsdWUpO1xuICAgIH1cbiAgICBwcml2YXRlIF9tY01vdXNlTGVhdmVEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJUcmlnZ2VyJylcbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUcmlnZ2VyJywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gUG9wb3ZlclRyaWdnZXJzLkNsaWNrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9IFBvcG92ZXJUcmlnZ2Vycy5DbGljaztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyU2l6ZScpXG4gICAgZ2V0IG1jUG9wb3ZlclNpemUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlclNpemU7XG4gICAgfVxuICAgIHNldCBtY1BvcG92ZXJTaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmICh2YWx1ZSA9PT0gJ3NtYWxsJyB8fCB2YWx1ZSA9PT0gJ25vcm1hbCcgfHwgdmFsdWUgPT09ICdsYXJnZScpKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJTaXplID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQb3BvdmVyU2l6ZScsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclNpemUgPSAnbm9ybWFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHBvcG92ZXJTaXplOiBzdHJpbmcgPSAnbm9ybWFsJztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyUGxhY2VtZW50UHJpb3JpdHknKVxuICAgIGdldCBtY1BsYWNlbWVudFByaW9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnRQcmlvcml0eTtcbiAgICB9XG4gICAgc2V0IG1jUGxhY2VtZW50UHJpb3JpdHkodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50UHJpb3JpdHkgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50UHJpb3JpdHkgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX21jUGxhY2VtZW50UHJpb3JpdHk6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclBsYWNlbWVudCcpXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckNsYXNzJylcbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NMaXN0O1xuICAgIH1cbiAgICBzZXQgY2xhc3NMaXN0KHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLl9jbGFzc0xpc3QgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ2NsYXNzTGlzdCcsIHRoaXMuX2NsYXNzTGlzdCk7XG4gICAgfVxuICAgIHByaXZhdGUgX2NsYXNzTGlzdDogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclZpc2libGUnKVxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZShleHRlcm5hbFZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGV4dGVybmFsVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tY1Zpc2libGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Zpc2libGUnLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xvc2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IGJvb2xlYW47XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1BvcG92ZXJPcGVuO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFudWFsTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIHByaXZhdGUgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICAgICAgdGhpcy5kZWZhdWx0UG9zaXRpb25zTWFwID0gREVGQVVMVF80X1BPU0lUSU9OU19UT19DU1NfTUFQO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICAgIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgY29ubmVjdGVkIHBvc2l0aW9uIHN0cmF0ZWd5IHRoYXQgbGlzdGVucyBmb3Igc2Nyb2xsIGV2ZW50cyB0byByZXBvc2l0aW9uLlxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYpXG4gICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcubWMtcG9wb3ZlcicpXG4gICAgICAgICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgICAgICAgIC53aXRoVmlld3BvcnRNYXJnaW4oVklFV1BPUlRfTUFSR0lOKVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoWy4uLkVYVEVOREVEX09WRVJMQVlfUE9TSVRJT05TXSk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZUFuY2VzdG9ycyA9IHRoaXMuc2Nyb2xsRGlzcGF0Y2hlci5nZXRBbmNlc3RvclNjcm9sbENvbnRhaW5lcnModGhpcy5lbGVtZW50UmVmKTtcblxuICAgICAgICBzdHJhdGVneS53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnMoc2Nyb2xsYWJsZUFuY2VzdG9ycyk7XG5cbiAgICAgICAgc3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblBvc2l0aW9uQ2hhbmdlKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5zY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMuaXNPdmVybGF5Q2xpcHBlZCAmJiB0aGlzLnBvcG92ZXIubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIHBvc2l0aW9uIGNoYW5nZXMgb2NjdXIgYW5kIHRoZSBvdmVybGF5IGlzIGNsaXBwZWQgYnlcbiAgICAgICAgICAgICAgICAgICAgLy8gYSBwYXJlbnQgc2Nyb2xsYWJsZSB0aGVuIGNsb3NlIHRoZSBwb3BvdmVyLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogc3RyYXRlZ3ksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtcG9wb3Zlcl9fcGFuZWwnLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0aGlzLmhhc0JhY2tkcm9wLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5iYWNrZHJvcENsYXNzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSB0aGlzLmNsb3NpbmdBY3Rpb25zKClcbiAgICAgICAgICAgIC8vIG5lZWQgZm9yIGNsb3NlIHBvcG92ZXIgb24gdHJpZ2dlciBjbGljaywgYmVjYXVzZSBwb3BvdmVyIGZpcmUgdW5leHBlY3RlZCBldmVudHM6IGhpZGUgYW5kIHRoZW4gc2hvd1xuICAgICAgICAgICAgLy8gdG9kbyBuZWVkIGZpeCBpdFxuICAgICAgICAgICAgLnBpcGUoZGVsYXkoMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZSgpKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3BvdmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBvblBvc2l0aW9uQ2hhbmdlKCRldmVudDogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgICAgIGxldCB1cGRhdGVkUGxhY2VtZW50ID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5hdmFpbGFibGVQb3NpdGlvbnMpLnNvbWUoKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKCRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5YID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5ZICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlYID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlYICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlZKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZFBsYWNlbWVudCA9IGtleTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BsYWNlbWVudCcsIHVwZGF0ZWRQbGFjZW1lbnQpO1xuICAgICAgICB0aGlzLm1jUG9zaXRpb25TdHJhdGVneVBsYWNlbWVudENoYW5nZS5lbWl0KHVwZGF0ZWRQbGFjZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdjbGFzc0xpc3QnLCB0aGlzLmNsYXNzTGlzdCk7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGVmYXVsdFBvc2l0aW9uc01hcFt1cGRhdGVkUGxhY2VtZW50XSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVQb3NpdGlvblVwZGF0ZSh1cGRhdGVkUGxhY2VtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVBvc2l0aW9uVXBkYXRlKHVwZGF0ZWRQbGFjZW1lbnQ6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50Q29udGFpbmVyID0gdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlO1xuICAgICAgICBjb25zdCBlbGVtZW50SGVpZ2h0ID0gdGhpcy5ob3N0Vmlldy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBlbGVtZW50V2lkdGggPSB0aGlzLmhvc3RWaWV3LmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgdmVydGljYWxPZmZzZXQ6IG51bWJlciA9IE1hdGguZmxvb3IoZWxlbWVudEhlaWdodCAvIDIpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgIGNvbnN0IGhvcml6b250YWxPZmZzZXQ6IG51bWJlciA9IE1hdGguZmxvb3IoZWxlbWVudFdpZHRoIC8gMiAtIDYpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgIGNvbnN0IG9mZnNldHM6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7XG4gICAgICAgICAgICB0b3A6IHZlcnRpY2FsT2Zmc2V0LFxuICAgICAgICAgICAgYm90dG9tOiB2ZXJ0aWNhbE9mZnNldCxcbiAgICAgICAgICAgIHJpZ2h0OiBob3Jpem9udGFsT2Zmc2V0LFxuICAgICAgICAgICAgbGVmdDogaG9yaXpvbnRhbE9mZnNldFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHN0eWxlUHJvcGVydHkgPSB1cGRhdGVkUGxhY2VtZW50LnNwbGl0KC8oPz1bQS1aXSkvKVsxXS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmICgoKHN0eWxlUHJvcGVydHkgPT09ICd0b3AnIHx8IHN0eWxlUHJvcGVydHkgPT09ICdib3R0b20nKSAmJlxuICAgICAgICAgICAgZWxlbWVudEhlaWdodCA+IEFOQ0hPUl9NSU5fSEVJR0hUX1dJRFRIKSB8fFxuICAgICAgICAgICAgKChzdHlsZVByb3BlcnR5ID09PSAnbGVmdCcgfHwgc3R5bGVQcm9wZXJ0eSA9PT0gJ3JpZ2h0JykgJiZcbiAgICAgICAgICAgIGVsZW1lbnRXaWR0aCA+IEFOQ0hPUl9NSU5fSEVJR0hUX1dJRFRIKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGVbc3R5bGVQcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZVtzdHlsZVByb3BlcnR5XSA9ICcwcHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlW3N0eWxlUHJvcGVydHldID1cbiAgICAgICAgICAgIGAke3BhcnNlSW50KGN1cnJlbnRDb250YWluZXJbc3R5bGVQcm9wZXJ0eV0uc3BsaXQoJ3B4JylbMF0sIDEwKSArXG4gICAgICAgICAgICBvZmZzZXRzW3N0eWxlUHJvcGVydHldIC0gUE9QT1ZFUl9BUlJPV19CT1JERVJfRElTVEFOQ0V9cHhgO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICB1cGRhdGVDb21wVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEeW5hbWljUG9wb3ZlciAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucG9wb3ZlcltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudFJlZkxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuXG4gICAgICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSBFU0NBUEUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hlbmQoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgPT09IFBvcG92ZXJUcmlnZ2Vycy5DbGljaykge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdjbGljaycsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWNUcmlnZ2VyID09PSBQb3BvdmVyVHJpZ2dlcnMuSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VlbnRlcicsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlbGVhdmUnLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gUG9wb3ZlclRyaWdnZXJzLkZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ2ZvY3VzJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnYmx1cicsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKCkge1xuICAgICAgICAvLyBUaGUgcmVzaXplIGhhbmRsZXIgaXMgY3VycmVudGx5IHJlc3BvbnNpYmxlIGZvciBkZXRlY3Rpbmcgc2xpZGVyIGRpbWVuc2lvblxuICAgICAgICAvLyBjaGFuZ2VzIGFuZCB0aGVyZWZvcmUgZG9lc24ndCBjYXVzZSBhIHZhbHVlIGNoYW5nZSB0aGF0IG5lZWRzIHRvIGJlIHByb3BhZ2F0ZWQuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICByZXNldExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMubWFudWFsTGlzdGVuZXJzLnNpemUpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICghdGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgICAgICAgICB0aGlzLnBvcnRhbCA9IHRoaXMucG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoTWNQb3BvdmVyQ29tcG9uZW50LCB0aGlzLmhvc3RWaWV3KTtcblxuICAgICAgICAgICAgdGhpcy5wb3BvdmVyID0gb3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpLmluc3RhbmNlO1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyLmFmdGVySGlkZGVuKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG5cbiAgICAgICAgICAgIHRoaXMuaXNEeW5hbWljUG9wb3ZlciA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gW1xuICAgICAgICAgICAgICAgICdtY1BsYWNlbWVudCcsXG4gICAgICAgICAgICAgICAgJ21jUG9wb3ZlclNpemUnLFxuICAgICAgICAgICAgICAgICdtY1RyaWdnZXInLFxuICAgICAgICAgICAgICAgICdtY01vdXNlRW50ZXJEZWxheScsXG4gICAgICAgICAgICAgICAgJ21jTW91c2VMZWF2ZURlbGF5JyxcbiAgICAgICAgICAgICAgICAnY2xhc3NMaXN0JyxcbiAgICAgICAgICAgICAgICAnbWNWaXNpYmxlJyxcbiAgICAgICAgICAgICAgICAnbWNIZWFkZXInLFxuICAgICAgICAgICAgICAgICdtY0NvbnRlbnQnLFxuICAgICAgICAgICAgICAgICdtY0Zvb3RlcidcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHRoaXMudXBkYXRlQ29tcFZhbHVlKHByb3BlcnR5LCB0aGlzW3Byb3BlcnR5XSkpO1xuXG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIubWNWaXNpYmxlQ2hhbmdlXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuJHVuc3Vic2NyaWJlKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BvcG92ZXJPcGVuID0gZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3Zlci5zaG93KCk7XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBwb3BvdmVyLiAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKHJlYXBwbHlQb3NpdGlvbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuICAgICAgICBwb3NpdGlvbi53aXRoUG9zaXRpb25zKHRoaXMuZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSkud2l0aFB1c2godHJ1ZSk7XG5cbiAgICAgICAgaWYgKHJlYXBwbHlQb3NpdGlvbikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwb3NpdGlvbi5yZWFwcGx5TGFzdFBvc2l0aW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9zaW5nQWN0aW9ucygpIHtcbiAgICAgICAgY29uc3QgYmFja2Ryb3AgPSB0aGlzLm92ZXJsYXlSZWYhLmJhY2tkcm9wQ2xpY2soKTtcbiAgICAgICAgY29uc3Qgb3V0c2lkZVBvaW50ZXJFdmVudHMgPSB0aGlzLmhhc0JhY2tkcm9wID8gTkVWRVIgOiB0aGlzLm92ZXJsYXlSZWYhLm91dHNpZGVQb2ludGVyRXZlbnRzKCk7XG4gICAgICAgIGNvbnN0IGRldGFjaG1lbnRzID0gdGhpcy5vdmVybGF5UmVmIS5kZXRhY2htZW50cygpO1xuXG4gICAgICAgIHJldHVybiBtZXJnZShiYWNrZHJvcCwgb3V0c2lkZVBvaW50ZXJFdmVudHMsIGRldGFjaG1lbnRzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFByaW9yaXR5UGxhY2VtZW50U3RyYXRlZ3kodmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKTogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbXTtcbiAgICAgICAgY29uc3QgcG9zc2libGVQb3NpdGlvbnMgPSBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgocG9zaXRpb246IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5hdmFpbGFibGVQb3NpdGlvbnNbcG9zaXRpb25dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW3ZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jUGxhY2VtZW50UHJpb3JpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByaW9yaXR5UGxhY2VtZW50U3RyYXRlZ3kodGhpcy5tY1BsYWNlbWVudFByaW9yaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQT1NJVElPTl9QUklPUklUWV9TVFJBVEVHWVt0aGlzLm1jUGxhY2VtZW50XTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZUxpc3RlbmVyID0gKCkgPT4gdGhpcy51cGRhdGVQb3NpdGlvbigpO1xufVxuIl19
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, ScrollDispatcher, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { EventEmitter, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Output, InjectionToken, Directive, NgZone, ViewContainerRef, Inject, Optional, Input, NgModule } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentPortal } from '@angular/cdk/portal';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { EXTENDED_OVERLAY_POSITIONS, POSITION_MAP, POSITION_TO_CSS_MAP, DEFAULT_4_POSITIONS_TO_CSS_MAP, POSITION_PRIORITY_STRATEGY } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject, Subscription, NEVER, merge } from 'rxjs';
import { takeUntil, delay, distinctUntilChanged } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

const mcPopoverAnimations = {
    /** Animation that transitions a tooltip in and out. */
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

var PopoverTriggers;
(function (PopoverTriggers) {
    PopoverTriggers["Click"] = "click";
    PopoverTriggers["Focus"] = "focus";
    PopoverTriggers["Hover"] = "hover";
})(PopoverTriggers || (PopoverTriggers = {}));
var PopoverVisibility;
(function (PopoverVisibility) {
    PopoverVisibility["Initial"] = "initial";
    PopoverVisibility["Visible"] = "visible";
    PopoverVisibility["Hidden"] = "hidden";
})(PopoverVisibility || (PopoverVisibility = {}));
class McPopoverComponent {
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
const MC_POPOVER_SCROLL_STRATEGY = new InjectionToken('mc-popover-scroll-strategy');
/** @docs-private */
function mcPopoverScrollStrategyFactory(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 });
}
/** @docs-private */
const MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_POPOVER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcPopoverScrollStrategyFactory
};
/** Creates an error to be thrown if the user supplied an invalid popover position. */
function getMcPopoverInvalidPositionError(position) {
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
class McPopover {
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

class McPopoverModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { MC_POPOVER_SCROLL_STRATEGY, MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER, McPopover, McPopoverComponent, McPopoverModule, PopoverVisibility, getMcPopoverInvalidPositionError, mcPopoverAnimations, mcPopoverScrollStrategyFactory };
//# sourceMappingURL=ptsecurity-mosaic-popover.js.map

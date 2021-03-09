import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { fadeAnimation, DEFAULT_4_POSITIONS, POSITION_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
// tslint:disable-next-line:naming-convention
export const ArrowPlacements = {
    Top: 'top',
    Center: 'center',
    Bottom: 'bottom',
    Right: 'right',
    Left: 'left'
};
export class McTooltipComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.prefix = 'mc-tooltip_placement';
        this.positions = [...DEFAULT_4_POSITIONS];
        this.classMap = {};
        this.mcVisibleChange = new EventEmitter();
        this.mcMouseEnterDelay = 400;
        this.mcMouseLeaveDelay = 0;
        this._mcTrigger = 'hover';
        this._mcPlacement = 'top';
        this._mcVisible = new BehaviorSubject(false);
        /** Subject for notifying that the tooltip has been hidden from the view */
        this.onHideSubject = new Subject();
        this.closeOnInteraction = false;
        this.availablePositions = POSITION_MAP;
        this.$visible = this._mcVisible.asObservable();
    }
    get mcTitle() {
        return this._mcTitle;
    }
    set mcTitle(value) {
        this._mcTitle = value;
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
    get mcTooltipClass() {
        return this._mcTooltipClass;
    }
    set mcTooltipClass(value) {
        this._mcTooltipClass = value;
    }
    get mcVisible() {
        return this._mcVisible.value;
    }
    set mcVisible(value) {
        const visible = coerceBooleanProperty(value);
        if (visible && this._mcVisible.value !== visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    get mcArrowPlacement() {
        return this._mcArrowPlacement;
    }
    set mcArrowPlacement(value) {
        this._mcArrowPlacement = value;
    }
    show() {
        if (this.hideTid) {
            clearTimeout(this.hideTid);
        }
        if (!this.isContentEmpty()) {
            if (this.mcTrigger !== 'manual') {
                this.closeOnInteraction = true;
            }
            this.showTid = setTimeout(() => {
                this._mcVisible.next(true);
                this.mcVisibleChange.emit(true);
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                this.markForCheck();
            }, this.mcMouseEnterDelay);
        }
    }
    hide() {
        if (this.showTid) {
            clearTimeout(this.showTid);
        }
        this.hideTid = setTimeout(() => {
            this._mcVisible.next(false);
            this.mcVisibleChange.emit(false);
            this.onHideSubject.next();
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this.markForCheck();
        }, this.mcMouseLeaveDelay);
    }
    setClassMap() {
        this.classMap = {
            [`${this.prefix}-${this.mcPlacement}`]: true,
            [this.mcTooltipClass]: true
        };
    }
    isContentEmpty() {
        return this.isTitleString ? (this.mcTitle === '' || !this.mcTitle) : false;
    }
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden() {
        return this.onHideSubject.asObservable();
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    handleBodyInteraction() {
        if (this.closeOnInteraction) {
            this.hide();
        }
    }
    get isTemplateRef() {
        return this.mcTitle instanceof TemplateRef;
    }
    get isNonEmptyString() {
        return (typeof this.mcTitle === 'string' || typeof this.mcTitle === 'number') && this._mcTitle !== '';
    }
}
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
                styles: [".mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;z-index:1060;max-width:var(--mc-tooltip-size-max-width,240px);list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-right{padding-left:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-bottom{padding-top:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-left{padding-right:var(--mc-tooltip-size-distance,9px)}.mc-tooltip-inner{padding:var(--mc-tooltip-size-padding,8px 16px);text-align:left;text-decoration:none;border-radius:var(--mc-tooltip-size-border-radius,3px);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:var(--mc-tooltip-size-arrow-size,12px);height:var(--mc-tooltip-size-arrow-size,12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));left:50%;margin-left:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-right .mc-tooltip-arrow{left:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));top:16px;margin-top:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-left .mc-tooltip-arrow{right:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));top:16px;margin-top:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));left:50%;margin-left:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}"]
            },] }
];
/** @nocollapse */
McTooltipComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
McTooltipComponent.propDecorators = {
    mcVisibleChange: [{ type: Output }],
    mcMouseEnterDelay: [{ type: Input }],
    mcMouseLeaveDelay: [{ type: Input }],
    mcTitle: [{ type: Input }],
    mcTrigger: [{ type: Input }],
    mcPlacement: [{ type: Input }],
    mcTooltipClass: [{ type: Input }],
    mcVisible: [{ type: Input }],
    mcArrowPlacement: [{ type: Input }]
};
export const MC_TOOLTIP_SCROLL_STRATEGY = new InjectionToken('mc-tooltip-scroll-strategy');
/** @docs-private */
export function mcTooltipScrollStrategyFactory(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 });
}
/** @docs-private */
export const MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_TOOLTIP_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcTooltipScrollStrategyFactory
};
/** Creates an error to be thrown if the user supplied an invalid tooltip position. */
export function getMcTooltipInvalidPositionError(position) {
    return Error(`McTooltip position "${position}" is invalid.`);
}
const VIEWPORT_MARGIN = 8;
export class McTooltip {
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
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
    get mcTitle() {
        return this._mcTitle;
    }
    set mcTitle(title) {
        this._mcTitle = title;
        this.updateCompValue('mcTitle', title);
    }
    set setTitle(title) {
        this.mcTitle = title;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this.updateCompValue('mcTooltipDisabled', value);
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
            this._mcTrigger = 'hover';
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
        if (this.mcVisible) {
            this.updatePosition();
        }
    }
    get mcTooltipClass() {
        return this._mcTooltipClass;
    }
    set mcTooltipClass(value) {
        if (value) {
            this._mcTooltipClass = value;
            this.updateCompValue('mcTooltipClass', value);
        }
        else {
            this._mcTooltipClass = '';
        }
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
    get mcArrowPlacement() {
        return this._mcArrowPlacement;
    }
    set mcArrowPlacement(value) {
        this._mcArrowPlacement = value;
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
    }
    /** Create the overlay config and position strategy */
    createOverlay() {
        if (this.overlayRef) {
            return this.overlayRef;
        }
        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-tooltip')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions([...DEFAULT_4_POSITIONS]);
        const scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges
            .pipe(takeUntil(this.destroyed))
            .subscribe((change) => {
            if (this.tooltip) {
                this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && this.tooltip.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    this.ngZone.run(() => this.hide());
                }
            }
        });
        this.overlayRef = this.overlay.create({
            direction: this.direction,
            positionStrategy: strategy,
            panelClass: 'mc-tooltip-panel',
            scrollStrategy: this.scrollStrategy()
        });
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
        this.tooltip = null;
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
        if (this.tooltip) {
            this.tooltip.setClassMap();
            this.tooltip.markForCheck();
        }
        this.handlePositioningUpdate();
    }
    handlePositioningUpdate() {
        this.overlayRef = this.createOverlay();
        if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
            const halfDelimiter = 2;
            const overlayElemHeight = this.overlayRef.overlayElement.clientHeight;
            const currentContainerHeight = this.hostView.element.nativeElement.clientHeight;
            if (this.mcArrowPlacement === ArrowPlacements.Center) {
                const arrowElemRef = this.getTooltipArrowElem();
                const containerPositionTop = this.hostView.element.nativeElement.getBoundingClientRect().top;
                const halfOfContainerHeight = currentContainerHeight / halfDelimiter;
                const halfOfTooltipHeight = overlayElemHeight / halfDelimiter;
                this.overlayRef.overlayElement.style.top = `${(containerPositionTop + halfOfContainerHeight) - halfOfTooltipHeight + 1}px`;
                if (arrowElemRef) {
                    arrowElemRef.setAttribute('style', `top: ${halfOfTooltipHeight - 1}px`);
                }
            }
            else {
                const pos = (overlayElemHeight - currentContainerHeight) / halfDelimiter;
                const defaultTooltipPlacementTop = parseInt(this.overlayRef.overlayElement.style.top || '0px', 10);
                this.overlayRef.overlayElement.style.top = `${defaultTooltipPlacementTop + pos - 1}px`;
            }
        }
    }
    // tslint:disable-next-line:no-any
    updateCompValue(key, value) {
        if (this.isDynamicTooltip && value && this.tooltip) {
            this.tooltip[key] = value;
            this.tooltip.markForCheck();
        }
    }
    handleKeydown(e) {
        if (this.isTooltipOpen && e.keyCode === ESCAPE) { // tslint:disable-line
            this.hide();
        }
    }
    handleTouchend() {
        this.hide();
    }
    initElementRefListeners() {
        this.clearListeners();
        if (this.mcTrigger === 'hover') {
            this.manualListeners
                .set('mouseenter', () => this.show())
                .set('mouseleave', () => this.hide())
                .forEach((listener, event) => this.elementRef.nativeElement.addEventListener(event, listener));
        }
        if (this.mcTrigger === 'focus') {
            this.manualListeners
                .set('focus', () => this.show())
                .set('blur', () => this.hide())
                .forEach((listener, event) => this.elementRef.nativeElement.addEventListener(event, listener));
        }
    }
    clearListeners() {
        this.manualListeners.forEach((listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        this.manualListeners.clear();
    }
    show() {
        if (this.disabled) {
            return;
        }
        if (!this.tooltip) {
            this.overlayRef = this.createOverlay();
            this.detach();
            this.portal = this.portal || new ComponentPortal(McTooltipComponent, this.hostView);
            this.tooltip = this.overlayRef.attach(this.portal).instance;
            this.tooltip.afterHidden()
                .pipe(takeUntil(this.destroyed))
                .subscribe(() => this.detach());
            this.isDynamicTooltip = true;
            const properties = [
                'mcTitle',
                'mcPlacement',
                'mcTrigger',
                'mcTooltipDisabled',
                'mcMouseEnterDelay',
                'mcMouseLeaveDelay',
                'mcTooltipClass'
            ];
            properties.forEach((property) => this.updateCompValue(property, this[property]));
            this.tooltip.mcVisibleChange
                .pipe(takeUntil(this.$unsubscribe), distinctUntilChanged())
                .subscribe((data) => {
                this.mcVisible = data;
                this.mcVisibleChange.emit(data);
                this.isTooltipOpen = data;
            });
        }
        this.updatePosition();
        this.tooltip.show();
    }
    hide() {
        if (this.tooltip) {
            this.tooltip.hide();
        }
    }
    /** Updates the position of the current tooltip. */
    updatePosition() {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        const position = this.overlayRef.getConfig().positionStrategy;
        const origin = this.getOrigin();
        const overlay = this.getOverlayPosition();
        position.withPositions([
            Object.assign(Object.assign({}, origin.main), overlay.main),
            Object.assign(Object.assign({}, origin.fallback), overlay.fallback)
        ]);
        if (this.tooltip) {
            position.apply();
            window.dispatchEvent(new Event('resize'));
        }
    }
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    getOrigin() {
        const position = this.mcPlacement;
        const isLtr = !this.direction || this.direction.value === 'ltr';
        let originPosition;
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
        const { x, y } = this.invertPosition(originPosition.originX, originPosition.originY);
        return {
            main: originPosition,
            fallback: { originX: x, originY: y }
        };
    }
    /** Returns the overlay position and a fallback position based on the user's preference */
    getOverlayPosition() {
        const position = this.mcPlacement;
        const isLtr = !this.direction || this.direction.value === 'ltr';
        let overlayPosition;
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
        const { x, y } = this.invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
        return {
            main: overlayPosition,
            fallback: { overlayX: x, overlayY: y }
        };
    }
    /** Inverts an overlay position. */
    invertPosition(x, y) {
        let newX = x;
        let newY = y;
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
    }
    getTooltipArrowElem() {
        var _a;
        const arrowClassName = 'mc-tooltip-arrow';
        return (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.overlayElement.getElementsByClassName(arrowClassName)[0];
    }
}
McTooltip.decorators = [
    { type: Directive, args: [{
                selector: '[mcTooltip], [attribute^="mcTooltip"]',
                exportAs: 'mcTooltip',
                host: {
                    '[class.mc-tooltip-open]': 'isTooltipOpen',
                    '[class.disabled]': 'parentDisabled',
                    '(keydown)': 'handleKeydown($event)',
                    '(touchend)': 'handleTouchend()'
                }
            },] }
];
/** @nocollapse */
McTooltip.ctorParameters = () => [
    { type: Overlay },
    { type: ElementRef },
    { type: NgZone },
    { type: ScrollDispatcher },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [MC_TOOLTIP_SCROLL_STRATEGY,] }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
McTooltip.propDecorators = {
    mcVisibleChange: [{ type: Output }],
    mcTitle: [{ type: Input, args: ['mcTooltip',] }],
    setTitle: [{ type: Input, args: ['mcTitle',] }],
    disabled: [{ type: Input, args: ['mcTooltipDisabled',] }],
    mcMouseEnterDelay: [{ type: Input }],
    mcMouseLeaveDelay: [{ type: Input }],
    mcTrigger: [{ type: Input }],
    mcPlacement: [{ type: Input }],
    mcTooltipClass: [{ type: Input }],
    mcVisible: [{ type: Input }],
    mcArrowPlacement: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUdILE9BQU8sRUFFUCxnQkFBZ0IsRUFPbkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQ0gsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixZQUFZLEVBQ2YsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLakUsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRztJQUMzQixHQUFHLEVBQUUsS0FBd0I7SUFDN0IsTUFBTSxFQUFFLFFBQTJCO0lBQ25DLE1BQU0sRUFBRSxRQUEyQjtJQUNuQyxLQUFLLEVBQUUsT0FBMEI7SUFDakMsSUFBSSxFQUFFLE1BQXlC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Z0JBQ2IsSUFBSSxHQUFHLE9BQU8sQ0FBQzthQUNsQjtpQkFBTSxJQUFJLENBQUMsS0FBSyxPQUFPLEVBQUU7Z0JBQ3RCLElBQUksR0FBRyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUVELE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRU8sbUJBQW1COztRQUN2QixNQUFNLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztRQUUxQyxhQUFPLElBQUksQ0FBQyxVQUFVLDBDQUFFLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFO0lBQ3JGLENBQUM7OztZQXpmSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLElBQUksRUFBRTtvQkFDRix5QkFBeUIsRUFBRSxlQUFlO29CQUMxQyxrQkFBa0IsRUFBRSxnQkFBZ0I7b0JBRXBDLFdBQVcsRUFBRSx1QkFBdUI7b0JBQ3BDLFlBQVksRUFBRSxrQkFBa0I7aUJBQ25DO2FBQ0o7Ozs7WUFuUkcsT0FBTztZQWdCUCxVQUFVO1lBS1YsTUFBTTtZQW5CTixnQkFBZ0I7WUF5QmhCLGdCQUFnQjs0Q0F3WlgsTUFBTSxTQUFDLDBCQUEwQjtZQXhiakMsY0FBYyx1QkF5YmQsUUFBUTs7OzhCQXZKWixNQUFNO3NCQUdOLEtBQUssU0FBQyxXQUFXO3VCQVlqQixLQUFLLFNBQUMsU0FBUzt1QkFLZixLQUFLLFNBQUMsbUJBQW1CO2dDQVl6QixLQUFLO2dDQVlMLEtBQUs7d0JBWUwsS0FBSzswQkFnQkwsS0FBSzs2QkFvQkwsS0FBSzt3QkFnQkwsS0FBSzsrQkFzQkwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLFxuICAgIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5UmVmLFxuICAgIFNjcm9sbERpc3BhdGNoZXIsXG4gICAgU2Nyb2xsU3RyYXRlZ3ksXG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24sXG4gICAgT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uLFxuICAgIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICAgIFZlcnRpY2FsQ29ubmVjdGlvblBvc1xufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBmYWRlQW5pbWF0aW9uLFxuICAgIERFRkFVTFRfNF9QT1NJVElPTlMsXG4gICAgUE9TSVRJT05fTUFQXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5leHBvcnQgdHlwZSBBcnJvd1BsYWNlbWVudHMgPSBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyB8IFZlcnRpY2FsQ29ubmVjdGlvblBvcztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgQXJyb3dQbGFjZW1lbnRzID0ge1xuICAgIFRvcDogJ3RvcCcgYXMgQXJyb3dQbGFjZW1lbnRzLFxuICAgIENlbnRlcjogJ2NlbnRlcicgYXMgQXJyb3dQbGFjZW1lbnRzLFxuICAgIEJvdHRvbTogJ2JvdHRvbScgYXMgQXJyb3dQbGFjZW1lbnRzLFxuICAgIFJpZ2h0OiAncmlnaHQnIGFzIEFycm93UGxhY2VtZW50cyxcbiAgICBMZWZ0OiAnbGVmdCcgYXMgQXJyb3dQbGFjZW1lbnRzXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRvb2x0aXAtY29tcG9uZW50JyxcbiAgICBhbmltYXRpb25zOiBbZmFkZUFuaW1hdGlvbl0sXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rvb2x0aXAuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJvZHk6Y2xpY2spJzogJ3RoaXMuaGFuZGxlQm9keUludGVyYWN0aW9uKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXBDb21wb25lbnQge1xuICAgIHByZWZpeCA9ICdtYy10b29sdGlwX3BsYWNlbWVudCc7XG4gICAgcG9zaXRpb25zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbLi4uREVGQVVMVF80X1BPU0lUSU9OU107XG4gICAgY2xhc3NNYXAgPSB7fTtcbiAgICBpc1RpdGxlU3RyaW5nOiBib29sZWFuO1xuICAgIHNob3dUaWQ6IGFueTtcbiAgICBoaWRlVGlkOiBhbnk7XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgJHZpc2libGU6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBtY01vdXNlRW50ZXJEZWxheSA9IDQwMDtcblxuICAgIEBJbnB1dCgpIG1jTW91c2VMZWF2ZURlbGF5ID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVGl0bGUoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RpdGxlO1xuICAgIH1cblxuICAgIHNldCBtY1RpdGxlKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jVGl0bGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVHJpZ2dlcjogc3RyaW5nID0gJ2hvdmVyJztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG5cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX21jUGxhY2VtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnMudW5zaGlmdChQT1NJVElPTl9NQVBbIHRoaXMubWNQbGFjZW1lbnQgXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNUb29sdGlwQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVG9vbHRpcENsYXNzO1xuICAgIH1cblxuICAgIHNldCBtY1Rvb2x0aXBDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX21jVG9vbHRpcENsYXNzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUb29sdGlwQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVmlzaWJsZS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgbWNWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZpc2libGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmICh2aXNpYmxlICYmIHRoaXMuX21jVmlzaWJsZS52YWx1ZSAhPT0gdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY0Fycm93UGxhY2VtZW50KCk6IEFycm93UGxhY2VtZW50cyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY0Fycm93UGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBtY0Fycm93UGxhY2VtZW50KHZhbHVlOiBBcnJvd1BsYWNlbWVudHMpIHtcbiAgICAgICAgdGhpcy5fbWNBcnJvd1BsYWNlbWVudCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jQXJyb3dQbGFjZW1lbnQ6IEFycm93UGxhY2VtZW50cztcblxuICAgIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB0aGUgdmlldyAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb25IaWRlU3ViamVjdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIGNsb3NlT25JbnRlcmFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgICAgIHRoaXMuJHZpc2libGUgPSB0aGlzLl9tY1Zpc2libGUuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZVRpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RW1wdHkoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93VGlkID0gc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhpcy5tY01vdXNlRW50ZXJEZWxheVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWRlVGlkID0gc2V0VGltZW91dChcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0Lm5leHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGlzLm1jTW91c2VMZWF2ZURlbGF5XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xhc3NNYXAgPSB7XG4gICAgICAgICAgICBbYCR7dGhpcy5wcmVmaXh9LSR7dGhpcy5tY1BsYWNlbWVudH1gXTogdHJ1ZSxcbiAgICAgICAgICAgIFt0aGlzLm1jVG9vbHRpcENsYXNzXTogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlzQ29udGVudEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1RpdGxlU3RyaW5nID8gKHRoaXMubWNUaXRsZSA9PT0gJycgfHwgIXRoaXMubWNUaXRsZSkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2hlbiB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB2aWV3LiAqL1xuICAgIGFmdGVySGlkZGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkhpZGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQm9keUludGVyYWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlzVGVtcGxhdGVSZWYoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jVGl0bGUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICB9XG5cbiAgICBnZXQgaXNOb25FbXB0eVN0cmluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdGhpcy5tY1RpdGxlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGhpcy5tY1RpdGxlID09PSAnbnVtYmVyJykgJiYgdGhpcy5fbWNUaXRsZSAhPT0gJyc7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLXRvb2x0aXAtc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gbWNUb29sdGlwU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5KG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKHtzY3JvbGxUaHJvdHRsZTogMjB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1Rvb2x0aXBTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbi8qKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biBpZiB0aGUgdXNlciBzdXBwbGllZCBhbiBpbnZhbGlkIHRvb2x0aXAgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNUb29sdGlwSW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBFcnJvcihgTWNUb29sdGlwIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG5jb25zdCBWSUVXUE9SVF9NQVJHSU46IG51bWJlciA9IDg7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVG9vbHRpcF0sIFthdHRyaWJ1dGVePVwibWNUb29sdGlwXCJdJyxcbiAgICBleHBvcnRBczogJ21jVG9vbHRpcCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXRvb2x0aXAtb3Blbl0nOiAnaXNUb29sdGlwT3BlbicsXG4gICAgICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ3BhcmVudERpc2FibGVkJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgaXNUb29sdGlwT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzRHluYW1pY1Rvb2x0aXAgPSBmYWxzZTtcbiAgICBwYXJlbnREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICAgIHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1jVG9vbHRpcENvbXBvbmVudD47XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgdG9vbHRpcDogTWNUb29sdGlwQ29tcG9uZW50IHwgbnVsbDtcblxuICAgIEBPdXRwdXQoKSBtY1Zpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSAkdW5zdWJzY3JpYmUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgQElucHV0KCdtY1Rvb2x0aXAnKVxuICAgIGdldCBtY1RpdGxlKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUaXRsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNUaXRsZSh0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9tY1RpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1RpdGxlJywgdGl0bGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoJ21jVGl0bGUnKVxuICAgIHNldCBzZXRUaXRsZSh0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLm1jVGl0bGUgPSB0aXRsZTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jVG9vbHRpcERpc2FibGVkJylcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUb29sdGlwRGlzYWJsZWQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jTW91c2VFbnRlckRlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlRW50ZXJEZWxheTtcbiAgICB9XG5cbiAgICBzZXQgbWNNb3VzZUVudGVyRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlRW50ZXJEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUVudGVyRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNNb3VzZUVudGVyRGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jTW91c2VMZWF2ZURlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlTGVhdmVEZWxheTtcbiAgICB9XG5cbiAgICBzZXQgbWNNb3VzZUxlYXZlRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlTGVhdmVEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUxlYXZlRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNNb3VzZUxlYXZlRGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVHJpZ2dlcicsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jVHJpZ2dlciA9ICdob3Zlcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9ICdob3Zlcic7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1BsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1jVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNUb29sdGlwQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVG9vbHRpcENsYXNzO1xuICAgIH1cblxuICAgIHNldCBtY1Rvb2x0aXBDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNUb29sdGlwQ2xhc3MgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Rvb2x0aXBDbGFzcycsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jVG9vbHRpcENsYXNzID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Rvb2x0aXBDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUoZXh0ZXJuYWxWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShleHRlcm5hbFZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fbWNWaXNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNWaXNpYmxlJywgdmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY0Fycm93UGxhY2VtZW50KCk6IEFycm93UGxhY2VtZW50cyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY0Fycm93UGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBtY0Fycm93UGxhY2VtZW50KHZhbHVlOiBBcnJvd1BsYWNlbWVudHMpIHtcbiAgICAgICAgdGhpcy5fbWNBcnJvd1BsYWNlbWVudCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jQXJyb3dQbGFjZW1lbnQ6IEFycm93UGxhY2VtZW50cztcblxuICAgIHByaXZhdGUgbWFudWFsTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIHByaXZhdGUgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudFJlZkxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICAgIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHsgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjsgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBjb25uZWN0ZWQgcG9zaXRpb24gc3RyYXRlZ3kgdGhhdCBsaXN0ZW5zIGZvciBzY3JvbGwgZXZlbnRzIHRvIHJlcG9zaXRpb24uXG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5tYy10b29sdGlwJylcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbihWSUVXUE9SVF9NQVJHSU4pXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbLi4uREVGQVVMVF80X1BPU0lUSU9OU10pO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVBbmNlc3RvcnMgPSB0aGlzLnNjcm9sbERpc3BhdGNoZXIuZ2V0QW5jZXN0b3JTY3JvbGxDb250YWluZXJzKHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAgICAgc3RyYXRlZ3kud2l0aFNjcm9sbGFibGVDb250YWluZXJzKHNjcm9sbGFibGVBbmNlc3RvcnMpO1xuXG4gICAgICAgIHN0cmF0ZWd5LnBvc2l0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblBvc2l0aW9uQ2hhbmdlKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2Uuc2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzLmlzT3ZlcmxheUNsaXBwZWQgJiYgdGhpcy50b29sdGlwLm1jVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcG9zaXRpb24gY2hhbmdlcyBvY2N1ciBhbmQgdGhlIG92ZXJsYXkgaXMgY2xpcHBlZCBieVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYSBwYXJlbnQgc2Nyb2xsYWJsZSB0aGVuIGNsb3NlIHRoZSB0b29sdGlwLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbixcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHN0cmF0ZWd5LFxuICAgICAgICAgICAgcGFuZWxDbGFzczogJ21jLXRvb2x0aXAtcGFuZWwnLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvb2x0aXAgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50OiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRQbGFjZW1lbnQgPSB0aGlzLm1jUGxhY2VtZW50O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zKS5zb21lKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5YICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWSAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vdmVybGF5WCAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vdmVybGF5WVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZFBsYWNlbWVudCA9IGtleTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BsYWNlbWVudCcsIHVwZGF0ZWRQbGFjZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5zZXRDbGFzc01hcCgpO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVQb3NpdGlvbmluZ1VwZGF0ZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZVBvc2l0aW9uaW5nVXBkYXRlKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcblxuICAgICAgICBpZiAodGhpcy5tY1BsYWNlbWVudCA9PT0gJ3JpZ2h0JyB8fCB0aGlzLm1jUGxhY2VtZW50ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbGZEZWxpbWl0ZXIgPSAyO1xuICAgICAgICAgICAgY29uc3Qgb3ZlcmxheUVsZW1IZWlnaHQgPSB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgY3VycmVudENvbnRhaW5lckhlaWdodCA9IHRoaXMuaG9zdFZpZXcuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWNBcnJvd1BsYWNlbWVudCA9PT0gQXJyb3dQbGFjZW1lbnRzLkNlbnRlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFycm93RWxlbVJlZiA9IHRoaXMuZ2V0VG9vbHRpcEFycm93RWxlbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lclBvc2l0aW9uVG9wOiBudW1iZXIgPSB0aGlzLmhvc3RWaWV3LmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFsZk9mQ29udGFpbmVySGVpZ2h0ID0gY3VycmVudENvbnRhaW5lckhlaWdodCAvIGhhbGZEZWxpbWl0ZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFsZk9mVG9vbHRpcEhlaWdodCA9IG92ZXJsYXlFbGVtSGVpZ2h0IC8gaGFsZkRlbGltaXRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS50b3AgPSBgJHtcbiAgICAgICAgICAgICAgICAgICAgKGNvbnRhaW5lclBvc2l0aW9uVG9wICsgaGFsZk9mQ29udGFpbmVySGVpZ2h0KSAtIGhhbGZPZlRvb2x0aXBIZWlnaHQgKyAxXG4gICAgICAgICAgICAgICAgfXB4YDtcblxuICAgICAgICAgICAgICAgIGlmIChhcnJvd0VsZW1SZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dFbGVtUmVmLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgdG9wOiAke2hhbGZPZlRvb2x0aXBIZWlnaHQgLSAxfXB4YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSAob3ZlcmxheUVsZW1IZWlnaHQgLSBjdXJyZW50Q29udGFpbmVySGVpZ2h0KSAvIGhhbGZEZWxpbWl0ZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdFRvb2x0aXBQbGFjZW1lbnRUb3AgPSBwYXJzZUludCh0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUudG9wIHx8ICcwcHgnLCAxMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUudG9wID0gYCR7ZGVmYXVsdFRvb2x0aXBQbGFjZW1lbnRUb3AgKyBwb3MgLSAxfXB4YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICB1cGRhdGVDb21wVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEeW5hbWljVG9vbHRpcCAmJiB2YWx1ZSAmJiB0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUb29sdGlwT3BlbiAmJiBlLmtleUNvZGUgPT09IEVTQ0FQRSkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoZW5kKCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpbml0RWxlbWVudFJlZkxpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5jbGVhckxpc3RlbmVycygpO1xuXG4gICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWVudGVyJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VsZWF2ZScsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnZm9jdXMnLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdibHVyJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoIXRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgICAgICB0aGlzLnBvcnRhbCA9IHRoaXMucG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoTWNUb29sdGlwQ29tcG9uZW50LCB0aGlzLmhvc3RWaWV3KTtcblxuICAgICAgICAgICAgdGhpcy50b29sdGlwID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCkuaW5zdGFuY2U7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGFjaCgpKTtcbiAgICAgICAgICAgIHRoaXMuaXNEeW5hbWljVG9vbHRpcCA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gW1xuICAgICAgICAgICAgICAgICdtY1RpdGxlJyxcbiAgICAgICAgICAgICAgICAnbWNQbGFjZW1lbnQnLFxuICAgICAgICAgICAgICAgICdtY1RyaWdnZXInLFxuICAgICAgICAgICAgICAgICdtY1Rvb2x0aXBEaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgJ21jTW91c2VFbnRlckRlbGF5JyxcbiAgICAgICAgICAgICAgICAnbWNNb3VzZUxlYXZlRGVsYXknLFxuICAgICAgICAgICAgICAgICdtY1Rvb2x0aXBDbGFzcydcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB0aGlzLnVwZGF0ZUNvbXBWYWx1ZShwcm9wZXJ0eSwgdGhpc1twcm9wZXJ0eV0pKTtcblxuICAgICAgICAgICAgdGhpcy50b29sdGlwLm1jVmlzaWJsZUNoYW5nZVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLiR1bnN1YnNjcmliZSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNUb29sdGlwT3BlbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMudG9vbHRpcC5zaG93KCk7XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCB0b29sdGlwLiAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gdGhpcy5nZXRPcmlnaW4oKTtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCk7XG5cbiAgICAgICAgcG9zaXRpb24ud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICB7IC4uLm9yaWdpbi5tYWluLCAuLi5vdmVybGF5Lm1haW4gfSxcbiAgICAgICAgICAgIHsgLi4ub3JpZ2luLmZhbGxiYWNrLCAuLi5vdmVybGF5LmZhbGxiYWNrIH1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgcG9zaXRpb24uYXBwbHkoKTtcbiAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVzaXplJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb3JpZ2luIHBvc2l0aW9uIGFuZCBhIGZhbGxiYWNrIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcG9zaXRpb24gcHJlZmVyZW5jZS5cbiAgICAgKiBUaGUgZmFsbGJhY2sgcG9zaXRpb24gaXMgdGhlIGludmVyc2Ugb2YgdGhlIG9yaWdpbiAoZS5nLiBgJ2JlbG93JyAtPiAnYWJvdmUnYCkuXG4gICAgICovXG4gICAgZ2V0T3JpZ2luKCk6IHttYWluOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb247IGZhbGxiYWNrOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb259IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm1jUGxhY2VtZW50O1xuICAgICAgICBjb25zdCBpc0x0ciA9ICF0aGlzLmRpcmVjdGlvbiB8fCB0aGlzLmRpcmVjdGlvbi52YWx1ZSA9PT0gJ2x0cic7XG4gICAgICAgIGxldCBvcmlnaW5Qb3NpdGlvbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcgfHwgcG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBvcmlnaW5Qb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2NlbnRlcicsIG9yaWdpblk6IHBvc2l0aW9uID09PSAndG9wJyA/ICd0b3AnIDogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAndG9wJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3JpZ2luUG9zaXRpb24gPSB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ3JpZ2h0JyAmJiBpc0x0cikgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG9yaWdpblBvc2l0aW9uID0geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuaW52ZXJ0UG9zaXRpb24ob3JpZ2luUG9zaXRpb24ub3JpZ2luWCwgb3JpZ2luUG9zaXRpb24ub3JpZ2luWSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1haW46IG9yaWdpblBvc2l0aW9uLFxuICAgICAgICAgICAgZmFsbGJhY2s6IHsgb3JpZ2luWDogeCwgb3JpZ2luWTogeSB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIG92ZXJsYXkgcG9zaXRpb24gYW5kIGEgZmFsbGJhY2sgcG9zaXRpb24gYmFzZWQgb24gdGhlIHVzZXIncyBwcmVmZXJlbmNlICovXG4gICAgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IHsgbWFpbjogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbjsgZmFsbGJhY2s6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24gfSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgY29uc3QgaXNMdHIgPSAhdGhpcy5kaXJlY3Rpb24gfHwgdGhpcy5kaXJlY3Rpb24udmFsdWUgPT09ICdsdHInO1xuICAgICAgICBsZXQgb3ZlcmxheVBvc2l0aW9uOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAndG9wJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3ZlcmxheVBvc2l0aW9uID0geyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdib3R0b20nIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAhaXNMdHIpKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuaW52ZXJ0UG9zaXRpb24ob3ZlcmxheVBvc2l0aW9uLm92ZXJsYXlYLCBvdmVybGF5UG9zaXRpb24ub3ZlcmxheVkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWluOiBvdmVybGF5UG9zaXRpb24sXG4gICAgICAgICAgICBmYWxsYmFjazogeyBvdmVybGF5WDogeCwgb3ZlcmxheVk6IHkgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBJbnZlcnRzIGFuIG92ZXJsYXkgcG9zaXRpb24uICovXG4gICAgcHJpdmF0ZSBpbnZlcnRQb3NpdGlvbih4OiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcywgeTogVmVydGljYWxDb25uZWN0aW9uUG9zKSB7XG4gICAgICAgIGxldCBuZXdYOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyA9IHg7XG4gICAgICAgIGxldCBuZXdZOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MgPSB5O1xuICAgICAgICBpZiAodGhpcy5tY1BsYWNlbWVudCA9PT0gJ3RvcCcgfHwgdGhpcy5tY1BsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIGlmICh5ID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIG5ld1kgPSAnYm90dG9tJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICBuZXdZID0gJ3RvcCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoeCA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICBuZXdYID0gJ3N0YXJ0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIG5ld1ggPSAnZW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHg6IG5ld1gsIHk6IG5ld1kgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvb2x0aXBBcnJvd0VsZW0oKSB7XG4gICAgICAgIGNvbnN0IGFycm93Q2xhc3NOYW1lID0gJ21jLXRvb2x0aXAtYXJyb3cnO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY/Lm92ZXJsYXlFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYXJyb3dDbGFzc05hbWUpWzBdO1xuICAgIH1cbn1cbiJdfQ==
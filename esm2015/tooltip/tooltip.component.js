/**
 * @fileoverview added by tsickle
 * Generated from: tooltip.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
export const ArrowPlacements = {
    Top: (/** @type {?} */ ('top')),
    Center: (/** @type {?} */ ('center')),
    Bottom: (/** @type {?} */ ('bottom')),
    Right: (/** @type {?} */ ('right')),
    Left: (/** @type {?} */ ('left'))
};
export class McTooltipComponent {
    /**
     * @param {?} cdr
     */
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
        /**
         * Subject for notifying that the tooltip has been hidden from the view
         */
        this.onHideSubject = new Subject();
        this.closeOnInteraction = false;
        this.availablePositions = POSITION_MAP;
        this.$visible = this._mcVisible.asObservable();
    }
    /**
     * @return {?}
     */
    get mcTitle() {
        return this._mcTitle;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcTitle(value) {
        this._mcTitle = value;
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
    get mcTooltipClass() {
        return this._mcTooltipClass;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcTooltipClass(value) {
        this._mcTooltipClass = value;
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
        if (visible && this._mcVisible.value !== visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    get mcArrowPlacement() {
        return this._mcArrowPlacement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcArrowPlacement(value) {
        this._mcArrowPlacement = value;
    }
    /**
     * @return {?}
     */
    show() {
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
            () => {
                this._mcVisible.next(true);
                this.mcVisibleChange.emit(true);
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                this.markForCheck();
            }), this.mcMouseEnterDelay);
        }
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.showTid) {
            clearTimeout(this.showTid);
        }
        this.hideTid = setTimeout((/**
         * @return {?}
         */
        () => {
            this._mcVisible.next(false);
            this.mcVisibleChange.emit(false);
            this.onHideSubject.next();
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this.markForCheck();
        }), this.mcMouseLeaveDelay);
    }
    /**
     * @return {?}
     */
    setClassMap() {
        this.classMap = {
            [`${this.prefix}-${this.mcPlacement}`]: true,
            [this.mcTooltipClass]: true
        };
    }
    /**
     * @return {?}
     */
    isContentEmpty() {
        return this.isTitleString ? (this.mcTitle === '' || !this.mcTitle) : false;
    }
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view.
     * @return {?}
     */
    afterHidden() {
        return this.onHideSubject.asObservable();
    }
    /**
     * @return {?}
     */
    markForCheck() {
        this.cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    handleBodyInteraction() {
        if (this.closeOnInteraction) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    get isTemplateRef() {
        return this.mcTitle instanceof TemplateRef;
    }
    /**
     * @return {?}
     */
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
                styles: [".mc-tooltip{box-sizing:border-box;display:block;list-style:none;max-width:var(--mc-tooltip-size-max-width,240px);position:relative;visibility:visible;white-space:pre-line;z-index:1060}.mc-tooltip_placement-top{padding-bottom:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-right{padding-left:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-bottom{padding-top:var(--mc-tooltip-size-distance,9px)}.mc-tooltip_placement-left{padding-right:var(--mc-tooltip-size-distance,9px)}.mc-tooltip-inner{border-radius:var(--mc-tooltip-size-border-radius,3px);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;min-height:var(--mc-tooltip-size-min-height,32px);padding:var(--mc-tooltip-size-padding,8px 16px);text-align:left;text-decoration:none;vertical-align:center}.mc-tooltip-arrow{height:var(--mc-tooltip-size-arrow-size,12px);position:absolute;transform:rotate(45deg);width:var(--mc-tooltip-size-arrow-size,12px)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:var(--mc-tooltip-size-distance,9px)-var(--mc-tooltip-size-arrow-width,5px);left:50%;margin-left:calc(var(--mc-tooltip-size-arrow-width, 5px)*-1)}.mc-tooltip_placement-right .mc-tooltip-arrow{left:var(--mc-tooltip-size-distance,9px)-var(--mc-tooltip-size-arrow-width,5px);margin-top:calc(var(--mc-tooltip-size-arrow-width, 5px)*-1);top:16px}.mc-tooltip_placement-left .mc-tooltip-arrow{margin-top:calc(var(--mc-tooltip-size-arrow-width, 5px)*-1);right:var(--mc-tooltip-size-distance,9px)-var(--mc-tooltip-size-arrow-width,5px);top:16px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{left:50%;margin-left:calc(var(--mc-tooltip-size-arrow-width, 5px)*-1);top:var(--mc-tooltip-size-distance,9px)-var(--mc-tooltip-size-arrow-width,5px)}"]
            }] }
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
    McTooltipComponent.prototype._mcTooltipClass;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcVisible;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcArrowPlacement;
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
export const MC_TOOLTIP_SCROLL_STRATEGY = new InjectionToken('mc-tooltip-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function mcTooltipScrollStrategyFactory(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 }));
}
/**
 * \@docs-private
 * @type {?}
 */
export const MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
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
    return Error(`McTooltip position "${position}" is invalid.`);
}
/** @type {?} */
const VIEWPORT_MARGIN = 8;
export class McTooltip {
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
    /**
     * @return {?}
     */
    get mcTitle() {
        return this._mcTitle;
    }
    /**
     * @param {?} title
     * @return {?}
     */
    set mcTitle(title) {
        this._mcTitle = title;
        this.updateCompValue('mcTitle', title);
    }
    /**
     * @param {?} title
     * @return {?}
     */
    set setTitle(title) {
        this.mcTitle = title;
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
        this.updateCompValue('mcTooltipDisabled', value);
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
            this._mcTrigger = 'hover';
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
        if (this.mcVisible) {
            this.updatePosition();
        }
    }
    /**
     * @return {?}
     */
    get mcTooltipClass() {
        return this._mcTooltipClass;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcTooltipClass(value) {
        if (value) {
            this._mcTooltipClass = value;
            this.updateCompValue('mcTooltipClass', value);
        }
        else {
            this._mcTooltipClass = '';
        }
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
    get mcArrowPlacement() {
        return this._mcArrowPlacement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mcArrowPlacement(value) {
        this._mcArrowPlacement = value;
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
     * Create the overlay config and position strategy
     * @return {?}
     */
    createOverlay() {
        if (this.overlayRef) {
            return this.overlayRef;
        }
        // Create connected position strategy that listens for scroll events to reposition.
        /** @type {?} */
        const strategy = this.overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-tooltip')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions([...DEFAULT_4_POSITIONS]);
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
            if (this.tooltip) {
                this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && this.tooltip.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
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
            panelClass: 'mc-tooltip-panel',
            scrollStrategy: this.scrollStrategy()
        });
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
        this.tooltip = null;
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
        if (this.tooltip) {
            this.tooltip.setClassMap();
            this.tooltip.markForCheck();
        }
        this.handlePositioningUpdate();
    }
    /**
     * @return {?}
     */
    handlePositioningUpdate() {
        this.overlayRef = this.createOverlay();
        if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
            /** @type {?} */
            const halfDelimiter = 2;
            /** @type {?} */
            const overlayElemHeight = this.overlayRef.overlayElement.clientHeight;
            /** @type {?} */
            const currentContainerHeight = this.hostView.element.nativeElement.clientHeight;
            if (this.mcArrowPlacement === ArrowPlacements.Center) {
                /** @type {?} */
                const arrowElemRef = this.getTooltipArrowElem();
                /** @type {?} */
                const containerPositionTop = this.hostView.element.nativeElement.getBoundingClientRect().top;
                /** @type {?} */
                const halfOfContainerHeight = currentContainerHeight / halfDelimiter;
                /** @type {?} */
                const halfOfTooltipHeight = overlayElemHeight / halfDelimiter;
                this.overlayRef.overlayElement.style.top = `${(containerPositionTop + halfOfContainerHeight) - halfOfTooltipHeight + 1}px`;
                if (arrowElemRef) {
                    arrowElemRef.setAttribute('style', `top: ${halfOfTooltipHeight - 1}px`);
                }
            }
            else {
                /** @type {?} */
                const pos = (overlayElemHeight - currentContainerHeight) / halfDelimiter;
                /** @type {?} */
                const defaultTooltipPlacementTop = parseInt(this.overlayRef.overlayElement.style.top || '0px', 10);
                this.overlayRef.overlayElement.style.top = `${defaultTooltipPlacementTop + pos - 1}px`;
            }
        }
    }
    // tslint:disable-next-line:no-any
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    updateCompValue(key, value) {
        if (this.isDynamicTooltip && value && this.tooltip) {
            this.tooltip[key] = value;
            this.tooltip.markForCheck();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleKeydown(e) {
        if (this.isTooltipOpen && e.keyCode === ESCAPE) { // tslint:disable-line
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
        if (this.mcTrigger === 'hover') {
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
            (listener, event) => this.elementRef.nativeElement.addEventListener(event, listener)));
        }
        if (this.mcTrigger === 'focus') {
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
            (listener, event) => this.elementRef.nativeElement.addEventListener(event, listener)));
        }
    }
    /**
     * @return {?}
     */
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
                .subscribe((/**
             * @return {?}
             */
            () => this.detach()));
            this.isDynamicTooltip = true;
            /** @type {?} */
            const properties = [
                'mcTitle',
                'mcPlacement',
                'mcTrigger',
                'mcTooltipDisabled',
                'mcMouseEnterDelay',
                'mcMouseLeaveDelay',
                'mcTooltipClass'
            ];
            properties.forEach((/**
             * @param {?} property
             * @return {?}
             */
            (property) => this.updateCompValue(property, this[property])));
            this.tooltip.mcVisibleChange
                .pipe(takeUntil(this.$unsubscribe), distinctUntilChanged())
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                this.mcVisible = data;
                this.mcVisibleChange.emit(data);
                this.isTooltipOpen = data;
            }));
        }
        this.updatePosition();
        this.tooltip.show();
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.tooltip) {
            this.tooltip.hide();
        }
    }
    /**
     * Updates the position of the current tooltip.
     * @return {?}
     */
    updatePosition() {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        /** @type {?} */
        const position = (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
        /** @type {?} */
        const origin = this.getOrigin();
        /** @type {?} */
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
     * @return {?}
     */
    getOrigin() {
        /** @type {?} */
        const position = this.mcPlacement;
        /** @type {?} */
        const isLtr = !this.direction || this.direction.value === 'ltr';
        /** @type {?} */
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
    /**
     * Returns the overlay position and a fallback position based on the user's preference
     * @return {?}
     */
    getOverlayPosition() {
        /** @type {?} */
        const position = this.mcPlacement;
        /** @type {?} */
        const isLtr = !this.direction || this.direction.value === 'ltr';
        /** @type {?} */
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
    /**
     * Inverts an overlay position.
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    invertPosition(x, y) {
        /** @type {?} */
        let newX = x;
        /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    getTooltipArrowElem() {
        var _a;
        /** @type {?} */
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
    McTooltip.prototype._mcArrowPlacement;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90b29sdGlwLyIsInNvdXJjZXMiOlsidG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUdILE9BQU8sRUFFUCxnQkFBZ0IsRUFPbkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQ0gsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixZQUFZLEVBQ2YsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU1qRSxNQUFNLE9BQU8sZUFBZSxHQUFHO0lBQzNCLEdBQUcsRUFBRSxtQkFBQSxLQUFLLEVBQW1CO0lBQzdCLE1BQU0sRUFBRSxtQkFBQSxRQUFRLEVBQW1CO0lBQ25DLE1BQU0sRUFBRSxtQkFBQSxRQUFRLEVBQW1CO0lBQ25DLEtBQUss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O0lBWW5DLHVDQUFtQzs7Ozs7SUFnQm5DLCtCQUFxQzs7Ozs7SUFvQnJDLGlDQUFxQzs7Ozs7SUFnQnJDLG9DQUFnQzs7Ozs7SUFzQmhDLCtCQUE0Qjs7Ozs7SUFXNUIsc0NBQTJDOzs7OztJQUUzQyxvQ0FBZ0Y7Ozs7O0lBQ2hGLDhCQUFpRDs7Ozs7SUFHN0MsNEJBQXdCOzs7OztJQUN4QiwrQkFBOEI7Ozs7O0lBQzlCLDJCQUFzQjs7Ozs7SUFDdEIscUNBQTBDOzs7OztJQUMxQyw2QkFBa0M7Ozs7O0lBQ2xDLG1DQUEwRDs7Ozs7SUFDMUQsOEJBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsXG4gICAgQ29ubmVjdGlvblBvc2l0aW9uUGFpcixcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlSZWYsXG4gICAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBTY3JvbGxTdHJhdGVneSxcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgICBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24sXG4gICAgSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsXG4gICAgVmVydGljYWxDb25uZWN0aW9uUG9zXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIGZhZGVBbmltYXRpb24sXG4gICAgREVGQVVMVF80X1BPU0lUSU9OUyxcbiAgICBQT1NJVElPTl9NQVBcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmV4cG9ydCB0eXBlIEFycm93UGxhY2VtZW50cyA9IEhvcml6b250YWxDb25uZWN0aW9uUG9zIHwgVmVydGljYWxDb25uZWN0aW9uUG9zO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBBcnJvd1BsYWNlbWVudHMgPSB7XG4gICAgVG9wOiAndG9wJyBhcyBBcnJvd1BsYWNlbWVudHMsXG4gICAgQ2VudGVyOiAnY2VudGVyJyBhcyBBcnJvd1BsYWNlbWVudHMsXG4gICAgQm90dG9tOiAnYm90dG9tJyBhcyBBcnJvd1BsYWNlbWVudHMsXG4gICAgUmlnaHQ6ICdyaWdodCcgYXMgQXJyb3dQbGFjZW1lbnRzLFxuICAgIExlZnQ6ICdsZWZ0JyBhcyBBcnJvd1BsYWNlbWVudHNcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdG9vbHRpcC1jb21wb25lbnQnLFxuICAgIGFuaW1hdGlvbnM6IFtmYWRlQW5pbWF0aW9uXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdG9vbHRpcC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9vbHRpcC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoYm9keTpjbGljayknOiAndGhpcy5oYW5kbGVCb2R5SW50ZXJhY3Rpb24oKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVG9vbHRpcENvbXBvbmVudCB7XG4gICAgcHJlZml4ID0gJ21jLXRvb2x0aXBfcGxhY2VtZW50JztcbiAgICBwb3NpdGlvbnM6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFsuLi5ERUZBVUxUXzRfUE9TSVRJT05TXTtcbiAgICBjbGFzc01hcCA9IHt9O1xuICAgIGlzVGl0bGVTdHJpbmc6IGJvb2xlYW47XG4gICAgc2hvd1RpZDogYW55O1xuICAgIGhpZGVUaWQ6IGFueTtcbiAgICBhdmFpbGFibGVQb3NpdGlvbnM6IGFueTtcbiAgICAkdmlzaWJsZTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAgIEBPdXRwdXQoKSBtY1Zpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIG1jTW91c2VFbnRlckRlbGF5ID0gNDAwO1xuXG4gICAgQElucHV0KCkgbWNNb3VzZUxlYXZlRGVsYXkgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNUaXRsZSgpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVGl0bGUodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNUaXRsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1RyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgbWNUcmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUcmlnZ2VyOiBzdHJpbmcgPSAnaG92ZXInO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBtY1BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fbWNQbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9ucy51bnNoaWZ0KFBPU0lUSU9OX01BUFsgdGhpcy5tY1BsYWNlbWVudCBdKTtcbiAgICAgICAgfSBlbHNlIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1Rvb2x0aXBDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUb29sdGlwQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0IG1jVG9vbHRpcENsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWNUb29sdGlwQ2xhc3MgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Rvb2x0aXBDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZpc2libGUgJiYgdGhpcy5fbWNWaXNpYmxlLnZhbHVlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jQXJyb3dQbGFjZW1lbnQoKTogQXJyb3dQbGFjZW1lbnRzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jQXJyb3dQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jQXJyb3dQbGFjZW1lbnQodmFsdWU6IEFycm93UGxhY2VtZW50cykge1xuICAgICAgICB0aGlzLl9tY0Fycm93UGxhY2VtZW50ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNBcnJvd1BsYWNlbWVudDogQXJyb3dQbGFjZW1lbnRzO1xuXG4gICAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IHRoZSB0b29sdGlwIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHRoZSB2aWV3ICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkhpZGVTdWJqZWN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgY2xvc2VPbkludGVyYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICAgICAgdGhpcy4kdmlzaWJsZSA9IHRoaXMuX21jVmlzaWJsZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5oaWRlVGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVGlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFbXB0eSgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNob3dUaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dCh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgICAgICAgICAvLyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byBPblB1c2ggaXQgd2lsbCBiZSBjaGVja2VkIGFueXdheXNcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSwgdGhpcy5tY01vdXNlRW50ZXJEZWxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zaG93VGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGlkZVRpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZVN1YmplY3QubmV4dCgpO1xuXG4gICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9LCB0aGlzLm1jTW91c2VMZWF2ZURlbGF5KTtcbiAgICB9XG5cbiAgICBzZXRDbGFzc01hcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGFzc01hcCA9IHtcbiAgICAgICAgICAgIFtgJHt0aGlzLnByZWZpeH0tJHt0aGlzLm1jUGxhY2VtZW50fWBdOiB0cnVlLFxuICAgICAgICAgICAgW3RoaXMubWNUb29sdGlwQ2xhc3NdOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaXNDb250ZW50RW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVGl0bGVTdHJpbmcgPyAodGhpcy5tY1RpdGxlID09PSAnJyB8fCAhdGhpcy5tY1RpdGxlKSA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB3aGVuIHRoZSB0b29sdGlwIGhhcyBiZWVuIGhpZGRlbiBmcm9tIHZpZXcuICovXG4gICAgYWZ0ZXJIaWRkZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uSGlkZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBoYW5kbGVCb2R5SW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaXNUZW1wbGF0ZVJlZigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWNUaXRsZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIGdldCBpc05vbkVtcHR5U3RyaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiB0aGlzLm1jVGl0bGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aGlzLm1jVGl0bGUgPT09ICdudW1iZXInKSAmJiB0aGlzLl9tY1RpdGxlICE9PSAnJztcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtdG9vbHRpcC1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBtY1Rvb2x0aXBTY3JvbGxTdHJhdGVneUZhY3Rvcnkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oe3Njcm9sbFRocm90dGxlOiAyMH0pO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1ksXG4gICAgZGVwczogW092ZXJsYXldLFxuICAgIHVzZUZhY3Rvcnk6IG1jVG9vbHRpcFNjcm9sbFN0cmF0ZWd5RmFjdG9yeVxufTtcblxuLyoqIENyZWF0ZXMgYW4gZXJyb3IgdG8gYmUgdGhyb3duIGlmIHRoZSB1c2VyIHN1cHBsaWVkIGFuIGludmFsaWQgdG9vbHRpcCBwb3NpdGlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNY1Rvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIEVycm9yKGBNY1Rvb2x0aXAgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiIGlzIGludmFsaWQuYCk7XG59XG5cbmNvbnN0IFZJRVdQT1JUX01BUkdJTjogbnVtYmVyID0gODtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUb29sdGlwXSwgW2F0dHJpYnV0ZV49XCJtY1Rvb2x0aXBcIl0nLFxuICAgIGV4cG9ydEFzOiAnbWNUb29sdGlwJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdG9vbHRpcC1vcGVuXSc6ICdpc1Rvb2x0aXBPcGVuJyxcbiAgICAgICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAncGFyZW50RGlzYWJsZWQnLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVG9vbHRpcCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBpc1Rvb2x0aXBPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNEeW5hbWljVG9vbHRpcCA9IGZhbHNlO1xuICAgIHBhcmVudERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGw7XG4gICAgcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8TWNUb29sdGlwQ29tcG9uZW50PjtcbiAgICBhdmFpbGFibGVQb3NpdGlvbnM6IGFueTtcbiAgICB0b29sdGlwOiBNY1Rvb2x0aXBDb21wb25lbnQgfCBudWxsO1xuXG4gICAgQE91dHB1dCgpIG1jVmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBwcml2YXRlICR1bnN1YnNjcmliZSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBASW5wdXQoJ21jVG9vbHRpcCcpXG4gICAgZ2V0IG1jVGl0bGUoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RpdGxlO1xuICAgIH1cblxuICAgIHNldCBtY1RpdGxlKHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX21jVGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVGl0bGUnLCB0aXRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgnbWNUaXRsZScpXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMubWNUaXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Rvb2x0aXBEaXNhYmxlZCcsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNNb3VzZUVudGVyRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VFbnRlckRlbGF5O1xuICAgIH1cblxuICAgIHNldCBtY01vdXNlRW50ZXJEZWxheSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21jTW91c2VFbnRlckRlbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY01vdXNlRW50ZXJEZWxheScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY01vdXNlRW50ZXJEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNNb3VzZUxlYXZlRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5O1xuICAgIH1cblxuICAgIHNldCBtY01vdXNlTGVhdmVEZWxheSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21jTW91c2VMZWF2ZURlbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY01vdXNlTGVhdmVEZWxheScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY01vdXNlTGVhdmVEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUcmlnZ2VyJywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gJ2hvdmVyJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVHJpZ2dlcjogc3RyaW5nID0gJ2hvdmVyJztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jUGxhY2VtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1BsYWNlbWVudDtcbiAgICB9XG5cbiAgICBzZXQgbWNQbGFjZW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQbGFjZW1lbnQnLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9ICd0b3AnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1Rvb2x0aXBDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUb29sdGlwQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0IG1jVG9vbHRpcENsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Rvb2x0aXBDbGFzcyA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVG9vbHRpcENsYXNzJywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNUb29sdGlwQ2xhc3MgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVG9vbHRpcENsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZShleHRlcm5hbFZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGV4dGVybmFsVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tY1Zpc2libGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Zpc2libGUnLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jQXJyb3dQbGFjZW1lbnQoKTogQXJyb3dQbGFjZW1lbnRzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jQXJyb3dQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jQXJyb3dQbGFjZW1lbnQodmFsdWU6IEFycm93UGxhY2VtZW50cykge1xuICAgICAgICB0aGlzLl9tY0Fycm93UGxhY2VtZW50ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNBcnJvd1BsYWNlbWVudDogQXJyb3dQbGFjZW1lbnRzO1xuXG4gICAgcHJpdmF0ZSBtYW51YWxMaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdD4oKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgcHJpdmF0ZSBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zID0gUE9TSVRJT05fTUFQO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb25maWcgYW5kIHBvc2l0aW9uIHN0cmF0ZWd5ICovXG4gICAgY3JlYXRlT3ZlcmxheSgpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikgeyByZXR1cm4gdGhpcy5vdmVybGF5UmVmOyB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGNvbm5lY3RlZCBwb3NpdGlvbiBzdHJhdGVneSB0aGF0IGxpc3RlbnMgZm9yIHNjcm9sbCBldmVudHMgdG8gcmVwb3NpdGlvbi5cbiAgICAgICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5lbGVtZW50UmVmKVxuICAgICAgICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1jLXRvb2x0aXAnKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKFZJRVdQT1JUX01BUkdJTilcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFsuLi5ERUZBVUxUXzRfUE9TSVRJT05TXSk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZUFuY2VzdG9ycyA9IHRoaXMuc2Nyb2xsRGlzcGF0Y2hlci5nZXRBbmNlc3RvclNjcm9sbENvbnRhaW5lcnModGhpcy5lbGVtZW50UmVmKTtcblxuICAgICAgICBzdHJhdGVneS53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnMoc2Nyb2xsYWJsZUFuY2VzdG9ycyk7XG5cbiAgICAgICAgc3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUG9zaXRpb25DaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5zY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMuaXNPdmVybGF5Q2xpcHBlZCAmJiB0aGlzLnRvb2x0aXAubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZnRlciBwb3NpdGlvbiBjaGFuZ2VzIG9jY3VyIGFuZCB0aGUgb3ZlcmxheSBpcyBjbGlwcGVkIGJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhIHBhcmVudCBzY3JvbGxhYmxlIHRoZW4gY2xvc2UgdGhlIHRvb2x0aXAuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogc3RyYXRlZ3ksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtdG9vbHRpcC1wYW5lbCcsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9vbHRpcCA9IG51bGw7XG4gICAgfVxuXG4gICAgb25Qb3NpdGlvbkNoYW5nZSgkZXZlbnQ6IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgICAgICBsZXQgdXBkYXRlZFBsYWNlbWVudCA9IHRoaXMubWNQbGFjZW1lbnQ7XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5hdmFpbGFibGVQb3NpdGlvbnMpLnNvbWUoKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5YID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5ZICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlYID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlYICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlZXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkUGxhY2VtZW50ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdXBkYXRlZFBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLnNldENsYXNzTWFwKCk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uaW5nVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlUG9zaXRpb25pbmdVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgICAgIGlmICh0aGlzLm1jUGxhY2VtZW50ID09PSAncmlnaHQnIHx8IHRoaXMubWNQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgY29uc3QgaGFsZkRlbGltaXRlciA9IDI7XG4gICAgICAgICAgICBjb25zdCBvdmVybGF5RWxlbUhlaWdodCA9IHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q29udGFpbmVySGVpZ2h0ID0gdGhpcy5ob3N0Vmlldy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tY0Fycm93UGxhY2VtZW50ID09PSBBcnJvd1BsYWNlbWVudHMuQ2VudGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyb3dFbGVtUmVmID0gdGhpcy5nZXRUb29sdGlwQXJyb3dFbGVtKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyUG9zaXRpb25Ub3A6IG51bWJlciA9IHRoaXMuaG9zdFZpZXcuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgICAgICAgICBjb25zdCBoYWxmT2ZDb250YWluZXJIZWlnaHQgPSBjdXJyZW50Q29udGFpbmVySGVpZ2h0IC8gaGFsZkRlbGltaXRlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBoYWxmT2ZUb29sdGlwSGVpZ2h0ID0gb3ZlcmxheUVsZW1IZWlnaHQgLyBoYWxmRGVsaW1pdGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLnRvcCA9IGAke1xuICAgICAgICAgICAgICAgICAgICAoY29udGFpbmVyUG9zaXRpb25Ub3AgKyBoYWxmT2ZDb250YWluZXJIZWlnaHQpIC0gaGFsZk9mVG9vbHRpcEhlaWdodCArIDFcbiAgICAgICAgICAgICAgICB9cHhgO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFycm93RWxlbVJlZikge1xuICAgICAgICAgICAgICAgICAgICBhcnJvd0VsZW1SZWYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGB0b3A6ICR7aGFsZk9mVG9vbHRpcEhlaWdodCAtIDF9cHhgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IChvdmVybGF5RWxlbUhlaWdodCAtIGN1cnJlbnRDb250YWluZXJIZWlnaHQpIC8gaGFsZkRlbGltaXRlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0VG9vbHRpcFBsYWNlbWVudFRvcCA9IHBhcnNlSW50KHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS50b3AgfHwgJzBweCcsIDEwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS50b3AgPSBgJHtkZWZhdWx0VG9vbHRpcFBsYWNlbWVudFRvcCArIHBvcyAtIDF9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHVwZGF0ZUNvbXBWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0R5bmFtaWNUb29sdGlwICYmIHZhbHVlICYmIHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXBPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hlbmQoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VlbnRlcicsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlbGVhdmUnLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyID09PSAnZm9jdXMnKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ2ZvY3VzJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnYmx1cicsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAoIXRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgICAgICB0aGlzLnBvcnRhbCA9IHRoaXMucG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoTWNUb29sdGlwQ29tcG9uZW50LCB0aGlzLmhvc3RWaWV3KTtcblxuICAgICAgICAgICAgdGhpcy50b29sdGlwID0gdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCkuaW5zdGFuY2U7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGFjaCgpKTtcbiAgICAgICAgICAgIHRoaXMuaXNEeW5hbWljVG9vbHRpcCA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gW1xuICAgICAgICAgICAgICAgICdtY1RpdGxlJyxcbiAgICAgICAgICAgICAgICAnbWNQbGFjZW1lbnQnLFxuICAgICAgICAgICAgICAgICdtY1RyaWdnZXInLFxuICAgICAgICAgICAgICAgICdtY1Rvb2x0aXBEaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgJ21jTW91c2VFbnRlckRlbGF5JyxcbiAgICAgICAgICAgICAgICAnbWNNb3VzZUxlYXZlRGVsYXknLFxuICAgICAgICAgICAgICAgICdtY1Rvb2x0aXBDbGFzcydcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB0aGlzLnVwZGF0ZUNvbXBWYWx1ZShwcm9wZXJ0eSwgdGhpc1twcm9wZXJ0eV0pKTtcblxuICAgICAgICAgICAgdGhpcy50b29sdGlwLm1jVmlzaWJsZUNoYW5nZVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLiR1bnN1YnNjcmliZSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNUb29sdGlwT3BlbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMudG9vbHRpcC5zaG93KCk7XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCB0b29sdGlwLiAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gdGhpcy5nZXRPcmlnaW4oKTtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCk7XG5cbiAgICAgICAgcG9zaXRpb24ud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICB7IC4uLm9yaWdpbi5tYWluLCAuLi5vdmVybGF5Lm1haW4gfSxcbiAgICAgICAgICAgIHsgLi4ub3JpZ2luLmZhbGxiYWNrLCAuLi5vdmVybGF5LmZhbGxiYWNrIH1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgcG9zaXRpb24uYXBwbHkoKTtcbiAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVzaXplJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb3JpZ2luIHBvc2l0aW9uIGFuZCBhIGZhbGxiYWNrIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcG9zaXRpb24gcHJlZmVyZW5jZS5cbiAgICAgKiBUaGUgZmFsbGJhY2sgcG9zaXRpb24gaXMgdGhlIGludmVyc2Ugb2YgdGhlIG9yaWdpbiAoZS5nLiBgJ2JlbG93JyAtPiAnYWJvdmUnYCkuXG4gICAgICovXG4gICAgZ2V0T3JpZ2luKCk6IHttYWluOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb247IGZhbGxiYWNrOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb259IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm1jUGxhY2VtZW50O1xuICAgICAgICBjb25zdCBpc0x0ciA9ICF0aGlzLmRpcmVjdGlvbiB8fCB0aGlzLmRpcmVjdGlvbi52YWx1ZSA9PT0gJ2x0cic7XG4gICAgICAgIGxldCBvcmlnaW5Qb3NpdGlvbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcgfHwgcG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBvcmlnaW5Qb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2NlbnRlcicsIG9yaWdpblk6IHBvc2l0aW9uID09PSAndG9wJyA/ICd0b3AnIDogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAndG9wJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3JpZ2luUG9zaXRpb24gPSB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ3JpZ2h0JyAmJiBpc0x0cikgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG9yaWdpblBvc2l0aW9uID0geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuaW52ZXJ0UG9zaXRpb24ob3JpZ2luUG9zaXRpb24ub3JpZ2luWCwgb3JpZ2luUG9zaXRpb24ub3JpZ2luWSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1haW46IG9yaWdpblBvc2l0aW9uLFxuICAgICAgICAgICAgZmFsbGJhY2s6IHsgb3JpZ2luWDogeCwgb3JpZ2luWTogeSB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIG92ZXJsYXkgcG9zaXRpb24gYW5kIGEgZmFsbGJhY2sgcG9zaXRpb24gYmFzZWQgb24gdGhlIHVzZXIncyBwcmVmZXJlbmNlICovXG4gICAgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IHsgbWFpbjogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbjsgZmFsbGJhY2s6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24gfSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgY29uc3QgaXNMdHIgPSAhdGhpcy5kaXJlY3Rpb24gfHwgdGhpcy5kaXJlY3Rpb24udmFsdWUgPT09ICdsdHInO1xuICAgICAgICBsZXQgb3ZlcmxheVBvc2l0aW9uOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAndG9wJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3ZlcmxheVBvc2l0aW9uID0geyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdib3R0b20nIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAhaXNMdHIpKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuaW52ZXJ0UG9zaXRpb24ob3ZlcmxheVBvc2l0aW9uLm92ZXJsYXlYLCBvdmVybGF5UG9zaXRpb24ub3ZlcmxheVkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWluOiBvdmVybGF5UG9zaXRpb24sXG4gICAgICAgICAgICBmYWxsYmFjazogeyBvdmVybGF5WDogeCwgb3ZlcmxheVk6IHkgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBJbnZlcnRzIGFuIG92ZXJsYXkgcG9zaXRpb24uICovXG4gICAgcHJpdmF0ZSBpbnZlcnRQb3NpdGlvbih4OiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcywgeTogVmVydGljYWxDb25uZWN0aW9uUG9zKSB7XG4gICAgICAgIGxldCBuZXdYOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyA9IHg7XG4gICAgICAgIGxldCBuZXdZOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MgPSB5O1xuICAgICAgICBpZiAodGhpcy5tY1BsYWNlbWVudCA9PT0gJ3RvcCcgfHwgdGhpcy5tY1BsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIGlmICh5ID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIG5ld1kgPSAnYm90dG9tJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICBuZXdZID0gJ3RvcCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoeCA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICBuZXdYID0gJ3N0YXJ0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIG5ld1ggPSAnZW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHg6IG5ld1gsIHk6IG5ld1kgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvb2x0aXBBcnJvd0VsZW0oKSB7XG4gICAgICAgIGNvbnN0IGFycm93Q2xhc3NOYW1lID0gJ21jLXRvb2x0aXAtYXJyb3cnO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY/Lm92ZXJsYXlFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYXJyb3dDbGFzc05hbWUpWzBdO1xuICAgIH1cbn1cbiJdfQ==
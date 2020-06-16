/**
 * @fileoverview added by tsickle
 * Generated from: tooltip.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, HostBinding, Inject, InjectionToken, Input, NgZone, Optional, Output, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { fadeAnimation, DEFAULT_4_POSITIONS, POSITION_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
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
        this.isTitleString = !(value instanceof TemplateRef);
        if (this.isTitleString) {
            this._mcTitle = value;
        }
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
}
McTooltipComponent.decorators = [
    { type: Component, args: [{
                selector: 'mc-tooltip-component',
                animations: [fadeAnimation],
                template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@fadeAnimation]=\"''+($visible | async)\">\n    <div class=\"mc-tooltip-content\">\n        <div class=\"mc-tooltip-arrow\"></div>\n        <div class=\"mc-tooltip-inner\">\n            <ng-container>{{ mcTitle }}</ng-container>\n        </div>\n    </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '(body:click)': 'this.handleBodyInteraction()'
                },
                styles: ["@-webkit-keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px);background-size:29px 29px;-webkit-animation:1s linear infinite mc-progress;animation:1s linear infinite mc-progress}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;margin:0;padding:0;z-index:1060;max-width:240px;list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:9px}.mc-tooltip_placement-right{padding-left:9px}.mc-tooltip_placement-bottom{padding-top:9px}.mc-tooltip_placement-left{padding-right:9px}.mc-tooltip-inner{padding:8px 16px;text-align:left;text-decoration:none;border-radius:3px;min-height:16px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:12px;height:12px;transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:4px;left:50%;margin-left:-5px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-left .mc-tooltip-arrow{right:4px;top:16px;margin-top:-5px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:4px;left:50%;margin-left:-5px}"]
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
    mcVisible: [{ type: Input }]
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
    McTooltipComponent.prototype._mcTooltipClass;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcPlacement;
    /**
     * @type {?}
     * @private
     */
    McTooltipComponent.prototype._mcVisible;
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
    get isOpen() {
        return this.isTooltipOpen;
    }
    /**
     * @return {?}
     */
    get isParentDisabled() {
        return this.parentDisabled;
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
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }
        if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
            /** @type {?} */
            const pos = (this.overlayRef.overlayElement.clientHeight -
                this.hostView.element.nativeElement.clientHeight) / 2;
            // tslint:disable-line
            /** @type {?} */
            const currentContainer = this.overlayRef.overlayElement.style.top || '0px';
            this.overlayRef.overlayElement.style.top =
                `${parseInt(currentContainer.split('px')[0], 10) + pos - 1}px`;
            // TODO: обновлять положение стрелки\указателя\"дятла"
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
        if (!this.disabled) {
            if (!this.tooltip) {
                /** @type {?} */
                const overlayRef = this.createOverlay();
                this.detach();
                this.portal = this.portal || new ComponentPortal(McTooltipComponent, this.hostView);
                this.tooltip = overlayRef.attach(this.portal).instance;
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
                this.tooltip.mcVisibleChange.pipe(takeUntil(this.$unsubscribe), distinctUntilChanged())
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
}
McTooltip.decorators = [
    { type: Directive, args: [{
                selector: '[mcTooltip], [attribute^="mcTooltip"]',
                exportAs: 'mcTooltip',
                host: {
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
    mcMouseEnterDelay: [{ type: Input, args: ['mcMouseEnterDelay',] }],
    mcMouseLeaveDelay: [{ type: Input, args: ['mcMouseLeaveDelay',] }],
    mcTrigger: [{ type: Input, args: ['mcTrigger',] }],
    mcPlacement: [{ type: Input, args: ['mcPlacement',] }],
    mcTooltipClass: [{ type: Input, args: ['mcTooltipClass',] }],
    mcVisible: [{ type: Input, args: ['mcVisible',] }],
    isOpen: [{ type: HostBinding, args: ['class.mc-tooltip-open',] }],
    isParentDisabled: [{ type: HostBinding, args: ['class.disabled',] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFHSCxPQUFPLEVBRVAsZ0JBQWdCLEVBT25CLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFDSCxhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLFlBQVksRUFDZixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWVqRSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBeUYzQixZQUFtQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXhGekMsV0FBTSxHQUFHLHNCQUFzQixDQUFDO1FBQ2hDLGNBQVMsR0FBNkIsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLENB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QjtZQWhaakMsY0FBYyx1QkFpWmQsUUFBUTs7OzhCQWxKWixNQUFNO3NCQUdOLEtBQUssU0FBQyxXQUFXO3VCQVlqQixLQUFLLFNBQUMsU0FBUzt1QkFLZixLQUFLLFNBQUMsbUJBQW1CO2dDQVl6QixLQUFLLFNBQUMsbUJBQW1CO2dDQVl6QixLQUFLLFNBQUMsbUJBQW1CO3dCQVl6QixLQUFLLFNBQUMsV0FBVzswQkFnQmpCLEtBQUssU0FBQyxhQUFhOzZCQWdCbkIsS0FBSyxTQUFDLGdCQUFnQjt3QkFnQnRCLEtBQUssU0FBQyxXQUFXO3FCQXNCakIsV0FBVyxTQUFDLHVCQUF1QjsrQkFLbkMsV0FBVyxTQUFDLGdCQUFnQjs7OztJQTNJN0Isa0NBQStCOztJQUMvQixxQ0FBeUI7O0lBQ3pCLG1DQUFnQzs7SUFDaEMsK0JBQThCOztJQUM5QiwyQkFBNEM7O0lBQzVDLHVDQUF3Qjs7SUFDeEIsNEJBQW1DOztJQUVuQyxvQ0FBd0Q7Ozs7O0lBQ3hELGlDQUEyQzs7Ozs7SUFZM0MsNkJBQXlCOzs7OztJQWlCekIsOEJBQW1DOzs7OztJQVluQyx1Q0FBbUM7Ozs7O0lBWW5DLHVDQUFtQzs7Ozs7SUFnQm5DLCtCQUFxQzs7Ozs7SUFnQnJDLGlDQUFxQzs7Ozs7SUFnQnJDLG9DQUFnQzs7Ozs7SUFzQmhDLCtCQUE0Qjs7Ozs7SUFZNUIsb0NBQWdGOzs7OztJQUNoRiw4QkFBaUQ7Ozs7O0lBRzdDLDRCQUF3Qjs7Ozs7SUFDeEIsK0JBQThCOzs7OztJQUM5QiwyQkFBc0I7Ozs7O0lBQ3RCLHFDQUEwQzs7Ozs7SUFDMUMsNkJBQWtDOzs7OztJQUNsQyxtQ0FBMEQ7Ozs7O0lBQzFELDhCQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLFxuICAgIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5UmVmLFxuICAgIFNjcm9sbERpc3BhdGNoZXIsXG4gICAgU2Nyb2xsU3RyYXRlZ3ksXG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24sXG4gICAgT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uLFxuICAgIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICAgIFZlcnRpY2FsQ29ubmVjdGlvblBvc1xufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBmYWRlQW5pbWF0aW9uLFxuICAgIERFRkFVTFRfNF9QT1NJVElPTlMsXG4gICAgUE9TSVRJT05fTUFQXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRvb2x0aXAtY29tcG9uZW50JyxcbiAgICBhbmltYXRpb25zOiBbZmFkZUFuaW1hdGlvbl0sXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rvb2x0aXAuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJvZHk6Y2xpY2spJzogJ3RoaXMuaGFuZGxlQm9keUludGVyYWN0aW9uKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXBDb21wb25lbnQge1xuICAgIHByZWZpeCA9ICdtYy10b29sdGlwX3BsYWNlbWVudCc7XG4gICAgcG9zaXRpb25zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbLi4uREVGQVVMVF80X1BPU0lUSU9OU107XG4gICAgY2xhc3NNYXAgPSB7fTtcbiAgICBpc1RpdGxlU3RyaW5nOiBib29sZWFuO1xuICAgIHNob3dUaWQ6IGFueTtcbiAgICBoaWRlVGlkOiBhbnk7XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgJHZpc2libGU6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBtY01vdXNlRW50ZXJEZWxheSA9IDQwMDtcblxuICAgIEBJbnB1dCgpIG1jTW91c2VMZWF2ZURlbGF5ID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVGl0bGUoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUaXRsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNUaXRsZSh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4pIHtcbiAgICAgICAgdGhpcy5pc1RpdGxlU3RyaW5nID0gISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKTtcblxuICAgICAgICBpZiAodGhpcy5pc1RpdGxlU3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RpdGxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9ICdob3Zlcic7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1BsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9tY1BsYWNlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnVuc2hpZnQoUE9TSVRJT05fTUFQWyB0aGlzLm1jUGxhY2VtZW50IF0pO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVG9vbHRpcENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Rvb2x0aXBDbGFzcztcbiAgICB9XG5cbiAgICBzZXQgbWNUb29sdGlwQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tY1Rvb2x0aXBDbGFzcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVG9vbHRpcENsYXNzOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZpc2libGUgJiYgdGhpcy5fbWNWaXNpYmxlLnZhbHVlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB0aGUgdmlldyAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb25IaWRlU3ViamVjdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIGNsb3NlT25JbnRlcmFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgICAgIHRoaXMuJHZpc2libGUgPSB0aGlzLl9tY1Zpc2libGUuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZVRpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RW1wdHkoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93VGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcblxuICAgICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sIHRoaXMubWNNb3VzZUVudGVyRGVsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpZGVUaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0Lm5leHQoKTtcblxuICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSwgdGhpcy5tY01vdXNlTGVhdmVEZWxheSk7XG4gICAgfVxuXG4gICAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xhc3NNYXAgPSB7XG4gICAgICAgICAgICBbYCR7dGhpcy5wcmVmaXh9LSR7dGhpcy5tY1BsYWNlbWVudH1gXTogdHJ1ZSxcbiAgICAgICAgICAgIFt0aGlzLm1jVG9vbHRpcENsYXNzXTogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlzQ29udGVudEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1RpdGxlU3RyaW5nID8gKHRoaXMubWNUaXRsZSA9PT0gJycgfHwgIXRoaXMubWNUaXRsZSkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2hlbiB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB2aWV3LiAqL1xuICAgIGFmdGVySGlkZGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkhpZGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQm9keUludGVyYWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLXRvb2x0aXAtc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gbWNUb29sdGlwU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5KG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKHtzY3JvbGxUaHJvdHRsZTogMjB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1Rvb2x0aXBTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbi8qKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biBpZiB0aGUgdXNlciBzdXBwbGllZCBhbiBpbnZhbGlkIHRvb2x0aXAgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNUb29sdGlwSW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBFcnJvcihgTWNUb29sdGlwIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG5jb25zdCBWSUVXUE9SVF9NQVJHSU46IG51bWJlciA9IDg7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVG9vbHRpcF0sIFthdHRyaWJ1dGVePVwibWNUb29sdGlwXCJdJyxcbiAgICBleHBvcnRBczogJ21jVG9vbHRpcCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgaXNUb29sdGlwT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzRHluYW1pY1Rvb2x0aXAgPSBmYWxzZTtcbiAgICBwYXJlbnREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICAgIHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1jVG9vbHRpcENvbXBvbmVudD47XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgdG9vbHRpcDogTWNUb29sdGlwQ29tcG9uZW50IHwgbnVsbDtcblxuICAgIEBPdXRwdXQoKSBtY1Zpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSAkdW5zdWJzY3JpYmUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgQElucHV0KCdtY1Rvb2x0aXAnKVxuICAgIGdldCBtY1RpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RpdGxlO1xuICAgIH1cblxuICAgIHNldCBtY1RpdGxlKHRpdGxlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWNUaXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUaXRsZScsIHRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoJ21jVGl0bGUnKVxuICAgIHNldCBzZXRUaXRsZSh0aXRsZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWNUaXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Rvb2x0aXBEaXNhYmxlZCcsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdtY01vdXNlRW50ZXJEZWxheScpXG4gICAgZ2V0IG1jTW91c2VFbnRlckRlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlRW50ZXJEZWxheTtcbiAgICB9XG5cbiAgICBzZXQgbWNNb3VzZUVudGVyRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlRW50ZXJEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUVudGVyRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNNb3VzZUVudGVyRGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnbWNNb3VzZUxlYXZlRGVsYXknKVxuICAgIGdldCBtY01vdXNlTGVhdmVEZWxheSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNNb3VzZUxlYXZlRGVsYXk7XG4gICAgfVxuXG4gICAgc2V0IG1jTW91c2VMZWF2ZURlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWNNb3VzZUxlYXZlRGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jTW91c2VMZWF2ZURlbGF5JywgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jTW91c2VMZWF2ZURlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jVHJpZ2dlcicpXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVHJpZ2dlcicsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jVHJpZ2dlciA9ICdob3Zlcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9ICdob3Zlcic7XG5cbiAgICBASW5wdXQoJ21jUGxhY2VtZW50JylcbiAgICBnZXQgbWNQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBtY1BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BsYWNlbWVudCcsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBASW5wdXQoJ21jVG9vbHRpcENsYXNzJylcbiAgICBnZXQgbWNUb29sdGlwQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVG9vbHRpcENsYXNzO1xuICAgIH1cblxuICAgIHNldCBtY1Rvb2x0aXBDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNUb29sdGlwQ2xhc3MgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Rvb2x0aXBDbGFzcycsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jVG9vbHRpcENsYXNzID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Rvb2x0aXBDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCdtY1Zpc2libGUnKVxuICAgIGdldCBtY1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Zpc2libGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVmlzaWJsZShleHRlcm5hbFZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGV4dGVybmFsVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tY1Zpc2libGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Zpc2libGUnLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MubWMtdG9vbHRpcC1vcGVuJylcbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1Rvb2x0aXBPcGVuO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICAgIGdldCBpc1BhcmVudERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnREaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hbnVhbExpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0PigpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBwcml2YXRlIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb25maWcgYW5kIHBvc2l0aW9uIHN0cmF0ZWd5ICovXG4gICAgY3JlYXRlT3ZlcmxheSgpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikgeyByZXR1cm4gdGhpcy5vdmVybGF5UmVmOyB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGNvbm5lY3RlZCBwb3NpdGlvbiBzdHJhdGVneSB0aGF0IGxpc3RlbnMgZm9yIHNjcm9sbCBldmVudHMgdG8gcmVwb3NpdGlvbi5cbiAgICAgICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKVxuICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5lbGVtZW50UmVmKVxuICAgICAgICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1jLXRvb2x0aXAnKVxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAgICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKFZJRVdQT1JUX01BUkdJTilcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFsuLi5ERUZBVUxUXzRfUE9TSVRJT05TXSk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZUFuY2VzdG9ycyA9IHRoaXMuc2Nyb2xsRGlzcGF0Y2hlci5nZXRBbmNlc3RvclNjcm9sbENvbnRhaW5lcnModGhpcy5lbGVtZW50UmVmKTtcblxuICAgICAgICBzdHJhdGVneS53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnMoc2Nyb2xsYWJsZUFuY2VzdG9ycyk7XG5cbiAgICAgICAgc3RyYXRlZ3kucG9zaXRpb25DaGFuZ2VzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUG9zaXRpb25DaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5zY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMuaXNPdmVybGF5Q2xpcHBlZCAmJiB0aGlzLnRvb2x0aXAubWNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZnRlciBwb3NpdGlvbiBjaGFuZ2VzIG9jY3VyIGFuZCB0aGUgb3ZlcmxheSBpcyBjbGlwcGVkIGJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhIHBhcmVudCBzY3JvbGxhYmxlIHRoZW4gY2xvc2UgdGhlIHRvb2x0aXAuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5oaWRlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogc3RyYXRlZ3ksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtdG9vbHRpcC1wYW5lbCcsXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNobWVudHMoKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9vbHRpcCA9IG51bGw7XG4gICAgfVxuXG4gICAgb25Qb3NpdGlvbkNoYW5nZSgkZXZlbnQ6IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgICAgICBsZXQgdXBkYXRlZFBsYWNlbWVudCA9IHRoaXMubWNQbGFjZW1lbnQ7XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5hdmFpbGFibGVQb3NpdGlvbnMpLnNvbWUoKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5YID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5ZICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlYID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlYICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm92ZXJsYXlZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm92ZXJsYXlZXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkUGxhY2VtZW50ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdXBkYXRlZFBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLnNldENsYXNzTWFwKCk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uaW5nVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlUG9zaXRpb25pbmdVcGRhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1jUGxhY2VtZW50ID09PSAncmlnaHQnIHx8IHRoaXMubWNQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgY29uc3QgcG9zID1cbiAgICAgICAgICAgICAgICAodGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmNsaWVudEhlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdFZpZXcuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCkgLyAyOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q29udGFpbmVyID0gdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLnRvcCB8fCAnMHB4JztcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS50b3AgPVxuICAgICAgICAgICAgICAgIGAke3BhcnNlSW50KGN1cnJlbnRDb250YWluZXIuc3BsaXQoJ3B4JylbMF0sIDEwKSArIHBvcyAtIDF9cHhgO1xuICAgICAgICAgICAgLy8gVE9ETzog0L7QsdC90L7QstC70Y/RgtGMINC/0L7Qu9C+0LbQtdC90LjQtSDRgdGC0YDQtdC70LrQuFxc0YPQutCw0LfQsNGC0LXQu9GPXFxcItC00Y/RgtC70LBcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgIHVwZGF0ZUNvbXBWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0R5bmFtaWNUb29sdGlwICYmIHZhbHVlICYmIHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5uZXh0KCk7XG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzVG9vbHRpcE9wZW4gJiYgZS5rZXlDb2RlID09PSBFU0NBUEUpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVUb3VjaGVuZCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWVudGVyJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VsZWF2ZScsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnZm9jdXMnLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdibHVyJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9ydGFsID0gdGhpcy5wb3J0YWwgfHwgbmV3IENvbXBvbmVudFBvcnRhbChNY1Rvb2x0aXBDb21wb25lbnQsIHRoaXMuaG9zdFZpZXcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwID0gb3ZlcmxheVJlZi5hdHRhY2godGhpcy5wb3J0YWwpLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcC5hZnRlckhpZGRlbigpXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZXRhY2goKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0R5bmFtaWNUb29sdGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gW1xuICAgICAgICAgICAgICAgICAgICAnbWNUaXRsZScsXG4gICAgICAgICAgICAgICAgICAgICdtY1BsYWNlbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICdtY1RyaWdnZXInLFxuICAgICAgICAgICAgICAgICAgICAnbWNUb29sdGlwRGlzYWJsZWQnLFxuICAgICAgICAgICAgICAgICAgICAnbWNNb3VzZUVudGVyRGVsYXknLFxuICAgICAgICAgICAgICAgICAgICAnbWNNb3VzZUxlYXZlRGVsYXknLFxuICAgICAgICAgICAgICAgICAgICAnbWNUb29sdGlwQ2xhc3MnXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB0aGlzLnVwZGF0ZUNvbXBWYWx1ZShwcm9wZXJ0eSwgdGhpc1sgcHJvcGVydHkgXSkpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcC5tY1Zpc2libGVDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy4kdW5zdWJzY3JpYmUpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Rvb2x0aXBPcGVuID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCB0b29sdGlwLiAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gdGhpcy5nZXRPcmlnaW4oKTtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCk7XG5cbiAgICAgICAgcG9zaXRpb24ud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICB7IC4uLm9yaWdpbi5tYWluLCAuLi5vdmVybGF5Lm1haW4gfSxcbiAgICAgICAgICAgIHsgLi4ub3JpZ2luLmZhbGxiYWNrLCAuLi5vdmVybGF5LmZhbGxiYWNrIH1cbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb3JpZ2luIHBvc2l0aW9uIGFuZCBhIGZhbGxiYWNrIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcG9zaXRpb24gcHJlZmVyZW5jZS5cbiAgICAgKiBUaGUgZmFsbGJhY2sgcG9zaXRpb24gaXMgdGhlIGludmVyc2Ugb2YgdGhlIG9yaWdpbiAoZS5nLiBgJ2JlbG93JyAtPiAnYWJvdmUnYCkuXG4gICAgICovXG4gICAgZ2V0T3JpZ2luKCk6IHttYWluOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb247IGZhbGxiYWNrOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb259IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm1jUGxhY2VtZW50O1xuICAgICAgICBjb25zdCBpc0x0ciA9ICF0aGlzLmRpcmVjdGlvbiB8fCB0aGlzLmRpcmVjdGlvbi52YWx1ZSA9PT0gJ2x0cic7XG4gICAgICAgIGxldCBvcmlnaW5Qb3NpdGlvbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcgfHwgcG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBvcmlnaW5Qb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2NlbnRlcicsIG9yaWdpblk6IHBvc2l0aW9uID09PSAndG9wJyA/ICd0b3AnIDogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAndG9wJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3JpZ2luUG9zaXRpb24gPSB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ3JpZ2h0JyAmJiBpc0x0cikgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG9yaWdpblBvc2l0aW9uID0geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuaW52ZXJ0UG9zaXRpb24ob3JpZ2luUG9zaXRpb24ub3JpZ2luWCwgb3JpZ2luUG9zaXRpb24ub3JpZ2luWSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1haW46IG9yaWdpblBvc2l0aW9uLFxuICAgICAgICAgICAgZmFsbGJhY2s6IHsgb3JpZ2luWDogeCwgb3JpZ2luWTogeSB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIG92ZXJsYXkgcG9zaXRpb24gYW5kIGEgZmFsbGJhY2sgcG9zaXRpb24gYmFzZWQgb24gdGhlIHVzZXIncyBwcmVmZXJlbmNlICovXG4gICAgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IHsgbWFpbjogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbjsgZmFsbGJhY2s6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24gfSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgY29uc3QgaXNMdHIgPSAhdGhpcy5kaXJlY3Rpb24gfHwgdGhpcy5kaXJlY3Rpb24udmFsdWUgPT09ICdsdHInO1xuICAgICAgICBsZXQgb3ZlcmxheVBvc2l0aW9uOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAndG9wJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3ZlcmxheVBvc2l0aW9uID0geyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdib3R0b20nIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAhaXNMdHIpKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuaW52ZXJ0UG9zaXRpb24ob3ZlcmxheVBvc2l0aW9uLm92ZXJsYXlYLCBvdmVybGF5UG9zaXRpb24ub3ZlcmxheVkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWluOiBvdmVybGF5UG9zaXRpb24sXG4gICAgICAgICAgICBmYWxsYmFjazogeyBvdmVybGF5WDogeCwgb3ZlcmxheVk6IHkgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBJbnZlcnRzIGFuIG92ZXJsYXkgcG9zaXRpb24uICovXG4gICAgcHJpdmF0ZSBpbnZlcnRQb3NpdGlvbih4OiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcywgeTogVmVydGljYWxDb25uZWN0aW9uUG9zKSB7XG4gICAgICAgIGxldCBuZXdYOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyA9IHg7XG4gICAgICAgIGxldCBuZXdZOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MgPSB5O1xuICAgICAgICBpZiAodGhpcy5tY1BsYWNlbWVudCA9PT0gJ3RvcCcgfHwgdGhpcy5tY1BsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIGlmICh5ID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIG5ld1kgPSAnYm90dG9tJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICBuZXdZID0gJ3RvcCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoeCA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICBuZXdYID0gJ3N0YXJ0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIG5ld1ggPSAnZW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHg6IG5ld1gsIHk6IG5ld1kgfTtcbiAgICB9XG59XG4iXX0=
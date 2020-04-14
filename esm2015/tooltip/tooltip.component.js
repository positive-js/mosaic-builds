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
        this.classMap = `${this.prefix}-${this.mcPlacement}`;
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
                template: "\n    <div class=\"mc-tooltip\"\n         [ngClass]=\"classMap\"\n         [@fadeAnimation]=\"''+($visible | async)\">\n        <div class=\"mc-tooltip-content\">\n            <div class=\"mc-tooltip-arrow\"></div>\n            <div class=\"mc-tooltip-inner\">\n                <ng-container>{{ mcTitle }}</ng-container>\n            </div>\n        </div>\n    </div>\n\n",
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
    set mсTooltipClass(value) {
        this._mcTooltipClass = value;
        if (this.tooltip) {
            this.tooltip.setClassMap();
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
                    'mсTooltipClass'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFHSCxPQUFPLEVBRVAsZ0JBQWdCLEVBT25CLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUNYLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFDSCxhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLFlBQVksRUFDZixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWVqRSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBK0UzQixZQUFtQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTlFekMsV0FBTSxHQUFHLHNCQUFzQixDQUFDO1FBQ2hDLGNBQVMsR0FBNkIsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLENB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QVcsU0FBQyxnQkFBZ0I7Ozs7SUExSTdCLGtDQUErQjs7SUFDL0IscUNBQXlCOztJQUN6QixtQ0FBZ0M7O0lBQ2hDLCtCQUE4Qjs7SUFDOUIsMkJBQTRDOztJQUM1Qyx1Q0FBd0I7O0lBQ3hCLDRCQUFtQzs7SUFFbkMsb0NBQXdEOzs7OztJQUN4RCxpQ0FBMkM7Ozs7O0lBWTNDLDZCQUF5Qjs7Ozs7SUFpQnpCLDhCQUFtQzs7Ozs7SUFZbkMsdUNBQW1DOzs7OztJQVluQyx1Q0FBbUM7Ozs7O0lBZ0JuQywrQkFBcUM7Ozs7O0lBZ0JyQyxpQ0FBcUM7Ozs7O0lBZXJDLG9DQUFnRjs7Ozs7SUFzQmhGLCtCQUE0Qjs7Ozs7SUFZNUIsb0NBQWdGOzs7OztJQUNoRiw4QkFBaUQ7Ozs7O0lBRzdDLDRCQUF3Qjs7Ozs7SUFDeEIsK0JBQThCOzs7OztJQUM5QiwyQkFBc0I7Ozs7O0lBQ3RCLHFDQUEwQzs7Ozs7SUFDMUMsNkJBQWtDOzs7OztJQUNsQyxtQ0FBMEQ7Ozs7O0lBQzFELDhCQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLFxuICAgIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5UmVmLFxuICAgIFNjcm9sbERpc3BhdGNoZXIsXG4gICAgU2Nyb2xsU3RyYXRlZ3ksXG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24sXG4gICAgT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uLFxuICAgIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICAgIFZlcnRpY2FsQ29ubmVjdGlvblBvc1xufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBmYWRlQW5pbWF0aW9uLFxuICAgIERFRkFVTFRfNF9QT1NJVElPTlMsXG4gICAgUE9TSVRJT05fTUFQXG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRvb2x0aXAtY29tcG9uZW50JyxcbiAgICBhbmltYXRpb25zOiBbZmFkZUFuaW1hdGlvbl0sXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rvb2x0aXAuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJvZHk6Y2xpY2spJzogJ3RoaXMuaGFuZGxlQm9keUludGVyYWN0aW9uKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXBDb21wb25lbnQge1xuICAgIHByZWZpeCA9ICdtYy10b29sdGlwX3BsYWNlbWVudCc7XG4gICAgcG9zaXRpb25zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbLi4uREVGQVVMVF80X1BPU0lUSU9OU107XG4gICAgY2xhc3NNYXAgPSB7fTtcbiAgICBpc1RpdGxlU3RyaW5nOiBib29sZWFuO1xuICAgIHNob3dUaWQ6IGFueTtcbiAgICBoaWRlVGlkOiBhbnk7XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgJHZpc2libGU6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBtY01vdXNlRW50ZXJEZWxheSA9IDQwMDtcblxuICAgIEBJbnB1dCgpIG1jTW91c2VMZWF2ZURlbGF5ID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVGl0bGUoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUaXRsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNUaXRsZSh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4pIHtcbiAgICAgICAgdGhpcy5pc1RpdGxlU3RyaW5nID0gISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKTtcblxuICAgICAgICBpZiAodGhpcy5pc1RpdGxlU3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1RpdGxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9ICdob3Zlcic7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1BsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9tY1BsYWNlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnVuc2hpZnQoUE9TSVRJT05fTUFQWyB0aGlzLm1jUGxhY2VtZW50IF0pO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVmlzaWJsZS52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgbWNWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHZpc2libGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmICh2aXNpYmxlICYmIHRoaXMuX21jVmlzaWJsZS52YWx1ZSAhPT0gdmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVmlzaWJsZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHRvb2x0aXAgaGFzIGJlZW4gaGlkZGVuIGZyb20gdGhlIHZpZXcgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uSGlkZVN1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBjbG9zZU9uSW50ZXJhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zID0gUE9TSVRJT05fTUFQO1xuICAgICAgICB0aGlzLiR2aXNpYmxlID0gdGhpcy5fbWNWaXNpYmxlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmhpZGVUaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVUaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVtcHR5KCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciAhPT0gJ21hbnVhbCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlT25JbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd1RpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgICAgICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9LCB0aGlzLm1jTW91c2VFbnRlckRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaWRlVGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tY1Zpc2libGUubmV4dChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMub25IaWRlU3ViamVjdC5uZXh0KCk7XG5cbiAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAvLyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byBPblB1c2ggaXQgd2lsbCBiZSBjaGVja2VkIGFueXdheXNcbiAgICAgICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIHRoaXMubWNNb3VzZUxlYXZlRGVsYXkpO1xuICAgIH1cblxuICAgIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsYXNzTWFwID0gYCR7dGhpcy5wcmVmaXh9LSR7dGhpcy5tY1BsYWNlbWVudH1gO1xuICAgIH1cblxuICAgIGlzQ29udGVudEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1RpdGxlU3RyaW5nID8gKHRoaXMubWNUaXRsZSA9PT0gJycgfHwgIXRoaXMubWNUaXRsZSkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2hlbiB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB2aWV3LiAqL1xuICAgIGFmdGVySGlkZGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkhpZGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQm9keUludGVyYWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLXRvb2x0aXAtc2Nyb2xsLXN0cmF0ZWd5Jyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gbWNUb29sdGlwU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5KG92ZXJsYXk6IE92ZXJsYXkpOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKHtzY3JvbGxUaHJvdHRsZTogMjB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1Rvb2x0aXBTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbi8qKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biBpZiB0aGUgdXNlciBzdXBwbGllZCBhbiBpbnZhbGlkIHRvb2x0aXAgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNUb29sdGlwSW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBFcnJvcihgTWNUb29sdGlwIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG5jb25zdCBWSUVXUE9SVF9NQVJHSU46IG51bWJlciA9IDg7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVG9vbHRpcF0sIFthdHRyaWJ1dGVePVwibWNUb29sdGlwXCJdJyxcbiAgICBleHBvcnRBczogJ21jVG9vbHRpcCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgaXNUb29sdGlwT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzRHluYW1pY1Rvb2x0aXAgPSBmYWxzZTtcbiAgICBwYXJlbnREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICAgIHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1jVG9vbHRpcENvbXBvbmVudD47XG4gICAgYXZhaWxhYmxlUG9zaXRpb25zOiBhbnk7XG4gICAgdG9vbHRpcDogTWNUb29sdGlwQ29tcG9uZW50IHwgbnVsbDtcblxuICAgIEBPdXRwdXQoKSBtY1Zpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSAkdW5zdWJzY3JpYmUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgQElucHV0KCdtY1Rvb2x0aXAnKVxuICAgIGdldCBtY1RpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RpdGxlO1xuICAgIH1cblxuICAgIHNldCBtY1RpdGxlKHRpdGxlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWNUaXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUaXRsZScsIHRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoJ21jVGl0bGUnKVxuICAgIHNldCBzZXRUaXRsZSh0aXRsZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWNUaXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1Rvb2x0aXBEaXNhYmxlZCcsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdtY01vdXNlRW50ZXJEZWxheScpXG4gICAgZ2V0IG1jTW91c2VFbnRlckRlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlRW50ZXJEZWxheTtcbiAgICB9XG5cbiAgICBzZXQgbWNNb3VzZUVudGVyRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlRW50ZXJEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUVudGVyRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNNb3VzZUVudGVyRGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnbWNNb3VzZUxlYXZlRGVsYXknKVxuICAgIGdldCBtY01vdXNlTGVhdmVEZWxheSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNNb3VzZUxlYXZlRGVsYXk7XG4gICAgfVxuXG4gICAgc2V0IG1jTW91c2VMZWF2ZURlbGF5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWNNb3VzZUxlYXZlRGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jTW91c2VMZWF2ZURlbGF5JywgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jTW91c2VMZWF2ZURlbGF5OiBudW1iZXI7XG5cbiAgICBASW5wdXQoJ21jVHJpZ2dlcicpXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVHJpZ2dlciA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVHJpZ2dlcicsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jVHJpZ2dlciA9ICdob3Zlcic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9ICdob3Zlcic7XG5cbiAgICBASW5wdXQoJ21jUGxhY2VtZW50JylcbiAgICBnZXQgbWNQbGFjZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jUGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBtY1BsYWNlbWVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BsYWNlbWVudCcsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21jUGxhY2VtZW50ID0gJ3RvcCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1BsYWNlbWVudDogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBASW5wdXQoJ21jVG9vbHRpcENsYXNzJylcbiAgICBnZXQgbWNUb29sdGlwQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Rvb2x0aXBDbGFzcztcbiAgICB9XG5cbiAgICBzZXQgbdGBVG9vbHRpcENsYXNzKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICAgICAgdGhpcy5fbWNUb29sdGlwQ2xhc3MgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy50b29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuc2V0Q2xhc3NNYXAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVG9vbHRpcENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwge1trZXk6IHN0cmluZ106IGFueX07XG5cbiAgICBASW5wdXQoJ21jVmlzaWJsZScpXG4gICAgZ2V0IG1jVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVmlzaWJsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNWaXNpYmxlKGV4dGVybmFsVmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZXh0ZXJuYWxWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21jVmlzaWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVmlzaWJsZScsIHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYy10b29sdGlwLW9wZW4nKVxuICAgIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVG9vbHRpcE9wZW47XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gICAgZ2V0IGlzUGFyZW50RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudERpc2FibGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFudWFsTGlzdGVuZXJzID0gbmV3IE1hcDxzdHJpbmcsIEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3Q+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIHByaXZhdGUgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucyA9IFBPU0lUSU9OX01BUDtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIHRoZSBvdmVybGF5IGNvbmZpZyBhbmQgcG9zaXRpb24gc3RyYXRlZ3kgKi9cbiAgICBjcmVhdGVPdmVybGF5KCk6IE92ZXJsYXlSZWYge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7IHJldHVybiB0aGlzLm92ZXJsYXlSZWY7IH1cblxuICAgICAgICAvLyBDcmVhdGUgY29ubmVjdGVkIHBvc2l0aW9uIHN0cmF0ZWd5IHRoYXQgbGlzdGVucyBmb3Igc2Nyb2xsIGV2ZW50cyB0byByZXBvc2l0aW9uLlxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYpXG4gICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcubWMtdG9vbHRpcCcpXG4gICAgICAgICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgICAgICAgIC53aXRoVmlld3BvcnRNYXJnaW4oVklFV1BPUlRfTUFSR0lOKVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoWy4uLkRFRkFVTFRfNF9QT1NJVElPTlNdKTtcblxuICAgICAgICBjb25zdCBzY3JvbGxhYmxlQW5jZXN0b3JzID0gdGhpcy5zY3JvbGxEaXNwYXRjaGVyLmdldEFuY2VzdG9yU2Nyb2xsQ29udGFpbmVycyh0aGlzLmVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHN0cmF0ZWd5LndpdGhTY3JvbGxhYmxlQ29udGFpbmVycyhzY3JvbGxhYmxlQW5jZXN0b3JzKTtcblxuICAgICAgICBzdHJhdGVneS5wb3NpdGlvbkNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50b29sdGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Qb3NpdGlvbkNoYW5nZShjaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnNjcm9sbGFibGVWaWV3UHJvcGVydGllcy5pc092ZXJsYXlDbGlwcGVkICYmIHRoaXMudG9vbHRpcC5tY1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIHBvc2l0aW9uIGNoYW5nZXMgb2NjdXIgYW5kIHRoZSBvdmVybGF5IGlzIGNsaXBwZWQgYnlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgcGFyZW50IHNjcm9sbGFibGUgdGhlbiBjbG9zZSB0aGUgdG9vbHRpcC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24sXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiBzdHJhdGVneSxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICdtYy10b29sdGlwLXBhbmVsJyxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5KClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2htZW50cygpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGFjaCgpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmO1xuICAgIH1cblxuICAgIGRldGFjaCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b29sdGlwID0gbnVsbDtcbiAgICB9XG5cbiAgICBvblBvc2l0aW9uQ2hhbmdlKCRldmVudDogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgICAgIGxldCB1cGRhdGVkUGxhY2VtZW50ID0gdGhpcy5tY1BsYWNlbWVudDtcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVBvc2l0aW9ucykuc29tZSgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWCAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5ZID09PSB0aGlzLmF2YWlsYWJsZVBvc2l0aW9uc1trZXldLm9yaWdpblkgJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVggPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVggJiZcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3ZlcmxheVlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWRQbGFjZW1lbnQgPSBrZXk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNQbGFjZW1lbnQnLCB1cGRhdGVkUGxhY2VtZW50KTtcblxuICAgICAgICBpZiAodGhpcy50b29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuc2V0Q2xhc3NNYXAoKTtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlUG9zaXRpb25pbmdVcGRhdGUoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVQb3NpdGlvbmluZ1VwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNQbGFjZW1lbnQgPT09ICdyaWdodCcgfHwgdGhpcy5tY1BsYWNlbWVudCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPVxuICAgICAgICAgICAgICAgICh0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY2xpZW50SGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3N0Vmlldy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KSAvIDI7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUudG9wIHx8ICcwcHgnO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnN0eWxlLnRvcCA9XG4gICAgICAgICAgICAgICAgYCR7cGFyc2VJbnQoY3VycmVudENvbnRhaW5lci5zcGxpdCgncHgnKVswXSwgMTApICsgcG9zIC0gMX1weGA7XG4gICAgICAgICAgICAvLyBUT0RPOiDQvtCx0L3QvtCy0LvRj9GC0Ywg0L/QvtC70L7QttC10L3QuNC1INGB0YLRgNC10LvQutC4XFzRg9C60LDQt9Cw0YLQtdC70Y9cXFwi0LTRj9GC0LvQsFwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgdXBkYXRlQ29tcFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzRHluYW1pY1Rvb2x0aXAgJiYgdmFsdWUgJiYgdGhpcy50b29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdEVsZW1lbnRSZWZMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVycy5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMuJHVuc3Vic2NyaWJlLm5leHQoKTtcbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUb29sdGlwT3BlbiAmJiBlLmtleUNvZGUgPT09IEVTQ0FQRSkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZVRvdWNoZW5kKCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpbml0RWxlbWVudFJlZkxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlZW50ZXInLCAoKSA9PiB0aGlzLnNob3coKSlcbiAgICAgICAgICAgICAgICAuc2V0KCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5oaWRlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3RlbmVyLCBldmVudCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1jVHJpZ2dlciA9PT0gJ2ZvY3VzJykge1xuICAgICAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAuc2V0KCdmb2N1cycsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ2JsdXInLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSB0aGlzLnBvcnRhbCB8fCBuZXcgQ29tcG9uZW50UG9ydGFsKE1jVG9vbHRpcENvbXBvbmVudCwgdGhpcy5ob3N0Vmlldyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAgPSBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCkuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwLmFmdGVySGlkZGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRldGFjaCgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRHluYW1pY1Rvb2x0aXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICdtY1RpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgJ21jUGxhY2VtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jVHJpZ2dlcicsXG4gICAgICAgICAgICAgICAgICAgICdtY1Rvb2x0aXBEaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgICAgICdtY01vdXNlRW50ZXJEZWxheScsXG4gICAgICAgICAgICAgICAgICAgICdtY01vdXNlTGVhdmVEZWxheScsXG4gICAgICAgICAgICAgICAgICAgICdt0YFUb29sdGlwQ2xhc3MnXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB0aGlzLnVwZGF0ZUNvbXBWYWx1ZShwcm9wZXJ0eSwgdGhpc1sgcHJvcGVydHkgXSkpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcC5tY1Zpc2libGVDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy4kdW5zdWJzY3JpYmUpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1jVmlzaWJsZUNoYW5nZS5lbWl0KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Rvb2x0aXBPcGVuID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCB0b29sdGlwLiAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gdGhpcy5nZXRPcmlnaW4oKTtcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCk7XG5cbiAgICAgICAgcG9zaXRpb24ud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgICB7IC4uLm9yaWdpbi5tYWluLCAuLi5vdmVybGF5Lm1haW4gfSxcbiAgICAgICAgICAgIHsgLi4ub3JpZ2luLmZhbGxiYWNrLCAuLi5vdmVybGF5LmZhbGxiYWNrIH1cbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgb3JpZ2luIHBvc2l0aW9uIGFuZCBhIGZhbGxiYWNrIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcG9zaXRpb24gcHJlZmVyZW5jZS5cbiAgICAgKiBUaGUgZmFsbGJhY2sgcG9zaXRpb24gaXMgdGhlIGludmVyc2Ugb2YgdGhlIG9yaWdpbiAoZS5nLiBgJ2JlbG93JyAtPiAnYWJvdmUnYCkuXG4gICAgICovXG4gICAgZ2V0T3JpZ2luKCk6IHttYWluOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb247IGZhbGxiYWNrOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb259IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm1jUGxhY2VtZW50O1xuICAgICAgICBjb25zdCBpc0x0ciA9ICF0aGlzLmRpcmVjdGlvbiB8fCB0aGlzLmRpcmVjdGlvbi52YWx1ZSA9PT0gJ2x0cic7XG4gICAgICAgIGxldCBvcmlnaW5Qb3NpdGlvbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcgfHwgcG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBvcmlnaW5Qb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2NlbnRlcicsIG9yaWdpblk6IHBvc2l0aW9uID09PSAndG9wJyA/ICd0b3AnIDogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAndG9wJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3JpZ2luUG9zaXRpb24gPSB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ3JpZ2h0JyAmJiBpc0x0cikgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG9yaWdpblBvc2l0aW9uID0geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuaW52ZXJ0UG9zaXRpb24ob3JpZ2luUG9zaXRpb24ub3JpZ2luWCwgb3JpZ2luUG9zaXRpb24ub3JpZ2luWSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1haW46IG9yaWdpblBvc2l0aW9uLFxuICAgICAgICAgICAgZmFsbGJhY2s6IHsgb3JpZ2luWDogeCwgb3JpZ2luWTogeSB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIG92ZXJsYXkgcG9zaXRpb24gYW5kIGEgZmFsbGJhY2sgcG9zaXRpb24gYmFzZWQgb24gdGhlIHVzZXIncyBwcmVmZXJlbmNlICovXG4gICAgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IHsgbWFpbjogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbjsgZmFsbGJhY2s6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24gfSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgY29uc3QgaXNMdHIgPSAhdGhpcy5kaXJlY3Rpb24gfHwgdGhpcy5kaXJlY3Rpb24udmFsdWUgPT09ICdsdHInO1xuICAgICAgICBsZXQgb3ZlcmxheVBvc2l0aW9uOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ2JvdHRvbScgfTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAndG9wJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3ZlcmxheVBvc2l0aW9uID0geyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdib3R0b20nIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAhaXNMdHIpKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuaW52ZXJ0UG9zaXRpb24ob3ZlcmxheVBvc2l0aW9uLm92ZXJsYXlYLCBvdmVybGF5UG9zaXRpb24ub3ZlcmxheVkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWluOiBvdmVybGF5UG9zaXRpb24sXG4gICAgICAgICAgICBmYWxsYmFjazogeyBvdmVybGF5WDogeCwgb3ZlcmxheVk6IHkgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBJbnZlcnRzIGFuIG92ZXJsYXkgcG9zaXRpb24uICovXG4gICAgcHJpdmF0ZSBpbnZlcnRQb3NpdGlvbih4OiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcywgeTogVmVydGljYWxDb25uZWN0aW9uUG9zKSB7XG4gICAgICAgIGxldCBuZXdYOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyA9IHg7XG4gICAgICAgIGxldCBuZXdZOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MgPSB5O1xuICAgICAgICBpZiAodGhpcy5tY1BsYWNlbWVudCA9PT0gJ3RvcCcgfHwgdGhpcy5tY1BsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIGlmICh5ID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIG5ld1kgPSAnYm90dG9tJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICBuZXdZID0gJ3RvcCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoeCA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICBuZXdYID0gJ3N0YXJ0JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIG5ld1ggPSAnZW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IHg6IG5ld1gsIHk6IG5ld1kgfTtcbiAgICB9XG59XG4iXX0=
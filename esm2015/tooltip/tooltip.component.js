/**
 * @fileoverview added by tsickle
 * Generated from: tooltip.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return typeof this.mcTitle === 'string' && this._mcTitle !== '';
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
                styles: ["@-webkit-keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{-webkit-animation:mc-progress 1s linear infinite;animation:mc-progress 1s linear infinite;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 0,transparent 20px,rgba(0,0,0,.05) 0,rgba(0,0,0,.05) 30px,transparent 0) repeat;background-size:29px 29px;border-radius:inherit;bottom:0;content:\"\";left:0;position:absolute;right:0;top:0}.cdk-overlay-container{height:100%;pointer-events:none;position:fixed;width:100%}.cdk-overlay-backdrop,.cdk-overlay-container{box-sizing:border-box;left:0;margin:0;padding:0;top:0;z-index:1000}.cdk-overlay-backdrop{-webkit-tap-highlight-color:transparent;bottom:0;opacity:0;pointer-events:auto;position:absolute;right:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.cdk-overlay-pane{max-height:100%;max-width:100%;pointer-events:auto}.cdk-overlay-connected-position-bounding-box,.cdk-overlay-pane{box-sizing:border-box;margin:0;padding:0;position:absolute;z-index:1000}.cdk-overlay-connected-position-bounding-box{display:flex;flex-direction:column;min-height:1px;min-width:1px}.mc-tooltip{box-sizing:border-box;display:block;list-style:none;margin:0;max-width:240px;padding:0;position:relative;visibility:visible;white-space:pre-line;z-index:1060}.mc-tooltip_placement-top{padding-bottom:9px}.mc-tooltip_placement-right{padding-left:9px}.mc-tooltip_placement-bottom{padding-top:9px}.mc-tooltip_placement-left{padding-right:9px}.mc-tooltip-inner{border-radius:3px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;min-height:32px;padding:8px 16px;text-align:left;text-decoration:none;vertical-align:center}.mc-tooltip-arrow{height:12px;position:absolute;transform:rotate(45deg);width:12px}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:4px;left:50%;margin-left:-5px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:4px;margin-top:-5px;top:16px}.mc-tooltip_placement-left .mc-tooltip-arrow{margin-top:-5px;right:4px;top:16px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{left:50%;margin-left:-5px;top:4px}"]
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
        this.updatePosition();
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
            this.tooltip.markForCheck();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90b29sdGlwLyIsInNvdXJjZXMiOlsidG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUdILE9BQU8sRUFFUCxnQkFBZ0IsRUFPbkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUNILGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsWUFBWSxFQUNmLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBZWpFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFxRjNCLFlBQW1CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBcEZ6QyxXQUFNLEdBQUcsc0JBQXNCLENBQUM7UUFDaEMsY0FBUyxHQUE2QixDQUFDLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztRQUMvRCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBT0osb0JBQWUsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3RCxzQkFBaUIsR0FBRyxHQUFHLENBQUM7UUFFeEIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBc0J2QixlQUFVLEdBQVcsT0FBTyxDQUFDO1FBMEI3QixpQkFBWSxHQUFXLEtBQUssQ0FBQztRQWlCN0IsZUFBVSxHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQzs7OztRQUdsRSxrQkFBYSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3JELHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUd4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNuRCxDQUFDOzs7O0lBeEVELElBQ0ksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVELElBQUksT0FBTyxDQUFDLEtBQWdDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFJRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFJRCxJQUNJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFhO1FBQ3pCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUUsQ0FBQyxDQUFDO1NBQzVEO2FBQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQzs7OztJQUVELElBQ0ksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELElBQUksY0FBYyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQzs7OztJQUtELElBQ0ksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFjOztjQUNsQixPQUFPLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDO1FBRTVDLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtZQUM5QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7O0lBYUQsSUFBSTtRQUNBLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7YUFDbEM7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVU7OztZQUFDLEdBQUcsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVoQyx3REFBd0Q7Z0JBQ3hELCtEQUErRDtnQkFDL0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUMsR0FBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5QjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFMUIsd0RBQXdEO1lBQ3hELCtEQUErRDtZQUMvRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxHQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUk7WUFDNUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSTtTQUM5QixDQUFDO0lBQ04sQ0FBQzs7OztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMvRSxDQUFDOzs7OztJQUdELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVELFlBQVk7UUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxxQkFBcUI7UUFDakIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7O0lBRUQsSUFBSSxhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxZQUFZLFdBQVcsQ0FBQztJQUMvQyxDQUFDOzs7O0lBRUQsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDO0lBQ3BFLENBQUM7OztZQTNLSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMzQix1Z0JBQXVDO2dCQUV2QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLElBQUksRUFBRTtvQkFDRixjQUFjLEVBQUUsOEJBQThCO2lCQUNqRDs7YUFDSjs7OztZQXZDRyxpQkFBaUI7Ozs4QkFrRGhCLE1BQU07Z0NBRU4sS0FBSztnQ0FFTCxLQUFLO3NCQUVMLEtBQUs7d0JBV0wsS0FBSzswQkFXTCxLQUFLOzZCQWNMLEtBQUs7d0JBWUwsS0FBSzs7OztJQS9ETixvQ0FBZ0M7O0lBQ2hDLHVDQUErRDs7SUFDL0Qsc0NBQWM7O0lBQ2QsMkNBQXVCOztJQUN2QixxQ0FBYTs7SUFDYixxQ0FBYTs7SUFDYixnREFBd0I7O0lBQ3hCLHNDQUE4Qjs7SUFFOUIsNkNBQXNFOztJQUV0RSwrQ0FBaUM7O0lBRWpDLCtDQUErQjs7Ozs7SUFXL0Isc0NBQTRDOzs7OztJQVc1Qyx3Q0FBcUM7Ozs7O0lBeUJyQyw2Q0FBZ0M7Ozs7O0lBQ2hDLDBDQUFxQzs7Ozs7SUFpQnJDLHdDQUFtRjs7Ozs7O0lBR25GLDJDQUE2RDs7Ozs7SUFDN0QsZ0RBQTRDOztJQUVoQyxpQ0FBNkI7OztBQTZFN0MsTUFBTSxPQUFPLDBCQUEwQixHQUNuQyxJQUFJLGNBQWMsQ0FBdUIsNEJBQTRCLENBQUM7Ozs7OztBQUcxRSxNQUFNLFVBQVUsOEJBQThCLENBQUMsT0FBZ0I7SUFDM0Q7OztJQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBQyxjQUFjLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFBQztBQUMzRSxDQUFDOzs7OztBQUdELE1BQU0sT0FBTywyQ0FBMkMsR0FBRztJQUN2RCxPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNmLFVBQVUsRUFBRSw4QkFBOEI7Q0FDN0M7Ozs7OztBQUdELE1BQU0sVUFBVSxnQ0FBZ0MsQ0FBQyxRQUFnQjtJQUM3RCxPQUFPLEtBQUssQ0FBQyx1QkFBdUIsUUFBUSxlQUFlLENBQUMsQ0FBQztBQUNqRSxDQUFDOztNQUVLLGVBQWUsR0FBVyxDQUFDO0FBVWpDLE1BQU0sT0FBTyxTQUFTOzs7Ozs7Ozs7O0lBcUpsQixZQUNZLE9BQWdCLEVBQ2hCLFVBQXNCLEVBQ3RCLE1BQWMsRUFDZCxnQkFBa0MsRUFDbEMsUUFBMEIsRUFDVSxjQUFjLEVBQ3RDLFNBQXlCO1FBTnJDLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUNVLG1CQUFjLEdBQWQsY0FBYyxDQUFBO1FBQ3RDLGNBQVMsR0FBVCxTQUFTLENBQWdCO1FBM0pqRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFNdEIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ2hELGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQTZCbkMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQXdDM0IsZUFBVSxHQUFXLE9BQU8sQ0FBQztRQWlCN0IsaUJBQVksR0FBVyxLQUFLLENBQUM7UUFrRDdCLG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQThDLENBQUM7UUFDL0QsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFXN0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztJQUMzQyxDQUFDOzs7O0lBbkpELElBQ0ksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVELElBQUksT0FBTyxDQUFDLEtBQWdDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBSUQsSUFDSSxRQUFRLENBQUMsS0FBZ0M7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELElBQUksUUFBUSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7OztJQUlELElBQ0ksaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsSUFBSSxpQkFBaUIsQ0FBQyxLQUFhO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7O0lBSUQsSUFDSSxpQkFBaUI7UUFDakIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxJQUFJLGlCQUFpQixDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7SUFJRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQzs7OztJQUlELElBQ0ksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELElBQUksV0FBVyxDQUFDLEtBQWE7UUFDekIsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUlELElBQ0ksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELElBQUksY0FBYyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUM3QjtJQUNMLENBQUM7Ozs7SUFJRCxJQUNJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxJQUFJLFNBQVMsQ0FBQyxhQUFzQjs7Y0FDMUIsS0FBSyxHQUFHLHFCQUFxQixDQUFDLGFBQWEsQ0FBQztRQUVsRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXpDLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO1NBQ0o7SUFDTCxDQUFDOzs7O0lBSUQsSUFDSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCxJQUNJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFrQkQsYUFBYTtRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUFFOzs7Y0FHMUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO2FBQ25DLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDcEMscUJBQXFCLENBQUMsYUFBYSxDQUFDO2FBQ3BDLHNCQUFzQixDQUFDLEtBQUssQ0FBQzthQUM3QixrQkFBa0IsQ0FBQyxlQUFlLENBQUM7YUFDbkMsYUFBYSxDQUFDLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDOztjQUV0QyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUU5RixRQUFRLENBQUMsd0JBQXdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV2RCxRQUFRLENBQUMsZUFBZTthQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQixTQUFTOzs7O1FBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtvQkFDNUUsNkRBQTZEO29CQUM3RCw4Q0FBOEM7b0JBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7O29CQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDO2lCQUN0QzthQUNKO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2xDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLFVBQVUsRUFBRSxrQkFBa0I7WUFDOUIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUU7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO2FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQyxDQUFDO1FBRXBDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLE1BQXNDOztZQUMvQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVztRQUV2QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzlDLElBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU87Z0JBQ3RFLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPO2dCQUN0RSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUTtnQkFDeEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFDMUU7Z0JBQ0UsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO2dCQUV2QixPQUFPLElBQUksQ0FBQzthQUNmO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCx1QkFBdUI7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDMUM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxFQUFFOztrQkFDdkQsR0FBRyxHQUNMLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsWUFBWTtnQkFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7OztrQkFDdkQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLO1lBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHO2dCQUNwQyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ25FLHNEQUFzRDtTQUN6RDtJQUNMLENBQUM7Ozs7Ozs7SUFHRCxlQUFlLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDbkMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMvQjtJQUNMLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTzs7Ozs7UUFBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxDQUFnQjtRQUMxQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUUsRUFBRSxzQkFBc0I7WUFDcEUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7O0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsdUJBQXVCO1FBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGVBQWU7aUJBQ2YsR0FBRyxDQUFDLFlBQVk7OztZQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQztpQkFDcEMsR0FBRyxDQUFDLFlBQVk7OztZQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQztpQkFDcEMsT0FBTzs7Ozs7WUFBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBQyxDQUFDO1NBQ3RHO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sRUFBRTtZQUM1QixJQUFJLENBQUMsZUFBZTtpQkFDZixHQUFHLENBQUMsT0FBTzs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDO2lCQUMvQixHQUFHLENBQUMsTUFBTTs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDO2lCQUM5QixPQUFPOzs7OztZQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUM7U0FDdEc7SUFDTCxDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFOztzQkFDVCxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUVkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXBGLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtxQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQy9CLFNBQVM7OztnQkFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQzs7c0JBQ3ZCLFVBQVUsR0FBRztvQkFDZixTQUFTO29CQUNULGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixnQkFBZ0I7aUJBQ25CO2dCQUNELFVBQVUsQ0FBQyxPQUFPOzs7O2dCQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUUsUUFBUSxDQUFFLENBQUMsRUFBQyxDQUFDO2dCQUNuRixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO3FCQUNsRixTQUFTOzs7O2dCQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLENBQUMsRUFBQyxDQUFDO2FBQ1Y7WUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7Ozs7O0lBR0QsY0FBYztRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzFDOztjQUVLLFFBQVEsR0FBRyxtQkFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFxQzs7Y0FDNUYsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7O2NBQ3pCLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFFekMsUUFBUSxDQUFDLGFBQWEsQ0FBQzs0Q0FDZCxNQUFNLENBQUMsSUFBSSxHQUFLLE9BQU8sQ0FBQyxJQUFJOzRDQUM1QixNQUFNLENBQUMsUUFBUSxHQUFLLE9BQU8sQ0FBQyxRQUFRO1NBQzVDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDOzs7Ozs7SUFNRCxTQUFTOztjQUNDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVzs7Y0FDM0IsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxLQUFLOztZQUMzRCxjQUF3QztRQUU1QyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM3QyxjQUFjLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzFGO2FBQU0sSUFDSCxRQUFRLEtBQUssS0FBSztZQUNsQixDQUFDLFFBQVEsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDO1lBQzlCLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLGNBQWMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO1NBQzVEO2FBQU0sSUFDSCxRQUFRLEtBQUssUUFBUTtZQUNyQixDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksS0FBSyxDQUFDO1lBQy9CLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLGNBQWMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO1NBQzFEO2FBQU07WUFDSCxNQUFNLGdDQUFnQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BEO2NBRUssRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFFbEYsT0FBTztZQUNILElBQUksRUFBRSxjQUFjO1lBQ3BCLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtTQUN2QyxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFHRCxrQkFBa0I7O2NBQ1IsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXOztjQUMzQixLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLEtBQUs7O1lBQzNELGVBQTBDO1FBRTlDLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtZQUNwQixlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUNoRTthQUFNLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM5QixlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUM3RDthQUFNLElBQ0gsUUFBUSxLQUFLLEtBQUs7WUFDbEIsQ0FBQyxRQUFRLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQztZQUM5QixDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUM3RDthQUFNLElBQ0gsUUFBUSxLQUFLLFFBQVE7WUFDckIsQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQztZQUMvQixDQUFDLFFBQVEsS0FBSyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQyxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUMvRDthQUFNO1lBQ0gsTUFBTSxnQ0FBZ0MsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDtjQUVLLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDO1FBRXRGLE9BQU87WUFDSCxJQUFJLEVBQUUsZUFBZTtZQUNyQixRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7U0FDekMsQ0FBQztJQUNOLENBQUM7Ozs7Ozs7O0lBR08sY0FBYyxDQUFDLENBQTBCLEVBQUUsQ0FBd0I7O1lBQ25FLElBQUksR0FBNEIsQ0FBQzs7WUFDakMsSUFBSSxHQUEwQixDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDN0QsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUNiLElBQUksR0FBRyxRQUFRLENBQUM7YUFDbkI7aUJBQU0sSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUN2QixJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDYixJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ2xCO2lCQUFNLElBQUksQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDdEIsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBRUQsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7OztZQWpkSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLElBQUksRUFBRTtvQkFDRixXQUFXLEVBQUUsdUJBQXVCO29CQUNwQyxZQUFZLEVBQUUsa0JBQWtCO2lCQUNuQzthQUNKOzs7O1lBcFBHLE9BQU87WUFnQlAsVUFBVTtZQU1WLE1BQU07WUFwQk4sZ0JBQWdCO1lBMEJoQixnQkFBZ0I7NENBb1hYLE1BQU0sU0FBQywwQkFBMEI7WUFyWmpDLGNBQWMsdUJBc1pkLFFBQVE7Ozs4QkFuSlosTUFBTTtzQkFHTixLQUFLLFNBQUMsV0FBVzt1QkFZakIsS0FBSyxTQUFDLFNBQVM7dUJBS2YsS0FBSyxTQUFDLG1CQUFtQjtnQ0FZekIsS0FBSyxTQUFDLG1CQUFtQjtnQ0FZekIsS0FBSyxTQUFDLG1CQUFtQjt3QkFZekIsS0FBSyxTQUFDLFdBQVc7MEJBZ0JqQixLQUFLLFNBQUMsYUFBYTs2QkFpQm5CLEtBQUssU0FBQyxnQkFBZ0I7d0JBZ0J0QixLQUFLLFNBQUMsV0FBVztxQkFzQmpCLFdBQVcsU0FBQyx1QkFBdUI7K0JBS25DLFdBQVcsU0FBQyxnQkFBZ0I7Ozs7SUE1STdCLGtDQUErQjs7SUFDL0IscUNBQXlCOztJQUN6QixtQ0FBZ0M7O0lBQ2hDLCtCQUE4Qjs7SUFDOUIsMkJBQTRDOztJQUM1Qyx1Q0FBd0I7O0lBQ3hCLDRCQUFtQzs7SUFFbkMsb0NBQXdEOzs7OztJQUN4RCxpQ0FBMkM7Ozs7O0lBWTNDLDZCQUE0Qzs7Ozs7SUFpQjVDLDhCQUFtQzs7Ozs7SUFZbkMsdUNBQW1DOzs7OztJQVluQyx1Q0FBbUM7Ozs7O0lBZ0JuQywrQkFBcUM7Ozs7O0lBaUJyQyxpQ0FBcUM7Ozs7O0lBZ0JyQyxvQ0FBZ0M7Ozs7O0lBc0JoQywrQkFBNEI7Ozs7O0lBWTVCLG9DQUFnRjs7Ozs7SUFDaEYsOEJBQWlEOzs7OztJQUc3Qyw0QkFBd0I7Ozs7O0lBQ3hCLCtCQUE4Qjs7Ozs7SUFDOUIsMkJBQXNCOzs7OztJQUN0QixxQ0FBMEM7Ozs7O0lBQzFDLDZCQUFrQzs7Ozs7SUFDbEMsbUNBQTBEOzs7OztJQUMxRCw4QkFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSxcbiAgICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheVJlZixcbiAgICBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIFNjcm9sbFN0cmF0ZWd5LFxuICAgIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgICBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uLFxuICAgIE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgICBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyxcbiAgICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3Ncbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgZmFkZUFuaW1hdGlvbixcbiAgICBERUZBVUxUXzRfUE9TSVRJT05TLFxuICAgIFBPU0lUSU9OX01BUFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10b29sdGlwLWNvbXBvbmVudCcsXG4gICAgYW5pbWF0aW9uczogW2ZhZGVBbmltYXRpb25dLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b29sdGlwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b29sdGlwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhib2R5OmNsaWNrKSc6ICd0aGlzLmhhbmRsZUJvZHlJbnRlcmFjdGlvbigpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUb29sdGlwQ29tcG9uZW50IHtcbiAgICBwcmVmaXggPSAnbWMtdG9vbHRpcF9wbGFjZW1lbnQnO1xuICAgIHBvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gWy4uLkRFRkFVTFRfNF9QT1NJVElPTlNdO1xuICAgIGNsYXNzTWFwID0ge307XG4gICAgaXNUaXRsZVN0cmluZzogYm9vbGVhbjtcbiAgICBzaG93VGlkOiBhbnk7XG4gICAgaGlkZVRpZDogYW55O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogYW55O1xuICAgICR2aXNpYmxlOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gICAgQE91dHB1dCgpIG1jVmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgbWNNb3VzZUVudGVyRGVsYXkgPSA0MDA7XG5cbiAgICBASW5wdXQoKSBtY01vdXNlTGVhdmVEZWxheSA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1RpdGxlKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUaXRsZTtcbiAgICB9XG5cbiAgICBzZXQgbWNUaXRsZSh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9tY1RpdGxlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCBtY1RyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tY1RyaWdnZXIgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RyaWdnZXI6IHN0cmluZyA9ICdob3Zlcic7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtY1BsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9tY1BsYWNlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25zLnVuc2hpZnQoUE9TSVRJT05fTUFQWyB0aGlzLm1jUGxhY2VtZW50IF0pO1xuICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1jVG9vbHRpcENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Rvb2x0aXBDbGFzcztcbiAgICB9XG5cbiAgICBzZXQgbWNUb29sdGlwQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tY1Rvb2x0aXBDbGFzcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21jVG9vbHRpcENsYXNzOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZpc2libGUgJiYgdGhpcy5fbWNWaXNpYmxlLnZhbHVlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNWaXNpYmxlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB0aGUgdmlldyAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb25IaWRlU3ViamVjdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIGNsb3NlT25JbnRlcmFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVQb3NpdGlvbnMgPSBQT1NJVElPTl9NQVA7XG4gICAgICAgIHRoaXMuJHZpc2libGUgPSB0aGlzLl9tY1Zpc2libGUuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZVRpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RW1wdHkoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93VGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdCh0cnVlKTtcblxuICAgICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sIHRoaXMubWNNb3VzZUVudGVyRGVsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpZGVUaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX21jVmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMubWNWaXNpYmxlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5vbkhpZGVTdWJqZWN0Lm5leHQoKTtcblxuICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgICAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgICAgICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSwgdGhpcy5tY01vdXNlTGVhdmVEZWxheSk7XG4gICAgfVxuXG4gICAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xhc3NNYXAgPSB7XG4gICAgICAgICAgICBbYCR7dGhpcy5wcmVmaXh9LSR7dGhpcy5tY1BsYWNlbWVudH1gXTogdHJ1ZSxcbiAgICAgICAgICAgIFt0aGlzLm1jVG9vbHRpcENsYXNzXTogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlzQ29udGVudEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1RpdGxlU3RyaW5nID8gKHRoaXMubWNUaXRsZSA9PT0gJycgfHwgIXRoaXMubWNUaXRsZSkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2hlbiB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB2aWV3LiAqL1xuICAgIGFmdGVySGlkZGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkhpZGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQm9keUludGVyYWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlzVGVtcGxhdGVSZWYoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1jVGl0bGUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICB9XG5cbiAgICBnZXQgaXNOb25FbXB0eVN0cmluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLm1jVGl0bGUgPT09ICdzdHJpbmcnICYmIHRoaXMuX21jVGl0bGUgIT09ICcnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy10b29sdGlwLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jVG9vbHRpcFNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7c2Nyb2xsVGhyb3R0bGU6IDIwfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNUb29sdGlwU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG4vKiogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCB0b29sdGlwIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRXJyb3IoYE1jVG9vbHRpcCBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIgaXMgaW52YWxpZC5gKTtcbn1cblxuY29uc3QgVklFV1BPUlRfTUFSR0lOOiBudW1iZXIgPSA4O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1Rvb2x0aXBdLCBbYXR0cmlidXRlXj1cIm1jVG9vbHRpcFwiXScsXG4gICAgZXhwb3J0QXM6ICdtY1Rvb2x0aXAnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUb29sdGlwIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGlzVG9vbHRpcE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0R5bmFtaWNUb29sdGlwID0gZmFsc2U7XG4gICAgcGFyZW50RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNY1Rvb2x0aXBDb21wb25lbnQ+O1xuICAgIGF2YWlsYWJsZVBvc2l0aW9uczogYW55O1xuICAgIHRvb2x0aXA6IE1jVG9vbHRpcENvbXBvbmVudCB8IG51bGw7XG5cbiAgICBAT3V0cHV0KCkgbWNWaXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIHByaXZhdGUgJHVuc3Vic2NyaWJlID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIEBJbnB1dCgnbWNUb29sdGlwJylcbiAgICBnZXQgbWNUaXRsZSgpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jVGl0bGU7XG4gICAgfVxuXG4gICAgc2V0IG1jVGl0bGUodGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fbWNUaXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUaXRsZScsIHRpdGxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1RpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1RpdGxlJylcbiAgICBzZXQgc2V0VGl0bGUodGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5tY1RpdGxlID0gdGl0bGU7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY1Rvb2x0aXBEaXNhYmxlZCcpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jVG9vbHRpcERpc2FibGVkJywgdmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoJ21jTW91c2VFbnRlckRlbGF5JylcbiAgICBnZXQgbWNNb3VzZUVudGVyRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21jTW91c2VFbnRlckRlbGF5O1xuICAgIH1cblxuICAgIHNldCBtY01vdXNlRW50ZXJEZWxheSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21jTW91c2VFbnRlckRlbGF5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY01vdXNlRW50ZXJEZWxheScsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY01vdXNlRW50ZXJEZWxheTogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY01vdXNlTGVhdmVEZWxheScpXG4gICAgZ2V0IG1jTW91c2VMZWF2ZURlbGF5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY01vdXNlTGVhdmVEZWxheTtcbiAgICB9XG5cbiAgICBzZXQgbWNNb3VzZUxlYXZlRGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9tY01vdXNlTGVhdmVEZWxheSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNNb3VzZUxlYXZlRGVsYXknLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNNb3VzZUxlYXZlRGVsYXk6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnbWNUcmlnZ2VyJylcbiAgICBnZXQgbWNUcmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IG1jVHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUcmlnZ2VyJywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNUcmlnZ2VyID0gJ2hvdmVyJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21jVHJpZ2dlcjogc3RyaW5nID0gJ2hvdmVyJztcblxuICAgIEBJbnB1dCgnbWNQbGFjZW1lbnQnKVxuICAgIGdldCBtY1BsYWNlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNQbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IG1jUGxhY2VtZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9tY1BsYWNlbWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wVmFsdWUoJ21jUGxhY2VtZW50JywgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWNQbGFjZW1lbnQgPSAndG9wJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNQbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KCdtY1Rvb2x0aXBDbGFzcycpXG4gICAgZ2V0IG1jVG9vbHRpcENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tY1Rvb2x0aXBDbGFzcztcbiAgICB9XG5cbiAgICBzZXQgbWNUb29sdGlwQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21jVG9vbHRpcENsYXNzID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNUb29sdGlwQ2xhc3MnLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tY1Rvb2x0aXBDbGFzcyA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWNUb29sdGlwQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgnbWNWaXNpYmxlJylcbiAgICBnZXQgbWNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWNWaXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBtY1Zpc2libGUoZXh0ZXJuYWxWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShleHRlcm5hbFZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fbWNWaXNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWNWaXNpYmxlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBWYWx1ZSgnbWNWaXNpYmxlJywgdmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tY1Zpc2libGU6IGJvb2xlYW47XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1jLXRvb2x0aXAtb3BlbicpXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUb29sdGlwT3BlbjtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgICBnZXQgaXNQYXJlbnREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYW51YWxMaXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdD4oKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgcHJpdmF0ZSBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zID0gUE9TSVRJT05fTUFQO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICAgIGNyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHsgcmV0dXJuIHRoaXMub3ZlcmxheVJlZjsgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBjb25uZWN0ZWQgcG9zaXRpb24gc3RyYXRlZ3kgdGhhdCBsaXN0ZW5zIGZvciBzY3JvbGwgZXZlbnRzIHRvIHJlcG9zaXRpb24uXG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuZWxlbWVudFJlZilcbiAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5tYy10b29sdGlwJylcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbihWSUVXUE9SVF9NQVJHSU4pXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbLi4uREVGQVVMVF80X1BPU0lUSU9OU10pO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVBbmNlc3RvcnMgPSB0aGlzLnNjcm9sbERpc3BhdGNoZXIuZ2V0QW5jZXN0b3JTY3JvbGxDb250YWluZXJzKHRoaXMuZWxlbWVudFJlZik7XG5cbiAgICAgICAgc3RyYXRlZ3kud2l0aFNjcm9sbGFibGVDb250YWluZXJzKHNjcm9sbGFibGVBbmNlc3RvcnMpO1xuXG4gICAgICAgIHN0cmF0ZWd5LnBvc2l0aW9uQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblBvc2l0aW9uQ2hhbmdlKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2Uuc2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzLmlzT3ZlcmxheUNsaXBwZWQgJiYgdGhpcy50b29sdGlwLm1jVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcG9zaXRpb24gY2hhbmdlcyBvY2N1ciBhbmQgdGhlIG92ZXJsYXkgaXMgY2xpcHBlZCBieVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYSBwYXJlbnQgc2Nyb2xsYWJsZSB0aGVuIGNsb3NlIHRoZSB0b29sdGlwLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbixcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHN0cmF0ZWd5LFxuICAgICAgICAgICAgcGFuZWxDbGFzczogJ21jLXRvb2x0aXAtcGFuZWwnLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKClcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvb2x0aXAgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50OiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICAgICAgbGV0IHVwZGF0ZWRQbGFjZW1lbnQgPSB0aGlzLm1jUGxhY2VtZW50O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zKS5zb21lKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vcmlnaW5YICYmXG4gICAgICAgICAgICAgICAgJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblkgPT09IHRoaXMuYXZhaWxhYmxlUG9zaXRpb25zW2tleV0ub3JpZ2luWSAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WCA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vdmVybGF5WCAmJlxuICAgICAgICAgICAgICAgICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WSA9PT0gdGhpcy5hdmFpbGFibGVQb3NpdGlvbnNba2V5XS5vdmVybGF5WVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZFBsYWNlbWVudCA9IGtleTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcFZhbHVlKCdtY1BsYWNlbWVudCcsIHVwZGF0ZWRQbGFjZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5zZXRDbGFzc01hcCgpO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVQb3NpdGlvbmluZ1VwZGF0ZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZVBvc2l0aW9uaW5nVXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tY1BsYWNlbWVudCA9PT0gJ3JpZ2h0JyB8fCB0aGlzLm1jUGxhY2VtZW50ID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9XG4gICAgICAgICAgICAgICAgKHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jbGllbnRIZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvc3RWaWV3LmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpIC8gMjsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICAgICAgY29uc3QgY3VycmVudENvbnRhaW5lciA9IHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5zdHlsZS50b3AgfHwgJzBweCc7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuc3R5bGUudG9wID1cbiAgICAgICAgICAgICAgICBgJHtwYXJzZUludChjdXJyZW50Q29udGFpbmVyLnNwbGl0KCdweCcpWzBdLCAxMCkgKyBwb3MgLSAxfXB4YDtcbiAgICAgICAgICAgIC8vIFRPRE86INC+0LHQvdC+0LLQu9GP0YLRjCDQv9C+0LvQvtC20LXQvdC40LUg0YHRgtGA0LXQu9C60LhcXNGD0LrQsNC30LDRgtC10LvRj1xcXCLQtNGP0YLQu9CwXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICB1cGRhdGVDb21wVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEeW5hbWljVG9vbHRpcCAmJiB2YWx1ZSAmJiB0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudFJlZkxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW51YWxMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy4kdW5zdWJzY3JpYmUubmV4dCgpO1xuICAgICAgICB0aGlzLiR1bnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1Rvb2x0aXBPcGVuICYmIGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlVG91Y2hlbmQoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGluaXRFbGVtZW50UmVmTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tY1RyaWdnZXIgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMubWFudWFsTGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLnNldCgnbW91c2VlbnRlcicsICgpID0+IHRoaXMuc2hvdygpKVxuICAgICAgICAgICAgICAgIC5zZXQoJ21vdXNlbGVhdmUnLCAoKSA9PiB0aGlzLmhpZGUoKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgobGlzdGVuZXIsIGV2ZW50KSA9PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWNUcmlnZ2VyID09PSAnZm9jdXMnKSB7XG4gICAgICAgICAgICB0aGlzLm1hbnVhbExpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5zZXQoJ2ZvY3VzJywgKCkgPT4gdGhpcy5zaG93KCkpXG4gICAgICAgICAgICAgICAgLnNldCgnYmx1cicsICgpID0+IHRoaXMuaGlkZSgpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChsaXN0ZW5lciwgZXZlbnQpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50b29sdGlwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvcnRhbCA9IHRoaXMucG9ydGFsIHx8IG5ldyBDb21wb25lbnRQb3J0YWwoTWNUb29sdGlwQ29tcG9uZW50LCB0aGlzLmhvc3RWaWV3KTtcblxuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcCA9IG92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKS5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAuYWZ0ZXJIaWRkZW4oKVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZGV0YWNoKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNEeW5hbWljVG9vbHRpcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgJ21jVGl0bGUnLFxuICAgICAgICAgICAgICAgICAgICAnbWNQbGFjZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAnbWNUcmlnZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgJ21jVG9vbHRpcERpc2FibGVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ21jTW91c2VFbnRlckRlbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jTW91c2VMZWF2ZURlbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ21jVG9vbHRpcENsYXNzJ1xuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4gdGhpcy51cGRhdGVDb21wVmFsdWUocHJvcGVydHksIHRoaXNbIHByb3BlcnR5IF0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAubWNWaXNpYmxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuJHVuc3Vic2NyaWJlKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGUgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tY1Zpc2libGVDaGFuZ2UuZW1pdChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNUb29sdGlwT3BlbiA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgdG9vbHRpcC4gKi9cbiAgICB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHRoaXMuZ2V0T3JpZ2luKCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpO1xuXG4gICAgICAgIHBvc2l0aW9uLndpdGhQb3NpdGlvbnMoW1xuICAgICAgICAgICAgeyAuLi5vcmlnaW4ubWFpbiwgLi4ub3ZlcmxheS5tYWluIH0sXG4gICAgICAgICAgICB7IC4uLm9yaWdpbi5mYWxsYmFjaywgLi4ub3ZlcmxheS5mYWxsYmFjayB9XG4gICAgICAgIF0pO1xuXG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLmFwcGx5KCk7XG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9yaWdpbiBwb3NpdGlvbiBhbmQgYSBmYWxsYmFjayBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgdXNlcidzIHBvc2l0aW9uIHByZWZlcmVuY2UuXG4gICAgICogVGhlIGZhbGxiYWNrIHBvc2l0aW9uIGlzIHRoZSBpbnZlcnNlIG9mIHRoZSBvcmlnaW4gKGUuZy4gYCdiZWxvdycgLT4gJ2Fib3ZlJ2ApLlxuICAgICAqL1xuICAgIGdldE9yaWdpbigpOiB7bWFpbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uOyBmYWxsYmFjazogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9ufSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5tY1BsYWNlbWVudDtcbiAgICAgICAgY29uc3QgaXNMdHIgPSAhdGhpcy5kaXJlY3Rpb24gfHwgdGhpcy5kaXJlY3Rpb24udmFsdWUgPT09ICdsdHInO1xuICAgICAgICBsZXQgb3JpZ2luUG9zaXRpb246IE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbjtcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09ICd0b3AnIHx8IHBvc2l0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgb3JpZ2luUG9zaXRpb24gPSB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiBwb3NpdGlvbiA9PT0gJ3RvcCcgPyAndG9wJyA6ICdib3R0b20nIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ3RvcCcgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG9yaWdpblBvc2l0aW9uID0geyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnY2VudGVyJyB9O1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdib3R0b20nIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdyaWdodCcgJiYgaXNMdHIpIHx8XG4gICAgICAgICAgICAocG9zaXRpb24gPT09ICdsZWZ0JyAmJiAhaXNMdHIpKSB7XG4gICAgICAgICAgICBvcmlnaW5Qb3NpdGlvbiA9IHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1Rvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmludmVydFBvc2l0aW9uKG9yaWdpblBvc2l0aW9uLm9yaWdpblgsIG9yaWdpblBvc2l0aW9uLm9yaWdpblkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYWluOiBvcmlnaW5Qb3NpdGlvbixcbiAgICAgICAgICAgIGZhbGxiYWNrOiB7IG9yaWdpblg6IHgsIG9yaWdpblk6IHkgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSBvdmVybGF5IHBvc2l0aW9uIGFuZCBhIGZhbGxiYWNrIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcHJlZmVyZW5jZSAqL1xuICAgIGdldE92ZXJsYXlQb3NpdGlvbigpOiB7IG1haW46IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb247IGZhbGxiYWNrOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uIH0ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMubWNQbGFjZW1lbnQ7XG4gICAgICAgIGNvbnN0IGlzTHRyID0gIXRoaXMuZGlyZWN0aW9uIHx8IHRoaXMuZGlyZWN0aW9uLnZhbHVlID09PSAnbHRyJztcbiAgICAgICAgbGV0IG92ZXJsYXlQb3NpdGlvbjogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbjtcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICdib3R0b20nIH07XG4gICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBvdmVybGF5UG9zaXRpb24gPSB7IG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICd0b3AnIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwb3NpdGlvbiA9PT0gJ3RvcCcgfHxcbiAgICAgICAgICAgIChwb3NpdGlvbiA9PT0gJ2xlZnQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmICFpc0x0cikpIHtcbiAgICAgICAgICAgIG92ZXJsYXlQb3NpdGlvbiA9IHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAnYm90dG9tJyB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAncmlnaHQnICYmIGlzTHRyKSB8fFxuICAgICAgICAgICAgKHBvc2l0aW9uID09PSAnbGVmdCcgJiYgIWlzTHRyKSkge1xuICAgICAgICAgICAgb3ZlcmxheVBvc2l0aW9uID0geyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBnZXRNY1Rvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcihwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7eCwgeX0gPSB0aGlzLmludmVydFBvc2l0aW9uKG92ZXJsYXlQb3NpdGlvbi5vdmVybGF5WCwgb3ZlcmxheVBvc2l0aW9uLm92ZXJsYXlZKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWFpbjogb3ZlcmxheVBvc2l0aW9uLFxuICAgICAgICAgICAgZmFsbGJhY2s6IHsgb3ZlcmxheVg6IHgsIG92ZXJsYXlZOiB5IH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKiogSW52ZXJ0cyBhbiBvdmVybGF5IHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgaW52ZXJ0UG9zaXRpb24oeDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsIHk6IFZlcnRpY2FsQ29ubmVjdGlvblBvcykge1xuICAgICAgICBsZXQgbmV3WDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MgPSB4O1xuICAgICAgICBsZXQgbmV3WTogVmVydGljYWxDb25uZWN0aW9uUG9zID0geTtcbiAgICAgICAgaWYgKHRoaXMubWNQbGFjZW1lbnQgPT09ICd0b3AnIHx8IHRoaXMubWNQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBpZiAoeSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICBuZXdZID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHkgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgbmV3WSA9ICd0b3AnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHggPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgbmV3WCA9ICdzdGFydCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHggPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICBuZXdYID0gJ2VuZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB4OiBuZXdYLCB5OiBuZXdZIH07XG4gICAgfVxufVxuIl19
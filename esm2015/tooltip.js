/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata, __param } from 'tslib';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, HostBinding, Inject, InjectionToken, Input, NgZone, Optional, Output, TemplateRef, ViewContainerRef, ViewEncapsulation, NgModule } from '@angular/core';
import { Directionality } from '@ptsecurity/cdk/bidi';
import { coerceBooleanProperty } from '@ptsecurity/cdk/coercion';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { Overlay, ScrollDispatcher, OverlayModule } from '@ptsecurity/cdk/overlay';
import { ComponentPortal } from '@ptsecurity/cdk/portal';
import { fadeAnimation, DEFAULT_4_POSITIONS, POSITION_MAP } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let McTooltipComponent = class McTooltipComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this._prefix = 'mc-tooltip_placement';
        this._positions = [...DEFAULT_4_POSITIONS];
        this._classMap = {};
        this._placement = 'top';
        this._trigger = 'hover';
        this.visibleSource = new BehaviorSubject(false);
        this.$visible = this.visibleSource.asObservable();
        this.mcVisibleChange = new EventEmitter();
        this.mcMouseEnterDelay = 400;
        this.mcMouseLeaveDelay = 0;
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new Subject();
        this._closeOnInteraction = false;
        this.availablePositions = POSITION_MAP;
    }
    get mcTitle() {
        return this._title;
    }
    get mcVisible() {
        return this.visibleSource.value;
    }
    get mcTrigger() {
        return this._trigger;
    }
    get mcPlacement() {
        return this._placement;
    }
    set mcTitle(value) {
        this.isTitleString = !(value instanceof TemplateRef);
        if (this.isTitleString) {
            this._title = value;
        }
    }
    set mcVisible(value) {
        const visible = coerceBooleanProperty(value);
        if (this.visibleSource.value !== visible) {
            this.visibleSource.next(visible);
            this.mcVisibleChange.emit(visible);
        }
    }
    set mcTrigger(value) {
        this._trigger = value;
    }
    set mcPlacement(value) {
        if (value !== this._placement) {
            this._placement = value;
            this._positions.unshift(POSITION_MAP[this.mcPlacement]);
        }
        else if (!value) {
            this._placement = 'top';
        }
    }
    show() {
        if (this.hideTId) {
            clearTimeout(this.hideTId);
        }
        if (!this.isContentEmpty()) {
            if (this.mcTrigger !== 'manual') {
                this._closeOnInteraction = true;
            }
            this.showTId = setTimeout(() => {
                this.mcVisible = true;
                this.mcVisibleChange.emit(true);
                // Mark for check so if any parent component has set the
                // ChangeDetectionStrategy to OnPush it will be checked anyways
                this._markForCheck();
            }, this.mcMouseEnterDelay);
        }
    }
    hide() {
        if (this.showTId) {
            clearTimeout(this.showTId);
        }
        this.hideTId = setTimeout(() => {
            this.mcVisible = false;
            this.mcVisibleChange.emit(false);
            this._onHide.next();
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
        }, this.mcMouseLeaveDelay);
    }
    setClassMap() {
        this._classMap = `${this._prefix}-${this._placement}`;
    }
    isContentEmpty() {
        return this.isTitleString ? (this.mcTitle === '' || !this.mcTitle) : false;
    }
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden() {
        return this._onHide.asObservable();
    }
    _markForCheck() {
        this.cdr.markForCheck();
    }
    _handleBodyInteraction() {
        if (this._closeOnInteraction) {
            this.hide();
        }
    }
};
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], McTooltipComponent.prototype, "mcVisibleChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], McTooltipComponent.prototype, "mcMouseEnterDelay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], McTooltipComponent.prototype, "mcMouseLeaveDelay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McTooltipComponent.prototype, "mcTitle", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTooltipComponent.prototype, "mcVisible", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTooltipComponent.prototype, "mcTrigger", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTooltipComponent.prototype, "mcPlacement", null);
McTooltipComponent = __decorate([
    Component({
        selector: 'mc-tooltip',
        exportAs: 'mcTooltip',
        animations: [fadeAnimation],
        template: "<div class=\"mc-tooltip\" [ngClass]=\"_classMap\" [@fadeAnimation]=\"''+($visible | async)\"><div class=\"mc-tooltip-content\"><div class=\"mc-tooltip-arrow\"></div><div class=\"mc-tooltip-inner\"><ng-container>{{ mcTitle }}</ng-container></div></div></div>",
        preserveWhitespaces: false,
        styles: ["@keyframes mc-progress{from{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;margin:0;padding:0;z-index:1060;max-width:240px;list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:11px}.mc-tooltip_placement-right{padding-left:11px}.mc-tooltip_placement-bottom{padding-top:11px}.mc-tooltip_placement-left{padding-right:11px}.mc-tooltip-inner{padding:8px 16px;text-align:left;text-decoration:none;border-radius:3px;min-height:16px;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:3px;border-width:8px 8px 0;left:50%;margin-left:-8px}.mc-tooltip_placement-right .mc-tooltip-arrow{left:3px;border-width:8px 8px 8px 0;top:16px;margin-top:-8px}.mc-tooltip_placement-left .mc-tooltip-arrow{right:3px;border-width:8px 0 8px 8px;top:16px;margin-top:-8px}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:3px;border-width:0 8px 8px;left:50%;margin-left:-8px}"],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        host: {
            '(body:click)': 'this._handleBodyInteraction()'
        }
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], McTooltipComponent);
const MC_TOOLTIP_SCROLL_STRATEGY = new InjectionToken('mc-tooltip-scroll-strategy');
/** @docs-private */
function MC_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 });
}
/** @docs-private */
const MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_TOOLTIP_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_TOOLTIP_SCROLL_STRATEGY_FACTORY
};
/** Creates an error to be thrown if the user supplied an invalid tooltip position. */
function getMcTooltipInvalidPositionError(position) {
    return Error(`McTooltip position "${position}" is invalid.`);
}
const VIEWPORT_MARGIN = 8;
let McTooltip = class McTooltip {
    constructor(_overlay, elementRef, _ngZone, _scrollDispatcher, hostView, _scrollStrategy, _dir) {
        this._overlay = _overlay;
        this.elementRef = elementRef;
        this._ngZone = _ngZone;
        this._scrollDispatcher = _scrollDispatcher;
        this.hostView = hostView;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this.isTooltipOpen = false;
        this.isDynamicTooltip = false;
        this.parentDisabled = false;
        this._disabled = false;
        this._trigger = 'hover';
        this._placement = 'top';
        this.mcVisibleChange = new EventEmitter();
        this.$unsubscribe = new Subject();
        this.manualListeners = new Map();
        this._destroyed = new Subject();
        this.availablePositions = POSITION_MAP;
    }
    get mcTitle() {
        return this._title;
    }
    set mcTitle(title) {
        this._title = title;
        this.updateCompValue('mcTitle', title);
    }
    set setTitle(title) {
        this.mcTitle = title;
    }
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get mcMouseEnterDelay() {
        return this._mouseEnterDelay;
    }
    set mcMouseEnterDelay(value) {
        this._mouseEnterDelay = value;
        this.updateCompValue('mcMouseEnterDelay', value);
    }
    get mcMouseLeaveDelay() {
        return this._mouseEnterDelay;
    }
    set mcMouseLeaveDelay(value) {
        this._mouseLeaveDelay = value;
        this.updateCompValue('mcMouseLeaveDelay', value);
    }
    get mcVisible() {
        return this._visible;
    }
    set mcVisible(value) {
        this._visible = value;
        this.updateCompValue('mcVisible', value);
    }
    get mcTrigger() {
        return this._trigger;
    }
    set mcTrigger(value) {
        this._trigger = value;
        this.updateCompValue('mcTrigger', value);
    }
    get mcPlacement() {
        return this._placement;
    }
    set mcPlacement(value) {
        if (value) {
            this._placement = value;
            this.updateCompValue('mcPlacement', value);
        }
        else {
            this._placement = 'top';
        }
    }
    get mcTooltipClass() { return this.tooltipClass; }
    set mcTooltipClass(value) {
        this.tooltipClass = value;
        if (this.tooltip) {
            this.tooltip.setClassMap();
        }
    }
    get isOpen() {
        return this.isTooltipOpen;
    }
    get isParentDisabled() {
        return this.parentDisabled;
    }
    /** Create the overlay config and position strategy */
    _createOverlay() {
        if (this._overlayRef) {
            return this._overlayRef;
        }
        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this._overlay.position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.mc-tooltip')
            .withFlexibleDimensions(false)
            .withViewportMargin(VIEWPORT_MARGIN)
            .withPositions([...DEFAULT_4_POSITIONS]);
        const scrollableAncestors = this._scrollDispatcher
            .getAncestorScrollContainers(this.elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe((change) => {
            if (this.tooltip) {
                this.onPositionChange(change);
                if (change.scrollableViewProperties.isOverlayClipped && this.tooltip.mcVisible) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    this._ngZone.run(() => this.hide());
                }
            }
        });
        this._overlayRef = this._overlay.create({
            direction: this._dir,
            positionStrategy: strategy,
            panelClass: 'mc-tooltip-panel',
            scrollStrategy: this._scrollStrategy()
        });
        this._updatePosition();
        this._overlayRef.detachments()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._detach());
        return this._overlayRef;
    }
    _detach() {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
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
            this.tooltip._markForCheck();
        }
        this.handlePositioningUpdate();
    }
    handlePositioningUpdate() {
        if (!this._overlayRef) {
            this._overlayRef = this._createOverlay();
        }
        if (this.mcPlacement === 'right' || this.mcPlacement === 'left') {
            const pos = (this._overlayRef.overlayElement.clientHeight -
                this.hostView.element.nativeElement.clientHeight) / 2; // tslint:disable-line
            const currentContainer = this._overlayRef.overlayElement.style.top || '0px';
            this._overlayRef.overlayElement.style.top =
                `${parseInt(currentContainer.split('px')[0], 10) + pos - 1}px`;
            // TODO: обновлять положение стрелки\указателя\"дятла"
        }
    }
    // tslint:disable-next-line:no-any
    updateCompValue(key, value) {
        if (this.isDynamicTooltip && value) {
            if (this.tooltip) {
                this.tooltip[key] = value;
            }
        }
    }
    ngOnInit() {
        this.initElementRefListeners();
    }
    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        this.manualListeners.forEach((listener, event) => this.elementRef.nativeElement.removeEventListener(event, listener));
        this.manualListeners.clear();
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
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
    show() {
        if (!this.disabled) {
            if (!this.tooltip) {
                const overlayRef = this._createOverlay();
                this._detach();
                this._portal = this._portal || new ComponentPortal(McTooltipComponent, this.hostView);
                this.tooltip = overlayRef.attach(this._portal).instance;
                this.tooltip.afterHidden()
                    .pipe(takeUntil(this._destroyed))
                    .subscribe(() => this._detach());
                this.isDynamicTooltip = true;
                const properties = [
                    'mcTitle',
                    'mcMouseEnterDelay',
                    'mcMouseLeaveDelay',
                    'mcVisible',
                    'mcTrigger',
                    'mcPlacement'
                ];
                properties.forEach((property) => this.updateCompValue(property, this[property]));
                this.tooltip.mcVisibleChange.pipe(takeUntil(this.$unsubscribe), distinctUntilChanged())
                    .subscribe((data) => {
                    this._visible = data;
                    this.mcVisibleChange.emit(data);
                    this.isTooltipOpen = data;
                });
            }
            this._updatePosition();
            this.tooltip.show();
        }
    }
    hide() {
        if (this.tooltip) {
            this.tooltip.hide();
        }
    }
    /** Updates the position of the current tooltip. */
    _updatePosition() {
        if (!this._overlayRef) {
            this._overlayRef = this._createOverlay();
        }
        const position = this._overlayRef.getConfig().positionStrategy;
        const origin = this._getOrigin();
        const overlay = this._getOverlayPosition();
        position.withPositions([
            Object.assign({}, origin.main, overlay.main),
            Object.assign({}, origin.fallback, overlay.fallback)
        ]);
    }
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    _getOrigin() {
        const position = this.mcPlacement;
        const isLtr = !this._dir || this._dir.value === 'ltr';
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
        const { x, y } = this._invertPosition(originPosition.originX, originPosition.originY);
        return {
            main: originPosition,
            fallback: { originX: x, originY: y }
        };
    }
    /** Returns the overlay position and a fallback position based on the user's preference */
    _getOverlayPosition() {
        const position = this.mcPlacement;
        const isLtr = !this._dir || this._dir.value === 'ltr';
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
        const { x, y } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
        return {
            main: overlayPosition,
            fallback: { overlayX: x, overlayY: y }
        };
    }
    /** Inverts an overlay position. */
    _invertPosition(x, y) {
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
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], McTooltip.prototype, "mcVisibleChange", void 0);
__decorate([
    Input('mcTooltip'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTooltip.prototype, "mcTitle", null);
__decorate([
    Input('mcTitle'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTooltip.prototype, "setTitle", null);
__decorate([
    Input('mcTooltipDisabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], McTooltip.prototype, "disabled", null);
__decorate([
    Input('mcMouseEnterDelay'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], McTooltip.prototype, "mcMouseEnterDelay", null);
__decorate([
    Input('mcMouseLeaveDelay'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], McTooltip.prototype, "mcMouseLeaveDelay", null);
__decorate([
    Input('mcVisible'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], McTooltip.prototype, "mcVisible", null);
__decorate([
    Input('mcTrigger'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTooltip.prototype, "mcTrigger", null);
__decorate([
    Input('mcPlacement'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], McTooltip.prototype, "mcPlacement", null);
__decorate([
    Input('mсTooltipClass'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McTooltip.prototype, "mcTooltipClass", null);
__decorate([
    HostBinding('class.mc-tooltip-open'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], McTooltip.prototype, "isOpen", null);
__decorate([
    HostBinding('class.disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], McTooltip.prototype, "isParentDisabled", null);
McTooltip = __decorate([
    Directive({
        selector: '[mcTooltip], mcTooltip',
        exportAs: 'mcTooltip',
        host: {
            '(keydown)': 'handleKeydown($event)',
            '(touchend)': 'handleTouchend()'
        }
    }),
    __param(5, Inject(MC_TOOLTIP_SCROLL_STRATEGY)),
    __param(6, Optional()),
    __metadata("design:paramtypes", [Overlay,
        ElementRef,
        NgZone,
        ScrollDispatcher,
        ViewContainerRef, Object, Directionality])
], McTooltip);

let McToolTipModule = class McToolTipModule {
};
McToolTipModule = __decorate([
    NgModule({
        declarations: [McTooltipComponent, McTooltip],
        exports: [McTooltipComponent, McTooltip],
        imports: [BrowserAnimationsModule, CommonModule, OverlayModule],
        providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
        entryComponents: [McTooltipComponent]
    })
], McToolTipModule);

/**
 * Generated bundle index. Do not edit.
 */

export { McToolTipModule, McTooltipComponent, MC_TOOLTIP_SCROLL_STRATEGY, MC_TOOLTIP_SCROLL_STRATEGY_FACTORY, MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, getMcTooltipInvalidPositionError, McTooltip };
//# sourceMappingURL=tooltip.js.map

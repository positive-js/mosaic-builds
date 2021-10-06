import * as i2 from '@angular/cdk/overlay';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Output, Input, InjectionToken, Directive, Inject, Optional, NgModule } from '@angular/core';
import * as i3 from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentPortal } from '@angular/cdk/portal';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { DEFAULT_4_POSITIONS, POSITION_MAP, fadeAnimation } from '@ptsecurity/mosaic/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

// tslint:disable-next-line:naming-convention
const ArrowPlacements = {
    Top: 'top',
    Center: 'center',
    Bottom: 'bottom',
    Right: 'right',
    Left: 'left'
};
class McTooltipComponent {
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
/** @nocollapse */ McTooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTooltipComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTooltipComponent, selector: "mc-tooltip-component", inputs: { mcMouseEnterDelay: "mcMouseEnterDelay", mcMouseLeaveDelay: "mcMouseLeaveDelay", mcTitle: "mcTitle", mcTrigger: "mcTrigger", mcPlacement: "mcPlacement", mcTooltipClass: "mcTooltipClass", mcVisible: "mcVisible", mcArrowPlacement: "mcArrowPlacement" }, outputs: { mcVisibleChange: "mcVisibleChange" }, host: { listeners: { "body:click": "this.handleBodyInteraction()" } }, ngImport: i0, template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@fadeAnimation]=\"''+($visible | async)\">\n    <div class=\"mc-tooltip-content\">\n        <div class=\"mc-tooltip-arrow\"></div>\n        <div class=\"mc-tooltip-inner\">\n            <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"mcTitle\"></ng-container>\n            <ng-container *ngIf=\"isNonEmptyString\">\n                <div [innerHTML]=\"mcTitle\"></div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n", styles: [".mc-tooltip{display:block;box-sizing:border-box;visibility:visible;position:relative;z-index:1060;max-width:240px;max-width:var(--mc-tooltip-size-max-width, 240px);list-style:none;white-space:pre-line}.mc-tooltip_placement-top{padding-bottom:9px;padding-bottom:var(--mc-tooltip-size-distance, 9px)}.mc-tooltip_placement-right{padding-left:9px;padding-left:var(--mc-tooltip-size-distance, 9px)}.mc-tooltip_placement-bottom{padding-top:9px;padding-top:var(--mc-tooltip-size-distance, 9px)}.mc-tooltip_placement-left{padding-right:9px;padding-right:var(--mc-tooltip-size-distance, 9px)}.mc-tooltip-inner{padding:8px 16px;padding:var(--mc-tooltip-size-padding, 8px 16px);text-align:left;text-decoration:none;border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;vertical-align:center}.mc-tooltip-arrow{position:absolute;width:12px;width:var(--mc-tooltip-size-arrow-size, 12px);height:12px;height:var(--mc-tooltip-size-arrow-size, 12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip-arrow{bottom:calc(9px - 5px);bottom:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));left:50%;margin-left:calc(-1 * 5px);margin-left:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-right .mc-tooltip-arrow{left:calc(9px - 5px);left:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));top:16px;margin-top:calc(-1 * 5px);margin-top:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-left .mc-tooltip-arrow{right:calc(9px - 5px);right:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));top:16px;margin-top:calc(-1 * 5px);margin-top:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}.mc-tooltip_placement-bottom .mc-tooltip-arrow{top:calc(9px - 5px);top:calc(var(--mc-tooltip-size-distance, 9px) - var(--mc-tooltip-size-arrow-width, 5px));left:50%;margin-left:calc(-1 * 5px);margin-left:calc(-1 * var(--mc-tooltip-size-arrow-width, 5px))}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "async": i1.AsyncPipe }, animations: [fadeAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTooltipComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tooltip-component',
                    animations: [fadeAnimation],
                    templateUrl: './tooltip.component.html',
                    styleUrls: ['./tooltip.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '(body:click)': 'this.handleBodyInteraction()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { mcVisibleChange: [{
                type: Output
            }], mcMouseEnterDelay: [{
                type: Input
            }], mcMouseLeaveDelay: [{
                type: Input
            }], mcTitle: [{
                type: Input
            }], mcTrigger: [{
                type: Input
            }], mcPlacement: [{
                type: Input
            }], mcTooltipClass: [{
                type: Input
            }], mcVisible: [{
                type: Input
            }], mcArrowPlacement: [{
                type: Input
            }] } });
const MC_TOOLTIP_SCROLL_STRATEGY = new InjectionToken('mc-tooltip-scroll-strategy');
/** @docs-private */
function mcTooltipScrollStrategyFactory(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 });
}
/** @docs-private */
const MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_TOOLTIP_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcTooltipScrollStrategyFactory
};
/** Creates an error to be thrown if the user supplied an invalid tooltip position. */
function getMcTooltipInvalidPositionError(position) {
    return Error(`McTooltip position "${position}" is invalid.`);
}
const VIEWPORT_MARGIN = 8;
class McTooltip {
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
        if (this.mcTrigger.includes('hover')) {
            this.manualListeners
                .set('mouseenter', () => this.show())
                .set('mouseleave', () => this.hide())
                .forEach((listener, event) => this.elementRef.nativeElement.addEventListener(event, listener));
        }
        if (this.mcTrigger.includes('focus')) {
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
/** @nocollapse */ McTooltip.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTooltip, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTooltip.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTooltip, selector: "[mcTooltip], [attribute^=\"mcTooltip\"]", inputs: { mcTitle: ["mcTooltip", "mcTitle"], setTitle: ["mcTitle", "setTitle"], disabled: ["mcTooltipDisabled", "disabled"], mcMouseEnterDelay: "mcMouseEnterDelay", mcMouseLeaveDelay: "mcMouseLeaveDelay", mcTrigger: "mcTrigger", mcPlacement: "mcPlacement", mcTooltipClass: "mcTooltipClass", mcVisible: "mcVisible", mcArrowPlacement: "mcArrowPlacement" }, outputs: { mcVisibleChange: "mcVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip-open": "isTooltipOpen", "class.disabled": "parentDisabled" } }, exportAs: ["mcTooltip"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTooltip], [attribute^="mcTooltip"]',
                    exportAs: 'mcTooltip',
                    host: {
                        '[class.mc-tooltip-open]': 'isTooltipOpen',
                        '[class.disabled]': 'parentDisabled',
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i2.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { mcVisibleChange: [{
                type: Output
            }], mcTitle: [{
                type: Input,
                args: ['mcTooltip']
            }], setTitle: [{
                type: Input,
                args: ['mcTitle']
            }], disabled: [{
                type: Input,
                args: ['mcTooltipDisabled']
            }], mcMouseEnterDelay: [{
                type: Input
            }], mcMouseLeaveDelay: [{
                type: Input
            }], mcTrigger: [{
                type: Input
            }], mcPlacement: [{
                type: Input
            }], mcTooltipClass: [{
                type: Input
            }], mcVisible: [{
                type: Input
            }], mcArrowPlacement: [{
                type: Input
            }] } });

class McToolTipModule {
}
/** @nocollapse */ McToolTipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McToolTipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McToolTipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McToolTipModule, declarations: [McTooltipComponent, McTooltip], imports: [CommonModule, OverlayModule], exports: [McTooltipComponent, McTooltip] });
/** @nocollapse */ McToolTipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McToolTipModule, providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[CommonModule, OverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McToolTipModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [McTooltipComponent, McTooltip],
                    exports: [McTooltipComponent, McTooltip],
                    imports: [CommonModule, OverlayModule],
                    providers: [MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McTooltipComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ArrowPlacements, MC_TOOLTIP_SCROLL_STRATEGY, MC_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, McToolTipModule, McTooltip, McTooltipComponent, getMcTooltipInvalidPositionError, mcTooltipScrollStrategyFactory };
//# sourceMappingURL=ptsecurity-mosaic-tooltip.js.map

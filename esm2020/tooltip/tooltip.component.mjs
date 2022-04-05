import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { McPopUp, McPopUpTrigger, PopUpPlacements, PopUpTriggers, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { merge } from 'rxjs';
import { mcTooltipAnimations } from './tooltip.animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "@angular/cdk/bidi";
export var TooltipModifier;
(function (TooltipModifier) {
    TooltipModifier["Default"] = "default";
    TooltipModifier["Warning"] = "warning";
    TooltipModifier["Extended"] = "extended";
})(TooltipModifier || (TooltipModifier = {}));
export const MC_TOOLTIP_OPEN_TIME = new InjectionToken('mc-tooltip-open-time');
/** @docs-private */
export const MC_TOOLTIP_OPEN_TIME_PROVIDER = {
    provide: MC_TOOLTIP_OPEN_TIME,
    useValue: { value: 0 }
};
export const MIN_TIME_FOR_DELAY = 2000;
export class McTooltipComponent extends McPopUp {
    constructor(changeDetectorRef, openTime) {
        super(changeDetectorRef);
        this.openTime = openTime;
        this.prefix = 'mc-tooltip';
    }
    show(delay) {
        if (!this.content) {
            return;
        }
        // tslint:disable-next-line:no-magic-numbers
        super.show(Date.now() - this.openTime.value < MIN_TIME_FOR_DELAY ? 0 : delay);
        this.openTime.value = Date.now();
    }
    updateClassMap(placement, customClass, { modifier }) {
        const classMap = {
            [`${this.prefix}_${modifier}`]: true
        };
        super.updateClassMap(placement, customClass, classMap);
    }
}
/** @nocollapse */ /** @nocollapse */ McTooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: MC_TOOLTIP_OPEN_TIME }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McTooltipComponent, selector: "mc-tooltip-component", providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-tooltip__inner\">\n        <div class=\"mc-tooltip__arrow\"></div>\n\n        <div class=\"mc-tooltip__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n        <div class=\"mc-tooltip__content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n", styles: [".mc-tooltip__inner{border-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip{box-sizing:border-box;border-radius:var(--mc-tooltip-size-border-radius, 3px);z-index:1060;white-space:pre-line}.mc-tooltip.mc-tooltip_placement-top,.mc-tooltip.mc-tooltip_placement-top-left,.mc-tooltip.mc-tooltip_placement-top-right{margin-bottom:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-right,.mc-tooltip.mc-tooltip_placement-right-top,.mc-tooltip.mc-tooltip_placement-right-bottom{margin-left:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-bottom,.mc-tooltip.mc-tooltip_placement-bottom-left,.mc-tooltip.mc-tooltip_placement-bottom-right{margin-top:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-left,.mc-tooltip.mc-tooltip_placement-left-top,.mc-tooltip.mc-tooltip_placement-left-bottom{margin-right:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_default,.mc-tooltip.mc-tooltip_warning{max-width:var(--mc-tooltip-size-max-width, 300px)}.mc-tooltip.mc-tooltip_default .mc-tooltip__inner,.mc-tooltip.mc-tooltip_warning .mc-tooltip__inner{padding:var(--mc-tooltip-size-padding, 8px 16px)}.mc-tooltip.mc-tooltip_extended{max-height:var(--mc-extended-tooltip-size-max-height, 480px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__header{height:var(--mc-extended-tooltip-header-size-height, 40px);padding:var(--mc-extended-tooltip-header-size-padding, 10px 16px);box-sizing:border-box;border-top-left-radius:var(--mc-tooltip-size-border-radius, 3px);border-top-right-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__content{padding:var(--mc-extended-tooltip-size-padding, 8px 16px)}.mc-tooltip__arrow{position:absolute;width:var(--mc-tooltip-size-arrow-size, 12px);height:var(--mc-tooltip-size-arrow-size, 12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip__arrow{bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-top-left .mc-tooltip__arrow{bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-top-right .mc-tooltip__arrow{bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right .mc-tooltip__arrow{left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-right-top .mc-tooltip__arrow{left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right-bottom .mc-tooltip__arrow{left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left .mc-tooltip__arrow{right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-left-top .mc-tooltip__arrow{right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left-bottom .mc-tooltip__arrow{right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom .mc-tooltip__arrow{top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-bottom-left .mc-tooltip__arrow{top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom-right .mc-tooltip__arrow{top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcTooltipAnimations.tooltipState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tooltip-component', animations: [mcTooltipAnimations.tooltipState], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER], template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-tooltip__inner\">\n        <div class=\"mc-tooltip__arrow\"></div>\n\n        <div class=\"mc-tooltip__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n        <div class=\"mc-tooltip__content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n", styles: [".mc-tooltip__inner{border-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip{box-sizing:border-box;border-radius:var(--mc-tooltip-size-border-radius, 3px);z-index:1060;white-space:pre-line}.mc-tooltip.mc-tooltip_placement-top,.mc-tooltip.mc-tooltip_placement-top-left,.mc-tooltip.mc-tooltip_placement-top-right{margin-bottom:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-right,.mc-tooltip.mc-tooltip_placement-right-top,.mc-tooltip.mc-tooltip_placement-right-bottom{margin-left:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-bottom,.mc-tooltip.mc-tooltip_placement-bottom-left,.mc-tooltip.mc-tooltip_placement-bottom-right{margin-top:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-left,.mc-tooltip.mc-tooltip_placement-left-top,.mc-tooltip.mc-tooltip_placement-left-bottom{margin-right:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_default,.mc-tooltip.mc-tooltip_warning{max-width:var(--mc-tooltip-size-max-width, 300px)}.mc-tooltip.mc-tooltip_default .mc-tooltip__inner,.mc-tooltip.mc-tooltip_warning .mc-tooltip__inner{padding:var(--mc-tooltip-size-padding, 8px 16px)}.mc-tooltip.mc-tooltip_extended{max-height:var(--mc-extended-tooltip-size-max-height, 480px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__header{height:var(--mc-extended-tooltip-header-size-height, 40px);padding:var(--mc-extended-tooltip-header-size-padding, 10px 16px);box-sizing:border-box;border-top-left-radius:var(--mc-tooltip-size-border-radius, 3px);border-top-right-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__content{padding:var(--mc-extended-tooltip-size-padding, 8px 16px)}.mc-tooltip__arrow{position:absolute;width:var(--mc-tooltip-size-arrow-size, 12px);height:var(--mc-tooltip-size-arrow-size, 12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip__arrow{bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-top-left .mc-tooltip__arrow{bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-top-right .mc-tooltip__arrow{bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right .mc-tooltip__arrow{left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-right-top .mc-tooltip__arrow{left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right-bottom .mc-tooltip__arrow{left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left .mc-tooltip__arrow{right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-left-top .mc-tooltip__arrow{right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left-bottom .mc-tooltip__arrow{right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom .mc-tooltip__arrow{top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-bottom-left .mc-tooltip__arrow{top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom-right .mc-tooltip__arrow{top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TOOLTIP_OPEN_TIME]
                }] }]; } });
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
export class McTooltipTrigger extends McPopUpTrigger {
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this.enterDelay = 400;
        this.leaveDelay = 0;
        this._trigger = `${PopUpTriggers.Hover}, ${PopUpTriggers.Focus}`;
        this.placementChange = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this.originSelector = '.mc-tooltip';
        this.overlayConfig = {
            panelClass: 'mc-tooltip-panel'
        };
        this.modifier = TooltipModifier.Default;
    }
    get tooltipVisible() {
        return this.visible;
    }
    set tooltipVisible(value) {
        super.updateVisible(value);
    }
    get tooltipPlacement() {
        return this.placement;
    }
    set tooltipPlacement(value) {
        super.updatePlacement(value);
    }
    get tooltipPlacementPriority() {
        return this.placementPriority;
    }
    set tooltipPlacementPriority(value) {
        super.updatePlacementPriority(value);
    }
    get content() {
        return this._content;
    }
    set content(content) {
        this._content = content;
        this.updateData();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get trigger() {
        return this._trigger;
    }
    set trigger(value) {
        if (value) {
            this._trigger = value;
        }
        else {
            this._trigger = `${PopUpTriggers.Hover}, ${PopUpTriggers.Focus}`;
        }
        this.initListeners();
    }
    get customClass() {
        return this._customClass;
    }
    set customClass(value) {
        if (value) {
            this._customClass = value;
            this.updateClassMap();
        }
        else {
            this._customClass = '';
        }
    }
    updateData() {
        if (!this.instance) {
            return;
        }
        this.instance.content = this.content;
        this.instance.detectChanges();
    }
    closingActions() {
        return merge(this.overlayRef.outsidePointerEvents(), this.overlayRef.detachments());
    }
    getOverlayHandleComponentType() {
        return McTooltipComponent;
    }
    updateClassMap(newPlacement = this.placement) {
        if (!this.instance) {
            return;
        }
        this.instance.updateClassMap(POSITION_TO_CSS_MAP[newPlacement], this.customClass, { modifier: this.modifier });
        this.instance.markForCheck();
    }
}
/** @nocollapse */ /** @nocollapse */ McTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McTooltipTrigger, selector: "[mcTooltip]", inputs: { tooltipVisible: ["mcVisible", "tooltipVisible"], tooltipPlacement: ["mcPlacement", "tooltipPlacement"], tooltipPlacementPriority: ["mcPlacementPriority", "tooltipPlacementPriority"], content: ["mcTooltip", "content"], disabled: ["mcTooltipDisabled", "disabled"], enterDelay: ["mcEnterDelay", "enterDelay"], leaveDelay: ["mcLeaveDelay", "leaveDelay"], trigger: ["mcTrigger", "trigger"], customClass: ["mcTooltipClass", "customClass"] }, outputs: { placementChange: "mcPlacementChange", visibleChange: "mcVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTooltipTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTooltip]',
                    exportAs: 'mcTooltip',
                    host: {
                        '[class.mc-tooltip_open]': 'isOpen',
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i2.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { tooltipVisible: [{
                type: Input,
                args: ['mcVisible']
            }], tooltipPlacement: [{
                type: Input,
                args: ['mcPlacement']
            }], tooltipPlacementPriority: [{
                type: Input,
                args: ['mcPlacementPriority']
            }], content: [{
                type: Input,
                args: ['mcTooltip']
            }], disabled: [{
                type: Input,
                args: ['mcTooltipDisabled']
            }], enterDelay: [{
                type: Input,
                args: ['mcEnterDelay']
            }], leaveDelay: [{
                type: Input,
                args: ['mcLeaveDelay']
            }], trigger: [{
                type: Input,
                args: ['mcTrigger']
            }], customClass: [{
                type: Input,
                args: ['mcTooltipClass']
            }], placementChange: [{
                type: Output,
                args: ['mcPlacementChange']
            }], visibleChange: [{
                type: Output,
                args: ['mcVisibleChange']
            }] } });
export class McWarningTooltipTrigger extends McTooltipTrigger {
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this.modifier = TooltipModifier.Warning;
    }
    get content() {
        return this._content;
    }
    set content(content) {
        this._content = content;
        this.updateData();
    }
}
/** @nocollapse */ /** @nocollapse */ McWarningTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McWarningTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McWarningTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McWarningTooltipTrigger, selector: "[mcWarningTooltip]", inputs: { content: ["mcWarningTooltip", "content"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcWarningTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McWarningTooltipTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcWarningTooltip]',
                    exportAs: 'mcWarningTooltip',
                    host: {
                        '[class.mc-tooltip_open]': 'isOpen',
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i2.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { content: [{
                type: Input,
                args: ['mcWarningTooltip']
            }] } });
export class McExtendedTooltipTrigger extends McTooltipTrigger {
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this.modifier = TooltipModifier.Extended;
    }
    get content() {
        return this._content;
    }
    set content(content) {
        this._content = content;
        this.updateData();
    }
    get header() {
        return this._header;
    }
    set header(header) {
        this._header = header;
        this.updateData();
    }
    updateData() {
        if (!this.instance) {
            return;
        }
        super.updateData();
        this.instance.header = this.header;
    }
}
/** @nocollapse */ /** @nocollapse */ McExtendedTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McExtendedTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McExtendedTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McExtendedTooltipTrigger, selector: "[mcExtendedTooltip]", inputs: { content: ["mcExtendedTooltip", "content"], header: ["mcTooltipHeader", "header"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcExtendedTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McExtendedTooltipTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcExtendedTooltip]',
                    exportAs: 'mcExtendedTooltip',
                    host: {
                        '[class.mc-tooltip_open]': 'isOpen',
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i2.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TOOLTIP_SCROLL_STRATEGY]
                }] }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { content: [{
                type: Input,
                args: ['mcExtendedTooltip']
            }], header: [{
                type: Input,
                args: ['mcTooltipHeader']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxPQUFPLEVBQ1AsZ0JBQWdCLEVBRW5CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUdOLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBRzNELE1BQU0sQ0FBTixJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDdkIsc0NBQW1CLENBQUE7SUFDbkIsc0NBQW1CLENBQUE7SUFDbkIsd0NBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUpXLGVBQWUsS0FBZixlQUFlLFFBSTFCO0FBRUQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxjQUFjLENBQXVCLHNCQUFz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ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgT3ZlcmxheSxcbiAgICBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE92ZXJsYXlDb25maWcgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheS9vdmVybGF5LWNvbmZpZyc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVHlwZSxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNQb3BVcCwgTWNQb3BVcFRyaWdnZXIsIFBvcFVwUGxhY2VtZW50cywgUG9wVXBUcmlnZ2VycywgUE9TSVRJT05fVE9fQ1NTX01BUCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IG1jVG9vbHRpcEFuaW1hdGlvbnMgfSBmcm9tICcuL3Rvb2x0aXAuYW5pbWF0aW9ucyc7XG5cblxuZXhwb3J0IGVudW0gVG9vbHRpcE1vZGlmaWVyIHtcbiAgICBEZWZhdWx0ID0gJ2RlZmF1bHQnLFxuICAgIFdhcm5pbmcgPSAnd2FybmluZycsXG4gICAgRXh0ZW5kZWQgPSAnZXh0ZW5kZWQnXG59XG5cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX09QRU5fVElNRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oJ21jLXRvb2x0aXAtb3Blbi10aW1lJyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9PUEVOX1RJTUVfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogTUNfVE9PTFRJUF9PUEVOX1RJTUUsXG4gICAgdXNlVmFsdWU6IHsgdmFsdWU6IDAgfVxufTtcblxuZXhwb3J0IGNvbnN0IE1JTl9USU1FX0ZPUl9ERUxBWSA9IDIwMDA7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10b29sdGlwLWNvbXBvbmVudCcsXG4gICAgYW5pbWF0aW9uczogW21jVG9vbHRpcEFuaW1hdGlvbnMudG9vbHRpcFN0YXRlXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdG9vbHRpcC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9vbHRpcC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtNQ19UT09MVElQX09QRU5fVElNRV9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgTWNUb29sdGlwQ29tcG9uZW50IGV4dGVuZHMgTWNQb3BVcCB7XG4gICAgcHJlZml4ID0gJ21jLXRvb2x0aXAnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX09QRU5fVElNRSkgcHJpdmF0ZSBvcGVuVGltZVxuICAgICkge1xuICAgICAgICBzdXBlcihjaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgfVxuXG4gICAgc2hvdyhkZWxheTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBzdXBlci5zaG93KERhdGUubm93KCkgLSB0aGlzLm9wZW5UaW1lLnZhbHVlIDwgTUlOX1RJTUVfRk9SX0RFTEFZID8gMCA6IGRlbGF5KTtcblxuICAgICAgICB0aGlzLm9wZW5UaW1lLnZhbHVlID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDbGFzc01hcChwbGFjZW1lbnQ6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZywgeyBtb2RpZmllciB9KSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTWFwID0ge1xuICAgICAgICAgICAgW2Ake3RoaXMucHJlZml4fV8ke21vZGlmaWVyfWBdOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIudXBkYXRlQ2xhc3NNYXAocGxhY2VtZW50LCBjdXN0b21DbGFzcywgY2xhc3NNYXApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy10b29sdGlwLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jVG9vbHRpcFNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7IHNjcm9sbFRocm90dGxlOiAyMCB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1Rvb2x0aXBTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVG9vbHRpcF0nLFxuICAgIGV4cG9ydEFzOiAnbWNUb29sdGlwJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdG9vbHRpcF9vcGVuXSc6ICdpc09wZW4nLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVG9vbHRpcFRyaWdnZXIgZXh0ZW5kcyBNY1BvcFVwVHJpZ2dlcjxNY1Rvb2x0aXBDb21wb25lbnQ+IHtcbiAgICBASW5wdXQoJ21jVmlzaWJsZScpXG4gICAgZ2V0IHRvb2x0aXBWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlO1xuICAgIH1cblxuICAgIHNldCB0b29sdGlwVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBzdXBlci51cGRhdGVWaXNpYmxlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jUGxhY2VtZW50JylcbiAgICBnZXQgdG9vbHRpcFBsYWNlbWVudCgpOiBQb3BVcFBsYWNlbWVudHMge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IHRvb2x0aXBQbGFjZW1lbnQodmFsdWU6IFBvcFVwUGxhY2VtZW50cykge1xuICAgICAgICBzdXBlci51cGRhdGVQbGFjZW1lbnQodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNQbGFjZW1lbnRQcmlvcml0eScpXG4gICAgZ2V0IHRvb2x0aXBQbGFjZW1lbnRQcmlvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhY2VtZW50UHJpb3JpdHk7XG4gICAgfVxuXG4gICAgc2V0IHRvb2x0aXBQbGFjZW1lbnRQcmlvcml0eSh2YWx1ZSkge1xuICAgICAgICBzdXBlci51cGRhdGVQbGFjZW1lbnRQcmlvcml0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY1Rvb2x0aXAnKVxuICAgIGdldCBjb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudChjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY0VudGVyRGVsYXknKSBlbnRlckRlbGF5ID0gNDAwO1xuICAgIEBJbnB1dCgnbWNMZWF2ZURlbGF5JykgbGVhdmVEZWxheSA9IDA7XG5cbiAgICBASW5wdXQoJ21jVHJpZ2dlcicpXG4gICAgZ2V0IHRyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IHRyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIgPSBgJHtQb3BVcFRyaWdnZXJzLkhvdmVyfSwgJHtQb3BVcFRyaWdnZXJzLkZvY3VzfWA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90cmlnZ2VyID0gYCR7UG9wVXBUcmlnZ2Vycy5Ib3Zlcn0sICR7UG9wVXBUcmlnZ2Vycy5Gb2N1c31gO1xuXG4gICAgQElucHV0KCdtY1Rvb2x0aXBDbGFzcycpXG4gICAgZ2V0IGN1c3RvbUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21DbGFzcztcbiAgICB9XG5cbiAgICBzZXQgY3VzdG9tQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbUNsYXNzID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbUNsYXNzID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAT3V0cHV0KCdtY1BsYWNlbWVudENoYW5nZScpIHBsYWNlbWVudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoJ21jVmlzaWJsZUNoYW5nZScpIHZpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcm90ZWN0ZWQgb3JpZ2luU2VsZWN0b3IgPSAnLm1jLXRvb2x0aXAnO1xuXG4gICAgcHJvdGVjdGVkIG92ZXJsYXlDb25maWc6IE92ZXJsYXlDb25maWcgPSB7XG4gICAgICAgIHBhbmVsQ2xhc3M6ICdtYy10b29sdGlwLXBhbmVsJ1xuICAgIH07XG5cbiAgICBwcm90ZWN0ZWQgbW9kaWZpZXI6IFRvb2x0aXBNb2RpZmllciA9IFRvb2x0aXBNb2RpZmllci5EZWZhdWx0O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgc3VwZXIob3ZlcmxheSwgZWxlbWVudFJlZiwgbmdab25lLCBzY3JvbGxEaXNwYXRjaGVyLCBob3N0Vmlldywgc2Nyb2xsU3RyYXRlZ3ksIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgY2xvc2luZ0FjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKSxcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEuZGV0YWNobWVudHMoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldE92ZXJsYXlIYW5kbGVDb21wb25lbnRUeXBlKCk6IFR5cGU8TWNUb29sdGlwQ29tcG9uZW50PiB7XG4gICAgICAgIHJldHVybiBNY1Rvb2x0aXBDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xhc3NNYXAobmV3UGxhY2VtZW50OiBzdHJpbmcgPSB0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZS51cGRhdGVDbGFzc01hcChcbiAgICAgICAgICAgIFBPU0lUSU9OX1RPX0NTU19NQVBbbmV3UGxhY2VtZW50XSxcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQ2xhc3MsXG4gICAgICAgICAgICB7IG1vZGlmaWVyOiB0aGlzLm1vZGlmaWVyIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNXYXJuaW5nVG9vbHRpcF0nLFxuICAgIGV4cG9ydEFzOiAnbWNXYXJuaW5nVG9vbHRpcCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXRvb2x0aXBfb3Blbl0nOiAnaXNPcGVuJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1dhcm5pbmdUb29sdGlwVHJpZ2dlciBleHRlbmRzIE1jVG9vbHRpcFRyaWdnZXIge1xuICAgIEBJbnB1dCgnbWNXYXJuaW5nVG9vbHRpcCcpXG4gICAgZ2V0IGNvbnRlbnQoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH1cblxuICAgIHNldCBjb250ZW50KGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1vZGlmaWVyOiBUb29sdGlwTW9kaWZpZXIgPSBUb29sdGlwTW9kaWZpZXIuV2FybmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNFeHRlbmRlZFRvb2x0aXBdJyxcbiAgICBleHBvcnRBczogJ21jRXh0ZW5kZWRUb29sdGlwJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdG9vbHRpcF9vcGVuXSc6ICdpc09wZW4nLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRXh0ZW5kZWRUb29sdGlwVHJpZ2dlciBleHRlbmRzIE1jVG9vbHRpcFRyaWdnZXIge1xuICAgIEBJbnB1dCgnbWNFeHRlbmRlZFRvb2x0aXAnKVxuICAgIGdldCBjb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudChjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwSGVhZGVyJylcbiAgICBnZXQgaGVhZGVyKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyO1xuICAgIH1cblxuICAgIHNldCBoZWFkZXIoaGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IGhlYWRlcjtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwcm90ZWN0ZWQgbW9kaWZpZXI6IFRvb2x0aXBNb2RpZmllciA9IFRvb2x0aXBNb2RpZmllci5FeHRlbmRlZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgeyByZXR1cm47IH1cblxuICAgICAgICBzdXBlci51cGRhdGVEYXRhKCk7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UuaGVhZGVyID0gdGhpcy5oZWFkZXI7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1jLXRvb2x0aXBcIlxuICAgICBbbmdDbGFzc109XCJjbGFzc01hcFwiXG4gICAgIFtAc3RhdGVdPVwidmlzaWJpbGl0eVwiXG4gICAgIChAc3RhdGUuc3RhcnQpPVwiYW5pbWF0aW9uU3RhcnQoKVwiXG4gICAgIChAc3RhdGUuZG9uZSk9XCJhbmltYXRpb25Eb25lKCRldmVudClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy10b29sdGlwX19pbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdG9vbHRpcF9fYXJyb3dcIj48L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdG9vbHRpcF9faGVhZGVyXCIgKm5nSWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGhlYWRlcilcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KGhlYWRlcilcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNUZW1wbGF0ZVJlZihoZWFkZXIpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBoZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXRvb2x0aXBfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShjb250ZW50KVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBjb250ZW50IH19PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==
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
/** @nocollapse */ /** @nocollapse */ McTooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: MC_TOOLTIP_OPEN_TIME }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.0", type: McTooltipComponent, selector: "mc-tooltip-component", providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-tooltip__inner\">\n        <div class=\"mc-tooltip__arrow\"></div>\n\n        <div class=\"mc-tooltip__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n        <div class=\"mc-tooltip__content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n", styles: [".mc-tooltip__inner{border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip{box-sizing:border-box;border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px);z-index:1060;white-space:pre-line}.mc-tooltip.mc-tooltip_placement-top,.mc-tooltip.mc-tooltip_placement-top-left,.mc-tooltip.mc-tooltip_placement-top-right{margin-bottom:9px;margin-bottom:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-right,.mc-tooltip.mc-tooltip_placement-right-top,.mc-tooltip.mc-tooltip_placement-right-bottom{margin-left:9px;margin-left:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-bottom,.mc-tooltip.mc-tooltip_placement-bottom-left,.mc-tooltip.mc-tooltip_placement-bottom-right{margin-top:9px;margin-top:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-left,.mc-tooltip.mc-tooltip_placement-left-top,.mc-tooltip.mc-tooltip_placement-left-bottom{margin-right:9px;margin-right:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_default,.mc-tooltip.mc-tooltip_warning{max-width:300px;max-width:var(--mc-tooltip-size-max-width, 300px)}.mc-tooltip.mc-tooltip_default .mc-tooltip__inner,.mc-tooltip.mc-tooltip_warning .mc-tooltip__inner{padding:8px 16px;padding:var(--mc-tooltip-size-padding, 8px 16px)}.mc-tooltip.mc-tooltip_extended{max-height:480px;max-height:var(--mc-extended-tooltip-size-max-height, 480px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__header{height:40px;height:var(--mc-extended-tooltip-header-size-height, 40px);padding:10px 16px;padding:var(--mc-extended-tooltip-header-size-padding, 10px 16px);border-top-left-radius:3px;border-top-left-radius:var(--mc-tooltip-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__content{padding:8px 16px;padding:var(--mc-extended-tooltip-size-padding, 8px 16px)}.mc-tooltip__arrow{position:absolute;width:12px;width:var(--mc-tooltip-size-arrow-size, 12px);height:12px;height:var(--mc-tooltip-size-arrow-size, 12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip__arrow{bottom:-5.5px;bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:-5.5px;margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-top-left .mc-tooltip__arrow{bottom:-5.5px;bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:13.5px;left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-top-right .mc-tooltip__arrow{bottom:-5.5px;bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:13.5px;right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right .mc-tooltip__arrow{left:-5.5px;left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:-5.5px;margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-right-top .mc-tooltip__arrow{left:-5.5px;left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:13.5px;top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right-bottom .mc-tooltip__arrow{left:-5.5px;left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:13.5px;bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left .mc-tooltip__arrow{right:-5.5px;right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:-5.5px;margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-left-top .mc-tooltip__arrow{right:-5.5px;right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:13.5px;top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left-bottom .mc-tooltip__arrow{right:-5.5px;right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:13.5px;bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom .mc-tooltip__arrow{top:-5.5px;top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:-5.5px;margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-bottom-left .mc-tooltip__arrow{top:-5.5px;top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:13.5px;left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom-right .mc-tooltip__arrow{top:-5.5px;top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:13.5px;right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcTooltipAnimations.tooltipState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tooltip-component', animations: [mcTooltipAnimations.tooltipState], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER], template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-tooltip__inner\">\n        <div class=\"mc-tooltip__arrow\"></div>\n\n        <div class=\"mc-tooltip__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n        <div class=\"mc-tooltip__content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n", styles: [".mc-tooltip__inner{border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip{box-sizing:border-box;border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px);z-index:1060;white-space:pre-line}.mc-tooltip.mc-tooltip_placement-top,.mc-tooltip.mc-tooltip_placement-top-left,.mc-tooltip.mc-tooltip_placement-top-right{margin-bottom:9px;margin-bottom:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-right,.mc-tooltip.mc-tooltip_placement-right-top,.mc-tooltip.mc-tooltip_placement-right-bottom{margin-left:9px;margin-left:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-bottom,.mc-tooltip.mc-tooltip_placement-bottom-left,.mc-tooltip.mc-tooltip_placement-bottom-right{margin-top:9px;margin-top:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-left,.mc-tooltip.mc-tooltip_placement-left-top,.mc-tooltip.mc-tooltip_placement-left-bottom{margin-right:9px;margin-right:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_default,.mc-tooltip.mc-tooltip_warning{max-width:300px;max-width:var(--mc-tooltip-size-max-width, 300px)}.mc-tooltip.mc-tooltip_default .mc-tooltip__inner,.mc-tooltip.mc-tooltip_warning .mc-tooltip__inner{padding:8px 16px;padding:var(--mc-tooltip-size-padding, 8px 16px)}.mc-tooltip.mc-tooltip_extended{max-height:480px;max-height:var(--mc-extended-tooltip-size-max-height, 480px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__header{height:40px;height:var(--mc-extended-tooltip-header-size-height, 40px);padding:10px 16px;padding:var(--mc-extended-tooltip-header-size-padding, 10px 16px);border-top-left-radius:3px;border-top-left-radius:var(--mc-tooltip-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__content{padding:8px 16px;padding:var(--mc-extended-tooltip-size-padding, 8px 16px)}.mc-tooltip__arrow{position:absolute;width:12px;width:var(--mc-tooltip-size-arrow-size, 12px);height:12px;height:var(--mc-tooltip-size-arrow-size, 12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip__arrow{bottom:-5.5px;bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:-5.5px;margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-top-left .mc-tooltip__arrow{bottom:-5.5px;bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:13.5px;left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-top-right .mc-tooltip__arrow{bottom:-5.5px;bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:13.5px;right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right .mc-tooltip__arrow{left:-5.5px;left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:-5.5px;margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-right-top .mc-tooltip__arrow{left:-5.5px;left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:13.5px;top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right-bottom .mc-tooltip__arrow{left:-5.5px;left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:13.5px;bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left .mc-tooltip__arrow{right:-5.5px;right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:-5.5px;margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-left-top .mc-tooltip__arrow{right:-5.5px;right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:13.5px;top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left-bottom .mc-tooltip__arrow{right:-5.5px;right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:13.5px;bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom .mc-tooltip__arrow{top:-5.5px;top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:-5.5px;margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-bottom-left .mc-tooltip__arrow{top:-5.5px;top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:13.5px;left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom-right .mc-tooltip__arrow{top:-5.5px;top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:13.5px;right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}\n"] }]
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
/** @nocollapse */ /** @nocollapse */ McTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McTooltipTrigger, selector: "[mcTooltip]", inputs: { tooltipVisible: ["mcVisible", "tooltipVisible"], tooltipPlacement: ["mcPlacement", "tooltipPlacement"], tooltipPlacementPriority: ["mcPlacementPriority", "tooltipPlacementPriority"], content: ["mcTooltip", "content"], disabled: ["mcTooltipDisabled", "disabled"], enterDelay: ["mcEnterDelay", "enterDelay"], leaveDelay: ["mcLeaveDelay", "leaveDelay"], trigger: ["mcTrigger", "trigger"], customClass: ["mcTooltipClass", "customClass"] }, outputs: { placementChange: "mcPlacementChange", visibleChange: "mcVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTooltipTrigger, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McWarningTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McWarningTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McWarningTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McWarningTooltipTrigger, selector: "[mcWarningTooltip]", inputs: { content: ["mcWarningTooltip", "content"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcWarningTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McWarningTooltipTrigger, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ McExtendedTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McExtendedTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McExtendedTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.0", type: McExtendedTooltipTrigger, selector: "[mcExtendedTooltip]", inputs: { content: ["mcExtendedTooltip", "content"], header: ["mcTooltipHeader", "header"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcExtendedTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McExtendedTooltipTrigger, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxPQUFPLEVBQ1AsZ0JBQWdCLEVBRW5CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUdOLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBRzNELE1BQU0sQ0FBTixJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDdkIsc0NBQW1CLENBQUE7SUFDbkIsc0NBQW1CLENBQUE7SUFDbkIsd0NBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUpXLGVBQWUsS0FBZixlQUFlLFFBSTFCO0FBRUQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxjQUFjLENBQXVCLHNCQUFz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LE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsT0FBa0M7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFFeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUNJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLE1BQWlDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBa0JELFVBQVU7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUUvQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDOzsySkE1Q1Esd0JBQXdCLHlKQWlDckIsMEJBQTBCOytJQWpDN0Isd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBVnBDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsSUFBSSxFQUFFO3dCQUNGLHlCQUF5QixFQUFFLFFBQVE7d0JBRW5DLFdBQVcsRUFBRSx1QkFBdUI7d0JBQ3BDLFlBQVksRUFBRSxrQkFBa0I7cUJBQ25DO2lCQUNKOzswQkFrQ1EsTUFBTTsyQkFBQywwQkFBMEI7OzBCQUNqQyxRQUFROzRDQWhDVCxPQUFPO3NCQURWLEtBQUs7dUJBQUMsbUJBQW1CO2dCQVl0QixNQUFNO3NCQURULEtBQUs7dUJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBPdmVybGF5LFxuICAgIFNjcm9sbERpc3BhdGNoZXIsXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgT3ZlcmxheUNvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5L292ZXJsYXktY29uZmlnJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBUeXBlLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY1BvcFVwLCBNY1BvcFVwVHJpZ2dlciwgUG9wVXBQbGFjZW1lbnRzLCBQb3BVcFRyaWdnZXJzLCBQT1NJVElPTl9UT19DU1NfTUFQIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgbWNUb29sdGlwQW5pbWF0aW9ucyB9IGZyb20gJy4vdG9vbHRpcC5hbmltYXRpb25zJztcblxuXG5leHBvcnQgZW51bSBUb29sdGlwTW9kaWZpZXIge1xuICAgIERlZmF1bHQgPSAnZGVmYXVsdCcsXG4gICAgV2FybmluZyA9ICd3YXJuaW5nJyxcbiAgICBFeHRlbmRlZCA9ICdleHRlbmRlZCdcbn1cblxuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfT1BFTl9USU1FID0gbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtdG9vbHRpcC1vcGVuLXRpbWUnKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX09QRU5fVElNRV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19UT09MVElQX09QRU5fVElNRSxcbiAgICB1c2VWYWx1ZTogeyB2YWx1ZTogMCB9XG59O1xuXG5leHBvcnQgY29uc3QgTUlOX1RJTUVfRk9SX0RFTEFZID0gMjAwMDtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRvb2x0aXAtY29tcG9uZW50JyxcbiAgICBhbmltYXRpb25zOiBbbWNUb29sdGlwQW5pbWF0aW9ucy50b29sdGlwU3RhdGVdLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b29sdGlwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b29sdGlwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW01DX1RPT0xUSVBfT1BFTl9USU1FX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXBDb21wb25lbnQgZXh0ZW5kcyBNY1BvcFVwIHtcbiAgICBwcmVmaXggPSAnbWMtdG9vbHRpcCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1RPT0xUSVBfT1BFTl9USU1FKSBwcml2YXRlIG9wZW5UaW1lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICBzaG93KGRlbGF5OiBudW1iZXIpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgc3VwZXIuc2hvdyhEYXRlLm5vdygpIC0gdGhpcy5vcGVuVGltZS52YWx1ZSA8IE1JTl9USU1FX0ZPUl9ERUxBWSA/IDAgOiBkZWxheSk7XG5cbiAgICAgICAgdGhpcy5vcGVuVGltZS52YWx1ZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xhc3NNYXAocGxhY2VtZW50OiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcsIHsgbW9kaWZpZXIgfSkge1xuICAgICAgICBjb25zdCBjbGFzc01hcCA9IHtcbiAgICAgICAgICAgIFtgJHt0aGlzLnByZWZpeH1fJHttb2RpZmllcn1gXTogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyLnVwZGF0ZUNsYXNzTWFwKHBsYWNlbWVudCwgY3VzdG9tQ2xhc3MsIGNsYXNzTWFwKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtdG9vbHRpcC1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBtY1Rvb2x0aXBTY3JvbGxTdHJhdGVneUZhY3Rvcnkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oeyBzY3JvbGxUaHJvdHRsZTogMjAgfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNUb29sdGlwU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1Rvb2x0aXBdJyxcbiAgICBleHBvcnRBczogJ21jVG9vbHRpcCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXRvb2x0aXBfb3Blbl0nOiAnaXNPcGVuJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXBUcmlnZ2VyIGV4dGVuZHMgTWNQb3BVcFRyaWdnZXI8TWNUb29sdGlwQ29tcG9uZW50PiB7XG4gICAgQElucHV0KCdtY1Zpc2libGUnKVxuICAgIGdldCB0b29sdGlwVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZTtcbiAgICB9XG5cbiAgICBzZXQgdG9vbHRpcFZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgc3VwZXIudXBkYXRlVmlzaWJsZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY1BsYWNlbWVudCcpXG4gICAgZ2V0IHRvb2x0aXBQbGFjZW1lbnQoKTogUG9wVXBQbGFjZW1lbnRzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCB0b29sdGlwUGxhY2VtZW50KHZhbHVlOiBQb3BVcFBsYWNlbWVudHMpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUGxhY2VtZW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jUGxhY2VtZW50UHJpb3JpdHknKVxuICAgIGdldCB0b29sdGlwUGxhY2VtZW50UHJpb3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYWNlbWVudFByaW9yaXR5O1xuICAgIH1cblxuICAgIHNldCB0b29sdGlwUGxhY2VtZW50UHJpb3JpdHkodmFsdWUpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUGxhY2VtZW50UHJpb3JpdHkodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwJylcbiAgICBnZXQgY29udGVudCgpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgfVxuXG4gICAgc2V0IGNvbnRlbnQoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9jb250ZW50ID0gY29udGVudDtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jVG9vbHRpcERpc2FibGVkJylcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNFbnRlckRlbGF5JykgZW50ZXJEZWxheSA9IDQwMDtcbiAgICBASW5wdXQoJ21jTGVhdmVEZWxheScpIGxlYXZlRGVsYXkgPSAwO1xuXG4gICAgQElucHV0KCdtY1RyaWdnZXInKVxuICAgIGdldCB0cmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCB0cmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyID0gYCR7UG9wVXBUcmlnZ2Vycy5Ib3Zlcn0sICR7UG9wVXBUcmlnZ2Vycy5Gb2N1c31gO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdHJpZ2dlciA9IGAke1BvcFVwVHJpZ2dlcnMuSG92ZXJ9LCAke1BvcFVwVHJpZ2dlcnMuRm9jdXN9YDtcblxuICAgIEBJbnB1dCgnbWNUb29sdGlwQ2xhc3MnKVxuICAgIGdldCBjdXN0b21DbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0IGN1c3RvbUNsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXN0b21DbGFzcyA9IHZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNsYXNzTWFwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXN0b21DbGFzcyA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQE91dHB1dCgnbWNQbGFjZW1lbnRDaGFuZ2UnKSBwbGFjZW1lbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCdtY1Zpc2libGVDaGFuZ2UnKSB2aXNpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgcHJvdGVjdGVkIG9yaWdpblNlbGVjdG9yID0gJy5tYy10b29sdGlwJztcblxuICAgIHByb3RlY3RlZCBvdmVybGF5Q29uZmlnOiBPdmVybGF5Q29uZmlnID0ge1xuICAgICAgICBwYW5lbENsYXNzOiAnbWMtdG9vbHRpcC1wYW5lbCdcbiAgICB9O1xuXG4gICAgcHJvdGVjdGVkIG1vZGlmaWVyOiBUb29sdGlwTW9kaWZpZXIgPSBUb29sdGlwTW9kaWZpZXIuRGVmYXVsdDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmluc3RhbmNlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgfVxuXG4gICAgY2xvc2luZ0FjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKSxcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEuZGV0YWNobWVudHMoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldE92ZXJsYXlIYW5kbGVDb21wb25lbnRUeXBlKCk6IFR5cGU8TWNUb29sdGlwQ29tcG9uZW50PiB7XG4gICAgICAgIHJldHVybiBNY1Rvb2x0aXBDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xhc3NNYXAobmV3UGxhY2VtZW50OiBzdHJpbmcgPSB0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZS51cGRhdGVDbGFzc01hcChcbiAgICAgICAgICAgIFBPU0lUSU9OX1RPX0NTU19NQVBbbmV3UGxhY2VtZW50XSxcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQ2xhc3MsXG4gICAgICAgICAgICB7IG1vZGlmaWVyOiB0aGlzLm1vZGlmaWVyIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNXYXJuaW5nVG9vbHRpcF0nLFxuICAgIGV4cG9ydEFzOiAnbWNXYXJuaW5nVG9vbHRpcCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXRvb2x0aXBfb3Blbl0nOiAnaXNPcGVuJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1dhcm5pbmdUb29sdGlwVHJpZ2dlciBleHRlbmRzIE1jVG9vbHRpcFRyaWdnZXIge1xuICAgIEBJbnB1dCgnbWNXYXJuaW5nVG9vbHRpcCcpXG4gICAgZ2V0IGNvbnRlbnQoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH1cblxuICAgIHNldCBjb250ZW50KGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1vZGlmaWVyOiBUb29sdGlwTW9kaWZpZXIgPSBUb29sdGlwTW9kaWZpZXIuV2FybmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNFeHRlbmRlZFRvb2x0aXBdJyxcbiAgICBleHBvcnRBczogJ21jRXh0ZW5kZWRUb29sdGlwJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdG9vbHRpcF9vcGVuXSc6ICdpc09wZW4nLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRXh0ZW5kZWRUb29sdGlwVHJpZ2dlciBleHRlbmRzIE1jVG9vbHRpcFRyaWdnZXIge1xuICAgIEBJbnB1dCgnbWNFeHRlbmRlZFRvb2x0aXAnKVxuICAgIGdldCBjb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudChjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwSGVhZGVyJylcbiAgICBnZXQgaGVhZGVyKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyO1xuICAgIH1cblxuICAgIHNldCBoZWFkZXIoaGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IGhlYWRlcjtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwcm90ZWN0ZWQgbW9kaWZpZXI6IFRvb2x0aXBNb2RpZmllciA9IFRvb2x0aXBNb2RpZmllci5FeHRlbmRlZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgeyByZXR1cm47IH1cblxuICAgICAgICBzdXBlci51cGRhdGVEYXRhKCk7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UuaGVhZGVyID0gdGhpcy5oZWFkZXI7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1jLXRvb2x0aXBcIlxuICAgICBbbmdDbGFzc109XCJjbGFzc01hcFwiXG4gICAgIFtAc3RhdGVdPVwidmlzaWJpbGl0eVwiXG4gICAgIChAc3RhdGUuc3RhcnQpPVwiYW5pbWF0aW9uU3RhcnQoKVwiXG4gICAgIChAc3RhdGUuZG9uZSk9XCJhbmltYXRpb25Eb25lKCRldmVudClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy10b29sdGlwX19pbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdG9vbHRpcF9fYXJyb3dcIj48L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdG9vbHRpcF9faGVhZGVyXCIgKm5nSWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGhlYWRlcilcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KGhlYWRlcilcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNUZW1wbGF0ZVJlZihoZWFkZXIpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBoZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXRvb2x0aXBfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShjb250ZW50KVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBjb250ZW50IH19PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==
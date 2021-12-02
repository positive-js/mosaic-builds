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
/** @nocollapse */ McTooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: MC_TOOLTIP_OPEN_TIME }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McTooltipComponent, selector: "mc-tooltip-component", providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-tooltip__inner\">\n        <div class=\"mc-tooltip__arrow\"></div>\n\n        <div class=\"mc-tooltip__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n        <div class=\"mc-tooltip__content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n", styles: [".mc-tooltip__inner{border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip{box-sizing:border-box;border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px);z-index:1060;white-space:pre-line}.mc-tooltip.mc-tooltip_placement-top,.mc-tooltip.mc-tooltip_placement-top-left,.mc-tooltip.mc-tooltip_placement-top-right{margin-bottom:calc(9px);margin-bottom:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-right,.mc-tooltip.mc-tooltip_placement-right-top,.mc-tooltip.mc-tooltip_placement-right-bottom{margin-left:calc(9px);margin-left:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-bottom,.mc-tooltip.mc-tooltip_placement-bottom-left,.mc-tooltip.mc-tooltip_placement-bottom-right{margin-top:calc(9px);margin-top:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-left,.mc-tooltip.mc-tooltip_placement-left-top,.mc-tooltip.mc-tooltip_placement-left-bottom{margin-right:calc(9px);margin-right:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_default,.mc-tooltip.mc-tooltip_warning{max-width:300px;max-width:var(--mc-tooltip-size-max-width, 300px)}.mc-tooltip.mc-tooltip_default .mc-tooltip__inner,.mc-tooltip.mc-tooltip_warning .mc-tooltip__inner{padding:8px 16px;padding:var(--mc-tooltip-size-padding, 8px 16px)}.mc-tooltip.mc-tooltip_extended{max-height:480px;max-height:var(--mc-extended-tooltip-size-max-height, 480px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__header{height:40px;height:var(--mc-extended-tooltip-header-size-height, 40px);padding:10px 16px;padding:var(--mc-extended-tooltip-header-size-padding, 10px 16px);border-top-left-radius:3px;border-top-left-radius:var(--mc-tooltip-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__content{padding:8px 16px;padding:var(--mc-extended-tooltip-size-padding, 8px 16px)}.mc-tooltip__arrow{position:absolute;width:12px;width:var(--mc-tooltip-size-arrow-size, 12px);height:12px;height:var(--mc-tooltip-size-arrow-size, 12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((12px - 1px) / -2);margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-top-left .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - 9px / 2);left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-top-right .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - 9px / 2);right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((12px - 1px) / -2);margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-right-top .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - 9px / 2);top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-right-bottom .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - 9px / 2);bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((12px - 1px) / -2);margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-left-top .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - 9px / 2);top:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-left-bottom .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - 9px / 2);bottom:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((12px - 1px) / -2);margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-bottom-left .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - 9px / 2);left:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}.mc-tooltip_placement-bottom-right .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - 9px / 2);right:calc(18px - var(--mc-tooltip-size-trigger-margin, 9px) / 2)}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcTooltipAnimations.tooltipState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTooltipComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tooltip-component',
                    animations: [mcTooltipAnimations.tooltipState],
                    templateUrl: './tooltip.component.html',
                    styleUrls: ['./tooltip.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER]
                }]
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
/** @nocollapse */ McTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTooltipTrigger, selector: "[mcTooltip]", inputs: { tooltipVisible: ["mcVisible", "tooltipVisible"], tooltipPlacement: ["mcPlacement", "tooltipPlacement"], tooltipPlacementPriority: ["mcPlacementPriority", "tooltipPlacementPriority"], content: ["mcTooltip", "content"], disabled: ["mcTooltipDisabled", "disabled"], enterDelay: ["mcEnterDelay", "enterDelay"], leaveDelay: ["mcLeaveDelay", "leaveDelay"], trigger: ["mcTrigger", "trigger"], customClass: ["mcTooltipClass", "customClass"] }, outputs: { placementChange: "mcPlacementChange", visibleChange: "mcVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTooltipTrigger, decorators: [{
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
/** @nocollapse */ McWarningTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McWarningTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McWarningTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McWarningTooltipTrigger, selector: "[mcWarningTooltip]", inputs: { content: ["mcWarningTooltip", "content"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcWarningTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McWarningTooltipTrigger, decorators: [{
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
/** @nocollapse */ McExtendedTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McExtendedTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McExtendedTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McExtendedTooltipTrigger, selector: "[mcExtendedTooltip]", inputs: { content: ["mcExtendedTooltip", "content"], header: ["mcTooltipHeader", "header"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcExtendedTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McExtendedTooltipTrigger, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxPQUFPLEVBQ1AsZ0JBQWdCLEVBRW5CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUdOLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBRzNELE1BQU0sQ0FBTixJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDdkIsc0NBQW1CLENBQUE7SUFDbkIsc0NBQW1CLENBQUE7SUFDbkIsd0NBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUpXLGVBQWUsS0FBZixlQUFlLFFBSTFCO0FBRUQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxjQUFjLENBQXVCLHNCQUFz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S0FBSzt1QkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIE92ZXJsYXksXG4gICAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPdmVybGF5Q29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXkvb3ZlcmxheS1jb25maWcnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFR5cGUsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jUG9wVXAsIE1jUG9wVXBUcmlnZ2VyLCBQb3BVcFBsYWNlbWVudHMsIFBvcFVwVHJpZ2dlcnMsIFBPU0lUSU9OX1RPX0NTU19NQVAgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBtY1Rvb2x0aXBBbmltYXRpb25zIH0gZnJvbSAnLi90b29sdGlwLmFuaW1hdGlvbnMnO1xuXG5cbmV4cG9ydCBlbnVtIFRvb2x0aXBNb2RpZmllciB7XG4gICAgRGVmYXVsdCA9ICdkZWZhdWx0JyxcbiAgICBXYXJuaW5nID0gJ3dhcm5pbmcnLFxuICAgIEV4dGVuZGVkID0gJ2V4dGVuZGVkJ1xufVxuXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9PUEVOX1RJTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy10b29sdGlwLW9wZW4tdGltZScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfT1BFTl9USU1FX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1RPT0xUSVBfT1BFTl9USU1FLFxuICAgIHVzZVZhbHVlOiB7IHZhbHVlOiAwIH1cbn07XG5cbmV4cG9ydCBjb25zdCBNSU5fVElNRV9GT1JfREVMQVkgPSAyMDAwO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdG9vbHRpcC1jb21wb25lbnQnLFxuICAgIGFuaW1hdGlvbnM6IFttY1Rvb2x0aXBBbmltYXRpb25zLnRvb2x0aXBTdGF0ZV0sXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rvb2x0aXAuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbTUNfVE9PTFRJUF9PUEVOX1RJTUVfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE1jVG9vbHRpcENvbXBvbmVudCBleHRlbmRzIE1jUG9wVXAge1xuICAgIHByZWZpeCA9ICdtYy10b29sdGlwJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9PUEVOX1RJTUUpIHByaXZhdGUgb3BlblRpbWVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIH1cblxuICAgIHNob3coZGVsYXk6IG51bWJlcikge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBzdXBlci5zaG93KERhdGUubm93KCkgLSB0aGlzLm9wZW5UaW1lLnZhbHVlIDwgTUlOX1RJTUVfRk9SX0RFTEFZID8gMCA6IGRlbGF5KTtcblxuICAgICAgICB0aGlzLm9wZW5UaW1lLnZhbHVlID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDbGFzc01hcChwbGFjZW1lbnQ6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZywgeyBtb2RpZmllciB9KSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTWFwID0ge1xuICAgICAgICAgICAgW2Ake3RoaXMucHJlZml4fV8ke21vZGlmaWVyfWBdOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgc3VwZXIudXBkYXRlQ2xhc3NNYXAocGxhY2VtZW50LCBjdXN0b21DbGFzcywgY2xhc3NNYXApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy10b29sdGlwLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jVG9vbHRpcFNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7IHNjcm9sbFRocm90dGxlOiAyMCB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1Rvb2x0aXBTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVG9vbHRpcF0nLFxuICAgIGV4cG9ydEFzOiAnbWNUb29sdGlwJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdG9vbHRpcF9vcGVuXSc6ICdpc09wZW4nLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVG9vbHRpcFRyaWdnZXIgZXh0ZW5kcyBNY1BvcFVwVHJpZ2dlcjxNY1Rvb2x0aXBDb21wb25lbnQ+IHtcbiAgICBASW5wdXQoJ21jVmlzaWJsZScpXG4gICAgZ2V0IHRvb2x0aXBWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlO1xuICAgIH1cblxuICAgIHNldCB0b29sdGlwVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBzdXBlci51cGRhdGVWaXNpYmxlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jUGxhY2VtZW50JylcbiAgICBnZXQgdG9vbHRpcFBsYWNlbWVudCgpOiBQb3BVcFBsYWNlbWVudHMge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IHRvb2x0aXBQbGFjZW1lbnQodmFsdWU6IFBvcFVwUGxhY2VtZW50cykge1xuICAgICAgICBzdXBlci51cGRhdGVQbGFjZW1lbnQodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNQbGFjZW1lbnRQcmlvcml0eScpXG4gICAgZ2V0IHRvb2x0aXBQbGFjZW1lbnRQcmlvcml0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhY2VtZW50UHJpb3JpdHk7XG4gICAgfVxuXG4gICAgc2V0IHRvb2x0aXBQbGFjZW1lbnRQcmlvcml0eSh2YWx1ZSkge1xuICAgICAgICBzdXBlci51cGRhdGVQbGFjZW1lbnRQcmlvcml0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY1Rvb2x0aXAnKVxuICAgIGdldCBjb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudChjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY0VudGVyRGVsYXknKSBlbnRlckRlbGF5ID0gNDAwO1xuICAgIEBJbnB1dCgnbWNMZWF2ZURlbGF5JykgbGVhdmVEZWxheSA9IDA7XG5cbiAgICBASW5wdXQoJ21jVHJpZ2dlcicpXG4gICAgZ2V0IHRyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IHRyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIgPSBgJHtQb3BVcFRyaWdnZXJzLkhvdmVyfSwgJHtQb3BVcFRyaWdnZXJzLkZvY3VzfWA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90cmlnZ2VyID0gYCR7UG9wVXBUcmlnZ2Vycy5Ib3Zlcn0sICR7UG9wVXBUcmlnZ2Vycy5Gb2N1c31gO1xuXG4gICAgQElucHV0KCdtY1Rvb2x0aXBDbGFzcycpXG4gICAgZ2V0IGN1c3RvbUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21DbGFzcztcbiAgICB9XG5cbiAgICBzZXQgY3VzdG9tQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbUNsYXNzID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbUNsYXNzID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAT3V0cHV0KCdtY1BsYWNlbWVudENoYW5nZScpIHBsYWNlbWVudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoJ21jVmlzaWJsZUNoYW5nZScpIHZpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcm90ZWN0ZWQgb3JpZ2luU2VsZWN0b3IgPSAnLm1jLXRvb2x0aXAnO1xuXG4gICAgcHJvdGVjdGVkIG92ZXJsYXlDb25maWc6IE92ZXJsYXlDb25maWcgPSB7XG4gICAgICAgIHBhbmVsQ2xhc3M6ICdtYy10b29sdGlwLXBhbmVsJ1xuICAgIH07XG5cbiAgICBwcm90ZWN0ZWQgbW9kaWZpZXI6IFRvb2x0aXBNb2RpZmllciA9IFRvb2x0aXBNb2RpZmllci5EZWZhdWx0O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgc3VwZXIob3ZlcmxheSwgZWxlbWVudFJlZiwgbmdab25lLCBzY3JvbGxEaXNwYXRjaGVyLCBob3N0Vmlldywgc2Nyb2xsU3RyYXRlZ3ksIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICB9XG5cbiAgICBjbG9zaW5nQWN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmIS5vdXRzaWRlUG9pbnRlckV2ZW50cygpLFxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmIS5kZXRhY2htZW50cygpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0T3ZlcmxheUhhbmRsZUNvbXBvbmVudFR5cGUoKTogVHlwZTxNY1Rvb2x0aXBDb21wb25lbnQ+IHtcbiAgICAgICAgcmV0dXJuIE1jVG9vbHRpcENvbXBvbmVudDtcbiAgICB9XG5cbiAgICB1cGRhdGVDbGFzc01hcChuZXdQbGFjZW1lbnQ6IHN0cmluZyA9IHRoaXMucGxhY2VtZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmluc3RhbmNlLnVwZGF0ZUNsYXNzTWFwKFxuICAgICAgICAgICAgUE9TSVRJT05fVE9fQ1NTX01BUFtuZXdQbGFjZW1lbnRdLFxuICAgICAgICAgICAgdGhpcy5jdXN0b21DbGFzcyxcbiAgICAgICAgICAgIHsgbW9kaWZpZXI6IHRoaXMubW9kaWZpZXIgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmluc3RhbmNlLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1dhcm5pbmdUb29sdGlwXScsXG4gICAgZXhwb3J0QXM6ICdtY1dhcm5pbmdUb29sdGlwJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdG9vbHRpcF9vcGVuXSc6ICdpc09wZW4nLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jV2FybmluZ1Rvb2x0aXBUcmlnZ2VyIGV4dGVuZHMgTWNUb29sdGlwVHJpZ2dlciB7XG4gICAgQElucHV0KCdtY1dhcm5pbmdUb29sdGlwJylcbiAgICBnZXQgY29udGVudCgpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgfVxuXG4gICAgc2V0IGNvbnRlbnQoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9jb250ZW50ID0gY29udGVudDtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbW9kaWZpZXI6IFRvb2x0aXBNb2RpZmllciA9IFRvb2x0aXBNb2RpZmllci5XYXJuaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgc3VwZXIob3ZlcmxheSwgZWxlbWVudFJlZiwgbmdab25lLCBzY3JvbGxEaXNwYXRjaGVyLCBob3N0Vmlldywgc2Nyb2xsU3RyYXRlZ3ksIGRpcmVjdGlvbik7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY0V4dGVuZGVkVG9vbHRpcF0nLFxuICAgIGV4cG9ydEFzOiAnbWNFeHRlbmRlZFRvb2x0aXAnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5tYy10b29sdGlwX29wZW5dJzogJ2lzT3BlbicsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNFeHRlbmRlZFRvb2x0aXBUcmlnZ2VyIGV4dGVuZHMgTWNUb29sdGlwVHJpZ2dlciB7XG4gICAgQElucHV0KCdtY0V4dGVuZGVkVG9vbHRpcCcpXG4gICAgZ2V0IGNvbnRlbnQoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH1cblxuICAgIHNldCBjb250ZW50KGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY1Rvb2x0aXBIZWFkZXInKVxuICAgIGdldCBoZWFkZXIoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXI7XG4gICAgfVxuXG4gICAgc2V0IGhlYWRlcihoZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5faGVhZGVyID0gaGVhZGVyO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hlYWRlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHByb3RlY3RlZCBtb2RpZmllcjogVG9vbHRpcE1vZGlmaWVyID0gVG9vbHRpcE1vZGlmaWVyLkV4dGVuZGVkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgc3VwZXIob3ZlcmxheSwgZWxlbWVudFJlZiwgbmdab25lLCBzY3JvbGxEaXNwYXRjaGVyLCBob3N0Vmlldywgc2Nyb2xsU3RyYXRlZ3ksIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHN1cGVyLnVwZGF0ZURhdGEoKTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5oZWFkZXIgPSB0aGlzLmhlYWRlcjtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWMtdG9vbHRpcFwiXG4gICAgIFtuZ0NsYXNzXT1cImNsYXNzTWFwXCJcbiAgICAgW0BzdGF0ZV09XCJ2aXNpYmlsaXR5XCJcbiAgICAgKEBzdGF0ZS5zdGFydCk9XCJhbmltYXRpb25TdGFydCgpXCJcbiAgICAgKEBzdGF0ZS5kb25lKT1cImFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLXRvb2x0aXBfX2lubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy10b29sdGlwX19hcnJvd1wiPjwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYy10b29sdGlwX19oZWFkZXJcIiAqbmdJZj1cImhlYWRlclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVGVtcGxhdGVSZWYoaGVhZGVyKVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIiRhbnkoaGVhZGVyKVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1RlbXBsYXRlUmVmKGhlYWRlcilcIj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IGhlYWRlciB9fTwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdG9vbHRpcF9fY29udGVudFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVGVtcGxhdGVSZWYoY29udGVudClcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KGNvbnRlbnQpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzVGVtcGxhdGVSZWYoY29udGVudClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IGNvbnRlbnQgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19
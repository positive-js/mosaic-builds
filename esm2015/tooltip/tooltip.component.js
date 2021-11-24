import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Inject, InjectionToken, Input, NgZone, Optional, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { McPopUp, McPopUpTrigger, PopUpTriggers, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
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
/** @nocollapse */ McTooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTooltipComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: MC_TOOLTIP_OPEN_TIME }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTooltipComponent, selector: "mc-tooltip-component", providers: [MC_TOOLTIP_OPEN_TIME_PROVIDER], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-tooltip\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-tooltip__inner\">\n        <div class=\"mc-tooltip__arrow\"></div>\n\n        <div class=\"mc-tooltip__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n        <div class=\"mc-tooltip__content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n    </div>\n</div>\n", styles: [".mc-tooltip__inner{border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip{box-sizing:border-box;border-radius:3px;border-radius:var(--mc-tooltip-size-border-radius, 3px);z-index:1060;white-space:pre-line}.mc-tooltip.mc-tooltip_placement-top,.mc-tooltip.mc-tooltip_placement-top-left,.mc-tooltip.mc-tooltip_placement-top-right{margin-bottom:calc(9px);margin-bottom:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-right,.mc-tooltip.mc-tooltip_placement-right-top,.mc-tooltip.mc-tooltip_placement-right-bottom{margin-left:calc(9px);margin-left:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-bottom,.mc-tooltip.mc-tooltip_placement-bottom-left,.mc-tooltip.mc-tooltip_placement-bottom-right{margin-top:calc(9px);margin-top:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_placement-left,.mc-tooltip.mc-tooltip_placement-left-top,.mc-tooltip.mc-tooltip_placement-left-bottom{margin-right:calc(9px);margin-right:calc(var(--mc-tooltip-size-trigger-margin, 9px))}.mc-tooltip.mc-tooltip_default,.mc-tooltip.mc-tooltip_warning{max-width:300px;max-width:var(--mc-tooltip-size-max-width, 300px)}.mc-tooltip.mc-tooltip_default .mc-tooltip__inner,.mc-tooltip.mc-tooltip_warning .mc-tooltip__inner{padding:8px 16px;padding:var(--mc-tooltip-size-padding, 8px 16px)}.mc-tooltip.mc-tooltip_extended{max-height:480px;max-height:var(--mc-extended-tooltip-size-max-height, 480px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__header{height:40px;height:var(--mc-extended-tooltip-header-size-height, 40px);padding:10px 16px;padding:var(--mc-extended-tooltip-header-size-padding, 10px 16px);border-top-left-radius:3px;border-top-left-radius:var(--mc-tooltip-size-border-radius, 3px);border-top-right-radius:3px;border-top-right-radius:var(--mc-tooltip-size-border-radius, 3px)}.mc-tooltip.mc-tooltip_extended .mc-tooltip__content{padding:8px 16px;padding:var(--mc-extended-tooltip-size-padding, 8px 16px)}.mc-tooltip__arrow{position:absolute;width:12px;width:var(--mc-tooltip-size-arrow-size, 12px);height:12px;height:var(--mc-tooltip-size-arrow-size, 12px);transform:rotate(45deg)}.mc-tooltip_placement-top .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((12px - 1px) / -2);margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-top-left .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - (9px / 2));left:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-top-right .mc-tooltip__arrow{bottom:calc((12px - 1px) / -2);bottom:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - (9px / 2));right:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-right .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((12px - 1px) / -2);margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-right-top .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - (9px / 2));top:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-right-bottom .mc-tooltip__arrow{left:calc((12px - 1px) / -2);left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - (9px / 2));bottom:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-left .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:50%;margin-top:calc((12px - 1px) / -2);margin-top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-left-top .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);top:calc(18px - (9px / 2));top:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-left-bottom .mc-tooltip__arrow{right:calc((12px - 1px) / -2);right:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);bottom:calc(18px - (9px / 2));bottom:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-bottom .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:50%;margin-left:calc((12px - 1px) / -2);margin-left:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2)}.mc-tooltip_placement-bottom-left .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);left:calc(18px - (9px / 2));left:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}.mc-tooltip_placement-bottom-right .mc-tooltip__arrow{top:calc((12px - 1px) / -2);top:calc((var(--mc-tooltip-size-arrow-size, 12px) - 1px) / -2);right:calc(18px - (9px / 2));right:calc(18px - (var(--mc-tooltip-size-trigger-margin, 9px) / 2))}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcTooltipAnimations.tooltipState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTooltipComponent, decorators: [{
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
        this._trigger = `${PopUpTriggers.Hover}, ${PopUpTriggers.Focus}`;
        this.originSelector = '.mc-tooltip';
        this.overlayConfig = {
            panelClass: 'mc-tooltip-panel'
        };
        this.modifier = TooltipModifier.Default;
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
/** @nocollapse */ McTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTooltipTrigger, selector: "[mcTooltip]", inputs: { content: ["mcTooltip", "content"], disabled: ["mcTooltipDisabled", "disabled"], enterDelay: ["mcEnterDelay", "enterDelay"], trigger: ["mcTrigger", "trigger"], customClass: ["mcTooltipClass", "customClass"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTooltipTrigger, decorators: [{
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
                }] }]; }, propDecorators: { content: [{
                type: Input,
                args: ['mcTooltip']
            }], disabled: [{
                type: Input,
                args: ['mcTooltipDisabled']
            }], enterDelay: [{
                type: Input,
                args: ['mcEnterDelay']
            }], trigger: [{
                type: Input,
                args: ['mcTrigger']
            }], customClass: [{
                type: Input,
                args: ['mcTooltipClass']
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
/** @nocollapse */ McWarningTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McWarningTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McWarningTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McWarningTooltipTrigger, selector: "[mcWarningTooltip]", inputs: { content: ["mcWarningTooltip", "content"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcWarningTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McWarningTooltipTrigger, decorators: [{
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
/** @nocollapse */ McExtendedTooltipTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McExtendedTooltipTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_TOOLTIP_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McExtendedTooltipTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McExtendedTooltipTrigger, selector: "[mcExtendedTooltip]", inputs: { content: ["mcExtendedTooltip", "content"], header: ["mcTooltipHeader", "header"] }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-tooltip_open": "isOpen" } }, exportAs: ["mcExtendedTooltip"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McExtendedTooltipTrigger, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxPQUFPLEVBQ1AsZ0JBQWdCLEVBRW5CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFHUixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RHLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBRzNELE1BQU0sQ0FBTixJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDdkIsc0NBQW1CLENBQUE7SUFDbkIsc0NBQW1CLENBQUE7SUFDbkIsd0NBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUpXLGVBQWUsS0FBZixlQUFlLFFBSTFCO0FBRUQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxjQUFjLENBQXVCLHNCQUFzQixDQUFDLENBQUM7QUFFckcsb0JBQW9CO0FBQ3BC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QUUsdUJBQXVCO3dCQUNwQyxZQUFZLEVBQUUsa0JBQWtCO3FCQUNuQztpQkFDSjs7MEJBa0NRLE1BQU07MkJBQUMsMEJBQTBCOzswQkFDakMsUUFBUTs0Q0FoQ1QsT0FBTztzQkFEVixLQUFLO3VCQUFDLG1CQUFtQjtnQkFZdEIsTUFBTTtzQkFEVCxLQUFLO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgT3ZlcmxheSxcbiAgICBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE92ZXJsYXlDb25maWcgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheS9vdmVybGF5LWNvbmZpZyc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9wdGlvbmFsLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFR5cGUsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jUG9wVXAsIE1jUG9wVXBUcmlnZ2VyLCBQb3BVcFRyaWdnZXJzLCBQT1NJVElPTl9UT19DU1NfTUFQIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgbWNUb29sdGlwQW5pbWF0aW9ucyB9IGZyb20gJy4vdG9vbHRpcC5hbmltYXRpb25zJztcblxuXG5leHBvcnQgZW51bSBUb29sdGlwTW9kaWZpZXIge1xuICAgIERlZmF1bHQgPSAnZGVmYXVsdCcsXG4gICAgV2FybmluZyA9ICd3YXJuaW5nJyxcbiAgICBFeHRlbmRlZCA9ICdleHRlbmRlZCdcbn1cblxuZXhwb3J0IGNvbnN0IE1DX1RPT0xUSVBfT1BFTl9USU1FID0gbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtdG9vbHRpcC1vcGVuLXRpbWUnKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX09QRU5fVElNRV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19UT09MVElQX09QRU5fVElNRSxcbiAgICB1c2VWYWx1ZTogeyB2YWx1ZTogMCB9XG59O1xuXG5leHBvcnQgY29uc3QgTUlOX1RJTUVfRk9SX0RFTEFZID0gMjAwMDtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRvb2x0aXAtY29tcG9uZW50JyxcbiAgICBhbmltYXRpb25zOiBbbWNUb29sdGlwQW5pbWF0aW9ucy50b29sdGlwU3RhdGVdLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b29sdGlwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b29sdGlwLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW01DX1RPT0xUSVBfT1BFTl9USU1FX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXBDb21wb25lbnQgZXh0ZW5kcyBNY1BvcFVwIHtcbiAgICBwcmVmaXggPSAnbWMtdG9vbHRpcCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1RPT0xUSVBfT1BFTl9USU1FKSBwcml2YXRlIG9wZW5UaW1lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICBzaG93KGRlbGF5OiBudW1iZXIpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgc3VwZXIuc2hvdyhEYXRlLm5vdygpIC0gdGhpcy5vcGVuVGltZS52YWx1ZSA8IE1JTl9USU1FX0ZPUl9ERUxBWSA/IDAgOiBkZWxheSk7XG5cbiAgICAgICAgdGhpcy5vcGVuVGltZS52YWx1ZSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xhc3NNYXAocGxhY2VtZW50OiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcsIHsgbW9kaWZpZXIgfSkge1xuICAgICAgICBjb25zdCBjbGFzc01hcCA9IHtcbiAgICAgICAgICAgIFtgJHt0aGlzLnByZWZpeH1fJHttb2RpZmllcn1gXTogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN1cGVyLnVwZGF0ZUNsYXNzTWFwKHBsYWNlbWVudCwgY3VzdG9tQ2xhc3MsIGNsYXNzTWFwKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtdG9vbHRpcC1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBtY1Rvb2x0aXBTY3JvbGxTdHJhdGVneUZhY3Rvcnkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oeyBzY3JvbGxUaHJvdHRsZTogMjAgfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19UT09MVElQX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNUb29sdGlwU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1Rvb2x0aXBdJyxcbiAgICBleHBvcnRBczogJ21jVG9vbHRpcCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXRvb2x0aXBfb3Blbl0nOiAnaXNPcGVuJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1Rvb2x0aXBUcmlnZ2VyIGV4dGVuZHMgTWNQb3BVcFRyaWdnZXI8TWNUb29sdGlwQ29tcG9uZW50PiB7XG4gICAgQElucHV0KCdtY1Rvb2x0aXAnKVxuICAgIGdldCBjb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudChjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY0VudGVyRGVsYXknKSBlbnRlckRlbGF5ID0gNDAwO1xuXG4gICAgQElucHV0KCdtY1RyaWdnZXInKVxuICAgIGdldCB0cmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCB0cmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyID0gYCR7UG9wVXBUcmlnZ2Vycy5Ib3Zlcn0sICR7UG9wVXBUcmlnZ2Vycy5Gb2N1c31gO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdHJpZ2dlciA9IGAke1BvcFVwVHJpZ2dlcnMuSG92ZXJ9LCAke1BvcFVwVHJpZ2dlcnMuRm9jdXN9YDtcblxuICAgIEBJbnB1dCgnbWNUb29sdGlwQ2xhc3MnKVxuICAgIGdldCBjdXN0b21DbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0IGN1c3RvbUNsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXN0b21DbGFzcyA9IHZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNsYXNzTWFwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jdXN0b21DbGFzcyA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9yaWdpblNlbGVjdG9yID0gJy5tYy10b29sdGlwJztcblxuICAgIHByb3RlY3RlZCBvdmVybGF5Q29uZmlnOiBPdmVybGF5Q29uZmlnID0ge1xuICAgICAgICBwYW5lbENsYXNzOiAnbWMtdG9vbHRpcC1wYW5lbCdcbiAgICB9O1xuXG4gICAgcHJvdGVjdGVkIG1vZGlmaWVyOiBUb29sdGlwTW9kaWZpZXIgPSBUb29sdGlwTW9kaWZpZXIuRGVmYXVsdDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmluc3RhbmNlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgfVxuXG4gICAgY2xvc2luZ0FjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKSxcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEuZGV0YWNobWVudHMoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldE92ZXJsYXlIYW5kbGVDb21wb25lbnRUeXBlKCk6IFR5cGU8TWNUb29sdGlwQ29tcG9uZW50PiB7XG4gICAgICAgIHJldHVybiBNY1Rvb2x0aXBDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xhc3NNYXAobmV3UGxhY2VtZW50OiBzdHJpbmcgPSB0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZS51cGRhdGVDbGFzc01hcChcbiAgICAgICAgICAgIFBPU0lUSU9OX1RPX0NTU19NQVBbbmV3UGxhY2VtZW50XSxcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQ2xhc3MsXG4gICAgICAgICAgICB7IG1vZGlmaWVyOiB0aGlzLm1vZGlmaWVyIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNXYXJuaW5nVG9vbHRpcF0nLFxuICAgIGV4cG9ydEFzOiAnbWNXYXJuaW5nVG9vbHRpcCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXRvb2x0aXBfb3Blbl0nOiAnaXNPcGVuJyxcblxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1dhcm5pbmdUb29sdGlwVHJpZ2dlciBleHRlbmRzIE1jVG9vbHRpcFRyaWdnZXIge1xuICAgIEBJbnB1dCgnbWNXYXJuaW5nVG9vbHRpcCcpXG4gICAgZ2V0IGNvbnRlbnQoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH1cblxuICAgIHNldCBjb250ZW50KGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1vZGlmaWVyOiBUb29sdGlwTW9kaWZpZXIgPSBUb29sdGlwTW9kaWZpZXIuV2FybmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNFeHRlbmRlZFRvb2x0aXBdJyxcbiAgICBleHBvcnRBczogJ21jRXh0ZW5kZWRUb29sdGlwJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtdG9vbHRpcF9vcGVuXSc6ICdpc09wZW4nLFxuXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRXh0ZW5kZWRUb29sdGlwVHJpZ2dlciBleHRlbmRzIE1jVG9vbHRpcFRyaWdnZXIge1xuICAgIEBJbnB1dCgnbWNFeHRlbmRlZFRvb2x0aXAnKVxuICAgIGdldCBjb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudChjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUb29sdGlwSGVhZGVyJylcbiAgICBnZXQgaGVhZGVyKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyO1xuICAgIH1cblxuICAgIHNldCBoZWFkZXIoaGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IGhlYWRlcjtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwcm90ZWN0ZWQgbW9kaWZpZXI6IFRvb2x0aXBNb2RpZmllciA9IFRvb2x0aXBNb2RpZmllci5FeHRlbmRlZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKG92ZXJsYXksIGVsZW1lbnRSZWYsIG5nWm9uZSwgc2Nyb2xsRGlzcGF0Y2hlciwgaG9zdFZpZXcsIHNjcm9sbFN0cmF0ZWd5LCBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgeyByZXR1cm47IH1cblxuICAgICAgICBzdXBlci51cGRhdGVEYXRhKCk7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UuaGVhZGVyID0gdGhpcy5oZWFkZXI7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1jLXRvb2x0aXBcIlxuICAgICBbbmdDbGFzc109XCJjbGFzc01hcFwiXG4gICAgIFtAc3RhdGVdPVwidmlzaWJpbGl0eVwiXG4gICAgIChAc3RhdGUuc3RhcnQpPVwiYW5pbWF0aW9uU3RhcnQoKVwiXG4gICAgIChAc3RhdGUuZG9uZSk9XCJhbmltYXRpb25Eb25lKCRldmVudClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy10b29sdGlwX19pbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdG9vbHRpcF9fYXJyb3dcIj48L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdG9vbHRpcF9faGVhZGVyXCIgKm5nSWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGhlYWRlcilcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KGhlYWRlcilcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNUZW1wbGF0ZVJlZihoZWFkZXIpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBoZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXRvb2x0aXBfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShjb250ZW50KVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBjb250ZW50IH19PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==
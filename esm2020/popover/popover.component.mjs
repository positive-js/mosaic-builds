import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { McPopUp, McPopUpTrigger, PopUpPlacements, PopUpSizes, PopUpTriggers, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { merge, NEVER } from 'rxjs';
import { mcPopoverAnimations } from './popover-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/overlay";
import * as i4 from "@angular/cdk/bidi";
export class McPopoverComponent extends McPopUp {
    constructor(changeDetectorRef) {
        super(changeDetectorRef);
        this.prefix = 'mc-popover';
        this.isTrapFocus = false;
    }
    updateClassMap(placement, customClass, size) {
        super.updateClassMap(placement, customClass, { [`${this.prefix}_${size}`]: !!size });
    }
    updateTrapFocus(isTrapFocus) {
        this.isTrapFocus = isTrapFocus;
    }
}
/** @nocollapse */ /** @nocollapse */ McPopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McPopoverComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McPopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McPopoverComponent, selector: "mc-popover-component", host: { listeners: { "keydown.esc": "hide(0)" } }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-popover\"\n     [cdkTrapFocus]=\"isTrapFocus\"\n     [cdkTrapFocusAutoCapture]=\"isTrapFocus\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__content\" *ngIf=\"content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__footer\" *ngIf=\"footer\">\n            <ng-container *ngIf=\"isTemplateRef(footer)\" [ngTemplateOutlet]=\"$any(footer)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(footer)\">\n                <div>{{ footer }}</div>\n            </ng-container>\n        </div>\n    </div>\n\n    <div class=\"mc-popover__arrow\" [class.mc-popover__arrow_with-footer]=\"footer\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:200px;max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:400px;max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:640px;max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:9px;margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:9px;margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:9px;margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:9px;margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:480px;max-height:var(--mc-popover-size-max-height, 480px);border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:10px 16px;height:var(--mc-popover-header-size-height, 10px 16px);padding:10px 16px;padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:16px;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__footer{box-sizing:border-box;margin-top:8px;margin-top:var(--mc-popover-footer-size-margin-top, 8px);height:56px;height:var(--mc-popover-footer-size-height, 56px);padding:12px 16px;padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:12px;width:var(--mc-popover-size-arrow-size, 12px);height:12px;height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:-5.5px;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:9px;left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:9px;right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:-5.5px;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:9px;top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:9px;bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:-5.5px;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:9px;top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:9px;bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:-5.5px;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:9px;left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:9px;right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover-confirm .mc-popover__content{padding:24px 16px 16px}.mc-popover-confirm .mc-popover__content button{margin-top:16px;display:block;margin-left:auto}\n"], directives: [{ type: i1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcPopoverAnimations.popoverState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-popover-component', preserveWhitespaces: false, host: {
                        '(keydown.esc)': 'hide(0)'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [mcPopoverAnimations.popoverState], template: "<div class=\"mc-popover\"\n     [cdkTrapFocus]=\"isTrapFocus\"\n     [cdkTrapFocusAutoCapture]=\"isTrapFocus\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__content\" *ngIf=\"content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__footer\" *ngIf=\"footer\">\n            <ng-container *ngIf=\"isTemplateRef(footer)\" [ngTemplateOutlet]=\"$any(footer)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(footer)\">\n                <div>{{ footer }}</div>\n            </ng-container>\n        </div>\n    </div>\n\n    <div class=\"mc-popover__arrow\" [class.mc-popover__arrow_with-footer]=\"footer\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:200px;max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:400px;max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:640px;max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:9px;margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:9px;margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:9px;margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:9px;margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:480px;max-height:var(--mc-popover-size-max-height, 480px);border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:10px 16px;height:var(--mc-popover-header-size-height, 10px 16px);padding:10px 16px;padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:16px;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__footer{box-sizing:border-box;margin-top:8px;margin-top:var(--mc-popover-footer-size-margin-top, 8px);height:56px;height:var(--mc-popover-footer-size-height, 56px);padding:12px 16px;padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:12px;width:var(--mc-popover-size-arrow-size, 12px);height:12px;height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:-5.5px;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:9px;left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:9px;right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:-5.5px;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:9px;top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:9px;bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:-5.5px;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:9px;top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:9px;bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:-5.5px;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:9px;left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:9px;right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover-confirm .mc-popover__content{padding:24px 16px 16px}.mc-popover-confirm .mc-popover__content button{margin-top:16px;display:block;margin-left:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; } });
export const MC_POPOVER_SCROLL_STRATEGY = new InjectionToken('mc-popover-scroll-strategy');
/** @docs-private */
export function mcPopoverScrollStrategyFactory(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 });
}
/** @docs-private */
export const MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_POPOVER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcPopoverScrollStrategyFactory
};
/** Creates an error to be thrown if the user supplied an invalid popover position. */
export function getMcPopoverInvalidPositionError(position) {
    return Error(`McPopover position "${position}" is invalid.`);
}
export class McPopoverTrigger extends McPopUpTrigger {
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this._hasBackdrop = false;
        this._trigger = PopUpTriggers.Click;
        this._size = PopUpSizes.Normal;
        this._closeOnScroll = false;
        this.backdropClass = 'cdk-overlay-transparent-backdrop';
        this.placementChange = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this.originSelector = '.mc-popover';
    }
    get popoverVisible() {
        return this.visible;
    }
    set popoverVisible(value) {
        super.updateVisible(value);
    }
    get popoverPlacement() {
        return this.placement;
    }
    set popoverPlacement(value) {
        super.updatePlacement(value);
    }
    get popoverPlacementPriority() {
        return this.placementPriority;
    }
    set popoverPlacementPriority(value) {
        super.updatePlacementPriority(value);
    }
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    get header() {
        return this._header;
    }
    set header(value) {
        this._header = value;
        this.updateData();
    }
    get content() {
        return this._content;
    }
    set content(value) {
        this._content = value;
        this.updateData();
    }
    get footer() {
        return this._footer;
    }
    set footer(value) {
        this._footer = value;
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
            this._trigger = PopUpTriggers.Click;
        }
        this.initListeners();
    }
    get size() {
        return this._size;
    }
    set size(value) {
        if ([PopUpSizes.Small, PopUpSizes.Normal, PopUpSizes.Large].includes(value)) {
            this._size = value;
            this.updateClassMap();
        }
        else {
            this._size = PopUpSizes.Normal;
        }
    }
    get customClass() {
        return this._customClass;
    }
    set customClass(value) {
        this._customClass = value;
        this.updateClassMap();
    }
    get closeOnScroll() {
        return this._closeOnScroll;
    }
    set closeOnScroll(value) {
        this._closeOnScroll = coerceBooleanProperty(value);
    }
    get overlayConfig() {
        return {
            panelClass: 'mc-popover__panel',
            hasBackdrop: this.hasBackdrop,
            backdropClass: this.backdropClass
        };
    }
    updateData() {
        if (!this.instance) {
            return;
        }
        this.instance.header = this.header;
        this.instance.content = this.content;
        this.instance.footer = this.footer;
        this.instance.updateTrapFocus(this.trigger !== PopUpTriggers.Focus);
        if (this.isOpen) {
            this.updatePosition(true);
        }
    }
    /** Updates the position of the current popover. */
    updatePosition(reapplyPosition = false) {
        this.overlayRef = this.createOverlay();
        const position = this.overlayRef.getConfig().positionStrategy
            .withPositions(this.getPrioritizedPositions())
            .withPush(true);
        if (reapplyPosition) {
            setTimeout(() => position.reapplyLastPosition());
        }
    }
    getOverlayHandleComponentType() {
        return McPopoverComponent;
    }
    updateClassMap(newPlacement = this.placement) {
        if (!this.instance) {
            return;
        }
        this.instance.updateClassMap(POSITION_TO_CSS_MAP[newPlacement], this.customClass, this.size);
        this.instance.markForCheck();
    }
    closingActions() {
        return merge(this.overlayRef.backdropClick(), this.hasBackdrop ? NEVER : this.overlayRef.outsidePointerEvents(), this.closeOnScroll ? this.scrollDispatcher.scrolled() : NEVER, this.overlayRef.detachments());
    }
}
/** @nocollapse */ /** @nocollapse */ McPopoverTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McPopoverTrigger, deps: [{ token: i3.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_POPOVER_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McPopoverTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McPopoverTrigger, selector: "[mcPopover]", inputs: { popoverVisible: ["mcPopoverVisible", "popoverVisible"], popoverPlacement: ["mcPopoverPlacement", "popoverPlacement"], popoverPlacementPriority: ["mcPopoverPlacementPriority", "popoverPlacementPriority"], hasBackdrop: "hasBackdrop", header: ["mcPopoverHeader", "header"], content: ["mcPopoverContent", "content"], footer: ["mcPopoverFooter", "footer"], disabled: ["mcPopoverDisabled", "disabled"], trigger: ["mcTrigger", "trigger"], size: ["mcPopoverSize", "size"], customClass: ["mcPopoverClass", "customClass"], closeOnScroll: "closeOnScroll", backdropClass: "backdropClass" }, outputs: { placementChange: "mcPopoverPlacementChange", visibleChange: "mcPopoverVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-popover_open": "isOpen" } }, exportAs: ["mcPopover"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McPopoverTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcPopover]',
                    exportAs: 'mcPopover',
                    host: {
                        '[class.mc-popover_open]': 'isOpen',
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i3.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i3.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_POPOVER_SCROLL_STRATEGY]
                }] }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { popoverVisible: [{
                type: Input,
                args: ['mcPopoverVisible']
            }], popoverPlacement: [{
                type: Input,
                args: ['mcPopoverPlacement']
            }], popoverPlacementPriority: [{
                type: Input,
                args: ['mcPopoverPlacementPriority']
            }], hasBackdrop: [{
                type: Input
            }], header: [{
                type: Input,
                args: ['mcPopoverHeader']
            }], content: [{
                type: Input,
                args: ['mcPopoverContent']
            }], footer: [{
                type: Input,
                args: ['mcPopoverFooter']
            }], disabled: [{
                type: Input,
                args: ['mcPopoverDisabled']
            }], trigger: [{
                type: Input,
                args: ['mcTrigger']
            }], size: [{
                type: Input,
                args: ['mcPopoverSize']
            }], customClass: [{
                type: Input,
                args: ['mcPopoverClass']
            }], closeOnScroll: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }], placementChange: [{
                type: Output,
                args: ['mcPopoverPlacementChange']
            }], visibleChange: [{
                type: Output,
                args: ['mcPopoverVisibleChange']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFFSCxPQUFPLEVBQ1AsZ0JBQWdCLEVBRW5CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUdOLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILE9BQU8sRUFDUCxjQUFjLEVBQ2QsZUFBZSxFQUNmLFVBQVUsRUFDVixhQUFhLEVBQ2IsbUJBQW1CLEVBQ3RCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQWUzRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsT0FBTztJQVEzQyxZQUFZLGlCQUFvQztRQUM1QyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQVI3QixXQUFNLEdBQUcsWUFBWSxDQUFDO1FBS3RCLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBSTdCLENBQUM7SUFFRCxjQUFjLENBQUMsU0FBaUIsRUFBRSxXQUFtQixFQUFFLElBQWdCO1FBQ25FLEtBQUssQ0FBQyxjQUFjLENBQ2hCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDekMsQ0FBQztJQUNOLENBQUM7SUFFRCxlQUFlLENBQUMsV0FBb0I7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQzs7cUpBdEJRLGtCQUFrQjt5SUFBbEIsa0JBQWtCLHNJQ3BEL0IsODJDQWlDQSwwME1EaUJnQixDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQzsyRkFFckMsa0JBQWtCO2tCQVo5QixTQUFTOytCQUNJLHNCQUFzQix1QkFFWCxLQUFLLFFBRXBCO3dCQUNGLGVBQWUsRUFBRSxTQUFTO3FCQUM3QixpQkFDYyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNLGNBQ25DLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDOztBQTJCbEQsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQ25DLElBQUksY0FBYyxDQUF1Qiw0QkFBNEIsQ0FBQyxDQUFDO0FBRTNFLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsOEJBQThCLENBQUMsT0FBZ0I7SUFDM0QsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUVELG9CQUFvQjtBQUNwQixNQUFNLENBQUMsTUFBTSwyQ0FBMkMsR0FBRztJQUN2RCxPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNmLFVBQVUsRUFBRSw4QkFBOEI7Q0FDN0MsQ0FBQztBQUVGLHNGQUFzRjtBQUN0RixNQUFNLFVBQVUsZ0NBQWdDLENBQUMsUUFBZ0I7SUFDN0QsT0FBTyxLQUFLLENBQUMsdUJBQXVCLFFBQVEsZUFBZSxDQUFDLENBQUM7QUFDakUsQ0FBQztBQVlELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxjQUFrQztJQTZKcEUsWUFDSSxPQUFnQixFQUNoQixVQUFzQixFQUN0QixNQUFjLEVBQ2QsZ0JBQWtDLEVBQ2xDLFFBQTBCLEVBQ1UsY0FBYyxFQUN0QyxTQUF5QjtRQUVyQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQWpJdEYsaUJBQVksR0FBWSxLQUFLLENBQUM7UUErRDlCLGFBQVEsR0FBVyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBaUJ2QyxVQUFLLEdBQWUsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQXNCdEMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBVyxrQ0FBa0MsQ0FBQztRQUVoQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdkMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRXBFLG1CQUFjLEdBQUcsYUFBYSxDQUFDO0lBb0J6QyxDQUFDO0lBdEtELElBQ0ksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxjQUFjLENBQUMsS0FBYztRQUM3QixLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUNJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksZ0JBQWdCLENBQUMsS0FBc0I7UUFDdkMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFDSSx3QkFBd0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksd0JBQXdCLENBQUMsS0FBSztRQUM5QixLQUFLLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELElBQ0ksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFJRCxJQUNJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLEtBQWdDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBSUQsSUFDSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFnQztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQ0ksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBZ0M7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFJRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUNJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLEtBQWE7UUFDckIsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN6QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFJRCxJQUNJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQWlCO1FBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUVuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztTQUNsQztJQUNMLENBQUM7SUFJRCxJQUNJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLEtBQWE7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUNJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksYUFBYSxDQUFDLEtBQWM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBWUQsSUFBYyxhQUFhO1FBQ3ZCLE9BQU87WUFDSCxVQUFVLEVBQUUsbUJBQW1CO1lBQy9CLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDcEMsQ0FBQztJQUNOLENBQUM7SUFjRCxVQUFVO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsY0FBYyxDQUFDLGtCQUEyQixLQUFLO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXZDLE1BQU0sUUFBUSxHQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsZ0JBQXNEO2FBQy9GLGFBQWEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzthQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEIsSUFBSSxlQUFlLEVBQUU7WUFDakIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDcEQ7SUFDTCxDQUFDO0lBRUQsNkJBQTZCO1FBQ3pCLE9BQU8sa0JBQWtCLENBQUM7SUFDOUIsQ0FBQztJQUVELGNBQWMsQ0FBQyxlQUF1QixJQUFJLENBQUMsU0FBUztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUUvQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxLQUFLLENBQ1IsSUFBSSxDQUFDLFVBQVcsQ0FBQyxhQUFhLEVBQUUsRUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVyxDQUFDLG9CQUFvQixFQUFFLEVBQ2xFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUM3RCxJQUFJLENBQUMsVUFBVyxDQUFDLFdBQVcsRUFBRSxDQUNqQyxDQUFDO0lBQ04sQ0FBQzs7bUpBdE5RLGdCQUFnQix5SkFtS2IsMEJBQTBCO3VJQW5LN0IsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBVDVCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO29CQUNyQixJQUFJLEVBQUU7d0JBQ0YseUJBQXlCLEVBQUUsUUFBUTt3QkFDbkMsV0FBVyxFQUFFLHVCQUF1Qjt3QkFDcEMsWUFBWSxFQUFFLGtCQUFrQjtxQkFDbkM7aUJBQ0o7OzBCQW9LUSxNQUFNOzJCQUFDLDBCQUEwQjs7MEJBQ2pDLFFBQVE7NENBbEtULGNBQWM7c0JBRGpCLEtBQUs7dUJBQUMsa0JBQWtCO2dCQVVyQixnQkFBZ0I7c0JBRG5CLEtBQUs7dUJBQUMsb0JBQW9CO2dCQVV2Qix3QkFBd0I7c0JBRDNCLEtBQUs7dUJBQUMsNEJBQTRCO2dCQVUvQixXQUFXO3NCQURkLEtBQUs7Z0JBWUYsTUFBTTtzQkFEVCxLQUFLO3VCQUFDLGlCQUFpQjtnQkFjcEIsT0FBTztzQkFEVixLQUFLO3VCQUFDLGtCQUFrQjtnQkFZckIsTUFBTTtzQkFEVCxLQUFLO3VCQUFDLGlCQUFpQjtnQkFjcEIsUUFBUTtzQkFEWCxLQUFLO3VCQUFDLG1CQUFtQjtnQkFVdEIsT0FBTztzQkFEVixLQUFLO3VCQUFDLFdBQVc7Z0JBa0JkLElBQUk7c0JBRFAsS0FBSzt1QkFBQyxlQUFlO2dCQWtCbEIsV0FBVztzQkFEZCxLQUFLO3VCQUFDLGdCQUFnQjtnQkFZbkIsYUFBYTtzQkFEaEIsS0FBSztnQkFXRyxhQUFhO3NCQUFyQixLQUFLO2dCQUU4QixlQUFlO3NCQUFsRCxNQUFNO3VCQUFDLDBCQUEwQjtnQkFFQSxhQUFhO3NCQUE5QyxNQUFNO3VCQUFDLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICAgIE92ZXJsYXksXG4gICAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPdmVybGF5Q29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXkvb3ZlcmxheS1jb25maWcnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFR5cGUsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgTWNQb3BVcCxcbiAgICBNY1BvcFVwVHJpZ2dlcixcbiAgICBQb3BVcFBsYWNlbWVudHMsXG4gICAgUG9wVXBTaXplcyxcbiAgICBQb3BVcFRyaWdnZXJzLFxuICAgIFBPU0lUSU9OX1RPX0NTU19NQVBcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIE5FVkVSIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IG1jUG9wb3ZlckFuaW1hdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItYW5pbWF0aW9ucyc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wb3BvdmVyLWNvbXBvbmVudCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIHN0eWxlVXJsczogWycuL3BvcG92ZXIuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duLmVzYyknOiAnaGlkZSgwKSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW21jUG9wb3ZlckFuaW1hdGlvbnMucG9wb3ZlclN0YXRlXVxufSlcbmV4cG9ydCBjbGFzcyBNY1BvcG92ZXJDb21wb25lbnQgZXh0ZW5kcyBNY1BvcFVwIHtcbiAgICBwcmVmaXggPSAnbWMtcG9wb3Zlcic7XG5cbiAgICBoZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgZm9vdGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgaXNUcmFwRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihjaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xhc3NNYXAocGxhY2VtZW50OiBzdHJpbmcsIGN1c3RvbUNsYXNzOiBzdHJpbmcsIHNpemU6IFBvcFVwU2l6ZXMpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlQ2xhc3NNYXAoXG4gICAgICAgICAgICBwbGFjZW1lbnQsXG4gICAgICAgICAgICBjdXN0b21DbGFzcyxcbiAgICAgICAgICAgIHsgW2Ake3RoaXMucHJlZml4fV8ke3NpemV9YF06ICEhc2l6ZSB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlVHJhcEZvY3VzKGlzVHJhcEZvY3VzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNUcmFwRm9jdXMgPSBpc1RyYXBGb2N1cztcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPCgpID0+IFNjcm9sbFN0cmF0ZWd5PignbWMtcG9wb3Zlci1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBtY1BvcG92ZXJTY3JvbGxTdHJhdGVneUZhY3Rvcnkob3ZlcmxheTogT3ZlcmxheSk6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcbiAgICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oeyBzY3JvbGxUaHJvdHRsZTogMjAgfSk7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogbWNQb3BvdmVyU2Nyb2xsU3RyYXRlZ3lGYWN0b3J5XG59O1xuXG4vKiogQ3JlYXRlcyBhbiBlcnJvciB0byBiZSB0aHJvd24gaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCBwb3BvdmVyIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1jUG9wb3ZlckludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gRXJyb3IoYE1jUG9wb3ZlciBwb3NpdGlvbiBcIiR7cG9zaXRpb259XCIgaXMgaW52YWxpZC5gKTtcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1BvcG92ZXJdJyxcbiAgICBleHBvcnRBczogJ21jUG9wb3ZlcicsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXBvcG92ZXJfb3Blbl0nOiAnaXNPcGVuJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQb3BvdmVyVHJpZ2dlciBleHRlbmRzIE1jUG9wVXBUcmlnZ2VyPE1jUG9wb3ZlckNvbXBvbmVudD4ge1xuICAgIEBJbnB1dCgnbWNQb3BvdmVyVmlzaWJsZScpXG4gICAgZ2V0IHBvcG92ZXJWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBwb3BvdmVyVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBzdXBlci51cGRhdGVWaXNpYmxlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclBsYWNlbWVudCcpXG4gICAgZ2V0IHBvcG92ZXJQbGFjZW1lbnQoKTogUG9wVXBQbGFjZW1lbnRzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhY2VtZW50O1xuICAgIH1cblxuICAgIHNldCBwb3BvdmVyUGxhY2VtZW50KHZhbHVlOiBQb3BVcFBsYWNlbWVudHMpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUGxhY2VtZW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclBsYWNlbWVudFByaW9yaXR5JylcbiAgICBnZXQgcG9wb3ZlclBsYWNlbWVudFByaW9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnRQcmlvcml0eTtcbiAgICB9XG5cbiAgICBzZXQgcG9wb3ZlclBsYWNlbWVudFByaW9yaXR5KHZhbHVlKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVBsYWNlbWVudFByaW9yaXR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICAgIH1cblxuICAgIHNldCBoYXNCYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzQmFja2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVySGVhZGVyJylcbiAgICBnZXQgaGVhZGVyKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyO1xuICAgIH1cblxuICAgIHNldCBoZWFkZXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5faGVhZGVyID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGVhZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJDb250ZW50JylcbiAgICBnZXQgY29udGVudCgpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgfVxuXG4gICAgc2V0IGNvbnRlbnQodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyRm9vdGVyJylcbiAgICBnZXQgZm9vdGVyKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9vdGVyO1xuICAgIH1cblxuICAgIHNldCBmb290ZXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5fZm9vdGVyID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9vdGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJEaXNhYmxlZCcpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jVHJpZ2dlcicpXG4gICAgZ2V0IHRyaWdnZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyaWdnZXI7XG4gICAgfVxuXG4gICAgc2V0IHRyaWdnZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIgPSBQb3BVcFRyaWdnZXJzLkNsaWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdHJpZ2dlcjogc3RyaW5nID0gUG9wVXBUcmlnZ2Vycy5DbGljaztcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyU2l6ZScpXG4gICAgZ2V0IHNpemUoKTogUG9wVXBTaXplcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIHNldCBzaXplKHZhbHVlOiBQb3BVcFNpemVzKSB7XG4gICAgICAgIGlmIChbUG9wVXBTaXplcy5TbWFsbCwgUG9wVXBTaXplcy5Ob3JtYWwsIFBvcFVwU2l6ZXMuTGFyZ2VdLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNsYXNzTWFwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zaXplID0gUG9wVXBTaXplcy5Ob3JtYWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaXplOiBQb3BVcFNpemVzID0gUG9wVXBTaXplcy5Ob3JtYWw7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckNsYXNzJylcbiAgICBnZXQgY3VzdG9tQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21DbGFzcztcbiAgICB9XG5cbiAgICBzZXQgY3VzdG9tQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jdXN0b21DbGFzcyA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBjbG9zZU9uU2Nyb2xsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2VPblNjcm9sbDtcbiAgICB9XG5cbiAgICBzZXQgY2xvc2VPblNjcm9sbCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9jbG9zZU9uU2Nyb2xsID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbG9zZU9uU2Nyb2xsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyUGxhY2VtZW50Q2hhbmdlJykgcGxhY2VtZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgnbWNQb3BvdmVyVmlzaWJsZUNoYW5nZScpIHZpc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcm90ZWN0ZWQgb3JpZ2luU2VsZWN0b3IgPSAnLm1jLXBvcG92ZXInO1xuXG4gICAgcHJvdGVjdGVkIGdldCBvdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFuZWxDbGFzczogJ21jLXBvcG92ZXJfX3BhbmVsJyxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0aGlzLmhhc0JhY2tkcm9wLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5iYWNrZHJvcENsYXNzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgQEluamVjdChNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgIEBPcHRpb25hbCgpIGRpcmVjdGlvbjogRGlyZWN0aW9uYWxpdHlcbiAgICApIHtcbiAgICAgICAgc3VwZXIob3ZlcmxheSwgZWxlbWVudFJlZiwgbmdab25lLCBzY3JvbGxEaXNwYXRjaGVyLCBob3N0Vmlldywgc2Nyb2xsU3RyYXRlZ3ksIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuaGVhZGVyID0gdGhpcy5oZWFkZXI7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UuY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5mb290ZXIgPSB0aGlzLmZvb3RlcjtcblxuICAgICAgICB0aGlzLmluc3RhbmNlLnVwZGF0ZVRyYXBGb2N1cyh0aGlzLnRyaWdnZXIgIT09IFBvcFVwVHJpZ2dlcnMuRm9jdXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBwb3BvdmVyLiAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKHJlYXBwbHlQb3NpdGlvbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gKHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSlcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSlcbiAgICAgICAgICAgIC53aXRoUHVzaCh0cnVlKTtcblxuICAgICAgICBpZiAocmVhcHBseVBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBvc2l0aW9uLnJlYXBwbHlMYXN0UG9zaXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPdmVybGF5SGFuZGxlQ29tcG9uZW50VHlwZSgpOiBUeXBlPE1jUG9wb3ZlckNvbXBvbmVudD4ge1xuICAgICAgICByZXR1cm4gTWNQb3BvdmVyQ29tcG9uZW50O1xuICAgIH1cblxuICAgIHVwZGF0ZUNsYXNzTWFwKG5ld1BsYWNlbWVudDogc3RyaW5nID0gdGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UudXBkYXRlQ2xhc3NNYXAoUE9TSVRJT05fVE9fQ1NTX01BUFtuZXdQbGFjZW1lbnRdLCB0aGlzLmN1c3RvbUNsYXNzLCB0aGlzLnNpemUpO1xuICAgICAgICB0aGlzLmluc3RhbmNlLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNsb3NpbmdBY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYhLmJhY2tkcm9wQ2xpY2soKSxcbiAgICAgICAgICAgIHRoaXMuaGFzQmFja2Ryb3AgPyBORVZFUiA6IHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKSxcbiAgICAgICAgICAgIHRoaXMuY2xvc2VPblNjcm9sbCA/IHRoaXMuc2Nyb2xsRGlzcGF0Y2hlci5zY3JvbGxlZCgpIDogTkVWRVIsXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYhLmRldGFjaG1lbnRzKClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWMtcG9wb3ZlclwiXG4gICAgIFtjZGtUcmFwRm9jdXNdPVwiaXNUcmFwRm9jdXNcIlxuICAgICBbY2RrVHJhcEZvY3VzQXV0b0NhcHR1cmVdPVwiaXNUcmFwRm9jdXNcIlxuICAgICBbbmdDbGFzc109XCJjbGFzc01hcFwiXG4gICAgIFtAc3RhdGVdPVwidmlzaWJpbGl0eVwiXG4gICAgIChAc3RhdGUuc3RhcnQpPVwiYW5pbWF0aW9uU3RhcnQoKVwiXG4gICAgIChAc3RhdGUuZG9uZSk9XCJhbmltYXRpb25Eb25lKCRldmVudClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy1wb3BvdmVyX19jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXBvcG92ZXJfX2hlYWRlclwiICpuZ0lmPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNUZW1wbGF0ZVJlZihoZWFkZXIpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShoZWFkZXIpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzVGVtcGxhdGVSZWYoaGVhZGVyKVwiPlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgaGVhZGVyIH19PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXBvcG92ZXJfX2NvbnRlbnRcIiAqbmdJZj1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShjb250ZW50KVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBjb250ZW50IH19PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXBvcG92ZXJfX2Zvb3RlclwiICpuZ0lmPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNUZW1wbGF0ZVJlZihmb290ZXIpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShmb290ZXIpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzVGVtcGxhdGVSZWYoZm9vdGVyKVwiPlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgZm9vdGVyIH19PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9fYXJyb3dcIiBbY2xhc3MubWMtcG9wb3Zlcl9fYXJyb3dfd2l0aC1mb290ZXJdPVwiZm9vdGVyXCI+PC9kaXY+XG48L2Rpdj5cbiJdfQ==
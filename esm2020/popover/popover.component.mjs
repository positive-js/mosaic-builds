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
/** @nocollapse */ /** @nocollapse */ McPopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPopoverComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McPopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McPopoverComponent, selector: "mc-popover-component", host: { listeners: { "keydown.esc": "hide(0)" } }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-popover\"\n     [cdkTrapFocus]=\"isTrapFocus\"\n     [cdkTrapFocusAutoCapture]=\"isTrapFocus\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__content\"\n             [ngClass]=\"{ 'mc-popover__content_padding_bottom': footer }\"\n             *ngIf=\"content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__footer\" *ngIf=\"footer\">\n            <ng-container *ngIf=\"isTemplateRef(footer)\" [ngTemplateOutlet]=\"$any(footer)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(footer)\">\n                <div>{{ footer }}</div>\n            </ng-container>\n        </div>\n    </div>\n\n    <div class=\"mc-popover__arrow\" [class.mc-popover__arrow_with-footer]=\"footer\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:var(--mc-popover-size-max-height, 480px);border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:var(--mc-popover-header-size-height, 10px 16px);padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__content.mc-popover__content_padding_bottom{padding-bottom:calc(var(--mc-popover-size-padding, 16px) + var(--mc-popover-footer-size-margin-top, 8px))}.mc-popover__footer{box-sizing:border-box;height:var(--mc-popover-footer-size-height, 56px);padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:var(--mc-popover-size-arrow-size, 12px);height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover-confirm .mc-popover__content{padding:24px 16px 16px}.mc-popover-confirm .mc-popover__content button{margin-top:16px;display:block;margin-left:auto}\n"], directives: [{ type: i1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcPopoverAnimations.popoverState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-popover-component', preserveWhitespaces: false, host: {
                        '(keydown.esc)': 'hide(0)'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [mcPopoverAnimations.popoverState], template: "<div class=\"mc-popover\"\n     [cdkTrapFocus]=\"isTrapFocus\"\n     [cdkTrapFocusAutoCapture]=\"isTrapFocus\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__content\"\n             [ngClass]=\"{ 'mc-popover__content_padding_bottom': footer }\"\n             *ngIf=\"content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__footer\" *ngIf=\"footer\">\n            <ng-container *ngIf=\"isTemplateRef(footer)\" [ngTemplateOutlet]=\"$any(footer)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(footer)\">\n                <div>{{ footer }}</div>\n            </ng-container>\n        </div>\n    </div>\n\n    <div class=\"mc-popover__arrow\" [class.mc-popover__arrow_with-footer]=\"footer\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:var(--mc-popover-size-max-height, 480px);border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:var(--mc-popover-header-size-height, 10px 16px);padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__content.mc-popover__content_padding_bottom{padding-bottom:calc(var(--mc-popover-size-padding, 16px) + var(--mc-popover-footer-size-margin-top, 8px))}.mc-popover__footer{box-sizing:border-box;height:var(--mc-popover-footer-size-height, 56px);padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:var(--mc-popover-size-arrow-size, 12px);height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover-confirm .mc-popover__content{padding:24px 16px 16px}.mc-popover-confirm .mc-popover__content button{margin-top:16px;display:block;margin-left:auto}\n"] }]
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
/** @nocollapse */ /** @nocollapse */ McPopoverTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPopoverTrigger, deps: [{ token: i3.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_POPOVER_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McPopoverTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McPopoverTrigger, selector: "[mcPopover]", inputs: { popoverVisible: ["mcPopoverVisible", "popoverVisible"], popoverPlacement: ["mcPopoverPlacement", "popoverPlacement"], popoverPlacementPriority: ["mcPopoverPlacementPriority", "popoverPlacementPriority"], hasBackdrop: "hasBackdrop", header: ["mcPopoverHeader", "header"], content: ["mcPopoverContent", "content"], footer: ["mcPopoverFooter", "footer"], disabled: ["mcPopoverDisabled", "disabled"], trigger: ["mcTrigger", "trigger"], size: ["mcPopoverSize", "size"], customClass: ["mcPopoverClass", "customClass"], closeOnScroll: "closeOnScroll", backdropClass: "backdropClass" }, outputs: { placementChange: "mcPopoverPlacementChange", visibleChange: "mcPopoverVisibleChange" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-popover_open": "isOpen" } }, exportAs: ["mcPopover"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPopoverTrigger, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFFSCxPQUFPLEVBQ1AsZ0JBQWdCLEVBRW5CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUdOLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILE9BQU8sRUFDUCxjQUFjLEVBQ2QsZUFBZSxFQUNmLFVBQVUsRUFDVixhQUFhLEVBQ2IsbUJBQW1CLEVBQ3RCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQWUzRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsT0FBTztJQVEzQyxZQUFZLGlCQUFvQztRQUM1QyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQVI3QixXQUFNLEdBQUcsWUFBWSxDQUFDO1FBS3RCLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBSTdCLENBQUM7SUFFRCxjQUFjLENBQUMs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O3NCQURULEtBQUs7dUJBQUMsaUJBQWlCO2dCQWNwQixRQUFRO3NCQURYLEtBQUs7dUJBQUMsbUJBQW1CO2dCQVV0QixPQUFPO3NCQURWLEtBQUs7dUJBQUMsV0FBVztnQkFrQmQsSUFBSTtzQkFEUCxLQUFLO3VCQUFDLGVBQWU7Z0JBa0JsQixXQUFXO3NCQURkLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQVluQixhQUFhO3NCQURoQixLQUFLO2dCQVdHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRThCLGVBQWU7c0JBQWxELE1BQU07dUJBQUMsMEJBQTBCO2dCQUVBLGFBQWE7c0JBQTlDLE1BQU07dUJBQUMsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgT3ZlcmxheSxcbiAgICBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE92ZXJsYXlDb25maWcgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheS9vdmVybGF5LWNvbmZpZyc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVHlwZSxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBNY1BvcFVwLFxuICAgIE1jUG9wVXBUcmlnZ2VyLFxuICAgIFBvcFVwUGxhY2VtZW50cyxcbiAgICBQb3BVcFNpemVzLFxuICAgIFBvcFVwVHJpZ2dlcnMsXG4gICAgUE9TSVRJT05fVE9fQ1NTX01BUFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgTkVWRVIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgbWNQb3BvdmVyQW5pbWF0aW9ucyB9IGZyb20gJy4vcG9wb3Zlci1hbmltYXRpb25zJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXBvcG92ZXItY29tcG9uZW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgc3R5bGVVcmxzOiBbJy4vcG9wb3Zlci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24uZXNjKSc6ICdoaWRlKDApJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbbWNQb3BvdmVyQW5pbWF0aW9ucy5wb3BvdmVyU3RhdGVdXG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3ZlckNvbXBvbmVudCBleHRlbmRzIE1jUG9wVXAge1xuICAgIHByZWZpeCA9ICdtYy1wb3BvdmVyJztcblxuICAgIGhlYWRlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgICBmb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBpc1RyYXBGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDbGFzc01hcChwbGFjZW1lbnQ6IHN0cmluZywgY3VzdG9tQ2xhc3M6IHN0cmluZywgc2l6ZTogUG9wVXBTaXplcykge1xuICAgICAgICBzdXBlci51cGRhdGVDbGFzc01hcChcbiAgICAgICAgICAgIHBsYWNlbWVudCxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzLFxuICAgICAgICAgICAgeyBbYCR7dGhpcy5wcmVmaXh9XyR7c2l6ZX1gXTogISFzaXplIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUcmFwRm9jdXMoaXNUcmFwRm9jdXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1RyYXBGb2N1cyA9IGlzVHJhcEZvY3VzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1wb3BvdmVyLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jUG9wb3ZlclNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7IHNjcm9sbFRocm90dGxlOiAyMCB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1BvcG92ZXJTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbi8qKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biBpZiB0aGUgdXNlciBzdXBwbGllZCBhbiBpbnZhbGlkIHBvcG92ZXIgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNQb3BvdmVySW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBFcnJvcihgTWNQb3BvdmVyIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jUG9wb3Zlcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNQb3BvdmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtcG9wb3Zlcl9vcGVuXSc6ICdpc09wZW4nLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1BvcG92ZXJUcmlnZ2VyIGV4dGVuZHMgTWNQb3BVcFRyaWdnZXI8TWNQb3BvdmVyQ29tcG9uZW50PiB7XG4gICAgQElucHV0KCdtY1BvcG92ZXJWaXNpYmxlJylcbiAgICBnZXQgcG9wb3ZlclZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGU7XG4gICAgfVxuXG4gICAgc2V0IHBvcG92ZXJWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVZpc2libGUodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyUGxhY2VtZW50JylcbiAgICBnZXQgcG9wb3ZlclBsYWNlbWVudCgpOiBQb3BVcFBsYWNlbWVudHMge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgc2V0IHBvcG92ZXJQbGFjZW1lbnQodmFsdWU6IFBvcFVwUGxhY2VtZW50cykge1xuICAgICAgICBzdXBlci51cGRhdGVQbGFjZW1lbnQodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyUGxhY2VtZW50UHJpb3JpdHknKVxuICAgIGdldCBwb3BvdmVyUGxhY2VtZW50UHJpb3JpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYWNlbWVudFByaW9yaXR5O1xuICAgIH1cblxuICAgIHNldCBwb3BvdmVyUGxhY2VtZW50UHJpb3JpdHkodmFsdWUpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUGxhY2VtZW50UHJpb3JpdHkodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhhc0JhY2tkcm9wKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzQmFja2Ryb3A7XG4gICAgfVxuXG4gICAgc2V0IGhhc0JhY2tkcm9wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hhc0JhY2tkcm9wID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNCYWNrZHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJIZWFkZXInKVxuICAgIGdldCBoZWFkZXIoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXI7XG4gICAgfVxuXG4gICAgc2V0IGhlYWRlcih2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9oZWFkZXIgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oZWFkZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckNvbnRlbnQnKVxuICAgIGdldCBjb250ZW50KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudCh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9jb250ZW50ID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY1BvcG92ZXJGb290ZXInKVxuICAgIGdldCBmb290ZXIoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb290ZXI7XG4gICAgfVxuXG4gICAgc2V0IGZvb3Rlcih2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pikge1xuICAgICAgICB0aGlzLl9mb290ZXIgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9mb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckRpc2FibGVkJylcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWNUcmlnZ2VyJylcbiAgICBnZXQgdHJpZ2dlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHJpZ2dlcjtcbiAgICB9XG5cbiAgICBzZXQgdHJpZ2dlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlciA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlciA9IFBvcFVwVHJpZ2dlcnMuQ2xpY2s7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90cmlnZ2VyOiBzdHJpbmcgPSBQb3BVcFRyaWdnZXJzLkNsaWNrO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJTaXplJylcbiAgICBnZXQgc2l6ZSgpOiBQb3BVcFNpemVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgc2V0IHNpemUodmFsdWU6IFBvcFVwU2l6ZXMpIHtcbiAgICAgICAgaWYgKFtQb3BVcFNpemVzLlNtYWxsLCBQb3BVcFNpemVzLk5vcm1hbCwgUG9wVXBTaXplcy5MYXJnZV0uaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9zaXplID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSBQb3BVcFNpemVzLk5vcm1hbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NpemU6IFBvcFVwU2l6ZXMgPSBQb3BVcFNpemVzLk5vcm1hbDtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyQ2xhc3MnKVxuICAgIGdldCBjdXN0b21DbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbUNsYXNzO1xuICAgIH1cblxuICAgIHNldCBjdXN0b21DbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2N1c3RvbUNsYXNzID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDbGFzc01hcCgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNsb3NlT25TY3JvbGwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbG9zZU9uU2Nyb2xsO1xuICAgIH1cblxuICAgIHNldCBjbG9zZU9uU2Nyb2xsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Nsb3NlT25TY3JvbGwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Nsb3NlT25TY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M6IHN0cmluZyA9ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCc7XG5cbiAgICBAT3V0cHV0KCdtY1BvcG92ZXJQbGFjZW1lbnRDaGFuZ2UnKSBwbGFjZW1lbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCdtY1BvcG92ZXJWaXNpYmxlQ2hhbmdlJykgdmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIHByb3RlY3RlZCBvcmlnaW5TZWxlY3RvciA9ICcubWMtcG9wb3Zlcic7XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYW5lbENsYXNzOiAnbWMtcG9wb3Zlcl9fcGFuZWwnLFxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IHRoaXMuaGFzQmFja2Ryb3AsXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmJhY2tkcm9wQ2xhc3NcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICBzdXBlcihvdmVybGF5LCBlbGVtZW50UmVmLCBuZ1pvbmUsIHNjcm9sbERpc3BhdGNoZXIsIGhvc3RWaWV3LCBzY3JvbGxTdHJhdGVneSwgZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZS5oZWFkZXIgPSB0aGlzLmhlYWRlcjtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5jb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICB0aGlzLmluc3RhbmNlLmZvb3RlciA9IHRoaXMuZm9vdGVyO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UudXBkYXRlVHJhcEZvY3VzKHRoaXMudHJpZ2dlciAhPT0gUG9wVXBUcmlnZ2Vycy5Gb2N1cyk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHBvcG92ZXIuICovXG4gICAgdXBkYXRlUG9zaXRpb24ocmVhcHBseVBvc2l0aW9uOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KCk7XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSAodGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5KVxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnModGhpcy5nZXRQcmlvcml0aXplZFBvc2l0aW9ucygpKVxuICAgICAgICAgICAgLndpdGhQdXNoKHRydWUpO1xuXG4gICAgICAgIGlmIChyZWFwcGx5UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcG9zaXRpb24ucmVhcHBseUxhc3RQb3NpdGlvbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE92ZXJsYXlIYW5kbGVDb21wb25lbnRUeXBlKCk6IFR5cGU8TWNQb3BvdmVyQ29tcG9uZW50PiB7XG4gICAgICAgIHJldHVybiBNY1BvcG92ZXJDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xhc3NNYXAobmV3UGxhY2VtZW50OiBzdHJpbmcgPSB0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZS51cGRhdGVDbGFzc01hcChQT1NJVElPTl9UT19DU1NfTUFQW25ld1BsYWNlbWVudF0sIHRoaXMuY3VzdG9tQ2xhc3MsIHRoaXMuc2l6ZSk7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY2xvc2luZ0FjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEuYmFja2Ryb3BDbGljaygpLFxuICAgICAgICAgICAgdGhpcy5oYXNCYWNrZHJvcCA/IE5FVkVSIDogdGhpcy5vdmVybGF5UmVmIS5vdXRzaWRlUG9pbnRlckV2ZW50cygpLFxuICAgICAgICAgICAgdGhpcy5jbG9zZU9uU2Nyb2xsID8gdGhpcy5zY3JvbGxEaXNwYXRjaGVyLnNjcm9sbGVkKCkgOiBORVZFUixcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZiEuZGV0YWNobWVudHMoKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtYy1wb3BvdmVyXCJcbiAgICAgW2Nka1RyYXBGb2N1c109XCJpc1RyYXBGb2N1c1wiXG4gICAgIFtjZGtUcmFwRm9jdXNBdXRvQ2FwdHVyZV09XCJpc1RyYXBGb2N1c1wiXG4gICAgIFtuZ0NsYXNzXT1cImNsYXNzTWFwXCJcbiAgICAgW0BzdGF0ZV09XCJ2aXNpYmlsaXR5XCJcbiAgICAgKEBzdGF0ZS5zdGFydCk9XCJhbmltYXRpb25TdGFydCgpXCJcbiAgICAgKEBzdGF0ZS5kb25lKT1cImFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLXBvcG92ZXJfX2NvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9faGVhZGVyXCIgKm5nSWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGhlYWRlcilcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KGhlYWRlcilcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNUZW1wbGF0ZVJlZihoZWFkZXIpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBoZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9fY29udGVudFwiXG4gICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAnbWMtcG9wb3Zlcl9fY29udGVudF9wYWRkaW5nX2JvdHRvbSc6IGZvb3RlciB9XCJcbiAgICAgICAgICAgICAqbmdJZj1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShjb250ZW50KVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc1RlbXBsYXRlUmVmKGNvbnRlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBjb250ZW50IH19PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1jLXBvcG92ZXJfX2Zvb3RlclwiICpuZ0lmPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNUZW1wbGF0ZVJlZihmb290ZXIpXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiJGFueShmb290ZXIpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzVGVtcGxhdGVSZWYoZm9vdGVyKVwiPlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgZm9vdGVyIH19PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9fYXJyb3dcIiBbY2xhc3MubWMtcG9wb3Zlcl9fYXJyb3dfd2l0aC1mb290ZXJdPVwiZm9vdGVyXCI+PC9kaXY+XG48L2Rpdj5cbiJdfQ==
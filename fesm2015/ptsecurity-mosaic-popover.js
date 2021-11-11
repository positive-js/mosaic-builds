import * as i2 from '@angular/cdk/overlay';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, InjectionToken, Directive, Inject, Optional, Input, NgModule } from '@angular/core';
import * as i3 from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { McPopUp, McPopUpTrigger, PopUpTriggers, PopUpSizes, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { merge, NEVER } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

const mcPopoverAnimations = {
    /** Animation that transitions a tooltip in and out. */
    popoverState: trigger('state', [
        state('initial', style({
            opacity: 0,
            transform: 'scale(1, 0.8)'
        })),
        transition('* => visible', animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
            opacity: 1,
            transform: 'scale(1, 1)'
        }))),
        transition('* => hidden', animate('100ms linear', style({ opacity: 0 })))
    ])
};

class McPopoverComponent extends McPopUp {
    constructor(changeDetectorRef) {
        super(changeDetectorRef);
        this.prefix = 'mc-popover';
    }
    updateClassMap(placement, customClass, size) {
        super.updateClassMap(placement, customClass, { [`${this.prefix}_${size}`]: !!size });
    }
}
/** @nocollapse */ McPopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McPopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McPopoverComponent, selector: "mc-popover-component", host: { listeners: { "keydown.esc": "hide(0)" } }, usesInheritance: true, ngImport: i0, template: "<div class=\"mc-popover\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n\n    <div class=\"mc-popover__container\">\n        <div class=\"mc-popover__header\" *ngIf=\"header\">\n            <ng-container *ngIf=\"isTemplateRef(header)\" [ngTemplateOutlet]=\"$any(header)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(header)\">\n                <div>{{ header }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__content\" *ngIf=\"content\">\n            <ng-container *ngIf=\"isTemplateRef(content)\" [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(content)\">\n                <div>{{ content }}</div>\n            </ng-container>\n        </div>\n\n        <div class=\"mc-popover__footer\" *ngIf=\"footer\">\n            <ng-container *ngIf=\"isTemplateRef(footer)\" [ngTemplateOutlet]=\"$any(footer)\"></ng-container>\n            <ng-container *ngIf=\"!isTemplateRef(footer)\">\n                <div>{{ footer }}</div>\n            </ng-container>\n        </div>\n    </div>\n\n    <div class=\"mc-popover__arrow\" [class.mc-popover__arrow_with-footer]=\"footer\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:200px;max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:400px;max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:640px;max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:calc(9px);margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:calc(9px);margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:calc(9px);margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:calc(9px);margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:480px;max-height:var(--mc-popover-size-max-height, 480px);border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:10px 16px;height:var(--mc-popover-header-size-height, 10px 16px);padding:10px 16px;padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:16px;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__footer{box-sizing:border-box;margin-top:8px;margin-top:var(--mc-popover-footer-size-margin-top, 8px);height:56px;height:var(--mc-popover-footer-size-height, 56px);padding:12px 16px;padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:12px;width:var(--mc-popover-size-arrow-size, 12px);height:12px;height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc((11px / -2));bottom:calc((var(--mc-popover-size-arrow-size, 11px) / -2));left:50%;margin-left:calc((11px / -2));margin-left:calc((var(--mc-popover-size-arrow-size, 11px) / -2))}.mc-popover_placement-top-left .mc-popover__arrow{bottom:calc((11px / -2));bottom:calc((var(--mc-popover-size-arrow-size, 11px) / -2));left:calc(18px - 9px);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc((11px / -2));bottom:calc((var(--mc-popover-size-arrow-size, 11px) / -2));right:calc(18px - 9px);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:calc((11px / -2));left:calc((var(--mc-popover-size-arrow-size, 11px) / -2));top:50%;margin-top:calc((11px / -2));margin-top:calc((var(--mc-popover-size-arrow-size, 11px) / -2))}.mc-popover_placement-right-top .mc-popover__arrow{left:calc((11px / -2));left:calc((var(--mc-popover-size-arrow-size, 11px) / -2));top:calc(18px - 9px);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc((11px / -2));left:calc((var(--mc-popover-size-arrow-size, 11px) / -2));bottom:calc(18px - 9px);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:calc((11px / -2));right:calc((var(--mc-popover-size-arrow-size, 11px) / -2));top:50%;margin-top:calc((11px / -2));margin-top:calc((var(--mc-popover-size-arrow-size, 11px) / -2))}.mc-popover_placement-left-top .mc-popover__arrow{right:calc((11px / -2));right:calc((var(--mc-popover-size-arrow-size, 11px) / -2));top:calc(18px - 9px);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc((11px / -2));right:calc((var(--mc-popover-size-arrow-size, 11px) / -2));bottom:calc(18px - 9px);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc((11px / -2));top:calc((var(--mc-popover-size-arrow-size, 11px) / -2));left:50%;margin-left:calc((11px / -2));margin-left:calc((var(--mc-popover-size-arrow-size, 11px) / -2))}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc((11px / -2));top:calc((var(--mc-popover-size-arrow-size, 11px) / -2));left:calc(18px - 9px);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc((11px / -2));top:calc((var(--mc-popover-size-arrow-size, 11px) / -2));right:calc(18px - 9px);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [mcPopoverAnimations.popoverState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-popover-component',
                    templateUrl: './popover.component.html',
                    preserveWhitespaces: false,
                    styleUrls: ['./popover.scss'],
                    host: {
                        '(keydown.esc)': 'hide(0)'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [mcPopoverAnimations.popoverState]
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; } });
const MC_POPOVER_SCROLL_STRATEGY = new InjectionToken('mc-popover-scroll-strategy');
/** @docs-private */
function mcPopoverScrollStrategyFactory(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: 20 });
}
/** @docs-private */
const MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_POPOVER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: mcPopoverScrollStrategyFactory
};
/** Creates an error to be thrown if the user supplied an invalid popover position. */
function getMcPopoverInvalidPositionError(position) {
    return Error(`McPopover position "${position}" is invalid.`);
}
class McPopoverTrigger extends McPopUpTrigger {
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this._hasBackdrop = false;
        this._trigger = PopUpTriggers.Click;
        this._size = PopUpSizes.Normal;
        this._closeOnScroll = false;
        this.backdropClass = 'cdk-overlay-transparent-backdrop';
        this.originSelector = '.mc-popover';
        this.overlayConfig = {
            panelClass: 'mc-popover__panel',
            hasBackdrop: this.hasBackdrop,
            backdropClass: this.backdropClass
        };
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
    updateData() {
        if (!this.instance) {
            return;
        }
        this.instance.header = this.header;
        this.instance.content = this.content;
        this.instance.footer = this.footer;
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
/** @nocollapse */ McPopoverTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverTrigger, deps: [{ token: i2.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_POPOVER_SCROLL_STRATEGY }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McPopoverTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McPopoverTrigger, selector: "[mcPopover]", inputs: { hasBackdrop: "hasBackdrop", header: ["mcPopoverHeader", "header"], content: ["mcPopoverContent", "content"], footer: ["mcPopoverFooter", "footer"], disabled: ["mcPopoverDisabled", "disabled"], trigger: ["mcTrigger", "trigger"], size: ["mcPopoverSize", "size"], customClass: ["mcPopoverClass", "customClass"], closeOnScroll: "closeOnScroll", backdropClass: "backdropClass" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-popover_open": "isOpen" } }, exportAs: ["mcPopover"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverTrigger, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i2.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_POPOVER_SCROLL_STRATEGY]
                }] }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { hasBackdrop: [{
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
            }] } });

class McPopoverModule {
}
/** @nocollapse */ McPopoverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McPopoverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverModule, declarations: [McPopoverComponent, McPopoverTrigger], imports: [CommonModule, OverlayModule], exports: [McPopoverComponent, McPopoverTrigger] });
/** @nocollapse */ McPopoverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverModule, providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[CommonModule, OverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McPopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [McPopoverComponent, McPopoverTrigger],
                    exports: [McPopoverComponent, McPopoverTrigger],
                    imports: [CommonModule, OverlayModule],
                    providers: [MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER],
                    entryComponents: [McPopoverComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MC_POPOVER_SCROLL_STRATEGY, MC_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER, McPopoverComponent, McPopoverModule, McPopoverTrigger, getMcPopoverInvalidPositionError, mcPopoverAnimations, mcPopoverScrollStrategyFactory };
//# sourceMappingURL=ptsecurity-mosaic-popover.js.map

import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { mcPopoverAnimations } from './popover-animations';
import { MC_POPOVER_SCROLL_STRATEGY, McPopoverComponent, McPopoverTrigger } from './popover.component';
import * as i0 from "@angular/core";
import * as i1 from "@ptsecurity/mosaic/button";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/overlay";
import * as i5 from "@angular/cdk/bidi";
export const MC_POPOVER_CONFIRM_TEXT = new InjectionToken('');
export const MC_POPOVER_CONFIRM_BUTTON_TEXT = new InjectionToken('');
export class McPopoverConfirmComponent extends McPopoverComponent {
    constructor(changeDetectorRef) {
        super(changeDetectorRef);
        this.themePalette = ThemePalette;
        this.onConfirm = new Subject();
    }
}
/** @nocollapse */ /** @nocollapse */ McPopoverConfirmComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPopoverConfirmComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McPopoverConfirmComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McPopoverConfirmComponent, selector: "mc-popover-confirm-component", usesInheritance: true, ngImport: i0, template: "<div class=\"mc-popover-confirm mc-popover\"\n     cdkTrapFocus=\"true\"\n     cdkTrapFocusAutoCapture=\"true\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n    <div class=\"mc-popover__content\">\n        <div>{{ confirmText }}</div>\n        <button mc-button [color]=\"themePalette.Primary\" (click)=\"onConfirm.next()\">{{confirmButtonText}}</button>\n    </div>\n\n    <div class=\"mc-popover__arrow\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:var(--mc-popover-size-max-height, 480px);border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:var(--mc-popover-header-size-height, 10px 16px);padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__content.mc-popover__content_padding_bottom{padding-bottom:calc(var(--mc-popover-size-padding, 16px) + var(--mc-popover-footer-size-margin-top, 8px))}.mc-popover__footer{box-sizing:border-box;height:var(--mc-popover-footer-size-height, 56px);padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:var(--mc-popover-size-arrow-size, 12px);height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover-confirm .mc-popover__content{padding:24px 16px 16px}.mc-popover-confirm .mc-popover__content button{margin-top:16px;display:block;margin-left:auto}\n"], components: [{ type: i1.McButton, selector: "[mc-button]", inputs: ["color", "tabIndex", "disabled"] }], directives: [{ type: i2.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.McButtonCssStyler, selector: "[mc-button]" }], animations: [mcPopoverAnimations.popoverState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPopoverConfirmComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-popover-confirm-component', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [mcPopoverAnimations.popoverState], template: "<div class=\"mc-popover-confirm mc-popover\"\n     cdkTrapFocus=\"true\"\n     cdkTrapFocusAutoCapture=\"true\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n    <div class=\"mc-popover__content\">\n        <div>{{ confirmText }}</div>\n        <button mc-button [color]=\"themePalette.Primary\" (click)=\"onConfirm.next()\">{{confirmButtonText}}</button>\n    </div>\n\n    <div class=\"mc-popover__arrow\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:var(--mc-popover-size-max-height, 480px);border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:var(--mc-popover-header-size-height, 10px 16px);padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__content.mc-popover__content_padding_bottom{padding-bottom:calc(var(--mc-popover-size-padding, 16px) + var(--mc-popover-footer-size-margin-top, 8px))}.mc-popover__footer{box-sizing:border-box;height:var(--mc-popover-footer-size-height, 56px);padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:var(--mc-popover-size-arrow-size, 12px);height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover-confirm .mc-popover__content{padding:24px 16px 16px}.mc-popover-confirm .mc-popover__content button{margin-top:16px;display:block;margin-left:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; } });
export class McPopoverConfirmTrigger extends McPopoverTrigger {
    constructor(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction, confirmText, confirmButtonText) {
        super(overlay, elementRef, ngZone, scrollDispatcher, hostView, scrollStrategy, direction);
        this.confirm = new EventEmitter();
        this._confirmButtonText = 'Да';
        this.confirmText = confirmText || 'Вы уверены, что хотите продолжить?';
        this.confirmButtonText = confirmButtonText || 'Да';
    }
    get confirmText() {
        return this._confirmText;
    }
    set confirmText(value) {
        this._confirmText = value;
        this.updateData();
    }
    get confirmButtonText() {
        return this._confirmButtonText;
    }
    set confirmButtonText(value) {
        this._confirmButtonText = value;
        this.updateData();
    }
    updateData() {
        if (!this.instance) {
            return;
        }
        super.updateData();
        this.setupButtonEvents();
        this.instance.confirmButtonText = this.confirmButtonText;
        this.instance.confirmText = this.confirmText;
    }
    setupButtonEvents() {
        this.instance.onConfirm.pipe(takeUntil(this.destroyed)).subscribe(() => {
            this.confirm.emit();
            this.hide();
        });
    }
    getOverlayHandleComponentType() {
        return McPopoverConfirmComponent;
    }
}
/** @nocollapse */ /** @nocollapse */ McPopoverConfirmTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPopoverConfirmTrigger, deps: [{ token: i4.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i4.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_POPOVER_SCROLL_STRATEGY }, { token: i5.Directionality, optional: true }, { token: MC_POPOVER_CONFIRM_TEXT, optional: true }, { token: MC_POPOVER_CONFIRM_BUTTON_TEXT, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McPopoverConfirmTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McPopoverConfirmTrigger, selector: "[mcPopoverConfirm]", inputs: { confirmText: ["mcPopoverConfirmText", "confirmText"], confirmButtonText: ["mcPopoverConfirmButtonText", "confirmButtonText"] }, outputs: { confirm: "confirm" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-popover_open": "isOpen" } }, exportAs: ["mcPopoverConfirm"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McPopoverConfirmTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcPopoverConfirm]',
                    exportAs: 'mcPopoverConfirm',
                    host: {
                        '[class.mc-popover_open]': 'isOpen',
                        '(keydown)': 'handleKeydown($event)',
                        '(touchend)': 'handleTouchend()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i4.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i4.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_POPOVER_SCROLL_STRATEGY]
                }] }, { type: i5.Directionality, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_POPOVER_CONFIRM_TEXT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_POPOVER_CONFIRM_BUTTON_TEXT]
                }] }]; }, propDecorators: { confirm: [{
                type: Output
            }], confirmText: [{
                type: Input,
                args: ['mcPopoverConfirmText']
            }], confirmButtonText: [{
                type: Input,
                args: ['mcPopoverConfirmButtonText']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb25maXJtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wb3BvdmVyL3BvcG92ZXItY29uZmlybS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLWNvbmZpcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7QUFHdkcsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQVMsRUFBRSxDQUFDLENBQUM7QUFDdEUsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsSUFBSSxjQUFjLENBQVMsRUFBRSxDQUFDLENBQUM7QUFXN0UsTUFB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QXlCLEVBQUUsUUFBUTt3QkFDbkMsV0FBVyxFQUFFLHVCQUF1Qjt3QkFDcEMsWUFBWSxFQUFFLGtCQUFrQjtxQkFDbkM7aUJBQ0o7OzBCQW9DUSxNQUFNOzJCQUFDLDBCQUEwQjs7MEJBQ2pDLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsdUJBQXVCOzswQkFDMUMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyw4QkFBOEI7NENBckM1QyxPQUFPO3NCQUFoQixNQUFNO2dCQUdILFdBQVc7c0JBRGQsS0FBSzt1QkFBQyxzQkFBc0I7Z0JBY3pCLGlCQUFpQjtzQkFEcEIsS0FBSzt1QkFBQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXksIFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWNQb3BvdmVyQW5pbWF0aW9ucyB9IGZyb20gJy4vcG9wb3Zlci1hbmltYXRpb25zJztcbmltcG9ydCB7IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZLCBNY1BvcG92ZXJDb21wb25lbnQsIE1jUG9wb3ZlclRyaWdnZXIgfSBmcm9tICcuL3BvcG92ZXIuY29tcG9uZW50JztcblxuXG5leHBvcnQgY29uc3QgTUNfUE9QT1ZFUl9DT05GSVJNX1RFWFQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignJyk7XG5leHBvcnQgY29uc3QgTUNfUE9QT1ZFUl9DT05GSVJNX0JVVFRPTl9URVhUID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXBvcG92ZXItY29uZmlybS1jb21wb25lbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLWNvbmZpcm0uY29tcG9uZW50Lmh0bWwnLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIHN0eWxlVXJsczogWycuL3BvcG92ZXIuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW21jUG9wb3ZlckFuaW1hdGlvbnMucG9wb3ZlclN0YXRlXVxufSlcbmV4cG9ydCBjbGFzcyBNY1BvcG92ZXJDb25maXJtQ29tcG9uZW50IGV4dGVuZHMgTWNQb3BvdmVyQ29tcG9uZW50IHtcbiAgICB0aGVtZVBhbGV0dGUgPSBUaGVtZVBhbGV0dGU7XG5cbiAgICBvbkNvbmZpcm0gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGNvbmZpcm1CdXR0b25UZXh0OiBzdHJpbmc7XG5cbiAgICBjb25maXJtVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNQb3BvdmVyQ29uZmlybV0nLFxuICAgIGV4cG9ydEFzOiAnbWNQb3BvdmVyQ29uZmlybScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLXBvcG92ZXJfb3Blbl0nOiAnaXNPcGVuJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICAgICAnKHRvdWNoZW5kKSc6ICdoYW5kbGVUb3VjaGVuZCgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNQb3BvdmVyQ29uZmlybVRyaWdnZXIgZXh0ZW5kcyBNY1BvcG92ZXJUcmlnZ2VyIHtcbiAgICBAT3V0cHV0KCkgY29uZmlybTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJDb25maXJtVGV4dCcpXG4gICAgZ2V0IGNvbmZpcm1UZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maXJtVGV4dDtcbiAgICB9XG5cbiAgICBzZXQgY29uZmlybVRleHQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jb25maXJtVGV4dCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbmZpcm1UZXh0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckNvbmZpcm1CdXR0b25UZXh0JylcbiAgICBnZXQgY29uZmlybUJ1dHRvblRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpcm1CdXR0b25UZXh0O1xuICAgIH1cblxuICAgIHNldCBjb25maXJtQnV0dG9uVGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpcm1CdXR0b25UZXh0ID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29uZmlybUJ1dHRvblRleHQ6IHN0cmluZyA9ICfQlNCwJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgaG9zdFZpZXc6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIEBJbmplY3QoTUNfUE9QT1ZFUl9TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICBAT3B0aW9uYWwoKSBkaXJlY3Rpb246IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX1BPUE9WRVJfQ09ORklSTV9URVhUKSBjb25maXJtVGV4dDogc3RyaW5nLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX1BPUE9WRVJfQ09ORklSTV9CVVRUT05fVEVYVCkgY29uZmlybUJ1dHRvblRleHQ6IHN0cmluZ1xuICAgICkge1xuICAgICAgICBzdXBlcihvdmVybGF5LCBlbGVtZW50UmVmLCBuZ1pvbmUsIHNjcm9sbERpc3BhdGNoZXIsIGhvc3RWaWV3LCBzY3JvbGxTdHJhdGVneSwgZGlyZWN0aW9uKTtcblxuICAgICAgICB0aGlzLmNvbmZpcm1UZXh0ID0gY29uZmlybVRleHQgfHwgJ9CS0Ysg0YPQstC10YDQtdC90YssINGH0YLQviDRhdC+0YLQuNGC0LUg0L/RgNC+0LTQvtC70LbQuNGC0Yw/JztcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uVGV4dCA9IGNvbmZpcm1CdXR0b25UZXh0IHx8ICfQlNCwJztcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN1cGVyLnVwZGF0ZURhdGEoKTtcbiAgICAgICAgdGhpcy5zZXR1cEJ1dHRvbkV2ZW50cygpO1xuICAgICAgICB0aGlzLmluc3RhbmNlLmNvbmZpcm1CdXR0b25UZXh0ID0gdGhpcy5jb25maXJtQnV0dG9uVGV4dDtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5jb25maXJtVGV4dCA9IHRoaXMuY29uZmlybVRleHQ7XG4gICAgfVxuXG4gICAgc2V0dXBCdXR0b25FdmVudHMoKSB7XG4gICAgICAgIHRoaXMuaW5zdGFuY2Uub25Db25maXJtLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybS5lbWl0KCk7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T3ZlcmxheUhhbmRsZUNvbXBvbmVudFR5cGUoKSB7XG4gICAgICAgIHJldHVybiBNY1BvcG92ZXJDb25maXJtQ29tcG9uZW50O1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtYy1wb3BvdmVyLWNvbmZpcm0gbWMtcG9wb3ZlclwiXG4gICAgIGNka1RyYXBGb2N1cz1cInRydWVcIlxuICAgICBjZGtUcmFwRm9jdXNBdXRvQ2FwdHVyZT1cInRydWVcIlxuICAgICBbbmdDbGFzc109XCJjbGFzc01hcFwiXG4gICAgIFtAc3RhdGVdPVwidmlzaWJpbGl0eVwiXG4gICAgIChAc3RhdGUuc3RhcnQpPVwiYW5pbWF0aW9uU3RhcnQoKVwiXG4gICAgIChAc3RhdGUuZG9uZSk9XCJhbmltYXRpb25Eb25lKCRldmVudClcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9fY29udGVudFwiPlxuICAgICAgICA8ZGl2Pnt7IGNvbmZpcm1UZXh0IH19PC9kaXY+XG4gICAgICAgIDxidXR0b24gbWMtYnV0dG9uIFtjb2xvcl09XCJ0aGVtZVBhbGV0dGUuUHJpbWFyeVwiIChjbGljayk9XCJvbkNvbmZpcm0ubmV4dCgpXCI+e3tjb25maXJtQnV0dG9uVGV4dH19PC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9fYXJyb3dcIj48L2Rpdj5cbjwvZGl2PlxuIl19
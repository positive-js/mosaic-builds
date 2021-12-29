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
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/overlay";
import * as i4 from "@angular/cdk/bidi";
export const MC_POPOVER_CONFIRM_TEXT = new InjectionToken('');
export const MC_POPOVER_CONFIRM_BUTTON_TEXT = new InjectionToken('');
export class McPopoverConfirmComponent extends McPopoverComponent {
    constructor(changeDetectorRef) {
        super(changeDetectorRef);
        this.themePalette = ThemePalette;
        this.onConfirm = new Subject();
    }
}
/** @nocollapse */ /** @nocollapse */ McPopoverConfirmComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McPopoverConfirmComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McPopoverConfirmComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McPopoverConfirmComponent, selector: "mc-popover-confirm-component", usesInheritance: true, ngImport: i0, template: "<div class=\"mc-popover-confirm mc-popover\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n    <div class=\"mc-popover__content\">\n        <div>{{ confirmText }}</div>\n        <button mc-button [color]=\"themePalette.Primary\" (click)=\"onConfirm.next()\">{{confirmButtonText}}</button>    \n    </div>\n\n    <div class=\"mc-popover__arrow\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:200px;max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:400px;max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:640px;max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:9px;margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:9px;margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:9px;margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:9px;margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:480px;max-height:var(--mc-popover-size-max-height, 480px);border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:10px 16px;height:var(--mc-popover-header-size-height, 10px 16px);padding:10px 16px;padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:16px;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__footer{box-sizing:border-box;margin-top:8px;margin-top:var(--mc-popover-footer-size-margin-top, 8px);height:56px;height:var(--mc-popover-footer-size-height, 56px);padding:12px 16px;padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:12px;width:var(--mc-popover-size-arrow-size, 12px);height:12px;height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:-5.5px;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:9px;left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:9px;right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:-5.5px;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:9px;top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:9px;bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:-5.5px;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:9px;top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:9px;bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:-5.5px;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:9px;left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:9px;right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover-confirm .mc-popover__content{padding:24px 16px 16px}.mc-popover-confirm .mc-popover__content button{margin-top:16px;display:block;margin-left:auto}\n"], components: [{ type: i1.McButton, selector: "[mc-button]", inputs: ["color", "tabIndex", "disabled"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.McButtonCssStyler, selector: "[mc-button]" }], animations: [mcPopoverAnimations.popoverState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McPopoverConfirmComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-popover-confirm-component', preserveWhitespaces: false, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [mcPopoverAnimations.popoverState], template: "<div class=\"mc-popover-confirm mc-popover\"\n     [ngClass]=\"classMap\"\n     [@state]=\"visibility\"\n     (@state.start)=\"animationStart()\"\n     (@state.done)=\"animationDone($event)\">\n    <div class=\"mc-popover__content\">\n        <div>{{ confirmText }}</div>\n        <button mc-button [color]=\"themePalette.Primary\" (click)=\"onConfirm.next()\">{{confirmButtonText}}</button>    \n    </div>\n\n    <div class=\"mc-popover__arrow\"></div>\n</div>\n", styles: ["@keyframes mc-progress{0%{background-position:0 0}to{background-position:29px 0}}.mc-progress{position:relative}.mc-progress:after{content:\"\";position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;background:linear-gradient(135deg,rgba(0,0,0,.05) 10px,transparent 10px,transparent 20px,rgba(0,0,0,.05) 20px,rgba(0,0,0,.05) 30px,transparent 30px) repeat;background-size:29px 29px;animation:mc-progress 1s linear infinite}.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%;position:fixed;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-backdrop{top:0;bottom:0;left:0;right:0;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0;position:absolute;pointer-events:auto;z-index:1000;box-sizing:border-box;margin:0;padding:0}.cdk-overlay-pane{box-sizing:border-box;position:absolute;pointer-events:auto;margin:0;padding:0;z-index:1000;max-width:100%;max-height:100%}.cdk-overlay-connected-position-bounding-box{box-sizing:border-box;position:absolute;z-index:1000;display:flex;flex-direction:column;margin:0;padding:0;min-width:1px;min-height:1px}.mc-popover{position:relative;border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);border-width:1px;border-style:solid;box-sizing:border-box;z-index:1030;list-style:none;white-space:pre-line}.mc-popover.mc-popover_small{max-width:200px;max-width:var(--mc-popover-size-small-width, 200px)}.mc-popover.mc-popover_normal{max-width:400px;max-width:var(--mc-popover-size-normal-width, 400px)}.mc-popover.mc-popover_large{max-width:640px;max-width:var(--mc-popover-size-large-width, 640px)}.mc-popover.mc-popover_placement-top,.mc-popover.mc-popover_placement-top-left,.mc-popover.mc-popover_placement-top-right{margin-bottom:9px;margin-bottom:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-right,.mc-popover.mc-popover_placement-right-top,.mc-popover.mc-popover_placement-right-bottom{margin-left:9px;margin-left:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-bottom,.mc-popover.mc-popover_placement-bottom-left,.mc-popover.mc-popover_placement-bottom-right{margin-top:9px;margin-top:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover.mc-popover_placement-left,.mc-popover.mc-popover_placement-left-top,.mc-popover.mc-popover_placement-left-bottom{margin-right:9px;margin-right:calc(var(--mc-popover-size-trigger-margin, 9px))}.mc-popover__container{display:flex;flex-direction:column;max-height:480px;max-height:var(--mc-popover-size-max-height, 480px);border-radius:3px;border-radius:var(--mc-popover-size-border-radius, 3px);overflow:hidden}.mc-popover__header{height:10px 16px;height:var(--mc-popover-header-size-height, 10px 16px);padding:10px 16px;padding:var(--mc-popover-header-size-padding, 10px 16px);border-bottom-width:1px;border-bottom-style:solid}.mc-popover__content{overflow:hidden;padding:16px;padding:var(--mc-popover-size-padding, 16px)}.mc-popover__footer{box-sizing:border-box;margin-top:8px;margin-top:var(--mc-popover-footer-size-margin-top, 8px);height:56px;height:var(--mc-popover-footer-size-height, 56px);padding:12px 16px;padding:var(--mc-popover-footer-size-padding, 12px 16px);border-top-width:1px;border-top-style:solid}.mc-popover__arrow{position:absolute;z-index:-1;width:12px;width:var(--mc-popover-size-arrow-size, 12px);height:12px;height:var(--mc-popover-size-arrow-size, 12px);border:solid 1px;transform:rotate(45deg)}.mc-popover_placement-top .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:-5.5px;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-top-left .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:9px;left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-top-right .mc-popover__arrow{bottom:-5.5px;bottom:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:9px;right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:-5.5px;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-right-top .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:9px;top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-right-bottom .mc-popover__arrow{left:-5.5px;left:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:9px;bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:50%;margin-top:-5.5px;margin-top:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-left-top .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);top:9px;top:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-left-bottom .mc-popover__arrow{right:-5.5px;right:calc(var(--mc-popover-size-arrow-size, 11px) / -2);bottom:9px;bottom:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:50%;margin-left:-5.5px;margin-left:calc(var(--mc-popover-size-arrow-size, 11px) / -2)}.mc-popover_placement-bottom-left .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);left:9px;left:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover_placement-bottom-right .mc-popover__arrow{top:-5.5px;top:calc(var(--mc-popover-size-arrow-size, 11px) / -2);right:9px;right:calc(18px - var(--mc-popover-size-trigger-margin, 9px))}.mc-popover-confirm .mc-popover__content{padding:24px 16px 16px}.mc-popover-confirm .mc-popover__content button{margin-top:16px;display:block;margin-left:auto}\n"] }]
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
/** @nocollapse */ /** @nocollapse */ McPopoverConfirmTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McPopoverConfirmTrigger, deps: [{ token: i3.Overlay }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.ScrollDispatcher }, { token: i0.ViewContainerRef }, { token: MC_POPOVER_SCROLL_STRATEGY }, { token: i4.Directionality, optional: true }, { token: MC_POPOVER_CONFIRM_TEXT, optional: true }, { token: MC_POPOVER_CONFIRM_BUTTON_TEXT, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McPopoverConfirmTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McPopoverConfirmTrigger, selector: "[mcPopoverConfirm]", inputs: { confirmText: ["mcPopoverConfirmText", "confirmText"], confirmButtonText: ["mcPopoverConfirmButtonText", "confirmButtonText"] }, outputs: { confirm: "confirm" }, host: { listeners: { "keydown": "handleKeydown($event)", "touchend": "handleTouchend()" }, properties: { "class.mc-popover_open": "isOpen" } }, exportAs: ["mcPopoverConfirm"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McPopoverConfirmTrigger, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i3.Overlay }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i3.ScrollDispatcher }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_POPOVER_SCROLL_STRATEGY]
                }] }, { type: i4.Directionality, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb25maXJtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wb3BvdmVyL3BvcG92ZXItY29uZmlybS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLWNvbmZpcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQUd2RyxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLGNBQWMsQ0FBUyxFQUFFLENBQUMsQ0FBQztBQUN0RSxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBRyxJQUFJLGNBQWMsQ0FBUyxFQUFFLENBQUMsQ0FBQztBQVc3RSxNQUFN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QixFQUFFLFFBQVE7d0JBQ25DLFdBQVcsRUFBRSx1QkFBdUI7d0JBQ3BDLFlBQVksRUFBRSxrQkFBa0I7cUJBQ25DO2lCQUNKOzswQkFvQ1EsTUFBTTsyQkFBQywwQkFBMEI7OzBCQUNqQyxRQUFROzswQkFDUixRQUFROzswQkFBSSxNQUFNOzJCQUFDLHVCQUF1Qjs7MEJBQzFDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsOEJBQThCOzRDQXJDNUMsT0FBTztzQkFBaEIsTUFBTTtnQkFHSCxXQUFXO3NCQURkLEtBQUs7dUJBQUMsc0JBQXNCO2dCQWN6QixpQkFBaUI7c0JBRHBCLEtBQUs7dUJBQUMsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPdmVybGF5LCBTY3JvbGxEaXNwYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG1jUG9wb3ZlckFuaW1hdGlvbnMgfSBmcm9tICcuL3BvcG92ZXItYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWSwgTWNQb3BvdmVyQ29tcG9uZW50LCBNY1BvcG92ZXJUcmlnZ2VyIH0gZnJvbSAnLi9wb3BvdmVyLmNvbXBvbmVudCc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX1BPUE9WRVJfQ09ORklSTV9URVhUID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJycpO1xuZXhwb3J0IGNvbnN0IE1DX1BPUE9WRVJfQ09ORklSTV9CVVRUT05fVEVYVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCcnKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wb3BvdmVyLWNvbmZpcm0tY29tcG9uZW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci1jb25maXJtLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wb3BvdmVyLnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFttY1BvcG92ZXJBbmltYXRpb25zLnBvcG92ZXJTdGF0ZV1cbn0pXG5leHBvcnQgY2xhc3MgTWNQb3BvdmVyQ29uZmlybUNvbXBvbmVudCBleHRlbmRzIE1jUG9wb3ZlckNvbXBvbmVudCB7XG4gICAgdGhlbWVQYWxldHRlID0gVGhlbWVQYWxldHRlO1xuXG4gICAgb25Db25maXJtID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBjb25maXJtQnV0dG9uVGV4dDogc3RyaW5nO1xuXG4gICAgY29uZmlybVRleHQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihjaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jUG9wb3ZlckNvbmZpcm1dJyxcbiAgICBleHBvcnRBczogJ21jUG9wb3ZlckNvbmZpcm0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5tYy1wb3BvdmVyX29wZW5dJzogJ2lzT3BlbicsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgICAgICAgJyh0b3VjaGVuZCknOiAnaGFuZGxlVG91Y2hlbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3ZlckNvbmZpcm1UcmlnZ2VyIGV4dGVuZHMgTWNQb3BvdmVyVHJpZ2dlciB7XG4gICAgQE91dHB1dCgpIGNvbmZpcm06IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyQ29uZmlybVRleHQnKVxuICAgIGdldCBjb25maXJtVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlybVRleHQ7XG4gICAgfVxuXG4gICAgc2V0IGNvbmZpcm1UZXh0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29uZmlybVRleHQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb25maXJtVGV4dDogc3RyaW5nO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJDb25maXJtQnV0dG9uVGV4dCcpXG4gICAgZ2V0IGNvbmZpcm1CdXR0b25UZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maXJtQnV0dG9uVGV4dDtcbiAgICB9XG5cbiAgICBzZXQgY29uZmlybUJ1dHRvblRleHQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jb25maXJtQnV0dG9uVGV4dCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NvbmZpcm1CdXR0b25UZXh0OiBzdHJpbmcgPSAn0JTQsCc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19QT1BPVkVSX0NPTkZJUk1fVEVYVCkgY29uZmlybVRleHQ6IHN0cmluZyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19QT1BPVkVSX0NPTkZJUk1fQlVUVE9OX1RFWFQpIGNvbmZpcm1CdXR0b25UZXh0OiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgc3VwZXIob3ZlcmxheSwgZWxlbWVudFJlZiwgbmdab25lLCBzY3JvbGxEaXNwYXRjaGVyLCBob3N0Vmlldywgc2Nyb2xsU3RyYXRlZ3ksIGRpcmVjdGlvbik7XG5cbiAgICAgICAgdGhpcy5jb25maXJtVGV4dCA9IGNvbmZpcm1UZXh0IHx8ICfQktGLINGD0LLQtdGA0LXQvdGLLCDRh9GC0L4g0YXQvtGC0LjRgtC1INC/0YDQvtC00L7Qu9C20LjRgtGMPyc7XG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvblRleHQgPSBjb25maXJtQnV0dG9uVGV4dCB8fCAn0JTQsCc7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7IHJldHVybjsgfVxuICAgICAgICBzdXBlci51cGRhdGVEYXRhKCk7XG4gICAgICAgIHRoaXMuc2V0dXBCdXR0b25FdmVudHMoKTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5jb25maXJtQnV0dG9uVGV4dCA9IHRoaXMuY29uZmlybUJ1dHRvblRleHQ7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UuY29uZmlybVRleHQgPSB0aGlzLmNvbmZpcm1UZXh0O1xuICAgIH1cblxuICAgIHNldHVwQnV0dG9uRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmluc3RhbmNlLm9uQ29uZmlybS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm0uZW1pdCgpO1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE92ZXJsYXlIYW5kbGVDb21wb25lbnRUeXBlKCkge1xuICAgICAgICByZXR1cm4gTWNQb3BvdmVyQ29uZmlybUNvbXBvbmVudDtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlci1jb25maXJtIG1jLXBvcG92ZXJcIlxuICAgICBbbmdDbGFzc109XCJjbGFzc01hcFwiXG4gICAgIFtAc3RhdGVdPVwidmlzaWJpbGl0eVwiXG4gICAgIChAc3RhdGUuc3RhcnQpPVwiYW5pbWF0aW9uU3RhcnQoKVwiXG4gICAgIChAc3RhdGUuZG9uZSk9XCJhbmltYXRpb25Eb25lKCRldmVudClcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9fY29udGVudFwiPlxuICAgICAgICA8ZGl2Pnt7IGNvbmZpcm1UZXh0IH19PC9kaXY+XG4gICAgICAgIDxidXR0b24gbWMtYnV0dG9uIFtjb2xvcl09XCJ0aGVtZVBhbGV0dGUuUHJpbWFyeVwiIChjbGljayk9XCJvbkNvbmZpcm0ubmV4dCgpXCI+e3tjb25maXJtQnV0dG9uVGV4dH19PC9idXR0b24+ICAgIFxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLXBvcG92ZXJfX2Fycm93XCI+PC9kaXY+XG48L2Rpdj5cbiJdfQ==
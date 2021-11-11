import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Inject, InjectionToken, Input, NgZone, Optional, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { McPopUp, McPopUpTrigger, PopUpSizes, PopUpTriggers, POSITION_TO_CSS_MAP } from '@ptsecurity/mosaic/core';
import { merge, NEVER } from 'rxjs';
import { mcPopoverAnimations } from './popover-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
import * as i3 from "@angular/cdk/bidi";
export class McPopoverComponent extends McPopUp {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFFSCxPQUFPLEVBQ1AsZ0JBQWdCLEVBRW5CLE1BQU0sc0JBQXNCLENBQUM7QUFFOUIsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFHUixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxPQUFPLEVBQ1AsY0FBYyxFQUNkLFVBQVUsRUFDVixhQUFhLEVBQ2IsbUJBQW1CLEVBQ3RCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBZTNELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxPQUFPO0lBTTNDLFlBQVksaUJBQW9DO1FBQzVDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBTjdCLFdBQU0sR0FBRyxZQUFZLENBQUM7SUFPdEIsQ0FBQztJQUVELGNBQWMsQ0FBQyxTQUFpQixFQUFFLFdBQW1CLEVBQUUsSUFBZ0I7UUFDbkUsS0FBSyxDQUFDLGNBQWMsQ0FDaEIsU0FB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QVE7d0JBQ25DLFdBQVcsRUFBRSx1QkFBdUI7d0JBQ3BDLFlBQVksRUFBRSxrQkFBa0I7cUJBQ25DO2lCQUNKOzswQkFtSVEsTUFBTTsyQkFBQywwQkFBMEI7OzBCQUNqQyxRQUFROzRDQWpJVCxXQUFXO3NCQURkLEtBQUs7Z0JBWUYsTUFBTTtzQkFEVCxLQUFLO3VCQUFDLGlCQUFpQjtnQkFjcEIsT0FBTztzQkFEVixLQUFLO3VCQUFDLGtCQUFrQjtnQkFZckIsTUFBTTtzQkFEVCxLQUFLO3VCQUFDLGlCQUFpQjtnQkFjcEIsUUFBUTtzQkFEWCxLQUFLO3VCQUFDLG1CQUFtQjtnQkFVdEIsT0FBTztzQkFEVixLQUFLO3VCQUFDLFdBQVc7Z0JBa0JkLElBQUk7c0JBRFAsS0FBSzt1QkFBQyxlQUFlO2dCQWtCbEIsV0FBVztzQkFEZCxLQUFLO3VCQUFDLGdCQUFnQjtnQkFZbkIsYUFBYTtzQkFEaEIsS0FBSztnQkFXRyxhQUFhO3NCQUFyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgT3ZlcmxheSxcbiAgICBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE92ZXJsYXlDb25maWcgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheS9vdmVybGF5LWNvbmZpZyc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9wdGlvbmFsLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFR5cGUsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgTWNQb3BVcCxcbiAgICBNY1BvcFVwVHJpZ2dlcixcbiAgICBQb3BVcFNpemVzLFxuICAgIFBvcFVwVHJpZ2dlcnMsXG4gICAgUE9TSVRJT05fVE9fQ1NTX01BUFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgTkVWRVIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgbWNQb3BvdmVyQW5pbWF0aW9ucyB9IGZyb20gJy4vcG9wb3Zlci1hbmltYXRpb25zJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXBvcG92ZXItY29tcG9uZW50JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgc3R5bGVVcmxzOiBbJy4vcG9wb3Zlci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24uZXNjKSc6ICdoaWRlKDApJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbbWNQb3BvdmVyQW5pbWF0aW9ucy5wb3BvdmVyU3RhdGVdXG59KVxuZXhwb3J0IGNsYXNzIE1jUG9wb3ZlckNvbXBvbmVudCBleHRlbmRzIE1jUG9wVXAge1xuICAgIHByZWZpeCA9ICdtYy1wb3BvdmVyJztcblxuICAgIGhlYWRlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgICBmb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIH1cblxuICAgIHVwZGF0ZUNsYXNzTWFwKHBsYWNlbWVudDogc3RyaW5nLCBjdXN0b21DbGFzczogc3RyaW5nLCBzaXplOiBQb3BVcFNpemVzKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZUNsYXNzTWFwKFxuICAgICAgICAgICAgcGxhY2VtZW50LFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3MsXG4gICAgICAgICAgICB7IFtgJHt0aGlzLnByZWZpeH1fJHtzaXplfWBdOiAhIXNpemUgfVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYy1wb3BvdmVyLXNjcm9sbC1zdHJhdGVneScpO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1jUG9wb3ZlclNjcm9sbFN0cmF0ZWd5RmFjdG9yeShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7IHNjcm9sbFRocm90dGxlOiAyMCB9KTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQ19QT1BPVkVSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBtY1BvcG92ZXJTY3JvbGxTdHJhdGVneUZhY3Rvcnlcbn07XG5cbi8qKiBDcmVhdGVzIGFuIGVycm9yIHRvIGJlIHRocm93biBpZiB0aGUgdXNlciBzdXBwbGllZCBhbiBpbnZhbGlkIHBvcG92ZXIgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWNQb3BvdmVySW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICAgIHJldHVybiBFcnJvcihgTWNQb3BvdmVyIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jUG9wb3Zlcl0nLFxuICAgIGV4cG9ydEFzOiAnbWNQb3BvdmVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtcG9wb3Zlcl9vcGVuXSc6ICdpc09wZW4nLFxuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gICAgICAgICcodG91Y2hlbmQpJzogJ2hhbmRsZVRvdWNoZW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1BvcG92ZXJUcmlnZ2VyIGV4dGVuZHMgTWNQb3BVcFRyaWdnZXI8TWNQb3BvdmVyQ29tcG9uZW50PiB7XG4gICAgQElucHV0KClcbiAgICBnZXQgaGFzQmFja2Ryb3AoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNCYWNrZHJvcDtcbiAgICB9XG5cbiAgICBzZXQgaGFzQmFja2Ryb3AodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGFzQmFja2Ryb3AgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hhc0JhY2tkcm9wOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckhlYWRlcicpXG4gICAgZ2V0IGhlYWRlcigpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRlcjtcbiAgICB9XG5cbiAgICBzZXQgaGVhZGVyKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hlYWRlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyQ29udGVudCcpXG4gICAgZ2V0IGNvbnRlbnQoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH1cblxuICAgIHNldCBjb250ZW50KHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZURhdGEoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlckZvb3RlcicpXG4gICAgZ2V0IGZvb3RlcigpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvb3RlcjtcbiAgICB9XG5cbiAgICBzZXQgZm9vdGVyKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMuX2Zvb3RlciA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Zvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgnbWNQb3BvdmVyRGlzYWJsZWQnKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdtY1RyaWdnZXInKVxuICAgIGdldCB0cmlnZ2VyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmlnZ2VyO1xuICAgIH1cblxuICAgIHNldCB0cmlnZ2VyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyID0gUG9wVXBUcmlnZ2Vycy5DbGljaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RyaWdnZXI6IHN0cmluZyA9IFBvcFVwVHJpZ2dlcnMuQ2xpY2s7XG5cbiAgICBASW5wdXQoJ21jUG9wb3ZlclNpemUnKVxuICAgIGdldCBzaXplKCk6IFBvcFVwU2l6ZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICBzZXQgc2l6ZSh2YWx1ZTogUG9wVXBTaXplcykge1xuICAgICAgICBpZiAoW1BvcFVwU2l6ZXMuU21hbGwsIFBvcFVwU2l6ZXMuTm9ybWFsLCBQb3BVcFNpemVzLkxhcmdlXS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVDbGFzc01hcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IFBvcFVwU2l6ZXMuTm9ybWFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2l6ZTogUG9wVXBTaXplcyA9IFBvcFVwU2l6ZXMuTm9ybWFsO1xuXG4gICAgQElucHV0KCdtY1BvcG92ZXJDbGFzcycpXG4gICAgZ2V0IGN1c3RvbUNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0IGN1c3RvbUNsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY3VzdG9tQ2xhc3MgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNsYXNzTWFwKCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgY2xvc2VPblNjcm9sbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb3NlT25TY3JvbGw7XG4gICAgfVxuXG4gICAgc2V0IGNsb3NlT25TY3JvbGwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fY2xvc2VPblNjcm9sbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xvc2VPblNjcm9sbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nID0gJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJztcblxuICAgIHByb3RlY3RlZCBvcmlnaW5TZWxlY3RvciA9ICcubWMtcG9wb3Zlcic7XG5cbiAgICBwcm90ZWN0ZWQgb3ZlcmxheUNvbmZpZzogT3ZlcmxheUNvbmZpZyA9IHtcbiAgICAgICAgcGFuZWxDbGFzczogJ21jLXBvcG92ZXJfX3BhbmVsJyxcbiAgICAgICAgaGFzQmFja2Ryb3A6IHRoaXMuaGFzQmFja2Ryb3AsXG4gICAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuYmFja2Ryb3BDbGFzc1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgIGhvc3RWaWV3OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBASW5qZWN0KE1DX1BPUE9WRVJfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneSxcbiAgICAgICAgQE9wdGlvbmFsKCkgZGlyZWN0aW9uOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICBzdXBlcihvdmVybGF5LCBlbGVtZW50UmVmLCBuZ1pvbmUsIHNjcm9sbERpc3BhdGNoZXIsIGhvc3RWaWV3LCBzY3JvbGxTdHJhdGVneSwgZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZS5oZWFkZXIgPSB0aGlzLmhlYWRlcjtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5jb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICB0aGlzLmluc3RhbmNlLmZvb3RlciA9IHRoaXMuZm9vdGVyO1xuXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCBwb3BvdmVyLiAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKHJlYXBwbHlQb3NpdGlvbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gKHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSlcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuZ2V0UHJpb3JpdGl6ZWRQb3NpdGlvbnMoKSlcbiAgICAgICAgICAgIC53aXRoUHVzaCh0cnVlKTtcblxuICAgICAgICBpZiAocmVhcHBseVBvc2l0aW9uKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBvc2l0aW9uLnJlYXBwbHlMYXN0UG9zaXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPdmVybGF5SGFuZGxlQ29tcG9uZW50VHlwZSgpOiBUeXBlPE1jUG9wb3ZlckNvbXBvbmVudD4ge1xuICAgICAgICByZXR1cm4gTWNQb3BvdmVyQ29tcG9uZW50O1xuICAgIH1cblxuICAgIHVwZGF0ZUNsYXNzTWFwKG5ld1BsYWNlbWVudDogc3RyaW5nID0gdGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UudXBkYXRlQ2xhc3NNYXAoUE9TSVRJT05fVE9fQ1NTX01BUFtuZXdQbGFjZW1lbnRdLCB0aGlzLmN1c3RvbUNsYXNzLCB0aGlzLnNpemUpO1xuICAgICAgICB0aGlzLmluc3RhbmNlLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNsb3NpbmdBY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYhLmJhY2tkcm9wQ2xpY2soKSxcbiAgICAgICAgICAgIHRoaXMuaGFzQmFja2Ryb3AgPyBORVZFUiA6IHRoaXMub3ZlcmxheVJlZiEub3V0c2lkZVBvaW50ZXJFdmVudHMoKSxcbiAgICAgICAgICAgIHRoaXMuY2xvc2VPblNjcm9sbCA/IHRoaXMuc2Nyb2xsRGlzcGF0Y2hlci5zY3JvbGxlZCgpIDogTkVWRVIsXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYhLmRldGFjaG1lbnRzKClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWMtcG9wb3ZlclwiXG4gICAgIFtuZ0NsYXNzXT1cImNsYXNzTWFwXCJcbiAgICAgW0BzdGF0ZV09XCJ2aXNpYmlsaXR5XCJcbiAgICAgKEBzdGF0ZS5zdGFydCk9XCJhbmltYXRpb25TdGFydCgpXCJcbiAgICAgKEBzdGF0ZS5kb25lKT1cImFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cIm1jLXBvcG92ZXJfX2NvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9faGVhZGVyXCIgKm5nSWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGhlYWRlcilcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KGhlYWRlcilcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNUZW1wbGF0ZVJlZihoZWFkZXIpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBoZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9fY29udGVudFwiICpuZ0lmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVGVtcGxhdGVSZWYoY29udGVudClcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KGNvbnRlbnQpXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzVGVtcGxhdGVSZWYoY29udGVudClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IGNvbnRlbnQgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtcG9wb3Zlcl9fZm9vdGVyXCIgKm5nSWY9XCJmb290ZXJcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlUmVmKGZvb3RlcilcIiBbbmdUZW1wbGF0ZU91dGxldF09XCIkYW55KGZvb3RlcilcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNUZW1wbGF0ZVJlZihmb290ZXIpXCI+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBmb290ZXIgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYy1wb3BvdmVyX19hcnJvd1wiIFtjbGFzcy5tYy1wb3BvdmVyX19hcnJvd193aXRoLWZvb3Rlcl09XCJmb290ZXJcIj48L2Rpdj5cbjwvZGl2PlxuIl19
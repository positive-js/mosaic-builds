import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Inject, InjectionToken, ViewEncapsulation } from '@angular/core';
import { ENTER, SPACE, TAB } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { mixinDisabled, mixinTabIndex } from '../common-behaviors/index';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
export const MC_OPTION_ACTION_PARENT = new InjectionToken('MC_OPTION_ACTION_PARENT');
export class McOptionActionBase {
}
// tslint:disable-next-line:naming-convention
export const McOptionActionMixinBase = mixinTabIndex(mixinDisabled(McOptionActionBase));
export class McOptionActionComponent extends McOptionActionMixinBase {
    constructor(elementRef, focusMonitor, option) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.option = option;
        this.hasFocus = false;
        this.destroy = new Subject();
        this.focusMonitor.monitor(this.elementRef.nativeElement);
    }
    get active() {
        var _a;
        return this.hasFocus || !!((_a = this.option.dropdownTrigger) === null || _a === void 0 ? void 0 : _a.opened);
    }
    ngAfterViewInit() {
        if (!this.option.dropdownTrigger) {
            return;
        }
        this.option.dropdownTrigger.restoreFocus = false;
        this.option.dropdownTrigger.dropdownClosed
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
            this.preventShowingTooltip();
            const destroyReason = this.option.dropdownTrigger.lastDestroyReason === 'keydown' ?
                'keyboard' :
                'program';
            this.focus(destroyReason);
        });
    }
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    focus(origin, options) {
        if (this.focusMonitor && origin) {
            this.focusMonitor.focusVia(this.elementRef.nativeElement, origin, options);
        }
        else {
            this.elementRef.nativeElement.focus();
        }
        this.hasFocus = true;
    }
    onFocus($event) {
        $event.stopPropagation();
        this.hasFocus = true;
    }
    onBlur() {
        this.hasFocus = false;
    }
    onClick($event) {
        $event.stopPropagation();
    }
    onKeyDown($event) {
        if ([SPACE, ENTER].includes($event.keyCode) && this.option.dropdownTrigger) {
            this.option.dropdownTrigger.openedBy = 'keyboard';
            this.option.dropdownTrigger.toggle();
        }
        else if ($event.shiftKey && $event.keyCode === TAB) {
            this.hasFocus = false;
            this.option.focus();
        }
        else if ($event.keyCode === TAB) {
            return;
        }
        $event.preventDefault();
        $event.stopPropagation();
    }
    preventShowingTooltip() {
        if (!this.option.tooltipTrigger) {
            return;
        }
        this.option.tooltipTrigger.disabled = true;
        setTimeout(() => this.option.tooltipTrigger.disabled = false);
    }
}
/** @nocollapse */ McOptionActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McOptionActionComponent, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }, { token: MC_OPTION_ACTION_PARENT }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McOptionActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McOptionActionComponent, selector: "mc-option-action", inputs: { disabled: "disabled" }, host: { listeners: { "focus": "onFocus($event)", "blur": "onBlur()", "click": "onClick($event)", "keydown": "onKeyDown($event)" }, properties: { "class.mc-opened": "false", "attr.disabled": "disabled || null", "attr.tabIndex": "-1" }, classAttribute: "mc-option-action" }, queries: [{ propertyName: "customIcon", first: true, predicate: ["customIcon"], descendants: true }], exportAs: ["mcOptionAction"], usesInheritance: true, ngImport: i0, template: `
        <ng-container [ngSwitch]="!!customIcon">
            <i class="mc mc-icon mc-ellipsis_16" *ngSwitchCase="false"></i>
            <ng-content select="[mc-icon]" *ngSwitchCase="true"></ng-content>
        </ng-container>
    `, isInline: true, styles: [".mc-option-action{box-sizing:unset;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-right:-2px;width:28px;height:100%;cursor:pointer;outline:none;border:2px solid transparent;background:transparent}.mc-option-action[disabled]{cursor:default}\n"], directives: [{ type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McOptionActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-option-action',
                    exportAs: 'mcOptionAction',
                    template: `
        <ng-container [ngSwitch]="!!customIcon">
            <i class="mc mc-icon mc-ellipsis_16" *ngSwitchCase="false"></i>
            <ng-content select="[mc-icon]" *ngSwitchCase="true"></ng-content>
        </ng-container>
    `,
                    styleUrls: ['./action.scss'],
                    host: {
                        class: 'mc-option-action',
                        '[class.mc-opened]': 'false',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabIndex]': '-1',
                        '(focus)': 'onFocus($event)',
                        '(blur)': 'onBlur()',
                        '(click)': 'onClick($event)',
                        '(keydown)': 'onKeyDown($event)'
                    },
                    inputs: ['disabled'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_OPTION_ACTION_PARENT]
                }] }]; }, propDecorators: { customIcon: [{
                type: ContentChild,
                args: ['customIcon']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvb3B0aW9uL2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFFVixNQUFNLEVBQ04sY0FBYyxFQUVkLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQW1DLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQW1CMUcsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQXVCLHlCQUF5QixDQUFDLENBQUM7QUFFM0csTUFBTSxPQUFPLGtCQUFrQjtDQUFHO0FBRWxDLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FDK0IsYUFBYSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUE2QnBILE1BQU0sT0FBTyx1QkFBd0IsU0FBUSx1QkFBdUI7SUFXaEUsWUFDWSxVQUFzQixFQUN0QixZQUEwQixFQUNPLE1BQTRCO1FBRXJFLEtBQUssRUFBRSxDQUFDO1FBSkEsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNPLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBWHpFLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFNVCxZQUFPLEdBQUcsSUFBSSxPQUFP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Rm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgT25EZXN0cm95LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU5URVIsIFNQQUNFLCBUQUIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDYW5EaXNhYmxlQ3RvciwgSGFzVGFiSW5kZXhDdG9yLCBtaXhpbkRpc2FibGVkLCBtaXhpblRhYkluZGV4IH0gZnJvbSAnLi4vY29tbW9uLWJlaGF2aW9ycy9pbmRleCc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jT3B0aW9uQWN0aW9uUGFyZW50IHtcbiAgICBkcm9wZG93blRyaWdnZXI6IHtcbiAgICAgICAgb3BlbmVkOiBib29sZWFuO1xuICAgICAgICByZXN0b3JlRm9jdXM6IGJvb2xlYW47XG4gICAgICAgIGRyb3Bkb3duQ2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgICAgIGxhc3REZXN0cm95UmVhc29uOiB2b2lkIHwgJ2NsaWNrJyB8ICdrZXlkb3duJyB8ICd0YWInO1xuICAgICAgICBvcGVuZWRCeTogRXhjbHVkZTxGb2N1c09yaWdpbiwgJ3Byb2dyYW0nIHwgbnVsbD4gfCB1bmRlZmluZWQ7XG4gICAgICAgIHRvZ2dsZSgpOiB2b2lkO1xuICAgIH07XG4gICAgdG9vbHRpcFRyaWdnZXI6IHtcbiAgICAgICAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgfTtcbiAgICBmb2N1cygpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgTUNfT1BUSU9OX0FDVElPTl9QQVJFTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWNPcHRpb25BY3Rpb25QYXJlbnQ+KCdNQ19PUFRJT05fQUNUSU9OX1BBUkVOVCcpO1xuXG5leHBvcnQgY2xhc3MgTWNPcHRpb25BY3Rpb25CYXNlIHt9XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jT3B0aW9uQWN0aW9uTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jT3B0aW9uQWN0aW9uQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY09wdGlvbkFjdGlvbkJhc2UpKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLW9wdGlvbi1hY3Rpb24nLFxuICAgIGV4cG9ydEFzOiAnbWNPcHRpb25BY3Rpb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIiEhY3VzdG9tSWNvblwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWVsbGlwc2lzXzE2XCIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+PC9pPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLWljb25dXCIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWN0aW9uLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtb3B0aW9uLWFjdGlvbicsXG4gICAgICAgICdbY2xhc3MubWMtb3BlbmVkXSc6ICdmYWxzZScsXG5cbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnRhYkluZGV4XSc6ICctMScsXG5cbiAgICAgICAgJyhmb2N1cyknOiAnb25Gb2N1cygkZXZlbnQpJyxcbiAgICAgICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgICAgICcoY2xpY2spJzogJ29uQ2xpY2soJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknXG4gICAgfSxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jT3B0aW9uQWN0aW9uQ29tcG9uZW50IGV4dGVuZHMgTWNPcHRpb25BY3Rpb25NaXhpbkJhc2UgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGQoJ2N1c3RvbUljb24nKSBjdXN0b21JY29uOiBFbGVtZW50UmVmO1xuXG4gICAgaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0ZvY3VzIHx8ICEhdGhpcy5vcHRpb24uZHJvcGRvd25UcmlnZ2VyPy5vcGVuZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIEBJbmplY3QoTUNfT1BUSU9OX0FDVElPTl9QQVJFTlQpIHByaXZhdGUgb3B0aW9uOiBNY09wdGlvbkFjdGlvblBhcmVudFxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbi5kcm9wZG93blRyaWdnZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5vcHRpb24uZHJvcGRvd25UcmlnZ2VyLnJlc3RvcmVGb2N1cyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub3B0aW9uLmRyb3Bkb3duVHJpZ2dlci5kcm9wZG93bkNsb3NlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRTaG93aW5nVG9vbHRpcCgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzdHJveVJlYXNvbjogRm9jdXNPcmlnaW4gPSB0aGlzLm9wdGlvbi5kcm9wZG93blRyaWdnZXIubGFzdERlc3Ryb3lSZWFzb24gPT09ICdrZXlkb3duJyA/XG4gICAgICAgICAgICAgICAgICAgICdrZXlib2FyZCcgOlxuICAgICAgICAgICAgICAgICAgICAncHJvZ3JhbSc7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKGRlc3Ryb3lSZWFzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNNb25pdG9yICYmIG9yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIG9yaWdpbiwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25Gb2N1cygkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oJGV2ZW50KSB7XG4gICAgICAgIGlmIChbU1BBQ0UsIEVOVEVSXS5pbmNsdWRlcygkZXZlbnQua2V5Q29kZSkgJiYgdGhpcy5vcHRpb24uZHJvcGRvd25UcmlnZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbi5kcm9wZG93blRyaWdnZXIub3BlbmVkQnkgPSAna2V5Ym9hcmQnO1xuICAgICAgICAgICAgdGhpcy5vcHRpb24uZHJvcGRvd25UcmlnZ2VyLnRvZ2dsZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCRldmVudC5zaGlmdEtleSAmJiAkZXZlbnQua2V5Q29kZSA9PT0gVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9uLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJGV2ZW50LmtleUNvZGUgPT09IFRBQikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXZlbnRTaG93aW5nVG9vbHRpcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbi50b29sdGlwVHJpZ2dlcikgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLm9wdGlvbi50b29sdGlwVHJpZ2dlci5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9wdGlvbi50b29sdGlwVHJpZ2dlci5kaXNhYmxlZCA9IGZhbHNlKTtcbiAgICB9XG59XG4iXX0=
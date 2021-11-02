import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Optional, Self, ViewEncapsulation } from '@angular/core';
import { ENTER, SPACE, TAB } from '@ptsecurity/cdk/keycodes';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { McTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { McTreeOption } from './tree-option.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "./tree-option.component";
import * as i3 from "@ptsecurity/mosaic/dropdown";
import * as i4 from "@ptsecurity/mosaic/tooltip";
import * as i5 from "@angular/common";
export class McTreeNodeActionBase {
}
// tslint:disable-next-line:naming-convention
export const McTreeNodeActionMixinBase = mixinTabIndex(mixinDisabled(McTreeNodeActionBase));
export class McTreeNodeActionComponent extends McTreeNodeActionMixinBase {
    constructor(elementRef, focusMonitor, option, dropdownTrigger, tooltip) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.option = option;
        this.dropdownTrigger = dropdownTrigger;
        this.tooltip = tooltip;
        this.hasFocus = false;
        this.destroy = new Subject();
    }
    get active() {
        var _a;
        return ((_a = this.dropdownTrigger) === null || _a === void 0 ? void 0 : _a.opened) || this.hasFocus;
    }
    ngOnInit() {
        if (this.dropdownTrigger) {
            this.dropdownTrigger.restoreFocus = false;
            this.dropdownTrigger.dropdownClosed
                .pipe(takeUntil(this.destroy))
                .subscribe(() => {
                this.preventShowingTooltip();
                const destroyReason = this.dropdownTrigger.lastDestroyReason === 'keydown' ?
                    'keyboard' :
                    'program';
                this.focus(destroyReason);
            });
        }
        this.focusMonitor.monitor(this.elementRef.nativeElement);
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
        if ([SPACE, ENTER].includes($event.keyCode) && this.dropdownTrigger) {
            this.dropdownTrigger.openedBy = 'keyboard';
            this.dropdownTrigger.toggle();
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
        if (!this.tooltip) {
            return;
        }
        this.tooltip.disabled = true;
        setTimeout(() => this.tooltip.disabled = false);
    }
}
/** @nocollapse */ McTreeNodeActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeActionComponent, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }, { token: i2.McTreeOption }, { token: i3.McDropdownTrigger, optional: true, self: true }, { token: i4.McTooltipTrigger, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTreeNodeActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeActionComponent, selector: "mc-tree-node-action", inputs: { disabled: "disabled" }, host: { listeners: { "focus": "onFocus($event)", "blur": "onBlur()", "click": "onClick($event)", "keydown": "onKeyDown($event)" }, properties: { "class.mc-opened": "false", "attr.disabled": "disabled || null", "attr.tabIndex": "-1" }, classAttribute: "mc-tree-node-action" }, queries: [{ propertyName: "customIcon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcTreeNodeAction"], usesInheritance: true, ngImport: i0, template: `
        <ng-container [ngSwitch]="!!customIcon">
            <i class="mc mc-icon mc-ellipsis_16" *ngSwitchCase="false"></i>
            <ng-content select="[mc-icon]" *ngSwitchCase="true"></ng-content>
        </ng-container>
        `, isInline: true, styles: [".mc-tree-node-action{box-sizing:unset;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-right:-2px;width:28px;height:100%;cursor:pointer;outline:none;border:2px solid transparent;background:transparent}.mc-tree-node-action[disabled]{cursor:default}\n"], directives: [{ type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-node-action',
                    exportAs: 'mcTreeNodeAction',
                    template: `
        <ng-container [ngSwitch]="!!customIcon">
            <i class="mc mc-icon mc-ellipsis_16" *ngSwitchCase="false"></i>
            <ng-content select="[mc-icon]" *ngSwitchCase="true"></ng-content>
        </ng-container>
        `,
                    styleUrls: ['./action.scss'],
                    host: {
                        class: 'mc-tree-node-action',
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }, { type: i2.McTreeOption }, { type: i3.McDropdownTrigger, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i4.McTooltipTrigger, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { customIcon: [{
                type: ContentChild,
                args: [McIcon]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUdWLFFBQVEsRUFDUixJQUFJLEVBQ0osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFHSCxhQUFhLEVBQ2IsYUFBYSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7QUFHdkQsTUFBTSxPQUFPLG9CQUFvQjtDQUFHO0FBRXBDLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FDK0IsYUFBYSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7QUE2QnhILE1BQU0sT0FBTyx5QkFBMEIsU0FBUSx5QkFBeUI7SUFXcEUsWUFDWSxVQUFzQixFQUN0QixZQUEwQixFQUMxQixNQUFvQixFQUNBLGVBQWtDLEVBQ2xDLE9BQXlCO1FBRXJELEtBQUssRUFBRSxDQUFDO1FBTkEsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ0Esb0JBQWUsR0FBZixlQUFlLENBQW1CO1FBQ2xDLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBYnpELGFBQVEsR0FBWSxLQUFLLENBQUM7UUFNVCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQVUvQyxDQUFDO0lBZEQsSUFBSSxNQUFNOztRQUNOLE9BQU8sQ0FBQSxNQUFBLElBQUksQ0FBQyxlQUFlLDBDQUFFLE1BQU0sS0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pELENBQUM7SUFjRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUUxQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWM7aUJBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QixTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUU3QixNQUFNLGFBQWEsR0FBZ0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLENBQUMsQ0FBQztvQkFDckYsVUFBVSxDQUFDLENBQUM7b0JBQ1osU0FBUyxDQUFDO2dCQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQW9CLEVBQUUsT0FBc0I7UUFDOUMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFNO1FBQ1YsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFNO1FBQ1YsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBTTtRQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBRXRCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7YUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO1lBQy9CLE9BQU87U0FDVjtRQUVELE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLHFCQUFxQjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUFFLE9BQU87U0FBRTtRQUU5QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFN0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7O3lJQTdGUSx5QkFBeUI7NkhBQXpCLHlCQUF5Qix5WkFDcEIsTUFBTSx1R0F4QlY7Ozs7O1NBS0w7MkZBa0JJLHlCQUF5QjtrQkExQnJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOzs7OztTQUtMO29CQUNMLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDNUIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxxQkFBcUI7d0JBQzVCLG1CQUFtQixFQUFFLE9BQU87d0JBRTVCLGlCQUFpQixFQUFFLGtCQUFrQjt3QkFDckMsaUJBQWlCLEVBQUUsSUFBSTt3QkFFdkIsU0FBUyxFQUFFLGlCQUFpQjt3QkFDNUIsUUFBUSxFQUFFLFVBQVU7d0JBQ3BCLFNBQVMsRUFBRSxpQkFBaUI7d0JBQzVCLFdBQVcsRUFBRSxtQkFBbUI7cUJBQ25DO29CQUNELE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDs7MEJBZ0JRLFFBQVE7OzBCQUFJLElBQUk7OzBCQUNoQixRQUFROzswQkFBSSxJQUFJOzRDQWZDLFVBQVU7c0JBQS9CLFlBQVk7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIFNlbGYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFTlRFUiwgU1BBQ0UsIFRBQiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIEhhc1RhYkluZGV4Q3RvcixcbiAgICBtaXhpbkRpc2FibGVkLFxuICAgIG1peGluVGFiSW5kZXhcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNEcm9wZG93blRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZHJvcGRvd24nO1xuaW1wb3J0IHsgTWNJY29uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgTWNUb29sdGlwVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNUcmVlT3B0aW9uIH0gZnJvbSAnLi90cmVlLW9wdGlvbi5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlQWN0aW9uQmFzZSB7fVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY1RyZWVOb2RlQWN0aW9uTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jVHJlZU5vZGVBY3Rpb25CYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1jVHJlZU5vZGVBY3Rpb25CYXNlKSk7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLW5vZGUtYWN0aW9uJyxcbiAgICBleHBvcnRBczogJ21jVHJlZU5vZGVBY3Rpb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIiEhY3VzdG9tSWNvblwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJtYyBtYy1pY29uIG1jLWVsbGlwc2lzXzE2XCIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+PC9pPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLWljb25dXCIgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL2FjdGlvbi5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtbm9kZS1hY3Rpb24nLFxuICAgICAgICAnW2NsYXNzLm1jLW9wZW5lZF0nOiAnZmFsc2UnLFxuXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci50YWJJbmRleF0nOiAnLTEnLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ29uRm9jdXMoJGV2ZW50KScsXG4gICAgICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlQWN0aW9uQ29tcG9uZW50IGV4dGVuZHMgTWNUcmVlTm9kZUFjdGlvbk1peGluQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBAQ29udGVudENoaWxkKE1jSWNvbikgY3VzdG9tSWNvbjogTWNJY29uO1xuXG4gICAgaGFzRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVHJpZ2dlcj8ub3BlbmVkIHx8IHRoaXMuaGFzRm9jdXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgb3B0aW9uOiBNY1RyZWVPcHRpb24sXG4gICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHJpdmF0ZSBkcm9wZG93blRyaWdnZXI6IE1jRHJvcGRvd25UcmlnZ2VyLFxuICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHByaXZhdGUgdG9vbHRpcDogTWNUb29sdGlwVHJpZ2dlclxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93blRyaWdnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25UcmlnZ2VyLnJlc3RvcmVGb2N1cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duVHJpZ2dlci5kcm9wZG93bkNsb3NlZFxuICAgICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRTaG93aW5nVG9vbHRpcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc3Ryb3lSZWFzb246IEZvY3VzT3JpZ2luID0gdGhpcy5kcm9wZG93blRyaWdnZXIubGFzdERlc3Ryb3lSZWFzb24gPT09ICdrZXlkb3duJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAna2V5Ym9hcmQnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICdwcm9ncmFtJztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKGRlc3Ryb3lSZWFzb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNNb25pdG9yICYmIG9yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIG9yaWdpbiwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25Gb2N1cygkZXZlbnQpIHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oJGV2ZW50KSB7XG4gICAgICAgIGlmIChbU1BBQ0UsIEVOVEVSXS5pbmNsdWRlcygkZXZlbnQua2V5Q29kZSkgJiYgdGhpcy5kcm9wZG93blRyaWdnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25UcmlnZ2VyLm9wZW5lZEJ5ID0gJ2tleWJvYXJkJztcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25UcmlnZ2VyLnRvZ2dsZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCRldmVudC5zaGlmdEtleSAmJiAkZXZlbnQua2V5Q29kZSA9PT0gVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9uLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoJGV2ZW50LmtleUNvZGUgPT09IFRBQikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXZlbnRTaG93aW5nVG9vbHRpcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRvb2x0aXApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy50b29sdGlwLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudG9vbHRpcC5kaXNhYmxlZCA9IGZhbHNlKTtcbiAgICB9XG59XG4iXX0=
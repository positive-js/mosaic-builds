import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, Inject, Optional, HostListener, ContentChild } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import { Subject } from 'rxjs';
import { MC_DROPDOWN_PANEL } from './dropdown.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@ptsecurity/mosaic/icon";
import * as i3 from "@angular/common";
// Boilerplate for applying mixins to McDropdownItem.
/** @docs-private */
class McDropdownItemBase {
}
// tslint:disable-next-line:naming-convention
const McDropdownItemMixinBase = mixinDisabled(McDropdownItemBase);
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
export class McDropdownItem extends McDropdownItemMixinBase {
    constructor(elementRef, focusMonitor, parentDropdownPanel) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.parentDropdownPanel = parentDropdownPanel;
        /** Stream that emits when the dropdown item is hovered. */
        this.hovered = new Subject();
        /** Stream that emits when the menu item is focused. */
        this.focused = new Subject();
        /** Whether the dropdown item is highlighted. */
        this.highlighted = false;
        /** Whether the dropdown item acts as a trigger for a nested dropdown. */
        this.isNested = false;
    }
    ngAfterViewInit() {
        if (this.focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for menu items only when the focus was not caused by a
            // mouse or touch interaction.
            this.focusMonitor.monitor(this.elementRef, false);
        }
    }
    ngOnDestroy() {
        if (this.focusMonitor) {
            this.focusMonitor.stopMonitoring(this.elementRef);
        }
        this.hovered.complete();
        this.focused.complete();
    }
    resetStyles() {
        this.getHostElement().classList.remove('cdk-keyboard-focused');
    }
    /** Focuses the dropdown item. */
    focus(origin, options) {
        if (this.focusMonitor && origin) {
            this.focusMonitor.focusVia(this.getHostElement(), origin, options);
        }
        else {
            this.getHostElement().focus(options);
        }
        this.focused.next(this);
    }
    /** Returns the host DOM element. */
    getHostElement() {
        return this.elementRef.nativeElement;
    }
    /** Used to set the `tabindex`. */
    getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /** Prevents the default element actions if it is disabled. */
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    checkDisabled(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /** Emits to the hover stream. */
    // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
    // In Ivy the `host` bindings will be merged when this class is extended, whereas in
    // ViewEngine they're overwritten.
    // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
    // tslint:disable-next-line:no-host-decorator-in-concrete
    handleMouseEnter() {
        this.hovered.next(this);
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
        const clone = this.getHostElement().cloneNode(true);
        const icons = clone.querySelectorAll('[mc-icon], .mc-icon');
        // Strip away icons so they don't show up in the text.
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < icons.length; i++) {
            const icon = icons[i];
            icon.parentNode?.removeChild(icon);
        }
        return clone.textContent?.trim() || '';
    }
    haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McDropdownItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDropdownItem, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }, { token: MC_DROPDOWN_PANEL, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDropdownItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McDropdownItem, selector: "mc-dropdown-item, [mc-dropdown-item]", inputs: { disabled: "disabled" }, host: { listeners: { "click": "checkDisabled($event)", "mouseenter": "handleMouseEnter()" }, properties: { "class.mc-dropdown-item_with-icon": "icon", "class.mc-dropdown-item_highlighted": "highlighted", "attr.disabled": "disabled || null", "attr.tabindex": "getTabIndex()" }, classAttribute: "mc-dropdown-item" }, queries: [{ propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcDropdownItem"], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-dropdown-item-wrapper\">\n    <ng-content></ng-content>\n</div>\n<i *ngIf=\"isNested\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown-trigger__icon\"></i>\n<div class=\"mc-dropdown-item-overlay\" (click)=\"haltDisabledEvents($event)\"></div>\n", styles: [".mc-dropdown-item{-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:none;padding:0;text-align:left;white-space:nowrap}.mc-dropdown-item:not([disabled]){cursor:pointer}.mc-dropdown-item .mc-dropdown-item__caption{margin-top:4px}.mc-dropdown-item.mc-dropdown-item_with-icon .mc-dropdown-item__caption{margin-left:24px}.mc-dropdown-item .docs-navbar-version__num{margin-right:4px}.mc-dropdown-item-wrapper{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:var(--mc-dropdown-item-size-padding, 5px 15px)}.mc-dropdown-item-wrapper [mc-icon]{padding:var(--mc-dropdown-item-size-icon-padding, 0 8px 2px 0)}.mc-dropdown-item-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;border-radius:inherit}.mc-dropdown-trigger__icon{margin-left:auto;padding-right:var(--dropdown-trigger-size-icon-padding-right, 8px)}.mc-dropdown__group-header{-webkit-user-select:none;user-select:none;padding:var(--mc-dropdown-item-size-padding, 6px 15px)}.mc-dropdown__group-header.mc-dropdown__group-header_small{padding:var(--mc-dropdown-item-size-padding, 8px 15px)}.mc-dropdown__divider{height:var(--mc-dropdown-divider-size-height, 1px);margin:var(--mc-dropdown-divider-size-margin, 4px 0)}\n"], components: [{ type: i2.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDropdownItem, decorators: [{
            type: Component,
            args: [{ selector: 'mc-dropdown-item, [mc-dropdown-item]', exportAs: 'mcDropdownItem', inputs: ['disabled'], host: {
                        class: 'mc-dropdown-item',
                        '[class.mc-dropdown-item_with-icon]': 'icon',
                        '[class.mc-dropdown-item_highlighted]': 'highlighted',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'getTabIndex()'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mc-dropdown-item-wrapper\">\n    <ng-content></ng-content>\n</div>\n<i *ngIf=\"isNested\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown-trigger__icon\"></i>\n<div class=\"mc-dropdown-item-overlay\" (click)=\"haltDisabledEvents($event)\"></div>\n", styles: [".mc-dropdown-item{-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:none;padding:0;text-align:left;white-space:nowrap}.mc-dropdown-item:not([disabled]){cursor:pointer}.mc-dropdown-item .mc-dropdown-item__caption{margin-top:4px}.mc-dropdown-item.mc-dropdown-item_with-icon .mc-dropdown-item__caption{margin-left:24px}.mc-dropdown-item .docs-navbar-version__num{margin-right:4px}.mc-dropdown-item-wrapper{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:var(--mc-dropdown-item-size-padding, 5px 15px)}.mc-dropdown-item-wrapper [mc-icon]{padding:var(--mc-dropdown-item-size-icon-padding, 0 8px 2px 0)}.mc-dropdown-item-overlay{position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;border-radius:inherit}.mc-dropdown-trigger__icon{margin-left:auto;padding-right:var(--dropdown-trigger-size-icon-padding-right, 8px)}.mc-dropdown__group-header{-webkit-user-select:none;user-select:none;padding:var(--mc-dropdown-item-size-padding, 6px 15px)}.mc-dropdown__group-header.mc-dropdown__group-header_small{padding:var(--mc-dropdown-item-size-padding, 8px 15px)}.mc-dropdown__divider{height:var(--mc-dropdown-divider-size-height, 1px);margin:var(--mc-dropdown-divider-size-margin, 4px 0)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DROPDOWN_PANEL]
                }, {
                    type: Optional
                }] }]; }, propDecorators: { icon: [{
                type: ContentChild,
                args: [McIcon]
            }], checkDisabled: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], handleMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vZHJvcGRvd24taXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vZHJvcGRvd24taXRlbS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixRQUFRLEVBRVIsWUFBWSxFQUNaLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFHdEUscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixNQUFNLGtCQUFrQjtDQUFHO0FBQzNCLDZDQUE2QztBQUM3QyxNQUFNLHVCQUF1QixHQUErQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU5Rzs7O0dBR0c7QUFrQkgsTUFBTSxPQUFPLGNBQWUsU0FBUSx1QkFBdUI7SUFpQnZELFlBQ1ksVUFBbUMsRUFDbkMsWUFBMEIsRUFDWSxtQkFBcUM7UUFFbkYsS0FBSyxFQUFFLENBQUM7UUFKQSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNZLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBa0I7UUFmdkYsMkRBQTJEO1FBQ2xELFlBQU8sR0FBRyxJQUFJ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QUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFZO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNqQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDOztpSkFoSFEsY0FBYyx3RUFvQlgsaUJBQWlCO3FJQXBCcEIsY0FBYywyY0FHVCxNQUFNLHFHQ25EeEIsMFFBS0E7MkZEMkNhLGNBQWM7a0JBakIxQixTQUFTOytCQUNJLHNDQUFzQyxZQUN0QyxnQkFBZ0IsVUFHbEIsQ0FBQyxVQUFVLENBQUMsUUFDZDt3QkFDRixLQUFLLEVBQUUsa0JBQWtCO3dCQUN6QixvQ0FBb0MsRUFBRSxNQUFNO3dCQUM1QyxzQ0FBc0MsRUFBRSxhQUFhO3dCQUVyRCxpQkFBaUIsRUFBRSxrQkFBa0I7d0JBQ3JDLGlCQUFpQixFQUFFLGVBQWU7cUJBQ3JDLG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzswQkFzQmhDLE1BQU07MkJBQUMsaUJBQWlCOzswQkFBRyxRQUFROzRDQWpCbEIsSUFBSTtzQkFBekIsWUFBWTt1QkFBQyxNQUFNO2dCQXVFZSxhQUFhO3NCQUEvQyxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFhTCxnQkFBZ0I7c0JBQTNDLFlBQVk7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBJbmplY3QsXG4gICAgT3B0aW9uYWwsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgQ29udGVudENoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBtaXhpbkRpc2FibGVkIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNQ19EUk9QRE9XTl9QQU5FTCwgTWNEcm9wZG93blBhbmVsIH0gZnJvbSAnLi9kcm9wZG93bi50eXBlcyc7XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY0Ryb3Bkb3duSXRlbS5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBNY0Ryb3Bkb3duSXRlbUJhc2Uge31cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuY29uc3QgTWNEcm9wZG93bkl0ZW1NaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jRHJvcGRvd25JdGVtQmFzZSA9IG1peGluRGlzYWJsZWQoTWNEcm9wZG93bkl0ZW1CYXNlKTtcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGluc2lkZSBhbiBtYy1kcm9wZG93biB0YWcuXG4gKiBJdCBleGlzdHMgbW9zdGx5IHRvIHNldCB0aGUgcm9sZSBhdHRyaWJ1dGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZHJvcGRvd24taXRlbSwgW21jLWRyb3Bkb3duLWl0ZW1dJyxcbiAgICBleHBvcnRBczogJ21jRHJvcGRvd25JdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duLWl0ZW0uaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2Ryb3Bkb3duLWl0ZW0uc2NzcyddLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1kcm9wZG93bi1pdGVtJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kcm9wZG93bi1pdGVtX3dpdGgtaWNvbl0nOiAnaWNvbicsXG4gICAgICAgICdbY2xhc3MubWMtZHJvcGRvd24taXRlbV9oaWdobGlnaHRlZF0nOiAnaGlnaGxpZ2h0ZWQnLFxuXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnZ2V0VGFiSW5kZXgoKSdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNEcm9wZG93bkl0ZW0gZXh0ZW5kcyBNY0Ryb3Bkb3duSXRlbU1peGluQmFzZSBpbXBsZW1lbnRzXG4gICAgSUZvY3VzYWJsZU9wdGlvbiwgQ2FuRGlzYWJsZSwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNJY29uKSBpY29uOiBNY0ljb247XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aGUgZHJvcGRvd24gaXRlbSBpcyBob3ZlcmVkLiAqL1xuICAgIHJlYWRvbmx5IGhvdmVyZWQgPSBuZXcgU3ViamVjdDxNY0Ryb3Bkb3duSXRlbT4oKTtcblxuICAgIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSBtZW51IGl0ZW0gaXMgZm9jdXNlZC4gKi9cbiAgICByZWFkb25seSBmb2N1c2VkID0gbmV3IFN1YmplY3Q8TWNEcm9wZG93bkl0ZW0+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXRlbSBpcyBoaWdobGlnaHRlZC4gKi9cbiAgICBoaWdobGlnaHRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGl0ZW0gYWN0cyBhcyBhIHRyaWdnZXIgZm9yIGEgbmVzdGVkIGRyb3Bkb3duLiAqL1xuICAgIGlzTmVzdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgQEluamVjdChNQ19EUk9QRE9XTl9QQU5FTCkgQE9wdGlvbmFsKCkgcHVibGljIHBhcmVudERyb3Bkb3duUGFuZWw/OiBNY0Ryb3Bkb3duUGFuZWxcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgLy8gU3RhcnQgbW9uaXRvcmluZyB0aGUgZWxlbWVudCBzbyBpdCBnZXRzIHRoZSBhcHByb3ByaWF0ZSBmb2N1c2VkIGNsYXNzZXMuIFdlIHdhbnRcbiAgICAgICAgICAgIC8vIHRvIHNob3cgdGhlIGZvY3VzIHN0eWxlIGZvciBtZW51IGl0ZW1zIG9ubHkgd2hlbiB0aGUgZm9jdXMgd2FzIG5vdCBjYXVzZWQgYnkgYVxuICAgICAgICAgICAgLy8gbW91c2Ugb3IgdG91Y2ggaW50ZXJhY3Rpb24uXG4gICAgICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaG92ZXJlZC5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmZvY3VzZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICByZXNldFN0eWxlcygpIHtcbiAgICAgICAgdGhpcy5nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoJ2Nkay1rZXlib2FyZC1mb2N1c2VkJyk7XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGRyb3Bkb3duIGl0ZW0uICovXG4gICAgZm9jdXMob3JpZ2luPzogRm9jdXNPcmlnaW4sIG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNNb25pdG9yICYmIG9yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5nZXRIb3N0RWxlbWVudCgpLCBvcmlnaW4sIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRIb3N0RWxlbWVudCgpLmZvY3VzKG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkLm5leHQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIGhvc3QgRE9NIGVsZW1lbnQuICovXG4gICAgZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gc2V0IHRoZSBgdGFiaW5kZXhgLiAqL1xuICAgIGdldFRhYkluZGV4KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gJy0xJyA6ICcwJztcbiAgICB9XG5cbiAgICAvKiogUHJldmVudHMgdGhlIGRlZmF1bHQgZWxlbWVudCBhY3Rpb25zIGlmIGl0IGlzIGRpc2FibGVkLiAqL1xuICAgIC8vIFdlIGhhdmUgdG8gdXNlIGEgYEhvc3RMaXN0ZW5lcmAgaGVyZSBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggSXZ5IGFuZCBWaWV3RW5naW5lLlxuICAgIC8vIEluIEl2eSB0aGUgYGhvc3RgIGJpbmRpbmdzIHdpbGwgYmUgbWVyZ2VkIHdoZW4gdGhpcyBjbGFzcyBpcyBleHRlbmRlZCwgd2hlcmVhcyBpblxuICAgIC8vIFZpZXdFbmdpbmUgdGhleSdyZSBvdmVyd3JpdHRlbi5cbiAgICAvLyBUT0RPKGNyaXNiZXRvKTogd2UgbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAgb25jZSBJdnkgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBjaGVja0Rpc2FibGVkKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIHRvIHRoZSBob3ZlciBzdHJlYW0uICovXG4gICAgLy8gV2UgaGF2ZSB0byB1c2UgYSBgSG9zdExpc3RlbmVyYCBoZXJlIGluIG9yZGVyIHRvIHN1cHBvcnQgYm90aCBJdnkgYW5kIFZpZXdFbmdpbmUuXG4gICAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgYmluZGluZ3Mgd2lsbCBiZSBtZXJnZWQgd2hlbiB0aGlzIGNsYXNzIGlzIGV4dGVuZGVkLCB3aGVyZWFzIGluXG4gICAgLy8gVmlld0VuZ2luZSB0aGV5J3JlIG92ZXJ3cml0dGVuLlxuICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB3ZSBtb3ZlIHRoaXMgYmFjayBpbnRvIGBob3N0YCBvbmNlIEl2eSBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdC5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICAgICAgdGhpcy5ob3ZlcmVkLm5leHQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIEdldHMgdGhlIGxhYmVsIHRvIGJlIHVzZWQgd2hlbiBkZXRlcm1pbmluZyB3aGV0aGVyIHRoZSBvcHRpb24gc2hvdWxkIGJlIGZvY3VzZWQuICovXG4gICAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY2xvbmUgPSB0aGlzLmdldEhvc3RFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBpY29ucyA9IGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ1ttYy1pY29uXSwgLm1jLWljb24nKTtcblxuICAgICAgICAvLyBTdHJpcCBhd2F5IGljb25zIHNvIHRoZXkgZG9uJ3Qgc2hvdyB1cCBpbiB0aGUgdGV4dC5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1mb3Itb2ZcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaWNvbiA9IGljb25zW2ldO1xuICAgICAgICAgICAgaWNvbi5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZChpY29uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbG9uZS50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuICAgIH1cblxuICAgIGhhbHREaXNhYmxlZEV2ZW50cyhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1jLWRyb3Bkb3duLWl0ZW0td3JhcHBlclwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuPGkgKm5nSWY9XCJpc05lc3RlZFwiIG1jLWljb249XCJtYy1hbmdsZS1yaWdodC1NXzE2XCIgY2xhc3M9XCJtYy1kcm9wZG93bi10cmlnZ2VyX19pY29uXCI+PC9pPlxuPGRpdiBjbGFzcz1cIm1jLWRyb3Bkb3duLWl0ZW0tb3ZlcmxheVwiIChjbGljayk9XCJoYWx0RGlzYWJsZWRFdmVudHMoJGV2ZW50KVwiPjwvZGl2PlxuIl19
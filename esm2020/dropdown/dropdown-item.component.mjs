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
}
/** @nocollapse */ /** @nocollapse */ McDropdownItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McDropdownItem, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }, { token: MC_DROPDOWN_PANEL, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDropdownItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McDropdownItem, selector: "mc-dropdown-item, [mc-dropdown-item]", inputs: { disabled: "disabled" }, host: { listeners: { "click": "checkDisabled($event)", "mouseenter": "handleMouseEnter()" }, properties: { "class.mc-dropdown-item_with-icon": "icon", "class.mc-dropdown-item_highlighted": "highlighted", "attr.disabled": "disabled || null", "attr.tabindex": "getTabIndex()" }, classAttribute: "mc-dropdown-item" }, queries: [{ propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcDropdownItem"], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-dropdown-item-wrapper\">\n    <ng-content></ng-content>\n</div>\n<i *ngIf=\"isNested\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown-trigger__icon\"></i>\n", styles: [".mc-dropdown-item{-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:none;padding:0;text-align:left;white-space:nowrap}.mc-dropdown-item:not([disabled]){cursor:pointer}.mc-dropdown-item .mc-dropdown-item__caption{margin-top:4px}.mc-dropdown-item.mc-dropdown-item_with-icon .mc-dropdown-item__caption{margin-left:24px}.mc-dropdown-item .docs-navbar-version__num{margin-right:4px}.mc-dropdown-item-wrapper{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:5px 15px;padding:var(--mc-dropdown-item-size-padding, 5px 15px)}.mc-dropdown-item-wrapper [mc-icon]{padding:0 8px 2px 0;padding:var(--mc-dropdown-item-size-icon-padding, 0 8px 2px 0)}.mc-dropdown-trigger__icon{margin-left:auto;padding-right:8px;padding-right:var(--dropdown-trigger-size-icon-padding-right, 8px)}.mc-dropdown__group-header{-webkit-user-select:none;user-select:none;padding:6px 15px;padding:var(--mc-dropdown-item-size-padding, 6px 15px)}.mc-dropdown__group-header.mc-dropdown__group-header_small{padding:8px 15px;padding:var(--mc-dropdown-item-size-padding, 8px 15px)}.mc-dropdown__divider{height:1px;height:var(--mc-dropdown-divider-size-height, 1px);margin:4px 0;margin:var(--mc-dropdown-divider-size-margin, 4px 0)}\n"], components: [{ type: i2.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.McIconCSSStyler, selector: "[mc-icon]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McDropdownItem, decorators: [{
            type: Component,
            args: [{ selector: 'mc-dropdown-item, [mc-dropdown-item]', exportAs: 'mcDropdownItem', inputs: ['disabled'], host: {
                        class: 'mc-dropdown-item',
                        '[class.mc-dropdown-item_with-icon]': 'icon',
                        '[class.mc-dropdown-item_highlighted]': 'highlighted',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'getTabIndex()'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mc-dropdown-item-wrapper\">\n    <ng-content></ng-content>\n</div>\n<i *ngIf=\"isNested\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown-trigger__icon\"></i>\n", styles: [".mc-dropdown-item{-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;box-sizing:border-box;width:100%;border:1px solid transparent;outline:none;padding:0;text-align:left;white-space:nowrap}.mc-dropdown-item:not([disabled]){cursor:pointer}.mc-dropdown-item .mc-dropdown-item__caption{margin-top:4px}.mc-dropdown-item.mc-dropdown-item_with-icon .mc-dropdown-item__caption{margin-left:24px}.mc-dropdown-item .docs-navbar-version__num{margin-right:4px}.mc-dropdown-item-wrapper{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:5px 15px;padding:var(--mc-dropdown-item-size-padding, 5px 15px)}.mc-dropdown-item-wrapper [mc-icon]{padding:0 8px 2px 0;padding:var(--mc-dropdown-item-size-icon-padding, 0 8px 2px 0)}.mc-dropdown-trigger__icon{margin-left:auto;padding-right:8px;padding-right:var(--dropdown-trigger-size-icon-padding-right, 8px)}.mc-dropdown__group-header{-webkit-user-select:none;user-select:none;padding:6px 15px;padding:var(--mc-dropdown-item-size-padding, 6px 15px)}.mc-dropdown__group-header.mc-dropdown__group-header_small{padding:8px 15px;padding:var(--mc-dropdown-item-size-padding, 8px 15px)}.mc-dropdown__divider{height:1px;height:var(--mc-dropdown-divider-size-height, 1px);margin:4px 0;margin:var(--mc-dropdown-divider-size-margin, 4px 0)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vZHJvcGRvd24taXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZHJvcGRvd24vZHJvcGRvd24taXRlbS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixRQUFRLEVBRVIsWUFBWSxFQUNaLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFHdEUscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixNQUFNLGtCQUFrQjtDQUFHO0FBQzNCLDZDQUE2QztBQUM3QyxNQUFNLHVCQUF1QixHQUErQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU5Rzs7O0dBR0c7QUFrQkgsTUFBTSxPQUFPLGNBQWUsU0FBUSx1QkFBdUI7SUFpQnZELFlBQ1ksVUFBbUMsRUFDbkMsWUFBMEIsRUFDWSxtQkFBcUM7UUFFbkYsS0FBSyxFQUFFLENBQUM7UUFKQSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNZLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBa0I7UUFmdkYsMkRBQTJEO1FBQ2xELFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBa0IsQ0FBQztRQUVqRCx1REFBdUQ7UUFDOUMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFrQixDQUFDO1FBRWpELGdEQUFnRDtRQUNoRCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3Qix5RUFBeUU7UUFDekUsYUFBUSxHQUFZLEtBQUssQ0FBQztJQVExQixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixtRkFBbUY7WUFDbkYsaUZBQWlGO1lBQ2pGLDhCQUE4QjtZQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsaUNBQWlDO0lBQ2pDLEtBQUssQ0FBQyxNQUFvQixFQUFFLE9BQXNCO1FBQzlDLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN0RTthQUFNO1lBQ0gsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxvQ0FBb0M7SUFDcEMsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQztJQUVELGtDQUFrQztJQUNsQyxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN0QyxDQUFDO0lBRUQsOERBQThEO0lBQzlELG9GQUFvRjtJQUNwRixvRkFBb0Y7SUFDcEYsa0NBQWtDO0lBQ2xDLGtGQUFrRjtJQUNsRix5REFBeUQ7SUFDdEIsYUFBYSxDQUFDLEtBQVk7UUFDekQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRCxpQ0FBaUM7SUFDakMsb0ZBQW9GO0lBQ3BGLG9GQUFvRjtJQUNwRixrQ0FBa0M7SUFDbEMsa0ZBQWtGO0lBQ2xGLHlEQUF5RDtJQUM3QixnQkFBZ0I7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELHVGQUF1RjtJQUN2RixRQUFRO1FBQ0osTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLENBQUM7UUFDbkUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFNUQsc0RBQXNEO1FBQ3RELHlDQUF5QztRQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzNDLENBQUM7O2lKQXhHUSxjQUFjLHdFQW9CWCxpQkFBaUI7cUlBcEJwQixjQUFjLDJjQUdULE1BQU0scUdDbkR4QixtTEFJQTsyRkQ0Q2EsY0FBYztrQkFqQjFCLFNBQVM7K0JBQ0ksc0NBQXNDLFlBQ3RDLGdCQUFnQixVQUdsQixDQUFDLFVBQVUsQ0FBQyxRQUNkO3dCQUNGLEtBQUssRUFBRSxrQkFBa0I7d0JBQ3pCLG9DQUFvQyxFQUFFLE1BQU07d0JBQzVDLHNDQUFzQyxFQUFFLGFBQWE7d0JBRXJELGlCQUFpQixFQUFFLGtCQUFrQjt3QkFDckMsaUJBQWlCLEVBQUUsZUFBZTtxQkFDckMsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7OzBCQXNCaEMsTUFBTTsyQkFBQyxpQkFBaUI7OzBCQUFHLFFBQVE7NENBakJsQixJQUFJO3NCQUF6QixZQUFZO3VCQUFDLE1BQU07Z0JBdUVlLGFBQWE7c0JBQS9DLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWFMLGdCQUFnQjtzQkFBM0MsWUFBWTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEluamVjdCxcbiAgICBPcHRpb25hbCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1DX0RST1BET1dOX1BBTkVMLCBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLnR5cGVzJztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jRHJvcGRvd25JdGVtLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNsYXNzIE1jRHJvcGRvd25JdGVtQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5jb25zdCBNY0Ryb3Bkb3duSXRlbU1peGluQmFzZTogQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWNEcm9wZG93bkl0ZW1CYXNlID0gbWl4aW5EaXNhYmxlZChNY0Ryb3Bkb3duSXRlbUJhc2UpO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW5zaWRlIGFuIG1jLWRyb3Bkb3duIHRhZy5cbiAqIEl0IGV4aXN0cyBtb3N0bHkgdG8gc2V0IHRoZSByb2xlIGF0dHJpYnV0ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kcm9wZG93bi1pdGVtLCBbbWMtZHJvcGRvd24taXRlbV0nLFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93bkl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnZHJvcGRvd24taXRlbS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZHJvcGRvd24taXRlbS5zY3NzJ10sXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWRyb3Bkb3duLWl0ZW0nLFxuICAgICAgICAnW2NsYXNzLm1jLWRyb3Bkb3duLWl0ZW1fd2l0aC1pY29uXSc6ICdpY29uJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kcm9wZG93bi1pdGVtX2hpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG5cbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdnZXRUYWJJbmRleCgpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duSXRlbSBleHRlbmRzIE1jRHJvcGRvd25JdGVtTWl4aW5CYXNlIGltcGxlbWVudHNcbiAgICBJRm9jdXNhYmxlT3B0aW9uLCBDYW5EaXNhYmxlLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQENvbnRlbnRDaGlsZChNY0ljb24pIGljb246IE1jSWNvbjtcblxuICAgIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSBkcm9wZG93biBpdGVtIGlzIGhvdmVyZWQuICovXG4gICAgcmVhZG9ubHkgaG92ZXJlZCA9IG5ldyBTdWJqZWN0PE1jRHJvcGRvd25JdGVtPigpO1xuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIG1lbnUgaXRlbSBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IGZvY3VzZWQgPSBuZXcgU3ViamVjdDxNY0Ryb3Bkb3duSXRlbT4oKTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBpdGVtIGlzIGhpZ2hsaWdodGVkLiAqL1xuICAgIGhpZ2hsaWdodGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXRlbSBhY3RzIGFzIGEgdHJpZ2dlciBmb3IgYSBuZXN0ZWQgZHJvcGRvd24uICovXG4gICAgaXNOZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBASW5qZWN0KE1DX0RST1BET1dOX1BBTkVMKSBAT3B0aW9uYWwoKSBwdWJsaWMgcGFyZW50RHJvcGRvd25QYW5lbD86IE1jRHJvcGRvd25QYW5lbFxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICAvLyBTdGFydCBtb25pdG9yaW5nIHRoZSBlbGVtZW50IHNvIGl0IGdldHMgdGhlIGFwcHJvcHJpYXRlIGZvY3VzZWQgY2xhc3Nlcy4gV2Ugd2FudFxuICAgICAgICAgICAgLy8gdG8gc2hvdyB0aGUgZm9jdXMgc3R5bGUgZm9yIG1lbnUgaXRlbXMgb25seSB3aGVuIHRoZSBmb2N1cyB3YXMgbm90IGNhdXNlZCBieSBhXG4gICAgICAgICAgICAvLyBtb3VzZSBvciB0b3VjaCBpbnRlcmFjdGlvbi5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ob3ZlcmVkLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHJlc2V0U3R5bGVzKCkge1xuICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuY2xhc3NMaXN0LnJlbW92ZSgnY2RrLWtleWJvYXJkLWZvY3VzZWQnKTtcbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgZHJvcGRvd24gaXRlbS4gKi9cbiAgICBmb2N1cyhvcmlnaW4/OiBGb2N1c09yaWdpbiwgb3B0aW9ucz86IEZvY3VzT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mb2N1c01vbml0b3IgJiYgb3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmdldEhvc3RFbGVtZW50KCksIG9yaWdpbiwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMob3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzZWQubmV4dCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgaG9zdCBET00gZWxlbWVudC4gKi9cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBzZXQgdGhlIGB0YWJpbmRleGAuICovXG4gICAgZ2V0VGFiSW5kZXgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAnLTEnIDogJzAnO1xuICAgIH1cblxuICAgIC8qKiBQcmV2ZW50cyB0aGUgZGVmYXVsdCBlbGVtZW50IGFjdGlvbnMgaWYgaXQgaXMgZGlzYWJsZWQuICovXG4gICAgLy8gV2UgaGF2ZSB0byB1c2UgYSBgSG9zdExpc3RlbmVyYCBoZXJlIGluIG9yZGVyIHRvIHN1cHBvcnQgYm90aCBJdnkgYW5kIFZpZXdFbmdpbmUuXG4gICAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgYmluZGluZ3Mgd2lsbCBiZSBtZXJnZWQgd2hlbiB0aGlzIGNsYXNzIGlzIGV4dGVuZGVkLCB3aGVyZWFzIGluXG4gICAgLy8gVmlld0VuZ2luZSB0aGV5J3JlIG92ZXJ3cml0dGVuLlxuICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB3ZSBtb3ZlIHRoaXMgYmFjayBpbnRvIGBob3N0YCBvbmNlIEl2eSBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdC5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIGNoZWNrRGlzYWJsZWQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW1pdHMgdG8gdGhlIGhvdmVyIHN0cmVhbS4gKi9cbiAgICAvLyBXZSBoYXZlIHRvIHVzZSBhIGBIb3N0TGlzdGVuZXJgIGhlcmUgaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIEl2eSBhbmQgVmlld0VuZ2luZS5cbiAgICAvLyBJbiBJdnkgdGhlIGBob3N0YCBiaW5kaW5ncyB3aWxsIGJlIG1lcmdlZCB3aGVuIHRoaXMgY2xhc3MgaXMgZXh0ZW5kZWQsIHdoZXJlYXMgaW5cbiAgICAvLyBWaWV3RW5naW5lIHRoZXkncmUgb3ZlcndyaXR0ZW4uXG4gICAgLy8gVE9ETyhjcmlzYmV0byk6IHdlIG1vdmUgdGhpcyBiYWNrIGludG8gYGhvc3RgIG9uY2UgSXZ5IGlzIHR1cm5lZCBvbiBieSBkZWZhdWx0LlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgICAgICB0aGlzLmhvdmVyZWQubmV4dCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogR2V0cyB0aGUgbGFiZWwgdG8gYmUgdXNlZCB3aGVuIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIG9wdGlvbiBzaG91bGQgYmUgZm9jdXNlZC4gKi9cbiAgICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBjbG9uZSA9IHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGljb25zID0gY2xvbmUucXVlcnlTZWxlY3RvckFsbCgnW21jLWljb25dLCAubWMtaWNvbicpO1xuXG4gICAgICAgIC8vIFN0cmlwIGF3YXkgaWNvbnMgc28gdGhleSBkb24ndCBzaG93IHVwIGluIHRoZSB0ZXh0LlxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWZvci1vZlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGljb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpY29uID0gaWNvbnNbaV07XG4gICAgICAgICAgICBpY29uLnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKGljb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsb25lLnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1jLWRyb3Bkb3duLWl0ZW0td3JhcHBlclwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuPGkgKm5nSWY9XCJpc05lc3RlZFwiIG1jLWljb249XCJtYy1hbmdsZS1yaWdodC1NXzE2XCIgY2xhc3M9XCJtYy1kcm9wZG93bi10cmlnZ2VyX19pY29uXCI+PC9pPlxuIl19
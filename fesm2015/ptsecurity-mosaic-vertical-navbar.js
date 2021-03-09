import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Optional, Self, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { mixinTabIndex, mixinDisabled } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { trigger, state, style, transition, animate } from '@angular/animations';

class McVerticalNavbarItemIcon {
}
McVerticalNavbarItemIcon.decorators = [
    { type: Directive, args: [{
                selector: 'mc-vertical-navbar-item-icon',
                host: {
                    class: 'mc-vertical-navbar__item-icon'
                }
            },] }
];
class McVerticalNavbarItemBadge {
}
McVerticalNavbarItemBadge.decorators = [
    { type: Component, args: [{
                selector: 'mc-vertical-navbar-badge',
                template: `
        <span class="mc-badge mc-badge_light">
            <ng-content></ng-content>
        </span>
    `,
                host: {
                    class: 'mc-vertical-navbar__badge'
                }
            },] }
];
class McVerticalNavbarItemBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McVerticalNavbarMixinBase = mixinTabIndex(mixinDisabled(McVerticalNavbarItemBase));
class McVerticalNavbarItem extends McVerticalNavbarMixinBase {
    constructor(element, focusMonitor, trigger) {
        super(element);
        this.element = element;
        this.focusMonitor = focusMonitor;
        this.trigger = trigger;
        this.focusMonitor.monitor(this.element.nativeElement).subscribe();
    }
    get hasDropdownAttached() {
        return !!this.trigger;
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.element.nativeElement);
    }
}
McVerticalNavbarItem.decorators = [
    { type: Component, args: [{
                selector: 'a[mc-vertical-navbar-item], mc-vertical-navbar-item',
                template: "<div class=\"mc-vertical-navbar__item\">\n    <ng-content></ng-content>\n    <i *ngIf=\"hasDropdownAttached\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-vertical-navbar__item-dropdown-icon\"></i>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-vertical-navbar-item',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.tabindex]': 'tabIndex'
                },
                styles: [".mc-vertical-navbar__badge{position:absolute;width:var(--mc-navbar-badge-size-width,64px);top:0;left:0}.mc-vertical-navbar__badge .mc-badge{position:absolute;right:4px;top:4px}.mc-vertical-navbar__item-icon{margin-right:var(--mc-vertical-navbar-item-size-icon-margin-right,16px)}.mc-vertical-navbar__item-icon .mc-icon{font-size:var(--mc-vertical-navbar-item-font-icon-size,32px)}.mc-vertical-navbar__title{white-space:nowrap}.mc-vertical-navbar__item-dropdown-icon{margin-left:auto;padding-left:var(--mc-vertical-navbar-item-size-padding-horizontal,16px)}a[mc-vertical-navbar-item],mc-vertical-navbar-item{display:flex;align-items:center;box-sizing:border-box;position:relative;margin:var(--mc-vertical-navbar-item-size-margin,1px 0);width:100%;height:var(--mc-vertical-navbar-item-size-height,64px);cursor:pointer;text-decoration:none}a[mc-vertical-navbar-item] .mc-vertical-navbar__item,mc-vertical-navbar-item .mc-vertical-navbar__item{display:flex;align-items:center;width:100%;height:100%;padding-left:var(--mc-vertical-navbar-item-size-padding-horizontal,16px);padding-right:var(--mc-vertical-navbar-item-size-padding-horizontal,16px)}a[mc-vertical-navbar-item].mc-progress,mc-vertical-navbar-item.mc-progress{cursor:pointer}a[mc-vertical-navbar-item].mc-vertical-navbar__item_active,mc-vertical-navbar-item.mc-vertical-navbar__item_active{cursor:default}a[mc-vertical-navbar-item][disabled],mc-vertical-navbar-item[disabled]{cursor:default;pointer-events:none}"]
            },] }
];
/** @nocollapse */
McVerticalNavbarItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: McDropdownTrigger, decorators: [{ type: Optional }, { type: Self }] }
];

function toggleVerticalNavbarAnimation() {
    return trigger('toggle', [
        state('0', style({
            width: '64px'
        })),
        state('1', style({
            width: '*'
        })),
        transition('0 <=> 1', animate('200ms cubic-bezier(0, 1, 0.5, 1)'))
    ]);
}

class McVerticalNavbarHeader {
}
McVerticalNavbarHeader.decorators = [
    { type: Directive, args: [{
                selector: 'mc-vertical-navbar-header, a[mc-vertical-navbar-header]',
                host: {
                    class: 'mc-vertical-navbar__header'
                }
            },] }
];
class McVerticalNavbarTitle {
}
McVerticalNavbarTitle.decorators = [
    { type: Directive, args: [{
                selector: 'mc-vertical-navbar-title',
                host: {
                    class: 'mc-vertical-navbar__title'
                }
            },] }
];
class McVerticalNavbar {
    constructor(cd) {
        this.cd = cd;
        this.expanded = false;
    }
    toggle() {
        this.expanded = !this.expanded;
        this.cd.markForCheck();
    }
}
McVerticalNavbar.decorators = [
    { type: Component, args: [{
                selector: 'mc-vertical-navbar',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "<nav class=\"mc-vertical-navbar\" [@toggle]=\"expanded\">\n    <div class=\"mc-vertical-navbar__header-area\">\n        <div cdkMonitorElementFocus tabindex=\"0\" class=\"mc-vertical-navbar__toggle-button\"\n             (click)=\"toggle()\"\n             (keydown.space)=\"toggle()\"\n             (keydown.enter)=\"toggle()\"\n        >\n            <i mc-icon=\"mc-hamburger_32\" *ngIf=\"!expanded\"></i>\n            <i mc-icon=\"mc-close-L_32\" *ngIf=\"expanded\"></i>\n        </div>\n        <div cdkMonitorSubtreeFocus *ngIf=\"expanded\">\n            <ng-content select=\"mc-vertical-navbar-header, a[mc-vertical-navbar-header]\"></ng-content>\n        </div>\n    </div>\n\n    <ng-content></ng-content>\n</nav>\n",
                encapsulation: ViewEncapsulation.None,
                animations: [
                    toggleVerticalNavbarAnimation()
                ],
                styles: [".mc-vertical-navbar{height:100%;position:fixed;left:0;top:0;z-index:100;display:flex;flex-direction:column;align-items:flex-start;min-height:100%;overflow:hidden}.mc-vertical-navbar .mc-vertical-navbar__header-area{display:flex;width:100%;align-items:stretch;box-sizing:border-box;min-height:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__header{display:flex;height:100%;justify-content:stretch;text-decoration:none;align-self:stretch;align-items:center}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__toggle-button{cursor:pointer;display:flex;flex:0 0 auto;justify-content:center;align-items:center;align-self:stretch;width:64px}.mc-vertical-navbar .mc-vertical-navbar__header-area .mc-vertical-navbar__title{padding:0 16px}"]
            },] }
];
/** @nocollapse */
McVerticalNavbar.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
McVerticalNavbar.propDecorators = {
    expanded: [{ type: Input }]
};

const COMPONENTS = [
    McVerticalNavbar,
    McVerticalNavbarTitle,
    McVerticalNavbarItem,
    McVerticalNavbarItemIcon,
    McVerticalNavbarItemBadge,
    McVerticalNavbarHeader
];
class McVerticalNavbarModule {
}
McVerticalNavbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule,
                    McIconModule
                ],
                exports: COMPONENTS,
                declarations: COMPONENTS
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McVerticalNavbar, McVerticalNavbarHeader, McVerticalNavbarItem, McVerticalNavbarItemBadge, McVerticalNavbarItemIcon, McVerticalNavbarMixinBase, McVerticalNavbarModule, McVerticalNavbarTitle, toggleVerticalNavbarAnimation as ɵa };
//# sourceMappingURL=ptsecurity-mosaic-vertical-navbar.js.map

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, forwardRef, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { DOWN_ARROW, ENTER, isVerticalMovement, LEFT_ARROW, RIGHT_ARROW, SPACE, TAB, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
import { McNavbarBento, McNavbarItem, McNavbarRectangleElement } from './navbar-item.component';
import { McFocusableComponent } from './navbar.component';
import { toggleVerticalNavbarAnimation } from './vertical-navbar.animation';
import * as i0 from "@angular/core";
export class McVerticalNavbar extends McFocusableComponent {
    constructor(changeDetectorRef) {
        super(changeDetectorRef);
        this.animationDone = new Subject();
        this._expanded = false;
        this.updateExpandedStateForItems = () => {
            var _a;
            (_a = this.rectangleElements) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                item.collapsed = !this.expanded;
                setTimeout(() => { var _a; return (_a = item.button) === null || _a === void 0 ? void 0 : _a.updateClassModifierForIcons(); });
            });
        };
        this.updateTooltipForItems = () => {
            this.items.forEach((item) => item.updateTooltip());
        };
        this.setItemsState = () => {
            Promise.resolve()
                .then(() => { var _a; return (_a = this.rectangleElements) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.vertical = true); });
        };
        this.animationDone
            .subscribe(this.updateTooltipForItems);
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        this._expanded = coerceBooleanProperty(value);
        this.updateExpandedStateForItems();
    }
    ngAfterContentInit() {
        this.setItemsState();
        this.updateExpandedStateForItems();
        this.updateTooltipForItems();
        this.rectangleElements.changes
            .subscribe(this.setItemsState);
        super.ngAfterContentInit();
        this.keyManager.withVerticalOrientation(true);
    }
    toggle() {
        this.expanded = !this.expanded;
        this.changeDetectorRef.markForCheck();
    }
    onKeyDown(event) {
        // tslint:disable-next-line: deprecation
        const keyCode = event.keyCode;
        if ([SPACE, ENTER, LEFT_ARROW, RIGHT_ARROW].includes(keyCode) || isVerticalMovement(event)) {
            event.preventDefault();
        }
        if (keyCode === TAB) {
            this.keyManager.tabOut.next();
            return;
        }
        else if (keyCode === DOWN_ARROW) {
            this.keyManager.setNextItemActive();
        }
        else if (keyCode === UP_ARROW) {
            this.keyManager.setPreviousItemActive();
        }
        else {
            this.keyManager.onKeydown(event);
        }
    }
}
/** @nocollapse */ McVerticalNavbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McVerticalNavbar, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McVerticalNavbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McVerticalNavbar, selector: "mc-vertical-navbar", inputs: { expanded: "expanded" }, host: { listeners: { "focus": "focus()", "blur": "blur()", "keydown": "onKeyDown($event)" }, properties: { "attr.tabindex": "tabIndex" }, classAttribute: "mc-vertical-navbar" }, queries: [{ propertyName: "bento", first: true, predicate: McNavbarBento, descendants: true }, { propertyName: "rectangleElements", predicate: McNavbarRectangleElement, descendants: true }, { propertyName: "items", predicate: McNavbarItem, descendants: true }], exportAs: ["McVerticalNavbar"], usesInheritance: true, ngImport: i0, template: `
        <div class="mc-vertical-navbar__container"
             [@toggle]="expanded"
             (@toggle.done)="animationDone.next()"
             [class.mc-collapsed]="!expanded"
             [class.mc-expanded]="expanded">

            <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
            <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
        </div>
    `, isInline: true, styles: [".mc-vertical-navbar{position:relative;width:56px;width:var(--mc-vertical-navbar-size-states-closed-width, 56px);height:100%}.mc-vertical-navbar .mc-navbar-container{flex-direction:column;align-items:unset}.mc-vertical-navbar .mc-vertical-navbar__container{display:flex;flex-direction:column;justify-content:space-between;height:100%}.mc-vertical-navbar .mc-vertical-navbar__container.mc-collapsed{width:56px;width:var(--mc-vertical-navbar-size-states-closed-width, 56px)}.mc-vertical-navbar .mc-vertical-navbar__container.mc-expanded{width:240px;width:var(--mc-vertical-navbar-size-states-opened-width, 240px)}\n", ".mc-navbar-title,.mc-navbar-subtitle{display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mc-navbar-item{box-sizing:border-box;position:relative;display:flex;align-items:center;padding-left:16px;padding-left:var(--mc-navbar-item-size-padding, 16px);padding-right:16px;padding-right:var(--mc-navbar-item-size-padding, 16px)}.mc-navbar-item.mc-expanded.mc-navbar-bento{position:absolute;top:0;right:0;z-index:1}.mc-navbar-item .mc-badge{position:absolute}.mc-navbar-item__title{display:flex;flex-direction:column;align-self:center;min-width:0}.mc-navbar-item__container{display:flex;flex-direction:row;flex:1 1 auto;justify-content:space-between;min-width:0}.mc-navbar-item__container .mc-icon{align-self:center}.mc-navbar-item.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px)}.mc-navbar-item.mc-horizontal .mc-icon{min-width:16px;min-height:16px}.mc-navbar-item.mc-horizontal .mc-navbar-item__title+.mc-icon{margin-left:2px}.mc-navbar-item.mc-horizontal .mc-icon+.mc-navbar-item__container{margin-left:6px;margin-left:var(--mc-navbar-size-icon-margin, 6px)}.mc-navbar-item.mc-horizontal.mc-navbar-item_collapsed .mc-navbar-item__container{display:none}.mc-navbar-item.mc-horizontal .mc-badge{top:8px;right:8px}.mc-navbar-item.mc-vertical{height:56px;height:var(--mc-navbar-item-size-height_vertical, 56px)}.mc-navbar-item.mc-vertical>.mc-icon{display:flex;justify-content:center;align-items:center;min-width:24px;min-height:24px}.mc-navbar-item.mc-vertical .mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-icon+.mc-navbar-item__title,.mc-navbar-item.mc-vertical .mc-navbar-item__title+.mc-icon{padding-left:16px;padding-left:var(--mc-vertical-navbar-size-icon-margin, 16px)}.mc-navbar-item.mc-vertical.mc-navbar-item_button{padding-left:12px;padding-right:12px}.mc-navbar-item.mc-vertical.mc-expanded .mc-badge{top:16px;right:16px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-badge{top:4px;right:4px}.mc-navbar-item.mc-vertical.mc-collapsed .mc-navbar-item__title{display:none}.mc-navbar-item.mc-navbar-item_button .mc-icon-button{flex:1}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper{justify-content:center}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_left{margin-left:unset}.mc-navbar-item.mc-navbar-item_button .mc-icon-button .mc-button-wrapper .mc-icon.mc-icon_right{margin-right:unset}a.mc-navbar-item,a.mc-navbar-title{text-decoration:none}.mc-navbar-item .mc-navbar-item__overlay,.mc-navbar-brand .mc-navbar-item__overlay,.mc-navbar-toggle .mc-navbar-item__overlay{position:absolute;top:0;right:0;bottom:0;left:0}.mc-navbar-item [mc-button],.mc-navbar-brand [mc-button],.mc-navbar-toggle [mc-button]{z-index:1}\n", ".mc-navbar-logo{display:flex}.mc-navbar-brand{position:relative;display:flex;align-items:center}.mc-navbar-brand .mc-navbar-title{cursor:pointer}a.mc-navbar-brand{text-decoration:none}.mc-navbar-brand.mc-horizontal{height:48px;height:var(--mc-navbar-item-size-height, 48px);padding-right:24px;padding-right:var(--mc-navbar-brand-size-margin-right, 24px)}.mc-navbar-brand.mc-horizontal .mc-navbar-title{padding-left:12px;padding-left:var(--mc-navbar-brand-size-padding, 12px);padding-right:0}.mc-navbar-brand.mc-vertical .mc-navbar-logo{flex-direction:column;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px)}.mc-navbar-brand.mc-vertical .mc-navbar-title{display:flex;align-items:center;height:56px;height:var(--mc-navbar-item-size-height-vertical, 56px);padding-left:0}.mc-navbar-brand.mc-vertical.mc-expanded{align-items:unset}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-logo{padding-left:12px;justify-content:center}.mc-navbar-brand.mc-vertical.mc-expanded .mc-navbar-title{padding-left:16px}.mc-navbar-brand.mc-vertical.mc-collapsed{padding:0}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-logo{align-items:center;justify-content:center;width:100%}.mc-navbar-brand.mc-vertical.mc-collapsed .mc-navbar-title{display:none}\n", ".mc-navbar-divider{display:block}.mc-navbar-divider.mc-vertical{height:1px;margin:8px 12px}.mc-navbar-divider.mc-horizontal{width:1px;height:28px;margin-left:8px;margin-right:8px}\n"], animations: [toggleVerticalNavbarAnimation()], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McVerticalNavbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-vertical-navbar',
                    exportAs: 'McVerticalNavbar',
                    template: `
        <div class="mc-vertical-navbar__container"
             [@toggle]="expanded"
             (@toggle.done)="animationDone.next()"
             [class.mc-collapsed]="!expanded"
             [class.mc-expanded]="expanded">

            <ng-content select="[mc-navbar-container], mc-navbar-container"></ng-content>
            <ng-content select="[mc-navbar-toggle], mc-navbar-toggle"></ng-content>
        </div>
    `,
                    styleUrls: [
                        './vertical-navbar.scss',
                        './navbar-item.scss',
                        './navbar-brand.scss',
                        './navbar-divider.scss'
                    ],
                    host: {
                        class: 'mc-vertical-navbar',
                        '[attr.tabindex]': 'tabIndex',
                        '(focus)': 'focus()',
                        '(blur)': 'blur()',
                        '(keydown)': 'onKeyDown($event)'
                    },
                    animations: [toggleVerticalNavbarAnimation()],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { rectangleElements: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarRectangleElement), { descendants: true }]
            }], items: [{
                type: ContentChildren,
                args: [forwardRef(() => McNavbarItem), { descendants: true }]
            }], bento: [{
                type: ContentChild,
                args: [forwardRef(() => McNavbarBento)]
            }], expanded: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9uYXZiYXIvdmVydGljYWwtbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFVBQVUsRUFDVixLQUFLLEVBQ0wsa0JBQWtCLEVBQ2xCLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ1gsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFDSCxhQUFhLEVBQ2IsWUFBWSxFQUNaLHdCQUF3QixFQUMzQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQW9DNUUsTUFBTSxPQUFPLGdCQUFpQixTQUFRLG9CQUFvQjtJQXVCdEQsWUFBWSxpQkFBb0M7UUFDNUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFoQnBCLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWFyQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBaUQzQixnQ0FBMkIsR0FBRyxHQUFHLEVBQUU7O1lBQ3ZDLE1BQUEsSUFBSSxDQUFDLGlCQUFpQiwwQ0FBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFB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QWxDcEM7Ozs7Ozs7Ozs7S0FVVCxxdkpBZ0JXLENBQUMsNkJBQTZCLEVBQUUsQ0FBQzs0RkFJcEMsZ0JBQWdCO2tCQWpDNUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7S0FVVDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4QixvQkFBb0I7d0JBQ3BCLHFCQUFxQjt3QkFDckIsdUJBQXVCO3FCQUMxQjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLG9CQUFvQjt3QkFDM0IsaUJBQWlCLEVBQUUsVUFBVTt3QkFFN0IsU0FBUyxFQUFFLFNBQVM7d0JBQ3BCLFFBQVEsRUFBRSxRQUFRO3dCQUVsQixXQUFXLEVBQUUsbUJBQW1CO3FCQUNuQztvQkFDRCxVQUFVLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO29CQUM3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDO3dHQUdHLGlCQUFpQjtzQkFEaEIsZUFBZTt1QkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7Z0JBR1YsS0FBSztzQkFBNUUsZUFBZTt1QkFBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2dCQUV2QixLQUFLO3NCQUFuRCxZQUFZO3VCQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBS3pDLFFBQVE7c0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5URVIsXG4gICAgaXNWZXJ0aWNhbE1vdmVtZW50LFxuICAgIExFRlRfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgU1BBQ0UsXG4gICAgVEFCLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgTWNOYXZiYXJCZW50byxcbiAgICBNY05hdmJhckl0ZW0sXG4gICAgTWNOYXZiYXJSZWN0YW5nbGVFbGVtZW50XG59IGZyb20gJy4vbmF2YmFyLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE1jRm9jdXNhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IHRvZ2dsZVZlcnRpY2FsTmF2YmFyQW5pbWF0aW9uIH0gZnJvbSAnLi92ZXJ0aWNhbC1uYXZiYXIuYW5pbWF0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXZlcnRpY2FsLW5hdmJhcicsXG4gICAgZXhwb3J0QXM6ICdNY1ZlcnRpY2FsTmF2YmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtdmVydGljYWwtbmF2YmFyX19jb250YWluZXJcIlxuICAgICAgICAgICAgIFtAdG9nZ2xlXT1cImV4cGFuZGVkXCJcbiAgICAgICAgICAgICAoQHRvZ2dsZS5kb25lKT1cImFuaW1hdGlvbkRvbmUubmV4dCgpXCJcbiAgICAgICAgICAgICBbY2xhc3MubWMtY29sbGFwc2VkXT1cIiFleHBhbmRlZFwiXG4gICAgICAgICAgICAgW2NsYXNzLm1jLWV4cGFuZGVkXT1cImV4cGFuZGVkXCI+XG5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItY29udGFpbmVyXSwgbWMtbmF2YmFyLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1uYXZiYXItdG9nZ2xlXSwgbWMtbmF2YmFyLXRvZ2dsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJy4vdmVydGljYWwtbmF2YmFyLnNjc3MnLFxuICAgICAgICAnLi9uYXZiYXItaXRlbS5zY3NzJyxcbiAgICAgICAgJy4vbmF2YmFyLWJyYW5kLnNjc3MnLFxuICAgICAgICAnLi9uYXZiYXItZGl2aWRlci5zY3NzJ1xuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXZlcnRpY2FsLW5hdmJhcicsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG5cbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFt0b2dnbGVWZXJ0aWNhbE5hdmJhckFuaW1hdGlvbigpXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jVmVydGljYWxOYXZiYXIgZXh0ZW5kcyBNY0ZvY3VzYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBNY05hdmJhclJlY3RhbmdsZUVsZW1lbnQpLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gICAgcmVjdGFuZ2xlRWxlbWVudHM6IFF1ZXJ5TGlzdDxNY05hdmJhclJlY3RhbmdsZUVsZW1lbnQ+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE1jTmF2YmFySXRlbSksIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgaXRlbXM6IFF1ZXJ5TGlzdDxNY05hdmJhckl0ZW0+O1xuXG4gICAgQENvbnRlbnRDaGlsZChmb3J3YXJkUmVmKCgpID0+IE1jTmF2YmFyQmVudG8pKSBiZW50bzogTWNOYXZiYXJCZW50bztcblxuICAgIHJlYWRvbmx5IGFuaW1hdGlvbkRvbmUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgICB9XG5cbiAgICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRXhwYW5kZWRTdGF0ZUZvckl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihjaGFuZ2VEZXRlY3RvclJlZik7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb25Eb25lXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudXBkYXRlVG9vbHRpcEZvckl0ZW1zKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbXNTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV4cGFuZGVkU3RhdGVGb3JJdGVtcygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBGb3JJdGVtcygpO1xuXG4gICAgICAgIHRoaXMucmVjdGFuZ2xlRWxlbWVudHMuY2hhbmdlc1xuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLnNldEl0ZW1zU3RhdGUpO1xuXG4gICAgICAgIHN1cGVyLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuXG4gICAgICAgIHRoaXMua2V5TWFuYWdlci53aXRoVmVydGljYWxPcmllbnRhdGlvbih0cnVlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGlmIChbU1BBQ0UsIEVOVEVSLCBMRUZUX0FSUk9XLCBSSUdIVF9BUlJPV10uaW5jbHVkZXMoa2V5Q29kZSkgfHwgaXNWZXJ0aWNhbE1vdmVtZW50KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBUQUIpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci50YWJPdXQubmV4dCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVFeHBhbmRlZFN0YXRlRm9ySXRlbXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucmVjdGFuZ2xlRWxlbWVudHM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY29sbGFwc2VkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGl0ZW0uYnV0dG9uPy51cGRhdGVDbGFzc01vZGlmaWVyRm9ySWNvbnMoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVG9vbHRpcEZvckl0ZW1zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0udXBkYXRlVG9vbHRpcCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEl0ZW1zU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnJlY3RhbmdsZUVsZW1lbnRzPy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnZlcnRpY2FsID0gdHJ1ZSkpO1xuICAgIH1cbn1cbiJdfQ==
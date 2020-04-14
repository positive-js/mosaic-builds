/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-item.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, Inject, Optional, Input, ViewChild } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { MC_DROPDOWN_PANEL } from './dropdown-panel';
// Boilerplate for applying mixins to McDropdownItem.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to McDropdownItem.
/**
 * \@docs-private
 */
McDropdownItemBase = /** @class */ (function () {
    function McDropdownItemBase() {
    }
    return McDropdownItemBase;
}());
// Boilerplate for applying mixins to McDropdownItem.
/**
 * \@docs-private
 */
export { McDropdownItemBase };
// tslint:disable-next-line:naming-convention
/** @type {?} */
export var McDropdownItemMixinBase = mixinTabIndex(mixinDisabled(McDropdownItemBase));
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
var McDropdownItem = /** @class */ (function (_super) {
    __extends(McDropdownItem, _super);
    function McDropdownItem(_elementRef, _focusMonitor, document, _parentDropdownPanel) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        _this.document = document;
        _this._parentDropdownPanel = _parentDropdownPanel;
        /**
         * ARIA role for the dropdown item.
         */
        _this.role = 'menuitem';
        /**
         * Stream that emits when the dropdown item is hovered.
         */
        _this.hovered = new Subject();
        /**
         * Whether the dropdown item is highlighted.
         */
        _this.highlighted = false;
        /**
         * Whether the dropdown item acts as a trigger for a nested dropdown.
         */
        _this.triggersNestedDropdown = false;
        if (_focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for dropdown items only when the focus was not caused by a
            // mouse or touch interaction.
            _focusMonitor.monitor(_this._elementRef.nativeElement, false);
        }
        if (_parentDropdownPanel && _parentDropdownPanel.addItem) {
            _parentDropdownPanel.addItem(_this);
        }
        return _this;
    }
    /** Focuses the dropdown item. */
    /**
     * Focuses the dropdown item.
     * @param {?=} origin
     * @return {?}
     */
    McDropdownItem.prototype.focus = /**
     * Focuses the dropdown item.
     * @param {?=} origin
     * @return {?}
     */
    function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this.getHostElement(), origin);
        }
        else {
            this.getHostElement().focus();
        }
    };
    /**
     * @return {?}
     */
    McDropdownItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
        if (this._parentDropdownPanel && this._parentDropdownPanel.removeItem) {
            this._parentDropdownPanel.removeItem(this);
        }
        this.hovered.complete();
    };
    /** Returns the host DOM element. */
    /**
     * Returns the host DOM element.
     * @return {?}
     */
    McDropdownItem.prototype.getHostElement = /**
     * Returns the host DOM element.
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    /** Prevents the default element actions if it is disabled. */
    /**
     * Prevents the default element actions if it is disabled.
     * @param {?} event
     * @return {?}
     */
    McDropdownItem.prototype.haltDisabledEvents = /**
     * Prevents the default element actions if it is disabled.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /** Emits to the hover stream. */
    /**
     * Emits to the hover stream.
     * @return {?}
     */
    McDropdownItem.prototype.handleMouseEnter = /**
     * Emits to the hover stream.
     * @return {?}
     */
    function () {
        this.hovered.next(this);
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    McDropdownItem.prototype.getLabel = /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.content.nativeElement;
        // tslint:disable-next-line:no-magic-numbers
        /** @type {?} */
        var textNodeType = this.document ? this.document.TEXT_NODE : 3;
        /** @type {?} */
        var output = '';
        if (element.childNodes) {
            /** @type {?} */
            var length_1 = element.childNodes.length;
            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (var i = 0; i < length_1; i++) {
                if (element.childNodes[i].nodeType === textNodeType) {
                    output += element.childNodes[i].textContent;
                }
            }
        }
        return output.trim();
    };
    McDropdownItem.decorators = [
        { type: Component, args: [{
                    selector: 'mc-dropdown-item, [mc-dropdown-item]',
                    exportAs: 'mcDropdownItem',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        class: 'mc-dropdown__item',
                        '[class.mc-dropdown__item_highlighted]': 'highlighted',
                        '[class.mc-disabled]': 'disabled',
                        '[attr.role]': 'role',
                        '[attr.tabindex]': 'tabIndex',
                        '(click)': 'haltDisabledEvents($event)',
                        '(mouseenter)': 'handleMouseEnter()'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n        <div #content>\n            <ng-content></ng-content>\n        </div>\n        <i *ngIf=\"triggersNestedDropdown\" mc-icon=\"mc-angle-right-M_16\" class=\"mc-dropdown__trigger\"></i>\n    "
                }] }
    ];
    /** @nocollapse */
    McDropdownItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusMonitor },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DROPDOWN_PANEL,] }] }
    ]; };
    McDropdownItem.propDecorators = {
        role: [{ type: Input }],
        content: [{ type: ViewChild, args: ['content', { static: false },] }]
    };
    return McDropdownItem;
}(McDropdownItemMixinBase));
export { McDropdownItem };
if (false) {
    /**
     * ARIA role for the dropdown item.
     * @type {?}
     */
    McDropdownItem.prototype.role;
    /** @type {?} */
    McDropdownItem.prototype.content;
    /**
     * Stream that emits when the dropdown item is hovered.
     * @type {?}
     */
    McDropdownItem.prototype.hovered;
    /**
     * Whether the dropdown item is highlighted.
     * @type {?}
     */
    McDropdownItem.prototype.highlighted;
    /**
     * Whether the dropdown item acts as a trigger for a nested dropdown.
     * @type {?}
     */
    McDropdownItem.prototype.triggersNestedDropdown;
    /**
     * @type {?}
     * @private
     */
    McDropdownItem.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    McDropdownItem.prototype._focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McDropdownItem.prototype.document;
    /**
     * @type {?}
     * @private
     */
    McDropdownItem.prototype._parentDropdownPanel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQStDLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFLdEU7Ozs7OztJQUFBO0lBQWlDLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFBbEMsSUFBa0M7Ozs7Ozs7O0FBRWxDLE1BQU0sS0FBTyx1QkFBdUIsR0FDK0IsYUFBYSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7OztBQU1uSDtJQXNCb0Msa0NBQXVCO0lBZ0J2RCx3QkFDWSxXQUFvQyxFQUNwQyxhQUEyQixFQUNULFFBQWEsRUFDUSxvQkFBc0Q7UUFKekcsWUFNSSxpQkFBTyxTQVlWO1FBakJXLGlCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNwQyxtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUNULGNBQVEsR0FBUixRQUFRLENBQUs7UUFDUSwwQkFBb0IsR0FBcEIsb0JBQW9CLENBQWtDOzs7O1FBakJoRyxVQUFJLEdBQXNELFVBQVUsQ0FBQzs7OztRQUtyRSxhQUFPLEdBQTRCLElBQUksT0FBTyxF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UCxRQUFRLEVBQUUsc0NBQXNDO29CQUNoRCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUNoQyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLG1CQUFtQjt3QkFDMUIsdUNBQXVDLEVBQUUsYUFBYTt3QkFDdEQscUJBQXFCLEVBQUUsVUFBVTt3QkFDakMsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLGlCQUFpQixFQUFFLFVBQVU7d0JBQzdCLFNBQVMsRUFBRSw0QkFBNEI7d0JBQ3ZDLGNBQWMsRUFBRSxvQkFBb0I7cUJBQ3ZDO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLHdNQUtUO2lCQUNKOzs7O2dCQS9DRyxVQUFVO2dCQUxMLFlBQVk7Z0RBd0VaLE1BQU0sU0FBQyxRQUFRO2dEQUNmLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCOzs7dUJBakJ4QyxLQUFLOzBCQUVMLFNBQVMsU0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztJQTRGM0MscUJBQUM7Q0FBQSxBQXZIRCxDQXNCb0MsdUJBQXVCLEdBaUcxRDtTQWpHWSxjQUFjOzs7Ozs7SUFHdkIsOEJBQThFOztJQUU5RSxpQ0FBaUQ7Ozs7O0lBR2pELGlDQUEwRTs7Ozs7SUFHMUUscUNBQTZCOzs7OztJQUc3QixnREFBd0M7Ozs7O0lBR3BDLHFDQUE0Qzs7Ozs7SUFDNUMsdUNBQW1DOzs7OztJQUNuQyxrQ0FBdUM7Ozs7O0lBQ3ZDLDhDQUFxRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBJbmplY3QsXG4gICAgT3B0aW9uYWwsXG4gICAgSW5wdXQsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBIYXNUYWJJbmRleEN0b3IsIG1peGluRGlzYWJsZWQsIG1peGluVGFiSW5kZXggfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1DX0RST1BET1dOX1BBTkVMLCBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLXBhbmVsJztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jRHJvcGRvd25JdGVtLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duSXRlbUJhc2Uge31cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jRHJvcGRvd25JdGVtTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jRHJvcGRvd25JdGVtQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY0Ryb3Bkb3duSXRlbUJhc2UpKTtcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGluc2lkZSBhbiBtYy1kcm9wZG93biB0YWcuXG4gKiBJdCBleGlzdHMgbW9zdGx5IHRvIHNldCB0aGUgcm9sZSBhdHRyaWJ1dGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZHJvcGRvd24taXRlbSwgW21jLWRyb3Bkb3duLWl0ZW1dJyxcbiAgICBleHBvcnRBczogJ21jRHJvcGRvd25JdGVtJyxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZHJvcGRvd25fX2l0ZW0nLFxuICAgICAgICAnW2NsYXNzLm1jLWRyb3Bkb3duX19pdGVtX2hpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJyhjbGljayknOiAnaGFsdERpc2FibGVkRXZlbnRzKCRldmVudCknLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hhbmRsZU1vdXNlRW50ZXIoKSdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpICpuZ0lmPVwidHJpZ2dlcnNOZXN0ZWREcm9wZG93blwiIG1jLWljb249XCJtYy1hbmdsZS1yaWdodC1NXzE2XCIgY2xhc3M9XCJtYy1kcm9wZG93bl9fdHJpZ2dlclwiPjwvaT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25JdGVtIGV4dGVuZHMgTWNEcm9wZG93bkl0ZW1NaXhpbkJhc2UgaW1wbGVtZW50cyBJRm9jdXNhYmxlT3B0aW9uLCBDYW5EaXNhYmxlLCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEFSSUEgcm9sZSBmb3IgdGhlIGRyb3Bkb3duIGl0ZW0uICovXG4gICAgQElucHV0KCkgcm9sZTogJ21lbnVpdGVtJyB8ICdtZW51aXRlbXJhZGlvJyB8ICdtZW51aXRlbWNoZWNrYm94JyA9ICdtZW51aXRlbSc7XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnQ7XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aGUgZHJvcGRvd24gaXRlbSBpcyBob3ZlcmVkLiAqL1xuICAgIHJlYWRvbmx5IGhvdmVyZWQ6IFN1YmplY3Q8TWNEcm9wZG93bkl0ZW0+ID0gbmV3IFN1YmplY3Q8TWNEcm9wZG93bkl0ZW0+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXRlbSBpcyBoaWdobGlnaHRlZC4gKi9cbiAgICBoaWdobGlnaHRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGl0ZW0gYWN0cyBhcyBhIHRyaWdnZXIgZm9yIGEgbmVzdGVkIGRyb3Bkb3duLiAqL1xuICAgIHRyaWdnZXJzTmVzdGVkRHJvcGRvd246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EUk9QRE9XTl9QQU5FTCkgcHJpdmF0ZSBfcGFyZW50RHJvcGRvd25QYW5lbD86IE1jRHJvcGRvd25QYW5lbDxNY0Ryb3Bkb3duSXRlbT5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoX2ZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgLy8gU3RhcnQgbW9uaXRvcmluZyB0aGUgZWxlbWVudCBzbyBpdCBnZXRzIHRoZSBhcHByb3ByaWF0ZSBmb2N1c2VkIGNsYXNzZXMuIFdlIHdhbnRcbiAgICAgICAgICAgIC8vIHRvIHNob3cgdGhlIGZvY3VzIHN0eWxlIGZvciBkcm9wZG93biBpdGVtcyBvbmx5IHdoZW4gdGhlIGZvY3VzIHdhcyBub3QgY2F1c2VkIGJ5IGFcbiAgICAgICAgICAgIC8vIG1vdXNlIG9yIHRvdWNoIGludGVyYWN0aW9uLlxuICAgICAgICAgICAgX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9wYXJlbnREcm9wZG93blBhbmVsICYmIF9wYXJlbnREcm9wZG93blBhbmVsLmFkZEl0ZW0pIHtcbiAgICAgICAgICAgIF9wYXJlbnREcm9wZG93blBhbmVsLmFkZEl0ZW0odGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgZHJvcGRvd24gaXRlbS4gKi9cbiAgICBmb2N1cyhvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9mb2N1c01vbml0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmdldEhvc3RFbGVtZW50KCksIG9yaWdpbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnREcm9wZG93blBhbmVsICYmIHRoaXMuX3BhcmVudERyb3Bkb3duUGFuZWwucmVtb3ZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50RHJvcGRvd25QYW5lbC5yZW1vdmVJdGVtKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ob3ZlcmVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIGhvc3QgRE9NIGVsZW1lbnQuICovXG4gICAgZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKiBQcmV2ZW50cyB0aGUgZGVmYXVsdCBlbGVtZW50IGFjdGlvbnMgaWYgaXQgaXMgZGlzYWJsZWQuICovXG4gICAgaGFsdERpc2FibGVkRXZlbnRzKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW1pdHMgdG8gdGhlIGhvdmVyIHN0cmVhbS4gKi9cbiAgICBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgICAgICB0aGlzLmhvdmVyZWQubmV4dCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogR2V0cyB0aGUgbGFiZWwgdG8gYmUgdXNlZCB3aGVuIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIG9wdGlvbiBzaG91bGQgYmUgZm9jdXNlZC4gKi9cbiAgICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZVR5cGUgPSB0aGlzLmRvY3VtZW50ID8gdGhpcy5kb2N1bWVudC5URVhUX05PREUgOiAzO1xuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gR28gdGhyb3VnaCBhbGwgdGhlIHRvcC1sZXZlbCB0ZXh0IG5vZGVzIGFuZCBleHRyYWN0IHRoZWlyIHRleHQuXG4gICAgICAgICAgICAvLyBXZSBza2lwIGFueXRoaW5nIHRoYXQncyBub3QgYSB0ZXh0IG5vZGUgdG8gcHJldmVudCB0aGUgdGV4dCBmcm9tXG4gICAgICAgICAgICAvLyBiZWluZyB0aHJvd24gb2ZmIGJ5IHNvbWV0aGluZyBsaWtlIGFuIGljb24uXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PT0gdGV4dE5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBlbGVtZW50LmNoaWxkTm9kZXNbaV0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dC50cmltKCk7XG4gICAgfVxufVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-item.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class McDropdownItemBase {
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
export const McDropdownItemMixinBase = mixinTabIndex(mixinDisabled(McDropdownItemBase));
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
export class McDropdownItem extends McDropdownItemMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _focusMonitor
     * @param {?} document
     * @param {?=} _parentDropdownPanel
     */
    constructor(_elementRef, _focusMonitor, document, _parentDropdownPanel) {
        super();
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.document = document;
        this._parentDropdownPanel = _parentDropdownPanel;
        /**
         * ARIA role for the dropdown item.
         */
        this.role = 'menuitem';
        /**
         * Stream that emits when the dropdown item is hovered.
         */
        this.hovered = new Subject();
        /**
         * Whether the dropdown item is highlighted.
         */
        this.highlighted = false;
        /**
         * Whether the dropdown item acts as a trigger for a nested dropdown.
         */
        this.triggersNestedDropdown = false;
        if (_focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for dropdown items only when the focus was not caused by a
            // mouse or touch interaction.
            _focusMonitor.monitor(this._elementRef.nativeElement, false);
        }
        if (_parentDropdownPanel && _parentDropdownPanel.addItem) {
            _parentDropdownPanel.addItem(this);
        }
    }
    /**
     * Focuses the dropdown item.
     * @param {?=} origin
     * @return {?}
     */
    focus(origin = 'program') {
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this.getHostElement(), origin);
        }
        else {
            this.getHostElement().focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
        if (this._parentDropdownPanel && this._parentDropdownPanel.removeItem) {
            this._parentDropdownPanel.removeItem(this);
        }
        this.hovered.complete();
    }
    /**
     * Returns the host DOM element.
     * @return {?}
     */
    getHostElement() {
        return this._elementRef.nativeElement;
    }
    /**
     * Prevents the default element actions if it is disabled.
     * @param {?} event
     * @return {?}
     */
    haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * Emits to the hover stream.
     * @return {?}
     */
    handleMouseEnter() {
        this.hovered.next(this);
    }
    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    getLabel() {
        /** @type {?} */
        const element = this.content.nativeElement;
        // tslint:disable-next-line:no-magic-numbers
        /** @type {?} */
        const textNodeType = this.document ? this.document.TEXT_NODE : 3;
        /** @type {?} */
        let output = '';
        if (element.childNodes) {
            /** @type {?} */
            const length = element.childNodes.length;
            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (let i = 0; i < length; i++) {
                if (element.childNodes[i].nodeType === textNodeType) {
                    output += element.childNodes[i].textContent;
                }
            }
        }
        return output.trim();
    }
}
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
                template: `
        <div #content>
            <ng-content></ng-content>
        </div>
        <i *ngIf="triggersNestedDropdown" mc-icon="mc-angle-right-M_16" class="mc-dropdown__trigger"></i>
    `
            }] }
];
/** @nocollapse */
McDropdownItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DROPDOWN_PANEL,] }] }
];
McDropdownItem.propDecorators = {
    role: [{ type: Input }],
    content: [{ type: ViewChild, args: ['content', { static: false },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiZHJvcGRvd24taXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUVWLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUErQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBS3RFLE1BQU0sT0FBTyxrQkFBa0I7Q0FBRzs7O0FBRWxDLE1BQU0sT0FBTyx1QkFBdUIsR0FDK0IsYUFBYSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7OztBQTRCbkgsTUFBTSxPQUFPLGNBQWUsU0FBUSx1QkFBdUI7Ozs7Ozs7SUFnQnZELFlBQ1ksV0FBb0MsRUFDcEMsYUFBMkIsRUFDVCxRQUFhLEVBQ1Esb0JBQXNEO1FBRXJHLEtBQUssRUFBRSxDQUFDO1FBTEEsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQ1QsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUNRLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBa0M7Ozs7UUFqQmhHLFNBQUksR0FBc0QsVUFBVSxDQUFDOzs7O1FBS3JFLFlBQU8sR0FBNEIsSUFBSSxPQUFPLEVBQWtCLENB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O29CQUN0RCxxQkFBcUIsRUFBRSxVQUFVO29CQUNqQyxhQUFhLEVBQUUsTUFBTTtvQkFDckIsaUJBQWlCLEVBQUUsVUFBVTtvQkFDN0IsU0FBUyxFQUFFLDRCQUE0QjtvQkFDdkMsY0FBYyxFQUFFLG9CQUFvQjtpQkFDdkM7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7O0tBS1Q7YUFDSjs7OztZQS9DRyxVQUFVO1lBTEwsWUFBWTs0Q0F3RVosTUFBTSxTQUFDLFFBQVE7NENBQ2YsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQkFBaUI7OzttQkFqQnhDLEtBQUs7c0JBRUwsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7Ozs7SUFGdkMsOEJBQThFOztJQUU5RSxpQ0FBaUQ7Ozs7O0lBR2pELGlDQUEwRTs7Ozs7SUFHMUUscUNBQTZCOzs7OztJQUc3QixnREFBd0M7Ozs7O0lBR3BDLHFDQUE0Qzs7Ozs7SUFDNUMsdUNBQW1DOzs7OztJQUNuQyxrQ0FBdUM7Ozs7O0lBQ3ZDLDhDQUFxRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciwgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uRGVzdHJveSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBJbmplY3QsXG4gICAgT3B0aW9uYWwsXG4gICAgSW5wdXQsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUZvY3VzYWJsZU9wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IENhbkRpc2FibGUsIENhbkRpc2FibGVDdG9yLCBIYXNUYWJJbmRleEN0b3IsIG1peGluRGlzYWJsZWQsIG1peGluVGFiSW5kZXggfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1DX0RST1BET1dOX1BBTkVMLCBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLXBhbmVsJztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jRHJvcGRvd25JdGVtLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duSXRlbUJhc2Uge31cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jRHJvcGRvd25JdGVtTWl4aW5CYXNlOlxuICAgIEhhc1RhYkluZGV4Q3RvciAmIENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jRHJvcGRvd25JdGVtQmFzZSA9IG1peGluVGFiSW5kZXgobWl4aW5EaXNhYmxlZChNY0Ryb3Bkb3duSXRlbUJhc2UpKTtcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGluc2lkZSBhbiBtYy1kcm9wZG93biB0YWcuXG4gKiBJdCBleGlzdHMgbW9zdGx5IHRvIHNldCB0aGUgcm9sZSBhdHRyaWJ1dGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZHJvcGRvd24taXRlbSwgW21jLWRyb3Bkb3duLWl0ZW1dJyxcbiAgICBleHBvcnRBczogJ21jRHJvcGRvd25JdGVtJyxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZHJvcGRvd25fX2l0ZW0nLFxuICAgICAgICAnW2NsYXNzLm1jLWRyb3Bkb3duX19pdGVtX2hpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAgICAgJyhjbGljayknOiAnaGFsdERpc2FibGVkRXZlbnRzKCRldmVudCknLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hhbmRsZU1vdXNlRW50ZXIoKSdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpICpuZ0lmPVwidHJpZ2dlcnNOZXN0ZWREcm9wZG93blwiIG1jLWljb249XCJtYy1hbmdsZS1yaWdodC1NXzE2XCIgY2xhc3M9XCJtYy1kcm9wZG93bl9fdHJpZ2dlclwiPjwvaT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25JdGVtIGV4dGVuZHMgTWNEcm9wZG93bkl0ZW1NaXhpbkJhc2UgaW1wbGVtZW50cyBJRm9jdXNhYmxlT3B0aW9uLCBDYW5EaXNhYmxlLCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEFSSUEgcm9sZSBmb3IgdGhlIGRyb3Bkb3duIGl0ZW0uICovXG4gICAgQElucHV0KCkgcm9sZTogJ21lbnVpdGVtJyB8ICdtZW51aXRlbXJhZGlvJyB8ICdtZW51aXRlbWNoZWNrYm94JyA9ICdtZW51aXRlbSc7XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnQ7XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aGUgZHJvcGRvd24gaXRlbSBpcyBob3ZlcmVkLiAqL1xuICAgIHJlYWRvbmx5IGhvdmVyZWQ6IFN1YmplY3Q8TWNEcm9wZG93bkl0ZW0+ID0gbmV3IFN1YmplY3Q8TWNEcm9wZG93bkl0ZW0+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXRlbSBpcyBoaWdobGlnaHRlZC4gKi9cbiAgICBoaWdobGlnaHRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGl0ZW0gYWN0cyBhcyBhIHRyaWdnZXIgZm9yIGEgbmVzdGVkIGRyb3Bkb3duLiAqL1xuICAgIHRyaWdnZXJzTmVzdGVkRHJvcGRvd246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EUk9QRE9XTl9QQU5FTCkgcHJpdmF0ZSBfcGFyZW50RHJvcGRvd25QYW5lbD86IE1jRHJvcGRvd25QYW5lbDxNY0Ryb3Bkb3duSXRlbT5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoX2ZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgLy8gU3RhcnQgbW9uaXRvcmluZyB0aGUgZWxlbWVudCBzbyBpdCBnZXRzIHRoZSBhcHByb3ByaWF0ZSBmb2N1c2VkIGNsYXNzZXMuIFdlIHdhbnRcbiAgICAgICAgICAgIC8vIHRvIHNob3cgdGhlIGZvY3VzIHN0eWxlIGZvciBkcm9wZG93biBpdGVtcyBvbmx5IHdoZW4gdGhlIGZvY3VzIHdhcyBub3QgY2F1c2VkIGJ5IGFcbiAgICAgICAgICAgIC8vIG1vdXNlIG9yIHRvdWNoIGludGVyYWN0aW9uLlxuICAgICAgICAgICAgX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9wYXJlbnREcm9wZG93blBhbmVsICYmIF9wYXJlbnREcm9wZG93blBhbmVsLmFkZEl0ZW0pIHtcbiAgICAgICAgICAgIF9wYXJlbnREcm9wZG93blBhbmVsLmFkZEl0ZW0odGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgZHJvcGRvd24gaXRlbS4gKi9cbiAgICBmb2N1cyhvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9mb2N1c01vbml0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmdldEhvc3RFbGVtZW50KCksIG9yaWdpbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnREcm9wZG93blBhbmVsICYmIHRoaXMuX3BhcmVudERyb3Bkb3duUGFuZWwucmVtb3ZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50RHJvcGRvd25QYW5lbC5yZW1vdmVJdGVtKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ob3ZlcmVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIGhvc3QgRE9NIGVsZW1lbnQuICovXG4gICAgZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKiBQcmV2ZW50cyB0aGUgZGVmYXVsdCBlbGVtZW50IGFjdGlvbnMgaWYgaXQgaXMgZGlzYWJsZWQuICovXG4gICAgaGFsdERpc2FibGVkRXZlbnRzKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW1pdHMgdG8gdGhlIGhvdmVyIHN0cmVhbS4gKi9cbiAgICBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgICAgICB0aGlzLmhvdmVyZWQubmV4dCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogR2V0cyB0aGUgbGFiZWwgdG8gYmUgdXNlZCB3aGVuIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIG9wdGlvbiBzaG91bGQgYmUgZm9jdXNlZC4gKi9cbiAgICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZVR5cGUgPSB0aGlzLmRvY3VtZW50ID8gdGhpcy5kb2N1bWVudC5URVhUX05PREUgOiAzO1xuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gR28gdGhyb3VnaCBhbGwgdGhlIHRvcC1sZXZlbCB0ZXh0IG5vZGVzIGFuZCBleHRyYWN0IHRoZWlyIHRleHQuXG4gICAgICAgICAgICAvLyBXZSBza2lwIGFueXRoaW5nIHRoYXQncyBub3QgYSB0ZXh0IG5vZGUgdG8gcHJldmVudCB0aGUgdGV4dCBmcm9tXG4gICAgICAgICAgICAvLyBiZWluZyB0aHJvd24gb2ZmIGJ5IHNvbWV0aGluZyBsaWtlIGFuIGljb24uXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PT0gdGV4dE5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBlbGVtZW50LmNoaWxkTm9kZXNbaV0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dC50cmltKCk7XG4gICAgfVxufVxuIl19
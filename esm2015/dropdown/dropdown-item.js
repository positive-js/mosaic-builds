/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-item.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, Inject, Optional, Input, ViewChild } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
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
export const McDropdownItemMixinBase = mixinDisabled(McDropdownItemBase);
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
     * Used to set the `tabindex`.
     * @return {?}
     */
    getTabIndex() {
        return this.disabled ? '-1' : '0';
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
    checkDisabled(event) {
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
                inputs: ['disabled'],
                host: {
                    class: 'mc-dropdown__item',
                    '[class.mc-dropdown__item_highlighted]': 'highlighted',
                    '[attr.role]': 'role',
                    '[attr.tabindex]': 'getTabIndex()',
                    '[class.mc-disabled]': 'disabled',
                    '(click)': 'checkDisabled($event)',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFFVixpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBQ0wsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBOEIsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBS3RFLE1BQU0sT0FBTyxrQkFBa0I7Q0FBRzs7O0FBRWxDLE1BQU0sT0FBTyx1QkFBdUIsR0FDaEMsYUFBYSxDQUFDLGtCQUFrQixDQUFDOzs7OztBQTRCckMsTUFBTSxPQUFPLGNBQWUsU0FBUSx1QkFBdUI7Ozs7Ozs7SUFnQnZELFlBQ1ksV0FBb0MsRUFDcEMsYUFBMkIsRUFDVCxRQUFhLEVBQ1Esb0JBQXNEO1FBRXJHLEtBQUssRUFBRSxDQUFDO1FBTEEsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQ1QsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUNRLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBa0M7Ozs7UUFqQmhHLFNBQUksR0FBc0QsVUFBVSxDQUFDOzs7O1FBS3JFLFlBQU8sR0FBNEIsSUFBSSxPQUFPLEVBQWtCLENBQUM7Ozs7UUFHMUUsZ0JBQVcsR0FBWSxLQUFLLENBQUM7Ozs7UUFH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QUNGLEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCLHVDQUF1QyxFQUFFLGFBQWE7b0JBQ3RELGFBQWEsRUFBRSxNQUFNO29CQUNyQixpQkFBaUIsRUFBRSxlQUFlO29CQUNsQyxxQkFBcUIsRUFBRSxVQUFVO29CQUNqQyxTQUFTLEVBQUUsdUJBQXVCO29CQUNsQyxjQUFjLEVBQUUsb0JBQW9CO2lCQUN2QztnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7S0FLVDthQUNKOzs7O1lBL0NHLFVBQVU7WUFMTCxZQUFZOzRDQXdFWixNQUFNLFNBQUMsUUFBUTs0Q0FDZixRQUFRLFlBQUksTUFBTSxTQUFDLGlCQUFpQjs7O21CQWpCeEMsS0FBSztzQkFFTCxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7Ozs7OztJQUZ2Qyw4QkFBOEU7O0lBRTlFLGlDQUFpRDs7Ozs7SUFHakQsaUNBQTBFOzs7OztJQUcxRSxxQ0FBNkI7Ozs7O0lBRzdCLGdEQUF3Qzs7Ozs7SUFHcEMscUNBQTRDOzs7OztJQUM1Qyx1Q0FBbUM7Ozs7O0lBQ25DLGtDQUF1Qzs7Ozs7SUFDdkMsOENBQXFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25EZXN0cm95LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEluamVjdCxcbiAgICBPcHRpb25hbCxcbiAgICBJbnB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSwgQ2FuRGlzYWJsZUN0b3IsIG1peGluRGlzYWJsZWQgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1DX0RST1BET1dOX1BBTkVMLCBNY0Ryb3Bkb3duUGFuZWwgfSBmcm9tICcuL2Ryb3Bkb3duLXBhbmVsJztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jRHJvcGRvd25JdGVtLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duSXRlbUJhc2Uge31cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jRHJvcGRvd25JdGVtTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY0Ryb3Bkb3duSXRlbUJhc2UgPVxuICAgIG1peGluRGlzYWJsZWQoTWNEcm9wZG93bkl0ZW1CYXNlKTtcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGluc2lkZSBhbiBtYy1kcm9wZG93biB0YWcuXG4gKiBJdCBleGlzdHMgbW9zdGx5IHRvIHNldCB0aGUgcm9sZSBhdHRyaWJ1dGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtZHJvcGRvd24taXRlbSwgW21jLWRyb3Bkb3duLWl0ZW1dJyxcbiAgICBleHBvcnRBczogJ21jRHJvcGRvd25JdGVtJyxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZHJvcGRvd25fX2l0ZW0nLFxuICAgICAgICAnW2NsYXNzLm1jLWRyb3Bkb3duX19pdGVtX2hpZ2hsaWdodGVkXSc6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdnZXRUYWJJbmRleCgpJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnKGNsaWNrKSc6ICdjaGVja0Rpc2FibGVkKCRldmVudCknLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hhbmRsZU1vdXNlRW50ZXIoKSdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpICpuZ0lmPVwidHJpZ2dlcnNOZXN0ZWREcm9wZG93blwiIG1jLWljb249XCJtYy1hbmdsZS1yaWdodC1NXzE2XCIgY2xhc3M9XCJtYy1kcm9wZG93bl9fdHJpZ2dlclwiPjwvaT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25JdGVtIGV4dGVuZHMgTWNEcm9wZG93bkl0ZW1NaXhpbkJhc2UgaW1wbGVtZW50cyBJRm9jdXNhYmxlT3B0aW9uLCBDYW5EaXNhYmxlLCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEFSSUEgcm9sZSBmb3IgdGhlIGRyb3Bkb3duIGl0ZW0uICovXG4gICAgQElucHV0KCkgcm9sZTogJ21lbnVpdGVtJyB8ICdtZW51aXRlbXJhZGlvJyB8ICdtZW51aXRlbWNoZWNrYm94JyA9ICdtZW51aXRlbSc7XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnQ7XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aGUgZHJvcGRvd24gaXRlbSBpcyBob3ZlcmVkLiAqL1xuICAgIHJlYWRvbmx5IGhvdmVyZWQ6IFN1YmplY3Q8TWNEcm9wZG93bkl0ZW0+ID0gbmV3IFN1YmplY3Q8TWNEcm9wZG93bkl0ZW0+KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXRlbSBpcyBoaWdobGlnaHRlZC4gKi9cbiAgICBoaWdobGlnaHRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGl0ZW0gYWN0cyBhcyBhIHRyaWdnZXIgZm9yIGEgbmVzdGVkIGRyb3Bkb3duLiAqL1xuICAgIHRyaWdnZXJzTmVzdGVkRHJvcGRvd246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EUk9QRE9XTl9QQU5FTCkgcHJpdmF0ZSBfcGFyZW50RHJvcGRvd25QYW5lbD86IE1jRHJvcGRvd25QYW5lbDxNY0Ryb3Bkb3duSXRlbT5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoX2ZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgLy8gU3RhcnQgbW9uaXRvcmluZyB0aGUgZWxlbWVudCBzbyBpdCBnZXRzIHRoZSBhcHByb3ByaWF0ZSBmb2N1c2VkIGNsYXNzZXMuIFdlIHdhbnRcbiAgICAgICAgICAgIC8vIHRvIHNob3cgdGhlIGZvY3VzIHN0eWxlIGZvciBkcm9wZG93biBpdGVtcyBvbmx5IHdoZW4gdGhlIGZvY3VzIHdhcyBub3QgY2F1c2VkIGJ5IGFcbiAgICAgICAgICAgIC8vIG1vdXNlIG9yIHRvdWNoIGludGVyYWN0aW9uLlxuICAgICAgICAgICAgX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9wYXJlbnREcm9wZG93blBhbmVsICYmIF9wYXJlbnREcm9wZG93blBhbmVsLmFkZEl0ZW0pIHtcbiAgICAgICAgICAgIF9wYXJlbnREcm9wZG93blBhbmVsLmFkZEl0ZW0odGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgZHJvcGRvd24gaXRlbS4gKi9cbiAgICBmb2N1cyhvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9mb2N1c01vbml0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmdldEhvc3RFbGVtZW50KCksIG9yaWdpbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldEhvc3RFbGVtZW50KCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnREcm9wZG93blBhbmVsICYmIHRoaXMuX3BhcmVudERyb3Bkb3duUGFuZWwucmVtb3ZlSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50RHJvcGRvd25QYW5lbC5yZW1vdmVJdGVtKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ob3ZlcmVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFVzZWQgdG8gc2V0IHRoZSBgdGFiaW5kZXhgLiAqL1xuICAgIGdldFRhYkluZGV4KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gJy0xJyA6ICcwJztcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgaG9zdCBET00gZWxlbWVudC4gKi9cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqIFByZXZlbnRzIHRoZSBkZWZhdWx0IGVsZW1lbnQgYWN0aW9ucyBpZiBpdCBpcyBkaXNhYmxlZC4gKi9cbiAgICBjaGVja0Rpc2FibGVkKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRW1pdHMgdG8gdGhlIGhvdmVyIHN0cmVhbS4gKi9cbiAgICBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgICAgICB0aGlzLmhvdmVyZWQubmV4dCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogR2V0cyB0aGUgbGFiZWwgdG8gYmUgdXNlZCB3aGVuIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIG9wdGlvbiBzaG91bGQgYmUgZm9jdXNlZC4gKi9cbiAgICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZVR5cGUgPSB0aGlzLmRvY3VtZW50ID8gdGhpcy5kb2N1bWVudC5URVhUX05PREUgOiAzO1xuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gR28gdGhyb3VnaCBhbGwgdGhlIHRvcC1sZXZlbCB0ZXh0IG5vZGVzIGFuZCBleHRyYWN0IHRoZWlyIHRleHQuXG4gICAgICAgICAgICAvLyBXZSBza2lwIGFueXRoaW5nIHRoYXQncyBub3QgYSB0ZXh0IG5vZGUgdG8gcHJldmVudCB0aGUgdGV4dCBmcm9tXG4gICAgICAgICAgICAvLyBiZWluZyB0aHJvd24gb2ZmIGJ5IHNvbWV0aGluZyBsaWtlIGFuIGljb24uXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PT0gdGV4dE5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBlbGVtZW50LmNoaWxkTm9kZXNbaV0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dC50cmltKCk7XG4gICAgfVxufVxuIl19
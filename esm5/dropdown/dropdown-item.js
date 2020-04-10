/**
 * @fileoverview added by tsickle
 * Generated from: dropdown-item.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
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
export var McDropdownItemMixinBase = mixinDisabled(McDropdownItemBase);
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
    /** Used to set the `tabindex`. */
    /**
     * Used to set the `tabindex`.
     * @return {?}
     */
    McDropdownItem.prototype.getTabIndex = /**
     * Used to set the `tabindex`.
     * @return {?}
     */
    function () {
        return this.disabled ? '-1' : '0';
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
    McDropdownItem.prototype.checkDisabled = /**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUNMLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLGtCQUFrQixDQUFDOzs7OztBQUt0RTs7Ozs7O0lBQUE7SUFBaUMsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQUFsQyxJQUFrQzs7Ozs7Ozs7QUFFbEMsTUFBTSxLQUFPLHVCQUF1QixHQUNoQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7Ozs7O0FBTXJDO0lBc0JvQyxrQ0FBdUI7SUFnQnZELHdCQUNZLFdBQW9DLEVBQ3BDLGFBQTJCLEVBQ1QsUUFBYSxFQUNRLG9CQUFzRDtRQUp6RyxZQU1JLGlCQUFPLFNBWVY7UUFqQlcsaUJBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3BDLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQ1QsY0FBUSxHQUFSLFFBQVEsQ0FBSztRQUNRLDBCQUFvQixHQUFwQixvQkFBb0IsQ0FBa0M7Ozs7UUFqQmhHLFVBQUksR0FBc0QsVUFBVSxDQUFDOzs7O1FBS3JFLGFBQU8sR0FBNEIsSUFBSSxPQUFPLEVBQWtCLENBQUM7Ozs7UUFHMUUsaUJBQVcs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QUFDO2lCQUMvQzthQUNKO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDOztnQkEzSEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxtQkFBbUI7d0JBQzFCLHVDQUF1QyxFQUFFLGFBQWE7d0JBQ3RELGFBQWEsRUFBRSxNQUFNO3dCQUNyQixpQkFBaUIsRUFBRSxlQUFlO3dCQUNsQyxxQkFBcUIsRUFBRSxVQUFVO3dCQUNqQyxTQUFTLEVBQUUsdUJBQXVCO3dCQUNsQyxjQUFjLEVBQUUsb0JBQW9CO3FCQUN2QztvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSx3TUFLVDtpQkFDSjs7OztnQkEvQ0csVUFBVTtnQkFMTCxZQUFZO2dEQXdFWixNQUFNLFNBQUMsUUFBUTtnREFDZixRQUFRLFlBQUksTUFBTSxTQUFDLGlCQUFpQjs7O3VCQWpCeEMsS0FBSzswQkFFTCxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUFpRzNDLHFCQUFDO0NBQUEsQUE1SEQsQ0FzQm9DLHVCQUF1QixHQXNHMUQ7U0F0R1ksY0FBYzs7Ozs7O0lBR3ZCLDhCQUE4RTs7SUFFOUUsaUNBQWlEOzs7OztJQUdqRCxpQ0FBMEU7Ozs7O0lBRzFFLHFDQUE2Qjs7Ozs7SUFHN0IsZ0RBQXdDOzs7OztJQUdwQyxxQ0FBNEM7Ozs7O0lBQzVDLHVDQUFtQzs7Ozs7SUFDbkMsa0NBQXVDOzs7OztJQUN2Qyw4Q0FBcUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgSW5qZWN0LFxuICAgIE9wdGlvbmFsLFxuICAgIElucHV0LFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgbWl4aW5EaXNhYmxlZCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTUNfRFJPUERPV05fUEFORUwsIE1jRHJvcGRvd25QYW5lbCB9IGZyb20gJy4vZHJvcGRvd24tcGFuZWwnO1xuXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWNEcm9wZG93bkl0ZW0uXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jRHJvcGRvd25JdGVtQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNEcm9wZG93bkl0ZW1NaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICYgdHlwZW9mIE1jRHJvcGRvd25JdGVtQmFzZSA9XG4gICAgbWl4aW5EaXNhYmxlZChNY0Ryb3Bkb3duSXRlbUJhc2UpO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW5zaWRlIGFuIG1jLWRyb3Bkb3duIHRhZy5cbiAqIEl0IGV4aXN0cyBtb3N0bHkgdG8gc2V0IHRoZSByb2xlIGF0dHJpYnV0ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1kcm9wZG93bi1pdGVtLCBbbWMtZHJvcGRvd24taXRlbV0nLFxuICAgIGV4cG9ydEFzOiAnbWNEcm9wZG93bkl0ZW0nLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1kcm9wZG93bl9faXRlbScsXG4gICAgICAgICdbY2xhc3MubWMtZHJvcGRvd25fX2l0ZW1faGlnaGxpZ2h0ZWRdJzogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2dldFRhYkluZGV4KCknLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICcoY2xpY2spJzogJ2NoZWNrRGlzYWJsZWQoJGV2ZW50KScsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnaGFuZGxlTW91c2VFbnRlcigpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250ZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGkgKm5nSWY9XCJ0cmlnZ2Vyc05lc3RlZERyb3Bkb3duXCIgbWMtaWNvbj1cIm1jLWFuZ2xlLXJpZ2h0LU1fMTZcIiBjbGFzcz1cIm1jLWRyb3Bkb3duX190cmlnZ2VyXCI+PC9pPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTWNEcm9wZG93bkl0ZW0gZXh0ZW5kcyBNY0Ryb3Bkb3duSXRlbU1peGluQmFzZSBpbXBsZW1lbnRzIElGb2N1c2FibGVPcHRpb24sIENhbkRpc2FibGUsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogQVJJQSByb2xlIGZvciB0aGUgZHJvcGRvd24gaXRlbS4gKi9cbiAgICBASW5wdXQoKSByb2xlOiAnbWVudWl0ZW0nIHwgJ21lbnVpdGVtcmFkaW8nIHwgJ21lbnVpdGVtY2hlY2tib3gnID0gJ21lbnVpdGVtJztcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGVudDtcblxuICAgIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSBkcm9wZG93biBpdGVtIGlzIGhvdmVyZWQuICovXG4gICAgcmVhZG9ubHkgaG92ZXJlZDogU3ViamVjdDxNY0Ryb3Bkb3duSXRlbT4gPSBuZXcgU3ViamVjdDxNY0Ryb3Bkb3duSXRlbT4oKTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBpdGVtIGlzIGhpZ2hsaWdodGVkLiAqL1xuICAgIGhpZ2hsaWdodGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXRlbSBhY3RzIGFzIGEgdHJpZ2dlciBmb3IgYSBuZXN0ZWQgZHJvcGRvd24uICovXG4gICAgdHJpZ2dlcnNOZXN0ZWREcm9wZG93bjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RST1BET1dOX1BBTkVMKSBwcml2YXRlIF9wYXJlbnREcm9wZG93blBhbmVsPzogTWNEcm9wZG93blBhbmVsPE1jRHJvcGRvd25JdGVtPlxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGlmIChfZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICAvLyBTdGFydCBtb25pdG9yaW5nIHRoZSBlbGVtZW50IHNvIGl0IGdldHMgdGhlIGFwcHJvcHJpYXRlIGZvY3VzZWQgY2xhc3Nlcy4gV2Ugd2FudFxuICAgICAgICAgICAgLy8gdG8gc2hvdyB0aGUgZm9jdXMgc3R5bGUgZm9yIGRyb3Bkb3duIGl0ZW1zIG9ubHkgd2hlbiB0aGUgZm9jdXMgd2FzIG5vdCBjYXVzZWQgYnkgYVxuICAgICAgICAgICAgLy8gbW91c2Ugb3IgdG91Y2ggaW50ZXJhY3Rpb24uXG4gICAgICAgICAgICBfZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3BhcmVudERyb3Bkb3duUGFuZWwgJiYgX3BhcmVudERyb3Bkb3duUGFuZWwuYWRkSXRlbSkge1xuICAgICAgICAgICAgX3BhcmVudERyb3Bkb3duUGFuZWwuYWRkSXRlbSh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBGb2N1c2VzIHRoZSBkcm9wZG93biBpdGVtLiAqL1xuICAgIGZvY3VzKG9yaWdpbjogRm9jdXNPcmlnaW4gPSAncHJvZ3JhbScpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuZ2V0SG9zdEVsZW1lbnQoKSwgb3JpZ2luKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLl9mb2N1c01vbml0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudERyb3Bkb3duUGFuZWwgJiYgdGhpcy5fcGFyZW50RHJvcGRvd25QYW5lbC5yZW1vdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnREcm9wZG93blBhbmVsLnJlbW92ZUl0ZW0odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhvdmVyZWQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogVXNlZCB0byBzZXQgdGhlIGB0YWJpbmRleGAuICovXG4gICAgZ2V0VGFiSW5kZXgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAnLTEnIDogJzAnO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSBob3N0IERPTSBlbGVtZW50LiAqL1xuICAgIGdldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKiogUHJldmVudHMgdGhlIGRlZmF1bHQgZWxlbWVudCBhY3Rpb25zIGlmIGl0IGlzIGRpc2FibGVkLiAqL1xuICAgIGNoZWNrRGlzYWJsZWQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBFbWl0cyB0byB0aGUgaG92ZXIgc3RyZWFtLiAqL1xuICAgIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgICAgIHRoaXMuaG92ZXJlZC5uZXh0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKiBHZXRzIHRoZSBsYWJlbCB0byBiZSB1c2VkIHdoZW4gZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgb3B0aW9uIHNob3VsZCBiZSBmb2N1c2VkLiAqL1xuICAgIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIGNvbnN0IHRleHROb2RlVHlwZSA9IHRoaXMuZG9jdW1lbnQgPyB0aGlzLmRvY3VtZW50LlRFWFRfTk9ERSA6IDM7XG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcblxuICAgICAgICBpZiAoZWxlbWVudC5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBHbyB0aHJvdWdoIGFsbCB0aGUgdG9wLWxldmVsIHRleHQgbm9kZXMgYW5kIGV4dHJhY3QgdGhlaXIgdGV4dC5cbiAgICAgICAgICAgIC8vIFdlIHNraXAgYW55dGhpbmcgdGhhdCdzIG5vdCBhIHRleHQgbm9kZSB0byBwcmV2ZW50IHRoZSB0ZXh0IGZyb21cbiAgICAgICAgICAgIC8vIGJlaW5nIHRocm93biBvZmYgYnkgc29tZXRoaW5nIGxpa2UgYW4gaWNvbi5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09PSB0ZXh0Tm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGVsZW1lbnQuY2hpbGROb2Rlc1tpXS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0cHV0LnRyaW0oKTtcbiAgICB9XG59XG4iXX0=
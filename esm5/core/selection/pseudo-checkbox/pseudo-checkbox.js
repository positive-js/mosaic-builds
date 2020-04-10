/**
 * @fileoverview added by tsickle
 * Generated from: selection/pseudo-checkbox/pseudo-checkbox.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `mc-primary .mc-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<mc-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * \@docs-private
 */
var McPseudoCheckbox = /** @class */ (function () {
    function McPseudoCheckbox() {
        this.state = 'unchecked';
        this.disabled = false;
    }
    McPseudoCheckbox.decorators = [
        { type: Component, args: [{
                    selector: 'mc-pseudo-checkbox',
                    template: "<i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n<i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n",
                    host: {
                        class: 'mc-pseudo-checkbox',
                        '[class.mc-indeterminate]': 'state === "indeterminate"',
                        '[class.mc-checked]': 'state === "checked"',
                        '[class.mc-disabled]': 'disabled'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mc-pseudo-checkbox{position:relative;display:inline-block;box-sizing:border-box;width:16px;height:16px;border-radius:3px;border-width:1px;border-style:solid;cursor:pointer;vertical-align:middle;flex-shrink:0}.mc-pseudo-checkbox .mc-checkbox-checkmark,.mc-pseudo-checkbox .mc-checkbox-mixedmark{display:none;position:absolute;top:-1px;left:-1px}.mc-pseudo-checkbox.mc-pseudo-checkbox-checked,.mc-pseudo-checkbox.mc-pseudo-checkbox-indeterminate{border-color:transparent}.mc-pseudo-checkbox.mc-checked .mc-checkbox-checkmark,.mc-pseudo-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:inline-block}.mc-pseudo-checkbox.mc-disabled{cursor:default}"]
                }] }
    ];
    McPseudoCheckbox.propDecorators = {
        state: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return McPseudoCheckbox;
}());
export { McPseudoCheckbox };
if (false) {
    /** @type {?} */
    McPseudoCheckbox.prototype.state;
    /** @type {?} */
    McPseudoCheckbox.prototype.disabled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJzZWxlY3Rpb24vcHNldWRvLWNoZWNrYm94L3BzZXVkby1jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQWtCN0Y7SUFBQTtRQWVhLFVBQUssR0FBMEIsV0FBVyxDQUFDO1FBRTNDLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFDdkMsQ0FBQzs7Z0JBbEJBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5Qiw0SEFBMkM7b0JBRTNDLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsb0JBQW9CO3dCQUMzQiwwQkFBMEIsRUFBRSwyQkFBMkI7d0JBQ3ZELG9CQUFvQixFQUFFLHFCQUFxQjt3QkFDM0MscUJBQXFCLEVBQUUsVUFBVTtxQkFDcEM7b0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDeEM7Ozt3QkFFSSxLQUFLOzJCQUVMLEtBQUs7O0lBQ1YsdUJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQUpZLGdCQUFnQjs7O0lBQ3pCLGlDQUFvRDs7SUFFcEQsb0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgTWNQc2V1ZG9DaGVja2JveFN0YXRlID0gJ3VuY2hlY2tlZCcgfCAnY2hlY2tlZCcgfCAnaW5kZXRlcm1pbmF0ZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgc2hvd3MgYSBzaW1wbGlmaWVkIGNoZWNrYm94IHdpdGhvdXQgaW5jbHVkaW5nIGFueSBraW5kIG9mIFwicmVhbFwiIGNoZWNrYm94LlxuICogTWVhbnQgdG8gYmUgdXNlZCB3aGVuIHRoZSBjaGVja2JveCBpcyBwdXJlbHkgZGVjb3JhdGl2ZSBhbmQgYSBsYXJnZSBudW1iZXIgb2YgdGhlbSB3aWxsIGJlXG4gKiBpbmNsdWRlZCwgc3VjaCBhcyBmb3IgdGhlIG9wdGlvbnMgaW4gYSBtdWx0aS1zZWxlY3QuIFVzZXMgbm8gU1ZHcyBvciBjb21wbGV4IGFuaW1hdGlvbnMuXG4gKiBOb3RlIHRoYXQgdGhlbWluZyBpcyBtZWFudCB0byBiZSBoYW5kbGVkIGJ5IHRoZSBwYXJlbnQgZWxlbWVudCwgZS5nLlxuICogYG1jLXByaW1hcnkgLm1jLXBzZXVkby1jaGVja2JveGAuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgY29tcG9uZW50IHdpbGwgYmUgY29tcGxldGVseSBpbnZpc2libGUgdG8gc2NyZWVuLXJlYWRlciB1c2Vycy4gVGhpcyBpcyAqbm90KlxuICogaW50ZXJjaGFuZ2VhYmxlIHdpdGggYDxtYy1jaGVja2JveD5gIGFuZCBzaG91bGQgKm5vdCogYmUgdXNlZCBpZiB0aGUgdXNlciB3b3VsZCBkaXJlY3RseVxuICogaW50ZXJhY3Qgd2l0aCB0aGUgY2hlY2tib3guIFRoZSBwc2V1ZG8tY2hlY2tib3ggc2hvdWxkIG9ubHkgYmUgdXNlZCBhcyBhbiBpbXBsZW1lbnRhdGlvbiBkZXRhaWxcbiAqIG9mIG1vcmUgY29tcGxleCBjb21wb25lbnRzIHRoYXQgYXBwcm9wcmlhdGVseSBoYW5kbGUgc2VsZWN0ZWQgLyBjaGVja2VkIHN0YXRlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXBzZXVkby1jaGVja2JveCcsXG4gICAgdGVtcGxhdGVVcmw6ICdwc2V1ZG8tY2hlY2tib3gucGFydGlhbC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsncHNldWRvLWNoZWNrYm94LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtcHNldWRvLWNoZWNrYm94JyxcbiAgICAgICAgJ1tjbGFzcy5tYy1pbmRldGVybWluYXRlXSc6ICdzdGF0ZSA9PT0gXCJpbmRldGVybWluYXRlXCInLFxuICAgICAgICAnW2NsYXNzLm1jLWNoZWNrZWRdJzogJ3N0YXRlID09PSBcImNoZWNrZWRcIicsXG4gICAgICAgICdbY2xhc3MubWMtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ1xuICAgIH0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNY1BzZXVkb0NoZWNrYm94IHtcbiAgICBASW5wdXQoKSBzdGF0ZTogTWNQc2V1ZG9DaGVja2JveFN0YXRlID0gJ3VuY2hlY2tlZCc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xufVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: selection/pseudo-checkbox/pseudo-checkbox.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class McPseudoCheckbox {
    constructor() {
        this.state = 'unchecked';
        this.disabled = false;
    }
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
                styles: [".mc-pseudo-checkbox{border-radius:3px;border-style:solid;border-width:var(--mc-checkbox-size-border-width,1px);box-sizing:border-box;cursor:pointer;display:inline-block;flex-shrink:0;height:var(--mc-checkbox-size-width,16px);position:relative;vertical-align:middle;width:var(--mc-checkbox-size-width,16px)}.mc-pseudo-checkbox .mc-checkbox-checkmark,.mc-pseudo-checkbox .mc-checkbox-mixedmark{display:none;left:calc(var(--mc-checkbox-size-border-width, 1px)*-1);position:absolute;top:calc(var(--mc-checkbox-size-border-width, 1px)*-1)}.mc-pseudo-checkbox.mc-pseudo-checkbox-checked,.mc-pseudo-checkbox.mc-pseudo-checkbox-indeterminate{border-color:transparent}.mc-pseudo-checkbox.mc-checked .mc-checkbox-checkmark,.mc-pseudo-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:inline-block}.mc-pseudo-checkbox.mc-disabled{cursor:default}"]
            }] }
];
McPseudoCheckbox.propDecorators = {
    state: [{ type: Input }],
    disabled: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McPseudoCheckbox.prototype.state;
    /** @type {?} */
    McPseudoCheckbox.prototype.disabled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbInNlbGVjdGlvbi9wc2V1ZG8tY2hlY2tib3gvcHNldWRvLWNoZWNrYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBZ0M3RixNQUFNLE9BQU8sZ0JBQWdCO0lBZDdCO1FBZWEsVUFBSyxHQUEwQixXQUFXLENBQUM7UUFFM0MsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUN2QyxDQUFDOzs7WUFsQkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDRIQUEyQztnQkFFM0MsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxvQkFBb0I7b0JBQzNCLDBCQUEwQixFQUFFLDJCQUEyQjtvQkFDdkQsb0JBQW9CLEVBQUUscUJBQXFCO29CQUMzQyxxQkFBcUIsRUFBRSxVQUFVO2lCQUNwQztnQkFDRCxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7b0JBRUksS0FBSzt1QkFFTCxLQUFLOzs7O0lBRk4saUNBQW9EOztJQUVwRCxvQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBNY1BzZXVkb0NoZWNrYm94U3RhdGUgPSAndW5jaGVja2VkJyB8ICdjaGVja2VkJyB8ICdpbmRldGVybWluYXRlJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBzaG93cyBhIHNpbXBsaWZpZWQgY2hlY2tib3ggd2l0aG91dCBpbmNsdWRpbmcgYW55IGtpbmQgb2YgXCJyZWFsXCIgY2hlY2tib3guXG4gKiBNZWFudCB0byBiZSB1c2VkIHdoZW4gdGhlIGNoZWNrYm94IGlzIHB1cmVseSBkZWNvcmF0aXZlIGFuZCBhIGxhcmdlIG51bWJlciBvZiB0aGVtIHdpbGwgYmVcbiAqIGluY2x1ZGVkLCBzdWNoIGFzIGZvciB0aGUgb3B0aW9ucyBpbiBhIG11bHRpLXNlbGVjdC4gVXNlcyBubyBTVkdzIG9yIGNvbXBsZXggYW5pbWF0aW9ucy5cbiAqIE5vdGUgdGhhdCB0aGVtaW5nIGlzIG1lYW50IHRvIGJlIGhhbmRsZWQgYnkgdGhlIHBhcmVudCBlbGVtZW50LCBlLmcuXG4gKiBgbWMtcHJpbWFyeSAubWMtcHNldWRvLWNoZWNrYm94YC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBjb21wb25lbnQgd2lsbCBiZSBjb21wbGV0ZWx5IGludmlzaWJsZSB0byBzY3JlZW4tcmVhZGVyIHVzZXJzLiBUaGlzIGlzICpub3QqXG4gKiBpbnRlcmNoYW5nZWFibGUgd2l0aCBgPG1jLWNoZWNrYm94PmAgYW5kIHNob3VsZCAqbm90KiBiZSB1c2VkIGlmIHRoZSB1c2VyIHdvdWxkIGRpcmVjdGx5XG4gKiBpbnRlcmFjdCB3aXRoIHRoZSBjaGVja2JveC4gVGhlIHBzZXVkby1jaGVja2JveCBzaG91bGQgb25seSBiZSB1c2VkIGFzIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbFxuICogb2YgbW9yZSBjb21wbGV4IGNvbXBvbmVudHMgdGhhdCBhcHByb3ByaWF0ZWx5IGhhbmRsZSBzZWxlY3RlZCAvIGNoZWNrZWQgc3RhdGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtcHNldWRvLWNoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3BzZXVkby1jaGVja2JveC5wYXJ0aWFsLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydwc2V1ZG8tY2hlY2tib3guc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1wc2V1ZG8tY2hlY2tib3gnLFxuICAgICAgICAnW2NsYXNzLm1jLWluZGV0ZXJtaW5hdGVdJzogJ3N0YXRlID09PSBcImluZGV0ZXJtaW5hdGVcIicsXG4gICAgICAgICdbY2xhc3MubWMtY2hlY2tlZF0nOiAnc3RhdGUgPT09IFwiY2hlY2tlZFwiJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gICAgfSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1jUHNldWRvQ2hlY2tib3gge1xuICAgIEBJbnB1dCgpIHN0YXRlOiBNY1BzZXVkb0NoZWNrYm94U3RhdGUgPSAndW5jaGVja2VkJztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG59XG4iXX0=
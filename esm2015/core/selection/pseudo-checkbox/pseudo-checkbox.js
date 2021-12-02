import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
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
 * @docs-private
 */
export class McPseudoCheckbox {
    constructor() {
        this.state = 'unchecked';
        this.disabled = false;
    }
}
/** @nocollapse */ McPseudoCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McPseudoCheckbox, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McPseudoCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: { state: "state", disabled: "disabled" }, host: { properties: { "class.mc-indeterminate": "state === \"indeterminate\"", "class.mc-checked": "state === \"checked\"", "class.mc-disabled": "disabled" }, classAttribute: "mc-pseudo-checkbox" }, ngImport: i0, template: "<i class=\"mc-checkbox-checkmark mc mc-check_16\"></i>\n<i class=\"mc-checkbox-mixedmark mc mc-minus_16\"></i>\n", styles: [".mc-pseudo-checkbox{position:relative;display:inline-block;box-sizing:border-box;width:16px;width:var(--mc-checkbox-size-width, 16px);height:16px;height:var(--mc-checkbox-size-width, 16px);border-radius:3px;border-width:1px;border-width:var(--mc-checkbox-size-border-width, 1px);border-style:solid;cursor:pointer;vertical-align:middle;flex-shrink:0}.mc-pseudo-checkbox .mc-checkbox-checkmark,.mc-pseudo-checkbox .mc-checkbox-mixedmark{display:none;position:absolute;top:calc(-1 * 1px);top:calc(-1 * var(--mc-checkbox-size-border-width, 1px));left:calc(-1 * 1px);left:calc(-1 * var(--mc-checkbox-size-border-width, 1px))}.mc-pseudo-checkbox.mc-pseudo-checkbox-checked,.mc-pseudo-checkbox.mc-pseudo-checkbox-indeterminate{border-color:transparent}.mc-pseudo-checkbox.mc-checked .mc-checkbox-checkmark{display:inline-block}.mc-pseudo-checkbox.mc-indeterminate .mc-checkbox-mixedmark{display:inline-block}.mc-pseudo-checkbox.mc-disabled{cursor:default}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McPseudoCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-pseudo-checkbox',
                    templateUrl: 'pseudo-checkbox.partial.html',
                    styleUrls: ['pseudo-checkbox.scss'],
                    host: {
                        class: 'mc-pseudo-checkbox',
                        '[class.mc-indeterminate]': 'state === "indeterminate"',
                        '[class.mc-checked]': 'state === "checked"',
                        '[class.mc-disabled]': 'disabled'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { state: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvc2VsZWN0aW9uL3BzZXVkby1jaGVja2JveC9wc2V1ZG8tY2hlY2tib3gudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9zZWxlY3Rpb24vcHNldWRvLWNoZWNrYm94L3BzZXVkby1jaGVja2JveC5wYXJ0aWFsLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzdGOzs7Ozs7Ozs7Ozs7R0FZRztBQWVILE1BQU0sT0FBTyxnQkFBZ0I7SUFkN0I7UUFlYSxVQUFLLEdBQTBCLFdBQVcsQ0FBQztRQUUzQyxhQUFRLEdBQVksS0FBSyxDQUFDO0tBQ3RDOztpSUFKWSxnQkFBZ0I7cUhBQWhCLGdCQUFnQixtVENoQzdCLGtIQUVBOzRGRDhCYSxnQkFBZ0I7a0JBZDVCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsV0FBVyxFQUFFLDhCQUE4QjtvQkFDM0MsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ25DLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsb0JBQW9CO3dCQUMzQiwwQkFBMEIsRUFBRSwyQkFBMkI7d0JBQ3ZELG9CQUFvQixFQUFFLHFCQUFxQjt3QkFDM0MscUJBQXFCLEVBQUUsVUFBVTtxQkFDcEM7b0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs4QkFFWSxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmV4cG9ydCB0eXBlIE1jUHNldWRvQ2hlY2tib3hTdGF0ZSA9ICd1bmNoZWNrZWQnIHwgJ2NoZWNrZWQnIHwgJ2luZGV0ZXJtaW5hdGUnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IHNob3dzIGEgc2ltcGxpZmllZCBjaGVja2JveCB3aXRob3V0IGluY2x1ZGluZyBhbnkga2luZCBvZiBcInJlYWxcIiBjaGVja2JveC5cbiAqIE1lYW50IHRvIGJlIHVzZWQgd2hlbiB0aGUgY2hlY2tib3ggaXMgcHVyZWx5IGRlY29yYXRpdmUgYW5kIGEgbGFyZ2UgbnVtYmVyIG9mIHRoZW0gd2lsbCBiZVxuICogaW5jbHVkZWQsIHN1Y2ggYXMgZm9yIHRoZSBvcHRpb25zIGluIGEgbXVsdGktc2VsZWN0LiBVc2VzIG5vIFNWR3Mgb3IgY29tcGxleCBhbmltYXRpb25zLlxuICogTm90ZSB0aGF0IHRoZW1pbmcgaXMgbWVhbnQgdG8gYmUgaGFuZGxlZCBieSB0aGUgcGFyZW50IGVsZW1lbnQsIGUuZy5cbiAqIGBtYy1wcmltYXJ5IC5tYy1wc2V1ZG8tY2hlY2tib3hgLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIGNvbXBvbmVudCB3aWxsIGJlIGNvbXBsZXRlbHkgaW52aXNpYmxlIHRvIHNjcmVlbi1yZWFkZXIgdXNlcnMuIFRoaXMgaXMgKm5vdCpcbiAqIGludGVyY2hhbmdlYWJsZSB3aXRoIGA8bWMtY2hlY2tib3g+YCBhbmQgc2hvdWxkICpub3QqIGJlIHVzZWQgaWYgdGhlIHVzZXIgd291bGQgZGlyZWN0bHlcbiAqIGludGVyYWN0IHdpdGggdGhlIGNoZWNrYm94LiBUaGUgcHNldWRvLWNoZWNrYm94IHNob3VsZCBvbmx5IGJlIHVzZWQgYXMgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsXG4gKiBvZiBtb3JlIGNvbXBsZXggY29tcG9uZW50cyB0aGF0IGFwcHJvcHJpYXRlbHkgaGFuZGxlIHNlbGVjdGVkIC8gY2hlY2tlZCBzdGF0ZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1wc2V1ZG8tY2hlY2tib3gnLFxuICAgIHRlbXBsYXRlVXJsOiAncHNldWRvLWNoZWNrYm94LnBhcnRpYWwuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3BzZXVkby1jaGVja2JveC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXBzZXVkby1jaGVja2JveCcsXG4gICAgICAgICdbY2xhc3MubWMtaW5kZXRlcm1pbmF0ZV0nOiAnc3RhdGUgPT09IFwiaW5kZXRlcm1pbmF0ZVwiJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1jaGVja2VkXSc6ICdzdGF0ZSA9PT0gXCJjaGVja2VkXCInLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCdcbiAgICB9LFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWNQc2V1ZG9DaGVja2JveCB7XG4gICAgQElucHV0KCkgc3RhdGU6IE1jUHNldWRvQ2hlY2tib3hTdGF0ZSA9ICd1bmNoZWNrZWQnO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbn1cbiIsIjxpIGNsYXNzPVwibWMtY2hlY2tib3gtY2hlY2ttYXJrIG1jIG1jLWNoZWNrXzE2XCI+PC9pPlxuPGkgY2xhc3M9XCJtYy1jaGVja2JveC1taXhlZG1hcmsgbWMgbWMtbWludXNfMTZcIj48L2k+XG4iXX0=
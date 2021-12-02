import { Directive, Input, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/** Context provided to the tree node component. */
export class McTreeNodeOutletContext {
    constructor(data) {
        this.$implicit = data;
    }
}
/**
 * Data node definition for the McTree.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
export class McTreeNodeDef {
    /** @docs-private */
    constructor(template) {
        this.template = template;
    }
}
/** @nocollapse */ McTreeNodeDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodeDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTreeNodeDef, selector: "[mcTreeNodeDef]", inputs: { when: ["mcTreeNodeDefWhen", "when"], data: ["mcTreeNode", "data"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodeDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen']
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { data: [{
                type: Input,
                args: ['mcTreeNode']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90cmVlL25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUc5RCxtREFBbUQ7QUFDbkQsTUFBTSxPQUFPLHVCQUF1QjtJQWFoQyxZQUFZLElBQU87UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUFFRDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sYUFBYTtJQVl0QixvQkFBb0I7SUFDcEIsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDOzs4SEFieEMsYUFBYTtrSEFBYixhQUFhOzRGQUFiLGFBQWE7a0JBSnpCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsTUFBTSxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3RDO2tHQUV3QixJQUFJO3NCQUF4QixLQUFLO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKiBDb250ZXh0IHByb3ZpZGVkIHRvIHRoZSB0cmVlIG5vZGUgY29tcG9uZW50LiAqL1xuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGVPdXRsZXRDb250ZXh0PFQ+IHtcbiAgICAvKiogRGF0YSBmb3IgdGhlIG5vZGUuICovXG4gICAgJGltcGxpY2l0OiBUO1xuXG4gICAgLyoqIERlcHRoIG9mIHRoZSBub2RlLiAqL1xuICAgIGxldmVsOiBudW1iZXI7XG5cbiAgICAvKiogSW5kZXggbG9jYXRpb24gb2YgdGhlIG5vZGUuICovXG4gICAgaW5kZXg/OiBudW1iZXI7XG5cbiAgICAvKiogTGVuZ3RoIG9mIHRoZSBudW1iZXIgb2YgdG90YWwgZGF0YU5vZGVzLiAqL1xuICAgIGNvdW50PzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogVCkge1xuICAgICAgICB0aGlzLiRpbXBsaWNpdCA9IGRhdGE7XG4gICAgfVxufVxuXG4vKipcbiAqIERhdGEgbm9kZSBkZWZpbml0aW9uIGZvciB0aGUgTWNUcmVlLlxuICogQ2FwdHVyZXMgdGhlIG5vZGUncyB0ZW1wbGF0ZSBhbmQgYSB3aGVuIHByZWRpY2F0ZSB0aGF0IGRlc2NyaWJlcyB3aGVuIHRoaXMgbm9kZSBzaG91bGQgYmUgdXNlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUcmVlTm9kZURlZl0nLFxuICAgIGlucHV0czogWyd3aGVuOiBtY1RyZWVOb2RlRGVmV2hlbiddXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGVEZWY8VD4ge1xuICAgIEBJbnB1dCgnbWNUcmVlTm9kZScpIGRhdGE6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHNob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGlzIG5vZGUgdGVtcGxhdGUgc2hvdWxkIGJlIHVzZWQgZm9yIHRoZSBwcm92aWRlZCBub2RlXG4gICAgICogZGF0YSBhbmQgaW5kZXguIElmIGxlZnQgdW5kZWZpbmVkLCB0aGlzIG5vZGUgd2lsbCBiZSBjb25zaWRlcmVkIHRoZSBkZWZhdWx0IG5vZGUgdGVtcGxhdGUgdG9cbiAgICAgKiB1c2Ugd2hlbiBubyBvdGhlciB3aGVuIGZ1bmN0aW9ucyByZXR1cm4gdHJ1ZSBmb3IgdGhlIGRhdGEuXG4gICAgICogRm9yIGV2ZXJ5IG5vZGUsIHRoZXJlIG11c3QgYmUgYXQgbGVhc3Qgb25lIHdoZW4gZnVuY3Rpb24gdGhhdCBwYXNzZXMgb3IgYW4gdW5kZWZpbmVkIHRvXG4gICAgICogZGVmYXVsdC5cbiAgICAgKi9cbiAgICB3aGVuOiAoaW5kZXg6IG51bWJlciwgbm9kZURhdGE6IFQpID0+IGJvb2xlYW47XG5cbiAgICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiJdfQ==
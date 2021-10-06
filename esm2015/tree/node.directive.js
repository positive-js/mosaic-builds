import { Directive, Input } from '@angular/core';
import { CdkTreeNodeDef } from '@ptsecurity/cdk/tree';
import * as i0 from "@angular/core";
export class McTreeNodeDef extends CdkTreeNodeDef {
}
/** @nocollapse */ McTreeNodeDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodeDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodeDef, selector: "[mcTreeNodeDef]", inputs: { when: ["mcTreeNodeDefWhen", "when"], data: ["mcTreeNode", "data"] }, providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodeDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodeDef]',
                    inputs: ['when: mcTreeNodeDefWhen'],
                    providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
                }]
        }], propDecorators: { data: [{
                type: Input,
                args: ['mcTreeNode']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS9ub2RlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBUXRELE1BQU0sT0FBTyxhQUFpQixTQUFRLGNBQWlCOzs2SEFBMUMsYUFBYTtpSEFBYixhQUFhLHlIQUZYLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsQ0FBQzsyRkFFM0QsYUFBYTtrQkFMekIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixNQUFNLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDbkMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsZUFBZSxFQUFFLENBQUM7aUJBQ3ZFOzhCQUV3QixJQUFJO3NCQUF4QixLQUFLO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtUcmVlTm9kZURlZiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay90cmVlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RyZWVOb2RlRGVmXScsXG4gICAgaW5wdXRzOiBbJ3doZW46IG1jVHJlZU5vZGVEZWZXaGVuJ10sXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZURlZiwgdXNlRXhpc3Rpbmc6IE1jVHJlZU5vZGVEZWYgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZURlZjxUPiBleHRlbmRzIENka1RyZWVOb2RlRGVmPFQ+IHtcbiAgICBASW5wdXQoJ21jVHJlZU5vZGUnKSBkYXRhOiBUO1xufVxuIl19
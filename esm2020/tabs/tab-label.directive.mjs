import { CdkPortal } from '@angular/cdk/portal';
import { Directive, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export const MC_TAB_LABEL = new InjectionToken('McTabLabel');
/** Used to flag tab labels for use with the portal directive */
export class McTabLabel extends CdkPortal {
}
/** @nocollapse */ /** @nocollapse */ McTabLabel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McTabLabel, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTabLabel.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McTabLabel, selector: "[mc-tab-label], [mcTabLabel]", providers: [{ provide: MC_TAB_LABEL, useExisting: McTabLabel }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McTabLabel, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-tab-label], [mcTabLabel]',
                    providers: [{ provide: MC_TAB_LABEL, useExisting: McTabLabel }]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWJzL3RhYi1sYWJlbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUcxRCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxjQUFjLENBQWEsWUFBWSxDQUFDLENBQUM7QUFFekUsZ0VBQWdFO0FBS2hFLE1BQU0sT0FBTyxVQUFXLFNBQVEsU0FBUzs7NklBQTVCLFVBQVU7aUlBQVYsVUFBVSx1REFGUixDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUM7MkZBRXRELFVBQVU7a0JBSnRCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsWUFBWSxFQUFFLENBQUM7aUJBQ2xFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZXhwb3J0IGNvbnN0IE1DX1RBQl9MQUJFTCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNY1RhYkxhYmVsPignTWNUYWJMYWJlbCcpO1xuXG4vKiogVXNlZCB0byBmbGFnIHRhYiBsYWJlbHMgZm9yIHVzZSB3aXRoIHRoZSBwb3J0YWwgZGlyZWN0aXZlICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYy10YWItbGFiZWxdLCBbbWNUYWJMYWJlbF0nLFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTUNfVEFCX0xBQkVMLCB1c2VFeGlzdGluZzogTWNUYWJMYWJlbCB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYkxhYmVsIGV4dGVuZHMgQ2RrUG9ydGFsIHt9XG4iXX0=
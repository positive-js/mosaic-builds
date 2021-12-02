import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
let nextUniqueId = 0;
export class McHint {
    constructor() {
        this.id = `mc-hint-${nextUniqueId++}`;
    }
}
/** @nocollapse */ McHint.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McHint, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McHint.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McHint, selector: "mc-hint", inputs: { id: "id" }, host: { properties: { "attr.id": "id" }, classAttribute: "mc-hint" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McHint, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-hint',
                    host: {
                        class: 'mc-hint',
                        '[attr.id]': 'id'
                    }
                }]
        }], propDecorators: { id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL2hpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBR2pELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQVNyQixNQUFNLE9BQU8sTUFBTTtJQVBuQjtRQVFhLE9BQUUsR0FBVyxXQUFXLFlBQVksRUFBRSxFQUFFLENBQUM7S0FDckQ7O3VIQUZZLE1BQU07MkdBQU4sTUFBTTs0RkFBTixNQUFNO2tCQVBsQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLFdBQVcsRUFBRSxJQUFJO3FCQUNwQjtpQkFDSjs4QkFFWSxFQUFFO3NCQUFWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtaGludCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWhpbnQnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNIaW50IHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1jLWhpbnQtJHtuZXh0VW5pcXVlSWQrK31gO1xufVxuIl19
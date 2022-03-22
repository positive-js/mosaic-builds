import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
let nextHintUniqueId = 0;
export class McHint {
    constructor() {
        this.id = `mc-hint-${nextHintUniqueId++}`;
    }
}
/** @nocollapse */ /** @nocollapse */ McHint.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McHint, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McHint.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McHint, selector: "mc-hint", inputs: { id: "id" }, host: { properties: { "attr.id": "id" }, classAttribute: "mc-hint" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McHint, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL2hpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBR2pELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBU3pCLE1BQU0sT0FBTyxNQUFNO0lBUG5CO1FBUWEsT0FBRSxHQUFXLFdBQVcsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO0tBQ3pEOzt5SUFGWSxNQUFNOzZIQUFOLE1BQU07MkZBQU4sTUFBTTtrQkFQbEIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsU0FBUztvQkFDbkIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxTQUFTO3dCQUNoQixXQUFXLEVBQUUsSUFBSTtxQkFDcEI7aUJBQ0o7OEJBRVksRUFBRTtzQkFBVixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmxldCBuZXh0SGludFVuaXF1ZUlkID0gMDtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1oaW50JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtaGludCcsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0hpbnQge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWMtaGludC0ke25leHRIaW50VW5pcXVlSWQrK31gO1xufVxuIl19
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class McHighlightPipe {
    transform(value, args) {
        if (!args) {
            return value;
        }
        return value.replace(new RegExp(`(${args})`, 'gi'), '<mark class="mc-highlight">$1</mark>');
    }
}
/** @nocollapse */ /** @nocollapse */ McHighlightPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McHighlightPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
/** @nocollapse */ /** @nocollapse */ McHighlightPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McHighlightPipe, name: "mcHighlight" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McHighlightPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'mcHighlight' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9oaWdobGlnaHQvaGlnaGxpZ2h0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBSXBELE1BQU0sT0FBTyxlQUFlO0lBQ3hCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsSUFBUztRQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7U0FBRTtRQUU1QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxzQ0FBc0MsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7O2tKQUxRLGVBQWU7Z0pBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5AUGlwZSh7IG5hbWU6ICdtY0hpZ2hsaWdodCcgfSlcbmV4cG9ydCBjbGFzcyBNY0hpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgYXJnczogYW55KTogYW55IHtcbiAgICAgICAgaWYgKCFhcmdzKSB7IHJldHVybiB2YWx1ZTsgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCgke2FyZ3N9KWAsICdnaScpLCAnPG1hcmsgY2xhc3M9XCJtYy1oaWdobGlnaHRcIj4kMTwvbWFyaz4nKTtcbiAgICB9XG59XG4iXX0=
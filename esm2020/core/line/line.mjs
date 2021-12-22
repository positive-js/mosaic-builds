import { NgModule, Directive } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
export class McLine {
}
/** @nocollapse */ /** @nocollapse */ McLine.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McLine, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McLine.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McLine, selector: "[mc-line], [mcLine]", host: { classAttribute: "mc-line" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McLine, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-line], [mcLine]',
                    host: { class: 'mc-line' }
                }]
        }] });
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
export class McLineSetter {
    constructor(_lines, _element) {
        this._lines = _lines;
        this._element = _element;
        this.setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this.setLineClass(this._lines.length);
        });
    }
    setLineClass(count) {
        const minLineClassNumber = 2;
        const maxLineClassNumber = 3;
        this.resetClasses();
        if (count === minLineClassNumber || count === maxLineClassNumber) {
            this.setClass(`mc-${count}-line`, true);
        }
        else if (count > maxLineClassNumber) {
            this.setClass(`mc-multi-line`, true);
        }
    }
    resetClasses() {
        this.setClass('mc-2-line', false);
        this.setClass('mc-3-line', false);
        this.setClass('mc-multi-line', false);
    }
    setClass(className, isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add(className);
        }
        else {
            this._element.nativeElement.classList.remove(className);
        }
    }
}
export class McLineModule {
}
/** @nocollapse */ /** @nocollapse */ McLineModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McLineModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McLineModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McLineModule, declarations: [McLine], exports: [McLine] });
/** @nocollapse */ /** @nocollapse */ McLineModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McLineModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McLineModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    exports: [McLine],
                    declarations: [McLine]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jb3JlL2xpbmUvbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBeUIsTUFBTSxlQUFlLENBQUM7O0FBRzNFOzs7O0dBSUc7QUFLSCxNQUFNLE9BQU8sTUFBTTs7eUlBQU4sTUFBTTs2SEFBTixNQUFNOzJGQUFOLE1BQU07a0JBSmxCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtpQkFDN0I7O0FBR0Q7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFDckIsWUFBb0IsTUFBeUIsRUFBVSxRQUFvQjtRQUF2RCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFhO1FBQzlCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLEtBQUssS0FBSyxrQkFBa0IsSUFBSSxLQUFLLEtBQUssa0JBQWtCLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxLQUFLLEdBQUcsa0JBQWtCLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sUUFBUSxDQUFDLFNBQWlCLEVBQUUsS0FBYztRQUM5QyxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0Q7SUFDTCxDQUFDO0NBQ0o7QUFPRCxNQUFNLE9BQU8sWUFBWTs7K0lBQVosWUFBWTtnSkFBWixZQUFZLGlCQTlDWixNQUFNLGFBQU4sTUFBTTtnSkE4Q04sWUFBWSxZQUpaLEVBQUU7MkZBSUYsWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsRUFBRTtvQkFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ2pCLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIFNoYXJlZCBkaXJlY3RpdmUgdG8gY291bnQgbGluZXMgaW5zaWRlIGEgdGV4dCBhcmVhLCBzdWNoIGFzIGEgbGlzdCBpdGVtLlxuICogTGluZSBlbGVtZW50cyBjYW4gYmUgZXh0cmFjdGVkIHdpdGggYSBAQ29udGVudENoaWxkcmVuKE1jTGluZSkgcXVlcnksIHRoZW5cbiAqIGNvdW50ZWQgYnkgY2hlY2tpbmcgdGhlIHF1ZXJ5IGxpc3QncyBsZW5ndGguXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLWxpbmVdLCBbbWNMaW5lXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLWxpbmUnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNMaW5lIHt9XG5cbi8qKlxuICogSGVscGVyIHRoYXQgdGFrZXMgYSBxdWVyeSBsaXN0IG9mIGxpbmVzIGFuZCBzZXRzIHRoZSBjb3JyZWN0IGNsYXNzIG9uIHRoZSBob3N0LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgTWNMaW5lU2V0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9saW5lczogUXVlcnlMaXN0PE1jTGluZT4sIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5zZXRMaW5lQ2xhc3ModGhpcy5fbGluZXMubGVuZ3RoKTtcblxuICAgICAgICB0aGlzLl9saW5lcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldExpbmVDbGFzcyh0aGlzLl9saW5lcy5sZW5ndGgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldExpbmVDbGFzcyhjb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1pbkxpbmVDbGFzc051bWJlciA9IDI7XG4gICAgICAgIGNvbnN0IG1heExpbmVDbGFzc051bWJlciA9IDM7XG4gICAgICAgIHRoaXMucmVzZXRDbGFzc2VzKCk7XG4gICAgICAgIGlmIChjb3VudCA9PT0gbWluTGluZUNsYXNzTnVtYmVyIHx8IGNvdW50ID09PSBtYXhMaW5lQ2xhc3NOdW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2xhc3MoYG1jLSR7Y291bnR9LWxpbmVgLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb3VudCA+IG1heExpbmVDbGFzc051bWJlcikge1xuICAgICAgICAgICAgdGhpcy5zZXRDbGFzcyhgbWMtbXVsdGktbGluZWAsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldENsYXNzZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3MoJ21jLTItbGluZScsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRDbGFzcygnbWMtMy1saW5lJywgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldENsYXNzKCdtYy1tdWx0aS1saW5lJywgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcsIGlzQWRkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0FkZCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW10sXG4gICAgZXhwb3J0czogW01jTGluZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNMaW5lXVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpbmVNb2R1bGUge31cbiJdfQ==
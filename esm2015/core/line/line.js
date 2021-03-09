import { NgModule, Directive } from '@angular/core';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
export class McLine {
}
McLine.decorators = [
    { type: Directive, args: [{
                selector: '[mc-line], [mcLine]',
                host: { class: 'mc-line' }
            },] }
];
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
McLineModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [McLine],
                declarations: [McLine]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jb3JlL2xpbmUvbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBeUIsTUFBTSxlQUFlLENBQUM7QUFHM0U7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxNQUFNOzs7WUFKbEIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7YUFDN0I7O0FBR0Q7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFDckIsWUFBb0IsTUFBeUIsRUFBVSxRQUFvQjtRQUF2RCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFhO1FBQzlCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLEtBQUssS0FBSyxrQkFBa0IsSUFBSSxLQUFLLEtBQUssa0JBQWtCLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxLQUFLLEdBQUcsa0JBQWtCLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sUUFBUSxDQUFDLFNBQWlCLEVBQUUsS0FBYztRQUM5QyxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0Q7SUFDTCxDQUFDO0NBQ0o7QUFPRCxNQUFNLE9BQU8sWUFBWTs7O1lBTHhCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ2pCLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogU2hhcmVkIGRpcmVjdGl2ZSB0byBjb3VudCBsaW5lcyBpbnNpZGUgYSB0ZXh0IGFyZWEsIHN1Y2ggYXMgYSBsaXN0IGl0ZW0uXG4gKiBMaW5lIGVsZW1lbnRzIGNhbiBiZSBleHRyYWN0ZWQgd2l0aCBhIEBDb250ZW50Q2hpbGRyZW4oTWNMaW5lKSBxdWVyeSwgdGhlblxuICogY291bnRlZCBieSBjaGVja2luZyB0aGUgcXVlcnkgbGlzdCdzIGxlbmd0aC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtbGluZV0sIFttY0xpbmVdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtbGluZScgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpbmUge31cblxuLyoqXG4gKiBIZWxwZXIgdGhhdCB0YWtlcyBhIHF1ZXJ5IGxpc3Qgb2YgbGluZXMgYW5kIHNldHMgdGhlIGNvcnJlY3QgY2xhc3Mgb24gdGhlIGhvc3QuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNY0xpbmVTZXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xpbmVzOiBRdWVyeUxpc3Q8TWNMaW5lPiwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLnNldExpbmVDbGFzcyh0aGlzLl9saW5lcy5sZW5ndGgpO1xuXG4gICAgICAgIHRoaXMuX2xpbmVzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0TGluZUNsYXNzKHRoaXMuX2xpbmVzLmxlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TGluZUNsYXNzKGNvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbWluTGluZUNsYXNzTnVtYmVyID0gMjtcbiAgICAgICAgY29uc3QgbWF4TGluZUNsYXNzTnVtYmVyID0gMztcbiAgICAgICAgdGhpcy5yZXNldENsYXNzZXMoKTtcbiAgICAgICAgaWYgKGNvdW50ID09PSBtaW5MaW5lQ2xhc3NOdW1iZXIgfHwgY291bnQgPT09IG1heExpbmVDbGFzc051bWJlcikge1xuICAgICAgICAgICAgdGhpcy5zZXRDbGFzcyhgbWMtJHtjb3VudH0tbGluZWAsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID4gbWF4TGluZUNsYXNzTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldENsYXNzKGBtYy1tdWx0aS1saW5lYCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0Q2xhc3NlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRDbGFzcygnbWMtMi1saW5lJywgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldENsYXNzKCdtYy0zLWxpbmUnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3MoJ21jLW11bHRpLWxpbmUnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDbGFzcyhjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQWRkKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXSxcbiAgICBleHBvcnRzOiBbTWNMaW5lXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY0xpbmVdXG59KVxuZXhwb3J0IGNsYXNzIE1jTGluZU1vZHVsZSB7fVxuIl19
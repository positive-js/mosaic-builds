/**
 * @fileoverview added by tsickle
 * Generated from: line/line.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Directive } from '@angular/core';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(McLine) query, then
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
 * \@docs-private
 */
export class McLineSetter {
    /**
     * @param {?} _lines
     * @param {?} _element
     */
    constructor(_lines, _element) {
        this._lines = _lines;
        this._element = _element;
        this.setLineClass(this._lines.length);
        this._lines.changes.subscribe((/**
         * @return {?}
         */
        () => {
            this.setLineClass(this._lines.length);
        }));
    }
    /**
     * @private
     * @param {?} count
     * @return {?}
     */
    setLineClass(count) {
        /** @type {?} */
        const minLineClassNumber = 2;
        /** @type {?} */
        const maxLineClassNumber = 3;
        this.resetClasses();
        if (count === minLineClassNumber || count === maxLineClassNumber) {
            this.setClass(`mc-${count}-line`, true);
        }
        else if (count > maxLineClassNumber) {
            this.setClass(`mc-multi-line`, true);
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetClasses() {
        this.setClass('mc-2-line', false);
        this.setClass('mc-3-line', false);
        this.setClass('mc-multi-line', false);
    }
    /**
     * @private
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setClass(className, isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add(className);
        }
        else {
            this._element.nativeElement.classList.remove(className);
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    McLineSetter.prototype._lines;
    /**
     * @type {?}
     * @private
     */
    McLineSetter.prototype._element;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJsaW5lL2xpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBeUIsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVkzRSxNQUFNLE9BQU8sTUFBTTs7O1lBSmxCLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2FBQzdCOzs7Ozs7QUFPRCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFDckIsWUFBb0IsTUFBeUIsRUFBVSxRQUFvQjtRQUF2RCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxZQUFZLENBQUMsS0FBYTs7Y0FDeEIsa0JBQWtCLEdBQUcsQ0FBQzs7Y0FDdEIsa0JBQWtCLEdBQUcsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxLQUFLLEtBQUssa0JBQWtCLElBQUksS0FBSyxLQUFLLGtCQUFrQixFQUFFO1lBQzlELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQzthQUFNLElBQUksS0FBSyxHQUFHLGtCQUFrQixFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7Ozs7SUFFTyxRQUFRLENBQUMsU0FBaUIsRUFBRSxLQUFjO1FBQzlDLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7Q0FDSjs7Ozs7O0lBaENlLDhCQUFpQzs7Ozs7SUFBRSxnQ0FBNEI7O0FBdUMvRSxNQUFNLE9BQU8sWUFBWTs7O1lBTHhCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ2pCLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogU2hhcmVkIGRpcmVjdGl2ZSB0byBjb3VudCBsaW5lcyBpbnNpZGUgYSB0ZXh0IGFyZWEsIHN1Y2ggYXMgYSBsaXN0IGl0ZW0uXG4gKiBMaW5lIGVsZW1lbnRzIGNhbiBiZSBleHRyYWN0ZWQgd2l0aCBhIEBDb250ZW50Q2hpbGRyZW4oTWNMaW5lKSBxdWVyeSwgdGhlblxuICogY291bnRlZCBieSBjaGVja2luZyB0aGUgcXVlcnkgbGlzdCdzIGxlbmd0aC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtbGluZV0sIFttY0xpbmVdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtbGluZScgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpbmUge31cblxuLyoqXG4gKiBIZWxwZXIgdGhhdCB0YWtlcyBhIHF1ZXJ5IGxpc3Qgb2YgbGluZXMgYW5kIHNldHMgdGhlIGNvcnJlY3QgY2xhc3Mgb24gdGhlIGhvc3QuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNY0xpbmVTZXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xpbmVzOiBRdWVyeUxpc3Q8TWNMaW5lPiwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLnNldExpbmVDbGFzcyh0aGlzLl9saW5lcy5sZW5ndGgpO1xuXG4gICAgICAgIHRoaXMuX2xpbmVzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0TGluZUNsYXNzKHRoaXMuX2xpbmVzLmxlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TGluZUNsYXNzKGNvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbWluTGluZUNsYXNzTnVtYmVyID0gMjtcbiAgICAgICAgY29uc3QgbWF4TGluZUNsYXNzTnVtYmVyID0gMztcbiAgICAgICAgdGhpcy5yZXNldENsYXNzZXMoKTtcbiAgICAgICAgaWYgKGNvdW50ID09PSBtaW5MaW5lQ2xhc3NOdW1iZXIgfHwgY291bnQgPT09IG1heExpbmVDbGFzc051bWJlcikge1xuICAgICAgICAgICAgdGhpcy5zZXRDbGFzcyhgbWMtJHtjb3VudH0tbGluZWAsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID4gbWF4TGluZUNsYXNzTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldENsYXNzKGBtYy1tdWx0aS1saW5lYCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0Q2xhc3NlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRDbGFzcygnbWMtMi1saW5lJywgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldENsYXNzKCdtYy0zLWxpbmUnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3MoJ21jLW11bHRpLWxpbmUnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDbGFzcyhjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQWRkKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXSxcbiAgICBleHBvcnRzOiBbTWNMaW5lXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY0xpbmVdXG59KVxuZXhwb3J0IGNsYXNzIE1jTGluZU1vZHVsZSB7fVxuIl19
/**
 * @fileoverview added by tsickle
 * Generated from: line/line.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Directive } from '@angular/core';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(McLine) query, then
 * counted by checking the query list's length.
 */
var McLine = /** @class */ (function () {
    function McLine() {
    }
    McLine.decorators = [
        { type: Directive, args: [{
                    selector: '[mc-line], [mcLine]',
                    host: { class: 'mc-line' }
                },] }
    ];
    return McLine;
}());
export { McLine };
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
var /**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
McLineSetter = /** @class */ (function () {
    function McLineSetter(_lines, _element) {
        var _this = this;
        this._lines = _lines;
        this._element = _element;
        this.setLineClass(this._lines.length);
        this._lines.changes.subscribe((/**
         * @return {?}
         */
        function () {
            _this.setLineClass(_this._lines.length);
        }));
    }
    /**
     * @private
     * @param {?} count
     * @return {?}
     */
    McLineSetter.prototype.setLineClass = /**
     * @private
     * @param {?} count
     * @return {?}
     */
    function (count) {
        /** @type {?} */
        var minLineClassNumber = 2;
        /** @type {?} */
        var maxLineClassNumber = 3;
        this.resetClasses();
        if (count === minLineClassNumber || count === maxLineClassNumber) {
            this.setClass("mc-" + count + "-line", true);
        }
        else if (count > maxLineClassNumber) {
            this.setClass("mc-multi-line", true);
        }
    };
    /**
     * @private
     * @return {?}
     */
    McLineSetter.prototype.resetClasses = /**
     * @private
     * @return {?}
     */
    function () {
        this.setClass('mc-2-line', false);
        this.setClass('mc-3-line', false);
        this.setClass('mc-multi-line', false);
    };
    /**
     * @private
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    McLineSetter.prototype.setClass = /**
     * @private
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    function (className, isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add(className);
        }
        else {
            this._element.nativeElement.classList.remove(className);
        }
    };
    return McLineSetter;
}());
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
export { McLineSetter };
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
var McLineModule = /** @class */ (function () {
    function McLineModule() {
    }
    McLineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    exports: [McLine],
                    declarations: [McLine]
                },] }
    ];
    return McLineModule;
}());
export { McLineModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsibGluZS9saW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFRM0U7SUFBQTtJQUlxQixDQUFDOztnQkFKckIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7aUJBQzdCOztJQUNvQixhQUFDO0NBQUEsQUFKdEIsSUFJc0I7U0FBVCxNQUFNOzs7OztBQU1uQjs7Ozs7SUFDSSxzQkFBb0IsTUFBeUIsRUFBVSxRQUFvQjtRQUEzRSxpQkFNQztRQU5tQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7OztRQUFDO1lBQzFCLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLG1DQUFZOzs7OztJQUFwQixVQUFxQixLQUFhOztZQUN4QixrQkFBa0IsR0FBRyxDQUFDOztZQUN0QixrQkFBa0IsR0FBRyxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLEtBQUssS0FBSyxrQkFBa0IsSUFBSSxLQUFLLEtBQUssa0JBQWtCLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFNLEtBQUssVUFBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxLQUFLLEdBQUcsa0JBQWtCLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDOzs7OztJQUVPLG1DQUFZOzs7O0lBQXBCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7OztJQUVPLCtCQUFROzs7Ozs7SUFBaEIsVUFBaUIsU0FBaUIsRUFBRSxLQUFjO1FBQzlDLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN4RDthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7Ozs7Ozs7Ozs7O0lBaENlLDhCQUFpQzs7Ozs7SUFBRSxnQ0FBNEI7O0FBa0MvRTtJQUFBO0lBSzJCLENBQUM7O2dCQUwzQixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLEVBQUU7b0JBQ1gsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO29CQUNqQixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUJBQ3pCOztJQUMwQixtQkFBQztDQUFBLEFBTDVCLElBSzRCO1NBQWYsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogU2hhcmVkIGRpcmVjdGl2ZSB0byBjb3VudCBsaW5lcyBpbnNpZGUgYSB0ZXh0IGFyZWEsIHN1Y2ggYXMgYSBsaXN0IGl0ZW0uXG4gKiBMaW5lIGVsZW1lbnRzIGNhbiBiZSBleHRyYWN0ZWQgd2l0aCBhIEBDb250ZW50Q2hpbGRyZW4oTWNMaW5lKSBxdWVyeSwgdGhlblxuICogY291bnRlZCBieSBjaGVja2luZyB0aGUgcXVlcnkgbGlzdCdzIGxlbmd0aC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtbGluZV0sIFttY0xpbmVdJyxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtbGluZScgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpbmUge31cblxuLyoqXG4gKiBIZWxwZXIgdGhhdCB0YWtlcyBhIHF1ZXJ5IGxpc3Qgb2YgbGluZXMgYW5kIHNldHMgdGhlIGNvcnJlY3QgY2xhc3Mgb24gdGhlIGhvc3QuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBNY0xpbmVTZXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xpbmVzOiBRdWVyeUxpc3Q8TWNMaW5lPiwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLnNldExpbmVDbGFzcyh0aGlzLl9saW5lcy5sZW5ndGgpO1xuXG4gICAgICAgIHRoaXMuX2xpbmVzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0TGluZUNsYXNzKHRoaXMuX2xpbmVzLmxlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TGluZUNsYXNzKGNvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbWluTGluZUNsYXNzTnVtYmVyID0gMjtcbiAgICAgICAgY29uc3QgbWF4TGluZUNsYXNzTnVtYmVyID0gMztcbiAgICAgICAgdGhpcy5yZXNldENsYXNzZXMoKTtcbiAgICAgICAgaWYgKGNvdW50ID09PSBtaW5MaW5lQ2xhc3NOdW1iZXIgfHwgY291bnQgPT09IG1heExpbmVDbGFzc051bWJlcikge1xuICAgICAgICAgICAgdGhpcy5zZXRDbGFzcyhgbWMtJHtjb3VudH0tbGluZWAsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID4gbWF4TGluZUNsYXNzTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldENsYXNzKGBtYy1tdWx0aS1saW5lYCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0Q2xhc3NlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRDbGFzcygnbWMtMi1saW5lJywgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldENsYXNzKCdtYy0zLWxpbmUnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3MoJ21jLW11bHRpLWxpbmUnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDbGFzcyhjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQWRkKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXSxcbiAgICBleHBvcnRzOiBbTWNMaW5lXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY0xpbmVdXG59KVxuZXhwb3J0IGNsYXNzIE1jTGluZU1vZHVsZSB7fVxuIl19
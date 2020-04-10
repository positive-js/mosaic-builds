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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsibGluZS9saW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQXlCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFZM0UsTUFBTSxPQUFPLE1BQU07OztZQUpsQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTthQUM3Qjs7Ozs7O0FBT0QsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBQ3JCLFlBQW9CLE1BQXlCLEVBQVUsUUFBb0I7UUFBdkQsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLEtBQWE7O2NBQ3hCLGtCQUFrQixHQUFHLENBQUM7O2NBQ3RCLGtCQUFrQixHQUFHLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksS0FBSyxLQUFLLGtCQUFrQixJQUFJLEtBQUssS0FBSyxrQkFBa0IsRUFBRTtZQUM5RCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLEtBQUssR0FBRyxrQkFBa0IsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7O0lBRU8sUUFBUSxDQUFDLFNBQWlCLEVBQUUsS0FBYztRQUM5QyxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0Q7SUFDTCxDQUFDO0NBQ0o7Ozs7OztJQWhDZSw4QkFBaUM7Ozs7O0lBQUUsZ0NBQTRCOztBQXVDL0UsTUFBTSxPQUFPLFlBQVk7OztZQUx4QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUNqQixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIFNoYXJlZCBkaXJlY3RpdmUgdG8gY291bnQgbGluZXMgaW5zaWRlIGEgdGV4dCBhcmVhLCBzdWNoIGFzIGEgbGlzdCBpdGVtLlxuICogTGluZSBlbGVtZW50cyBjYW4gYmUgZXh0cmFjdGVkIHdpdGggYSBAQ29udGVudENoaWxkcmVuKE1jTGluZSkgcXVlcnksIHRoZW5cbiAqIGNvdW50ZWQgYnkgY2hlY2tpbmcgdGhlIHF1ZXJ5IGxpc3QncyBsZW5ndGguXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jLWxpbmVdLCBbbWNMaW5lXScsXG4gICAgaG9zdDogeyBjbGFzczogJ21jLWxpbmUnIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNMaW5lIHt9XG5cbi8qKlxuICogSGVscGVyIHRoYXQgdGFrZXMgYSBxdWVyeSBsaXN0IG9mIGxpbmVzIGFuZCBzZXRzIHRoZSBjb3JyZWN0IGNsYXNzIG9uIHRoZSBob3N0LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgTWNMaW5lU2V0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9saW5lczogUXVlcnlMaXN0PE1jTGluZT4sIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5zZXRMaW5lQ2xhc3ModGhpcy5fbGluZXMubGVuZ3RoKTtcblxuICAgICAgICB0aGlzLl9saW5lcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldExpbmVDbGFzcyh0aGlzLl9saW5lcy5sZW5ndGgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldExpbmVDbGFzcyhjb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1pbkxpbmVDbGFzc051bWJlciA9IDI7XG4gICAgICAgIGNvbnN0IG1heExpbmVDbGFzc051bWJlciA9IDM7XG4gICAgICAgIHRoaXMucmVzZXRDbGFzc2VzKCk7XG4gICAgICAgIGlmIChjb3VudCA9PT0gbWluTGluZUNsYXNzTnVtYmVyIHx8IGNvdW50ID09PSBtYXhMaW5lQ2xhc3NOdW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2xhc3MoYG1jLSR7Y291bnR9LWxpbmVgLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb3VudCA+IG1heExpbmVDbGFzc051bWJlcikge1xuICAgICAgICAgICAgdGhpcy5zZXRDbGFzcyhgbWMtbXVsdGktbGluZWAsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldENsYXNzZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3MoJ21jLTItbGluZScsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRDbGFzcygnbWMtMy1saW5lJywgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldENsYXNzKCdtYy1tdWx0aS1saW5lJywgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcsIGlzQWRkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0FkZCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW10sXG4gICAgZXhwb3J0czogW01jTGluZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNMaW5lXVxufSlcbmV4cG9ydCBjbGFzcyBNY0xpbmVNb2R1bGUge31cbiJdfQ==
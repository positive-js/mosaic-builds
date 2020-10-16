/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/color.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function CanColor() { }
if (false) {
    /** @type {?} */
    CanColor.prototype.color;
}
/**
 * @record
 */
export function HasElementRef() { }
if (false) {
    /** @type {?} */
    HasElementRef.prototype._elementRef;
}
/** @enum {string} */
const ThemePalette = {
    Primary: "primary",
    Second: "second",
    Error: "error",
    Default: "second",
    Empty: "",
};
export { ThemePalette };
/**
 * Mixin to augment a directive with a `color` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultColor
 * @return {?}
 */
export function mixinColor(base, defaultColor = ThemePalette.Default) {
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this.color = defaultColor;
        }
        /**
         * @return {?}
         */
        get color() {
            return this._color;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        set color(value) {
            /** @type {?} */
            const colorPalette = value || defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._elementRef.nativeElement.classList.remove(`mc-${this._color}`);
                }
                if (colorPalette) {
                    this._elementRef.nativeElement.classList.add(`mc-${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsiY29tbW9uLWJlaGF2aW9ycy9jb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQU1BLDhCQUVDOzs7SUFERyx5QkFBb0I7Ozs7O0FBT3hCLG1DQUVDOzs7SUFERyxvQ0FBd0I7OztBQUc1QixNQUFZLFlBQVk7SUFDcEIsT0FBTyxXQUFZO0lBQ25CLE1BQU0sVUFBVztJQUNqQixLQUFLLFNBQVU7SUFDZixPQUFPLFVBQVc7SUFDbEIsS0FBSyxJQUFLO0VBQ2I7Ozs7Ozs7OztBQUdELE1BQU0sVUFBVSxVQUFVLENBQ3RCLElBQU8sRUFDUCxlQUE2QixZQUFZLENBQUMsT0FBTztJQUVqRCxPQUFPLEtBQU0sU0FBUSxJQUFJOzs7O1FBd0JyQixZQUFZLEdBQUcsSUFBVztZQUN0QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUVmLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzlCLENBQUM7Ozs7UUExQkQsSUFBSSxLQUFLO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBRUQsSUFBSSxLQUFLLENBQUMsS0FBbUI7O2tCQUNuQixZQUFZLEdBQUcsS0FBSyxJQUFJLFlBQVk7WUFFMUMsSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDeEU7Z0JBRUQsSUFBSSxZQUFZLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLFlBQVksRUFBRSxDQUFDLENBQUM7aUJBQ3RFO2dCQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2FBQzlCO1FBQ0wsQ0FBQztLQVNKLENBQUM7QUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb25zdHJ1Y3RvciB9IGZyb20gJy4vY29uc3RydWN0b3InO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBDYW5Db2xvciB7XG4gICAgY29sb3I6IFRoZW1lUGFsZXR0ZTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCB0eXBlIENhbkNvbG9yQ3RvciA9IENvbnN0cnVjdG9yPENhbkNvbG9yPjtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEhhc0VsZW1lbnRSZWYge1xuICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmO1xufVxuXG5leHBvcnQgZW51bSBUaGVtZVBhbGV0dGUge1xuICAgIFByaW1hcnkgPSAncHJpbWFyeScsXG4gICAgU2Vjb25kID0gJ3NlY29uZCcsXG4gICAgRXJyb3IgPSAnZXJyb3InLFxuICAgIERlZmF1bHQgPSAnc2Vjb25kJyxcbiAgICBFbXB0eSA9ICcnXG59XG5cbi8qKiBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggYSBgY29sb3JgIHByb3BlcnR5LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluQ29sb3I8VCBleHRlbmRzIENvbnN0cnVjdG9yPEhhc0VsZW1lbnRSZWY+PihcbiAgICBiYXNlOiBULFxuICAgIGRlZmF1bHRDb2xvcjogVGhlbWVQYWxldHRlID0gVGhlbWVQYWxldHRlLkRlZmF1bHRcbik6IENhbkNvbG9yQ3RvciAmIFQge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuXG4gICAgICAgIGdldCBjb2xvcigpOiBUaGVtZVBhbGV0dGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yUGFsZXR0ZSA9IHZhbHVlIHx8IGRlZmF1bHRDb2xvcjtcblxuICAgICAgICAgICAgaWYgKGNvbG9yUGFsZXR0ZSAhPT0gdGhpcy5fY29sb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYG1jLSR7dGhpcy5fY29sb3J9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbG9yUGFsZXR0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbWMtJHtjb2xvclBhbGV0dGV9YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvclBhbGV0dGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb2xvcjogVGhlbWVQYWxldHRlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICAgICAgdGhpcy5jb2xvciA9IGRlZmF1bHRDb2xvcjtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbiJdfQ==
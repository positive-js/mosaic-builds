import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
// Boilerplate for applying mixins to McTabLabelWrapper.
/** @docs-private */
export class McTabLabelWrapperBase {
}
// tslint:disable-next-line:naming-convention
export const McTabLabelWrapperMixinBase = mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * @docs-private
 */
export class McTabLabelWrapper extends McTabLabelWrapperMixinBase {
    constructor(elementRef, renderer) {
        super();
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.addClassModifierForIcons(Array.from(this.elementRef.nativeElement.querySelectorAll('.mc-icon')));
    }
    /** Sets focus on the wrapper element */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
    addClassModifierForIcons(icons) {
        const twoIcons = 2;
        const [firstIconElement, secondIconElement] = icons;
        if (icons.length === 1) {
            const COMMENT_NODE = 8;
            if (firstIconElement.nextSibling && firstIconElement.nextSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_left');
            }
            if (firstIconElement.previousSibling && firstIconElement.previousSibling.nodeType !== COMMENT_NODE) {
                this.renderer.addClass(firstIconElement, 'mc-icon_right');
            }
        }
        else if (icons.length === twoIcons) {
            this.renderer.addClass(firstIconElement, 'mc-icon_left');
            this.renderer.addClass(secondIconElement, 'mc-icon_right');
        }
    }
}
McTabLabelWrapper.decorators = [
    { type: Directive, args: [{
                selector: '[mcTabLabelWrapper]',
                inputs: ['disabled'],
                host: {
                    '[attr.disabled]': 'disabled || null'
                }
            },] }
];
/** @nocollapse */
McTabLabelWrapper.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhYnMvdGFiLWxhYmVsLXdyYXBwZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUdILGFBQWEsRUFDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQUdqQyx3REFBd0Q7QUFDeEQsb0JBQW9CO0FBQ3BCLE1BQU0sT0FBTyxxQkFBcUI7Q0FBRztBQUNyQyw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQ0osYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFeEU7OztHQUdHO0FBUUgsTUFBTSxPQUFPLGlCQUFrQixTQUFRLDBCQUEwQjtJQUM3RCxZQUNXLFVBQXNCLEVBQ3JCLFFBQW1CO1FBRTNCLEtBQUssRUFBRSxDQUFDO1FBSEQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBRy9CLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsS0FBSztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDcEQsQ0FBQztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUNyRCxDQUFDO0lBRU8sd0JBQXdCLENBQUMsS0FBb0I7UUFDakQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUVwRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztZQUV2QixJQUFJLGdCQUFnQixDQUFDLFdBQVcsSUFBSSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtnQkFDeEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDNUQ7WUFFRCxJQUFJLGdCQUFnQixDQUFDLGVBQWUsSUFBSSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtnQkFDaEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLENBQUM7YUFDN0Q7U0FDSjthQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDOzs7WUFsREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsSUFBSSxFQUFFO29CQUNGLGlCQUFpQixFQUFFLGtCQUFrQjtpQkFDeEM7YUFDSjs7OztZQXpCa0MsVUFBVTtZQUFFLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYW5EaXNhYmxlLFxuICAgIENhbkRpc2FibGVDdG9yLFxuICAgIG1peGluRGlzYWJsZWRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWNUYWJMYWJlbFdyYXBwZXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNsYXNzIE1jVGFiTGFiZWxXcmFwcGVyQmFzZSB7fVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgTWNUYWJMYWJlbFdyYXBwZXJNaXhpbkJhc2U6IENhbkRpc2FibGVDdG9yICZcbiAgICB0eXBlb2YgTWNUYWJMYWJlbFdyYXBwZXJCYXNlID0gbWl4aW5EaXNhYmxlZChNY1RhYkxhYmVsV3JhcHBlckJhc2UpO1xuXG4vKipcbiAqIFVzZWQgaW4gdGhlIGBtYy10YWItZ3JvdXBgIHZpZXcgdG8gZGlzcGxheSB0YWIgbGFiZWxzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RhYkxhYmVsV3JhcHBlcl0nLFxuICAgIGlucHV0czogWydkaXNhYmxlZCddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJMYWJlbFdyYXBwZXIgZXh0ZW5kcyBNY1RhYkxhYmVsV3JhcHBlck1peGluQmFzZSBpbXBsZW1lbnRzIENhbkRpc2FibGUsIEFmdGVyVmlld0luaXQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZENsYXNzTW9kaWZpZXJGb3JJY29ucyhBcnJheS5mcm9tKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYy1pY29uJykpKTtcbiAgICB9XG5cbiAgICAvKiogU2V0cyBmb2N1cyBvbiB0aGUgd3JhcHBlciBlbGVtZW50ICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0T2Zmc2V0TGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICB9XG5cbiAgICBnZXRPZmZzZXRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRDbGFzc01vZGlmaWVyRm9ySWNvbnMoaWNvbnM6IEhUTUxFbGVtZW50W10pIHtcbiAgICAgICAgY29uc3QgdHdvSWNvbnMgPSAyO1xuICAgICAgICBjb25zdCBbZmlyc3RJY29uRWxlbWVudCwgc2Vjb25kSWNvbkVsZW1lbnRdID0gaWNvbnM7XG5cbiAgICAgICAgaWYgKGljb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgQ09NTUVOVF9OT0RFID0gODtcblxuICAgICAgICAgICAgaWYgKGZpcnN0SWNvbkVsZW1lbnQubmV4dFNpYmxpbmcgJiYgZmlyc3RJY29uRWxlbWVudC5uZXh0U2libGluZy5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9sZWZ0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmaXJzdEljb25FbGVtZW50LnByZXZpb3VzU2libGluZyAmJiBmaXJzdEljb25FbGVtZW50LnByZXZpb3VzU2libGluZy5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhmaXJzdEljb25FbGVtZW50LCAnbWMtaWNvbl9yaWdodCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGljb25zLmxlbmd0aCA9PT0gdHdvSWNvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzZWNvbmRJY29uRWxlbWVudCwgJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
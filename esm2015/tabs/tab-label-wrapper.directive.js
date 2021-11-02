import { ContentChild, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { mixinDisabled } from '@ptsecurity/mosaic/core';
import { McTab } from './tab.component';
import * as i0 from "@angular/core";
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
    checkOverflow() {
        this.tab.overflowTooltipTitle = this.isOverflown() ? this.getInnerText() : '';
    }
    isOverflown() {
        return this.labelContent.nativeElement.scrollWidth > this.labelContent.nativeElement.clientWidth;
    }
    getInnerText() {
        return this.labelContent.nativeElement.innerText;
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
/** @nocollapse */ McTabLabelWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTabLabelWrapper, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTabLabelWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTabLabelWrapper, selector: "[mcTabLabelWrapper]", inputs: { disabled: "disabled", tab: "tab" }, host: { properties: { "attr.disabled": "disabled || null" } }, queries: [{ propertyName: "labelContent", first: true, predicate: ["labelContent"], descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTabLabelWrapper, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[attr.disabled]': 'disabled || null'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { labelContent: [{
                type: ContentChild,
                args: ['labelContent']
            }], tab: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RhYnMvdGFiLWxhYmVsLXdyYXBwZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFSCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxhQUFhLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFFakMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUd4Qyx3REFBd0Q7QUFDeEQsb0JBQW9CO0FBQ3BCLE1BQU0sT0FBTyxxQkFBcUI7Q0FBRztBQUNyQyw2Q0FBNkM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQ0osYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFeEU7OztHQUdHO0FBUUgsTUFBTSxPQUFPLGlCQUFrQixTQUFRLDBCQUEwQjtJQUs3RCxZQUNXLFVBQXNCLEVBQ3JCLFFBQW1CO1FBRTNCLEtBQUssRUFBRSxDQUFDO1FBSEQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFXO0lBRy9CLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsS0FBSztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDcEQsQ0FBQztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUNyRCxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRixDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUNyRyxDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQ3JELENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxLQUFvQjtRQUNqRCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRXBELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDcEIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBRXZCLElBQUksZ0JBQWdCLENBQUMsV0FBVyxJQUFJLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO2dCQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUM1RDtZQUVELElBQUksZ0JBQWdCLENBQUMsZUFBZSxJQUFJLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO2dCQUNoRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUM3RDtTQUNKO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUM5RDtJQUNMLENBQUM7O2lJQTNEUSxpQkFBaUI7cUhBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQVA3QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDcEIsSUFBSSxFQUFFO3dCQUNGLGlCQUFpQixFQUFFLGtCQUFrQjtxQkFDeEM7aUJBQ0o7eUhBRWlDLFlBQVk7c0JBQXpDLFlBQVk7dUJBQUMsY0FBYztnQkFFbkIsR0FBRztzQkFBWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbkRpc2FibGUsXG4gICAgQ2FuRGlzYWJsZUN0b3IsXG4gICAgbWl4aW5EaXNhYmxlZFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cbmltcG9ydCB7IE1jVGFiIH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1jVGFiTGFiZWxXcmFwcGVyLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjbGFzcyBNY1RhYkxhYmVsV3JhcHBlckJhc2Uge31cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jVGFiTGFiZWxXcmFwcGVyTWl4aW5CYXNlOiBDYW5EaXNhYmxlQ3RvciAmXG4gICAgdHlwZW9mIE1jVGFiTGFiZWxXcmFwcGVyQmFzZSA9IG1peGluRGlzYWJsZWQoTWNUYWJMYWJlbFdyYXBwZXJCYXNlKTtcblxuLyoqXG4gKiBVc2VkIGluIHRoZSBgbWMtdGFiLWdyb3VwYCB2aWV3IHRvIGRpc3BsYXkgdGFiIGxhYmVscy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUYWJMYWJlbFdyYXBwZXJdJyxcbiAgICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jVGFiTGFiZWxXcmFwcGVyIGV4dGVuZHMgTWNUYWJMYWJlbFdyYXBwZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBBZnRlclZpZXdJbml0IHtcbiAgICBAQ29udGVudENoaWxkKCdsYWJlbENvbnRlbnQnKSBsYWJlbENvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSB0YWI6IE1jVGFiO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NNb2RpZmllckZvckljb25zKEFycmF5LmZyb20odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1jLWljb24nKSkpO1xuICAgIH1cblxuICAgIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSB3cmFwcGVyIGVsZW1lbnQgKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRPZmZzZXRMZWZ0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xuICAgIH1cblxuICAgIGdldE9mZnNldFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBjaGVja092ZXJmbG93KCkge1xuICAgICAgICB0aGlzLnRhYi5vdmVyZmxvd1Rvb2x0aXBUaXRsZSA9IHRoaXMuaXNPdmVyZmxvd24oKSA/IHRoaXMuZ2V0SW5uZXJUZXh0KCkgOiAnJztcbiAgICB9XG5cbiAgICBpc092ZXJmbG93bigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxDb250ZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGggPiB0aGlzLmxhYmVsQ29udGVudC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIH1cblxuICAgIGdldElubmVyVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxDb250ZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2xhc3NNb2RpZmllckZvckljb25zKGljb25zOiBIVE1MRWxlbWVudFtdKSB7XG4gICAgICAgIGNvbnN0IHR3b0ljb25zID0gMjtcbiAgICAgICAgY29uc3QgW2ZpcnN0SWNvbkVsZW1lbnQsIHNlY29uZEljb25FbGVtZW50XSA9IGljb25zO1xuXG4gICAgICAgIGlmIChpY29ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IENPTU1FTlRfTk9ERSA9IDg7XG5cbiAgICAgICAgICAgIGlmIChmaXJzdEljb25FbGVtZW50Lm5leHRTaWJsaW5nICYmIGZpcnN0SWNvbkVsZW1lbnQubmV4dFNpYmxpbmcubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fbGVmdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmlyc3RJY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcgJiYgZmlyc3RJY29uRWxlbWVudC5wcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZmlyc3RJY29uRWxlbWVudCwgJ21jLWljb25fcmlnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpY29ucy5sZW5ndGggPT09IHR3b0ljb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGZpcnN0SWNvbkVsZW1lbnQsICdtYy1pY29uX2xlZnQnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc2Vjb25kSWNvbkVsZW1lbnQsICdtYy1pY29uX3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
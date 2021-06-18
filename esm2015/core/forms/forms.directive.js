import { ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';
export class McFormElement {
    constructor(element) {
        this.element = element;
        this.margin = false;
        this.isRow = false;
        this.isFieldSet = false;
        this.hasLegend = false;
        this.isHorizontal = false;
    }
    ngAfterContentInit() {
        const classList = this.element.nativeElement.classList;
        this.isRow = classList.contains('mc-form__row');
        this.isHorizontal = classList.contains('mc-horizontal');
        this.isFieldSet = classList.contains('mc-form__fieldset');
        if (this.isFieldSet && this.element.nativeElement.firstElementChild) {
            this.hasLegend = this.element.nativeElement.firstElementChild.classList.contains('mc-form__legend');
        }
    }
}
McFormElement.decorators = [
    { type: Directive, args: [{
                selector: '.mc-form__row, .mc-form__fieldset, .mc-form__legend',
                exportAs: 'mcFormElement',
                host: {
                    '[class.mc-form-row_margin]': 'margin'
                }
            },] }
];
/** @nocollapse */
McFormElement.ctorParameters = () => [
    { type: ElementRef }
];
McFormElement.propDecorators = {
    elements: [{ type: ContentChildren, args: [McFormElement,] }]
};
export class McForm {
    ngAfterContentInit() {
        this.handleElements(this.elements);
    }
    handleElements(elements) {
        elements.forEach((element, index) => {
            const nextElement = elements.get(index + 1);
            if (element.isFieldSet && !element.isHorizontal) {
                this.handleElements(element.elements);
            }
            element.margin = !!(nextElement && !nextElement.hasLegend);
        });
    }
}
McForm.decorators = [
    { type: Directive, args: [{
                selector: '.mc-form-vertical, .mc-form-horizontal',
                exportAs: 'mcForm',
                host: {
                    class: 'mc-form'
                }
            },] }
];
McForm.propDecorators = {
    elements: [{ type: ContentChildren, args: [McFormElement,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvZm9ybXMvZm9ybXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFSCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFVdkIsTUFBTSxPQUFPLGFBQWE7SUFVdEIsWUFBNkIsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFUN0QsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFJMkMsQ0FBQztJQUVqRSxrQkFBa0I7UUFDZCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFFdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUUxRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUU7WUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDdkc7SUFDTCxDQUFDOzs7WUE5QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxREFBcUQ7Z0JBQy9ELFFBQVEsRUFBRSxlQUFlO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0YsNEJBQTRCLEVBQUUsUUFBUTtpQkFDekM7YUFDSjs7OztZQVhHLFVBQVU7Ozt1QkFvQlQsZUFBZSxTQUFDLGFBQWE7O0FBMEJsQyxNQUFNLE9BQU8sTUFBTTtJQUdmLGtCQUFrQjtRQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBa0M7UUFDN0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoQyxNQUFNLFdBQVcsR0FBOEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFdkUsSUFBSSxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQXhCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdDQUF3QztnQkFDbEQsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsU0FBUztpQkFDbkI7YUFDSjs7O3VCQUVJLGVBQWUsU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBRdWVyeUxpc3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICcubWMtZm9ybV9fcm93LCAubWMtZm9ybV9fZmllbGRzZXQsIC5tYy1mb3JtX19sZWdlbmQnLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtRWxlbWVudCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm1jLWZvcm0tcm93X21hcmdpbl0nOiAnbWFyZ2luJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIG1hcmdpbiA9IGZhbHNlO1xuXG4gICAgaXNSb3cgPSBmYWxzZTtcbiAgICBpc0ZpZWxkU2V0ID0gZmFsc2U7XG4gICAgaGFzTGVnZW5kID0gZmFsc2U7XG4gICAgaXNIb3Jpem9udGFsID0gZmFsc2U7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jRm9ybUVsZW1lbnQpIGVsZW1lbnRzOiBRdWVyeUxpc3Q8TWNGb3JtRWxlbWVudD47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3Q7XG5cbiAgICAgICAgdGhpcy5pc1JvdyA9IGNsYXNzTGlzdC5jb250YWlucygnbWMtZm9ybV9fcm93Jyk7XG4gICAgICAgIHRoaXMuaXNIb3Jpem9udGFsID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdtYy1ob3Jpem9udGFsJyk7XG5cbiAgICAgICAgdGhpcy5pc0ZpZWxkU2V0ID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdtYy1mb3JtX19maWVsZHNldCcpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRTZXQgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzTGVnZW5kID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYy1mb3JtX19sZWdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJy5tYy1mb3JtLXZlcnRpY2FsLCAubWMtZm9ybS1ob3Jpem9udGFsJyxcbiAgICBleHBvcnRBczogJ21jRm9ybScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWZvcm0nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0Zvcm0gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBAQ29udGVudENoaWxkcmVuKE1jRm9ybUVsZW1lbnQpIGVsZW1lbnRzOiBRdWVyeUxpc3Q8TWNGb3JtRWxlbWVudD47XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGFuZGxlRWxlbWVudHModGhpcy5lbGVtZW50cyk7XG4gICAgfVxuXG4gICAgaGFuZGxlRWxlbWVudHMoZWxlbWVudHM6IFF1ZXJ5TGlzdDxNY0Zvcm1FbGVtZW50Pik6IHZvaWQge1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQ6IE1jRm9ybUVsZW1lbnQgfCB1bmRlZmluZWQgPSBlbGVtZW50cy5nZXQoaW5kZXggKyAxKTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaXNGaWVsZFNldCAmJiAhZWxlbWVudC5pc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVsZW1lbnRzKGVsZW1lbnQuZWxlbWVudHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50Lm1hcmdpbiA9ICEhKG5leHRFbGVtZW50ICYmICFuZXh0RWxlbWVudC5oYXNMZWdlbmQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=
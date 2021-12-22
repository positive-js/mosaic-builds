import { ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';
import * as i0 from "@angular/core";
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
/** @nocollapse */ /** @nocollapse */ McFormElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McFormElement, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McFormElement.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McFormElement, selector: ".mc-form__row, .mc-form__fieldset, .mc-form__legend", host: { properties: { "class.mc-form-row_margin": "margin" } }, queries: [{ propertyName: "elements", predicate: McFormElement }], exportAs: ["mcFormElement"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McFormElement, decorators: [{
            type: Directive,
            args: [{
                    selector: '.mc-form__row, .mc-form__fieldset, .mc-form__legend',
                    exportAs: 'mcFormElement',
                    host: {
                        '[class.mc-form-row_margin]': 'margin'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { elements: [{
                type: ContentChildren,
                args: [McFormElement]
            }] } });
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
/** @nocollapse */ /** @nocollapse */ McForm.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McForm, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McForm.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McForm, selector: ".mc-form-vertical, .mc-form-horizontal", host: { classAttribute: "mc-form" }, queries: [{ propertyName: "elements", predicate: McFormElement }], exportAs: ["mcForm"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McForm, decorators: [{
            type: Directive,
            args: [{
                    selector: '.mc-form-vertical, .mc-form-horizontal',
                    exportAs: 'mcForm',
                    host: {
                        class: 'mc-form'
                    }
                }]
        }], propDecorators: { elements: [{
                type: ContentChildren,
                args: [McFormElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvZm9ybXMvZm9ybXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFSCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7O0FBVXZCLE1BQU0sT0FBTyxhQUFhO0lBVXRCLFlBQTZCLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBVDdELFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBSTJDLENBQUM7SUFFakUsa0JBQWtCO1FBQ2QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBRXZELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFMUQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFO1lBQ2pFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3ZHO0lBQ0wsQ0FBQzs7Z0pBdkJRLGFBQWE7b0lBQWIsYUFBYSxvTEFRTCxhQUFhOzJGQVJyQixhQUFhO2tCQVB6QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxREFBcUQ7b0JBQy9ELFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0YsNEJBQTRCLEVBQUUsUUFBUTtxQkFDekM7aUJBQ0o7aUdBU21DLFFBQVE7c0JBQXZDLGVBQWU7dUJBQUMsYUFBYTs7QUEwQmxDLE1BQU0sT0FBTyxNQUFNO0lBR2Ysa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGNBQWMsQ0FBQyxRQUFrQztRQUM3QyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hDLE1BQU0sV0FBVyxHQUE4QixRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV2RSxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6QztZQUVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7eUlBakJRLE1BQU07NkhBQU4sTUFBTSw0SUFDRSxhQUFhOzJGQURyQixNQUFNO2tCQVBsQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSx3Q0FBd0M7b0JBQ2xELFFBQVEsRUFBRSxRQUFRO29CQUNsQixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLFNBQVM7cUJBQ25CO2lCQUNKOzhCQUVtQyxRQUFRO3NCQUF2QyxlQUFlO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJy5tYy1mb3JtX19yb3csIC5tYy1mb3JtX19maWVsZHNldCwgLm1jLWZvcm1fX2xlZ2VuZCcsXG4gICAgZXhwb3J0QXM6ICdtY0Zvcm1FbGVtZW50JyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubWMtZm9ybS1yb3dfbWFyZ2luXSc6ICdtYXJnaW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY0Zvcm1FbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgbWFyZ2luID0gZmFsc2U7XG5cbiAgICBpc1JvdyA9IGZhbHNlO1xuICAgIGlzRmllbGRTZXQgPSBmYWxzZTtcbiAgICBoYXNMZWdlbmQgPSBmYWxzZTtcbiAgICBpc0hvcml6b250YWwgPSBmYWxzZTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNGb3JtRWxlbWVudCkgZWxlbWVudHM6IFF1ZXJ5TGlzdDxNY0Zvcm1FbGVtZW50PjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcblxuICAgICAgICB0aGlzLmlzUm93ID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdtYy1mb3JtX19yb3cnKTtcbiAgICAgICAgdGhpcy5pc0hvcml6b250YWwgPSBjbGFzc0xpc3QuY29udGFpbnMoJ21jLWhvcml6b250YWwnKTtcblxuICAgICAgICB0aGlzLmlzRmllbGRTZXQgPSBjbGFzc0xpc3QuY29udGFpbnMoJ21jLWZvcm1fX2ZpZWxkc2V0Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZFNldCAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5oYXNMZWdlbmQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoJ21jLWZvcm1fX2xlZ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnLm1jLWZvcm0tdmVydGljYWwsIC5tYy1mb3JtLWhvcml6b250YWwnLFxuICAgIGV4cG9ydEFzOiAnbWNGb3JtJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtZm9ybSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNGb3JtRWxlbWVudCkgZWxlbWVudHM6IFF1ZXJ5TGlzdDxNY0Zvcm1FbGVtZW50PjtcblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oYW5kbGVFbGVtZW50cyh0aGlzLmVsZW1lbnRzKTtcbiAgICB9XG5cbiAgICBoYW5kbGVFbGVtZW50cyhlbGVtZW50czogUXVlcnlMaXN0PE1jRm9ybUVsZW1lbnQ+KTogdm9pZCB7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RWxlbWVudDogTWNGb3JtRWxlbWVudCB8IHVuZGVmaW5lZCA9IGVsZW1lbnRzLmdldChpbmRleCArIDEpO1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5pc0ZpZWxkU2V0ICYmICFlbGVtZW50LmlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRWxlbWVudHMoZWxlbWVudC5lbGVtZW50cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQubWFyZ2luID0gISEobmV4dEVsZW1lbnQgJiYgIW5leHRFbGVtZW50Lmhhc0xlZ2VuZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
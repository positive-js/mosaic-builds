import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
export const MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValidator),
    multi: true
};
/**
 * A directive which installs the {@link MinValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
export class MinValidator {
    ngOnChanges(changes) {
        if ('min' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    validate(c) {
        return this.validator(c);
    }
    registerOnValidatorChange(fn) {
        this.onChange = fn;
    }
    createValidator() {
        this.validator = Validators.min(parseInt(this.min, 10));
    }
}
/** @nocollapse */ /** @nocollapse */ MinValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MinValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MinValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: MinValidator, selector: "[min][formControlName],[min][formControl],[min][ngModel]", inputs: { min: "min" }, host: { properties: { "attr.min": "min ? min : null" } }, providers: [MIN_VALIDATOR], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MinValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[min][formControlName],[min][formControl],[min][ngModel]',
                    providers: [MIN_VALIDATOR],
                    host: {
                        '[attr.min]': 'min ? min : null'
                    }
                }]
        }], propDecorators: { min: [{
                type: Input
            }] } });
export const MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValidator),
    multi: true
};
/**
 * A directive which installs the {@link MaxValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `min` attribute.
 *
 * @experimental
 */
export class MaxValidator {
    ngOnChanges(changes) {
        if ('max' in changes) {
            this.createValidator();
            if (this.onChange) {
                this.onChange();
            }
        }
    }
    validate(c) {
        return this.validator(c);
    }
    registerOnValidatorChange(fn) {
        this.onChange = fn;
    }
    createValidator() {
        this.validator = Validators.max(parseInt(this.max, 10));
    }
}
/** @nocollapse */ /** @nocollapse */ MaxValidator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MaxValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ MaxValidator.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: MaxValidator, selector: "[max][formControlName],[max][formControl],[max][ngModel]", inputs: { max: "max" }, host: { properties: { "attr.max": "max ? max : null" } }, providers: [MAX_VALIDATOR], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: MaxValidator, decorators: [{
            type: Directive,
            args: [{
                    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
                    providers: [MAX_VALIDATOR],
                    host: {
                        '[attr.max]': 'max ? max : null'
                    }
                }]
        }], propDecorators: { max: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLXZhbGlkYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvaW5wdXQvaW5wdXQtbnVtYmVyLXZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQW1CLGFBQWEsRUFBNEMsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBR3RILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBYTtJQUNuQyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRjs7Ozs7R0FLRztBQVFILE1BQU0sT0FBTyxZQUFZO0lBTXJCLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRXZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFBRTtTQUMxQztJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsQ0FBa0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCx5QkFBeUIsQ0FBQyxFQUFjO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxlQUFlO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQXdCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDOzsrSUF4QlEsWUFBWTttSUFBWixZQUFZLHFLQUxWLENBQUMsYUFBYSxDQUFDOzJGQUtqQixZQUFZO2tCQVB4QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwwREFBMEQ7b0JBQ3BFLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDMUIsSUFBSSxFQUFFO3dCQUNGLFlBQVksRUFBRSxrQkFBa0I7cUJBQ25DO2lCQUNKOzhCQUdZLEdBQUc7c0JBQVgsS0FBSzs7QUEwQlYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFhO0lBQ25DLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQzNDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGOzs7OztHQUtHO0FBUUgsTUFBTSxPQUFPLFlBQVk7SUFPckIsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUFFO1NBQzFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFrQjtRQUN2QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHlCQUF5QixDQUFDLEVBQWM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLGVBQWU7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7OytJQXpCUSxZQUFZO21JQUFaLFlBQVkscUtBTFYsQ0FBQyxhQUFhLENBQUM7MkZBS2pCLFlBQVk7a0JBUHhCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDBEQUEwRDtvQkFDcEUsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUMxQixJQUFJLEVBQUU7d0JBQ0YsWUFBWSxFQUFFLGtCQUFrQjtxQkFDbkM7aUJBQ0o7OEJBSVksR0FBRztzQkFBWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBQcm92aWRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbmV4cG9ydCBjb25zdCBNSU5fVkFMSURBVE9SOiBQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1pblZhbGlkYXRvciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgd2hpY2ggaW5zdGFsbHMgdGhlIHtAbGluayBNaW5WYWxpZGF0b3J9IGZvciBhbnkgYGZvcm1Db250cm9sTmFtZWAsXG4gKiBgZm9ybUNvbnRyb2xgLCBvciBjb250cm9sIHdpdGggYG5nTW9kZWxgIHRoYXQgYWxzbyBoYXMgYSBgbWluYCBhdHRyaWJ1dGUuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttaW5dW2Zvcm1Db250cm9sTmFtZV0sW21pbl1bZm9ybUNvbnRyb2xdLFttaW5dW25nTW9kZWxdJyxcbiAgICBwcm92aWRlcnM6IFtNSU5fVkFMSURBVE9SXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5taW5dJzogJ21pbiA/IG1pbiA6IG51bGwnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNaW5WYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3IsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm47XG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKCkgPT4gdm9pZDtcblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKCdtaW4nIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7IHRoaXMub25DaGFuZ2UoKTsgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoYyk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVWYWxpZGF0b3IoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5taW4ocGFyc2VJbnQodGhpcy5taW4gYXMgdW5rbm93biBhcyBzdHJpbmcsIDEwKSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBNQVhfVkFMSURBVE9SOiBQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1heFZhbGlkYXRvciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgd2hpY2ggaW5zdGFsbHMgdGhlIHtAbGluayBNYXhWYWxpZGF0b3J9IGZvciBhbnkgYGZvcm1Db250cm9sTmFtZWAsXG4gKiBgZm9ybUNvbnRyb2xgLCBvciBjb250cm9sIHdpdGggYG5nTW9kZWxgIHRoYXQgYWxzbyBoYXMgYSBgbWluYCBhdHRyaWJ1dGUuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYXhdW2Zvcm1Db250cm9sTmFtZV0sW21heF1bZm9ybUNvbnRyb2xdLFttYXhdW25nTW9kZWxdJyxcbiAgICBwcm92aWRlcnM6IFtNQVhfVkFMSURBVE9SXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5tYXhdJzogJ21heCA/IG1heCA6IG51bGwnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNYXhWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3IsXG4gICAgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyIHwgc3RyaW5nO1xuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbjtcbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAoKSA9PiB2b2lkO1xuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoJ21heCcgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVWYWxpZGF0b3IoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHsgdGhpcy5vbkNoYW5nZSgpOyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcihjKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZhbGlkYXRvcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLm1heChwYXJzZUludCh0aGlzLm1heCBhcyB1bmtub3duIGFzIHN0cmluZywgMTApKTtcbiAgICB9XG59XG4iXX0=
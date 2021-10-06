import { FocusMonitor } from '@angular/cdk/a11y';
import { Input, ElementRef, ChangeDetectorRef, Directive, ContentChild } from '@angular/core';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
export class McLinkBase {
}
// tslint:disable-next-line: naming-convention
export const McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
export const baseURLRegex = /^http(s)?:\/\//;
export class McLink extends McLinkMixinBase {
    constructor(elementRef, focusMonitor, changeDetector) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.changeDetector = changeDetector;
        this._disabled = false;
        this._pseudo = false;
        this._noUnderline = false;
        this._useVisited = false;
        this.focusMonitor.monitor(elementRef.nativeElement, true);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.changeDetector.markForCheck();
        }
    }
    get pseudo() {
        return this._pseudo;
    }
    set pseudo(value) {
        this._pseudo = toBoolean(value);
    }
    get noUnderline() {
        return this._noUnderline;
    }
    set noUnderline(value) {
        this._noUnderline = toBoolean(value);
    }
    get useVisited() {
        return this._useVisited;
    }
    set useVisited(value) {
        this._useVisited = toBoolean(value);
    }
    get hasIcon() {
        return !!this.icon;
    }
    get print() {
        var _a;
        return this._print || ((_a = this.getHostElement().href) === null || _a === void 0 ? void 0 : _a.replace(baseURLRegex, ''));
    }
    set print(value) {
        this.printMode = toBoolean(value);
        this._print = value;
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    focus() {
        this.getHostElement().focus();
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
/** @nocollapse */ McLink.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McLink, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McLink.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McLink, selector: "[mc-link]", inputs: { tabIndex: "tabIndex", disabled: "disabled", pseudo: "pseudo", noUnderline: "noUnderline", useVisited: "useVisited", print: "print" }, host: { properties: { "class.mc-link_no-underline": "noUnderline", "class.mc-link_use-visited": "useVisited", "class.mc-link_pseudo": "pseudo", "class.mc-link_print": "printMode", "class.mc-text-only": "!hasIcon", "class.mc-text-with-icon": "hasIcon", "attr.disabled": "disabled || null", "attr.tabindex": "tabIndex", "attr.print": "print" }, classAttribute: "mc-link" }, queries: [{ propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcLink"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McLink, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-link]',
                    exportAs: 'mcLink',
                    inputs: ['tabIndex'],
                    host: {
                        class: 'mc-link',
                        '[class.mc-link_no-underline]': 'noUnderline',
                        '[class.mc-link_use-visited]': 'useVisited',
                        '[class.mc-link_pseudo]': 'pseudo',
                        '[class.mc-link_print]': 'printMode',
                        '[class.mc-text-only]': '!hasIcon',
                        '[class.mc-text-with-icon]': 'hasIcon',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.print]': 'print'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], pseudo: [{
                type: Input
            }], noUnderline: [{
                type: Input
            }], useVisited: [{
                type: Input
            }], print: [{
                type: Input
            }], icon: [{
                type: ContentChild,
                args: [McIcon]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvbGluay9saW5rLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUNILEtBQUssRUFDTCxVQUFVLEVBRVYsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUtILGFBQWEsRUFDYixhQUFhLEVBQ2IsU0FBUyxFQUNaLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7QUFHakQsTUFBTSxPQUFPLFVBQVU7Q0FBRztBQUUxQiw4Q0FBOEM7QUFDOUMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUNKLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUVqRSxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7QUFvQjdDLE1BQU0sT0FBTyxNQUFPLFNBQVEsZUFBZTtJQXVFdkMsWUFDWSxVQUFzQixFQUN0QixZQUEwQixFQUMxQixjQUFpQztRQUV6QyxLQUFLLEVBQUUsQ0FBQztRQUpBLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBM0RyQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBV2xCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFXaEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFXckIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUE4QnhCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQTlF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b250ZW50IjpbImltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIENvbnRlbnRDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FuRGlzYWJsZSxcbiAgICBDYW5EaXNhYmxlQ3RvcixcbiAgICBIYXNUYWJJbmRleCxcbiAgICBIYXNUYWJJbmRleEN0b3IsXG4gICAgbWl4aW5EaXNhYmxlZCxcbiAgICBtaXhpblRhYkluZGV4LFxuICAgIHRvQm9vbGVhblxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cblxuZXhwb3J0IGNsYXNzIE1jTGlua0Jhc2Uge31cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IE1jTGlua01peGluQmFzZTogSGFzVGFiSW5kZXhDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJlxuICAgIHR5cGVvZiBNY0xpbmtCYXNlID0gbWl4aW5UYWJJbmRleChtaXhpbkRpc2FibGVkKE1jTGlua0Jhc2UpKTtcblxuZXhwb3J0IGNvbnN0IGJhc2VVUkxSZWdleCA9IC9eaHR0cChzKT86XFwvXFwvLztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWMtbGlua10nLFxuICAgIGV4cG9ydEFzOiAnbWNMaW5rJyxcbiAgICBpbnB1dHM6IFsndGFiSW5kZXgnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtbGluaycsXG4gICAgICAgICdbY2xhc3MubWMtbGlua19uby11bmRlcmxpbmVdJzogJ25vVW5kZXJsaW5lJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1saW5rX3VzZS12aXNpdGVkXSc6ICd1c2VWaXNpdGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1saW5rX3BzZXVkb10nOiAncHNldWRvJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1saW5rX3ByaW50XSc6ICdwcmludE1vZGUnLFxuICAgICAgICAnW2NsYXNzLm1jLXRleHQtb25seV0nOiAnIWhhc0ljb24nLFxuICAgICAgICAnW2NsYXNzLm1jLXRleHQtd2l0aC1pY29uXSc6ICdoYXNJY29uJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICdbYXR0ci5wcmludF0nOiAncHJpbnQnXG4gICAgfVxufSlcblxuZXhwb3J0IGNsYXNzIE1jTGluayBleHRlbmRzIE1jTGlua01peGluQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgSGFzVGFiSW5kZXgsIENhbkRpc2FibGUge1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBzZXVkbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BzZXVkbztcbiAgICB9XG5cbiAgICBzZXQgcHNldWRvKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fcHNldWRvID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wc2V1ZG8gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG5vVW5kZXJsaW5lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9VbmRlcmxpbmU7XG4gICAgfVxuXG4gICAgc2V0IG5vVW5kZXJsaW5lKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbm9VbmRlcmxpbmUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX25vVW5kZXJsaW5lID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB1c2VWaXNpdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlVmlzaXRlZDtcbiAgICB9XG5cbiAgICBzZXQgdXNlVmlzaXRlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3VzZVZpc2l0ZWQgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VzZVZpc2l0ZWQgPSBmYWxzZTtcblxuICAgIGdldCBoYXNJY29uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmljb247XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgcHJpbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmludCB8fCB0aGlzLmdldEhvc3RFbGVtZW50KCkuaHJlZj8ucmVwbGFjZShiYXNlVVJMUmVnZXgsICcnKTtcbiAgICB9XG5cbiAgICBzZXQgcHJpbnQodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnByaW50TW9kZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fcHJpbnQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmludDogc3RyaW5nO1xuXG4gICAgcHJpbnRNb2RlOiBib29sZWFuO1xuXG4gICAgQENvbnRlbnRDaGlsZChNY0ljb24pIGljb246IE1jSWNvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxufVxuIl19
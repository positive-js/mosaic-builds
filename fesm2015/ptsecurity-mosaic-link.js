import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { mixinTabIndex, mixinDisabled, toBoolean } from '@ptsecurity/mosaic/core';

class McLinkBase {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
// tslint:disable-next-line: naming-convention
const McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
class McLink extends McLinkMixinBase {
    constructor(elementRef, focusMonitor, changeDetector) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.changeDetector = changeDetector;
        this._disabled = false;
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
McLink.decorators = [
    { type: Directive, args: [{
                selector: 'a.mc-link',
                exportAs: 'mcLink',
                inputs: ['tabIndex'],
                host: {
                    '[attr.disabled]': 'disabled || null',
                    '[attr.tabindex]': 'tabIndex'
                }
            },] }
];
/** @nocollapse */
McLink.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef }
];
McLink.propDecorators = {
    disabled: [{ type: Input }]
};

class McLinkModule {
}
McLinkModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule
                ],
                declarations: [McLink],
                exports: [McLink]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McLink, McLinkBase, McLinkMixinBase, McLinkModule };
//# sourceMappingURL=ptsecurity-mosaic-link.js.map

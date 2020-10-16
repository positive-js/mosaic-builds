import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { mixinTabIndex, mixinDisabled, toBoolean } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * Generated from: link.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McLinkBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
if (false) {
    /** @type {?} */
    McLinkBase.prototype.elementRef;
}
// tslint:disable-next-line: naming-convention
/** @type {?} */
const McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
class McLink extends McLinkMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} focusMonitor
     * @param {?} changeDetector
     */
    constructor(elementRef, focusMonitor, changeDetector) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.changeDetector = changeDetector;
        this._disabled = false;
        this.focusMonitor.monitor(elementRef.nativeElement, true);
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.changeDetector.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    focus() {
        this.getHostElement().focus();
    }
    /**
     * @return {?}
     */
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    McLink.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McLink.prototype.focusMonitor;
    /**
     * @type {?}
     * @private
     */
    McLink.prototype.changeDetector;
}

/**
 * @fileoverview added by tsickle
 * Generated from: link.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-link.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McLink, McLinkBase, McLinkMixinBase, McLinkModule };
//# sourceMappingURL=ptsecurity-mosaic-link.js.map

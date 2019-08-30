/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Input, ElementRef, ChangeDetectorRef, Directive, Attribute, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McLinkBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
/** @type {?} */
const _McLinkBase = mixinTabIndex(mixinDisabled(McLinkBase));
class McLink extends _McLinkBase {
    /**
     * @param {?} elementRef
     * @param {?} focusMonitor
     * @param {?} changeDetector
     * @param {?} tabIndex
     */
    constructor(elementRef, focusMonitor, changeDetector, tabIndex) {
        super(elementRef);
        this.focusMonitor = focusMonitor;
        this.changeDetector = changeDetector;
        this._disabled = false;
        this.tabIndex = parseInt(tabIndex) || 0;
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
                inputs: ['disabled'],
                host: {
                    '[attr.disabled]': 'disabled || null',
                    '[attr.tabindex]': 'tabIndex'
                }
            },] },
];
/** @nocollapse */
McLink.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
];
McLink.propDecorators = {
    disabled: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McLinkModule, McLinkBase, _McLinkBase, McLink };
//# sourceMappingURL=link.js.map

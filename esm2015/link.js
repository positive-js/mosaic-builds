/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { Input, Attribute, Component, ElementRef, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McLinkBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
/** @type {?} */
const _McLinkBase = mixinTabIndex(mixinDisabled(McLinkBase));
class McLink extends _McLinkBase {
    /**
     * @param {?} tabIndex
     * @param {?} elementRef
     * @param {?} _focusMonitor
     * @param {?} _changeDetector
     */
    constructor(tabIndex, elementRef, _focusMonitor, _changeDetector) {
        super(elementRef);
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
        this._changeDetector = _changeDetector;
        this._disabled = false;
        this._focusMonitor.monitor(elementRef.nativeElement, true);
        this.tabIndex = parseInt(tabIndex) || 0;
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
            this._changeDetector.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    focus() {
        this._getHostElement().focus();
    }
    /**
     * @return {?}
     */
    _getHostElement() {
        return this.elementRef.nativeElement;
    }
}
McLink.decorators = [
    { type: Component, args: [{
                selector: 'a.mc-link',
                template: `<ng-content></ng-content>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mcLink',
                styles: [".mc-link{display:inline-block;outline:0;padding:4px 8px;text-decoration:none;cursor:pointer}.mc-link>.mc-link__icon{color:inherit}.mc-link>.mc-link__text:not(:first-child){margin-left:4px}.mc-link>.mc-link__text:not(:last-child){margin-right:4px}.mc-link.cdk-keyboard-focused{border-radius:3px}.mc-link[disabled]{pointer-events:none;cursor:default}"],
                inputs: ['disabled'],
                host: {
                    '[attr.disabled]': 'disabled || null',
                    '[attr.tabindex]': 'tabIndex'
                }
            },] },
];
/** @nocollapse */
McLink.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef }
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

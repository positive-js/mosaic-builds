import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, Output, NgModule } from '@angular/core';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';

/**
 * @fileoverview added by tsickle
 * Generated from: card.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McCardBase {
    // tslint:disable-next-line:naming-convention
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    McCardBase.prototype._elementRef;
}
// tslint:disable-next-line:naming-convention
/** @type {?} */
const McCardBaseMixin = mixinColor(McCardBase);
class McCard extends McCardBaseMixin {
    /**
     * @param {?} elementRef
     * @param {?} _focusMonitor
     */
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this._focusMonitor = _focusMonitor;
        this.readonly = false;
        this.selected = false;
        this.selectedChange = new EventEmitter();
        this._tabIndex = 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, false);
    }
    /**
     * @return {?}
     */
    get tabIndex() {
        return this.readonly ? null : this._tabIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        this._tabIndex = value;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    focus() {
        this.hostElement.focus();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClick($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onKeyDown($event) {
        // tslint:disable-next-line:deprecation
        switch ($event.keyCode) {
            case SPACE:
                if (!this.readonly) {
                    $event.preventDefault();
                    this.selectedChange.emit(!this.selected);
                }
                break;
            default:
        }
    }
    /**
     * @private
     * @return {?}
     */
    get hostElement() {
        return this._elementRef.nativeElement;
    }
}
McCard.decorators = [
    { type: Component, args: [{
                selector: 'mc-card',
                template: "<ng-content></ng-content>\n<div class=\"mc-card__overlay\"></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                host: {
                    class: 'mc-card',
                    '[class.mc-card_readonly]': 'readonly',
                    '[class.mc-selected]': 'selected',
                    '[attr.tabindex]': 'tabIndex',
                    '(keydown)': 'onKeyDown($event)',
                    '(click)': 'onClick($event)'
                },
                styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left:4px solid transparent}.mc-card:focus{outline:0}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:0 0}.mc-card.mc-card_readonly{cursor:auto}"]
            }] }
];
/** @nocollapse */
McCard.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McCard.propDecorators = {
    readonly: [{ type: Input }],
    selected: [{ type: Input }],
    selectedChange: [{ type: Output }],
    tabIndex: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    McCard.prototype.readonly;
    /** @type {?} */
    McCard.prototype.selected;
    /** @type {?} */
    McCard.prototype.selectedChange;
    /**
     * @type {?}
     * @private
     */
    McCard.prototype._tabIndex;
    /**
     * @type {?}
     * @private
     */
    McCard.prototype._focusMonitor;
}

/**
 * @fileoverview added by tsickle
 * Generated from: card.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McCardModule {
}
McCardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule
                ],
                exports: [McCard],
                declarations: [McCard]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ptsecurity-mosaic-card.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { McCard, McCardBase, McCardBaseMixin, McCardModule };
//# sourceMappingURL=ptsecurity-mosaic-card.js.map

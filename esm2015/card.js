/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, HostBinding, Input, Output, NgModule } from '@angular/core';
import { SPACE } from '@ptsecurity/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class McCard {
    /**
     * @param {?} _elementRef
     * @param {?} _focusMonitor
     */
    constructor(_elementRef, _focusMonitor) {
        this._elementRef = _elementRef;
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
     * @private
     * @return {?}
     */
    get hostElement() {
        return this._elementRef.nativeElement;
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
        }
    }
}
McCard.decorators = [
    { type: Component, args: [{
                selector: 'mc-card',
                template: "<ng-content></ng-content><div class=\"mc-card__overlay\"></div>",
                styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left-width:4px;border-left-style:solid;border-left-color:transparent}.mc-card:focus{outline:0}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:0 0}.mc-card.mc-card_readonly{cursor:auto}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: ['color'],
                host: {
                    class: 'mc-card',
                    '[class.mc-card_readonly]': 'readonly',
                    '[class.mc-card_selected]': 'selected',
                    '(keydown)': 'onKeyDown($event)',
                    '(click)': 'onClick($event)'
                }
            },] },
];
/** @nocollapse */
McCard.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor }
];
McCard.propDecorators = {
    tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }, { type: Input }],
    readonly: [{ type: Input }],
    selected: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] },
];

export { McCard, McCardModule };
//# sourceMappingURL=card.js.map

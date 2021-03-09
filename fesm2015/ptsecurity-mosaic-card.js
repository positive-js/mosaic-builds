import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input, Output, NgModule } from '@angular/core';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { mixinColor } from '@ptsecurity/mosaic/core';

class McCardBase {
    // tslint:disable-next-line:naming-convention
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
// tslint:disable-next-line:naming-convention
const McCardBaseMixin = mixinColor(McCardBase);
class McCard extends McCardBaseMixin {
    constructor(elementRef, _focusMonitor) {
        super(elementRef);
        this._focusMonitor = _focusMonitor;
        this.readonly = false;
        this.selected = false;
        this.selectedChange = new EventEmitter();
        this._tabIndex = 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, false);
    }
    get tabIndex() {
        return this.readonly ? null : this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value;
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    focus() {
        this.hostElement.focus();
    }
    onClick($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    }
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
                styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left:var(--mc-card-size-vertical-line,4px) solid transparent}.mc-card:focus{outline:none}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:transparent}.mc-card.mc-card_readonly{cursor:auto}"]
            },] }
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
 * Generated bundle index. Do not edit.
 */

export { McCard, McCardBase, McCardBaseMixin, McCardModule };
//# sourceMappingURL=ptsecurity-mosaic-card.js.map

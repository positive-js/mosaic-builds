/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata } from 'tslib';
import { Output, ChangeDetectionStrategy, Component, ElementRef, Input, EventEmitter, ViewEncapsulation, HostBinding, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { SPACE } from '@ptsecurity/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@ptsecurity/cdk/platform';

let McCard = class McCard {
    constructor(_elementRef, _focusMonitor) {
        this._elementRef = _elementRef;
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
    get hostElement() {
        return this._elementRef.nativeElement;
    }
    onKeyDown($event) {
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
};
__decorate([
    HostBinding('attr.tabIndex'),
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], McCard.prototype, "tabIndex", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], McCard.prototype, "readonly", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], McCard.prototype, "selected", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], McCard.prototype, "selectedChange", void 0);
McCard = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [ElementRef, FocusMonitor])
], McCard);

let McCardModule = class McCardModule {
};
McCardModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            A11yModule,
            PlatformModule
        ],
        exports: [McCard],
        declarations: [McCard]
    })
], McCardModule);

/**
 * Generated bundle index. Do not edit.
 */

export { McCardModule, McCard };
//# sourceMappingURL=card.js.map

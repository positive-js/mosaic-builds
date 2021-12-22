import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, NgModule } from '@angular/core';
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
/** @nocollapse */ /** @nocollapse */ McCard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McCard, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McCard.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McCard, selector: "mc-card", inputs: { color: "color", readonly: "readonly", selected: "selected", tabIndex: "tabIndex" }, outputs: { selectedChange: "selectedChange" }, host: { listeners: { "keydown": "onKeyDown($event)", "click": "onClick($event)" }, properties: { "class.mc-card_readonly": "readonly", "class.mc-selected": "selected", "attr.tabindex": "tabIndex" }, classAttribute: "mc-card" }, usesInheritance: true, ngImport: i0, template: "<ng-content></ng-content>\n<div class=\"mc-card__overlay\"></div>\n", styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left-width:4px;border-left-width:var(--mc-card-size-vertical-line, 4px);border-left-style:solid;border-left-color:transparent}.mc-card:focus{outline:none}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:transparent}.mc-card.mc-card_readonly{cursor:auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McCard, decorators: [{
            type: Component,
            args: [{ selector: 'mc-card', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, inputs: ['color'], host: {
                        class: 'mc-card',
                        '[class.mc-card_readonly]': 'readonly',
                        '[class.mc-selected]': 'selected',
                        '[attr.tabindex]': 'tabIndex',
                        '(keydown)': 'onKeyDown($event)',
                        '(click)': 'onClick($event)'
                    }, template: "<ng-content></ng-content>\n<div class=\"mc-card__overlay\"></div>\n", styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer;border-left-width:4px;border-left-width:var(--mc-card-size-vertical-line, 4px);border-left-style:solid;border-left-color:transparent}.mc-card:focus{outline:none}.mc-card .mc-card__overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;background:transparent}.mc-card.mc-card_readonly{cursor:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }]; }, propDecorators: { readonly: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], tabIndex: [{
                type: Input
            }] } });

class McCardModule {
}
/** @nocollapse */ /** @nocollapse */ McCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McCardModule, declarations: [McCard], imports: [CommonModule,
        A11yModule,
        PlatformModule], exports: [McCard] });
/** @nocollapse */ /** @nocollapse */ McCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McCardModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [McCard],
                    declarations: [McCard]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McCard, McCardBase, McCardBaseMixin, McCardModule };
//# sourceMappingURL=ptsecurity-mosaic-card.mjs.map

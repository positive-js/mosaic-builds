import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class McDivider {
    constructor() {
        this._vertical = false;
        this._inset = false;
    }
    // Whether the divider is vertically aligned.
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    // Whether the divider is an inset divider.
    get inset() {
        return this._inset;
    }
    set inset(value) {
        this._inset = coerceBooleanProperty(value);
    }
}
/** @nocollapse */ McDivider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDivider, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McDivider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McDivider, selector: "mc-divider", inputs: { vertical: "vertical", inset: "inset" }, host: { properties: { "class.mc-divider_vertical": "vertical", "class.mc-divider_horizontal": "!vertical", "class.mc-divider_inset": "inset" }, classAttribute: "mc-divider" }, ngImport: i0, template: '', isInline: true, styles: [".mc-divider{display:block;margin:0}.mc-divider.mc-divider_horizontal{border-top-width:1px;border-top-width:var(--mc-divider-size-width, 1px);border-top-style:solid}.mc-divider.mc-divider_vertical{height:100%;border-right-width:1px;border-right-width:var(--mc-divider-size-width, 1px);border-right-style:solid}.mc-divider.mc-divider_inset{margin-left:80px;margin-left:var(--mc-divider-size-inset-margin, 80px)}[dir=rtl] .mc-divider.mc-divider_inset{margin-left:auto;margin-right:80px;margin-right:var(--mc-divider-size-inset-margin, 80px)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDivider, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-divider',
                    host: {
                        class: 'mc-divider',
                        '[class.mc-divider_vertical]': 'vertical',
                        '[class.mc-divider_horizontal]': '!vertical',
                        '[class.mc-divider_inset]': 'inset'
                    },
                    template: '',
                    styleUrls: ['divider.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { vertical: [{
                type: Input
            }], inset: [{
                type: Input
            }] } });

class McDividerModule {
}
/** @nocollapse */ McDividerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDividerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McDividerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDividerModule, declarations: [McDivider], imports: [CommonModule], exports: [McDivider] });
/** @nocollapse */ McDividerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDividerModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McDividerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [McDivider],
                    declarations: [McDivider]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McDivider, McDividerModule };
//# sourceMappingURL=ptsecurity-mosaic-divider.js.map

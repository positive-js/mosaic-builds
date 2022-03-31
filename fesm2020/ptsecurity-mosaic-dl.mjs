import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

class McDlComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.minWidth = 400;
        this.wide = false;
        this.vertical = null;
        this.resizeStream = new Subject();
        this.resizeDebounceInterval = 100;
        this.resizeSubscription = Subscription.EMPTY;
        this.updateState = () => {
            const { width } = this.elementRef.nativeElement.getClientRects()[0];
            this.vertical = width <= this.minWidth;
        };
    }
    ngAfterContentInit() {
        if (this.vertical !== null) {
            return;
        }
        this.resizeSubscription = this.resizeStream
            .pipe(debounceTime(this.resizeDebounceInterval))
            .subscribe(this.updateState);
    }
    ngOnDestroy() {
        this.resizeSubscription.unsubscribe();
    }
}
/** @nocollapse */ /** @nocollapse */ McDlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McDlComponent, selector: "mc-dl", inputs: { minWidth: "minWidth", wide: "wide", vertical: "vertical" }, host: { listeners: { "window:resize": "resizeStream.next()" }, properties: { "class.mc-dl_vertical": "vertical", "class.mc-dl_wide": "wide" }, classAttribute: "mc-dl" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mc-dl{display:grid;grid-column-gap:var(--mc-description-list-size-horizontal-column-gap, 16px);column-gap:var(--mc-description-list-size-horizontal-column-gap, 16px);grid-row-gap:var(--mc-description-list-size-horizontal-row-gap, 12px);row-gap:var(--mc-description-list-size-horizontal-row-gap, 12px);grid-template-columns:repeat(4,1fr)}.mc-dl .mc-dt{grid-column:var(--mc-description-list-size-dt-grid-column, 1)}.mc-dl .mc-dd{grid-column:var(--mc-description-list-size-dd-grid-column, 2/span 3)}.mc-dl.mc-dl_wide{grid-template-columns:repeat(2,1fr)}.mc-dl.mc-dl_wide .mc-dt{grid-column:1}.mc-dl.mc-dl_wide .mc-dd{grid-column:2}.mc-dl.mc-dl_vertical{grid-template-columns:repeat(1,1fr);column-gap:var(--mc-description-list-size-vertical-column-gap, 0);row-gap:var(--mc-description-list-size-vertical-row-gap, 2px)}.mc-dl.mc-dl_vertical .mc-dt,.mc-dl.mc-dl_vertical .mc-dd{grid-column:1}.mc-dl.mc-dl_vertical .mc-dd{margin-bottom:var(--mc-description-list-size-vertical-dd-margin-bottom, 16px)}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mc-dl', template: '<ng-content></ng-content>', host: {
                        class: 'mc-dl',
                        '[class.mc-dl_vertical]': 'vertical',
                        '[class.mc-dl_wide]': 'wide',
                        '(window:resize)': 'resizeStream.next()'
                    }, encapsulation: ViewEncapsulation.None, styles: [".mc-dl{display:grid;grid-column-gap:var(--mc-description-list-size-horizontal-column-gap, 16px);column-gap:var(--mc-description-list-size-horizontal-column-gap, 16px);grid-row-gap:var(--mc-description-list-size-horizontal-row-gap, 12px);row-gap:var(--mc-description-list-size-horizontal-row-gap, 12px);grid-template-columns:repeat(4,1fr)}.mc-dl .mc-dt{grid-column:var(--mc-description-list-size-dt-grid-column, 1)}.mc-dl .mc-dd{grid-column:var(--mc-description-list-size-dd-grid-column, 2/span 3)}.mc-dl.mc-dl_wide{grid-template-columns:repeat(2,1fr)}.mc-dl.mc-dl_wide .mc-dt{grid-column:1}.mc-dl.mc-dl_wide .mc-dd{grid-column:2}.mc-dl.mc-dl_vertical{grid-template-columns:repeat(1,1fr);column-gap:var(--mc-description-list-size-vertical-column-gap, 0);row-gap:var(--mc-description-list-size-vertical-row-gap, 2px)}.mc-dl.mc-dl_vertical .mc-dt,.mc-dl.mc-dl_vertical .mc-dd{grid-column:1}.mc-dl.mc-dl_vertical .mc-dd{margin-bottom:var(--mc-description-list-size-vertical-dd-margin-bottom, 16px)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { minWidth: [{
                type: Input
            }], wide: [{
                type: Input
            }], vertical: [{
                type: Input
            }] } });
class McDtComponent {
}
/** @nocollapse */ /** @nocollapse */ McDtComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDtComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDtComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McDtComponent, selector: "mc-dt", host: { classAttribute: "mc-dt" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDtComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-dt',
                    template: '<ng-content></ng-content>',
                    host: {
                        class: 'mc-dt'
                    },
                    encapsulation: ViewEncapsulation.None
                }]
        }] });
class McDdComponent {
}
/** @nocollapse */ /** @nocollapse */ McDdComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McDdComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McDdComponent, selector: "mc-dd", host: { classAttribute: "mc-dd" }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDdComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-dd',
                    template: '<ng-content></ng-content>',
                    host: {
                        class: 'mc-dd'
                    },
                    encapsulation: ViewEncapsulation.None
                }]
        }] });

class McDlModule {
}
/** @nocollapse */ /** @nocollapse */ McDlModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McDlModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlModule, declarations: [McDlComponent,
        McDtComponent,
        McDdComponent], imports: [CommonModule,
        A11yModule,
        PlatformModule], exports: [McDlComponent,
        McDtComponent,
        McDdComponent] });
/** @nocollapse */ /** @nocollapse */ McDlModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McDlModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [
                        McDlComponent,
                        McDtComponent,
                        McDdComponent
                    ],
                    declarations: [
                        McDlComponent,
                        McDtComponent,
                        McDdComponent
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McDdComponent, McDlComponent, McDlModule, McDtComponent };
//# sourceMappingURL=ptsecurity-mosaic-dl.mjs.map

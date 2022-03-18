import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Input, ContentChild, NgModule } from '@angular/core';
import { mixinTabIndex, mixinDisabled, toBoolean } from '@ptsecurity/mosaic/core';
import { McIcon } from '@ptsecurity/mosaic/icon';

class McLinkBase {
}
// tslint:disable-next-line: naming-convention
const McLinkMixinBase = mixinTabIndex(mixinDisabled(McLinkBase));
const baseURLRegex = /^http(s)?:\/\//;
class McLink extends McLinkMixinBase {
    constructor(elementRef, focusMonitor, changeDetector) {
        super();
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.changeDetector = changeDetector;
        this._disabled = false;
        this._pseudo = false;
        this._noUnderline = false;
        this._useVisited = false;
        this.focusMonitor.monitor(elementRef.nativeElement, true);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        const newValue = toBoolean(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this.changeDetector.markForCheck();
        }
    }
    get pseudo() {
        return this._pseudo;
    }
    set pseudo(value) {
        this._pseudo = toBoolean(value);
    }
    get noUnderline() {
        return this._noUnderline;
    }
    set noUnderline(value) {
        this._noUnderline = toBoolean(value);
    }
    get useVisited() {
        return this._useVisited;
    }
    set useVisited(value) {
        this._useVisited = toBoolean(value);
    }
    get hasIcon() {
        return !!this.icon;
    }
    get print() {
        return this._print || this.getHostElement().href?.replace(baseURLRegex, '');
    }
    set print(value) {
        this.printMode = toBoolean(value);
        this._print = value;
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
    focus() {
        this.getHostElement().focus();
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
/** @nocollapse */ /** @nocollapse */ McLink.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McLink, deps: [{ token: i0.ElementRef }, { token: i1.FocusMonitor }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McLink.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McLink, selector: "[mc-link]", inputs: { tabIndex: "tabIndex", disabled: "disabled", pseudo: "pseudo", noUnderline: "noUnderline", useVisited: "useVisited", print: "print" }, host: { properties: { "class.mc-link_no-underline": "noUnderline", "class.mc-link_use-visited": "useVisited", "class.mc-link_pseudo": "pseudo", "class.mc-link_print": "printMode", "class.mc-text-only": "!hasIcon", "class.mc-text-with-icon": "hasIcon", "attr.disabled": "disabled || null", "attr.tabindex": "tabIndex", "attr.print": "print" }, classAttribute: "mc-link" }, queries: [{ propertyName: "icon", first: true, predicate: McIcon, descendants: true }], exportAs: ["mcLink"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McLink, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mc-link]',
                    exportAs: 'mcLink',
                    inputs: ['tabIndex'],
                    host: {
                        class: 'mc-link',
                        '[class.mc-link_no-underline]': 'noUnderline',
                        '[class.mc-link_use-visited]': 'useVisited',
                        '[class.mc-link_pseudo]': 'pseudo',
                        '[class.mc-link_print]': 'printMode',
                        '[class.mc-text-only]': '!hasIcon',
                        '[class.mc-text-with-icon]': 'hasIcon',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.print]': 'print'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusMonitor }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], pseudo: [{
                type: Input
            }], noUnderline: [{
                type: Input
            }], useVisited: [{
                type: Input
            }], print: [{
                type: Input
            }], icon: [{
                type: ContentChild,
                args: [McIcon]
            }] } });

class McLinkModule {
}
/** @nocollapse */ /** @nocollapse */ McLinkModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McLinkModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McLinkModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McLinkModule, declarations: [McLink], imports: [CommonModule,
        A11yModule], exports: [McLink] });
/** @nocollapse */ /** @nocollapse */ McLinkModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McLinkModule, imports: [[
            CommonModule,
            A11yModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McLinkModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule
                    ],
                    declarations: [McLink],
                    exports: [McLink]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McLink, McLinkBase, McLinkMixinBase, McLinkModule, baseURLRegex };
//# sourceMappingURL=ptsecurity-mosaic-link.mjs.map

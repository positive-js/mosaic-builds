import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, ChangeDetectorRef, Input, ContentChild, NgModule } from '@angular/core';
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
        var _a;
        return this._print || ((_a = this.getHostElement().href) === null || _a === void 0 ? void 0 : _a.replace(baseURLRegex, ''));
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
McLink.decorators = [
    { type: Directive, args: [{
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
            },] }
];
/** @nocollapse */
McLink.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef }
];
McLink.propDecorators = {
    disabled: [{ type: Input }],
    pseudo: [{ type: Input }],
    noUnderline: [{ type: Input }],
    useVisited: [{ type: Input }],
    print: [{ type: Input }],
    icon: [{ type: ContentChild, args: [McIcon,] }]
};

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
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McLink, McLinkBase, McLinkMixinBase, McLinkModule, baseURLRegex };
//# sourceMappingURL=ptsecurity-mosaic-link.js.map

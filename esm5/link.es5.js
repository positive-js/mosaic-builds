/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __metadata } from 'tslib';
import { Component, ElementRef, ViewEncapsulation, NgModule } from '@angular/core';
import { FocusMonitor, A11yModule } from '@ptsecurity/cdk/a11y';
import { CommonModule } from '@angular/common';

var McLink = /** @class */ (function () {
    function McLink(elementRef, _focusMonitor) {
        this.elementRef = elementRef;
        this._focusMonitor = _focusMonitor;
        this._focusMonitor.monitor(elementRef.nativeElement, true);
    }
    McLink.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    McLink.prototype.focus = function () {
        this._getHostElement().focus();
    };
    McLink.prototype._getHostElement = function () {
        return this.elementRef.nativeElement;
    };
    McLink = __decorate([
        Component({
            selector: 'a.mc-link',
            template: "<ng-content></ng-content>",
            encapsulation: ViewEncapsulation.None,
            styles: [".mc-link{display:inline-flex;align-items:center;padding:2px 4px;text-decoration:none!important;cursor:pointer;outline:0}.mc-link{transition-property:color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link:focus{transition:none}.mc-link:hover{transition:none}.mc-link.mc-focused,.mc-link:focus{border-radius:3px}.mc-link.mc-disabled,.mc-link[disabled]{pointer-events:none;cursor:default}.mc-link>.mc-link__icon{color:inherit}.mc-link>.mc-link__text:not(:first-child){margin-left:4px}.mc-link>.mc-link__text:not(:last-child){margin-right:4px}.mc-link .mc-link_dashed,.mc-link.mc-link_underlined{transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out;transition-property:background,color;transition-duration:.33s;transition-timing-function:ease-out}.mc-link .mc-link_dashed:focus,.mc-link.mc-link_underlined:focus{transition:none}.mc-link .mc-link_dashed:hover,.mc-link.mc-link_underlined:hover{transition:none}"]
        }),
        __metadata("design:paramtypes", [ElementRef, FocusMonitor])
    ], McLink);
    return McLink;
}());

var McLinkModule = /** @class */ (function () {
    function McLinkModule() {
    }
    McLinkModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                A11yModule
            ],
            declarations: [
                McLink
            ],
            exports: [
                McLink
            ]
        })
    ], McLinkModule);
    return McLinkModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McLinkModule, McLink };
//# sourceMappingURL=link.es5.js.map

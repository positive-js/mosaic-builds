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

var Status;
(function (Status) {
    Status[Status["Info"] = 0] = "Info";
    Status[Status["Success"] = 1] = "Success";
    Status[Status["Warning"] = 2] = "Warning";
    Status[Status["Error"] = 3] = "Error";
})(Status || (Status = {}));
var name = 'mc-card';
var McCard = /** @class */ (function () {
    function McCard(_elementRef, _focusMonitor) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.readonly = false;
        this.selected = false;
        this.selectedChange = new EventEmitter();
        this.mode = 'color';
        this.status = Status.Info;
        this._tabIndex = 0;
        this._focusMonitor.monitor(this._elementRef.nativeElement, false);
    }
    Object.defineProperty(McCard.prototype, "tabIndex", {
        get: function () {
            return this.readonly ? null : this._tabIndex;
        },
        set: function (value) {
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCard.prototype, "statusClass", {
        get: function () {
            switch (this.status) {
                case Status.Error:
                    return name + "_error";
                case Status.Info:
                    return name + "_info";
                case Status.Success:
                    return name + "_success";
                case Status.Warning:
                    return name + "_warning";
                default:
                    return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McCard.prototype, "isWhiteMode", {
        get: function () {
            return this.mode === 'white';
        },
        enumerable: true,
        configurable: true
    });
    McCard.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    McCard.prototype.focus = function () {
        this.hostElement.focus();
    };
    McCard.prototype.clicked = function ($event) {
        if (!this.readonly) {
            $event.stopPropagation();
            this.selectedChange.emit(!this.selected);
        }
    };
    Object.defineProperty(McCard.prototype, "hostElement", {
        get: function () {
            return this._elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    McCard.prototype.onKeyDown = function ($event) {
        var keyCode = $event.keyCode;
        switch (keyCode) {
            case SPACE:
                if (!this.readonly) {
                    $event.preventDefault();
                    this.selectedChange.emit(!this.selected);
                }
                break;
            default:
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], McCard.prototype, "mode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], McCard.prototype, "status", void 0);
    McCard = __decorate([
        Component({
            selector: name,
            template: "<div class=\"mc-card__wrapper\" [ngClass]=\"statusClass\" [class.mc-card_white]=\"isWhiteMode\" [class.mc-card_selected]=\"selected\" (click)=\"clicked($event)\"><ng-content></ng-content></div><div class=\"mc-card__hover-overlay\"></div><div class=\"mc-card__focus-overlay\"></div>",
            styles: [".mc-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;cursor:pointer}.mc-card__wrapper{flex:auto;display:block;padding-left:4px}.mc-card:focus{outline:0}.mc-card.cdk-focused{z-index:1}.mc-card__focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mc-card__hover-overlay{top:0;left:0;right:0;bottom:0;position:absolute;display:none!important;pointer-events:none}.mc-card:not(.mc-card_readonly):hover .mc-card__hover-overlay{display:block!important}.mc-card.mc-card_readonly{cursor:auto}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            inputs: ['color'],
            host: {
                class: name,
                '[class.mc-card_readonly]': 'readonly',
                '(keydown)': 'onKeyDown($event)'
            }
        }),
        __metadata("design:paramtypes", [ElementRef, FocusMonitor])
    ], McCard);
    return McCard;
}());

var McCardModule = /** @class */ (function () {
    function McCardModule() {
    }
    McCardModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                A11yModule,
                PlatformModule
            ],
            exports: [
                McCard
            ],
            declarations: [
                McCard
            ]
        })
    ], McCardModule);
    return McCardModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { McCardModule, Status, McCard };
//# sourceMappingURL=card.es5.js.map

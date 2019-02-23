/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/portal'), require('@ptsecurity/mosaic/core'), require('rxjs'), require('@angular/animations'), require('@ptsecurity/cdk/bidi'), require('rxjs/operators'), require('@ptsecurity/cdk/a11y'), require('@ptsecurity/cdk/coercion'), require('@ptsecurity/cdk/keycodes'), require('@ptsecurity/cdk/scrolling'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic/tabs', ['exports', '@angular/core', '@ptsecurity/cdk/portal', '@ptsecurity/mosaic/core', 'rxjs', '@angular/animations', '@ptsecurity/cdk/bidi', 'rxjs/operators', '@ptsecurity/cdk/a11y', '@ptsecurity/cdk/coercion', '@ptsecurity/cdk/keycodes', '@ptsecurity/cdk/scrolling', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaic = global.ng.mosaic || {}, global.ng.mosaic.tabs = {}),global.ng.core,global.ng.cdk.portal,global.ng.mosaic.core,global.rxjs,global.ng.animations,global.ng.cdk.bidi,global.rxjs.operators,global.ng.cdk.a11y,global.ng.cdk.coercion,global.ng.cdk.keycodes,global.ng.cdk.scrolling,global.ng.common));
}(this, (function (exports,core,portal,core$1,rxjs,animations,bidi,operators,a11y,coercion,keycodes,scrolling,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

/** Decorates the `ng-template` tags and reads out the template from it. */
var McTabContent = /** @class */ (function () {
    function McTabContent(template) {
        this.template = template;
    }
    McTabContent = __decorate([
        core.Directive({ selector: '[mcTabContent]' }),
        __metadata("design:paramtypes", [core.TemplateRef])
    ], McTabContent);
    return McTabContent;
}());

/** Used to flag tab labels for use with the portal directive */
var McTabLabel = /** @class */ (function (_super) {
    __extends(McTabLabel, _super);
    function McTabLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McTabLabel = __decorate([
        core.Directive({
            selector: '[mc-tab-label], [mcTabLabel]'
        })
    ], McTabLabel);
    return McTabLabel;
}(portal.CdkPortal));
// TODO: workaround for https://github.com/angular/material2/issues/12760
McTabLabel.ctorParameters = function () { return portal.CdkPortal.ctorParameters; };

var McTabBase = /** @class */ (function () {
    function McTabBase() {
    }
    return McTabBase;
}());
var mcTabMixinBase = core$1.mixinDisabled(McTabBase);
var McTab = /** @class */ (function (_super) {
    __extends(McTab, _super);
    function McTab(viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.viewContainerRef = viewContainerRef;
        /** Plain text label for the tab, used when there is no template label. */
        _this.textLabel = '';
        /** Emits whenever the internal state of the tab changes. */
        _this.stateChanges = new rxjs.Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        _this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        _this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        _this.isActive = false;
        /** Portal that will be the hosted content of the tab */
        _this.contentPortal = null;
        return _this;
    }
    Object.defineProperty(McTab.prototype, "content", {
        /** @docs-private */
        get: function () {
            return this.contentPortal;
        },
        enumerable: true,
        configurable: true
    });
    McTab.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('textLabel') ||
            changes.hasOwnProperty('disabled')) {
            this.stateChanges.next();
        }
    };
    McTab.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
    };
    McTab.prototype.ngOnInit = function () {
        this.contentPortal = new portal.TemplatePortal(this.explicitContent || this.implicitContent, this.viewContainerRef);
    };
    __decorate([
        core.ContentChild(McTabLabel),
        __metadata("design:type", McTabLabel)
    ], McTab.prototype, "templateLabel", void 0);
    __decorate([
        core.ContentChild(McTabContent, { read: core.TemplateRef }),
        __metadata("design:type", core.TemplateRef)
    ], McTab.prototype, "explicitContent", void 0);
    __decorate([
        core.ViewChild(core.TemplateRef),
        __metadata("design:type", core.TemplateRef)
    ], McTab.prototype, "implicitContent", void 0);
    __decorate([
        core.Input('label'),
        __metadata("design:type", String)
    ], McTab.prototype, "textLabel", void 0);
    __decorate([
        core.Input('aria-label'),
        __metadata("design:type", String)
    ], McTab.prototype, "ariaLabel", void 0);
    __decorate([
        core.Input('aria-labelledby'),
        __metadata("design:type", String)
    ], McTab.prototype, "ariaLabelledby", void 0);
    McTab = __decorate([
        core.Component({
            selector: 'mc-tab',
            // Create a template for the content of the <mc-tab> so that we can grab a reference to this
            // TemplateRef and use it in a Portal to render the tab content in the appropriate place in the
            // tab-group.
            template: '<ng-template><ng-content></ng-content></ng-template>',
            inputs: ['disabled'],
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            encapsulation: core.ViewEncapsulation.None,
            exportAs: 'mcTab'
        }),
        __metadata("design:paramtypes", [core.ViewContainerRef])
    ], McTab);
    return McTab;
}(mcTabMixinBase));

var mcTabsAnimations = {
    /** Animation translates a tab along the X axis. */
    translateTab: animations.trigger('translateTab', [
        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
        animations.state('center, void, left-origin-center, right-origin-center', animations.style({ transform: 'none' })),
        // If the tab is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        animations.state('left', animations.style({ transform: 'translate3d(-100%, 0, 0)', minHeight: '1px' })),
        animations.state('right', animations.style({ transform: 'translate3d(100%, 0, 0)', minHeight: '1px' })),
        animations.transition('* => left, * => right, left => center, right => center', animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
        animations.transition('void => left-origin-center', [
            animations.style({ transform: 'translate3d(-100%, 0, 0)' }),
            animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ]),
        animations.transition('void => right-origin-center', [
            animations.style({ transform: 'translate3d(100%, 0, 0)' }),
            animations.animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')
        ])
    ])
};

/**
 * Wrapper for the contents of a tab.
 * @docs-private
 */
var McTabBody = /** @class */ (function () {
    function McTabBody(elementRef, dir, changeDetectorRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.dir = dir;
        /** Event emitted when the tab begins to animate towards the center as the active tab. */
        this.onCentering = new core.EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this.beforeCentering = new core.EventEmitter();
        /** Event emitted before the centering of the tab begins. */
        this.afterLeavingCenter = new core.EventEmitter();
        /** Event emitted when the tab completes its animation towards the center. */
        this.onCentered = new core.EventEmitter(true);
        // Note that the default value will always be overwritten by `McTabBody`, but we need one
        // anyway to prevent the animations module from throwing an error if the body is used on its own.
        /** Duration for the tab's animation. */
        this.animationDuration = '0ms';
        /** Subscription to the directionality change observable. */
        this.dirChangeSubscription = rxjs.Subscription.EMPTY;
        if (this.dir && changeDetectorRef) {
            this.dirChangeSubscription = this.dir.change.subscribe(function (direction) {
                _this.computePositionAnimationState(direction);
                changeDetectorRef.markForCheck();
            });
        }
    }
    Object.defineProperty(McTabBody.prototype, "position", {
        /** The shifted index position of the tab body, where zero represents the active center tab. */
        set: function (position) {
            this.positionIndex = position;
            this.computePositionAnimationState();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     */
    McTabBody.prototype.ngOnInit = function () {
        if (this.bodyPosition === 'center' && this.origin != null) {
            this.bodyPosition = this.computePositionFromOrigin();
        }
    };
    McTabBody.prototype.ngOnDestroy = function () {
        this.dirChangeSubscription.unsubscribe();
    };
    McTabBody.prototype.onTranslateTabStarted = function (e) {
        var isCentering = this.isCenterPosition(e.toState);
        this.beforeCentering.emit(isCentering);
        if (isCentering) {
            this.onCentering.emit(this.elementRef.nativeElement.clientHeight);
        }
    };
    McTabBody.prototype.onTranslateTabComplete = function (e) {
        // If the transition to the center is complete, emit an event.
        if (this.isCenterPosition(e.toState) && this.isCenterPosition(this.bodyPosition)) {
            this.onCentered.emit();
        }
        if (this.isCenterPosition(e.fromState) && !this.isCenterPosition(this.bodyPosition)) {
            this.afterLeavingCenter.emit();
        }
    };
    /** The text direction of the containing app. */
    McTabBody.prototype.getLayoutDirection = function () {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Whether the provided position state is considered center, regardless of origin. */
    McTabBody.prototype.isCenterPosition = function (position) {
        return position === 'center' ||
            position === 'left-origin-center' ||
            position === 'right-origin-center';
    };
    /** Computes the position state that will be used for the tab-body animation trigger. */
    McTabBody.prototype.computePositionAnimationState = function (dir) {
        if (dir === void 0) { dir = this.getLayoutDirection(); }
        if (this.positionIndex < 0) {
            this.bodyPosition = dir === 'ltr' ? 'left' : 'right';
        }
        else if (this.positionIndex > 0) {
            this.bodyPosition = dir === 'ltr' ? 'right' : 'left';
        }
        else {
            this.bodyPosition = 'center';
        }
    };
    /**
     * Computes the position state based on the specified origin position. This is used if the
     * tab is becoming visible immediately after creation.
     */
    McTabBody.prototype.computePositionFromOrigin = function () {
        var dir = this.getLayoutDirection();
        if ((dir === 'ltr' && this.origin <= 0) || (dir === 'rtl' && this.origin > 0)) {
            return 'left-origin-center';
        }
        return 'right-origin-center';
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McTabBody.prototype, "position", null);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabBody.prototype, "onCentering", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabBody.prototype, "beforeCentering", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabBody.prototype, "afterLeavingCenter", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabBody.prototype, "onCentered", void 0);
    __decorate([
        core.ViewChild(portal.PortalHostDirective),
        __metadata("design:type", portal.PortalHostDirective)
    ], McTabBody.prototype, "portalHost", void 0);
    __decorate([
        core.Input('content'),
        __metadata("design:type", portal.TemplatePortal)
    ], McTabBody.prototype, "content", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", Number)
    ], McTabBody.prototype, "origin", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTabBody.prototype, "animationDuration", void 0);
    McTabBody = __decorate([
        core.Component({
            selector: 'mc-tab-body',
            template: "<div class=\"mc-tab-body__content\" #content [@translateTab]=\"{ value: bodyPosition, params: {animationDuration: animationDuration} }\" (@translateTab.start)=\"onTranslateTabStarted($event)\" (@translateTab.done)=\"onTranslateTabComplete($event)\"><ng-template mcTabBodyHost></ng-template></div>",
            styles: [".mc-tab-body__content{height:100%;overflow:auto}.mc-tab-body__content .mc-tab-group_dynamic-height{overflow:hidden}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            animations: [mcTabsAnimations.translateTab],
            host: {
                class: 'mc-tab-body'
            }
        }),
        __param(1, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef,
            bidi.Directionality,
            core.ChangeDetectorRef])
    ], McTabBody);
    return McTabBody;
}());
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
var McTabBodyPortal = /** @class */ (function (_super) {
    __extends(McTabBodyPortal, _super);
    function McTabBodyPortal(componentFactoryResolver, viewContainerRef, host) {
        var _this = _super.call(this, componentFactoryResolver, viewContainerRef) || this;
        _this.host = host;
        /** Subscription to events for when the tab body begins centering. */
        _this.centeringSub = rxjs.Subscription.EMPTY;
        /** Subscription to events for when the tab body finishes leaving from center position. */
        _this.leavingSub = rxjs.Subscription.EMPTY;
        return _this;
    }
    /** Set initial visibility or set up subscription for changing visibility. */
    McTabBodyPortal.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.centeringSub = this.host.beforeCentering
            .pipe(operators.startWith(this.host.isCenterPosition(this.host.bodyPosition)))
            .subscribe(function (isCentering) {
            if (isCentering && !_this.hasAttached()) {
                _this.attach(_this.host.content);
            }
        });
        this.leavingSub = this.host.afterLeavingCenter.subscribe(function () {
            _this.detach();
        });
    };
    /** Clean up centering subscription. */
    McTabBodyPortal.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.centeringSub.unsubscribe();
        this.leavingSub.unsubscribe();
    };
    McTabBodyPortal = __decorate([
        core.Directive({
            selector: '[mcTabBodyHost]'
        }),
        __param(2, core.Inject(core.forwardRef(function () { return McTabBody; }))),
        __metadata("design:paramtypes", [core.ComponentFactoryResolver,
            core.ViewContainerRef,
            McTabBody])
    ], McTabBodyPortal);
    return McTabBodyPortal;
}(portal.CdkPortalOutlet));

// Boilerplate for applying mixins to McTabLabelWrapper.
/** @docs-private */
var McTabLabelWrapperBase = /** @class */ (function () {
    function McTabLabelWrapperBase() {
    }
    return McTabLabelWrapperBase;
}());
var mcTabLabelWrapperMixinBase = core$1.mixinDisabled(McTabLabelWrapperBase);
/**
 * Used in the `mc-tab-group` view to display tab labels.
 * @docs-private
 */
var McTabLabelWrapper = /** @class */ (function (_super) {
    __extends(McTabLabelWrapper, _super);
    function McTabLabelWrapper(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** Sets focus on the wrapper element */
    McTabLabelWrapper.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    McTabLabelWrapper.prototype.getOffsetLeft = function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    McTabLabelWrapper.prototype.getOffsetWidth = function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    McTabLabelWrapper = __decorate([
        core.Directive({
            selector: '[mcTabLabelWrapper]',
            inputs: ['disabled'],
            host: {
                '[class.mc-disabled]': 'disabled',
                '[attr.aria-disabled]': '!!disabled'
            }
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McTabLabelWrapper);
    return McTabLabelWrapper;
}(mcTabLabelWrapperMixinBase));

var VIEWPORT_THROTTLE_TIME = 150;
var SCROLL_DISTANCE_DELIMITER = 3;
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
var EXAGGERATED_OVERSCROLL = 60;
// Boilerplate for applying mixins to McTabHeader.
/** @docs-private */
var McTabHeaderBase = /** @class */ (function () {
    function McTabHeaderBase() {
    }
    return McTabHeaderBase;
}());
/**
 * The header of the tab group which displays a list of all the tabs in the tab group.
 * When the tabs list's width exceeds the width of the header container,
 * then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
var McTabHeader = /** @class */ (function (_super) {
    __extends(McTabHeader, _super);
    function McTabHeader(elementRef, changeDetectorRef, viewportRuler, dir, ngZone) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.viewportRuler = viewportRuler;
        _this.dir = dir;
        _this.ngZone = ngZone;
        /** Whether the controls for pagination should be displayed */
        _this.showPaginationControls = false;
        /** Whether the tab list can be scrolled more towards the end of the tab label list. */
        _this.disableScrollAfter = true;
        /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
        _this.disableScrollBefore = true;
        /** Event emitted when the option is selected. */
        _this.selectFocusedIndex = new core.EventEmitter();
        /** Event emitted when a label is focused. */
        _this.indexFocused = new core.EventEmitter();
        /** The distance in pixels that the tab labels should be translated to the left. */
        _this._scrollDistance = 0;
        /** Whether the header should scroll to the selected index after the view has been checked. */
        _this.selectedIndexChanged = false;
        /** Emits when the component is destroyed. */
        _this.destroyed = new rxjs.Subject();
        _this._selectedIndex = 0;
        return _this;
    }
    Object.defineProperty(McTabHeader.prototype, "selectedIndex", {
        /** The index of the active tab. */
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            var coercedValue = coercion.coerceNumberProperty(value);
            this.selectedIndexChanged = this._selectedIndex !== coercedValue;
            this._selectedIndex = coercedValue;
            if (this.keyManager) {
                this.keyManager.updateActiveItem(coercedValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabHeader.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: function () {
            return this.keyManager ? this.keyManager.activeItemIndex : 0;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: function (value) {
            if (!this.isValidIndex(value) ||
                this.focusIndex === value ||
                !this.keyManager) {
                return;
            }
            this.keyManager.setActiveItem(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabHeader.prototype, "scrollDistance", {
        /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        get: function () {
            return this._scrollDistance;
        },
        set: function (v) {
            this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));
            // Mark that the scroll distance has changed so that after the view is checked, the CSS
            // transformation can move the header.
            this.scrollDistanceChanged = true;
            this.checkScrollingControls();
        },
        enumerable: true,
        configurable: true
    });
    McTabHeader.prototype.ngAfterContentChecked = function () {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this.tabLabelCount !== this.labelWrappers.length) {
            this.updatePagination();
            this.tabLabelCount = this.labelWrappers.length;
            this.changeDetectorRef.markForCheck();
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this.selectedIndexChanged) {
            this.scrollToLabel(this._selectedIndex);
            this.checkScrollingControls();
            this.selectedIndexChanged = false;
            this.changeDetectorRef.markForCheck();
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this.scrollDistanceChanged) {
            this.updateTabScrollPosition();
            this.scrollDistanceChanged = false;
            this.changeDetectorRef.markForCheck();
        }
    };
    McTabHeader.prototype.handleKeydown = function (event) {
        switch (event.keyCode) {
            case keycodes.HOME:
                this.keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case keycodes.END:
                this.keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case keycodes.ENTER:
            case keycodes.SPACE:
                this.selectFocusedIndex.emit(this.focusIndex);
                event.preventDefault();
                break;
            default:
                this.keyManager.onKeydown(event);
        }
    };
    McTabHeader.prototype.ngAfterContentInit = function () {
        var _this = this;
        var dirChange = this.dir ? this.dir.change : rxjs.of(null);
        var resize = this.viewportRuler.change(VIEWPORT_THROTTLE_TIME);
        var realign = function () {
            _this.updatePagination();
        };
        this.keyManager = new a11y.FocusKeyManager(this.labelWrappers)
            .withHorizontalOrientation(this.getLayoutDirection())
            .withWrap();
        this.keyManager.updateActiveItem(0);
        // Defer the first call in order to allow for slower browsers to lay out the elements.
        // This helps in cases where the user lands directly on a page with paginated tabs.
        typeof requestAnimationFrame === undefined
            ? realign()
            : requestAnimationFrame(realign);
        // On dir change or window resize, update the orientation of
        // the key manager if the direction has changed.
        rxjs.merge(dirChange, resize)
            .pipe(operators.takeUntil(this.destroyed))
            .subscribe(function () {
            realign();
            _this.keyManager.withHorizontalOrientation(_this.getLayoutDirection());
        });
        // If there is a change in the focus key manager we need to emit the `indexFocused`
        // event in order to provide a public event that notifies about focus changes. Also we realign
        // the tabs container by scrolling the new focused tab into the visible section.
        this.keyManager.change
            .pipe(operators.takeUntil(this.destroyed))
            .subscribe(function (newFocusIndex) {
            _this.indexFocused.emit(newFocusIndex);
            _this.setTabFocus(newFocusIndex);
        });
    };
    McTabHeader.prototype.ngOnDestroy = function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    McTabHeader.prototype.onContentChanges = function () {
        var _this = this;
        var textContent = this.elementRef.nativeElement.textContent;
        // We need to diff the text content of the header, because the MutationObserver callback
        // will fire even if the text content didn't change which is inefficient and is prone
        // to infinite loops if a poorly constructed expression is passed in.
        if (textContent !== this.currentTextContent) {
            this.currentTextContent = textContent;
            var zoneCallback = function () {
                _this.updatePagination();
                _this.changeDetectorRef.markForCheck();
            };
            // The content observer runs outside the `NgZone` by default, which
            // means that we need to bring the callback back in ourselves.
            // TODO: Remove null check for `_ngZone` once it's a required parameter.
            this.ngZone ? this.ngZone.run(zoneCallback) : zoneCallback();
        }
    };
    /**
     * Updating the view whether pagination should be enabled or not
     *
     * WARNING: Calling this method can be very costly in terms of performance.  It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     */
    McTabHeader.prototype.updatePagination = function () {
        this.checkPaginationEnabled();
        this.checkScrollingControls();
        this.updateTabScrollPosition();
    };
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    McTabHeader.prototype.isValidIndex = function (index) {
        if (!this.labelWrappers) {
            return true;
        }
        var tab = this.labelWrappers
            ? this.labelWrappers.toArray()[index]
            : null;
        return !!tab && !tab.disabled;
    };
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    McTabHeader.prototype.setTabFocus = function (tabIndex) {
        if (this.showPaginationControls) {
            this.scrollToLabel(tabIndex);
        }
        if (this.labelWrappers && this.labelWrappers.length) {
            this.labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            var containerEl = this.tabListContainer.nativeElement;
            var dir = this.getLayoutDirection();
            if (dir === 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft =
                    containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    };
    /** The layout direction of the containing app. */
    McTabHeader.prototype.getLayoutDirection = function () {
        return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    McTabHeader.prototype.updateTabScrollPosition = function () {
        var scrollDistance = this.scrollDistance;
        var translateX = this.getLayoutDirection() === 'ltr'
            ? -scrollDistance
            : scrollDistance;
        // Don't use `translate3d` here because we don't want to create a new layer. A new layer
        // seems to cause flickering and overflow in Internet Explorer.
        // See: https://github.com/angular/material2/issues/10276
        // We round the `transform` here, because transforms with sub-pixel precision cause some
        // browsers to blur the content of the element.
        this.tabList.nativeElement.style.transform = "translateX(" + Math.round(translateX) + "px)";
        // Setting the `transform` on IE will change the scroll offset of the parent, causing the
        // position to be thrown off in some cases. We have to reset it ourselves to ensure that
        // it doesn't get thrown off.
        this.tabList.nativeElement.scrollLeft = 0;
    };
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.scrollHeader = function (scrollDir) {
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance +=
            ((scrollDir === 'before' ? -1 : 1) * viewLength) / SCROLL_DISTANCE_DELIMITER;
    };
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.scrollToLabel = function (labelIndex) {
        var selectedLabel = this.labelWrappers
            ? this.labelWrappers.toArray()[labelIndex]
            : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        var labelBeforePos;
        var labelAfterPos;
        if (this.getLayoutDirection() === 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos =
                this.tabList.nativeElement.offsetWidth -
                    selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        var beforeVisiblePos = this.scrollDistance;
        var afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -=
                beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance +=
                labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    };
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.checkPaginationEnabled = function () {
        var isEnabled = this.tabList.nativeElement.scrollWidth >
            this.elementRef.nativeElement.offsetWidth;
        if (!isEnabled) {
            this.scrollDistance = 0;
        }
        if (isEnabled !== this.showPaginationControls) {
            this.changeDetectorRef.markForCheck();
        }
        this.showPaginationControls = isEnabled;
    };
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.checkScrollingControls = function () {
        // Check if the pagination arrows should be activated.
        this.disableScrollBefore = this.scrollDistance === 0;
        this.disableScrollAfter =
            this.scrollDistance === this.getMaxScrollDistance();
        this.changeDetectorRef.markForCheck();
    };
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    McTabHeader.prototype.getMaxScrollDistance = function () {
        var lengthOfTabList = this.tabList.nativeElement.scrollWidth;
        var viewLength = this.tabListContainer.nativeElement.offsetWidth;
        return lengthOfTabList - viewLength || 0;
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], McTabHeader.prototype, "selectedIndex", null);
    __decorate([
        core.ContentChildren(McTabLabelWrapper),
        __metadata("design:type", core.QueryList)
    ], McTabHeader.prototype, "labelWrappers", void 0);
    __decorate([
        core.ViewChild('tabListContainer'),
        __metadata("design:type", core.ElementRef)
    ], McTabHeader.prototype, "tabListContainer", void 0);
    __decorate([
        core.ViewChild('tabList'),
        __metadata("design:type", core.ElementRef)
    ], McTabHeader.prototype, "tabList", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabHeader.prototype, "selectFocusedIndex", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabHeader.prototype, "indexFocused", void 0);
    McTabHeader = __decorate([
        core.Component({
            selector: 'mc-tab-header',
            template: "<div class=\"mc-tab-header__pagination mc-tab-header__pagination_before mc-elevation-z4\" aria-hidden=\"true\" [class.mc-tab-header_disabled]=\"disableScrollBefore\" (click)=\"scrollHeader('before')\"><div class=\"mc-tab-header__pagination-chevron\"></div></div><div class=\"mc-tab-header__content\" #tabListContainer (keydown)=\"handleKeydown($event)\"><div class=\"mc-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"onContentChanges()\"><div class=\"mc-tab-list__content\"><ng-content></ng-content></div></div></div><div class=\"mc-tab-header__pagination mc-tab-header__pagination_after mc-elevation-z4\" aria-hidden=\"true\" [class.mc-tab-header_disabled]=\"disableScrollAfter\" (click)=\"scrollHeader('after')\"><div class=\"mc-tab-header__pagination-chevron\"></div></div>",
            styles: [".mc-tab-header{display:flex}.mc-tab-header__pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mc-tab-header__pagination .mc-tab-header__pagination-controls_enabled{display:flex}.mc-tab-header__pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:\"\";height:8px;width:8px}.mc-tab-header__pagination_after,.mc-tab-header_rtl .mc-tab-header__pagination_before{padding-right:4px}.mc-tab-header__pagination_after .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_before .mc-tab-header__pagination-chevron{transform:rotate(45deg)}.mc-tab-header__pagination_before,.mc-tab-header_rtl .mc-tab-header__pagination_after{padding-left:4px}.mc-tab-header__pagination_before .mc-tab-header__pagination-chevron,.mc-tab-header_rtl .mc-tab-header__pagination_after .mc-tab-header__pagination-chevron{transform:rotate(-135deg)}.mc-tab-header_disabled{box-shadow:none;cursor:default}.mc-tab-header__content{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mc-tab-list__content{display:flex}.mc-tab-group_align-labels-center .mc-tab-list__content{justify-content:center}.mc-tab-group_align-labels-end .mc-tab-list__content{justify-content:flex-end}.mc-tab-group_stretch-labels .mc-tab-label{flex-basis:0;flex-grow:1}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            host: {
                class: 'mc-tab-header',
                '[class.mc-tab-header__pagination-controls_enabled]': 'showPaginationControls',
                '[class.mc-tab-header_rtl]': 'getLayoutDirection() == \'rtl\''
            }
        }),
        __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef,
            scrolling.ViewportRuler,
            bidi.Directionality,
            core.NgZone])
    ], McTabHeader);
    return McTabHeader;
}(McTabHeaderBase));

var McLightTabsCssStyler = /** @class */ (function () {
    function McLightTabsCssStyler() {
    }
    McLightTabsCssStyler = __decorate([
        core.Directive({
            selector: 'mc-tab-group[mc-light-tabs], [mc-tab-nav-bar][mc-light-tabs]',
            host: { class: 'mc-tab-group_light' }
        })
    ], McLightTabsCssStyler);
    return McLightTabsCssStyler;
}());
var McAlignTabsCenterCssStyler = /** @class */ (function () {
    function McAlignTabsCenterCssStyler() {
    }
    McAlignTabsCenterCssStyler = __decorate([
        core.Directive({
            selector: 'mc-tab-group[mc-align-tabs-center], [mc-tab-nav-bar][mc-align-tabs-center]',
            host: { class: 'mc-tab-group_align-labels-center' }
        })
    ], McAlignTabsCenterCssStyler);
    return McAlignTabsCenterCssStyler;
}());
var McAlignTabsEndCssStyler = /** @class */ (function () {
    function McAlignTabsEndCssStyler() {
    }
    McAlignTabsEndCssStyler = __decorate([
        core.Directive({
            selector: 'mc-tab-group[mc-align-tabs-end], [mc-tab-nav-bar][mc-align-tabs-end]',
            host: { class: 'mc-tab-group_align-labels-end' }
        })
    ], McAlignTabsEndCssStyler);
    return McAlignTabsEndCssStyler;
}());
var McStretchTabsCssStyler = /** @class */ (function () {
    function McStretchTabsCssStyler() {
    }
    McStretchTabsCssStyler = __decorate([
        core.Directive({
            selector: 'mc-tab-group[mc-stretch-tabs], [mc-tab-nav-bar][mc-stretch-tabs]',
            host: { class: 'mc-tab-group_stretch-labels' }
        })
    ], McStretchTabsCssStyler);
    return McStretchTabsCssStyler;
}());
/** Used to generate unique ID's for each tab component */
var nextId = 0;
/** A simple change event emitted on focus or selection changes. */
var McTabChangeEvent = /** @class */ (function () {
    function McTabChangeEvent() {
    }
    return McTabChangeEvent;
}());
/** Injection token that can be used to provide the default options the tabs module. */
var MC_TABS_CONFIG = new core.InjectionToken('MC_TABS_CONFIG');
// Boilerplate for applying mixins to McTabGroup.
/** @docs-private */
var McTabGroupBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTabGroupBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTabGroupBase;
}());
var mcTabGroupMixinBase = core$1.mixinColor(core$1.mixinDisabled(McTabGroupBase));
/**
 * Tab-group component.  Supports basic tab pairs (label + content) and includes
 * keyboard navigation.
 */
var McTabGroup = /** @class */ (function (_super) {
    __extends(McTabGroup, _super);
    function McTabGroup(elementRef, changeDetectorRef, lightTabs, defaultConfig) {
        var _this = _super.call(this, elementRef) || this;
        _this.changeDetectorRef = changeDetectorRef;
        /** Position of the tab header. */
        _this.headerPosition = 'above';
        /** Output to enable support for two-way binding on `[(selectedIndex)]` */
        _this.selectedIndexChange = new core.EventEmitter();
        /** Event emitted when focus has changed within a tab group. */
        _this.focusChange = new core.EventEmitter();
        /** Event emitted when the body animation has completed */
        _this.animationDone = new core.EventEmitter();
        /** Event emitted when the tab selection has changed. */
        _this.selectedTabChange = new core.EventEmitter(true);
        /** The tab index that should be selected after the content has been checked. */
        _this.indexToSelect = 0;
        /** Snapshot of the height of the tab body wrapper before another tab is activated. */
        _this.tabBodyWrapperHeight = 0;
        /** Subscription to tabs being added/removed. */
        _this.tabsSubscription = rxjs.Subscription.EMPTY;
        /** Subscription to changes in the tab labels. */
        _this.tabLabelSubscription = rxjs.Subscription.EMPTY;
        _this._dynamicHeight = false;
        _this._selectedIndex = null;
        _this.lightTab = coercion.coerceBooleanProperty(lightTabs);
        _this.groupId = nextId++;
        _this.animationDuration = defaultConfig && defaultConfig.animationDuration ?
            defaultConfig.animationDuration : '0ms';
        return _this;
    }
    Object.defineProperty(McTabGroup.prototype, "dynamicHeight", {
        /** Whether the tab group should grow to the size of the active tab. */
        get: function () { return this._dynamicHeight; },
        set: function (value) { this._dynamicHeight = coercion.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McTabGroup.prototype, "selectedIndex", {
        /** The index of the active tab. */
        get: function () { return this._selectedIndex; },
        set: function (value) {
            this.indexToSelect = coercion.coerceNumberProperty(value, null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     */
    McTabGroup.prototype.ngAfterContentChecked = function () {
        var _this = this;
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        var indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect) {
            var isFirstRun_1 = this._selectedIndex == null;
            if (!isFirstRun_1) {
                this.selectedTabChange.emit(this.createChangeEvent(indexToSelect));
            }
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then(function () {
                _this.tabs.forEach(function (tab, index) { return tab.isActive = index === indexToSelect; });
                if (!isFirstRun_1) {
                    _this.selectedIndexChange.emit(indexToSelect);
                }
            });
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.tabs.forEach(function (tab, index) {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (_this._selectedIndex != null && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - _this._selectedIndex;
            }
        });
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this.changeDetectorRef.markForCheck();
        }
    };
    McTabGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this.tabsSubscription = this.tabs.changes.subscribe(function () {
            var indexToSelect = _this.clampTabIndex(_this.indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === _this._selectedIndex) {
                var tabs = _this.tabs.toArray();
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].isActive) {
                        // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `selectedIndexChange` event.
                        _this.indexToSelect = _this._selectedIndex = i;
                        break;
                    }
                }
            }
            _this.subscribeToTabLabels();
            _this.changeDetectorRef.markForCheck();
        });
    };
    McTabGroup.prototype.ngOnDestroy = function () {
        this.tabsSubscription.unsubscribe();
        this.tabLabelSubscription.unsubscribe();
    };
    McTabGroup.prototype.focusChanged = function (index) {
        this.focusChange.emit(this.createChangeEvent(index));
    };
    /** Returns a unique id for each tab label element */
    McTabGroup.prototype.getTabLabelId = function (i) {
        return "mc-tab-label-" + this.groupId + "-" + i;
    };
    /** Returns a unique id for each tab content element */
    McTabGroup.prototype.getTabContentId = function (i) {
        return "mc-tab-content-" + this.groupId + "-" + i;
    };
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     */
    McTabGroup.prototype.setTabBodyWrapperHeight = function (tabHeight) {
        if (!this._dynamicHeight || !this.tabBodyWrapperHeight) {
            return;
        }
        var wrapper = this.tabBodyWrapper.nativeElement;
        wrapper.style.height = this.tabBodyWrapperHeight + "px";
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this.tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = tabHeight + "px";
        }
    };
    /** Removes the height of the tab body wrapper. */
    McTabGroup.prototype.removeTabBodyWrapperHeight = function () {
        this.tabBodyWrapperHeight = this.tabBodyWrapper.nativeElement.clientHeight;
        this.tabBodyWrapper.nativeElement.style.height = '';
        this.animationDone.emit();
    };
    /** Handle click events, setting new selected index if appropriate. */
    McTabGroup.prototype.handleClick = function (tab, tabHeader, index) {
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = index;
        }
    };
    /** Retrieves the tabindex for the tab. */
    McTabGroup.prototype.getTabIndex = function (tab, index) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === index ? 0 : -1;
    };
    McTabGroup.prototype.createChangeEvent = function (index) {
        var event = new McTabChangeEvent();
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    };
    /**
     * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
     * on the McTab component, whereas the data binding is inside the McTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     */
    McTabGroup.prototype.subscribeToTabLabels = function () {
        var _this = this;
        if (this.tabLabelSubscription) {
            this.tabLabelSubscription.unsubscribe();
        }
        this.tabLabelSubscription = rxjs.merge.apply(void 0, this.tabs.map(function (tab) { return tab.stateChanges; })).subscribe(function () { return _this.changeDetectorRef.markForCheck(); });
    };
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    McTabGroup.prototype.clampTabIndex = function (index) {
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Mch.max(NaN, 0) === NaN).
        return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTabGroup.prototype, "dynamicHeight", null);
    __decorate([
        core.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], McTabGroup.prototype, "selectedIndex", null);
    __decorate([
        core.ContentChildren(McTab),
        __metadata("design:type", core.QueryList)
    ], McTabGroup.prototype, "tabs", void 0);
    __decorate([
        core.ViewChild('tabBodyWrapper'),
        __metadata("design:type", core.ElementRef)
    ], McTabGroup.prototype, "tabBodyWrapper", void 0);
    __decorate([
        core.ViewChild('tabHeader'),
        __metadata("design:type", McTabHeader)
    ], McTabGroup.prototype, "tabHeader", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTabGroup.prototype, "headerPosition", void 0);
    __decorate([
        core.Input(),
        __metadata("design:type", String)
    ], McTabGroup.prototype, "animationDuration", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabGroup.prototype, "selectedIndexChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabGroup.prototype, "focusChange", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabGroup.prototype, "animationDone", void 0);
    __decorate([
        core.Output(),
        __metadata("design:type", core.EventEmitter)
    ], McTabGroup.prototype, "selectedTabChange", void 0);
    McTabGroup = __decorate([
        core.Component({
            selector: 'mc-tab-group',
            exportAs: 'mcTabGroup',
            template: "<mc-tab-header #tabHeader [selectedIndex]=\"selectedIndex\" (indexFocused)=\"focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"><div role=\"tab\" mcTabLabelWrapper cdkMonitorElementFocus [class.mc-tab-label]=\"!lightTab\" [class.mc-tab-light-label]=\"lightTab\" *ngFor=\"let tab of tabs; let i = index\" [id]=\"getTabLabelId(i)\" [attr.tabIndex]=\"getTabIndex(tab, i)\" [attr.aria-posinset]=\"i + 1\" [attr.aria-setsize]=\"tabs.length\" [attr.aria-controls]=\"getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [attr.aria-label]=\"tab.ariaLabel || null\" [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\" [class.mc-active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" (click)=\"handleClick(tab, tabHeader, i)\"><div class=\"mc-tab-label__content\"><ng-template [ngIf]=\"tab.templateLabel\"><ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template></ng-template><ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template></div><div class=\"mc-tab-overlay\"></div></div></mc-tab-header><div class=\"mc-tab-body__wrapper\" #tabBodyWrapper><mc-tab-body role=\"tabpanel\" *ngFor=\"let tab of tabs; let i = index\" [id]=\"getTabContentId(i)\" [attr.aria-labelledby]=\"getTabLabelId(i)\" [class.mc-tab-body__active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" [animationDuration]=\"animationDuration\" (onCentered)=\"removeTabBodyWrapperHeight()\" (onCentering)=\"setTabBodyWrapperHeight($event)\"></mc-tab-body></div>",
            styles: [".mc-tab-label.cdk-keyboard-focused:after,.mc-tab-light-label.cdk-keyboard-focused:after,.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{display:block;position:absolute;content:\"\"}.mc-tab-light-label.mc-active:before,.mc-tab-light-label:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-group{display:flex;flex-direction:column;box-sizing:border-box;text-align:center;white-space:nowrap}.mc-tab-group.mc-tab-group_inverted-header{flex-direction:column-reverse}.mc-tab-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-label.cdk-keyboard-focused{z-index:1}.mc-tab-label.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-label.mc-disabled{pointer-events:none}.mc-tab-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-label.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-label.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-label .mc-tab-overlay{border-top-width:1px;border-top-style:solid;border-top-color:transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-light-label{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-light-label.cdk-keyboard-focused{z-index:1}.mc-tab-light-label.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-light-label.mc-disabled{pointer-events:none}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-light-label.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-light-label.cdk-keyboard-focused:after{top:-1px}.mc-tab-light-label .mc-tab-overlay{position:absolute;top:0}.mc-tab-header__content{padding:1px 1px 0 1px}.mc-tab-body__wrapper{display:flex;overflow:hidden;position:relative}.mc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mc-tab-body.mc-tab-body__active{overflow-x:hidden;overflow-y:auto;position:relative;z-index:1;flex-grow:1}.mc-tab-group.mc-tab-group_dynamic-height .mc-tab-body.mc-tab-body__active{overflow-y:hidden}"],
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush,
            inputs: ['color'],
            host: {
                class: 'mc-tab-group',
                '[class.mc-tab-group_dynamic-height]': 'dynamicHeight',
                '[class.mc-tab-group_inverted-header]': 'headerPosition === "below"'
            }
        }),
        __param(2, core.Attribute('mc-light-tabs')),
        __param(3, core.Inject(MC_TABS_CONFIG)), __param(3, core.Optional()),
        __metadata("design:paramtypes", [core.ElementRef,
            core.ChangeDetectorRef, String, Object])
    ], McTabGroup);
    return McTabGroup;
}(mcTabGroupMixinBase));

// Boilerplate for applying mixins to McTabNav.
/** @docs-private */
var McTabNavBase = /** @class */ (function () {
    // tslint:disable-next-line:naming-convention
    function McTabNavBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return McTabNavBase;
}());
var mcTabNavMixinBase = core$1.mixinColor(McTabNavBase);
/**
 * Navigation component matching the styles of the tab group header.
 */
var McTabNav = /** @class */ (function (_super) {
    __extends(McTabNav, _super);
    function McTabNav(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    McTabNav = __decorate([
        core.Component({
            selector: '[mc-tab-nav-bar]',
            exportAs: 'mcTabNavBar, mcTabNav',
            inputs: ['color'],
            template: "<div class=\"mc-tab-links\"><ng-content></ng-content></div>",
            styles: [".mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before,.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{display:block;position:absolute;content:\"\"}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-active:before,.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link:hover:before{bottom:-1px;left:0;height:4px;right:0}.mc-tab-link{vertical-align:top;text-decoration:none;-webkit-tap-highlight-color:transparent}.mc-tab-group_stretch-labels .mc-tab-link{flex-basis:0;flex-grow:1}.mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar{display:flex}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid;border-top-width:1px;border-top-style:solid;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active{padding-right:15px;padding-left:15px;border-width:1px;border-style:solid}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link.mc-active.cdk-keyboard-focused:after{z-index:1;right:-2px;left:-2px}.mc-tab-nav-bar:not(.mc-tab-group_light) .mc-tab-link .mc-tab-overlay{border-top-width:1px;border-top-style:solid;border-top-color:transparent;border-top-left-radius:3px;border-top-right-radius:3px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link{position:relative;box-sizing:border-box;display:inline-flex;justify-content:center;align-items:center;height:40px;text-align:center;white-space:nowrap;cursor:pointer;padding-right:16px;padding-left:16px;outline:0;border-bottom-width:1px;border-bottom-style:solid}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused{z-index:1}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-2px;right:-1px;bottom:-1px;left:-1px;border-width:2px;border-style:solid;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.mc-disabled{pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:-1px;left:0;right:0;bottom:0;pointer-events:none}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused+:hover:before{left:1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link.cdk-keyboard-focused:after{top:-1px}.mc-tab-nav-bar.mc-tab-group_light .mc-tab-link .mc-tab-overlay{position:absolute;top:0}.mc-tab-links{display:flex;position:relative;padding:1px 1px 0 1px;flex-grow:1}.mc-tab-links .mc-tab-group_align-labels-center{justify-content:center}.mc-tab-links .mc-tab-group_align-labels-end{justify-content:flex-end}"],
            host: { class: 'mc-tab-nav-bar' },
            encapsulation: core.ViewEncapsulation.None,
            changeDetection: core.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core.ElementRef])
    ], McTabNav);
    return McTabNav;
}(mcTabNavMixinBase));
// Boilerplate for applying mixins to McTabLink.
var McTabLinkBase = /** @class */ (function () {
    function McTabLinkBase() {
    }
    return McTabLinkBase;
}());
var mcTabLinkMixinBase = core$1.mixinTabIndex(core$1.mixinDisabled(McTabLinkBase));
/**
 * Link inside of a `mc-tab-nav-bar`.
 */
var McTabLink = /** @class */ (function (_super) {
    __extends(McTabLink, _super);
    function McTabLink(elementRef, tabIndex, focusMonitor) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.focusMonitor = focusMonitor;
        /** Whether the tab link is active or not. */
        _this.isActive = false;
        _this.tabIndex = parseInt(tabIndex) || 0;
        _this.focusMonitor.monitor(_this.elementRef.nativeElement);
        return _this;
    }
    Object.defineProperty(McTabLink.prototype, "active", {
        /** Whether the link is active. */
        get: function () {
            return this.isActive;
        },
        set: function (value) {
            if (value !== this.isActive) {
                this.isActive = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    McTabLink.prototype.ngOnDestroy = function () {
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    };
    __decorate([
        core.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], McTabLink.prototype, "active", null);
    McTabLink = __decorate([
        core.Directive({
            selector: '[mc-tab-link], [mcTabLink]',
            exportAs: 'mcTabLink',
            inputs: ['disabled', 'tabIndex'],
            host: {
                class: 'mc-tab-link',
                '[attr.aria-current]': 'active',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.tabIndex]': 'tabIndex',
                '[class.mc-disabled]': 'disabled',
                '[class.mc-active]': 'active'
            }
        }),
        __param(1, core.Attribute('tabindex')),
        __metadata("design:paramtypes", [core.ElementRef, String, a11y.FocusMonitor])
    ], McTabLink);
    return McTabLink;
}(mcTabLinkMixinBase));

var McTabsModule = /** @class */ (function () {
    function McTabsModule() {
    }
    McTabsModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule,
                core$1.McCommonModule,
                portal.PortalModule,
                a11y.A11yModule
            ],
            // Don't export all components because some are only to be used internally.
            exports: [
                core$1.McCommonModule,
                McTabGroup,
                McTabLabel,
                McTab,
                McTabNav,
                McTabLink,
                McTabContent,
                McLightTabsCssStyler,
                McAlignTabsCenterCssStyler,
                McAlignTabsEndCssStyler,
                McStretchTabsCssStyler
            ],
            declarations: [
                McTabGroup,
                McTabLabel,
                McTab,
                McTabLabelWrapper,
                McTabNav,
                McTabLink,
                McTabBody,
                McTabBodyPortal,
                McTabHeader,
                McTabContent,
                McLightTabsCssStyler,
                McAlignTabsCenterCssStyler,
                McAlignTabsEndCssStyler,
                McStretchTabsCssStyler
            ]
        })
    ], McTabsModule);
    return McTabsModule;
}());

exports.ɵd14 = McTabBase;
exports.ɵe14 = mcTabMixinBase;
exports.ɵa14 = McTabHeaderBase;
exports.ɵb14 = McTabLabelWrapperBase;
exports.ɵc14 = mcTabLabelWrapperMixinBase;
exports.ɵh14 = McTabLinkBase;
exports.ɵf14 = McTabNavBase;
exports.ɵi14 = mcTabLinkMixinBase;
exports.ɵg14 = mcTabNavMixinBase;
exports.McTabBody = McTabBody;
exports.McTabBodyPortal = McTabBodyPortal;
exports.McTabHeader = McTabHeader;
exports.McTabLabelWrapper = McTabLabelWrapper;
exports.McTab = McTab;
exports.McTabLabel = McTabLabel;
exports.McTabNav = McTabNav;
exports.McTabLink = McTabLink;
exports.McTabContent = McTabContent;
exports.McTabsModule = McTabsModule;
exports.McLightTabsCssStyler = McLightTabsCssStyler;
exports.McAlignTabsCenterCssStyler = McAlignTabsCenterCssStyler;
exports.McAlignTabsEndCssStyler = McAlignTabsEndCssStyler;
exports.McStretchTabsCssStyler = McStretchTabsCssStyler;
exports.McTabChangeEvent = McTabChangeEvent;
exports.MC_TABS_CONFIG = MC_TABS_CONFIG;
exports.McTabGroupBase = McTabGroupBase;
exports.mcTabGroupMixinBase = mcTabGroupMixinBase;
exports.McTabGroup = McTabGroup;
exports.mcTabsAnimations = mcTabsAnimations;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-tabs.umd.js.map

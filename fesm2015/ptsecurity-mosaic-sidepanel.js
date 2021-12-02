import * as i0 from '@angular/core';
import { InjectionToken, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, ViewChild, TemplateRef, Injectable, Optional, SkipSelf, Directive, Input, NgModule } from '@angular/core';
import { AnimationCurves, ThemePalette, McCommonModule } from '@ptsecurity/mosaic/core';
import { ESCAPE } from '@ptsecurity/cdk/keycodes';
import { Subject, merge } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import * as i4 from '@angular/cdk/portal';
import { BasePortalOutlet, CdkPortalOutlet, TemplatePortal, ComponentPortal, PortalInjector, PortalModule } from '@angular/cdk/portal';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import * as i3$1 from '@ptsecurity/mosaic/icon';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McButtonModule } from '@ptsecurity/mosaic/button';

/** Injection token that can be used to access the data that was passed in to a sidepanel. */
const MC_SIDEPANEL_DATA = new InjectionToken('McSidepanelData');
var McSidepanelPosition;
(function (McSidepanelPosition) {
    McSidepanelPosition["Right"] = "right";
    McSidepanelPosition["Left"] = "left";
    McSidepanelPosition["Top"] = "top";
    McSidepanelPosition["Bottom"] = "bottom";
})(McSidepanelPosition || (McSidepanelPosition = {}));
class McSidepanelConfig {
    constructor() {
        /** Data being injected into the child component. */
        this.data = null;
        this.position = McSidepanelPosition.Right;
        /** Whether the sidepanel has a backdrop. */
        this.hasBackdrop = true;
        /** When we open multiple sidepanels, backdrop appears only once, except cases then this flag is true. */
        this.requiredBackdrop = false;
        /** Whether the user can use escape or clicking outside to close the sidepanel. */
        this.disableClose = false;
        /** Custom class for the overlay pane. */
        this.overlayPanelClass = '';
    }
}

var McSidepanelAnimationState;
(function (McSidepanelAnimationState) {
    McSidepanelAnimationState["Void"] = "void";
    McSidepanelAnimationState["Visible"] = "visible";
    McSidepanelAnimationState["Hidden"] = "hidden";
})(McSidepanelAnimationState || (McSidepanelAnimationState = {}));
// TODO Find a way to use dynamic keys and avoid error "Expression form not supported."
// tslint:disable-next-line
const mcSidepanelTransformAnimation = {
    right: { in: 'translateX(100%)', out: 'translateX(0%)' },
    left: { in: 'translateX(-100%)', out: 'translateX(0%)' },
    top: { in: 'translateY(-100%)', out: 'translateY(0%)' },
    bottom: { in: 'translateY(100%)', out: 'translateY(0%)' }
};
const mcSidepanelAnimations = {
    sidepanelState: trigger('state', [
        state('hidden', style({ transform: '{{transformIn}}' }), { params: { transformIn: mcSidepanelTransformAnimation[McSidepanelPosition.Right].in } }),
        state('visible', style({ transform: '{{transformOut}}' }), { params: { transformOut: mcSidepanelTransformAnimation[McSidepanelPosition.Right].out } }),
        transition('visible => void, visible => hidden', animate(`200ms ${AnimationCurves.AccelerationCurve}`)),
        transition('void => visible', animate(`200ms ${AnimationCurves.DecelerationCurve}`))
    ])
};

// Counter for unique sidepanel ids.
let uniqueId = 0;
class McSidepanelRef {
    constructor(containerInstance, overlayRef, config) {
        this.containerInstance = containerInstance;
        this.overlayRef = overlayRef;
        this.config = config;
        /** Subject for notifying the user that the sidepanel has been closed and dismissed. */
        this.afterClosed$ = new Subject();
        /** Subject for notifying the user that the sidepanel has opened and appeared. */
        this.afterOpened$ = new Subject();
        this.id = this.config.id || `mc-sidepanel-${uniqueId++}`;
        this.containerInstance.id = this.id;
        // Emit when opening animation completes
        containerInstance.animationStateChanged.pipe(filter((event) => event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Visible), take(1)).subscribe(() => {
            this.afterOpened$.next();
            this.afterOpened$.complete();
        });
        // Dispose overlay when closing animation is complete
        containerInstance.animationStateChanged.pipe(filter((event) => event.phaseName === 'done' && event.toState === McSidepanelAnimationState.Hidden), take(1)).subscribe(() => {
            overlayRef.dispose();
            this.afterClosed$.next(this.result);
            this.afterClosed$.complete();
        });
        if (!containerInstance.sidepanelConfig.disableClose) {
            merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(
            // tslint:disable:deprecation
            // keyCode is deprecated, but IE11 and Edge don't support code property, which we need use instead
            filter((event) => event.keyCode === ESCAPE))).subscribe(() => this.close());
        }
    }
    close(result) {
        if (!this.afterClosed$.closed) {
            // Transition the backdrop in parallel to the sidepanel.
            this.containerInstance.animationStateChanged.pipe(filter((event) => event.phaseName === 'done'), take(1)).subscribe(() => this.overlayRef.detachBackdrop());
            this.result = result;
            this.containerInstance.exit();
        }
    }
    /** Gets an observable that is notified when the sidepanel is finished closing. */
    afterClosed() {
        return this.afterClosed$.asObservable();
    }
    /** Gets an observable that is notified when the sidepanel has opened and appeared. */
    afterOpened() {
        return this.afterOpened$.asObservable();
    }
}

const MC_SIDEPANEL_WITH_INDENT = new InjectionToken('mc-sidepanel-with-indent');
const MC_SIDEPANEL_WITH_SHADOW = new InjectionToken('mc-sidepanel-with-shadow');
class McSidepanelContainerComponent extends BasePortalOutlet {
    constructor(elementRef, changeDetectorRef, sidepanelConfig, withIndent, withShadow) {
        super();
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.sidepanelConfig = sidepanelConfig;
        this.withIndent = withIndent;
        this.withShadow = withShadow;
        /** The state of the sidepanel animations. */
        this.animationState = McSidepanelAnimationState.Void;
        /** Emits whenever the state of the animation changes. */
        this.animationStateChanged = new EventEmitter();
    }
    ngOnDestroy() {
        this.destroyed = true;
    }
    /** Attach a component portal as content to this sidepanel container. */
    attachComponentPortal(portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachComponentPortal(portal);
    }
    /** Attach a template portal as content to this sidepanel container. */
    attachTemplatePortal(portal) {
        this.validatePortalAttached();
        this.setAnimation();
        this.setPanelClass();
        return this.portalOutlet.attachTemplatePortal(portal);
    }
    /** Begin animation of the sidepanel entrance into view. */
    enter() {
        if (this.destroyed) {
            return;
        }
        this.animationState = McSidepanelAnimationState.Visible;
        this.changeDetectorRef.detectChanges();
    }
    /** Begin animation of the sidepanel exiting from view. */
    exit() {
        if (this.destroyed) {
            return;
        }
        this.animationState = McSidepanelAnimationState.Hidden;
        this.changeDetectorRef.markForCheck();
    }
    onAnimation(event) {
        this.animationStateChanged.emit(event);
    }
    setAnimation() {
        const position = this.sidepanelConfig.position;
        this.animationTransform = {
            transformIn: mcSidepanelTransformAnimation[position].in,
            transformOut: mcSidepanelTransformAnimation[position].out
        };
    }
    setPanelClass() {
        const element = this.elementRef.nativeElement;
        const position = this.sidepanelConfig.position;
        element.classList.add(`mc-sidepanel-container_${position}`);
    }
    validatePortalAttached() {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach sidepanel content after content is already attached');
        }
    }
}
/** @nocollapse */ McSidepanelContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelContainerComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: McSidepanelConfig }, { token: MC_SIDEPANEL_WITH_INDENT }, { token: MC_SIDEPANEL_WITH_SHADOW }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McSidepanelContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McSidepanelContainerComponent, selector: "mc-sidepanel-container", host: { listeners: { "@state.start": "onAnimation($event)", "@state.done": "onAnimation($event)" }, properties: { "class.mc-sidepanel_nested": "withIndent", "class.mc-sidepanel-container_shadowed": "withShadow", "attr.id": "id", "attr.tabindex": "-1", "@state": "{\n            value: animationState,\n            params: animationTransform\n        }" }, classAttribute: "mc-sidepanel-container" }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<div class=\"mc-sidepanel-wrapper\">\n\n    <div *ngIf=\"withIndent\" class=\"mc-sidepanel-indent\" (click)=\"exit()\"></div>\n\n    <div class=\"mc-sidepanel-content\" cdkTrapFocus cdkTrapFocusAutoCapture>\n        <ng-template cdkPortalOutlet></ng-template>\n    </div>\n</div>\n", styles: [".mc-no-select{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.mc-sidepanel-container{outline:none;display:flex;flex:1;position:fixed;min-height:0}.mc-sidepanel-container .flex{min-height:0}.mc-sidepanel-container_left,.mc-sidepanel-container_right{width:33%;min-width:400px;height:100%;top:0}.mc-sidepanel-container_left .mc-sidepanel-indent,.mc-sidepanel-container_right .mc-sidepanel-indent{width:16px;height:100%}.mc-sidepanel-container_right{right:0;transform:translate(100%)}.mc-sidepanel-container_right .mc-sidepanel-wrapper{flex-direction:row}.mc-sidepanel-container_left{left:0;transform:translate(-100%)}.mc-sidepanel-container_left .mc-sidepanel-wrapper{flex-direction:row-reverse}.mc-sidepanel-container_top,.mc-sidepanel-container_bottom{flex-direction:column;height:33%;min-height:400px;width:100%;left:0}.mc-sidepanel-container_top .mc-sidepanel-indent,.mc-sidepanel-container_bottom .mc-sidepanel-indent{height:16px;width:100%}.mc-sidepanel-container_top{top:0;transform:translateY(-100%)}.mc-sidepanel-container_top .mc-sidepanel-wrapper{flex-direction:column-reverse}.mc-sidepanel-container_bottom{bottom:0;transform:translateY(100%)}.mc-sidepanel-container_bottom .mc-sidepanel-wrapper{flex-direction:column}.mc-sidepanel-wrapper{display:flex;flex:1;min-height:0;width:100%}.mc-sidepanel-indent{display:flex;flex:0 0 auto}.mc-sidepanel-indent .mc-sidepanel-close{width:100%;height:100%;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;background:transparent;padding:0}.mc-sidepanel-content{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0;width:100%}.mc-sidepanel-header{padding:14px 16px;padding:var(--mc-sidepanel-header-size-padding, 14px 16px);display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-header .mc-sidepanel-close{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;background:transparent;padding:0 0 0 8px;padding:var(--mc-sidepanel-header-size-close-padding, 0 0 0 8px)}.mc-sidepanel-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-sidepanel-body{overflow-y:auto;display:flex;flex:1;flex-direction:column;min-height:0}.mc-sidepanel-footer{padding:16px;padding:var(--mc-sidepanel-footer-size-padding, 16px);display:flex;flex-flow:row nowrap;justify-content:space-between;align-items:center;flex:0 0 auto}.mc-sidepanel-footer .mc-sidepanel-actions{display:flex;align-items:center;flex-direction:row;flex:1}.mc-sidepanel-footer .mc-sidepanel-actions[align=left]{justify-content:start}.mc-sidepanel-footer .mc-sidepanel-actions[align=right]{justify-content:flex-end}.mc-sidepanel-footer button+button{margin-left:16px}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i4.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [mcSidepanelAnimations.sidepanelState], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-sidepanel-container',
                    templateUrl: './sidepanel-container.component.html',
                    styleUrls: ['./sidepanel.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [mcSidepanelAnimations.sidepanelState],
                    host: {
                        class: 'mc-sidepanel-container',
                        '[class.mc-sidepanel_nested]': 'withIndent',
                        '[class.mc-sidepanel-container_shadowed]': 'withShadow',
                        '[attr.id]': 'id',
                        '[attr.tabindex]': '-1',
                        '[@state]': `{
            value: animationState,
            params: animationTransform
        }`,
                        '(@state.start)': 'onAnimation($event)',
                        '(@state.done)': 'onAnimation($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: McSidepanelConfig }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_SIDEPANEL_WITH_INDENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_SIDEPANEL_WITH_SHADOW]
                }] }]; }, propDecorators: { portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }] } });

/** Injection token that can be used to specify default sidepanel options. */
const MC_SIDEPANEL_DEFAULT_OPTIONS = new InjectionToken('mc-sidepanel-default-options');
class McSidepanelService {
    constructor(overlay, injector, defaultOptions, parentSidepanelService) {
        this.overlay = overlay;
        this.injector = injector;
        this.defaultOptions = defaultOptions;
        this.parentSidepanelService = parentSidepanelService;
        this.openedSidepanelsAtThisLevel = [];
    }
    /** Keeps track of the currently-open sidepanels. */
    get openedSidepanels() {
        return this.parentSidepanelService ? this.parentSidepanelService.openedSidepanels :
            this.openedSidepanelsAtThisLevel;
    }
    ngOnDestroy() {
        // Only close the sidepanels at this level on destroy
        // since the parent service may still be active.
        this.closeSidepanels(this.openedSidepanelsAtThisLevel);
    }
    open(componentOrTemplateRef, config) {
        const fullConfig = Object.assign(Object.assign({}, (this.defaultOptions || new McSidepanelConfig())), config);
        if (fullConfig.id && this.getSidepanelById(fullConfig.id)) {
            throw Error(`Sidepanel with id "${fullConfig.id}" exists already. The sidepanel id must be unique.`);
        }
        const overlayRef = this.createOverlay(fullConfig);
        const container = this.attachContainer(overlayRef, fullConfig);
        const ref = new McSidepanelRef(container, overlayRef, fullConfig);
        if (componentOrTemplateRef instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, null, {
                $implicit: fullConfig.data,
                sidepanelRef: ref
            }));
        }
        else {
            const injector = this.createInjector(fullConfig, ref, container);
            const portal = new ComponentPortal(componentOrTemplateRef, undefined, injector);
            const contentRef = container.attachComponentPortal(portal);
            ref.instance = contentRef.instance;
        }
        this.openedSidepanels.push(ref);
        ref.afterClosed()
            .subscribe(() => this.removeOpenSidepanel(ref));
        container.enter();
        return ref;
    }
    /**
     * Closes all of the currently-open sidepanels.
     */
    closeAll() {
        this.closeSidepanels(this.openedSidepanels);
    }
    /**
     * Finds an open sidepanel by its id.
     * @param id ID to use when looking up the sidepanel.
     */
    getSidepanelById(id) {
        return this.openedSidepanels.find((sidepanel) => sidepanel.id === id);
    }
    /**
     * Attaches the sidepanel container component to the overlay.
     */
    attachContainer(overlayRef, config) {
        const openedSidepanelsWithSamePosition = this.getOpenedSidepanelsWithSamePosition(config);
        // tslint:disable-next-line:deprecation
        const injector = new PortalInjector(this.injector, new WeakMap([
            [McSidepanelConfig, config],
            [MC_SIDEPANEL_WITH_INDENT, openedSidepanelsWithSamePosition.length >= 1],
            [MC_SIDEPANEL_WITH_SHADOW, openedSidepanelsWithSamePosition.length < 2] // tslint:disable-line
        ]));
        const containerPortal = new ComponentPortal(McSidepanelContainerComponent, undefined, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    /**
     * Creates a custom injector to be used inside the sidepanel. This allows a component loaded inside
     * of a sidepanel to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the sidepanel.
     * @param sidepanelRef Reference to the sidepanel.
     * @param sidepanelContainer Sidepanel container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the sidepanel.
     */
    createInjector(config, sidepanelRef, 
    // tslint:disable-next-line:deprecation
    sidepanelContainer) {
        // The McSidepanelContainerComponent is injected in the portal as the McSidepanelContainerComponent and
        // the sidepanel's content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the McSidepanelContainerComponent is explicitly
        // added to the injection tokens.
        const injectionTokens = new WeakMap([
            [McSidepanelContainerComponent, sidepanelContainer],
            [MC_SIDEPANEL_DATA, config.data],
            [McSidepanelRef, sidepanelRef]
        ]);
        // tslint:disable-next-line:deprecation
        return new PortalInjector(this.injector, injectionTokens);
    }
    /**
     * Creates a new overlay and places it in the correct location.
     * @param config The user-specified sidepanel config.
     */
    createOverlay(config) {
        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: this.getBackdropClass(config),
            maxWidth: '100%',
            panelClass: config.overlayPanelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global()
        });
        return this.overlay.create(overlayConfig);
    }
    closeSidepanels(sidepanels) {
        const reversedOpenedSidepanels = [...sidepanels.reverse()];
        reversedOpenedSidepanels.forEach((sidepanelRef) => {
            sidepanelRef.close();
        });
    }
    getBackdropClass(config) {
        if (config.hasBackdrop && config.backdropClass) {
            return config.backdropClass;
        }
        const hasOpenedSidepanelWithBackdrop = this.openedSidepanels.some((sidepanelRef) => sidepanelRef.config.hasBackdrop);
        return config.requiredBackdrop || !hasOpenedSidepanelWithBackdrop ? 'cdk-overlay-dark-backdrop' :
            'cdk-overlay-transparent-backdrop';
    }
    getOpenedSidepanelsWithSamePosition(config) {
        return this.openedSidepanels.filter((sidepanelRef) => sidepanelRef.config.position === config.position);
    }
    /**
     * Removes a sidepanel from the array of open sidepanels.
     * @param sidepanelRef Sidepanel to be removed.
     */
    removeOpenSidepanel(sidepanelRef) {
        const index = this.openedSidepanels.indexOf(sidepanelRef);
        if (index > -1) {
            this.openedSidepanels.splice(index, 1);
        }
    }
}
/** @nocollapse */ McSidepanelService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: MC_SIDEPANEL_DEFAULT_OPTIONS, optional: true }, { token: McSidepanelService, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ McSidepanelService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: McSidepanelConfig, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_SIDEPANEL_DEFAULT_OPTIONS]
                }] }, { type: McSidepanelService, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }]; } });

/**
 * Button that will close the current sidepanel.
 */
class McSidepanelClose {
    constructor(sidepanelRef, elementRef, sidepanelService) {
        this.sidepanelRef = sidepanelRef;
        this.elementRef = elementRef;
        this.sidepanelService = sidepanelService;
    }
    ngOnInit() {
        if (!this.sidepanelRef) {
            // When this directive is included in a sidepanel via TemplateRef (rather than being
            // in a Component), the SidepanelRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the SidepanelRef by
            // ID.
            // This must occur in `onInit`, as the ID binding for the sidepanel container won't
            // be resolved at constructor time. We use setTimeout by same reason.
            setTimeout(() => {
                this.sidepanelRef = getClosestSidepanel(this.elementRef, this.sidepanelService.openedSidepanels);
            });
        }
    }
    ngOnChanges(changes) {
        const proxiedChange = changes.mcSidepanelClose || changes.sidepanelResult;
        if (proxiedChange) {
            this.sidepanelResult = proxiedChange.currentValue;
        }
    }
}
/** @nocollapse */ McSidepanelClose.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelClose, deps: [{ token: McSidepanelRef, optional: true }, { token: i0.ElementRef }, { token: McSidepanelService }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McSidepanelClose.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McSidepanelClose, selector: "button[mc-sidepanel-close], button[mcSidepanelClose]", inputs: { sidepanelResult: ["mc-sidepanel-close", "sidepanelResult"], mcSidepanelClose: "mcSidepanelClose" }, host: { listeners: { "click": "sidepanelRef.close(sidepanelResult)" }, classAttribute: "mc-sidepanel-close" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelClose, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mc-sidepanel-close], button[mcSidepanelClose]',
                    host: {
                        '(click)': 'sidepanelRef.close(sidepanelResult)',
                        class: 'mc-sidepanel-close'
                    }
                }]
        }], ctorParameters: function () { return [{ type: McSidepanelRef, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: McSidepanelService }]; }, propDecorators: { sidepanelResult: [{
                type: Input,
                args: ['mc-sidepanel-close']
            }], mcSidepanelClose: [{
                type: Input,
                args: ['mcSidepanelClose']
            }] } });
/**
 * Header of a sidepanel.
 */
class McSidepanelHeader {
    constructor() {
        this.themePalette = ThemePalette;
    }
}
/** @nocollapse */ McSidepanelHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McSidepanelHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: McSidepanelHeader, selector: "mc-sidepanel-header", inputs: { closeable: "closeable" }, host: { classAttribute: "mc-sidepanel-header" }, ngImport: i0, template: `
        <div class="mc-sidepanel-title">
            <ng-content></ng-content>
        </div>
        <button *ngIf="closeable" mc-sidepanel-close>
            <span class="mc-sidepanel-close-x">
                <i mc-icon="mc-close-L_16" class="mc-icon mc-icon_light" [color]="themePalette.Primary"></i>
            </span>
        </button>
    `, isInline: true, components: [{ type: i3$1.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: McSidepanelClose, selector: "button[mc-sidepanel-close], button[mcSidepanelClose]", inputs: ["mc-sidepanel-close", "mcSidepanelClose"] }, { type: i3$1.McIconCSSStyler, selector: "[mc-icon]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-sidepanel-header',
                    template: `
        <div class="mc-sidepanel-title">
            <ng-content></ng-content>
        </div>
        <button *ngIf="closeable" mc-sidepanel-close>
            <span class="mc-sidepanel-close-x">
                <i mc-icon="mc-close-L_16" class="mc-icon mc-icon_light" [color]="themePalette.Primary"></i>
            </span>
        </button>
    `,
                    host: {
                        class: 'mc-sidepanel-header'
                    }
                }]
        }], propDecorators: { closeable: [{
                type: Input
            }] } });
/**
 * Scrollable content container of a sidepanel.
 */
class McSidepanelBody {
}
/** @nocollapse */ McSidepanelBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelBody, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McSidepanelBody.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McSidepanelBody, selector: "mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody", host: { classAttribute: "mc-sidepanel-body" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelBody, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody',
                    host: {
                        class: 'mc-sidepanel-body'
                    }
                }]
        }] });
/**
 * Footer of a sidepanel.
 */
class McSidepanelFooter {
}
/** @nocollapse */ McSidepanelFooter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelFooter, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McSidepanelFooter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McSidepanelFooter, selector: "mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter", host: { classAttribute: "mc-sidepanel-footer" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelFooter, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter',
                    host: {
                        class: 'mc-sidepanel-footer'
                    }
                }]
        }] });
/**
 * Actions block of a sidepanel footer.
 */
class McSidepanelActions {
}
/** @nocollapse */ McSidepanelActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McSidepanelActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McSidepanelActions, selector: "mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions", host: { classAttribute: "mc-sidepanel-actions" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelActions, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions',
                    host: {
                        class: 'mc-sidepanel-actions'
                    }
                }]
        }] });
/**
 * Finds the closest McSidepanelRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a sidepanel.
 * @param openSidepanels References to the currently-open sidepanels.
 */
function getClosestSidepanel(element, openSidepanels) {
    let parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mc-sidepanel-container')) {
        parent = parent.parentElement;
    }
    return parent ? openSidepanels.find((sidepanel) => sidepanel.id === parent.id) : null;
}

class McSidepanelModule {
}
/** @nocollapse */ McSidepanelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McSidepanelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelModule, declarations: [McSidepanelContainerComponent,
        McSidepanelClose,
        McSidepanelHeader,
        McSidepanelBody,
        McSidepanelFooter,
        McSidepanelActions], imports: [CommonModule,
        OverlayModule,
        PortalModule,
        McCommonModule,
        McButtonModule,
        McIconModule,
        A11yModule], exports: [McSidepanelContainerComponent,
        McSidepanelClose,
        McSidepanelHeader,
        McSidepanelBody,
        McSidepanelFooter,
        McSidepanelActions] });
/** @nocollapse */ McSidepanelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelModule, providers: [McSidepanelService], imports: [[
            CommonModule,
            OverlayModule,
            PortalModule,
            McCommonModule,
            McButtonModule,
            McIconModule,
            A11yModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McSidepanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        PortalModule,
                        McCommonModule,
                        McButtonModule,
                        McIconModule,
                        A11yModule
                    ],
                    providers: [McSidepanelService],
                    declarations: [
                        McSidepanelContainerComponent,
                        McSidepanelClose,
                        McSidepanelHeader,
                        McSidepanelBody,
                        McSidepanelFooter,
                        McSidepanelActions
                    ],
                    entryComponents: [McSidepanelContainerComponent],
                    exports: [
                        McSidepanelContainerComponent,
                        McSidepanelClose,
                        McSidepanelHeader,
                        McSidepanelBody,
                        McSidepanelFooter,
                        McSidepanelActions
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MC_SIDEPANEL_DATA, MC_SIDEPANEL_DEFAULT_OPTIONS, MC_SIDEPANEL_WITH_INDENT, MC_SIDEPANEL_WITH_SHADOW, McSidepanelActions, McSidepanelBody, McSidepanelClose, McSidepanelConfig, McSidepanelContainerComponent, McSidepanelFooter, McSidepanelHeader, McSidepanelModule, McSidepanelPosition, McSidepanelRef, McSidepanelService };
//# sourceMappingURL=ptsecurity-mosaic-sidepanel.js.map

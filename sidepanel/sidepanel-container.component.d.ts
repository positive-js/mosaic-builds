import { AnimationEvent } from '@angular/animations';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, EmbeddedViewRef, EventEmitter, InjectionToken, OnDestroy } from '@angular/core';
import { McSidepanelAnimationState } from './sidepanel-animations';
import { McSidepanelConfig } from './sidepanel-config';
export declare const MC_SIDEPANEL_WITH_INDENT: InjectionToken<boolean>;
export declare const MC_SIDEPANEL_WITH_SHADOW: InjectionToken<boolean>;
export declare class McSidepanelContainerComponent extends BasePortalOutlet implements OnDestroy {
    private elementRef;
    private changeDetectorRef;
    sidepanelConfig: McSidepanelConfig;
    withIndent: boolean;
    withShadow: boolean;
    /** ID for the container DOM element. */
    id: string;
    /** The portal outlet inside of this container into which the content will be loaded. */
    portalOutlet: CdkPortalOutlet;
    /** The state of the sidepanel animations. */
    animationState: McSidepanelAnimationState;
    animationTransform: {
        transformIn: string;
        transformOut: string;
    };
    /** Emits whenever the state of the animation changes. */
    animationStateChanged: EventEmitter<AnimationEvent>;
    /** Whether the component has been destroyed. */
    private destroyed;
    constructor(elementRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, sidepanelConfig: McSidepanelConfig, withIndent: boolean, withShadow: boolean);
    ngOnDestroy(): void;
    /** Attach a component portal as content to this sidepanel container. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    /** Attach a template portal as content to this sidepanel container. */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    /** Begin animation of the sidepanel entrance into view. */
    enter(): void;
    /** Begin animation of the sidepanel exiting from view. */
    exit(): void;
    onAnimation(event: AnimationEvent): void;
    private setAnimation;
    private setPanelClass;
    private validatePortalAttached;
}

import { AnimationTriggerMetadata } from '@angular/animations';
import { McSidepanelPosition } from './sidepanel-config';
export declare enum McSidepanelAnimationState {
    Void = "void",
    Visible = "visible",
    Hidden = "hidden"
}
export declare const mcSidepanelTransformAnimation: Record<McSidepanelPosition, {
    in: string;
    out: string;
}>;
export declare const mcSidepanelAnimations: {
    readonly sidepanelState: AnimationTriggerMetadata;
};

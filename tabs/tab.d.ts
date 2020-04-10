import { TemplatePortal } from '@angular/cdk/portal';
import { OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { CanDisable, CanDisableCtor } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McTabLabel } from './tab-label';
export declare class McTabBase {
}
export declare const McTabMixinBase: CanDisableCtor & typeof McTabBase;
export declare class McTab extends McTabMixinBase implements OnInit, CanDisable, OnChanges, OnDestroy {
    private viewContainerRef;
    /** @docs-private */
    get content(): TemplatePortal | null;
    /** Content for the tab label given by `<ng-template mc-tab-label>`. */
    templateLabel: McTabLabel;
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     */
    explicitContent: TemplateRef<any>;
    /** Template inside the McTab view that contains an `<ng-content>`. */
    implicitContent: TemplateRef<any>;
    /** Plain text label for the tab, used when there is no template label. */
    textLabel: string;
    tabId: string;
    /** Aria label for the tab. */
    ariaLabel: string;
    /**
     * Reference to the element that the tab is labelled by.
     * Will be cleared if `aria-label` is set at the same time.
     */
    ariaLabelledby: string;
    /** Emits whenever the internal state of the tab changes. */
    readonly stateChanges: Subject<void>;
    /**
     * The relatively indexed position where 0 represents the center, negative is left, and positive
     * represents the right.
     */
    position: number | null;
    /**
     * The initial relatively index origin of the tab if it was created and selected after there
     * was already a selected tab. Provides context of what position the tab should originate from.
     */
    origin: number | null;
    /**
     * Whether the tab is currently active.
     */
    isActive: boolean;
    /** Portal that will be the hosted content of the tab */
    private contentPortal;
    constructor(viewContainerRef: ViewContainerRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
}

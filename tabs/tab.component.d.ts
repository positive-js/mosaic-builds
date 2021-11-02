import { TemplatePortal } from '@angular/cdk/portal';
import { OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { CanDisable, CanDisableCtor, PopUpPlacements } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { McTabLabel } from './tab-label.directive';
import * as i0 from "@angular/core";
export declare class McTabBase {
}
export declare const McTabMixinBase: CanDisableCtor & typeof McTabBase;
export declare class McTab extends McTabMixinBase implements OnInit, CanDisable, OnChanges, OnDestroy {
    private readonly viewContainerRef;
    /** @docs-private */
    get content(): TemplatePortal | null;
    get templateLabel(): McTabLabel;
    set templateLabel(value: McTabLabel);
    private _templateLabel;
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     */
    explicitContent: TemplateRef<any>;
    /** Template inside the McTab view that contains an `<ng-content>`. */
    implicitContent: TemplateRef<any>;
    get tooltipTitle(): string;
    set tooltipTitle(value: string);
    private _tooltipTitle;
    tooltipPlacement: PopUpPlacements;
    /** Plain text label for the tab, used when there is no template label. */
    textLabel: string;
    empty: boolean;
    tabId: string;
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
    get isOverflown(): boolean;
    get overflowTooltipTitle(): string;
    set overflowTooltipTitle(value: string);
    private _overflowTooltipTitle;
    /** Portal that will be the hosted content of the tab */
    private contentPortal;
    constructor(viewContainerRef: ViewContainerRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    protected setTemplateLabelInput(value: McTabLabel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McTab, "mc-tab", ["mcTab"], { "disabled": "disabled"; "tooltipTitle": "tooltipTitle"; "tooltipPlacement": "tooltipPlacement"; "textLabel": "label"; "empty": "empty"; "tabId": "tabId"; }, {}, ["templateLabel", "explicitContent"], ["*"]>;
}

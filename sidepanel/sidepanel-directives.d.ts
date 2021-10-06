import { ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { McSidepanelRef } from './sidepanel-ref';
import { McSidepanelService } from './sidepanel.service';
import * as i0 from "@angular/core";
/**
 * Button that will close the current sidepanel.
 */
export declare class McSidepanelClose implements OnInit, OnChanges {
    sidepanelRef: McSidepanelRef;
    private elementRef;
    private sidepanelService;
    sidepanelResult: any;
    mcSidepanelClose: any;
    constructor(sidepanelRef: McSidepanelRef, elementRef: ElementRef<HTMLElement>, sidepanelService: McSidepanelService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidepanelClose, [{ optional: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McSidepanelClose, "button[mc-sidepanel-close], button[mcSidepanelClose]", never, { "sidepanelResult": "mc-sidepanel-close"; "mcSidepanelClose": "mcSidepanelClose"; }, {}, never>;
}
/**
 * Header of a sidepanel.
 */
export declare class McSidepanelHeader {
    closeable: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidepanelHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McSidepanelHeader, "mc-sidepanel-header", never, { "closeable": "closeable"; }, {}, never, ["*"]>;
}
/**
 * Scrollable content container of a sidepanel.
 */
export declare class McSidepanelBody {
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidepanelBody, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McSidepanelBody, "mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody", never, {}, {}, never>;
}
/**
 * Footer of a sidepanel.
 */
export declare class McSidepanelFooter {
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidepanelFooter, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McSidepanelFooter, "mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter", never, {}, {}, never>;
}
/**
 * Actions block of a sidepanel footer.
 */
export declare class McSidepanelActions {
    static ɵfac: i0.ɵɵFactoryDeclaration<McSidepanelActions, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McSidepanelActions, "mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions", never, {}, {}, never>;
}

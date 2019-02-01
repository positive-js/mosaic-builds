import { ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { McSidepanelRef } from './sidepanel-ref';
import { McSidepanelService } from './sidepanel.service';
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
}
/**
 * Header of a sidepanel.
 */
export declare class McSidepanelHeader {
    closeable: boolean;
}
/**
 * Scrollable content container of a sidepanel.
 */
export declare class McSidepanelBody {
}
/**
 * Footer of a sidepanel.
 */
export declare class McSidepanelFooter {
}
/**
 * Actions block of a sidepanel footer.
 */
export declare class McSidepanelActions {
}

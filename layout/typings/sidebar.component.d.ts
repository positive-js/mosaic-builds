import { EventEmitter, OnInit } from '@angular/core';
import { McLayoutComponent } from './layout.component';
export declare class McSidebarComponent implements OnInit {
    private mcLayoutComponent;
    _mcWidth: number;
    mcCollapsedWidth: number;
    mcCollapsible: boolean;
    mcCollapsed: boolean;
    mcCollapsedChange: EventEmitter<{}>;
    private collapsed;
    private collapsible;
    readonly mcFlex: string;
    readonly mcWidth: number;
    constructor(mcLayoutComponent: McLayoutComponent);
    ngOnInit(): void;
}

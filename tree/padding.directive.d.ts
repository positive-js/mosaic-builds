import { OnInit } from '@angular/core';
import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';
export declare class McTreeNodePadding<T> extends CdkTreeNodePadding<T> implements OnInit {
    level: number;
    indent: number;
    baseLeftPadding: number;
    _indent: number;
    withIcon: boolean;
    iconWidth: number;
    get leftPadding(): number;
    paddingIndent(): string | null;
    ngOnInit(): void;
}

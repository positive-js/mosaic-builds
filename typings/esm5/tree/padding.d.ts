import { OnInit } from '@angular/core';
import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';
export declare class McTreeNodePadding<T> extends CdkTreeNodePadding<T> implements OnInit {
    readonly leftPadding: number;
    _baseLeftPadding: number;
    _iconWidth: number;
    _indent: number;
    level: number;
    indent: number;
    _withIcon: boolean;
    _paddingIndent(): string | null;
    ngOnInit(): void;
}

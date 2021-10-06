import { OnInit } from '@angular/core';
import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';
import * as i0 from "@angular/core";
export declare class McTreeNodePadding<T> extends CdkTreeNodePadding<T> implements OnInit {
    get level(): number;
    set level(value: number);
    get indent(): number | string;
    set indent(indent: number | string);
    baseLeftPadding: number;
    withIcon: boolean;
    iconWidth: number;
    get leftPadding(): number;
    paddingIndent(): string | null;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McTreeNodePadding<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<McTreeNodePadding<any>, "[mcTreeNodePadding]", never, { "level": "mcTreeNodePadding"; "indent": "mcTreeNodePaddingIndent"; }, {}, never>;
}

import { AfterContentInit } from '@angular/core';
import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';
import { McIcon } from '@ptsecurity/mosaic/icon';
/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
export declare class McTreeNodePadding<T> extends CdkTreeNodePadding<T> implements AfterContentInit {
    readonly leftPadding: number;
    _baseLeftPadding: number;
    _iconWidth: number;
    _indent: number;
    /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
    level: number;
    /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
    indent: number;
    _innerIcon: McIcon;
    _paddingIndent(): string | null;
    ngAfterContentInit(): void;
}

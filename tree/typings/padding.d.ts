import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';
/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
export declare class McTreeNodePadding<T> extends CdkTreeNodePadding<T> {
    /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
    level: number;
    /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
    indent: number;
    _paddingIndent(): string | null;
}

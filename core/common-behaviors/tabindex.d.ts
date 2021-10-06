import { AbstractConstructor, Constructor } from './constructor';
import { CanDisable } from './disabled';
export interface HasTabIndex {
    tabIndex: number;
}
export declare type HasTabIndexCtor = Constructor<HasTabIndex> & AbstractConstructor<HasTabIndex>;
/** Mixin to augment a directive with a `tabIndex` property. */
export declare function mixinTabIndex<T extends AbstractConstructor<CanDisable>>(base: T, defaultTabIndex?: number): HasTabIndexCtor & T;

import { AbstractConstructor, Constructor } from './constructor';
import { CanDisable } from './disabled';
export interface HasTabIndex {
    tabIndex: number;
}
export declare type HasTabIndexCtor = Constructor<HasTabIndex>;
export declare function mixinTabIndex<T extends AbstractConstructor<CanDisable>>(base: T, defaultTabIndex?: number): HasTabIndexCtor & T;

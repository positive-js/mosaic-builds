import { Constructor } from './constructor';
import { CanDisable } from './disabled';
export interface HasTabIndex {
    tabIndex: number;
}
export declare function mixinTabIndex<T extends Constructor<CanDisable>>(base: T, defaultTabIndex?: number): Constructor<HasTabIndex> & T;

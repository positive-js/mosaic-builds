import { Constructor } from './constructor';
export interface CanDisable {
    disabled: boolean;
}
/** @docs-private */
export declare type CanDisableCtor = Constructor<CanDisable>;
export declare function mixinDisabled<T extends Constructor<{}>>(base: T): CanDisableCtor & T;

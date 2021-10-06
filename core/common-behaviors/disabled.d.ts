import { AbstractConstructor, Constructor } from './constructor';
export interface CanDisable {
    disabled: boolean;
}
/** @docs-private */
export declare type CanDisableCtor = Constructor<CanDisable> & AbstractConstructor<CanDisable>;
/** Mixin to augment a directive with a `disabled` property. */
export declare function mixinDisabled<T extends AbstractConstructor<{}>>(base: T): CanDisableCtor & T;

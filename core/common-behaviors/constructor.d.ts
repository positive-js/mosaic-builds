/** @docs-private */
export declare type Constructor<T> = new (...args: any[]) => T;
/**
 * This is a permissive type for abstract class constructors.
 * @docs-private
 */
export declare type AbstractConstructor<T> = Function & {
    prototype: T;
};

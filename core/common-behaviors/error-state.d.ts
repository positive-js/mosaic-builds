import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ErrorStateMatcher } from '../error/error-options';
import { Constructor } from './constructor';
/** @docs-private */
export interface CanUpdateErrorState {
    readonly stateChanges: Subject<void>;
    errorState: boolean;
    errorStateMatcher: ErrorStateMatcher;
    updateErrorState(): any;
}
/** @docs-private */
export declare type CanUpdateErrorStateCtor = Constructor<CanUpdateErrorState>;
/** @docs-private */
export interface HasErrorState {
    parentFormGroup: FormGroupDirective;
    parentForm: NgForm;
    defaultErrorStateMatcher: ErrorStateMatcher;
    ngControl: NgControl;
}
/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 */
export declare function mixinErrorState<T extends Constructor<HasErrorState>>(base: T): CanUpdateErrorStateCtor & T;

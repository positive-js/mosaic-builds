import { EventEmitter } from '@angular/core';
export declare class McStepper {
    readonly stepUp: EventEmitter<void>;
    readonly stepDown: EventEmitter<void>;
    onStepUp($event: MouseEvent): void;
    onStepDown($event: MouseEvent): void;
}

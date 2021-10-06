import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class McStepper {
    readonly stepUp: EventEmitter<void>;
    readonly stepDown: EventEmitter<void>;
    connectTo(numberInput: any): void;
    onStepUp($event: MouseEvent): void;
    onStepDown($event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<McStepper, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<McStepper, "mc-stepper", never, {}, { "stepUp": "stepUp"; "stepDown": "stepDown"; }, never, never>;
}

import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CssUnitPipe implements PipeTransform {
    transform(value: number | string, defaultUnit?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CssUnitPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CssUnitPipe, "toCssUnit">;
}

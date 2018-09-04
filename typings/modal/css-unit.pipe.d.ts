import { PipeTransform } from '@angular/core';
export declare class CssUnitPipe implements PipeTransform {
    transform(value: number | string, defaultUnit?: string): string;
}

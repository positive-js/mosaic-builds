import { Migration } from '@angular/cdk/schematics';
import * as ts from 'typescript';
export declare class SecondaryEntryPointsMigration extends Migration<null> {
    printer: ts.Printer;
    enabled: boolean;
    visitNode(declaration: ts.Node): void;
}

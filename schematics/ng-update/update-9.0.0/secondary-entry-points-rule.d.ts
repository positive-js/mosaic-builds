import { MigrationRule } from '@angular/cdk/schematics';
import * as ts from 'typescript';
export declare class SecondaryEntryPointsRule extends MigrationRule<null> {
    printer: ts.Printer;
    ruleEnabled: boolean;
    visitNode(declaration: ts.Node): void;
}

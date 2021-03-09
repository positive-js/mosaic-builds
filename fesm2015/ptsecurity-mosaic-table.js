import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Directive, NgModule } from '@angular/core';

class McTable {
}
McTable.decorators = [
    { type: Directive, args: [{
                selector: 'table[mc-table]',
                host: {
                    class: 'mc-table'
                }
            },] }
];

class McTableModule {
}
McTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    A11yModule,
                    PlatformModule
                ],
                exports: [McTable],
                declarations: [McTable]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { McTable, McTableModule };
//# sourceMappingURL=ptsecurity-mosaic-table.js.map

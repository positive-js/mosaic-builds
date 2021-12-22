import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, NgModule } from '@angular/core';

class McTable {
}
/** @nocollapse */ /** @nocollapse */ McTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTable, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTable.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McTable, selector: "table[mc-table]", host: { classAttribute: "mc-table" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTable, decorators: [{
            type: Directive,
            args: [{
                    selector: 'table[mc-table]',
                    host: {
                        class: 'mc-table'
                    }
                }]
        }] });

class McTableModule {
}
/** @nocollapse */ /** @nocollapse */ McTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTableModule, declarations: [McTable], imports: [CommonModule,
        A11yModule,
        PlatformModule], exports: [McTable] });
/** @nocollapse */ /** @nocollapse */ McTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTableModule, imports: [[
            CommonModule,
            A11yModule,
            PlatformModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        PlatformModule
                    ],
                    exports: [McTable],
                    declarations: [McTable]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { McTable, McTableModule };
//# sourceMappingURL=ptsecurity-mosaic-table.mjs.map

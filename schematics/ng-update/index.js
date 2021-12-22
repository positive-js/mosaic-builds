"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateToV9 = void 0;
const schematics_1 = require("@angular/cdk/schematics");
const chalk_1 = require("chalk");
const secondary_entry_points_migration_1 = require("./update-9.0.0/secondary-entry-points-migration");
const upgrade_data_1 = require("./upgrade-data");
const mosaicMigrations = [
    // @ts-ignore
    secondary_entry_points_migration_1.SecondaryEntryPointsMigration
];
function updateToV9() {
    return (0, schematics_1.createMigrationSchematicRule)(schematics_1.TargetVersion.V9, mosaicMigrations, upgrade_data_1.mosaicUpgradeData, onMigrationComplete);
}
exports.updateToV9 = updateToV9;
function onMigrationComplete(context, targetVersion, hasFailures) {
    context.logger.info((0, chalk_1.green)(`Updated Mosaic to ${targetVersion}`));
    if (hasFailures) {
        context.logger.warn((0, chalk_1.yellow)(' Some issues were detected but could not be fixed automatically. Please check the ' +
            'output above and fix these issues manually.'));
    }
}
//# sourceMappingURL=index.js.map
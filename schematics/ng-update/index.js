"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular/cdk/schematics");
const chalk_1 = require("chalk");
const secondary_entry_points_rule_1 = require("./update-9.0.0/secondary-entry-points-rule");
const upgrade_data_1 = require("./upgrade-data");
const mosaicMigrationRules = [
    secondary_entry_points_rule_1.SecondaryEntryPointsRule
];
function updateToV9() {
    return schematics_1.createUpgradeRule(schematics_1.TargetVersion.V9, mosaicMigrationRules, upgrade_data_1.mosaicUpgradeData, onMigrationComplete);
}
exports.updateToV9 = updateToV9;
function onMigrationComplete(context, targetVersion, hasFailures) {
    context.logger.info(chalk_1.green(`Updated Mosaic to ${targetVersion}`));
    if (hasFailures) {
        context.logger.warn(chalk_1.yellow(' Some issues were detected but could not be fixed automatically. Please check the ' +
            'output above and fix these issues manually.'));
    }
}
//# sourceMappingURL=index.js.map
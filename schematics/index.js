"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks");
const package_config_1 = require("./package-config");
const version_names_1 = require("./version-names");
function default_1(options) {
    return (host, context) => {
        const ngCoreVersionTag = package_config_1.getPackageVersionFromPackageJson(host, '@angular/core');
        const angularDependencyVersion = ngCoreVersionTag || version_names_1.requiredAngularVersionRange;
        package_config_1.addPackageToPackageJson(host, '@angular/cdk', angularDependencyVersion);
        package_config_1.addPackageToPackageJson(host, '@angular/forms', angularDependencyVersion);
        package_config_1.addPackageToPackageJson(host, '@angular/animations', angularDependencyVersion);
        package_config_1.addPackageToPackageJson(host, '@ptsecurity/cdk', `~${version_names_1.mosaicVersion}`);
        package_config_1.addPackageToPackageJson(host, '@ptsecurity/mosaic', `~${version_names_1.mosaicVersion}`);
        const installTaskId = context.addTask(new tasks_1.NodePackageInstallTask());
        context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map
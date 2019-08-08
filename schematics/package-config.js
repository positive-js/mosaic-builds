"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortObjectByKeys(obj) {
    return Object.keys(obj).sort().reduce((result, key) => (result[key] = obj[key]) && result, {});
}
function getPackageVersionFromPackageJson(tree, name) {
    if (!tree.exists('package.json')) {
        return null;
    }
    const packageJson = JSON.parse(tree.read('package.json').toString('utf8'));
    if (packageJson.dependencies && packageJson.dependencies[name]) {
        return packageJson.dependencies[name];
    }
    return null;
}
exports.getPackageVersionFromPackageJson = getPackageVersionFromPackageJson;
function addPackageToPackageJson(host, pkg, version) {
    if (host.exists('package.json')) {
        const sourceText = host.read('package.json').toString('utf-8');
        const json = JSON.parse(sourceText);
        if (!json.dependencies) {
            json.dependencies = {};
        }
        if (!json.dependencies[pkg]) {
            json.dependencies[pkg] = version;
            json.dependencies = sortObjectByKeys(json.dependencies);
        }
        host.overwrite('package.json', JSON.stringify(json, null, 4));
    }
    return host;
}
exports.addPackageToPackageJson = addPackageToPackageJson;
//# sourceMappingURL=package-config.js.map
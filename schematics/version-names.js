"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Name of the Mosaic version that is shipped together with the schematics. */
exports.mosaicVersion = loadPackageVersionGracefully('@ptsecurity/cdk') ||
    loadPackageVersionGracefully('@ptsecurity/mosaic');
/**
 * Range of Angular versions that can be used together with the Mosaic version
 * that provides these schematics.
 */
exports.requiredAngularVersionRange = '0.0.0-NG';
exports.angularCDKVersion = '^8.0.0';
/** Loads the full version from the given Angular package gracefully. */
function loadPackageVersionGracefully(packageName) {
    try {
        // tslint:disable-next-line:non-literal-require
        return require(`${packageName}/package.json`).version;
    }
    catch (_a) {
        return null;
    }
}
//# sourceMappingURL=version-names.js.map
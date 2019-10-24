"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const config_1 = require("@schematics/angular/utility/config");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const chalk_1 = require("chalk");
const roboto_fonts_1 = require("./fonts/roboto-fonts");
const theming_1 = require("./theming/theming");
/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.module
 */
// tslint:disable-next-line:no-default-export
function default_1(options) {
    return schematics_1.chain([
        schematics_1.noop(),
        addAnimationsModule(options),
        theming_1.addThemeToAppStyles(options),
        roboto_fonts_1.addRobotoFonts(options),
        addMosaicAppStyles(options)
    ]);
}
exports.default = default_1;
/** Name of the Angular module that enables Angular browser animations. */
const browserAnimationsModuleName = 'BrowserAnimationsModule';
/** Name of the module that switches Angular animations to a noop implementation. */
const noopAnimationsModuleName = 'NoopAnimationsModule';
function addAnimationsModule(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const appModulePath = ng_ast_utils_1.getAppModulePath(host, schematics_2.getProjectMainFile(project));
        if (options.animations) {
            if (schematics_2.hasNgModuleImport(host, appModulePath, noopAnimationsModuleName)) {
                console.warn(chalk_1.default.red(`Could not set up "${chalk_1.default.bold(browserAnimationsModuleName)}" ` +
                    `because "${chalk_1.default.bold(noopAnimationsModuleName)}" is already imported. Please manually ` +
                    `set up browser animations.`));
                return;
            }
            schematics_2.addModuleImportToRootModule(host, browserAnimationsModuleName, '@angular/platform-browser/animations', project);
        }
        else if (!schematics_2.hasNgModuleImport(host, appModulePath, browserAnimationsModuleName)) {
            // Do not add the NoopAnimationsModule module if the project already explicitly uses
            // the BrowserAnimationsModule.
            schematics_2.addModuleImportToRootModule(host, noopAnimationsModuleName, '@angular/platform-browser/animations', project);
        }
        return host;
    };
}
function addMosaicAppStyles(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const styleFilePath = schematics_2.getProjectStyleFile(project);
        if (!styleFilePath) {
            console.warn(chalk_1.default.red(`Could not find the default style file for this project.`));
            console.warn(chalk_1.default.red(`Please consider manually setting up the Roboto font in your CSS.`));
            return;
        }
        const buffer = host.read(styleFilePath);
        if (!buffer) {
            console.warn(chalk_1.default.red(`Could not read the default style file within the project ` +
                `(${chalk_1.default.italic(styleFilePath)})`));
            console.warn(chalk_1.default.red(`Please consider manually setting up the Robot font.`));
            return;
        }
        const htmlContent = buffer.toString();
        // tslint:disable-next-line:prefer-template
        const insertion = '\n' +
            `html, body { height: 100%; }\n` +
            `body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }\n`;
        if (htmlContent.includes(insertion)) {
            return;
        }
        const recorder = host.beginUpdate(styleFilePath);
        recorder.insertLeft(htmlContent.length, insertion);
        host.commitUpdate(recorder);
    };
}
//# sourceMappingURL=setup-project.js.map
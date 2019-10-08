"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular/cdk/schematics");
const config_1 = require("@schematics/angular/utility/config");
// TODO: add Roboto Fonts
function addRobotoFonts(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = schematics_1.getProjectFromWorkspace(workspace, options.project);
        return host;
    };
}
exports.addRobotoFonts = addRobotoFonts;
//# sourceMappingURL=roboto-fonts.js.map
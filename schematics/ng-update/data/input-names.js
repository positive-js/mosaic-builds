"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputNames = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.inputNames = {
    [schematics_1.TargetVersion.V9]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'min-time',
                    replaceWith: 'min',
                    limitedTo: {
                        attributes: ['mcTimepicker']
                    }
                },
                {
                    replace: 'max-time',
                    replaceWith: 'max',
                    limitedTo: {
                        attributes: ['mcTimepicker']
                    }
                },
                {
                    replace: 'time-format',
                    replaceWith: 'format',
                    limitedTo: {
                        attributes: ['mcTimepicker']
                    }
                }
            ]
        }
    ]
};
//# sourceMappingURL=input-names.js.map
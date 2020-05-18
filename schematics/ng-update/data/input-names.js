"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular/cdk/schematics");
exports.inputNames = {
    [schematics_1.TargetVersion.V9]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'min-time',
                    replaceWith: 'min',
                    whitelist: {
                        attributes: ['mcTimepicker']
                    }
                },
                {
                    replace: 'max-time',
                    replaceWith: 'max',
                    whitelist: {
                        attributes: ['mcTimepicker']
                    }
                },
                {
                    replace: 'time-format',
                    replaceWith: 'format',
                    whitelist: {
                        attributes: ['mcTimepicker']
                    }
                }
            ]
        }
    ]
};
//# sourceMappingURL=input-names.js.map
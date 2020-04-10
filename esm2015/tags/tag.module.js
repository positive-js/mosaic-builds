/**
 * @fileoverview added by tsickle
 * Generated from: tag.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ENTER } from '@ptsecurity/cdk/keycodes';
import { MC_TAGS_DEFAULT_OPTIONS } from './tag-default-options';
import { McTagInput } from './tag-input';
import { McTagList } from './tag-list.component';
import { McTag, McTagAvatar, McTagRemove, McTagTrailingIcon } from './tag.component';
const ɵ0 = ({ separatorKeyCodes: [ENTER] });
export class McTagsModule {
}
McTagsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PlatformModule],
                exports: [
                    McTagList,
                    McTag,
                    McTagInput,
                    McTagTrailingIcon,
                    McTagAvatar,
                    McTagRemove
                ],
                declarations: [
                    McTagList,
                    McTag,
                    McTagInput,
                    McTagTrailingIcon,
                    McTagAvatar,
                    McTagRemove
                ],
                providers: [{
                        provide: MC_TAGS_DEFAULT_OPTIONS,
                        // tslint:disable-next-line: no-object-literal-type-assertion
                        useValue: (/** @type {?} */ (ɵ0))
                    }]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90YWdzLyIsInNvdXJjZXMiOlsidGFnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFakQsT0FBTyxFQUFFLHVCQUF1QixFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO1dBd0JuRSxDQUFBLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUF3QjtBQUd4RSxNQUFNLE9BQU8sWUFBWTs7O1lBeEJ4QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztnQkFDdkMsT0FBTyxFQUFFO29CQUNMLFNBQVM7b0JBQ1QsS0FBSztvQkFDTCxVQUFVO29CQUNWLGlCQUFpQjtvQkFDakIsV0FBVztvQkFDWCxXQUFXO2lCQUNkO2dCQUNELFlBQVksRUFBRTtvQkFDVixTQUFTO29CQUNULEtBQUs7b0JBQ0wsVUFBVTtvQkFDVixpQkFBaUI7b0JBQ2pCLFdBQVc7b0JBQ1gsV0FBVztpQkFDZDtnQkFDRCxTQUFTLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsdUJBQXVCOzt3QkFFaEMsUUFBUSxFQUFFLHVCQUFzRDtxQkFDbkUsQ0FBQzthQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFTlRFUiB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5cbmltcG9ydCB7IE1DX1RBR1NfREVGQVVMVF9PUFRJT05TLCBNY1RhZ3NEZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vdGFnLWRlZmF1bHQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNY1RhZ0lucHV0IH0gZnJvbSAnLi90YWctaW5wdXQnO1xuaW1wb3J0IHsgTWNUYWdMaXN0IH0gZnJvbSAnLi90YWctbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNUYWcsIE1jVGFnQXZhdGFyLCBNY1RhZ1JlbW92ZSwgTWNUYWdUcmFpbGluZ0ljb24gfSBmcm9tICcuL3RhZy5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGxhdGZvcm1Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNUYWdMaXN0LFxuICAgICAgICBNY1RhZyxcbiAgICAgICAgTWNUYWdJbnB1dCxcbiAgICAgICAgTWNUYWdUcmFpbGluZ0ljb24sXG4gICAgICAgIE1jVGFnQXZhdGFyLFxuICAgICAgICBNY1RhZ1JlbW92ZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jVGFnTGlzdCxcbiAgICAgICAgTWNUYWcsXG4gICAgICAgIE1jVGFnSW5wdXQsXG4gICAgICAgIE1jVGFnVHJhaWxpbmdJY29uLFxuICAgICAgICBNY1RhZ0F2YXRhcixcbiAgICAgICAgTWNUYWdSZW1vdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogTUNfVEFHU19ERUZBVUxUX09QVElPTlMsXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tb2JqZWN0LWxpdGVyYWwtdHlwZS1hc3NlcnRpb25cbiAgICAgICAgdXNlVmFsdWU6IHsgc2VwYXJhdG9yS2V5Q29kZXM6IFtFTlRFUl0gfSBhcyBNY1RhZ3NEZWZhdWx0T3B0aW9uc1xuICAgIH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFnc01vZHVsZSB7fVxuIl19
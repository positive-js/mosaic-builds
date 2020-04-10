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
var ɵ0 = ({ separatorKeyCodes: [ENTER] });
var McTagsModule = /** @class */ (function () {
    function McTagsModule() {
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
    return McTagsModule;
}());
export { McTagsModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy90YWdzLyIsInNvdXJjZXMiOlsidGFnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFakQsT0FBTyxFQUFFLHVCQUF1QixFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO1NBd0JuRSxDQUFBLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUF3QjtBQXJCeEU7SUFBQTtJQXdCMkIsQ0FBQzs7Z0JBeEIzQixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDdkMsT0FBTyxFQUFFO3dCQUNMLFNBQVM7d0JBQ1QsS0FBSzt3QkFDTCxVQUFVO3dCQUNWLGlCQUFpQjt3QkFDakIsV0FBVzt3QkFDWCxXQUFXO3FCQUNkO29CQUNELFlBQVksRUFBRTt3QkFDVixTQUFTO3dCQUNULEtBQUs7d0JBQ0wsVUFBVTt3QkFDVixpQkFBaUI7d0JBQ2pCLFdBQVc7d0JBQ1gsV0FBVztxQkFDZDtvQkFDRCxTQUFTLEVBQUUsQ0FBQzs0QkFDUixPQUFPLEVBQUUsdUJBQXVCOzs0QkFFaEMsUUFBUSxFQUFFLHVCQUFzRDt5QkFDbkUsQ0FBQztpQkFDTDs7SUFDMEIsbUJBQUM7Q0FBQSxBQXhCNUIsSUF3QjRCO1NBQWYsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU5URVIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuXG5pbXBvcnQgeyBNQ19UQUdTX0RFRkFVTFRfT1BUSU9OUywgTWNUYWdzRGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL3RhZy1kZWZhdWx0LW9wdGlvbnMnO1xuaW1wb3J0IHsgTWNUYWdJbnB1dCB9IGZyb20gJy4vdGFnLWlucHV0JztcbmltcG9ydCB7IE1jVGFnTGlzdCB9IGZyb20gJy4vdGFnLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1jVGFnLCBNY1RhZ0F2YXRhciwgTWNUYWdSZW1vdmUsIE1jVGFnVHJhaWxpbmdJY29uIH0gZnJvbSAnLi90YWcuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFBsYXRmb3JtTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jVGFnTGlzdCxcbiAgICAgICAgTWNUYWcsXG4gICAgICAgIE1jVGFnSW5wdXQsXG4gICAgICAgIE1jVGFnVHJhaWxpbmdJY29uLFxuICAgICAgICBNY1RhZ0F2YXRhcixcbiAgICAgICAgTWNUYWdSZW1vdmVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY1RhZ0xpc3QsXG4gICAgICAgIE1jVGFnLFxuICAgICAgICBNY1RhZ0lucHV0LFxuICAgICAgICBNY1RhZ1RyYWlsaW5nSWNvbixcbiAgICAgICAgTWNUYWdBdmF0YXIsXG4gICAgICAgIE1jVGFnUmVtb3ZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE1DX1RBR1NfREVGQVVMVF9PUFRJT05TLFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLW9iamVjdC1saXRlcmFsLXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgIHVzZVZhbHVlOiB7IHNlcGFyYXRvcktleUNvZGVzOiBbRU5URVJdIH0gYXMgTWNUYWdzRGVmYXVsdE9wdGlvbnNcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhZ3NNb2R1bGUge31cbiJdfQ==
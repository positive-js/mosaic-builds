import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ENTER } from '@ptsecurity/cdk/keycodes';
import { MC_TAGS_DEFAULT_OPTIONS } from './tag-default-options';
import { McTagInput } from './tag-input';
import { McTagList } from './tag-list.component';
import { McTag, McTagAvatar, McTagRemove, McTagTrailingIcon } from './tag.component';
import * as i0 from "@angular/core";
export class McTagsModule {
}
/** @nocollapse */ /** @nocollapse */ McTagsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McTagsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagsModule, declarations: [McTagList,
        McTag,
        McTagInput,
        McTagTrailingIcon,
        McTagAvatar,
        McTagRemove], imports: [CommonModule, PlatformModule], exports: [McTagList,
        McTag,
        McTagInput,
        McTagTrailingIcon,
        McTagAvatar,
        McTagRemove] });
/** @nocollapse */ /** @nocollapse */ McTagsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagsModule, providers: [{
            provide: MC_TAGS_DEFAULT_OPTIONS,
            // tslint:disable-next-line: no-object-literal-type-assertion
            useValue: { separatorKeyCodes: [ENTER] }
        }], imports: [[CommonModule, PlatformModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.0", ngImport: i0, type: McTagsModule, decorators: [{
            type: NgModule,
            args: [{
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
                            useValue: { separatorKeyCodes: [ENTER] }
                        }]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWdzL3RhZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQXdCLE1BQU0sdUJBQXVCLENBQUM7QUFDdEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBMkJyRixNQUFNLE9BQU8sWUFBWTs7K0lBQVosWUFBWTtnSkFBWixZQUFZLGlCQWJqQixTQUFTO1FBQ1QsS0FBSztRQUNMLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVcsYUFmTCxZQUFZLEVBQUUsY0FBYyxhQUVsQyxTQUFTO1FBQ1QsS0FBSztRQUNMLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsV0FBVztRQUNYLFdBQVc7Z0pBZ0JOLFlBQVksYUFOVixDQUFDO1lBQ1IsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyw2REFBNkQ7WUFDN0QsUUFBUSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBMEI7U0FDbkUsQ0FBQyxZQXJCTyxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUM7MkZBdUI5QixZQUFZO2tCQXhCeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDO29CQUN2QyxPQUFPLEVBQUU7d0JBQ0wsU0FBUzt3QkFDVCxLQUFLO3dCQUNMLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQixXQUFXO3dCQUNYLFdBQVc7cUJBQ2Q7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLFNBQVM7d0JBQ1QsS0FBSzt3QkFDTCxVQUFVO3dCQUNWLGlCQUFpQjt3QkFDakIsV0FBVzt3QkFDWCxXQUFXO3FCQUNkO29CQUNELFNBQVMsRUFBRSxDQUFDOzRCQUNSLE9BQU8sRUFBRSx1QkFBdUI7NEJBQ2hDLDZEQUE2RDs0QkFDN0QsUUFBUSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBMEI7eUJBQ25FLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVOVEVSIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgTUNfVEFHU19ERUZBVUxUX09QVElPTlMsIE1jVGFnc0RlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi90YWctZGVmYXVsdC1vcHRpb25zJztcbmltcG9ydCB7IE1jVGFnSW5wdXQgfSBmcm9tICcuL3RhZy1pbnB1dCc7XG5pbXBvcnQgeyBNY1RhZ0xpc3QgfSBmcm9tICcuL3RhZy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RhZywgTWNUYWdBdmF0YXIsIE1jVGFnUmVtb3ZlLCBNY1RhZ1RyYWlsaW5nSWNvbiB9IGZyb20gJy4vdGFnLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQbGF0Zm9ybU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY1RhZ0xpc3QsXG4gICAgICAgIE1jVGFnLFxuICAgICAgICBNY1RhZ0lucHV0LFxuICAgICAgICBNY1RhZ1RyYWlsaW5nSWNvbixcbiAgICAgICAgTWNUYWdBdmF0YXIsXG4gICAgICAgIE1jVGFnUmVtb3ZlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNUYWdMaXN0LFxuICAgICAgICBNY1RhZyxcbiAgICAgICAgTWNUYWdJbnB1dCxcbiAgICAgICAgTWNUYWdUcmFpbGluZ0ljb24sXG4gICAgICAgIE1jVGFnQXZhdGFyLFxuICAgICAgICBNY1RhZ1JlbW92ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBNQ19UQUdTX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1vYmplY3QtbGl0ZXJhbC10eXBlLWFzc2VydGlvblxuICAgICAgICB1c2VWYWx1ZTogeyBzZXBhcmF0b3JLZXlDb2RlczogW0VOVEVSXSB9IGFzIE1jVGFnc0RlZmF1bHRPcHRpb25zXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdzTW9kdWxlIHt9XG4iXX0=
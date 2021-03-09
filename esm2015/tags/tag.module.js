import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ENTER } from '@ptsecurity/cdk/keycodes';
import { MC_TAGS_DEFAULT_OPTIONS } from './tag-default-options';
import { McTagInput } from './tag-input';
import { McTagList } from './tag-list.component';
import { McTag, McTagAvatar, McTagRemove, McTagTrailingIcon } from './tag.component';
const ɵ0 = { separatorKeyCodes: [ENTER] };
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
                        useValue: ɵ0
                    }]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy90YWdzL3RhZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQXdCLE1BQU0sdUJBQXVCLENBQUM7QUFDdEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7V0F3Qm5FLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBMEI7QUFHeEUsTUFBTSxPQUFPLFlBQVk7OztZQXhCeEIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRTtvQkFDTCxTQUFTO29CQUNULEtBQUs7b0JBQ0wsVUFBVTtvQkFDVixpQkFBaUI7b0JBQ2pCLFdBQVc7b0JBQ1gsV0FBVztpQkFDZDtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsU0FBUztvQkFDVCxLQUFLO29CQUNMLFVBQVU7b0JBQ1YsaUJBQWlCO29CQUNqQixXQUFXO29CQUNYLFdBQVc7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLHVCQUF1Qjt3QkFDaEMsNkRBQTZEO3dCQUM3RCxRQUFRLElBQXdEO3FCQUNuRSxDQUFDO2FBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVOVEVSIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgTUNfVEFHU19ERUZBVUxUX09QVElPTlMsIE1jVGFnc0RlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi90YWctZGVmYXVsdC1vcHRpb25zJztcbmltcG9ydCB7IE1jVGFnSW5wdXQgfSBmcm9tICcuL3RhZy1pbnB1dCc7XG5pbXBvcnQgeyBNY1RhZ0xpc3QgfSBmcm9tICcuL3RhZy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RhZywgTWNUYWdBdmF0YXIsIE1jVGFnUmVtb3ZlLCBNY1RhZ1RyYWlsaW5nSWNvbiB9IGZyb20gJy4vdGFnLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQbGF0Zm9ybU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY1RhZ0xpc3QsXG4gICAgICAgIE1jVGFnLFxuICAgICAgICBNY1RhZ0lucHV0LFxuICAgICAgICBNY1RhZ1RyYWlsaW5nSWNvbixcbiAgICAgICAgTWNUYWdBdmF0YXIsXG4gICAgICAgIE1jVGFnUmVtb3ZlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNUYWdMaXN0LFxuICAgICAgICBNY1RhZyxcbiAgICAgICAgTWNUYWdJbnB1dCxcbiAgICAgICAgTWNUYWdUcmFpbGluZ0ljb24sXG4gICAgICAgIE1jVGFnQXZhdGFyLFxuICAgICAgICBNY1RhZ1JlbW92ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBNQ19UQUdTX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1vYmplY3QtbGl0ZXJhbC10eXBlLWFzc2VydGlvblxuICAgICAgICB1c2VWYWx1ZTogeyBzZXBhcmF0b3JLZXlDb2RlczogW0VOVEVSXSB9IGFzIE1jVGFnc0RlZmF1bHRPcHRpb25zXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWdzTW9kdWxlIHt9XG4iXX0=
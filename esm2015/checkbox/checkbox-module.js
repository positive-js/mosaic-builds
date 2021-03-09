import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McCheckbox } from './checkbox';
import { McCheckboxRequiredValidator } from './checkbox-required-validator';
export class McCheckboxModule {
}
McCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [McCheckbox, McCheckboxRequiredValidator],
                declarations: [McCheckbox, McCheckboxRequiredValidator]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NoZWNrYm94L2NoZWNrYm94LW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBUTVFLE1BQU0sT0FBTyxnQkFBZ0I7OztZQUw1QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsMkJBQTJCLENBQUM7Z0JBQ2xELFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSwyQkFBMkIsQ0FBQzthQUMxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNY0NoZWNrYm94IH0gZnJvbSAnLi9jaGVja2JveCc7XG5pbXBvcnQgeyBNY0NoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuL2NoZWNrYm94LXJlcXVpcmVkLXZhbGlkYXRvcic7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWNDaGVja2JveCwgTWNDaGVja2JveFJlcXVpcmVkVmFsaWRhdG9yXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY0NoZWNrYm94LCBNY0NoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3JdXG59KVxuZXhwb3J0IGNsYXNzIE1jQ2hlY2tib3hNb2R1bGUge1xufVxuIl19
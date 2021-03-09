import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { McTextarea } from './textarea.component';
export class McTextareaModule {
}
McTextareaModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, McCommonModule, FormsModule],
                exports: [McTextarea],
                declarations: [McTextarea]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RleHRhcmVhL3RleHRhcmVhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFRbEQsTUFBTSxPQUFPLGdCQUFnQjs7O1lBTDVCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUM7Z0JBQ2hFLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDckIsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO2FBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNY0NvbW1vbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNUZXh0YXJlYSB9IGZyb20gJy4vdGV4dGFyZWEuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEExMXlNb2R1bGUsIE1jQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gICAgZXhwb3J0czogW01jVGV4dGFyZWFdLFxuICAgIGRlY2xhcmF0aW9uczogW01jVGV4dGFyZWFdXG59KVxuZXhwb3J0IGNsYXNzIE1jVGV4dGFyZWFNb2R1bGUge31cbiJdfQ==
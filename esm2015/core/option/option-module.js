import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McPseudoCheckboxModule } from '../selection/index';
import { McOptgroup } from './optgroup';
import { McOption } from './option';
export class McOptionModule {
}
McOptionModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, McPseudoCheckboxModule],
                exports: [McOption, McOptgroup],
                declarations: [McOption, McOptgroup]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jb3JlL29wdGlvbi9vcHRpb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQVFwQyxNQUFNLE9BQU8sY0FBYzs7O1lBTDFCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUM7Z0JBQy9DLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7Z0JBQy9CLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7YUFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWNQc2V1ZG9DaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdGlvbi9pbmRleCc7XG5cbmltcG9ydCB7IE1jT3B0Z3JvdXAgfSBmcm9tICcuL29wdGdyb3VwJztcbmltcG9ydCB7IE1jT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWNQc2V1ZG9DaGVja2JveE1vZHVsZV0sXG4gICAgZXhwb3J0czogW01jT3B0aW9uLCBNY09wdGdyb3VwXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY09wdGlvbiwgTWNPcHRncm91cF1cbn0pXG5leHBvcnQgY2xhc3MgTWNPcHRpb25Nb2R1bGUge31cbiJdfQ==
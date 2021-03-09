import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McSidebar, McSidebarClosed, McSidebarOpened } from './sidebar.component';
export class McSidebarModule {
}
McSidebarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [
                    McSidebarClosed,
                    McSidebarOpened,
                    McSidebar
                ],
                exports: [
                    McSidebarClosed,
                    McSidebarOpened,
                    McSidebar
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZWJhci9zaWRlYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWdCbEYsTUFBTSxPQUFPLGVBQWU7OztZQWIzQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUU7b0JBQ1YsZUFBZTtvQkFDZixlQUFlO29CQUNmLFNBQVM7aUJBQ1o7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGVBQWU7b0JBQ2YsZUFBZTtvQkFDZixTQUFTO2lCQUNaO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWNTaWRlYmFyLCBNY1NpZGViYXJDbG9zZWQsIE1jU2lkZWJhck9wZW5lZCB9IGZyb20gJy4vc2lkZWJhci5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jU2lkZWJhckNsb3NlZCxcbiAgICAgICAgTWNTaWRlYmFyT3BlbmVkLFxuICAgICAgICBNY1NpZGViYXJcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNTaWRlYmFyQ2xvc2VkLFxuICAgICAgICBNY1NpZGViYXJPcGVuZWQsXG4gICAgICAgIE1jU2lkZWJhclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlYmFyTW9kdWxlIHt9XG4iXX0=
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McHighlightPipe } from './highlight.pipe';
export class McHighlightModule {
}
McHighlightModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [McHighlightPipe],
                declarations: [McHighlightPipe]
            },] }
];
export * from './highlight.pipe';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9oaWdobGlnaHQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBUW5ELE1BQU0sT0FBTyxpQkFBaUI7OztZQUw3QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzFCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQzthQUNsQzs7QUFJRCxjQUFjLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1jSGlnaGxpZ2h0UGlwZSB9IGZyb20gJy4vaGlnaGxpZ2h0LnBpcGUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW01jSGlnaGxpZ2h0UGlwZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNIaWdobGlnaHRQaXBlXVxufSlcbmV4cG9ydCBjbGFzcyBNY0hpZ2hsaWdodE1vZHVsZSB7fVxuXG5cbmV4cG9ydCAqIGZyb20gJy4vaGlnaGxpZ2h0LnBpcGUnO1xuIl19
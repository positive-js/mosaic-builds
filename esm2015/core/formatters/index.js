import { NgModule } from '@angular/core';
import { McDecimalPipe } from './number/formatter';
export class McFormattersModule {
}
McFormattersModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    McDecimalPipe
                ],
                declarations: [
                    McDecimalPipe
                ]
            },] }
];
export * from './number/formatter';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9mb3JtYXR0ZXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBV25ELE1BQU0sT0FBTyxrQkFBa0I7OztZQVI5QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLGFBQWE7aUJBQ2hCO2dCQUNELFlBQVksRUFBRTtvQkFDVixhQUFhO2lCQUNoQjthQUNKOztBQUlELGNBQWMsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNY0RlY2ltYWxQaXBlIH0gZnJvbSAnLi9udW1iZXIvZm9ybWF0dGVyJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNEZWNpbWFsUGlwZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jRGVjaW1hbFBpcGVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRm9ybWF0dGVyc01vZHVsZSB7fVxuXG5cbmV4cG9ydCAqIGZyb20gJy4vbnVtYmVyL2Zvcm1hdHRlcic7XG4iXX0=
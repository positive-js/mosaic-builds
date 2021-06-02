import { NgModule } from '@angular/core';
import { DateFormatter } from './date/formatter';
import { McDecimalPipe } from './number/formatter';
export class McFormattersModule {
}
McFormattersModule.decorators = [
    { type: NgModule, args: [{
                exports: [McDecimalPipe],
                declarations: [McDecimalPipe],
                providers: [DateFormatter]
            },] }
];
export * from './number/formatter';
export * from './date/formatter';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9mb3JtYXR0ZXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQVFuRCxNQUFNLE9BQU8sa0JBQWtCOzs7WUFMOUIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDeEIsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUM3QixTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDN0I7O0FBSUQsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0ZUZvcm1hdHRlciB9IGZyb20gJy4vZGF0ZS9mb3JtYXR0ZXInO1xuaW1wb3J0IHsgTWNEZWNpbWFsUGlwZSB9IGZyb20gJy4vbnVtYmVyL2Zvcm1hdHRlcic7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBleHBvcnRzOiBbTWNEZWNpbWFsUGlwZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNEZWNpbWFsUGlwZV0sXG4gICAgcHJvdmlkZXJzOiBbRGF0ZUZvcm1hdHRlcl1cbn0pXG5leHBvcnQgY2xhc3MgTWNGb3JtYXR0ZXJzTW9kdWxlIHt9XG5cblxuZXhwb3J0ICogZnJvbSAnLi9udW1iZXIvZm9ybWF0dGVyJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS9mb3JtYXR0ZXInO1xuIl19
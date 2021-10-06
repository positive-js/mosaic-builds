import { NgModule } from '@angular/core';
import { DateFormatter } from './date/formatter';
import { McDecimalPipe } from './number/formatter';
import * as i0 from "@angular/core";
export class McFormattersModule {
}
/** @nocollapse */ McFormattersModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McFormattersModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McFormattersModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McFormattersModule, declarations: [McDecimalPipe], exports: [McDecimalPipe] });
/** @nocollapse */ McFormattersModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McFormattersModule, providers: [DateFormatter] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McFormattersModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [McDecimalPipe],
                    declarations: [McDecimalPipe],
                    providers: [DateFormatter]
                }]
        }] });
export * from './number/formatter';
export * from './date/formatter';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9mb3JtYXR0ZXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFRbkQsTUFBTSxPQUFPLGtCQUFrQjs7a0lBQWxCLGtCQUFrQjttSUFBbEIsa0JBQWtCLGlCQUhaLGFBQWEsYUFEbEIsYUFBYTttSUFJZCxrQkFBa0IsYUFGaEIsQ0FBQyxhQUFhLENBQUM7MkZBRWpCLGtCQUFrQjtrQkFMOUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDN0IsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2lCQUM3Qjs7QUFJRCxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi9kYXRlL2Zvcm1hdHRlcic7XG5pbXBvcnQgeyBNY0RlY2ltYWxQaXBlIH0gZnJvbSAnLi9udW1iZXIvZm9ybWF0dGVyJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGV4cG9ydHM6IFtNY0RlY2ltYWxQaXBlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNY0RlY2ltYWxQaXBlXSxcbiAgICBwcm92aWRlcnM6IFtEYXRlRm9ybWF0dGVyXVxufSlcbmV4cG9ydCBjbGFzcyBNY0Zvcm1hdHRlcnNNb2R1bGUge31cblxuXG5leHBvcnQgKiBmcm9tICcuL251bWJlci9mb3JtYXR0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRlL2Zvcm1hdHRlcic7XG4iXX0=
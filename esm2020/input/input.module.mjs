import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { McInput, McInputMono } from './input';
import { McNumberInput } from './input-number';
import { MaxValidator, MinValidator } from './input-number-validators';
import { McInputPassword, McPasswordToggle } from './input-password';
import * as i0 from "@angular/core";
export class McInputModule {
}
/** @nocollapse */ /** @nocollapse */ McInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McInputModule, declarations: [McInput,
        McNumberInput,
        McInputPassword,
        McPasswordToggle,
        McInputMono,
        MinValidator,
        MaxValidator], imports: [CommonModule,
        A11yModule,
        McCommonModule,
        FormsModule], exports: [McInput,
        McNumberInput,
        McInputPassword,
        McPasswordToggle,
        McInputMono,
        MinValidator,
        MaxValidator] });
/** @nocollapse */ /** @nocollapse */ McInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McInputModule, imports: [[
            CommonModule,
            A11yModule,
            McCommonModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        A11yModule,
                        McCommonModule,
                        FormsModule
                    ],
                    declarations: [
                        McInput,
                        McNumberInput,
                        McInputPassword,
                        McPasswordToggle,
                        McInputMono,
                        MinValidator,
                        MaxValidator
                    ],
                    exports: [
                        McInput,
                        McNumberInput,
                        McInputPassword,
                        McPasswordToggle,
                        McInputMono,
                        MinValidator,
                        MaxValidator
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2lucHV0L2lucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBNkJyRSxNQUFNLE9BQU8sYUFBYTs7Z0pBQWIsYUFBYTtpSkFBYixhQUFhLGlCQWxCbEIsT0FBTztRQUNQLGFBQWE7UUFDYixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxZQUFZO1FBQ1osWUFBWSxhQVpaLFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYztRQUNkLFdBQVcsYUFZWCxPQUFPO1FBQ1AsYUFBYTtRQUNiLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLFlBQVk7UUFDWixZQUFZO2lKQUdQLGFBQWEsWUF6QmI7WUFDTCxZQUFZO1lBQ1osVUFBVTtZQUNWLGNBQWM7WUFDZCxXQUFXO1NBQ2Q7MkZBb0JRLGFBQWE7a0JBMUJ6QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsY0FBYzt3QkFDZCxXQUFXO3FCQUNkO29CQUNELFlBQVksRUFBRTt3QkFDVixPQUFPO3dCQUNQLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDTCxPQUFPO3dCQUNQLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixZQUFZO3FCQUNmO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNY0NvbW1vbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNJbnB1dCwgTWNJbnB1dE1vbm8gfSBmcm9tICcuL2lucHV0JztcbmltcG9ydCB7IE1jTnVtYmVySW5wdXQgfSBmcm9tICcuL2lucHV0LW51bWJlcic7XG5pbXBvcnQgeyBNYXhWYWxpZGF0b3IsIE1pblZhbGlkYXRvciB9IGZyb20gJy4vaW5wdXQtbnVtYmVyLXZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgTWNJbnB1dFBhc3N3b3JkLCBNY1Bhc3N3b3JkVG9nZ2xlIH0gZnJvbSAnLi9pbnB1dC1wYXNzd29yZCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgTWNDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNJbnB1dCxcbiAgICAgICAgTWNOdW1iZXJJbnB1dCxcbiAgICAgICAgTWNJbnB1dFBhc3N3b3JkLFxuICAgICAgICBNY1Bhc3N3b3JkVG9nZ2xlLFxuICAgICAgICBNY0lucHV0TW9ubyxcbiAgICAgICAgTWluVmFsaWRhdG9yLFxuICAgICAgICBNYXhWYWxpZGF0b3JcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNJbnB1dCxcbiAgICAgICAgTWNOdW1iZXJJbnB1dCxcbiAgICAgICAgTWNJbnB1dFBhc3N3b3JkLFxuICAgICAgICBNY1Bhc3N3b3JkVG9nZ2xlLFxuICAgICAgICBNY0lucHV0TW9ubyxcbiAgICAgICAgTWluVmFsaWRhdG9yLFxuICAgICAgICBNYXhWYWxpZGF0b3JcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jSW5wdXRNb2R1bGUge31cbiJdfQ==
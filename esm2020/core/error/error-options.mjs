import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Error state matcher that matches when a control is invalid and dirty. */
export class ShowOnDirtyErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    }
}
/** @nocollapse */ /** @nocollapse */ ShowOnDirtyErrorStateMatcher.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ShowOnDirtyErrorStateMatcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ ShowOnDirtyErrorStateMatcher.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ShowOnDirtyErrorStateMatcher });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ShowOnDirtyErrorStateMatcher, decorators: [{
            type: Injectable
        }] });
/** Provider that defines how form controls behave with regards to displaying error messages. */
export class ErrorStateMatcher {
    isErrorState(control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    }
}
/** @nocollapse */ /** @nocollapse */ ErrorStateMatcher.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ErrorStateMatcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ ErrorStateMatcher.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ErrorStateMatcher, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ErrorStateMatcher, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Itb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jb3JlL2Vycm9yL2Vycm9yLW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsNEVBQTRFO0FBRTVFLE1BQU0sT0FBTyw0QkFBNEI7SUFDckMsWUFBWSxDQUFDLE9BQTJCLEVBQUUsSUFBd0M7UUFDOUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDOzsrSkFIUSw0QkFBNEI7bUtBQTVCLDRCQUE0QjsyRkFBNUIsNEJBQTRCO2tCQUR4QyxVQUFVOztBQU9YLGdHQUFnRztBQUVoRyxNQUFNLE9BQU8saUJBQWlCO0lBQzFCLFlBQVksQ0FBQyxPQUEyQixFQUFFLElBQXdDO1FBQzlFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQzs7b0pBSFEsaUJBQWlCO3dKQUFqQixpQkFBaUIsY0FESixNQUFNOzJGQUNuQixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0Zvcm0sIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbi8qKiBFcnJvciBzdGF0ZSBtYXRjaGVyIHRoYXQgbWF0Y2hlcyB3aGVuIGEgY29udHJvbCBpcyBpbnZhbGlkIGFuZCBkaXJ0eS4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaG93T25EaXJ0eUVycm9yU3RhdGVNYXRjaGVyIGltcGxlbWVudHMgRXJyb3JTdGF0ZU1hdGNoZXIge1xuICAgIGlzRXJyb3JTdGF0ZShjb250cm9sOiBGb3JtQ29udHJvbCB8IG51bGwsIGZvcm06IEZvcm1Hcm91cERpcmVjdGl2ZSB8IE5nRm9ybSB8IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhKGNvbnRyb2wgJiYgY29udHJvbC5pbnZhbGlkICYmIChjb250cm9sLmRpcnR5IHx8IChmb3JtICYmIGZvcm0uc3VibWl0dGVkKSkpO1xuICAgIH1cbn1cblxuLyoqIFByb3ZpZGVyIHRoYXQgZGVmaW5lcyBob3cgZm9ybSBjb250cm9scyBiZWhhdmUgd2l0aCByZWdhcmRzIHRvIGRpc3BsYXlpbmcgZXJyb3IgbWVzc2FnZXMuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEVycm9yU3RhdGVNYXRjaGVyIHtcbiAgICBpc0Vycm9yU3RhdGUoY29udHJvbDogRm9ybUNvbnRyb2wgfCBudWxsLCBmb3JtOiBGb3JtR3JvdXBEaXJlY3RpdmUgfCBOZ0Zvcm0gfCBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIShjb250cm9sICYmIGNvbnRyb2wuaW52YWxpZCAmJiAoY29udHJvbC50b3VjaGVkIHx8IChmb3JtICYmIGZvcm0uc3VibWl0dGVkKSkpO1xuICAgIH1cbn1cbiJdfQ==
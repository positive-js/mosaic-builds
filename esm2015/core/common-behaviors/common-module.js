/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/common-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BidiModule } from '@angular/cdk/bidi';
import { NgModule, InjectionToken, Optional, Inject, isDevMode } from '@angular/core';
// Injection token that configures whether the Mosaic sanity checks are enabled.
/** @type {?} */
export const MC_SANITY_CHECKS = new InjectionToken('mc-sanity-checks', {
    providedIn: 'root',
    factory: mcSanityChecksFactory
});
/**
 * @return {?}
 */
export function mcSanityChecksFactory() {
    return true;
}
/**
 * Module that captures anything that should be loaded and/or run for *all* Mosaic
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., McTabsModule).
 */
export class McCommonModule {
    /**
     * @param {?} _sanityChecksEnabled
     */
    constructor(_sanityChecksEnabled) {
        this._sanityChecksEnabled = _sanityChecksEnabled;
        // Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
        this.hasDoneGlobalChecks = false;
        // Reference to the global `document` object.
        // tslint:disable-next-line: orthodox-getter-and-setter
        this._document = typeof document === 'object' && document ? document : null;
        // Reference to the global 'window' object.
        // tslint:disable-next-line: orthodox-getter-and-setter
        this._window = typeof window === 'object' && window ? window : null;
        if (this.areChecksEnabled() && !this.hasDoneGlobalChecks) {
            this.checkDoctypeIsDefined();
            this.checkThemeIsPresent();
            this.hasDoneGlobalChecks = true;
        }
    }
    // Whether any sanity checks are enabled
    /**
     * @private
     * @return {?}
     */
    areChecksEnabled() {
        return this._sanityChecksEnabled && isDevMode() && !this.isTestEnv();
    }
    // Whether the code is running in tests.
    /**
     * @private
     * @return {?}
     */
    isTestEnv() {
        // tslint:disable-next-line
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    }
    /**
     * @private
     * @return {?}
     */
    checkDoctypeIsDefined() {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Mosaic components not to behave as expected.');
        }
    }
    /**
     * @private
     * @return {?}
     */
    checkThemeIsPresent() {
        if (this._document && typeof getComputedStyle === 'function') {
            /** @type {?} */
            const testElement = this._document.createElement('div');
            testElement.classList.add('mc-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            /** @type {?} */
            const computedStyle = getComputedStyle(testElement);
            // In some situations, the computed style of the test element can be null. For example in
            // Firefox, the computed style is null if an application is running inside of a hidden iframe.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
            if (computedStyle && computedStyle.display !== 'none') {
                console.warn('Could not find Mosaic core theme. Most Mosaic ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: link there');
            }
            this._document.body.removeChild(testElement);
        }
    }
}
McCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule],
                exports: [BidiModule]
            },] }
];
/** @nocollapse */
McCommonModule.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MC_SANITY_CHECKS,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    McCommonModule.prototype.hasDoneGlobalChecks;
    /**
     * @type {?}
     * @private
     */
    McCommonModule.prototype._document;
    /**
     * @type {?}
     * @private
     */
    McCommonModule.prototype._window;
    /**
     * @type {?}
     * @private
     */
    McCommonModule.prototype._sanityChecksEnabled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsiY29tbW9uLWJlaGF2aW9ycy9jb21tb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFJdEYsTUFBTSxPQUFPLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFVLGtCQUFrQixFQUFFO0lBQzVFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxxQkFBcUI7Q0FDakMsQ0FBQzs7OztBQUVGLE1BQU0sVUFBVSxxQkFBcUI7SUFDakMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQzs7Ozs7OztBQVlELE1BQU0sT0FBTyxjQUFjOzs7O0lBWXZCLFlBQTBELG9CQUE2QjtRQUE3Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVM7O1FBVi9FLHdCQUFtQixHQUFHLEtBQUssQ0FBQzs7O1FBSTVCLGNBQVMsR0FBRyxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7O1FBSXZFLFlBQU8sR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUduRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7Ozs7SUFHTyxnQkFBZ0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLElBQUksU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekUsQ0FBQzs7Ozs7O0lBR08sU0FBUztRQUNiLDJCQUEyQjtRQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDOzs7OztJQUVPLHFCQUFxQjtRQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUNSLDJEQUEyRDtnQkFDM0QsbURBQW1ELENBQ3RELENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7O0lBRU8sbUJBQW1CO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLGdCQUFnQixLQUFLLFVBQVUsRUFBRTs7a0JBQ3BELFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFFdkQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7O2tCQUV2QyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO1lBRW5ELHlGQUF5RjtZQUN6Riw4RkFBOEY7WUFDOUYsMkRBQTJEO1lBQzNELElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO2dCQUNuRCxPQUFPLENBQUMsSUFBSSxDQUNSLGdEQUFnRDtvQkFDaEQsMkRBQTJEO29CQUMzRCxrQ0FBa0MsQ0FDckMsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQzs7O1lBbEVKLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBRSxVQUFVLENBQUU7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFFLFVBQVUsQ0FBRTthQUMxQjs7OzswQ0FhZ0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxnQkFBZ0I7Ozs7Ozs7SUFWaEQsNkNBQW9DOzs7OztJQUlwQyxtQ0FBK0U7Ozs7O0lBSS9FLGlDQUF1RTs7Ozs7SUFFM0QsOENBQTJFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIEluamVjdCwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLy8gSW5qZWN0aW9uIHRva2VuIHRoYXQgY29uZmlndXJlcyB3aGV0aGVyIHRoZSBNb3NhaWMgc2FuaXR5IGNoZWNrcyBhcmUgZW5hYmxlZC5cbmV4cG9ydCBjb25zdCBNQ19TQU5JVFlfQ0hFQ0tTID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdtYy1zYW5pdHktY2hlY2tzJywge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiBtY1Nhbml0eUNoZWNrc0ZhY3Rvcnlcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbWNTYW5pdHlDaGVja3NGYWN0b3J5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIE1vZHVsZSB0aGF0IGNhcHR1cmVzIGFueXRoaW5nIHRoYXQgc2hvdWxkIGJlIGxvYWRlZCBhbmQvb3IgcnVuIGZvciAqYWxsKiBNb3NhaWNcbiAqIGNvbXBvbmVudHMuIFRoaXMgaW5jbHVkZXMgQmlkaSwgZXRjLlxuICpcbiAqIFRoaXMgbW9kdWxlIHNob3VsZCBiZSBpbXBvcnRlZCB0byBlYWNoIHRvcC1sZXZlbCBjb21wb25lbnQgbW9kdWxlIChlLmcuLCBNY1RhYnNNb2R1bGUpLlxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFsgQmlkaU1vZHVsZSBdLFxuICAgIGV4cG9ydHM6IFsgQmlkaU1vZHVsZSBdXG59KVxuZXhwb3J0IGNsYXNzIE1jQ29tbW9uTW9kdWxlIHtcbiAgICAvLyBXaGV0aGVyIHdlJ3ZlIGRvbmUgdGhlIGdsb2JhbCBzYW5pdHkgY2hlY2tzIChlLmcuIGEgdGhlbWUgaXMgbG9hZGVkLCB0aGVyZSBpcyBhIGRvY3R5cGUpLlxuICAgIHByaXZhdGUgaGFzRG9uZUdsb2JhbENoZWNrcyA9IGZhbHNlO1xuXG4gICAgLy8gUmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgYGRvY3VtZW50YCBvYmplY3QuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvcnRob2RveC1nZXR0ZXItYW5kLXNldHRlclxuICAgIHByaXZhdGUgX2RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ID09PSAnb2JqZWN0JyAmJiBkb2N1bWVudCA/IGRvY3VtZW50IDogbnVsbDtcblxuICAgIC8vIFJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsICd3aW5kb3cnIG9iamVjdC5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9ydGhvZG94LWdldHRlci1hbmQtc2V0dGVyXG4gICAgcHJpdmF0ZSBfd2luZG93ID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93ID8gd2luZG93IDogbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTUNfU0FOSVRZX0NIRUNLUykgcHJpdmF0ZSBfc2FuaXR5Q2hlY2tzRW5hYmxlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5hcmVDaGVja3NFbmFibGVkKCkgJiYgIXRoaXMuaGFzRG9uZUdsb2JhbENoZWNrcykge1xuICAgICAgICAgICAgdGhpcy5jaGVja0RvY3R5cGVJc0RlZmluZWQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUaGVtZUlzUHJlc2VudCgpO1xuICAgICAgICAgICAgdGhpcy5oYXNEb25lR2xvYmFsQ2hlY2tzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoZXRoZXIgYW55IHNhbml0eSBjaGVja3MgYXJlIGVuYWJsZWRcbiAgICBwcml2YXRlIGFyZUNoZWNrc0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zYW5pdHlDaGVja3NFbmFibGVkICYmIGlzRGV2TW9kZSgpICYmICF0aGlzLmlzVGVzdEVudigpO1xuICAgIH1cblxuICAgIC8vIFdoZXRoZXIgdGhlIGNvZGUgaXMgcnVubmluZyBpbiB0ZXN0cy5cbiAgICBwcml2YXRlIGlzVGVzdEVudigpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHJldHVybiB0aGlzLl93aW5kb3cgJiYgKHRoaXMuX3dpbmRvd1snX19rYXJtYV9fJ10gfHwgdGhpcy5fd2luZG93WydqYXNtaW5lJ10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tEb2N0eXBlSXNEZWZpbmVkKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZG9jdW1lbnQgJiYgIXRoaXMuX2RvY3VtZW50LmRvY3R5cGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAnQ3VycmVudCBkb2N1bWVudCBkb2VzIG5vdCBoYXZlIGEgZG9jdHlwZS4gVGhpcyBtYXkgY2F1c2UgJyArXG4gICAgICAgICAgICAgICAgJ3NvbWUgTW9zYWljIGNvbXBvbmVudHMgbm90IHRvIGJlaGF2ZSBhcyBleHBlY3RlZC4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja1RoZW1lSXNQcmVzZW50KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZG9jdW1lbnQgJiYgdHlwZW9mIGdldENvbXB1dGVkU3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlc3RFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21jLXRoZW1lLWxvYWRlZC1tYXJrZXInKTtcbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVzdEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8vIEluIHNvbWUgc2l0dWF0aW9ucywgdGhlIGNvbXB1dGVkIHN0eWxlIG9mIHRoZSB0ZXN0IGVsZW1lbnQgY2FuIGJlIG51bGwuIEZvciBleGFtcGxlIGluXG4gICAgICAgICAgICAvLyBGaXJlZm94LCB0aGUgY29tcHV0ZWQgc3R5bGUgaXMgbnVsbCBpZiBhbiBhcHBsaWNhdGlvbiBpcyBydW5uaW5nIGluc2lkZSBvZiBhIGhpZGRlbiBpZnJhbWUuXG4gICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICAgICAgICAgICAgaWYgKGNvbXB1dGVkU3R5bGUgJiYgY29tcHV0ZWRTdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICdDb3VsZCBub3QgZmluZCBNb3NhaWMgY29yZSB0aGVtZS4gTW9zdCBNb3NhaWMgJyArXG4gICAgICAgICAgICAgICAgICAgICdjb21wb25lbnRzIG1heSBub3Qgd29yayBhcyBleHBlY3RlZC4gRm9yIG1vcmUgaW5mbyByZWZlciAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3RvIHRoZSB0aGVtaW5nIGd1aWRlOiBsaW5rIHRoZXJlJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGVzdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
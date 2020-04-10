/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/common-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BidiModule } from '@angular/cdk/bidi';
import { NgModule, InjectionToken, Optional, Inject, isDevMode } from '@angular/core';
// Injection token that configures whether the Mosaic sanity checks are enabled.
/** @type {?} */
export var MC_SANITY_CHECKS = new InjectionToken('mc-sanity-checks', {
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
var McCommonModule = /** @class */ (function () {
    function McCommonModule(_sanityChecksEnabled) {
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
    // Whether any sanity checks are enabled
    /**
     * @private
     * @return {?}
     */
    McCommonModule.prototype.areChecksEnabled = 
    // Whether any sanity checks are enabled
    /**
     * @private
     * @return {?}
     */
    function () {
        return this._sanityChecksEnabled && isDevMode() && !this.isTestEnv();
    };
    // Whether the code is running in tests.
    // Whether the code is running in tests.
    /**
     * @private
     * @return {?}
     */
    McCommonModule.prototype.isTestEnv = 
    // Whether the code is running in tests.
    /**
     * @private
     * @return {?}
     */
    function () {
        // tslint:disable-next-line
        return this._window && (this._window['__karma__'] || this._window['jasmine']);
    };
    /**
     * @private
     * @return {?}
     */
    McCommonModule.prototype.checkDoctypeIsDefined = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Mosaic components not to behave as expected.');
        }
    };
    /**
     * @private
     * @return {?}
     */
    McCommonModule.prototype.checkThemeIsPresent = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._document && typeof getComputedStyle === 'function') {
            /** @type {?} */
            var testElement = this._document.createElement('div');
            testElement.classList.add('mc-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            /** @type {?} */
            var computedStyle = getComputedStyle(testElement);
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
    };
    McCommonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BidiModule],
                    exports: [BidiModule]
                },] }
    ];
    /** @nocollapse */
    McCommonModule.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MC_SANITY_CHECKS,] }] }
    ]; };
    return McCommonModule;
}());
export { McCommonModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlLyIsInNvdXJjZXMiOlsiY29tbW9uLWJlaGF2aW9ycy9jb21tb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFJdEYsTUFBTSxLQUFPLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFVLGtCQUFrQixFQUFFO0lBQzVFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxxQkFBcUI7Q0FDakMsQ0FBQzs7OztBQUVGLE1BQU0sVUFBVSxxQkFBcUI7SUFDakMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQzs7Ozs7OztBQVFEO0lBZ0JJLHdCQUEwRCxvQkFBNkI7UUFBN0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFTOztRQVYvRSx3QkFBbUIsR0FBRyxLQUFLLENBQUM7OztRQUk1QixjQUFTLEdBQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7OztRQUl2RSxZQUFPLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFHbkUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUN0RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVELHdDQUF3Qzs7Ozs7O0lBQ2hDLHlDQUFnQjs7Ozs7O0lBQXhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsb0JBQW9CLElBQUksU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekUsQ0FBQztJQUVELHdDQUF3Qzs7Ozs7O0lBQ2hDLGtDQUFTOzs7Ozs7SUFBakI7UUFDSSwyQkFBMkI7UUFDM0IsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQzs7Ozs7SUFFTyw4Q0FBcUI7Ozs7SUFBN0I7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUMzQyxPQUFPLENBQUMsSUFBSSxDQUNSLDJEQUEyRDtnQkFDM0QsbURBQW1ELENBQ3RELENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7O0lBRU8sNENBQW1COzs7O0lBQTNCO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sZ0JBQWdCLEtBQUssVUFBVSxFQUFFOztnQkFDcEQsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUV2RCxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Z0JBRXZDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7WUFFbkQseUZBQXlGO1lBQ3pGLDhGQUE4RjtZQUM5RiwyREFBMkQ7WUFDM0QsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQ1IsZ0RBQWdEO29CQUNoRCwyREFBMkQ7b0JBQzNELGtDQUFrQyxDQUNyQyxDQUFDO2FBQ0w7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDaEQ7SUFDTCxDQUFDOztnQkFsRUosUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFFLFVBQVUsQ0FBRTtvQkFDdkIsT0FBTyxFQUFFLENBQUUsVUFBVSxDQUFFO2lCQUMxQjs7Ozs4Q0FhZ0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxnQkFBZ0I7O0lBbURwRCxxQkFBQztDQUFBLEFBbkVELElBbUVDO1NBL0RZLGNBQWM7Ozs7OztJQUV2Qiw2Q0FBb0M7Ozs7O0lBSXBDLG1DQUErRTs7Ozs7SUFJL0UsaUNBQXVFOzs7OztJQUUzRCw4Q0FBMkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCwgSW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vLyBJbmplY3Rpb24gdG9rZW4gdGhhdCBjb25maWd1cmVzIHdoZXRoZXIgdGhlIE1vc2FpYyBzYW5pdHkgY2hlY2tzIGFyZSBlbmFibGVkLlxuZXhwb3J0IGNvbnN0IE1DX1NBTklUWV9DSEVDS1MgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ21jLXNhbml0eS1jaGVja3MnLCB7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIGZhY3Rvcnk6IG1jU2FuaXR5Q2hlY2tzRmFjdG9yeVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBtY1Nhbml0eUNoZWNrc0ZhY3RvcnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogTW9kdWxlIHRoYXQgY2FwdHVyZXMgYW55dGhpbmcgdGhhdCBzaG91bGQgYmUgbG9hZGVkIGFuZC9vciBydW4gZm9yICphbGwqIE1vc2FpY1xuICogY29tcG9uZW50cy4gVGhpcyBpbmNsdWRlcyBCaWRpLCBldGMuXG4gKlxuICogVGhpcyBtb2R1bGUgc2hvdWxkIGJlIGltcG9ydGVkIHRvIGVhY2ggdG9wLWxldmVsIGNvbXBvbmVudCBtb2R1bGUgKGUuZy4sIE1jVGFic01vZHVsZSkuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogWyBCaWRpTW9kdWxlIF0sXG4gICAgZXhwb3J0czogWyBCaWRpTW9kdWxlIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNDb21tb25Nb2R1bGUge1xuICAgIC8vIFdoZXRoZXIgd2UndmUgZG9uZSB0aGUgZ2xvYmFsIHNhbml0eSBjaGVja3MgKGUuZy4gYSB0aGVtZSBpcyBsb2FkZWQsIHRoZXJlIGlzIGEgZG9jdHlwZSkuXG4gICAgcHJpdmF0ZSBoYXNEb25lR2xvYmFsQ2hlY2tzID0gZmFsc2U7XG5cbiAgICAvLyBSZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBgZG9jdW1lbnRgIG9iamVjdC5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG9ydGhvZG94LWdldHRlci1hbmQtc2V0dGVyXG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgPT09ICdvYmplY3QnICYmIGRvY3VtZW50ID8gZG9jdW1lbnQgOiBudWxsO1xuXG4gICAgLy8gUmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgJ3dpbmRvdycgb2JqZWN0LlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb3J0aG9kb3gtZ2V0dGVyLWFuZC1zZXR0ZXJcbiAgICBwcml2YXRlIF93aW5kb3cgPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cgPyB3aW5kb3cgOiBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChNQ19TQU5JVFlfQ0hFQ0tTKSBwcml2YXRlIF9zYW5pdHlDaGVja3NFbmFibGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmFyZUNoZWNrc0VuYWJsZWQoKSAmJiAhdGhpcy5oYXNEb25lR2xvYmFsQ2hlY2tzKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRG9jdHlwZUlzRGVmaW5lZCgpO1xuICAgICAgICAgICAgdGhpcy5jaGVja1RoZW1lSXNQcmVzZW50KCk7XG4gICAgICAgICAgICB0aGlzLmhhc0RvbmVHbG9iYWxDaGVja3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gV2hldGhlciBhbnkgc2FuaXR5IGNoZWNrcyBhcmUgZW5hYmxlZFxuICAgIHByaXZhdGUgYXJlQ2hlY2tzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nhbml0eUNoZWNrc0VuYWJsZWQgJiYgaXNEZXZNb2RlKCkgJiYgIXRoaXMuaXNUZXN0RW52KCk7XG4gICAgfVxuXG4gICAgLy8gV2hldGhlciB0aGUgY29kZSBpcyBydW5uaW5nIGluIHRlc3RzLlxuICAgIHByaXZhdGUgaXNUZXN0RW52KCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpbmRvdyAmJiAodGhpcy5fd2luZG93WydfX2thcm1hX18nXSB8fCB0aGlzLl93aW5kb3dbJ2phc21pbmUnXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0RvY3R5cGVJc0RlZmluZWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kb2N1bWVudCAmJiAhdGhpcy5fZG9jdW1lbnQuZG9jdHlwZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICdDdXJyZW50IGRvY3VtZW50IGRvZXMgbm90IGhhdmUgYSBkb2N0eXBlLiBUaGlzIG1heSBjYXVzZSAnICtcbiAgICAgICAgICAgICAgICAnc29tZSBNb3NhaWMgY29tcG9uZW50cyBub3QgdG8gYmVoYXZlIGFzIGV4cGVjdGVkLidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrVGhlbWVJc1ByZXNlbnQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kb2N1bWVudCAmJiB0eXBlb2YgZ2V0Q29tcHV0ZWRTdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc3QgdGVzdEVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWMtdGhlbWUtbG9hZGVkLW1hcmtlcicpO1xuICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRlc3RFbGVtZW50KTtcblxuICAgICAgICAgICAgLy8gSW4gc29tZSBzaXR1YXRpb25zLCB0aGUgY29tcHV0ZWQgc3R5bGUgb2YgdGhlIHRlc3QgZWxlbWVudCBjYW4gYmUgbnVsbC4gRm9yIGV4YW1wbGUgaW5cbiAgICAgICAgICAgIC8vIEZpcmVmb3gsIHRoZSBjb21wdXRlZCBzdHlsZSBpcyBudWxsIGlmIGFuIGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgaW5zaWRlIG9mIGEgaGlkZGVuIGlmcmFtZS5cbiAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gICAgICAgICAgICBpZiAoY29tcHV0ZWRTdHlsZSAmJiBjb21wdXRlZFN0eWxlLmRpc3BsYXkgIT09ICdub25lJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgICAgJ0NvdWxkIG5vdCBmaW5kIE1vc2FpYyBjb3JlIHRoZW1lLiBNb3N0IE1vc2FpYyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbXBvbmVudHMgbWF5IG5vdCB3b3JrIGFzIGV4cGVjdGVkLiBGb3IgbW9yZSBpbmZvIHJlZmVyICcgK1xuICAgICAgICAgICAgICAgICAgICAndG8gdGhlIHRoZW1pbmcgZ3VpZGU6IGxpbmsgdGhlcmUnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, InjectionToken, Input, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { MC_OPTION_PARENT_COMPONENT, McOptgroup, McOption } from '@ptsecurity/mosaic/core';
/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 * @type {?}
 */
let uniqueAutocompleteIdCounter = 0;
export class McAutocompleteSelectedEvent {
    /**
     * @param {?} source
     * @param {?} option
     */
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
if (false) {
    /** @type {?} */
    McAutocompleteSelectedEvent.prototype.source;
    /** @type {?} */
    McAutocompleteSelectedEvent.prototype.option;
}
/**
 * Default `mc-autocomplete` options that can be overridden.
 * @record
 */
export function McAutocompleteDefaultOptions() { }
if (false) {
    /**
     * Whether the first option should be highlighted when an autocomplete panel is opened.
     * @type {?|undefined}
     */
    McAutocompleteDefaultOptions.prototype.autoActiveFirstOption;
}
/**
 * Injection token to be used to override the default options for `mc-autocomplete`.
 * @type {?}
 */
export const MC_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken('mc-autocomplete-default-options', {
    providedIn: 'root',
    factory: MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY
});
// tslint:disable-next-line naming-convention
/**
 * @return {?}
 */
export function MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY() {
    return { autoActiveFirstOption: true };
}
export class McAutocomplete {
    /**
     * @param {?} changeDetectorRef
     * @param {?} elementRef
     * @param {?} defaults
     */
    constructor(changeDetectorRef, elementRef, defaults) {
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        /**
         * Unique ID to be used by autocomplete trigger's "aria-owns" property.
         */
        this.id = `mc-autocomplete-${uniqueAutocompleteIdCounter++}`;
        /**
         * Whether the autocomplete panel should be visible, depending on option length.
         */
        this.showPanel = false;
        /**
         * Function that maps an option's control value to its display value in the trigger.
         */
        this.displayWith = null;
        /**
         * Event that is emitted whenever an option from the list is selected.
         */
        this.optionSelected = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is opened.
         */
        this.opened = new EventEmitter();
        /**
         * Event that is emitted when the autocomplete panel is closed.
         */
        this.closed = new EventEmitter();
        this._classList = {};
        this._isOpen = false;
        this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
    }
    /**
     * Takes classes set on the host mc-autocomplete element and applies them to the panel
     * inside the overlay container to allow for easy styling.
     * @return {?}
     */
    get classList() {
        return this._classList;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set classList(value) {
        if (value && value.length) {
            value.split(' ')
                .forEach((/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._classList[className.trim()] = true));
            this.elementRef.nativeElement.className = '';
        }
    }
    /**
     * Whether the first option should be highlighted when the autocomplete panel is opened.
     * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
     * @return {?}
     */
    get autoActiveFirstOption() {
        return this._autoActiveFirstOption;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoActiveFirstOption(value) {
        this._autoActiveFirstOption = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this._isOpen && this.showPanel;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        this._isOpen = value;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.keyManager = new ActiveDescendantKeyManager(this.options);
        this.setVisibility();
    }
    /**
     * @param {?} scrollTop
     * @return {?}
     */
    setScrollTop(scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    }
    /**
     * @return {?}
     */
    getScrollTop() {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    }
    /**
     * @return {?}
     */
    setVisibility() {
        this.showPanel = !!this.options.length;
        this._classList['mc-autocomplete_visible'] = this.showPanel;
        this._classList['mc-autocomplete_hidden'] = !this.showPanel;
        this.changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} option
     * @return {?}
     */
    emitSelectEvent(option) {
        /** @type {?} */
        const event = new McAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this.keyManager.onKeydown(event);
    }
}
McAutocomplete.decorators = [
    { type: Component, args: [{
                selector: 'mc-autocomplete',
                exportAs: 'mcAutocomplete',
                template: "<ng-template>\n    <div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel>\n        <ng-content></ng-content>\n    </div>\n</ng-template>\n",
                host: {
                    class: 'mc-autocomplete'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{
                        provide: MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete
                    }],
                styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{-webkit-overflow-scrolling:touch;border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-style:solid;border-width:1px;margin-top:-1px;max-height:256px;max-width:none;min-width:100%;overflow:auto;padding:4px 0;position:relative;visibility:hidden;width:100%}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:0;border-top-left-radius:3px;border-top-right-radius:3px}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mc-autocomplete-panel,.cdk-high-contrast-active :host .mc-autocomplete-panel{outline:1px solid}"]
            }] }
];
/** @nocollapse */
McAutocomplete.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [MC_AUTOCOMPLETE_DEFAULT_OPTIONS,] }] }
];
McAutocomplete.propDecorators = {
    template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }],
    panel: [{ type: ViewChild, args: ['panel', { static: false },] }],
    options: [{ type: ContentChildren, args: [McOption, { descendants: true },] }],
    optionGroups: [{ type: ContentChildren, args: [McOptgroup,] }],
    displayWith: [{ type: Input }],
    panelWidth: [{ type: Input }],
    optionSelected: [{ type: Output }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    classList: [{ type: Input, args: ['class',] }],
    autoActiveFirstOption: [{ type: Input }]
};
if (false) {
    /**
     * Unique ID to be used by autocomplete trigger's "aria-owns" property.
     * @type {?}
     */
    McAutocomplete.prototype.id;
    /**
     * Manages active item in option list based on key events.
     * @type {?}
     */
    McAutocomplete.prototype.keyManager;
    /**
     * Whether the autocomplete panel should be visible, depending on option length.
     * @type {?}
     */
    McAutocomplete.prototype.showPanel;
    /** @type {?} */
    McAutocomplete.prototype.template;
    /** @type {?} */
    McAutocomplete.prototype.panel;
    /** @type {?} */
    McAutocomplete.prototype.options;
    /** @type {?} */
    McAutocomplete.prototype.optionGroups;
    /**
     * Function that maps an option's control value to its display value in the trigger.
     * @type {?}
     */
    McAutocomplete.prototype.displayWith;
    /**
     * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
     * match the width of its host.
     * @type {?}
     */
    McAutocomplete.prototype.panelWidth;
    /**
     * Event that is emitted whenever an option from the list is selected.
     * @type {?}
     */
    McAutocomplete.prototype.optionSelected;
    /**
     * Event that is emitted when the autocomplete panel is opened.
     * @type {?}
     */
    McAutocomplete.prototype.opened;
    /**
     * Event that is emitted when the autocomplete panel is closed.
     * @type {?}
     */
    McAutocomplete.prototype.closed;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype._classList;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype._autoActiveFirstOption;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype._isOpen;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McAutocomplete.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2F1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7SUFPdkYsMkJBQTJCLEdBQUcsQ0FBQztBQUVuQyxNQUFNLE9BQU8sMkJBQTJCOzs7OztJQUNwQyxZQUFtQixNQUFzQixFQUFTLE1BQWdCO1FBQS9DLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBVTtJQUFHLENBQUM7Q0FDekU7OztJQURlLDZDQUE2Qjs7SUFBRSw2Q0FBdUI7Ozs7OztBQUt0RSxrREFHQzs7Ozs7O0lBREcsNkRBQWdDOzs7Ozs7QUFJcEMsTUFBTSxPQUFPLCtCQUErQixHQUN4QyxJQUFJLGNBQWMsQ0FBK0IsaUNBQWlDLEVBQUU7SUFDaEYsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLHVDQUF1QztDQUNuRCxDQUFDOzs7OztBQUdOLE1BQU0sVUFBVSx1Q0FBdUM7SUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFF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a0NBQW1FOztJQUVuRSwrQkFBdUQ7O0lBRXZELGlDQUErRTs7SUFFL0Usc0NBQWlFOzs7OztJQUdqRSxxQ0FBNkQ7Ozs7OztJQU03RCxvQ0FBcUM7Ozs7O0lBR3JDLHdDQUNvRDs7Ozs7SUFHcEQsZ0NBQXlFOzs7OztJQUd6RSxnQ0FBeUU7Ozs7O0lBb0J6RSxvQ0FBNkI7Ozs7O0lBZTdCLGdEQUF3Qzs7Ozs7SUFVeEMsaUNBQWlDOzs7OztJQUc3QiwyQ0FBNEM7Ozs7O0lBQzVDLG9DQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9hMTF5JztcbmltcG9ydCB7IE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCBNY09wdGdyb3VwLCBNY09wdGlvbiB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuXG4vKipcbiAqIEF1dG9jb21wbGV0ZSBJRHMgbmVlZCB0byBiZSB1bmlxdWUgYWNyb3NzIGNvbXBvbmVudHMsIHNvIHRoaXMgY291bnRlciBleGlzdHMgb3V0c2lkZSBvZlxuICogdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLlxuICovXG5sZXQgdW5pcXVlQXV0b2NvbXBsZXRlSWRDb3VudGVyID0gMDtcblxuZXhwb3J0IGNsYXNzIE1jQXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNBdXRvY29tcGxldGUsIHB1YmxpYyBvcHRpb246IE1jT3B0aW9uKSB7fVxufVxuXG4vKiogRGVmYXVsdCBgbWMtYXV0b2NvbXBsZXRlYCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNBdXRvY29tcGxldGVEZWZhdWx0T3B0aW9ucyB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGZpcnN0IG9wdGlvbiBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgd2hlbiBhbiBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3BlbmVkLiAqL1xuICAgIGF1dG9BY3RpdmVGaXJzdE9wdGlvbj86IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdG8gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zIGZvciBgbWMtYXV0b2NvbXBsZXRlYC4gKi9cbmV4cG9ydCBjb25zdCBNQ19BVVRPQ09NUExFVEVfREVGQVVMVF9PUFRJT05TID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48TWNBdXRvY29tcGxldGVEZWZhdWx0T3B0aW9ucz4oJ21jLWF1dG9jb21wbGV0ZS1kZWZhdWx0LW9wdGlvbnMnLCB7XG4gICAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICAgICAgZmFjdG9yeTogTUNfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZXG4gICAgfSk7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX0FVVE9DT01QTEVURV9ERUZBVUxUX09QVElPTlNfRkFDVE9SWSgpOiBNY0F1dG9jb21wbGV0ZURlZmF1bHRPcHRpb25zIHtcbiAgICByZXR1cm4geyBhdXRvQWN0aXZlRmlyc3RPcHRpb246IHRydWUgfTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1hdXRvY29tcGxldGUnLFxuICAgIGV4cG9ydEFzOiAnbWNBdXRvY29tcGxldGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnYXV0b2NvbXBsZXRlLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydhdXRvY29tcGxldGUuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1hdXRvY29tcGxldGUnXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgICAgcHJvdmlkZTogTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIHVzZUV4aXN0aW5nOiBNY0F1dG9jb21wbGV0ZVxuICAgIH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jQXV0b2NvbXBsZXRlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqIFVuaXF1ZSBJRCB0byBiZSB1c2VkIGJ5IGF1dG9jb21wbGV0ZSB0cmlnZ2VyJ3MgXCJhcmlhLW93bnNcIiBwcm9wZXJ0eS4gKi9cbiAgICBpZDogc3RyaW5nID0gYG1jLWF1dG9jb21wbGV0ZS0ke3VuaXF1ZUF1dG9jb21wbGV0ZUlkQ291bnRlcisrfWA7XG5cbiAgICAvKiogTWFuYWdlcyBhY3RpdmUgaXRlbSBpbiBvcHRpb24gbGlzdCBiYXNlZCBvbiBrZXkgZXZlbnRzLiAqL1xuICAgIGtleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1jT3B0aW9uPjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgc2hvdWxkIGJlIHZpc2libGUsIGRlcGVuZGluZyBvbiBvcHRpb24gbGVuZ3RoLiAqL1xuICAgIHNob3dQYW5lbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogdHJ1ZX0pIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZCgncGFuZWwnLCB7c3RhdGljOiBmYWxzZX0pIHBhbmVsOiBFbGVtZW50UmVmO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY09wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25zOiBRdWVyeUxpc3Q8TWNPcHRpb24+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihNY09wdGdyb3VwKSBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxNY09wdGdyb3VwPjtcblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IG1hcHMgYW4gb3B0aW9uJ3MgY29udHJvbCB2YWx1ZSB0byBpdHMgZGlzcGxheSB2YWx1ZSBpbiB0aGUgdHJpZ2dlci4gKi9cbiAgICBASW5wdXQoKSBkaXNwbGF5V2l0aDogKCh2YWx1ZTogYW55KSA9PiBzdHJpbmcpIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSB3aWR0aCBvZiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsLiAgQ2FuIGJlIGFueSBDU1Mgc2l6aW5nIHZhbHVlLCBvdGhlcndpc2UgaXQgd2lsbFxuICAgICAqIG1hdGNoIHRoZSB3aWR0aCBvZiBpdHMgaG9zdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYW5lbFdpZHRoOiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIG9wdGlvbiBmcm9tIHRoZSBsaXN0IGlzIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvcHRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPE1jQXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudD4gPVxuICAgICAgICBuZXcgRXZlbnRFbWl0dGVyPE1jQXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudD4oKTtcblxuICAgIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW5lZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb3BlbmVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBjbG9zZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgY2xhc3NlcyBzZXQgb24gdGhlIGhvc3QgbWMtYXV0b2NvbXBsZXRlIGVsZW1lbnQgYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgcGFuZWxcbiAgICAgKiBpbnNpZGUgdGhlIG92ZXJsYXkgY29udGFpbmVyIHRvIGFsbG93IGZvciBlYXN5IHN0eWxpbmcuXG4gICAgICovXG4gICAgQElucHV0KCdjbGFzcycpXG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsYXNzTGlzdDtcbiAgICB9XG5cbiAgICBzZXQgY2xhc3NMaXN0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFsdWUuc3BsaXQoJyAnKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHRoaXMuX2NsYXNzTGlzdFtjbGFzc05hbWUudHJpbSgpXSA9IHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NsYXNzTGlzdDogYW55ID0ge307XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBmaXJzdCBvcHRpb24gc2hvdWxkIGJlIGhpZ2hsaWdodGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuZWQuXG4gICAgICogQ2FuIGJlIGNvbmZpZ3VyZWQgZ2xvYmFsbHkgdGhyb3VnaCB0aGUgYE1DX0FVVE9DT01QTEVURV9ERUZBVUxUX09QVElPTlNgIHRva2VuLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGF1dG9BY3RpdmVGaXJzdE9wdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9BY3RpdmVGaXJzdE9wdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9BY3RpdmVGaXJzdE9wdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXV0b0FjdGl2ZUZpcnN0T3B0aW9uOiBib29sZWFuO1xuXG4gICAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzT3BlbiAmJiB0aGlzLnNob3dQYW5lbDtcbiAgICB9XG5cbiAgICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzT3BlbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBASW5qZWN0KE1DX0FVVE9DT01QTEVURV9ERUZBVUxUX09QVElPTlMpIGRlZmF1bHRzOiBNY0F1dG9jb21wbGV0ZURlZmF1bHRPcHRpb25zXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2F1dG9BY3RpdmVGaXJzdE9wdGlvbiA9ICEhZGVmYXVsdHMuYXV0b0FjdGl2ZUZpcnN0T3B0aW9uO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1jT3B0aW9uPih0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTY3JvbGxUb3AoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFuZWwgPyB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wIDogMDtcbiAgICB9XG5cbiAgICBzZXRWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLnNob3dQYW5lbCA9ICEhdGhpcy5vcHRpb25zLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fY2xhc3NMaXN0WydtYy1hdXRvY29tcGxldGVfdmlzaWJsZSddID0gdGhpcy5zaG93UGFuZWw7XG4gICAgICAgIHRoaXMuX2NsYXNzTGlzdFsnbWMtYXV0b2NvbXBsZXRlX2hpZGRlbiddID0gIXRoaXMuc2hvd1BhbmVsO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZW1pdFNlbGVjdEV2ZW50KG9wdGlvbjogTWNPcHRpb24pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTWNBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50KHRoaXMsIG9wdGlvbik7XG5cbiAgICAgICAgdGhpcy5vcHRpb25TZWxlY3RlZC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBhbnkge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICB9XG59XG5cbiJdfQ==
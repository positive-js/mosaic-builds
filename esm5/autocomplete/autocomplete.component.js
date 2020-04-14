/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var uniqueAutocompleteIdCounter = 0;
var McAutocompleteSelectedEvent = /** @class */ (function () {
    function McAutocompleteSelectedEvent(source, option) {
        this.source = source;
        this.option = option;
    }
    return McAutocompleteSelectedEvent;
}());
export { McAutocompleteSelectedEvent };
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
export var MC_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken('mc-autocomplete-default-options', {
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
var McAutocomplete = /** @class */ (function () {
    function McAutocomplete(changeDetectorRef, elementRef, defaults) {
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        /**
         * Unique ID to be used by autocomplete trigger's "aria-owns" property.
         */
        this.id = "mc-autocomplete-" + uniqueAutocompleteIdCounter++;
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
    Object.defineProperty(McAutocomplete.prototype, "classList", {
        /**
         * Takes classes set on the host mc-autocomplete element and applies them to the panel
         * inside the overlay container to allow for easy styling.
         */
        get: /**
         * Takes classes set on the host mc-autocomplete element and applies them to the panel
         * inside the overlay container to allow for easy styling.
         * @return {?}
         */
        function () {
            return this._classList;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value && value.length) {
                value.split(' ')
                    .forEach((/**
                 * @param {?} className
                 * @return {?}
                 */
                function (className) { return _this._classList[className.trim()] = true; }));
                this.elementRef.nativeElement.className = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McAutocomplete.prototype, "autoActiveFirstOption", {
        /**
         * Whether the first option should be highlighted when the autocomplete panel is opened.
         * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
         */
        get: /**
         * Whether the first option should be highlighted when the autocomplete panel is opened.
         * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
         * @return {?}
         */
        function () {
            return this._autoActiveFirstOption;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._autoActiveFirstOption = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McAutocomplete.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isOpen && this.showPanel;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McAutocomplete.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.keyManager = new ActiveDescendantKeyManager(this.options);
        this.setVisibility();
    };
    /**
     * @param {?} scrollTop
     * @return {?}
     */
    McAutocomplete.prototype.setScrollTop = /**
     * @param {?} scrollTop
     * @return {?}
     */
    function (scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    };
    /**
     * @return {?}
     */
    McAutocomplete.prototype.getScrollTop = /**
     * @return {?}
     */
    function () {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    };
    /**
     * @return {?}
     */
    McAutocomplete.prototype.setVisibility = /**
     * @return {?}
     */
    function () {
        this.showPanel = !!this.options.length;
        this._classList['mc-autocomplete_visible'] = this.showPanel;
        this._classList['mc-autocomplete_hidden'] = !this.showPanel;
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} option
     * @return {?}
     */
    McAutocomplete.prototype.emitSelectEvent = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        /** @type {?} */
        var event = new McAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    McAutocomplete.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keyManager.onKeydown(event);
    };
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
                    styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:256px;border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-right-radius:3px;padding:4px 0}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:3px 3px 0 0}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mc-autocomplete-panel{outline:solid 1px}.cdk-high-contrast-active :host .mc-autocomplete-panel{outline:solid 1px}"]
                }] }
    ];
    /** @nocollapse */
    McAutocomplete.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [MC_AUTOCOMPLETE_DEFAULT_OPTIONS,] }] }
    ]; };
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
    return McAutocomplete;
}());
export { McAutocomplete };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJhdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0lBT3ZGLDJCQUEyQixHQUFHLENBQUM7QUFFbkM7SUFDSSxxQ0FBbUIsTUFBc0IsRUFBUyxNQUFnQjtRQUEvQyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0lBQzFFLGtDQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7SUFEZSw2Q0FBNkI7O0lBQUUsNkNBQXVCOzs7Ozs7QUFLdEUsa0RBR0M7Ozs7OztJQURHLDZEQUFnQzs7Ozs7O0FBSXBDLE1BQU0sS0FBTywrQkFBK0IsR0FDeEMsSUFBSSxjQUFjLENBQStCLGlDQUFpQyxFQUFFO0lBQ2hGLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSx1Q0FBdUM7Q0FDbkQsQ0FBQzs7Ozs7QUFHTixNQUFNLFVBQVUsdUNBQXVDO0lBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVB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LE9BQU87d0NBb0JiLEtBQUs7O0lBNkRWLHFCQUFDO0NBQUEsQUF4SUQsSUF3SUM7U0ExSFksY0FBYzs7Ozs7O0lBRXZCLDRCQUFnRTs7Ozs7SUFHaEUsb0NBQWlEOzs7OztJQUdqRCxtQ0FBMkI7O0lBRTNCLGtDQUFtRTs7SUFFbkUsK0JBQXVEOztJQUV2RCxpQ0FBK0U7O0lBRS9FLHNDQUFpRTs7Ozs7SUFHakUscUNBQTZEOzs7Ozs7SUFNN0Qsb0NBQXFDOzs7OztJQUdyQyx3Q0FDb0Q7Ozs7O0lBR3BELGdDQUF5RTs7Ozs7SUFHekUsZ0NBQXlFOzs7OztJQW9CekUsb0NBQTZCOzs7OztJQWU3QixnREFBd0M7Ozs7O0lBVXhDLGlDQUFpQzs7Ozs7SUFHN0IsMkNBQTRDOzs7OztJQUM1QyxvQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBNQ19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgTWNPcHRncm91cCwgTWNPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cblxuLyoqXG4gKiBBdXRvY29tcGxldGUgSURzIG5lZWQgdG8gYmUgdW5pcXVlIGFjcm9zcyBjb21wb25lbnRzLCBzbyB0aGlzIGNvdW50ZXIgZXhpc3RzIG91dHNpZGUgb2ZcbiAqIHRoZSBjb21wb25lbnQgZGVmaW5pdGlvbi5cbiAqL1xubGV0IHVuaXF1ZUF1dG9jb21wbGV0ZUlkQ291bnRlciA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNY0F1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jQXV0b2NvbXBsZXRlLCBwdWJsaWMgb3B0aW9uOiBNY09wdGlvbikge31cbn1cblxuLyoqIERlZmF1bHQgYG1jLWF1dG9jb21wbGV0ZWAgb3B0aW9ucyB0aGF0IGNhbiBiZSBvdmVycmlkZGVuLiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jQXV0b2NvbXBsZXRlRGVmYXVsdE9wdGlvbnMge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBmaXJzdCBvcHRpb24gc2hvdWxkIGJlIGhpZ2hsaWdodGVkIHdoZW4gYW4gYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW5lZC4gKi9cbiAgICBhdXRvQWN0aXZlRmlyc3RPcHRpb24/OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgYG1jLWF1dG9jb21wbGV0ZWAuICovXG5leHBvcnQgY29uc3QgTUNfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OUyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPE1jQXV0b2NvbXBsZXRlRGVmYXVsdE9wdGlvbnM+KCdtYy1hdXRvY29tcGxldGUtZGVmYXVsdC1vcHRpb25zJywge1xuICAgICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICAgIGZhY3Rvcnk6IE1DX0FVVE9DT01QTEVURV9ERUZBVUxUX09QVElPTlNfRkFDVE9SWVxuICAgIH0pO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19BVVRPQ09NUExFVEVfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUlkoKTogTWNBdXRvY29tcGxldGVEZWZhdWx0T3B0aW9ucyB7XG4gICAgcmV0dXJuIHsgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uOiB0cnVlIH07XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtYXV0b2NvbXBsZXRlJyxcbiAgICBleHBvcnRBczogJ21jQXV0b2NvbXBsZXRlJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2F1dG9jb21wbGV0ZS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnYXV0b2NvbXBsZXRlLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtYXV0b2NvbXBsZXRlJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTWNBdXRvY29tcGxldGVcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY0F1dG9jb21wbGV0ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKiBVbmlxdWUgSUQgdG8gYmUgdXNlZCBieSBhdXRvY29tcGxldGUgdHJpZ2dlcidzIFwiYXJpYS1vd25zXCIgcHJvcGVydHkuICovXG4gICAgaWQ6IHN0cmluZyA9IGBtYy1hdXRvY29tcGxldGUtJHt1bmlxdWVBdXRvY29tcGxldGVJZENvdW50ZXIrK31gO1xuXG4gICAgLyoqIE1hbmFnZXMgYWN0aXZlIGl0ZW0gaW4gb3B0aW9uIGxpc3QgYmFzZWQgb24ga2V5IGV2ZW50cy4gKi9cbiAgICBrZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNY09wdGlvbj47XG5cbiAgICAvKiogV2hldGhlciB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIHNob3VsZCBiZSB2aXNpYmxlLCBkZXBlbmRpbmcgb24gb3B0aW9uIGxlbmd0aC4gKi9cbiAgICBzaG93UGFuZWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IHRydWV9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoJ3BhbmVsJywge3N0YXRpYzogZmFsc2V9KSBwYW5lbDogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNPcHRpb24sIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgb3B0aW9uczogUXVlcnlMaXN0PE1jT3B0aW9uPjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oTWNPcHRncm91cCkgb3B0aW9uR3JvdXBzOiBRdWVyeUxpc3Q8TWNPcHRncm91cD47XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBtYXBzIGFuIG9wdGlvbidzIGNvbnRyb2wgdmFsdWUgdG8gaXRzIGRpc3BsYXkgdmFsdWUgaW4gdGhlIHRyaWdnZXIuICovXG4gICAgQElucHV0KCkgZGlzcGxheVdpdGg6ICgodmFsdWU6IGFueSkgPT4gc3RyaW5nKSB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgd2lkdGggb2YgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbC4gIENhbiBiZSBhbnkgQ1NTIHNpemluZyB2YWx1ZSwgb3RoZXJ3aXNlIGl0IHdpbGxcbiAgICAgKiBtYXRjaCB0aGUgd2lkdGggb2YgaXRzIGhvc3QuXG4gICAgICovXG4gICAgQElucHV0KCkgcGFuZWxXaWR0aDogc3RyaW5nIHwgbnVtYmVyO1xuXG4gICAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBvcHRpb24gZnJvbSB0aGUgbGlzdCBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb3B0aW9uU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxNY0F1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQ+ID1cbiAgICAgICAgbmV3IEV2ZW50RW1pdHRlcjxNY0F1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgY2xvc2VkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGNsYXNzZXMgc2V0IG9uIHRoZSBob3N0IG1jLWF1dG9jb21wbGV0ZSBlbGVtZW50IGFuZCBhcHBsaWVzIHRoZW0gdG8gdGhlIHBhbmVsXG4gICAgICogaW5zaWRlIHRoZSBvdmVybGF5IGNvbnRhaW5lciB0byBhbGxvdyBmb3IgZWFzeSBzdHlsaW5nLlxuICAgICAqL1xuICAgIEBJbnB1dCgnY2xhc3MnKVxuICAgIGdldCBjbGFzc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGFzc0xpc3Q7XG4gICAgfVxuXG4gICAgc2V0IGNsYXNzTGlzdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhbHVlLnNwbGl0KCcgJylcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB0aGlzLl9jbGFzc0xpc3RbY2xhc3NOYW1lLnRyaW0oKV0gPSB0cnVlKTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGFzc0xpc3Q6IGFueSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZmlyc3Qgb3B0aW9uIHNob3VsZCBiZSBoaWdobGlnaHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3BlbmVkLlxuICAgICAqIENhbiBiZSBjb25maWd1cmVkIGdsb2JhbGx5IHRocm91Z2ggdGhlIGBNQ19BVVRPQ09NUExFVEVfREVGQVVMVF9PUFRJT05TYCB0b2tlbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBhdXRvQWN0aXZlRmlyc3RPcHRpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvQWN0aXZlRmlyc3RPcHRpb247XG4gICAgfVxuXG4gICAgc2V0IGF1dG9BY3RpdmVGaXJzdE9wdGlvbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hdXRvQWN0aXZlRmlyc3RPcHRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2F1dG9BY3RpdmVGaXJzdE9wdGlvbjogYm9vbGVhbjtcblxuICAgIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc09wZW4gJiYgdGhpcy5zaG93UGFuZWw7XG4gICAgfVxuXG4gICAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9pc09wZW4gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgQEluamVjdChNQ19BVVRPQ09NUExFVEVfREVGQVVMVF9PUFRJT05TKSBkZWZhdWx0czogTWNBdXRvY29tcGxldGVEZWZhdWx0T3B0aW9uc1xuICAgICkge1xuICAgICAgICB0aGlzLl9hdXRvQWN0aXZlRmlyc3RPcHRpb24gPSAhIWRlZmF1bHRzLmF1dG9BY3RpdmVGaXJzdE9wdGlvbjtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNY09wdGlvbj4odGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2Nyb2xsVG9wKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhbmVsID8gdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA6IDA7XG4gICAgfVxuXG4gICAgc2V0VmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy5zaG93UGFuZWwgPSAhIXRoaXMub3B0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMuX2NsYXNzTGlzdFsnbWMtYXV0b2NvbXBsZXRlX3Zpc2libGUnXSA9IHRoaXMuc2hvd1BhbmVsO1xuICAgICAgICB0aGlzLl9jbGFzc0xpc3RbJ21jLWF1dG9jb21wbGV0ZV9oaWRkZW4nXSA9ICF0aGlzLnNob3dQYW5lbDtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGVtaXRTZWxlY3RFdmVudChvcHRpb246IE1jT3B0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1jQXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudCh0aGlzLCBvcHRpb24pO1xuXG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYW55IHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxufVxuXG4iXX0=
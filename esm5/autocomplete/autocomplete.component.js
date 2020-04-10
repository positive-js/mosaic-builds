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
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { class: 'mc-autocomplete' },
                    providers: [
                        { provide: MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete }
                    ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJhdXRvY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0lBT3ZGLDJCQUEyQixHQUFHLENBQUM7QUFFbkM7SUFDSSxxQ0FBbUIsTUFBc0IsRUFBUyxNQUFnQjtRQUEvQyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0lBQzFFLGtDQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7Ozs7SUFEZSw2Q0FBNkI7O0lBQUUsNkNBQXVCOzs7Ozs7QUFLdEUsa0RBR0M7Ozs7OztJQURHLDZEQUFnQzs7Ozs7O0FBSXBDLE1BQU0sS0FBTywrQkFBK0IsR0FDeEMsSUFBSSxjQUFjLENBQStCLGlDQUFpQyxFQUFFO0lBQ2hGLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSx1Q0FBdUM7Q0FDbkQsQ0FBQzs7Ozs7QUFHTixNQUFNLFVBQVUsdUNBQXVDO0lBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxJQUFJLEVB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QUFPO3dDQWdCYixLQUFLOztJQTZEVixxQkFBQztDQUFBLEFBdElELElBc0lDO1NBMUhZLGNBQWM7Ozs7OztJQUV2Qiw0QkFBZ0U7Ozs7O0lBR2hFLG9DQUFpRDs7Ozs7SUFHakQsbUNBQTJCOztJQUUzQixrQ0FBbUU7O0lBRW5FLCtCQUF1RDs7SUFFdkQsaUNBQStFOztJQUUvRSxzQ0FBaUU7Ozs7O0lBR2pFLHFDQUE2RDs7Ozs7O0lBTTdELG9DQUFxQzs7Ozs7SUFHckMsd0NBQ29EOzs7OztJQUdwRCxnQ0FBeUU7Ozs7O0lBR3pFLGdDQUF5RTs7Ozs7SUFvQnpFLG9DQUE2Qjs7Ozs7SUFlN0IsZ0RBQXdDOzs7OztJQVV4QyxpQ0FBaUM7Ozs7O0lBRzdCLDJDQUE0Qzs7Ozs7SUFDNUMsb0NBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIE1jT3B0Z3JvdXAsIE1jT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbi8qKlxuICogQXV0b2NvbXBsZXRlIElEcyBuZWVkIHRvIGJlIHVuaXF1ZSBhY3Jvc3MgY29tcG9uZW50cywgc28gdGhpcyBjb3VudGVyIGV4aXN0cyBvdXRzaWRlIG9mXG4gKiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24uXG4gKi9cbmxldCB1bmlxdWVBdXRvY29tcGxldGVJZENvdW50ZXIgPSAwO1xuXG5leHBvcnQgY2xhc3MgTWNBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY0F1dG9jb21wbGV0ZSwgcHVibGljIG9wdGlvbjogTWNPcHRpb24pIHt9XG59XG5cbi8qKiBEZWZhdWx0IGBtYy1hdXRvY29tcGxldGVgIG9wdGlvbnMgdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbi4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY0F1dG9jb21wbGV0ZURlZmF1bHRPcHRpb25zIHtcbiAgICAvKiogV2hldGhlciB0aGUgZmlyc3Qgb3B0aW9uIHNob3VsZCBiZSBoaWdobGlnaHRlZCB3aGVuIGFuIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuZWQuICovXG4gICAgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uPzogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIGBtYy1hdXRvY29tcGxldGVgLiAqL1xuZXhwb3J0IGNvbnN0IE1DX0FVVE9DT01QTEVURV9ERUZBVUxUX09QVElPTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxNY0F1dG9jb21wbGV0ZURlZmF1bHRPcHRpb25zPignbWMtYXV0b2NvbXBsZXRlLWRlZmF1bHQtb3B0aW9ucycsIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBNQ19BVVRPQ09NUExFVEVfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUllcbiAgICB9KTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1jQXV0b2NvbXBsZXRlRGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB7IGF1dG9BY3RpdmVGaXJzdE9wdGlvbjogdHJ1ZSB9O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWF1dG9jb21wbGV0ZScsXG4gICAgZXhwb3J0QXM6ICdtY0F1dG9jb21wbGV0ZScsXG4gICAgdGVtcGxhdGVVcmw6ICdhdXRvY29tcGxldGUuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2F1dG9jb21wbGV0ZS5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7IGNsYXNzOiAnbWMtYXV0b2NvbXBsZXRlJyB9LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5ULCB1c2VFeGlzdGluZzogTWNBdXRvY29tcGxldGUgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNBdXRvY29tcGxldGUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKiogVW5pcXVlIElEIHRvIGJlIHVzZWQgYnkgYXV0b2NvbXBsZXRlIHRyaWdnZXIncyBcImFyaWEtb3duc1wiIHByb3BlcnR5LiAqL1xuICAgIGlkOiBzdHJpbmcgPSBgbWMtYXV0b2NvbXBsZXRlLSR7dW5pcXVlQXV0b2NvbXBsZXRlSWRDb3VudGVyKyt9YDtcblxuICAgIC8qKiBNYW5hZ2VzIGFjdGl2ZSBpdGVtIGluIG9wdGlvbiBsaXN0IGJhc2VkIG9uIGtleSBldmVudHMuICovXG4gICAga2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8TWNPcHRpb24+O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBzaG91bGQgYmUgdmlzaWJsZSwgZGVwZW5kaW5nIG9uIG9wdGlvbiBsZW5ndGguICovXG4gICAgc2hvd1BhbmVsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiB0cnVlfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAVmlld0NoaWxkKCdwYW5lbCcsIHtzdGF0aWM6IGZhbHNlfSkgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY09wdGlvbj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jT3B0Z3JvdXApIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE1jT3B0Z3JvdXA+O1xuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgbWFwcyBhbiBvcHRpb24ncyBjb250cm9sIHZhbHVlIHRvIGl0cyBkaXNwbGF5IHZhbHVlIGluIHRoZSB0cmlnZ2VyLiAqL1xuICAgIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBhbnkpID0+IHN0cmluZykgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIHdpZHRoIG9mIHRoZSBhdXRvY29tcGxldGUgcGFuZWwuICBDYW4gYmUgYW55IENTUyBzaXppbmcgdmFsdWUsIG90aGVyd2lzZSBpdCB3aWxsXG4gICAgICogbWF0Y2ggdGhlIHdpZHRoIG9mIGl0cyBob3N0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhbmVsV2lkdGg6IHN0cmluZyB8IG51bWJlcjtcblxuICAgIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gb3B0aW9uIGZyb20gdGhlIGxpc3QgaXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8TWNBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50PiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50PigpO1xuXG4gICAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIGNsb3NlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBjbGFzc2VzIHNldCBvbiB0aGUgaG9zdCBtYy1hdXRvY29tcGxldGUgZWxlbWVudCBhbmQgYXBwbGllcyB0aGVtIHRvIHRoZSBwYW5lbFxuICAgICAqIGluc2lkZSB0aGUgb3ZlcmxheSBjb250YWluZXIgdG8gYWxsb3cgZm9yIGVhc3kgc3R5bGluZy5cbiAgICAgKi9cbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NMaXN0O1xuICAgIH1cblxuICAgIEBJbnB1dCgnY2xhc3MnKVxuICAgIHNldCBjbGFzc0xpc3QodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YWx1ZS5zcGxpdCgnICcpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGNsYXNzTmFtZSkgPT4gdGhpcy5fY2xhc3NMaXN0W2NsYXNzTmFtZS50cmltKCldID0gdHJ1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xhc3NMaXN0OiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGZpcnN0IG9wdGlvbiBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW5lZC5cbiAgICAgKiBDYW4gYmUgY29uZmlndXJlZCBnbG9iYWxseSB0aHJvdWdoIHRoZSBgTUNfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OU2AgdG9rZW4uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b0FjdGl2ZUZpcnN0T3B0aW9uO1xuICAgIH1cblxuICAgIHNldCBhdXRvQWN0aXZlRmlyc3RPcHRpb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXV0b0FjdGl2ZUZpcnN0T3B0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hdXRvQWN0aXZlRmlyc3RPcHRpb246IGJvb2xlYW47XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNPcGVuICYmIHRoaXMuc2hvd1BhbmVsO1xuICAgIH1cblxuICAgIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNPcGVuID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIEBJbmplY3QoTUNfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OUykgZGVmYXVsdHM6IE1jQXV0b2NvbXBsZXRlRGVmYXVsdE9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgdGhpcy5fYXV0b0FjdGl2ZUZpcnN0T3B0aW9uID0gISFkZWZhdWx0cy5hdXRvQWN0aXZlRmlyc3RPcHRpb247XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8TWNPcHRpb24+KHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIHNldFNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNjcm9sbFRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5wYW5lbCA/IHRoaXMucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgOiAwO1xuICAgIH1cblxuICAgIHNldFZpc2liaWxpdHkoKSB7XG4gICAgICAgIHRoaXMuc2hvd1BhbmVsID0gISF0aGlzLm9wdGlvbnMubGVuZ3RoO1xuICAgICAgICB0aGlzLl9jbGFzc0xpc3RbJ21jLWF1dG9jb21wbGV0ZV92aXNpYmxlJ10gPSB0aGlzLnNob3dQYW5lbDtcbiAgICAgICAgdGhpcy5fY2xhc3NMaXN0WydtYy1hdXRvY29tcGxldGVfaGlkZGVuJ10gPSAhdGhpcy5zaG93UGFuZWw7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBlbWl0U2VsZWN0RXZlbnQob3B0aW9uOiBNY09wdGlvbik6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNY0F1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQodGhpcywgb3B0aW9uKTtcblxuICAgICAgICB0aGlzLm9wdGlvblNlbGVjdGVkLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IGFueSB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cbn1cblxuIl19
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, InjectionToken, Input, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { MC_OPTION_PARENT_COMPONENT, McOptgroup, McOption } from '@ptsecurity/mosaic/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let uniqueAutocompleteIdCounter = 0;
export class McAutocompleteSelectedEvent {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
/** Injection token to be used to override the default options for `mc-autocomplete`. */
export const MC_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken('mc-autocomplete-default-options', {
    providedIn: 'root',
    factory: MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY
});
// tslint:disable-next-line naming-convention
export function MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY() {
    return { autoActiveFirstOption: true };
}
export class McAutocomplete {
    constructor(changeDetectorRef, elementRef, defaults) {
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
        this.id = `mc-autocomplete-${uniqueAutocompleteIdCounter++}`;
        /** Whether the autocomplete panel should be visible, depending on option length. */
        this.showPanel = false;
        /** Function that maps an option's control value to its display value in the trigger. */
        this.displayWith = null;
        /** Event that is emitted whenever an option from the list is selected. */
        this.optionSelected = new EventEmitter();
        /** Event that is emitted when the autocomplete panel is opened. */
        this.opened = new EventEmitter();
        /** Event that is emitted when the autocomplete panel is closed. */
        this.closed = new EventEmitter();
        this._classList = {};
        this._isOpen = false;
        this._openOnFocus = true;
        this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
    }
    /**
     * Takes classes set on the host mc-autocomplete element and applies them to the panel
     * inside the overlay container to allow for easy styling.
     */
    get classList() {
        return this._classList;
    }
    set classList(value) {
        if (value && value.length) {
            value.split(' ')
                .forEach((className) => this._classList[className.trim()] = true);
            this.elementRef.nativeElement.className = '';
        }
    }
    /**
     * Whether the first option should be highlighted when the autocomplete panel is opened.
     * Can be configured globally through the `MC_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
     */
    get autoActiveFirstOption() {
        return this._autoActiveFirstOption;
    }
    set autoActiveFirstOption(value) {
        this._autoActiveFirstOption = coerceBooleanProperty(value);
    }
    get isOpen() {
        return this._isOpen && this.showPanel;
    }
    set isOpen(value) {
        this._isOpen = value;
    }
    get openOnFocus() {
        return this._openOnFocus;
    }
    set openOnFocus(value) {
        this._openOnFocus = value;
    }
    ngAfterContentInit() {
        this.keyManager = new ActiveDescendantKeyManager(this.options);
        this.setVisibility();
    }
    setScrollTop(scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    }
    getScrollTop() {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    }
    setVisibility() {
        this.showPanel = !!this.options.length;
        this._classList['mc-autocomplete_visible'] = this.showPanel;
        this._classList['mc-autocomplete_hidden'] = !this.showPanel;
        this.changeDetectorRef.markForCheck();
    }
    emitSelectEvent(option) {
        const event = new McAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    }
    onKeydown(event) {
        this.keyManager.onKeydown(event);
    }
}
/** @nocollapse */ /** @nocollapse */ McAutocomplete.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McAutocomplete, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: MC_AUTOCOMPLETE_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McAutocomplete.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: McAutocomplete, selector: "mc-autocomplete", inputs: { displayWith: "displayWith", panelWidth: "panelWidth", classList: ["class", "classList"], autoActiveFirstOption: "autoActiveFirstOption", openOnFocus: "openOnFocus" }, outputs: { optionSelected: "optionSelected", opened: "opened", closed: "closed" }, host: { classAttribute: "mc-autocomplete" }, providers: [{
            provide: MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete
        }], queries: [{ propertyName: "options", predicate: McOption, descendants: true }, { propertyName: "optionGroups", predicate: McOptgroup }], viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], exportAs: ["mcAutocomplete"], ngImport: i0, template: "<ng-template>\n    <div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel>\n        <ng-content></ng-content>\n    </div>\n</ng-template>\n", styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:256px;max-height:var(--mc-autocomplete-size-panel-max-height, 256px);border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-autocomplete-size-panel-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-autocomplete-size-panel-border-radius, 3px);padding:4px 0;padding:var(--mc-autocomplete-size-panel-padding, 4px 0)}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:3px 3px 0 0;border-radius:var(--mc-autocomplete-size-panel-border-radius, 3px) var(--mc-autocomplete-size-panel-border-radius, 3px) 0 0}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mc-autocomplete-panel{outline:solid 1px}.cdk-high-contrast-active :host .mc-autocomplete-panel{outline:solid 1px}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McAutocomplete, decorators: [{
            type: Component,
            args: [{ selector: 'mc-autocomplete', exportAs: 'mcAutocomplete', host: {
                        class: 'mc-autocomplete'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [{
                            provide: MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete
                        }], template: "<ng-template>\n    <div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel>\n        <ng-content></ng-content>\n    </div>\n</ng-template>\n", styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:256px;max-height:var(--mc-autocomplete-size-panel-max-height, 256px);border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-autocomplete-size-panel-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-autocomplete-size-panel-border-radius, 3px);padding:4px 0;padding:var(--mc-autocomplete-size-panel-padding, 4px 0)}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:3px 3px 0 0;border-radius:var(--mc-autocomplete-size-panel-border-radius, 3px) var(--mc-autocomplete-size-panel-border-radius, 3px) 0 0}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mc-autocomplete-panel{outline:solid 1px}.cdk-high-contrast-active :host .mc-autocomplete-panel{outline:solid 1px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_AUTOCOMPLETE_DEFAULT_OPTIONS]
                }] }]; }, propDecorators: { template: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], panel: [{
                type: ViewChild,
                args: ['panel', { static: false }]
            }], options: [{
                type: ContentChildren,
                args: [McOption, { descendants: true }]
            }], optionGroups: [{
                type: ContentChildren,
                args: [McOptgroup]
            }], displayWith: [{
                type: Input
            }], panelWidth: [{
                type: Input
            }], optionSelected: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], classList: [{
                type: Input,
                args: ['class']
            }], autoActiveFirstOption: [{
                type: Input
            }], openOnFocus: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBRzNGOzs7R0FHRztBQUNILElBQUksMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO0FBRXBDLE1BQU0sT0FBTywyQkFBMkI7SUFDcEMsWUFBbUIsTUFBc0IsRUFBUyxNQUFnQjtRQUEvQyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0NBQ3pFO0FBU0Qsd0ZBQXdGO0FBQ3hGLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUN4QyxJQUFJLGNBQWMsQ0FBK0IsaUNBQWlDLEVBQUU7SUFDaEYsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLHVDQUF1QztDQUNuRCxDQUFDLENBQUM7QUFFUCw2Q0FBNkM7QUFDN0MsTUFBTSxVQUFVLHVDQUF1QztJ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QUM7Z0JBRUQsS0FBSztzQkFBekMsU0FBUzt1QkFBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO2dCQUVlLE9BQU87c0JBQXhELGVBQWU7dUJBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFFbkIsWUFBWTtzQkFBeEMsZUFBZTt1QkFBQyxVQUFVO2dCQUdsQixXQUFXO3NCQUFuQixLQUFLO2dCQU1HLFVBQVU7c0JBQWxCLEtBQUs7Z0JBR2EsY0FBYztzQkFBaEMsTUFBTTtnQkFJWSxNQUFNO3NCQUF4QixNQUFNO2dCQUdZLE1BQU07c0JBQXhCLE1BQU07Z0JBT0gsU0FBUztzQkFEWixLQUFLO3VCQUFDLE9BQU87Z0JBcUJWLHFCQUFxQjtzQkFEeEIsS0FBSztnQkFzQkYsV0FBVztzQkFEZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2ExMXknO1xuaW1wb3J0IHsgTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsIE1jT3B0Z3JvdXAsIE1jT3B0aW9uIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5cbi8qKlxuICogQXV0b2NvbXBsZXRlIElEcyBuZWVkIHRvIGJlIHVuaXF1ZSBhY3Jvc3MgY29tcG9uZW50cywgc28gdGhpcyBjb3VudGVyIGV4aXN0cyBvdXRzaWRlIG9mXG4gKiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24uXG4gKi9cbmxldCB1bmlxdWVBdXRvY29tcGxldGVJZENvdW50ZXIgPSAwO1xuXG5leHBvcnQgY2xhc3MgTWNBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY0F1dG9jb21wbGV0ZSwgcHVibGljIG9wdGlvbjogTWNPcHRpb24pIHt9XG59XG5cbi8qKiBEZWZhdWx0IGBtYy1hdXRvY29tcGxldGVgIG9wdGlvbnMgdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbi4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY0F1dG9jb21wbGV0ZURlZmF1bHRPcHRpb25zIHtcbiAgICAvKiogV2hldGhlciB0aGUgZmlyc3Qgb3B0aW9uIHNob3VsZCBiZSBoaWdobGlnaHRlZCB3aGVuIGFuIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuZWQuICovXG4gICAgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uPzogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIGBtYy1hdXRvY29tcGxldGVgLiAqL1xuZXhwb3J0IGNvbnN0IE1DX0FVVE9DT01QTEVURV9ERUZBVUxUX09QVElPTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxNY0F1dG9jb21wbGV0ZURlZmF1bHRPcHRpb25zPignbWMtYXV0b2NvbXBsZXRlLWRlZmF1bHQtb3B0aW9ucycsIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBNQ19BVVRPQ09NUExFVEVfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUllcbiAgICB9KTtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1jQXV0b2NvbXBsZXRlRGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB7IGF1dG9BY3RpdmVGaXJzdE9wdGlvbjogdHJ1ZSB9O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWF1dG9jb21wbGV0ZScsXG4gICAgZXhwb3J0QXM6ICdtY0F1dG9jb21wbGV0ZScsXG4gICAgdGVtcGxhdGVVcmw6ICdhdXRvY29tcGxldGUuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2F1dG9jb21wbGV0ZS5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWF1dG9jb21wbGV0ZSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBNQ19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCwgdXNlRXhpc3Rpbmc6IE1jQXV0b2NvbXBsZXRlXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNBdXRvY29tcGxldGUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKiogVW5pcXVlIElEIHRvIGJlIHVzZWQgYnkgYXV0b2NvbXBsZXRlIHRyaWdnZXIncyBcImFyaWEtb3duc1wiIHByb3BlcnR5LiAqL1xuICAgIGlkOiBzdHJpbmcgPSBgbWMtYXV0b2NvbXBsZXRlLSR7dW5pcXVlQXV0b2NvbXBsZXRlSWRDb3VudGVyKyt9YDtcblxuICAgIC8qKiBNYW5hZ2VzIGFjdGl2ZSBpdGVtIGluIG9wdGlvbiBsaXN0IGJhc2VkIG9uIGtleSBldmVudHMuICovXG4gICAga2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8TWNPcHRpb24+O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBzaG91bGQgYmUgdmlzaWJsZSwgZGVwZW5kaW5nIG9uIG9wdGlvbiBsZW5ndGguICovXG4gICAgc2hvd1BhbmVsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiB0cnVlfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAVmlld0NoaWxkKCdwYW5lbCcsIHtzdGF0aWM6IGZhbHNlfSkgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNY09wdGlvbj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKE1jT3B0Z3JvdXApIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE1jT3B0Z3JvdXA+O1xuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgbWFwcyBhbiBvcHRpb24ncyBjb250cm9sIHZhbHVlIHRvIGl0cyBkaXNwbGF5IHZhbHVlIGluIHRoZSB0cmlnZ2VyLiAqL1xuICAgIEBJbnB1dCgpIGRpc3BsYXlXaXRoOiAoKHZhbHVlOiBhbnkpID0+IHN0cmluZykgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIHdpZHRoIG9mIHRoZSBhdXRvY29tcGxldGUgcGFuZWwuICBDYW4gYmUgYW55IENTUyBzaXppbmcgdmFsdWUsIG90aGVyd2lzZSBpdCB3aWxsXG4gICAgICogbWF0Y2ggdGhlIHdpZHRoIG9mIGl0cyBob3N0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhbmVsV2lkdGg6IHN0cmluZyB8IG51bWJlcjtcblxuICAgIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gb3B0aW9uIGZyb20gdGhlIGxpc3QgaXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8TWNBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50PiA9XG4gICAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWNBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50PigpO1xuXG4gICAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgb3BlbmVkLiAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIGNsb3NlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBjbGFzc2VzIHNldCBvbiB0aGUgaG9zdCBtYy1hdXRvY29tcGxldGUgZWxlbWVudCBhbmQgYXBwbGllcyB0aGVtIHRvIHRoZSBwYW5lbFxuICAgICAqIGluc2lkZSB0aGUgb3ZlcmxheSBjb250YWluZXIgdG8gYWxsb3cgZm9yIGVhc3kgc3R5bGluZy5cbiAgICAgKi9cbiAgICBASW5wdXQoJ2NsYXNzJylcbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NMaXN0O1xuICAgIH1cblxuICAgIHNldCBjbGFzc0xpc3QodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YWx1ZS5zcGxpdCgnICcpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGNsYXNzTmFtZSkgPT4gdGhpcy5fY2xhc3NMaXN0W2NsYXNzTmFtZS50cmltKCldID0gdHJ1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZSA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xhc3NMaXN0OiBhbnkgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGZpcnN0IG9wdGlvbiBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgd2hlbiB0aGUgYXV0b2NvbXBsZXRlIHBhbmVsIGlzIG9wZW5lZC5cbiAgICAgKiBDYW4gYmUgY29uZmlndXJlZCBnbG9iYWxseSB0aHJvdWdoIHRoZSBgTUNfQVVUT0NPTVBMRVRFX0RFRkFVTFRfT1BUSU9OU2AgdG9rZW4uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgYXV0b0FjdGl2ZUZpcnN0T3B0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b0FjdGl2ZUZpcnN0T3B0aW9uO1xuICAgIH1cblxuICAgIHNldCBhdXRvQWN0aXZlRmlyc3RPcHRpb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXV0b0FjdGl2ZUZpcnN0T3B0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hdXRvQWN0aXZlRmlyc3RPcHRpb246IGJvb2xlYW47XG5cbiAgICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNPcGVuICYmIHRoaXMuc2hvd1BhbmVsO1xuICAgIH1cblxuICAgIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNPcGVuID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBvcGVuT25Gb2N1cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5PbkZvY3VzO1xuICAgIH1cblxuICAgIHNldCBvcGVuT25Gb2N1cyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9vcGVuT25Gb2N1cyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29wZW5PbkZvY3VzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgQEluamVjdChNQ19BVVRPQ09NUExFVEVfREVGQVVMVF9PUFRJT05TKSBkZWZhdWx0czogTWNBdXRvY29tcGxldGVEZWZhdWx0T3B0aW9uc1xuICAgICkge1xuICAgICAgICB0aGlzLl9hdXRvQWN0aXZlRmlyc3RPcHRpb24gPSAhIWRlZmF1bHRzLmF1dG9BY3RpdmVGaXJzdE9wdGlvbjtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNY09wdGlvbj4odGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2Nyb2xsVG9wKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhbmVsID8gdGhpcy5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA6IDA7XG4gICAgfVxuXG4gICAgc2V0VmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy5zaG93UGFuZWwgPSAhIXRoaXMub3B0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMuX2NsYXNzTGlzdFsnbWMtYXV0b2NvbXBsZXRlX3Zpc2libGUnXSA9IHRoaXMuc2hvd1BhbmVsO1xuICAgICAgICB0aGlzLl9jbGFzc0xpc3RbJ21jLWF1dG9jb21wbGV0ZV9oaWRkZW4nXSA9ICF0aGlzLnNob3dQYW5lbDtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGVtaXRTZWxlY3RFdmVudChvcHRpb246IE1jT3B0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1jQXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudCh0aGlzLCBvcHRpb24pO1xuXG4gICAgICAgIHRoaXMub3B0aW9uU2VsZWN0ZWQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYW55IHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxufVxuXG4iLCI8bmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm1jLWF1dG9jb21wbGV0ZS1wYW5lbFwiIHJvbGU9XCJsaXN0Ym94XCIgW2lkXT1cImlkXCIgW25nQ2xhc3NdPVwiY2xhc3NMaXN0XCIgI3BhbmVsPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19
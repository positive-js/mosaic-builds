import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { InjectionToken, EventEmitter, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, ViewChild, ContentChildren, Input, Output, Directive, forwardRef, Optional, Host, NgModule } from '@angular/core';
import { ActiveDescendantKeyManager } from '@ptsecurity/cdk/a11y';
import { MC_OPTION_PARENT_COMPONENT, McOption, McOptgroup, McOptionSelectionChange, countGroupLabelsBeforeOption, getOptionScrollPosition, McOptionModule, McCommonModule } from '@ptsecurity/mosaic/core';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i1$1 from '@angular/cdk/overlay';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ESCAPE, ENTER, TAB, DOWN_ARROW, UP_ARROW } from '@ptsecurity/cdk/keycodes';
import { defer, merge, Subscription, Subject, of, fromEvent } from 'rxjs';
import { take, switchMap, filter, map, tap, delay } from 'rxjs/operators';
import * as i2 from '@angular/cdk/bidi';
import * as i3 from '@ptsecurity/mosaic/form-field';
import * as i4 from '@angular/cdk/scrolling';

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let uniqueAutocompleteIdCounter = 0;
class McAutocompleteSelectedEvent {
    constructor(source, option) {
        this.source = source;
        this.option = option;
    }
}
/** Injection token to be used to override the default options for `mc-autocomplete`. */
const MC_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken('mc-autocomplete-default-options', {
    providedIn: 'root',
    factory: MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY
});
// tslint:disable-next-line naming-convention
function MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY() {
    return { autoActiveFirstOption: true };
}
class McAutocomplete {
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
/** @nocollapse */ /** @nocollapse */ McAutocomplete.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocomplete, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: MC_AUTOCOMPLETE_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McAutocomplete.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: McAutocomplete, selector: "mc-autocomplete", inputs: { displayWith: "displayWith", panelWidth: "panelWidth", classList: ["class", "classList"], autoActiveFirstOption: "autoActiveFirstOption", openOnFocus: "openOnFocus" }, outputs: { optionSelected: "optionSelected", opened: "opened", closed: "closed" }, host: { classAttribute: "mc-autocomplete" }, providers: [{
            provide: MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete
        }], queries: [{ propertyName: "options", predicate: McOption, descendants: true }, { propertyName: "optionGroups", predicate: McOptgroup }], viewQueries: [{ propertyName: "template", first: true, predicate: TemplateRef, descendants: true, static: true }, { propertyName: "panel", first: true, predicate: ["panel"], descendants: true }], exportAs: ["mcAutocomplete"], ngImport: i0, template: "<ng-template>\n    <div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel>\n        <ng-content></ng-content>\n    </div>\n</ng-template>\n", styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:256px;max-height:var(--mc-autocomplete-size-panel-max-height, 256px);border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-autocomplete-size-panel-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-autocomplete-size-panel-border-radius, 3px);padding:4px 0;padding:var(--mc-autocomplete-size-panel-padding, 4px 0)}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:3px 3px 0 0;border-radius:var(--mc-autocomplete-size-panel-border-radius, 3px) var(--mc-autocomplete-size-panel-border-radius, 3px) 0 0}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mc-autocomplete-panel{outline:solid 1px}.cdk-high-contrast-active :host .mc-autocomplete-panel{outline:solid 1px}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocomplete, decorators: [{
            type: Component,
            args: [{ selector: 'mc-autocomplete', exportAs: 'mcAutocomplete', host: {
                        class: 'mc-autocomplete'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [{
                            provide: MC_OPTION_PARENT_COMPONENT, useExisting: McAutocomplete
                        }], template: "<ng-template>\n    <div class=\"mc-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"classList\" #panel>\n        <ng-content></ng-content>\n    </div>\n</ng-template>\n", styles: [".mc-autocomplete-trigger{text-overflow:ellipsis}.mc-autocomplete-panel{visibility:hidden;position:relative;overflow:auto;-webkit-overflow-scrolling:touch;margin-top:-1px;min-width:100%;width:100%;max-width:none;max-height:256px;max-height:var(--mc-autocomplete-size-panel-max-height, 256px);border-width:1px;border-style:solid;border-bottom-left-radius:3px;border-bottom-left-radius:var(--mc-autocomplete-size-panel-border-radius, 3px);border-bottom-right-radius:3px;border-bottom-right-radius:var(--mc-autocomplete-size-panel-border-radius, 3px);padding:4px 0;padding:var(--mc-autocomplete-size-panel-padding, 4px 0)}.mc-autocomplete-panel.mc-autocomplete_visible{visibility:visible}.mc-autocomplete-panel.mc-autocomplete_hidden{visibility:hidden}.mc-autocomplete-panel-above .mc-autocomplete-panel{border-radius:3px 3px 0 0;border-radius:var(--mc-autocomplete-size-panel-border-radius, 3px) var(--mc-autocomplete-size-panel-border-radius, 3px) 0 0}.mc-autocomplete-panel .mc-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mc-autocomplete-panel{outline:solid 1px}.cdk-high-contrast-active :host .mc-autocomplete-panel{outline:solid 1px}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MC_AUTOCOMPLETE_DEFAULT_OPTIONS]
                    }] }];
    }, propDecorators: { template: [{
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

/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
class McAutocompleteOrigin {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
/** @nocollapse */ /** @nocollapse */ McAutocompleteOrigin.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocompleteOrigin, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McAutocompleteOrigin.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McAutocompleteOrigin, selector: "[mcAutocompleteOrigin]", exportAs: ["mcAutocompleteOrigin"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocompleteOrigin, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcAutocompleteOrigin]',
                    exportAs: 'mcAutocompleteOrigin'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });

/**
 * The following style constants are necessary to save here in order
 * to properly calculate the scrollTop of the panel. Because we are not
 * actually focusing the active item, scroll must be handled manually.
 */
/** The height of each autocomplete option. */
const AUTOCOMPLETE_OPTION_HEIGHT = 32;
/** The total height of the autocomplete panel. */
const AUTOCOMPLETE_PANEL_HEIGHT = 256;
const AUTOCOMPLETE_BORDER_WIDTH = 2;
/** Injection token that determines the scroll handling while the autocomplete panel is open. */
const MC_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken('mc-autocomplete-scroll-strategy');
// tslint:disable-next-line naming-convention
function MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
const MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MC_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
const MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => McAutocompleteTrigger),
    multi: true
};
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 * @docs-private
 */
function getMcAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `mc-autocomplete`. ' +
        'Make sure that the id passed to the `mcAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}
class McAutocompleteTrigger {
    constructor(elementRef, viewContainerRef, changeDetectorRef, overlay, zone, scrollStrategy, dir, formField, document, 
    // @breaking-change 8.0.0 Make `_viewportRuler` required.
    viewportRuler) {
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.changeDetectorRef = changeDetectorRef;
        this.overlay = overlay;
        this.zone = zone;
        this.dir = dir;
        this.formField = formField;
        this.document = document;
        this.viewportRuler = viewportRuler;
        // @ts-ignore
        this.optionSelections = defer(() => {
            if (this.autocomplete && this.autocomplete.options) {
                return merge(...this.autocomplete.options.map((option) => option.onSelectionChange));
            }
            // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
            // Return a stream that we'll replace with the real one once everything is in place.
            return this.zone.onStable
                .asObservable()
                .pipe(take(1), switchMap(() => this.optionSelections));
        });
        /**
         * `autocomplete` attribute to be set on the input element.
         * @docs-private
         */
        this.autocompleteAttribute = 'off';
        this._autocompleteDisabled = false;
        this.overlayAttached = false;
        this.componentDestroyed = false;
        /** Subscription to viewport size changes. */
        this.viewportSubscription = Subscription.EMPTY;
        /**
         * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
         * closed autocomplete from being reopened if the user switches to another browser tab and then
         * comes back.
         */
        this.canOpenOnNextFocus = true;
        /** Stream of keyboard events that can close the panel. */
        this.closeKeyEventStream = new Subject();
        /** `View -> model callback called when value changes` */
        // tslint:disable-next-line no-empty
        this.onChange = () => { };
        /** `View -> model callback called when autocomplete has been touched` */
        // tslint:disable-next-line no-empty
        this.onTouched = () => { };
        /**
         * Event handler for when the window is blurred. Needs to be an
         * arrow function in order to preserve the context.
         */
        this.windowBlurHandler = () => {
            // If the user blurred the window while the autocomplete is focused, it means that it'll be
            // refocused when they come back. In this case we want to skip the first focus event, if the
            // pane was closed, in order to avoid reopening it unintentionally.
            this.canOpenOnNextFocus = this.document.activeElement !== this.elementRef.nativeElement || this.panelOpen;
        };
        // tslint:disable-next-line no-typeof-undefined
        if (typeof window !== 'undefined') {
            zone.runOutsideAngular(() => {
                window.addEventListener('blur', this.windowBlurHandler);
            });
        }
        this.scrollStrategy = scrollStrategy;
    }
    /** The currently active option, coerced to MatOption type. */
    get activeOption() {
        if (this.autocomplete && this.autocomplete.keyManager) {
            return this.autocomplete.keyManager.activeItem;
        }
        return null;
    }
    get panelOpen() {
        return this.overlayAttached && this.autocomplete.showPanel;
    }
    /**
     * Whether the autocomplete is disabled. When disabled, the element will
     * act as a regular input and the user won't be able to open the panel.
     */
    get autocompleteDisabled() {
        return this._autocompleteDisabled;
    }
    set autocompleteDisabled(value) {
        this._autocompleteDisabled = coerceBooleanProperty(value);
    }
    ngOnDestroy() {
        // tslint:disable-next-line no-typeof-undefined
        if (typeof window !== 'undefined') {
            window.removeEventListener('blur', this.windowBlurHandler);
        }
        this.viewportSubscription.unsubscribe();
        this.componentDestroyed = true;
        this.destroyPanel();
        this.closeKeyEventStream.complete();
    }
    /** Opens the autocomplete suggestion panel. */
    openPanel() {
        this.attachOverlay();
    }
    closePanel() {
        if (!this.overlayAttached) {
            return;
        }
        if (this.panelOpen) {
            this.autocomplete.closed.emit();
        }
        this.autocomplete.isOpen = this.overlayAttached = false;
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            this.closingActionsSubscription.unsubscribe();
        }
        // Note that in some cases this can end up being called after the component is destroyed.
        // Add a check to ensure that we don't try to run change detection on a destroyed view.
        if (!this.componentDestroyed) {
            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the label is reset when the
            // user clicks outside.
            this.changeDetectorRef.detectChanges();
        }
    }
    /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     */
    updatePosition() {
        if (this.overlayAttached) {
            this.overlayRef.updatePosition();
        }
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions() {
        return merge(this.optionSelections, this.autocomplete.keyManager.tabOut.pipe(filter(() => this.overlayAttached)), this.closeKeyEventStream, this.getOutsideClickStream(), this.overlayRef ?
            this.overlayRef.detachments().pipe(filter(() => this.overlayAttached)) :
            of()).pipe(
        // Normalize the output so we return a consistent type.
        map((event) => event instanceof McOptionSelectionChange ? event : null));
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        Promise.resolve(null).then(() => this.setTriggerValue(value));
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.elementRef.nativeElement.disabled = isDisabled;
    }
    handleKeydown(event) {
        // tslint:disable-next-line deprecation
        const keyCode = event.keyCode;
        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (keyCode === ESCAPE) {
            event.preventDefault();
        }
        if (this.activeOption && keyCode === ENTER && this.panelOpen) {
            this.activeOption.selectViaInteraction();
            this.resetActiveItem();
            event.preventDefault();
        }
        else if (this.autocomplete) {
            const prevActiveItem = this.autocomplete.keyManager.activeItem;
            if (this.panelOpen || keyCode === TAB) {
                this.autocomplete.onKeydown(event);
            }
            else if (keyCode === DOWN_ARROW && this.canOpen()) {
                this.openPanel();
            }
            const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
            if (isArrowKey || this.autocomplete.keyManager.activeItem !== prevActiveItem) {
                this.scrollToOption();
            }
        }
    }
    handleInput(event) {
        const target = event.target;
        let value = target.value;
        // Based on `NumberValueAccessor` from forms.
        if (target.type === 'number') {
            value = value === '' ? null : parseFloat(value);
        }
        // If the input has a placeholder, IE will fire the `input` event on page load,
        // focus and blur, in addition to when the user actually changed the value. To
        // filter out all of the extra events, we save the value on focus and between
        // `input` events, and we check whether it changed.
        // See: https://connect.microsoft.com/IE/feedback/details/885747/
        if (this.previousValue !== value) {
            this.previousValue = value;
            this.onChange(value);
            if (this.canOpen() && this.document.activeElement === event.target) {
                this.openPanel();
            }
        }
    }
    handleFocus() {
        if (!this.canOpenOnNextFocus) {
            this.canOpenOnNextFocus = true;
        }
        else if (this.canOpen() && this.autocomplete.openOnFocus) {
            this.previousValue = this.elementRef.nativeElement.value;
            this.attachOverlay();
        }
    }
    handleClick($event) {
        if (this.canOpen() && this.document.activeElement === $event.target) {
            this.openPanel();
        }
    }
    /** Stream of clicks outside of the autocomplete panel. */
    getOutsideClickStream() {
        return merge(
        // tslint:disable-next-line: no-unnecessary-type-assertion
        fromEvent(this.document, 'click'), 
        // tslint:disable-next-line: no-unnecessary-type-assertion
        fromEvent(this.document, 'touchend'))
            .pipe(filter((event) => {
            const clickTarget = event.target;
            const formField = this.formField ? this.formField._elementRef.nativeElement : null;
            const customOrigin = this.connectedTo ? this.connectedTo.elementRef.nativeElement : null;
            return this.overlayAttached &&
                clickTarget !== this.elementRef.nativeElement &&
                (!formField || !formField.contains(clickTarget)) &&
                (!customOrigin || !customOrigin.contains(clickTarget)) &&
                (!!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget));
        }));
    }
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     */
    scrollToOption() {
        const index = this.autocomplete.keyManager.activeItemIndex || 0;
        const labelCount = countGroupLabelsBeforeOption(index, this.autocomplete.options, this.autocomplete.optionGroups);
        const newScrollPosition = getOptionScrollPosition(index + labelCount, AUTOCOMPLETE_OPTION_HEIGHT, this.autocomplete.getScrollTop(), AUTOCOMPLETE_PANEL_HEIGHT);
        this.autocomplete.setScrollTop(newScrollPosition);
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    subscribeToClosingActions() {
        const firstStable = this.zone.onStable.asObservable()
            .pipe(take(1));
        const optionChanges = this.autocomplete.options.changes
            .pipe(tap(() => this.positionStrategy.reapplyLastPosition()), 
        // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        delay(0));
        // When the zone is stable initially, and when the option list changes...
        return merge(firstStable, optionChanges)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        switchMap(() => {
            const wasOpen = this.panelOpen;
            this.resetActiveItem();
            this.autocomplete.setVisibility();
            if (this.panelOpen) {
                this.overlayRef.updatePosition();
                // If the `panelOpen` state changed, we need to make sure to emit the `opened`
                // event, because we may not have emitted it when the panel was attached. This
                // can happen if the users opens the panel and there are no options, but the
                // options come in slightly later or as a result of the value changing.
                if (wasOpen !== this.panelOpen) {
                    this.autocomplete.opened.emit();
                }
            }
            return this.panelClosingActions;
        }), 
        // when the first closing event occurs...
        take(1))
            // set the value, close the panel, and complete.
            .subscribe((event) => this.setValueAndClose(event));
    }
    /** Destroys the autocomplete suggestion panel. */
    destroyPanel() {
        if (this.overlayRef) {
            this.closePanel();
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
    setTriggerValue(value) {
        const toDisplay = this.autocomplete && this.autocomplete.displayWith ?
            this.autocomplete.displayWith(value) :
            value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const inputValue = toDisplay != null ? toDisplay : '';
        // If it's used within a `MatFormField`, we should set it through the property so it can go
        // through change detection.
        if (this.formField) {
            this.formField.control.value = inputValue;
        }
        else {
            this.elementRef.nativeElement.value = inputValue;
        }
        this.previousValue = inputValue;
    }
    /** This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event) {
        if (event && event.source) {
            this.clearPreviousSelectedOption(event.source);
            this.setTriggerValue(event.source.value);
            this.onChange(event.source.value);
            this.elementRef.nativeElement.focus();
            this.autocomplete.emitSelectEvent(event.source);
        }
        this.closePanel();
    }
    /** Clear any previous selected option and emit a selection change event for this option */
    clearPreviousSelectedOption(skip) {
        this.autocomplete.options.forEach((option) => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        });
    }
    attachOverlay() {
        if (!this.autocomplete) {
            throw getMcAutocompleteMissingPanelError();
        }
        let overlayRef = this.overlayRef;
        if (!overlayRef) {
            this.portal = new TemplatePortal(this.autocomplete.template, this.viewContainerRef);
            overlayRef = this.overlay.create(this.getOverlayConfig());
            this.overlayRef = overlayRef;
            // Use the `keydownEvents` in order to take advantage of
            // the overlay event targeting provided by the CDK overlay.
            overlayRef.keydownEvents().subscribe((event) => {
                // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
                // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
                // tslint:disable-next-line deprecation
                if (event.keyCode === ESCAPE || (event.keyCode === UP_ARROW && event.altKey)) {
                    this.resetActiveItem();
                    this.closeKeyEventStream.next();
                }
            });
            if (this.viewportRuler) {
                this.viewportSubscription = this.viewportRuler.change().subscribe(() => {
                    if (this.panelOpen && overlayRef) {
                        overlayRef.updateSize({ width: this.getPanelWidth() });
                    }
                });
            }
        }
        else {
            const position = overlayRef.getConfig().positionStrategy;
            // Update the trigger, panel width and direction, in case anything has changed.
            position.setOrigin(this.getConnectedElement());
            overlayRef.updateSize({ width: this.getPanelWidth() });
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this.portal);
            this.closingActionsSubscription = this.subscribeToClosingActions();
        }
        const wasOpen = this.panelOpen;
        this.autocomplete.setVisibility();
        this.autocomplete.isOpen = this.overlayAttached = true;
        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        if (this.panelOpen && wasOpen !== this.panelOpen) {
            this.autocomplete.opened.emit();
        }
    }
    getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this.scrollStrategy(),
            width: this.getPanelWidth(),
            direction: this.dir
        });
    }
    getOverlayPosition() {
        this.positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.getConnectedElement())
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
                // The overlay edge connected to the trigger should have squared corners, while
                // the opposite end has rounded corners. We apply a CSS class to swap the
                // border-radius based on the overlay position.
                panelClass: 'mc-autocomplete-panel-above'
            }
        ]);
        return this.positionStrategy;
    }
    getConnectedElement() {
        if (this.connectedTo) {
            return this.connectedTo.elementRef;
        }
        return this.formField ? this.formField.getConnectedOverlayOrigin() : this.elementRef;
    }
    getPanelWidth() {
        return this.autocomplete.panelWidth || this.getHostWidth() - AUTOCOMPLETE_BORDER_WIDTH;
    }
    getHostWidth() {
        return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     */
    resetActiveItem() {
        if (this.autocomplete.autoActiveFirstOption) {
            this.autocomplete.keyManager.setFirstItemActive();
        }
        else {
            this.autocomplete.keyManager.setActiveItem(-1);
        }
    }
    canOpen() {
        const element = this.elementRef.nativeElement;
        return !element.readOnly && !element.disabled && !this._autocompleteDisabled;
    }
}
/** @nocollapse */ /** @nocollapse */ McAutocompleteTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocompleteTrigger, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i1$1.Overlay }, { token: i0.NgZone }, { token: MC_AUTOCOMPLETE_SCROLL_STRATEGY }, { token: i2.Directionality, optional: true }, { token: i3.McFormField, host: true, optional: true }, { token: DOCUMENT, optional: true }, { token: i4.ViewportRuler }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McAutocompleteTrigger.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.0", type: McAutocompleteTrigger, selector: "input[mcAutocomplete], textarea[mcAutocomplete]", inputs: { autocomplete: ["mcAutocomplete", "autocomplete"], connectedTo: ["mcAutocompleteConnectedTo", "connectedTo"], autocompleteAttribute: ["autocomplete", "autocompleteAttribute"], autocompleteDisabled: ["mcAutocompleteDisabled", "autocompleteDisabled"] }, host: { listeners: { "focusin": "handleFocus()", "blur": "onTouched()", "input": "handleInput($event)", "keydown": "handleKeydown($event)", "click": "handleClick($event)" }, properties: { "attr.autocomplete": "autocompleteAttribute" }, classAttribute: "mc-autocomplete-trigger" }, providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR], exportAs: ["mcAutocompleteTrigger"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocompleteTrigger, decorators: [{
            type: Directive,
            args: [{
                    selector: `input[mcAutocomplete], textarea[mcAutocomplete]`,
                    host: {
                        class: 'mc-autocomplete-trigger',
                        '[attr.autocomplete]': 'autocompleteAttribute',
                        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
                        // a little earlier. This avoids issues where IE delays the focusing of the input.
                        '(focusin)': 'handleFocus()',
                        '(blur)': 'onTouched()',
                        '(input)': 'handleInput($event)',
                        '(keydown)': 'handleKeydown($event)',
                        '(click)': 'handleClick($event)'
                    },
                    exportAs: 'mcAutocompleteTrigger',
                    providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i1$1.Overlay }, { type: i0.NgZone }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [MC_AUTOCOMPLETE_SCROLL_STRATEGY]
                    }] }, { type: i2.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: i3.McFormField, decorators: [{
                        type: Optional
                    }, {
                        type: Host
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i4.ViewportRuler }];
    }, propDecorators: { autocomplete: [{
                type: Input,
                args: ['mcAutocomplete']
            }], connectedTo: [{
                type: Input,
                args: ['mcAutocompleteConnectedTo']
            }], autocompleteAttribute: [{
                type: Input,
                args: ['autocomplete']
            }], autocompleteDisabled: [{
                type: Input,
                args: ['mcAutocompleteDisabled']
            }] } });

class McAutocompleteModule {
}
/** @nocollapse */ /** @nocollapse */ McAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ McAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocompleteModule, declarations: [McAutocomplete, McAutocompleteTrigger, McAutocompleteOrigin], imports: [McOptionModule, OverlayModule, McCommonModule, CommonModule], exports: [McAutocomplete,
        McOptionModule,
        McAutocompleteTrigger,
        McAutocompleteOrigin,
        McCommonModule] });
/** @nocollapse */ /** @nocollapse */ McAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocompleteModule, providers: [MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[McOptionModule, OverlayModule, McCommonModule, CommonModule], McOptionModule,
        McCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: McAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [McOptionModule, OverlayModule, McCommonModule, CommonModule],
                    exports: [
                        McAutocomplete,
                        McOptionModule,
                        McAutocompleteTrigger,
                        McAutocompleteOrigin,
                        McCommonModule
                    ],
                    declarations: [McAutocomplete, McAutocompleteTrigger, McAutocompleteOrigin],
                    providers: [MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AUTOCOMPLETE_BORDER_WIDTH, AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT, MAT_AUTOCOMPLETE_VALUE_ACCESSOR, MC_AUTOCOMPLETE_DEFAULT_OPTIONS, MC_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY, MC_AUTOCOMPLETE_SCROLL_STRATEGY, MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY, MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, McAutocomplete, McAutocompleteModule, McAutocompleteOrigin, McAutocompleteSelectedEvent, McAutocompleteTrigger, getMcAutocompleteMissingPanelError };
//# sourceMappingURL=ptsecurity-mosaic-autocomplete.mjs.map

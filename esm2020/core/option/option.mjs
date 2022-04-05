import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ENTER, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
import { McOptgroup } from './optgroup';
import * as i0 from "@angular/core";
import * as i1 from "./optgroup";
import * as i2 from "../selection/pseudo-checkbox/pseudo-checkbox";
import * as i3 from "@angular/common";
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let uniqueIdCounter = 0;
/** Event object emitted by McOption when selected or deselected. */
export class McOptionSelectionChange {
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
/**
 * Injection token used to provide the parent component to options.
 */
export const MC_OPTION_PARENT_COMPONENT = new InjectionToken('MC_OPTION_PARENT_COMPONENT');
/**
 * Single option inside of a `<mc-select>` element.
 */
export class McOption {
    constructor(element, changeDetectorRef, parent, group) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.group = group;
        /** Event emitted when the option is selected or deselected. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this.stateChanges = new Subject();
        this._id = `mc-option-${uniqueIdCounter++}`;
        this._selected = false;
        this._disabled = false;
        this._active = false;
        this.mostRecentViewValue = '';
    }
    get showCheckbox() {
        return this._showCheckbox === undefined ? this.multiple : this._showCheckbox;
    }
    set showCheckbox(value) {
        this._showCheckbox = coerceBooleanProperty(value);
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue() {
        // TODO: Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
    }
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple() {
        return this.parent && this.parent.multiple;
    }
    get id() {
        return this._id;
    }
    get selected() {
        return this._selected;
    }
    get disabled() {
        return (this.group && this.group.disabled) || this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active() {
        return this._active;
    }
    ngAfterViewChecked() {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `mc-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            const viewValue = this.viewValue;
            if (viewValue !== this.mostRecentViewValue) {
                this.mostRecentViewValue = viewValue;
                this.stateChanges.next();
            }
        }
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    getHeight() {
        // tslint:disable-next-line:naming-convention
        const DOMRect = this.element.nativeElement.getClientRects()[0];
        return DOMRect ? DOMRect.height : 0;
    }
    select() {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    }
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    }
    focus() {
        const element = this.getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
        return this.viewValue;
    }
    /** Ensures the option is selected when activated from the keyboard. */
    handleKeydown(event) {
        // tslint:disable-next-line
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    }
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
        }
    }
    getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    getHostElement() {
        return this.element.nativeElement;
    }
    /** Emits the selection change event. */
    emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new McOptionSelectionChange(this, isUserInput));
    }
}
/** @nocollapse */ /** @nocollapse */ McOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: MC_OPTION_PARENT_COMPONENT, optional: true }, { token: i1.McOptgroup, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McOption, selector: "mc-option", inputs: { value: "value", showCheckbox: "showCheckbox", disabled: "disabled" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "click": "selectViaInteraction()", "keydown": "handleKeydown($event)" }, properties: { "attr.tabindex": "getTabIndex()", "class.mc-selected": "selected", "class.mc-option-multiple": "multiple", "class.mc-active": "active", "class.mc-disabled": "disabled", "id": "id" }, classAttribute: "mc-option" }, viewQueries: [{ propertyName: "textElement", first: true, predicate: ["mcTextElement"], descendants: true }], exportAs: ["mcOption"], ngImport: i0, template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span #mcTextElement class=\"mc-option-text\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:var(--mc-option-size-height, 32px);border:var(--mc-option-size-border-width, 2px) solid transparent;cursor:pointer;outline:none;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:var(--mc-option-size-horizontal-padding, 16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:calc(-1 * var(--mc-option-size-border-width, 2px));left:calc(-1 * var(--mc-option-size-border-width, 2px));right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n"], components: [{ type: i2.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McOption, decorators: [{
            type: Component,
            args: [{ selector: 'mc-option', exportAs: 'mcOption', host: {
                        '[attr.tabindex]': 'getTabIndex()',
                        class: 'mc-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-option-multiple]': 'multiple',
                        '[class.mc-active]': 'active',
                        '[class.mc-disabled]': 'disabled',
                        '[id]': 'id',
                        '(click)': 'selectViaInteraction()',
                        '(keydown)': 'handleKeydown($event)'
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span #mcTextElement class=\"mc-option-text\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:var(--mc-option-size-height, 32px);border:var(--mc-option-size-border-width, 2px) solid transparent;cursor:pointer;outline:none;padding-left:var(--mc-option-size-horizontal-padding, 16px);padding-right:var(--mc-option-size-horizontal-padding, 16px);-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:calc(-1 * var(--mc-option-size-border-width, 2px));left:calc(-1 * var(--mc-option-size-border-width, 2px));right:calc(-1 * var(--mc-option-size-border-width, 2px));bottom:calc(-1 * var(--mc-option-size-border-width, 2px));pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MC_OPTION_PARENT_COMPONENT]
                }] }, { type: i1.McOptgroup, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { textElement: [{
                type: ViewChild,
                args: ['mcTextElement', { static: false }]
            }], value: [{
                type: Input
            }], showCheckbox: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }], disabled: [{
                type: Input
            }] } });
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
export function countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        const optionsArray = options.toArray();
        const groups = optionGroups.toArray();
        let groupCounter = 0;
        for (let i = 0; i < optionIndex + 1; i++) {
            if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                groupCounter++;
            }
        }
        return groupCounter;
    }
    return 0;
}
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionIndex Index of the option to be scrolled into the view.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export function getOptionScrollPosition(optionIndex, optionHeight, currentScrollPosition, panelHeight) {
    const optionOffset = optionIndex * optionHeight;
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvb3B0aW9uL29wdGlvbi50cyIsIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9jb3JlL29wdGlvbi9vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7O0FBR3hDOzs7R0FHRztBQUNILElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztBQUV4QixvRUFBb0U7QUFDcEUsTUFBTSxPQUFPLHVCQUF1QjtJQUNoQyxZQUFtQixNQUFnQixFQUFTLGNBQWMsS0FBSztRQUE1QyxXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFBRyxDQUFDO0NBQ3RFO0FBWUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FDbkMsSUFBSSxjQUFjLENBQTBCLDRCQUE0QixDQUFDLENBQUM7QUFFOUU7O0dBRUc7QUFxQkgsTUFBTSxPQUFPLFFBQVE7SUEyRWpCLFlBQ3FCLE9BQW1CLEVBQ25CLGlCQUFvQyxFQUNZLE1BQStCLEVBQzNFLEtBQWlCO1FBSHJCLFlBQU8sR0FBUCxP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bkIsWUFBb0IsRUFDcEIscUJBQTZCLEVBQzdCLFdBQW1CO0lBRW5CLE1BQU0sWUFBWSxHQUFHLFdBQVcsR0FBRyxZQUFZLENBQUM7SUFFaEQsSUFBSSxZQUFZLEdBQUcscUJBQXFCLEVBQUU7UUFBRSxPQUFPLFlBQVksQ0FBQztLQUFFO0lBRWxFLElBQUksWUFBWSxHQUFHLFlBQVksR0FBRyxxQkFBcUIsR0FBRyxXQUFXLEVBQUU7UUFDbkUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxZQUFZLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsT0FBTyxxQkFBcUIsQ0FBQztBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVOVEVSLCBTUEFDRSB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE1jT3B0Z3JvdXAgfSBmcm9tICcuL29wdGdyb3VwJztcblxuXG4vKipcbiAqIE9wdGlvbiBJRHMgbmVlZCB0byBiZSB1bmlxdWUgYWNyb3NzIGNvbXBvbmVudHMsIHNvIHRoaXMgY291bnRlciBleGlzdHMgb3V0c2lkZSBvZlxuICogdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLlxuICovXG5sZXQgdW5pcXVlSWRDb3VudGVyID0gMDtcblxuLyoqIEV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1jT3B0aW9uIHdoZW4gc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbmV4cG9ydCBjbGFzcyBNY09wdGlvblNlbGVjdGlvbkNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNPcHRpb24sIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7fVxufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIHBhcmVudCBjb21wb25lbnQgdGhhdCBtYW5hZ2VzIGEgbGlzdCBvZiBvcHRpb25zLlxuICogQ29udGFpbnMgcHJvcGVydGllcyB0aGF0IHRoZSBvcHRpb25zIGNhbiBpbmhlcml0LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jT3B0aW9uUGFyZW50Q29tcG9uZW50IHtcbiAgICBtdWx0aXBsZT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHVzZWQgdG8gcHJvdmlkZSB0aGUgcGFyZW50IGNvbXBvbmVudCB0byBvcHRpb25zLlxuICovXG5leHBvcnQgY29uc3QgTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxNY09wdGlvblBhcmVudENvbXBvbmVudD4oJ01DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UJyk7XG5cbi8qKlxuICogU2luZ2xlIG9wdGlvbiBpbnNpZGUgb2YgYSBgPG1jLXNlbGVjdD5gIGVsZW1lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtb3B0aW9uJyxcbiAgICBleHBvcnRBczogJ21jT3B0aW9uJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnZ2V0VGFiSW5kZXgoKScsXG4gICAgICAgIGNsYXNzOiAnbWMtb3B0aW9uJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLW9wdGlvbi1tdWx0aXBsZV0nOiAnbXVsdGlwbGUnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW2lkXSc6ICdpZCcsXG5cbiAgICAgICAgJyhjbGljayknOiAnc2VsZWN0VmlhSW50ZXJhY3Rpb24oKScsXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgc3R5bGVVcmxzOiBbJ29wdGlvbi5zY3NzJ10sXG4gICAgdGVtcGxhdGVVcmw6ICdvcHRpb24uaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNY09wdGlvbiBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gICAgQFZpZXdDaGlsZCgnbWNUZXh0RWxlbWVudCcsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZXh0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIC8qKiBUaGUgZm9ybSB2YWx1ZSBvZiB0aGUgb3B0aW9uLiAqL1xuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzaG93Q2hlY2tib3goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93Q2hlY2tib3ggPT09IHVuZGVmaW5lZCA/IHRoaXMubXVsdGlwbGUgOiB0aGlzLl9zaG93Q2hlY2tib3g7XG4gICAgfVxuXG4gICAgc2V0IHNob3dDaGVja2JveCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zaG93Q2hlY2tib3ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dDaGVja2JveDogYm9vbGVhbjtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIG9wdGlvbiBpcyBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1vdXRwdXQtb24tcHJlZml4XG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY09wdGlvblNlbGVjdGlvbkNoYW5nZT4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBzdGF0ZSBvZiB0aGUgb3B0aW9uIGNoYW5nZXMgYW5kIGFueSBwYXJlbnRzIGhhdmUgdG8gYmUgbm90aWZpZWQuICovXG4gICAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkaXNwbGF5ZWQgdmFsdWUgb2YgdGhlIG9wdGlvbi4gSXQgaXMgbmVjZXNzYXJ5IHRvIHNob3cgdGhlIHNlbGVjdGVkIG9wdGlvbiBpbiB0aGVcbiAgICAgKiBzZWxlY3QncyB0cmlnZ2VyLlxuICAgICAqL1xuICAgIGdldCB2aWV3VmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIGlucHV0IHByb3BlcnR5IGFsdGVybmF0aXZlIGZvciBub2RlIGVudnMuXG4gICAgICAgIHJldHVybiAodGhpcy5nZXRIb3N0RWxlbWVudCgpLnRleHRDb250ZW50IHx8ICcnKS50cmltKCk7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHdyYXBwaW5nIGNvbXBvbmVudCBpcyBpbiBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZS4gKi9cbiAgICBnZXQgbXVsdGlwbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5tdWx0aXBsZTtcbiAgICB9XG5cbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkID0gYG1jLW9wdGlvbi0ke3VuaXF1ZUlkQ291bnRlcisrfWA7XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5ncm91cCAmJiB0aGlzLmdyb3VwLmRpc2FibGVkKSB8fCB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSBvcHRpb24gaXMgY3VycmVudGx5IGFjdGl2ZSBhbmQgcmVhZHkgdG8gYmUgc2VsZWN0ZWQuXG4gICAgICogQW4gYWN0aXZlIG9wdGlvbiBkaXNwbGF5cyBzdHlsZXMgYXMgaWYgaXQgaXMgZm9jdXNlZCwgYnV0IHRoZVxuICAgICAqIGZvY3VzIGlzIGFjdHVhbGx5IHJldGFpbmVkIHNvbWV3aGVyZSBlbHNlLiBUaGlzIGNvbWVzIGluIGhhbmR5XG4gICAgICogZm9yIGNvbXBvbmVudHMgbGlrZSBhdXRvY29tcGxldGUgd2hlcmUgZm9jdXMgbXVzdCByZW1haW4gb24gdGhlIGlucHV0LlxuICAgICAqL1xuICAgIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWN0aXZlID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG1vc3RSZWNlbnRWaWV3VmFsdWUgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UKSBwcml2YXRlIHJlYWRvbmx5IHBhcmVudDogTWNPcHRpb25QYXJlbnRDb21wb25lbnQsXG4gICAgICAgIEBPcHRpb25hbCgpIHJlYWRvbmx5IGdyb3VwOiBNY09wdGdyb3VwXG4gICAgKSB7fVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICAvLyBTaW5jZSBwYXJlbnQgY29tcG9uZW50cyBjb3VsZCBiZSB1c2luZyB0aGUgb3B0aW9uJ3MgbGFiZWwgdG8gZGlzcGxheSB0aGUgc2VsZWN0ZWQgdmFsdWVzXG4gICAgICAgIC8vIChlLmcuIGBtYy1zZWxlY3RgKSBhbmQgdGhleSBkb24ndCBoYXZlIGEgd2F5IG9mIGtub3dpbmcgaWYgdGhlIG9wdGlvbidzIGxhYmVsIGhhcyBjaGFuZ2VkXG4gICAgICAgIC8vIHdlIGhhdmUgdG8gY2hlY2sgZm9yIGNoYW5nZXMgaW4gdGhlIERPTSBvdXJzZWx2ZXMgYW5kIGRpc3BhdGNoIGFuIGV2ZW50LiBUaGVzZSBjaGVja3MgYXJlXG4gICAgICAgIC8vIHJlbGF0aXZlbHkgY2hlYXAsIGhvd2V2ZXIgd2Ugc3RpbGwgbGltaXQgdGhlbSBvbmx5IHRvIHNlbGVjdGVkIG9wdGlvbnMgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAgICAgLy8gaGl0dGluZyB0aGUgRE9NIHRvbyBvZnRlbi5cbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3VmFsdWUgPSB0aGlzLnZpZXdWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKHZpZXdWYWx1ZSAhPT0gdGhpcy5tb3N0UmVjZW50Vmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3N0UmVjZW50Vmlld1ZhbHVlID0gdmlld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbiAgICAgICAgY29uc3QgRE9NUmVjdDogRE9NUmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKClbMF07XG5cbiAgICAgICAgcmV0dXJuIERPTVJlY3QgPyBET01SZWN0LmhlaWdodCA6IDA7XG4gICAgfVxuXG4gICAgc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0SG9zdEVsZW1lbnQoKTtcblxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQuZm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHNldHMgZGlzcGxheSBzdHlsZXMgb24gdGhlIG9wdGlvbiB0byBtYWtlIGl0IGFwcGVhclxuICAgICAqIGFjdGl2ZS4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciBzbyBrZXlcbiAgICAgKiBldmVudHMgd2lsbCBkaXNwbGF5IHRoZSBwcm9wZXIgb3B0aW9ucyBhcyBhY3RpdmUgb24gYXJyb3cga2V5IGV2ZW50cy5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJlbW92ZXMgZGlzcGxheSBzdHlsZXMgb24gdGhlIG9wdGlvbiB0aGF0IG1hZGUgaXQgYXBwZWFyXG4gICAgICogYWN0aXZlLiBUaGlzIGlzIHVzZWQgYnkgdGhlIEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIHNvIGtleVxuICAgICAqIGV2ZW50cyB3aWxsIGRpc3BsYXkgdGhlIHByb3BlciBvcHRpb25zIGFzIGFjdGl2ZSBvbiBhcnJvdyBrZXkgZXZlbnRzLlxuICAgICAqL1xuICAgIHNldEluYWN0aXZlU3R5bGVzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogR2V0cyB0aGUgbGFiZWwgdG8gYmUgdXNlZCB3aGVuIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIG9wdGlvbiBzaG91bGQgYmUgZm9jdXNlZC4gKi9cbiAgICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3VmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIEVuc3VyZXMgdGhlIG9wdGlvbiBpcyBzZWxlY3RlZCB3aGVuIGFjdGl2YXRlZCBmcm9tIHRoZSBrZXlib2FyZC4gKi9cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5URVIgfHwgZXZlbnQua2V5Q29kZSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTtcblxuICAgICAgICAgICAgLy8gUHJldmVudCB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIGFuZCBmb3JtIHN1Ym1pdHMuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYFNlbGVjdHMgdGhlIG9wdGlvbiB3aGlsZSBpbmRpY2F0aW5nIHRoZSBzZWxlY3Rpb24gY2FtZSBmcm9tIHRoZSB1c2VyLiBVc2VkIHRvXG4gICAgICogZGV0ZXJtaW5lIGlmIHRoZSBzZWxlY3QncyB2aWV3IC0+IG1vZGVsIGNhbGxiYWNrIHNob3VsZCBiZSBpbnZva2VkLmBcbiAgICAgKi9cbiAgICBzZWxlY3RWaWFJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMubXVsdGlwbGUgPyAhdGhpcy5fc2VsZWN0ZWQgOiB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUYWJJbmRleCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/ICctMScgOiAnMCc7XG4gICAgfVxuXG4gICAgZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIHRoZSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50LiAqL1xuICAgIHByaXZhdGUgZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KGlzVXNlcklucHV0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY09wdGlvblNlbGVjdGlvbkNoYW5nZSh0aGlzLCBpc1VzZXJJbnB1dCkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDb3VudHMgdGhlIGFtb3VudCBvZiBvcHRpb24gZ3JvdXAgbGFiZWxzIHRoYXQgcHJlY2VkZSB0aGUgc3BlY2lmaWVkIG9wdGlvbi5cbiAqIEBwYXJhbSBvcHRpb25JbmRleCBJbmRleCBvZiB0aGUgb3B0aW9uIGF0IHdoaWNoIHRvIHN0YXJ0IGNvdW50aW5nLlxuICogQHBhcmFtIG9wdGlvbnMgRmxhdCBsaXN0IG9mIGFsbCBvZiB0aGUgb3B0aW9ucy5cbiAqIEBwYXJhbSBvcHRpb25Hcm91cHMgRmxhdCBsaXN0IG9mIGFsbCBvZiB0aGUgb3B0aW9uIGdyb3Vwcy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbiAgICBvcHRpb25zOiBRdWVyeUxpc3Q8TWNPcHRpb24+LFxuICAgIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE1jT3B0Z3JvdXA+XG4pOiBudW1iZXIge1xuXG4gICAgaWYgKG9wdGlvbkdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uc0FycmF5ID0gb3B0aW9ucy50b0FycmF5KCk7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IG9wdGlvbkdyb3Vwcy50b0FycmF5KCk7XG5cbiAgICAgICAgbGV0IGdyb3VwQ291bnRlciA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25JbmRleCArIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNBcnJheVtpXS5ncm91cCAmJiBvcHRpb25zQXJyYXlbaV0uZ3JvdXAgPT09IGdyb3Vwc1tncm91cENvdW50ZXJdKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBDb3VudGVyKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JvdXBDb3VudGVyO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgdGhlIHBvc2l0aW9uIHRvIHdoaWNoIHRvIHNjcm9sbCBhIHBhbmVsIGluIG9yZGVyIGZvciBhbiBvcHRpb24gdG8gYmUgaW50byB2aWV3LlxuICogQHBhcmFtIG9wdGlvbkluZGV4IEluZGV4IG9mIHRoZSBvcHRpb24gdG8gYmUgc2Nyb2xsZWQgaW50byB0aGUgdmlldy5cbiAqIEBwYXJhbSBvcHRpb25IZWlnaHQgSGVpZ2h0IG9mIHRoZSBvcHRpb25zLlxuICogQHBhcmFtIGN1cnJlbnRTY3JvbGxQb3NpdGlvbiBDdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgcGFuZWwuXG4gKiBAcGFyYW0gcGFuZWxIZWlnaHQgSGVpZ2h0IG9mIHRoZSBwYW5lbC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvblNjcm9sbFBvc2l0aW9uKFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4gICAgb3B0aW9uSGVpZ2h0OiBudW1iZXIsXG4gICAgY3VycmVudFNjcm9sbFBvc2l0aW9uOiBudW1iZXIsXG4gICAgcGFuZWxIZWlnaHQ6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgICBjb25zdCBvcHRpb25PZmZzZXQgPSBvcHRpb25JbmRleCAqIG9wdGlvbkhlaWdodDtcblxuICAgIGlmIChvcHRpb25PZmZzZXQgPCBjdXJyZW50U2Nyb2xsUG9zaXRpb24pIHsgcmV0dXJuIG9wdGlvbk9mZnNldDsgfVxuXG4gICAgaWYgKG9wdGlvbk9mZnNldCArIG9wdGlvbkhlaWdodCA+IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiArIHBhbmVsSGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBvcHRpb25PZmZzZXQgLSBwYW5lbEhlaWdodCArIG9wdGlvbkhlaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcbn1cblxuIiwiPG1jLXBzZXVkby1jaGVja2JveFxuICAgICpuZ0lmPVwic2hvd0NoZWNrYm94XCJcbiAgICBbc3RhdGVdPVwic2VsZWN0ZWQgPyAnY2hlY2tlZCcgOiAndW5jaGVja2VkJ1wiXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG48L21jLXBzZXVkby1jaGVja2JveD5cblxuPHNwYW4gI21jVGV4dEVsZW1lbnQgY2xhc3M9XCJtYy1vcHRpb24tdGV4dFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG5cbjxkaXYgY2xhc3M9XCJtYy1vcHRpb24tb3ZlcmxheVwiPjwvZGl2PlxuIl19
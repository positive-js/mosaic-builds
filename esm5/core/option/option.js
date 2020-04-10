/**
 * @fileoverview added by tsickle
 * Generated from: option/option.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { ENTER, SPACE } from '@ptsecurity/cdk/keycodes';
import { Subject } from 'rxjs';
import { McOptgroup } from './optgroup';
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 * @type {?}
 */
var uniqueIdCounter = 0;
/**
 * Event object emitted by McOption when selected or deselected.
 */
var /**
 * Event object emitted by McOption when selected or deselected.
 */
McOptionSelectionChange = /** @class */ (function () {
    function McOptionSelectionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return McOptionSelectionChange;
}());
/**
 * Event object emitted by McOption when selected or deselected.
 */
export { McOptionSelectionChange };
if (false) {
    /** @type {?} */
    McOptionSelectionChange.prototype.source;
    /** @type {?} */
    McOptionSelectionChange.prototype.isUserInput;
}
/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * \@docs-private
 * @record
 */
export function McOptionParentComponent() { }
if (false) {
    /** @type {?|undefined} */
    McOptionParentComponent.prototype.multiple;
}
/**
 * Injection token used to provide the parent component to options.
 * @type {?}
 */
export var MC_OPTION_PARENT_COMPONENT = new InjectionToken('MC_OPTION_PARENT_COMPONENT');
/**
 * Single option inside of a `<mc-select>` element.
 */
var McOption = /** @class */ (function () {
    function McOption(element, changeDetectorRef, parent, group) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.parent = parent;
        this.group = group;
        /**
         * Event emitted when the option is selected or deselected.
         */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new EventEmitter();
        /**
         * Emits when the state of the option changes and any parents have to be notified.
         */
        this.stateChanges = new Subject();
        this._id = "mc-option-" + uniqueIdCounter++;
        this._selected = false;
        this._disabled = false;
        this._active = false;
        this.mostRecentViewValue = '';
    }
    Object.defineProperty(McOption.prototype, "showCheckbox", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showCheckbox === undefined ? this.multiple : this._showCheckbox;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showCheckbox = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         * @return {?}
         */
        function () {
            // TODO: Add input property alternative for node envs.
            return (this.getHostElement().textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "multiple", {
        /** Whether the wrapping component is in multiple selection mode. */
        get: /**
         * Whether the wrapping component is in multiple selection mode.
         * @return {?}
         */
        function () {
            return this.parent && this.parent.multiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.group && this.group.disabled) || this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(McOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         * @return {?}
         */
        function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    McOption.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `mc-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            /** @type {?} */
            var viewValue = this.viewValue;
            if (viewValue !== this.mostRecentViewValue) {
                this.mostRecentViewValue = viewValue;
                this.stateChanges.next();
            }
        }
    };
    /**
     * @return {?}
     */
    McOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
    };
    /**
     * @return {?}
     */
    McOption.prototype.getHeight = /**
     * @return {?}
     */
    function () {
        // tslint:disable-next-line:naming-convention
        /** @type {?} */
        var DOMRect = this.element.nativeElement.getClientRects()[0];
        return DOMRect ? DOMRect.height : 0;
    };
    /**
     * @return {?}
     */
    McOption.prototype.select = /**
     * @return {?}
     */
    function () {
        if (!this._selected) {
            this._selected = true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    };
    /**
     * @return {?}
     */
    McOption.prototype.deselect = /**
     * @return {?}
     */
    function () {
        if (this._selected) {
            this._selected = false;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent();
        }
    };
    /**
     * @return {?}
     */
    McOption.prototype.focus = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    McOption.prototype.setActiveStyles = /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        if (!this._active) {
            this._active = true;
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    McOption.prototype.setInactiveStyles = /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        if (this._active) {
            this._active = false;
            this.changeDetectorRef.markForCheck();
        }
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    McOption.prototype.getLabel = /**
     * Gets the label to be used when determining whether the option should be focused.
     * @return {?}
     */
    function () {
        return this.viewValue;
    };
    /** Ensures the option is selected when activated from the keyboard. */
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    McOption.prototype.handleKeydown = /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    };
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     * @return {?}
     */
    McOption.prototype.selectViaInteraction = /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
        }
    };
    /**
     * @return {?}
     */
    McOption.prototype.getTabIndex = /**
     * @return {?}
     */
    function () {
        return this.disabled ? '-1' : '0';
    };
    /**
     * @return {?}
     */
    McOption.prototype.getHostElement = /**
     * @return {?}
     */
    function () {
        return this.element.nativeElement;
    };
    /** Emits the selection change event. */
    /**
     * Emits the selection change event.
     * @private
     * @param {?=} isUserInput
     * @return {?}
     */
    McOption.prototype.emitSelectionChangeEvent = /**
     * Emits the selection change event.
     * @private
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new McOptionSelectionChange(this, isUserInput));
    };
    McOption.decorators = [
        { type: Component, args: [{
                    selector: 'mc-option',
                    exportAs: 'mcOption',
                    host: {
                        '[attr.tabindex]': 'getTabIndex()',
                        class: 'mc-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-option-multiple]': 'multiple',
                        '[class.mc-active]': 'active',
                        '[class.mc-disabled]': 'disabled',
                        '[id]': 'id',
                        '(click)': 'selectViaInteraction()',
                        '(keydown)': 'handleKeydown($event)'
                    },
                    template: "<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : ''\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mc-option{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;position:relative;max-width:100%;height:32px;border:2px solid transparent;cursor:pointer;outline:0;padding:0 16px;-webkit-tap-highlight-color:transparent}.mc-option.mc-disabled{cursor:default}.mc-option .mc-pseudo-checkbox{margin-right:8px}.mc-option .mc-option-overlay{position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;pointer-events:none;border-radius:inherit}.mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
                }] }
    ];
    /** @nocollapse */
    McOption.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_OPTION_PARENT_COMPONENT,] }] },
        { type: McOptgroup, decorators: [{ type: Optional }] }
    ]; };
    McOption.propDecorators = {
        value: [{ type: Input }],
        showCheckbox: [{ type: Input }],
        onSelectionChange: [{ type: Output }],
        disabled: [{ type: Input }]
    };
    return McOption;
}());
export { McOption };
if (false) {
    /**
     * The form value of the option.
     * @type {?}
     */
    McOption.prototype.value;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._showCheckbox;
    /**
     * Event emitted when the option is selected or deselected.
     * @type {?}
     */
    McOption.prototype.onSelectionChange;
    /**
     * Emits when the state of the option changes and any parents have to be notified.
     * @type {?}
     */
    McOption.prototype.stateChanges;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._id;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype._active;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype.mostRecentViewValue;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype.element;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    McOption.prototype.parent;
    /** @type {?} */
    McOption.prototype.group;
}
/**
 * Counts the amount of option group labels that precede the specified option.
 * \@docs-private
 * @param {?} optionIndex Index of the option at which to start counting.
 * @param {?} options Flat list of all of the options.
 * @param {?} optionGroups Flat list of all of the option groups.
 * @return {?}
 */
export function countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        /** @type {?} */
        var optionsArray = options.toArray();
        /** @type {?} */
        var groups = optionGroups.toArray();
        /** @type {?} */
        var groupCounter = 0;
        for (var i = 0; i < optionIndex + 1; i++) {
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
 * \@docs-private
 * @param {?} optionIndex Index of the option to be scrolled into the view.
 * @param {?} optionHeight Height of the options.
 * @param {?} currentScrollPosition Current scroll position of the panel.
 * @param {?} panelHeight Height of the panel.
 * @return {?}
 */
export function getOptionScrollPosition(optionIndex, optionHeight, currentScrollPosition, panelHeight) {
    /** @type {?} */
    var optionOffset = optionIndex * optionHeight;
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUvIiwic291cmNlcyI6WyJvcHRpb24vb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFFTixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7OztJQU9wQyxlQUFlLEdBQUcsQ0FBQzs7OztBQUd2Qjs7OztJQUNJLGlDQUFtQixNQUFnQixFQUFTLFdBQW1CO1FBQW5CLDRCQUFBLEVBQUEsbUJBQW1CO1FBQTVDLFdBQU0sR0FBTixNQUFNLENBQVU7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtJQUFHLENBQUM7SUFDdkUsOEJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7Ozs7OztJQURlLHlDQUF1Qjs7SUFBRSw4Q0FBMEI7Ozs7Ozs7O0FBU25FLDZDQUVDOzs7SUFERywyQ0FBbUI7Ozs7OztBQU12QixNQUFNLEtBQU8sMEJBQTBCLEdBQ25DLElBQUksY0FBYyxDQUEwQiw0QkFBNEIsQ0FBQzs7OztBQUs3RTtJQTZGSSxrQkFDcUIsT0FBbUIsRUFDbkIsaUJBQW9DLEVBQ1ksTUFBK0IsRUFDM0UsS0FBaUI7UUFIckIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FB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QU8sRUFBRTs7WUFFakMsWUFBWSxHQUFHLENBQUM7UUFFcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUN6RSxZQUFZLEVBQUUsQ0FBQzthQUNsQjtTQUNKO1FBRUQsT0FBTyxZQUFZLENBQUM7S0FDdkI7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7Ozs7Ozs7Ozs7QUFVRCxNQUFNLFVBQVUsdUJBQXVCLENBQ25DLFdBQW1CLEVBQ25CLFlBQW9CLEVBQ3BCLHFCQUE2QixFQUM3QixXQUFtQjs7UUFFYixZQUFZLEdBQUcsV0FBVyxHQUFHLFlBQVk7SUFFL0MsSUFBSSxZQUFZLEdBQUcscUJBQXFCLEVBQUU7UUFBRSxPQUFPLFlBQVksQ0FBQztLQUFFO0lBRWxFLElBQUksWUFBWSxHQUFHLFlBQVksR0FBRyxxQkFBcUIsR0FBRyxXQUFXLEVBQUU7UUFDbkUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxZQUFZLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsT0FBTyxxQkFBcUIsQ0FBQztBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU5URVIsIFNQQUNFIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWNPcHRncm91cCB9IGZyb20gJy4vb3B0Z3JvdXAnO1xuXG5cbi8qKlxuICogT3B0aW9uIElEcyBuZWVkIHRvIGJlIHVuaXF1ZSBhY3Jvc3MgY29tcG9uZW50cywgc28gdGhpcyBjb3VudGVyIGV4aXN0cyBvdXRzaWRlIG9mXG4gKiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24uXG4gKi9cbmxldCB1bmlxdWVJZENvdW50ZXIgPSAwO1xuXG4vKiogRXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWNPcHRpb24gd2hlbiBzZWxlY3RlZCBvciBkZXNlbGVjdGVkLiAqL1xuZXhwb3J0IGNsYXNzIE1jT3B0aW9uU2VsZWN0aW9uQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY09wdGlvbiwgcHVibGljIGlzVXNlcklucHV0ID0gZmFsc2UpIHt9XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIGEgcGFyZW50IGNvbXBvbmVudCB0aGF0IG1hbmFnZXMgYSBsaXN0IG9mIG9wdGlvbnMuXG4gKiBDb250YWlucyBwcm9wZXJ0aWVzIHRoYXQgdGhlIG9wdGlvbnMgY2FuIGluaGVyaXQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNPcHRpb25QYXJlbnRDb21wb25lbnQge1xuICAgIG11bHRpcGxlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBwYXJlbnQgY29tcG9uZW50IHRvIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPE1jT3B0aW9uUGFyZW50Q29tcG9uZW50PignTUNfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQnKTtcblxuLyoqXG4gKiBTaW5nbGUgb3B0aW9uIGluc2lkZSBvZiBhIGA8bWMtc2VsZWN0PmAgZWxlbWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1vcHRpb24nLFxuICAgIGV4cG9ydEFzOiAnbWNPcHRpb24nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdnZXRUYWJJbmRleCgpJyxcbiAgICAgICAgY2xhc3M6ICdtYy1vcHRpb24nLFxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtb3B0aW9uLW11bHRpcGxlXSc6ICdtdWx0aXBsZScsXG4gICAgICAgICdbY2xhc3MubWMtYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbaWRdJzogJ2lkJyxcblxuICAgICAgICAnKGNsaWNrKSc6ICdzZWxlY3RWaWFJbnRlcmFjdGlvbigpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duKCRldmVudCknXG4gICAgfSxcbiAgICBzdHlsZVVybHM6IFsnb3B0aW9uLnNjc3MnXSxcbiAgICB0ZW1wbGF0ZVVybDogJ29wdGlvbi5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1jT3B0aW9uIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgICAvKiogVGhlIGZvcm0gdmFsdWUgb2YgdGhlIG9wdGlvbi4gKi9cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc2hvd0NoZWNrYm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0NoZWNrYm94ID09PSB1bmRlZmluZWQgPyB0aGlzLm11bHRpcGxlIDogdGhpcy5fc2hvd0NoZWNrYm94O1xuICAgIH1cblxuICAgIHNldCBzaG93Q2hlY2tib3godmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2hvd0NoZWNrYm94ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93Q2hlY2tib3g6IGJvb2xlYW47XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICAgIEBPdXRwdXQoKSByZWFkb25seSBvblNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWNPcHRpb25TZWxlY3Rpb25DaGFuZ2U+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgc3RhdGUgb2YgdGhlIG9wdGlvbiBjaGFuZ2VzIGFuZCBhbnkgcGFyZW50cyBoYXZlIHRvIGJlIG5vdGlmaWVkLiAqL1xuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGlzcGxheWVkIHZhbHVlIG9mIHRoZSBvcHRpb24uIEl0IGlzIG5lY2Vzc2FyeSB0byBzaG93IHRoZSBzZWxlY3RlZCBvcHRpb24gaW4gdGhlXG4gICAgICogc2VsZWN0J3MgdHJpZ2dlci5cbiAgICAgKi9cbiAgICBnZXQgdmlld1ZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBpbnB1dCBwcm9wZXJ0eSBhbHRlcm5hdGl2ZSBmb3Igbm9kZSBlbnZzLlxuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSB3cmFwcGluZyBjb21wb25lbnQgaXMgaW4gbXVsdGlwbGUgc2VsZWN0aW9uIG1vZGUuICovXG4gICAgZ2V0IG11bHRpcGxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQubXVsdGlwbGU7XG4gICAgfVxuXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZCA9IGBtYy1vcHRpb24tJHt1bmlxdWVJZENvdW50ZXIrK31gO1xuXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ3JvdXAgJiYgdGhpcy5ncm91cC5kaXNhYmxlZCkgfHwgdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgb3B0aW9uIGlzIGN1cnJlbnRseSBhY3RpdmUgYW5kIHJlYWR5IHRvIGJlIHNlbGVjdGVkLlxuICAgICAqIEFuIGFjdGl2ZSBvcHRpb24gZGlzcGxheXMgc3R5bGVzIGFzIGlmIGl0IGlzIGZvY3VzZWQsIGJ1dCB0aGVcbiAgICAgKiBmb2N1cyBpcyBhY3R1YWxseSByZXRhaW5lZCBzb21ld2hlcmUgZWxzZS4gVGhpcyBjb21lcyBpbiBoYW5keVxuICAgICAqIGZvciBjb21wb25lbnRzIGxpa2UgYXV0b2NvbXBsZXRlIHdoZXJlIGZvY3VzIG11c3QgcmVtYWluIG9uIHRoZSBpbnB1dC5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBtb3N0UmVjZW50Vmlld1ZhbHVlID0gJyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCkgcHJpdmF0ZSByZWFkb25seSBwYXJlbnQ6IE1jT3B0aW9uUGFyZW50Q29tcG9uZW50LFxuICAgICAgICBAT3B0aW9uYWwoKSByZWFkb25seSBncm91cDogTWNPcHRncm91cFxuICAgICkge31cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgLy8gU2luY2UgcGFyZW50IGNvbXBvbmVudHMgY291bGQgYmUgdXNpbmcgdGhlIG9wdGlvbidzIGxhYmVsIHRvIGRpc3BsYXkgdGhlIHNlbGVjdGVkIHZhbHVlc1xuICAgICAgICAvLyAoZS5nLiBgbWMtc2VsZWN0YCkgYW5kIHRoZXkgZG9uJ3QgaGF2ZSBhIHdheSBvZiBrbm93aW5nIGlmIHRoZSBvcHRpb24ncyBsYWJlbCBoYXMgY2hhbmdlZFxuICAgICAgICAvLyB3ZSBoYXZlIHRvIGNoZWNrIGZvciBjaGFuZ2VzIGluIHRoZSBET00gb3Vyc2VsdmVzIGFuZCBkaXNwYXRjaCBhbiBldmVudC4gVGhlc2UgY2hlY2tzIGFyZVxuICAgICAgICAvLyByZWxhdGl2ZWx5IGNoZWFwLCBob3dldmVyIHdlIHN0aWxsIGxpbWl0IHRoZW0gb25seSB0byBzZWxlY3RlZCBvcHRpb25zIGluIG9yZGVyIHRvIGF2b2lkXG4gICAgICAgIC8vIGhpdHRpbmcgdGhlIERPTSB0b28gb2Z0ZW4uXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3Qgdmlld1ZhbHVlID0gdGhpcy52aWV3VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh2aWV3VmFsdWUgIT09IHRoaXMubW9zdFJlY2VudFZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9zdFJlY2VudFZpZXdWYWx1ZSA9IHZpZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG4gICAgICAgIGNvbnN0IERPTVJlY3Q6IERPTVJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpWzBdO1xuXG4gICAgICAgIHJldHVybiBET01SZWN0ID8gRE9NUmVjdC5oZWlnaHQgOiAwO1xuICAgIH1cblxuICAgIHNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEhvc3RFbGVtZW50KCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50LmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBzZXRzIGRpc3BsYXkgc3R5bGVzIG9uIHRoZSBvcHRpb24gdG8gbWFrZSBpdCBhcHBlYXJcbiAgICAgKiBhY3RpdmUuIFRoaXMgaXMgdXNlZCBieSB0aGUgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgc28ga2V5XG4gICAgICogZXZlbnRzIHdpbGwgZGlzcGxheSB0aGUgcHJvcGVyIG9wdGlvbnMgYXMgYWN0aXZlIG9uIGFycm93IGtleSBldmVudHMuXG4gICAgICovXG4gICAgc2V0QWN0aXZlU3R5bGVzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCByZW1vdmVzIGRpc3BsYXkgc3R5bGVzIG9uIHRoZSBvcHRpb24gdGhhdCBtYWRlIGl0IGFwcGVhclxuICAgICAqIGFjdGl2ZS4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciBzbyBrZXlcbiAgICAgKiBldmVudHMgd2lsbCBkaXNwbGF5IHRoZSBwcm9wZXIgb3B0aW9ucyBhcyBhY3RpdmUgb24gYXJyb3cga2V5IGV2ZW50cy5cbiAgICAgKi9cbiAgICBzZXRJbmFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldHMgdGhlIGxhYmVsIHRvIGJlIHVzZWQgd2hlbiBkZXRlcm1pbmluZyB3aGV0aGVyIHRoZSBvcHRpb24gc2hvdWxkIGJlIGZvY3VzZWQuICovXG4gICAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlld1ZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBFbnN1cmVzIHRoZSBvcHRpb24gaXMgc2VsZWN0ZWQgd2hlbiBhY3RpdmF0ZWQgZnJvbSB0aGUga2V5Ym9hcmQuICovXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVOVEVSIHx8IGV2ZW50LmtleUNvZGUgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFZpYUludGVyYWN0aW9uKCk7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biBhbmQgZm9ybSBzdWJtaXRzLlxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGBTZWxlY3RzIHRoZSBvcHRpb24gd2hpbGUgaW5kaWNhdGluZyB0aGUgc2VsZWN0aW9uIGNhbWUgZnJvbSB0aGUgdXNlci4gVXNlZCB0b1xuICAgICAqIGRldGVybWluZSBpZiB0aGUgc2VsZWN0J3MgdmlldyAtPiBtb2RlbCBjYWxsYmFjayBzaG91bGQgYmUgaW52b2tlZC5gXG4gICAgICovXG4gICAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLm11bHRpcGxlID8gIXRoaXMuX3NlbGVjdGVkIDogdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VGFiSW5kZXgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAnLTEnIDogJzAnO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKiBFbWl0cyB0aGUgc2VsZWN0aW9uIGNoYW5nZSBldmVudC4gKi9cbiAgICBwcml2YXRlIGVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudChpc1VzZXJJbnB1dCA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTWNPcHRpb25TZWxlY3Rpb25DaGFuZ2UodGhpcywgaXNVc2VySW5wdXQpKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ291bnRzIHRoZSBhbW91bnQgb2Ygb3B0aW9uIGdyb3VwIGxhYmVscyB0aGF0IHByZWNlZGUgdGhlIHNwZWNpZmllZCBvcHRpb24uXG4gKiBAcGFyYW0gb3B0aW9uSW5kZXggSW5kZXggb2YgdGhlIG9wdGlvbiBhdCB3aGljaCB0byBzdGFydCBjb3VudGluZy5cbiAqIEBwYXJhbSBvcHRpb25zIEZsYXQgbGlzdCBvZiBhbGwgb2YgdGhlIG9wdGlvbnMuXG4gKiBAcGFyYW0gb3B0aW9uR3JvdXBzIEZsYXQgbGlzdCBvZiBhbGwgb2YgdGhlIG9wdGlvbiBncm91cHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uKFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4gICAgb3B0aW9uczogUXVlcnlMaXN0PE1jT3B0aW9uPixcbiAgICBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxNY09wdGdyb3VwPlxuKTogbnVtYmVyIHtcblxuICAgIGlmIChvcHRpb25Hcm91cHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNBcnJheSA9IG9wdGlvbnMudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBncm91cHMgPSBvcHRpb25Hcm91cHMudG9BcnJheSgpO1xuXG4gICAgICAgIGxldCBncm91cENvdW50ZXIgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9uSW5kZXggKyAxOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zQXJyYXlbaV0uZ3JvdXAgJiYgb3B0aW9uc0FycmF5W2ldLmdyb3VwID09PSBncm91cHNbZ3JvdXBDb3VudGVyXSkge1xuICAgICAgICAgICAgICAgIGdyb3VwQ291bnRlcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdyb3VwQ291bnRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSBwb3NpdGlvbiB0byB3aGljaCB0byBzY3JvbGwgYSBwYW5lbCBpbiBvcmRlciBmb3IgYW4gb3B0aW9uIHRvIGJlIGludG8gdmlldy5cbiAqIEBwYXJhbSBvcHRpb25JbmRleCBJbmRleCBvZiB0aGUgb3B0aW9uIHRvIGJlIHNjcm9sbGVkIGludG8gdGhlIHZpZXcuXG4gKiBAcGFyYW0gb3B0aW9uSGVpZ2h0IEhlaWdodCBvZiB0aGUgb3B0aW9ucy5cbiAqIEBwYXJhbSBjdXJyZW50U2Nyb2xsUG9zaXRpb24gQ3VycmVudCBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIHBhbmVsLlxuICogQHBhcmFtIHBhbmVsSGVpZ2h0IEhlaWdodCBvZiB0aGUgcGFuZWwuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25TY3JvbGxQb3NpdGlvbihcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuICAgIG9wdGlvbkhlaWdodDogbnVtYmVyLFxuICAgIGN1cnJlbnRTY3JvbGxQb3NpdGlvbjogbnVtYmVyLFxuICAgIHBhbmVsSGVpZ2h0OiBudW1iZXJcbik6IG51bWJlciB7XG4gICAgY29uc3Qgb3B0aW9uT2Zmc2V0ID0gb3B0aW9uSW5kZXggKiBvcHRpb25IZWlnaHQ7XG5cbiAgICBpZiAob3B0aW9uT2Zmc2V0IDwgY3VycmVudFNjcm9sbFBvc2l0aW9uKSB7IHJldHVybiBvcHRpb25PZmZzZXQ7IH1cblxuICAgIGlmIChvcHRpb25PZmZzZXQgKyBvcHRpb25IZWlnaHQgPiBjdXJyZW50U2Nyb2xsUG9zaXRpb24gKyBwYW5lbEhlaWdodCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgb3B0aW9uT2Zmc2V0IC0gcGFuZWxIZWlnaHQgKyBvcHRpb25IZWlnaHQpO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG59XG5cbiJdfQ==
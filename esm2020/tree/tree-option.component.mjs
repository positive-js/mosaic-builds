import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ElementRef, Inject, InjectionToken, ChangeDetectionStrategy, ViewEncapsulation, NgZone, ContentChild } from '@angular/core';
import { hasModifierKey, TAB } from '@ptsecurity/cdk/keycodes';
import { MC_OPTION_ACTION_PARENT, McOptionActionComponent } from '@ptsecurity/mosaic/core';
import { McDropdownTrigger } from '@ptsecurity/mosaic/dropdown';
import { McTooltipTrigger } from '@ptsecurity/mosaic/tooltip';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { McTreeNodeToggleBaseDirective } from './toggle';
import { McTreeNode } from './tree-base';
import * as i0 from "@angular/core";
import * as i1 from "@ptsecurity/mosaic/core";
import * as i2 from "@angular/common";
/**
 * Injection token used to provide the parent component to options.
 */
export const MC_TREE_OPTION_PARENT_COMPONENT = new InjectionToken('MC_TREE_OPTION_PARENT_COMPONENT');
export class McTreeOptionChange {
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
let uniqueIdCounter = 0;
export class McTreeOption extends McTreeNode {
    constructor(elementRef, changeDetectorRef, ngZone, tree) {
        super(elementRef, tree);
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.tree = tree;
        this.onFocus = new Subject();
        this.onBlur = new Subject();
        this._disabled = false;
        this.onSelectionChange = new EventEmitter();
        this._selected = false;
        this._id = `mc-tree-option-${uniqueIdCounter++}`;
        this.hasFocus = false;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get disabled() {
        return this._disabled || this.tree.disabled;
    }
    set disabled(value) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
        }
    }
    get showCheckbox() {
        return this._showCheckbox !== undefined ? this._showCheckbox : this.tree.showCheckbox;
    }
    set showCheckbox(value) {
        this._showCheckbox = coerceBooleanProperty(value);
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        const isSelected = coerceBooleanProperty(value);
        if (isSelected !== this._selected) {
            this.setSelected(isSelected);
        }
    }
    get id() {
        return this._id;
    }
    get viewValue() {
        // TODO: Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
    }
    get isExpandable() {
        return !this.toggleElement?.disabled && this.tree.treeControl.isExpandable(this.data);
    }
    ngAfterContentInit() {
        this.value = this.tree.treeControl.getValue(this.data);
    }
    toggle() {
        this.selected = !this.selected;
    }
    setSelected(selected) {
        if (this._selected === selected || !this.tree.selectionModel) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.tree.selectionModel.select(this.data);
        }
        else {
            this.tree.selectionModel.deselect(this.data);
        }
        this.changeDetectorRef.markForCheck();
    }
    focus(focusOrigin) {
        if (focusOrigin === 'program') {
            return;
        }
        if (this.disabled || this.hasFocus || this.actionButton?.hasFocus) {
            return;
        }
        this.elementRef.nativeElement.focus();
        this.onFocus.next({ option: this });
        Promise.resolve().then(() => {
            this.hasFocus = true;
            this.changeDetectorRef.markForCheck();
        });
    }
    blur() {
        // When animations are enabled, Angular may end up removing the option from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the tree
        // that moves focus not the next item. To work around the issue, we defer marking the option
        // as not focused until the next time the zone stabilizes.
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
            this.ngZone.run(() => {
                if (this.actionButton?.hasFocus) {
                    return;
                }
                this.onBlur.next({ option: this });
            });
        });
    }
    getHeight() {
        const clientRects = this.elementRef.nativeElement.getClientRects();
        if (clientRects.length) {
            return clientRects[0].height;
        }
        return 0;
    }
    select() {
        if (this._selected) {
            return;
        }
        this._selected = true;
        if (!this.hasFocus) {
            this.focus();
        }
        this.changeDetectorRef.markForCheck();
        this.emitSelectionChangeEvent();
    }
    deselect() {
        if (!this._selected) {
            return;
        }
        this._selected = false;
        this.changeDetectorRef.markForCheck();
    }
    onKeydown($event) {
        if (!this.actionButton) {
            return;
        }
        if ($event.keyCode === TAB && !$event.shiftKey && !this.actionButton.hasFocus) {
            this.actionButton.focus();
            $event.preventDefault();
        }
    }
    selectViaInteraction($event) {
        if (this.disabled) {
            return;
        }
        this.changeDetectorRef.markForCheck();
        this.emitSelectionChangeEvent(true);
        const shiftKey = $event ? hasModifierKey($event, 'shiftKey') : false;
        const ctrlKey = $event ? hasModifierKey($event, 'ctrlKey') : false;
        this.tree.setSelectedOptionsByClick(this, shiftKey, ctrlKey);
    }
    emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new McTreeOptionChange(this, isUserInput));
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
    markForCheck() {
        this.changeDetectorRef.markForCheck();
    }
}
/** @nocollapse */ /** @nocollapse */ McTreeOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McTreeOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: MC_TREE_OPTION_PARENT_COMPONENT }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTreeOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: McTreeOption, selector: "mc-tree-option", inputs: { disabled: "disabled", showCheckbox: "showCheckbox" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "selectViaInteraction($event)", "keydown": "onKeydown($event)" }, properties: { "class.mc-selected": "selected", "class.mc-focused": "hasFocus", "class.mc-action-button-focused": "actionButton?.active", "attr.id": "id", "attr.tabindex": "-1", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-option" }, providers: [
        { provide: McTreeNode, useExisting: McTreeOption },
        { provide: MC_OPTION_ACTION_PARENT, useExisting: McTreeOption }
    ], queries: [{ propertyName: "toggleElement", first: true, predicate: ["mcTreeNodeToggle"], descendants: true }, { propertyName: "actionButton", first: true, predicate: McOptionActionComponent, descendants: true }, { propertyName: "tooltipTrigger", first: true, predicate: McTooltipTrigger, descendants: true }, { propertyName: "dropdownTrigger", first: true, predicate: McDropdownTrigger, descendants: true }], exportAs: ["mcTreeOption"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<ng-content select=\"mc-checkbox\"></ng-content>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-progress-spinner\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:32px;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:16px;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option>.mc-progress-spinner{margin-right:8px}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option>.mc-pseudo-checkbox,.mc-tree-option>.mc-checkbox{margin-right:8px}.mc-tree-option .mc-option-action{display:none}.mc-tree-option:not([disabled]):hover .mc-option-action,.mc-tree-option:not([disabled]).mc-focused .mc-option-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}\n"], components: [{ type: i1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: McTreeOption, decorators: [{
            type: Component,
            args: [{ selector: 'mc-tree-option', exportAs: 'mcTreeOption', host: {
                        class: 'mc-tree-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '[class.mc-action-button-focused]': 'actionButton?.active',
                        '[attr.id]': 'id',
                        '[attr.tabindex]': '-1',
                        '[attr.disabled]': 'disabled || null',
                        '(focusin)': 'focus()',
                        '(blur)': 'blur()',
                        '(click)': 'selectViaInteraction($event)',
                        '(keydown)': 'onKeydown($event)'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [
                        { provide: McTreeNode, useExisting: McTreeOption },
                        { provide: MC_OPTION_ACTION_PARENT, useExisting: McTreeOption }
                    ], template: "<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<ng-content select=\"mc-checkbox\"></ng-content>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-progress-spinner\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:32px;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:16px;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option>.mc-progress-spinner{margin-right:8px}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option>.mc-pseudo-checkbox,.mc-tree-option>.mc-checkbox{margin-right:8px}.mc-tree-option .mc-option-action{display:none}.mc-tree-option:not([disabled]):hover .mc-option-action,.mc-tree-option:not([disabled]).mc-focused .mc-option-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TREE_OPTION_PARENT_COMPONENT]
                }] }]; }, propDecorators: { toggleElement: [{
                type: ContentChild,
                args: ['mcTreeNodeToggle']
            }], actionButton: [{
                type: ContentChild,
                args: [McOptionActionComponent]
            }], tooltipTrigger: [{
                type: ContentChild,
                args: [McTooltipTrigger]
            }], dropdownTrigger: [{
                type: ContentChild,
                args: [McDropdownTrigger]
            }], disabled: [{
                type: Input
            }], showCheckbox: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLE1BQU0sRUFDTixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUMxQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBUXpDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsSUFBSSxjQUFjLENBQU0saUNBQWlDLENBQUMsQ0FBQztBQUUxRyxNQUFNLE9BQU8sa0JBQWtCO0lBQzNCLFlBQW1CLE1B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QUFDLGtCQUFrQjtnQkFFTyxZQUFZO3NCQUFsRCxZQUFZO3VCQUFDLHVCQUF1QjtnQkFDTCxjQUFjO3NCQUE3QyxZQUFZO3VCQUFDLGdCQUFnQjtnQkFDRyxlQUFlO3NCQUEvQyxZQUFZO3VCQUFDLGlCQUFpQjtnQkFhM0IsUUFBUTtzQkFEWCxLQUFLO2dCQWdCRixZQUFZO3NCQURmLEtBQUs7Z0JBV2EsaUJBQWlCO3NCQUFuQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIE5nWm9uZSxcbiAgICBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSwgVEFCIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgTUNfT1BUSU9OX0FDVElPTl9QQVJFTlQsXG4gICAgTWNPcHRpb25BY3Rpb25Db21wb25lbnRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNEcm9wZG93blRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZHJvcGRvd24nO1xuaW1wb3J0IHsgTWNUb29sdGlwVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jVHJlZU5vZGVUb2dnbGVCYXNlRGlyZWN0aXZlIH0gZnJvbSAnLi90b2dnbGUnO1xuaW1wb3J0IHsgTWNUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1iYXNlJztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNUcmVlT3B0aW9uRXZlbnQge1xuICAgIG9wdGlvbjogTWNUcmVlT3B0aW9uO1xufVxuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB1c2VkIHRvIHByb3ZpZGUgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IE1DX1RSRUVfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCcpO1xuXG5leHBvcnQgY2xhc3MgTWNUcmVlT3B0aW9uQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RyZWVPcHRpb24sIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7fVxufVxuXG5sZXQgdW5pcXVlSWRDb3VudGVyOiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRyZWUtb3B0aW9uJyxcbiAgICBleHBvcnRBczogJ21jVHJlZU9wdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RyZWUtb3B0aW9uLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RyZWUtb3B0aW9uLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1vcHRpb24nLFxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnaGFzRm9jdXMnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGlvbi1idXR0b24tZm9jdXNlZF0nOiAnYWN0aW9uQnV0dG9uPy5hY3RpdmUnLFxuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJy0xJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnKGZvY3VzaW4pJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG5cbiAgICAgICAgJyhjbGljayknOiAnc2VsZWN0VmlhSW50ZXJhY3Rpb24oJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1jVHJlZU5vZGUsIHVzZUV4aXN0aW5nOiBNY1RyZWVPcHRpb24gfSxcbiAgICAgICAgeyBwcm92aWRlOiBNQ19PUFRJT05fQUNUSU9OX1BBUkVOVCwgdXNlRXhpc3Rpbmc6IE1jVHJlZU9wdGlvbiB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVPcHRpb24gZXh0ZW5kcyBNY1RyZWVOb2RlPE1jVHJlZU9wdGlvbj4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICByZWFkb25seSBvbkZvY3VzID0gbmV3IFN1YmplY3Q8TWNUcmVlT3B0aW9uRXZlbnQ+KCk7XG5cbiAgICByZWFkb25seSBvbkJsdXIgPSBuZXcgU3ViamVjdDxNY1RyZWVPcHRpb25FdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGQoJ21jVHJlZU5vZGVUb2dnbGUnKSB0b2dnbGVFbGVtZW50OiBNY1RyZWVOb2RlVG9nZ2xlQmFzZURpcmVjdGl2ZTxNY1RyZWVPcHRpb24+O1xuXG4gICAgQENvbnRlbnRDaGlsZChNY09wdGlvbkFjdGlvbkNvbXBvbmVudCkgYWN0aW9uQnV0dG9uOiBNY09wdGlvbkFjdGlvbkNvbXBvbmVudDtcbiAgICBAQ29udGVudENoaWxkKE1jVG9vbHRpcFRyaWdnZXIpIHRvb2x0aXBUcmlnZ2VyOiBNY1Rvb2x0aXBUcmlnZ2VyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93blRyaWdnZXIpIGRyb3Bkb3duVHJpZ2dlcjogTWNEcm9wZG93blRyaWdnZXI7XG5cbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgdGhpcy50cmVlIS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzaG93Q2hlY2tib3goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93Q2hlY2tib3ggIT09IHVuZGVmaW5lZCA/IHRoaXMuX3Nob3dDaGVja2JveCA6IHRoaXMudHJlZS5zaG93Q2hlY2tib3g7XG4gICAgfVxuXG4gICAgc2V0IHNob3dDaGVja2JveCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3Nob3dDaGVja2JveCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd0NoZWNrYm94OiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RyZWVPcHRpb25DaGFuZ2U+KCk7XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkKGlzU2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQgPSBgbWMtdHJlZS1vcHRpb24tJHt1bmlxdWVJZENvdW50ZXIrK31gO1xuXG4gICAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICAvLyBUT0RPOiBBZGQgaW5wdXQgcHJvcGVydHkgYWx0ZXJuYXRpdmUgZm9yIG5vZGUgZW52cy5cbiAgICAgICAgcmV0dXJuICh0aGlzLmdldEhvc3RFbGVtZW50KCkudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgICB9XG5cbiAgICBoYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGlzRXhwYW5kYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnRvZ2dsZUVsZW1lbnQ/LmRpc2FibGVkICYmIHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGFibGUodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCkgcHVibGljIHRyZWU6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCB0cmVlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0VmFsdWUodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IHNlbGVjdGVkIHx8ICF0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcy5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBmb2N1cyhmb2N1c09yaWdpbj86IEZvY3VzT3JpZ2luKSB7XG4gICAgICAgIGlmIChmb2N1c09yaWdpbiA9PT0gJ3Byb2dyYW0nKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaGFzRm9jdXMgfHwgdGhpcy5hY3Rpb25CdXR0b24/Lmhhc0ZvY3VzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIG9wdGlvbiBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIHRyZWVcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBvcHRpb25cbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uQnV0dG9uPy5oYXNGb2N1cykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQmx1ci5uZXh0KHsgb3B0aW9uOiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNsaWVudFJlY3RzID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKTtcblxuICAgICAgICBpZiAoY2xpZW50UmVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xpZW50UmVjdHNbMF0uaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKCRldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uQnV0dG9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICgkZXZlbnQua2V5Q29kZSA9PT0gVEFCICYmICEkZXZlbnQuc2hpZnRLZXkgJiYgIXRoaXMuYWN0aW9uQnV0dG9uLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkJ1dHRvbi5mb2N1cygpO1xuXG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFZpYUludGVyYWN0aW9uKCRldmVudD86IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQodHJ1ZSk7XG5cbiAgICAgICAgY29uc3Qgc2hpZnRLZXkgPSAkZXZlbnQgPyBoYXNNb2RpZmllcktleSgkZXZlbnQsICdzaGlmdEtleScpIDogZmFsc2U7XG4gICAgICAgIGNvbnN0IGN0cmxLZXkgPSAkZXZlbnQgPyBoYXNNb2RpZmllcktleSgkZXZlbnQsICdjdHJsS2V5JykgOiBmYWxzZTtcblxuICAgICAgICB0aGlzLnRyZWUuc2V0U2VsZWN0ZWRPcHRpb25zQnlDbGljayh0aGlzLCBzaGlmdEtleSwgY3RybEtleSk7XG4gICAgfVxuXG4gICAgZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KGlzVXNlcklucHV0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVPcHRpb25DaGFuZ2UodGhpcywgaXNVc2VySW5wdXQpKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIiwiPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtdHJlZS1ub2RlLXRvZ2dsZVwiPjwvbmctY29udGVudD5cblxuPG1jLXBzZXVkby1jaGVja2JveFxuICAgICpuZ0lmPVwic2hvd0NoZWNrYm94XCJcbiAgICBbc3RhdGVdPVwic2VsZWN0ZWQgPyAnY2hlY2tlZCcgOiAndW5jaGVja2VkJ1wiXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG48L21jLXBzZXVkby1jaGVja2JveD5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtY2hlY2tib3hcIj48L25nLWNvbnRlbnQ+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1pY29uXVwiPjwvbmctY29udGVudD5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtcHJvZ3Jlc3Mtc3Bpbm5lclwiPjwvbmctY29udGVudD5cblxuPHNwYW4gY2xhc3M9XCJtYy1vcHRpb24tdGV4dCBtYy1uby1zZWxlY3RcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuXG48bmctY29udGVudCBzZWxlY3Q9XCJtYy1vcHRpb24tYWN0aW9uXCI+PC9uZy1jb250ZW50PlxuXG48ZGl2IGNsYXNzPVwibWMtb3B0aW9uLW92ZXJsYXlcIj48L2Rpdj5cbiJdfQ==
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
    ], queries: [{ propertyName: "toggleElement", first: true, predicate: ["mcTreeNodeToggle"], descendants: true }, { propertyName: "actionButton", first: true, predicate: McOptionActionComponent, descendants: true }, { propertyName: "tooltipTrigger", first: true, predicate: McTooltipTrigger, descendants: true }, { propertyName: "dropdownTrigger", first: true, predicate: McDropdownTrigger, descendants: true }], exportAs: ["mcTreeOption"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<ng-content select=\"mc-checkbox\"></ng-content>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:32px;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:16px;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option>.mc-pseudo-checkbox,.mc-tree-option>.mc-checkbox{margin-right:8px}.mc-tree-option .mc-option-action{display:none}.mc-tree-option:not([disabled]):hover .mc-option-action,.mc-tree-option:not([disabled]).mc-focused .mc-option-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}\n"], components: [{ type: i1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
                    ], template: "<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<ng-content select=\"mc-checkbox\"></ng-content>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:32px;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:16px;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option>.mc-pseudo-checkbox,.mc-tree-option>.mc-checkbox{margin-right:8px}.mc-tree-option .mc-option-action{display:none}.mc-tree-option:not([disabled]):hover .mc-option-action,.mc-tree-option:not([disabled]).mc-focused .mc-option-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLE1BQU0sRUFDTixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUMxQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBUXpDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsSUFBSSxjQUFjLENBQU0saUNBQWlDLENBQUMsQ0FBQztBQUUxRyxNQUFNLE9BQU8sa0JBQWtCO0lBQzNCLFlBQW1CLE1B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QUMsZ0JBQWdCO2dCQUNHLGVBQWU7c0JBQS9DLFlBQVk7dUJBQUMsaUJBQWlCO2dCQWEzQixRQUFRO3NCQURYLEtBQUs7Z0JBZ0JGLFlBQVk7c0JBRGYsS0FBSztnQkFXYSxpQkFBaUI7c0JBQW5DLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgTmdab25lLFxuICAgIENvbnRlbnRDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5LCBUQUIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBNQ19PUFRJT05fQUNUSU9OX1BBUkVOVCxcbiAgICBNY09wdGlvbkFjdGlvbkNvbXBvbmVudFxufSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0Ryb3Bkb3duVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9kcm9wZG93bic7XG5pbXBvcnQgeyBNY1Rvb2x0aXBUcmlnZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL3Rvb2x0aXAnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNUcmVlTm9kZVRvZ2dsZUJhc2VEaXJlY3RpdmUgfSBmcm9tICcuL3RvZ2dsZSc7XG5pbXBvcnQgeyBNY1RyZWVOb2RlIH0gZnJvbSAnLi90cmVlLWJhc2UnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBNY1RyZWVPcHRpb25FdmVudCB7XG4gICAgb3B0aW9uOiBNY1RyZWVPcHRpb247XG59XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHVzZWQgdG8gcHJvdmlkZSB0aGUgcGFyZW50IGNvbXBvbmVudCB0byBvcHRpb25zLlxuICovXG5leHBvcnQgY29uc3QgTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdNQ19UUkVFX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UJyk7XG5cbmV4cG9ydCBjbGFzcyBNY1RyZWVPcHRpb25DaGFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1jVHJlZU9wdGlvbiwgcHVibGljIGlzVXNlcklucHV0ID0gZmFsc2UpIHt9XG59XG5cbmxldCB1bmlxdWVJZENvdW50ZXI6IG51bWJlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWMtdHJlZS1vcHRpb24nLFxuICAgIGV4cG9ydEFzOiAnbWNUcmVlT3B0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdHJlZS1vcHRpb24uaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdHJlZS1vcHRpb24uc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy10cmVlLW9wdGlvbicsXG4gICAgICAgICdbY2xhc3MubWMtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1mb2N1c2VkXSc6ICdoYXNGb2N1cycsXG4gICAgICAgICdbY2xhc3MubWMtYWN0aW9uLWJ1dHRvbi1mb2N1c2VkXSc6ICdhY3Rpb25CdXR0b24/LmFjdGl2ZScsXG5cbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnLTEnLFxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgICcoZm9jdXNpbiknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcblxuICAgICAgICAnKGNsaWNrKSc6ICdzZWxlY3RWaWFJbnRlcmFjdGlvbigkZXZlbnQpJyxcbiAgICAgICAgJyhrZXlkb3duKSc6ICdvbktleWRvd24oJGV2ZW50KSdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTWNUcmVlTm9kZSwgdXNlRXhpc3Rpbmc6IE1jVHJlZU9wdGlvbiB9LFxuICAgICAgICB7IHByb3ZpZGU6IE1DX09QVElPTl9BQ1RJT05fUEFSRU5ULCB1c2VFeGlzdGluZzogTWNUcmVlT3B0aW9uIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU9wdGlvbiBleHRlbmRzIE1jVHJlZU5vZGU8TWNUcmVlT3B0aW9uPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIHJlYWRvbmx5IG9uRm9jdXMgPSBuZXcgU3ViamVjdDxNY1RyZWVPcHRpb25FdmVudD4oKTtcblxuICAgIHJlYWRvbmx5IG9uQmx1ciA9IG5ldyBTdWJqZWN0PE1jVHJlZU9wdGlvbkV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZCgnbWNUcmVlTm9kZVRvZ2dsZScpIHRvZ2dsZUVsZW1lbnQ6IE1jVHJlZU5vZGVUb2dnbGVCYXNlRGlyZWN0aXZlPE1jVHJlZU9wdGlvbj47XG5cbiAgICBAQ29udGVudENoaWxkKE1jT3B0aW9uQWN0aW9uQ29tcG9uZW50KSBhY3Rpb25CdXR0b246IE1jT3B0aW9uQWN0aW9uQ29tcG9uZW50O1xuICAgIEBDb250ZW50Q2hpbGQoTWNUb29sdGlwVHJpZ2dlcikgdG9vbHRpcFRyaWdnZXI6IE1jVG9vbHRpcFRyaWdnZXI7XG4gICAgQENvbnRlbnRDaGlsZChNY0Ryb3Bkb3duVHJpZ2dlcikgZHJvcGRvd25UcmlnZ2VyOiBNY0Ryb3Bkb3duVHJpZ2dlcjtcblxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCB0aGlzLnRyZWUhLmRpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNob3dDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dDaGVja2JveCAhPT0gdW5kZWZpbmVkID8gdGhpcy5fc2hvd0NoZWNrYm94IDogdGhpcy50cmVlLnNob3dDaGVja2JveDtcbiAgICB9XG5cbiAgICBzZXQgc2hvd0NoZWNrYm94KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fc2hvd0NoZWNrYm94ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93Q2hlY2tib3g6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1jVHJlZU9wdGlvbkNoYW5nZT4oKTtcblxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAoaXNTZWxlY3RlZCAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoaXNTZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZCA9IGBtYy10cmVlLW9wdGlvbi0ke3VuaXF1ZUlkQ291bnRlcisrfWA7XG5cbiAgICBnZXQgdmlld1ZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBpbnB1dCBwcm9wZXJ0eSBhbHRlcm5hdGl2ZSBmb3Igbm9kZSBlbnZzLlxuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICAgIH1cblxuICAgIGhhc0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgaXNFeHBhbmRhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMudG9nZ2xlRWxlbWVudD8uZGlzYWJsZWQgJiYgdGhpcy50cmVlLnRyZWVDb250cm9sLmlzRXhwYW5kYWJsZSh0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgQEluamVjdChNQ19UUkVFX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UKSBwdWJsaWMgdHJlZTogYW55XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIHRyZWUpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRWYWx1ZSh0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCA9PT0gc2VsZWN0ZWQgfHwgIXRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy50cmVlLnNlbGVjdGlvbk1vZGVsLnNlbGVjdCh0aGlzLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmVlLnNlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KHRoaXMuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGZvY3VzKGZvY3VzT3JpZ2luPzogRm9jdXNPcmlnaW4pIHtcbiAgICAgICAgaWYgKGZvY3VzT3JpZ2luID09PSAncHJvZ3JhbScpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5oYXNGb2N1cyB8fCB0aGlzLmFjdGlvbkJ1dHRvbj8uaGFzRm9jdXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICB0aGlzLm9uRm9jdXMubmV4dCh7IG9wdGlvbjogdGhpcyB9KTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgb3B0aW9uIGZyb20gdGhlIERPTSBhIGxpdHRsZVxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgdHJlZVxuICAgICAgICAvLyB0aGF0IG1vdmVzIGZvY3VzIG5vdCB0aGUgbmV4dCBpdGVtLiBUbyB3b3JrIGFyb3VuZCB0aGUgaXNzdWUsIHdlIGRlZmVyIG1hcmtpbmcgdGhlIG9wdGlvblxuICAgICAgICAvLyBhcyBub3QgZm9jdXNlZCB1bnRpbCB0aGUgbmV4dCB0aW1lIHRoZSB6b25lIHN0YWJpbGl6ZXMuXG4gICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3Rpb25CdXR0b24/Lmhhc0ZvY3VzKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CbHVyLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY2xpZW50UmVjdHMgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpO1xuXG4gICAgICAgIGlmIChjbGllbnRSZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGllbnRSZWN0c1swXS5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBzZWxlY3QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKCRldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uQnV0dG9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICgkZXZlbnQua2V5Q29kZSA9PT0gVEFCICYmICEkZXZlbnQuc2hpZnRLZXkgJiYgIXRoaXMuYWN0aW9uQnV0dG9uLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkJ1dHRvbi5mb2N1cygpO1xuXG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFZpYUludGVyYWN0aW9uKCRldmVudD86IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQodHJ1ZSk7XG5cbiAgICAgICAgY29uc3Qgc2hpZnRLZXkgPSAkZXZlbnQgPyBoYXNNb2RpZmllcktleSgkZXZlbnQsICdzaGlmdEtleScpIDogZmFsc2U7XG4gICAgICAgIGNvbnN0IGN0cmxLZXkgPSAkZXZlbnQgPyBoYXNNb2RpZmllcktleSgkZXZlbnQsICdjdHJsS2V5JykgOiBmYWxzZTtcblxuICAgICAgICB0aGlzLnRyZWUuc2V0U2VsZWN0ZWRPcHRpb25zQnlDbGljayh0aGlzLCBzaGlmdEtleSwgY3RybEtleSk7XG4gICAgfVxuXG4gICAgZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KGlzVXNlcklucHV0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVPcHRpb25DaGFuZ2UodGhpcywgaXNVc2VySW5wdXQpKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIiwiPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtdHJlZS1ub2RlLXRvZ2dsZVwiPjwvbmctY29udGVudD5cblxuPG1jLXBzZXVkby1jaGVja2JveFxuICAgICpuZ0lmPVwic2hvd0NoZWNrYm94XCJcbiAgICBbc3RhdGVdPVwic2VsZWN0ZWQgPyAnY2hlY2tlZCcgOiAndW5jaGVja2VkJ1wiXG4gICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG48L21jLXBzZXVkby1jaGVja2JveD5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtY2hlY2tib3hcIj48L25nLWNvbnRlbnQ+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIlttYy1pY29uXVwiPjwvbmctY29udGVudD5cblxuPHNwYW4gY2xhc3M9XCJtYy1vcHRpb24tdGV4dCBtYy1uby1zZWxlY3RcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuXG48bmctY29udGVudCBzZWxlY3Q9XCJtYy1vcHRpb24tYWN0aW9uXCI+PC9uZy1jb250ZW50PlxuXG48ZGl2IGNsYXNzPVwibWMtb3B0aW9uLW92ZXJsYXlcIj48L2Rpdj5cbiJdfQ==
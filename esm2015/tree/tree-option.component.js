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
        var _a;
        return !((_a = this.toggleElement) === null || _a === void 0 ? void 0 : _a.disabled) && this.tree.treeControl.isExpandable(this.data);
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
        var _a;
        if (focusOrigin === 'program') {
            return;
        }
        if (this.disabled || this.hasFocus || ((_a = this.actionButton) === null || _a === void 0 ? void 0 : _a.hasFocus)) {
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
                var _a;
                this.hasFocus = false;
                if ((_a = this.actionButton) === null || _a === void 0 ? void 0 : _a.hasFocus) {
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
/** @nocollapse */ McTreeOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: MC_TREE_OPTION_PARENT_COMPONENT }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ McTreeOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeOption, selector: "mc-tree-option", inputs: { disabled: "disabled", showCheckbox: "showCheckbox" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "selectViaInteraction($event)", "keydown": "onKeydown($event)" }, properties: { "class.mc-selected": "selected", "class.mc-focused": "hasFocus", "class.mc-action-button-focused": "actionButton?.active", "attr.id": "id", "attr.tabindex": "-1", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-option" }, providers: [
        { provide: McTreeNode, useExisting: McTreeOption },
        { provide: MC_OPTION_ACTION_PARENT, useExisting: McTreeOption }
    ], queries: [{ propertyName: "toggleElement", first: true, predicate: ["mcTreeNodeToggle"], descendants: true }, { propertyName: "actionButton", first: true, predicate: McOptionActionComponent, descendants: true }, { propertyName: "tooltipTrigger", first: true, predicate: McTooltipTrigger, descendants: true }, { propertyName: "dropdownTrigger", first: true, predicate: McDropdownTrigger, descendants: true }], exportAs: ["mcTreeOption"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<ng-content select=\"mc-checkbox\"></ng-content>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:32px;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:16px;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option>.mc-pseudo-checkbox,.mc-tree-option>.mc-checkbox{margin-right:8px}.mc-tree-option .mc-option-action{display:none}.mc-tree-option:not([disabled]):hover .mc-option-action,.mc-tree-option:not([disabled]).mc-focused .mc-option-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}\n"], components: [{ type: i1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeOption, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-option',
                    exportAs: 'mcTreeOption',
                    templateUrl: './tree-option.html',
                    styleUrls: ['./tree-option.scss'],
                    host: {
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
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        { provide: McTreeNode, useExisting: McTreeOption },
                        { provide: MC_OPTION_ACTION_PARENT, useExisting: McTreeOption }
                    ]
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLE1BQU0sRUFDTixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUMxQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0FBUXpDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsSUFBSSxjQUFjLENBQU0saUNBQWlDLENBQUMsQ0FBQztBQUUxRyxNQUFNLE9BQU8sa0JBQWtCO0lBQzNCLFlBQW1CLE1BQW9CLEVBQVMsY0FBYyxLQUFLO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQWM7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtJQUFHLENBQUM7Q0FDMUU7QUFFRCxJQUFJLGVBQWUsR0FBVyxDQUFDLENBQUM7QUE4QmhDLE1BQU0sT0FBTyxZQUFhLFNBQVEsVUFBd0I7SUFnRnRELFlBQ0ksVUFBc0IsRUFDZCxpQkFBb0MsRUFDcEMsTUFBYyxFQUMwQixJQUFTO1FBRXpELEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFKaEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQzBCLFNBQUksR0FBSixJQUFJLENBQUs7UUFuRnBELFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBcUIsQ0FBQztRQUUzQyxXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUErQjNDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFhaEIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFjdEUsY0FBUyxHQUFZLEtBQUssQ0FBQztRQU0zQixRQUFHLEdBQUcsa0JBQWtCLGVBQWUsRUFBRSxFQUFFLENBQUM7UUFPcEQsYUFBUSxHQUFZLEtBQUssQ0FBQztJQWExQixDQUFDO0lBNUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBVTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBSUQsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFLLENBQUMsUUFBUSxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFVO1FBQ25CLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlDLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBSUQsSUFDSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDMUYsQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLEtBQVU7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBTUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFJRCxJQUFJLEVBQUU7UUFDRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUlELElBQUksU0FBUztRQUNULHNEQUFzRDtRQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBSUQsSUFBSSxZQUFZOztRQUNaLE9BQU8sQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsUUFBUSxDQUFBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBV0Qsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUFpQjtRQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFekUsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFFMUIsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBeUI7O1FBQzNCLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUUxQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLFFBQVEsQ0FBQSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRTlFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXRDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFcEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFFckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUk7UUFDQSw0RkFBNEY7UUFDNUYsc0ZBQXNGO1FBQ3RGLDRGQUE0RjtRQUM1RiwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2FBQ2YsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7O2dCQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFFdEIsSUFBSSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLFFBQVEsRUFBRTtvQkFBRSxPQUFPO2lCQUFFO2dCQUU1QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsU0FBUztRQUNMLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRW5FLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUNwQixPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFFRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRS9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBRWhDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQU07UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUFFLE9BQU87U0FBRTtRQUVuQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFO1lBQzNFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFMUIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELG9CQUFvQixDQUFDLE1BQXNCO1FBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUU5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRW5FLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsd0JBQXdCLENBQUMsV0FBVyxHQUFHLEtBQUs7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN6QyxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDOzs0SEE3TVEsWUFBWSxtR0FvRlQsK0JBQStCO2dIQXBGbEMsWUFBWSxraUJBTFY7UUFDUCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRTtRQUNsRCxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFO0tBQ2xFLHdLQVNhLHVCQUF1QixpRkFDdkIsZ0JBQWdCLGtGQUNoQixpQkFBaUIsbUdDcEZuQyxrZkFpQkE7MkZEMERhLFlBQVk7a0JBNUJ4QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixXQUFXLEVBQUUsb0JBQW9CO29CQUNqQyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDakMsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxnQkFBZ0I7d0JBQ3ZCLHFCQUFxQixFQUFFLFVBQVU7d0JBQ2pDLG9CQUFvQixFQUFFLFVBQVU7d0JBQ2hDLGtDQUFrQyxFQUFFLHNCQUFzQjt3QkFFMUQsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLGlCQUFpQixFQUFFLElBQUk7d0JBQ3ZCLGlCQUFpQixFQUFFLGtCQUFrQjt3QkFFckMsV0FBVyxFQUFFLFNBQVM7d0JBQ3RCLFFBQVEsRUFBRSxRQUFRO3dCQUVsQixTQUFTLEVBQUUsOEJBQThCO3dCQUN6QyxXQUFXLEVBQUUsbUJBQW1CO3FCQUNuQztvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRTt3QkFDUCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxjQUFjLEVBQUU7d0JBQ2xELEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFdBQVcsY0FBYyxFQUFFO3FCQUNsRTtpQkFDSjs7MEJBcUZRLE1BQU07MkJBQUMsK0JBQStCOzRDQS9FVCxhQUFhO3NCQUE5QyxZQUFZO3VCQUFDLGtCQUFrQjtnQkFFTyxZQUFZO3NCQUFsRCxZQUFZO3VCQUFDLHVCQUF1QjtnQkFDTCxjQUFjO3NCQUE3QyxZQUFZO3VCQUFDLGdCQUFnQjtnQkFDRyxlQUFlO3NCQUEvQyxZQUFZO3VCQUFDLGlCQUFpQjtnQkFhM0IsUUFBUTtzQkFEWCxLQUFLO2dCQWdCRixZQUFZO3NCQURmLEtBQUs7Z0JBV2EsaUJBQWlCO3NCQUFuQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIE5nWm9uZSxcbiAgICBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBoYXNNb2RpZmllcktleSwgVEFCIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgTUNfT1BUSU9OX0FDVElPTl9QQVJFTlQsXG4gICAgTWNPcHRpb25BY3Rpb25Db21wb25lbnRcbn0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNEcm9wZG93blRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvZHJvcGRvd24nO1xuaW1wb3J0IHsgTWNUb29sdGlwVHJpZ2dlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1jVHJlZU5vZGVUb2dnbGVCYXNlRGlyZWN0aXZlIH0gZnJvbSAnLi90b2dnbGUnO1xuaW1wb3J0IHsgTWNUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1iYXNlJztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgTWNUcmVlT3B0aW9uRXZlbnQge1xuICAgIG9wdGlvbjogTWNUcmVlT3B0aW9uO1xufVxuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB1c2VkIHRvIHByb3ZpZGUgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IE1DX1RSRUVfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCcpO1xuXG5leHBvcnQgY2xhc3MgTWNUcmVlT3B0aW9uQ2hhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNY1RyZWVPcHRpb24sIHB1YmxpYyBpc1VzZXJJbnB1dCA9IGZhbHNlKSB7fVxufVxuXG5sZXQgdW5pcXVlSWRDb3VudGVyOiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLXRyZWUtb3B0aW9uJyxcbiAgICBleHBvcnRBczogJ21jVHJlZU9wdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RyZWUtb3B0aW9uLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RyZWUtb3B0aW9uLnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1vcHRpb24nLFxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnaGFzRm9jdXMnLFxuICAgICAgICAnW2NsYXNzLm1jLWFjdGlvbi1idXR0b24tZm9jdXNlZF0nOiAnYWN0aW9uQnV0dG9uPy5hY3RpdmUnLFxuXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJy0xJyxcbiAgICAgICAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcblxuICAgICAgICAnKGZvY3VzaW4pJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG5cbiAgICAgICAgJyhjbGljayknOiAnc2VsZWN0VmlhSW50ZXJhY3Rpb24oJGV2ZW50KScsXG4gICAgICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE1jVHJlZU5vZGUsIHVzZUV4aXN0aW5nOiBNY1RyZWVPcHRpb24gfSxcbiAgICAgICAgeyBwcm92aWRlOiBNQ19PUFRJT05fQUNUSU9OX1BBUkVOVCwgdXNlRXhpc3Rpbmc6IE1jVHJlZU9wdGlvbiB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVPcHRpb24gZXh0ZW5kcyBNY1RyZWVOb2RlPE1jVHJlZU9wdGlvbj4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICByZWFkb25seSBvbkZvY3VzID0gbmV3IFN1YmplY3Q8TWNUcmVlT3B0aW9uRXZlbnQ+KCk7XG5cbiAgICByZWFkb25seSBvbkJsdXIgPSBuZXcgU3ViamVjdDxNY1RyZWVPcHRpb25FdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGQoJ21jVHJlZU5vZGVUb2dnbGUnKSB0b2dnbGVFbGVtZW50OiBNY1RyZWVOb2RlVG9nZ2xlQmFzZURpcmVjdGl2ZTxNY1RyZWVPcHRpb24+O1xuXG4gICAgQENvbnRlbnRDaGlsZChNY09wdGlvbkFjdGlvbkNvbXBvbmVudCkgYWN0aW9uQnV0dG9uOiBNY09wdGlvbkFjdGlvbkNvbXBvbmVudDtcbiAgICBAQ29udGVudENoaWxkKE1jVG9vbHRpcFRyaWdnZXIpIHRvb2x0aXBUcmlnZ2VyOiBNY1Rvb2x0aXBUcmlnZ2VyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93blRyaWdnZXIpIGRyb3Bkb3duVHJpZ2dlcjogTWNEcm9wZG93blRyaWdnZXI7XG5cbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgdGhpcy50cmVlIS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzaG93Q2hlY2tib3goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93Q2hlY2tib3ggIT09IHVuZGVmaW5lZCA/IHRoaXMuX3Nob3dDaGVja2JveCA6IHRoaXMudHJlZS5zaG93Q2hlY2tib3g7XG4gICAgfVxuXG4gICAgc2V0IHNob3dDaGVja2JveCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3Nob3dDaGVja2JveCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd0NoZWNrYm94OiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RyZWVPcHRpb25DaGFuZ2U+KCk7XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkKGlzU2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQgPSBgbWMtdHJlZS1vcHRpb24tJHt1bmlxdWVJZENvdW50ZXIrK31gO1xuXG4gICAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICAvLyBUT0RPOiBBZGQgaW5wdXQgcHJvcGVydHkgYWx0ZXJuYXRpdmUgZm9yIG5vZGUgZW52cy5cbiAgICAgICAgcmV0dXJuICh0aGlzLmdldEhvc3RFbGVtZW50KCkudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgICB9XG5cbiAgICBoYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGlzRXhwYW5kYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnRvZ2dsZUVsZW1lbnQ/LmRpc2FibGVkICYmIHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGFibGUodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCkgcHVibGljIHRyZWU6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCB0cmVlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0VmFsdWUodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IHNlbGVjdGVkIHx8ICF0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcy5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBmb2N1cyhmb2N1c09yaWdpbj86IEZvY3VzT3JpZ2luKSB7XG4gICAgICAgIGlmIChmb2N1c09yaWdpbiA9PT0gJ3Byb2dyYW0nKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaGFzRm9jdXMgfHwgdGhpcy5hY3Rpb25CdXR0b24/Lmhhc0ZvY3VzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIG9wdGlvbiBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIHRyZWVcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBvcHRpb25cbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbkJ1dHRvbj8uaGFzRm9jdXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkJsdXIubmV4dCh7IG9wdGlvbjogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjbGllbnRSZWN0cyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKCk7XG5cbiAgICAgICAgaWYgKGNsaWVudFJlY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsaWVudFJlY3RzWzBdLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCgpO1xuICAgIH1cblxuICAgIGRlc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oJGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5hY3Rpb25CdXR0b24pIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKCRldmVudC5rZXlDb2RlID09PSBUQUIgJiYgISRldmVudC5zaGlmdEtleSAmJiAhdGhpcy5hY3Rpb25CdXR0b24uaGFzRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uQnV0dG9uLmZvY3VzKCk7XG5cbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oJGV2ZW50PzogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCh0cnVlKTtcblxuICAgICAgICBjb25zdCBzaGlmdEtleSA9ICRldmVudCA/IGhhc01vZGlmaWVyS2V5KCRldmVudCwgJ3NoaWZ0S2V5JykgOiBmYWxzZTtcbiAgICAgICAgY29uc3QgY3RybEtleSA9ICRldmVudCA/IGhhc01vZGlmaWVyS2V5KCRldmVudCwgJ2N0cmxLZXknKSA6IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudHJlZS5zZXRTZWxlY3RlZE9wdGlvbnNCeUNsaWNrKHRoaXMsIHNoaWZ0S2V5LCBjdHJsS2V5KTtcbiAgICB9XG5cbiAgICBlbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoaXNVc2VySW5wdXQgPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmVtaXQobmV3IE1jVHJlZU9wdGlvbkNoYW5nZSh0aGlzLCBpc1VzZXJJbnB1dCkpO1xuICAgIH1cblxuICAgIGdldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG1hcmtGb3JDaGVjaygpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG59XG4iLCI8bmctY29udGVudCBzZWxlY3Q9XCJtYy10cmVlLW5vZGUtdG9nZ2xlXCI+PC9uZy1jb250ZW50PlxuXG48bWMtcHNldWRvLWNoZWNrYm94XG4gICAgKm5nSWY9XCJzaG93Q2hlY2tib3hcIlxuICAgIFtzdGF0ZV09XCJzZWxlY3RlZCA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnXCJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbjwvbWMtcHNldWRvLWNoZWNrYm94PlxuXG48bmctY29udGVudCBzZWxlY3Q9XCJtYy1jaGVja2JveFwiPjwvbmctY29udGVudD5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLWljb25dXCI+PC9uZy1jb250ZW50PlxuXG48c3BhbiBjbGFzcz1cIm1jLW9wdGlvbi10ZXh0IG1jLW5vLXNlbGVjdFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1jLW9wdGlvbi1hY3Rpb25cIj48L25nLWNvbnRlbnQ+XG5cbjxkaXYgY2xhc3M9XCJtYy1vcHRpb24tb3ZlcmxheVwiPjwvZGl2PlxuIl19
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ElementRef, Inject, InjectionToken, ChangeDetectionStrategy, ViewEncapsulation, NgZone, ContentChild } from '@angular/core';
import { hasModifierKey, TAB } from '@ptsecurity/cdk/keycodes';
import { MC_OPTION_ACTION_PARENT, McOptionActionComponent, McPseudoCheckbox } from '@ptsecurity/mosaic/core';
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
    get externalPseudoCheckbox() {
        return !!this.pseudoCheckbox;
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
    select(setFocus = true) {
        if (this._selected) {
            return;
        }
        this._selected = true;
        if (setFocus && !this.hasFocus) {
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
/** @nocollapse */ /** @nocollapse */ McTreeOption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTreeOption, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: MC_TREE_OPTION_PARENT_COMPONENT }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McTreeOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McTreeOption, selector: "mc-tree-option", inputs: { disabled: "disabled", showCheckbox: "showCheckbox" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "selectViaInteraction($event)", "keydown": "onKeydown($event)" }, properties: { "class.mc-selected": "selected", "class.mc-focused": "hasFocus", "class.mc-action-button-focused": "actionButton?.active", "attr.id": "id", "attr.tabindex": "-1", "attr.disabled": "disabled || null" }, classAttribute: "mc-tree-option" }, providers: [
        { provide: McTreeNode, useExisting: McTreeOption },
        { provide: MC_OPTION_ACTION_PARENT, useExisting: McTreeOption }
    ], queries: [{ propertyName: "toggleElement", first: true, predicate: ["mcTreeNodeToggle"], descendants: true }, { propertyName: "pseudoCheckbox", first: true, predicate: McPseudoCheckbox, descendants: true }, { propertyName: "actionButton", first: true, predicate: McOptionActionComponent, descendants: true }, { propertyName: "tooltipTrigger", first: true, predicate: McTooltipTrigger, descendants: true }, { propertyName: "dropdownTrigger", first: true, predicate: McDropdownTrigger, descendants: true }], exportAs: ["mcTreeOption"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"mc-tree-node-toggle, [mc-tree-node-toggle], [mcTreeNodeToggle]\"></ng-content>\n\n<ng-container [ngSwitch]=\"externalPseudoCheckbox\">\n    <ng-content *ngSwitchCase=\"true\" select=\"mc-pseudo-checkbox\"></ng-content>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <mc-pseudo-checkbox\n            *ngIf=\"showCheckbox\"\n            [state]=\"selected ? 'checked' : 'unchecked'\"\n            [disabled]=\"disabled\">\n        </mc-pseudo-checkbox>\n    </ng-container>\n</ng-container>\n\n<ng-content select=\"mc-checkbox\"></ng-content>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-progress-spinner\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option>.mc-progress-spinner{margin-right:8px}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option>.mc-pseudo-checkbox,.mc-tree-option>.mc-checkbox{margin-right:8px}.mc-tree-option .mc-option-action{display:none}.mc-tree-option:not([disabled]):hover .mc-option-action,.mc-tree-option:not([disabled]).mc-focused .mc-option-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}\n"], components: [{ type: i1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McTreeOption, decorators: [{
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
                    ], template: "<ng-content select=\"mc-tree-node-toggle, [mc-tree-node-toggle], [mcTreeNodeToggle]\"></ng-content>\n\n<ng-container [ngSwitch]=\"externalPseudoCheckbox\">\n    <ng-content *ngSwitchCase=\"true\" select=\"mc-pseudo-checkbox\"></ng-content>\n\n    <ng-container *ngSwitchCase=\"false\">\n        <mc-pseudo-checkbox\n            *ngIf=\"showCheckbox\"\n            [state]=\"selected ? 'checked' : 'unchecked'\"\n            [disabled]=\"disabled\">\n        </mc-pseudo-checkbox>\n    </ng-container>\n</ng-container>\n\n<ng-content select=\"mc-checkbox\"></ng-content>\n\n<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-progress-spinner\"></ng-content>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<ng-content select=\"mc-option-action\"></ng-content>\n\n<div class=\"mc-option-overlay\"></div>\n", styles: [".mc-tree-option{box-sizing:border-box;display:flex;align-items:center;height:var(--mc-tree-size-node-height, 32px);word-wrap:break-word;border:2px solid transparent}.mc-tree-option .mc-option-text{display:inline-block;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:var(--mc-tree-size-padding-right, 16px)}.mc-tree-option>.mc-icon{margin-right:8px;cursor:pointer}.mc-tree-option>.mc-progress-spinner{margin-right:8px}.mc-tree-option:focus{outline:none}.mc-tree-option:not([disabled]){cursor:pointer}.mc-tree-option>.mc-pseudo-checkbox,.mc-tree-option>.mc-checkbox{margin-right:8px}.mc-tree-option .mc-option-action{display:none}.mc-tree-option:not([disabled]):hover .mc-option-action,.mc-tree-option:not([disabled]).mc-focused .mc-option-action,.mc-tree-option:not([disabled]).mc-action-button-focused .mc-option-action{display:flex}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TREE_OPTION_PARENT_COMPONENT]
                }] }]; }, propDecorators: { toggleElement: [{
                type: ContentChild,
                args: ['mcTreeNodeToggle']
            }], pseudoCheckbox: [{
                type: ContentChild,
                args: [McPseudoCheckbox]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLE1BQU0sRUFDTixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUN2QixnQkFBZ0IsRUFDbkIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7OztBQVF6Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFHLElBQUksY0FBYyxDQUFNLGlDQUFpQyxDQUFDLENBQUM7QUFFMUcsTUFBTSxPQUFPLGtCQUFrQjtJ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QUFFLFdBQVcsY0FBYyxFQUFFO3dCQUNsRCxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxXQUFXLGNBQWMsRUFBRTtxQkFDbEU7OzBCQTJGSSxNQUFNOzJCQUFDLCtCQUErQjs0Q0FwRlQsYUFBYTtzQkFBOUMsWUFBWTt1QkFBQyxrQkFBa0I7Z0JBRUEsY0FBYztzQkFBN0MsWUFBWTt1QkFBQyxnQkFBZ0I7Z0JBQ1MsWUFBWTtzQkFBbEQsWUFBWTt1QkFBQyx1QkFBdUI7Z0JBQ0wsY0FBYztzQkFBN0MsWUFBWTt1QkFBQyxnQkFBZ0I7Z0JBQ0csZUFBZTtzQkFBL0MsWUFBWTt1QkFBQyxpQkFBaUI7Z0JBaUIzQixRQUFRO3NCQURYLEtBQUs7Z0JBZ0JGLFlBQVk7c0JBRGYsS0FBSztnQkFXYSxpQkFBaUI7c0JBQW5DLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c09yaWdpbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgTmdab25lLFxuICAgIENvbnRlbnRDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5LCBUQUIgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBNQ19PUFRJT05fQUNUSU9OX1BBUkVOVCxcbiAgICBNY09wdGlvbkFjdGlvbkNvbXBvbmVudCxcbiAgICBNY1BzZXVkb0NoZWNrYm94XG59IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jRHJvcGRvd25UcmlnZ2VyIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Ryb3Bkb3duJztcbmltcG9ydCB7IE1jVG9vbHRpcFRyaWdnZXIgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvdG9vbHRpcCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY1RyZWVOb2RlVG9nZ2xlQmFzZURpcmVjdGl2ZSB9IGZyb20gJy4vdG9nZ2xlJztcbmltcG9ydCB7IE1jVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtYmFzZSc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jVHJlZU9wdGlvbkV2ZW50IHtcbiAgICBvcHRpb246IE1jVHJlZU9wdGlvbjtcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBwYXJlbnQgY29tcG9uZW50IHRvIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19UUkVFX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ01DX1RSRUVfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQnKTtcblxuZXhwb3J0IGNsYXNzIE1jVHJlZU9wdGlvbkNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUcmVlT3B0aW9uLCBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSkge31cbn1cblxubGV0IHVuaXF1ZUlkQ291bnRlcjogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLW9wdGlvbicsXG4gICAgZXhwb3J0QXM6ICdtY1RyZWVPcHRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90cmVlLW9wdGlvbi5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90cmVlLW9wdGlvbi5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXRyZWUtb3B0aW9uJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWZvY3VzZWRdJzogJ2hhc0ZvY3VzJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1hY3Rpb24tYnV0dG9uLWZvY3VzZWRdJzogJ2FjdGlvbkJ1dHRvbj8uYWN0aXZlJyxcblxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICctMScsXG4gICAgICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG5cbiAgICAgICAgJyhmb2N1c2luKSc6ICdmb2N1cygpJyxcbiAgICAgICAgJyhibHVyKSc6ICdibHVyKCknLFxuXG4gICAgICAgICcoY2xpY2spJzogJ3NlbGVjdFZpYUludGVyYWN0aW9uKCRldmVudCknLFxuICAgICAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNY1RyZWVOb2RlLCB1c2VFeGlzdGluZzogTWNUcmVlT3B0aW9uIH0sXG4gICAgICAgIHsgcHJvdmlkZTogTUNfT1BUSU9OX0FDVElPTl9QQVJFTlQsIHVzZUV4aXN0aW5nOiBNY1RyZWVPcHRpb24gfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlT3B0aW9uIGV4dGVuZHMgTWNUcmVlTm9kZTxNY1RyZWVPcHRpb24+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgcmVhZG9ubHkgb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE1jVHJlZU9wdGlvbkV2ZW50PigpO1xuXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNUcmVlT3B0aW9uRXZlbnQ+KCk7XG5cbiAgICBAQ29udGVudENoaWxkKCdtY1RyZWVOb2RlVG9nZ2xlJykgdG9nZ2xlRWxlbWVudDogTWNUcmVlTm9kZVRvZ2dsZUJhc2VEaXJlY3RpdmU8TWNUcmVlT3B0aW9uPjtcblxuICAgIEBDb250ZW50Q2hpbGQoTWNQc2V1ZG9DaGVja2JveCkgcHNldWRvQ2hlY2tib3g6IE1jUHNldWRvQ2hlY2tib3g7XG4gICAgQENvbnRlbnRDaGlsZChNY09wdGlvbkFjdGlvbkNvbXBvbmVudCkgYWN0aW9uQnV0dG9uOiBNY09wdGlvbkFjdGlvbkNvbXBvbmVudDtcbiAgICBAQ29udGVudENoaWxkKE1jVG9vbHRpcFRyaWdnZXIpIHRvb2x0aXBUcmlnZ2VyOiBNY1Rvb2x0aXBUcmlnZ2VyO1xuICAgIEBDb250ZW50Q2hpbGQoTWNEcm9wZG93blRyaWdnZXIpIGRyb3Bkb3duVHJpZ2dlcjogTWNEcm9wZG93blRyaWdnZXI7XG5cbiAgICBnZXQgZXh0ZXJuYWxQc2V1ZG9DaGVja2JveCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wc2V1ZG9DaGVja2JveDtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgdGhpcy50cmVlIS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzaG93Q2hlY2tib3goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93Q2hlY2tib3ggIT09IHVuZGVmaW5lZCA/IHRoaXMuX3Nob3dDaGVja2JveCA6IHRoaXMudHJlZS5zaG93Q2hlY2tib3g7XG4gICAgfVxuXG4gICAgc2V0IHNob3dDaGVja2JveCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3Nob3dDaGVja2JveCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd0NoZWNrYm94OiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IG9uU2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNY1RyZWVPcHRpb25DaGFuZ2U+KCk7XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkKGlzU2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaWQgPSBgbWMtdHJlZS1vcHRpb24tJHt1bmlxdWVJZENvdW50ZXIrK31gO1xuXG4gICAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICAvLyBUT0RPOiBBZGQgaW5wdXQgcHJvcGVydHkgYWx0ZXJuYXRpdmUgZm9yIG5vZGUgZW52cy5cbiAgICAgICAgcmV0dXJuICh0aGlzLmdldEhvc3RFbGVtZW50KCkudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgICB9XG5cbiAgICBoYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGlzRXhwYW5kYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnRvZ2dsZUVsZW1lbnQ/LmRpc2FibGVkICYmIHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGFibGUodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCkgcHVibGljIHRyZWU6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCB0cmVlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0VmFsdWUodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IHNlbGVjdGVkIHx8ICF0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcy5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBmb2N1cyhmb2N1c09yaWdpbj86IEZvY3VzT3JpZ2luKSB7XG4gICAgICAgIGlmIChmb2N1c09yaWdpbiA9PT0gJ3Byb2dyYW0nKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaGFzRm9jdXMgfHwgdGhpcy5hY3Rpb25CdXR0b24/Lmhhc0ZvY3VzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIG9wdGlvbiBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIHRyZWVcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBvcHRpb25cbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uQnV0dG9uPy5oYXNGb2N1cykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQmx1ci5uZXh0KHsgb3B0aW9uOiB0aGlzIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNsaWVudFJlY3RzID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKTtcblxuICAgICAgICBpZiAoY2xpZW50UmVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xpZW50UmVjdHNbMF0uaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgc2VsZWN0KHNldEZvY3VzID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChzZXRGb2N1cyAmJiAhdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoKTtcbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duKCRldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uQnV0dG9uKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICgkZXZlbnQua2V5Q29kZSA9PT0gVEFCICYmICEkZXZlbnQuc2hpZnRLZXkgJiYgIXRoaXMuYWN0aW9uQnV0dG9uLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbkJ1dHRvbi5mb2N1cygpO1xuXG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFZpYUludGVyYWN0aW9uKCRldmVudD86IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQodHJ1ZSk7XG5cbiAgICAgICAgY29uc3Qgc2hpZnRLZXkgPSAkZXZlbnQgPyBoYXNNb2RpZmllcktleSgkZXZlbnQsICdzaGlmdEtleScpIDogZmFsc2U7XG4gICAgICAgIGNvbnN0IGN0cmxLZXkgPSAkZXZlbnQgPyBoYXNNb2RpZmllcktleSgkZXZlbnQsICdjdHJsS2V5JykgOiBmYWxzZTtcblxuICAgICAgICB0aGlzLnRyZWUuc2V0U2VsZWN0ZWRPcHRpb25zQnlDbGljayh0aGlzLCBzaGlmdEtleSwgY3RybEtleSk7XG4gICAgfVxuXG4gICAgZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KGlzVXNlcklucHV0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVPcHRpb25DaGFuZ2UodGhpcywgaXNVc2VySW5wdXQpKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIiwiPG5nLWNvbnRlbnQgc2VsZWN0PVwibWMtdHJlZS1ub2RlLXRvZ2dsZSwgW21jLXRyZWUtbm9kZS10b2dnbGVdLCBbbWNUcmVlTm9kZVRvZ2dsZV1cIj48L25nLWNvbnRlbnQ+XG5cbjxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cImV4dGVybmFsUHNldWRvQ2hlY2tib3hcIj5cbiAgICA8bmctY29udGVudCAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIHNlbGVjdD1cIm1jLXBzZXVkby1jaGVja2JveFwiPjwvbmctY29udGVudD5cblxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgICAgIDxtYy1wc2V1ZG8tY2hlY2tib3hcbiAgICAgICAgICAgICpuZ0lmPVwic2hvd0NoZWNrYm94XCJcbiAgICAgICAgICAgIFtzdGF0ZV09XCJzZWxlY3RlZCA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICA8L21jLXBzZXVkby1jaGVja2JveD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctY29udGFpbmVyPlxuXG48bmctY29udGVudCBzZWxlY3Q9XCJtYy1jaGVja2JveFwiPjwvbmctY29udGVudD5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLWljb25dXCI+PC9uZy1jb250ZW50PlxuXG48bmctY29udGVudCBzZWxlY3Q9XCJtYy1wcm9ncmVzcy1zcGlubmVyXCI+PC9uZy1jb250ZW50PlxuXG48c3BhbiBjbGFzcz1cIm1jLW9wdGlvbi10ZXh0IG1jLW5vLXNlbGVjdFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1jLW9wdGlvbi1hY3Rpb25cIj48L25nLWNvbnRlbnQ+XG5cbjxkaXYgY2xhc3M9XCJtYy1vcHRpb24tb3ZlcmxheVwiPjwvZGl2PlxuIl19
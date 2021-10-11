import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ElementRef, Inject, InjectionToken, ChangeDetectionStrategy, ViewEncapsulation, NgZone } from '@angular/core';
import { hasModifierKey } from '@ptsecurity/cdk/keycodes';
import { CdkTreeNode } from '@ptsecurity/cdk/tree';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
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
export class McTreeOption extends CdkTreeNode {
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
        return this._disabled || (this.tree && this.tree.disabled);
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
    get multiple() {
        return this.tree.multiple;
    }
    get viewValue() {
        // TODO: Add input property alternative for node envs.
        return (this.getHostElement().textContent || '').trim();
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
        if (this.disabled || this.hasFocus) {
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
                this.hasFocus = false;
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
        }
    }
    selectViaInteraction($event) {
        if (!this.disabled) {
            this.changeDetectorRef.markForCheck();
            this.emitSelectionChangeEvent(true);
            const shiftKey = $event ? hasModifierKey($event, 'shiftKey') : false;
            const ctrlKey = $event ? hasModifierKey($event, 'ctrlKey') : false;
            this.tree.setSelectedOptionsByClick(this, shiftKey, ctrlKey);
        }
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
/** @nocollapse */ McTreeOption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.5", type: McTreeOption, selector: "mc-tree-option", inputs: { disabled: "disabled", showCheckbox: "showCheckbox" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "focusin": "focus()", "blur": "blur()", "click": "selectViaInteraction($event)" }, properties: { "attr.id": "id", "attr.tabindex": "-1", "attr.disabled": "disabled || null", "class.mc-selected": "selected", "class.mc-focused": "hasFocus" }, classAttribute: "mc-tree-option" }, providers: [{ provide: CdkTreeNode, useExisting: McTreeOption }], exportAs: ["mcTreeOption"], usesInheritance: true, ngImport: i0, template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n", components: [{ type: i1.McPseudoCheckbox, selector: "mc-pseudo-checkbox", inputs: ["state", "disabled"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeOption, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-tree-option',
                    exportAs: 'mcTreeOption',
                    templateUrl: './tree-option.html',
                    host: {
                        '[attr.id]': 'id',
                        '[attr.tabindex]': '-1',
                        '[attr.disabled]': 'disabled || null',
                        class: 'mc-tree-option',
                        '[class.mc-selected]': 'selected',
                        '[class.mc-focused]': 'hasFocus',
                        '(focusin)': 'focus()',
                        '(blur)': 'blur()',
                        '(click)': 'selectViaInteraction($event)'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: CdkTreeNode, useExisting: McTreeOption }]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_TREE_OPTION_PARENT_COMPONENT]
                }] }]; }, propDecorators: { disabled: [{
                type: Input
            }], showCheckbox: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBUXRDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsSUFBSSxjQUFjLENBQU0saUNBQWlDLENBQUMsQ0FBQztBQUUxRyxNQUFNLE9BQU8sa0JBQWtCO0lBQzNCLFlBQW1CLE1BQW9CLEVBQVMsY0FBYyxLQUFLO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQWM7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtJQUFHLENBQUM7Q0FDMUU7QUFFRCxJQUFJLGVBQWUsR0FBVyxDQUFDLENBQUM7QUF5QmhDLE1BQU0sT0FBTyxZQUFhLFNBQVEsV0FBeUI7SUEwRXZELFlBQ0ksVUFBc0IsRUFDZCxpQkFBb0MsRUFDcEMsTUFBYyxFQUMwQixJQUFTO1FBRXpELEtB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QUFpQixDQUFDLElBQUk7b0JBQ3JDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLGNBQWMsRUFBRSxDQUFDO2lCQUNuRTs7MEJBK0VRLE1BQU07MkJBQUMsK0JBQStCOzRDQTlEdkMsUUFBUTtzQkFEWCxLQUFLO2dCQWdCRixZQUFZO3NCQURmLEtBQUs7Z0JBV2EsaUJBQWlCO3NCQUFuQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENka1RyZWVOb2RlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jVHJlZU9wdGlvbkV2ZW50IHtcbiAgICBvcHRpb246IE1jVHJlZU9wdGlvbjtcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBwYXJlbnQgY29tcG9uZW50IHRvIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19UUkVFX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ01DX1RSRUVfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQnKTtcblxuZXhwb3J0IGNsYXNzIE1jVHJlZU9wdGlvbkNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUcmVlT3B0aW9uLCBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSkge31cbn1cblxubGV0IHVuaXF1ZUlkQ291bnRlcjogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLW9wdGlvbicsXG4gICAgZXhwb3J0QXM6ICdtY1RyZWVPcHRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90cmVlLW9wdGlvbi5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJy0xJyxcblxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1vcHRpb24nLFxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnaGFzRm9jdXMnLFxuXG4gICAgICAgICcoZm9jdXNpbiknOiAnZm9jdXMoKScsXG4gICAgICAgICcoYmx1ciknOiAnYmx1cigpJyxcblxuICAgICAgICAnKGNsaWNrKSc6ICdzZWxlY3RWaWFJbnRlcmFjdGlvbigkZXZlbnQpJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlLCB1c2VFeGlzdGluZzogTWNUcmVlT3B0aW9uIH1dXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU9wdGlvbiBleHRlbmRzIENka1RyZWVOb2RlPE1jVHJlZU9wdGlvbj4gaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBBZnRlckNvbnRlbnRJbml0IHtcbiAgICByZWFkb25seSBvbkZvY3VzID0gbmV3IFN1YmplY3Q8TWNUcmVlT3B0aW9uRXZlbnQ+KCk7XG5cbiAgICByZWFkb25seSBvbkJsdXIgPSBuZXcgU3ViamVjdDxNY1RyZWVPcHRpb25FdmVudD4oKTtcblxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCAodGhpcy50cmVlICYmIHRoaXMudHJlZS5kaXNhYmxlZCk7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc2hvd0NoZWNrYm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0NoZWNrYm94ICE9PSB1bmRlZmluZWQgPyB0aGlzLl9zaG93Q2hlY2tib3ggOiB0aGlzLnRyZWUuc2hvd0NoZWNrYm94O1xuICAgIH1cblxuICAgIHNldCBzaG93Q2hlY2tib3godmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9zaG93Q2hlY2tib3ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dDaGVja2JveDogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBvblNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWNUcmVlT3B0aW9uQ2hhbmdlPigpO1xuXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgICAgIGlmIChpc1NlbGVjdGVkICE9PSB0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZChpc1NlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkID0gYG1jLXRyZWUtb3B0aW9uLSR7dW5pcXVlSWRDb3VudGVyKyt9YDtcblxuICAgIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZS5tdWx0aXBsZTtcbiAgICB9XG5cbiAgICBnZXQgdmlld1ZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBpbnB1dCBwcm9wZXJ0eSBhbHRlcm5hdGl2ZSBmb3Igbm9kZSBlbnZzLlxuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0SG9zdEVsZW1lbnQoKS50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICAgIH1cblxuICAgIGhhc0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIEBJbmplY3QoTUNfVFJFRV9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVCkgcHVibGljIHRyZWU6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCB0cmVlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0VmFsdWUodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IHNlbGVjdGVkIHx8ICF0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbC5zZWxlY3QodGhpcy5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdCh0aGlzLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBmb2N1cyhmb2N1c09yaWdpbj86IEZvY3VzT3JpZ2luKSB7XG4gICAgICAgIGlmIChmb2N1c09yaWdpbiA9PT0gJ3Byb2dyYW0nKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuaGFzRm9jdXMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICB0aGlzLm9uRm9jdXMubmV4dCh7IG9wdGlvbjogdGhpcyB9KTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBibHVyKCk6IHZvaWQge1xuICAgICAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgb3B0aW9uIGZyb20gdGhlIERPTSBhIGxpdHRsZVxuICAgICAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgdHJlZVxuICAgICAgICAvLyB0aGF0IG1vdmVzIGZvY3VzIG5vdCB0aGUgbmV4dCBpdGVtLiBUbyB3b3JrIGFyb3VuZCB0aGUgaXNzdWUsIHdlIGRlZmVyIG1hcmtpbmcgdGhlIG9wdGlvblxuICAgICAgICAvLyBhcyBub3QgZm9jdXNlZCB1bnRpbCB0aGUgbmV4dCB0aW1lIHRoZSB6b25lIHN0YWJpbGl6ZXMuXG4gICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkJsdXIubmV4dCh7IG9wdGlvbjogdGhpcyB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBjbGllbnRSZWN0cyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldENsaWVudFJlY3RzKCk7XG5cbiAgICAgICAgaWYgKGNsaWVudFJlY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsaWVudFJlY3RzWzBdLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RWaWFJbnRlcmFjdGlvbigkZXZlbnQ/OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KHRydWUpO1xuXG4gICAgICAgICAgICBjb25zdCBzaGlmdEtleSA9ICRldmVudCA/IGhhc01vZGlmaWVyS2V5KCRldmVudCwgJ3NoaWZ0S2V5JykgOiBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGN0cmxLZXkgPSAkZXZlbnQgPyBoYXNNb2RpZmllcktleSgkZXZlbnQsICdjdHJsS2V5JykgOiBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLnNldFNlbGVjdGVkT3B0aW9uc0J5Q2xpY2sodGhpcywgc2hpZnRLZXksIGN0cmxLZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KGlzVXNlcklucHV0ID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KG5ldyBNY1RyZWVPcHRpb25DaGFuZ2UodGhpcywgaXNVc2VySW5wdXQpKTtcbiAgICB9XG5cbiAgICBnZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIiwiPG5nLWNvbnRlbnQgc2VsZWN0PVwiW21jLWljb25dXCI+PC9uZy1jb250ZW50PlxuXG48bmctY29udGVudCBzZWxlY3Q9XCJtYy10cmVlLW5vZGUtdG9nZ2xlXCI+PC9uZy1jb250ZW50PlxuXG48bWMtcHNldWRvLWNoZWNrYm94XG4gICAgKm5nSWY9XCJzaG93Q2hlY2tib3hcIlxuICAgIFtzdGF0ZV09XCJzZWxlY3RlZCA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnXCJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbjwvbWMtcHNldWRvLWNoZWNrYm94PlxuXG48c3BhbiBjbGFzcz1cIm1jLW9wdGlvbi10ZXh0IG1jLW5vLXNlbGVjdFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG5cbjxkaXYgY2xhc3M9XCJtYy1vcHRpb24tb3ZlcmxheVwiPjwvZGl2PlxuIl19
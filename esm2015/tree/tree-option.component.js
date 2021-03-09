import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ElementRef, Inject, InjectionToken, ChangeDetectionStrategy, ViewEncapsulation, NgZone } from '@angular/core';
import { hasModifierKey } from '@ptsecurity/cdk/keycodes';
import { CdkTreeNode } from '@ptsecurity/cdk/tree';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
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
McTreeOption.decorators = [
    { type: Component, args: [{
                selector: 'mc-tree-option',
                exportAs: 'mcTreeOption',
                template: "<ng-content select=\"[mc-icon]\"></ng-content>\n\n<ng-content select=\"mc-tree-node-toggle\"></ng-content>\n\n<mc-pseudo-checkbox\n    *ngIf=\"showCheckbox\"\n    [state]=\"selected ? 'checked' : 'unchecked'\"\n    [disabled]=\"disabled\">\n</mc-pseudo-checkbox>\n\n<span class=\"mc-option-text mc-no-select\"><ng-content></ng-content></span>\n\n<div class=\"mc-option-overlay\"></div>\n",
                host: {
                    '[attr.id]': 'id',
                    '[attr.tabindex]': '-1',
                    '[attr.disabled]': 'disabled || null',
                    class: 'mc-tree-option',
                    '[class.mc-selected]': 'selected',
                    '[class.mc-focused]': 'hasFocus',
                    '(focus)': 'focus()',
                    '(blur)': 'blur()',
                    '(click)': 'selectViaInteraction($event)'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [{ provide: CdkTreeNode, useExisting: McTreeOption }]
            },] }
];
/** @nocollapse */
McTreeOption.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [MC_TREE_OPTION_PARENT_COMPONENT,] }] }
];
McTreeOption.propDecorators = {
    disabled: [{ type: Input }],
    showCheckbox: [{ type: Input }],
    onSelectionChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1vcHRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL3RyZWUvdHJlZS1vcHRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixNQUFNLEVBQ04sY0FBYyxFQUNkLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRdEM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FBRyxJQUFJLGNBQWMsQ0FBTSxpQ0FBaUMsQ0FBQyxDQUFDO0FBRTFHLE1BQU0sT0FBTyxrQkFBa0I7SUFDM0IsWUFBbUIsTUFBb0IsRUFBUyxjQUFjLEtBQUs7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUcsQ0FBQztDQUMxRTtBQUVELElBQUksZUFBZSxHQUFXLENBQUMsQ0FBQztBQXlCaEMsTUFBTSxPQUFPLFlBQWEsU0FBUSxXQUF5QjtJQTBFdkQsWUFDSSxVQUFzQixFQUNkLGlCQUFvQyxFQUNwQyxNQUFjLEVBQzBCLElBQVM7UUFFekQsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUpoQixzQkFBaUIsR0FBakIsaUJB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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENka1RyZWVOb2RlIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIE1jVHJlZU9wdGlvbkV2ZW50IHtcbiAgICBvcHRpb246IE1jVHJlZU9wdGlvbjtcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBwYXJlbnQgY29tcG9uZW50IHRvIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBNQ19UUkVFX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ01DX1RSRUVfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQnKTtcblxuZXhwb3J0IGNsYXNzIE1jVHJlZU9wdGlvbkNoYW5nZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWNUcmVlT3B0aW9uLCBwdWJsaWMgaXNVc2VySW5wdXQgPSBmYWxzZSkge31cbn1cblxubGV0IHVuaXF1ZUlkQ291bnRlcjogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy10cmVlLW9wdGlvbicsXG4gICAgZXhwb3J0QXM6ICdtY1RyZWVPcHRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90cmVlLW9wdGlvbi5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJy0xJyxcblxuICAgICAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuXG4gICAgICAgIGNsYXNzOiAnbWMtdHJlZS1vcHRpb24nLFxuICAgICAgICAnW2NsYXNzLm1jLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbY2xhc3MubWMtZm9jdXNlZF0nOiAnaGFzRm9jdXMnLFxuXG4gICAgICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICAgICAnKGJsdXIpJzogJ2JsdXIoKScsXG5cbiAgICAgICAgJyhjbGljayknOiAnc2VsZWN0VmlhSW50ZXJhY3Rpb24oJGV2ZW50KSdcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtUcmVlTm9kZSwgdXNlRXhpc3Rpbmc6IE1jVHJlZU9wdGlvbiB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVPcHRpb24gZXh0ZW5kcyBDZGtUcmVlTm9kZTxNY1RyZWVPcHRpb24+IGltcGxlbWVudHMgQ2FuRGlzYWJsZSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgcmVhZG9ubHkgb25Gb2N1cyA9IG5ldyBTdWJqZWN0PE1jVHJlZU9wdGlvbkV2ZW50PigpO1xuXG4gICAgcmVhZG9ubHkgb25CbHVyID0gbmV3IFN1YmplY3Q8TWNUcmVlT3B0aW9uRXZlbnQ+KCk7XG5cbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgKHRoaXMudHJlZSAmJiB0aGlzLnRyZWUuZGlzYWJsZWQpO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNob3dDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dDaGVja2JveCAhPT0gdW5kZWZpbmVkID8gdGhpcy5fc2hvd0NoZWNrYm94IDogdGhpcy50cmVlLnNob3dDaGVja2JveDtcbiAgICB9XG5cbiAgICBzZXQgc2hvd0NoZWNrYm94KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fc2hvd0NoZWNrYm94ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93Q2hlY2tib3g6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgb25TZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1jVHJlZU9wdGlvbkNoYW5nZT4oKTtcblxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgICAgICBpZiAoaXNTZWxlY3RlZCAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWQoaXNTZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZCA9IGBtYy10cmVlLW9wdGlvbi0ke3VuaXF1ZUlkQ291bnRlcisrfWA7XG5cbiAgICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUubXVsdGlwbGU7XG4gICAgfVxuXG4gICAgZ2V0IHZpZXdWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICAvLyBUT0RPOiBBZGQgaW5wdXQgcHJvcGVydHkgYWx0ZXJuYXRpdmUgZm9yIG5vZGUgZW52cy5cbiAgICAgICAgcmV0dXJuICh0aGlzLmdldEhvc3RFbGVtZW50KCkudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgICB9XG5cbiAgICBoYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBASW5qZWN0KE1DX1RSRUVfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQpIHB1YmxpYyB0cmVlOiBhbnlcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgdHJlZSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy50cmVlLnRyZWVDb250cm9sLmdldFZhbHVlKHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkID09PSBzZWxlY3RlZCB8fCAhdGhpcy50cmVlLnNlbGVjdGlvbk1vZGVsKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KHRoaXMuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3QodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoZm9jdXNPcmlnaW4/OiBGb2N1c09yaWdpbikge1xuICAgICAgICBpZiAoZm9jdXNPcmlnaW4gPT09ICdwcm9ncmFtJykgeyByZXR1cm47IH1cblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmhhc0ZvY3VzKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5vbkZvY3VzLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmx1cigpOiB2b2lkIHtcbiAgICAgICAgLy8gV2hlbiBhbmltYXRpb25zIGFyZSBlbmFibGVkLCBBbmd1bGFyIG1heSBlbmQgdXAgcmVtb3ZpbmcgdGhlIG9wdGlvbiBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAgICAgLy8gZWFybGllciB0aGFuIHVzdWFsLCBjYXVzaW5nIGl0IHRvIGJlIGJsdXJyZWQgYW5kIHRocm93aW5nIG9mZiB0aGUgbG9naWMgaW4gdGhlIHRyZWVcbiAgICAgICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBvcHRpb25cbiAgICAgICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25CbHVyLm5leHQoeyBvcHRpb246IHRoaXMgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY2xpZW50UmVjdHMgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRDbGllbnRSZWN0cygpO1xuXG4gICAgICAgIGlmIChjbGllbnRSZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGllbnRSZWN0c1swXS5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBzZWxlY3QoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oJGV2ZW50PzogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCh0cnVlKTtcblxuICAgICAgICAgICAgY29uc3Qgc2hpZnRLZXkgPSAkZXZlbnQgPyBoYXNNb2RpZmllcktleSgkZXZlbnQsICdzaGlmdEtleScpIDogZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBjdHJsS2V5ID0gJGV2ZW50ID8gaGFzTW9kaWZpZXJLZXkoJGV2ZW50LCAnY3RybEtleScpIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMudHJlZS5zZXRTZWxlY3RlZE9wdGlvbnNCeUNsaWNrKHRoaXMsIHNoaWZ0S2V5LCBjdHJsS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudChpc1VzZXJJbnB1dCA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTWNUcmVlT3B0aW9uQ2hhbmdlKHRoaXMsIGlzVXNlcklucHV0KSk7XG4gICAgfVxuXG4gICAgZ2V0SG9zdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbWFya0ZvckNoZWNrKCkge1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbn1cbiJdfQ==
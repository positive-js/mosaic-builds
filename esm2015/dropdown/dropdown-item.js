import { FocusMonitor } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, Inject, Optional, Input, ViewChild } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';
import { Subject } from 'rxjs';
import { MC_DROPDOWN_PANEL } from './dropdown-panel';
// Boilerplate for applying mixins to McDropdownItem.
/** @docs-private */
export class McDropdownItemBase {
}
// tslint:disable-next-line:naming-convention
export const McDropdownItemMixinBase = mixinTabIndex(mixinDisabled(McDropdownItemBase));
/**
 * This directive is intended to be used inside an mc-dropdown tag.
 * It exists mostly to set the role attribute.
 */
export class McDropdownItem extends McDropdownItemMixinBase {
    constructor(_elementRef, _focusMonitor, document, _parentDropdownPanel) {
        super();
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.document = document;
        this._parentDropdownPanel = _parentDropdownPanel;
        /** ARIA role for the dropdown item. */
        this.role = 'menuitem';
        /** Stream that emits when the dropdown item is hovered. */
        this.hovered = new Subject();
        /** Whether the dropdown item is highlighted. */
        this.highlighted = false;
        /** Whether the dropdown item acts as a trigger for a nested dropdown. */
        this.triggersNestedDropdown = false;
        if (_focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for dropdown items only when the focus was not caused by a
            // mouse or touch interaction.
            _focusMonitor.monitor(this._elementRef.nativeElement, false);
        }
        if (_parentDropdownPanel && _parentDropdownPanel.addItem) {
            _parentDropdownPanel.addItem(this);
        }
    }
    /** Focuses the dropdown item. */
    focus(origin = 'program') {
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this.getHostElement(), origin);
        }
        else {
            this.getHostElement().focus();
        }
    }
    ngOnDestroy() {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
        if (this._parentDropdownPanel && this._parentDropdownPanel.removeItem) {
            this._parentDropdownPanel.removeItem(this);
        }
        this.hovered.complete();
    }
    /** Returns the host DOM element. */
    getHostElement() {
        return this._elementRef.nativeElement;
    }
    /** Prevents the default element actions if it is disabled. */
    haltDisabledEvents(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /** Emits to the hover stream. */
    handleMouseEnter() {
        this.hovered.next(this);
    }
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel() {
        const element = this.content.nativeElement;
        // tslint:disable-next-line:no-magic-numbers
        const textNodeType = this.document ? this.document.TEXT_NODE : 3;
        let output = '';
        if (element.childNodes) {
            const length = element.childNodes.length;
            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (let i = 0; i < length; i++) {
                if (element.childNodes[i].nodeType === textNodeType) {
                    output += element.childNodes[i].textContent;
                }
            }
        }
        return output.trim();
    }
}
McDropdownItem.decorators = [
    { type: Component, args: [{
                selector: 'mc-dropdown-item, [mc-dropdown-item]',
                exportAs: 'mcDropdownItem',
                inputs: ['disabled', 'tabIndex'],
                host: {
                    class: 'mc-dropdown__item',
                    '[class.mc-dropdown__item_highlighted]': 'highlighted',
                    '[class.mc-disabled]': 'disabled',
                    '[attr.role]': 'role',
                    '[attr.tabindex]': 'tabIndex',
                    '(click)': 'haltDisabledEvents($event)',
                    '(mouseenter)': 'handleMouseEnter()'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
        <div #content>
            <ng-content></ng-content>
        </div>
        <i *ngIf="triggersNestedDropdown" mc-icon="mc-angle-right-M_16" class="mc-dropdown__trigger"></i>
    `
            },] }
];
/** @nocollapse */
McDropdownItem.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_DROPDOWN_PANEL,] }] }
];
McDropdownItem.propDecorators = {
    role: [{ type: Input }],
    content: [{ type: ViewChild, args: ['content', { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9kcm9wZG93bi9kcm9wZG93bi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUVWLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUErQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sa0JBQWtCLENBQUM7QUFHdEUscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixNQUFNLE9BQU8sa0JBQWtCO0NBQUc7QUFDbEMsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUMrQixhQUFhLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUVwSDs7O0dBR0c7QUF1QkgsTUFBTSxPQUFPLGNBQWUsU0FBUSx1QkFBdUI7SUFnQnZELFlBQ1ksV0FBb0MsRUFDcEMsYUFBMkIsRUFDVCxRQUFhLEVBQ1Esb0JBQXNEO1FBRXJHLEtBQUssRUFBRSxDQUFDO1FBTEEsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQ1QsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUNRLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBa0M7UUFsQnpHLHVDQUF1QztRQUM5QixTQUFJLEdBQXNELFVBQVUsQ0FB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UyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7Z0JBQ2hDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQix1Q0FBdUMsRUFBRSxhQUFhO29CQUN0RCxxQkFBcUIsRUFBRSxVQUFVO29CQUNqQyxhQUFhLEVBQUUsTUFBTTtvQkFDckIsaUJBQWlCLEVBQUUsVUFBVTtvQkFDN0IsU0FBUyxFQUFFLDRCQUE0QjtvQkFDdkMsY0FBYyxFQUFFLG9CQUFvQjtpQkFDdkM7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7O0tBS1Q7YUFDSjs7OztZQS9DRyxVQUFVO1lBTEwsWUFBWTs0Q0F3RVosTUFBTSxTQUFDLFFBQVE7NENBQ2YsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQkFBaUI7OzttQkFqQnhDLEtBQUs7c0JBRUwsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb2N1c01vbml0b3IsIEZvY3VzT3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgSW5qZWN0LFxuICAgIE9wdGlvbmFsLFxuICAgIElucHV0LFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvYTExeSc7XG5pbXBvcnQgeyBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlQ3RvciwgSGFzVGFiSW5kZXhDdG9yLCBtaXhpbkRpc2FibGVkLCBtaXhpblRhYkluZGV4IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNQ19EUk9QRE9XTl9QQU5FTCwgTWNEcm9wZG93blBhbmVsIH0gZnJvbSAnLi9kcm9wZG93bi1wYW5lbCc7XG5cblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNY0Ryb3Bkb3duSXRlbS5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY2xhc3MgTWNEcm9wZG93bkl0ZW1CYXNlIHt9XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBNY0Ryb3Bkb3duSXRlbU1peGluQmFzZTpcbiAgICBIYXNUYWJJbmRleEN0b3IgJiBDYW5EaXNhYmxlQ3RvciAmIHR5cGVvZiBNY0Ryb3Bkb3duSXRlbUJhc2UgPSBtaXhpblRhYkluZGV4KG1peGluRGlzYWJsZWQoTWNEcm9wZG93bkl0ZW1CYXNlKSk7XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBpbnNpZGUgYW4gbWMtZHJvcGRvd24gdGFnLlxuICogSXQgZXhpc3RzIG1vc3RseSB0byBzZXQgdGhlIHJvbGUgYXR0cmlidXRlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21jLWRyb3Bkb3duLWl0ZW0sIFttYy1kcm9wZG93bi1pdGVtXScsXG4gICAgZXhwb3J0QXM6ICdtY0Ryb3Bkb3duSXRlbScsXG4gICAgaW5wdXRzOiBbJ2Rpc2FibGVkJywgJ3RhYkluZGV4J10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLWRyb3Bkb3duX19pdGVtJyxcbiAgICAgICAgJ1tjbGFzcy5tYy1kcm9wZG93bl9faXRlbV9oaWdobGlnaHRlZF0nOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICAnW2NsYXNzLm1jLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdbYXR0ci5yb2xlXSc6ICdyb2xlJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgICAgICcoY2xpY2spJzogJ2hhbHREaXNhYmxlZEV2ZW50cygkZXZlbnQpJyxcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICdoYW5kbGVNb3VzZUVudGVyKCknXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aSAqbmdJZj1cInRyaWdnZXJzTmVzdGVkRHJvcGRvd25cIiBtYy1pY29uPVwibWMtYW5nbGUtcmlnaHQtTV8xNlwiIGNsYXNzPVwibWMtZHJvcGRvd25fX3RyaWdnZXJcIj48L2k+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNY0Ryb3Bkb3duSXRlbSBleHRlbmRzIE1jRHJvcGRvd25JdGVtTWl4aW5CYXNlIGltcGxlbWVudHMgSUZvY3VzYWJsZU9wdGlvbiwgQ2FuRGlzYWJsZSwgT25EZXN0cm95IHtcblxuICAgIC8qKiBBUklBIHJvbGUgZm9yIHRoZSBkcm9wZG93biBpdGVtLiAqL1xuICAgIEBJbnB1dCgpIHJvbGU6ICdtZW51aXRlbScgfCAnbWVudWl0ZW1yYWRpbycgfCAnbWVudWl0ZW1jaGVja2JveCcgPSAnbWVudWl0ZW0nO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250ZW50O1xuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIGRyb3Bkb3duIGl0ZW0gaXMgaG92ZXJlZC4gKi9cbiAgICByZWFkb25seSBob3ZlcmVkOiBTdWJqZWN0PE1jRHJvcGRvd25JdGVtPiA9IG5ldyBTdWJqZWN0PE1jRHJvcGRvd25JdGVtPigpO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGl0ZW0gaXMgaGlnaGxpZ2h0ZWQuICovXG4gICAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBpdGVtIGFjdHMgYXMgYSB0cmlnZ2VyIGZvciBhIG5lc3RlZCBkcm9wZG93bi4gKi9cbiAgICB0cmlnZ2Vyc05lc3RlZERyb3Bkb3duOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfRFJPUERPV05fUEFORUwpIHByaXZhdGUgX3BhcmVudERyb3Bkb3duUGFuZWw/OiBNY0Ryb3Bkb3duUGFuZWw8TWNEcm9wZG93bkl0ZW0+XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKF9mb2N1c01vbml0b3IpIHtcbiAgICAgICAgICAgIC8vIFN0YXJ0IG1vbml0b3JpbmcgdGhlIGVsZW1lbnQgc28gaXQgZ2V0cyB0aGUgYXBwcm9wcmlhdGUgZm9jdXNlZCBjbGFzc2VzLiBXZSB3YW50XG4gICAgICAgICAgICAvLyB0byBzaG93IHRoZSBmb2N1cyBzdHlsZSBmb3IgZHJvcGRvd24gaXRlbXMgb25seSB3aGVuIHRoZSBmb2N1cyB3YXMgbm90IGNhdXNlZCBieSBhXG4gICAgICAgICAgICAvLyBtb3VzZSBvciB0b3VjaCBpbnRlcmFjdGlvbi5cbiAgICAgICAgICAgIF9mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfcGFyZW50RHJvcGRvd25QYW5lbCAmJiBfcGFyZW50RHJvcGRvd25QYW5lbC5hZGRJdGVtKSB7XG4gICAgICAgICAgICBfcGFyZW50RHJvcGRvd25QYW5lbC5hZGRJdGVtKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGRyb3Bkb3duIGl0ZW0uICovXG4gICAgZm9jdXMob3JpZ2luOiBGb2N1c09yaWdpbiA9ICdwcm9ncmFtJyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNNb25pdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5nZXRIb3N0RWxlbWVudCgpLCBvcmlnaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRIb3N0RWxlbWVudCgpLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzTW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGFyZW50RHJvcGRvd25QYW5lbCAmJiB0aGlzLl9wYXJlbnREcm9wZG93blBhbmVsLnJlbW92ZUl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudERyb3Bkb3duUGFuZWwucmVtb3ZlSXRlbSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaG92ZXJlZC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSBob3N0IERPTSBlbGVtZW50LiAqL1xuICAgIGdldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKiogUHJldmVudHMgdGhlIGRlZmF1bHQgZWxlbWVudCBhY3Rpb25zIGlmIGl0IGlzIGRpc2FibGVkLiAqL1xuICAgIGhhbHREaXNhYmxlZEV2ZW50cyhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEVtaXRzIHRvIHRoZSBob3ZlciBzdHJlYW0uICovXG4gICAgaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICAgICAgdGhpcy5ob3ZlcmVkLm5leHQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIEdldHMgdGhlIGxhYmVsIHRvIGJlIHVzZWQgd2hlbiBkZXRlcm1pbmluZyB3aGV0aGVyIHRoZSBvcHRpb24gc2hvdWxkIGJlIGZvY3VzZWQuICovXG4gICAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW1hZ2ljLW51bWJlcnNcbiAgICAgICAgY29uc3QgdGV4dE5vZGVUeXBlID0gdGhpcy5kb2N1bWVudCA/IHRoaXMuZG9jdW1lbnQuVEVYVF9OT0RFIDogMztcbiAgICAgICAgbGV0IG91dHB1dCA9ICcnO1xuXG4gICAgICAgIGlmIChlbGVtZW50LmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIEdvIHRocm91Z2ggYWxsIHRoZSB0b3AtbGV2ZWwgdGV4dCBub2RlcyBhbmQgZXh0cmFjdCB0aGVpciB0ZXh0LlxuICAgICAgICAgICAgLy8gV2Ugc2tpcCBhbnl0aGluZyB0aGF0J3Mgbm90IGEgdGV4dCBub2RlIHRvIHByZXZlbnQgdGhlIHRleHQgZnJvbVxuICAgICAgICAgICAgLy8gYmVpbmcgdGhyb3duIG9mZiBieSBzb21ldGhpbmcgbGlrZSBhbiBpY29uLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT09IHRleHROb2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZWxlbWVudC5jaGlsZE5vZGVzW2ldLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXRwdXQudHJpbSgpO1xuICAgIH1cbn1cbiJdfQ==
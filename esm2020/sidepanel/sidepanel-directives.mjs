import { Component, Directive, ElementRef, Input, Optional } from '@angular/core';
import { ThemePalette } from '@ptsecurity/mosaic/core';
import { McSidepanelRef } from './sidepanel-ref';
import { McSidepanelService } from './sidepanel.service';
import * as i0 from "@angular/core";
import * as i1 from "./sidepanel-ref";
import * as i2 from "./sidepanel.service";
import * as i3 from "@ptsecurity/mosaic/icon";
import * as i4 from "@angular/common";
/**
 * Button that will close the current sidepanel.
 */
export class McSidepanelClose {
    constructor(sidepanelRef, elementRef, sidepanelService) {
        this.sidepanelRef = sidepanelRef;
        this.elementRef = elementRef;
        this.sidepanelService = sidepanelService;
    }
    ngOnInit() {
        if (!this.sidepanelRef) {
            // When this directive is included in a sidepanel via TemplateRef (rather than being
            // in a Component), the SidepanelRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the SidepanelRef by
            // ID.
            // This must occur in `onInit`, as the ID binding for the sidepanel container won't
            // be resolved at constructor time. We use setTimeout by same reason.
            setTimeout(() => {
                this.sidepanelRef = getClosestSidepanel(this.elementRef, this.sidepanelService.openedSidepanels);
            });
        }
    }
    ngOnChanges(changes) {
        const proxiedChange = changes.mcSidepanelClose || changes.sidepanelResult;
        if (proxiedChange) {
            this.sidepanelResult = proxiedChange.currentValue;
        }
    }
}
/** @nocollapse */ /** @nocollapse */ McSidepanelClose.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelClose, deps: [{ token: i1.McSidepanelRef, optional: true }, { token: i0.ElementRef }, { token: i2.McSidepanelService }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSidepanelClose.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McSidepanelClose, selector: "button[mc-sidepanel-close], button[mcSidepanelClose]", inputs: { sidepanelResult: ["mc-sidepanel-close", "sidepanelResult"], mcSidepanelClose: "mcSidepanelClose" }, host: { listeners: { "click": "sidepanelRef.close(sidepanelResult)" }, classAttribute: "mc-sidepanel-close" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelClose, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mc-sidepanel-close], button[mcSidepanelClose]',
                    host: {
                        '(click)': 'sidepanelRef.close(sidepanelResult)',
                        class: 'mc-sidepanel-close'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.McSidepanelRef, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i2.McSidepanelService }]; }, propDecorators: { sidepanelResult: [{
                type: Input,
                args: ['mc-sidepanel-close']
            }], mcSidepanelClose: [{
                type: Input,
                args: ['mcSidepanelClose']
            }] } });
/**
 * Header of a sidepanel.
 */
export class McSidepanelHeader {
    constructor() {
        this.themePalette = ThemePalette;
    }
}
/** @nocollapse */ /** @nocollapse */ McSidepanelHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ /** @nocollapse */ McSidepanelHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: McSidepanelHeader, selector: "mc-sidepanel-header", inputs: { closeable: "closeable" }, host: { classAttribute: "mc-sidepanel-header" }, ngImport: i0, template: `
        <div class="mc-sidepanel-title">
            <ng-content></ng-content>
        </div>
        <button *ngIf="closeable" mc-sidepanel-close>
            <span class="mc-sidepanel-close-x">
                <i mc-icon="mc-close-L_16" class="mc-icon mc-icon_light" [color]="themePalette.Second"></i>
            </span>
        </button>
    `, isInline: true, components: [{ type: i3.McIcon, selector: "[mc-icon]", inputs: ["color"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: McSidepanelClose, selector: "button[mc-sidepanel-close], button[mcSidepanelClose]", inputs: ["mc-sidepanel-close", "mcSidepanelClose"] }, { type: i3.McIconCSSStyler, selector: "[mc-icon]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'mc-sidepanel-header',
                    template: `
        <div class="mc-sidepanel-title">
            <ng-content></ng-content>
        </div>
        <button *ngIf="closeable" mc-sidepanel-close>
            <span class="mc-sidepanel-close-x">
                <i mc-icon="mc-close-L_16" class="mc-icon mc-icon_light" [color]="themePalette.Second"></i>
            </span>
        </button>
    `,
                    host: {
                        class: 'mc-sidepanel-header'
                    }
                }]
        }], propDecorators: { closeable: [{
                type: Input
            }] } });
/**
 * Scrollable content container of a sidepanel.
 */
export class McSidepanelBody {
}
/** @nocollapse */ /** @nocollapse */ McSidepanelBody.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelBody, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSidepanelBody.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McSidepanelBody, selector: "mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody", host: { classAttribute: "mc-sidepanel-body" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelBody, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-sidepanel-body, [mc-sidepanel-body], mcSidepanelBody',
                    host: {
                        class: 'mc-sidepanel-body'
                    }
                }]
        }] });
/**
 * Footer of a sidepanel.
 */
export class McSidepanelFooter {
}
/** @nocollapse */ /** @nocollapse */ McSidepanelFooter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelFooter, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSidepanelFooter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McSidepanelFooter, selector: "mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter", host: { classAttribute: "mc-sidepanel-footer" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelFooter, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-sidepanel-footer, [mc-sidepanel-footer], mcSidepanelFooter',
                    host: {
                        class: 'mc-sidepanel-footer'
                    }
                }]
        }] });
/**
 * Actions block of a sidepanel footer.
 */
export class McSidepanelActions {
}
/** @nocollapse */ /** @nocollapse */ McSidepanelActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McSidepanelActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: McSidepanelActions, selector: "mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions", host: { classAttribute: "mc-sidepanel-actions" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: McSidepanelActions, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mc-sidepanel-actions, [mc-sidepanel-actions], mcSidepanelActions',
                    host: {
                        class: 'mc-sidepanel-actions'
                    }
                }]
        }] });
/**
 * Finds the closest McSidepanelRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a sidepanel.
 * @param openSidepanels References to the currently-open sidepanels.
 */
function getClosestSidepanel(element, openSidepanels) {
    let parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mc-sidepanel-container')) {
        parent = parent.parentElement;
    }
    return parent ? openSidepanels.find((sidepanel) => sidepanel.id === parent.id) : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLWRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvc2lkZXBhbmVsL3NpZGVwYW5lbC1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsUUFBUSxFQUVYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQUd6RDs7R0FFRztBQVFILE1BQU0sT0FBTyxnQkFBZ0I7SUFLekIsWUFDdUIsWUFBNEIsRUFDdkMsVUFBbUMsRUFDbkMsZ0JBQW9DO1FBRnpCLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUN2QyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO0lBQzdDLENBQUM7SUFFSixRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsb0ZBQW9GO1lBQ3BGLG1GQUFtRjtZQUNuRixtRkFBbUY7WUFDbkYsTUFBTTtZQUNOLG1GQUFtRjtZQUNuRixxRUFBcUU7WUFDckUsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFFLENBQUM7WUFDdEcsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFFMUUsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7U0FDckQ7SUFDTCxDQUFDOzttSkEvQlEsZ0JBQWdCO3VJQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFQNUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsc0RBQXNEO29CQUNoRSxJQUFJLEVBQUU7d0JBQ0YsU0FBUyxFQUFFLHFDQUFxQzt3QkFDaEQsS0FBSyxFQUFFLG9CQUFvQjtxQkFDOUI7aUJBQ0o7OzBCQU9RLFFBQVE7c0dBTGdCLGVBQWU7c0JBQTNDLEtBQUs7dUJBQUMsb0JBQW9CO2dCQUVBLGdCQUFnQjtzQkFBMUMsS0FBSzt1QkFBQyxrQkFBa0I7O0FBK0I3Qjs7R0FFRztBQWlCSCxNQUFNLE9BQU8saUJBQWlCO0lBaEI5QjtRQWlCSSxpQkFBWSxHQUFHLFlBQVksQ0FBQztLQUcvQjs7b0pBSlksaUJBQWlCO3dJQUFqQixpQkFBaUIsZ0pBZGhCOzs7Ozs7Ozs7S0FTVCxxTUFoRFEsZ0JBQWdCOzJGQXFEaEIsaUJBQWlCO2tCQWhCN0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7Ozs7Ozs7OztLQVNUO29CQUNELElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUscUJBQXFCO3FCQUMvQjtpQkFDSjs4QkFJWSxTQUFTO3NCQUFqQixLQUFLOztBQUdWOztHQUVHO0FBT0gsTUFBTSxPQUFPLGVBQWU7O2tKQUFmLGVBQWU7c0lBQWYsZUFBZTsyRkFBZixlQUFlO2tCQU4zQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSx5REFBeUQ7b0JBQ25FLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsbUJBQW1CO3FCQUM3QjtpQkFDSjs7QUFHRDs7R0FFRztBQU9ILE1BQU0sT0FBTyxpQkFBaUI7O29KQUFqQixpQkFBaUI7d0lBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQU43QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwrREFBK0Q7b0JBQ3pFLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUscUJBQXFCO3FCQUMvQjtpQkFDSjs7QUFHRDs7R0FFRztBQU9ILE1BQU0sT0FBTyxrQkFBa0I7O3FKQUFsQixrQkFBa0I7eUlBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQU45QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxrRUFBa0U7b0JBQzVFLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsc0JBQXNCO3FCQUNoQztpQkFDSjs7QUFHRDs7OztHQUlHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxPQUFnQyxFQUFFLGNBQWdDO0lBQzNGLElBQUksTUFBTSxHQUF1QixPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUVyRSxPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDbkUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7S0FDakM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxNQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUMzRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1NpZGVwYW5lbFJlZiB9IGZyb20gJy4vc2lkZXBhbmVsLXJlZic7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbFNlcnZpY2UgfSBmcm9tICcuL3NpZGVwYW5lbC5zZXJ2aWNlJztcblxuXG4vKipcbiAqIEJ1dHRvbiB0aGF0IHdpbGwgY2xvc2UgdGhlIGN1cnJlbnQgc2lkZXBhbmVsLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2J1dHRvblttYy1zaWRlcGFuZWwtY2xvc2VdLCBidXR0b25bbWNTaWRlcGFuZWxDbG9zZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhjbGljayknOiAnc2lkZXBhbmVsUmVmLmNsb3NlKHNpZGVwYW5lbFJlc3VsdCknLFxuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1jbG9zZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsQ2xvc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCdtYy1zaWRlcGFuZWwtY2xvc2UnKSBzaWRlcGFuZWxSZXN1bHQ6IGFueTtcblxuICAgIEBJbnB1dCgnbWNTaWRlcGFuZWxDbG9zZScpIG1jU2lkZXBhbmVsQ2xvc2U6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgc2lkZXBhbmVsUmVmOiBNY1NpZGVwYW5lbFJlZixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBzaWRlcGFuZWxTZXJ2aWNlOiBNY1NpZGVwYW5lbFNlcnZpY2VcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNpZGVwYW5lbFJlZikge1xuICAgICAgICAgICAgLy8gV2hlbiB0aGlzIGRpcmVjdGl2ZSBpcyBpbmNsdWRlZCBpbiBhIHNpZGVwYW5lbCB2aWEgVGVtcGxhdGVSZWYgKHJhdGhlciB0aGFuIGJlaW5nXG4gICAgICAgICAgICAvLyBpbiBhIENvbXBvbmVudCksIHRoZSBTaWRlcGFuZWxSZWYgaXNuJ3QgYXZhaWxhYmxlIHZpYSBpbmplY3Rpb24gYmVjYXVzZSBlbWJlZGRlZFxuICAgICAgICAgICAgLy8gdmlld3MgY2Fubm90IGJlIGdpdmVuIGEgY3VzdG9tIGluamVjdG9yLiBJbnN0ZWFkLCB3ZSBsb29rIHVwIHRoZSBTaWRlcGFuZWxSZWYgYnlcbiAgICAgICAgICAgIC8vIElELlxuICAgICAgICAgICAgLy8gVGhpcyBtdXN0IG9jY3VyIGluIGBvbkluaXRgLCBhcyB0aGUgSUQgYmluZGluZyBmb3IgdGhlIHNpZGVwYW5lbCBjb250YWluZXIgd29uJ3RcbiAgICAgICAgICAgIC8vIGJlIHJlc29sdmVkIGF0IGNvbnN0cnVjdG9yIHRpbWUuIFdlIHVzZSBzZXRUaW1lb3V0IGJ5IHNhbWUgcmVhc29uLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlcGFuZWxSZWYgPSBnZXRDbG9zZXN0U2lkZXBhbmVsKHRoaXMuZWxlbWVudFJlZiwgdGhpcy5zaWRlcGFuZWxTZXJ2aWNlLm9wZW5lZFNpZGVwYW5lbHMpITtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBjb25zdCBwcm94aWVkQ2hhbmdlID0gY2hhbmdlcy5tY1NpZGVwYW5lbENsb3NlIHx8IGNoYW5nZXMuc2lkZXBhbmVsUmVzdWx0O1xuXG4gICAgICAgIGlmIChwcm94aWVkQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnNpZGVwYW5lbFJlc3VsdCA9IHByb3hpZWRDaGFuZ2UuY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEhlYWRlciBvZiBhIHNpZGVwYW5lbC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWMtc2lkZXBhbmVsLXRpdGxlXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY2xvc2VhYmxlXCIgbWMtc2lkZXBhbmVsLWNsb3NlPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYy1zaWRlcGFuZWwtY2xvc2UteFwiPlxuICAgICAgICAgICAgICAgIDxpIG1jLWljb249XCJtYy1jbG9zZS1MXzE2XCIgY2xhc3M9XCJtYy1pY29uIG1jLWljb25fbGlnaHRcIiBbY29sb3JdPVwidGhlbWVQYWxldHRlLlNlY29uZFwiPjwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWhlYWRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsSGVhZGVyIHtcbiAgICB0aGVtZVBhbGV0dGUgPSBUaGVtZVBhbGV0dGU7XG5cbiAgICBASW5wdXQoKSBjbG9zZWFibGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogU2Nyb2xsYWJsZSBjb250ZW50IGNvbnRhaW5lciBvZiBhIHNpZGVwYW5lbC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtYy1zaWRlcGFuZWwtYm9keSwgW21jLXNpZGVwYW5lbC1ib2R5XSwgbWNTaWRlcGFuZWxCb2R5JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnbWMtc2lkZXBhbmVsLWJvZHknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbEJvZHkge31cblxuLyoqXG4gKiBGb290ZXIgb2YgYSBzaWRlcGFuZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWMtc2lkZXBhbmVsLWZvb3RlciwgW21jLXNpZGVwYW5lbC1mb290ZXJdLCBtY1NpZGVwYW5lbEZvb3RlcicsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ21jLXNpZGVwYW5lbC1mb290ZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbEZvb3RlciB7fVxuXG4vKipcbiAqIEFjdGlvbnMgYmxvY2sgb2YgYSBzaWRlcGFuZWwgZm9vdGVyLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLXNpZGVwYW5lbC1hY3Rpb25zLCBbbWMtc2lkZXBhbmVsLWFjdGlvbnNdLCBtY1NpZGVwYW5lbEFjdGlvbnMnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1zaWRlcGFuZWwtYWN0aW9ucydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jU2lkZXBhbmVsQWN0aW9ucyB7fVxuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IE1jU2lkZXBhbmVsUmVmIHRvIGFuIGVsZW1lbnQgYnkgbG9va2luZyBhdCB0aGUgRE9NLlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCByZWxhdGl2ZSB0byB3aGljaCB0byBsb29rIGZvciBhIHNpZGVwYW5lbC5cbiAqIEBwYXJhbSBvcGVuU2lkZXBhbmVscyBSZWZlcmVuY2VzIHRvIHRoZSBjdXJyZW50bHktb3BlbiBzaWRlcGFuZWxzLlxuICovXG5mdW5jdGlvbiBnZXRDbG9zZXN0U2lkZXBhbmVsKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBvcGVuU2lkZXBhbmVsczogTWNTaWRlcGFuZWxSZWZbXSkge1xuICAgIGxldCBwYXJlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKHBhcmVudCAmJiAhcGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnbWMtc2lkZXBhbmVsLWNvbnRhaW5lcicpKSB7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQgPyBvcGVuU2lkZXBhbmVscy5maW5kKChzaWRlcGFuZWwpID0+IHNpZGVwYW5lbC5pZCA9PT0gcGFyZW50IS5pZCkgOiBudWxsO1xufVxuIl19
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { TreeSizePaddingLeft } from '@ptsecurity/mosaic/design-tokens';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { McTreeBase, McTreeNode } from './tree-base';
import * as i0 from "@angular/core";
import * as i1 from "./tree-base";
import * as i2 from "@angular/cdk/bidi";
/** Regex used to split a string on its CSS units. */
const cssUnitPattern = /([A-Za-z%]+)$/;
export class McTreeNodePadding {
    constructor(treeNode, tree, renderer, element, dir) {
        var _a, _b;
        this.treeNode = treeNode;
        this.tree = tree;
        this.renderer = renderer;
        this.element = element;
        this.dir = dir;
        this._indent = 20;
        /** CSS units used for the indentation value. */
        this.indentUnits = 'px';
        this.baseLeftPadding = parseInt(TreeSizePaddingLeft);
        this.iconWidth = 24;
        this.destroyed = new Subject();
        (_b = (_a = this.dir) === null || _a === void 0 ? void 0 : _a.change) === null || _b === void 0 ? void 0 : _b.pipe(takeUntil(this.destroyed)).subscribe(() => this.setPadding());
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this.setLevelInput(value);
    }
    get indent() {
        return this._indent;
    }
    set indent(indent) {
        this.setIndentInput(indent);
    }
    get leftPadding() {
        return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
    }
    ngOnInit() {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    paddingIndent() {
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : 0;
        const level = this.level || nodeLevel;
        return level > 0 ? `${(level * this._indent) + this.leftPadding}px` : `${this.leftPadding}px`;
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    setLevelInput(value) {
        // Set to null as the fallback value so that _setPadding can fall back to the node level if the
        // consumer set the directive as `mcTreeNodePadding=""`. We still want to take this value if
        // they set 0 explicitly.
        this._level = coerceNumberProperty(value, null);
        this.setPadding();
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    setIndentInput(indent) {
        let value = indent;
        let units = 'px';
        if (typeof indent === 'string') {
            const parts = indent.split(cssUnitPattern);
            value = parts[0];
            units = parts[1] || units;
        }
        this.indentUnits = units;
        this._indent = coerceNumberProperty(value);
        this.setPadding();
    }
    setPadding() {
        var _a;
        const padding = this.paddingIndent();
        const paddingProp = ((_a = this.dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
    }
}
/** @nocollapse */ McTreeNodePadding.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodePadding, deps: [{ token: i1.McTreeNode }, { token: i1.McTreeBase }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodePadding.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.13", type: McTreeNodePadding, selector: "[mcTreeNodePadding]", inputs: { indent: ["mcTreeNodePaddingIndent", "indent"] }, exportAs: ["mcTreeNodePadding"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: McTreeNodePadding, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodePadding]',
                    exportAs: 'mcTreeNodePadding'
                }]
        }], ctorParameters: function () { return [{ type: i1.McTreeNode }, { type: i1.McTreeBase }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { indent: [{
                type: Input,
                args: ['mcTreeNodePaddingIndent']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS9wYWRkaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLFFBQVEsRUFDUixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7QUFHckQscURBQXFEO0FBQ3JELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQztBQU92QyxNQUFNLE9BQU8saUJBQWlCO0lBb0MxQixZQUNjLFFBQXVCLEVBQ3ZCLElBQW1CLEVBQ3JCLFFBQW1CLEVBQ25CLE9BQWdDLEVBQ3BCLEdBQW1COztRQUo3QixhQUFRLEdBQVIsUUFBUSxDQUFlO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQWU7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNwQixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQXJCbkMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQU03QixnREFBZ0Q7UUFDaEQsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFFbkIsb0JBQWUsR0FBVyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUd4RCxjQUFTLEdBQVcsRUFBRSxD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QUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sVUFBVTs7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckMsTUFBTSxXQUFXLEdBQUcsQ0FBQSxNQUFBLElBQUksQ0FBQyxHQUFHLDBDQUFFLEtBQUssTUFBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBRS9FLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RSxDQUFDOztrSUE1R1EsaUJBQWlCO3NIQUFqQixpQkFBaUI7NEZBQWpCLGlCQUFpQjtrQkFKN0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsbUJBQW1CO2lCQUNoQzs7MEJBMENRLFFBQVE7NENBN0JULE1BQU07c0JBRFQsS0FBSzt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlU2l6ZVBhZGRpbmdMZWZ0IH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2Rlc2lnbi10b2tlbnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNY1RyZWVCYXNlLCBNY1RyZWVOb2RlIH0gZnJvbSAnLi90cmVlLWJhc2UnO1xuXG5cbi8qKiBSZWdleCB1c2VkIHRvIHNwbGl0IGEgc3RyaW5nIG9uIGl0cyBDU1MgdW5pdHMuICovXG5jb25zdCBjc3NVbml0UGF0dGVybiA9IC8oW0EtWmEteiVdKykkLztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RyZWVOb2RlUGFkZGluZ10nLFxuICAgIGV4cG9ydEFzOiAnbWNUcmVlTm9kZVBhZGRpbmcnXG59KVxuZXhwb3J0IGNsYXNzIE1jVHJlZU5vZGVQYWRkaW5nPFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGdldCBsZXZlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWw7XG4gICAgfVxuXG4gICAgc2V0IGxldmVsKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRMZXZlbElucHV0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sZXZlbDogbnVtYmVyO1xuXG4gICAgQElucHV0KCdtY1RyZWVOb2RlUGFkZGluZ0luZGVudCcpXG4gICAgZ2V0IGluZGVudCgpOiBudW1iZXIgfCBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5kZW50O1xuICAgIH1cblxuICAgIHNldCBpbmRlbnQoaW5kZW50OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRJbmRlbnRJbnB1dChpbmRlbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luZGVudDogbnVtYmVyID0gMjA7XG5cbiAgICBnZXQgbGVmdFBhZGRpbmcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLndpdGhJY29uID8gMCA6IHRoaXMuaWNvbldpZHRoKSArIHRoaXMuYmFzZUxlZnRQYWRkaW5nO1xuICAgIH1cblxuICAgIC8qKiBDU1MgdW5pdHMgdXNlZCBmb3IgdGhlIGluZGVudGF0aW9uIHZhbHVlLiAqL1xuICAgIGluZGVudFVuaXRzID0gJ3B4JztcblxuICAgIGJhc2VMZWZ0UGFkZGluZzogbnVtYmVyID0gcGFyc2VJbnQoVHJlZVNpemVQYWRkaW5nTGVmdCk7XG5cbiAgICB3aXRoSWNvbjogYm9vbGVhbjtcbiAgICBpY29uV2lkdGg6IG51bWJlciA9IDI0O1xuXG4gICAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB0cmVlTm9kZTogTWNUcmVlTm9kZTxUPixcbiAgICAgICAgcHJvdGVjdGVkIHRyZWU6IE1jVHJlZUJhc2U8VD4sXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXI6IERpcmVjdGlvbmFsaXR5XG4gICAgKSB7XG4gICAgICAgIHRoaXMuZGlyPy5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRQYWRkaW5nKCkpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLndpdGhJY29uID0gdGhpcy50cmVlLnRyZWVDb250cm9sLmlzRXhwYW5kYWJsZSh0aGlzLnRyZWVOb2RlLmRhdGEpO1xuXG4gICAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgcGFkZGluZ0luZGVudCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgY29uc3Qgbm9kZUxldmVsID0gKHRoaXMudHJlZU5vZGUuZGF0YSAmJiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwpXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbCh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLmxldmVsIHx8IG5vZGVMZXZlbDtcblxuICAgICAgICByZXR1cm4gbGV2ZWwgPiAwID8gYCR7KGxldmVsICogdGhpcy5faW5kZW50KSArIHRoaXMubGVmdFBhZGRpbmd9cHhgIDogYCR7dGhpcy5sZWZ0UGFkZGluZ31weGA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBoYXMgYmVlbiBleHRyYWN0ZWQgdG8gYSB1dGlsIGJlY2F1c2Ugb2YgVFMgNCBhbmQgVkUuXG4gICAgICogVmlldyBFbmdpbmUgZG9lc24ndCBzdXBwb3J0IHByb3BlcnR5IHJlbmFtZSBpbmhlcml0YW5jZS5cbiAgICAgKiBUUyA0LjAgZG9lc24ndCBhbGxvdyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGFjY2Vzc29ycyBvciB2aWNlLXZlcnNhLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldExldmVsSW5wdXQodmFsdWU6IG51bWJlcikge1xuICAgICAgICAvLyBTZXQgdG8gbnVsbCBhcyB0aGUgZmFsbGJhY2sgdmFsdWUgc28gdGhhdCBfc2V0UGFkZGluZyBjYW4gZmFsbCBiYWNrIHRvIHRoZSBub2RlIGxldmVsIGlmIHRoZVxuICAgICAgICAvLyBjb25zdW1lciBzZXQgdGhlIGRpcmVjdGl2ZSBhcyBgbWNUcmVlTm9kZVBhZGRpbmc9XCJcImAuIFdlIHN0aWxsIHdhbnQgdG8gdGFrZSB0aGlzIHZhbHVlIGlmXG4gICAgICAgIC8vIHRoZXkgc2V0IDAgZXhwbGljaXRseS5cbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgbnVsbCkhO1xuICAgICAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGhhcyBiZWVuIGV4dHJhY3RlZCB0byBhIHV0aWwgYmVjYXVzZSBvZiBUUyA0IGFuZCBWRS5cbiAgICAgKiBWaWV3IEVuZ2luZSBkb2Vzbid0IHN1cHBvcnQgcHJvcGVydHkgcmVuYW1lIGluaGVyaXRhbmNlLlxuICAgICAqIFRTIDQuMCBkb2Vzbid0IGFsbG93IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgYWNjZXNzb3JzIG9yIHZpY2UtdmVyc2EuXG4gICAgICogQGRvY3MtcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0SW5kZW50SW5wdXQoaW5kZW50OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gaW5kZW50O1xuICAgICAgICBsZXQgdW5pdHMgPSAncHgnO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBpbmRlbnQuc3BsaXQoY3NzVW5pdFBhdHRlcm4pO1xuICAgICAgICAgICAgdmFsdWUgPSBwYXJ0c1swXTtcbiAgICAgICAgICAgIHVuaXRzID0gcGFydHNbMV0gfHwgdW5pdHM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluZGVudFVuaXRzID0gdW5pdHM7XG4gICAgICAgIHRoaXMuX2luZGVudCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRQYWRkaW5nKCkge1xuICAgICAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5wYWRkaW5nSW5kZW50KCk7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdQcm9wID0gdGhpcy5kaXI/LnZhbHVlID09PSAncnRsJyA/ICdwYWRkaW5nUmlnaHQnIDogJ3BhZGRpbmdMZWZ0JztcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBwYWRkaW5nUHJvcCwgcGFkZGluZyk7XG4gICAgfVxufVxuIl19
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
        this.dir?.change?.pipe(takeUntil(this.destroyed))
            .subscribe(() => this.setPadding());
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
        const padding = this.paddingIndent();
        const paddingProp = this.dir?.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this.renderer.setStyle(this.element.nativeElement, paddingProp, padding);
    }
}
/** @nocollapse */ /** @nocollapse */ McTreeNodePadding.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeNodePadding, deps: [{ token: i1.McTreeNode }, { token: i1.McTreeBase }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ McTreeNodePadding.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: McTreeNodePadding, selector: "[mcTreeNodePadding]", inputs: { indent: ["mcTreeNodePaddingIndent", "indent"] }, exportAs: ["mcTreeNodePadding"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: McTreeNodePadding, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS9wYWRkaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLFFBQVEsRUFDUixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7QUFHckQscURBQXFEO0FBQ3JELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQztBQU92QyxNQUFNLE9BQU8saUJBQWlCO0lBb0MxQixZQUNjLFFBQXVCLEVBQ3ZCLElBQW1CLEVBQ3JCLFFBQW1CLEVBQ25CLE9BQWdDLEVBQ3BCLEdBQW1CO1FBSjdCLGFBQVEsR0FBUixRQUFRLENBQWU7UUFDdkIsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBckJuQyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBTTdCLGdEQUFnRDtRQUNoRCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixvQkFBZSxHQUFXLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBR3hELGNBQVMsR0FBVyxFQUFFLENB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R0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUUvRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7b0pBNUdRLGlCQUFpQjt3SUFBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBSjdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLG1CQUFtQjtpQkFDaEM7OzBCQTBDUSxRQUFROzRDQTdCVCxNQUFNO3NCQURULEtBQUs7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZVNpemVQYWRkaW5nTGVmdCB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9kZXNpZ24tdG9rZW5zJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWNUcmVlQmFzZSwgTWNUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1iYXNlJztcblxuXG4vKiogUmVnZXggdXNlZCB0byBzcGxpdCBhIHN0cmluZyBvbiBpdHMgQ1NTIHVuaXRzLiAqL1xuY29uc3QgY3NzVW5pdFBhdHRlcm4gPSAvKFtBLVphLXolXSspJC87XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWNUcmVlTm9kZVBhZGRpbmddJyxcbiAgICBleHBvcnRBczogJ21jVHJlZU5vZGVQYWRkaW5nJ1xufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlUGFkZGluZzxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsO1xuICAgIH1cblxuICAgIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0TGV2ZWxJbnB1dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbGV2ZWw6IG51bWJlcjtcblxuICAgIEBJbnB1dCgnbWNUcmVlTm9kZVBhZGRpbmdJbmRlbnQnKVxuICAgIGdldCBpbmRlbnQoKTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGVudDtcbiAgICB9XG5cbiAgICBzZXQgaW5kZW50KGluZGVudDogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0SW5kZW50SW5wdXQoaW5kZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbmRlbnQ6IG51bWJlciA9IDIwO1xuXG4gICAgZ2V0IGxlZnRQYWRkaW5nKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy53aXRoSWNvbiA/IDAgOiB0aGlzLmljb25XaWR0aCkgKyB0aGlzLmJhc2VMZWZ0UGFkZGluZztcbiAgICB9XG5cbiAgICAvKiogQ1NTIHVuaXRzIHVzZWQgZm9yIHRoZSBpbmRlbnRhdGlvbiB2YWx1ZS4gKi9cbiAgICBpbmRlbnRVbml0cyA9ICdweCc7XG5cbiAgICBiYXNlTGVmdFBhZGRpbmc6IG51bWJlciA9IHBhcnNlSW50KFRyZWVTaXplUGFkZGluZ0xlZnQpO1xuXG4gICAgd2l0aEljb246IGJvb2xlYW47XG4gICAgaWNvbldpZHRoOiBudW1iZXIgPSAyNDtcblxuICAgIHByaXZhdGUgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgdHJlZU5vZGU6IE1jVHJlZU5vZGU8VD4sXG4gICAgICAgIHByb3RlY3RlZCB0cmVlOiBNY1RyZWVCYXNlPFQ+LFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyOiBEaXJlY3Rpb25hbGl0eVxuICAgICkge1xuICAgICAgICB0aGlzLmRpcj8uY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0UGFkZGluZygpKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53aXRoSWNvbiA9IHRoaXMudHJlZS50cmVlQ29udHJvbC5pc0V4cGFuZGFibGUodGhpcy50cmVlTm9kZS5kYXRhKTtcblxuICAgICAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHBhZGRpbmdJbmRlbnQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IG5vZGVMZXZlbCA9ICh0aGlzLnRyZWVOb2RlLmRhdGEgJiYgdGhpcy50cmVlLnRyZWVDb250cm9sLmdldExldmVsKVxuICAgICAgICAgICAgPyB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwodGhpcy50cmVlTm9kZS5kYXRhKVxuICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgIGNvbnN0IGxldmVsID0gdGhpcy5sZXZlbCB8fCBub2RlTGV2ZWw7XG5cbiAgICAgICAgcmV0dXJuIGxldmVsID4gMCA/IGAkeyhsZXZlbCAqIHRoaXMuX2luZGVudCkgKyB0aGlzLmxlZnRQYWRkaW5nfXB4YCA6IGAke3RoaXMubGVmdFBhZGRpbmd9cHhgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaGFzIGJlZW4gZXh0cmFjdGVkIHRvIGEgdXRpbCBiZWNhdXNlIG9mIFRTIDQgYW5kIFZFLlxuICAgICAqIFZpZXcgRW5naW5lIGRvZXNuJ3Qgc3VwcG9ydCBwcm9wZXJ0eSByZW5hbWUgaW5oZXJpdGFuY2UuXG4gICAgICogVFMgNC4wIGRvZXNuJ3QgYWxsb3cgcHJvcGVydGllcyB0byBvdmVycmlkZSBhY2Nlc3NvcnMgb3IgdmljZS12ZXJzYS5cbiAgICAgKiBAZG9jcy1wcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRMZXZlbElucHV0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgLy8gU2V0IHRvIG51bGwgYXMgdGhlIGZhbGxiYWNrIHZhbHVlIHNvIHRoYXQgX3NldFBhZGRpbmcgY2FuIGZhbGwgYmFjayB0byB0aGUgbm9kZSBsZXZlbCBpZiB0aGVcbiAgICAgICAgLy8gY29uc3VtZXIgc2V0IHRoZSBkaXJlY3RpdmUgYXMgYG1jVHJlZU5vZGVQYWRkaW5nPVwiXCJgLiBXZSBzdGlsbCB3YW50IHRvIHRha2UgdGhpcyB2YWx1ZSBpZlxuICAgICAgICAvLyB0aGV5IHNldCAwIGV4cGxpY2l0bHkuXG4gICAgICAgIHRoaXMuX2xldmVsID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIG51bGwpITtcbiAgICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBoYXMgYmVlbiBleHRyYWN0ZWQgdG8gYSB1dGlsIGJlY2F1c2Ugb2YgVFMgNCBhbmQgVkUuXG4gICAgICogVmlldyBFbmdpbmUgZG9lc24ndCBzdXBwb3J0IHByb3BlcnR5IHJlbmFtZSBpbmhlcml0YW5jZS5cbiAgICAgKiBUUyA0LjAgZG9lc24ndCBhbGxvdyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGFjY2Vzc29ycyBvciB2aWNlLXZlcnNhLlxuICAgICAqIEBkb2NzLXByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldEluZGVudElucHV0KGluZGVudDogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGluZGVudDtcbiAgICAgICAgbGV0IHVuaXRzID0gJ3B4JztcblxuICAgICAgICBpZiAodHlwZW9mIGluZGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gaW5kZW50LnNwbGl0KGNzc1VuaXRQYXR0ZXJuKTtcbiAgICAgICAgICAgIHZhbHVlID0gcGFydHNbMF07XG4gICAgICAgICAgICB1bml0cyA9IHBhcnRzWzFdIHx8IHVuaXRzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbmRlbnRVbml0cyA9IHVuaXRzO1xuICAgICAgICB0aGlzLl9pbmRlbnQgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UGFkZGluZygpIHtcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IHRoaXMucGFkZGluZ0luZGVudCgpO1xuICAgICAgICBjb25zdCBwYWRkaW5nUHJvcCA9IHRoaXMuZGlyPy52YWx1ZSA9PT0gJ3J0bCcgPyAncGFkZGluZ1JpZ2h0JyA6ICdwYWRkaW5nTGVmdCc7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgcGFkZGluZ1Byb3AsIHBhZGRpbmcpO1xuICAgIH1cbn1cbiJdfQ==
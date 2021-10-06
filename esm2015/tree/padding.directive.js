import { Directive, Input } from '@angular/core';
import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';
import * as i0 from "@angular/core";
export class McTreeNodePadding extends CdkTreeNodePadding {
    constructor() {
        super(...arguments);
        this.baseLeftPadding = 12;
        this.iconWidth = 20;
    }
    get level() { return this._level; }
    set level(value) { this.setLevelInput(value); }
    get indent() { return this._indent; }
    set indent(indent) { this.setIndentInput(indent); }
    get leftPadding() {
        return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
    }
    paddingIndent() {
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : 0;
        const level = this.level || nodeLevel;
        return level > 0 ? `${(level * this._indent) + this.leftPadding}px` : `${this.leftPadding}px`;
    }
    ngOnInit() {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);
        this.setPadding();
    }
}
/** @nocollapse */ McTreeNodePadding.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodePadding, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ McTreeNodePadding.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.5", type: McTreeNodePadding, selector: "[mcTreeNodePadding]", inputs: { level: ["mcTreeNodePadding", "level"], indent: ["mcTreeNodePaddingIndent", "indent"] }, providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McTreeNodePadding, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mcTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }]
                }]
        }], propDecorators: { level: [{
                type: Input,
                args: ['mcTreeNodePadding']
            }], indent: [{
                type: Input,
                args: ['mcTreeNodePaddingIndent']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS9wYWRkaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFPMUQsTUFBTSxPQUFPLGlCQUFxQixTQUFRLGtCQUFxQjtJQUovRDs7UUFjSSxvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUc3QixjQUFTLEdBQVcsRUFBRSxDQUFDO0tBcUIxQjtJQWhDRyxJQUNJLEtBQUssS0FBYSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNDLElBQUksS0FBSyxDQUFDLEtBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2RCxJQUNJLE1BQU0sS0FBc0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0RCxJQUFJLE1BQU0sQ0FBQyxNQUF1QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBT3BFLElBQUksV0FBVztRQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxhQUFhO1FBQ1QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDcEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUM7UUFFdEMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDO0lBQ2xHLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7aUlBakNRLGlCQUFpQjtxSEFBakIsaUJBQWlCLGdKQUZmLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLENBQUM7MkZBRW5FLGlCQUFpQjtrQkFKN0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLG1CQUFtQixFQUFFLENBQUM7aUJBQy9FOzhCQUlPLEtBQUs7c0JBRFIsS0FBSzt1QkFBQyxtQkFBbUI7Z0JBS3RCLE1BQU07c0JBRFQsS0FBSzt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1RyZWVOb2RlUGFkZGluZyB9IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay90cmVlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttY1RyZWVOb2RlUGFkZGluZ10nLFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrVHJlZU5vZGVQYWRkaW5nLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZVBhZGRpbmcgfV1cbn0pXG5leHBvcnQgY2xhc3MgTWNUcmVlTm9kZVBhZGRpbmc8VD4gZXh0ZW5kcyBDZGtUcmVlTm9kZVBhZGRpbmc8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdtY1RyZWVOb2RlUGFkZGluZycpXG4gICAgZ2V0IGxldmVsKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZXZlbDsgfVxuICAgIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuc2V0TGV2ZWxJbnB1dCh2YWx1ZSk7IH1cblxuICAgIEBJbnB1dCgnbWNUcmVlTm9kZVBhZGRpbmdJbmRlbnQnKVxuICAgIGdldCBpbmRlbnQoKTogbnVtYmVyIHwgc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2luZGVudDsgfVxuICAgIHNldCBpbmRlbnQoaW5kZW50OiBudW1iZXIgfCBzdHJpbmcpIHsgdGhpcy5zZXRJbmRlbnRJbnB1dChpbmRlbnQpOyB9XG5cbiAgICBiYXNlTGVmdFBhZGRpbmc6IG51bWJlciA9IDEyO1xuXG4gICAgd2l0aEljb246IGJvb2xlYW47XG4gICAgaWNvbldpZHRoOiBudW1iZXIgPSAyMDtcblxuICAgIGdldCBsZWZ0UGFkZGluZygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMud2l0aEljb24gPyAwIDogdGhpcy5pY29uV2lkdGgpICsgdGhpcy5iYXNlTGVmdFBhZGRpbmc7XG4gICAgfVxuXG4gICAgcGFkZGluZ0luZGVudCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgY29uc3Qgbm9kZUxldmVsID0gKHRoaXMudHJlZU5vZGUuZGF0YSAmJiB0aGlzLnRyZWUudHJlZUNvbnRyb2wuZ2V0TGV2ZWwpXG4gICAgICAgICAgICA/IHRoaXMudHJlZS50cmVlQ29udHJvbC5nZXRMZXZlbCh0aGlzLnRyZWVOb2RlLmRhdGEpXG4gICAgICAgICAgICA6IDA7XG5cbiAgICAgICAgY29uc3QgbGV2ZWwgPSB0aGlzLmxldmVsIHx8IG5vZGVMZXZlbDtcblxuICAgICAgICByZXR1cm4gbGV2ZWwgPiAwID8gYCR7KGxldmVsICogdGhpcy5faW5kZW50KSArIHRoaXMubGVmdFBhZGRpbmd9cHhgIDogYCR7dGhpcy5sZWZ0UGFkZGluZ31weGA7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMud2l0aEljb24gPSB0aGlzLnRyZWUudHJlZUNvbnRyb2wuaXNFeHBhbmRhYmxlKHRoaXMudHJlZU5vZGUuZGF0YSk7XG5cbiAgICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgfVxufVxuIl19